
import React from 'react';
import { InfoIcon, TrophyIcon, CoachIcon } from './icons';

export const ProjectMission: React.FC = () => {
  const techStack = [
    {
      category: '前端工程架构 / FRONTEND',
      techs: ['React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      icon: '⚛️',
      desc: '利用 React 19 的并发特性与 Server Components 理念优化感知性能，配合强类型 TypeScript 确保战术元数据的严谨性。'
    },
    {
      category: '可视化渲染引擎 / VISUALS',
      techs: ['SVG Pattern', 'Recharts API', 'Matrix Transform'],
      icon: '🎨',
      desc: '基于声明式 SVG 绘图，通过矩阵变换与贝塞尔曲线插值算法，将抽象的战术坐标转化为流畅的 60FPS 视觉仿真。'
    },
    {
      category: '后端逻辑与持久化 / BACKEND',
      techs: ['Mock API', 'CRUD Logic', 'Storage Engine'],
      icon: '💾',
      desc: '构建了模拟 RESTful 架构的后端层，实现用户档案创建、战术快照读取、进度动态更新及日志清理的完整 CRUD 闭环。'
    },
    {
      category: 'AI 语义解码引擎 / AI CORE',
      techs: ['Google Gemini 3', 'Prompt Engine', 'Context Mapping'],
      icon: '🧠',
      desc: '集成 Google Gemini 系列大模型，通过结构化提示词工程，将 22 人的瞬时位置数据解码为专家级的战术分析意见。'
    }
  ];

  const businessLogic = [
    { op: 'CREATE', detail: '支持用户在沙盒模式下创建自定义战术阵型，并持久化存储至模拟数据库。' },
    { op: 'READ', detail: '实时检索并同步用户历史复盘记录，通过 ID 索引快速加载战役快照。' },
    { op: 'UPDATE', detail: '基于 PATCH 协议更新用户成长值与学习路径进度，实现动态的经验累积。' },
    { op: 'DELETE', detail: '提供冗余战术缓存与过期日志的清理机制，确保客户端状态与数据源强一致性。' }
  ];

  return (
    <div className="flex flex-col gap-20 animate-fade-in max-w-6xl mx-auto py-16 pb-40 items-center">
      
      {/* Centered Hero Section */}
      <div className="w-full flex flex-col items-center text-center space-y-10 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="shrink-0 p-8 bg-blue-600/10 border border-blue-500/20 rounded-full backdrop-blur-xl shadow-[0_0_50px_rgba(59,130,246,0.2)] animate-pulse">
           <TrophyIcon className="w-16 h-16 text-blue-500" />
        </div>

        <div className="space-y-6 max-w-4xl px-4">
          <div className="flex items-center justify-center gap-3">
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-blue-500"></span>
            <span className="text-blue-400 font-black text-xs uppercase tracking-[0.8em]">Technical Blueprint</span>
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-blue-500"></span>
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">全栈战术可视化方案</h2>
          <p className="text-xl md:text-2xl text-gray-400 font-medium leading-relaxed italic max-w-2xl mx-auto opacity-80">
            “本项旨在通过现代 Web 技术栈，将足球战术的非线性逻辑转化为可交互的数字化体验，实现从视觉复盘到逻辑推理的完整闭环。”
          </p>
        </div>
      </div>

      {/* Tech Grid - Balanced Centered */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        {techStack.map((stack, i) => (
          <div key={i} className="bg-white/[0.02] border border-white/5 rounded-[3.5rem] p-12 hover:border-blue-500/30 hover:bg-white/[0.04] transition-all group flex flex-col items-center text-center relative overflow-hidden shadow-2xl">
            <div className="absolute -top-10 -right-10 text-9xl font-black text-white/[0.02] italic tracking-tighter pointer-events-none group-hover:scale-110 transition-transform duration-1000">
              {i + 1}
            </div>
            <div className="text-6xl mb-8 group-hover:scale-110 transition-transform duration-500">
              {stack.icon}
            </div>
            <h4 className="text-xs text-blue-500 font-black uppercase tracking-[0.4em] mb-4">{stack.category}</h4>
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
               {stack.techs.map(t => (
                 <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-gray-400">{t}</span>
               ))}
            </div>
            <p className="text-sm text-gray-500 leading-relaxed font-medium max-w-sm">
              {stack.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Data Operations - CRUD Focus */}
      <div className="w-full bg-[#0a0f14] border border-white/5 rounded-[4rem] p-16 flex flex-col items-center gap-12 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:30px_30px]"></div>
        <div className="text-center relative z-10">
          <p className="text-[11px] text-blue-500 font-black uppercase tracking-[0.6em] mb-3">后端业务闭环 / DATA OPERATIONS</p>
          <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mb-10 shadow-[0_0_10px_rgba(59,130,246,1)]"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-5xl">
            {businessLogic.map((item, idx) => (
              <div key={idx} className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl flex flex-col gap-3 group hover:border-blue-500/20 transition-all">
                <div className="flex items-center gap-4">
                  <span className="text-lg font-black text-blue-600 opacity-40 group-hover:opacity-100 transition-opacity">[{item.op}]</span>
                  <h5 className="text-sm font-black text-white uppercase tracking-widest">核心逻辑描述</h5>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed pl-16">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Future Section */}
      <div className="w-full flex flex-col items-center text-center space-y-8 px-4">
        <div className="p-6 bg-blue-600/5 border border-blue-500/20 rounded-3xl max-w-3xl">
          <div className="flex items-center justify-center gap-4 mb-4">
            <InfoIcon className="w-5 h-5 text-blue-500" />
            <span className="text-[11px] font-black text-white uppercase tracking-[0.4em]">演进与路线 / ROADMAP</span>
          </div>
          <p className="text-2xl text-gray-200 font-medium italic leading-snug">
            “ 我们正在攻克基于 <span className="text-blue-500 font-black">Native Audio</span> 的实时战术对话系统，
            未来将实现通过语音交互动态重构 <span className="text-white font-black">战术快照</span> 的全栈交互体验。”
          </p>
        </div>
        
        <div className="flex gap-4">
          <div className="px-6 py-2 rounded-full border border-white/10 text-[10px] text-gray-600 font-black uppercase tracking-widest">Graduation Project v2.1</div>
          <div className="px-6 py-2 rounded-full bg-blue-600 text-[10px] text-white font-black uppercase tracking-widest shadow-lg shadow-blue-600/20">Certified Academic Solution</div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="pt-20 border-t border-white/5 w-full flex flex-col items-center opacity-30">
        <div className="text-[11px] font-black text-gray-400 uppercase tracking-[1.5em] mb-4">Tactical Lab Protocol</div>
        <p className="text-[9px] text-gray-600 font-bold">ALL RIGHTS RESERVED • BASED ON GEMINI INTELLIGENCE UNIT</p>
      </div>

    </div>
  );
};
