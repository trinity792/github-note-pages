// Cache simulator: tag / index / offset breakdown, per-set contents, hit/miss classification, step by step.
import { revealRow, h, frame, stat, select, clear, parseNum, field, isPow2, log2 } from "./_kit.js";

/** Pure simulation. cfg: { addrBits, blocks, blockSize, ways, policy }. accesses: [{ addr, write }] */
export function simulate(cfg, accesses) {
  const sets = cfg.blocks / cfg.ways;
  const O = log2(cfg.blockSize), I = log2(sets), T = cfg.addrBits - I - O;
  const state = [...Array(sets)].map(() => [...Array(cfg.ways)].map(() => ({ valid: false, tag: 0, dirty: false, used: -1, loaded: -1 })));
  const seen = new Set();
  let shadow = [];                                   // fully associative LRU with the same number of blocks
  const rows = [];
  let hits = 0, writebacks = 0;
  accesses.forEach(({ addr, write }, t) => {
    const blockAddr = Math.floor(addr / cfg.blockSize);
    const index = blockAddr % sets, tag = Math.floor(blockAddr / sets), offset = addr % cfg.blockSize;
    const set = state[index];
    let way = set.findIndex((w) => w.valid && w.tag === tag);
    const row = { addr, write, tag, index, offset, blockAddr, hit: way >= 0, kind: "", evicted: null, wroteBack: false };
    const shadowHit = shadow.includes(blockAddr);
    shadow = shadow.filter((b) => b !== blockAddr); shadow.push(blockAddr); if (shadow.length > cfg.blocks) shadow.shift();
    if (way >= 0) { hits++; if (cfg.policy !== "FIFO") set[way].used = t; }
    else {
      row.kind = !seen.has(blockAddr) ? "compulsory" : shadowHit ? "conflict" : "capacity";
      way = set.findIndex((w) => !w.valid);
      if (way < 0) {
        const key = cfg.policy === "FIFO" ? "loaded" : "used";
        way = 0;
        for (let k = 1; k < set.length; k++) if (cfg.policy === "MRU" ? set[k][key] > set[way][key] : set[k][key] < set[way][key]) way = k;
        row.evicted = (set[way].tag * sets + index) * cfg.blockSize;
        if (set[way].dirty) { row.wroteBack = true; writebacks++; }
      }
      set[way] = { valid: true, tag, dirty: false, used: t, loaded: t };
    }
    if (write) set[way].dirty = true;
    row.way = way;
    seen.add(blockAddr);
    row.snapshot = state.map((s) => s.map((w) => ({ ...w })));
    rows.push(row);
  });
  return { T, I, O, sets, rows, hits, misses: rows.length - hits, writebacks };
}

const PRESETS = {
  "Sequential bytes (spatial locality)": { cfg: [8, 4, 4, 1, "LRU"], acc: "0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B" },
  "Conflict ping-pong (direct-mapped)": { cfg: [8, 4, 4, 1, "LRU"], acc: "0x00, 0x10, 0x00, 0x10, 0x00, 0x10, 0x04, 0x14" },
  "Same trace, 2-way": { cfg: [8, 4, 4, 2, "LRU"], acc: "0x00, 0x10, 0x00, 0x10, 0x00, 0x10, 0x04, 0x14" },
  "Lecture trace (12-bit, fully associative)": { cfg: [12, 4, 4, 4, "LRU"], acc: "0x43F, 0x5E2, 0x824, 0x5E0, 0x524, 0x972, W 0x524, 0x43C" },
  "LRU vs FIFO vs MRU": { cfg: [8, 2, 4, 2, "LRU"], acc: "0x00, 0x04, 0x00, 0x08, 0x00, 0x04, 0x08, 0x00" },
};

export default function mount(el, opts) {
  const body = frame(el, "Cache simulator");
  const cfg = { addrBits: 8, blocks: 4, blockSize: 4, ways: 1, policy: "LRU" };
  let step = 0, sim = null;
  const acc = h("textarea.w-text", { rows: 2, spellcheck: false, "aria-label": "Address trace" });
  const controls = h("div.w-row"), tio = h("div"), stats = h("div.w-grid"), trace = h("div.w-scroll", { style: { maxHeight: "320px", overflowY: "auto" } }), contents = h("div.w-scroll"), msg = h("div.w-note");

  const num = (label, key, opts2) => field(label, select(opts2, cfg[key], (v) => { cfg[key] = +v; if (cfg.ways > cfg.blocks) cfg.ways = cfg.blocks; build(); }));
  function build() {
    clear(controls).append(
      num("Address bits", "addrBits", [8, 12, 16, 32]),
      num("Blocks in cache", "blocks", [1, 2, 4, 8, 16, 32, 64]),
      num("Block size (bytes)", "blockSize", [1, 2, 4, 8, 16, 32, 64]),
      field("Associativity", select([1, 2, 4, 8, 16, 32, 64].filter((w) => w <= cfg.blocks).map((w) => [w, w === 1 ? "1 (direct-mapped)" : w === cfg.blocks ? `${w} (fully associative)` : `${w}-way`]), cfg.ways, (v) => { cfg.ways = +v; run(); })),
      field("Replacement", select(["LRU", "FIFO", "MRU"], cfg.policy, (v) => { cfg.policy = v; run(); })),
    );
    run();
  }
  function parseTrace() {
    return acc.value.split(/[,\n]+/).map((s) => s.trim()).filter(Boolean).map((s) => {
      const write = /^[wWsS]\s/.test(s);
      const addr = parseNum(s.replace(/^[a-zA-Z]\s+/, ""));
      return { addr, write };
    }).filter((a) => !Number.isNaN(a.addr) && a.addr >= 0 && a.addr < 2 ** cfg.addrBits);
  }
  function run() { sim = simulate(cfg, parseTrace()); step = Math.min(step, sim.rows.length) || sim.rows.length; paint(); }

  function paint() {
    const { T, I, O, sets, rows } = sim;
    const hexW = Math.ceil(cfg.addrBits / 4);
    const hx = (v, w = hexW) => "0x" + v.toString(16).toUpperCase().padStart(w, "0");
    const cur = rows[step - 1];
    // T / I / O bar
    const bar = h("div", { style: { display: "flex", gap: "3px", font: "500 12px/16px var(--font-mono)" } });
    const seg2 = (cls, n, label, bits) => n > 0 && bar.append(h(`div.${cls}`, { style: { flex: `${Math.max(n, 3)} 0 0`, borderRadius: "6px", padding: "4px 6px", textAlign: "center", minWidth: "58px" } }, h("div", bits || " "), h("div", { style: { font: "500 10px/13px var(--font-ui)" } }, `${label}: ${n} bit${n === 1 ? "" : "s"}`)));
    const b = cur ? cur.addr.toString(2).padStart(cfg.addrBits, "0") : "";
    seg2("f-a", T, "tag", b.slice(0, T)); seg2("f-b", I, "index", b.slice(T, T + I)); seg2("f-c", O, "offset", b.slice(T + I));
    clear(tio).append(bar);

    const done = rows.slice(0, step);
    const hits = done.filter((r) => r.hit).length;
    clear(stats).append(
      stat("Geometry", `${sets} set${sets > 1 ? "s" : ""} × ${cfg.ways} way${cfg.ways > 1 ? "s" : ""} × ${cfg.blockSize} B`),
      stat("Data capacity", `${cfg.blocks * cfg.blockSize} bytes`),
      stat("Hits / accesses", `${hits} / ${done.length}`, ""),
      stat("Hit rate", done.length ? `${Math.round((100 * hits) / done.length)}%` : "—"),
    );

    const t = h("table.w-table", h("tr", ["#", "access", "tag", "index", "offset", "result", "why / effect"].map((x) => h("th", x))));
    rows.forEach((r, k) => {
      const shown = k < step;
      t.append(h(`tr${k === step - 1 ? ".cur" : ""}`, { style: { opacity: shown ? 1 : 0.4 } },
        h("td", String(k + 1)), h("td", `${r.write ? "W" : "R"} ${hx(r.addr)}`), h("td", hx(r.tag, Math.max(1, Math.ceil(T / 4)))), h("td", I ? String(r.index) : "—"), h("td", String(r.offset)),
        h("td", shown ? h(`span.w-pill.${r.hit ? "hit" : "miss"}`, r.hit ? "HIT" : "MISS") : ""),
        h("td", { style: { fontFamily: "var(--font-ui)", whiteSpace: "normal", minWidth: "200px" } }, !shown ? "" : r.hit ? (r.write ? "write in cache, set dirty" : "") :
          `${r.kind}${r.evicted !== null ? ` · evicts block ${hx(r.evicted)}${r.wroteBack ? " (dirty → written back)" : ""}` : ""}${r.write ? " · then write, set dirty" : ""}`)));
    });
    clear(trace).append(t);
    revealRow(trace, trace.querySelector("tr.cur"));

    const snap = cur ? cur.snapshot : [...Array(sets)].map(() => [...Array(cfg.ways)].map(() => ({ valid: false })));
    const ct = h("table.w-table", { style: { width: "auto" } }, h("tr", h("th", I ? "set" : ""), [...Array(cfg.ways)].flatMap((_, w) => [h("th", cfg.ways > 1 ? `way ${w}: V D tag` : "V D tag"), h("th", "holds bytes")])));
    snap.forEach((set, si) => {
      const order = set.map((w, k) => ({ k, key: cfg.policy === "FIFO" ? w.loaded : w.used })).filter((x) => set[x.k].valid).sort((a, c) => a.key - c.key);
      const tr = h(`tr${cur && cur.index === si ? ".cur" : ""}`, h("td", I ? String(si) : ""));
      set.forEach((w, k) => {
        const start = w.valid ? (w.tag * sets + si) * cfg.blockSize : 0;
        const victim = w.valid && order.length === set.length && order.length > 1 && (cfg.policy === "MRU" ? order.at(-1).k === k : order[0].k === k);
        tr.append(
          h("td", { style: { fontWeight: cur && cur.index === si && cur.way === k ? 700 : 400 } }, w.valid ? `1 ${w.dirty ? 1 : 0} ${hx(w.tag, Math.max(1, Math.ceil(T / 4)))}` : "0 – –", victim ? h("span.w-pill.warn", { style: { marginLeft: "6px" } }, "next out") : ""),
          h("td", { style: { color: "var(--text-caption)" } }, w.valid ? `${hx(start)}–${hx(start + cfg.blockSize - 1)}` : ""));
      });
      ct.append(tr);
    });
    clear(contents).append(ct);
    msg.innerHTML = !rows.length ? "Enter addresses separated by commas. Prefix a store with <code>W</code>." : cur ? `<b>Access ${step} of ${rows.length}:</b> ${cur.write ? "store to" : "load from"} ${hx(cur.addr)} → block ${hx(cur.blockAddr * cfg.blockSize)}, ${I ? `set ${cur.index}, ` : ""}tag ${hx(cur.tag, 1)}. ${cur.hit ? "A valid entry in the set has this tag: <b>hit</b>." : `No valid entry in the set has this tag: <b>${cur.kind} miss</b>.`}` : "Press Step to run the first access.";
  }

  acc.addEventListener("input", () => { step = 1e9; run(); });
  const setPreset = (name) => { const p = PRESETS[name]; [cfg.addrBits, cfg.blocks, cfg.blockSize, cfg.ways, cfg.policy] = p.cfg; acc.value = p.acc; step = 0; build(); step = 0; paint(); };
  body.append(
    h("div.w-row", select(Object.keys(PRESETS), opts.preset || "", setPreset)),
    controls,
    field("Address trace (R by default; prefix W for a store)", acc),
    h("div.w-row",
      h("button.w-btn.primary", { type: "button", onclick: () => { step = Math.min(sim.rows.length, step + 1); paint(); } }, "Step"),
      h("button.w-btn", { type: "button", onclick: () => { step = Math.max(0, step - 1); paint(); } }, "Back"),
      h("button.w-btn", { type: "button", onclick: () => { step = sim.rows.length; paint(); } }, "Run all"),
      h("button.w-btn", { type: "button", onclick: () => { step = 0; paint(); } }, "Reset"),
    ),
    tio, msg, stats, trace, h("div.w-label", "Cache contents after this access"), contents,
  );
  setPreset(opts.preset && PRESETS[opts.preset] ? opts.preset : Object.keys(PRESETS)[0]);
}
