
import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import type { MatchStatistics, TeamInfo, RadarPoint } from '../types';
import { CoachIcon } from './icons';

// Define the interface for StatsDashboard component props
interface StatsDashboardProps {
  stats: MatchStatistics;
  teamNames: { home: string; away: string };
  colors: { home: string; away: string };
  teams: { home: TeamInfo; away: TeamInfo };
  radarData: RadarPoint[];
}

const CoachCard: React.FC<{ team: TeamInfo; isHome: boolean }> = ({ team, isHome }) => (
  <div className={`p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors group relative overflow-hidden`}>
    <div className="absolute top-0 right-0 w-20 h-20 bg-white/[0.02] rounded-full -mr-10 -mt-10 group-hover:scale-125 transition-transform duration-700"></div>
    <div className="flex items-center gap-3 mb-4 relative z-10">
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/20 shadow-lg"
          style={{ backgroundColor: team.color }}
        >
            <CoachIcon className="w-6 h-6 text-white" />
        </div>
        <div>
            <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest">{isHome ? '主队' : '客队'} 教练 / COACH</p>
            <p className="text-base font-black text-white leading-tight tracking-tight">{team.coach}</p>
        </div>
    </div>
    
    <div className="space-y-3 relative z-10">
        <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">常规阵型</span>
            <span className="text-xs text-blue-500 font-black tracking-[0.1em]">{team.formation}</span>
        </div>
        
        {team.philosophy && (
            <div className="pt-2 border-t border-white/5">
                <p className="text-[9px] text-gray-500 uppercase font-black mb-1 tracking-widest opacity-50">核心战术哲学</p>
                <p className="text-xs text-gray-200 leading-relaxed italic font-medium">“{team.philosophy}”</p>
            </div>
        )}
    </div>
  </div>
);

export const StatsDashboard: React.FC<StatsDashboardProps> = ({ stats, teamNames, colors, teams, radarData }) => {
  return (
    <div className="bg-gray-900/60 rounded-[2.5rem] p-6 border border-white/10 backdrop-blur-xl flex flex-col gap-8 shadow-2xl">
      
      {/* 战术 DNA 画像 */}
      {radarData && (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-6 px-2">
            <div className="flex items-center gap-2">
                <div className="w-1 h-5 bg-blue-600 rounded-full"></div>
                <h2 className="text-xs font-black text-white uppercase tracking-[0.2em]">战术 DNA 画像评估</h2>
            </div>
            <span className="text-[9px] text-gray-600 font-black uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded-full">DNA V4.2</span>
          </div>
          
          <div className="h-64 w-full bg-[#0a0f14]/80 rounded-[2rem] border border-white/5 pt-4 shadow-inner group/radar relative overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart 
                cx="50%" 
                cy="50%" 
                outerRadius="65%" 
                data={radarData}
                margin={{ top: 10, right: 50, left: 50, bottom: 10 }}
              >
                <PolarGrid stroke="rgba(255,255,255,0.06)" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{fill: '#94a3b8', fontSize: 10, fontWeight: '900', letterSpacing: '0.05em'}} 
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name={teamNames.home}
                  dataKey="A"
                  stroke={colors.home}
                  strokeWidth={2}
                  fill={colors.home}
                  fillOpacity={0.3}
                />
                <Radar
                  name={teamNames.away}
                  dataKey="B"
                  stroke="#94a3b8"
                  strokeWidth={1}
                  fill="#94a3b8"
                  fillOpacity={0.1}
                />
                <Tooltip 
                   contentStyle={{backgroundColor: '#0f172a', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '10px'}}
                   itemStyle={{fontSize: '10px', fontWeight: '900'}}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* 主帅影响力板块 */}
      {teams && (
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 mb-4 px-2">
            <CoachIcon className="w-4 h-4 text-blue-600" />
            <h2 className="text-xs font-black text-white uppercase tracking-[0.2em]">主帅战术影响力</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <CoachCard team={teams.home} isHome={true} />
            <CoachCard team={teams.away} isHome={false} />
          </div>
        </div>
      )}

      {/* 实战数据复盘 */}
      <div>
        <div className="flex items-center gap-2 mb-6 px-2">
            <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
            <h2 className="text-xs font-black text-white uppercase tracking-[0.2em]">实战数据复盘</h2>
        </div>
        
        {/* 控球率展示 */}
        <div className="relative mb-8 bg-white/[0.02] p-5 rounded-2xl border border-white/5">
            <div className="flex justify-between items-end mb-3">
                <div className="text-left">
                    <p className="text-[9px] text-gray-500 uppercase font-black mb-1">{teamNames.home}</p>
                    <p className="text-2xl font-black text-white">{stats.possession.home}%</p>
                </div>
                <div className="text-right">
                    <p className="text-[9px] text-gray-500 uppercase font-black mb-1">{teamNames.away}</p>
                    <p className="text-2xl font-black text-white">{stats.possession.away}%</p>
                </div>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden flex shadow-inner">
                <div style={{ width: `${stats.possession.home}%`, backgroundColor: colors.home }} className="h-full transition-all duration-1000 ease-out"></div>
                <div style={{ width: `${stats.possession.away}%`, backgroundColor: colors.away }} className="h-full transition-all duration-1000 ease-out opacity-50"></div>
            </div>
        </div>
      </div>
    </div>
  );
};