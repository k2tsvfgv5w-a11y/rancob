// Passwordless sign-in against Supabase Auth's REST API (no SDK, no dependencies).
// Same flow as the Android app: ask for an emailed code, then verify it.
// No DOM here so it can be tested in Node with a fake fetch.

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const cleanEmail = (s) => String(s ?? '').trim().toLowerCase();
export const validEmail = (s) => { const e = cleanEmail(s); return e.length <= 254 && EMAIL_RE.test(e); };
// The code length is set in Supabase (Email OTP Length, currently 8); accept 6-10 digits.
export const cleanCode = (s) => String(s ?? '').replace(/\s+/g, '');
export const validCode = (s) => /^\d{6,10}$/.test(cleanCode(s));

/** Maps an Auth error response to a stable key the UI translates. */
export function classify(status, body) {
  const code = String(body?.error_code ?? body?.code ?? '');
  if (status === 429 || /rate_limit/.test(code)) return 'rate';
  if (code === 'otp_disabled' || code === 'signup_disabled') return 'noAccount';
  if (code === 'otp_expired' || status === 403 || status === 401) return 'badCode';
  if (code === 'validation_failed' || status === 400 || status === 422) return 'badInput';
  if (status >= 500) return 'server';
  return 'other';
}

export function createAuth({ url, key, fetch: f = globalThis.fetch }) {
  const base = String(url).replace(/\/+$/, '') + '/auth/v1';
  const headers = (token) => ({ 'Content-Type': 'application/json', apikey: key, ...(token ? { Authorization: `Bearer ${token}` } : {}) });

  async function call(path, body, token) {
    let res;
    try {
      res = await f(base + path, { method: 'POST', headers: headers(token), body: JSON.stringify(body ?? {}) });
    } catch {
      return { ok: false, error: 'network' };
    }
    const data = await res.json().catch(() => ({}));
    return res.ok ? { ok: true, data } : { ok: false, error: classify(res.status, data) };
  }

  return {
    /**
     * Sends the code. signup=true creates the account if the address is new (Supabase uses its
     * "Confirm signup" email); signup=false only signs in existing accounts ("Magic Link" email).
     * For sign-in, an unknown address is reported as success so the page cannot be used to
     * find out who has an account.
     */
    async requestCode(email, { signup }) {
      const r = await call('/otp', { email: cleanEmail(email), create_user: !!signup });
      if (!r.ok && r.error === 'noAccount' && !signup) return { ok: true, neutral: true };
      return r.ok ? { ok: true } : r;
    },
    async verifyCode(email, code) {
      const r = await call('/verify', { type: 'email', email: cleanEmail(email), token: cleanCode(code) });
      if (!r.ok) return r;
      const d = r.data;
      if (!d?.access_token) return { ok: false, error: 'other' };
      return { ok: true, session: { token: d.access_token, email: d.user?.email ?? cleanEmail(email) } };
    },
    async signOut(token) {
      await call('/logout', {}, token);
      return { ok: true };
    },
  };
}
