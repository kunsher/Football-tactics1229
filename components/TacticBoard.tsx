
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
        transition: `transform ${duration}s cubic-bezier(0.25, 1, 0.5, 1)`
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
              
              {/* Role Pulse Icon */}
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
    isPlaying = false
}) => {
    // 动画时长与App.tsx中的步进时长同步
    const phaseStepDuration = 3.0 / animationSpeed; 
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
                <FootballPitch />
            </div>
            
            <svg viewBox="0 0 1050 680" className="w-full h-full relative z-10">
                <defs>
                    <filter id="ballGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    {/* 皮球轨迹流光遮罩 */}
                    <linearGradient id="trailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="white" stopOpacity="0" />
                        <stop offset="100%" stopColor="white" stopOpacity="0.6" />
                    </linearGradient>
                </defs>

                {/* 传球路径绘制 */}
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
                                {isMain && isPlaying && (
                                    <line
                                        x1={from.x * 10} y1={from.y * 6.7 + 5}
                                        x2={to.x * 10} y2={to.y * 6.7 + 5}
                                        stroke="white"
                                        strokeWidth={strokeWidth}
                                        strokeOpacity="0.4"
                                        strokeDasharray="1, 10"
                                        className="animate-[dash_1s_linear_infinite]"
                                    />
                                )}
                            </g>
                        );
                    })}
                </g>

                {/* 模拟皮球：核心连贯动力学 */}
                {ballPath && (
                    <g>
                        {/* 移动轨迹残影 */}
                        {isPlaying && (
                            <line
                                x1={ballPath.from.x * 10} y1={ballPath.from.y * 6.7 + 5}
                                x2={ballPath.to.x * 10} y2={ballPath.to.y * 6.7 + 5}
                                stroke="white"
                                strokeWidth="2"
                                strokeOpacity="0.15"
                                strokeLinecap="round"
                            />
                        )}
                        
                        <circle r="6" fill="#fff" filter="url(#ballGlow)" className="shadow-2xl">
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

                {/* 球员渲染 */}
                {awayPlayers.map(p => (
                    <Player 
                        key={p.id} 
                        player={p} 
                        color="#111827" 
                        onHover={onPlayerHover} 
                        onClick={onPlayerClick} 
                        isHovered={hoveredPlayer?.id === p.id} 
                        duration={movementDuration} 
                        isInPossession={ballPossessorId === p.id}
                        isReceiver={receiverId === p.id}
                    />
                ))}
                {homePlayers.map(p => (
                    <Player 
                        key={p.id} 
                        player={p} 
                        color={homeColor} 
                        onHover={onPlayerHover} 
                        onClick={onPlayerClick} 
                        isHovered={hoveredPlayer?.id === p.id} 
                        duration={movementDuration} 
                        isInPossession={ballPossessorId === p.id}
                        isReceiver={receiverId === p.id}
                    />
                ))}
            </svg>

            <style>{`
                @keyframes dash {
                    to {
                        stroke-dashoffset: -50;
                    }
                }
                @keyframes role-pulse {
                    0%, 100% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.3); opacity: 1; }
                }
                @keyframes role-ping {
                    0% { transform: scale(1); opacity: 0.5; }
                    100% { transform: scale(2.5); opacity: 0; }
                }
                .animate-role-pulse {
                    animation: role-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                    transform-box: fill-box;
                    transform-origin: center;
                }
                .animate-role-ping {
                    animation: role-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
                    transform-box: fill-box;
                    transform-origin: center;
                }
            `}</style>
        </div>
    );
};
