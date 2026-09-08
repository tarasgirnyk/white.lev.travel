import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: { uk: 'Налаштування сайту', en: 'Site settings', pl: 'Ustawienia' },
  admin: { group: { uk: 'Система', en: 'System', pl: 'System' } },
  access: { read: () => true },
  fields: [
    {
      label: { uk: 'Контакти', en: 'Contacts', pl: 'Kontakt' },
      type: 'collapsible',
      fields: [
        { name: 'phone', type: 'text', label: { uk: 'Телефон', en: 'Phone', pl: 'Telefon' } },
        { name: 'email', type: 'email', label: { uk: 'Email', en: 'Email', pl: 'Email' } },
        { name: 'telegram', type: 'text', label: 'Telegram' },
        { name: 'instagram', type: 'text', label: 'Instagram' },
        { name: 'address', type: 'text', localized: true, label: { uk: 'Адреса', en: 'Address', pl: 'Adres' } },
      ],
    },
  ],
}
