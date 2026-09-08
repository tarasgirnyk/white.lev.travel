import React from 'react'

/**
 * Офіційний логотип-локап «Білий Лев» (біла на темному тлі) з дизайн-системи.
 * `compact` — трохи менша висота для шапки.
 */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <img
      src="/logo-on-dark.svg"
      alt="White.Lev.Travel · Білий Лев"
      width={compact ? 128 : 168}
      height={compact ? 34 : 45}
      style={{ height: compact ? 30 : 44, width: 'auto', display: 'block' }}
      className="select-none"
    />
  )
}
