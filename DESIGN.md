# Rancob Design Contract (`DESIGN.md`)

Panduan singkat ini mengunci karakter visual Rancob (situs `rancob.id` dan aplikasi pendamping) agar tetap terasa seperti **alat penelitian lapangan yang jernih, editorial, dan taktis** — bukan template SaaS generik.

## 1. Karakter & Palet Warna
- **Latar kertas lapangan**: `#f6f7f4` (light) / `#121614` (dark)
- **Permukaan solid**: `#ffffff` (light) / `#1a201c` (dark)
- **Hijau primer agronomi**: `#1f6b3a` (light) / `#7cc796` (dark)
- **Aksen panen**: `#9a6412` / `#f0b429` (hanya untuk status/peringatan/petak 4)
- **Garis pemisah halus**: `#dfe4dc` (light) / `#2c352f` (dark)

## 2. Aturan Anti-AI-Slop (Larangan Tegas)
1. **Jangan membungkus semua seksi dengan kartu ber-border (`card fatigue`).** Selang-selingkan area terbuka bergaris tipis (*hairline editorial*) dengan permukaan kartu hanya untuk objek yang memang terpisah (paket, tangkapan layar, form).
2. **Tidak ada gradasi dekoratif, glow, atau glassmorphism pada kartu konten.** Gunakan permukaan datar kontras tinggi yang tetap mudah dibaca di bawah matahari lapangan.
3. **Tidak ada pola "3 kartu simetris + pill badge kecil di atas tiap judul".** Untuk pilar utama, pakai daftar editorial bernomor (`01`, `02`, `03`) dengan tipografi *tabular-nums* dan garis pemisah tipis.
4. **Tidak ada ilustrasi abstrak generik.** Semua visual harus *domain-specific* agronomi: denah petak RAL/RAK, tabel sidik ragam ANOVA, notasi huruf DMRT/BNJ/BNT, jadwal HST, atau tangkapan layar asli aplikasi.
5. **Tidak ada animasi melompat berlebihan.** Interaksi cukup responsif, halus, dan bermakna (misalnya pengacakan ulang denah RAK nyata di Hero).

## 3. Tipografi & Aksesibilitas
- Skala judul ketat (`letter-spacing: -0.02em`), lebar bacaan maksimal `760px` untuk teks panjang, `1040px` untuk tata letak halaman.
- Gunakan `font-variant-numeric: tabular-nums` dan monospace untuk angka seed, nomor pilar, dan data statistik.
- Target sentuh tombol minimal `46px`; zero horizontal overflow pada layar `360px–375px`; semua halaman wajib mendukung `prefers-color-scheme: dark`.
