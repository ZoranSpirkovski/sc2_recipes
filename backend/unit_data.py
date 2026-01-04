# SC2 Unit Data for All Races
# Build times in minutes, costs in minerals/vespene

MINERALS_PER_WORKER_PER_MINUTE = 59
VESPENE_PER_WORKER_PER_MINUTE = 52.5

# Default workers per base
DEFAULT_MINERAL_WORKERS_PER_BASE = 16
DEFAULT_GAS_WORKERS_PER_BASE = 6

# Legacy constants for backward compatibility
SUPPLY_PER_DEPOT = 8
DEPOT_BUILD_TIME = 0.35  # minutes
DEPOT_MINERAL_COST = 100

# Supply structure constants by race
SUPPLY_STRUCTURES = {
    "Terran": {
        "name": "Supply Depot",
        "supply": 8,
        "build_time": 0.35,  # 21 seconds
        "minerals": 100,
        "vespene": 0,
        "worker_required": True
    },
    "Protoss": {
        "name": "Pylon",
        "supply": 8,
        "build_time": 0.30,  # 18 seconds
        "minerals": 100,
        "vespene": 0,
        "worker_required": True
    },
    "Zerg": {
        "name": "Overlord",
        "supply": 8,
        "build_time": 0.417,  # 25 seconds
        "minerals": 100,
        "vespene": 0,
        "worker_required": False  # Zerg builds from larva
    }
}

# Terran Units (using original verified values)
TERRAN_UNITS = {
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

# Protoss Units
PROTOSS_UNITS = {
    "probe": {
        "name": "Probe",
        "build_time": 0.283,  # 17 seconds
        "supply": 1,
        "minerals": 50,
        "vespene": 0,
        "building": "Nexus",
        "addon": None
    },
    "zealot": {
        "name": "Zealot",
        "build_time": 0.467,  # 28 seconds
        "supply": 2,
        "minerals": 100,
        "vespene": 0,
        "building": "Gateway",
        "addon": None
    },
    "stalker": {
        "name": "Stalker",
        "build_time": 0.50,  # 30 seconds
        "supply": 2,
        "minerals": 125,
        "vespene": 50,
        "building": "Gateway",
        "addon": None
    },
    "sentry": {
        "name": "Sentry",
        "build_time": 0.433,  # 26 seconds
        "supply": 2,
        "minerals": 50,
        "vespene": 100,
        "building": "Gateway",
        "addon": None
    },
    "adept": {
        "name": "Adept",
        "build_time": 0.467,  # 28 seconds
        "supply": 2,
        "minerals": 100,
        "vespene": 25,
        "building": "Gateway",
        "addon": None
    },
    "high_templar": {
        "name": "High Templar",
        "build_time": 0.733,  # 44 seconds
        "supply": 2,
        "minerals": 50,
        "vespene": 150,
        "building": "Gateway",
        "addon": None
    },
    "dark_templar": {
        "name": "Dark Templar",
        "build_time": 0.733,  # 44 seconds
        "supply": 2,
        "minerals": 125,
        "vespene": 125,
        "building": "Gateway",
        "addon": None
    },
    "archon": {
        "name": "Archon",
        "build_time": 0.20,  # 12 seconds (morph)
        "supply": 0,  # Uses templar supply
        "minerals": 0,
        "vespene": 0,
        "building": "Gateway",
        "addon": None,
        "morph_from": "templar"
    },
    "observer": {
        "name": "Observer",
        "build_time": 0.367,  # 22 seconds
        "supply": 1,
        "minerals": 25,
        "vespene": 75,
        "building": "Robotics Facility",
        "addon": None
    },
    "immortal": {
        "name": "Immortal",
        "build_time": 0.733,  # 44 seconds
        "supply": 4,
        "minerals": 275,
        "vespene": 100,
        "building": "Robotics Facility",
        "addon": None
    },
    "warp_prism": {
        "name": "Warp Prism",
        "build_time": 0.60,  # 36 seconds
        "supply": 2,
        "minerals": 250,
        "vespene": 0,
        "building": "Robotics Facility",
        "addon": None
    },
    "colossus": {
        "name": "Colossus",
        "build_time": 1.00,  # 60 seconds
        "supply": 6,
        "minerals": 300,
        "vespene": 200,
        "building": "Robotics Facility",
        "addon": None
    },
    "disruptor": {
        "name": "Disruptor",
        "build_time": 0.833,  # 50 seconds
        "supply": 3,
        "minerals": 150,
        "vespene": 150,
        "building": "Robotics Facility",
        "addon": None
    },
    "phoenix": {
        "name": "Phoenix",
        "build_time": 0.417,  # 25 seconds
        "supply": 2,
        "minerals": 150,
        "vespene": 100,
        "building": "Stargate",
        "addon": None
    },
    "void_ray": {
        "name": "Void Ray",
        "build_time": 0.617,  # 37 seconds
        "supply": 4,
        "minerals": 250,
        "vespene": 150,
        "building": "Stargate",
        "addon": None
    },
    "oracle": {
        "name": "Oracle",
        "build_time": 0.617,  # 37 seconds
        "supply": 3,
        "minerals": 150,
        "vespene": 150,
        "building": "Stargate",
        "addon": None
    },
    "carrier": {
        "name": "Carrier",
        "build_time": 1.00,  # 60 seconds
        "supply": 6,
        "minerals": 350,
        "vespene": 250,
        "building": "Stargate",
        "addon": None
    },
    "tempest": {
        "name": "Tempest",
        "build_time": 0.717,  # 43 seconds
        "supply": 5,
        "minerals": 250,
        "vespene": 175,
        "building": "Stargate",
        "addon": None
    },
    "mothership": {
        "name": "Mothership",
        "build_time": 1.50,  # 90 seconds
        "supply": 8,
        "minerals": 400,
        "vespene": 400,
        "building": "Nexus",
        "addon": None
    }
}

# Zerg Units
ZERG_UNITS = {
    "drone": {
        "name": "Drone",
        "build_time": 0.283,  # 17 seconds
        "supply": 1,
        "minerals": 50,
        "vespene": 0,
        "building": "Hatchery",
        "addon": None
    },
    "queen": {
        "name": "Queen",
        "build_time": 0.733,  # 44 seconds
        "supply": 2,
        "minerals": 150,
        "vespene": 0,
        "building": "Hatchery",
        "addon": None
    },
    "zergling": {
        "name": "Zergling",
        "build_time": 0.40,  # 24 seconds (spawns 2)
        "supply": 0.5,  # 1 supply per pair
        "minerals": 25,  # 50 per pair, 25 each
        "vespene": 0,
        "building": "Hatchery",
        "addon": None,
        "spawns_two": True
    },
    "baneling": {
        "name": "Baneling",
        "build_time": 0.283,  # 17 seconds
        "supply": 0,  # Uses Zergling supply
        "minerals": 25,
        "vespene": 25,
        "building": "Hatchery",
        "addon": None,
        "morph_from": "zergling"
    },
    "roach": {
        "name": "Roach",
        "build_time": 0.433,  # 26 seconds
        "supply": 2,
        "minerals": 75,
        "vespene": 25,
        "building": "Hatchery",
        "addon": None
    },
    "ravager": {
        "name": "Ravager",
        "build_time": 0.217,  # 13 seconds
        "supply": 1,  # +1 supply cost
        "minerals": 25,
        "vespene": 75,
        "building": "Hatchery",
        "addon": None,
        "morph_from": "roach"
    },
    "hydralisk": {
        "name": "Hydralisk",
        "build_time": 0.533,  # 32 seconds
        "supply": 2,
        "minerals": 100,
        "vespene": 50,
        "building": "Hatchery",
        "addon": None
    },
    "lurker": {
        "name": "Lurker",
        "build_time": 0.40,  # 24 seconds
        "supply": 1,  # +1 supply
        "minerals": 50,
        "vespene": 100,
        "building": "Hatchery",
        "addon": None,
        "morph_from": "hydralisk"
    },
    "infestor": {
        "name": "Infestor",
        "build_time": 0.733,  # 44 seconds
        "supply": 2,
        "minerals": 100,
        "vespene": 150,
        "building": "Hatchery",
        "addon": None
    },
    "swarm_host": {
        "name": "Swarm Host",
        "build_time": 0.617,  # 37 seconds
        "supply": 3,
        "minerals": 100,
        "vespene": 75,
        "building": "Hatchery",
        "addon": None
    },
    "ultralisk": {
        "name": "Ultralisk",
        "build_time": 0.817,  # 49 seconds
        "supply": 6,
        "minerals": 300,
        "vespene": 200,
        "building": "Hatchery",
        "addon": None
    },
    "mutalisk": {
        "name": "Mutalisk",
        "build_time": 0.567,  # 34 seconds
        "supply": 2,
        "minerals": 100,
        "vespene": 100,
        "building": "Hatchery",
        "addon": None
    },
    "corruptor": {
        "name": "Corruptor",
        "build_time": 0.60,  # 36 seconds
        "supply": 2,
        "minerals": 150,
        "vespene": 100,
        "building": "Hatchery",
        "addon": None
    },
    "brood_lord": {
        "name": "Brood Lord",
        "build_time": 0.567,  # 34 seconds
        "supply": 2,  # +2 supply
        "minerals": 150,
        "vespene": 150,
        "building": "Hatchery",
        "addon": None,
        "morph_from": "corruptor"
    },
    "viper": {
        "name": "Viper",
        "build_time": 0.60,  # 36 seconds
        "supply": 3,
        "minerals": 100,
        "vespene": 200,
        "building": "Hatchery",
        "addon": None
    }
}

# All races combined
ALL_UNITS = {
    "Terran": TERRAN_UNITS,
    "Protoss": PROTOSS_UNITS,
    "Zerg": ZERG_UNITS
}

# Building categories by race
BUILDING_CATEGORIES = {
    "Terran": ["Barracks", "Factory", "Starport", "Command Center"],
    "Protoss": ["Gateway", "Robotics Facility", "Stargate", "Nexus"],
    "Zerg": ["Hatchery"]
}


def get_units_by_building(race="Terran"):
    """Group units by their production building for a specific race."""
    units = ALL_UNITS.get(race, TERRAN_UNITS)
    categories = BUILDING_CATEGORIES.get(race, BUILDING_CATEGORIES["Terran"])

    buildings = {cat: [] for cat in categories}

    for unit_id, unit in units.items():
        building = unit["building"]
        # Map building to category
        if building in buildings:
            buildings[building].append({"id": unit_id, **unit})
        else:
            # For Zerg, most units come from Hatchery
            if race == "Zerg" and "Hatchery" in buildings:
                buildings["Hatchery"].append({"id": unit_id, **unit})

    return buildings


def get_supply_structure(race="Terran"):
    """Get supply structure info for a race."""
    return SUPPLY_STRUCTURES.get(race, SUPPLY_STRUCTURES["Terran"])
