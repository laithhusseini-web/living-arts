'use client'
import React from 'react'
import Link from 'next/link'

/** Category filter — 4px rectangle, inverts when selected. */
export function Chip({
  selected,
  children,
  href,
}: {
  selected?: boolean
  children?: React.ReactNode
  href: string
}) {
  return (
    <Link
      href={href}
      // Filtering is an in-place change — Next scrolls to top by default, which
      // yanks you back up to the hero every time you pick a category.
      scroll={false}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        minHeight: 38,
        padding: '8px 17px',
        borderRadius: 'var(--radius)',
        fontFamily: 'var(--font-body)',
        fontSize: 13,
        fontWeight: 300,
        lineHeight: 1,
        border: `1px solid ${selected ? 'transparent' : 'var(--line-mid)'}`,
        background: selected ? 'var(--btn-bg)' : 'transparent',
        color: selected ? 'var(--btn-fg)' : 'var(--ink)',
        transition: 'background var(--dur) var(--ease), color var(--dur) var(--ease)',
      }}
    >
      {children}
    </Link>
  )
}
