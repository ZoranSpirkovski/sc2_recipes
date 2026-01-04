import React, { useState, useMemo, useCallback } from 'react';
import {
  TERRAN_UNITS,
  getUnitsByBuilding,
  MINERALS_PER_WORKER_PER_MINUTE,
  VESPENE_PER_WORKER_PER_MINUTE,
  DEFAULT_MINERAL_WORKERS_PER_BASE,
  DEFAULT_GAS_WORKERS_PER_BASE,
  SUPPLY_PER_DEPOT,
  DEPOT_BUILD_TIME,
  DEPOT_MINERAL_COST
} from './unitData';

const BUILDINGS = ["Barracks", "Factory", "Starport", "Command Center"];

function App() {
  // Recipe state
  const [recipeName, setRecipeName] = useState("Bio-Tank 3 Base");
  const [bases, setBases] = useState(3);
  const [mineralWorkersPerBase, setMineralWorkersPerBase] = useState(DEFAULT_MINERAL_WORKERS_PER_BASE);
  const [gasWorkersPerBase, setGasWorkersPerBase] = useState(DEFAULT_GAS_WORKERS_PER_BASE);
  const [showSettings, setShowSettings] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Units state: { unitId: { enabled: boolean, buildings: number } }
  const [units, setUnits] = useState(() => {
    const initial = {};
    for (const unitId of Object.keys(TERRAN_UNITS)) {
      initial[unitId] = { enabled: false, buildings: 1 };
    }
    return initial;
  });

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

      const unit = TERRAN_UNITS[unitId];
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

    // Supply depot costs: need X/8 depots per minute to provide X supply
    // One SCV can build 1/0.35 = 2.86 depots/min, so need depots * 0.35 SCVs
    const depotsPerMinute = totalSupply / SUPPLY_PER_DEPOT;
    const depotMineralCost = depotsPerMinute * DEPOT_MINERAL_COST;
    const scvsForDepots = depotsPerMinute * DEPOT_BUILD_TIME;
    totalMinerals += depotMineralCost;

    const mineralsRemaining = income.mineralIncome - totalMinerals;
    const vespeneRemaining = income.vespeneIncome - totalVespene;

    return {
      unitStats: unitStats.sort((a, b) => a.building.localeCompare(b.building)),
      totalSupply,
      depotsPerMinute,
      depotMineralCost,
      scvsForDepots,
      mineralsUsed: totalMinerals,
      vespeneUsed: totalVespene,
      mineralsRemaining,
      vespeneRemaining
    };
  }, [units, income]);

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
      const current = prev[unitId].buildings;
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

  const unitsByBuilding = getUnitsByBuilding();

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
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
          ~{production.depotsPerMinute.toFixed(1)} depots/min | {production.scvsForDepots.toFixed(1)} SCVs | {production.depotMineralCost.toFixed(0)} M/min
        </span>
        <span className="supply-info">
          (1 SCV = {(SUPPLY_PER_DEPOT / DEPOT_BUILD_TIME).toFixed(1)} supply/min max)
        </span>
      </div>

      {/* Unit Selection Grid */}
      <div className="unit-grid">
        {BUILDINGS.map(building => (
          <div key={building} className="building-column">
            <h3 className="building-header">{building}</h3>
            {unitsByBuilding[building].map(unit => {
              const config = units[unit.id];
              return (
                <div key={unit.id} className={`unit-row ${config.enabled ? 'enabled' : ''}`}>
                  <label className="unit-checkbox">
                    <input
                      type="checkbox"
                      checked={config.enabled}
                      onChange={() => toggleUnit(unit.id)}
                    />
                    <span className="unit-name">{unit.name}</span>
                  </label>
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
    </div>
  );
}

export default App;
