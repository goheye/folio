import { useState } from 'react';

export type DoodleKind = 'book' | 'script' | 'film' | 'note' | 'star' | 'home' | 'person' | 'profile';

type DoodleProps = {
  kind: DoodleKind;
  size?: number;
  interactive?: boolean;
};

/**
 * Editable SVG doodles reconstructed from the available style reference.
 * The original standalone SVG source files were not available when rebuilt.
 * Keep these expressive marks local to navigation and small interaction moments,
 * rather than turning the entire site into an illustration.
 */
export default function Doodle({ kind, size = 52, interactive = false }: DoodleProps) {
  const [snapCount, setSnapCount] = useState(0);
  const graphic = (
    <svg
      key={interactive ? snapCount : undefined}
      className={'doodle-svg doodle-' + kind + (interactive ? ' doodle-active' : '')}
      width={size}
      height={size}
      viewBox="0 0 62 62"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
    >
      {kind === 'book' && <>
        <path className="doodle-book-outline" d="M7.5 14 Q17.5 8.5 30.2 16.5 Q41.2 9.5 54.5 13.8 L53 48.5 Q41.5 45.5 30 52 Q19 46 8 50 Z" />
        <path d="M30.2 16.5 L30 51.5 M13 20 Q19 17 25 21 M36 21 Q42 17 49 20" />
        <path d="M18 29 L18.7 29.5 M23 28.5 L23.7 29" strokeWidth="4.8" />
        <path d="M17.5 36 Q21 39.5 24.5 35.8 M37 36 Q41 40 45 35.2" />
        <path d="M14 33 L12.5 34 M47 32.5 L48.5 33.5 M17 44 L24 44 M37 43.5 L44 43.2" strokeWidth="2.5" />
      </>}
      {kind === 'script' && <>
        <path d="M15 8.5 Q14 7 18 6.5 L43 5.5 L54 17 L54 50 Q54 54 50 54 L16 56 Q11 56 11 51 L10 13 Q10 9 15 8.5 Z" />
        <path d="M43 6 L43 16 Q43 19 47 18.5 L54 17" />
        <path d="M23 24 L23.5 24.5 M36 23 L36.5 23.5" strokeWidth="4.8" />
        <path d="M23 31 Q29.5 35 36 30.5 M20 40 L43 39 M20 46 L38 45" />
        <g className="doodle-script-pen">
          <path d="M43 36 L55 22 Q58 19 60 22 Q61 24 58 27 L46 41 L40 43 Z" />
          <path d="M43 36 L48 40 M40 43 L39 47 L46 41" />
          <path d="M55 22 L58 25" stroke="#C95B4D" strokeWidth="3" />
        </g>
        <path d="M5 14 L7 11 M5 22 L8 21" stroke="#C95B4D" strokeWidth="2.8" />
      </>}
      {kind === 'film' && <>
        <g className="doodle-film-clapper">
          <path d="M9.5 19.5 L47.5 10.5 Q51.5 10 53.5 15 L55 22.5 L14.5 32 Z" />
          <path d="M18 18 L25 28 M31 15 L38.5 25 M43.5 12.5 L50 22" />
        </g>
        <g className="doodle-film-body">
          <path d="M14.5 32.5 Q12 33 11.5 37 L10.5 47.5 Q10 52.5 16 53 L47.5 53 Q52.5 52.5 53 47.5 L53 27.5" />
          <path d="M21 39 L21.5 39.5 M31 37.5 L31.5 38" strokeWidth="4.8" />
          <path d="M21.5 46.5 Q31 52 41 45.5" />
          <path d="M16 43 L14 44 M45 41 L47 42" strokeWidth="2.4" />
        </g>
        <path d="M55 5.5 L58 7 M45 4 L45 7.5 M35.5 7.5 L38 10" strokeWidth="2.8" />
      </>}
      {kind === 'note' && <>
        <path d="M12.5 8.5 Q29 5.5 49 10.5 L48 52.5 Q30 50 13 55 Z" />
        <path d="M18 18.5 L39 18 M18 25.5 L41 25 M18 32 L34.5 32" />
        <path d="M22 40 L22.7 40.5 M35.5 39.5 L36.2 40" strokeWidth="4.8" />
        <path d="M23 46 Q29.5 51 36 45.5 M9 13 L6.5 11 M52 15 L56 11.5" />
      </>}
      {kind === 'profile' && <>
        <path d="M13 7.5 Q12 7 16 6.5 L43 6 L54 17 L54 51 Q54 55 50 55 L15 56 Q11 56 11 52 L10 12 Q10 8 13 7.5 Z" />
        <path d="M43 6 L43 16 Q43 19 47 18.5 L54 17" />
        <rect x="17" y="22" width="15" height="17" rx="1.5" />
        <circle cx="24.5" cy="28" r="3.1" fill="currentColor" stroke="none" />
        <path d="M19.5 36 Q20 31.5 24.5 31.5 Q29 31.5 29.5 36" fill="currentColor" stroke="none" />
        <path d="M38 24 L48 24 M38 30 L48 30 M18 46 L21 46 M26 46 L48 46 M18 51 L21 51 M26 51 L43 51" />
      </>}
      {kind === 'star' && <>
        <path d="M30.5 7 Q33 23.5 52.5 29.5 Q35 34 30 53 Q26 35 7.5 30 Q25.5 26 30.5 7 Z" />
        <path d="M24 29 L24.5 29.5 M36 29 L36.5 29.5" strokeWidth="4.8" />
        <path d="M25.5 36 Q30.5 40 35.5 35.5 M9 8 L13 12 M50 10 L47 14 M10 52 L14 48 M49 49 L52 52" strokeWidth="2.8" />
      </>}
      {kind === 'home' && <>
        <path d="M7.5 28.5 L29.5 9.5 Q31 8 32.5 10 L54.5 28 M13.5 25 L13.5 50 Q13.5 53 17 53 L45 53 Q49 53 49 49 L49 25" />
        <path d="M23 32 L23.7 32.5 M37 32 L37.7 32.5" strokeWidth="4.8" />
        <path d="M23 39 Q30 44 38 39 M25 52.5 L25 45 Q25 42 28 42 L34 42 Q37 42 37 45 L37 52" />
        <path d="M7 23 L11 19 M52 18 L56 22" strokeWidth="2.6" />
      </>}
      {kind === 'person' && <>
        <path d="M17 25 Q13 14 23 9 Q31 4.5 39 10 Q48 15 44 26" />
        <path d="M17.5 23 Q17 14 25 13 Q31 17 40 12 Q45 17 44 24 L42.5 34 Q39 43 31 43 Q22 42 19 34 Z" />
        <path d="M25 28 L25.5 28.5 M36 27.5 L36.5 28" strokeWidth="4.8" />
        <path d="M25 35 Q30.5 39 36.5 34.5 M11 54 Q14 44 23 42 M40 42 Q50 45 52 54" />
        <path d="M14 48 L10.5 45 M48 47 L52 44" strokeWidth="2.6" />
      </>}
    </svg>
  );

  if (!interactive || kind !== 'film') return graphic;

  return (
    <button
      className="doodle-trigger"
      type="button"
      aria-label="让场记板咔嗒一下"
      title="咔嗒"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        setSnapCount((count) => count + 1);
      }}
    >
      {graphic}
    </button>
  );
}
