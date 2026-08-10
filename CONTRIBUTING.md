# Adding to the Lyceum archive

This is the public record of the Praxium Learning Foundation's Lyceum gatherings. Anyone
who was in a circle can add to it, and you do not need to know how to code.

**The whole of what most people need is one link:**

- [Add to a gathering that is already here](https://github.com/PraxiumLearningFoundation/education-lyceum-board/issues/new?template=suggest-content.yml)
- [Add a gathering that is not here yet](https://github.com/PraxiumLearningFoundation/education-lyceum-board/issues/new?template=add-gathering.yml)
- [Report something broken on the site](https://github.com/PraxiumLearningFoundation/education-lyceum-board/issues/new?template=report-problem.yml)

Each is a form. Fill in what you know, leave the rest blank, press submit. A steward puts
it into the record and the conversation stays attached to your submission so you can see
what happened to it. You need a free GitHub account, and nothing else.

Every gathering page on the board also has an **Add to this record** box that opens the
same form with the gathering and section already filled in. That is usually the easiest
way in, because you are looking at the thing you want to change.

---

## Three rules, and why they exist

These are not house style. Each one is here because it went wrong at least once, and the
reasoning behind all of them is in [docs/DATA-NOTES.md](docs/DATA-NOTES.md).

### 1. Never put a transcript, a recording, or a slide deck in this repository

This repository is public, and a file committed here **stays retrievable by its commit
reference forever**, even after a later commit deletes it. Deleting is not undoing.

The transcripts name every participant, including minors, and nobody consented to
publication. They live outside git entirely. If a recording exists for a gathering you are
adding, say so in the form and a steward will collect it privately.

`.gitignore` and CI both refuse this material, and the rules were widened once already
because they were not catching enough. Do not rely on them - they are a backstop, not a
process.

### 2. The record says what, not who

**No participant is named anywhere in the archive.** Not on items, not in an attendee
list, not on a storyboard beat. This was a deliberate reversal of the earlier
attribute-by-default policy, decided after ten more transcripts showed what it cost:

- Ten further people would have been named for the first time without being asked.
- Naming someone in one gathering made a deliberate redaction in two later gatherings
  reconstructible.
- The recordings credit roughly 226 lines across the corpus to the wrong person, because
  people who share a room share a connection.
- Nobody in those circles agreed to be quoted by name on a permanent public page.

So please write your suggestion without names - **including your own account of your own
contribution.** It feels odd the first time. It is the rule that protects everyone else in
the circle too.

What is kept, because none of it identifies anyone: how many were present, where people
joined from at city or country level, roles that are functions rather than people ("the
facilitator opened"), every organisation, book, programme, campaign and country named in
the room, and the full substance of what was said.

### 3. A quote is verbatim or it is not a quote

Anything inside quotation marks must be **one continuous thing somebody actually said** -
not stitched from two moments, not tidied up, not your summary of the point.

This one is here because the archive published a three-sentence quote that nobody ever
uttered. It was a note-taker's honest compression of thirty-six seconds of speech, and
once the recording was filed away the compression was invisible. It survived a schema
migration and was made *longer* along the way.

If you are not sure, leave the quotation marks off and write it as a description. A
steward will check the recording and add the marks if they belong.

---

## What else the forms will ask you to confirm

Nobody's **health, family circumstances, immigration circumstances, employer or personal
finances** goes in the record, even where it was volunteered freely in the circle. People
say things in a room of eight that they have not agreed to publish on the open internet,
and the Lyceum deliberately invites exactly that kind of speaking.

And **nothing that identifies a minor** - not a name, a school, a year group, or a town.
Watch for combinations here: no single field has to name a child for the record to point
at one. It happened here with a city, an annual school event and a parent's role, in three
places that were each defensible alone.

---

## If you recognise yourself in the archive

If you think a gathering can be traced back to you or to someone else, **please contact us
privately rather than opening an issue.** Everything in this repository is public,
including issues, so an issue saying "this record identifies me" would sit in the open
pointing at the thing it wants removed.

The contact route is on the [issue page](https://github.com/PraxiumLearningFoundation/education-lyceum-board/issues/new/choose)
under "A privacy concern about something already published". We will act on it quickly, and
a removal does not need a justification from you.

---

## For stewards, and anyone who wants to go deeper

- **[docs/RUNBOOK.md](docs/RUNBOOK.md)** - how to actually publish a change: where the data
  lives, how to edit it from a browser, how long it takes to appear, how to undo it, and
  who has access to what.
- **[docs/DATA-NOTES.md](docs/DATA-NOTES.md)** - the content rules and the incident behind
  each one. Written from real failures, so it reads as a series of things that went wrong.
- **[docs/ROADMAP.md](docs/ROADMAP.md)** - what is built, what is next, and what is
  deliberately not being built.

## Working on the code

```sh
npm install
python3 -m http.server 8000     # then open http://localhost:8000
```

The board is one HTML file with an inline script, plus `data/lyceum.json`. There is no
build step for the page itself. The stylesheet **is** built:

```sh
npm run build:css
```

Run that and commit `board.css` whenever you add a CSS class to `index.html`. It is a
vendored Tailwind build, so a class with no rule behind it renders as nothing - a panel
shipped live and unstyled exactly that way, and CI now fails if the two drift apart.

Changes go on a branch, then a pull request into `dev`, then `dev` into `main`. Direct
pushes to `main` are refused for everyone, administrators included.
