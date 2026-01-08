
import React, { useMemo, memo } from 'react';
import type { PlayerPosition, Connection, TacticalAnnotation, TacticPhase } from '../types';

interface TacticBoardProps {
  homePlayers: PlayerPosition[];
  awayPlayers: PlayerPosition[];
  passingNetwork: { connections: Connection[] };
  hoveredPlayer: PlayerPosition | null;
  onPlayerHover: (player: PlayerPosition | null) => void;
  onPlayerClick: (player: PlayerPosition) => void;
  homeColor: string;
  awayColor: string;
  animationSpeed?: number;
  isPlaying?: boolean;
  showZones?: boolean;
  annotations?: TacticalAnnotation[];
  previousPhasePlayers?: { home: PlayerPosition[], away: PlayerPosition[] };
  currentPhase?: TacticPhase; // 新增：用于获取当前比赛时间
  battleTitle?: string; // 比赛名称
}

const FootballPitch: React.FC<{ showZones?: boolean }> = memo(({ showZones }) => (
  <svg viewBox="0 0 1200 680" className="w-full h-full opacity-80">
    <defs>
      <pattern id="stripes" width="120" height="680" patternUnits="userSpaceOnUse">
        <rect width="60" height="680" fill="#142614" />
        <rect x="60" width="60" height="680" fill="#1b331b" />
      </pattern>
    </defs>
    <rect width="1200" height="680" fill="url(#stripes)" rx="16" />
    <g stroke="rgba(255,255,255,0.25)" strokeWidth="3" fill="none">
      <rect x="10" y="10" width="1180" height="660" />
      <line x1="600" y1="10" x2="600" y2="670" />
      <circle cx="600" cy="340" r="100" />
      <rect x="10" y="138.5" width="180" height="403" />
      <rect x="1010" y="138.5" width="180" height="403" />
    </g>
    {showZones && (
      <g stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeDasharray="10,5">
        <line x1="240" y1="10" x2="240" y2="670" />
        <line x1="480" y1="10" x2="480" y2="670" />
        <line x1="720" y1="10" x2="720" y2="670" />
        <line x1="960" y1="10" x2="960" y2="670" />
      </g>
    )}
  </svg>
));

const PlayerComponent: React.FC<{ 
    player: PlayerPosition; 
    color: string;
    onHover: (player: PlayerPosition | null) => void; 
    onClick: (player: PlayerPosition) => void;
    isHovered: boolean;
    duration: number;
    isInPossession: boolean;
    prevPos?: { x: number, y: number };
}> = memo(({ player, color, onHover, onClick, isHovered, duration, isInPossession, prevPos }) => {
  const distance = prevPos ? Math.sqrt(Math.pow(player.x - prevPos.x, 2) + Math.pow(player.y - prevPos.y, 2)) : 0;
  const isMoving = distance > 2;

  return (
    <g
      style={{
        transform: `translate(${player.x * 12}px, ${player.y * 6.7 + 5}px)`,
        transition: `transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1)`,
        willChange: 'transform',
      }}
      onMouseEnter={() => onHover(player)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(player)}
      className="cursor-pointer group"
    >
      {prevPos && isMoving && (
        <line
          x1={(prevPos.x - player.x) * 12}
          y1={(prevPos.y - player.y) * 6.7}
          x2="0"
          y2="0"
          stroke={color}
          strokeWidth="2"
          strokeDasharray="4,2"
          className="opacity-30 animate-pulse"
        />
      )}

      {isMoving && (
        <circle 
          r="22" 
          fill="none" 
          stroke={color} 
          strokeWidth="1" 
          className="animate-ping opacity-20"
          style={{ animationDuration: `${2 / (distance/10)}s` }}
        />
      )}

      <circle 
        r={isHovered ? "22" : "18"} 
        fill={color} 
        stroke={isInPossession ? "#3b82f6" : "rgba(255,255,255,0.7)"} 
        strokeWidth={isInPossession ? "4" : "2"} 
        className="transition-all duration-300 shadow-2xl"
        style={{ filter: isInPossession ? 'drop-shadow(0 0 15px rgba(59,130,246,1))' : 'none' }}
      />
      
      <text y="1" textAnchor="middle" alignmentBaseline="middle" fontSize={isHovered ? "14" : "11"} fontWeight="900" 
        fill={parseInt(color.replace('#',''), 16) > 0xaaaaaa ? '#000' : '#fff'} 
        className="pointer-events-none select-none transition-all duration-300 font-sans"
      >
        {player.number}
      </text>

      {isHovered && isMoving && (
        <g transform="translate(0, -32)">
          <rect x="-25" y="-10" width="50" height="18" rx="4" fill="rgba(0,0,0,0.8)" />
          <text textAnchor="middle" fill="#3b82f6" fontSize="9" fontWeight="900">{(distance * 1.5).toFixed(1)}km/h</text>
        </g>
      )}
      
      <g transform={`translate(0, ${isHovered ? '36' : '32'})`} className={`transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
         <rect x="-50" y="-12" width="100" height="24" rx="8" fill="rgba(0,0,0,0.95)" stroke="rgba(255,255,255,0.15)" />
         <text textAnchor="middle" fill="#fff" fontSize="11" fontWeight="900" className="tracking-tighter uppercase">{player.name}</text>
      </g>
    </g>
  );
});

const AnnotationLayer: React.FC<{ annotations: TacticalAnnotation[] }> = ({ annotations }) => (
  <g>
    <defs>
      <marker id="arrowhead" markerWidth="12" markerHeight="8" refX="0" refY="4" orient="auto">
        <polygon points="0 0, 12 4, 0 8" fill="rgba(59, 130, 246, 1)" />
      </marker>
    </defs>
    {annotations.map((ann, i) => {
      const key = `${ann.type}-${i}`;
      if (ann.type === 'line') {
        return (
          <path key={key} d={`M ${ann.points.map(p => `${p.x * 12},${p.y * 6.7 + 5}`).join(' L ')}`} 
            fill="none" stroke={ann.color || 'rgba(59, 130, 246, 0.6)'} strokeWidth="3" strokeDasharray="8,4" 
            className="animate-fade-in" />
        );
      }
      if (ann.type === 'area') {
        return (
          <polygon key={key} points={ann.points.map(p => `${p.x * 12},${p.y * 6.7 + 5}`).join(' ')} 
            fill={ann.color || "rgba(59, 130, 246, 0.2)"} stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" 
            className="animate-fade-in" />
        );
      }
      if (ann.type === 'arrow' && ann.points.length >= 2) {
        const p1 = ann.points[0];
        const p2 = ann.points[1];
        return (
          <line key={key} x1={p1.x*12} y1={p1.y*6.7+5} x2={p2.x*12} y2={p2.y*6.7+5} 
            stroke="rgba(59, 130, 246, 1)" strokeWidth="4" markerEnd="url(#arrowhead)" className="animate-fade-in" />
        );
      }
      if (ann.type === 'focus') {
        const p = ann.points[0];
        return (
          <circle key={key} cx={p.x*12} cy={p.y*6.7+5} r="45" fill="none" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="3" strokeDasharray="6,6" className="animate-[spin_25s_linear_infinite]" />
        );
      }
      return null;
    })}
  </g>
);

export const TacticBoard: React.FC<TacticBoardProps> = ({ 
    homePlayers, awayPlayers, passingNetwork, hoveredPlayer, 
    onPlayerHover, onPlayerClick, homeColor, awayColor,
    animationSpeed = 1.0, isPlaying = false, showZones = false,
    annotations = [],
    previousPhasePlayers,
    currentPhase
}) => {
    const movementDuration = 1.4 / animationSpeed; 

    const ballPath = useMemo(() => {
        if (!passingNetwork.connections || passingNetwork.connections.length === 0) return null;
        const mainConn = passingNetwork.connections[0];
        const all = [...homePlayers, ...awayPlayers];
        const from = all.find(p => p.id === mainConn.from);
        const to = all.find(p => p.id === mainConn.to);
        return from && to ? { from, to } : null;
    }, [passingNetwork.connections, homePlayers, awayPlayers]);

    return (
        <div className="w-full h-full max-w-7xl aspect-[120/68] relative select-none">
            {/* 比赛实况 HUD */}
            {currentPhase?.matchMinute && (
                <div className="absolute top-6 left-6 z-[100] animate-fade-in pointer-events-none">
                    <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-2 flex items-center gap-4 shadow-2xl">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Live Match Time</span>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_red]"></div>
                                <span className="text-xl font-black text-white font-mono tabular-nums leading-none">{currentPhase.matchMinute}</span>
                            </div>
                        </div>
                        <div className="w-px h-8 bg-white/10"></div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Score Context</span>
                            <span className="text-xl font-black text-blue-400 tracking-tighter leading-none">{currentPhase.matchContext || '0 - 0'}</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="absolute inset-0">
                <FootballPitch showZones={showZones} />
            </div>
            <svg viewBox="0 0 1200 680" className="w-full h-full relative z-10">
                <AnnotationLayer annotations={annotations} />
                
                <g>
                    {passingNetwork.connections.map((conn) => {
                        const from = [...homePlayers, ...awayPlayers].find(p => p.id === conn.from);
                        const to = [...homePlayers, ...awayPlayers].find(p => p.id === conn.to);
                        if (!from || !to) return null;
                        const isHovered = hoveredPlayer && (hoveredPlayer.id === conn.from || hoveredPlayer.id === conn.to);
                        return (
                            <line key={`${conn.from}-${conn.to}`} 
                              x1={from.x*12} y1={from.y*6.7+5} 
                              x2={to.x*12} y2={to.y*6.7+5} 
                              stroke="rgba(59, 130, 246, 0.5)" strokeWidth={isHovered ? 4 : 1.5} 
                              strokeDasharray="6,3" />
                        );
                    })}
                </g>

                <circle r="7" fill="#fff" 
                  className="transition-opacity duration-300"
                  style={{ 
                    filter: 'drop-shadow(0 0 12px #fff)',
                    opacity: ballPath ? 1 : 0,
                    pointerEvents: 'none'
                  }}
                >
                  {ballPath && (
                    <animateMotion 
                      dur={`${movementDuration}s`} 
                      repeatCount="indefinite" 
                      path={`M ${ballPath.from.x*12} ${ballPath.from.y*6.7+5} L ${ballPath.to.x*12} ${ballPath.to.y*6.7+5}`} 
                      calcMode="linear" 
                    />
                  )}
                </circle>

                {homePlayers.map(p => (
                    <PlayerComponent 
                      key={p.id} 
                      player={p} 
                      color={homeColor} 
                      onHover={onPlayerHover} 
                      onClick={onPlayerClick} 
                      isHovered={hoveredPlayer?.id === p.id} 
                      duration={movementDuration} 
                      isInPossession={ballPath?.from.id === p.id} 
                      prevPos={previousPhasePlayers?.home.find(pp => pp.id === p.id)}
                    />
                ))}

                {awayPlayers.map(p => (
                    <PlayerComponent 
                      key={p.id} 
                      player={p} 
                      color={awayColor} 
                      onHover={onPlayerHover} 
                      onClick={onPlayerClick} 
                      isHovered={hoveredPlayer?.id === p.id} 
                      duration={movementDuration} 
                      isInPossession={ballPath?.from.id === p.id} 
                      prevPos={previousPhasePlayers?.away.find(pp => pp.id === p.id)}
                    />
                ))}
            </svg>
        </div>
    );
};
