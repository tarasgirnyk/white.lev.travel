export type MediaDoc = {
  id: string | number
  url?: string | null
  alt?: string | null
  width?: number | null
  height?: number | null
  sizes?: Record<string, { url?: string | null; width?: number | null; height?: number | null }>
}

export type HouseDoc = {
  id: string | number
  slug: string
  segment: 'compact' | 'comfort' | 'vip'
  order?: number | null
  title: string
  tagline?: string | null
  summary?: string | null
  areaFrom?: number | null
  areaTo?: number | null
  terraceArea?: number | null
  bedrooms?: number | null
  bathrooms?: number | null
  guests?: number | null
  buildCostUsd?: number | null
  assetPriceUsd?: number | null
  netIncomeYearUsd?: number | null
  yieldPct?: number | null
  paybackYears?: number | null
  nightlyMinUsd?: number | null
  nightlyMaxUsd?: number | null
  features?: { text: string }[] | null
  rooms?: { name: string; area?: string | null; note?: string | null }[] | null
  heroImage?: MediaDoc | string | number | null
  gallery?: (MediaDoc | string | number)[] | null
}

export type PostDoc = {
  id: string | number
  slug: string
  title: string
  excerpt?: string | null
  cover?: MediaDoc | string | number | null
  content?: unknown
  publishedAt?: string | null
}

export function mediaUrl(m?: MediaDoc | string | number | null, size?: string): string | null {
  if (!m || typeof m !== 'object') return null
  if (size && m.sizes && m.sizes[size]?.url) return m.sizes[size]!.url ?? null
  return m.url ?? null
}
