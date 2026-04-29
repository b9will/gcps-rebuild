/* GCPS Part 3 generator — articles, utility pages, sitemap, robots.
   Run: node scraper/generate-content.mjs
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
const PUBLISHED = '2026-03-15';

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

function head({ title, desc, canonical, image, geoCity = 'Surrey, British Columbia', extraSchemas = [], extraStyle = '', noindex = false }) {
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
    <link rel="icon" type="image/svg+xml" href="/assets/img/favicon.svg">
    <link rel="stylesheet" href="/assets/css/design-system.css">
${extraSchemas.map(s => `    <script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n')}
${extraStyle ? `    <style>${extraStyle}</style>` : ''}
</head>`;
}

function pageWrap({ title, desc, canonical, image, geoCity, extraSchemas, extraStyle, body, noindex }) {
  return `<!DOCTYPE html>
<html lang="en-CA">
${head({ title, desc, canonical, image, geoCity, extraSchemas, extraStyle, noindex })}
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

function write(relPath, content) {
  const full = path.join(SITE, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
  console.log('  wrote', relPath);
}

// ═════════════════════════════════════════════════════════════════════════════
// BATCH F — Article pages (7)
// ═════════════════════════════════════════════════════════════════════════════
console.log('\n[Batch F] Article pages...');

const ARTICLES = [
  {
    slug: 'how-often-should-you-clean-your-homes-windows-in-a-rainy-coastal-climate',
    tag: 'Window Cleaning',
    title: 'How Often Should You Clean Your Home\'s Windows in a Rainy Coastal Climate?',
    h1Pre: 'How Often to Clean Your Windows',
    h1Em: 'in Coastal BC',
    desc: 'A clear local answer for how often to clean residential windows in coastal British Columbia. From bi-annual cycles to property-specific edge cases.',
    excerpt: 'Coastal weather brings steady rain, sea air, and drifting pollen. A clear, local answer for how often glass really needs attention.',
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1920&q=80&auto=format',
    alt: 'Sunlit interior through clean glass with rain on the exterior',
    readMin: 5,
    body: `<p>Most homeowners ask the same question after their first wet winter on the coast: <em>how often does this glass actually need cleaning?</em> The honest answer is "more often than you would think, less often than you fear." Below is the breakdown we give clients in Vancouver, Surrey, and the wider Lower Mainland.</p>

<h2>The Default: Twice a Year</h2>
<p>For most coastal BC homes, twice a year is the right baseline. One wash in spring after the rainy season has tapered off, one in fall before the long stretch of grey weather sets in. This rhythm matches how the climate actually treats your glass.</p>
<p>Spring cleaning lifts the winter accumulation: salt film from coastal storms, mineral residue from rain, organic spotting from the trees overhead. Fall cleaning resets the glass for entertaining season and gives you a clear view through the months when natural light matters most.</p>

<h2>When Twice a Year Isn't Enough</h2>
<p>Several property factors push the cadence toward three or four cleanings:</p>
<ul>
  <li><strong>Heavy tree cover.</strong> Sap, leaf tannin, and bird activity are concentrated under trees. Properties under mature canopy often want a third visit in late summer.</li>
  <li><strong>Waterfront or near-waterfront.</strong> Salt accumulation is the defining factor for properties in West Vancouver, White Rock, Steveston, and Tsawwassen. Salt etches glass over time. More frequent cleaning protects the surface.</li>
  <li><strong>Roads with high traffic or construction nearby.</strong> Particulates from passing traffic, road dust, and construction settle on glass within days of cleaning. Quarterly cycles are common for properties on busy corridors.</li>
  <li><strong>North-facing glass.</strong> Reduced sun means slower drying and more visible spotting. North-facing windows often look "off" before south-facing ones.</li>
</ul>

<h2>Signs It's Been Too Long</h2>
<p>Even on a fixed schedule, watch for these signals that a cleaning is overdue:</p>
<ul>
  <li>Persistent water spotting that does not clear after rain</li>
  <li>Bird leavings or sap that has been on the glass long enough to need scraping</li>
  <li>A film that interior light no longer cuts through</li>
  <li>Hard-water buildup at sprinkler-spray height on lower-storey glass</li>
</ul>
<p>Each of these accelerates etching when left alone. Soft, regular cleaning is far easier on the glass than aggressive cleaning of badly neglected windows.</p>

<h2>What "Cleaning" Actually Includes</h2>
<p>For our residential clients in Vancouver and the Lower Mainland, a window cleaning visit covers:</p>
<ul>
  <li>Exterior glass, every storey</li>
  <li>Interior glass on request</li>
  <li>Frames, sills, and tracks hand-detailed</li>
  <li>Screens removed, washed, reinstalled</li>
  <li>Skylights where safely accessible</li>
</ul>
<p>For upper-storey glass, we use water-fed pole technology with purified water. It cleans without soap, dries spot-free, and removes the safety risk of ladder work on upper floors. Detail on accessible glass is squeegee, scrim, and steady hands.</p>

<div class="article-cta">
    <h3 class="article-cta__title">Considering a Window Cleaning Programme?</h3>
    <p class="article-cta__text">We offer recurring twice-yearly programmes for residential properties across Greater Vancouver. Discount applies after the first scheduled visit.</p>
    <a href="/contact-us/" class="btn btn--primary">Request a Complimentary Assessment</a>
</div>

<h2>The Quick Answer</h2>
<p>If you remember nothing else: twice a year is the right starting point for most homes in coastal BC. Add a third visit if you have heavy tree cover, live near salt water, or sit on a busy road. Beyond that, watch for the visible signs and adjust accordingly. Glass that gets care on a steady cycle stays clearer longer, and stays cleaner between visits.</p>`
  },
  {
    slug: 'water-fed-poles-vs-traditional-squeegees-which-window-cleaning-method-works-best-for-homes',
    tag: 'Window Cleaning',
    title: 'Water-Fed Poles vs. Traditional Squeegees: Which Window Cleaning Method Works Best for Homes?',
    h1Pre: 'Water-Fed Poles vs. Squeegees',
    h1Em: 'Honestly Compared',
    desc: 'Two window cleaning methods, two real strengths, one honest comparison from a Vancouver team that uses both daily.',
    excerpt: 'Two methods, two strengths, one question: which is right for your home? An honest comparison from a team that uses both.',
    image: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=1920&q=80&auto=format',
    alt: 'Window cleaner working with traditional squeegee at sunset',
    readMin: 6,
    body: `<p>If you've shopped around for window cleaning in Greater Vancouver, you have probably encountered both methods: traditional squeegee work and water-fed pole systems. Each has real strengths. Here is the honest comparison, from a team that uses both daily and chooses based on what each opening actually needs.</p>

<h2>How Each Method Actually Works</h2>
<h3>Traditional Squeegee</h3>
<p>The classic approach. A cleaner soaked in detergent solution wets the glass, a squeegee pulls the solution down and across, and a clean cloth or scrim catches the edges. Done well, it produces glass with no streaks, no missed spots, and a craft-finish edge that machine work cannot match.</p>

<h3>Water-Fed Pole</h3>
<p>A telescoping fibreglass pole with a soft brush head delivers purified water to the glass. The water is filtered to remove all minerals, which means it dries without spots — no detergent needed. The brush agitates the surface, the purified water rinses, and the glass dries clean.</p>

<h2>Where Each Method Wins</h2>
<h3>Squeegee Wins For:</h3>
<ul>
  <li><strong>Ground-floor and first-storey detail.</strong> Where edges matter and the cleaner can work in close, traditional squeegee work produces the cleanest visible results.</li>
  <li><strong>Heavy build-up or initial restoration.</strong> Years of neglect, hard-water staining, or paint overspray often need the manual contact and stronger chemistry that squeegee work allows.</li>
  <li><strong>Interior glass.</strong> Almost always squeegee, with drop cloths and care for the room.</li>
</ul>

<h3>Water-Fed Pole Wins For:</h3>
<ul>
  <li><strong>Upper-storey glass.</strong> Cleaning second, third, even fourth-floor glass safely from the ground. No ladders, no fall risk, no climbing in unstable conditions.</li>
  <li><strong>Recurring maintenance cleaning.</strong> On glass that gets attention regularly, the speed and consistency of water-fed pole work make recurring programmes economically viable.</li>
  <li><strong>Frame and sill rinse.</strong> Surrounding trim, soffits, and sills get a free rinse during the cleaning, removing the dust that collects between visits.</li>
  <li><strong>Architectural glass with awkward access.</strong> High clerestories, glass over balcony rails, large picture windows above garages all benefit.</li>
</ul>

<h2>What About Streaks and Spots?</h2>
<p>The most common concern about water-fed pole work is streaking. The reality: when the water is properly purified (TDS reading near zero) and the technique is sound, water-fed pole work dries spot-free without any soap residue. Streaks usually mean either contaminated water, an under-filtered system, or insufficient rinse time. None of those is a fault of the method itself.</p>

<h2>What We Actually Do at Your Home</h2>
<p>For most residential properties in Vancouver, Surrey, the North Shore, and beyond, we use a combination on every visit:</p>
<ul>
  <li>Squeegee for ground-floor and accessible glass where craft finish shows</li>
  <li>Water-fed pole for upper-storey glass and any opening that requires ladder or lift access</li>
  <li>Hand-cleaning for frames, tracks, and sills regardless of method on the glass</li>
</ul>

<div class="article-cta">
    <h3 class="article-cta__title">Want a Recommendation for Your Home?</h3>
    <p class="article-cta__text">A complimentary on-site assessment lets us tell you exactly which method we'd use on which openings, and what your property's optimal cadence looks like.</p>
    <a href="/contact-us/" class="btn btn--primary">Request a Complimentary Assessment</a>
</div>

<h2>The Bottom Line</h2>
<p>Anyone who tells you one method is universally better than the other is selling you something. Both have a place. The right answer for your home is "both," applied where each shines. That is what we do, and that is what produces glass that actually looks and stays clean.</p>`
  },
  {
    slug: 'professional-window-cleaning-surrey-storefronts',
    tag: 'Commercial',
    title: 'Why Professional Window Cleaning Matters for Surrey Storefronts',
    h1Pre: 'Why Storefront Glass',
    h1Em: 'Earns Professional Care',
    desc: 'Storefront glass in Surrey takes a beating. Here is what professional window cleaning does that in-house squeegee work cannot — and why it matters for the bottom line.',
    excerpt: 'Storefront glass is the first thing customers see. Here is what professional cleaning does that in-house squeegee work cannot.',
    image: 'https://images.unsplash.com/photo-1577415124269-fc1140a69e91?w=1920&q=80&auto=format',
    alt: 'Surrey storefront with clean front glass',
    readMin: 4,
    body: `<p>Storefront glass is the first thing your customers see, and the only marketing surface that operates 24 hours a day with no media buy. In Surrey, between Guildford, Cloverdale, Fleetwood, and Central City, that glass takes a beating from coastal rain, road spray, pollen, traffic exhaust, and the regular wear of foot traffic. Here is the case for professional, recurring care over the in-house squeegee approach.</p>

<h2>What Customers Actually See</h2>
<p>Walk past a row of storefronts on a sunny morning. The ones with clean glass read as cared-for, current, in business. The ones with smudges, water spots, and overlooked corners read as lower-end, regardless of what they sell inside. This is not subtle, and it is not subjective. Glass quality is one of the most reliable cues for perceived quality of the business behind it.</p>

<h2>What Professional Cleaning Adds</h2>
<h3>Consistency</h3>
<p>In-house cleaning happens when someone has time. Professional recurring cleaning happens on a schedule, regardless of how busy the week was. The difference shows: clients on a recurring programme rarely have glass that gets bad enough for customers to notice.</p>

<h3>Method</h3>
<p>Professional crews use water-fed pole systems for upper glass, professional-grade squeegees on accessible panes, scrim work on edges, and hand detail on frames. The result is consistently spot-free, edge to edge.</p>

<h3>Safety</h3>
<p>Two-storey storefronts are common in Surrey commercial districts. Cleaning upper glass from a ladder is one of the most common workplace injury vectors in retail. Professional crews bring water-fed pole systems that handle multi-storey glass safely from the ground.</p>

<h3>Recovery from Neglect</h3>
<p>Glass that has been neglected develops mineral staining, organic film, and edge buildup that consumer-grade cleaning can no longer touch. Professional restoration cleaning reverses this and re-establishes a clean baseline.</p>

<h2>Recurring Programmes for Surrey Storefronts</h2>
<p>Most Surrey storefronts work well on a monthly or biweekly cycle. High-traffic retail, food service, and properties on busy corridors often want weekly. We build programmes around your operating hours so cleaning happens before opening or after close, with consistent crews and consistent results.</p>

<div class="article-cta">
    <h3 class="article-cta__title">Talk Through a Programme</h3>
    <p class="article-cta__text">A complimentary on-site walk-through covers scope, cadence, scheduling around your hours, and pricing. No obligation.</p>
    <a href="/contact-us/" class="btn btn--primary">Request a Complimentary Assessment</a>
</div>

<h2>What It Costs to Skip It</h2>
<p>Storefront glass that is consistently smudged, spotted, or filmy quietly underperforms across every metric: foot traffic, dwell time, conversion, perceived quality. The cost of professional recurring cleaning is small relative to those numbers. For Surrey businesses on the cusp of upgrading their visible presentation, this is one of the lowest-friction, highest-return moves available.</p>`
  },
  {
    slug: 'how-much-does-holiday-lighting-cost-in-surrey-bc',
    tag: 'Holiday Lighting',
    title: 'How Much Does Holiday Lighting Cost in Surrey, BC?',
    h1Pre: 'What Holiday Lighting',
    h1Em: 'Actually Costs',
    desc: 'A clear breakdown of what shapes the cost of professional holiday lighting in Surrey, BC. From scope and design through installation, maintenance, removal, and storage.',
    excerpt: 'A clear breakdown of what shapes the price of professional installations, from roofline to landscape, design through removal.',
    image: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=1920&q=80&auto=format',
    alt: 'Holiday lighting on a Surrey home',
    readMin: 5,
    body: `<p>Professional holiday lighting in Surrey is priced by what you put up, where, and what level of design you want. Below is the honest breakdown of what shapes the number on a quote.</p>

<h2>The Five Cost Drivers</h2>
<h3>1. Linear Feet of Roofline</h3>
<p>The largest single factor. Single-storey homes with a straightforward roofline price differently than two-storey homes with multiple gables, dormers, and complex peaks. We measure during the on-site walk-through and quote based on actual feet, not estimates.</p>

<h3>2. Tree and Landscape Lighting</h3>
<p>Wrapping mature trees, lighting hedges, accenting columns or pillars, and any landscape integration adds beyond the roofline. Each tree is assessed individually because a 30-foot maple takes considerably more work than a 6-foot ornamental.</p>

<h3>3. Design Complexity</h3>
<p>Single-colour roofline outlining is the baseline. Multi-colour designs, blended colour schemes, custom feature elements, and integrated motion or animation all add design and installation time.</p>

<h3>4. Strand Type</h3>
<p>We use commercial-grade LED strands designed for multi-season use and Pacific Northwest weather. Standard warm white is the baseline. Coloured, multi-coloured, or premium strands add cost.</p>

<h3>5. Property Access</h3>
<p>Steep roofs, hard-to-reach gables, properties that require lift access, and tightly-spaced installations all factor into time on site, which factors into cost.</p>

<h2>What's Included</h2>
<p>A professional holiday lighting programme in Surrey from us includes:</p>
<ul>
  <li>On-site design consultation</li>
  <li>Commercial-grade LED strands (we provide)</li>
  <li>Professional installation with all clipping (no staples or roof penetration)</li>
  <li>In-season maintenance for any failures</li>
  <li>Scheduled January removal</li>
  <li>Off-season storage of your kit</li>
  <li>Returning the same kit, refreshed, the following season</li>
</ul>

<h2>Typical Ranges</h2>
<p>Honest pricing varies too much by property to publish a single number. As a rough orientation for Surrey homes:</p>
<ul>
  <li>Modest single-storey roofline outlining: lower hundreds of dollars per season</li>
  <li>Two-storey home with full roofline and a few accent trees: mid hundreds to low thousands</li>
  <li>Larger estate properties with full landscape integration: higher</li>
</ul>
<p>What you pay year one covers the strand purchase plus installation, maintenance, removal, and storage. Following years drop because the strands are already part of your kit.</p>

<div class="article-cta">
    <h3 class="article-cta__title">Get an Exact Number for Your Home</h3>
    <p class="article-cta__text">A complimentary on-site walk-through gives you a written quote with all numbers itemised. October bookings fill first.</p>
    <a href="/contact-us/" class="btn btn--primary">Plan Your Display</a>
</div>

<h2>What's Worth Spending On</h2>
<p>If you are deciding where to put your holiday lighting budget, our honest take after years of installations: spend on professional installation and on commercial strands. The two together produce a display that looks intentional and lasts the season without mid-December outages. Saving on either one shows.</p>`
  },
  {
    slug: 'lighten-your-holiday-load-with-professional-christmas-lighting-installation',
    tag: 'Holiday Lighting',
    title: 'Lighten Your Holiday Load With Professional Christmas Lighting Installation',
    h1Pre: 'The Honest Case for',
    h1Em: 'Professional Installation',
    desc: 'No ladders. No tangled strings. No mid-December outages. What it really feels like to outsource your holiday lighting display.',
    excerpt: 'No ladders. No tangled strings. No mid-December outages. What it really feels like to outsource your display.',
    image: 'https://images.unsplash.com/photo-1481253127861-534498168948?w=1920&q=80&auto=format',
    alt: 'Festive evening exterior lighting',
    readMin: 4,
    body: `<p>Most homeowners do their own holiday lighting once and remember why they did not enjoy it. Cold hands, awkward ladders, tangled strings from last year, missing bulbs, the strand that just will not light. This article is the honest case for outsourcing the whole thing.</p>

<h2>What You Skip</h2>
<ul>
  <li>The first weekend of December on a ladder</li>
  <li>Untangling strings in cold rain</li>
  <li>Replacing strands that have failed in storage</li>
  <li>Mid-season failures with nothing to do about them</li>
  <li>The takedown weekend in January when you would rather be doing anything else</li>
  <li>Storing the kit somewhere it will not get crushed before next year</li>
</ul>

<h2>What You Get</h2>
<ul>
  <li>A custom design tailored to your property</li>
  <li>Commercial-grade strands that look intentional, not residential</li>
  <li>Professional installation with proper clipping and weatherproof connectors</li>
  <li>Mid-season maintenance if anything fails</li>
  <li>Scheduled removal in January, no work for you</li>
  <li>Off-season storage of your kit, ready for next year</li>
</ul>

<h2>The Hidden Win</h2>
<p>Most clients tell us the biggest gain is not even the time saved. It is the thing they forgot to expect: their property looks materially better. A professional installation with quality strands looks intentional from the curb. It reads "this is a property someone cares about." That signal extends well past the holiday season as a piece of how the home is perceived.</p>

<h2>How It Actually Works</h2>
<ol>
  <li><strong>Walk-through.</strong> We come to your property in fall, talk through what you want, propose a design, send a written quote.</li>
  <li><strong>Design lock.</strong> You confirm the design and book a window for installation.</li>
  <li><strong>Install.</strong> We arrive on the scheduled day, install everything, test, and walk you through the timer setup if applicable.</li>
  <li><strong>Season.</strong> If anything fails mid-season, we come back. No ladders for you, ever.</li>
  <li><strong>Remove.</strong> Scheduled January removal. We take it down carefully, no roof or gutter damage, and bring the kit back to our facility.</li>
  <li><strong>Store.</strong> We store your kit in the off-season. Next year, the same strands come back, refreshed and ready.</li>
</ol>

<div class="article-cta">
    <h3 class="article-cta__title">Book Before October Fills</h3>
    <p class="article-cta__text">October bookings fill first. The earlier you walk through, the more design flexibility and scheduling options you have.</p>
    <a href="/contact-us/" class="btn btn--primary">Plan Your Display</a>
</div>

<h2>The Quiet Reason This Matters</h2>
<p>The holidays are short. Spend them with your family, not on a ladder. That is the entire pitch.</p>`
  },
  {
    slug: 'concrete-and-paver-sealing-protects-your-hardscaped-surfaces',
    tag: 'Concrete Care',
    title: 'Concrete &amp; Paver Sealing Protects Your Hardscaped Surfaces',
    h1Pre: 'Why Sealing Quietly',
    h1Em: 'Pays for Itself',
    desc: 'Salty sea air and Fraser Valley rain are tough on concrete and pavers. Sealing is the unglamorous step that quietly extends the life of every hardscape surface.',
    excerpt: 'Salty sea air and Fraser Valley rain are tough on concrete. Sealing is the unglamorous step that quietly extends every surface\'s life.',
    image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1920&q=80&auto=format',
    alt: 'Sealed paver patio with deep colour',
    readMin: 5,
    body: `<p>Most homeowners think about sealing their concrete and pavers exactly once: when a contractor mentions it after the original install, then never again. That is a mistake. In Surrey and the wider Fraser Valley, sealing is one of the highest-value and lowest-friction maintenance items on a property.</p>

<h2>What Sealing Actually Does</h2>
<p>Concrete and pavers are porous. Without a sealer, they absorb everything that lands on them: oil, fertiliser, leaf tannin, deicing chemicals, organic spores, salt air. Each absorbed contaminant either stains the surface or creates conditions for organic growth. Over years, this shows up as discolouration, surface deterioration, and the kind of stains that cleaning alone cannot lift.</p>
<p>A proper sealer creates a barrier. Whatever lands on the surface stays on the surface, ready to be rinsed off, instead of soaking in.</p>

<h2>What Coastal BC Throws at Hardscape</h2>
<ul>
  <li><strong>Steady rain.</strong> Eight months of meaningful precipitation per year. Water is the universal solvent and the universal carrier of stains.</li>
  <li><strong>Salt air.</strong> Properties anywhere near the coast deal with airborne salt that accelerates surface deterioration and feeds efflorescence.</li>
  <li><strong>Organic growth.</strong> The same conditions that grow lush gardens grow algae, moss, and lichen on hardscape. North-facing surfaces are particularly vulnerable.</li>
  <li><strong>UV in summer.</strong> Two months of strong sun fades coloured concrete and pigmented pavers without protection.</li>
  <li><strong>Freeze-thaw cycles.</strong> Especially in higher elevation areas, water that absorbs into the surface and freezes is one of the primary causes of surface failure.</li>
</ul>

<h2>What a Sealing Project Looks Like</h2>
<ol>
  <li><strong>Clean.</strong> The surface must be properly cleaned first. Pressure washing, stain treatment where needed, full removal of organic growth.</li>
  <li><strong>Dry.</strong> The surface must dry completely. Trapped moisture is the most common cause of sealing failure. We typically wait at least 48 hours after a thorough cleaning before applying.</li>
  <li><strong>Apply.</strong> Even application of a sealer matched to your surface and the finish you want. Penetrating sealers leave a natural look. Topical sealers can deepen colour and add gloss.</li>
  <li><strong>Cure.</strong> Foot traffic typically OK within 24 hours, vehicle traffic within 48 to 72.</li>
</ol>

<h2>How Long It Lasts</h2>
<p>Most penetrating sealers on residential surfaces last 3 to 5 years. Topical sealers vary by traffic and exposure. Maintenance washing extends sealer life. Re-application when the bead is no longer visible is the right cycle for most properties.</p>

<div class="article-cta">
    <h3 class="article-cta__title">Pair Cleaning and Sealing</h3>
    <p class="article-cta__text">For most properties we recommend cleaning and sealing as a single project. Cleaner surface, properly prepped substrate, and the protection in place from day one.</p>
    <a href="/contact-us/" class="btn btn--primary">Request a Complimentary Assessment</a>
</div>

<h2>The Numbers</h2>
<p>Properly cleaned and sealed concrete or paver surfaces last considerably longer between replacements. The cost of a cleaning and sealing project, even repeated every few years, is far below the cost of replacing degraded hardscape. For most properties, sealing pays for itself the first time.</p>`
  },
  {
    slug: 'a-pressure-washing-pro-will-help-you-take-back-your-weekends',
    tag: 'Property Care',
    title: 'A Pressure Washing Pro Will Help You Take Back Your Weekends',
    h1Pre: 'Why Outsourcing Exterior Care',
    h1Em: 'Is Worth Considering',
    desc: 'The honest case for handing exterior maintenance to someone else, written by a Greater Vancouver team that does it for a living.',
    excerpt: 'The honest case for handing exterior maintenance to someone else, written by someone who does it for a living.',
    image: 'https://images.unsplash.com/photo-1481253127861-534498168948?w=1920&q=80&auto=format',
    alt: 'Quiet Vancouver morning with light rain',
    readMin: 4,
    body: `<p>Most homeowners we work with started out doing their own exterior care. Some still enjoy parts of it. Others realised, after a few seasons, that the time they were spending on it was time they did not get back. Here is the honest case for outsourcing, from people who do it for a living.</p>

<h2>The Time Math</h2>
<p>A thorough house wash, done properly, takes a half-day. Driveway and patio cleaning takes another half-day. Window cleaning interior and exterior takes a full day on most properties. Roof cleaning takes the better part of a day. Add it up across a year and most homeowners are spending three to five full weekend days on exterior care, often spread over multiple separate sessions because no single weekend has time for all of it.</p>

<h2>The Equipment Math</h2>
<p>To do this work to a standard:</p>
<ul>
  <li>Commercial-grade pressure washer (consumer units do not produce consistent results)</li>
  <li>Surface cleaner attachment for even concrete work</li>
  <li>Soft wash chemistry for siding and roof</li>
  <li>Water-fed pole system for upper-storey windows</li>
  <li>Squeegee, scrim, and ladder for accessible glass</li>
  <li>Storage for everything between uses</li>
</ul>
<p>The equipment to do exterior care well costs more than several years of professional service. The equipment to do it poorly is widely available and produces results that show.</p>

<h2>The Standard Math</h2>
<p>Even with the right equipment, the difference between professional and amateur exterior care is technique. Pressure washing without surface-cleaner technique leaves tiger stripes on concrete. Soft washing without proper dwell time leaves growth that returns in weeks. Window cleaning without scrim work leaves edges. Roof cleaning without proper chemistry strips granules.</p>
<p>Doing it right takes practice. We are doing it every day on dozens of properties. That is the difference.</p>

<h2>What You Get Back</h2>
<p>The most underrated benefit is not the time saved or the higher standard of result. It is the mental freedom of knowing the property is being cared for, on a schedule, by someone whose job it is to think about it. That cognitive load disappears, and most homeowners only realise how much it weighed once it lifts.</p>

<div class="article-cta">
    <h3 class="article-cta__title">Try a Single Service First</h3>
    <p class="article-cta__text">Most clients start with one service — a house wash or window cleaning — and add others as they see what professional work looks like on their property.</p>
    <a href="/contact-us/" class="btn btn--primary">Request a Complimentary Assessment</a>
</div>

<h2>What This Is Not</h2>
<p>This is not a pitch that homeowners should never touch their property. Plenty of people enjoy the satisfaction of doing their own care, and that is a perfectly good reason to keep doing it. This is for the homeowners who never enjoyed it, who keep meaning to schedule it, and who would happily trade a few hundred dollars a year for several weekends back. If that is you, the math is in your favour.</p>`
  }
];

function buildArticlePage(a, allArticles) {
  const canonical = `${SITE_URL}/pressure-washing-articles/${a.slug}/`;
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Articles', path: '/pressure-washing-articles/' },
    { name: a.tag }
  ];
  const breadcrumbsForSchema = [
    { name: 'Home', url: SITE_URL + '/' },
    { name: 'Articles', url: SITE_URL + '/pressure-washing-articles/' },
    { name: a.title, url: canonical }
  ];

  const others = allArticles.filter(x => x.slug !== a.slug).slice(0, 3);

  const body = [
    pageHero({
      tag: a.tag,
      h1Pre: a.h1Pre,
      h1Em: a.h1Em,
      sub: a.excerpt,
      image: a.image,
      alt: a.alt,
      breadcrumbs
    }),
    `<section class="section section--cream">
    <div class="container">
        <div class="article-layout">
            <article>
                <div class="article-meta">
                    <span><strong>Updated</strong> ${new Date(TODAY).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span class="article-meta__sep">&middot;</span>
                    <span><strong>${a.readMin} min</strong> read</span>
                    <span class="article-meta__sep">&middot;</span>
                    <span>${a.tag}</span>
                </div>
                <div class="article-body">${a.body}</div>
            </article>
            <aside class="article-sidebar">
                <div class="sidebar-card">
                    <p class="sidebar-card__title">Related Services</p>
                    <ul class="sidebar-links">
                        <li><a href="/residential-pressure-washing/window-cleaning/">Window Cleaning</a></li>
                        <li><a href="/residential-pressure-washing/house-washing/">House Washing</a></li>
                        <li><a href="/residential-pressure-washing/roof-cleaning/">Roof Cleaning</a></li>
                        <li><a href="/christmas-lighting/">Holiday Lighting</a></li>
                        <li><a href="/commercial-pressure-washing/">Commercial Services</a></li>
                    </ul>
                </div>
                <div class="sidebar-card">
                    <p class="sidebar-card__title">Service Areas</p>
                    <ul class="sidebar-links">
                        <li><a href="/near-me/vancouver-bc-pressure-washing/">Vancouver</a></li>
                        <li><a href="/near-me/surrey-bc-pressure-washing/">Surrey</a></li>
                        <li><a href="/near-me/north-vancouver-bc-pressure-washing/">North Vancouver</a></li>
                        <li><a href="/near-me/richmond-bc-pressure-washing/">Richmond</a></li>
                        <li><a href="/near-me/">All 14 Areas</a></li>
                    </ul>
                </div>
                <div class="sidebar-cta">
                    <p class="sidebar-cta__title">Talk to <em>a Real Person</em></p>
                    <p class="sidebar-cta__text">Complimentary assessments. We come to you, walk the property, and quote in writing.</p>
                    <a href="/contact-us/" class="btn btn--primary">Get in Touch</a>
                </div>
            </aside>
        </div>
    </div>
</section>`,
    `<section class="section section--charcoal">
    <div class="container">
        <div class="reveal" style="max-width:560px;">
            <p class="section__tag">Continue Reading</p>
            <h2 class="section__heading">More From <em>the Field</em></h2>
            <div class="sep"></div>
        </div>
        <div class="related-grid">
            ${others.map(o => `<a href="/pressure-washing-articles/${o.slug}/" class="related-card"><p class="related-card__tag">${o.tag}</p><h3 class="related-card__title">${o.title.replace(/<[^>]+>/g, '')}</h3></a>`).join('\n            ')}
        </div>
    </div>
</section>`,
    finalCTA()
  ].join('\n\n');

  return pageWrap({
    title: `${a.title.replace(/<em>/g, '').replace(/<\/em>/g, '')} | Great Canadian Property Services`,
    desc: a.desc,
    canonical,
    image: a.image.replace('w=1920', 'w=1200'),
    extraSchemas: [
      localBusinessSchema(),
      breadcrumbSchema(breadcrumbsForSchema),
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": a.title.replace(/<[^>]+>/g, ''),
        "description": a.desc,
        "image": a.image.replace('w=1920', 'w=1200'),
        "datePublished": PUBLISHED,
        "dateModified": TODAY,
        "author": {
          "@type": "Organization",
          "name": "Great Canadian Property Services"
        },
        "publisher": { "@id": BUSINESS_ID },
        "mainEntityOfPage": canonical
      }
    ],
    body
  });
}

for (const a of ARTICLES) {
  write(`pressure-washing-articles/${a.slug}/index.html`, buildArticlePage(a, ARTICLES));
}

// ═════════════════════════════════════════════════════════════════════════════
// BATCH G — Utility pages
// ═════════════════════════════════════════════════════════════════════════════
console.log('\n[Batch G] Utility pages...');

// ABOUT
{
  const canonical = `${SITE_URL}/about-us/`;
  const heroImg = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80&auto=format';
  const breadcrumbs = [{ name: 'Home', path: '/' }, { name: 'About Us' }];

  const body = [
    pageHero({
      tag: 'About Us',
      h1Pre: 'A Property Care Company',
      h1Em: 'Built on a Standard',
      sub: 'Great Canadian Property Services has been caring for Vancouver and Lower Mainland properties for over a decade. Family-owned, fully insured, and proud to be the team your neighbours recommend.',
      image: heroImg,
      alt: 'Quiet luxury property at twilight',
      breadcrumbs
    }),
    `<section class="section section--charcoal">
    <div class="container">
        <div class="split" style="background:transparent;">
            <div class="split__image reveal"><img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format" alt="Pristine Vancouver residence" loading="lazy"></div>
            <div class="split__content">
                <div class="reveal">
                    <p class="section__tag">Our Story</p>
                    <h2 class="section__heading">Started Local,<br><em>Stayed Local</em></h2>
                    <div class="sep"></div>
                    <p class="section__body">Great Canadian Property Services started in Surrey with a single truck and a focus on doing the work properly. A decade later we operate across 14 communities, with the same commitment to standards we started with. Family-owned, insured, and built on referrals from neighbours, friends, and the property managers we have served year after year.</p>
                </div>
            </div>
        </div>
    </div>
</section>`,
    `<section class="section section--dark">
    <div class="container">
        <div class="reveal" style="text-align:center; max-width:640px; margin:0 auto;">
            <p class="section__tag">What We Believe</p>
            <h2 class="section__heading">A Few <em>Quiet Principles</em></h2>
            <div class="sep" style="margin:1.25rem auto;"></div>
        </div>
        <div class="commercial-grid reveal reveal-d1" style="margin-top:2.5rem;">
            <div class="commercial-card" style="background:rgba(255,255,255,.03); border-color:rgba(255,255,255,.05);">
                <h3 class="commercial-card__title" style="color:var(--text-light);">Show Up Prepared</h3>
                <p class="commercial-card__text" style="color:var(--text-muted);">The right equipment, the right chemistry, the right people on every job. No improvising on someone's property.</p>
            </div>
            <div class="commercial-card" style="background:rgba(255,255,255,.03); border-color:rgba(255,255,255,.05);">
                <h3 class="commercial-card__title" style="color:var(--text-light);">Match Method to Surface</h3>
                <p class="commercial-card__text" style="color:var(--text-muted);">No one technique works for every material. We choose the right approach for your specific surfaces, every time.</p>
            </div>
            <div class="commercial-card" style="background:rgba(255,255,255,.03); border-color:rgba(255,255,255,.05);">
                <h3 class="commercial-card__title" style="color:var(--text-light);">Respect the Property</h3>
                <p class="commercial-card__text" style="color:var(--text-muted);">Landscaping protected, neighbours considered, the site left cleaner than we found it.</p>
            </div>
            <div class="commercial-card" style="background:rgba(255,255,255,.03); border-color:rgba(255,255,255,.05);">
                <h3 class="commercial-card__title" style="color:var(--text-light);">Communicate Clearly</h3>
                <p class="commercial-card__text" style="color:var(--text-muted);">Written quotes, scheduled visits, completion confirmation, and direct contact when something needs discussion.</p>
            </div>
            <div class="commercial-card" style="background:rgba(255,255,255,.03); border-color:rgba(255,255,255,.05);">
                <h3 class="commercial-card__title" style="color:var(--text-light);">Walk the Result</h3>
                <p class="commercial-card__text" style="color:var(--text-muted);">We do not consider a job done until you have walked the property with us and confirmed it is.</p>
            </div>
            <div class="commercial-card" style="background:rgba(255,255,255,.03); border-color:rgba(255,255,255,.05);">
                <h3 class="commercial-card__title" style="color:var(--text-light);">Stand By the Work</h3>
                <p class="commercial-card__text" style="color:var(--text-muted);">If something is not right after we leave, tell us and we make it right. Satisfaction is the standard, not a slogan.</p>
            </div>
        </div>
    </div>
</section>`,
    `<div class="trust-bar"><div class="container"><div class="trust-bar__inner reveal">
        <div class="trust-item"><div class="trust-item__label">Established</div><div class="trust-item__value">Over a Decade in BC</div></div>
        <div class="trust-item"><div class="trust-item__label">Coverage</div><div class="trust-item__value">14 Communities</div></div>
        <div class="trust-item"><div class="trust-item__label">Rating</div><div class="trust-item__value">5.0 Stars on Google</div></div>
        <div class="trust-item"><div class="trust-item__label">Coverage</div><div class="trust-item__value">Fully Insured &amp; WCB</div></div>
        <div class="trust-item"><div class="trust-item__label">Assessments</div><div class="trust-item__value">Always Complimentary</div></div>
    </div></div></div>`,
    finalCTA({ heading: 'Talk to <em>a Real Person</em>', sub: 'Local. Family-owned. Reachable. Tell us about your property and we will help.' })
  ].join('\n\n');

  write('about-us/index.html', pageWrap({
    title: 'About Great Canadian Property Services | Family-Owned Vancouver Property Care',
    desc: 'Family-owned property care for Vancouver and the Lower Mainland. Over a decade of meticulous pressure washing, window cleaning, and exterior maintenance.',
    canonical,
    image: heroImg.replace('w=1920', 'w=1200'),
    extraSchemas: [
      localBusinessSchema(),
      breadcrumbSchema([
        { name: 'Home', url: SITE_URL + '/' },
        { name: 'About Us', url: canonical }
      ])
    ],
    body
  }));
}

// CONTACT
{
  const canonical = `${SITE_URL}/contact-us/`;
  const heroImg = 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80&auto=format';
  const breadcrumbs = [{ name: 'Home', path: '/' }, { name: 'Contact Us' }];

  const body = [
    pageHero({
      tag: 'Contact Us',
      h1Pre: 'Tell Us About',
      h1Em: 'Your Property',
      sub: 'Complimentary assessments across Greater Vancouver. Phone, email, or the form below — whichever fits how you like to work.',
      image: heroImg,
      alt: 'Quiet property at golden hour',
      breadcrumbs
    }),
    `<section class="section section--charcoal">
    <div class="container">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:4rem;">
            <div class="reveal">
                <p class="section__tag">Direct Contact</p>
                <h2 class="section__heading">The Fastest<br><em>Way Through</em></h2>
                <div class="sep"></div>
                <div style="display:flex; flex-direction:column; gap:1.5rem; margin-top:2rem;">
                    <div>
                        <p style="font-size:.7rem; letter-spacing:.18em; text-transform:uppercase; color:var(--copper); margin-bottom:.4rem;">Phone</p>
                        <a href="tel:${PHONE_TEL}" style="font-family:var(--serif); font-size:1.6rem; font-weight:300; color:var(--text-light);">${PHONE}</a>
                    </div>
                    <div>
                        <p style="font-size:.7rem; letter-spacing:.18em; text-transform:uppercase; color:var(--copper); margin-bottom:.4rem;">Email</p>
                        <a href="mailto:${EMAIL}" style="font-family:var(--serif); font-size:1.2rem; font-weight:300; color:var(--text-light); word-break:break-word;">${EMAIL}</a>
                    </div>
                    <div>
                        <p style="font-size:.7rem; letter-spacing:.18em; text-transform:uppercase; color:var(--copper); margin-bottom:.4rem;">Office</p>
                        <p style="font-family:var(--serif); font-size:1.1rem; font-weight:300; color:var(--text-light); line-height:1.5;">${ADDR}<br>${CITY}, ${REGION} ${POST}</p>
                    </div>
                    <div>
                        <p style="font-size:.7rem; letter-spacing:.18em; text-transform:uppercase; color:var(--copper); margin-bottom:.4rem;">Hours</p>
                        <p style="font-family:var(--sans); font-size:.9rem; color:var(--text-muted); line-height:1.7;">Monday to Friday, 8am – 6pm<br>Saturday, 9am – 4pm<br>Closed Sundays</p>
                    </div>
                </div>
            </div>
            <div class="reveal reveal-d1">
                <p class="section__tag">Send a Message</p>
                <h2 class="section__heading">Or, <em>Reach Us</em><br>By Form</h2>
                <div class="sep"></div>
                <p style="font-size:.85rem; color:var(--text-muted); line-height:1.7; margin-top:1rem; padding:1rem 1.25rem; background:rgba(196,149,106,.08); border-left:2px solid var(--copper);">This form is currently configured to open your email client with the message pre-filled. A direct submission backend will be wired up shortly.</p>
                <form action="mailto:${EMAIL}" method="post" enctype="text/plain" style="margin-top:2rem; display:flex; flex-direction:column; gap:1.25rem;">
                    <div>
                        <label for="name" style="display:block; font-size:.7rem; letter-spacing:.14em; text-transform:uppercase; color:var(--text-muted); margin-bottom:.4rem;">Name</label>
                        <input type="text" name="name" id="name" required style="width:100%; padding:.85rem 1rem; background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.08); color:var(--text-light); font-family:var(--sans); font-size:.95rem;">
                    </div>
                    <div>
                        <label for="email" style="display:block; font-size:.7rem; letter-spacing:.14em; text-transform:uppercase; color:var(--text-muted); margin-bottom:.4rem;">Email</label>
                        <input type="email" name="email" id="email" required style="width:100%; padding:.85rem 1rem; background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.08); color:var(--text-light); font-family:var(--sans); font-size:.95rem;">
                    </div>
                    <div>
                        <label for="phone" style="display:block; font-size:.7rem; letter-spacing:.14em; text-transform:uppercase; color:var(--text-muted); margin-bottom:.4rem;">Phone</label>
                        <input type="tel" name="phone" id="phone" style="width:100%; padding:.85rem 1rem; background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.08); color:var(--text-light); font-family:var(--sans); font-size:.95rem;">
                    </div>
                    <div>
                        <label for="message" style="display:block; font-size:.7rem; letter-spacing:.14em; text-transform:uppercase; color:var(--text-muted); margin-bottom:.4rem;">Message</label>
                        <textarea name="message" id="message" rows="5" required style="width:100%; padding:.85rem 1rem; background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.08); color:var(--text-light); font-family:var(--sans); font-size:.95rem; resize:vertical;"></textarea>
                    </div>
                    <button type="submit" class="btn btn--primary" style="border:none; cursor:pointer;">Send Message</button>
                </form>
            </div>
        </div>
    </div>
</section>`,
    `<style>@media(max-width:768px){.section--charcoal .container > div[style*="grid-template-columns:1fr 1fr"]{grid-template-columns:1fr !important; gap:3rem !important;}}</style>`,
    finalCTA({ heading: 'Or Just <em>Pick Up the Phone</em>', sub: `${PHONE} — Monday through Saturday, talk to a real person.` })
  ].join('\n\n');

  write('contact-us/index.html', pageWrap({
    title: 'Contact Great Canadian Property Services | Vancouver Property Care',
    desc: 'Contact Great Canadian Property Services for complimentary property assessments across Greater Vancouver. Phone, email, and contact form.',
    canonical,
    image: heroImg.replace('w=1920', 'w=1200'),
    extraSchemas: [
      localBusinessSchema(),
      breadcrumbSchema([
        { name: 'Home', url: SITE_URL + '/' },
        { name: 'Contact Us', url: canonical }
      ]),
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact Great Canadian Property Services",
        "url": canonical
      }
    ],
    body
  }));
}

// REVIEWS
{
  const canonical = `${SITE_URL}/reviews/`;
  const heroImg = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80&auto=format';
  const breadcrumbs = [{ name: 'Home', path: '/' }, { name: 'Reviews' }];

  const reviews = [
    { text: '"They did an incredible job on our driveway and patio. Everything looks brand new. Professional, on time, and very thorough. We will definitely be calling them again."', author: 'Mark T.', location: 'Surrey, BC' },
    { text: '"Our Christmas lights were absolutely stunning. The whole neighbourhood commented on them. Installation was quick and they came back right away to take everything down after the holidays."', author: 'Jennifer L.', location: 'White Rock, BC' },
    { text: '"We manage several strata properties and Great Canadian handles all of our exterior cleaning. Reliable, communicative, and always deliver quality work. Highly recommend for commercial clients."', author: 'David R.', location: 'Richmond, BC' }
  ];

  const body = [
    pageHero({
      tag: 'Client Testimonials',
      h1Pre: 'What Our Clients',
      h1Em: 'Have to Say',
      sub: 'A 5.0 average across the reviews our clients have left for us. Below are the words of homeowners and property managers we have served across Greater Vancouver.',
      image: heroImg,
      alt: 'Happy clients in front of clean property'
    , breadcrumbs}),
    `<section class="section section--warm">
    <div class="container">
        <div style="text-align:center;" class="reveal">
            <a href="https://www.google.com/maps?cid=14568573342021237088" target="_blank" rel="noopener" class="google-badge">
                <span class="g-icon"></span>
                <span class="google-badge__stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                <span class="google-badge__rating">5.0 Rating on Google</span>
            </a>
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
        <div style="text-align:center; margin-top:3rem;" class="reveal reveal-d2">
            <a href="https://birdeye.com/great-canadian-property-services-176098426886337/review-us?dashboard=1" class="btn btn--outline-dark" target="_blank" rel="noopener">Leave Us a Review</a>
        </div>
    </div>
</section>`,
    finalCTA({ heading: 'Become Our <em>Next Five-Star Story</em>' })
  ].join('\n\n');

  write('reviews/index.html', pageWrap({
    title: 'Reviews &amp; Testimonials | Great Canadian Property Services',
    desc: 'Five-star Google reviews from homeowners and property managers across Greater Vancouver. Real testimonials from real clients.',
    canonical,
    image: heroImg.replace('w=1920', 'w=1200'),
    extraSchemas: [
      localBusinessSchema({
        aggregateRating: { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "3", "bestRating": "5" }
      }),
      breadcrumbSchema([
        { name: 'Home', url: SITE_URL + '/' },
        { name: 'Reviews', url: canonical }
      ])
    ],
    body
  }));
}

// GALLERY
{
  const canonical = `${SITE_URL}/gallery/`;
  const heroImg = 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80&auto=format';
  const breadcrumbs = [{ name: 'Home', path: '/' }, { name: 'Gallery' }];

  const body = [
    pageHero({
      tag: 'Project Gallery',
      h1Pre: 'A Selection of',
      h1Em: 'Our Recent Work',
      sub: 'Project spotlights and visual highlights from properties across Greater Vancouver. Real homes, real outcomes, real before-and-afters.',
      image: heroImg,
      alt: 'Beautifully maintained luxury home',
      breadcrumbs
    }),
    `<section class="section section--charcoal">
    <div class="container">
        <div class="reveal" style="max-width:560px;">
            <p class="section__tag">Project Spotlights</p>
            <h2 class="section__heading"><em>Featured</em> Work</h2>
            <div class="sep"></div>
        </div>
        <div class="service-card-grid">
            <a href="/gallery/project-spotlight-a-traditional-holiday-wonderland-illuminating-home-and-garden/" class="service-card reveal">
                <h3 class="service-card__title">A Traditional Holiday Wonderland</h3>
                <p class="service-card__text">A full estate holiday lighting installation featuring roofline, landscape, and feature trees. Designed, installed, and removed across the season.</p>
                <span class="service-card__more">View Spotlight &rarr;</span>
            </a>
        </div>
        <p style="margin-top:2.5rem; color:var(--text-muted); font-size:.9rem; max-width:600px;" class="reveal reveal-d1">More project spotlights are added throughout the year. Follow our work on Google or check back for new features.</p>
    </div>
</section>`,
    finalCTA({ heading: 'Want Your Property <em>in the Gallery</em>?', sub: 'Book a complimentary assessment and we will start with a walk-through.' })
  ].join('\n\n');

  write('gallery/index.html', pageWrap({
    title: 'Project Gallery | Great Canadian Property Services',
    desc: 'Project spotlights and recent work from Great Canadian Property Services across Vancouver and the Lower Mainland.',
    canonical,
    image: heroImg.replace('w=1920', 'w=1200'),
    extraSchemas: [
      localBusinessSchema(),
      breadcrumbSchema([
        { name: 'Home', url: SITE_URL + '/' },
        { name: 'Gallery', url: canonical }
      ])
    ],
    body
  }));
}

// GALLERY: HOLIDAY WONDERLAND
{
  const slug = 'project-spotlight-a-traditional-holiday-wonderland-illuminating-home-and-garden';
  const canonical = `${SITE_URL}/gallery/${slug}/`;
  const heroImg = 'https://images.unsplash.com/photo-1481253127861-534498168948?w=1920&q=80&auto=format';
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery/' },
    { name: 'Holiday Wonderland' }
  ];

  const body = [
    pageHero({
      tag: 'Project Spotlight',
      h1Pre: 'A Traditional Holiday Wonderland,',
      h1Em: 'Home and Garden',
      sub: 'A full estate holiday lighting installation featuring roofline outlining, landscape accent lighting, and feature tree wrapping. Designed in October, installed in early November, maintained through the season, removed in early January.',
      image: heroImg,
      alt: 'Estate property with traditional holiday lighting at twilight',
      breadcrumbs
    }),
    `<section class="section section--cream">
    <div class="container--narrow">
        <div class="article-body" style="font-family:var(--sans);">
            <p>This estate property in the Lower Mainland came to us in early October looking for a holiday lighting programme that felt traditional and dignified — no flashing colours, no inflatable elements, just warm white lights articulating the lines of the property and a few accent moments in the garden.</p>
            <h2>The Brief</h2>
            <p>The owners wanted the property to read as cared-for from the curb, with lighting that emphasised the roofline architecture, the entry sequence, and a pair of mature trees flanking the driveway. The aesthetic reference was traditional New England, applied with restraint.</p>
            <h2>The Programme</h2>
            <ul>
                <li>Roofline outlining in warm white commercial-grade LED, every gable and dormer articulated</li>
                <li>Entry trees wrapped from base to canopy, two specimens flanking the drive</li>
                <li>Landscape accent lighting along the front path and around foundation plantings</li>
                <li>Custom timer programming to bring lights up at dusk and down after midnight</li>
                <li>Mid-season maintenance visit to address one strand failure</li>
                <li>Scheduled removal first week of January, off-season storage included</li>
            </ul>
            <h2>The Outcome</h2>
            <p>The owners reported neighbours stopping by to comment, and several neighbours reaching out about programmes for their own properties the following season. The lighting kit is in storage for the off-season and will return next October, refreshed and ready.</p>
            <blockquote>The whole neighbourhood commented on them. Installation was quick and they came back right away to take everything down after the holidays.</blockquote>
            <p>Holiday lighting is one of the most visible expressions of how a property is cared for. Done with restraint and quality strands, it produces something that reads as intentional from the curb and across the season.</p>
        </div>
    </div>
</section>`,
    finalCTA({ heading: 'Plan Your <em>Own Display</em>', sub: 'October bookings fill first. Walk-throughs available now.' })
  ].join('\n\n');

  write(`gallery/${slug}/index.html`, pageWrap({
    title: 'A Traditional Holiday Wonderland — Project Spotlight | Great Canadian Property Services',
    desc: 'A full estate holiday lighting installation in the Lower Mainland. Roofline, landscape, and feature trees, designed and installed by Great Canadian Property Services.',
    canonical,
    image: heroImg.replace('w=1920', 'w=1200'),
    extraSchemas: [
      localBusinessSchema(),
      breadcrumbSchema([
        { name: 'Home', url: SITE_URL + '/' },
        { name: 'Gallery', url: SITE_URL + '/gallery/' },
        { name: 'Holiday Wonderland', url: canonical }
      ])
    ],
    body
  }));
}

// PRIVACY
{
  const canonical = `${SITE_URL}/privacy/`;
  const breadcrumbs = [{ name: 'Home', path: '/' }, { name: 'Privacy Policy' }];

  const body = [
    pageHero({
      tag: 'Legal',
      h1Pre: 'Privacy',
      h1Em: 'Policy',
      sub: 'How Great Canadian Property Services handles the personal information you share with us.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80&auto=format',
      alt: 'Quiet exterior at golden hour',
      breadcrumbs
    }),
    `<section class="section section--cream">
    <div class="container--narrow">
        <div class="article-body" style="font-family:var(--sans);">
            <p><strong>Last updated:</strong> ${new Date(TODAY).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p>Great Canadian Property Services ("we," "us," or "our") respects your privacy. This policy describes how we collect, use, and protect personal information when you visit our website or engage our services.</p>

            <h2>Information We Collect</h2>
            <p>We collect personal information that you voluntarily provide to us when you request a quote, schedule service, contact us by phone or email, or otherwise interact with our business. This typically includes your name, address, phone number, email address, and details about your property and the services you are requesting.</p>

            <h2>How We Use Your Information</h2>
            <p>We use your personal information to provide the services you have requested, schedule and complete work at your property, communicate with you about your account, send invoices and process payments, respond to your inquiries, and occasionally inform you about related services or seasonal opportunities.</p>

            <h2>Information Sharing</h2>
            <p>We do not sell, rent, or trade your personal information. We may share information with trusted service providers who help us operate our business (for example, payment processors or scheduling tools), provided they agree to keep it confidential and use it only for the purposes we direct.</p>

            <h2>Data Security</h2>
            <p>We implement reasonable safeguards to protect your personal information from unauthorised access, alteration, or disclosure. No method of transmission over the internet is completely secure, however, and we cannot guarantee absolute security.</p>

            <h2>Your Rights</h2>
            <p>You may request access to the personal information we hold about you, request corrections to inaccurate information, or request that we delete information we no longer need to retain. Contact us at <a href="mailto:${EMAIL}">${EMAIL}</a> for any such requests.</p>

            <h2>Cookies and Analytics</h2>
            <p>Our website may use cookies and similar technologies to understand how visitors use the site so we can improve it. You can configure your browser to refuse cookies if you prefer.</p>

            <h2>Changes to This Policy</h2>
            <p>We may update this privacy policy from time to time. The "Last updated" date at the top of this page reflects the most recent revision.</p>

            <h2>Contact</h2>
            <p>Questions or concerns about this policy may be directed to <a href="mailto:${EMAIL}">${EMAIL}</a> or by mail to ${ADDR}, ${CITY}, ${REGION} ${POST}.</p>
        </div>
    </div>
</section>`
  ].join('\n\n');

  write('privacy/index.html', pageWrap({
    title: 'Privacy Policy | Great Canadian Property Services',
    desc: 'Privacy policy for Great Canadian Property Services. How we collect, use, and protect personal information.',
    canonical,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format',
    extraSchemas: [
      localBusinessSchema(),
      breadcrumbSchema([
        { name: 'Home', url: SITE_URL + '/' },
        { name: 'Privacy Policy', url: canonical }
      ])
    ],
    body
  }));
}

// TERMS
{
  const canonical = `${SITE_URL}/terms/`;
  const breadcrumbs = [{ name: 'Home', path: '/' }, { name: 'Terms of Use' }];

  const body = [
    pageHero({
      tag: 'Legal',
      h1Pre: 'Terms',
      h1Em: 'of Use',
      sub: 'Terms governing your use of this website and engagement of services from Great Canadian Property Services.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80&auto=format',
      alt: 'Quiet residential property at golden hour',
      breadcrumbs
    }),
    `<section class="section section--cream">
    <div class="container--narrow">
        <div class="article-body" style="font-family:var(--sans);">
            <p><strong>Last updated:</strong> ${new Date(TODAY).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p>These terms govern your use of the Great Canadian Property Services website (greatcanadianpropertyservices.ca) and your engagement of our services. By using this website or engaging our services, you agree to these terms.</p>

            <h2>Use of This Website</h2>
            <p>You may browse, read, and use this website for personal and lawful purposes. You may not copy, reproduce, distribute, modify, or create derivative works of any content on this website without our prior written permission.</p>

            <h2>Service Engagement</h2>
            <p>Engagement of services from Great Canadian Property Services is governed by the written quote, work order, or service agreement provided to you in connection with the work. Those documents take precedence over any general descriptions on this website.</p>

            <h2>Intellectual Property</h2>
            <p>All content on this website, including text, graphics, logos, images, and software, is the property of Great Canadian Property Services or its licensors and is protected by Canadian and international copyright laws.</p>

            <h2>Limitation of Liability</h2>
            <p>Great Canadian Property Services makes reasonable efforts to ensure the accuracy of information on this website but does not warrant that the content is error-free or current. Our liability for any claim arising from your use of this website or our services is limited to the maximum extent permitted by applicable law.</p>

            <h2>Third-Party Links</h2>
            <p>This website may contain links to third-party websites. We do not control and are not responsible for the content, privacy practices, or availability of those websites.</p>

            <h2>Governing Law</h2>
            <p>These terms are governed by the laws of British Columbia and the federal laws of Canada applicable therein. Any dispute arising under these terms shall be resolved in the courts of British Columbia.</p>

            <h2>Changes to These Terms</h2>
            <p>We may update these terms from time to time. The "Last updated" date at the top of this page reflects the most recent revision. Continued use of the website following any update constitutes acceptance of the revised terms.</p>

            <h2>Contact</h2>
            <p>Questions about these terms may be directed to <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>
        </div>
    </div>
</section>`
  ].join('\n\n');

  write('terms/index.html', pageWrap({
    title: 'Terms of Use | Great Canadian Property Services',
    desc: 'Terms of use for the Great Canadian Property Services website and service engagement.',
    canonical,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format',
    extraSchemas: [
      localBusinessSchema(),
      breadcrumbSchema([
        { name: 'Home', url: SITE_URL + '/' },
        { name: 'Terms of Use', url: canonical }
      ])
    ],
    body
  }));
}

// SITEMAP (HTML)
{
  const canonical = `${SITE_URL}/sitemap/`;
  const breadcrumbs = [{ name: 'Home', path: '/' }, { name: 'Sitemap' }];

  const body = [
    pageHero({
      tag: 'Sitemap',
      h1Pre: 'Every Page,',
      h1Em: 'In One Place',
      sub: 'A directory of every page on greatcanadianpropertyservices.ca, organised by section.',
      image: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=1920&q=80&auto=format',
      alt: 'Open notebook on a desk',
      breadcrumbs
    }),
    `<section class="section section--charcoal">
    <div class="container">
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:3rem;">
            <div class="reveal">
                <h2 style="font-family:var(--serif); font-size:1.4rem; font-weight:300; color:var(--text-light); margin-bottom:1.25rem;">Core</h2>
                <ul style="list-style:none; display:flex; flex-direction:column; gap:.5rem;">
                    <li><a href="/" style="font-size:.9rem; color:var(--text-muted);">Home</a></li>
                    <li><a href="/about-us/" style="font-size:.9rem; color:var(--text-muted);">About Us</a></li>
                    <li><a href="/contact-us/" style="font-size:.9rem; color:var(--text-muted);">Contact Us</a></li>
                    <li><a href="/reviews/" style="font-size:.9rem; color:var(--text-muted);">Reviews</a></li>
                    <li><a href="/gallery/" style="font-size:.9rem; color:var(--text-muted);">Gallery</a></li>
                    <li><a href="/christmas-lighting/" style="font-size:.9rem; color:var(--text-muted);">Christmas Lighting</a></li>
                    <li><a href="/window-cleaning/" style="font-size:.9rem; color:var(--text-muted);">Window Cleaning</a></li>
                    <li><a href="/privacy/" style="font-size:.9rem; color:var(--text-muted);">Privacy</a></li>
                    <li><a href="/terms/" style="font-size:.9rem; color:var(--text-muted);">Terms</a></li>
                </ul>
            </div>
            <div class="reveal reveal-d1">
                <h2 style="font-family:var(--serif); font-size:1.4rem; font-weight:300; color:var(--text-light); margin-bottom:1.25rem;">Residential Services</h2>
                <ul style="list-style:none; display:flex; flex-direction:column; gap:.5rem;">
                    <li><a href="/residential-pressure-washing/" style="font-size:.9rem; color:var(--text-muted);">All Residential</a></li>
                    <li><a href="/residential-pressure-washing/house-washing/" style="font-size:.9rem; color:var(--text-muted);">House Washing</a></li>
                    <li><a href="/residential-pressure-washing/roof-cleaning/" style="font-size:.9rem; color:var(--text-muted);">Roof Cleaning</a></li>
                    <li><a href="/residential-pressure-washing/window-cleaning/" style="font-size:.9rem; color:var(--text-muted);">Window Cleaning</a></li>
                    <li><a href="/residential-pressure-washing/driveway-cleaning/" style="font-size:.9rem; color:var(--text-muted);">Driveway Cleaning</a></li>
                    <li><a href="/residential-pressure-washing/patio-cleaning/" style="font-size:.9rem; color:var(--text-muted);">Patio Cleaning</a></li>
                    <li><a href="/residential-pressure-washing/concrete-cleaning/" style="font-size:.9rem; color:var(--text-muted);">Concrete Cleaning</a></li>
                    <li><a href="/residential-pressure-washing/concrete-paver-sanding/" style="font-size:.9rem; color:var(--text-muted);">Paver Sanding</a></li>
                    <li><a href="/residential-pressure-washing/concrete-paver-sealing/" style="font-size:.9rem; color:var(--text-muted);">Paver Sealing</a></li>
                </ul>
            </div>
            <div class="reveal reveal-d2">
                <h2 style="font-family:var(--serif); font-size:1.4rem; font-weight:300; color:var(--text-light); margin-bottom:1.25rem;">Commercial Services</h2>
                <ul style="list-style:none; display:flex; flex-direction:column; gap:.5rem;">
                    <li><a href="/commercial-pressure-washing/" style="font-size:.9rem; color:var(--text-muted);">All Commercial</a></li>
                    <li><a href="/commercial-pressure-washing/building-washing/" style="font-size:.9rem; color:var(--text-muted);">Building Washing</a></li>
                    <li><a href="/commercial-pressure-washing/window-cleaning/" style="font-size:.9rem; color:var(--text-muted);">Commercial Window Cleaning</a></li>
                    <li><a href="/commercial-pressure-washing/fleet-washing/" style="font-size:.9rem; color:var(--text-muted);">Fleet Washing</a></li>
                    <li><a href="/commercial-pressure-washing/gutter-cleaning/" style="font-size:.9rem; color:var(--text-muted);">Gutter Cleaning</a></li>
                    <li><a href="/commercial-pressure-washing/industrial-pressure-washing/" style="font-size:.9rem; color:var(--text-muted);">Industrial Pressure Washing</a></li>
                </ul>
            </div>
            <div class="reveal">
                <h2 style="font-family:var(--serif); font-size:1.4rem; font-weight:300; color:var(--text-light); margin-bottom:1.25rem;">Service Areas</h2>
                <ul style="list-style:none; display:flex; flex-direction:column; gap:.5rem;">
                    <li><a href="/near-me/" style="font-size:.9rem; color:var(--text-muted);">All Service Areas</a></li>
                    ${['vancouver','surrey','richmond','coquitlam','delta','langley','maple-ridge','north-vancouver','west-vancouver','white-rock','abbotsford','chilliwack','squamish','whistler'].map(s => `<li><a href="/near-me/${s}-bc-pressure-washing/" style="font-size:.9rem; color:var(--text-muted);">${s.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')}</a></li>`).join('\n                    ')}
                </ul>
            </div>
            <div class="reveal reveal-d1">
                <h2 style="font-family:var(--serif); font-size:1.4rem; font-weight:300; color:var(--text-light); margin-bottom:1.25rem;">Articles</h2>
                <ul style="list-style:none; display:flex; flex-direction:column; gap:.5rem;">
                    <li><a href="/pressure-washing-articles/" style="font-size:.9rem; color:var(--text-muted);">All Articles</a></li>
                    ${ARTICLES.map(a => `<li><a href="/pressure-washing-articles/${a.slug}/" style="font-size:.9rem; color:var(--text-muted);">${a.title.replace(/<[^>]+>/g, '').slice(0, 60)}${a.title.length > 60 ? '…' : ''}</a></li>`).join('\n                    ')}
                </ul>
            </div>
        </div>
    </div>
</section>`,
    finalCTA()
  ].join('\n\n');

  write('sitemap/index.html', pageWrap({
    title: 'Sitemap | Great Canadian Property Services',
    desc: 'Site directory for Great Canadian Property Services. Every page, organised by section.',
    canonical,
    image: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=1200&q=80&auto=format',
    extraSchemas: [
      localBusinessSchema(),
      breadcrumbSchema([
        { name: 'Home', url: SITE_URL + '/' },
        { name: 'Sitemap', url: canonical }
      ])
    ],
    body
  }));
}

// ═════════════════════════════════════════════════════════════════════════════
// BATCH H — sitemap.xml + robots.txt
// ═════════════════════════════════════════════════════════════════════════════
console.log('\n[Batch H] sitemap.xml + robots.txt...');

const SITE_URLS = [
  '/',
  '/about-us/',
  '/contact-us/',
  '/reviews/',
  '/gallery/',
  '/gallery/project-spotlight-a-traditional-holiday-wonderland-illuminating-home-and-garden/',
  '/christmas-lighting/',
  '/window-cleaning/',
  '/privacy/',
  '/terms/',
  '/sitemap/',
  '/residential-pressure-washing/',
  '/residential-pressure-washing/house-washing/',
  '/residential-pressure-washing/roof-cleaning/',
  '/residential-pressure-washing/window-cleaning/',
  '/residential-pressure-washing/driveway-cleaning/',
  '/residential-pressure-washing/patio-cleaning/',
  '/residential-pressure-washing/concrete-cleaning/',
  '/residential-pressure-washing/concrete-paver-sanding/',
  '/residential-pressure-washing/concrete-paver-sealing/',
  '/commercial-pressure-washing/',
  '/commercial-pressure-washing/building-washing/',
  '/commercial-pressure-washing/window-cleaning/',
  '/commercial-pressure-washing/fleet-washing/',
  '/commercial-pressure-washing/gutter-cleaning/',
  '/commercial-pressure-washing/industrial-pressure-washing/',
  '/near-me/',
  '/near-me/vancouver-bc-pressure-washing/',
  '/near-me/surrey-bc-pressure-washing/',
  '/near-me/richmond-bc-pressure-washing/',
  '/near-me/coquitlam-bc-pressure-washing/',
  '/near-me/delta-bc-pressure-washing/',
  '/near-me/langley-bc-pressure-washing/',
  '/near-me/maple-ridge-bc-pressure-washing/',
  '/near-me/north-vancouver-bc-pressure-washing/',
  '/near-me/west-vancouver-bc-pressure-washing/',
  '/near-me/white-rock-bc-pressure-washing/',
  '/near-me/abbotsford-bc-pressure-washing/',
  '/near-me/chilliwack-bc-pressure-washing/',
  '/near-me/squamish-bc-pressure-washing/',
  '/near-me/whistler-bc-pressure-washing/',
  '/pressure-washing-articles/',
  ...ARTICLES.map(a => `/pressure-washing-articles/${a.slug}/`)
];

const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SITE_URLS.map(u => `  <url>
    <loc>${SITE_URL}${u}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${u === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${u === '/' ? '1.0' : (u.split('/').filter(Boolean).length === 1 ? '0.8' : '0.6')}</priority>
  </url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(SITE, 'sitemap.xml'), sitemapXML, 'utf8');
console.log('  wrote sitemap.xml');

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
fs.writeFileSync(path.join(SITE, 'robots.txt'), robots, 'utf8');
console.log('  wrote robots.txt');

console.log('\nAll batches complete.');
