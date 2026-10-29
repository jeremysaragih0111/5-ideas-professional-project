/* ============================================================
   storage.js — Layer penyimpanan (localStorage)
   Tidak ada backend. Semua data lokal di browser user.
   ============================================================ */

const STORAGE_KEY = 'taskflow-ai.tasks.v1';

const Storage = {
  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const data = JSON.parse(raw);
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.warn('[TaskFlow] Gagal membaca localStorage:', err);
      return [];
    }
  },

  save(tasks) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      return true;
    } catch (err) {
      console.error('[TaskFlow] Gagal menyimpan:', err);
      return false;
    }
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY);
  }
};