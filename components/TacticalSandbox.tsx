
import React from 'react';

export const TacticalSandbox: React.FC = () => {
    return (
        <div className="w-full flex flex-col gap-6 animate-fade-in max-w-7xl mx-auto">
            <div className="bg-blue-600/10 border border-blue-500/30 rounded-2xl p-10 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px]"></div>
                <h2 className="text-4xl font-black text-white mb-4 tracking-tighter">战术沙盒 <span className="text-blue-500">v1.0 Beta</span></h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8 font-medium">
                    在这里，你就是主教练。自由布置阵型、绘制进攻蓝图，生成属于你的战术报告。
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {[
                        { title: '自由绘图', desc: '利用箭头和防区笔刷，将脑海中的跑动视觉化。' },
                        { title: '阵型模板', desc: '一键部署从经典的 4-4-2 到现代的 3-2-4-1。' },
                        { title: '战术导出', desc: '高清图片与 JSON 格式导出，无缝分享至社媒或团队。' }
                    ].map((item, i) => (
                        <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-md hover:bg-white/10 transition-all cursor-default">
                            <h3 className="text-blue-400 font-black mb-2 uppercase tracking-widest text-sm">{item.title}</h3>
                            <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex justify-center">
                    <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-[0.2em] rounded-xl shadow-xl shadow-blue-600/30 transition-all transform hover:scale-105 active:scale-95">
                        立即开启创作
                    </button>
                </div>
            </div>

            {/* Placeholder for the actual canvas */}
            <div className="h-[600px] w-full bg-black/40 rounded-3xl border border-white/5 flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[#1e3a1e]/20 opacity-40 group-hover:opacity-60 transition-opacity"></div>
                <div className="relative z-10 text-center flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full border-2 border-blue-500/30 flex items-center justify-center mb-6 animate-pulse">
                        <span className="text-blue-500 text-2xl font-black">?</span>
                    </div>
                    <p className="text-gray-500 font-black uppercase tracking-widest text-sm">沙盒引擎加载中...</p>
                    <p className="text-[10px] text-gray-700 mt-2">支持全阵型自定义、自由路径绘制与多阶段导出</p>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-10 left-10 w-40 h-px bg-blue-500/20"></div>
                <div className="absolute bottom-10 right-10 w-40 h-px bg-blue-500/20"></div>
            </div>
        </div>
    );
};
