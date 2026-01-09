
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
            <Annotation x="50%" y="25%" text="三角传递网络 / TRIANGLE" className="opacity-30" />
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
            
            <Annotation x="68%" y="62%" text="核心接应区" color="#fff" className="opacity-20" />
          </svg>
        );
      case 'false-9':
        return (
          <svg viewBox={zoomedViewBox} className="w-full h-full">
            <Pitch />
            <Annotation x="50%" y="20%" text="伪九号回撤拉空 / FALSE 9" className="opacity-30" />
            <Player x="85%" y="42%" team="away" className="df-1" />
            <Player x="85%" y="58%" team="away" className="df-2" />
            
            <Player x="80%" y="50%" team="home" className="f9-main" />
            <Player x="60%" y="30%" team="home" className="wg-1" />
            <Player x="60%" y="70%" team="home" className="wg-2" />

            <style>{`
              .f9-main { animation: f9Drop 3s infinite ease-in-out; }
              .df-1 { animation: dfPull 3s infinite ease-in-out; }
              .wg-1, .wg-2 { animation: wgRun 3s infinite ease-in-out; }
              @keyframes f9Drop { 0%, 100% { transform: translate(0,0); } 40%, 60% { transform: translate(-30px,0); } }
              @keyframes dfPull { 0%, 100% { transform: translate(0,0); } 40%, 60% { transform: translate(-10px,-5px); } }
              @keyframes wgRun { 0%, 50% { transform: translate(0,0); opacity: 0.3; } 80%, 100% { transform: translate(30px, 0); opacity: 1; } }
            `}</style>
            <Annotation x="55%" y="52%" text="制造中路人数优势" color="#3b82f6" className="opacity-40" />
          </svg>
        );
      case 'catenaccio':
        return (
          <svg viewBox={zoomedViewBox} className="w-full h-full">
            <Pitch />
            <Annotation x="50%" y="20%" text="自由人清道夫模式 / LIBERO" className="opacity-30" />
            <Player x="80%" y="30%" team="away" />
            <Player x="80%" y="50%" team="away" />
            <Player x="80%" y="70%" team="away" />
            <Player x="92%" y="50%" team="away" className="libero" />
            
            <Player x="60%" y="45%" team="home" className="att-1" />
            <circle cx="62%" cy="47%" r="3" fill="#fff" className="att-ball" />

            <style>{`
              .libero { animation: liberoSweep 2s infinite alternate ease-in-out; }
              .att-ball { animation: attShoot 2s infinite; }
              @keyframes liberoSweep { from { transform: translate(0,-40px); } to { transform: translate(0,40px); } }
              @keyframes attShoot { 0% { transform: translate(0,0); opacity:1; } 60% { transform: translate(30px,0); opacity:0; } 100% { transform: translate(30px,0); opacity:0; } }
            `}</style>
            <Annotation x="90%" y="35%" text="最后一道防线" color="#ef4444" className="opacity-40" />
          </svg>
        );
      case 'total-football':
        return (
          <svg viewBox={zoomedViewBox} className="w-full h-full">
            <Pitch />
            <Annotation x="50%" y="20%" text="位置轮转体系 / POSITION ROTATION" className="opacity-30" />
            <Player x="40%" y="40%" team="home" className="tf-1" />
            <Player x="60%" y="60%" team="home" className="tf-2" />
            <circle cx="50%" cy="50%" r="50" fill="none" stroke="rgba(59,130,246,0.1)" strokeDasharray="4,4" />

            <style>{`
              .tf-1 { animation: tfRotate1 4s infinite linear; }
              .tf-2 { animation: tfRotate2 4s infinite linear; }
              @keyframes tfRotate1 { 0% { transform: rotate(0deg) translate(40px) rotate(0deg); } 100% { transform: rotate(360deg) translate(40px) rotate(-360deg); } }
              @keyframes tfRotate2 { 0% { transform: rotate(180deg) translate(40px) rotate(-180deg); } 100% { transform: rotate(540deg) translate(40px) rotate(-540deg); } }
            `}</style>
            <Annotation x="50%" y="52%" text="全员流动性" color="#3b82f6" className="opacity-40" />
          </svg>
        );
      case 'vertical-counter':
        return (
          <svg viewBox={zoomedViewBox} className="w-full h-full">
            <Pitch />
            <Annotation x="50%" y="30%" text="垂直打击路径 / VERTICAL" className="opacity-30" />
            <Player x="20%" y="50%" team="home" />
            <Player x="45%" y="40%" team="home" className="vc-mid" />
            <Player x="80%" y="50%" team="home" className="vc-fwd" />
            
            <g className="action-labels">
               <Annotation x="45%" y="32%" text="枢纽过渡" color="#3b82f6" className="vc-mid-label" />
               <Annotation x="80%" y="62%" text="弱侧前插" color="#ff4444" className="vc-fwd-label" />
            </g>

            <circle cx="20%" cy="50%" r="4" fill="#fff">
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
      case 'pressing':
      case 'counter-press':
        return (
          <svg viewBox={zoomedViewBox} className="w-full h-full">
            <Pitch />
            <Annotation x="50%" y="25%" text="高压合围 / COLLECTIVE PRESS" className="opacity-30" />
            <Player x="50%" y="50%" team="away" />
            <circle cx="52%" cy="52%" r="4" fill="#fff" style={{ filter: 'drop-shadow(0 0 4px #fff)' }} />
            <g>
              <Player x="35%" y="35%" team="home" className="press-1" />
              <Player x="65%" y="35%" team="home" className="press-2" />
              <Player x="50%" y="75%" team="home" className="press-3" />
              
              <line x1="35%" y1="35%" x2="48%" y2="48%" stroke="#fff" strokeWidth="0.5" strokeDasharray="1,1" className="press-line-1" />
              <line x1="65%" y1="35%" x2="52%" y2="48%" stroke="#fff" strokeWidth="0.5" strokeDasharray="1,1" className="press-line-2" />
              <line x1="50%" y1="75%" x2="50%" y2="55%" stroke="#fff" strokeWidth="0.5" strokeDasharray="1,1" className="press-line-3" />

              <style>{`
                .press-1 { animation: press1 1.2s infinite alternate ease-in-out; }
                .press-2 { animation: press2 1.2s infinite alternate ease-in-out; }
                .press-3 { animation: press3 1.2s infinite alternate ease-in-out; }
                .press-line-1, .press-line-2, .press-line-3 { animation: lineFade 1.2s infinite alternate; }
                @keyframes lineFade { from { opacity: 0; } to { opacity: 0.3; } }
                @keyframes press1 { from { transform: translate(0,0); } to { transform: translate(35px,35px); } }
                @keyframes press2 { from { transform: translate(0,0); } to { transform: translate(-35px,35px); } }
                @keyframes press3 { from { transform: translate(0,0); } to { transform: translate(0,-55px); } }
              `}</style>
            </g>
            <Annotation x="50%" y="60%" text="截断路径" color="#ef4444" className="opacity-40" />
          </svg>
        );
      case 'low-block':
        return (
          <svg viewBox={zoomedViewBox} className="w-full h-full">
            <Pitch />
            <Annotation x="50%" y="25%" text="紧凑防守块 / COMPACT BLOCK" className="opacity-30" />
            <g className="defense-block">
              <Player x="72%" y="25%" team="away" />
              <Player x="72%" y="42%" team="away" />
              <Player x="72%" y="58%" team="away" />
              <Player x="72%" y="75%" team="away" />
              <rect x="70%" y="20%" width="15" height="60%" fill="rgba(239, 68, 68, 0.1)" stroke="rgba(239, 68, 68, 0.3)" strokeDasharray="2,2" />
              <Annotation x="88%" y="50%" text="防线平移" align="start" color="#ef4444" className="opacity-40" />
            </g>
            <Player x="35%" y="50%" team="home" />
            <style>{`
              .defense-block { animation: blockShift 2.5s infinite alternate ease-in-out; }
              @keyframes blockShift { from { transform: translate(0, -12px); } to { transform: translate(0, 12px); } }
            `}</style>
          </svg>
        );
      case 'overlap':
        return (
          <svg viewBox={zoomedViewBox} className="w-full h-full">
            <Pitch />
            <Annotation x="50%" y="15%" text="边后卫套边 / OVERLAP RUN" className="opacity-30" />
            <Player x="65%" y="25%" team="home" />
            <Annotation x="65%" y="35%" text="内切吸引" color="#fff" className="opacity-20" />
            <Player x="40%" y="15%" team="home" className="fullback-overlap" />
            <path d="M 40 15 Q 65 10 85 20" fill="none" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="2,2" className="opacity-40" />
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
            <text x="50%" y="50%" fill="#fff" fontSize="10" fontWeight="900" textAnchor="middle" className="opacity-20 uppercase tracking-[0.5em]">Tactic Loading...</text>
          </svg>
        );
    }
  };

  const Player = ({ x, y, team, className, style }: { x: string; y: string; team: 'home' | 'away'; className?: string; style?: React.CSSProperties }) => (
    <circle cx={x} cy={y} r="8" fill={team === 'home' ? '#3b82f6' : '#ef4444'} className={className} style={style} stroke="#fff" strokeWidth="1.5" />
  );

  return (
    <div className={`rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-inner flex items-center justify-center ${isLarge ? 'p-6' : 'p-3'}`} style={{ width, height }}>
      {renderAnimation()}
    </div>
  );
};
