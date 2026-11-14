import assert from "node:assert/strict";
import test from "node:test";
import { noteTimestamp, sortNotes, noteSortOption } from "../assets/js/note-sort.js";

test("metadata dates retain time, handle ordinals and noon/midnight", () => {
  assert.equal(noteTimestamp("October 9th, 2026 - 5:05 PM"), Date.UTC(2026, 9, 9, 17, 5));
  assert.equal(noteTimestamp("November 1, 2026 - 12:00 AM"), Date.UTC(2026, 10, 1));
  assert.equal(noteTimestamp("November 1, 2026 - 12:00 PM"), Date.UTC(2026, 10, 1, 12));
  assert.equal(noteTimestamp("2026-11-14"), Date.UTC(2026, 10, 14));
  assert.equal(noteTimestamp("2026-11-14T16:30:00"), Date.UTC(2026, 10, 14, 16, 30));
  assert.equal(noteTimestamp("2026-11-14T08:30:00-08:00"), Date.UTC(2026, 10, 14, 16, 30));
});

test("missing or unusable dates remain unknown rather than guessing a year", () => {
  for (const value of [undefined, "", "Nov 14", "not a date", "February 30, 2026", "January 1, 2026 - 13:15 PM"]) {
    assert.equal(noteTimestamp(value), null, String(value));
  }
});

test("all four sort modes keep unknown dates last and ties stable without mutating input", () => {
  const notes = [
    { slug: "unknown", created: "", updated: "invalid" },
    { slug: "early", created: "October 9, 2026 - 9:00 AM", updated: "November 3, 2026" },
    { slug: "late", created: "October 9, 2026 - 5:00 PM", updated: "November 1, 2026" },
    { slug: "tie", created: "October 9, 2026 - 5:00 PM", updated: "November 1, 2026" },
  ];
  const before = structuredClone(notes);
  const slugs = (mode) => sortNotes(notes, mode).map((note) => note.slug);
  assert.deepEqual(slugs(), ["late", "tie", "early", "unknown"]);
  assert.deepEqual(slugs("created-asc"), ["early", "late", "tie", "unknown"]);
  assert.deepEqual(slugs("updated-desc"), ["early", "late", "tie", "unknown"]);
  assert.deepEqual(slugs("updated-asc"), ["late", "tie", "early", "unknown"]);
  assert.deepEqual(slugs("old-setting"), slugs());
  assert.equal(noteSortOption(null).value, "created-desc");
  assert.deepEqual(notes, before);
});
