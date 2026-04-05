[Türkçe](README.md) | [English](README_EN.md)

# 🌐 Blog Site Main Template

This project is a modern **personal blog** or **content website** template built with a fully static structure. It can be easily deployed on GitHub Pages or similar static hosting services.

---

## 🚀 Features

- **Fully static structure** (HTML, CSS, JS)
- **JSON-based content management** (`blogs.json`)
- **RSS support** (`rss.xml`)
- **Automatic deployment with GitHub Actions**
- **Custom domain (CNAME) support**
- **Mobile-friendly and fast loading performance**
- **Community ideas in chat room**

---

## 📁 Project Structure

```
Blog-main/
│
├── index.html            # Home page
├── blog.html             # Single post page
├── blogs.json            # JSON source for blog posts
├── rss.xml               # RSS feed
├── style.css             # Global stylesheet
├── script.js             # Home page logic
├── blog.js               # Post detail page logic
├── favicon.png           # Site icon
├── favicon1.png          # Alternative favicon
├── linux.html            # Where Linux distributions are located
├── chat.html             # Chat Room
├── chat.js               # Chat Room Engine
│
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Pages automatic deployment
│
├── LICENSE               # License file
├── CNAME                 # Custom domain configuration
└── README.md             # This document
```

---

## ⚙️ Setup

### 1. Clone the repository
```bash
git clone https://github.com/Lifantel/Blog
cd blog-sitesi
```

### 2. Enable GitHub Pages (if using GitHub)
- Go to **Settings → Pages**
- Select the `main` branch
- GitHub will publish automatically at:  
  `https://username.github.io/blog-sitesi`

### 3. Custom Domain (CNAME)
Add your custom domain to the `CNAME` file:
```
www.exampledomain.com
```

Set a DNS `CNAME` record pointing to `username.github.io`.

---

## 🧩 Content Management

All content is loaded from `blogs.json`.

### JSON Format
```json
[
  {
    "id": 1,
    "title": "Your Title",
    "category": "Your Category",
    "excerpt": "Short description",
    "author": "Your Name",
    "date": "2025-09-28",
    "content": "HTML content body"
  }
]
```

### Adding a New Post
Just add a new object to the array.  
The system will automatically include it in the blog list.

---

## 📰 RSS Feed

`rss.xml` can be updated manually or via script.  
RSS allows users to automatically follow new updates.

To update:  
Copy everything between `<item>` and `</item>` and paste it below with a blank line.

### Example
```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>My Blog</title>
    <link>https://mfgultekin.com/</link>
    <description>Mehmet Fatih Gültekin</description>
    <language>tr</language>

    <item>
      <title>The Psychological Dimension of Debranding – Logo Simplification</title>
      <link>https://www.mfgultekin.com/blog.html?id=33</link>
      <description>Simplifying brand logos strengthens trust, sincerity, and accessibility in the minds of consumers.</description>
      <pubDate>Thu, 30 Oct 2025 12:00:00 +0300</pubDate>
    </item>

  </channel>
</rss>
```

---

## 🧠 Developer Notes

- **index.html** → Blog list + featured posts
- **blog.html** → Shows selected post using URL `id` parameter
- **script.js** → Fetches from `blogs.json` and writes to DOM
- **blog.js** → Loads selected blog content based on `id`
- **style.css** → Responsive design & grid layout

---

## 🧱 Customization

- Color palette can be modified in `style.css`
- Post count / filtering can be adjusted in `script.js`
- You can add search, categories, and more custom logic

---

## ⚠️ Troubleshooting

| Problem | Cause | Solution |
|---------|--------|-----------|
| Page doesn’t update | Cache issue | Refresh or clear browser cache |
| JSON not loading | Wrong file path | Verify `blogs.json` location |
| Domain not working | DNS issue | Check CNAME and DNS records |

---

## 🪪 License

This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute it.

---

## ✨ Contributing

1. Create a fork  
2. Make a new branch (`feature/new-feature`)  
3. Commit your changes  
4. Submit a Pull Request  

---

## 📬 Contact

Email: `mail@mfgultekin.com`  
Or open an Issue on GitHub.

---

**Authors:** Mehmet Fatih GÜLTEKİN
**Version:** 3.0.0
