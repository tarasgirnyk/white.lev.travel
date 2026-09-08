export const locales = ['uk', 'en', 'pl'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'uk'

export const localeNames: Record<Locale, string> = {
  uk: 'UA',
  en: 'EN',
  pl: 'PL',
}

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value)
}
