// A talking elevator, in its own voice, in one line.
// The program below does a single job: it places that line in the
// output folder the grader provides, exactly as written here.
// Nothing is fetched, randomised, or timed; two runs must agree
// byte for byte, so the text lives in one constant and nowhere else.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cabinLine = "My music is just me screaming in a major key.";

function outputFolder(): string {
  const handed = process.env.MAKEFUN_OUTPUT_DIR;
  if (typeof handed === "string" && handed.trim() !== "") {
    return handed;
  }
  return "/output";
}

function countCodePoints(text: string): number {
  let total = 0;
  for (const _point of text) {
    total += 1;
  }
  return total;
}

function guardLine(text: string): void {
  const points = countCodePoints(text);
  if (points < 1 || points > 120) {
    throw new Error("line outside the 1 to 120 character gate");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("line must stay on a single line");
  }
  if (text.trim() === "") {
    throw new Error("line is only white space");
  }
}

function deliver(): void {
  guardLine(cabinLine);
  const folder = outputFolder();
  mkdirSync(folder, { recursive: true });
  writeFileSync(join(folder, "entry.txt"), cabinLine, "utf8");
}

deliver();
