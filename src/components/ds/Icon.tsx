import React from 'react'

// Stroke icons on a 24×24 grid, 1.5 stroke — drawn to match the thin-serif type.
const P: Record<string, string[]> = {
  'arrow-right': ['M5 12h14', 'M12 5l7 7-7 7'],
  'arrow-left': ['M19 12H5', 'M12 19l-7-7 7-7'],
  sun: [
    'M12 2v2M12 20v2M2 12h2M20 12h2',
    'M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  ],
  moon: ['M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z'],
  droplet: ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
  thermometer: ['M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z'],
  sprout: [
    'M7 20h10',
    'M10 20c5.5-2.5.8-6.4 3-10',
    'M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z',
    'M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z',
  ],
  leaf: [
    'M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z',
    'M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12',
  ],
  chat: ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
  pin: ['M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Z', 'M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z'],
  check: ['M20 6 9 17l-5-5'],
}

// Circle-based icons need their own element, kept out of the path map.
const CIRCLES: Record<string, { cx: number; cy: number; r: number }[]> = {
  sun: [{ cx: 12, cy: 12, r: 4 }],
}

export function Icon({
  name = 'leaf',
  size = 16,
  strokeWidth = 1.5,
  style,
}: {
  name?: string
  size?: number
  strokeWidth?: number
  style?: React.CSSProperties
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flex: 'none', ...style }}
      aria-hidden="true"
    >
      {(CIRCLES[name] || []).map((c, i) => (
        <circle key={`c${i}`} cx={c.cx} cy={c.cy} r={c.r} />
      ))}
      {(P[name] || P.leaf).map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  )
}
