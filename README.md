# The Lyceum - Community Inquiry Board

A living, searchable web home for the Praxium Lyceum gatherings, replacing the
PowerPoint decks with something people can browse, search, and help keep up to
date.

**Public board:** <https://praxiumlearningfoundation.github.io/education-lyceum-board/>
(live once the Pages deploy lands - see the roadmap below)

## Why

The Lyceum's history lived in a dozen PowerPoint decks. They are not searchable,
not mutable, and nobody wants to open one to update anything. This project turns
that history into a web archive built around the Lyceum's own **Sequence of
Inquiry**, so each gathering is a structured page the community can contribute
to.

## What is here

```text
index.html            The public board - this repository serves exactly this
board.css             Vendored stylesheet, generated and committed (see below)
data/
  lyceum.json         The archive - schema v2, the single source of truth
styles/
  tailwind-input.css  Source for board.css
tailwind.config.js    Theme for the CSS build
docs/
  DATA-NOTES.md       Content decisions, source-quality issues, privacy rules
```

Everything internal - the editor and the Engagement Metrics dashboard - lives in
a separate **private** repository, not here. This repository is public and
contains only what is meant to be public. That separation is structural, not a
convention: there is no URL on this site that could serve an internal page,
because the internal pages are not in this repository at all.

## Run it

The published board needs nothing: <https://praxiumlearningfoundation.github.io/education-lyceum-board/>

To preview a change locally, serve the folder rather than double-clicking the file:

```sh
python3 -m http.server 8000
```

then open <http://localhost:8000>. The board reads its content from
`data/lyceum.json`, and browsers refuse that when a page is opened directly off
disk. Opening the file directly does not fail silently - the page explains this
and gives you the command.

There is still no build step and no internet connection required.

## Styling

The board is styled with Tailwind, but there is no build step to run the site:
`board.css` is generated **and committed**. It is 13 KB, against the 407 KB
development build the CDN was serving.

Regenerate it only if you change class names in `index.html`:

```sh
npm install      # once
npm run build:css
```

The CDN was dropped deliberately. Its own response says "cdn.tailwindcss.com
should not be used in production", and a page inside a Squarespace frame with a
strict content policy, or on a locked-down network, can lose its styling
entirely when it depends on an external host.

## What the board does

- **Board index** - every gathering as a card, newest first, with the date, the
  inquiry question, and theme tags.
- **Live search** - filters across questions, tags, and all transcribed content.
- **Inquiry pages** - each gathering rendered as the six-part Sequence of Inquiry
  (Theories/Concepts, Application, Source/Input, Regulations, Opportunities,
  Challenges), plus the highlight quote and the Way Ahead.
- **Open quests** - gatherings not yet transcribed carry a "Help Wanted" tag,
  inviting people to explore and contribute to that inquiry.

## Repository rules

**This repository is public.** Two rules follow from that, and CI enforces both:

1. **No raw transcripts, decks, or office documents.** They contain personal data
   about named participants including minors, plus speaker notes and embedded
   photographs that have not been cleared. That material lives outside this
   repository in `../lyceum-sources/`. Only the curated record belongs here.
2. **Plain ASCII only.** No curly quotes, em dashes, ellipsis characters, or
   non-breaking spaces anywhere in the source or the data.

See `docs/DATA-NOTES.md` for the attribution and privacy rules that govern what
goes into the record, and the two-pass ingestion process that keeps it accurate.

## Branching

`main` is the deploy trigger: a push to it changes what the public sees, so it is
protected and takes changes only by pull request.

```text
feature/*  fix/*  chore/*   ->  PR into dev
dev                          ->  PR into main, once tested
main                         ->  publishes the site
```

One concern per branch. The pull request body says what changed and how it was
verified.

## Roadmap

The full architecture and development plan, including the hosting decisions and
the reasoning behind them, is the companion planning document. In short:

1. **Repository hygiene** - done: clean history, guardrails, branch protection.
2. **Split public from admin** - done: the board is the site root, the editor and
   metrics view moved to a private repository, and the CDN styling is vendored.
3. **Content leaves the code** - done: the archive is `data/lyceum.json` at schema
   version 2, fetched at runtime, so adding a gathering never touches HTML.
4. **The June 2026 gathering** *(next)* - plus the new meeting tile and Storyboard view.
5. **Go live** on GitHub Pages.
6. **The editor** - a form that writes the record for a human to review and commit.
   No API tokens anywhere in the system.
7. **Metrics on real numbers** - facilitator-recorded, replacing the sample data.
8. **Runbook and the Squarespace embed.**

Visitor interaction - public comments, likes, click tracking - is deliberately
**not** in this roadmap. A static site cannot collect it, and doing it properly
needs a place to write, moderation before anything appears, spam handling, and
consent decisions that matter because minors take part in this community. It is
its own project.
