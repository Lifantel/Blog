// script.js
const listEl = document.getElementById('blog-list');
const searchEl = document.getElementById('search');
const categoryEl = document.getElementById('category');
const authorEl = document.getElementById('author');
const sortEl = document.getElementById('sort');
const refreshBtn = document.getElementById('refreshBtn');

// --- YAN PANEL İÇİN YENİ EKLENEN SEÇİCİLER ---
const menuToggleBtn = document.getElementById('menu-toggle');
const closeMenuBtn = document.getElementById('close-menu');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
// --- EKLENTİ SONU ---

let allBlogs = [];
let activeAuthor = '';

async function fetchBlogs() {
  const url = 'blogs.json?v=' + Date.now();
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('blogs.json yüklenemedi: ' + res.status);
  return res.json();
}

function clearChildren(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
}

function sortBlogs(blogs) {
  return blogs.sort((a, b) => {
    if (sortEl.value === 'oldest') return new Date(a.date) - new Date(b.date);
    return new Date(b.date) - new Date(a.date); // default newest
  });
}

function renderCards(blogs, filter = '') {
  clearChildren(listEl);
  const selectedCategory = categoryEl.value;
  const q = filter.trim().toLowerCase();

  let filtered = blogs.filter(b => {
    const matchesQ =
      q === '' ||
      (b.title && b.title.toLowerCase().includes(q)) ||
      (b.excerpt && b.excerpt.toLowerCase().includes(q));
    const matchesCat = selectedCategory === '' || b.category === selectedCategory;
    const matchesAuthor = activeAuthor === '' || b.author === activeAuthor;
    return matchesQ && matchesCat && matchesAuthor;
  });

  filtered = sortBlogs(filtered);

  if (filtered.length === 0) {
    listEl.innerHTML = '<p style="padding:12px;color:#6b7280">Herhangi bir yazı bulunamadı.</p>';
    return;
  }

  filtered.forEach(b => {
    const card = document.createElement('article');
    card.className = 'blog-card';
    card.innerHTML = `
      <h2>${escapeHtml(b.title)}</h2>
      <div class="meta">
        ✍️ ${escapeHtml(b.author || 'Bilinmeyen')} —
        🗓️ ${escapeHtml(new Date(b.date).toLocaleDateString('tr-TR'))} |
        Kategori: ${escapeHtml(b.category || '')}
      </div>
      <p>${escapeHtml(b.excerpt || '')}</p>
      <a class="read" href="blog.html?id=${encodeURIComponent(b.id)}">Devamını Oku</a>
    `;
    listEl.appendChild(card);
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// --- YAN PANEL İÇİN YENİ EKLENEN FONKSİYONLAR ---
function openSidebar() {
  if (sidebar) sidebar.classList.add('open');
  if (overlay) overlay.classList.add('open');
}

function closeSidebar() {
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
}
// --- EKLENTİ SONU ---


async function init() {
  try {
    const blogs = await fetchBlogs();
    allBlogs = blogs;

    // Kategorileri doldur
    const cats = Array.from(new Set(blogs.map(b => b.category || ''))).filter(Boolean).sort();
    clearChildren(categoryEl);
    const defaultCatOpt = document.createElement('option');
    defaultCatOpt.value = '';
    defaultCatOpt.textContent = 'Tüm Kategoriler';
    categoryEl.appendChild(defaultCatOpt);
    cats.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c;
      categoryEl.appendChild(opt);
    });

    // Yazarları doldur
    const authors = Array.from(new Set(blogs.map(b => b.author || ''))).filter(Boolean).sort();
    clearChildren(authorEl);
    const defaultAuthorOpt = document.createElement('option');
    defaultAuthorOpt.value = '';
    defaultAuthorOpt.textContent = 'Tüm Yazarlar';
    authorEl.appendChild(defaultAuthorOpt);
    authors.forEach(a => {
      const opt = document.createElement('option');
      opt.value = a;
      opt.textContent = a;
      authorEl.appendChild(opt);
    });

    // İlk render
    renderCards(allBlogs, '');

    // Eventler (Mevcut eventler)
    searchEl.addEventListener('input', e => renderCards(allBlogs, e.target.value));
    categoryEl.addEventListener('change', () => renderCards(allBlogs, searchEl.value));
    authorEl.addEventListener('change', () => {
      activeAuthor = authorEl.value;
      renderCards(allBlogs, searchEl.value);
    });
    sortEl.addEventListener('change', () => renderCards(allBlogs, searchEl.value));
    refreshBtn.addEventListener('click', async () => {
      try {
        const newBlogs = await fetchBlogs();
        allBlogs = newBlogs;
        renderCards(allBlogs, searchEl.value);
      } catch (err) {
        console.error(err);
        alert('Yenileme başarısız: ' + err.message);
      }
    });

    // --- YAN PANEL İÇİN YENİ EKLENEN EVENTLER ---
    if (menuToggleBtn) {
      menuToggleBtn.addEventListener('click', openSidebar);
    }
    if (closeMenuBtn) {
      closeMenuBtn.addEventListener('click', closeSidebar);
    }
    if (overlay) {
      overlay.addEventListener('click', closeSidebar);
    }
    // --- EKLENTİ SONU ---

  } catch (err) {
    console.error(err);
    listEl.innerHTML = `<p style="padding:12px;color:#ef4444">Hata: ${escapeHtml(err.message)}</p>`;
  }
}

init();