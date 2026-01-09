
import React, { useState } from 'react';
import type { UserProfile } from '../types';
import { UserIcon, TrophyIcon, InfoIcon, CoachIcon } from './icons';

interface UserSpaceModalProps {
  user: UserProfile;
  onClose: () => void;
  onLogout: () => void;
  onOpenLogin: () => void;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}

const AchievementBadge: React.FC<{ title: string; desc: string; icon: string; isLocked?: boolean }> = ({ title, desc, icon, isLocked }) => (
  <div className={`flex items-center gap-4 p-4 rounded-2xl border transition-all group ${isLocked ? 'bg-white/[0.01] border-white/5 opacity-40' : 'bg-blue-600/5 border-blue-500/20 hover:bg-blue-600/10 hover:border-blue-500/40'}`}>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-inner ${isLocked ? 'bg-gray-800' : 'bg-blue-600/20 border border-blue-500/30 group-hover:scale-110 transition-transform'}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-black text-white tracking-tight">{title}</p>
      <p className="text-[10px] text-gray-500 font-medium">{desc}</p>
    </div>
  </div>
);

export const UserSpaceModal: React.FC<UserSpaceModalProps> = ({ user, onClose, onLogout, onOpenLogin, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(user.name);

  const handleUpdate = () => {
    onUpdateProfile({ name: newName });
    setIsEditing(false);
  };

  const achievements = [
    { title: '战术基因大师', desc: '成功掌握 5 种核心战术体系', icon: '🧬', isLocked: user.tacticsMastered < 5 },
    { title: '战役解码专家', desc: '深度复盘超过 10 场历史名局', icon: '📽️', isLocked: user.battlesAnalyzed < 10 },
    { title: '系统求知者', desc: '完整通过一条专业学习路径', icon: '🎓', isLocked: user.learningProgress < 100 },
  ];

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8 animate-fade-in backdrop-blur-xl bg-black/80" onClick={onClose}>
      <div 
        className="relative w-full max-w-4xl bg-[#0a0f14] border border-blue-500/20 rounded-[2rem] shadow-[0_0_80px_rgba(59,130,246,0.15)] overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3b82f6 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
        
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

          {isEditing ? (
              <div className="mt-8 flex flex-col items-center gap-3 w-full">
                  <input 
                    type="text" value={newName} onChange={e => setNewName(e.target.value)}
                    className="w-full bg-white/10 border border-blue-500/30 rounded-lg px-3 py-2 text-white text-center font-bold focus:outline-none"
                  />
                  <div className="flex gap-2">
                    <button onClick={handleUpdate} className="text-[10px] font-black uppercase text-blue-500 hover:text-blue-400">保存</button>
                    <button onClick={() => setIsEditing(false)} className="text-[10px] font-black uppercase text-gray-500">取消</button>
                  </div>
              </div>
          ) : (
              <>
                <h2 className="text-2xl font-black text-white mt-8 tracking-tighter">{user.name}</h2>
                <p className="text-xs font-bold text-blue-500 uppercase tracking-[0.2em] mt-2 mb-6">{user.rank}</p>
                {!user.isGuest && (
                    <button onClick={() => setIsEditing(true)} className="text-[9px] font-black uppercase text-gray-500 hover:text-blue-500 transition-colors mb-8">
                        [ 编辑资料 / EDIT ]
                    </button>
                )}
              </>
          )}

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

        <div className="flex-grow p-10 md:p-14 space-y-12 overflow-y-auto max-h-[80vh] md:max-h-none custom-scrollbar">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center border border-blue-600/20">
                    <TrophyIcon className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="text-sm font-black text-white uppercase tracking-[0.3em]">战术智能仪表盘</h3>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors text-2xl">×</button>
          </div>

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
             <p className="text-[9px] text-gray-600 font-medium italic">离下一等级“战术导师 (Tactical Master)”还需完成更多核心模块复盘。</p>
          </div>

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

          {/* 新增：荣誉成就版块 */}
          <div className="space-y-6 animate-fade-in">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-4 bg-orange-500 rounded-full"></div>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">荣誉成就 / ACHIEVEMENTS</p>
                </div>
                <span className="text-[10px] text-orange-500 font-black uppercase tracking-widest opacity-60">Medals Unlocked</span>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {achievements.map((ach, i) => (
                  <AchievementBadge key={i} {...ach} />
                ))}
             </div>
          </div>

          <div className="space-y-6 pt-6 border-t border-white/5">
             <p className="text-xs font-black text-gray-500 uppercase tracking-widest">近期战术活动</p>
             <div className="space-y-4">
                {user.isGuest ? (
                    <p className="text-sm text-gray-600 italic">登录后可查看全局活动记录...</p>
                ) : (
                    [
                        { action: '身份验证', target: '已更新分析师代号', time: '刚刚' },
                        { action: '战术研究', target: '完成了对 Gegenpressing 的深度解码', time: '2 小时前' },
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
