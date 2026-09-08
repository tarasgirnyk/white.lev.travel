import React from 'react'
import { headers } from 'next/headers'
import { defaultLocale } from '@/i18n/config'
import './globals.css'

export const metadata = {
  title: 'White.Lev.Travel · «Білий Лев»',
  description:
    'Заміський комплекс приватних будинків у Прикарпатті. Видові будинки як дохідний актив і як відпочинок.',
}

export default async function FrontendRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const h = await headers()
  const locale = h.get('x-locale') || defaultLocale
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  )
}
