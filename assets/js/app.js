// HQ Notes — a small hash-routed notes browser.
// Routes:  #/  (overview)   #/all  #/pinned   #/c/<course>   #/n/<course>/<slug>[/<heading-id>]
import { icon } from "./icons.js";
import { renderMarkdown, plainText } from "./markdown.js";
import { mountWidgets } from "./widgets/index.js";
import { contentURL, createVaultResolver, resolveVaultLinks } from "./vault-links.js";
import { noteTree, noteStatus, attachCourseGrids, attachCourseCarousels } from "./navigation.js";
import { NOTE_SORTS, noteSortOption, sortNotes } from "./note-sort.js";

const app = document.getElementById("app");
const root = document.documentElement;
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const store = {
  get(key, fallback) { try { return JSON.parse(localStorage.getItem("hq." + key)) ?? fallback; } catch { return fallback; } },
  set(key, value) { try { localStorage.setItem("hq." + key, JSON.stringify(value)); } catch { /* private mode */ } },
};

let manifest = null;
let resolveVaultLink = null;
let filterCourse = "all";
let noteSort = noteSortOption(store.get("noteSort", "created-desc")).value;
const noteCache = new Map();

/* ───────── data helpers ───────── */
const courses = () => manifest.courses;
const course = (id) => courses().find((c) => c.id === id);
const allNotes = () => courses().flatMap((c) => c.notes.map((n) => ({ ...n, course: c, key: `${c.id}/${n.slug}` })));
const findNote = (key) => allNotes().find((n) => n.key === key);
const pins = () => store.get("pins", []);
const noteHref = (n) => `#/n/${n.key}`;

async function loadNote(key) {
  if (!noteCache.has(key)) {
    const note = findNote(key);
    if (note?.format && note.format !== "md") {
      return `[Open ${note.format.toUpperCase()} file](${contentURL(note.file)})`;
    }
    noteCache.set(key, fetch(contentURL(note?.file || `${key}.md`)).then((r) => {
      if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
      return r.text();
    }));
  }
  return noteCache.get(key);
}

/* ───────── shared bits of UI ───────── */
const chip = (type, compact) => {
  const palette = /homework/i.test(type) ? "carrot" : /exam|quiz/i.test(type) ? "honey" : /reading/i.test(type) ? "sky" : /review/i.test(type) ? "sea-green" : /course|content/i.test(type) ? "grape" : "baltic";
  return `<span class="chip${compact ? " compact" : ""}" style="--cb:var(--sup-${palette}-bg);--cf:var(--sup-${palette}-fg);--ct:var(--sup-${palette}-text)">${esc(type)}</span>`;
};
const shortDate = (value) => {
  if (!value) return "";
  const date = new Date(String(value).replace(/(\d)(st|nd|rd|th)\b/g, "$1").split(" - ")[0]);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};
const statusChip = (value) => {
  const status = noteStatus(value);
  return `<span class="status ${status === "Complete" ? "done" : status === "Draft" ? "idle" : ""}">${status}</span>`;
};

function card(n) {
  return `<a class="card" href="${noteHref(n)}">
    <div class="card-top"><span class="card-title">${esc(n.title)}</span>${chip(n.type, true)}</div>
    <p class="card-desc">${esc(n.description)}</p>
    <div class="card-meta">${n.updated ? `<span title="${esc(n.updated)}">Updated: ${esc(shortDate(n.updated))}</span>` : ""}${n.created ? `<span title="${esc(n.created)}">Created: ${esc(shortDate(n.created))}</span>` : ""}<span class="bucket" style="color: var(--sup-${n.course.color}-text)">${esc(n.course.code)}</span></div>
  </a>`;
}

function row(n) {
  const pinned = pins().includes(n.key);
  return `<a class="t-row" href="${noteHref(n)}">
    <span class="t-pin">${pinned ? icon("pin", 14) : ""}</span>
    <span class="t-main"><span class="t">${esc(n.title)}</span><span class="p">${esc(n.description)}</span></span>
    <span class="t-type">${chip(n.type, true)}</span>
    <span class="t-bucket" style="color: var(--sup-${n.course.color}-text)">${esc(n.course.code)}</span>
    <span class="t-lec">${icon("folder", 12)}${esc(n.lectures)}</span>
    <span class="t-upd" title="${esc(n[noteSortOption(noteSort).field] || "Date unavailable")}">${esc(shortDate(n[noteSortOption(noteSort).field]) || "—")}</span>
  </a>`;
}

const tableHead = () => `<div class="t-head"><span class="t-pin"></span><span class="t-main">Note</span><span class="t-type">Type</span><span class="t-bucket">Course</span><span class="t-lec">Lectures</span><span class="t-upd">${noteSortOption(noteSort).field === "created" ? "Created" : "Updated"}</span></div>`;

/* ───────── search ───────── */
let searchIndex = null;
function buildIndex() {
  // Memoize the promise so several keystrokes share one fetch of the notes.
  searchIndex ||= (async () => {
    const notes = allNotes();
    const texts = await Promise.all(notes.map((n) => loadNote(n.key).catch(() => "")));
    return notes.map((n, i) => {
      const src = texts[i];
      const headings = [...src.matchAll(/^#{2,4}\s+(.+)$/gm)].map((m) => m[1].replace(/[`*$]/g, ""));
      return { n, headings, text: plainText(src) };
    });
  })();
  return searchIndex;
}

function attachSearch(wrap, alignRight) {
  const input = wrap.querySelector("input");
  let box = null;
  const close = () => { box?.remove(); box = null; };
  const run = async () => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 2) return close();
    const idx = await buildIndex();
    if (input.value.trim().toLowerCase() !== q) return;
    const hits = [];
    for (const it of idx) {
      if (it.n.title.toLowerCase().includes(q)) hits.push({ n: it.n, sub: it.n.description, rank: 0 });
      for (const hd of it.headings) {
        if (hd.toLowerCase().includes(q)) hits.push({ n: it.n, sub: "§ " + hd, rank: 1, heading: hd });
      }
      const at = it.text.toLowerCase().indexOf(q);
      if (at >= 0) hits.push({ n: it.n, sub: "…" + it.text.slice(Math.max(0, at - 30), at + 70) + "…", rank: 2 });
    }
    hits.sort((a, b) => a.rank - b.rank);
    close();
    box = document.createElement("div");
    box.className = "search-results" + (alignRight ? " right" : "");
    const mark = (s) => esc(s).replace(new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "ig"), (m) => `<mark>${m}</mark>`);
    box.innerHTML = hits.length
      ? hits.slice(0, 12).map((hit) => {
          const anchor = hit.heading ? "/" + hit.heading.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 64) : "";
          return `<a href="${noteHref(hit.n)}${anchor}"><div class="r-title">${esc(hit.n.title)} <span style="color:var(--text-caption);font-weight:400">· ${esc(hit.n.course.code)}</span></div><div class="r-sub">${mark(hit.sub)}</div></a>`;
        }).join("")
      : `<div class="empty">No matches for “${esc(q)}”.</div>`;
    wrap.appendChild(box);
  };
  let timer;
  input.addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(run, 120); });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { input.value = ""; close(); input.blur(); }
    if (e.key === "Enter" && box) { box.querySelector("a")?.click(); }
  });
  input.addEventListener("focus", run);
  document.addEventListener("click", (e) => { if (!wrap.contains(e.target)) close(); });
  wrap.addEventListener("click", (e) => { if (e.target.closest("a")) { input.value = ""; close(); } });
}

const searchField = (placeholder) => `<label class="search">${icon("search", 14)}<input type="search" placeholder="${placeholder}" aria-label="${placeholder}" autocomplete="off" spellcheck="false"><kbd>/</kbd></label>`;

/* ───────── sidebar ───────── */
function renderSidebar(route) {
  const cur = route.name === "note" ? route.course : route.name === "course" ? route.course : null;
  const expanded = store.get("folders", {});
  let branchId = 0;
  const activeNote = route.name === "note" ? findNote(`${route.course}/${route.slug}`) : null;
  const toggle = (key, label, open, id, full = false) => `<button class="${full ? "sb-item sb-folder" + (activeNote?.file?.startsWith(key + "/") ? " active" : "") : "sb-toggle"}" data-folder="${esc(key)}" aria-expanded="${open}" aria-controls="${id}" aria-label="${esc(label)}">${icon("chevron-right", 14, "chev")}${full ? `<span class="lbl">${esc(label)}</span>` : ""}</button>`;
  const children = (tree, c, path = c.id) => {
    const folders = [...tree.folders].map(([name, branch]) => {
      const key = `${path}/${name}`;
      const open = !!expanded[key] || !!activeNote?.file?.startsWith(key + "/");
      const id = `sb-branch-${branchId++}`;
      return `<div class="sb-branch">${toggle(key, name, open, id, true)}<div id="${id}" class="sb-children" ${open ? "" : "hidden"}>${children(branch, c, key)}</div></div>`;
    }).join("");
    const notes = path === "cs70/Course Notes"
      ? [...tree.notes].sort((a, b) => a.title.localeCompare(b.title, "en", { numeric: true, sensitivity: "base" }))
      : sortNotes(tree.notes, noteSort);
    return folders + notes.map((n) => `<a class="sb-item" href="#/n/${c.id}/${n.slug}" title="${esc(n.title)}" ${activeNote?.key === `${c.id}/${n.slug}` ? 'aria-current="page"' : ""}>${icon("sticky-note", 14, "note-icon")}<span class="lbl">${esc(n.title)}</span></a>`).join("");
  };
  const side = document.createElement("aside");
  side.className = "sidebar";
  side.setAttribute("aria-label", "Notes navigation");
  side.innerHTML = `
    <div class="sb-header">
      <a class="sb-logo" href="#/" aria-label="Home">${esc(manifest.site.logo)}</a>
      <span class="sb-title">${esc(manifest.site.title)}</span>
      <button class="sb-iconbtn" data-act="sidebar" title="Collapse sidebar" aria-label="Collapse sidebar">${icon("panel-left", 16)}</button>
    </div>
    <div class="sb-group">
      ${searchField("Search notes…")}
      <div style="height:6px"></div>
      <a class="sb-item" href="#/" ${route.name === "overview" ? 'aria-current="page"' : ""}>${icon("house", 16)}<span class="lbl">Home</span></a>
    </div>
    <div class="sb-group sb-scroll">
      <div class="sb-label">Courses</div>
      ${courses().map((c) => {
        if (c.status !== "active") {
          return `<div class="sb-item soon" title="${esc(c.name)} — coming soon">${icon(c.icon, 16, "c-" + c.color)}<span class="lbl">${esc(c.code)}</span><span class="soon-tag">Soon</span></div>`;
        }
        const open = cur === c.id || !!expanded[c.id];
        const id = `sb-branch-${branchId++}`;
        return `<div class="sb-branch"><div class="sb-course${cur === c.id ? " active" : ""}">
            ${toggle(c.id, `${c.code} folders`, open, id)}
            <a class="sb-item" href="#/c/${c.id}" title="${esc(c.name)}" ${route.name === "course" && cur === c.id ? 'aria-current="page"' : ""}>${icon(c.icon, 16, "c-" + c.color)}<span class="lbl">${esc(c.code)}</span><span class="count">${c.notes.length}</span></a>
          </div><div id="${id}" class="sb-children" ${open ? "" : "hidden"}>${children(noteTree(c.notes, c.id), c)}</div></div>`;
      }).join("")}
    </div>
    <div class="sb-footer">
      <span class="who">${esc(manifest.site.term)}</span>
      <button class="sb-iconbtn" data-act="theme" title="Toggle theme" aria-label="Toggle light or dark theme">${icon(root.dataset.theme === "light" ? "moon" : "sun", 16)}</button>
    </div>`;
  side.addEventListener("click", (event) => {
    const button = event.target.closest("[data-folder]");
    if (!button) return;
    const open = button.getAttribute("aria-expanded") !== "true";
    button.setAttribute("aria-expanded", String(open));
    side.querySelector(`#${button.getAttribute("aria-controls")}`).hidden = !open;
    expanded[button.dataset.folder] = open;
    store.set("folders", expanded);
  });
  attachSearch(side.querySelector(".search"));
  return side;
}

/* ───────── notes browser (overview / lists) ───────── */
function renderBrowse(route) {
  const main = document.createElement("main");
  main.className = "main";
  const active = courses().filter((c) => c.status === "active");
  const inFilter = (n) => filterCourse === "all" || n.course.id === filterCourse;
  const pinned = sortNotes(pins().map(findNote).filter(Boolean).filter(inFilter), noteSort);
  const view = route.name;

  const tabs = [`<button class="type-tab" data-course="all" aria-pressed="${filterCourse === "all"}"><span class="dia"></span>All <span class="n">${allNotes().length}</span></button>`]
    .concat(courses().map((c) => `<button class="type-tab" data-course="${c.id}" aria-pressed="${filterCourse === c.id}" ${c.status === "active" ? "" : "disabled title='Coming soon'"}><span class="dia"></span>${esc(c.code)} <span class="n">${c.status === "active" ? c.notes.length : "soon"}</span></button>`));

  const sectionHead = (title, n, link) => `<div class="section-head"><h2>${title}</h2><span class="n">${n}</span><span class="spacer"></span>${link || ""}</div>`;
  let body = "";

  if (view === "overview") {
    body += `<section class="section">${sectionHead("Courses", courses().length)}
      <div class="folders">${courses().map((c) => {
        const inner = `<span class="course-symbol">${icon(c.icon, 32)}</span><span class="name">${esc(c.code)}</span><span class="sub">${c.status === "active" ? c.notes.length + " notes" : "Coming soon"}</span>`;
        const style = `style="--f: var(--sup-${c.color}-bg); --fi: var(--sup-${c.color}-fg)"`;
        return c.status === "active" ? `<a class="folder" href="#/c/${c.id}" title="${esc(c.name)}" ${style}>${inner}</a>` : `<div class="folder soon" title="${esc(c.name)}" ${style}>${inner}</div>`;
      }).join("")}</div></section>`;
    if (pinned.length) body += `<section class="section">${sectionHead("Pinned Notes", pinned.length, '<a class="link" href="#/pinned">See all</a>')}<div class="cards">${pinned.slice(0, 3).map((n) => card(n)).join("")}</div></section>`;
    for (const c of active.filter((x) => filterCourse === "all" || x.id === filterCourse)) {
      const list = sortNotes(allNotes().filter((n) => n.course.id === c.id), noteSort);
      body += `<section class="section">${sectionHead(`${esc(c.code)} · Notes`, list.length, `<a class="link" href="#/c/${c.id}">View course</a>`)}<div class="cards">${list.map((n) => card(n)).join("")}</div></section>`;
    }
  } else if (view === "course") {
    const list = allNotes().filter((n) => n.course.id === route.course);
    const types = [...new Set(list.map((n) => n.type))];
    body += list.length
      ? types.map((type, index) => {
          const group = sortNotes(list.filter((n) => n.type === type), noteSort);
          if (types.length > 1) {
            const id = `course-carousel-${index}`;
            const controls = `<div class="carousel-controls"><button class="iconbtn" data-slide="previous" aria-controls="${id}" aria-label="Previous ${esc(type)}">${icon("chevron-left", 14)}</button><button class="iconbtn" data-slide="next" aria-controls="${id}" aria-label="Next ${esc(type)}">${icon("chevron-right", 14)}</button></div>`;
            return `<section class="section carousel-section">${sectionHead(esc(type), group.length, controls)}<div class="cards carousel" id="${id}" data-course-carousel role="region" aria-roledescription="carousel" aria-label="${esc(type)}" tabindex="0">${group.map((n) => card(n)).join("")}</div></section>`;
          }
          return `<section class="section">${sectionHead(esc(type), group.length)}<div class="cards" id="course-grid-${index}" data-course-grid>${group.map((n) => card(n)).join("")}</div><div class="grid-footer"><span class="grid-count" aria-live="polite"></span><button class="show-more" aria-controls="course-grid-${index}" aria-label="Show more ${esc(type)}">Show more</button></div></section>`;
        }).join("")
      : `<div class="empty-state"><b>No notes here yet</b></div>`;
  } else {
    const groups = view === "pinned" ? [["Pinned", pinned]]
      : [["All Notes", sortNotes(allNotes().filter(inFilter), noteSort)]];
    const empties = {
      pinned: "<b>No pinned notes yet</b>Open a note and use the pin button in the top bar to keep it here.",
    };
    body += `<div class="table">${tableHead()}${groups.map(([name, list]) => list.length
      ? `<div class="t-group">${icon("chevron-down", 14)}<span style="color:var(--text);font-weight:500">${esc(name)}</span><span>${list.length}</span></div>${list.map(row).join("")}`
      : `<div class="empty-state" style="margin-top:16px">${empties[view] || "<b>No notes here yet</b>"}</div>`).join("")}</div>`;
  }

  const title = route.name === "course" ? course(route.course)?.code || "Notes" : "Notes";
  main.innerHTML = `<div class="browse">
    <header class="page-header">
      <div class="title-row">
        <button class="iconbtn sb-open" data-act="sidebar" aria-label="Open sidebar">${icon("menu", 16)}</button>
        <span class="marker"></span><h1 class="page-title">${esc(title)}</h1><span class="spacer"></span>
        ${searchField("Search notes…")}
      </div>
      ${route.name === "course" ? `<div class="type-tabs"><span class="type-tab" aria-pressed="true"><span class="dia"></span>${esc(course(route.course)?.name || "")}</span></div>` : `<div class="type-tabs">${tabs.join("")}</div>`}
      <svg class="connector" viewBox="0 0 17.75 20.75" fill="none" aria-hidden="true"><path d="M0.75 0V15C0.75 18.3333 2.41667 20 5.75 20H17.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    </header>
    <div class="toolbar">
      <div class="seg soft" role="tablist">
        ${[["overview", "Overview", "#/"], ["all", "All Notes", "#/all"], ["pinned", "Pinned", "#/pinned"]]
          .map(([id, label, href]) => `<button role="tab" data-href="${href}" aria-pressed="${view === id || (id === "all" && view === "course")}">${label}</button>`).join("")}
      </div>
      <label class="note-sort">Sort by
        <select aria-label="Sort notes" title="Notes with no date appear last">
          ${NOTE_SORTS.map(({ value, label }) => `<option value="${value}" ${value === noteSort ? "selected" : ""}>${label}</option>`).join("")}
        </select>
      </label>
    </div>
    <div class="sections">${body}</div>
  </div>`;

  main.querySelectorAll(".type-tab[data-course]").forEach((b) => b.addEventListener("click", () => { filterCourse = b.dataset.course; render(); }));
  main.querySelectorAll("[data-href]").forEach((b) => b.addEventListener("click", () => { location.hash = b.dataset.href; }));
  main.querySelector(".note-sort select").addEventListener("change", (event) => {
    noteSort = noteSortOption(event.target.value).value;
    store.set("noteSort", noteSort);
    render();
    app.querySelector(".note-sort select")?.focus({ preventScroll: true });
  });
  attachSearch(main.querySelector(".search"), true);
  return main;
}

/* ───────── note page ───────── */
function renderNote(route) {
  const key = `${route.course}/${route.slug}`;
  const n = findNote(key);
  const main = document.createElement("main");
  main.className = "main note-main";
  const c = course(route.course);
  const list = c ? sortNotes(c.notes, noteSort) : [];
  const i = list.findIndex((x) => x.slug === route.slug);
  const isPinned = () => pins().includes(key);

  main.innerHTML = `
    <div class="topbar">
      <button class="iconbtn sb-open" data-act="sidebar" aria-label="Open sidebar">${icon("menu", 16)}</button>
      <nav class="crumbs" aria-label="Breadcrumb">
        <a href="#/">Notes</a><span class="sep">${icon("chevron-right", 12)}</span>
        <a href="#/c/${esc(route.course)}">${esc(c?.code || route.course)}</a><span class="sep">${icon("chevron-right", 12)}</span>
        <span class="cur">${esc(n?.title || route.slug)}</span>
      </nav>
      <span class="spacer"></span>
      <button class="iconbtn" data-act="pin" aria-pressed="${isPinned()}" title="Pin note" aria-label="Pin note">${icon("pin", 16)}</button>
      <button class="iconbtn" data-act="right" title="Toggle contents" aria-label="Toggle contents panel">${icon("list-tree", 16)}</button>
    </div>
    <div class="note-wrap">
      <div class="scroll"><article class="note"><div class="loading">Loading…</div></article></div>
      <aside class="right" aria-label="Note sidebar">
        <div class="tabbar" role="tablist">
          <button class="tabbtn" role="tab" data-tab="toc" aria-selected="true" title="Contents" aria-label="Contents">${icon("list-tree", 16)}</button>
          <button class="tabbtn" role="tab" data-tab="props" aria-selected="false" title="Properties" aria-label="Properties">${icon("info", 16)}</button>
          <span class="spacer"></span>
          <button class="tabbtn" data-act="right" title="Collapse sidebar" aria-label="Collapse contents panel">${icon("panel-right-close", 16)}</button>
        </div>
        <div class="pane" data-pane="toc"><nav class="toc" aria-label="Table of contents"></nav></div>
        <div class="pane" data-pane="props" hidden></div>
      </aside>
    </div>`;

  const article = main.querySelector(".note");
  const scroll = main.querySelector(".scroll");
  const tocEl = main.querySelector(".toc");
  const propsEl = main.querySelector('[data-pane="props"]');

  main.addEventListener("click", (event) => {
    const b = event.target.closest("[data-font]");
    if (!b) return;
    root.dataset.font = b.dataset.font; store.set("font", b.dataset.font);
    try { localStorage.setItem("hq.font", b.dataset.font); } catch { /* ignore */ }
    main.querySelectorAll("[data-font]").forEach((x) => x.setAttribute("aria-pressed", x === b));
  });
  main.querySelector('[data-act="pin"]').addEventListener("click", (e) => {
    const cur = pins();
    store.set("pins", isPinned() ? cur.filter((k) => k !== key) : [key, ...cur]);
    e.currentTarget.setAttribute("aria-pressed", isPinned());
  });
  main.querySelectorAll("[data-tab]").forEach((b) => b.addEventListener("click", () => {
    main.querySelectorAll("[data-tab]").forEach((x) => x.setAttribute("aria-selected", x === b));
    main.querySelectorAll("[data-pane]").forEach((p) => { p.hidden = p.dataset.pane !== b.dataset.tab; });
  }));

  if (!n) {
    article.innerHTML = `<div class="error-box"><b>Note not found.</b><br><a href="#/" style="color:var(--primary-text)">Back to all notes</a></div>`;
    return main;
  }


  loadNote(key).then(async (src) => {
    const { el, meta, toc } = renderMarkdown(src);
    if (resolveVaultLink) resolveVaultLinks(el, n.file || `${key}.md`, resolveVaultLink);
    if (n.format === "pdf") {
      const preview = document.createElement("iframe");
      preview.src = contentURL(n.file);
      preview.title = n.title;
      preview.style.cssText = "width:100%;height:75vh;border:0";
      el.appendChild(preview);
    }
    const prev = list[i - 1], next = list[i + 1];
    article.innerHTML = `
      <header class="note-header">
        ${chip(n.type)}
        <h1 class="note-title">${esc(n.title)}</h1>
        <div class="props">
          ${meta["date published"] ? `<span class="p">${icon("calendar-days", 14)}Created ${esc(shortDate(meta["date published"]))}</span>` : n.lectures ? `<span class="p">${icon("calendar-days", 14)}Lectures ${esc(n.lectures.replace(/L/g, ""))}</span>` : ""}
          ${n.updated ? `<span class="p">${icon("clock", 14)}Updated ${esc(shortDate(n.updated))}</span>` : ""}
          ${statusChip(meta.status)}
          <span style="color: var(--sup-${c.color}-text)">${esc(c.code)}</span>
        </div>
        <div class="divider"></div>
      </header>`;
    article.appendChild(el);
    const nav = document.createElement("nav");
    nav.className = "note-nav";
    nav.innerHTML = `${prev ? `<a class="prev" href="#/n/${c.id}/${prev.slug}"><span class="k">← Previous</span><span class="v">${esc(prev.title)}</span></a>` : ""}
      ${next ? `<a class="next" href="#/n/${c.id}/${next.slug}"><span class="k">Next →</span><span class="v">${esc(next.title)}</span></a>` : ""}`;
    article.appendChild(nav);

    // Contents
    tocEl.innerHTML = `<a class="h1" href="#" data-id=""><span class="l">${esc(n.title)}</span></a>` + toc.map((t) =>
      `<a class="h${t.level}" href="#" data-id="${t.id}">${'<span class="g"></span>'.repeat(t.level - 1)}<span class="l">${esc(t.text)}</span></a>`).join("");
    const links = [...tocEl.querySelectorAll("a")];
    const heads = toc.map((t) => el.querySelector("#" + CSS.escape(t.id)));
    const goTo = (id, smooth = true) => {
      const target = id ? el.querySelector("#" + CSS.escape(id)) : null;
      scroll.scrollTo({ top: target ? target.getBoundingClientRect().top - scroll.getBoundingClientRect().top + scroll.scrollTop - 16 : 0, behavior: smooth ? "smooth" : "auto" });
      history.replaceState(null, "", `#/n/${key}${id ? "/" + id : ""}`);
      if (innerWidth <= 1180) app.dataset.right = "closed";
    };
    tocEl.addEventListener("click", (e) => { const a = e.target.closest("a"); if (a) { e.preventDefault(); goTo(a.dataset.id); } });
    el.addEventListener("click", (e) => { const a = e.target.closest("a.anchor"); if (a) { e.preventDefault(); goTo(a.dataset.anchor); } });
    let ticking = false;
    const spy = () => {
      ticking = false;
      const top = scroll.getBoundingClientRect().top + 96;
      let cur = 0;
      heads.forEach((hd, k) => { if (hd && hd.getBoundingClientRect().top <= top) cur = k + 1; });
      links.forEach((a, k) => a.classList.toggle("active", k === cur));
      const act = links[cur];
      if (act && !tocEl.closest(".pane").hidden) {
        const pane = tocEl.closest(".pane"), r = act.getBoundingClientRect(), pr = pane.getBoundingClientRect();
        if (r.top < pr.top + 8 || r.bottom > pr.bottom - 8) pane.scrollTop += r.top - pr.top - pr.height / 2;
      }
    };
    scroll.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(spy); } }, { passive: true });

    // Properties
    const list2 = (v) => (v || "").split(";").map((x) => x.trim()).filter(Boolean);
    propsEl.innerHTML = `<div class="prop-list">
        <div class="prop-row"><span class="k">Course</span><span class="v">${esc(c.code)} — ${esc(c.name)}</span></div>
        <div class="prop-row"><span class="k">Type</span><span class="v">${chip(n.type, true)}</span></div>
        <div class="prop-row"><span class="k">Lectures</span><span class="v">${esc(n.lectures)}</span></div>
        <div class="prop-row"><span class="k">Status</span><span class="v">${statusChip(meta.status)}</span></div>
        <div class="prop-row"><span class="k">Updated</span><span class="v">${esc(meta["last updated"] || n.updated)}</span></div>
        ${meta.priority ? `<div class="prop-row"><span class="k">Exam weight</span><span class="v">${esc(meta.priority)}</span></div>` : ""}
      </div>
      ${list2(meta.sources).length ? `<div class="prop-h">Synthesized from</div><div class="prop-list"><div class="prop-row"><span class="v">${list2(meta.sources).map((x) => `<span class="tag">${esc(x)}</span>`).join("")}</span></div></div>` : ""}
      ${list2(meta.practice).length ? `<div class="prop-h">Past-exam practice</div><div class="prop-list"><div class="prop-row"><span class="v">${list2(meta.practice).map((x) => `<span class="tag">${esc(x)}</span>`).join("")}</span></div></div>` : ""}
      <div class="prop-h">Reading font</div><div class="seg font-toggle" aria-label="Reading font"><button data-font="sans" aria-pressed="${root.dataset.font !== "serif"}">Sans</button><button data-font="serif" aria-pressed="${root.dataset.font === "serif"}">Serif</button></div>`;

    await mountWidgets(el);
    if (route.anchor) requestAnimationFrame(() => goTo(route.anchor, false));
    spy();
  }).catch((err) => {
    article.innerHTML = `<div class="error-box"><b>Couldn’t load this note.</b><br>${esc(err.message)}<br><br>If you opened the file directly, serve the folder instead: <code>python3 -m http.server</code></div>`;
  });
  return main;
}

/* ───────── router ───────── */
function parseRoute() {
  const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean).map(decodeURIComponent);
  if (parts[0] === "n" && parts[1] && parts[2]) return { name: "note", course: parts[1], slug: parts[2], anchor: parts[3] };
  if (parts[0] === "c" && parts[1]) return { name: "course", course: parts[1] };
  if (["all", "pinned"].includes(parts[0])) return { name: parts[0] };
  return { name: "overview" };
}

let lastKey = "";
let detachCourseGrids = () => {};
function render() {
  const route = parseRoute();
  const viewKey = route.name === "note" ? `n/${route.course}/${route.slug}` : route.name + (route.course || "");
  // Same note, different anchor → just scroll; don't rebuild the page.
  if (route.name === "note" && viewKey === lastKey && document.querySelector(".note .md")) {
    const target = route.anchor && document.getElementById(route.anchor);
    const sc = document.querySelector(".scroll");
    if (target && sc) sc.scrollTo({ top: target.getBoundingClientRect().top - sc.getBoundingClientRect().top + sc.scrollTop - 16, behavior: "smooth" });
    return;
  }
  lastKey = viewKey;
  app.dataset.view = route.name === "note" ? "note" : "browse";
  app.dataset.drawer = "closed";
  if (innerWidth <= 1180) app.dataset.right = "closed";
  const scrim = document.createElement("div");
  scrim.className = "scrim";
  scrim.addEventListener("click", () => { app.dataset.drawer = "closed"; if (innerWidth <= 1180) app.dataset.right = "closed"; });
  detachCourseGrids();
  app.replaceChildren(renderSidebar(route), route.name === "note" ? renderNote(route) : renderBrowse(route), scrim);
  const detachGrids = attachCourseGrids(app);
  const detachCarousels = attachCourseCarousels(app);
  detachCourseGrids = () => { detachGrids(); detachCarousels(); };
  const n = route.name === "note" ? findNote(`${route.course}/${route.slug}`) : null;
  document.title = n ? `${n.title} · ${n.course.code} · ${manifest.site.title}` : manifest.site.title;
}

app.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-act]");
  if (!btn) return;
  const act = btn.dataset.act;
  if (act === "sidebar") {
    if (innerWidth <= 860) app.dataset.drawer = app.dataset.drawer === "open" ? "closed" : "open";
    else { app.dataset.sidebar = app.dataset.sidebar === "closed" ? "open" : "closed"; store.set("sidebar", app.dataset.sidebar); }
  } else if (act === "theme") {
    const t = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = t;
    try { localStorage.setItem("hq.theme", t); } catch { /* ignore */ }
    btn.innerHTML = icon(t === "light" ? "moon" : "sun", 16);
    document.dispatchEvent(new CustomEvent("themechange"));
  } else if (act === "right") {
    app.dataset.right = app.dataset.right === "open" || (app.dataset.right !== "closed" && innerWidth > 1180) ? "closed" : "open";
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "/" && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || "")) {
    e.preventDefault();
    if (innerWidth <= 860) app.dataset.drawer = "open";
    (document.querySelector(".page-header .search input") || document.querySelector(".sidebar .search input"))?.focus();
  }
});

async function start() {
  for (let i = 0; i < 200 && !(window.marked && window.katex); i++) await new Promise((r) => setTimeout(r, 25));
  try {
    manifest = await (await fetch("content/courses.json")).json();
    const response = await fetch("content/import-index.json");
    if (!response.ok) throw new Error("Couldn’t load note links.");
    resolveVaultLink = createVaultResolver(await response.json());
  } catch (err) {
    app.innerHTML = `<div class="error-box" style="margin:auto"><b>Couldn’t load the course list.</b><br>Serve this folder over HTTP (for example <code>python3 -m http.server</code>) rather than opening index.html directly.</div>`;
    return;
  }
  app.dataset.sidebar = store.get("sidebar", "open");
  window.addEventListener("hashchange", render);
  render();
}
start();
