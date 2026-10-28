/* ============================================
   DATA DEMO — semua produk & konten adalah dummy
   ============================================ */

const CATEGORIES = [
  { id: 'watch',    name: 'Jam Tangan', img: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&q=80' },
  { id: 'bag',      name: 'Tas & Dompet', img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80' },
  { id: 'fragrance',name: 'Parfum', img: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80' },
  { id: 'eyewear',  name: 'Kacamata', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80' }
];

const PRODUCTS = [
  {
    id: 1, name: 'Aurum Chronograph', category: 'watch',
    price: 2450000, oldPrice: 3200000,
    badge: 'Best Seller',
    img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80'
  },
  {
    id: 2, name: 'Luna Leather Tote', category: 'bag',
    price: 1890000, oldPrice: 2400000,
    badge: 'Baru',
    img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80'
  },
  {
    id: 3, name: 'Noir Eau de Parfum', category: 'fragrance',
    price: 1250000, oldPrice: 0,
    badge: '',
    img: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80'
  },
  {
    id: 4, name: 'Aviator Gold Frame', category: 'eyewear',
    price: 890000, oldPrice: 1150000,
    badge: 'Diskon',
    img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80'
  },
  {
    id: 5, name: 'Meridian Minimal Watch', category: 'watch',
    price: 1750000, oldPrice: 0,
    badge: '',
    img: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&q=80'
  },
  {
    id: 6, name: 'Crossbody Mini Bag', category: 'bag',
    price: 990000, oldPrice: 1300000,
    badge: 'Populer',
    img: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80'
  },
  {
    id: 7, name: 'Amber Blossom Parfum', category: 'fragrance',
    price: 1450000, oldPrice: 0,
    badge: 'Eksklusif',
    img: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80'
  },
  {
    id: 8, name: 'Retro Round Shades', category: 'eyewear',
    price: 750000, oldPrice: 950000,
    badge: '',
    img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80'
  }
];

const TESTIMONIALS = [
  { name: 'Alya Putri', role: 'Pelanggan Setia', text: 'Kualitas produknya luar biasa. Packaging rapi dan pengiriman cepat. Velora jadi langganan saya!', rating: 5 },
  { name: 'Rizky Pratama', role: 'Kolektor Jam', text: 'Jam yang saya beli melebihi ekspektasi. Detail finishing-nya sangat premium, cocok untuk hadiah.', rating: 5 },
  { name: 'Maya Sari', role: 'Content Creator', text: 'Desain web Velora sangat elegan. Pengalaman belanja online-nya beda dari yang lain.', rating: 5 }
];