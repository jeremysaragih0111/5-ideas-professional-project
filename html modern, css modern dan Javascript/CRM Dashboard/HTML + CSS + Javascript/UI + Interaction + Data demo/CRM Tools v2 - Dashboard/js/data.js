/* =========================================================
   CRM Tools V2 — data.js
   Data demo untuk seluruh fitur
   ========================================================= */

const CRM_DATA = {
  stats: [
    { label: 'Total Revenue', value: 842500000, prefix: 'Rp', icon: 'revenue', trend: 12.4, up: true, fmt: 'currency' },
    { label: 'Deals Aktif',   value: 47,         icon: 'deals',   trend: 8.1,  up: true,  fmt: 'number' },
    { label: 'Kontak Baru',   value: 128,        icon: 'contacts',trend: 5.2,  up: true,  fmt: 'number' },
    { label: 'Konversi Rate', value: 32.6,       suffix: '%',     icon: 'target',  trend: 2.3, up: false, fmt: 'number' }
  ],

  revenue: {
    labels: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'],
    values: [42, 55, 48, 62, 70, 68, 82, 90, 85, 95, 110, 128]
  },

  pipeline: [
    { stage: 'Lead',        count: 18, value: 320000000, max: 24 },
    { stage: 'Qualified',   count: 12, value: 280000000, max: 24 },
    { stage: 'Proposal',    count: 9,  value: 210000000, max: 24 },
    { stage: 'Negotiation', count: 5,  value: 140000000, max: 24 },
    { stage: 'Won',         count: 3,  value: 96000000,  max: 24 }
  ],

  contacts: [
    { id:1, name:'Budi Santoso',    company:'PT Maju Jaya',    email:'budi@majujaya.id',   phone:'0812-1111-2201', status:'customer' },
    { id:2, name:'Siti Rahmawati',  company:'CV Kreatif Nusa', email:'siti@kreatifnusa.id',phone:'0813-2222-3312', status:'lead' },
    { id:3, name:'Andi Pratama',    company:'Startup Tech ID', email:'andi@techid.co',     phone:'0814-3333-4423', status:'prospect' },
    { id:4, name:'Dewi Anggraini',  company:'Toko Dewi',       email:'dewi@tokodewi.id',   phone:'0815-4444-5534', status:'customer' },
    { id:5, name:'Rudi Hartono',    company:'PT Bangun Semesta',email:'rudi@bangun.id',    phone:'0816-5555-6645', status:'lead' },
    { id:6, name:'Maya Kusuma',     company:'Studio Maya',     email:'maya@studiomaya.id', phone:'0817-6666-7756', status:'prospect' },
    { id:7, name:'Fajar Nugroho',   company:'Nusantara Logistik',email:'fajar@nusalog.id', phone:'0818-7777-8867', status:'customer' },
    { id:8, name:'Rina Wulandari',  company:'CV Sehat Sentosa',email:'rina@sehatsentosa.id',phone:'0819-8888-9978', status:'lead' }
  ],

  deals: [
    { id:1, title:'Kontrak Tahunan ERP',        value: 180000000, stage:'Won',         owner:'Ayu Lestari', contact:'Budi Santoso' },
    { id:2, title:'Implementasi CRM Suite',     value: 95000000,  stage:'Negotiation', owner:'Rian Saputra', contact:'Andi Pratama' },
    { id:3, title:'Setup Website Company',      value: 45000000,  stage:'Proposal',    owner:'Maya Kusuma',  contact:'Maya Kusuma' },
    { id:4, title:'Cloud Migration Project',    value: 220000000, stage:'Negotiation', owner:'Ayu Lestari', contact:'Fajar Nugroho' },
    { id:5, title:'Konsultasi Digital Marketing',value: 30000000, stage:'Proposal',    owner:'Rian Saputra', contact:'Siti Rahmawati' },
    { id:6, title:'Integrasi Payment Gateway',  value: 60000000,  stage:'Qualified',   owner:'Ayu Lestari', contact:'Dewi Anggraini' },
    { id:7, title:'Paket Lisensi Tahunan',      value: 75000000,  stage:'Lead',        owner:'Maya Kusuma',  contact:'Rina Wulandari' },
    { id:8, title:'Audit Keamanan Sistem',      value: 40000000,  stage:'Lead',        owner:'Rian Saputra', contact:'Rudi Hartono' }
  ],

  tasks: [
    { id:1, title:'Follow up proposal CRM Suite ke Andi', due:'Hari ini', done:false },
    { id:2, title:'Kirim invoice kontrak ERP PT Maju Jaya', due:'Hari ini', done:false },
    { id:3, title:'Meeting demo dengan CV Kreatif Nusa', due:'Besok', done:false },
    { id:4, title:'Update pipeline stage minggu lalu', due:'Kemarin', done:true },
    { id:5, title:'Rekap laporan penjualan bulanan', due:'2 hari lalu', done:true },
    { id:6, title:'Call prospek baru dari webinar', due:'Hari ini', done:false }
  ],

  activities: [
    { icon:'deal',    text:'<strong>Ayu</strong> menutup deal “Kontrak Tahunan ERP” senilai Rp 180.000.000', time:'12 menit lalu' },
    { icon:'contact', text:'<strong>Rian</strong> menambahkan kontak baru <strong>Rina Wulandari</strong>', time:'34 menit lalu' },
    { icon:'task',    text:'<strong>Maya</strong> menyelesaikan tugas “Update pipeline stage”', time:'1 jam lalu' },
    { icon:'deal',    text:'Deal “Cloud Migration Project” naik ke stage <strong>Negotiation</strong>', time:'2 jam lalu' },
    { icon:'contact', text:'<strong>Siti Rahmawati</strong> mengisi form demo website', time:'3 jam lalu' }
  ],

  reports: {
    stats: [
      { label:'Avg. Deal Size', value: 68500000, icon:'revenue', trend: 4.5, up: true },
      { label:'Win Rate',       value: 68.5, suffix:'%', icon:'target', trend: 1.8, up: true },
      { label:'Sales Cycle',    value: 24, suffix:' hari', icon:'deals', trend: 3.2, up: false },
      { label:'Total Won',      value: 12, icon:'contacts', trend: 9.1, up: true }
    ],
    conversion: {
      labels: ['Jan','Feb','Mar','Apr','Mei','Jun'],
      values: [22, 28, 25, 34, 31, 38]
    }
  }
};