
import React, { useMemo } from 'react';
import type { PlayerPosition, ProfessionalGpsData } from '../types';
import { PlayerIcon, InfoIcon, TrophyIcon, CoachIcon } from './icons';

interface PlayerModalProps {
  player: PlayerPosition;
  phaseTitle?: string;
  onClose: () => void;
}

const SpeedZoneBar: React.FC<{ zone: string; range: string; value: number; color: string }> = ({ zone, range, value, color }) => (
  <div className="space-y-1.5 flex-grow">
    <div className="flex justify-between items-end">
      <span className="text-[9px] font-black text-white uppercase tracking-tighter">{zone} <span className="text-gray-600 ml-1">{range}</span></span>
      <span className="text-[10px] font-black" style={{ color }}>{value}%</span>
    </div>
    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
      <div className="h-full transition-all duration-1000 ease-out" style={{ width: `${value}%`, backgroundColor: color }}></div>
    </div>
  </div>
);

export const PlayerModal: React.FC<PlayerModalProps> = ({ player, phaseTitle, onClose }) => {
  // 模拟拉夫堡/英超标准的 GPS 数据
  const gpsData: ProfessionalGpsData = useMemo(() => player.gps || {
    totalDistance: 9850,
    metabolicPower: 22.4,
    highIntensityDistance: 640,
    sprintsCount: 18,
    maxSpeed: 33.4,
    speedZones: [
      { zone: 'Z1 Walking', speedRange: '0.7-7.2km/h', distance: 3400, percentage: 35 },
      { zone: 'Z2 Jogging', speedRange: '7.2-14.4km/h', distance: 4200, percentage: 42 },
      { zone: 'Z3 Running', speedRange: '14.4-19.8km/h', distance: 1500, percentage: 15 },
      { zone: 'Z4 HSR', speedRange: '19.8-25.2km/h', distance: 450, percentage: 5 },
      { zone: 'Z5 Sprint', speedRange: '>25.2km/h', distance: 300, percentage: 3 },
    ]
  }, [player.gps]);

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 animate-fade-in backdrop-blur-xl bg-black/80" onClick={onClose}>
      <div 
        className="relative w-full max-w-6xl bg-[#0a0f14] border border-blue-500/20 rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 左侧：职业档案 */}
        <div className="w-full md:w-[320px] bg-white/[0.02] p-10 flex flex-col border-r border-white/5 relative shrink-0">
          <div className="w-40 h-40 rounded-[2.5rem] bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mb-8 relative group mx-auto">
            <PlayerIcon className="w-20 h-20 text-blue-500 opacity-60 group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute top-4 left-4 text-xs font-black text-blue-500/40 italic">#PRO_SCAN</div>
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-white tracking-tighter mb-1">{player.name}</h2>
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">{player.role} / UID: {player.id}</p>
          </div>

          <div className="space-y-3">
             <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-1">代谢功率指数 / POWER</p>
                <div className="flex items-end gap-2">
                    <span className="text-2xl font-black text-white">{gpsData.metabolicPower.toFixed(1)}</span>
                    <span className="text-[10px] text-blue-500 font-bold mb-1">W/kg</span>
                </div>
             </div>
             <div className="p-4 bg-blue-600/10 rounded-2xl border border-blue-500/20">
                <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-1">高强度跑动阈值 / HSR</p>
                <div className="flex items-end gap-2">
                    <span className="text-2xl font-black text-white">{Math.round(gpsData.highIntensityDistance)}</span>
                    <span className="text-[10px] text-blue-400 font-bold mb-1">METERS</span>
                </div>
             </div>
          </div>
          
          <div className="mt-auto pt-8">
             <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">物理状态评估: 极佳</span>
             </div>
             <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-xl border border-white/10 transition-all">导出分析报告 PDF</button>
          </div>
        </div>

        {/* 右侧：性能实验室详情 */}
        <div className="flex-grow p-10 md:p-14 space-y-10 overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                  <TrophyIcon className="w-5 h-5 text-blue-500" />
               </div>
               <h3 className="text-xl font-black text-white uppercase tracking-tighter">性能实验室深度透视 <span className="text-gray-700 font-bold text-sm ml-2">/ Loughborough Standards</span></h3>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors text-2xl">×</button>
          </div>

          {/* 核心跑动指标格点 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[
               { label: '总跑动距离', val: (gpsData.totalDistance/1000).toFixed(2), unit: 'KM', color: 'text-white' },
               { label: '最高瞬时时速', val: gpsData.maxSpeed.toFixed(1), unit: 'KM/H', color: 'text-orange-500' },
               { label: '冲刺次数', val: Math.floor(gpsData.sprintsCount), unit: 'TIMES', color: 'text-blue-400' },
               { label: '代谢负荷', val: (gpsData.metabolicPower * 0.85).toFixed(1), unit: 'LOAD', color: 'text-green-400' },
             ].map((stat, i) => (
               <div key={i} className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl">
                  <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-2">{stat.label}</p>
                  <p className={`text-3xl font-black ${stat.color}`}>{stat.val} <span className="text-[10px] font-bold opacity-40 ml-1">{stat.unit}</span></p>
               </div>
             ))}
          </div>

          {/* 速度区间百分比堆叠图 */}
          <div className="space-y-6">
             <div className="flex items-center justify-between">
                <p className="text-11px font-black text-gray-500 uppercase tracking-[0.3em]">速度区间分布分析 / SPEED ZONES</p>
                <InfoIcon className="w-4 h-4 text-gray-700" />
             </div>
             <div className="bg-[#05080b] p-8 rounded-[2.5rem] border border-white/5 shadow-inner">
                <div className="flex flex-col gap-6">
                   <SpeedZoneBar zone="Z1-Z2 基础跑动" range="0-14.4 km/h" value={77} color="#4b5563" />
                   <SpeedZoneBar zone="Z3 中强度跑动" range="14.4-19.8 km/h" value={15} color="#3b82f6" />
                   <SpeedZoneBar zone="Z4 高强度跑动 (HSR)" range="19.8-25.2 km/h" value={5} color="#f59e0b" />
                   <SpeedZoneBar zone="Z5 极限冲刺" range=">25.2 km/h" value={3} color="#ef4444" />
                </div>
                <p className="text-[9px] text-gray-600 font-medium italic mt-8 text-center uppercase tracking-widest">数据由 GPS 运动捕捉系统同步提供 • 采样率: 10Hz</p>
             </div>
          </div>

          <div className="p-8 bg-blue-600/5 border border-blue-500/20 rounded-[2.5rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
                  <CoachIcon className="w-20 h-20" />
              </div>
              <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest mb-4">分析师建议 / INSIGHTS</p>
              <p className="text-base text-gray-300 font-medium leading-relaxed italic pr-12">
                “ 尽管该球员的总距离仅处于中游，但其 **HSR 占比极高 (8%)**，且多数爆发发生在防守转换的 5 秒窗口内。这表明其在职业体系中具备极佳的 **‘战术适应性爆发力’**，是拉夫堡模型下的典型高效能边锋。”
              </p>
          </div>
        </div>
      </div>
    </div>
  );
};
