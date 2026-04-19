import { routeConfigs } from '../data/routeConfigs';

const demos = routeConfigs.filter((item) => item.path !== '/');
const featured = demos.find((item) => item.path === '/llm-sketch-ppt');
const cinematic = demos.filter((item) =>
  ['/enterprise-hero', '/tesla-3d-website', '/aether'].includes(item.path)
);
const interfaceLab = demos.filter((item) =>
  ['/sci-fi-website', '/mech-ops'].includes(item.path)
);

const browsePaths = [
  {
    title: '先看讲解型内容',
    description: '如果你想先快速理解项目气质和内容表达方式，从手绘风的 LLM deck 开始最合适。',
    href: '/llm-sketch-ppt',
    action: 'Open LLM Deck'
  },
  {
    title: '再看品牌型页面',
    description: 'AETHER、Enterprise Hero 和 Tesla 这组更偏大视觉、叙事感和发布会气质。',
    href: '#cinematic',
    action: 'Browse Cinematic'
  },
  {
    title: '最后看界面实验',
    description: 'Sci-Fi Website 和 Mech-Ops 更像交互界面、操作台和系统面板方向的探索。',
    href: '#interface',
    action: 'Browse Interfaces'
  }
];

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
        <a href="#featured">开始浏览</a>
      </header>

      <section className="home-hero">
        <div className="home-hero-copy">
          <div className="home-eyebrow">Curated Visual Playground</div>
          <h1>
            Seven routes.
            <span>Three viewing modes.</span>
          </h1>
          <p>
            这个首页不再强调“技术迁移”，而是直接告诉你该怎么看：一条讲解型内容路线，一组品牌叙事型页面，
            再加一组偏 UI / HUD 的界面实验。你可以按浏览路径进入，也可以直接挑作品。
          </p>
          <div className="home-actions">
            <a className="primary" href={featured.path}>
              先看 {featured.name}
            </a>
            <a href="#cinematic">看品牌叙事组</a>
            <a href="#interface">看界面实验组</a>
          </div>
        </div>

        <aside className="home-hero-meta">
          <div className="home-meta-card">
            <span className="meta-label">Featured Start</span>
            <span className="meta-value">{featured.name}</span>
            <div className="meta-note">{featured.summary}</div>
          </div>
          <div className="home-meta-card">
            <span className="meta-label">Cinematic Routes</span>
            <span className="meta-value">{cinematic.length} pages</span>
            <div className="meta-note">大视觉、品牌氛围、产品发布会和未来感粒子场。</div>
          </div>
          <div className="home-meta-card">
            <span className="meta-label">Interface Lab</span>
            <span className="meta-value">{interfaceLab.length} pages</span>
            <div className="meta-note">更偏操作系统面板、控制台和赛博 UI 语言。</div>
          </div>
        </aside>
      </section>

      <section className="home-paths" id="featured">
        {browsePaths.map((item, index) => (
          <a key={item.title} href={item.href} className={`home-path-card tone-${index + 1}`}>
            <span className="home-path-index">Path</span>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <strong>{item.action}</strong>
          </a>
        ))}
      </section>

      <section className="home-section tone-cinematic" id="cinematic">
        <div className="home-section-head">
          <span>Cinematic Routes</span>
          <h2>品牌叙事与发布会气质</h2>
          <p>适合先看整体氛围、品牌语气、视觉叙事节奏和大块面的动态构图。</p>
        </div>
        <div className="home-grid">
          {cinematic.map((item) => (
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

      <section className="home-section tone-interface" id="interface">
        <div className="home-section-head">
          <span>Interface Lab</span>
          <h2>系统面板、UI 语言和操作台实验</h2>
          <p>这一组更像产品界面原型，强调信息密度、仪表布局、扫描感与 HUD 结构。</p>
        </div>
        <div className="home-grid">
          {[featured, ...interfaceLab].map((item) => (
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

      <section className="home-section tone-all" id="all">
        <div className="home-section-head">
          <span>All Routes</span>
          <h2>完整目录</h2>
          <p>如果你已经知道自己要找哪一类页面，直接从这里进入。</p>
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
