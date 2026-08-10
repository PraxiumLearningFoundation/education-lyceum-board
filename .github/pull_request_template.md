<!--
  This checklist is not ceremony. Every unchecked box below corresponds to something
  that has actually gone wrong in this repository at least once - see docs/DATA-NOTES.md
  for the incident behind each. CI catches what a machine can check; the rest is here
  because only a person can check it.

  If your change does not touch the archive, delete the "Content" section.
-->

## What this changes

<!-- One or two sentences. If it closes an issue, write "Closes #123". -->

## Content

Delete this section if `data/lyceum.json` is untouched.

- [ ] **No participant is named**, anywhere, including in a field the page does not
      display. The archive records what was said, not who said it.
- [ ] **Nothing identifies a minor** - not a name, a school, a year group, a town, or a
      combination that narrows to one family.
- [ ] **Nobody's health, family circumstances, immigration circumstances, employer or
      personal finances** appear, even where they were volunteered freely in the circle.
- [ ] **Every quote is verbatim from one continuous utterance.** Not stitched from two
      moments, not tidied, not a summary inside quotation marks. Checked by searching the
      recording for the exact string.
- [ ] **No working material rides along** - no evidence snippets, change logs, chat-clock
      arithmetic, reviewer notes, or lists of what was withheld. CI checks for the shapes
      it knows; read the storyboard prose yourself.
- [ ] **`provenance.reviewedBy` names the person who checked it** against the source. An
      empty string means unreviewed, and an unreviewed record should not be published.
- [ ] I have re-read the diff for **combinations**. No single field has to name someone
      for the record to identify them: a city plus a school plus a parent's role did it
      once here, in three fields that were each defensible alone.

## If you changed the page

- [ ] `npm run build:css` has been run and `board.css` is committed. It is a vendored
      build, so a class added to `index.html` has no rule behind it until you rebuild -
      a panel shipped live and unstyled that way.
- [ ] Looked at it in a browser, not only at the diff.

## Anything a reviewer should know

<!--
  What you were unsure about, what you decided and why, what you deliberately left out.
  This is the most useful part of the form. "I removed the venue because the event plus
  the venue plus a parent narrowed it to one child" tells the next person how to think.
-->
