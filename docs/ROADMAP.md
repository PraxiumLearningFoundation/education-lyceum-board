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

---

## Next

These three came directly out of the 9 August meeting and are in the order they were
asked for.

### 1. The storyboard at the top of each gathering **[9 Aug]**

The clearest request of the night, made twice: someone landing on a gathering should meet
the shape of it before the granular data, so they can decide whether to read on. Right
now a detail page opens straight into the six sections.

Two ways to do it, and the second is better than what was discussed:

- **A PNG of the deck slide**, as proposed in the meeting: export the PowerPoint or PDF to
  an image, size it to the viewport, let people pinch-zoom on a phone. Quick, and it
  matches the format the circle already knows.
- **Render the storyboard from the data we already hold.** Every record now carries
  sixteen beats with a title, a time range, a summary and a pull quote. That is the
  storyboard, in text. Drawing it as a visual band at the top of the page means it is
  searchable, readable by a screen reader, sharp on any screen, needs no export step
  when a record changes, and works properly on a phone - which an image of a slide never
  will. A PNG of the deck can still sit below it for people who want the familiar layout.

Recommend the second, with the first as a fallback where a deck exists and the data does
not.

### 2. Search across several words at once **[9 Aug]**

Tested live in the meeting and it failed. Typing `rabbi` works; typing
`community, DEI, Services` returns nothing, because the search looks for that whole
string as one phrase rather than for the words in it.

The fix is small: split the query on spaces and commas, and keep a gathering only if
**every** term appears somewhere in it. That makes the behaviour match what was
described - a Google-like narrowing, where each word you add cuts the list down.

Worth adding at the same time: show which terms matched nothing, so a search that comes
back empty says why instead of just going blank.

### 3. Link an item to the moment it came from **[9 Aug]**

Ehren's refinement of the Fathom idea, and the part that needs no video: clicking a
bullet should take you to the fuller context around it, "like it might be halfway down
the page and somebody was talking about retirement, and then it goes to minute 26."

We can already do this. Items carry an `at` timestamp and beats carry a `timeRange`, so
each item can be matched to the beat whose range contains it and linked to it. No video,
no transcript, no new data - only a join across two fields the records already have.

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

### The true Squarespace embed **[9 Aug]**

The iframe attempt failed on the night and the cause was guessed at. It has now been
tested, and the guess was wrong:

- GitHub Pages sends **no** `X-Frame-Options` and no framing restriction in its CSP.
- The live board was loaded inside an iframe from a different origin and rendered fully -
  all cards, the search box, and its runtime fetch of `data/lyceum.json`.

**The board frames fine.** What failed was Squarespace's *Embed* block, which only accepts
URLs from providers it recognises - hence "there's no embed here". Raw iframe HTML needs a
**Code block** instead, and Code blocks are a paid-tier Squarespace feature. So:

1. Check which Squarespace plan the site is on. Code blocks need Business or above.
2. If the plan allows it, a Code block on the hidden Library page with
   `<iframe src="https://praxiumlearningfoundation.github.io/education-lyceum-board/" width="100%" height="900" style="border:0" title="The Lyceum"></iframe>`
   should work as-is.
3. If it does not, the external link stays. It works, and it is not worth a plan upgrade
   on its own.

### How much detail belongs on a page

Hez raised it and it was not resolved: the June 2026 record grew from short and succinct
to "a ton of content" once the transcripts were worked. The storyboard-at-the-top item
above is most of the answer - the summary carries the skim, the sections carry the depth -
but if the sections still read as too long once that lands, the fix is to collapse them by
default rather than to cut what was said.

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
