const detailContainer = document.getElementById("blog-detail");

async function loadBlogDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  const res = await fetch("blogs.json");
  const blogs = await res.json();

  const blog = blogs.find(b => b.id === id);

  if (blog) {
    detailContainer.innerHTML = `
      <h1>${blog.title}</h1>
      <p><b>Kategori:</b> ${blog.category}</p>
      <p>${blog.content}</p>
    `;
  } else {
    detailContainer.innerHTML = "<p>Blog bulunamadı.</p>";
  }
}

loadBlogDetail();
