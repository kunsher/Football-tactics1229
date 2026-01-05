
import type { Battle, GlossaryTerm, PlayerPosition, LearningPath } from './types';

const defaultRadar = [
  { subject: '压迫', A: 70, B: 0, fullMark: 100 },
  { subject: '控球', A: 60, B: 0, fullMark: 100 },
  { subject: '速度', A: 80, B: 0, fullMark: 100 },
  { subject: '对抗', A: 75, B: 0, fullMark: 100 },
  { subject: '纪律', A: 85, B: 0, fullMark: 100 },
  { subject: '创造力', A: 90, B: 0, fullMark: 100 },
];

export const GLOSSARY: GlossaryTerm[] = [
  { 
    term: 'Tiki-taka', 
    definition: '一种通过极短的传球和频繁的跑位来掌控球权的战术体系，其核心逻辑在于通过不断的传导将防守方“催眠”，并在对方精神高度集中的防线出现裂缝时，通过致命直塞完成一击。', 
    category: 'System',
    icon: '🌀',
    visualEffect: 'tiki-taka',
    complexity: 5,
    strategicFocus: ['空间支配', '心理博弈', '极致短传'],
    historicalContext: '源于克鲁伊夫的“全攻全守”，并在瓜迪奥拉时代的巴塞罗那（2008-2012）达到巅峰。',
    keyTraits: ['极致控球(>65%)', '高频短传', '三角形站位', '位置感优先', '高位逼抢回收'],
    famousTeams: ['巴塞罗那 (2008-2012)', '西班牙国家队 (2010)', '拜仁 (瓜迪奥拉时期)'],
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
    definition: '这是一种“以攻代守”的战术，其核心不在于抢断本身，而在于利用对手在夺回球权后的瞬时心理松懈，迅速形成包围网。', 
    category: 'System',
    icon: '⚡',
    visualEffect: 'pressing',
    complexity: 4,
    strategicFocus: ['瞬时反反', '垂直打击', '全员狂奔'],
    historicalContext: '由朗尼克奠定理论，克洛普在多特蒙德时期发扬光大。',
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
    icon: '🏟️', 
    visualEffect: 'half-space', 
    definition: '指球场纵向划分中，边路与中路之间的过渡区域。在这里接球可以迫使对方后卫陷入跟防还是内切的艰难抉择。', 
    category: 'Phase', 
    complexity: 3,
    strategicFocus: ['战术死角', '防线错位'],
    radarProfile: [
      { subject: '控球', A: 40, B: 0, fullMark: 100 },
      { subject: '压迫', A: 30, B: 0, fullMark: 100 },
      { subject: '速度', A: 50, B: 0, fullMark: 100 },
      { subject: '创造力', A: 100, B: 0, fullMark: 100 },
      { subject: '防守', A: 20, B: 0, fullMark: 100 },
      { subject: '纪律', A: 60, B: 0, fullMark: 100 },
    ]
  },
  { 
    term: '伪九号 (False 9)', 
    icon: '👻', 
    visualEffect: 'false-9', 
    definition: '前锋回撤至中场接球，吸引对方中卫前移，从而为队友在身后创造插上空间。梅西在巴萨的巅峰期是该位置的终极演绎。', 
    category: 'Position', 
    complexity: 5,
    strategicFocus: ['中卫引诱', '空间利用'],
    radarProfile: [
      { subject: '控球', A: 90, B: 0, fullMark: 100 },
      { subject: '压迫', A: 50, B: 0, fullMark: 100 },
      { subject: '速度', A: 75, B: 0, fullMark: 100 },
      { subject: '创造力', A: 100, B: 0, fullMark: 100 },
      { subject: '防守', A: 30, B: 0, fullMark: 100 },
      { subject: '纪律', A: 70, B: 0, fullMark: 100 },
    ]
  },
  { 
    term: '肋部插上 (Underlap)', 
    icon: '🗡️', 
    visualEffect: 'overlap', 
    definition: '边后卫向内切入中场，而不是传统的沿边路传中，这会增加中场的人数优势。', 
    category: 'Action', 
    complexity: 3,
    radarProfile: defaultRadar
  },
  { 
    term: '低位防守 (Low Block)', 
    icon: '🧱', 
    visualEffect: 'low-block', 
    definition: '防守方整体退缩至本方禁区前沿。核心在于压缩对手在禁区内的处理球空间，极其考验对手的远射和定位球能力。', 
    category: 'Phase', 
    complexity: 2,
    radarProfile: [
      { subject: '控球', A: 20, B: 0, fullMark: 100 },
      { subject: '压迫', A: 40, B: 0, fullMark: 100 },
      { subject: '速度', A: 30, B: 0, fullMark: 100 },
      { subject: '创造力', A: 40, B: 0, fullMark: 100 },
      { subject: '防守', A: 100, B: 0, fullMark: 100 },
      { subject: '纪律', A: 100, B: 0, fullMark: 100 },
    ]
  },
  { 
    term: '瞬时反抢 (Counter-Press)', 
    icon: '💥', 
    visualEffect: 'counter-press', 
    definition: '丢失球权的瞬间立即对持球人进行围抢，利用对手由守转攻的思维转换间隙夺回球权。', 
    category: 'Action', 
    complexity: 4,
    radarProfile: defaultRadar
  },
];

const getScoutingStats = (s: number, f: number, p: number, d: number, def: number, phy: number) => [
  { label: '速度', value: s },
  { label: '射门', value: f },
  { label: '传球', value: p },
  { label: '盘带', value: d },
  { label: '防守', value: def },
  { label: '身体', value: phy },
];

// ... (球员生成逻辑保持不变)
const getBarcaSquad2011 = (overrides: Partial<PlayerPosition>[] = []): PlayerPosition[] => {
  const base: PlayerPosition[] = [
    { id: 'H1', number: 1, position: 'GK', line: 'GK', x: 5, y: 50, name: '巴尔德斯', role: '清道夫门将', team: 'home' },
    { id: 'H2', number: 2, position: 'RB', line: 'DEF', x: 25, y: 88, name: '丹尼·阿尔维斯', role: '进攻型边后卫', team: 'home' },
    { id: 'H14', number: 14, position: 'CB', line: 'DEF', x: 15, y: 38, name: '马斯切拉诺', role: '拦截中卫', team: 'home' },
    { id: 'H3', number: 3, position: 'CB', line: 'DEF', x: 15, y: 62, name: '皮克', role: '出球中卫', team: 'home' },
    { id: 'H22', number: 22, position: 'LB', line: 'DEF', x: 25, y: 12, name: '阿比达尔', role: '稳健边后卫', team: 'home' },
    { id: 'H16', number: 16, position: 'CDM', line: 'MID', x: 32, y: 50, name: '布斯克茨', role: '节拍器', team: 'home' },
    { id: 'H6', number: 6, position: 'CM', line: 'MID', x: 45, y: 65, name: '哈维', role: '大脑', team: 'home' },
    { id: 'H8', number: 8, position: 'CM', line: 'MID', x: 45, y: 35, name: '伊涅斯塔', role: '突破手', team: 'home' },
    { id: 'H17', number: 17, position: 'RW', line: 'FWD', x: 55, y: 82, name: '佩德罗', role: '拉边', team: 'home' },
    { id: 'H10', number: 10, position: 'CF', line: 'FWD', x: 55, y: 50, name: '梅西', role: '伪九号', team: 'home' },
    { id: 'H7', number: 7, position: 'LW', line: 'FWD', x: 55, y: 18, name: '比利亚', role: '终结者', team: 'home' },
  ];
  return base.map(p => ({ ...p, ...overrides.find(o => o.id === p.id) }));
};

const getUnitedSquad2011 = (overrides: Partial<PlayerPosition>[] = []): PlayerPosition[] => {
  const base: PlayerPosition[] = [
    { id: 'A1', number: 1, position: 'GK', line: 'GK', x: 95, y: 50, name: '范德萨', role: '门神', team: 'away' },
    { id: 'A20', number: 20, position: 'RB', line: 'DEF', x: 75, y: 85, name: '法比奥', role: '边卫', team: 'away' },
    { id: 'A5', number: 5, position: 'CB', line: 'DEF', x: 82, y: 60, name: '费迪南德', role: '中卫', team: 'away' },
    { id: 'A15', number: 15, position: 'CB', line: 'DEF', x: 82, y: 40, name: '维迪奇', role: '中卫', team: 'away' },
    { id: 'A3', number: 3, position: 'LB', line: 'DEF', x: 75, y: 15, name: '埃弗拉', role: '边卫', team: 'away' },
    { id: 'A25', number: 25, position: 'RM', line: 'MID', x: 65, y: 80, name: '瓦伦西亚', role: '快马', team: 'away' },
    { id: 'A16', number: 16, position: 'CM', line: 'MID', x: 58, y: 62, name: '卡里克', role: '后腰', team: 'away' },
    { id: 'A11', number: 11, position: 'CM', line: 'MID', x: 58, y: 38, name: '吉格斯', role: '策应', team: 'away' },
    { id: 'A13', number: 13, position: 'LM', line: 'MID', x: 65, y: 20, name: '朴智星', role: '缠斗者', team: 'away' },
    { id: 'A10', number: 10, position: 'SS', line: 'FWD', x: 48, y: 55, name: '鲁尼', role: '核心', team: 'away' },
    { id: 'A14', number: 14, position: 'ST', line: 'FWD', x: 38, y: 45, name: '小豌豆', role: '射手', team: 'away' },
  ];
  return base.map(p => ({ ...p, ...overrides.find(o => o.id === p.id) }));
};

const getInterSquad2010 = (overrides: Partial<PlayerPosition>[] = []): PlayerPosition[] => {
  const base: PlayerPosition[] = [
    { id: 'I12', number: 12, position: 'GK', line: 'GK', x: 5, y: 50, name: '塞萨尔', role: '门神', team: 'home' },
    { id: 'I13', number: 13, position: 'RB', line: 'DEF', x: 25, y: 90, name: '麦孔', role: '世界第一右后卫', team: 'home' },
    { id: 'I6', number: 6, position: 'CB', line: 'DEF', x: 15, y: 65, name: '卢西奥', role: '铁血中卫', team: 'home' },
    { id: 'I25', number: 25, position: 'CB', line: 'DEF', x: 15, y: 35, name: '萨穆埃尔', role: '岩石', team: 'home' },
    { id: 'I4', number: 4, position: 'LB', line: 'DEF', x: 25, y: 10, name: '萨内蒂', role: '永动机', team: 'home' },
    { id: 'I19', number: 19, position: 'CDM', line: 'MID', x: 32, y: 60, name: '坎比亚索', role: '战术大脑', team: 'home' },
    { id: 'I8', number: 8, position: 'CDM', line: 'MID', x: 32, y: 40, name: '莫塔', role: '屏障', team: 'home' },
    { id: 'I10', number: 10, position: 'CAM', line: 'MID', x: 45, y: 50, name: '斯内德', role: '核心司令官', team: 'home' },
    { id: 'I9', number: 9, position: 'RW', line: 'FWD', x: 55, y: 80, name: '埃托奥', role: '牺牲精神', team: 'home' },
    { id: 'I22', number: 22, position: 'ST', line: 'FWD', x: 65, y: 50, name: '米利托', role: '大场面杀手', team: 'home' },
    { id: 'I27', number: 27, position: 'LW', line: 'FWD', x: 55, y: 20, name: '潘德夫', role: '辅助射手', team: 'home' },
  ];
  return base.map(p => ({ ...p, ...overrides.find(o => o.id === p.id) }));
};

const getRealSquad2012 = (overrides: Partial<PlayerPosition>[] = []): PlayerPosition[] => {
  const base: PlayerPosition[] = [
    { id: 'R1', number: 1, position: 'GK', line: 'GK', x: 95, y: 50, name: '卡西利亚斯', role: '门神', team: 'away' },
    { id: 'R17', number: 17, position: 'RB', line: 'DEF', x: 75, y: 88, name: '阿韦洛亚', role: '防守边卫', team: 'away' },
    { id: 'R3', number: 3, position: 'CB', line: 'DEF', x: 82, y: 62, name: '佩佩', role: '武僧', team: 'away' },
    { id: 'R4', number: 4, position: 'CB', line: 'DEF', x: 82, y: 38, name: '拉莫斯', role: '带刀中卫', team: 'away' },
    { id: 'R5', number: 5, position: 'LB', line: 'DEF', x: 75, y: 12, name: '科恩特朗', role: '奔跑者', team: 'away' },
    { id: 'R6', number: 6, position: 'CDM', line: 'MID', x: 65, y: 42, name: '赫迪拉', role: '扫荡', team: 'away' },
    { id: 'R14', number: 14, position: 'CDM', line: 'MID', x: 65, y: 58, name: '阿隆索', role: '节拍器', team: 'away' },
    { id: 'R22', number: 22, position: 'RW', line: 'FWD', x: 45, y: 85, name: '迪马利亚', role: '天使', team: 'away' },
    { id: 'R10', number: 10, position: 'CAM', line: 'MID', x: 45, y: 50, name: '厄齐尔', role: '喂饼大师', team: 'away' },
    { id: 'R7', number: 7, position: 'LW', line: 'FWD', x: 45, y: 15, name: 'C罗', role: '终结核心', team: 'away' },
    { id: 'R9', number: 9, position: 'ST', line: 'FWD', x: 35, y: 50, name: '本泽马', role: '支点', team: 'away' },
  ];
  return base.map(p => ({ ...p, ...overrides.find(o => o.id === p.id) }));
};

const getLiverpoolSquad2019 = (overrides: Partial<PlayerPosition>[] = []): PlayerPosition[] => {
  const base: PlayerPosition[] = [
    { id: 'L13', number: 13, position: 'GK', line: 'GK', x: 5, y: 50, name: '阿利松', role: '门神', team: 'home' },
    { id: 'L66', number: 66, position: 'RB', line: 'DEF', x: 28, y: 92, name: '阿诺德', role: '组织后卫', team: 'home' },
    { id: 'L32', number: 32, position: 'CB', line: 'DEF', x: 18, y: 65, name: '马蒂普', role: '中卫', team: 'home' },
    { id: 'L4', number: 4, position: 'CB', line: 'DEF', x: 18, y: 35, name: '范戴克', role: '定海神针', team: 'home' },
    { id: 'L26', number: 26, position: 'LB', line: 'DEF', x: 28, y: 8, name: '罗伯逊', role: '铁肺', team: 'home' },
    { id: 'L3', number: 3, position: 'CDM', line: 'MID', x: 35, y: 50, name: '法比尼奥', role: '拦截', team: 'home' },
    { id: 'L14', number: 14, position: 'CM', line: 'MID', x: 48, y: 70, name: '亨德森', role: '队长', team: 'home' },
    { id: 'L7', number: 7, position: 'CM', line: 'MID', x: 48, y: 30, name: '米尔纳', role: '万金油', team: 'home' },
    { id: 'L23', number: 23, position: 'RW', line: 'FWD', x: 62, y: 82, name: '沙奇里', role: '突破', team: 'home' },
    { id: 'L27', number: 27, position: 'ST', line: 'FWD', x: 68, y: 50, name: '奥里吉', role: '锦鲤', team: 'home' },
    { id: 'L10', number: 10, position: 'LW', line: 'FWD', x: 62, y: 18, name: '马内', role: '利刃', team: 'home' },
  ];
  return base.map(p => ({ ...p, ...overrides.find(o => o.id === p.id) }));
};

const getBarcaSquad2019 = (overrides: Partial<PlayerPosition>[] = []): PlayerPosition[] => {
  const base: PlayerPosition[] = [
    { id: 'BS1', number: 1, position: 'GK', line: 'GK', x: 95, y: 50, name: '特尔施特根', role: '门将', team: 'away' },
    { id: 'BS20', number: 20, position: 'RB', line: 'DEF', x: 75, y: 85, name: '罗贝托', role: '多面手', team: 'away' },
    { id: 'BS3', number: 3, position: 'CB', line: 'DEF', x: 82, y: 65, name: '皮克', role: '屏障', team: 'away' },
    { id: 'BS15', number: 15, position: 'CB', line: 'DEF', x: 82, y: 35, name: '朗格莱', role: '中卫', team: 'away' },
    { id: 'BS18', number: 18, position: 'LB', line: 'DEF', x: 75, y: 15, name: '阿尔巴', role: '左廊', team: 'away' },
    { id: 'BS5', number: 5, position: 'CDM', line: 'MID', x: 65, y: 50, name: '布斯克茨', role: '枢纽', team: 'away' },
    { id: 'BS4', number: 4, position: 'CM', line: 'MID', x: 55, y: 70, name: '拉基蒂奇', role: '工兵', team: 'away' },
    { id: 'BS22', number: 22, position: 'CM', line: 'MID', x: 55, y: 30, name: '比达尔', role: '硬汉', team: 'away' },
    { id: 'BS10', number: 10, position: 'RW', line: 'FWD', x: 45, y: 65, name: '梅西', role: '核心', team: 'away' },
    { id: 'BS9', number: 9, position: 'ST', line: 'FWD', x: 42, y: 50, name: '苏亚雷斯', role: '射手', team: 'away' },
    { id: 'BS7', number: 7, position: 'LW', line: 'FWD', x: 45, y: 35, name: '库蒂尼奥', role: '组织', team: 'away' },
  ];
  return base.map(p => ({ ...p, ...overrides.find(o => o.id === p.id) }));
};

export const BATTLES: Battle[] = [
  {
    id: 'tiki-taka-2011',
    title: '温布利之巅：艺术复刻',
    subtitle: '巴塞罗那 3-1 曼彻斯特联',
    score: { home: 3, away: 1 },
    description: '温布利大球场，瓜迪奥拉的巴塞罗那向世人展示了何为极致。本篇章完整复刻了巴萨如何通过不断的三角形传递消解对方压迫。',
    teams: {
      home: { name: '巴塞罗那', color: '#a50044', coach: '瓜迪奥拉', formation: '4-3-3', philosophy: '三角形短传渗透。' },
      away: { name: '曼联', color: '#da291c', coach: '弗格森', formation: '4-4-1-1', philosophy: '快速转换与防守反击。' }
    },
    radarData: [
      { subject: '控球率', A: 95, B: 40, fullMark: 100 },
      { subject: '压迫强度', A: 90, B: 65, fullMark: 100 },
      { subject: '空间创造', A: 98, B: 60, fullMark: 100 },
      { subject: '垂直转换', A: 45, B: 90, fullMark: 100 },
      { subject: '防守厚度', A: 70, B: 85, fullMark: 100 },
      { subject: '战术执行', A: 95, B: 92, fullMark: 100 },
    ],
    phases: [
      {
        id: 'p1', title: '底线发起', description: '皮球由皮克在底线附近发起。布斯克茨沉入两名中卫之间，巴萨阵型瞬间转变为 3-4-3。',
        homePlayers: getBarcaSquad2011([{ id: 'H3', x: 12, y: 65 }, { id: 'H16', x: 22, y: 50 }]),
        awayPlayers: getUnitedSquad2011([{ id: 'A10', x: 38, y: 65 }, { id: 'A14', x: 32, y: 48 }]),
        connections: [{ from: 'H3', to: 'H16', weight: 60, successRate: 0.99 }]
      },
      {
        id: 'p2', title: '中场枢纽', description: '布斯克茨在压力下洗球，一记精准的斜传找到回撤的哈维。',
        homePlayers: getBarcaSquad2011([{ id: 'H16', x: 28, y: 50 }, { id: 'H6', x: 48, y: 68 }]),
        awayPlayers: getUnitedSquad2011([{ id: 'A16', x: 55, y: 62 }, { id: 'A11', x: 52, y: 45 }]),
        connections: [{ from: 'H16', to: 'H6', weight: 80, successRate: 0.95 }]
      },
      {
        id: 'p4', title: '致命一击', description: '比利亚禁区外突施冷箭，直挂死角。',
        homePlayers: getBarcaSquad2011([{ id: 'H10', x: 75, y: 55 }, { id: 'H7', x: 92, y: 35 }]),
        awayPlayers: getUnitedSquad2011([{ id: 'A1', x: 96, y: 48 }, { id: 'A5', x: 88, y: 50 }]),
        connections: [{ from: 'H10', to: 'H7', weight: 100, successRate: 0.85 }]
      }
    ],
    stats: {
      possession: { home: 68, away: 32 },
      shots: { home: 19, away: 4, onTargetHome: 12, onTargetAway: 1 },
      passes: { home: 772, away: 301, accuracyHome: 91, accuracyAway: 72 }
    }
  },
  {
    id: 'mourinho-inter-2010',
    title: '梅阿查奇迹：狂人的反击',
    subtitle: '国际米兰 3-1 巴塞罗那',
    score: { home: 3, away: 1 },
    description: '2010年欧冠半决赛首回合。穆里尼奥通过教科书般的防守反击与身体对抗，终结了梦三巴萨的统治。',
    teams: {
      home: { name: '国际米兰', color: '#0066b2', coach: '穆里尼奥', formation: '4-2-3-1', philosophy: '通过身体对抗限制哈白梅。' },
      away: { name: '巴塞罗那', color: '#a50044', coach: '瓜迪奥拉', formation: '4-3-3', philosophy: '控球与渗透。' }
    },
    radarData: [
      { subject: '防守强度', A: 100, B: 60, fullMark: 100 },
      { subject: '反击质量', A: 98, B: 40, fullMark: 100 },
      { subject: '对抗', A: 95, B: 65, fullMark: 100 },
      { subject: '控球', A: 32, B: 98, fullMark: 100 },
      { subject: '纪律', A: 100, B: 85, fullMark: 100 },
      { subject: '空间限制', A: 96, B: 70, fullMark: 100 },
    ],
    phases: [
      {
        id: 'inter1', title: '包围圈', description: '国际米兰的双腰坎比亚索和莫塔死死缠住梅西，切断了他与哈维的连线。',
        homePlayers: getInterSquad2010([{ id: 'I19', x: 38, y: 55 }, { id: 'I8', x: 38, y: 45 }]),
        awayPlayers: getBarcaSquad2011([{ id: 'H10', x: 42, y: 50 }, { id: 'H6', x: 55, y: 50 }]),
        connections: []
      },
      {
        id: 'inter2', title: '垂直打击', description: '断球后米利托迅速横传，斯内德插入禁区推射死角扳平。',
        homePlayers: getInterSquad2010([{ id: 'I22', x: 75, y: 65 }, { id: 'I10', x: 88, y: 50 }]),
        awayPlayers: getBarcaSquad2011([{ id: 'H3', x: 80, y: 60 }]),
        connections: [{ from: 'I22', to: 'I10', weight: 90, successRate: 0.95 }]
      },
      {
        id: 'inter3', title: '麦孔套上', description: '右后卫麦孔高速套上，接米利托妙传，禁区内倒地铲射破门！',
        homePlayers: getInterSquad2010([{ id: 'I22', x: 85, y: 40 }, { id: 'I13', x: 92, y: 65 }]),
        awayPlayers: getBarcaSquad2011([{ id: 'H1', x: 96, y: 50 }]),
        connections: [{ from: 'I22', to: 'I13', weight: 100, successRate: 0.88 }]
      }
    ],
    stats: {
      possession: { home: 32, away: 68 },
      shots: { home: 9, away: 11, onTargetHome: 5, onTargetAway: 4 },
      passes: { home: 240, away: 615, accuracyHome: 68, accuracyAway: 89 }
    }
  },
  {
    id: 'mourinho-calma-2012',
    title: '诺坎普之箭：致命反击',
    subtitle: '巴塞罗那 1-2 皇家马德里',
    score: { home: 1, away: 2 },
    description: '穆里尼奥治下的皇马在诺坎普用教科书般的防守反击击碎了巴萨。C罗进球后的“Calma”手势成为了经典。',
    teams: {
      home: { name: '巴塞罗那', color: '#a50044', coach: '瓜迪奥拉', formation: '3-4-3', philosophy: '极致压迫与控球。' },
      away: { name: '皇家马德里', color: '#ffffff', coach: '穆里尼奥', formation: '4-2-3-1', philosophy: '低位防守与垂直反击。' }
    },
    radarData: [
      { subject: '反击效率', A: 30, B: 100, fullMark: 100 },
      { subject: '防守韧性', A: 60, B: 95, fullMark: 100 },
      { subject: '控球', A: 95, B: 35, fullMark: 100 },
      { subject: '运动战', A: 85, B: 90, fullMark: 100 },
      { subject: '纪律', A: 88, B: 98, fullMark: 100 },
      { subject: '速度', A: 65, B: 95, fullMark: 100 },
    ],
    phases: [
      {
        id: 'r1', title: '低位布防', description: '皇马全线退守。赫迪拉与阿隆索在中圈前沿构筑了一道不可逾越的屏障。',
        homePlayers: getBarcaSquad2011([{ id: 'H6', x: 45, y: 50 }]),
        awayPlayers: getRealSquad2012([{ id: 'R6', x: 65, y: 45 }, { id: 'R14', x: 65, y: 55 }]),
        connections: []
      },
      {
        id: 'r2', title: '垂直连线', description: '厄齐尔在中圈附近接球，不停球直接长传制导，寻找左路斜插的C罗。',
        homePlayers: getBarcaSquad2011([{ id: 'H3', x: 25, y: 50 }]),
        awayPlayers: getRealSquad2012([{ id: 'R10', x: 50, y: 50 }, { id: 'R7', x: 25, y: 15 }]),
        connections: [{ from: 'R10', to: 'R7', weight: 90, successRate: 0.98 }]
      },
      {
        id: 'r3', title: 'Calma 时刻', description: 'C罗晃过出击的巴尔德斯，小角度推射入网。',
        homePlayers: getBarcaSquad2011([{ id: 'H1', x: 10, y: 45 }]),
        awayPlayers: getRealSquad2012([{ id: 'R7', x: 8, y: 42 }]),
        connections: []
      }
    ],
    stats: {
      possession: { home: 72, away: 28 },
      shots: { home: 14, away: 12, onTargetHome: 4, onTargetAway: 6 },
      passes: { home: 650, away: 220, accuracyHome: 88, accuracyAway: 65 }
    }
  },
  {
    id: 'anfield-miracle-2019',
    title: '安菲尔德奇迹',
    subtitle: '利物浦 4-0 巴塞罗那',
    score: { home: 4, away: 0 },
    description: '克洛普的利物浦用窒息般的 Gegenpressing 在主场完成了不可思议的 4 球逆转。',
    teams: {
      home: { name: '利物浦', color: '#c8102e', coach: '克洛普', formation: '4-3-3', philosophy: '高位逼抢与快速垂直进攻。' },
      away: { name: '巴塞罗那', color: '#a50044', coach: '巴尔韦德', formation: '4-3-3', philosophy: '控球与防守平衡。' }
    },
    radarData: [
      { subject: '压迫强度', A: 100, B: 45, fullMark: 100 },
      { subject: '转换速度', A: 95, B: 60, fullMark: 100 },
      { subject: '控球', A: 48, B: 95, fullMark: 100 },
      { subject: '定位球', A: 98, B: 40, fullMark: 100 },
      { subject: '纪律', A: 90, B: 85, fullMark: 100 },
      { subject: '精神力', A: 100, B: 30, fullMark: 100 },
    ],
    phases: [
      {
        id: 'lv1', title: '开场疯抢', description: '利物浦全员像狼群一样涌向巴萨后场，布斯克茨难以安全出球。',
        homePlayers: getLiverpoolSquad2019([{ id: 'L14', x: 55, y: 65 }, { id: 'L10', x: 62, y: 25 }]),
        awayPlayers: getBarcaSquad2019([{ id: 'BS5', x: 75, y: 50 }]),
        connections: [{ from: 'L14', to: 'L10', weight: 60, successRate: 0.9 }]
      },
      {
        id: 'lv3', title: '偷袭角球', description: '利物浦天才少年阿诺德观察到巴萨防线松懈，快速开出角球，奥里吉破门。',
        homePlayers: getLiverpoolSquad2019([{ id: 'L66', x: 99, y: 99 }, { id: 'L27', x: 92, y: 52 }]),
        awayPlayers: getBarcaSquad2019([{ id: 'BS1', x: 96, y: 48 }, { id: 'BS3', x: 85, y: 60 }]),
        connections: [{ from: 'L66', to: 'L27', weight: 100, successRate: 1.0 }]
      }
    ],
    stats: {
      possession: { home: 43, away: 57 },
      shots: { home: 13, away: 8, onTargetHome: 7, onTargetAway: 5 },
      passes: { home: 412, away: 521, accuracyHome: 78, accuracyAway: 84 }
    }
  }
];

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'intro-tactic',
    title: '战术思维入门',
    description: '从基础空间分布到核心战役逻辑，构建足球战术的第一块基石。',
    level: 'Beginner',
    icon: '⚽',
    modules: [
      { id: 'm1', title: '空间支配理论', description: '理解球场纵向与横向的划分逻辑。', type: 'Theory', relatedKnowledgeId: '肋部空间 (Half-Space)' },
      { id: 'm2', title: '温布利复盘', description: '实战拆解 2011 欧冠决赛的传控逻辑。', type: 'Simulation', relatedBattleId: 'tiki-taka-2011' }
    ]
  },
  {
    id: 'modern-pressing',
    title: '现代压迫体系',
    description: '深入研究 Gegenpressing，探索现代足球的速度与激情。',
    level: 'Intermediate',
    icon: '⚡',
    modules: [
      { id: 'm3', title: '反抢逻辑', description: '瞬时反抢的物理前提与心理博弈。', type: 'Theory', relatedKnowledgeId: '高位压迫 (Gegenpressing)' },
      { id: 'm4', title: '安菲尔德奇迹', description: '深度复盘利物浦 4-0 巴萨的压迫实录。', type: 'Simulation', relatedBattleId: 'anfield-miracle-2019' }
    ]
  }
];
