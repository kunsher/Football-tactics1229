
import React, { useState } from 'react';
import type { TacticPhase, Battle, PlayerPosition, GlossaryTerm } from '../types';
import { InfoIcon, PlayerIcon } from './icons';
import { GLOSSARY } from '../constants';

interface AnalysisPanelProps {
  phase: TacticPhase;
  battle: Battle;
  hoveredPlayer: PlayerPosition | null;
}

const GlossaryItem: React.FC<{ termObj: GlossaryTerm }> = ({ termObj }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    
    return (
        <div className="relative">
            <button 
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="px-4 py-2 bg-white/5 rounded-lg text-sm text-gray-300 border border-white/5 hover:border-blue-500/50 hover:bg-blue-500/5 cursor-help transition-all flex items-center gap-2 group"
            >
                {termObj.term}
                <InfoIcon className="w-4 h-4 opacity-30 group-hover:opacity-100 transition-opacity" />
            </button>
            {showTooltip && (
                <div className="absolute bottom-full left-0 mb-3 w-80 bg-gray-900 border-2 border-blue-500/40 p-5 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[100] animate-fade-in pointer-events-none">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest rounded border border-blue-500/30">
                            {termObj.category}
                        </span>
                        <div className="h-px flex-grow bg-blue-500/20"></div>
                    </div>
                    <p className="text-base font-bold text-white mb-2 tracking-tight underline decoration-blue-500/30 decoration-2 underline-offset-4">{termObj.term}</p>
                    <p className="text-sm text-gray-200 leading-relaxed font-medium">
                        {termObj.definition}
                    </p>
                    {/* Tooltip Arrow */}
                    <div className="absolute top-full left-6 -mt-[2px] border-x-[8px] border-x-transparent border-t-[8px] border-t-blue-500/40"></div>
                    <div className="absolute top-full left-6 -mt-[4px] border-x-[8px] border-x-transparent border-t-[8px] border-t-gray-900"></div>
                </div>
            )}
        </div>
    );
};

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ phase, battle, hoveredPlayer }) => {
  return (
    <div className="bg-gray-900/50 rounded-2xl p-6 border border-white/10 flex flex-col gap-6 backdrop-blur-md">
      <div>
        <div className="flex items-center gap-2 mb-2">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></div>
            <h2 className="text-base font-bold text-blue-400 uppercase tracking-widest">Tactical Analysis</h2>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{phase.title}</h3>
        <p className="text-base text-gray-400 leading-relaxed border-l-2 border-blue-500/30 pl-4 py-1 italic">
          {phase.description}
        </p>
      </div>

      <div className="flex-grow">
        <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3 flex items-center gap-2">
            <PlayerIcon className="w-4 h-4" /> Player Scouting
        </h4>
        <div className="bg-[#0a0f14] rounded-xl p-5 min-h-[140px] border border-white/5 relative overflow-hidden group">
          {hoveredPlayer ? (
            <div className="animate-fade-in relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-3xl font-black text-white">{hoveredPlayer.name}</p>
                  <p className="text-sm font-bold text-blue-500 uppercase tracking-tighter">{hoveredPlayer.role}</p>
                </div>
                <div className="text-4xl font-black text-white/10 italic">#{hoveredPlayer.number}</div>
              </div>
              
              <div className="mt-5 grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-xs text-gray-500 uppercase font-bold mb-1">Position</p>
                      <p className="text-base text-gray-200">{hoveredPlayer.position}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-xs text-gray-500 uppercase font-bold mb-1">Team</p>
                      <p className="text-base text-gray-200">{hoveredPlayer.team === 'home' ? battle.teams.home.name : battle.teams.away.name}</p>
                  </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
              <InfoIcon className="w-10 h-10 mb-3 text-gray-600" />
              <p className="text-base text-gray-500">悬停于球员图标<br/>获取战术职责分析</p>
            </div>
          )}
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl group-hover:bg-blue-600/20 transition-all duration-700"></div>
        </div>
      </div>

      <div className="bg-blue-600/5 rounded-xl p-6 border border-blue-500/15">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-4 bg-blue-500 rounded-full"></span>
                Tactical Library
            </h4>
            <span className="text-xs text-gray-500 font-bold uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">Hover to learn</span>
          </div>
          <div className="flex flex-wrap gap-3">
              {GLOSSARY.map((term, idx) => (
                  <GlossaryItem key={idx} termObj={term} />
              ))}
          </div>
      </div>
    </div>
  );
};
