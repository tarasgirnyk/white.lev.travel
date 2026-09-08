import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDict } from '@/i18n'
import { isLocale, type Locale } from '@/i18n/config'
import { GreenLoveSeries } from '@/components/GreenLoveSeries'
import { FaqList } from '@/components/FaqList'
import { InquiryForm } from '@/components/InquiryForm'

export const dynamic = 'force-dynamic'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const l = locale as Locale
  const dict = getDict(l)

  const values = [
    { t: dict.values.natureTitle, d: dict.values.natureText },
    { t: dict.values.privacyTitle, d: dict.values.privacyText },
    { t: dict.values.comfortTitle, d: dict.values.comfortText },
  ]

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden min-h-[88vh] flex items-end">
        <div className="absolute inset-0 -z-10">
          <img
            src="/photography/vip-exterior.png"
            alt="Будинок White.Lev.Travel у горах на заході сонця"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-ink/25 to-ink" />
        </div>
        <div className="container-wlt pt-28 pb-16 sm:pb-24 max-w-3xl">
          <p className="eyebrow">{dict.hero.kicker}</p>
          <h1 className="display text-4xl sm:text-6xl xl:text-7xl mt-5">{dict.hero.title}</h1>
          <p className="mt-6 text-lg text-fg-dim max-w-xl leading-relaxed">{dict.hero.subtitle}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={`/${l}#series`} className="btn btn-ember">{dict.hero.ctaInvest}</Link>
            <Link href={`/${l}#journey`} className="btn btn-ghost">{dict.hero.ctaBook}</Link>
          </div>
        </div>
      </section>

      {/* ЦІННОСТІ */}
      <section className="section border-t border-line">
        <div className="container-wlt grid gap-8 md:grid-cols-3">
          {values.map((v, i) => (
            <div key={i} className="border-t border-line pt-5">
              <h3 className="display text-xl sm:text-2xl">{v.t}</h3>
              <p className="mt-2 text-sm text-fg-dim leading-relaxed">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GREEN LOVE TRAVEL — 4 ТЕМАТИЧНІ COMPACT */}
      <GreenLoveSeries locale={l} dict={dict} />

      {/* ДОСВІД ГОСТЯ */}
      <section id="journey" className="section border-t border-line bg-ink-2">
        <div className="container-wlt">
          <p className="eyebrow">{dict.journey.eyebrow}</p>
          <h2 className="display text-3xl sm:text-5xl mt-3 max-w-xl">{dict.journey.title}</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {dict.journey.steps.map((s, i) => (
              <div key={i} className="flex flex-col gap-2">
                <span className="display text-3xl text-ember">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-sm text-fg-dim leading-relaxed">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ПИТАННЯ */}
      <section id="faq" className="section border-t border-line">
        <div className="container-wlt max-w-3xl">
          <p className="eyebrow">{dict.faq.eyebrow}</p>
          <h2 className="display text-3xl sm:text-5xl mt-3">{dict.faq.title}</h2>
          <div className="mt-8">
            <FaqList items={dict.faq.items} />
          </div>
        </div>
      </section>

      {/* КОНТАКТ / БРОНЮВАННЯ */}
      <section id="contact" className="section border-t border-line bg-ink-2">
        <div className="container-wlt grid lg:grid-cols-2 gap-10 items-start">
          <div className="max-w-md">
            <h2 className="display text-3xl sm:text-4xl">{dict.form.title}</h2>
            <p className="mt-4 text-fg-dim leading-relaxed">{dict.form.subtitle}</p>
          </div>
          <InquiryForm locale={l} dict={dict} />
        </div>
      </section>
    </>
  )
}
