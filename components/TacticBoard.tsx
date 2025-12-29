
import React, { useMemo } from 'react';
import type { PlayerPosition, Connection } from '../types';

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
  highlightedZone?: string | null;
}

const FootballPitch: React.FC<{ showZones?: boolean; highlightedZone?: string | null }> = ({ showZones, highlightedZone }) => (
  <svg viewBox="0 0 1050 680" className="w-full h-full opacity-95">
    <defs>
      <pattern id="stripes" width="105" height="680" patternUnits="userSpaceOnUse">
        <rect width="52.5" height="680" fill="#2d4a2d" />
        <rect x="52.5" width="52.5" height="680" fill="#243d24" />
      </pattern>
      <radialGradient id="pitchGradient" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
        <stop offset="0%" stopColor="transparent" stopOpacity="0" />
        <stop offset="100%" stopColor="#0a0f14" stopOpacity="0.4" />
      </radialGradient>
    </defs>
    
    <rect width="1050" height="680" fill="url(#stripes)" rx="12" />
    <rect width="1050" height="680" fill="url(#pitchGradient)" rx="12" pointerEvents="none" />

    {/* 战术防区图层 - 科普核心 */}
    {showZones && (
      <g stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4,4" fill="none">
        {/* 纵向五通道 */}
        <line x1="210" y1="10" x2="210" y2="670" />
        <line x1="420" y1="10" x2="420" y2="670" />
        <line x1="630" y1="10" x2="630" y2="670" />
        <line x1="840" y1="10" x2="840" y2="670" />
        
        {/* 横向分界线 */}
        <line x1="10" y1="226" x2="1040" y2="226" />
        <line x1="10" y1="454" x2="1040" y2="454" />
        
        {/* 14号位高亮 (进攻端核心区域) */}
        <rect 
          x="630" y="226" width="210" height="228" 
          fill={highlightedZone === 'zone14' ? 'rgba(59, 130, 246, 0.1)' : 'transparent'} 
          className="transition-all duration-500"
        />
        
        {/* 肋部 (Half-spaces) 高亮 */}
        <rect 
          x="630" y="10" width="210" height="216" 
          fill={highlightedZone === 'half-space' ? 'rgba(59, 130, 246, 0.05)' : 'transparent'}
        />
        <rect 
          x="630" y="454" width="210" height="216" 
          fill={highlightedZone === 'half-space' ? 'rgba(59, 130, 246, 0.05)' : 'transparent'}
        />
      </g>
    )}

    <g stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none">
      <rect x="10" y="10" width="1030" height="660" />
      <line x1="525" y1="10" x2="525" y2="670" />
      <circle cx="525" cy="340" r="91.5" />
      <circle cx="525" cy="340" r="2" fill="currentColor" />
      <rect x="10" y="138.5" width="165" height="403" />
      <rect x="875" y="138.5" width="165" height="403" />
      <rect x="10" y="248.5" width="55" height="183" />
      <rect x="985" y="248.5" width="55" height="183" />
    </g>
  </svg>
);

const Player: React.FC<{ 
    player: PlayerPosition; 
    color: string;
    onHover: (player: PlayerPosition | null) => void; 
    onClick: (player: PlayerPosition) => void;
    isHovered: boolean;
    duration: number;
    isInPossession: boolean;
    isReceiver: boolean;
}> = ({ player, color, onHover, onClick, isHovered, duration, isInPossession, isReceiver }) => {
  return (
    <g
      style={{
        transform: `translate(${player.x * 10}px, ${player.y * 6.7 + 5}px)`,
        transition: `transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1)`,
        willChange: 'transform',
      }}
      onMouseEnter={() => onHover(player)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(player)}
      className="cursor-pointer group"
    >
      {/* 接球光圈提示 */}
      {isReceiver && (
          <circle r="35" fill="none" stroke={color} strokeWidth="1" strokeDasharray="4,4" className="animate-[spin_4s_linear_infinite] opacity-40" />
      )}
      
      {/* 底部光环 */}
      <circle 
        r={isInPossession ? "26" : isHovered ? "22" : "18"} 
        fill={color} 
        fillOpacity={isInPossession ? "0.4" : isHovered ? "0.3" : "0.1"} 
        className={`${isInPossession ? 'animate-pulse' : ''} transition-all duration-500`}
      />
      
      <circle 
        r={isHovered ? "18" : "14"} 
        fill={color} 
        stroke="#fff" 
        strokeWidth={isHovered ? "3" : "2"}
        className="transition-all duration-300 shadow-xl"
        style={{
            filter: (isHovered || isInPossession) ? `drop-shadow(0 0 12px ${color})` : 'none'
        }}
      />
      
      <text
        y="1"
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize={isHovered ? "14" : "11"}
        fontWeight="900"
        fill="#fff"
        className="pointer-events-none select-none transition-all duration-300 font-sans"
      >
        {player.number}
      </text>
      
      {(isHovered || isInPossession) && (
          <g transform="translate(0, -42)" className="animate-fade-in pointer-events-none">
              <rect x="-65" y="-14" width="130" height="28" rx="14" fill="rgba(10, 15, 20, 0.98)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <path d="M-5 14 L0 19 L5 14 Z" fill="rgba(10, 15, 20, 0.98)" />
              
              <g transform="translate(-50, 0)">
                <circle r="4" fill={color} className="animate-role-pulse" />
                <circle r="6" fill="none" stroke={color} strokeWidth="1" className="animate-role-ping" />
              </g>

              <text x="5" y="0.5" textAnchor="middle" alignmentBaseline="middle" fill="#fff" fontSize="11" fontWeight="800" className="font-sans tracking-tight">
                <tspan fill={color} fontWeight="900">#{player.number}</tspan> {player.name}
              </text>
          </g>
      )}
    </g>
  );
};

export const TacticBoard: React.FC<TacticBoardProps> = ({ 
    homePlayers, 
    awayPlayers, 
    passingNetwork, 
    hoveredPlayer, 
    onPlayerHover,
    onPlayerClick,
    homeColor,
    awayColor,
    animationSpeed = 1.0,
    isPlaying = false,
    showZones = false,
    highlightedZone = null
}) => {
    const movementDuration = 0.8 / animationSpeed;

    const ballPath = useMemo(() => {
        if (passingNetwork.connections.length === 0) return null;
        const mainConn = passingNetwork.connections[0];
        const from = homePlayers.find(p => p.id === mainConn.from) || awayPlayers.find(p => p.id === mainConn.from);
        const to = homePlayers.find(p => p.id === mainConn.to) || awayPlayers.find(p => p.id === mainConn.to);
        if (!from || !to) return null;
        return { from, to };
    }, [passingNetwork.connections, homePlayers, awayPlayers]);

    const ballPossessorId = ballPath?.from.id;
    const receiverId = ballPath?.to.id;

    return (
        <div className="w-full aspect-[105/68] max-w-5xl mx-auto relative select-none">
            <div className="absolute inset-0 bg-[#1e3a1e] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <FootballPitch showZones={showZones} highlightedZone={highlightedZone} />
            </div>
            
            <svg viewBox="0 0 1050 680" className="w-full h-full relative z-10">
                <defs>
                    <filter id="ballGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                <g>
                    {passingNetwork.connections.map((conn, i) => {
                        const from = homePlayers.find(p => p.id === conn.from) || awayPlayers.find(p => p.id === conn.from);
                        const to = homePlayers.find(p => p.id === conn.to) || awayPlayers.find(p => p.id === conn.to);
                        if (!from || !to) return null;

                        const isMain = i === 0;
                        const isHovered = hoveredPlayer && (hoveredPlayer.id === conn.from || hoveredPlayer.id === conn.to);
                        const opacity = isMain ? (isPlaying ? 0.3 : 0.8) : (isHovered ? 0.9 : 0.1);
                        const strokeWidth = isHovered ? 6 : (isMain ? 4 : 2);

                        return (
                            <g key={`${conn.from}-${conn.to}`}>
                                <line
                                    x1={from.x * 10} y1={from.y * 6.7 + 5}
                                    x2={to.x * 10} y2={to.y * 6.7 + 5}
                                    stroke={homePlayers.some(p => p.id === from.id) ? homeColor : awayColor}
                                    strokeWidth={strokeWidth}
                                    strokeOpacity={opacity}
                                    strokeLinecap="round"
                                    className="transition-all duration-700"
                                />
                            </g>
                        );
                    })}
                </g>

                {ballPath && (
                    <g>
                        <circle r="6" fill="#fff" filter="url(#ballGlow)">
                            <animateMotion 
                                dur={`${(isPlaying ? 2.2 : 2) / animationSpeed}s`}
                                repeatCount={isPlaying ? "1" : "indefinite"}
                                fill="freeze"
                                path={`M ${ballPath.from.x * 10} ${ballPath.from.y * 6.7 + 5} L ${ballPath.to.x * 10} ${ballPath.to.y * 6.7 + 5}`}
                                calcMode="spline"
                                keySplines="0.4 0 0.2 1"
                                key="segment-ball-anim"
                            />
                        </circle>
                    </g>
                )}

                {awayPlayers.map(p => (
                    <Player 
                        key={p.id} player={p} color={awayColor} 
                        onHover={onPlayerHover} onClick={onPlayerClick} 
                        isHovered={hoveredPlayer?.id === p.id} 
                        duration={movementDuration} 
                        isInPossession={ballPossessorId === p.id}
                        isReceiver={receiverId === p.id}
                    />
                ))}
                {homePlayers.map(p => (
                    <Player 
                        key={p.id} player={p} color={homeColor} 
                        onHover={onPlayerHover} onClick={onPlayerClick} 
                        isHovered={hoveredPlayer?.id === p.id} 
                        duration={movementDuration} 
                        isInPossession={ballPossessorId === p.id}
                        isReceiver={receiverId === p.id}
                    />
                ))}
            </svg>
        </div>
    );
};
