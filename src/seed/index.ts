import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '@payload-config'
import { seedCategories, seedPlants } from './data'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const seed = async () => {
  const payload = await getPayload({ config })

  payload.logger.info('Clearing existing catalogue…')
  await payload.delete({ collection: 'plants', where: { id: { exists: true } } })
  await payload.delete({ collection: 'categories', where: { id: { exists: true } } })
  await payload.delete({ collection: 'media', where: { id: { exists: true } } })

  payload.logger.info('Uploading hero image…')
  const heroMedia = await payload.create({
    collection: 'media',
    filePath: path.resolve(dirname, 'images', 'hero-shield-aralia.jpg'),
    data: { alt: 'A Shield Aralia in a terracotta pot against a dark green ground' },
  })

  payload.logger.info('Seeding settings…')
  await payload.updateGlobal({
    slug: 'settings',
    data: {
      heroImage: heroMedia.id,
      shopName: 'Living Arts',
      tagline: 'Rare little worlds,\nand the wisdom\nto grow them.',
      kicker: 'Terrariums · Vivariums · House plants — Amman, Jordan',
      whatsapp: '962790000000',
      currency: 'JOD',
      footerNote: 'Living Arts — rare little worlds, grown with wisdom.',
    },
  })

  payload.logger.info('Seeding categories…')
  const categoryIds = new Map<string, number>()
  for (const category of seedCategories) {
    const doc = await payload.create({ collection: 'categories', data: category })
    categoryIds.set(category.slug, doc.id)
  }

  payload.logger.info('Seeding plants…')
  for (const plant of seedPlants) {
    const { categories, photo, ...rest } = plant

    let photoId: number | undefined
    if (photo) {
      const media = await payload.create({
        collection: 'media',
        filePath: path.resolve(dirname, 'images', photo),
        data: { alt: `${plant.name} (${plant.latin}) in a terracotta pot` },
      })
      photoId = media.id
    }

    await payload.create({
      collection: 'plants',
      data: {
        ...rest,
        photo: photoId,
        categories: categories
          .map((slug) => categoryIds.get(slug))
          .filter((id): id is number => id != null),
      },
    })
    payload.logger.info(`  · ${plant.name}`)
  }

  payload.logger.info(`Done — ${seedPlants.length} plants, ${seedCategories.length} categories.`)
  process.exit(0)
}

await seed()
