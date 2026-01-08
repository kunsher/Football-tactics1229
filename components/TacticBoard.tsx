
import React, { useMemo, memo } from 'react';
import type { PlayerPosition, Connection, TacticalAnnotation } from '../types';

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
}

const FootballPitch: React.FC<{ showZones?: boolean }> = memo(({ showZones }) => (
  <svg viewBox="0 0 1050 680" className="w-full h-full opacity-70">
    <defs>
      <pattern id="stripes" width="105" height="680" patternUnits="userSpaceOnUse">
        <rect width="52.5" height="680" fill="#142614" />
        <rect x="52.5" width="52.5" height="680" fill="#1b331b" />
      </pattern>
    </defs>
    <rect width="1050" height="680" fill="url(#stripes)" rx="12" />
    <g stroke="rgba(255,255,255,0.25)" strokeWidth="2.5" fill="none">
      <rect x="10" y="10" width="1030" height="660" />
      <line x1="525" y1="10" x2="525" y2="670" />
      <circle cx="525" cy="340" r="91.5" />
      <rect x="10" y="138.5" width="165" height="403" />
      <rect x="875" y="138.5" width="165" height="403" />
      <circle cx="10" cy="10" r="3" />
      <circle cx="1040" cy="10" r="3" />
      <circle cx="10" cy="670" r="3" />
      <circle cx="1040" cy="670" r="3" />
    </g>
    {showZones && (
      <g stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeDasharray="10,5">
        <line x1="210" y1="10" x2="210" y2="670" />
        <line x1="420" y1="10" x2="420" y2="670" />
        <line x1="630" y1="10" x2="630" y2="670" />
        <line x1="840" y1="10" x2="840" y2="670" />
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
}> = memo(({ player, color, onHover, onClick, isHovered, duration, isInPossession }) => (
  <g
    style={{
      transform: `translate(${player.x * 10}px, ${player.y * 6.7 + 5}px)`,
      transition: `transform ${duration}s linear`,
      willChange: 'transform',
    }}
    onMouseEnter={() => onHover(player)}
    onMouseLeave={() => onHover(null)}
    onClick={() => onClick(player)}
    className="cursor-pointer group"
  >
    {/* 缩小球员半径：基础 16，悬停 20 */}
    <circle 
      r={isHovered ? "20" : "16"} 
      fill={color} 
      stroke={isInPossession ? "#3b82f6" : "rgba(255,255,255,0.6)"} 
      strokeWidth={isInPossession ? "3" : "1.5"} 
      className="transition-all duration-300 shadow-xl"
      style={{ filter: isInPossession ? 'drop-shadow(0 0 10px rgba(59,130,246,1))' : 'none' }}
    />
    
    <text y="1" textAnchor="middle" alignmentBaseline="middle" fontSize={isHovered ? "13" : "10"} fontWeight="900" 
      fill={parseInt(color.replace('#',''), 16) > 0xaaaaaa ? '#000' : '#fff'} 
      className="pointer-events-none select-none transition-all duration-300 font-sans"
    >
      {player.number}
    </text>
    
    <g transform={`translate(0, ${isHovered ? '32' : '28'})`} className={`transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
       <rect x="-40" y="-10" width="80" height="20" rx="6" fill="rgba(0,0,0,0.9)" stroke="rgba(255,255,255,0.1)" />
       <text textAnchor="middle" fill="#fff" fontSize="10" fontWeight="900" className="tracking-tighter uppercase">{player.name}</text>
    </g>
  </g>
));

const AnnotationLayer: React.FC<{ annotations: TacticalAnnotation[] }> = ({ annotations }) => (
  <g>
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="rgba(59, 130, 246, 0.9)" />
      </marker>
    </defs>
    {annotations.map((ann, i) => {
      const key = `${ann.type}-${i}`;
      if (ann.type === 'line') {
        return (
          <path key={key} d={`M ${ann.points.map(p => `${p.x * 10},${p.y * 6.7 + 5}`).join(' L ')}`} 
            fill="none" stroke={ann.color || 'rgba(59, 130, 246, 0.5)'} strokeWidth="2.5" strokeDasharray="6,3" 
            className="animate-fade-in" />
        );
      }
      if (ann.type === 'area') {
        return (
          <polygon key={key} points={ann.points.map(p => `${p.x * 10},${p.y * 6.7 + 5}`).join(' ')} 
            fill={ann.color || "rgba(59, 130, 246, 0.15)"} stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1.5" 
            className="animate-fade-in" />
        );
      }
      if (ann.type === 'arrow' && ann.points.length >= 2) {
        const p1 = ann.points[0];
        const p2 = ann.points[1];
        return (
          <line key={key} x1={p1.x*10} y1={p1.y*6.7+5} x2={p2.x*10} y2={p2.y*6.7+5} 
            stroke="rgba(59, 130, 246, 0.9)" strokeWidth="3" markerEnd="url(#arrowhead)" className="animate-fade-in" />
        );
      }
      if (ann.type === 'focus') {
        const p = ann.points[0];
        return (
          <circle key={key} cx={p.x*10} cy={p.y*6.7+5} r="35" fill="none" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" strokeDasharray="5,5" className="animate-[spin_20s_linear_infinite]" />
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
    annotations = []
}) => {
    // 动画时长：基础 1.4s，随倍速线性缩减
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
        <div className="w-full h-full max-w-6xl aspect-[105/68] relative select-none">
            <div className="absolute inset-0">
                <FootballPitch showZones={showZones} />
            </div>
            <svg viewBox="0 0 1050 680" className="w-full h-full relative z-10">
                <AnnotationLayer annotations={annotations} />
                
                <g>
                    {passingNetwork.connections.map((conn) => {
                        const from = [...homePlayers, ...awayPlayers].find(p => p.id === conn.from);
                        const to = [...homePlayers, ...awayPlayers].find(p => p.id === conn.to);
                        if (!from || !to) return null;
                        const isHovered = hoveredPlayer && (hoveredPlayer.id === conn.from || hoveredPlayer.id === conn.to);
                        return (
                            <line key={`${conn.from}-${conn.to}`} 
                              x1={from.x*10} y1={from.y*6.7+5} 
                              x2={to.x*10} y2={to.y*6.7+5} 
                              stroke="rgba(59, 130, 246, 0.4)" strokeWidth={isHovered ? 3 : 1.2} 
                              strokeDasharray="5,2" />
                        );
                    })}
                </g>

                <circle r="6" fill="#fff" 
                  className="transition-opacity duration-300"
                  style={{ 
                    filter: 'drop-shadow(0 0 8px #fff)',
                    opacity: ballPath ? 1 : 0,
                    pointerEvents: 'none'
                  }}
                >
                  {ballPath && (
                    <animateMotion 
                      dur={`${movementDuration}s`} 
                      repeatCount="indefinite" 
                      path={`M ${ballPath.from.x*10} ${ballPath.from.y*6.7+5} L ${ballPath.to.x*10} ${ballPath.to.y*6.7+5}`} 
                      calcMode="linear" 
                    />
                  )}
                </circle>

                {[...awayPlayers, ...homePlayers].map(p => (
                    <PlayerComponent 
                      key={p.id} 
                      player={p} 
                      color={p.team === 'home' ? homeColor : awayColor} 
                      onHover={onPlayerHover} 
                      onClick={onPlayerClick} 
                      isHovered={hoveredPlayer?.id === p.id} 
                      duration={movementDuration} 
                      isInPossession={ballPath?.from.id === p.id} 
                    />
                ))}
            </svg>
        </div>
    );
};
