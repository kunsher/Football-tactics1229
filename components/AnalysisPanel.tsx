
import React, { useState, useMemo } from 'react';
import type { TacticPhase, Battle, PlayerPosition, GlossaryTerm, TacticalEvent } from '../types';
import { InfoIcon, PlayerIcon } from './icons';
import { GLOSSARY } from '../constants';
import { TacticalVisualizer } from './TacticalVisualizer';

interface AnalysisPanelProps {
  phase: TacticPhase;
  battle: Battle;
  hoveredPlayer: PlayerPosition | null;
}

const TimelineEvent: React.FC<{ event: TacticalEvent; isActive: boolean }> = ({ event, isActive }) => (
  <div className={`flex flex-col items-center gap-2 group cursor-pointer transition-all ${isActive ? 'scale-110' : 'opacity-40 hover:opacity-100'}`}>
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
      event.type === 'Goal' ? 'bg-orange-500 border-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.4)]' : 
      event.type === 'Transition' ? 'bg-blue-600 border-blue-400' : 'bg-white/10 border-white/20'
    }`}>
      <span className="text-[10px] font-black text-white">{event.type === 'Goal' ? '⚽' : event.type === 'Transition' ? '⚡' : '🏷️'}</span>
    </div>
    <span className="text-[8px] font-black text-gray-500 uppercase tracking-tighter">{event.minute}</span>
  </div>
);

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ phase, battle, hoveredPlayer }) => {
  // 模拟 Sportscode 的事件标签数据
  const mockEvents: TacticalEvent[] = [
    { id: 'e1', type: 'Transition', minute: '12:05', phaseId: 'p1', label: '球权转换' },
    { id: 'e2', type: 'Interception', minute: '14:20', phaseId: 'p1', label: '高位拦截' },
    { id: 'e3', type: 'Goal', minute: '16:45', phaseId: 'rm1', label: '哈维开局破门' },
    { id: 'e4', type: 'Transition', minute: '72:15', phaseId: 'rm2', label: '快速反击' },
  ];

  return (
    <div className="bg-[#0a0f14]/80 rounded-[2rem] p-6 md:p-8 border border-white/10 flex flex-col gap-8 backdrop-blur-3xl shadow-2xl relative">
      {/* Sportscode 事件轴 */}
      <div className="bg-black/40 p-5 rounded-2xl border border-white/5 relative">
        <div className="flex items-center justify-between mb-4">
            <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">Sportscode 战术标签流 / CODING SHEET</h4>
            <div className="flex gap-1">
                <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                <div className="w-1 h-1 rounded-full bg-blue-500"></div>
            </div>
        </div>
        <div className="flex items-center gap-6 overflow-x-auto pb-2 scrollbar-hide">
            {mockEvents.map(ev => (
              <TimelineEvent key={ev.id} event={ev} isActive={ev.phaseId === phase.id} />
            ))}
            <div className="flex-grow h-px bg-white/5 mx-4 min-w-[50px]"></div>
            <button className="text-[9px] font-black text-blue-500 border border-blue-500/30 px-3 py-1 rounded-md bg-blue-500/5 hover:bg-blue-500 hover:text-white transition-all">+ 自定义标签</button>
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">专业复盘报告 / PERFORMANCE REPORT</span>
        </div>
        <h3 className="text-3xl font-black text-white mb-6 tracking-tighter leading-none">{phase.title}</h3>
        <p className="text-base text-gray-300 font-bold leading-relaxed italic border-l-4 border-blue-500/40 pl-6 py-2 bg-white/[0.03] rounded-r-2xl">
          {phase.description}
        </p>
      </div>

      <div className="flex-grow">
        <h4 className="text-[10px] font-black text-gray-500 uppercase mb-4 flex items-center gap-3">
            <PlayerIcon className="w-4 h-4" /> 球员即时性能诊断 (GPS Sync)
        </h4>
        <div className={`bg-[#05080b] rounded-2xl p-6 border transition-all duration-700 relative overflow-hidden ${hoveredPlayer ? 'border-blue-500/40 shadow-xl scale-[1.01]' : 'border-white/5 opacity-50'}`}>
          {hoveredPlayer ? (
            <div className="animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                 <div>
                    <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest mb-1 italic">OBJECT_LOUGH_MODEL</p>
                    <p className="text-3xl font-black text-white tracking-tighter">{hoveredPlayer.name}</p>
                 </div>
                 <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                    <span className="text-xl font-black text-blue-400">#{hoveredPlayer.number}</span>
                 </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-[9px] text-gray-500 font-black uppercase mb-1">瞬时代谢率</p>
                      <p className="text-xl font-black text-white">24.2 <span className="text-[9px] text-blue-500 font-bold">W/KG</span></p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-[9px] text-gray-500 font-black uppercase mb-1">HSR 累积</p>
                      <p className="text-xl font-black text-orange-500">42 <span className="text-[9px] font-bold">M</span></p>
                  </div>
              </div>
            </div>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center opacity-30">
               <InfoIcon className="w-8 h-8 mb-4" />
               <p className="text-xs font-black uppercase tracking-widest text-gray-500">请悬停以获取实时 GPS 链路数据</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
