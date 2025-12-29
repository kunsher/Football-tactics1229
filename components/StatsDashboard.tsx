
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';
import type { MatchStatistics, TeamInfo } from '../types';
import { CoachIcon } from './icons';

interface StatsDashboardProps {
  stats: MatchStatistics;
  teamNames: { home: string; away: string };
  colors: { home: string; away: string };
  teams?: { home: TeamInfo; away: TeamInfo }; // Optional teams data
}

const CoachCard: React.FC<{ team: TeamInfo; isHome: boolean }> = ({ team, isHome }) => (
  <div className={`p-5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors`}>
    <div className="flex items-center gap-4 mb-4">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center border border-white/20"
          style={{ backgroundColor: team.color }}
        >
            <CoachIcon className="w-6 h-6 text-white" />
        </div>
        <div>
            <p className="text-xs text-gray-500 uppercase font-black tracking-widest">{isHome ? 'Home' : 'Away'} Gaffer</p>
            <p className="text-base font-bold text-white leading-tight">{team.coach}</p>
        </div>
    </div>
    
    <div className="space-y-4">
        <div>
            <span className="text-xs text-gray-400 uppercase font-bold tracking-tighter mr-2">Formation:</span>
            <span className="text-sm text-blue-400 font-black tracking-wider">{team.formation}</span>
        </div>
        
        {team.philosophy && (
            <div>
                <p className="text-xs text-gray-500 uppercase font-bold mb-1.5">Philosophy</p>
                <p className="text-sm text-gray-200 leading-snug italic font-medium">{team.philosophy}</p>
            </div>
        )}

        {team.keyInstructions && team.keyInstructions.length > 0 && (
            <div className="pt-3 border-t border-white/5">
                <p className="text-xs text-gray-500 uppercase font-bold mb-2.5">Tactical Directives</p>
                <div className="flex flex-wrap gap-2">
                    {team.keyInstructions.map((instr, idx) => (
                        <span key={idx} className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-1 rounded leading-none">
                            {instr}
                        </span>
                    ))}
                </div>
            </div>
        )}
    </div>
  </div>
);

export const StatsDashboard: React.FC<StatsDashboardProps> = ({ stats, teamNames, colors, teams }) => {
  const shotsData = [
    { name: 'Shots', [teamNames.home]: stats.shots.home, [teamNames.away]: stats.shots.away },
    { name: 'Target', [teamNames.home]: stats.shots.onTargetHome, [teamNames.away]: stats.shots.onTargetAway },
  ];

  return (
    <div className="bg-gray-900/50 rounded-2xl p-6 border border-white/10 backdrop-blur-md flex flex-col gap-8">
      {/* Section: Coach DNA */}
      {teams && (
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 mb-5">
            <CoachIcon className="w-5 h-5 text-blue-500" />
            <h2 className="text-base font-bold text-blue-400 uppercase tracking-widest">Managerial Influence</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <CoachCard team={teams.home} isHome={true} />
            <CoachCard team={teams.away} isHome={false} />
          </div>
        </div>
      )}

      {/* Section: Match Intelligence */}
      <div className="space-y-10">
        <div>
            <h2 className="text-base font-bold text-blue-400 uppercase tracking-widest mb-8">Match Intelligence</h2>
            
            {/* Possession */}
            <div className="relative mb-10">
                <div className="flex justify-between items-end mb-3">
                    <div>
                        <p className="text-3xl font-black text-white">{stats.possession.home}%</p>
                        <p className="text-xs text-gray-500 uppercase font-bold">{teamNames.home}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-black text-white">{stats.possession.away}%</p>
                        <p className="text-xs text-gray-500 uppercase font-bold">{teamNames.away}</p>
                    </div>
                </div>
                <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden flex">
                    <div style={{ width: `${stats.possession.home}%`, backgroundColor: colors.home }} className="h-full transition-all duration-1000"></div>
                    <div style={{ width: `${stats.possession.away}%`, backgroundColor: colors.away }} className="h-full transition-all duration-1000"></div>
                </div>
                <p className="text-center text-xs text-gray-600 mt-3 uppercase font-bold tracking-tighter">Possession Control</p>
            </div>

            {/* Shots Bar Chart */}
            <div className="h-48 w-full mb-6">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={shotsData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 12, fontWeight: 'bold'}} />
                        <Tooltip 
                            contentStyle={{backgroundColor: '#0a0f14', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px'}}
                            itemStyle={{fontSize: '14px', fontWeight: 'bold'}}
                        />
                        <Bar dataKey={teamNames.home} fill={colors.home} radius={[4, 4, 0, 0]} barSize={40} />
                        <Bar dataKey={teamNames.away} fill={colors.away} radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <p className="text-xs text-gray-500 uppercase font-bold mb-2">Pass Accuracy</p>
                    <div className="flex items-baseline gap-3">
                        <span className="text-xl font-black text-white">{stats.passes.accuracyHome}%</span>
                        <span className="text-xs text-gray-600">vs {stats.passes.accuracyAway}%</span>
                    </div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <p className="text-xs text-gray-500 uppercase font-bold mb-2">Total Passes</p>
                    <div className="flex items-baseline gap-3">
                        <span className="text-xl font-black text-white">{stats.passes.home}</span>
                        <span className="text-xs text-gray-600">vs {stats.passes.away}</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
