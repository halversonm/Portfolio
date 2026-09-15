# Halverson Web

Business site for Halverson Web — fast, custom, mobile-friendly websites for blue-collar businesses in the Twin Cities and beyond.

## Tech Stack

- **[Astro](https://astro.build)** — static site generation
- **Tailwind CSS** — styling
- **Netlify** — hosting and deployment
- **Netlify Forms** — contact form handling

## Getting Started

Install dependencies:

```bash
npm install
```

Run the local dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deployment

This site auto-deploys to Netlify on every push to `main`.

## Project Structure

```
src/
  components/     Reusable UI components
  data/           Site data (e.g. packages, process steps)
  layouts/        Page layout templates
  pages/          Site pages (routes)
  styles/         Global/shared styles
  site.config.ts  Site-wide config (name, links, etc.)
public/           Static assets (images, favicon, etc.)
```
