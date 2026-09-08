import { notFound } from 'next/navigation'
import { getDict } from '@/i18n'
import { isLocale, type Locale } from '@/i18n/config'
import { getHouses } from '@/lib/payload'
import type { HouseDoc } from '@/lib/types'
import { HouseCard } from '@/components/HouseCard'

export const dynamic = 'force-dynamic'

export default async function HousesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const l = locale as Locale
  const dict = getDict(l)

  let houses: HouseDoc[] = []
  try {
    houses = (await getHouses(l)) as unknown as HouseDoc[]
  } catch {
    houses = []
  }

  return (
    <section className="section">
      <div className="container-wlt">
        <div className="max-w-2xl">
          <h1 className="display text-4xl sm:text-5xl">{dict.houses.title}</h1>
          <p className="mt-4 text-fg-dim">{dict.houses.subtitle}</p>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {houses.map((h) => (
            <HouseCard key={h.id} house={h} locale={l} dict={dict} />
          ))}
        </div>
      </div>
    </section>
  )
}
