import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getDict } from '@/i18n'
import { isLocale, type Locale } from '@/i18n/config'
import { getHouse } from '@/lib/payload'
import { mediaUrl, type HouseDoc } from '@/lib/types'
import { usd, usdK, range } from '@/lib/format'
import { HouseSvg } from '@/components/HouseSvg'

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const house = (await getHouse(slug, locale as Locale).catch(() => null)) as HouseDoc | null
  if (!house) return {}
  return { title: `${house.title} · White.Lev.Travel`, description: house.tagline || undefined }
}

export default async function HousePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const l = locale as Locale
  const dict = getDict(l)

  const house = (await getHouse(slug, l).catch(() => null)) as HouseDoc | null
  if (!house) notFound()

  const img = mediaUrl(house.heroImage, 'hero')
  const h = dict.houses

  const stats = [
    { label: h.area, value: range(house.areaFrom, house.areaTo, ' м²') },
    { label: h.terrace, value: house.terraceArea ? `${house.terraceArea} м²` : '—' },
    { label: h.bedrooms, value: house.bedrooms ?? '—' },
    { label: h.guests, value: house.guests ?? '—' },
  ]

  return (
    <article>
      {/* HERO */}
      <div className="relative">
        <div className="aspect-[21/9] bg-ink-2 overflow-hidden">
          {img ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={img} alt={house.title} className="w-full h-full object-cover" />
          ) : (
            <HouseSvg segment={house.segment} className="w-full h-full" />
          )}
        </div>
        <div className="container-wlt -mt-16 relative">
          <div className="card p-7 sm:p-9 max-w-3xl">
            <p className="eyebrow">{house.segment}</p>
            <h1 className="display text-3xl sm:text-5xl mt-3">{house.title}</h1>
            {house.tagline && <p className="mt-4 text-lg text-fg-dim">{house.tagline}</p>}
          </div>
        </div>
      </div>

      <div className="container-wlt section grid lg:grid-cols-[1.6fr_1fr] gap-10 items-start">
        <div>
          {house.summary && <p className="text-lg text-fg-dim leading-relaxed">{house.summary}</p>}

          {house.features && house.features.length > 0 && (
            <ul className="mt-8 grid sm:grid-cols-2 gap-3">
              {house.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2.5 text-fg-dim">
                  <span className="mt-1 text-ember">◆</span>
                  <span>{f.text}</span>
                </li>
              ))}
            </ul>
          )}

          {house.rooms && house.rooms.length > 0 && (
            <div className="mt-10 card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[420px]">
                  <tbody>
                    {house.rooms.map((r, i) => (
                      <tr key={i} className="border-b border-line last:border-0">
                        <td className="py-3.5 px-5 font-medium">{r.name}</td>
                        <td className="py-3.5 px-5 text-muted whitespace-nowrap">{r.area}</td>
                        <td className="py-3.5 px-5 text-fg-dim">{r.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Сайдбар: параметри + економіка + CTA */}
        <aside className="lg:sticky lg:top-24 space-y-5">
          <div className="card p-6 grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <div key={i}>
                <p className="text-xs text-muted">{s.label}</p>
                <p className="text-lg font-semibold mt-0.5">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="card p-6 space-y-3 text-sm">
            <div className="flex justify-between border-b border-line pb-2.5">
              <span className="text-muted">{h.asset}</span>
              <span className="font-semibold">{usd(house.assetPriceUsd)}</span>
            </div>
            <div className="flex justify-between border-b border-line pb-2.5">
              <span className="text-muted">{h.yield}</span>
              <span className="font-semibold text-ember">{house.yieldPct ? `${house.yieldPct}%` : '—'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">{h.nightly}</span>
              <span className="font-semibold">{usdK(house.nightlyMinUsd)}–{usdK(house.nightlyMaxUsd)}{h.perNight}</span>
            </div>
          </div>

          <Link href={`/${l}#contact`} className="btn btn-ember w-full">{dict.nav.invest}</Link>
          <Link href={`/${l}/houses`} className="btn btn-ghost w-full">{dict.common.all}</Link>
        </aside>
      </div>
    </article>
  )
}
