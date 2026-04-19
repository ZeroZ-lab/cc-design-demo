import { routeConfigs } from '../data/routeConfigs';

const demos = routeConfigs.filter((item) => item.path !== '/');

export default function HomePage() {
  return (
    <main className="home-shell">
      <header className="home-topbar">
        <div className="home-brand">
          <div className="home-brand-mark" />
          <div>
            <strong>CC DESIGN DEMO</strong>
            <span>React refactor for all demo routes</span>
          </div>
        </div>
        <a href="#projects">浏览作品</a>
      </header>

      <section className="home-hero">
        <div className="home-hero-copy">
          <div className="home-eyebrow">React Multi-Route Refactor</div>
          <h1>
            One React shell.
            <span>Six demos and a hand-drawn LLM deck.</span>
          </h1>
          <p>
            这个版本把原来的静态 HTML 集合重构成了统一 React 应用。首页负责导航与摘要，
            每个 demo 保留原始视觉表现和独立访问路径，`llm-sketch-ppt` 也作为一级入口保留。
          </p>
          <div className="home-actions">
            <a className="primary" href="/llm-sketch-ppt">
              打开 LLM 手绘示例
            </a>
            <a href="/aether">打开 AETHER</a>
            <a href="/mech-ops">打开 Mech-Ops</a>
          </div>
        </div>

        <aside className="home-hero-meta">
          <div className="home-meta-card">
            <span className="meta-label">Routes</span>
            <span className="meta-value">{demos.length} demo routes</span>
            <div className="meta-note">所有页面都从同一个 React 应用路由出去。</div>
          </div>
          <div className="home-meta-card">
            <span className="meta-label">Architecture</span>
            <span className="meta-value">Vite + React + Router</span>
            <div className="meta-note">适合继续组件化和逐页深度重写，而不是继续堆静态入口文件。</div>
          </div>
          <div className="home-meta-card">
            <span className="meta-label">Featured</span>
            <span className="meta-value">LLM 手绘讲解 deck</span>
            <div className="meta-note">保留 slide stage、主题切换和参数 tweaks。</div>
          </div>
        </aside>
      </section>

      <section className="home-grid" id="projects">
        {demos.map((item) => (
          <a
            key={item.path}
            href={item.path}
            className="home-card"
            style={{ '--card-accent': item.accent }}
          >
            <div className="home-card-tag">{item.label}</div>
            <h2>{item.name}</h2>
            <p>{item.summary}</p>
            <div className="home-card-tags">
              {item.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="home-card-footer">
              <strong>{item.path}</strong>
              <span>Open</span>
            </div>
          </a>
        ))}
      </section>
    </main>
  );
}
