import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import './FeaturedShowcase.css';

type View = 'script' | 'film';

export default function FeaturedShowcase({
  onNavigate,
}: {
  onNavigate: (section: 'scripts' | 'films') => void;
}) {
  const [view, setView] = useState<View>('script');
  const isScript = view === 'script';

  return (
    <section className="showcase-home section-wrap" aria-labelledby="showcase-title">
      <div className="showcase-intro">
        <p className="showcase-overline"><span className="showcase-overline-rule" /> THE STORY / THE SCREEN</p>
        <h1 id="showcase-title">一个故事，<br /><span>两种讲述。</span></h1>
        <p className="showcase-lead">从纸上的第一行字，到镜头中的一帧画面。</p>
        <p className="showcase-description">故事可以被阅读，也可以被看见。这里用同一份创作档案，展示文字与影像如何拥有不同的表达。</p>
        <div className="showcase-intro-divider" />
        <div className="showcase-intro-index">
          <span className="showcase-index-mark">01<span className="showcase-index-slash"> / 01</span></span>
          <div><strong>代表作品展台</strong><small>先读一个故事，再看它的画面。</small></div>
        </div>
      </div>

      <div className="showcase-unit" aria-label="代表作品双视角展台">
        <div className="showcase-unit-head">
          <div><span className="showcase-item-index">SELECTED WORK · 001</span><strong>同一份创作档案</strong></div>
          <span className="showcase-demo-flag">布局演示 · 内容待确认</span>
        </div>

        <div className="showcase-switch" role="group" aria-label="选择创作视角">
          <button type="button" className={isScript ? 'is-active' : ''} aria-pressed={isScript}
            onClick={() => setView('script')} data-showcase-view="script">01 <span>阅读剧本</span></button>
          <button type="button" className={!isScript ? 'is-active' : ''} aria-pressed={!isScript}
            onClick={() => setView('film')} data-showcase-view="film">02 <span>观看影像</span></button>
          <span className={'showcase-switch-underline ' + (isScript ? 'is-script' : 'is-film')} aria-hidden="true" />
        </div>

        <div className="showcase-board" aria-live="polite">
          {isScript ? (
            <div key="script" className="showcase-script-layout showcase-view-enter" data-showcase-panel="script">
              <div className="showcase-paper">
                <div className="showcase-paper-top"><span>SCREENPLAY / SAMPLE</span><span>001</span></div>
                <div className="showcase-paper-main">
                  <p className="showcase-paper-scene">第 01 场 · 场景示意</p>
                  <h2>故事从<br />纸面开始。</h2>
                  <p className="showcase-paper-micro">人物、对白、冲突与节奏，都先落在文字里。</p>
                  <div className="showcase-lines" aria-hidden="true">
                    <i /><i /><i /><i /><i />
                  </div>
                </div>
                <div className="showcase-paper-bottom"><span>剧本排版示意</span><span>— 01 —</span></div>
              </div>
              <aside className="showcase-view-note">
                <span className="showcase-view-note-number">01 / SCRIPT</span>
                <span className="showcase-view-note-rule" />
                <strong>写下故事</strong>
                <p>让人物的选择、情绪与冲突，先在字里行间发生。</p>
                <small>此处不是实际剧本节选</small>
              </aside>
            </div>
          ) : (
            <div key="film" className="showcase-film-layout showcase-view-enter" data-showcase-panel="film">
              <div className="showcase-viewfinder">
                <div className="showcase-abstract-scene" aria-hidden="true">
                  <span className="showcase-scene-glow" />
                  <span className="showcase-scene-window" />
                  <span className="showcase-scene-floor" />
                  <span className="showcase-scene-figure" />
                  <span className="showcase-frame-corner top-left" />
                  <span className="showcase-frame-corner top-right" />
                  <span className="showcase-frame-corner bottom-left" />
                  <span className="showcase-frame-corner bottom-right" />
                </div>
                <div className="showcase-viewfinder-meta"><span>FRAME 01 / VISUAL STUDY</span><span>16 : 9</span></div>
              </div>
              <div className="showcase-film-bottom">
                <div className="showcase-storyboard" aria-label="分镜示意三格">
                  <span className="showcase-thumb one"><i /></span>
                  <span className="showcase-thumb two"><i /></span>
                  <span className="showcase-thumb three"><i /></span>
                </div>
                <div className="showcase-film-caption"><strong>让故事被看见</strong><small>分镜构图示意 · 非真实作品画面</small></div>
              </div>
            </div>
          )}
        </div>

        <div className="showcase-unit-foot">
          <p><span className="showcase-status-dot" /> 真实作品内容确认后替换示意画面</p>
          <button type="button" className="showcase-explore" onClick={() => onNavigate(isScript ? 'scripts' : 'films')}>
            {isScript ? '浏览剧本作品' : '浏览影像作品'} <ArrowUpRight size={17} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
