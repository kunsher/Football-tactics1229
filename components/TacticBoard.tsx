
import React from 'react';
import type { PlayerPosition, Connection } from '../types';

interface TacticBoardProps {
  homePlayers: PlayerPosition[];
  awayPlayers: PlayerPosition[];
  passingNetwork: { connections: Connection[] };
  hoveredPlayer: PlayerPosition | null;
  onPlayerHover: (player: PlayerPosition | null) => void;
  onPlayerClick: (player: PlayerPosition) => void; // 新增
  homeColor: string;
  awayColor: string;
}

const FootballPitch: React.FC = () => (
  <svg viewBox="0 0 1050 680" className="w-full h-full opacity-90">
    <defs>
      <pattern id="stripes" width="105" height="680" patternUnits="userSpaceOnUse">
        <rect width="52.5" height="680" fill="#2d4a2d" />
        <rect x="52.5" width="52.5" height="680" fill="#243d24" />
      </pattern>
      <radialGradient id="pitchGradient" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
        <stop offset="0%" stopColor="transparent" stopOpacity="0" />
        <stop offset="100%" stopColor="#0a0f14" stopOpacity="0.5" />
      </radialGradient>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    
    <rect width="1050" height="680" fill="url(#stripes)" rx="10" />
    <rect width="1050" height="680" fill="url(#pitchGradient)" rx="10" pointerEvents="none" />

    <rect x="5" y="5" width="1040" height="670" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" />
    <line x1="525" y1="5" x2="525" y2="675" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" />
    <circle cx="525" cy="340" r="91.5" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" fill="none" />
    
    <line x1="5" y1="138.5" x2="1045" y2="138.5" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="10 5" />
    <line x1="5" y1="541.5" x2="1045" y2="541.5" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="10 5" />

    <rect x="5" y="138.5" width="165" height="403" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" fill="none" />
    <rect x="880" y="138.5" width="165" height="403" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" fill="none" />
  </svg>
);

const Player: React.FC<{ 
    player: PlayerPosition; 
    color: string;
    onHover: (player: PlayerPosition | null) => void; 
    onClick: (player: PlayerPosition) => void;
    isHovered: boolean 
}> = ({ player, color, onHover, onClick, isHovered }) => {
  return (
    <g
      style={{
        transform: `translate(${player.x * 10}px, ${player.y * 6.7 + 5}px)`,
        transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      onMouseEnter={() => onHover(player)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(player)}
      className="cursor-pointer group"
    >
      {isHovered && (
        <circle 
            r="22" 
            fill={color} 
            fillOpacity="0.25" 
            className="animate-pulse" 
            style={{ filter: 'blur(6px)' }}
        />
      )}
      
      <circle 
        r={isHovered ? "18" : "15"} 
        fill={color} 
        stroke="#fff" 
        strokeWidth={isHovered ? "3" : "1.5"}
        className="transition-all duration-300 drop-shadow-lg"
        style={{
            filter: isHovered ? `drop-shadow(0 0 8px ${color})` : 'none'
        }}
      />
      <text
        y="1"
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize={isHovered ? "15" : "12"}
        fontWeight="900"
        fill="#fff"
        className="pointer-events-none select-none transition-all duration-300 font-sans"
      >
        {player.number}
      </text>
      
      {isHovered && (
          <g transform="translate(0, -48)" className="animate-fade-in pointer-events-none">
              <rect x="-65" y="-16" width="130" height="36" rx="8" fill="rgba(10, 15, 20, 0.98)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
              <text y="-2" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="900" className="font-sans tracking-tight">{player.name}</text>
              <text y="11" textAnchor="middle" fill="#3b82f6" fontSize="8" fontWeight="900" className="font-sans tracking-widest uppercase opacity-90">{player.role}</text>
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
    awayColor
}) => {
    return (
        <div className="w-full aspect-[105/68] max-w-5xl mx-auto relative select-none">
            <div className="absolute inset-0 bg-[#1e3a1e] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <FootballPitch />
            </div>
            <svg viewBox="0 0 1050 680" className="w-full h-full relative z-10">
                <g>
                    {passingNetwork.connections.map((conn, i) => {
                        const from = homePlayers.find(p => p.id === conn.from);
                        const to = homePlayers.find(p => p.id === conn.to);
                        if (!from || !to) return null;

                        const isActive = hoveredPlayer && (hoveredPlayer.id === conn.from || hoveredPlayer.id === conn.to);
                        const opacity = isActive ? 0.9 : 0.15;

                        return (
                            <line
                                key={`${conn.from}-${conn.to}`}
                                x1={from.x * 10} y1={from.y * 6.7 + 5}
                                x2={to.x * 10} y2={to.y * 6.7 + 5}
                                stroke="#60a5fa"
                                strokeWidth={isActive ? 4 : 2 + conn.weight / 12}
                                strokeOpacity={opacity}
                                strokeLinecap="round"
                                className="transition-all duration-700 ease-in-out"
                            />
                        );
                    })}
                </g>

                {awayPlayers.map(p => (
                    <Player key={p.id} player={p} color="#111827" onHover={onPlayerHover} onClick={onPlayerClick} isHovered={hoveredPlayer?.id === p.id} />
                ))}
                {homePlayers.map(p => (
                    <Player key={p.id} player={p} color={homeColor} onHover={onPlayerHover} onClick={onPlayerClick} isHovered={hoveredPlayer?.id === p.id} />
                ))}
            </svg>
        </div>
    );
};
