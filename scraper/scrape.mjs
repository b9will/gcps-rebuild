/**
 * GCPS Full Site Scraper
 * Fetches all 48 pages from greatcanadianpropertyservices.ca
 * and saves clean HTML to ./scraped-pages/
 *
 * Usage: node scrape.mjs
 * Optional flags:
 *   --section=residential   only scrape that section
 *   --delay=800             ms between requests (default 600)
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, 'scraped-pages');
const DELAY_MS = parseInt(process.argv.find(a => a.startsWith('--delay='))?.split('=')[1] || '600');
const SECTION_FILTER = process.argv.find(a => a.startsWith('--section='))?.split('=')[1] || null;

const URLS = [
  // Core pages
  { url: 'https://www.greatcanadianpropertyservices.ca/', slug: 'home', section: 'core' },
  { url: 'https://www.greatcanadianpropertyservices.ca/about-us', slug: 'about-us', section: 'core' },
  { url: 'https://www.greatcanadianpropertyservices.ca/contact-us', slug: 'contact-us', section: 'core' },
  { url: 'https://www.greatcanadianpropertyservices.ca/gallery', slug: 'gallery', section: 'core' },
  { url: 'https://www.greatcanadianpropertyservices.ca/reviews', slug: 'reviews', section: 'core' },
  { url: 'https://www.greatcanadianpropertyservices.ca/privacy', slug: 'privacy', section: 'core' },
  { url: 'https://www.greatcanadianpropertyservices.ca/terms', slug: 'terms', section: 'core' },
  { url: 'https://www.greatcanadianpropertyservices.ca/sitemap', slug: 'sitemap', section: 'core' },

  // Service pages - top level
  { url: 'https://www.greatcanadianpropertyservices.ca/christmas-lighting', slug: 'christmas-lighting', section: 'core' },
  { url: 'https://www.greatcanadianpropertyservices.ca/window-cleaning', slug: 'window-cleaning', section: 'core' },

  // Residential
  { url: 'https://www.greatcanadianpropertyservices.ca/residential-pressure-washing', slug: 'residential/index', section: 'residential' },
  { url: 'https://www.greatcanadianpropertyservices.ca/residential-pressure-washing/house-washing', slug: 'residential/house-washing', section: 'residential' },
  { url: 'https://www.greatcanadianpropertyservices.ca/residential-pressure-washing/driveway-cleaning', slug: 'residential/driveway-cleaning', section: 'residential' },
  { url: 'https://www.greatcanadianpropertyservices.ca/residential-pressure-washing/concrete-cleaning', slug: 'residential/concrete-cleaning', section: 'residential' },
  { url: 'https://www.greatcanadianpropertyservices.ca/residential-pressure-washing/concrete-paver-sanding', slug: 'residential/concrete-paver-sanding', section: 'residential' },
  { url: 'https://www.greatcanadianpropertyservices.ca/residential-pressure-washing/concrete-paver-sealing', slug: 'residential/concrete-paver-sealing', section: 'residential' },
  { url: 'https://www.greatcanadianpropertyservices.ca/residential-pressure-washing/patio-cleaning', slug: 'residential/patio-cleaning', section: 'residential' },
  { url: 'https://www.greatcanadianpropertyservices.ca/residential-pressure-washing/roof-cleaning', slug: 'residential/roof-cleaning', section: 'residential' },
  { url: 'https://www.greatcanadianpropertyservices.ca/residential-pressure-washing/window-cleaning', slug: 'residential/window-cleaning', section: 'residential' },

  // Commercial
  { url: 'https://www.greatcanadianpropertyservices.ca/commercial-pressure-washing', slug: 'commercial/index', section: 'commercial' },
  { url: 'https://www.greatcanadianpropertyservices.ca/commercial-pressure-washing/building-washing', slug: 'commercial/building-washing', section: 'commercial' },
  { url: 'https://www.greatcanadianpropertyservices.ca/commercial-pressure-washing/fleet-washing', slug: 'commercial/fleet-washing', section: 'commercial' },
  { url: 'https://www.greatcanadianpropertyservices.ca/commercial-pressure-washing/gutter-cleaning', slug: 'commercial/gutter-cleaning', section: 'commercial' },
  { url: 'https://www.greatcanadianpropertyservices.ca/commercial-pressure-washing/industrial-pressure-washing', slug: 'commercial/industrial-pressure-washing', section: 'commercial' },
  { url: 'https://www.greatcanadianpropertyservices.ca/commercial-pressure-washing/window-cleaning', slug: 'commercial/window-cleaning', section: 'commercial' },

  // Near me (location pages)
  { url: 'https://www.greatcanadianpropertyservices.ca/near-me', slug: 'near-me/index', section: 'near-me' },
  { url: 'https://www.greatcanadianpropertyservices.ca/near-me/vancouver-bc-pressure-washing', slug: 'near-me/vancouver', section: 'near-me' },
  { url: 'https://www.greatcanadianpropertyservices.ca/near-me/surrey-bc-pressure-washing', slug: 'near-me/surrey', section: 'near-me' },
  { url: 'https://www.greatcanadianpropertyservices.ca/near-me/richmond-bc-pressure-washing', slug: 'near-me/richmond', section: 'near-me' },
  { url: 'https://www.greatcanadianpropertyservices.ca/near-me/coquitlam-bc-pressure-washing', slug: 'near-me/coquitlam', section: 'near-me' },
  { url: 'https://www.greatcanadianpropertyservices.ca/near-me/delta-bc-pressure-washing', slug: 'near-me/delta', section: 'near-me' },
  { url: 'https://www.greatcanadianpropertyservices.ca/near-me/langley-bc-pressure-washing', slug: 'near-me/langley', section: 'near-me' },
  { url: 'https://www.greatcanadianpropertyservices.ca/near-me/maple-ridge-bc-pressure-washing', slug: 'near-me/maple-ridge', section: 'near-me' },
  { url: 'https://www.greatcanadianpropertyservices.ca/near-me/north-vancouver-bc-pressure-washing', slug: 'near-me/north-vancouver', section: 'near-me' },
  { url: 'https://www.greatcanadianpropertyservices.ca/near-me/west-vancouver-bc-pressure-washing', slug: 'near-me/west-vancouver', section: 'near-me' },
  { url: 'https://www.greatcanadianpropertyservices.ca/near-me/white-rock-bc-pressure-washing', slug: 'near-me/white-rock', section: 'near-me' },
  { url: 'https://www.greatcanadianpropertyservices.ca/near-me/abbotsford-bc-pressure-washing', slug: 'near-me/abbotsford', section: 'near-me' },
  { url: 'https://www.greatcanadianpropertyservices.ca/near-me/chilliwack-bc-pressure-washing', slug: 'near-me/chilliwack', section: 'near-me' },
  { url: 'https://www.greatcanadianpropertyservices.ca/near-me/squamish-bc-pressure-washing', slug: 'near-me/squamish', section: 'near-me' },
  { url: 'https://www.greatcanadianpropertyservices.ca/near-me/whistler-bc-pressure-washing', slug: 'near-me/whistler', section: 'near-me' },

  // Articles
  { url: 'https://www.greatcanadianpropertyservices.ca/pressure-washing-articles', slug: 'articles/index', section: 'articles' },
  { url: 'https://www.greatcanadianpropertyservices.ca/pressure-washing-articles/a-pressure-washing-pro-will-help-you-take-back-your-weekends', slug: 'articles/pressure-washing-pro-weekends', section: 'articles' },
  { url: 'https://www.greatcanadianpropertyservices.ca/pressure-washing-articles/concrete-and-paver-sealing-protects-your-hardscaped-surfaces', slug: 'articles/concrete-paver-sealing', section: 'articles' },
  { url: 'https://www.greatcanadianpropertyservices.ca/pressure-washing-articles/lighten-your-holiday-load-with-professional-christmas-lighting-installation', slug: 'articles/holiday-lighting-installation', section: 'articles' },
  { url: 'https://www.greatcanadianpropertyservices.ca/pressure-washing-articles/how-much-does-holiday-lighting-cost-in-surrey-bc', slug: 'articles/holiday-lighting-cost-surrey', section: 'articles' },
  { url: 'https://www.greatcanadianpropertyservices.ca/pressure-washing-articles/professional-window-cleaning-surrey-storefronts', slug: 'articles/window-cleaning-surrey-storefronts', section: 'articles' },
  { url: 'https://www.greatcanadianpropertyservices.ca/pressure-washing-articles/water-fed-poles-vs-traditional-squeegees-which-window-cleaning-method-works-best-for-homes', slug: 'articles/water-fed-poles-vs-squeegees', section: 'articles' },
  { url: 'https://www.greatcanadianpropertyservices.ca/pressure-washing-articles/how-often-should-you-clean-your-homes-windows-in-a-rainy-coastal-climate', slug: 'articles/how-often-clean-windows-coastal', section: 'articles' },

  // Gallery
  { url: 'https://www.greatcanadianpropertyservices.ca/gallery/project-spotlight-a-traditional-holiday-wonderland-illuminating-home-and-garden', slug: 'gallery/holiday-wonderland', section: 'gallery' },
];

async function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function fetchPage(entry) {
  const res = await fetch(entry.url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-CA,en;q=0.9',
    }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

async function run() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  // Create section subdirs
  for (const section of ['residential', 'commercial', 'near-me', 'articles', 'gallery']) {
    await fs.mkdir(path.join(OUT_DIR, section), { recursive: true });
  }

  const targets = SECTION_FILTER
    ? URLS.filter(u => u.section === SECTION_FILTER)
    : URLS;

  console.log(`\n GCPS Scraper`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(` Fetching ${targets.length} pages  |  ${DELAY_MS}ms delay`);
  if (SECTION_FILTER) console.log(` Section filter: ${SECTION_FILTER}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

  let success = 0;
  let failed = 0;
  const errors = [];

  for (let i = 0; i < targets.length; i++) {
    const entry = targets[i];
    const outPath = path.join(OUT_DIR, `${entry.slug}.html`);

    // Ensure parent dir exists
    await fs.mkdir(path.dirname(outPath), { recursive: true });

    try {
      const html = await fetchPage(entry);
      await fs.writeFile(outPath, html, 'utf8');
      const kb = Math.round(Buffer.byteLength(html, 'utf8') / 1024);
      console.log(` ✓  [${String(i + 1).padStart(2, '0')}/${targets.length}]  ${entry.slug.padEnd(45)} ${kb}kb`);
      success++;
    } catch (err) {
      console.log(` ✗  [${String(i + 1).padStart(2, '0')}/${targets.length}]  ${entry.slug.padEnd(45)} ERROR: ${err.message}`);
      errors.push({ slug: entry.slug, url: entry.url, error: err.message });
      failed++;
    }

    if (i < targets.length - 1) await delay(DELAY_MS);
  }

  // Write manifest
  const manifest = {
    scraped: new Date().toISOString(),
    total: targets.length,
    success,
    failed,
    errors,
    pages: targets.map(t => ({
      slug: t.slug,
      section: t.section,
      url: t.url,
      file: `${t.slug}.html`,
    }))
  };
  await fs.writeFile(path.join(OUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(` Done. ${success} succeeded, ${failed} failed.`);
  console.log(` Output: ./scraped-pages/`);
  console.log(` Manifest: ./scraped-pages/manifest.json`);
  if (errors.length) {
    console.log(`\n Failed pages:`);
    errors.forEach(e => console.log(`   - ${e.slug}: ${e.error}`));
  }
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
}

run().catch(console.error);
