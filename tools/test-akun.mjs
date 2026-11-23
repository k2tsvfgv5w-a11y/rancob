#!/usr/bin/env node
// Tests for the account page's sign-in logic: node --test tools/test-akun.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const site = join(dirname(fileURLToPath(import.meta.url)), '..');
const { createAuth, classify, validEmail, validCode, cleanCode, cleanEmail } = await import(join(site, 'akun/auth.js'));
const { STRINGS } = await import(join(site, 'akun/i18n.js'));

const reply = (status, body) => async () => ({ ok: status >= 200 && status < 300, status, json: async () => body });
const spy = (impl) => { const calls = []; const f = async (u, o) => { calls.push({ u, o, body: JSON.parse(o.body) }); return impl(u, o); }; f.calls = calls; return f; };
const mk = (f) => createAuth({ url: 'https://x.supabase.co/', key: 'sb_publishable_test', fetch: f });

test('email and code validation', () => {
  assert.ok(validEmail(' Nama@Contoh.ID '));
  for (const bad of ['', 'a', 'a@b', 'a b@c.id', '@c.id', 'a@.id']) assert.ok(!validEmail(bad), bad);
  assert.equal(cleanEmail(' A@B.ID '), 'a@b.id');
  assert.ok(validCode('48291537') && validCode('482 915') && validCode('1234567890'));
  for (const bad of ['', '12345', 'abc12345', '12345678901']) assert.ok(!validCode(bad), bad);
  assert.equal(cleanCode(' 4829 1537 '), '48291537');
});

test('classify maps Supabase errors to stable keys', () => {
  assert.equal(classify(429, {}), 'rate');
  assert.equal(classify(400, { error_code: 'over_email_send_rate_limit' }), 'rate');
  assert.equal(classify(422, { error_code: 'otp_disabled' }), 'noAccount');
  assert.equal(classify(403, { error_code: 'otp_expired' }), 'badCode');
  assert.equal(classify(422, { error_code: 'validation_failed' }), 'badInput');
  assert.equal(classify(500, { error_code: 'unexpected_failure' }), 'server');
  assert.equal(classify(418, {}), 'other');
});

test('requestCode posts to /otp with the key, lowercased email and create_user', async () => {
  const f = spy(reply(200, {}));
  const r = await mk(f).requestCode(' Nama@Contoh.ID ', { signup: true });
  assert.deepEqual(r, { ok: true });
  const c = f.calls[0];
  assert.equal(c.u, 'https://x.supabase.co/auth/v1/otp');
  assert.equal(c.o.method, 'POST');
  assert.equal(c.o.headers.apikey, 'sb_publishable_test');
  assert.equal(c.o.headers.Authorization, undefined);
  assert.deepEqual(c.body, { email: 'nama@contoh.id', create_user: true });
});

test('sign-in with an unknown address looks like success; sign-up does not hide it', async () => {
  const unknown = reply(422, { error_code: 'otp_disabled' });
  assert.deepEqual(await mk(spy(unknown)).requestCode('a@b.id', { signup: false }), { ok: true, neutral: true });
  const f = spy(reply(200, {}));
  await mk(f).requestCode('a@b.id', { signup: false });
  assert.equal(f.calls[0].body.create_user, false);
});

test('requestCode reports rate limits, server failures and network errors', async () => {
  assert.deepEqual(await mk(reply(429, { error_code: 'over_email_send_rate_limit' })).requestCode('a@b.id', { signup: true }), { ok: false, error: 'rate' });
  assert.deepEqual(await mk(reply(500, { error_code: 'unexpected_failure' })).requestCode('a@b.id', { signup: true }), { ok: false, error: 'server' });
  const down = async () => { throw new TypeError('Failed to fetch'); };
  assert.deepEqual(await mk(down).requestCode('a@b.id', { signup: true }), { ok: false, error: 'network' });
});

test('verifyCode posts type=email and returns the session', async () => {
  const f = spy(reply(200, { access_token: 'tok', user: { email: 'a@b.id' } }));
  const r = await mk(f).verifyCode('A@B.id', ' 4829 1537 ');
  assert.deepEqual(r, { ok: true, session: { token: 'tok', email: 'a@b.id' } });
  assert.equal(f.calls[0].u, 'https://x.supabase.co/auth/v1/verify');
  assert.deepEqual(f.calls[0].body, { type: 'email', email: 'a@b.id', token: '48291537' });
});

test('verifyCode rejects wrong or expired codes and empty sessions', async () => {
  assert.deepEqual(await mk(reply(403, { error_code: 'otp_expired' })).verifyCode('a@b.id', '12345678'), { ok: false, error: 'badCode' });
  assert.deepEqual(await mk(reply(200, {})).verifyCode('a@b.id', '12345678'), { ok: false, error: 'other' });
});

test('signOut sends the bearer token and never throws', async () => {
  const f = spy(reply(204, {}));
  assert.deepEqual(await mk(f).signOut('tok'), { ok: true });
  assert.equal(f.calls[0].o.headers.Authorization, 'Bearer tok');
  assert.deepEqual(await mk(async () => { throw new Error('x'); }).signOut('tok'), { ok: true });
});

test('every UI string exists in Indonesian and English with matching placeholders', () => {
  const ph = (s) => (s.match(/\{\w+\}/g) ?? []).sort().join();
  assert.deepEqual(Object.keys(STRINGS.id).sort(), Object.keys(STRINGS.en).sort());
  for (const k of Object.keys(STRINGS.id)) assert.equal(ph(STRINGS.id[k]), ph(STRINGS.en[k]), k);
});

test('the page cannot reach anything but Supabase and ships no inline code', () => {
  const html = readFileSync(join(site, 'akun/index.html'), 'utf8');
  const csp = html.match(/Content-Security-Policy" content="([^"]+)"/)[1];
  assert.match(csp, /default-src 'self'/);
  assert.match(csp, /connect-src https:\/\/wxfvupvzxiudmmeyjxqw\.supabase\.co(;|$)/);
  assert.match(csp, /script-src 'self'(;|$)/);
  assert.match(csp, /form-action 'none'/);
  assert.doesNotMatch(html, /<script(?![^>]*\bsrc=)/);
  assert.doesNotMatch(html, /\sstyle=/);
  const cfg = readFileSync(join(site, 'akun/config.js'), 'utf8');
  assert.doesNotMatch(cfg, /sb_secret|service_role/);
});

test('every text key used by the page exists', () => {
  const src = readFileSync(join(site, 'akun/akun.js'), 'utf8') + readFileSync(join(site, 'akun/index.html'), 'utf8');
  const used = new Set([...src.matchAll(/\bt\('([\w.]+)'/g), ...src.matchAll(/data-t="([\w.]+)"/g), ...src.matchAll(/`err\.\$\{/g)].map((m) => m[1]).filter(Boolean));
  for (const k of used) assert.ok(k in STRINGS.id, k);
  for (const e of ['rate', 'badCode', 'badInput', 'server', 'network', 'other']) assert.ok(`err.${e}` in STRINGS.id, e);
});
