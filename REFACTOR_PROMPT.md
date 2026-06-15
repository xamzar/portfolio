# Refactor Prompt for xmzr.dev

You are reviewing a small Vite + React + TypeScript portfolio site. Read the entire repository before changing anything, then propose and implement a refactor that improves maintainability without breaking behavior.

## Repository Context

- App entry is a hash-routed single-page app in `src/App.tsx`.
- Navigation, language selection, and page shells live in `src/components/` and `src/pages/`.
- Blog posts and project pages are markdown-driven content loaded with `import.meta.glob` from `src/content/` and parsed in `src/lib/`.
- Internationalization is file-based: language JSON files are auto-discovered in `src/i18n/`.
- Styling is plain CSS split across `src/tokens.css`, `src/layout.css`, `src/typography.css`, and `src/components.css`.
- The site is intentionally minimal and content-focused, so refactors should preserve the overall tone and visual language.

## What To Look For

### Architecture and data flow

- How the router works and whether hash navigation, scroll-to-top behavior, and fallback routes are consistent.
- How content is loaded from markdown and whether the parsing logic is robust enough for current and future content shapes.
- How language resolution works, including browser language detection, localStorage persistence, and fallback to English.
- Whether pages are duplicating layout or data-fetching logic that should be centralized.

### Maintainability risks

- Repeated markup across blog and project cards, page shells, and empty states.
- Repeated SVG icons and link patterns that should be extracted into reusable components or constants.
- Inline styles and ad hoc string manipulation that should move into CSS or helper functions.
- Fragile assumptions in markdown/frontmatter parsing, especially around arrays, missing fields, and malformed content.
- Any code that is doing formatting, filtering, or fallback resolution in a way that is hard to test.

### UX and accessibility

- Keyboard accessibility for interactive elements that are currently rendered as `span` or rely on click handlers.
- Semantic HTML for navigation, cards, tag filters, language picker, and back links.
- Focus states, ARIA attributes, and button behavior for the language dropdown and filter controls.
- Mobile behavior and whether the current layout or sticky navigation needs cleanup.

### Styling and design system

- Whether the CSS token layer is sufficient or needs stronger separation between color, spacing, and typography.
- Repeated declarations for cards, tags, links, and section spacing.
- Opportunities to reduce style duplication while keeping the existing dark, monospace-first aesthetic.
- Any layout rules that should be made responsive through shared utility classes instead of page-specific overrides.

### Content model and localization

- Whether blog posts and projects should share a more explicit content model.
- Whether `allPosts`, `getPost`, `allProjects`, and `getProject` can be simplified or normalized.
- Whether the current language fallback behavior is correct for content and UI strings.
- Whether translation files expose enough metadata and whether the i18n resolver should validate missing keys more clearly.

## Refactor Priorities

1. Remove duplication before introducing new abstractions.
2. Keep the current behavior, routes, and content structure working unless a change is clearly safer and better.
3. Prefer small composable components and pure helpers over large page-level conditionals.
4. Improve accessibility and robustness where the current implementation is brittle.
5. Keep the app lightweight; avoid introducing heavy dependencies unless they replace repeated custom code.

## Suggested Refactor Targets

- Extract repeated card/link/icon patterns from blog and project pages.
- Replace clickable non-button elements with semantic interactive elements.
- Consolidate common page chrome and empty-state rendering.
- Strengthen frontmatter parsing and content normalization.
- Make tag filtering and search logic more reusable and easier to test.
- Reduce inline styling in favor of shared CSS classes or token-based variants.

## Constraints

- Do not break markdown rendering.
- Do not break multilingual content fallback.
- Do not break the current hash-based routing unless you are intentionally replacing it with an equivalent lightweight solution.
- Preserve the existing tone of the site: minimal, terminal-like, and content-first.
- Keep the codebase compatible with the current Vite + TypeScript + React setup.

## Validation Expectations

After refactoring, verify at least:

- TypeScript build succeeds.
- Lint passes, or any remaining lint issues are explained.
- Main routes still render: home, blog list, blog post, projects list, project page, and credits.
- Language switching still persists and falls back correctly.
- Markdown content still renders with GFM support.

## Output Format

When you finish, report:

- What you changed.
- Why those changes reduce complexity or risk.
- Any behavior you intentionally preserved.
- Any follow-up refactors you would do next if given more time.

If you discover a deeper architectural issue, explain it clearly before making a large redesign so the tradeoffs are visible.