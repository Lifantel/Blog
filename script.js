const listContainer = document.getElementById("blog-list");
const searchInput = document.getElementById("search");

async function loadBlogs(filter = "") {
  const res = await fetch("blogs.json");
  const blogs = await res.json();

  listContainer.innerHTML = "";

  blogs
    .filter(blog => blog.title.toLowerCase().includes(filter.toLowerCase()))
    .forEach(blog => {
      const card = document.createElement("div");
      card.className = "blog-card";
      card.innerHTML = `
        <h2>${blog.title}</h2>
        <p><b>Kategori:</b> ${blog.category}</p>
        <p>${blog.content.substring(0, 120)}...</p>
        <a href="blog.html?id=${blog.id}">Devamını Oku</a>
      `;
      listContainer.appendChild(card);
    });
}

loadBlogs();

searchInput.addEventListener("input", e => {
  loadBlogs(e.target.value);
});
