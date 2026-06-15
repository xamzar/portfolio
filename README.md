# portfolio — [xmzr.dev](https://xmzr.dev)

Personal portfolio for **Rauan Khamza** — CS @ CityU HK.

## Stack

| Layer | Tool |
|-------|------|
| Framework | **React 19** |
| Language | **TypeScript 6** |
| Build | **Vite 8** |
| Markdown | **react-markdown** + **remark-gfm** |
| Deploy | Vite dev server → **Cloudflare Tunnel** (`:8080`) |
| Styling | Modular CSS files, no framework |

## Architecture

### Routing — hash-based SPA

Uses `window.location.hash` + a `hashchange` listener. No router library. Routes:

| Hash | Page |
|------|------|
| `#/` | Home (hero, about, education, projects preview, blog preview, contact) |
| `#/blog` | Blog listing (search + tag filter) |
| `#/blog/:slug` | Single blog post (markdown rendered) |
| `#/projects` | Project listing (search filter) |
| `#/projects/:slug` | Single project (markdown + related posts) |
| `#/credits` | Credits / acknowledgements |

Scroll-to-section anchors (`#about`, `#education`, etc.) are used on the Home page for in-page navigation.

### Multi-language i18n system

Languages auto-discovered via `import.meta.glob('./*.json')` — adding a new `.json` file to `src/i18n/` adds the language with zero code changes.

- **Provider**: `LanguageProvider` wraps the app, reads `localStorage` persistence + browser language detection.
- **Fallback chain**: current language → English → raw key name.
- **Dot-path resolution**: `t('nav.about')` traverses the JSON tree.
- **LangSelector**: dropdown in the nav bar, writes to `localStorage('xmzr-lang')`.

Languages: **English** (en), **Chinese** (zh), **Russian** (ru), **Kazakh** (kk).

### Content system — markdown with frontmatter

Blog posts and projects live as `.md` files in `src/content/blog/` and `src/content/projects/`. All loaded eagerly via `import.meta.glob`.

**Multi-language per-file**: `hello-world.md` (en), `hello-world.zh.md`, `hello-world.kk.md`, etc. A shared `content.ts` module groups files by slug, then resolves the best match: exact language → English → first available.

**Frontmatter parser** — minimal custom YAML-like parser (`lib/frontmatter.ts`) that extracts `---` delimited metadata (title, date, tags, tech, url, repo, status). No heavy frontmatter library needed.

**Skills data** — `src/content/skills.json` is a static JSON array rendered as tag badges on the home page.

### Pages

| Page | What it does |
|------|-------------|
| **Home** | Hero (name, tagline, bio), About (text + skills tags), Education (CityU + NU), Projects preview (latest 3), Blog preview (latest 3), Contact (social icons) |
| **Blog** | Full listing with text search + tag pill filters. Shared `filterItems()` utility handles text + tag matching generically. |
| **BlogPost** | Renders markdown via react-markdown with GFM tables/strikethrough. Displays date + tag chips. 404 state. |
| **Projects** | Full listing with text search across title/tech/desc. Empty states for "no projects yet" vs "no matches". |
| **Project** | Full markdown content, external links + repo link with icon. Related posts section: auto-filters blog posts whose tags match the project slug. |
| **Credits** | Static page for theme attributions and tech acknowledgements. |

### Components

- **Nav** — fixed top bar with logo SVG, nav link list, and LangSelector.
- **PostCard** — title (linked), date + clickable tag pills, excerpt. `onTagClick` prop wires tag filtering from the blog listing.
- **ProjectCard** — title + repo icon link, tech badge, description.
- **LangSelector** — dropdown populated from auto-discovered languages.
- **Icons** — inline SVG components (GitHub, LinkedIn, Instagram, Telegram, Email, ExternalLink). No icon library dependency.

### Styling

Four modular CSS files, no framework:

| File | Purpose |
|------|---------|
| `tokens.css` | Design tokens: colors, fonts (JetBrains Mono), spacing, max-width. Wasp Obsidian theme palette (dark bg, amber accents). |
| `typography.css` | Font sizing, heading hierarchy, links, code blocks. |
| `layout.css` | Container, nav, footer, page sections, grid layouts. |
| `components.css` | PostCard, ProjectCard, tags, search input, contact links, credits. |

## Deployment

Served by `vite dev` on `:8080`, exposed to the internet via a **Cloudflare Tunnel** (tunnel ID: `40e8345e` → `:8080`). No build step needed for dev; static build available for production.

## Development

```bash
npm run dev      # starts on :8080
npm run build    # tsc + vite build for production
npm run preview  # preview production build
```
