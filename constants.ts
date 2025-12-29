
import type { Battle } from './types';

export const BATTLES: Battle[] = [
  {
    id: 'tiki-taka-2011',
    title: '2011 欧冠决赛：传控之巅',
    subtitle: '巴塞罗那 vs 曼联',
    description: '瓜迪奥拉的巴萨展现了极致的 Tiki-taka 战术，通过频繁的短传和梅西的“伪九号”定位，彻底掌控了比赛。',
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
    phases: [
      {
        id: 'build-up',
        title: '后场组织阶段',
        description: '布斯克茨回撤至中卫之间接球，两名边后卫大幅压上，形成 3-4-3 雏形，利用球场宽度拉开曼联防线。',
        homePlayers: [
          { id: 'H1', number: 1, position: 'GK', line: 'GK', x: 5, y: 50, name: '巴尔德斯', role: '门将', team: 'home' },
          { id: 'H2', number: 2, position: 'RB', line: 'DEF', x: 35, y: 90, name: '阿尔维斯', role: '进攻型边后卫', team: 'home' },
          { id: 'H3', number: 3, position: 'CB', line: 'DEF', x: 20, y: 65, name: '皮克', role: '出球中卫', team: 'home' },
          { id: 'H4', number: 14, position: 'CB', line: 'DEF', x: 20, y: 35, name: '马斯切拉诺', role: '拦截型中卫', team: 'home' },
          { id: 'H5', number: 22, position: 'LB', line: 'DEF', x: 35, y: 10, name: '阿比达尔', role: '内切型边后卫', team: 'home' },
          { id: 'H6', number: 16, position: 'CDM', line: 'MID', x: 25, y: 50, name: '布斯克茨', role: '节拍器', team: 'home' },
          { id: 'H7', number: 6, position: 'CM', line: 'MID', x: 45, y: 65, name: '哈维', role: '组织核心', team: 'home' },
          { id: 'H8', number: 8, position: 'CM', line: 'MID', x: 45, y: 35, name: '伊涅斯塔', role: '突击组织', team: 'home' },
          { id: 'H9', number: 17, position: 'RW', line: 'FWD', x: 65, y: 80, name: '佩德罗', role: '空间拉开者', team: 'home' },
          { id: 'H10', number: 10, position: 'CF', line: 'FWD', x: 55, y: 50, name: '梅西', role: '伪九号', team: 'home' },
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
          { id: 'A10', number: 10, position: 'SS', line: 'FWD', x: 45, y: 50, name: '鲁尼', role: '二传手', team: 'away' },
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
        description: '当球进入曼联半场，梅西后撤吸引费迪南德，两侧边锋向肋部斜插，造成曼联防线混乱。',
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
  },
  {
    id: 'mourinho-2010',
    title: '2010 诺坎普之墙：防守艺术',
    subtitle: '巴塞罗那 vs 国际米兰',
    description: '穆里尼奥执教的国米在少打一人的情况下，通过极致的“低位防守 (Low Block)”战术，成功锁死了梅西和哈维，被誉为防守战术的教科书。',
    teams: {
      home: { 
        name: '国际米兰', 
        color: '#0066b2', 
        coach: '穆里尼奥', 
        formation: '4-2-3-1 (变阵)',
        philosophy: '绝对的战术纪律与反击',
        keyInstructions: ['深度低位防守', '切断梅西连线', '莫塔红牌后的牺牲']
      },
      away: { 
        name: '巴塞罗那', 
        color: '#a50044', 
        coach: '瓜迪奥拉', 
        formation: '4-3-3',
        philosophy: '全攻全守的极致进化',
        keyInstructions: ['高强度围攻', '边卫客串边锋', '中卫前提组织']
      }
    },
    phases: [
      {
        id: 'low-block',
        title: '深度低位防守',
        description: '国米全队退缩至本方禁区前沿，压缩纵向空间，萨内蒂和坎比亚索贴身限制哈维接球。',
        homePlayers: [
          { id: 'I1', number: 12, position: 'GK', line: 'GK', x: 8, y: 50, name: '塞萨尔', role: '门将', team: 'home' },
          { id: 'I2', number: 13, position: 'RB', line: 'DEF', x: 20, y: 85, name: '麦孔', role: '边后卫', team: 'home' },
          { id: 'I3', number: 6, position: 'CB', line: 'DEF', x: 18, y: 60, name: '卢西奥', role: '铁闸', team: 'home' },
          { id: 'I4', number: 25, position: 'CB', line: 'DEF', x: 18, y: 40, name: '萨穆埃尔', role: '铁闸', team: 'home' },
          { id: 'I5', number: 4, position: 'LB', line: 'DEF', x: 20, y: 15, name: '萨内蒂', role: '传奇队长', team: 'home' },
          { id: 'I6', number: 19, position: 'CDM', line: 'MID', x: 25, y: 55, name: '坎比亚索', role: '中场屏障', team: 'home' },
          { id: 'I7', number: 8, position: 'CDM', line: 'MID', x: 25, y: 45, name: '莫塔', role: '组织者(红牌离场)', team: 'home' },
          { id: 'I8', number: 10, position: 'CAM', line: 'MID', x: 35, y: 50, name: '斯内德', role: '核心', team: 'home' },
          { id: 'I9', number: 9, position: 'RW', line: 'FWD', x: 30, y: 80, name: '埃托奥', role: '牺牲精神', team: 'home' },
          { id: 'I10', number: 22, position: 'ST', line: 'FWD', x: 45, y: 50, name: '米利托', role: '反击箭头', team: 'home' },
        ],
        awayPlayers: [
          { id: 'B1', number: 1, position: 'GK', line: 'GK', x: 90, y: 50, name: '巴尔德斯', role: '门将', team: 'away' },
          { id: 'B2', number: 2, position: 'RB', line: 'DEF', x: 50, y: 90, name: '阿尔维斯', role: '压上', team: 'away' },
          { id: 'B3', number: 3, position: 'CB', line: 'DEF', x: 60, y: 65, name: '皮克', role: '中卫', team: 'away' },
          { id: 'B4', number: 10, position: 'RW', line: 'FWD', x: 40, y: 70, name: '梅西', role: '被包围', team: 'away' },
        ],
        connections: [
          { from: 'I3', to: 'I6', weight: 15, successRate: 0.9 },
          { from: 'I6', to: 'I9', weight: 25, successRate: 0.8 },
        ]
      }
    ],
    stats: {
      possession: { home: 19, away: 81 },
      shots: { home: 1, away: 20, onTargetHome: 0, onTargetAway: 4 },
      passes: { home: 112, away: 732, accuracyHome: 55, accuracyAway: 89 }
    }
  },
  {
    id: 'istanbul-2005',
    title: '2005 伊斯坦布尔：战术奇迹',
    subtitle: 'AC米兰 vs 利物浦',
    description: '下半场贝尼特斯换上哈曼，变阵 3-4-2-1。解放了杰拉德，同时成功限制了皮尔洛的组织，实现了足球史上最伟大的逆转。',
    teams: {
      home: { 
        name: '利物浦', 
        color: '#c8102e', 
        coach: '贝尼特斯', 
        formation: '3-4-2-1 (变阵)',
        philosophy: '高强度的跑动与战术灵活性',
        keyInstructions: ['哈曼贴身盯防皮尔洛', '杰拉德前提参与进攻', '下半场增加对抗强度']
      },
      away: { 
        name: 'AC米兰', 
        color: '#fb090b', 
        coach: '安切洛蒂', 
        formation: '4-3-1-2 (圣诞树)',
        philosophy: '优雅的技术足球与菱形中场',
        keyInstructions: ['寻找前插的卡卡', '利用皮尔洛精准调度', '后场两翼回收补位']
      }
    },
    phases: [
      {
        id: 'adjustment',
        title: '下半场战术逆转',
        description: '哈曼上场担任单后腰贴身盯防皮尔洛，利物浦改打三中卫，杰拉德位置前提进入进攻核心区域。',
        homePlayers: [
          { id: 'L1', number: 1, position: 'GK', line: 'GK', x: 5, y: 50, name: '杜德克', role: '面条舞', team: 'home' },
          { id: 'L2', number: 23, position: 'CB', line: 'DEF', x: 20, y: 75, name: '卡拉格', role: '坚盾', team: 'home' },
          { id: 'L3', number: 4, position: 'CB', line: 'DEF', x: 20, y: 50, name: '海皮亚', role: '制空', team: 'home' },
          { id: 'L4', number: 16, position: 'CDM', line: 'MID', x: 35, y: 50, name: '哈曼', role: '战术转折点', team: 'home' },
          { id: 'L5', number: 8, position: 'CAM', line: 'MID', x: 60, y: 50, name: '杰拉德', role: '灵魂人物', team: 'home' },
        ],
        awayPlayers: [
          { id: 'M1', number: 21, position: 'CDM', line: 'MID', x: 40, y: 50, name: '皮尔洛', role: '被限制', team: 'away' },
          { id: 'M2', number: 22, position: 'CAM', line: 'MID', x: 45, y: 70, name: '卡卡', role: '巨星', team: 'away' },
        ],
        connections: [
          { from: 'L4', to: 'L5', weight: 35, successRate: 0.95 },
        ]
      }
    ],
    stats: {
      possession: { home: 45, away: 55 },
      shots: { home: 15, away: 22, onTargetHome: 7, onTargetAway: 10 },
      passes: { home: 412, away: 520, accuracyHome: 82, accuracyAway: 85 }
    }
  }
];

export const TEAM_COLORS = {
  home: { primary: '#a50044', secondary: '#edbb00', text: '#ffffff' },
  away: { primary: '#da291c', secondary: '#000000', text: '#ffffff' },
};
