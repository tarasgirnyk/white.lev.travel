# White Lev Travel — Design System

## Brand context

**White.Lev.Travel** is the hotel-complex brand within the Lev.Travel family of domains:

- `lev.travel` — the parent brand: an online travel agency selling package tours (Turkey, Egypt, Greece…), built around a lion-family mascot ("look for your kind of trip: for two / with kids / youth / adults-only").
- `green.lev.travel` — the land/development arm: pitches landowners on turning their plots into Green.Lev.Travel eco-resort projects. Reference for White.Lev.Travel's landing-page rhythm (hero → value props → offering tiers → FAQ → footer).
- `white.lev.travel` (this design system) — the actual built hotel complex: a small cluster of architect-designed countryside houses for private rest, one implementation of the Green.Lev.Travel concept (see `КОНЦЕПЦІЯ_БУДІВНИЦТВА_GREEN_LEV_TRAVEL.md` in `uploads/`). White.Lev.Travel is the "white lion" property — **Білий Лев**.

Sources given for this project (stored here for reference, not all fetchable by future agents):
- `uploads/КОНЦЕПЦІЯ_БУДІВНИЦТВА_GREEN_LEV_TRAVEL.md` — full development concept: audience, house tiers (Compact / Comfort / VIP Villa), site-planning rules, guest journey, business model.
- `uploads/Comfort_VIP_prompts_v1.md`, `uploads/compact_interior_layout_v1_prompt.md` — the AI image-gen prompts behind the render set (useful for understanding what's authoritative vs. approximate in the renders).
- `uploads/*.png` — 6 concept renders (Compact/Comfort/VIP × exterior/interior), copied into `assets/photography/`.
- `https://lev.travel` and `https://green.lev.travel` — live reference sites for tone and page rhythm (fetched live; green.lev.travel is a JS app and didn't yield full markup, so its structure is inferred from lev.travel's parallel sections + the user's direct description).

**Official logo received:** `assets/logo-on-dark.svg` (white lion mark + "Білий" in white, "Лев" in brand lime, for the black site background) and `assets/logo-on-light.svg` (dark-green mark + "Білий" in dark green, for light backgrounds). Both carry the "white.lev.travel" tagline baked in. Use `logo-on-dark.svg` everywhere on this site (black background).

## Product

One product/surface: the **White.Lev.Travel marketing site** — a single hotel complex (not a chain yet), presented as three house tiers guests can book: **Compact**, **Comfort**, **VIP Villa**.

## Content fundamentals

- **Language:** Ukrainian. Direct, warm, unhurried — closer to a boutique-stay brochure than a booking-engine funnel (contrast with `lev.travel`'s brisk "знаходь / порівнюй / бронюй" search-tool voice).
- **Address:** speaks to "ви" (formal plural), addressing a couple or small family, never generic "клієнт/користувач".
- **Vibe words:** приватність, тиша, краєвид, природа, вечір/присмерк, тепло. Avoid touristic hype ("найкращі ціни", "унікальна пропозиція") — the concept doc explicitly rejects a cheap/hyped image even for the entry tier.
- **No emoji.** No exclamation-heavy copy. Numbers used sparingly (m², guest counts) — no invented statistics.
- **Structure mirrors green.lev.travel/lev.travel:** short eyebrow label → a short header line → one supporting sentence → proof (photo, tier cards, FAQ). Never a wall of paragraphs.

## Visual foundations

- **Palette:** near-black canvas (`--color-bg #0a0a09`) with warm off-white text (`--linen-0`), lit by the official Lev.Travel brand accent — lime green `--amber-1 #98c51d` — with the mark's deep green (`--oak-1/2`, `#123d2b` family) for tier badges and small accents, never as a background. Confirmed from the official logo files (`assets/logo-on-dark.svg`, `assets/logo-on-light.svg`): the family brand color is this lime + deep green pair, not an invented warm amber. White.Lev.Travel stays "чорний маскот білий" — black site, white mark — with brand-green as the single accent instead of a made-up gold.
- **Type:** Instrument Sans (display/headlines, tight tracking, tight leading) + Manrope (body/UI). *Substitution flag:* no brand font files were provided; these are Google Fonts nearest to the clean architectural-grotesk feel of the renders' own signage-free minimalism. Replace if the brand has real type files.
- **Imagery:** the renders are the entire visual language — dusk/blue-hour exteriors with warm interior glow, black standing-seam roofs, charcoal cladding, warm thermowood accents, black window frames, oak floors. Every hero/section image should carry this warm-light-on-black-architecture mood; avoid daylight-flat or studio-white photography.
- **Backgrounds:** full-bleed photography with a dark gradient scrim for text legibility; flat near-black panels between photo sections. No illustration, no patterns, no gradients-as-decoration beyond the photo scrims.
- **Corners & shape:** sharp — 2–3px radius max, matching the barnhouse's crisp gables and black steel siding. No pill buttons except tier badges.
- **Borders:** hairline `1px solid var(--color-border)` (14% linen on black) separating sections/cards; brightens to `--color-border-strong` on hover.
- **Shadow:** one soft warm glow shadow (`--shadow-glow`) for elevated cards over photos; a deep neutral shadow (`--shadow-card`) for cards over flat panels. No inner shadows.
- **Hover/press:** hover nudges opacity/border brightness up and shifts accent text from `--amber-1`→`--amber-2`; press (`:active`) settles to `--amber-3` with a 1px translateY. No scale/bounce — this is a calm, adult brand.
- **Motion:** minimal. Fades and 4–8px slide-ins only, `ease: --ease-standard` (standard cubic-bezier), 160–320ms. No springs, no parallax tricks.
- **Blur/transparency:** used once, deliberately — the sticky top nav is a translucent black panel with `--blur-panel` backdrop-blur over photography, never elsewhere.
- **Cards:** flat black-1 surface, hairline border, no drop shadow at rest; a photo cap (tier exterior shot) plus tight type block below. Selected/hovered state gets the amber-tinted glow shadow and a brighter border — never a colored fill.

## Iconography

No icon set or icon font was provided. The complex needs only a handful of small marks (amenity list, FAQ chevron, nav). These are hand-drawn as thin single-weight (1.5px) inline SVG strokes matching the black-steel window-frame linework in the renders — no icon font, no emoji, no filled icon style. If the brand later adopts a system icon set, prefer one at the same thin stroke weight (e.g. Lucide) over the current inline set.

## Intentional additions

No component source was attached (no Figma, no codebase), so this system authors a small, from-scratch set sized to exactly what the one product needs — not a generic UI kit:
- **Button** — primary (amber fill) / ghost (outline) actions.
- **Badge** — tier label (Compact/Comfort/VIP).
- **PropertyCard** — one house tier: photo, badge, size, blurb, amenities.
- **FaqItem** — single accordion row for the FAQ section.

## Index

- `styles.css` — root stylesheet, imports everything under `tokens/`.
- `tokens/colors.css`, `typography.css`, `spacing.css`, `effects.css`.
- `assets/photography/` — the 6 concept renders (compact/comfort/vip × exterior/interior).
- `assets/logo-on-dark.svg`, `assets/logo-on-light.svg` — official lion emblem + "Білий Лев" wordmark.
- `assets/business-card.html` — Bozhena's business card (front/back, print-ready).
- `guidelines/` — foundation specimen cards (Design System tab).
- `components/core/` — Button, Badge, PropertyCard, FaqItem (`.jsx` + `.d.ts` + `.prompt.md` + one `@dsCard` html).
- `ui_kits/website/` — the White.Lev.Travel landing page (`index.html`).
- `SKILL.md` — portable skill wrapper for use outside this product.
