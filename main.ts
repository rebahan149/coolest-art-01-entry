// coolest-art-01 entry for @rebahan on make.fun: "Galaxy Koi over Moonlit Waves".
// The artwork lives beside this file as entry.png (JPEG bytes, 1024x683, ~230 KB);
// this program delivers it to the grader's output directory, unchanged.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const MAX_BYTES = 1024 * 1024; // the gate's 1 MiB cap

const art = readFileSync(new URL('./entry.png', import.meta.url));
if (art.length > MAX_BYTES) {
  throw new Error(`entry image is ${art.length} bytes, over the 1 MiB gate cap`);
}
// The gate takes a whole PNG or JPEG; refuse to ship anything else.
const isPng = art.subarray(0, 4).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47]));
const isJpeg = art[0] === 0xff && art[1] === 0xd8;
if (!isPng && !isJpeg) {
  throw new Error('entry image is neither PNG nor JPEG bytes');
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.png'), art);
