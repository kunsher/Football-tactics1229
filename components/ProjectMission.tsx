
import React from 'react';
import { InfoIcon } from './icons';

export const ProjectMission: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-[#0a0f14] rounded-2xl p-7 border border-white/5 shadow-inner">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-blue-500/10 rounded-lg">
            <InfoIcon className="w-6 h-6 text-blue-500" />
        </div>
        <div>
            <h2 className="text-xl font-black text-white uppercase tracking-tighter">项目核心定位 <span className="text-blue-500 text-sm ml-2 opacity-50">Mission Statement</span></h2>
            <div className="h-0.5 w-16 bg-blue-500/50 mt-1.5"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Target Users */}
        <div className="space-y-5">
            <p className="text-xs text-gray-500 font-black uppercase tracking-[0.2em] mb-5">目标用户 / Audience</p>
            <div className="space-y-4">
                {[
                    '18-35岁足球爱好者',
                    '有一定观赛经验但缺乏专业战术知识',
                    '希望提升战术理解力的球迷',
                    '高校足球社团和学生'
                ].map((text, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                        <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:scale-150 transition-transform"></div>
                        <p className="text-base text-gray-300 font-medium group-hover:text-white transition-colors">{text}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Core Values */}
        <div className="space-y-5">
            <p className="text-xs text-gray-500 font-black uppercase tracking-[0.2em] mb-5">核心价值 / Core Values</p>
            <div className="space-y-4">
                {[
                    { title: '战术转译', desc: '将复杂的专业战术转化为通俗易懂的可视化内容' },
                    { title: '叙事学习', desc: '通过经典战役的“故事性”增强学习兴趣' },
                    { title: '无缝准入', desc: '降低战术学习门槛，让每个球迷都能看懂战术' }
                ].map((val, i) => (
                    <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-blue-500/30 transition-all">
                        <p className="text-sm font-black text-blue-400 mb-2">{val.title}</p>
                        <p className="text-xs text-gray-400 leading-relaxed font-medium">{val.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};
