// Progressive enhancement for the Hero RCBD 4x4 plot preview.
const grid = document.getElementById('hero-plot-grid');
const btn = document.getElementById('hero-shuffle');
const seedEl = document.getElementById('hero-seed');

if (grid && btn) {
  const treatments = ['P1', 'P2', 'P3', 'P4'];
  const shuffle = (arr) => {
    const out = arr.slice();
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  };

  btn.addEventListener('click', () => {
    const cells = grid.querySelectorAll('.cell');
    if (cells.length !== 16) return;
    for (let block = 0; block < 4; block++) {
      const order = shuffle(treatments);
      for (let col = 0; col < 4; col++) {
        const cell = cells[block * 4 + col];
        const code = order[col];
        cell.textContent = code;
        cell.className = `cell ${code.toLowerCase()} is-pop`;
      }
    }
    if (seedEl) {
      const seed = Math.floor(1000 + Math.random() * 9000);
      seedEl.textContent = `Seed #${seed}`;
    }
    window.setTimeout(() => {
      cells.forEach((c) => c.classList.remove('is-pop'));
    }, 220);
  });
}
