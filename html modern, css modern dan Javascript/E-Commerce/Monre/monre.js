
"use strict";

const $ = (selector) => document.querySelector(selector);

const STORAGE_KEY = "Monre-commerce-v1";
const PAGE_SIZE = 5;

const initialOrders = [
  { id: "VL-24081", customer: "Aurelia Putri", email: "aurelia@example.test", date: "2025-06-18", amount: 1250000, status: "Processing" },
  { id: "VL-24080", customer: "Rafael Wijaya", email: "rafael@example.test", date: "2025-06-18", amount: 875000, status: "Shipped" },
  { id: "VL-24079", customer: "Clara Maharani", email: "clara@example.test", date: "2025-06-17", amount: 2340000, status: "Delivered" },
  { id: "VL-24078", customer: "Dimas Pratama", email: "dimas@example.test", date: "2025-06-17", amount: 650000, status: "Pending" },
  { id: "VL-24077", customer: "Sofia Anindya", email: "sofia@example.test", date: "2025-06-16", amount: 1580000, status: "Delivered" },
  { id: "VL-24076", customer: "Adrian Kusuma", email: "adrian@example.test", date: "2025-06-15", amount: 920000, status: "Processing" },
  { id: "VL-24075", customer: "Maya Lestari", email: "maya@example.test", date: "2025-06-14", amount: 1890000, status: "Shipped" },
  { id: "VL-24074", customer: "Nadine Putri", email: "nadine@example.test", date: "2025-06-13", amount: 540000, status: "Delivered" },
  { id: "VL-24073", customer: "Farhan Akbar", email: "farhan@example.test", date: "2025-06-12", amount: 1100000, status: "Pending" },
  { id: "VL-24072", customer: "Keisha Amanda", email: "keisha@example.test", date: "2025-06-11", amount: 720000, status: "Delivered" },
  { id: "VL-24071", customer: "Bima Santoso", email: "bima@example.test", date: "2025-06-10", amount: 1460000, status: "Processing" }
];

const initialProducts = [
  { id: 1, name: "Signature Leather Tote", category: "Accessories", price: 1250000, stock: 24, sold: 128, art: "bag", emoji: "▱" },
  { id: 2, name: "Ceramic Form Vase", category: "Home & Living", price: 485000, stock: 8, sold: 96, art: "vase", emoji: "♜" },
  { id: 3, name: "Everyday Linen Shirt", category: "Apparel", price: 650000, stock: 3, sold: 84, art: "shirt", emoji: "◇" },
  { id: 4, name: "Monre Essence", category: "Beauty", price: 375000, stock: 0, sold: 63, art: "vase", emoji: "✳" }
];

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed.orders) && Array.isArray(parsed.products)) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn("Monre: local data could not be loaded.", error);
  }

  return {
    orders: initialOrders.map((order) => ({ ...order })),
    products: initialProducts.map((product) => ({ ...product })),
    nextProductId: 5
  };
}

let state = loadState();
let currentPage = 1;
let activeOrderId = null;

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch (error) {
    console.warn("Monre: local data could not be saved.", error);
    showToast("Perubahan hanya tersedia sementara karena penyimpanan browser tidak tersedia.", true);
    return false;
  }
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function formatMoney(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);
}

function formatCompactMoney(value) {
  if (value >= 1000000) {
    return "Rp " + (value / 1000000).toLocaleString("id-ID", {
      maximumFractionDigits: 1
    }) + " jt";
  }
  if (value >= 1000) {
    return "Rp " + Math.round(value / 1000).toLocaleString("id-ID") + " rb";
  }
  return formatMoney(value);
}

function formatDate(dateString) {
  const date = new Date(dateString + "T12:00:00");
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(date);
}

function showToast(message, isError = false) {
  const toast = document.createElement("div");
  toast.className = "toast" + (isError ? " error" : "");
  toast.setAttribute("role", "status");
  toast.textContent = message;
  $("#toastContainer").appendChild(toast);

  window.setTimeout(() => {
    toast.remove();
  }, 3600);
}

function getInitials(name) {
  return name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

function renderDashboard() {
  const totalRevenue = state.orders.reduce((sum, order) => {
    return sum + (order.status === "Pending" ? 0 : order.amount);
  }, 0);

  const completedRevenue = state.orders.reduce((sum, order) => {
    return sum + (order.status === "Delivered" ? order.amount : 0);
  }, 0);

  const pendingCount = state.orders.filter((order) =>
    order.status === "Pending" || order.status === "Processing"
  ).length;

  $("#revenueValue").textContent = formatCompactMoney(totalRevenue);
  $("#ordersValue").textContent = state.orders.length.toLocaleString("id-ID");
  $("#aovValue").textContent = formatCompactMoney(
    state.orders.length ? totalRevenue / state.orders.length : 0
  );
  $("#pendingValue").textContent = pendingCount.toLocaleString("id-ID");
  $("#navOrderCount").textContent = state.orders.length;
  $("#ordersHeadingCount").textContent = state.orders.length;

  // Persentase pada kartu adalah ilustrasi demo, bukan perhitungan historis.
  renderOrders();
  renderProducts();
  renderInventory();
  renderChart($("#chartRange").value);

  return { totalRevenue, completedRevenue };
}

function getFilteredOrders() {
  const query = $("#orderSearch").value.trim().toLowerCase();
  const status = $("#statusFilter").value;

  return state.orders.filter((order) => {
    const matchesQuery =
      order.id.toLowerCase().includes(query) ||
      order.customer.toLowerCase().includes(query) ||
      order.email.toLowerCase().includes(query);

    return matchesQuery && (status === "all" || order.status === status);
  });
}

function renderOrders() {
  const filtered = getFilteredOrders();
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  currentPage = Math.min(currentPage, pageCount);

  const start = (currentPage - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);
  const tbody = $("#ordersTableBody");

  if (!visible.length) {
    tbody.innerHTML = '<tr><td colspan="6" class="empty-row">Tidak ada pesanan yang cocok dengan pencarian.</td></tr>';
  } else {
    tbody.innerHTML = visible.map((order, index) => `
      <tr>
        <td><span class="order-id">${escapeHTML(order.id)}</span></td>
        <td>
          <div class="customer-cell">
            <span class="customer-avatar avatar-${index % 4}">${escapeHTML(getInitials(order.customer))}</span>
            <span>${escapeHTML(order.customer)}</span>
          </div>
        </td>
        <td>${escapeHTML(formatDate(order.date))}</td>
        <td><span class="amount-cell">${escapeHTML(formatMoney(order.amount))}</span></td>
        <td><span class="status-pill status-${escapeHTML(order.status)}">${escapeHTML(order.status)}</span></td>
        <td><button class="action-button" data-order-id="${escapeHTML(order.id)}">Details ↗</button></td>
      </tr>
    `).join("");
  }

  const shownStart = filtered.length ? start + 1 : 0;
  const shownEnd = Math.min(start + PAGE_SIZE, filtered.length);
  $("#tableSummary").textContent = `Showing ${shownStart}–${shownEnd} of ${filtered.length} orders`;
  $("#pageIndicator").textContent = `${currentPage} / ${pageCount}`;
  $("#prevPage").disabled = currentPage <= 1;
  $("#nextPage").disabled = currentPage >= pageCount;
}

function renderProducts() {
  const products = [...state.products]
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 4);

  const artClass = {
    bag: "art-bag",
    vase: "art-vase",
    shirt: "art-shirt"
  };

  $("#topProducts").innerHTML = products.length
    ? products.map((product) => `
      <div class="product-row">
        <div class="product-art ${artClass[product.art] || "art-bag"}">${escapeHTML(product.emoji || "◇")}</div>
        <div class="product-info">
          <strong>${escapeHTML(product.name)}</strong>
          <small>${escapeHTML(product.category)} · ${product.sold} sold · ${product.stock} in stock</small>
        </div>
        <span class="product-price">${escapeHTML(formatMoney(product.price))}</span>
      </div>
    `).join("")
    : '<p class="panel-subtitle">Belum ada produk. Tambahkan produk pertamamu.</p>';
}

function renderInventory() {
  const total = state.products.length;
  const out = state.products.filter((product) => product.stock === 0).length;
  const low = state.products.filter((product) => product.stock > 0 && product.stock < 10).length;
  const healthy = total - low - out;

  $("#inventoryTotal").textContent = total;
  $("#healthyStock").textContent = healthy;
  $("#lowStock").textContent = low;
  $("#outStock").textContent = out;

  const safeTotal = total || 1;
  $("#stockBarHealthy").style.width = (healthy / safeTotal * 100) + "%";
  $("#stockBarLow").style.width = (low / safeTotal * 100) + "%";
  $("#stockBarOut").style.width = (out / safeTotal * 100) + "%";

  const alert = $("#inventoryAlert");
  if (out > 0) {
    alert.textContent = `${out} produk kehabisan stok. Periksa katalog sebelum menerima pesanan baru.`;
  } else if (low > 0) {
    alert.textContent = `${low} produk memiliki stok rendah. Pertimbangkan untuk melakukan restock.`;
  } else {
    alert.textContent = "Semua produk memiliki stok yang cukup berdasarkan data demo.";
  }
}

const chartData = {
  week: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    values: [1200000, 1800000, 1450000, 2600000, 2200000, 3500000, 3100000]
  },
  month: {
    labels: ["01 Jun", "05 Jun", "09 Jun", "13 Jun", "17 Jun", "21 Jun", "25 Jun", "30 Jun"],
    values: [1800000, 2600000, 2100000, 3900000, 3300000, 5100000, 4400000, 6500000]
  },
  year: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    values: [2200000, 2800000, 2500000, 3600000, 4100000, 3900000, 5200000, 4800000, 5700000, 6200000, 5900000, 7200000]
  }
};

function renderChart(range) {
  const data = chartData[range] || chartData.month;
  const values = data.values;
  const maxValue = Math.ceil(Math.max(...values) / 2000000) * 2000000;
  const width = 700;
  const height = 220;
  const insetX = 8;
  const insetY = 12;
  const plotWidth = width - insetX * 2;
  const plotHeight = height - insetY * 2;

  const points = values.map((value, index) => ({
    x: insetX + (values.length === 1 ? plotWidth / 2 : index / (values.length - 1) * plotWidth),
    y: height - insetY - (value / maxValue) * plotHeight,
    value
  }));

  const linePath = points.map((point, index) =>
    `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`
  ).join(" ");

  const first = points[0];
  const last = points[points.length - 1];
  const areaPath = `${linePath} L ${last.x} ${height} L ${first.x} ${height} Z`;

  $("#chartLine").setAttribute("d", linePath);
  $("#chartArea").setAttribute("d", areaPath);

  $("#chartPoints").innerHTML = points.map((point) => `
    <circle cx="${point.x}" cy="${point.y}" r="4.5"
      fill="#ffffff" stroke="#28664f" stroke-width="2"
      tabindex="0" role="img"
      aria-label="${escapeHTML(formatMoney(point.value))}">
      <title>${escapeHTML(formatMoney(point.value))}</title>
    </circle>
  `).join("");

  const labelCount = Math.min(data.labels.length, 8);
  const labelIndexes = Array.from({ length: labelCount }, (_, index) =>
    Math.round(index * (data.labels.length - 1) / Math.max(1, labelCount - 1))
  );

  $("#chartXLabels").innerHTML = labelIndexes.map((index) =>
    `<span>${escapeHTML(data.labels[index])}</span>`
  ).join("");

  $("#chartYLabels").innerHTML = Array.from({ length: 5 }, (_, index) => {
    const value = maxValue * (4 - index) / 4;
    return `<span>${escapeHTML(formatCompactMoney(value))}</span>`;
  }).join("");

  $("#chartTotal").textContent = formatCompactMoney(
    values.reduce((sum, value) => sum + value, 0)
  );
}

function openProductModal() {
  $("#productForm").reset();
  $("#productModal").showModal();
  $("#productName").focus();
}

function addProduct(event) {
  event.preventDefault();

  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const name = $("#productName").value.trim();
  const price = Number($("#productPrice").value);
  const stock = Number($("#productStock").value);
  const category = $("#productCategory").value;

  if (!name || !Number.isFinite(price) || price <= 0 ||
      !Number.isInteger(stock) || stock < 0) {
    showToast("Periksa kembali nama, harga, dan stok produk.", true);
    return;
  }

  const newProduct = {
    id: state.nextProductId++,
    name,
    category,
    price,
    stock,
    sold: 0,
    art: category === "Apparel" ? "shirt" :
      category === "Home & Living" ? "vase" : "bag",
    emoji: category === "Beauty" ? "✳" : "◇"
  };

  state.products.unshift(newProduct);
  saveState();
  $("#productModal").close();
  renderProducts();
  renderInventory();
  showToast(`Produk "${name}" berhasil ditambahkan ke data demo.`);
}

function openOrderDetails(orderId) {
  const order = state.orders.find((item) => item.id === orderId);
  if (!order) {
    showToast("Pesanan tidak ditemukan.", true);
    return;
  }

  activeOrderId = orderId;
  $("#orderModalTitle").textContent = order.id;
  $("#orderDetails").innerHTML = `
    <div class="order-detail-row"><span>Customer</span><strong>${escapeHTML(order.customer)}</strong></div>
    <div class="order-detail-row"><span>Email</span><strong>${escapeHTML(order.email)}</strong></div>
    <div class="order-detail-row"><span>Order date</span><strong>${escapeHTML(formatDate(order.date))}</strong></div>
    <div class="order-detail-row"><span>Amount</span><strong>${escapeHTML(formatMoney(order.amount))}</strong></div>
    <div class="order-detail-row"><span>Current status</span><strong>${escapeHTML(order.status)}</strong></div>
  `;
  $("#orderStatusSelect").value = order.status;
  $("#orderModal").showModal();
}

function saveOrderStatus() {
  const order = state.orders.find((item) => item.id === activeOrderId);
  if (!order) return;

  order.status = $("#orderStatusSelect").value;
  saveState();
  $("#orderModal").close();
  renderDashboard();
  showToast(`Status ${order.id} diperbarui menjadi ${order.status}.`);
}

function exportOrders() {
  const headers = ["Order ID", "Customer", "Email", "Date", "Amount IDR", "Status"];
  const rows = state.orders.map((order) => [
    order.id, order.customer, order.email, order.date, order.amount, order.status
  ]);

  const csvEscape = (value) => {
    let text = String(value);
    // Cegah spreadsheet mengeksekusi teks tak tepercaya sebagai formula.
    if (/^[=+\-@\t\r]/.test(text)) text = "'" + text;
    return '"' + text.replace(/"/g, '""') + '"';
  };

  const csv = [headers, ...rows].map((row) =>
    row.map(csvEscape).join(",")
  ).join("\r\n");

  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Monre-orders-demo.csv";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);

  showToast("File CSV pesanan demo berhasil disiapkan.");
}

function setupNavigation() {
  const sidebar = $("#sidebar");
  const menuToggle = $("#menuToggle");

  menuToggle.addEventListener("click", () => {
    const open = sidebar.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      document.querySelectorAll(".nav-link").forEach((item) =>
        item.classList.remove("active")
      );
      link.classList.add("active");
      sidebar.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    if (
      window.innerWidth <= 900 &&
      sidebar.classList.contains("is-open") &&
      !sidebar.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      sidebar.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

function setupEvents() {
  $("#addProductButton").addEventListener("click", openProductModal);
  $("#productForm").addEventListener("submit", addProduct);
  $("#saveOrderStatus").addEventListener("click", saveOrderStatus);
  $("#exportButton").addEventListener("click", exportOrders);

  $("#orderSearch").addEventListener("input", () => {
    currentPage = 1;
    renderOrders();
  });

  $("#statusFilter").addEventListener("change", () => {
    currentPage = 1;
    renderOrders();
  });

  $("#prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderOrders();
    }
  });

  $("#nextPage").addEventListener("click", () => {
    const pageCount = Math.max(1, Math.ceil(getFilteredOrders().length / PAGE_SIZE));
    if (currentPage < pageCount) {
      currentPage++;
      renderOrders();
    }
  });

  $("#ordersTableBody").addEventListener("click", (event) => {
    const button = event.target.closest("[data-order-id]");
    if (button) openOrderDetails(button.dataset.orderId);
  });

  $("#chartRange").addEventListener("change", (event) => {
    renderChart(event.target.value);
  });

  document.querySelectorAll("[data-close]").forEach((button) => {
    button.addEventListener("click", () => {
      const dialog = document.getElementById(button.dataset.close);
      if (dialog) dialog.close();
    });
  });

  document.querySelectorAll("dialog.modal").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  });

  $("#notificationButton").addEventListener("click", () => {
    const out = state.products.filter((product) => product.stock === 0).length;
    const low = state.products.filter((product) => product.stock > 0 && product.stock < 10).length;

    if (out) {
      showToast(`Ada ${out} produk tanpa stok. Periksa bagian Inventory.`);
    } else if (low) {
      showToast(`Ada ${low} produk dengan stok rendah.`);
    } else {
      showToast("Tidak ada peringatan stok dalam data demo.");
    }
  });

  $("#channelInfo").addEventListener("click", () => {
    showToast("Persentase kanal penjualan merupakan ilustrasi statis, bukan data transaksi aktual.");
  });

  $("#viewAllOrders").addEventListener("click", () => {
    $("#orderSearch").value = "";
    $("#statusFilter").value = "all";
    currentPage = 1;
    renderOrders();
  });
}

function initializeDashboard() {
  const now = new Date();
  $("#welcomeDate").textContent = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  }).format(now).toUpperCase();

  setupEvents();
  setupNavigation();
  renderDashboard();
}

initializeDashboard();
