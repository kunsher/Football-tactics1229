
import type { Battle, GlossaryTerm } from './types';

export const GLOSSARY: GlossaryTerm[] = [
  { term: '伪九号 (False 9)', definition: '前锋回撤至中场接球，吸引对方中卫前移，从而为队友在身后创造插上空间。', category: 'Position' },
  { term: '肋部插上 (Underlap)', definition: '指边路球员不沿边线套外，而是从防守方边后卫与中卫之间的缝隙（肋部）进行内切跑位。', category: 'Action' },
  { term: '高位压迫 (Gegenpressing)', definition: '在丢球后的瞬间立即组织多人就地反抢，利用对方转换时的混乱重新夺回球权。', category: 'Phase' },
  { term: '低位防守 (Low Block)', definition: '防守方将防线整体退缩至本方禁区前沿，压缩纵向空间，使对方难以通过传球打透。', category: 'Phase' },
  { term: '节拍器 (Regista)', definition: '拖后组织核心，通常位于防线身前，负责全队的传球节奏掌控和长传调度。', category: 'Position' }
];

export const BATTLES: Battle[] = [
  {
    id: 'tiki-taka-2011',
    title: '2011 欧冠决赛：传控之巅',
    subtitle: '巴塞罗那 vs 曼联',
    description: '温布利大球场，瓜迪奥拉的巴萨展现了极致的 Tiki-taka 战术。梅西作为“伪九号”让曼联的两名顶级中卫无所适从。',
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
  }
];

export const TEAM_COLORS = {
  home: { primary: '#a50044', secondary: '#edbb00', text: '#ffffff' },
  away: { primary: '#da291c', secondary: '#000000', text: '#ffffff' },
};
