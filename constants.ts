
import type { Battle, GlossaryTerm, PlayerPosition, LearningPath } from './types';

// 通用球员生成器
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

const RM_2012_NAMES = ['卡西', '阿韦洛亚', '佩佩', '拉莫斯', '科恩特朗', '赫迪拉', '阿隆索', '迪马利亚', '厄齐尔', 'C罗', '本泽马'];
const BARSA_2011_NAMES = ['巴尔德斯', '阿尔维斯', '皮克', '马斯切拉诺', '阿比达尔', '布斯克茨', '哈维', '伊涅斯塔', '佩德罗', '梅西', '比利亚'];
const MU_2011_NAMES = ['范德萨', '法比奥', '费迪南德', '维迪奇', '埃弗拉', '瓦伦西亚', '卡里克', '吉格斯', '朴智星', '鲁尼', '埃尔南德斯'];
const INTER_2010_NAMES = ['塞萨尔', '麦孔', '卢西奥', '萨穆埃尔', '齐沃', '萨内蒂', '坎比亚索', '斯内德', '潘德夫', '埃托奥', '米利托'];
const MILAN_2005_NAMES = ['迪达', '卡福', '内斯塔', '斯塔姆', '马尔蒂尼', '皮尔洛', '加图索', '西多夫', '卡卡', '克雷斯波', '舍甫琴科'];
const LIV_2005_NAMES = ['杜德克', '芬南', '卡拉格', '海皮亚', '特拉奥雷', '阿隆索', '哈曼', '里瑟', '杰拉德', '加西亚', '巴罗什'];

export const BATTLES: Battle[] = [
  {
    id: 'barcelona-2011',
    title: '2011 欧冠决赛：巴萨 3-1 曼联',
    subtitle: '温布利的杰作：传控足球的终极形态',
    description: '巴萨通过极致的控球与空间重构，让曼联防线完全陷入被动。这是克鲁英夫哲学在瓜迪奥拉时代的最高体现。',
    score: { home: 3, away: 1 },
    teams: {
      home: { 
        name: '巴塞罗那', color: '#a50044', coach: '瓜迪奥拉', formation: '4-3-3', 
        philosophy: '利用伪九号梅西回撤制造中场超载，两侧拉开宽度提供深度。'
      },
      away: { name: '曼彻斯特联', color: '#da291c', coach: '弗格森', formation: '4-4-1-1' }
    },
    events: [
      { id: 'be1', type: 'Goal', minute: '27:00', phaseId: 'ba1', label: '佩德罗反插破门' },
      { id: 'be2', type: 'Goal', minute: '54:00', phaseId: 'ba2', label: '梅西远程发炮' },
    ],
    phases: [
      {
        id: 'ba1', title: '哈维的视界：空间切割', matchMinute: "27:10", matchContext: "1 - 0",
        description: '哈维在右肋部持球，成功吸引了埃弗拉的内切。佩德罗利用曼联左路空档，瞬间插向防线盲区。',
        ...generateFullSquad(
          [{x:5,y:50},{x:35,y:85},{x:25,y:60},{x:25,y:40},{x:35,y:15},{x:45,y:50},{x:52,y:70},{x:52,y:30},{x:75,y:85},{x:68,y:50},{x:75,y:15}],
          [{x:95,y:50},{x:78,y:88},{x:82,y:58},{x:82,y:42},{x:78,y:12},{x:65,y:75},{x:65,y:40},{x:58,y:60},{x:58,y:30},{x:50,y:50},{x:45,y:50}],
          BARSA_2011_NAMES, MU_2011_NAMES, [1,2,3,14,22,16,6,8,17,10,7], []
        ),
        connections: [{ from: 'h6', to: 'h8', weight: 10, successRate: 100 }],
        annotations: [{ type: 'arrow', points: [{x:75,y:85},{x:88,y:75}], label: '佩德罗插后身', color: '#ffcc00' }]
      },
      {
        id: 'ba2', title: '梅西走廊：致命推射', matchMinute: "53:45", matchContext: "2 - 1",
        description: '梅西在中场突然加速，曼联双后腰防线由于巴萨边路的拉扯变得极为松散，梅西在禁区顶获得空档。',
        ...generateFullSquad(
          [{x:8,y:50},{x:40,y:80},{x:30,y:60},{x:30,y:40},{x:40,y:20},{x:50,y:50},{x:55,y:65},{x:55,y:35},{x:70,y:75},{x:62,y:50},{x:70,y:25}],
          [{x:92,y:50},{x:75,y:85},{x:80,y:55},{x:80,y:45},{x:75,y:15},{x:65,y:65},{x:65,y:35},{x:60,y:55},{x:60,y:45},{x:55,y:50},{x:52,y:50}],
          BARSA_2011_NAMES, MU_2011_NAMES, [1,2,3,14,22,16,6,8,17,10,7], []
        ),
        connections: [{ from: 'h7', to: 'h9', weight: 8, successRate: 100 }],
        annotations: [{ type: 'focus', points: [{x:62,y:50}], label: '梅西拿球瞬间' }]
      }
    ],
    stats: {
      possession: { home: 68, away: 32 },
      shots: { home: 19, away: 4, onTargetHome: 12, onTargetAway: 1 },
      passes: { home: 772, away: 301, accuracyHome: 90, accuracyAway: 72 }
    },
    radarData: [
      { subject: '传控统治', A: 100, B: 35, fullMark: 100 },
      { subject: '高位逼抢', A: 95, B: 60, fullMark: 100 },
      { subject: '转换效率', A: 85, B: 90, fullMark: 100 },
      { subject: '阵型紧凑', A: 92, B: 80, fullMark: 100 },
      { subject: '进攻广度', A: 98, B: 50, fullMark: 100 },
    ]
  },
  {
    id: 'milan-2005',
    title: '2005 欧冠决赛：AC米兰 3-3 利物浦',
    subtitle: '伊斯坦布尔：4-3-1-2 钻石中场的极致与崩溃',
    description: '安切洛蒂的米兰上半场通过卡卡的衔接完全统治了中场。这是经典菱形中场对抗双后腰体系的教科书案例。',
    score: { home: 3, away: 3 },
    teams: {
      home: { 
        name: 'AC米兰', color: '#ff0000', coach: '安切洛蒂', formation: '4-3-1-2', 
        philosophy: '菱形中场通过皮尔洛调度，卡卡在空档处接球加速突刺。'
      },
      away: { name: '利物浦', color: '#da291c', coach: '贝尼特斯', formation: '4-4-1-1' }
    },
    events: [
      { id: 'me1', type: 'Goal', minute: '01:00', phaseId: 'mi1', label: '马尔蒂尼闪击' },
      { id: 'me2', type: 'Transition', minute: '38:00', phaseId: 'mi2', label: '卡卡半场长传' },
    ],
    phases: [
      {
        id: 'mi1', title: '钻石中场：卡卡的核心地位', matchMinute: "38:45", matchContext: "3 - 0",
        description: '卡卡在中路获得大片空间。利物浦的双后腰阿隆索与杰拉德难以覆盖侧翼，卡卡接球后瞬间转身发动反击。',
        ...generateFullSquad(
          [{x:5,y:50},{x:25,y:85},{x:15,y:60},{x:15,y:40},{x:25,y:15},{x:35,y:50},{x:45,y:70},{x:45,y:30},{x:55,y:50},{x:75,y:60},{x:75,y:40}],
          [{x:95,y:50},{x:65,y:88},{x:75,y:60},{x:75,y:40},{x:65,y:12},{x:55,y:70},{x:55,y:30},{x:48,y:60},{x:48,y:40},{x:45,y:50},{x:42,y:50}],
          MILAN_2005_NAMES, LIV_2005_NAMES, [1,2,13,31,3,21,8,10,22,11,7], []
        ),
        connections: [{ from: 'h5', to: 'h8', weight: 9, successRate: 100 }],
        annotations: [{ type: 'area', points: [{x:45,y:30},{x:65,y:30},{x:65,y:70},{x:45,y:70}], label: '卡卡自由区', color: 'rgba(239, 68, 68, 0.1)' }]
      },
      {
        id: 'mi2', title: '致命弧线：克雷斯波单刀', matchMinute: "43:20", matchContext: "3 - 0",
        description: '卡卡接球后送出贯穿半场的手术刀传球，克雷斯波利用速度和跑位晃过门将，米兰上半场梦幻领先。',
        ...generateFullSquad(
          [{x:10,y:50},{x:35,y:85},{x:25,y:60},{x:25,y:40},{x:35,y:15},{x:45,y:50},{x:55,y:65},{x:55,y:35},{x:65,y:50},{x:85,y:55},{x:82,y:45}],
          [{x:92,y:50},{x:68,y:90},{x:75,y:65},{x:75,y:35},{x:68,y:10},{x:58,y:75},{x:58,y:25},{x:52,y:65},{x:52,y:35},{x:48,y:50},{x:45,y:50}],
          MILAN_2005_NAMES, LIV_2005_NAMES, [1,2,13,31,3,21,8,10,22,11,7], []
        ),
        connections: [{ from: 'h8', to: 'h9', weight: 10, successRate: 100 }],
        annotations: [{ type: 'arrow', points: [{x:65,y:50},{x:85,y:55}], label: '致命直传', color: '#ffcc00' }]
      }
    ],
    stats: {
      possession: { home: 55, away: 45 },
      shots: { home: 16, away: 11, onTargetHome: 8, onTargetAway: 6 },
      passes: { home: 540, away: 420, accuracyHome: 85, accuracyAway: 80 }
    },
    radarData: [
      { subject: '中场控制', A: 95, B: 70, fullMark: 100 },
      { subject: '反击致命', A: 90, B: 95, fullMark: 100 },
      { subject: '体能储备', A: 75, B: 100, fullMark: 100 },
      { subject: '经验值', A: 100, B: 80, fullMark: 100 },
      { subject: '意志力', A: 60, B: 100, fullMark: 100 },
    ]
  },
  {
    id: 'real-madrid-2012',
    title: '2012 西甲：皇马 2-1 巴萨',
    subtitle: '诺坎普的 Calma：穆氏反击的极致',
    description: '皇马通过低位压缩阵型锁定梅西，利用垂直打击瞬间撕裂巴萨的高位防线。',
    score: { home: 2, away: 1 },
    teams: {
      home: { 
        name: '皇家马德里', color: '#ffffff', coach: '穆里尼奥', formation: '4-2-3-1', 
        philosophy: '压缩纵深，发挥厄齐尔的枢纽作用与C罗的极限冲刺。'
      },
      away: { name: '巴塞罗那', color: '#a50044', coach: '瓜迪奥拉', formation: '4-3-3' }
    },
    events: [
      { id: 're1', type: 'Interception', minute: '72:30', phaseId: 'rm1', label: '中场断球启动' },
      { id: 're2', type: 'Goal', minute: '73:00', phaseId: 'rm3', label: 'C罗冷静终结' },
    ],
    phases: [
      {
        id: 'rm1', title: '深度防守块', matchMinute: "72:00", matchContext: "1 - 1",
        description: '皇马四名后卫与两名后腰保持极其紧凑的间距，梅西被迫回撤到中圈接球。这是反击的温床。',
        ...generateFullSquad(
          [{x:5,y:50},{x:20,y:85},{x:15,y:60},{x:15,y:40},{x:20,y:15},{x:30,y:55},{x:30,y:45},{x:45,y:85},{x:42,y:50},{x:45,y:15},{x:52,y:50}],
          [{x:95,y:50},{x:58,y:92},{x:70,y:62},{x:70,y:38},{x:58,y:8},{x:62,y:50},{x:52,y:68},{x:52,y:32},{x:45,y:75},{x:45,y:50},{x:45,y:25}],
          RM_2012_NAMES, BARSA_2011_NAMES, [1,17,3,4,5,6,14,22,10,7,9], []
        ),
        connections: [],
        annotations: [{ type: 'area', points: [{x:10,y:30},{x:35,y:30},{x:35,y:70},{x:10,y:70}], label: '皇马锁死区', color: 'rgba(59, 130, 246, 0.15)' }]
      },
      {
        id: 'rm2', title: '转换：垂直打击', matchMinute: "72:45", matchContext: "1 - 1",
        description: '赫迪拉断球后第一时间交给厄齐尔，皇马全员瞬间由守转攻。C罗在弱侧开始高速前插。',
        ...generateFullSquad(
          [{x:15,y:50},{x:45,y:88},{x:35,y:65},{x:35,y:35},{x:45,y:12},{x:50,y:55},{x:48,y:40},{x:62,y:80},{x:60,y:50},{x:70,y:15},{x:65,y:35}],
          [{x:92,y:50},{x:70,y:85},{x:75,y:60},{x:75,y:40},{x:70,y:15},{x:60,y:70},{x:60,y:30},{x:55,y:60},{x:55,y:40},{x:40,y:55},{x:38,y:45}],
          RM_2012_NAMES, BARSA_2011_NAMES, [1,17,3,4,5,6,14,22,10,7,9], []
        ),
        connections: [{ from: 'h5', to: 'h8', weight: 8, successRate: 100 }],
        annotations: [{ type: 'arrow', points: [{x:70,y:15},{x:88,y:35}], label: 'C罗极限冲刺', color: '#ffcc00' }]
      },
      {
        id: 'rm3', title: '终结：Calma', matchMinute: "73:10", matchContext: "2 - 1",
        description: '厄齐尔送出精准斜长传，C罗领球晃过巴尔德斯推射空门。诺坎普瞬间安静。',
        ...generateFullSquad(
          [{x:20,y:50},{x:55,y:85},{x:45,y:60},{x:45,y:40},{x:55,y:15},{x:60,y:55},{x:58,y:45},{x:75,y:75},{x:70,y:50},{x:90,y:40},{x:78,y:45}],
          [{x:96,y:50},{x:78,y:80},{x:85,y:55},{x:85,y:45},{x:78,y:20},{x:72,y:65},{x:72,y:35},{x:68,y:55},{x:68,y:45},{x:65,y:52},{x:62,y:48}],
          RM_2012_NAMES, BARSA_2011_NAMES, [1,17,3,4,5,6,14,22,10,7,9], []
        ),
        connections: [{ from: 'h8', to: 'h9', weight: 10, successRate: 100 }],
        annotations: [{ type: 'focus', points: [{x:90,y:40}], label: '关键终结' }]
      }
    ],
    stats: {
      possession: { home: 28, away: 72 },
      shots: { home: 14, away: 11, onTargetHome: 6, onTargetAway: 3 },
      passes: { home: 280, away: 790, accuracyHome: 68, accuracyAway: 91 }
    },
    radarData: [
      { subject: '反击速度', A: 100, B: 40, fullMark: 100 },
      { subject: '防守紧凑', A: 95, B: 75, fullMark: 100 },
      { subject: '控球效率', A: 40, B: 98, fullMark: 100 },
      { subject: '身体负荷', A: 92, B: 88, fullMark: 100 },
      { subject: '战术执行', A: 100, B: 85, fullMark: 100 },
    ]
  },
  {
    id: 'inter-2010',
    title: '2010 欧冠：国米 3-1 巴萨',
    subtitle: '梅阿查的枷锁：身体对抗与区域标记',
    description: '穆里尼奥利用萨内蒂与坎比亚索的钢铁后腰组合，切断了巴萨中场与梅西的物理连接。',
    score: { home: 3, away: 1 },
    teams: {
      home: { 
        name: '国际米兰', color: '#0066b2', coach: '穆里尼奥', formation: '4-2-3-1', 
        philosophy: '全员深度退守，多人交替合围核心，寻找侧翼超车空档。'
      },
      away: { name: '巴塞罗那', color: '#a50044', coach: '瓜迪奥拉', formation: '4-3-3' }
    },
    events: [
      { id: 'ie1', type: 'Goal', minute: '30:00', phaseId: 'in2', label: '斯内德扳平' },
      { id: 'ie2', type: 'Goal', minute: '48:00', phaseId: 'in3', label: '麦孔反超' },
    ],
    phases: [
      {
        id: 'in1', title: '区域绞杀', matchMinute: "25:00", matchContext: "0 - 1",
        description: '国米在防守时构建了一个移动的“死亡三角”，任何进入该区域的球员都会面临两到三人的包夹。',
        ...generateFullSquad(
          [{x:5,y:50},{x:15,y:85},{x:12,y:60},{x:12,y:40},{x:15,y:15},{x:30,y:60},{x:30,y:40},{x:50,y:50},{x:45,y:85},{x:45,y:15},{x:55,y:50}],
          [{x:95,y:50},{x:60,y:90},{x:75,y:65},{x:75,y:35},{x:60,y:10},{x:65,y:50},{x:55,y:65},{x:55,y:35},{x:48,y:80},{x:48,y:50},{x:48,y:20}],
          INTER_2010_NAMES, BARSA_2011_NAMES, [1,2,6,25,26,4,19,10,27,9,22], []
        ),
        connections: [],
        annotations: [{ type: 'area', points: [{x:25,y:25},{x:45,y:25},{x:45,y:75},{x:25,y:75}], label: '死亡绞杀区', color: 'rgba(239, 68, 68, 0.2)' }]
      },
      {
        id: 'in2', title: '转换：斯内德的核心作用', matchMinute: "30:00", matchContext: "1 - 1",
        description: '米利托在禁区内扛住皮克，将球回做给后插上的斯内德。国米的身体优势体现得淋漓尽致。',
        ...generateFullSquad(
          [{x:10,y:50},{x:40,y:85},{x:30,y:60},{x:30,y:40},{x:40,y:15},{x:55,y:62},{x:55,y:38},{x:70,y:50},{x:75,y:80},{x:75,y:20},{x:85,y:50}],
          [{x:94,y:50},{x:78,y:88},{x:82,y:58},{x:82,y:42},{x:78,y:12},{x:68,y:65},{x:68,y:35},{x:62,y:58},{x:62,y:42},{x:55,y:50},{x:52,y:50}],
          INTER_2010_NAMES, BARSA_2011_NAMES, [1,2,6,25,26,4,19,10,27,9,22], []
        ),
        connections: [{ from: 'h10', to: 'h7', weight: 9, successRate: 100 }],
        annotations: [{ type: 'focus', points: [{x:70,y:50}], label: '斯内德接球' }]
      },
      {
        id: 'in3', title: '致命套边：麦孔超车', matchMinute: "48:15", matchContext: "2 - 1",
        description: '麦孔在右路突然发动助攻，利用巴萨阿比达尔压上后的空档。这是一个经典的内切边卫转侧翼突击。',
        ...generateFullSquad(
          [{x:15,y:50},{x:75,y:88},{x:45,y:65},{x:45,y:35},{x:50,y:15},{x:60,y:60},{x:60,y:40},{x:72,y:55},{x:82,y:75},{x:80,y:25},{x:88,y:50}],
          [{x:94,y:50},{x:82,y:90},{x:88,y:60},{x:88,y:40},{x:82,y:10},{x:72,y:70},{x:72,y:30},{x:65,y:60},{x:65,y:40},{x:58,y:55},{x:55,y:45}],
          INTER_2010_NAMES, BARSA_2011_NAMES, [1,2,6,25,26,4,19,10,27,9,22], []
        ),
        connections: [{ from: 'h10', to: 'h1', weight: 10, successRate: 100 }],
        annotations: [{ type: 'arrow', points: [{x:60,y:80},{x:90,y:85}], label: '麦孔疯狂超车', color: '#3b82f6' }]
      }
    ],
    stats: {
      possession: { home: 30, away: 70 },
      shots: { home: 10, away: 9, onTargetHome: 5, onTargetAway: 4 },
      passes: { home: 310, away: 680, accuracyHome: 72, accuracyAway: 89 }
    },
    radarData: [
      { subject: '对抗强度', A: 100, B: 65, fullMark: 100 },
      { subject: '防守韧性', A: 100, B: 50, fullMark: 100 },
      { subject: '转换打击', A: 95, B: 60, fullMark: 100 },
      { subject: '战术纪律', A: 100, B: 80, fullMark: 100 },
      { subject: '意志力', A: 100, B: 90, fullMark: 100 },
    ]
  }
];

export const GLOSSARY: GlossaryTerm[] = [
  {
    term: 'Tiki-taka (传控足球)',
    definition: '极短距离传球、频繁跑位和绝对球权控制。通过三角传递重构防线。',
    category: 'System',
    icon: '⚽',
    visualEffect: 'tiki-taka',
    complexity: 4,
    strategicFocus: ['球权控制', '空间重构', '第三人跑位'],
    historicalContext: '由克鲁英夫奠基，瓜迪奥拉时期在巴萨达到巅峰。',
    keyTraits: ['短距离快速传递', '寻找第三人', '高位夺回球权'],
    radarProfile: [
      { subject: '控球率', A: 98, fullMark: 100 },
      { subject: '精度', A: 92, fullMark: 100 },
      { subject: '压迫', A: 85, fullMark: 100 },
      { subject: '对抗', A: 45, fullMark: 100 },
      { subject: '爆发', A: 60, fullMark: 100 }
    ],
    famousTeams: ['巴塞罗那 (2008-2012)', '西班牙国家队 (2008-2012)'],
    relatedBattleId: 'barcelona-2011'
  },
  {
    term: 'Gegenpressing (反抢压迫)',
    definition: '丢球瞬时集体压迫。利用对手阵型切换混乱期夺回球权。',
    category: 'Emerging',
    icon: '⚡',
    visualEffect: 'counter-press',
    complexity: 5,
    strategicFocus: ['攻守转换', '高位逼抢', '垂直进攻'],
    historicalContext: '源自拉夫·朗尼克，由克洛普在多特蒙德和利物浦发扬光大。',
    keyTraits: ['5秒定律', '区域合围', '切断传球路径'],
    radarProfile: [
      { subject: '压迫', A: 100, fullMark: 100 },
      { subject: '体能', A: 98, fullMark: 100 },
      { subject: '垂直性', A: 90, fullMark: 100 },
      { subject: '控球率', A: 55, fullMark: 100 },
      { subject: '转换速度', A: 95, fullMark: 100 }
    ],
    famousTeams: ['利物浦 (2019-2020)', '多特蒙德 (2011-2013)']
  },
  {
    term: 'Vertical Tiki-Taka (垂直传控)',
    definition: '结合传控的节奏感与极高的纵向穿透力，强调快速寻找对方防线核心空档。',
    category: 'Emerging',
    icon: '🏹',
    visualEffect: 'vertical-counter',
    complexity: 5,
    strategicFocus: ['纵向渗透', '快速节奏转换', '高位逼抢'],
    historicalContext: '萨里在拿波里和切尔西时期完善，旨在保持控球的同时增加进攻效率。',
    keyTraits: ['高频纵向传球', '中场三角形突刺', '快速一脚传球'],
    radarProfile: [
      { subject: '纵向效率', A: 95, fullMark: 100 },
      { subject: '传球速度', A: 90, fullMark: 100 },
      { subject: '控球', A: 80, fullMark: 100 },
      { subject: '创造力', A: 95, fullMark: 100 },
      { subject: '纪律性', A: 85, fullMark: 100 }
    ],
    famousTeams: ['萨里拿波里 (2015-2018)', '布莱顿 (2022-2024)']
  },
  {
    term: 'Half-space (肋部空间)',
    definition: '位于球场边路与中路之间的走廊，是现代战术中进攻威胁最大的区域。',
    category: 'Phase',
    icon: '📐',
    visualEffect: 'half-space',
    complexity: 3,
    strategicFocus: ['空间利用', '传中角度', '接应盲区'],
    historicalContext: '由德国战术分析家提出，现已成为顶级教练布阵的基础。',
    keyTraits: ['边后卫助攻通道', '前腰拿球点', '防守死角'],
    radarProfile: [
      { subject: '创造力', A: 95, fullMark: 100 },
      { subject: '战术素养', A: 90, fullMark: 100 },
      { subject: '接球难度', A: 85, fullMark: 100 },
      { subject: '进球率', A: 80, fullMark: 100 },
      { subject: '防守覆盖', A: 60, fullMark: 100 }
    ]
  },
  {
    term: 'Inverted Fullback (内切边卫)',
    definition: '边后卫在控球时移入中场，增加中场人数并协助组织。',
    category: 'Position',
    icon: '↩️',
    visualEffect: 'overlap',
    complexity: 5,
    strategicFocus: ['中路超载', '防反击覆盖', '出球路线'],
    historicalContext: '瓜迪奥拉在拜仁时期对拉姆和阿拉巴的改造。',
    keyTraits: ['双重职能', '传球覆盖', '阵型紧凑性'],
    radarProfile: [
      { subject: '意识', A: 100, fullMark: 100 },
      { subject: '传球', A: 95, fullMark: 100 },
      { subject: '灵活', A: 85, fullMark: 100 },
      { subject: '防守', A: 88, fullMark: 100 },
      { subject: '爆发', A: 70, fullMark: 100 }
    ]
  },
  {
    term: 'False 9 (伪九号)',
    definition: '前锋回撤至中场接球，吸引对手中卫拉出防线。',
    category: 'Position',
    icon: '🔄',
    visualEffect: 'false-9',
    complexity: 5,
    strategicFocus: ['拉扯防线', '中路组织', '边锋内切'],
    historicalContext: '从1930年代匈牙利队到现代梅西的华丽演绎。',
    radarProfile: [
      { subject: '视野', A: 98, fullMark: 100 },
      { subject: '创造力', A: 100, fullMark: 100 },
      { subject: '进球', A: 95, fullMark: 100 },
      { subject: '对抗', A: 40, fullMark: 100 },
      { subject: '策应', A: 92, fullMark: 100 }
    ],
    relatedBattleId: 'barcelona-2011'
  },
  {
    term: 'Anchor Man (中场锚点)',
    definition: '深处中场的防守屏障，负责横向扫荡并作为出球第一落点。',
    category: 'Position',
    icon: '⚓',
    complexity: 2,
    strategicFocus: ['拦截', '平衡', '传球稳定性'],
    radarProfile: [
      { subject: '拦截', A: 95, fullMark: 100 },
      { subject: '位置感', A: 100, fullMark: 100 },
      { subject: '短传', A: 90, fullMark: 100 },
      { subject: '进攻', A: 30, fullMark: 100 },
      { subject: '耐力', A: 95, fullMark: 100 }
    ]
  },
  {
    term: 'Catenaccio (十字联防)',
    definition: '极致的链式防守体系，强调自由人补位。',
    category: 'System',
    icon: '🔒',
    visualEffect: 'catenaccio',
    complexity: 3,
    historicalContext: '1960年代意大利足球的代名词。',
    radarProfile: [
      { subject: '纪律性', A: 100, fullMark: 100 },
      { subject: '弹性', A: 95, fullMark: 100 },
      { subject: '进球率', A: 20, fullMark: 100 },
      { subject: '对抗', A: 90, fullMark: 100 },
      { subject: '耐心', A: 100, fullMark: 100 }
    ],
    relatedBattleId: 'inter-2010'
  }
];

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'lp-foundation',
    title: '战术素养：空间解构基础',
    description: '学习如何像职业分析师一样观察球场，掌握基本空间走廊划分。',
    level: 'Beginner',
    icon: '🌱',
    modules: [
      { id: 'm1-1', title: '球场五走廊模型', type: 'Theory', description: '理解肋部空间（Half-space）的战略价值及中路、边路的分布。', relatedKnowledgeId: 'Half-space (肋部空间)' },
      { id: 'm1-2', title: '阵型演化史：从WM到现代', type: 'Theory', description: '从传统的4-4-2到现代的2-3-5控球变阵，理解位置职能的演变。' },
      { id: 'm1-3', title: '基础：深度防守逻辑', type: 'Simulation', description: '复盘皇马与国米的防守阵列，理解如何压缩纵深。', relatedBattleId: 'real-madrid-2012' }
    ]
  },
  {
    id: 'lp-advanced',
    title: '名帅哲学：战术基因解码',
    description: '深入解构传控与逼抢两大流派，通过实战模拟掌握攻守转换法则。',
    level: 'Intermediate',
    icon: '🧠',
    modules: [
      { id: 'm2-1', title: 'Tiki-taka 逻辑实操', type: 'Simulation', description: '在沙盒中模拟 15 次传递后的致命直塞。', relatedKnowledgeId: 'Tiki-taka (传控足球)', relatedBattleId: 'barcelona-2011' },
      { id: 'm2-2', title: '反抢压迫（Gegenpressing）触发', type: 'Simulation', description: '识别压迫的最佳时机，学习弧线跑位封锁传球路径。', relatedKnowledgeId: 'Gegenpressing (反抢压迫)' },
      { id: 'm2-3', title: '“伪九号”的空间拉引力', type: 'Theory', description: '分析前锋回撤如何系统性摧毁对方中卫的决策逻辑。', relatedKnowledgeId: 'False 9 (伪九号)' }
    ]
  },
  {
    id: 'lp-tactician',
    title: '战术博弈：复杂体系对抗',
    description: '学习如何针对特定战术进行克制布阵，掌握中场博弈的核心指标。',
    level: 'Advanced',
    icon: '⚔️',
    modules: [
      { id: 'm3-1', title: '菱形中场的统治与崩溃', type: 'Simulation', description: '以2005年欧冠决赛为例，分析菱形中场的优势及在边路被拉扯时的风险。', relatedBattleId: 'milan-2005' },
      { id: 'm3-2', title: '现代边卫的内切革命', type: 'Theory', description: '掌握内切边卫如何改变出球路径并增强对反击的抵抗力。', relatedKnowledgeId: 'Inverted Fullback (内切边卫)' },
      { id: 'm3-3', title: '区域超载（Overload）实操', type: 'Simulation', description: '在强侧制造人数优势，并在弱侧寻找致命空档。' }
    ]
  },
  {
    id: 'lp-pro',
    title: '职业分析：GPS 数据与性能评价',
    description: '拉夫堡大学分析标准。学习如何利用性能数据评估战术执行效率。',
    level: 'Advanced',
    icon: '🔬',
    modules: [
      { id: 'm4-1', title: 'HSR（高强度跑动）与战术触发', type: 'Theory', description: '分析球员冲刺数据，识别战术执行中的“功能性疲劳”。' },
      { id: 'm4-2', title: '代谢功率与实时博弈负载', type: 'Theory', description: '学习如何通过实时代谢功率评估逼抢战术的可持续性。' },
      { id: 'm4-3', title: 'Sportscode 标签化实战', type: 'Simulation', description: '在经典战役中进行实时标签化（Coding）复盘。', relatedBattleId: 'real-madrid-2012' }
    ]
  }
];
