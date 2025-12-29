
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
import { GoogleGenAI } from "@google/genai";

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
  
  const [homeColor, setHomeColor] = useState(selectedBattle.teams.home.color);
  const [awayColor, setAwayColor] = useState(selectedBattle.teams.away.color);
  const [showZones, setShowZones] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isDecoding, setIsDecoding] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const playbackTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    setHomeColor(selectedBattle.teams.home.color);
    setAwayColor(selectedBattle.teams.away.color);
    setAiInsight(null);
  }, [selectedBattle]);

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
    setAiInsight(null);
  };

  const decodeTactic = async () => {
    setIsDecoding(true);
    setAiInsight("");
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `你是一位世界级的足球战术分析师。
      当前比赛：${selectedBattle.title} (${selectedBattle.subtitle})
      当前阶段：${currentPhase.title}
      描述：${currentPhase.description}
      
      请用通俗易懂但专业的方式，为普通球迷解码这一瞬间的战术核心。重点解释球员位置的变化（如为何进入肋部或Zone 14）以及背后的博弈原理。字数在150字以内。`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      setAiInsight(response.text);
    } catch (e) {
      setAiInsight("AI 解码暂时断开，请检查网络连接。");
    } finally {
      setIsDecoding(false);
    }
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
        <PlayerModal player={selectedPlayerForModal} onClose={() => setSelectedPlayerForModal(null)} />
      )}

      {isUserModalOpen && (
          <UserSpaceModal user={MOCK_USER} onClose={() => setIsUserModalOpen(false)} />
      )}

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-white/10 gap-4">
        <div className="flex items-center gap-4">
            <div className="animate-fade-in">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Soccer Tactic <span className="text-blue-500">Lab</span></h1>
                <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-widest">v1.4 AI+</span>
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
                    <div className="flex items-center gap-2">
                        <BattleSelector 
                            battles={BATTLES} 
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
                            <div className="relative group/color">
                                <input 
                                    type="color" value={homeColor} 
                                    onChange={(e) => setHomeColor(e.target.value)}
                                    className="w-5 h-5 rounded-full border-none cursor-pointer bg-transparent appearance-none [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-none"
                                />
                            </div>
                            <div className="relative group/color">
                                <input 
                                    type="color" value={awayColor} 
                                    onChange={(e) => setAwayColor(e.target.value)}
                                    className="w-5 h-5 rounded-full border-none cursor-pointer bg-transparent appearance-none [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-none"
                                />
                            </div>
                        </div>
                    </div>
                )}
                
                <button onClick={() => setIsUserModalOpen(true)} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-700 to-blue-400 flex items-center justify-center border-2 border-white/10">
                        <UserIcon className="w-5 h-5 text-white" />
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
                      />
                      
                      {/* AI 解码面板 */}
                      {aiInsight !== null && (
                        <div className="absolute top-8 left-8 right-8 bg-blue-900/80 backdrop-blur-xl p-6 rounded-2xl border border-blue-500/30 shadow-2xl animate-fade-in z-[50]">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                                    <span className="text-[10px] font-black text-blue-300 uppercase tracking-widest">Gemini 战术解码器</span>
                                </div>
                                <button onClick={() => setAiInsight(null)} className="text-blue-300 hover:text-white">×</button>
                            </div>
                            <p className="text-sm text-white font-medium leading-relaxed italic">
                                {isDecoding ? "正在解析战术基因..." : aiInsight}
                            </p>
                        </div>
                      )}

                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-1/3 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10 backdrop-blur-md">
                         <div 
                            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-500 ease-out" 
                            style={{ width: `${((currentPhaseIndex + 1) / selectedBattle.phases.length) * 100}%`, backgroundColor: homeColor }}
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
                                style={!isPlaying ? { backgroundColor: homeColor } : {}}
                            >
                                {isPlaying ? (
                                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                                ) : (
                                    <svg className="w-7 h-7 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                )}
                            </button>
                            
                            <button 
                                onClick={decodeTactic}
                                disabled={isDecoding}
                                className="flex flex-col items-center justify-center bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 w-14 h-14 rounded-2xl transition-all group"
                            >
                                <span className={`text-xl ${isDecoding ? 'animate-spin' : ''}`}>⚡</span>
                                <span className="text-[8px] font-black text-blue-400 uppercase tracking-tighter mt-0.5">解码</span>
                            </button>

                            <div className="flex-grow flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                                {selectedBattle.phases.map((phase, idx) => (
                                    <button
                                        key={phase.id}
                                        onClick={() => handlePhaseChange(idx)}
                                        className={`px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                                            idx === currentPhaseIndex ? 'text-white' : 'bg-white/5 text-gray-500 hover:text-white'
                                        }`}
                                        style={idx === currentPhaseIndex ? { backgroundColor: homeColor } : {}}
                                    >
                                        {phase.title.includes('：') ? phase.title.split('：')[0] : phase.title}
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-1 bg-black/40 p-2 rounded-xl border border-white/10 shrink-0">
                            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest px-2">速度调节</span>
                            {[0.5, 1.0, 1.5, 2.0].map((speed) => (
                                <button
                                    key={speed} onClick={() => setAnimationSpeed(speed)}
                                    className={`w-12 py-1.5 rounded-lg text-[10px] font-black transition-all ${animationSpeed === speed ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-white'}`}
                                    style={animationSpeed === speed ? { backgroundColor: homeColor } : {}}
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
            {activeTab === 'about' && <ProjectMission />}
        </div>

        {activeTab === 'simulation' && (
            <aside className="lg:col-span-4 flex flex-col gap-6 w-full animate-fade-in">
                <AnalysisPanel phase={currentPhase} battle={selectedBattle} hoveredPlayer={hoveredPlayer} />
                <StatsDashboard 
                    stats={selectedBattle.stats} teamNames={{ home: selectedBattle.teams.home.name, away: selectedBattle.teams.away.name }}
                    colors={{ home: homeColor, away: awayColor }} teams={selectedBattle.teams} radarData={selectedBattle.radarData}
                />
                <DailyChallenge />
            </aside>
        )}
      </main>
    </div>
  );
};

export default App;
