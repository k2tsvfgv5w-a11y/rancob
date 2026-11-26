#!/usr/bin/env node
// Cross-checks Google Form & Google Group CSV exports for Rancob closed testing
// and generates ready-to-run Supabase SQL for `rancob_beta_testers` + `rancob_grant_beta_pro`.
//
// Usage:
//   node tools/verify-testers.mjs --daftar daftar.csv --grup grup.csv --masukan masukan.csv [--days 180] [--sql out.sql]

import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  const src = text.replace(/^\uFEFF/, '');
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (inQuotes) {
      if (ch === '"' && src[i + 1] === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      row.push(field);
      field = '';
    } else if (ch === '\r' || ch === '\n') {
      if (ch === '\r' && src[i + 1] === '\n') i++;
      row.push(field);
      if (row.some((cell) => cell.trim() !== '')) rows.push(row);
      row = [];
      field = '';
    } else {
      field += ch;
    }
  }
  row.push(field);
  if (row.some((cell) => cell.trim() !== '')) rows.push(row);
  if (rows.length === 0) return [];
  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1).map((cells) => {
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = (cells[idx] ?? '').trim();
    });
    return obj;
  });
}

export function normalizeEmail(raw) {
  const s = String(raw || '').trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) ? s : '';
}

function findColumn(row, patterns) {
  for (const key of Object.keys(row)) {
    const lower = key.toLowerCase();
    if (patterns.some((p) => p.test(lower))) return row[key];
  }
  return '';
}

function extractEmailFromRow(row) {
  const candidate = findColumn(row, [/email/, /gmail/, /surel/, /address/]);
  const direct = normalizeEmail(candidate);
  if (direct) return direct;
  for (const val of Object.values(row)) {
    const found = normalizeEmail(val);
    if (found) return found;
  }
  return '';
}

function parseTimestamp(raw) {
  if (!raw) return null;
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function reconcileTesters({ daftarRows = [], grupRows = [], masukanRows = [] }) {
  const testers = new Map();

  const ensure = (email) => {
    if (!testers.has(email)) {
      testers.set(email, {
        email,
        name: '',
        registered: false,
        joinedGroup: false,
        submissions: [],
      });
    }
    return testers.get(email);
  };

  for (const row of daftarRows) {
    const email = extractEmailFromRow(row);
    if (!email) continue;
    const t = ensure(email);
    t.registered = true;
    const name = findColumn(row, [/nama/, /name/]);
    if (name && !t.name) t.name = name;
  }

  for (const row of grupRows) {
    const email = extractEmailFromRow(row);
    if (!email) continue;
    const t = ensure(email);
    t.joinedGroup = true;
    const name = findColumn(row, [/nickname/, /nama/, /name/]);
    if (name && !t.name) t.name = name;
  }

  for (const row of masukanRows) {
    const email = extractEmailFromRow(row);
    if (!email) continue;
    const t = ensure(email);
    const tsRaw = findColumn(row, [/timestamp/, /waktu/, /tanggal/]);
    const weekRaw = findColumn(row, [/minggu/, /week/, /tahap/, /hari/]).toLowerCase();
    const ssRaw = findColumn(row, [/screenshot/, /tangkapan/, /bukti/, /foto/, /gambar/]);
    t.submissions.push({
      at: parseTimestamp(tsRaw),
      weekHint: weekRaw,
      hasScreenshot: Boolean(ssRaw && ssRaw.trim().length > 0),
    });
  }

  const results = [];
  for (const t of testers.values()) {
    const sorted = [...t.submissions].sort((a, b) => (a.at?.getTime() ?? 0) - (b.at?.getTime() ?? 0));
    let h7 = sorted.find((s) => /1|h7|minggu\s*1|pertama/.test(s.weekHint)) || sorted[0] || null;
    let h14 = sorted.find((s) => s !== h7 && /2|h14|minggu\s*2|akhir/.test(s.weekHint))
      || (sorted.length >= 2 ? sorted[sorted.length - 1] : null);

    const h7Done = Boolean(h7);
    const h7ScreenshotOk = Boolean(h7?.hasScreenshot);
    const h14Done = Boolean(h14);
    const h14ScreenshotOk = Boolean(h14?.hasScreenshot);
    const eligible = t.joinedGroup && h7Done && h7ScreenshotOk && h14Done && h14ScreenshotOk;

    results.push({
      email: t.email,
      name: t.name,
      registered: t.registered,
      joinedGroup: t.joinedGroup,
      h7At: h7?.at ? h7.at.toISOString() : (h7Done ? new Date().toISOString() : null),
      h7ScreenshotOk,
      h14At: h14?.at ? h14.at.toISOString() : (h14Done ? new Date().toISOString() : null),
      h14ScreenshotOk,
      eligible,
    });
  }

  return results.sort((a, b) => Number(b.eligible) - Number(a.eligible) || a.email.localeCompare(b.email));
}

function sqlLiteral(val) {
  if (val === null || val === undefined || val === '') return 'null';
  return `'${String(val).replace(/'/g, "''")}'`;
}

export function generateVerificationSql(results, { days = 180, cohort = 'closed_beta_v1' } = {}) {
  const lines = [
    '-- Auto-generated by tools/verify-testers.mjs',
    '-- Jalankan di Supabase SQL Editor (aman dijalankan berulang / idempoten).',
    '',
  ];

  for (const r of results) {
    lines.push(
      `insert into public.rancob_beta_testers (email, name, cohort, joined_group, h7_submitted_at, h7_screenshot_ok, h14_submitted_at, h14_screenshot_ok, updated_at)`,
      `values (${sqlLiteral(r.email)}, ${sqlLiteral(r.name || null)}, ${sqlLiteral(cohort)}, ${r.joinedGroup}, ${sqlLiteral(r.h7At)}::timestamptz, ${r.h7ScreenshotOk}, ${sqlLiteral(r.h14At)}::timestamptz, ${r.h14ScreenshotOk}, now())`,
      `on conflict (email) do update set`,
      `  name = coalesce(excluded.name, public.rancob_beta_testers.name),`,
      `  joined_group = excluded.joined_group or public.rancob_beta_testers.joined_group,`,
      `  h7_submitted_at = coalesce(excluded.h7_submitted_at, public.rancob_beta_testers.h7_submitted_at),`,
      `  h7_screenshot_ok = excluded.h7_screenshot_ok or public.rancob_beta_testers.h7_screenshot_ok,`,
      `  h14_submitted_at = coalesce(excluded.h14_submitted_at, public.rancob_beta_testers.h14_submitted_at),`,
      `  h14_screenshot_ok = excluded.h14_screenshot_ok or public.rancob_beta_testers.h14_screenshot_ok,`,
      `  updated_at = now();`,
      '',
    );
  }

  const eligible = results.filter((r) => r.eligible);
  lines.push('-- Aktifkan Pro gratis untuk penguji yang memenuhi syarat (idempoten; melewati akun yang belum login):');
  if (eligible.length === 0) {
    lines.push('-- (Belum ada penguji yang memenuhi seluruh syarat H7 + H14 + screenshot.)');
  } else {
    for (const r of eligible) {
      lines.push(`select public.rancob_grant_beta_pro(${sqlLiteral(r.email)}, ${Number(days)});`);
    }
  }
  lines.push('', '-- Cek status akhir seluruh penguji:', 'select * from rancob_private.beta_verification_status order by eligible_for_pro desc, email;');
  return lines.join('\n') + '\n';
}

function parseCliArgs(argv) {
  const args = { days: 180 };
  for (let i = 0; i < argv.length; i++) {
    const flag = argv[i];
    if (flag === '--daftar') args.daftar = argv[++i];
    else if (flag === '--grup') args.grup = argv[++i];
    else if (flag === '--masukan') args.masukan = argv[++i];
    else if (flag === '--days') args.days = Number(argv[++i]) || 180;
    else if (flag === '--sql') args.sql = argv[++i];
  }
  return args;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = parseCliArgs(process.argv.slice(2));
  if (!args.daftar && !args.grup && !args.masukan) {
    console.error('Usage: node tools/verify-testers.mjs --daftar daftar.csv --grup grup.csv --masukan masukan.csv [--days 180] [--sql out.sql]');
    process.exit(1);
  }
  const readCsv = (p) => (p ? parseCsv(readFileSync(p, 'utf8')) : []);
  const results = reconcileTesters({
    daftarRows: readCsv(args.daftar),
    grupRows: readCsv(args.grup),
    masukanRows: readCsv(args.masukan),
  });

  const eligibleCount = results.filter((r) => r.eligible).length;
  console.log(`Total penguji unik: ${results.length} | Memenuhi syarat Pro: ${eligibleCount}`);
  for (const r of results) {
    const flags = [
      r.joinedGroup ? 'GRUP' : '----',
      r.h7At && r.h7ScreenshotOk ? 'H7+SS' : (r.h7At ? 'H7   ' : '-----'),
      r.h14At && r.h14ScreenshotOk ? 'H14+SS' : (r.h14At ? 'H14   ' : '------'),
      r.eligible ? 'LAYAK' : 'BELUM',
    ].join(' | ');
    console.log(`  ${flags} | ${r.email}${r.name ? ` (${r.name})` : ''}`);
  }

  const sql = generateVerificationSql(results, { days: args.days });
  if (args.sql) {
    writeFileSync(args.sql, sql, 'utf8');
    console.log(`\nSQL ditulis ke ${args.sql}`);
  }
}
