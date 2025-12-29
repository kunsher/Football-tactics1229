
import React from 'react';
import type { PlayerPosition } from '../types';
import { PlayerIcon } from './icons';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from 'recharts';

interface PlayerModalProps {
  player: PlayerPosition;
  onClose: () => void;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0f172a] border border-blue-500/50 p-2 rounded-lg shadow-xl backdrop-blur-md">
        <p className="text-[10px] font-black text-white uppercase tracking-widest">
          {payload[0].payload.subject}: <span className="text-blue-400">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export const PlayerModal: React.FC<PlayerModalProps> = ({ player, onClose }) => {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 animate-fade-in backdrop-blur-md bg-black/60" onClick={onClose}>
      <div 
        className="relative w-full max-w-5xl bg-[#0a0f14] border border-white/10 rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:row max-h-[90vh] overflow-y-auto md:overflow-visible md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]"></div>

        {/* Left Sidebar: Profile Summary */}
        <div className="w-full md:w-1/3 bg-white/5 p-8 flex flex-col items-center border-b md:border-b-0 md:border-r border-white/5 relative">
          <div className="w-40 h-40 rounded-3xl bg-gradient-to-br from-blue-600/20 to-blue-900/40 border border-blue-500/30 flex items-center justify-center mb-6 relative group overflow-hidden">
            <PlayerIcon className="w-24 h-24 text-blue-400 opacity-80 group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute bottom-2 right-2 text-4xl font-black text-white/10 italic">#{player.number}</div>
          </div>
          
          <div className="text-center">
            <h2 className="text-3xl font-black text-white tracking-tighter mb-1">{player.name}</h2>
            <p className="text-sm font-bold text-blue-500 uppercase tracking-[0.2em] mb-8">{player.role}</p>
          </div>

          <div className="w-full grid grid-cols-2 gap-3 mb-8">
            {[
              { label: '年龄', val: player.physical?.age || 'N/A' },
              { label: '身高', val: player.physical?.height || 'N/A' },
              { label: '体重', val: player.physical?.weight || 'N/A' },
              { label: '惯用脚', val: player.physical?.foot === 'Left' ? '左脚' : player.physical?.foot === 'Right' ? '右脚' : '左右开弓' },
            ].map((item, idx) => (
              <div key={idx} className="bg-black/40 rounded-xl p-3 border border-white/5">
                <p className="text-[9px] text-gray-500 uppercase font-black mb-0.5">{item.label}</p>
                <p className="text-sm text-gray-200 font-bold">{item.val}</p>
              </div>
            ))}
          </div>

          {/* Detailed Stats List (Sidebar Version) */}
          <div className="w-full space-y-4 pt-6 border-t border-white/5">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">详细性能数据</p>
            <div className="space-y-3">
              {player.scoutingStats?.map((stat, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors">{stat.label}</span>
                    <span className="text-xs font-black text-blue-400">{stat.value}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 transition-all duration-1000 ease-out group-hover:bg-blue-400" 
                      style={{ width: `${stat.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content: Advanced Visuals */}
        <div className="flex-grow p-8 md:p-12 space-y-10 bg-[#0a0f14]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
               <h3 className="text-sm font-black text-white uppercase tracking-[0.3em]">球员球探报告</h3>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all group active:scale-90"
            >
              <span className="text-xl text-gray-500 group-hover:text-white">×</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Visual: Ability Radar */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">能力雷达图</p>
                <span className="text-[10px] text-gray-500 italic">基于实战表现的数据拟合</span>
              </div>
              <div className="h-72 bg-white/5 rounded-3xl border border-white/5 p-6 flex items-center justify-center relative overflow-hidden group/radar">
                <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover/radar:opacity-100 transition-opacity"></div>
                {player.scoutingStats ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={player.scoutingStats.map(s => ({ subject: s.label, A: s.value }))}>
                      <PolarGrid stroke="rgba(255,255,255,0.08)" />
                      <PolarAngleAxis dataKey="subject" tick={{fill: '#64748b', fontSize: 11, fontWeight: '900'}} />
                      <Radar
                        name={player.name}
                        dataKey="A"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        fill="#3b82f6"
                        fillOpacity={0.4}
                        animationDuration={1500}
                        animationEasing="ease-out"
                        dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                      />
                      <Tooltip content={<CustomTooltip />} cursor={false} />
                    </RadarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-xs text-gray-600 italic">暂无详细技能评分数据</p>
                )}
              </div>
            </div>

            {/* Tactical Brief / Instructions */}
            <div className="space-y-10">
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                    <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">战术简报 / Tactical Brief</p>
                    <span className="text-[9px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20 font-black">阶段性指令</span>
                </div>
                
                <div className="space-y-3">
                  {player.tacticalBrief && player.tacticalBrief.length > 0 ? (
                    player.tacticalBrief.map((brief, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                        <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 group-hover:scale-125 transition-transform shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                        <p className="text-sm text-gray-300 font-medium leading-relaxed group-hover:text-white transition-colors">
                          {brief}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 rounded-xl border border-dashed border-white/10 flex flex-col items-center justify-center text-center opacity-40">
                      <div className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center mb-3">
                        <span className="text-xs">!</span>
                      </div>
                      <p className="text-[11px] text-gray-500 uppercase font-bold tracking-widest">当前阶段无特殊指令</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-8 border-t border-white/5">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">角色深度定义</p>
                <div className="p-6 bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/20 rounded-2xl relative group">
                  <div className="absolute top-2 right-4 text-[40px] font-black text-white/5 pointer-events-none italic select-none">ROLE</div>
                  <p className="text-sm text-blue-100 font-medium leading-relaxed relative z-10">
                    在当前复盘片段中，<span className="text-white font-black underline decoration-blue-500/30 underline-offset-4">{player.name}</span> 承担着 <span className="text-blue-400 font-black">{player.role}</span> 的关键职责。
                    主教练要求其在进攻端保持高度的 <span className="text-white">战术纪律</span>，通过频繁的 <span className="text-white">弱侧移动</span> 为队友扯开关键防守空档。
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer Branding */}
          <div className="flex items-center justify-center gap-4 opacity-30 pt-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-gray-700"></div>
            <div className="text-[10px] text-gray-600 uppercase tracking-widest font-black">
              Soccer Tactic Lab Intelligence
            </div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-gray-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
