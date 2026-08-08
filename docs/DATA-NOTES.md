# Data notes

Decisions and carried-forward details about the archive content itself. Anything
here that is still marked TODO needs to land before the record is considered
final.

## Carried forward from the retired `src/data/lyceum_2025_03.json`

That file was the original single-record data sketch. It has been superseded by
the `2025-03-23-education` record in the board's own data file and moved out to
`../lyceum-sources/retired-demo/lyceum_2025_03.superseded.json`.

Before archiving it, both copies were compared field by field after normalising
punctuation and stripping the dead `<a href='#'>` link wrappers. Everything in
the old file is present in the board data with two exceptions:

1. **TODO - the highlight quote was truncated.** The board data currently carries
   only the last sentence. The full quote from the original file is:

   > What does a government care about? The US government cares about taxes and
   > military. Dissolving the Department of Education shows US citizens that we
   > value education less than we think we do.

   Restore the full three-sentence version when the record is migrated to schema
   version 2, normalised to ASCII.

2. The old file's call to action read "volunteered for the Call to Action to
   research more on this inquiry"; the board data reads "volunteered to research
   more on this inquiry". Same meaning, no action needed.

The old file also contained a regression that the board data does not: it had
"under served" where the board data correctly reads "underserved". Nothing to
carry forward.

## Known source-quality issues

- **The 28 June 2026 transcript has at least one block of inverted speaker
  labels**, near the end of the session (around the closing circle). Attribution
  in that stretch cannot be taken from the labels alone; it has to be read from
  the surrounding context. Assume the same may be true elsewhere.
- **Children speak inside their parent's transcript block.** The auto-transcriber
  attributes a whole stretch to whoever the microphone identified, so a child's
  contribution appears under an adult's name. Check before attributing.
- **Names are garbled consistently.** "Praxiam" and "Paxiom" mean Praxium;
  "life scene" means Lyceum; "Aaron Gruber" is Ehren Gruber; "Shinden Yoku" is
  shinrin-yoku.

## Attribution and privacy rules for the record

- Adults are named as they are already named publicly in foundation material.
- **Minors are never named.** Their contributions are attributed to
  "a young participant". Two minors took part in the June 2026 gathering; the
  record must not identify them, their school, or their year group.
- No health details, home addresses, or family circumstances go in the record,
  even where a participant volunteered them in the circle.
- Every quote must be verified character by character against the source before
  it is committed. A quote stitched from two moments is not a quote.

## Ingestion process

Two passes, never one:

1. **Extract** the Sequence of Inquiry sections, the storyboard beats, the
   quote candidates, and the way ahead.
2. **Verify** against the source: every quote matched exactly, every attribution
   checked against context rather than labels, and a sweep for substantive
   contributions the first pass missed.

A single pass on the June 2026 transcript produced three quotes that were real
words stitched from separate moments and presented as verbatim, three
contributions credited to the wrong speaker, and missed forty-three substantive
points, most of them in the last twenty-five minutes. The second pass is not
optional.

Record the human who did the verification in the record's `provenance.reviewedBy`
field. An unreviewed record should not be published.
