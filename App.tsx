
import React, { useState } from 'react';
import { TacticBoard } from './components/TacticBoard';
import { AnalysisPanel } from './components/AnalysisPanel';
import { StatsDashboard } from './components/StatsDashboard';
import { BattleSelector } from './components/BattleSelector';
import { ProjectMission } from './components/ProjectMission';
import { TacticalKnowledgeBase } from './components/TacticalKnowledgeBase';
import { PlayerModal } from './components/PlayerModal';
import { UserSpaceModal } from './components/UserSpaceModal';
import type { PlayerPosition, Battle, UserProfile } from './types';
import { BATTLES } from './constants';
import { GithubIcon, UserIcon } from './components/icons';

type ActiveTab = 'simulation' | 'knowledge' | 'about';

// Mock User Data
const MOCK_USER: UserProfile = {
    name: '分析师零号',
    rank: '高级战术研究员',
    avatar: '',
    tacticsMastered: 12,
    battlesAnalyzed: 45,
    learningProgress: 75,
    joinDate: '2023-10-12'
};

const App: React.FC = () => {
  const [selectedBattle, setSelectedBattle] = useState<Battle>(BATTLES[0]);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [hoveredPlayer, setHoveredPlayer] = useState<PlayerPosition | null>(null);
  const [selectedPlayerForModal, setSelectedPlayerForModal] = useState<PlayerPosition | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('simulation');
  const [animationSpeed, setAnimationSpeed] = useState(1.0);

  const currentPhase = selectedBattle.phases[currentPhaseIndex];

  const handlePhaseChange = (index: number) => {
    setCurrentPhaseIndex(index);
  };

  const handleNavigateToBattle = (battleId: string) => {
    const battle = BATTLES.find(b => b.id === battleId);
    if (battle) {
      setSelectedBattle(battle);
      setCurrentPhaseIndex(0);
      setActiveTab('simulation');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f14] text-gray-200 flex flex-col p-4 md:p-6 font-sans selection:bg-blue-500/30">
      {/* 球员球探报告模态框 */}
      {selectedPlayerForModal && (
        <PlayerModal 
          player={selectedPlayerForModal} 
          onClose={() => setSelectedPlayerForModal(null)} 
        />
      )}

      {/* 个人战术空间模态框 */}
      {isUserModalOpen && (
          <UserSpaceModal 
            user={MOCK_USER} 
            onClose={() => setIsUserModalOpen(false)} 
          />
      )}

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-white/10 gap-4">
        <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Soccer Tactic <span className="text-blue-500">Lab</span></h1>
                <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-widest">版本 v1.2</span>
              </div>
              <p className="text-sm text-gray-400 mt-1 italic opacity-80">足球战术实验室 - 将复杂的专业战术转化为直观的可视化内容</p>
            </div>
        </div>

        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
            <nav className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                {[
                    { id: 'simulation', label: '实战模拟' },
                    { id: 'knowledge', label: '战术百科' },
                    { id: 'about', label: '关于项目' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as ActiveTab)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            activeTab === tab.id 
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>
            
            <div className="flex items-center gap-4">
                <BattleSelector 
                    battles={BATTLES} 
                    selectedId={selectedBattle.id} 
                    onSelect={(battle) => {
                        setSelectedBattle(battle);
                        setCurrentPhaseIndex(0);
                    }} 
                />
                
                {/* 个人空间触发器 */}
                <button 
                    onClick={() => setIsUserModalOpen(true)}
                    className="flex items-center gap-3 bg-white/5 hover:bg-white/10 p-1.5 pr-4 rounded-full border border-white/10 transition-all group"
                >
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center border-2 border-blue-400/50 shadow-[0_0_10px_rgba(59,130,246,0.5)] group-hover:scale-110 transition-transform">
                        <UserIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="hidden md:block text-left">
                        <p className="text-[10px] font-black text-white uppercase tracking-tighter leading-none">{MOCK_USER.name}</p>
                        <p className="text-[8px] font-bold text-blue-500 uppercase tracking-widest mt-1">高级分析师</p>
                    </div>
                </button>
            </div>
        </div>
      </header>
      
      <main className="flex-grow flex flex-col lg:grid lg:grid-cols-12 gap-8 mt-6 items-start">
        
        {/* 内容区域 */}
        <div className={`${activeTab === 'knowledge' ? 'lg:col-span-12' : 'lg:col-span-8'} flex flex-col gap-4 w-full lg:sticky lg:top-6 transition-all duration-500`}>
            {activeTab !== 'knowledge' ? (
                <>
                    <div className="bg-gray-800/20 rounded-2xl p-4 md:p-8 border border-white/5 backdrop-blur-sm relative overflow-hidden group shadow-2xl">
                       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-30"></div>
                       <TacticBoard 
                        homePlayers={currentPhase.homePlayers}
                        awayPlayers={currentPhase.awayPlayers}
                        passingNetwork={{ connections: currentPhase.connections }}
                        hoveredPlayer={hoveredPlayer}
                        onPlayerHover={setHoveredPlayer}
                        onPlayerClick={setSelectedPlayerForModal}
                        homeColor={selectedBattle.teams.home.color}
                        awayColor={selectedBattle.teams.away.color}
                        animationSpeed={animationSpeed}
                      />
                    </div>

                    {activeTab === 'simulation' && (
                        <div className="bg-gray-900/40 rounded-xl p-4 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 animate-fade-in">
                            <div className="flex-grow flex gap-2 overflow-x-auto pb-1 scrollbar-hide w-full md:w-auto">
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
                            
                            <div className="flex items-center gap-1 bg-black/40 p-1.5 rounded-xl border border-white/10 self-end md:self-auto shrink-0">
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-2">动画倍速</span>
                                {[0.5, 1.0, 1.5, 2.0].map((speed) => (
                                    <button
                                        key={speed}
                                        onClick={() => setAnimationSpeed(speed)}
                                        className={`w-10 py-1 rounded-lg text-[10px] font-black transition-all ${
                                            animationSpeed === speed 
                                            ? 'bg-blue-500 text-white' 
                                            : 'text-gray-500 hover:text-white hover:bg-white/5'
                                        }`}
                                    >
                                        {speed.toFixed(1)}x
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="w-full">
                    <TacticalKnowledgeBase onNavigateToBattle={handleNavigateToBattle} />
                </div>
            )}
        </div>

        {/* 右侧侧边栏 */}
        {activeTab !== 'knowledge' && (
            <aside className="lg:col-span-4 flex flex-col gap-6 w-full animate-fade-in">
              {activeTab === 'simulation' && (
                <div className="space-y-6">
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
                        radarData={selectedBattle.radarData}
                    />
                </div>
              )}

              {activeTab === 'about' && (
                <div className="animate-fade-in">
                    <ProjectMission />
                </div>
              )}
            </aside>
        )}
      </main>
      
      <footer className="mt-12 pb-12 text-center text-[10px] text-gray-600 uppercase tracking-widest border-t border-white/5 pt-8 w-full">
        <p>© 2024 足球战术实验室 - 战术智能平台</p>
        <p className="mt-1">致力于足球战术的可视化与教育</p>
      </footer>
    </div>
  );
};

export default App;
