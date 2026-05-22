# ARG Interior Design Studio — Website
### Complete Setup, Customisation & Deployment Guide

---

## 📁 FINAL FILE STRUCTURE

```
ARG-Interior/
│
├── index.html              ← Home page
├── portfolio.html          ← Portfolio with filter
├── process.html            ← Our Process + FAQ
├── contact.html            ← Contact + Enquiry Form
│
├── css/
│   ├── style.css           ← Global design system (tokens, nav, footer, components)
│   ├── index.css           ← Home page styles
│   ├── portfolio.css       ← Portfolio grid + filter styles
│   ├── process.css         ← Process timeline + FAQ styles
│   └── contact.css         ← Contact form + info styles
│
├── js/
│   ├── script.js           ← Global JS (cursor, nav, reveal, parallax, transitions)
│   ├── portfolio.js        ← Portfolio filter logic
│   ├── process.js          ← FAQ accordion + step animations
│   └── contact.js          ← Form validation + Formspree submission
│
└── images/
    ├── hero-01.jpg         ← Hero slider slide 1 (living room)
    ├── hero-02.jpg         ← Hero slider slide 2 (bedroom)
    ├── hero-03.jpg         ← Hero slider slide 3 (clinic/office)
    ├── about-studio.jpg    ← About section (studio or team photo)
    ├── proj-dental.jpg     ← Magarpatta Dental Clinic
    ├── proj-living.jpg     ← Lohegaon Residency
    ├── proj-bedroom.jpg    ← Kalyani Nagar Penthouse
    ├── proj-kitchen.jpg    ← Viman Nagar Kitchen
    ├── proj-office.jpg     ← Hinjewadi Office
    ├── proj-wardrobe.jpg   ← Kharadi Wardrobe
    ├── proj-villa.jpg      ← Baner Villa
    ├── proj-dining.jpg     ← Wakad Dining
    ├── proj-salon.jpg      ← Koregaon Park Salon
    ├── proj-study.jpg      ← Hadapsar Study
    ├── cta-space.jpg       ← Home page CTA section
    ├── services-bg.jpg     ← Services section background
    ├── portfolio-hero.jpg  ← Portfolio page hero
    ├── process-hero.jpg    ← Process page hero
    ├── process-consult.jpg ← Step 1 visual
    ├── process-design.jpg  ← Step 2 visual
    ├── process-approval.jpg← Step 3 visual
    ├── process-execution.jpg← Step 4 visual
    ├── process-handover.jpg← Step 5 visual
    ├── testi-bg.jpg        ← Testimonial parallax background
    └── cta-bg.jpg          ← Portfolio CTA background
```

**Image requirements:**
- Format: WebP preferred (fallback JPG)
- Hero images: minimum 1920×1080px
- Project images: minimum 1200×900px (4:3 ratio)
- Process step images: minimum 800×600px
- Compress all images with TinyPNG or Squoosh before uploading

---

## ⚡ STEP 1 — LOCAL SETUP

### Option A: VS Code + Live Server (Recommended)
1. Install [VS Code](https://code.visualstudio.com)
2. Install the **Live Server** extension by Ritwick Dey
3. Open the `ARG-Interior` folder in VS Code
4. Right-click `index.html` → **"Open with Live Server"**
5. Site opens at `http://127.0.0.1:5500`

### Option B: Any Local Server
```bash
# Python (if installed)
cd ARG-Interior
python -m http.server 5500

# Node.js (if installed)
npx serve .
```

---

## 🔧 STEP 2 — MANDATORY CUSTOMISATION

Search for `XXXXXXXXXX` across all HTML files and replace with the real phone number.

### 2a. WhatsApp Number
Replace every instance of `91XXXXXXXXXX` with the actual number:
```
91XXXXXXXXXX → 919876543210  (country code + number, no spaces)
```

Files to update:
- `index.html` (4 occurrences)
- `portfolio.html` (2 occurrences)
- `process.html` (2 occurrences)
- `contact.html` (3 occurrences)

### 2b. Phone Number
Replace `+91 XX XXXX XXXX` with the actual number in all footers.

### 2c. Email Address
Replace `hello@arginteriors.in` with the real email.

### 2d. Studio Address
Update in all 4 footer sections and `contact.html` details card.

### 2e. Google Maps Embed
In `contact.html`, find the `<iframe>` tag and replace the `src` with your actual Google Maps embed URL:
1. Go to [Google Maps](https://maps.google.com)
2. Search for the studio address
3. Click Share → Embed a map → Copy HTML
4. Paste the `src="..."` URL into the iframe

### 2f. Website URL
In `index.html` schema markup, update:
```json
"url": "https://www.arginteriors.in"
```

---

## 📬 STEP 3 — FORM SETUP (Formspree)

1. Go to [https://formspree.io](https://formspree.io) and create a free account
2. Click **"New Form"** → Name it "ARG Enquiry Form" → Copy the form ID
3. In `js/contact.js`, replace:
   ```
   YOUR_FORMSPREE_ID → abcdefgh  (your actual ID)
   ```
   The URL becomes: `https://formspree.io/f/abcdefgh`
4. In `js/script.js` (around line 140), also update the same placeholder
5. Test by submitting the form — you'll receive an email at the address linked to Formspree

**Free tier:** 50 submissions/month. Upgrade for more.

---

## 📊 STEP 4 — ANALYTICS SETUP

### Google Analytics 4
Add this in the `<head>` of all 4 HTML files (before `</head>`):
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```
Replace `G-XXXXXXXXXX` with your actual GA4 Measurement ID.

### Meta Pixel (for Facebook/Instagram retargeting)
Add in the `<head>` of all HTML files:
```html
<!-- Meta Pixel -->
<script>
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
  (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

---

## 🚀 STEP 5 — GITHUB DEPLOYMENT

### 5a. Create Repository
1. Go to [github.com](https://github.com) → Sign in
2. Click **"New repository"**
3. Name: `arg-interior-studio` (or any name)
4. Set to **Public**
5. Click **"Create repository"**

### 5b. Push Code
```bash
cd ARG-Interior

git init
git add .
git commit -m "Initial commit: ARG Interior Design Studio website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/arg-interior-studio.git
git push -u origin main
```

### 5c. Enable GitHub Pages
1. Go to repository → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** → Folder: **/ (root)**
4. Click **Save**
5. Wait ~2 minutes → site live at `https://YOUR_USERNAME.github.io/arg-interior-studio/`

---

## 🌐 STEP 6 — CUSTOM DOMAIN

### 6a. Buy Domain
Recommended registrars:
- [GoDaddy](https://godaddy.com) — `arginteriors.in` or `arginteriorstudio.com`
- [Namecheap](https://namecheap.com) — often cheaper

### 6b. Add DNS Records
In your domain registrar DNS settings, add these records:

| Type  | Name | Value                         |
|-------|------|-------------------------------|
| A     | @    | 185.199.108.153               |
| A     | @    | 185.199.109.153               |
| A     | @    | 185.199.110.153               |
| A     | @    | 185.199.111.153               |
| CNAME | www  | YOUR_USERNAME.github.io       |

### 6c. Connect to GitHub Pages
1. In repository → Settings → Pages → Custom domain
2. Enter `www.arginteriors.in`
3. Click Save
4. Create a file named `CNAME` (no extension) in root with content: `www.arginteriors.in`
5. Check **"Enforce HTTPS"** once it activates (may take 24–48hrs for DNS)

---

## 🔐 SECURITY CHECKLIST

- [x] No API keys or secrets in frontend code
- [x] Form honeypot anti-spam field included
- [x] Client-side validation + server-side (Formspree) validation
- [x] External links use `rel="noopener"` to prevent tab-jacking
- [x] No `innerHTML` usage — all DOM manipulation is safe
- [x] HTTPS enforced via GitHub Pages + custom domain
- [x] No user data stored client-side
- [x] XSS protection: no dynamic HTML injection from user input

---

## 🖼 IMAGE OPTIMISATION GUIDE

Before uploading any images:

1. **Compress:** Use [Squoosh](https://squoosh.app) — convert to WebP, quality 80–85%
2. **Hero images:** Target <200KB per image for fast load
3. **Project images:** Target <150KB per image
4. **Lazy loading:** Already implemented via `loading="lazy"` on all non-hero images

---

## 🎨 COLOUR CUSTOMISATION

All colours are CSS variables in `css/style.css`:

```css
:root {
  --alabaster:  #F9F8F6;   /* Main background */
  --cashmere:   #EFECE7;   /* Card/section backgrounds */
  --espresso:   #2C2A28;   /* Primary text & dark sections */
  --brass:      #B89947;   /* Accent: buttons, borders, highlights */
  --brass-light:#D4B96A;   /* Light accent for dark backgrounds */
}
```

To change the accent colour from brass to another tone, update `--brass` and `--brass-light`.

---

## 📱 WHATSAPP MESSAGE TEMPLATES

Customise the pre-filled WhatsApp messages by editing the `text=` parameter in URLs:

**Home CTA:**
```
Hi ARG Studio! I'd like to discuss my interior project.
```

**Portfolio page:**
```
Hi ARG Studio! I saw your portfolio and want to discuss my project.
```

**Process FAQ:**
```
Hi ARG Studio! I have a question about your process.
```

Encode spaces as `%20` in URLs.

---

## ✅ PRE-LAUNCH CHECKLIST

- [ ] All `XXXXXXXXXX` phone numbers replaced
- [ ] Real email address in footers
- [ ] Correct studio address in all footers
- [ ] Google Maps embed URL updated
- [ ] Formspree ID added to `contact.js` and `script.js`
- [ ] All project images uploaded to `images/` folder
- [ ] GA4 tracking code added to all pages
- [ ] Meta Pixel added (if running ads)
- [ ] Site tested on mobile (iPhone + Android)
- [ ] Site tested on Chrome, Safari, Firefox
- [ ] All links working (no broken anchors)
- [ ] Form tested end-to-end (submission + email received)
- [ ] Google Search Console property created and verified
- [ ] Schema markup tested at: https://search.google.com/test/rich-results

---

## 🆘 TROUBLESHOOTING

**Images not showing:**
→ Check file names match exactly (case-sensitive on Linux servers)
→ Ensure images are inside the `images/` folder
→ No spaces in filenames — use hyphens: `proj-dental.jpg`

**Form not submitting:**
→ Verify Formspree ID is correct
→ Check browser console for errors (F12)
→ Ensure you verified your email with Formspree

**GitHub Pages showing 404:**
→ Ensure `index.html` is in the root (not inside a subfolder)
→ Wait 2–3 minutes after enabling Pages
→ Hard refresh: Ctrl+Shift+R

**Custom domain not loading:**
→ DNS changes can take 24–48 hours to propagate
→ Verify DNS records with: https://dnschecker.org

---

*Built to agency-level standards — ARG Interior Design Studio, Pune.*
