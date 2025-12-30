
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
    if (!selectedTerm.radarProfile) return [];
    if (!compareMode || !comparisonTarget || !comparisonTarget.radarProfile) return selectedTerm.radarProfile;
    
    return selectedTerm.radarProfile.map((point, i) => ({
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
              compareMode ? 'bg-orange-600 border-orange-400 text-white' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            {compareMode ? '取消对比' : '对比模式'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 space-y-4 max-h-[70vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10">
          {filteredTerms.length > 0 ? (
            filteredTerms.map((term) => (
              <button
                key={term.term}
                disabled={compareMode && comparisonTarget?.term === term.term}
                onClick={() => setSelectedTerm(term)}
                className={`w-full text-left p-5 rounded-2xl border transition-all flex items-center gap-4 group relative overflow-hidden ${
                  selectedTerm.term === term.term
                    ? 'bg-blue-600 border-blue-400 shadow-xl shadow-blue-600/30'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-500/30'
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
                    CATEGORY: {term.category}
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
              <p className="text-[10px] text-orange-500 font-black uppercase tracking-[0.3em] pl-1">对比目标选择</p>
              {filteredTerms.filter(t => t.term !== selectedTerm.term).slice(0, 3).map((term) => (
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
          <div className="bg-[#0a0f14] border border-white/10 rounded-[3rem] p-10 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] -mr-40 -mt-40"></div>
            
            <div className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,1)]"></div>
                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.4em]">实战逻辑解析 / {selectedTerm.category}</span>
                  </div>
                  <h3 className="text-4xl font-black text-white tracking-tighter">
                    {compareMode && comparisonTarget ? `${selectedTerm.term} VS ${comparisonTarget.term}` : selectedTerm.term}
                  </h3>
                  <p className="text-lg text-gray-300 leading-relaxed font-medium italic border-l-2 border-blue-500/30 pl-6">
                    {selectedTerm.definition}
                  </p>
                  
                  {/* Animation Preview */}
                  {selectedTerm.visualEffect && !compareMode && (
                    <div className="mt-8">
                       <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest mb-4">动态战术演示 / VISUAL PREVIEW</p>
                       {/* Unnecessary 'as any' removed as visualEffect is now part of the narrowed union. */}
                       <TacticalVisualizer type={selectedTerm.visualEffect} size="large" />
                    </div>
                  )}

                  {compareMode && comparisonTarget && (
                    <div className="space-y-4 mt-8 animate-fade-in">
                        <div className="p-6 bg-orange-600/10 border border-orange-500/20 rounded-3xl">
                           <p className="text-xs text-orange-400 font-black mb-2 uppercase tracking-widest">对比洞察 / INSIGHT</p>
                           <p className="text-sm text-gray-400 leading-relaxed italic">
                             通过多维雷达图对比分析，{selectedTerm.term} 在核心指标上与 {comparisonTarget.term} 表现出明显的差异化分布。
                           </p>
                        </div>
                        {comparisonTarget.visualEffect && (
                           <div className="p-4 bg-white/5 border border-white/10 rounded-3xl">
                             <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-2">对比项动态演示 / {comparisonTarget.term}</p>
                             {/* Unnecessary 'as any' removed as visualEffect is now part of the narrowed union. */}
                             <TacticalVisualizer type={comparisonTarget.visualEffect} size="small" />
                           </div>
                        )}
                    </div>
                  )}
                </div>

                <div className="space-y-8">
                   <div className="bg-white/[0.03] rounded-[3rem] p-8 border border-white/5 aspect-square relative group">
                      <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <ResponsiveContainer width="100%" height="100%">
                         <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                           <PolarGrid stroke="rgba(255,255,255,0.08)" />
                           <PolarAngleAxis dataKey="subject" tick={{fill: '#64748b', fontSize: 11, fontWeight: '900'}} />
                           <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                           <Radar
                             name={selectedTerm.term}
                             dataKey="A"
                             stroke="#3b82f6"
                             strokeWidth={3}
                             fill="#3b82f6"
                             fillOpacity={0.4}
                           />
                           {compareMode && comparisonTarget && (
                             <Radar
                               name={comparisonTarget.term}
                               dataKey="B"
                               stroke="#f97316"
                               strokeWidth={2}
                               fill="#f97316"
                               fillOpacity={0.2}
                             />
                           )}
                           <Tooltip content={<CustomRadarTooltip />} cursor={false} />
                           {compareMode && <Legend verticalAlign="bottom" wrapperStyle={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', paddingTop: '10px' }} />}
                         </RadarChart>
                       </ResponsiveContainer>
                   </div>
                   
                   {selectedTerm.relatedBattleId && !compareMode && (
                    <button 
                      onClick={() => onNavigateToBattle?.(selectedTerm.relatedBattleId!)}
                      className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-lg transition-all transform hover:scale-105"
                    >
                      加载关联战役同步复盘 →
                    </button>
                  )}
                </div>
              </div>

              {/* Extra Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10 border-t border-white/5">
                <div className="space-y-8">
                  {selectedTerm.historicalContext && (
                    <div className="space-y-4">
                      <h4 className="text-[11px] text-blue-500 font-black uppercase tracking-widest flex items-center gap-2">
                         <div className="w-1.5 h-4 bg-blue-500 rounded-full"></div> 战术源起与演化
                      </h4>
                      <p className="text-sm text-gray-400 leading-relaxed font-medium">
                         {selectedTerm.historicalContext}
                      </p>
                    </div>
                  )}

                  {selectedTerm.keyTraits && (
                    <div className="space-y-4">
                      <h4 className="text-[11px] text-blue-500 font-black uppercase tracking-widest">核心技术特征 / KEY TRAITS</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedTerm.keyTraits.map(trait => (
                          <span key={trait} className="px-3 py-1.5 bg-blue-600/10 border border-blue-500/20 rounded-xl text-[10px] text-blue-400 font-black tracking-tight">
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-8">
                  {selectedTerm.famousTeams && (
                    <div className="space-y-4">
                      <h4 className="text-[11px] text-gray-500 font-black uppercase tracking-widest flex items-center gap-2">
                         <CoachIcon className="w-4 h-4" /> 经典实战样板 / ICONIC EXAMPLES
                      </h4>
                      <div className="space-y-3">
                        {selectedTerm.famousTeams.map(team => (
                          <div key={team} className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-between group hover:bg-white/5 transition-all">
                            <span className="text-sm font-bold text-gray-200 group-hover:text-blue-400">{team}</span>
                            <span className="text-[9px] text-gray-600 font-black uppercase opacity-0 group-hover:opacity-100">MATCH DECODED</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="p-6 bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/20 rounded-3xl relative group overflow-hidden">
                     <div className="absolute top-0 right-0 p-4 text-6xl font-black text-white/[0.02] italic tracking-tighter">MASTER</div>
                     <p className="text-base text-blue-100/80 font-medium italic leading-relaxed relative z-10">
                        “ 足球战术的迷人之处不在于规则的死守，而在于对规则的动态偏移。掌握 {selectedTerm.term} 意味着你开始理解空间的生命力。”
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
