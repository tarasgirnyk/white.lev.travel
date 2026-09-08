/* @ds-bundle: {"format":4,"namespace":"WhiteLevTravelDesignSystem_c8e3c2","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"FaqItem","sourcePath":"components/core/FaqItem.jsx"},{"name":"PropertyCard","sourcePath":"components/core/PropertyCard.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"a94a33bc2e39","components/core/Button.jsx":"609cd80c460a","components/core/FaqItem.jsx":"467432672a67","components/core/PropertyCard.jsx":"a3e16013ee51"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.WhiteLevTravelDesignSystem_c8e3c2 = window.WhiteLevTravelDesignSystem_c8e3c2 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
/** Small uppercase tier label (Compact / Comfort / VIP). */
function Badge({
  children,
  tone = 'wood'
}) {
  const tones = {
    wood: {
      background: 'var(--color-wood-deep)',
      color: 'var(--linen-0)'
    },
    amber: {
      background: 'var(--color-accent)',
      color: 'var(--color-text-on-accent)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--color-text-muted)',
      border: '1px solid var(--color-border-strong)'
    }
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
      ...tones[tone]
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  type = 'button'
}) {
  const styles = {
    primary: {
      background: 'var(--color-accent)',
      color: 'var(--color-text-on-accent)',
      border: '1px solid var(--color-accent)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-text)',
      border: '1px solid var(--color-border-strong)'
    }
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
    ...styles[variant]
  };
  const Tag = href ? 'a' : 'button';
  return React.createElement(Tag, {
    href,
    onClick,
    type: href ? undefined : type,
    style: base
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/FaqItem.jsx
try { (() => {
const {
  useState
} = React;
/** Single FAQ accordion row: click question to expand answer. */
function FaqItem({
  question,
  answer,
  defaultOpen = false
}) {
  const [open, setOpen] = useState(defaultOpen);
  return React.createElement('div', {
    style: {
      borderBottom: '1px solid var(--color-border)'
    }
  }, React.createElement('button', {
    onClick: () => setOpen(!open),
    style: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '16px',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'left',
      padding: 'var(--space-md) 0',
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-h4)',
      color: 'var(--color-text)',
      letterSpacing: 'var(--tracking-tight)'
    }
  }, question, React.createElement('svg', {
    width: 16,
    height: 16,
    viewBox: '0 0 16 16',
    style: {
      flexShrink: 0,
      transform: open ? 'rotate(45deg)' : 'none',
      transition: `transform var(--dur-fast) var(--ease-standard)`
    }
  }, React.createElement('path', {
    d: 'M8 1V15M1 8H15',
    stroke: 'var(--color-accent)',
    strokeWidth: 1.5
  }))), open ? React.createElement('p', {
    style: {
      margin: 0,
      padding: '0 0 var(--space-md)',
      maxWidth: 640,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-body)',
      lineHeight: 'var(--leading-body)',
      color: 'var(--color-text-muted)'
    }
  }, answer) : null);
}
Object.assign(__ds_scope, { FaqItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/FaqItem.jsx", error: String((e && e.message) || e) }); }

// components/core/PropertyCard.jsx
try { (() => {
/** One house tier: photo, tier badge, size, blurb, amenity list. */
function PropertyCard({
  image,
  tier,
  size,
  title,
  description,
  amenities = []
}) {
  return React.createElement('div', {
    style: {
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: `border-color var(--dur-med) var(--ease-standard), box-shadow var(--dur-med) var(--ease-standard)`
    }
  }, React.createElement('div', {
    style: {
      position: 'relative',
      aspectRatio: '4/3',
      overflow: 'hidden'
    }
  }, React.createElement('img', {
    src: image,
    alt: title,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }), React.createElement('div', {
    style: {
      position: 'absolute',
      top: 16,
      left: 16
    }
  }, React.createElement(__ds_scope.Badge, {
    tone: 'wood'
  }, tier))), React.createElement('div', {
    style: {
      padding: 'var(--space-md)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-xs)'
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: '12px'
    }
  }, React.createElement('h3', {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-h4)',
      color: 'var(--color-text)',
      margin: 0,
      letterSpacing: 'var(--tracking-tight)'
    }
  }, title), React.createElement('span', {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-body-sm)',
      color: 'var(--color-text-muted)',
      whiteSpace: 'nowrap'
    }
  }, size)), React.createElement('p', {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-body-sm)',
      color: 'var(--color-text-muted)',
      lineHeight: 'var(--leading-body)',
      margin: 0
    }
  }, description), amenities.length ? React.createElement('ul', {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: '4px 0 0',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px 16px'
    }
  }, amenities.map((a, i) => React.createElement('li', {
    key: i,
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '13px',
      color: 'var(--color-text)',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    }
  }, React.createElement('span', {
    style: {
      width: 4,
      height: 4,
      borderRadius: '50%',
      background: 'var(--color-accent)',
      display: 'inline-block'
    }
  }), a))) : null));
}
Object.assign(__ds_scope, { PropertyCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/PropertyCard.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.FaqItem = __ds_scope.FaqItem;

__ds_ns.PropertyCard = __ds_scope.PropertyCard;

})();
