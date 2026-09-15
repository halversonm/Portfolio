# Northlight Studio — portfolio site

Marketing site for a web design business, built with [Astro](https://astro.build) and Tailwind CSS v4.

All copy, the business name, projects, and pricing are **placeholders**. Search the repo for `Northlight` and work through `src/site.config.ts` + `src/data/` to make it yours.

## Design

BuildWitt-inspired industrial look: near-black `#16181a`, warm off-white `#f4f3ee`,
forest-green accent `#2d5a3d`, Barlow / Barlow Semi Condensed type, uppercase
tracked labels, `▸` arrows, alternating dark/light section bands. All tokens are
in the `@theme` block of `src/styles/global.css` — change them there.

## Where things live

```text
src/
├── site.config.ts        # business name, contact info, nav — edit this first
├── data/
│   ├── projects.ts        # portfolio case studies (placeholder)
│   ├── services.ts        # service offerings + pricing packages (placeholder)
│   └── testimonials.ts    # client quotes (placeholder)
├── styles/global.css      # design tokens (colors, fonts) in the @theme block
├── layouts/Layout.astro   # <head>, meta/OG tags, header + footer
├── components/            # Header, Footer, ProjectCard, BrowserFrame, CtaBand
└── pages/
    ├── index.astro        # home
    ├── work/index.astro   # portfolio list
    ├── work/[slug].astro  # per-project case study (generated from data/projects.ts)
    ├── services.astro
    ├── about.astro
    ├── contact.astro
    └── 404.astro
```

## Commands

| Command                     | Action                                       |
| :-------------------------- | :------------------------------------------- |
| `npm install`               | Install dependencies                        |
| `npm run dev`               | Dev server at `localhost:4321`              |
| `astro dev --background`    | Dev server as a background process          |
| `astro dev stop` / `status` / `logs` | Manage the background dev server   |
| `npm run build`             | Build to `./dist/`                          |
| `npm run preview`           | Preview the production build locally         |

## Still to do before launch

- Replace placeholder content: real email/phone/domain in `site.config.ts`, real
  clients in `data/projects.ts`, real quotes in `data/testimonials.ts`, and the
  case-study body copy in `pages/work/[slug].astro`.
- Add real client screenshots: drop images in `public/work/`, then set
  `screenshot: "/work/name.png"` on each project in `data/projects.ts`. The
  `BrowserFrame` component shows a labelled placeholder until you do.
- Wire up the contact form: set `FORM_ENDPOINT` in `src/pages/contact.astro` to a
  Formspree / Web3Forms / Basin URL.
- Set the real domain in `astro.config.mjs` (`site`).
- Replace the Astro default favicon (`public/favicon.svg`).
- Consider `@astrojs/sitemap` for SEO.
