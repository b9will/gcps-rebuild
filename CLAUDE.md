# GCPS Rebuild — Project Brief for Claude Code

You are building a production website for **Great Canadian Property Services** (GCPS), a premium property care company in Vancouver, BC. The client is Terrill Hagar. This is a B9 Digital project being rebuilt from a Webflow original to a vanilla HTML/CSS/JS site hosted on Cloudflare Pages.

This file is your single source of truth. Read it first every session.

---

## TL;DR — What You're Doing

1. **Build out 47 pages** using the approved homepage as the design source of truth. The homepage at `site/index.html` is already done and approved — do not modify it.
2. **Rewrite all copy** in the elevated brand voice established by that homepage. Use the scraped pages in `scraper/scraped-pages/` as the source for facts, services, and structure — but do not copy their tone.
3. **Maintain the existing URL structure exactly** so we don't break Google rankings. Old URLs that need to change are handled via 301s in `_redirects`.
4. **Build a custom 404 page** that auto-redirects to the homepage after 5 seconds.
5. **Build everything autonomously.** Do not stop to ask permission for each page. When you finish a logical batch (e.g. all residential service pages), summarize what was built and keep going.
6. **Deliverable:** All 48 pages live, deploy-ready for Cloudflare Pages.

---

## Project Status

| Component | Status |
|---|---|
| Scraper (pulls all 48 existing pages) | ✅ Done. Already run. Output in `scraper/scraped-pages/` |
| Approved homepage | ✅ Done. `site/index.html`. **Do not modify.** |
| Design system CSS | ✅ Done. `site/assets/css/design-system.css` |
| Site JS (nav, drawer, FAQ, reveals) | ✅ Done. `site/assets/js/main.js` |
| Cloudflare `_redirects` | ✅ Done. May need additions as you build. |
| Cloudflare `_headers` | ✅ Done. |
| Page templates (service / location / article) | ✅ Drafted in `templates/`. **You should reference these but freely improve them** to match the approved homepage exactly. |
| 47 remaining pages | ⏳ Build these. |
| 404 page | ⏳ Build this. |

---

## Design System

The approved homepage at `site/index.html` is the source of truth. Reference its inlined `<style>` block and the extracted version at `site/assets/css/design-system.css`.

**Fonts:**
- Serif (display): `Cormorant Garamond` — italic emphasis is a signature element
- Sans (body / UI): `Outfit`

**Palette (dark-first):**
- `--bg-dark` `#0D0D0D` — primary background
- `--bg-charcoal` `#161616` — alt dark sections, footer
- `--bg-elevated` `#1E1E1E`
- `--bg-warm` `#F7F3EF` — light section variant (commercial)
- `--bg-cream` `#FAF8F5` — light section variant (FAQ)
- `--copper` `#C4956A` — primary accent
- `--copper-btn` `#9A6A40` — button background
- `--copper-on-light` `#8B6544` — copper on light backgrounds
- `--text-light` `#E8E4DF`, `--text-muted` `#9A9590` (on dark)
- `--text-dark` `#2C2C2C`, `--text-dark-muted` `#6B6560` (on light)

**Section rhythm:** Sections alternate between dark and light backgrounds for visual rhythm. Use `.section--dark`, `.section--charcoal`, `.section--warm`, `.section--cream`. Never two of the same in a row.

**Typography signatures:**
- All headings use `<em>` for italic copper-coloured emphasis on key phrases. This is the brand's voice on the page.
- Section tags (eyebrows) are `.section__tag` — uppercase, copper, letter-spacing `.25em`
- All headings are weight 300 (light)
- Body copy is weight 300 with line-height 1.8

**Components already styled:**
`.split` / `.split--reverse`, `.image-break`, `.commercial-banner`, `.commercial-grid` + `.commercial-card`, `.process-grid` + `.process-card`, `.bg-section` (full-bleed image), `.feature-list`, `.seasonal-grid` + `.season-card`, `.trust-bar`, `.reviews-grid` + `.review-card`, `.areas-grid` + `.area-item`, `.faq-item`, `.final-cta`, `.page-hero`, `.breadcrumb`, `.article-layout` + sidebar.

**Reveal animations:** Add `class="reveal"` to anything that should fade up on scroll. Stagger siblings with `reveal-d1` / `reveal-d2` / `reveal-d3` / `reveal-d4`.

**Critical:** New pages should look like they were designed by the same hand as the homepage. Same rhythm, same restraint, same use of italics, same generous whitespace.

---

## Brand Voice

The approved homepage establishes the voice. Match it on every page.

**Tone:** Refined, confident, understated. Speaks to discerning property owners who care about quality. Never salesy, never desperate, never folksy.

**Hallmarks of the voice:**
- Two-line headlines that pivot on an italicized phrase: *"Meticulous Care for Exceptional Properties"*, *"Preserving the Standard Your Home Represents"*, *"Protecting Your Hardscape Investment"*
- Words it uses: meticulous, preserve, exceptional, finest, standard, refined, deliberate, considered
- Words it does not use: best, top-rated, affordable, deals, fast, cheap, hassle-free (only used once on the page deliberately)
- Sentence rhythm is measured. Short declarative sentences punctuated by longer descriptive ones.
- Always Canadian English (colour, neighbourhood, programme, centre)
- Never uses em dashes (per Will's preference). Use commas, periods, or sentence breaks instead.
- Writes about *"complimentary assessments"* not "free quotes"
- Writes about properties, not houses (when context allows)
- Uses *"we"* sparingly. Prefers active verbs without subject ("Apply the right technique", "Protect surrounding surfaces").

**Rewriting strategy:** When building each page, read the corresponding scraped page in `scraper/scraped-pages/` to extract:
- Factual details (services offered, process, pricing structure if mentioned, areas served)
- The genuine substance of what GCPS does

Then rewrite it from scratch in the brand voice. Do not paraphrase the original sentence-by-sentence. Throw the original tone away and rebuild the message.

---

## Site Architecture (URL Structure)

**Critical:** All existing URLs from the original site must remain accessible. The cleanest path is to keep the URLs identical to the original. This is what we'll do.

```
site/
├── index.html                                          ← DONE, do not modify
├── about-us/index.html
├── contact-us/index.html
├── reviews/index.html
├── gallery/index.html
├── gallery/project-spotlight-a-traditional-holiday-wonderland-illuminating-home-and-garden/index.html
├── christmas-lighting/index.html
├── window-cleaning/index.html
├── privacy/index.html
├── terms/index.html
├── sitemap/index.html                                  ← HTML sitemap (also generate /sitemap.xml at root)
├── 404.html                                            ← Custom 404 with auto-redirect
│
├── residential-pressure-washing/index.html
├── residential-pressure-washing/house-washing/index.html
├── residential-pressure-washing/driveway-cleaning/index.html
├── residential-pressure-washing/concrete-cleaning/index.html
├── residential-pressure-washing/concrete-paver-sanding/index.html
├── residential-pressure-washing/concrete-paver-sealing/index.html
├── residential-pressure-washing/patio-cleaning/index.html
├── residential-pressure-washing/roof-cleaning/index.html
├── residential-pressure-washing/window-cleaning/index.html
│
├── commercial-pressure-washing/index.html
├── commercial-pressure-washing/building-washing/index.html
├── commercial-pressure-washing/fleet-washing/index.html
├── commercial-pressure-washing/gutter-cleaning/index.html
├── commercial-pressure-washing/industrial-pressure-washing/index.html
├── commercial-pressure-washing/window-cleaning/index.html
│
├── near-me/index.html
├── near-me/vancouver-bc-pressure-washing/index.html
├── near-me/surrey-bc-pressure-washing/index.html
├── near-me/richmond-bc-pressure-washing/index.html
├── near-me/coquitlam-bc-pressure-washing/index.html
├── near-me/delta-bc-pressure-washing/index.html
├── near-me/langley-bc-pressure-washing/index.html
├── near-me/maple-ridge-bc-pressure-washing/index.html
├── near-me/north-vancouver-bc-pressure-washing/index.html
├── near-me/west-vancouver-bc-pressure-washing/index.html
├── near-me/white-rock-bc-pressure-washing/index.html
├── near-me/abbotsford-bc-pressure-washing/index.html
├── near-me/chilliwack-bc-pressure-washing/index.html
├── near-me/squamish-bc-pressure-washing/index.html
├── near-me/whistler-bc-pressure-washing/index.html
│
├── pressure-washing-articles/index.html
├── pressure-washing-articles/a-pressure-washing-pro-will-help-you-take-back-your-weekends/index.html
├── pressure-washing-articles/concrete-and-paver-sealing-protects-your-hardscaped-surfaces/index.html
├── pressure-washing-articles/lighten-your-holiday-load-with-professional-christmas-lighting-installation/index.html
├── pressure-washing-articles/how-much-does-holiday-lighting-cost-in-surrey-bc/index.html
├── pressure-washing-articles/professional-window-cleaning-surrey-storefronts/index.html
├── pressure-washing-articles/water-fed-poles-vs-traditional-squeegees-which-window-cleaning-method-works-best-for-homes/index.html
└── pressure-washing-articles/how-often-should-you-clean-your-homes-windows-in-a-rainy-coastal-climate/index.html
```

**The full list of 48 URLs is in `scraper/scrape.mjs`.** Use that file as the source of truth for which URLs need to exist.

**Why preserve the long URL slugs:** SEO equity. These pages have ranked for years. Changing a URL like `/residential-pressure-washing/house-washing` to `/residential/house-washing` would force redirects and risk losing rankings. Keep them. The old `_redirects` file in `site/_redirects` was speculative — trim it down to only the things that actually need redirecting (you'll determine this).

---

## Page Templates / Patterns

There are roughly four page archetypes. Build each one to look distinct from the others within the same design system.

### 1. Hub pages
`/residential-pressure-washing/`, `/commercial-pressure-washing/`, `/near-me/`, `/pressure-washing-articles/`

These should mirror the homepage's split-section rhythm. Hero (same `.page-hero` pattern as interior pages), then content sections that introduce the category, then a grid of child pages, then trust bar and final CTA. They are the "table of contents" for their section.

### 2. Service pages (children of residential & commercial hubs)
e.g. `/residential-pressure-washing/house-washing/`

Pattern:
1. Page hero (dark, with breadcrumb)
2. Split section: image + intro copy + benefits service-list
3. Image break
4. Process section (4-step `.process-grid`)
5. Reviews section (2-3 cards specific to this service if available, otherwise general)
6. Service areas grid (so the page also targets "house washing surrey", "house washing vancouver", etc.)
7. FAQ (3-5 questions specific to the service)
8. Related services (links to siblings within the same hub)
9. Final CTA

### 3. Location pages (`/near-me/[city]-bc-pressure-washing/`)
14 cities. Each gets:
1. Page hero with city name in `<em>` ("Property Care in *Vancouver*")
2. Section about serving that specific city — climate, property types, anything that differentiates the city contextually (this is for topical authority; do not invent neighbourhoods or landmarks you can't verify)
3. Services-in-this-city grid (links to all service pages)
4. Reviews from clients in nearby areas if available
5. FAQ (city-specific where it makes sense)
6. Nearby cities grid (links to other location pages)
7. Final CTA

Each location page **must include LocalBusiness schema** with `areaServed` set to that specific city.

### 4. Article pages (`/pressure-washing-articles/[slug]/`)
Standard editorial layout:
1. Page hero with article title, published/updated date, reading time
2. Two-column layout: article body + sticky sidebar (services, areas, mini CTA)
3. Body uses `.article-body` class — already styled
4. Inline CTA card before the article ends
5. Related articles grid
6. Final CTA

Each article needs `Article` schema and `BreadcrumbList` schema.

### Pages that don't fit a template
- Homepage — already done
- About us — single long-form page; design it like an editorial spread
- Contact us — needs a form. For now hardcode `mailto:` and tel links. Note in the page that the form is non-functional and we'll wire it up to a backend later.
- Reviews — grid of review cards, similar to homepage but with all reviews
- Gallery — grid of project images linking to project spotlight pages
- Privacy / Terms — single-column legal text
- Sitemap (`/sitemap/`) — HTML sitemap of all pages, organized by section
- 404 — described below

---

## 404 Page Requirements

`site/404.html` (Cloudflare Pages serves this for any non-existent path):

- Same dark design as the rest of the site
- Centered content: large copper italic "404" using Cormorant
- Heading: something on-brand like "*This page* could not be found."
- Body: "The page you were looking for has moved or no longer exists. We're taking you home."
- A countdown timer ("Redirecting in 5 seconds")
- Two buttons: "Return Home Now" (primary) and "Browse Services" (outline)
- After 5 seconds, JavaScript redirects to `/`
- Include a `<meta http-equiv="refresh" content="5;url=/">` as a fallback for non-JS browsers

---

## SEO Requirements

Every page must have:

1. **Unique `<title>`** in the format `[Page-specific] | Great Canadian Property Services`
2. **Unique meta description** 150-160 characters
3. **Canonical URL** matching the current page
4. **Open Graph tags** (og:title, og:description, og:url, og:image, og:type, og:site_name, og:locale="en_CA")
5. **Twitter card tags**
6. **Geo tags:** `<meta name="geo.region" content="CA-BC">` and `placename` for location pages
7. **Schema.org JSON-LD** appropriate to the page type:
   - All pages: `LocalBusiness` schema in head (consistent across site)
   - Service pages: add `Service` schema
   - Location pages: add `LocalBusiness` with `areaServed`
   - Articles: `Article` + `BreadcrumbList`
   - Homepage: `LocalBusiness` + `WebSite` (with `SearchAction` if applicable) + `FAQPage`
8. **Breadcrumb navigation** in markup AND `BreadcrumbList` schema for all pages except homepage
9. **`<h1>` exactly once per page** — typically the page hero heading
10. **Generate `sitemap.xml`** at root listing all 48 pages with `lastmod`
11. **Generate `robots.txt`** at root referencing the sitemap

**Internal linking is strategic, not ornamental:**
- Service pages cross-link to related services (within same parent)
- Service pages link to location pages (the cities they serve)
- Location pages link to all services
- Articles link contextually to relevant services and locations within the body copy
- Hub pages link to all their children
- Footer is a consistent global hub

---

## Images

Use Unsplash URLs from the approved homepage where possible. For pages that need new imagery, use Unsplash Source URLs with relevant queries. Keep the same aesthetic: luxury homes, Vancouver/coastal landscapes, professional commercial buildings, soft and moody lighting where possible. Avoid stock photos that look like stock photos (generic smiling workers, fake-looking before/afters).

Format URLs like the homepage does: `?w=1920&q=80&auto=format` for hero images, `?w=1200&q=80&auto=format` for split images.

---

## Code Conventions

- **No frameworks.** Vanilla HTML, CSS, JS only. No build step.
- **No JavaScript libraries.** No jQuery, no Alpine, nothing.
- **No CSS preprocessors.** Plain CSS only.
- **CSS goes in `site/assets/css/design-system.css`.** If a page needs unique styles, add them in a `<style>` block in the page itself rather than fragmenting the stylesheet.
- **Match the approved homepage's HTML structure conventions.** Inline `<style>` is OK for one-off page styles; the global system lives in the external stylesheet.
- **Class names use BEM-ish double underscore** like the homepage: `.section__tag`, `.review-card__author`. Do not invent new naming conventions.
- **All anchors and buttons honour the existing `.btn` system.** `.btn--primary`, `.btn--outline`, `.btn--outline-dark`.
- **Indent with 4 spaces** to match the approved homepage source.
- **Always use Canadian English** in copy. Watch for: colour, neighbourhood, centre, programme, organisation, favour, honour, recognise, realise.
- **Never use em dashes (—).** Per Will's preference. Use commas, periods, parentheses, or sentence breaks.
- **Wrap each page in proper semantic HTML5:** `<main>`, `<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`, `<aside>`.

---

## Repo Structure

```
gcps-rebuild/
├── CLAUDE.md                          ← This file
├── README.md                          ← Project overview
├── scraper/
│   ├── scrape.mjs                     ← Source of truth for URL list
│   └── scraped-pages/                 ← All 48 original pages (HTML + manifest.json)
├── templates/                         ← Reference scaffolds. You'll override and improve these.
│   ├── service-page.html
│   ├── location-page.html
│   ├── article-page.html
│   └── partials/
│       ├── head.html
│       └── nav-footer.html
└── site/                              ← THE DEPLOYABLE SITE
    ├── index.html                     ← APPROVED. Don't modify.
    ├── 404.html                       ← Build this
    ├── _redirects                     ← Cloudflare redirects (trim down to actual needs)
    ├── _headers                       ← Cloudflare security/cache headers
    ├── sitemap.xml                    ← Generate this
    ├── robots.txt                     ← Generate this
    └── assets/
        ├── css/design-system.css      ← Global styles
        ├── js/main.js                 ← Global JS
        └── img/                       ← Favicon, OG images
```

---

## Workflow Suggestion

Build in this order. Don't ask permission, just go.

1. **404 page** (small, self-contained, validates you have the design system right)
2. **Hub pages** (4 pages: residential, commercial, near-me, articles) — establishes the hub pattern
3. **Service pages — residential** (8 pages) — repetitive but distinct
4. **Service pages — commercial** (5 pages)
5. **Top-level service pages** — christmas-lighting, window-cleaning (2 pages)
6. **Location pages** (14 pages — fastest, highly templated)
7. **Article pages** (7 pages — substantive copy work)
8. **Utility pages:** about-us, contact-us, reviews, gallery, gallery project, privacy, terms, sitemap (8 pages)
9. **Generate `sitemap.xml` and `robots.txt`**
10. **Final QA pass** — check all internal links, all schema validates, all canonical URLs match the actual page paths

When you finish each batch, post a brief summary: pages built, anything that needed a design system addition, anything that surprised you in the scraped content. Then continue.

---

## Constraints / Gotchas

- **Maintain the homepage's restraint.** It is intentionally not flashy. Resist the urge to add gradient overlays, animation, gimmicks, or visual noise that the homepage doesn't have.
- **Italic emphasis on headings is a signature, not a default.** Use it deliberately for the most important phrase, not on every heading.
- **The top bar is a homepage element only.** Interior pages don't need it (verify this against the approved design — if you think they should have it, fine, just be deliberate).
- **Mobile drawer is global.** Every page needs the hamburger and drawer markup at the top.
- **Footer is global and consistent.** Same on every page including the 404.
- **GCPS is a Canadian business.** Spelling, phone format `604-260-6285`, address `112-15428 31 Ave, Surrey, BC V3Z 3W4`.
- **Phone links work:** `<a href="tel:6042606285">`
- **Email:** `info@greatcanadianpropertyservices.ca`
- **Google reviews CID:** `https://www.google.com/maps?cid=14568573342021237088`
- **Birdeye review URL:** `https://birdeye.com/great-canadian-property-services-176098426886337/review-us?dashboard=1`
- **Don't generate fake reviews.** Use the three real reviews from the approved homepage and reuse them on relevant pages, or use generic anonymous testimonials clearly labelled as such.

---

## When You're Done

Final deliverable summary should include:
1. Total pages built (should be 48)
2. Total schemas added (should be ~50+ across all pages)
3. Any pages that need follow-up from Will (e.g. contact form integration, real photos, real Google review pulls)
4. Cloudflare Pages deploy instructions: which directory to point Pages at (`site/`), no build command needed
5. A short note on what was preserved from the original vs rewritten

That's it. Build everything in `site/`. Match the approved homepage. Use the brand voice. Preserve all existing URLs. Ship it.
