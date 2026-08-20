import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { SpecTile } from '@/components/ds/SpecTile'
import { PlantCard } from '@/components/ds/PlantCard'
import { Badge } from '@/components/ds/Badge'
import { Button } from '@/components/ds/Button'
import { Icon } from '@/components/ds/Icon'
import { Reveal } from '@/components/Reveal'
import {
  LIGHT_LABELS,
  GROWTH_LABELS,
  DIFFICULTY_LABELS,
  humidityRange,
  tempRange,
  mediaUrl,
  mediaAlt,
} from '@/lib/labels'

const getPlant = async (slug: string) => {
  const payload = await getPayload({ config: await config })
  const { docs } = await payload.find({
    collection: 'plants',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  return docs[0] ?? null
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const plant = await getPlant(slug)
  if (!plant) return {}
  return { title: plant.name, description: plant.bestGrowth || plant.origin || undefined }
}

export default async function PlantPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const plant = await getPlant(slug)
  if (!plant) notFound()

  const payload = await getPayload({ config: await config })
  const settings = await payload.findGlobal({ slug: 'settings' })
  const currency = settings?.currency || 'JOD'

  const { docs: more } = await payload.find({
    collection: 'plants',
    where: { id: { not_equals: plant.id } },
    limit: 3,
    depth: 1,
    sort: ['-featured', 'name'],
  })

  const photo = mediaUrl(plant.photo, 'full')
  const gallery = Array.isArray(plant.gallery) ? plant.gallery : []
  const humidity = humidityRange(plant)
  const temp = tempRange(plant)
  const isLimited = typeof plant.stock === 'number' && plant.stock > 0 && plant.stock <= 5

  const categoryNames = Array.isArray(plant.categories)
    ? plant.categories
        .map((c) => (typeof c === 'object' && c !== null ? c.title : null))
        .filter((t): t is string => Boolean(t))
    : []

  const specRows = [
    { label: 'Origin', value: plant.origin },
    { label: 'Best growth', value: plant.bestGrowth },
  ].filter((r) => Boolean(r.value))

  const wa = settings?.whatsapp
    ? `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
        `Hello ${settings.shopName}! I'd like to ask about the ${plant.name}.`,
      )}`
    : null

  return (
    <article className="la-container" style={{ paddingBlock: '34px 0' }}>
      <Link
        href="/"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 300, color: 'var(--ink-muted)' }}
      >
        <Icon name="arrow-left" size={14} />
        Back to plants
      </Link>

      <div className="la-detail" style={{ marginTop: 26 }}>
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
            {photo ? (
              <img
                src={photo}
                alt={mediaAlt(plant.photo, plant.name)}
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              />
            ) : (
              <Icon name="leaf" size={80} strokeWidth={1} style={{ color: 'var(--ink-muted)', opacity: 0.45 }} />
            )}
            {isLimited ? (
              <Badge style={{ position: 'absolute', top: 16, left: 16 }}>Limited — {plant.stock} left</Badge>
            ) : null}
          </div>

          {gallery.length > 0 ? (
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {gallery.map((item, i) => {
                const src = mediaUrl(item, 'thumbnail')
                if (!src) return null
                return (
                  <img
                    key={i}
                    src={src}
                    alt={mediaAlt(item, `${plant.name}, photo ${i + 2}`)}
                    style={{
                      width: 92,
                      height: 92,
                      objectFit: 'contain',
                      display: 'block',
                      padding: 10,
                      background: 'var(--bed)',
                      borderRadius: 'var(--radius-card)',
                    }}
                  />
                )
              })}
            </div>
          ) : null}
        </div>

        <div>
          {categoryNames.length > 0 ? (
            <p className="lbl" style={{ color: 'var(--accent)', margin: '0 0 14px' }}>
              {categoryNames.join(' · ')}
            </p>
          ) : null}

          <h1 className="display" style={{ fontSize: 'clamp(38px, 5vw, 62px)', lineHeight: 0.96 }}>
            {plant.name}
          </h1>
          {plant.latin ? (
            <p className="latin" style={{ fontSize: 23, margin: '6px 0 0' }}>
              {plant.latin}
            </p>
          ) : null}

          <div style={{ marginTop: 34, borderTop: '1px solid var(--line-mid)' }}>
            {specRows.map((row) => (
              <div key={row.label} className="la-specrow">
                <div className="lbl" style={{ color: 'var(--ink-muted)', paddingBlock: 18 }}>
                  {row.label}
                </div>
                <div style={{ paddingBlock: 18, fontSize: 15, fontWeight: 300, lineHeight: 1.55, whiteSpace: 'pre-line' }}>
                  {row.value}
                </div>
              </div>
            ))}
            <div className="la-specrow" style={{ borderBottomColor: 'var(--line-mid)' }}>
              <div className="lbl" style={{ color: 'var(--ink-muted)', paddingBlock: 18 }}>
                Price
              </div>
              <div
                className="display"
                style={{ paddingBlock: 15, fontSize: 32, fontWeight: 400, color: 'var(--accent)', lineHeight: 1.1 }}
              >
                {plant.price} {currency}
              </div>
            </div>
          </div>

          <div className="la-specs" style={{ marginTop: 30 }}>
            {plant.light ? (
              <SpecTile icon={plant.light === 'low' ? 'moon' : 'sun'} label="Light" value={LIGHT_LABELS[plant.light]} />
            ) : null}
            {humidity ? <SpecTile icon="droplet" label="Humidity" value={humidity} /> : null}
            {temp ? <SpecTile icon="thermometer" label="Temperature" value={temp} /> : null}
            {plant.growth ? <SpecTile icon="sprout" label="Growth" value={GROWTH_LABELS[plant.growth]} /> : null}
            {plant.difficulty ? (
              <SpecTile icon="leaf" label="Difficulty" value={DIFFICULTY_LABELS[plant.difficulty]} />
            ) : null}
            {typeof plant.stock === 'number' ? (
              <SpecTile icon="pin" label="In stock" value={`${plant.stock} ${plant.stock === 1 ? 'pot' : 'pots'}`} />
            ) : null}
          </div>

          {wa ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
              <Button href={wa} icon="chat" external>
                Ask about this plant
              </Button>
              <span style={{ fontSize: 13, fontWeight: 300, color: 'var(--ink-muted)' }}>
                Pickup &amp; delivery in Amman
              </span>
            </div>
          ) : null}
        </div>
      </div>

      {more.length > 0 ? (
        <section style={{ paddingBlock: '96px 0' }}>
          <Reveal as="h2" className="display" style={{ fontSize: 30, marginBottom: 26 }}>
            More from the collection
          </Reveal>
          <div className="la-grid">
            {more.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <PlantCard
                  name={p.name}
                  latin={p.latin}
                  href={`/plants/${p.slug}`}
                  photo={mediaUrl(p.photo, 'card')}
                  light={p.light}
                  lightLabel={p.light ? LIGHT_LABELS[p.light] : undefined}
                  price={p.price}
                  stock={p.stock}
                  featured={p.featured}
                  currency={currency}
                />
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  )
}
