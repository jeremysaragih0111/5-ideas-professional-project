/* ============================================
   APP LOGIC — render UI, filter, interaksi
   ============================================ */

// ---------- Helpers ----------
const $  = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const formatRupiah = (num) =>
  'Rp ' + num.toLocaleString('id-ID');

// ---------- Navbar scroll ----------
window.addEventListener('scroll', () => {
  $('#navbar').classList.toggle('scrolled', window.scrollY > 40);
});

// ---------- Hamburger ----------
$('#hamburger').addEventListener('click', () => {
  $('#hamburger').classList.toggle('active');
  $('#navLinks').classList.toggle('open');
});

// Tutup menu saat link diklik
$$('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    $('#hamburger').classList.remove('active');
    $('#navLinks').classList.remove('open');
  });
});

// ---------- Search toggle ----------
$('#searchToggle').addEventListener('click', () => {
  $('#searchBar').classList.toggle('open');
  const input = $('#searchInput');
  if ($('#searchBar').classList.contains('open')) input.focus();
});

// ---------- Render Categories ----------
function renderCategories() {
  const grid = $('#categoryGrid');
  grid.innerHTML = CATEGORIES.map(c => `
    <div class="category-card" data-cat="${c.id}">
      <img src="${c.img}" alt="${c.name}" loading="lazy" />
      <span>${c.name}</span>
    </div>
  `).join('');

  // klik kategori → filter produk
  $$('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      const cat = card.dataset.cat;
      setActiveFilter(cat);
      $('#products').scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// ---------- Render Filter Tabs ----------
function renderFilters() {
  const tabs = $('#filterTabs');
  const all = [{ id: 'all', name: 'Semua' }, ...CATEGORIES];
  tabs.innerHTML = all.map((c, i) => `
    <button class="filter-tab ${i === 0 ? 'active' : ''}" data-filter="${c.id}">${c.name}</button>
  `).join('');

  $$('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => setActiveFilter(tab.dataset.filter));
  });
}

function setActiveFilter(filter) {
  $$('.filter-tab').forEach(t => t.classList.toggle('active', t.dataset.filter === filter));
  renderProducts(filter, $('#searchInput').value);
}

// ---------- Render Products ----------
function renderProducts(filter = 'all', search = '') {
  const grid = $('#productGrid');
  const empty = $('#emptyState');
  const term = search.trim().toLowerCase();

  const filtered = PRODUCTS.filter(p => {
    const matchCat = filter === 'all' || p.category === filter;
    const matchSearch = !term || p.name.toLowerCase().includes(term);
    return matchCat && matchSearch;
  });

  empty.hidden = filtered.length > 0;

  grid.innerHTML = filtered.map(p => `
    <article class="product-card">
      <div class="product-media">
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        <button class="quick-add" data-id="${p.id}" aria-label="Tambah ke keranjang">
          <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
      </div>
      <div class="product-info">
        <span class="product-cat">${CATEGORIES.find(c => c.id === p.category).name}</span>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-price">
          ${formatRupiah(p.price)}
          ${p.oldPrice ? `<small>${formatRupiah(p.oldPrice)}</small>` : ''}
        </div>
      </div>
    </article>
  `).join('');

  // Quick add listener
  $$('.quick-add').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = Number(btn.dataset.id);
      addToCart(id); // didefinisikan di cart.js
    });
  });
}

// ---------- Search input ----------
$('#searchInput').addEventListener('input', (e) => {
  const activeFilter = $('.filter-tab.active')?.dataset.filter || 'all';
  renderProducts(activeFilter, e.target.value);
});

// ---------- Render Testimonials ----------
function renderTestimonials() {
  $('#testiGrid').innerHTML = TESTIMONIALS.map(t => `
    <div class="testi-card">
      <div class="testi-stars">${'★'.repeat(t.rating)}</div>
      <p class="testi-text">"${t.text}"</p>
      <div class="testi-author">
        <div class="testi-avatar">${t.name.charAt(0)}</div>
        <div>
          <div class="testi-name">${t.name}</div>
          <div class="testi-role">${t.role}</div>
        </div>
      </div>
    </div>
  `).join('');
}

// ---------- Newsletter (demo only) ----------
$('#newsletterForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target.querySelector('input').value;
  const msg = $('#newsletterMsg');
  msg.textContent = `✓ Terima kasih! (Demo — ${email} tidak disimpan)`;
  e.target.querySelector('input').value = '';
  setTimeout(() => { msg.textContent = ''; }, 4000);
});

// ---------- Toast ----------
let toastTimer;
function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  renderFilters();
  renderProducts();
  renderTestimonials();
  initCart(); // dari cart.js
});