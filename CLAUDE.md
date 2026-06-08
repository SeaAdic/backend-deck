# CLAUDE.md

Guidance for Claude Code (and humans) working in this repo. If you're an
engineer prepping a sprint demo, the fastest path is: **ask Claude to build the
deck from your Jira tickets and merged PRs** (see [Integrations](#integrations)).

## What this is

A small static [reveal.js](https://revealjs.com) site for the Remit Plus (R+)
backend team to demo what shipped each sprint. The home page (`index.html`) is a
hub that links to one deck per sprint.

**The repo only ships the shell** — the hub, the shared design system, a deck
template, and reveal.js (as a git submodule). The actual sprint decks and the
deck list are **gitignored and stay on each engineer's machine**, because they
contain internal sprint content (ticket details, incident write-ups, dashboard
links, architecture). Nothing sprint-specific should ever be committed.

## Layout

```
backend-deck/
├── index.html              hub — renders cards from window.DECKS (decks/decks.js)
├── reveal.js/              git submodule, pinned (the framework; dist/ is prebuilt)
├── docs/                   README assets (e.g. the hub screenshot)
└── decks/
    ├── _shared/deck.css    shared "HUD" design system          ← tracked
    ├── _template/          copy this to start a deck           ← tracked
    ├── decks.example.js    template for the deck list          ← tracked
    ├── README.md           authoring guide + component list    ← tracked
    ├── decks.js            YOUR deck list (window.DECKS)        ← gitignored
    └── sprint-YYYY-MM-DD/  YOUR decks                           ← gitignored
```

## ⚠️ The golden rule

**Never commit sprint content.** `decks/decks.js` and every real deck folder are
gitignored on purpose. Only `_shared/`, `_template/`, `decks.example.js`,
`README.md`, and the hub are tracked. If you find yourself staging a
`decks/sprint-*` file, stop — that content stays local.

## Add a sprint deck

1. **Scaffold** from the template:
   ```bash
   cp -r decks/_template decks/sprint-YYYY-MM-DD
   ```
2. **Write the slides** in `decks/sprint-YYYY-MM-DD/index.html`. Reuse the
   styled components (`pill`, `callout`, `theme-grid`, `code-pair`, `flow`,
   `layer-table`, …) — the full list is in
   [`decks/README.md`](decks/README.md) and they're defined in
   `decks/_shared/deck.css`.
3. **Screenshots** go in that deck's own `images/`, referenced as
   `<img src="images/your-shot.png">`.
4. **Register it on the hub** — first time, `cp decks/decks.example.js
   decks/decks.js`, then add an entry to the `window.DECKS` array in
   `decks/decks.js`.
5. **Preview** (no build step — `dist/` is prebuilt in the submodule):
   ```bash
   python3 -m http.server 8000      # then open http://localhost:8000
   ```

## Integrations

This is where Claude saves you the most time: pull the real sprint facts
straight from Jira and GitHub and let Claude draft the deck.

### Jira (Atlassian)

If you have the **Atlassian / Jira integration connected**, Claude can read
tickets and turn them into slides. The team's Jira project key is **`RPX`**
(Remit Plus).

Useful asks:
- *"Pull RPX-3314 and RPX-3302 and draft agenda theme-cards from them."*
- *"Find everything I closed in the last sprint and group it into themes."*
  (Claude can run a JQL search like
  `project = RPX AND assignee = currentUser() AND resolved >= -14d`.)
- *"Use each ticket's status to set the right `pill` (ok / warn / danger) and
  put the ticket key in the `tix` label."*

Claude reads ticket title / description / status / links — it does **not** write
back to Jira unless you explicitly ask.

### GitHub (`gh` CLI)

Use `gh` to describe what actually shipped — merged PRs, diffs, commits.

Useful asks:
- *"List the PRs I merged since 2026-06-01 and summarise them for the agenda."*
  → `gh pr list --search "is:merged author:@me merged:>=2026-06-01"`
- *"Open PR #482 and build a before/after `code-pair` slide from the key diff."*
  → `gh pr view 482 --json title,body,files` / `gh pr diff 482`
- *"Add a dashboard link slide pointing at <Mode/Grafana URL>."*

Repo housekeeping with `gh`:
- This repo is **private** (`SeaAdic/backend-deck`). Keep it that way — the decks
  assume internal content. Don't flip it public.
- reveal.js is a submodule from `github.com/hakimel/reveal.js`. To upgrade it:
  ```bash
  cd reveal.js && git fetch && git checkout <tag> && cd ..
  git add reveal.js && git commit -m "Bump reveal.js to <tag>"
  ```

## Project context (what Claude knows about this repo)

- **Audience & purpose:** internal sprint demos for the Remit Plus / SNOWALLET
  backend team — walk colleagues through the bugs chased, fixes deployed, and the
  numbers behind them. Slides should be concrete and engineer-facing.
- **Domain:** money-movement / wallet platform (Universal Wallet, P2P transfers,
  withdrawals, reconciliation, ledger). Backends like `remit-srv`, `snowallet`,
  `UWS`. Jira project key `RPX`. Dashboards usually live in **Mode** or Grafana.
- **Design language:** dark "HUD" theme (mint / cool-blue / warm accents,
  Bricolage Grotesque + Hanken Grotesk + JetBrains Mono). Keep new decks
  consistent by leaning on `_shared/deck.css` rather than inventing new styles.
- **reveal.js is vendored as a submodule** (not copied) and pinned to a specific
  version; `dist/` is committed upstream so there is no build step. Always clone
  with `git clone --recursive` (or `git submodule update --init` after the fact).

## Conventions / gotchas

- Decks reference reveal.js via `../../reveal.js/dist/...` (two levels up to the
  repo root, then into the submodule). The `_template` already has the right
  paths — copy it rather than hand-writing includes.
- Don't edit `decks/_shared/deck.css` or `decks/_template/` for a single deck —
  those are shared. Change them only when improving the system for everyone.
- The hub sorts decks by ISO `date` (newest first) and rotates accent colours;
  set `accent` (`mint` | `cool` | `warm`) per deck only if you want a specific one.
