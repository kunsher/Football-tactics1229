
import React, { useState } from 'react';
import { LEARNING_PATHS } from '../constants';
import type { LearningPath, LearningModule } from '../types';
import { TrophyIcon, InfoIcon, CoachIcon } from './icons';

interface LearningPathsProps {
  onNavigateToBattle: (battleId: string) => void;
  onNavigateToKnowledge: (knowledgeId: string) => void;
}

export const LearningPaths: React.FC<LearningPathsProps> = ({ onNavigateToBattle, onNavigateToKnowledge }) => {
  const [selectedPath, setSelectedPath] = useState<LearningPath>(LEARNING_PATHS[0]);

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
             <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center min-w-[140px] backdrop-blur-md">
                <p className="text-4xl font-black text-white mb-1 tracking-tighter">3</p>
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">可用路径</p>
             </div>
             <div className="bg-blue-600/20 border border-blue-500/30 p-6 rounded-3xl text-center min-w-[140px] backdrop-blur-md">
                <p className="text-4xl font-black text-blue-400 mb-1 tracking-tighter">0%</p>
                <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest">总体进度</p>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Path Selection - 4 Cols */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-8">
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] mb-4 pl-2">选择您的进阶方向</p>
          <div className="flex flex-col gap-4">
            {LEARNING_PATHS.map((path) => (
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
                  <p className={`text-xs leading-relaxed font-medium ${selectedPath.id === path.id ? 'text-blue-100' : 'text-gray-500'}`}>
                    {path.description}
                  </p>
                </div>
                {/* Decor */}
                <div className={`absolute -bottom-4 -right-4 text-6xl font-black opacity-[0.03] italic pointer-events-none group-hover:scale-125 transition-transform ${selectedPath.id === path.id ? 'opacity-[0.1]' : ''}`}>
                  DNA
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Modules Timeline - 8 Cols */}
        <div className="lg:col-span-8 bg-[#0a0f14]/80 border border-white/10 rounded-[3rem] p-10 md:p-14 relative overflow-hidden shadow-inner">
           <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-[100px] -mr-40 -mt-40"></div>
           
           <div className="relative z-10">
             <div className="flex items-center justify-between mb-16">
                <div>
                   <h4 className="text-2xl font-black text-white tracking-tighter mb-2">{selectedPath.title}</h4>
                   <p className="text-sm text-gray-500 font-medium">路径共包含 {selectedPath.modules.length} 个核心模块</p>
                </div>
                <div className="flex gap-2">
                   {[1,2,3].map(i => (
                      <div key={i} className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,1)]' : 'bg-gray-800'}`}></div>
                   ))}
                </div>
             </div>

             <div className="space-y-12 relative">
                {/* Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-blue-500/20 to-transparent"></div>

                {selectedPath.modules.map((module, idx) => (
                  <div 
                    key={module.id} 
                    className="relative pl-16 group animate-reveal-right opacity-0"
                    style={{ animationDelay: `${0.1 + idx * 0.15}s` }}
                  >
                    {/* Node */}
                    <div className="absolute left-4 top-1.5 w-4 h-4 rounded-full bg-[#0a0f14] border-2 border-blue-500 group-hover:scale-125 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.6)] transition-all z-10"></div>
                    
                    <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-8 hover:border-blue-500/30 transition-all hover:bg-white/[0.05] relative overflow-hidden">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-3">
                           <div className="flex items-center gap-3">
                              <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${
                                module.type === 'Theory' ? 'text-blue-400 border-blue-400/30' : 
                                module.type === 'Simulation' ? 'text-orange-400 border-orange-400/30' : 
                                'text-purple-400 border-purple-400/30'
                              }`}>
                                {module.type === 'Theory' ? '理论研究' : module.type === 'Simulation' ? '实战模拟' : '综合测验'}
                              </span>
                              <span className="text-[10px] text-gray-600 font-black uppercase">MODULE {idx + 1}</span>
                           </div>
                           <h5 className="text-xl font-black text-white group-hover:text-blue-400 transition-colors">{module.title}</h5>
                           <p className="text-sm text-gray-400 leading-relaxed font-medium italic">
                             {module.description}
                           </p>
                        </div>
                        
                        <div className="shrink-0">
                          {module.relatedBattleId ? (
                            <button 
                              onClick={() => onNavigateToBattle(module.relatedBattleId!)}
                              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-black uppercase tracking-widest rounded-xl shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
                            >
                              进入复盘 <span className="text-lg leading-none">→</span>
                            </button>
                          ) : module.relatedKnowledgeId ? (
                            <button 
                              onClick={() => onNavigateToKnowledge(module.relatedKnowledgeId!)}
                              className="px-6 py-3 bg-white/10 hover:bg-blue-500/20 text-blue-400 text-[11px] font-black uppercase tracking-widest rounded-xl border border-blue-500/30 transition-all transform hover:scale-105 active:scale-95"
                            >
                              开始研究
                            </button>
                          ) : (
                            <button className="px-6 py-3 bg-white/5 text-gray-500 text-[11px] font-black uppercase tracking-widest rounded-xl border border-white/10 cursor-not-allowed">
                              未解锁
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
             
             {/* End Node */}
             <div className="mt-16 text-center">
                <div className="inline-block p-6 bg-blue-600/10 rounded-full border border-blue-500/20 animate-pulse">
                   <TrophyIcon className="w-10 h-10 text-blue-500 opacity-50" />
                </div>
                <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em] mt-6">完成路径以获得战术导师认证</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};
