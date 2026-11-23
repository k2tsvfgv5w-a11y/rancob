// Account page: passwordless sign-in / sign-up with an emailed code.
// Text from users only goes through textContent/attributes (see ../app/js/dom.js).
import { h, append, clear } from '../app/js/dom.js';
import { createAuth, validEmail, validCode, cleanEmail, cleanCode } from './auth.js';
import { SUPABASE_URL, SUPABASE_KEY } from './config.js';
import { STRINGS } from './i18n.js';

const auth = createAuth({ url: SUPABASE_URL, key: SUPABASE_KEY });
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

const state = { mode: 'in', step: 'email', email: '', msg: null, busy: false, cooldown: 0, agreed: false, user: session.load() };
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
    state.user = r.session; session.save(r.session);
    state.step = 'email'; setMsg(); render();
  } },
  msgEl(),
  field('f-code', t('field.code'), input, t('field.codeHint')),
  h('button', { type: 'submit', class: 'btn primary', disabled: state.busy }, state.busy ? t('btn.verifying') : t('btn.verify')),
  h('div', { class: 'row' },
    h('button', { id: 'resend', type: 'button', class: 'btn ghost', onclick: () => sendCode(state.email) }, t('btn.resend')),
    h('button', { type: 'button', class: 'btn ghost', onclick: () => { clearInterval(timer); state.step = 'email'; setMsg(); render(); } }, t('btn.change'))));
}

function signedIn() {
  return h('div', { class: 'card' },
    h('h2', null, t('in.title')),
    h('p', { class: 'who-line' }, t('in.as', { email: state.user.email })),
    h('p', { class: 'muted' }, t('in.body')),
    h('div', { class: 'actions' },
      h('a', { class: 'btn primary', href: '../app/' }, t('in.app')),
      h('button', { type: 'button', class: 'btn ghost', onclick: async () => {
        const tok = state.user.token; state.user = null; session.save(null); state.step = 'email'; state.email = ''; render();
        await auth.signOut(tok);
      } }, t('btn.signout'))),
    h('p', { class: 'small' }, h('a', { href: '../hapus-data.html' }, t('in.delete'))));
}

function render() {
  clear(root);
  append(root, state.user ? signedIn() : (state.step === 'code' ? codeStep() : emailStep()));
  paintResend();
  const focus = state.user ? null : document.getElementById(state.step === 'code' ? 'f-code' : 'f-email');
  if (focus && !state.busy && document.activeElement === document.body) focus.focus({ preventScroll: true });
}

function applyStatic() {
  document.documentElement.lang = lang;
  for (const el of document.querySelectorAll('[data-t]')) el.textContent = t(el.dataset.t);
  document.title = lang === 'en' ? 'Rancob account – sign in and sign up' : 'Akun Rancob – masuk dan daftar';
}
document.getElementById('lang').addEventListener('click', () => {
  lang = lang === 'id' ? 'en' : 'id';
  safe(() => localStorage.setItem('rancob.akun.lang', lang));
  applyStatic(); render();
});

applyStatic();
render();
