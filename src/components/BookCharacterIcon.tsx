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

            {/* Sleeping face. */}
            <g className="book-character-sleep-face" fill="none" stroke="#080808" strokeLinecap="round">
              <path d="M132 124 Q148 139 164 123" strokeWidth="8" />
              <path d="M204 106 Q220 121 236 104" strokeWidth="8" />
              <path d="M175 133 L184 130" strokeWidth="6" />
            </g>

            {/* Hand-drawn sleep marks. */}
            <g className="book-character-sleep" fill="none" stroke="#080808" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M268 31 L293 24 L274 47 L298 41" />
              <path d="M248 63 L270 57 L253 78 L274 73" strokeWidth="7" />
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
                d="M70 158 Q104 148 137 157 M74 172 Q108 162 140 171"
                fill="none"
                stroke="#080808"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
              <path
                d="M58 181 Q105 164 151 180"
                fill="none"
                stroke="#080808"
                strokeWidth="3.5"
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
                d="M183 157 Q216 148 250 158 M180 171 Q214 162 246 172"
                fill="none"
                stroke="#080808"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
              <path
                d="M169 180 Q215 164 262 181"
                fill="none"
                stroke="#080808"
                strokeWidth="3.5"
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

            {/* Awake face: eyes open, with a small nose and smile. */}
            <g className="book-character-open-face" stroke="#080808" strokeLinecap="round" strokeLinejoin="round">
              <path d="M111 101 Q125 91 139 101 M181 101 Q195 91 209 101" fill="none" strokeWidth="5.5" />
              <ellipse cx="126" cy="116" rx="6" ry="8.5" fill="#080808" stroke="none" />
              <ellipse cx="194" cy="116" rx="6" ry="8.5" fill="#080808" stroke="none" />
              <circle cx="128" cy="113" r="2" fill="#fff" stroke="none" />
              <circle cx="196" cy="113" r="2" fill="#fff" stroke="none" />
              <path d="M155 132 Q160 137 165 132" fill="none" strokeWidth="5" />
              <path d="M149 147 Q160 156 171 147" fill="none" strokeWidth="5.5" />
              <path d="M105 129 L99 127 M215 127 L221 125" fill="none" strokeWidth="4.5" />
            </g>
          </g>
        </g>
      </svg>
      <span className="book-character-sr-only">{isOpen ? '书本已打开' : '书本正在睡觉'}</span>
    </button>
  );
}
