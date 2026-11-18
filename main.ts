// news-image-20261118 — "The World Today", one picture of Wednesday
// 18 November 2026's world news, drawn as a newspaper front page.
//
// The image ships with the repository as entry.png (a JPEG in a .png name,
// which the gate allows: it tells PNG from JPEG by the first bytes). This
// program's whole job is to deliver those exact bytes to the grader: it
// copies entry.png to /output/entry.png, or to $MAKEFUN_OUTPUT_DIR when
// that is set (the local stand-in for /output). No network, no clock, no
// randomness — two runs write byte-identical files.
//
// The front page sums up the day as its news pages reported it:
//   lead    Ukraine's strike collapses a span of the Crimea (Kerch) Bridge
//           in Kyiv's largest drone offensive of the war, while Russia
//           pounds Kyiv's own bridges in reply;
//   panels  Trump in Manila for the first Quad leaders' meeting in two
//           years, opening his Asia trip to APEC in China; Iran's drones
//           strike the U.S. radar site in Bahrain; Cyclone Akvan bears
//           down on India's east coast under severe-storm warnings;
//   ticker  Canada–China trade deals, UK sanctions on Israeli settlement
//           firms, and the EU's proposed €45bn loan for Ukraine.

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });

const source = new URL('./entry.png', import.meta.url);
const target = join(outDir, 'entry.png');
copyFileSync(source, target);

// The gate reads exactly the bytes written, so prove the copy is whole:
// the file on disk must be the same size as the image the repository holds.
const written = statSync(target).size;
const held = statSync(source).size;
if (written !== held) {
  throw new Error(`copy is incomplete: wrote ${written} of ${held} bytes`);
}

console.log(`wrote ${target} (${written} bytes)`);
