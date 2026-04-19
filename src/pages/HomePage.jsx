import { useRef, useEffect, useCallback, useState } from 'react';
import { routeConfigs } from '../data/routeConfigs';

const demos = routeConfigs.filter((item) => item.path !== '/');

const toneByPath = {
  '/mars-landing': 'cryo',
  '/spacex-official': 'lunar',
  '/llm-sketch-ppt': 'paper',
  '/enterprise-hero': 'signal',
  '/sci-fi-website': 'matrix',
  '/tesla-3d-website': 'chrome',
  '/aether': 'prism',
  '/mech-ops': 'tactical',
  '/retro-pixel': 'arcade',
  '/glassmorphism-dashboard': 'glass',
  '/banking-app': 'signal',
  '/thermodynamics': 'thermal',
};

/* ===== Hero animated canvas ===== */
function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let frame, time = 0;

    const orbs = [
      { x: 0.18, y: 0.3, r: 0.5, speed: 0.4, color: [0, 210, 255] },
      { x: 0.72, y: 0.45, r: 0.55, speed: 0.3, color: [100, 50, 255] },
      { x: 0.45, y: 0.6, r: 0.45, speed: 0.35, color: [0, 240, 180] },
      { x: 0.85, y: 0.25, r: 0.3, speed: 0.5, color: [140, 100, 255] },
    ];

    const dots = Array.from({ length: 80 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0006,
      vy: (Math.random() - 0.5) * 0.0004,
      r: Math.random() * 1.8 + 0.4,
      a: Math.random() * 0.6 + 0.1,
      phase: Math.random() * Math.PI * 2,
    }));

    let cw = 0, ch = 0;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cw = rect.width; ch = rect.height;
      canvas.width = cw * dpr; canvas.height = ch * dpr;
      canvas.style.width = cw + 'px'; canvas.style.height = ch + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      time += 0.008;
      ctx.clearRect(0, 0, cw, ch);

      // Animated orbs with sinusoidal motion
      for (let i = 0; i < orbs.length; i++) {
        const orb = orbs[i];
        const cx = (orb.x + Math.sin(time * orb.speed + i * 1.8) * 0.12) * cw;
        const cy = (orb.y + Math.cos(time * orb.speed * 0.7 + i * 2.3) * 0.1) * ch;
        const rr = (orb.r + Math.sin(time * 0.5 + i) * 0.05) * Math.max(cw, ch);
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rr);
        const [r, g, b] = orb.color;
        grad.addColorStop(0, `rgba(${r},${g},${b},0.35)`);
        grad.addColorStop(0.25, `rgba(${r},${g},${b},0.18)`);
        grad.addColorStop(0.5, `rgba(${r},${g},${b},0.06)`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, cw, ch);
      }

      // Particles with pulsing opacity
      for (const d of dots) {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > 1) d.vx *= -1;
        if (d.y < 0 || d.y > 1) d.vy *= -1;
        const pulse = 0.5 + 0.5 * Math.sin(time * 2 + d.phase);
        const alpha = d.a * (0.4 + pulse * 0.6);
        ctx.beginPath();
        ctx.arc(d.x * cw, d.y * ch, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(120,210,255,${alpha})`;
        ctx.fill();
      }

      // Particle connections
      ctx.lineWidth = 0.6;
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = (dots[i].x - dots[j].x) * cw;
          const dy = (dots[i].y - dots[j].y) * ch;
          const dist = dx * dx + dy * dy;
          if (dist < 10000) {
            const alpha = (1 - dist / 10000) * 0.12;
            ctx.beginPath();
            ctx.moveTo(dots[i].x * cw, dots[i].y * ch);
            ctx.lineTo(dots[j].x * cw, dots[j].y * ch);
            ctx.strokeStyle = `rgba(100,200,255,${alpha})`;
            ctx.stroke();
          }
        }
      }

      frame = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="index-hero-canvas" />;
}

/* ===== Scroll reveal hook ===== */
function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ===== Card with stagger ===== */
function Card({ item, tone, index }) {
  const [ref, visible] = useScrollReveal();
  return (
    <a
      ref={ref}
      className={`index-card ${tone}`}
      href={item.path}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transitionDelay: `${(index % 3) * 80 + Math.floor(index / 3) * 40}ms`,
      }}
    >
      <div className="index-card-head">
        <span className="index-card-label">{item.label}</span>
        <span className="index-card-path">{item.path}</span>
      </div>
      <h2>{item.name}</h2>
      <p>{item.summary}</p>
      <div className="index-card-tags">
        {item.tags.slice(0, 3).map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </a>
  );
}

/* ===== Main page ===== */
export default function HomePage() {
  const gridRef = useRef(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => { setHeroVisible(true); }, []);

  const handleGridMouseMove = useCallback((e) => {
    const cards = gridRef.current?.querySelectorAll('.index-card');
    if (!cards) return;
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
    }
  }, []);

  return (
    <div className="index-page">
      <div className="index-noise" />

      <header className="index-header">
        <a className="index-brand" href="/">
          <span className="index-brand-mark">CC</span>
          <div className="index-brand-copy">
            <strong>CC Design Demo</strong>
            <span>{demos.length} visual experiments</span>
          </div>
        </a>
        <a className="index-latest" href="/thermodynamics">Latest drop</a>
      </header>

      <main className="index-main">
        <section className="index-hero">
          <HeroCanvas />
          <div className={`index-hero-content ${heroVisible ? 'revealed' : ''}`}>
            <span className="index-hero-kicker">Design vault / 2026</span>
            <h1>
              A launchpad for
              <span>cinematic one-off interfaces.</span>
            </h1>
            <p>高保真概念页集中编排的入口。每个页面保留独立 URL，适合直接分享预览链接。</p>
          </div>
        </section>

        <div className="index-grid" ref={gridRef} onMouseMove={handleGridMouseMove}>
          {demos.map((item, i) => (
            <Card
              key={item.path}
              item={item}
              tone={toneByPath[item.path] ?? 'signal'}
              index={i}
            />
          ))}
        </div>
      </main>

      <footer className="index-footer">
        <span>CC Design Demo / {demos.length} routes</span>
      </footer>
    </div>
  );
}
