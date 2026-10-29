import { useEffect, useId, useRef, useState } from 'react';
import './clapperboard-icon.css';

type ClapperboardIconProps = {
  size?: number;
  className?: string;
  /** Pass this prop to control the playback light from a parent video player. */
  playing?: boolean;
  onPlayingChange?: (playing: boolean) => void;
  label?: string;
};

/**
 * A hand-drawn, animated clapperboard rendered as inline SVG.
 * Click to clap and toggle its playback state. When controlled, clicking
 * reports the next state through onPlayingChange.
 */
export default function ClapperboardIcon({
  size = 220,
  className = '',
  playing,
  onPlayingChange,
  label = '切换视频播放状态',
}: ClapperboardIconProps) {
  const [internalPlaying, setInternalPlaying] = useState(false);
  const [snapId, setSnapId] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const filterPrefix = useId().replace(/:/g, '');
  const isPlaying = playing ?? internalPlaying;

  useEffect(() => () => {
    void audioContextRef.current?.close();
    audioContextRef.current = null;
  }, []);

  const playClack = () => {
    try {
      const AudioContextConstructor = window.AudioContext;
      if (!AudioContextConstructor) return;

      const context = audioContextRef.current ?? new AudioContextConstructor();
      audioContextRef.current = context;
      if (context.state === 'suspended') void context.resume();

      const now = context.currentTime;
      // Two tiny, slightly offset transients make a dry mechanical clack.
      [0, 0.035].forEach((offset, index) => {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(index === 0 ? 880 : 520, now + offset);
        oscillator.frequency.exponentialRampToValueAtTime(170, now + offset + 0.045);
        gain.gain.setValueAtTime(0.0001, now + offset);
        gain.gain.exponentialRampToValueAtTime(index === 0 ? 0.18 : 0.1, now + offset + 0.004);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.055);
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start(now + offset);
        oscillator.stop(now + offset + 0.06);
      });
    } catch {
      // The animation still works if audio is unavailable or blocked.
    }
  };

  const handleClick = () => {
    playClack();
    setSnapId((current) => current + 1);
    const nextPlaying = !isPlaying;
    if (playing === undefined) setInternalPlaying(nextPlaying);
    onPlayingChange?.(nextPlaying);
  };

  return (
    <button
      type="button"
      className={`clapperboard-button ${className}`}
      style={{ width: size, height: size * (220 / 240) }}
      onClick={handleClick}
      aria-label={label}
      aria-pressed={isPlaying}
      data-playing={isPlaying}
    >
      <svg
        className="clapperboard-svg"
        viewBox="0 0 240 220"
        role="img"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={`${filterPrefix}-rough-edge`} x="-8%" y="-8%" width="116%" height="116%">
            <feTurbulence type="fractalNoise" baseFrequency=".72" numOctaves="2" seed="7" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.15" />
          </filter>
          <filter id={`${filterPrefix}-grain`}>
            <feTurbulence type="fractalNoise" baseFrequency=".82" numOctaves="2" seed="13" />
            <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .24 0" />
          </filter>
        </defs>

        <g className="clapperboard-doodle" filter={`url(#${filterPrefix}-rough-edge)`}>
          <path d="M33 103 L157 31 Q163 28 168 34 L190 72 L65 145 Z" fill="#080808" stroke="#080808" strokeWidth="8" strokeLinejoin="round" />
          <path d="M40 101 L159 36 L169 52 L50 118 Z" fill="#fff" />
          <path d="M80 79 L99 69 L112 87 L93 98 Z M126 54 L145 44 L158 62 L139 73 Z" fill="#fff" />

          <path d="M42 111 Q43 105 51 105 L190 105 Q197 105 197 113 L197 184 Q197 191 190 191 L45 191 Q38 191 39 183 Z" fill="#080808" stroke="#080808" strokeWidth="5" strokeLinejoin="round" />
          <path d="M48 116 L189 116 L189 177 L47 181 Z" fill="#fff" />
          <path d="M45 111 L75 110 L64 133 L43 135 Z M91 110 L119 110 L108 133 L81 134 Z M137 110 L165 110 L154 133 L126 134 Z M177 110 L193 110 L191 133 L166 134 Z" fill="#fff" />

          <g className="clapperboard-face">
            <path d="M88 146 Q91 141 94 146 L94 158 Q91 164 88 159 Z" fill="#080808" />
            <path d="M128 145 Q131 140 134 146 L134 158 Q131 164 128 159 Z" fill="#080808" />
            <path d="M105 170 Q111 164 118 166" fill="none" stroke="#080808" strokeWidth="5" strokeLinecap="round" />
          </g>
        </g>

        <rect x="0" y="0" width="240" height="220" filter={`url(#${filterPrefix}-grain)`} opacity=".3" pointerEvents="none" />

        <g className={`clapperboard-lid ${snapId ? 'is-snapping' : ''}`} key={snapId}>
          <path d="M29 91 L151 20 Q158 16 163 23 L184 60 L60 132 Q55 135 50 130 L28 101 Q25 96 29 91 Z" fill="#080808" stroke="#080808" strokeWidth="5" strokeLinejoin="round" />
          <path d="M35 91 L153 24 L163 40 L45 108 Z" fill="#fff" />
          <path d="M76 68 L96 57 L108 74 L88 86 Z M122 42 L142 31 L154 49 L134 61 Z" fill="#fff" />
        </g>

        <circle className="clapperboard-recording-light" cx="211" cy="37" r="11" />
      </svg>
      <span className="clapperboard-sr-only">{isPlaying ? '播放中' : '已停止'}</span>
    </button>
  );
}
