# Halverson Web

Business site for Halverson Web — fast, custom, mobile-friendly websites for small businesses.

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
  components/     Reusable UI (PageHero, StepTimeline, ProjectCard, ...)
  data/           Site content: projects, services & pricing, foundation items
  layouts/        Page layout template (head, header/footer, page transitions)
  pages/          Site pages (routes)
  scripts/        effects.ts — all motion/interaction (reveals, tilt, hover previews)
  styles/         global.css — design tokens, button styles, effect styles
  site.config.ts  Site-wide config (name, links, etc.)
public/           Static assets; public/work holds project screenshots
```
