
import React, { useState, useEffect } from 'react';
import { LEARNING_PATHS } from '../constants';
import type { LearningPath, LearningModule } from '../types';
import { TrophyIcon, InfoIcon, CoachIcon } from './icons';
import { motion, AnimatePresence } from 'framer-motion';

interface LearningPathsProps {
  onNavigateToBattle: (battleId: string) => void;
  onNavigateToKnowledge: (knowledgeId: string) => void;
}

export const LearningPaths: React.FC<LearningPathsProps> = ({ onNavigateToBattle, onNavigateToKnowledge }) => {
  const [selectedPath, setSelectedPath] = useState<LearningPath>(LEARNING_PATHS[0]);
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());

  // 模拟从本地存储读取进度
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

  const getLevelLabel = (level: string) => {
    switch(level) {
      case 'Beginner': return '入门 / BEGINNER';
      case 'Intermediate': return '进阶 / INTERMEDIATE';
      case 'Advanced': return '精通 / ADVANCED';
      default: return level;
    }
  };

  const pathProgress = Math.round(
    (selectedPath.modules.filter(m => completedModules.has(m.id)).length / selectedPath.modules.length) * 100
  );

  const totalProgress = Math.round(
    (Array.from(completedModules).length / LEARNING_PATHS.reduce((acc, p) => acc + p.modules.length, 0)) * 100
  );

  return (
    <div className="flex flex-col gap-10 animate-fade-in max-w-7xl mx-auto py-4">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900/40 to-[#0a0f14] border border-blue-500/20 rounded-[2.5rem] p-12 relative overflow-hidden group shadow-2xl">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -mr-40 -mt-40"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-left flex-grow">
            <div className="flex items-center gap-3 mb-6">
               <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
               <span className="text-blue-400 font-black text-xs uppercase tracking-[0.4em]">Tactical Analyst Career Path</span>
            </div>
            <h2 className="text-5xl font-black text-white mb-6 tracking-tighter leading-tight">解锁您的战术思维</h2>
            <p className="text-xl text-gray-400 font-medium max-w-2xl leading-relaxed italic">
              “ 战术不是公式，而是对空间的理解。通过体系化的路径，从零开始构建您的足球世界观。”
            </p>
          </div>
          
          <div className="shrink-0 flex gap-6">
             <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center min-w-[140px] backdrop-blur-md relative overflow-hidden group/stat">
                <div className="absolute inset-0 bg-blue-500/5 translate-y-full group-hover/stat:translate-y-0 transition-transform duration-500"></div>
                <p className="text-4xl font-black text-white mb-1 tracking-tighter relative z-10">{LEARNING_PATHS.length}</p>
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest relative z-10">可用路径</p>
             </div>
             <div className="bg-blue-600/20 border border-blue-500/30 p-6 rounded-3xl text-center min-w-[140px] backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                <p className="text-4xl font-black text-blue-400 mb-1 tracking-tighter">{totalProgress}%</p>
                <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest">总体进度</p>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Path Selection - 4 Cols */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-8">
          <div className="flex items-center justify-between px-2">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em]">选择进阶方向</p>
            <span className="text-[10px] text-blue-500 font-bold tracking-tighter uppercase">Focus Selection</span>
          </div>
          <div className="flex flex-col gap-4">
            {LEARNING_PATHS.map((path) => {
              const pCount = path.modules.filter(m => completedModules.has(m.id)).length;
              const pPercent = Math.round((pCount / path.modules.length) * 100);
              
              return (
                <button
                  key={path.id}
                  onClick={() => setSelectedPath(path)}
                  className={`group relative text-left p-6 rounded-[2rem] border transition-all duration-500 flex flex-col gap-4 overflow-hidden ${
                    selectedPath.id === path.id
                      ? 'bg-blue-600 border-blue-400 shadow-[0_20px_50px_rgba(37,99,235,0.3)] scale-[1.02]'
                      : 'bg-white/5 border-white/5 hover:border-blue-500/30 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-3xl">{path.icon}</span>
                    <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg border uppercase tracking-tighter ${getLevelColor(path.level)}`}>
                      {getLevelLabel(path.level)}
                    </span>
                  </div>
                  <div className="relative z-10">
                    <h3 className={`text-xl font-black mb-2 tracking-tight ${selectedPath.id === path.id ? 'text-white' : 'text-gray-200 group-hover:text-blue-400'}`}>
                      {path.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-1 flex-grow bg-black/20 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-700 ${selectedPath.id === path.id ? 'bg-white/40' : 'bg-blue-500'}`} 
                          style={{ width: `${pPercent}%` }}
                        ></div>
                      </div>
                      <span className={`text-[8px] font-black ${selectedPath.id === path.id ? 'text-blue-100' : 'text-gray-600'}`}>{pPercent}%</span>
                    </div>
                    <p className={`text-xs leading-relaxed font-medium ${selectedPath.id === path.id ? 'text-blue-100' : 'text-gray-500'}`}>
                      {path.description}
                    </p>
                  </div>
                  {/* Decor */}
                  <div className={`absolute -bottom-4 -right-4 text-6xl font-black opacity-[0.03] italic pointer-events-none group-hover:scale-125 transition-transform ${selectedPath.id === path.id ? 'opacity-[0.1]' : ''}`}>
                    {path.id.slice(0, 3).toUpperCase()}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modules Timeline - 8 Cols */}
        <div className="lg:col-span-8 bg-[#0a0f14]/80 border border-white/10 rounded-[3rem] p-10 md:p-14 relative overflow-hidden shadow-inner">
           <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-[100px] -mr-40 -mt-40"></div>
           
           <div className="relative z-10">
             <AnimatePresence mode="wait">
               <motion.div
                 key={selectedPath.id}
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 transition={{ duration: 0.3 }}
               >
                 <div className="flex items-center justify-between mb-16">
                    <div>
                       <h4 className="text-3xl font-black text-white tracking-tighter mb-2">{selectedPath.title}</h4>
                       <p className="text-sm text-gray-500 font-medium">路径共包含 {selectedPath.modules.length} 个核心模块 • {selectedPath.modules.filter(m => m.type === 'Simulation').length} 个模拟实验</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                       <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest">PATH PROGRESS: {pathProgress}%</p>
                       <div className="flex gap-2">
                          {selectedPath.modules.map((m, i) => (
                             <div key={i} className={`w-3 h-1.5 rounded-full transition-all duration-500 ${completedModules.has(m.id) ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,1)]' : 'bg-gray-800'}`}></div>
                          ))}
                       </div>
                    </div>
                 </div>

                 <div className="space-y-12 relative">
                    {/* Timeline Line */}
                    <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-blue-500/20 to-transparent"></div>

                    {selectedPath.modules.map((module, idx) => {
                      const isDone = completedModules.has(module.id);
                      return (
                        <div 
                          key={module.id} 
                          className="relative pl-16 group animate-reveal-right opacity-0"
                          style={{ animationDelay: `${0.1 + idx * 0.15}s` }}
                        >
                          {/* Node */}
                          <div className={`absolute left-4 top-1.5 w-4 h-4 rounded-full bg-[#0a0f14] border-2 transition-all z-10 ${isDone ? 'border-blue-400 bg-blue-500/20 scale-125' : 'border-gray-700'}`}>
                            {isDone && <div className="absolute inset-0 flex items-center justify-center text-[8px] font-black text-blue-400">✓</div>}
                          </div>
                          
                          <div className={`bg-white/[0.03] border rounded-3xl p-8 transition-all relative overflow-hidden group/mod ${isDone ? 'border-blue-500/30 bg-blue-500/[0.02]' : 'border-white/5 hover:border-blue-500/30 hover:bg-white/[0.05]'}`}>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                              <div className="space-y-4 flex-grow">
                                 <div className="flex items-center gap-3">
                                    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border ${
                                      module.type === 'Theory' ? 'text-blue-400 border-blue-400/30 bg-blue-400/5' : 
                                      module.type === 'Simulation' ? 'text-orange-400 border-orange-400/30 bg-orange-400/5' : 
                                      'text-purple-400 border-purple-400/30 bg-purple-400/5'
                                    }`}>
                                      {module.type === 'Theory' ? '理论研究' : module.type === 'Simulation' ? '实战模拟' : '综合测验'}
                                    </span>
                                    <span className="text-[10px] text-gray-600 font-black uppercase tracking-widest">CHAPTER {idx + 1}</span>
                                    {isDone && <span className="text-[10px] text-blue-500 font-black uppercase tracking-widest italic opacity-60">COMPLETED</span>}
                                 </div>
                                 <div>
                                   <h5 className="text-2xl font-black text-white group-hover/mod:text-blue-400 transition-colors tracking-tight">{module.title}</h5>
                                   <p className="text-sm text-gray-400 leading-relaxed font-medium mt-1 pr-4">
                                     {module.description}
                                   </p>
                                 </div>
                              </div>
                              
                              <div className="shrink-0 flex flex-col gap-3">
                                {module.relatedBattleId ? (
                                  <button 
                                    onClick={() => { toggleModuleComplete(module.id); onNavigateToBattle(module.relatedBattleId!); }}
                                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
                                  >
                                    开始实验 <span className="text-lg leading-none">→</span>
                                  </button>
                                ) : module.relatedKnowledgeId ? (
                                  <button 
                                    onClick={() => { toggleModuleComplete(module.id); onNavigateToKnowledge(module.relatedKnowledgeId!); }}
                                    className="px-8 py-4 bg-white/10 hover:bg-blue-500/20 text-blue-400 text-[11px] font-black uppercase tracking-widest rounded-2xl border border-blue-500/30 transition-all transform hover:scale-105 active:scale-95"
                                  >
                                    查阅百科
                                  </button>
                                ) : (
                                  <button className="px-8 py-4 bg-white/5 text-gray-500 text-[11px] font-black uppercase tracking-widest rounded-2xl border border-white/10 cursor-not-allowed">
                                    即将解锁
                                  </button>
                                )}
                              </div>
                            </div>
                            
                            {/* Indicator for complexity or length */}
                            <div className="absolute bottom-0 right-0 p-4 opacity-5 pointer-events-none group-hover/mod:opacity-10 transition-opacity">
                               <span className="text-5xl font-black italic">MOD_{module.id}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                 </div>
               </motion.div>
             </AnimatePresence>
             
             {/* End Node */}
             <div className="mt-20 text-center relative">
                <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/5 -z-10"></div>
                <div className="inline-block p-8 bg-blue-600/10 rounded-full border border-blue-500/20 animate-pulse mb-6">
                   <TrophyIcon className="w-12 h-12 text-blue-500 opacity-60" />
                </div>
                <h6 className="text-lg font-black text-white tracking-tight uppercase">路径终点：战术导师认证</h6>
                <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em] mt-2">完成所有模块以解锁专属证书</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};
