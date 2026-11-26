// Web Pro status & Midtrans checkout client (no DOM, tested in Node with fake fetch).
// Talks only to Supabase REST (`rancob_entitlements`) and the `create-web-checkout`
// Edge Function; never embeds payment provider secrets.

export const PRO_PLANS = [
  { id: 'pro_semester', priceIdr: 89000, months: 6 },
  { id: 'pro_year', priceIdr: 149000, months: 12, best: true },
];

const TRUSTED_REDIRECT = /^https:\/\/app(?:\.sandbox)?\.midtrans\.com\//;

export function isTrustedMidtransUrl(url) {
  return typeof url === 'string' && TRUSTED_REDIRECT.test(url);
}

export function isProActive(proUntil, now = new Date()) {
  if (!proUntil) return false;
  const d = new Date(proUntil);
  return !Number.isNaN(d.getTime()) && d.getTime() > now.getTime();
}

export function createProClient({ url, key, fetch: f = globalThis.fetch }) {
  const origin = String(url).replace(/\/+$/, '');
  const headers = (token) => ({
    'Content-Type': 'application/json',
    apikey: key,
    Authorization: `Bearer ${token}`,
  });

  return {
    /** Reads the signed-in user's Pro expiry from public.rancob_entitlements. */
    async getEntitlement(token) {
      let res;
      try {
        res = await f(`${origin}/rest/v1/rancob_entitlements?select=pro_until,web_pro_until&limit=1`, {
          method: 'GET',
          headers: headers(token),
        });
      } catch {
        return { ok: false, error: 'network' };
      }
      if (res.status === 401 || res.status === 403) return { ok: false, error: 'badCode' };
      const data = await res.json().catch(() => null);
      if (!res.ok || !Array.isArray(data)) return { ok: false, error: 'server' };
      const row = data[0] ?? null;
      return {
        ok: true,
        proUntil: typeof row?.pro_until === 'string' ? row.pro_until : null,
      };
    },

    /** Starts a Midtrans Snap session (QRIS / e-wallet / VA) for planId. */
    async startWebOrder(token, planId) {
      if (!PRO_PLANS.some((p) => p.id === planId)) {
        return { ok: false, error: 'badInput' };
      }
      let res;
      try {
        res = await f(`${origin}/functions/v1/create-web-checkout`, {
          method: 'POST',
          headers: headers(token),
          body: JSON.stringify({ plan_id: planId }),
        });
      } catch {
        return { ok: false, error: 'network' };
      }
      const data = await res.json().catch(() => ({}));
      if (res.status === 401 || res.status === 403) return { ok: false, error: 'badCode' };
      if (!res.ok) return { ok: false, error: res.status >= 500 ? 'server' : 'other' };
      if (!isTrustedMidtransUrl(data?.redirect_url)) return { ok: false, error: 'other' };
      return {
        ok: true,
        orderId: String(data.order_id ?? ''),
        redirectUrl: data.redirect_url,
        sandbox: Boolean(data.sandbox),
      };
    },
  };
}
