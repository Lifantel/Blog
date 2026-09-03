// random-post.js
// Sidebar'daki "Rastgele Yazı" butonuna tıklanınca blogs.json'dan
// rastgele bir yazı seçip o yazının detay sayfasına yönlendirir.

(function () {
  const btn = document.getElementById('random-post-btn');
  if (!btn) return; // buton sayfada yoksa hiçbir şey yapma

  async function fetchBlogs() {
    const url = 'blogs.json?v=' + Date.now();
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('blogs.json yüklenemedi: ' + res.status);
    return res.json();
  }

  function pickRandom(blogs) {
    if (!blogs || blogs.length === 0) return null;
    const idx = Math.floor(Math.random() * blogs.length);
    return blogs[idx];
  }

  async function goToRandomPost() {
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = '🎲 Seçiliyor...';

    try {
      const blogs = await fetchBlogs();

      // Şu an bir blog detay sayfasındaysak, aynı yazı tekrar
      // gelmesin diye elimizden geldiğince farklı bir tanesini seçelim.
      const params = new URLSearchParams(window.location.search);
      const currentId = params.get('id');

      let candidates = blogs;
      if (currentId && blogs.length > 1) {
        candidates = blogs.filter(b => String(b.id) !== String(currentId));
      }

      const chosen = pickRandom(candidates);
      if (!chosen) {
        alert('Gösterilecek yazı bulunamadı.');
        return;
      }

      window.location.href = 'blog.html?id=' + encodeURIComponent(chosen.id);
    } catch (err) {
      console.error(err);
      alert('Rastgele yazı seçilemedi: ' + err.message);
    } finally {
      btn.disabled = false;
      btn.textContent = originalText;
    }
  }

  btn.addEventListener('click', goToRandomPost);
})();
