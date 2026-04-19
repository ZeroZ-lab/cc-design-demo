export default function HomePage() {
  return (
    <div className="shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark" />
          <div className="brand-copy">
            <strong>CC DESIGN DEMO</strong>
            <span>Static preview collection deployed on Vercel</span>
          </div>
        </div>
        <a href="#projects">浏览作品</a>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">Multi-page Vercel Preview</div>
          <h1>
            Ten demos.<span className="accent">One entrypoint.</span>
          </h1>
          <p>
            这个站点把九个独立的视觉实验整理到一个静态多页面入口下。根路径提供导航页，所有作品保留独立 URL，
            适合直接发 Vercel Preview 链接给别人查看。
          </p>
          <div className="hero-actions">
            <a className="primary" href="/mars-landing">
              Open Mars Landing
            </a>
            <a className="primary" href="/spacex-official">
              Open SpaceX Concept
            </a>
            <a className="primary" href="/llm-sketch-ppt">
              Open LLM Sketch PPT
            </a>
            <a href="/aether">Open AETHER</a>
            <a href="/enterprise-hero">Open Enterprise Hero</a>
          </div>
        </div>

        <aside className="hero-meta">
          <div className="meta-card">
            <span className="meta-label">Collection</span>
            <span className="meta-value">10 static design demos</span>
            <div className="meta-note">保持原始 HTML 页面不变，通过静态路由暴露稳定访问路径。</div>
          </div>
          <div className="meta-card">
            <span className="meta-label">Deploy mode</span>
            <span className="meta-value">Vercel Preview</span>
            <div className="meta-note">不引入构建链，不使用 SSR，只部署当前目录中的静态文件。</div>
          </div>
          <div className="meta-card">
            <span className="meta-label">Routes</span>
            <span className="meta-value">
              /, /mars-landing, /spacex-official, /llm-sketch-ppt, /enterprise-hero, /sci-fi-website,
              /tesla-3d-website, /aether, /mech-ops, /retro-pixel, /glassmorphism-dashboard
            </span>
          </div>
        </aside>
      </section>

      <main className="grid" id="projects">
        <a className="card enterprise" href="/mars-landing">
          <span className="card-tag">Mars Mission</span>
          <h2>
            ARES I
            <br />
            Mars Landing
          </h2>
          <p>电影级火星登月品牌发布页，强调红色地平线、任务倒计时和首次着陆时刻的史诗叙事。</p>
          <div className="card-footer">
            <span>Path</span>
            <strong>/mars-landing</strong>
          </div>
        </a>

        <a className="card enterprise" href="/spacex-official">
          <span className="card-tag">Aerospace</span>
          <h2>
            SpaceX
            <br />
            Official Concept
          </h2>
          <p>参考官方视觉气质的黑白极简航天落地页，强调任务舞台、参数叙事和重型发射系统氛围。</p>
          <div className="card-footer">
            <span>Path</span>
            <strong>/spacex-official</strong>
          </div>
        </a>

        <a className="card enterprise" href="/llm-sketch-ppt">
          <span className="card-tag">Presentation</span>
          <h2>
            LLM
            <br />
            Sketch PPT
          </h2>
          <p>手绘白板风网页演示，拆解 token、embedding、attention、训练、推理与局限。</p>
          <div className="card-footer">
            <span>Path</span>
            <strong>/llm-sketch-ppt</strong>
          </div>
        </a>

        <a className="card enterprise" href="/enterprise-hero">
          <span className="card-tag">Enterprise</span>
          <h2>
            NOVA
            <br />
            Enterprise Hero
          </h2>
          <p>高对比渐变、中心舞台式布局和沉浸式氛围，适合作为品牌首屏概念稿。</p>
          <div className="card-footer">
            <span>Path</span>
            <strong>/enterprise-hero</strong>
          </div>
        </a>

        <a className="card scifi" href="/sci-fi-website">
          <span className="card-tag">Sci-Fi</span>
          <h2>
            NEXUS
            <br />
            Quantum Interface
          </h2>
          <p>霓虹赛博风、扫描线和网格背景，强调科技感和未来交互界面语言。</p>
          <div className="card-footer">
            <span>Path</span>
            <strong>/sci-fi-website</strong>
          </div>
        </a>

        <a className="card tesla" href="/tesla-3d-website">
          <span className="card-tag">Automotive</span>
          <h2>
            Tesla
            <br />
            3D Website
          </h2>
          <p>偏产品营销页方向，整合 3D 画布、性能叙事和强视觉对比的汽车品牌页面。</p>
          <div className="card-footer">
            <span>Path</span>
            <strong>/tesla-3d-website</strong>
          </div>
        </a>

        <a className="card aether" href="/aether">
          <span className="card-tag">3D Interactive</span>
          <h2>
            AETHER
            <br />
            Quantum Particles
          </h2>
          <p>5000 颗粒子实时 WebGL 渲染，四种形态无缝变形，鼠标力场交互，单文件零构建。</p>
          <div className="card-footer">
            <span>Path</span>
            <strong>/aether</strong>
          </div>
        </a>

        <a className="card mech" href="/mech-ops">
          <span className="card-tag">Landscape / Mobile</span>
          <h2>
            MECH-OPS
            <br />
            管制面板
          </h2>
          <p>横屏机动兵器作战管制面板——雷达扫描、实时光学馈送、摇杆操控，手机横屏体验。</p>
          <div className="card-footer">
            <span>Path</span>
            <strong>/mech-ops</strong>
          </div>
        </a>

        <a className="card aether" href="/retro-pixel">
          <span className="card-tag">Retro / 8-Bit</span>
          <h2>
            PIXEL QUEST
            <br />
            像素冒险
          </h2>
          <p>8-bit 像素风 RPG 界面，CRT 扫描线、角色选择、回合制战斗和地牢迷宫地图。</p>
          <div className="card-footer">
            <span>Path</span>
            <strong>/retro-pixel</strong>
          </div>
        </a>

        <a className="card scifi" href="/glassmorphism-dashboard">
          <span className="card-tag">Data / Glass</span>
          <h2>
            POPULATION
            <br />
            Glass Dashboard
          </h2>
          <p>毛玻璃人口数据看板，3D 卡片倾斜交互、滚动差速分层和动态图表可视化。</p>
          <div className="card-footer">
            <span>Path</span>
            <strong>/glassmorphism-dashboard</strong>
          </div>
        </a>
      </main>

      <footer className="footer">Preview entry for the local static demo set.</footer>
    </div>
  );
}
