'use client'
import React from 'react';
import { Button } from './Button';
import { Badge } from './Badge';
import { PropertyCard } from './PropertyCard';
import { FaqItem } from './FaqItem';
import { InquiryForm } from '../InquiryForm';
import './landing.css';
export function Landing({ locale, dict }) {
function selectHouse(i) { const field = document.querySelector('#contact select[name="houseTheme"]'); if (field) { field.value = dict.series.houses[i].name; field.dispatchEvent(new Event('change', { bubbles: true })); } }



const P = (p) => '/handoff/photography/' + p;

function Nav() {
  const lang = locale === 'uk' ? 'UA' : locale.toUpperCase();
  const LANGS = ['UA', 'PL', 'EN'];
  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 20, background: 'rgba(10,10,9,0.72)', backdropFilter: 'blur(var(--blur-panel))', borderBottom: '1px solid var(--color-border)' }}>
      <div className="wrap handoff-nav" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 76 }}>
        <img src="/handoff/logo-on-dark.svg" alt="Білий Лев" style={{ height: 51 }} />
        <nav className="handoff-nav-links" style={{ display: 'flex', gap: 32, fontSize: 14 }}>
          <a href="#tiers" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>{dict.nav.houses}</a>
          <a href="#location" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>{dict.nav.location}</a>
          <a href="#green-love" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>Green Love</a>
          <a href="#faq" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>{dict.faq.eyebrow}</a>
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, border: '1px solid var(--color-border)', borderRadius: 'var(--radius-pill)', padding: 3 }}>
            {LANGS.map((l) =>
            <button key={l} onClick={() => { window.location.href = '/' + (l === 'UA' ? 'uk' : l.toLowerCase()); }} aria-current={l === lang ? 'page' : undefined} style={{ font: 'inherit', fontSize: 12, fontWeight: 600, letterSpacing: 'var(--tracking-eyebrow)', padding: '5px 10px', borderRadius: 'var(--radius-pill)', border: 'none', cursor: 'pointer', background: l === lang ? 'var(--color-accent)' : 'transparent', color: l === lang ? 'var(--black-0)' : 'var(--color-text-muted)' }}>{l}</button>
            )}
          </div>
          <Button variant="primary" href="#contact">{dict.nav.book}</Button>
        </div>
      </div>
    </div>);

}

function Hero() {
  return (
    <div className="handoff-hero" style={{ position: 'relative', height: '92svh', minHeight: 640, overflow: 'hidden' }}>
      <img src={P('vip-exterior.webp')} alt="Будинок White.Lev.Travel у горах на заході сонця" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(10,10,9,0.35) 0%,rgba(10,10,9,0.15) 40%,rgba(10,10,9,0.9) 100%)' }} />
      <div className="wrap" style={{ position: 'absolute', left: 0, right: 0, bottom: 'var(--space-2xl)', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
        <div className="eyebrow">{dict.hero.kicker}</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h1)', lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-tight)', margin: 0, maxWidth: 900 }}>{dict.hero.title}</h1>
        <p style={{ fontSize: 'var(--text-body-lg)', color: 'var(--linen-1)', maxWidth: 560, margin: 0, lineHeight: 'var(--leading-body)' }}>{dict.hero.subtitle}</p>
        <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
          <Button variant="primary" href="#tiers">{dict.hero.ctaInvest}</Button>
          <Button variant="ghost" href="#location">{dict.hero.ctaBook}</Button>
        </div>
      </div>
    </div>);

}

const VALUES = [{ t: dict.values.natureTitle, d: dict.values.natureText }, { t: dict.values.privacyTitle, d: dict.values.privacyText }, { t: dict.values.comfortTitle, d: dict.values.comfortText }];

function Values() {
  return (
    <div className="wrap handoff-values" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 'var(--space-lg)', padding: 'var(--space-2xl) 0' }}>
      {VALUES.map((v, i) =>
      <div key={i} style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-md)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h4)', margin: '0 0 8px', letterSpacing: 'var(--tracking-tight)' }}>{v.t}</h3>
          <p style={{ fontSize: 'var(--text-body-sm)', color: 'var(--color-text-muted)', lineHeight: 'var(--leading-body)', margin: 0 }}>{v.d}</p>
        </div>
      )}
    </div>);

}

const exteriors = ['green-love-adam-eve-exterior.webp', 'green-love-picasso-exterior.webp', 'comfort-exterior.webp', 'green-love-romeo-juliet-exterior.webp'];
const TIERS = dict.series.houses.map((h, i) => ({ image: P(exteriors[i]), tier: 'Comfort', size: dict.houses.guests, title: h.name, description: h.tagline, amenities: [dict.houses.terrace] }));

function Tiers() {
  return (
    <div id="tiers" className="wrap" style={{ padding: 'var(--space-2xl) 0' }}>
      <div className="eyebrow">{dict.nav.houses}</div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', margin: '12px 0 var(--space-lg)', letterSpacing: 'var(--tracking-tight)', maxWidth: 640 }}>{dict.hero.ctaInvest}</h2>
      <div className="handoff-tiers" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 'var(--space-md)' }}>
        {TIERS.map((t, i) => <PropertyCard key={i} {...t} />)}
      </div>
    </div>);

}

const GREEN_LOVE = [
{ slot: 'green-love-adam-eve', no: '01', name: 'Адам і Єва', tagline: "Біла основа · червоне узголів'я · дзеркальні акценти", size: 'Уточнюється', amenities: ['Тераса', 'Барбекю', 'Панорамне скління'], exterior: P('green-love-adam-eve-exterior.webp'),
  photos: [
    { src: P('green-love-adam-eve-02-reverse.webp'), alt: 'Від входу до тераси' },
    { src: P('green-love-adam-eve-01-overview.webp'), alt: 'Загальний вигляд' },
    { src: P('green-love-adam-eve-03-seating.webp'), alt: 'Місце для двох' },
    { src: P('green-love-adam-eve-04-bathroom.webp'), alt: 'Санвузол' },
    { src: P('green-love-adam-eve-05-kitchen.webp'), alt: 'Кухня' },
    { src: P('green-love-adam-eve-06-terrace.webp'), alt: 'Приватна тераса' },
  ] },
{ slot: 'green-love-picasso', no: '02', name: 'Пікассо', tagline: 'Мистецтво · музика · львівські спогади', size: 'Уточнюється', amenities: ['Тераса', 'Барбекю', 'Панорамне скління'], image: P('green-love-picasso.webp'), exterior: P('green-love-picasso-exterior.webp') },
{ slot: 'green-love-max-royal', no: '03', name: 'Max Royal', tagline: 'Темне дерево · фактурний камінь · світлий текстиль · приглушена зелень', size: 'Уточнюється', amenities: ['Тераса', 'Барбекю', 'Панорамне скління'], image: P('green-love-max-royal.webp'), exterior: P('comfort-exterior.webp') },
{ slot: 'green-love-romeo-juliet', no: '04', name: 'Ромео і Джульєтта', tagline: "Теплий камінь · аркові мотиви · легкий балдахін · бордовий оксамит", size: 'Уточнюється', amenities: ['Тераса', 'Барбекю', 'Панорамне скління'], image: P('green-love-romeo-juliet.webp'), exterior: P('green-love-romeo-juliet-exterior.webp') }];

function ScrollGallery({ slides }) {
  const ref = React.useRef(null);
  const [active, setActive] = React.useState(0);
  const goTo = (i) => { setActive(i); if (ref.current) ref.current.scrollTo({ left: i * ref.current.clientWidth, behavior: 'smooth' }); };
  const scroll = (dir) => goTo(Math.max(0, Math.min(slides.length - 1, active + dir)));
  const onScroll = () => { if (ref.current && ref.current.clientWidth) setActive(Math.round(ref.current.scrollLeft / ref.current.clientWidth)); };
  const navBtn = (side) => ({ position: 'absolute', top: '50%', [side]: 8, transform: 'translateY(-50%)', width: 36, height: 36, borderRadius: '50%', border: 'none', background: 'rgba(10,10,9,0.55)', color: '#fff', fontSize: 18, lineHeight: 1, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, backdropFilter: 'blur(6px)' });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ position: 'relative', flex: 1, minHeight: 0 }}>
        <div ref={ref} className="gl-scroll" onScroll={onScroll} style={{ display: 'flex', height: '100%', overflowX: 'auto', scrollSnapType: 'x mandatory' }}>
          {slides.map((s, i) => <div key={i} style={{ flex: '0 0 100%', scrollSnapAlign: 'start', height: '100%' }}>{s.node}</div>)}
        </div>
        {slides.length > 1 && <React.Fragment>
          <button onClick={() => scroll(-1)} aria-label="Попереднє фото" style={navBtn('left')}>‹</button>
          <button onClick={() => scroll(1)} aria-label="Наступне фото" style={navBtn('right')}>›</button>
        </React.Fragment>}
      </div>
      {slides.length > 1 && <div className="gl-scroll" style={{ display: 'flex', gap: 6, padding: 8, background: 'var(--color-surface)', overflowX: 'auto', flex: '0 0 auto' }}>
        {slides.map((s, i) =>
        <button key={i} onClick={() => goTo(i)} aria-label={`фото ${i + 1}`} style={{ flex: '0 0 auto', width: 52, height: 38, borderRadius: 4, overflow: 'hidden', padding: 0, cursor: 'pointer', background: 'var(--color-border)', border: i === active ? '2px solid var(--color-accent)' : '2px solid transparent' }}>
            {s.thumb ? <img src={s.thumb} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : null}
          </button>
        )}
      </div>}
    </div>
  );
}

function GreenLoveSeries() {
  const imgStyle = { width: '100%', height: '100%', objectFit: 'cover', display: 'block' };
  const iconProps = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1.75', strokeLinecap: 'round', strokeLinejoin: 'round' };
  const IconArea = (p) => <svg {...iconProps} {...p}><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>;
  const IconGuests = (p) => <svg {...iconProps} {...p}><circle cx="8.5" cy="8" r="2.8"/><path d="M3 19c0-2.9 2.3-4.8 5.5-4.8s5.5 1.9 5.5 4.8"/><circle cx="17" cy="9" r="2.2"/><path d="M14.8 19c.2-2.4 2-4 4.2-4"/></svg>;
  const IconJacuzzi = (p) => <svg {...iconProps} {...p}><circle cx="12" cy="13" r="6"/><path d="M9 13c0-1 .7-1 .7-2s-.7-1-.7-2M12 13c0-1 .7-1 .7-2s-.7-1-.7-2M15 13c0-1 .7-1 .7-2s-.7-1-.7-2"/></svg>;
  const IconBbq = (p) => <svg {...iconProps} {...p}><path d="M12 21c3 0 5-2 5-5 0-2-1.2-3.3-2-4.7.1 1.2-.6 2-1.4 2a1.7 1.7 0 01-1.7-1.8c0-1.5 1-2.3 1-3.9 0-1.1-.5-2-1.2-2.8C10 6.8 8 9.6 8 13c0 3 2 8 4 8z"/></svg>;
  const IconHeart = (p) => <svg {...iconProps} {...p}><path d="M12 19.5s-6.5-4-8.5-8A4.8 4.8 0 0112 6.8 4.8 4.8 0 0120.5 11.5c-2 4-8.5 8-8.5 8z"/></svg>;
  return (
    <div id="green-love" className="wrap" style={{ padding: 'var(--space-2xl) 0' }} data-comment-anchor="3535145a3b-div-85-5">
      <div className="eyebrow">{dict.series.eyebrow}</div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', margin: '12px 0 8px', letterSpacing: 'var(--tracking-tight)', maxWidth: 640 }}>{dict.series.title}</h2>
      <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-muted)', lineHeight: 'var(--leading-body)', margin: '0 0 var(--space-lg)', maxWidth: 640 }}>{dict.series.subtitle}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
        {GREEN_LOVE.map((original, i) => {
          const h = { ...original, ...dict.series.houses[i], size: dict.houses.pending };
          const slides = h.photos
            ? [
                { node: <img key="main" src={h.photos[0].src} alt={`${h.name} · ${h.photos[0].alt}`} style={imgStyle} />, thumb: h.photos[0].src },
                { node: <img key="ext" src={h.exterior} alt={`${h.name} · екстер'єр`} style={imgStyle} />, thumb: h.exterior },
                ...h.photos.slice(1).map((p, j) => ({ node: <img key={j} src={p.src} alt={`${h.name} · ${p.alt}`} style={imgStyle} />, thumb: p.src })),
              ]
            : [
                { node: <img src={h.image} alt={`${h.name} · ${dict.series.interior}`} style={imgStyle} />, thumb: h.image || null },
                { node: <img key="ext" src={h.exterior} alt={`${h.name} · екстер'єр`} style={imgStyle} />, thumb: h.exterior },

              ];
          return (
            <article className="handoff-house" key={i} style={{ display: 'grid', gridTemplateColumns: '420px minmax(0,1fr) 200px', height: 400, background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <div style={{ position: 'relative' }}>
                <ScrollGallery slides={slides} />
                <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 3, pointerEvents: 'none' }}><Badge tone="wood">{`Comfort №${h.no}`}</Badge></div>
              </div>
              <div style={{ padding: 'var(--space-md)', display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'center', borderLeft: '1px solid var(--color-border)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h4)', color: 'var(--color-text)', margin: 0, letterSpacing: 'var(--tracking-tight)' }}>{h.name}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body-sm)', color: 'var(--color-text-muted)', lineHeight: 'var(--leading-body)', margin: 0 }}>{h.tagline}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: '10px 16px', margin: '6px 0 0' }}>
                  {[{ Icon: IconArea, label: dict.houses.area + ': ' + h.size }, { Icon: IconGuests, label: dict.houses.guests }, { Icon: IconJacuzzi, label: locale === 'uk' ? 'Купіль' : locale === 'pl' ? 'Balia' : 'Hot tub' }, { Icon: IconHeart, label: dict.houses.terrace }].map((f, j) =>
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <f.Icon style={{ width: 18, height: 18, flexShrink: 0, color: 'var(--color-accent)' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--color-text)' }}>{f.label}</span>
                  </div>
                  )}
                </div>
              </div>
              <div style={{ padding: 'var(--space-md)', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', gap: 12, borderLeft: '1px solid var(--color-border)' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h4)', color: 'var(--color-text)', letterSpacing: 'var(--tracking-tight)', overflowWrap: 'anywhere' }}>{h.price}</span>
                <Button variant="primary" href="#contact" onClick={() => selectHouse(i)}>{dict.nav.book}</Button>
              </div>
            </article>
          );
        })}
      </div>
    </div>);

}

const STEPS = dict.journey.steps;

function Journey() {
  return (
    <div id="location" className="wrap" style={{ padding: 'var(--space-2xl) 0' }}>
      <div className="eyebrow">{dict.journey.eyebrow}</div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', margin: '12px 0 var(--space-lg)', letterSpacing: 'var(--tracking-tight)', maxWidth: 640 }}>{dict.journey.title}</h2>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: 32 }}>{dict.location.subtitle}</p>
      <div className="handoff-steps" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 'var(--space-md)' }}>
        {STEPS.map((s, i) =>
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--color-accent)', letterSpacing: 'var(--tracking-tight)' }}>{String(i + 1).padStart(2, '0')}</div>
            <p style={{ fontSize: 'var(--text-body-sm)', color: 'var(--color-text-muted)', lineHeight: 'var(--leading-body)', margin: 0 }}>{s}</p>
          </div>
        )}
      </div>
    </div>);

}

const FAQS = dict.faq.items;

function Faq() {
  return (
    <div id="faq" className="wrap" style={{ padding: 'var(--space-2xl) 0', maxWidth: 760 }}>
      <div className="eyebrow">{dict.faq.eyebrow}</div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', margin: '12px 0 var(--space-md)', letterSpacing: 'var(--tracking-tight)' }}>{dict.faq.title}</h2>
      <div>{FAQS.map((f, i) => <FaqItem key={i} question={f.q} answer={f.a} defaultOpen={i === 0} />)}</div>
    </div>);

}

function Footer() {
  return (
    <div style={{ borderTop: '1px solid var(--color-border)', padding: 'var(--space-xl) 0' }}>
      <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-lg)' }}>
        <div>
          <img src="/handoff/logo-on-dark.svg" alt="Білий Лев" style={{ height: 57 }} />
          <div style={{ fontSize: 12, letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginTop: 6 }}></div>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2xl)', fontSize: 14 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ color: 'var(--color-text-muted)', fontSize: 12, textTransform: 'uppercase', letterSpacing: 'var(--tracking-eyebrow)' }}>{dict.footer.nav}</span>
            <a href="#tiers" style={{ textDecoration: 'none' }}>{dict.nav.houses}</a>
            <a href="#location" style={{ textDecoration: 'none' }}>{dict.nav.location}</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ color: 'var(--color-text-muted)', fontSize: 12, textTransform: 'uppercase', letterSpacing: 'var(--tracking-eyebrow)' }}>Lev.Travel</span>
            <a href="https://lev.travel" style={{ textDecoration: 'none' }}>lev.travel</a>
            <a href="https://green.lev.travel" style={{ textDecoration: 'none' }}>green.lev.travel</a>
          </div>
        </div>
      </div>
      <div className="wrap" style={{ marginTop: 'var(--space-lg)', fontSize: 12, color: 'var(--color-text-muted)' }}></div>
    </div>);

}

function App() {
  return <React.Fragment><Nav /><Hero /><Values /><Tiers /><GreenLoveSeries /><Journey /><Faq /><section id="contact" className="wrap handoff-contact"><h2>{dict.form.title}</h2><p>{dict.form.subtitle}</p><InquiryForm locale={locale} dict={dict} defaultIntent="stay" /></section><Footer /></React.Fragment>;
}
return <div className="handoff-landing"><App /></div>;
}
