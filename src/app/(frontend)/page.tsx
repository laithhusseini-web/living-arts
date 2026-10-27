import React from 'react'
import { getPayload } from 'payload'
import type { Where } from 'payload'
import config from '@/payload.config'
import { PlantCard } from '@/components/ds/PlantCard'
import { Chip } from '@/components/ds/Chip'
import { Button } from '@/components/ds/Button'
import { Reveal } from '@/components/Reveal'
import { mediaUrl } from '@/lib/labels'

export default async function CataloguePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const payload = await getPayload({ config: await config })

  const settings = await payload.findGlobal({ slug: 'settings' })
  const { docs: categories } = await payload.find({ collection: 'categories', limit: 50, sort: 'order' })

  const active = categories.find((c) => c.slug === category)
  const where: Where | undefined = active ? { categories: { in: [active.id] } } : undefined

  const { docs: plants, totalDocs } = await payload.find({
    collection: 'plants',
    where,
    limit: 100,
    depth: 1,
    sort: ['-featured', 'name'],
  })

  const currency = settings?.currency || 'JOD'
  const hero = mediaUrl(settings?.heroImage, 'full')
  // each line break in the tagline becomes its own rising line
  const headlineLines = (settings?.tagline || '').split('\n').filter((l) => l.trim().length > 0)
  const wa = settings?.whatsapp
    ? `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(`Hello ${settings.shopName}!`)}`
    : null

  return (
    <>
      <section className="la-hero">
        {hero ? <div className="la-hero__image" style={{ backgroundImage: `url(${hero})` }} /> : null}
        <div className="la-hero__wash" />
        <div className="la-hero__inner">
          <div className="la-hero__copy">
          {settings?.kicker ? (
            <p
              className="lbl la-enter"
              style={{ color: 'var(--hero-accent)', margin: '0 0 20px', ['--i' as string]: 0 }}
            >
              {settings.kicker}
            </p>
          ) : null}
          <h1 className="display" style={{ fontSize: 'clamp(40px, 6vw, 78px)' }}>
            {headlineLines.map((line, i) => (
              <span key={i} className="la-line">
                <span style={{ ['--i' as string]: i }}>{line}</span>
              </span>
            ))}
          </h1>
          <div
            className="la-enter la-hero__cta"
            style={{ ['--i' as string]: 1 }}
          >
            <Button href="#collection" icon="arrow-right" onDark>
              Browse the collection
            </Button>
            {wa ? (
              <Button href={wa} variant="outline" external onDark>
                Ask on WhatsApp
              </Button>
            ) : null}
            </div>
          </div>
        </div>
      </section>

      <section id="collection" className="la-container" style={{ paddingBlock: '44px 96px' }}>
        <Reveal style={{ display: 'flex', alignItems: 'baseline', gap: 24, flexWrap: 'wrap' }}>
          <h2 className="display" style={{ fontSize: 34 }}>
            {active?.title || 'All items'}
          </h2>
          <span style={{ fontSize: 13, fontWeight: 300, color: 'var(--ink-muted)' }}>
            {totalDocs} {active?.title || (totalDocs === 1 ? 'item' : 'items')}
          </span>
        </Reveal>

        <Reveal delay={0.08} style={{ display: 'flex', flexWrap: 'wrap', gap: 9, margin: '22px 0 34px' }}>
          <Chip href="/#collection" selected={!active}>
            All items
          </Chip>
          {categories.map((c) => (
            <Chip key={c.id} href={`/?category=${encodeURIComponent(c.slug)}#collection`} selected={active?.id === c.id}>
              {c.title}
            </Chip>
          ))}
        </Reveal>

        {plants.length === 0 ? (
          <p style={{ color: 'var(--ink-muted)' }}>
            Nothing here yet. Add plants in the <a href="/admin/collections/plants">back office</a>.
          </p>
        ) : (
          <div className="la-grid">
            {plants.map((plant, i) => (
              <Reveal key={plant.id} className="la-plant-reveal" delay={(i % 4) * 0.08}>
                <PlantCard
                  name={plant.name}
                  latin={plant.latin}
                  href={`/plants/${plant.slug}`}
                  photo={mediaUrl(plant.photo, 'card')}
                  price={plant.price}
                  stock={plant.stock}
                  featured={plant.featured}
                  currency={currency}
                />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
