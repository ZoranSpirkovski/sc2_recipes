// SC2 Terran Unit Data (mirrors backend)
export const MINERALS_PER_WORKER_PER_MINUTE = 59;
export const VESPENE_PER_WORKER_PER_MINUTE = 52.5;
export const DEFAULT_MINERAL_WORKERS_PER_BASE = 16;
export const DEFAULT_GAS_WORKERS_PER_BASE = 6;
export const SUPPLY_PER_DEPOT = 8;
export const DEPOT_BUILD_TIME = 0.35;
export const DEPOT_MINERAL_COST = 100;

export const TERRAN_UNITS = {
  // Barracks Units
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
  // Factory Units
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
  // Starport Units
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
  // Command Center Units
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

export function getUnitsByBuilding() {
  const buildings = {
    "Barracks": [],
    "Factory": [],
    "Starport": [],
    "Command Center": []
  };

  for (const [unitId, unit] of Object.entries(TERRAN_UNITS)) {
    buildings[unit.building].push({ id: unitId, ...unit });
  }

  return buildings;
}
