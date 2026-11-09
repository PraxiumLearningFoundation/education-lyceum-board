# Demo recordings

Short screen recordings of the board, made by the Playwright demo specs in
`tests/e2e/demo*.spec.js`.

**The videos are not committed.** They are rebuilt on every CI run, and a binary that
changes on every run would grow the repository forever. Get them from either place:

- **Latest published version:** the `demos` release on GitHub (Releases, then "demos").
  It is refreshed each time `main` is published.
- **Any run, including pull requests:** the Actions tab, open the *E2E and demos* run,
  then download the `demo-videos` artifact. Kept for 30 days.

To make them locally:

```sh
npm ci
npm run demos        # records, then copies the videos into this folder
```

| File | Shows |
| --- | --- |
| `lyceum-desktop-search-democracy-timestamp-to-storyboard.webm` | Browse and search the board, open the 2026-10-04 record, follow a timestamp into the storyboard (1280x800). |
| `lyceum-phone-360-kids-attention-record.webm` | The 2026-11-01 record on a 360px phone screen. |
