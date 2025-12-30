
import React, { useState, useMemo } from 'react';
import { GLOSSARY } from '../constants';
import type { GlossaryTerm } from '../types';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, Legend } from 'recharts';
import { InfoIcon, CoachIcon } from './icons';
import { TacticalVisualizer } from './TacticalVisualizer';

interface TacticalKnowledgeBaseProps {
  onNavigateToBattle?: (battleId: string) => void;
}

const CustomRadarTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0f172a]/95 border border-blue-500/50 p-4 rounded-xl shadow-2xl backdrop-blur-xl animate-fade-in ring-1 ring-white/10">
        <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em] mb-3 border-b border-white/10 pb-2">战术性能分析 / Analytics</p>
        <div className="space-y-3">
          {payload.map((p: any, i: number) => (
            <div key={i} className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }}></div>
                <span className="text-xs font-black text-white uppercase tracking-tighter">{p.name}</span>
              </div>
              <div className="flex items-center justify-between gap-8">
                <span className="text-[10px] text-gray-500 font-bold">{p.payload.subject}</span>
                <span className="text-sm font-black text-blue-400">{p.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export const TacticalKnowledgeBase: React.FC<TacticalKnowledgeBaseProps> = ({ onNavigateToBattle }) => {
  const systems = useMemo(() => GLOSSARY.filter(g => g.category === 'System'), []);
  const [selectedSystem, setSelectedSystem] = useState<GlossaryTerm>(systems[0]);
  const [compareMode, setCompareMode] = useState(false);
  const [comparisonTarget, setComparisonTarget] = useState<GlossaryTerm | null>(null);

  const radarData = useMemo(() => {
    if (!compareMode || !comparisonTarget) return selectedSystem.radarProfile;
    // 对齐两个雷达图的数据
    return selectedSystem.radarProfile?.map((point, i) => ({
      ...point,
      A: point.A,
      B: comparisonTarget.radarProfile?.[i]?.A || 0
    }));
  }, [selectedSystem, comparisonTarget, compareMode]);

  const handleToggleCompare = () => {
    if (compareMode) {
      setCompareMode(false);
      setComparisonTarget(null);
    } else {
      setCompareMode(true);
      // 默认选择列表中的第二个作为对比对象
      setComparisonTarget(systems.find(s => s.term !== selectedSystem.term) || null);
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in max-w-7xl mx-auto py-2">
      {/* Header Area */}
      <div className="bg-gradient-to-br from-blue-900/20 to-[#0a0f14] border border-blue-500/20 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group shadow-2xl">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px] pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-4xl font-black text-white mb-4 tracking-tighter">战术体系实验室 <span className="text-blue-500/50 text-sm ml-2 font-bold uppercase tracking-[0.4em]">DNA REPOSITORY</span></h2>
          <p className="text-lg text-blue-300/60 leading-relaxed font-medium">
            在这里，我们不仅解读历史，更对足球的“进化指纹”进行深度建模。支持多维度对比，揭示不同哲学间的博弈逻辑。
          </p>
        </div>
        <button 
          onClick={handleToggleCompare}
          className={`relative z-10 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center gap-3 border ${
            compareMode 
              ? 'bg-orange-600 border-orange-400 text-white shadow-[0_0_30px_rgba(234,88,12,0.3)]' 
              : 'bg-white/5 border-white/10 text-gray-400 hover:border-blue-500/50 hover:text-white'
          }`}
        >
          {compareMode ? '退出对比模式' : '开启对比模式'}
          <span className={`text-xl leading-none ${compareMode ? 'rotate-45' : ''} transition-transform`}>+</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Navigation / Selection - 4 Cols */}
        <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-8">
          <div className="space-y-4">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] mb-4 pl-1">
              {compareMode ? '1. 选择基础体系' : '浏览战术目录'}
            </p>
            {systems.map((sys) => (
              <button
                key={sys.term}
                disabled={compareMode && comparisonTarget?.term === sys.term}
                onClick={() => setSelectedSystem(sys)}
                className={`w-full text-left p-6 rounded-2xl border transition-all flex items-center justify-between group relative overflow-hidden ${
                  selectedSystem.term === sys.term
                    ? 'bg-blue-600 border-blue-400 shadow-xl shadow-blue-600/30'
                    : 'bg-white/5 border-white/10 hover:border-blue-500/30 hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed'
                }`}
              >
                <div className="relative z-10">
                  <p className={`font-black text-lg ${selectedSystem.term === sys.term ? 'text-white' : 'text-gray-200'}`}>{sys.term}</p>
                  <p className={`text-[11px] font-bold mt-1 ${selectedSystem.term === sys.term ? 'text-blue-100' : 'text-gray-500'}`}>
                    {sys.famousTeams?.[0].split(' (')[0]}
                  </p>
                </div>
                {selectedSystem.term === sys.term && (
                  <div className="absolute -right-2 -bottom-2 text-6xl font-black text-white/10 italic select-none">#1</div>
                )}
              </button>
            ))}
          </div>

          {compareMode && (
            <div className="space-y-4 animate-fade-in pt-6 border-t border-white/10">
              <p className="text-[10px] text-orange-500 font-black uppercase tracking-[0.3em] mb-4 pl-1">2. 选择对比体系</p>
              {systems.map((sys) => (
                <button
                  key={`comp-${sys.term}`}
                  disabled={selectedSystem.term === sys.term}
                  onClick={() => setComparisonTarget(sys)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all flex items-center justify-between group relative overflow-hidden ${
                    comparisonTarget?.term === sys.term
                      ? 'bg-orange-600 border-orange-400 shadow-xl shadow-orange-600/30'
                      : 'bg-white/5 border-white/10 hover:border-orange-500/30 hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed'
                  }`}
                >
                  <div className="relative z-10">
                    <p className={`font-black text-lg ${comparisonTarget?.term === sys.term ? 'text-white' : 'text-gray-200'}`}>{sys.term}</p>
                    <p className={`text-[11px] font-bold mt-1 ${comparisonTarget?.term === sys.term ? 'text-orange-100' : 'text-gray-500'}`}>
                      {sys.famousTeams?.[0].split(' (')[0]}
                    </p>
                  </div>
                  {comparisonTarget?.term === sys.term && (
                    <div className="absolute -right-2 -bottom-2 text-6xl font-black text-white/10 italic select-none">#2</div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content View - 8 Cols */}
        <div className="lg:col-span-8 space-y-8">
          {/* Main Info Card */}
          <div className="bg-[#0a0f14] border border-white/10 rounded-[3rem] p-12 relative overflow-hidden shadow-2xl shadow-black/50">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] -mr-60 -mt-60"></div>
            
            <div className="relative z-10">
              {/* Radar and Animation Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,1)]"></div>
                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.4em]">性能指标与动态演示 / ANALYTICS</span>
                  </div>
                  <h3 className="text-3xl font-black text-white tracking-tighter leading-tight">
                    {compareMode && comparisonTarget 
                      ? `${selectedSystem.term} VS ${comparisonTarget.term}`
                      : `${selectedSystem.term} 体系特征`
                    }
                  </h3>
                  <p className="text-base text-gray-400 font-medium leading-relaxed italic border-l-2 border-blue-500/30 pl-6">
                    {selectedSystem.definition}
                  </p>
                  
                  {/* Animation Preview in Detail View */}
                  {selectedSystem.visualEffect && !compareMode && (
                    <div className="mt-8 animate-fade-in">
                       <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest mb-4">动态战术逻辑演示 / VISUAL PREVIEW</p>
                       <TacticalVisualizer type={selectedSystem.visualEffect} size="large" />
                    </div>
                  )}

                  {compareMode && comparisonTarget && (
                    <div className="p-6 bg-orange-600/10 border border-orange-500/20 rounded-2xl animate-fade-in mt-6">
                       <p className="text-xs text-orange-400 font-black mb-2 uppercase tracking-widest">对比洞察 / COMPARISON INSIGHT</p>
                       <p className="text-xs text-gray-400 leading-relaxed italic">
                         观察蓝色与灰色覆盖区域。重合部分代表共同的战术基石，偏移部分则揭示了两套哲学在进攻纵深与防守宽度上的根本分歧。
                       </p>
                    </div>
                  )}

                  {!compareMode && selectedSystem.relatedBattleId && (
                    <button 
                      onClick={() => onNavigateToBattle?.(selectedSystem.relatedBattleId!)}
                      className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:scale-105"
                    >
                      加载关联战役复盘 <span className="text-lg">→</span>
                    </button>
                  )}
                </div>

                <div className="bg-white/[0.03] rounded-[3rem] p-10 border border-white/5 aspect-square flex items-center justify-center relative group shadow-inner">
                   <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                        <PolarGrid stroke="rgba(255,255,255,0.08)" />
                        <PolarAngleAxis dataKey="subject" tick={{fill: '#64748b', fontSize: 11, fontWeight: '900'}} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                          name={selectedSystem.term}
                          dataKey="A"
                          stroke="#3b82f6"
                          strokeWidth={3}
                          fill="#3b82f6"
                          fillOpacity={0.4}
                          isAnimationActive={true}
                          animationDuration={1500}
                        />
                        {compareMode && comparisonTarget && (
                          <Radar
                            name={comparisonTarget.term}
                            dataKey="B"
                            stroke="#94a3b8"
                            strokeWidth={2}
                            fill="#94a3b8"
                            fillOpacity={0.2}
                            isAnimationActive={true}
                            animationDuration={1500}
                          />
                        )}
                        <Tooltip content={<CustomRadarTooltip />} cursor={false} />
                        {compareMode && <Legend wrapperStyle={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', paddingTop: '20px' }} />}
                      </RadarChart>
                    </ResponsiveContainer>
                </div>
              </div>

              {/* Traits and History Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-white/5">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h4 className="text-[10px] text-blue-500 font-black uppercase tracking-widest flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> 战术缘起与演化
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed font-medium">
                       {selectedSystem.historicalContext}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[10px] text-blue-500 font-black uppercase tracking-widest">核心推演逻辑 / KEY TRAITS</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSystem.keyTraits?.map(trait => (
                        <span key={trait} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[10px] text-gray-300 font-black tracking-tighter hover:border-blue-500/40 transition-colors">
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <h4 className="text-[10px] text-gray-500 font-black uppercase tracking-widest flex items-center gap-2">
                       <CoachIcon className="w-4 h-4" /> 经典实战样板 / ICONIC TEAMS
                    </h4>
                    <div className="space-y-3">
                      {selectedSystem.famousTeams?.map(team => (
                        <div key={team} className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-between group hover:bg-white/5 transition-all">
                          <span className="text-sm font-bold text-gray-200 group-hover:text-blue-400 transition-colors">{team}</span>
                          <span className="text-[9px] text-gray-600 font-black uppercase opacity-0 group-hover:opacity-100 transition-all">DECODED</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {compareMode && comparisonTarget && (
                    <div className="space-y-4 animate-fade-in">
                       <h4 className="text-[10px] text-orange-500 font-black uppercase tracking-widest flex items-center gap-2">
                          <InfoIcon className="w-4 h-4" /> 对比体系样板 / {comparisonTarget.term}
                       </h4>
                       <div className="space-y-3">
                        {comparisonTarget.famousTeams?.slice(0, 2).map(team => (
                          <div key={`comp-team-${team}`} className="p-5 bg-orange-500/[0.03] border border-orange-500/10 rounded-2xl flex items-center justify-between group hover:bg-orange-500/5 transition-all">
                            <span className="text-sm font-bold text-gray-400 group-hover:text-orange-400 transition-colors">{team}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Analysis Textbox */}
              <div className="mt-16 p-8 bg-gradient-to-br from-blue-600/5 to-transparent border border-blue-500/20 rounded-[2rem] relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 text-8xl font-black text-white/[0.02] italic tracking-tighter select-none pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                   INTEL
                 </div>
                 <h5 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-4">战术大师深度点评 / MASTER CLASS</h5>
                 <p className="text-lg text-gray-300 font-medium leading-relaxed italic relative z-10">
                    {compareMode && comparisonTarget 
                      ? `“ 比较 ${selectedSystem.term} 与 ${comparisonTarget.term} 就像在比较‘手术刀’与‘重锤’。前者通过空间的精细拆解获得优势，而后者则是通过瞬间的能量释放（如高位压迫或极速反击）来摧毁秩序。”`
                      : `“ ${selectedSystem.term} 的成功不仅取决于场上11人的体能，更取决于他们对‘无球瞬间’的一致性理解。这是目前足球战术库中逻辑最为严密、也最难被完全复刻的体系之一。”`
                    }
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
