// Struct layout calculator: natural alignment, padding and sizeof for 32- and 64-bit models.
import { h, s, frame, stat, seg, select, clear } from "./_kit.js";

const SIZES = { char: 1, int8_t: 1, int16_t: 2, short: 2, int32_t: 4, int: 4, float: 4, int64_t: 8, double: 8, "pointer (T *)": 0 };
const COLORS = ["ocean", "sea-green", "honey", "periwinkle", "carrot", "indigo", "teal", "pink"];
const PRESETS = {
  "node_t (FA25 MT Q1)": [["char", "name", 6], ["pointer (T *)", "left", 1], ["pointer (T *)", "right", 1], ["pointer (T *)", "data", 1]],
  "struct foo": [["int32_t", "a", 1], ["char", "b", 1], ["pointer (T *)", "c", 1]],
  "Bad order": [["char", "a", 1], ["int64_t", "b", 1], ["char", "c", 1], ["int32_t", "d", 1], ["char", "e", 1]],
};

export default function mount(el, opts) {
  const body = frame(el, "Struct layout and sizeof");
  let ptr = 8;
  let fields = PRESETS["node_t (FA25 MT Q1)"].map((f) => [...f]);
  const rows = h("div.w-col");
  const draw = h("div.w-scroll");
  const stats = h("div.w-grid");
  const note = h("div.w-note");

  function layout() {
    let off = 0, maxAlign = 1;
    const placed = [];
    for (const [type, name, count] of fields) {
      const size = type.startsWith("pointer") ? ptr : SIZES[type];
      const align = size;
      maxAlign = Math.max(maxAlign, align);
      const pad = (align - (off % align)) % align;
      if (pad) placed.push({ pad: true, off, len: pad });
      off += pad;
      placed.push({ name, type, off, len: size * count, size, count });
      off += size * count;
    }
    const tail = (maxAlign - (off % maxAlign)) % maxAlign;
    if (tail) placed.push({ pad: true, off, len: tail, tail: true });
    return { placed, total: off + tail, maxAlign, raw: fields.reduce((a, [t, , c]) => a + (t.startsWith("pointer") ? ptr : SIZES[t]) * c, 0) };
  }

  function paint() {
    clear(rows);
    fields.forEach((f, i) => {
      const name = h("input.w-input", { value: f[1], style: { width: "90px" }, oninput: () => { f[1] = name.value; paintOut(); }, "aria-label": "Field name" });
      const cnt = h("input.w-input", { type: "number", min: 1, max: 64, value: f[2], style: { width: "60px" }, oninput: () => { f[2] = Math.max(1, Math.min(64, +cnt.value || 1)); paintOut(); }, "aria-label": "Array length" });
      rows.append(h("div.w-row",
        h("i", { style: { width: "10px", height: "10px", borderRadius: "3px", background: `var(--sup-${COLORS[i % COLORS.length]}-fg)` } }),
        select(Object.keys(SIZES), f[0], (v) => { f[0] = v; paintOut(); }), name,
        h("span.w-note", "["), cnt, h("span.w-note", "]"),
        h("button.w-btn", { type: "button", disabled: i === 0, onclick: () => { [fields[i - 1], fields[i]] = [fields[i], fields[i - 1]]; paint(); }, title: "Move up" }, "↑"),
        h("button.w-btn", { type: "button", disabled: fields.length === 1, onclick: () => { fields.splice(i, 1); paint(); }, title: "Remove field" }, "×"),
      ));
    });
    paintOut();
  }

  function paintOut() {
    const { placed, total, maxAlign, raw } = layout();
    const W = 8, cell = 44, lh = 34, left = 64;
    const nrows = Math.ceil(total / W);
    const svg = s("svg", { class: "w-svg", viewBox: `0 0 ${left + W * cell + 8} ${nrows * lh + 26}`, style: `max-width:${left + W * cell + 8}px;min-width:340px` });
    for (let c = 0; c < W; c++) svg.append(s("text", { x: left + c * cell + cell / 2, y: 12, "text-anchor": "middle", "font-size": 10, class: "muted mono" }, "+" + c));
    for (let r = 0; r < nrows; r++) svg.append(s("text", { x: left - 8, y: 20 + r * lh + lh / 2 + 4, "text-anchor": "end", "font-size": 11, class: "muted mono" }, String(r * W)));
    let fi = -1;
    for (const p of placed) {
      if (!p.pad) fi++;
      for (let b = p.off; b < p.off + p.len; b++) {
        const x = left + (b % W) * cell, y = 20 + Math.floor(b / W) * lh;
        const col = p.pad ? "var(--gray)" : `var(--sup-${COLORS[fi % COLORS.length]}-bg)`;
        svg.append(s("rect", { x: x + 1, y: y + 1, width: cell - 2, height: lh - 2, rx: 5, fill: col, "fill-opacity": p.pad ? 0.18 : 0.75, stroke: p.pad ? "var(--gray)" : "none", "stroke-dasharray": p.pad ? "3 3" : null }));
        const label = p.pad ? "pad" : b === p.off ? p.name : p.count > 1 && (b - p.off) % p.size === 0 ? `[${(b - p.off) / p.size}]` : "";
        if (label) svg.append(s("text", { x: x + cell / 2, y: y + lh / 2 + 4, "text-anchor": "middle", "font-size": p.pad ? 9 : 11, class: p.pad ? "muted" : "", "font-weight": 500 }, label.slice(0, 6)));
      }
    }
    clear(draw).append(svg);
    clear(stats).append(
      stat("sizeof(struct)", total + " bytes"),
      stat("Sum of fields", raw + " bytes"),
      stat("Padding", total - raw + " bytes", total - raw ? "bad" : "good"),
      stat("Struct alignment", maxAlign + " bytes"),
    );
    note.innerHTML = `Rules used: each field starts at a multiple of <b>its own element size</b>; the whole struct is padded to a multiple of its <b>largest</b> field alignment (so arrays of structs stay aligned). Pointers are <b>${ptr} bytes</b> here. Reorder fields largest-first to shrink padding.`;
  }

  body.append(
    h("div.w-row",
      seg([[8, "64-bit (8-byte pointers)"], [4, "32-bit (4-byte pointers)"]], ptr, (v) => { ptr = +v; paintOut(); }),
      select(Object.keys(PRESETS), "", (v) => { fields = PRESETS[v].map((f) => [...f]); paint(); }),
    ),
    rows,
    h("div.w-row", h("button.w-btn", { type: "button", onclick: () => { fields.push(["int32_t", "f" + fields.length, 1]); paint(); } }, "+ Add field")),
    draw, stats, note,
  );
  paint();
}
