#!/usr/bin/env node
// Tests for the account page's sign-in logic: node --test tools/test-akun.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const site = join(dirname(fileURLToPath(import.meta.url)), '..');
const { createAuth, classify, validEmail, validCode, cleanCode, cleanEmail, parseAuthHash } = await import(join(site, 'akun/auth.js'));
const { STRINGS } = await import(join(site, 'akun/i18n.js'));
const { parseTheme, isDark, toggled, initialOf } = await import(join(site, 'akun/theme.js'));
const { createProClient, isProActive, isTrustedMidtransUrl } = await import(join(site, 'akun/pro.js'));

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
  const used = new Set([...src.matchAll(/\bt\('([\w.]+)'/g), ...src.matchAll(/data-t="([\w.]+)"/g), ...src.matchAll(/data-t-label="([\w.]+)"/g), ...src.matchAll(/`err\.\$\{/g)].map((m) => m[1]).filter(Boolean));
  for (const k of used) assert.ok(k in STRINGS.id, k);
  for (const e of ['rate', 'badCode', 'badInput', 'server', 'network', 'link', 'other']) assert.ok(`err.${e}` in STRINGS.id, e);
});

test('parseAuthHash reads the session or the error that Supabase puts in the URL', () => {
  assert.deepEqual(parseAuthHash('#access_token=abc&refresh_token=r&expires_in=3600&token_type=bearer&type=signup'), { token: 'abc' });
  assert.deepEqual(parseAuthHash('#error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired'), { error: 'link' });
  assert.deepEqual(parseAuthHash('#error=server_error'), { error: 'other' });
  for (const none of ['', '#', '#section', null, undefined]) assert.equal(parseAuthHash(none), null, String(none));
});

test('getUser sends a GET with the bearer token and returns the email', async () => {
  const f = async (u, o) => { f.last = { u, o }; return { ok: true, status: 200, json: async () => ({ email: 'A@B.id', id: 'x' }) }; };
  assert.deepEqual(await mk(f).getUser('tok'), { ok: true, user: { email: 'a@b.id', id: 'x', createdAt: null, lastSignInAt: null, providers: [] } });
  assert.equal(f.last.u, 'https://x.supabase.co/auth/v1/user');
  assert.equal(f.last.o.method, 'GET');
  assert.equal(f.last.o.headers.Authorization, 'Bearer tok');
  assert.deepEqual(await mk(reply(401, { error_code: 'bad_jwt' })).getUser('tok'), { ok: false, error: 'badCode' });
  assert.deepEqual(await mk(reply(200, {})).getUser('tok'), { ok: false, error: 'other' });
  assert.deepEqual(await mk(async () => { throw new Error('x'); }).getUser('tok'), { ok: false, error: 'network' });
});

test('getUser returns the profile fields the page shows', async () => {
  const body = { id: 'u-1', email: 'A@B.id', created_at: '2026-11-24T01:00:00Z', last_sign_in_at: '2026-11-24T02:00:00Z', app_metadata: { provider: 'email', providers: ['email', 'google'] } };
  assert.deepEqual(await mk(reply(200, body)).getUser('tok'), { ok: true, user: { email: 'a@b.id', id: 'u-1', createdAt: '2026-11-24T01:00:00Z', lastSignInAt: '2026-11-24T02:00:00Z', providers: ['email', 'google'] } });
  const single = { ...body, app_metadata: { provider: 'email' } };
  assert.deepEqual((await mk(reply(200, single)).getUser('tok')).user.providers, ['email']);
});

test('theme: null follows the system, an explicit choice wins, the switch flips what is shown', () => {
  assert.equal(parseTheme('dark'), 'dark');
  assert.equal(parseTheme('light'), 'light');
  for (const bad of [null, undefined, '', 'auto', 'DARK']) assert.equal(parseTheme(bad), null, String(bad));
  assert.equal(isDark(null, true), true);
  assert.equal(isDark(null, false), false);
  assert.equal(isDark('light', true), false);
  assert.equal(isDark('dark', false), true);
  assert.equal(toggled(null, true), 'light');
  assert.equal(toggled(null, false), 'dark');
  assert.equal(toggled('dark', false), 'light');
  assert.equal(toggled('light', true), 'dark');
});

test('avatar letter comes from the email', () => {
  assert.equal(initialOf('rina@contoh.id'), 'R');
  assert.equal(initialOf('  sari@x.id'), 'S');
  assert.equal(initialOf(''), '?');
  assert.equal(initialOf(null), '?');
});

test('the menu keeps paket.html link and keeps the page free of inline code', () => {
  const js = readFileSync(join(site, 'akun/akun.js'), 'utf8');
  assert.match(js, /href: '\.\.\/paket\.html'/);
  assert.doesNotMatch(js, /play\.google|market:\/\//i);
  const html = readFileSync(join(site, 'akun/index.html'), 'utf8');
  assert.match(html, /id="acct-btn"[^>]*data-t-label="menu\.account"/);
  assert.doesNotMatch(html, /\sstyle=/);
});

test('pro client reads entitlement and validates trusted Midtrans redirect URLs', async () => {
  assert.equal(isProActive('2027-06-01T00:00:00Z', new Date('2026-11-27T00:00:00Z')), true);
  assert.equal(isProActive('2026-01-01T00:00:00Z', new Date('2026-11-27T00:00:00Z')), false);
  assert.equal(isProActive(null), false);

  assert.equal(isTrustedMidtransUrl('https://app.sandbox.midtrans.com/snap/v4/redirection/abc'), true);
  assert.equal(isTrustedMidtransUrl('https://app.midtrans.com/snap/v4/redirection/abc'), true);
  assert.equal(isTrustedMidtransUrl('https://evil.example.com/snap'), false);
  assert.equal(isTrustedMidtransUrl('javascript:alert(1)'), false);

  const entClient = createProClient({
    url: 'https://x.supabase.co/',
    key: 'sb_publishable_test',
    fetch: reply(200, [{ pro_until: '2027-06-01T00:00:00Z' }]),
  });
  assert.deepEqual(await entClient.getEntitlement('tok'), { ok: true, proUntil: '2027-06-01T00:00:00Z' });

  const f = spy(reply(200, { order_id: 'RANCOB-1', redirect_url: 'https://app.sandbox.midtrans.com/snap/v4/redirection/xyz', sandbox: true }));
  const pro = createProClient({ url: 'https://x.supabase.co/', key: 'sb_publishable_test', fetch: f });
  assert.deepEqual(await pro.startWebOrder('tok', 'pro_year'), {
    ok: true,
    orderId: 'RANCOB-1',
    redirectUrl: 'https://app.sandbox.midtrans.com/snap/v4/redirection/xyz',
    sandbox: true,
  });
  assert.equal(f.calls[0].u, 'https://x.supabase.co/functions/v1/create-web-checkout');
  assert.deepEqual(f.calls[0].body, { plan_id: 'pro_year' });

  const badRedirect = createProClient({
    url: 'https://x.supabase.co/',
    key: 'sb_publishable_test',
    fetch: reply(200, { order_id: 'RANCOB-2', redirect_url: 'https://evil.example.com/' }),
  });
  assert.deepEqual(await badRedirect.startWebOrder('tok', 'pro_semester'), { ok: false, error: 'other' });
  assert.deepEqual(await pro.startWebOrder('tok', 'unknown'), { ok: false, error: 'badInput' });
});
