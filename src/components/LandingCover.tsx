import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Doodle, { type DoodleKind } from './Doodle';

type PortfolioSection = 'home' | 'scripts' | 'films' | 'journal' | 'about';

const NOTE_WRITING_DURATION_MS = 1700;
const SCRIPT_PAGE_TURN_DURATION_MS = 1050;

const entries: {
  section: PortfolioSection;
  title: string;
  english: string;
  kind: DoodleKind;
  className: string;
}[] = [
  { section: 'scripts', title: '剧本', english: 'SCRIPT', kind: 'script', className: 'cover-entry-script' },
  { section: 'about', title: '关于', english: 'ABOUT ME', kind: 'profile', className: 'cover-entry-profile' },
  { section: 'films', title: '影像', english: 'AI FILM', kind: 'film', className: 'cover-entry-film' },
  { section: 'journal', title: '手记', english: 'JOURNAL', kind: 'note', className: 'cover-entry-journal' },
];

export default function LandingCover({
  onNavigate,
}: {
  onNavigate: (section: PortfolioSection) => void;
}) {
  const [writingRun, setWritingRun] = useState(0);
  const [writingSection, setWritingSection] = useState<'scripts' | 'journal' | null>(null);
  const writingTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (writingTimer.current !== null) window.clearTimeout(writingTimer.current);
  }, []);

  const handleEntryClick = (section: PortfolioSection) => {
    if (writingTimer.current !== null) window.clearTimeout(writingTimer.current);
    const writingKind = section === 'journal'
      ? 'journal'
      : section === 'scripts'
        ? 'scripts'
        : null;
    const writingDuration = writingKind === 'journal'
      ? NOTE_WRITING_DURATION_MS
      : writingKind === 'scripts'
        ? SCRIPT_PAGE_TURN_DURATION_MS
        : null;
    if (writingKind !== null && writingDuration !== null) {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setWritingSection(reduceMotion ? null : writingKind);
      setWritingRun((run) => run + 1);
      writingTimer.current = window.setTimeout(() => {
        setWritingSection(null);
        writingTimer.current = null;
        onNavigate(section);
      }, reduceMotion ? 0 : writingDuration);
      return;
    }
    setWritingSection(null);
    onNavigate(section);
  };

  return (
    <main className="landing-cover" aria-label="茹雪个人作品集封面">
      <div className="cover-stage">
        {entries.map((entry) => (
          <div className={'cover-entry ' + entry.className} key={entry.section}>
            <button
              className="cover-entry-button"
              type="button"
              data-cover-action={entry.section}
              onClick={() => handleEntryClick(entry.section)}
              disabled={writingSection !== null}
              aria-busy={entry.section === writingSection}
              aria-label={'进入' + entry.title + '栏目'}
            >
              <span className="cover-icon-pad">
                {entry.section === 'scripts' ? (
                  <span
                    className={'cover-book-icon' + (writingSection === 'scripts' ? ' is-turning' : '')}
                    aria-hidden="true"
                  >
                    <img
                      className="cover-book-frame cover-book-closed"
                      src="/icons/script-book-closed-original.png"
                      alt=""
                      width={1254}
                      height={1254}
                      decoding="sync"
                      draggable={false}
                    />
                    <img
                      className="cover-book-frame cover-book-open"
                      src="/icons/script-book-open-original.png"
                      alt=""
                      width={1254}
                      height={1254}
                      decoding="sync"
                      draggable={false}
                    />
                  </span>
                ) : (
                  <Doodle
                    kind={entry.kind}
                    size={104}
                    active={entry.section === writingSection}
                    animationKey={writingRun}
                  />
                )}
              </span>
              <span className="cover-entry-caption">
                <strong>{entry.title}</strong>
                <small>{entry.english}</small>
                <ArrowUpRight className="cover-entry-arrow" size={17} aria-hidden="true" />
              </span>
            </button>
          </div>
        ))}

        <section className="cover-center" aria-labelledby="cover-title">
          <div className="cover-mark" aria-label="ruxue">
            <span className="cover-wordmark">ruxue</span>
            <svg className="cover-mark-flourish" viewBox="0 0 100 28" aria-hidden="true">
              <path d="M7 18 C23 5 34 8 47 17 S72 24 92 8" />
              <path d="M47 17 C53 9 59 5 66 4 C62 13 56 18 47 17 Z" />
            </svg>
          </div>
          <h1 id="cover-title">茹雪的创作空间</h1>
          <p className="cover-role">编剧 <span>·</span> AI 影像创作者</p>
          <button
            className="cover-enter"
            type="button"
            data-cover-action="home"
            disabled={writingSection !== null}
            onClick={() => onNavigate('home')}
          >
            进入作品集 <ArrowRight size={18} aria-hidden="true" />
          </button>
          <p className="cover-note">从故事的第一行，到画面里的每一帧。</p>
        </section>
      </div>
    </main>
  );
}
