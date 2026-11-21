# Rancob – situs

Situs publik Rancob (https://rancob.agronominion.com, GitHub Pages dari branch `main`):
profil produk, paket, FAQ, kontak, kebijakan privasi, syarat penggunaan, dan cara menghapus data.
Situs statis tanpa build; cukup HTML + `style.css`.

| Halaman | Isi |
|---|---|
| `index.html` | Beranda/profil: untuk siapa, fitur, cara kerja, ringkasan paket |
| `paket.html` | Gratis, Pro, Tim (segera hadir, tanpa harga/tombol beli) |
| `faq.html`, `kontak.html` | Pertanyaan umum; email, Rancob Tim, uji tertutup |
| `en.html` | Ringkasan berbahasa Inggris |
| `privasi.html`, `syarat.html`, `hapus-data.html` | Halaman hukum (ID + EN). **URL tidak boleh berubah**: aplikasi menautkannya dari layar Pro (`lib/features/plan/pro_screen.dart`) dan Play Console. |

## Data paket: jangan ditulis tangan

Angka dan teks paket (batas Gratis, teks layar Pro, uji coba, masa tenggang, batas anggota) berada di
antara penanda `<!--paket:KUNCI-->…<!--/paket:KUNCI-->` dan diisi dari repo aplikasi:

```bash
node tools/sync-paket.mjs
```

```bash
node tools/sync-paket.mjs --check
```

Jalankan `--check` sebelum setiap push. Sumber: `packages/agri_core/lib/src/plan.dart`,
`lib/l10n/strings.dart`, `lib/data/billing.dart`, `supabase/migrations/`, dan `listing-id.md` di
`rancob-store` (lama uji coba Play). Path bisa diganti dengan `RANCOB_APP` dan `RANCOB_STORE`.
Ringkasan hasilnya ada di `paket.json`. Harga tidak ditulis: aplikasi juga mengambilnya dari Google Play.

Aturan Google Play: Pro hanya dibeli di dalam aplikasi. Situs boleh menjelaskannya, tetapi jangan
menambah tombol atau tautan beli.

## Pratinjau lokal

```bash
python3 -m http.server 8765 --directory .
```

Kontak: rancob@agronominion.com.
