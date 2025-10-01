// script.js
const listEl = document.getElementById('blog-list');
const searchEl = document.getElementById('search');
const categoryEl = document.getElementById('category');
const previewLenEl = document.getElementById('previewLen');
const refreshBtn = document.getElementById('refreshBtn');

async function fetchBlogs() {
  const url = 'blogs.json?v=' + Date.now();
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('blogs.json yüklenemedi: ' + res.status);
  return res.json();
}

// Önizleme için: HTML etiketlerini kaldır, sadece düz metin kalsın
function excerpt(text, len = 120) {
  if (!text) return '';
  const plain = text.replace(/<[^>]+>/g, ''); // HTML etiketleri sil
  if (plain.length <= len) return plain;
  let cut = plain.slice(0, len);
  const lastSpace = cut.lastIndexOf(' ');
  if (lastSpace > Math.floor(len * 0.5)) cut = cut.slice(0, lastSpace);
  return cut.trim() + '...';
}

function clearChildren(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
}

function renderCards(blogs, filter = '') {
  clearChildren(listEl);
  const previewLen = parseInt(previewLenEl.value) || 120;
  const selectedCategory = categoryEl.value;

  const q = filter.trim().toLowerCase();
  const filtered = blogs.filter(b => {
    const matchesQ = q === '' || (b.title && b.title.toLowerCase().includes(q)) || (b.content && b.content.toLowerCase().includes(q));
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
    // Burada sadece excerpt kullanıyoruz, escapeHtml kaldırıldı
    card.innerHTML = `
      <h2>${escapeHtml(b.title)}</h2>
      <div class="meta">Kategori: ${escapeHtml(b.category || '')}</div>
      <p>${excerpt(b.content || '', previewLen)}</p>
      <a class="read" href="blog.html?id=${encodeURIComponent(b.id)}">Devamını Oku</a>
    `;
    listEl.appendChild(card);
  });
}

// Ana başlık ve kategori güvenliği için escapeHtml kullanıyoruz
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

    // Kategorileri doldur
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

    // İlk render
    renderCards(blogs, '');

    // Eventler
    searchEl.addEventListener('input', e => renderCards(blogs, e.target.value));
    categoryEl.addEventListener('change', () => renderCards(blogs, searchEl.value));
    previewLenEl.addEventListener('change', () => renderCards(blogs, searchEl.value));
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

