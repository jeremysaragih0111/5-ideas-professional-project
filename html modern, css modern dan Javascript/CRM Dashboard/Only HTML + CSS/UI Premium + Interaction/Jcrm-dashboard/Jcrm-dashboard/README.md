# NovaCRM Dashboard

Dashboard CRM bergaya dark premium, dibuat hanya menggunakan **HTML dan CSS** — tanpa JavaScript, framework, atau backend.

## File

- `JCRM-Dashboard.html` — struktur dashboard, contoh data, dan kontrol native HTML.
- `styles.css` — tema, layout responsif, chart dekoratif, status, dan interaksi CSS.

## Menjalankan

1. Ekstrak folder project.
2. Buka `JCRM-Dashboard.html` di browser modern.
3. Untuk pengembangan lokal, bisa juga buka folder di VS Code lalu gunakan ekstensi Live Server (opsional).

Tidak ada proses build atau instalasi dependency.

## Interaksi yang tersedia

- Navigasi sidebar menggunakan anchor ke bagian halaman.
- Menu notifikasi, profil, pilihan periode, dan menu opsi menggunakan `<details>` / `<summary>`.
- Sidebar mobile dapat dibuka/tutup menggunakan checkbox CSS.
- Tugas dapat dicentang; status visualnya berubah dan teks dicoret.
- Form “Quick add a lead” dapat dibuka, diisi, dan divalidasi oleh browser.
- Tombol, link, hover, focus, dan responsivitas bekerja tanpa JavaScript.

## Batasan yang disengaja

Karena project ini HTML + CSS saja:
- Search bar tidak memfilter data; ia hanya menyediakan input pencarian visual.
- Form lead tidak menyimpan atau mengirim data.
- Link navigasi pagination, periode, dan laporan adalah demo visual.
- Data metrik, chart, aktivitas, kontak, dan deals bersifat statis.
- Grafik dibuat sebagai visualisasi SVG statis yang ditata oleh CSS, bukan chart live.

Untuk menyimpan leads, melakukan pencarian, memfilter tabel, atau memuat data nyata, diperlukan JavaScript dan/atau backend/API. Tidak ada data yang dikirim ke server oleh project ini.

## Kustomisasi cepat

- Warna utama dan variabel desain ada di bagian `:root` pada `JCRM-Dashboard.css`.
- Konten demo dapat diubah langsung di `JCRM-Dashboard.html`.
- Google Fonts digunakan jika tersedia koneksi internet; jika tidak, fallback system font akan digunakan.
