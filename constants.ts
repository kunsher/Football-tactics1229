
import type { Battle, GlossaryTerm } from './types';

export const GLOSSARY: GlossaryTerm[] = [
  { 
    term: 'Tiki-taka', 
    definition: '一种通过极短的传球和频繁的跑位来掌控球权的战术体系，强调空间的动态利用。', 
    category: 'System',
    historicalContext: '由克鲁英夫奠基，在瓜迪奥拉时代的巴萨达到巅峰。',
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
    term: '全攻全守 (Total Football)', 
    definition: '任何球员都可以根据比赛需要出现在场上任何位置的流动战术体系。', 
    category: 'System',
    historicalContext: '20世纪70年代由里努斯·米歇尔斯在阿贾克斯和荷兰队推广。',
    keyTraits: ['位置轮换', '造越位陷阱', '全员进攻', '全员防守'],
    famousTeams: ['荷兰国家队 (1974)', '阿贾克斯 (1970s)'],
    radarProfile: [
      { subject: '控球', A: 85, B: 0, fullMark: 100 },
      { subject: '压迫', A: 95, B: 0, fullMark: 100 },
      { subject: '速度', A: 70, B: 0, fullMark: 100 },
      { subject: '创造力', A: 100, B: 0, fullMark: 100 },
      { subject: '防守', A: 65, B: 0, fullMark: 100 },
      { subject: '纪律', A: 80, B: 0, fullMark: 100 },
    ]
  },
  { 
    term: '高位逼抢 (Gegenpressing)', 
    definition: '在丢球后的瞬间立即组织多人就地反抢，利用对方转换时的混乱重新夺回球权。', 
    category: 'System',
    historicalContext: '德国足球的现代精髓，由拉尔夫·朗尼克奠基，克洛普发扬光大。',
    keyTraits: ['疯狂跑动', '围抢陷阱', '垂直进攻', '高防线'],
    famousTeams: ['多特蒙德 (2010-2013)', '利物浦 (2018-2022)'],
    radarProfile: [
      { subject: '控球', A: 60, B: 0, fullMark: 100 },
      { subject: '压迫', A: 100, B: 0, fullMark: 100 },
      { subject: '速度', A: 95, B: 0, fullMark: 100 },
      { subject: '创造力', A: 75, B: 0, fullMark: 100 },
      { subject: '防守', A: 80, B: 0, fullMark: 100 },
      { subject: '纪律', A: 85, B: 0, fullMark: 100 },
    ]
  },
  { 
    term: '链式防守 (Catenaccio)', 
    definition: '高度战术化的防御系统，强调坚固的人盯人和一名灵活的“自由人”。', 
    category: 'System',
    historicalContext: '20世纪60年代海伦尼奥·埃雷拉带领的大国际时代。',
    keyTraits: ['坚韧防线', '自由人角色', '高效反击', '心理战术'],
    famousTeams: ['国际米兰 (1960s)', '意大利国家队 (1982/2006)'],
    radarProfile: [
      { subject: '控球', A: 40, B: 0, fullMark: 100 },
      { subject: '压迫', A: 50, B: 0, fullMark: 100 },
      { subject: '速度', A: 90, B: 0, fullMark: 100 },
      { subject: '创造力', A: 60, B: 0, fullMark: 100 },
      { subject: '防守', A: 100, B: 0, fullMark: 100 },
      { subject: '纪律', A: 95, B: 0, fullMark: 100 },
    ]
  },
  { term: '伪九号 (False 9)', definition: '前锋回撤至中场接球，吸引对方中卫前移，从而为队友在身后创造插上空间。', category: 'Position' },
  { term: '肋部插上 (Underlap)', definition: '指边路球员不沿边线套外，而是从防守方边后卫与中卫之间的缝隙（肋部）进行内切跑位。', category: 'Action' },
  { term: '低位防守 (Low Block)', definition: '防守方将防线整体退缩至本方禁区前沿，压缩纵向空间，使对方难以通过传球打透。', category: 'Phase' },
  { term: '节拍器 (Regista)', definition: '拖后组织核心，通常位于防线身前，负责全队的传球节奏掌控和长传调度。', category: 'Position' }
];

export const BATTLES: Battle[] = [
  {
    id: 'tiki-taka-2011',
    title: '2011 欧冠决赛：传控之巅',
    subtitle: '巴塞罗那 vs 曼联',
    description: '温布利大球场，瓜迪奥拉的巴萨展现了极致的 Tiki-taka 战术。梅西作为“伪九号” (False 9) 让曼联的两名顶级中卫无所适从，辅以教科书般的高位逼抢 (Gegenpressing) 彻底统治了比赛。',
    teams: {
      home: { 
        name: '巴塞罗那', 
        color: '#a50044', 
        coach: '瓜迪奥拉', 
        formation: '4-3-3',
        philosophy: '极致控球与空间寻找',
        keyInstructions: ['梅西回撤接球', '极致高位压迫', '利用宽度拉伸防线']
      },
      away: { 
        name: '曼联', 
        color: '#da291c', 
        coach: '弗格森', 
        formation: '4-4-1-1',
        philosophy: '两翼齐飞与快速转换',
        keyInstructions: ['反击寻找鲁尼', '限制哈维传球', '边路深度协防']
      }
    },
    radarData: [
      { subject: '控球率', A: 95, B: 40, fullMark: 100 },
      { subject: '压迫强度', A: 90, B: 60, fullMark: 100 },
      { subject: '转换速度', A: 50, B: 95, fullMark: 100 },
      { subject: '创造力', A: 98, B: 70, fullMark: 100 },
      { subject: '防守硬度', A: 70, B: 85, fullMark: 100 },
      { subject: '纪律性', A: 90, B: 92, fullMark: 100 },
    ],
    phases: [
      {
        id: 'build-up',
        title: '后场组织阶段',
        description: '布斯克茨回撤至中卫之间接球，两名边后卫大幅压上，形成 3-4-3 雏形，利用球场宽度拉开曼联防线，这是 Tiki-taka 体系的标准起手式。',
        homePlayers: [
          { id: 'H1', number: 1, position: 'GK', line: 'GK', x: 5, y: 50, name: '巴尔德斯', role: '门将', team: 'home' },
          { id: 'H2', number: 2, position: 'RB', line: 'DEF', x: 35, y: 90, name: '阿尔维斯', role: '进攻型边后卫', team: 'home' },
          { id: 'H3', number: 3, position: 'CB', line: 'DEF', x: 20, y: 65, name: '皮克', role: '出球中卫', team: 'home' },
          { id: 'H4', number: 14, position: 'CB', line: 'DEF', x: 20, y: 35, name: '马斯切拉诺', role: '拦截型中卫', team: 'home' },
          { id: 'H5', number: 22, position: 'LB', line: 'DEF', x: 35, y: 10, name: '阿比达尔', role: '内切型边后卫', team: 'home' },
          { id: 'H6', number: 16, position: 'CDM', line: 'MID', x: 25, y: 50, name: '布斯克茨', role: '节拍器', team: 'home' },
          { id: 'H7', number: 6, position: 'CM', line: 'MID', x: 45, y: 65, name: '哈维', role: '组织核心', team: 'home', physical: {age: 31, height: '170cm', weight: '68kg', foot: 'Right'}, scoutingStats: [{label: 'Passing', value: 99}, {label: 'Vision', value: 98}, {label: 'Dribbling', value: 92}, {label: 'Control', value: 99}, {label: 'Speed', value: 72}], tacticalBrief: ['掌控比赛节奏', '寻找渗透性直传', '高位逼抢发起者'] },
          { id: 'H8', number: 8, position: 'CM', line: 'MID', x: 45, y: 35, name: '伊涅斯塔', role: '突击组织', team: 'home' },
          { id: 'H9', number: 17, position: 'RW', line: 'FWD', x: 65, y: 80, name: '佩德罗', role: '空间拉开者', team: 'home' },
          { id: 'H10', number: 10, position: 'CF', line: 'FWD', x: 55, y: 50, name: '梅西', role: '伪九号', team: 'home', physical: {age: 23, height: '170cm', weight: '72kg', foot: 'Left'}, scoutingStats: [{label: 'Dribbling', value: 99}, {label: 'Finishing', value: 96}, {label: 'Passing', value: 94}, {label: 'Speed', value: 92}, {label: 'Agility', value: 98}], tacticalBrief: ['回撤至中场接球', '吸引曼联中卫前移', '禁区边缘的致命一击'] },
          { id: 'H11', number: 7, position: 'LW', line: 'FWD', x: 65, y: 20, name: '比利亚', role: '内切射手', team: 'home' },
        ],
        awayPlayers: [
          { id: 'A1', number: 1, position: 'GK', line: 'GK', x: 95, y: 50, name: '范德萨', role: '门将', team: 'away' },
          { id: 'A2', number: 20, position: 'RB', line: 'DEF', x: 70, y: 85, name: '法比奥', role: '边后卫', team: 'away' },
          { id: 'A3', number: 5, position: 'CB', line: 'DEF', x: 80, y: 60, name: '费迪南德', role: '中卫', team: 'away' },
          { id: 'A4', number: 15, position: 'CB', line: 'DEF', x: 80, y: 40, name: '维迪奇', role: '中卫', team: 'away' },
          { id: 'A5', number: 3, position: 'LB', line: 'DEF', x: 70, y: 15, name: '埃弗拉', role: '边后卫', team: 'away' },
          { id: 'A6', number: 25, position: 'RM', line: 'MID', x: 55, y: 85, name: '瓦伦西亚', role: '边锋', team: 'away' },
          { id: 'A7', number: 16, position: 'CM', line: 'MID', x: 60, y: 60, name: '卡里克', role: '后腰', team: 'away' },
          { id: 'A8', number: 11, position: 'CM', line: 'MID', x: 60, y: 40, name: '吉格斯', role: '核心', team: 'away' },
          { id: 'A9', number: 13, position: 'LM', line: 'MID', x: 55, y: 15, name: '朴智星', role: '防守工兵', team: 'away' },
          { id: 'A10', number: 10, position: 'SS', line: 'FWD', x: 45, y: 50, name: '鲁尼', role: '二传手', team: 'away', physical: {age: 25, height: '176cm', weight: '83kg', foot: 'Right'}, scoutingStats: [{label: 'Power', value: 92}, {label: 'Finishing', value: 90}, {label: 'Passing', value: 85}, {label: 'Stamina', value: 94}, {label: 'Workrate', value: 98}], tacticalBrief: ['回撤衔接中前场', '寻找快速反击长传', '全场飞奔参与防守'] },
          { id: 'A11', number: 14, position: 'ST', line: 'FWD', x: 40, y: 50, name: '埃尔南德斯', role: '射手', team: 'away' },
        ],
        connections: [
          { from: 'H3', to: 'H6', weight: 20, successRate: 0.98 },
          { from: 'H6', to: 'H7', weight: 30, successRate: 0.95 },
          { from: 'H7', to: 'H8', weight: 45, successRate: 0.92 },
        ]
      },
      {
        id: 'final-third',
        title: '进攻三区压迫',
        description: '当球进入曼联半场，梅西作为伪九号后撤吸引中卫，两侧边锋通过肋部插上斜切，并在丢球后迅速发起高位逼抢。',
        homePlayers: [
          { id: 'H1', number: 1, position: 'GK', line: 'GK', x: 10, y: 50, name: '巴尔德斯', role: '门将', team: 'home' },
          { id: 'H2', number: 2, position: 'RB', line: 'DEF', x: 65, y: 95, name: '阿尔维斯', role: '进攻型边后卫', team: 'home' },
          { id: 'H3', number: 3, position: 'CB', line: 'DEF', x: 40, y: 60, name: '皮克', role: '出球中卫', team: 'home' },
          { id: 'H4', number: 14, position: 'CB', line: 'DEF', x: 40, y: 40, name: '马斯切拉诺', role: '拦截型中卫', team: 'home' },
          { id: 'H5', number: 22, position: 'LB', line: 'DEF', x: 60, y: 5, name: '阿比达尔', role: '内切型边后卫', team: 'home' },
          { id: 'H6', number: 16, position: 'CDM', line: 'MID', x: 50, y: 50, name: '布斯克茨', role: '节拍器', team: 'home' },
          { id: 'H7', number: 6, position: 'CM', line: 'MID', x: 65, y: 65, name: '哈维', role: '组织核心', team: 'home' },
          { id: 'H8', number: 8, position: 'CM', line: 'MID', x: 65, y: 35, name: '伊涅斯塔', role: '突击组织', team: 'home' },
          { id: 'H9', number: 17, position: 'RW', line: 'FWD', x: 85, y: 80, name: '佩德罗', role: '空间拉开者', team: 'home' },
          { id: 'H10', number: 10, position: 'CF', line: 'FWD', x: 75, y: 50, name: '梅西', role: '伪九号', team: 'home' },
          { id: 'H11', number: 7, position: 'LW', line: 'FWD', x: 85, y: 20, name: '比利亚', role: '内切射手', team: 'home' },
        ],
        awayPlayers: [
          { id: 'A1', number: 1, position: 'GK', line: 'GK', x: 95, y: 50, name: '范德萨', role: '门将', team: 'away' },
          { id: 'A2', number: 20, position: 'RB', line: 'DEF', x: 85, y: 75, name: '法比奥', role: '边后卫', team: 'away' },
          { id: 'A3', number: 5, position: 'CB', line: 'DEF', x: 88, y: 55, name: '费迪南德', role: '中卫', team: 'away' },
          { id: 'A4', number: 15, position: 'CB', line: 'DEF', x: 88, y: 45, name: '维迪奇', role: '中卫', team: 'away' },
          { id: 'A5', number: 3, position: 'LB', line: 'DEF', x: 85, y: 25, name: '埃弗拉', role: '边后卫', team: 'away' },
          { id: 'A6', number: 25, position: 'RM', line: 'MID', x: 75, y: 85, name: '瓦伦西亚', role: '边锋', team: 'away' },
          { id: 'A7', number: 16, position: 'CM', line: 'MID', x: 80, y: 55, name: '卡里克', role: '后腰', team: 'away' },
          { id: 'A8', number: 11, position: 'CM', line: 'MID', x: 80, y: 45, name: '吉格斯', role: '核心', team: 'away' },
          { id: 'A9', number: 13, position: 'LM', line: 'MID', x: 75, y: 15, name: '朴智星', role: '防守工兵', team: 'away' },
          { id: 'A10', number: 10, position: 'SS', line: 'FWD', x: 70, y: 55, name: '鲁尼', role: '二传手', team: 'away' },
          { id: 'A11', number: 14, position: 'ST', line: 'FWD', x: 70, y: 45, name: '埃尔南德斯', role: '射手', team: 'away' },
        ],
        connections: [
          { from: 'H7', to: 'H10', weight: 40, successRate: 0.88 },
          { from: 'H10', to: 'H9', weight: 25, successRate: 0.82 },
          { from: 'H10', to: 'H11', weight: 25, successRate: 0.84 },
        ]
      }
    ],
    stats: {
      possession: { home: 68, away: 32 },
      shots: { home: 19, away: 4, onTargetHome: 12, onTargetAway: 1 },
      passes: { home: 772, away: 301, accuracyHome: 91, accuracyAway: 72 }
    }
  }
];
