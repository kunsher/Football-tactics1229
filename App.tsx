
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
  const [previousPhaseIndex, setPreviousPhaseIndex] = useState<number | null>(null);
  const [hoveredPlayer, setHoveredPlayer] = useState<PlayerPosition | null>(null);
  const [selectedPlayerForModal, setSelectedPlayerForModal] = useState<PlayerPosition | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('simulation');
  const [animationSpeed, setAnimationSpeed] = useState(1.0);
  
  const [homeColor, setHomeColor] = useState('#ffffff');
  const [awayColor, setAwayColor] = useState('#000000');
  const [showZones, setShowZones] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const playbackTimerRef = useRef<number | null>(null);

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

            const hasSeenTutorial = localStorage.getItem('has_seen_tutorial_v12');
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
      const stepDuration = 1500 / animationSpeed; 
      playbackTimerRef.current = window.setInterval(() => {
        setCurrentPhaseIndex((prev) => {
          setPreviousPhaseIndex(prev);
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
      setPreviousPhaseIndex(null);
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
        <div className="min-h-screen bg-[#0a0f14] flex flex-col items-center justify-center text-center p-4">
            <div className="w-12 h-12 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin"></div>
            <h2 className="mt-6 text-[11px] font-black text-blue-500 uppercase tracking-[0.4em] animate-pulse">正在初始化战术科普平台...</h2>
        </div>
    );
  }

  if (!selectedBattle || !user) return null;

  const currentPhase = selectedBattle.phases[currentPhaseIndex] || selectedBattle.phases[0];
  const previousPhase = previousPhaseIndex !== null ? selectedBattle.phases[previousPhaseIndex] : null;

  const handlePhaseChange = (index: number) => {
    setIsPlaying(false);
    setPreviousPhaseIndex(currentPhaseIndex);
    setCurrentPhaseIndex(index);
  };

  const togglePlayback = () => {
    if (currentPhaseIndex >= selectedBattle.phases.length - 1) {
        setCurrentPhaseIndex(0);
        setPreviousPhaseIndex(null);
    }
    setIsPlaying(!isPlaying);
  };

  const closeTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem('has_seen_tutorial_v12', 'true');
  };

  return (
    <div className="min-h-screen h-screen flex flex-col font-sans selection:bg-blue-500/30 overflow-hidden bg-[#0a0f14] text-white">
      {showTutorial && activeTab === 'simulation' && <TutorialOverlay onClose={closeTutorial} />}
      {selectedPlayerForModal && <PlayerModal player={selectedPlayerForModal} phaseTitle={currentPhase.title} onClose={() => setSelectedPlayerForModal(null)} />}
      {isUserModalOpen && <UserSpaceModal user={user} onClose={() => setIsUserModalOpen(false)} onLogout={handleLogout} onOpenLogin={() => { setIsUserModalOpen(false); setIsLoginModalOpen(true); }} onUpdateProfile={(updates) => mockApi.updateProfile(updates).then(updated => setUser(updated))} />}
      {isLoginModalOpen && <LoginModal onLoginSuccess={handleLoginSuccess} onClose={() => setIsLoginModalOpen(false)} />}

      <header className="h-16 shrink-0 border-b border-white/5 bg-[#0a0f14] flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-8">
          <div className="flex flex-col">
            <h1 className="text-xl font-black tracking-tighter uppercase leading-none">
              足球战术<span className="text-blue-500 ml-1">科普系统</span>
            </h1>
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.3em] mt-1">Tactical Visualization Platform</p>
          </div>
          {activeTab === 'simulation' && (
             <div className="hidden md:block">
                <BattleSelector battles={battles} selectedId={selectedBattle.id} onSelect={(b) => { setSelectedBattle(b); setCurrentPhaseIndex(0); setPreviousPhaseIndex(null); }} />
             </div>
          )}
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden xl:flex bg-white/5 p-1.5 rounded-2xl border border-white/5 backdrop-blur-sm shadow-inner">
            {['simulation', 'learning-paths', 'sandbox', 'knowledge', 'about'].map(id => (
              <button 
                key={id} 
                onClick={() => setActiveTab(id as any)} 
                className={`px-5 py-2 rounded-xl text-[13px] font-black uppercase tracking-tight transition-all duration-300 ${activeTab === id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40' : 'text-gray-400 hover:text-white'}`}
              >
                {id === 'simulation' ? '战役复盘' : id === 'learning-paths' ? '学习路径' : id === 'sandbox' ? '战术沙盒' : id === 'knowledge' ? '战术百科' : '项目使命'}
              </button>
            ))}
          </nav>

          <button onClick={() => setIsUserModalOpen(true)} className="flex items-center gap-2.5 p-1.5 pr-3 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 transition-all">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${user.isGuest ? 'bg-gray-800' : 'bg-blue-600'}`}>
              <UserIcon className="w-4 h-4 text-white" />
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-[11px] font-black text-white leading-none">{user.name}</p>
              <p className="text-[8px] font-bold text-blue-500 uppercase tracking-widest mt-0.5 opacity-60">{user.rank}</p>
            </div>
          </button>
        </div>
      </header>
      
      <main className="flex-grow flex flex-col lg:flex-row overflow-hidden bg-[#0a0f14]">
        {activeTab === 'simulation' ? (
          <>
            <section className="w-full lg:w-[64%] h-full flex flex-col p-3 lg:p-4 shrink-0 border-r border-white/5">
              <div id="tutorial-board" className="flex-grow bg-[#050c05] rounded-[3rem] border border-white/10 relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] group flex items-center justify-center aspect-[120/68]">
                 <TacticBoard 
                    homePlayers={currentPhase.homePlayers} 
                    awayPlayers={currentPhase.awayPlayers}
                    passingNetwork={{ connections: currentPhase.connections }}
                    hoveredPlayer={hoveredPlayer} 
                    onPlayerHover={setHoveredPlayer} 
                    onPlayerClick={setSelectedPlayerForModal}
                    homeColor={homeColor} 
                    awayColor={awayColor} 
                    animationSpeed={animationSpeed}
                    isPlaying={isPlaying} 
                    showZones={showZones} 
                    annotations={currentPhase.annotations}
                    previousPhasePlayers={previousPhase ? { home: previousPhase.homePlayers, away: previousPhase.awayPlayers } : undefined}
                    currentPhase={currentPhase} // 注入相位实况数据
                 />
              </div>

              <div id="tutorial-controls" className="mt-4 shrink-0 bg-[#0e141b] border border-white/5 rounded-[1.8rem] p-5 flex flex-col gap-6">
                <div className="relative w-full h-1 bg-white/10 rounded-full flex items-center justify-between px-1">
                  <div 
                    className="absolute left-0 top-0 h-full bg-blue-600 rounded-full transition-all duration-500 ease-linear shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                    style={{ width: `${(currentPhaseIndex / (selectedBattle.phases.length - 1)) * 100}%` }}
                  />
                  {selectedBattle.phases.map((p, idx) => (
                    <button 
                      key={p.id}
                      onClick={() => handlePhaseChange(idx)}
                      className={`relative z-10 w-2.5 h-2.5 rounded-full border transition-all duration-300 ${idx <= currentPhaseIndex ? 'bg-blue-500 border-blue-400 scale-125' : 'bg-gray-800 border-white/10'}`}
                    >
                      {idx === currentPhaseIndex && (
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] font-black whitespace-nowrap tracking-tight text-blue-400 animate-fade-in">
                          {p.title}
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button onClick={togglePlayback} className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center transition-all shadow-lg hover:bg-blue-500 active:scale-95">
                        {isPlaying ? <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> : <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>}
                    </button>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest opacity-60">AI 实战模拟</span>
                      <span className="text-base font-black text-white leading-none mt-1 uppercase tracking-tight">
                         {currentPhase.title} {currentPhase.matchMinute && <span className="text-blue-500 ml-2 font-mono">[{currentPhase.matchMinute}]</span>}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-1.5">
                    <span className="text-[9px] text-gray-600 font-black uppercase tracking-widest opacity-40">播放倍速率</span>
                    <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
                      {[0.5, 1, 1.5, 2].map(speed => (
                        <button 
                          key={speed} 
                          onClick={() => setAnimationSpeed(speed)} 
                          className={`w-10 py-1.5 rounded-lg text-[11px] font-black transition-all ${animationSpeed === speed ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-600 hover:text-gray-400'}`}
                        >
                          {speed}x
                        </button>
                      ))}
                    </div>
                  </div>

                  <div id="tutorial-phases" className="hidden xl:flex gap-1.5 bg-white/5 p-1.5 rounded-xl border border-white/5">
                    {selectedBattle.phases.map((p, idx) => (
                      <button 
                        key={p.id} 
                        onClick={() => handlePhaseChange(idx)}
                        className={`px-4 py-2 rounded-lg text-[11px] font-black uppercase transition-all ${idx === currentPhaseIndex ? 'bg-blue-600/30 text-blue-400 border border-blue-500/30' : 'text-gray-600 hover:text-gray-400'}`}
                      >
                        {p.matchMinute ? `${p.matchMinute}` : `PHASE ${idx + 1}`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="flex-grow h-full overflow-y-auto custom-scrollbar p-6 lg:p-10 shrink bg-[#0a0f14]">
                <div id="tutorial-analysis" className="mb-10">
                    <AnalysisPanel phase={currentPhase} battle={selectedBattle} hoveredPlayer={hoveredPlayer} />
                </div>
                <div id="tutorial-stats" className="pb-32">
                    <StatsDashboard stats={selectedBattle.stats} teamNames={{ home: selectedBattle.teams.home.name, away: selectedBattle.teams.away.name }} colors={{ home: homeColor, away: awayColor }} teams={selectedBattle.teams} radarData={selectedBattle.radarData} />
                </div>
            </section>
          </>
        ) : (
          <div className="w-full h-full overflow-y-auto custom-scrollbar p-6 lg:p-10">
            {activeTab === 'sandbox' && <TacticalSandbox />}
            {activeTab === 'knowledge' && <TacticalKnowledgeBase onNavigateToBattle={handleNavigateToBattle} />}
            {activeTab === 'learning-paths' && <LearningPaths onNavigateToBattle={handleNavigateToBattle} onNavigateToKnowledge={handleNavigateToKnowledge} />}
            {activeTab === 'about' && <ProjectMission />}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
