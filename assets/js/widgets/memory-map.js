// Address-space diagram + "where does this live?" drill.
import { h, s, frame, clear } from "./_kit.js";

const REGIONS = [
  { id: "stack", name: "Stack", color: "ocean", note: "locals, parameters, return addresses · grows down ↓ · freed automatically on return" },
  { id: "heap", name: "Heap", color: "sea-green", note: "malloc / calloc / realloc · grows up ↑ · lives until you free it" },
  { id: "data", name: "Data (static)", color: "honey", note: "globals, static variables, string literals · fixed size for the whole run" },
  { id: "text", name: "Text (code)", color: "periwinkle", note: "machine instructions · loaded at start · read-only" },
];

const CODE = `#define N 4
int total = 0;                     // (1)
char *greet = "hi";                // (2) the pointer   (3) the characters 'h','i','\\0'

int *make(int n) {                 // (4) the code of make
    int local[N];                  // (5)
    int *p = malloc(n * sizeof(int));   // (6) the pointer p   (7) the block it points to
    static int calls = 0;          // (8)
    return p;
}`;

const ITEMS = [
  ["(1) total", "data", "A global variable lives in the data segment."],
  ["(2) the pointer greet", "data", "greet itself is a global variable, so the 4 or 8 bytes holding the address are in data."],
  ["(3) the characters \"hi\"", "data", "String literals are stored in (read-only) static data, which is why you must not modify them."],
  ["(4) the instructions of make", "text", "Compiled code lives in the text segment."],
  ["(5) local", "stack", "An array declared inside a function is a local: all N ints sit in make's stack frame and vanish on return."],
  ["(6) the pointer p", "stack", "p is a local variable. The variable holding the address is on the stack…"],
  ["(7) the block p points to", "heap", "…but the memory it points to came from malloc, so it is on the heap and outlives the call."],
  ["(8) calls", "data", "static locals keep their value between calls, so they live in data, not on the stack."],
];

export default function mount(el) {
  const body = frame(el, "Where does it live?", "Drill");
  let idx = 0, right = 0, done = false;
  const picked = new Set();

  const svg = s("svg", { class: "w-svg", viewBox: "0 0 250 300", style: "max-width:250px" });
  const boxes = {};
  const layout = [["stack", 18, 62], ["", 80, 70], ["heap", 150, 50], ["data", 200, 40], ["text", 240, 40]];
  svg.append(s("text", { x: 8, y: 12, "font-size": 9, class: "muted mono" }, "0xFFFF FFFF"), s("text", { x: 8, y: 294, "font-size": 9, class: "muted mono" }, "0x0000 0000"));
  for (const [id, y, hgt] of layout) {
    const r = REGIONS.find((x) => x.id === id);
    const rect = s("rect", { x: 70, y, width: 170, height: hgt, rx: 6, fill: r ? `var(--sup-${r.color}-bg)` : "none", "fill-opacity": 0.45, stroke: r ? `var(--sup-${r.color}-fg)` : "var(--border)", "stroke-dasharray": r ? null : "4 4" });
    svg.append(rect);
    if (r) { boxes[id] = rect; svg.append(s("text", { x: 155, y: y + hgt / 2 + 4, "text-anchor": "middle", "font-size": 12, "font-weight": 500 }, r.name)); }
  }
  svg.append(
    s("text", { x: 155, y: 104, "text-anchor": "middle", "font-size": 10, class: "muted" }, "↓ stack grows down"),
    s("text", { x: 155, y: 136, "text-anchor": "middle", "font-size": 10, class: "muted" }, "↑ heap grows up"),
  );

  const q = h("div", { style: { fontWeight: "500", fontSize: "14px", lineHeight: "20px" } });
  const fb = h("div.w-note");
  const btns = h("div.w-row");
  const score = h("span.w-note");
  const next = h("button.w-btn.primary", { type: "button", onclick: () => { idx++; picked.clear(); done = false; if (idx >= ITEMS.length) { idx = 0; right = 0; } paint(); } }, "Next");

  function paint() {
    const [label, ans, why] = ITEMS[idx];
    q.textContent = `Where is ${label}?`;
    clear(btns);
    for (const r of REGIONS) {
      const b = h("button.w-btn", { type: "button", disabled: done, onclick: () => {
        if (done) return;
        if (r.id === ans) { done = true; if (!picked.size) right++; fb.innerHTML = `<b>${r.name}.</b> ${why}`; }
        else { picked.add(r.id); fb.innerHTML = `Not ${r.name.toLowerCase()} — ${r.note.split(" · ")[0]}. Try again.`; }
        paint();
      } }, r.name);
      if (done && r.id === ans) b.classList.add("primary");
      if (picked.has(r.id)) b.style.opacity = "0.4";
      btns.append(b);
    }
    for (const [id, rect] of Object.entries(boxes)) rect.setAttribute("fill-opacity", done && id === ans ? 0.95 : 0.45);
    next.style.display = done ? "" : "none";
    next.textContent = idx === ITEMS.length - 1 ? "Restart" : "Next";
    if (!done && !picked.size) fb.textContent = "Careful: a pointer variable and the thing it points to can live in different regions.";
    score.textContent = `${idx + 1} / ${ITEMS.length} · ${right} right first try`;
  }

  body.append(
    h("div.w-row", { style: { alignItems: "flex-start", gap: "16px" } },
      h("div", { style: { flex: "0 0 230px", maxWidth: "100%" } }, svg),
      h("div.w-col", { style: { flex: "1 1 300px", gap: "12px" } },
        h("pre", { style: { margin: 0, padding: "10px 12px", borderRadius: "8px", background: "var(--code-bg)", border: "1px solid var(--code-border)", font: "400 12px/19px var(--font-mono)", overflowX: "auto", color: "var(--code-text)" } }, CODE),
        q, btns, fb, h("div.w-row", next, score),
      ),
    ),
  );
  paint();
}
