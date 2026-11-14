# HQ Notes

A vibe-coded website I designed in Figma to make my course notes easy to share. It brings my notes, study materials, and interactive visualizations together in one place.

This is a personal project and a study resource, built to make learning and reviewing course content a little easier.

Note browsers default to newest-created first and offer ascending/descending sorting by creation or last update. The choice is saved locally; undated notes appear last. Creation dates come from note metadata (including `Date Published`), not filesystem timestamps. After editing note metadata or adding notes to the catalog, run `node scripts/update-note-dates.mjs` to refresh the dates in `content/courses.json`.

After removing or adding content files, run `node scripts/rebuild-content.mjs` to rebuild both `content/courses.json` and `content/import-index.json` from the remaining Markdown notes and image attachments while preserving existing note URLs. This does not change the source vault.

**Accuracy disclosure:** Some content may be inaccurate or incomplete. Always fact-check anything on this site against reliable sources and official course materials.

## Credits

- The CS 61C notes are original review notes written from the public [CS 61C course notes](https://notes.cs61c.org) (Lisa Yan and CS 61C staff, CC BY-NC-ND 4.0). They are a study aid, not official course material, and do not reproduce the course notes' text or figures.
- Icons: [Lucide](https://lucide.dev) (ISC). Fonts: Montserrat, Source Serif 4, JetBrains Mono (SIL OFL) via Google Fonts. Math: KaTeX. Markdown: marked.
