import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  access: { read: () => true },
  admin: {
    group: 'Shop',
    description: 'Shop-wide details used in the header, footer and WhatsApp order links.',
  },
  fields: [
    { name: 'shopName', type: 'text', required: true, defaultValue: 'Living Arts' },
    {
      name: 'tagline',
      type: 'textarea',
      defaultValue: 'Rare little worlds,\nand the wisdom\nto grow them.',
      admin: {
        description:
          'The hero headline. Each line break becomes its own line, and the lines rise in one after another.',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Background photo for the hero band. Leave empty and a soft green wash shows instead. Landscape, 2000px wide or more.',
      },
    },
    {
      name: 'kicker',
      type: 'text',
      defaultValue: 'Terrariums · Vivariums · House plants — Amman, Jordan',
    },
    {
      name: 'whatsapp',
      type: 'text',
      admin: { description: 'International format, digits only — e.g. 962790000000' },
    },
    { name: 'currency', type: 'text', required: true, defaultValue: 'JOD' },
    {
      name: 'footerNote',
      type: 'textarea',
      defaultValue: 'Living Arts — rare little worlds, grown with wisdom.',
    },
  ],
}
