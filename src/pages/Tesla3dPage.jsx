import { useEffect, useRef } from 'react';

const modelRows = [
  ['Model S', '405 mi', '1.99s', 'Plaid flagship'],
  ['Model 3', '358 mi', '3.1s', 'Daily electric'],
  ['Model X', '348 mi', '2.5s', 'Family performance'],
  ['Model Y', '330 mi', '3.5s', 'Compact utility']
];

const autopilotItems = [
  ['Vision stack', '统一感知车道、车辆、行人和路面状态。'],
  ['Over-the-air cadence', '功能和视觉都可以继续通过同一代码库快速演进。'],
  ['Launch-page polish', '重构后依旧保留高端产品发布会式的节奏和陈列方式。']
];

export default function Tesla3dPage() {
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

    function drawCar() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      context.clearRect(0, 0, width, height);
      context.fillStyle = '#030303';
      context.fillRect(0, 0, width, height);

      const glow = context.createRadialGradient(width * 0.5, height * 0.52, 0, width * 0.5, height * 0.52, 420);
      glow.addColorStop(0, 'rgba(232,33,39,0.24)');
      glow.addColorStop(1, 'rgba(232,33,39,0)');
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      context.save();
      context.translate(width * 0.5, height * 0.54);
      context.scale(1 + Math.sin(tick * 0.04) * 0.01, 1);

      context.strokeStyle = '#f1f1f1';
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(-240, 56);
      context.quadraticCurveTo(-170, -14, -78, -28);
      context.quadraticCurveTo(0, -72, 114, -46);
      context.quadraticCurveTo(194, -22, 242, 54);
      context.lineTo(200, 70);
      context.lineTo(-212, 70);
      context.closePath();
      context.stroke();

      context.strokeStyle = '#e82127';
      context.beginPath();
      context.moveTo(-136, 5);
      context.quadraticCurveTo(-28, -56, 106, -20);
      context.stroke();

      context.beginPath();
      context.arc(-152, 72, 42, 0, Math.PI * 2);
      context.arc(154, 72, 42, 0, Math.PI * 2);
      context.stroke();
      context.restore();

      animationId = requestAnimationFrame(drawCar);
      tick += 1;
    }

    resize();
    drawCar();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <main className="tesla-react-page">
      <canvas ref={canvasRef} className="tesla-react-canvas" />

      <nav className="tesla-react-nav">
        <a href="/">← Directory</a>
        <div className="tesla-react-logo">TESLA</div>
        <div className="tesla-react-nav-copy">Launch page rebuilt in React</div>
      </nav>

      <section className="tesla-react-hero">
        <div className="tesla-react-badge">Experience the future</div>
        <h1>
          Product launch theatrics,
          <span>without legacy templates.</span>
        </h1>
        <p>
          Hero 视觉、车型陈列和 autopilot 内容区已经迁成 React 页面。现在后续加动效、拆组件和接真实数据都更直接。
        </p>
      </section>

      <section className="tesla-react-models">
        {modelRows.map(([name, range, zero, note]) => (
          <article key={name} className="tesla-react-model-card">
            <h2>{name}</h2>
            <p>{note}</p>
            <div className="tesla-react-model-stats">
              <span>{range}</span>
              <span>{zero}</span>
            </div>
          </article>
        ))}
      </section>

      <section className="tesla-react-autopilot">
        <div className="tesla-react-bar" />
        {autopilotItems.map(([title, text]) => (
          <article key={title} className="tesla-react-autopilot-item">
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
