
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
                className="text-blue-400 font-black border-b-2 border-blue-500/50 cursor-help hover:text-blue-300 transition-all px-1.5 rounded-md relative z-10 text-lg md:text-xl"
            >
                {children}
            </span>
            {show && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-[360px] bg-[#0f172a] border-2 border-blue-500/40 p-6 rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.9)] z-[200] animate-fade-in pointer-events-none backdrop-blur-2xl ring-1 ring-white/10">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-[11px] font-black uppercase tracking-[0.2em] rounded-full border border-blue-500/30">
                            {termObj.category === 'System' ? '战术体系' : termObj.category === 'Position' ? '场上位置' : termObj.category === 'Action' ? '技术动作' : '战术阶段'}
                        </span>
                        <div className="h-[1px] flex-grow bg-gradient-to-r from-blue-500/40 to-transparent"></div>
                    </div>
                    
                    <div className="flex items-start gap-4 mb-5">
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
                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest text-center py-2 bg-white/5 border-t border-white/5">动态逻辑演示 / LIVE PREVIEW</p>
                        </div>
                    )}

                    <p className="text-base text-gray-200 leading-relaxed font-bold italic border-l-4 border-blue-500/30 pl-4 py-1">
                        {termObj.definition}
                    </p>
                    
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[2px] border-x-[12px] border-x-transparent border-t-[12px] border-t-blue-500/40"></div>
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
              className="animate-fade-in fill-mode-forwards opacity-0 text-gray-100 font-bold text-lg md:text-xl leading-relaxed"
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
                className="px-5 py-2.5 bg-white/5 rounded-2xl text-sm md:text-base text-gray-300 border border-white/5 hover:border-blue-500/50 hover:bg-blue-500/5 cursor-help transition-all flex items-center gap-3 group font-black uppercase tracking-tight"
            >
                {termObj.icon && <span className="text-xl">{termObj.icon}</span>}
                {termObj.term.split(' (')[0]}
                <InfoIcon className="w-4 h-4 opacity-30 group-hover:opacity-100 transition-opacity text-blue-400" />
            </button>
            {showTooltip && (
                <div className="absolute bottom-full left-0 mb-4 w-[340px] bg-gray-900 border-2 border-blue-500/40 p-6 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-[100] animate-fade-in pointer-events-none ring-1 ring-white/5">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded border border-blue-500/30">
                            {termObj.category}
                        </span>
                        <div className="h-px flex-grow bg-blue-500/20"></div>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        {termObj.icon && (
                            <div className="w-12 h-12 bg-blue-600/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-xl shrink-0">
                                {termObj.icon}
                            </div>
                        )}
                        <p className="text-xl font-black text-white tracking-tight underline decoration-blue-500/30 decoration-2 underline-offset-8">{termObj.term}</p>
                    </div>
                    {termObj.visualEffect && (
                        <div className="mb-4 rounded-xl overflow-hidden bg-black/40 border border-white/5">
                            <TacticalVisualizer type={termObj.visualEffect} size="small" />
                        </div>
                    )}
                    <p className="text-base text-gray-200 leading-relaxed font-bold italic">{termObj.definition}</p>
                </div>
            )}
        </div>
    );
};

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ phase, battle, hoveredPlayer }) => {
  return (
    <div className="bg-gray-900/60 rounded-[2.5rem] p-8 md:p-10 border border-white/10 flex flex-col gap-8 backdrop-blur-xl shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/20 animate-[moveDown_4s_linear_infinite] pointer-events-none z-0"></div>

      <div key={phase.id} className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
            <span className="text-[11px] font-black text-blue-500 uppercase tracking-[0.3em] bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">核心战术扫描 / CORE ANALYSIS</span>
            <div className="h-px flex-grow bg-gradient-to-r from-blue-500/40 to-transparent"></div>
        </div>
        
        <h3 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tighter uppercase">{phase.title}</h3>
        <div className="pl-6 border-l-4 border-blue-600/50 py-2 bg-white/[0.03] rounded-r-[2rem] shadow-inner">
          <SmartText text={phase.description} />
        </div>
      </div>

      <div className="flex-grow relative z-10">
        <h4 className="text-[11px] font-black text-gray-500 uppercase mb-5 flex items-center gap-3 tracking-[0.4em]">
            <PlayerIcon className="w-5 h-5" /> 目标球员同步分析
        </h4>
        <div className={`bg-[#05080b]/90 rounded-[2rem] p-8 min-h-[180px] border transition-all duration-500 relative overflow-hidden group ${hoveredPlayer ? 'border-blue-500/50 shadow-[0_0_50px_rgba(59,130,246,0.2)] scale-[1.01]' : 'border-white/5 opacity-80'}`}>
          {hoveredPlayer ? (
            <div className="animate-fade-in">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-2 italic">锁定目标：OBJECT_{hoveredPlayer.id.toUpperCase()}</p>
                  <p className="text-4xl font-black text-white tracking-tighter leading-none">{hoveredPlayer.name}</p>
                  <p className="text-base font-black text-blue-400 uppercase tracking-[0.2em] mt-3">{hoveredPlayer.role}</p>
                </div>
                <div className="w-16 h-16 rounded-[1.5rem] bg-blue-600/20 border-2 border-blue-500/40 flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform duration-500">
                   <span className="text-3xl font-black text-blue-400 italic">#{hoveredPlayer.number}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                      <p className="text-[10px] text-gray-500 uppercase font-black mb-2 tracking-widest">区域覆盖率</p>
                      <div className="flex items-center gap-3">
                          <div className="h-2 flex-grow bg-gray-800 rounded-full overflow-hidden shadow-inner">
                              <div className="h-full bg-blue-500 w-[88%] shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                          </div>
                          <span className="text-xs font-black text-gray-300">EXTREME</span>
                      </div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                      <p className="text-[10px] text-gray-500 uppercase font-black mb-2 tracking-widest">战术执行载荷</p>
                      <div className="flex items-center gap-3">
                          <div className="h-2 flex-grow bg-gray-800 rounded-full overflow-hidden shadow-inner">
                              <div className="h-full bg-orange-500 w-[95%] shadow-[0_0_10px_rgba(249,115,22,0.8)]"></div>
                          </div>
                          <span className="text-xs font-black text-gray-300">CRITICAL</span>
                      </div>
                  </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-40 py-10">
              <div className="w-14 h-14 rounded-full border-2 border-dashed border-blue-500/30 flex items-center justify-center mb-5 animate-[spin_10s_linear_infinite]">
                  <PlayerIcon className="w-7 h-7 text-blue-500/50" />
              </div>
              <p className="text-base text-gray-500 font-black uppercase tracking-[0.3em] leading-relaxed">悬停球员图标<br/>激活战术神经元实时解码</p>
            </div>
          )}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none"></div>
        </div>
      </div>

      <div className="bg-blue-600/5 rounded-[2rem] p-8 border border-blue-500/20 relative z-10">
          <div className="flex items-center justify-between mb-5">
            <h4 className="text-[11px] font-black text-blue-400 uppercase tracking-[0.4em] flex items-center gap-3">
                <span className="w-2 h-5 bg-blue-500 rounded-full"></span>
                相关战术矩阵
            </h4>
          </div>
          <div className="flex flex-wrap gap-4">
              {GLOSSARY.slice(0, 4).map((term, idx) => (
                  <GlossaryItem key={idx} termObj={term} />
              ))}
          </div>
      </div>
      
      <div className="pt-6 mt-auto border-t border-white/5 flex items-center justify-between opacity-50 relative z-10">
         <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.5em]">SYSTEM_VERSION_4.2.0 / TACTICAL_DECODER</p>
         <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse delay-300"></div>
         </div>
      </div>
    </div>
  );
};
