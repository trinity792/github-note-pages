// Rebuild both catalogs from the remaining app content. Never reads/writes the vault.
// Existing URLs and course configuration are preserved.
import { readFile, writeFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { resolve, extname, basename } from "node:path";
import { parseFrontMatter } from "../assets/js/markdown.js";
import { noteTimestamp } from "../assets/js/note-sort.js";

const content = fileURLToPath(new URL("../content/", import.meta.url));
const readJSON = async (name) => JSON.parse(await readFile(resolve(content, name), "utf8"));
const manifest = await readJSON("courses.json");
const index = {};
async function filesAt(folder) {
  const entries = await readdir(resolve(content, folder), { withFileTypes: true });
  const groups = await Promise.all(entries.map((entry) => {
    const file = `${folder}/${entry.name}`;
    return entry.isDirectory() ? filesAt(file) : [file];
  }));
  return groups.flat();
}
const types = { "Homework": "Homeworks", "Exams and Quizzes": "Exams and Quizzes", "Lecture Notes": "Lecture Notes", "Reading Notes": "Reading Notes", "Review Notes": "Review Notes", "Course Notes": "Course Notes", "Content Notes": "Content Notes" };
const excluded = (file) => /(?:^|\/)mock.*quiz/i.test(file)
  || /^soc113ac\/(?:Midterm|Lecture Notes)\//.test(file)
  || /^cs70\/Exams and Quizzes\/(?:CS70 Quiz Bank\/|Quiz[^/]*\.md$)/.test(file)
  || /^cs70\/Homework\/(?:hw00|hw01|hw07|hw08|hw09|hw10)\.md$/.test(file);
for (const course of manifest.courses) {
  const previous = new Map(course.notes.map((note) => [note.file || `${course.id}/${note.slug}.md`, note]));
  const candidates = (await filesAt(course.id)).filter((file) => extname(file) === ".md" && !excluded(file));
  const files = [];
  for (const file of candidates) {
    if ((await readFile(resolve(content, file), "utf8")).trim()) files.push(file);
  }
  // Preserve the original tie order, then append any newly added Markdown files.
  const order = new Map([...previous.keys()].map((file, i) => [file, i]));
  files.sort((a, b) => (order.get(a) ?? Infinity) - (order.get(b) ?? Infinity) || a.localeCompare(b));
  course.notes = await Promise.all(files.map(async (file) => {
    const old = previous.get(file) || {};
    const { meta } = parseFrontMatter(await readFile(resolve(content, file), "utf8"));
    const name = basename(file, ".md");
    const slug = old.slug || `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-${createHash("sha1").update(file).digest("hex").slice(0, 10)}`;
    const note = {
      ...old,
      slug,
      title: meta.title || old.title || name,
      lectures: old.lectures || "",
      created: meta.created || meta["date created"] || meta["date published"] || old.created || "",
      updated: meta.updated || meta["last updated"] || old.updated || "",
      type: old.type || types[file.split("/")[1]] || "Course Notes",
      description: meta.description || old.description || "",
      file,
      format: "md",
    };
    delete note.source;
    for (const field of ["created", "updated"]) {
      if (note[field] && noteTimestamp(note[field]) === null) throw new Error(`Invalid ${field} date in ${file}`);
    }
    return note;
  }));
  for (const note of course.notes) {
    index[note.file] = { file: note.file, key: `${course.id}/${note.slug}`, format: "md" };
  }
}
for (const file of await filesAt("attachments")) {
  const format = extname(file).slice(1).toLowerCase();
  if (!["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(format)) continue;
  index[file] = { file, format };
}
await writeFile(resolve(content, "courses.json"), JSON.stringify(manifest, null, 2) + "\n");
await writeFile(resolve(content, "import-index.json"), JSON.stringify(index, null, 2) + "\n");
console.log(`Rebuilt catalogs: ${manifest.courses.map((course) => `${course.id}: ${course.notes.length}`).join(", ")}; ${Object.keys(index).length} indexed files.`);
