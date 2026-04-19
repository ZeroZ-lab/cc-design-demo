export default function ThermodynamicsPage() {
  return (
    <iframe
      src="/pages/thermodynamics-second-law.html"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        border: 'none',
      }}
      title="热力学第二定律 — 交互式教学"
    />
  );
}
