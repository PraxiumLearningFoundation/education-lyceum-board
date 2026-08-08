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
index.html            The stakeholder-review shell (retired in the next phase)
web/
  index.html          The public board
  data/inquiries.js   The archive - currently still a JS file, moving to JSON
web-c/
  index.html          The internal Engagement Metrics dashboard
docs/
  DATA-NOTES.md       Content decisions, source-quality issues, privacy rules
```

This layout is mid-migration. The target shape, and the reasoning behind it, is
in the architecture plan (see below).

## Run it

Open `web/index.html` in any browser. No build step, no server.

Note that the page currently loads its styling from a CDN, so it needs an
internet connection. Vendoring that locally is an early phase of the migration.

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

1. **Repository hygiene** - clean history, guardrails, branch protection. *(this phase)*
2. **Split public from admin** - the board becomes the public page; the editor and
   metrics view move to a private admin repository. Vendor the CDN styling.
3. **Content leaves the code** - the archive becomes `data/lyceum.json` at schema
   version 2, fetched at runtime, so adding a gathering never touches HTML.
4. **The June 2026 gathering** - plus the new meeting tile and Storyboard view.
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
