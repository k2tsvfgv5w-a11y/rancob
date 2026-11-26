import test from 'node:test';
import assert from 'node:assert/strict';
import { parseCsv, normalizeEmail, reconcileTesters, generateVerificationSql } from './verify-testers.mjs';

test('parseCsv handles quotes, BOM, and CRLF', () => {
  const rows = parseCsv('\uFEFFNama,Email Google\r\n"Budi, S.P.",Budi@Gmail.com\r\n');
  assert.equal(rows.length, 1);
  assert.equal(rows[0]['Nama'], 'Budi, S.P.');
  assert.equal(normalizeEmail(rows[0]['Email Google']), 'budi@gmail.com');
});

test('reconcileTesters marks eligible only when group + H7+SS + H14+SS are complete', () => {
  const daftarRows = [
    { Nama: 'Siti', 'Email Google': 'siti@gmail.com' },
    { Nama: 'Andi', 'Email Google': 'andi@gmail.com' },
  ];
  const grupRows = [
    { 'Email address': 'SITI@gmail.com' },
    { 'Email address': 'andi@gmail.com' },
  ];
  const masukanRows = [
    { Timestamp: '2026-12-07T10:00:00Z', 'Email Google': 'siti@gmail.com', Minggu: 'Minggu 1', Screenshot: 'https://drive.google.com/a' },
    { Timestamp: '2026-12-14T10:00:00Z', 'Email Google': 'siti@gmail.com', Minggu: 'Minggu 2', Screenshot: 'https://drive.google.com/b' },
    // Andi only submitted H7 without screenshot
    { Timestamp: '2026-12-07T12:00:00Z', 'Email Google': 'andi@gmail.com', Minggu: 'Minggu 1', Screenshot: '' },
  ];

  const results = reconcileTesters({ daftarRows, grupRows, masukanRows });
  const siti = results.find((r) => r.email === 'siti@gmail.com');
  const andi = results.find((r) => r.email === 'andi@gmail.com');

  assert.equal(siti.eligible, true);
  assert.equal(siti.h7ScreenshotOk, true);
  assert.equal(siti.h14ScreenshotOk, true);

  assert.equal(andi.eligible, false);
  assert.equal(andi.h7ScreenshotOk, false);
  assert.equal(andi.h14At, null);

  const sql = generateVerificationSql(results, { days: 180 });
  assert.match(sql, /select public\.rancob_grant_beta_pro\('siti@gmail\.com', 180\);/);
  assert.doesNotMatch(sql, /rancob_grant_beta_pro\('andi@gmail\.com'/);
});
