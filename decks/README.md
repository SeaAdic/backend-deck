# Sprint Demo Decks

Each sprint demo is a self-contained [reveal.js](https://revealjs.com) deck.
They all share one dark "HUD" design system so every demo looks consistent and
the focus stays on the work, not the styling.

```
decks/
├── _shared/deck.css        ← shared design system (import this, don't copy it)
├── _template/              ← starting point for a new deck
│   ├── index.html
│   └── images/
├── sprint-2026-06-04/      ← one folder per sprint demo
│   ├── index.html
│   └── images/             ← screenshots for *this* deck only
└── ...
```

The hub at the repo-root **`index.html`** links to every deck.

## Add a new sprint deck

1. **Copy the template** to a dated slug:

   ```bash
   cp -r decks/_template decks/sprint-YYYY-MM-DD
   ```

2. **Write your slides** in `decks/sprint-YYYY-MM-DD/index.html`. Edit the
   `<title>`, the title slide, and add `<section>` blocks. The template
   demonstrates the common components; the full set lives in
   [`_shared/deck.css`](_shared/deck.css):

   | Component         | Class                                          |
   | ----------------- | ---------------------------------------------- |
   | Status badge      | `.pill` (`.ok` `.warn` `.danger` `.cool`)      |
   | Highlight box     | `.callout` (`.warn` `.danger`)                 |
   | Agenda cards      | `.theme-grid` › `.theme-card` (`.cool` `.warm`)|
   | Before/after code | `.code-pair` › `.label.before` / `.label.after`|
   | Flow diagram      | `.flow` › `.node` (`.broken` `.fixed`)         |
   | Comparison table  | `.layer-table`                                 |
   | Concept cards     | `.world-grid` › `.world`                       |
   | Dashboard links   | `.dash-list` › `.dash-link`                    |
   | Dash bullets      | `.bullets`                                      |

3. **Drop screenshots** into the deck's own `images/` folder and reference them
   with a relative path: `<img src="images/your-shot.png" />`. Keep each deck's
   assets inside its own folder so decks stay portable.

4. **Register it on the hub** — the hub reads its deck list from
   `decks/decks.js`, which is **gitignored** so sprint content never lands in
   the repo. First time, create it from the example:

   ```bash
   cp decks/decks.example.js decks/decks.js
   ```

   Then add one object to the `window.DECKS` array in `decks/decks.js`:

   ```js
   {
       title: 'Short, punchy deck title',
       blurb:  'One or two sentences on what shipped.',
       path:   'decks/sprint-YYYY-MM-DD/',
       sprint: 'Mon DD – Mon DD, YYYY',
       date:   'YYYY-MM-DD',          // sort key — newest first
       tags:   ['Area', 'Type'],
   },
   ```

## Preview locally

No build step — serve the repo root with any static server:

```bash
python3 -m http.server 8000      # or:  npx serve -l 8000
```

Then open <http://localhost:8000> for the hub, or jump straight to a deck at
`http://localhost:8000/decks/sprint-YYYY-MM-DD/`.

(reveal.js lives in the `reveal.js/` git submodule — run
`git submodule update --init` first if `dist/` is missing.)

## Presenting tips

- **`F`** — full screen · **`S`** — speaker notes / timer · **`Esc`** — slide overview
- **`B`** — black out the screen mid-demo · **arrows / space** — navigate
- The deck URL tracks the current slide (`#/3`), so you can deep-link or refresh
  without losing your place.
