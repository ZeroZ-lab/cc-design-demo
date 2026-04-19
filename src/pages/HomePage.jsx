import { routeConfigs } from '../data/routeConfigs';

const demos = routeConfigs.filter((item) => item.path !== '/');
const featured = demos.find((item) => item.path === '/llm-sketch-ppt');

export default function HomePage() {
  return (
    <main className="home-shell">
      <header className="home-topbar">
        <div className="home-brand">
          <div className="home-brand-mark" />
          <div>
            <strong>CC DESIGN DEMO</strong>
            <span>Visual routes, interface experiments, and motion studies</span>
          </div>
        </div>
        <a href="#projects">浏览作品</a>
      </header>

      <section className="home-hero">
        <div className="home-hero-copy">
          <div className="home-eyebrow">React Visual Collection</div>
          <h1>
            Seven routes.
            <span>One simple directory.</span>
          </h1>
          <p>
            这里就是一个直接的作品入口页。每张卡片对应一个独立页面，你可以从手绘风的 LLM deck 开始，
            也可以直接点进品牌页、界面实验页或控制台风格页面。
          </p>
          <div className="home-actions">
            <a className="primary" href={featured.path}>
              先看 {featured.name}
            </a>
            <a href="/aether">打开 AETHER</a>
            <a href="/mech-ops">打开 Mech-Ops</a>
          </div>
        </div>

        <aside className="home-hero-meta">
          <div className="home-meta-card">
            <span className="meta-label">Featured</span>
            <span className="meta-value">{featured.name}</span>
            <div className="meta-note">{featured.summary}</div>
          </div>
          <div className="home-meta-card">
            <span className="meta-label">Routes</span>
            <span className="meta-value">{demos.length} pages</span>
            <div className="meta-note">所有作品都从同一个 React 应用路由出去，结构简单，适合直接预览。</div>
          </div>
          <div className="home-meta-card">
            <span className="meta-label">Format</span>
            <span className="meta-value">Landing + Demos</span>
            <div className="meta-note">首页只做导航，不再额外分类，点开卡片直接进入对应页面。</div>
          </div>
        </aside>
      </section>

      <section className="home-section" id="projects">
        <div className="home-section-head">
          <span>All Projects</span>
          <h2>作品目录</h2>
          <p>每张卡片就是一个独立页面，直接进入即可。</p>
        </div>
        <div className="home-grid">
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
        </div>
      </section>
    </main>
  );
}
