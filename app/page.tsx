'use client';

import { useEffect, useMemo, useState } from 'react';
import { BookOpen, Camera, ChevronRight, Feather, Home, LogOut, Mail, Sparkles, UserRound, X } from 'lucide-react';

type SectionId = 'home' | 'scripts' | 'images' | 'inspiration' | 'about';
type Script = { title: string; type: string; year: string; logline: string; excerpt: string };

const scripts: Script[] = [
  { title: '候鸟以北', type: '电影剧本 · 剧情', year: '2026', logline: '多年未归的女儿在冬天回到北方小城，与父亲共同完成一场迟到的告别。', excerpt: '冬日清晨，车窗上的雾慢慢褪去。她终于看见那座桥，和桥下已经结冰的河。' },
  { title: '凌晨四点的海', type: '短片剧本 · 青春', year: '2025', logline: '高考后的最后一个夜晚，两个朋友骑着自行车去看一场可能不会出现的日出。', excerpt: '路灯一盏一盏向后退。她们没有说目的地，海风却已经出现在空气里。' },
  { title: '无声来电', type: '舞台剧 · 悬疑', year: '2024', logline: '一通没有声音的电话，让同住一屋的三个人开始怀疑彼此的记忆。', excerpt: '电话第三次响起时，屋里没有人动。桌上的杯子，却在铃声里轻轻颤了一下。' },
];

const navItems = [
  { id: 'home' as const, label: '主页', icon: Home },
  { id: 'scripts' as const, label: '剧本', icon: BookOpen },
  { id: 'images' as const, label: '影像', icon: Camera },
  { id: 'inspiration' as const, label: '灵感', icon: Sparkles },
  { id: 'about' as const, label: '关于', icon: UserRound },
];

export default function HomePage() {
  const [entered, setEntered] = useState(false);
  const [active, setActive] = useState<SectionId>('home');
  const [selectedScript, setSelectedScript] = useState<Script | null>(null);

  const sectionTitle = useMemo(() => navItems.find((item) => item.id === active)?.label ?? '主页', [active]);

  const openSection = (section: SectionId) => {
    setEntered(true);
    setActive(section);
  };

  useEffect(() => {
    const context = (document as Document & { modelContext?: { registerTool: (tool: unknown, options?: { signal?: AbortSignal }) => void | Promise<void> } }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    void Promise.resolve(context.registerTool({
      name: 'open_creative_room',
      title: '打开创作房间',
      description: '进入个人网站并打开主页、剧本、影像、灵感或关于栏目。',
      inputSchema: { type: 'object', properties: { section: { type: 'string', enum: ['home', 'scripts', 'images', 'inspiration', 'about'] } }, required: ['section'], additionalProperties: false },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute(input: unknown) {
        const section = (input as { section?: string })?.section;
        if (!navItems.some((item) => item.id === section)) throw new Error('未知栏目');
        openSection(section as SectionId);
        return { entered: true, section };
      },
    }, { signal: lifecycle.signal })).catch(() => undefined);
    return () => lifecycle.abort();
  }, []);

  useEffect(() => {
    if (!selectedScript) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && setSelectedScript(null);
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [selectedScript]);

  return (
    <main className={`world ${entered ? 'is-entered' : ''}`}>
      <div className="ambient-light" aria-hidden="true"><i /><i /><i /><i /><i /></div>

      {!entered ? (
        <section className="welcome-screen" aria-labelledby="welcome-title">
          <div className="welcome-card">
            <div className="avatar"><Feather size={30} strokeWidth={1.5} /></div>
            <p className="tiny-label">THE CREATIVE ROOM OF</p>
            <h1 id="welcome-title">海燕</h1>
            <p className="welcome-role">编剧 · 影像创作者 · 生活观察者</p>
            <p className="welcome-copy">欢迎来到我的创作小天地。<br />这里收藏着故事、光影和一闪而过的念头。</p>
            <button className="enter-button" type="button" onClick={() => setEntered(true)}>
              <span>进入</span><ChevronRight size={18} />
            </button>
          </div>
          <p className="welcome-hint">轻轻推开门，看看故事正在发生的地方</p>
        </section>
      ) : (
        <div className="portfolio-shell">
          <header className="topbar">
            <button className="mini-brand" type="button" onClick={() => setActive('home')} aria-label="返回主页"><Feather size={17} /><span>HAIYAN'S ROOM</span></button>
            <p><span className="online-dot" /> NOW EXPLORING · {sectionTitle}</p>
            <button className="leave-button" type="button" onClick={() => setEntered(false)}><LogOut size={16} /><span>离开房间</span></button>
          </header>

          <aside className="side-dock" aria-label="网站栏目">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button key={id} type="button" className={active === id ? 'active' : ''} onClick={() => setActive(id)} aria-pressed={active === id}>
                <Icon size={21} strokeWidth={1.7} /><span>{label}</span>
              </button>
            ))}
          </aside>

          <section className="content-window" aria-live="polite">
            {active === 'home' && <HomeSection onOpen={setActive} />}
            {active === 'scripts' && <ScriptsSection onSelect={setSelectedScript} />}
            {active === 'images' && <ImagesSection />}
            {active === 'inspiration' && <InspirationSection />}
            {active === 'about' && <AboutSection />}
          </section>

          <p className="scene-caption">A quiet place for loud ideas · 2026</p>
        </div>
      )}

      {selectedScript && (
        <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setSelectedScript(null)}>
          <section className="script-dialog" role="dialog" aria-modal="true" aria-labelledby="script-title">
            <button className="dialog-close" type="button" onClick={() => setSelectedScript(null)} aria-label="关闭剧本预览"><X size={19} /></button>
          <div className="dialog-header">
            <p className="tiny-label">SCRIPT PREVIEW · {selectedScript?.year}</p>
            <h2 id="script-title">{selectedScript?.title}</h2>
            <p className="dialog-description">{selectedScript?.type}</p>
          </div>
          <div className="dialog-rule" />
          <p className="dialog-logline">{selectedScript?.logline}</p>
          <blockquote>{selectedScript?.excerpt}</blockquote>
          <p className="dialog-note">— 节选 · 完整剧本可联系作者阅读 —</p>
          </section>
        </div>
      )}
    </main>
  );
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <div className="section-heading"><p className="tiny-label">{eyebrow}</p><h2>{title}</h2><p>{copy}</p></div>;
}

function HomeSection({ onOpen }: { onOpen: (id: SectionId) => void }) {
  return <div className="home-layout section-enter">
    <div className="home-intro">
      <p className="tiny-label">WELCOME · 欢迎</p>
      <h2>你好呀，<br />我的旅人。</h2>
      <p>我是海燕。我喜欢写下人与人之间那些很小、却很难忘记的瞬间。</p>
      <button type="button" className="text-link" onClick={() => onOpen('about')}>认识我 <ChevronRight size={17} /></button>
    </div>
    <div className="chapter-grid">
      <button type="button" className="chapter chapter-main" onClick={() => onOpen('scripts')}><span className="chapter-icon"><BookOpen /></span><span className="chapter-no">01</span><strong>翻开我的剧本</strong><small>3 个故事正在等待被读到</small><ChevronRight className="chapter-arrow" /></button>
      <button type="button" className="chapter" onClick={() => onOpen('images')}><span className="chapter-icon"><Camera /></span><span className="chapter-no">02</span><strong>看见光经过</strong><small>影像与日常切片</small><ChevronRight className="chapter-arrow" /></button>
      <button type="button" className="chapter" onClick={() => onOpen('inspiration')}><span className="chapter-icon"><Sparkles /></span><span className="chapter-no">03</span><strong>捡起灵感碎片</strong><small>音乐、书与未完成的念头</small><ChevronRight className="chapter-arrow" /></button>
    </div>
  </div>;
}

function ScriptsSection({ onSelect }: { onSelect: (script: Script) => void }) {
  return <div className="section-enter"><SectionHeading eyebrow="CHAPTER 01 · 剧本" title="故事从纸上醒来" copy="点击任意一本，阅读故事梗概与片段。" /><div className="script-shelf">{scripts.map((script, index) => <button className="script-book" type="button" key={script.title} onClick={() => onSelect(script)} style={{ '--delay': `${index * 70}ms` } as React.CSSProperties}><span className="book-year">{script.year}</span><span className="book-title">{script.title}</span><span className="book-type">{script.type}</span><span className="book-mark">阅读片段 <ChevronRight size={15} /></span></button>)}</div></div>;
}

function ImagesSection() {
  return <div className="section-enter"><SectionHeading eyebrow="CHAPTER 02 · 影像" title="镜头经过的地方" copy="我收集日常里稍纵即逝的光，也记录沉默的人。" /><div className="film-grid"><article className="film-card film-one"><span>01</span><div><small>实验短片 · 06:42</small><h3>河流记得</h3><p>一条河的四季，也是一个家庭被时间缓慢改变的方式。</p></div></article><article className="film-card film-two"><span>02</span><div><small>影像随笔 · 03:18</small><h3>周日下午</h3><p>一段没有目的地的散步。</p></div></article><article className="film-card film-three"><span>03</span><div><small>摄影练习 · 12 张</small><h3>窗边的人</h3><p>十二个安静的下午。</p></div></article></div></div>;
}

function InspirationSection() {
  return <div className="section-enter"><SectionHeading eyebrow="CHAPTER 03 · 灵感" title="最近让我心动的事" copy="有些东西不会立刻变成作品，但会留在故事的土壤里。" /><div className="inspiration-board"><article><span>正在读</span><h3>《岁月的针脚》</h3><p>“记忆不是仓库，而是一间不断被重新布置的房间。”</p></article><article><span>正在听</span><h3>雨落在旧窗台</h3><p>适合写作的深夜器乐歌单。</p></article><article><span>正在想</span><h3>如果告别没有台词</h3><p>也许一个背影、一杯凉掉的茶就足够。</p></article></div></div>;
}

function AboutSection() {
  return <div className="about-layout section-enter"><SectionHeading eyebrow="ABOUT ME · 关于" title="写故事，也收集生活" copy="对家庭、成长、记忆与人与人之间的微妙距离感兴趣。" /><div className="about-note"><p>目前生活与创作于上海。我相信好的故事不一定需要很大的声音，它只要足够诚实。</p><p>欢迎找我聊剧本、短片，或者一个还没有名字的想法。</p><a href="mailto:hello@example.com"><Mail size={18} /> hello@example.com</a></div></div>;
}
