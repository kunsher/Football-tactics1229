
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TutorialStep {
  targetId: string;
  title: string;
  description: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

const STEPS: TutorialStep[] = [
  {
    targetId: 'tutorial-header',
    title: '战术控制中心',
    description: '欢迎，分析师！在这里你可以一键切换复盘、沙盒与百科。我们的导航现在移到了右侧，方便你随时调整身份信息。',
    position: 'bottom'
  },
  {
    targetId: 'tutorial-board',
    title: '深度交互战术板',
    description: 'SVG 动态渲染引擎可实时复现球员位移。点击球员图标可以解锁该球员的“战术指纹”和实战数据画像。',
    position: 'center'
  },
  {
    targetId: 'tutorial-controls',
    title: '时空进度控制器',
    description: '点击播放即可启动动态演练。配合不同倍速，你可以精细捕捉防线肋部被撕开的那个瞬间。',
    position: 'top'
  },
  {
    targetId: 'tutorial-phases',
    title: '战役解码阶段',
    description: '系统已将历史名局拆解为不同的博弈节点。点击对应标签，快速定位到该战术指令生效的关键时刻。',
    position: 'top'
  },
  {
    targetId: 'tutorial-analysis',
    title: '实时逻辑分析',
    description: '这里会自动捕捉场上动态并生成战术报告。悬停术语（如 Tiki-taka）还可激活动态演示效果。',
    position: 'left'
  },
  {
    targetId: 'tutorial-stats',
    title: '战术 DNA 画像',
    description: '利用多维数据拟合出的 DNA 画像，量化展示了战队在压迫、控球、纪律性等关键维度的实战水平。',
    position: 'left'
  }
];

export const TutorialOverlay: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const [highlightRect, setHighlightRect] = useState({ top: 0, left: 0, width: 0, height: 0 });

  const currentStep = STEPS[currentStepIndex];

  useEffect(() => {
    const updatePosition = () => {
      const element = document.getElementById(currentStep.targetId);
      if (element) {
        const rect = element.getBoundingClientRect();
        setHighlightRect({
          top: rect.top - 4,
          left: rect.left - 4,
          width: rect.width + 8,
          height: rect.height + 8
        });

        // 计算 Tooltip 位置
        let top = 0;
        let left = 0;
        const offset = 24;

        switch (currentStep.position) {
          case 'bottom':
            top = rect.bottom + offset;
            left = rect.left + rect.width / 2 - 160;
            break;
          case 'top':
            top = rect.top - 210 - offset;
            left = rect.left + rect.width / 2 - 160;
            break;
          case 'left':
            top = rect.top + rect.height / 2 - 100;
            left = rect.left - 340 - offset;
            break;
          case 'right':
            top = rect.top + rect.height / 2 - 100;
            left = rect.right + offset;
            break;
          case 'center':
            top = rect.top + rect.height / 2 - 100;
            left = rect.left + rect.width / 2 - 160;
            break;
        }

        // 视图边界安全修正
        left = Math.max(16, Math.min(window.innerWidth - 336, left));
        top = Math.max(16, Math.min(window.innerHeight - 240, top));

        setTooltipPos({ top, left });
      }
    };

    updatePosition();
    // 延迟一帧确保 DOM 更新
    const timer = setTimeout(updatePosition, 50);
    window.addEventListener('resize', updatePosition);
    return () => {
        window.removeEventListener('resize', updatePosition);
        clearTimeout(timer);
    };
  }, [currentStepIndex, currentStep.targetId, currentStep.position]);

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] pointer-events-none">
      {/* 遮罩背景 */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] pointer-events-auto" onClick={onClose}></div>

      {/* 高亮区域孔洞 - 加上脉冲动画 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`highlight-${currentStepIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'absolute',
            top: highlightRect.top,
            left: highlightRect.left,
            width: highlightRect.width,
            height: highlightRect.height,
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.75)',
            borderRadius: '16px',
            border: '2px solid rgba(59, 130, 246, 0.8)',
            pointerEvents: 'none'
          }}
          className="transition-all duration-500 ease-in-out tutorial-highlight-pulse"
        />
      </AnimatePresence>

      {/* Tooltip 内容 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`tooltip-${currentStepIndex}`}
          initial={{ opacity: 0, y: 15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            position: 'absolute',
            top: tooltipPos.top,
            left: tooltipPos.left,
            width: '320px',
            pointerEvents: 'auto'
          }}
          className="bg-[#0a0f14] border border-blue-500/40 p-8 rounded-[2rem] shadow-[0_30px_70px_rgba(0,0,0,0.9)] z-10 backdrop-blur-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-blue-500/30">
              分析师入门 STEP {currentStepIndex + 1}/{STEPS.length}
            </span>
            <button onClick={onClose} className="text-gray-600 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
              跳过
            </button>
          </div>

          <h3 className="text-xl font-black text-white mb-3 tracking-tighter">
            {currentStep.title}
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed font-medium mb-8 italic">
            {currentStep.description}
          </p>

          <div className="flex gap-4">
            <button
              onClick={handleNext}
              className="flex-grow py-4 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-blue-600/20 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {currentStepIndex === STEPS.length - 1 ? '开始分析之旅' : '下一步'}
              <span className="text-lg leading-none">→</span>
            </button>
          </div>

          {/* 装饰性小角 */}
          <div className={`absolute w-4 h-4 bg-[#0a0f14] border-blue-500/40 transform rotate-45 pointer-events-none hidden md:block
            ${currentStep.position === 'bottom' ? '-top-2 left-1/2 -translate-x-1/2 border-l border-t' : 
              currentStep.position === 'top' ? '-bottom-2 left-1/2 -translate-x-1/2 border-r border-b' : 
              currentStep.position === 'left' ? '-right-2 top-1/2 -translate-y-1/2 border-r border-t' : 
              currentStep.position === 'right' ? '-left-2 top-1/2 -translate-y-1/2 border-l border-b' : ''}
          `}></div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
