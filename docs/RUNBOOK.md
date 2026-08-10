# Runbook

How to run the Lyceum board. Written for whoever is holding it in a year, which may not be
the person who built it.

If you only want to **suggest** something, you do not need this file - see
[CONTRIBUTING.md](../CONTRIBUTING.md). This is for the people who publish.

---

## The shape of it, in one paragraph

The board is a single HTML page with its script inline, plus a stylesheet and a data file.
The page reads `data/lyceum.json` when it opens, so **adding a gathering never means
editing the page**. GitHub Pages serves the `main` branch of the public repository directly.
There is no server, no database, no login, and no API key anywhere in the system. Every
content change is a commit, which means every change has an author, a date, a diff and a
one-click undo.

## Where everything lives

| What | Where | Notes |
| --- | --- | --- |
| The archive | `data/lyceum.json` in this repo | The single source of truth. 14 records. |
| The board page | `index.html` | Markup and script in one file, no build step. |
| The stylesheet | `board.css` | **Built** from `index.html` by `npm run build:css`. Do not hand-edit. |
| Branding | `favicon.webp`, `StarLogo.png` | Referenced by relative path. |
| Content rules | `docs/DATA-NOTES.md` | What may and may not be published, and why. |
| The live site | <https://praxiumlearningfoundation.github.io/education-lyceum-board/> | Served from `main`, root folder. |
| Raw transcripts, recordings, decks | `~/Documents/Praxium/lyceum-sources/` | **Outside git, permanently.** Never in this repo. |
| The editor and metrics view | `praxium-console` (private repo) | Deliberately not on the internet. |

## How to change the archive

You do not need a terminal. The whole loop works in a browser.

1. **Open the file** on GitHub: `data/lyceum.json`, then the pencil icon.
2. **Make the change.** The shape is documented below.
3. **Commit to a new branch** - GitHub offers this at the bottom of the edit screen.
   Never commit to `main`; it will be refused anyway.
4. **Open a pull request into `dev`.** A checklist appears. Work through it honestly; it
   exists because each line on it went wrong here at least once.
5. **Wait for the checks.** Ten of them run automatically, in about a minute.
6. **Merge into `dev`**, then open a second pull request from `dev` into `main`. Merging
   that one publishes it.

The two-step is not bureaucracy: `dev` is where a mistake is cheap, and `main` is what the
public sees.

### If you would rather work locally

```sh
git switch dev && git pull
git switch -c content/2026-09-06-gathering
# edit data/lyceum.json
npm run build:css        # only if you touched index.html
python3 -m http.server 8000   # then open http://localhost:8000 and look at it
git commit -am "Add the 6 September 2026 gathering"
git push -u origin content/2026-09-06-gathering
gh pr create --base dev
```

## The record shape

The file is `{"schemaVersion": 2, "inquiries": [ ... ]}`, one object per gathering, sorted
by date. A minimal new record needs only `id`, `date`, `inquiry` and `status`; everything
else can be filled in later by anyone.

```jsonc
{
  "schemaVersion": 2,
  "id": "2026-09-06-example",        // date + a short slug. Never reuse or change it -
                                      //   published links break. If it must change, keep
                                      //   the old one in "idAliases": ["..."].
  "date": "2026-09-06",
  "inquiry": "How do we ... in our communities?",   // as SPOKEN in the room, not as typed
                                                    //   on the slide. A superseded wording
                                                    //   goes in "inquiryAliases" so old
                                                    //   searches still find it.
  "tags": ["community", "housing"],
  "status": "transcribed",           // "transcribed" | "founding" | "needs-transcription"
  "meeting": {
    "participants": 7,               // a count, never names
    "locations": ["Canada", "United States"],       // country or city, never an address
    "landAcknowledgement": "...",
    "agenda": ["...", "..."],
    "contextNotes": ["..."]          // what a reader needs to make sense of the evening.
                                      //   NOT chat-clock arithmetic or one person's
                                      //   connection trouble - CI rejects those.
  },

  // The six Sequence of Inquiry sections. Each item is {"text": "...", "at": "@12:34"}.
  // "at" is optional; when present it must be a single timestamp, not a range, and the
  // board turns it into a link to the storyboard beat that contains it.
  "theories": [{ "text": "...", "at": "@21:59" }],
  "applications": [], "sources": [], "policies": [],
  "opportunities": [], "challenges": [],

  "quote": "...",                    // VERBATIM, one continuous utterance. See DATA-NOTES.
  "quoteAt": "@47:32",
  "callToAction": "...",

  "storyboard": {
    "logline": "one sentence for the whole evening",
    "arcNotes": "a paragraph on how it moved",   // narrative only. Reviewer notes,
                                                 //   withheld inventories and clock
                                                 //   arithmetic are rejected by CI.
    "beats": [{ "n": 1, "title": "...", "timeRange": "@0:00 - @5:26",
                "summary": "...", "pullQuote": "...", "slideHint": "..." }]
  },

  "withheld": "one sentence naming the CATEGORIES left out",   // never an itemised list
                                                               //   and never a timestamp
  "provenance": {
    "source": "the meeting recording transcript",
    "extractedOn": "2026-09-07",
    "reviewedBy": "Your Name"        // the person who checked it against the source.
                                     //   Empty means unreviewed. Do not publish unreviewed.
  }
}
```

Two records use a different shape and are worth knowing about:

- **A reflection** (`"kind": "reflection"`) revisits earlier gatherings instead of running
  the six sections. It has `reviewed`, `learned`, `carried`, `changed` and `openQuestions`
  in their place, plus a `title` and `summary`.
- **A recap-sourced record** (`"recapOf": "<id>"`) is for a gathering that was never
  recorded. Its content comes from a later reflection, the board says so on the page, and
  it carries **no quote and no item timestamps** - there is no recording to verify a quote
  against, and the reflection's timestamps belong to the reflection.

## What the checks will stop you doing

Ten checks run on every pull request. When one fails it prints the file and the reason.
These are the ones people actually hit:

| The failure says | What it means |
| --- | --- |
| Private or non-source material is committed | A transcript, deck, `.vtt`, `.pdf` or a file with "transcript" or "meeting" in its name. Move it to `lyceum-sources/`. |
| non-ASCII character | A curly quote, an em dash or an accented character, usually pasted from a document. Use plain ASCII: `-` not an em dash, `"` not smart quotes. |
| malformed timestamp | An `at` field that is not `@M:SS` or `@H:MM:SS`. A **range** in a single-timestamp field is the common one - either pick one moment or drop the field. |
| an item at Ns sits after the last storyboard beat ends | The item's timestamp and the beats disagree. One of the two is wrong. |
| a withheld inventory / chat-clock arithmetic / a working heading | Working notes reached a field the board publishes. Cut them; `arcNotes` is narrative only. |
| board.css is stale | You added a CSS class to `index.html`. Run `npm run build:css` and commit the result. |
| a subresource is loaded from an absolute URL | Something in the page now loads from another host. Vendor it instead. |

CI cannot check the things that matter most - whether a name slipped in, whether a quote is
real, whether a combination of harmless details points at one person. That is what the
pull-request checklist and a second pair of eyes are for.

## How long a change takes to appear

Measured, not estimated:

- The Pages deploy runs in about **25 to 30 seconds** after the merge into `main`.
- The archive is then served with `cache-control: max-age=600`, so **a browser that has
  already loaded the page can keep the old copy for up to ten minutes.**

So: if you do not see your change, you are almost certainly looking at a cached copy. Hard
refresh (Ctrl-Shift-R, or Cmd-Shift-R) before you conclude anything is broken, and do not
publish twice.

The board also keeps its own copy in the visitor's browser as a fallback, so someone whose
network fails mid-visit sees the last good version with a banner saying so, rather than an
empty page.

## How to undo something

**Something published that should not have been.** Speed matters more than tidiness.

1. On GitHub, open the merge commit on `main`, press **Revert**, and merge the revert
   pull request. That takes it off the live site within a minute or two.
2. Then work out what happened, calmly, on a branch.

From a terminal, the same thing:

```sh
git switch main && git pull
git revert -m 1 <merge-commit-sha>    # -m 1 because it is a merge commit
git push          # refused - open a PR instead, which is the point
```

**A privacy exposure is different, and worse.** A revert removes it from the live site but
**not from git history**, and not from anything that already fetched it. So:

1. Revert immediately, to stop it spreading.
2. Tell the person affected, if it is about someone identifiable.
3. Then decide whether history has to be rewritten. That is a real operation with real
   consequences for everyone's clones, and it is the reason the transcript rule is absolute:
   the only reliable defence is that the material was never committed.

## Who has access to what

| Level | What it can do | Who should have it |
| --- | --- | --- |
| Nobody / a GitHub account | Open issues, use the forms, comment | **Every member.** This is the contribution path, and it needs no repository access at all. |
| Write | Push branches, open pull requests, merge into `dev` | Stewards who publish regularly. |
| Admin | All of the above, plus change settings and branch protection | One or two people. |

**As of 10 August 2026, four accounts hold `admin`:** `selectdimensions`,
`PraxiumLearning03`, `PraxiumLearning01` and `Jordan030609`. That is more than this needs.
`admin` can turn off branch protection, and the protection is most of what makes the
process safe. Consider moving all but one or two to `write`:

```sh
gh api -X PUT repos/PraxiumLearningFoundation/education-lyceum-board/collaborators/USER \
  -f permission=push
```

Branch protection on `main` currently requires a pull request and **applies to
administrators too** (`enforce_admins: true`). That was turned on after a junk commit
reached `main` directly, so leave it on.

Adding a member does **not** mean adding a collaborator. The forms are the front door.

## Putting the board on the Praxium website

Two routes. The link-out works everywhere and needs nothing; the embed is nicer and needs a
paid Squarespace tier.

**Link out.** A button pointing at the board's address. Working today from the Lyceum
service page.

**Embed.** Use a **Code block**, not an Embed block - an Embed block only accepts URLs from
providers it recognises and will say "No embeddable content found". Code blocks need
Squarespace Business or above.

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

Do not use a fixed `width="600" height="400"`: that is narrower than a phone in landscape
and about one card tall, so the board scrolls sideways inside a page that is already
scrolling.

Three things to know before you rely on the embed:

- **Test it on a real iPhone**, not a desktop browser window. iOS Safari handles frame
  heights differently and this is the most common way these embeds ship broken. Not yet
  done.
- A code block often renders blank **while you are logged in to the Squarespace editor**
  and is fine for visitors. Check in a private window before debugging a problem that is
  not there.
- Framed content builds search presence for `github.io` rather than for the foundation. A
  subdomain such as `lyceum.praxiumfoundation.org` pointed at Pages fixes that, free.

Pasting the board's HTML into a code block also works now - it falls back to fetching the
archive and stylesheet from their canonical addresses - but the iframe is better, because
it stays current with nothing to re-copy.

## When something is wrong on the live site

1. **Is it just cache?** Hard refresh first. Ten minutes, remember.
2. **Is the data reachable?** Open
   [data/lyceum.json](https://praxiumlearningfoundation.github.io/education-lyceum-board/data/lyceum.json)
   directly. If that loads and the board does not, it is the page. If neither loads, it is
   Pages.
3. **Did the deploy run?** The Actions tab, `pages-build-deployment`. A red run there means
   nothing published.
4. **Did the last merge break it?** Revert first, diagnose second.
5. If the page shows *"The archive could not be loaded"* with a reason, that is the board
   working correctly - it is telling you the data file could not be fetched, rather than
   showing an empty page. The reason it prints is the thing to fix.

## What is not automated, and has to stay in a person's head

- Whether a name, or a combination of details, identifies someone.
- Whether a quote is real.
- Whether a record is worth publishing at all.
- Claiming and renewing the Azure grant, which must be replied to from a shared foundation
  mailbox rather than a personal one.
- The Squarespace plan question, still open.
