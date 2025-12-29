
import React, { useState, useEffect, useRef } from 'react';
import { TacticBoard } from './components/TacticBoard';
import { AnalysisPanel } from './components/AnalysisPanel';
import { StatsDashboard } from './components/StatsDashboard';
import { BattleSelector } from './components/BattleSelector';
import { ProjectMission } from './components/ProjectMission';
import { TacticalKnowledgeBase } from './components/TacticalKnowledgeBase';
import { PlayerModal } from './components/PlayerModal';
import { UserSpaceModal } from './components/UserSpaceModal';
import { DailyChallenge } from './components/DailyChallenge';
import { TacticalSandbox } from './components/TacticalSandbox';
import type { PlayerPosition, Battle, UserProfile } from './types';
import { BATTLES } from './constants';
import { UserIcon } from './components/icons';

type ActiveTab = 'simulation' | 'knowledge' | 'sandbox' | 'about';

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
  const [isLoaded, setIsLoaded] = useState(false);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const playbackTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      const stepDuration = 3200 / animationSpeed; 
      playbackTimerRef.current = window.setInterval(() => {
        setCurrentPhaseIndex((prev) => {
          if (prev >= selectedBattle.phases.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, stepDuration);
    } else {
      if (playbackTimerRef.current) clearInterval(playbackTimerRef.current);
    }
    return () => {
      if (playbackTimerRef.current) clearInterval(playbackTimerRef.current);
    };
  }, [isPlaying, selectedBattle.phases.length, animationSpeed]);

  const currentPhase = selectedBattle.phases[currentPhaseIndex];

  const handlePhaseChange = (index: number) => {
    setIsPlaying(false);
    setCurrentPhaseIndex(index);
  };

  const togglePlayback = () => {
    if (currentPhaseIndex >= selectedBattle.phases.length - 1) {
        setCurrentPhaseIndex(0);
    }
    setIsPlaying(!isPlaying);
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
    <div className={`min-h-screen bg-[#0a0f14] text-gray-200 flex flex-col p-4 md:p-6 font-sans selection:bg-blue-500/30 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {selectedPlayerForModal && (
        <PlayerModal 
          player={selectedPlayerForModal} 
          onClose={() => setSelectedPlayerForModal(null)} 
        />
      )}

      {isUserModalOpen && (
          <UserSpaceModal 
            user={MOCK_USER} 
            onClose={() => setIsUserModalOpen(false)} 
          />
      )}

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-white/10 gap-4">
        <div className="flex items-center gap-4">
            <div className="animate-fade-in">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Soccer Tactic <span className="text-blue-500">Lab</span></h1>
                <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-widest">v1.3 PRO</span>
              </div>
              <p className="text-sm text-gray-400 mt-1 italic opacity-80">战术转译、模拟与创作一站式平台</p>
            </div>
        </div>

        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end animate-fade-in">
            <nav className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                {[
                    { id: 'simulation', label: '实战复盘' },
                    { id: 'sandbox', label: '战术沙盒' },
                    { id: 'knowledge', label: '战术百科' },
                    { id: 'about', label: '关于' }
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
                {activeTab === 'simulation' && (
                    <BattleSelector 
                        battles={BATTLES} 
                        selectedId={selectedBattle.id} 
                        onSelect={(battle) => {
                            setSelectedBattle(battle);
                            setCurrentPhaseIndex(0);
                            setIsPlaying(false);
                        }} 
                    />
                )}
                
                <button 
                    onClick={() => setIsUserModalOpen(true)}
                    className="flex items-center gap-3 bg-white/5 hover:bg-blue-600/10 p-1.5 pr-4 rounded-full border border-white/10 hover:border-blue-500/30 transition-all group relative"
                >
                    <div className="relative">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-700 to-blue-400 flex items-center justify-center border-2 border-white/10 shadow-lg group-hover:scale-105 transition-transform overflow-hidden">
                            <UserIcon className="w-5 h-5 text-white drop-shadow-md" />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/20 to-transparent h-1/2 w-full animate-[scan_2s_linear_infinite] opacity-0 group-hover:opacity-100"></div>
                        </div>
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0a0f14] rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                    </div>
                    <div className="hidden md:block text-left">
                        <p className="text-[10px] font-black text-white uppercase tracking-tight leading-none group-hover:text-blue-400 transition-colors">{MOCK_USER.name}</p>
                        <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-1">{MOCK_USER.rank}</p>
                    </div>
                </button>
            </div>
        </div>
      </header>
      
      <main className="flex-grow flex flex-col lg:grid lg:grid-cols-12 gap-8 mt-6 items-start">
        <div className={`${(activeTab === 'knowledge' || activeTab === 'sandbox') ? 'lg:col-span-12' : 'lg:col-span-8 lg:sticky lg:top-6 self-start'} flex flex-col gap-4 w-full transition-all duration-700`}>
            {activeTab === 'simulation' && (
                <>
                    <div className="bg-gray-800/20 rounded-2xl p-4 md:p-8 border border-white/5 backdrop-blur-sm relative overflow-hidden group shadow-2xl animate-fade-in">
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
                        isPlaying={isPlaying}
                      />
                      
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-1/3 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10 backdrop-blur-md">
                         <div 
                            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-500 ease-out" 
                            style={{ width: `${((currentPhaseIndex + 1) / selectedBattle.phases.length) * 100}%` }}
                         ></div>
                      </div>
                    </div>

                    <div className="bg-gray-900/40 rounded-xl p-4 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 animate-fade-in">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <button 
                                onClick={togglePlayback}
                                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                                    isPlaying ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]'
                                } group relative overflow-hidden`}
                                title={isPlaying ? "暂停" : "播放进攻全过程"}
                            >
                                <div className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"></div>
                                {isPlaying ? (
                                    <svg className="w-7 h-7 relative z-10" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                                ) : (
                                    <svg className="w-7 h-7 ml-1 relative z-10" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                )}
                            </button>
                            
                            <div className="flex-grow flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                                {selectedBattle.phases.map((phase, idx) => (
                                    <button
                                        key={phase.id}
                                        onClick={() => handlePhaseChange(idx)}
                                        className={`px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                                            idx === currentPhaseIndex 
                                            ? 'bg-blue-600 text-white shadow-lg' 
                                            : 'bg-white/5 text-gray-500 hover:bg-white/10 hover:text-gray-300'
                                        }`}
                                    >
                                        {phase.title.includes('：') ? phase.title.split('：')[0] : phase.title}
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-1 bg-black/40 p-2 rounded-xl border border-white/10 self-end md:self-auto shrink-0">
                            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest px-2">速度调节</span>
                            {[0.25, 0.5, 1.0, 1.5, 2.0].map((speed) => (
                                <button
                                    key={speed}
                                    onClick={() => setAnimationSpeed(speed)}
                                    className={`w-12 py-1.5 rounded-lg text-[10px] font-black transition-all ${
                                        animationSpeed === speed 
                                        ? 'bg-blue-500 text-white' 
                                        : 'text-gray-600 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    {speed % 1 === 0 ? speed.toFixed(1) : speed}x
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'sandbox' && <TacticalSandbox />}
            {activeTab === 'knowledge' && <TacticalKnowledgeBase onNavigateToBattle={handleNavigateToBattle} />}
            {activeTab === 'about' && <ProjectMission />}
        </div>

        {activeTab === 'simulation' && (
            <aside className="lg:col-span-4 flex flex-col gap-6 w-full animate-fade-in">
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
                <DailyChallenge />
            </aside>
        )}
      </main>
      
      <footer className="mt-12 pb-12 text-center text-[10px] text-gray-600 uppercase tracking-widest border-t border-white/5 pt-8 w-full">
        <p>© 2024 足球战术实验室 - 专业战术复盘与教育平台</p>
      </footer>
    </div>
  );
};

export default App;
