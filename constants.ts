
import type { Battle, GlossaryTerm, PlayerPosition } from './types';

export const GLOSSARY: GlossaryTerm[] = [
  { 
    term: 'Tiki-taka', 
    definition: '一种通过极短的传球和频繁的跑位来掌控球权的战术体系，强调空间的动态利用。', 
    category: 'System',
    historicalContext: '由克鲁伊夫奠基，在瓜迪奥拉时代的巴萨达到巅峰。',
    keyTraits: ['极致控球', '三角形接应', '高位压迫', '位置感'],
    famousTeams: ['巴塞罗那 (2008-2012)', '西班牙国家队 (2008-2012)'],
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
    term: '防守反击 (Counter-Attack)', 
    definition: '在对方进攻组织中段断球，利用对方防线前移后的身后空档进行高速垂直打击。', 
    category: 'System',
    historicalContext: '穆里尼奥时代的皇家马德里将这一战术发挥到了极致，强调极简的传球逻辑。',
    keyTraits: ['垂直传递', '空间利用', '边路爆破', '极致效率'],
    famousTeams: ['皇家马德里 (2011-2012)', '国际米兰 (2010)'],
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
  { term: '伪九号 (False 9)', definition: '前锋回撤至中场接球，吸引对方中卫前移，从而为队友在身后创造插上空间。', category: 'Position' },
  { term: '肋部插上 (Underlap)', definition: '指边路球员不沿边线套外，而是从防守方边后卫与中卫之间的缝隙（肋部）进行内切跑位。', category: 'Action' },
  { term: '低位防守 (Low Block)', definition: '防守方将防线整体退缩至本方禁区前沿，压缩纵向空间，使对方难以通过传球打透。', category: 'Phase' },
];

// --- 2011 Barca vs ManU Squads ---
const getBarcaSquad2011 = (overrides: Partial<PlayerPosition>[] = []): PlayerPosition[] => {
  const base: PlayerPosition[] = [
    { id: 'H1', number: 1, position: 'GK', line: 'GK', x: 5, y: 50, name: '巴尔德斯', role: '清道夫门将', team: 'home' },
    { id: 'H2', number: 2, position: 'RB', line: 'DEF', x: 28, y: 88, name: '阿尔维斯', role: '进攻侧翼', team: 'home' },
    { id: 'H3', number: 3, position: 'CB', line: 'DEF', x: 15, y: 62, name: '皮克', role: '出球中卫', team: 'home' },
    { id: 'H14', number: 14, position: 'CB', line: 'DEF', x: 15, y: 38, name: '马斯切拉诺', role: '防守大闸', team: 'home' },
    { id: 'H22', number: 22, position: 'LB', line: 'DEF', x: 28, y: 12, name: '阿比达尔', role: '内收后卫', team: 'home' },
    { id: 'H16', number: 16, position: 'CDM', line: 'MID', x: 32, y: 50, name: '布斯克茨', role: '单后腰', team: 'home' },
    { id: 'H6', number: 6, position: 'CM', line: 'MID', x: 45, y: 65, name: '哈维', role: '指挥官', team: 'home' },
    { id: 'H8', number: 8, position: 'CM', line: 'MID', x: 45, y: 35, name: '伊涅斯塔', role: '核心', team: 'home' },
    { id: 'H17', number: 17, position: 'RW', line: 'FWD', x: 55, y: 82, name: '佩德罗', role: '边锋', team: 'home' },
    { id: 'H10', number: 10, position: 'CF', line: 'FWD', x: 55, y: 50, name: '梅西', role: '伪九号', team: 'home' },
    { id: 'H7', number: 7, position: 'LW', line: 'FWD', x: 55, y: 18, name: '比利亚', role: '射手', team: 'home' },
  ];
  return base.map(p => ({ ...p, ...overrides.find(o => o.id === p.id) }));
};

const getUnitedSquad2011 = (overrides: Partial<PlayerPosition>[] = []): PlayerPosition[] => {
  const base: PlayerPosition[] = [
    { id: 'A1', number: 1, position: 'GK', line: 'GK', x: 95, y: 50, name: '范德萨', role: '门将', team: 'away' },
    { id: 'A20', number: 20, position: 'RB', line: 'DEF', x: 72, y: 82, name: '法比奥', role: '后卫', team: 'away' },
    { id: 'A5', number: 5, position: 'CB', line: 'DEF', x: 80, y: 60, name: '费迪南德', role: '中卫', team: 'away' },
    { id: 'A15', number: 15, position: 'CB', line: 'DEF', x: 80, y: 40, name: '维迪奇', role: '中卫', team: 'away' },
    { id: 'A3', number: 3, position: 'LB', line: 'DEF', x: 72, y: 18, name: '埃弗拉', role: '后卫', team: 'away' },
    { id: 'A25', number: 25, position: 'RM', line: 'MID', x: 62, y: 85, name: '瓦伦西亚', role: '边中场', team: 'away' },
    { id: 'A16', number: 16, position: 'CM', line: 'MID', x: 68, y: 58, name: '卡里克', role: '后腰', team: 'away' },
    { id: 'A11', number: 11, position: 'CM', line: 'MID', x: 68, y: 42, name: '吉格斯', role: '中场', team: 'away' },
    { id: 'A13', number: 13, position: 'LM', line: 'MID', x: 62, y: 15, name: '朴智星', role: '边中场', team: 'away' },
    { id: 'A10', number: 10, position: 'SS', line: 'FWD', x: 45, y: 55, name: '鲁尼', role: '影锋', team: 'away' },
    { id: 'A14', number: 14, position: 'ST', line: 'FWD', x: 35, y: 45, name: '埃尔南德斯', role: '前锋', team: 'away' },
  ];
  return base.map(p => ({ ...p, ...overrides.find(o => o.id === p.id) }));
};

// --- 2012 Real Madrid vs Barca Squads ---
const getMadridSquad2012 = (overrides: Partial<PlayerPosition>[] = []): PlayerPosition[] => {
  const base: PlayerPosition[] = [
    { id: 'M1', number: 1, position: 'GK', line: 'GK', x: 5, y: 50, name: '卡西利亚斯', role: '门神', team: 'home' },
    { id: 'M17', number: 17, position: 'RB', line: 'DEF', x: 30, y: 85, name: '阿韦洛亚', role: '防守后卫', team: 'home' },
    { id: 'M3', number: 3, position: 'CB', line: 'DEF', x: 22, y: 62, name: '佩佩', role: '防守核心', team: 'home' },
    { id: 'M4', number: 4, position: 'CB', line: 'DEF', x: 22, y: 38, name: '拉莫斯', role: '空中霸主', team: 'home' },
    { id: 'M5', number: 5, position: 'LB', line: 'DEF', x: 30, y: 15, name: '科恩特朗', role: '边路防线', team: 'home' },
    { id: 'M14', number: 14, position: 'CDM', line: 'MID', x: 40, y: 65, name: '哈维·阿隆索', role: '长传大师', team: 'home' },
    { id: 'M6', number: 6, position: 'CDM', line: 'MID', x: 40, y: 35, name: '赫迪拉', role: '覆盖者', team: 'home' },
    { id: 'M22', number: 22, position: 'RM', line: 'MID', x: 55, y: 85, name: '迪马利亚', role: '突击手', team: 'home' },
    { id: 'M10', number: 10, position: 'AM', line: 'MID', x: 50, y: 50, name: '厄齐尔', role: '组织核心', team: 'home' },
    { id: 'M7', number: 7, position: 'LM', line: 'FWD', x: 55, y: 15, name: 'C罗', role: '终结者', team: 'home' },
    { id: 'M9', number: 9, position: 'ST', line: 'FWD', x: 62, y: 50, name: '本泽马', role: '全能前锋', team: 'home' },
  ];
  return base.map(p => ({ ...p, ...overrides.find(o => o.id === p.id) }));
};

const getBarcaSquad2012 = (overrides: Partial<PlayerPosition>[] = []): PlayerPosition[] => {
  const base: PlayerPosition[] = [
    { id: 'B1', number: 1, position: 'GK', line: 'GK', x: 95, y: 50, name: '巴尔德斯', role: '门将', team: 'away' },
    { id: 'B2', number: 2, position: 'RB', line: 'DEF', x: 65, y: 92, name: '阿尔维斯', role: '进攻侧翼', team: 'away' },
    { id: 'B5', number: 5, position: 'CB', line: 'DEF', x: 80, y: 62, name: '普约尔', role: '防魂', team: 'away' },
    { id: 'B14', number: 14, position: 'CB', line: 'DEF', x: 80, y: 38, name: '马斯切拉诺', role: '防守专家', team: 'away' },
    { id: 'B21', number: 21, position: 'LB', line: 'DEF', x: 75, y: 12, name: '阿德里亚诺', role: '边后卫', team: 'away' },
    { id: 'B16', number: 16, position: 'CDM', line: 'MID', x: 70, y: 50, name: '布斯克茨', role: '支点', team: 'away' },
    { id: 'B6', number: 6, position: 'CM', line: 'MID', x: 65, y: 68, name: '哈维', role: '中场核心', team: 'away' },
    { id: 'B11', number: 11, position: 'CM', line: 'MID', x: 65, y: 32, name: '蒂亚戈', role: '新星', team: 'away' },
    { id: 'B37', number: 37, position: 'RW', line: 'FWD', x: 55, y: 88, name: '特略', role: '边锋', team: 'away' },
    { id: 'B10', number: 10, position: 'CF', line: 'FWD', x: 55, y: 50, name: '梅西', role: '核心', team: 'away' },
    { id: 'B8', number: 8, position: 'LW', line: 'FWD', x: 55, y: 15, name: '伊涅斯塔', role: '边路组织', team: 'away' },
  ];
  return base.map(p => ({ ...p, ...overrides.find(o => o.id === p.id) }));
};

export const BATTLES: Battle[] = [
  {
    id: 'mourinho-cr7-2012',
    title: '穆氏皇马：世纪反击艺术',
    subtitle: '巴塞罗那 1-2 皇家马德里',
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
          { id: 'M7', x: 94, y: 42 },   // C罗进球位置
          { id: 'M9', x: 92, y: 58 },   // 本泽马后点包抄
          { id: 'M10', x: 75, y: 50 },  // 厄齐尔观察
          { id: 'M22', x: 82, y: 88 },  // 迪马利亚冲刺
          { id: 'M14', x: 55, y: 62 },  // 阿隆索跟进
          { id: 'M6', x: 55, y: 38 },   // 赫迪拉跟进
          { id: 'M17', x: 45, y: 85 },  // 阿韦洛亚
          { id: 'M5', x: 45, y: 15 },   // 科恩特朗
          { id: 'M3', x: 38, y: 60 },   // 佩佩
          { id: 'M4', x: 38, y: 40 },   // 拉莫斯
          { id: 'M1', x: 10, y: 50 },   // 卡西
        ]),
        awayPlayers: getBarcaSquad2012([
          { id: 'B1', x: 96, y: 46 },   // 巴尔德斯扑救无果
          { id: 'B14', x: 92, y: 38 },  // 马斯切拉诺最后封堵
          { id: 'B5', x: 88, y: 52 },   // 普约尔失守
          { id: 'B21', x: 85, y: 22 },  // 阿德里亚诺
          { id: 'B16', x: 75, y: 45 },  // 布斯克茨回追
          { id: 'B6', x: 70, y: 60 },   // 哈维
          { id: 'B11', x: 68, y: 35 },  // 蒂亚戈
          { id: 'B2', x: 55, y: 92 },   // 阿尔维斯失位
          { id: 'B10', x: 52, y: 52 },  // 梅西目睹
          { id: 'B8', x: 50, y: 18 },   // 伊涅斯塔
          { id: 'B37', x: 60, y: 85 },  // 特略
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
