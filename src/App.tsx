import { useEffect, useState, type MouseEvent } from 'react';
import { ArrowRight, ArrowUpRight, House, UserRound } from 'lucide-react';
import Doodle from './components/Doodle';

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
          <div className="detail-panel detail-film"><div className="detail-image detail-film-frames"><span className="film-detail-number">分镜 / 02</span><div className="detail-film-strip"><span className="home-film-frame frame-one"><i /></span><span className="home-film-frame frame-two"><i /></span><span className="home-film-frame frame-three"><i /></span></div><span className="placeholder-tag">分镜排版示意 · 非正式作品</span><span className="detail-film-doodle"><Doodle kind="film" size={76} interactive /></span></div><div className="detail-body"><p className="eyebrow">AI 影像制作</p><h3>让想象进入画面</h3><p>人物、场景、分镜与演示片段会在这里逐步整理。正式上线前，只展示已确认可公开的素材，不使用虚构作品信息。</p><span className="small-note">只展示已确认可公开的演示内容</span></div></div>
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
