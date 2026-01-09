
import React from 'react';
import { TrophyIcon, CoachIcon, PlayerIcon, InfoIcon } from './icons';

export const ProjectMission: React.FC = () => {
  const coreInnovations = [
    {
      label: '空间语义化引擎',
      techs: ['React 19', 'SVG Dynamics', 'Tailwind CSS'],
      desc: '将底层球员坐标流转化为“肋部渗透”、“阵型压缩”等战术概念，实现体育数据从“记录”到“解构”的质变。'
    },
    {
      label: '战术 DNA 拓扑模型',
      techs: ['Recharts', 'Multi-dim Data'],
      desc: '构建六维评价体系，量化球队战术特征。支持不同历史战体系在同一拓扑空间下的实时叠映对比。'
    },
    {
      label: '动态位移与交互',
      techs: ['Framer Motion', 'State Machine'],
      desc: '基于并发模式与动力学组件，实现 22 个动态节点在战术变阵时的丝滑拟真位移，解决离散状态切换的视觉割裂感。'
    }
  ];

  const academicValue = [
    {
      title: '高性能可视化探索',
      desc: '探索 Web 端在不依赖 Canvas 的情况下，利用 SVG 矢量动力学与 React 响应式状态管理高频复杂数据的边界性能表现。'
    },
    {
      title: '科普教育新范式',
      desc: '利用“所读即所得”的术语高亮与微型动画，结合交互式沙盒，降低普通球迷理解职业级足球战术理论的认知门槛。'
    }
  ];

  return (
    <div className="flex flex-col gap-16 animate-fade-in max-w-6xl mx-auto py-12 pb-48 items-center">
      
      {/* Hero Section */}
      <div className="w-full flex flex-col items-center text-center space-y-8 relative px-6">
        <div className="shrink-0 p-5 bg-blue-600/10 border border-blue-500/20 rounded-3xl shadow-2xl animate-bounce">
           <TrophyIcon className="w-10 h-10 text-blue-500" />
        </div>

        <div className="space-y-6 max-w-4xl">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-8 bg-blue-500/30"></span>
            <span className="text-blue-400 font-black text-[11px] uppercase tracking-[0.6em]">Academic Excellence Graduation Project</span>
            <span className="h-px w-8 bg-blue-500/30"></span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-tight">
            基于web可视化技术足球科普系统<br/>
            <span className="text-blue-500 text-2xl md:text-3xl lg:text-4xl mt-4 block">——面向球迷的战术平台</span>
          </h2>
          <p className="text-xl text-gray-400 font-medium leading-relaxed italic max-w-3xl mx-auto opacity-90">
            “ 本系统致力于通过数字化交互，将职业绿茵场上的战术博弈显性化，为数据驱动型球迷提供深度的比赛逻辑拆解。”
          </p>

          {/* 申报与导师信息 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full mt-12">
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.04] transition-colors">
                <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest mb-2 opacity-60">研究方向</p>
                <p className="text-lg font-black text-white">Web 数据可视化交互</p>
            </div>
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.04] transition-colors">
                <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest mb-2 opacity-60">课题负责人</p>
                <p className="text-lg font-black text-white uppercase">谢坤 / Xie Kun</p>
            </div>
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.04] transition-colors">
                <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest mb-2 opacity-60">指导教师</p>
                <p className="text-lg font-black text-white">周书臣 副教授</p>
            </div>
            <div className="p-6 bg-blue-600/10 border border-blue-500/20 rounded-3xl">
                <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest mb-2">系统版本</p>
                <p className="text-lg font-black text-white font-mono tracking-widest">v3.2.0-QUANTUM</p>
            </div>
          </div>
        </div>
      </div>

      {/* 核心创新展示 */}
      <div className="w-full space-y-8 px-6 mt-12">
          <div className="flex items-center gap-4">
              <div className="w-1.5 h-8 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
              <h3 className="text-2xl font-black text-white uppercase tracking-widest">技术架构与核心创新 / ARCHITECTURE</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreInnovations.map((item, i) => (
                <div key={i} className="bg-[#0f172a]/40 border border-white/5 rounded-[2.5rem] p-10 hover:border-blue-500/40 transition-all shadow-2xl relative overflow-hidden group">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl group-hover:scale-150 transition-transform"></div>
                    <div className="flex justify-between items-start mb-6 relative z-10">
                        <h4 className="text-xl font-black text-white leading-tight uppercase">{item.label}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                        {item.techs.map(t => <span key={t} className="px-2.5 py-1 bg-blue-600/10 rounded-lg text-[9px] font-black text-blue-400 border border-blue-500/20">{t}</span>)}
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed font-medium relative z-10">{item.desc}</p>
                </div>
            ))}
          </div>
      </div>

      {/* 学术价值与科研价值 */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 px-6 mt-12">
        <div className="space-y-8 bg-white/[0.02] border border-white/5 rounded-[3rem] p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <InfoIcon className="w-40 h-40" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-widest flex items-center gap-4">
                <div className="w-1 h-6 bg-orange-500 rounded-full"></div> 学术贡献
            </h3>
            <div className="space-y-6">
                {academicValue.map((item, i) => (
                    <div key={i} className="space-y-2">
                        <p className="text-lg font-black text-gray-200 uppercase tracking-tight">{item.title}</p>
                        <p className="text-sm text-gray-400 leading-relaxed italic">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>

        <div className="space-y-8 bg-blue-600/5 border border-blue-500/10 rounded-[3rem] p-12">
            <h3 className="text-2xl font-black text-blue-400 uppercase tracking-widest flex items-center gap-4">
                <div className="w-1 h-6 bg-blue-400 rounded-full"></div> 未来展望
            </h3>
            <p className="text-base text-gray-300 leading-relaxed italic pr-4">
                “ 系统的下一步演进将计划接入 **实时比赛 Open Data** 接口，并引入 **人工智能决策分析模型**。将系统从‘历史复盘’升级为‘实战数据流同传’的实时辅助分析平台，为更广阔的体育大数据领域提供参考方案。”
            </p>
            <div className="flex gap-4 pt-4 border-t border-white/5 mt-4">
                <span className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-black text-gray-500 uppercase tracking-widest">#BIG_DATA</span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-black text-gray-500 uppercase tracking-widest">#AI_TACTICS</span>
            </div>
        </div>
      </div>

      {/* 底部版权与声明 */}
      <div className="w-full flex flex-col items-center gap-8 mt-24 opacity-40">
          <div className="flex items-center gap-4">
              <div className="h-px w-20 bg-gray-600"></div>
              <div className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-[10px] text-gray-500 font-black uppercase tracking-[0.4em]">
                 足球可视化科普实验室 (TacticalLab) • 2025 毕业设计作品
              </div>
              <div className="h-px w-20 bg-gray-600"></div>
          </div>
          <p className="text-[9px] font-medium tracking-widest text-gray-600 uppercase">Designed for Football Enthusiasts by Xie Kun</p>
      </div>

    </div>
  );
};
