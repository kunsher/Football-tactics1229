
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

export interface TacticalEvent {
  id: string;
  type: 'Goal' | 'Shot' | 'Transition' | 'Interception' | 'HSR_Burst';
  minute: string;
  phaseId: string;
  label: string;
  relatedKnowledgeId?: string; // 新增：关联的战术百科 ID
}

export interface TacticPhase {
  id: string;
  title: string;
  description: string;
  matchMinute?: string;
  matchContext?: string;
  homePlayers: PlayerPosition[];
  awayPlayers: PlayerPosition[];
  connections: Connection[];
  annotations?: TacticalAnnotation[]; 
}

export interface GpsMetric {
  zone: string;
  speedRange: string;
  distance: number; // meters
  percentage: number;
}

export interface ProfessionalGpsData {
  totalDistance: number;
  metabolicPower: number; // W/kg
  highIntensityDistance: number; // > 19.8 km/h
  sprintsCount: number; // > 25.2 km/h
  maxSpeed: number;
  speedZones: GpsMetric[];
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
  gps?: ProfessionalGpsData; // 升级为职业 GPS 数据
  physical?: { age: string; height: string; foot: 'Left' | 'Right' };
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

export interface StandingEntry {
  pos: number;
  team: string;
  p: number;
  w: number;
  d: number;
  l: number;
  pts: number;
  isCurrent?: boolean;
}

export interface H2HMatch {
  date: string;
  score: string;
  winner: 'home' | 'away' | 'draw';
  competition: string;
}

export interface Battle {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  score: { home: number; away: number };
  teams: { home: TeamInfo; away: TeamInfo };
  phases: TacticPhase[];
  events: TacticalEvent[]; // 新增：Sportscode 事件轴
  stats: MatchStatistics;
  radarData: RadarPoint[];
  leagueStandings?: StandingEntry[]; // 新增：积分榜数据
  h2hData?: H2HMatch[]; // 新增：历史交锋数据
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: 'Position' | 'Phase' | 'Action' | 'System' | 'Emerging';
  icon?: string;
  visualEffect?: string;
  complexity?: number;
  strategicFocus?: string[];
  historicalContext?: string;
  keyTraits?: string[];
  radarProfile?: RadarPoint[];
  famousTeams?: string[];
  relatedBattleId?: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  level: string;
  icon: string;
  modules: any[];
}
