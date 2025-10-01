// script.js
const listEl = document.getElementById('blog-list');
const searchEl = document.getElementById('search');
const categoryEl = document.getElementById('category');
const refreshBtn = document.getElementById('refreshBtn');

async function fetchBlogs() {
  const url = 'blogs.json?v=' + Date.now();
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('blogs.json yüklenemedi: ' + res.status);
  return res.json();
}

function clearChildren(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
}

function renderCards(blogs, filter = '') {
  clearChildren(listEl);
  const selectedCategory = categoryEl.value;

  const q = filter.trim().toLowerCase();
  const filtered = blogs.filter(b => {
    const matchesQ =
      q === '' ||
      (b.title && b.title.toLowerCase().includes(q)) ||
      (b.excerpt && b.excerpt.toLowerCase().includes(q));
    const matchesCat = selectedCategory === '' || b.category === selectedCategory;
    return matchesQ && matchesCat;
  });

  if (filtered.length === 0) {
    listEl.innerHTML = '<p style="padding:12px;color:#6b7280">Herhangi bir yazı bulunamadı.</p>';
    return;
  }

  filtered.forEach(b => {
    const card = document.createElement('article');
    card.className = 'blog-card';
    card.innerHTML = `
      <h2>${escapeHtml(b.title)}</h2>
      <div class="meta">Kategori: ${escapeHtml(b.category || '')}</div>
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

async function init() {
  try {
    const blogs = await fetchBlogs();

    // kategorileri doldur
    const cats = Array.from(new Set(blogs.map(b => b.category || ''))).filter(Boolean).sort();
    clearChildren(categoryEl);
    const defaultOpt = document.createElement('option');
    defaultOpt.value = '';
    defaultOpt.textContent = 'Tüm Kategoriler';
    categoryEl.appendChild(defaultOpt);
    cats.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c;
      categoryEl.appendChild(opt);
    });

    // ilk render
    renderCards(blogs, '');

    // eventler
    searchEl.addEventListener('input', e => renderCards(blogs, e.target.value));
    categoryEl.addEventListener('change', () => renderCards(blogs, searchEl.value));
    refreshBtn.addEventListener('click', async () => {
      try {
        const newBlogs = await fetchBlogs();
        renderCards(newBlogs, searchEl.value);
      } catch (err) {
        console.error(err);
        alert('Yenileme başarısız: ' + err.message);
      }
    });

  } catch (err) {
    console.error(err);
    listEl.innerHTML = `<p style="padding:12px;color:#ef4444">Hata: ${escapeHtml(err.message)}</p>`;
  }
}

init();

