# 🌐 Blog Sitesi Ana Şablonu

Bu proje, statik yapıda çalışan modern bir **kişisel blog** veya **içerik sitesi** şablonudur. GitHub Pages veya benzeri statik barındırma servislerinde kolayca yayınlanabilir.

---

## 🚀 Özellikler

- **Tamamen statik yapı** (HTML, CSS, JS)
- **JSON tabanlı içerik yönetimi** (`blogs.json`)
- **RSS desteği** (`rss.xml`)
- **GitHub Actions ile otomatik deploy**
- **Özel domain (CNAME) desteği**
- Mobil uyumlu ve hızlı yükleme süreleri

---

## 📁 Proje Yapısı

```
Blog-main/
│
├── index.html            # Ana sayfa
├── blog.html             # Tekil yazı sayfası
├── blogs.json            # Blog yazılarının JSON kaynağı
├── rss.xml               # RSS beslemesi
├── style.css             # Genel stil dosyası
├── script.js             # Ana sayfa işlevleri
├── blog.js               # Blog detay sayfası işlevleri
├── favicon.png           # Site simgesi
├── favicon1.png          # Alternatif favicon
│
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Pages otomatik dağıtım
│
├── LICENSE               # Lisans dosyası
├── CNAME                 # Özel domain yapılandırması
└── README.md             # Bu belge
```

---

## ⚙️ Kurulum

### 1. Depoyu klonla
```bash
git clone https://github.com/Lifantel/Blog
cd blog-sitesi
```

### 2. GitHub Pages aktif et
- GitHub'da repo ayarlarından **Settings → Pages** sekmesine git.
- Branch olarak `main` seç ve kaydet.
- GitHub otomatik olarak siteyi yayınlar:  
  `https://kullanici.github.io/blog-sitesi`

### 3. Özel domain (CNAME)
`CNAME` dosyasına özel domainini yaz:  
```
www.ornekdomain.com
```

DNS kayıtlarında `CNAME` olarak `kullanici.github.io` hedefini göster.

---

## 🧩 İçerik Yönetimi

Tüm yazılar `blogs.json` dosyasından yüklenir.

### JSON Formatı
```json
[
  {
    "id": 1,
    "title": "Başlığınız",
    "category": "Katagoriniz",
    "excerpt": "Kısa açıklama",
    "author": "Adınız",
    "date": "2025-09-28 (örnek tarih)",
    "content": "İçerek kısmı (HTML okuyabilecek şekilde)"
  }
]
```

### Yeni yazı eklemek için
`blogs.json` dosyasına yeni bir obje ekle.  
Sistem otomatik olarak listeye dahil eder.

---

## 📰 RSS Beslemesi

`rss.xml` dosyası manuel veya script ile güncellenebilir.  
RSS formatı, okuyucuların yeni içerikleri otomatik takip etmesini sağlar.

```

---

## 🔧 Deploy Otomasyonu

`.github/workflows/deploy.yml` dosyası, her `main` branch’e yapılan push işleminde otomatik olarak siteyi GitHub Pages’a dağıtır.

### Örnek İş Akışı
```yaml
on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

### Faydaları
- Manuel yükleme gerekmez.
- Her commit sonrası otomatik güncelleme yapılır.

---

## 🧠 Geliştirici Notları

- **index.html**: Blog listesi ve öne çıkan yazılar.
- **blog.html**: Seçilen yazının detaylarını `id` parametresiyle gösterir.
- **script.js**: Ana sayfada `blogs.json`’dan verileri çeker ve DOM’a yazar.
- **blog.js**: URL parametresinden yazı `id`’sini alır, JSON’dan eşleşen içeriği getirir.
- **style.css**: Responsive tasarım, sade tipografi ve grid düzeni içerir.

---

## 🧱 Özelleştirme

- Renk paletini `style.css` üzerinden değiştirebilirsin.
- Yazı sayısını veya filtreleme özelliklerini `script.js` içinde ayarlayabilirsin.
- Yeni kategori veya arama fonksiyonu eklemek mümkündür.

---

## ⚠️ Hata Giderme

| Sorun | Olası Sebep | Çözüm |
|-------|--------------|--------|
| Sayfa güncellenmiyor | Cache sorunu | Tarayıcı önbelleğini temizle |
| JSON okunmuyor | Dosya yolu hatalı | `blogs.json` konumunu kontrol et |
| Domain çalışmıyor | DNS kaydı hatalı | CNAME ve DNS ayarlarını doğrula |

---

## 🪪 Lisans

Bu proje **MIT Lisansı** altında sunulmuştur.  
Dilediğiniz gibi kullanabilir, düzenleyebilir ve paylaşabilirsiniz.

---

## ✨ Katkıda Bulunma

1. Fork oluştur  
2. Yeni branch aç (`feature/yeni-özellik`)  
3. Değişiklikleri commit et  
4. Pull Request gönder  

---

## 📬 İletişim

Sorular için: `mail@mfgultekin.com`  
veya GitHub Issues sekmesinden bildirim yapabilirsiniz.

---

**Hazırlayan:** Mehmet Fatih GÜLTEKİN / Fikri Efe AKAR
**Sürüm:** 1.3.7
