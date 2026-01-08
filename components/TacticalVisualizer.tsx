
import React from 'react';

interface TacticalVisualizerProps {
  type: 'tiki-taka' | 'pressing' | 'false-9' | 'low-block' | 'overlap' | 'counter-press' | 'half-space' | 'vertical-counter' | 'catenaccio' | 'total-football';
  size?: 'small' | 'large';
}

export const TacticalVisualizer: React.FC<TacticalVisualizerProps> = ({ type, size = 'small' }) => {
  const isLarge = size === 'large';
  const width = isLarge ? 500 : 280;
  const height = isLarge ? 320 : 180;

  // 默认视口 300x200，为了“放大草地”，我们将视口缩小并居中，从而实现缩放效果
  const zoomedViewBox = "25 15 250 170";

  const Pitch = () => (
    <g>
      <rect width="300" height="200" fill="#1a2e1a" rx="16" />
      <rect x="5%" y="5%" width="90%" height="90%" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" rx="8" />
      <line x1="150" y1="10" x2="150" y2="190" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
      <circle cx="150" cy="100" r="45" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
      {/* Half Spaces highlight */}
      {(type === 'half-space' || type === 'tiki-taka') && (
        <g opacity="0.3">
          <rect x="75" y="10" width="36" height="180" fill="rgba(59, 130, 246, 0.2)" />
          <rect x="189" y="10" width="36" height="180" fill="rgba(59, 130, 246, 0.2)" />
        </g>
      )}
    </g>
  );

  const Ball = ({ x, y, className }: { x: string; y: string; className?: string }) => (
    <circle cx={x} cy={y} r="4" fill="#fff" className={className} style={{ filter: 'drop-shadow(0 0 4px #fff)' }} />
  );

  const Player = ({ x, y, team, className, style }: { x: string; y: string; team: 'home' | 'away'; className?: string; style?: React.CSSProperties }) => (
    <circle cx={x} cy={y} r="8" fill={team === 'home' ? '#3b82f6' : '#ef4444'} className={className} style={style} stroke="#fff" strokeWidth="1.5" />
  );

  const renderAnimation = () => {
    switch (type) {
      case 'tiki-taka':
        return (
          <svg viewBox={zoomedViewBox} className="w-full h-full">
            <Pitch />
            <Player x="35%" y="35%" team="home" />
            <Player x="65%" y="35%" team="home" />
            <Player x="50%" y="65%" team="home" />
            <Player x="50%" y="45%" team="away" className="opacity-30" />
            <circle cx="50%" cy="50%" r="4" fill="#fff">
              <animate attributeName="cx" values="35%;65%;50%;35%" dur="1.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1" />
              <animate attributeName="cy" values="35%;35%;65%;35%" dur="1.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1" />
            </circle>
          </svg>
        );
      case 'vertical-counter':
        return (
          <svg viewBox={zoomedViewBox} className="w-full h-full">
            <Pitch />
            <Player x="20%" y="50%" team="home" />
            <Player x="45%" y="40%" team="home" className="vc-mid" />
            <Player x="80%" y="50%" team="home" className="vc-fwd" />
            <circle cx="20%" cy="50%" r="4" fill="#fff">
                <animate attributeName="cx" values="20%;45%;80%;80%" dur="2s" repeatCount="indefinite" />
                <animate attributeName="cy" values="50%;40%;50%;50%" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;1;1;0" dur="2s" repeatCount="indefinite" />
            </circle>
            <style>{`
              .vc-fwd { animation: vcRun 2s infinite ease-in; }
              @keyframes vcRun { 0%, 40% { transform: translate(0,0); } 70%, 100% { transform: translate(15px,0); } }
            `}</style>
          </svg>
        );
      case 'catenaccio':
        return (
          <svg viewBox={zoomedViewBox} className="w-full h-full">
            <Pitch />
            <Player x="85%" y="50%" team="home" className="libero" />
            <g className="defense-line">
              <Player x="75%" y="25%" team="home" />
              <Player x="75%" y="40%" team="home" />
              <Player x="75%" y="60%" team="home" />
              <Player x="75%" y="75%" team="home" />
            </g>
            <Player x="40%" y="50%" team="away" />
            <style>{`
              .libero { animation: liberoMove 3s infinite ease-in-out; }
              @keyframes liberoMove { 0%, 100% { transform: translate(0,-20px); } 50% { transform: translate(0,20px); } }
            `}</style>
          </svg>
        );
      case 'total-football':
        return (
          <svg viewBox={zoomedViewBox} className="w-full h-full">
            <Pitch />
            <Player x="40%" y="40%" team="home" className="tf-1" />
            <Player x="60%" y="60%" team="home" className="tf-2" />
            <style>{`
              .tf-1 { animation: tfSwap1 4s infinite ease-in-out; }
              .tf-2 { animation: tfSwap2 4s infinite ease-in-out; }
              @keyframes tfSwap1 { 0%, 100% { transform: translate(0,0); } 50% { transform: translate(60px,60px); } }
              @keyframes tfSwap2 { 0%, 100% { transform: translate(0,0); } 50% { transform: translate(-60px,-60px); } }
            `}</style>
          </svg>
        );
      case 'pressing':
      case 'counter-press':
        return (
          <svg viewBox={zoomedViewBox} className="w-full h-full">
            <Pitch />
            <Player x="50%" y="50%" team="away" />
            <Ball x="52%" y="52%" className="lost-ball" />
            <g>
              <Player x="35%" y="35%" team="home" className="press-1" />
              <Player x="65%" y="35%" team="home" className="press-2" />
              <Player x="50%" y="75%" team="home" className="press-3" />
              <style>{`
                .press-1 { animation: press1 1s infinite alternate ease-in-out; }
                .press-2 { animation: press2 1s infinite alternate ease-in-out; }
                .press-3 { animation: press3 1s infinite alternate ease-in-out; }
                @keyframes press1 { from { transform: translate(0,0); } to { transform: translate(35px,35px); } }
                @keyframes press2 { from { transform: translate(0,0); } to { transform: translate(-35px,35px); } }
                @keyframes press3 { from { transform: translate(0,0); } to { transform: translate(0,-55px); } }
              `}</style>
            </g>
          </svg>
        );
      case 'false-9':
        return (
          <svg viewBox={zoomedViewBox} className="w-full h-full">
            <Pitch />
            <Player x="75%" y="50%" team="away" className="defender-f9" />
            <Player x="70%" y="50%" team="home" className="false-9-player" />
            <Player x="45%" y="25%" team="home" className="winger-run" />
            <style>{`
              .false-9-player { animation: dropF9 3s infinite ease-in-out; }
              .defender-f9 { animation: followF9 3s infinite ease-in-out; }
              .winger-run { animation: runInside 3s infinite ease-in-out; }
              @keyframes dropF9 { 0%, 100% { cx: 70%; } 40%, 60% { cx: 45%; } }
              @keyframes followF9 { 0%, 100% { cx: 75%; } 40%, 60% { cx: 62%; } }
              @keyframes runInside { 0% { transform: translate(0,0); opacity: 0; } 40% { transform: translate(0,0); opacity: 1; } 80% { transform: translate(90px,50px); opacity: 1; } 100% { transform: translate(90px,50px); opacity: 0; } }
            `}</style>
          </svg>
        );
      case 'low-block':
        return (
          <svg viewBox={zoomedViewBox} className="w-full h-full">
            <Pitch />
            <g className="defense-block">
              <Player x="72%" y="25%" team="away" />
              <Player x="72%" y="42%" team="away" />
              <Player x="72%" y="58%" team="away" />
              <Player x="72%" y="75%" team="away" />
              <Player x="85%" y="35%" team="away" />
              <Player x="85%" y="50%" team="away" />
              <Player x="85%" y="65%" team="away" />
            </g>
            <Player x="35%" y="50%" team="home" />
            <circle cx="37%" cy="50%" r="4" fill="#fff" className="low-block-ball">
               <animate attributeName="cx" values="37%;68%;37%" dur="2s" repeatCount="indefinite" />
            </circle>
            <style>{`
              .defense-block { animation: blockShift 2s infinite alternate ease-in-out; }
              @keyframes blockShift { from { transform: translate(0, -10px); } to { transform: translate(0, 10px); } }
            `}</style>
          </svg>
        );
      case 'overlap':
        return (
          <svg viewBox={zoomedViewBox} className="w-full h-full">
            <Pitch />
            <Player x="65%" y="25%" team="home" className="winger-static" />
            <Player x="40%" y="15%" team="home" className="fullback-overlap" />
            <Player x="75%" y="25%" team="away" className="defender-overlap" />
            <Ball x="66%" y="27%" className="winger-ball" />
            <style>{`
              .fullback-overlap { animation: overlapRun 2.5s infinite ease-out; }
              .defender-overlap { animation: defenderShift 2.5s infinite ease-out; }
              @keyframes overlapRun { 0% { cx: 40%; cy: 15%; opacity: 0; } 10% { opacity: 1; } 80% { cx: 85%; cy: 20%; opacity: 1; } 100% { cx: 85%; cy: 20%; opacity: 0; } }
              @keyframes defenderShift { 0%, 50% { cx: 75%; } 80%, 100% { cx: 68%; } }
            `}</style>
          </svg>
        );
      case 'half-space':
        return (
          <svg viewBox={zoomedViewBox} className="w-full h-full">
            <Pitch />
            <Player x="35%" y="50%" team="home" className="half-space-playmaker" />
            <Player x="70%" y="30%" team="home" className="half-space-receiver" />
            <Player x="78%" y="35%" team="away" />
            <Player x="78%" y="65%" team="away" />
            <Ball x="37%" y="50%" className="half-space-pass" />
            <style>{`
              .half-space-receiver { animation: receiverMove 3s infinite ease-in-out; }
              .half-space-pass { animation: passBall 3s infinite ease-in-out; }
              @keyframes receiverMove { 0%, 30% { cx: 70%; cy: 30%; } 70%, 100% { cx: 70%; cy: 40%; } }
              @keyframes passBall { 0%, 30% { cx: 37%; cy: 50%; opacity: 0; } 35% { opacity: 1; } 65% { cx: 68%; cy: 39%; opacity: 1; } 70%, 100% { opacity: 0; } }
            `}</style>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-inner flex items-center justify-center ${isLarge ? 'p-6' : 'p-3'}`} style={{ width, height }}>
      {renderAnimation()}
    </div>
  );
};
