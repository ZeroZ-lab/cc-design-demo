import { routeConfigs } from '../data/routeConfigs';

const demoRoutes = routeConfigs.filter((item) => item.path !== '/');
const featuredPaths = ['/mars-landing', '/spacex-official', '/llm-sketch-ppt'];
const featuredRoutes = featuredPaths
  .map((path) => demoRoutes.find((item) => item.path === path))
  .filter(Boolean);
const archiveRoutes = demoRoutes.filter((item) => !featuredPaths.includes(item.path));
const uniqueTags = new Set(demoRoutes.flatMap((item) => item.tags));
const routeCount = demoRoutes.length;

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
  '/glassmorphism-dashboard': 'glass'
};

function getRouteTone(path) {
  return toneByPath[path] ?? 'signal';
}

export default function HomePage() {
  return (
    <div className="overview-page">
      <div className="overview-noise" />

      <header className="overview-topbar">
        <div className="overview-topbar-inner">
          <a className="overview-brand" href="/">
            <span className="overview-brand-mark">CC</span>
            <span className="overview-brand-copy">
              <strong>CC Design Demo</strong>
              <span>Curated visual experiments in one React shell</span>
            </span>
          </a>

          <nav className="overview-nav" aria-label="Homepage sections">
            <a href="#featured">Featured</a>
            <a href="#archive">Archive</a>
            <a href="/mars-landing">Latest drop</a>
          </nav>
        </div>
      </header>

      <main className="overview-shell">
        <section className="overview-hero">
          <div className="overview-hero-copy">
            <div className="overview-kicker">Design vault / 2026 selection</div>
            <h1>
              A launchpad for
              <span> cinematic one-off interfaces.</span>
            </h1>
            <p>
              这是一个把高保真概念页集中编排的入口，不再只是“作品链接列表”。首页负责做策展：
              先给出气质，再给出精选，再把全部实验按强视觉类别整理成可快速浏览的档案。
            </p>

            <div className="overview-hero-actions">
              <a className="overview-button primary" href="/mars-landing">
                Enter ARES I
              </a>
              <a className="overview-button" href="#featured">
                Browse highlights
              </a>
            </div>
          </div>

          <aside className="overview-hero-aside">
            <div className="overview-signal-card">
              <span className="eyebrow">Collection status</span>
              <strong>{routeCount} live demos</strong>
              <p>由同一套 React 路由托管，每个页面保留独立 URL，适合直接分享预览链接。</p>
            </div>

            <div className="overview-stat-grid">
              <div className="overview-stat-card">
                <span className="label">Formats</span>
                <strong>Landing / Deck / HUD</strong>
              </div>
              <div className="overview-stat-card">
                <span className="label">Tags</span>
                <strong>{uniqueTags.size} visual signals</strong>
              </div>
              <div className="overview-stat-card">
                <span className="label">Deploy</span>
                <strong>Vercel-ready</strong>
              </div>
            </div>
          </aside>
        </section>

        <section className="overview-featured" id="featured">
          <div className="overview-section-head">
            <div>
              <span className="eyebrow">Featured drops</span>
              <h2>Three pages that set the tone.</h2>
            </div>
            <p>
              不把所有作品平铺到第一屏，而是先挑出三种最不同的表达方式：史诗航天、克制品牌、手绘讲解。
            </p>
          </div>

          <div className="overview-feature-grid">
            {featuredRoutes.map((item, index) => (
              <a key={item.path} className={`feature-card ${getRouteTone(item.path)}`} href={item.path}>
                <div className="feature-meta">
                  <span className="feature-index">0{index + 1}</span>
                  <span className="feature-path">{item.path}</span>
                </div>
                <div className="feature-body">
                  <span className="feature-label">{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                </div>
                <div className="feature-tags">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="overview-runway">
          <div className="overview-section-head compact">
            <div>
              <span className="eyebrow">Collection logic</span>
              <h2>One shell, many moods.</h2>
            </div>
          </div>

          <div className="overview-runway-grid">
            <article className="runway-panel">
              <span className="eyebrow">Why this homepage</span>
              <p>
                旧首页的问题不是信息不够，而是所有作品同权。新版本把首页设计成目录页和品牌页的混合体，
                先建立语气，再允许用户进入每一条分支。
              </p>
            </article>

            <article className="runway-panel">
              <span className="eyebrow">Visual spectrum</span>
              <ul>
                <li>Editorial aerospace and launch storytelling</li>
                <li>Cyber interfaces, tactical HUDs, and 3D concept scenes</li>
                <li>Sketch-style explanation decks and tactile retro systems</li>
              </ul>
            </article>

            <article className="runway-panel emphasis">
              <span className="eyebrow">Latest addition</span>
              <strong>ARES I / Mars Landing</strong>
              <p>作为当前集合里最完整的一页，它被放在首页首推位，并承担新视觉基调。</p>
              <a href="/mars-landing">Open latest mission</a>
            </article>
          </div>
        </section>

        <section className="overview-archive" id="archive">
          <div className="overview-section-head">
            <div>
              <span className="eyebrow">Full archive</span>
              <h2>Every route, still one click away.</h2>
            </div>
            <p>全部作品保留独立 URL，但编排从“均匀卡片墙”改成更像设计目录的卡片档案。</p>
          </div>

          <div className="overview-archive-grid">
            {archiveRoutes.map((item) => (
              <a key={item.path} className={`archive-card ${getRouteTone(item.path)}`} href={item.path}>
                <span className="archive-label">{item.label}</span>
                <h3>{item.name}</h3>
                <p>{item.summary}</p>
                <div className="archive-footer">
                  <span>{item.path}</span>
                  <span>{item.tags[0]}</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="overview-footer">
        <span>CC Design Demo / {routeCount} routes</span>
        <span>Built as a React collection shell for static visual experiments</span>
      </footer>
    </div>
  );
}
