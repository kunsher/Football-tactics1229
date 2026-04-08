
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnalysisPanel } from './AnalysisPanel';
import { StatsDashboard } from './StatsDashboard';
import type { TacticPhase, Battle, PlayerPosition, MatchStatistics, TeamInfo, RadarPoint } from '../types';

interface BattleRightPanelProps {
  phase: TacticPhase;
  battle: Battle;
  hoveredPlayer: PlayerPosition | null;
  onNavigateToKnowledge?: (knowledgeId: string) => void;
  stats: MatchStatistics;
  teamNames: { home: string; away: string };
  colors: { home: string; away: string };
  teams: { home: TeamInfo; away: TeamInfo };
  radarData: RadarPoint[];
}

type TabType = 'lineups' | 'statistics' | 'standings' | 'h2h' | 'analysis';

export const BattleRightPanel: React.FC<BattleRightPanelProps> = (props) => {
  const [activeTab, setActiveTab] = useState<TabType>('lineups');

  const tabs: { id: TabType; label: string }[] = [
    { id: 'lineups', label: '首发阵容' },
    { id: 'statistics', label: '数据统计' },
    { id: 'standings', label: '积分榜' },
    { id: 'h2h', label: '历史交锋' },
    { id: 'analysis', label: '战术分析' },
  ];

  return (
    <div className="flex flex-col h-full gap-6">
      {/* Tab Bar */}
      <div className="bg-card/80 rounded-2xl p-1 border border-border backdrop-blur-xl flex items-center gap-1 shadow-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all relative ${
              activeTab === tab.id ? 'text-foreground' : 'text-slate-500 dark:text-slate-400 hover:text-foreground/60'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-blue-600/20 border border-blue-500/30 rounded-xl -z-10"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-grow overflow-y-auto custom-scrollbar pr-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'analysis' && (
              <AnalysisPanel
                phase={props.phase}
                battle={props.battle}
                hoveredPlayer={props.hoveredPlayer}
                onNavigateToKnowledge={props.onNavigateToKnowledge}
              />
            )}
            {activeTab === 'statistics' && (
              <StatsDashboard
                stats={props.stats}
                teamNames={props.teamNames}
                colors={props.colors}
                teams={props.teams}
                radarData={props.radarData}
              />
            )}
            {activeTab === 'lineups' && <LineupsView phase={props.phase} teams={props.teams} colors={props.colors} />}
            {activeTab === 'standings' && <StandingsView standings={props.battle.leagueStandings} />}
            {activeTab === 'h2h' && <H2HView h2hData={props.battle.h2hData} teamNames={props.teamNames} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const LineupsView: React.FC<{ phase: TacticPhase; teams: { home: TeamInfo; away: TeamInfo }; colors: { home: string; away: string } }> = ({ phase, teams, colors }) => {
  return (
    <div className="bg-card/80 rounded-[2.5rem] p-8 border border-border backdrop-blur-3xl shadow-2xl flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-black uppercase tracking-[0.2em]">首发阵容 / LINEUPS</h3>
        <span className="text-[9px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest bg-foreground/5 px-3 py-1 rounded-full">Matchday Squad</span>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Home Team */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 rounded-full" style={{ backgroundColor: colors.home }}></div>
            <div>
              <p className="text-[9px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest">HOME TEAM</p>
              <p className="text-lg font-black tracking-tight">{teams.home.name}</p>
            </div>
          </div>
          <div className="space-y-2">
            {phase.homePlayers.map(player => (
              <div key={player.id} className="flex items-center justify-between p-3 bg-foreground/5 rounded-xl border border-border hover:bg-foreground/10 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="w-6 text-xs font-black text-blue-500">#{player.number}</span>
                  <span className="text-xs font-bold text-foreground/90">{player.name}</span>
                </div>
                <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase">{player.position}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Away Team */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 justify-end text-right">
            <div>
              <p className="text-[9px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest">AWAY TEAM</p>
              <p className="text-lg font-black tracking-tight">{teams.away.name}</p>
            </div>
            <div className="w-2 h-8 rounded-full" style={{ backgroundColor: colors.away }}></div>
          </div>
          <div className="space-y-2">
            {phase.awayPlayers.map(player => (
              <div key={player.id} className="flex items-center justify-between p-3 bg-foreground/5 rounded-xl border border-border hover:bg-foreground/10 transition-colors">
                <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase">{player.position}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-foreground/90">{player.name}</span>
                  <span className="w-6 text-xs font-black text-slate-400 dark:text-slate-500">#{player.number}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StandingsView: React.FC<{ standings?: any[] }> = ({ standings }) => {
  if (!standings) return null;

  return (
    <div className="bg-card/80 rounded-[2.5rem] p-8 border border-border backdrop-blur-3xl shadow-2xl flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-black uppercase tracking-[0.2em]">积分榜 / STANDINGS</h3>
        <span className="text-[9px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest bg-foreground/5 px-3 py-1 rounded-full">League Table</span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-left text-xs">
          <thead className="bg-foreground/5 text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">球队</th>
              <th className="px-4 py-3">场次</th>
              <th className="px-4 py-3">胜</th>
              <th className="px-4 py-3">平</th>
              <th className="px-4 py-3">负</th>
              <th className="px-4 py-3">积分</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {standings.map((s) => (
              <tr key={s.pos} className={`hover:bg-foreground/5 transition-colors ${s.isCurrent ? 'bg-blue-600/10' : ''}`}>
                <td className="px-4 py-4 font-black text-blue-500">{s.pos}</td>
                <td className="px-4 py-4 font-bold">{s.team}</td>
                <td className="px-4 py-4 text-slate-500 dark:text-slate-400">{s.p}</td>
                <td className="px-4 py-4 text-slate-500 dark:text-slate-400">{s.w}</td>
                <td className="px-4 py-4 text-slate-500 dark:text-slate-400">{s.d}</td>
                <td className="px-4 py-4 text-slate-500 dark:text-slate-400">{s.l}</td>
                <td className="px-4 py-4 font-black">{s.pts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const H2HView: React.FC<{ h2hData?: any[]; teamNames: { home: string; away: string } }> = ({ h2hData, teamNames }) => {
  if (!h2hData) return null;

  return (
    <div className="bg-card/80 rounded-[2.5rem] p-8 border border-border backdrop-blur-3xl shadow-2xl flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-black uppercase tracking-[0.2em]">历史交锋 / HEAD TO HEAD</h3>
        <span className="text-[9px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest bg-foreground/5 px-3 py-1 rounded-full">Recent Meetings</span>
      </div>

      <div className="space-y-4">
        {h2hData.map((m, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-foreground/5 rounded-2xl border border-border">
            <div className="flex flex-col">
              <span className="text-[9px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest">{m.date}</span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{m.competition}</span>
            </div>
            <div className="flex items-center gap-6">
              <span className={`text-xs font-black ${m.winner === 'home' ? 'text-foreground' : 'text-slate-500 dark:text-slate-400'}`}>{teamNames.home}</span>
              <div className="px-4 py-1.5 bg-background/40 rounded-full border border-border text-sm font-mono font-black text-blue-500">
                {m.score}
              </div>
              <span className={`text-xs font-black ${m.winner === 'away' ? 'text-foreground' : 'text-slate-500 dark:text-slate-400'}`}>{teamNames.away}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-6 bg-blue-600/10 rounded-3xl border border-blue-500/20">
        <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest mb-4">胜率统计 / WIN PROBABILITY</p>
        <div className="flex items-center gap-4">
          <div className="flex-grow h-2 bg-foreground/10 rounded-full overflow-hidden flex">
            <div className="h-full bg-blue-600" style={{ width: '45%' }}></div>
            <div className="h-full bg-gray-400" style={{ width: '20%' }}></div>
            <div className="h-full bg-gray-300" style={{ width: '35%' }}></div>
          </div>
          <div className="flex gap-4 text-[10px] font-black">
            <span className="text-blue-500">45%</span>
            <span className="text-gray-400">20%</span>
            <span className="text-gray-300">35%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
