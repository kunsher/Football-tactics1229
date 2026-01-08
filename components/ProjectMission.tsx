
import React from 'react';
import { TrophyIcon, CoachIcon, PlayerIcon, InfoIcon } from './icons';

export const ProjectMission: React.FC = () => {
  const frontendTech = [
    {
      label: 'UI & 渲染引擎',
      techs: ['React 19', 'SVG Engine'],
      desc: '基于 React 19 并发模式与自研 SVG 算法，实现 22 人同屏 60FPS 的丝滑战术动画。'
    },
    {
      label: '可视化交互',
      techs: ['Recharts', 'Framer Motion'],
      desc: '利用 Recharts 构建战术 DNA 评估体系，结合 Framer Motion 实现深度交互反馈。'
    }
  ];

  const backendTech = [
    {
      label: '战术逻辑引擎',
      techs: ['Custom Logic', 'Data Stream'],
      desc: '自研战术逻辑处理模块，将瞬时球员坐标流转化为结构化的战术动态，实现自动化态势感知。'
    },
    {
      label: '持久化与存储',
      techs: ['Mock Service', 'Storage'],
      desc: '构建全栈闭环的离线交互体验，支持战术快照保存、学习进度追踪及本地账户体系记录。'
    }
  ];

  return (
    <div className="flex flex-col gap-10 animate-fade-in max-w-6xl mx-auto py-8 pb-32 items-center">
      
      {/* Hero Section */}
      <div className="w-full flex flex-col items-center text-center space-y-6 relative px-6">
        <div className="shrink-0 p-4 bg-blue-600/10 border border-blue-500/20 rounded-full shadow-xl animate-pulse">
           <TrophyIcon className="w-8 h-8 text-blue-500" />
        </div>

        <div className="space-y-4 max-w-4xl">
          <div className="flex items-center justify-center gap-4">
            <span className="text-blue-400 font-black text-[11px] uppercase tracking-[0.6em]">Graduation Thesis Project</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
            基于Web可视化技术的<br/>
            <span className="text-blue-500">足球科普系统</span>
          </h2>
          <p className="text-lg text-gray-400 font-medium leading-relaxed italic max-w-2xl mx-auto opacity-80">
            “ 面向球迷的战术平台：通过数字化手段解码绿茵博弈逻辑 ”
          </p>

          {/* 申报信息 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-10">
            <div className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl flex flex-col items-center">
                <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest mb-1 opacity-60">研究方向</p>
                <p className="text-lg font-black text-white">数据可视化</p>
            </div>
            <div className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl flex flex-col items-center">
                <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest mb-1 opacity-60">课题申报人</p>
                <p className="text-lg font-black text-white uppercase">谢 坤</p>
            </div>
            <div className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl flex flex-col items-center">
                <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest mb-1 opacity-60">论文类型</p>
                <p className="text-lg font-black text-white">工程设计</p>
            </div>
          </div>
        </div>
      </div>

      {/* 技术栈 */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 px-6">
        <div className="space-y-6">
            <h3 className="text-xl font-black text-white uppercase tracking-widest flex items-center gap-3">
                <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div> 前端架构
            </h3>
            {frontendTech.map((tech, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:border-blue-500/30 transition-all shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-black text-white uppercase">{tech.label}</h4>
                        <div className="flex gap-2">
                            {tech.techs.map(t => <span key={t} className="px-2.5 py-1 bg-blue-600/10 rounded text-[10px] font-black text-blue-400 border border-blue-500/20">{t}</span>)}
                        </div>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed font-medium">{tech.desc}</p>
                </div>
            ))}
        </div>

        <div className="space-y-6">
            <h3 className="text-xl font-black text-white uppercase tracking-widest flex items-center gap-3">
                <div className="w-1.5 h-6 bg-orange-500 rounded-full"></div> 数据处理
            </h3>
            {backendTech.map((tech, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:border-orange-500/30 transition-all shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-black text-white uppercase">{tech.label}</h4>
                        <div className="flex gap-2">
                            {tech.techs.map(t => <span key={t} className="px-2.5 py-1 bg-orange-600/10 rounded text-[10px] font-black text-orange-400 border border-orange-500/20">{t}</span>)}
                        </div>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed font-medium">{tech.desc}</p>
                </div>
            ))}
        </div>
      </div>

      <div className="w-full flex flex-col items-center gap-6 mt-24 opacity-30">
          <div className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-[10px] text-gray-500 font-black uppercase tracking-[0.4em]">
             数字化足球战术研究报告 • 2025 毕业设计
          </div>
          <div className="flex gap-6">
            <InfoIcon className="w-8 h-8" />
            <CoachIcon className="w-8 h-8" />
            <PlayerIcon className="w-8 h-8" />
          </div>
      </div>

    </div>
  );
};
