
import React, { useState, useMemo } from 'react';
import type { TacticPhase, Battle, PlayerPosition, TacticalEvent } from '../types';
import { InfoIcon, PlayerIcon } from './icons';
import { TacticalVisualizer } from './TacticalVisualizer';
import { motion, AnimatePresence } from 'framer-motion';

interface AnalysisPanelProps {
  phase: TacticPhase;
  battle: Battle;
  hoveredPlayer: PlayerPosition | null;
  onNavigateToKnowledge?: (knowledgeId: string) => void;
}

const EVENT_VISUAL_MAP: Record<string, any> = {
  'Goal': 'tiki-taka',
  'Transition': 'vertical-counter',
  'Interception': 'counter-press',
  'HSR_Burst': 'overlap',
};

const EVENT_CODE_MAP: Record<string, string> = {
  'Goal': 'ATT_GOL',
  'Transition': 'TRN_FAST',
  'Interception': 'DEF_INT',
  'HSR_Burst': 'PHY_HSR',
};

const EVENT_DETAILS_MAP: Record<string, { desc: string; proTip: string; keyPoints: string[]; tacticalNote: string }> = {
  'Goal': {
    desc: '通过连续的高频传递撕开防线，最终在核心区域完成致命一击。',
    proTip: '观察传球网络中“第三人”的跑位，这是破大巴的关键。',
    keyPoints: ['节奏突变', '弱侧转移', '禁区渗透'],
    tacticalNote: '进攻方利用球场宽度拉开防守厚度，创造出局部三角传递。'
  },
  'Transition': {
    desc: '在断球后的黄金窗口，利用对手阵型向进攻切换的混乱期发动突击。',
    proTip: '第一下垂直传球的质量决定了反击的上限。',
    keyPoints: ['垂直打击', '阵型松散窗', '局部多打少'],
    tacticalNote: '强调瞬间的速度转换，旨在对手落位前完成最后一传。'
  },
  'Interception': {
    desc: '预判对手传球路径，通过集体的弧线压迫将球权截留在进攻三区。',
    proTip: '这不仅是抢球，更是通过站位切断对手的心理安全区。',
    keyPoints: ['弧线跑位', '陷阱诱导', '就地打击'],
    tacticalNote: '防守组采取高位封锁，截断对方回传路径。'
  },
};

const AudioWaveform: React.FC = () => (
  <div className="flex items-center gap-0.5 h-3">
    {[0, 1, 2, 3, 4, 5, 6].map(i => (
      <motion.div
        key={i}
        animate={{ height: [4, 12, 6, 10, 4] }}
        transition={{ duration: 1, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
        className="w-0.5 bg-blue-500 rounded-full"
      />
    ))}
  </div>
);

const TimelineEvent: React.FC<{ 
  event: TacticalEvent; 
  isActive: boolean;
  onHover: (event: TacticalEvent | null, element: HTMLElement | null) => void;
}> = ({ event, isActive, onHover }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    // Change div to motion.div to support onHoverStart and onHoverEnd from framer-motion
    <motion.div 
      ref={ref}
      className={`flex flex-col items-center gap-2 group cursor-pointer transition-all relative ${isActive ? 'scale-110' : 'opacity-40 hover:opacity-100'}`}
      onHoverStart={() => onHover(event, ref.current)}
      onHoverEnd={() => onHover(null, null)}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 ${
        event.type === 'Goal' ? 'bg-orange-500/20 border-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.2)]' : 'bg-blue-600/20 border-blue-400'
      }`}>
        <span className="text-sm">{event.type === 'Goal' ? '⚽' : '⚡'}</span>
      </div>
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-[9px] font-black text-gray-500 tracking-tighter">{event.minute}</span>
        <span className={`text-[7px] font-black px-1 rounded bg-white/5 border border-white/5 uppercase tracking-[0.1em]`}>
          {EVENT_CODE_MAP[event.type] || 'EVT'}
        </span>
      </div>
      {isActive && (
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full border border-[#0a0f14] shadow-[0_0_8px_#3b82f6]"></div>
      )}
    </motion.div>
  );
};

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ phase, battle, hoveredPlayer, onNavigateToKnowledge }) => {
  const [hoveredEvent, setHoveredEvent] = useState<TacticalEvent | null>(null);
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);

  const bubblePosition = useMemo(() => {
    if (!hoveredElement) return { left: 0 };
    return { left: hoveredElement.offsetLeft + hoveredElement.offsetWidth / 2 };
  }, [hoveredElement]);

  return (
    <div className="bg-[#0a0f14]/80 rounded-[2.5rem] p-6 md:p-8 border border-white/10 flex flex-col gap-8 backdrop-blur-3xl shadow-2xl relative">
      {/* 实时解说播报 HUD (侧边栏集成) */}
      <div className="bg-blue-600/10 border border-blue-500/20 rounded-3xl p-5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
           <svg className="w-16 h-16 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3z"/></svg>
        </div>
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Live Briefing</span>
            <div className="flex items-center gap-3 mt-1">
               <span className="text-xl font-black text-white font-mono">{phase.matchMinute || '--:--'}</span>
               <div className="w-px h-4 bg-white/20"></div>
               <span className="text-sm font-black text-blue-400">{phase.matchContext || '0 - 0'}</span>
            </div>
          </div>
          <button 
            onClick={() => setIsVoicePlaying(!isVoicePlaying)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isVoicePlaying ? 'bg-blue-600 shadow-lg' : 'bg-white/5 border border-white/10'}`}
          >
            {isVoicePlaying ? <AudioWaveform /> : <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>}
          </button>
        </div>
        <motion.p 
          key={phase.id}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-gray-200 font-bold leading-relaxed italic pr-4"
        >
          “ {phase.description} ”
        </motion.p>
      </div>

      <div className="bg-black/40 p-6 rounded-3xl border border-white/5 relative">
        <div className="flex items-center justify-between mb-6">
            <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              Sportscode 战术标签流
            </h4>
        </div>
        
        <div className="flex items-center gap-8 overflow-x-auto pb-2 scrollbar-hide relative">
            {battle.events.map(ev => (
              <TimelineEvent 
                key={ev.id} 
                event={ev} 
                isActive={ev.phaseId === phase.id} 
                onHover={(ev, el) => { setHoveredEvent(ev); setHoveredElement(el); }}
              />
            ))}
            <AnimatePresence>
              {hoveredEvent && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  style={{ position: 'absolute', bottom: '100%', left: bubblePosition.left, transform: 'translateX(-50%)', marginBottom: '1.5rem', zIndex: 100 }}
                  className="pointer-events-auto"
                >
                  <div className="bg-[#0f172a] border border-blue-500/40 p-5 rounded-[2.5rem] shadow-2xl backdrop-blur-2xl flex flex-col gap-5 w-[320px]">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest">Tactic Schema</span>
                      <span className="text-[8px] font-black text-white bg-blue-600/40 px-3 py-1 rounded-full uppercase">{hoveredEvent.type}</span>
                    </div>
                    <div className="w-full h-40 bg-black/40 rounded-2xl border border-white/5 overflow-hidden shadow-inner">
                       <TacticalVisualizer type={EVENT_VISUAL_MAP[hoveredEvent.type] || 'tiki-taka'} size="small" />
                    </div>
                    <div className="space-y-4">
                        <p className="text-xs text-gray-300 leading-relaxed font-medium italic">“ {EVENT_DETAILS_MAP[hoveredEvent.type]?.desc || '解析中...'} ”</p>
                        {hoveredEvent.relatedKnowledgeId && (
                           <button 
                             onClick={(e) => {
                               e.stopPropagation();
                               onNavigateToKnowledge?.(hoveredEvent.relatedKnowledgeId!);
                             }}
                             className="w-full py-2.5 bg-blue-600/20 border border-blue-500/30 rounded-xl text-[10px] font-black text-blue-400 uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
                           >
                             深度解码战术基因 →
                           </button>
                        )}
                        <p className="text-[10px] text-gray-500 border-t border-white/5 pt-2 italic">{EVENT_DETAILS_MAP[hoveredEvent.type]?.tacticalNote}</p>
                    </div>
                  </div>
                  <div className="w-3 h-3 bg-[#0f172a] border-r border-b border-blue-500/40 rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2"></div>
                </motion.div>
              )}
            </AnimatePresence>
        </div>
      </div>

      <div>
        <h4 className="text-[10px] font-black text-gray-500 uppercase mb-4 flex items-center gap-3">
            <PlayerIcon className="w-4 h-4" /> 球员即时性能诊断 (GPS Sync)
        </h4>
        <div className={`bg-[#05080b] rounded-2xl p-6 border transition-all duration-700 relative overflow-hidden ${hoveredPlayer ? 'border-blue-500/40 shadow-xl scale-[1.01]' : 'border-white/5 opacity-50'}`}>
          {hoveredPlayer ? (
            <div className="animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                 <div>
                    <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest mb-1 italic">LIVE_SQUAD_TRACKER</p>
                    <p className="text-3xl font-black text-white tracking-tighter">{hoveredPlayer.name}</p>
                 </div>
                 <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                    <span className="text-xl font-black text-blue-400">#{hoveredPlayer.number}</span>
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-[9px] text-gray-500 font-black uppercase mb-1">瞬时代谢率</p>
                      <p className="text-xl font-black text-white">{(hoveredPlayer.gps?.metabolicPower || 24.2).toFixed(1)} <span className="text-[9px] text-blue-500 font-bold">W/KG</span></p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-[9px] text-gray-500 font-black uppercase mb-1">HSR 累积</p>
                      <p className="text-xl font-black text-orange-500">{Math.round(hoveredPlayer.gps?.highIntensityDistance || 42)} <span className="text-[9px] font-bold">M</span></p>
                  </div>
              </div>
            </div>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center opacity-30">
               <InfoIcon className="w-8 h-8 mb-4" />
               <p className="text-xs font-black uppercase tracking-widest text-gray-500">悬停球员获取 GPS 数据链路</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
