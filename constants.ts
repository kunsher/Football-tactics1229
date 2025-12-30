
import type { Battle, GlossaryTerm, PlayerPosition, LearningPath } from './types';

export const GLOSSARY: GlossaryTerm[] = [
  { 
    term: 'Tiki-taka', 
    definition: '一种通过极短的传球和频繁的跑位来掌控球权的战术体系，其核心逻辑在于通过不断的传导将防守方“催眠”，并在对方精神高度集中的防线出现裂缝时，通过致命直塞完成一击。', 
    category: 'System',
    icon: '🌀',
    visualEffect: 'tiki-taka',
    historicalContext: '源于克鲁伊夫的“全攻全守”，经由里杰卡尔德改良，并在瓜迪奥拉时代的巴塞罗那（2008-2012）达到巅峰。它不仅是一种阵型，更是一种对“空间支配权”的极致追求。',
    keyTraits: ['极致控球(>65%)', '高频短传', '三角形站位', '位置感优先', '高位逼抢回收'],
    famousTeams: ['巴塞罗那 (2008-2012)', '西班牙国家队 (2008-2012)', '拜仁慕尼黑 (2013-2016)'],
    relatedBattleId: 'tiki-taka-2011',
    radarProfile: [
      { subject: '控球', A: 100, B: 0, fullMark: 100 },
      { subject: '压迫', A: 90, B: 0, fullMark: 100 },
      { subject: '速度', A: 40, B: 0, fullMark: 100 },
      { subject: '创造力', A: 95, B: 0, fullMark: 100 },
      { subject: '防守', A: 70, B: 0, fullMark: 100 },
      { subject: '纪律', A: 90, B: 0, fullMark: 100 },
    ]
  },
  { 
    term: '高位压迫 (Gegenpressing)', 
    definition: '这是一种“以攻代守”的战术，其核心不在于抢断本身，而在于利用对手在夺回球权后的瞬时心理松懈，迅速形成包围网，将对手最危险的进攻转化成己方的反击起点。', 
    category: 'System',
    icon: '⚡',
    visualEffect: 'pressing',
    historicalContext: '由朗尼克奠定理论，克洛普在多特蒙德时期发扬光大。它推翻了传统的“回防”概念，代之以“就地反抢”，极大地加快了比赛节奏。',
    keyTraits: ['瞬时反抢', '高强度冲刺', '垂直攻击', '体力要求极高', '集体联动'],
    famousTeams: ['多特蒙德 (2010-2013)', '利物浦 (2018-2022)', 'RB莱比锡'],
    radarProfile: [
      { subject: '控球', A: 65, B: 0, fullMark: 100 },
      { subject: '压迫', A: 100, B: 0, fullMark: 100 },
      { subject: '速度', A: 95, B: 0, fullMark: 100 },
      { subject: '创造力', A: 80, B: 0, fullMark: 100 },
      { subject: '防守', A: 85, B: 0, fullMark: 100 },
      { subject: '纪律', A: 88, B: 0, fullMark: 100 },
    ]
  },
  { 
    term: '肋部空间 (Half-Space)', 
    definition: '指球场纵向划分中，边路与中路之间的过渡区域。现代战术中，这被认为是防守方防区交界最模糊、进攻收益最高的“黄金区域”。', 
    category: 'Phase',
    icon: '🏟️',
    visualEffect: 'half-space',
    historicalContext: '在区域防守普及后，教练们发现直接攻打中路成本太高，于是转向肋部寻求“盲区”接球。',
    keyTraits: ['防线交界处', '视野开阔', '传中高发区', '组织核心活跃区'],
    famousTeams: ['曼城 (瓜迪奥拉)', '纳格尔斯曼时期的球队'],
    radarProfile: [
      { subject: '视野', A: 95, B: 0, fullMark: 100 },
      { subject: '技术', A: 90, B: 0, fullMark: 100 },
      { subject: '灵活', A: 85, B: 0, fullMark: 100 },
      { subject: '穿透', A: 98, B: 0, fullMark: 100 },
    ]
  },
  { term: '伪九号 (False 9)', icon: '👻', visualEffect: 'false-9', definition: '前锋回撤至中场接球，吸引对方中卫前移，从而为队友在身后创造插上空间。', category: 'Position', keyTraits: ['大范围回撤', '策应能力', '空间制造'], historicalContext: '源于50年代的匈牙利，在梅西时代的巴萨发扬光大。' },
  { term: '肋部插上 (Underlap)', icon: '🗡️', visualEffect: 'overlap', definition: '指边路球员不沿边线套外，而是从防守方边后卫与中卫之间的缝隙（肋部）进行内切跑位。', category: 'Action' },
  { term: '低位防守 (Low Block)', icon: '🧱', visualEffect: 'low-block', definition: '防守方将防线整体退缩至本方禁区前沿，压缩纵向空间，使对方难以通过传球打透。', category: 'Phase', keyTraits: ['紧凑阵型', '纵深保护', '身体对抗'] },
  { term: '瞬时反抢 (Counter-Press)', icon: '💥', visualEffect: 'counter-press', definition: '在进攻丢失球权的瞬间，不选择后撤回防，而是立即对持球人进行围抢。', category: 'Action' },
  { term: '十字联防 (Catenaccio)', icon: '⛓️', definition: '意大利经典防守体系，通过自由人（Libero）在防线后方的横向扫荡实现极致保护。', category: 'System', historicalContext: '60年代大国际米兰的统治基石。' },
];

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'path-1',
    title: "入门：阵型概论",
    description: "从经典的 4-4-2 到现代的 3-2-4-1，理解足球阵型的骨架及其空间逻辑。",
    level: 'Beginner',
    icon: '📐',
    modules: [
      { id: 'm1-1', title: '球场坐标系：理解五道线', description: '学习如何将球场划分为纵向 and 横向的战术区域。', type: 'Theory' },
      { id: 'm1-2', title: '4-3-3：控球者的避风港', description: '深入探讨 Tiki-taka 的基础阵型布局。', type: 'Theory', relatedKnowledgeId: 'Tiki-taka' },
      { id: 'm1-3', title: '实战复现：2011 欧冠温布利之夜', description: '观察瓜氏巴萨如何利用阵型宽度撕裂曼联。', type: 'Simulation', relatedBattleId: 'tiki-taka-2011' },
    ]
  },
  {
    id: 'path-2',
    title: "进阶：防守艺术",
    description: "掌握从全场紧逼到低位防守的转换策略，学习如何建立不可逾越的屏障。",
    level: 'Intermediate',
    icon: '🛡️',
    modules: [
      { id: 'm2-1', title: '低位防守 (Low Block) 实录', description: '学习如何压缩三线距离，使对方陷入传球泥潭。', type: 'Theory', relatedKnowledgeId: '低位防守 (Low Block)' },
      { id: 'm2-2', title: '攻防转换：穆氏反击的黄金 3 秒', description: '分析从拦截到进球的极简转换逻辑。', type: 'Simulation', relatedBattleId: 'mourinho-cr7-2012' },
      { id: 'm2-3', title: '防守选位模拟练习', description: '在沙盒中尝试通过选位封锁传球线路。', type: 'Quiz' },
    ]
  }
];

// Standard stats helper
const getScoutingStats = (s: number, f: number, p: number, d: number, def: number, phy: number) => [
    { label: '速度', value: s },
    { label: '射门', value: f },
    { label: '传球', value: p },
    { label: '盘带', value: d },
    { label: '防守', value: def },
    { label: '身体', value: phy },
];

// --- 2011 Barca vs ManU ---
const getBarcaSquad2011 = (overrides: Partial<PlayerPosition>[] = []): PlayerPosition[] => {
  const base: PlayerPosition[] = [
    { id: 'H1', number: 1, position: 'GK', line: 'GK', x: 5, y: 50, name: '巴尔德斯', role: '门将', team: 'home' },
    { id: 'H3', number: 3, position: 'CB', line: 'DEF', x: 15, y: 62, name: '皮克', role: '出球中卫', team: 'home' },
    { id: 'H16', number: 16, position: 'CDM', line: 'MID', x: 32, y: 50, name: '布斯克茨', role: '单后腰', team: 'home', scoutingStats: getScoutingStats(65, 60, 95, 88, 92, 80) },
    { id: 'H6', number: 6, position: 'CM', line: 'MID', x: 45, y: 65, name: '哈维', role: '指挥官', team: 'home', scoutingStats: getScoutingStats(72, 75, 99, 94, 70, 75) },
    { id: 'H10', number: 10, position: 'CF', line: 'FWD', x: 55, y: 50, name: '梅西', role: '伪九号', team: 'home', scoutingStats: getScoutingStats(94, 98, 96, 99, 45, 78) },
  ];
  return base.map(p => ({ ...p, ...overrides.find(o => o.id === p.id) }));
};

const getUnitedSquad2011 = (overrides: Partial<PlayerPosition>[] = []): PlayerPosition[] => {
  const base: PlayerPosition[] = [
    { id: 'A1', number: 1, position: 'GK', line: 'GK', x: 95, y: 50, name: '范德萨', role: '门将', team: 'away' },
    { id: 'A5', number: 5, position: 'CB', line: 'DEF', x: 80, y: 60, name: '费迪南德', role: '中卫', team: 'away' },
    { id: 'A10', number: 10, position: 'SS', line: 'FWD', x: 45, y: 55, name: '鲁尼', role: '影锋', team: 'away', scoutingStats: getScoutingStats(82, 94, 88, 86, 60, 92) },
  ];
  return base.map(p => ({ ...p, ...overrides.find(o => o.id === p.id) }));
};

export const BATTLES: Battle[] = [
  {
    id: 'tiki-taka-2011',
    title: '温布利之巅：艺术足球复刻',
    subtitle: '巴塞罗那 3-1 曼彻斯特联',
    score: { home: 3, away: 1 },
    description: '温布利大球场，瓜迪奥拉的巴塞罗那向世人展示了何为极致。',
    teams: {
      home: { name: '巴塞罗那', color: '#a50044', coach: '瓜迪奥拉', formation: '4-3-3', philosophy: '通过不断的三角形传递消解对方压迫。' },
      away: { name: '曼联', color: '#da291c', coach: '弗格森', formation: '4-4-1-1', philosophy: '利用边路速度反击。' }
    },
    radarData: [
      { subject: '控球率', A: 95, B: 40, fullMark: 100 },
      { subject: '压迫', A: 90, B: 65, fullMark: 100 },
      { subject: '空间', A: 98, B: 60, fullMark: 100 },
      { subject: '转换', A: 45, B: 90, fullMark: 100 },
      { subject: '防守', A: 70, B: 85, fullMark: 100 },
      { subject: '纪律', A: 95, B: 92, fullMark: 100 },
    ],
    phases: [
      {
        id: 'p1', title: '底线发起', description: '皮球由皮克在底线附近发起。',
        homePlayers: getBarcaSquad2011([{ id: 'H3', x: 12, y: 65 }]),
        awayPlayers: getUnitedSquad2011([{ id: 'A10', x: 38, y: 65 }]),
        connections: [{ from: 'H3', to: 'H16', weight: 60, successRate: 0.99 }]
      }
    ],
    stats: {
      possession: { home: 68, away: 32 },
      shots: { home: 19, away: 4, onTargetHome: 12, onTargetAway: 1 },
      passes: { home: 772, away: 301, accuracyHome: 91, accuracyAway: 72 }
    }
  }
];
