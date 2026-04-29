// Deploy site/ to GitHub Pages gh-pages branch with absolute-path rewriting.
//
// GitHub Pages serves project pages from /<repo-name>/, but our HTML uses
// production-ready absolute paths like /assets/img/foo.webp. Without rewriting,
// those resolve to the wrong host root and 404.
//
// This script:
//   1. Copies site/ to a temp folder
//   2. Rewrites every href="/...", src="/...", action="/...", url(/...)
//      to be prefixed with /<repo-name>/, except for protocol-relative,
//      external, mailto, tel, fragment-only links
//   3. Force-pushes the temp folder to the gh-pages branch on origin
//
// Usage: node scraper/deploy-pages.mjs

import { readFileSync, writeFileSync, readdirSync, statSync, cpSync, rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';
import { tmpdir } from 'node:os';

const REPO = 'gcps-rebuild';
const PREFIX = `/${REPO}`;
const SITE_SRC = new URL('../site/', import.meta.url).pathname;
const BUILD_DIR = join(tmpdir(), 'gcps-pages-build');
const REMOTE = 'https://github.com/b9will/gcps-rebuild.git';

// 1. Wipe + copy
rmSync(BUILD_DIR, { recursive: true, force: true });
cpSync(SITE_SRC, BUILD_DIR, { recursive: true });
console.log(`✓ Copied site/ → ${BUILD_DIR}`);

// 2. Walk text-asset files and rewrite paths
function walk(dir) {
  const out = [];
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (/\.(html|css|js|xml|txt|json)$/i.test(f)) out.push(p);
  }
  return out;
}

const files = walk(BUILD_DIR);
let touched = 0;

for (const file of files) {
  let content = readFileSync(file, 'utf8');
  const original = content;

  // Rewrite href/src/action attribute values that start with a single /
  // (skip //, http://, https://, mailto:, tel:, #, data:, javascript:)
  content = content.replace(
    /\b(href|src|action)=("|')(\/(?!\/)[^"'#]*)\2/g,
    (m, attr, q, path) => {
      if (path.startsWith(`${PREFIX}/`)) return m; // already prefixed
      return `${attr}=${q}${PREFIX}${path}${q}`;
    }
  );

  // Rewrite CSS url(/...) — covers url(/foo), url('/foo'), url("/foo")
  content = content.replace(
    /url\(\s*(["']?)(\/(?!\/)[^)"']*)\1\s*\)/g,
    (m, q, path) => {
      if (path.startsWith(`${PREFIX}/`)) return m;
      return `url(${q}${PREFIX}${path}${q})`;
    }
  );

  if (content !== original) {
    writeFileSync(file, content);
    touched++;
  }
}
console.log(`✓ Rewrote absolute paths in ${touched} files`);

// 3. Init temp git, commit, force-push to gh-pages
function sh(cmd, opts = {}) {
  return execSync(cmd, { cwd: BUILD_DIR, stdio: 'inherit', ...opts });
}

sh('git init -q -b gh-pages');
sh(`git remote add origin ${REMOTE}`);
sh('git add .');
sh('git -c user.name=deploy -c user.email=deploy@local commit -q -m "Pages deploy: prefix-rewritten site/"');
sh('git push --force --quiet origin gh-pages');

console.log('\n✓ Pushed gh-pages branch');
console.log(`  Live URL: https://b9will.github.io${PREFIX}/`);
console.log('  Pages will rebuild in ~30–90s');
