import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: { uk: 'Користувач', en: 'User', pl: 'Użytkownik' }, plural: { uk: 'Користувачі', en: 'Users', pl: 'Użytkownicy' } },
  admin: { useAsTitle: 'email', group: { uk: 'Система', en: 'System', pl: 'System' } },
  auth: true,
  fields: [
    { name: 'name', type: 'text', label: { uk: 'Ім’я', en: 'Name', pl: 'Imię' } },
  ],
}
