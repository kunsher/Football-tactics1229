
import React, { useMemo, useEffect, useState } from 'react';
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
}

const FootballPitch: React.FC = () => (
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

    {/* Pitch Lines */}
    <g stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none">
      <rect x="10" y="10" width="1030" height="660" />
      <line x1="525" y1="10" x2="525" y2="670" />
      <circle cx="525" cy="340" r="91.5" />
      <circle cx="525" cy="340" r="2" fill="currentColor" />
      
      {/* Penalty Areas */}
      <rect x="10" y="138.5" width="165" height="403" />
      <rect x="875" y="138.5" width="165" height="403" />
      
      {/* Goal Areas */}
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
}> = ({ player, color, onHover, onClick, isHovered, duration }) => {
  return (
    <g
      style={{
        transform: `translate(${player.x * 10}px, ${player.y * 6.7 + 5}px)`,
        transition: `transform ${duration}s cubic-bezier(0.34, 1.56, 0.64, 1)`
      }}
      onMouseEnter={() => onHover(player)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(player)}
      className="cursor-pointer group"
    >
      {/* 底部光环 */}
      <circle 
        r={isHovered ? "24" : "18"} 
        fill={color} 
        fillOpacity={isHovered ? "0.3" : "0.1"} 
        className="transition-all duration-500"
      />
      
      {/* 球员主体 */}
      <circle 
        r={isHovered ? "18" : "14"} 
        fill={color} 
        stroke="#fff" 
        strokeWidth={isHovered ? "3" : "2"}
        className="transition-all duration-300 shadow-xl"
        style={{
            filter: isHovered ? `drop-shadow(0 0 12px ${color})` : 'none'
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
      
      {/* 球员名签 */}
      {isHovered && (
          <g transform="translate(0, -42)" className="animate-fade-in pointer-events-none">
              <rect x="-55" y="-12" width="110" height="24" rx="12" fill="rgba(10, 15, 20, 0.98)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <path d="M-4 12 L0 16 L4 12 Z" fill="rgba(10, 15, 20, 0.98)" />
              <text y="4.5" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="800" className="font-sans tracking-tight">
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
    animationSpeed = 1.0
}) => {
    const dynamicDuration = 0.8 / animationSpeed;

    // 找到当前阶段最权重的传球路径作为“模拟皮球”的轨迹
    const ballPath = useMemo(() => {
        if (passingNetwork.connections.length === 0) return null;
        const mainConn = [...passingNetwork.connections].sort((a, b) => b.weight - a.weight)[0];
        const from = homePlayers.find(p => p.id === mainConn.from);
        const to = homePlayers.find(p => p.id === mainConn.to);
        if (!from || !to) return null;
        return { from, to };
    }, [passingNetwork.connections, homePlayers]);

    return (
        <div className="w-full aspect-[105/68] max-w-5xl mx-auto relative select-none">
            <div className="absolute inset-0 bg-[#1e3a1e] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <FootballPitch />
            </div>
            
            <svg viewBox="0 0 1050 680" className="w-full h-full relative z-10">
                <defs>
                    <linearGradient id="passGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="white" stopOpacity="0" />
                        <stop offset="50%" stopColor="white" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                    <mask id="passMask">
                        <rect width="100%" height="100%" fill="white" />
                    </mask>
                </defs>

                {/* 传球网络层 */}
                <g>
                    {passingNetwork.connections.map((conn, i) => {
                        const from = homePlayers.find(p => p.id === conn.from);
                        const to = homePlayers.find(p => p.id === conn.to);
                        if (!from || !to) return null;

                        const isActive = hoveredPlayer && (hoveredPlayer.id === conn.from || hoveredPlayer.id === conn.to);
                        const opacity = isActive ? 0.9 : 0.2;
                        const strokeWidth = isActive ? 5 : 2 + conn.weight / 12;

                        return (
                            <g key={`${conn.from}-${conn.to}`}>
                                {/* 基础路径 */}
                                <line
                                    x1={from.x * 10} y1={from.y * 6.7 + 5}
                                    x2={to.x * 10} y2={to.y * 6.7 + 5}
                                    stroke={homeColor}
                                    strokeWidth={strokeWidth}
                                    strokeOpacity={opacity}
                                    strokeLinecap="round"
                                    className="transition-all duration-700"
                                />
                                {/* 动态流光效果 */}
                                {isActive && (
                                    <line
                                        x1={from.x * 10} y1={from.y * 6.7 + 5}
                                        x2={to.x * 10} y2={to.y * 6.7 + 5}
                                        stroke="rgba(255,255,255,0.6)"
                                        strokeWidth={strokeWidth}
                                        strokeDasharray="10, 20"
                                        className="animate-[dash_2s_linear_infinite]"
                                    />
                                )}
                            </g>
                        );
                    })}
                </g>

                {/* 模拟皮球动画 */}
                {ballPath && (
                    <circle r="5" fill="#fff" className="shadow-lg">
                        <animateMotion 
                            dur={`${2 / animationSpeed}s`}
                            repeatCount="indefinite"
                            path={`M ${ballPath.from.x * 10} ${ballPath.from.y * 6.7 + 5} L ${ballPath.to.x * 10} ${ballPath.to.y * 6.7 + 5}`}
                            calcMode="spline"
                            keySplines="0.4 0 0.2 1"
                        />
                        <filter id="ballGlow">
                            <feGaussianBlur stdDeviation="2" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </circle>
                )}

                {/* 球员层 */}
                {awayPlayers.map(p => (
                    <Player key={p.id} player={p} color="#111827" onHover={onPlayerHover} onClick={onPlayerClick} isHovered={hoveredPlayer?.id === p.id} duration={dynamicDuration} />
                ))}
                {homePlayers.map(p => (
                    <Player key={p.id} player={p} color={homeColor} onHover={onPlayerHover} onClick={onPlayerClick} isHovered={hoveredPlayer?.id === p.id} duration={dynamicDuration} />
                ))}
            </svg>

            <style>{`
                @keyframes dash {
                    to {
                        stroke-dashoffset: -100;
                    }
                }
            `}</style>
        </div>
    );
};
