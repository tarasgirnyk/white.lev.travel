'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { locales, localeNames, type Locale } from '@/i18n/config'

export function LangSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}`
  const rest = pathname.replace(/^\/(uk|en|pl)/, '') || ''

  return (
    <div className="flex items-center gap-1 text-xs">
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest}`}
          className={`px-1.5 py-1 rounded transition-colors ${
            l === locale ? 'text-fg font-semibold' : 'text-muted hover:text-fg'
          }`}
          aria-current={l === locale ? 'true' : undefined}
        >
          {localeNames[l]}
        </Link>
      ))}
    </div>
  )
}
