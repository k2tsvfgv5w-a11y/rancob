// Account page: passwordless sign-in / sign-up with an emailed code.
// Text from users only goes through textContent/attributes (see ../app/js/dom.js).
import { h, append, clear } from '../app/js/dom.js';
import { createAuth, validEmail, validCode, cleanEmail, cleanCode, parseAuthHash } from './auth.js';
import { createProClient, isProActive } from './pro.js';
import { SUPABASE_URL, SUPABASE_KEY } from './config.js';
import { STRINGS } from './i18n.js';
import { parseTheme, isDark, toggled, initialOf } from './theme.js';

const auth = createAuth({ url: SUPABASE_URL, key: SUPABASE_KEY });
const proClient = createProClient({ url: SUPABASE_URL, key: SUPABASE_KEY });
const root = document.getElementById('akun');
const RESEND_SECONDS = 60;

const safe = (fn, fallback = null) => { try { return fn(); } catch { return fallback; } };
const session = {
  load() { const raw = safe(() => sessionStorage.getItem('rancob.akun.session')); try { const s = JSON.parse(raw); return s?.token && s?.email ? s : null; } catch { return null; } },
  save(s) { safe(() => (s ? sessionStorage.setItem('rancob.akun.session', JSON.stringify(s)) : sessionStorage.removeItem('rancob.akun.session'))); },
};

let lang = safe(() => localStorage.getItem('rancob.akun.lang')) || ((navigator.language || 'id').startsWith('en') ? 'en' : 'id');
if (!STRINGS[lang]) lang = 'id';
const t = (k, vars = {}) => (STRINGS[lang][k] ?? STRINGS.id[k] ?? k).replace(/\{(\w+)\}/g, (m, n) => (vars[n] ?? m));

const state = {
  mode: 'in', step: 'email', email: '', msg: null, busy: false, cooldown: 0, agreed: false,
  user: session.load(), profile: null,
  pro: { loading: false, proUntil: null, payingPlan: null, msg: null },
};
let timer = null;

function startCooldown() {
  clearInterval(timer);
  state.cooldown = RESEND_SECONDS;
  timer = setInterval(() => {
    state.cooldown = Math.max(0, state.cooldown - 1);
    paintResend();
    if (state.cooldown === 0) clearInterval(timer);
  }, 1000);
}
function paintResend() {
  const b = document.getElementById('resend');
  if (!b) return;
  b.disabled = state.busy || state.cooldown > 0;
  b.textContent = state.cooldown > 0 ? t('btn.resendIn', { s: state.cooldown }) : t('btn.resend');
}

const setMsg = (kind, key, vars) => { state.msg = key ? { kind, key, vars } : null; };
function msgEl() {
  if (!state.msg) return h('p', { class: 'msg', role: 'status', 'aria-live': 'polite' });
  return h('p', { class: `msg ${state.msg.kind}`, role: state.msg.kind === 'error' ? 'alert' : 'status', 'aria-live': 'polite' }, t(state.msg.key, state.msg.vars));
}

function field(id, label, input, hint) {
  return h('div', { class: 'field' }, h('label', { class: 'field-label', for: id }, label), input, hint ? h('span', { class: 'field-hint' }, hint) : null);
}

function termsLabel() {
  const links = { '{terms}': h('a', { href: '../syarat.html' }, t('terms.terms')), '{privacy}': h('a', { href: '../privasi.html' }, t('terms.privacy')) };
  return t('terms.accept').split(/(\{\w+\})/).map((p) => links[p] ?? p);
}

function tabs() {
  const btn = (mode) => h('button', { type: 'button', class: 'seg', 'aria-pressed': String(state.mode === mode), onclick: () => { if (state.mode === mode) return; state.mode = mode; state.step = 'email'; setMsg(); render(); } }, t(mode === 'in' ? 'tab.in' : 'tab.up'));
  return h('div', { class: 'segs', role: 'group', 'aria-label': t('tab.label') }, btn('in'), btn('up'));
}

async function sendCode(email) {
  state.busy = true; render();
  const r = await auth.requestCode(email, { signup: state.mode === 'up' });
  state.busy = false;
  if (!r.ok) { setMsg('error', `err.${r.error}`); render(); return; }
  state.email = email; state.step = 'code';
  setMsg('info', r.neutral ? 'msg.neutral' : 'msg.sent', { email });
  startCooldown(); render();
}

function emailStep() {
  const input = h('input', { id: 'f-email', type: 'email', inputmode: 'email', autocomplete: 'email', autocapitalize: 'none', spellcheck: 'false', required: true, value: state.email, 'aria-invalid': state.msg?.key === 'err.email' ? 'true' : null });
  const agree = h('input', { id: 'f-terms', type: 'checkbox', checked: state.agreed, onchange: (e) => { state.agreed = e.target.checked; } });
  return h('form', { class: 'card form', novalidate: true, onsubmit: (e) => {
    e.preventDefault();
    const email = cleanEmail(input.value);
    state.email = email;
    if (!validEmail(email)) { setMsg('error', 'err.email'); render(); return; }
    if (state.mode === 'up' && !state.agreed) { setMsg('error', 'err.terms'); render(); return; }
    sendCode(email);
  } },
  tabs(),
  field('f-email', t('field.email'), input),
  state.mode === 'up' ? h('label', { class: 'check', for: 'f-terms' }, agree, h('span', null, termsLabel())) : null,
  msgEl(),
  h('button', { type: 'submit', class: 'btn primary', disabled: state.busy }, state.busy ? t('btn.sending') : t('btn.send')));
}

function codeStep() {
  const input = h('input', { id: 'f-code', type: 'text', inputmode: 'numeric', autocomplete: 'one-time-code', pattern: '[0-9]*', maxlength: '12', required: true, 'aria-invalid': state.msg?.key === 'err.code' || state.msg?.key === 'err.badCode' ? 'true' : null });
  return h('form', { class: 'card form', novalidate: true, onsubmit: async (e) => {
    e.preventDefault();
    if (!validCode(input.value)) { setMsg('error', 'err.code'); render(); return; }
    state.busy = true; render();
    const r = await auth.verifyCode(state.email, cleanCode(input.value));
    state.busy = false;
    if (!r.ok) { setMsg('error', `err.${r.error}`); render(); return; }
    clearInterval(timer);
    state.user = r.session; session.save(r.session); state.profile = null;
    state.step = 'email'; setMsg(); render(); loadProfile();
  } },
  msgEl(),
  field('f-code', t('field.code'), input, t('field.codeHint')),
  h('button', { type: 'submit', class: 'btn primary', disabled: state.busy }, state.busy ? t('btn.verifying') : t('btn.verify')),
  h('div', { class: 'row' },
    h('button', { id: 'resend', type: 'button', class: 'btn ghost', onclick: () => sendCode(state.email) }, t('btn.resend')),
    h('button', { type: 'button', class: 'btn ghost', onclick: () => { clearInterval(timer); state.step = 'email'; setMsg(); render(); } }, t('btn.change'))));
}

const fmtDate = (iso) => {
  const d = iso ? new Date(iso) : null;
  if (!d || Number.isNaN(d.getTime())) return '-';
  return new Intl.DateTimeFormat(lang === 'id' ? 'id-ID' : 'en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(d);
};
const methodLabel = (p) => (p === 'email' ? t('prof.methodEmail') : p === 'google' ? t('prof.methodGoogle') : p);

function profileRows() {
  const p = state.profile;
  if (!p) return h('p', { class: 'muted small' }, t('prof.loading'));
  const row = (k, v, cls) => [h('dt', null, t(k)), h('dd', { class: cls }, v)];
  return h('dl', { class: 'prof' },
    row('prof.email', p.email),
    row('prof.id', p.id ?? '-', 'mono'),
    row('prof.created', fmtDate(p.createdAt)),
    row('prof.last', fmtDate(p.lastSignInAt)),
    row('prof.method', p.providers.length ? p.providers.map(methodLabel).join(', ') : '-'));
}

/** Fetches the account details; a rejected token means the session is over. */
async function loadProfile() {
  if (!state.user) return;
  const r = await auth.getUser(state.user.token);
  if (r.ok) { state.profile = r.user; render(); loadPro(); return; }
  if (r.error === 'badCode') {
    state.user = null; state.profile = null; session.save(null); setMsg('error', 'err.expired'); render();
  }
}

async function loadPro() {
  if (!state.user) return;
  state.pro.loading = true;
  render();
  const synced = await proClient.syncOrders(state.user.token);
  if (synced.ok) {
    state.pro.proUntil = synced.proUntil;
    state.pro.loading = false;
    render();
    return;
  }
  const r = await proClient.getEntitlement(state.user.token);
  state.pro.loading = false;
  if (r.ok) state.pro.proUntil = r.proUntil;
  render();
}

async function payPlan(planId) {
  if (!state.user || state.pro.payingPlan) return;
  state.pro.payingPlan = planId;
  state.pro.msg = null;
  render();
  const r = await proClient.startWebOrder(state.user.token, planId);
  state.pro.payingPlan = null;
  if (!r.ok) {
    if (r.error === 'badCode') {
      state.user = null; state.profile = null; session.save(null); setMsg('error', 'err.expired'); render(); return;
    }
    state.pro.msg = { kind: 'error', key: r.error === 'network' ? 'err.network' : 'pro.errServer' };
    render();
    return;
  }
  window.location.assign(r.redirectUrl);
}

async function signOut() {
  const tok = state.user?.token;
  state.user = null; state.profile = null; state.pro = { loading: false, proUntil: null, payingPlan: null, msg: null };
  session.save(null); state.step = 'email'; state.email = ''; render();
  if (tok) await auth.signOut(tok);
}

function proCard() {
  const active = isProActive(state.pro.proUntil);
  const statusText = state.pro.loading
    ? t('pro.statusLoading')
    : active
      ? t('pro.statusActive', { until: fmtDate(state.pro.proUntil) })
      : t('pro.statusFree');
  const plan = (id, nameKey, priceKey, durKey, best) => {
    const busy = state.pro.payingPlan === id;
    return h('div', { class: `plan-card${best ? ' best' : ''}` },
      h('div', { class: 'plan-top' },
        h('span', { class: 'plan-name' }, t(nameKey)),
        best ? h('span', { class: 'plan-tag' }, t('pro.best')) : null),
      h('div', { class: 'plan-price' }, t(priceKey)),
      h('div', { class: 'plan-dur' }, t(durKey)),
      h('button', {
        type: 'button',
        class: `btn ${best ? 'primary' : 'ghost'}`,
        disabled: Boolean(state.pro.payingPlan),
        onclick: () => payPlan(id),
      }, busy ? t('pro.paying') : t('pro.payBtn')));
  };
  const plansGrid = h('div', { class: 'pro-grid' },
    plan('pro_semester', 'pro.semesterName', 'pro.semesterPrice', 'pro.semesterDur', false),
    plan('pro_year', 'pro.yearName', 'pro.yearPrice', 'pro.yearDur', true));
  return h('div', { class: 'card pro-card', id: 'pro' },
    h('div', { class: 'pro-head' },
      h('h2', null, t('pro.title')),
      h('span', { class: `pro-badge${active ? ' active' : ''}` }, statusText)),
    state.pro.msg ? h('p', { class: `msg ${state.pro.msg.kind}`, role: state.pro.msg.kind === 'error' ? 'alert' : 'status' }, t(state.pro.msg.key)) : null,
    h('p', { class: 'muted small' }, t(active ? 'pro.activeDesc' : 'pro.desc')),
    active
      ? h('details', { class: 'pro-extend' },
        h('summary', null, t('pro.extend')),
        plansGrid)
      : plansGrid,
    h('div', { class: 'row' },
      h('button', { type: 'button', class: 'btn ghost', disabled: state.pro.loading, onclick: loadPro }, t('pro.refresh'))));
}

function signedIn() {
  return h('div', null,
    h('div', { class: 'card' },
      h('h2', null, t('prof.title')),
      h('p', { class: 'who-line' }, t('in.as', { email: state.user.email })),
      profileRows(),
      h('p', { class: 'muted' }, t('in.body')),
      h('div', { class: 'actions' },
        h('a', { class: 'btn primary', href: '../app/' }, t('in.app')),
        h('button', { type: 'button', class: 'btn ghost', onclick: signOut }, t('btn.signout'))),
      h('p', { class: 'small' }, h('a', { href: '../hapus-data.html' }, t('in.delete')))),
    proCard());
}

function render() {
  if (box.hidden || menuFor !== !!state.user) buildMenu();
  paintAvatar();
  clear(root);
  append(root, state.user ? signedIn() : (state.step === 'code' ? codeStep() : emailStep()));
  paintResend();
  const focus = state.user ? null : document.getElementById(state.step === 'code' ? 'f-code' : 'f-email');
  if (focus && !state.busy && document.activeElement === document.body) focus.focus({ preventScroll: true });
}

// ---- Account menu: the avatar in the header opens the same card as the app ----
const SVG_NS = 'http://www.w3.org/2000/svg';
const ICON = {
  person: 'M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM4 21c0-4 4-6 8-6s8 2 8 6',
  crown: 'M3 8l4 4 5-7 5 7 4-4-2 11H5z',
  help: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 1-1 1.7M12 17h.01',
  shield: 'M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z',
  moon: 'M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z',
  out: 'M9 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4M16 8l4 4-4 4M20 12H9',
};
function icon(d) {
  const svg = document.createElementNS(SVG_NS, 'svg');
  for (const [k, v] of Object.entries({ width: '20', height: '20', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true' })) svg.setAttribute(k, v);
  const path = document.createElementNS(SVG_NS, 'path');
  path.setAttribute('d', d);
  svg.append(path);
  return svg;
}

const btn = document.getElementById('acct-btn');
const box = document.getElementById('acct-menu');
let menuFor = null;
let darkSwitch = null;
let themeMode = parseTheme(safe(() => localStorage.getItem('rancob.akun.theme')));
const systemDark = () => !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

function applyTheme() {
  const root = document.documentElement;
  if (themeMode) root.setAttribute('data-theme', themeMode); else root.removeAttribute('data-theme');
}
function paintSwitch() {
  if (!darkSwitch) return;
  const on = isDark(themeMode, systemDark());
  darkSwitch.setAttribute('aria-checked', String(on));
  darkSwitch.classList.toggle('on', on);
}
function setTheme(mode) {
  themeMode = mode;
  safe(() => (mode ? localStorage.setItem('rancob.akun.theme', mode) : localStorage.removeItem('rancob.akun.theme')));
  applyTheme();
  paintSwitch();
}

function openMenu(open, restoreFocus = false) {
  box.hidden = !open;
  btn.setAttribute('aria-expanded', String(open));
  if (open) box.querySelector('a, button')?.focus();
  else if (restoreFocus) btn.focus();
}

function paintAvatar() {
  btn.classList.toggle('out', !state.user);
  clear(btn);
  btn.append(state.user ? document.createTextNode(initialOf(state.user.email)) : icon(ICON.person));
}

function avatarEl() {
  const a = h('span', { class: `avatar big${state.user ? '' : ' out'}`, 'aria-hidden': 'true' });
  a.append(state.user ? document.createTextNode(initialOf(state.user.email)) : icon(ICON.person));
  return a;
}

function row(tag, attrs, d, label) {
  return h(tag, { class: 'am-item', ...attrs }, icon(d), h('span', { class: 'am-label' }, label));
}

function focusForm() {
  const el = document.getElementById('f-email');
  el?.scrollIntoView?.({ block: 'center' });
  el?.focus();
}

function buildMenu() {
  clear(box);
  const signedIn = !!state.user;
  menuFor = signedIn;
  const close = () => openMenu(false);
  const head = signedIn
    ? h('div', { class: 'am-head' }, avatarEl(),
      h('div', { class: 'am-who' }, h('div', { class: 'am-name' }, t('menu.accountName')), h('div', { class: 'am-mail' }, state.user.email)))
    : h('div', { class: 'am-head col' },
      h('div', { class: 'am-head' }, avatarEl(),
        h('div', { class: 'am-who' }, h('div', { class: 'am-name' }, t('menu.outTitle')), h('div', { class: 'am-mail' }, t('menu.outBody')))),
      h('button', { type: 'button', class: 'btn primary', onclick: () => { close(); focusForm(); } }, t('menu.signIn')));
  // Informational only: Pro is bought inside the Android app (store rules), so no purchase link here.
  const pro = h('a', { class: 'am-pro', href: '../paket.html' },
    h('span', { class: 'am-crown' }, icon(ICON.crown)),
    h('span', { class: 'am-label' }, h('span', { class: 'am-pt' }, t('menu.proTitle')), h('span', { class: 'am-ps' }, t('menu.proSub'))),
    h('span', { class: 'am-chip' }, 'PRO'));
  const mine = signedIn
    ? h('div', { class: 'am-group' },
      row('button', { type: 'button', onclick: () => { close(); root.scrollIntoView?.({ block: 'start' }); root.focus(); } }, ICON.person, t('menu.profile')))
    : null;
  const links = h('div', { class: 'am-group' },
    row('a', { href: '../faq.html' }, ICON.help, t('menu.help')),
    row('a', { href: '../privasi.html' }, ICON.shield, t('menu.legal')));
  darkSwitch = h('button', { type: 'button', role: 'switch', class: 'sw', 'aria-checked': 'false', 'aria-label': t('menu.dark'), onclick: () => setTheme(toggled(themeMode, systemDark())) }, h('span', { class: 'sw-dot' }));
  const dark = h('div', { class: 'am-group' },
    h('div', { class: 'am-item static' }, icon(ICON.moon), h('span', { class: 'am-label' }, t('menu.dark')), darkSwitch));
  paintSwitch();
  append(box, head, h('hr', { class: 'am-sep' }), pro, mine, links, dark,
    signedIn ? h('button', { type: 'button', class: 'am-out', onclick: () => { close(); signOut(); } }, icon(ICON.out), t('btn.signout')) : null,
    signedIn ? h('a', { class: 'am-del', href: '../hapus-data.html' }, t('menu.delete')) : null);
}

btn.addEventListener('click', () => openMenu(box.hidden));
document.addEventListener('click', (e) => {
  if (!box.hidden && !box.contains(e.target) && !btn.contains(e.target)) openMenu(false);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !box.hidden) openMenu(false, true);
});
box.addEventListener('focusout', (e) => {
  if (!box.hidden && e.relatedTarget && !box.contains(e.relatedTarget) && e.relatedTarget !== btn) openMenu(false);
});
if (window.matchMedia) window.matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', paintSwitch);
applyTheme();

function applyStatic() {
  document.documentElement.lang = lang;
  for (const el of document.querySelectorAll('[data-t]')) el.textContent = t(el.dataset.t);
  for (const el of document.querySelectorAll('[data-t-label]')) el.setAttribute('aria-label', t(el.dataset.tLabel));
  buildMenu();
  document.title = lang === 'en' ? 'Rancob account – sign in and sign up' : 'Akun Rancob – masuk dan daftar';
}
document.getElementById('lang').addEventListener('click', () => {
  lang = lang === 'id' ? 'en' : 'id';
  safe(() => localStorage.setItem('rancob.akun.lang', lang));
  applyStatic(); render();
});

applyStatic();

// Arriving from the button in the email: Supabase has verified the address and sent us back here
// with the session (or an error) in the URL hash. Use it, then remove it from the address bar.
async function init() {
  const params = new URLSearchParams(location.search);
  if (params.get('payment') === 'finish') {
    state.pro.msg = { kind: 'info', key: 'pro.returned' };
    params.delete('payment');
    const q = params.toString();
    history.replaceState(null, '', location.pathname + (q ? `?${q}` : '') + location.hash);
  }
  const fromLink = parseAuthHash(location.hash);
  if (fromLink) history.replaceState(null, '', location.pathname + location.search);
  if (fromLink?.token) {
    const r = await auth.getUser(fromLink.token);
    if (r.ok) { state.user = { token: fromLink.token, email: r.user.email }; session.save(state.user); }
    else setMsg('error', r.error === 'network' ? 'err.network' : 'err.link');
  } else if (fromLink?.error) {
    setMsg('error', fromLink.error === 'link' ? 'err.link' : 'err.other');
  }
  render();
  loadProfile();
}
init();
