# izel ozhan — portfolio

> A minimal, motion-rich personal portfolio built with React, TypeScript, and Framer Motion.

<p align="center">
  <a href="https://izelozhan.github.io">
    <img alt="Live site" src="https://img.shields.io/badge/live-izelozhan.github.io-0a0a0a?style=for-the-badge">
  </a>
  <img alt="License" src="https://img.shields.io/badge/license-GPL--3.0-blue?style=for-the-badge">
  <img alt="Made with React" src="https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript&logoColor=white">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-646cff?style=for-the-badge&logo=vite&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind%20CSS-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white">
</p>
---

## Overview

This is my personal portfolio — a single-page site that introduces who I am and showcases selected projects, skills, certifications, and education. The visuals lean on quiet typography (Syne + Raleway), a custom color palette, and subtle Framer Motion choreography to make scrolling feel alive without getting in the way.

**Live:** [izelozhan.github.io](https://izelozhan.github.io)

## Highlights

- Animated wavy gradient accent rendered on a `<canvas>` element
- Scroll-linked reveals, hover micro-interactions, and `AnimatePresence` route/section transitions
- Lightbox project gallery powered by Fancybox
- Fully content-driven — edit one JSON file to update the whole site
- Responsive, accessible, and deployed automatically from `main`

## Tech Stack

| Layer        | Tools                                                          |
| ------------ | -------------------------------------------------------------- |
| Framework    | React 18, TypeScript, Vite                                     |
| Styling      | Tailwind CSS (custom palette), Syne + Raleway via Google Fonts |
| Animation    | Framer Motion, Canvas 2D                                       |
| Media        | Fancybox (image lightbox)                                      |
| Tooling      | ESLint, PostCSS                                                |
| Deployment   | GitHub Actions → GitHub Pages                                  |

## Getting Started

Prerequisites: **Node.js 18+** and **npm**.

```bash
# 1. Clone
git clone https://github.com/izelozhan/izelozhan.github.io.git
cd izelozhan.github.io

# 2. Install
npm install

# 3. Run the dev server (http://localhost:5173)
npm run dev

# 4. Build for production
npm run build

# 5. Preview the production build locally
npm run preview
```

## Project Structure

```
.
├── public/                 # Static assets served as-is
├── src/
│   ├── components/         # React components (sections, UI, canvas)
│   ├── content.json        # All site content lives here
│   └── ...                 # styles, hooks, types, entry
├── .github/workflows/      # CI / deploy to GitHub Pages
├── index.html              # Vite entry HTML
├── tailwind.config.js      # Theme: colors, fonts, breakpoints
├── vite.config.ts
└── tsconfig*.json
```

## Customization

All copy and data — projects, skills, certifications, education, social links — lives in a single file:

```
src/content.json
```

Edit that file, save, and the site updates. No component changes required for typical content edits.

For theming (colors, fonts, spacing), see `tailwind.config.js`.

## Deployment

Every push to `main` triggers the workflow in `.github/workflows/` which builds the site with Vite and publishes the output to GitHub Pages. The live URL is [izelozhan.github.io](https://izelozhan.github.io).


## License

Released under the [GPL-3.0 license](LICENSE). Code is free to study, modify, and share under the same license — but please don't reuse the personal branding, copy, or photos as your own portfolio.

## Contact

- Portfolio: [izelozhan.github.io](https://izelozhan.github.io)
- GitHub: [@izelozhan](https://github.com/izelozhan)
