import React from 'react'
import Link from 'next/link'
import { Icon } from './Icon'

/** Rectangle button, 4px radius. `primary` inverts against the page; `outline` is a hairline. */
export function Button({
  href,
  variant = 'primary',
  icon,
  external,
  onDark,
  children,
  style,
}: {
  href: string
  variant?: 'primary' | 'outline'
  icon?: string
  external?: boolean
  /** Sitting on the hero photo — force the light-on-dark skin. */
  onDark?: boolean
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    padding: '13px 24px',
    minHeight: 44,
    borderRadius: 'var(--radius)',
    fontFamily: 'var(--font-body)',
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1,
    transition: 'background var(--dur) var(--ease), color var(--dur) var(--ease), border-color var(--dur) var(--ease)',
    ...style,
  }
  const skin: React.CSSProperties = onDark
    ? variant === 'primary'
      ? { background: 'var(--hero-accent)', color: '#0d0f0e', border: '1px solid transparent' }
      : { background: 'transparent', color: 'var(--hero-ink)', border: '1px solid var(--hero-line)' }
    : variant === 'primary'
      ? { background: 'var(--btn-bg)', color: 'var(--btn-fg)', border: '1px solid transparent' }
      : { background: 'transparent', color: 'var(--ink)', border: '1px solid var(--line-strong)' }

  const inner = (
    <>
      <span>{children}</span>
      {icon ? (
        <Icon
          name={icon}
          size={15}
          strokeWidth={1.6}
          style={{
            color: onDark
              ? variant === 'primary'
                ? '#0d0f0e'
                : 'var(--hero-accent)'
              : variant === 'primary'
                ? 'var(--btn-icon)'
                : 'var(--accent)',
          }}
        />
      ) : null}
    </>
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" style={{ ...base, ...skin }}>
        {inner}
      </a>
    )
  }
  return (
    <Link href={href} style={{ ...base, ...skin }}>
      {inner}
    </Link>
  )
}
