
import React from 'react';
import type { UserProfile } from '../types';
import { UserIcon, TrophyIcon, InfoIcon, CoachIcon } from './icons';

interface UserSpaceModalProps {
  user: UserProfile;
  onClose: () => void;
  onLogout: () => void;
  onOpenLogin: () => void;
}

export const UserSpaceModal: React.FC<UserSpaceModalProps> = ({ user, onClose, onLogout, onOpenLogin }) => {
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
            <div className={`w-32 h-32 rounded-full p-1 shadow-lg transition-transform duration-500 ${user.isGuest ? 'bg-gray-800' : 'bg-gradient-to-tr from-blue-600 to-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.5)] group-hover:scale-105'}`}>
              <div className="w-full h-full rounded-full bg-[#0a0f14] flex items-center justify-center overflow-hidden">
                <UserIcon className={`w-16 h-16 ${user.isGuest ? 'text-gray-600' : 'text-blue-500'}`} />
              </div>
            </div>
            {!user.isGuest && (
                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded-md shadow-lg border border-blue-400">
                    已验证
                </div>
            )}
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
                    <div className={`w-2 h-2 rounded-full animate-pulse ${user.isGuest ? 'bg-gray-500' : 'bg-green-500'}`}></div>
                    <p className="text-sm text-gray-200 font-bold">{user.isGuest ? '访客预览模式' : '已连接战术服务器'}</p>
                </div>
            </div>
          </div>
          
          <div className="mt-auto w-full pt-6">
            {user.isGuest ? (
                <button 
                    onClick={onOpenLogin}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-[0.2em] rounded-xl shadow-lg shadow-blue-600/20 transition-all"
                >
                    立即登录同步
                </button>
            ) : (
                <button 
                    onClick={onLogout}
                    className="w-full py-3 bg-white/5 hover:bg-red-500/10 hover:text-red-400 text-gray-500 text-xs font-black uppercase tracking-[0.2em] rounded-xl border border-white/5 hover:border-red-500/20 transition-all"
                >
                    退出身份同步
                </button>
            )}
          </div>
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

          {/* Learning Progress Bar Section */}
          <div className="space-y-4 animate-fade-in">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-4 bg-blue-500 rounded-full"></div>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">分析师成长进度 / CAREER PROGRESS</p>
                </div>
                <p className="text-xl font-black text-white tracking-tighter">{user.learningProgress}%</p>
             </div>
             <div className="h-4 w-full bg-white/5 rounded-full p-1 border border-white/5 overflow-hidden shadow-inner">
                <div 
                    className="h-full bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all duration-1000 ease-out relative group"
                    style={{ width: `${user.learningProgress}%` }}
                >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute top-0 right-0 h-full w-4 bg-gradient-to-l from-white/20 to-transparent"></div>
                </div>
             </div>
             <p className="text-[9px] text-gray-600 font-medium italic">离下一等级“战术导师 (Tactical Master)”还需完成 8 个核心模块复盘。</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className={`p-6 bg-white/5 rounded-3xl border border-white/5 relative overflow-hidden group ${user.isGuest ? 'opacity-50 grayscale' : ''}`}>
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform duration-700">
                    <InfoIcon className="w-16 h-16" />
                </div>
                <p className="text-3xl font-black text-white">{user.tacticsMastered}</p>
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1">已掌握战术基因</p>
                <div className="w-full h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
                    <div className="h-full bg-blue-600 w-3/4"></div>
                </div>
            </div>
            <div className={`p-6 bg-white/5 rounded-3xl border border-white/5 relative overflow-hidden group ${user.isGuest ? 'opacity-50 grayscale' : ''}`}>
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

          {user.isGuest ? (
              <div className="bg-blue-600/5 rounded-3xl p-8 border border-dashed border-blue-500/20 text-center animate-pulse">
                  <p className="text-sm text-blue-400 font-bold mb-2 uppercase tracking-widest">登录后解锁全部成就</p>
                  <p className="text-xs text-gray-500 font-medium italic">当前处于访客模式，进度将仅保存在本地浏览器。</p>
              </div>
          ) : (
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
          )}

          {/* Activity Log */}
          <div className="space-y-6 pt-6 border-t border-white/5">
             <p className="text-xs font-black text-gray-500 uppercase tracking-widest">近期战术活动</p>
             <div className="space-y-4">
                {user.isGuest ? (
                    <p className="text-sm text-gray-600 italic">登录后可查看全局活动记录...</p>
                ) : (
                    [
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
                    ))
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
