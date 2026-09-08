import Link from 'next/link'
import { Logo } from './Logo'
import type { Locale } from '@/i18n/config'
import type { Dict } from '@/i18n'

type Settings = {
  phone?: string | null
  email?: string | null
  telegram?: string | null
  instagram?: string | null
  address?: string | null
}

export function Footer({
  locale,
  dict,
  settings,
}: {
  locale: Locale
  dict: Dict
  settings: Settings
}) {
  const base = `/${locale}`
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-ink-2">
      <div className="container-wlt py-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-muted max-w-xs">{dict.footer.tagline}</p>
        </div>

        <div>
          <h4 className="eyebrow mb-4">{dict.footer.nav}</h4>
          <ul className="space-y-2.5 text-sm text-fg-dim">
            <li><Link href={`${base}/houses`} className="hover:text-fg">{dict.nav.houses}</Link></li>
            <li><Link href={`${base}#economics`} className="hover:text-fg">{dict.nav.economics}</Link></li>
            <li><Link href={`${base}#location`} className="hover:text-fg">{dict.nav.location}</Link></li>
            <li><Link href={`${base}/blog`} className="hover:text-fg">{dict.nav.blog}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-4">{dict.footer.contacts}</h4>
          <ul className="space-y-2.5 text-sm text-fg-dim">
            {settings.address && <li className="text-muted">{settings.address}</li>}
            {settings.phone && <li><a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="hover:text-fg">{settings.phone}</a></li>}
            {settings.email && <li><a href={`mailto:${settings.email}`} className="hover:text-fg">{settings.email}</a></li>}
            {settings.telegram && <li><a href={settings.telegram} className="hover:text-fg">Telegram</a></li>}
            {settings.instagram && <li><a href={settings.instagram} className="hover:text-fg">Instagram</a></li>}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-wlt py-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-xs text-muted">
          <p className="max-w-2xl">{dict.footer.disclaimer}</p>
          <p>© {year} White.Lev.Travel · {dict.footer.rights}</p>
        </div>
      </div>
    </footer>
  )
}
