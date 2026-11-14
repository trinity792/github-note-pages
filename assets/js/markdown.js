// Markdown → DOM for notes.
// Supports Obsidian-flavoured callouts (> [!info] Title), $inline$ / $$display$$ math (KaTeX),
// Code-Styler-like code blocks, ```quiz blocks, and <div data-widget="…"> interactive components.
import { icon } from "./icons.js";
import { highlight } from "./highlight.js";

const CALLOUT_ICON = {
  note: "pencil", abstract: "clipboard-list", summary: "clipboard-list", info: "info", todo: "circle-check",
  tip: "flame", hint: "flame", success: "check", question: "circle-help", warning: "triangle-alert",
  failure: "x", danger: "zap", bug: "bug", example: "list", quote: "quote", study: "graduation-cap",
};
const CALLOUT_ALIAS = { summary: "abstract", hint: "tip", study: "note", important: "tip", caution: "warning", error: "danger" };

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
export const slugify = (s) => s.toLowerCase().replace(/&[a-z]+;/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 64);

export function parseFrontMatter(src) {
  const meta = {};
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(src);
  if (!m) return { meta, body: src };
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i < 1) continue;
    const key = line.slice(0, i).trim().toLowerCase();
    meta[key] = line.slice(i + 1).trim().replace(/^"(.*)"$/, "$1");
  }
  return { meta, body: src.slice(m[0].length) };
}

// Swap math for placeholders so Markdown never touches TeX (underscores, pipes, backslashes).
function protectMath(src, store) {
  const re = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`\n]+`)|\$\$([\s\S]+?)\$\$|\$(?!\s)((?:\\.|[^$\\\n])+?)(?<!\s)\$/g;
  return src.replace(re, (all, code, display, inline) => {
    if (code) return code;
    const id = store.length;
    // Display math inside a callout carries the blockquote's "> " prefixes; drop them.
    const tex = display != null ? display.replace(/^[ \t]*>[ \t]?/gm, "") : inline;
    store.push({ tex: tex.trim(), display: display != null });
    return display != null ? `%%MATHD${id}%%` : `%%MATH${id}%%`;
  });
}
function renderMath(html, store) {
  const tex = (i, forceInline) => {
    const m = store[+i];
    try {
      return window.katex.renderToString(m.tex, { displayMode: m.display && !forceInline, throwOnError: false, strict: false });
    } catch (e) { return `<code>${esc(m.tex)}</code>`; }
  };
  return html
    .replace(/<p>%%MATHD(\d+)%%<\/p>/g, (_, i) => `<div class="math-block">${tex(i)}</div>`)
    .replace(/%%MATHD?(\d+)%%/g, (_, i) => tex(i, false));
}

function codeBlock(text, info) {
  const [langRaw = "", ...rest] = (info || "").trim().split(/\s+/);
  const lang = langRaw.toLowerCase();
  const attrs = rest.join(" ");
  if (lang === "quiz") return `<div class="quiz-src" hidden>${esc(text)}</div>`;
  const title = (/title="([^"]*)"/.exec(attrs) || [])[1] || "";
  const hl = new Set();
  ((/hl=([\d,-]+)/.exec(attrs) || [])[1] || "").split(",").filter(Boolean).forEach((r) => {
    const [a, b = a] = r.split("-").map(Number);
    for (let i = a; i <= b; i++) hl.add(i);
  });
  const lines = highlight(text.replace(/\n$/, ""), lang);
  const rows = lines.map((l, i) => `<tr${hl.has(i + 1) ? ' class="hl"' : ""}><td class="ln">${i + 1}</td><td class="lc">${l || " "}</td></tr>`).join("");
  const label = { riscv: "risc-v", asm: "risc-v", "": "text" }[lang] ?? lang;
  const tagIcon = lang === "bash" || lang === "text" || lang === "" ? "terminal" : "code-xml";
  return `<div class="codeblock" data-lang="${esc(lang)}">
<div class="code-head"><span class="code-tag">${icon(tagIcon, 14)}${esc(label)}</span><span class="code-title">${esc(title)}</span>
<button class="code-btn" data-act="copy" title="Copy code" aria-label="Copy code">${icon("copy", 16)}</button>
<button class="code-btn" data-act="fold" title="Fold" aria-label="Fold code block">${icon("chevron-down", 16, "fold")}</button></div>
<div class="code-lines"><table><tbody>${rows}</tbody></table></div><textarea hidden>${esc(text)}</textarea></div>`;
}

let configured = false;
function configure() {
  if (configured) return;
  configured = true;
  window.marked.use({
    gfm: true,
    extensions: [{
      name: "wikilink",
      level: "inline",
      start(src) { return src.search(/!?\[\[/); },
      tokenizer(src) {
        const match = /^(!?)\[\[([^\]\n]+)\]\]/.exec(src);
        if (match) return { type: "wikilink", raw: match[0], target: match[2].replace(/\\\|/g, "|"), embed: !!match[1] };
      },
      renderer(token) {
        return `<span data-vault-link="${esc(token.target)}" data-embed="${token.embed}">${esc(token.target.split("|").pop())}</span>`;
      },
    }],
    renderer: {
      code(a, b) { return typeof a === "object" ? codeBlock(a.text, a.lang) : codeBlock(a, b); },
    },
  });
}

export function inlineMarkdown(text) {
  configure();
  const store = [];
  return renderMath(window.marked.parse(protectMath(text, store)), store);
}

function buildCallouts(root) {
  // Innermost first so nested callouts work.
  const quotes = [...root.querySelectorAll("blockquote")].reverse();
  for (const bq of quotes) {
    const first = bq.firstElementChild;
    if (!first || first.tagName !== "P") continue;
    const m = /^\[!([\w-]+)\]([+-]?)[ \t]*([^\n]*)(?:\n([\s\S]*))?$/.exec(first.innerHTML);
    if (!m) continue;
    const raw = m[1].toLowerCase();
    const type = CALLOUT_ALIAS[raw] || raw;
    const foldable = m[2] !== "";
    const title = m[3].trim() || raw[0].toUpperCase() + raw.slice(1);
    const box = document.createElement("div");
    box.className = `callout ${type}${m[2] === "-" ? " collapsed" : ""}`;
    const head = document.createElement(foldable ? "button" : "div");
    head.className = "callout-title";
    head.innerHTML = `${icon(CALLOUT_ICON[raw] || CALLOUT_ICON[type] || "pencil", 20)}<span class="t">${title}</span>${foldable ? icon("chevron-down", 20, "fold") : ""}`;
    if (foldable) {
      head.setAttribute("aria-expanded", m[2] !== "-");
      head.addEventListener("click", () => head.setAttribute("aria-expanded", !box.classList.toggle("collapsed")));
    }
    const body = document.createElement("div");
    body.className = "callout-body";
    if (m[4] && m[4].trim()) { first.innerHTML = m[4]; } else { first.remove(); }
    while (bq.firstChild) body.appendChild(bq.firstChild);
    box.appendChild(head);
    if (body.children.length) box.appendChild(body);
    bq.replaceWith(box);
  }
}

function buildQuizzes(root) {
  for (const src of root.querySelectorAll(".quiz-src")) {
    const questions = src.textContent.split(/^---\s*$/m).map((block) => {
      const q = { text: "", opts: [], exp: "" };
      let mode = "";
      for (const line of block.split("\n")) {
        let m;
        if ((m = /^Q:\s*(.*)/.exec(line))) { q.text = m[1]; mode = "q"; }
        else if ((m = /^- \[( |x)\]\s*(.*)/.exec(line))) { q.opts.push({ ok: m[1] === "x", text: m[2] }); mode = "o"; }
        else if ((m = /^>\s?(.*)/.exec(line))) { q.exp += (q.exp ? "\n" : "") + m[1]; mode = "e"; }
        else if (line.trim() && mode === "q") q.text += "\n" + line;
        else if (line.trim() && mode === "o") q.opts[q.opts.length - 1].text += " " + line.trim();
      }
      return q;
    }).filter((q) => q.text && q.opts.length);

    const box = document.createElement("div");
    box.className = "quiz";
    let answered = 0, correct = 0;
    box.innerHTML = `<div class="quiz-head">${icon("circle-help", 14)}<span>Quick check</span><span class="score"></span></div>`;
    const score = box.querySelector(".score");
    const upd = () => { score.textContent = answered ? `${correct} / ${questions.length} correct` : `${questions.length} question${questions.length > 1 ? "s" : ""}`; };
    upd();
    questions.forEach((q, qi) => {
      const el = document.createElement("div");
      el.className = "quiz-q";
      el.innerHTML = `<div class="q">${inlineMarkdown(`**${qi + 1}.** ${q.text}`)}</div><div class="quiz-opts"></div>`;
      const opts = el.querySelector(".quiz-opts");
      q.opts.forEach((o) => {
        const b = document.createElement("button");
        b.className = "quiz-opt";
        b.innerHTML = `<span class="mk"></span><span>${inlineMarkdown(o.text)}</span>`;
        b.addEventListener("click", () => {
          answered++;
          if (o.ok) correct++;
          [...opts.children].forEach((c, ci) => {
            c.disabled = true;
            if (q.opts[ci].ok) { c.classList.add("right"); c.querySelector(".mk").innerHTML = icon("check", 12); }
          });
          if (!o.ok) { b.classList.add("wrong"); b.querySelector(".mk").innerHTML = icon("x", 12); }
          if (q.exp) {
            const e = document.createElement("div");
            e.className = "quiz-exp";
            e.innerHTML = inlineMarkdown(q.exp);
            el.appendChild(e);
          }
          upd();
        });
        opts.appendChild(b);
      });
      box.appendChild(el);
    });
    src.replaceWith(box);
  }
}

function wireCode(root) {
  root.addEventListener("click", (ev) => {
    const btn = ev.target.closest(".code-btn");
    if (!btn) return;
    const block = btn.closest(".codeblock");
    if (btn.dataset.act === "fold") block.classList.toggle("collapsed");
    else if (btn.dataset.act === "copy") {
      navigator.clipboard?.writeText(block.querySelector("textarea").value).then(() => {
        btn.innerHTML = icon("check", 16);
        setTimeout(() => { btn.innerHTML = icon("copy", 16); }, 1200);
      });
    }
  });
}

/** Render Markdown source. Returns { el, meta, toc: [{ level, text, id }] }. */
export function renderMarkdown(src) {
  configure();
  const { meta, body } = parseFrontMatter(src);
  const store = [];
  const html = renderMath(window.marked.parse(protectMath(body, store)), store);
  const el = document.createElement("div");
  el.className = "md";
  el.innerHTML = html;

  // The page header shows the title, so drop a leading H1 if the file has one.
  const h1 = el.querySelector(":scope > h1:first-child");
  if (h1) { meta.title ||= h1.textContent; h1.remove(); }

  const toc = [];
  const seen = new Map();
  for (const h of el.querySelectorAll("h2, h3, h4")) {
    if (h.closest(".callout, blockquote")) continue;
    let id = slugify(h.textContent) || "section";
    const n = seen.get(id) || 0;
    seen.set(id, n + 1);
    if (n) id += "-" + (n + 1);
    h.id = id;
    toc.push({ level: +h.tagName[1], text: h.textContent, id });
    const a = document.createElement("a");
    a.className = "anchor";
    a.href = "#";
    a.dataset.anchor = id;
    a.textContent = "#";
    a.setAttribute("aria-label", "Link to this section");
    h.appendChild(a);
  }

  buildCallouts(el);
  buildQuizzes(el);
  for (const t of el.querySelectorAll("table")) {
    if (t.closest(".code-lines")) continue;
    const wrap = document.createElement("div");
    wrap.className = "table-wrap";
    t.replaceWith(wrap);
    wrap.appendChild(t);
  }
  for (const a of el.querySelectorAll('a[href^="http"]')) { a.target = "_blank"; a.rel = "noopener"; }
  wireCode(el);
  return { el, meta, toc };
}

/** Plain-text view of a note for search. */
export function plainText(src) {
  return parseFrontMatter(src).body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/^>\s*\[![\w-]+\][+-]?/gm, "")
    .replace(/[#>*_`$|\\]/g, "")
    .replace(/\s+/g, " ");
}
