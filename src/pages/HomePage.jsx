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
  '/security-digital-twin': 'sentinel',
  '/iphone-home-showcase': 'chrome',
};

/* ===== Hero animated canvas — soft aurora blobs ===== */
function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let frame, time = 0;

    const blobs = [
      { x: 0.25, y: 0.38, r: 0.58, speed: 0.22, color: [20, 100, 240], phase: 0 },
      { x: 0.72, y: 0.42, r: 0.50, speed: 0.18, color: [90, 55, 220], phase: 2.1 },
      { x: 0.48, y: 0.58, r: 0.42, speed: 0.28, color: [0, 185, 160], phase: 4.3 },
    ];

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
      time += 0.004;
      ctx.clearRect(0, 0, cw, ch);

      for (const blob of blobs) {
        const cx = (blob.x + Math.sin(time * blob.speed + blob.phase) * 0.13) * cw;
        const cy = (blob.y + Math.cos(time * blob.speed * 0.7 + blob.phase) * 0.09) * ch;
        const rr = blob.r * Math.max(cw, ch);
        const [r, g, b] = blob.color;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rr);
        grad.addColorStop(0, `rgba(${r},${g},${b},0.30)`);
        grad.addColorStop(0.20, `rgba(${r},${g},${b},0.15)`);
        grad.addColorStop(0.50, `rgba(${r},${g},${b},0.04)`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, cw, ch);
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
