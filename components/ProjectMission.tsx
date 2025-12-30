
import React from 'react';
import { InfoIcon, TrophyIcon, CoachIcon } from './icons';

export const ProjectMission: React.FC = () => {
  const techStack = [
    {
      category: '前端核心 / CORE',
      techs: ['React 19 (Latest)', 'TypeScript', 'Tailwind CSS'],
      icon: '⚛️',
      desc: '基于 React 19 响应式架构，利用 TypeScript 确保战术数据模型的一致性与严谨性。'
    },
    {
      category: '可视化引擎 / ENGINE',
      techs: ['SVG 2D Canvas', 'Recharts API', 'CSS Keyframes'],
      icon: '📊',
      desc: '原生 SVG 渲染动态球场，结合 Recharts 实现战术 DNA 雷达图与多维数据拟合。'
    },
    {
      category: '人工智能 / AI INTEL',
      techs: ['Gemini 3 Flash', 'Generative AI SDK'],
      icon: '🧠',
      desc: '集成 Google Gemini 3 大模型，实时对战术阶段进行语义解码与深度逻辑分析。'
    },
    {
      category: '架构与性能 / ARCH',
      techs: ['Modular Components', 'Mock Service Layer'],
      icon: '🏗️',
      desc: '组件化驱动设计，配备独立的 Mock 仿真接口层，支持无缝切换至生产环境数据库。'
    }
  ];

  return (
    <div className="flex flex-col gap-10 animate-fade-in max-w-7xl mx-auto py-4 pb-20 text-center items-center">
      {/* Hero Header - Centered */}
      <div className="w-full bg-gradient-to-br from-blue-900/40 to-[#0a0f14] border border-blue-500/20 rounded-[2.5rem] p-12 relative overflow-hidden group shadow-2xl flex flex-col items-center">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]"></div>
        <div className="relative z-10 flex flex-col items-center gap-8 max-w-4xl">
          <div className="shrink-0 p-6 bg-blue-600/10 border border-blue-500/30 rounded-full backdrop-blur-xl">
             <TrophyIcon className="w-12 h-12 text-blue-500" />
          </div>
          <div className="space-y-6 flex flex-col items-center">
            <div className="flex items-center justify-center gap-3">
              <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
              <span className="text-blue-400 font-black text-xs uppercase tracking-[0.4em]">Project Intelligence & Mission</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none text-center">项目愿景与技术蓝图</h2>
            <p className="text-lg md:text-xl text-gray-400 font-medium leading-relaxed italic opacity-90 text-center max-w-3xl">
              “ Soccer Tactic Lab 不仅是一个展示板，它是连接‘数据’与‘直觉’的桥梁，致力于用最前沿的技术重构球迷对绿茵博弈的认知。”
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start">
        {/* Project Positioning - Left Column */}
        <div className="lg:col-span-4 space-y-8 flex flex-col items-center w-full">
          <div className="w-full bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-8 space-y-10 shadow-inner flex flex-col items-center">
            <div className="w-full flex flex-col items-center">
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] mb-8 text-center">项目核心定位 / MISSION</p>
              <div className="space-y-8 w-full flex flex-col items-center">
                {[
                  { title: '战术转译', desc: '将复杂的专业战术转化为直观的视觉语言' },
                  { title: '叙事学习', desc: '通过经典战役复盘，在故事中掌握策略逻辑' },
                  { title: '无缝准入', desc: '低门槛的交互设计，让每个球迷都能成为分析师' }
                ].map((item, i) => (
                  <div key={i} className="group cursor-default flex flex-col items-center text-center">
                    <div className="flex items-center gap-3 mb-2 justify-center">
                       <div className="w-1.5 h-1.5 rounded-full bg-blue-500 transition-transform group-hover:scale-150"></div>
                       <h4 className="text-sm font-black text-white uppercase tracking-wider">{item.title}</h4>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed font-medium max-w-[220px] mx-auto">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full flex flex-col items-center">
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] mb-6 text-center">目标受众 / TARGET</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['资深死忠', '战术极客', '高校社团', '青训教练', '数据爱好者'].map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[10px] text-gray-400 font-black tracking-widest">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full p-8 bg-orange-600/5 border border-orange-500/20 rounded-[2.5rem] flex flex-col items-center text-center">
             <div className="flex items-center gap-3 mb-4 justify-center">
                <CoachIcon className="w-5 h-5 text-orange-500" />
                <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest">分析师寄语</span>
             </div>
             <p className="text-xs text-gray-400 leading-relaxed italic font-medium max-w-[250px] mx-auto">
               “ 在数据的海洋中，我们寻找的是那一抹名为‘艺术’的灵光。Soccer Tactic Lab 2.1 旨在捕捉这些瞬间。”
             </p>
          </div>
        </div>

        {/* Technical Architecture - Right Column */}
        <div className="lg:col-span-8 space-y-8 flex flex-col items-center w-full">
           <div className="flex items-center justify-between w-full px-6">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                 <h3 className="text-sm font-black text-white uppercase tracking-[0.3em]">技术解决方案 / TECH STACK</h3>
              </div>
              <span className="text-[9px] text-gray-600 font-black uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">System Architecture v4.2</span>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {techStack.map((stack, i) => (
                <div key={i} className="bg-[#0a0f14] border border-white/10 rounded-[2.5rem] p-8 hover:border-blue-500/40 transition-all group relative overflow-hidden shadow-xl flex flex-col items-center text-center">
                  <div className="text-5xl mb-6 grayscale group-hover:grayscale-0 transition-all group-hover:scale-110 duration-500">
                    {stack.icon}
                  </div>
                  <div className="relative z-10 w-full flex flex-col items-center">
                    <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest mb-4 text-center">{stack.category}</p>
                    <div className="flex flex-wrap gap-2 mb-4 justify-center">
                       {stack.techs.map(t => (
                         <span key={t} className="px-2 py-0.5 bg-blue-600/10 border border-blue-500/20 rounded text-[9px] font-black text-blue-400">{t}</span>
                       ))}
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed font-medium text-center">
                      {stack.desc}
                    </p>
                  </div>
                </div>
              ))}
           </div>

           <div className="w-full mt-4 p-10 bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/20 rounded-[3rem] relative overflow-hidden group shadow-2xl flex flex-col items-center text-center">
              <div className="absolute top-0 right-0 p-10 text-9xl font-black text-white/[0.02] italic tracking-tighter select-none pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                PRO
              </div>
              <div className="relative z-10 max-w-2xl flex flex-col items-center">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <InfoIcon className="w-5 h-5 text-blue-500" />
                  <h4 className="text-xs font-black text-white uppercase tracking-[0.4em]">未来演进 / ROADMAP</h4>
                </div>
                <p className="text-lg md:text-xl text-gray-300 font-medium leading-relaxed italic text-center">
                  “ 下一阶段，我们将引入 <span className="text-blue-500 font-black">3D 阵型扫描</span> 与 <span className="text-white font-black">多智能体对抗模拟</span>，
                  让战术推演从‘静态回放’进化为‘动态推演’，实现真正的策略实时反馈。”
                </p>
              </div>
           </div>
        </div>
      </div>
      
      {/* Footer Branding */}
      <div className="flex items-center justify-center gap-8 opacity-20 mt-16 w-full px-12">
          <div className="h-px flex-grow bg-gradient-to-r from-transparent to-gray-500"></div>
          <div className="text-[9px] font-black text-gray-400 uppercase tracking-[0.8em] whitespace-nowrap text-center">Tactical Lab Open Intelligence Protocol</div>
          <div className="h-px flex-grow bg-gradient-to-l from-transparent to-gray-500"></div>
      </div>
    </div>
  );
};
