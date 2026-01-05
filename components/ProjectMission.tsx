
import React from 'react';
import { TrophyIcon, CoachIcon, PlayerIcon } from './icons';

export const ProjectMission: React.FC = () => {
  const frontendTech = [
    {
      label: 'UI & 渲染引擎',
      techs: ['React 19 (Concurrent)', 'Tailwind CSS 3.x', 'SVG Drawing'],
      desc: '采用 React 19 并发渲染模式，自研 SVG 声明式路径算法。即使在 22 人高频跑位与传导动画下，依然能维持 60FPS 的极致流畅度。'
    },
    {
      label: '工程化与类型',
      techs: ['TypeScript 5.x', 'Vite 5', 'ES6+ Modules'],
      desc: '全量 TypeScript 强类型约束，确保战术元数据的原子性。结合 Vite 实现毫秒级热更新，极大提升了战术推演系统的开发与调试效率。'
    },
    {
      label: '交互与可视化',
      techs: ['Framer Motion', 'Recharts', 'CSS Matrix Transform'],
      desc: '利用 Recharts 绘制球员 DNA 雷达图，并通过 Framer Motion 实现丝滑的弹窗与转场，利用矩阵变换精确控制战术板位移。'
    }
  ];

  const backendTech = [
    {
      label: '智能解析大脑',
      techs: ['Google Gemini 3 API', 'Semantic Parsing', 'LLM'],
      desc: '集成 Google 最新 Gemini 3 系列大模型，通过结构化 Prompt 工程对场上坐标流进行实时语义解码，将冷冰冰的数据转化为深刻的战术见解。'
    },
    {
      label: '数据持久化架构',
      techs: ['Mock API Service', 'LocalStorage', 'Session Management'],
      desc: '构建了模拟 RESTful 架构的后端服务，支持用户战术快照保存、学习进度追踪及本地账户体系，打造全栈闭环的离线交互体验。'
    },
    {
      label: '业务逻辑闭环',
      techs: ['CRUD Architecture', 'State Sync', 'Auth Logic'],
      desc: '实现了完整的“增删改查”业务逻辑：从战术沙盒的实时创建、战役日志读取、学习勋章同步到过时存档的物理清理。'
    }
  ];

  return (
    <div className="flex flex-col gap-12 animate-fade-in max-w-7xl mx-auto py-8 pb-48 items-center">
      
      {/* 缩小后的居中 Hero 区域 */}
      <div className="w-full flex flex-col items-center text-center space-y-6 relative px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="shrink-0 p-5 bg-blue-600/10 border border-blue-500/20 rounded-full backdrop-blur-xl shadow-[0_0_60px_rgba(59,130,246,0.15)] animate-pulse relative z-10">
           <TrophyIcon className="w-10 h-10 text-blue-500" />
        </div>

        <div className="space-y-4 max-w-5xl relative z-10">
          <div className="flex items-center justify-center gap-4">
            <span className="w-16 h-px bg-gradient-to-r from-transparent to-blue-500"></span>
            <span className="text-blue-400 font-black text-[10px] uppercase tracking-[0.8em] pl-[0.8em]">Project Specification</span>
            <span className="w-16 h-px bg-gradient-to-l from-transparent to-blue-500"></span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
            基于Web可视化技术<br/>
            <span className="text-blue-500">足球科普系统</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 font-medium leading-relaxed italic max-w-3xl mx-auto opacity-80">
            “ 面向球迷的专业战术研究平台，通过数字化手段解码绿茵博弈逻辑。”
          </p>

          {/* 缩小后的成员信息展示区 */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center pt-4">
            <div className="px-8 py-5 bg-white/[0.03] border border-white/10 rounded-[2rem] min-w-[260px] backdrop-blur-md group hover:border-blue-500/30 transition-all flex flex-col items-center">
                <p className="text-[9px] text-blue-500 font-black uppercase tracking-[0.2em] mb-2 opacity-60">项目负责人 / STUDENT</p>
                <p className="text-2xl font-black text-white">谢 坤</p>
                <p className="text-xs font-bold text-gray-500 mt-2 tracking-widest">学号：2240110307</p>
            </div>
            <div className="hidden md:block w-px h-10 bg-white/10"></div>
            <div className="px-8 py-5 bg-white/[0.03] border border-white/10 rounded-[2rem] min-w-[260px] backdrop-blur-md group hover:border-orange-500/30 transition-all flex flex-col items-center">
                <p className="text-[9px] text-orange-500 font-black uppercase tracking-[0.2em] mb-2 opacity-60">指导教师 / SUPERVISOR</p>
                <p className="text-2xl font-black text-white">周 书 臣</p>
                <div className="h-4"></div> {/* 占位以保持视觉平衡 */}
            </div>
          </div>
        </div>
      </div>

      {/* 前端技术架构 */}
      <div className="w-full flex flex-col items-center gap-10 px-6 mt-4">
        <div className="text-center">
            <h3 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.6em] mb-3">前端核心工程栈 / FRONTEND STACK</h3>
            <div className="w-24 h-1 bg-blue-600 rounded-full mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {frontendTech.map((tech, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-12 hover:border-blue-500/40 transition-all group flex flex-col items-center text-center relative overflow-hidden shadow-xl">
                    <div className="absolute top-6 right-8 text-4xl font-black text-white/[0.02] italic tracking-tighter select-none">F0{i+1}</div>
                    <h4 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">{tech.label}</h4>
                    <div className="flex flex-wrap gap-2 mb-8 justify-center">
                       {tech.techs.map(t => (
                         <span key={t} className="px-3 py-1 bg-blue-600/10 border border-blue-500/20 rounded-lg text-[10px] font-black text-blue-400 uppercase tracking-tight">{t}</span>
                       ))}
                    </div>
                    <p className="text-base text-gray-500 leading-relaxed font-medium">
                        {tech.desc}
                    </p>
                </div>
            ))}
        </div>
      </div>

      {/* 后端业务逻辑 */}
      <div className="w-full flex flex-col items-center gap-10 px-6 mt-4">
        <div className="text-center">
            <h3 className="text-[11px] font-black text-orange-500 uppercase tracking-[0.6em] mb-3">后端与逻辑架构 / BACKEND & LOGIC</h3>
            <div className="w-24 h-1 bg-orange-600 rounded-full mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {backendTech.map((tech, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-12 hover:border-orange-500/40 transition-all group flex flex-col items-center text-center relative overflow-hidden shadow-xl">
                    <div className="absolute top-6 right-8 text-4xl font-black text-white/[0.02] italic tracking-tighter select-none">B0{i+1}</div>
                    <h4 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">{tech.label}</h4>
                    <div className="flex flex-wrap gap-2 mb-8 justify-center">
                       {tech.techs.map(t => (
                         <span key={t} className="px-3 py-1 bg-orange-600/10 border border-orange-500/20 rounded-lg text-[10px] font-black text-orange-400 uppercase tracking-tight">{t}</span>
                       ))}
                    </div>
                    <p className="text-base text-gray-500 leading-relaxed font-medium">
                        {tech.desc}
                    </p>
                </div>
            ))}
        </div>
      </div>

      {/* 底部信息 */}
      <div className="w-full flex flex-col items-center gap-10 mt-12">
          <div className="flex flex-wrap justify-center gap-6">
            <div className="px-10 py-4 rounded-2xl border border-white/5 text-[10px] text-gray-600 font-black uppercase tracking-[0.2em] bg-white/[0.01]">Deployment v2.1.4-STABLE</div>
            <div className="px-10 py-4 rounded-2xl bg-blue-600/10 border border-blue-500/30 text-[10px] text-blue-400 font-black uppercase tracking-[0.2em]">Full-Stack Logic Certified</div>
          </div>
          
          <div className="pt-16 border-t border-white/5 w-full flex flex-col items-center opacity-30">
            <p className="text-[11px] font-black text-gray-600 uppercase tracking-[2em] mb-4 pl-[2em]">Tactical Lab Protocol</p>
            <p className="text-[10px] text-gray-700 font-bold uppercase tracking-[0.5em] mb-4 text-center">GRADUATION PROJECT • 2024-2025 SESSION</p>
          </div>
      </div>

    </div>
  );
};
