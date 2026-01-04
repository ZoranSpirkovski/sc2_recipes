# SC2 Terran Unit Data
# Build times in minutes, costs in minerals/vespene

MINERALS_PER_WORKER_PER_MINUTE = 59
VESPENE_PER_WORKER_PER_MINUTE = 52.5

# Default workers per base
DEFAULT_MINERAL_WORKERS_PER_BASE = 16
DEFAULT_GAS_WORKERS_PER_BASE = 6

# Supply depot constants
SUPPLY_PER_DEPOT = 8
DEPOT_BUILD_TIME = 0.35  # minutes
DEPOT_MINERAL_COST = 100

TERRAN_UNITS = {
    # Barracks Units
    "marine": {
        "name": "Marine",
        "build_time": 0.30,
        "supply": 1,
        "minerals": 50,
        "vespene": 0,
        "building": "Barracks",
        "addon": "Reactor"
    },
    "marauder": {
        "name": "Marauder",
        "build_time": 0.35,
        "supply": 2,
        "minerals": 100,
        "vespene": 25,
        "building": "Barracks",
        "addon": "Tech Lab"
    },
    "reaper": {
        "name": "Reaper",
        "build_time": 0.533,
        "supply": 1,
        "minerals": 50,
        "vespene": 50,
        "building": "Barracks",
        "addon": None
    },
    "ghost": {
        "name": "Ghost",
        "build_time": 0.483,
        "supply": 2,
        "minerals": 150,
        "vespene": 125,
        "building": "Barracks",
        "addon": "Tech Lab"
    },
    # Factory Units
    "hellion": {
        "name": "Hellion",
        "build_time": 0.35,
        "supply": 2,
        "minerals": 100,
        "vespene": 0,
        "building": "Factory",
        "addon": "Reactor"
    },
    "hellbat": {
        "name": "Hellbat",
        "build_time": 0.35,
        "supply": 2,
        "minerals": 100,
        "vespene": 0,
        "building": "Factory",
        "addon": "Reactor"
    },
    "widow_mine": {
        "name": "Widow Mine",
        "build_time": 0.35,
        "supply": 2,
        "minerals": 75,
        "vespene": 25,
        "building": "Factory",
        "addon": "Reactor"
    },
    "cyclone": {
        "name": "Cyclone",
        "build_time": 0.533,
        "supply": 3,
        "minerals": 150,
        "vespene": 100,
        "building": "Factory",
        "addon": None
    },
    "siege_tank": {
        "name": "Siege Tank",
        "build_time": 0.533,
        "supply": 3,
        "minerals": 150,
        "vespene": 125,
        "building": "Factory",
        "addon": "Tech Lab"
    },
    "thor": {
        "name": "Thor",
        "build_time": 0.717,
        "supply": 6,
        "minerals": 300,
        "vespene": 200,
        "building": "Factory",
        "addon": "Tech Lab"
    },
    # Starport Units
    "viking": {
        "name": "Viking",
        "build_time": 0.50,
        "supply": 2,
        "minerals": 150,
        "vespene": 75,
        "building": "Starport",
        "addon": "Reactor"
    },
    "medivac": {
        "name": "Medivac",
        "build_time": 0.50,
        "supply": 2,
        "minerals": 100,
        "vespene": 100,
        "building": "Starport",
        "addon": "Reactor"
    },
    "liberator": {
        "name": "Liberator",
        "build_time": 0.717,
        "supply": 3,
        "minerals": 150,
        "vespene": 125,
        "building": "Starport",
        "addon": None
    },
    "raven": {
        "name": "Raven",
        "build_time": 0.567,
        "supply": 2,
        "minerals": 100,
        "vespene": 150,
        "building": "Starport",
        "addon": "Tech Lab"
    },
    "banshee": {
        "name": "Banshee",
        "build_time": 0.717,
        "supply": 3,
        "minerals": 150,
        "vespene": 100,
        "building": "Starport",
        "addon": "Tech Lab"
    },
    "battlecruiser": {
        "name": "Battlecruiser",
        "build_time": 1.067,
        "supply": 6,
        "minerals": 400,
        "vespene": 300,
        "building": "Starport",
        "addon": "Tech Lab"
    },
    # Command Center Units
    "scv": {
        "name": "SCV",
        "build_time": 0.20,
        "supply": 1,
        "minerals": 50,
        "vespene": 0,
        "building": "Command Center",
        "addon": None
    }
}

def get_units_by_building():
    """Group units by their production building."""
    buildings = {
        "Barracks": [],
        "Factory": [],
        "Starport": [],
        "Command Center": []
    }
    for unit_id, unit in TERRAN_UNITS.items():
        buildings[unit["building"]].append({"id": unit_id, **unit})
    return buildings
