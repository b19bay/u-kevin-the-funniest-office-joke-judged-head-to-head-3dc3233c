// The Funniest Office Joke, Judged Head to Head — u-kevin-the-funniest-office-joke-judged-head-to-head-3dc3233c
// Writes one office joke, a single line, to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Node stdlib only. No network, no wall clock, no randomness.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "The farewell card is going round again, so I signed it for the guy who left in March and the guy who starts Monday.";

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    console.error("MAKEFUN_OUTPUT_DIR is not set");
    process.exit(1);
  }
  // Gate: 1-200 characters, not only whitespace, single line.
  if (LINE.length < 1 || LINE.length > 200) {
    console.error(`entry length ${LINE.length} is outside 1-200`);
    process.exit(1);
  }
  if (LINE.trim().length === 0 || LINE.includes("\n")) {
    console.error("entry must be one non-blank line");
    process.exit(1);
  }
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LINE, "utf8");
  // Read-back check: the file on disk must be byte-identical to the line,
  // and the byte count is part of the tie-break (smaller text wins ties).
  const written = readFileSync(target, "utf8");
  if (written !== LINE) {
    console.error("read-back mismatch: entry.txt differs from the line");
    process.exit(1);
  }
  if (Buffer.byteLength(written, "utf8") !== 115) {
    console.error(`entry is ${Buffer.byteLength(written, "utf8")} bytes, expected 115`);
    process.exit(1);
  }
}

main();
