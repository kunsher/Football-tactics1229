
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
  isScanning?: boolean; // 新增：用于展示 AI 解码时的扫描状态
}

const FootballPitch: React.FC<{ showZones?: boolean; highlightedZone?: string | null; isScanning?: boolean }> = ({ showZones, highlightedZone, isScanning }) => (
  <svg viewBox="0 0 1050 680" className="w-full h-full opacity-95">
    <defs>
      <pattern id="stripes" width="105" height="680" patternUnits="userSpaceOnUse">
        <rect width="52.5" height="680" fill="#1b2e1b" />
        <rect x="52.5" width="52.5" height="680" fill="#243d24" />
      </pattern>
      <pattern id="tacticalGrid" width="42" height="42" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.5" fill="rgba(59, 130, 246, 0.25)" />
      </pattern>
      <linearGradient id="scanGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
        <stop offset="50%" stopColor="rgba(59, 130, 246, 0.4)" />
        <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
      </linearGradient>
      <radialGradient id="pitchOverlay" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
        <stop offset="0%" stopColor="transparent" stopOpacity="0" />
        <stop offset="100%" stopColor="#0a0f14" stopOpacity="0.4" />
      </radialGradient>
    </defs>
    
    <rect width="1050" height="680" fill="url(#stripes)" rx="12" />
    
    {/* AI 扫描态：背景网格数据流 */}
    {isScanning && (
      <rect width="1050" height="680" fill="url(#tacticalGrid)" className="animate-pulse" />
    )}

    {/* AI 扫描态：激光扫描线 */}
    {isScanning && (
      <rect width="1050" height="220" fill="url(#scanGradient)">
        <animate attributeName="y" from="-220" to="680" dur="1.8s" repeatCount="indefinite" />
      </rect>
    )}

    <rect width="1050" height="680" fill="url(#pitchOverlay)" rx="12" pointerEvents="none" />

    {showZones && (
      <g stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="5,5" fill="none">
        <line x1="210" y1="10" x2="210" y2="670" />
        <line x1="420" y1="10" x2="420" y2="670" />
        <line x1="630" y1="10" x2="630" y2="670" />
        <line x1="840" y1="10" x2="840" y2="670" />
        <line x1="10" y1="226" x2="1040" y2="226" />
        <line x1="10" y1="454" x2="1040" y2="454" />
        <rect x="630" y="226" width="210" height="228" fill={highlightedZone === 'zone14' ? 'rgba(59, 130, 246, 0.1)' : 'transparent'} className="transition-all duration-500" />
      </g>
    )}

    <g stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none">
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
        transition: `transform ${duration}s cubic-bezier(0.19, 1, 0.22, 1)`,
        willChange: 'transform',
      }}
      onMouseEnter={() => onHover(player)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(player)}
      className="cursor-pointer group"
    >
      {/* 接球光圈 */}
      {isReceiver && (
          <circle r="32" fill="none" stroke={color} strokeWidth="1" strokeDasharray="4,4" className="animate-[spin_6s_linear_infinite] opacity-40" />
      )}
      
      {/* 增强物理感力场 - 呼吸脉冲效果 */}
      <circle r="18" fill={color} opacity="0.1" className="group-hover:scale-[2] transition-transform duration-700" />
      
      {isInPossession && (
        <g>
          <circle r="26" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="5,3" className="opacity-60">
             <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle r="20" fill={color} opacity="0.3">
             <animate attributeName="opacity" values="0.15;0.45;0.15" dur="1.2s" repeatCount="indefinite" />
             <animate attributeName="r" values="18;22;18" dur="1.2s" repeatCount="indefinite" />
          </circle>
        </g>
      )}
      
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
        y="1" textAnchor="middle" alignmentBaseline="middle"
        fontSize={isHovered ? "13" : "11"} fontWeight="900" fill="#fff"
        className="pointer-events-none select-none transition-all duration-300 font-sans"
      >
        {player.number}
      </text>
      
      <g transform="translate(0, 32)" className={`transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
         <text textAnchor="middle" fill="#fff" fontSize="11" fontWeight="900" className="tracking-tighter uppercase drop-shadow-md">
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
        <div className="w-full aspect-[105/68] max-w-5xl mx-auto relative select-none rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.6)] bg-[#081208]">
            <div className="absolute inset-0">
                <FootballPitch showZones={showZones} isScanning={isScanning} />
            </div>
            
            <svg viewBox="0 0 1050 680" className="w-full h-full relative z-10">
                <defs>
                   <linearGradient id="ballGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fff" />
                      <stop offset="100%" stopColor="#cbd5e1" />
                   </linearGradient>
                </defs>

                <g>
                    {passingNetwork.connections.map((conn, i) => {
                        const from = homePlayers.find(p => p.id === conn.from) || awayPlayers.find(p => p.id === conn.from);
                        const to = homePlayers.find(p => p.id === conn.to) || awayPlayers.find(p => p.id === conn.to);
                        if (!from || !to) return null;

                        const isMain = i === 0;
                        const isHovered = hoveredPlayer && (hoveredPlayer.id === conn.from || hoveredPlayer.id === conn.to);
                        const opacity = isMain ? (isPlaying ? 0.2 : 0.6) : (isHovered ? 0.8 : 0.1);
                        const strokeWidth = isHovered ? 5 : (isMain ? 3 : 1.5);

                        return (
                            <line
                                key={`${conn.from}-${conn.to}`}
                                x1={from.x * 10} y1={from.y * 6.7 + 5}
                                x2={to.x * 10} y2={to.y * 6.7 + 5}
                                stroke={homePlayers.some(p => p.id === from.id) ? homeColor : awayColor}
                                strokeWidth={strokeWidth}
                                strokeOpacity={opacity}
                                strokeLinecap="round"
                                strokeDasharray={isMain ? "0" : "8,4"}
                                className="transition-all duration-700"
                            />
                        );
                    })}
                </g>

                {ballPath && (
                    <circle r="5" fill="url(#ballGlow)" style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.6))' }}>
                        <animateMotion 
                            dur={`${1.8 / animationSpeed}s`}
                            repeatCount={isPlaying ? "1" : "indefinite"}
                            fill="freeze"
                            path={`M ${ballPath.from.x * 10} ${ballPath.from.y * 6.7 + 5} L ${ballPath.to.x * 10} ${ballPath.to.y * 6.7 + 5}`}
                            calcMode="spline"
                            keySplines="0.4, 0, 0.2, 1"
                        />
                    </circle>
                )}

                {[...awayPlayers, ...homePlayers].map(p => (
                    <Player 
                        key={p.id} player={p} 
                        color={homePlayers.some(hp => hp.id === p.id) ? homeColor : awayColor}
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
