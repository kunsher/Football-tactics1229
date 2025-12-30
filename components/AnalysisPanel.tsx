
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
                className="text-blue-400 font-bold border-b-2 border-blue-500/30 cursor-help hover:text-blue-300 transition-all px-1 rounded-sm relative z-10"
            >
                {children}
            </span>
            {show && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-[320px] bg-[#0f172a] border border-blue-500/30 p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-[200] animate-fade-in pointer-events-none backdrop-blur-xl">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.1em] rounded-full border border-blue-500/30">
                            {termObj.category === 'System' ? '战术体系' : termObj.category === 'Position' ? '场上位置' : termObj.category === 'Action' ? '技术动作' : '战术阶段'}
                        </span>
                        <div className="h-[1px] flex-grow bg-gradient-to-r from-blue-500/40 to-transparent"></div>
                    </div>
                    <div className="flex items-start gap-3 mb-4">
                        {termObj.icon && (
                            <div className="w-10 h-10 shrink-0 bg-blue-600/10 rounded-xl border border-blue-500/20 flex items-center justify-center text-xl shadow-inner">
                                {termObj.icon}
                            </div>
                        )}
                        <p className="text-base font-black text-white tracking-tight">{termObj.term}</p>
                    </div>

                    {termObj.visualEffect && (
                        <div className="mb-4">
                            <TacticalVisualizer type={termObj.visualEffect} />
                            <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest text-center mt-2 opacity-60">动态战术演示 / VISUAL PREVIEW</p>
                        </div>
                    )}

                    <p className="text-sm text-gray-300 leading-relaxed font-medium">
                        {termObj.definition}
                    </p>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-x-[10px] border-x-transparent border-t-[10px] border-t-blue-500/30"></div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[2px] border-x-[10px] border-x-transparent border-t-[10px] border-t-[#0f172a]"></div>
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
      <div className="space-y-2">
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
            <p 
              key={sIdx} 
              className="animate-fade-in fill-mode-forwards opacity-0 text-gray-300 font-medium"
              style={{ animationDelay: `${sIdx * 0.15}s`, animationFillMode: 'forwards' }}
            >
              {parts}
            </p>
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
                className="px-4 py-2 bg-white/5 rounded-xl text-sm text-gray-300 border border-white/5 hover:border-blue-500/50 hover:bg-blue-500/5 cursor-help transition-all flex items-center gap-2 group"
            >
                {termObj.icon && <span className="text-sm">{termObj.icon}</span>}
                {termObj.term}
                <InfoIcon className="w-4 h-4 opacity-30 group-hover:opacity-100 transition-opacity" />
            </button>
            {showTooltip && (
                <div className="absolute bottom-full left-0 mb-3 w-[320px] bg-gray-900 border-2 border-blue-500/40 p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[100] animate-fade-in pointer-events-none">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest rounded border border-blue-500/30">
                            {termObj.category === 'System' ? '战术体系' : termObj.category === 'Position' ? '场上位置' : termObj.category === 'Action' ? '技术动作' : '战术阶段'}
                        </span>
                        <div className="h-px flex-grow bg-blue-500/20"></div>
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                        {termObj.icon && (
                            <div className="w-10 h-10 bg-blue-600/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-xl shrink-0">
                                {termObj.icon}
                            </div>
                        )}
                        <p className="text-base font-bold text-white tracking-tight underline decoration-blue-500/30 decoration-2 underline-offset-4">{termObj.term}</p>
                    </div>

                    {termObj.visualEffect && (
                        <div className="mb-4">
                            <TacticalVisualizer type={termObj.visualEffect} />
                        </div>
                    )}

                    <p className="text-sm text-gray-200 leading-relaxed font-medium">{termObj.definition}</p>
                    <div className="absolute top-full left-6 -mt-[2px] border-x-[8px] border-x-transparent border-t-[8px] border-t-blue-500/40"></div>
                    <div className="absolute top-full left-6 -mt-[4px] border-x-[8px] border-x-transparent border-t-[8px] border-t-gray-900"></div>
                </div>
            )}
        </div>
    );
};

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ phase, battle, hoveredPlayer }) => {
  return (
    <div className="bg-gray-900/60 rounded-2xl p-6 border border-white/10 flex flex-col gap-6 backdrop-blur-xl shadow-2xl">
      <div key={phase.id}>
        <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">实时战术解码单元</span>
            <div className="h-px flex-grow bg-gradient-to-r from-blue-500/40 to-transparent"></div>
        </div>
        
        <h3 className="text-2xl font-black text-white mb-3 tracking-tight transition-all duration-500">{phase.title}</h3>
        <div className="text-base text-gray-300 leading-relaxed pl-4 border-l-2 border-blue-600/50 italic py-1 bg-white/[0.02] rounded-r-xl">
          <SmartText text={phase.description} />
        </div>
      </div>

      <div className="flex-grow">
        <h4 className="text-xs font-black text-gray-500 uppercase mb-4 flex items-center gap-2 tracking-widest">
            <PlayerIcon className="w-4 h-4" /> 球员战术考察报告
        </h4>
        <div className={`bg-[#05080b] rounded-2xl p-5 min-h-[140px] border transition-all duration-500 relative overflow-hidden group ${hoveredPlayer ? 'border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.1)] scale-[1.02]' : 'border-white/5 opacity-80'}`}>
          {hoveredPlayer ? (
            <div className="animate-fade-in relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">正在锁定扫描对象</p>
                  <p className="text-3xl font-black text-white tracking-tighter">{hoveredPlayer.name}</p>
                  <p className="text-sm font-bold text-blue-400 uppercase tracking-tighter mt-1">{hoveredPlayer.role}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center shadow-lg">
                   <span className="text-2xl font-black text-blue-400 italic">#{hoveredPlayer.number}</span>
                </div>
              </div>
              
              <div className="mt-5 grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-3 border border-white/5 group-hover:bg-white/10 transition-colors">
                      <p className="text-[9px] text-gray-500 uppercase font-black mb-1 tracking-widest">执行区域</p>
                      <p className="text-sm text-gray-200 font-bold">{hoveredPlayer.position}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 border border-white/5 group-hover:bg-white/10 transition-colors">
                      <p className="text-[9px] text-gray-500 uppercase font-black mb-1 tracking-widest">所属阵营</p>
                      <p className="text-sm text-gray-200 font-bold">{hoveredPlayer.team === 'home' ? battle.teams.home.name : battle.teams.away.name}</p>
                  </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-40 py-4">
              <InfoIcon className="w-10 h-10 mb-3 text-gray-600" />
              <p className="text-sm text-gray-500 font-bold uppercase tracking-[0.2em]">悬停于球员图标<br/>同步战术职责分析</p>
            </div>
          )}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        </div>
      </div>

      <div className="bg-blue-600/5 rounded-2xl p-6 border border-blue-500/15">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-[11px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-4 bg-blue-500 rounded-full"></span>
                核心术语百科
            </h4>
            <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">悬停交互以学习</span>
          </div>
          <div className="flex flex-wrap gap-3">
              {GLOSSARY.map((term, idx) => (
                  <GlossaryItem key={idx} termObj={term} />
              ))}
          </div>
      </div>
      
      <div className="pt-4 mt-auto border-t border-white/5 flex items-center justify-between opacity-50">
         <p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.3em]">Tactical Engine V4.2 / AI Decoder</p>
         <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse delay-100"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse delay-200"></div>
         </div>
      </div>
    </div>
  );
};
