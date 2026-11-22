// Rancob Web: boot, routing, language, messages.
import { createStore } from './store.js';
import { createT } from './i18n.js';
import { makeFmt, clear, h } from './dom.js';
import * as M from './model.js';
import { createViews } from './views.js';

const store = createStore();
const guess = () => ((navigator.language || 'id').toLowerCase().startsWith('en') ? 'en' : 'id');
let lang = store.state.lang ?? guess();
const t = createT(() => lang);
const app = document.getElementById('app');

const ctx = {
  core: null, info: null, store, t,
  lang: () => lang,
  fmt: () => makeFmt(lang),
  go, rerender, say,
};

function applyStatic() {
  document.documentElement.lang = lang;
  for (const el of document.querySelectorAll('[data-t]')) el.textContent = t(el.dataset.t);
  for (const el of document.querySelectorAll('[data-t-label]')) el.setAttribute('aria-label', t(el.dataset.tLabel));
}

let toastTimer;
function say(message, isError = false) {
  const el = document.getElementById('toast');
  el.textContent = message;
  el.className = `toast show${isError ? ' error' : ''}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.className = 'toast'; }, 5000);
}

let views;
function render(keepPlace) {
  const y = window.scrollY;
  const active = document.activeElement;
  let restore = null;
  if (keepPlace && active && app.contains(active) && ['SELECT', 'BUTTON'].includes(active.tagName)) {
    restore = { tag: active.tagName, index: [...app.querySelectorAll(active.tagName)].indexOf(active) };
  }
  const hash = location.hash || '#/';
  const m = hash.match(/^#\/e\/([\w]+)(?:\/(\w+))?/);
  let node;
  if (hash === '#/baru') node = views.newExperiment();
  else if (m) node = views.experiment(m[1], m[2] ?? 'layout');
  else node = views.home();
  clear(app).append(node);
  const h1 = app.querySelector('h1');
  document.title = `${h1 ? h1.textContent : t('home.title')} – ${t('app.name')}`;
  if (keepPlace) {
    window.scrollTo(0, y);
    if (restore) app.querySelectorAll(restore.tag)[restore.index]?.focus();
  } else {
    window.scrollTo(0, 0);
    if (h1) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); }
  }
}

function rerender() { render(true); }
function go(hash) {
  if (location.hash === hash || (hash === '#/' && !location.hash)) render(false);
  else location.hash = hash;
}

function boot() {
  applyStatic();
  const core = globalThis.RancobCore;
  if (!core) {
    clear(app).append(h('div', { class: 'card note', role: 'alert' }, t('app.loadFail')));
    return;
  }
  ctx.core = core;
  ctx.info = M.call(core, 'info');
  views = createViews(ctx);
  document.getElementById('lang').addEventListener('click', () => {
    lang = lang === 'id' ? 'en' : 'id';
    store.state.lang = lang;
    store.save();
    applyStatic();
    render(true);
  });
  window.addEventListener('hashchange', () => render(false));
  // Another tab changed the data: take its version instead of overwriting it later.
  window.addEventListener('storage', (ev) => {
    if (ev.key === 'rancob.web.v1') { store.reload(); render(true); }
  });
  render(false);
}

boot();
