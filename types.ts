
export interface PlayerPosition {
  id: string;
  number: number;
  position: string;
  line: 'GK' | 'DEF' | 'MID' | 'FWD';
  x: number; // 0-100
  y: number; // 0-100
  name: string;
  role: string;
  team: 'home' | 'away';
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: 'Position' | 'Phase' | 'Action';
}

export interface TacticPhase {
  id: string;
  title: string;
  description: string;
  homePlayers: PlayerPosition[];
  awayPlayers: PlayerPosition[];
  connections: Connection[];
}

export interface RadarPoint {
  subject: string;
  A: number;
  B: number;
  fullMark: number;
}

export interface TeamInfo {
  name: string;
  color: string;
  coach: string;
  formation: string;
  philosophy?: string;
  keyInstructions?: string[];
}

export interface Battle {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  teams: {
    home: TeamInfo;
    away: TeamInfo;
  };
  phases: TacticPhase[];
  stats: MatchStatistics;
  radarData: RadarPoint[];
}

export interface Connection {
  from: string;
  to: string;
  weight: number;
  successRate: number;
}

export interface MatchStatistics {
  possession: { home: number; away: number };
  shots: { home: number; away: number; onTargetHome: number; onTargetAway: number };
  passes: { 
    home: number; 
    away: number;
    accuracyHome: number;
    accuracyAway: number;
  };
}
