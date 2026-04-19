import { useEffect, useRef } from 'react';

const features = [
  ['Signal-native design systems', '把品牌语言、排版层级和演示场景统一到一个持续迭代的体验层。'],
  ['Preview-first workflow', '每个概念页都可以独立分享、独立验证、独立继续演化。'],
  ['Shipping velocity', '从静态设计稿过渡到 React 路由应用，减少后续重构摩擦。']
];

export default function EnterpriseHeroPage() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext('2d');
    let frame = 0;
    let animationId = 0;

    function resize() {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function drawBlob(x, y, radius, colors, drift) {
      const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, colors[0]);
      gradient.addColorStop(1, colors[1]);
      context.fillStyle = gradient;
      context.beginPath();
      context.ellipse(x, y, radius * 1.2, radius * 0.9, Math.sin(frame * 0.01 + drift), 0, Math.PI * 2);
      context.fill();
    }

    function render() {
      frame += 1;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const base = context.createLinearGradient(0, 0, window.innerWidth, window.innerHeight);
      base.addColorStop(0, '#080812');
      base.addColorStop(0.55, '#0f1223');
      base.addColorStop(1, '#1a1030');
      context.fillStyle = base;
      context.fillRect(0, 0, window.innerWidth, window.innerHeight);

      context.globalCompositeOperation = 'screen';
      drawBlob(window.innerWidth * 0.22, window.innerHeight * 0.34, 260, ['rgba(255,45,85,0.36)', 'rgba(255,45,85,0)'], 0.5);
      drawBlob(window.innerWidth * 0.68, window.innerHeight * 0.28, 320, ['rgba(0,212,255,0.3)', 'rgba(0,212,255,0)'], 1.2);
      drawBlob(
        window.innerWidth * 0.54 + Math.sin(frame * 0.01) * 20,
        window.innerHeight * 0.72 + Math.cos(frame * 0.014) * 16,
        340,
        ['rgba(110,44,255,0.28)', 'rgba(110,44,255,0)'],
        2.4
      );
      context.globalCompositeOperation = 'source-over';

      context.strokeStyle = 'rgba(255,255,255,0.05)';
      context.lineWidth = 1;
      for (let index = 0; index < 28; index += 1) {
        const y = index * 42 + ((frame * 0.15) % 42);
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(window.innerWidth, y);
        context.stroke();
      }

      animationId = window.requestAnimationFrame(render);
    }

    resize();
    render();
    window.addEventListener('resize', resize);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <main className="enterprise-react-page">
      <canvas ref={canvasRef} className="enterprise-react-canvas" />
      <div className="enterprise-react-grain" />

      <nav className="enterprise-react-nav">
        <a className="enterprise-react-back" href="/">
          ← Directory
        </a>
        <div className="enterprise-react-logo">NOVA</div>
        <div className="enterprise-react-status">React rebuild</div>
      </nav>

      <section className="enterprise-react-hero">
        <div className="enterprise-react-badge">
          <span className="dot" />
          Enterprise hero system
        </div>
        <h1>
          把品牌首页，
          <span>从静态概念稿推进到 React 交互层。</span>
        </h1>
        <p>
          这个页面已经不再依赖旧 HTML 模板，而是直接用 JSX、hooks 和 canvas 动效重写。后续可以继续拆成
          设计系统组件、内容模块和实验区块。
        </p>
        <div className="enterprise-react-actions">
          <a className="primary" href="https://github.com/ZeroZ-lab/cc-design-demo" target="_blank" rel="noreferrer">
            查看仓库
          </a>
          <a href="/llm-sketch-ppt">打开 LLM Deck</a>
        </div>
      </section>

      <section className="enterprise-react-grid">
        {features.map(([title, description]) => (
          <article key={title} className="enterprise-react-card">
            <div className="eyebrow">Capability</div>
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
