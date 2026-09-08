import React from 'react'

type Segment = 'compact' | 'comfort' | 'vip'

/**
 * Концепт-ілюстрація barnhouse у стилі лінійки «Білий Лев».
 * Темний фасад + дерево, панорама з теплим світлом, тераса з чаном.
 * VIP отримує додаткове крило (сауна) і трохи більший об'єм.
 */
export function HouseSvg({
  segment = 'compact',
  className,
}: {
  segment?: Segment
  className?: string
}) {
  const uid = `h-${segment}`
  const big = segment === 'vip'
  const mid = segment === 'comfort'
  // ширина фронтона
  const w = big ? 190 : mid ? 168 : 150
  const cx = 210
  const left = cx - w / 2
  const right = cx + w / 2
  const baseY = 250
  const wallTop = big ? 120 : mid ? 128 : 134
  const apexY = big ? 60 : mid ? 72 : 82
  const winInset = 20

  return (
    <svg viewBox="0 0 420 300" className={className} role="img" aria-label={`House type ${segment}`}>
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#20262b" />
          <stop offset="0.6" stopColor="#171a1e" />
          <stop offset="1" stopColor="#101215" />
        </linearGradient>
        <linearGradient id={`${uid}-glow`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f2c877" />
          <stop offset="1" stopColor="#d8934a" />
        </linearGradient>
        <radialGradient id={`${uid}-moon`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#f6f4ee" />
          <stop offset="1" stopColor="#f6f4ee" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* небо */}
      <rect x="0" y="0" width="420" height="300" fill={`url(#${uid}-sky)`} />
      {/* місяць */}
      <circle cx="360" cy="58" r="30" fill={`url(#${uid}-moon)`} opacity="0.5" />
      <circle cx="360" cy="58" r="13" fill="#f6f4ee" opacity="0.85" />
      {/* далекі пагорби */}
      <path d="M0 250 Q120 210 230 244 T420 236 V300 H0 Z" fill="#14171a" />
      <path d="M0 262 Q150 232 300 260 T420 258 V300 H0 Z" fill="#101315" />

      {/* дерева-силуети */}
      {[36, 70].map((x, i) => (
        <g key={i} fill="#0c0e10">
          <path d={`M${x} 250 l10 -34 l10 34 Z`} />
          <path d={`M${x + 1} 236 l9 -28 l9 28 Z`} />
          <rect x={x + 8} y="248" width="4" height="8" />
        </g>
      ))}

      {/* VIP крило (сауна) */}
      {big && (
        <g>
          <rect x={left - 54} y="176" width="56" height={baseY - 176} fill="#15181b" stroke="#0c0e10" />
          <path d={`M${left - 56} 176 L${left - 26} 150 L${left + 4} 176 Z`} fill="#121417" />
          <rect x={left - 44} y="196" width="24" height="30" rx="2" fill={`url(#${uid}-glow)`} opacity="0.85" />
          <text x={left - 26} y="242" textAnchor="middle" fontSize="8" fill="#6f6c64">
            SPA
          </text>
        </g>
      )}

      {/* тераса */}
      <rect x={left - 6} y={baseY} width={w + 30} height="10" fill="#2a2723" />
      <rect x={left - 6} y={baseY} width={w + 30} height="3" fill="#3a352d" />

      {/* корпус будинку */}
      <path
        d={`M${left} ${baseY} L${left} ${wallTop} L${cx} ${apexY} L${right} ${wallTop} L${right} ${baseY} Z`}
        fill="#16191c"
        stroke="#0b0d0f"
        strokeWidth="1.5"
      />
      {/* дерев'яні планки збоку */}
      <g stroke="#3a342b" strokeWidth="2" opacity="0.8">
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={i} x1={left + 6 + i * 4} y1={wallTop + 20} x2={left + 6 + i * 4} y2={baseY - 4} />
        ))}
      </g>

      {/* панорамне скління з теплим світлом */}
      <path
        d={`M${left + winInset} ${baseY - 10}
            L${left + winInset} ${wallTop + 14}
            L${cx} ${apexY + 22}
            L${right - winInset} ${wallTop + 14}
            L${right - winInset} ${baseY - 10} Z`}
        fill={`url(#${uid}-glow)`}
        opacity="0.9"
      />
      {/* переплетення вікна */}
      <g stroke="#16191c" strokeWidth="2.5">
        <line x1={cx} y1={apexY + 22} x2={cx} y2={baseY - 10} />
        <line x1={left + winInset} y1={wallTop + 40} x2={right - winInset} y2={wallTop + 40} />
        {mid || big ? (
          <>
            <line x1={(left + winInset + cx) / 2} y1={wallTop + 18} x2={(left + winInset + cx) / 2} y2={baseY - 10} />
            <line x1={(right - winInset + cx) / 2} y1={wallTop + 18} x2={(right - winInset + cx) / 2} y2={baseY - 10} />
          </>
        ) : null}
      </g>

      {/* акцент ковзана для VIP */}
      {big && (
        <path d={`M${cx} ${apexY} L${right} ${wallTop}`} stroke="var(--color-ember)" strokeWidth="2.5" />
      )}

      {/* чан на терасі + пара */}
      <g>
        <ellipse cx={right + 14} cy={baseY + 2} rx="12" ry="5" fill="#241f1a" />
        <ellipse cx={right + 14} cy={baseY} rx="10" ry="3.6" fill="#3a2f22" />
        <g stroke="#8a8378" strokeWidth="1.5" opacity="0.5" fill="none">
          <path d={`M${right + 10} ${baseY - 4} q-3 -8 1 -14`} />
          <path d={`M${right + 16} ${baseY - 4} q3 -8 -1 -16`} />
        </g>
      </g>
    </svg>
  )
}
