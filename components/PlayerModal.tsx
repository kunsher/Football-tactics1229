
import React, { useMemo } from 'react';
import type { PlayerPosition } from '../types';
import { PlayerIcon } from './icons';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip, PolarRadiusAxis } from 'recharts';

interface PlayerModalProps {
  player: PlayerPosition;
  phaseTitle?: string;
  onClose: () => void;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0f172a] border border-blue-500/50 p-3 rounded-xl shadow-2xl backdrop-blur-md ring-1 ring-white/10">
        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">能力特征</p>
        <p className="text-sm font-black text-white">
          {payload[0].payload.subject}: <span className="text-blue-500">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

const TacticalBriefItem: React.FC<{ text: string; delay: number }> = ({ text, delay }) => {
  return (
    <div 
      className="flex items-start gap-5 p-5 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-blue-500/40 transition-all group relative overflow-hidden animate-reveal-right opacity-0"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
      <div className="mt-2 w-2 h-2 rounded-full bg-blue-600 group-hover:scale-125 transition-transform shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
      <p className="text-base text-gray-300 font-medium leading-relaxed group-hover:text-white transition-colors">
        {text}
      </p>
    </div>
  );
};

export const PlayerModal: React.FC<PlayerModalProps> = ({ player, phaseTitle, onClose }) => {
  // 备选模拟数据
  const displayBrief = useMemo(() => {
    return player.tacticalBrief && player.tacticalBrief.length > 0 
      ? player.tacticalBrief 
      : [
          "当前战术阶段要求该球员保持高位压迫，切断对手传球弧线。",
          "接球后优先寻找纵向突破空间，利用速度优势撕扯防线。",
          "作为战术核心点，需时刻观察队友插上时机并送出斜塞球。"
        ];
  }, [player.tacticalBrief]);

  const displayStats = useMemo(() => {
    return player.scoutingStats && player.scoutingStats.length > 0
      ? player.scoutingStats.map(s => ({ subject: s.label, value: s.value }))
      : [
          { subject: '速度', value: 85 }, { subject: '技术', value: 92 }, { subject: '防守', value: 65 }, 
          { subject: '意识', value: 95 }, { subject: '对抗', value: 78 }, { subject: '视野', value: 90 }
        ];
  }, [player.scoutingStats]);

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 animate-fade-in backdrop-blur-md bg-black/70" onClick={onClose}>
      <div 
        className="relative w-full max-w-6xl bg-[#0a0f14] border border-white/10 rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col md:flex-row max-h-[90vh] overflow-y-auto md:overflow-visible"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 背景氛围 */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        {/* 左侧：档案核心 */}
        <div className="w-full md:w-[380px] bg-white/[0.02] p-10 flex flex-col items-center border-b md:border-b-0 md:border-r border-white/5 relative shrink-0">
          <div className="w-48 h-48 rounded-[3rem] bg-gradient-to-br from-blue-600/20 to-blue-900/40 border border-blue-500/30 flex items-center justify-center mb-10 relative group overflow-hidden shadow-2xl">
            <PlayerIcon className="w-28 h-28 text-blue-400 opacity-80 group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute bottom-4 right-4 text-6xl font-black text-white/5 italic select-none">#{player.number}</div>
          </div>
          
          <div className="text-center w-full">
            <h2 className="text-4xl font-black text-white tracking-tighter mb-2">{player.name}</h2>
            <div className="inline-flex items-center gap-2 bg-blue-500/10 py-1 px-4 rounded-full border border-blue-500/20 mb-10">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{player.role}</span>
            </div>
          </div>

          <div className="w-full grid grid-cols-2 gap-4 mb-10">
            {[
              { label: '年龄', val: player.physical?.age || '25' },
              { label: '身高', val: player.physical?.height || '180cm' },
              { label: '惯用脚', val: player.physical?.foot === 'Left' ? '左脚' : '右脚' },
              { label: '活跃区', val: player.position },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 rounded-2xl p-4 border border-white/5 hover:bg-white/10 transition-colors">
                <p className="text-[9px] text-gray-500 uppercase font-black mb-1 tracking-widest">{item.label}</p>
                <p className="text-sm text-gray-100 font-bold">{item.val}</p>
              </div>
            ))}
          </div>

          <div className="w-full space-y-6 pt-10 border-t border-white/5">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> 生物特征参数
            </p>
            <div className="space-y-4">
              {displayStats.slice(0, 3).map((stat, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors">{stat.subject}</span>
                    <span className="text-xs font-black text-blue-400">{stat.value}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-1000 ease-out" 
                      style={{ width: `${stat.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧：深度分析内容 */}
        <div className="flex-grow p-10 md:p-14 space-y-12 bg-[#0a0f14] relative overflow-y-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="w-2 h-8 bg-blue-600 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.6)]"></div>
               <h3 className="text-lg font-black text-white uppercase tracking-[0.4em]">实战能力指纹报告 <span className="text-gray-600 font-bold ml-2 text-sm italic">/ SCOUT-INTEL</span></h3>
            </div>
            <button 
              onClick={onClose}
              className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 flex items-center justify-center transition-all group active:scale-90"
            >
              <span className="text-2xl text-gray-500 group-hover:text-red-400 transition-colors">×</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* 雷达图可视化 */}
            <div className="space-y-8 animate-fade-in">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-black text-blue-500 uppercase tracking-widest">战术 DNA 拓扑</p>
                <p className="text-[10px] text-gray-500 italic uppercase tracking-tighter">基于实战片段的多维数据拟合</p>
              </div>
              <div className="aspect-square bg-white/[0.03] rounded-[3rem] border border-white/5 p-8 flex items-center justify-center relative overflow-hidden group/radar shadow-inner">
                <div className="absolute inset-0 bg-blue-600/[0.03] opacity-0 group-hover/radar:opacity-100 transition-opacity"></div>
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={displayStats}>
                      <PolarGrid stroke="rgba(255,255,255,0.06)" />
                      <PolarAngleAxis dataKey="subject" tick={{fill: '#94a3b8', fontSize: 12, fontWeight: '900'}} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar
                        name={player.name}
                        dataKey="value"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        fill="#3b82f6"
                        fillOpacity={0.4}
                        animationDuration={1500}
                        dot={{ r: 4, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
                      />
                      <Tooltip content={<CustomTooltip />} cursor={false} />
                    </RadarChart>
                  </ResponsiveContainer>
              </div>
            </div>

            {/* 战术简报区 (Tactical Brief) */}
            <div className="space-y-12 animate-fade-in">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <p className="text-sm font-black text-blue-500 uppercase tracking-widest">战术简报 / Tactical Briefing</p>
                      {phaseTitle && <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter mt-1">针对阶段：{phaseTitle}</p>}
                    </div>
                    <div className="px-3 py-1 bg-blue-600/20 rounded border border-blue-500/30 text-[9px] font-black text-blue-400 uppercase">实战扫描解码中...</div>
                </div>
                
                <div className="space-y-4">
                  {displayBrief.map((brief, i) => (
                    <TacticalBriefItem key={i} text={brief} delay={0.2 + i * 0.15} />
                  ))}
                </div>
              </div>

              <div className="pt-10 border-t border-white/5 animate-reveal-right opacity-0" style={{ animationDelay: '0.8s' }}>
                <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-6">核心战术角色定义</p>
                <div className="p-8 bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/20 rounded-3xl relative overflow-hidden shadow-inner group">
                  <div className="absolute -top-4 -right-4 text-7xl font-black text-white/[0.03] italic uppercase select-none tracking-tighter group-hover:scale-110 transition-transform duration-1000">ROLE</div>
                  <p className="text-lg text-blue-100/90 font-medium leading-relaxed relative z-10 italic">
                    “ 作为球队在当前阶段的 <span className="text-white font-black">{player.role}</span>，<span className="text-white font-black">{player.name}</span> 不仅承担着执行指令的义务，
                    更是整个战术闭环中的 <span className="text-blue-400 font-black">关键触发器</span>。他的每次跑位都直接决定了对手防线的重心偏移方向。”
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-6 opacity-30 pt-10 border-t border-white/5">
            <div className="h-px flex-grow bg-gradient-to-r from-transparent to-gray-700"></div>
            <div className="text-[10px] text-gray-600 uppercase tracking-[0.5em] font-black whitespace-nowrap">
              Tactical Lab DB v2.1 / Intelligence Unit
            </div>
            <div className="h-px flex-grow bg-gradient-to-l from-transparent to-gray-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
