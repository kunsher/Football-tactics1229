
import React, { useState, useMemo } from 'react';
import type { TacticPhase, Battle, PlayerPosition, GlossaryTerm, TacticalEvent } from '../types';
import { InfoIcon, PlayerIcon } from './icons';
import { GLOSSARY } from '../constants';
import { TacticalVisualizer } from './TacticalVisualizer';
import { motion, AnimatePresence } from 'framer-motion';

interface AnalysisPanelProps {
  phase: TacticPhase;
  battle: Battle;
  hoveredPlayer: PlayerPosition | null;
}

const EVENT_VISUAL_MAP: Record<string, any> = {
  'Goal': 'tiki-taka',
  'Transition': 'vertical-counter',
  'Interception': 'counter-press',
  'HSR_Burst': 'overlap',
};

// 专业的战术术语缩写
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
    tacticalNote: '此阶段进攻方利用球场宽度拉开防守厚度，创造出局部的传球三角。'
  },
  'Transition': {
    desc: '在断球后的黄金 5 秒内，利用对手阵型向进攻切换的混乱期发动突击。',
    proTip: '第一下垂直传球的质量决定了反击的上限。',
    keyPoints: ['垂直打击', '阵型松散窗', '局部多打少'],
    tacticalNote: '强调瞬间的速度转换，旨在对手落位前完成最后一传。'
  },
  'Interception': {
    desc: '预判对手传球路径，通过集体的弧线压迫将球权截留在进攻三区。',
    proTip: '这不仅是抢球，更是通过站位切断对手的心理安全区。',
    keyPoints: ['弧线跑位', '陷阱诱导', '就地打击'],
    tacticalNote: '防守组采取高位封锁，截断对方回传路径，迫使对手出现受压失误。'
  },
  'HSR_Burst': {
    desc: '球员进入 Z5 速度区间，通过极高的物理性能输出创造战术优势。',
    proTip: 'HSR 的意义在于无球状态下的空间博弈，即“为跑位而跑”。',
    keyPoints: ['体能红区', '瞬间负载', '空间拉伸'],
    tacticalNote: '球员通过非直线跑位带离对方防守人，为队友制造出局部的战术真空。'
  },
};

const TimelineEvent: React.FC<{ 
  event: TacticalEvent; 
  isActive: boolean;
  onHover: (event: TacticalEvent | null, element: HTMLElement | null) => void;
}> = ({ event, isActive, onHover }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={ref}
      className={`flex flex-col items-center gap-2 group cursor-pointer transition-all relative ${isActive ? 'scale-110' : 'opacity-40 hover:opacity-100'}`}
      onMouseEnter={() => onHover(event, ref.current)}
      onMouseLeave={() => onHover(null, null)}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 ${
        event.type === 'Goal' ? 'bg-orange-500/20 border-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.2)]' : 
        event.type === 'Transition' ? 'bg-blue-600/20 border-blue-400' : 'bg-white/10 border-white/20'
      }`}>
        <span className="text-sm">
          {event.type === 'Goal' ? '⚽' : event.type === 'Transition' ? '⚡' : '🏷️'}
        </span>
      </div>
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-[9px] font-black text-gray-500 uppercase tracking-tighter">{event.minute}</span>
        <span className={`text-[7px] font-black px-1 rounded bg-white/5 border border-white/5 group-hover:text-blue-400 transition-colors uppercase tracking-[0.1em]`}>
          {EVENT_CODE_MAP[event.type] || 'EVT'}
        </span>
      </div>
      
      {isActive && (
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full border border-[#0a0f14] shadow-[0_0_8px_#3b82f6]"></div>
      )}
    </div>
  );
};

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ phase, battle, hoveredPlayer }) => {
  const [hoveredEvent, setHoveredEvent] = useState<TacticalEvent | null>(null);
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);

  const bubblePosition = useMemo(() => {
    if (!hoveredElement) return { left: 0 };
    return { left: hoveredElement.offsetLeft + hoveredElement.offsetWidth / 2 };
  }, [hoveredElement]);

  const mockEvents: TacticalEvent[] = [
    { id: 'e1', type: 'Transition', minute: '12:05', phaseId: 'p1', label: '球权转换' },
    { id: 'e2', type: 'Interception', minute: '14:20', phaseId: 'p1', label: '高位拦截' },
    { id: 'e3', type: 'Goal', minute: '16:45', phaseId: 'rm1', label: '哈维开局破门' },
    { id: 'e4', type: 'Transition', minute: '72:15', phaseId: 'rm2', label: '快速反击' },
  ];

  return (
    <div className="bg-[#0a0f14]/80 rounded-[2.5rem] p-6 md:p-8 border border-white/10 flex flex-col gap-8 backdrop-blur-3xl shadow-2xl relative">
      <div className="bg-black/40 p-6 rounded-3xl border border-white/5 relative">
        <div className="flex items-center justify-between mb-6">
            <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              Sportscode 战术标签流 / CODING SHEET
            </h4>
        </div>
        
        <div className="flex items-center gap-8 overflow-x-auto pb-2 scrollbar-hide relative">
            {mockEvents.map(ev => (
              <TimelineEvent 
                key={ev.id} 
                event={ev} 
                isActive={ev.phaseId === phase.id} 
                onHover={(ev, el) => { setHoveredEvent(ev); setHoveredElement(el); }}
              />
            ))}
            <div className="flex-grow h-px bg-white/5 mx-4 min-w-[40px]"></div>
            <button className="text-[9px] font-black text-blue-500 border border-blue-500/30 px-4 py-2 rounded-xl bg-blue-500/5 hover:bg-blue-500 hover:text-white transition-all">+ 自定义标签</button>

            <AnimatePresence>
              {hoveredEvent && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: bubblePosition.left,
                    transform: 'translateX(-50%)',
                    marginBottom: '1.5rem',
                    zIndex: 100
                  }}
                  className="pointer-events-none"
                >
                  <div className="bg-[#0f172a] border border-blue-500/40 p-5 rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,1)] backdrop-blur-2xl flex flex-col gap-5 w-[340px]">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[8px] font-black text-blue-400 uppercase tracking-[0.2em]">TACTICAL ENCYCLOPEDIA</span>
                        <span className="text-sm font-black text-white uppercase tracking-tight">{hoveredEvent.label}</span>
                      </div>
                      <span className="text-[8px] font-black text-white bg-blue-600/40 px-3 py-1 rounded-full uppercase border border-blue-500/30">{hoveredEvent.type}</span>
                    </div>
                    
                    <div className="w-full h-44 bg-black/40 rounded-2xl border border-white/5 overflow-hidden shadow-inner relative">
                       <TacticalVisualizer type={EVENT_VISUAL_MAP[hoveredEvent.type] || 'tiki-taka'} size="small" />
                       <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/60 rounded border border-white/10">
                          <span className="text-[7px] font-black text-blue-400 uppercase">Interactive Simulation</span>
                       </div>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/5 relative group">
                            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-[#0f172a] animate-pulse"></div>
                            <p className="text-[9px] text-blue-400 font-black uppercase mb-1.5 tracking-widest">战术意图深度分析 / LOGIC INSIGHT</p>
                            <p className="text-xs text-gray-300 leading-relaxed font-medium">
                                “ {EVENT_DETAILS_MAP[hoveredEvent.type]?.desc || '正在解析战术逻辑...'} ”
                            </p>
                            <div className="mt-3 pt-3 border-t border-white/5 text-[10px] text-gray-500 italic leading-relaxed">
                                {EVENT_DETAILS_MAP[hoveredEvent.type]?.tacticalNote}
                            </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                            {EVENT_DETAILS_MAP[hoveredEvent.type]?.keyPoints.map(kp => (
                                <span key={kp} className="text-[8px] font-black text-gray-500 border border-white/10 px-2 py-1 rounded-md uppercase tracking-tighter bg-white/5">#{kp}</span>
                            ))}
                        </div>

                        <div className="p-4 bg-blue-600/10 rounded-2xl border border-blue-500/20">
                            <p className="text-[9px] text-blue-500 font-black uppercase mb-1.5 tracking-widest">教练员手记 / COACHING TIP</p>
                            <p className="text-[11px] text-gray-400 font-bold italic leading-relaxed">
                                {EVENT_DETAILS_MAP[hoveredEvent.type]?.proTip}
                            </p>
                        </div>
                    </div>

                    <div className="w-full h-px bg-white/5"></div>
                    <div className="flex justify-between w-full px-1">
                       <span className="text-[8px] text-gray-700 font-black uppercase">Data Engine: Verified</span>
                       <span className="text-[8px] text-blue-600 font-black uppercase tracking-widest animate-pulse">SYSTEM_ACTIVE_V5</span>
                    </div>
                  </div>
                  <div className="w-3 h-3 bg-[#0f172a] border-r border-b border-blue-500/40 rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2"></div>
                </motion.div>
              )}
            </AnimatePresence>
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">专业复盘报告 / PERFORMANCE REPORT</span>
        </div>
        <h3 className="text-3xl font-black text-white mb-6 tracking-tighter leading-none">{phase.title}</h3>
        <p className="text-base text-gray-300 font-bold leading-relaxed italic border-l-4 border-blue-500/40 pl-6 py-2 bg-white/[0.03] rounded-r-2xl">
          {phase.description}
        </p>
      </div>

      <div className="flex-grow">
        <h4 className="text-[10px] font-black text-gray-500 uppercase mb-4 flex items-center gap-3">
            <PlayerIcon className="w-4 h-4" /> 球员即时性能诊断 (GPS Sync)
        </h4>
        <div className={`bg-[#05080b] rounded-2xl p-6 border transition-all duration-700 relative overflow-hidden ${hoveredPlayer ? 'border-blue-500/40 shadow-xl scale-[1.01]' : 'border-white/5 opacity-50'}`}>
          {hoveredPlayer ? (
            <div className="animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                 <div>
                    <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest mb-1 italic">OBJECT_LOUGH_MODEL</p>
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
               <p className="text-xs font-black uppercase tracking-widest text-gray-500">请悬停以获取实时 GPS 链路数据</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
