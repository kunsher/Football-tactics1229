
import React, { useState } from 'react';
import { mockApi } from '../services/mockApi';
import { UserProfile } from '../types';

interface LoginModalProps {
    onLoginSuccess: (user: UserProfile) => void;
    onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onLoginSuccess, onClose }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            let user;
            if (isRegister) {
                if (!nickname) throw new Error('请输入昵称');
                user = await mockApi.register(username, password, nickname);
            } else {
                user = await mockApi.login(username, password);
            }
            onLoginSuccess(user);
        } catch (err: any) {
            setError(err.message || '操作失败，请重试');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/60 dark:bg-black/90 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-md bg-card border border-border rounded-[2.5rem] p-10 shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                
                <div className="relative z-10">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center border border-blue-500/30 mb-4">
                            <span className="text-2xl">{isRegister ? '📝' : '🔐'}</span>
                        </div>
                        <h2 className="text-2xl font-black text-foreground dark:text-white uppercase tracking-tighter">
                            {isRegister ? '创建分析师账号' : '同步战术基因'}
                        </h2>
                        <p className="text-[10px] text-slate-500 dark:text-gray-500 font-bold uppercase tracking-[0.2em] mt-2">
                            {isRegister ? 'Join the Tactical Elite' : 'Access Tactical Intelligence'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-bold animate-shake">
                                ⚠️ {error}
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-[10px] text-slate-500 dark:text-gray-500 font-black uppercase tracking-widest pl-1">账号 / USERNAME</label>
                            <input 
                                type="text" 
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-foreground/5 border border-border rounded-xl py-3 px-4 text-foreground dark:text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-400 dark:placeholder:text-gray-700"
                                placeholder="输入通行证 ID"
                            />
                        </div>

                        {isRegister && (
                            <div className="space-y-1.5">
                                <label className="text-[10px] text-slate-500 dark:text-gray-500 font-black uppercase tracking-widest pl-1">昵称 / NICKNAME</label>
                                <input 
                                    type="text" 
                                    required
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                    className="w-full bg-foreground/5 border border-border rounded-xl py-3 px-4 text-foreground dark:text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-400 dark:placeholder:text-gray-700"
                                    placeholder="你的公开代号"
                                />
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-[10px] text-slate-500 dark:text-gray-500 font-black uppercase tracking-widest pl-1">密码 / PASSWORD</label>
                            <input 
                                type="password" 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-foreground/5 border border-border rounded-xl py-3 px-4 text-foreground dark:text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-400 dark:placeholder:text-gray-700"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="pt-4 flex flex-col gap-3">
                            <button 
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    isRegister ? '立即创建存档' : '执行身份同步'
                                )}
                            </button>
                            
                            <button 
                                type="button"
                                onClick={() => setIsRegister(!isRegister)}
                                className="text-xs text-slate-500 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 font-bold transition-colors uppercase tracking-widest py-2"
                            >
                                {isRegister ? '已有账号？立即登录' : '没有账号？创建新身份'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-10 pt-6 border-t border-border text-center">
                        <button onClick={onClose} className="text-[10px] text-slate-500 dark:text-gray-600 font-black uppercase tracking-widest hover:text-foreground dark:hover:text-white transition-colors">
                            暂不登录，以访客身份继续
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
