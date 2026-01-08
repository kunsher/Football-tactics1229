
export interface UserProfile {
  name: string;
  rank: string;
  avatar: string;
  tacticsMastered: number;
  battlesAnalyzed: number;
  learningProgress: number;
  joinDate: string;
  isGuest?: boolean;
}

export interface TacticalAnnotation {
  type: 'line' | 'area' | 'arrow' | 'focus';
  points: { x: number; y: number }[];
  label?: string;
  color?: string;
}

export interface TacticPhase {
  id: string;
  title: string;
  description: string;
  matchMinute?: string; // 新增：比赛具体时刻
  matchContext?: string; // 新增：瞬时比分或事件背景
  homePlayers: PlayerPosition[];
  awayPlayers: PlayerPosition[];
  connections: Connection[];
  annotations?: TacticalAnnotation[]; 
}

export interface ScoutingStat {
  label: string;
  value: number;
}

export interface PhysicalInfo {
  age: string;
  height: string;
  foot: 'Left' | 'Right';
}

export interface PlayerPosition {
  id: string;
  number: number;
  position: string;
  line: 'GK' | 'DEF' | 'MID' | 'FWD';
  x: number;
  y: number;
  name: string;
  role: string;
  team: 'home' | 'away';
  tacticalBrief?: string[];
  scoutingStats?: ScoutingStat[];
  physical?: PhysicalInfo;
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
  passes: { home: number; away: number; accuracyHome: number; accuracyAway: number };
}

export interface TeamInfo {
  name: string;
  color: string;
  coach: string;
  formation: string;
  philosophy?: string;
  keyInstructions?: string[];
}

export interface RadarPoint {
  subject: string;
  A: number;
  B?: number;
  fullMark: number;
}

export interface Battle {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  score: { home: number; away: number };
  teams: { home: TeamInfo; away: TeamInfo };
  phases: TacticPhase[];
  stats: MatchStatistics;
  radarData: RadarPoint[];
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: 'Position' | 'Phase' | 'Action' | 'System';
  icon?: string;
  visualEffect?: 'overlap' | 'tiki-taka' | 'pressing' | 'false-9' | 'low-block' | 'counter-press' | 'half-space' | 'vertical-counter' | 'catenaccio' | 'total-football';
  complexity?: number;
  strategicFocus?: string[];
  historicalContext?: string;
  keyTraits?: string[];
  radarProfile?: RadarPoint[];
  famousTeams?: string[];
  relatedBattleId?: string;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  type: 'Theory' | 'Simulation' | 'Quiz';
  relatedBattleId?: string;
  relatedKnowledgeId?: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  level: string;
  icon: string;
  modules: LearningModule[];
}
