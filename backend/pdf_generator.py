"""
SC2 Recipe PDF Generator
Generates professional, printable PDF recipe cards using ReportLab.
"""

from io import BytesIO
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Table, TableStyle, Paragraph,
    Spacer, HRFlowable
)
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT


# Color definitions
BLUE = colors.HexColor("#2563eb")
LIGHT_BLUE = colors.HexColor("#dbeafe")
GREEN = colors.HexColor("#16a34a")
LIGHT_GREEN = colors.HexColor("#dcfce7")
RED = colors.HexColor("#dc2626")
LIGHT_RED = colors.HexColor("#fee2e2")
YELLOW = colors.HexColor("#ca8a04")
LIGHT_YELLOW = colors.HexColor("#fef9c3")
GRAY = colors.HexColor("#6b7280")
LIGHT_GRAY = colors.HexColor("#f3f4f6")
DARK_GRAY = colors.HexColor("#374151")


def get_balance_color(value):
    """Return color based on resource balance value."""
    if value >= 20:
        return GREEN, LIGHT_GREEN
    elif value <= -20:
        return RED, LIGHT_RED
    else:
        return YELLOW, LIGHT_YELLOW


def generate_pdf(calculation_result):
    """
    Generate a PDF from calculation results.
    Returns a BytesIO buffer containing the PDF.
    """
    buffer = BytesIO()

    # Create document with margins
    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        leftMargin=15*mm,
        rightMargin=15*mm,
        topMargin=15*mm,
        bottomMargin=15*mm
    )

    # Build content
    elements = []
    styles = getSampleStyleSheet()

    # Custom styles
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=DARK_GRAY,
        spaceAfter=2*mm,
        alignment=TA_CENTER
    )

    subtitle_style = ParagraphStyle(
        'CustomSubtitle',
        parent=styles['Normal'],
        fontSize=11,
        textColor=GRAY,
        spaceAfter=6*mm,
        alignment=TA_CENTER
    )

    section_header_style = ParagraphStyle(
        'SectionHeader',
        parent=styles['Heading2'],
        fontSize=12,
        textColor=colors.white,
        leftIndent=3*mm,
        spaceBefore=0,
        spaceAfter=0
    )

    # Title
    elements.append(Paragraph(calculation_result["name"], title_style))
    race = calculation_result.get("race", "Terran")
    elements.append(Paragraph(
        f"{race} Production Recipe • {calculation_result['bases']} Bases • Patch 5.0.12",
        subtitle_style
    ))

    # Economy Section
    elements.append(create_section_header("ECONOMY", BLUE))
    economy_data = create_economy_table(calculation_result)
    elements.append(economy_data)
    elements.append(Spacer(1, 4*mm))

    # Resource Balance Section
    elements.append(create_section_header("RESOURCE BALANCE", YELLOW))
    balance_data = create_balance_table(calculation_result)
    elements.append(balance_data)
    elements.append(Spacer(1, 4*mm))

    # Production Table Section
    elements.append(create_section_header("PRODUCTION", BLUE))
    if calculation_result["unit_productions"]:
        production_table = create_production_table(calculation_result)
        elements.append(production_table)
    else:
        elements.append(Spacer(1, 2*mm))
        elements.append(Paragraph(
            "No units selected",
            ParagraphStyle('NoUnits', parent=styles['Normal'], alignment=TA_CENTER, textColor=GRAY)
        ))
    elements.append(Spacer(1, 4*mm))

    # Buildings Summary Section
    elements.append(create_section_header("REQUIRED BUILDINGS", YELLOW))
    buildings_table = create_buildings_summary(calculation_result)
    elements.append(buildings_table)
    elements.append(Spacer(1, 4*mm))

    # Supply Note Section
    elements.append(create_section_header("SUPPLY", GREEN))
    supply_note = create_supply_note(calculation_result)
    elements.append(supply_note)
    elements.append(Spacer(1, 8*mm))

    # Footer
    footer_style = ParagraphStyle(
        'Footer',
        parent=styles['Normal'],
        fontSize=9,
        textColor=GRAY,
        alignment=TA_CENTER
    )
    elements.append(HRFlowable(width="100%", thickness=1, color=LIGHT_GRAY))
    elements.append(Spacer(1, 2*mm))
    elements.append(Paragraph("Generated with SC2 Recipe Calculator", footer_style))

    # Build PDF
    doc.build(elements)
    buffer.seek(0)
    return buffer


def create_section_header(text, bg_color):
    """Create a colored section header."""
    style = ParagraphStyle(
        'SectionHeader',
        fontSize=11,
        textColor=colors.white,
        fontName='Helvetica-Bold'
    )

    header_table = Table(
        [[Paragraph(text, style)]],
        colWidths=[180*mm],
        rowHeights=[7*mm]
    )
    header_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), bg_color),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 4*mm),
        ('RIGHTPADDING', (0, 0), (-1, -1), 4*mm),
        ('TOPPADDING', (0, 0), (-1, -1), 1*mm),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 1*mm),
        ('ROUNDEDCORNERS', [2*mm, 2*mm, 0, 0]),
    ]))
    return header_table


def create_economy_table(result):
    """Create the economy information table."""
    income = result["income"]

    data = [
        ["Bases", "Mineral Workers", "Gas Workers", "Mineral Income", "Vespene Income"],
        [
            str(result["bases"]),
            str(income["mineral_workers"]),
            str(income["gas_workers"]),
            f"{income['mineral_income']:.0f}/min",
            f"{income['vespene_income']:.0f}/min"
        ]
    ]

    table = Table(data, colWidths=[36*mm, 36*mm, 36*mm, 36*mm, 36*mm])
    table.setStyle(TableStyle([
        # Header row
        ('BACKGROUND', (0, 0), (-1, 0), LIGHT_BLUE),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 9),
        ('TEXTCOLOR', (0, 0), (-1, 0), DARK_GRAY),
        # Data row
        ('BACKGROUND', (0, 1), (-1, 1), colors.white),
        ('FONTNAME', (0, 1), (-1, 1), 'Helvetica'),
        ('FONTSIZE', (0, 1), (-1, 1), 11),
        ('TEXTCOLOR', (0, 1), (-1, 1), DARK_GRAY),
        # All cells
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, LIGHT_GRAY),
        ('TOPPADDING', (0, 0), (-1, -1), 2*mm),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2*mm),
    ]))
    return table


def create_balance_table(result):
    """Create the resource balance table with color coding."""
    totals = result["totals"]

    # Get colors based on balance
    m_color, m_bg = get_balance_color(totals["minerals_remaining"])
    v_color, v_bg = get_balance_color(totals["vespene_remaining"])

    data = [
        ["Minerals Used", "Minerals Remaining", "Vespene Used", "Vespene Remaining"],
        [
            f"{totals['minerals_used']:.0f}/min",
            f"{totals['minerals_remaining']:+.0f}/min",
            f"{totals['vespene_used']:.0f}/min",
            f"{totals['vespene_remaining']:+.0f}/min"
        ]
    ]

    table = Table(data, colWidths=[45*mm, 45*mm, 45*mm, 45*mm])

    style_commands = [
        # Header row
        ('BACKGROUND', (0, 0), (-1, 0), LIGHT_YELLOW),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 9),
        ('TEXTCOLOR', (0, 0), (-1, 0), DARK_GRAY),
        # Data row base style
        ('FONTNAME', (0, 1), (-1, 1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 1), (-1, 1), 12),
        # Used columns (neutral)
        ('BACKGROUND', (0, 1), (0, 1), colors.white),
        ('BACKGROUND', (2, 1), (2, 1), colors.white),
        ('TEXTCOLOR', (0, 1), (0, 1), DARK_GRAY),
        ('TEXTCOLOR', (2, 1), (2, 1), DARK_GRAY),
        # Remaining columns (color coded)
        ('BACKGROUND', (1, 1), (1, 1), m_bg),
        ('TEXTCOLOR', (1, 1), (1, 1), m_color),
        ('BACKGROUND', (3, 1), (3, 1), v_bg),
        ('TEXTCOLOR', (3, 1), (3, 1), v_color),
        # All cells
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, LIGHT_GRAY),
        ('TOPPADDING', (0, 0), (-1, -1), 2*mm),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2*mm),
    ]

    table.setStyle(TableStyle(style_commands))
    return table


def create_production_table(result):
    """Create the production details table."""
    # Header row
    data = [["Unit", "Buildings", "Units/min", "Supply/min", "Minerals/min", "Vespene/min"]]

    # Data rows
    for prod in result["unit_productions"]:
        data.append([
            prod["name"],
            str(prod["buildings"]),
            f"{prod['rate']:.2f}",
            f"{prod['supply_per_min']:.1f}",
            f"{prod['minerals_per_min']:.0f}",
            f"{prod['vespene_per_min']:.0f}"
        ])

    # Totals row
    total_rate = sum(p["rate"] for p in result["unit_productions"])
    total_supply = result["total_supply_per_minute"]
    total_minerals = sum(p["minerals_per_min"] for p in result["unit_productions"])
    total_vespene = sum(p["vespene_per_min"] for p in result["unit_productions"])

    data.append([
        "TOTAL",
        "",
        f"{total_rate:.2f}",
        f"{total_supply:.1f}",
        f"{total_minerals:.0f}",
        f"{total_vespene:.0f}"
    ])

    table = Table(data, colWidths=[40*mm, 25*mm, 25*mm, 30*mm, 30*mm, 30*mm])

    style_commands = [
        # Header row
        ('BACKGROUND', (0, 0), (-1, 0), LIGHT_BLUE),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 9),
        ('TEXTCOLOR', (0, 0), (-1, 0), DARK_GRAY),
        # Data rows - alternating colors
        ('FONTNAME', (0, 1), (-1, -2), 'Helvetica'),
        ('FONTSIZE', (0, 1), (-1, -2), 10),
        ('TEXTCOLOR', (0, 1), (-1, -2), DARK_GRAY),
        # Totals row
        ('BACKGROUND', (0, -1), (-1, -1), LIGHT_GRAY),
        ('FONTNAME', (0, -1), (-1, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, -1), (-1, -1), 10),
        ('TEXTCOLOR', (0, -1), (-1, -1), DARK_GRAY),
        # All cells
        ('ALIGN', (0, 0), (0, -1), 'LEFT'),
        ('ALIGN', (1, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, LIGHT_GRAY),
        ('TOPPADDING', (0, 0), (-1, -1), 1.5*mm),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 1.5*mm),
        ('LEFTPADDING', (0, 0), (-1, -1), 2*mm),
    ]

    # Add alternating row colors
    for i in range(1, len(data) - 1):
        if i % 2 == 0:
            style_commands.append(('BACKGROUND', (0, i), (-1, i), LIGHT_GRAY))
        else:
            style_commands.append(('BACKGROUND', (0, i), (-1, i), colors.white))

    table.setStyle(TableStyle(style_commands))
    return table


def create_buildings_summary(result):
    """Create the buildings summary section."""
    buildings = result.get("buildings_summary", [])

    if not buildings:
        buildings_text = "No buildings required"
    else:
        buildings_text = " • ".join(buildings)

    style = ParagraphStyle(
        'BuildingsSummary',
        fontSize=11,
        textColor=DARK_GRAY,
        alignment=TA_CENTER
    )

    table = Table(
        [[Paragraph(buildings_text, style)]],
        colWidths=[180*mm],
        rowHeights=[10*mm]
    )
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), LIGHT_YELLOW),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('TOPPADDING', (0, 0), (-1, -1), 2*mm),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2*mm),
    ]))
    return table


def create_supply_note(result):
    """Create the supply structure requirement note."""
    supply_info = result["supply_depot"]
    total_supply = result["total_supply_per_minute"]
    structure_name = supply_info.get("structure_name", "Supply Depot")
    structures_per_min = supply_info.get("structures_per_minute", supply_info.get("depots_per_minute", 0))
    mineral_cost = supply_info.get("mineral_cost", 0)
    worker_required = supply_info.get("worker_required", True)
    workers_needed = supply_info.get("workers_required", supply_info.get("scvs_required", 0))

    if worker_required:
        note_text = (
            f"Producing {total_supply:.1f} supply/min requires ~{structures_per_min:.1f} "
            f"{structure_name}s/min ({workers_needed:.1f} workers, {mineral_cost:.0f} minerals/min)"
        )
    else:
        note_text = (
            f"Producing {total_supply:.1f} supply/min requires ~{structures_per_min:.1f} "
            f"{structure_name}s/min ({mineral_cost:.0f} minerals/min, no workers needed)"
        )

    style = ParagraphStyle(
        'SupplyNote',
        fontSize=10,
        textColor=DARK_GRAY,
        alignment=TA_CENTER
    )

    table = Table(
        [[Paragraph(note_text, style)]],
        colWidths=[180*mm],
        rowHeights=[10*mm]
    )
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), LIGHT_GREEN),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('TOPPADDING', (0, 0), (-1, -1), 2*mm),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2*mm),
    ]))
    return table
