'use client'

import { useState } from 'react'

type Item = { q: string; a: string }

export function FaqList({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(0)

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={i} className="border-b border-line last:border-0">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 py-5 text-left"
            >
              <span className="display text-lg sm:text-xl">{item.q}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className={`shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
              >
                <path d="M8 1V15M1 8H15" stroke="var(--color-ember)" strokeWidth="1.5" />
              </svg>
            </button>
            {isOpen && (
              <p className="pb-5 max-w-2xl text-fg-dim leading-relaxed">{item.a}</p>
            )}
          </div>
        )
      })}
    </div>
  )
}
