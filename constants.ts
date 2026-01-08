
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
    strategicFocus: ['瞬时反向', '垂直打击', '全员狂奔'],
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
    ],
    relatedBattleId: 'anfield-miracle-2019'
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
    ],
    famousTeams: ['巴塞罗那 (梅西时期)', '罗马 (托蒂时期)', '利物浦 (菲尔米诺时期)']
  },
  { 
    term: '低位防守 (Low Block)', 
    icon: '🧱', 
    visualEffect: 'low-block', 
    definition: '防守方整体退缩至本方禁区前沿。核心在于压缩对手在禁区内的处理球空间，极其考验对手的远射和定位球能力。', 
    category: 'Phase', 
    complexity: 2,
    strategicFocus: ['空间封锁', '禁区堡垒'],
    radarProfile: [
      { subject: '控球', A: 20, B: 0, fullMark: 100 },
      { subject: '压迫', A: 40, B: 0, fullMark: 100 },
      { subject: '速度', A: 30, B: 0, fullMark: 100 },
      { subject: '创造力', A: 40, B: 0, fullMark: 100 },
      { subject: '防守', A: 100, B: 0, fullMark: 100 },
      { subject: '纪律', A: 100, B: 0, fullMark: 100 },
    ],
    famousTeams: ['国际米兰 (2010)', '切尔西 (2012)', '马德里竞技 (西蒙尼时期)'],
    relatedBattleId: 'mourinho-inter-2010'
  },
  { 
    term: '肋部空间 (Half-Space)', 
    icon: '🏟️', 
    visualEffect: 'half-space', 
    definition: '指球场纵向划分中，边路与中路之间的过渡区域。在这里接球可以迫使对方后卫陷入跟防还是内切的艰难抉择。', 
    category: 'Phase', 
    complexity: 3,
    strategicFocus: ['战术死角', '防线错位'],
    keyTraits: ['纵向走廊', '决策难点', '进攻枢纽'],
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
    term: '套边插上 (Overlap)', 
    icon: '🏃', 
    visualEffect: 'overlap', 
    definition: '边后卫在边锋外侧高速插上，形成局部的二打一优势。这是最经典的边路拉开宽度手段。', 
    category: 'Action', 
    complexity: 1,
    strategicFocus: ['拉开宽度', '边路过载'],
    radarProfile: defaultRadar
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
  { 
    term: '内切边卫 (Inverted Fullback)', 
    icon: '📐', 
    definition: '边后卫在控球时移动到后腰位置，增加中场的人数优势，同时为边锋拉开单挑空间提供保护。', 
    category: 'Position', 
    complexity: 4,
    strategicFocus: ['中场控制', '防反击平衡'],
    famousTeams: ['曼城 (瓜迪奥拉时期)', '阿森纳 (阿尔特塔时期)'],
    radarProfile: [
      { subject: '控球', A: 85, B: 0, fullMark: 100 },
      { subject: '压迫', A: 60, B: 0, fullMark: 100 },
      { subject: '速度', A: 60, B: 0, fullMark: 100 },
      { subject: '创造力', A: 80, B: 0, fullMark: 100 },
      { subject: '防守', A: 75, B: 0, fullMark: 100 },
      { subject: '纪律', A: 95, B: 0, fullMark: 100 },
    ]
  },
  {
    term: '节拍器 (Regista)',
    icon: '🎼',
    definition: '位于后卫线前的组织核心，通过精准的长短传调度指挥全队进攻方向，如同管弦乐队的指挥。',
    category: 'Position',
    complexity: 5,
    strategicFocus: ['全局调度', '节奏掌控'],
    famousTeams: ['尤文图斯 (皮尔洛)', 'AC米兰 (皮尔洛)', '皇家马德里 (克罗斯)'],
    radarProfile: [
      { subject: '控球', A: 95, B: 0, fullMark: 100 },
      { subject: '压迫', A: 40, B: 0, fullMark: 100 },
      { subject: '速度', A: 30, B: 0, fullMark: 100 },
      { subject: '创造力', A: 100, B: 0, fullMark: 100 },
      { subject: '防守', A: 60, B: 0, fullMark: 100 },
      { subject: '纪律', A: 90, B: 0, fullMark: 100 },
    ]
  },
  {
    term: '全能中场 (Box-to-Box)',
    icon: '🔋',
    definition: '具备极强体能和全面技术的球员，覆盖从本方禁区到对方禁区的广阔区域，参与防守与进攻的每一个环节。',
    category: 'Position',
    complexity: 3,
    strategicFocus: ['体能消耗', '攻守平衡'],
    famousTeams: ['曼城 (亚亚图雷)', '皇家马德里 (贝林厄姆)', '阿森纳 (维埃拉)'],
    radarProfile: [
      { subject: '控球', A: 80, B: 0, fullMark: 100 },
      { subject: '压迫', A: 85, B: 0, fullMark: 100 },
      { subject: '速度', A: 85, B: 0, fullMark: 100 },
      { subject: '创造力', A: 75, B: 0, fullMark: 100 },
      { subject: '防守', A: 85, B: 0, fullMark: 100 },
      { subject: '纪律', A: 80, B: 0, fullMark: 100 },
    ]
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
      { id: 'm1', title: '空间支配理论', description: '理解球场纵向与横向的划分逻辑，识别核心区域。', type: 'Theory', relatedKnowledgeId: '肋部空间 (Half-Space)' },
      { id: 'm2', title: '基础套边配合', description: '学习如何利用边路球员创造过载。', type: 'Theory', relatedKnowledgeId: '套边插上 (Overlap)' },
      { id: 'm3', title: '经典复盘：2011 欧冠', description: '实战拆解 2011 欧冠决赛的传控逻辑。', type: 'Simulation', relatedBattleId: 'tiki-taka-2011' }
    ]
  },
  {
    id: 'modern-pressing',
    title: '现代压迫体系',
    description: '深入研究 Gegenpressing，探索现代足球的速度与激情。',
    level: 'Intermediate',
    icon: '⚡',
    modules: [
      { id: 'm4', title: '反抢逻辑', description: '瞬时反抢的物理前提与心理博弈。', type: 'Theory', relatedKnowledgeId: '高位压迫 (Gegenpressing)' },
      { id: 'm5', title: '全能中场的作用', description: '解析现代压迫体系中体能怪物的战术权重。', type: 'Theory', relatedKnowledgeId: '全能中场 (Box-to-Box)' },
      { id: 'm6', title: '安菲尔德奇迹', description: '深度复盘利物浦 4-0 巴萨的压迫实录。', type: 'Simulation', relatedBattleId: 'anfield-miracle-2019' }
    ]
  },
  {
    id: 'defense-art',
    title: '防守反击艺术',
    description: '学习如何在极低控球率下通过完美的防线组织与致命反击赢得比赛。',
    level: 'Intermediate',
    icon: '🛡️',
    modules: [
      { id: 'm10', title: '低位防守堡垒', description: '如何构建让对手绝望的防守网格。', type: 'Theory', relatedKnowledgeId: '低位防守 (Low Block)' },
      { id: 'm11', title: '反击起点的调度', description: '利用节拍器实现由守转攻的瞬间过渡。', type: 'Theory', relatedKnowledgeId: '节拍器 (Regista)' },
      { id: 'm12', title: '穆里尼奥的防守名局', description: '实战解析 2010 欧冠半决赛国米的教科书级防守。', type: 'Simulation', relatedBattleId: 'mourinho-inter-2010' }
    ]
  },
  {
    id: 'advanced-playmaking',
    title: '进阶组织与流动',
    description: '掌握现代足球最复杂的战术流转，理解位置感的真谛。',
    level: 'Advanced',
    icon: '🧠',
    modules: [
      { id: 'm7', title: '伪九号与空间制造', description: '学习如何利用回撤吸引防守，创造致命空间。', type: 'Theory', relatedKnowledgeId: '伪九号 (False 9)' },
      { id: 'm8', title: '内切边卫逻辑', description: '掌握现代教练最爱的战术布局：边卫内切。', type: 'Theory', relatedKnowledgeId: '内切边卫 (Inverted Fullback)' },
      { id: 'm9', title: '复杂阵型演变', description: '探索从 4-3-3 到 3-2-2-3 的场上实时形变。', type: 'Theory' }
    ]
  }
];

export const BATTLES: Battle[] = [
  {
    id: 'tiki-taka-2011',
    title: '2011 欧冠决赛：巴塞罗那 vs 曼联',
    subtitle: '瓜迪奥拉的巅峰：传控足球的极致演绎',
    description: '这场比赛被公认为 Tiki-taka 战术的巅峰之作。巴塞罗那通过哈维、布斯克茨和伊涅斯塔的中场铁三角，完全统治了球权，使得曼联在大部分时间里无法触球。',
    score: { home: 3, away: 1 },
    teams: {
      home: { 
        name: '巴塞罗那', color: '#a50044', coach: '瓜迪奥拉', formation: '4-3-3', 
        philosophy: '通过不断的传球和跑位，制造局部以多打少。',
        keyInstructions: ['高位逼抢', '短传渗透', '伪九号回撤']
      },
      away: { name: '曼联', color: '#da291c', coach: '弗格森', formation: '4-4-2' }
    },
    phases: [
      {
        id: 'p1', title: '梅西回撤制造空间', 
        description: '作为伪九号，梅西大幅度回撤中场，吸引了费迪南德和维迪奇的注意。这导致曼联后卫线出现断层，佩德罗和比利亚利用这个空间进行斜向插上。',
        homePlayers: [
          { id: 'h1', number: 10, name: '梅西', role: '伪九号', position: '回撤中场', x: 45, y: 50, line: 'FWD', team: 'home' },
          { id: 'h2', number: 6, name: '哈维', role: '组织核心', position: '右中场', x: 40, y: 70, line: 'MID', team: 'home' },
          { id: 'h3', number: 17, name: '佩德罗', role: '内切边锋', position: '右翼', x: 65, y: 80, line: 'FWD', team: 'home' }
        ],
        awayPlayers: [
          { id: 'a1', number: 5, name: '费迪南德', role: '中后卫', position: '禁区前沿', x: 75, y: 55, line: 'DEF', team: 'away' },
          { id: 'a2', number: 15, name: '维迪奇', role: '中后卫', position: '禁区前沿', x: 75, y: 45, line: 'DEF', team: 'away' }
        ],
        connections: [{ from: 'h2', to: 'h1', weight: 8, successRate: 98 }]
      }
    ],
    stats: {
      possession: { home: 68, away: 32 },
      shots: { home: 19, away: 4, onTargetHome: 12, onTargetAway: 1 },
      passes: { home: 772, away: 341, accuracyHome: 90, accuracyAway: 72 }
    },
    radarData: [
      { subject: '压迫', A: 95, B: 60, fullMark: 100 },
      { subject: '控球', A: 100, B: 30, fullMark: 100 },
      { subject: '速度', A: 60, B: 85, fullMark: 100 },
      { subject: '对抗', A: 50, B: 90, fullMark: 100 },
      { subject: '纪律', A: 90, B: 80, fullMark: 100 },
      { subject: '创造力', A: 100, B: 55, fullMark: 100 },
    ]
  },
  {
    id: 'anfield-miracle-2019',
    title: '2019 欧冠半决赛：利物浦 vs 巴塞罗那',
    subtitle: '安菲尔德奇迹：高位压迫的暴力美学',
    description: '在首回合 0-3 落后的情况下，利物浦依靠疯狂的 Gegenpressing 彻底摧毁了巴萨的组织体系。',
    score: { home: 4, away: 0 },
    teams: {
      home: { 
        name: '利物浦', color: '#c8102e', coach: '克洛普', formation: '4-3-3', 
        philosophy: '高强度的瞬间反抢，利用对手由守转攻的失误。',
        keyInstructions: ['全体前压', '高频冲刺', '纵向传递']
      },
      away: { name: '巴塞罗那', color: '#004170', coach: '巴尔韦德', formation: '4-3-3' }
    },
    phases: [
      {
        id: 'p1', title: '瞬时围猎', 
        description: '在阿尔巴接球的瞬间，利物浦三名球员迅速形成包围圈。这种高位压迫不仅夺回了球权，更在心理上击垮了对手。',
        homePlayers: [
          { id: 'h1', number: 14, name: '亨德森', role: '全能中场', position: '压迫点', x: 70, y: 75, line: 'MID', team: 'home' },
          { id: 'h2', number: 7, name: '米尔纳', role: '侧翼包夹', position: '压迫点', x: 75, y: 85, line: 'MID', team: 'home' }
        ],
        awayPlayers: [
          { id: 'a1', number: 18, name: '阿尔巴', role: '出球后卫', position: '边路', x: 80, y: 80, line: 'DEF', team: 'away' }
        ],
        connections: []
      }
    ],
    stats: {
      possession: { home: 48, away: 52 },
      shots: { home: 13, away: 8, onTargetHome: 7, onTargetAway: 5 },
      passes: { home: 420, away: 480, accuracyHome: 78, accuracyAway: 82 }
    },
    radarData: [
      { subject: '压迫', A: 100, B: 50, fullMark: 100 },
      { subject: '控球', A: 50, B: 85, fullMark: 100 },
      { subject: '速度', A: 95, B: 60, fullMark: 100 },
      { subject: '对抗', A: 90, B: 70, fullMark: 100 },
      { subject: '纪律', A: 85, B: 75, fullMark: 100 },
      { subject: '创造力', A: 70, B: 90, fullMark: 100 },
    ]
  },
  {
    id: 'mourinho-inter-2010',
    title: '2010 欧冠半决赛：巴塞罗那 vs 国际米兰',
    subtitle: '穆里尼奥的防守大作：意志力与纪律的胜利',
    description: '在诺坎普球场，十人作战的国际米兰通过完美的低位防守，成功限制了巴萨的进攻，展现了防守反击的极致艺术。',
    score: { home: 1, away: 0 },
    teams: {
      home: { name: '巴塞罗那', color: '#a50044', coach: '瓜迪奥拉', formation: '4-3-3' },
      away: { 
        name: '国际米兰', color: '#0066b2', coach: '穆里尼奥', formation: '4-4-1',
        philosophy: '压缩空间，严丝合缝的阵型移动，极致的战术纪律。',
        keyInstructions: ['深度回撤', '切断梅西', '快速清球']
      }
    },
    phases: [
      {
        id: 'p1', title: '巴士阵型：空间压缩', 
        description: '国米球员在禁区前沿排出了两道密集的防线，球员之间的间距保持在5米以内，完全封锁了巴萨的内切路径。',
        homePlayers: [
          { id: 'h1', number: 6, name: '哈维', role: '发牌手', position: '禁区弧顶', x: 60, y: 50, line: 'MID', team: 'home' }
        ],
        awayPlayers: [
          { id: 'a1', number: 4, name: '萨内蒂', role: '防守领袖', position: '肋部', x: 80, y: 40, line: 'DEF', team: 'away' },
          { id: 'a2', number: 19, name: '坎比亚索', role: '清道夫', position: '中路', x: 80, y: 50, line: 'MID', team: 'away' },
          { id: 'a3', number: 6, name: '卢西奥', role: '铁闸', position: '肋部', x: 80, y: 60, line: 'DEF', team: 'away' }
        ],
        connections: []
      }
    ],
    stats: {
      possession: { home: 81, away: 19 },
      shots: { home: 15, away: 1, onTargetHome: 4, onTargetAway: 0 },
      passes: { home: 650, away: 110, accuracyHome: 88, accuracyAway: 45 }
    },
    radarData: [
      { subject: '压迫', A: 60, B: 40, fullMark: 100 },
      { subject: '控球', A: 100, B: 10, fullMark: 100 },
      { subject: '速度', A: 40, B: 70, fullMark: 100 },
      { subject: '对抗', A: 50, B: 95, fullMark: 100 },
      { subject: '纪律', A: 70, B: 100, fullMark: 100 },
      { subject: '创造力', A: 90, B: 30, fullMark: 100 },
    ]
  }
];
