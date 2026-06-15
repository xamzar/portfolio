# xmzr.dev — Implementation Guide

Hash-routed SPA portfolio site. React 19 + Vite + TypeScript. No framework, no CSS-in-JS, no state management library.

## Architecture

```
                    ┌──────────────────┐
                    │    index.html     │
                    │  <div id="root">  │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │    main.tsx       │
                    │  CSS imports (4)  │
                    │  LanguageProvider │
                    │  <App />          │
                    └────────┬─────────┘
                             │
              ┌──────────────▼──────────────┐
              │         App.tsx              │
              │  hashchange → setRoute()    │
              │  route → page component     │
              │  skip-link → Nav → page     │
              │  footer (credits link)      │
              └──────┬──────────┬───────────┘
                     │          │
          ┌──────────▼──┐  ┌───▼──────────────┐
          │  components/ │  │     pages/        │
          │  Nav         │  │  Home             │
          │  LangSelector│  │  Blog / BlogPost   │
          │  PostCard    │  │  Projects / Project│
          │  ProjectCard │  │  Credits           │
          │  Icons       │  └───────────────────┘
          └──────────────┘
                     │
          ┌──────────▼──────────┐
          │       lib/           │
          │  frontmatter.ts      │  ← YAML parser + typed accessors
          │  content.ts          │  ← glob → slug grouping → lang resolve
          │  posts.ts            │  ← allPosts, getPost, allTags
          │  projects.ts         │  ← allProjects, getProject
          │  filter.ts           │  ← generic search + tag filter
          └─────────────────────┘
                     │
          ┌──────────▼──────────┐
          │     content/         │
          │  blog/*.md           │  ← slug.xx.md naming convention
          │  projects/*.md       │
          │  skills.json         │
          └─────────────────────┘
                     │
          ┌──────────▼──────────┐
          │       i18n/          │
          │  index.ts            │  ← glob → translations + languages
          │  language-context.ts │  ← context + type (shared)
          │  context.tsx         │  ← LanguageProvider (component only)
          │  useLanguage.ts      │  ← useLanguage() hook
          │  {en,kk,ru,zh}.json  │  ← $meta + keyed strings
          └─────────────────────┘
```

## File map

```
portfolio/
├── index.html              ← <div id="root">, favicon link, meta tags
├── vite.config.ts           ← React plugin, no special config
├── tsconfig.json            ← references tsconfig.app.json + tsconfig.node.json
├── tsconfig.app.json        ← strict: noUnusedLocals, noUnusedParameters
├── package.json             ← react, react-dom, react-markdown, remark-gfm
├── tests/
│   └── lib/
│       └── frontmatter.test.ts  ← 11 parser smoke tests (npx tsx …)
└── src/
    ├── main.tsx             ← CSS import order: tokens → layout → typography → components
    ├── App.tsx              ← hash router, page dispatch, skip-link, footer
    ├── tokens.css           ← @font-face, :root custom properties
    ├── layout.css           ← reset, .container, nav, footer, .skip-link, responsive
    ├── typography.css       ← body, a, .section-title, .blog-content (markdown)
    ├── components.css       ← hero, skills, projects, education, tags, search, cards, credits, lang-selector
    ├── components/
    │   ├── Nav.tsx          ← sticky nav: logo (href="#/"), tumbler links, LangSelector
    │   ├── LangSelector.tsx ← [EN ▾] button → custom dropdown, click-outside close
    │   ├── PostCard.tsx     ← blog preview card (title, date, tags, excerpt)
    │   ├── ProjectCard.tsx  ← project preview card (title, repo icon, tech, desc)
    │   └── Icons.tsx        ← GitHub, ExternalLink, LinkedIn, Instagram, Telegram, Email SVGs
    ├── pages/
    │   ├── Home.tsx          ← hero, about (skills grid), education, projects (3), BlogPreview, contact
    │   ├── Blog.tsx          ← search input + tag pills → filterItems() → PostCard list
    │   ├── BlogPost.tsx      ← back link, title, date+tags, react-markdown body
    │   ├── Projects.tsx      ← search input → filterItems() → ProjectCard list
    │   ├── Project.tsx       ← back link, title, tech+status, links, markdown, related posts
    │   └── Credits.tsx       ← inspiration attribution, build info
    ├── sections/
    │   └── BlogPreview.tsx   ← Home's blog section: 3 most recent PostCards + "View all →"
    ├── lib/
    │   ├── frontmatter.ts   ← parseFrontmatter(), getString(), getStrings()
    │   ├── content.ts       ← groupBySlug(), resolveEntry(), parseFilename()
    │   ├── posts.ts         ← import.meta.glob → postsBySlug → allPosts, getPost, allTags
    │   ├── projects.ts      ← import.meta.glob → projectsBySlug → allProjects, getProject
    │   └── filter.ts        ← filterItems<T>(items, search, keys, tag?, tagKey?)
    ├── content/
    │   ├── blog/*.md         ← hello-world.md, hello-world.kk.md, etc.
    │   ├── projects/*.md     ← portfolio.md, portfolio.kk.md, etc.
    │   └── skills.json       ← [{name, category}, …]
    └── i18n/
        ├── index.ts          ← import.meta.glob('./*.json') → translations, languages, resolvePath, resolveString
        ├── language-context.ts ← LanguageContextValue type + LanguageContext (shared by provider + hook)
        ├── context.tsx        ← LanguageProvider (component-only, no hook export)
        ├── useLanguage.ts     ← useLanguage() hook (separate file for react-refresh compliance)
        └── {en,kk,ru,zh}.json ← $meta.name, $meta.nativeName + UI string keys
```

## How routing works

`App.tsx` listens to `hashchange`. Routes are dispatched by an if/else chain:

```
#/                  → <Home />
#/blog              → <Blog />
#/blog/hello-world  → <BlogPost slug="hello-world" />
#/projects          → <Projects />
#/projects/portfolio → <Project slug="portfolio" />
#/credits           → <Credits />
anything else       → <Home /> (fallback)
```

Scroll-to-top happens inside the `hashchange` handler: `requestAnimationFrame(() => window.scrollTo(0, 0))`.

All internal links use native `<a href="#/path">` — the browser fires `hashchange` natively. No `onClick + e.preventDefault() + window.location.hash = …` anywhere. This avoids a React 19 capture-phase event delegation bug where hash assignment could silently fail.

The exception is nav tumbler links (`#about`, `#blog`, etc.) — those scroll within the home page and don't trigger a route change. They're handled by `scroll-behavior: smooth` on `<html>` and `scroll-margin-top` on `<section>`.

## How i18n works

1. Any `.json` file in `src/i18n/` is auto-discovered by `import.meta.glob` in `index.ts`.
2. Each file must have a `$meta` key: `{ "name": "English", "nativeName": "EN" }`.
3. Language selection persists to `localStorage` (`xmzr-lang` key).
4. On first visit, browser language is detected (e.g. `kk-KZ` → `kk`). Falls back to `en`.
5. `t('dot.path.key')` resolves through: current language → English → raw key string.
6. `useLanguage()` returns `{ t, language, setLanguage, languages }`.

**Adding a language:** copy `en.json` → `xx.json`, translate values. That's it — no code changes.

## How content works (blog + projects)

Both follow the same pipeline:

```
.md files in src/content/{blog,projects}/
  │
  ▼ import.meta.glob('./*.md', { query: '?raw' })
  │
  ▼ content.ts: groupBySlug() — parses filename → slug + lang
  │
  ▼ posts.ts / projects.ts: resolveEntry() — lang → en → first available
  │
  ▼ parseFrontmatter() → getString() / getStrings()
  │
  ▼ PostMeta / ProjectMeta typed objects
```

**File naming convention:**
- `hello-world.md` → slug=`hello-world`, lang=`en`
- `hello-world.kk.md` → slug=`hello-world`, lang=`kk`

**Frontmatter format:**
```yaml
---
title: "Post Title"
date: "2026-06-13"
tags: ["meta", "portfolio"]
excerpt: "Short preview."
---
Markdown body here.
```

Projects add: `tech`, `url`, `repo`, `status` (all optional except `title` and `tech`).

**Language fallback for content:** if a user reading in Kazakh visits a blog post that has no `.kk.md` variant, they get the English version. Content language is independent of UI language — the i18n system handles UI strings, the content loader handles markdown.

## CSS architecture

Four files, imported in order:

| File | Layer | Contents |
|------|-------|----------|
| `tokens.css` | Design tokens | `@import` JetBrains Mono, `:root` custom properties |
| `layout.css` | Structure | Reset, `.container`, nav, footer, `.skip-link`, responsive breakpoints |
| `typography.css` | Text | Body, links, `.section-title`, `.blog-content` (markdown rendering) |
| `components.css` | Components | Hero, skills, projects, education, tags, search, cards, credits, lang-selector |

**Key CSS variables:**
| Variable | Value | Use |
|----------|-------|-----|
| `--bg-primary` | `#1a1a1a` | Page background |
| `--bg-secondary` | `#2a2a2a` | Card/code backgrounds |
| `--text-primary` | `#f0ece4` | Headings, body text |
| `--text-secondary` | `#a09888` | Subtle text, dates |
| `--accent-primary` | `#d4a017` | Gold — links, highlights |
| `--accent-secondary` | `#cc5500` | Orange — hover states, "view all" links |
| `--separator` | Gold→transparent gradient | Section `<hr>` dividers |
| `--font-mono` | JetBrains Mono | Everything |
| `--max-width` | `720px` | Content width |

**Link color rule:** Global `a` is gold (`--accent-primary`). Components that render content links override to a neutral color that turns gold on hover (the "neutral→gold pattern"). This is done per-component in CSS, not via a utility class.

## How to add…

### A new page
1. Create `src/pages/NewPage.tsx`
2. Import in `App.tsx`, add route clause
3. Optionally add a nav link in `Nav.tsx` or footer link in `App.tsx`

### A new blog post
Drop `slug.md` in `src/content/blog/` with frontmatter + body. No code changes.

### A new project
Drop `slug.md` in `src/content/projects/` with frontmatter (`title`, `tech` required; `url`, `repo`, `status` optional) + body. No code changes.

### A new language variant for a post/project
Copy `slug.md` → `slug.xx.md`, translate the content. Same slug = same URL, swapped by language.

### A new UI language
Copy `src/i18n/en.json` → `xx.json`, add `$meta`, translate all values. No code changes.

### A new section on the home page
Small sections (< 20 lines JSX) go inline in `Home.tsx`. Sections with their own data imports or state logic go in `src/sections/Name.tsx`.

### A new shared component
Create in `src/components/`. If it has CSS, add to `components.css` under a new comment header.

## Design constraints

- **Terminal aesthetic:** JetBrains Mono everywhere, 14px body, `// section titles`, bracket-wrapped language names, amber/gold accents
- **Content-first:** Markdown drives blog and project pages. No WYSIWYG, no CMS
- **Zero dependencies beyond React + Vite:** react-markdown + remark-gfm for GFM rendering. No router library, no i18n library, no CSS framework
- **Multi-language by convention:** Filename suffixes for content, JSON files for UI strings. Everything auto-discovered at build time
- **No runtime overhead:** `import.meta.glob` resolves at build time. Content is inlined in the JS bundle as raw strings
