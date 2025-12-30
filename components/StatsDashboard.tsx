
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import type { MatchStatistics, TeamInfo, RadarPoint } from '../types';
import { CoachIcon } from './icons';

interface StatsDashboardProps {
  stats: MatchStatistics;
  teamNames: { home: string; away: string };
  colors: { home: string; away: string };
  teams?: { home: TeamInfo; away: TeamInfo };
  radarData?: RadarPoint[];
}

const CoachCard: React.FC<{ team: TeamInfo; isHome: boolean }> = ({ team, isHome }) => (
  <div className={`p-5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors group relative overflow-hidden`}>
    <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.02] rounded-full -mr-12 -mt-12 group-hover:scale-125 transition-transform duration-700"></div>
    <div className="flex items-center gap-4 mb-4 relative z-10">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/20 shadow-lg"
          style={{ backgroundColor: team.color }}
        >
            <CoachIcon className="w-7 h-7 text-white" />
        </div>
        <div>
            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">{isHome ? '主队' : '客队'} 教练 / COACH</p>
            <p className="text-lg font-black text-white leading-tight tracking-tight">{team.coach}</p>
        </div>
    </div>
    
    <div className="space-y-4 relative z-10">
        <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 uppercase font-bold tracking-tighter">常规阵型</span>
            <span className="text-sm text-blue-500 font-black tracking-[0.1em]">{team.formation}</span>
        </div>
        
        {team.philosophy && (
            <div className="pt-3 border-t border-white/5">
                <p className="text-[10px] text-gray-500 uppercase font-black mb-2 tracking-widest opacity-50">核心战术哲学</p>
                <p className="text-sm text-gray-200 leading-relaxed italic font-medium">“{team.philosophy}”</p>
            </div>
        )}
    </div>
  </div>
);

export const StatsDashboard: React.FC<StatsDashboardProps> = ({ stats, teamNames, colors, teams, radarData }) => {
  const shotsData = [
    { name: '射门', [teamNames.home]: stats.shots.home, [teamNames.away]: stats.shots.away },
    { name: '射正', [teamNames.home]: stats.shots.onTargetHome, [teamNames.away]: stats.shots.onTargetAway },
  ];

  return (
    <div className="bg-gray-900/60 rounded-3xl p-8 border border-white/10 backdrop-blur-xl flex flex-col gap-10 shadow-2xl">
      
      {/* 战术 DNA 画像 - 深度增强版本 */}
      {radarData && (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                <h2 className="text-sm font-black text-white uppercase tracking-[0.2em]">战术 DNA 画像评估</h2>
            </div>
            <span className="text-[10px] text-gray-600 font-black uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">数据拟合 V4.2</span>
          </div>
          
          <div className="h-72 w-full bg-[#0a0f14]/80 rounded-[2.5rem] border border-white/5 pt-6 shadow-inner group/radar relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-500/[0.02] opacity-0 group-hover/radar:opacity-100 transition-opacity"></div>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="subject" tick={{fill: '#64748b', fontSize: 11, fontWeight: '900'}} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name={teamNames.home}
                  dataKey="A"
                  stroke={colors.home}
                  strokeWidth={2}
                  fill={colors.home}
                  fillOpacity={0.4}
                  animationDuration={1500}
                />
                <Radar
                  name={teamNames.away}
                  dataKey="B"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  fill="#94a3b8"
                  fillOpacity={0.15}
                  animationDuration={1500}
                />
                <Tooltip 
                   contentStyle={{backgroundColor: '#0f172a', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)'}}
                   itemStyle={{fontSize: '11px', fontWeight: '900', textTransform: 'uppercase'}}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-center gap-8 mt-6">
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)]" style={{backgroundColor: colors.home}}></div>
                <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{teamNames.home}</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                <span className="text-[10px] text-gray-600 font-black uppercase tracking-widest">{teamNames.away}</span>
             </div>
          </div>
        </div>
      )}

      {/* 主帅影响力板块 */}
      {teams && (
        <div className="animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <CoachIcon className="w-5 h-5 text-blue-600" />
            <h2 className="text-sm font-black text-white uppercase tracking-[0.2em]">主帅战术影响力</h2>
          </div>
          <div className="grid grid-cols-1 gap-5">
            <CoachCard team={teams.home} isHome={true} />
            <CoachCard team={teams.away} isHome={false} />
          </div>
        </div>
      )}

      {/* 比赛核心指标 */}
      <div className="space-y-12">
        <div>
            <div className="flex items-center gap-3 mb-10">
                <div className="w-1.5 h-5 bg-blue-500 rounded-full"></div>
                <h2 className="text-sm font-black text-white uppercase tracking-[0.2em]">实战数据复盘</h2>
            </div>
            
            {/* 控球率展示 */}
            <div className="relative mb-12 bg-white/[0.02] p-6 rounded-2xl border border-white/5">
                <div className="flex justify-between items-end mb-4">
                    <div className="text-left">
                        <p className="text-xs text-gray-500 uppercase font-black tracking-widest mb-1">{teamNames.home}</p>
                        <p className="text-4xl font-black text-white leading-none">{stats.possession.home}%</p>
                    </div>
                    <div className="text-center pb-1">
                        <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest">控球比率</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500 uppercase font-black tracking-widest mb-1">{teamNames.away}</p>
                        <p className="text-4xl font-black text-white leading-none">{stats.possession.away}%</p>
                    </div>
                </div>
                <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden flex shadow-inner">
                    <div style={{ width: `${stats.possession.home}%`, backgroundColor: colors.home }} className="h-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(255,255,255,0.2)]"></div>
                    <div style={{ width: `${stats.possession.away}%`, backgroundColor: colors.away }} className="h-full transition-all duration-1000 ease-out"></div>
                </div>
            </div>

            {/* 射门分布柱状图 */}
            <div className="h-52 w-full mb-4 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={shotsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11, fontWeight: '900'}} />
                        <Tooltip 
                            contentStyle={{backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px'}}
                            itemStyle={{fontSize: '12px', fontWeight: '900', textTransform: 'uppercase'}}
                            cursor={{fill: 'rgba(255,255,255,0.02)'}}
                        />
                        <Bar dataKey={teamNames.home} fill={colors.home} radius={[6, 6, 0, 0]} barSize={32} />
                        <Bar dataKey={teamNames.away} fill={colors.away} radius={[6, 6, 0, 0]} barSize={32} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <p className="text-center text-[9px] text-gray-600 font-black uppercase tracking-widest mt-4">数据源：OFFICIAL OPTA TACTICAL LOGS</p>
        </div>
      </div>
    </div>
  );
};
