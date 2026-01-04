"""
SC2 Production Calculator
Calculates resource usage and production rates for a given recipe.
Supports all three races: Terran, Protoss, Zerg.
"""

from unit_data import (
    ALL_UNITS,
    SUPPLY_STRUCTURES,
    MINERALS_PER_WORKER_PER_MINUTE,
    VESPENE_PER_WORKER_PER_MINUTE,
    DEFAULT_MINERAL_WORKERS_PER_BASE,
    DEFAULT_GAS_WORKERS_PER_BASE,
    SUPPLY_PER_DEPOT,
    DEPOT_BUILD_TIME,
    DEPOT_MINERAL_COST
)


def calculate_income(bases, mineral_workers_per_base=None, gas_workers_per_base=None):
    """Calculate total income from workers."""
    if mineral_workers_per_base is None:
        mineral_workers_per_base = DEFAULT_MINERAL_WORKERS_PER_BASE
    if gas_workers_per_base is None:
        gas_workers_per_base = DEFAULT_GAS_WORKERS_PER_BASE

    total_mineral_workers = bases * mineral_workers_per_base
    total_gas_workers = bases * gas_workers_per_base

    mineral_income = total_mineral_workers * MINERALS_PER_WORKER_PER_MINUTE
    vespene_income = total_gas_workers * VESPENE_PER_WORKER_PER_MINUTE

    return {
        "mineral_workers": total_mineral_workers,
        "gas_workers": total_gas_workers,
        "mineral_income": mineral_income,
        "vespene_income": vespene_income
    }


def calculate_unit_production(unit_id, num_buildings, race="Terran"):
    """Calculate production stats for a single unit type."""
    units = ALL_UNITS.get(race, ALL_UNITS["Terran"])

    if unit_id not in units:
        raise ValueError(f"Unknown unit: {unit_id} for race {race}")

    unit = units[unit_id]

    # Units built per minute per building
    built_per_minute_per_building = 1 / unit["build_time"]

    # Total production with all buildings
    total_built_per_minute = built_per_minute_per_building * num_buildings

    # Resource costs per minute
    minerals_per_minute = total_built_per_minute * unit["minerals"]
    vespene_per_minute = total_built_per_minute * unit["vespene"]
    supply_per_minute = total_built_per_minute * unit["supply"]

    return {
        "unit_id": unit_id,
        "name": unit["name"],
        "buildings": num_buildings,
        "building_type": unit["building"],
        "addon": unit.get("addon"),
        "rate": round(total_built_per_minute, 2),
        "supply_per_min": round(supply_per_minute, 2),
        "minerals_per_min": round(minerals_per_minute, 2),
        "vespene_per_min": round(vespene_per_minute, 2)
    }


def calculate_supply_structure_cost(total_supply_per_minute, race="Terran"):
    """Calculate minerals and workers needed for supply structures.

    Each race has different supply structures:
    - Terran: Supply Depot (built by SCV)
    - Protoss: Pylon (built by Probe)
    - Zerg: Overlord (spawned from Larva - no worker needed)
    """
    supply_struct = SUPPLY_STRUCTURES.get(race, SUPPLY_STRUCTURES["Terran"])

    supply_per_structure = supply_struct["supply"]
    build_time = supply_struct["build_time"]
    mineral_cost = supply_struct["minerals"]
    worker_required = supply_struct.get("worker_required", True)

    structures_per_minute = total_supply_per_minute / supply_per_structure
    structure_mineral_cost = structures_per_minute * mineral_cost
    workers_for_supply = structures_per_minute * build_time if worker_required else 0

    return {
        "structure_name": supply_struct["name"],
        "structures_per_minute": round(structures_per_minute, 2),
        "mineral_cost": round(structure_mineral_cost, 2),
        "workers_required": round(workers_for_supply, 2),
        "worker_required": worker_required
    }


def calculate_recipe(recipe_data):
    """
    Calculate full production statistics for a recipe.

    recipe_data format:
    {
        "name": "Bio-Tank 3 Base",
        "race": "Terran",
        "bases": 3,
        "mineral_workers_per_base": 16,
        "gas_workers_per_base": 6,
        "units": {
            "marine": {"enabled": true, "buildings": 3},
            "marauder": {"enabled": true, "buildings": 2},
            ...
        }
    }
    """
    race = recipe_data.get("race", "Terran")
    bases = recipe_data.get("bases", 3)
    mineral_workers_per_base = recipe_data.get("mineral_workers_per_base", DEFAULT_MINERAL_WORKERS_PER_BASE)
    gas_workers_per_base = recipe_data.get("gas_workers_per_base", DEFAULT_GAS_WORKERS_PER_BASE)
    units_config = recipe_data.get("units", {})

    # Calculate income
    income = calculate_income(bases, mineral_workers_per_base, gas_workers_per_base)

    # Calculate production for each enabled unit
    unit_productions = []
    total_minerals_used = 0
    total_vespene_used = 0
    total_supply_per_minute = 0

    for unit_id, config in units_config.items():
        if config.get("enabled", False) and config.get("buildings", 0) > 0:
            try:
                production = calculate_unit_production(unit_id, config["buildings"], race)
                unit_productions.append(production)
                total_minerals_used += production["minerals_per_min"]
                total_vespene_used += production["vespene_per_min"]
                total_supply_per_minute += production["supply_per_min"]
            except ValueError:
                # Skip unknown units
                continue

    # Calculate supply structure costs
    supply_costs = calculate_supply_structure_cost(total_supply_per_minute, race)
    total_minerals_used += supply_costs["mineral_cost"]

    # Calculate remaining resources
    minerals_remaining = income["mineral_income"] - total_minerals_used
    vespene_remaining = income["vespene_income"] - total_vespene_used

    # Build required buildings summary
    buildings_summary = summarize_buildings(unit_productions)

    return {
        "name": recipe_data.get("name", "Unnamed Recipe"),
        "race": race,
        "bases": bases,
        "income": income,
        "unit_productions": sorted(unit_productions, key=lambda x: x["building_type"]),
        "supply_depot": supply_costs,  # Keep key for backward compatibility
        "total_supply_per_minute": round(total_supply_per_minute, 2),
        "totals": {
            "minerals_used": round(total_minerals_used, 2),
            "vespene_used": round(total_vespene_used, 2),
            "minerals_remaining": round(minerals_remaining, 2),
            "vespene_remaining": round(vespene_remaining, 2)
        },
        "buildings_summary": buildings_summary
    }


def summarize_buildings(unit_productions):
    """Create a summary of required buildings by type and addon."""
    # Group by building type and addon
    building_counts = {}

    for prod in unit_productions:
        key = (prod["building_type"], prod.get("addon"))
        if key not in building_counts:
            building_counts[key] = 0
        building_counts[key] += prod["buildings"]

    # Format the summary
    summary = []
    for (building, addon), count in sorted(building_counts.items()):
        addon_str = ""
        if addon == "Reactor":
            addon_str = " (R)"
        elif addon == "Tech Lab":
            addon_str = " (TL)"
        summary.append(f"{count}x {building}{addon_str}")

    return summary
