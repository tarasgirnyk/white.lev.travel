import { getPayload } from 'payload'
import config from '@payload-config'
import type { Locale } from '@/i18n/config'
import { comfortHouses } from './comfort'
import { mediaUrl, type HouseDoc } from './types'

export async function getPayloadClient() {
  return getPayload({ config })
}

export async function getHouses(locale: Locale) {
  const defaults = comfortHouses(locale)
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'houses', locale, fallbackLocale: 'uk',
    where: { slug: { in: defaults.map(house => house.slug) } },
    limit: defaults.length, depth: 1,
  })
  return defaults.map(fallback => {
    const saved = res.docs.find(house => house.slug === fallback.slug) as HouseDoc | undefined
    if (!saved) return fallback
    return { ...saved, heroImage: mediaUrl(saved.heroImage) ? saved.heroImage : fallback.heroImage }
  })
}

export async function getHouse(slug: string, locale: Locale) {
  if (!comfortHouses(locale).some(house => house.slug === slug)) return null
  return (await getHouses(locale)).find(house => house.slug === slug) ?? null
}

export async function getPosts(locale: Locale) {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'posts',
    locale,
    fallbackLocale: 'uk',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    limit: 50,
    depth: 1,
  })
  return res.docs
}

export async function getPost(slug: string, locale: Locale) {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'posts',
    locale,
    fallbackLocale: 'uk',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
    depth: 1,
  })
  return res.docs[0] ?? null
}

export async function getSettings(locale: Locale) {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'settings', locale, fallbackLocale: 'uk', depth: 0 })
}
