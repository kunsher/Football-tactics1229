
import React, { useState, useMemo } from 'react';
import { GLOSSARY } from '../constants';
import type { GlossaryTerm } from '../types';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, Legend } from 'recharts';
import { InfoIcon, CoachIcon, TrophyIcon } from './icons';
import { TacticalVisualizer } from './TacticalVisualizer';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map(i => (
            <div 
                key={i} 
                className={`h-2 w-5 rounded-full ${i <= value ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]' : 'bg-white/10'}`}
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

  const relatedTerms = useMemo(() => {
    return GLOSSARY.filter(t => t.category === selectedTerm.category && t.term !== selectedTerm.term).slice(0, 3);
  }, [selectedTerm]);

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
    <div className="flex flex-col gap-10 animate-fade-in max-w-7xl mx-auto py-2 mb-20">
      {/* Search & Filter Header */}
      <div className="bg-[#0a0f14] border border-white/10 rounded-[3rem] p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/[0.02] pointer-events-none"></div>
        
        <div className="flex flex-col gap-4 relative z-10 w-full lg:w-auto">
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
            核心术语百科 <span className="text-blue-500 font-bold ml-1 text-sm italic tracking-widest opacity-50">/ REPOSITORY</span>
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
                  activeCategory === cat 
                    ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/20' 
                    : 'bg-white/5 border-white/10 text-gray-500 hover:text-white'
                }`}
              >
                {cat === 'All' ? '全部项' : cat === 'System' ? '战术体系' : cat === 'Position' ? '场上位置' : cat === 'Action' ? '技术动作' : '战术阶段'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6 w-full lg:w-[450px] relative z-10">
          <div className="relative flex-grow">
            <input 
              type="text"
              placeholder="搜索术语、历史背景、名帅..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-14 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-600"
            />
            <span className="absolute left-5 top-1/2 -translate-y-1/2 opacity-30 text-xl">🔍</span>
          </div>
          <button 
            onClick={handleToggleCompare}
            className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center gap-2 border whitespace-nowrap ${
              compareMode ? 'bg-orange-600 border-orange-400 text-white shadow-lg shadow-orange-600/30' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {compareMode ? '取消对比' : '术语对比'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 space-y-6 max-h-[85vh] overflow-y-auto pr-6 scrollbar-thin scrollbar-thumb-white/10">
          <AnimatePresence mode="popLayout">
            {filteredTerms.length > 0 ? (
              filteredTerms.map((term) => (
                <motion.button
                  key={term.term}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  disabled={compareMode && comparisonTarget?.term === term.term}
                  onClick={() => { setSelectedTerm(term); if(!compareMode) window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className={`w-full text-left p-6 rounded-[2rem] border transition-all flex items-center gap-5 group relative overflow-hidden ${
                    selectedTerm.term === term.term
                      ? 'bg-blue-600 border-blue-400 shadow-2xl shadow-blue-600/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-500/30 disabled:opacity-20'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                    selectedTerm.term === term.term ? 'bg-white/20' : 'bg-white/5 shadow-inner'
                  }`}>
                    {term.icon || '📘'}
                  </div>
                  <div className="relative z-10 flex-grow">
                    <p className={`font-black text-base uppercase tracking-tight leading-tight ${selectedTerm.term === term.term ? 'text-white' : 'text-gray-200'}`}>{term.term}</p>
                    <p className={`text-[9px] font-bold mt-1.5 tracking-widest uppercase ${selectedTerm.term === term.term ? 'text-blue-100' : 'text-gray-500'}`}>
                      {term.category === 'System' ? '体系' : term.category === 'Position' ? '位置' : term.category === 'Action' ? '动作' : '阶段'} • LVL {term.complexity || 3}
                    </p>
                  </div>
                  {selectedTerm.term === term.term && !compareMode && (
                    <div className="absolute -right-4 -bottom-2 text-5xl font-black text-white/5 italic select-none">#ACTIVE</div>
                  )}
                </motion.button>
              ))
            ) : (
              <div className="p-16 text-center bg-white/5 rounded-[3rem] border border-white/5 opacity-40">
                <p className="text-sm font-black text-gray-500 uppercase tracking-widest">无匹配记录</p>
              </div>
            )}
          </AnimatePresence>

          {compareMode && (
            <div className="pt-10 border-t border-white/10 space-y-6">
              <p className="text-[10px] text-orange-500 font-black uppercase tracking-[0.4em] pl-2 flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></div>
                 选择对比项 / COMPARE TARGET
              </p>
              {filteredTerms.filter(t => t.term !== selectedTerm.term).map((term) => (
                <button
                  key={`comp-${term.term}`}
                  onClick={() => setComparisonTarget(term)}
                  className={`w-full text-left p-6 rounded-[2rem] border transition-all flex items-center gap-5 group ${
                    comparisonTarget?.term === term.term
                      ? 'bg-orange-600 border-orange-400 shadow-2xl shadow-orange-600/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-orange-500/30'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                    comparisonTarget?.term === term.term ? 'bg-white/20' : 'bg-white/5 shadow-inner'
                  }`}>
                    {term.icon || '⚖️'}
                  </div>
                  <div className="flex-grow">
                    <p className={`font-black text-base uppercase tracking-tight ${comparisonTarget?.term === term.term ? 'text-white' : 'text-gray-200'}`}>{term.term}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content detail view */}
        <div className="lg:col-span-8 space-y-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTerm.term + (comparisonTarget?.term || '')}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="bg-[#0a0f14] border border-white/10 rounded-[4rem] p-12 md:p-16 relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] -mr-40 -mt-40"></div>
              
              <div className="relative z-10">
                {/* Top Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">
                  <div className="space-y-10">
                    <div className="space-y-6">
                      <div className="flex items-center gap-5">
                          <div className="w-2 h-10 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.6)]"></div>
                          <div>
                              <span className="text-[11px] text-gray-500 font-black uppercase tracking-[0.5em]">战术解码 / {selectedTerm.category.toUpperCase()}</span>
                              <h3 className="text-6xl font-black text-white tracking-tighter mt-1 leading-[0.9]">
                                  {compareMode && comparisonTarget ? (
                                      <span className="flex flex-col gap-4">
                                          <span className="text-blue-500 underline decoration-blue-500/20">{selectedTerm.term}</span>
                                          <span className="text-gray-700 text-3xl uppercase tracking-widest font-black italic">VS</span>
                                          <span className="text-orange-500 underline decoration-orange-500/20">{comparisonTarget.term}</span>
                                      </span>
                                  ) : selectedTerm.term}
                              </h3>
                          </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-10 py-2">
                          <div className="space-y-2">
                              <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest">认知门槛 / COMPLEXITY</p>
                              <ComplexityMeter value={selectedTerm.complexity || 3} />
                          </div>
                          <div className="w-px h-10 bg-white/10"></div>
                          <div className="flex gap-2.5">
                              {selectedTerm.strategicFocus?.map(f => (
                                  <span key={f} className="text-[10px] font-black text-blue-400/90 uppercase border border-blue-500/30 px-3 py-1 rounded-xl bg-blue-500/10 shadow-sm transition-all hover:bg-blue-500/20 hover:scale-105">#{f}</span>
                              ))}
                          </div>
                      </div>

                      <div className="relative group">
                        <div className="absolute inset-0 bg-blue-500/5 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <p className="text-2xl text-gray-300 leading-relaxed font-medium italic border-l-4 border-blue-500/40 pl-10 py-6 relative z-10 bg-white/[0.02] rounded-r-[2rem]">
                            {selectedTerm.definition}
                        </p>
                      </div>
                    </div>
                    
                    {/* Related Terms Recommendation */}
                    {!compareMode && relatedTerms.length > 0 && (
                       <div className="pt-6">
                          <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest mb-4">关联研究推荐 / RELATED</p>
                          <div className="flex gap-3">
                             {relatedTerms.map(t => (
                               <button 
                                 key={t.term} 
                                 onClick={() => setSelectedTerm(t)}
                                 className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-[10px] font-black text-gray-500 hover:text-blue-400 hover:border-blue-500/30 transition-all"
                               >
                                 {t.term}
                               </button>
                             ))}
                          </div>
                       </div>
                    )}
                  </div>

                  {/* Visual Stats Section */}
                  <div className="space-y-12 flex flex-col items-center">
                     <div className="w-full bg-[#05080b] rounded-[4.5rem] p-12 border border-white/5 aspect-square min-h-[350px] relative group shadow-2xl flex items-center justify-center">
                        <div className="absolute inset-0 bg-blue-600/[0.03] opacity-0 group-hover:opacity-100 transition-opacity rounded-[4.5rem]"></div>
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[11px] font-black text-gray-700 uppercase tracking-[0.4em]">TACTICAL GENOME MAP</div>
                        
                        <div className="w-full h-full">
                          <ResponsiveContainer width="100%" height="100%" minHeight={250}>
                             <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                               <PolarGrid stroke="rgba(255,255,255,0.06)" />
                               <PolarAngleAxis dataKey="subject" tick={{fill: '#64748b', fontSize: 13, fontWeight: '900'}} />
                               <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                               <Radar
                                 name={selectedTerm.term}
                                 dataKey="A"
                                 stroke="#3b82f6"
                                 strokeWidth={4}
                                 fill="#3b82f6"
                                 fillOpacity={0.4}
                                 animationDuration={2000}
                               />
                               {compareMode && comparisonTarget && (
                                 <Radar
                                   name={comparisonTarget.term}
                                   dataKey="B"
                                   stroke="#f97316"
                                   strokeWidth={3}
                                   fill="#f97316"
                                   fillOpacity={0.2}
                                   animationDuration={2000}
                                 />
                               )}
                               <Tooltip content={<CustomRadarTooltip />} cursor={false} />
                               {compareMode && <Legend verticalAlign="bottom" wrapperStyle={{ fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', paddingTop: '40px' }} />}
                             </RadarChart>
                           </ResponsiveContainer>
                        </div>
                     </div>
                     
                     {selectedTerm.relatedBattleId && !compareMode && (
                        <button 
                          onClick={() => onNavigateToBattle?.(selectedTerm.relatedBattleId!)}
                          className="group w-full max-w-md py-6 bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white text-[13px] font-black uppercase tracking-[0.4em] rounded-[2.5rem] shadow-[0_20px_60px_rgba(37,99,235,0.25)] transition-all transform hover:-translate-y-2 active:scale-95 flex items-center justify-center gap-5"
                        >
                          加载关联实战实验场
                          <span className="text-2xl group-hover:translate-x-3 transition-transform">→</span>
                        </button>
                      )}
                  </div>
                </div>

                {/* Tactical Visualization Preview */}
                {selectedTerm.visualEffect && !compareMode && (
                  <div className="mb-20 bg-white/[0.01] border border-white/5 p-10 rounded-[3.5rem] relative overflow-hidden group/vis shadow-inner">
                     <div className="absolute inset-0 bg-blue-500/[0.01] opacity-0 group-hover/vis:opacity-100 transition-opacity"></div>
                     <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                           <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping"></div>
                           <h4 className="text-[12px] text-blue-500 font-black uppercase tracking-[0.3em]">动态逻辑演示 / DYNAMIC ENGINE</h4>
                        </div>
                        <div className="flex items-center gap-3">
                           <span className="px-2.5 py-1 rounded bg-blue-600/10 border border-blue-500/20 text-[9px] text-blue-400 font-black uppercase">REALTIME SVG</span>
                           <span className="text-[9px] text-gray-700 font-black uppercase tracking-tighter">RENDER: 60FPS</span>
                        </div>
                     </div>
                     <div className="flex justify-center">
                        <TacticalVisualizer type={selectedTerm.visualEffect} size="large" />
                     </div>
                  </div>
                )}

                {/* Compare View Extra Context */}
                {compareMode && comparisonTarget && (
                   <div className="grid grid-cols-2 gap-10 mb-20 animate-fade-in">
                      <div className="p-8 rounded-[3rem] bg-blue-600/5 border border-blue-500/10 flex flex-col gap-4">
                         <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest">核心逻辑 / {selectedTerm.term}</p>
                         <p className="text-sm text-gray-400 font-medium leading-relaxed italic pr-4">“通过结构化的跑位制造绝对优势区域，其精髓在于主动发起进攻节奏。”</p>
                      </div>
                      <div className="p-8 rounded-[3rem] bg-orange-600/5 border border-orange-500/10 flex flex-col gap-4">
                         <p className="text-[10px] text-orange-400 font-black uppercase tracking-widest">核心逻辑 / {comparisonTarget.term}</p>
                         <p className="text-sm text-gray-400 font-medium leading-relaxed italic pr-4">“更侧重于对平衡的追求，利用对方进攻时留下的空间缝隙完成致命一击。”</p>
                      </div>
                   </div>
                )}

                {/* Bottom Detail Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 pt-16 border-t border-white/5">
                  <div className="space-y-12">
                    {selectedTerm.historicalContext && (
                      <div className="space-y-6">
                        <h4 className="text-[14px] text-blue-500 font-black uppercase tracking-[0.25em] flex items-center gap-4">
                           <div className="w-2 h-6 bg-blue-500 rounded-full"></div> 战术起源与演化历程
                        </h4>
                        <p className="text-lg text-gray-400 leading-relaxed font-medium pl-8 border-l border-white/5 italic">
                           {selectedTerm.historicalContext}
                        </p>
                      </div>
                    )}

                    {selectedTerm.keyTraits && (
                      <div className="space-y-6">
                        <h4 className="text-[14px] text-blue-400 font-black uppercase tracking-[0.25em] pl-2">关键指纹特征 / KEY TRAITS</h4>
                        <div className="flex flex-wrap gap-4">
                          {selectedTerm.keyTraits.map(trait => (
                            <div key={trait} className="px-6 py-3 bg-blue-600/10 border border-blue-500/20 rounded-[2rem] text-[12px] text-blue-300 font-black tracking-tighter hover:bg-blue-600/20 transition-all hover:scale-105 shadow-md flex items-center gap-3">
                              <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>
                              {trait}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-12">
                    {selectedTerm.famousTeams && (
                      <div className="space-y-6">
                        <h4 className="text-[14px] text-gray-500 font-black uppercase tracking-[0.25em] flex items-center gap-4">
                           <CoachIcon className="w-6 h-6 text-gray-600" /> 实战样板战队
                        </h4>
                        <div className="grid grid-cols-1 gap-4">
                          {selectedTerm.famousTeams.map(team => (
                            <div key={team} className="p-8 bg-[#05080b] border border-white/5 rounded-[3rem] flex items-center justify-between group hover:bg-white/5 hover:border-blue-500/40 transition-all shadow-xl">
                              <div className="flex items-center gap-6">
                                  <TrophyIcon className="w-5 h-5 text-orange-500 opacity-40 group-hover:opacity-100 transition-opacity" />
                                  <span className="text-lg font-black text-gray-200 group-hover:text-white tracking-tight">{team}</span>
                              </div>
                              <span className="text-[10px] text-blue-500 font-black uppercase opacity-0 group-hover:opacity-100 transition-all bg-blue-500/10 px-3 py-1.5 rounded-xl border border-blue-500/20">DECODED</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="p-12 bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/20 rounded-[4rem] relative group overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
                       <div className="absolute -top-6 -right-6 text-8xl font-black text-white/[0.02] italic tracking-tighter select-none pointer-events-none group-hover:scale-110 transition-transform duration-1000">MASTER</div>
                       <p className="text-xl text-blue-100/90 font-medium italic leading-relaxed relative z-10">
                          “ 优秀的战术不仅是关于如何移动球员，更是关于如何利用对手的思维定势创造‘不可观测’的优势。理解 {selectedTerm.term} 的深度，决定了你在模拟场上的视野极限。”
                       </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
