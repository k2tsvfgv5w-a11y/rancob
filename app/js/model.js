// Rancob Web: data model. Pure functions, no DOM, so they can be tested in Node.
// All statistics and the randomization come from RancobCore (compiled agri_core).

export const FORMAT = 'rancob-web-backup';
export const VERSION = 1;
export const MAX_REPS = 20;
export const MAX_SAMPLES = 10;
export const MAX_TREATMENTS = 60;
export const FACTOR_CODES = ['A', 'B', 'C'];

/** One JSON call into the compiled core. Throws {code, message} on core errors. */
export function call(core, fn, input) {
  const out = JSON.parse(core[fn](JSON.stringify(input ?? {})));
  if (out && out.error) throw Object.assign(new Error(out.message), { code: out.error });
  return out;
}

/** Random layout seed in the app's range (0..99999), from the browser's CSPRNG. */
export function newSeed() {
  const b = new Uint32Array(1);
  globalThis.crypto.getRandomValues(b);
  return b[0] % 100000;
}

export function uid() {
  const b = new Uint8Array(16);
  (globalThis.crypto ?? { getRandomValues: (a) => a.map(() => Math.floor(Math.random() * 256)) }).getRandomValues(b);
  return [...b].map((x) => x.toString(16).padStart(2, '0')).join('');
}

/** "12,5" and "12.5" both mean 12.5. Anything else (empty, text, "1.234,5") is null. */
export function parseNumber(text) {
  const s = String(text ?? '').trim().replace(/\s+/g, '');
  if (!/^[+-]?(\d+([.,]\d*)?|[.,]\d+)$/.test(s)) return null;
  const n = Number(s.replace(',', '.'));
  return Number.isFinite(n) ? n : null;
}

// ------------------------------------------------------------------ form

export function emptyForm() {
  return {
    title: '', crop: '', location: '',
    design: 'rcbd', reps: 4, factorCount: 1,
    treatments: [{ code: 'P1', description: '' }, { code: 'P2', description: '' }, { code: 'P3', description: '' }],
    factors: [
      { name: '', levels: [{ code: '', description: '' }, { code: '', description: '' }] },
      { name: '', levels: [{ code: '', description: '' }, { code: '', description: '' }] },
      { name: '', levels: [{ code: '', description: '' }, { code: '', description: '' }] },
    ],
    parameters: [{ name: '', unit: '', samples: 1 }],
    dapList: '',
    harvest: false,
  };
}

/** All treatments of the form as [{code, description, levels?}] (factor A varies slowest). */
export function treatmentsOf(form) {
  if (form.factorCount === 1) {
    return form.treatments.map((t) => ({ code: t.code.trim(), description: t.description.trim() }));
  }
  const fs = form.factors.slice(0, form.factorCount);
  let combos = [[]];
  for (const f of fs) combos = combos.flatMap((c) => f.levels.map((l) => [...c, l]));
  return combos.map((c) => ({
    code: c.map((l) => l.code.trim()).join(''),
    description: c.map((l) => l.description.trim()).filter(Boolean).join(' · '),
    levels: c.map((l) => l.code.trim()),
  }));
}

/** Returns a list of {key, params} problems (i18n keys); empty when the form is valid. */
export function validateForm(form) {
  const errs = [];
  const bad = (key, params) => errs.push({ key, params });
  if (!form.title.trim()) bad('err.title');
  if (!Number.isInteger(form.reps) || form.reps < 2 || form.reps > MAX_REPS) bad('err.reps', { max: MAX_REPS });
  if (form.factorCount === 1) {
    const codes = form.treatments.map((t) => t.code.trim());
    if (codes.length < 2) bad('err.treatments');
    if (codes.some((c) => !c)) bad('err.treatmentCode');
    if (new Set(codes).size !== codes.length) bad('err.treatmentDup');
  } else {
    const fs = form.factors.slice(0, form.factorCount);
    fs.forEach((f, i) => {
      if (!f.name.trim()) bad('err.factorName', { f: FACTOR_CODES[i] });
      const codes = f.levels.map((l) => l.code.trim());
      if (codes.length < 2) bad('err.levels', { f: FACTOR_CODES[i] });
      if (codes.some((c) => !c)) bad('err.levelCode', { f: FACTOR_CODES[i] });
      if (new Set(codes).size !== codes.length) bad('err.levelDup', { f: FACTOR_CODES[i] });
    });
    if (!errs.length) {
      const all = treatmentsOf(form).map((t) => t.code);
      if (new Set(all).size !== all.length) bad('err.comboDup');
    }
  }
  const nTrt = treatmentsOf(form).length;
  if (nTrt > MAX_TREATMENTS) bad('err.tooMany', { max: MAX_TREATMENTS });
  if (!form.parameters.length) bad('err.parameter');
  form.parameters.forEach((p) => {
    if (!p.name.trim()) bad('err.paramName');
    if (!Number.isInteger(p.samples) || p.samples < 1 || p.samples > MAX_SAMPLES) bad('err.samples', { max: MAX_SAMPLES });
  });
  if (parseDapList(form.dapList) === null) bad('err.dap');
  return errs;
}

/** "14, 28, 42" -> [14, 28, 42]; "" -> []; invalid text -> null. */
export function parseDapList(text) {
  const parts = String(text ?? '').split(/[,;\s]+/).filter(Boolean);
  const out = [];
  for (const p of parts) {
    if (!/^\d{1,3}$/.test(p)) return null;
    const n = Number(p);
    if (!out.includes(n)) out.push(n);
  }
  return out.sort((a, b) => a - b);
}

// ------------------------------------------------------------ experiment

export function sessionLabelParts(s) {
  return { dap: s.dap, harvest: !!s.harvest };
}

export function makeExperiment(core, form, { seed, isSample = false, now = new Date() } = {}) {
  const errs = validateForm(form);
  if (errs.length) throw Object.assign(new Error('invalid form'), { errors: errs });
  const treatments = treatmentsOf(form);
  const factorCount = form.factorCount;
  const usedSeed = seed ?? newSeed();
  const layout = call(core, 'layout', { design: form.design, treatments: treatments.length, reps: form.reps, seed: usedSeed });
  const sessions = parseDapList(form.dapList).map((dap) => ({ id: uid(), dap, harvest: false }));
  if (form.harvest) sessions.push({ id: uid(), dap: null, harvest: true });
  return {
    id: uid(),
    title: form.title.trim(),
    crop: form.crop.trim(),
    location: form.location.trim(),
    design: form.design,
    reps: form.reps,
    seed: usedSeed,
    createdAt: now.toISOString(),
    archived: false,
    isSample,
    factors: factorCount === 1 ? null : form.factors.slice(0, factorCount).map((f, i) => ({
      code: FACTOR_CODES[i],
      name: f.name.trim(),
      levels: f.levels.map((l) => ({ code: l.code.trim(), description: l.description.trim() })),
    })),
    treatments,
    parameters: form.parameters.map((p) => ({ id: uid(), name: p.name.trim(), unit: p.unit.trim(), samples: p.samples })),
    sessions,
    plots: layout.plots.map((p) => ({ n: p.n, t: p.t, rep: p.rep, block: p.block })),
    obs: {},
    kept: {},
  };
}

export const isFactorial = (e) => Array.isArray(e.factors) && e.factors.length >= 2;
export const isRcbd = (e) => e.design === 'rcbd';
export const treatmentOf = (e, plot) => e.treatments[plot.t];

/** Re-randomize with a new seed. Only allowed while no value has been recorded. */
export function hasData(e) {
  return Object.values(e.obs).some((byParam) =>
    Object.values(byParam).some((byPlot) => Object.values(byPlot).some((arr) => arr.some((v) => v !== null))));
}

export function rerandomize(core, e, seed) {
  if (hasData(e)) throw new Error('has data');
  const s = seed ?? newSeed();
  const layout = call(core, 'layout', { design: e.design, treatments: e.treatments.length, reps: e.reps, seed: s });
  e.seed = s;
  e.plots = layout.plots.map((p) => ({ n: p.n, t: p.t, rep: p.rep, block: p.block }));
  return e;
}

// ---------------------------------------------------------- observations

export function getSamples(e, sid, pid, plotN) {
  const p = e.parameters.find((x) => x.id === pid);
  const arr = e.obs?.[sid]?.[pid]?.[plotN] ?? [];
  return Array.from({ length: p.samples }, (_, i) => (arr[i] ?? null));
}

/** Records one sample. value === null clears it. Editing a value un-keeps its outlier flag. */
export function setSample(e, sid, pid, plotN, index, value) {
  const bySession = (e.obs[sid] ??= {});
  const byParam = (bySession[pid] ??= {});
  const arr = (byParam[plotN] ??= []);
  const p = e.parameters.find((x) => x.id === pid);
  while (arr.length < p.samples) arr.push(null);
  arr[index] = value;
  if (arr.every((v) => v === null)) delete byParam[plotN];
  delete e.kept[`${sid}|${pid}|${plotN}`];
}

/** {filled, total}: plots with at least one sample, and all plots. */
export function progress(e, sid, pid) {
  let filled = 0;
  for (const plot of e.plots) if (getSamples(e, sid, pid, plot.n).some((v) => v !== null)) filled++;
  return { filled, total: e.plots.length };
}

export function samplesRecorded(e, sid, pid) {
  const p = e.parameters.find((x) => x.id === pid);
  let rec = 0;
  for (const plot of e.plots) rec += getSamples(e, sid, pid, plot.n).filter((v) => v !== null).length;
  return { recorded: rec, expected: p.samples * e.plots.length };
}

/** Plot-level values for the core: sub-samples averaged, empty plots skipped. */
export function plotValues(e, sid, pid) {
  const out = [];
  for (const plot of e.plots) {
    const vals = getSamples(e, sid, pid, plot.n).filter((v) => v !== null);
    if (!vals.length) continue;
    const t = treatmentOf(e, plot);
    out.push({
      id: String(plot.n),
      trt: t.code,
      block: plot.block,
      levels: isFactorial(e) ? t.levels : undefined,
      value: vals.reduce((a, b) => a + b, 0) / vals.length,
    });
  }
  return out;
}

export function levelOrders(e) {
  return isFactorial(e) ? e.factors.map((f) => f.levels.map((l) => l.code)) : undefined;
}

/**
 * Data check + analysis state for one observation.
 * status: 'empty' | 'incomplete' | 'review' (unresolved outliers) | 'ready'
 */
export function inspect(core, e, sid, pid) {
  const data = plotValues(e, sid, pid);
  const prog = progress(e, sid, pid);
  const base = { data, prog, check: null, unresolved: [], status: 'ready' };
  if (!data.length) return { ...base, status: 'empty' };
  if (prog.filled < prog.total) return { ...base, status: 'incomplete' };
  let check;
  try {
    check = call(core, 'check', { rcbd: isRcbd(e), data });
  } catch (err) {
    return { ...base, status: 'error', error: err };
  }
  const unresolved = check.outliers.filter((id) => !e.kept[`${sid}|${pid}|${id}`]);
  return { ...base, check, unresolved, status: unresolved.length ? 'review' : 'ready' };
}

export function analyze(core, e, sid, pid, test, alpha) {
  return call(core, 'analyze', {
    rcbd: isRcbd(e), factorial: isFactorial(e), orders: levelOrders(e),
    data: plotValues(e, sid, pid), test, alpha,
  });
}

// ---------------------------------------------------------------- plan

export const activeCount = (state) => state.experiments.filter((e) => !e.archived && !e.isSample).length;
export function canActivate(core, state) {
  return call(core, 'canAddActive', { pro: false, activeCount: activeCount(state) }).ok;
}

// ---------------------------------------------------------------- export

const csvCell = (s) => (/[",\n;]/.test(String(s)) ? `"${String(s).replace(/"/g, '""')}"` : String(s));

/** Same columns as the Android app's CSV export (recorded_at is not kept on the web). */
export function toCsv(e) {
  const fact = isFactorial(e);
  const lines = [
    `# ${csvCell(e.title)}; design ${fact ? 'factorial ' : ''}${e.design.toUpperCase()}; seed ${e.seed}; layout randomized`,
    'dap,harvest,plot,block,replicate,treatment,factor_a,factor_b,factor_c,parameter,unit,sample,value,recorded_at',
  ];
  const sessions = [...e.sessions].sort((a, b) => (a.dap ?? 1e9) - (b.dap ?? 1e9));
  for (const s of sessions) {
    for (const plot of e.plots) {
      const t = treatmentOf(e, plot);
      for (const p of e.parameters) {
        getSamples(e, s.id, p.id, plot.n).forEach((v, i) => {
          if (v === null) return;
          lines.push([
            s.dap ?? '', s.harvest ? 1 : 0, plot.n, plot.block ?? '', plot.rep, csvCell(t.code),
            csvCell(t.levels?.[0] ?? ''), csvCell(t.levels?.[1] ?? ''), csvCell(t.levels?.[2] ?? ''),
            csvCell(p.name), csvCell(p.unit), i + 1, v, '',
          ].join(','));
        });
      }
    }
  }
  return lines.join('\n') + '\n';
}

export function toBackup(e, now = new Date()) {
  return JSON.stringify({ format: FORMAT, version: VERSION, exportedAt: now.toISOString(), experiment: e }, null, 1);
}

/** Parses and validates a backup file; returns a fresh experiment (new id). Throws on bad input. */
export function fromBackup(text) {
  let raw;
  try { raw = JSON.parse(text); } catch { throw new Error('json'); }
  if (!raw || raw.format !== FORMAT) throw new Error('format');
  if (raw.version !== VERSION) throw new Error('version');
  const e = raw.experiment;
  const ok = e && typeof e.title === 'string' && ['crd', 'rcbd'].includes(e.design)
    && Array.isArray(e.treatments) && Array.isArray(e.parameters) && Array.isArray(e.sessions)
    && Array.isArray(e.plots) && e.obs && typeof e.obs === 'object';
  if (!ok) throw new Error('structure');
  const plotsOk = e.plots.every((p) => Number.isInteger(p.n) && Number.isInteger(p.t) && e.treatments[p.t]);
  if (!plotsOk || e.treatments.length > MAX_TREATMENTS || e.plots.length > MAX_TREATMENTS * MAX_REPS) throw new Error('structure');
  const numOk = Object.values(e.obs).every((bp) => Object.values(bp).every((bl) => Object.values(bl).every((arr) =>
    Array.isArray(arr) && arr.every((v) => v === null || (typeof v === 'number' && Number.isFinite(v))))));
  if (!numOk) throw new Error('structure');
  return { ...e, id: uid(), kept: e.kept && typeof e.kept === 'object' ? e.kept : {}, archived: false };
}

// --------------------------------------------------------------- example

/** A complete, outlier-free RCBD rice example (14 DAP plant height) like the app's tutorial. */
export function makeExample(core, lang = 'id') {
  const id = lang === 'id';
  const form = emptyForm();
  Object.assign(form, {
    title: id ? 'Contoh: dosis N pada padi' : 'Example: nitrogen rate on rice',
    crop: id ? 'Padi' : 'Rice', location: '', design: 'rcbd', reps: 4, factorCount: 1,
    treatments: [
      { code: 'N0', description: id ? 'Tanpa N' : 'No N' },
      { code: 'N1', description: '60 kg N/ha' }, { code: 'N2', description: '120 kg N/ha' }, { code: 'N3', description: '180 kg N/ha' },
    ],
    parameters: [{ name: id ? 'Tinggi tanaman' : 'Plant height', unit: 'cm', samples: 1 }],
    dapList: '14', harvest: false,
  });
  const e = makeExperiment(core, form, { seed: 4242, isSample: true });
  // Deterministic data: treatment effect + block effect + small noise.
  let s = 123;
  const rnd = () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 2 ** 32);
  const gauss = () => Math.sqrt(-2 * Math.log(1 - rnd())) * Math.cos(2 * Math.PI * rnd());
  const effect = [0, 5.5, 9.5, 11];
  const sid = e.sessions[0].id, pid = e.parameters[0].id;
  for (const plot of e.plots) {
    const v = 38 + effect[plot.t] + (plot.block - 2.5) * 0.9 + gauss() * 1.1;
    setSample(e, sid, pid, plot.n, 0, Math.round(v * 10) / 10);
  }
  return e;
}
