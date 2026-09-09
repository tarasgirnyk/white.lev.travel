import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import type { Dict } from '@/i18n'

const themeSlugs = ['adam-eve', 'picasso', 'max-royal', 'romeo-juliet']

export function GreenLoveSeries({ locale, dict }: { locale: Locale; dict: Dict }) {
  const s = dict.series
  return (
    <section id="series" className="section border-t border-line">
      <div className="container-wlt">
        <p className="eyebrow">{s.eyebrow}</p>
        <h2 className="display text-3xl sm:text-5xl mt-3 max-w-xl">{s.title}</h2>
        <p className="mt-3 max-w-2xl text-fg-dim leading-relaxed">{s.subtitle}</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {s.houses.map((h, index) => (
            <article key={h.no} className="card card-hover flex flex-col overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={`/photography/${h.img}.png`}
                  alt={`${h.name} — ${s.interior}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <span className="badge absolute top-3 left-3 z-10">Comfort №{h.no}</span>
              </div>

              <div className="p-5 flex flex-col gap-2 flex-1">
                <h3 className="display text-xl">{h.name}</h3>
                <p className="text-sm text-fg-dim leading-relaxed">{h.tagline}</p>
                <div className="mt-auto pt-3 flex items-center justify-between flex-wrap gap-2">
                  <span className="display text-xl">
                    {h.price}
                    <span className="text-sm text-muted font-normal">{s.perNight}</span>
                  </span>
                  <Link href={`/${locale}/houses/${themeSlugs[index]}`} className="btn btn-ember text-sm px-4 py-2.5">
                    {dict.houses.details}
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
