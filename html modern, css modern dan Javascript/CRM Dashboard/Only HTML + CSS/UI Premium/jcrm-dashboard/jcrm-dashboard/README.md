# JCRM Dashboard

Dashboard CRM responsif dengan gaya **custom JCRM**, dibuat menggunakan HTML semantik dan CSS modern tanpa JavaScript.

## Isi project
- `index.html` — markup dashboard dan data demo.
- `styles.css` — desain, responsive layout, tema terang/gelap, serta interaksi CSS-only.

## Cara menjalankan
1. Ekstrak folder project.
2. Buka `index.html` di browser modern, atau jalankan dengan ekstensi Live Server di VS Code.
3. Gunakan switch **Theme** di kanan atas untuk berpindah antara light mode dan dark mode.
4. Checklist pada panel **Upcoming tasks** dapat dicentang. Status checklist hanya tersimpan selama halaman masih terbuka dan tidak disimpan ke database.

## Fitur UI
- Ringkasan KPI: kontak, deal aktif, revenue, dan conversion rate.
- Grafik revenue berbasis SVG statis.
- Ringkasan deal pipeline.
- Tabel kontak demo dan status kontak.
- Daftar tugas dengan checkbox interaktif.
- Navigasi anchor, tombol tampilan, dan layout responsif desktop/tablet/mobile.
- Tema light/dark dengan CSS checkbox, tanpa JavaScript.

## Batasan yang perlu diketahui
- Angka, kontak, grafik, dan tanggal adalah **data contoh statis**, bukan data bisnis nyata.
- Tombol pencarian, notifikasi, export, tambah kontak, dan tautan navigasi adalah elemen UI/anchor saja; belum terhubung ke backend/API dan tidak menjalankan aksi data.
- Tidak ada JavaScript, server, database, autentikasi, maupun integrasi API.
- Google Fonts dimuat dari jaringan jika koneksi internet tersedia; fallback font tetap disediakan.

## Teknologi
HTML5, CSS3, CSS Grid, Flexbox, media queries, CSS custom properties, SVG, dan checkbox CSS-only.
