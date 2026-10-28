import { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Clapperboard, Menu, Play, X } from 'lucide-react';

type DoodleKind = 'book' | 'film' | 'note' | 'star';
type SceneTone = 'warm' | 'cool';
const navigation = [
  { label: '首页', href: '#home' },
  { label: '剧本', href: '#scripts' },
  { label: 'AI 影像', href: '#films' },
  { label: '创作手记', href: '#journal' },
  { label: '关于', href: '#about' },
];

function Doodle({ kind, size = 52 }: { kind: DoodleKind; size?: number }) {
  const paths: Record<DoodleKind, React.ReactNode> = {
    book: <><path d="M6 12 Q18 8 29 15 Q38 9 54 12 L55 48 Q40 44 29 51 Q17 44 6 48 Z" /><path d="M29 15 L29 51 M13 20 Q19 17 24 21 M37 21 Q44 18 49 20 M15 37 L16 38 M22 37 L23 38 M39 37 L40 38 M45 37 L46 38 M17 43 Q21 46 25 43 M41 43 Q44 46 47 43" /></>,
    film: <><path d="M12 24 L50 17 L55 27 L18 35 Z M17 35 L53 28 L53 51 Q51 54 47 54 L15 54 Q10 54 10 49 L10 37 Z" /><path d="M22 23 L30 32 M37 20 L45 29 M18 40 L18 43 M29 40 L29 43 M24 48 Q32 52 38 47 M53 8 L57 10 M44 5 L44 10 M34 9 L37 13" /></>,
    note: <><path d="M12 7 Q29 6 48 9 L49 54 Q30 52 13 55 Z M18 19 L38 19 M18 26 L40 26 M18 33 L35 33" /><path d="M22 42 L23 43 M36 42 L37 43 M26 48 Q31 51 35 47 M10 12 L7 10 M52 14 L56 10" /></>,
    star: <><path d="M30 7 Q34 25 53 30 Q35 34 30 53 Q26 35 7 30 Q26 26 30 7 Z" /><path d="M9 8 L13 12 M50 10 L47 14 M10 52 L14 48" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 62 62" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">{paths[kind]}</svg>;
}

function SceneArt({ tone = 'warm' }: { tone?: SceneTone }) {
  const cool = tone === 'cool';
  return (
    <svg className={'scene-art ' + (cool ? 'scene-art-cool' : '')} viewBox="0 0 720 520" role="img" aria-label="用于排版演示的原创山峦与楼阁概念插画，并非正式作品画面" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={'sky-' + tone} x1="0" y1="0" x2="1" y2="1"><stop stopColor={cool ? '#c4d6d9' : '#f5cbb5'} /><stop offset=".58" stopColor={cool ? '#b6c7c4' : '#f5d9bd'} /><stop offset="1" stopColor={cool ? '#e2e0d2' : '#fae4cc'} /></linearGradient>
        <linearGradient id={'lake-' + tone} x1="0" y1="0" x2="0" y2="1"><stop stopColor={cool ? '#9fb3ab' : '#d1b29e'} /><stop offset="1" stopColor={cool ? '#536f72' : '#8f8c83'} /></linearGradient>
      </defs>
      <rect width="720" height="520" fill={'url(#sky-' + tone + ')'} />
      <circle cx="520" cy="115" r="57" fill={cool ? '#f4f5e8' : '#fff1d1'} opacity=".85" />
      <path d="M0 302 L120 202 L202 274 L326 152 L434 275 L531 192 L720 307 L720 520 L0 520Z" fill={cool ? '#91a8a9' : '#c7a8a7'} opacity=".67" />
      <path d="M0 345 L118 268 L234 328 L365 235 L459 316 L612 254 L720 344 L720 520 L0 520Z" fill={cool ? '#738e91' : '#a48f93'} opacity=".78" />
      <path d="M0 388 Q124 350 236 370 T500 365 T720 377 L720 520 L0 520Z" fill={'url(#lake-' + tone + ')'} />
      <path d="M0 430 Q140 405 260 424 T515 418 T720 425 M60 458 Q192 440 314 452 T700 451 M200 481 Q328 467 470 483" stroke={cool ? '#e5e4d8' : '#f7dac7'} strokeWidth="2" opacity=".4" fill="none" />
      <g transform="translate(330 222)" fill={cool ? '#354c54' : '#504a51'}>
        <path d="M-98 59 L0 10 L100 60 L90 65 L-87 65 Z" />
        <path d="M-70 66 H72 V102 H-70Z" />
        <path d="M-116 108 L0 56 L122 110 L110 115 H-104Z" />
        <path d="M-80 116 H85 V171 H-80Z" />
        <path d="M-125 176 L0 130 L130 179 L120 188 H-118Z" />
        <path d="M-86 189 H87 V234 H-86Z" />
        <path d="M-10 0 L0 -28 L10 0 Z" />
      </g>
      <g fill={cool ? '#c8c0a6' : '#f3ba81'} opacity=".84"><rect x="299" y="340" width="13" height="29" rx="2" /><rect x="340" y="340" width="13" height="29" rx="2" /><rect x="380" y="340" width="13" height="29" rx="2" /><rect x="304" y="292" width="10" height="19" rx="2" /><rect x="374" y="292" width="10" height="19" rx="2" /></g>
      <g stroke={cool ? '#3d6569' : '#6b6c68'} strokeWidth="6" strokeLinecap="round" opacity=".65"><path d="M20 520 Q55 408 25 325 M690 520 Q656 380 707 310" /><path d="M25 354 L5 330 M32 386 L66 345 M674 399 L709 354 M663 441 L635 386" /></g>
      <g fill={cool ? '#5f8180' : '#a27c82'} opacity=".7"><ellipse cx="21" cy="329" rx="60" ry="38" /><ellipse cx="78" cy="339" rx="44" ry="28" /><ellipse cx="700" cy="312" rx="70" ry="40" /><ellipse cx="638" cy="339" rx="53" ry="30" /></g>
      <g fill={cool ? '#f5f4e3' : '#fff3d4'} opacity=".65"><circle cx="162" cy="127" r="3" /><circle cx="232" cy="66" r="2" /><circle cx="604" cy="219" r="3" /></g>
    </svg>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div><p className="section-description">{description}</p></div>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  useEffect(() => {
    const closeOnEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); setShowInfo(false); }
    };
    document.addEventListener('keydown', closeOnEsc);
    return () => document.removeEventListener('keydown', closeOnEsc);
  }, []);
  return (
    <div className="site" id="home">
      <a className="skip-link" href="#works">跳到作品</a>
      <div className="topline"><span>一份关于故事和画面的个人作品集</span><span>STORIES · SCRIPTS · VISUALS</span></div>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="雪雪 · 返回首页"><span className="brand-mark">雪雪<span className="brand-dot">.</span></span><span className="brand-en">XUEXUE / CREATIVE PORTFOLIO</span></a>
        <button type="button" className="menu-toggle" aria-label={menuOpen ? '关闭导航' : '打开导航'} aria-expanded={menuOpen} aria-controls="primary-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        <nav className={'nav ' + (menuOpen ? 'nav-open' : '')} id="primary-nav" aria-label="主要导航">
          {navigation.map(({ label, href }) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </nav>
        <a className="header-contact" href="#about">聊聊合作 <ArrowUpRight size={16} /></a>
      </header>
      <main>
        <section className="hero section-wrap" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="section-number"><span className="number-line" /> HELLO, THIS IS MY CREATIVE SPACE</div>
            <div className="hero-headline">
              <h1 id="hero-title">编织故事，<br /><span>也创造画面。</span></h1>
              <span className="hero-scribble" aria-hidden="true"><svg viewBox="0 0 260 26" preserveAspectRatio="none"><path d="M5 15 Q75 2 128 12 T255 6" fill="none" stroke="#e9ab61" strokeWidth="5" strokeLinecap="round" /></svg></span>
            </div>
            <p className="hero-role">编剧创作 <span className="times">×</span> AI 影像制作</p>
            <p className="hero-description">从故事的第一行字，到镜头里的每一帧。<br />在这里，记录正在发生的创作。</p>
            <div className="hero-actions"><a className="button button-dark" href="#works">观看作品 <ArrowRight size={17} /></a><a className="button button-outline" href="#about">了解我 <ArrowUpRight size={16} /></a></div>
            <div className="hero-bottom"><span className="hero-index">01 <span>/</span> 05</span><span>向下探索</span><ArrowDownRight size={18} /></div>
          </div>
          <div className="hero-media" aria-label="原创概念插画区域">
            <div className="media-tape media-tape-top" aria-hidden="true" />
            <div className="hero-frame"><SceneArt /><span className="frame-label">VISUAL STUDY · 排版概念示意</span></div>
            <div className="media-tape media-tape-bottom" aria-hidden="true" />
            <span className="hero-side-note">IMAGINE<br />THE SCENE!</span>
            <span className="doodle-float"><Doodle kind="film" size={72} /></span>
            <span className="media-caption">STORY IN MOTION <span>↗</span></span>
            <span className="orange-star" aria-hidden="true"><Doodle kind="star" size={35} /></span>
          </div>
        </section>

        <section className="gateway section-wrap" id="works" aria-labelledby="gateway-title">
          <div className="gateway-top"><p className="eyebrow">EXPLORE MY WORK</p><h2 id="gateway-title">两个世界，一种创作。</h2><p>文字承载故事，影像让想象拥有形状。</p></div>
          <div className="gateway-grid">
            <a className="gateway-card" href="#scripts"><div className="gateway-icon"><Doodle kind="book" size={57} /></div><div><span className="gateway-no">01 / WRITING</span><h3>剧本创作</h3><p>故事 · 人物 · 世界观</p></div><ArrowUpRight className="gateway-arrow" size={24} /></a>
            <a className="gateway-card" href="#films"><div className="gateway-icon"><Doodle kind="film" size={57} /></div><div><span className="gateway-no">02 / FILMMAKING</span><h3>AI 影像</h3><p>角色 · 分镜 · 场景</p></div><ArrowUpRight className="gateway-arrow" size={24} /></a>
            <a className="gateway-card gateway-note" href="#journal"><div className="gateway-icon"><Doodle kind="note" size={57} /></div><div><span className="gateway-no">03 / JOURNAL</span><h3>创作手记</h3><p>过程 · 灵感 · 尝试</p></div><ArrowUpRight className="gateway-arrow" size={24} /></a>
          </div>
        </section>

        <section className="featured section-wrap" aria-labelledby="featured-title">
          <SectionHeading eyebrow="SELECTED WORK / 作品一览" title="从文字，到镜头。" description="这里会逐渐收录经过确认、适合公开的作品片段。现在先呈现新版的展示结构。" />
          <div className="featured-grid">
            <a className="featured-card" href="#scripts">
              <div className="featured-visual featured-script"><span className="visual-top">STORY / 001</span><div className="script-art"><span>故事还在继续</span><i /><i /><i /></div><span className="corner-stamp">SCRIPT</span></div>
              <div className="featured-meta"><div><span className="eyebrow">WRITING · 剧本</span><h3>故事的第一行</h3><p>公开节选整理中 · 展示位示意</p></div><ArrowUpRight size={23} /></div>
            </a>
            <a className="featured-card" href="#films">
              <div className="featured-visual"><SceneArt tone="cool" /><span className="visual-top visual-top-light">VISUAL / 002</span><span className="film-art-stamp"><Clapperboard size={16} /> 概念画面 / 非正式作品</span></div>
              <div className="featured-meta"><div><span className="eyebrow">VISUAL · AI 影像</span><h3>让想象进入画面</h3><p>演示片段待补充 · 展示位示意</p></div><ArrowUpRight size={23} /></div>
            </a>
          </div>
          <p className="privacy-hint"><span className="hint-mark">✳</span> 这里展示的插画与文字为新版样式演示，并非已公开的个人作品或可播放的视频。</p>
        </section>

        <section className="detail-section section-wrap" id="scripts">
          <SectionHeading eyebrow="01 / SCRIPT WRITING" title="剧本，写下故事的可能。" description="故事梗概、人物关系与精选节选，会以适合阅读的方式呈现。完整剧本不在公开网站提供。" />
          <div className="detail-panel detail-script"><div className="detail-graphic"><Doodle kind="book" size={90} /><span>WORDS BECOME WORLDS</span></div><div className="detail-body"><p className="eyebrow">WRITING / COMING SOON</p><h3>作品节选正在整理</h3><p>等公开范围和稿件确认后，这里会呈现真实的剧本简介与试读内容。暂不使用未经核实的示例剧本。</p><span className="small-note">仅公开确认过的节选 · 全文私下提供</span></div></div>
        </section>

        <section className="detail-section section-wrap" id="films">
          <SectionHeading eyebrow="02 / AI FILMMAKING" title="有些故事，想用画面来讲。" description="人物、场景、分镜与视频片段会构成影像作品档案。此处先展示新布局，不冒充正式成片。" />
          <div className="detail-panel detail-film"><div className="detail-image"><SceneArt /><span className="placeholder-tag">ILLUSTRATION PLACEHOLDER · 非作品画面</span></div><div className="detail-body"><p className="eyebrow">VISUAL / COMING SOON</p><h3>影像演示片段待上线</h3><p>后续替换为获得公开许可的真实视频、封面和制作说明。不会使用虚构片长，也不会设置无法播放的假按钮。</p><span className="small-note">只展示已确认可公开的演示内容</span></div></div>
        </section>

        <section className="journal section-wrap" id="journal">
          <SectionHeading eyebrow="03 / CREATIVE PROCESS" title="一点点创作的痕迹。" description="好的故事通常不是一次就写成的。这里预留给人物设定、画面实验和制作过程。" />
          <div className="journal-grid"><div className="journal-tile"><span>01</span><Doodle kind="note" /><h3>故事的草稿</h3><p>从一个念头，慢慢长出人物与冲突。</p></div><div className="journal-tile"><span>02</span><Doodle kind="book" /><h3>角色的模样</h3><p>把想象中的人，变成可以被看见的形象。</p></div><div className="journal-tile"><span>03</span><Doodle kind="film" /><h3>镜头的尝试</h3><p>让画面与情绪找到恰当的节奏。</p></div></div>
        </section>

        <section className="about section-wrap" id="about">
          <div className="about-intro"><p className="eyebrow">A NOTE FROM ME</p><h2>认真讲故事，<br />也认真玩创作。</h2><span className="about-doodle"><Doodle kind="star" size={50} /></span></div>
          <div className="about-copy"><p>这是一个关于剧本与 AI 影像的个人作品空间。我希望故事既能被阅读，也能以另一种方式被看见。</p><p>现阶段优先整理作品与创作过程，面向求职与合作交流。经确认的公开作品将陆续补充。</p><button className="text-action" type="button" onClick={() => setShowInfo(!showInfo)} aria-expanded={showInfo} aria-controls="contact-info">关于联系和完整作品 <ArrowRight size={17} /></button>{showInfo && <div id="contact-info" className="contact-info" role="status">完整作品可私下交流；正式联系渠道尚待确认，测试版不会展示虚构邮箱。</div>}</div>
        </section>
      </main>
      <footer className="footer section-wrap"><a className="footer-brand" href="#home">雪雪<span>.</span></a><span>STORIES ARE STILL BEING MADE.</span><a href="#home">回到顶部 ↑</a><span className="footer-doodle"><Doodle kind="film" size={42} /></span></footer>
    </div>
  );
}
