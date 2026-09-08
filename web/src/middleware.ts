import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale } from '@/i18n/config'

function detectLocale(req: NextRequest): string {
  const header = req.headers.get('accept-language') || ''
  for (const part of header.split(',')) {
    const code = part.split(';')[0].trim().slice(0, 2).toLowerCase()
    if ((locales as readonly string[]).includes(code)) return code
  }
  return defaultLocale
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  )

  if (hasLocale) {
    const locale = pathname.split('/')[1]
    const res = NextResponse.next()
    res.headers.set('x-locale', locale)
    return res
  }

  // Без префікса локалі → редірект на визначену локаль
  const locale = detectLocale(req)
  const url = req.nextUrl.clone()
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  // Пропускаємо адмінку Payload, API, статику й службові файли
  matcher: ['/((?!api|admin|_next/static|_next/image|favicon.ico|media|.*\\.[\\w]+$).*)'],
}
