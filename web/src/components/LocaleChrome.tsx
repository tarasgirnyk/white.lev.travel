'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

/** The handoff landing includes its own navigation and footer. */
export function LocaleChrome({ children, header, footer, locale }: {
  children: ReactNode
  header: ReactNode
  footer: ReactNode
  locale: string
}) {
  const pathname = usePathname()
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`
  return <>{!isHome && header}<main>{children}</main>{!isHome && footer}</>
}
