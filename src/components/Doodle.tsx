import { useState } from 'react';

export type DoodleKind = 'book' | 'film' | 'note' | 'star';

type DoodleProps = {
  kind: DoodleKind;
  size?: number;
  interactive?: boolean;
};

/**
 * Reconstructed vector doodles based on the available style reference.
 * These are SVG paths, not raster screenshots. The original source SVGs
 * were not present in the accessible repository/files at the time of rebuild.
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
    >
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
