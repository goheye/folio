'use client';

import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  Clapperboard,
  Feather,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

type SectionId = 'scripts' | 'film' | 'notes' | 'about';

type Work = { title: string; meta: string; summary: string; number: string };
type Section = {
  id: SectionId;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  works?: Work[];
};

const sections: Section[] = [
  {
    id: 'scripts',
    label: '剧本',
    eyebrow: 'WRITING · 2024—2026',
    title: '故事从纸上醒来',
    description: '一些关于离开、重逢，以及我们如何记住彼此的故事。',
    icon: BookOpen,
    works: [
      { number: '01', title: '候鸟以北', meta: '电影剧本 · 剧情 · 98 分钟', summary: '多年未归的女儿在冬天回到北方小城，与父亲共同完成一场迟到的告别。' },
      { number: '02', title: '凌晨四点的海', meta: '短片剧本 · 青春 · 18 分钟', summary: '高考后的最后一个夜晚，两个朋友骑着自行车去看一场可能不会出现的日出。' },
      { number: '03', title: '无声来电', meta: '舞台剧 · 悬疑 · 三幕', summary: '一通没有声音的电话，让同住一屋的三个人开始怀疑彼此的记忆。' },
    ],
  },
  {
    id: 'film',
    label: '影像',
    eyebrow: 'MOVING IMAGE · SELECTED',
    title: '镜头经过的地方',
    description: '短片、影像练习，以及日常生活里被光照亮的一瞬。',
    icon: Clapperboard,
    works: [
      { number: '01', title: '河流记得', meta: '实验短片 · 06:42', summary: '一条河的四季，也是一个家庭被时间缓慢改变的方式。' },
      { number: '02', title: '周日下午', meta: '影像随笔 · 03:18', summary: '街角、风声、晾晒的衣服，以及一段没有目的地的散步。' },
    ],
  },
  {
    id: 'notes',
    label: '文字',
    eyebrow: 'NOTES · FRAGMENTS',
    title: '写在故事之外',
    description: '观察、片段与未完成的念头。它们偶尔也会长成新的故事。',
    icon: Feather,
    works: [
      { number: '01', title: '雨天的十种声音', meta: '随笔 · 5 分钟阅读', summary: '当城市慢下来，声音会比画面更早抵达我们。' },
      { number: '02', title: '如何记住一间房间', meta: '创作笔记 · 7 分钟阅读', summary: '空间、物件与人物之间，那些不被台词说出的关系。' },
    ],
  },
  {
    id: 'about',
    label: '关于',
    eyebrow: 'ABOUT · CONTACT',
    title: '你好，我是海燕',
    description: '我写剧本，也拍摄生活。对人与人之间微小而真实的时刻感兴趣。',
    icon: Sparkles,
  },
];

export default function Home() {
  const [activeId, setActiveId] = useState<SectionId>('scripts');
  const active = sections.find((section) => section.id === activeId)!;

  useEffect(() => {
    const context = (document as Document & {
      modelContext?: {
        registerTool: (tool: unknown, options?: { signal?: AbortSignal }) => void | Promise<void>;
      };
    }).modelContext;
    if (!context?.registerTool) return;

    const lifecycle = new AbortController();
    void Promise.resolve(context.registerTool({
      name: 'show_portfolio_section',
      title: '打开作品分类',
      description: '在页面中打开剧本、影像、文字或关于分类。',
      inputSchema: {
        type: 'object',
        properties: { section: { type: 'string', enum: ['scripts', 'film', 'notes', 'about'] } },
        required: ['section'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute(input: unknown) {
        const section = (input as { section?: string })?.section;
        if (!sections.some((item) => item.id === section)) throw new Error('未知的作品分类');
        setActiveId(section as SectionId);
        return { section, visible: true };
      },
    }, { signal: lifecycle.signal })).catch(() => undefined);

    return () => lifecycle.abort();
  }, []);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="回到首页"><span>海燕</span><span className="brand-mark">HY</span></a>
        <p className="header-note">编剧 · 影像创作者</p>
        <a className="contact-link" href="mailto:hello@example.com">联系我 <ArrowUpRight size={15} strokeWidth={1.8} /></a>
      </header>

      <section id="top" className="intro" aria-labelledby="page-title">
        <p className="kicker">个人作品集 · PORTFOLIO</p>
        <h1 id="page-title">我的创作，<br />在这里慢慢发生。</h1>
        <p className="intro-copy">选择一个图标，翻阅不同的创作。</p>
      </section>

      <nav className="section-picker" aria-label="作品分类">
        {sections.map((section) => {
          const Icon = section.icon;
          const selected = section.id === activeId;
          return (
            <button key={section.id} type="button" className={`section-button${selected ? ' is-active' : ''}`} aria-pressed={selected} aria-controls="work-panel" onClick={() => setActiveId(section.id)}>
              <span className="icon-frame" aria-hidden="true"><Icon size={33} strokeWidth={1.35} /></span>
              <span>{section.label}</span>
            </button>
          );
        })}
      </nav>

      <section id="work-panel" className="work-panel" aria-live="polite">
        <div className="panel-heading" key={`${active.id}-heading`}>
          <p className="eyebrow">{active.eyebrow}</p>
          <h2>{active.title}</h2>
          <p className="panel-description">{active.description}</p>
        </div>
        {active.works ? (
          <div className="work-list" key={active.id}>
            {active.works.map((work) => (
              <article className="work-card" key={work.title}>
                <span className="work-number">{work.number}</span>
                <div className="work-copy"><p className="work-meta">{work.meta}</p><h3>{work.title}</h3><p>{work.summary}</p></div>
                <button className="read-button" type="button" aria-label={`查看《${work.title}》`}><ArrowUpRight size={20} strokeWidth={1.6} /></button>
              </article>
            ))}
          </div>
        ) : (
          <div className="about-block" key={active.id}><p>目前生活与创作于上海。欢迎联系我讨论剧本、短片或其他有趣的合作。</p><a href="mailto:hello@example.com">hello@example.com</a></div>
        )}
      </section>

      <footer><span>© 2026 海燕</span><span>愿所有未完成的故事，都有继续生长的地方。</span></footer>
    </main>
  );
}
