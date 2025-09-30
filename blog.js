// blog.js
const detailEl = document.getElementById('blog-detail');

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function nl2p(text) {
  // çift newline -> yeni paragraf, tek newline -> <br>
  if (!text) return '';
  const parts = text.split(/\n\s*\n/);
  return parts.map(p => `<p>${escapeHtml(p).replace(/\n/g, '<br>')}</p>`).join('');
}

async function fetchBlogs() {
  const url = 'blogs.json?v=' + Date.now();
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('blogs.json yüklenemedi: ' + res.status);
  return res.json();
}

async function loadDetail() {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) {
      detailEl.innerHTML = '<p>Geçersiz blog ID.</p>';
      return;
    }
    const blogs = await fetchBlogs();
    const blog = blogs.find(b => String(b.id) === String(id));
    if (!blog) {
      detailEl.innerHTML = '<p>Blog bulunamadı.</p>';
      return;
    }

    document.title = blog.title + ' — Blog Sitem';
    detailEl.innerHTML = `
      <h1>${escapeHtml(blog.title)}</h1>
      <div class="meta">Kategori: ${escapeHtml(blog.category || '')}</div>
      <div class="content">${nl2p(blog.content || '')}</div>
    `;
  } catch (err) {
    console.error(err);
    detailEl.innerHTML = `<p style="color:#ef4444">Hata: ${escapeHtml(err.message)}</p>`;
  }
}

loadDetail();

