# Debopriyo — Portfolio

Personal portfolio of **Debopriyo ([@Dragon4926](https://github.com/Dragon4926))** — full-stack developer & AI engineer.

An editorial, motion-driven single page built with **Next.js 15**, **Tailwind CSS v4**, **Framer Motion** and **Lenis** smooth scrolling.

## Highlights

- **Preloader** — counter + word cycle, then a curved curtain lifts into the hero (shown once per session)
- **Hero** — full-bleed name with per-letter mask reveal, pointer-tracking ambient light, scroll-linked parallax
- **Velocity marquee** — speeds up, reverses and skews with scroll velocity
- **About** — copy that lights up word-by-word as you scroll, with animated counters
- **Selected work** — pinned horizontal rail of GitHub projects with generative cover art (vertical stack on mobile)
- **Services** — expanding rows with staggered tech tags
- **Process** — sticky stacking cards that scale back as the next one arrives
- **Playground** — an interactive terminal (`help`, `whoami`, `skills`, `projects`, `social`, `contact`, …) with history and tab-completion
- **Contact** — magnetic CTA, copy-to-clipboard email, viewer's local time
- Custom blend-mode cursor with contextual labels, magnetic buttons, film grain
- Respects `prefers-reduced-motion`; generated OG image, icon and sitemap

## Getting started

```sh
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

### Environment

| Variable | Purpose |
| --- | --- |
| `GITHUB_TOKEN` | Optional. Enables fetching **pinned** repositories via the GraphQL API. Without it the site falls back to the most-starred public repos. |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used for metadata and the sitemap. |

Project data is fetched on the server and revalidated hourly (ISR). It is also exposed at `/api/pinned-repos`.

## Structure

```
src/
  app/                 layout, page, OG image, icon, sitemap, API route
  components/
    sections/          Hero, About, Work, Services, Process, Playground, Contact
    ui/                Magnetic, Reveal (SplitReveal / FadeUp / Rule), VelocityMarquee
    providers/         Lenis + MotionConfig + intro state
    Nav, Cursor, Preloader
  lib/                 content (data.ts), GitHub fetching, utils
```

Edit copy, services and process steps in `src/lib/data.ts`.
