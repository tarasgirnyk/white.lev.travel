import React, { useState } from 'react';

/** Single FAQ accordion row: click question to expand answer. */
export function FaqItem({ question, answer, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return React.createElement('div', { style: { borderBottom: '1px solid var(--color-border)' } },
    React.createElement('button', {
      onClick: () => setOpen(!open), 'aria-expanded': open,
      style: {
        width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px',
        background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
        padding: 'var(--space-md) 0', fontFamily: 'var(--font-display)', fontSize: 'var(--text-h4)',
        color: 'var(--color-text)', letterSpacing: 'var(--tracking-tight)',
      },
    },
      question,
      React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 16 16', style: { flexShrink: 0, transform: open ? 'rotate(45deg)' : 'none', transition: `transform var(--dur-fast) var(--ease-standard)` } },
        React.createElement('path', { d: 'M8 1V15M1 8H15', stroke: 'var(--color-accent)', strokeWidth: 1.5 })
      )
    ),
    open ? React.createElement('p', {
      style: { margin: 0, padding: '0 0 var(--space-md)', maxWidth: 640, fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)', color: 'var(--color-text-muted)' },
    }, answer) : null
  );
}
