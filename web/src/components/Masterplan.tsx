'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import type { Dict } from '@/i18n'

type Spot = { id: string; label: string; slug: string; x: number; y: number }

const spots: Spot[] = [
  {
    "id": "1",
    "label": "1",
    "slug": "adam-eve",
    "x": 30,
    "y": 62
  },
  {
    "id": "2",
    "label": "2",
    "slug": "picasso",
    "x": 44,
    "y": 54
  },
  {
    "id": "3",
    "label": "3",
    "slug": "yavir-boykivskyi",
    "x": 60,
    "y": 46
  },
  {
    "id": "4",
    "label": "4",
    "slug": "romeo-juliet",
    "x": 78,
    "y": 34
  }
]

export function Masterplan({ locale, dict }: { locale: Locale; dict: Dict }) {
  const [active, setActive] = useState<string | null>(null)

  return (
    <div className="card overflow-hidden">
      <div className="relative aspect-[16/9] bg-gradient-to-br from-[#1c2024] to-[#0f1113]">
        {/* Схематична ділянка на схилі */}
        <svg viewBox="0 0 160 90" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="mp-slope" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0" stopColor="#161a1d" />
              <stop offset="1" stopColor="#20262b" />
            </linearGradient>
          </defs>
          <path d="M0 90 L0 60 Q60 40 160 12 L160 90 Z" fill="url(#mp-slope)" />
          {/* контурні лінії схилу */}
          {[70, 58, 46, 34, 24].map((y, i) => (
            <path
              key={i}
              d={`M0 ${y} Q70 ${y - 16} 160 ${y - 26}`}
              stroke="rgba(245,244,241,0.06)"
              strokeWidth="0.6"
              fill="none"
            />
          ))}
          {/* напрям краєвиду / Пд-Зх */}
          <g opacity="0.5">
            <line x1="12" y1="80" x2="26" y2="72" stroke="var(--color-ember)" strokeWidth="0.8" />
            <text x="10" y="86" fontSize="4" fill="#8a857b">Пд-Зх · краєвид</text>
          </g>
        </svg>

        {/* хотспоти */}
        {spots.map((s) => {
          const on = active === s.id
          return (
            <div key={s.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${s.x}%`, top: `${s.y}%` }}>
              <Link
                href={`/${locale}/houses/${s.slug}`}
                onMouseEnter={() => setActive(s.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(s.id)}
                onBlur={() => setActive(null)}
                className="group relative block"
                aria-label={dict.series.houses[Number(s.id) - 1].name}
              >
                <span className={`block w-4 h-4 rounded-full border-2 transition-all ${on ? 'bg-ember border-ember scale-110' : 'bg-ink border-fg-dim'}`} />
                <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 whitespace-nowrap rounded-lg bg-ink px-2.5 py-1 text-xs border border-line-strong shadow-lg opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity pointer-events-none">
                  {dict.series.houses[Number(s.id) - 1].name}
                </span>
              </Link>
            </div>
          )
        })}
      </div>

      <div className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-xs text-muted max-w-md">{dict.masterplan.note}</p>
        <div className="flex gap-4 text-xs text-fg-dim">
          <span>4 тематичні будинки</span>
        </div>
      </div>
    </div>
  )
}
