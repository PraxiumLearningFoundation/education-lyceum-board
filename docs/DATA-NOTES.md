# Data notes

Decisions and carried-forward details about the archive content itself. Anything
here that is still marked TODO needs to land before the record is considered
final.

## A paraphrase is not a quote

The 2025-03-23 record carried this in its `quote` field, presented inside quotation
marks:

> What does a government care about? The US government cares about taxes and
> military. Dissolving the Department of Education shows US citizens that we value
> education less than we think we do.

**Nobody said that.** When the recording was located, it turned out to be a
note-taker's compression of about thirty-six seconds of speech (@1:02:34 to
@1:03:10) covering the IRS and taxes, the Department of Defense and the military,
and a closing thought. Accurate in substance, wrong as a set of quotation marks -
and it had been made *longer* during the schema migration, on the strength of an
older data file, which made it worse rather than better.

It is now Larry at @40:44, verified verbatim as a single contiguous cue:

> The child that doesn't get educated may be the one that can cure the common cold,
> but we don't know that because we didn't educate him or her.

The lesson generalises past this one field. **A record hand-authored from notes may
contain things nobody said**, and that is not dishonesty by whoever wrote it - notes
compress, and the compression is invisible once the recording is filed away. So:

- Never lengthen or "restore" a quote from a secondary source. If the primary source
  is not to hand, leave it short or drop it.
- A quote is publishable only if it appears as ONE CONTIGUOUS utterance in the
  recording. Check by searching for the exact string, not by reading around it.
- Where a record predates its recording, mark the quote's status explicitly rather
  than letting quotation marks imply verification.

## Named identifiers are often imported, not spoken

Comparing the 2025-03-23 record against its recording showed that three of its four
policy and application identifiers were never said aloud: **Section 256**, the
**National Defense Education Act**, and Chile's **Gratuidad**. All three are real,
all three are correct, and all three came from the note-taker's own knowledge rather
than the room.

This is genuinely valuable - a reader searching the board for "National Defense
Education Act" should find it - but it must not masquerade as something a
participant said. Enrichment of this kind belongs in a separate pass, marked as
external, keeping the spoken evidence alongside the canonical name.

## Carried forward from the retired `src/data/lyceum_2025_03.json`

That file was the original single-record data sketch. It has been superseded by
the `2025-03-23-education` record in the board's own data file and moved out to
`../lyceum-sources/retired-demo/lyceum_2025_03.superseded.json`.

Before archiving it, both copies were compared field by field after normalising
punctuation and stripping the dead `<a href='#'>` link wrappers. Everything in
the old file is present in the board data with two exceptions:

1. **RESOLVED, and it was the wrong instruction.** This note previously asked for the
   full three-sentence version of the highlight quote to be restored from the old
   file. That was done, and it was a mistake: the recording later showed the sentence
   was a note-taker's paraphrase that nobody uttered. See "A paraphrase is not a
   quote" above. The field now carries a verified verbatim line instead.

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

## Never publish the audit trail

The June 2026 ingestion produced a working record with per-item evidence snippets and
a change log explaining every correction. Every published bullet was clean. The
minors' names survived anyway - in the change log, because it quoted the correction
briefing, which quoted the transcript.

So the rule is structural rather than editorial: **the record that ships carries only
archive fields.** Evidence snippets, change logs, per-item notes, rejected-addition
lists and verification working are audit material. They stay out of the committed
file entirely, and they are not sanitised for publication, because sanitising is a
judgement that can be got wrong once per field.

Concretely, these never reach `data/lyceum.json`: `evidence`, `applied`, `notes`,
`rejected_additions`, `corroborated`, `quoteEvidence`, `alternates`.

## Identification by combination

No single field named a child. The exposure came from three that were individually
defensible: the shinrin-yoku bullet named a city, another bullet named an annual
school event, and an attendee role named a parent. City plus school plus parent
identifies a child as surely as a name does.

Check combinations, not fields. Anything removed for this reason so far:

- the city a young participant lives in
- an attendee's paternity, which was a second route to the same children
- a forward-looking travel arrangement for the two young participants
- a young participant's own words about their own school
- the school-staff role in "posters cleared with the principal" - the obstacle is
  worth recording, the role narrows it to one school
- a metro area inferred from a participant's on-screen device label rather than
  anything they said
- a serving participant's pending change of home, published alongside a deployment

## The record says what, not who

**Participants are not named in the archive.** No attribution on items, no attendee
list, no speaker names on storyboard beats, no named stewards. The record is of an
inquiry, not of who performed well in it.

This supersedes the earlier "attribute by default, anonymise by exception" policy,
which is kept below because the reasoning about *categories* still governs what may
be recorded at all. What changed is the default.

The earlier policy did not survive contact with ten more transcripts:

- **Ten further people would have been named for the first time**, without being
  asked. Some speak a great deal - one contributes 326 cues across two gatherings -
  so this was not a question about incidental mentions.
- **Naming someone in one record un-redacted them in another.** A person identified
  in one gathering made a deliberate category-level suppression in two later
  gatherings reconstructible. That is identification by combination operating across
  records rather than within one, and there is no per-record fix for it.
- **The attributions were substantially wrong anyway.** The recording platform
  credits roughly 226 cues across the corpus to the wrong person, because people
  who share a room share a connection. Correcting that is possible but it means
  publishing a confident claim about who said what, built on inference.
- **Consent was never obtained for any of it.** Nobody in these circles agreed to be
  quoted by name on a permanent public page.

What is kept, because none of it identifies anyone:

- how many were in the circle, and how many were young participants
- where people joined from, at city or country level
- the roles that are functions rather than people: "the facilitator opened", "the
  guide read the norms"
- every organisation, programme, place, book, campaign and country named in the room
- the full substance of what was said

Gendered pronouns for participants come out too. In a circle of eight, "she" plus one
detail is an identification.

### Engagement means the website, not the meeting

A related decision, and the reason the metrics view had no data source. **Engagement
is what people do on the published page** - reading, commenting, contributing - and it
is external to the gathering. It is not a measure of who spoke, or how much, during
the meeting. Any future metrics work reads from the site, never from the record.

## Superseded: when to attach a name, and when not to

The default is to name the adult who said something. Attribution is most of what
makes the archive useful: a reader can see who brought what to the circle, and
participants can see their contribution recorded. So this is not a policy of
anonymising by habit.

But a name is not free. People say things in a circle of eight that they have not
agreed to publish under their own name on the open internet, and the Lyceum
deliberately invites exactly that kind of speaking. So:

**Attribute to "a participant" when the item concerns any of these**, whoever said
it and however freely:

- a legal matter they are party to, ongoing or concluded
- immigration status, or anything that bears on it
- discrimination, racism or harassment they experienced
- health, theirs or a family member's
- a grievance, dismissal or dispute with an employer
- personal money: debts, legal costs, what something cost them
- the personal history of a first-time attendee, who has not yet had any chance
  to understand that the circle becomes a public record
- anything at all involving a minor - those stay "a young participant"

**Drop the item entirely rather than anonymising it when:**

- it identifies a person who was not in the room and cannot consent - a named
  private individual, a third party's conviction, a prospective member named by a
  friend
- the transcript is unreliable for that name. Where a source garbles proper nouns
  throughout, a name it supplies is not evidence, and publishing an allegation
  against a garbled name is indefensible
- anonymising does not actually anonymise. In a circle of eight, "a participant"
  plus a specific employer, a court, a dollar figure and a case history is one
  person. Either generalise until it is genuinely not identifying, or leave it out

**Make suppressions visible.** This is the part that is easy to get wrong in the
other direction. Removing a name is fine; silently changing a fact is not. The
2025-03-23 record lists three stewards where the recording names four, because the
fourth was a non-attendee and got dropped on a privacy rule - so the record now
says something untrue about who carried the inquiry forward. A withheld name
should leave a visible hole: "and one further steward, withheld", not a shorter
list.

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
