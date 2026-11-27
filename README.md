# Rancob – situs

Situs publik Rancob (https://rancob.id, GitHub Pages dari branch `main`):
profil produk, paket, FAQ, kontak, kebijakan privasi, syarat penggunaan, dan cara menghapus data.
Situs statis tanpa build; cukup HTML + `style.css`.

| Halaman | Isi |
|---|---|
| `index.html` | Beranda/profil: untuk siapa, fitur, cara kerja, ringkasan paket |
| `paket.html` | Gratis dan Pro; Rancob Tim hanya satu kalimat "segera hadir" |
| `faq.html`, `kontak.html` | Pertanyaan umum; email, Rancob Tim, uji tertutup |
| `en.html` | Ringkasan berbahasa Inggris |
| `app/` | **Rancob Web (beta)**: input data dan analisis di browser, data lokal saja (lihat di bawah) |
| `akun/` | **Akun Rancob (uji coba)**: masuk dan daftar tanpa kata sandi dengan kode dari email (lihat di bawah) |
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

## Rancob Web (`app/`)

Aplikasi web statis tanpa framework dan tanpa server: denah acak, input data, cek data, ANOVA + DMRT/BNJ/BNT,
faktorial 2–3 faktor, ekspor CSV dan cadangan JSON. Hanya data lokal (localStorage); belum ada akun,
sinkron, kolaborasi, foto, atau jurnal. Batas paket Gratis (1 percobaan aktif) berlaku, dibaca dari
`plan.dart` lewat mesin yang sama dengan aplikasi.

- **Statistik tidak ditulis ulang.** `core/` adalah lapisan tipis Dart di atas `agri_core` milik aplikasi;
  `app/core.js` adalah hasil kompilasinya (dart2js). Angkanya sama dengan Android.
- Halaman memakai Content-Security-Policy `connect-src 'none'`: kode halaman tidak bisa mengirim data ke mana pun.
- `app/js/model.js` (data, tanpa DOM), `store.js` (localStorage), `views.js` (tampilan), `i18n.js` (ID/EN).

Perintah (butuh Node dan Dart; repo aplikasi di `RANCOB_APP`, default `~/Projects/agri-research-app`):

```bash
node tools/build-core.mjs
```

```bash
node tools/build-core.mjs --check
```

```bash
node tools/verify-core.mjs
```

```bash
node --test tools/test-web.mjs
```

```bash
node tools/check-links.mjs
```

Jalankan `build-core.mjs` setiap kali `agri_core` berubah (`--check` gagal jika `core.js` kedaluwarsa),
lalu `verify-core.mjs` untuk membuktikan hasil JS identik dengan Dart VM.
Catatan: `newSeed()` milik `agri_core` berbasis jam mikrodetik, yang di dart2js hanya presisi milidetik
(hanya 100 seed berbeda), jadi web membuat seed sendiri dari `crypto.getRandomValues`.

## Pratinjau lokal

```bash
python3 -m http.server 8765 --directory .
```

Kontak: rancob@agronominion.com.

## Akun (`akun/`)

Halaman masuk dan daftar tanpa kata sandi, alurnya sama dengan aplikasi Android: minta kode lewat email
(`/auth/v1/otp`), lalu ketik kodenya (`/auth/v1/verify`). Tanpa SDK dan tanpa dependensi: hanya `fetch` ke
API Auth Supabase. Email baru otomatis dibuatkan akun (templat "Confirm signup"), email lama memakai
templat "Magic Link"; tab **Masuk** tidak membuat akun dan tidak membocorkan apakah alamat terdaftar.

- Halaman ini **terpisah dari `app/`** karena `app/` menjanjikan "data tidak dikirim ke server"
  (CSP `connect-src 'none'`). CSP `akun/` hanya mengizinkan host Supabase proyek.
- `akun/config.js` berisi URL dan **publishable key** (aman untuk browser). Jangan pernah mengisi kunci
  rahasia (`sb_secret_…`) atau `service_role` di sini; ada tes yang menolaknya.
- **Menu akun:** avatar di header membuka kartu yang sama dengan aplikasi Android (kepala, banner Pro, Profil,
  Bantuan, Privasi dan syarat, Mode gelap, Keluar, Hapus akun dan data). Banner Pro hanya informasi dan menuju
  `paket.html`: Pro dibeli di dalam aplikasi, jadi jangan menambah tautan beli. Saklar mode gelap hanya berlaku
  di halaman ini (`data-theme` di `akun.css`, pilihan di `localStorage`); tanpa pilihan, halaman ikut sistem.
- Panjang kode mengikuti pengaturan Supabase (*Email OTP Length*, saat ini 8 digit); halaman menerima 6–10 angka.
- **Tombol di email** mengarah ke halaman ini: Supabase memverifikasi alamat lalu mengalihkan ke **Site URL**
  proyek (`https://rancob.id/akun/`, diatur di Authentication → URL Configuration), dengan sesi di
  `#access_token`. `akun.js` membacanya, menghapusnya dari bilah alamat, dan menampilkan "Anda sudah masuk";
  tautan yang hangus menampilkan pesan minta kode baru. Email yang diminta dari aplikasi Android tetap kembali
  ke `id.rancob.app://auth-callback`. Kode dan tombol memakai satu token: pakai salah satu saja.
- Akun belum dipakai untuk menyimpan data di web. `privasi.html` sudah menjelaskan halaman akun dan Resend
  (pengirim email kode); perbarui bila alurnya berubah. Teks `app/` ("tidak ada akun") tetap benar karena
  halaman akun terpisah.
- Tes: `npm test` (termasuk `tools/test-akun.mjs`).
