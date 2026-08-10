# Roadmap

The working list. `README.md` carries the short version; this is where the detail and
the reasoning live.

Last updated after the weekly administration meeting of **9 August 2026**, where the
board was linked from the foundation site for the first time. Items marked **[9 Aug]**
came out of that meeting.

---

## Done

1. **Repository hygiene** - clean history, guardrails, branch protection, signed commits.
2. **Public split from admin** - the board is the site root; the editor and the metrics
   view live in a private repository. Styling is vendored, so no CDN call at runtime.
3. **Content left the code** - the archive is `data/lyceum.json` at schema version 2,
   fetched at runtime. Adding a gathering never touches HTML.
4. **Live on GitHub Pages** at
   <https://praxiumlearningfoundation.github.io/education-lyceum-board/>.
5. **Every gathering transcribed** - 14 records, 1,156 items. Twelve from their
   recordings, two rebuilt from the November 2024 reflection because they were never
   recorded. All 99 published quotes verified as single contiguous cues.
6. **Linked from the foundation site** **[9 Aug]** - a button on the Lyceum service page
   points at the board. The Resource Hub tab stays hidden until it holds more than one
   thing.
7. **Favicon and star logo** **[9 Aug]** - wired into the page head and the board header.

8. **The storyboard at the top of each gathering** **[9 Aug]** - the clearest request of
   the night, made twice. A detail page now opens on "The shape of the evening": the
   logline, then a sideways-scrolling strip of beat chips, each one jumping to that beat
   in the full narrative further down.

   The meeting proposed exporting the deck slide to a PNG. This draws it from the beats
   instead, which every record already carries, so it stays searchable, reads on a phone,
   survives a record being edited without a re-export, and a screen reader can follow it.
   `storyboard.image` is honoured if a deck PNG is added later, so both routes work.

9. **Search across several words** **[9 Aug]** - the query is split on spaces, commas and
   semicolons, and a gathering is kept only if **every** term appears in it. Each word
   now narrows the list, which is what a search box implies.

   The empty state carries its weight too. A multi-word search can come back blank for
   two different reasons and only the difference is actionable, so it now says which:
   either a word appears nowhere in the archive, or every word appears but never in the
   same gathering. It lists the per-term counts so it is obvious which word to drop.
   `community, DEI, Services` - the query that failed live - now reports that each word
   is in the archive but no single gathering has all three.

   The storyboard prose was added to what search reads at the same time. A word spoken in
   the room but never lifted into a bullet was previously unfindable.

10. **An item links to the moment it came from** **[9 Aug]** - the timestamp on a bullet is
    now a link to the beat whose time range contains it, titled with that beat's name.
    This is the part of the Fathom idea that needs no video: `at` on items and `timeRange`
    on beats already joined, so it needed no new data.

    Clicking one scrolls to the beat and briefly outlines it, without touching the URL
    hash - the router treats a hash change as navigation, so a plain anchor would have
    thrown the reader back to the index.

11. **The archive loads even when the markup is copied elsewhere** **[9 Aug]** - see the
    Squarespace note below.

---

## Pick up here next

Agreed on 10 August as the resume point. Nothing below is in progress; this is the queue,
roughly in the order it makes sense to take it.

1. **Where the recordings live** - a decision, and the privacy question under it.
2. **The Squarespace plan tier**, so the iframe can go in a Code block.
3. **Look at a gathering page** and decide whether the six sections still read as too long
   now that the storyboard band is at the top.
4. **Lyceums tied to the Shinrin Yoku and Kintsugi campaigns**, cross-linked from each
   campaign page.
5. **The editor** - a form that writes a record for a human to review and commit.
6. **The single Praxium admin page**, with the editor as its first tab.
7. **Azure Static Web App** as the longer-term host.
8. **Engagement metrics**, as its own project.
9. **The Lyceum podcast.**

Each has its own section below.

---

## Decisions needed

### Where the recordings live **[9 Aug]**

Raised and left open. Three options, with the trade-off that was already identified:

| Option | Cost | Problem |
| --- | --- | --- |
| Zoom share links | none | asks people to sign in to Zoom |
| Self-host the downloaded files | storage | we own it, we pay for it |
| YouTube, unlisted or private | none | not ours, but it carries a full transcript and supports deep-linking to a timestamp |

Hez favoured YouTube in the meeting, on the reasoning that it gives the timestamp
deep-link for free. **Nothing links to a recording until this is settled**, because the
link format depends on the answer.

Note the privacy question underneath it, which the meeting did not reach: the recordings
are the raw material the archive was deliberately built to filter. They name every
participant, they include minors, and nobody consented to publication. Publishing a
recording undoes the whole naming policy in `DATA-NOTES.md` in one step. If recordings are
shared at all it should be to members on request, not from a public page.

### The true Squarespace embed - two failures, both now understood **[9 Aug]**

Two different things were tried and each failed for its own reason. Both are now
diagnosed, and one is fixed in code.

#### Failure 1: the Embed block said "No embeddable content found"

That block only accepts URLs from providers it recognises - YouTube, Vimeo and the like -
via oEmbed. A plain web page is not embeddable content to it. This is not a fault in the
board.

Framing itself was tested and works. GitHub Pages sends **no** `X-Frame-Options` and no
framing restriction in its CSP, and the live board was loaded inside an iframe from a
different origin and rendered fully - all cards, the search box, and its runtime fetch of
`data/lyceum.json`. **So an iframe is the right instrument**, in a **Code block** rather
than an Embed block.

Use this, in a Code block:

```html
<iframe
  src="https://praxiumlearningfoundation.github.io/education-lyceum-board/"
  title="The Lyceum - Praxium Learning Foundation"
  style="width:100%; height:85vh; border:0"
  loading="lazy">
  <p>Your browser does not support iframes.
     <a href="https://praxiumlearningfoundation.github.io/education-lyceum-board/">Open
     The Lyceum in a new tab</a>.</p>
</iframe>
```

Four things differ from the obvious version, and each one matters:

- **`width:100%`, not `width="600"`.** A fixed 600 pixels is narrower than a phone in
  landscape, so the board would scroll sideways inside the frame on top of the page
  already scrolling - two scrollbars, and the two-column card grid never gets to open out.
- **`height:85vh`, not `height="400"`.** 400 pixels shows roughly one card. `85vh` gives
  the frame most of the viewport whatever the device, without swallowing the page's own
  header and footer.
- **`border:0`.** The default border draws a box around it and makes the board read as an
  advert rather than part of the site.
- **A link inside the fallback.** "Your browser does not support iframes" tells a reader
  there is a problem and gives them nowhere to go; the link gives them the board.

Code blocks are a paid-tier Squarespace feature, so check the plan. This route is the one
to prefer: the embed always shows the current board, with nothing to re-copy when a
gathering is added.

#### Failure 2: the Code block loaded the board, which then 404'd on the archive

This one *was* ours, and it is fixed. The board's markup had been pasted into the Code
block, which puts the HTML on squarespace.com while the data stays on Pages - so
`./data/lyceum.json` resolved against the Squarespace page and 404'd. A relative path
problem, not a Squarespace problem.

The board now tries the relative path first and falls back to the canonical copy on Pages
if that fails. GitHub Pages answers with `access-control-allow-origin: *`, so the
cross-origin read is allowed, and a normal visit costs no extra request because the
fallback is only reached after the first attempt fails.

**`board.css` had exactly the same problem, and it was the more visible one.** Copied
markup cannot reach `./board.css` either, so the page came up as raw HTML: tag names
running together with no spacing, the beat strip falling back to a browser-numbered list,
nothing laid out. The stylesheet now gets the same treatment - a probe checks whether one
of this project's own theme colours actually applied, and appends the canonical stylesheet
if it did not.

Verified by serving the markup from a different origin with **neither** `data/` nor
`board.css`: all 14 gatherings load and the page comes up styled.

**So both routes now work.** The iframe is still the better one - nothing to re-copy when
a gathering is added - but pasting the markup is no longer broken.

#### Failure 3: "Read it in full" went back to the main page

Not an embed problem at all, and it would have happened anywhere. The router treats a
hash change as navigation, and its guard for in-page anchors recognised `#beat-N` but not
`#storyboard`, which is where that link points - so it fell through to the index and threw
away the page. The guard now matches the *shape* of an in-page anchor rather than a list of
known ids: any hash that is not a route and does name an element on the page is left alone.

### How much detail belongs on a page

Raised and not resolved: the June 2026 record grew from short and succinct to "a ton of
content" once the transcripts were worked.

The storyboard band at the top is most of the answer - the band carries the skim, the
sections carry the depth, and nobody has to scroll the depth to find out what the evening
was about. **Look at a page now and decide whether that is enough.** If the sections still
read as too long, collapse them behind a summary line rather than cutting what was said:
the length is the record being complete, which is the point of it.

---

## Longer arcs

### One admin page for all of Praxium

Hez's stated end state, and the reason the board was built the way it was: one page with
tabs, one login, rather than three or four separate tools. Update a partner map location
under one tab, add storyboard items under another. The board's editor is the first tab;
the map is the second.

### Azure Static Web App

GitHub Pages is the intermediate host and Azure is the longer-term one, on the free plan.
Nothing forces the move yet. The board is deliberately portable - relative paths
throughout, no build step, no server - so the move is a deployment change and not a
rewrite.

### Engagement metrics

The second page from the original two-page plan: what people do on the published board -
searches, clicks, comments - aggregated. Correctly called "a little bit heavier lift" in
the meeting, because a static site cannot collect any of it. It needs somewhere to write,
moderation before anything appears, spam handling, and consent decisions that matter
because minors take part in this community. **Engagement means the website, not the
meeting** - see `DATA-NOTES.md`. It is its own project, not a feature of this one.

### The Lyceum podcast

A fifteen-to-twenty minute reflection on each gathering, for the drive to work. The model
discussed: a public feed on the usual directories plus a private RSS feed for members, the
way Arash Farzaneh runs
[A Life Well Lived Beyond Paycheques](https://www.podbean.com) on Podbean and YouTube
concurrently. The point made in the meeting is worth keeping in view: unlike a
personality-driven podcast, this one is the circle working a problem through, so the draw
is the deliberate problem-solving rather than the host.

### Lyceums tied to the calls to action

Agreed in the meeting and the closest thing to a shoo-in on this list. Schedule gatherings
deliberately on the **Shinrin Yoku** and **Kintsugi** campaigns, then link from each
campaign page to that gathering's storyboard - so a call to action shows the thinking
behind it.

For Shinrin Yoku the suggestion was to invite practitioners from outside the circle:
indigenous practice, yoga, paddle boarding, hiking, gardening, beekeeping. That turns a
gathering into the collective-journey format the campaigns already use, with Coral Mountain
Wellness and the Consumer Initiative Fund on one and Java and the United Indians of All
Tribes Foundation on the other.

### Storyboards as social posts

Once the storyboard is at the top of a page it becomes shareable on its own, pointing back
at the board. Most useful where a gathering's topic is live in a community right now.

---

## Not on this list, deliberately

- **A Fathom-style clickable transcript into the video.** Discussed and explicitly
  deprioritised: it is computationally expensive, it needs an account to view, and Fathom
  was only recording from late July 2026, so it cannot be applied to the earlier
  gatherings at all. Item 3 above delivers most of what it was wanted for without a video.
  If Fathom notes are wanted on the page later, capture them statically rather than
  linking into the tool.
- **Naming participants.** Settled and closed. See "The record says what, not who" in
  `DATA-NOTES.md`.

---

## Standing hazard

Raw transcripts must never reach this repository - it is public, and a commit stays
readable by reference even after a later commit deletes it.

`.gitignore` and CI both enforce it, and on 9 August the rules were widened because they
were not enough: this meeting's own transcript arrived as
`20260809_meeting_transcript.md`, named five people, matched neither rule, and sat
untracked in the working tree where any `git add -A` would have committed it. Admin
meeting transcripts are not Lyceum transcripts and do not follow the same naming, so the
rules now match the word rather than the prefix. Everything raw belongs in
`../lyceum-sources/`.
