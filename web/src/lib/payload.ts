import { getPayload } from 'payload'
import config from '@payload-config'
import type { Locale } from '@/i18n/config'

export async function getPayloadClient() {
  return getPayload({ config })
}

export async function getHouses(locale: Locale) {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'houses',
    locale,
    fallbackLocale: 'uk',
    sort: 'order',
    limit: 50,
    depth: 1,
  })
  return res.docs
}

export async function getHouse(slug: string, locale: Locale) {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'houses',
    locale,
    fallbackLocale: 'uk',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  return res.docs[0] ?? null
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
