
import React, { useState, useMemo } from 'react';
import type { TacticPhase, Battle, PlayerPosition, GlossaryTerm } from '../types';
import { InfoIcon, PlayerIcon } from './icons';
import { GLOSSARY } from '../constants';
import { TacticalVisualizer } from './TacticalVisualizer';

interface AnalysisPanelProps {
  phase: TacticPhase;
  battle: Battle;
  hoveredPlayer: PlayerPosition | null;
}

const Tooltip: React.FC<{ termObj: GlossaryTerm; children: React.ReactNode }> = ({ termObj, children }) => {
    const [show, setShow] = useState(false);
    return (
        <span className="relative inline-block align-baseline">
            <span 
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
                className="text-blue-400 font-black border-b border-blue-500/50 cursor-help hover:text-blue-300 transition-all px-1 rounded-sm relative z-10 text-sm md:text-base lg:text-[17px]"
            >
                {children}
            </span>
            {show && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-[340px] bg-[#0f172a] border border-blue-500/40 p-6 rounded-[2rem] shadow-[0_30px_80px_rgba(0,0,0,0.9)] z-[200] animate-fade-in pointer-events-none backdrop-blur-2xl ring-1 ring-white/10">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-blue-500/30">
                            {termObj.category === 'System' ? '战术体系' : termObj.category === 'Position' ? '场上位置' : termObj.category === 'Action' ? '技术动作' : '战术阶段'}
                        </span>
                        <div className="h-[1px] flex-grow bg-gradient-to-r from-blue-500/40 to-transparent"></div>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-5">
                        {termObj.icon && (
                            <div className="w-14 h-14 shrink-0 bg-blue-600/10 rounded-2xl border border-blue-500/20 flex items-center justify-center text-2xl shadow-inner">
                                {termObj.icon}
                            </div>
                        )}
                        <p className="text-2xl font-black text-white tracking-tighter leading-tight">{termObj.term}</p>
                    </div>

                    {termObj.visualEffect && (
                        <div className="mb-5 rounded-2xl overflow-hidden border border-white/5 shadow-inner bg-black/40">
                            <TacticalVisualizer type={termObj.visualEffect} size="small" />
                            <div className="bg-blue-600/10 py-2 border-t border-white/5 flex items-center justify-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                                <p className="text-[9px] text-blue-400 font-black uppercase tracking-[0.2em]">LIVE PREVIEW</p>
                            </div>
                        </div>
                    )}

                    <p className="text-base text-gray-200 leading-relaxed font-bold italic border-l-4 border-blue-500/30 pl-4 py-2 bg-white/5 rounded-r-xl">
                        {termObj.definition}
                    </p>
                    
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-x-[12px] border-x-transparent border-t-[12px] border-t-blue-500/40"></div>
                </div>
            )}
        </span>
    );
};

const SmartText: React.FC<{ text: string }> = ({ text }) => {
    const termsToMatch = useMemo(() => {
        const matches = GLOSSARY.flatMap(g => {
            const cleanTerm = g.term.split(' (')[0];
            const englishTerm = g.term.includes('(') ? g.term.match(/\(([^)]+)\)/)?.[1] : null;
            return [
                { match: cleanTerm, data: g },
                { match: englishTerm, data: g },
                { match: g.term, data: g }
            ].filter(item => item.match && item.match.length > 1);
        });
        return matches.sort((a, b) => (b.match?.length || 0) - (a.match?.length || 0));
    }, []);

    const sentences = useMemo(() => text.split('。').filter(s => s.trim()), [text]);

    return (
      <div className="space-y-4">
        {sentences.map((sentence, sIdx) => {
          let parts: (string | React.ReactNode)[] = [sentence + "。"];
          termsToMatch.forEach(({ match, data }) => {
              if (!match) return;
              const escapedMatch = match.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
              const isEnglish = /^[A-Za-z0-9\s-]+$/.test(match);
              const regex = new RegExp(isEnglish ? `(\\b${escapedMatch}\\b)` : `(${escapedMatch})`, 'gi');

              parts = parts.flatMap(part => {
                  if (typeof part !== 'string') return part;
                  const subParts = part.split(regex);
                  return subParts.map((subPart, i) => 
                      subPart.toLowerCase() === match.toLowerCase() 
                          ? <Tooltip key={`${match}-${sIdx}-${i}`} termObj={data}>{subPart}</Tooltip>
                          : subPart
                  );
              });
          });

          return (
            <div 
              key={sIdx} 
              // 显著缩小正文字号：text-base (16px) -> text-lg (18px) -> text-xl (20px)
              className="animate-fade-in fill-mode-forwards opacity-0 text-gray-200 font-bold text-base md:text-lg lg:text-[17px] leading-relaxed tracking-tight"
              style={{ animationDelay: `${sIdx * 0.15}s`, animationFillMode: 'forwards' }}
            >
              {parts}
            </div>
          );
        })}
      </div>
    );
};

const GlossaryItem: React.FC<{ termObj: GlossaryTerm }> = ({ termObj }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    return (
        <div className="relative">
            <button 
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="px-5 py-2.5 bg-white/5 rounded-2xl text-sm md:text-base text-gray-300 border border-white/5 hover:border-blue-500/60 hover:bg-blue-500/10 cursor-help transition-all flex items-center gap-3 group font-black uppercase tracking-tight shadow-lg"
            >
                {termObj.icon && <span className="text-xl">{termObj.icon}</span>}
                {termObj.term.split(' (')[0]}
                <InfoIcon className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity text-blue-400" />
            </button>
            {showTooltip && (
                <div className="absolute bottom-full left-0 mb-4 w-[320px] bg-[#0a0f14] border border-blue-500/40 p-6 rounded-[2rem] shadow-[0_30px_70px_rgba(0,0,0,0.8)] z-[100] animate-fade-in pointer-events-none ring-1 ring-white/10 backdrop-blur-3xl">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-500/30">
                            {termObj.category}
                        </span>
                        <div className="h-px flex-grow bg-blue-500/30"></div>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        {termObj.icon && (
                            <div className="w-12 h-12 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center text-xl shrink-0">
                                {termObj.icon}
                            </div>
                        )}
                        <p className="text-xl font-black text-white tracking-tight underline decoration-blue-500/40 decoration-2 underline-offset-8">{termObj.term}</p>
                    </div>
                    {termObj.visualEffect && (
                        <div className="mb-4 rounded-xl overflow-hidden bg-black/60 border border-white/10 shadow-lg">
                            <TacticalVisualizer type={termObj.visualEffect} size="small" />
                        </div>
                    )}
                    <p className="text-base text-gray-200 leading-relaxed font-bold italic bg-white/5 p-4 rounded-xl">{termObj.definition}</p>
                </div>
            )}
        </div>
    );
};

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ phase, battle, hoveredPlayer }) => {
  // 模拟累计跑动距离计算
  const virtualMileage = useMemo(() => {
    if (!hoveredPlayer) return "0.0";
    const seed = parseInt(hoveredPlayer.id.replace(/\D/g, '') || "1");
    const phaseFactor = (battle.phases.indexOf(phase) + 1) * 0.8;
    return (2.5 + seed * 0.2 + phaseFactor).toFixed(1);
  }, [hoveredPlayer, phase, battle]);

  return (
    <div className="bg-[#0a0f14]/80 rounded-[2rem] p-6 md:p-8 border border-white/10 flex flex-col gap-8 backdrop-blur-3xl shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/30 animate-[moveDown_6s_linear_infinite] pointer-events-none z-0"></div>

      <div key={phase.id} className="relative z-10">
        <div className="flex items-center gap-4 mb-5">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">战术核心解码 / TACTICAL DECODER</span>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-blue-500/40 to-transparent"></div>
        </div>
        
        {/* 显著缩小标题字号：text-3xl -> text-4xl */}
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-6 tracking-tighter uppercase leading-none">{phase.title}</h3>
        <div className="pl-6 border-l-2 border-blue-600/60 py-1.5 bg-white/[0.03] rounded-r-2xl">
          <SmartText text={phase.description} />
        </div>
      </div>

      <div className="flex-grow relative z-10">
        <h4 className="text-[10px] font-black text-gray-500 uppercase mb-5 flex items-center gap-3 tracking-[0.4em]">
            <PlayerIcon className="w-4 h-4" /> 目标球员跑动分析模型
        </h4>
        <div className={`bg-[#05080b]/95 rounded-2xl p-6 min-h-[240px] border transition-all duration-700 relative overflow-hidden group ${hoveredPlayer ? 'border-blue-500/60 shadow-[0_0_80px_rgba(59,130,246,0.3)] scale-[1.01]' : 'border-white/10 opacity-70'}`}>
          {hoveredPlayer ? (
            <div className="animate-fade-in">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-[9px] font-black text-blue-500 uppercase tracking-[0.4em] mb-3 italic">锁定目标：SUBJECT_{hoveredPlayer.id.toUpperCase()}</p>
                  <p className="text-3xl lg:text-4xl font-black text-white tracking-tighter leading-none">{hoveredPlayer.name}</p>
                  <p className="text-base font-black text-blue-400 uppercase tracking-[0.3em] mt-3">{hoveredPlayer.role}</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl bg-blue-600/30 border-2 border-blue-500/50 flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform duration-700 mb-1.5">
                       <span className="text-3xl font-black text-blue-400 italic">#{hoveredPlayer.number}</span>
                    </div>
                    <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Live Pos</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-col items-center text-center">
                      <p className="text-[9px] text-gray-500 uppercase font-black mb-1 tracking-widest">累计跑动里程</p>
                      <p className="text-2xl font-black text-white">{virtualMileage} <span className="text-xs text-blue-500 font-bold">KM</span></p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-col items-center text-center">
                      <p className="text-[9px] text-gray-500 uppercase font-black mb-1 tracking-widest">即时最大时速</p>
                      <p className="text-2xl font-black text-white">{(Math.random()*5 + 28).toFixed(1)} <span className="text-xs text-orange-500 font-bold">KM/H</span></p>
                  </div>
              </div>

              <div className="space-y-3">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                      <p className="text-[9px] text-gray-500 uppercase font-black mb-3 tracking-widest">跑动负荷指数 / PERFORMANCE LOAD</p>
                      <div className="flex items-center gap-3">
                          <div className="h-2 flex-grow bg-gray-900 rounded-full overflow-hidden shadow-inner ring-1 ring-white/5">
                              <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-[78%] shadow-[0_0_20px_rgba(59,130,246,0.8)]"></div>
                          </div>
                          <span className="text-xs font-black text-blue-400">OPTIMAL</span>
                      </div>
                  </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-40 py-10">
              <div className="w-14 h-14 rounded-full border-2 border-dashed border-blue-500/40 flex items-center justify-center mb-5 animate-[spin_15s_linear_infinite]">
                  <PlayerIcon className="w-7 h-7 text-blue-500/60" />
              </div>
              <p className="text-base text-gray-500 font-black uppercase tracking-[0.4em] leading-relaxed">
                悬停球员图标<br/>
                <span className="text-[10px] opacity-60 font-medium">激活运动捕捉模型分析</span>
              </p>
            </div>
          )}
          <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none"></div>
        </div>
      </div>

      <div className="bg-blue-600/5 rounded-2xl p-6 border border-blue-500/20 relative z-10 shadow-inner">
          <div className="flex items-center justify-between mb-5">
            <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.5em] flex items-center gap-3">
                <span className="w-1.5 h-4 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]"></span>
                相关战术矩阵
            </h4>
          </div>
          <div className="flex flex-wrap gap-3">
              {GLOSSARY.slice(0, 4).map((term, idx) => (
                  <GlossaryItem key={idx} termObj={term} />
              ))}
          </div>
      </div>
    </div>
  );
};
