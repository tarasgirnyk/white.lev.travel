import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: { uk: 'Стаття', en: 'Post', pl: 'Wpis' },
    plural: { uk: 'Новини / Блог', en: 'News / Blog', pl: 'Aktualności' },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'publishedAt'],
    group: { uk: 'Контент', en: 'Content', pl: 'Treść' },
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true
      return { status: { equals: 'published' } }
    },
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true, label: { uk: 'Заголовок', en: 'Title', pl: 'Tytuł' } },
    { name: 'slug', type: 'text', required: true, unique: true, index: true, label: { uk: 'URL (slug)', en: 'Slug', pl: 'Slug' } },
    { name: 'excerpt', type: 'textarea', localized: true, label: { uk: 'Анонс', en: 'Excerpt', pl: 'Zajawka' } },
    { name: 'cover', type: 'upload', relationTo: 'media', label: { uk: 'Обкладинка', en: 'Cover', pl: 'Okładka' } },
    { name: 'content', type: 'richText', localized: true, editor: lexicalEditor({}), label: { uk: 'Текст', en: 'Content', pl: 'Treść' } },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      admin: { position: 'sidebar' },
      label: { uk: 'Статус', en: 'Status', pl: 'Status' },
      options: [
        { label: { uk: 'Чернетка', en: 'Draft', pl: 'Szkic' }, value: 'draft' },
        { label: { uk: 'Опубліковано', en: 'Published', pl: 'Opublikowane' }, value: 'published' },
      ],
    },
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar' }, label: { uk: 'Дата публікації', en: 'Published at', pl: 'Data publikacji' } },
  ],
}
