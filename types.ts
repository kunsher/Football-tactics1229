
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
  homePlayers: PlayerPosition[];
  awayPlayers: PlayerPosition[];
  connections: Connection[];
  annotations?: TacticalAnnotation[]; // 新增战术标注
}

// Added ScoutingStat interface to define player attributes used in PlayerModal
export interface ScoutingStat {
  label: string;
  value: number;
}

// Added PhysicalInfo interface to define player biology used in PlayerModal
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
  // Added optional fields required by PlayerModal
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

// Added RadarPoint interface to handle multi-series radar chart data
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
  // Updated to use the typed RadarPoint interface
  radarData: RadarPoint[];
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: 'Position' | 'Phase' | 'Action' | 'System';
  icon?: string;
  // Restricted visualEffect to match literal union in TacticalVisualizer
  visualEffect?: 'overlap' | 'tiki-taka' | 'pressing' | 'false-9' | 'low-block' | 'counter-press' | 'half-space';
  complexity?: number;
  strategicFocus?: string[];
  historicalContext?: string;
  keyTraits?: string[];
  // Updated to use the typed RadarPoint interface
  radarProfile?: RadarPoint[];
  famousTeams?: string[];
  relatedBattleId?: string;
}

// Added LearningModule interface to define components of a LearningPath
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
  // Updated to use the typed LearningModule interface
  modules: LearningModule[];
}
