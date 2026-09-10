// Актуальна серія від 08.09.2026: чотири Comfort, кожен для 2 дорослих 18+.
// Площі та грошові показники ще не затверджені.

type Loc = { uk: string; en: string; pl: string }

export type HouseSeed = {
  slug: string
  segment: 'compact' | 'comfort' | 'vip'
  order: number | null
  title: Loc
  tagline: Loc
  summary: Loc
  areaFrom: number | null
  areaTo: number | null
  terraceArea: number | null
  bedrooms: number | null
  bathrooms: number | null
  guests: number | null
  buildCostUsd: number | null
  assetPriceUsd: number | null
  netIncomeYearUsd: number | null
  yieldPct: number | null
  paybackYears: number | null
  nightlyMinUsd: number | null
  nightlyMaxUsd: number | null
  features: { uk: string[]; en: string[]; pl: string[] }
  rooms: { name: Loc; area: string; note?: Loc }[]
}

export const houses: HouseSeed[] = [
  {
    "slug": "adam-eve",
    "segment": "comfort",
    "order": 1,
    "title": {
      "uk": "Адам і Єва",
      "en": "Adam & Eve",
      "pl": "Adam i Ewa"
    },
    "tagline": {
      "uk": "Біла основа · червоне узголів’я · дзеркальні акценти",
      "en": "White base · red headboard · mirrored accents",
      "pl": "Biała baza · czerwony zagłówek · lustrzane akcenty"
    },
    "summary": {
      "uk": "Тільки 2 дорослих, 18+. Без дітей і додаткових місць. Необхідне оснащення, доступне виконання й виразний тематичний дизайн.",
      "en": "Two adults only, 18+. No children or extra beds. Essential amenities, affordable construction and distinctive themed design.",
      "pl": "Tylko dwoje dorosłych, 18+. Bez dzieci i dodatkowych miejsc. Niezbędne wyposażenie, przystępny koszt budowy i wyrazisty wystrój tematyczny."
    },
    "areaFrom": null,
    "areaTo": null,
    "terraceArea": null,
    "bedrooms": 0,
    "bathrooms": 1,
    "guests": 2,
    "buildCostUsd": null,
    "assetPriceUsd": null,
    "netIncomeYearUsd": null,
    "yieldPct": null,
    "paybackYears": null,
    "nightlyMinUsd": null,
    "nightlyMaxUsd": null,
    "features": {
      "uk": [
        "Тільки 2 дорослих, 18+. Без дітей і додаткових місць.",
        "Одне двоспальне ліжко",
        "Два крісла й столик для двох",
        "Компактна кухня",
        "Окремий душ і WC",
        "Купіль і два лежаки на терасі",
        "Тепло, вентиляція, гаряча вода, Wi-Fi"
      ],
      "en": [
        "Two adults only, 18+. No children or extra beds.",
        "One double bed",
        "Two chairs and a table for two",
        "Compact kitchenette",
        "Separate shower and WC",
        "Outdoor hot tub and two loungers",
        "Heating, ventilation, hot water and Wi-Fi"
      ],
      "pl": [
        "Tylko dwoje dorosłych, 18+. Bez dzieci i dodatkowych miejsc.",
        "Jedno podwójne łóżko",
        "Dwa fotele i stolik dla dwojga",
        "Mały aneks kuchenny",
        "Osobny prysznic i WC",
        "Balia i dwa leżaki na tarasie",
        "Ogrzewanie, wentylacja, ciepła woda i Wi-Fi"
      ]
    },
    "rooms": [
      {
        "name": {
          "uk": "Житлова студія",
          "en": "Living studio",
          "pl": "Studio mieszkalne"
        },
        "area": "",
        "note": {
          "uk": "Одне двоспальне ліжко",
          "en": "One double bed",
          "pl": "Jedno podwójne łóżko"
        }
      },
      {
        "name": {
          "uk": "Компактна кухня",
          "en": "Compact kitchenette",
          "pl": "Mały aneks kuchenny"
        },
        "area": "",
        "note": {
          "uk": "Уточнюється",
          "en": "To be confirmed",
          "pl": "Do ustalenia"
        }
      },
      {
        "name": {
          "uk": "Окремий душ і WC",
          "en": "Separate shower and WC",
          "pl": "Osobny prysznic i WC"
        },
        "area": "",
        "note": {
          "uk": "Уточнюється",
          "en": "To be confirmed",
          "pl": "Do ustalenia"
        }
      },
      {
        "name": {
          "uk": "Приватна тераса",
          "en": "Private terrace",
          "pl": "Prywatny taras"
        },
        "area": "",
        "note": {
          "uk": "Купіль і два лежаки на терасі",
          "en": "Outdoor hot tub and two loungers",
          "pl": "Balia i dwa leżaki na tarasie"
        }
      }
    ]
  },
  {
    "slug": "picasso",
    "segment": "comfort",
    "order": 2,
    "title": {
      "uk": "Пікассо",
      "en": "Picasso",
      "pl": "Picasso"
    },
    "tagline": {
      "uk": "Мистецтво · музика · львівські спогади",
      "en": "Art · music · Lviv memories",
      "pl": "Sztuka · muzyka · lwowskie wspomnienia"
    },
    "summary": {
      "uk": "Тільки 2 дорослих, 18+. Без дітей і додаткових місць. Необхідне оснащення, доступне виконання й виразний тематичний дизайн.",
      "en": "Two adults only, 18+. No children or extra beds. Essential amenities, affordable construction and distinctive themed design.",
      "pl": "Tylko dwoje dorosłych, 18+. Bez dzieci i dodatkowych miejsc. Niezbędne wyposażenie, przystępny koszt budowy i wyrazisty wystrój tematyczny."
    },
    "areaFrom": null,
    "areaTo": null,
    "terraceArea": null,
    "bedrooms": 0,
    "bathrooms": 1,
    "guests": 2,
    "buildCostUsd": null,
    "assetPriceUsd": null,
    "netIncomeYearUsd": null,
    "yieldPct": null,
    "paybackYears": null,
    "nightlyMinUsd": null,
    "nightlyMaxUsd": null,
    "features": {
      "uk": [
        "Тільки 2 дорослих, 18+. Без дітей і додаткових місць.",
        "Одне двоспальне ліжко",
        "Два крісла й столик для двох",
        "Компактна кухня",
        "Окремий душ і WC",
        "Купіль і два лежаки на терасі",
        "Тепло, вентиляція, гаряча вода, Wi-Fi"
      ],
      "en": [
        "Two adults only, 18+. No children or extra beds.",
        "One double bed",
        "Two chairs and a table for two",
        "Compact kitchenette",
        "Separate shower and WC",
        "Outdoor hot tub and two loungers",
        "Heating, ventilation, hot water and Wi-Fi"
      ],
      "pl": [
        "Tylko dwoje dorosłych, 18+. Bez dzieci i dodatkowych miejsc.",
        "Jedno podwójne łóżko",
        "Dwa fotele i stolik dla dwojga",
        "Mały aneks kuchenny",
        "Osobny prysznic i WC",
        "Balia i dwa leżaki na tarasie",
        "Ogrzewanie, wentylacja, ciepła woda i Wi-Fi"
      ]
    },
    "rooms": [
      {
        "name": {
          "uk": "Житлова студія",
          "en": "Living studio",
          "pl": "Studio mieszkalne"
        },
        "area": "",
        "note": {
          "uk": "Одне двоспальне ліжко",
          "en": "One double bed",
          "pl": "Jedno podwójne łóżko"
        }
      },
      {
        "name": {
          "uk": "Компактна кухня",
          "en": "Compact kitchenette",
          "pl": "Mały aneks kuchenny"
        },
        "area": "",
        "note": {
          "uk": "Уточнюється",
          "en": "To be confirmed",
          "pl": "Do ustalenia"
        }
      },
      {
        "name": {
          "uk": "Окремий душ і WC",
          "en": "Separate shower and WC",
          "pl": "Osobny prysznic i WC"
        },
        "area": "",
        "note": {
          "uk": "Уточнюється",
          "en": "To be confirmed",
          "pl": "Do ustalenia"
        }
      },
      {
        "name": {
          "uk": "Приватна тераса",
          "en": "Private terrace",
          "pl": "Prywatny taras"
        },
        "area": "",
        "note": {
          "uk": "Купіль і два лежаки на терасі",
          "en": "Outdoor hot tub and two loungers",
          "pl": "Balia i dwa leżaki na tarasie"
        }
      }
    ]
  },
  {
    "slug": "yavir-boykivskyi",
    "segment": "comfort",
    "order": 3,
    "title": {
      "uk": "Явір бойківський",
      "en": "Boyko Sycamore",
      "pl": "Jawor bojkowski"
    },
    "tagline": {
      "uk": "Вапняна штукатурка · копчений дуб · сучасна бойківська геометрія",
      "en": "Lime plaster · smoked oak · contemporary Boyko geometry",
      "pl": "Tynk wapienny · przydymiony dąb · współczesna geometria bojkowska"
    },
    "summary": {
      "uk": "Дворівневий сімейний будинок: спальня батьків нагорі, студія з диваном для дітей унизу, компактна кухня, душ/WC і приватна тераса.",
      "en": "A two-level family cabin: parents’ bedroom upstairs, a studio with a sofa for children downstairs, a kitchenette, shower/WC and private terrace.",
      "pl": "Dwupoziomowy dom rodzinny: sypialnia rodziców na piętrze, studio z sofą dla dzieci na dole, aneks kuchenny, prysznic/WC i prywatny taras."
    },
    "areaFrom": null,
    "areaTo": null,
    "terraceArea": null,
    "bedrooms": 1,
    "bathrooms": 1,
    "guests": null,
    "buildCostUsd": null,
    "assetPriceUsd": null,
    "netIncomeYearUsd": null,
    "yieldPct": null,
    "paybackYears": null,
    "nightlyMinUsd": null,
    "nightlyMaxUsd": null,
    "features": {
      "uk": [
        "Сімейний формат; точна місткість уточнюється",
        "Спальня батьків на другому поверсі",
        "Розкладний диван для дітей у студії",
        "Компактна кухня",
        "Окремий душ і WC",
        "Купіль і два лежаки на терасі",
        "Тепло, вентиляція, гаряча вода, Wi-Fi"
      ],
      "en": [
        "Family format; exact capacity to be confirmed",
        "Parents’ bedroom on the second floor",
        "Convertible sofa for children in the studio",
        "Compact kitchenette",
        "Separate shower and WC",
        "Outdoor hot tub and two loungers",
        "Heating, ventilation, hot water and Wi-Fi"
      ],
      "pl": [
        "Format rodzinny; dokładna liczba gości do ustalenia",
        "Sypialnia rodziców na drugim poziomie",
        "Rozkładana sofa dla dzieci w studiu",
        "Mały aneks kuchenny",
        "Osobny prysznic i WC",
        "Balia i dwa leżaki na tarasie",
        "Ogrzewanie, wentylacja, ciepła woda i Wi-Fi"
      ]
    },
    "rooms": [
      {
        "name": {
          "uk": "Студія першого поверху",
          "en": "Ground-floor studio",
          "pl": "Studio na parterze"
        },
        "area": "",
        "note": {
          "uk": "Диван для дітей і стіл на чотирьох",
          "en": "Sofa for children and a table for four",
          "pl": "Sofa dla dzieci i stół dla czterech osób"
        }
      },
      {
        "name": {
          "uk": "Спальня батьків",
          "en": "Parents’ bedroom",
          "pl": "Sypialnia rodziców"
        },
        "area": "",
        "note": {
          "uk": "Другий поверх під двосхилим дахом",
          "en": "Second floor under the pitched roof",
          "pl": "Drugi poziom pod dwuspadowym dachem"
        }
      },
      {
        "name": {
          "uk": "Компактна кухня",
          "en": "Compact kitchenette",
          "pl": "Mały aneks kuchenny"
        },
        "area": "",
        "note": {
          "uk": "Уточнюється",
          "en": "To be confirmed",
          "pl": "Do ustalenia"
        }
      },
      {
        "name": {
          "uk": "Окремий душ і WC",
          "en": "Separate shower and WC",
          "pl": "Osobny prysznic i WC"
        },
        "area": "",
        "note": {
          "uk": "Уточнюється",
          "en": "To be confirmed",
          "pl": "Do ustalenia"
        }
      },
      {
        "name": {
          "uk": "Приватна тераса",
          "en": "Private terrace",
          "pl": "Prywatny taras"
        },
        "area": "",
        "note": {
          "uk": "Купіль і два лежаки на терасі",
          "en": "Outdoor hot tub and two loungers",
          "pl": "Balia i dwa leżaki na tarasie"
        }
      }
    ]
  },
  {
    "slug": "romeo-juliet",
    "segment": "comfort",
    "order": 4,
    "title": {
      "uk": "Ромео і Джульєтта",
      "en": "Romeo & Juliet",
      "pl": "Romeo i Julia"
    },
    "tagline": {
      "uk": "Теплий камінь · аркові мотиви · легкий балдахін · бордовий оксамит",
      "en": "Warm stone · arched motifs · light canopy · burgundy velvet",
      "pl": "Ciepły kamień · motywy łuków · lekki baldachim · bordowy aksamit"
    },
    "summary": {
      "uk": "Тільки 2 дорослих, 18+. Без дітей і додаткових місць. Необхідне оснащення, доступне виконання й виразний тематичний дизайн.",
      "en": "Two adults only, 18+. No children or extra beds. Essential amenities, affordable construction and distinctive themed design.",
      "pl": "Tylko dwoje dorosłych, 18+. Bez dzieci i dodatkowych miejsc. Niezbędne wyposażenie, przystępny koszt budowy i wyrazisty wystrój tematyczny."
    },
    "areaFrom": null,
    "areaTo": null,
    "terraceArea": null,
    "bedrooms": 0,
    "bathrooms": 1,
    "guests": 2,
    "buildCostUsd": null,
    "assetPriceUsd": null,
    "netIncomeYearUsd": null,
    "yieldPct": null,
    "paybackYears": null,
    "nightlyMinUsd": null,
    "nightlyMaxUsd": null,
    "features": {
      "uk": [
        "Тільки 2 дорослих, 18+. Без дітей і додаткових місць.",
        "Одне двоспальне ліжко",
        "Два крісла й столик для двох",
        "Компактна кухня",
        "Окремий душ і WC",
        "Купіль і два лежаки на терасі",
        "Тепло, вентиляція, гаряча вода, Wi-Fi"
      ],
      "en": [
        "Two adults only, 18+. No children or extra beds.",
        "One double bed",
        "Two chairs and a table for two",
        "Compact kitchenette",
        "Separate shower and WC",
        "Outdoor hot tub and two loungers",
        "Heating, ventilation, hot water and Wi-Fi"
      ],
      "pl": [
        "Tylko dwoje dorosłych, 18+. Bez dzieci i dodatkowych miejsc.",
        "Jedno podwójne łóżko",
        "Dwa fotele i stolik dla dwojga",
        "Mały aneks kuchenny",
        "Osobny prysznic i WC",
        "Balia i dwa leżaki na tarasie",
        "Ogrzewanie, wentylacja, ciepła woda i Wi-Fi"
      ]
    },
    "rooms": [
      {
        "name": {
          "uk": "Житлова студія",
          "en": "Living studio",
          "pl": "Studio mieszkalne"
        },
        "area": "",
        "note": {
          "uk": "Одне двоспальне ліжко",
          "en": "One double bed",
          "pl": "Jedno podwójne łóżko"
        }
      },
      {
        "name": {
          "uk": "Компактна кухня",
          "en": "Compact kitchenette",
          "pl": "Mały aneks kuchenny"
        },
        "area": "",
        "note": {
          "uk": "Уточнюється",
          "en": "To be confirmed",
          "pl": "Do ustalenia"
        }
      },
      {
        "name": {
          "uk": "Окремий душ і WC",
          "en": "Separate shower and WC",
          "pl": "Osobny prysznic i WC"
        },
        "area": "",
        "note": {
          "uk": "Уточнюється",
          "en": "To be confirmed",
          "pl": "Do ustalenia"
        }
      },
      {
        "name": {
          "uk": "Приватна тераса",
          "en": "Private terrace",
          "pl": "Prywatny taras"
        },
        "area": "",
        "note": {
          "uk": "Купіль і два лежаки на терасі",
          "en": "Outdoor hot tub and two loungers",
          "pl": "Balia i dwa leżaki na tarasie"
        }
      }
    ]
  }
]
