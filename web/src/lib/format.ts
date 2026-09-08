export function usd(value?: number | null): string {
  if (value == null) return '—'
  return '$' + Math.round(value).toLocaleString('en-US')
}

export function usdK(value?: number | null): string {
  if (value == null) return '—'
  if (value >= 1000) return '$' + Math.round(value / 1000) + 'k'
  return '$' + value
}

export function range(a?: number | null, b?: number | null, unit = ''): string {
  if (a == null && b == null) return '—'
  if (a != null && b != null && a !== b) return `${a}–${b}${unit}`
  return `${a ?? b}${unit}`
}
