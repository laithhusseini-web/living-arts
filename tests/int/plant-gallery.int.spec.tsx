import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PlantGallery } from '@/components/PlantGallery'

describe('PlantGallery', () => {
  it('shows the selected thumbnail in the main image', () => {
    render(
      <PlantGallery
        images={[
          { alt: 'Primary plant', src: '/primary.jpg', thumbnail: '/primary-thumb.jpg' },
          { alt: 'Plant detail', src: '/detail.jpg', thumbnail: '/detail-thumb.jpg' },
        ]}
      />,
    )

    const frame = screen.getByTestId('plant-gallery-frame')
    expect(frame.style.aspectRatio).toBe('1 / 1')
    expect(screen.getByTestId('plant-gallery-stage').style.position).toBe('absolute')
    expect(screen.getByRole('img', { name: 'Primary plant' }).getAttribute('src')).toBe(
      '/primary.jpg',
    )

    const detailThumbnail = screen.getByRole('button', { name: 'View Plant detail' })
    fireEvent.click(detailThumbnail)

    expect(screen.getByRole('img', { name: 'Plant detail' }).getAttribute('src')).toBe(
      '/detail.jpg',
    )
    expect(frame.style.aspectRatio).toBe('1 / 1')
    expect(detailThumbnail.getAttribute('aria-pressed')).toBe('true')
  })
})
