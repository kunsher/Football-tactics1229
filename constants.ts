
import type { Battle, GlossaryTerm, PlayerPosition, LearningPath } from './types';

const generateFullSquad = (homeCoords: {x:number, y:number}[], awayCoords: {x:number, y:number}[], homeNames: string[], awayNames: string[], homeNumbers: number[], awayNumbers: number[]) => {
  const homePlayers: PlayerPosition[] = homeCoords.map((c, i) => ({
    id: `h${i}`, 
    number: homeNumbers[i] || i + 1,
    name: homeNames[i], 
    role: ['门将', '右后卫', '中后卫', '中后卫', '左后卫', '防守中场', '中场', '中场', '前腰', '前锋', '前锋'][i],
    position: 'Pos', line: i < 1 ? 'GK' : i < 5 ? 'DEF' : i < 9 ? 'MID' : 'FWD', team: 'home', ...c,
    gps: {
        totalDistance: 10200 + i * 200,
        metabolicPower: 20 + Math.random() * 8,
        highIntensityDistance: 400 + Math.random() * 400,
        sprintsCount: 12 + Math.floor(Math.random() * 10),
        maxSpeed: 30 + Math.random() * 5,
        speedZones: [
          { zone: 'Z1-Z2', speedRange: '0-14.4km/h', distance: 7000, percentage: 70 },
          { zone: 'Z3', speedRange: '14.4-19.8km/h', distance: 2000, percentage: 20 },
          { zone: 'Z4', speedRange: '19.8-25.2km/h', distance: 800, percentage: 8 },
          { zone: 'Z5', speedRange: '>25.2km/h', distance: 200, percentage: 2 }
        ]
    }
  }));
  const awayPlayers: PlayerPosition[] = awayCoords.map((c, i) => ({
    id: `a${i}`, 
    number: awayNumbers[i] || i + 1,
    name: awayNames[i], 
    role: '对手', position: 'Pos', line: 'MID', team: 'away', ...c
  }));
  return { homePlayers, awayPlayers };
};

const RM_NAMES = ['卡西利亚斯', '阿韦洛亚', '佩佩', '拉莫斯', '科恩特朗', '赫迪拉', '哈维·阿隆索', '迪马利亚', '厄齐尔', 'C罗', '本泽马'];
const RM_NUMS = [1, 17, 3, 4, 5, 6, 14, 22, 10, 7, 9];

const BARSA_NAMES = ['巴尔德斯', '阿尔维斯', '普约尔', '马斯切拉诺', '阿德里亚诺', '布斯克茨', '哈维', '蒂亚戈', '伊涅斯塔', '梅西', '特略'];
const BARSA_NUMS = [1, 2, 5, 14, 21, 16, 6, 11, 8, 10, 37];

export const BATTLES: Battle[] = [
  {
    id: 'real-madrid-2012',
    title: '2012 西甲：皇马 2-1 巴萨',
    subtitle: '诺坎普的 Calma：穆氏反击的暴力美学',
    description: '此战是穆里尼奥皇马时期的战术巅峰。面对梦三巴萨，皇马展示了教科书般的低位防守与垂直反击。',
    score: { home: 2, away: 1 },
    teams: {
      home: { 
        name: '皇家马德里', color: '#ffffff', coach: '穆里尼奥', formation: '4-2-3-1', 
        philosophy: '极限压缩中路，利用厄齐尔的直塞与C罗的速度瞬时转场。',
        keyInstructions: ['防守三层过滤', '垂直反击', '针对性切断梅西']
      },
      away: { name: '巴塞罗那', color: '#a50044', coach: '瓜迪奥拉', formation: '4-3-3' }
    },
    events: [
      { id: 'e1', type: 'Goal', minute: '17:00', phaseId: 'rm1', label: '赫迪拉僵局破开' },
      { id: 'e2', type: 'Transition', minute: '73:00', phaseId: 'rm2', label: '厄齐尔反击启动' },
      { id: 'e3', type: 'Goal', minute: '73:15', phaseId: 'rm3', label: 'C罗冷静终结' },
    ],
    phases: [
      {
        id: 'rm1', title: '低位压缩', 
        matchMinute: "42:15",
        matchContext: "1 - 1",
        description: '皇马在防守端极其紧凑。哈维·阿隆索与赫迪拉横向锁死梅西的接球空间，后防四人组保持极短间距。',
        ...generateFullSquad(
          [{x:5,y:50},{x:22,y:82},{x:18,y:60},{x:18,y:40},{x:22,y:18},{x:35,y:55},{x:35,y:45},{x:45,y:85},{x:42,y:50},{x:45,y:15},{x:52,y:50}],
          [{x:95,y:50},{x:58,y:92},{x:70,y:62},{x:70,y:38},{x:58,y:8},{x:62,y:50},{x:52,y:68},{x:52,y:32},{x:45,y:75},{x:45,y:50},{x:45,y:25}],
          RM_NAMES, BARSA_NAMES, RM_NUMS, BARSA_NUMS
        ),
        connections: [],
        annotations: [
          { type: 'line', points: [{x:22,y:82},{x:18,y:60},{x:18,y:40},{x:22,y:18}], label: '四后卫防线', color: '#ffffff88' },
          { type: 'area', points: [{x:25,y:30},{x:45,y:30},{x:45,y:70},{x:25,y:70}], label: '梅西封锁区', color: 'rgba(59, 130, 246, 0.2)' }
        ]
      },
      {
        id: 'rm2', title: '瞬时转场', 
        matchMinute: "72:48",
        matchContext: "1 - 1",
        description: '在断球瞬间，皇马阵型迅速散开。厄齐尔在中场寻找纵向空间，C罗开始在左翼加速。',
        ...generateFullSquad(
          [{x:8,y:50},{x:30,y:85},{x:25,y:65},{x:25,y:35},{x:30,y:15},{x:45,y:60},{x:45,y:40},{x:55,y:80},{x:52,y:50},{x:60,y:20},{x:65,y:55}],
          [{x:92,y:50},{x:65,y:90},{x:75,y:65},{x:75,y:35},{x:65,y:10},{x:55,y:55},{x:48,y:65},{x:48,y:35},{x:42,y:70},{x:42,y:50},{x:42,y:30}],
          RM_NAMES, BARSA_NAMES, RM_NUMS, BARSA_NUMS
        ),
        connections: [{ from: 'h6', to: 'h8', weight: 8, successRate: 100 }],
        annotations: [{ type: 'arrow', points: [{x:60,y:20},{x:85,y:25}], label: 'C罗突进', color: '#3b82f6' }]
      },
      {
        id: 'rm3', title: '致命绝杀', 
        matchMinute: "73:12",
        matchContext: "2 - 1",
        description: '厄齐尔送出精准斜塞。C罗高速插上，冷静晃过守门员推射空门，并向诺坎普做出了著名的“Calma”手势。',
        ...generateFullSquad(
          [{x:12,y:50},{x:45,y:85},{x:40,y:65},{x:40,y:35},{x:45,y:15},{x:55,y:62},{x:55,y:38},{x:65,y:88},{x:68,y:55},{x:88,y:25},{x:75,y:45}],
          [{x:88,y:50},{x:75,y:95},{x:82,y:68},{x:82,y:32},{x:75,y:5},{x:65,y:55},{x:55,y:62},{x:55,y:38},{x:45,y:65},{x:48,y:50},{x:42,y:32}],
          RM_NAMES, BARSA_NAMES, RM_NUMS, BARSA_NUMS
        ),
        connections: [{ from: 'h8', to: 'h9', weight: 10, successRate: 100 }],
        annotations: [
          { type: 'arrow', points: [{x:68,y:55},{x:88,y:25}], label: '致命直塞', color: '#ffcc00' },
          { type: 'focus', points: [{x:88,y:25}], label: 'C罗' }
        ]
      }
    ],
    stats: {
      possession: { home: 28, away: 72 },
      shots: { home: 14, away: 11, onTargetHome: 6, onTargetAway: 3 },
      passes: { home: 280, away: 790, accuracyHome: 68, accuracyAway: 91 }
    },
    radarData: [
      { subject: '压迫', A: 85, B: 70, fullMark: 100 },
      { subject: '控球', A: 30, B: 100, fullMark: 100 },
      { subject: '速度', A: 100, B: 50, fullMark: 100 },
      { subject: '对抗', A: 95, B: 60, fullMark: 100 },
      { subject: '纪律', A: 100, B: 80, fullMark: 100 },
      { subject: '创造力', A: 80, B: 95, fullMark: 100 },
    ]
  }
];

export const GLOSSARY: GlossaryTerm[] = [
  {
    term: 'Tiki-taka (传控足球)',
    definition: '一种强调极短距离传球、频繁跑位和球权绝对控制的战术体系。核心是通过大量三角传递重构对方防线的空间坐标。',
    category: 'System',
    icon: '⚽',
    visualEffect: 'tiki-taka',
    complexity: 4,
    strategicFocus: ['球权控制', '空间重构', '第三人跑位'],
    historicalContext: '由克鲁伊夫奠基，在瓜迪奥拉执教巴塞罗那（2008-2012）期间达到顶峰。',
    keyTraits: ['高频短传', '三角站位', '伪九号应用'],
    radarProfile: [
      { subject: '控球率', A: 98, fullMark: 100 },
      { subject: '传球精度', A: 92, fullMark: 100 },
      { subject: '压迫强度', A: 85, fullMark: 100 },
      { subject: '身体对抗', A: 45, fullMark: 100 },
      { subject: '爆发力', A: 60, fullMark: 100 }
    ],
    famousTeams: ['巴塞罗那 (2011)', '西班牙国家队 (2010)']
  },
  {
    term: 'Gegenpressing (反抢压迫)',
    definition: '在失去球权的瞬间立即发起集体压迫，利用对手阵型从防守切换到进攻的“混乱窗口”重新夺回球权，实现就地反击。',
    category: 'System',
    icon: '⚡',
    visualEffect: 'counter-press',
    complexity: 5,
    strategicFocus: ['攻守转换', '高位逼抢', '垂直进攻'],
    historicalContext: '朗尼克提出的核心理念，由克洛普在多特蒙德和利物浦时期发扬光大。',
    keyTraits: ['疯狗式逼抢', '合围拦截', '体能极限要求'],
    radarProfile: [
      { subject: '压迫强度', A: 100, fullMark: 100 },
      { subject: '体能消耗', A: 98, fullMark: 100 },
      { subject: '反击速度', A: 95, fullMark: 100 },
      { subject: '阵型紧凑', A: 88, fullMark: 100 },
      { subject: '控球率', A: 55, fullMark: 100 }
    ],
    famousTeams: ['多特蒙德 (2012)', '利物浦 (2019)']
  },
  {
    term: 'Low Block (低位防守)',
    definition: '将全队防守线大幅向本方禁区回撤，通过压缩后场深度和宽度来消除对手的插上空间。',
    category: 'Phase',
    icon: '🛡️',
    visualEffect: 'low-block',
    complexity: 3,
    strategicFocus: ['深度防御', '间距控制', '长传转场'],
    historicalContext: '意式防守（Catenaccio）的现代化演变，穆里尼奥、马竞西蒙尼的拿手好戏。',
    keyTraits: ['防线前移限制', '双后腰锁喉', '反击前锋孤立'],
    radarProfile: [
      { subject: '防守深度', A: 100, fullMark: 100 },
      { subject: '空间限制', A: 95, fullMark: 100 },
      { subject: '长传精度', A: 80, fullMark: 100 },
      { subject: '控球率', A: 25, fullMark: 100 },
      { subject: '犯规频率', A: 70, fullMark: 100 }
    ],
    famousTeams: ['国际米兰 (2010)', '马德里竞技 (2016)']
  },
  {
    term: 'Half-Space (肋部空间)',
    definition: '将球场纵向分为五条走廊，位于边路和中路之间的区域。这里是防守最难覆盖、进攻最高效率的战术节点。',
    category: 'Action',
    icon: '📐',
    visualEffect: 'half-space',
    complexity: 5,
    strategicFocus: ['斜线直塞', '错位接应', '边路吸引'],
    keyTraits: ['内切跑位', '倒三角传中', '博弈真空区'],
    historicalContext: '现代位置感足球（Juego de Posicion）的核心概念。',
    famousTeams: ['曼城 (德布劳内专区)', '拜仁慕尼黑']
  }
];

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'lp-foundation',
    title: '战术素养：空间解构基础',
    description: '从“看热闹”到“看门道”，学习如何将球场划分为不同战术走廊，理解球员职能分布。',
    level: 'Beginner',
    icon: '🌱',
    modules: [
      { id: 'm1-1', title: '球场五走廊模型', type: 'Theory', description: '学习如何像瓜迪奥拉一样观察球场，理解肋部空间的战略价值。' },
      { id: 'm1-2', title: '阵型与职责：1-11号的演变', type: 'Theory', description: '从传统的4-4-2到现代的3-2-5切换，球员角色是如何变化的？' }
    ]
  },
  {
    id: 'lp-advanced',
    title: '名帅哲学：战术基因解码',
    description: '深度解构 Tiki-taka 与 Gegenpressing，通过实战模拟掌握攻守转换的 5 秒法则。',
    level: 'Intermediate',
    icon: '🧠',
    modules: [
      { id: 'm2-1', title: 'Tiki-taka 逻辑实操', type: 'Simulation', description: '在沙盒中模拟 15 次传递后的致命直塞。', relatedKnowledgeId: 'Tiki-taka (传控足球)' },
      { id: 'm2-2', title: '高位逼抢触发器', type: 'Simulation', description: '识别什么时候该“冲锋”，学习压迫路径的弧线封锁。', relatedKnowledgeId: 'Gegenpressing (反抢压迫)' }
    ]
  },
  {
    id: 'lp-pro',
    title: '职业分析：GPS 数据与性能分析',
    description: '拉夫堡大学伦敦校区标准。学习如何利用性能数据（HSR、代谢功率）评估战术执行力。',
    level: 'Advanced',
    icon: '🔬',
    modules: [
      { id: 'm3-1', title: '数据看板：HSR 与冲刺阈值', type: 'Theory', description: '分析英超级别的跑动数据，理解高强度跑动对战术的影响。' },
      { id: 'm3-2', title: 'Sportscode 标签化实战', type: 'Simulation', description: '在 2012 国家德比战役中进行实时标签化（Coding）复盘。', relatedBattleId: 'real-madrid-2012' }
    ]
  }
];
