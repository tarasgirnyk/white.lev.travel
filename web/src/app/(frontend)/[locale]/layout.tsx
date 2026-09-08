import React from 'react'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { getDict } from '@/i18n'
import { isLocale, type Locale } from '@/i18n/config'
import { getSettings } from '@/lib/payload'
import type { Setting } from '@/payload-types'

export const dynamic = 'force-dynamic'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const dict = getDict(locale as Locale)
  let settings: Partial<Setting> = {}
  try {
    settings = await getSettings(locale as Locale)
  } catch {
    settings = {}
  }

  return (
    <>
      <Header locale={locale as Locale} dict={dict} />
      <main>{children}</main>
      <Footer locale={locale as Locale} dict={dict} settings={settings} />
    </>
  )
}
