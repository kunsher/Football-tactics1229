
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
  isScanning?: boolean;
}

const FootballPitch: React.FC<{ showZones?: boolean; highlightedZone?: string | null; isScanning?: boolean }> = ({ showZones, highlightedZone, isScanning }) => (
  <svg viewBox="0 0 1050 680" className="w-full h-full opacity-95">
    <defs>
      <pattern id="stripes" width="105" height="680" patternUnits="userSpaceOnUse">
        <rect width="52.5" height="680" fill="#1b2e1b" />
        <rect x="52.5" width="52.5" height="680" fill="#243d24" />
      </pattern>
      <pattern id="tacticalGrid" width="42" height="42" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.5" fill="rgba(59, 130, 246, 0.2)" />
      </pattern>
      <linearGradient id="scanGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
        <stop offset="50%" stopColor="rgba(59, 130, 246, 0.4)" />
        <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
      </linearGradient>
    </defs>
    
    <rect width="1050" height="680" fill="url(#stripes)" rx="12" />
    
    {isScanning && (
      <rect width="1050" height="680" fill="url(#tacticalGrid)" className="animate-pulse" />
    )}

    {isScanning && (
      <rect width="1050" height="220" fill="url(#scanGradient)">
        <animate attributeName="y" from="-220" to="680" dur="1.8s" repeatCount="indefinite" />
      </rect>
    )}

    <rect width="1050" height="680" fill="rgba(10, 15, 20, 0.2)" rx="12" pointerEvents="none" />

    {showZones && (
      <g stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="5,5" fill="none">
        <line x1="210" y1="10" x2="210" y2="670" />
        <line x1="420" y1="10" x2="420" y2="670" />
        <line x1="630" y1="10" x2="630" y2="670" />
        <line x1="840" y1="10" x2="840" y2="670" />
        <line x1="10" y1="226" x2="1040" y2="226" />
        <line x1="10" y1="454" x2="1040" y2="454" />
      </g>
    )}

    <g stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none">
      <rect x="10" y="10" width="1030" height="660" />
      <line x1="525" y1="10" x2="525" y2="670" />
      <circle cx="525" cy="340" r="91.5" />
      <rect x="10" y="138.5" width="165" height="403" />
      <rect x="875" y="138.5" width="165" height="403" />
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
        // Updated movement transition to 0.8s with a more natural ease-in-out curve
        transition: `transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1)`,
        willChange: 'transform',
      }}
      onMouseEnter={() => onHover(player)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(player)}
      className="cursor-pointer group"
    >
      {/* Target/Selection Ring - enhanced for hovered state */}
      {(isReceiver || isHovered) && (
          <circle 
            r={isHovered ? "36" : "32"} 
            fill="none" 
            stroke={color} 
            strokeWidth="2" 
            strokeDasharray="6,4" 
            className={`animate-[spin_6s_linear_infinite] transition-all duration-500 ${isHovered ? 'opacity-70 scale-110' : 'opacity-30'}`} 
          />
      )}
      
      {/* Subtle Glow/Aura around player */}
      <circle 
        r="20" 
        fill={color} 
        opacity={isHovered ? "0.3" : "0.05"} 
        className="transition-all duration-500 ease-out group-hover:scale-[2.8]" 
        style={{
           filter: isHovered ? `blur(8px)` : 'none'
        }}
      />
      
      {/* Possession Indicators */}
      {isInPossession && (
        <g>
          <circle r="32" fill="none" stroke={color} strokeWidth="1" strokeDasharray="4,2" className="opacity-40">
             <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle r="26" fill={color} opacity="0.2">
             <animate attributeName="opacity" values="0.1;0.4;0.1" dur="1.2s" repeatCount="indefinite" />
             <animate attributeName="r" values="18;28;18" dur="1.2s" repeatCount="indefinite" />
          </circle>
        </g>
      )}
      
      {/* Main Player Body - Slightly larger on hover with a smooth glow */}
      <circle 
        r={isHovered ? "22" : "16"} 
        fill={color} 
        stroke="#fff" 
        strokeWidth={isHovered ? "4" : "2"}
        className="transition-all duration-500 shadow-2xl"
        style={{
            filter: (isHovered || isInPossession) ? `drop-shadow(0 0 15px ${color})` : 'none',
        }}
      />
      
      {/* Number Text */}
      <text
        y="1" 
        textAnchor="middle" 
        alignmentBaseline="middle"
        fontSize={isHovered ? "15" : "12"} 
        fontWeight="900" 
        fill={parseInt(color.replace('#',''), 16) > 0xaaaaaa ? '#000' : '#fff'}
        className="pointer-events-none select-none transition-all duration-500 font-sans tracking-tighter"
      >
        {player.number}
      </text>
      
      {/* Name Label */}
      <g 
        transform={isHovered ? "translate(0, 42)" : "translate(0, 36)"} 
        className={`transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
      >
         <rect 
            x="-45" y="-10" width="90" height="20" rx="6" 
            fill="rgba(0,0,0,0.85)" 
            stroke="rgba(255,255,255,0.1)"
            className={isHovered ? 'block shadow-2xl' : 'hidden'} 
         />
         <text 
            textAnchor="middle" 
            fill="#fff" 
            fontSize="12" 
            fontWeight="900" 
            className="tracking-tighter uppercase drop-shadow-lg"
         >
            {player.name}
         </text>
      </g>
    </g>
  );
};

export const TacticBoard: React.FC<TacticBoardProps> = ({ 
    homePlayers, awayPlayers, passingNetwork, hoveredPlayer, 
    onPlayerHover, onPlayerClick, homeColor, awayColor,
    animationSpeed = 1.0, isPlaying = false, showZones = false, isScanning = false
}) => {
    // Players move over 0.8 seconds as requested, adjusted by animation speed
    const movementDuration = 0.8 / animationSpeed;

    const ballPath = useMemo(() => {
        if (passingNetwork.connections.length === 0) return null;
        const mainConn = passingNetwork.connections[0];
        const from = homePlayers.find(p => p.id === mainConn.from) || awayPlayers.find(p => p.id === mainConn.from);
        const to = homePlayers.find(p => p.id === mainConn.to) || awayPlayers.find(p => p.id === mainConn.to);
        if (!from || !to) return null;
        return { from, to };
    }, [passingNetwork.connections, homePlayers, awayPlayers]);

    return (
        <div className="w-full aspect-[105/68] max-w-5xl mx-auto relative select-none rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.7)] bg-[#081208]">
            <div className="absolute inset-0">
                <FootballPitch showZones={showZones} isScanning={isScanning} />
            </div>
            
            <svg viewBox="0 0 1050 680" className="w-full h-full relative z-10">
                <defs>
                   <radialGradient id="ballGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#fff" />
                      <stop offset="100%" stopColor="#e2e8f0" />
                   </radialGradient>
                </defs>

                {/* Passing Connections */}
                <g>
                    {passingNetwork.connections.map((conn, i) => {
                        const from = homePlayers.find(p => p.id === conn.from) || awayPlayers.find(p => p.id === conn.from);
                        const to = homePlayers.find(p => p.id === conn.to) || awayPlayers.find(p => p.id === conn.to);
                        if (!from || !to) return null;

                        const isMain = i === 0;
                        const isHovered = hoveredPlayer && (hoveredPlayer.id === conn.from || hoveredPlayer.id === conn.to);
                        const opacity = isMain ? (isPlaying ? 0.15 : 0.5) : (isHovered ? 0.7 : 0.08);
                        const teamColor = homePlayers.some(p => p.id === from.id) ? homeColor : awayColor;

                        return (
                            <line
                                key={`${conn.from}-${conn.to}`}
                                x1={from.x * 10} y1={from.y * 6.7 + 5}
                                x2={to.x * 10} y2={to.y * 6.7 + 5}
                                stroke={teamColor}
                                strokeWidth={isHovered ? 6 : (isMain ? 4 : 2)}
                                strokeOpacity={opacity}
                                strokeDasharray={isMain ? "0" : "10,5"}
                                className="transition-all duration-700"
                            />
                        );
                    })}
                </g>

                {/* Ball Movement */}
                {ballPath && (
                    <circle r="7" fill="url(#ballGlow)" style={{ filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.9))' }}>
                        <animateMotion 
                            dur={`${1.4 / animationSpeed}s`}
                            repeatCount={isPlaying ? "1" : "indefinite"}
                            fill="freeze"
                            path={`M ${ballPath.from.x * 10} ${ballPath.from.y * 6.7 + 5} L ${ballPath.to.x * 10} ${ballPath.to.y * 6.7 + 5}`}
                            calcMode="spline"
                            keySplines="0.4, 0, 0.2, 1"
                        />
                    </circle>
                )}

                {/* Players */}
                {[...awayPlayers, ...homePlayers].map(p => (
                    <Player 
                        key={p.id} player={p} 
                        color={homePlayers.some(hp => hp.id === p.id) ? homeColor : awayColor}
                        onHover={onPlayerHover} onClick={onPlayerClick} 
                        isHovered={hoveredPlayer?.id === p.id} 
                        duration={movementDuration} 
                        isInPossession={ballPath?.from.id === p.id}
                        isReceiver={ballPath?.to.id === p.id}
                    />
                ))}
            </svg>
        </div>
    );
};
