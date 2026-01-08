
import React, { useState, useEffect, useRef } from 'react';
import { TacticBoard } from './components/TacticBoard';
import { AnalysisPanel } from './components/AnalysisPanel';
import { StatsDashboard } from './components/StatsDashboard';
import { BattleSelector } from './components/BattleSelector';
import { ProjectMission } from './components/ProjectMission';
import { TacticalKnowledgeBase } from './components/TacticalKnowledgeBase';
import { LearningPaths } from './components/LearningPaths';
import { PlayerModal } from './components/PlayerModal';
import { UserSpaceModal } from './components/UserSpaceModal';
import { LoginModal } from './components/LoginModal';
import { DailyChallenge } from './components/DailyChallenge';
import { TacticalSandbox } from './components/TacticalSandbox';
import { TutorialOverlay } from './components/TutorialOverlay';
import type { PlayerPosition, Battle, UserProfile } from './types';
import { UserIcon } from './components/icons';
import { mockApi } from './services/mockApi';

type ActiveTab = 'simulation' | 'knowledge' | 'sandbox' | 'learning-paths' | 'about';

const App: React.FC = () => {
  const [battles, setBattles] = useState<Battle[]>([]);
  const [selectedBattle, setSelectedBattle] = useState<Battle | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [hoveredPlayer, setHoveredPlayer] = useState<PlayerPosition | null>(null);
  const [selectedPlayerForModal, setSelectedPlayerForModal] = useState<PlayerPosition | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('simulation');
  const [animationSpeed, setAnimationSpeed] = useState(1.0);
  
  const [homeColor, setHomeColor] = useState('#ffffff');
  const [awayColor, setAwayColor] = useState('#000000');
  const [showZones, setShowZones] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const playbackTimerRef = useRef<number | null>(null);

  // 教程状态
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const initApp = async () => {
        try {
            const [fetchedBattles, fetchedUser] = await Promise.all([
                mockApi.fetchBattles(),
                mockApi.fetchUserProfile()
            ]);
            setBattles(fetchedBattles);
            setSelectedBattle(fetchedBattles[0]);
            setUser(fetchedUser);
            setHomeColor(fetchedBattles[0].teams.home.color);
            setAwayColor(fetchedBattles[0].teams.away.color);

            // 检查是否是第一次访问
            const hasSeenTutorial = localStorage.getItem('has_seen_tutorial_v2');
            if (!hasSeenTutorial) {
                setShowTutorial(true);
            }
        } catch (e) {
            console.error("Failed to connect to tactical server");
        } finally {
            setIsInitialLoading(false);
        }
    };
    initApp();
  }, []);

  useEffect(() => {
    if (selectedBattle) {
        setHomeColor(selectedBattle.teams.home.color);
        setAwayColor(selectedBattle.teams.away.color);
    }
  }, [selectedBattle]);

  useEffect(() => {
    if (isPlaying && selectedBattle) {
      const stepDuration = 3200 / animationSpeed; 
      playbackTimerRef.current = window.setInterval(() => {
        setCurrentPhaseIndex((prev) => {
          if (prev >= selectedBattle.phases.length - 1) {
            setIsPlaying(false);
            mockApi.updateUserProgress(selectedBattle.id).then(newProfile => {
                if (newProfile) setUser(newProfile);
            });
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
  }, [isPlaying, selectedBattle?.phases.length, animationSpeed]);

  const handleNavigateToBattle = (battleId: string) => {
    const battle = battles.find(b => b.id === battleId);
    if (battle) {
      setSelectedBattle(battle);
      setCurrentPhaseIndex(0);
      setActiveTab('simulation');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavigateToKnowledge = (knowledgeId: string) => {
    setActiveTab('knowledge');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (loggedInUser: UserProfile) => {
    setUser(loggedInUser);
    setIsLoginModalOpen(false);
  };

  const handleLogout = async () => {
    await mockApi.logout();
    const guestUser = await mockApi.fetchUserProfile();
    setUser(guestUser);
    setIsUserModalOpen(false);
  };

  if (isInitialLoading) {
    return (
        <div className="min-h-screen bg-[#0a0f14] flex flex-col items-center justify-center">
            <div className="relative">
                <div className="w-24 h-24 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-tighter">Syncing</span>
                </div>
            </div>
            <h2 className="mt-8 text-xl font-black text-white uppercase tracking-widest animate-pulse">正在连接战术数据库...</h2>
            <p className="mt-2 text-gray-500 text-xs font-bold uppercase tracking-widest opacity-50 underline decoration-blue-500/30">Decrypting Strategy DNA</p>
        </div>
    );
  }

  if (!selectedBattle || !user) return null;

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

  const closeTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem('has_seen_tutorial_v2', 'true');
  };

  return (
    <div className={`min-h-screen bg-[#0a0f14] text-gray-200 flex flex-col p-4 md:p-6 font-sans selection:bg-blue-500/30 transition-opacity duration-1000 opacity-100`}>
      {showTutorial && activeTab === 'simulation' && (
        <TutorialOverlay onClose={closeTutorial} />
      )}
      
      {selectedPlayerForModal && (
        <PlayerModal 
          player={selectedPlayerForModal} 
          phaseTitle={currentPhase.title}
          onClose={() => setSelectedPlayerForModal(null)} 
        />
      )}

      {isUserModalOpen && (
          <UserSpaceModal 
            user={user} 
            onClose={() => setIsUserModalOpen(false)} 
            onLogout={handleLogout}
            onOpenLogin={() => { setIsUserModalOpen(false); setIsLoginModalOpen(true); }}
            onUpdateProfile={(updates) => {
                mockApi.updateProfile(updates).then(updated => setUser(updated));
            }}
          />
      )}

      {isLoginModalOpen && (
          <LoginModal onLoginSuccess={handleLoginSuccess} onClose={() => setIsLoginModalOpen(false)} />
      )}

      <header id="tutorial-header" className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-white/10 gap-4">
        <div className="flex items-center gap-4">
            <div className="animate-fade-in">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-black text-white tracking-tighter">足球科普系统 <span className="text-blue-500 text-lg font-bold">面向球迷的战术平台</span></h1>
                <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-widest">v2.1 EVOLVE</span>
              </div>
              <p className="text-sm text-gray-400 mt-1 italic opacity-80">基于 Web 可视化技术的数字化足球战术研究</p>
            </div>
        </div>

        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end animate-fade-in">
            <nav className="flex bg-white/5 p-1 rounded-xl border border-white/5 backdrop-blur-md">
                {[
                    { id: 'simulation', label: '实战复盘' },
                    { id: 'learning-paths', label: '学习路径' },
                    { id: 'sandbox', label: '战术沙盒' },
                    { id: 'knowledge', label: '战术百科' },
                    { id: 'about', label: '关于' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as ActiveTab)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                            activeTab === tab.id 
                            ? 'bg-blue-600 text-white shadow-lg' 
                            : 'text-gray-500 hover:text-white'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>
            
            <div className="flex items-center gap-4">
                {activeTab === 'simulation' && (
                    <div className="flex items-center gap-2">
                        <BattleSelector 
                            battles={battles} 
                            selectedId={selectedBattle.id} 
                            onSelect={(battle) => {
                                setSelectedBattle(battle);
                                setCurrentPhaseIndex(0);
                                setIsPlaying(false);
                            }} 
                        />
                        
                        <div className="flex items-center gap-1.5 bg-white/5 p-1.5 rounded-lg border border-white/10">
                            <button 
                                onClick={() => setShowZones(!showZones)}
                                className={`px-2 py-1 rounded text-[10px] font-black uppercase transition-all ${showZones ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-white'}`}
                            >
                                防区
                            </button>
                            <div className="w-px h-3 bg-white/10 mx-0.5"></div>
                            <div className="flex gap-2">
                                <input 
                                    type="color" value={homeColor} 
                                    onChange={(e) => setHomeColor(e.target.value)}
                                    className="w-5 h-5 rounded-full border-none cursor-pointer bg-transparent appearance-none [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-full"
                                    title="主队颜色"
                                />
                                <input 
                                    type="color" value={awayColor} 
                                    onChange={(e) => setAwayColor(e.target.value)}
                                    className="w-5 h-5 rounded-full border-none cursor-pointer bg-transparent appearance-none [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-full"
                                    title="客队颜色"
                                />
                            </div>
                        </div>
                    </div>
                )}
                
                <button 
                    onClick={() => setIsUserModalOpen(true)} 
                    className="flex items-center gap-3 bg-white/5 p-1 rounded-full border border-white/10 hover:border-blue-500/50 transition-all pr-4 group"
                >
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 border-white/10 ${user.isGuest ? 'bg-gray-800' : 'bg-gradient-to-tr from-blue-700 to-blue-400'}`}>
                        <UserIcon className={`w-5 h-5 ${user.isGuest ? 'text-gray-500' : 'text-white'}`} />
                    </div>
                    <div className="text-left hidden md:block">
                        <p className={`text-[10px] font-black uppercase tracking-tight ${user.isGuest ? 'text-gray-500' : 'text-white'}`}>{user.name}</p>
                        <p className={`text-[8px] font-bold uppercase tracking-widest ${user.isGuest ? 'text-gray-600' : 'text-blue-500'}`}>
                            {user.isGuest ? '访客' : '已连接'}
                        </p>
                    </div>
                </button>
            </div>
        </div>
      </header>
      
      <main className="flex-grow flex flex-col lg:grid lg:grid-cols-12 gap-8 mt-6 items-start">
        <div className={`${(activeTab === 'knowledge' || activeTab === 'sandbox' || activeTab === 'learning-paths' || activeTab === 'about') ? 'lg:col-span-12' : 'lg:col-span-8 lg:sticky lg:top-6 self-start'} flex flex-col gap-4 w-full transition-all duration-700`}>
            {activeTab === 'simulation' && (
                <>
                    <div className="flex items-center justify-between px-6 py-2 bg-white/5 rounded-xl border border-white/10 mb-2 animate-fade-in shadow-lg">
                        <div className="flex items-center gap-4">
                            <span className="text-[9px] text-blue-500 font-black uppercase tracking-[0.2em] bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 whitespace-nowrap hidden sm:block">当前分析</span>
                            <h2 className="text-lg font-black text-white tracking-tighter uppercase">{selectedBattle.title}</h2>
                        </div>
                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] text-gray-500 font-black uppercase tracking-tighter hidden md:block">{selectedBattle.teams.home.name}</span>
                                <span className="text-2xl font-black text-white tabular-nums leading-none">{selectedBattle.score.home}</span>
                            </div>
                            <div className="text-xl font-black text-blue-500 opacity-40">:</div>
                            <div className="flex items-center gap-3">
                                <span className="text-2xl font-black text-white tabular-nums leading-none">{selectedBattle.score.away}</span>
                                <span className="text-[10px] text-gray-500 font-black uppercase tracking-tighter hidden md:block">{selectedBattle.teams.away.name}</span>
                            </div>
                        </div>
                    </div>

                    <div id="tutorial-board" className="bg-gray-800/10 rounded-2xl p-4 md:p-8 border border-white/5 backdrop-blur-md relative overflow-hidden group shadow-2xl animate-fade-in">
                       <TacticBoard 
                        homePlayers={currentPhase.homePlayers} awayPlayers={currentPhase.awayPlayers}
                        passingNetwork={{ connections: currentPhase.connections }}
                        hoveredPlayer={hoveredPlayer} onPlayerHover={setHoveredPlayer} onPlayerClick={setSelectedPlayerForModal}
                        homeColor={homeColor} awayColor={awayColor} animationSpeed={animationSpeed}
                        isPlaying={isPlaying} showZones={showZones}
                      />
                    </div>

                    <div className="bg-gray-900/40 rounded-xl px-6 py-4 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 animate-fade-in shadow-xl backdrop-blur-sm">
                        <div id="tutorial-controls" className="flex items-center gap-5 shrink-0">
                            <button 
                                onClick={togglePlayback}
                                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                                    isPlaying ? 'bg-red-500 shadow-red-500/20' : 'bg-blue-600 shadow-blue-600/20'
                                } shadow-2xl border border-white/10 active:scale-95`}
                            >
                                {isPlaying ? (
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                                ) : (
                                    <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                )}
                            </button>
                        </div>

                        <div id="tutorial-phases" className="flex-grow flex flex-wrap items-center justify-center gap-3">
                            {selectedBattle.phases.map((phase, idx) => (
                                <button
                                    key={phase.id}
                                    onClick={() => handlePhaseChange(idx)}
                                    className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                                        idx === currentPhaseIndex 
                                        ? 'text-white border-blue-500/50 shadow-lg bg-blue-600/30 ring-2 ring-blue-500/20' 
                                        : 'bg-white/5 text-gray-500 border-white/5 hover:border-white/20 hover:text-white hover:bg-white/10'
                                    }`}
                                >
                                    {phase.title}
                                </button>
                            ))}
                        </div>
                        
                        <div className="flex items-center gap-2 bg-black/30 p-1.5 rounded-xl border border-white/10 shrink-0">
                            {[0.5, 1.0, 2.0].map((speed) => (
                                <button
                                    key={speed} onClick={() => setAnimationSpeed(speed)}
                                    className={`w-12 py-2 rounded-lg text-[10px] font-black transition-all border ${animationSpeed === speed ? 'bg-blue-600 border-blue-400 text-white shadow-lg' : 'text-gray-600 border-transparent hover:text-white'}`}
                                >
                                    {speed.toFixed(1)}x
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'sandbox' && <TacticalSandbox />}
            {activeTab === 'knowledge' && <TacticalKnowledgeBase onNavigateToBattle={handleNavigateToBattle} />}
            {activeTab === 'learning-paths' && (
              <LearningPaths 
                onNavigateToBattle={handleNavigateToBattle} 
                onNavigateToKnowledge={handleNavigateToKnowledge} 
              />
            )}
            {activeTab === 'about' && <ProjectMission />}
        </div>

        {activeTab === 'simulation' && (
            <aside className="lg:col-span-4 flex flex-col gap-6 w-full animate-fade-in">
                <div id="tutorial-analysis">
                    <AnalysisPanel phase={currentPhase} battle={selectedBattle} hoveredPlayer={hoveredPlayer} />
                </div>
                <div id="tutorial-stats">
                    <StatsDashboard 
                        stats={selectedBattle.stats} teamNames={{ home: selectedBattle.teams.home.name, away: selectedBattle.teams.away.name }}
                        colors={{ home: homeColor, away: awayColor }} teams={selectedBattle.teams} radarData={selectedBattle.radarData}
                    />
                </div>
                <DailyChallenge />
            </aside>
        )}
      </main>
    </div>
  );
};

export default App;
