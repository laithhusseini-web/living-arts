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
    <div style={{ display: 'flex', minWidth: 0, flexDirection: 'column', gap: 12 }}>
      <div
        data-testid="plant-gallery-frame"
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1',
          overflow: 'hidden',
          background: 'var(--bed)',
          borderRadius: 'var(--radius-lg)',
        }}
      >
        <div
          data-testid="plant-gallery-stage"
          style={{
            position: 'absolute',
            inset: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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
        </div>
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
                  flex: '0 0 92px',
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
