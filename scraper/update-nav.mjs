// Batch 1 nav refresh: replace the old text-logo nav, drawer, and favicon link
// across every HTML file in site/ except the homepage (which is hand-edited).
import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const SITE = new URL('../site/', import.meta.url).pathname;

// Find every HTML file except site/index.html (homepage already updated by hand)
const files = execSync(`find "${SITE}" -name '*.html' -not -path '${SITE}index.html'`, { encoding: 'utf8' })
  .trim().split('\n').filter(Boolean);

const NEW_NAV = `<nav class="nav nav--solid" id="nav">
    <div class="nav__inner">
        <a href="/" class="nav__logo" aria-label="Great Canadian Property Services — home">
            <img src="/assets/img/logo-lockup-light.svg" class="nav__logo-full" alt="Great Canadian Property Services">
            <img src="/assets/img/logo-mark.svg" class="nav__logo-mark" alt="">
        </a>
        <div class="nav__actions">
            <a href="/contact-us/" class="nav__cta">Get Assessment</a>
            <button class="nav__hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
        </div>
    </div>
</nav>`;

const NEW_DRAWER = `<div class="drawer-overlay" id="drawerOverlay"></div>
<div class="mobile-drawer" id="mobileDrawer">
    <a href="/residential-pressure-washing/" class="drawer-link">Residential</a>
    <a href="/commercial-pressure-washing/" class="drawer-link">Commercial</a>
    <a href="/residential-pressure-washing/concrete-cleaning/" class="drawer-link">Concrete Care</a>
    <a href="/window-cleaning/" class="drawer-link">Window Cleaning</a>
    <a href="/christmas-lighting/" class="drawer-link">Holiday Lighting</a>
    <a href="/near-me/" class="drawer-link">Service Areas</a>
    <a href="/reviews/" class="drawer-link">Reviews</a>
    <a href="/pressure-washing-articles/" class="drawer-link">Articles</a>
    <a href="/faq/" class="drawer-link">FAQ</a>
    <a href="/about-us/" class="drawer-link">About Us</a>
    <a href="/contact-us/" class="mobile-drawer__cta drawer-link">Request Assessment</a>
    <a href="tel:6042606285" class="mobile-drawer__phone drawer-link">604-260-6285</a>
</div>`;

const navRegex = /<nav class="nav nav--solid" id="nav">[\s\S]*?<\/nav>/;
const drawerRegex = /<div class="drawer-overlay" id="drawerOverlay"><\/div>\s*<div class="mobile-drawer" id="mobileDrawer">[\s\S]*?<\/div>/;
const faviconRegex = /<link rel="icon" href="\/assets\/img\/favicon\.ico">/;
const NEW_FAVICON = '<link rel="icon" type="image/svg+xml" href="/assets/img/favicon.svg">';

let updated = 0, skipped = 0;
for (const file of files) {
  let html = readFileSync(file, 'utf8');
  const before = html;

  if (navRegex.test(html)) html = html.replace(navRegex, NEW_NAV);
  if (drawerRegex.test(html)) html = html.replace(drawerRegex, NEW_DRAWER);
  if (faviconRegex.test(html)) html = html.replace(faviconRegex, NEW_FAVICON);

  if (html !== before) {
    writeFileSync(file, html);
    updated++;
    console.log('  updated', file.replace(SITE, ''));
  } else {
    skipped++;
    console.log('  skipped (no change)', file.replace(SITE, ''));
  }
}

console.log(`\nDone. ${updated} files updated, ${skipped} skipped.`);
