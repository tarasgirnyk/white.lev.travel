import React from 'react';

export function Button({ children, variant = 'primary', href, onClick, type = 'button' }) {
  const styles = {
    primary: { background: 'var(--color-accent)', color: 'var(--color-text-on-accent)', border: '1px solid var(--color-accent)' },
    ghost: { background: 'transparent', color: 'var(--color-text)', border: '1px solid var(--color-border-strong)' },
  };
  const base = {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-body-sm)',
    fontWeight: 600,
    letterSpacing: '0.01em',
    padding: '14px 28px',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none',
    transition: `background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)`,
    ...styles[variant],
  };
  const Tag = href ? 'a' : 'button';
  return React.createElement(Tag, { href, onClick, type: href ? undefined : type, style: base }, children);
}
