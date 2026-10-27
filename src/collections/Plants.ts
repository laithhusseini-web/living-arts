import type { CollectionConfig } from 'payload'

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const Plants: CollectionConfig = {
  slug: 'plants',
  access: { read: () => true },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'latin', 'price', 'stock', 'categories'],
    group: 'Catalogue',
    description: 'One entry per plant. Everything on the plant page comes from here.',
  },
  defaultSort: 'name',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Plant',
          description: 'The identity and price shown on the card.',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  admin: { width: '50%', description: 'e.g. Shield Aralia' },
                },
                {
                  name: 'latin',
                  type: 'text',
                  admin: {
                    width: '50%',
                    description: 'Botanical name — always shown in italic serif. e.g. Polyscias scutellaria',
                  },
                },
              ],
            },
            {
              name: 'slug',
              type: 'text',
              unique: true,
              index: true,
              admin: {
                position: 'sidebar',
                description: 'Leave blank to generate from the name.',
              },
              hooks: {
                beforeValidate: [
                  ({ value, data }) => {
                    if (typeof value === 'string' && value.length > 0) return slugify(value)
                    if (typeof data?.name === 'string') return slugify(data.name)
                    return value
                  },
                ],
              },
            },
            {
              name: 'photo',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'The main photo shown on the card and at the top of the plant page.' },
            },
            {
              name: 'gallery',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
              admin: { description: 'Extra photos, shown as thumbnails under the main one.' },
            },
            {
              name: 'origin',
              type: 'textarea',
              admin: {
                description:
                  'Where it comes from in the wild. e.g. Eastern Malesia to the Southwest Pacific (Maluku, New Guinea, Solomon Islands & Vanuatu)',
              },
            },
            {
              name: 'bestGrowth',
              type: 'textarea',
              label: 'Best growth',
              admin: {
                description:
                  'The one-glance summary on the spec table. e.g. Warm, humid conditions; bright indirect light to partial shade.',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'price',
                  type: 'number',
                  required: true,
                  min: 0,
                  admin: { width: '50%', description: 'In JOD.' },
                },
                {
                  name: 'stock',
                  type: 'number',
                  required: true,
                  defaultValue: 0,
                  min: 0,
                  admin: { width: '33%', description: '3 or fewer shows the "Limited" badge.' },
                },
              ],
            },
            {
              name: 'featured',
              type: 'checkbox',
              // Must default to false, never NULL: Postgres sorts DESC as
              // NULLS FIRST, so NULL rows would outrank the featured ones.
              defaultValue: false,
              admin: {
                position: 'sidebar',
                description: 'Pins it to the top of the shop and shows a "Featured" tag on the card.',
              },
            },
            {
              name: 'categories',
              type: 'relationship',
              relationTo: 'categories',
              hasMany: true,
              admin: { position: 'sidebar', description: 'A plant can sit in more than one.' },
            },
          ],
        },
        {
          label: 'Conditions',
          description: 'Drives the spec tiles and the light / humidity glance on the card.',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'light',
                  type: 'select',
                  defaultValue: 'medium',
                  admin: { width: '50%' },
                  options: [
                    { label: 'Low', value: 'low' },
                    { label: 'Medium', value: 'medium' },
                    { label: 'Bright indirect', value: 'bright' },
                  ],
                },
                {
                  name: 'difficulty',
                  type: 'select',
                  defaultValue: 'easy',
                  admin: { width: '50%' },
                  options: [
                    { label: 'Easy', value: 'easy' },
                    { label: 'Moderate', value: 'moderate' },
                    { label: 'Demanding', value: 'demanding' },
                  ],
                },
              ],
            },
            {
              name: 'growth',
              type: 'select',
              defaultValue: 'moderate',
              options: [
                { label: 'Slow', value: 'slow' },
                { label: 'Moderate', value: 'moderate' },
                { label: 'Fast', value: 'fast' },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'humidityMin',
                  type: 'number',
                  label: 'Humidity min (%)',
                  min: 0,
                  max: 100,
                  admin: { width: '25%' },
                },
                {
                  name: 'humidityMax',
                  type: 'number',
                  label: 'Humidity max (%)',
                  min: 0,
                  max: 100,
                  admin: { width: '25%' },
                },
                {
                  name: 'tempMin',
                  type: 'number',
                  label: 'Temperature min (°C)',
                  admin: { width: '25%' },
                },
                {
                  name: 'tempMax',
                  type: 'number',
                  label: 'Temperature max (°C)',
                  admin: { width: '25%' },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
