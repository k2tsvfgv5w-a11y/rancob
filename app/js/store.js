// Local-only persistence: everything stays in this browser (localStorage).
// Nothing is sent anywhere; the page's Content-Security-Policy forbids network requests.

const KEY = 'rancob.web.v1';

export function createStore(storage = safeStorage()) {
  let state = { version: 1, lang: null, experiments: [] };
  let persistent = !!storage;
  let lastError = null;

  if (storage) {
    try {
      const raw = storage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.version === 1 && Array.isArray(parsed.experiments)) state = parsed;
      }
    } catch (e) {
      lastError = e;
      persistent = false;
    }
  }

  const listeners = new Set();
  return {
    get state() { return state; },
    /** Re-reads storage, e.g. after another tab saved. */
    reload() {
      try {
        const parsed = JSON.parse(storage.getItem(KEY));
        if (parsed && parsed.version === 1 && Array.isArray(parsed.experiments)) state = parsed;
      } catch { /* keep the current state */ }
    },
    /** False when the browser blocks storage: data then lives only until the tab closes. */
    get persistent() { return persistent; },
    get error() { return lastError; },
    save() {
      if (storage) {
        try {
          storage.setItem(KEY, JSON.stringify(state));
          persistent = true;
          lastError = null;
        } catch (e) {
          persistent = false;
          lastError = e;
        }
      }
      listeners.forEach((fn) => fn());
    },
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    find(id) { return state.experiments.find((e) => e.id === id) ?? null; },
    add(e) { state.experiments.unshift(e); this.save(); return e; },
    remove(id) { state.experiments = state.experiments.filter((e) => e.id !== id); this.save(); },
    /** Approximate size of the stored data in bytes. */
    size() { return JSON.stringify(state).length; },
  };
}

function safeStorage() {
  try {
    const s = globalThis.localStorage;
    const probe = '__rancob_probe__';
    s.setItem(probe, '1');
    s.removeItem(probe);
    return s;
  } catch {
    return null;
  }
}
