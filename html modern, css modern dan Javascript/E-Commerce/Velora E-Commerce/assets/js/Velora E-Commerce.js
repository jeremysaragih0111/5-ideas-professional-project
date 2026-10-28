/* =========================================================
   VELORA COMMERCE — UI INTERACTIONS
   Catatan: Ini hanya interaksi front-end (UI demo).
   Tidak ada backend, autentikasi, atau pembayaran.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Navbar: shadow saat scroll ---------- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  });

  /* ---------- Mobile menu toggle ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  const observerNav = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(item => {
          item.classList.toggle(
            'active',
            item.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach(sec => observerNav.observe(sec));

  /* ---------- Toast helper ---------- */
  const toast = document.getElementById('toast');
  let toastTimer;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  /* ---------- Cart counter ---------- */
  const cartBadge = document.getElementById('cartBadge');
  let cartCount = 0;

  document.querySelectorAll('.add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      cartCount++;
      cartBadge.textContent = cartCount;
      cartBadge.classList.add('show');
      showToast(`✦ ${btn.dataset.name} ditambahkan ke keranjang`);
    });
  });

  document.querySelector('[data-action="cart"]').addEventListener('click', () => {
    if (cartCount === 0) {
      showToast('Keranjang masih kosong');
    } else {
      showToast(`Keranjang: ${cartCount} item (demo UI)`);
    }
  });

  document.querySelector('[data-action="search"]').addEventListener('click', () => {
    showToast('Fitur pencarian belum tersedia (demo)');
  });

  /* ---------- Favourite toggle ---------- */
  document.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      btn.classList.toggle('active');
      btn.textContent = btn.classList.contains('active') ? '♥' : '♡';
    });
  });

  /* ---------- Product filter ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      productCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hide', !match);
      });
    });
  });

  /* ---------- Newsletter form (demo only) ---------- */
  const newsletterForm = document.getElementById('newsletterForm');
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');
    if (input.value.trim()) {
      showToast('✦ Terima kasih! (demo — tidak tersimpan)');
      newsletterForm.reset();
    }
  });

  /* ---------- Scroll reveal animation ---------- */
  const revealTargets = document.querySelectorAll(
    '.section-head, .collection-card, .product-card, .about-visual, .about-text'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const observerReveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observerReveal.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(el => observerReveal.observe(el));

  /* ---------- Smooth close menu on outside click ---------- */
  document.addEventListener('click', (e) => {
    if (
      navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      navLinks.classList.remove('open');
      menuToggle.classList.remove('active');
    }
  });
});