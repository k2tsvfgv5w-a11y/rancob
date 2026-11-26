// Konfigurasi 2 fase halaman uji tertutup (/penguji/).
// - Kosong ("") = Fase 1 (Pendaftaran: 2 langkah aktif, tanpa tombol mati).
// - Terisi URL opt-in Play Console = Fase 2 (Play Store Dibuka: 3 langkah pasang + panduan 14 hari).
const CONFIG = {
  OPTIN_URL: '',
  EMAIL: 'rancob@agronominion.com',
};

const params = new URLSearchParams(location.search);
const isOpen = Boolean(CONFIG.OPTIN_URL) || params.get('fase') === '2';

const faseDaftar = document.getElementById('fase-daftar');
const faseDibuka = document.getElementById('fase-dibuka');
const optinLink = document.getElementById('optin-link');

if (faseDaftar && faseDibuka) {
  faseDaftar.hidden = isOpen;
  faseDibuka.hidden = !isOpen;
}
if (optinLink && CONFIG.OPTIN_URL) {
  optinLink.href = CONFIG.OPTIN_URL;
}

function setupStepChecklist(group, labelId, fillId) {
  const key = `rancob-penguji-${group}`;
  let done = [];
  try {
    done = JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    done = [];
  }

  const items = [...document.querySelectorAll(`.guide-step[data-group="${group}"]`)];
  const label = document.getElementById(labelId);
  const fill = document.getElementById(fillId);

  function render() {
    for (const item of items) {
      const id = item.dataset.step;
      const isDone = done.includes(id);
      item.classList.toggle('done', isDone);
      const num = item.querySelector('.step-num');
      const btn = item.querySelector('.check-btn');
      if (num) num.textContent = isDone ? '✓' : id;
      if (btn) btn.textContent = isDone ? 'Batalkan tanda' : 'Tandai selesai';
    }
    if (label) label.textContent = `${done.length} dari ${items.length} langkah selesai`;
    if (fill && items.length) fill.style.width = `${(done.length / items.length) * 100}%`;
  }

  for (const item of items) {
    const btn = item.querySelector('.check-btn');
    if (!btn) continue;
    btn.addEventListener('click', () => {
      const id = item.dataset.step;
      done = done.includes(id) ? done.filter((x) => x !== id) : [...done, id];
      try {
        localStorage.setItem(key, JSON.stringify(done));
      } catch {
        // Mode privat / penyimpanan penuh: tetap perbarui tampilan.
      }
      render();
    });
  }
  render();
}

setupStepChecklist('p1', 'p1-label', 'p1-fill');
setupStepChecklist('p2', 'p2-label', 'p2-fill');

// Checklist 14 hari (persisten di localStorage)
const daysGrid = document.getElementById('days-grid');
if (daysGrid) {
  const DAYS_KEY = 'rancob-penguji-hari';
  let checkedDays = [];
  try {
    checkedDays = JSON.parse(localStorage.getItem(DAYS_KEY) || '[]');
  } catch {
    checkedDays = [];
  }

  const dayItems = [...daysGrid.querySelectorAll('li[data-day]')];
  function renderDays() {
    for (const li of dayItems) {
      const id = li.dataset.day;
      const on = checkedDays.includes(id);
      li.classList.toggle('checked', on);
      const btn = li.querySelector('button');
      const tick = li.querySelector('.tick');
      if (btn) btn.setAttribute('aria-pressed', String(on));
      if (tick) tick.textContent = on ? '✓' : '';
    }
  }

  for (const li of dayItems) {
    const btn = li.querySelector('button');
    if (!btn) continue;
    btn.addEventListener('click', () => {
      const id = li.dataset.day;
      checkedDays = checkedDays.includes(id)
        ? checkedDays.filter((x) => x !== id)
        : [...checkedDays, id];
      try {
        localStorage.setItem(DAYS_KEY, JSON.stringify(checkedDays));
      } catch {
        // Abaikan jika penyimpanan lokal tidak tersedia.
      }
      renderDays();
    });
  }
  renderDays();
}

// Salin email bantuan
const copyBtn = document.getElementById('copy-email');
const emailEl = document.getElementById('contact-email');
if (copyBtn && emailEl) {
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(CONFIG.EMAIL);
      copyBtn.textContent = 'Tersalin';
    } catch {
      const range = document.createRange();
      range.selectNodeContents(emailEl);
      const sel = getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
      copyBtn.textContent = 'Teks terpilih';
    }
    setTimeout(() => {
      copyBtn.textContent = 'Salin email';
    }, 1800);
  });
}
