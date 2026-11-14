// Run after adding/updating note metadata: node scripts/update-note-dates.mjs
// Only updates the app catalog; copied notes and the source vault stay untouched.
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { parseFrontMatter } from "../assets/js/markdown.js";
import { noteTimestamp } from "../assets/js/note-sort.js";

const content = fileURLToPath(new URL("../content/", import.meta.url));
const manifestPath = resolve(content, "courses.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
let createdCount = 0, updatedCount = 0;
for (const course of manifest.courses) {
  for (const note of course.notes) {
    const path = note.file || `${course.id}/${note.slug}.md`;
    const { meta } = path.endsWith(".md") ? parseFrontMatter(await readFile(resolve(content, path), "utf8")) : { meta: {} };
    note.created = meta.created || meta["date created"] || meta["date published"] || "";
    note.updated = meta.updated || meta["last updated"] || note.updated || "";
    for (const field of ["created", "updated"]) {
      if (note[field] && noteTimestamp(note[field]) === null) throw new Error(`Unrecognized ${field} date in ${path}: ${note[field]}`);
    }
    if (note.created) createdCount++;
    if (note.updated) updatedCount++;
  }
}
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(`Catalog dates updated: ${createdCount} created, ${updatedCount} last updated.`);
