
import React from 'react';

interface TacticalVisualizerProps {
  type: 'tiki-taka' | 'pressing' | 'false-9' | 'low-block' | 'overlap' | 'counter-press' | 'half-space' | 'vertical-counter' | 'catenaccio' | 'total-football';
  size?: 'small' | 'large';
}

export const TacticalVisualizer: React.FC<TacticalVisualizerProps> = ({ type, size = 'small' }) => {
  const isLarge = size === 'large';
  const width = isLarge ? 500 : 280;
  const height = isLarge ? 320 : 180;

  const zoomedViewBox = "25 15 250 170";

  const Pitch = () => (
    <g>
      <rect width="300" height="200" fill="#1a2e1a" rx="16" />
      <rect x="5%" y="5%" width="90%" height="90%" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" rx="8" />
      <line x1="150" y1="10" x2="150" y2="190" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
      <circle cx="150" cy="100" r="45" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
      {(type === 'half-space' || type === 'tiki-taka') && (
        <g opacity="0.3">
          <rect x="75" y="10" width="36" height="180" fill="rgba(59, 130, 246, 0.2)" />
          <rect x="189" y="10" width="36" height="180" fill="rgba(59, 130, 246, 0.2)" />
        </g>
      )}
    </g>
  );

  const Annotation = ({ x, y, text, color = '#3b82f6', align = 'middle', className = '' }: { x: string; y: string; text: string; color?: string; align?: string; className?: string }) => (
    <text x={x} y={y} fill={color} fontSize="8" fontWeight="900" textAnchor={align as any} className={`uppercase tracking-widest animate-fade-in ${className}`}>
      {text}
    </text>
  );

  const renderAnimation = () => {
    switch (type) {
      case 'tiki-taka':
        return (
          <svg viewBox={zoomedViewBox} className="w-full h-full">
            <Pitch />
            <Annotation x="50%" y="25%" text="扫描传球通道 / SCANNING LANES" className="opacity-30" />
            <g className="passing-lanes">
               <line x1="35%" y1="35%" x2="65%" y2="35%" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="2,2" className="opacity-40" />
               <line x1="65%" y1="35%" x2="50%" y2="65%" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="2,2" className="opacity-40" />
               <line x1="50%" y1="65%" x2="35%" y2="35%" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="2,2" className="opacity-40" />
            </g>
            <Player x="35%" y="35%" team="home" />
            <Player x="65%" y="35%" team="home" />
            <Player x="50%" y="65%" team="home" />
            
            <circle cx="50%" cy="50%" r="3" fill="#fff" style={{ filter: 'drop-shadow(0 0 4px #fff)' }}>
              <animate attributeName="cx" values="35%;65%;50%;35%" dur="1.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1" />
              <animate attributeName="cy" values="35%;35%;65%;35%" dur="1.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1" />
            </circle>
            
            <Annotation x="50%" y="55%" text="寻找第三人跑位" color="#fff" className="opacity-40 text-[6px]" />
          </svg>
        );
      case 'false-9':
        return (
          <svg viewBox={zoomedViewBox} className="w-full h-full">
            <Pitch />
            <Annotation x="50%" y="20%" text="防线深度牵引 / DEPTH PULL" className="opacity-30" />
            <rect x="80%" y="35%" width="20" height="30" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="1,1" className="df-zone" />
            <Annotation x="90%" y="68%" text="制造真空区" color="#ef4444" className="opacity-40 text-[6px]" />
            
            <Player x="85%" y="42%" team="away" className="df-1" />
            <Player x="85%" y="58%" team="away" className="df-2" />
            
            <Player x="80%" y="50%" team="home" className="f9-main" />
            <Player x="60%" y="30%" team="home" className="wg-1" />
            <Player x="60%" y="70%" team="home" className="wg-2" />

            <style>{`
              .f9-main { animation: f9Drop 3s infinite ease-in-out; }
              .df-1 { animation: dfPull 3s infinite ease-in-out; }
              .wg-1, .wg-2 { animation: wgRun 3s infinite ease-in-out; }
              .df-zone { animation: zoneFade 3s infinite ease-in-out; }
              @keyframes f9Drop { 0%, 100% { transform: translate(0,0); } 40%, 60% { transform: translate(-30px,0); } }
              @keyframes dfPull { 0%, 100% { transform: translate(0,0); } 40%, 60% { transform: translate(-10px,-5px); } }
              @keyframes wgRun { 0%, 50% { transform: translate(0,0); opacity: 0.3; } 80%, 100% { transform: translate(30px, 0); opacity: 1; } }
              @keyframes zoneFade { 0%, 100% { opacity: 0; } 50% { opacity: 0.3; } }
            `}</style>
          </svg>
        );
      case 'counter-press':
        return (
          <svg viewBox={zoomedViewBox} className="w-full h-full">
            <Pitch />
            <Annotation x="50%" y="25%" text="切断出球角度 / ANGLE CLOSURE" className="opacity-30" />
            <Player x="50%" y="50%" team="away" />
            
            {/* 动态压迫区 */}
            <circle cx="50%" cy="50%" r="30" fill="none" stroke="rgba(239,68,68,0.2)" strokeWidth="1" strokeDasharray="2,2" className="press-wave" />
            
            <Player x="35%" y="35%" team="home" className="press-1" />
            <Player x="65%" y="35%" team="home" className="press-2" />
            <Player x="50%" y="75%" team="home" className="press-3" />
            
            <Annotation x="35%" y="30%" text="第一合围" color="#fff" className="opacity-20 text-[6px]" />

            <style>{`
              .press-1 { animation: press1 1.2s infinite alternate ease-in-out; }
              .press-2 { animation: press2 1.2s infinite alternate ease-in-out; }
              .press-3 { animation: press3 1.2s infinite alternate ease-in-out; }
              .press-wave { animation: waveScale 1.2s infinite alternate; }
              @keyframes waveScale { from { r: 15; opacity: 0.5; } to { r: 35; opacity: 0; } }
              @keyframes press1 { from { transform: translate(0,0); } to { transform: translate(35px,35px); } }
              @keyframes press2 { from { transform: translate(0,0); } to { transform: translate(-35px,35px); } }
              @keyframes press3 { from { transform: translate(0,0); } to { transform: translate(0,-55px); } }
            `}</style>
          </svg>
        );
      case 'vertical-counter':
        return (
          <svg viewBox={zoomedViewBox} className="w-full h-full">
            <Pitch />
            <Annotation x="50%" y="30%" text="垂直渗透效率 / VERTICALITY" className="opacity-30" />
            
            <Player x="20%" y="50%" team="home" />
            <Player x="45%" y="40%" team="home" className="vc-mid" />
            <Player x="80%" y="50%" team="home" className="vc-fwd" />
            
            <g className="action-labels">
               <Annotation x="45%" y="32%" text="枢纽过渡" color="#3b82f6" className="vc-mid-label" />
               <Annotation x="80%" y="62%" text="致命突刺" color="#ff4444" className="vc-fwd-label" />
            </g>

            <circle cx="20%" cy="50%" r="4" fill="#fff" className="ball-anim">
                <animate attributeName="cx" values="20%;45%;80%;80%" dur="2s" repeatCount="indefinite" />
                <animate attributeName="cy" values="50%;40%;50%;50%" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" />
            </circle>
            <style>{`
              .vc-fwd { animation: vcRun 2s infinite ease-in; }
              .vc-mid-label { animation: fadeInOut 2s infinite; }
              .vc-fwd-label { animation: fadeInOut 2s infinite; animation-delay: 1s; }
              @keyframes vcRun { 0%, 40% { transform: translate(0,0); } 70%, 100% { transform: translate(15px,0); } }
              @keyframes fadeInOut { 0%, 100% { opacity: 0; } 50% { opacity: 0.6; } }
            `}</style>
          </svg>
        );
      case 'overlap':
        return (
          <svg viewBox={zoomedViewBox} className="w-full h-full">
            <Pitch />
            <Annotation x="50%" y="15%" text="边路超载博弈 / OVERLAP" className="opacity-30" />
            
            {/* 边路空档标注 */}
            <rect x="75%" y="5%" width="20" height="25" fill="rgba(59,130,246,0.1)" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="2,2" />
            <Annotation x="85%" y="35%" text="利用边路真空" color="#3b82f6" className="opacity-40 text-[6px]" />

            <Player x="65%" y="25%" team="home" />
            <Player x="40%" y="15%" team="home" className="fullback-overlap" />
            
            <style>{`
              .fullback-overlap { animation: overlapRun 3s infinite ease-out; }
              @keyframes overlapRun { 0% { cx: 40%; cy: 15%; opacity: 0; } 10% { opacity: 1; } 80% { cx: 85%; cy: 20%; opacity: 1; } 100% { cx: 85%; cy: 20%; opacity: 0; } }
            `}</style>
          </svg>
        );
      default:
        return (
          <svg viewBox={zoomedViewBox} className="w-full h-full">
            <Pitch />
            <Annotation x="50%" y="50%" text="战术推演中..." className="opacity-20" />
          </svg>
        );
    }
  };

  const Player = ({ x, y, team, className, style }: { x: string; y: string; team: 'home' | 'away'; className?: string; style?: React.CSSProperties }) => (
    <circle cx={x} cy={y} r="8" fill={team === 'home' ? '#3b82f6' : '#ef4444'} className={className} style={style} stroke="#fff" strokeWidth="1.5" />
  );

  return (
    <div className={`rounded-2xl overflow-hidden border border-border bg-foreground/5 shadow-inner flex items-center justify-center ${isLarge ? 'p-6' : 'p-3'}`} style={{ width, height }}>
      {renderAnimation()}
    </div>
  );
};
