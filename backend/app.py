"""
SC2 Recipe Calculator - Flask API Server
Provides endpoints for recipe calculation and PDF generation.
"""

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS

from calculator import calculate_recipe
from pdf_generator import generate_pdf
from unit_data import ALL_UNITS, get_units_by_building

app = Flask(__name__)
CORS(app)


@app.route('/api/units', methods=['GET'])
def get_units():
    """Return all available units grouped by building."""
    race = request.args.get('race', 'Terran')
    return jsonify(get_units_by_building(race))


@app.route('/api/unit-data', methods=['GET'])
def get_unit_data():
    """Return raw unit data dictionary."""
    race = request.args.get('race', 'Terran')
    return jsonify(ALL_UNITS.get(race, ALL_UNITS["Terran"]))


@app.route('/api/calculate', methods=['POST'])
def calculate():
    """
    Calculate production stats for a recipe.

    Request body:
    {
        "name": "Bio-Tank Build",
        "bases": 3,
        "mineral_workers_per_base": 16,
        "gas_workers_per_base": 6,
        "units": {
            "marine": {"enabled": true, "buildings": 3},
            "marauder": {"enabled": true, "buildings": 2}
        }
    }
    """
    recipe_data = request.get_json()

    if not recipe_data:
        return jsonify({"error": "No recipe data provided"}), 400

    try:
        result = calculate_recipe(recipe_data)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route('/api/generate-pdf', methods=['POST'])
def generate_pdf_route():
    """
    Generate a PDF for a recipe.

    Request body: Same as /api/calculate
    Returns: PDF file download
    """
    recipe_data = request.get_json()

    if not recipe_data:
        return jsonify({"error": "No recipe data provided"}), 400

    try:
        # Calculate the recipe
        result = calculate_recipe(recipe_data)

        # Generate PDF
        pdf_buffer = generate_pdf(result)

        # Create safe filename
        recipe_name = recipe_data.get("name", "recipe")
        safe_name = "".join(c if c.isalnum() or c in " -_" else "" for c in recipe_name)
        safe_name = safe_name.strip() or "recipe"
        filename = f"sc2_{safe_name.replace(' ', '_')}.pdf"

        return send_file(
            pdf_buffer,
            mimetype='application/pdf',
            as_attachment=True,
            download_name=filename
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint."""
    return jsonify({"status": "ok"})


if __name__ == '__main__':
    app.run(debug=True, port=5000)
