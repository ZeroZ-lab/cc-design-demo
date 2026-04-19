import { lazy } from 'react';

const LlmSketchPage = lazy(() => import('../pages/LlmSketchPage'));
const AetherPage = lazy(() => import('../pages/AetherPage'));
const EnterpriseHeroPage = lazy(() => import('../pages/EnterpriseHeroPage'));
const SciFiWebsitePage = lazy(() => import('../pages/SciFiWebsitePage'));
const Tesla3dPage = lazy(() => import('../pages/Tesla3dPage'));
const SpaceXOfficialPage = lazy(() => import('../pages/SpaceXOfficialPage'));
const MechOpsPage = lazy(() => import('../pages/MechOpsPage'));
const RetroPixelPage = lazy(() => import('../pages/RetroPixelPage'));
const GlassmorphismDashboardPage = lazy(() => import('../pages/GlassmorphismDashboardPage'));

export const routeConfigs = [
  {
    path: '/',
    title: 'CC Design Demo',
    label: 'Overview',
    name: 'CC Design Demo',
    summary: '八个独立视觉实验与一个手绘式 LLM 讲解 deck 的统一入口。',
    accent: 'linear-gradient(135deg, #49d8ff, #ff5f87)',
    tags: ['React shell', 'Multi-route', 'Vercel-ready'],
    component: HomePageFallback
  },
  {
    path: '/llm-sketch-ppt',
    title: 'LLM 技术原理 · 手绘风格 Web PPT',
    label: 'LLM Sketch',
    name: 'LLM 手绘讲解',
    summary: '用纸张、批注、便签和讲义式结构解释 LLM 的 token、注意力与推理流程。',
    accent: 'linear-gradient(135deg, #d5533f, #d7a83f)',
    tags: ['Deck', 'Hand-drawn', 'Interactive tweaks'],
    component: LlmSketchPage
  },
  {
    path: '/aether',
    title: 'AETHER — Quantum Digital Experience',
    label: 'AETHER',
    name: 'AETHER',
    summary: '带粒子变形与玻璃感信息层的量子风数字体验页。',
    accent: 'linear-gradient(135deg, #00f0ff, #ff00aa)',
    tags: ['Three.js', 'Particles', 'Sci-fi'],
    component: AetherPage
  },
  {
    path: '/enterprise-hero',
    title: 'NOVA — 重新定义未来',
    label: 'Enterprise Hero',
    name: 'Enterprise Hero',
    summary: '偏品牌广告片风格的企业级 hero 页面，强调视频感渐变和大字标题。',
    accent: 'linear-gradient(135deg, #ff2d55, #00d4ff)',
    tags: ['Brand', 'Animated canvas', 'Hero'],
    component: EnterpriseHeroPage
  },
  {
    path: '/sci-fi-website',
    title: 'NEXUS — Quantum Interface',
    label: 'Sci-Fi Website',
    name: 'Sci-Fi Website',
    summary: '赛博 UI 风格的全页面概念站点，包含网格背景、指标和面板式布局。',
    accent: 'linear-gradient(135deg, #00f0ff, #ffaa00)',
    tags: ['Cyber UI', 'Metrics', 'Grid motion'],
    component: SciFiWebsitePage
  },
  {
    path: '/tesla-3d-website',
    title: 'Tesla — Experience the Future',
    label: 'Tesla 3D',
    name: 'Tesla 3D Website',
    summary: '偏高端产品发布会风格的 Tesla 概念站点，带 3D hero 和性能可视化。',
    accent: 'linear-gradient(135deg, #ffffff, #e82127)',
    tags: ['Three.js', 'Product launch', 'Automotive'],
    component: Tesla3dPage
  },
  {
    path: '/spacex-official',
    title: 'SpaceX — Making Life Multiplanetary',
    label: 'SpaceX',
    name: 'SpaceX Official',
    summary: '参考 SpaceX 官网气质的黑白极简航天品牌页，强调任务叙事、参数感与发射舞台。',
    accent: 'linear-gradient(135deg, #ffffff, #6b87b8)',
    tags: ['Aerospace', 'Editorial', 'Minimal'],
    component: SpaceXOfficialPage
  },
  {
    path: '/mech-ops',
    title: 'MECH-OPS // 机动兵器作战管制面板',
    label: 'Mech-Ops',
    name: 'Mech-Ops',
    summary: '横屏机甲作战面板，包含雷达、监控、告警和操控区。',
    accent: 'linear-gradient(135deg, #00ff88, #00e5ff)',
    tags: ['HUD', 'Control panel', 'Live feed'],
    component: MechOpsPage
  },
  {
    path: '/retro-pixel',
    title: 'PIXEL QUEST — 8-Bit Retro Adventure',
    label: 'Retro Pixel',
    name: 'Pixel Quest',
    summary: '8-bit 像素风复古游戏界面，CRT 扫描线、角色选择、战斗面板和地牢地图。',
    accent: 'linear-gradient(135deg, #33ff33, #ffb000)',
    tags: ['8-Bit', 'CRT', 'Pixel art', 'RPG UI'],
    component: RetroPixelPage
  },
  {
    path: '/glassmorphism-dashboard',
    title: 'WORLD POPULATION — Glassmorphism Data Dashboard',
    label: 'Glass Dashboard',
    name: 'Glassmorphism Dashboard',
    summary: '毛玻璃人口数据看板，3D 卡片倾斜、滚动差速层和动态图表可视化。',
    accent: 'linear-gradient(135deg, #4fc3f7, #b388ff)',
    tags: ['Glassmorphism', '3D tilt', 'Parallax', 'Data viz'],
    component: GlassmorphismDashboardPage
  }
];

function HomePageFallback() {
  return null;
}
