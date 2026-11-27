// Rancob Web views. Each view returns a DOM node; `ctx` carries the shared services.
import * as M from './model.js';
import { h, svgEl, append, clear, download, slug } from './dom.js';

const TESTS = ['dmrt', 'tukey', 'lsd'];
const SERIES_COLORS = ['#1f6b3a', '#b45309', '#1d4ed8', '#9f1239', '#6d28d9', '#0f766e', '#c2410c', '#4b5563'];
const NEW_ROW = () => ({ code: '', description: '' });

export function createViews(ctx) {
  const { core, store, t } = ctx;
  const fmt = () => ctx.fmt();
  const sels = new Map(); // per-experiment UI selection (session, parameter, test, alpha, factorial view)

  // ---------------------------------------------------------------- shared

  const sortedSessions = (e) => [...e.sessions].sort((a, b) => (a.dap ?? 1e9) - (b.dap ?? 1e9));

  function sessionLabel(e, s) {
    if (s.harvest) return s.dap !== null && s.dap !== undefined ? t('entry.harvestDap', { dap: s.dap }) : t('entry.harvestLabel');
    if (s.dap !== null && s.dap !== undefined) return t('entry.dapLabel', { dap: s.dap });
    return t('entry.obsLabel', { n: sortedSessions(e).indexOf(s) + 1 });
  }

  function selFor(e) {
    let s = sels.get(e.id);
    if (!s) sels.set(e.id, (s = { sid: null, pid: null, test: 'dmrt', alpha: 0.05, view: null, focusPlot: null, transform: 'none', nonParametric: false, showSe: true, focusTrt: null }));
    const sessions = sortedSessions(e);
    if (!sessions.some((x) => x.id === s.sid)) s.sid = sessions[0]?.id ?? null;
    if (!e.parameters.some((x) => x.id === s.pid)) s.pid = e.parameters[0]?.id ?? null;
    return s;
  }

  const designName = (e, full = false) => {
    const base = t(`design.${e.design}${full ? '.full' : ''}`);
    return M.isFactorial(e) ? `${t('design.factorial', { n: e.factors.length })} · ${base}` : base;
  };

  const alphaText = (a) => (ctx.lang() === 'id' ? String(a).replace('.', ',') : String(a));

  const tag = (text, cls = '') => h('span', { class: `pill ${cls}`.trim() }, text);

  function field(label, input, hint) {
    return h('label', { class: 'field' }, h('span', { class: 'field-label' }, label), input, hint ? h('span', { class: 'field-hint' }, hint) : null);
  }

  function tableWrap(...kids) {
    return h('div', { class: 'table-scroll' }, ...kids);
  }

  const treatmentDesc = (e, code) => e.treatments.find((x) => x.code === code)?.description ?? '';

  function colorIndex(e, plot) {
    if (M.isFactorial(e)) {
      const a = e.factors[0].levels.findIndex((l) => l.code === e.treatments[plot.t].levels[0]);
      return Math.max(a, 0) % 8;
    }
    return plot.t % 8;
  }

  // ------------------------------------------------------------------ home

  function home() {
    const { experiments } = store.state;
    const limit = ctx.info.freeActiveLimit;
    const active = M.activeCount(store.state);
    const example = experiments.find((e) => e.isSample);

    const fileInput = h('input', {
      type: 'file', accept: '.json,application/json', class: 'sr', tabindex: '-1', 'aria-label': t('home.import'),
      onchange: async () => {
        const file = fileInput.files[0];
        if (!file) return;
        try {
          const e = M.fromBackup(await file.text());
          if (!M.canActivate(core, store.state)) e.archived = true;
          store.add(e);
          ctx.say(e.archived ? t('home.importArchived') : t('home.importOk'));
          ctx.go(`#/e/${e.id}/layout`);
        } catch {
          ctx.say(t('home.importFail'), true);
        }
        fileInput.value = '';
      },
    });

    const card = (e) => {
      const sessions = sortedSessions(e);
      const prog = e.parameters.length && sessions.length ? M.progress(e, sessions[0].id, e.parameters[0].id) : null;
      return h('a', { class: 'exp-card', href: `#/e/${e.id}/layout` },
        h('span', { class: 'exp-head' }, h('strong', {}, e.title),
          h('span', { class: 'exp-tags' }, tag(designName(e)), e.isSample ? tag(t('tag.example'), 'accent') : null, e.archived ? tag(t('tag.archived'), 'accent') : null)),
        h('span', { class: 'muted small' }, [e.crop, e.location].filter(Boolean).join(' · ') || ' '),
        prog ? h('span', { class: 'muted small' }, t('home.progress', prog)) : null);
    };

    return h('div', {},
      h('h1', {}, t('home.title')),
      h('p', { class: 'lead' }, t('home.lead')),
      store.persistent ? null : h('div', { class: 'card note', role: 'alert' }, t('home.noStorage')),
      h('div', { class: 'card soft' }, h('strong', {}, t('home.localTitle')), h('p', {}, t('home.localBody'))),
      h('div', { class: 'actions' },
        h('a', { class: 'btn primary', href: '#/baru' }, t('home.new')),
        example
          ? h('a', { class: 'btn ghost', href: `#/e/${example.id}/analysis` }, t('home.openExample'))
          : h('button', { class: 'btn ghost', type: 'button', onclick: () => {
            const e = store.add(M.makeExample(core, ctx.lang()));
            const s = selFor(e);
            s.test = 'dmrt';
            ctx.go(`#/e/${e.id}/analysis`);
          } }, t('home.example')),
        h('button', { class: 'btn ghost', type: 'button', onclick: () => fileInput.click() }, t('home.import')),
        fileInput),
      h('p', { class: 'small muted' }, t('home.limit', { active, limit }), ' ', t('home.limitNote')),
      experiments.length
        ? h('div', { class: 'exp-list' }, experiments.filter((e) => !e.archived).map(card), experiments.filter((e) => e.archived).map(card))
        : h('p', { class: 'muted' }, t('home.empty')));
  }

  // ------------------------------------------------------------------- new

  let form = null;

  function newExperiment() {
    if (!form) form = M.emptyForm();
    const limitReached = !M.canActivate(core, store.state);
    const root = h('div', {});
    let showErrors = false;

    const render = () => {
      const f = form;
      const nTrt = M.treatmentsOf(f).length;
      const summary = h('p', { class: 'summary', 'aria-live': 'polite' });
      const updateSummary = () => {
        const n = M.treatmentsOf(f).length;
        summary.textContent = t('new.summary', { t: n, r: f.reps || 0, p: n * (f.reps || 0) });
      };
      updateSummary();

      const text = (key, label, extra = {}) => field(label, h('input', {
        type: 'text', value: f[key], autocomplete: 'off', ...extra,
        oninput: (ev) => { f[key] = ev.target.value; },
      }));

      const rows = (list, codeLabel, onRemove, min = 2) => list.map((row, i) => h('div', { class: 'row-3' },
        h('input', { type: 'text', value: row.code, 'aria-label': `${codeLabel} ${i + 1}`, placeholder: codeLabel, autocomplete: 'off', oninput: (ev) => { row.code = ev.target.value; updateSummary(); } }),
        h('input', { type: 'text', value: row.description, 'aria-label': `${t('new.desc')} ${i + 1}`, placeholder: t('new.desc'), autocomplete: 'off', oninput: (ev) => { row.description = ev.target.value; } }),
        h('button', { class: 'btn ghost small-btn', type: 'button', disabled: list.length <= min, onclick: () => { onRemove(i); render(); } }, t('new.remove'))));

      const factorBlocks = [];
      if (f.factorCount > 1) {
        for (let i = 0; i < f.factorCount; i++) {
          const fac = f.factors[i];
          const code = M.FACTOR_CODES[i];
          factorBlocks.push(h('fieldset', { class: 'card' },
            h('legend', {}, `${code}`),
            field(t('new.factorName', { f: code }), h('input', { type: 'text', value: fac.name, placeholder: t('new.factorNameHint'), autocomplete: 'off', oninput: (ev) => { fac.name = ev.target.value; } })),
            h('p', { class: 'field-label' }, t('new.levels', { f: code })),
            rows(fac.levels, t('new.levelCode'), (k) => fac.levels.splice(k, 1)),
            h('button', { class: 'btn ghost small-btn', type: 'button', onclick: () => { fac.levels.push(NEW_ROW()); render(); } }, t('new.addLevel'))));
        }
      }

      const errs = showErrors ? M.validateForm(f) : [];
      append(clear(root),
        h('p', {}, h('a', { href: '#/' }, `← ${t('new.back')}`)),
        h('h1', {}, t('new.title')),
        limitReached ? h('div', { class: 'card note', role: 'alert' }, t('new.limitBlock', { limit: ctx.info.freeActiveLimit })) : null,
        h('form', { novalidate: true, onsubmit: (ev) => {
          ev.preventDefault();
          if (limitReached) return;
          showErrors = true;
          if (M.validateForm(f).length) { render(); root.querySelector('.problems')?.focus(); return; }
          const e = store.add(M.makeExperiment(core, f));
          form = null;
          ctx.go(`#/e/${e.id}/layout`);
        } },
        h('div', { class: 'card' },
          h('h2', {}, t('new.info')),
          text('title', t('new.expTitle'), { required: true, maxlength: 120 }),
          h('div', { class: 'row-2' }, text('crop', t('new.crop'), { maxlength: 60 }), text('location', t('new.location'), { maxlength: 80 }))),
        h('div', { class: 'card' },
          h('h2', {}, t('new.design')),
          h('div', { class: 'row-2' },
            field(t('new.design'), h('select', { onchange: (ev) => { f.design = ev.target.value; render(); } },
              ['rcbd', 'crd'].map((d) => h('option', { value: d, selected: f.design === d }, t(`design.${d}.full`))))),
            field(t('new.reps'), h('input', { type: 'number', min: 2, max: M.MAX_REPS, step: 1, value: f.reps, inputmode: 'numeric',
              oninput: (ev) => { f.reps = ev.target.value === '' ? 0 : Number(ev.target.value); updateSummary(); } }))),
          field(t('new.factors'), h('select', { onchange: (ev) => { f.factorCount = Number(ev.target.value); render(); } },
            [1, 2, 3].map((n) => h('option', { value: n, selected: f.factorCount === n }, t(`new.factors${n}`)))))),
        f.factorCount === 1
          ? h('div', { class: 'card' }, h('h2', {}, t('new.treatments')),
            rows(f.treatments, t('new.code'), (k) => f.treatments.splice(k, 1)),
            h('button', { class: 'btn ghost small-btn', type: 'button', onclick: () => { f.treatments.push({ code: `P${f.treatments.length + 1}`, description: '' }); render(); } }, t('new.addTreatment')))
          : factorBlocks,
        h('div', { class: 'card' },
          h('h2', {}, t('new.params')),
          f.parameters.map((p, i) => h('div', { class: 'row-4' },
            h('input', { type: 'text', value: p.name, 'aria-label': `${t('new.paramName')} ${i + 1}`, placeholder: t('new.paramNameHint'), autocomplete: 'off', oninput: (ev) => { p.name = ev.target.value; } }),
            h('input', { type: 'text', value: p.unit, 'aria-label': `${t('new.unit')} ${i + 1}`, placeholder: t('new.unit'), autocomplete: 'off', oninput: (ev) => { p.unit = ev.target.value; } }),
            h('input', { type: 'number', min: 1, max: M.MAX_SAMPLES, step: 1, value: p.samples, 'aria-label': `${t('new.samples')} ${i + 1}`, title: t('new.samples'),
              oninput: (ev) => { p.samples = ev.target.value === '' ? 0 : Number(ev.target.value); } }),
            h('button', { class: 'btn ghost small-btn', type: 'button', disabled: f.parameters.length <= 1, onclick: () => { f.parameters.splice(i, 1); render(); } }, t('new.remove')))),
          h('p', { class: 'field-hint' }, t('new.samples')),
          h('button', { class: 'btn ghost small-btn', type: 'button', onclick: () => { f.parameters.push({ name: '', unit: '', samples: 1 }); render(); } }, t('new.addParam'))),
        h('div', { class: 'card' },
          h('h2', {}, t('new.sessions')),
          field(t('new.dap'), h('input', { type: 'text', value: f.dapList, inputmode: 'numeric', placeholder: '14, 28, 42', autocomplete: 'off', oninput: (ev) => { f.dapList = ev.target.value; } }), t('new.dapHint')),
          h('label', { class: 'check' }, h('input', { type: 'checkbox', checked: f.harvest, onchange: (ev) => { f.harvest = ev.target.checked; } }), t('new.harvest'))),
        errs.length ? h('div', { class: 'card note problems', tabindex: '-1', role: 'alert' }, h('strong', {}, t('new.problems')), h('ul', {}, errs.map((x) => h('li', {}, t(x.key, x.params))))) : null,
        summary,
        h('button', { class: 'btn primary', type: 'submit', disabled: limitReached || nTrt === 0 }, t('new.create'))));
    };
    render();
    return root;
  }

  // ------------------------------------------------------------ experiment

  function experiment(id, tab) {
    const e = store.find(id);
    if (!e) return h('div', {}, h('p', {}, h('a', { href: '#/' }, `← ${t('nav.home')}`)), h('h1', {}, t('exp.notFound')));
    const views = { layout, entry, analysis, info };
    const body = (views[tab] ?? layout)(e);
    const tabs = ['layout', 'entry', 'analysis', 'info'];
    return h('div', {},
      h('p', {}, h('a', { href: '#/' }, `← ${t('nav.home')}`)),
      h('h1', { class: 'exp-title' }, e.title),
      h('p', { class: 'exp-tags' }, tag(designName(e, true)), e.isSample ? tag(t('tag.example'), 'accent') : null, e.archived ? tag(t('tag.archived'), 'accent') : null,
        h('span', { class: 'muted small' }, [e.crop, e.location].filter(Boolean).join(' · '))),
      h('nav', { class: 'tabs', 'aria-label': e.title },
        tabs.map((k) => h('a', { href: `#/e/${e.id}/${k}`, 'aria-current': k === tab ? 'page' : null }, t(`tab.${k}`)))),
      e.archived && tab !== 'info' ? h('div', { class: 'card note small' }, t('exp.archivedNote')) : null,
      body);
  }

  // ---------------------------------------------------------------- layout

  function layout(e) {
    const rcbd = M.isRcbd(e);
    const cell = (plot) => {
      const tr = M.treatmentOf(e, plot);
      return h('td', { class: `c${colorIndex(e, plot)}`, title: tr.description || tr.code },
        h('strong', {}, tr.code), h('span', { class: 'plot-no' }, `#${plot.n}`));
    };
    let grid;
    if (rcbd) {
      const nT = e.treatments.length;
      grid = h('table', { class: 'denah' },
        h('caption', { class: 'sr' }, t('layout.title')),
        h('thead', {}, h('tr', {}, h('th', {}, ''), Array.from({ length: nT }, (_, i) => h('th', { scope: 'col' }, i + 1)))),
        h('tbody', {}, Array.from({ length: e.reps }, (_, b) => h('tr', {},
          h('th', { scope: 'row' }, t('layout.block', { n: b + 1 })),
          e.plots.filter((p) => p.block === b + 1).map(cell)))));
    } else {
      const perRow = Math.min(e.treatments.length, 8);
      const rows = [];
      for (let i = 0; i < e.plots.length; i += perRow) rows.push(e.plots.slice(i, i + perRow));
      grid = h('table', { class: 'denah' },
        h('caption', { class: 'sr' }, t('layout.field')),
        h('tbody', {}, rows.map((r) => h('tr', {}, r.map(cell)))));
    }
    const locked = M.hasData(e) || e.archived;
    const legend = M.isFactorial(e)
      ? e.factors[0].levels.map((l, i) => h('li', {}, h('span', { class: `swatch c${i % 8}` }), `${l.code}${l.description ? ` · ${l.description}` : ''}`))
      : e.treatments.map((tr, i) => h('li', {}, h('span', { class: `swatch c${i % 8}` }), `${tr.code}${tr.description ? ` · ${tr.description}` : ''}`));
    return h('div', {},
      h('h2', {}, t('layout.title')),
      h('p', { class: 'muted small' }, rcbd ? '' : t('layout.field')),
      tableWrap(grid),
      h('ul', { class: 'legend' }, legend),
      M.isFactorial(e) ? h('p', { class: 'muted small' }, t('layout.colorNote')) : null,
      h('p', { class: 'muted small' }, t('layout.seed', { seed: e.seed }), ' ', t('layout.seedNote')),
      h('div', { class: 'actions' },
        h('button', { class: 'btn ghost', type: 'button', disabled: locked, onclick: () => {
          if (!confirm(t('layout.reshuffleConfirm'))) return;
          M.rerandomize(core, e);
          store.save();
          ctx.rerender();
        } }, t('layout.reshuffle'))),
      locked && !e.archived ? h('p', { class: 'muted small' }, t('layout.reshuffleLocked')) : null,
      h('h2', {}, t('layout.treatments')),
      tableWrap(h('table', { class: 'plain' },
        h('thead', {}, h('tr', {}, h('th', {}, t('layout.treatment')), h('th', {}, ''))),
        h('tbody', {}, e.treatments.map((tr) => h('tr', {}, h('td', {}, h('strong', {}, tr.code)), h('td', {}, tr.description)))))),
      h('details', { class: 'plots' },
        h('summary', {}, t('layout.plot')),
        tableWrap(h('table', { class: 'plain' },
          h('thead', {}, h('tr', {}, h('th', {}, t('layout.plot')), rcbd ? h('th', {}, t('layout.blockCol')) : h('th', {}, t('layout.rep')), h('th', {}, t('layout.treatment')))),
          h('tbody', {}, e.plots.map((p) => h('tr', {}, h('td', {}, p.n), h('td', {}, p.block ?? p.rep), h('td', {}, M.treatmentOf(e, p).code))))))));
  }

  // ----------------------------------------------------------------- entry

  function pickers(e, s, { analysis = false } = {}) {
    const sessions = sortedSessions(e);
    return h('div', { class: 'row-2 pickers' },
      field(t('entry.session'), h('select', { onchange: (ev) => { s.sid = ev.target.value; s.transform = 'none'; s.nonParametric = false; ctx.rerender(); } },
        sessions.map((x) => h('option', { value: x.id, selected: s.sid === x.id }, sessionLabel(e, x))))),
      field(t('entry.parameter'), h('select', { onchange: (ev) => { s.pid = ev.target.value; s.transform = 'none'; s.nonParametric = false; s.focusTrt = null; ctx.rerender(); } },
        e.parameters.map((p) => h('option', { value: p.id, selected: s.pid === p.id }, p.unit ? `${p.name} (${p.unit})` : p.name)))));
  }

  function entry(e) {
    const s = selFor(e);
    const sessions = sortedSessions(e);
    const addBox = () => {
      const dap = h('input', { type: 'text', inputmode: 'numeric', size: 4, 'aria-label': t('entry.addDap'), placeholder: t('entry.addDap'), autocomplete: 'off' });
      const harvest = h('input', { type: 'checkbox' });
      return h('form', { class: 'add-session', onsubmit: (ev) => {
        ev.preventDefault();
        const raw = dap.value.trim();
        const n = raw === '' ? null : /^\d{1,3}$/.test(raw) ? Number(raw) : NaN;
        if (Number.isNaN(n) || (n === null && !harvest.checked)) { dap.setAttribute('aria-invalid', 'true'); return; }
        const ns = { id: M.uid(), dap: n, harvest: harvest.checked };
        e.sessions.push(ns);
        s.sid = ns.id;
        store.save();
        ctx.rerender();
      } }, h('strong', {}, t('entry.addSession')), dap,
      h('label', { class: 'check' }, harvest, t('entry.addHarvest')),
      h('button', { class: 'btn ghost small-btn', type: 'submit' }, t('entry.add')));
    };
    if (!sessions.length) {
      return h('div', {}, h('h2', {}, t('entry.title')), h('p', { class: 'muted' }, t('entry.noSessions')), e.archived ? null : addBox());
    }

    const p = e.parameters.find((x) => x.id === s.pid);
    const rcbd = M.isRcbd(e);
    const status = h('p', { class: 'small warn', 'aria-live': 'polite', role: 'status' });
    const progressEl = h('p', { class: 'muted small' });
    const updateProgress = () => {
      progressEl.textContent = t('entry.progress', M.progress(e, s.sid, s.pid));
    };
    updateProgress();

    const inputs = [];
    const rows = e.plots.map((plot, ri) => {
      const tr = M.treatmentOf(e, plot);
      const vals = M.getSamples(e, s.sid, s.pid, plot.n);
      const cells = vals.map((v, si) => {
        const input = h('input', {
          type: 'text', inputmode: 'decimal', autocomplete: 'off', class: 'num', value: fmt().input(v), disabled: e.archived,
          'aria-label': `${t('entry.value', { plot: plot.n, trt: tr.code })}${p.samples > 1 ? `, ${t('entry.sample', { n: si + 1 })}` : ''}`,
          'data-plot': plot.n,
          onchange: () => {
            const raw = input.value.trim();
            if (raw === '') {
              M.setSample(e, s.sid, s.pid, plot.n, si, null);
            } else {
              const n = M.parseNumber(raw);
              if (n === null) { input.setAttribute('aria-invalid', 'true'); status.textContent = `${t('entry.invalid')}: "${raw}"`; return; }
              M.setSample(e, s.sid, s.pid, plot.n, si, n);
              input.value = fmt().input(n);
            }
            input.removeAttribute('aria-invalid');
            status.textContent = '';
            store.save();
            updateProgress();
          },
          onkeydown: (ev) => {
            if (ev.key !== 'Enter') return;
            ev.preventDefault();
            input.dispatchEvent(new Event('change'));
            if (input.getAttribute('aria-invalid') === 'true') { input.select(); return; }
            const next = inputs[ri + 1]?.[si];
            if (next) { next.focus(); next.select(); } else input.blur();
          },
        });
        (inputs[ri] ??= [])[si] = input;
        return h('td', {}, input);
      });
      return h('tr', { 'data-plot': plot.n }, h('th', { scope: 'row' }, plot.n), rcbd ? h('td', {}, plot.block) : null, h('td', {}, h('strong', {}, tr.code)), cells);
    });

    if (s.focusPlot !== null) {
      const target = s.focusPlot;
      s.focusPlot = null;
      queueMicrotask(() => {
        const ri = e.plots.findIndex((x) => String(x.n) === String(target));
        const el = inputs[ri]?.[0];
        if (el) { el.scrollIntoView({ block: 'center' }); el.focus(); el.select(); }
      });
    }

    const sess = sessions.find((x) => x.id === s.sid);
    return h('div', {},
      h('h2', {}, t('entry.title')),
      pickers(e, s),
      progressEl,
      status,
      e.archived ? h('p', { class: 'muted small' }, t('entry.locked')) : h('p', { class: 'muted small' }, t('entry.hint')),
      tableWrap(h('table', { class: 'entry' },
        h('thead', {}, h('tr', {}, h('th', {}, t('entry.colPlot')), rcbd ? h('th', {}, t('entry.colBlock')) : null, h('th', {}, t('entry.colTreatment')),
          Array.from({ length: p.samples }, (_, i) => h('th', {}, p.samples > 1 ? t('entry.sample', { n: i + 1 }) : (p.unit || t('entry.sample', { n: 1 }))))) ),
        h('tbody', {}, rows))),
      h('div', { class: 'actions' },
        h('a', { class: 'btn primary', href: `#/e/${e.id}/analysis` }, t('entry.toAnalysis')),
        e.archived ? null : h('button', { class: 'btn ghost', type: 'button', onclick: () => {
          if (!confirm(t('entry.deleteSessionConfirm'))) return;
          e.sessions = e.sessions.filter((x) => x.id !== sess.id);
          delete e.obs[sess.id];
          for (const k of Object.keys(e.kept)) if (k.startsWith(`${sess.id}|`)) delete e.kept[k];
          store.save();
          ctx.rerender();
        } }, t('entry.deleteSession'))),
      e.archived ? null : addBox());
  }

  // -------------------------------------------------------------- analysis

  function sourceLabel(e, src) {
    if (['Block', 'Treatment', 'Error', 'Total'].includes(src)) return t(`anova.src.${src}`);
    const parts = src.split('x');
    if (parts.length === 1) return `${parts[0]} (${e.factors['ABC'.indexOf(parts[0])].name})`;
    return parts.join(' × ');
  }

  function anovaTable(e, r) {
    const f = fmt();
    const ns = t('anova.ns');
    return tableWrap(h('table', { class: 'plain anova' },
      h('caption', { class: 'sr' }, t('anova.title')),
      h('thead', {}, h('tr', {}, [t('anova.source'), t('anova.df'), t('anova.ss'), t('anova.ms'), 'F', 'F 5%', 'F 1%'].map((x, i) => h('th', { scope: 'col', class: i ? 'n' : '' }, x)))),
      h('tbody', {}, r.rows.map((row) => h('tr', { class: row.sig.startsWith('*') ? 'hi' : '' },
        h('th', { scope: 'row' }, sourceLabel(e, row.source)),
        h('td', { class: 'n' }, row.df),
        h('td', { class: 'n' }, f.stat(row.ss)),
        h('td', { class: 'n' }, row.ms === null || row.source === 'Total' ? '' : f.stat(row.ms)),
        h('td', { class: 'n' }, row.f === null ? '' : `${f.stat(row.f)} ${row.sig === 'ns' ? ns : row.sig}`),
        h('td', { class: 'n' }, row.fCrit05 === null ? '' : f.stat(row.fCrit05)),
        h('td', { class: 'n' }, row.fCrit01 === null ? '' : f.stat(row.fCrit01)))))));
  }

  function rankedTable(e, ph, unit, descOf, originalMeans = null) {
    const f = fmt();
    return tableWrap(h('table', { class: 'plain posthoc' },
      h('caption', {}, t('posthoc.title', { test: t(`analysis.test.${ph.test}`), alpha: alphaText(ph.alpha) })),
      h('thead', {}, h('tr', {}, h('th', { scope: 'col' }, t('posthoc.treatment')), h('th', { scope: 'col', class: 'n' }, `${t('posthoc.mean')}${unit ? ` (${unit})` : ''}`), h('th', { scope: 'col' }, t('posthoc.letters')))),
      h('tbody', {}, ph.ranked.map((x) => {
        const displayMean = originalMeans && originalMeans[x.trt] !== undefined ? originalMeans[x.trt] : x.mean;
        return h('tr', {},
          h('th', { scope: 'row' }, h('strong', {}, x.trt), descOf(x.trt) ? h('span', { class: 'muted small' }, ` ${descOf(x.trt)}`) : null),
          h('td', { class: 'n' }, f.stat(displayMean)),
          h('td', { class: 'letters' }, x.letters));
      }))));
  }

  function twoWayTable(e, tb) {
    const f = fmt();
    const rowName = e.factors[tb.rowFactor].name, colName = e.factors[tb.colFactor].name;
    return tableWrap(h('table', { class: 'plain twoway' },
      h('thead', {}, h('tr', {}, h('th', { scope: 'col' }, `${rowName} \\ ${colName}`),
        tb.cols.map((c) => h('th', { scope: 'col', class: 'n' }, c)), h('th', { scope: 'col', class: 'n' }, t('fact.rowMean')))),
      h('tbody', {}, tb.rows.map((rl, i) => h('tr', {}, h('th', { scope: 'row' }, rl),
        tb.cols.map((_, j) => h('td', { class: 'n' }, h('span', {}, f.stat(tb.means[i][j])), ' ', h('span', { class: 'lc' }, tb.lower[i][j]), h('span', { class: 'uc' }, tb.upper[i][j]))),
        h('td', { class: 'n muted' }, f.stat(tb.rowMeans[i])))),
      h('tr', { class: 'sum' }, h('th', { scope: 'row' }, t('fact.rowMean')), tb.colMeans.map((m) => h('td', { class: 'n muted' }, f.stat(m))), h('td', {}, '')))));
  }

  function factorialResults(e, r, s, p) {
    const f = fmt();
    const sig = r.significant;
    const view = s.view && (s.view === 'main' || r.interactionSources.includes(s.view)) ? s.view : (sig[0] ?? 'main');
    const label = (x) => x.split('x').join(' × ');
    const legend = (a, b) => t('fact.legend', { a, b, test: t(`analysis.test.${s.test}`), alpha: alphaText(s.alpha) });
    const parts = [];
    if (view === 'main') {
      for (const m of r.main) {
        const fac = e.factors[m.factor];
        parts.push(h('h3', {}, t('fact.mainTitle', { name: `${fac.code} (${fac.name})` })),
          rankedTable(e, m, p.unit, (code) => fac.levels.find((l) => l.code === code)?.description ?? ''));
      }
    } else {
      const tables = r.tables[view];
      for (const tb of tables) {
        if (tb.slice) {
          const fac = e.factors[tb.slice.factor];
          const lvl = fac.levels.find((l) => l.code === tb.slice.level);
          parts.push(h('h3', {}, `${fac.code} = ${tb.slice.level}${lvl?.description ? ` (${lvl.description})` : ''}`));
        }
        parts.push(twoWayTable(e, tb));
      }
      const first = tables[0];
      parts.push(h('p', { class: 'muted small' }, tables[0].slice ? `${t('fact.perLevel', { name: e.factors[2].name })} ` : '', legend(e.factors[first.rowFactor].name, e.factors[first.colFactor].name)));
    }
    return h('div', {},
      anovaTable(e, r),
      h('p', { class: 'muted small' }, e.factors.map((x) => t('fact.factorLine', { f: x.code, name: x.name })).join(' · ')),
      h('p', { class: 'muted small' }, t('anova.cvLine', { cv: f.num(r.cv, 1), mean: f.stat(r.grandMean), unit: p.unit })),
      r.transform && r.transform !== 'none' ? h('p', { class: 'muted small' }, t('transform.note', { name: t(`transform.${r.transform}`) })) : null,
      h('div', { class: sig.length ? 'card soft strong' : 'card note strong' }, sig.length ? t('fact.interactionSignificant', { list: sig.map(label).join(', ') }) : t('fact.interactionNot')),
      h('div', { class: 'chips', role: 'group', 'aria-label': t('analysis.title') },
        r.interactionSources.map((x) => h('button', { type: 'button', class: 'chip', 'aria-pressed': view === x, onclick: () => { s.view = x; ctx.rerender(); } }, `${label(x)}${sig.includes(x) ? ' *' : ''}`)),
        h('button', { type: 'button', class: 'chip', 'aria-pressed': view === 'main', onclick: () => { s.view = 'main'; ctx.rerender(); } }, t('fact.main'))),
      parts);
  }

  function singleResults(e, r, s, p) {
    const f = fmt();
    const ph = r.postHoc;
    const isTx = r.transform && r.transform !== 'none';
    return h('div', {},
      anovaTable(e, r),
      h('p', { class: 'muted small' }, t('anova.cvLine', { cv: f.num(r.cv, 1), mean: f.stat(r.grandMean), unit: p.unit })),
      r.treatment.sig === 'ns' ? h('div', { class: 'card note small' }, t('anova.notSignificant')) : null,
      rankedTable(e, ph, p.unit, (code) => treatmentDesc(e, code), isTx ? r.originalMeans : null),
      isTx ? h('p', { class: 'muted small' }, t('transform.note', { name: t(`transform.${r.transform}`) })) : null,
      h('p', { class: 'muted small' }, t('posthoc.sameLetter'), !isTx && s.test !== 'dmrt' && ph.criticalRanges[0] !== undefined ? ` ${t('posthoc.critical', { range: f.stat(ph.criticalRanges[0]), unit: p.unit })}` : ''));
  }

  function kruskalResults(e, k, p) {
    const f = fmt();
    const sigText = k.sig === 'ns' ? t('anova.ns') : k.sig;
    return h('div', {},
      h('h3', {}, t('kruskal.title')),
      h('div', { class: k.sig === 'ns' ? 'card note strong' : 'card soft strong' },
        t('kruskal.stat', { h: f.stat(k.h), df: k.df, p: f.num(k.p, 4) }), ' · ', sigText),
      tableWrap(h('table', { class: 'plain posthoc' },
        h('caption', {}, t('kruskal.dunn', { alpha: alphaText(k.alpha) })),
        h('thead', {}, h('tr', {},
          h('th', { scope: 'col' }, t('posthoc.treatment')),
          h('th', { scope: 'col', class: 'n' }, `${t('kruskal.median')}${p.unit ? ` (${p.unit})` : ''}`),
          h('th', { scope: 'col', class: 'n' }, t('kruskal.rank')),
          h('th', { scope: 'col' }, t('posthoc.letters')))),
        h('tbody', {}, k.groups.map((g) => h('tr', {},
          h('th', { scope: 'row' }, h('strong', {}, g.trt), treatmentDesc(e, g.trt) ? h('span', { class: 'muted small' }, ` ${treatmentDesc(e, g.trt)}`) : null),
          h('td', { class: 'n' }, f.stat(g.median)),
          h('td', { class: 'n' }, f.num(g.meanRank, 1)),
          h('td', { class: 'letters' }, g.letters)))))),
      h('p', { class: 'muted small' }, t('posthoc.sameLetter')));
  }

  function growthChart(ts, p, s) {
    if (!ts || !ts.hasTrend || !ts.series.length) return null;
    const f = fmt();
    const W = 640, H = 250, padL = 52, padR = 18, padT = 16, padB = 34;
    const plotW = W - padL - padR, plotH = H - padT - padB;
    const rawMin = s.showSe ? ts.minYWithSe : ts.minY;
    const rawMax = s.showSe ? ts.maxYWithSe : ts.maxY;
    const span = rawMax - rawMin || Math.abs(rawMax) * 0.2 || 1;
    const yMin = rawMin - span * 0.08;
    const yMax = rawMax + span * 0.08;
    const dMin = ts.days[0], dMax = ts.days[ts.days.length - 1];
    const dSpan = dMax - dMin || 1;
    const xOf = (d) => padL + ((d - dMin) / dSpan) * plotW;
    const yOf = (v) => padT + plotH - ((v - yMin) / (yMax - yMin)) * plotH;

    const grid = [];
    for (let i = 0; i <= 4; i++) {
      const val = yMin + (i / 4) * (yMax - yMin);
      const y = yOf(val);
      grid.push(svgEl('line', { class: 'trend-grid', x1: padL, y1: y.toFixed(1), x2: W - padR, y2: y.toFixed(1) }));
      grid.push(svgEl('text', { class: 'trend-axis', x: padL - 8, y: (y + 4).toFixed(1), 'text-anchor': 'end' }, f.num(val, Math.abs(yMax - yMin) < 10 ? 1 : 0)));
    }
    for (const day of ts.days) {
      const x = xOf(day);
      grid.push(svgEl('text', { class: 'trend-axis', x: x.toFixed(1), y: H - 10, 'text-anchor': 'middle' }, `${day} ${t('trend.daySuffix')}`));
    }

    const lines = [];
    ts.series.forEach((sr, idx) => {
      const color = SERIES_COLORS[idx % SERIES_COLORS.length];
      const dimmed = s.focusTrt && s.focusTrt !== sr.trt;
      const focused = s.focusTrt === sr.trt;
      const grp = svgEl('g', { opacity: dimmed ? '0.2' : '1' });
      const pts = sr.points.map((pt) => `${xOf(pt.day).toFixed(1)},${yOf(pt.mean).toFixed(1)}`).join(' ');
      if (sr.points.length >= 2) {
        grp.appendChild(svgEl('polyline', { fill: 'none', stroke: color, 'stroke-width': focused ? '3.2' : '2.2', 'stroke-linejoin': 'round', 'stroke-linecap': 'round', points: pts }));
      }
      for (const pt of sr.points) {
        const cx = xOf(pt.day), cy = yOf(pt.mean);
        if (s.showSe && pt.se > 0) {
          const yLo = yOf(pt.mean - pt.se), yHi = yOf(pt.mean + pt.se);
          grp.appendChild(svgEl('line', { x1: cx.toFixed(1), y1: yLo.toFixed(1), x2: cx.toFixed(1), y2: yHi.toFixed(1), stroke: color, 'stroke-width': '1.4', opacity: '0.75' }));
          grp.appendChild(svgEl('line', { x1: (cx - 4).toFixed(1), y1: yLo.toFixed(1), x2: (cx + 4).toFixed(1), y2: yLo.toFixed(1), stroke: color, 'stroke-width': '1.4', opacity: '0.75' }));
          grp.appendChild(svgEl('line', { x1: (cx - 4).toFixed(1), y1: yHi.toFixed(1), x2: (cx + 4).toFixed(1), y2: yHi.toFixed(1), stroke: color, 'stroke-width': '1.4', opacity: '0.75' }));
        }
        const dot = svgEl('circle', { cx: cx.toFixed(1), cy: cy.toFixed(1), r: focused ? '4.8' : '3.8', fill: color });
        dot.appendChild(svgEl('title', {}, `${sr.trt} · ${pt.day} ${t('trend.daySuffix')}: ${f.stat(pt.mean)}${pt.se > 0 ? ` ± ${f.stat(pt.se)}` : ''}${p.unit ? ` ${p.unit}` : ''}`));
        grp.appendChild(dot);
      }
      lines.push(grp);
    });

    const svg = svgEl('svg', { class: 'trend-svg', viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': t('trend.title') }, ...grid, ...lines);
    const legend = h('div', { class: 'trend-legend', role: 'group', 'aria-label': t('trend.title') },
      ts.series.map((sr, idx) => h('button', {
        type: 'button', class: 'trend-pill', 'aria-pressed': s.focusTrt === sr.trt,
        onclick: () => { s.focusTrt = s.focusTrt === sr.trt ? null : sr.trt; ctx.rerender(); },
      }, h('span', { class: `trend-dot s${idx % 8}` }), sr.trt)));

    return h('div', { class: 'card trend-card' },
      h('div', { class: 'trend-head' },
        h('div', {}, h('h3', {}, t('trend.title')),
          h('p', { class: 'muted small trend-sub' }, t('trend.sub', { n: ts.days.length, unit: p.unit ? ` (${p.unit})` : '' }))),
        h('button', { type: 'button', class: 'chip', 'aria-pressed': s.showSe, onclick: () => { s.showSe = !s.showSe; ctx.rerender(); } }, t('trend.se'))),
      svg,
      legend);
  }

  function resultText(e, r, s, p) {
    const f = fmt();
    const lines = [e.title, `${designName(e, true)}; ${p.name}${p.unit ? ` (${p.unit})` : ''}`];
    if (r.normality) lines.push(`${t('check.normality')}: ${t('check.wp', { w: f.num(r.normality.w, 3), p: f.num(r.normality.p, 3) })} (${r.normality.p >= 0.05 ? t('check.normal') : t('check.notNormal')})`);
    if (r.homogeneity) lines.push(`${t('check.homogeneity')}: ${t('check.fp', { f: f.num(r.homogeneity.f, 3), p: f.num(r.homogeneity.p, 3) })} (${r.homogeneity.p >= 0.05 ? t('check.homogeneous') : t('check.heterogeneous')})`);
    lines.push('');

    if (s.nonParametric && r.kruskal) {
      const k = r.kruskal;
      lines.push(t('kruskal.title'), `${t('kruskal.stat', { h: f.stat(k.h), df: k.df, p: f.num(k.p, 4) })} (${k.sig === 'ns' ? t('anova.ns') : k.sig})`, '',
        t('kruskal.dunn', { alpha: alphaText(k.alpha) }),
        [t('posthoc.treatment'), t('kruskal.median'), t('kruskal.rank'), t('posthoc.letters')].join('\t'));
      for (const g of k.groups) lines.push([g.trt, f.stat(g.median), f.num(g.meanRank, 1), g.letters].join('\t'));
      lines.push('', t('posthoc.sameLetter'));
      return lines.join('\n');
    }

    const isTx = r.transform && r.transform !== 'none';
    lines.push(t('anova.title'),
      [t('anova.source'), t('anova.df'), t('anova.ss'), t('anova.ms'), 'F', 'F 5%', 'F 1%'].join('\t'));
    for (const row of r.rows) {
      lines.push([sourceLabel(e, row.source), row.df, f.stat(row.ss), row.ms === null || row.source === 'Total' ? '' : f.stat(row.ms),
        row.f === null ? '' : `${f.stat(row.f)} ${row.sig === 'ns' ? t('anova.ns') : row.sig}`, row.fCrit05 === null ? '' : f.stat(row.fCrit05), row.fCrit01 === null ? '' : f.stat(row.fCrit01)].join('\t'));
    }
    lines.push('', t('anova.cvLine', { cv: f.num(r.cv, 1), mean: f.stat(r.grandMean), unit: p.unit }), '');
    const ranked = (ph, origMeans = null) => {
      lines.push(t('posthoc.title', { test: t(`analysis.test.${ph.test}`), alpha: alphaText(s.alpha) }), [t('posthoc.treatment'), t('posthoc.mean'), t('posthoc.letters')].join('\t'));
      for (const x of ph.ranked) {
        const m = origMeans && origMeans[x.trt] !== undefined ? origMeans[x.trt] : x.mean;
        lines.push([x.trt, f.stat(m), x.letters].join('\t'));
      }
      if (isTx) lines.push(t('transform.note', { name: t(`transform.${r.transform}`) }));
      lines.push('');
    };
    if (r.kind === 'single') ranked(r.postHoc, isTx ? r.originalMeans : null);
    else {
      for (const m of r.main) { lines.push(t('fact.mainTitle', { name: e.factors[m.factor].name })); ranked(m); }
      for (const [src, tables] of Object.entries(r.tables)) {
        for (const tb of tables) {
          lines.push(`${src.split('x').join(' × ')}${tb.slice ? ` (${tb.slice.level})` : ''}`, ['', ...tb.cols].join('\t'));
          tb.rows.forEach((rl, i) => lines.push([rl, ...tb.cols.map((_, j) => `${f.stat(tb.means[i][j])} ${tb.lower[i][j]}${tb.upper[i][j]}`)].join('\t')));
          lines.push('');
        }
      }
    }
    return lines.join('\n');
  }

  function analysis(e) {
    const s = selFor(e);
    if (!s.sid) return h('div', {}, h('h2', {}, t('analysis.title')), h('p', { class: 'muted' }, t('analysis.noSessions')), h('a', { class: 'btn primary', href: `#/e/${e.id}/entry` }, t('analysis.goEntry')));
    const p = e.parameters.find((x) => x.id === s.pid);
    const f = fmt();
    const st = M.inspect(core, e, s.sid, s.pid);
    const goEntry = h('a', { class: 'btn primary', href: `#/e/${e.id}/entry` }, t('analysis.goEntry'));
    const out = [h('h2', {}, t('analysis.title')), pickers(e, s, { analysis: true }),
      h('div', { class: 'row-2 pickers' },
        field(t('analysis.test'), h('select', { onchange: (ev) => { s.test = ev.target.value; ctx.rerender(); } }, TESTS.map((id) => h('option', { value: id, selected: s.test === id }, t(`analysis.test.${id}`))))),
        field(t('analysis.alpha'), h('select', { onchange: (ev) => { s.alpha = Number(ev.target.value); ctx.rerender(); } },
          [[0.05, 'analysis.alpha05'], [0.01, 'analysis.alpha01']].map(([v, k]) => h('option', { value: v, selected: s.alpha === v }, t(k))))))];

    if (st.status === 'empty') return h('div', {}, out, h('p', { class: 'muted' }, t('analysis.empty')), goEntry);
    if (st.status === 'incomplete') return h('div', {}, out, h('div', { class: 'card note' }, t('analysis.incomplete', st.prog)), goEntry);
    if (st.status === 'error') return h('div', {}, out, h('div', { class: 'card note', role: 'alert' }, t('analysis.error', { msg: st.error.message })), goEntry);

    const rec = M.samplesRecorded(e, s.sid, s.pid);
    if (rec.recorded < rec.expected) out.push(h('p', { class: 'muted small' }, t('analysis.fewSamples', { missing: rec.expected - rec.recorded, expected: rec.expected })));

    let r = null;
    if (st.status === 'ready') {
      try {
        r = M.analyze(core, e, s.sid, s.pid, s.test, s.alpha, s.transform);
      } catch (err) {
        out.push(h('div', { class: 'card note', role: 'alert' }, t('analysis.error', { msg: err.message })));
        return h('div', {}, out);
      }
    }

    // Data check (live normality + Levene homogeneity on active transform when ready)
    const check = st.check;
    const n = r ? r.normality : check.normality;
    const hm = r ? r.homogeneity : check.homogeneity;
    const assumptionFailed = (n && n.p < 0.05) || (hm && hm.p < 0.05);
    const checkCard = h('div', { class: 'card' }, h('h3', {}, t('check.title')),
      n ? h('p', {}, `${t('check.normality')}: `, t('check.wp', { w: f.num(n.w, 3), p: f.num(n.p, 3) }), ' · ',
        h('strong', { class: n.p >= 0.05 ? 'ok' : 'warn' }, n.p >= 0.05 ? t('check.normal') : t('check.notNormal')))
        : h('p', { class: 'muted' }, t('check.noNormality')),
      hm ? h('p', {}, `${t('check.homogeneity')}: `, t('check.fp', { f: f.num(hm.f, 3), p: f.num(hm.p, 3) }), ' · ',
        h('strong', { class: hm.p >= 0.05 ? 'ok' : 'warn' }, hm.p >= 0.05 ? t('check.homogeneous') : t('check.heterogeneous')))
        : null,
      assumptionFailed ? h('p', { class: 'muted small' }, t('check.notNormalHint')) : null,
      check.outliers.length ? h('div', {}, h('h4', {}, t('check.outliers')),
        h('ul', { class: 'outliers' }, check.outliers.map((id) => {
          const pt = check.points.find((x) => x.id === id);
          const kept = e.kept[`${s.sid}|${s.pid}|${id}`];
          return h('li', {},
            h('span', {}, t('check.outlierDetail', { plot: id, trt: pt.trt, value: f.stat(pt.value), unit: p.unit, mean: f.stat(pt.trtMean), r: f.num(pt.studentized, 1) })),
            h('span', { class: 'row-actions' },
              kept ? tag(t('check.kept')) : e.archived ? null : h('button', { class: 'btn ghost small-btn', type: 'button', onclick: () => { e.kept[`${s.sid}|${s.pid}|${id}`] = true; store.save(); ctx.rerender(); } }, t('check.keep')),
              e.archived ? null : h('button', { class: 'btn ghost small-btn', type: 'button', onclick: () => { s.focusPlot = id; ctx.go(`#/e/${e.id}/entry`); } }, t('check.edit'))));
        })))
        : h('p', { class: 'muted small' }, t('check.clean')));
    out.push(checkCard);
    if (st.status === 'review') { out.push(h('div', { class: 'card note', role: 'status' }, t('check.review'))); return h('div', {}, out); }

    // Transformations & non-parametric switcher
    const availTx = r.availableTransforms ?? ['none'];
    const showSuggest = assumptionFailed && r.suggestedTransform && r.transform === 'none' && !s.nonParametric;
    out.push(h('div', { class: 'transform-bar' },
      h('span', { class: 'field-label' }, t('transform.label')),
      showSuggest ? h('p', { class: 'muted small transform-suggest' }, t('transform.suggest', { name: t(`transform.${r.suggestedTransform}`) })) : null,
      h('div', { class: 'chips', role: 'group', 'aria-label': t('transform.label') },
        availTx.map((code) => h('button', {
          type: 'button',
          class: `chip${showSuggest && r.suggestedTransform === code ? ' suggested' : ''}`,
          'aria-pressed': !s.nonParametric && r.transform === code,
          onclick: () => { s.transform = code; s.nonParametric = false; ctx.rerender(); },
        }, t(`transform.${code}`))),
        r.kruskal ? h('button', {
          type: 'button', class: 'chip', 'aria-pressed': !!s.nonParametric,
          onclick: () => { s.nonParametric = true; ctx.rerender(); },
        }, t('kruskal.chip')) : null)));

    if (s.nonParametric && r.kruskal) {
      out.push(kruskalResults(e, r.kruskal, p));
    } else {
      out.push(h('h3', {}, t('anova.title')), r.kind === 'single' ? singleResults(e, r, s, p) : factorialResults(e, r, s, p));
    }

    out.push(h('div', { class: 'actions' }, h('button', { class: 'btn ghost', type: 'button', onclick: async () => {
      try { await navigator.clipboard.writeText(resultText(e, r, s, p)); ctx.say(t('result.copied')); } catch { ctx.say(t('result.copyFail'), true); }
    } }, t('result.copy'))));

    try {
      const ts = M.timeSeries(core, e, s.pid);
      const chart = growthChart(ts, p, s);
      if (chart) out.push(chart);
    } catch { /* single-session or non-DAP experiment */ }

    return h('div', {}, out);
  }

  // ------------------------------------------------------------------ info

  function info(e) {
    const f = fmt();
    const title = h('input', { type: 'text', value: e.title, maxlength: 120, disabled: e.archived });
    const crop = h('input', { type: 'text', value: e.crop, maxlength: 60, disabled: e.archived });
    const loc = h('input', { type: 'text', value: e.location, maxlength: 80, disabled: e.archived });
    const pname = h('input', { type: 'text', placeholder: t('new.paramNameHint'), 'aria-label': t('new.paramName') });
    const punit = h('input', { type: 'text', placeholder: t('new.unit'), 'aria-label': t('new.unit') });
    const psamples = h('input', { type: 'number', min: 1, max: M.MAX_SAMPLES, value: 1, 'aria-label': t('new.samples'), title: t('new.samples') });
    const limitBlocked = e.archived && !M.canActivate(core, store.state);
    return h('div', {},
      h('h2', {}, t('info.title')),
      h('div', { class: 'card' }, h('h3', {}, t('info.details')),
        h('form', { onsubmit: (ev) => {
          ev.preventDefault();
          if (!title.value.trim()) { title.setAttribute('aria-invalid', 'true'); return; }
          e.title = title.value.trim(); e.crop = crop.value.trim(); e.location = loc.value.trim();
          store.save(); ctx.say(t('info.saved')); ctx.rerender();
        } }, field(t('new.expTitle'), title), h('div', { class: 'row-2' }, field(t('new.crop'), crop), field(t('new.location'), loc)),
        h('p', { class: 'muted small' }, `${designName(e, true)} · ${t('layout.seed', { seed: e.seed })} · ${t('info.created', { date: f.date(e.createdAt) })}`),
        e.archived ? null : h('button', { class: 'btn primary', type: 'submit' }, t('info.save')))),
      h('div', { class: 'card' }, h('h3', {}, t('info.params')),
        h('ul', { class: 'plainlist' }, e.parameters.map((p) => h('li', {}, t('info.paramRow', { name: p.name, unit: p.unit || '–', n: p.samples }),
          e.archived ? null : h('button', { class: 'btn ghost small-btn', type: 'button', onclick: () => {
            if (e.parameters.length <= 1) { ctx.say(t('info.paramLast'), true); return; }
            if (!confirm(t('info.paramDeleteConfirm'))) return;
            e.parameters = e.parameters.filter((x) => x.id !== p.id);
            for (const byParam of Object.values(e.obs)) delete byParam[p.id];
            for (const k of Object.keys(e.kept)) if (k.split('|')[1] === p.id) delete e.kept[k];
            store.save(); ctx.rerender();
          } }, t('info.paramDelete'))))),
        e.archived ? null : h('form', { class: 'row-4', onsubmit: (ev) => {
          ev.preventDefault();
          const n = Number(psamples.value);
          if (!pname.value.trim() || !Number.isInteger(n) || n < 1 || n > M.MAX_SAMPLES) { pname.setAttribute('aria-invalid', 'true'); return; }
          e.parameters.push({ id: M.uid(), name: pname.value.trim(), unit: punit.value.trim(), samples: n });
          store.save(); ctx.rerender();
        } }, pname, punit, psamples, h('button', { class: 'btn ghost small-btn', type: 'submit' }, t('info.paramAdd')))),
      h('div', { class: 'card' }, h('h3', {}, t('info.export')),
        h('div', { class: 'actions' },
          h('button', { class: 'btn ghost', type: 'button', onclick: () => download(`${slug(e.title)}.csv`, M.toCsv(e), 'text/csv;charset=utf-8') }, t('info.csv')),
          h('button', { class: 'btn ghost', type: 'button', onclick: () => download(`${slug(e.title)}.rancob-web.json`, M.toBackup(e), 'application/json') }, t('info.backup'))),
        h('p', { class: 'muted small' }, t('info.backupNote'))),
      e.isSample ? null : h('div', { class: 'card' },
        h('div', { class: 'actions' }, h('button', { class: 'btn ghost', type: 'button', disabled: limitBlocked, onclick: () => {
          if (e.archived && !M.canActivate(core, store.state)) return;
          e.archived = !e.archived; store.save(); ctx.rerender();
        } }, e.archived ? t('info.unarchive') : t('info.archive'))),
        h('p', { class: 'muted small' }, limitBlocked ? t('info.limitBlock', { limit: ctx.info.freeActiveLimit }) : t('info.archiveNote'))),
      h('div', { class: 'card danger' }, h('h3', {}, t('info.danger')),
        h('button', { class: 'btn ghost danger-btn', type: 'button', onclick: () => {
          if (!confirm(t('info.deleteConfirm'))) return;
          store.remove(e.id);
          ctx.go('#/');
        } }, t('info.delete'))));
  }

  return { home, newExperiment, experiment, resetForm: () => { form = null; } };
}
