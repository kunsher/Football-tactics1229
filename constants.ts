
import type { Battle, GlossaryTerm, PlayerPosition, LearningPath } from './types';

const generateFullSquad = (homeCoords: {x:number, y:number}[], awayCoords: {x:number, y:number}[], homeNames: string[], awayNames: string[], homeNumbers: number[], awayNumbers: number[]) => {
  const homePlayers: PlayerPosition[] = homeCoords.map((c, i) => ({
    id: `h${i}`, 
    number: homeNumbers[i] || i + 1,
    name: homeNames[i], 
    role: ['门将', '右后卫', '中后卫', '中后卫', '左后卫', '防守中场', '中场', '中场', '前腰', '前锋', '前锋'][i],
    position: 'Pos', line: i < 1 ? 'GK' : i < 5 ? 'DEF' : i < 9 ? 'MID' : 'FWD', team: 'home', ...c
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

const LIV_NAMES = ['杜德克', '芬南', '卡拉格', '海皮亚', '特劳雷', '路易斯·加西亚', '哈维·阿隆索', '里瑟', '杰拉德', '巴罗什', '科威尔'];
const LIV_NUMS = [1, 3, 23, 4, 21, 10, 14, 6, 8, 5, 7];

const ACM_NAMES = ['迪达', '卡福', '内斯塔', '斯塔姆', '马尔蒂尼', '加图索', '皮尔洛', '西多夫', '卡卡', '舍甫琴科', '克雷斯波'];
const ACM_NUMS = [1, 2, 13, 31, 3, 8, 21, 10, 22, 7, 11];

const MUTD_NAMES = ['德赫亚', '拉斐尔', '费迪南德', '维迪奇', '埃弗拉', '卡里克', '克莱维利', '纳尼', '维尔贝克', '吉格斯', '范佩西'];
const MUTD_NUMS = [1, 2, 5, 15, 3, 16, 23, 17, 19, 11, 20];

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
    phases: [
      {
        id: 'rm1', title: '低位压缩', 
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
  },
  {
    id: 'istanbul-2005',
    title: '2005 欧冠：利物浦 3-3 米兰',
    subtitle: '伊斯坦布尔之夜：不可思议的逆转奇迹',
    description: '足球史上最伟大的决赛之一。利物浦在半场 0-3 落后的绝境下，凭借 6 分钟内的 3 个进球完成神迹。',
    score: { home: 3, away: 3 },
    teams: {
      home: { name: '利物浦', color: '#dc0714', coach: '贝尼特斯', formation: '4-4-1-1' },
      away: { name: 'AC米兰', color: '#000000', coach: '安切洛蒂', formation: '4-3-1-2' }
    },
    phases: [
      {
        id: 'is1', title: '米兰主宰', 
        description: '安切洛蒂的菱形中场彻底支配了上半场。卡卡在前腰位置的盘带无人能挡。',
        ...generateFullSquad(
          [{x:5,y:50},{x:20,y:85},{x:25,y:60},{x:25,y:40},{x:20,y:15},{x:40,y:70},{x:45,y:50},{x:40,y:30},{x:50,y:50},{x:65,y:55},{x:65,y:45}],
          [{x:95,y:50},{x:75,y:85},{x:80,y:60},{x:80,y:40},{x:75,y:15},{x:60,y:75},{x:60,y:25},{x:55,y:50},{x:45,y:50},{x:35,y:60},{x:35,y:40}],
          LIV_NAMES, ACM_NAMES, LIV_NUMS, ACM_NUMS
        ),
        connections: [],
        annotations: [
          { type: 'focus', points: [{x:45,y:50}], label: '卡卡支配区' },
          { type: 'area', points: [{x:40,y:20},{x:60,y:20},{x:60,y:80},{x:40,y:80}], label: '菱形中场封锁', color: 'rgba(255, 0, 0, 0.1)' }
        ]
      },
      {
        id: 'is2', title: '变阵重组', 
        description: '利物浦下半场改踢 3-5-2，哈曼的上场解放了杰拉德。阵型开始整体前移。',
        ...generateFullSquad(
          [{x:10,y:50},{x:35,y:75},{x:30,y:50},{x:35,y:25},{x:50,y:90},{x:55,y:65},{x:52,y:50},{x:55,y:35},{x:50,y:10},{x:70,y:60},{x:70,y:40}],
          [{x:90,y:50},{x:70,y:85},{x:75,y:62},{x:75,y:38},{x:70,y:15},{x:62,y:65},{x:62,y:35},{x:58,y:50},{x:52,y:50},{x:45,y:55},{x:45,y:45}],
          LIV_NAMES, ACM_NAMES, LIV_NUMS, ACM_NUMS
        ),
        connections: [{ from: 'h6', to: 'h8', weight: 5, successRate: 100 }],
        annotations: [{ type: 'line', points: [{x:35,y:75},{x:30,y:50},{x:35,y:25}], label: '三后卫防线', color: '#ff0000' }]
      },
      {
        id: 'is3', title: '逆转时刻', 
        description: '杰拉德在禁区内高高跃起，头球破门。进球后他挥动手臂激励全队，奇迹正式开始。',
        ...generateFullSquad(
          [{x:15,y:50},{x:45,y:80},{x:40,y:55},{x:45,y:30},{x:60,y:95},{x:65,y:65},{x:65,y:35},{x:70,y:15},{x:85,y:50},{x:85,y:70},{x:85,y:30}],
          [{x:92,y:50},{x:78,y:85},{x:82,y:60},{x:82,y:40},{x:78,y:15},{x:65,y:70},{x:65,y:30},{x:58,y:50},{x:52,y:50},{x:48,y:55},{x:48,y:45}],
          LIV_NAMES, ACM_NAMES, LIV_NUMS, ACM_NUMS
        ),
        connections: [{ from: 'h7', to: 'h8', weight: 10, successRate: 100 }],
        annotations: [{ type: 'arrow', points: [{x:70,y:15},{x:85,y:50}], label: '传中进球', color: '#ffffff' }]
      }
    ],
    stats: {
      possession: { home: 45, away: 55 },
      shots: { home: 15, away: 22, onTargetHome: 7, onTargetAway: 10 },
      passes: { home: 410, away: 520, accuracyHome: 78, accuracyAway: 85 }
    },
    radarData: [
      { subject: '压迫', A: 90, B: 75, fullMark: 100 },
      { subject: '意志', A: 100, B: 60, fullMark: 100 },
      { subject: '控球', A: 45, B: 85, fullMark: 100 },
      { subject: '技术', A: 70, B: 95, fullMark: 100 },
      { subject: '转换', A: 95, B: 80, fullMark: 100 },
      { subject: '防守', A: 80, B: 85, fullMark: 100 },
    ]
  },
  {
    id: 'manutd-real-2013',
    title: '2013 欧冠：曼联 1-2 皇马',
    subtitle: '梦剧场的回归：C罗的致命一击',
    description: 'C罗职业生涯首次回归老特拉福德。纳尼红牌改变走势，皇马由莫德里奇和C罗连下两城。',
    score: { home: 1, away: 2 },
    teams: {
      home: { name: '皇家马德里', color: '#ffffff', coach: '穆里尼奥', formation: '4-2-3-1' },
      away: { name: '曼彻斯特联', color: '#da291c', coach: '弗格森', formation: '4-4-2' }
    },
    phases: [
      {
        id: 'cr1', title: '远程发炮', 
        description: '莫德里奇替补上场，在禁区弧顶外一记标志性的抽射击中立柱内侧入网。',
        ...generateFullSquad(
          [{x:5,y:50},{x:25,y:85},{x:20,y:60},{x:20,y:40},{x:25,y:15},{x:40,y:65},{x:40,y:35},{x:55,y:75},{x:50,y:50},{x:55,y:25},{x:65,y:50}],
          [{x:95,y:50},{x:75,y:88},{x:80,y:65},{x:80,y:35},{x:75,y:12},{x:65,y:60},{x:65,y:40},{x:55,y:80},{x:68,y:50},{x:55,y:20},{x:45,y:50}],
          RM_NAMES, MUTD_NAMES, RM_NUMS, MUTD_NUMS
        ),
        connections: [],
        annotations: [
          { type: 'focus', points: [{x:50,y:50}], label: '莫德里奇' },
          { type: 'arrow', points: [{x:50,y:50},{x:90,y:55}], label: '射门路径', color: '#ffcc00' }
        ]
      },
      {
        id: 'cr2', title: '旧主绝杀', 
        description: '伊瓜因横传，C罗在远端包抄空门得手。进球后的他举起双手谢绝庆祝。',
        ...generateFullSquad(
          [{x:15,y:50},{x:45,y:80},{x:40,y:55},{x:45,y:30},{x:60,y:90},{x:65,y:60},{x:65,y:40},{x:70,y:10},{x:85,y:30},{x:90,y:50},{x:85,y:70}],
          [{x:92,y:50},{x:78,y:85},{x:82,y:60},{x:82,y:40},{x:78,y:15},{x:65,y:70},{x:65,y:30},{x:58,y:50},{x:52,y:50},{x:48,y:55},{x:48,y:45}],
          RM_NAMES, MUTD_NAMES, RM_NUMS, MUTD_NUMS
        ),
        connections: [{ from: 'h10', to: 'h9', weight: 10, successRate: 100 }],
        annotations: [
          { type: 'arrow', points: [{x:85,y:70},{x:90,y:50}], label: '致命横传', color: '#3b82f6' },
          { type: 'focus', points: [{x:90,y:50}], label: 'C罗' }
        ]
      }
    ],
    stats: {
      possession: { home: 40, away: 60 },
      shots: { home: 11, away: 18, onTargetHome: 5, onTargetAway: 8 },
      passes: { home: 350, away: 510, accuracyHome: 75, accuracyAway: 88 }
    },
    radarData: [
      { subject: '转换', A: 95, B: 80, fullMark: 100 },
      { subject: '效率', A: 90, B: 70, fullMark: 100 },
      { subject: '控制', A: 85, B: 80, fullMark: 100 },
      { subject: '对抗', A: 80, B: 85, fullMark: 100 },
      { subject: '速度', A: 100, B: 85, fullMark: 100 },
      { subject: '纪律', A: 90, B: 95, fullMark: 100 },
    ]
  }
];

export const GLOSSARY: GlossaryTerm[] = [
  { 
    term: '闪电反击 (Vertical Counter)', 
    definition: '穆里尼奥战术的核心。当夺回球权后，通过极少的触球和极致的向前传递速度完成致命一击。', 
    category: 'System',
    icon: '⚡',
    visualEffect: 'overlap',
    complexity: 5,
    strategicFocus: ['瞬时纵向', '反击精度', '速度爆发'],
    historicalContext: '穆里尼奥在皇家马德里（2010-2013）将其发挥到极限。尤其是在2011/12赛季，皇马单赛季轰入121球，打破了西甲纪录。这种风格强调放弃控球权，将防守作为进攻的起点。',
    keyTraits: ['极限回撤', '纵向直塞', '边路爆破'],
    famousTeams: ['皇家马德里 (2011-2012)', '切尔西 (2004-2006)'],
    relatedBattleId: 'real-madrid-2012',
    radarProfile: [
      { subject: '控球', A: 40, fullMark: 100 },
      { subject: '压迫', A: 70, fullMark: 100 },
      { subject: '速度', A: 100, fullMark: 100 },
      { subject: '创造力', A: 85, fullMark: 100 },
      { subject: '防守', A: 95, fullMark: 100 },
      { subject: '纪律', A: 100, fullMark: 100 },
    ]
  },
  { 
    term: 'Tiki-taka', 
    definition: '一种强调短距离传球和跑位的控球风格。其核心是利用不断的传球来寻找防线缝隙。', 
    category: 'System',
    icon: '⚽',
    visualEffect: 'tiki-taka',
    complexity: 5,
    strategicFocus: ['控球主导', '空间三角形', '极高成功率'],
    historicalContext: '由克鲁伊夫奠定基础，在瓜迪奥拉时代的巴塞罗那（2008-2012）和博斯克时代的西班牙国家队（2008-2012）达到巅峰。它要求球员具备极高的技术能力和空间阅读能力。',
    keyTraits: ['传控足球', '小范围配合', '高位逼抢'],
    famousTeams: ['巴塞罗那 (2009-2011)', '西班牙国家队 (2010)'],
    radarProfile: [
      { subject: '控球', A: 100, fullMark: 100 },
      { subject: '压迫', A: 85, fullMark: 100 },
      { subject: '速度', A: 40, fullMark: 100 },
      { subject: '创造力', A: 95, fullMark: 100 },
      { subject: '防守', A: 75, fullMark: 100 },
      { subject: '纪律', A: 90, fullMark: 100 },
    ]
  },
  { 
    term: '疯狂压迫 (Gegenpressing)', 
    definition: '又称“反向压迫”。在丢失球权的瞬间立即投入大量兵力围抢，防止对方发动反击。', 
    category: 'Action',
    icon: '🔥',
    visualEffect: 'counter-press',
    complexity: 4,
    strategicFocus: ['就地反抢', '心理压制', '瞬时合围'],
    historicalContext: '由朗尼克等德国教练提出，在克洛普的多特蒙德和利物浦时期闻名全球。克洛普曾说：“反抢是世界上最好的组织核心”。它将防守动作转化成了最直接的进攻威胁。',
    keyTraits: ['5秒定律', '蜂拥合围', '体力极限'],
    famousTeams: ['利物浦 (2018-2020)', '多特蒙德 (2011-2013)'],
    radarProfile: [
      { subject: '控球', A: 65, fullMark: 100 },
      { subject: '压迫', A: 100, fullMark: 100 },
      { subject: '速度', A: 90, fullMark: 100 },
      { subject: '创造力', A: 75, fullMark: 100 },
      { subject: '防守', A: 85, fullMark: 100 },
      { subject: '纪律', A: 85, fullMark: 100 },
    ]
  },
  { 
    term: '链式防守 (Catenaccio)', 
    definition: '意大利足球的经典标志。通过极其严密的防守体系和一名自由人（Libero）实现禁区前的铁壁。', 
    category: 'System',
    icon: '🛡️',
    visualEffect: 'low-block',
    complexity: 4,
    strategicFocus: ['极致紧凑', '自由人补位', '反击效率'],
    historicalContext: '由埃莱尼奥·埃雷拉在1960年代的国际米兰发扬光大。这种战术并非单纯的消极防守，而是通过防守的绝对稳定性为前场天才创造绝杀机会。',
    keyTraits: ['盯人防守', '深度落位', '反击致命'],
    famousTeams: ['国际米兰 (1960s)', '意大利国家队 (2006)'],
    radarProfile: [
      { subject: '控球', A: 35, fullMark: 100 },
      { subject: '压迫', A: 40, fullMark: 100 },
      { subject: '速度', A: 60, fullMark: 100 },
      { subject: '创造力', A: 50, fullMark: 100 },
      { subject: '防守', A: 100, fullMark: 100 },
      { subject: '纪律', A: 100, fullMark: 100 },
    ]
  },
  { 
    term: '伪九号 (False 9)', 
    definition: '前锋不再固定在禁区内，而是回撤到中场接球，拉出对方中后卫，为后插上的队友创造空间。', 
    category: 'Position',
    icon: '9️⃣',
    visualEffect: 'false-9',
    complexity: 5,
    strategicFocus: ['位置漂移', '中场人数优势', '防线拉伸'],
    historicalContext: '虽然历史上早有雏形，但2009年瓜迪奥拉将梅西置于该位置彻底改变了现代足球。这种战术让对方传统中后卫陷入了“跟出去还是留守”的决策两难。',
    keyTraits: ['深度回撤', '边锋内切', '局部超编'],
    famousTeams: ['巴塞罗那 (2009-2012)', '罗马 (斯帕莱蒂时期)'],
    radarProfile: [
      { subject: '控控', A: 85, fullMark: 100 },
      { subject: '压迫', A: 80, fullMark: 100 },
      { subject: '速度', A: 70, fullMark: 100 },
      { subject: '创造力', A: 100, fullMark: 100 },
      { subject: '防守', A: 60, fullMark: 100 },
      { subject: '纪律', A: 80, fullMark: 100 },
    ]
  },
  { 
    term: '全攻全守 (Total Football)', 
    definition: '场上任何位置的球员都可以根据需要互换位置，保持阵型的有机统一。', 
    category: 'System',
    icon: '🌀',
    visualEffect: 'overlap',
    complexity: 5,
    strategicFocus: ['位置互换', '全员技术', '阵型弹性'],
    historicalContext: '由荷兰名帅米歇尔斯在1970年代发明，由克鲁伊夫在场上执行。它是现代足球战术的基石，强调足球的流动性和空间利用。',
    keyTraits: ['全员进攻', '造越位陷阱', '高机动性'],
    famousTeams: ['荷兰国家队 (1974)', '阿贾克斯 (1970-1973)'],
    radarProfile: [
      { subject: '控球', A: 90, fullMark: 100 },
      { subject: '压迫', A: 95, fullMark: 100 },
      { subject: '速度', A: 80, fullMark: 100 },
      { subject: '创造力', A: 100, fullMark: 100 },
      { subject: '防守', A: 85, fullMark: 100 },
      { subject: '纪律', A: 90, fullMark: 100 },
    ]
  }
];

export const GLOSSARY_CATEGORIES = ['All', 'System', 'Position', 'Action', 'Phase'];

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'legendary-comebacks',
    title: '经典战役深度解码',
    description: '从伊斯坦布尔到诺坎普，拆解改变足球历史的战术转折点。',
    level: 'Advanced',
    icon: '🌟',
    modules: [
      { id: 'l1', title: '绝地反击的战术驱动', description: '学习落后时的变阵逻辑与高压心理。', type: 'Theory' },
      { id: 'l2', title: '实战复盘：2005 决赛', description: '拆解贝尼特斯的中场绞杀阵。', type: 'Simulation', relatedBattleId: 'istanbul-2005' }
    ]
  }
];
