import React from 'react';

/** Small uppercase tier label (Compact / Comfort / VIP). */
export function Badge({ children, tone = 'wood' }) {
  const tones = {
    wood: { background: 'var(--color-wood-deep)', color: 'var(--linen-0)' },
    amber: { background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' },
    outline: { background: 'transparent', color: 'var(--color-text-muted)', border: '1px solid var(--color-border-strong)' },
  };
  return React.createElement('span', {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '11px',
      fontWeight: 700,
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      padding: '5px 12px',
      borderRadius: 'var(--radius-pill)',
      display: 'inline-block',
      ...tones[tone],
    },
  }, children);
}
