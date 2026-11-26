#!/usr/bin/env node
// Checks every internal link and #anchor in the static site: node tools/check-links.mjs
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const site = join(dirname(fileURLToPath(import.meta.url)), '..');
const pages = [...readdirSync(site).filter((f) => f.endsWith('.html')), 'app/index.html', 'akun/index.html', 'penguji/index.html'];
const html = Object.fromEntries(pages.map((p) => [p, readFileSync(join(site, p), 'utf8')]));
const ids = (src) => new Set([...src.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));

const bad = [];
let checked = 0;
for (const page of pages) {
  for (const m of html[page].matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const url = m[1];
    if (/^(https?:|mailto:|data:)/.test(url)) continue;
    const [file, hash] = url.split('#');
    const target = file === '' ? page : relative(site, resolve(site, dirname(page), file === './' ? '.' : file));
    const resolved = existsSync(join(site, target)) && !target.endsWith('.html') && target !== '' && !target.endsWith('/') ? target
      : (target === '' || target.endsWith('/') ? join(target, 'index.html') : target);
    checked++;
    if (!existsSync(join(site, resolved))) { bad.push(`${page}: ${url} -> missing ${resolved}`); continue; }
    // App hash routes (#/...) are handled by the app's router, not anchors.
    if (hash && !hash.startsWith('/') && resolved.endsWith('.html')) {
      const src = html[resolved] ?? readFileSync(join(site, resolved), 'utf8');
      if (!ids(src).has(hash)) bad.push(`${page}: ${url} -> no #${hash} in ${resolved}`);
    }
  }
}
if (bad.length) { console.error(bad.join('\n')); process.exit(1); }
console.log(`${checked} internal links and anchors OK in ${pages.length} pages.`);
