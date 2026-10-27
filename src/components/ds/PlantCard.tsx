'use client'
import React from 'react'
import Link from 'next/link'
import { Icon } from './Icon'
import { Badge } from './Badge'

/** Catalogue card — a cutout plant sitting on the bed panel, name, botanical name, price. */
export function PlantCard({
  name,
  latin,
  photo,
  href,
  price,
  stock,
  featured,
  currency = 'JOD',
}: {
  name: string
  latin?: string | null
  photo?: string | null
  href: string
  price?: number | string | null
  stock?: number | null
  featured?: boolean | null
  currency?: string
}) {
  const [hov, setHov] = React.useState(false)
  const [loadedPhoto, setLoadedPhoto] = React.useState<string | null>(null)
  const [failedPhoto, setFailedPhoto] = React.useState<string | null>(null)
  const imagePending = Boolean(photo && loadedPhoto !== photo && failedPhoto !== photo)
  const isLimited = typeof stock === 'number' && stock > 0 && stock <= 3

  return (
    <Link
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'block',
        color: 'inherit',
      }}
    >
      <div
        className={imagePending ? 'la-plant-image-loading' : undefined}
        style={{
          position: 'relative',
          aspectRatio: '1 / 1',
          background: 'var(--bed)',
          borderRadius: 'var(--radius-card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 44,
        }}
      >
        {photo && failedPhoto !== photo ? (
          <img
            src={photo}
            alt=""
            loading="lazy"
            onLoad={() => setLoadedPhoto(photo)}
            onError={() => setFailedPhoto(photo)}
            ref={(image) => {
              if (image?.complete && image.naturalWidth > 0) setLoadedPhoto(photo)
            }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
              opacity: imagePending ? 0 : 1,
              transform: hov ? 'scale(1.04)' : 'none',
              transition: 'transform 420ms var(--ease), opacity 240ms ease',
            }}
          />
        ) : (
          <Icon name="leaf" size={44} strokeWidth={1.1} style={{ color: 'var(--ink-muted)', opacity: 0.5 }} />
        )}
        {featured || isLimited ? (
          <div
            style={{
              position: 'absolute',
              top: 12,
              left: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 6,
            }}
          >
            {featured ? <Badge tone="soft">Featured</Badge> : null}
            {isLimited ? <Badge>Limited</Badge> : null}
          </div>
        ) : null}
      </div>

      <div style={{ padding: '18px 2px 0' }}>
        <div className="display" style={{ fontSize: 22, fontWeight: 400, lineHeight: 1.2 }}>
          {name}
        </div>
        {latin ? (
          <div className="latin" style={{ fontSize: 14.5, marginTop: 1 }}>
            {latin}
          </div>
        ) : null}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 15 }}>
          {price != null ? (
            <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--accent)', whiteSpace: 'nowrap' }}>
              {price} {currency}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  )
}
