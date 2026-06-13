# Portfolio + Blog — Plan

**Domain:** xmzr.dev (Cloudflare)
**Host:** This VM (Caddy reverse proxy)
**Started:** Jun 13, 2026

---

## Tech Stack

| Layer | Choice | Status |
|---|---|---|
| Framework | React + Vite + TypeScript | 🔲 |
| Blog parsing | gray-matter + react-markdown + remark-gfm | 🔲 |
| HTTP server | Caddy (auto HTTPS) | 🔲 |
| DNS | Cloudflare (proxy mode) | 🔲 |

---

## Phase 1 — Scaffold

- [ ] `npm create vite@latest` with React + TS template
- [ ] Install deps: react-markdown, remark-gfm, gray-matter
- [ ] Clean out default Vite boilerplate
- [ ] Verify `npm run dev` works

## Phase 2 — Content & Data Model

- [ ] Create `src/content/blog/` directory
- [ ] Write first blog post as `.md` with YAML frontmatter (title, date, tags)
- [ ] Write `src/content/skills.json` (list of skills/tech stack for the portfolio)
- [ ] Write `src/content/projects.json` (project entries)

## Phase 3 — Blog Engine

- [ ] Create blog index page that reads all `.md` files via `import.meta.glob`
- [ ] Parse frontmatter for listing (title, date, excerpt, tags)
- [ ] Sort posts by date descending
- [ ] Create individual post page with rendered markdown
- [ ] Create `/blog` route and `/blog/:slug` route
- [ ] Auto-generated blog index from markdown files — no manual listing

## Phase 4 — Portfolio Pages

- [ ] **Hero** — name, tagline, blurb, social links
- [ ] **About** — bio, skills grid (from skills.json)
- [ ] **Projects** — project cards with links (from projects.json)
- [ ] **Contact** — contact form or links
- [ ] Navigation between sections + blog

## Theme — "Wasp" Aesthetic

**Vibe:** Warm, scholarly, high-contrast.

| Token | Value |
|---|---|
| `--bg-primary` | `#1a1a1a` (deep charcoal) |
| `--bg-secondary` | `#2a2a2a` (lighter charcoal) |
| `--text-primary` | `#f0ece4` (warm off-white) |
| `--text-secondary` | `#a09888` (muted warm gray) |
| `--accent-primary` | `#d4a017` (warm amber) |
| `--accent-secondary` | `#cc5500` (burnt orange) |
| `--separator` | gradient fade (#d4a017 → transparent) |
| Font | Monospace first (JetBrains Mono / Fira Code / system monospace) |

**Rules:**
- Monospace-first typography throughout
- Horizontal separators use gradient fades
- All interactive states (hover, active, selected) use accent colors
- High contrast between text and background (WCAG AA+)
- Scholarly feel — clean, minimal, intentional whitespace

## Phase 5 — Styling & Polish

- [x] Define theme tokens (Wasp aesthetic spec'd above)
- [ ] Implement CSS custom properties in global stylesheet
- [ ] Responsive layout (mobile-first)
- [ ] Monospace typography setup
- [ ] Gradient separator component
- [ ] Hover/active states on all interactive elements
- [ ] Blog post styling (code blocks, tables, etc.)

## Phase 6 — Server & Domain

- [ ] Install Caddy
- [ ] Configure Caddyfile to reverse proxy to Vite build or serve static
- [ ] Build React app (`npm run build`)
- [ ] Point xmzr.dev A record to VM IP
- [ ] Verify HTTPS + live site

## Phase 7 — Deploy Pipeline

- [ ] Write a simple deploy script (`deploy.sh`): git pull → npm run build → reload
- [ ] Show how to add a blog post: just drop a `.md` file in `src/content/blog/`

---

## How to add a blog post

Create a file like `src/content/blog/my-post.md`:

```markdown
---
title: "My First Post"
date: "2026-06-13"
tags: ["react", "portfolio"]
---

Content here in markdown...
```

Rebuild: `npm run build && sudo systemctl reload caddy`

---

## Q: I want TypeScript over JS

Yes. Vite's React + TS template gives you `.ts` and `.tsx` out of the box. Every component and utility is typed. You heard right — LLMs handle TS better because the types constrain the output and prevent hallucinated API usage.
