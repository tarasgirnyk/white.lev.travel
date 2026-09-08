import React from 'react'

/** Маскот «Білий Лев» — геометрична емблема голови лева (біла на темному). */
export function LionMark({ size = 34, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Грива — променеві сегменти по колу */}
      <g fill="currentColor">
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i / 16) * Math.PI * 2
          const r1 = 30
          const r2 = 47
          const w = 0.16
          const cx = 50
          const cy = 50
          const x1 = cx + Math.cos(a - w) * r1
          const y1 = cy + Math.sin(a - w) * r1
          const x2 = cx + Math.cos(a) * r2
          const y2 = cy + Math.sin(a) * r2
          const x3 = cx + Math.cos(a + w) * r1
          const y3 = cy + Math.sin(a + w) * r1
          return <path key={i} d={`M${x1} ${y1} L${x2} ${y2} L${x3} ${y3} Z`} />
        })}
      </g>
      {/* Морда */}
      <circle cx="50" cy="50" r="30" fill="currentColor" />
      {/* Очі й ніс — «вирізані» кольором тла */}
      <g fill="var(--color-ink)">
        <circle cx="41" cy="46" r="3.4" />
        <circle cx="59" cy="46" r="3.4" />
        <path d="M50 54 l5 6 a5 5 0 0 1 -10 0 Z" />
      </g>
    </svg>
  )
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-fg">
      <LionMark size={compact ? 28 : 34} />
      <span className="leading-none">
        <span className="block text-[15px] font-semibold tracking-tight">
          White<span className="text-muted">.</span>Lev
          <span className="text-muted">.</span>Travel
        </span>
        {!compact && (
          <span className="block text-[11px] tracking-[0.16em] uppercase text-muted mt-0.5">
            Білий Лев
          </span>
        )}
      </span>
    </span>
  )
}
