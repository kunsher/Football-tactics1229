
import React, { useState } from 'react';

interface LoginModalProps {
    onLogin: () => void;
    onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onLogin, onClose }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleLoginAction = () => {
        setIsLoading(true);
        setTimeout(() => {
            onLogin();
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-md bg-[#0a0f14] border border-blue-500/30 rounded-3xl p-10 shadow-[0_0_100px_rgba(59,130,246,0.2)] overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl"></div>

                <div className="relative z-10 text-center">
                    <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center border border-blue-500/30 mx-auto mb-6">
                        <span className="text-2xl">🔐</span>
                    </div>
                    
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">同步战术基因</h2>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed mb-10">
                        登录以同步您的复盘进度、解锁高级战术勋章并加入分析师排名。
                    </p>

                    <div className="space-y-4">
                        <button 
                            onClick={handleLoginAction}
                            disabled={isLoading}
                            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-3 group disabled:opacity-50"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    一键同步身份
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </>
                            )}
                        </button>
                        
                        <button 
                            onClick={onClose}
                            className="w-full py-4 bg-white/5 hover:bg-white/10 text-gray-400 font-black uppercase tracking-widest rounded-xl transition-all"
                        >
                            暂不登录，继续分析
                        </button>
                    </div>

                    <p className="mt-8 text-[10px] text-gray-600 font-bold uppercase tracking-widest opacity-50 underline underline-offset-4 decoration-blue-500/30">
                        Secure Tactical Channel 04-X
                    </p>
                </div>
            </div>
        </div>
    );
};
