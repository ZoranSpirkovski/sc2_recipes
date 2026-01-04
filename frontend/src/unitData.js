// SC2 Unit Data for All Races (mirrors backend)
export const MINERALS_PER_WORKER_PER_MINUTE = 59;
export const VESPENE_PER_WORKER_PER_MINUTE = 52.5;
export const DEFAULT_MINERAL_WORKERS_PER_BASE = 16;
export const DEFAULT_GAS_WORKERS_PER_BASE = 6;

// Legacy constants for backward compatibility
export const SUPPLY_PER_DEPOT = 8;
export const DEPOT_BUILD_TIME = 0.35;
export const DEPOT_MINERAL_COST = 100;

// Supply structure constants by race
export const SUPPLY_STRUCTURES = {
  Terran: {
    name: "Supply Depot",
    supply: 8,
    build_time: 0.35,
    minerals: 100,
    vespene: 0,
    worker_required: true
  },
  Protoss: {
    name: "Pylon",
    supply: 8,
    build_time: 0.30,
    minerals: 100,
    vespene: 0,
    worker_required: true
  },
  Zerg: {
    name: "Overlord",
    supply: 8,
    build_time: 0.417,
    minerals: 100,
    vespene: 0,
    worker_required: false
  }
};

// Terran Units
export const TERRAN_UNITS = {
  marine: {
    name: "Marine",
    build_time: 0.30,
    supply: 1,
    minerals: 50,
    vespene: 0,
    building: "Barracks",
    addon: "Reactor"
  },
  marauder: {
    name: "Marauder",
    build_time: 0.35,
    supply: 2,
    minerals: 100,
    vespene: 25,
    building: "Barracks",
    addon: "Tech Lab"
  },
  reaper: {
    name: "Reaper",
    build_time: 0.533,
    supply: 1,
    minerals: 50,
    vespene: 50,
    building: "Barracks",
    addon: null
  },
  ghost: {
    name: "Ghost",
    build_time: 0.483,
    supply: 2,
    minerals: 150,
    vespene: 125,
    building: "Barracks",
    addon: "Tech Lab"
  },
  hellion: {
    name: "Hellion",
    build_time: 0.35,
    supply: 2,
    minerals: 100,
    vespene: 0,
    building: "Factory",
    addon: "Reactor"
  },
  hellbat: {
    name: "Hellbat",
    build_time: 0.35,
    supply: 2,
    minerals: 100,
    vespene: 0,
    building: "Factory",
    addon: "Reactor"
  },
  widow_mine: {
    name: "Widow Mine",
    build_time: 0.35,
    supply: 2,
    minerals: 75,
    vespene: 25,
    building: "Factory",
    addon: "Reactor"
  },
  cyclone: {
    name: "Cyclone",
    build_time: 0.533,
    supply: 3,
    minerals: 150,
    vespene: 100,
    building: "Factory",
    addon: null
  },
  siege_tank: {
    name: "Siege Tank",
    build_time: 0.533,
    supply: 3,
    minerals: 150,
    vespene: 125,
    building: "Factory",
    addon: "Tech Lab"
  },
  thor: {
    name: "Thor",
    build_time: 0.717,
    supply: 6,
    minerals: 300,
    vespene: 200,
    building: "Factory",
    addon: "Tech Lab"
  },
  viking: {
    name: "Viking",
    build_time: 0.50,
    supply: 2,
    minerals: 150,
    vespene: 75,
    building: "Starport",
    addon: "Reactor"
  },
  medivac: {
    name: "Medivac",
    build_time: 0.50,
    supply: 2,
    minerals: 100,
    vespene: 100,
    building: "Starport",
    addon: "Reactor"
  },
  liberator: {
    name: "Liberator",
    build_time: 0.717,
    supply: 3,
    minerals: 150,
    vespene: 125,
    building: "Starport",
    addon: null
  },
  raven: {
    name: "Raven",
    build_time: 0.567,
    supply: 2,
    minerals: 100,
    vespene: 150,
    building: "Starport",
    addon: "Tech Lab"
  },
  banshee: {
    name: "Banshee",
    build_time: 0.717,
    supply: 3,
    minerals: 150,
    vespene: 100,
    building: "Starport",
    addon: "Tech Lab"
  },
  battlecruiser: {
    name: "Battlecruiser",
    build_time: 1.067,
    supply: 6,
    minerals: 400,
    vespene: 300,
    building: "Starport",
    addon: "Tech Lab"
  },
  scv: {
    name: "SCV",
    build_time: 0.20,
    supply: 1,
    minerals: 50,
    vespene: 0,
    building: "Command Center",
    addon: null
  }
};

// Protoss Units
export const PROTOSS_UNITS = {
  probe: {
    name: "Probe",
    build_time: 0.283,
    supply: 1,
    minerals: 50,
    vespene: 0,
    building: "Nexus",
    addon: null
  },
  zealot: {
    name: "Zealot",
    build_time: 0.467,
    supply: 2,
    minerals: 100,
    vespene: 0,
    building: "Gateway",
    addon: null
  },
  stalker: {
    name: "Stalker",
    build_time: 0.50,
    supply: 2,
    minerals: 125,
    vespene: 50,
    building: "Gateway",
    addon: null
  },
  sentry: {
    name: "Sentry",
    build_time: 0.433,
    supply: 2,
    minerals: 50,
    vespene: 100,
    building: "Gateway",
    addon: null
  },
  adept: {
    name: "Adept",
    build_time: 0.467,
    supply: 2,
    minerals: 100,
    vespene: 25,
    building: "Gateway",
    addon: null
  },
  high_templar: {
    name: "High Templar",
    build_time: 0.733,
    supply: 2,
    minerals: 50,
    vespene: 150,
    building: "Gateway",
    addon: null
  },
  dark_templar: {
    name: "Dark Templar",
    build_time: 0.733,
    supply: 2,
    minerals: 125,
    vespene: 125,
    building: "Gateway",
    addon: null
  },
  archon: {
    name: "Archon",
    build_time: 0.20,
    supply: 0,
    minerals: 0,
    vespene: 0,
    building: "Gateway",
    addon: null,
    morph_from: "templar"
  },
  observer: {
    name: "Observer",
    build_time: 0.367,
    supply: 1,
    minerals: 25,
    vespene: 75,
    building: "Robotics Facility",
    addon: null
  },
  immortal: {
    name: "Immortal",
    build_time: 0.733,
    supply: 4,
    minerals: 275,
    vespene: 100,
    building: "Robotics Facility",
    addon: null
  },
  warp_prism: {
    name: "Warp Prism",
    build_time: 0.60,
    supply: 2,
    minerals: 250,
    vespene: 0,
    building: "Robotics Facility",
    addon: null
  },
  colossus: {
    name: "Colossus",
    build_time: 1.00,
    supply: 6,
    minerals: 300,
    vespene: 200,
    building: "Robotics Facility",
    addon: null
  },
  disruptor: {
    name: "Disruptor",
    build_time: 0.833,
    supply: 3,
    minerals: 150,
    vespene: 150,
    building: "Robotics Facility",
    addon: null
  },
  phoenix: {
    name: "Phoenix",
    build_time: 0.417,
    supply: 2,
    minerals: 150,
    vespene: 100,
    building: "Stargate",
    addon: null
  },
  void_ray: {
    name: "Void Ray",
    build_time: 0.617,
    supply: 4,
    minerals: 250,
    vespene: 150,
    building: "Stargate",
    addon: null
  },
  oracle: {
    name: "Oracle",
    build_time: 0.617,
    supply: 3,
    minerals: 150,
    vespene: 150,
    building: "Stargate",
    addon: null
  },
  carrier: {
    name: "Carrier",
    build_time: 1.00,
    supply: 6,
    minerals: 350,
    vespene: 250,
    building: "Stargate",
    addon: null
  },
  tempest: {
    name: "Tempest",
    build_time: 0.717,
    supply: 5,
    minerals: 250,
    vespene: 175,
    building: "Stargate",
    addon: null
  },
  mothership: {
    name: "Mothership",
    build_time: 1.50,
    supply: 8,
    minerals: 400,
    vespene: 400,
    building: "Nexus",
    addon: null
  }
};

// Zerg Units
export const ZERG_UNITS = {
  drone: {
    name: "Drone",
    build_time: 0.283,
    supply: 1,
    minerals: 50,
    vespene: 0,
    building: "Hatchery",
    addon: null
  },
  queen: {
    name: "Queen",
    build_time: 0.733,
    supply: 2,
    minerals: 150,
    vespene: 0,
    building: "Hatchery",
    addon: null
  },
  zergling: {
    name: "Zergling",
    build_time: 0.40,
    supply: 0.5,
    minerals: 25,
    vespene: 0,
    building: "Hatchery",
    addon: null,
    spawns_two: true
  },
  baneling: {
    name: "Baneling",
    build_time: 0.283,
    supply: 0,
    minerals: 25,
    vespene: 25,
    building: "Hatchery",
    addon: null,
    morph_from: "zergling"
  },
  roach: {
    name: "Roach",
    build_time: 0.433,
    supply: 2,
    minerals: 75,
    vespene: 25,
    building: "Hatchery",
    addon: null
  },
  ravager: {
    name: "Ravager",
    build_time: 0.217,
    supply: 1,
    minerals: 25,
    vespene: 75,
    building: "Hatchery",
    addon: null,
    morph_from: "roach"
  },
  hydralisk: {
    name: "Hydralisk",
    build_time: 0.533,
    supply: 2,
    minerals: 100,
    vespene: 50,
    building: "Hatchery",
    addon: null
  },
  lurker: {
    name: "Lurker",
    build_time: 0.40,
    supply: 1,
    minerals: 50,
    vespene: 100,
    building: "Hatchery",
    addon: null,
    morph_from: "hydralisk"
  },
  infestor: {
    name: "Infestor",
    build_time: 0.733,
    supply: 2,
    minerals: 100,
    vespene: 150,
    building: "Hatchery",
    addon: null
  },
  swarm_host: {
    name: "Swarm Host",
    build_time: 0.617,
    supply: 3,
    minerals: 100,
    vespene: 75,
    building: "Hatchery",
    addon: null
  },
  ultralisk: {
    name: "Ultralisk",
    build_time: 0.817,
    supply: 6,
    minerals: 300,
    vespene: 200,
    building: "Hatchery",
    addon: null
  },
  mutalisk: {
    name: "Mutalisk",
    build_time: 0.567,
    supply: 2,
    minerals: 100,
    vespene: 100,
    building: "Hatchery",
    addon: null
  },
  corruptor: {
    name: "Corruptor",
    build_time: 0.60,
    supply: 2,
    minerals: 150,
    vespene: 100,
    building: "Hatchery",
    addon: null
  },
  brood_lord: {
    name: "Brood Lord",
    build_time: 0.567,
    supply: 2,
    minerals: 150,
    vespene: 150,
    building: "Hatchery",
    addon: null,
    morph_from: "corruptor"
  },
  viper: {
    name: "Viper",
    build_time: 0.60,
    supply: 3,
    minerals: 100,
    vespene: 200,
    building: "Hatchery",
    addon: null
  }
};

// All races combined
export const ALL_UNITS = {
  Terran: TERRAN_UNITS,
  Protoss: PROTOSS_UNITS,
  Zerg: ZERG_UNITS
};

// Building categories by race
export const BUILDING_CATEGORIES = {
  Terran: ["Barracks", "Factory", "Starport", "Command Center"],
  Protoss: ["Gateway", "Robotics Facility", "Stargate", "Nexus"],
  Zerg: ["Hatchery"]
};

export function getUnitsByBuilding(race = "Terran") {
  const units = ALL_UNITS[race] || TERRAN_UNITS;
  const categories = BUILDING_CATEGORIES[race] || BUILDING_CATEGORIES.Terran;

  const buildings = {};
  categories.forEach(cat => buildings[cat] = []);

  for (const [unitId, unit] of Object.entries(units)) {
    const building = unit.building;
    if (buildings[building]) {
      buildings[building].push({ id: unitId, ...unit });
    } else if (race === "Zerg" && buildings["Hatchery"]) {
      buildings["Hatchery"].push({ id: unitId, ...unit });
    }
  }

  return buildings;
}

export function getSupplyStructure(race = "Terran") {
  return SUPPLY_STRUCTURES[race] || SUPPLY_STRUCTURES.Terran;
}
