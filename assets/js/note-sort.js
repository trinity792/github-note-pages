export const NOTE_SORTS = [
  { value: "created-desc", label: "Created · Newest first", field: "created", direction: -1 },
  { value: "created-asc", label: "Created · Oldest first", field: "created", direction: 1 },
  { value: "updated-desc", label: "Last updated · Newest first", field: "updated", direction: -1 },
  { value: "updated-asc", label: "Last updated · Oldest first", field: "updated", direction: 1 },
];

export const noteSortOption = (value) => NOTE_SORTS.find((option) => option.value === value) || NOTE_SORTS[0];

// Compare the dates recorded in frontmatter, including times, without guessing
// missing years or using the machine's timezone for dates without a timezone.
export function noteTimestamp(value) {
  const text = String(value || "").trim().replace(/(\d)(st|nd|rd|th)\b/gi, "$1");
  if (!text) return null;
  if (/^\d{4}-\d{2}-\d{2}(?:$|T)/.test(text)) {
    const stamp = Date.parse(text.length === 10 ? text + "T00:00:00Z" : /(?:Z|[+-]\d{2}:?\d{2})$/i.test(text) ? text : text + "Z");
    return Number.isFinite(stamp) ? stamp : null;
  }
  const match = /^([a-z]+) (\d{1,2}),? (\d{4})(?:\s+(?:-\s*)?(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?)?$/i.exec(text);
  if (!match) return null;
  const month = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"].indexOf(match[1].slice(0, 3).toLowerCase());
  const day = Number(match[2]), year = Number(match[3]), minute = Number(match[5] || 0), second = Number(match[6] || 0);
  let hour = Number(match[4] || 0);
  if (month < 0 || minute > 59 || second > 59 || hour > (match[7] ? 12 : 23) || (match[7] && hour < 1)) return null;
  if (match[7]) hour = hour % 12 + (match[7].toUpperCase() === "PM" ? 12 : 0);
  const stamp = Date.UTC(year, month, day, hour, minute, second);
  const date = new Date(stamp);
  return date.getUTCMonth() === month && date.getUTCDate() === day ? stamp : null;
}

export function sortNotes(notes, value = "created-desc") {
  const { field, direction } = noteSortOption(value);
  return notes.map((note, index) => ({ note, index, time: noteTimestamp(note[field]) }))
    .sort((a, b) => {
      if (a.time === null && b.time !== null) return 1;
      if (b.time === null && a.time !== null) return -1;
      return (a.time !== null && b.time !== null ? direction * (a.time - b.time) : 0) || a.index - b.index;
    }).map(({ note }) => note);
}
