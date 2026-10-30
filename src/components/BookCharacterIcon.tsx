import { useId, useState } from 'react';
import './book-character-icon.css';

type BookCharacterIconProps = {
  size?: number;
  className?: string;
  initiallyOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  label?: string;
};

/**
 * Hand-drawn book icon. The front cover turns over as one physical sheet;
 * the pages unfold underneath it and the page block changes into an open spread.
 */
export default function BookCharacterIcon({
  size = 220,
  className = '',
  initiallyOpen = false,
  open,
  onOpenChange,
  label = '书本图标',
}: BookCharacterIconProps) {
  const [internalOpen, setInternalOpen] = useState(initiallyOpen);
  const filterId = useId().replace(/:/g, '');
  const isOpen = open ?? internalOpen;
  const roughFilter = 'url(#' + filterId + '-rough)';

  const handleClick = () => {
    const nextOpen = !isOpen;
    if (open === undefined) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  return (
    <button
      type="button"
      className={['book-character-button', className].filter(Boolean).join(' ')}
      style={{ width: size }}
      onClick={handleClick}
      aria-label={label + (isOpen ? '，点击合上' : '，点击翻开')}
      aria-pressed={isOpen}
      data-open={isOpen ? 'true' : 'false'}
    >
      <span className="book-character-scene">
        <svg className="book-character-defs" aria-hidden="true" focusable="false">
          <defs>
            <filter id={filterId + '-rough'} x="-8%" y="-8%" width="116%" height="116%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency=".68"
                numOctaves="2"
                seed="8"
                result="ink-noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="ink-noise"
                scale="1.05"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>

        <div className="book-character-blocks">
          <svg className="book-character-block-closed" viewBox="0 0 320 260" aria-hidden="true">
            <g filter={roughFilter}>
              <path
                d="M47 91 C39 96 36 107 42 118 L91 220 C98 240 109 249 124 245 L299 199 Q309 196 303 183 L293 158 L122 204 Z"
                fill="#fff"
                stroke="#080808"
                strokeWidth="8"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path
                d="M124 219 L297 173 M124 234 L301 188"
                fill="none"
                stroke="#080808"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
            </g>
          </svg>

          <svg className="book-character-block-open" viewBox="0 0 320 260" aria-hidden="true">
            <g fill="none" stroke="#080808" strokeLinecap="round" strokeLinejoin="round" filter={roughFilter}>
              <path d="M42 174 Q101 157 156 180 M164 180 Q219 157 278 174 M156 180 Q160 184 164 180" strokeWidth="8" />
              <path d="M42 174 L47 230 M278 174 L273 230" strokeWidth="8" />
              <path d="M47 230 Q104 212 156 236 M164 236 Q216 212 273 230 M156 236 Q160 240 164 236" strokeWidth="8" />
              <path d="M49 190 Q105 172 156 196 M164 196 Q215 172 271 190 M49 210 Q105 192 156 216 M164 216 Q215 192 271 210" strokeWidth="4.5" />
            </g>
          </svg>

          <svg className="book-character-closed-binding" viewBox="0 0 320 260" aria-hidden="true">
            <g fill="none" stroke="#080808" strokeLinecap="round" filter={roughFilter}>
              <path d="M57 70 C40 79 35 94 43 110 L91 220 C98 240 109 249 124 245" strokeWidth="8" />
              <path d="M83 65 C72 75 70 88 77 101 L126 230" strokeWidth="7" />
            </g>
          </svg>
        </div>

        <div className="book-character-pages">
          <div className="book-character-page book-character-page-left">
            <svg viewBox="0 0 320 260" aria-hidden="true">
              <g filter={roughFilter}>
                <path
                  d="M160 76 C129 64 82 71 42 96 L50 172 C91 156 127 157 160 176 Z"
                  fill="#fff"
                  stroke="none"
                />
                <path
                  d="M160 76 C129 64 82 71 42 96 L50 172"
                  fill="none"
                  stroke="#080808"
                  strokeWidth="8"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <path
                  d="M68 123 Q105 111 139 126 M71 143 Q107 131 141 146 M77 162 Q113 151 148 166"
                  fill="none"
                  stroke="#080808"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </div>

          <div className="book-character-page book-character-page-right">
            <svg viewBox="0 0 320 260" aria-hidden="true">
              <g filter={roughFilter}>
                <path
                  d="M160 76 C191 64 238 71 278 96 L270 172 C229 156 193 157 160 176 Z"
                  fill="#fff"
                  stroke="none"
                />
                <path
                  d="M160 76 C191 64 238 71 278 96 L270 172"
                  fill="none"
                  stroke="#080808"
                  strokeWidth="8"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <path
                  d="M182 126 Q216 111 252 123 M179 146 Q213 131 249 143 M172 166 Q207 151 243 162"
                  fill="none"
                  stroke="#080808"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </div>

          <svg className="book-character-center-fold" viewBox="0 0 320 260" aria-hidden="true">
            <path
              d="M160 76 Q155 128 160 178"
              fill="none"
              stroke="#080808"
              strokeWidth="7"
              strokeLinecap="round"
              filter={roughFilter}
            />
          </svg>
        </div>

        <div className="book-character-cover-hinge">
          <div className="book-character-cover-front">
            <svg viewBox="0 0 320 260" aria-hidden="true">
              <g filter={roughFilter}>
                <path
                  d="M48 83 C43 84 40 91 43 100 L91 188 C98 202 109 208 122 204 L293 158 Q302 155 296 144 L238 44 C232 33 223 29 211 32 L57 69 C49 71 46 77 48 83 Z"
                  fill="#fff"
                  stroke="#080808"
                  strokeWidth="8"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <g fill="none" stroke="#080808" strokeLinecap="round">
                  <path d="M132 124 Q148 139 164 123" strokeWidth="8" />
                  <path d="M204 106 Q220 121 236 104" strokeWidth="8" />
                  <path d="M175 133 L184 130" strokeWidth="6" />
                </g>
              </g>
            </svg>
          </div>
        </div>

        <svg className="book-character-sleep-marks" viewBox="0 0 320 260" aria-hidden="true">
          <path
            d="M273 17 L300 10 L281 35 L306 29 M257 48 L280 42 L263 63 L286 58"
            fill="none"
            stroke="#080808"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={roughFilter}
          />
        </svg>
      </span>
      <span className="book-character-sr-only">
        {isOpen ? '书本已打开' : '书本正在睡觉'}
      </span>
    </button>
  );
}
