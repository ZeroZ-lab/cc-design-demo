import { useEffect, useMemo, useRef, useState } from 'react';

const systems = [
  ['Mobility', 'OK'],
  ['Targeting', 'OK'],
  ['Servo Sync', 'WARN'],
  ['Thermal Loop', 'OK'],
  ['Armor Grid', 'WARN'],
  ['Rail System', 'OK']
];

export default function MechOpsPage() {
  const radarRef = useRef(null);
  const [clock, setClock] = useState(() => new Date());
  const [gauges, setGauges] = useState({ power: 82, shield: 64, heat: 47, sync: 91 });
  const [logs, setLogs] = useState([
    '[11:48:01] Target acquisition stabilized',
    '[11:48:03] Armor grid rerouted to sector 02',
    '[11:48:05] Servo cluster latency within tolerance'
  ]);

  useEffect(() => {
    const timer = window.setInterval(() => setClock(new Date()), 1000);
    const jitter = window.setInterval(() => {
      setGauges((prev) => ({
        power: Math.max(20, Math.min(100, prev.power + (Math.random() * 8 - 4))),
        shield: Math.max(20, Math.min(100, prev.shield + (Math.random() * 10 - 5))),
        heat: Math.max(10, Math.min(100, prev.heat + (Math.random() * 12 - 6))),
        sync: Math.max(70, Math.min(100, prev.sync + (Math.random() * 6 - 3)))
      }));
    }, 1400);
    const logTimer = window.setInterval(() => {
      const lines = [
        'Recon pulse returned two airborne signatures',
        'Hydraulic pressure trimmed by 0.2 bar',
        'Pilot sync bias corrected',
        'External camera focus snapped to target',
        'Rail system charge window open'
      ];
      setLogs((prev) => [`[${new Date().toLocaleTimeString('en-GB')}] ${lines[Math.floor(Math.random() * lines.length)]}`, ...prev].slice(0, 6));
    }, 2200);

    return () => {
      clearInterval(timer);
      clearInterval(jitter);
      clearInterval(logTimer);
    };
  }, []);

  useEffect(() => {
    const canvas = radarRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext('2d');
    let animationId = 0;
    let sweep = 0;

    function resize() {
      const ratio = window.devicePixelRatio || 1;
      const size = canvas.clientWidth || 280;
      canvas.width = size * ratio;
      canvas.height = size * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function draw() {
      const size = canvas.clientWidth || 280;
      const center = size / 2;
      context.clearRect(0, 0, size, size);
      context.fillStyle = '#08110d';
      context.fillRect(0, 0, size, size);
      context.strokeStyle = 'rgba(0,255,136,0.16)';
      for (let ring = 1; ring <= 4; ring += 1) {
        context.beginPath();
        context.arc(center, center, ring * 32, 0, Math.PI * 2);
        context.stroke();
      }
      context.beginPath();
      context.moveTo(center, 0);
      context.lineTo(center, size);
      context.moveTo(0, center);
      context.lineTo(size, center);
      context.stroke();

      const sweepGradient = context.createRadialGradient(center, center, 0, center, center, 120);
      sweepGradient.addColorStop(0, 'rgba(0,255,136,0.35)');
      sweepGradient.addColorStop(1, 'rgba(0,255,136,0)');
      context.save();
      context.translate(center, center);
      context.rotate(sweep);
      context.fillStyle = sweepGradient;
      context.beginPath();
      context.moveTo(0, 0);
      context.arc(0, 0, 120, -0.2, 0.2);
      context.closePath();
      context.fill();
      context.restore();

      [[70, 48], [120, 102], [182, 164]].forEach(([x, y]) => {
        context.fillStyle = '#00ff88';
        context.beginPath();
        context.arc(x, y, 4, 0, Math.PI * 2);
        context.fill();
      });

      sweep += 0.03;
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

  const gaugeRows = useMemo(
    () => [
      ['Power', gauges.power, 'green'],
      ['Shield', gauges.shield, 'cyan'],
      ['Heat', gauges.heat, 'amber'],
      ['Sync', gauges.sync, 'green']
    ],
    [gauges]
  );

  return (
    <main className="mech-react-page">
      <header className="mech-react-header">
        <a href="/">← Directory</a>
        <div className="mech-react-logo">MECH-OPS</div>
        <div className="mech-react-clock">{clock.toLocaleTimeString('en-GB')}</div>
      </header>

      <section className="mech-react-dashboard">
        <aside className="mech-react-panel">
          <h2>Status rails</h2>
          {gaugeRows.map(([label, value, tone]) => (
            <div key={label} className="mech-react-gauge">
              <div className="mech-react-gauge-label">
                <span>{label}</span>
                <strong>{Math.round(value)}%</strong>
              </div>
              <div className="mech-react-gauge-track">
                <div className={`mech-react-gauge-fill ${tone}`} style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </aside>

        <section className="mech-react-panel mech-react-radar">
          <h2>Radar core</h2>
          <canvas ref={radarRef} className="mech-react-radar-canvas" />
        </section>

        <aside className="mech-react-panel">
          <h2>Systems</h2>
          <div className="mech-react-systems">
            {systems.map(([name, state]) => (
              <div key={name} className="mech-react-system-row">
                <span>{name}</span>
                <strong className={state === 'WARN' ? 'warn' : 'ok'}>{state}</strong>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="mech-react-log-panel">
        <h2>Ops log</h2>
        {logs.map((line) => (
          <div key={line} className="mech-react-log-line">
            {line}
          </div>
        ))}
      </section>
    </main>
  );
}
