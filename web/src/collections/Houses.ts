import type { CollectionConfig } from 'payload'

export const Houses: CollectionConfig = {
  slug: 'houses',
  labels: {
    singular: { uk: 'Будинок', en: 'House', pl: 'Dom' },
    plural: { uk: 'Будинки', en: 'Houses', pl: 'Domy' },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'segment', 'order', 'assetPriceUsd'],
    group: { uk: 'Контент', en: 'Content', pl: 'Treść' },
  },
  access: { read: () => true },
  defaultSort: 'order',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'title', type: 'text', required: true, localized: true, admin: { width: '60%' }, label: { uk: 'Назва', en: 'Title', pl: 'Nazwa' } },
        {
          name: 'segment',
          type: 'select',
          required: true,
          admin: { width: '40%' },
          label: { uk: 'Сегмент', en: 'Segment', pl: 'Segment' },
          options: [
            { label: 'Compact', value: 'compact' },
            { label: 'Comfort', value: 'comfort' },
            { label: 'VIP', value: 'vip' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'slug', type: 'text', required: true, unique: true, index: true, admin: { width: '50%' }, label: { uk: 'URL (slug)', en: 'Slug', pl: 'Slug' } },
        { name: 'order', type: 'number', defaultValue: 0, admin: { width: '50%' }, label: { uk: 'Порядок', en: 'Order', pl: 'Kolejność' } },
      ],
    },
    { name: 'tagline', type: 'text', localized: true, label: { uk: 'Підзаголовок', en: 'Tagline', pl: 'Podtytuł' } },
    { name: 'summary', type: 'textarea', localized: true, label: { uk: 'Короткий опис', en: 'Summary', pl: 'Opis' } },
    {
      label: { uk: 'Параметри', en: 'Specs', pl: 'Parametry' },
      type: 'collapsible',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'areaFrom', type: 'number', label: { uk: 'Площа від, м²', en: 'Area from, m²', pl: 'Pow. od, m²' } },
            { name: 'areaTo', type: 'number', label: { uk: 'Площа до, м²', en: 'Area to, m²', pl: 'Pow. do, m²' } },
            { name: 'terraceArea', type: 'number', label: { uk: 'Тераса, м²', en: 'Terrace, m²', pl: 'Taras, m²' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'bedrooms', type: 'number', label: { uk: 'Спальні', en: 'Bedrooms', pl: 'Sypialnie' } },
            { name: 'bathrooms', type: 'number', label: { uk: 'Санвузли', en: 'Bathrooms', pl: 'Łazienki' } },
            { name: 'guests', type: 'number', label: { uk: 'Гостей', en: 'Guests', pl: 'Goście' } },
          ],
        },
      ],
    },
    {
      label: { uk: 'Економіка (гіпотези)', en: 'Economics (hypotheses)', pl: 'Ekonomia (hipotezy)' },
      type: 'collapsible',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'buildCostUsd', type: 'number', label: { uk: 'Собівартість, $', en: 'Build cost, $', pl: 'Koszt budowy, $' } },
            { name: 'assetPriceUsd', type: 'number', label: { uk: 'Ціна активу, $', en: 'Asset price, $', pl: 'Cena aktywa, $' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'netIncomeYearUsd', type: 'number', label: { uk: 'Чистий дохід/рік, $', en: 'Net income/yr, $', pl: 'Dochód netto/rok, $' } },
            { name: 'yieldPct', type: 'number', label: { uk: 'Дохідність, %', en: 'Yield, %', pl: 'Rentowność, %' } },
            { name: 'paybackYears', type: 'number', label: { uk: 'Окупність, р.', en: 'Payback, yrs', pl: 'Zwrot, lata' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'nightlyMinUsd', type: 'number', label: { uk: 'Оренда від, $/ніч', en: 'Rent from, $/night', pl: 'Najem od, $/noc' } },
            { name: 'nightlyMaxUsd', type: 'number', label: { uk: 'Оренда до, $/ніч', en: 'Rent to, $/night', pl: 'Najem do, $/noc' } },
          ],
        },
      ],
    },
    {
      name: 'features',
      type: 'array',
      localized: true,
      label: { uk: 'Ключові особливості', en: 'Key features', pl: 'Cechy' },
      labels: { singular: { uk: 'Особливість', en: 'Feature', pl: 'Cecha' }, plural: { uk: 'Особливості', en: 'Features', pl: 'Cechy' } },
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'rooms',
      type: 'array',
      localized: true,
      label: { uk: 'Приміщення', en: 'Rooms', pl: 'Pomieszczenia' },
      fields: [
        { name: 'name', type: 'text', required: true, label: { uk: 'Приміщення', en: 'Room', pl: 'Pomieszczenie' } },
        { name: 'area', type: 'text', label: { uk: 'Площа', en: 'Area', pl: 'Powierzchnia' } },
        { name: 'note', type: 'text', label: { uk: 'Примітка', en: 'Note', pl: 'Uwaga' } },
      ],
    },
    { name: 'heroImage', type: 'upload', relationTo: 'media', label: { uk: 'Головне зображення', en: 'Hero image', pl: 'Zdjęcie główne' } },
    { name: 'gallery', type: 'upload', relationTo: 'media', hasMany: true, label: { uk: 'Галерея', en: 'Gallery', pl: 'Galeria' } },
  ],
}
