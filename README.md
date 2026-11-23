# Kelvin Maro U. — AI Product Engineer Portfolio

Personal portfolio website for **Kelvin Maro U.**, an **AI Product Engineer**, IT Manager at Marcelle Ruth Cancer Centre & Specialist Hospital (MRCC), and Founder / Lead Consultant at **RUVIN IT Consulting**.

Built with **React 18 (Vite)**, **Tailwind CSS**, **Framer Motion**, and **Lucide Icons** in plain JavaScript.

---

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Local Development Server

```bash
npm run dev
```

Open the local URL printed in your terminal (typically `http://localhost:5173`) to preview the portfolio with hot-reload.

### 3. Build for Production

```bash
npm run build
```

This outputs a static, production-optimized bundle into the `dist/` directory. You can test the production build locally with:

```bash
npm run preview
```

---

## Deploying to Netlify

This project includes a pre-configured `netlify.toml` and is ready for immediate deployment:

1. Push this repository to GitHub/GitLab, or drag-and-drop the `dist/` folder into Netlify Drop.
2. When connecting via Git on Netlify, use these settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

---

## Project Architecture

```text
portfolio/
├── public/
│   ├── favicon.svg                  # Custom "KM." monogram favicon
│   └── images/
│       ├── kelvin-portrait.jpeg     # Outdoor executive portrait (Kelvin.jpeg)
│       └── kelvin-passport.png      # Studio close-up portrait (Kelvin Passport.png)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx               # Sticky shrinking glass navbar + scroll progress bar
│   │   ├── ThemeToggle.jsx          # In-memory React state dark/light toggle (no localStorage)
│   │   ├── CursorGlow.jsx           # Desktop cursor-tracking ambient spotlight
│   │   ├── SectionHeading.jsx       # Reusable animated section header
│   │   ├── Hero.jsx                 # Aurora mesh, typewriter roles, magnetic CTAs, tech orbit
│   │   ├── About.jsx                # Bio, dual-photo switcher + spinning ring, 5 animated stat counters
│   │   ├── Skills.jsx               # 5 grouped skill cards with floating/hover-spinning chips
│   │   ├── ProjectCard.jsx          # 3D perspective mouse-tilt project card with cursor glow
│   │   ├── Projects.jsx             # Featured projects grid (9 projects + "More coming soon")
│   │   ├── Timeline.jsx             # Animated vertical experience & education timeline
│   │   ├── Services.jsx             # 3+2 desktop grid for RUVIN IT Consulting (AI specialty cards highlighted)
│   │   ├── ContactForm.jsx          # Mailto fallback + Formspree/EmailJS placeholder + direct contact actions
│   │   └── Footer.jsx               # Tagline, quick links, socials, dynamic copyright year
│   ├── data/
│   │   ├── socials.js               # Bio, stats, contact info, social links
│   │   ├── skills.js                # 5 grouped skill categories
│   │   ├── projects.js              # 9 featured projects + placeholder card
│   │   ├── experience.js            # 6 timeline entries
│   │   └── services.js              # 5 RUVIN IT Consulting services
│   └── hooks/
│       ├── useScrollProgress.js     # Scroll percentage & active section detector
│       └── useTilt.js               # 3D tilt & cursor-glow coordinates hook
```

---

## Personalization Checklist

- [ ] **Photos (`public/images/`)**: Both `Kelvin.jpeg` (`public/images/kelvin-portrait.jpeg`) and `Kelvin Passport.png` (`public/images/kelvin-passport.png`) are already wired into the **Hero** and **About** sections (including an interactive "Swap View" switcher in About). Replace either file in `public/images/` anytime if you want to update your photos.
- [ ] **ANIVE.CO Description & URL (`src/data/projects.js`)**: Open `src/data/projects.js`, locate the `anive-co` entry, update `description` and `liveUrl`, and set `isEditableDescription: false` once finalized.
- [ ] **Live Project & Case Study Links (`src/data/projects.js`)**: `Joshuaabraham.org` is already linked to `https://joshuaabraham.org`. Replace the `#` placeholder values for `liveUrl` and `caseStudyUrl` on the remaining projects as you publish their demos or write-ups.
- [ ] **Formspree / EmailJS Endpoint (`src/components/ContactForm.jsx`)**: The form works immediately via a pre-filled `mailto:` fallback to `kelvinumuowhero@gmail.com`. To enable silent background submissions, uncomment the `fetch('https://formspree.io/f/YOUR_FORM_ID')` block inside `handleSubmit` in `src/components/ContactForm.jsx`.
- [ ] **Resume PDF (Optional)**: If you'd like to offer a downloadable CV, place `Kelvin-Maro-Resume.pdf` inside `public/` and link to `/Kelvin-Maro-Resume.pdf` in `Hero.jsx` or `About.jsx`.
