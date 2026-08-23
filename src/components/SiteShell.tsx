'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'

/**
 * On the catalogue the header sits ON the hero — the background photo runs
 * behind both, with a top-down scrim keeping the menu readable. Everywhere
 * else it is an ordinary header with a hairline under it.
 */
export function SiteHeader({ shopName, isLoggedIn }: { shopName: string; isLoggedIn?: boolean }) {
  const pathname = usePathname()
  const overlay = pathname === '/'
  const wordmark = shopName.match(/^(.*)(\barts\b)(.*)$/i)

  return (
    <header className={`la-header${overlay ? ' la-header--overlay' : ''}`}>
      <div
        className="la-container la-header__bar"
      >
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 11, color: 'inherit' }}>
          <img className="la-mark" src="/brand/logo.png" alt="" width={26} height={39} style={{ display: 'block', height: 'auto' }} />
          <span className="display la-wordmark" style={{ letterSpacing: '0.02em', lineHeight: 1 }}>
            {wordmark ? (
              <>
                {wordmark[1]}
                <span className="la-wordmark__accent">{wordmark[2]}</span>
                {wordmark[3]}
              </>
            ) : (
              shopName
            )}
          </span>
        </Link>
        <nav>
          {/* One entry, straight into Payload — "Admin" once signed in, "Login" before. */}
          <Link href="/admin" style={{ color: overlay ? 'inherit' : 'var(--ink-nav)' }}>
            {isLoggedIn ? 'Admin' : 'Login'}
          </Link>
        </nav>
        <ThemeToggle onDark={overlay} />
      </div>
    </header>
  )
}

export function SiteFooter({ note, shopName }: { note?: string | null; shopName: string }) {
  const year = new Date().getFullYear()
  return (
    <footer style={{ marginTop: 96, borderTop: '1px solid var(--line)' }}>
      <div
        className="la-container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 14,
          paddingBlock: '40px 44px',
          textAlign: 'center',
        }}
      >
        <img
          src="/brand/logo.png"
          alt=""
          width={22}
          height={33}
          style={{ display: 'block', width: 22, height: 'auto', opacity: 0.75 }}
        />
        {note ? (
          <span style={{ fontSize: 13, fontWeight: 300, color: 'var(--ink-muted)', maxWidth: 520 }}>{note}</span>
        ) : null}
        <span style={{ fontSize: 12, fontWeight: 300, color: 'var(--ink-muted)', opacity: 0.8 }}>
          &copy; {year} {shopName}. All rights reserved.
        </span>
      </div>
    </footer>
  )
}
