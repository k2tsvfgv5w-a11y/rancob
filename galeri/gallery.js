// Staged Curated Reference Gallery scaffold (zero innerHTML).
// Filters approved published summaries by agro-complex field profile.

import { h, append, clear } from '../app/js/dom.js';
import { FIELD_LABELS, DEMO_SUMMARY } from '../p/viewer.js';

const FIELDS = ['all', 'agronomy', 'plant_protection', 'soil', 'forestry', 'livestock', 'fisheries', 'food_tech'];
let activeField = 'all';

const SAMPLE_ITEMS = [DEMO_SUMMARY];

function render(root, items) {
  const shown = activeField === 'all' ? items : items.filter((x) => x.field_profile === activeField);
  append(clear(root),
    h('h1', {}, 'Galeri Referensi Percobaan'),
    h('p', { class: 'lead' }, 'Contoh rancangan percobaan, parameter pengamatan, dan ringkasan hasil analisis dari peneliti lintas bidang agrokompleks — tanpa data mentah.'),
    h('div', { class: 'pub-chips', role: 'group', 'aria-label': 'Filter bidang' },
      FIELDS.map((code) => h('button', {
        type: 'button',
        class: 'pub-chip',
        'aria-pressed': activeField === code,
        onclick: () => { activeField = code; render(root, items); },
      }, code === 'all' ? 'Semua bidang' : FIELD_LABELS[code]))),
    shown.length
      ? h('div', { class: 'pub-grid' }, shown.map((item) => h('a', { class: 'pub-card', href: `../p/?demo=1` },
        h('span', { class: 'pill accent' }, FIELD_LABELS[item.field_profile] ?? 'Umum'),
        h('strong', {}, item.title),
        h('span', { class: 'muted small' }, `${item.design === 'rcbd' ? 'RAK' : 'RAL'} · ${item.treatment_count} perlakuan × ${item.reps} ulangan`),
        h('span', { class: 'muted small' }, [item.subject, item.location_general].filter(Boolean).join(' · ')))))
      : h('p', { class: 'muted' }, 'Belum ada referensi terpublikasi untuk bidang ini.'));
}

if (typeof document !== 'undefined') {
  const root = document.getElementById('galeri');
  if (root) render(root, SAMPLE_ITEMS);
}
