import Link from 'next/link'
import { HouseSvg } from './HouseSvg'
import { mediaUrl, type HouseDoc } from '@/lib/types'
import { usdK, range } from '@/lib/format'
import type { Locale } from '@/i18n/config'
import type { Dict } from '@/i18n'

export function HouseCard({
  house,
  locale,
  dict,
}: {
  house: HouseDoc
  locale: Locale
  dict: Dict
}) {
  const img = mediaUrl(house.heroImage, 'card')
  const h = dict.houses

  return (
    <Link href={`/${locale}/houses/${house.slug}`} className="card card-hover overflow-hidden flex flex-col group">
      <div className="relative aspect-[4/3] bg-ink-2 overflow-hidden">
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={img} alt={house.title} className="w-full h-full object-cover" />
        ) : (
          <HouseSvg segment={house.segment} className="w-full h-full" />
        )}
        <span className="absolute top-3 left-3 text-[11px] tracking-[0.16em] uppercase bg-ink/80 backdrop-blur px-2.5 py-1 rounded-full border border-line">
          {house.segment}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-lg font-semibold">{house.title}</h3>
          <span className="text-sm text-muted whitespace-nowrap">{range(house.areaFrom, house.areaTo, ' м²')}</span>
        </div>
        {house.tagline && <p className="mt-1.5 text-sm text-fg-dim line-clamp-2">{house.tagline}</p>}

        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div className="flex justify-between border-b border-line pb-1.5">
            <dt className="text-muted">{h.asset}</dt>
            <dd className="font-medium">{usdK(house.assetPriceUsd)}</dd>
          </div>
          <div className="flex justify-between border-b border-line pb-1.5">
            <dt className="text-muted">{h.yield}</dt>
            <dd className="font-medium text-ember">{house.yieldPct ? `${house.yieldPct}%` : '—'}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">{h.guests}</dt>
            <dd className="font-medium">{house.guests ?? '—'}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">{h.nightly}</dt>
            <dd className="font-medium">{usdK(house.nightlyMinUsd)}{h.perNight}</dd>
          </div>
        </dl>

        <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-fg group-hover:gap-2.5 transition-all">
          {h.details}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </span>
      </div>
    </Link>
  )
}
