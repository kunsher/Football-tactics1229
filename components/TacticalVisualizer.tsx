
import React from 'react';

interface TacticalVisualizerProps {
  type: 'tiki-taka' | 'pressing' | 'false-9' | 'low-block' | 'overlap';
  size?: 'small' | 'large';
}

export const TacticalVisualizer: React.FC<TacticalVisualizerProps> = ({ type, size = 'small' }) => {
  const isLarge = size === 'large';
  const width = isLarge ? 400 : 280;
  const height = isLarge ? 260 : 180;

  const Pitch = () => (
    <g>
      <rect width="100%" height="100%" fill="#1a2e1a" rx="10" />
      <rect x="5%" y="5%" width="90%" height="90%" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" rx="5" />
      <line x1="50%" y1="5%" x2="50%" y2="95%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <circle cx="50%" cy="50%" r="15%" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
    </g>
  );

  const Ball = ({ x, y, className }: { x: string; y: string; className?: string }) => (
    <circle cx={x} cy={y} r="4" fill="#fff" className={className} style={{ filter: 'drop-shadow(0 0 4px #fff)' }} />
  );

  const Player = ({ x, y, team, className }: { x: string; y: string; team: 'home' | 'away'; className?: string }) => (
    <circle cx={x} cy={y} r="8" fill={team === 'home' ? '#3b82f6' : '#ef4444'} className={className} stroke="#fff" strokeWidth="1" />
  );

  const renderAnimation = () => {
    switch (type) {
      case 'tiki-taka':
        return (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <Pitch />
            {/* Triangle players */}
            <Player x="40%" y="30%" team="home" />
            <Player x="60%" y="30%" team="home" />
            <Player x="50%" y="60%" team="home" />
            {/* Defenders */}
            <Player x="50%" y="40%" team="away" className="opacity-40" />
            
            <circle cx="50%" cy="50%" r="4" fill="#fff">
              <animate attributeName="cx" values="40%;60%;50%;40%" dur="2s" repeatCount="indefinite" />
              <animate attributeName="cy" values="30%;30%;60%;30%" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>
        );
      case 'pressing':
        return (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <Pitch />
            {/* Target */}
            <Player x="50%" y="50%" team="away" />
            <Ball x="52%" y="52%" />
            
            {/* Pressers */}
            <g>
              <Player x="30%" y="30%" team="home" className="press-1" />
              <Player x="70%" y="30%" team="home" className="press-2" />
              <Player x="50%" y="80%" team="home" className="press-3" />
              
              <style>{`
                .press-1 { animation: press1 1.5s infinite alternate ease-in-out; }
                .press-2 { animation: press2 1.5s infinite alternate ease-in-out; }
                .press-3 { animation: press3 1.5s infinite alternate ease-in-out; }
                @keyframes press1 { from { transform: translate(0,0); } to { transform: translate(45px,45px); } }
                @keyframes press2 { from { transform: translate(0,0); } to { transform: translate(-45px,45px); } }
                @keyframes press3 { from { transform: translate(0,0); } to { transform: translate(0,-65px); } }
              `}</style>
            </g>
          </svg>
        );
      case 'false-9':
        return (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <Pitch />
            {/* Defender */}
            <Player x="75%" y="50%" team="away" className="defender" />
            {/* False 9 */}
            <Player x="70%" y="50%" team="home" className="false9" />
            {/* Runner */}
            <Player x="40%" y="20%" team="home" className="runner" />

            <style>{`
              .false9 { animation: drop 3s infinite; }
              .defender { animation: follow 3s infinite; }
              .runner { animation: runIn 3s infinite; }
              @keyframes drop { 0% { cx: 70%; } 40% { cx: 50%; } 100% { cx: 50%; } }
              @keyframes follow { 0% { cx: 75%; } 40% { cx: 60%; } 100% { cx: 60%; } }
              @keyframes runIn { 0% { transform: translate(0,0); } 40% { transform: translate(0,0); } 80% { transform: translate(110px,60px); } 100% { transform: translate(110px,60px); } }
            `}</style>
          </svg>
        );
      case 'low-block':
        return (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <Pitch />
            {/* 2 lines of defense */}
            <Player x="70%" y="20%" team="away" />
            <Player x="70%" y="40%" team="away" />
            <Player x="70%" y="60%" team="away" />
            <Player x="70%" y="80%" team="away" />
            
            <Player x="85%" y="30%" team="away" />
            <Player x="85%" y="50%" team="away" />
            <Player x="85%" y="70%" team="away" />

            {/* Attackers trying to pass */}
            <Player x="40%" y="50%" team="home" />
            <Ball x="42%" y="50%" className="bouncing-ball" />
            <style>{`
              .bouncing-ball { animation: bounce 1s infinite alternate; }
              @keyframes bounce { from { cx: 42%; } to { cx: 65%; } }
            `}</style>
          </svg>
        );
      case 'overlap':
        return (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <Pitch />
            {/* Winger with ball */}
            <Player x="60%" y="20%" team="home" />
            <Ball x="62%" y="22%" />
            {/* Defender */}
            <Player x="70%" y="25%" team="away" />
            {/* Overlapping Fullback */}
            <Player x="40%" y="10%" team="home" className="over-runner" />

            <style>{`
              .over-runner { animation: overlapRun 2.5s infinite linear; }
              @keyframes overlapRun { 0% { cx: 40%; cy: 10%; } 100% { cx: 85%; cy: 15%; } }
            `}</style>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`rounded-xl overflow-hidden border border-white/10 bg-black/40 shadow-inner ${isLarge ? 'p-4' : 'p-2'}`} style={{ width, height }}>
      {renderAnimation()}
    </div>
  );
};
