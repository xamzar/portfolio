# portfolio — [xmzr.dev](https://xmzr.dev)

Personal portfolio + blog for **Rauan Khamza** — CS @ CityU HK. React SPA with a
file-based, multi-language markdown content system and no router or CSS framework.

## Stack

| Layer | Tool |
|-------|------|
| Framework | **React 19** |
| Language | **TypeScript 6** |
| Build | **Vite 8** |
| Markdown | **react-markdown** + **remark-gfm** |
| Deploy | Vite dev server → **Cloudflare Tunnel** (`:8080`) |
| Styling | Modular CSS files, no framework |

## Quick start

Requires **Node 20+** and npm.

```bash
npm install
npm run dev        # dev server on http://localhost:8080
```

| Script | Does |
|--------|------|
| `npm run dev` | Vite dev server on `:8080` (host `0.0.0.0`, so reachable on the LAN / tunnel). |
| `npm run build` | Type-check (`tsc -b`) then produce a static build in `dist/`. |
| `npm run preview` | Serve the built `dist/` locally. |
| `npm run lint` | ESLint over the project. |
| `npx tsx tests/lib/frontmatter.test.ts` | Run the frontmatter parser smoke-test (no test framework — plain assertions via [tsx](https://github.com/privatenumber/tsx)). |

## Authoring content

All content is plain markdown with frontmatter — no CMS, no database. Files are
loaded at build time via `import.meta.glob`, so **adding a file is all it takes**;
no code or index to update.

### Blog post

Create `src/content/blog/<slug>.md`:

```markdown
---
title: "Post Title"
date: "2026-06-14"
tags: ["ai", "devops"]
excerpt: "One-line summary shown on cards and previews."
---

Markdown body. GFM tables and strikethrough are supported.
```

Posts sort newest-first by `date`. Tags drive the pill filters on `#/blog` and
the "related posts" section on project pages (a post is related to a project when
its tags include the project slug).

### Project

Create `src/content/projects/<slug>.md`:

```markdown
---
title: project-name
tech: Python · IPython · DeepSeek API
url: https://pypi.org/project/...
repo: https://github.com/xamzar/...
status: live
---

The markdown body IS the project description (rendered in full on the project page,
truncated on cards). No separate excerpt field.
```

`url`, `repo`, and `status` are optional. Projects sort alphabetically by slug.

### Translating a file

Add a language-suffixed sibling: `hello-world.md` (English), `hello-world.zh.md`,
`hello-world.ru.md`, `hello-world.kk.md`. `content.ts` groups files by slug and
resolves the best match per language: exact language → English → first available.

### Skills badges

Edit `src/content/skills.json` — a static array of `{ "name", "category" }`
objects rendered as tag badges on the home page.

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

Scroll-to-section anchors (`#about`, `#education`, etc.) are used on the Home page
for in-page navigation.

### Multi-language i18n system

UI strings live in `src/i18n/*.json`, auto-discovered via `import.meta.glob` —
dropping a new `.json` file adds the language with zero code changes.

- **Provider**: `LanguageProvider` wraps the app, reads `localStorage` persistence
  + browser language detection.
- **Fallback chain**: current language → English → raw key name.
- **Dot-path resolution**: `t('nav.about')` traverses the JSON tree.
- **LangSelector**: dropdown in the nav bar, writes to `localStorage('xmzr-lang')`.

Languages: **English** (en), **Chinese** (zh), **Russian** (ru), **Kazakh** (kk).

### Content system — markdown with frontmatter

Blog posts and projects are `.md` files under `src/content/`, loaded eagerly via
`import.meta.glob`. A minimal custom parser (`lib/frontmatter.ts`) extracts the
`---`-delimited metadata — no frontmatter dependency. `content.ts` handles the
per-file multi-language grouping and resolution described above.

### Layout of `src/`

| Path | Contents |
|------|----------|
| `main.tsx`, `App.tsx` | Entry point + hash router. |
| `pages/` | One component per route. |
| `sections/` | Home-page sections (e.g. `BlogPreview`). |
| `components/` | Nav, PostCard, ProjectCard, LangSelector, inline SVG `Icons`. |
| `lib/` | `frontmatter`, `content`, `posts`, `projects`, `filter` helpers. |
| `i18n/` | Language provider + per-language UI string JSON. |
| `content/` | `blog/*.md`, `projects/*.md`, `skills.json`. |
| `*.css` | `tokens`, `typography`, `layout`, `components` (see below). |

### Styling

Four modular CSS files, no framework:

| File | Purpose |
|------|---------|
| `tokens.css` | Design tokens: colors, fonts (JetBrains Mono), spacing, max-width. Wasp Obsidian palette (dark bg, amber accents). |
| `typography.css` | Font sizing, heading hierarchy, links, code blocks. |
| `layout.css` | Container, nav, footer, page sections, grid layouts. |
| `components.css` | PostCard, ProjectCard, tags, search input, contact links, credits. |

## Deployment

The site is served by `vite dev` on `:8080` and exposed to the internet through a
**Cloudflare Tunnel** (→ `:8080`); `xmzr.dev` / `www.xmzr.dev` are whitelisted in
`vite.config.ts` under `server.allowedHosts`. A static production build is also
available via `npm run build` (output in `dist/`) if you prefer serving it from a
CDN or static host.
