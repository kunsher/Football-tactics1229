
import React from 'react';
import type { PlayerPosition } from '../types';
import { PlayerIcon, InfoIcon } from './icons';

interface ControlPanelProps {
  viewSettings: {
    showFormationLines: boolean;
    showPassingNetwork: boolean;
    showHeatmap: boolean;
  };
  setViewSettings: {
    setShowFormationLines: (value: boolean) => void;
    setShowPassingNetwork: (value: boolean) => void;
    setShowHeatmap: (value: boolean) => void;
  };
  hoveredPlayer: PlayerPosition | null;
}

const ToggleSwitch: React.FC<{
  label: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  disabled?: boolean;
}> = ({ label, enabled, onChange, disabled = false }) => (
  <label className={`flex items-center justify-between cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
    <span className="text-sm font-medium text-gray-300">{label}</span>
    <div className="relative">
      <input type="checkbox" className="sr-only" checked={enabled} onChange={(e) => !disabled && onChange(e.target.checked)} disabled={disabled} />
      <div className={`block w-10 h-6 rounded-full transition-colors ${enabled ? 'bg-blue-500' : 'bg-gray-600'}`}></div>
      <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${enabled ? 'translate-x-4' : ''}`}></div>
    </div>
  </label>
);


export const ControlPanel: React.FC<ControlPanelProps> = ({ viewSettings, setViewSettings, hoveredPlayer }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 flex flex-col gap-4 h-full">
      <div>
        <h2 className="text-lg font-semibold text-white mb-3">Display Layers</h2>
        <div className="space-y-3">
          <ToggleSwitch
            label="Formation Lines"
            enabled={viewSettings.showFormationLines}
            onChange={setViewSettings.setShowFormationLines}
          />
          <ToggleSwitch
            label="Passing Network"
            enabled={viewSettings.showPassingNetwork}
            onChange={setViewSettings.setShowPassingNetwork}
          />
          <ToggleSwitch
            label="Player Heatmap"
            enabled={viewSettings.showHeatmap}
            onChange={setViewSettings.setShowHeatmap}
            disabled={true} // Feature not implemented
          />
        </div>
      </div>

      <div className="flex-grow border-t border-gray-700 pt-4">
        <h2 className="text-lg font-semibold text-white mb-2">Player Info</h2>
        <div className="bg-gray-900/50 rounded-md p-3 min-h-[140px] flex items-center justify-center transition-all duration-300 border border-gray-700/50">
          {hoveredPlayer ? (
            <div className="w-full text-center animate-fade-in">
              <p className="text-xl font-bold text-white tracking-tight">{hoveredPlayer.name}</p>
              <div className="mt-1 inline-block px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded text-[11px] font-bold uppercase tracking-wider text-blue-400">
                {hoveredPlayer.role}
              </div>
              <div className="mt-4 flex justify-center items-center gap-6 text-sm text-gray-400">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-semibold text-gray-500">Number</span>
                  <span className="text-white font-medium">#{hoveredPlayer.number}</span>
                </div>
                <div className="w-px h-6 bg-gray-700"></div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-semibold text-gray-500">Position</span>
                  <span className="text-white font-medium">{hoveredPlayer.position}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <PlayerIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Hover over a player to see tactical details</p>
            </div>
          )}
        </div>
      </div>
       <div className="text-xs text-gray-500 border-t border-gray-700 pt-3 flex items-start gap-2 italic">
            <InfoIcon className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-500/50" />
            <span>Passing networks and heatmaps provide deep tactical insights into player movement and interaction.</span>
        </div>
    </div>
  );
};