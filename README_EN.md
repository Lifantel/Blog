[Türkçe](README.md) | [English](README_EN.md)

# Blog Site Main Template

A **simple, fast and fully static** template for launching your own blog or content site in minutes. No server, no database and no complicated setup. Add your posts to a single JSON file and the site takes care of the rest.

It can be published for **free** on GitHub Pages and similar static hosting services.

---

## Table of Contents

1. [Why this template?](#why-this-template)
2. [Features](#features)
3. [Who is it for?](#who-is-it-for)
4. [Quick start](#quick-start)
5. [Content management](#content-management)
6. [RSS feed](#rss-feed)
7. [Community chat room](#community-chat-room)
8. [Linux page and DistroAI](#linux-page-and-distroai)
9. [Customization](#customization)
10. [Project structure](#project-structure)
11. [FAQ](#faq)
12. [License, contributing, contact](#license-contributing-contact)

---

## Why this template?

**Almost zero setup and maintenance.**
No build step, package manager, framework or database. Clone the repo, edit `blogs.json`, publish.

**Free and under your control.**
GitHub Pages is all the hosting you need. No hosting bill, no platform lock-in. Because your posts live in a plain JSON file, you can move them anywhere at any time.

**Focus on writing.**
Adding a post is as simple as adding an object to a JSON file. Category and author filters are generated automatically, so there is nothing to update by hand.

**Fast and lightweight.**
No heavy libraries, just HTML, CSS and plain JavaScript. Pages are small and the logic is easy to read.

**Keeps readers connected to you.**
Built-in RSS support lets readers follow your new posts automatically. Post links (`blog.html?id=33`) are shareable and permanent.

**Readable code, easy customization.**
All colors live in CSS variables and all logic sits in a few small files. You don't need to explore a large codebase to change something.

**Permissive license.**
Released under the MIT license, so you can use it freely in personal or commercial projects.

---

## Features

### Reading experience
- **Dark "Noir" theme:** clean typography, a single accent color and easy-on-the-eyes cards
- **Responsive layout:** grid design that adapts to desktop, tablet and phone
- **Side menu:** a simple navigation panel opened from a hamburger button
- **Shareable post links:** every post has its own address

### Discovery tools
- **Instant search:** searches titles and excerpts as you type
- **Category filter:** categories are collected from your posts automatically
- **Author filter:** ready for multi-author use
- **Sorting:** newest or oldest first
- **Random post:** a one-click button that sends readers exploring your archive
- **Refresh button:** pulls the latest content without leaving the page

### Content and publishing
- **JSON-based content:** one file, one source of truth
- **HTML post bodies:** headings, images, tables, code blocks, links, anything you can write in HTML
- **RSS feed:** subscription support through `rss.xml`
- **Automatic deployment with GitHub Actions:** the site updates itself on every push to `main`
- **Custom domain (CNAME) support:** publish under your own domain name

### Extra pages
- **Linux distributions page:** featured distributions with icons and download links
- **DistroAI showcase:** a ready-made popup for the project that helps you find the distribution that suits you
- **Community chat room:** a live chat powered by Firebase that you can enable with your own project (see [Community chat room](#community-chat-room))

---

## Who is it for?

- Writers and developers who want to start a **personal blog**
- Anyone keeping a **technical notebook** or knowledge archive
- People who want a **quick content site** without setting up a complex CMS
- Students and beginners who want to **learn how static sites work**
- Anyone looking for a **clean starting point** to build their own design on

---

## Quick start

### 1. Clone the repository
```bash
git clone https://github.com/Lifantel/Blog
cd Blog
```

### 2. Try it locally
The site reads JSON with `fetch()`, so open it through a small local server:
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

### 3. Publish with GitHub Pages
1. Push the repository to GitHub.
2. Go to **Settings → Pages**.
3. Select **GitHub Actions** as the **Source**.
4. Every push to `main` now updates the site automatically:
   `https://username.github.io/Blog`

### 4. Connect your own domain
Put your domain name in the `CNAME` file:
```
www.exampledomain.com
```
In your DNS panel, create a `CNAME` record for `www` pointing to `username.github.io`. Then enable **Enforce HTTPS** under **Settings → Pages**.

---

## Content management

All posts are stored as an array in `blogs.json`.

```json
[
  {
    "id": 1,
    "title": "Your Title",
    "category": "Your Category",
    "excerpt": "Short description",
    "author": "Your Name",
    "date": "2025-09-28",
    "content": "<p>Your content goes here, written as HTML.</p>"
  }
]
```

| Field | Description |
|-------|-------------|
| `id` | A unique number for each post. The post link is based on it. |
| `title` | Post title |
| `category` | The category filter is built from this field automatically |
| `excerpt` | Short description shown on the card; search also looks inside it |
| `author` | The author filter is built from this field automatically |
| `date` | Date in `YYYY-MM-DD` format |
| `content` | The body of the post (HTML) |

**To add a new post:** add a new object to the `blogs.json` array, save and push. The post appears in the list on its own.

> Tip: quotes inside JSON must be escaped as `\"`, and objects must be separated by commas. Checking the file with a JSON validator before saving is a good habit.

---

## RSS feed

`rss.xml` lets readers follow your new posts in their RSS apps. When you add a post, copy an existing `<item>` block, paste it below and change the fields:

```xml
<item>
  <title>Post title</title>
  <link>https://www.exampledomain.com/blog.html?id=33</link>
  <guid isPermaLink="true">https://www.exampledomain.com/blog.html?id=33</guid>
  <description>Short description</description>
  <pubDate>Thu, 30 Oct 2025 12:00:00 +0300</pubDate>
</item>
```

Write `&`, `<` and `>` as `&amp;`, `&lt;` and `&gt;` in titles and descriptions. You can validate your feed at <https://validator.w3.org/feed/>.

---

## Community chat room

`chat.html` and `chat.js` provide a live chat room where visitors can talk to each other. It runs on Firebase Realtime Database and includes:

- Nickname and message sending, with a live stream of the last 50 messages
- A short auto-generated signature for each user (e.g. `#A3F2`)
- A 500-character limit per message with a live character counter
- A 5-second cooldown to prevent rapid-fire messages
- Safe rendering of user input

### To run your own chat room
1. Create a project in the [Firebase Console](https://console.firebase.google.com) and enable **Realtime Database**.
2. Add a web app and paste the provided configuration into the `firebaseConfig` object in `chat.js`.
3. Set the database rules as follows:

```json
{
  "rules": {
    "messages": {
      ".read": true,
      "$id": {
        ".write": "!data.exists()",
        ".validate": "newData.hasChildren(['user','text','signature','timestamp']) && newData.child('user').isString() && newData.child('user').val().length <= 20 && newData.child('text').isString() && newData.child('text').val().length <= 500 && newData.child('timestamp').val() == now",
        "$other": { ".validate": false }
      }
    }
  }
}
```

These rules allow messages to be created only, limit their length on the server side and reject unexpected fields.

4. Update the page title in `chat.html` to your liking.

---

## Linux page and DistroAI

`linux.html` lists featured GNU/Linux distributions (Ubuntu, Linux Mint, Debian, Arch Linux, Manjaro, Fedora and more) with short descriptions, desktop environment info and official download links.

The **DistroAI** popup on the page introduces a neural-network-based project that recommends a distribution based on your answers to a few questions:
- Web version: <https://lifantel.github.io/distroaiWeb/>
- Terminal version: <https://github.com/Lifantel/distroai>

To add a new distribution, copy one of the `<article class="blog-card">` blocks on the page and edit it.

---

## Customization

- **Colors:** the `:root` block at the top of `style.css` (`--bg`, `--card`, `--text`, `--muted`, `--accent`). A single `--accent` value changes the site's highlight color.
- **Site name and subtitle:** the `<title>`, `<h1>` and `.subtitle` elements in `index.html`.
- **Menu links:** the `<aside id="sidebar">` section in `index.html`.
- **Listing and filtering behavior:** `script.js`.
- **New pages:** add a new HTML file that links `style.css`; the existing card and grid styles are ready to use.

---

## Project structure

```
Blog-main/
│
├── index.html            # Home page: search, filters, post cards
├── blog.html             # Single post page (?id=...)
├── blogs.json            # Source of all posts
├── rss.xml               # RSS feed
├── style.css             # Global stylesheet
├── script.js             # Home page logic
├── blog.js               # Post detail logic
├── random-post.js        # Random post button
├── linux.html            # Linux distributions and DistroAI
├── chat.html             # Chat room interface
├── chat.js               # Chat room engine (Firebase)
├── favicon.png           # Site icon
├── favicon1.png          # Alternative icon
│
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Pages automatic deployment
│
├── LICENSE               # MIT license
├── CNAME                 # Custom domain configuration
├── README.md             # Turkish documentation
└── README_EN.md          # English documentation
```

---

## FAQ

**Do I need a server or a database?**
No. The site is fully static and reads its content from `blogs.json`. Only the optional chat room needs a Firebase project.

**Is hosting paid?**
GitHub Pages is free. If you want a custom domain, you only pay for the domain name.

**Do I need to know how to code?**
Adding posts only requires editing JSON. Changing the look needs basic CSS knowledge.

**Can I use images, tables or code in my posts?**
Yes. The `content` field accepts HTML, so you can do anything HTML can do.

**Can I host it somewhere other than GitHub?**
Yes. Any static host works, such as Netlify, Cloudflare Pages, Vercel or your own server.

**What if I want to move to another system later?**
Since your content sits in a plain JSON file, exporting and converting it is easy.

---

## License, contributing, contact

**License:** This project is released under the **MIT License**. You are free to use, modify and distribute it.

**To contribute**
1. Create a fork
2. Open a new branch (`feature/new-feature`)
3. Commit your changes
4. Submit a Pull Request

**Contact:** `mail@mfgultekin.com` or the GitHub **Issues** tab.

---

**Author:** Mehmet Fatih GÜLTEKİN
**Version:** 3.1.4
