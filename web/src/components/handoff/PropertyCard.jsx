import React from 'react';
import { Badge } from './Badge.jsx';

/** One house tier: photo, tier badge, size, blurb, amenity list. */
export function PropertyCard({ image, tier, size, title, description, amenities = [] }) {
  return React.createElement('div', {
    style: {
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: `border-color var(--dur-med) var(--ease-standard), box-shadow var(--dur-med) var(--ease-standard)`,
    },
  },
    React.createElement('div', { style: { position: 'relative', aspectRatio: '4/3', overflow: 'hidden' } },
      React.createElement('img', { src: image, alt: title, loading: 'lazy', style: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' } }),
      React.createElement('div', { style: { position: 'absolute', top: 16, left: 16 } }, React.createElement(Badge, { tone: 'wood' }, tier))
    ),
    React.createElement('div', { style: { padding: 'var(--space-md)', display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px' } },
        React.createElement('h3', { style: { fontFamily: 'var(--font-display)', fontSize: 'var(--text-h4)', color: 'var(--color-text)', margin: 0, letterSpacing: 'var(--tracking-tight)' } }, title),
        React.createElement('span', { style: { fontFamily: 'var(--font-body)', fontSize: 'var(--text-body-sm)', color: 'var(--color-text-muted)', fontSize: 11, textAlign: 'right' } }, size)
      ),
      React.createElement('p', { style: { fontFamily: 'var(--font-body)', fontSize: 'var(--text-body-sm)', color: 'var(--color-text-muted)', lineHeight: 'var(--leading-body)', margin: 0 } }, description),
      amenities.length ? React.createElement('ul', { style: { listStyle: 'none', padding: 0, margin: '4px 0 0', display: 'flex', flexWrap: 'wrap', gap: '8px 16px' } },
        amenities.map((a, i) => React.createElement('li', { key: i, style: { fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-text)', display: 'flex', alignItems: 'center', gap: '6px' } },
          React.createElement('span', { style: { width: 4, height: 4, borderRadius: '50%', background: 'var(--color-accent)', display: 'inline-block' } }), a))
      ) : null
    )
  );
}
