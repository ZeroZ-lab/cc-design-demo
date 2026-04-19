import { useEffect, useRef } from 'react';

const metricCards = [
  ['98.4%', 'Signal coherence', '跨页面视觉语言已经统一到 React 路由结构。'],
  ['14 ms', 'Interaction pulse', '悬浮、层级和边框反馈都由组件样式管理。'],
  ['32', 'Composable modules', '后续可以继续把 section 拆成更细粒度的设计模块。'],
  ['24/7', 'Preview uptime', '现在部署后所有路由都通过同一个应用入口访问。']
];

const modules = [
  ['Command lattice', '统一承接导航、状态条和页面英雄区的信息密度。'],
  ['Spec panels', '适合陈列产品能力、架构摘要或概念性功能块。'],
  ['Metric rails', '把抽象的品牌气质转成可量化、可陈列的界面元素。']
];

export default function SciFiWebsitePage() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext('2d');
    let animationId = 0;
    let tick = 0;

    function resize() {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function draw() {
      tick += 1;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      context.fillStyle = '#07101b';
      context.fillRect(0, 0, window.innerWidth, window.innerHeight);

      context.strokeStyle = 'rgba(0,240,255,0.12)';
      context.lineWidth = 1;
      const gap = 48;
      const offset = (tick * 0.4) % gap;
      for (let x = -gap; x < window.innerWidth + gap; x += gap) {
        context.beginPath();
        context.moveTo(x + offset, 0);
        context.lineTo(x + offset, window.innerHeight);
        context.stroke();
      }
      for (let y = -gap; y < window.innerHeight + gap; y += gap) {
        context.beginPath();
        context.moveTo(0, y + offset);
        context.lineTo(window.innerWidth, y + offset);
        context.stroke();
      }

      const glow = context.createRadialGradient(
        window.innerWidth * 0.75,
        window.innerHeight * 0.2,
        0,
        window.innerWidth * 0.75,
        window.innerHeight * 0.2,
        420
      );
      glow.addColorStop(0, 'rgba(255,0,170,0.18)');
      glow.addColorStop(1, 'rgba(255,0,170,0)');
      context.fillStyle = glow;
      context.fillRect(0, 0, window.innerWidth, window.innerHeight);

      animationId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <main className="scifi-react-page">
      <canvas ref={canvasRef} className="scifi-react-canvas" />

      <nav className="scifi-react-nav">
        <a href="/">← Directory</a>
        <div className="scifi-react-logo">NEXUS</div>
        <div className="scifi-react-online">System online</div>
      </nav>

      <section className="scifi-react-hero">
        <div className="scifi-react-tag">Quantum interface</div>
        <h1>
          Cyber UI rebuilt
          <span>as real React sections.</span>
        </h1>
        <p>
          这个页面现在不再依赖 legacy HTML。背景网格、指标区块、模块化卡片和导航状态条都直接由 JSX 构成。
        </p>
      </section>

      <section className="scifi-react-metrics">
        {metricCards.map(([value, label, text]) => (
          <article key={label} className="scifi-react-metric">
            <strong>{value}</strong>
            <span>{label}</span>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className="scifi-react-modules">
        {modules.map(([title, text]) => (
          <article key={title} className="scifi-react-module">
            <div className="module-line" />
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
