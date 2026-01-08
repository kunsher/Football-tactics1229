
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
    title: '欢迎来到战术实验室',
    description: '这是您的数字化战术复盘中心。在这里，您可以切换不同的功能板块，查看科普知识或进行战术模拟。',
    position: 'bottom'
  },
  {
    targetId: 'tutorial-board',
    title: '交互式战术板',
    description: '通过 SVG 渲染的高性能战术板。您可以悬停或点击球员图标，查看其详细的战术职责和生物特征参数。',
    position: 'center'
  },
  {
    targetId: 'tutorial-controls',
    title: '播放控制',
    description: '点击播放按钮即可看到 22 名球员根据真实战役数据进行同步位移。您还可以调整播放倍速，细致观察战术细节。',
    position: 'right'
  },
  {
    targetId: 'tutorial-phases',
    title: '战役阶段导航',
    description: '每场比赛被拆解为多个关键的战术阶段。点击不同的阶段按钮，快速定位到特定的博弈瞬间。',
    position: 'top'
  },
  {
    targetId: 'tutorial-analysis',
    title: '实时战术解码',
    description: '这里会自动将当前的坐标流转化为结构化的战术描述，帮助您从专业视角理解场上的空间利用与跑位逻辑。',
    position: 'left'
  },
  {
    targetId: 'tutorial-stats',
    title: '战术 DNA 与画像',
    description: '利用雷达图与多维数据，量化评估阵型的压迫强度、控球率及两队主帅的战术倾向。',
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
          top: rect.top - 8,
          left: rect.left - 8,
          width: rect.width + 16,
          height: rect.height + 16
        });

        // 计算 Tooltip 位置
        let top = 0;
        let left = 0;
        const offset = 20;

        switch (currentStep.position) {
          case 'bottom':
            top = rect.bottom + offset;
            left = rect.left + rect.width / 2 - 160;
            break;
          case 'top':
            top = rect.top - 200 - offset;
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

        // 边界修正
        left = Math.max(20, Math.min(window.innerWidth - 340, left));
        top = Math.max(20, Math.min(window.innerHeight - 250, top));

        setTooltipPos({ top, left });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [currentStepIndex]);

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

      {/* 高亮区域孔洞 */}
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
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.7)',
            borderRadius: '16px',
            border: '2px solid rgba(59, 130, 246, 0.5)',
            pointerEvents: 'none'
          }}
          className="transition-all duration-500 ease-in-out"
        />
      </AnimatePresence>

      {/* Tooltip 内容 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`tooltip-${currentStepIndex}`}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            top: tooltipPos.top,
            left: tooltipPos.left,
            width: '320px',
            pointerEvents: 'auto'
          }}
          className="bg-gray-900 border border-blue-500/30 p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-10 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-500/20">
              新手引导 STEP {currentStepIndex + 1}/{STEPS.length}
            </span>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
              跳过
            </button>
          </div>

          <h3 className="text-lg font-black text-white mb-2 tracking-tight">
            {currentStep.title}
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed font-medium mb-6">
            {currentStep.description}
          </p>

          <div className="flex gap-3">
            <button
              onClick={handleNext}
              className="flex-grow py-3 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-black uppercase tracking-widest rounded-xl shadow-lg transition-all active:scale-95"
            >
              {currentStepIndex === STEPS.length - 1 ? '开始探索' : '下一步'}
            </button>
          </div>

          {/* 装饰性箭头或指示器 */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-900 border-l border-t border-blue-500/30 transform rotate-45 pointer-events-none hidden md:block"></div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
