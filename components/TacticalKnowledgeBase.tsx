
import React, { useState, useMemo, useEffect } from 'react';
import { GLOSSARY } from '../constants';
import type { GlossaryTerm } from '../types';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import { InfoIcon, CoachIcon, TrophyIcon } from './icons';
import { TacticalVisualizer } from './TacticalVisualizer';
import { motion, AnimatePresence } from 'framer-motion';

interface TacticalKnowledgeBaseProps {
  onNavigateToBattle?: (battleId: string) => void;
  initialKnowledgeId?: string | null;
}

const CustomRadarTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 border border-blue-500/50 p-4 rounded-xl shadow-2xl backdrop-blur-xl animate-fade-in ring-1 ring-border">
        <p className="text-[10px] text-blue-500 font-black uppercase tracking-[0.2em] mb-3 border-b border-border pb-2">战术性能分析 / Analytics</p>
        <div className="space-y-3">
          {payload.map((p: any, i: number) => (
            <div key={i} className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }}></div>
                <span className="text-xs font-black uppercase tracking-tighter">{p.name}</span>
              </div>
              <div className="flex items-center justify-between gap-8">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">{p.payload.subject}</span>
                <span className="text-sm font-black text-blue-500">{p.value}%</span>
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
  <div className="flex gap-1.5 font-mono text-[10px]">
    {[1, 2, 3, 4, 5].map(i => (
      <div 
        key={i} 
        className={`h-1.5 w-4 rounded-full transition-all duration-500 ${i <= value ? 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]' : 'bg-slate-200 dark:bg-slate-800'}`}
      />
    ))}
  </div>
);

const DetailColumn: React.FC<{ term: GlossaryTerm; accentColor: string; isSecondary?: boolean }> = ({ term, accentColor, isSecondary }) => (
  <div className={`space-y-10 animate-fade-in ${isSecondary ? 'border-l border-border pl-8 hidden md:block' : ''}`}>
    {isSecondary && (
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2 py-0.5 bg-orange-500/10 border border-orange-500/30 text-[9px] font-black text-orange-500 uppercase tracking-widest rounded">Comparison Target</span>
      </div>
    )}
    
    <section className="space-y-4">
      <h4 className="text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-3 opacity-70" style={{ color: accentColor }}>
        历史基因演化 <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono ml-1">/ GENE_EVOLUTION_LOG</span>
      </h4>
      <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium italic bg-slate-50 dark:bg-slate-900/40 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {term.historicalContext || '该战术体系深刻影响了教练员对空间与球权的认知。'}
      </p>
    </section>

    <section className="space-y-4">
      <h4 className="text-[11px] font-black uppercase tracking-[0.3em] opacity-70" style={{ color: accentColor }}>关键技术指纹 / KEY_TRAITS_HASH</h4>
      <div className="flex flex-wrap gap-2.5">
        {term.keyTraits?.map(trait => (
          <span key={trait} className="px-4 py-2 bg-white dark:bg-slate-900 border rounded-lg text-[10px] font-mono uppercase tracking-tight shadow-sm" style={{ borderColor: `${accentColor}44`, color: accentColor }}>
            {trait}
          </span>
        ))}
      </div>
    </section>

    <section className="space-y-4">
      <h4 className="text-[11px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.3em] flex items-center gap-3">
        标杆战队模型 <CoachIcon className="w-4 h-4" />
      </h4>
      <div className="grid grid-cols-1 gap-2.5">
        {term.famousTeams?.map((team, idx) => (
          <div key={idx} className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 flex items-center justify-between group transition-all hover:border-blue-500/40 hover:shadow-md">
            <div className="flex items-center gap-4">
              <TrophyIcon className="w-4 h-4 text-blue-600 dark:text-blue-500" />
              <span className="text-base font-black text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{team}</span>
            </div>
            <span className="text-[9px] text-slate-400 dark:text-slate-600 font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">DATA_POINT_ACTIVE</span>
          </div>
        ))}
      </div>
    </section>

    <section className={`p-8 border rounded-[2rem] relative group overflow-hidden shadow-sm bg-opacity-5`} style={{ borderColor: `${accentColor}44`, backgroundColor: `${accentColor}08` }}>
      <h5 className="text-[11px] font-black uppercase tracking-[0.4em] mb-6 opacity-80" style={{ color: accentColor }}>利弊深度拆解 / CRITICAL_DECODER_V3</h5>
      <div className="space-y-5 relative z-10">
        <div className="flex gap-4">
          <div className="w-1 h-10 rounded-full shrink-0" style={{ backgroundColor: accentColor }}></div>
          <p className="text-sm font-bold leading-relaxed italic pr-4" style={{ color: `${accentColor}` }}>
            <span className="font-black mr-2 uppercase tracking-widest text-[9px] font-mono">PROS:</span> 最大化球员技术特征，通过空间坐标重构创造结构性优势。
          </p>
        </div>
        <div className="flex gap-4">
          <div className="w-1 h-10 bg-slate-300 dark:bg-slate-700 rounded-full shrink-0"></div>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-bold leading-relaxed italic pr-4">
            <span className="text-slate-400 dark:text-slate-500 font-black mr-2 uppercase tracking-widest text-[9px] font-mono">CONS:</span> 对球员智商与体能要求极高，高位防线身后的空档是天然风险点。
          </p>
        </div>
      </div>
    </section>
  </div>
);

export const TacticalKnowledgeBase: React.FC<TacticalKnowledgeBaseProps> = ({ onNavigateToBattle, initialKnowledgeId }) => {
  const categories = ['All', 'System', 'Position', 'Action', 'Phase', 'Emerging'];
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

  // 处理从外部（如战役）带过来的初始词条 ID
  useEffect(() => {
    if (initialKnowledgeId) {
      const term = GLOSSARY.find(t => t.term === initialKnowledgeId || t.term.includes(initialKnowledgeId));
      if (term) {
        setSelectedTerm(term);
        setActiveCategory('All');
        setCompareMode(false);
      }
    }
  }, [initialKnowledgeId]);

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

  const atmosphereColor = useMemo(() => {
    if (selectedTerm.category === 'System') return 'rgba(59, 130, 246, 0.08)';
    if (selectedTerm.category === 'Action') return 'rgba(239, 68, 68, 0.08)';
    if (selectedTerm.category === 'Emerging') return 'rgba(249, 115, 22, 0.08)';
    return 'rgba(255, 255, 255, 0.05)';
  }, [selectedTerm]);

  return (
    <div className="flex flex-col gap-10 animate-fade-in max-w-7xl mx-auto py-4 mb-20 px-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/[0.01] pointer-events-none"></div>
        
        <div className="flex flex-col gap-4 relative z-10 w-full lg:w-auto">
          <h2 className="text-2xl font-black tracking-tighter uppercase flex items-center gap-3">
            <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
            战术智能百科 <span className="text-blue-600 dark:text-blue-500 font-mono text-[10px] italic tracking-widest opacity-60">/ TACTICAL_GENE_DB_V4</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest transition-all border ${
                  activeCategory === cat 
                    ? 'bg-blue-600 border-blue-500 text-white shadow-md' 
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-blue-400'
                }`}
              >
                {cat === 'All' ? '全部' : cat === 'System' ? '体系' : cat === 'Position' ? '位置' : cat === 'Action' ? '动作' : cat === 'Phase' ? '阶段' : '新兴'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 w-full lg:w-[420px] relative z-10">
          <div className="relative flex-grow">
            <input 
              type="text"
              placeholder="搜索战术基因、历史模型..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 px-10 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder:text-slate-400"
            />
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40 text-xs">🔍</span>
          </div>
          <button 
            onClick={handleToggleCompare}
            className={`px-5 py-3 rounded-xl font-black uppercase tracking-widest text-[9px] transition-all flex items-center gap-2 border whitespace-nowrap ${
              compareMode ? 'bg-orange-600 border-orange-500 text-white shadow-md' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-orange-400'
            }`}
          >
            {compareMode ? '退出对比' : '开启双向对比'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 左侧列表 */}
        <div className="lg:col-span-3 space-y-4 max-h-[85vh] overflow-y-auto pr-3 custom-scrollbar">
          <AnimatePresence mode="popLayout">
            {filteredTerms.map((term) => (
              <motion.button
                key={term.term}
                layout
                onClick={() => { setSelectedTerm(term); if(!compareMode) window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`w-full text-left p-4 rounded-xl border transition-all flex flex-col gap-3 group relative overflow-hidden ${
                  selectedTerm.term === term.term
                    ? 'bg-blue-600 border-blue-500 shadow-lg scale-[1.02] text-white'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-500/30'
                }`}
              >
                <div className="flex items-center gap-4 relative z-20">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                    selectedTerm.term === term.term ? 'bg-white/20' : 'bg-foreground/5'
                  }`}>
                    {term.icon || '📘'}
                  </div>
                  <div className="overflow-hidden">
                    <p className={`font-black text-base uppercase tracking-tighter truncate ${selectedTerm.term === term.term ? 'text-white' : 'text-slate-800 dark:text-slate-100'}`}>{term.term.split(' (')[0]}</p>
                    <p className={`text-[8px] font-mono tracking-widest uppercase ${selectedTerm.term === term.term ? 'text-blue-100' : 'text-slate-400 dark:text-slate-500'}`}>
                      {term.category} • LV_{term.complexity || 3}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>

          {compareMode && (
            <div className="pt-8 mt-6 border-t border-border space-y-4">
              <p className="text-[10px] text-orange-500 font-black uppercase tracking-widest pl-2">选择对比源 / SOURCE B</p>
              {filteredTerms.filter(t => t.term !== selectedTerm.term).map((term) => (
                <button
                  key={`comp-${term.term}`}
                  onClick={() => setComparisonTarget(term)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-4 group ${
                    comparisonTarget?.term === term.term
                      ? 'bg-orange-600 border-orange-400 shadow-xl text-white'
                      : 'bg-card border-border hover:border-orange-500/30'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                    comparisonTarget?.term === term.term ? 'bg-white/20' : 'bg-foreground/5'
                  }`}>
                    {term.icon || '⚖️'}
                  </div>
                  <p className={`font-black text-base uppercase tracking-tighter truncate ${comparisonTarget?.term === term.term ? 'text-white' : 'text-foreground'}`}>{term.term.split(' (')[0]}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 右侧详情 / 对比区域 */}
        <div className="lg:col-span-9 space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTerm.term + (comparisonTarget?.term || '')}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-card border border-border rounded-[3rem] p-10 md:p-14 relative overflow-hidden shadow-2xl"
              style={{ background: `radial-gradient(circle at top right, ${atmosphereColor}, transparent)` }}
            >
              <div className="relative z-10">
                {/* 顶部标题与 DNA 图表 */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-12">
                  <div className="lg:col-span-7 space-y-10">
                    <div className="flex items-center gap-5">
                        <div className="w-2 h-12 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.6)]"></div>
                        <div>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-[0.4em]">战术解码核心模块 / CORE DECODER</span>
                            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mt-2 leading-none">
                                {compareMode && comparisonTarget ? (
                                    <div className="flex flex-col gap-3">
                                        <span className="text-blue-500">{selectedTerm.term.split(' (')[0]}</span>
                                        <span className="text-gray-400 text-xl font-black italic">VS</span>
                                        <span className="text-orange-500">{comparisonTarget.term.split(' (')[0]}</span>
                                    </div>
                                ) : selectedTerm.term}
                            </h3>
                        </div>
                    </div>
                    
                    {!compareMode && (
                      <div className="flex items-center gap-10 py-2">
                        <div className="space-y-2">
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest">学习复杂度</p>
                            <ComplexityMeter value={selectedTerm.complexity || 3} />
                        </div>
                        <div className="w-px h-10 bg-border"></div>
                        <div className="flex flex-wrap gap-3">
                            {selectedTerm.strategicFocus?.map(f => (
                                <span key={f} className="text-[10px] font-black text-blue-500 uppercase border border-blue-500/30 px-4 py-1.5 rounded-xl bg-blue-500/5">#{f}</span>
                            ))}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col gap-8">
                      <div className="space-y-6">
                        <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 leading-relaxed font-black italic border-l-6 border-blue-500/40 pl-8 py-4 bg-foreground/[0.03] rounded-r-[2rem]">
                            {selectedTerm.definition}
                        </p>
                        {selectedTerm.relatedBattleId && (
                            <button 
                              onClick={() => onNavigateToBattle?.(selectedTerm.relatedBattleId!)}
                              className="w-full max-w-md px-8 py-5 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-black uppercase tracking-[0.4em] rounded-[1.8rem] shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-5"
                            >
                              实测 {selectedTerm.term.split(' (')[0]} 战役
                              <span className="text-2xl">→</span>
                            </button>
                        )}
                      </div>

                      {compareMode && comparisonTarget && (
                        <div className="space-y-6 pt-8 border-t border-border">
                           <div className="flex items-center gap-3 mb-3">
                              <span className="px-3 py-1 bg-orange-500/10 border border-orange-500/30 text-[10px] font-black text-orange-500 uppercase tracking-widest rounded-lg">对比视角 / VIEW B</span>
                           </div>
                           <p className="text-xl md:text-2xl text-orange-500/90 leading-relaxed font-black italic border-l-6 border-orange-500/40 pl-8 py-4 bg-foreground/[0.03] rounded-r-[2rem]">
                              {comparisonTarget.definition}
                           </p>
                           {comparisonTarget.relatedBattleId && (
                              <button 
                                onClick={() => onNavigateToBattle?.(comparisonTarget.relatedBattleId!)}
                                className="w-full max-w-md px-8 py-5 bg-orange-600 hover:bg-orange-500 text-white text-[11px] font-black uppercase tracking-[0.4em] rounded-[1.8rem] shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-5"
                              >
                                实测 {comparisonTarget.term.split(' (')[0]} 战役
                                <span className="text-2xl">→</span>
                              </button>
                           )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-background/95 rounded-[3rem] p-8 border border-border relative min-h-[360px] flex items-center justify-center shadow-inner">
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.3em]">DNA TOPOLOGY ANALYTICS</div>
                    <ResponsiveContainer width="100%" height={300}>
                       <RadarChart 
                         data={radarData}
                         margin={{ top: 10, right: 60, left: 60, bottom: 10 }}
                       >
                         <PolarGrid stroke="currentColor" strokeOpacity={0.1} />
                         <PolarAngleAxis 
                           dataKey="subject" 
                           tick={{fill: 'currentColor', fontSize: 12, fontWeight: '900', opacity: 0.5}} 
                         />
                         <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                         <Radar
                           name={selectedTerm.term}
                           dataKey="A"
                           stroke="#3b82f6"
                           strokeWidth={4}
                           fill="#3b82f6"
                           fillOpacity={0.35}
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
                       </RadarChart>
                     </ResponsiveContainer>
                  </div>
                </div>

                {/* 侧并侧深度详情对比 */}
                <div className={`grid grid-cols-1 ${compareMode && comparisonTarget ? 'md:grid-cols-2' : ''} gap-16 pt-12 border-t border-border`}>
                  <DetailColumn term={selectedTerm} accentColor="#3b82f6" />
                  
                  {compareMode && comparisonTarget && (
                    <DetailColumn term={comparisonTarget} accentColor="#f97316" isSecondary />
                  )}
                </div>

                {/* 动态图解渲染（仅在非对比模式或主要视角显示） */}
                {selectedTerm.visualEffect && !compareMode && (
                  <div className="mt-20 bg-foreground/[0.02] border border-border p-10 md:p-14 rounded-[3.5rem] relative overflow-hidden flex flex-col items-center shadow-inner">
                     <div className="w-full flex justify-between items-center mb-10">
                        <span className="text-[11px] text-blue-500 font-black uppercase tracking-0.4em pl-4 border-l-4 border-blue-500">动态核心逻辑演示 / DYNAMIC SCHEMA</span>
                        <div className="flex gap-2">
                           <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                           <div className="w-2 h-2 rounded-full bg-blue-500/30"></div>
                        </div>
                     </div>
                     <TacticalVisualizer type={selectedTerm.visualEffect as any} size="large" />
                     <p className="text-[10px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-0.5em mt-8">QUANTUM ENGINE INTERACTIVE PREVIEW</p>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
