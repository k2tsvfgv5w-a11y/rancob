// Staged Public Experiment Summary Viewer (zero innerHTML, privacy-safe).
// Reads a sanitized summary via Supabase RPC `rancob_get_published_summary`
// when `?s=<slug>` is supplied, or renders an offline preview demo when `?demo=1`.

import { h, append, clear, download, slug as toSlug } from '../app/js/dom.js';

export const SUPABASE_URL = 'https://wxfvupvzxiudmmeyjxqw.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4ZnZ1cHZ6eGl1ZG1tZXlqeHF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzMDIwMTIsImV4cCI6MjA5NDg3ODAxMn0.Y1s8zF_G7hP6M4V_t9X3W6bL9c_placeholder_replace_on_release';

export const FIELD_LABELS = {
  agronomy: 'Agronomi & Hortikultura',
  plant_protection: 'Proteksi Tanaman',
  soil: 'Ilmu Tanah',
  forestry: 'Kehutanan',
  livestock: 'Peternakan',
  fisheries: 'Perikanan & Akuakultur',
  food_tech: 'Teknologi Pangan',
  general: 'Umum',
};

export const DEMO_SUMMARY = {
  slug: 'demo-biofungisida-padi',
  field_profile: 'plant_protection',
  visibility: 'gallery',
  moderation_status: 'approved',
  title: 'Contoh: Uji Efektivitas Biofungisida Hawar Daun Padi',
  subject: 'Padi',
  location_general: 'Bogor, Jawa Barat',
  design: 'rcbd',
  factor_count: 1,
  reps: 4,
  treatment_count: 4,
  author_display: 'Contoh Referensi Rancob',
  affiliation: 'Rancob Agrokompleks',
  academic_year: 2026,
  published_at: '2026-11-28T00:00:00Z',
  photos: [],
  template_payload: {
    schemaVersion: 1,
    fieldProfile: 'plant_protection',
    design: 'rcbd',
    factorCount: 1,
    reps: 4,
    subject: 'Padi',
    treatments: [
      { code: 'K0', description: 'Kontrol tanpa fungisida' },
      { code: 'B1', description: 'Trichoderma 5 g/L' },
      { code: 'B2', description: 'Trichoderma 10 g/L' },
      { code: 'F1', description: 'Fungisida kimia pembanding' },
    ],
    parameters: [{ name: 'Intensitas serangan', unit: '%', samplesPerUnit: 1 }],
    scheduleDays: [14, 28, 42],
    includeHarvest: false,
  },
  summary_payload: {
    schemaVersion: 1,
    fieldProfile: 'plant_protection',
    treatments: [
      { code: 'K0', description: 'Kontrol tanpa fungisida' },
      { code: 'B1', description: 'Trichoderma 5 g/L' },
      { code: 'B2', description: 'Trichoderma 10 g/L' },
      { code: 'F1', description: 'Fungisida kimia pembanding' },
    ],
    parameters: [{ name: 'Intensitas serangan', unit: '%', samplesPerUnit: 1 }],
    scheduleDays: [14, 28, 42],
    results: [
      {
        parameter: 'Intensitas serangan',
        session: '28 HST',
        unit: '%',
        transform: 'arcsin_pct',
        normality: { w: 0.975, p: 0.906, n: 16 },
        homogeneity: { f: 6.913, p: 0.006, df1: 3, df2: 12 },
        anova: {
          design: 'RCBD',
          grandMean: 26.8,
          cv: 8.7,
          rows: [
            { source: 'Kelompok', df: 3, ss: 90.15, ms: 30.05, f: 5.54, sig: '*' },
            { source: 'Perlakuan', df: 3, ss: 3154.2, ms: 1051.4, f: 193.9, sig: '**' },
            { source: 'Galat', df: 9, ss: 48.8, ms: 5.42, f: null, sig: '' },
            { source: 'Total', df: 15, ss: 3293.1, ms: null, f: null, sig: '' },
          ],
        },
        postHoc: {
          test: 'DMRT (Duncan)',
          alpha: 0.05,
          ranked: [
            { trt: 'K0', mean: 53.5, letters: 'a' },
            { trt: 'B1', mean: 27.5, letters: 'b' },
            { trt: 'B2', mean: 10.5, letters: 'c' },
            { trt: 'F1', mean: 2.88, letters: 'd' },
          ],
        },
      },
    ],
  },
};

const fmtNum = (v, d = 2) => (v === null || v === undefined ? '' : Number(v).toFixed(d).replace('.', ','));

export function renderSummary(root, data) {
  const sp = data.summary_payload ?? {};
  const designText = data.design === 'rcbd' ? 'Rancangan Acak Kelompok (RAK)' : 'Rancangan Acak Lengkap (RAL)';
  const fieldText = FIELD_LABELS[data.field_profile] ?? 'Umum';
  const treatments = sp.treatments ?? [];
  const params = sp.parameters ?? [];
  const results = sp.results ?? [];

  const nodes = [
    h('p', {}, h('a', { href: '../galeri/' }, '← Galeri Referensi')),
    h('h1', {}, data.title),
    h('div', { class: 'pub-meta' },
      h('span', { class: 'pill accent' }, fieldText),
      h('span', { class: 'pill' }, designText),
      h('span', { class: 'pill' }, `${data.treatment_count} perlakuan × ${data.reps} ulangan`),
      data.subject ? h('span', { class: 'muted small' }, data.subject) : null,
      data.location_general ? h('span', { class: 'muted small' }, `· ${data.location_general}`) : null),
    data.author_display || data.affiliation
      ? h('p', { class: 'muted small' }, [data.author_display, data.affiliation, data.academic_year].filter(Boolean).join(' · '))
      : null,
    h('p', { class: 'pub-disclaimer' },
      'Ringkasan percobaan lapangan (bukan artikel peer-reviewed). Hanya profil, rancangan, dan hasil analisis agregat yang dibagikan — data mentah per plot tetap privat milik peneliti.'),
    h('div', { class: 'actions' },
      h('button', {
        type: 'button',
        class: 'btn primary',
        onclick: () => download(`${toSlug(data.title)}.rancob-template.json`, JSON.stringify(data.template_payload, null, 2), 'application/json'),
      }, 'Unduh Templat Rancangan (.json)'),
      h('a', { class: 'btn ghost', href: '../app/#/baru' }, 'Buka di Rancob Web')),
    h('h2', {}, 'Perlakuan & Parameter'),
    h('div', { class: 'table-scroll' }, h('table', { class: 'plain' },
      h('thead', {}, h('tr', {}, h('th', {}, 'Kode'), h('th', {}, 'Keterangan'))),
      h('tbody', {}, treatments.map((t) => h('tr', {}, h('td', {}, h('strong', {}, t.code)), h('td', {}, t.description || '–')))))),
    params.length
      ? h('p', { class: 'muted small' }, `Parameter: ${params.map((p) => `${p.name}${p.unit ? ` (${p.unit})` : ''}`).join(', ')}${sp.scheduleDays?.length ? ` · Jadwal: ${sp.scheduleDays.join(', ')} HST` : ''}`)
      : null,
  ];

  for (const res of results) {
    nodes.push(h('h2', {}, `${res.parameter}${res.session ? ` · ${res.session}` : ''}`));
    if (res.anova) {
      nodes.push(h('div', { class: 'table-scroll' }, h('table', { class: 'plain' },
        h('thead', {}, h('tr', {}, ['Sumber', 'db', 'JK', 'KT', 'F'].map((c, i) => h('th', { class: i ? 'n' : '' }, c)))),
        h('tbody', {}, (res.anova.rows ?? []).map((row) => h('tr', { class: String(row.sig ?? '').startsWith('*') ? 'hi' : '' },
          h('th', { scope: 'row' }, row.source),
          h('td', { class: 'n' }, row.df),
          h('td', { class: 'n' }, fmtNum(row.ss)),
          h('td', { class: 'n' }, row.ms === null ? '' : fmtNum(row.ms)),
          h('td', { class: 'n' }, row.f === null ? '' : `${fmtNum(row.f)} ${row.sig || ''}`)))))),
        h('p', { class: 'muted small' }, `KK = ${fmtNum(res.anova.cv, 1)}%${res.transform && res.transform !== 'none' ? ` · Transformasi: ${res.transform}` : ''}`));
    }
    if (res.postHoc) {
      nodes.push(h('div', { class: 'table-scroll' }, h('table', { class: 'plain' },
        h('thead', {}, h('tr', {}, h('th', {}, 'Perlakuan'), h('th', { class: 'n' }, `Rata-rata${res.unit ? ` (${res.unit})` : ''}`), h('th', {}, 'Huruf'))),
        h('tbody', {}, (res.postHoc.ranked ?? []).map((x) => h('tr', {},
          h('th', { scope: 'row' }, h('strong', {}, x.trt)),
          h('td', { class: 'n' }, fmtNum(x.mean)),
          h('td', { class: 'letters' }, x.letters)))))));
    }
  }

  if (Array.isArray(data.photos) && data.photos.length) {
    nodes.push(h('h2', {}, 'Dokumentasi Lapangan'),
      h('div', { class: 'pub-photos' }, data.photos.map((ph) => h('figure', {},
        h('img', { src: `${SUPABASE_URL}/storage/v1/object/public/rancob-public-summaries/${encodeURI(ph.key)}`, alt: ph.caption || data.title, loading: 'lazy' }),
        ph.caption ? h('figcaption', {}, ph.caption) : null))));
  }

  append(clear(root), nodes);
}

async function boot() {
  const root = document.getElementById('viewer');
  if (!root) return;
  const params = new URLSearchParams(location.search);
  const s = params.get('s');
  if (params.get('demo') === '1' || !s) {
    renderSummary(root, DEMO_SUMMARY);
    return;
  }
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/rancob_get_published_summary`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: SUPABASE_ANON_KEY },
      body: JSON.stringify({ p_slug: s }),
    });
    const data = res.ok ? await res.json() : null;
    if (!data) {
      append(clear(root), h('h1', {}, 'Ringkasan tidak ditemukan'), h('p', { class: 'muted' }, 'Tautan mungkin salah atau sudah ditarik oleh peneliti.'));
      return;
    }
    renderSummary(root, data);
  } catch {
    append(clear(root), h('h1', {}, 'Gagal memuat ringkasan'), h('p', { class: 'muted' }, 'Periksa koneksi internet Anda lalu coba muat ulang.'));
  }
}

if (typeof document !== 'undefined') boot();
