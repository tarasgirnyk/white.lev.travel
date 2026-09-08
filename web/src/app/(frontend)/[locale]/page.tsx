import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDict } from '@/i18n'
import { isLocale, type Locale } from '@/i18n/config'
import { getHouses } from '@/lib/payload'
import type { HouseDoc } from '@/lib/types'
import { usd, usdK } from '@/lib/format'
import { HouseCard } from '@/components/HouseCard'
import { HouseSvg } from '@/components/HouseSvg'
import { Masterplan } from '@/components/Masterplan'
import { InquiryForm } from '@/components/InquiryForm'

export const dynamic = 'force-dynamic'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
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

  const scenarios = [
    { key: 'cautious', label: dict.economics.scenarioCautious, over5: '≈ 57%', year: '≈ 11%' },
    { key: 'base', label: dict.economics.scenarioBase, over5: '73–81%', year: '≈ 15%', highlight: true },
    { key: 'breakthrough', label: dict.economics.scenarioBreakthrough, over5: '100–117%', year: '20–23%' },
  ]

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <HouseSvg segment="vip" className="w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/60 to-ink" />
        </div>
        <div className="container-wlt pt-20 pb-24 sm:pt-28 sm:pb-32 max-w-3xl">
          <p className="eyebrow">{dict.hero.kicker}</p>
          <h1 className="display text-4xl sm:text-6xl mt-5">{dict.hero.title}</h1>
          <p className="mt-6 text-lg text-fg-dim max-w-2xl">{dict.hero.subtitle}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={`/${l}#contact`} className="btn btn-ember">{dict.hero.ctaInvest}</Link>
            <Link href={`/${l}/houses`} className="btn btn-ghost">{dict.hero.ctaBook}</Link>
          </div>
        </div>
      </section>

      {/* ДВА ШЛЯХИ */}
      <section className="section border-t border-line">
        <div className="container-wlt grid md:grid-cols-2 gap-5">
          <div className="card p-8 flex flex-col">
            <p className="eyebrow">{dict.audience.investTitle}</p>
            <p className="mt-4 text-fg-dim flex-1">{dict.audience.investText}</p>
            <Link href={`/${l}#contact`} className="btn btn-primary mt-6 self-start">{dict.audience.investCta}</Link>
          </div>
          <div className="card p-8 flex flex-col">
            <p className="eyebrow">{dict.audience.stayTitle}</p>
            <p className="mt-4 text-fg-dim flex-1">{dict.audience.stayText}</p>
            <Link href={`/${l}/houses`} className="btn btn-ghost mt-6 self-start">{dict.audience.stayCta}</Link>
          </div>
        </div>
      </section>

      {/* БУДИНКИ */}
      <section id="houses" className="section border-t border-line">
        <div className="container-wlt">
          <div className="max-w-2xl">
            <h2 className="display text-3xl sm:text-4xl">{dict.houses.title}</h2>
            <p className="mt-4 text-fg-dim">{dict.houses.subtitle}</p>
          </div>
          {houses.length > 0 ? (
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {houses.map((h) => (
                <HouseCard key={h.id} house={h} locale={l} dict={dict} />
              ))}
            </div>
          ) : (
            <p className="mt-10 text-muted">—</p>
          )}
        </div>
      </section>

      {/* ЕКОНОМІКА */}
      <section id="economics" className="section border-t border-line bg-ink-2">
        <div className="container-wlt">
          <div className="max-w-2xl">
            <h2 className="display text-3xl sm:text-4xl">{dict.economics.title}</h2>
            <p className="mt-4 text-fg-dim">{dict.economics.subtitle}</p>
          </div>

          <div className="mt-10 grid lg:grid-cols-2 gap-5">
            <div className="card p-7">
              <p className="eyebrow mb-2">{dict.economics.point1Title}</p>
              <p className="text-fg-dim">{dict.economics.point1Text}</p>
            </div>
            <div className="card p-7 border-l-2 border-l-ember">
              <p className="eyebrow mb-2 text-ember">{dict.economics.point2Title}</p>
              <p className="text-fg-dim">{dict.economics.point2Text}</p>
            </div>
          </div>

          {/* Таблиця дохідності */}
          {houses.length > 0 && (
            <div className="mt-6 card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[560px]">
                  <thead>
                    <tr className="text-left text-muted border-b border-line">
                      <th className="py-4 px-5 font-medium">{dict.economics.tableType}</th>
                      <th className="py-4 px-5 font-medium">{dict.economics.tableAsset}</th>
                      <th className="py-4 px-5 font-medium">{dict.economics.tableIncome}</th>
                      <th className="py-4 px-5 font-medium">{dict.economics.tableYield}</th>
                      <th className="py-4 px-5 font-medium">{dict.economics.tablePayback}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {houses.map((h) => (
                      <tr key={h.id} className="border-b border-line last:border-0">
                        <td className="py-4 px-5 font-medium">{h.title}</td>
                        <td className="py-4 px-5">{usd(h.assetPriceUsd)}</td>
                        <td className="py-4 px-5">{usd(h.netIncomeYearUsd)}</td>
                        <td className="py-4 px-5 text-ember font-medium">{h.yieldPct ? `${h.yieldPct}%` : '—'}</td>
                        <td className="py-4 px-5 text-muted">~{h.paybackYears} {dict.economics.years}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Сценарії приросту */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold">{dict.economics.scenariosTitle}</h3>
            <div className="mt-5 grid sm:grid-cols-3 gap-5">
              {scenarios.map((s) => (
                <div key={s.key} className={`card p-6 ${s.highlight ? 'border-ember' : ''}`}>
                  <p className="eyebrow">{s.label}</p>
                  <p className={`mt-4 text-3xl font-semibold ${s.highlight ? 'text-ember' : ''}`}>{s.over5}</p>
                  <p className="text-xs text-muted mt-1">{dict.economics.over5y}</p>
                  <p className="mt-3 text-sm text-fg-dim">{s.year} {dict.economics.perYear}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-8 text-sm text-muted max-w-3xl border-l-2 border-l-line pl-4">{dict.economics.disclaimer}</p>
        </div>
      </section>

      {/* ЛОКАЦІЯ */}
      <section id="location" className="section border-t border-line">
        <div className="container-wlt">
          <div className="max-w-2xl">
            <h2 className="display text-3xl sm:text-4xl">{dict.location.title}</h2>
            <p className="mt-4 text-fg-dim">{dict.location.subtitle}</p>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {[
              { t: dict.location.p1Title, d: dict.location.p1Text },
              { t: dict.location.p2Title, d: dict.location.p2Text },
              { t: dict.location.p3Title, d: dict.location.p3Text },
            ].map((p, i) => (
              <div key={i} className="card p-7">
                <span className="text-ember text-sm font-semibold">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 text-lg font-semibold">{p.t}</h3>
                <p className="mt-2 text-sm text-fg-dim">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ГЕНПЛАН */}
      <section id="masterplan" className="section border-t border-line bg-ink-2">
        <div className="container-wlt">
          <div className="max-w-2xl">
            <h2 className="display text-3xl sm:text-4xl">{dict.masterplan.title}</h2>
            <p className="mt-4 text-fg-dim">{dict.masterplan.subtitle}</p>
          </div>
          <div className="mt-10">
            <Masterplan locale={l} dict={dict} />
          </div>
        </div>
      </section>

      {/* КОНТАКТ / ФОРМА */}
      <section id="contact" className="section border-t border-line">
        <div className="container-wlt grid lg:grid-cols-2 gap-10 items-start">
          <div className="max-w-md">
            <h2 className="display text-3xl sm:text-4xl">{dict.form.title}</h2>
            <p className="mt-4 text-fg-dim">{dict.form.subtitle}</p>
          </div>
          <InquiryForm locale={l} dict={dict} />
        </div>
      </section>
    </>
  )
}
