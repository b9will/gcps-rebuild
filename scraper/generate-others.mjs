/* GCPS Part 2 generator — top-level services, locations, articles, utilities, sitemap.
   Run: node scraper/generate-others.mjs
*/

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SITE = path.join(ROOT, 'site');

const SITE_URL = 'https://www.greatcanadianpropertyservices.ca';
const PHONE = '604-260-6285';
const PHONE_TEL = '6042606285';
const EMAIL = 'info@greatcanadianpropertyservices.ca';
const ADDR = '112-15428 31 Ave';
const CITY = 'Surrey';
const REGION = 'BC';
const POST = 'V3Z 3W4';
const BUSINESS_ID = `${SITE_URL}/#business`;
const TODAY = '2026-04-26';

const CITIES = [
  { slug: 'vancouver', name: 'Vancouver', lat: 49.2827, lng: -123.1207, blurb: 'From West Side heritage to East Vancouver craftsman, every era and material we work with shows up across the city.', notes: 'Coastal climate, salt air off English Bay, mature trees citywide, and a mix of heritage stucco and modern Hardie call for technique that respects each surface.' },
  { slug: 'surrey', name: 'Surrey', lat: 49.1913, lng: -122.8490, blurb: 'Our home base. South Surrey, Cloverdale, Fleetwood, Guildford, and everywhere in between.', notes: 'A wide spread of neighbourhoods means a wide spread of property types: estate homes in South Surrey, townhomes in Clayton Heights, and commercial along King George.' },
  { slug: 'richmond', name: 'Richmond', lat: 49.1666, lng: -123.1336, blurb: 'Coastal humidity, mature trees, and a mix of low-rise residential and commercial.', notes: 'Properties from Steveston to Terra Nova share one constant: coastal moisture that grows algae fast on the shaded side of every building.' },
  { slug: 'coquitlam', name: 'Coquitlam', lat: 49.2838, lng: -122.7932, blurb: 'Tri-Cities residential and strata work from the Fraser to the slopes of Burke Mountain.', notes: 'Heavy tree cover and elevation swings mean roofs work hard. Annual gutter clearing and routine roof care matter more here than in flatter neighbourhoods.' },
  { slug: 'delta', name: 'Delta', lat: 49.0847, lng: -123.0586, blurb: 'Tsawwassen, Ladner, and North Delta. Coastal wind, salt air, and Fraser River flats.', notes: 'Wind-driven salt and dust accumulate quickly on south- and west-facing surfaces. Routine washing keeps cladding and windows from etching prematurely.' },
  { slug: 'langley', name: 'Langley', lat: 49.1042, lng: -122.6604, blurb: 'From Walnut Grove acreage to Willoughby townhomes.', notes: 'Acreage properties bring mossy roofs and long driveways. Townhome developments bring shared exterior care that benefits from coordination.' },
  { slug: 'maple-ridge', name: 'Maple Ridge', lat: 49.2193, lng: -122.5984, blurb: 'Properties tucked along the Fraser and the foot of the Coast Mountains.', notes: 'Mossy roofs are a standing feature. Routine soft-wash treatment is one of the highest-value maintenance items for most homes here.' },
  { slug: 'north-vancouver', name: 'North Vancouver', lat: 49.3163, lng: -123.0755, blurb: 'North Shore exterior care built for moss, rain, and mountain proximity.', notes: 'The North Shore receives more rainfall than most of Greater Vancouver. Roofs, decks, and concrete all benefit from a more frequent care cycle.' },
  { slug: 'west-vancouver', name: 'West Vancouver', lat: 49.3343, lng: -123.1622, blurb: 'Discreet, meticulous exterior maintenance for waterfront homes and West Van estates.', notes: 'High-end properties on tight, winding streets call for crews that work quietly, leave no trace, and respect mature landscaping and architectural detail.' },
  { slug: 'white-rock', name: 'White Rock', lat: 49.0254, lng: -122.8030, blurb: 'Bluff homes and Marine Drive storefronts.', notes: 'Salt air is the defining factor. Window cleaning, glass railings, and exterior wash cycles all run more frequently than in inland communities.' },
  { slug: 'abbotsford', name: 'Abbotsford', lat: 49.0504, lng: -122.3045, blurb: 'Residential and agricultural exterior care across the heart of the Fraser Valley.', notes: 'A mix of suburban residential and agricultural properties. Pollen, dust, and farm activity all show up on cladding and windows.' },
  { slug: 'chilliwack', name: 'Chilliwack', lat: 49.1579, lng: -121.9514, blurb: 'Eastern valley exterior care for homes, farms, and commercial.', notes: 'Agricultural neighbours, riverfront properties, and a wider seasonal swing than the coast. Surfaces benefit from a fall and spring cycle.' },
  { slug: 'squamish', name: 'Squamish', lat: 49.7016, lng: -123.1558, blurb: 'Sea to Sky exterior maintenance for coastal mountain homes.', notes: 'High winds drive rain horizontally into siding seams. Annual house washing and gutter clearing are not optional in this climate.' },
  { slug: 'whistler', name: 'Whistler', lat: 50.1163, lng: -122.9574, blurb: 'Mountain residences and chalets.', notes: 'Year-round exterior care including snow-season window cleaning. Cedar shake roofs, log siding, and timber-frame structures all want surface-specific technique.' }
];

// ── Boilerplate fragments ────────────────────────────────────────────────────
const NAV_HTML = `<nav class="nav nav--solid" id="nav"><div class="nav__inner"><a href="/" class="nav__logo" aria-label="Great Canadian Property Services — home"><img src="/assets/img/logo-lockup-light.svg" class="nav__logo-full" alt="Great Canadian Property Services"><img src="/assets/img/logo-mark.svg" class="nav__logo-mark" alt=""></a><div class="nav__actions"><a href="/contact-us/" class="nav__cta">Get Assessment</a><button class="nav__hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button></div></div></nav>
<div class="drawer-overlay" id="drawerOverlay"></div>
<div class="mobile-drawer" id="mobileDrawer"><a href="/residential-pressure-washing/" class="drawer-link">Residential</a><a href="/commercial-pressure-washing/" class="drawer-link">Commercial</a><a href="/residential-pressure-washing/concrete-cleaning/" class="drawer-link">Concrete Care</a><a href="/window-cleaning/" class="drawer-link">Window Cleaning</a><a href="/christmas-lighting/" class="drawer-link">Holiday Lighting</a><a href="/near-me/" class="drawer-link">Service Areas</a><a href="/reviews/" class="drawer-link">Reviews</a><a href="/pressure-washing-articles/" class="drawer-link">Articles</a><a href="/faq/" class="drawer-link">FAQ</a><a href="/about-us/" class="drawer-link">About Us</a><a href="/contact-us/" class="mobile-drawer__cta drawer-link">Request Assessment</a><a href="tel:${PHONE_TEL}" class="mobile-drawer__phone drawer-link">${PHONE}</a></div>`;

const FOOTER_HTML = `<footer class="footer"><div class="container"><div class="footer__grid"><div class="footer__brand"><div class="footer__brand-name">Great Canadian <span>Property Services</span></div><p>Vancouver's premier property care provider. Expert pressure washing, window cleaning, exterior maintenance, and custom holiday lighting for the finest homes and commercial properties across the Lower Mainland.</p><p style="margin-top:.85rem;">${ADDR}<br>${CITY}, ${REGION} ${POST}<br><a href="tel:${PHONE_TEL}" style="color:var(--copper);">${PHONE}</a><br><a href="mailto:${EMAIL}" style="color:var(--copper);">${EMAIL}</a></p></div><div><h4 class="footer__heading">Services</h4><a href="/residential-pressure-washing/house-washing/" class="footer__link">House Washing</a><a href="/residential-pressure-washing/roof-cleaning/" class="footer__link">Roof Cleaning</a><a href="/window-cleaning/" class="footer__link">Window Cleaning</a><a href="/residential-pressure-washing/concrete-cleaning/" class="footer__link">Concrete &amp; Paver Care</a><a href="/commercial-pressure-washing/" class="footer__link">Commercial Services</a><a href="/christmas-lighting/" class="footer__link">Holiday Lighting</a></div><div><h4 class="footer__heading">Service Areas</h4><a href="/near-me/vancouver-bc-pressure-washing/" class="footer__link">Vancouver</a><a href="/near-me/surrey-bc-pressure-washing/" class="footer__link">Surrey</a><a href="/near-me/north-vancouver-bc-pressure-washing/" class="footer__link">North Vancouver</a><a href="/near-me/west-vancouver-bc-pressure-washing/" class="footer__link">West Vancouver</a><a href="/near-me/richmond-bc-pressure-washing/" class="footer__link">Richmond</a><a href="/near-me/" class="footer__link">All 14 Areas &rarr;</a></div><div><h4 class="footer__heading">Connect</h4><a href="https://www.google.com/maps?cid=14568573342021237088" class="footer__link" target="_blank" rel="noopener">Google Reviews</a><a href="https://birdeye.com/great-canadian-property-services-176098426886337/review-us?dashboard=1" class="footer__link" target="_blank" rel="noopener">Leave a Review</a><a href="/contact-us/" class="footer__link">Contact Us</a><a href="/about-us/" class="footer__link">About Us</a><a href="/pressure-washing-articles/" class="footer__link">Articles</a></div></div><div class="footer__partners"><p class="footer__partners-label">Partner</p><a href="https://www.tridentprotects.com/" target="_blank" rel="noopener" class="footer__partner-link" aria-label="Trident — partner"><img src="/assets/img/partner-trident.svg" class="footer__partner-logo" alt="Trident"></a></div><div class="footer__bottom"><p class="footer__copy">&copy; <span id="footer-year"></span> Great Canadian Property Services. All rights reserved.</p><div class="footer__legal"><a href="/privacy/">Privacy Policy</a><a href="/terms/">Terms of Use</a><a href="/sitemap/">Sitemap</a></div></div></div></footer>`;

function localBusinessSchema(extra = {}) {
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
    },
    ...extra
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

function head({ title, desc, canonical, image, geoCity = 'Surrey, British Columbia', geoPos = '49.1066;-122.8232', extraSchemas = [], extraStyle = '', noindex = false }) {
  return `<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${desc}">
    <meta name="robots" content="${noindex ? 'noindex, nofollow' : 'index, follow'}">
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
    <meta name="geo.position" content="${geoPos}">
    <link rel="icon" type="image/svg+xml" href="/assets/img/favicon.svg">
    <link rel="stylesheet" href="/assets/css/design-system.css">
${extraSchemas.map(s => `    <script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n')}
${extraStyle ? `    <style>${extraStyle}</style>` : ''}
</head>`;
}

function pageWrap({ title, desc, canonical, image, geoCity, geoPos, extraSchemas, extraStyle, body, noindex }) {
  return `<!DOCTYPE html>
<html lang="en-CA">
${head({ title, desc, canonical, image, geoCity, geoPos, extraSchemas, extraStyle, noindex })}
<body>

${NAV_HTML}

<main>

${body}

</main>

${FOOTER_HTML}

<script src="/assets/js/main.js"></script>
</body>
</html>
`;
}

function breadcrumbHTML(crumbs) {
  return `<nav class="breadcrumb" aria-label="Breadcrumb">${crumbs.map((c, i) => i === crumbs.length - 1 ? `<span class="breadcrumb__current">${c.name}</span>` : `<a href="${c.path}">${c.name}</a>`).join('<span class="breadcrumb__sep">/</span>')}</nav>`;
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

function trustBar() {
  return `<div class="trust-bar"><div class="container"><div class="trust-bar__inner reveal">
    <div class="trust-item"><div class="trust-item__label">Rating</div><div class="trust-item__value">5.0 Stars on Google</div></div>
    <div class="trust-item"><div class="trust-item__label">Coverage</div><div class="trust-item__value">14 Communities</div></div>
    <div class="trust-item"><div class="trust-item__label">Assurance</div><div class="trust-item__value">Fully Insured &amp; Licensed</div></div>
    <div class="trust-item"><div class="trust-item__label">Commitment</div><div class="trust-item__value">Satisfaction Guaranteed</div></div>
    <div class="trust-item"><div class="trust-item__label">Assessments</div><div class="trust-item__value">Always Complimentary</div></div>
</div></div></div>`;
}

function areasGrid() {
  return `<div class="areas-grid reveal reveal-d1">
    ${CITIES.map(c => `<a href="/near-me/${c.slug}-bc-pressure-washing/" class="area-item">${c.name}</a>`).join('\n    ')}
</div>`;
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

function reviewsSection({ tag = 'Client Testimonials', heading, reviews, sec = 'section--warm' }) {
  return `<section class="section ${sec}">
    <div class="container">
        <div class="reveal" style="text-align:center; max-width:560px; margin:0 auto;">
            <p class="section__tag">${tag}</p>
            <h2 class="section__heading">${heading}</h2>
            <div class="sep" style="margin:1.25rem auto;"></div>
        </div>
        <div class="reviews-grid reveal reveal-d1">
            ${reviews.map(r => `<div class="review-card">
                <div class="review-card__stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <p class="review-card__text">${r.text}</p>
                <p class="review-card__author">${r.author}</p>
                <p class="review-card__location">${r.location}</p>
                <div class="review-card__source"><span class="g-icon"></span> Posted on Google</div>
            </div>`).join('\n            ')}
        </div>
    </div>
</section>`;
}

const HOMEPAGE_REVIEWS = [
  { text: '"They did an incredible job on our driveway and patio. Everything looks brand new. Professional, on time, and very thorough. We will definitely be calling them again."', author: 'Mark T.', location: 'Surrey, BC' },
  { text: '"Our Christmas lights were absolutely stunning. The whole neighbourhood commented on them. Installation was quick and they came back right away to take everything down after the holidays."', author: 'Jennifer L.', location: 'White Rock, BC' },
  { text: '"We manage several strata properties and Great Canadian handles all of our exterior cleaning. Reliable, communicative, and always deliver quality work. Highly recommend for commercial clients."', author: 'David R.', location: 'Richmond, BC' }
];

function write(relPath, content) {
  const full = path.join(SITE, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
  console.log('  wrote', relPath);
}

// ═════════════════════════════════════════════════════════════════════════════
// BATCH D — Top-level service pages (Christmas Lighting, Window Cleaning)
// ═════════════════════════════════════════════════════════════════════════════
console.log('\n[Batch D] Top-level service pages...');

// CHRISTMAS LIGHTING
{
  const canonical = `${SITE_URL}/christmas-lighting/`;
  const heroImg = 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80&auto=format';
  const breadcrumbs = [{ name: 'Home', path: '/' }, { name: 'Holiday Lighting' }];
  const breadcrumbsForSchema = [
    { name: 'Home', url: SITE_URL + '/' },
    { name: 'Holiday Lighting', url: canonical }
  ];

  const faqs = [
    { q: 'When should I book holiday lighting?', a: 'Book by mid-October for installation before American Thanksgiving. Late bookings can sometimes be accommodated through November but design options narrow as the season fills.' },
    { q: 'Do you provide the lights?', a: 'Yes. We use professional-grade commercial LED strands designed for outdoor weather and multiple seasons of use. Lights and clips are included in the programme.' },
    { q: 'What does removal look like?', a: 'In early January we return on a scheduled date to take everything down carefully, no damage to roofing or trim, and store the kit for the off-season.' },
    { q: 'Can you handle just trees, just rooflines, or full property?', a: 'Yes. From a single feature tree to a full estate display, we scope to fit your property and your aesthetic.' },
    { q: 'What happens if a strand fails mid-season?', a: 'We come back. Mid-season repairs are part of the programme. No ladders for you, ever.' }
  ];

  const body = [
    pageHero({
      tag: 'Holiday Lighting',
      h1Pre: 'Make Your Home',
      h1Em: 'the Envy of the Street',
      sub: 'Custom holiday lighting design, installation, in-season maintenance, careful removal, and off-season storage. From elegant rooflines to full estate displays. No ladders for you, ever.',
      image: heroImg,
      alt: 'Luxury home with warm evening lighting',
      breadcrumbs,
      primaryCTA: 'Plan Your Display'
    }),
    `<section class="section section--charcoal">
    <div class="container">
        <div class="split" style="background:transparent;">
            <div class="split__image reveal"><img src="https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=1200&q=80&auto=format" alt="Tasteful exterior holiday lighting on a residential home" loading="lazy"></div>
            <div class="split__content">
                <div class="reveal">
                    <p class="section__tag">A Better Way</p>
                    <h2 class="section__heading">Five Hours on a Ladder<br><em>Versus an Afternoon Off</em></h2>
                    <div class="sep"></div>
                    <p class="section__body">Most homeowners do their lights once and remember why they did not enjoy it. We design, install, maintain, remove, and store. You enjoy the season. We bring back the same kit next year, refreshed and ready.</p>
                </div>
                <div class="feature-list reveal reveal-d1">
                    <div class="feature-list__item">Custom design tailored to your roofline, landscape, and style</div>
                    <div class="feature-list__item">Professional commercial-grade LED strands</div>
                    <div class="feature-list__item">In-season maintenance for any failures or outages</div>
                    <div class="feature-list__item">Careful January removal, off-season storage included</div>
                    <div class="feature-list__item">Same kit returned next year, refreshed</div>
                </div>
            </div>
        </div>
    </div>
</section>`,
    imageBreak({ src: 'https://images.unsplash.com/photo-1481253127861-534498168948?w=1920&q=80&auto=format', alt: 'Festive evening exterior lighting' }),
    processSection({
      heading: 'How a Holiday Lighting<br><em>Programme Runs</em>',
      steps: [
        { title: 'Design', text: 'Walk your property, map a layout, recommend strand types, colours, and points of emphasis. No-pressure proposal.' },
        { title: 'Install', text: 'Professional installation, fully clipped, no staples, weatherproof connectors. Done before your first guest arrives.' },
        { title: 'Maintain', text: 'Mid-season maintenance for any failures. We come back. No ladders for you.' },
        { title: 'Remove', text: 'Scheduled January removal and off-season storage. Same kit ready for next year.' }
      ]
    }),
    reviewsSection({
      tag: 'From a White Rock Client',
      heading: '<em>Stunning</em> from the Curb',
      reviews: [HOMEPAGE_REVIEWS[1]],
      sec: 'section--warm'
    }),
    `<section class="section section--dark">
    <div class="container">
        <div class="reveal" style="text-align:center; max-width:560px; margin:0 auto;">
            <p class="section__tag">Service Areas</p>
            <h2 class="section__heading">Holiday Lighting<br><em>Across Greater Vancouver</em></h2>
            <div class="sep" style="margin:1.25rem auto;"></div>
        </div>
        ${areasGrid()}
    </div>
</section>`,
    faqSection({ heading: '<em>Holiday Lighting</em> FAQs', faqs }),
    finalCTA({ heading: 'Plan Your <em>Holiday Display</em>', sub: 'Walk-throughs available now for the coming season. October bookings fill first.' })
  ].join('\n\n');

  const html = pageWrap({
    title: 'Christmas &amp; Holiday Lighting in Vancouver | Great Canadian Property Services',
    desc: 'Professional Christmas and holiday lighting design, installation, maintenance, removal, and storage for Vancouver homes. October bookings fill first.',
    canonical,
    image: heroImg.replace('w=1920', 'w=1200'),
    extraSchemas: [
      localBusinessSchema(),
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Holiday &amp; Christmas Lighting",
        "serviceType": "Christmas lighting installation",
        "provider": { "@id": BUSINESS_ID },
        "areaServed": CITIES.map(c => c.name),
        "url": canonical
      },
      breadcrumbSchema(breadcrumbsForSchema),
      faqSchema(faqs)
    ],
    body
  });

  write('christmas-lighting/index.html', html);
}

// WINDOW CLEANING (top-level)
{
  const canonical = `${SITE_URL}/window-cleaning/`;
  const heroImg = 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1920&q=80&auto=format';
  const breadcrumbs = [{ name: 'Home', path: '/' }, { name: 'Window Cleaning' }];
  const breadcrumbsForSchema = [
    { name: 'Home', url: SITE_URL + '/' },
    { name: 'Window Cleaning', url: canonical }
  ];

  const faqs = [
    { q: 'Do you do residential and commercial?', a: 'Yes. Residential, commercial storefront, and multi-storey commercial. Recurring programmes available for all three.' },
    { q: 'What is a water-fed pole?', a: 'A telescoping pole with a soft brush head that delivers purified water to the glass. Cleans without soap, dries spot-free, and reaches multi-storey glass safely from the ground.' },
    { q: 'Do you do interior glass?', a: 'Yes. Interior, exterior, or both. We protect floors, sills, and furnishings before any work begins.' },
    { q: 'How often should I have windows cleaned?', a: 'Most homes do well with twice-yearly cleaning. Storefronts often want monthly or biweekly. Office buildings typically work on a quarterly cycle.' }
  ];

  const body = [
    pageHero({
      tag: 'Window Cleaning',
      h1Pre: 'Glass That Lets',
      h1Em: 'Every Room Breathe',
      sub: 'Residential and commercial window cleaning across Greater Vancouver. Water-fed pole and traditional squeegee, matched to each pane for a result that actually lasts.',
      image: heroImg,
      alt: 'Sunlit interior through perfectly clean glass',
      breadcrumbs
    }),
    `<section class="section section--charcoal">
    <div class="container">
        <div class="split" style="background:transparent;">
            <div class="split__image reveal"><img src="https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=1200&q=80&auto=format" alt="Clean glass with morning light" loading="lazy"></div>
            <div class="split__content">
                <div class="reveal">
                    <p class="section__tag">Two Methods, One Result</p>
                    <h2 class="section__heading">The Right Tool<br><em>For the Right Pane</em></h2>
                    <div class="sep"></div>
                    <p class="section__body">Water-fed pole technology cleans upper-storey glass safely from the ground using purified water. Traditional squeegee work shines on accessible panes where detail and craft matter. We use both, matched to each opening on your property.</p>
                </div>
                <div class="feature-list reveal reveal-d1">
                    <div class="feature-list__item">Water-fed pole for upper storeys</div>
                    <div class="feature-list__item">Squeegee, scrim, and detail for ground-floor glass</div>
                    <div class="feature-list__item">Frames, tracks, sills hand-cleaned</div>
                    <div class="feature-list__item">Screens removed, washed, reinstalled</div>
                    <div class="feature-list__item">Recurring programmes for residential and commercial</div>
                </div>
            </div>
        </div>
    </div>
</section>`,
    imageBreak({ src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80&auto=format', alt: 'Multi-storey building glass facade' }),
    `<section class="section section--dark">
    <div class="container">
        <div class="reveal" style="max-width:640px;">
            <p class="section__tag">Two Pages, One Standard</p>
            <h2 class="section__heading">Choose <em>Residential</em><br>or <em>Commercial</em></h2>
            <div class="sep"></div>
            <p class="section__body">Detailed information for both lives on dedicated pages, including booking, scope, and recurring programme options.</p>
        </div>
        <div class="service-card-grid">
            <a href="/residential-pressure-washing/window-cleaning/" class="service-card reveal"><h3 class="service-card__title">Residential Window Cleaning</h3><p class="service-card__text">Interior and exterior glass for Vancouver homes, every storey. Twice-yearly cycles for most properties.</p><span class="service-card__more">Learn More &rarr;</span></a>
            <a href="/commercial-pressure-washing/window-cleaning/" class="service-card reveal reveal-d1"><h3 class="service-card__title">Commercial Window Cleaning</h3><p class="service-card__text">Recurring storefront and multi-storey programmes. Set the cadence, we handle the rest.</p><span class="service-card__more">Learn More &rarr;</span></a>
        </div>
    </div>
</section>`,
    `<section class="section section--dark">
    <div class="container">
        <div class="reveal" style="text-align:center; max-width:560px; margin:0 auto;">
            <p class="section__tag">Service Areas</p>
            <h2 class="section__heading">Window Cleaning<br><em>Across Greater Vancouver</em></h2>
            <div class="sep" style="margin:1.25rem auto;"></div>
        </div>
        ${areasGrid()}
    </div>
</section>`,
    faqSection({ heading: '<em>Window Cleaning</em> FAQs', faqs }),
    finalCTA()
  ].join('\n\n');

  const html = pageWrap({
    title: 'Window Cleaning in Vancouver &amp; Surrey | Great Canadian Property Services',
    desc: 'Residential and commercial window cleaning across Greater Vancouver. Water-fed pole and squeegee. Recurring programmes for homes, storefronts, and offices.',
    canonical,
    image: heroImg.replace('w=1920', 'w=1200'),
    extraSchemas: [
      localBusinessSchema(),
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Window Cleaning",
        "serviceType": "Window cleaning",
        "provider": { "@id": BUSINESS_ID },
        "areaServed": CITIES.map(c => c.name),
        "url": canonical
      },
      breadcrumbSchema(breadcrumbsForSchema),
      faqSchema(faqs)
    ],
    body
  });

  write('window-cleaning/index.html', html);
}

// ═════════════════════════════════════════════════════════════════════════════
// BATCH E — Location pages (14)
// ═════════════════════════════════════════════════════════════════════════════
console.log('\n[Batch E] Location pages...');

function locationPage(city) {
  const slug = `${city.slug}-bc-pressure-washing`;
  const canonical = `${SITE_URL}/near-me/${slug}/`;
  const heroImg = 'https://images.unsplash.com/photo-1559825481-12a05cc00344?w=1920&q=80&auto=format';
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Service Areas', path: '/near-me/' },
    { name: city.name }
  ];
  const breadcrumbsForSchema = [
    { name: 'Home', url: SITE_URL + '/' },
    { name: 'Service Areas', url: SITE_URL + '/near-me/' },
    { name: city.name, url: canonical }
  ];

  const faqs = [
    { q: `Do you serve all of ${city.name}?`, a: `Yes, we serve every neighbourhood in ${city.name} and the surrounding communities. If you're unsure whether your address falls in our service area, give us a call at ${PHONE} and we'll confirm.` },
    { q: `When is the best time of year for exterior care in ${city.name}?`, a: `Late spring and early summer are ideal for most pressure washing. Fall is best for gutters and pre-winter prep. Holiday lighting bookings fill in October.` },
    { q: `Do you offer recurring programmes in ${city.name}?`, a: 'Yes. Quarterly, biannual, and custom recurring schedules for both residential and commercial clients. Discount applies to most ongoing programmes.' },
    { q: `How do I get a complimentary assessment in ${city.name}?`, a: `Call ${PHONE} or fill out our contact form. We schedule an on-site walk-through, talk through what your property needs, and provide a written estimate with no obligation.` }
  ];

  const nearby = CITIES.filter(c => c.slug !== city.slug).slice(0, 6);

  const body = [
    pageHero({
      tag: `Property Care in ${city.name}, BC`,
      h1Pre: 'Refined Property Care',
      h1Em: `in ${city.name}`,
      sub: city.blurb + ' Complimentary assessments, recurring programmes, single-visit work — whichever fits your property.',
      image: heroImg,
      alt: `Coastal British Columbia near ${city.name}`,
      breadcrumbs
    }),
    `<section class="section section--charcoal">
    <div class="container">
        <div class="reveal" style="max-width:760px;">
            <p class="section__tag">About ${city.name}</p>
            <h2 class="section__heading">Local Conditions,<br><em>Local Care</em></h2>
            <div class="sep"></div>
            <p class="section__body">${city.notes}</p>
        </div>
    </div>
</section>`,
    `<section class="section section--dark">
    <div class="container">
        <div class="reveal" style="max-width:560px; margin-bottom:2.5rem;">
            <p class="section__tag">Services Available in ${city.name}</p>
            <h2 class="section__heading">A Full Slate<br><em>Wherever You Are</em></h2>
            <div class="sep"></div>
        </div>
        <div class="split reveal reveal-d1">
            <div class="split__image">
                <img src="https://images.unsplash.com/photo-1559825481-12a05cc00344?w=800&q=80&auto=format" alt="Coastal British Columbia property" loading="lazy">
            </div>
            <div class="split__content" style="background:var(--bg-elevated);">
                <ul class="feature-list" style="margin-top:0; list-style:none;">
                    <li class="feature-list__item"><a href="/residential-pressure-washing/house-washing/">House Washing — soft-wash care for every cladding type</a></li>
                    <li class="feature-list__item"><a href="/residential-pressure-washing/roof-cleaning/">Roof Cleaning — moss, lichen, and algae removal</a></li>
                    <li class="feature-list__item"><a href="/window-cleaning/">Window Cleaning — streak-free glass on every storey</a></li>
                    <li class="feature-list__item"><a href="/residential-pressure-washing/concrete-cleaning/">Concrete Care — driveways, walkways, patios</a></li>
                    <li class="feature-list__item"><a href="/commercial-pressure-washing/">Commercial Programmes — storefronts, strata, offices</a></li>
                    <li class="feature-list__item"><a href="/christmas-lighting/">Holiday Lighting — custom design and installation</a></li>
                </ul>
                <a href="/contact-us/" class="btn btn--outline" style="margin-top:2rem; align-self:flex-start;">Request Assessment &rarr;</a>
            </div>
        </div>
    </div>
</section>`,
    trustBar(),
    reviewsSection({ heading: '<em>Five Stars</em> from Greater Vancouver', reviews: HOMEPAGE_REVIEWS, sec: 'section--warm' }),
    `<section class="section section--dark">
    <div class="container">
        <div class="reveal" style="text-align:center; max-width:560px; margin:0 auto;">
            <p class="section__tag">Nearby Communities</p>
            <h2 class="section__heading">Also Serving<br><em>Your Neighbours</em></h2>
            <div class="sep" style="margin:1.25rem auto;"></div>
        </div>
        <div class="areas-grid reveal reveal-d1">
            ${nearby.map(c => `<a href="/near-me/${c.slug}-bc-pressure-washing/" class="area-item">${c.name}</a>`).join('\n            ')}
            <a href="/near-me/" class="area-item">All 14 Areas &rarr;</a>
        </div>
    </div>
</section>`,
    faqSection({ heading: `<em>${city.name}</em> FAQs`, faqs }),
    finalCTA({ heading: `<em>${city.name}</em> Property Care Awaits`, sub: `Tell us about your ${city.name} property and we will recommend the right care plan.` })
  ].join('\n\n');

  return pageWrap({
    title: `Pressure Washing in ${city.name}, BC | Great Canadian Property Services`,
    desc: `Pressure washing, window cleaning, roof care, and exterior maintenance in ${city.name}, BC. Complimentary assessments. Serving every ${city.name} neighbourhood.`,
    canonical,
    image: heroImg.replace('w=1920', 'w=1200'),
    geoCity: `${city.name}, British Columbia`,
    geoPos: `${city.lat};${city.lng}`,
    extraSchemas: [
      localBusinessSchema({
        areaServed: { "@type": "City", "name": city.name }
      }),
      breadcrumbSchema(breadcrumbsForSchema),
      faqSchema(faqs)
    ],
    body
  });
}

for (const city of CITIES) {
  write(`near-me/${city.slug}-bc-pressure-washing/index.html`, locationPage(city));
}

console.log('\nDone with batches D and E. Run generate-content.mjs for articles, utilities, sitemap.');
