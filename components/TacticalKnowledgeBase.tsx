
import React, { useState, useMemo } from 'react';
import { GLOSSARY } from '../constants';
import type { GlossaryTerm } from '../types';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, Legend } from 'recharts';
import { InfoIcon, CoachIcon, TrophyIcon } from './icons';
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

const ComplexityMeter: React.FC<{ value: number }> = ({ value }) => (
    <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(i => (
            <div 
                key={i} 
                className={`h-1.5 w-4 rounded-full ${i <= value ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]' : 'bg-white/10'}`}
            />
        ))}
    </div>
);

export const TacticalKnowledgeBase: React.FC<TacticalKnowledgeBaseProps> = ({ onNavigateToBattle }) => {
  const categories = ['All', 'System', 'Position', 'Action', 'Phase'];
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredTerms = useMemo(() => {
    return GLOSSARY.filter(t => {
      const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
      const matchesSearch = t.term.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           t.definition.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm>(filteredTerms[0] || GLOSSARY[0]);
  const [compareMode, setCompareMode] = useState(false);
  const [comparisonTarget, setComparisonTarget] = useState<GlossaryTerm | null>(null);

  const radarData = useMemo(() => {
    const primary = selectedTerm.radarProfile || [];
    if (!compareMode || !comparisonTarget || !comparisonTarget.radarProfile) {
        return primary;
    }
    
    return primary.map((point, i) => ({
      ...point,
      A: point.A,
      B: comparisonTarget.radarProfile?.[i]?.A || 0
    }));
  }, [selectedTerm, comparisonTarget, compareMode]);

  const handleToggleCompare = () => {
    if (compareMode) {
      setCompareMode(false);
      setComparisonTarget(null);
    } else {
      setCompareMode(true);
      setComparisonTarget(filteredTerms.find(t => t.term !== selectedTerm.term) || null);
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in max-w-7xl mx-auto py-2">
      {/* Search & Filter Header */}
      <div className="bg-[#0a0f14] border border-white/10 rounded-[2.5rem] p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/[0.02] pointer-events-none"></div>
        
        <div className="flex flex-col gap-2 relative z-10 w-full lg:w-auto">
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
            核心术语百科 <span className="text-blue-500 font-bold ml-1 text-sm italic tracking-widest opacity-50">/ REPOSITORY</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
                  activeCategory === cat 
                    ? 'bg-blue-600 border-blue-400 text-white shadow-lg' 
                    : 'bg-white/5 border-white/10 text-gray-500 hover:text-white'
                }`}
              >
                {cat === 'All' ? '全部项' : cat === 'System' ? '体系' : cat === 'Position' ? '位置' : cat === 'Action' ? '动作' : '阶段'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 w-full lg:w-[400px] relative z-10">
          <div className="relative flex-grow">
            <input 
              type="text"
              placeholder="搜索术语、历史、名帅..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-12 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-600"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 text-lg">🔍</span>
          </div>
          <button 
            onClick={handleToggleCompare}
            className={`px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center gap-2 border whitespace-nowrap ${
              compareMode ? 'bg-orange-600 border-orange-400 text-white shadow-[0_0_20px_rgba(234,88,12,0.3)]' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            {compareMode ? '取消对比' : '开启对比'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 space-y-4 max-h-[75vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10">
          {filteredTerms.length > 0 ? (
            filteredTerms.map((term) => (
              <button
                key={term.term}
                disabled={compareMode && comparisonTarget?.term === term.term}
                onClick={() => { setSelectedTerm(term); if(!compareMode) window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`w-full text-left p-5 rounded-2xl border transition-all flex items-center gap-4 group relative overflow-hidden ${
                  selectedTerm.term === term.term
                    ? 'bg-blue-600 border-blue-400 shadow-xl shadow-blue-600/30'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-500/30 disabled:opacity-20'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                  selectedTerm.term === term.term ? 'bg-white/20' : 'bg-white/5'
                }`}>
                  {term.icon || '📘'}
                </div>
                <div className="relative z-10 flex-grow">
                  <p className={`font-black text-sm uppercase tracking-tight ${selectedTerm.term === term.term ? 'text-white' : 'text-gray-300'}`}>{term.term}</p>
                  <p className={`text-[9px] font-bold mt-1 opacity-60 ${selectedTerm.term === term.term ? 'text-white' : 'text-gray-500'}`}>
                    {term.category.toUpperCase()} • LVL {term.complexity || 3}
                  </p>
                </div>
                {selectedTerm.term === term.term && (
                  <div className="absolute -right-2 -bottom-1 text-4xl font-black text-white/10 italic">#ACTIVE</div>
                )}
              </button>
            ))
          ) : (
            <div className="p-12 text-center bg-white/5 rounded-3xl border border-white/5 opacity-50">
              <p className="text-sm font-bold text-gray-500 uppercase">无匹配术语记录</p>
            </div>
          )}

          {compareMode && (
            <div className="pt-6 border-t border-white/10 space-y-4">
              <p className="text-[10px] text-orange-500 font-black uppercase tracking-[0.3em] pl-1">对比项选择 / COMPARE TO</p>
              {filteredTerms.filter(t => t.term !== selectedTerm.term).map((term) => (
                <button
                  key={`comp-${term.term}`}
                  onClick={() => setComparisonTarget(term)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all flex items-center gap-4 group ${
                    comparisonTarget?.term === term.term
                      ? 'bg-orange-600 border-orange-400 shadow-xl shadow-orange-600/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-orange-500/30'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                    comparisonTarget?.term === term.term ? 'bg-white/20' : 'bg-white/5'
                  }`}>
                    {term.icon || '⚖️'}
                  </div>
                  <div className="flex-grow">
                    <p className={`font-black text-sm uppercase tracking-tight ${comparisonTarget?.term === term.term ? 'text-white' : 'text-gray-300'}`}>{term.term}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content detail view */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-[#0a0f14] border border-white/10 rounded-[3rem] p-10 md:p-14 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] -mr-40 -mt-40"></div>
            
            <div className="relative z-10">
              {/* Top Banner with Stats & Brief */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="w-1.5 h-8 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]"></div>
                        <div>
                            <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.4em]">术语详情解码 / {selectedTerm.category}</span>
                            <h3 className="text-5xl font-black text-white tracking-tighter mt-1 leading-none">
                                {compareMode && comparisonTarget ? (
                                    <span className="flex flex-col gap-2">
                                        <span className="text-blue-500">{selectedTerm.term}</span>
                                        <span className="text-gray-600 text-2xl uppercase tracking-widest font-bold">VS</span>
                                        <span className="text-orange-500">{comparisonTarget.term}</span>
                                    </span>
                                ) : selectedTerm.term}
                            </h3>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-8 py-2">
                        <div className="space-y-1">
                            <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest">战术复杂度</p>
                            <ComplexityMeter value={selectedTerm.complexity || 3} />
                        </div>
                        <div className="w-px h-6 bg-white/5"></div>
                        <div className="flex gap-2">
                            {selectedTerm.strategicFocus?.map(f => (
                                <span key={f} className="text-[9px] font-black text-blue-400/80 uppercase border border-blue-500/20 px-2 py-0.5 rounded bg-blue-500/5">#{f}</span>
                            ))}
                        </div>
                    </div>

                    <p className="text-xl text-gray-300 leading-relaxed font-medium italic border-l-2 border-blue-500/30 pl-8 bg-white/[0.01] py-4 rounded-r-2xl shadow-inner">
                        {selectedTerm.definition}
                    </p>
                  </div>
                  
                  {/* Animation Preview - SINGLE VIEW */}
                  {selectedTerm.visualEffect && !compareMode && (
                    <div className="mt-12 group">
                       <div className="flex items-center justify-between mb-4">
                            <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                                动态战术演示 / VISUAL SIMULATION
                            </p>
                            <span className="text-[9px] text-gray-600 font-black uppercase">FPS: 60 • ENGINE: SVG-TAC</span>
                       </div>
                       <TacticalVisualizer type={selectedTerm.visualEffect} size="large" />
                    </div>
                  )}

                  {/* Animation Preview - COMPARE VIEW */}
                  {compareMode && comparisonTarget && (
                    <div className="space-y-6 mt-12 animate-fade-in">
                        <div className="p-8 bg-orange-600/10 border border-orange-500/20 rounded-[2.5rem] relative overflow-hidden">
                           <div className="absolute top-0 right-0 p-4 opacity-5"><InfoIcon className="w-16 h-16" /></div>
                           <p className="text-xs text-orange-400 font-black mb-3 uppercase tracking-widest">博弈对冲分析 / INSIGHT</p>
                           <p className="text-sm text-gray-400 leading-relaxed italic font-medium">
                             对比雷达图显示，{selectedTerm.term} 在核心性能上的极致追求与 {comparisonTarget.term} 的平衡策略形成了鲜明的结构性对冲。
                           </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <p className="text-[9px] text-blue-500 font-black uppercase text-center">{selectedTerm.term} 动态</p>
                                {selectedTerm.visualEffect ? <TacticalVisualizer type={selectedTerm.visualEffect} size="small" /> : <div className="h-[180px] bg-white/5 rounded-xl border border-white/5 flex items-center justify-center text-[10px] text-gray-700">无动画记录</div>}
                            </div>
                            <div className="space-y-2">
                                <p className="text-[9px] text-orange-500 font-black uppercase text-center">{comparisonTarget.term} 动态</p>
                                {comparisonTarget.visualEffect ? <TacticalVisualizer type={comparisonTarget.visualEffect} size="small" /> : <div className="h-[180px] bg-white/5 rounded-xl border border-white/5 flex items-center justify-center text-[10px] text-gray-700">无动画记录</div>}
                            </div>
                        </div>
                    </div>
                  )}
                </div>

                {/* Radar Chart Section - 修复父容器高度问题 */}
                <div className="space-y-8 flex flex-col items-center">
                   <div className="w-full bg-white/[0.03] rounded-[4rem] p-12 border border-white/5 aspect-square min-h-[300px] relative group shadow-inner flex items-center justify-center">
                      <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[4rem]"></div>
                      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[10px] font-black text-gray-700 uppercase tracking-widest">DNA PERFORMANCE MAP</div>
                      
                      {radarData.length > 0 ? (
                        <div className="w-full h-full">
                          <ResponsiveContainer width="100%" height="100%" minHeight={200}>
                             <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                               <PolarGrid stroke="rgba(255,255,255,0.08)" />
                               <PolarAngleAxis dataKey="subject" tick={{fill: '#64748b', fontSize: 12, fontWeight: '900'}} />
                               <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                               <Radar
                                 name={selectedTerm.term}
                                 dataKey="A"
                                 stroke="#3b82f6"
                                 strokeWidth={3}
                                 fill="#3b82f6"
                                 fillOpacity={0.4}
                                 animationDuration={1500}
                               />
                               {compareMode && comparisonTarget && (
                                 <Radar
                                   name={comparisonTarget.term}
                                   dataKey="B"
                                   stroke="#f97316"
                                   strokeWidth={2}
                                   fill="#f97316"
                                   fillOpacity={0.2}
                                   animationDuration={1500}
                                 />
                               )}
                               <Tooltip content={<CustomRadarTooltip />} cursor={false} />
                               {compareMode && <Legend verticalAlign="bottom" wrapperStyle={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', paddingTop: '30px' }} />}
                             </RadarChart>
                           </ResponsiveContainer>
                        </div>
                      ) : (
                        <div className="text-gray-600 text-[10px] font-bold uppercase tracking-widest opacity-40">解析中...</div>
                      )}
                   </div>
                   
                   {selectedTerm.relatedBattleId && !compareMode && (
                    <button 
                      onClick={() => onNavigateToBattle?.(selectedTerm.relatedBattleId!)}
                      className="group w-full max-w-sm py-5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-[12px] font-black uppercase tracking-[0.3em] rounded-2xl shadow-2xl shadow-blue-600/20 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-4"
                    >
                      加载关联战役同步复盘 
                      <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Encyclopedia Grid - Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-16 border-t border-white/5">
                <div className="space-y-10">
                  {selectedTerm.historicalContext && (
                    <div className="space-y-4">
                      <h4 className="text-[12px] text-blue-500 font-black uppercase tracking-widest flex items-center gap-3">
                         <div className="w-1.5 h-5 bg-blue-500 rounded-full"></div> 战术缘起与演化历程
                      </h4>
                      <p className="text-base text-gray-400 leading-relaxed font-medium pl-6 border-l border-white/5">
                         {selectedTerm.historicalContext}
                      </p>
                    </div>
                  )}

                  {selectedTerm.keyTraits && (
                    <div className="space-y-5">
                      <h4 className="text-[12px] text-blue-400 font-black uppercase tracking-widest pl-2">核心技术指纹 / KEY TRAITS</h4>
                      <div className="flex flex-wrap gap-3">
                        {selectedTerm.keyTraits.map(trait => (
                          <div key={trait} className="px-5 py-2.5 bg-blue-600/10 border border-blue-500/20 rounded-2xl text-[11px] text-blue-300 font-black tracking-tighter hover:bg-blue-600/20 transition-colors flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                            {trait}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-10">
                  {selectedTerm.famousTeams && (
                    <div className="space-y-5">
                      <h4 className="text-[12px] text-gray-500 font-black uppercase tracking-widest flex items-center gap-3">
                         <CoachIcon className="w-5 h-5" /> 经典实战样板
                      </h4>
                      <div className="space-y-4">
                        {selectedTerm.famousTeams.map(team => (
                          <div key={team} className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl flex items-center justify-between group hover:bg-white/5 hover:border-blue-500/30 transition-all shadow-lg">
                            <div className="flex items-center gap-4">
                                <TrophyIcon className="w-4 h-4 text-orange-500/50" />
                                <span className="text-base font-black text-gray-200 group-hover:text-white">{team}</span>
                            </div>
                            <span className="text-[10px] text-gray-600 font-black uppercase opacity-0 group-hover:opacity-100 transition-all bg-white/5 px-2 py-1 rounded">MATCH DECODED</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="p-10 bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/20 rounded-[3rem] relative group overflow-hidden shadow-2xl">
                     <div className="absolute top-0 right-0 p-6 text-7xl font-black text-white/[0.02] italic tracking-tighter select-none pointer-events-none group-hover:scale-110 transition-transform duration-1000">MASTER</div>
                     <p className="text-lg text-blue-100/90 font-medium italic leading-relaxed relative z-10">
                        “ 足球战术的进化，本质上是关于如何在规则的边界内‘创造偏移’。掌握 {selectedTerm.term} 只是第一步，真正的挑战在于如何在激烈的实战博弈中维持这套逻辑的稳定性。”
                     </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
