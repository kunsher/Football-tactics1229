
import React, { useState, useMemo } from 'react';
import { GLOSSARY } from '../constants';
import type { GlossaryTerm } from '../types';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
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
        className={`h-1.5 w-4 rounded-full ${i <= value ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]' : 'bg-white/10'}`}
      />
    ))}
  </div>
);

const DetailColumn: React.FC<{ term: GlossaryTerm; accentColor: string; isSecondary?: boolean }> = ({ term, accentColor, isSecondary }) => (
  <div className={`space-y-10 animate-fade-in ${isSecondary ? 'border-l border-white/5 pl-8 hidden md:block' : ''}`}>
    {isSecondary && (
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2 py-0.5 bg-orange-500/10 border border-orange-500/30 text-[9px] font-black text-orange-500 uppercase tracking-widest rounded">Comparison Target</span>
      </div>
    )}
    
    <section className="space-y-4">
      <h4 className="text-[12px] font-black uppercase tracking-[0.3em] flex items-center gap-3" style={{ color: accentColor }}>
        历史基因演化 <span className="text-[9px] text-gray-700 font-bold ml-1">/ GENE EVOLUTION</span>
      </h4>
      <p className="text-base text-gray-400 leading-relaxed font-bold italic bg-white/[0.02] p-6 rounded-2xl border border-white/5 shadow-inner">
        {term.historicalContext || '该战术体系深刻影响了教练员对空间与球权的认知。'}
      </p>
    </section>

    <section className="space-y-4">
      <h4 className="text-[12px] font-black uppercase tracking-[0.3em]" style={{ color: accentColor }}>关键技术指纹 / KEY TRAITS</h4>
      <div className="flex flex-wrap gap-2.5">
        {term.keyTraits?.map(trait => (
          <span key={trait} className="px-4 py-2 bg-white/[0.03] border rounded-xl text-[10px] font-black uppercase tracking-tight" style={{ borderColor: `${accentColor}33`, color: accentColor }}>
            {trait}
          </span>
        ))}
      </div>
    </section>

    <section className="space-y-4">
      <h4 className="text-[12px] text-gray-500 font-black uppercase tracking-[0.3em] flex items-center gap-3">
        标杆战队模型 <CoachIcon className="w-5 h-5" />
      </h4>
      <div className="grid grid-cols-1 gap-3">
        {term.famousTeams?.map((team, idx) => (
          <div key={idx} className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-between group transition-all hover:border-blue-500/40">
            <div className="flex items-center gap-4">
              <TrophyIcon className="w-4 h-4 text-blue-500" />
              <span className="text-base font-black text-gray-300 group-hover:text-white transition-colors">{team}</span>
            </div>
            <span className="text-[9px] text-gray-700 font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">MODEL_ACTIVE</span>
          </div>
        ))}
      </div>
    </section>

    <section className={`p-8 border rounded-[2rem] relative group overflow-hidden shadow-inner bg-opacity-10`} style={{ borderColor: `${accentColor}33`, backgroundColor: `${accentColor}11` }}>
      <h5 className="text-[11px] font-black uppercase tracking-[0.4em] mb-4" style={{ color: accentColor }}>利弊深度拆解 / CRITICAL DECODER</h5>
      <div className="space-y-4 relative z-10">
        <div className="flex gap-3">
          <div className="w-1 h-8 rounded-full shrink-0" style={{ backgroundColor: accentColor }}></div>
          <p className="text-xs font-bold leading-relaxed italic pr-4" style={{ color: `${accentColor}cc` }}>
            <span className="font-black mr-2 uppercase tracking-widest text-[9px]">优点:</span> 最大化球员技术特征，通过空间坐标重构创造结构性优势。
          </p>
        </div>
        <div className="flex gap-3">
          <div className="w-1 h-8 bg-gray-700 rounded-full shrink-0"></div>
          <p className="text-xs text-gray-500 font-bold leading-relaxed italic pr-4">
            <span className="text-gray-600 font-black mr-2 uppercase tracking-widest text-[9px]">风险:</span> 对球员智商与体能要求极高，高位防线身后的空档是天然风险点。
          </p>
        </div>
      </div>
    </section>
  </div>
);

export const TacticalKnowledgeBase: React.FC<TacticalKnowledgeBaseProps> = ({ onNavigateToBattle }) => {
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
    <div className="flex flex-col gap-8 animate-fade-in max-w-7xl mx-auto py-2 mb-20 px-4">
      {/* 头部筛选器与搜索 */}
      <div className="bg-[#0a0f14] border border-white/10 rounded-[2.5rem] p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/[0.02] pointer-events-none"></div>
        
        <div className="flex flex-col gap-3 relative z-10 w-full lg:w-auto">
          <h2 className="text-2xl font-black text-white tracking-tighter uppercase">
            战术智能百科 <span className="text-blue-500 font-bold ml-1 text-[10px] italic tracking-widest opacity-60">/ TACTICAL GENE DB</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-all border ${
                  activeCategory === cat 
                    ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/20' 
                    : 'bg-white/5 border-white/10 text-gray-500 hover:text-white'
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
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-10 text-[13px] text-white focus:outline-none focus:border-blue-500/40 transition-all placeholder:text-gray-700"
            />
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-30 text-xs">🔍</span>
          </div>
          <button 
            onClick={handleToggleCompare}
            className={`px-5 py-3 rounded-xl font-black uppercase tracking-widest text-[9px] transition-all flex items-center gap-2 border whitespace-nowrap ${
              compareMode ? 'bg-orange-600 border-orange-400 text-white shadow-lg' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            {compareMode ? '退出对比' : '开启双向对比'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 左侧列表 */}
        <div className="lg:col-span-3 space-y-3 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence mode="popLayout">
            {filteredTerms.map((term) => (
              <motion.button
                key={term.term}
                layout
                onClick={() => { setSelectedTerm(term); if(!compareMode) window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`w-full text-left p-4 rounded-[1.8rem] border transition-all flex flex-col gap-3 group relative overflow-hidden ${
                  selectedTerm.term === term.term
                    ? 'bg-blue-600 border-blue-400 shadow-xl scale-[1.02]'
                    : 'bg-white/5 border-white/10 hover:border-blue-500/30'
                }`}
              >
                <div className="flex items-center gap-3 relative z-20">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0 ${
                    selectedTerm.term === term.term ? 'bg-white/20' : 'bg-white/5'
                  }`}>
                    {term.icon || '📘'}
                  </div>
                  <div className="overflow-hidden">
                    <p className={`font-black text-base uppercase tracking-tighter truncate ${selectedTerm.term === term.term ? 'text-white' : 'text-gray-200'}`}>{term.term.split(' (')[0]}</p>
                    <p className={`text-[8px] font-black tracking-widest uppercase ${selectedTerm.term === term.term ? 'text-blue-200' : 'text-gray-600'}`}>
                      {term.category} • {term.complexity}阶模型
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>

          {compareMode && (
            <div className="pt-6 mt-4 border-t border-white/10 space-y-3">
              <p className="text-[9px] text-orange-500 font-black uppercase tracking-widest pl-2">选择对比源 / SOURCE B</p>
              {filteredTerms.filter(t => t.term !== selectedTerm.term).map((term) => (
                <button
                  key={`comp-${term.term}`}
                  onClick={() => setComparisonTarget(term)}
                  className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center gap-3 group ${
                    comparisonTarget?.term === term.term
                      ? 'bg-orange-600 border-orange-400 shadow-xl'
                      : 'bg-white/5 border-white/10 hover:border-orange-500/30'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0 ${
                    comparisonTarget?.term === term.term ? 'bg-white/20' : 'bg-white/5'
                  }`}>
                    {term.icon || '⚖️'}
                  </div>
                  <p className={`font-black text-sm uppercase tracking-tighter truncate ${comparisonTarget?.term === term.term ? 'text-white' : 'text-gray-200'}`}>{term.term.split(' (')[0]}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 右侧详情 / 对比区域 */}
        <div className="lg:col-span-9 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTerm.term + (comparisonTarget?.term || '')}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-[#0a0f14] border border-white/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl"
              style={{ background: `radial-gradient(circle at top right, ${atmosphereColor}, transparent)` }}
            >
              <div className="relative z-10">
                {/* 顶部标题与 DNA 图表 */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
                  <div className="lg:col-span-7 space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="w-1.5 h-10 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                        <div>
                            <span className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em]">战术解码核心模块 / CORE DECODER</span>
                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter mt-1 leading-none">
                                {compareMode && comparisonTarget ? (
                                    <div className="flex flex-col gap-2">
                                        <span className="text-blue-500">{selectedTerm.term.split(' (')[0]}</span>
                                        <span className="text-gray-700 text-lg font-black italic">VS</span>
                                        <span className="text-orange-500">{comparisonTarget.term.split(' (')[0]}</span>
                                    </div>
                                ) : selectedTerm.term}
                            </h3>
                        </div>
                    </div>
                    
                    {!compareMode && (
                      <div className="flex items-center gap-8 py-1">
                        <div className="space-y-1.5">
                            <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest">学习复杂度</p>
                            <ComplexityMeter value={selectedTerm.complexity || 3} />
                        </div>
                        <div className="w-px h-8 bg-white/10"></div>
                        <div className="flex flex-wrap gap-2">
                            {selectedTerm.strategicFocus?.map(f => (
                                <span key={f} className="text-[9px] font-black text-blue-400 uppercase border border-blue-500/30 px-3 py-1 rounded-lg bg-blue-500/5">#{f}</span>
                            ))}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col gap-6">
                      <div className="space-y-4">
                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-bold italic border-l-4 border-blue-500/40 pl-6 py-3 bg-white/[0.03] rounded-r-2xl">
                            {selectedTerm.definition}
                        </p>
                        {selectedTerm.relatedBattleId && (
                            <button 
                              onClick={() => onNavigateToBattle?.(selectedTerm.relatedBattleId!)}
                              className="w-full max-w-sm px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-2xl shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-4"
                            >
                              实测 {selectedTerm.term.split(' (')[0]} 战役
                              <span className="text-xl">→</span>
                            </button>
                        )}
                      </div>

                      {compareMode && comparisonTarget && (
                        <div className="space-y-4 pt-6 border-t border-white/5">
                           <div className="flex items-center gap-2 mb-2">
                              <span className="px-2 py-0.5 bg-orange-500/10 border border-orange-500/30 text-[9px] font-black text-orange-500 uppercase tracking-widest rounded">对比视角 / VIEW B</span>
                           </div>
                           <p className="text-lg md:text-xl text-orange-400/80 leading-relaxed font-bold italic border-l-4 border-orange-500/40 pl-6 py-3 bg-white/[0.03] rounded-r-2xl">
                              {comparisonTarget.definition}
                           </p>
                           {comparisonTarget.relatedBattleId && (
                              <button 
                                onClick={() => onNavigateToBattle?.(comparisonTarget.relatedBattleId!)}
                                className="w-full max-w-sm px-6 py-4 bg-orange-600 hover:bg-orange-500 text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-2xl shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-4"
                              >
                                实测 {comparisonTarget.term.split(' (')[0]} 战役
                                <span className="text-xl">→</span>
                              </button>
                           )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-[#05080b]/90 rounded-[2.5rem] p-6 border border-white/5 relative min-h-[320px] flex items-center justify-center shadow-inner">
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 text-[9px] font-black text-gray-700 uppercase tracking-[0.3em]">DNA TOPOLOGY ANALYTICS</div>
                    <ResponsiveContainer width="100%" height={260}>
                       <RadarChart data={radarData}>
                         <PolarGrid stroke="rgba(255,255,255,0.06)" />
                         <PolarAngleAxis dataKey="subject" tick={{fill: '#64748b', fontSize: 11, fontWeight: '900'}} />
                         <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                         <Radar
                           name={selectedTerm.term}
                           dataKey="A"
                           stroke="#3b82f6"
                           strokeWidth={3}
                           fill="#3b82f6"
                           fillOpacity={0.3}
                         />
                         {compareMode && comparisonTarget && (
                           <Radar
                             name={comparisonTarget.term}
                             dataKey="B"
                             stroke="#f97316"
                             strokeWidth={3}
                             fill="#f97316"
                             fillOpacity={0.2}
                           />
                         )}
                         <Tooltip content={<CustomRadarTooltip />} />
                       </RadarChart>
                     </ResponsiveContainer>
                  </div>
                </div>

                {/* 侧并侧深度详情对比 */}
                <div className={`grid grid-cols-1 ${compareMode && comparisonTarget ? 'md:grid-cols-2' : ''} gap-12 pt-10 border-t border-white/5`}>
                  <DetailColumn term={selectedTerm} accentColor="#3b82f6" />
                  
                  {compareMode && comparisonTarget && (
                    <DetailColumn term={comparisonTarget} accentColor="#f97316" isSecondary />
                  )}
                </div>

                {/* 动态图解渲染（仅在非对比模式或主要视角显示） */}
                {selectedTerm.visualEffect && !compareMode && (
                  <div className="mt-16 bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden flex flex-col items-center shadow-inner">
                     <div className="w-full flex justify-between items-center mb-8">
                        <span className="text-[10px] text-blue-500 font-black uppercase tracking-[0.4em] pl-3 border-l-2 border-blue-500">动态核心逻辑演示 / DYNAMIC SCHEMA</span>
                        <div className="flex gap-1.5">
                           <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                           <div className="w-1.5 h-1.5 rounded-full bg-blue-500/30"></div>
                        </div>
                     </div>
                     <TacticalVisualizer type={selectedTerm.visualEffect as any} size="large" />
                     <p className="text-[9px] text-gray-700 font-black uppercase tracking-[0.5em] mt-6">QUANTUM ENGINE INTERACTIVE PREVIEW</p>
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
