import { notFound } from 'next/navigation'
import { getDict } from '@/i18n'
import { isLocale } from '@/i18n/config'
import { Landing } from '@/components/handoff/Landing'

export const dynamic = 'force-dynamic'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <Landing locale={locale} dict={getDict(locale)} />
}
