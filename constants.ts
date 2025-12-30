
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
    term: '十字联防 (Catenaccio)', 
    definition: '意大利足球的瑰宝，意为“链条”。它通过一名自由人（Libero）在防线后方的横向扫荡，与前方的人盯人体系交织成网。', 
    category: 'System',
    icon: '⛓️',
    visualEffect: 'low-block',
    historicalContext: '由赫雷拉在大国际米兰时代推向世界。这是一种实用主义至上的哲学，强调“1-0主义”，先稳固防守，再寻求致命反击。',
    keyTraits: ['自由人(Libero)', '铁血防守', '心理博弈', '防守层次感', '长传反击'],
    famousTeams: ['大国际米兰 (1960s)', 'AC米兰 (1990s)', '意大利国家队 (1982/2006)'],
    radarProfile: [
      { subject: '控球', A: 30, B: 0, fullMark: 100 },
      { subject: '压迫', A: 60, B: 0, fullMark: 100 },
      { subject: '速度', A: 75, B: 0, fullMark: 100 },
      { subject: '创造力', A: 60, B: 0, fullMark: 100 },
      { subject: '防守', A: 100, B: 0, fullMark: 100 },
      { subject: '纪律', A: 100, B: 0, fullMark: 100 },
    ]
  },
  { 
    term: '全能足球 (Total Football)', 
    definition: '足球历史上最具革命性的体系。阵型只是数字，其精髓在于位置的流动性。除门将外，任何球员都可以承担进攻或防守的任何职责。', 
    category: 'System',
    icon: '🌍',
    historicalContext: '由里努斯·米歇尔斯在70年代创造，克鲁英夫是这一哲学的场上大脑。它要求球员具备极高的战术素养和体能。',
    keyTraits: ['位置轮换', '阵型扩张/收缩', '全员进攻', '制造越位', '全能素质'],
    famousTeams: ['阿贾克斯 (1970s)', '荷兰国家队 (1974)'],
    radarProfile: [
      { subject: '控球', A: 85, B: 0, fullMark: 100 },
      { subject: '压迫', A: 95, B: 0, fullMark: 100 },
      { subject: '速度', A: 88, B: 0, fullMark: 100 },
      { subject: '创造力', A: 95, B: 0, fullMark: 100 },
      { subject: '防守', A: 80, B: 0, fullMark: 100 },
      { subject: '纪律', A: 85, B: 0, fullMark: 100 },
    ]
  },
  { 
    term: '防守反击 (Counter-Attack)', 
    definition: '利用对手大举压上后留下的后场空档，通过极少数球员的快速传切或个人突破，在3-5次传递内完成射门的极简策略。', 
    category: 'System',
    icon: '🏹',
    historicalContext: '现代足球中最经典的“以弱胜强”方案。穆里尼奥时代的皇马通过阿隆索的长传和C罗的速度将其发挥到了工业化的极致。',
    keyTraits: ['垂直打击', '空间利用', '边路爆破', '极致效率', '双层防线'],
    famousTeams: ['皇家马德里 (2011-2012)', '莱斯特城 (2016)', '切尔西 (2012)'],
    relatedBattleId: 'mourinho-cr7-2012',
    radarProfile: [
      { subject: '控球', A: 45, B: 0, fullMark: 100 },
      { subject: '压迫', A: 75, B: 0, fullMark: 100 },
      { subject: '速度', A: 100, B: 0, fullMark: 100 },
      { subject: '创造力', A: 85, B: 0, fullMark: 100 },
      { subject: '防守', A: 90, B: 0, fullMark: 100 },
      { subject: '纪律', A: 95, B: 0, fullMark: 100 },
    ]
  },
  { term: '伪九号 (False 9)', icon: '👻', visualEffect: 'false-9', definition: '前锋回撤至中场接球，吸引对方中卫前移，从而为队友在身后创造插上空间。', category: 'Position' },
  { term: '肋部插上 (Underlap)', icon: '🗡️', visualEffect: 'overlap', definition: '指边路球员不沿边线套外，而是从防守方边后卫与中卫之间的缝隙（肋部）进行内切跑位。', category: 'Action' },
  { term: '低位防守 (Low Block)', icon: '🧱', visualEffect: 'low-block', definition: '防守方将防线整体退缩至本方禁区前沿，压缩纵向空间，使对方难以通过传球打透。', category: 'Phase' },
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
  },
  {
    id: 'path-3',
    title: "精通：进攻准则",
    description: "揭秘顶级豪门的破门公式：空间挤压、第三人跑位与伪九号。 ",
    level: 'Advanced',
    icon: '🔥',
    modules: [
      { id: 'm3-1', title: '伪九号：影子的威胁', description: '解析梅西如何通过回撤制造中卫选位难题。', type: 'Theory', relatedKnowledgeId: '伪九号 (False 9)' },
      { id: 'm3-2', title: '肋部插上与空间重叠', description: '学习现代边路进攻中最具杀伤力的跑位方式。', type: 'Theory', relatedKnowledgeId: '肋部插上 (Underlap)' },
      { id: 'm3-3', title: '战术大师终极考评', description: '在模拟复盘中找出对方防线的致命漏洞。', type: 'Simulation', relatedBattleId: 'tiki-taka-2011' },
    ]
  }
];

// 标准能力维度模板
const getScoutingStats = (s: number, f: number, p: number, d: number, def: number, phy: number) => [
    { label: '速度', value: s },
    { label: '射门', value: f },
    { label: '传球', value: p },
    { label: '盘带', value: d },
    { label: '防守', value: def },
    { label: '身体', value: phy },
];

// --- 2011 Barca vs ManU Squads ---
const getBarcaSquad2011 = (overrides: Partial<PlayerPosition>[] = []): PlayerPosition[] => {
  const base: PlayerPosition[] = [
    { id: 'H1', number: 1, position: 'GK', line: 'GK', x: 5, y: 50, name: '巴尔德斯', role: '清道夫门将', team: 'home', physical: { age: 29, height: '183cm', weight: '78kg', foot: 'Right' } },
    { id: 'H2', number: 2, position: 'RB', line: 'DEF', x: 28, y: 88, name: '阿尔维斯', role: '进攻侧翼', team: 'home', physical: { age: 28, height: '172cm', weight: '70kg', foot: 'Right' } },
    { id: 'H3', number: 3, position: 'CB', line: 'DEF', x: 15, y: 62, name: '皮克', role: '出球中卫', team: 'home', physical: { age: 24, height: '194cm', weight: '85kg', foot: 'Right' } },
    { id: 'H14', number: 14, position: 'CB', line: 'DEF', x: 15, y: 38, name: '马斯切拉诺', role: '防守大闸', team: 'home', physical: { age: 27, height: '174cm', weight: '73kg', foot: 'Right' } },
    { id: 'H22', number: 22, position: 'LB', line: 'DEF', x: 28, y: 12, name: '阿比达尔', role: '内收后卫', team: 'home', physical: { age: 31, height: '186cm', weight: '75kg', foot: 'Left' } },
    { id: 'H16', number: 16, position: 'CDM', line: 'MID', x: 32, y: 50, name: '布斯克茨', role: '单后腰', team: 'home', physical: { age: 22, height: '189cm', weight: '76kg', foot: 'Right' }, scoutingStats: getScoutingStats(65, 60, 95, 88, 92, 80) },
    { id: 'H6', number: 6, position: 'CM', line: 'MID', x: 45, y: 65, name: '哈维', role: '指挥官', team: 'home', physical: { age: 31, height: '170cm', weight: '68kg', foot: 'Right' }, scoutingStats: getScoutingStats(72, 75, 99, 94, 70, 75) },
    { id: 'H8', number: 8, position: 'CM', line: 'MID', x: 45, y: 35, name: '伊涅斯塔', role: '核心', team: 'home', physical: { age: 27, height: '171cm', weight: '68kg', foot: 'Right' }, scoutingStats: getScoutingStats(84, 80, 96, 99, 65, 70) },
    { id: 'H17', number: 17, position: 'RW', line: 'FWD', x: 55, y: 82, name: '佩德罗', role: '边锋', team: 'home', physical: { age: 23, height: '169cm', weight: '65kg', foot: 'Both' } },
    { id: 'H10', number: 10, position: 'CF', line: 'FWD', x: 55, y: 50, name: '梅西', role: '伪九号', team: 'home', tacticalBrief: ['撤出禁区吸引维迪奇', '在中圈持球分配两侧'], physical: { age: 23, height: '170cm', weight: '72kg', foot: 'Left' }, scoutingStats: getScoutingStats(94, 98, 96, 99, 45, 78) },
    { id: 'H7', number: 7, position: 'LW', line: 'FWD', x: 55, y: 18, name: '比利亚', role: '射手', team: 'home', tacticalBrief: ['利用梅西扯出的空间进行内切', '寻找远角推射机会'], physical: { age: 29, height: '175cm', weight: '69kg', foot: 'Both' }, scoutingStats: getScoutingStats(88, 95, 82, 89, 40, 75) },
  ];
  return base.map(p => ({ ...p, ...overrides.find(o => o.id === p.id) }));
};

const getUnitedSquad2011 = (overrides: Partial<PlayerPosition>[] = []): PlayerPosition[] => {
  const base: PlayerPosition[] = [
    { id: 'A1', number: 1, position: 'GK', line: 'GK', x: 95, y: 50, name: '范德萨', role: '门将', team: 'away', physical: { age: 40, height: '197cm', weight: '83kg', foot: 'Right' } },
    { id: 'A20', number: 20, position: 'RB', line: 'DEF', x: 72, y: 82, name: '法比奥', role: '后卫', team: 'away', physical: { age: 20, height: '172cm', weight: '69kg', foot: 'Right' } },
    { id: 'A5', number: 5, position: 'CB', line: 'DEF', x: 80, y: 60, name: '费迪南德', role: '中卫', team: 'away', physical: { age: 32, height: '189cm', weight: '82kg', foot: 'Right' } },
    { id: 'A15', number: 15, position: 'CB', line: 'DEF', x: 80, y: 40, name: '维迪奇', role: '中卫', team: 'away', physical: { age: 29, height: '190cm', weight: '84kg', foot: 'Right' } },
    { id: 'A3', number: 3, position: 'LB', line: 'DEF', x: 72, y: 18, name: '埃弗拉', role: '后卫', team: 'away', physical: { age: 30, height: '174cm', weight: '72kg', foot: 'Left' } },
    { id: 'A25', number: 25, position: 'RM', line: 'MID', x: 62, y: 85, name: '瓦伦西亚', role: '边中场', team: 'away', physical: { age: 25, height: '180cm', weight: '78kg', foot: 'Right' } },
    { id: 'A16', number: 16, position: 'CM', line: 'MID', x: 68, y: 58, name: '卡里克', role: '后腰', team: 'away', physical: { age: 29, height: '188cm', weight: '74kg', foot: 'Right' }, scoutingStats: getScoutingStats(68, 70, 92, 78, 88, 82) },
    { id: 'A11', number: 11, position: 'CM', line: 'MID', x: 68, y: 42, name: '吉格斯', role: '中场', team: 'away', physical: { age: 37, height: '179cm', weight: '71kg', foot: 'Left' } },
    { id: 'A13', number: 13, position: 'LM', line: 'MID', x: 62, y: 15, name: '朴智星', role: '边中场', team: 'away', physical: { age: 30, height: '178cm', weight: '73kg', foot: 'Right' } },
    { id: 'A10', number: 10, position: 'SS', line: 'FWD', x: 45, y: 55, name: '鲁尼', role: '影锋', team: 'away', physical: { age: 25, height: '176cm', weight: '82kg', foot: 'Right' }, scoutingStats: getScoutingStats(82, 94, 88, 86, 60, 92) },
    { id: 'A14', number: 14, position: 'ST', line: 'FWD', x: 35, y: 45, name: '埃尔南德斯', role: '前锋', team: 'away', physical: { age: 22, height: '175cm', weight: '71kg', foot: 'Right' } },
  ];
  return base.map(p => ({ ...p, ...overrides.find(o => o.id === p.id) }));
};

// --- 2012 Real Madrid vs Barca Squads ---
const getMadridSquad2012 = (overrides: Partial<PlayerPosition>[] = []): PlayerPosition[] => {
  const base: PlayerPosition[] = [
    { id: 'M1', number: 1, position: 'GK', line: 'GK', x: 5, y: 50, name: '卡西利亚斯', role: '门神', team: 'home', physical: { age: 30, height: '185cm', weight: '80kg', foot: 'Right' } },
    { id: 'M17', number: 17, position: 'RB', line: 'DEF', x: 30, y: 85, name: '阿韦洛亚', role: '防守后卫', team: 'home', physical: { age: 29, height: '184cm', weight: '79kg', foot: 'Right' } },
    { id: 'M3', number: 3, position: 'CB', line: 'DEF', x: 22, y: 62, name: '佩佩', role: '防守核心', team: 'home', physical: { age: 29, height: '188cm', weight: '81kg', foot: 'Right' } },
    { id: 'M4', number: 4, position: 'CB', line: 'DEF', x: 22, y: 38, name: '拉莫斯', role: '空中霸主', team: 'home', physical: { age: 26, height: '184cm', weight: '82kg', foot: 'Right' } },
    { id: 'M5', number: 5, position: 'LB', line: 'DEF', x: 30, y: 15, name: '科恩特朗', role: '边路防线', team: 'home', physical: { age: 24, height: '179cm', weight: '72kg', foot: 'Left' } },
    { id: 'M14', number: 14, position: 'CDM', line: 'MID', x: 40, y: 65, name: '哈维·阿隆索', role: '长传大师', team: 'home', tacticalBrief: ['就地断球后第一时间寻找前场接应点', '控制转换节奏'], physical: { age: 30, height: '183cm', weight: '80kg', foot: 'Right' }, scoutingStats: getScoutingStats(72, 80, 98, 82, 88, 85) },
    { id: 'M6', number: 6, position: 'CDM', line: 'MID', x: 40, y: 35, name: '赫迪拉', role: '覆盖者', team: 'home', physical: { age: 25, height: '189cm', weight: '83kg', foot: 'Right' } },
    { id: 'M22', number: 22, position: 'RM', line: 'MID', x: 55, y: 85, name: '迪马利亚', role: '突击手', team: 'home', physical: { age: 24, height: '180cm', weight: '70kg', foot: 'Left' }, scoutingStats: getScoutingStats(90, 82, 88, 92, 60, 75) },
    { id: 'M10', number: 10, position: 'AM', line: 'MID', x: 50, y: 50, name: '厄齐尔', role: '组织核心', team: 'home', tacticalBrief: ['在对方双后腰间寻找反击空档', '观察C罗跑位送出致命斜传'], physical: { age: 23, height: '180cm', weight: '76kg', foot: 'Left' }, scoutingStats: getScoutingStats(86, 80, 96, 95, 45, 72) },
    { id: 'M7', number: 7, position: 'LM', line: 'FWD', x: 55, y: 15, name: 'C罗', role: '终结者', team: 'home', tacticalBrief: ['埋伏在边卫身后区域', '利用斜切跑位甩开马斯切拉诺', '冷静完成最后一击'], physical: { age: 27, height: '187cm', weight: '83kg', foot: 'Right' }, scoutingStats: getScoutingStats(98, 99, 82, 92, 50, 94) },
    { id: 'M9', number: 9, position: 'ST', line: 'FWD', x: 62, y: 50, name: '本泽马', role: '全能前锋', team: 'home', tacticalBrief: ['回撤带开对方中卫', '为后插上的C罗创造肋部空间'], physical: { age: 24, height: '185cm', weight: '81kg', foot: 'Right' }, scoutingStats: getScoutingStats(84, 92, 88, 90, 45, 82) },
  ];
  return base.map(p => ({ ...p, ...overrides.find(o => o.id === p.id) }));
};

const getBarcaSquad2012 = (overrides: Partial<PlayerPosition>[] = []): PlayerPosition[] => {
  const base: PlayerPosition[] = [
    { id: 'B1', number: 1, position: 'GK', line: 'GK', x: 95, y: 50, name: '巴尔德斯', role: '门将', team: 'away', physical: { age: 30, height: '183cm', weight: '78kg', foot: 'Right' } },
    { id: 'B2', number: 2, position: 'RB', line: 'DEF', x: 65, y: 92, name: '阿尔维斯', role: '进攻侧翼', team: 'away', physical: { age: 28, height: '172cm', weight: '70kg', foot: 'Right' } },
    { id: 'B5', number: 5, position: 'CB', line: 'DEF', x: 80, y: 62, name: '普约尔', role: '防魂', team: 'away', physical: { age: 34, height: '178cm', weight: '80kg', foot: 'Right' } },
    { id: 'B14', number: 14, position: 'CB', line: 'DEF', x: 80, y: 38, name: '马斯切拉诺', role: '防守专家', team: 'away', physical: { age: 27, height: '174cm', weight: '73kg', foot: 'Right' } },
    { id: 'B21', number: 21, position: 'LB', line: 'DEF', x: 75, y: 12, name: '阿德里亚诺', role: '边后卫', team: 'away', physical: { age: 27, height: '172cm', weight: '72kg', foot: 'Both' } },
    { id: 'B16', number: 16, position: 'CDM', line: 'MID', x: 70, y: 50, name: '布斯克茨', role: '支点', team: 'away', physical: { age: 23, height: '189cm', weight: '76kg', foot: 'Right' } },
    { id: 'B6', number: 6, position: 'CM', line: 'MID', x: 65, y: 68, name: '哈维', role: '中场核心', team: 'away', physical: { age: 32, height: '170cm', weight: '68kg', foot: 'Right' }, scoutingStats: getScoutingStats(70, 78, 99, 94, 75, 75) },
    { id: 'B11', number: 11, position: 'CM', line: 'MID', x: 65, y: 32, name: '蒂亚戈', role: '新星', team: 'away', physical: { age: 21, height: '174cm', weight: '70kg', foot: 'Right' } },
    { id: 'B37', number: 37, position: 'RW', line: 'FWD', x: 55, y: 88, name: '特略', role: '边锋', team: 'away', physical: { age: 20, height: '178cm', weight: '72kg', foot: 'Right' } },
    { id: 'B10', number: 10, position: 'CF', line: 'FWD', x: 55, y: 50, name: '梅西', role: '核心', team: 'away', physical: { age: 24, height: '170cm', weight: '72kg', foot: 'Left' }, scoutingStats: getScoutingStats(92, 98, 96, 99, 45, 78) },
    { id: 'B8', number: 8, position: 'LW', line: 'FWD', x: 55, y: 15, name: '伊涅斯塔', role: '边路组织', team: 'away', physical: { age: 27, height: '171cm', weight: '68kg', foot: 'Right' }, scoutingStats: getScoutingStats(82, 82, 97, 99, 60, 70) },
  ];
  return base.map(p => ({ ...p, ...overrides.find(o => o.id === p.id) }));
};

// --- 2019 Liverpool vs Barca (Anfield Miracle) ---
const getLiverpoolSquad2019 = (overrides: Partial<PlayerPosition>[] = []): PlayerPosition[] => {
  const base: PlayerPosition[] = [
    { id: 'L1', number: 13, position: 'GK', line: 'GK', x: 5, y: 50, name: '阿利松', role: '门神', team: 'home', physical: { age: 26, height: '191cm', weight: '91kg', foot: 'Right' } },
    { id: 'L66', number: 66, position: 'RB', line: 'DEF', x: 32, y: 92, name: '阿诺德', role: '组织后卫', team: 'home', physical: { age: 20, height: '175cm', weight: '70kg', foot: 'Right' }, scoutingStats: getScoutingStats(88, 75, 98, 85, 80, 78) },
    { id: 'L32', number: 32, position: 'CB', line: 'DEF', x: 18, y: 65, name: '马蒂普', role: '中卫', team: 'home', physical: { age: 27, height: '195cm', weight: '90kg', foot: 'Right' } },
    { id: 'L4', number: 4, position: 'CB', line: 'DEF', x: 18, y: 35, name: '范戴克', role: '防线核心', team: 'home', physical: { age: 27, height: '193cm', weight: '92kg', foot: 'Right' }, scoutingStats: getScoutingStats(82, 70, 88, 75, 99, 98) },
    { id: 'L26', number: 26, position: 'LB', line: 'DEF', x: 32, y: 8, name: '罗伯逊', role: '铁人', team: 'home', physical: { age: 25, height: '178cm', weight: '64kg', foot: 'Left' } },
    { id: 'L3', number: 3, position: 'CDM', line: 'MID', x: 42, y: 50, name: '法比尼奥', role: '扫荡者', team: 'home', physical: { age: 25, height: '188cm', weight: '78kg', foot: 'Right' } },
    { id: 'L14', number: 14, position: 'CM', line: 'MID', x: 52, y: 70, name: '亨德森', role: '队长', team: 'home', physical: { age: 28, height: '182cm', weight: '80kg', foot: 'Right' } },
    { id: 'L7', number: 7, position: 'CM', line: 'MID', x: 52, y: 30, name: '米尔纳', role: '全能', team: 'home', physical: { age: 33, height: '175cm', weight: '70kg', foot: 'Right' } },
    { id: 'L23', number: 23, position: 'RW', line: 'FWD', x: 65, y: 80, name: '沙奇里', role: '突击手', team: 'home', physical: { age: 27, height: '169cm', weight: '72kg', foot: 'Left' } },
    { id: 'L27', number: 27, position: 'ST', line: 'FWD', x: 65, y: 50, name: '奥里吉', role: '锦鲤', team: 'home', physical: { age: 24, height: '185cm', weight: '75kg', foot: 'Right' } },
    { id: 'L10', number: 10, position: 'LW', line: 'FWD', x: 65, y: 20, name: '马内', role: '爆破手', team: 'home', physical: { age: 27, height: '175cm', weight: '69kg', foot: 'Right' } },
  ];
  return base.map(p => ({ ...p, ...overrides.find(o => o.id === p.id) }));
};

const getBarcaSquad2019 = (overrides: Partial<PlayerPosition>[] = []): PlayerPosition[] => {
  const base: PlayerPosition[] = [
    { id: 'BS1', number: 1, position: 'GK', line: 'GK', x: 95, y: 50, name: '特尔施特根', role: '门将', team: 'away', physical: { age: 27, height: '187cm', weight: '85kg', foot: 'Right' } },
    { id: 'BS20', number: 20, position: 'RB', line: 'DEF', x: 65, y: 85, name: '罗贝托', role: '多面手', team: 'away', physical: { age: 27, height: '178cm', weight: '68kg', foot: 'Right' } },
    { id: 'BS3', number: 3, position: 'CB', line: 'DEF', x: 80, y: 62, name: '皮克', role: '领袖', team: 'away', physical: { age: 32, height: '194cm', weight: '85kg', foot: 'Right' } },
    { id: 'BS15', number: 15, position: 'CB', line: 'DEF', x: 80, y: 38, name: '朗格莱', role: '中卫', team: 'away', physical: { age: 23, height: '186cm', weight: '81kg', foot: 'Left' } },
    { id: 'BS18', number: 18, position: 'LB', line: 'DEF', x: 65, y: 15, name: '阿尔巴', role: '边卫', team: 'away', physical: { age: 30, height: '170cm', weight: '68kg', foot: 'Left' } },
    { id: 'BS5', number: 5, position: 'CDM', line: 'MID', x: 60, y: 50, name: '布斯克茨', role: '核心', team: 'away', physical: { age: 30, height: '189cm', weight: '76kg', foot: 'Right' } },
    { id: 'BS4', number: 4, position: 'CM', line: 'MID', x: 55, y: 72, name: '拉基蒂奇', role: '工兵', team: 'away', physical: { age: 31, height: '184cm', weight: '78kg', foot: 'Right' } },
    { id: 'BS22', number: 22, position: 'CM', line: 'MID', x: 55, y: 28, name: '比达尔', role: '斗士', team: 'away', physical: { age: 31, height: '180cm', weight: '75kg', foot: 'Right' } },
    { id: 'BS10', number: 10, position: 'RW', line: 'FWD', x: 45, y: 65, name: '梅西', role: '核心', team: 'away', physical: { age: 31, height: '170cm', weight: '72kg', foot: 'Left' } },
    { id: 'BS9', number: 9, position: 'ST', line: 'FWD', x: 45, y: 35, name: '苏亚雷斯', role: '射手', team: 'away', physical: { age: 32, height: '182cm', weight: '86kg', foot: 'Right' } },
    { id: 'BS7', number: 7, position: 'LW', line: 'FWD', x: 52, y: 12, name: '库蒂尼奥', role: '边锋', team: 'away', physical: { age: 26, height: '172cm', weight: '68kg', foot: 'Right' } },
  ];
  return base.map(p => ({ ...p, ...overrides.find(o => o.id === p.id) }));
};

// --- 2016 Leicester City vs Man City (Counter Dream) ---
const getLeicesterSquad2016 = (overrides: Partial<PlayerPosition>[] = []): PlayerPosition[] => {
  const base: PlayerPosition[] = [
    { id: 'LC1', number: 1, position: 'GK', line: 'GK', x: 5, y: 50, name: '舒梅切尔', role: '门将', team: 'home', physical: { age: 29, height: '189cm', weight: '76kg', foot: 'Right' } },
    { id: 'LC17', number: 17, position: 'RB', line: 'DEF', x: 18, y: 85, name: '辛普森', role: '铁闸', team: 'home', physical: { age: 29, height: '177cm', weight: '78kg', foot: 'Right' } },
    { id: 'LC5', number: 5, position: 'CB', line: 'DEF', x: 15, y: 62, name: '摩根', role: '队长', team: 'home', physical: { age: 32, height: '185cm', weight: '93kg', foot: 'Right' } },
    { id: 'LC6', number: 6, position: 'CB', line: 'DEF', x: 15, y: 38, name: '胡特', role: '空霸', team: 'home', physical: { age: 31, height: '191cm', weight: '88kg', foot: 'Right' } },
    { id: 'LC28', number: 28, position: 'LB', line: 'DEF', x: 18, y: 15, name: '富克斯', role: '飞翼', team: 'home', physical: { age: 29, height: '186cm', weight: '80kg', foot: 'Left' } },
    { id: 'LC26', number: 26, position: 'RM', line: 'MID', x: 35, y: 88, name: '马赫雷斯', role: '魔术师', team: 'home', physical: { age: 24, height: '179cm', weight: '62kg', foot: 'Left' }, scoutingStats: getScoutingStats(88, 85, 92, 98, 40, 65) },
    { id: 'LC4', number: 4, position: 'CM', line: 'MID', x: 28, y: 62, name: '德林克沃特', role: '核心', team: 'home', physical: { age: 25, height: '177cm', weight: '70kg', foot: 'Right' } },
    { id: 'LC14', number: 14, position: 'CM', line: 'MID', x: 28, y: 38, name: '坎特', role: '覆盖王', team: 'home', physical: { age: 24, height: '168cm', weight: '68kg', foot: 'Right' }, scoutingStats: getScoutingStats(88, 65, 85, 80, 99, 95) },
    { id: 'LC11', number: 11, position: 'LM', line: 'MID', x: 35, y: 12, name: '奥尔布莱顿', role: '传中机', team: 'home', physical: { age: 26, height: '175cm', weight: '67kg', foot: 'Right' } },
    { id: 'LC20', number: 20, position: 'ST', line: 'FWD', x: 45, y: 60, name: '冈崎慎司', role: '工兵', team: 'home', physical: { age: 29, height: '174cm', weight: '70kg', foot: 'Right' } },
    { id: 'LC9', number: 9, position: 'ST', line: 'FWD', x: 45, y: 40, name: '瓦尔迪', role: '飞人', team: 'home', physical: { age: 29, height: '179cm', weight: '74kg', foot: 'Right' }, scoutingStats: getScoutingStats(98, 95, 75, 85, 55, 82) },
  ];
  return base.map(p => ({ ...p, ...overrides.find(o => o.id === p.id) }));
};

const getCitySquad2016 = (overrides: Partial<PlayerPosition>[] = []): PlayerPosition[] => {
  const base: PlayerPosition[] = [
    { id: 'C1', number: 1, position: 'GK', line: 'GK', x: 95, y: 50, name: '哈特', role: '门将', team: 'away', physical: { age: 28, height: '196cm', weight: '91kg', foot: 'Right' } },
    { id: 'C5', number: 5, position: 'RB', line: 'DEF', x: 65, y: 88, name: '萨巴莱塔', role: '后卫', team: 'away', physical: { age: 31, height: '178cm', weight: '76kg', foot: 'Right' } },
    { id: 'C30', number: 30, position: 'CB', line: 'DEF', x: 75, y: 62, name: '奥塔门迪', role: '中卫', team: 'away', physical: { age: 27, height: '183cm', weight: '81kg', foot: 'Right' } },
    { id: 'C26', number: 26, position: 'CB', line: 'DEF', x: 75, y: 38, name: '德米凯利斯', role: '中卫', team: 'away', physical: { age: 35, height: '184cm', weight: '80kg', foot: 'Right' } },
    { id: 'C11', number: 11, position: 'LB', line: 'DEF', x: 65, y: 12, name: '科拉罗夫', role: '左脚将', team: 'away', physical: { age: 30, height: '187cm', weight: '83kg', foot: 'Left' } },
    { id: 'C25', number: 25, position: 'CDM', line: 'MID', x: 55, y: 55, name: '费尔南迪尼奥', role: '枢纽', team: 'away', physical: { age: 30, height: '179cm', weight: '67kg', foot: 'Right' } },
    { id: 'C42', number: 42, position: 'CM', line: 'MID', x: 52, y: 38, name: '图雷', role: '重型', team: 'away', physical: { age: 32, height: '189cm', weight: '90kg', foot: 'Right' } },
    { id: 'C21', number: 21, position: 'RM', line: 'MID', x: 42, y: 82, name: '席尔瓦', role: '核心', team: 'away', physical: { age: 30, height: '170cm', weight: '67kg', foot: 'Left' } },
    { id: 'C7', number: 7, position: 'AM', line: 'MID', x: 45, y: 50, name: '斯特林', role: '飞翼', team: 'away', physical: { age: 21, height: '170cm', weight: '69kg', foot: 'Right' } },
    { id: 'C18', number: 18, position: 'LM', line: 'MID', x: 42, y: 18, name: '德尔夫', role: '工兵', team: 'away', physical: { age: 26, height: '174cm', weight: '60kg', foot: 'Left' } },
    { id: 'BS10', number: 10, position: 'ST', line: 'FWD', x: 35, y: 52, name: '阿奎罗', role: '神锋', team: 'away', physical: { age: 27, height: '173cm', weight: '70kg', foot: 'Right' } },
  ];
  return base.map(p => ({ ...p, ...overrides.find(o => o.id === p.id) }));
};


export const BATTLES: Battle[] = [
  {
    id: 'anfield-miracle-2019',
    title: '安菲尔德奇迹：高压崩溃论',
    subtitle: '利物浦 4-0 巴塞罗那',
    score: { home: 4, away: 0 },
    description: '2019年5月7日。在缺少萨拉赫和菲尔米诺的情况下，克洛普的利物浦用窒息般的“Gegenpressing”在主场完成了不可思议的4球逆转。我们将复刻这一战中那种让巴萨无法呼吸的强度转换。',
    teams: {
      home: { 
        name: '利物浦', color: '#c8102e', coach: '克洛普', formation: '4-3-3',
        philosophy: '用奔跑和意志淹没对手。',
        keyInstructions: ['疯狂的高位压迫', '利用两个边路拉开宽度', '抓住每一个定位球瞬间']
      },
      away: { 
        name: '巴塞罗那', color: '#a50044', coach: '巴尔韦德', formation: '4-3-3',
        philosophy: '在压力下寻求控制。',
        keyInstructions: ['通过控球消耗时间', '寻找梅西的反击点']
      }
    },
    radarData: [
      { subject: '压迫强度', A: 100, B: 45, fullMark: 100 },
      { subject: '意志力量', A: 100, B: 30, fullMark: 100 },
      { subject: '传球精度', A: 72, B: 92, fullMark: 100 },
      { subject: '反击速度', A: 95, B: 60, fullMark: 100 },
      { subject: '定位球', A: 98, B: 40, fullMark: 100 },
      { subject: '控球时间', A: 48, B: 95, fullMark: 100 },
    ],
    phases: [
      {
        id: 'lv1',
        title: '窒息围猎：开场红军式风暴',
        description: '利物浦在开场后并没有选择试探。全队像狼群一样涌向巴萨的后场。布斯克茨在狭窄空间内多次遭遇三人围抢，巴萨的传控体系在第一个10分钟就开始动摇。',
        homePlayers: getLiverpoolSquad2019([
          { id: 'L14', x: 55, y: 55 }, 
          { id: 'L10', x: 62, y: 42 }, 
          { id: 'L27', x: 68, y: 50 },  
        ]),
        awayPlayers: getBarcaSquad2019([
          { id: 'BS5', x: 75, y: 50 },
          { id: 'BS18', x: 70, y: 15 },
        ]),
        connections: [{ from: 'L14', to: 'L27', weight: 60, successRate: 0.9 }]
      },
      {
        id: 'lv2',
        title: '垂直打击：杜牧的奇迹两分钟',
        description: '维纳尔杜姆替补登场后，利物浦的二次进攻更加立体。在一次边路传中里，利物浦多名中场球员高速插向巴萨禁区，瞬间的兵力优势让巴萨防线彻底崩溃。',
        homePlayers: getLiverpoolSquad2019([
          { id: 'L66', x: 65, y: 88 }, 
          { id: 'L14', x: 82, y: 55 },  
          { id: 'L10', x: 85, y: 35 },  
        ]),
        awayPlayers: getBarcaSquad2019([
          { id: 'BS3', x: 88, y: 60 },
          { id: 'BS15', x: 85, y: 40 },
        ]),
        connections: [{ from: 'L66', to: 'L14', weight: 80, successRate: 0.95 }]
      },
      {
        id: 'lv3',
        title: 'Corner Taken Quickly！',
        description: '这可能是欧冠历史上最著名的战术瞬间。当巴萨防线还在漫不经心地组织时，阿诺德敏锐察觉到了禁区的空档，一记低平球瞬间穿透了所有人的视线。',
        homePlayers: getLiverpoolSquad2019([
          { id: 'L66', x: 98, y: 98 }, 
          { id: 'L27', x: 92, y: 52 }, 
        ]),
        awayPlayers: getBarcaSquad2019([
          { id: 'BS1', x: 96, y: 48 }, 
          { id: 'BS3', x: 88, y: 55 },
        ]),
        connections: [{ from: 'L66', to: 'L27', weight: 100, successRate: 1.0 }]
      },
      {
        id: 'lv4',
        title: '低位铁幕：最后的4-4-2封锁',
        description: '领先之后，利物浦迅速回缩。克洛普指令球队变阵平行的4-4-2，压缩巴萨在肋部的传球空间。即便是梅西，在面对这种众志成城的围堵时也显得孤立无援。',
        homePlayers: getLiverpoolSquad2019([ 
          { id: 'L4', x: 15, y: 40 },   
          { id: 'L32', x: 15, y: 60 },   
          { id: 'L3', x: 25, y: 50 },  
          { id: 'L14', x: 28, y: 75 },  
        ]),
        awayPlayers: getBarcaSquad2019([
          { id: 'BS10', x: 45, y: 55 },   
          { id: 'BS9', x: 40, y: 35 },  
        ]),
        connections: [{ from: 'BS10', to: 'BS9', weight: 30, successRate: 0.4 }] 
      }
    ],
    stats: {
      possession: { home: 43, away: 57 },
      shots: { home: 13, away: 8, onTargetHome: 7, onTargetAway: 5 },
      passes: { home: 412, away: 521, accuracyHome: 78, accuracyAway: 84 }
    }
  },
  {
    id: 'leicester-miracle-2016',
    title: '蓝狐：草根反击的工业化',
    subtitle: '曼城 1-3 莱斯特城',
    score: { home: 3, away: 1 },
    description: '2016年2月6日。在伊蒂哈德球场，拉涅利的球队用一种几乎“非现代”的方式摧毁了曼城。没有繁琐的传控，只有极速的垂直打击。这是“低位防守+长传冲吊”在现代足球中的最高光时刻。',
    teams: {
      home: { 
        name: '莱斯特城', color: '#003090', coach: '拉涅利', formation: '4-4-2',
        philosophy: '极致极简，空间博弈。',
        keyInstructions: ['坎特全场覆盖扫荡', '马赫雷斯侧翼爆破', '瓦尔迪利用纵深']
      },
      away: { 
        name: '曼城', color: '#6caee0', coach: '佩莱格里尼', formation: '4-2-3-1',
        philosophy: '高位围攻，控球渗透。',
        keyInstructions: ['利用图雷的推进力', '阵型大举压上']
      }
    },
    radarData: [
      { subject: '垂直打击', A: 100, B: 40, fullMark: 100 },
      { subject: '拦截能力', A: 98, B: 65, fullMark: 100 },
      { subject: '阵型纪律', A: 95, B: 70, fullMark: 100 },
      { subject: '反击效率', A: 100, B: 55, fullMark: 100 },
      { subject: '控球', A: 32, B: 95, fullMark: 100 },
      { subject: '对抗', A: 92, B: 65, fullMark: 100 },
    ],
    phases: [
      {
        id: 'lc1',
        title: '铁闸断球：坎特的黑洞引力',
        description: '曼城在中场大举压上。坎特在一次对抗中准确判断了亚亚·图雷的传球路径，完成抢断后没有丝毫拖泥带水，直接一记过顶长传寻找正在启动的瓦尔迪。',
        homePlayers: getLeicesterSquad2016([
          { id: 'LC14', x: 35, y: 45 }, 
          { id: 'LC9', x: 55, y: 52 }, 
        ]),
        awayPlayers: getCitySquad2016([
          { id: 'C42', x: 42, y: 48 },
          { id: 'C25', x: 50, y: 65 },
        ]),
        connections: [{ from: 'LC14', to: 'LC9', weight: 85, successRate: 0.98 }]
      },
      {
        id: 'lc2',
        title: '魔术师舞步：马赫雷斯的肋部独奏',
        description: '在一次转换中，马赫雷斯得球。他并没有选择套边传中，而是通过内切晃过了德米凯利斯，在极短时间内完成了从观察到射门的决策转换。',
        homePlayers: getLeicesterSquad2016([
          { id: 'LC26', x: 65, y: 82 }, 
          { id: 'LC9', x: 75, y: 45 },  
        ]),
        awayPlayers: getCitySquad2016([
          { id: 'C26', x: 80, y: 65 },
          { id: 'C30', x: 85, y: 45 },
        ]),
        connections: [{ from: 'LC26', to: 'LC26', weight: 100, successRate: 0.1 }] // 模拟盘带进球
      },
      {
        id: 'lc3',
        title: '瓦尔迪的万有引力',
        description: '瓦尔迪不间断的跑位迫使曼城双中卫不得不大幅回撤。这种“空间引力”让莱斯特城的中场球员获得了巨大的第二点持球空间，这是蓝狐进攻最隐秘的核心。',
        homePlayers: getLeicesterSquad2016([
          { id: 'LC9', x: 82, y: 35 }, 
          { id: 'LC4', x: 62, y: 55 }, 
        ]),
        awayPlayers: getCitySquad2016([
          { id: 'C30', x: 88, y: 38 },
          { id: 'C26', x: 85, y: 48 },
        ]),
        connections: [{ from: 'LC4', to: 'LC9', weight: 70, successRate: 0.8 }]
      },
      {
        id: 'lc4',
        title: '双塔铁幕：最后的低位封锁',
        description: '在领先两球的情况下，摩根和胡特在本方禁区建立了禁飞区。两名重型中卫不仅封锁了传中，更通过极佳的位置感让阿奎罗陷入了肉搏的泥潭。',
        homePlayers: getLeicesterSquad2016([ 
          { id: 'LC5', x: 12, y: 62 },   
          { id: 'LC6', x: 12, y: 38 },   
          { id: 'LC14', x: 22, y: 50 },  
        ]),
        awayPlayers: getCitySquad2016([
          { id: 'BS10', x: 22, y: 52 },   
          { id: 'C7', x: 28, y: 25 },  
        ]),
        connections: [{ from: 'C7', to: 'BS10', weight: 20, successRate: 0.2 }] 
      }
    ],
    stats: {
      possession: { home: 34, away: 66 },
      shots: { home: 11, away: 15, onTargetHome: 7, onTargetAway: 4 },
      passes: { home: 285, accuracyHome: 72, away: 582, accuracyAway: 89 }
    }
  },
  {
    id: 'mourinho-cr7-2012',
    title: '穆氏皇马：世纪反击艺术',
    subtitle: '巴塞罗那 1-2 皇家马德里',
    score: { home: 2, away: 1 },
    description: '2012年4月21日，诺坎普。穆里尼奥的皇马展现了防守反击的最高境界。这一战不仅终结了巴萨对西甲的统治，更诞生了C罗经典的“Calma”庆祝。我们将复刻绝杀球的极简打击过程。',
    teams: {
      home: { 
        name: '皇家马德里', color: '#ffffff', coach: '穆里尼奥', formation: '4-2-3-1',
        philosophy: '极简打击，垂直调度，用效率摧毁传控。',
        keyInstructions: ['C罗埋伏在左肋部', '厄齐尔寻找反击第一落点', '中后场精准长传']
      },
      away: { 
        name: '巴塞罗那', color: '#a50044', coach: '瓜迪奥拉', formation: '4-3-3',
        philosophy: '高位控球，极致压迫。',
        keyInstructions: ['防线前推至中线', '丢球后就地反抢']
      }
    },
    radarData: [
      { subject: '反击效率', A: 100, B: 60, fullMark: 100 },
      { subject: '垂直打击', A: 98, B: 50, fullMark: 100 },
      { subject: '防守纪律', A: 95, B: 70, fullMark: 100 },
      { subject: '控球时间', A: 42, B: 95, fullMark: 100 },
      { subject: '跑动距离', A: 90, B: 85, fullMark: 100 },
      { subject: '关键传球', A: 85, B: 95, fullMark: 100 },
    ],
    phases: [
      {
        id: 'r1',
        title: '拦截与视界：攻防转换瞬间',
        description: '在巴萨围攻无果后，哈维·阿隆索在后场断球，皮球迅速过渡到回撤的厄齐尔脚下。此时皇马全队从防守形态瞬间切换为攻击形态。',
        homePlayers: getMadridSquad2012([
          { id: 'M14', x: 35, y: 65 }, 
          { id: 'M10', x: 42, y: 52 }, 
          { id: 'M7', x: 48, y: 15 },  
        ]),
        awayPlayers: getBarcaSquad2012([
          { id: 'B16', x: 55, y: 50 },
          { id: 'B6', x: 50, y: 68 },
        ]),
        connections: [{ from: 'M14', to: 'M10', weight: 60, successRate: 0.98 }]
      },
      {
        id: 'r2',
        title: '精确制导：厄齐尔的致命观察',
        description: '厄齐尔带球推进，他精准观察到了巴萨高位防线背后的真空地带。这是典型的穆氏进攻：通过一名组织者的视野带动整个反击纵深。',
        homePlayers: getMadridSquad2012([
          { id: 'M10', x: 55, y: 50 }, 
          { id: 'M7', x: 65, y: 18 },  
          { id: 'M9', x: 72, y: 55 },  
        ]),
        awayPlayers: getBarcaSquad2012([
          { id: 'B5', x: 75, y: 60 },
          { id: 'B14', x: 70, y: 40 },
          { id: 'B2', x: 60, y: 88 },
        ]),
        connections: [{ from: 'M10', to: 'M7', weight: 85, successRate: 0.92 }]
      },
      {
        id: 'r3',
        title: '暴力超车：克里斯蒂亚诺的弧线',
        description: '厄齐尔送出手术刀般的斜传，C罗凭借惊人的爆发力反越位成功。马斯切拉诺奋力追赶，但已无法阻挡这个瞬间。',
        homePlayers: getMadridSquad2012([
          { id: 'M10', x: 62, y: 50 },
          { id: 'M7', x: 85, y: 32 }, 
          { id: 'M9', x: 80, y: 58 },
        ]),
        awayPlayers: getBarcaSquad2012([
          { id: 'B14', x: 82, y: 38 }, 
          { id: 'B1', x: 92, y: 48 },  
        ]),
        connections: [{ from: 'M10', to: 'M7', weight: 95, successRate: 0.94 }]
      },
      {
        id: 'r4',
        title: '冷酷处决：Calma！冷静瞬间',
        description: 'C罗过掉出击的巴尔德斯，在极窄角度推射破门。这一球宣告了联赛冠军的归属，C罗双手下压，让喧闹的诺坎普瞬间安静。',
        homePlayers: getMadridSquad2012([ 
          { id: 'M7', x: 94, y: 42 },   
          { id: 'M9', x: 92, y: 58 },   
          { id: 'M10', x: 75, y: 50 },  
          { id: 'M22', x: 82, y: 88 },  
          { id: 'M14', x: 55, y: 62 },  
          { id: 'M6', x: 55, y: 38 },   
          { id: 'M17', x: 45, y: 85 },  
          { id: 'M5', x: 45, y: 15 },   
          { id: 'M3', x: 38, y: 60 },   
          { id: 'M4', x: 38, y: 40 },   
          { id: 'M1', x: 10, y: 50 },   
        ]),
        awayPlayers: getBarcaSquad2012([
          { id: 'B1', x: 96, y: 46 },   
          { id: 'B14', x: 92, y: 38 },  
          { id: 'B5', x: 88, y: 52 },   
          { id: 'B21', x: 85, y: 22 },  
          { id: 'B16', x: 75, y: 45 },  
          { id: 'B6', x: 70, y: 60 },   
          { id: 'B11', x: 68, y: 35 },  
          { id: 'B2', x: 55, y: 92 },   
          { id: 'B10', x: 52, y: 52 },  
          { id: 'B8', x: 50, y: 18 },   
          { id: 'B37', x: 60, y: 85 },  
        ]),
        connections: [{ from: 'M7', to: 'B1', weight: 100, successRate: 0.1 }] 
      }
    ],
    stats: {
      possession: { home: 28, away: 72 },
      shots: { home: 14, away: 18, onTargetHome: 6, onTargetAway: 3 },
      passes: { home: 321, away: 785, accuracyHome: 78, accuracyAway: 92 }
    }
  },
  {
    id: 'tiki-taka-2011',
    title: '温布利之巅：艺术足球复刻',
    subtitle: '巴塞罗那 3-1 曼彻斯特联',
    score: { home: 3, away: 1 },
    description: '温布利大球场，瓜迪奥拉的巴塞罗那向世人展示了何为极致。本篇章完整复刻了巴萨从门将发起、穿透曼联两层防线并最终完成圆月弯刀终结的经典进攻片段。',
    teams: {
      home: { 
        name: '巴塞罗那', color: '#a50044', coach: '瓜迪奥拉', formation: '4-3-3',
        philosophy: '通过不断的三角形传递消解对方压迫。',
        keyInstructions: ['梅西大幅回撤', '哈维垂直传递', '双翼斜插']
      },
      away: { 
        name: '曼联', color: '#da291c', coach: '弗格森', formation: '4-4-1-1',
        philosophy: '利用边路速度反击，限制中场空间。',
        keyInstructions: ['卡里克盯防哈维', '朴智星贴身布斯克茨']
      }
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
        id: 'p1',
        title: '底线发起：深层战术重构',
        description: '皮球由皮克在底线附近发起。布斯克茨沉入两名中卫之间，巴萨阵型瞬间由433转变为343，通过宽度拉伸曼联的前场第一道压迫线。',
        homePlayers: getBarcaSquad2011([
          { id: 'H3', x: 12, y: 65 }, 
          { id: 'H16', x: 22, y: 50 }, 
          { id: 'H2', x: 38, y: 92 },
          { id: 'H22', x: 38, y: 8 },
        ]),
        awayPlayers: getUnitedSquad2011([
          { id: 'A14', x: 32, y: 48 },
          { id: 'A10', x: 38, y: 65 },
        ]),
        connections: [{ from: 'H3', to: 'H16', weight: 60, successRate: 0.99 }]
      },
      {
        id: 'p2',
        title: '枢纽转换：节拍器的单触导引',
        description: '布斯克茨得球后不作调整，直接单触分向中圈的哈维。哈维通过“Xavi Turn”原地转身，成功摆脱了鲁尼和卡里克的双重包围。',
        homePlayers: getBarcaSquad2011([
          { id: 'H16', x: 28, y: 50 },
          { id: 'H6', x: 48, y: 68 }, 
          { id: 'H10', x: 55, y: 45 },
          { id: 'H2', x: 55, y: 95 },
        ]),
        awayPlayers: getUnitedSquad2011([
          { id: 'A10', x: 45, y: 62 },
          { id: 'A16', x: 58, y: 65 },
          { id: 'A11', x: 62, y: 35 },
        ]),
        connections: [{ from: 'H16', to: 'H6', weight: 80, successRate: 0.95 }]
      },
      {
        id: 'p3',
        title: '肋部撕裂：伪九号的万有引力',
        description: '哈维发现梅西已撤出曼联禁区，形成局部的4对3优势。梅西接球瞬间引诱维迪奇前移，为后插上的比利亚在左肋部制造出巨大真空地带。',
        homePlayers: getBarcaSquad2011([
          { id: 'H6', x: 52, y: 65 },
          { id: 'H10', x: 65, y: 50 }, 
          { id: 'H7', x: 80, y: 22 }, 
          { id: 'H17', x: 82, y: 85 },
        ]),
        awayPlayers: getUnitedSquad2011([
          { id: 'A15', x: 72, y: 45 }, 
          { id: 'A5', x: 85, y: 55 },
          { id: 'A3', x: 85, y: 20 },
        ]),
        connections: [{ from: 'H6', to: 'H10', weight: 90, successRate: 0.92 }]
      },
      {
        id: 'p4',
        title: '致命一击：比利亚的圆月弯刀',
        description: '梅西精妙的外脚背斜传，皮球精准划过范德萨的指尖。比利亚在禁区左侧连停带过，一记标志性的弧线球直挂球门右上角，完成致命绝杀。',
        homePlayers: getBarcaSquad2011([
          { id: 'H10', x: 75, y: 55 },
          { id: 'H7', x: 92, y: 35 }, 
          { id: 'H17', x: 88, y: 72 },
          { id: 'H2', x: 82, y: 88 },
        ]),
        awayPlayers: getUnitedSquad2011([
          { id: 'A1', x: 96, y: 48 }, 
          { id: 'A5', x: 88, y: 50 },
          { id: 'A15', x: 82, y: 48 },
          { id: 'A3', x: 92, y: 34 },
        ]),
        connections: [{ from: 'H10', to: 'H7', weight: 100, successRate: 0.85 }]
      }
    ],
    stats: {
      possession: { home: 68, away: 32 },
      shots: { home: 19, away: 4, onTargetHome: 12, onTargetAway: 1 },
      passes: { home: 772, away: 301, accuracyHome: 91, accuracyAway: 72 }
    }
  }
];
