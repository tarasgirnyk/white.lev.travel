import type { Payload } from 'payload'
import { houses } from './data'

// Ідемпотентний сід: створює адміна, будинки, налаштування, якщо їх ще нема.
export const seed = async (payload: Payload): Promise<void> => {
  const log = (m: string) => payload.logger.info(`[seed] ${m}`)

  // --- Адміністратор ---
  const existingUsers = await payload.count({ collection: 'users' })
  if (existingUsers.totalDocs === 0) {
    const email = process.env.ADMIN_EMAIL || 'admin@white.lev.travel'
    const password = process.env.ADMIN_PASSWORD || 'ChangeMe123!'
    await payload.create({
      collection: 'users',
      data: { email, password, name: 'White.Lev.Travel Admin' },
    })
    log(`created admin user: ${email}`)
  }

  // --- Будинки ---
  const existingHouses = await payload.count({ collection: 'houses' })
  if (existingHouses.totalDocs === 0) {
    for (const h of houses) {
      const created = await payload.create({
        collection: 'houses',
        locale: 'uk',
        data: {
          slug: h.slug,
          segment: h.segment,
          order: h.order,
          title: h.title.uk,
          tagline: h.tagline.uk,
          summary: h.summary.uk,
          areaFrom: h.areaFrom,
          areaTo: h.areaTo,
          terraceArea: h.terraceArea,
          bedrooms: h.bedrooms,
          bathrooms: h.bathrooms,
          guests: h.guests,
          buildCostUsd: h.buildCostUsd,
          assetPriceUsd: h.assetPriceUsd,
          netIncomeYearUsd: h.netIncomeYearUsd,
          yieldPct: h.yieldPct,
          paybackYears: h.paybackYears,
          nightlyMinUsd: h.nightlyMinUsd,
          nightlyMaxUsd: h.nightlyMaxUsd,
          features: h.features.uk.map((text) => ({ text })),
          rooms: h.rooms.map((r) => ({ name: r.name.uk, area: r.area, note: r.note?.uk })),
        },
      })

      for (const locale of ['en', 'pl'] as const) {
        await payload.update({
          collection: 'houses',
          id: created.id,
          locale,
          data: {
            title: h.title[locale],
            tagline: h.tagline[locale],
            summary: h.summary[locale],
            features: h.features[locale].map((text) => ({ text })),
            rooms: h.rooms.map((r) => ({ name: r.name[locale], area: r.area, note: r.note?.[locale] })),
          },
        })
      }
      log(`created house: ${h.slug}`)
    }
  }

  // --- Налаштування ---
  await payload.updateGlobal({
    slug: 'settings',
    locale: 'uk',
    data: {
      phone: '+380 XX XXX XX XX',
      email: 'gor@miotex.com',
      telegram: '',
      instagram: '',
      address: 'урочище «Варуш», с. Явора, Турківщина, Львівщина',
    },
  })
  await payload.updateGlobal({
    slug: 'settings',
    locale: 'en',
    data: { address: 'Varush tract, Yavora village, Turka area, Lviv region' },
  })
  await payload.updateGlobal({
    slug: 'settings',
    locale: 'pl',
    data: { address: 'uroczysko „Warusz”, wieś Jawora, rejon Turka, obwód lwowski' },
  })

  log('done')
}
