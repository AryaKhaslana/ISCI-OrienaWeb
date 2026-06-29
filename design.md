# Design System: [Nama Brand/Proyek]

## 1. Brand Identity & Vibe
* **Brand Name:** Oriena
* **Industry:** F&B
* **Design Concept/Vibe:** elegant klasik
* **Keywords:** Luxury, Warm, Appetizing,

---

## 2. Color Palette & Roles

### Primary Colors
Warna utama yang membangun identitas *Oriena*.
* **vanilla cream:** `#FDFBF7` — [Deskripsi peran: Background Utama. Warna krem hangat ini nggak bikin silau kayak putih murni. Ngasih feel adonan kue/tepung dan bikin mata rileks.]
* **Soft Biscuit:** `#EFE5D5` — [Deskripsi peran: Background Sekunder. Pakai buat card produk atau ngebedain section (contoh: dari Hero ke Testimonial) biar nggak monoton.]
* **Espresso Brown:** `#2A1610` — [Deskripsi peran: Hindari warna hitam pekat (pure black). Cokelat sangat gelap ini jauh lebih lembut untuk dibaca dan sangat cocok dengan vibe roti/kopi.]
* **Deep Crimson:** `#7A1712` — [Deskripsi peran: Aksen Merah Elegan. Ini warna merah utamanya. Karena gelap dan rich, rasanya mewah. Pakai hanya untuk tombol (Button CTA), badge promo, atau pita]
* **Champagne Gold:** `#C5A059` — [Deskripsi peran: Aksen Mewah (Gold). Pakai untuk ikon, border tipis, bintang rating, atau teks tebal (Heading) tertentu untuk menonjolkan kesan premiumnya.]


### Accent & Interactive Colors
Warna untuk menarik perhatian dan interaksi (tombol, link, badge).
* **Deep Crimson:** `#7A1712` — [Deskripsi peran: Primary Button ("Beli Sekarang"), Badge Diskon, Notifikasi Error]
* **Crimson Hover:** `#5E120E` — [Deskripsi peran: Hover state untuk Primary Button (menggelap saat di-hover kursor)]
* **Champagne Gold:** `#C5A059` — [Deskripsi peran: Ikon premium, Rating Bintang, Teks Link, Garis Border Secondary Button]
* **Gold Hover:** `#A88647` — [Deskripsi peran: Hover state untuk elemen Gold atau warna teks saat link sedang aktif/diklik]
* **Soft Biscuit:** `#EFE5D5` — [Deskripsi peran: Background untuk Secondary Button, Pill Kategori Menu (misal tab "Pastry", "Cake")]
* **Matcha Green:** `#4A5E42` — [Deskripsi peran: Success state (Notifikasi "Berhasil masuk keranjang" atau Badge "Stok Tersedia" — warnanya tetap earthy dan elegan)]

### Text & Neutrals
Warna untuk teks dan garis batas (border).
* **Dusty Rose:** `#A86360` — [Misal: Cokelat gelap untuk kontras yang nyaman]
* **Deep Crimson:** `#7A1712` — [Misal: Versi lebih soft dari heading text]
* **Burgundy Wine:** `#4A1513` — [Misal: Garis pemisah atau outline form]

---

## 3. Typography Rules

### Font Families
* **Primary Typeface (Headings):** `[Nama Font, misal: Playfair Display, serif]`
* **Secondary Typeface (Body):** `[Nama Font, misal: Plus Jakarta Sans, sans-serif]`

### Typographic Hierarchy

| Role | Font Size (Desktop / Mobile) | Font Weight | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Title (H1)** | `64px` / `42px` | `Bold / 700` | `1.1` | `-1px` |
| **Section Title (H2)**| `48px` / `32px` | `SemiBold / 600` | `1.2` |`Normal` |
| **Card Title (H3)** | `24px` / `20px` | `SemiBold / 600` | `1.3` | `Normal` |
| **Body Large** | `18px` / `16px` | `Regular / 400` | `1.6` | `Normal` |
| **Body Regular** | `16px` / `14px` | `Regular / 400` | `1.6` | `Normal` |
| **Button Label** | `16px` / `14px` | `Bold / 700` | `1.2` | `+0.5px`|
| **Caption/Micro** | `14px` / `12px` | `Medium / 500` | `1.4]` | `+0.5px` |

---

## 4. Component Stylings

### Buttons
* **Primary Button:** * Background: `#7A1712` (Deep Crimson)
  * Text Color: `#FDFBF7` (Vanilla Cream)
  * Border Radius: `8px` (Sudut sedikit membulat agar terkesan rapi dan klasik)
  * Padding: `12px 24px`
  * Hover State: Background berubah menjadi `#5E120E` (Crimson Hover), posisi naik ke atas (`transform: translateY(-2px)`), dan muncul efek bayangan halus (`box-shadow: 0px 4px 12px rgba(122, 23, 18, 0.2)`).

* **Secondary/Outline Button:** * Background: `Transparent`
  * Border: `1.5px solid #7A1712` (Deep Crimson - ketebalan 1.5px agar garis tegas tapi tidak kasar)
  * Text Color: `#7A1712` (Deep Crimson)
  * Border Radius: `8px` (Sama dengan Primary Button agar konsisten)
  * Padding: `12px 24px`
  * Hover State: Background terisi warna `#EFE5D5` (Soft Biscuit) yang tipis, teks dan border tetap, posisi naik ke atas (`transform: translateY(-2px)`).

### Cards & Containers
* **Default Content Card:**
  * Background: `#[#EFE5D5]`
  * color Border: `#7A1712`
  * Border Radius: `[16px]`
  * Drop Shadow: `[ 0px 4px 12px rgba(0,0,0,0.05)]`
  * Padding dalam: `[ 24px]`

---

## 5. Layout & Spacing Principles

### Spacing Scale (Rem/Px)
Skala spacing berbasis `1rem = 16px`. Desain premium membutuhkan banyak *whitespace* (ruang bernapas) agar web terlihat lega, bersih, dan eksklusif.
* `--space-xs`: `4px` (`0.25rem`) — Jarak sangat rapat (misal: jarak antar ikon dan teks mikro).
* `--space-sm`: `8px` (`0.5rem`) — Jarak rapat (misal: padding dalam dropdown, margin bawah label form).
* `--space-md`: `16px` (`1rem`) — **Base Spacing** (misal: jarak antar baris form, padding komponen kecil).
* `--space-lg`: `24px` (`1.5rem`) — Jarak sedang (misal: padding di dalam Card produk, margin antar elemen tulisan).
* `--space-xl`: `32px` (`2rem`) — Jarak longgar (misal: margin bawah heading besar, padding internal section).
* `--space-2xl`: `80px` (`5rem`) — **Section Gap** (Jarak antar section utama halaman sengaja dibuat lebar agar memberikan kesan mewah dan tidak menumpuk).

### Grid System
* **Desktop Grid:** 12 Columns · `32px` Gutter (jarak antar kolom dibuat lebar agar layout estetik) · `1200px` Maximum Width Container.
* **Tablet Grid:** 8 Columns · `24px` Gutter · `24px` Page Margin.
* **Mobile Grid:** 4 Columns · `16px` Gutter · `16px` Page Margin.

---

## 6. Imagery & Iconography

* **Photography Style:** * **Texture Focus:** Fokus tinggi pada detail tekstur produk (misal: remah kue yang garing, keju edam yang kecokelatan, kilauan selai nanas, atau serat lembut bagian dalam roti).
  * **Warm Lighting:** Menggunakan pencahayaan alami yang hangat (*warm tones / golden hour light*) untuk membangkitkan selera makan (*appetizing*) dan kesan baru matang dari oven.
  * **Minimalist Background:** Latar belakang foto wajib bersih dan netral (seperti permukaan marmer putih, kayu estetik, atau kain linen bertekstur). Hindari properti foto yang terlalu ramai agar produk tetap jadi bintang utama.

* **Icon Style:**
  * **Line Weight:** Menggunakan *line-icon* (ikon garis) yang tipis dan elegan dengan ketebalan garis konsisten `1.5px`.
  * **Soft Edges:** Sudut-sudut ikon wajib melingkar atau halus (*rounded/soft corners*), merepresentasikan kelembutan produk bakery dan kenyamanan.
  * **Color Role:** Warna utama ikon interaktif/premium menggunakan `#C5A059` (Champagne Gold), sedangkan ikon utilitas standar memakai `#2A1610` (Espresso Brown).

* **Image Treatment:**
  * **Border Radius:** Semua gambar produk dan banner menggunakan radius sudut `16px` agar visual terlihat *soft*, modern, dan tidak kaku.
  * **Drop Shadow:** Gambar dipadukan dengan bayangan super tipis (`box-shadow: 0px 8px 24px rgba(42, 22, 16, 0.04)`) agar terlihat menyatu secara natural di atas kanvas Vanilla Cream.
  * **Text Overlay:** Jika ada teks di atas gambar (seperti pada Hero Banner), wajib menggunakan overlay *linear gradient* transparan ke cokelat gelap (`linear-gradient(to bottom, rgba(42, 22, 16, 0) 40%, rgba(42, 22, 16, 0.75) 100%)`) agar kontras teks aman dan mata tidak sakit saat membaca.
  * **Hover Interaction:** Menerapkan efek *smooth subtle zoom* (`transform: scale(1.03)`) dengan transisi `0.5s cubic-bezier(0.25, 1, 0.5, 1)` saat gambar disorot kursor untuk memberikan impresi interaksi yang premium.

---

### ✅ Do (Lakukan)
* **Gunakan Vanilla Cream (`#FDFBF7`) sebagai kanvas utama:** Warna ini adalah kunci untuk membuat mata rileks dan memberikan kesan hangat ala *bakery*.
* **Berikan whitespace yang lega:** Patuhi aturan *spacing* yang sudah dibuat. Jarak antar *section* yang longgar (seperti `80px`) akan membuat desain terlihat mahal, eksklusif, dan tidak sumpek.
* **Pertahankan hierarki tipografi:** Selalu gunakan font Serif untuk *Heading/Judul* agar terkesan klasik-mewah, dan gunakan font Sans-Serif untuk *Body Text* agar deskripsi produk mudah dibaca.
* **Gunakan animasi hover yang *subtle* (halus):** Efek interaksi harus terasa mulus. Gunakan elevasi ringan (`translateY(-2px)`) untuk tombol dan *zoom* super lambat/halus (`scale(1.03)`) untuk gambar.
* **Gunakan bayangan (shadow) yang sangat tipis:** Untuk memunculkan efek kedalaman pada *Card* atau foto, gunakan *drop shadow* dengan opacity maksimal `4%` sampai `5%`.

### ❌ Don't (Hindari)
* **Jangan gunakan *pure black* (`#000000`) untuk teks:** Warna hitam pekat akan membuat kontras terlalu tajam dan mata cepat lelah. Selalu gunakan Espresso Brown (`#2A1610`) atau abu-abu arang.
* **Jangan gunakan Deep Crimson (`#7A1712`) sebagai *background* teks panjang:** Warna merah terlalu sensitif untuk mata jika dilihat dalam area yang luas. Batasi penggunaan merah hanya untuk elemen *Call to Action* (tombol) atau penekanan (*badge* diskon).
* **Jangan gunakan sudut yang tajam (0px radius):** Hindari sudut kotak bersiku tajam pada tombol, *card*, atau gambar. Desain F&B membutuhkan kelembutan, jadi selalu patuhi *border-radius* `8px` atau `16px`.
* **Jangan menumpuk terlalu banyak warna Gold:** Champagne Gold (`#C5A059`) adalah warna aksen. Jangan menggunakannya untuk *background* elemen yang