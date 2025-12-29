
import React from 'react';
import type { UserProfile } from '../types';
import { UserIcon, TrophyIcon, InfoIcon, CoachIcon } from './icons';

interface UserSpaceModalProps {
  user: UserProfile;
  onClose: () => void;
}

export const UserSpaceModal: React.FC<UserSpaceModalProps> = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8 animate-fade-in backdrop-blur-xl bg-black/80" onClick={onClose}>
      <div 
        className="relative w-full max-w-4xl bg-[#0a0f14] border border-blue-500/20 rounded-[2rem] shadow-[0_0_80px_rgba(59,130,246,0.15)] overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3b82f6 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
        
        {/* Left Side: Analyst Card */}
        <div className="w-full md:w-80 bg-blue-600/5 p-10 flex flex-col items-center border-b md:border-b-0 md:border-r border-white/5 relative">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 p-1 shadow-[0_0_30px_rgba(59,130,246,0.5)] group-hover:scale-105 transition-transform duration-500">
              <div className="w-full h-full rounded-full bg-[#0a0f14] flex items-center justify-center overflow-hidden">
                <UserIcon className="w-16 h-16 text-blue-500" />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded-md shadow-lg border border-blue-400">
                已验证
            </div>
          </div>

          <h2 className="text-2xl font-black text-white mt-8 tracking-tighter">{user.name}</h2>
          <p className="text-xs font-bold text-blue-500 uppercase tracking-[0.2em] mt-2 mb-10">{user.rank}</p>

          <div className="w-full space-y-4">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">加入日期</p>
                <p className="text-sm text-gray-200 font-bold">{user.joinDate}</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">当前状态</p>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <p className="text-sm text-gray-200 font-bold">在线 / 正在分析中</p>
                </div>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="mt-auto w-full py-3 bg-white/5 hover:bg-red-500/10 hover:text-red-400 text-gray-500 text-xs font-black uppercase tracking-[0.2em] rounded-xl border border-white/5 hover:border-red-500/20 transition-all"
          >
            退出分析会话
          </button>
        </div>

        {/* Right Side: Dashboard */}
        <div className="flex-grow p-10 md:p-14 space-y-12 overflow-y-auto max-h-[80vh] md:max-h-none">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center border border-blue-600/20">
                    <TrophyIcon className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="text-sm font-black text-white uppercase tracking-[0.3em]">战术智能仪表盘</h3>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors text-2xl">×</button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-white/5 rounded-3xl border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform duration-700">
                    <InfoIcon className="w-16 h-16" />
                </div>
                <p className="text-3xl font-black text-white">{user.tacticsMastered}</p>
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1">已掌握战术基因</p>
                <div className="w-full h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
                    <div className="h-full bg-blue-600 w-3/4"></div>
                </div>
            </div>
            <div className="p-6 bg-white/5 rounded-3xl border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform duration-700">
                    <CoachIcon className="w-16 h-16" />
                </div>
                <p className="text-3xl font-black text-white">{user.battlesAnalyzed}</p>
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1">历史战役复盘</p>
                <div className="w-full h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
                    <div className="h-full bg-blue-400 w-1/2"></div>
                </div>
            </div>
          </div>

          {/* Achievement Badges */}
          <div className="space-y-6">
            <p className="text-xs font-black text-blue-500 uppercase tracking-widest">已解锁荣誉勋章</p>
            <div className="flex flex-wrap gap-4">
                {[
                    { name: 'Tiki-Taka 专家', color: 'text-orange-400', bg: 'bg-orange-400/10' },
                    { name: '高位逼抢达人', color: 'text-red-400', bg: 'bg-red-400/10' },
                    { name: '伪九号分析家', color: 'text-blue-400', bg: 'bg-blue-400/10' },
                    { name: '深度分析师', color: 'text-purple-400', bg: 'bg-purple-400/10' },
                ].map(badge => (
                    <div key={badge.name} className={`px-4 py-2 rounded-xl ${badge.bg} border border-white/5 flex items-center gap-2 group cursor-pointer hover:border-blue-500/30 transition-all`}>
                        <div className={`w-2 h-2 rounded-full ${badge.color.replace('text', 'bg')}`}></div>
                        <span className={`text-xs font-black ${badge.color} uppercase tracking-tighter`}>{badge.name}</span>
                    </div>
                ))}
            </div>
          </div>

          {/* Activity Log */}
          <div className="space-y-6 pt-6 border-t border-white/5">
             <p className="text-xs font-black text-gray-500 uppercase tracking-widest">近期战术活动</p>
             <div className="space-y-4">
                {[
                    { action: '完成战役分析', target: '2011 欧冠决赛：瓜帅 vs 爵爷', time: '2 小时前' },
                    { action: '掌握核心概念', target: '伪九号的演变历程', time: '1 天前' },
                ].map((act, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 group">
                        <div className="flex gap-4 items-center">
                            <div className="w-2 h-2 rounded-full bg-blue-600/30 group-hover:bg-blue-600 transition-colors"></div>
                            <p className="text-sm font-medium text-gray-300">
                                <span className="text-gray-500 uppercase text-[10px] font-black mr-2">{act.action}</span>
                                {act.target}
                            </p>
                        </div>
                        <span className="text-[10px] text-gray-600 font-bold uppercase">{act.time}</span>
                    </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
