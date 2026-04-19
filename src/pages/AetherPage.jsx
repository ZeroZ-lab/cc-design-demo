import { useEffect, useRef, useState } from 'react';

const shapeModes = ['sphere', 'torus', 'galaxy', 'helix'];

const featureCards = [
  ['Reactive particle field', '用原生 canvas 在 React 生命周期里驱动粒子场、形态切换和交互反馈。'],
  ['Glass information layer', '保留未来感玻璃卡片，但信息层本身变成可拆分的 React 组件。'],
  ['Route-level ownership', 'AETHER 现在由单独页面组件维护，不再依赖内嵌脚本模板。']
];

export default function AetherPage() {
  const canvasRef = useRef(null);
  const [shape, setShape] = useState('sphere');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext('2d');
    const pointer = { x: 0, y: 0 };
    let animationId = 0;
    let tick = 0;
    let particles = [];

    function resize() {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles = Array.from({ length: 180 }, (_, index) => ({
        angle: (index / 180) * Math.PI * 2,
        radius: 60 + Math.random() * 220,
        speed: 0.002 + Math.random() * 0.01,
        depth: Math.random() * 2 + 0.4,
        offset: Math.random() * Math.PI * 2
      }));
    }

    function getPoint(particle, mode) {
      const centerX = window.innerWidth * 0.5;
      const centerY = window.innerHeight * 0.42;
      const angle = particle.angle + tick * particle.speed + particle.offset;

      if (mode === 'torus') {
        return {
          x: centerX + Math.cos(angle) * (particle.radius * 0.72) + Math.cos(angle * 3) * 34,
          y: centerY + Math.sin(angle) * (particle.radius * 0.38) + Math.sin(angle * 2) * 24
        };
      }

      if (mode === 'galaxy') {
        const spiral = particle.radius * 0.85;
        return {
          x: centerX + Math.cos(angle + spiral * 0.008) * spiral,
          y: centerY + Math.sin(angle + spiral * 0.008) * spiral * 0.5
        };
      }

      if (mode === 'helix') {
        return {
          x: centerX + Math.cos(angle * 2) * 120 + Math.sin(angle * 3) * 18,
          y: centerY + ((particle.radius % 280) - 140) * 1.2 + Math.sin(angle * 4) * 8
        };
      }

      return {
        x: centerX + Math.cos(angle) * particle.radius * 0.62,
        y: centerY + Math.sin(angle) * particle.radius * 0.62
      };
    }

    function draw() {
      tick += 1;

      const background = context.createLinearGradient(0, 0, window.innerWidth, window.innerHeight);
      background.addColorStop(0, '#040812');
      background.addColorStop(0.5, '#070914');
      background.addColorStop(1, '#14081d');
      context.fillStyle = background;
      context.fillRect(0, 0, window.innerWidth, window.innerHeight);

      context.globalCompositeOperation = 'screen';

      particles.forEach((particle, index) => {
        const point = getPoint(particle, shape);
        const pullX = (pointer.x - window.innerWidth * 0.5) * 0.04 / particle.depth;
        const pullY = (pointer.y - window.innerHeight * 0.5) * 0.04 / particle.depth;
        const x = point.x + pullX;
        const y = point.y + pullY;
        const size = particle.depth * 2.2;

        const glow = context.createRadialGradient(x, y, 0, x, y, size * 8);
        glow.addColorStop(0, index % 4 === 0 ? 'rgba(255,0,170,0.9)' : 'rgba(0,240,255,0.85)');
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        context.fillStyle = glow;
        context.beginPath();
        context.arc(x, y, size * 8, 0, Math.PI * 2);
        context.fill();
      });

      context.globalCompositeOperation = 'source-over';
      animationId = window.requestAnimationFrame(draw);
    }

    function onPointerMove(event) {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    }

    resize();
    draw();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [shape]);

  return (
    <main className="aether-react-page">
      <canvas ref={canvasRef} className="aether-react-canvas" />
      <div className="aether-react-overlay">
        <nav className="aether-react-nav">
          <a href="/">← Directory</a>
          <div className="aether-react-logo">AETHER</div>
          <div className="aether-react-status">React-native rebuild</div>
        </nav>

        <section className="aether-react-hero">
          <div className="aether-react-eyebrow">Quantum interface</div>
          <h1>
            Particle drama,
            <span>without legacy script glue.</span>
          </h1>
          <p>
            这个页面已经改成 React 原生实现。粒子背景、形态切换和玻璃信息层都由组件和 hooks 控制，
            不再从旧静态 HTML 注入脚本。
          </p>
          <div className="aether-react-shapes">
            {shapeModes.map((mode) => (
              <button
                key={mode}
                className={shape === mode ? 'active' : ''}
                onClick={() => setShape(mode)}
              >
                {mode}
              </button>
            ))}
          </div>
        </section>

        <section className="aether-react-grid">
          {featureCards.map(([title, description]) => (
            <article key={title} className="aether-react-card">
              <h2>{title}</h2>
              <p>{description}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
