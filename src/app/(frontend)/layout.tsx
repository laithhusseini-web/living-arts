import React from 'react'
import { headers as getHeaders } from 'next/headers'
import { Cormorant_Garamond, Spectral } from 'next/font/google'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { SiteHeader, SiteFooter } from '@/components/SiteShell'
import { themeInitScript } from '@/components/ThemeToggle'
import './styles.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const spectral = Spectral({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  variable: '--font-spectral',
  display: 'swap',
})

export async function generateMetadata() {
  const payload = await getPayload({ config: await config })
  const settings = await payload.findGlobal({ slug: 'settings' })
  return {
    title: {
      default: settings?.shopName || 'Living Arts',
      template: `%s — ${settings?.shopName || 'Living Arts'}`,
    },
    description: settings?.tagline || 'Rare little worlds, and the wisdom to grow them.',
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({ config: await config })
  const settings = await payload.findGlobal({ slug: 'settings' })
  const { user } = await payload.auth({ headers: await getHeaders() })

  return (
    <html
      lang="en"
      data-theme="light"
      // the inline script below rewrites data-theme before hydration
      suppressHydrationWarning
      className={`${cormorant.variable} ${spectral.variable}`}
    >
      <body>
        {/* First thing in <body>, so it runs before anything paints. It must NOT
            live in an explicit <head> — Next owns that, and wrapping it there
            shifts the DOM between server and client and breaks hydration. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <SiteHeader shopName={settings?.shopName || 'Living Arts'} isLoggedIn={Boolean(user)} />
        <main>{children}</main>
        <SiteFooter note={settings?.footerNote} shopName={settings?.shopName || 'Living Arts'} />
      </body>
    </html>
  )
}
