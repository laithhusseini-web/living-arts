import type { Plant } from '@/payload-types'

export const LIGHT_LABELS: Record<string, string> = {
  low: 'Low',
  medium: 'Medium',
  bright: 'Bright indirect',
}

export const GROWTH_LABELS: Record<string, string> = {
  slow: 'Slow',
  moderate: 'Moderate',
  fast: 'Fast',
}

export const DIFFICULTY_LABELS: Record<string, string> = {
  easy: 'Easy',
  moderate: 'Moderate',
  demanding: 'Demanding',
}

const range = (min?: number | null, max?: number | null, unit = '') => {
  if (min == null && max == null) return null
  if (min != null && max != null) return `${min}–${max}${unit}`
  return `${min ?? max}${unit}`
}

export const humidityRange = (plant: Pick<Plant, 'humidityMin' | 'humidityMax'>) =>
  range(plant.humidityMin, plant.humidityMax, '%')

export const tempRange = (plant: Pick<Plant, 'tempMin' | 'tempMax'>) =>
  range(plant.tempMin, plant.tempMax, '°C')

/** Payload upload fields come back as an id or the populated doc — this narrows to a URL. */
export const mediaUrl = (value: unknown, size?: 'thumbnail' | 'card' | 'full'): string | null => {
  if (!value || typeof value !== 'object') return null
  const doc = value as { url?: string | null; sizes?: Record<string, { url?: string | null }> }
  if (size && doc.sizes?.[size]?.url) return doc.sizes[size].url ?? null
  return doc.url ?? null
}

export const mediaAlt = (value: unknown, fallback: string): string => {
  if (!value || typeof value !== 'object') return fallback
  const doc = value as { alt?: string | null }
  return doc.alt || fallback
}
