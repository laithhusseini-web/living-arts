'use client'

import React from 'react'
import { Badge } from './ds/Badge'
import { Icon } from './ds/Icon'

export type PlantGalleryImage = {
  alt: string
  src: string
  thumbnail: string
}

export function PlantGallery({
  images,
  limitedLabel,
}: {
  images: PlantGalleryImage[]
  limitedLabel?: string
}) {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const activeImage = images[activeIndex] ?? images[0]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div
        style={{
          position: 'relative',
          aspectRatio: '1 / 1',
          background: 'var(--bed)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 40,
        }}
      >
        {activeImage ? (
          <img
            key={activeImage.src}
            src={activeImage.src}
            alt={activeImage.alt}
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
          />
        ) : (
          <Icon
            name="leaf"
            size={80}
            strokeWidth={1}
            style={{ color: 'var(--ink-muted)', opacity: 0.45 }}
          />
        )}
        {limitedLabel ? (
          <Badge style={{ position: 'absolute', top: 16, left: 16 }}>{limitedLabel}</Badge>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div
          role="group"
          aria-label="Plant images"
          style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}
        >
          {images.map((image, index) => {
            const selected = index === activeIndex

            return (
              <button
                key={`${image.src}-${index}`}
                type="button"
                aria-label={`View ${image.alt}`}
                aria-pressed={selected}
                onClick={() => setActiveIndex(index)}
                style={{
                  width: 92,
                  height: 92,
                  padding: 9,
                  border: `1px solid ${selected ? 'var(--accent)' : 'var(--line)'}`,
                  borderRadius: 'var(--radius-card)',
                  background: 'var(--bed)',
                  cursor: 'pointer',
                  opacity: selected ? 1 : 0.72,
                  transition: 'border-color var(--dur) var(--ease), opacity var(--dur) var(--ease)',
                }}
              >
                <img
                  src={image.thumbnail}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                />
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
