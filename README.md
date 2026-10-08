# Debopriyo — Portfolio

Personal portfolio of **Debopriyo ([@Dragon4926](https://github.com/Dragon4926))**, data scientist — designed as an interactive research paper.

Built with **Next.js 15**, **Tailwind CSS v4**, **Framer Motion** and **Lenis**. Set in Newsreader and IBM Plex Mono.

## Sections

- **Fig. 1 (hero)** — ~2,000 particles start as Gaussian noise and are fitted to the glyphs of the name by gradient descent (learning-rate warm-up, annealed noise). The cursor perturbs the data; a live log-loss curve and epoch counter track the fit.
- **§1 Abstract** — drop-cap abstract with numbered sidenotes, keywords and a summary table
- **§2 Experiments** — *Table 1*: GitHub projects as a sortable results table; rows re-order with layout animation, stars as inline bars
- **§3 Method** — *Fig. 2*: the working pipeline as a directed graph with flowing edges and a retraining loop
- **§4 Toolkit** — *Fig. 3*: heatmap of tools × pipeline stage with row/column tracing
- **§5 Notebook** — a Jupyter-style cell: try `me.summary()`, `me.skills`, `me.projects.head()`, `import this`, arithmetic, `help()`
- **§6 Correspondence** — email, a copyable BibTeX "cite this work" block and references

Masthead with scroll-spy and a reading-progress rule; respects `prefers-reduced-motion`; generated OG image, icon and sitemap.

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

Project data is fetched on the server and revalidated daily (ISR). It is also exposed at `/api/pinned-repos`.

## Structure

```
src/
  app/                 layout, page, OG image, icon, sitemap, API route
  components/
    figures/           FitFigure (particle fitting canvas)
    paper/             Section, Hero, Abstract, Experiments, Method, Toolkit, Notebook, Correspondence
    ui/                Reveal (SplitReveal / Rule)
    providers/         Lenis + MotionConfig
    Nav
  lib/                 content (data.ts), GitHub fetching, utils
```

Edit the abstract, keywords, pipeline steps and toolkit matrix in `src/lib/data.ts`.
