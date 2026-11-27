// Tiny DOM helpers. User text only ever goes through textContent / attributes,
// never innerHTML, so imported backups and typed titles cannot inject markup.

const PROPS = new Set(['value', 'checked', 'selected', 'disabled', 'readOnly', 'indeterminate']);

export function h(tag, attrs, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs ?? {})) {
    if (v === null || v === undefined || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
    else if (PROPS.has(k)) el[k] = v;
    else el.setAttribute(k, v === true ? '' : String(v));
  }
  append(el, ...kids);
  return el;
}

export function append(el, ...kids) {
  for (const k of kids.flat(Infinity)) {
    if (k === null || k === undefined || k === false) continue;
    el.append(k.nodeType ? k : document.createTextNode(String(k)));
  }
  return el;
}

const SVG_NS = 'http://www.w3.org/2000/svg';
export function svgEl(tag, attrs, ...kids) {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs ?? {})) {
    if (v === null || v === undefined || v === false) continue;
    el.setAttribute(k, String(v));
  }
  append(el, ...kids);
  return el;
}

export function clear(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
  return el;
}

/** Locale-aware number formatting in the app's style: 2 decimals, 1 from 1000 up. */
export function makeFmt(lang) {
  const loc = lang === 'id' ? 'id-ID' : 'en-US';
  const nf = new Map();
  const num = (v, d = 2) => {
    if (v === null || v === undefined) return '';
    if (!nf.has(d)) nf.set(d, new Intl.NumberFormat(loc, { minimumFractionDigits: d, maximumFractionDigits: d, useGrouping: false }));
    return nf.get(d).format(v);
  };
  return {
    num,
    stat: (v) => (Math.abs(v) >= 1000 ? num(v, 1) : num(v, 2)),
    /** Text shown inside an input: the user's decimal separator. */
    input: (v) => (v === null ? '' : String(v).replace('.', lang === 'id' ? ',' : '.')),
    date: (iso) => new Intl.DateTimeFormat(loc, { dateStyle: 'medium' }).format(new Date(iso)),
  };
}

export function download(filename, text, type) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = h('a', { href: url, download: filename });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function slug(s) {
  return String(s).toLowerCase().normalize('NFKD').replace(/[^\w]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'rancob';
}
