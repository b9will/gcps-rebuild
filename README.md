# GCPS Rebuild
**Client:** Great Canadian Property Services (Terrill Hagar, Vancouver BC)
**Stack:** Vanilla HTML / CSS / JS · Cloudflare Pages
**Design ref:** https://b9will.github.io/gcps/refined/index.html

---

## Quick Start

```bash
# 1. Scrape existing site (run once)
cd scraper
node scrape.mjs
# All 48 pages saved to scraper/scraped-pages/

# 2. Scrape only one section
node scrape.mjs --section=residential

# 3. Adjust delay if getting rate limited
node scrape.mjs --delay=1200

# 4. Deploy to Cloudflare Pages
# Connect repo in Cloudflare dashboard
# Build command: (none - static files)
# Build output directory: site/
```

---

## Site Architecture

```
site/
├── index.html                  Homepage
├── about-us/index.html
├── contact-us/index.html
├── reviews/index.html
├── gallery/
│   ├── index.html
│   └── holiday-wonderland/index.html
├── christmas-lighting/index.html
├── window-cleaning/index.html
├── privacy/index.html
├── terms/index.html
├── sitemap/index.html
│
├── residential/
│   ├── index.html              Residential hub
│   ├── house-washing/index.html
│   ├── roof-cleaning/index.html
│   ├── window-cleaning/index.html
│   ├── driveway-cleaning/index.html
│   ├── patio-cleaning/index.html
│   ├── concrete-cleaning/index.html
│   ├── concrete-paver-sanding/index.html
│   └── concrete-paver-sealing/index.html
│
├── commercial/
│   ├── index.html              Commercial hub
│   ├── building-washing/index.html
│   ├── fleet-washing/index.html
│   ├── gutter-cleaning/index.html
│   ├── industrial-pressure-washing/index.html
│   └── window-cleaning/index.html
│
├── near-me/
│   ├── index.html              All areas hub
│   ├── vancouver/index.html
│   ├── surrey/index.html
│   ├── richmond/index.html
│   ├── north-vancouver/index.html
│   ├── west-vancouver/index.html
│   ├── coquitlam/index.html
│   ├── delta/index.html
│   ├── langley/index.html
│   ├── white-rock/index.html
│   ├── maple-ridge/index.html
│   ├── abbotsford/index.html
│   ├── chilliwack/index.html
│   ├── squamish/index.html
│   └── whistler/index.html
│
├── articles/
│   ├── index.html              Articles hub
│   ├── pressure-washing-pro-weekends/index.html
│   ├── concrete-paver-sealing/index.html
│   ├── holiday-lighting-installation/index.html
│   ├── holiday-lighting-cost-surrey/index.html
│   ├── window-cleaning-surrey-storefronts/index.html
│   ├── water-fed-poles-vs-squeegees/index.html
│   └── how-often-clean-windows-coastal/index.html
│
├── assets/
│   ├── css/
│   │   ├── design-system.css   Core tokens, typography, components
│   │   ├── nav.css             Navigation (sticky/transparent/mobile)
│   │   └── article.css         Article page sidebar layout + body type
│   ├── js/
│   │   └── main.js             Nav scroll, mobile toggle, scroll reveal
│   └── img/
│       ├── favicon.ico
│       └── apple-touch-icon.png
│
├── _redirects                  Cloudflare Pages redirect rules
└── _headers                    Cloudflare Pages security + cache headers
```

---

## Templates

| Template | Use for | Location |
|---|---|---|
| `service-page.html` | All residential/*, commercial/* detail pages | `templates/service-page.html` |
| `location-page.html` | All near-me/* city pages | `templates/location-page.html` |
| `article-page.html` | All articles/* blog posts | `templates/article-page.html` |

**Partials** (copy-paste into every page):
- `templates/partials/head.html` — `<head>` block with all meta/schema slots
- `templates/partials/nav-footer.html` — `<header>` nav + `<footer>`

---

## Authority Build Strategy

### URL Structure (clean, descriptive)
- `/residential/house-washing/` not `/residential-pressure-washing/house-washing`
- `/near-me/vancouver/` not `/near-me/vancouver-bc-pressure-washing`
- `/articles/` not `/pressure-washing-articles/`

### Schema types by page
| Page type | Schema |
|---|---|
| Homepage | `LocalBusiness` + `WebSite` + `FAQPage` |
| Service pages | `LocalBusiness` + `Service` + `BreadcrumbList` |
| Location pages | `LocalBusiness` (areaServed = city) + `BreadcrumbList` |
| Articles | `Article` + `BreadcrumbList` |
| Reviews page | `LocalBusiness` with aggregateRating + individual `Review` |

### Internal linking rules
- Every service page links to: related services + 3-4 relevant location pages
- Every location page links to: all service pages + 2-3 nearby cities
- Every article links to: 1-2 service pages + 1-2 location pages (contextual)
- Hub pages (/residential/, /commercial/, /near-me/, /articles/) link to all children

### Page title formula
- Service: `[Service] in [City] BC | Great Canadian Property Services`
- Location: `[City] Pressure Washing & Property Care | Great Canadian Property Services`
- Article: `[Title] | Great Canadian Property Services`
- Home: `Professional Pressure Washing Vancouver BC | Great Canadian Property Services`

---

## Design System Reference

**Fonts:** Cormorant Garamond (serif/display) + Montserrat (sans)
**Colours:** Navy `#0d1b2a` · Gold `#b8956a` · Cream `#f8f5f0`
**Key classes:** `.heading-xl/lg/md/sm` `.eyebrow` `.btn-primary` `.btn-outline` `.divider` `.reveal` `.section--cream` `.section--navy`

---

## Cloudflare Pages Setup
1. Push `site/` folder to GitHub repo
2. Connect in Cloudflare Dashboard > Pages > Create project
3. Framework preset: None
4. Build command: (leave blank)
5. Build output directory: `/` (root of site/ folder)
6. Deploy. `_redirects` and `_headers` are auto-processed.

---

## To Do
- [ ] Run scraper, review all 48 pages
- [ ] Build homepage (`site/index.html`) from approved design
- [ ] Build residential hub + 8 service pages (use service-page template)
- [ ] Build commercial hub + 5 service pages
- [ ] Build 14 location pages (use location-page template)
- [ ] Build articles hub + 7 article pages
- [ ] Add favicon + OG images
- [ ] Add GA4 / GTM snippet to head partial
- [ ] Submit sitemap to Google Search Console after launch
