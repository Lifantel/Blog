[Türkçe](README.md) | [English](README_EN.md)

# Blog Sitesi Ana Şablonu

Kendi blogunu ya da içerik sitesini dakikalar içinde yayına almak için hazırlanmış, **sade, hızlı ve tamamen statik** bir şablon. Sunucu, veritabanı veya karmaşık bir kurulum gerektirmez. Yazılarını tek bir JSON dosyasına eklersin, site gerisini halleder.

GitHub Pages ve benzeri statik barındırma servislerinde **ücretsiz** yayınlanabilir.

---

## İçindekiler

1. [Neden bu şablon?](#neden-bu-şablon)
2. [Özellikler](#özellikler)
3. [Kimler için?](#kimler-için)
4. [Hızlı başlangıç](#hızlı-başlangıç)
5. [İçerik yönetimi](#i̇çerik-yönetimi)
6. [RSS beslemesi](#rss-beslemesi)
7. [Topluluk sohbet odası](#topluluk-sohbet-odası)
8. [Linux sayfası ve DistroAI](#linux-sayfası-ve-distroai)
9. [Özelleştirme](#özelleştirme)
10. [Proje yapısı](#proje-yapısı)
11. [Sık sorulan sorular](#sık-sorulan-sorular)
12. [Lisans, katkı, iletişim](#lisans-katkı-iletişim)

---

## Neden bu şablon?

**Kurulumu ve bakımı neredeyse sıfır.**
Derleme adımı, paket yöneticisi, framework veya veritabanı yok. Depoyu al, `blogs.json` dosyasını düzenle, yayınla.

**Ücretsiz ve senin kontrolünde.**
Barındırma için GitHub Pages yeterli. Hosting faturası yok, hesap kilitlenmesi yok. Yazıların düz bir JSON dosyasında durduğu için istediğin an başka bir yere taşıyabilirsin.

**Yazmaya odaklanırsın.**
Yeni yazı eklemek, JSON dosyasına bir nesne eklemek kadar basit. Kategori ve yazar filtreleri otomatik oluşur, listeye elle bir şey eklemen gerekmez.

**Hızlı ve hafif.**
Ağır kütüphaneler yok; yalnızca HTML, CSS ve sade JavaScript. Sayfalar küçük, mantık okunabilir.

**Okuyucularını sana bağlar.**
Dahili RSS desteğiyle okuyucuların yeni yazılarını otomatik takip edebilir. Yazı bağlantıları (`blog.html?id=33`) paylaşılabilir ve kalıcıdır.

**Anlaşılır kod, kolay özelleştirme.**
Tüm renkler CSS değişkenlerinde, tüm mantık birkaç küçük dosyada. Bir şeyi değiştirmek için kod tabanını keşfetmen gerekmez.

**Özgür lisans.**
MIT lisansı altında; kişisel veya ticari projelerinde dilediğin gibi kullanabilirsin.

---

## Özellikler

### Okuma deneyimi
- **Koyu "Noir" tema:** sade tipografi, tek vurgu rengi, göz yormayan kart tasarımı
- **Duyarlı yerleşim:** masaüstü, tablet ve telefonda uyumlu grid düzeni
- **Yan menü:** hamburger menüyle açılan, sade gezinme paneli
- **Paylaşılabilir yazı bağlantıları:** her yazı kendi adresine sahip

### Keşfetme araçları
- **Anlık arama:** başlık ve açıklama içinde yazdıkça arar
- **Kategori filtresi:** kategoriler yazılardan otomatik toplanır
- **Yazar filtresi:** çok yazarlı kullanım için hazır
- **Sıralama:** en yeni veya en eski yazılar
- **Rastgele yazı:** okuyucuyu arşivde gezdiren tek tıklık keşif butonu
- **Yenile butonu:** sayfayı kapatmadan güncel içeriği çeker

### İçerik ve yayın
- **JSON tabanlı içerik:** tek dosya, tek kaynak
- **HTML destekli yazı gövdesi:** başlık, görsel, tablo, kod bloğu, bağlantı; HTML ile yazabildiğin her şey
- **RSS beslemesi:** `rss.xml` ile abonelik desteği
- **GitHub Actions ile otomatik deploy:** `main` dalına her push'ta site kendiliğinden güncellenir
- **Özel domain (CNAME) desteği:** kendi alan adınla yayınla

### Ek sayfalar
- **Linux dağıtımları sayfası:** öne çıkan dağıtımlar, ikonları ve indirme bağlantılarıyla
- **DistroAI tanıtımı:** hangi dağıtımın sana uygun olduğunu bulmana yardım eden proje için hazır bilgi penceresi
- **Topluluk sohbet odası:** Firebase ile çalışan, kendi projenle etkinleştirebileceğin canlı sohbet (bkz. [Topluluk sohbet odası](#topluluk-sohbet-odası))

---

## Kimler için?

- **Kişisel blog** açmak isteyen yazarlar ve geliştiriciler
- **Teknik not defteri** veya bilgi arşivi tutanlar
- Karmaşık bir CMS kurmadan **hızlıca içerik sitesi** yayınlamak isteyenler
- **Statik site mantığını** öğrenmek isteyen öğrenciler ve yeni başlayanlar
- Kendi tasarımını üzerine kurabileceği **sade bir başlangıç noktası** arayanlar

---

## Hızlı başlangıç

### 1. Repoyu klonla
```bash
git clone https://github.com/Lifantel/Blog
cd Blog
```

### 2. Yerelde dene
Site `fetch()` ile JSON okuduğu için küçük bir yerel sunucuyla açılmalıdır:
```bash
python3 -m http.server 8000
```
Ardından tarayıcıda `http://localhost:8000` adresine git.

### 3. GitHub Pages ile yayınla
1. Depoyu GitHub'a gönder.
2. **Settings → Pages** sekmesine git.
3. **Source** olarak **GitHub Actions**'ı seç.
4. `main` dalına yaptığın her push, siteyi otomatik günceller:
   `https://kullanici.github.io/Blog`

### 4. Kendi alan adını bağla
`CNAME` dosyasına alan adını yaz:
```
www.ornekdomain.com
```
DNS panelinde `www` için bir `CNAME` kaydı oluştur ve hedef olarak `kullanici.github.io` adresini göster. Ardından **Settings → Pages** altında **Enforce HTTPS** seçeneğini aç.

---

## İçerik yönetimi

Tüm yazılar `blogs.json` dosyasında bir dizi olarak tutulur.

```json
[
  {
    "id": 1,
    "title": "Başlığınız",
    "category": "Kategoriniz",
    "excerpt": "Kısa açıklama",
    "author": "Adınız",
    "date": "2025-09-28",
    "content": "<p>İçerik buraya, HTML olarak yazılır.</p>"
  }
]
```

| Alan | Açıklama |
|------|----------|
| `id` | Her yazı için benzersiz numara. Yazı bağlantısı bu numaraya dayanır. |
| `title` | Yazı başlığı |
| `category` | Kategori filtresi bu alandan otomatik oluşur |
| `excerpt` | Kartta görünen kısa açıklama; arama bu alanı da tarar |
| `author` | Yazar filtresi bu alandan otomatik oluşur |
| `date` | `YYYY-MM-DD` biçiminde tarih |
| `content` | Yazının gövdesi (HTML) |

**Yeni yazı eklemek için:** `blogs.json` dizisine yeni bir nesne ekle, kaydet ve push et. Yazı listede kendiliğinden görünür.

> İpucu: JSON'da tırnaklar `\"` ile kaçırılmalı ve nesneler arasında virgül unutulmamalıdır. Kaydetmeden önce dosyayı bir JSON doğrulayıcıyla kontrol etmek iyi bir alışkanlıktır.

---

## RSS beslemesi

`rss.xml`, okuyucuların yeni yazılarını RSS uygulamalarıyla takip etmesini sağlar. Yeni yazı eklediğinde mevcut bir `<item>` bloğunu kopyalayıp altına yapıştırman ve alanları değiştirmen yeterli:

```xml
<item>
  <title>Yazı başlığı</title>
  <link>https://www.ornekdomain.com/blog.html?id=33</link>
  <guid isPermaLink="true">https://www.ornekdomain.com/blog.html?id=33</guid>
  <description>Kısa açıklama</description>
  <pubDate>Thu, 30 Oct 2025 12:00:00 +0300</pubDate>
</item>
```

Başlık ve açıklamada `&`, `<`, `>` karakterlerini `&amp;`, `&lt;`, `&gt;` olarak yaz. Besleme adresini <https://validator.w3.org/feed/> ile doğrulayabilirsin.

---

## Topluluk sohbet odası

`chat.html` ve `chat.js`, ziyaretçilerin birbiriyle yazışabildiği canlı bir sohbet odası sunar. Firebase Realtime Database ile çalışır ve şu özellikleri içerir:

- Takma ad ve mesaj gönderme, son 50 mesajın canlı akışı
- Her kullanıcı için otomatik oluşan kısa imza (ör. `#A3F2`)
- Mesaj başına 500 karakter sınırı ve canlı karakter sayacı
- Art arda mesajı önleyen 5 saniyelik bekleme süresi
- Kullanıcı girdisinin güvenli şekilde gösterilmesi

### Kendi sohbet odanı açmak için
1. [Firebase Console](https://console.firebase.google.com)'da bir proje oluştur ve **Realtime Database**'i etkinleştir.
2. Web uygulaması ekleyip verilen yapılandırmayı `chat.js` içindeki `firebaseConfig` alanına yapıştır.
3. Veritabanı kurallarını aşağıdaki gibi ayarla:

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

Bu kurallar mesajların yalnızca oluşturulmasına izin verir, uzunluğu sunucu tarafında sınırlar ve beklenmeyen alanları reddeder.

4. `chat.html` içindeki sayfa başlığını istediğin gibi güncelle.

---

## Linux sayfası ve DistroAI

`linux.html`, öne çıkan GNU/Linux dağıtımlarını (Ubuntu, Linux Mint, Debian, Arch Linux, Manjaro, Fedora ve daha fazlası) kısa tanıtımları, masaüstü ortamı bilgisi ve resmi indirme bağlantılarıyla listeler.

Sayfadaki **DistroAI** penceresi, birkaç soruya verdiğin cevaba göre sana uygun dağıtımı öneren yapay sinir ağı tabanlı projeyi tanıtır:
- Web sürümü: <https://lifantel.github.io/distroaiWeb/>
- Terminal sürümü: <https://github.com/Lifantel/distroai>

Yeni bir dağıtım eklemek için sayfadaki `<article class="blog-card">` bloklarından birini kopyalayıp düzenlemen yeterli.

---

## Özelleştirme

- **Renkler:** `style.css` başındaki `:root` bloğunda (`--bg`, `--card`, `--text`, `--muted`, `--accent`). Tek bir `--accent` değeriyle sitenin vurgu rengini değiştirebilirsin.
- **Site adı ve alt başlık:** `index.html` içindeki `<title>`, `<h1>` ve `.subtitle` alanları.
- **Menü bağlantıları:** `index.html` içindeki `<aside id="sidebar">` bölümü.
- **Listeleme ve filtreleme davranışı:** `script.js` dosyası.
- **Yeni sayfalar:** `style.css`'i bağlayan yeni bir HTML dosyası eklemen yeterli; mevcut kart ve grid stilleri hazır.

---

## Proje yapısı

```
Blog-main/
│
├── index.html            # Ana sayfa: arama, filtreler, yazı kartları
├── blog.html             # Tekil yazı sayfası (?id=...)
├── blogs.json            # Tüm yazıların kaynağı
├── rss.xml               # RSS beslemesi
├── style.css             # Genel stil dosyası
├── script.js             # Ana sayfa işlevleri
├── blog.js               # Yazı detay işlevleri
├── random-post.js        # Rastgele yazı butonu
├── linux.html            # Linux dağıtımları ve DistroAI
├── chat.html             # Sohbet odası arayüzü
├── chat.js               # Sohbet odası motoru (Firebase)
├── favicon.png           # Site simgesi
├── favicon1.png          # Alternatif simge
│
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Pages otomatik dağıtımı
│
├── LICENSE               # MIT lisansı
├── CNAME                 # Özel domain yapılandırması
├── README.md             # Türkçe belge
└── README_EN.md          # İngilizce belge
```

---

## Sık sorulan sorular

**Sunucu veya veritabanı gerekiyor mu?**
Hayır. Site tamamen statiktir; içerik `blogs.json` dosyasından okunur. Yalnızca isteğe bağlı sohbet odası için bir Firebase projesi gerekir.

**Barındırma ücretli mi?**
GitHub Pages ücretsizdir. Özel domain kullanmak istersen yalnızca alan adı ücreti ödersin.

**Kod bilgisi gerekir mi?**
Yazı eklemek için yalnızca JSON düzenleme bilgisi yeterli. Görünümü değiştirmek için temel CSS bilgisi işini görür.

**Yazılarımda görsel, tablo veya kod kullanabilir miyim?**
Evet. `content` alanı HTML kabul ettiği için HTML'de yapabildiğin her şeyi yapabilirsin.

**GitHub dışında bir yerde yayınlayabilir miyim?**
Evet. Netlify, Cloudflare Pages, Vercel veya kendi sunucun gibi herhangi bir statik barındırma işe yarar.

**Sonradan başka bir sisteme geçmek istersem?**
İçeriğin düz bir JSON dosyasında olduğu için dışa aktarmak ve dönüştürmek kolaydır.

---

## Lisans, katkı, iletişim

**Lisans:** Bu proje **MIT Lisansı** altında sunulmuştur. Dilediğin gibi kullanabilir, düzenleyebilir ve paylaşabilirsin.

**Katkıda bulunmak için**
1. Fork oluştur
2. Yeni bir dal aç (`feature/yeni-ozellik`)
3. Değişikliklerini commit et
4. Pull Request gönder

**İletişim:** `mail@mfgultekin.com` veya GitHub **Issues** sekmesi.

---

**Hazırlayan:** Mehmet Fatih GÜLTEKİN
**Sürüm:** 3.1.4
