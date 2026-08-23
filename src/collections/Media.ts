import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: { read: () => true },
  admin: {
    group: 'Catalogue',
    description: 'Plant photography. Drag a file in — the sizes below are made automatically.',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: { description: 'Describe the photo for screen readers and search engines.' },
    },
    {
      name: 'credit',
      type: 'text',
      admin: { description: 'Optional photographer credit.' },
    },
  ],
  upload: {
    // Cutout plants must never be cropped — width only, aspect ratio preserved,
    // and formatOptions keeps the alpha channel through the resize.
    imageSizes: [
      { name: 'thumbnail', width: 400, height: undefined },
      { name: 'card', width: 800, height: undefined },
      { name: 'full', width: 1600, height: undefined },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
}
