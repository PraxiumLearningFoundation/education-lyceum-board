// Copy the demo recordings Playwright leaves in test-results/ into demos/ under stable,
// descriptive names. Playwright names its output folders after the test title, so the
// mapping below is by folder prefix. A demo with no mapping is copied under its folder
// name rather than dropped, and the script fails if no video was found at all.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const RESULTS = path.join(ROOT, 'test-results');
const OUT = path.join(ROOT, 'demos');
const NAMES = [
  ['demo-browse-', 'lyceum-desktop-search-democracy-timestamp-to-storyboard.webm'],
  ['demo-phone-', 'lyceum-phone-360-kids-attention-record.webm'],
];

fs.mkdirSync(OUT, { recursive: true });
const dirs = fs.existsSync(RESULTS) ? fs.readdirSync(RESULTS) : [];
let copied = 0;
for (const dir of dirs) {
  const video = path.join(RESULTS, dir, 'video.webm');
  if (!dir.startsWith('demo') || !fs.existsSync(video)) continue;
  const hit = NAMES.find(([prefix]) => dir.startsWith(prefix));
  const name = hit ? hit[1] : `${dir}.webm`;
  fs.copyFileSync(video, path.join(OUT, name));
  console.log(`demos/${name}`);
  copied += 1;
}
if (!copied) {
  console.error('No demo videos found in test-results/. Run "npm run test:e2e:demo" first.');
  process.exit(1);
}
