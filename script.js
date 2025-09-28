// Blog verileri
const blogs = [
  {
    id: 1,
    title: "İlk Blog",
    summary: "Bu benim ilk blog yazımın özeti.",
    file: "blogs/blog1.html",
    category: "Genel"
  },
  {
    id: 2,
    title: "İkinci Blog",
    summary: "Bu ikinci yazımın özeti.",
    file: "blogs/blog2.html",
    category: "Teknoloji"
  }
];

// Sayfa kontrolü
const listContainer = document.getElementById("blog-list");
const detailContainer = document.getElementById("blog-detail");
const searchInput = document.getElementById("search");

// Blog listesi
if (listContainer) {
  function renderBlogs(filter = "") {
    listContainer.innerHTML = "";
    blogs
      .filter(b => b.title.toLowerCase().includes(filter.toLowerCase()))
      .forEach(blog => {
        const card = document.createElement("div");
        card.className = "blog-card";
        card.innerHTML = `
          <h2>${blog.title}</h2>
          <p>${blog.summary}</p>
          <a href="blog.html?id=${blog.id}">Devamını Oku</a>
        `;
        listContainer.appendChild(card);
      });
  }

  renderBlogs();

  if (searchInput) {
    searchInput.addEventListener("input", e => {
      renderBlogs(e.target.value);
    });
  }
}

// Blog detay
if (detailContainer) {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const blog = blogs.find(b => b.id == id);

  if (blog) {
    fetch(blog.file)
      .then(res => res.text())
      .then(content => {
        detailContainer.innerHTML = `
          <h1>${blog.title}</h1>
          <p><em>Kategori: ${blog.category}</em></p>
          <div>${content.replace(/\n/g, "<br>")}</div>
        `;
      });
  } else {
    detailContainer.innerHTML = "<p>Blog bulunamadı.</p>";
  }
}
