
import React from 'react';
import { TrophyIcon } from './icons';

export const ProjectMission: React.FC = () => {
  const frontendTech = [
    {
      label: 'UI & 渲染引擎',
      techs: ['React 19 (Beta)', 'Tailwind CSS', 'SVG API'],
      desc: '基于 React 19 并发架构，利用声明式 SVG 实现高性能战术板渲染，确保在 22 人高频坐标变换下依然保持 60FPS 极速交互。'
    },
    {
      label: '工程化与类型',
      techs: ['TypeScript 5.x', 'Vite', 'ES6+'],
      desc: '采用严谨的 TypeScript 5.x 类型系统构建战术元数据模型，结合 Vite 实现毫秒级的模块热更新与极致的生产构建体积。'
    },
    {
      label: '动画与可视化',
      techs: ['Framer Motion', 'Recharts', 'CSS3 Matrix'],
      desc: '深度集成 Recharts 数据图表库呈现球员 DNA 指纹，通过 Framer Motion 与 CSS 矩阵变换复刻顶级足球赛事的动态流转轨迹。'
    }
  ];

  const backendTech = [
    {
      label: '核心分析引擎',
      techs: ['Google Gemini 3 SDK', 'LLM Reasoning'],
      desc: '集成 Google Gemini 3 系列大模型作为战术大脑，通过结构化提示词工程实现对复杂比赛快照的自动化语义解码与深度复盘。'
    },
    {
      label: '数据持久化',
      techs: ['Mock API Service', 'LocalStorage', 'Session Storage'],
      desc: '构建了模拟 RESTful 架构的服务层，利用本地持久化引擎存储用户战术存档、学习进度及个性化配置，实现离线全栈体验。'
    },
    {
      label: '业务逻辑闭环',
      techs: ['CRUD Logic', 'Auth Management'],
      desc: '实现了完整的用户账户体系与数据全生命周期管理：从战术快照的创建、读取、动态进度更新到冗余数据的安全清理。'
    }
  ];

  return (
    <div className="flex flex-col gap-16 animate-fade-in max-w-7xl mx-auto py-12 pb-48 items-center">
      
      {/* 居中 Hero 区域 - 紧凑且清晰 */}
      <div className="w-full flex flex-col items-center text-center space-y-8 relative px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="shrink-0 p-6 bg-blue-600/10 border border-blue-500/20 rounded-full backdrop-blur-xl shadow-[0_0_50px_rgba(59,130,246,0.1)] animate-pulse relative z-10">
           <TrophyIcon className="w-12 h-12 text-blue-500" />
        </div>

        <div className="space-y-6 max-w-5xl relative z-10">
          <div className="flex items-center justify-center gap-4">
            <span className="w-16 h-px bg-gradient-to-r from-transparent to-blue-500"></span>
            <span className="text-blue-400 font-black text-xs uppercase tracking-[0.8em] pl-[0.8em]">Project Architecture</span>
            <span className="w-16 h-px bg-gradient-to-l from-transparent to-blue-500"></span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
            全栈技术规格书
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 font-medium leading-relaxed italic max-w-3xl mx-auto opacity-70">
            本平台整合了现代 Web 前端工程与 AI 决策逻辑，打造专业的战术推演生态。
          </p>
        </div>
      </div>

      {/* 前端技术架构 - 字体全面放大 */}
      <div className="w-full flex flex-col items-center gap-12 px-6">
        <div className="text-center">
            <h3 className="text-sm font-black text-blue-500 uppercase tracking-[0.6em] mb-4">前端开发栈 / FRONTEND CORE</h3>
            <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {frontendTech.map((tech, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-12 hover:border-blue-500/30 transition-all group flex flex-col items-center text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute top-6 right-8 text-5xl font-black text-white/[0.02] italic tracking-tighter select-none">F0{i+1}</div>
                    <h4 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">{tech.label}</h4>
                    <div className="flex flex-wrap gap-2 mb-8 justify-center">
                       {tech.techs.map(t => (
                         <span key={t} className="px-4 py-1 bg-blue-600/10 border border-blue-500/20 rounded-lg text-xs font-black text-blue-400 uppercase tracking-tight">{t}</span>
                       ))}
                    </div>
                    <p className="text-lg text-gray-400 leading-relaxed font-medium">
                        {tech.desc}
                    </p>
                </div>
            ))}
        </div>
      </div>

      {/* 后端业务逻辑 - 字体全面放大 */}
      <div className="w-full flex flex-col items-center gap-12 px-6">
        <div className="text-center">
            <h3 className="text-sm font-black text-orange-500 uppercase tracking-[0.6em] mb-4">后端与逻辑栈 / BACKEND & LOGIC</h3>
            <div className="w-20 h-1 bg-orange-600 rounded-full mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {backendTech.map((tech, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-12 hover:border-orange-500/30 transition-all group flex flex-col items-center text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute top-6 right-8 text-5xl font-black text-white/[0.02] italic tracking-tighter select-none">B0{i+1}</div>
                    <h4 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">{tech.label}</h4>
                    <div className="flex flex-wrap gap-2 mb-8 justify-center">
                       {tech.techs.map(t => (
                         <span key={t} className="px-4 py-1 bg-orange-600/10 border border-orange-500/20 rounded-lg text-xs font-black text-orange-400 uppercase tracking-tight">{t}</span>
                       ))}
                    </div>
                    <p className="text-lg text-gray-400 leading-relaxed font-medium">
                        {tech.desc}
                    </p>
                </div>
            ))}
        </div>
      </div>

      {/* 底部路线图 - 极简 */}
      <div className="w-full flex flex-col items-center gap-10 mt-12">
          <div className="flex flex-wrap justify-center gap-6">
            <div className="px-10 py-4 rounded-2xl border border-white/5 text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] bg-white/[0.01]">Deployment Protocol v2.1.0</div>
            <div className="px-10 py-4 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-[10px] text-blue-400 font-black uppercase tracking-[0.2em]">Full-Stack Logic Certified</div>
          </div>
          
          <div className="pt-20 border-t border-white/5 w-full flex flex-col items-center opacity-20">
            <p className="text-xs font-black text-gray-600 uppercase tracking-[2.5em] mb-4 pl-[2.5em]">Tactical Lab Protocol</p>
            <p className="text-[10px] text-gray-700 font-bold uppercase tracking-widest">Football Analysis Executive System</p>
          </div>
      </div>

    </div>
  );
};
