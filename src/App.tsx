import { useEffect, useState, type MouseEvent } from 'react';
import { ArrowRight, ArrowUpRight, House, UserRound } from 'lucide-react';

type DoodleKind = 'book' | 'film' | 'note' | 'star';
type SceneTone = 'warm' | 'cool';
type SectionId = 'home' | 'scripts' | 'films' | 'journal' | 'about';
const sections: SectionId[] = ['home', 'scripts', 'films', 'journal', 'about'];
const titles: Record<SectionId,string> = {home:'首页', scripts:'剧本创作', films:'AI 影像', journal:'创作手记',about:'关于我'};
function currentHash(): SectionId {
  const hash = window.location.hash.slice(1);
  return sections.includes(hash as SectionId) ? hash as SectionId : 'home';
}
const navigation = [
  { label: '首页', href: '#home' },
  { label: '剧本', href: '#scripts' },
  { label: 'AI 影像', href: '#films' },
  { label: '创作手记', href: '#journal' },
  { label: '关于', href: '#about' },
];

function Doodle({ kind, size = 52, interactive = false }: { kind: DoodleKind; size?: number; interactive?: boolean }) {
  const [snapCount, setSnapCount] = useState(0);
  const graphic = (
    <svg key={interactive ? snapCount : undefined} className={'doodle-svg doodle-' + kind + (interactive ? ' doodle-active' : '')} width={size} height={size} viewBox="0 0 62 62" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      {kind === 'book' && <>
        <path className="doodle-book-outline" d="M7 13 Q17 8 30 16 Q41 9 55 13 L54 49 Q41 45 30 52 Q18 45 7 49 Z" />
        <path d="M30 16 L30 52 M13 20 Q19 17 25 21 M36 21 Q43 17 49 20" />
        <path d="M17 30 L18 30 M23 30 L24 30 M38 30 L39 30 M44 30 L45 30" strokeWidth="4.5" />
        <path d="M17 38 Q21 42 25 38 M36 38 Q41 42 45 38 M17 44 L24 44 M37 44 L44 44" />
      </>}
      {kind === 'film' && <>
        <g className="doodle-film-clapper">
          <path d="M10 20 L48 11 L54 24 L15 34 Z" />
          <path d="M18 19 L25 28 M31 16 L38 25 M43 13 L49 22" />
        </g>
        <g className="doodle-film-body">
          <path d="M15 34 L53 26 L53 49 Q52 53 47 53 L15 53 Q10 53 10 48 L10 36 Z" />
          <path d="M19 39 L19 42 M29 37 L29 40" strokeWidth="4.5" />
          <path d="M22 47 Q31 52 40 46" />
        </g>
        <path d="M54 6 L57 8 M45 4 L45 8 M35 8 L38 11" strokeWidth="2.8" />
      </>}
      {kind === 'note' && <>
        <path d="M12 8 Q28 5 49 10 L48 53 Q30 50 13 55 Z" />
        <path d="M18 19 L39 18 M18 27 L41 26 M18 35 L35 34" />
        <path d="M22 43 L23 43 M36 42 L37 42" strokeWidth="4.5" />
        <path d="M25 49 Q30 52 35 48 M9 13 L6 11 M52 15 L56 11" />
      </>}
      {kind === 'star' && <>
        <path d="M30 7 Q34 24 53 30 Q35 34 30 53 Q26 35 7 30 Q26 26 30 7 Z" />
        <path d="M9 8 L13 12 M50 10 L47 14 M10 52 L14 48 M49 49 L52 52" />
      </>}
    </svg>
  );
  if (!interactive || kind !== 'film') return graphic;
  return <button className="doodle-trigger" type="button" aria-label="让场记板咔嗒一下" title="咔嗒" onClick={(event) => { event.preventDefault(); event.stopPropagation(); setSnapCount((count) => count + 1); }}>{graphic}</button>;
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
  const [showInfo, setShowInfo] = useState(false);
  const [activeSection,setActiveSection] = useState<SectionId>(currentHash);
  const navigate = (section: SectionId) => {
    setActiveSection(section);
    window.history.pushState(null, '', '#' + section);
    window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  };
  const onNavigate = (section: SectionId) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate(section);
  };
  useEffect(() => {
    const sync = () => setActiveSection(currentHash());
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {window.removeEventListener('popstate', sync);window.removeEventListener('hashchange', sync);};
  }, []);
  useEffect(() => {
    const closeOnEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setShowInfo(false); }
    };
    document.addEventListener('keydown', closeOnEsc);
    return () => document.removeEventListener('keydown', closeOnEsc);
  }, []);
  return (
    <div className="site" id="home">
      <a className="skip-link" href="#workspace-main">跳到主要内容</a>
      <div className="workspace-layout">
        <aside className="side-rail" aria-label="栏目导航">
          <div className="rail-top" aria-hidden="true"><Doodle kind="star" size={29} /><span>STUDIO</span></div>
          <nav className="rail-nav" id="primary-nav" aria-label="主要导航">
            {navigation.map(({ label, href }) => {
              const section = href.slice(1) as SectionId;
              const illustration = section === 'scripts' ? <Doodle kind="book" size={31} /> :
                section === 'films' ? <Doodle kind="film" size={31} /> :
                section === 'journal' ? <Doodle kind="note" size={31} /> :
                section === 'about' ? <UserRound size={26} strokeWidth={1.7} /> :
                <House size={27} strokeWidth={1.8} />;
              return <a key={href} href={href} aria-current={activeSection === section ? 'page' : undefined} onClick={onNavigate(section)}><span className="rail-nav-icon">{illustration}</span><span className="rail-nav-label">{label}</span></a>;
            })}
          </nav>
          <div className="rail-end" aria-hidden="true"><span className="rail-end-dot" /> MADE WITH STORIES</div>
        </aside>
        <div className={activeSection === "home" ? "workspace-main workspace-main-home" : "workspace-main"}>
      <div className="topline"><span>一份关于故事和画面的个人作品集</span><span>STORIES · SCRIPTS · VISUALS</span></div>
      <header className="site-header">
        <a className="brand" href="#home" onClick={onNavigate('home')} aria-label="雪雪 · 返回首页"><span className="brand-mark">雪雪<span className="brand-dot">.</span></span></a>
        <a className="header-contact" href="#about" onClick={onNavigate('about')}>聊聊合作 <ArrowUpRight size={16} /></a>
      </header>
      <div className="surface-stage">
      <main className={activeSection === "home" ? "site-main site-main-home" : "site-main"} id="workspace-main" tabIndex={-1}>
        {activeSection !== "home" && <div className="stage-context section-wrap"><span>EXPLORING / 0{sections.indexOf(activeSection)+1}</span><strong>{titles[activeSection]}</strong></div>}
        {activeSection === "home" && <div className="stage-enter home-screen" key="home">
        <section className="home-hero section-wrap" aria-labelledby="hero-title">
          <div className="home-intro">
            <div className="section-number"><span className="number-line" /> 故事与影像的双重创作</div>
            <h1 id="hero-title">编织故事，<br /><span>也创造画面。</span></h1>
            <p className="home-role">编剧创作 <span className="times">×</span> AI 影像制作</p>
            <p className="home-description">从故事的第一行字，到镜头里的每一帧。<br />让文字与影像，成为两种同样重要的表达。</p>
            <div className="home-actions">
              <a className="button button-dark" href="#scripts" onClick={onNavigate('scripts')}>剧本创作 <ArrowUpRight size={16} /></a>
              <a className="button button-outline" href="#films" onClick={onNavigate('films')}>AI 影像 <ArrowUpRight size={16} /></a>
            </div>
            <div className="home-signature"><span className="home-signature-dot" /><span>剧本创作 · 人物塑造 · AI 影像</span></div>
          </div>

          <div className="home-work-stage" aria-label="两条创作方向">
            <div className="home-work-heading"><span>两条创作主线</span><span>01 — 02</span></div>
            <div className="home-work-grid">
              <a className="home-work-card home-script-card" href="#scripts" onClick={onNavigate('scripts')}>
                <div className="home-card-visual home-script-visual">
                  <span className="home-work-index">01 / 剧本</span>
                  <div className="home-script-sheet" aria-hidden="true">
                    <span className="home-script-label">剧本节选 · 版式示意</span>
                    <strong>人物 · 情节 · 冲突</strong>
                    <span className="home-script-rule" />
                    <span className="home-script-rule short" />
                    <span className="home-script-rule" />
                    <span className="home-script-rule mid" />
                    <span className="home-script-rule short" />
                  </div>
                  <span className="home-script-doodle"><Doodle kind="book" size={42} /></span>
                  <span className="home-art-note">内容示意</span>
                </div>
                <div className="home-card-meta">
                  <span className="home-card-icon"><Doodle kind="book" size={28} /></span>
                  <span className="home-card-copy"><strong>剧本创作</strong><small>故事 · 人物 · 世界观</small></span>
                  <ArrowUpRight className="home-card-arrow" size={19} />
                </div>
              </a>

              <div className="home-work-card home-film-card">
                <a className="home-work-card-link" href="#films" onClick={onNavigate('films')}>
                  <div className="home-card-visual home-film-visual">
                    <span className="home-work-index">02 / 影像</span>
                    <div className="home-film-layout" aria-hidden="true">
                      <span className="home-film-number">镜头</span>
                      <div className="home-film-strip">
                        <span className="home-film-frame frame-one"><i /></span>
                        <span className="home-film-frame frame-two"><i /></span>
                        <span className="home-film-frame frame-three"><i /></span>
                      </div>
                      <span className="home-film-caption">角色 · 场景 · 镜头语言</span>
                    </div>
                    <span className="home-art-note">分镜排版示意</span>
                  </div>
                  <div className="home-card-meta">
                    <span className="home-card-icon"><Doodle kind="film" size={28} /></span>
                    <span className="home-card-copy"><strong>AI 影像</strong><small>角色 · 场景 · 镜头语言</small></span>
                    <ArrowUpRight className="home-card-arrow" size={19} />
                  </div>
                </a>
                <span className="home-film-doodle"><Doodle kind="film" size={39} interactive /></span>
              </div>
            </div>
          </div>
        </section>
        </div>}
        {activeSection === 'scripts' && <div className="stage-enter" key="scripts">
        <section className="detail-section section-wrap" id="scripts">
          <SectionHeading eyebrow="01 / SCRIPT WRITING" title="剧本，写下故事的可能。" description="故事梗概、人物关系与精选节选，会以适合阅读的方式呈现。完整剧本不在公开网站提供。" />
          <div className="detail-panel detail-script"><div className="detail-graphic"><Doodle kind="book" size={90} /><span>WORDS BECOME WORLDS</span></div><div className="detail-body"><p className="eyebrow">WRITING / COMING SOON</p><h3>作品节选正在整理</h3><p>等公开范围和稿件确认后，这里会呈现真实的剧本简介与试读内容。暂不使用未经核实的示例剧本。</p><span className="small-note">仅公开确认过的节选 · 全文私下提供</span></div></div>
        </section>

        </div>}
        {activeSection === 'films' && <div className="stage-enter" key="films">
        <section className="detail-section section-wrap" id="films">
          <SectionHeading eyebrow="02 / AI FILMMAKING" title="有些故事，想用画面来讲。" description="人物、场景、分镜与视频片段会构成影像作品档案。此处先展示新布局，不冒充正式成片。" />
          <div className="detail-panel detail-film"><div className="detail-image"><SceneArt /><span className="placeholder-tag">ILLUSTRATION PLACEHOLDER · 非作品画面</span></div><div className="detail-body"><p className="eyebrow">VISUAL / COMING SOON</p><h3>影像演示片段待上线</h3><p>后续替换为获得公开许可的真实视频、封面和制作说明。不会使用虚构片长，也不会设置无法播放的假按钮。</p><span className="small-note">只展示已确认可公开的演示内容</span></div></div>
        </section>

        </div>}
        {activeSection === 'journal' && <div className="stage-enter" key="journal">
        <section className="journal section-wrap" id="journal">
          <SectionHeading eyebrow="03 / CREATIVE PROCESS" title="一点点创作的痕迹。" description="好的故事通常不是一次就写成的。这里预留给人物设定、画面实验和制作过程。" />
          <div className="journal-grid"><div className="journal-tile"><span>01</span><Doodle kind="note" /><h3>故事的草稿</h3><p>从一个念头，慢慢长出人物与冲突。</p></div><div className="journal-tile"><span>02</span><Doodle kind="book" /><h3>角色的模样</h3><p>把想象中的人，变成可以被看见的形象。</p></div><div className="journal-tile"><span>03</span><Doodle kind="film" /><h3>镜头的尝试</h3><p>让画面与情绪找到恰当的节奏。</p></div></div>
        </section>

        </div>}
        {activeSection === 'about' && <div className="stage-enter" key="about">
        <section className="about section-wrap" id="about">
          <div className="about-intro"><p className="eyebrow">A NOTE FROM ME</p><h2>认真讲故事，<br />也认真玩创作。</h2><span className="about-doodle"><Doodle kind="star" size={50} /></span></div>
          <div className="about-copy"><p>这是一个关于剧本与 AI 影像的个人作品空间。我希望故事既能被阅读，也能以另一种方式被看见。</p><p>现阶段优先整理作品与创作过程，面向求职与合作交流。经确认的公开作品将陆续补充。</p><button className="text-action" type="button" onClick={() => setShowInfo(!showInfo)} aria-expanded={showInfo} aria-controls="contact-info">关于联系和完整作品 <ArrowRight size={17} /></button>{showInfo && <div id="contact-info" className="contact-info" role="status">完整作品可私下交流；正式联系渠道尚待确认，测试版不会展示虚构邮箱。</div>}</div>
        </section>
        </div>}
      </main>
      </div>
      <footer className="footer section-wrap"><a className="footer-brand" href="#home" onClick={onNavigate('home')}>雪雪<span>.</span></a><span>STORIES ARE STILL BEING MADE.</span><a href="#home" onClick={onNavigate('home')}>返回首页 ↑</a><span className="footer-doodle"><Doodle kind="film" size={42} interactive /></span></footer>
        </div>
      </div>
    </div>
  );
}
