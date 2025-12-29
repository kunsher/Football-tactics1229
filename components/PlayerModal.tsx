
import React from 'react';
import type { PlayerPosition } from '../types';
import { PlayerIcon } from './icons';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';

interface PlayerModalProps {
  player: PlayerPosition;
  onClose: () => void;
}

export const PlayerModal: React.FC<PlayerModalProps> = ({ player, onClose }) => {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 animate-fade-in backdrop-blur-md bg-black/60">
      <div 
        className="relative w-full max-w-4xl bg-[#0a0f14] border border-white/10 rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 背景光效 */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]"></div>

        {/* 左侧：基本信息与大头像占位 */}
        <div className="w-full md:w-1/3 bg-white/5 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/5 relative">
          <div className="w-40 h-40 rounded-3xl bg-gradient-to-br from-blue-600/20 to-blue-900/40 border border-blue-500/30 flex items-center justify-center mb-6 relative group overflow-hidden">
            <PlayerIcon className="w-24 h-24 text-blue-400 opacity-80 group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute bottom-2 right-2 text-4xl font-black text-white/10 italic">#{player.number}</div>
          </div>
          
          <h2 className="text-3xl font-black text-white tracking-tighter mb-1">{player.name}</h2>
          <p className="text-sm font-bold text-blue-500 uppercase tracking-[0.2em] mb-8">{player.role}</p>

          <div className="w-full grid grid-cols-2 gap-3">
            {[
              { label: '年龄', val: player.physical?.age || 'N/A' },
              { label: '身高', val: player.physical?.height || 'N/A' },
              { label: '体重', val: player.physical?.weight || 'N/A' },
              { label: '惯用脚', val: player.physical?.foot || 'N/A' },
            ].map((item, idx) => (
              <div key={idx} className="bg-black/40 rounded-xl p-3 border border-white/5">
                <p className="text-[10px] text-gray-500 uppercase font-black mb-0.5">{item.label}</p>
                <p className="text-sm text-gray-200 font-bold">{item.val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 右侧：深度球探数据 */}
        <div className="flex-grow p-8 md:p-12 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-gray-500 uppercase tracking-[0.3em]">Player Scouting Report</h3>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all group"
            >
              <span className="text-xl text-gray-400 group-hover:text-white">×</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* 雷达图：核心技能 */}
            <div className="space-y-4">
              <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">核心技术指标 / Core Attributes</p>
              <div className="h-64 bg-white/5 rounded-2xl border border-white/5 p-4 flex items-center justify-center">
                {player.scoutingStats ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={player.scoutingStats.map(s => ({ subject: s.label, A: s.value }))}>
                      <PolarGrid stroke="rgba(255,255,255,0.05)" />
                      <PolarAngleAxis dataKey="subject" tick={{fill: '#4b5563', fontSize: 10, fontWeight: '900'}} />
                      <Radar
                        name={player.name}
                        dataKey="A"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.4}
                        animationDuration={1500}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-xs text-gray-600 italic">暂无详细技能评分数据</p>
                )}
              </div>
            </div>

            {/* 战术指令与表现 */}
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">战术指令 / Tactical Brief</p>
                <div className="space-y-3">
                  {player.tacticalBrief ? player.tacticalBrief.map((brief, i) => (
                    <div key={i} className="flex items-start gap-3 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 group-hover:scale-125 transition-transform"></div>
                      <p className="text-sm text-gray-300 font-medium leading-relaxed italic">{brief}</p>
                    </div>
                  )) : (
                    <p className="text-xs text-gray-600">暂无针对该阶段的特殊战术要求</p>
                  )}
                </div>
              </div>

              <div className="pt-6 border-t border-white/5">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">球员定位 / Tactical Role</p>
                <div className="px-4 py-3 bg-blue-600/10 border border-blue-500/20 rounded-xl">
                  <p className="text-sm text-blue-300 font-bold leading-relaxed">
                    在当前战术体系中担任 <span className="text-white underline decoration-blue-500 underline-offset-4">{player.role}</span>，负责串联球队的进攻脉络并压迫对方防线。
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center text-[10px] text-gray-700 uppercase tracking-widest font-black">
            Generated by Soccer Tactic Lab Engine v1.0
          </div>
        </div>
      </div>
    </div>
  );
};
