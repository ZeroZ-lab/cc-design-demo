import { useEffect, useMemo, useState } from 'react';

const slideData = [
  {
    kicker: '01 / Big Picture',
    title: 'LLM 不是魔法，\n是压缩后的语言规律。',
    note: '先看整体，再看细节',
    lead:
      '把海量文本喂给模型，本质上是在逼它学会一句话后面最有可能出现什么。只不过参数很多、上下文很长、表现看起来像“会思考”。',
    layout: 'hero',
    cards: [
      {
        type: 'sticky',
        tone: 'yellow',
        title: '训练目标',
        lines: ['给定上文', '预测下一个 token', '重复到参数收敛']
      },
      {
        type: 'panel',
        title: '你看到的能力',
        lines: ['续写', '总结', '翻译', '问答', '代码生成']
      },
      {
        type: 'panel',
        title: '底层统一机制',
        lines: ['token 化', 'embedding', 'attention', '采样输出']
      }
    ]
  },
  {
    kicker: '02 / Token',
    title: '第一步：\n把文本切成 token。',
    note: '词不是最小单位，token 才是',
    lead:
      '模型不直接看“句子”，而是看整数序列。一个 token 可能是一个字、半个词、一个标点，也可能是一整段高频字符串。',
    layout: 'grid',
    cards: [
      {
        type: 'card',
        title: '示例',
        lines: ['"ChatGPT 很强" → ["Chat", "G", "PT", " 很", "强"]', '最终映射成整数 id 序列']
      },
      {
        type: 'card',
        title: '为什么这样切',
        lines: ['兼顾常见片段复用率', '降低词表规模', '提高训练与推理效率']
      },
      {
        type: 'sticky',
        tone: 'blue',
        title: '直觉',
        lines: ['token 像乐高颗粒', '文本先拆块', '模型再拼回语言']
      },
      {
        type: 'sticky',
        tone: 'green',
        title: '影响',
        lines: ['上下文长度按 token 计费', '越长越贵', '越长越慢']
      }
    ]
  },
  {
    kicker: '03 / Embedding',
    title: '第二步：\n把 token 变成向量。',
    note: '整数 id 本身没有语义',
    lead:
      '模型会把每个 token 映射成高维向量。向量空间里，“程序员”和“工程师”可能更靠近，“香蕉”和“数据库”更远。',
    layout: 'grid',
    cards: [
      {
        type: 'panel',
        title: 'Embedding 在做什么',
        lines: ['把离散符号变成连续表示', '让“相似语义”更容易被模型感知']
      },
      {
        type: 'panel',
        title: 'Positional Encoding',
        lines: ['还要告诉模型顺序', '“我打你” 和 “你打我” 不能一样']
      },
      {
        type: 'sticky',
        tone: 'yellow',
        title: '一句话',
        lines: ['token = 编号', 'embedding = 有语义坐标的点']
      }
    ]
  },
  {
    kicker: '04 / Attention',
    title: '核心：\n让每个 token 看向重要上下文。',
    note: '这一步最像“理解”',
    lead:
      'Attention 不是把所有词一视同仁，而是动态决定“当前这个 token 应该重点参考谁”。这让模型能跨很长距离建立依赖。',
    layout: 'grid',
    cards: [
      {
        type: 'card',
        title: 'Q / K / V',
        lines: ['Query：我现在在找什么', 'Key：我能提供什么线索', 'Value：真正拿走的信息']
      },
      {
        type: 'card',
        title: '一个例子',
        lines: ['“小明把球给了小红，因为她……”', '“她” 会重点看向 “小红”']
      },
      {
        type: 'sticky',
        tone: 'pink',
        title: 'Multi-head',
        lines: ['一组头看语法', '一组头看指代', '一组头看主题']
      },
      {
        type: 'sticky',
        tone: 'green',
        title: '代价',
        lines: ['上下文越长', 'attention 计算越重']
      }
    ]
  },
  {
    kicker: '05 / Training',
    title: '训练阶段：\n用误差一点点修正参数。',
    note: '不是背答案，是做梯度更新',
    lead:
      '模型预测错了，就根据 loss 反向传播，把参数往“下次更像正确答案”的方向推一点点。这个过程重复数十亿次。',
    layout: 'grid',
    cards: [
      {
        type: 'panel',
        title: '训练循环',
        lines: ['前向计算', '算 loss', '反向传播', '更新参数']
      },
      {
        type: 'panel',
        title: '结果',
        lines: ['参数里沉淀了统计规律', '不是数据库式逐条存储']
      },
      {
        type: 'sticky',
        tone: 'blue',
        title: '预训练后',
        lines: ['模型会说话', '但不一定会按人类期望回答']
      },
      {
        type: 'sticky',
        tone: 'yellow',
        title: '对齐阶段',
        lines: ['SFT', 'RLHF / RLAIF', '安全策略与风格约束']
      }
    ]
  },
  {
    kicker: '06 / Inference',
    title: '推理阶段：\n一次只生成一个 token。',
    note: '看起来像连续输出，其实是逐 token 采样',
    lead:
      '模型每一步都会给出下一个 token 的概率分布。系统再结合 temperature、top-p、stop tokens 等策略，从里面挑一个继续往下写。',
    layout: 'grid',
    cards: [
      {
        type: 'card',
        title: 'Greedy',
        lines: ['总拿概率最高的 token', '稳定，但容易无聊']
      },
      {
        type: 'card',
        title: 'Sampling',
        lines: ['允许次高概率候选入场', '更自然，也更有创造性']
      },
      {
        type: 'sticky',
        tone: 'green',
        title: 'Temperature',
        lines: ['低：更保守', '高：更发散']
      },
      {
        type: 'sticky',
        tone: 'pink',
        title: 'Top-p',
        lines: ['只从累计概率前 p 的候选里选', '控制随机性的常用手段']
      }
    ]
  },
  {
    kicker: '07 / Product Layer',
    title: '真正可用的 AI 产品，\n不止是一个 base model。',
    note: '工程层决定体验上限',
    lead:
      '上线后的 AI 应用通常还会加 system prompt、tools、RAG、memory、guardrails、evals 和业务逻辑。模型只是中间大脑，不是整个系统。',
    layout: 'grid',
    cards: [
      {
        type: 'panel',
        title: '常见产品拼装件',
        lines: ['Prompt 规范', '检索增强 RAG', 'Tools / function calling', '安全拦截']
      },
      {
        type: 'panel',
        title: '为什么会“幻觉”',
        lines: ['它在生成最像真的回答', '不是在查询一个确定事实库']
      },
      {
        type: 'sticky',
        tone: 'yellow',
        title: '工程重点',
        lines: ['缩短上下文', '提高检索质量', '设计可恢复交互']
      },
      {
        type: 'sticky',
        tone: 'blue',
        title: '一句收尾',
        lines: ['模型负责概率生成', '系统负责把概率变成产品']
      }
    ]
  }
];

const themePresets = {
  paper: {
    paper: '#f4ead3',
    shadow: '#d8ccb2',
    ink: '#1f1a16',
    muted: '#5c544b',
    frame: '#171411',
    gridOpacity: 0.045
  },
  blueprint: {
    paper: '#d7e7f6',
    shadow: '#8ca8c4',
    ink: '#10253d',
    muted: '#345270',
    frame: '#081320',
    gridOpacity: 0.08
  },
  night: {
    paper: '#28231d',
    shadow: '#17120e',
    ink: '#f4ead3',
    muted: '#d1c3ac',
    frame: '#080706',
    gridOpacity: 0.05
  }
};

function SlideCard({ card }) {
  const className = `llm-${card.type} ${card.tone ? `tone-${card.tone}` : ''}`.trim();

  return (
    <article className={className}>
      <h3>{card.title}</h3>
      <div className="llm-card-lines">
        {card.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </article>
  );
}

function ReactDeckStage({ slides, theme, density, borderWidth }) {
  const [current, setCurrent] = useState(() => {
    const stored = Number.parseInt(localStorage.getItem('cc-react-deck-position') || '0', 10);
    return Number.isFinite(stored) ? Math.min(Math.max(stored, 0), slides.length - 1) : 0;
  });

  useEffect(() => {
    localStorage.setItem('cc-react-deck-position', String(current));
  }, [current]);

  useEffect(() => {
    function onKey(event) {
      if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault();
        setCurrent((value) => Math.min(value + 1, slides.length - 1));
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setCurrent((value) => Math.max(value - 1, 0));
      }
      if (event.key === 'Home') {
        event.preventDefault();
        setCurrent(0);
      }
      if (event.key === 'End') {
        event.preventDefault();
        setCurrent(slides.length - 1);
      }
    }

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [slides.length]);

  const palette = themePresets[theme];
  const currentSlide = slides[current];

  return (
    <div
      className={`llm-stage theme-${theme} density-${density}`}
      style={{
        '--paper': palette.paper,
        '--paper-shadow': palette.shadow,
        '--ink': palette.ink,
        '--muted': palette.muted,
        '--frame': palette.frame,
        '--accent-width': `${borderWidth}px`,
        '--grid-opacity': palette.gridOpacity
      }}
    >
      <a className="llm-home-link" href="/">
        ← Back to directory
      </a>

      <div className="llm-viewport">
        <section className="llm-slide">
          <div className="llm-paper-noise" />

          <header className="llm-slide-header">
            <div className="llm-kicker">{currentSlide.kicker}</div>
            <div className="llm-page-note">{currentSlide.note}</div>
          </header>

          <div className="llm-content">
            <h1>
              {currentSlide.title.split('\n').map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
            <p className="llm-lead">{currentSlide.lead}</p>

            <div className={`llm-card-layout layout-${currentSlide.layout}`}>
              {currentSlide.cards.map((card) => (
                <SlideCard key={`${currentSlide.kicker}-${card.title}`} card={card} />
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="llm-toolbar">
        <button onClick={() => setCurrent((value) => Math.max(value - 1, 0))}>‹</button>
        <div className="llm-counter">
          {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </div>
        <button onClick={() => setCurrent((value) => Math.min(value + 1, slides.length - 1))}>›</button>
      </div>
    </div>
  );
}

export default function LlmSketchPage() {
  const [theme, setTheme] = useState(() => localStorage.getItem('cc-react-llm-theme') || 'paper');
  const [density, setDensity] = useState(() => localStorage.getItem('cc-react-llm-density') || 'normal');
  const [borderWidth, setBorderWidth] = useState(() => Number(localStorage.getItem('cc-react-llm-border') || '4'));
  const [panelVisible, setPanelVisible] = useState(() => localStorage.getItem('cc-react-llm-panel') === 'true');

  useEffect(() => localStorage.setItem('cc-react-llm-theme', theme), [theme]);
  useEffect(() => localStorage.setItem('cc-react-llm-density', density), [density]);
  useEffect(() => localStorage.setItem('cc-react-llm-border', String(borderWidth)), [borderWidth]);
  useEffect(() => localStorage.setItem('cc-react-llm-panel', String(panelVisible)), [panelVisible]);

  const stats = useMemo(
    () => [
      ['Slides', String(slideData.length)],
      ['Style', 'Hand-drawn'],
      ['Mode', 'Pure React']
    ],
    []
  );

  return (
    <div className="llm-page-shell">
      <ReactDeckStage slides={slideData} theme={theme} density={density} borderWidth={borderWidth} />

      <button className="llm-tweaks-toggle" onClick={() => setPanelVisible((value) => !value)}>
        ⚙
      </button>

      <aside className={`llm-tweaks-panel ${panelVisible ? 'visible' : ''}`}>
        <h3>Tweaks</h3>
        <label>
          Theme
          <select value={theme} onChange={(event) => setTheme(event.target.value)}>
            <option value="paper">Paper</option>
            <option value="blueprint">Blueprint</option>
            <option value="night">Night</option>
          </select>
        </label>
        <label>
          Density
          <select value={density} onChange={(event) => setDensity(event.target.value)}>
            <option value="normal">Normal</option>
            <option value="compact">Compact</option>
          </select>
        </label>
        <label>
          Border Weight
          <input
            type="range"
            min="2"
            max="6"
            step="1"
            value={borderWidth}
            onChange={(event) => setBorderWidth(Number(event.target.value))}
          />
        </label>

        <div className="llm-tweaks-stats">
          {stats.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
