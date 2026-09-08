// Дані сіду будинків — гіпотези з planning/11,13,15 + 16_investor_package (курс ≈42 грн/$).
// Локалізація: uk (основна) / en / pl.

type Loc = { uk: string; en: string; pl: string }

export type HouseSeed = {
  slug: string
  segment: 'compact' | 'comfort' | 'vip'
  order: number
  title: Loc
  tagline: Loc
  summary: Loc
  areaFrom: number
  areaTo: number
  terraceArea: number
  bedrooms: number
  bathrooms: number
  guests: number
  buildCostUsd: number
  assetPriceUsd: number
  netIncomeYearUsd: number
  yieldPct: number
  paybackYears: number
  nightlyMinUsd: number
  nightlyMaxUsd: number
  features: { uk: string[]; en: string[]; pl: string[] }
  rooms: { name: Loc; area: string; note?: Loc }[]
}

export const houses: HouseSeed[] = [
  {
    slug: 'compact',
    segment: 'compact',
    order: 1,
    title: { uk: 'Compact', en: 'Compact', pl: 'Compact' },
    tagline: {
      uk: 'Вхід у категорію — найдешевший старт, найшвидший поворот в оренді',
      en: 'Entry into the category — the lowest entry point, the fastest rental turnaround',
      pl: 'Wejście w kategorię — najniższy próg, najszybszy zwrot z najmu',
    },
    summary: {
      uk: 'Ядро першої черги й шоу-об’єкт масиву. Для пари або пари з 1–2 дітьми, цілорічно. Краєвид, приватність, тиша, сучасний дизайн і чан на терасі.',
      en: 'The core of phase one and the show unit of the estate. For a couple or a couple with 1–2 kids, year-round. Views, privacy, silence, modern design and a hot tub on the terrace.',
      pl: 'Rdzeń pierwszego etapu i obiekt pokazowy. Dla pary lub pary z 1–2 dzieci, całorocznie. Widok, prywatność, cisza, nowoczesny design i balia na tarasie.',
    },
    areaFrom: 35,
    areaTo: 45,
    terraceArea: 14,
    bedrooms: 1,
    bathrooms: 1,
    guests: 4,
    buildCostUsd: 46000,
    assetPriceUsd: 84000,
    netIncomeYearUsd: 6900,
    yieldPct: 8.2,
    paybackYears: 12,
    nightlyMinUsd: 72,
    nightlyMaxUsd: 83,
    features: {
      uk: ['1 спальня + кухня-вітальня', 'Місце сну для 2 дітей (диван-трансформер)', 'Панорама на Пд-Зх', 'Тераса із зовнішнім чаном', 'Камін', 'Тепловий насос + рекуперація'],
      en: ['1 bedroom + kitchen-living room', 'Sleeping space for 2 kids (sofa bed)', 'SW panoramic glazing', 'Terrace with an outdoor hot tub', 'Fireplace', 'Heat pump + heat recovery'],
      pl: ['1 sypialnia + salon z kuchnią', 'Miejsce do spania dla 2 dzieci (rozkładana sofa)', 'Panorama na płd-zach.', 'Taras z zewnętrzną balią', 'Kominek', 'Pompa ciepła + rekuperacja'],
    },
    rooms: [
      { name: { uk: 'Тамбур / вхід', en: 'Entry hall', pl: 'Przedsionek' }, area: '≈ 3 м²' },
      { name: { uk: 'Санвузол із душем', en: 'Bathroom with shower', pl: 'Łazienka z prysznicem' }, area: '≈ 4.5 м²' },
      { name: { uk: 'Спальня', en: 'Bedroom', pl: 'Sypialnia' }, area: '≈ 12 м²', note: { uk: 'панорама, вид на терасу', en: 'panorama, terrace view', pl: 'panorama, widok na taras' } },
      { name: { uk: 'Кухня-вітальня', en: 'Kitchen-living room', pl: 'Salon z kuchnią' }, area: '16–18 м²', note: { uk: 'камін, вихід на терасу', en: 'fireplace, terrace access', pl: 'kominek, wyjście na taras' } },
      { name: { uk: 'Тераса (Пд-Зх)', en: 'Terrace (SW)', pl: 'Taras (płd-zach.)' }, area: '≈ 14 м²', note: { uk: 'чан, барбекю, лежаки', en: 'hot tub, BBQ, loungers', pl: 'balia, grill, leżaki' } },
    ],
  },
  {
    slug: 'comfort',
    segment: 'comfort',
    order: 2,
    title: { uk: 'Comfort', en: 'Comfort', pl: 'Comfort' },
    tagline: {
      uk: 'Середній рівень — більше простору, живе тепло каміна і повний wellness',
      en: 'The mid tier — more space, the living warmth of a fireplace and full wellness',
      pl: 'Poziom średni — więcej przestrzeni, żywe ciepło kominka i pełny wellness',
    },
    summary: {
      uk: 'Комфортніше за Compact при тому самому впізнаваному стилі: камін, ванна/джакузі з видом, окрема їдальня з островом, більша тераса й опційна міні-сауна.',
      en: 'More comfortable than Compact in the same recognizable style: a fireplace, a bath/jacuzzi with a view, a separate dining area with an island, a larger terrace and an optional mini-sauna.',
      pl: 'Wygodniej niż Compact, w tym samym stylu: kominek, wanna/jacuzzi z widokiem, osobna jadalnia z wyspą, większy taras i opcjonalna mini-sauna.',
    },
    areaFrom: 50,
    areaTo: 60,
    terraceArea: 20,
    bedrooms: 1,
    bathrooms: 1,
    guests: 4,
    buildCostUsd: 73000,
    assetPriceUsd: 119000,
    netIncomeYearUsd: 9000,
    yieldPct: 7.6,
    paybackYears: 13,
    nightlyMinUsd: 95,
    nightlyMaxUsd: 107,
    features: {
      uk: ['Спальня + кухня-вітальня-їдальня', 'Камін як центр вітальні', 'Ванна/джакузі біля вікна з видом', 'Кухонний острів, стіл на 6', 'Більша тераса Пд-Зх + чан', 'Міні-сауна (опція)'],
      en: ['Bedroom + kitchen-living-dining room', 'Fireplace as the heart of the living room', 'Bath/jacuzzi by a window with a view', 'Kitchen island, table for 6', 'Larger SW terrace + hot tub', 'Mini-sauna (optional)'],
      pl: ['Sypialnia + salon z kuchnią i jadalnią', 'Kominek jako serce salonu', 'Wanna/jacuzzi przy oknie z widokiem', 'Wyspa kuchenna, stół na 6 osób', 'Większy taras płd-zach. + balia', 'Mini-sauna (opcja)'],
    },
    rooms: [
      { name: { uk: 'Тамбур / вхід', en: 'Entry hall', pl: 'Przedsionek' }, area: '≈ 4 м²' },
      { name: { uk: 'Санвузол', en: 'Bathroom', pl: 'Łazienka' }, area: '≈ 6 м²', note: { uk: 'ванна/джакузі біля вікна', en: 'bath/jacuzzi by the window', pl: 'wanna/jacuzzi przy oknie' } },
      { name: { uk: 'Спальня', en: 'Bedroom', pl: 'Sypialnia' }, area: '14–16 м²', note: { uk: 'панорама на Пд-Зх', en: 'SW panorama', pl: 'panorama płd-zach.' } },
      { name: { uk: 'Кухня-вітальня-їдальня', en: 'Kitchen-living-dining', pl: 'Salon-kuchnia-jadalnia' }, area: '22–25 м²', note: { uk: 'острів, камін, стіл на 6', en: 'island, fireplace, table for 6', pl: 'wyspa, kominek, stół na 6' } },
      { name: { uk: 'Тераса (Пд-Зх)', en: 'Terrace (SW)', pl: 'Taras (płd-zach.)' }, area: '18–22 м²', note: { uk: 'чан, барбекю, міні-сауна (опція)', en: 'hot tub, BBQ, mini-sauna (opt.)', pl: 'balia, grill, mini-sauna (opc.)' } },
    ],
  },
  {
    slug: 'vip',
    segment: 'vip',
    order: 3,
    title: { uk: 'VIP-вілла', en: 'VIP villa', pl: 'Willa VIP' },
    tagline: {
      uk: 'Флагман лінійки на топ-видовій точці — простір, приватність і повний SPA',
      en: 'The flagship on the top view point — space, privacy and a full SPA',
      pl: 'Flagowiec na najlepszym punkcie widokowym — przestrzeń, prywatność i pełne SPA',
    },
    summary: {
      uk: 'Об’єкт, що «продає» весь масив: дві спальні, два санвузли, велика вітальня-їдальня, SPA (сауна + чан) і найбільша тераса на найізольованішій видовій точці. Під події й преміальний сегмент.',
      en: 'The unit that "sells" the whole estate: two bedrooms, two bathrooms, a large living-dining room, a SPA (sauna + hot tub) and the largest terrace on the most secluded view point. For events and the premium segment.',
      pl: 'Obiekt, który „sprzedaje” całe osiedle: dwie sypialnie, dwie łazienki, duży salon z jadalnią, SPA (sauna + balia) i największy taras na najbardziej ustronnym punkcie widokowym. Na wydarzenia i segment premium.',
    },
    areaFrom: 85,
    areaTo: 100,
    terraceArea: 35,
    bedrooms: 2,
    bathrooms: 2,
    guests: 6,
    buildCostUsd: 157000,
    assetPriceUsd: 228000,
    netIncomeYearUsd: 15100,
    yieldPct: 6.6,
    paybackYears: 15,
    nightlyMinUsd: 155,
    nightlyMaxUsd: 190,
    features: {
      uk: ['2 спальні (майстер із панорамою)', '2 санвузли, майстер-ensuite', 'SPA: сауна в будинку + приватний чан', 'Велика вітальня-їдальня, стіл на 8', 'Найбільша тераса на топ-видовій точці', 'Повна приватність за рахунок дистанції'],
      en: ['2 bedrooms (master with panorama)', '2 bathrooms, master ensuite', 'SPA: indoor sauna + private hot tub', 'Large living-dining room, table for 8', 'Largest terrace on the top view point', 'Full privacy through distance'],
      pl: ['2 sypialnie (główna z panoramą)', '2 łazienki, główna ensuite', 'SPA: sauna w domu + prywatna balia', 'Duży salon z jadalnią, stół na 8', 'Największy taras na punkcie widokowym', 'Pełna prywatność dzięki dystansowi'],
    },
    rooms: [
      { name: { uk: 'Хол / вхід', en: 'Hall / entry', pl: 'Hol / wejście' }, area: '≈ 6 м²' },
      { name: { uk: 'Майстер-спальня', en: 'Master bedroom', pl: 'Sypialnia główna' }, area: '18–20 м²', note: { uk: 'king, ensuite, вид на терасу', en: 'king, ensuite, terrace view', pl: 'king, ensuite, widok na taras' } },
      { name: { uk: 'Друга спальня', en: 'Second bedroom', pl: 'Druga sypialnia' }, area: '12–14 м²' },
      { name: { uk: 'Кухня-вітальня-їдальня', en: 'Kitchen-living-dining', pl: 'Salon-kuchnia-jadalnia' }, area: '30–35 м²', note: { uk: 'острів, камін, стіл на 8', en: 'island, fireplace, table for 8', pl: 'wyspa, kominek, stół na 8' } },
      { name: { uk: 'SPA: сауна', en: 'SPA: sauna', pl: 'SPA: sauna' }, area: '≈ 4 м²', note: { uk: 'вихід на терасу до чана', en: 'exit to terrace and hot tub', pl: 'wyjście na taras do balii' } },
      { name: { uk: 'Тераса (Пд-Зх)', en: 'Terrace (SW)', pl: 'Taras (płd-zach.)' }, area: '30–40 м²', note: { uk: 'чан, барбекю, обідня зона', en: 'hot tub, BBQ, dining area', pl: 'balia, grill, strefa jadalna' } },
    ],
  },
]
