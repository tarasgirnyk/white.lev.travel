import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: { uk: 'Медіа', en: 'Media', pl: 'Media' }, plural: { uk: 'Медіа', en: 'Media', pl: 'Media' } },
  admin: { group: { uk: 'Контент', en: 'Content', pl: 'Treść' } },
  access: { read: () => true },
  upload: {
    staticDir: process.env.MEDIA_DIR || 'media',
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'thumbnail', width: 480 },
      { name: 'card', width: 900 },
      { name: 'hero', width: 1920 },
    ],
  },
  fields: [
    { name: 'alt', type: 'text', localized: true, label: { uk: 'Опис (alt)', en: 'Alt text', pl: 'Tekst alt' } },
    { name: 'credit', type: 'text', label: { uk: 'Автор/джерело', en: 'Credit', pl: 'Autor' } },
  ],
}
