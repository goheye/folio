import { useId, useState } from 'react';
import './book-character-icon.css';

type BookCharacterIconProps = {
  size?: number;
  className?: string;
  /** Start in the open state. */
  initiallyOpen?: boolean;
  /** Pass open to control the state from a parent component. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  label?: string;
};

/**
 * A hand-drawn book character rendered entirely as inline SVG.
 * Click to wake it up and open the book; click again to let it fall asleep.
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
      <svg
        className="book-character-svg"
        viewBox="0 0 320 260"
        role="img"
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={filterId + '-rough'} x="-7%" y="-7%" width="114%" height="114%">
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
              scale="1.25"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

        <g filter={'url(#' + filterId + '-rough)'}>
          <g className="book-character-closed">
            {/* The page block and the lower edge of the closed book. */}
            <path
              d="M47 91 C39 96 36 107 42 118 L91 207 C98 220 109 224 123 220 L294 174 Q304 171 299 159 L291 143 L111 190 Z"
              fill="#fff"
              stroke="#080808"
              strokeWidth="8"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              d="M107 202 L290 155 M114 217 L297 169"
              fill="none"
              stroke="#080808"
              strokeWidth="4.5"
              strokeLinecap="round"
            />

            {/* The slightly rounded front cover, kept close to the supplied sketch. */}
            <path
              d="M48 83 C43 84 40 91 43 100 L91 188 C98 202 109 208 122 204 L293 158 Q302 155 296 144 L238 44 C232 33 223 29 211 32 L57 69 C49 71 46 77 48 83 Z"
              fill="#fff"
              stroke="#080808"
              strokeWidth="8"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              d="M57 70 C40 79 35 94 43 110 L91 196 C98 208 109 212 122 204"
              fill="none"
              stroke="#080808"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M83 65 C72 75 70 88 77 101 L126 189"
              fill="none"
              stroke="#080808"
              strokeWidth="7"
              strokeLinecap="round"
            />

            {/* Sleeping face: visible only while the book is closed. */}
            <g className="book-character-sleep-face" fill="none" stroke="#080808" strokeLinecap="round">
              <path d="M132 124 Q148 139 164 123" strokeWidth="8" />
              <path d="M204 106 Q220 121 236 104" strokeWidth="8" />
              <path d="M175 133 L184 130" strokeWidth="6" />
            </g>

            {/* A brief waking expression appears on the cover as the pages begin to open. */}
            <g className="book-character-wake-face" stroke="#080808" strokeLinecap="round" strokeLinejoin="round">
              <path d="M130 126 Q147 108 165 124 Q149 140 130 126 Z" fill="#fff" strokeWidth="5" />
              <path d="M202 108 Q220 90 238 106 Q222 122 202 108 Z" fill="#fff" strokeWidth="5" />
              <ellipse cx="148" cy="123" rx="4.5" ry="6.5" fill="#080808" stroke="none" />
              <ellipse cx="220" cy="105" rx="4.5" ry="6.5" fill="#080808" stroke="none" />
              <path d="M175 133 L184 130" fill="none" strokeWidth="5" />
              <path d="M166 148 Q177 154 188 145" fill="none" strokeWidth="5" />
            </g>

            {/* Hand-drawn sleep marks. */}
            <g className="book-character-sleep" fill="none" stroke="#080808" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M273 17 L300 10 L281 35 L306 29" />
              <path d="M257 48 L280 42 L263 63 L286 58" strokeWidth="7" />
            </g>
          </g>

          <g className="book-character-open">
            {/* A thin cover edge gives the open book a little depth. */}
            <path
              d="M38 94 L48 201 Q49 210 59 206 C98 188 130 188 160 201 C190 188 222 188 261 206 Q271 210 272 201 L282 94"
              fill="none"
              stroke="#080808"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <g className="book-character-page-left">
              <path
                d="M160 76 C128 64 86 73 43 96 L53 190 C94 173 129 171 160 187 Z"
                fill="#fff"
                stroke="#080808"
                strokeWidth="8"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path
                d="M70 125 Q104 114 137 125 M73 142 Q106 132 139 142 M58 160 Q105 148 151 162"
                fill="none"
                stroke="#080808"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
            </g>

            <g className="book-character-page-right">
              <path
                d="M160 76 C192 64 234 73 277 96 L267 190 C226 173 191 171 160 187 Z"
                fill="#fff"
                stroke="#080808"
                strokeWidth="8"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path
                d="M183 125 Q216 114 250 125 M181 142 Q214 132 247 142 M169 160 Q215 148 262 162"
                fill="none"
                stroke="#080808"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
            </g>

            {/* The center fold stays visible while both pages unfold from it. */}
            <path
              d="M160 77 C155 108 155 156 160 188"
              fill="none"
              stroke="#080808"
              strokeWidth="7"
              strokeLinecap="round"
            />

          </g>
        </g>
      </svg>
      <span className="book-character-sr-only">{isOpen ? '书本已打开' : '书本正在睡觉'}</span>
    </button>
  );
}
