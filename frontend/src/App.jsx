import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  ALL_UNITS,
  BUILDING_CATEGORIES,
  getUnitsByBuilding,
  getSupplyStructure,
  MINERALS_PER_WORKER_PER_MINUTE,
  VESPENE_PER_WORKER_PER_MINUTE,
  DEFAULT_MINERAL_WORKERS_PER_BASE,
  DEFAULT_GAS_WORKERS_PER_BASE
} from './unitData';

const RACES = ["Terran", "Protoss", "Zerg"];
const STORAGE_KEY = 'sc2_custom_unit_data';

// Load custom unit data from localStorage
function loadCustomUnitData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

// Save custom unit data to localStorage
function saveCustomUnitData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function App() {
  // Race selection
  const [race, setRace] = useState("Terran");

  // Recipe state
  const [recipeName, setRecipeName] = useState("Bio-Tank 3 Base");
  const [bases, setBases] = useState(3);
  const [mineralWorkersPerBase, setMineralWorkersPerBase] = useState(DEFAULT_MINERAL_WORKERS_PER_BASE);
  const [gasWorkersPerBase, setGasWorkersPerBase] = useState(DEFAULT_GAS_WORKERS_PER_BASE);
  const [showSettings, setShowSettings] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [ignoreSupplyCost, setIgnoreSupplyCost] = useState(false);

  // Custom unit data overrides (persisted to localStorage)
  const [customUnitData, setCustomUnitData] = useState(loadCustomUnitData);

  // Unit editor modal state
  const [editingUnit, setEditingUnit] = useState(null);

  // Get default units for current race
  const defaultUnits = ALL_UNITS[race];

  // Merge default units with custom overrides
  const currentUnits = useMemo(() => {
    const customRaceData = customUnitData[race] || {};
    const merged = {};
    for (const [unitId, unit] of Object.entries(defaultUnits)) {
      merged[unitId] = { ...unit, ...customRaceData[unitId] };
    }
    return merged;
  }, [race, customUnitData, defaultUnits]);

  const currentBuildings = BUILDING_CATEGORIES[race];
  const supplyStructure = getSupplyStructure(race);

  // Units state: { unitId: { enabled: boolean, buildings: number } }
  const [units, setUnits] = useState(() => {
    const initial = {};
    for (const unitId of Object.keys(defaultUnits)) {
      initial[unitId] = { enabled: false, buildings: 1 };
    }
    return initial;
  });

  // Reset units when race changes
  useEffect(() => {
    const initial = {};
    for (const unitId of Object.keys(defaultUnits)) {
      initial[unitId] = { enabled: false, buildings: 1 };
    }
    setUnits(initial);
  }, [race, defaultUnits]);

  // Calculate income
  const income = useMemo(() => {
    const totalMineralWorkers = bases * mineralWorkersPerBase;
    const totalGasWorkers = bases * gasWorkersPerBase;
    return {
      mineralWorkers: totalMineralWorkers,
      gasWorkers: totalGasWorkers,
      mineralIncome: totalMineralWorkers * MINERALS_PER_WORKER_PER_MINUTE,
      vespeneIncome: totalGasWorkers * VESPENE_PER_WORKER_PER_MINUTE
    };
  }, [bases, mineralWorkersPerBase, gasWorkersPerBase]);

  // Calculate production stats
  const production = useMemo(() => {
    const unitStats = [];
    let totalMinerals = 0;
    let totalVespene = 0;
    let totalSupply = 0;

    for (const [unitId, config] of Object.entries(units)) {
      if (!config.enabled || config.buildings <= 0) continue;

      const unit = currentUnits[unitId];
      if (!unit) continue;

      const builtPerMinute = 1 / unit.build_time;
      const totalBuiltPerMinute = builtPerMinute * config.buildings;
      const mineralsPerMin = totalBuiltPerMinute * unit.minerals;
      const vespenePerMin = totalBuiltPerMinute * unit.vespene;
      const supplyPerMin = totalBuiltPerMinute * unit.supply;

      unitStats.push({
        id: unitId,
        name: unit.name,
        building: unit.building,
        addon: unit.addon,
        buildings: config.buildings,
        rate: totalBuiltPerMinute,
        supplyPerMin,
        mineralsPerMin,
        vespenePerMin
      });

      totalMinerals += mineralsPerMin;
      totalVespene += vespenePerMin;
      totalSupply += supplyPerMin;
    }

    // Supply structure costs (depot/pylon/overlord)
    const supplyPerStructure = supplyStructure.supply;
    const structureBuildTime = supplyStructure.build_time;
    const structureMineralCost = supplyStructure.minerals;

    const structuresPerMinute = totalSupply / supplyPerStructure;
    const structureMineralCostPerMin = structuresPerMinute * structureMineralCost;
    const workersForSupply = supplyStructure.worker_required
      ? structuresPerMinute * structureBuildTime
      : 0;

    if (!ignoreSupplyCost) {
      totalMinerals += structureMineralCostPerMin;
    }

    const mineralsRemaining = income.mineralIncome - totalMinerals;
    const vespeneRemaining = income.vespeneIncome - totalVespene;

    return {
      unitStats: unitStats.sort((a, b) => a.building.localeCompare(b.building)),
      totalSupply,
      structuresPerMinute,
      structureMineralCost: structureMineralCostPerMin,
      workersForSupply,
      mineralsUsed: totalMinerals,
      vespeneUsed: totalVespene,
      mineralsRemaining,
      vespeneRemaining
    };
  }, [units, income, currentUnits, supplyStructure, ignoreSupplyCost]);

  // Toggle unit enabled
  const toggleUnit = useCallback((unitId) => {
    setUnits(prev => ({
      ...prev,
      [unitId]: {
        ...prev[unitId],
        enabled: !prev[unitId].enabled
      }
    }));
  }, []);

  // Change building count
  const changeBuildings = useCallback((unitId, delta) => {
    setUnits(prev => {
      const current = prev[unitId]?.buildings || 1;
      const newValue = Math.max(1, Math.min(20, current + delta));
      return {
        ...prev,
        [unitId]: {
          ...prev[unitId],
          buildings: newValue
        }
      };
    });
  }, []);

  // Update custom unit data
  const updateUnitData = useCallback((unitId, field, value) => {
    setCustomUnitData(prev => {
      const newData = {
        ...prev,
        [race]: {
          ...prev[race],
          [unitId]: {
            ...prev[race]?.[unitId],
            [field]: value
          }
        }
      };
      saveCustomUnitData(newData);
      return newData;
    });
  }, [race]);

  // Reset unit to default
  const resetUnitToDefault = useCallback((unitId) => {
    setCustomUnitData(prev => {
      const newData = { ...prev };
      if (newData[race]) {
        delete newData[race][unitId];
        if (Object.keys(newData[race]).length === 0) {
          delete newData[race];
        }
      }
      saveCustomUnitData(newData);
      return newData;
    });
  }, [race]);

  // Reset all units for current race
  const resetAllUnitsForRace = useCallback(() => {
    if (confirm(`Reset all ${race} units to default values?`)) {
      setCustomUnitData(prev => {
        const newData = { ...prev };
        delete newData[race];
        saveCustomUnitData(newData);
        return newData;
      });
    }
  }, [race]);

  // Check if unit has custom data
  const hasCustomData = useCallback((unitId) => {
    return customUnitData[race]?.[unitId] !== undefined;
  }, [race, customUnitData]);

  // Get balance color class
  const getBalanceClass = (value) => {
    if (value >= 20) return 'balance-positive';
    if (value <= -20) return 'balance-negative';
    return 'balance-neutral';
  };

  // Generate PDF
  const generatePdf = async () => {
    setIsGeneratingPdf(true);
    try {
      const recipeData = {
        name: recipeName,
        race,
        bases,
        mineral_workers_per_base: mineralWorkersPerBase,
        gas_workers_per_base: gasWorkersPerBase,
        units: Object.fromEntries(
          Object.entries(units).map(([id, config]) => [
            id,
            { enabled: config.enabled, buildings: config.buildings }
          ])
        )
      };

      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeData)
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sc2_${recipeName.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Make sure the backend server is running.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Get units by building with custom data merged
  const unitsByBuilding = useMemo(() => {
    const categories = BUILDING_CATEGORIES[race];
    const buildings = {};
    categories.forEach(cat => buildings[cat] = []);

    for (const [unitId, unit] of Object.entries(currentUnits)) {
      const building = unit.building;
      if (buildings[building]) {
        buildings[building].push({ id: unitId, ...unit });
      } else if (race === "Zerg" && buildings["Hatchery"]) {
        buildings["Hatchery"].push({ id: unitId, ...unit });
      }
    }

    return buildings;
  }, [race, currentUnits]);

  const maxSupplyPerWorker = supplyStructure.supply / supplyStructure.build_time;

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="race-selector">
          {RACES.map(r => (
            <button
              key={r}
              className={`race-btn ${race === r ? 'active' : ''}`}
              onClick={() => setRace(r)}
            >
              {r}
            </button>
          ))}
        </div>
        <input
          type="text"
          className="recipe-name-input"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          placeholder="Recipe Name"
        />
        <button
          className="pdf-button"
          onClick={generatePdf}
          disabled={isGeneratingPdf}
        >
          {isGeneratingPdf ? 'Generating...' : 'Generate PDF'}
        </button>
      </header>

      {/* Economy Bar */}
      <div className="economy-bar">
        <div className="economy-item">
          <span className="economy-label">Bases:</span>
          <button className="counter-btn" onClick={() => setBases(Math.max(1, bases - 1))}>-</button>
          <span className="counter-value">{bases}</span>
          <button className="counter-btn" onClick={() => setBases(Math.min(10, bases + 1))}>+</button>
        </div>
        <div className="economy-item">
          <span className="economy-label">Workers:</span>
          <span className="economy-value">{income.mineralWorkers}M {income.gasWorkers}V</span>
        </div>
        <div className="economy-item">
          <span className="economy-label">Income:</span>
          <span className="economy-value minerals">{income.mineralIncome.toFixed(0)}M</span>
          <span className="economy-value vespene">{income.vespeneIncome.toFixed(0)}V</span>
        </div>
        <button className="settings-btn" onClick={() => setShowSettings(!showSettings)}>
          {showSettings ? 'x' : '\u2699'}
        </button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="settings-panel">
          <div className="setting-item">
            <label>Mineral Workers per Base:</label>
            <input
              type="number"
              value={mineralWorkersPerBase}
              onChange={(e) => setMineralWorkersPerBase(Math.max(0, parseInt(e.target.value) || 0))}
              min="0"
              max="24"
            />
          </div>
          <div className="setting-item">
            <label>Gas Workers per Base:</label>
            <input
              type="number"
              value={gasWorkersPerBase}
              onChange={(e) => setGasWorkersPerBase(Math.max(0, parseInt(e.target.value) || 0))}
              min="0"
              max="12"
            />
          </div>
          <label className="setting-checkbox">
            <input
              type="checkbox"
              checked={ignoreSupplyCost}
              onChange={(e) => setIgnoreSupplyCost(e.target.checked)}
            />
            <span>Ignore supply cost</span>
          </label>
          <button
            className="reset-btn"
            onClick={resetAllUnitsForRace}
          >
            Reset {race} Units
          </button>
        </div>
      )}

      {/* Resource Balance */}
      <div className="balance-bar">
        <div className="balance-item">
          <span className="balance-label">M Used</span>
          <span className="balance-value">{production.mineralsUsed.toFixed(0)}</span>
        </div>
        <div className={`balance-item ${getBalanceClass(production.mineralsRemaining)}`}>
          <span className="balance-label">M Left</span>
          <span className="balance-value">
            {production.mineralsRemaining >= 0 ? '+' : ''}{production.mineralsRemaining.toFixed(0)}
          </span>
        </div>
        <div className="balance-item">
          <span className="balance-label">V Used</span>
          <span className="balance-value">{production.vespeneUsed.toFixed(0)}</span>
        </div>
        <div className={`balance-item ${getBalanceClass(production.vespeneRemaining)}`}>
          <span className="balance-label">V Left</span>
          <span className="balance-value">
            {production.vespeneRemaining >= 0 ? '+' : ''}{production.vespeneRemaining.toFixed(0)}
          </span>
        </div>
      </div>

      {/* Supply Rate */}
      <div className="supply-bar">
        <span>Supply rate: {production.totalSupply.toFixed(1)}/min</span>
        <span className="supply-auto">
          ~{production.structuresPerMinute.toFixed(1)} {supplyStructure.name}s/min
          {supplyStructure.worker_required && ` | ${production.workersForSupply.toFixed(1)} workers`}
          {' | '}{production.structureMineralCost.toFixed(0)} M/min
        </span>
        <span className="supply-info">
          (1 {supplyStructure.worker_required ? 'worker' : 'larva'} = {maxSupplyPerWorker.toFixed(1)} supply/min max)
        </span>
      </div>

      {/* Unit Selection Grid */}
      <div className="unit-grid" style={{ gridTemplateColumns: `repeat(${currentBuildings.length}, 1fr)` }}>
        {currentBuildings.map(building => (
          <div key={building} className="building-column">
            <h3 className="building-header">{building}</h3>
            {(unitsByBuilding[building] || []).map(unit => {
              const config = units[unit.id];
              if (!config) return null;
              const isCustom = hasCustomData(unit.id);
              return (
                <div key={unit.id} className={`unit-row ${config.enabled ? 'enabled' : ''}`}>
                  <label className="unit-checkbox">
                    <input
                      type="checkbox"
                      checked={config.enabled}
                      onChange={() => toggleUnit(unit.id)}
                    />
                    <span className={`unit-name ${isCustom ? 'custom' : ''}`}>{unit.name}</span>
                  </label>
                  <div className="unit-actions">
                    {showSettings && (
                      <button
                        className="edit-btn"
                        onClick={() => setEditingUnit(unit.id)}
                        title="Edit unit data"
                      >
                        &#9998;
                      </button>
                    )}
                    {config.enabled && (
                      <div className="building-counter">
                        <button
                          className="counter-btn small"
                          onClick={() => changeBuildings(unit.id, -1)}
                        >
                          -
                        </button>
                        <span className="counter-value">{config.buildings}</span>
                        <button
                          className="counter-btn small"
                          onClick={() => changeBuildings(unit.id, 1)}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Production Table */}
      {production.unitStats.length > 0 && (
        <div className="production-table">
          <table>
            <thead>
              <tr>
                <th>Unit</th>
                <th>Bldgs</th>
                <th>Rate</th>
                <th>Sup/m</th>
                <th>M/m</th>
                <th>V/m</th>
              </tr>
            </thead>
            <tbody>
              {production.unitStats.map(stat => (
                <tr key={stat.id}>
                  <td className="unit-name-cell">{stat.name}</td>
                  <td>{stat.buildings}</td>
                  <td>{stat.rate.toFixed(2)}</td>
                  <td>{stat.supplyPerMin.toFixed(1)}</td>
                  <td>{stat.mineralsPerMin.toFixed(0)}</td>
                  <td>{stat.vespenePerMin.toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Unit Editor Modal */}
      {editingUnit && (
        <div className="modal-overlay" onClick={() => setEditingUnit(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit {currentUnits[editingUnit]?.name}</h3>
              <button className="modal-close" onClick={() => setEditingUnit(null)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="edit-field">
                <label>Build Time (minutes):</label>
                <input
                  type="number"
                  step="0.001"
                  value={currentUnits[editingUnit]?.build_time || 0}
                  onChange={(e) => updateUnitData(editingUnit, 'build_time', parseFloat(e.target.value) || 0)}
                />
                <span className="field-hint">
                  Default: {defaultUnits[editingUnit]?.build_time} min ({(defaultUnits[editingUnit]?.build_time * 60).toFixed(0)}s)
                </span>
              </div>
              <div className="edit-field">
                <label>Minerals:</label>
                <input
                  type="number"
                  value={currentUnits[editingUnit]?.minerals || 0}
                  onChange={(e) => updateUnitData(editingUnit, 'minerals', parseInt(e.target.value) || 0)}
                />
                <span className="field-hint">Default: {defaultUnits[editingUnit]?.minerals}</span>
              </div>
              <div className="edit-field">
                <label>Vespene:</label>
                <input
                  type="number"
                  value={currentUnits[editingUnit]?.vespene || 0}
                  onChange={(e) => updateUnitData(editingUnit, 'vespene', parseInt(e.target.value) || 0)}
                />
                <span className="field-hint">Default: {defaultUnits[editingUnit]?.vespene}</span>
              </div>
              <div className="edit-field">
                <label>Supply:</label>
                <input
                  type="number"
                  step="0.5"
                  value={currentUnits[editingUnit]?.supply || 0}
                  onChange={(e) => updateUnitData(editingUnit, 'supply', parseFloat(e.target.value) || 0)}
                />
                <span className="field-hint">Default: {defaultUnits[editingUnit]?.supply}</span>
              </div>
            </div>
            <div className="modal-footer">
              {hasCustomData(editingUnit) && (
                <button
                  className="reset-btn"
                  onClick={() => {
                    resetUnitToDefault(editingUnit);
                  }}
                >
                  Reset to Default
                </button>
              )}
              <button className="save-btn" onClick={() => setEditingUnit(null)}>Done</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
