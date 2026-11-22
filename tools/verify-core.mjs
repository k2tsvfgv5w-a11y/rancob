#!/usr/bin/env node
// Proves app/core.js (dart2js) gives the same numbers as agri_core in the
// Dart VM on CRD, RCBD and factorial data, for all post-hoc tests.
//
//   node tools/verify-core.mjs

import { writeFileSync, readFileSync, mkdtempSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const site = join(dirname(fileURLToPath(import.meta.url)), '..');
createRequire(import.meta.url)(join(site, 'app/core.js'));
const core = globalThis.RancobCore;

// Small deterministic RNG so cases are reproducible.
function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 2 ** 32);
}
function normal(r) {
  return Math.sqrt(-2 * Math.log(1 - r())) * Math.cos(2 * Math.PI * r());
}

/** Data for a design: `levels` = factor level lists (1 factor = treatments). */
function dataset({ rcbd, levels, reps, seed, noise = 2 }) {
  const r = rng(seed);
  const combos = levels.reduce((acc, ls) => acc.flatMap((c) => ls.map((l) => [...c, l])), [[]]);
  const rows = [];
  let id = 1;
  for (let rep = 1; rep <= reps; rep++) {
    for (const [ci, c] of combos.entries()) {
      const effect = c.reduce((s, l, i) => s + (l.charCodeAt(l.length - 1) - 48) * (i + 1) * 1.5, 0);
      rows.push({
        id: String(id++),
        trt: c.join(''),
        block: rcbd ? rep : null,
        levels: levels.length > 1 ? c : undefined,
        value: 20 + effect + (rcbd ? rep * 0.7 : 0) + noise * normal(r),
      });
    }
  }
  return rows;
}

const cases = [];
const add = (name, fn, input) => cases.push({ name, fn, input });
const tests = ['dmrt', 'tukey', 'lsd'];
for (const test of tests) {
  for (const alpha of [0.05, 0.01]) {
    const single = ['P1', 'P2', 'P3', 'P4', 'P5'];
    add(`crd ${test} ${alpha}`, 'analyze', { rcbd: false, factorial: false, test, alpha, data: dataset({ rcbd: false, levels: [single.map((p, i) => p.slice(0, 1) + (i + 1))], reps: 4, seed: 1 }) });
    add(`rcbd ${test} ${alpha}`, 'analyze', { rcbd: true, factorial: false, test, alpha, data: dataset({ rcbd: true, levels: [single.map((p, i) => p.slice(0, 1) + (i + 1))], reps: 4, seed: 2 }) });
    const two = [['N1', 'N2', 'N3'], ['V1', 'V2']];
    add(`fact2 rcbd ${test} ${alpha}`, 'analyze', { rcbd: true, factorial: true, orders: two, test, alpha, data: dataset({ rcbd: true, levels: two, reps: 3, seed: 3 }) });
    const three = [['A1', 'A2'], ['B1', 'B2', 'B3'], ['C1', 'C2']];
    add(`fact3 crd ${test} ${alpha}`, 'analyze', { rcbd: false, factorial: true, orders: three, test, alpha, data: dataset({ rcbd: false, levels: three, reps: 3, seed: 4 }) });
  }
}
const t5 = ['P1', 'P2', 'P3', 'P4', 'P5'];
add('check crd', 'check', { rcbd: false, data: dataset({ rcbd: false, levels: [t5], reps: 5, seed: 5 }) });
add('check rcbd outlier', 'check', { rcbd: true, data: dataset({ rcbd: true, levels: [t5], reps: 4, seed: 6 }).map((d, i) => (i === 7 ? { ...d, value: d.value + 40 } : d)) });
add('layout crd', 'layout', { design: 'crd', treatments: 6, reps: 4, seed: 12345 });
add('layout rcbd', 'layout', { design: 'rcbd', treatments: 6, reps: 4, seed: 777 });
add('limit', 'canAddActive', { pro: false, activeCount: 1 });
add('limit0', 'canAddActive', { pro: false, activeCount: 0 });
add('error: one treatment', 'analyze', { rcbd: false, factorial: false, test: 'dmrt', alpha: 0.05, data: [{ id: '1', trt: 'P1', value: 1 }, { id: '2', trt: 'P1', value: 2 }] });

const dir = mkdtempSync(join(tmpdir(), 'rancob-verify-'));
const casesPath = join(dir, 'cases.json');
writeFileSync(casesPath, JSON.stringify(cases));
const native = JSON.parse(
  execFileSync('dart', ['run', 'tool/native.dart', casesPath], { cwd: join(site, 'core'), encoding: 'utf8', maxBuffer: 1 << 26 }),
);

// Compare structurally; numbers within a tight relative tolerance (libm vs JS Math).
let compared = 0;
function same(a, b, path) {
  if (typeof a === 'number' && typeof b === 'number') {
    compared++;
    const tol = 1e-9 * Math.max(1, Math.abs(a), Math.abs(b));
    if (Math.abs(a - b) > tol) throw new Error(`${path}: ${a} vs ${b}`);
  } else if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) throw new Error(`${path}: length ${a.length} vs ${b.length}`);
    a.forEach((x, i) => same(x, b[i], `${path}[${i}]`));
  } else if (a && b && typeof a === 'object' && typeof b === 'object') {
    const ka = Object.keys(a).sort().join(), kb = Object.keys(b).sort().join();
    if (ka !== kb) throw new Error(`${path}: keys ${ka} vs ${kb}`);
    for (const k of Object.keys(a)) same(a[k], b[k], `${path}.${k}`);
  } else if (a !== b) throw new Error(`${path}: ${JSON.stringify(a)} vs ${JSON.stringify(b)}`);
}

let failed = 0;
for (const [i, c] of cases.entries()) {
  const js = JSON.parse(core[c.fn](JSON.stringify(c.input)));
  try {
    same(js, JSON.parse(native[i]), c.name);
    if (c.name.startsWith('error') && js.error !== 'anova') throw new Error('expected an anova error');
  } catch (e) {
    failed++;
    console.error('FAIL', e.message);
  }
}
console.log(`${cases.length - failed}/${cases.length} cases identical in JS and Dart VM (${compared} numbers compared).`);
process.exit(failed ? 1 : 0);
