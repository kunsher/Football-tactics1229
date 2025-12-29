
import React from 'react';
import type { PlayerPosition, Connection } from '../types';

interface TacticBoardProps {
  homePlayers: PlayerPosition[];
  awayPlayers: PlayerPosition[];
  passingNetwork: { connections: Connection[] };
  hoveredPlayer: PlayerPosition | null;
  onPlayerHover: (player: PlayerPosition | null) => void;
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
      {/* 球员发光滤镜 */}
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    
    <rect width="1050" height="680" fill="url(#stripes)" rx="10" />
    <rect width="1050" height="680" fill="url(#pitchGradient)" rx="10" pointerEvents="none" />

    {/* 场地标线 */}
    <rect x="5" y="5" width="1040" height="670" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" />
    <line x1="525" y1="5" x2="525" y2="675" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" />
    <circle cx="525" cy="340" r="91.5" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" fill="none" />
    
    {/* 战术参考线 (肋部) */}
    <line x1="5" y1="138.5" x2="1045" y2="138.5" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="10 5" />
    <line x1="5" y1="541.5" x2="1045" y2="541.5" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="10 5" />

    {/* 禁区 */}
    <rect x="5" y="138.5" width="165" height="403" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" fill="none" />
    <rect x="880" y="138.5" width="165" height="403" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" fill="none" />
  </svg>
);

const Player: React.FC<{ 
    player: PlayerPosition; 
    color: string;
    onHover: (player: PlayerPosition | null) => void; 
    isHovered: boolean 
}> = ({ player, color, onHover, isHovered }) => {
  return (
    <g
      style={{
        transform: `translate(${player.x * 10}px, ${player.y * 6.7 + 5}px)`,
        transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      onMouseEnter={() => onHover(player)}
      onMouseLeave={() => onHover(null)}
      className="cursor-pointer group"
    >
      {/* 悬停时的光晕背景 */}
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
      
      {/* 球员姓名悬浮标签 */}
      {isHovered && (
          <g transform="translate(0, -42)" className="animate-fade-in">
              <rect x="-45" y="-12" width="90" height="22" rx="6" fill="rgba(10, 15, 20, 0.95)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <text textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold" className="font-sans tracking-tight">{player.name}</text>
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
    homeColor,
    awayColor
}) => {
    return (
        <div className="w-full aspect-[105/68] max-w-5xl mx-auto relative select-none">
            <div className="absolute inset-0 bg-[#1e3a1e] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <FootballPitch />
            </div>
            <svg viewBox="0 0 1050 680" className="w-full h-full relative z-10">
                {/* 传球网络 */}
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

                {/* 渲染客队球员 */}
                {awayPlayers.map(p => (
                    <Player key={p.id} player={p} color="#111827" onHover={onPlayerHover} isHovered={hoveredPlayer?.id === p.id} />
                ))}
                {/* 渲染主队球员 */}
                {homePlayers.map(p => (
                    <Player key={p.id} player={p} color={homeColor} onHover={onPlayerHover} isHovered={hoveredPlayer?.id === p.id} />
                ))}
            </svg>
        </div>
    );
};
