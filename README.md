# 基于 Web 可视化技术的足球科普系统 ⚽️
### —— 面向球迷的数字化战术解码平台

![Version](https://img.shields.io/badge/Version-2.1_EVOLVE-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Gemini](https://img.shields.io/badge/AI-Gemini_3.0-orange?style=for-the-badge&logo=google-gemini)
![Tailwind](https://img.shields.io/badge/CSS-Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🌟 项目简介

本项目是一款专为足球爱好者设计的**数字化战术科普与模拟平台**。它打破了传统战术分析“门槛高、枯燥”的痛点，利用前沿的 Web 可视化技术将复杂的战术逻辑转化为丝滑的动态交互体验。

通过集成的 **Google Gemini 3.0 大模型**，系统能够像专家一样“阅读”场上坐标流，为球迷实时拆解名帅博弈背后的深层逻辑。

---

## 🚀 核心特性

### 1. 交互式战术复盘 (Tactical Simulation)
*   **高性能渲染引擎**：自研基于 SVG 的声明式路径算法，在 Web 端实现 22 人同屏 60FPS 的极致流畅度。
*   **经典战役库**：复刻了 2011 欧冠决赛 (Tiki-taka) 等多场历史名局。
*   **多维数据拟合**：集成 Recharts 绘制战术 DNA 雷达图，量化评估阵型性能。

### 2. AI 战术解析专家 (AI Decoder)
*   **语义化转译**：利用 Gemini 3 API 对实时球员坐标进行结构化分析。
*   **专家级点评**：自动生成关于空间利用、压迫强度及潜在进攻威胁的深度见解。

### 3. 战术实验室 (Tactical Sandbox)
*   **自由创作模式**：支持任意拖拽球员、绘制传球线路及标记防守区域。
*   **阵型预设**：一键切换 4-3-3、4-4-2 等主流阵型。

### 4. 战术百科与学习路径 (Knowledge & Paths)
*   **动态术语表**：提供 Tiki-taka、伪九号、肋部空间等核心术语的动态演示。
*   **体系化课程**：从“入门”到“精通”的阶梯式模块化学习。

---

## 🛠 技术架构

### 前端工程化 (Frontend)
- **核心框架**：React 19 (Concurrent Rendering)
- **视觉层**：Tailwind CSS + Framer Motion (交互反馈)
- **渲染层**：SVG Vector Graphics (动态战术板)
- **数据层**：Recharts (DNA 画像) + TypeScript 5 (强类型规范)

### 智能与后端 (Logic & AI)
- **AI 引擎**：Google Gemini 3.0 (Flash/Pro)
- **模拟服务**：Mock API Service (RESTful 架构模拟)
- **持久化**：LocalStorage (本地存档与学习进度)

---

## 📁 目录结构

```text
.
├── components/          # 核心交互组件 (战术板、分析面板、沙盒等)
├── services/            # 模拟后端 API 服务
├── types/               # 战术元数据类型定义
├── constants/           # 战术库、术语库、学习路径预设数据
├── types.ts             # 全局接口定义
├── App.tsx              # 应用入口逻辑
└── index.html           # 页面承载容器
```

---

## 🎓 学术背景

本系统作为**毕业设计工程项目**，重点研究了以下课题：
*   **课题名称**：基于 Web 可视化技术的足球科普系统设计与实现
*   **研究方向**：Web 高性能数据可视化、运动数据交互设计
*   **核心论点**：如何利用生成式 AI 与声明式绘图技术降低专业体育知识的获取门槛。

---

## 📦 快速开始

1.  **安装依赖**
    ```bash
    npm install
    ```
2.  **启动开发服务器**
    ```bash
    npm run dev
    ```
3.  **配置 AI**
    *   确保环境中已注入 `process.env.API_KEY` 以启用 AI 深度解码功能。

---

## 📝 许可证

本项目仅用于学术研究与个人学习，内容引用的足球历史数据版权归属相关赛事方。

---

**© 2024-2025 数字化足球战术研究报告 · 谢坤作品**