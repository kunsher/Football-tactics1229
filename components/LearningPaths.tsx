
import React, { useState, useEffect } from 'react';
import { LEARNING_PATHS } from '../constants';
import type { LearningPath } from '../types';
import { TrophyIcon, InfoIcon, CoachIcon } from './icons';
import { motion, AnimatePresence } from 'framer-motion';

interface LearningPathsProps {
  onNavigateToBattle: (battleId: string) => void;
  onNavigateToKnowledge: (knowledgeId: string) => void;
}

export const LearningPaths: React.FC<LearningPathsProps> = ({ onNavigateToBattle, onNavigateToKnowledge }) => {
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(LEARNING_PATHS[0] || null);
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());

  // 模拟进度读取
  useEffect(() => {
    const saved = localStorage.getItem('tactical_completed_modules');
    if (saved) setCompletedModules(new Set(JSON.parse(saved)));
  }, []);

  const toggleModuleComplete = (id: string) => {
    const next = new Set(completedModules);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setCompletedModules(next);
    localStorage.setItem('tactical_completed_modules', JSON.stringify(Array.from(next)));
  };

  const getLevelColor = (level: string) => {
    switch(level) {
      case 'Beginner': return 'text-green-400 border-green-400/30 bg-green-400/10';
      case 'Intermediate': return 'text-blue-400 border-blue-400/30 bg-blue-400/10';
      case 'Advanced': return 'text-purple-400 border-purple-400/30 bg-purple-400/10';
      default: return 'text-gray-400 border-gray-400/30 bg-gray-400/10';
    }
  };

  const pathProgress = selectedPath ? Math.round(
    (selectedPath.modules.filter(m => completedModules.has(m.id)).length / selectedPath.modules.length) * 100
  ) : 0;

  const totalProgress = Math.round(
    (Array.from(completedModules).length / (LEARNING_PATHS.reduce((acc, p) => acc + p.modules.length, 0) || 1)) * 100
  );

  if (!selectedPath) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 font-black uppercase tracking-widest">
        正在载入战术学院课程...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 animate-fade-in max-w-7xl mx-auto py-4">
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 dark:from-[#0a1118] dark:to-[#05080b] border border-blue-500/20 rounded-[2rem] p-10 relative overflow-hidden group shadow-2xl">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -mr-40 -mt-40"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="text-left flex-grow">
            <div className="flex items-center gap-3 mb-5">
               <div className="w-1 h-5 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
               <span className="text-blue-400 font-mono text-[10px] uppercase tracking-[0.4em]">CAREER_PATH_V2</span>
            </div>
            <h2 className="text-4xl font-black text-white mb-4 tracking-tighter leading-tight">战术学院：通向职业之路</h2>
            <p className="text-lg text-slate-300 dark:text-gray-400 font-medium max-w-2xl leading-relaxed italic opacity-80">
              “ 足球不仅是 90 分钟的比赛，它是数学、几何与心理学的交织。从零开始构建您的专业分析思维。”
            </p>
          </div>
          
          <div className="shrink-0 flex gap-4">
             <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center min-w-[120px] backdrop-blur-md">
                <p className="text-3xl font-black text-white mb-1 tracking-tighter">{LEARNING_PATHS.length}</p>
                <p className="text-[9px] text-slate-400 dark:text-gray-500 font-mono uppercase tracking-widest">COURSES</p>
             </div>
             <div className="bg-blue-600/20 border border-blue-500/30 p-5 rounded-2xl text-center min-w-[120px] backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                <p className="text-3xl font-black text-blue-400 mb-1 tracking-tighter">{totalProgress}%</p>
                <p className="text-[9px] text-blue-400 font-mono uppercase tracking-widest">PROGRESS</p>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-8">
          <div className="flex items-center justify-between px-2">
            <p className="text-[9px] text-slate-400 dark:text-gray-500 font-mono uppercase tracking-[0.3em]">课程中心 / COURSE_SELECTOR</p>
          </div>
          <div className="flex flex-col gap-3">
            {LEARNING_PATHS.map((path) => {
              const pCount = path.modules.filter(m => completedModules.has(m.id)).length;
              const pPercent = Math.round((pCount / path.modules.length) * 100);
              
              return (
                <button
                  key={path.id}
                  onClick={() => setSelectedPath(path)}
                  className={`group relative text-left p-5 rounded-2xl border transition-all duration-500 flex flex-col gap-3 overflow-hidden ${
                    selectedPath.id === path.id
                      ? 'bg-blue-600 border-blue-500 shadow-lg scale-[1.02]'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-2xl">{path.icon}</span>
                    <span className={`text-[8px] font-mono px-2 py-0.5 rounded border uppercase tracking-tighter ${getLevelColor(path.level)}`}>
                      {path.level}
                    </span>
                  </div>
                  <div className="relative z-10">
                    <h3 className={`text-lg font-black mb-1 tracking-tight ${selectedPath.id === path.id ? 'text-white' : 'text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400'}`}>
                      {path.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="h-1 flex-grow bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-700 ${selectedPath.id === path.id ? 'bg-white/40' : 'bg-blue-600'}`} 
                          style={{ width: `${pPercent}%` }}
                        ></div>
                      </div>
                      <span className={`text-[8px] font-mono ${selectedPath.id === path.id ? 'text-blue-100' : 'text-slate-400 dark:text-slate-600'}`}>{pPercent}%</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-8 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 md:p-12 relative overflow-hidden shadow-xl backdrop-blur-md">
           <div className="relative z-10">
             <AnimatePresence mode="wait">
               <motion.div
                 key={selectedPath.id}
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
               >
                 <div className="flex items-center justify-between mb-12">
                    <div>
                       <h4 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter mb-1">{selectedPath.title}</h4>
                       <p className="text-xs text-slate-500 dark:text-gray-500 font-medium">{selectedPath.description}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[9px] text-blue-600 dark:text-blue-400 font-mono uppercase tracking-widest">PATH_PROGRESS</p>
                       <p className="text-2xl font-black text-slate-900 dark:text-white">{pathProgress}%</p>
                    </div>
                 </div>

                 <div className="space-y-10 relative">
                    <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/30 via-blue-500/5 to-transparent"></div>

                    {selectedPath.modules.map((module, idx) => {
                      const isDone = completedModules.has(module.id);
                      return (
                        <div key={module.id} className="relative pl-16 group">
                          <div className={`absolute left-4.5 top-1.5 w-3 h-3 rounded-full bg-white dark:bg-slate-900 border-2 transition-all z-10 ${isDone ? 'border-blue-500 bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]' : 'border-slate-300 dark:border-slate-700'}`}></div>
                          
                          <div className={`bg-slate-50 dark:bg-slate-900/50 border rounded-2xl p-6 transition-all group/mod ${isDone ? 'border-blue-500/20' : 'border-slate-200 dark:border-slate-800 hover:border-blue-400'}`}>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                              <div className="space-y-3 flex-grow">
                                 <div className="flex items-center gap-3">
                                    <span className={`text-[8px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border ${
                                      module.type === 'Theory' ? 'text-blue-600 dark:text-blue-400 border-blue-500/20 bg-blue-500/5' : 'text-orange-600 dark:text-orange-400 border-orange-500/20 bg-orange-500/5'
                                    }`}>
                                      {module.type === 'Theory' ? '理论研究' : '实战模拟'}
                                    </span>
                                    <span className="text-[9px] text-slate-400 dark:text-gray-600 font-mono uppercase tracking-widest italic">MOD_{idx + 1}</span>
                                 </div>
                                 <div>
                                   <h5 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">{module.title}</h5>
                                   <p className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed font-medium mt-1">
                                     {module.description}
                                   </p>
                                 </div>
                              </div>
                              
                              <div className="shrink-0 flex flex-col gap-3">
                                {module.relatedBattleId ? (
                                  <button 
                                    onClick={() => { toggleModuleComplete(module.id); onNavigateToBattle(module.relatedBattleId!); }}
                                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-md transition-all"
                                  >
                                    去复盘实测 →
                                  </button>
                                ) : module.relatedKnowledgeId ? (
                                  <button 
                                    onClick={() => { toggleModuleComplete(module.id); onNavigateToKnowledge(module.relatedKnowledgeId!); }}
                                    className="px-6 py-2.5 bg-white dark:bg-slate-800 hover:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-xl border border-blue-500/20 transition-all"
                                  >
                                    查阅百科基因
                                  </button>
                                ) : (
                                  <button 
                                    onClick={() => toggleModuleComplete(module.id)}
                                    className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isDone ? 'bg-green-600/10 text-green-600 dark:text-green-400 border border-green-500/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-gray-400 hover:border-blue-400 border border-slate-200 dark:border-slate-700'}`}
                                  >
                                    {isDone ? '已完成学习' : '标记已读'}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                 </div>
               </motion.div>
             </AnimatePresence>
             
             <div className="mt-20 text-center">
                <div className="inline-block p-8 bg-blue-600/5 rounded-full border border-blue-500/10 mb-6">
                   <TrophyIcon className="w-12 h-12 text-blue-500 opacity-40" />
                </div>
                <h6 className="text-lg font-black text-foreground tracking-tight uppercase">路径终点：战术导师认证</h6>
                <p className="text-[10px] text-slate-500 dark:text-gray-600 font-black uppercase tracking-[0.4em] mt-2">完成所有模块以解锁专属证书</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};
