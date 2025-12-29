
import React, { useState } from 'react';
import { GLOSSARY } from '../constants';
import type { GlossaryTerm } from '../types';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import { InfoIcon, CoachIcon } from './icons';

const CustomRadarTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#0a0f14] border border-blue-500/40 p-3 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md animate-fade-in">
        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Tactical Dimension</p>
        <div className="flex items-center justify-between gap-8">
          <span className="text-sm font-bold text-white">{data.subject}</span>
          <span className="text-sm font-black text-blue-400">{data.A}%</span>
        </div>
        <div className="w-full h-1 bg-gray-800 rounded-full mt-2 overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-500" 
            style={{ width: `${data.A}%` }}
          ></div>
        </div>
      </div>
    );
  }
  return null;
};

export const TacticalKnowledgeBase: React.FC = () => {
  const systems = GLOSSARY.filter(g => g.category === 'System');
  const [selectedSystem, setSelectedSystem] = useState<GlossaryTerm>(systems[0]);

  return (
    <div className="flex flex-col gap-6 animate-fade-in max-w-7xl mx-auto">
      {/* Header - 居中标题区 */}
      <div className="bg-blue-600/10 border border-blue-500/30 rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-black text-white mb-3 tracking-tight">战术体系百科 <span className="text-blue-500/50 text-sm ml-2 font-bold uppercase tracking-widest">Tactical DNA Library</span></h2>
        <p className="text-base text-blue-300/80 leading-relaxed max-w-2xl mx-auto">
          深入探索改变足球历史的经典战术流派，从理论 DNA 到实战应用，构建您的专业足球知识体系。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 左侧导航列表 - 占据 4 列 */}
        <div className="lg:col-span-4 space-y-3 lg:sticky lg:top-8">
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-4 pl-1">经典体系目录 / System Index</p>
          {systems.map((sys) => (
            <button
              key={sys.term}
              onClick={() => setSelectedSystem(sys)}
              className={`w-full text-left p-5 rounded-xl border transition-all flex items-center justify-between group ${
                selectedSystem.term === sys.term
                  ? 'bg-blue-600 border-blue-500 shadow-lg shadow-blue-600/30 -translate-y-0.5'
                  : 'bg-white/5 border-white/5 hover:border-blue-500/30 hover:bg-white/10'
              }`}
            >
              <div>
                <p className={`font-bold text-base ${selectedSystem.term === sys.term ? 'text-white' : 'text-gray-300'}`}>{sys.term}</p>
                <p className={`text-[11px] mt-1 ${selectedSystem.term === sys.term ? 'text-blue-100' : 'text-gray-500'}`}>
                  {sys.famousTeams?.[0].split(' (')[0]}
                </p>
              </div>
              <div className={`w-2.5 h-2.5 rounded-full transition-transform duration-500 group-hover:scale-150 ${
                selectedSystem.term === sys.term ? 'bg-white shadow-[0_0_8px_white]' : 'bg-blue-500/30'
              }`}></div>
            </button>
          ))}
          
          <div className="mt-8 p-6 bg-gray-900/40 rounded-xl border border-dashed border-white/10 text-center">
              <p className="text-[11px] text-gray-600 font-bold uppercase tracking-widest">更多战术基因持续转录中...</p>
          </div>
        </div>

        {/* 右侧详细视图 - 占据 8 列 */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-[#0a0f14] border border-white/10 rounded-2xl p-10 relative overflow-hidden shadow-2xl">
            {/* 背景动态装饰 */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] -mr-40 -mt-40"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/5 rounded-full blur-[80px] -ml-32 -mb-32"></div>
            
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                    <span className="px-4 py-1.5 bg-blue-500/20 text-blue-400 text-[11px] font-black uppercase tracking-widest rounded-full border border-blue-500/30">
                        战术系统 / {selectedSystem.category}
                    </span>
                </div>
                
                <h3 className="text-5xl font-black text-white mb-6 tracking-tighter leading-none">{selectedSystem.term}</h3>
                <p className="text-xl text-gray-300 leading-relaxed font-medium mb-12 border-l-4 border-blue-500/50 pl-6 py-2 bg-blue-500/5 rounded-r-xl">
                    {selectedSystem.definition}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* 左侧：文字信息 */}
                    <div className="space-y-8">
                        <div>
                            <h4 className="text-xs font-bold text-blue-500 uppercase tracking-widest flex items-center gap-2 mb-4">
                                <InfoIcon className="w-5 h-5" /> 历史演变 / Evolution
                            </h4>
                            <p className="text-base text-gray-400 leading-relaxed italic">
                                {selectedSystem.historicalContext}
                            </p>
                        </div>
                        
                        <div className="pt-6 border-t border-white/5">
                            <h4 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-4">核心特征 / Key Traits</h4>
                            <div className="flex flex-wrap gap-3">
                                {selectedSystem.keyTraits?.map(trait => (
                                    <span key={trait} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 font-bold hover:bg-blue-500/10 hover:border-blue-500/30 transition-colors">
                                        {trait}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 右侧：雷达图展示 */}
                    <div className="bg-white/5 rounded-3xl p-6 border border-white/5 flex flex-col items-center">
                        <p className="text-[11px] text-center text-gray-500 font-black uppercase tracking-widest mb-6">理论战术指纹 / Tactical DNA Profile</p>
                        <div className="h-72 w-full cursor-crosshair">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={selectedSystem.radarProfile}>
                                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                                    <PolarAngleAxis 
                                        dataKey="subject" 
                                        tick={{fill: '#9ca3af', fontSize: 11, fontWeight: 'bold'}} 
                                    />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Radar
                                        name={selectedSystem.term}
                                        dataKey="A"
                                        stroke="#3b82f6"
                                        strokeWidth={3}
                                        fill="#3b82f6"
                                        fillOpacity={0.4}
                                        activeDot={{ r: 6, fill: '#fff', stroke: '#3b82f6', strokeWidth: 2 }}
                                        isAnimationActive={true}
                                        animationDuration={1000}
                                    />
                                    <Tooltip 
                                        content={<CustomRadarTooltip />}
                                        cursor={{ stroke: 'rgba(59, 130, 246, 0.2)', strokeWidth: 1 }}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                        <p className="text-[10px] text-gray-600 italic mt-4">悬停节点以解码具体战术参数</p>
                    </div>
                </div>

                {/* 底部：代表球队 */}
                <div className="mt-12 pt-12 border-t border-white/5">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-8 flex items-center gap-2">
                        <CoachIcon className="w-5 h-5" /> 代表球队 / Iconic Implementation
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {selectedSystem.famousTeams?.map(team => (
                            <div key={team} className="p-5 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between group hover:bg-white/10 hover:border-blue-500/20 transition-all cursor-pointer">
                                <span className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">{team}</span>
                                <div className="flex items-center gap-2 text-[11px] text-blue-500 font-black uppercase opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                    进入实战复盘
                                    <span className="text-lg">→</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
