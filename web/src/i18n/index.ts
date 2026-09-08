import type { Locale } from './config'
import type { Dict } from './dictionaries/uk'
import uk from './dictionaries/uk'
import en from './dictionaries/en'
import pl from './dictionaries/pl'

const dictionaries: Record<Locale, Dict> = { uk, en, pl }

export function getDict(locale: Locale): Dict {
  return dictionaries[locale] ?? uk
}

export type { Dict }
