#!/usr/bin/env node
// Mengisi data paket (Gratis / Pro) di halaman situs dari sumber yang sama
// dengan aplikasi, supaya situs tidak pernah berbeda dari layar Pro.
//
//   node tools/sync-paket.mjs          perbarui halaman + paket.json
//   node tools/sync-paket.mjs --check  gagal (exit 1) bila situs tidak sinkron
//
// Sumber (path bisa diganti lewat env):
//   RANCOB_APP   (default ~/Projects/agri-research-app)
//     packages/agri_core/lib/src/plan.dart   batas Gratis, tenggang offline
//     lib/l10n/strings.dart                  teks layar Pro (ID dan EN)
//     lib/data/billing.dart                  ID produk
//     supabase/migrations/*.sql              tenggang kolaborasi, batas anggota
//   RANCOB_STORE (default ~/Projects/rancob-store)
//     listing-id.md                          lama uji coba gratis (diatur di Play)
//
// Di HTML, nilai ditaruh di antara penanda:
//   <!--paket:KUNCI-->…<!--/paket:KUNCI-->
// Harga tidak ditulis di situs: aplikasi juga mengambilnya dari Google Play.

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { homedir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const site = join(dirname(fileURLToPath(import.meta.url)), '..');
const app = process.env.RANCOB_APP ?? join(homedir(), 'Projects/agri-research-app');
const store = process.env.RANCOB_STORE ?? join(homedir(), 'Projects/rancob-store');
const check = process.argv.includes('--check');

const read = (p) => readFileSync(p, 'utf8');
function must(m, what) {
  if (!m) throw new Error(`Tidak ketemu: ${what}`);
  return m;
}

// --- plan.dart ---------------------------------------------------------
const plan = read(join(app, 'packages/agri_core/lib/src/plan.dart'));
const freeLimit = +must(plan.match(/const freeActiveLimit = (\d+);/), 'freeActiveLimit')[1];
const offlineGraceDays = +must(
  plan.match(/const offlineGrace = Duration\(days: (\d+)\);/),
  'offlineGrace',
)[1];

// --- billing.dart ------------------------------------------------------
const billing = read(join(app, 'lib/data/billing.dart'));
const product = (name) =>
  must(billing.match(new RegExp(`static const ${name} = '([^']+)';`)), name)[1];
const products = { semester: product('semester'), year: product('year') };

// --- migrasi Supabase ---------------------------------------------------
const migDir = join(app, 'supabase/migrations');
const migrations = readdirSync(migDir).filter((f) => f.endsWith('.sql')).sort();
let collabGraceDays, memberCap;
for (const f of migrations) {
  const sql = read(join(migDir, f));
  const g = sql.match(/pro_until \+ interval '(\d+) days'/);
  if (g) collabGraceDays = +g[1];
  const c = sql.match(/member_cap constant int:=(\d+);/);
  if (c) memberCap = +c[1];
}
must(collabGraceDays, 'tenggang kolaborasi di migrasi');
must(memberCap, 'member_cap di migrasi');

// --- listing toko -------------------------------------------------------
const listing = read(join(store, 'listing-id.md'));
const trialWeeks = +must(listing.match(/uji coba gratis (\d+) pekan/), 'uji coba di listing-id.md')[1];

// --- strings.dart -------------------------------------------------------
const strings = read(join(app, 'lib/l10n/strings.dart'));
const enStart = strings.indexOf('class _En extends S');
const idStart = strings.indexOf('class _Id extends S');
must(enStart > 0 && idStart > enStart, 'kelas _En dan _Id');
const blocks = { en: strings.slice(enStart, idStart), id: strings.slice(idStart) };

function dartString(block, name, args = '') {
  const sig = args ? `String ${name}\\(${args}\\)` : `String get ${name}`;
  const m = must(
    block.match(new RegExp(`${sig} =>\\s*'((?:[^'\\\\]|\\\\.)*)';`)),
    `${name} di strings.dart`,
  );
  return m[1].replace(/\\(['$\\])/g, '$1');
}

const text = {};
for (const lang of ['id', 'en']) {
  const b = blocks[lang];
  const t = (n) => dartString(b, n);
  text[lang] = {
    planFree: t('planFree'),
    proTitle: t('proTitle'),
    proSubtitle: t('proSubtitle'),
    proRowActive: t('proRowActive'),
    proRowCore: t('proRowCore'),
    proRowSync: t('proRowSync'),
    proRowCollab: t('proRowCollab'),
    unlimited: t('unlimited'),
    perSemester: t('perSemester'),
    semesterLength: t('semesterLength'),
    perYear: t('perYear'),
    yearLength: t('yearLength'),
    priceFromStore: t('priceFromStore'),
    dataNeverLocked: t('dataNeverLocked'),
    freeLimitTitle: t('freeLimitTitle'),
    freeLimitBody: t('freeLimitBody'),
    collabProRequiredBody: t('collabProRequiredBody'),
    subscriptionTerms: dartString(b, 'subscriptionTerms', 'String store').replace(
      /\$store|\$\{store\}/g,
      'Google Play',
    ),
    trialTerms: t('trialTerms'),
  };
}

// --- render -------------------------------------------------------------
const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// "Sinkron multi-device · segera" → label + lencana "segera".
const SOON = { id: 'segera', en: 'soon' };
function rowLabel(label, lang) {
  const suffix = ` · ${SOON[lang]}`;
  return label.endsWith(suffix)
    ? `${esc(label.slice(0, -suffix.length))} <span class="soon">${SOON[lang]}</span>`
    : esc(label);
}

function table(lang) {
  const s = text[lang];
  const yes = '<span class="yes" aria-label="ya">✓</span>';
  const no = '<span class="no" aria-label="tidak">–</span>';
  const rows = [
    [s.proRowActive, esc(freeLimit), esc(s.unlimited)],
    [s.proRowCore, yes, yes],
    [s.proRowSync, no, yes],
    [s.proRowCollab, no, yes],
  ];
  return [
    '',
    '<table class="compare">',
    `  <thead><tr><th scope="col"><span class="sr">${lang === 'id' ? 'Fitur' : 'Feature'}</span></th><th scope="col">${esc(s.planFree)}</th><th scope="col" class="pro">Pro</th></tr></thead>`,
    '  <tbody>',
    ...rows.map(
      ([l, f, p]) =>
        `    <tr><th scope="row">${rowLabel(l, lang)}</th><td>${f}</td><td class="pro">${p}</td></tr>`,
    ),
    '  </tbody>',
    '</table>',
    '',
  ].join('\n');
}

function offers(lang) {
  const s = text[lang];
  const card = (name, len) =>
    `  <div class="offer"><strong>${esc(name)}</strong><span>${esc(len)}</span><span class="price">${esc(s.priceFromStore)}</span></div>`;
  return ['', '<div class="offers">', card(s.perSemester, s.semesterLength), card(s.perYear, s.yearLength), '</div>', ''].join('\n');
}

const values = {
  'batas-gratis': esc(freeLimit),
  'tenggang-offline': esc(offlineGraceDays),
  'tenggang-kolaborasi': esc(collabGraceDays),
  'maks-anggota': esc(memberCap),
  'uji-coba-pekan': esc(trialWeeks),
};
for (const lang of ['id', 'en']) {
  const s = text[lang];
  Object.assign(values, {
    [`tabel-${lang}`]: table(lang),
    [`periode-${lang}`]: offers(lang),
    [`ketentuan-${lang}`]: esc(`${s.subscriptionTerms} ${s.trialTerms}`),
    [`data-aman-${lang}`]: esc(s.dataNeverLocked),
    [`pro-untuk-${lang}`]: esc(s.proSubtitle),
    [`batas-judul-${lang}`]: esc(s.freeLimitTitle),
    [`batas-isi-${lang}`]: esc(s.freeLimitBody),
    [`undang-${lang}`]: esc(s.collabProRequiredBody),
  });
}

// --- tulis --------------------------------------------------------------
const marker = /<!--paket:([\w-]+)-->[\s\S]*?<!--\/paket:\1-->/g;
const stale = [];
const used = new Set();
for (const f of readdirSync(site).filter((f) => f.endsWith('.html'))) {
  const path = join(site, f);
  const before = read(path);
  const after = before.replace(marker, (_, key) => {
    if (!(key in values)) throw new Error(`${f}: kunci tidak dikenal paket:${key}`);
    used.add(key);
    return `<!--paket:${key}-->${values[key]}<!--/paket:${key}-->`;
  });
  if (after !== before) {
    stale.push(f);
    if (!check) writeFileSync(path, after);
  }
}

let appCommit = 'unknown';
try {
  appCommit = execFileSync('git', ['-C', app, 'rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim();
} catch {}
const snapshot =
  JSON.stringify(
    {
      catatan: 'Dibuat oleh tools/sync-paket.mjs. Jangan diedit manual.',
      sumber: { aplikasi: appCommit },
      gratis: { percobaanAktif: freeLimit },
      pro: {
        percobaanAktif: 'tak terbatas',
        produk: products,
        harga: 'dari Google Play (tidak ditulis di aplikasi maupun situs)',
        ujiCobaPekan: trialWeeks,
        tenggangOfflineHari: offlineGraceDays,
        tenggangKolaboratorHari: collabGraceDays,
        maksAnggotaPerPercobaan: memberCap,
      },
      teks: text,
    },
    null,
    2,
  ) + '\n';
const jsonPath = join(site, 'paket.json');
let oldJson = '';
try {
  oldJson = read(jsonPath);
} catch {}
// Bandingkan tanpa commit aplikasi agar commit baru yang tidak mengubah paket tidak dianggap beda.
const strip = (s) => s.replace(/"aplikasi": "[^"]*"/, '');
if (strip(oldJson) !== strip(snapshot)) {
  stale.push('paket.json');
  if (!check) writeFileSync(jsonPath, snapshot);
}

const unused = Object.keys(values).filter((k) => !used.has(k));
if (check) {
  if (stale.length) {
    console.error(`Situs tidak sinkron dengan aplikasi: ${stale.join(', ')}\nJalankan: node tools/sync-paket.mjs`);
    process.exit(1);
  }
  console.log(`Sinkron dengan aplikasi @ ${appCommit}.`);
} else {
  console.log(stale.length ? `Diperbarui: ${stale.join(', ')}` : 'Sudah sinkron.');
}
if (unused.length) console.log(`(kunci belum dipakai: ${unused.join(', ')})`);
