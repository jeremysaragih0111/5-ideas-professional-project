# Velora Commerce

Demo landing page premium untuk brand fashion & lifestyle **Velora Commerce**.
Dibangun dengan **HTML + CSS murni** (plus JavaScript ringan untuk interaksi UI).

## ⚠️ Catatan Penting
Project ini adalah **demo UI front-end saja**. Tidak ada backend, database,
autentikasi, pembayaran, atau penyimpanan data. Semua interaksi (cart, filter,
favorit, newsletter) bersifat visual / sementara.

## Struktur
velora-commerce/
├── index.html
├── assets/
│ ├── css/
│ │ ├── style.css
│ │ └── responsive.css
│ └── js/
│ └── main.js
└── README.md


## Cara Menjalankan
1. Download / clone folder project.
2. Buka `index.html` langsung di browser (double-click).
3. Atau jalankan local server (opsional):
   ```bash
   npx serve .
   # atau
   python -m http.server 8080
4. Akses http://localhost:8080.



Fitur UI yang Berfungsi (Front-End)

1. Navbar sticky dengan efek scroll & active link
2. Mobile menu (hamburger)
3. Filter produk berdasarkan kategori
4. Tombol wishlist (toggle visual)
5. Counter keranjang (sementara, tanpa checkout)
6. Toast notification
7. Scroll reveal animation
8. Form newsletter (demo, tidak mengirim data)


Teknologi
1. HTML5 semantik
2. CSS3 (custom properties, grid, flexbox, backdrop-filter)
3. JavaScript vanilla (DOM interaction only)
4. Google Fonts: Playfair Display + Inter