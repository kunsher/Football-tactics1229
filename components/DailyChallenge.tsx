
import React, { useState } from 'react';
import { TrophyIcon } from './icons';

export const DailyChallenge: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const challenge = {
        question: "面对对手 5-4-1 的低位防守 (Low Block)，以下哪种操作最能有效拉开空间？",
        options: [
            "中后卫通过长传直接找禁区内的中锋",
            "利用内切边锋吸引边后卫，由边后卫套边 (Overlap) 拉开宽度",
            "增加中场人数在禁区前沿进行连续短传"
        ],
        correctIndex: 1,
        explanation: "通过边后卫的套边（Overlap）可以强制对方防线横向移动，从而在肋部或禁区内制造出接球空间。"
    };

    return (
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-900/10 rounded-2xl p-6 border border-blue-500/30 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
                <TrophyIcon className="w-16 h-16 text-blue-500" />
            </div>
            
            <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-0.5 bg-blue-500 text-white text-[10px] font-black rounded uppercase tracking-widest">每日挑战</span>
                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">+50 积分</span>
            </div>

            <h3 className="text-sm font-bold text-white mb-4 leading-relaxed">{challenge.question}</h3>

            <div className="space-y-2">
                {challenge.options.map((option, idx) => (
                    <button
                        key={idx}
                        disabled={isSubmitted}
                        onClick={() => setSelectedOption(idx)}
                        className={`w-full text-left p-3 rounded-xl text-xs font-medium transition-all border ${
                            selectedOption === idx 
                                ? 'bg-blue-600 border-blue-400 text-white' 
                                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                        } ${isSubmitted && idx === challenge.correctIndex ? 'border-green-500 bg-green-500/20 text-green-400' : ''}
                        ${isSubmitted && selectedOption === idx && idx !== challenge.correctIndex ? 'border-red-500 bg-red-500/20 text-red-400' : ''}`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-black">{String.fromCharCode(65 + idx)}</span>
                            {option}
                        </div>
                    </button>
                ))}
            </div>

            {!isSubmitted ? (
                <button
                    onClick={() => setIsSubmitted(true)}
                    disabled={selectedOption === null}
                    className={`mt-4 w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                        selectedOption !== null ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/5 text-gray-600 cursor-not-allowed'
                    }`}
                >
                    提交分析
                </button>
            ) : (
                <div className="mt-4 p-3 bg-white/5 rounded-xl border border-white/10 animate-fade-in">
                    <p className="text-[10px] font-black text-blue-400 uppercase mb-1">战术复盘</p>
                    <p className="text-[11px] text-gray-400 leading-relaxed italic">{challenge.explanation}</p>
                </div>
            )}
        </div>
    );
};
