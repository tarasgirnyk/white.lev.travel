'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Logo } from './Logo'
import { LangSwitcher } from './LangSwitcher'
import type { Locale } from '@/i18n/config'
import type { Dict } from '@/i18n'

export function Header({ locale, dict }: { locale: Locale; dict: Dict }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const base = `/${locale}`

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: `${base}#series`, label: dict.nav.series },
    { href: `${base}#journey`, label: dict.nav.location },
    { href: `${base}#faq`, label: dict.nav.contact },
    { href: `${base}/houses`, label: dict.nav.houses },
    { href: `${base}/blog`, label: dict.nav.blog },
  ]

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-ink/85 backdrop-blur border-b border-line' : 'bg-transparent'
      }`}
    >
      <div className="container-wlt flex items-center justify-between h-[68px]">
        <Link href={base} aria-label="White.Lev.Travel" onClick={() => setOpen(false)}>
          <Logo compact />
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-sm text-fg-dim">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="link-underline hover:text-fg transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LangSwitcher locale={locale} />
          <Link href={`${base}#contact`} className="hidden sm:inline-flex btn btn-ember text-sm px-4 py-2.5">
            {dict.nav.book}
          </Link>
          <button
            className="lg:hidden p-2 -mr-2 text-fg"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-line bg-ink/95 backdrop-blur">
          <nav className="container-wlt py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-fg-dim hover:text-fg border-b border-line last:border-0"
              >
                {l.label}
              </Link>
            ))}
            <Link href={`${base}#contact`} onClick={() => setOpen(false)} className="btn btn-ember mt-3">
              {dict.nav.book}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
