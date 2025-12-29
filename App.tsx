
import React, { useState } from 'react';
import { TacticBoard } from './components/TacticBoard';
import { AnalysisPanel } from './components/AnalysisPanel';
import { StatsDashboard } from './components/StatsDashboard';
import { BattleSelector } from './components/BattleSelector';
import { ProjectMission } from './components/ProjectMission';
import type { PlayerPosition, Battle } from './types';
import { BATTLES } from './constants';
import { GithubIcon } from './components/icons';

const App: React.FC = () => {
  const [selectedBattle, setSelectedBattle] = useState<Battle>(BATTLES[0]);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [hoveredPlayer, setHoveredPlayer] = useState<PlayerPosition | null>(null);

  const currentPhase = selectedBattle.phases[currentPhaseIndex];

  const handlePhaseChange = (index: number) => {
    setCurrentPhaseIndex(index);
  };

  return (
    <div className="min-h-screen bg-[#0a0f14] text-gray-200 flex flex-col p-4 md:p-6 font-sans selection:bg-blue-500/30">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Soccer Tactic <span className="text-blue-500">Lab</span></h1>
            <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-widest">Graduation Project</span>
          </div>
          <p className="text-sm text-gray-400 mt-1 italic opacity-80">足球战术可视化科普系统 - 将复杂的专业战术转化为直观的可视化内容</p>
        </div>
        <div className="flex items-center gap-4">
            <BattleSelector 
                battles={BATTLES} 
                selectedId={selectedBattle.id} 
                onSelect={(battle) => {
                    setSelectedBattle(battle);
                    setCurrentPhaseIndex(0);
                }} 
            />
            <a href="#" className="text-gray-400 hover:text-white transition-all transform hover:scale-110">
                <GithubIcon className="w-6 h-6" />
            </a>
        </div>
      </header>
      
      <main className="flex-grow flex flex-col lg:grid lg:grid-cols-12 gap-8 mt-6 items-start">
        
        {/* 左侧：球场区域 - 在 lg 屏幕上固定 */}
        <div className="lg:col-span-8 flex flex-col gap-4 w-full lg:sticky lg:top-6">
            <div className="bg-gray-800/20 rounded-2xl p-4 md:p-8 border border-white/5 backdrop-blur-sm relative overflow-hidden group shadow-2xl">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-30"></div>
               <TacticBoard 
                homePlayers={currentPhase.homePlayers}
                awayPlayers={currentPhase.awayPlayers}
                passingNetwork={{ connections: currentPhase.connections }}
                hoveredPlayer={hoveredPlayer}
                onPlayerHover={setHoveredPlayer}
                homeColor={selectedBattle.teams.home.color}
                awayColor={selectedBattle.teams.away.color}
              />
            </div>

            {/* 阶段导航 */}
            <div className="bg-gray-900/40 rounded-xl p-4 border border-white/5 flex items-center justify-between gap-4">
                <div className="flex-grow flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {selectedBattle.phases.map((phase, idx) => (
                        <button
                            key={phase.id}
                            onClick={() => handlePhaseChange(idx)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                                idx === currentPhaseIndex 
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200'
                            }`}
                        >
                            {idx + 1}. {phase.title}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="hidden lg:block text-[10px] text-gray-600 uppercase font-bold tracking-widest text-center mt-2 opacity-50">
                Interactive Tactical Simulation v1.0
            </div>
        </div>

        {/* 右侧：分析与数据 - 正常随页面滚动 */}
        <aside className="lg:col-span-4 flex flex-col gap-6 w-full">
          <AnalysisPanel 
            phase={currentPhase}
            battle={selectedBattle}
            hoveredPlayer={hoveredPlayer}
          />
          <StatsDashboard 
            stats={selectedBattle.stats} 
            teamNames={{ home: selectedBattle.teams.home.name, away: selectedBattle.teams.away.name }}
            colors={{ home: selectedBattle.teams.home.color, away: selectedBattle.teams.away.color }}
            teams={selectedBattle.teams}
          />
          
          {/* 这里加入了您提供的图片中的项目内容 */}
          <ProjectMission />
          
          <footer className="mt-4 pb-8 text-center text-[10px] text-gray-600 uppercase tracking-widest border-t border-white/5 pt-6">
            <p>© 2024 Soccer Tactic Lab - Graduation Project</p>
            <p className="mt-1">Dedicated to football tactical education</p>
          </footer>
        </aside>
      </main>
    </div>
  );
};

export default App;
