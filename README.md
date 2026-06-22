# Creative Spark — Website README

A premium, single-HTML-page website for **Creative Spark Event Management**.  
Built with plain HTML, CSS, and JavaScript — no frameworks, no build step required.

---

## Project Structure

```
creative-spark/
├── index.html       ← All page content (sections, text, structure)
├── style.css        ← All styles (colours, layout, typography, animations)
├── script.js        ← All interactivity (scroll, carousel, counter, filter, form)
└── README.md        ← This file
```

---

## How to Run the Website

1. Open the `creative-spark/` folder in any code editor (VS Code recommended).
2. Open `index.html` in any modern browser — no server or npm install needed.
3. For live editing with auto-refresh, install the **Live Server** VS Code extension and click "Go Live".

---

## How to Update Content

### ✏️ Company Name / Tagline
**File:** `index.html`  
Search for `Creative Spark` and replace with your preferred name.  
The tagline `"Turning Ideas Into Unforgettable Experiences"` is inside the `<h1 class="hero-headline">` tag.

---

### 📞 Contact Details
**File:** `index.html`  
Look for the comments `<!-- UPDATE: ... -->` inside the `<section id="contact">`:

```html
<!-- UPDATE: Change phone number below -->
<a href="tel:+2348012345678">+234 801 234 5678</a>

<!-- UPDATE: Change email address below -->
<a href="mailto:hello@creativespark.ng">hello@creativespark.ng</a>

<!-- UPDATE: Change address below -->
<span>12 Victoria Island Boulevard,<br>Lagos, Nigeria</span>
```

---

### 🔗 Social Media Links
**File:** `index.html`  
Find the `<div class="social-icons">` block and replace the `href="#"` with your real URLs:

```html
<a href="https://instagram.com/YOUR_HANDLE" class="social-btn">...</a>
<a href="https://linkedin.com/company/YOUR_PAGE" class="social-btn">...</a>
<a href="https://facebook.com/YOUR_PAGE" class="social-btn">...</a>
<a href="https://twitter.com/YOUR_HANDLE" class="social-btn">...</a>
```

---

### 🖼️ How to Add Real Images

#### Hero Background
**File:** `style.css`  
Find `.hero-img-1` through `.hero-img-4` and replace the gradient with your images:

```css
.hero-img-1 {
  background-image: url('images/hero-1.jpg');
  background-size: cover;
  background-position: center;
}
```

Create an `images/` folder inside `creative-spark/` and place your photos there.

#### About Section Image
**File:** `style.css`  
Find `.about-img-main` and add:

```css
.about-img-main {
  background-image: url('images/about.jpg');
  background-size: cover;
  background-position: center;
}
```

#### Portfolio Cards
**File:** `style.css`  
Find `.pi-1` through `.pi-6` and replace each gradient:

```css
.pi-1 {
  background-image: url('images/portfolio-gala.jpg');
  background-size: cover;
  background-position: center;
}
```

#### Testimonial Avatars
**File:** `style.css`  
Find `.ta-1`, `.ta-2`, `.ta-3` and replace:

```css
.ta-1 {
  background-image: url('images/avatar-adaeze.jpg');
  background-size: cover;
}
```

---

### 📋 Services
**File:** `index.html`  
Each service is inside a `<div class="service-card">`. To edit:
- Change the `<h3>` tag for the service name.
- Change the `<p>` tag for the description.
- Change the Lucide icon name in `<i data-lucide="ICON_NAME">` — browse all icons at [lucide.dev](https://lucide.dev).

---

### 🖼️ Portfolio Cards
**File:** `index.html`  
Each card is `<div class="portfolio-card" data-category="CATEGORY">`.  
`data-category` must be one of: `corporate`, `wedding`, `launch`, `private`.  
Edit the `.po-title`, `.po-cat`, `.po-desc`, and `.po-tag` inside each card.

---

### 💬 Testimonials
**File:** `index.html`  
Each testimonial is a `<div class="testi-card">`. Edit the `<blockquote>`, author `<strong>`, and `<span>` inside each.  
To add a fourth testimonial: duplicate a `testi-card` div and add a matching `<span class="testi-dot"></span>` in the dots container.

---

### 📊 Stats Counter
**File:** `index.html`  
Find each `<span class="stat-num" data-target="320">`. Change `data-target` to your number:

```html
<span class="stat-num" data-target="500">0</span>
```

Also update the `<p class="stat-label">` text and the `<span class="stat-sym">` (`+` or `%`).

---

## How to Update Colours

**File:** `style.css` — Top of file, inside `:root { ... }`:

```css
:root {
  --gold:      #c9a84c;   /* Primary accent — gold */
  --gold-light:#e2c47a;   /* Hover states */
  --gold-dark: #a07830;   /* Deeper gold */
  --black:     #0a0a0a;   /* Dark backgrounds */
  --white:     #f8f5f0;   /* Off-white backgrounds */
}
```

Change any hex value and the whole site updates automatically.

---

## Contact Form Backend

The form currently simulates submission. To make it live:

### Option A — Formspree (free, no code)
1. Sign up at [formspree.io](https://formspree.io).
2. Create a form and copy your endpoint URL.
3. In `script.js`, replace the `setTimeout` mock with:
```js
const data = new FormData(form);
fetch('https://formspree.io/f/YOUR_ID', {
  method: 'POST',
  body: data,
  headers: { Accept: 'application/json' }
}).then(() => { /* show success */ });
```

### Option B — EmailJS (send to Gmail / Outlook directly)
Visit [emailjs.com](https://emailjs.com) for their free-tier SDK.

---

## Browser Support

Works in all modern browsers: Chrome, Firefox, Safari, Edge.  
IE 11 is not supported.

---

## Credits

- **Fonts:** [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) + [Montserrat](https://fonts.google.com/specimen/Montserrat) via Google Fonts
- **Icons:** [Lucide](https://lucide.dev) (MIT licence, loaded via CDN)
- **No other dependencies.**

---

*Last updated: 2026*
