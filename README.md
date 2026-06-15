# md-to-slides

Zero-install, paste-and-go Markdown-to-slides in the browser. Write Markdown on the left, watch slides render live on the right, then present fullscreen. No accounts, no backend, no build step.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen?logo=githubpages)](https://markstent.github.io/md-to-slides/)
[![Tests](https://img.shields.io/badge/tests-24%20passing-success?logo=vitest)](#testing)
[![Built with](https://img.shields.io/badge/built%20with-vanilla%20JS-f7df1e?logo=javascript&logoColor=black)](#tech-stack)
[![No build step](https://img.shields.io/badge/build%20step-none-blue)](#tech-stack)
[![Deployed on GitHub Pages](https://img.shields.io/badge/hosted-GitHub%20Pages-222?logo=github)](https://markstent.github.io/md-to-slides/)

## Demo

**[markstent.github.io/md-to-slides](https://markstent.github.io/md-to-slides/)**

## Features

- **Live preview** — type or paste Markdown and see slides update instantly.
- **Slide splitting** — separate slides with a line containing only `---`.
- **Standard Markdown** — headings, bold/italic, lists, links, blockquotes, inline code, tables, and images by URL.
- **Syntax-highlighted code** — fenced code blocks highlighted via highlight.js.
- **Themes** — switch between Light, Dark, and Accent from the toolbar.
- **Auto-save** — your content and theme are saved to `localStorage` and restored on reload.
- **Present mode** — go fullscreen and arrow-key through the deck on a 16:9 surface.

## Usage

1. Open the [live app](https://markstent.github.io/md-to-slides/) (or serve it locally, below).
2. Write Markdown in the left pane. Start a new slide with a line that is exactly `---`:

   ````markdown
   # First slide

   - point one
   - point two

   ---

   # Second slide

   ```js
   const hello = "world";
   ```
   ````

3. Pick a theme from the toolbar.
4. Click **Present** to go fullscreen.

### Keyboard (present mode)

| Key | Action |
|-----|--------|
| `→` / `Space` | Next slide |
| `←` | Previous slide |
| `Esc` | Exit present mode |

## Run locally

No build step — just serve the folder over HTTP (ES modules require `http://`, not `file://`):

```bash
git clone git@github.com:markstent/md-to-slides.git
cd md-to-slides
python3 -m http.server 8000
# open http://localhost:8000
```

## Testing

Unit tests run on [Vitest](https://vitest.dev/):

```bash
npm install
npm test
```

The core logic is tested through three pure seams: `parseDeck` (Markdown to slides), `state` + `themes` (persistence and theme resolution), and `createPresenter` (slide navigation). Fullscreen scaling is verified manually.

## Tech stack

Vanilla HTML, CSS, and ES modules — no framework, no bundler. Markdown rendering uses [marked](https://marked.js.org/) with [marked-highlight](https://github.com/markedjs/marked-highlight) and [highlight.js](https://highlightjs.org/), loaded in the browser via an import map from [esm.sh](https://esm.sh/) and resolved from `node_modules` for tests.

## Project structure

```
index.html            Page shell: editor + preview + toolbar
src/parseDeck.js       Split on --- and render Markdown to HTML
src/themes.js          Theme list + resolution
src/state.js           localStorage save/load over injected storage
src/present.js         Slide navigation (next/prev/current, clamped)
src/main.js            Wires the modules to the DOM
styles/                base, themes, present stylesheets
test/                  Vitest specs
```
