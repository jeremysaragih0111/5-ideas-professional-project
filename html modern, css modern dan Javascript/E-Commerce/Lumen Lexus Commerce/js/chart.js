/* ============================================
   CART LOGIC — state di memori + localStorage
   Catatan: ini BUKAN backend. Data hanya di browser.
   ============================================ */

const CART_KEY = 'Lumen Lexus_cart_demo';
let cart = [];

// ---------- Load / Save ----------
function loadCart() {
  try {
    cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    cart = [];
  }
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// ---------- Core actions ----------
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: productId, qty: 1 });
  }
  saveCart();
  renderCart();
  updateCartCount();
  showToast(`✓ ${product.name} ditambahkan`);
  // buka drawer sebentar
  openCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  renderCart();
  updateCartCount();
}

function changeQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }
  saveCart();
  renderCart();
  updateCartCount();
}

// ---------- Render ----------
function renderCart() {
  const container = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');

  if (cart.length === 0) {
    container.innerHTML = `<p class="cart-empty">Keranjang masih kosong.<br>Yuk pilih produk favoritmu ✨</p>`;
    totalEl.textContent = formatRupiah(0);
    return;
  }

  let total = 0;
  container.innerHTML = cart.map(item => {
    const p = PRODUCTS.find(prod => prod.id === item.id);
    if (!p) return '';
    const subtotal = p.price * item.qty;
    total += subtotal;
    return `
      <div class="cart-item">
        <img src="${p.img}" alt="${p.name}" />
        <div class="cart-item-info">
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-price">${formatRupiah(p.price)}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" data-action="dec" data-id="${p.id}">−</button>
            <span>${item.qty}</span>
            <button class="qty-btn" data-action="inc" data-id="${p.id}">+</button>
          </div>
        </div>
        <button class="cart-remove" data-id="${p.id}" aria-label="Hapus">✕</button>
      </div>
    `;
  }).join('');

  totalEl.textContent = formatRupiah(total);

  // Bind events
  container.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      changeQty(id, btn.dataset.action === 'inc' ? 1 : -1);
    });
  });
  container.querySelectorAll('.cart-remove').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(Number(btn.dataset.id)));
  });
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const el = document.getElementById('cartCount');
  el.textContent = count;
  el.classList.toggle('show', count > 0);
}

// ---------- Drawer open/close ----------
function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartDrawer').setAttribute('aria-hidden', 'false');
  document.getElementById('drawerOverlay').classList.add('show');
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartDrawer').setAttribute('aria-hidden', 'true');
  document.getElementById('drawerOverlay').classList.remove('show');
}

// ---------- Init ----------
function initCart() {
  loadCart();
  renderCart();
  updateCartCount();

  document.getElementById('cartToggle').addEventListener('click', openCart);
  document.getElementById('cartClose').addEventListener('click', closeCart);
  document.getElementById('drawerOverlay').addEventListener('click', closeCart);

  // ESC untuk menutup
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCart();
  });

  // Checkout demo
  document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (cart.length === 0) {
      showToast('Keranjang masih kosong');
      return;
    }
    showToast('✓ Checkout demo — tidak ada transaksi nyata');
    cart = [];
    saveCart();
    renderCart();
    updateCartCount();
    closeCart();
  });
}