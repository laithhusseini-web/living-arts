import React from 'react'

/**
 * Small rectangle mark on a card. `fill` is the chartreuse — used for the
 * commercially urgent "Limited". `soft` is a hairline outline, so a card
 * carrying both tags still reads clearly.
 */
export function Badge({
  tone = 'fill',
  children,
  style,
}: {
  tone?: 'fill' | 'soft'
  children?: React.ReactNode
  style?: React.CSSProperties
}) {
  const skin: React.CSSProperties =
    tone === 'fill'
      ? { background: 'var(--accent-fill)', color: 'var(--on-accent-fill)', border: '1px solid transparent' }
      : { background: 'var(--card)', color: 'var(--ink)', border: '1px solid var(--line-strong)' }

  return (
    <span
      className="lbl"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '5px 11px',
        borderRadius: 'var(--radius)',
        fontSize: 9.5,
        ...skin,
        ...style,
      }}
    >
      {children}
    </span>
  )
}
