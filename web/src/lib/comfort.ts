import { houses } from '@/seed/data'
import type { Locale } from '@/i18n/config'
import type { HouseDoc } from './types'

// Склад серії та початкові дані; збережені в CMS теми редагуються через адмінку.
export function comfortHouses(locale: Locale): HouseDoc[] {
  return houses.map(h => ({
    ...h, id: h.slug, title: h.title[locale], tagline: h.tagline[locale], summary: h.summary[locale],
    features: h.features[locale].map(text => ({ text })),
    rooms: h.rooms.map(r => ({ name: r.name[locale], area: r.area, note: r.note?.[locale] })),
    heroImage: { id: h.slug, url: '/concepts/' + h.slug + '.png', alt: h.title[locale] },
  }))
}
