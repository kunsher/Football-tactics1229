
import React from 'react';
import type { TacticPhase, Battle, PlayerPosition } from '../types';
import { InfoIcon, PlayerIcon } from './icons';

interface AnalysisPanelProps {
  phase: TacticPhase;
  battle: Battle;
  hoveredPlayer: PlayerPosition | null;
}

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ phase, battle, hoveredPlayer }) => {
  return (
    <div className="bg-gray-900/50 rounded-2xl p-6 border border-white/10 flex flex-col gap-6 backdrop-blur-md">
      <div>
        <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <h2 className="text-sm font-bold text-blue-400 uppercase tracking-widest">Tactical Analysis</h2>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{phase.title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed border-l-2 border-blue-500/30 pl-4 py-1">
          {phase.description}
        </p>
      </div>

      <div className="flex-grow">
        <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3 flex items-center gap-2">
            <PlayerIcon className="w-3 h-3" /> Player Scouting
        </h4>
        <div className="bg-[#0a0f14] rounded-xl p-4 min-h-[120px] border border-white/5 relative overflow-hidden group">
          {hoveredPlayer ? (
            <div className="animate-fade-in relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-2xl font-black text-white">{hoveredPlayer.name}</p>
                  <p className="text-xs font-bold text-blue-500 uppercase tracking-tighter">{hoveredPlayer.role}</p>
                </div>
                <div className="text-3xl font-black text-white/10 italic">#{hoveredPlayer.number}</div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-2">
                      <p className="text-[10px] text-gray-500 uppercase font-bold">Position</p>
                      <p className="text-sm text-gray-200">{hoveredPlayer.position}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2">
                      <p className="text-[10px] text-gray-500 uppercase font-bold">Team</p>
                      <p className="text-sm text-gray-200">{hoveredPlayer.team === 'home' ? battle.teams.home.name : battle.teams.away.name}</p>
                  </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
              <InfoIcon className="w-8 h-8 mb-2 text-gray-600" />
              <p className="text-sm text-gray-500">悬停于球员图标<br/>获取战术职责分析</p>
            </div>
          )}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-600/10 rounded-full blur-2xl group-hover:bg-blue-600/20 transition-all duration-700"></div>
        </div>
      </div>

      <div className="bg-blue-600/5 rounded-xl p-4 border border-blue-500/10">
          <h4 className="text-[10px] font-bold text-blue-500 uppercase mb-2">Tactical Glossary</h4>
          <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-gray-300 border border-white/5 hover:border-blue-500/30 cursor-help transition-all">伪九号 (False 9)</span>
              <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-gray-300 border border-white/5 hover:border-blue-500/30 cursor-help transition-all">肋部插上 (Underlap)</span>
              <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-gray-300 border border-white/5 hover:border-blue-500/30 cursor-help transition-all">高位压迫 (Gegenpressing)</span>
          </div>
      </div>
    </div>
  );
};
