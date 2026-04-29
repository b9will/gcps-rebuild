/* GCPS one-shot page generator
   Run: node scraper/generate-pages.mjs
   Output: writes all remaining service / location / article / utility HTML files into site/.
   Not part of the deploy pipeline — pages are static HTML thereafter.
*/

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SITE = path.join(ROOT, 'site');

// ── Shared site constants ────────────────────────────────────────────────────
const SITE_URL = 'https://www.greatcanadianpropertyservices.ca';
const PHONE = '604-260-6285';
const PHONE_TEL = '6042606285';
const EMAIL = 'info@greatcanadianpropertyservices.ca';
const ADDR = '112-15428 31 Ave';
const CITY = 'Surrey';
const REGION = 'BC';
const POST = 'V3Z 3W4';
const BUSINESS_ID = `${SITE_URL}/#business`;

const CITIES = [
  { slug: 'vancouver', name: 'Vancouver', lat: 49.2827, lng: -123.1207, blurb: 'From West Side heritage homes to East Vancouver craftsman streets, Vancouver properties span every era and material we work with.' },
  { slug: 'surrey', name: 'Surrey', lat: 49.1913, lng: -122.8490, blurb: 'Our home base. South Surrey, Cloverdale, Fleetwood, Guildford, and everywhere in between.' },
  { slug: 'richmond', name: 'Richmond', lat: 49.1666, lng: -123.1336, blurb: 'Coastal climate, mature trees, and a mix of low-rise residential and commercial calls for thoughtful exterior care.' },
  { slug: 'coquitlam', name: 'Coquitlam', lat: 49.2838, lng: -122.7932, blurb: 'Tri-Cities residential and strata work from the Fraser to the slopes of Burke Mountain.' },
  { slug: 'delta', name: 'Delta', lat: 49.0847, lng: -123.0586, blurb: 'Tsawwassen, Ladner, and North Delta. Coastal wind and salt air make routine exterior care worth its weight.' },
  { slug: 'langley', name: 'Langley', lat: 49.1042, lng: -122.6604, blurb: 'From Walnut Grove acreage to Willoughby townhomes, considered care for every property type.' },
  { slug: 'maple-ridge', name: 'Maple Ridge', lat: 49.2193, lng: -122.5984, blurb: 'Properties tucked along the Fraser and the foot of the Coast Mountains. Mossy roofs are a standing feature.' },
  { slug: 'north-vancouver', name: 'North Vancouver', lat: 49.3163, lng: -123.0755, blurb: 'North Shore exterior care built for moss, rain, and mountain proximity.' },
  { slug: 'west-vancouver', name: 'West Vancouver', lat: 49.3343, lng: -123.1622, blurb: 'Discreet, meticulous exterior maintenance for waterfront homes and West Van estates.' },
  { slug: 'white-rock', name: 'White Rock', lat: 49.0254, lng: -122.8030, blurb: 'Bluff homes and Marine Drive storefronts. Salt-air-aware exterior care on a coastline that asks for it.' },
  { slug: 'abbotsford', name: 'Abbotsford', lat: 49.0504, lng: -122.3045, blurb: 'Residential and agricultural exterior care across the heart of the Fraser Valley.' },
  { slug: 'chilliwack', name: 'Chilliwack', lat: 49.1579, lng: -121.9514, blurb: 'Eastern valley exterior care for homes, farms, and commercial properties.' },
  { slug: 'squamish', name: 'Squamish', lat: 49.7016, lng: -123.1558, blurb: 'Sea to Sky exterior maintenance built for high winds, heavy rain, and dramatic seasonal swings.' },
  { slug: 'whistler', name: 'Whistler', lat: 50.1163, lng: -122.9574, blurb: 'Mountain residences and chalets. Year-round exterior care including snow-season window cleaning.' }
];

// ── Boilerplate fragments ────────────────────────────────────────────────────
function nav() {
  return `<nav class="nav nav--solid" id="nav"><div class="nav__inner"><a href="/" class="nav__logo" aria-label="Great Canadian Property Services — home"><img src="/assets/img/logo-lockup-light.svg" class="nav__logo-full" alt="Great Canadian Property Services"><img src="/assets/img/logo-mark.svg" class="nav__logo-mark" alt=""></a><div class="nav__actions"><a href="/contact-us/" class="nav__cta">Get Assessment</a><button class="nav__hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button></div></div></nav>
<div class="drawer-overlay" id="drawerOverlay"></div>
<div class="mobile-drawer" id="mobileDrawer"><a href="/residential-pressure-washing/" class="drawer-link">Residential</a><a href="/commercial-pressure-washing/" class="drawer-link">Commercial</a><a href="/residential-pressure-washing/concrete-cleaning/" class="drawer-link">Concrete Care</a><a href="/window-cleaning/" class="drawer-link">Window Cleaning</a><a href="/christmas-lighting/" class="drawer-link">Holiday Lighting</a><a href="/near-me/" class="drawer-link">Service Areas</a><a href="/reviews/" class="drawer-link">Reviews</a><a href="/pressure-washing-articles/" class="drawer-link">Articles</a><a href="/faq/" class="drawer-link">FAQ</a><a href="/about-us/" class="drawer-link">About Us</a><a href="/contact-us/" class="mobile-drawer__cta drawer-link">Request Assessment</a><a href="tel:${PHONE_TEL}" class="mobile-drawer__phone drawer-link">${PHONE}</a></div>`;
}

function footer() {
  return `<footer class="footer"><div class="container"><div class="footer__grid"><div class="footer__brand"><div class="footer__brand-name">Great Canadian <span>Property Services</span></div><p>Vancouver's premier property care provider. Expert pressure washing, window cleaning, exterior maintenance, and custom holiday lighting for the finest homes and commercial properties across the Lower Mainland.</p><p style="margin-top:.85rem;">${ADDR}<br>${CITY}, ${REGION} ${POST}<br><a href="tel:${PHONE_TEL}" style="color:var(--copper);">${PHONE}</a><br><a href="mailto:${EMAIL}" style="color:var(--copper);">${EMAIL}</a></p></div><div><h4 class="footer__heading">Services</h4><a href="/residential-pressure-washing/house-washing/" class="footer__link">House Washing</a><a href="/residential-pressure-washing/roof-cleaning/" class="footer__link">Roof Cleaning</a><a href="/window-cleaning/" class="footer__link">Window Cleaning</a><a href="/residential-pressure-washing/concrete-cleaning/" class="footer__link">Concrete &amp; Paver Care</a><a href="/commercial-pressure-washing/" class="footer__link">Commercial Services</a><a href="/christmas-lighting/" class="footer__link">Holiday Lighting</a></div><div><h4 class="footer__heading">Service Areas</h4><a href="/near-me/vancouver-bc-pressure-washing/" class="footer__link">Vancouver</a><a href="/near-me/surrey-bc-pressure-washing/" class="footer__link">Surrey</a><a href="/near-me/north-vancouver-bc-pressure-washing/" class="footer__link">North Vancouver</a><a href="/near-me/west-vancouver-bc-pressure-washing/" class="footer__link">West Vancouver</a><a href="/near-me/richmond-bc-pressure-washing/" class="footer__link">Richmond</a><a href="/near-me/" class="footer__link">All 14 Areas &rarr;</a></div><div><h4 class="footer__heading">Connect</h4><a href="https://www.google.com/maps?cid=14568573342021237088" class="footer__link" target="_blank" rel="noopener">Google Reviews</a><a href="https://birdeye.com/great-canadian-property-services-176098426886337/review-us?dashboard=1" class="footer__link" target="_blank" rel="noopener">Leave a Review</a><a href="/contact-us/" class="footer__link">Contact Us</a><a href="/about-us/" class="footer__link">About Us</a><a href="/pressure-washing-articles/" class="footer__link">Articles</a></div></div><div class="footer__partners"><p class="footer__partners-label">Partner</p><a href="https://tridentpressurewashing.com" target="_blank" rel="noopener" class="footer__partner-link" aria-label="Trident — partner"><img src="/assets/img/partner-trident.svg" class="footer__partner-logo" alt="Trident"></a></div><div class="footer__bottom"><p class="footer__copy">&copy; <span id="footer-year"></span> Great Canadian Property Services. All rights reserved.</p><div class="footer__legal"><a href="/privacy/">Privacy Policy</a><a href="/terms/">Terms of Use</a><a href="/sitemap/">Sitemap</a></div></div></div></footer>`;
}

function head({ title, desc, canonical, image, geoCity = 'Surrey, British Columbia', extraSchemas = [], extraStyle = '' }) {
  return `<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${desc}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${canonical}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Great Canadian Property Services">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${desc}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${image}">
    <meta property="og:locale" content="en_CA">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image" content="${image}">
    <meta name="geo.region" content="CA-BC">
    <meta name="geo.placename" content="${geoCity}">
    <link rel="icon" type="image/svg+xml" href="/assets/img/favicon.svg">
    <link rel="stylesheet" href="/assets/css/design-system.css">
    ${extraSchemas.map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n    ')}
    ${extraStyle ? `<style>${extraStyle}</style>` : ''}
</head>`;
}

function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": BUSINESS_ID,
    "name": "Great Canadian Property Services",
    "url": SITE_URL + "/",
    "telephone": "+1-" + PHONE,
    "email": EMAIL,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": ADDR,
      "addressLocality": CITY,
      "addressRegion": REGION,
      "postalCode": POST,
      "addressCountry": "CA"
    }
  };
}

function breadcrumbSchema(crumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": crumbs.map((c, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": c.name,
      "item": c.url
    }))
  };
}

function serviceSchema({ name, slug, parent, areas = CITIES.map(c => c.name), serviceType }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "serviceType": serviceType || name,
    "provider": { "@id": BUSINESS_ID },
    "areaServed": areas,
    "url": `${SITE_URL}/${parent}/${slug}/`
  };
}

function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };
}

function breadcrumbHTML(crumbs) {
  const parts = crumbs.map((c, i) => {
    const isLast = i === crumbs.length - 1;
    return isLast
      ? `<span class="breadcrumb__current">${c.name}</span>`
      : `<a href="${c.path}">${c.name}</a>`;
  });
  return `<nav class="breadcrumb" aria-label="Breadcrumb">${parts.join('<span class="breadcrumb__sep">/</span>')}</nav>`;
}

function pageHero({ tag, h1Pre, h1Em, h1Post = '', sub, image, alt, breadcrumbs, primaryCTA = 'Request a Complimentary Assessment' }) {
  return `<section class="page-hero">
    <div class="page-hero__bg"><img src="${image}" alt="${alt}" loading="eager"></div>
    <div class="page-hero__overlay"></div>
    <div class="container">
        ${breadcrumbHTML(breadcrumbs)}
        <div class="page-hero__content">
            <p class="page-hero__tag">${tag}</p>
            <h1 class="page-hero__heading">${h1Pre}<br><em>${h1Em}</em>${h1Post}</h1>
            <p class="page-hero__sub">${sub}</p>
            <div class="page-hero__actions"><a href="/contact-us/" class="btn btn--primary">${primaryCTA}</a><a href="tel:${PHONE_TEL}" class="btn btn--outline">Call ${PHONE}</a></div>
        </div>
    </div>
</section>`;
}

function trustBar(custom) {
  const items = custom || [
    { label: 'Rating', value: '5.0 Stars on Google' },
    { label: 'Coverage', value: '14 Communities' },
    { label: 'Assurance', value: 'Fully Insured &amp; Licensed' },
    { label: 'Commitment', value: 'Satisfaction Guaranteed' },
    { label: 'Assessments', value: 'Always Complimentary' }
  ];
  return `<div class="trust-bar"><div class="container"><div class="trust-bar__inner reveal">
    ${items.map(it => `<div class="trust-item"><div class="trust-item__label">${it.label}</div><div class="trust-item__value">${it.value}</div></div>`).join('\n    ')}
</div></div></div>`;
}

function areasSection({ heading = 'Across <em>Greater Vancouver</em>', tag = 'Service Areas', dark = true } = {}) {
  const sec = dark ? 'section--dark' : 'section--cream';
  return `<section class="section ${sec}">
    <div class="container">
        <div class="reveal" style="text-align:center; max-width:560px; margin:0 auto;">
            <p class="section__tag">${tag}</p>
            <h2 class="section__heading">${heading}</h2>
            <div class="sep" style="margin:1.25rem auto;"></div>
        </div>
        <div class="areas-grid reveal reveal-d1">
            ${CITIES.map(c => `<a href="/near-me/${c.slug}-bc-pressure-washing/" class="area-item">${c.name}</a>`).join('\n            ')}
        </div>
    </div>
</section>`;
}

function reviewBlock({ stars = 5, text, author, location, source = 'Google' } = {}) {
  return `<div class="review-card">
    <div class="review-card__stars">${'&#9733;'.repeat(stars)}</div>
    <p class="review-card__text">${text}</p>
    <p class="review-card__author">${author}</p>
    <p class="review-card__location">${location}</p>
    <div class="review-card__source"><span class="g-icon"></span> Posted on ${source}</div>
</div>`;
}

const HOMEPAGE_REVIEWS = [
  { text: '"They did an incredible job on our driveway and patio. Everything looks brand new. Professional, on time, and very thorough. We will definitely be calling them again."', author: 'Mark T.', location: 'Surrey, BC' },
  { text: '"Our Christmas lights were absolutely stunning. The whole neighbourhood commented on them. Installation was quick and they came back right away to take everything down after the holidays."', author: 'Jennifer L.', location: 'White Rock, BC' },
  { text: '"We manage several strata properties and Great Canadian handles all of our exterior cleaning. Reliable, communicative, and always deliver quality work. Highly recommend for commercial clients."', author: 'David R.', location: 'Richmond, BC' }
];

function reviewsSection({ tag = 'Client Testimonials', heading, reviews = HOMEPAGE_REVIEWS, sec = 'section--warm' } = {}) {
  return `<section class="section ${sec}">
    <div class="container">
        <div class="reveal" style="text-align:center; max-width:560px; margin:0 auto;">
            <p class="section__tag">${tag}</p>
            <h2 class="section__heading">${heading || '<em>Trusted</em> by Vancouver Property Owners'}</h2>
            <div class="sep" style="margin:1.25rem auto;"></div>
        </div>
        <div class="reviews-grid reveal reveal-d1">
            ${reviews.map(reviewBlock).join('\n            ')}
        </div>
    </div>
</section>`;
}

function processSection({ tag = 'Our Approach', heading, steps }) {
  return `<section class="section section--dark">
    <div class="container">
        <div class="reveal" style="max-width:560px;">
            <p class="section__tag">${tag}</p>
            <h2 class="section__heading">${heading}</h2>
            <div class="sep"></div>
        </div>
        <div class="process-grid reveal reveal-d1">
            ${steps.map((s, i) => `<div class="process-card"><div class="process-card__num">${String(i + 1).padStart(2, '0')}</div><div class="process-card__title">${s.title}</div><div class="process-card__text">${s.text}</div></div>`).join('\n            ')}
        </div>
    </div>
</section>`;
}

function faqSection({ heading = '<em>Common</em> Questions', faqs, sec = 'section--cream' }) {
  return `<section class="section ${sec}">
    <div class="container--narrow">
        <div class="reveal" style="text-align:center;">
            <p class="section__tag">Common Questions</p>
            <h2 class="section__heading">${heading}</h2>
            <div class="sep" style="margin:1.25rem auto;"></div>
        </div>
        <div class="reveal reveal-d1" style="margin-top:1.5rem;">
            ${faqs.map(f => `<div class="faq-item"><button class="faq-item__q">${f.q}<span class="faq-item__icon"></span></button><div class="faq-item__a"><p>${f.a}</p></div></div>`).join('\n            ')}
        </div>
    </div>
</section>`;
}

function relatedServicesSection({ tag = 'Related Services', heading, items, sec = 'section--charcoal' }) {
  return `<section class="section ${sec}">
    <div class="container">
        <div class="reveal" style="max-width:560px;">
            <p class="section__tag">${tag}</p>
            <h2 class="section__heading">${heading}</h2>
            <div class="sep"></div>
        </div>
        <div class="service-card-grid">
            ${items.map((it, i) => `<a href="${it.href}" class="service-card reveal${i > 0 ? ` reveal-d${i}` : ''}"><h3 class="service-card__title">${it.title}</h3><p class="service-card__text">${it.text}</p><span class="service-card__more">Learn More &rarr;</span></a>`).join('\n            ')}
        </div>
    </div>
</section>`;
}

function finalCTA({ heading = 'Begin with a <em>Complimentary Assessment</em>', sub = 'No obligation. Tell us about your property and we will recommend the right care plan.' } = {}) {
  return `<section class="final-cta">
    <div class="container reveal">
        <p class="section__tag" style="text-align:center;">Get Started</p>
        <h2 class="final-cta__heading">${heading}</h2>
        <p class="final-cta__sub">${sub}</p>
        <div class="final-cta__actions">
            <a href="/contact-us/" class="btn btn--primary">Request a Complimentary Assessment</a>
            <a href="tel:${PHONE_TEL}" class="btn btn--outline">Call ${PHONE}</a>
        </div>
    </div>
</section>`;
}

function imageBreak({ src, alt }) {
  return `<div class="image-break"><img src="${src}" alt="${alt}" loading="lazy"></div>`;
}

function splitIntro({ image, alt, tag, headPre, headEm, headPost = '', body, features, reverse = false, sec = 'section--charcoal' }) {
  return `<section class="section ${sec}">
    <div class="container">
        <div class="split${reverse ? ' split--reverse' : ''}" style="background:transparent;">
            <div class="split__image reveal"><img src="${image}" alt="${alt}" loading="lazy"></div>
            <div class="split__content">
                <div class="reveal">
                    <p class="section__tag">${tag}</p>
                    <h2 class="section__heading">${headPre}<br><em>${headEm}</em>${headPost}</h2>
                    <div class="sep"></div>
                    <p class="section__body">${body}</p>
                </div>
                <div class="feature-list reveal reveal-d1">
                    ${features.map(f => `<div class="feature-list__item">${f}</div>`).join('\n                    ')}
                </div>
            </div>
        </div>
    </div>
</section>`;
}

function pageWrap({ title, desc, canonical, image, geoCity, extraSchemas, extraStyle = '', body }) {
  return `<!DOCTYPE html>
<html lang="en-CA">
${head({ title, desc, canonical, image, geoCity, extraSchemas, extraStyle })}
<body>

${nav()}

<main>

${body}

</main>

${footer()}

<script src="/assets/js/main.js"></script>
</body>
</html>
`;
}

// ── Helper to write file with directory creation ─────────────────────────────
function write(relPath, content) {
  const full = path.join(SITE, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
  console.log('  wrote', relPath);
}

// ═════════════════════════════════════════════════════════════════════════════
// RESIDENTIAL SERVICE PAGES (7 — house-washing already built by hand)
// ═════════════════════════════════════════════════════════════════════════════

const RES_PARENT = 'residential-pressure-washing';
const RES_HUB = `/${RES_PARENT}/`;

const residentialServices = [
  {
    slug: 'roof-cleaning',
    title: 'Roof Cleaning in Vancouver &amp; Surrey | Great Canadian Property Services',
    desc: 'Soft-wash roof cleaning that lifts moss, lichen, algae, and gloeocapsa magma without damaging shingles. Extends roof life, restores curb appeal across Greater Vancouver.',
    h1Pre: 'A Cleaner Roof,', h1Em: 'A Longer-Lived Home', tag: 'Roof Cleaning',
    sub: 'Soft-wash roof cleaning that lifts moss, lichen, algae, and gloeocapsa magma without forcing pressure across shingles or shortening their lifespan.',
    heroImg: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1920&q=80&auto=format',
    heroAlt: 'Residential roof in clear coastal light',
    splitImg: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80&auto=format',
    splitAlt: 'Steep residential roof from above',
    splitTag: 'Why It Matters',
    splitHeadPre: 'Pressure Washing', splitHeadEm: 'Belongs Off the Roof',
    splitBody: 'Pressure on shingles strips granules, voids warranties, and shortens roof life. The right approach is a soft-wash treatment that kills the organic growth at the source. The roof keeps looking better, longer, with no surface damage.',
    features: [
      'Safe for asphalt shingles, metal roofs, and tile',
      'Targets gloeocapsa magma, lichen, moss, and algae',
      'Granules stay put, manufacturer warranties stay valid',
      'Includes valley clearing and gutter exterior brightening'
    ],
    breakImg: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1920&q=80&auto=format',
    breakAlt: 'Restored residential roofline',
    processHeading: 'A Roof Wash<br><em>Done Properly</em>',
    process: [
      { title: 'Inspect', text: 'Identify roofing material, problem zones, vulnerable flashings, and skylight seals.' },
      { title: 'Protect', text: 'Saturate landscaping, cover delicate plants, secure adjacent surfaces and downspout outlets.' },
      { title: 'Treat', text: 'Apply soft-wash solution at low pressure. Allow dwell time so growth dies at the root.' },
      { title: 'Rinse &amp; Verify', text: 'Light rinse where appropriate, walk results with you, document anything to monitor next visit.' }
    ],
    faqs: [
      { q: 'Will this damage my shingles?', a: 'No. Soft washing applies cleaning solution at low pressure, not pressure-blasting the surface. Granules stay in place and asphalt warranties stay valid.' },
      { q: 'How often should a roof be cleaned in Vancouver?', a: 'Most coastal BC roofs benefit from cleaning every 2 to 4 years. North-facing slopes and properties under heavy tree cover may need it sooner.' },
      { q: 'Do you clean cedar shake roofs?', a: 'Yes. Cedar takes a different approach than asphalt or metal, and we adjust solution and pressure accordingly.' },
      { q: 'What is gloeocapsa magma?', a: 'It is the dark cyanobacteria responsible for the streaks you see on shingles. Left untreated it deteriorates the roof. Soft washing removes it at the source.' }
    ],
    related: [
      { href: '/residential-pressure-washing/house-washing/', title: 'House Washing', text: 'Pair with roof cleaning for a complete exterior refresh in one visit.' },
      { href: '/commercial-pressure-washing/gutter-cleaning/', title: 'Gutter Cleaning', text: 'Roof debris ends up in the gutters. Bundle the work for a cleaner result.' },
      { href: '/residential-pressure-washing/window-cleaning/', title: 'Window Cleaning', text: 'Round out the curb appeal with spotless glass on every storey.' }
    ],
    review: HOMEPAGE_REVIEWS[0]
  },
  {
    slug: 'window-cleaning',
    title: 'Residential Window Cleaning in Vancouver | Great Canadian Property Services',
    desc: 'Streak-free residential window cleaning across Vancouver and the Lower Mainland. Water-fed pole and squeegee methods. Interior and exterior glass on every storey.',
    h1Pre: 'Crystal-Clear Glass,', h1Em: 'Top to Bottom', tag: 'Window Cleaning',
    sub: 'Residential window cleaning that combines water-fed pole technology for upper storeys with traditional squeegee work where it shines. Interior, exterior, frames, and tracks.',
    heroImg: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80&auto=format',
    heroAlt: 'Floor-to-ceiling windows on a luxury residence',
    splitImg: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80&auto=format',
    splitAlt: 'Sunlit window detail',
    splitTag: 'Two Methods, One Result',
    splitHeadPre: 'The Right Tool', splitHeadEm: 'For the Right Pane',
    splitBody: 'Lower storey glass is often best with traditional squeegee, scrim, and detail work. Upper storey glass benefits from water-fed pole systems with purified water. We use both, and we choose based on what your windows actually need.',
    features: [
      'Water-fed pole for second-storey and high glass',
      'Traditional squeegee for ground-floor detail',
      'Frames, tracks, and sills hand-cleaned',
      'Screens removed, washed, and reinstalled on request'
    ],
    breakImg: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=1920&q=80&auto=format',
    breakAlt: 'Sunlit room through clean glass',
    processHeading: 'A Window Cleaning Visit<br><em>You Will Notice</em>',
    process: [
      { title: 'Walk', text: 'Confirm scope, note storm windows, screens, fixed panes, and any glass needing extra attention.' },
      { title: 'Protect', text: 'Lay down drop cloths inside, cover sills, move soft furnishings out of the way.' },
      { title: 'Clean', text: 'Squeegee or water-fed pole, applied per pane. Frames, tracks, and sills hand-detailed.' },
      { title: 'Inspect', text: 'Walk through with you, spot-touch anything you flag, replace screens.' }
    ],
    faqs: [
      { q: 'Do you do interior glass?', a: 'Yes. Interior, exterior, or both. We protect floors, sills, and furnishings before any work begins.' },
      { q: 'How often should I have my windows cleaned?', a: 'Coastal BC homes typically benefit from twice-yearly cleaning. Properties near busy roads or under tree cover often want a third visit.' },
      { q: 'Will water-fed poles damage my window seals?', a: 'No. Water-fed poles deliver purified water at low pressure with a soft brush head. Far gentler than traditional ladder-and-squeegee work in many cases.' },
      { q: 'Do you handle skylights?', a: 'Yes, where safe access allows. We assess each property individually and let you know what is feasible.' }
    ],
    related: [
      { href: '/residential-pressure-washing/house-washing/', title: 'House Washing', text: 'Pair window cleaning with a soft house wash for a complete exterior refresh.' },
      { href: '/commercial-pressure-washing/window-cleaning/', title: 'Commercial Window Cleaning', text: 'Run a business or strata? Our recurring commercial programmes apply.' },
      { href: '/window-cleaning/', title: 'About Our Window Cleaning', text: 'Background on methods, equipment, and the standards we hold ourselves to.' }
    ],
    review: HOMEPAGE_REVIEWS[2]
  },
  {
    slug: 'driveway-cleaning',
    title: 'Driveway Cleaning &amp; Pressure Washing in Vancouver | Great Canadian Property Services',
    desc: 'Driveway cleaning that removes oil, tire rubber, organic stains, and embedded grime. Restored curb appeal and safer surfaces across Greater Vancouver.',
    h1Pre: 'Curb Appeal Starts', h1Em: 'At the Driveway', tag: 'Driveway Cleaning',
    sub: 'Restorative driveway cleaning that lifts oil, tire rubber, organic growth, and embedded coastal grime. Returns concrete and pavers to their proper finish.',
    heroImg: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80&auto=format',
    heroAlt: 'Pristine residential driveway in evening light',
    splitImg: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80&auto=format',
    splitAlt: 'Clean residential driveway approach',
    splitTag: 'What Builds Up',
    splitHeadPre: 'Driveways Take', splitHeadEm: 'A Beating',
    splitBody: 'Years of tire rubber, oil drips, lawn fertiliser run-off, and organic growth all settle into porous concrete. Surface cleaning lifts what a hose cannot, restoring colour, texture, and the safer footing that comes with a clean surface.',
    features: [
      'Surface cleaner attachment for even, stripe-free results',
      'Spot treatment for oil and rust stains',
      'Safe approach for stamped or coloured concrete',
      'Removes algae and slip hazards along shaded edges'
    ],
    breakImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80&auto=format',
    breakAlt: 'Manicured residential approach',
    processHeading: 'A Driveway Wash<br><em>That Lasts</em>',
    process: [
      { title: 'Inspect', text: 'Note the surface type, damage, problem stains, and adjacent landscaping that needs care.' },
      { title: 'Pre-Treat', text: 'Apply degreasers and organic stain treatments where needed. Allow dwell time.' },
      { title: 'Clean', text: 'Surface cleaner attachment passes for an even finish. Detail work along edges and joints.' },
      { title: 'Rinse', text: 'Final rinse to push residue clear of landscaping. Walk-through inspection with you.' }
    ],
    faqs: [
      { q: 'Will pressure damage my concrete?', a: 'Not when applied correctly. We adjust pressure to the surface and use a surface cleaner attachment that distributes force evenly, avoiding the line marks of a poorly used wand.' },
      { q: 'Can you remove oil stains?', a: 'Most, yes. Old, deep, or large stains may not lift completely without sealing afterward. We will tell you up front what to expect.' },
      { q: 'Do you clean stamped or coloured concrete?', a: 'Yes, with adjusted pressure and approach. We are careful not to lift the stain or remove sealer.' },
      { q: 'Should I seal afterward?', a: 'Often a good idea, especially for stamped concrete and pavers. We offer concrete and paver sealing as a separate service.' }
    ],
    related: [
      { href: '/residential-pressure-washing/concrete-cleaning/', title: 'Concrete Cleaning', text: 'Clean every poured surface beyond the driveway: walkways, porches, and patios.' },
      { href: '/residential-pressure-washing/concrete-paver-sealing/', title: 'Concrete &amp; Paver Sealing', text: 'Lock in your refreshed driveway with a protective seal for years of easy maintenance.' },
      { href: '/residential-pressure-washing/house-washing/', title: 'House Washing', text: 'Pair driveway and house washing for a comprehensive curb appeal reset.' }
    ],
    review: HOMEPAGE_REVIEWS[0]
  },
  {
    slug: 'patio-cleaning',
    title: 'Patio Cleaning &amp; Outdoor Living Care in Vancouver | Great Canadian Property Services',
    desc: 'Patio cleaning for stone, stamped concrete, pavers, and wood. Outdoor living spaces ready for the season across Greater Vancouver.',
    h1Pre: 'Outdoor Rooms,', h1Em: 'Ready for the Season', tag: 'Patio Cleaning',
    sub: 'Tailored patio cleaning for stone, stamped concrete, pavers, and wood. Removes slippery organic growth, restores colour, and prepares the space for summer entertaining.',
    heroImg: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80&auto=format',
    heroAlt: 'Stone patio at twilight with warm interior light',
    splitImg: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200&q=80&auto=format',
    splitAlt: 'Restored residential patio',
    splitTag: 'A Surface-Specific Approach',
    splitHeadPre: 'Every Patio', splitHeadEm: 'Wants Something Different',
    splitBody: 'Stamped concrete, flagstone, brick paver, and wood deck each need their own pressure, technique, and cleaning solution. We assess your patio, choose the right method, and protect any sensitive features along the way.',
    features: [
      'Method matched to surface: stamped concrete, paver, flagstone, wood',
      'Removes slippery organic growth and slimy joints',
      'Surrounding planters, BBQ areas, and furniture protected',
      'Optional sealing scheduled as a follow-up service'
    ],
    breakImg: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&q=80&auto=format',
    breakAlt: 'Outdoor living area in warm afternoon light',
    processHeading: 'A Patio Refresh<br><em>That Reads</em>',
    process: [
      { title: 'Identify', text: 'Confirm material type, joint condition, and any planters or features needing protection.' },
      { title: 'Move', text: 'Relocate furniture, planters, and rugs. Cover anything fixed in place.' },
      { title: 'Clean', text: 'Apply matched cleaning solution and pressure. Detail joints, edges, and step risers by hand.' },
      { title: 'Restore', text: 'Replace furniture, brief you on what we found, recommend any follow-up sealing.' }
    ],
    faqs: [
      { q: 'Do you clean wood decks?', a: 'Yes. Wood needs a softer touch than stone or concrete. We use lower pressure and surface-safe cleaners to lift growth without raising the grain.' },
      { q: 'What about pavers with sand joints?', a: 'We can clean pavers without disturbing the sand if your joints are in good shape. If the sand is degraded, we recommend re-sanding as a follow-up.' },
      { q: 'When is the best time of year?', a: 'Late spring or early summer is ideal so the surface is cleared in time for use. Fall is also a good window after leaves fall.' },
      { q: 'Is it safe for landscaping?', a: 'Yes. We saturate adjacent beds before and after and use plant-considerate solutions.' }
    ],
    related: [
      { href: '/residential-pressure-washing/concrete-paver-sanding/', title: 'Concrete &amp; Paver Sanding', text: 'Stabilise paver joints after cleaning to prevent erosion and weed growth.' },
      { href: '/residential-pressure-washing/concrete-paver-sealing/', title: 'Concrete &amp; Paver Sealing', text: 'Protect the freshly cleaned surface and preserve colour for years.' },
      { href: '/residential-pressure-washing/driveway-cleaning/', title: 'Driveway Cleaning', text: 'Pair driveway and patio for a complete hardscape refresh in one visit.' }
    ],
    review: HOMEPAGE_REVIEWS[0]
  },
  {
    slug: 'concrete-cleaning',
    title: 'Concrete Cleaning in Vancouver &amp; Surrey | Great Canadian Property Services',
    desc: 'Concrete cleaning for walkways, porches, patios, and poured surfaces. Removes stains, organic growth, and embedded grime across Greater Vancouver.',
    h1Pre: 'Concrete That Reads', h1Em: 'New Again', tag: 'Concrete Cleaning',
    sub: 'Professional-grade concrete cleaning for walkways, porches, garage aprons, and poured patios. Lifts stains, organic growth, and embedded grime that a hose simply cannot reach.',
    heroImg: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80&auto=format',
    heroAlt: 'Restored concrete entry walkway',
    splitImg: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80&auto=format',
    splitAlt: 'Detail of restored poured concrete',
    splitTag: 'What We Address',
    splitHeadPre: 'Concrete Holds On to', splitHeadEm: 'Everything It Touches',
    splitBody: 'Porous by nature, concrete absorbs oil, fertiliser, leaf tannin, and the algae that thrives in coastal BC shade. Surface cleaning equipment, the right cleaning solution, and a steady hand return the surface to its original tone.',
    features: [
      'Surface cleaner attachment for even, line-free results',
      'Spot treatment for oil, rust, and organic stains',
      'Safe for residential, commercial, and strata properties',
      'Detail work along step risers, joints, and approach edges'
    ],
    breakImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80&auto=format',
    breakAlt: 'Clean residential approach in afternoon light',
    processHeading: 'Concrete Care<br><em>The Way It Should Be Done</em>',
    process: [
      { title: 'Walk', text: 'Identify problem stains, surface condition, and adjacent landscaping needing protection.' },
      { title: 'Pre-Treat', text: 'Apply degreasers, rust removers, and organic treatments where needed. Dwell time.' },
      { title: 'Clean', text: 'Even surface-cleaner passes. Detail edges and joints by hand. No tiger striping.' },
      { title: 'Rinse', text: 'Final rinse to flush residue from landscaping. Inspection walk-through.' }
    ],
    faqs: [
      { q: 'Why hire a professional for concrete?', a: 'A consumer-grade pressure washer leaves uneven stripes and rarely lifts embedded grime. Professional surface cleaners apply consistent pressure across the surface for an even finish.' },
      { q: 'Can you remove rust stains?', a: 'Most, yes. Old or deep rust may not lift completely without specialised treatment. We will tell you up front what to expect.' },
      { q: 'Will the concrete look uniformly new?', a: 'Cleaning lifts the dirt, but old concrete will show its age and any prior staining. For uniform colour, we recommend cleaning and then sealing.' },
      { q: 'Should I seal after cleaning?', a: 'Often a good idea. Sealing extends results and protects against new staining. We offer concrete and paver sealing as a separate service.' }
    ],
    related: [
      { href: '/residential-pressure-washing/driveway-cleaning/', title: 'Driveway Cleaning', text: 'Driveways are the most-used concrete on most properties. Worth doing well.' },
      { href: '/residential-pressure-washing/concrete-paver-sealing/', title: 'Concrete &amp; Paver Sealing', text: 'Lock in your clean surface and protect against new staining.' },
      { href: '/residential-pressure-washing/concrete-paver-sanding/', title: 'Concrete &amp; Paver Sanding', text: 'For paver installations, restore lost joint sand to stabilise the surface.' }
    ],
    review: HOMEPAGE_REVIEWS[0]
  },
  {
    slug: 'concrete-paver-sanding',
    title: 'Concrete &amp; Paver Sanding in Vancouver | Great Canadian Property Services',
    desc: 'Paver re-sanding services to stabilise joints, deter weeds, and prevent erosion. Restore your paver installation across Greater Vancouver.',
    h1Pre: 'Stable Joints,', h1Em: 'Steady Pavers', tag: 'Paver Sanding',
    sub: 'Re-sanding for paver installations that have lost joint material to time, rain, or pressure washing. Restores the stability and weed resistance that a fresh installation provides.',
    heroImg: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1920&q=80&auto=format',
    heroAlt: 'Detail of paver installation joints',
    splitImg: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80&auto=format',
    splitAlt: 'Pristine paver walkway',
    splitTag: 'Why It Matters',
    splitHeadPre: 'Paver Sand Is the', splitHeadEm: 'Quiet Foundation',
    splitBody: 'Joint sand stabilises pavers, deters weed growth, prevents insect intrusion, and lets the installation flex with seasonal movement. As it washes out over the years, pavers shift and weeds appear. Re-sanding is the unglamorous step that restores everything that quiet foundation does.',
    features: [
      'Polymeric sand for permanent joint stability',
      'Conventional joint sand where the design calls for it',
      'Pre-clean to prepare the joint before re-sanding',
      'Weed and erosion resistance once cured'
    ],
    breakImg: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80&auto=format',
    breakAlt: 'Patio paver installation',
    processHeading: 'Re-Sanding<br><em>That Sets and Stays</em>',
    process: [
      { title: 'Clean', text: 'Pressure wash the surface to clear the existing degraded joints completely.' },
      { title: 'Dry', text: 'Allow surface to dry fully before applying new sand. Dry sand sets clean.' },
      { title: 'Sweep', text: 'Sweep polymeric sand into joints. Vibrate or compact as needed for full settlement.' },
      { title: 'Activate', text: 'Light water mist activates the polymer binder. Sand cures hard, weed-resistant, and stable.' }
    ],
    faqs: [
      { q: 'How long does polymeric sand last?', a: 'Properly installed polymeric sand lasts 10 years or more. Re-sanding sooner is occasionally needed in heavy-traffic or freeze-thaw conditions.' },
      { q: 'Will weeds come back?', a: 'Polymeric sand significantly reduces weed growth in joints, but no joint material eliminates it forever. Routine cleaning and topping up extend results.' },
      { q: 'Can pavers be cleaned without losing sand?', a: 'Sometimes, with careful technique. If your joints are already degraded, cleaning will likely require re-sanding afterward.' },
      { q: 'Should I seal after sanding?', a: 'Often a good idea. Paver sealing locks in colour, protects against staining, and extends the life of the joint material.' }
    ],
    related: [
      { href: '/residential-pressure-washing/concrete-paver-sealing/', title: 'Concrete &amp; Paver Sealing', text: 'Pair sanding with sealing to lock in joints and protect surface colour.' },
      { href: '/residential-pressure-washing/patio-cleaning/', title: 'Patio Cleaning', text: 'Re-sanding usually follows a thorough cleaning. Often bundled together.' },
      { href: '/residential-pressure-washing/driveway-cleaning/', title: 'Driveway Cleaning', text: 'Paver driveways benefit from the same cleaning and sanding cycle.' }
    ],
    review: HOMEPAGE_REVIEWS[0]
  },
  {
    slug: 'concrete-paver-sealing',
    title: 'Concrete &amp; Paver Sealing in Vancouver | Great Canadian Property Services',
    desc: 'Concrete and paver sealing for Greater Vancouver homes. Protective barrier against UV, moisture, staining, and organic growth. Preserves colour for years.',
    h1Pre: 'Protect What', h1Em: 'You Just Restored', tag: 'Concrete &amp; Paver Sealing',
    sub: 'Sealing creates a protective barrier against UV, moisture, staining, and organic growth. The unglamorous step that quietly extends every hardscape surface\'s usable life.',
    heroImg: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1920&q=80&auto=format',
    heroAlt: 'Sealed paver patio with deep colour',
    splitImg: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80&auto=format',
    splitAlt: 'Sealed concrete walkway',
    splitTag: 'What Sealing Does',
    splitHeadPre: 'A Barrier Against', splitHeadEm: 'What the Coast Throws',
    splitBody: 'Salty sea air, lush organic growth, harsh UV in summer, and steady rain the rest of the year. Sealing concrete and pavers gives the surface a wear layer that absorbs the abuse instead of letting your hardscape do it. The result is colour, texture, and structural integrity preserved.',
    features: [
      'Penetrating sealers for natural matte finish',
      'Topical sealers for enhanced colour and gloss',
      'Joint stabilisation for paver installations',
      'Water beading and stain resistance from day one'
    ],
    breakImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80&auto=format',
    breakAlt: 'Sealed approach in golden afternoon light',
    processHeading: 'Sealing<br><em>That Holds Up</em>',
    process: [
      { title: 'Clean', text: 'Pressure wash the surface thoroughly. Sealer must go on a clean, dry substrate.' },
      { title: 'Dry', text: 'Allow surface to dry completely. Trapped moisture is the most common sealing failure.' },
      { title: 'Apply', text: 'Even application of matched sealer for the surface and finish you want.' },
      { title: 'Cure', text: 'Cure time before foot or vehicle traffic. We brief you on the exact schedule before we leave.' }
    ],
    faqs: [
      { q: 'How long does sealer last?', a: 'Most penetrating sealers last 3 to 5 years on residential surfaces. Topical sealers vary by traffic and exposure. We help you choose based on your priorities.' },
      { q: 'Will it change the colour?', a: 'Penetrating sealers leave a natural look. Topical sealers can deepen and enrich colour. We bring samples and explain what each will do for your specific surface.' },
      { q: 'Do I need to seal new pavers?', a: 'Wait at least 60 days for new pavers to cure before sealing. After that, sealing is one of the best ways to preserve them.' },
      { q: 'Can I walk on it the same day?', a: 'Cure times vary by sealer. Foot traffic is usually fine within 24 hours. Vehicle traffic typically waits 48 to 72.' }
    ],
    related: [
      { href: '/residential-pressure-washing/concrete-cleaning/', title: 'Concrete Cleaning', text: 'Always step one before sealing. Clean concrete seals properly and lasts longer.' },
      { href: '/residential-pressure-washing/concrete-paver-sanding/', title: 'Concrete &amp; Paver Sanding', text: 'Re-sand paver joints before sealing for the most durable result.' },
      { href: '/residential-pressure-washing/patio-cleaning/', title: 'Patio Cleaning', text: 'Patios are the most common sealing candidate. Outdoor rooms protected for years.' }
    ],
    review: HOMEPAGE_REVIEWS[0]
  }
];

function buildResidentialServicePage(s) {
  const canonical = `${SITE_URL}/${RES_PARENT}/${s.slug}/`;
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Residential', path: RES_HUB },
    { name: s.tag }
  ];
  const breadcrumbsForSchema = [
    { name: 'Home', url: SITE_URL + '/' },
    { name: 'Residential', url: SITE_URL + RES_HUB },
    { name: s.tag, url: canonical }
  ];

  const body = [
    pageHero({ tag: s.tag, h1Pre: s.h1Pre, h1Em: s.h1Em, sub: s.sub, image: s.heroImg, alt: s.heroAlt, breadcrumbs }),
    splitIntro({ image: s.splitImg, alt: s.splitAlt, tag: s.splitTag, headPre: s.splitHeadPre, headEm: s.splitHeadEm, body: s.splitBody, features: s.features, sec: 'section--charcoal' }),
    imageBreak({ src: s.breakImg, alt: s.breakAlt }),
    processSection({ heading: s.processHeading, steps: s.process }),
    reviewsSection({ heading: '<em>Trusted</em> by Greater Vancouver Homes', reviews: [s.review], sec: 'section--warm' }),
    areasSection(),
    faqSection({ heading: `<em>${s.tag}</em> FAQs`, faqs: s.faqs }),
    relatedServicesSection({ heading: 'Care for the<br><em>Whole Property</em>', items: s.related }),
    finalCTA()
  ].join('\n\n');

  return pageWrap({
    title: s.title,
    desc: s.desc,
    canonical,
    image: s.heroImg.replace('w=1920', 'w=1200'),
    extraSchemas: [
      localBusinessSchema(),
      serviceSchema({ name: s.tag, slug: s.slug, parent: RES_PARENT }),
      breadcrumbSchema(breadcrumbsForSchema),
      faqSchema(s.faqs)
    ],
    body
  });
}

console.log('\n[Batch B] Residential service pages...');
for (const s of residentialServices) {
  write(`${RES_PARENT}/${s.slug}/index.html`, buildResidentialServicePage(s));
}

// ═════════════════════════════════════════════════════════════════════════════
// COMMERCIAL SERVICE PAGES (5)
// ═════════════════════════════════════════════════════════════════════════════

const COM_PARENT = 'commercial-pressure-washing';
const COM_HUB = `/${COM_PARENT}/`;

const commercialServices = [
  {
    slug: 'building-washing',
    title: 'Commercial Building Washing in Vancouver | Great Canadian Property Services',
    desc: 'Soft-wash and pressure-wash care for office buildings, retail centres, and strata complexes across Greater Vancouver. Recurring programmes available.',
    h1Pre: 'Facades Worth', h1Em: 'Looking At', tag: 'Building Washing',
    sub: 'Comprehensive exterior care for office buildings, retail centres, strata complexes, and mixed-use properties. Maintained at the standard your tenants and clients expect.',
    heroImg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80&auto=format',
    heroAlt: 'Premium commercial building facade',
    splitImg: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&q=80&auto=format',
    splitAlt: 'Modern commercial property exterior',
    splitTag: 'For Owners and Managers',
    splitHeadPre: 'A Programme', splitHeadEm: 'Not Just a Visit',
    splitBody: 'One-time washes have their place, but most commercial properties benefit from a recurring programme that protects the building envelope and keeps presentation consistent year-round. We design schedules to minimise disruption to tenants and operations.',
    features: [
      'Soft wash for delicate cladding and signage',
      'Pressure wash for hardscape and durable surfaces',
      'After-hours and weekend scheduling available',
      'COI, WCB coverage, and detailed reporting on file'
    ],
    breakImg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80&auto=format',
    breakAlt: 'Office building exterior at sunset',
    processHeading: 'A Building Wash<br><em>Run Like a Programme</em>',
    process: [
      { title: 'Site Walk', text: 'Identify cladding types, problem areas, access constraints, and tenant impact considerations.' },
      { title: 'Programme', text: 'Design a recurring or one-time scope. Confirm schedule, scope, and reporting requirements.' },
      { title: 'Execute', text: 'Soft wash and pressure wash per surface. Discreet operation around tenants and customers.' },
      { title: 'Report', text: 'Documented results and any flagged maintenance items for your file.' }
    ],
    faqs: [
      { q: 'Do you carry commercial insurance?', a: 'Yes. WCB coverage and commercial liability insurance with COI available on request.' },
      { q: 'Can you work after hours?', a: 'Yes. Many commercial properties prefer evening or weekend service to avoid tenant or customer disruption. We accommodate.' },
      { q: 'Do you handle multi-building strata?', a: 'Yes. We manage multi-building strata programmes with consolidated invoicing and a single point of contact.' },
      { q: 'How often should a commercial building be washed?', a: 'Most commercial properties benefit from twice-yearly washing. High-traffic retail or properties under heavy tree cover often need more.' }
    ],
    related: [
      { href: '/commercial-pressure-washing/window-cleaning/', title: 'Commercial Window Cleaning', text: 'Recurring storefront and multi-storey programmes that keep glass consistently clean.' },
      { href: '/commercial-pressure-washing/gutter-cleaning/', title: 'Gutter Cleaning', text: 'Clear gutters protect the building envelope and prevent costly water damage.' },
      { href: '/commercial-pressure-washing/industrial-pressure-washing/', title: 'Industrial Pressure Washing', text: 'Heavy-duty cleaning for warehouses, loading docks, and manufacturing.' }
    ],
    review: HOMEPAGE_REVIEWS[2]
  },
  {
    slug: 'window-cleaning',
    title: 'Commercial Window Cleaning in Vancouver | Great Canadian Property Services',
    desc: 'Recurring commercial window cleaning programmes for storefronts, office towers, and strata complexes across Greater Vancouver.',
    h1Pre: 'Glass That Stays', h1Em: 'Consistently Clean', tag: 'Commercial Window Cleaning',
    sub: 'Recurring window cleaning programmes for storefronts, office buildings, multi-storey commercial, and strata complexes. Set the cadence, we handle the rest.',
    heroImg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80&auto=format',
    heroAlt: 'Multi-storey office building glass facade',
    splitImg: 'https://images.unsplash.com/photo-1577415124269-fc1140a69e91?w=1200&q=80&auto=format',
    splitAlt: 'Commercial storefront with clean glass',
    splitTag: 'A Subscription, Not a Service Call',
    splitHeadPre: 'Set It Up Once,', splitHeadEm: 'Stop Thinking About It',
    splitBody: 'Most commercial properties get window cleaning when someone notices it has been a while. A subscription programme inverts that: regular visits at a cadence that fits your property type, with consistent results that never let glass get bad enough to notice.',
    features: [
      'Weekly, biweekly, monthly, or quarterly cadence',
      'Water-fed pole for upper storeys, squeegee for ground floor',
      'After-hours scheduling for retail and restaurant clients',
      'Single invoice across multiple sites if needed'
    ],
    breakImg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80&auto=format',
    breakAlt: 'Office tower at dusk',
    processHeading: 'A Recurring Programme<br><em>Built Around Your Property</em>',
    process: [
      { title: 'Site Walk', text: 'Confirm scope, access constraints, glass type, and tenant or customer flow considerations.' },
      { title: 'Cadence', text: 'Recommend a cleaning frequency based on traffic, exposure, and your standard of presentation.' },
      { title: 'Schedule', text: 'Lock in dates that work for your operation. Reminder notifications before each visit.' },
      { title: 'Maintain', text: 'Consistent visits, consistent crews, consistent results. One invoice on a schedule you control.' }
    ],
    faqs: [
      { q: 'How frequent should commercial window cleaning be?', a: 'Storefronts often want monthly or biweekly. Office buildings typically work on a quarterly cycle. We recommend based on your specific property and standards.' },
      { q: 'Can you reach high glass?', a: 'Yes. Water-fed pole systems handle most multi-storey commercial up to four or five floors safely from the ground. Higher buildings may require lift access, which we coordinate.' },
      { q: 'Do you carry commercial insurance?', a: 'Yes. WCB coverage and commercial liability insurance with COI available on request.' },
      { q: 'Can you handle multiple sites?', a: 'Yes. We run programmes across portfolios with consolidated scheduling and invoicing.' }
    ],
    related: [
      { href: '/commercial-pressure-washing/building-washing/', title: 'Building Washing', text: 'Combine glass and facade care for a complete recurring programme.' },
      { href: '/residential-pressure-washing/window-cleaning/', title: 'Residential Window Cleaning', text: 'Run a home-based business or live above the shop? Residential window care available.' },
      { href: '/window-cleaning/', title: 'Our Window Cleaning Approach', text: 'Background on our methods, equipment, and the standards we hold.' }
    ],
    review: HOMEPAGE_REVIEWS[2]
  },
  {
    slug: 'fleet-washing',
    title: 'Fleet Washing in Vancouver | Great Canadian Property Services',
    desc: 'Scheduled fleet washing for company vehicles, delivery trucks, service fleets, and heavy equipment across Greater Vancouver.',
    h1Pre: 'Brand Image,', h1Em: 'On the Road', tag: 'Fleet Washing',
    sub: 'Scheduled exterior care for company vehicles, delivery trucks, service fleets, and heavy equipment. Your brand image stays sharp wherever it shows up.',
    heroImg: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920&q=80&auto=format',
    heroAlt: 'Commercial fleet vehicles in a depot',
    splitImg: 'https://images.unsplash.com/photo-1592805144716-feeccccef5ac?w=1200&q=80&auto=format',
    splitAlt: 'Clean delivery truck',
    splitTag: 'For Operations Managers',
    splitHeadPre: 'Clean Vehicles,', splitHeadEm: 'On Your Schedule',
    splitBody: 'A clean fleet makes drivers proud, customers more confident, and your brand more visible. We come to your depot or yard on a recurring schedule, work around shift changes, and keep your fleet looking professional without taking trucks out of service.',
    features: [
      'On-site service at your yard or depot',
      'Scheduled around shift changes and operational windows',
      'Light-duty service vehicles to heavy equipment',
      'Eco-conscious cleaning solutions and water reclamation where required'
    ],
    breakImg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80&auto=format',
    breakAlt: 'Commercial property at dusk',
    processHeading: 'Fleet Washing<br><em>That Fits Your Operation</em>',
    process: [
      { title: 'Walk', text: 'Tour your yard or depot. Confirm vehicle types, access, water source, and timing constraints.' },
      { title: 'Schedule', text: 'Build a recurring cadence around shift changes and operational windows. Weekend and overnight available.' },
      { title: 'Wash', text: 'Pressure wash and brush per vehicle. Detail attention on logos, signage, and high-visibility surfaces.' },
      { title: 'Report', text: 'Vehicle counts, completion confirmations, and any flagged maintenance items.' }
    ],
    faqs: [
      { q: 'Do you come to our yard?', a: 'Yes. On-site service is the norm. We bring everything we need including water if your site lacks a suitable connection.' },
      { q: 'How often should a fleet be washed?', a: 'Depends on use, environment, and brand standards. Many fleets work on a weekly or biweekly cadence. Service vehicles in muddy conditions may need more.' },
      { q: 'Can you handle heavy equipment?', a: 'Yes. Heavy equipment, construction vehicles, and industrial machinery all welcome. Right tools for each.' },
      { q: 'What about water reclamation?', a: 'For sensitive sites or properties with stormwater regulations, we set up reclamation systems to capture and dispose of wash water properly.' }
    ],
    related: [
      { href: '/commercial-pressure-washing/industrial-pressure-washing/', title: 'Industrial Pressure Washing', text: 'Heavy-duty cleaning for the rest of your operation: yards, docks, equipment.' },
      { href: '/commercial-pressure-washing/building-washing/', title: 'Building Washing', text: 'Care for the buildings your fleet calls home.' },
      { href: '/commercial-pressure-washing/', title: 'All Commercial Services', text: 'Browse the full set of commercial offerings.' }
    ],
    review: HOMEPAGE_REVIEWS[2]
  },
  {
    slug: 'gutter-cleaning',
    title: 'Commercial Gutter Cleaning in Vancouver | Great Canadian Property Services',
    desc: 'Commercial gutter cleaning across Greater Vancouver. Protect the building envelope, prevent water damage, and keep exteriors brightened.',
    h1Pre: 'Clear Gutters,', h1Em: 'Protected Buildings', tag: 'Gutter Cleaning',
    sub: 'Thorough gutter clearing and exterior brightening for commercial and strata properties. Protects the building envelope from water intrusion and improves overall presentation.',
    heroImg: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1920&q=80&auto=format',
    heroAlt: 'Commercial roofline and gutters',
    splitImg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80&auto=format',
    splitAlt: 'Commercial building exterior',
    splitTag: 'Why It Matters',
    splitHeadPre: 'Clogged Gutters', splitHeadEm: 'Cause Real Damage',
    splitBody: 'Pooled water, breached gutters, ice damming, and foundation seepage all start with debris-clogged drainage. Routine clearing is one of the lowest-cost maintenance items on a commercial property, and it prevents some of the most expensive repairs.',
    features: [
      'Full gutter clearing including downspouts',
      'Exterior gutter brightening to remove streaking',
      'Inspection report flagging any maintenance concerns',
      'Recurring programmes available, fall priority'
    ],
    breakImg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80&auto=format',
    breakAlt: 'Commercial building roofline',
    processHeading: 'Gutter Cleaning<br><em>That Protects the Building</em>',
    process: [
      { title: 'Inspect', text: 'Confirm gutter type, downspout outlets, access requirements, and any visible damage.' },
      { title: 'Clear', text: 'Remove all debris by hand or with appropriate equipment. Bag and remove from site.' },
      { title: 'Flow Test', text: 'Run water through the system to confirm flow and identify any blockages or breaches.' },
      { title: 'Brighten', text: 'Optional exterior gutter brightening to remove streaking and restore appearance.' }
    ],
    faqs: [
      { q: 'How often should commercial gutters be cleaned?', a: 'Most properties benefit from twice-yearly cleaning, fall and spring. Properties under heavy tree cover may need more.' },
      { q: 'Do you clean rainwater leaders and downspouts?', a: 'Yes. Downspout clearing is included. Underground drains may require specialised equipment, which we coordinate if needed.' },
      { q: 'What about gutter guards?', a: 'We can clean over and around most guard systems and flag any that are restricting flow.' },
      { q: 'Do you provide a report?', a: 'Yes. Photos, completion confirmation, and any maintenance items flagged for your records.' }
    ],
    related: [
      { href: '/commercial-pressure-washing/building-washing/', title: 'Building Washing', text: 'Pair gutter clearing with building washing for a complete envelope refresh.' },
      { href: '/commercial-pressure-washing/window-cleaning/', title: 'Commercial Window Cleaning', text: 'Recurring glass programmes that keep storefronts and offices presentable.' },
      { href: '/commercial-pressure-washing/', title: 'All Commercial Services', text: 'Browse the full set of commercial offerings.' }
    ],
    review: HOMEPAGE_REVIEWS[2]
  },
  {
    slug: 'industrial-pressure-washing',
    title: 'Industrial Pressure Washing in Vancouver | Great Canadian Property Services',
    desc: 'Heavy-duty industrial pressure washing for warehouses, loading docks, manufacturing facilities, and industrial yards across Greater Vancouver.',
    h1Pre: 'Heavy-Duty', h1Em: 'Properly Done', tag: 'Industrial Pressure Washing',
    sub: 'Pressure washing for warehouses, loading docks, manufacturing facilities, and industrial yards. The right pressure, the right chemistry, the right outcome for environments most contractors avoid.',
    heroImg: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=1920&q=80&auto=format',
    heroAlt: 'Industrial facility exterior',
    splitImg: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&q=80&auto=format',
    splitAlt: 'Loading dock and warehouse exterior',
    splitTag: 'Industrial Settings',
    splitHeadPre: 'Tougher Surfaces,', splitHeadEm: 'Steeper Standards',
    splitBody: 'Industrial facilities deal with grease, oil, hydraulic fluid, rubber, and the kind of buildup that residential equipment cannot touch. Hot-water pressure washing, industrial-grade chemistry, and the experience to know what each surface can take produce results without damaging the substrate.',
    features: [
      'Hot-water pressure washing for grease and oil',
      'Concrete cleaning for warehouses, docks, and yards',
      'Equipment and machinery cleaning where appropriate',
      'WCB-compliant operation, COI available on request'
    ],
    breakImg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80&auto=format',
    breakAlt: 'Industrial property exterior',
    processHeading: 'Industrial Cleaning<br><em>Without Damaging Operations</em>',
    process: [
      { title: 'Site Walk', text: 'Identify surfaces, contaminants, environmental constraints, and operational windows.' },
      { title: 'Plan', text: 'Recommend chemistry, equipment, and timing. Coordinate with safety and operations leads.' },
      { title: 'Execute', text: 'Hot-water pressure washing and pre-treatments per surface. Reclamation where required.' },
      { title: 'Report', text: 'Documented results and any flagged maintenance items for your file.' }
    ],
    faqs: [
      { q: 'Can you handle stormwater compliance?', a: 'Yes. For sensitive sites or municipalities with strict stormwater rules, we set up reclamation systems to capture and dispose of wash water properly.' },
      { q: 'Do you work after hours?', a: 'Yes. Industrial sites often prefer overnight or weekend work to avoid disrupting operations. We accommodate.' },
      { q: 'What kind of equipment do you bring?', a: 'Hot-water pressure washers, surface cleaners, industrial-grade chemistry, lift access where needed, and reclamation equipment when required.' },
      { q: 'Do you carry adequate insurance?', a: 'Yes. WCB coverage and commercial liability insurance with COI available. We can also satisfy specific contractor pre-qualification requirements.' }
    ],
    related: [
      { href: '/commercial-pressure-washing/fleet-washing/', title: 'Fleet Washing', text: 'Vehicles deserve the same care as the yard they operate from.' },
      { href: '/commercial-pressure-washing/building-washing/', title: 'Building Washing', text: 'Industrial facilities still need their facades cared for. Soft wash where appropriate.' },
      { href: '/commercial-pressure-washing/', title: 'All Commercial Services', text: 'Browse the full set of commercial offerings.' }
    ],
    review: HOMEPAGE_REVIEWS[2]
  }
];

function buildCommercialServicePage(s) {
  const canonical = `${SITE_URL}/${COM_PARENT}/${s.slug}/`;
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Commercial', path: COM_HUB },
    { name: s.tag }
  ];
  const breadcrumbsForSchema = [
    { name: 'Home', url: SITE_URL + '/' },
    { name: 'Commercial', url: SITE_URL + COM_HUB },
    { name: s.tag, url: canonical }
  ];

  const body = [
    pageHero({ tag: s.tag, h1Pre: s.h1Pre, h1Em: s.h1Em, sub: s.sub, image: s.heroImg, alt: s.heroAlt, breadcrumbs }),
    splitIntro({ image: s.splitImg, alt: s.splitAlt, tag: s.splitTag, headPre: s.splitHeadPre, headEm: s.splitHeadEm, body: s.splitBody, features: s.features, sec: 'section--warm' }),
    imageBreak({ src: s.breakImg, alt: s.breakAlt }),
    processSection({ heading: s.processHeading, steps: s.process }),
    reviewsSection({ tag: 'From a Strata Manager', heading: '<em>Reliable</em> Commercial Partner', reviews: [s.review], sec: 'section--charcoal' }),
    areasSection(),
    faqSection({ heading: `<em>${s.tag}</em> FAQs`, faqs: s.faqs }),
    relatedServicesSection({ heading: 'Round Out the<br><em>Commercial Programme</em>', items: s.related, sec: 'section--warm' }),
    finalCTA({ heading: 'Build a <em>Programme</em> That Fits' })
  ].join('\n\n');

  return pageWrap({
    title: s.title,
    desc: s.desc,
    canonical,
    image: s.heroImg.replace('w=1920', 'w=1200'),
    extraSchemas: [
      localBusinessSchema(),
      serviceSchema({ name: s.tag, slug: s.slug, parent: COM_PARENT }),
      breadcrumbSchema(breadcrumbsForSchema),
      faqSchema(s.faqs)
    ],
    body
  });
}

console.log('\n[Batch C] Commercial service pages...');
for (const s of commercialServices) {
  write(`${COM_PARENT}/${s.slug}/index.html`, buildCommercialServicePage(s));
}

// ═════════════════════════════════════════════════════════════════════════════
// TOP-LEVEL SERVICES (Christmas Lighting, Window Cleaning) — written separately
// ═════════════════════════════════════════════════════════════════════════════
//   These are big enough they get their own files. See generate-top-level.mjs.

console.log('\nDone. Run generate-others.mjs for locations, articles, utilities, sitemap.');
