'use client'
import React from 'react'
import { Icon } from './ds/Icon'

type Mode = 'light' | 'dark'

const apply = (mode: Mode) => {
  document.documentElement.dataset.theme = mode
  try {
    localStorage.setItem('la-theme', mode)
  } catch {
    /* private mode — the choice just won't persist */
  }
}

export function ThemeToggle({ onDark }: { onDark?: boolean } = {}) {
  const [mode, setMode] = React.useState<Mode>('light')

  // The inline script in <head> already set the attribute; read it back so the
  // button matches what is actually on screen.
  React.useEffect(() => {
    setMode(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')
  }, [])

  const set = (next: Mode) => {
    apply(next)
    setMode(next)
  }

  const pill = (active: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    border: 0,
    borderRadius: '50%',
    cursor: 'pointer',
    background: active ? (onDark ? 'var(--hero-accent)' : 'var(--btn-bg)') : 'transparent',
    color: active
      ? onDark
        ? '#0d0f0e'
        : 'var(--btn-fg)'
      : onDark
        ? 'var(--hero-muted)'
        : 'var(--ink-muted)',
    transition: 'background var(--dur) var(--ease), color var(--dur) var(--ease)',
  })

  return (
    <div
      role="group"
      aria-label="Colour mode"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: 5,
        border: `1px solid ${onDark ? 'var(--hero-line)' : 'var(--line-mid)'}`,
        borderRadius: 999,
      }}
    >
      <button type="button" onClick={() => set('light')} aria-pressed={mode === 'light'} aria-label="Light mode" style={pill(mode === 'light')}>
        <Icon name="sun" size={13} />
      </button>
      <button type="button" onClick={() => set('dark')} aria-pressed={mode === 'dark'} aria-label="Dark mode" style={pill(mode === 'dark')}>
        <Icon name="moon" size={13} />
      </button>
    </div>
  )
}

/** Runs before paint so a dark-mode visitor never sees a white flash. */
export const themeInitScript = `(function(){try{var m=localStorage.getItem('la-theme');document.documentElement.dataset.theme=(m==='dark'||m==='light')?m:'light';}catch(e){document.documentElement.dataset.theme='light';}})();`
