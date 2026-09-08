import Link from 'next/link'
import { HouseSvg } from './HouseSvg'
import type { Locale } from '@/i18n/config'
import type { Dict } from '@/i18n'

export function GreenLoveSeries({ locale, dict }: { locale: Locale; dict: Dict }) {
  const s = dict.series
  return (
    <section id="series" className="section border-t border-line">
      <div className="container-wlt">
        <p className="eyebrow">{s.eyebrow}</p>
        <h2 className="display text-3xl sm:text-5xl mt-3 max-w-xl">{s.title}</h2>
        <p className="mt-3 max-w-2xl text-fg-dim leading-relaxed">{s.subtitle}</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {s.houses.map((h) => (
            <article
              key={h.no}
              className="card card-hover flex flex-col overflow-hidden"
            >
              <div className="relative grid grid-cols-2 gap-0.5">
                <div className="relative aspect-square overflow-hidden bg-surface-2">
                  <HouseSvg segment="compact" className="w-full h-full object-cover" />
                </div>
                <div className="relative aspect-square overflow-hidden bg-surface-3 flex items-center justify-center p-3">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-muted text-center">
                    {s.interior}
                    <br />
                    {s.photoSoon}
                  </span>
                </div>
                <span className="badge absolute top-3 left-3 z-10 pointer-events-none">
                  Compact №{h.no}
                </span>
              </div>

              <div className="p-5 flex flex-col gap-2 flex-1">
                <h3 className="display text-xl">{h.name}</h3>
                <p className="text-sm text-fg-dim leading-relaxed">{h.tagline}</p>
                <div className="mt-auto pt-3 flex items-center justify-between flex-wrap gap-2">
                  <span className="display text-xl">
                    {h.price}
                    <span className="text-sm text-muted font-normal">{s.perNight}</span>
                  </span>
                  <Link href={`/${locale}#contact`} className="btn btn-ember text-sm px-4 py-2.5">
                    {s.book}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
