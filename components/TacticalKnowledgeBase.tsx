
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
    <div className="flex flex-col gap-10 animate-fade-in max-w-7xl mx-auto py-2 mb-20 px-4">
      {/* Search & Filter Header */}
      <div className="bg-[#0a0f14] border border-white/10 rounded-[3rem] p-8 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/[0.02] pointer-events-none"></div>
        
        <div className="flex flex-col gap-4 relative z-10 w-full lg:w-auto">
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
            战术智能百科 <span className="text-blue-500 font-bold ml-1 text-sm italic tracking-widest opacity-50">/ INTELLIGENCE</span>
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
                {cat === 'All' ? '全部' : cat === 'System' ? '体系' : cat === 'Position' ? '位置' : cat === 'Action' ? '动作' : '阶段'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6 w-full lg:w-[450px] relative z-10">
          <div className="relative flex-grow">
            <input 
              type="text"
              placeholder="搜索战术、历史、名帅..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-12 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-600"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30">🔍</span>
          </div>
          <button 
            onClick={handleToggleCompare}
            className={`px-6 py-3.5 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center gap-2 border whitespace-nowrap ${
              compareMode ? 'bg-orange-600 border-orange-400 text-white shadow-lg shadow-orange-600/30' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            {compareMode ? '退出对比' : '开启对比'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar - Narrowed from col-span-4 to col-span-3 */}
        <div className="lg:col-span-3 space-y-4 max-h-[85vh] overflow-y-auto pr-4 scrollbar-thin">
          <AnimatePresence mode="popLayout">
            {filteredTerms.map((term) => (
              <motion.button
                key={term.term}
                layout
                onClick={() => { setSelectedTerm(term); if(!compareMode) window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`w-full text-left p-4 rounded-[2rem] border transition-all flex flex-col gap-3 group relative overflow-hidden ${
                  selectedTerm.term === term.term
                    ? 'bg-blue-600 border-blue-400 shadow-2xl scale-[1.02]'
                    : 'bg-white/5 border-white/10 hover:border-blue-500/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                    selectedTerm.term === term.term ? 'bg-white/20' : 'bg-white/5'
                  }`}>
                    {term.icon || '📘'}
                  </div>
                  <div className="relative z-10 overflow-hidden">
                    <p className={`font-black text-lg lg:text-xl uppercase tracking-tighter truncate ${selectedTerm.term === term.term ? 'text-white' : 'text-gray-200'}`}>{term.term}</p>
                    <p className={`text-[8px] font-black mt-0.5 tracking-widest uppercase ${selectedTerm.term === term.term ? 'text-blue-100' : 'text-gray-600'}`}>
                      {term.category} • LVL {term.complexity}
                    </p>
                  </div>
                </div>
                {/* 侧边栏微型预览图 */}
                {term.visualEffect && (
                   <div className={`w-full aspect-[2.2/1] rounded-2xl overflow-hidden pointer-events-none transition-all duration-700 shadow-inner border border-white/5 ${selectedTerm.term === term.term ? 'opacity-100 scale-100' : 'opacity-20 group-hover:opacity-60 scale-95'}`}>
                      <TacticalVisualizer type={term.visualEffect} size="small" />
                   </div>
                )}
              </motion.button>
            ))}
          </AnimatePresence>

          {compareMode && (
            <div className="pt-10 mt-6 border-t border-white/10 space-y-4">
              <p className="text-[10px] text-orange-500 font-black uppercase tracking-widest pl-2">选择对比目标 / TARGET</p>
              {filteredTerms.filter(t => t.term !== selectedTerm.term).map((term) => (
                <button
                  key={`comp-${term.term}`}
                  onClick={() => setComparisonTarget(term)}
                  className={`w-full text-left p-4 rounded-[2rem] border transition-all flex items-center gap-4 group ${
                    comparisonTarget?.term === term.term
                      ? 'bg-orange-600 border-orange-400 shadow-2xl scale-[1.02]'
                      : 'bg-white/5 border-white/10 hover:border-orange-500/30'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                    comparisonTarget?.term === term.term ? 'bg-white/20' : 'bg-white/5'
                  }`}>
                    {term.icon || '⚖️'}
                  </div>
                  <p className={`font-black text-lg uppercase tracking-tighter truncate ${comparisonTarget?.term === term.term ? 'text-white' : 'text-gray-200'}`}>{term.term}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content detail view - Expanded from col-span-8 to col-span-9 */}
        <div className="lg:col-span-9 space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTerm.term + (comparisonTarget?.term || '')}
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              className="bg-[#0d131a] border border-white/10 rounded-[3rem] p-10 md:p-14 relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
              
              <div className="relative z-10">
                {/* Header Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
                  <div className="space-y-10">
                    <div className="flex items-center gap-5">
                        <div className="w-2 h-12 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
                        <div>
                            <span className="text-[11px] text-gray-500 font-black uppercase tracking-[0.5em]">战术智能解码单元</span>
                            <h3 className="text-5xl lg:text-6xl font-black text-white tracking-tighter mt-2 leading-[0.9]">
                                {compareMode && comparisonTarget ? (
                                    <div className="flex flex-col gap-3">
                                        <span className="text-blue-500">{selectedTerm.term}</span>
                                        <div className="flex items-center gap-4">
                                            <div className="h-[2px] w-8 bg-gray-800"></div>
                                            <span className="text-gray-700 text-2xl font-black italic">VERSUS</span>
                                            <div className="h-[2px] w-8 bg-gray-800"></div>
                                        </div>
                                        <span className="text-orange-500">{comparisonTarget.term}</span>
                                    </div>
                                ) : selectedTerm.term}
                            </h3>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-10 py-2">
                        <div className="space-y-2">
                            <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest">学习复杂度评估</p>
                            <ComplexityMeter value={selectedTerm.complexity || 3} />
                        </div>
                        <div className="w-[2px] h-10 bg-white/10"></div>
                        <div className="flex flex-wrap gap-3">
                            {selectedTerm.strategicFocus?.map(f => (
                                <span key={f} className="text-[10px] font-black text-blue-400 uppercase border border-blue-500/40 px-3.5 py-1.5 rounded-xl bg-blue-500/10 shadow-inner">#{f}</span>
                            ))}
                        </div>
                    </div>

                    <p className="text-2xl text-gray-300 leading-relaxed font-bold italic border-l-8 border-blue-500/40 pl-10 py-4 bg-white/[0.03] rounded-r-3xl">
                        {selectedTerm.definition}
                    </p>
                    
                    {/* Related Battles */}
                    {selectedTerm.relatedBattleId && !compareMode && (
                        <button 
                          onClick={() => onNavigateToBattle?.(selectedTerm.relatedBattleId!)}
                          className="w-full px-8 py-6 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-[0.4em] rounded-3xl shadow-2xl transition-all transform hover:-translate-y-2 active:scale-95 flex items-center justify-center gap-6"
                        >
                          加载相关战役实测实验场
                          <span className="text-2xl">→</span>
                        </button>
                    )}
                  </div>

                  {/* Radar Chart Section */}
                  <div className="bg-[#05080b]/90 rounded-[3.5rem] p-10 border border-white/5 relative group min-h-[380px] flex items-center justify-center shadow-inner">
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[10px] font-black text-gray-700 uppercase tracking-[0.4em]">DNA PERFORMANCE TOPOLOGY</div>
                    <ResponsiveContainer width="100%" height={300}>
                       <RadarChart data={radarData}>
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
                         />
                         {compareMode && comparisonTarget && (
                           <Radar
                             name={comparisonTarget.term}
                             dataKey="B"
                             stroke="#f97316"
                             strokeWidth={4}
                             fill="#f97316"
                             fillOpacity={0.25}
                           />
                         )}
                         <Tooltip content={<CustomRadarTooltip />} />
                         {compareMode && <Legend verticalAlign="bottom" wrapperStyle={{ fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', paddingTop: '30px' }} />}
                       </RadarChart>
                     </ResponsiveContainer>
                  </div>
                </div>

                {/* Tactical Visualizer - Center Stage */}
                {selectedTerm.visualEffect && !compareMode && (
                  <div className="mb-14 bg-white/[0.03] border-2 border-white/5 p-12 rounded-[3.5rem] relative overflow-hidden flex flex-col items-center shadow-inner">
                     <div className="w-full flex justify-between items-center mb-10">
                        <span className="text-[11px] text-blue-500 font-black uppercase tracking-[0.5em] pl-4 border-l-4 border-blue-500">动态核心逻辑演示单元</span>
                        <div className="flex gap-2">
                           <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                           <div className="w-2 h-2 rounded-full bg-blue-500/40"></div>
                        </div>
                     </div>
                     <TacticalVisualizer type={selectedTerm.visualEffect} size="large" />
                     <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.5em] mt-8">QUANTUM RENDER ENGINE / INTERACTIVE PREVIEW</p>
                  </div>
                )}

                {/* Comparative Analysis Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-16 border-t border-white/10">
                  <div className="space-y-12">
                    <section className="space-y-6">
                      <h4 className="text-[14px] text-blue-500 font-black uppercase tracking-[0.3em] flex items-center gap-4">
                         历史演化与技术背景 <span className="text-[10px] text-gray-700 font-bold ml-2">/ GENE EVOLUTION</span>
                      </h4>
                      <div className="flex flex-col gap-8">
                         <div className={`space-y-4 ${compareMode ? 'bg-blue-600/5 p-6 rounded-3xl border border-blue-500/10' : ''}`}>
                            {compareMode && <p className="text-[10px] font-black text-blue-400 bg-blue-400/10 px-3 py-1 rounded inline-block uppercase tracking-widest">{selectedTerm.term}</p>}
                            <p className="text-lg text-gray-400 leading-relaxed font-bold italic">
                               {selectedTerm.historicalContext || '该战术体系在现代足球发展史上具有里程碑意义，深刻影响了教练员对空间与球权的认知。'}
                            </p>
                         </div>
                         {compareMode && comparisonTarget && (
                           <div className="space-y-4 bg-orange-600/5 p-6 rounded-3xl border border-orange-500/10">
                              <p className="text-[10px] font-black text-orange-400 bg-orange-400/10 px-3 py-1 rounded inline-block uppercase tracking-widest">{comparisonTarget.term}</p>
                              <p className="text-lg text-gray-500 leading-relaxed font-bold italic">
                                 {comparisonTarget.historicalContext || '该战术在特定历史时期达到了技术巅峰，强调对比赛节奏的绝对掌控。'}
                              </p>
                           </div>
                         )}
                      </div>
                    </section>

                    <section className="space-y-6">
                      <h4 className="text-[14px] text-blue-400 font-black uppercase tracking-[0.3em]">核心战术特征指纹 / KEY TRAITS</h4>
                      <div className="flex flex-col gap-8">
                         <div className="flex flex-wrap gap-3">
                           {selectedTerm.keyTraits?.map(trait => (
                             <span key={trait} className="px-5 py-2.5 bg-blue-600/15 border border-blue-500/30 rounded-2xl text-[11px] text-blue-300 font-black shadow-inner uppercase tracking-tight">
                               {trait}
                             </span>
                           ))}
                         </div>
                         {compareMode && comparisonTarget && (
                           <div className="flex flex-wrap gap-3 pt-6 border-t border-white/5">
                             {comparisonTarget.keyTraits?.map(trait => (
                               <span key={trait} className="px-5 py-2.5 bg-orange-600/15 border border-orange-500/30 rounded-2xl text-[11px] text-orange-300 font-black shadow-inner uppercase tracking-tight">
                                 {trait}
                               </span>
                             ))}
                           </div>
                         )}
                      </div>
                    </section>
                  </div>

                  <div className="space-y-12">
                    <section className="space-y-6">
                      <h4 className="text-[14px] text-gray-500 font-black uppercase tracking-[0.3em] flex items-center gap-4">
                         实战标杆战队模型 <CoachIcon className="w-6 h-6" />
                      </h4>
                      <div className="grid grid-cols-1 gap-4">
                         {(compareMode && comparisonTarget ? [...selectedTerm.famousTeams || [], ...comparisonTarget.famousTeams || []] : selectedTerm.famousTeams)?.map((team, idx) => (
                           <div key={idx} className={`p-6 rounded-[2rem] border flex items-center justify-between group transition-all duration-500 ${
                             compareMode && idx >= (selectedTerm.famousTeams?.length || 0) 
                             ? 'bg-orange-600/10 border-orange-500/20' 
                             : 'bg-white/5 border-white/5 hover:border-blue-500/50 hover:bg-blue-600/5 shadow-inner'
                           }`}>
                              <div className="flex items-center gap-5">
                                  <TrophyIcon className={`w-5 h-5 ${compareMode && idx >= (selectedTerm.famousTeams?.length || 0) ? 'text-orange-500' : 'text-blue-500'}`} />
                                  <span className="text-lg font-black text-gray-300 group-hover:text-white transition-colors">{team}</span>
                              </div>
                              <span className="text-[10px] text-gray-700 font-black uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity">DATA ANALYZED</span>
                           </div>
                         ))}
                      </div>
                    </section>
                    
                    {/* Tactical Pros/Cons Analysis */}
                    <section className="p-10 bg-gradient-to-br from-blue-600/20 to-transparent border-2 border-blue-500/30 rounded-[3.5rem] relative group overflow-hidden shadow-2xl">
                       <div className="absolute -top-6 -right-6 text-9xl font-black text-white/[0.04] italic select-none tracking-tighter transform group-hover:rotate-6 transition-transform duration-1000">T-ANALYZE</div>
                       <h5 className="text-[12px] text-blue-400 font-black uppercase tracking-[0.4em] mb-6">关键利弊深度拆解 / CRITICAL DECODER</h5>
                       <div className="space-y-5 relative z-10">
                          <div className="flex gap-4">
                             <div className="w-1.5 h-10 bg-blue-500 rounded-full shrink-0"></div>
                             <p className="text-sm text-blue-200 font-bold leading-relaxed italic pr-6">
                               <span className="text-blue-500 font-black mr-3 uppercase tracking-widest text-[10px]">PROS:</span> 该体系能最大化球员的技术核心特征，通过精确的空间坐标重构创造出结构性局部优势。
                             </p>
                          </div>
                          <div className="flex gap-4">
                             <div className="w-1.5 h-10 bg-gray-700 rounded-full shrink-0"></div>
                             <p className="text-sm text-gray-400 font-bold leading-relaxed italic pr-6">
                               <span className="text-gray-600 font-black mr-3 uppercase tracking-widest text-[10px]">RISK:</span> 对球员个体的战术智商与体能储备要求极高，高位阵线身后的空档是该战术天然的“阿喀琉斯之踵”。
                             </p>
                          </div>
                       </div>
                    </section>
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
