
import React, { useState, useRef } from 'react';
import { InfoIcon } from './icons';

interface SandboxPlayer {
  id: string;
  x: number;
  y: number;
  number: number;
  name: string;
  team: 'home' | 'away';
}

interface TacticalLine {
  fromId: string;
  toId: string;
}

const FORMATION_PRESETS: Record<string, { x: number; y: number }[]> = {
  '4-3-3': [
    { x: 5, y: 50 }, { x: 28, y: 88 }, { x: 15, y: 62 }, { x: 15, y: 38 }, { x: 28, y: 12 },
    { x: 32, y: 50 }, { x: 45, y: 65 }, { x: 45, y: 35 }, { x: 55, y: 82 }, { x: 55, y: 50 }, { x: 55, y: 18 }
  ],
  '4-4-2': [
    { x: 5, y: 50 }, { x: 25, y: 85 }, { x: 20, y: 60 }, { x: 20, y: 40 }, { x: 25, y: 15 },
    { x: 50, y: 80 }, { x: 45, y: 55 }, { x: 45, y: 45 }, { x: 50, y: 20 }, { x: 80, y: 60 }, { x: 80, y: 40 }
  ],
  '3-5-2': [
    { x: 5, y: 50 }, { x: 20, y: 70 }, { x: 18, y: 50 }, { x: 20, y: 30 }, { x: 45, y: 90 },
    { x: 50, y: 65 }, { x: 40, y: 50 }, { x: 50, y: 35 }, { x: 45, y: 10 }, { x: 80, y: 60 }, { x: 80, y: 40 }
  ]
};

// 完全同步战役复盘的球场样式
const SandboxPitch: React.FC<{ activeZones: string[] }> = ({ activeZones }) => (
  <svg viewBox="0 0 1050 680" className="w-full h-full opacity-95">
    <defs>
      <pattern id="sandboxStripes" width="105" height="680" patternUnits="userSpaceOnUse">
        <rect width="52.5" height="680" fill="#1b2e1b" />
        <rect x="52.5" width="52.5" height="680" fill="#243d24" />
      </pattern>
    </defs>
    
    <rect width="1050" height="680" fill="url(#sandboxStripes)" rx="12" />
    
    {/* 战术区域格子渲染 */}
    <g>
      {[0, 1, 2, 3, 4].map(col => [0, 1, 2].map(row => {
        const zoneId = `z-${col}-${row}`;
        const isActive = activeZones.includes(zoneId);
        return (
          <rect
            key={zoneId}
            x={col * 210} y={row * 226.6} width="210" height="226.6"
            fill={isActive ? 'rgba(59, 130, 246, 0.25)' : 'transparent'}
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="1"
            className="transition-colors duration-500"
          />
        );
      }))}
    </g>

    <g stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none">
      <rect x="10" y="10" width="1030" height="660" />
      <line x1="525" y1="10" x2="525" y2="670" />
      <circle cx="525" cy="340" r="91.5" />
      <rect x="10" y="138.5" width="165" height="403" />
      <rect x="875" y="138.5" width="165" height="403" />
    </g>
  </svg>
);

export const TacticalSandbox: React.FC = () => {
  const [players, setPlayers] = useState<SandboxPlayer[]>(
    FORMATION_PRESETS['4-3-3'].map((pos, i) => ({
      id: `h-${i}`, ...pos, number: i + 1, name: `球员 ${i + 1}`, team: 'home'
    }))
  );
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [lineStartPlayerId, setLineStartPlayerId] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<'move' | 'line' | 'zone'>('move');
  const [tacticalLines, setTacticalLines] = useState<TacticalLine[]>([]);
  const [activeZones, setActiveZones] = useState<string[]>([]);
  const [tacticalNote, setTacticalNote] = useState('在此输入您的战术推演核心逻辑...');
  const pitchRef = useRef<HTMLDivElement>(null);

  const applyFormation = (name: string) => {
    const preset = FORMATION_PRESETS[name];
    setPlayers(preset.map((pos, i) => ({
      id: `h-${i}`, ...pos, number: i + 1, name: `球员 ${i + 1}`, team: 'home'
    })));
    setTacticalLines([]);
    setActiveZones([]);
  };

  const handlePlayerClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeTool === 'line') {
      if (!lineStartPlayerId) {
        setLineStartPlayerId(id);
      } else if (lineStartPlayerId !== id) {
        setTacticalLines(prev => [...prev, { fromId: lineStartPlayerId, toId: id }]);
        setLineStartPlayerId(null);
      } else {
        setLineStartPlayerId(null);
      }
    }
  };

  const handleMouseDown = (id: string) => {
    if (activeTool === 'move') setSelectedPlayerId(id);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (selectedPlayerId && activeTool === 'move' && pitchRef.current) {
      const rect = pitchRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
      setPlayers(prev => prev.map(p => p.id === selectedPlayerId ? { ...p, x, y } : p));
    }
  };

  const handleMouseUp = () => {
    setSelectedPlayerId(null);
  };

  const toggleZone = (zoneId: string) => {
    setActiveZones(prev => prev.includes(zoneId) ? prev.filter(z => z !== zoneId) : [...prev, zoneId]);
  };

  return (
    <div className="w-full flex flex-col gap-8 animate-fade-in max-w-7xl mx-auto py-4">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900/40 to-[#0a0f14] border border-blue-500/20 rounded-[2.5rem] p-12 relative overflow-hidden group shadow-2xl">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
             <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
             <span className="text-blue-400 font-black text-xs uppercase tracking-[0.4em]">Tactical Creator Mode</span>
          </div>
          <h2 className="text-5xl font-black text-white mb-4 tracking-tighter leading-none">战术沙盒实验室 <span className="text-blue-500">BETA</span></h2>
          <p className="text-xl text-gray-400 max-w-2xl font-medium italic opacity-80">
            “ 自由重构空间，推演胜负逻辑。在这里，每个灵感都是通往胜利的蓝图。”
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Toolbar */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 space-y-8">
            <div>
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] mb-4">创作工具 / TOOLS</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'move', label: '选择', icon: '🎯' },
                  { id: 'line', label: '连线', icon: '↗️' },
                  { id: 'zone', label: '防区', icon: '🎨' },
                ].map(tool => (
                  <button
                    key={tool.id}
                    onClick={() => {
                        setActiveTool(tool.id as any);
                        setLineStartPlayerId(null);
                    }}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                      activeTool === tool.id 
                        ? 'bg-blue-600 border-blue-400 shadow-lg text-white' 
                        : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-xl">{tool.icon}</span>
                    <span className="text-[10px] font-black uppercase">{tool.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] mb-4">预设阵型 / FORMATIONS</p>
              <div className="space-y-2">
                {Object.keys(FORMATION_PRESETS).map(name => (
                  <button
                    key={name}
                    onClick={() => applyFormation(name)}
                    className="w-full py-3 bg-white/5 border border-white/5 rounded-xl text-xs font-black text-gray-300 uppercase tracking-widest hover:bg-blue-600/20 hover:border-blue-500/30 transition-all flex items-center justify-center gap-3"
                  >
                    {name} <span className="text-[10px] opacity-40">AUTO-LAYOUT</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] mb-4">战术备注 / BRIEFING</p>
              <textarea 
                value={tacticalNote}
                onChange={(e) => setTacticalNote(e.target.value)}
                className="w-full h-40 bg-[#05080b] border border-white/10 rounded-xl p-4 text-xs text-gray-400 font-medium leading-relaxed resize-none focus:outline-none focus:border-blue-500/50 transition-all italic"
              />
            </div>
          </div>
          
          <div className="p-6 bg-blue-600/10 border border-blue-500/20 rounded-3xl">
             <div className="flex items-center gap-2 mb-3">
                <InfoIcon className="w-4 h-4 text-blue-400" />
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">当前工具指令</span>
             </div>
             <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                {activeTool === 'move' && '拖动球员图标以调整位置。'}
                {activeTool === 'line' && '依次点击两名球员，在他们之间建立战术传导连线。'}
                {activeTool === 'zone' && '点击草地区域以标记战术关键点或重点防区。'}
             </p>
          </div>
        </div>

        {/* Sandbox Canvas */}
        <div className="lg:col-span-9 bg-black/40 rounded-[3rem] border border-white/10 p-10 relative overflow-hidden group shadow-2xl flex flex-col gap-6">
          <div 
            ref={pitchRef}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className="w-full aspect-[105/68] rounded-2xl border-2 border-white/10 relative overflow-hidden shadow-inner bg-[#081208]"
          >
            <div className="absolute inset-0 pointer-events-none">
              <SandboxPitch activeZones={activeZones} />
            </div>

            {/* Tactical Lines Overlay - 关键修复：preserveAspectRatio="none" 确保 0-100 坐标与容器完全对齐 */}
            <svg 
              viewBox="0 0 100 100" 
              preserveAspectRatio="none" 
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
            >
              <g>
                {tacticalLines.map((line, i) => {
                  const from = players.find(p => p.id === line.fromId);
                  const to = players.find(p => p.id === line.toId);
                  if (!from || !to) return null;
                  return (
                    <line 
                      key={i} 
                      x1={from.x} y1={from.y} x2={to.x} y2={to.y} 
                      stroke="rgba(59, 130, 246, 0.6)" 
                      strokeWidth="0.8" 
                      strokeDasharray="2,1"
                      className="animate-pulse"
                    />
                  );
                })}
              </g>
            </svg>

            {/* 防区点击交互层 - z-index 提升至球员下方但高于草地 */}
            {activeTool === 'zone' && (
              <div className="absolute inset-0 z-[15]">
                <svg viewBox="0 0 1050 680" className="w-full h-full">
                    {[0, 1, 2, 3, 4].map(col => [0, 1, 2].map(row => (
                        <rect
                            key={`click-${col}-${row}`}
                            x={col * 210} y={row * 226.6} width="210" height="226.6"
                            fill="transparent"
                            className="cursor-pointer hover:fill-blue-500/5 transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleZone(`z-${col}-${row}`);
                            }}
                        />
                    )))}
                </svg>
              </div>
            )}

            {/* Players - 百分比定位，与 preserveAspectRatio="none" 的 SVG 坐标完美匹配 */}
            {players.map(p => (
              <div
                key={p.id}
                onMouseDown={() => handleMouseDown(p.id)}
                onClick={(e) => handlePlayerClick(p.id, e)}
                style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)' }}
                className={`absolute w-10 h-10 rounded-full flex items-center justify-center cursor-move border-2 transition-transform duration-200 select-none group/player ${
                  selectedPlayerId === p.id || lineStartPlayerId === p.id 
                    ? 'scale-125 z-50 border-white shadow-[0_0_20px_white]' 
                    : 'border-white/40 hover:scale-110 z-30'
                } ${p.team === 'home' ? 'bg-blue-600 shadow-lg shadow-blue-600/30' : 'bg-red-600'}`}
              >
                {/* 缩小光晕反馈 (Aura) */}
                <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover/player:scale-[1.3] transition-transform duration-500 blur-sm pointer-events-none"></div>
                
                <span className="text-[10px] font-black text-white relative z-10">{p.number}</span>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-0.5 rounded text-[8px] font-black text-gray-300 uppercase opacity-0 group-hover/player:opacity-100 transition-opacity whitespace-nowrap border border-white/5 z-20">
                  {p.name}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center px-4 pt-2 border-t border-white/5">
             <div className="flex gap-6">
                <div>
                   <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">活跃对象</p>
                   <p className="text-xl font-black text-white">{players.length + tacticalLines.length} <span className="text-xs text-blue-500 font-bold ml-1">UNITS</span></p>
                </div>
                <div className="w-px h-10 bg-white/5"></div>
                <div>
                   <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">创作状态</p>
                   <p className="text-xl font-black text-orange-400 uppercase">{activeTool === 'move' ? '布阵中' : activeTool === 'line' ? '建立传导' : '防区规划'}</p>
                </div>
             </div>
             
             <div className="flex gap-4">
                <button 
                  onClick={() => { setTacticalLines([]); setActiveZones([]); }}
                  className="px-6 py-2 bg-white/5 hover:bg-red-500/10 text-gray-500 hover:text-red-400 text-[10px] font-black uppercase tracking-widest rounded-xl border border-white/5 transition-all"
                >
                  重置图层
                </button>
                <button 
                  onClick={() => { setPlayers([]); setTacticalLines([]); setActiveZones([]); }}
                  className="px-6 py-2 bg-red-600/10 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-xl border border-red-500/30 hover:bg-red-600 hover:text-white transition-all"
                >
                  清除全部
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
