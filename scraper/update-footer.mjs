// Add Trident partner badge to the footer across every interior HTML page.
// Skips site/index.html (homepage already updated by hand).
import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const SITE = new URL('../site/', import.meta.url).pathname;

const files = execSync(`find "${SITE}" -name '*.html' -not -path '${SITE}index.html'`, { encoding: 'utf8' })
  .trim().split('\n').filter(Boolean);

const PARTNER_BLOCK = `<div class="footer__partners"><p class="footer__partners-label">Partner</p><a href="https://www.tridentprotects.com/" target="_blank" rel="noopener" class="footer__partner-link" aria-label="Trident — partner"><img src="/assets/img/partner-trident.svg" class="footer__partner-logo" alt="Trident"></a></div>`;

// Insert the partner block immediately before the existing footer__bottom div.
const insertRegex = /(<div class="footer__bottom">)/;

let updated = 0, skipped = 0;
for (const file of files) {
  let html = readFileSync(file, 'utf8');

  // Skip if already updated
  if (html.includes('footer__partners')) { skipped++; continue; }

  if (insertRegex.test(html)) {
    html = html.replace(insertRegex, `${PARTNER_BLOCK}$1`);
    writeFileSync(file, html);
    updated++;
    console.log('  updated', file.replace(SITE, ''));
  } else {
    skipped++;
    console.log('  skipped (no footer__bottom)', file.replace(SITE, ''));
  }
}

console.log(`\nDone. ${updated} files updated, ${skipped} skipped.`);
