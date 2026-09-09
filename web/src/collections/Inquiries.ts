import type { CollectionConfig } from 'payload'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  labels: {
    singular: { uk: 'Заявка', en: 'Inquiry', pl: 'Zgłoszenie' },
    plural: { uk: 'Заявки', en: 'Inquiries', pl: 'Zgłoszenia' },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'intent', 'phone', 'houseType', 'status', 'createdAt'],
    group: { uk: 'Ліди', en: 'Leads', pl: 'Leady' },
  },
  access: {
    // Публічне створення заявки з форми сайту; читання/зміна — лише авторизовані
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, label: { uk: 'Ім’я', en: 'Name', pl: 'Imię' } },
        { name: 'phone', type: 'text', required: true, label: { uk: 'Телефон', en: 'Phone', pl: 'Telefon' } },
      ],
    },
    { name: 'email', type: 'email', label: { uk: 'Email', en: 'Email', pl: 'Email' } },
    {
      name: 'intent',
      type: 'select',
      defaultValue: 'invest',
      label: { uk: 'Мета', en: 'Intent', pl: 'Cel' },
      options: [
        { label: { uk: 'Інвестувати', en: 'Invest', pl: 'Inwestować' }, value: 'invest' },
        { label: { uk: 'Забронювати відпочинок', en: 'Book a stay', pl: 'Rezerwacja' }, value: 'stay' },
        { label: { uk: 'Інше', en: 'Other', pl: 'Inne' }, value: 'other' },
      ],
    },
    {
      name: 'houseType',
      type: 'select',
      label: { uk: 'Тип будинку', en: 'House type', pl: 'Typ domu' },
      options: [
        { label: 'Compact (архів)', value: 'compact' },
        { label: 'Comfort', value: 'comfort' },
        { label: 'VIP (окремий концепт)', value: 'vip' },
        { label: { uk: 'Не визначився', en: 'Not sure', pl: 'Nie wiem' }, value: 'unsure' },
      ],
    },
    { name: 'message', type: 'textarea', label: { uk: 'Повідомлення', en: 'Message', pl: 'Wiadomość' } },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      label: { uk: 'Статус', en: 'Status', pl: 'Status' },
      admin: { position: 'sidebar' },
      options: [
        { label: { uk: 'Нова', en: 'New', pl: 'Nowe' }, value: 'new' },
        { label: { uk: 'В роботі', en: 'In progress', pl: 'W toku' }, value: 'progress' },
        { label: { uk: 'Закрита', en: 'Closed', pl: 'Zamknięte' }, value: 'closed' },
      ],
    },
    { name: 'locale', type: 'text', admin: { position: 'sidebar', readOnly: true }, label: { uk: 'Мова форми', en: 'Form locale', pl: 'Język' } },
    { name: 'sourcePath', type: 'text', admin: { position: 'sidebar', readOnly: true }, label: { uk: 'Джерело (URL)', en: 'Source URL', pl: 'Źródło' } },
  ],
}
