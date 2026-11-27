#!/usr/bin/env node
// Tests for the Rancob Web data layer (no browser needed): node --test tools/test-web.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const site = join(dirname(fileURLToPath(import.meta.url)), '..');
createRequire(import.meta.url)(join(site, 'app/core.js'));
const core = globalThis.RancobCore;

const M = await import(join(site, 'app/js/model.js'));
const { createStore } = await import(join(site, 'app/js/store.js'));
const { STRINGS } = await import(join(site, 'app/js/i18n.js'));

const baseForm = (over = {}) => ({ ...M.emptyForm(), title: 'Uji', dapList: '14, 28', parameters: [{ name: 'Tinggi', unit: 'cm', samples: 1 }], ...over });
const filled = (e, f) => {
  const sid = e.sessions[0].id, pid = e.parameters[0].id;
  e.plots.forEach((p) => M.setSample(e, sid, pid, p.n, 0, f(p, M.treatmentOf(e, p))));
  return { sid, pid };
};

test('parseNumber accepts comma and dot decimals, rejects junk', () => {
  assert.equal(M.parseNumber('12,5'), 12.5);
  assert.equal(M.parseNumber(' 12.5 '), 12.5);
  assert.equal(M.parseNumber('-3'), -3);
  assert.equal(M.parseNumber(',5'), 0.5);
  for (const bad of ['', 'abc', '1.234,5', '1,2,3', '--1', '1e3', null, undefined]) assert.equal(M.parseNumber(bad), null, String(bad));
});

test('validateForm reports each problem with an i18n key', () => {
  const keys = (f) => M.validateForm(f).map((e) => e.key);
  assert.deepEqual(keys(baseForm()), []);
  assert.ok(keys(baseForm({ title: ' ' })).includes('err.title'));
  assert.ok(keys(baseForm({ reps: 1 })).includes('err.reps'));
  assert.ok(keys(baseForm({ reps: 2.5 })).includes('err.reps'));
  assert.ok(keys(baseForm({ treatments: [{ code: 'P1', description: '' }, { code: 'P1', description: '' }] })).includes('err.treatmentDup'));
  assert.ok(keys(baseForm({ dapList: '14, x' })).includes('err.dap'));
  assert.ok(keys(baseForm({ parameters: [] })).includes('err.parameter'));
  assert.ok(keys(baseForm({ parameters: [{ name: 'T', unit: '', samples: 99 }] })).includes('err.samples'));
  const fact = baseForm({ factorCount: 2, factors: [
    { name: 'N', levels: [{ code: 'N1', description: '' }, { code: 'N2', description: '' }] },
    { name: '', levels: [{ code: 'V1', description: '' }, { code: 'V2', description: '' }] }, M.emptyForm().factors[2]] });
  assert.deepEqual(keys(fact), ['err.factorName']);
  fact.factors[1].name = 'Varietas';
  assert.deepEqual(keys(fact), []);
  fact.factors[0].levels[1].code = 'N1';
  assert.deepEqual(keys(fact), ['err.levelDup']);
  const clash = baseForm({ factorCount: 2, factors: [
    { name: 'A', levels: [{ code: '1', description: '' }, { code: '11', description: '' }] },
    { name: 'B', levels: [{ code: '11', description: '' }, { code: '1', description: '' }] }, M.emptyForm().factors[2]] });
  assert.ok(keys(clash).includes('err.comboDup'));
});

test('parseDapList', () => {
  assert.deepEqual(M.parseDapList('28, 14;14 42'), [14, 28, 42]);
  assert.deepEqual(M.parseDapList(''), []);
  assert.equal(M.parseDapList('1x'), null);
});

test('layout comes from the core and is reproducible', () => {
  const a = M.makeExperiment(core, baseForm(), { seed: 99 });
  const b = M.makeExperiment(core, baseForm(), { seed: 99 });
  assert.deepEqual(a.plots, b.plots);
  assert.equal(a.plots.length, 3 * 4);
  for (let blk = 1; blk <= 4; blk++) {
    const ts = a.plots.filter((p) => p.block === blk).map((p) => p.t).sort();
    assert.deepEqual(ts, [0, 1, 2]);
  }
  const crd = M.makeExperiment(core, baseForm({ design: 'crd' }), { seed: 5 });
  assert.ok(crd.plots.every((p) => p.block === null));
  assert.deepEqual(crd.sessions.map((s) => s.dap), [14, 28]);
});

test('re-randomize is blocked once data exists', () => {
  const e = M.makeExperiment(core, baseForm(), { seed: 1 });
  const before = JSON.stringify(e.plots);
  M.rerandomize(core, e, 2);
  assert.notEqual(JSON.stringify(e.plots), before);
  filled(e, () => 1);
  assert.throws(() => M.rerandomize(core, e, 3));
});

test('example experiment is complete, clean and significant', () => {
  const e = M.makeExample(core, 'id');
  assert.equal(e.isSample, true);
  const sid = e.sessions[0].id, pid = e.parameters[0].id;
  const st = M.inspect(core, e, sid, pid);
  assert.equal(st.status, 'ready', JSON.stringify(st.check?.outliers));
  assert.equal(st.check.normality.p >= 0.05, true);
  const r = M.analyze(core, e, sid, pid, 'dmrt', 0.05);
  assert.equal(r.kind, 'single');
  assert.equal(r.treatment.sig, '**');
  assert.equal(r.postHoc.ranked.length, 4);
});

test('free plan: 1 active experiment, examples and archived do not count', () => {
  const state = { experiments: [] };
  assert.equal(M.canActivate(core, state), true);
  state.experiments.push(M.makeExample(core));
  assert.equal(M.canActivate(core, state), true);
  const e = M.makeExperiment(core, baseForm());
  state.experiments.push(e);
  assert.equal(M.activeCount(state), 1);
  assert.equal(M.canActivate(core, state), false);
  e.archived = true;
  assert.equal(M.canActivate(core, state), true);
});

test('entry: incomplete -> review (outlier) -> ready after Keep; editing clears Keep', () => {
  const e = M.makeExperiment(core, baseForm({ treatments: ['P1', 'P2', 'P3', 'P4'].map((c) => ({ code: c, description: '' })), reps: 5 }), { seed: 7 });
  const sid = e.sessions[0].id, pid = e.parameters[0].id;
  assert.equal(M.inspect(core, e, sid, pid).status, 'empty');
  let i = 0;
  const noise = [0.2, -0.3, 0.1, 0.4, -0.2, 0.3, -0.1, 0.2];
  e.plots.slice(0, 5).forEach((p) => M.setSample(e, sid, pid, p.n, 0, 10 + (p.t * 3) + noise[i++ % 8]));
  assert.equal(M.inspect(core, e, sid, pid).status, 'incomplete');
  e.plots.slice(5).forEach((p) => M.setSample(e, sid, pid, p.n, 0, 10 + (p.t * 3) + noise[i++ % 8]));
  assert.equal(M.inspect(core, e, sid, pid).status, 'ready');
  const target = e.plots[3];
  M.setSample(e, sid, pid, target.n, 0, 90);
  const st = M.inspect(core, e, sid, pid);
  assert.equal(st.status, 'review');
  assert.deepEqual(st.unresolved, [String(target.n)]);
  e.kept[`${sid}|${pid}|${target.n}`] = true;
  assert.equal(M.inspect(core, e, sid, pid).status, 'ready');
  M.setSample(e, sid, pid, target.n, 0, 91);
  assert.equal(M.inspect(core, e, sid, pid).status, 'review');
});

test('sub-samples are averaged per plot', () => {
  const f = baseForm({ parameters: [{ name: 'T', unit: 'cm', samples: 3 }] });
  const e = M.makeExperiment(core, f, { seed: 3 });
  const sid = e.sessions[0].id, pid = e.parameters[0].id;
  M.setSample(e, sid, pid, 1, 0, 10);
  M.setSample(e, sid, pid, 1, 2, 20);
  const v = M.plotValues(e, sid, pid);
  assert.equal(v.length, 1);
  assert.equal(v[0].value, 15);
  assert.deepEqual(M.getSamples(e, sid, pid, 1), [10, null, 20]);
  assert.deepEqual(M.samplesRecorded(e, sid, pid), { recorded: 2, expected: 36 });
  M.setSample(e, sid, pid, 1, 0, null);
  M.setSample(e, sid, pid, 1, 2, null);
  assert.deepEqual(M.progress(e, sid, pid), { filled: 0, total: 12 });
  assert.equal(e.obs[sid][pid][1], undefined);
});

test('factorial 2x2 RCBD analyzes with interaction tables', () => {
  const f = baseForm({ factorCount: 2, reps: 3, factors: [
    { name: 'Dosis N', levels: [{ code: 'N1', description: '' }, { code: 'N2', description: '' }] },
    { name: 'Varietas', levels: [{ code: 'V1', description: '' }, { code: 'V2', description: '' }, { code: 'V3', description: '' }] },
    M.emptyForm().factors[2]] });
  const e = M.makeExperiment(core, f, { seed: 11 });
  assert.equal(e.treatments.length, 6);
  assert.deepEqual(e.treatments[0], { code: 'N1V1', description: '', levels: ['N1', 'V1'] });
  let k = 0;
  const { sid, pid } = filled(e, (p, t) => 20 + (t.levels[0] === 'N2' ? 4 : 0) + Number(t.levels[1][1]) * 1.5 + p.block * 0.3 + ((k++ * 7) % 5) * 0.1);
  assert.equal(M.inspect(core, e, sid, pid).status, 'ready');
  const r = M.analyze(core, e, sid, pid, 'tukey', 0.05);
  assert.equal(r.kind, 'factorial');
  assert.deepEqual(r.levels, [['N1', 'N2'], ['V1', 'V2', 'V3']]);
  assert.ok(r.tables.AxB[0].means.length === 2 && r.tables.AxB[0].means[0].length === 3);
  assert.equal(r.main.length, 2);
});

test('csv export matches the app format', () => {
  const e = M.makeExample(core, 'en');
  e.title = 'Rice, "N" trial';
  const csv = M.toCsv(e).split('\n');
  assert.equal(csv[0], '# "Rice, ""N"" trial"; design RCBD; seed 4242; layout randomized');
  assert.equal(csv[1], 'dap,harvest,plot,block,replicate,treatment,factor_a,factor_b,factor_c,parameter,unit,sample,value,recorded_at');
  assert.equal(csv.filter(Boolean).length, 2 + 16);
  assert.match(csv[2], /^14,0,1,\d,\d,N\d,,,,Plant height,cm,1,[\d.]+,$/);
});

test('backup round-trips and rejects bad files', () => {
  const e = M.makeExample(core);
  const copy = M.fromBackup(M.toBackup(e));
  assert.notEqual(copy.id, e.id);
  assert.deepEqual({ ...copy, id: 0 }, { ...e, id: 0, archived: false });
  for (const bad of ['not json', '{}', JSON.stringify({ format: 'rancob-web-backup', version: 2, experiment: {} }),
    JSON.stringify({ format: 'rancob-web-backup', version: 1, experiment: { title: 'x', design: 'crd' } }),
    JSON.stringify({ format: 'rancob-web-backup', version: 1, experiment: { ...e, plots: [{ n: 1, t: 99, rep: 1, block: null }] } }),
    JSON.stringify({ format: 'rancob-web-backup', version: 1, experiment: { ...e, obs: { a: { b: { 1: ['x'] } } } } })]) {
    assert.throws(() => M.fromBackup(bad), undefined, bad.slice(0, 40));
  }
});

test('store persists, survives bad data, and works without storage', () => {
  const mem = new Map();
  const storage = { getItem: (k) => mem.get(k) ?? null, setItem: (k, v) => mem.set(k, v) };
  const s1 = createStore(storage);
  s1.add(M.makeExample(core));
  const s2 = createStore(storage);
  assert.equal(s2.state.experiments.length, 1);
  mem.set('rancob.web.v1', '{broken');
  assert.equal(createStore(storage).state.experiments.length, 0);
  const full = createStore({ getItem: () => null, setItem: () => { throw new Error('quota'); } });
  full.add(M.makeExample(core));
  assert.equal(full.persistent, false);
  assert.equal(full.state.experiments.length, 1);
  const none = createStore(null);
  none.add(M.makeExample(core));
  assert.equal(none.persistent, false);
});

test('i18n: Indonesian and English define the same keys, with matching placeholders', () => {
  const id = Object.keys(STRINGS.id), en = Object.keys(STRINGS.en);
  assert.deepEqual(id.filter((k) => !en.includes(k)), []);
  assert.deepEqual(en.filter((k) => !id.includes(k)), []);
  const ph = (s) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join();
  for (const k of id) assert.equal(ph(STRINGS.id[k]), ph(STRINGS.en[k]), k);
});

test('i18n: every t() key used by the UI exists', () => {
  const dir = join(site, 'app/js');
  const used = new Set();
  for (const f of readdirSync(dir).filter((f) => f.endsWith('.js'))) {
    const src = readFileSync(join(dir, f), 'utf8');
    for (const m of src.matchAll(/\bt\(\s*'([\w.]+)'/g)) used.add(m[1]);
    for (const m of src.matchAll(/key:\s*'(err\.[\w.]+)'|bad\('(err\.[\w.]+)'/g)) used.add(m[1] ?? m[2]);
  }
  const dynamic = ['design.crd', 'design.rcbd', 'design.crd.full', 'design.rcbd.full', 'analysis.test.dmrt', 'analysis.test.tukey', 'analysis.test.lsd',
    'anova.src.Block', 'anova.src.Treatment', 'anova.src.Error', 'anova.src.Total',
    'transform.none', 'transform.sqrt', 'transform.sqrt_half', 'transform.log10_1', 'transform.arcsin_pct'];
  for (const k of [...used, ...dynamic]) assert.ok(k in STRINGS.id, `missing key ${k}`);
});

test('analysis exposes Levene homogeneity, transforms, Kruskal-Wallis, and multi-session timeSeries', () => {
  const e = M.makeExperiment(core, baseForm({
    treatments: ['P0', 'P1', 'P2', 'P3'].map((c) => ({ code: c, description: '' })),
    reps: 4,
    dapList: '14, 28',
    parameters: [{ name: 'Intensitas', unit: '%', samples: 1 }],
  }), { seed: 21 });
  const [s1, s2] = e.sessions;
  const pid = e.parameters[0].id;
  // Session 1 (14 HST): percent values with 0s across blocks, no extreme outlier
  const v1 = [0, 1, 2, 1, 10, 12, 11, 13, 32, 35, 34, 37, 68, 70, 72, 74];
  const v2 = [2, 3, 4, 3, 16, 18, 17, 19, 42, 45, 44, 47, 76, 78, 80, 82];
  const byTrtCount = [0, 0, 0, 0];
  for (const p of e.plots) {
    const idx = p.t * 4 + byTrtCount[p.t]++;
    M.setSample(e, s1.id, pid, p.n, 0, v1[idx]);
    M.setSample(e, s2.id, pid, p.n, 0, v2[idx]);
  }
  const st = M.inspect(core, e, s1.id, pid);
  assert.equal(st.status, 'ready');
  assert.ok(st.check.homogeneity && typeof st.check.homogeneity.p === 'number');

  const raw = M.analyze(core, e, s1.id, pid, 'dmrt', 0.05, 'none');
  assert.equal(raw.transform, 'none');
  assert.ok(raw.availableTransforms.includes('arcsin_pct'));
  assert.equal(raw.suggestedTransform, 'arcsin_pct');
  assert.ok(raw.kruskal && raw.kruskal.groups.length === 4);
  assert.equal(raw.kruskal.sig, '**');

  const tx = M.analyze(core, e, s1.id, pid, 'dmrt', 0.05, 'arcsin_pct');
  assert.equal(tx.transform, 'arcsin_pct');
  assert.ok(Math.abs(tx.originalMeans.P3 - 71.0) < 1e-6);

  const ts = M.timeSeries(core, e, pid);
  assert.equal(ts.hasTrend, true);
  assert.deepEqual(ts.days, [14, 28]);
  assert.equal(ts.series.length, 4);
  assert.equal(ts.series[0].points.length, 2);
});

test('layout seeds are diverse and in the app range (agri_core newSeed is clock based: only 100 values under dart2js)', () => {
  const seeds = Array.from({ length: 500 }, () => M.newSeed());
  assert.ok(seeds.every((x) => Number.isInteger(x) && x >= 0 && x < 100000));
  assert.ok(new Set(seeds).size > 450, `distinct: ${new Set(seeds).size}`);
  assert.ok(new Set(seeds.map((x) => x % 1000)).size > 300, 'seeds must not all be multiples of 1000');
  assert.equal(typeof core.newSeed, 'undefined');
});
