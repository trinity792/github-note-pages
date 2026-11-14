// Virtual memory walk-through: split the virtual address, check the TLB, walk the page table, fault if needed.
import { revealRow, h, frame, stat, select, clear, parseNum, field, log2 } from "./_kit.js";

/** Pure simulation with demand paging. cfg: { vaBits, paBits, pageSize, tlbSize, tlbPolicy } */
export function simulate(cfg, accesses) {
  const frames = 2 ** cfg.paBits / cfg.pageSize;
  const pt = new Map();                                // vpn → { valid, ppn, dirty }
  let tlb = [];                                        // { vpn, ppn, used, loaded }
  const owner = Array(frames).fill(null);              // ppn → { vpn, used }
  const rows = [];
  let tlbHits = 0, faults = 0;
  accesses.forEach(({ addr, write }, t) => {
    const vpn = Math.floor(addr / cfg.pageSize), offset = addr % cfg.pageSize;
    const row = { addr, write, vpn, offset, tlbHit: false, fault: false, evicted: null, wroteBack: false };
    let e = tlb.find((x) => x.vpn === vpn);
    let ppn;
    if (e) { row.tlbHit = true; tlbHits++; ppn = e.ppn; e.used = t; }
    else {
      let pte = pt.get(vpn);
      if (!pte || !pte.valid) {
        row.fault = true; faults++;
        ppn = owner.findIndex((o) => o === null);
        if (ppn < 0) {                                  // memory full: evict the least recently used page
          ppn = 0;
          for (let k = 1; k < frames; k++) if (owner[k].used < owner[ppn].used) ppn = k;
          const old = pt.get(owner[ppn].vpn);
          row.evicted = owner[ppn].vpn; row.wroteBack = old.dirty;
          old.valid = false; old.dirty = false;
          tlb = tlb.filter((x) => x.vpn !== row.evicted);
        }
        pte = { valid: true, ppn, dirty: false };
        pt.set(vpn, pte);
        owner[ppn] = { vpn, used: t };
      }
      ppn = pte.ppn;
      if (tlb.length >= cfg.tlbSize) {
        const key = cfg.tlbPolicy === "FIFO" ? "loaded" : "used";
        let v = 0;
        for (let k = 1; k < tlb.length; k++) if (tlb[k][key] < tlb[v][key]) v = k;
        row.tlbEvicted = tlb[v].vpn;
        tlb.splice(v, 1);
      }
      tlb.push({ vpn, ppn, used: t, loaded: t });
    }
    owner[ppn].used = t;
    if (write) pt.get(vpn).dirty = true;
    row.ppn = ppn; row.pa = ppn * cfg.pageSize + offset;
    row.tlb = tlb.map((x) => ({ ...x })); row.pt = [...pt.entries()].map(([v, p]) => ({ vpn: v, ...p })).sort((a, b) => a.vpn - b.vpn);
    rows.push(row);
  });
  return { rows, tlbHits, faults, frames };
}

const PRESETS = {
  "Sequential walk through pages": { cfg: [16, 12, 256, 2, "FIFO"], acc: "0x1000, 0x1040, 0x10FC, 0x1100, 0x1104, 0x1200, 0x1000, 0x1204" },
  "TLB miss ≠ page fault": { cfg: [16, 12, 256, 2, "FIFO"], acc: "0x0A10, 0x0B10, 0x0C10, 0x0A14, 0x0B14" },
  "Memory fills up (page replacement)": { cfg: [16, 10, 256, 2, "LRU"], acc: "0x0100, W 0x0200, 0x0300, 0x0400, 0x0500, 0x0204, 0x0104" },
};

export default function mount(el, opts) {
  const body = frame(el, "Address translation walk-through");
  const cfg = { vaBits: 16, paBits: 12, pageSize: 256, tlbSize: 2, tlbPolicy: "FIFO" };
  let step = 0, sim = null;
  const acc = h("textarea.w-text", { rows: 2, spellcheck: false, "aria-label": "Virtual address trace" });
  const controls = h("div.w-row"), split = h("div"), sizes = h("div.w-grid"), stats = h("div.w-grid"), trace = h("div.w-scroll", { style: { maxHeight: "300px", overflowY: "auto" } }), tables = h("div.w-row", { style: { alignItems: "flex-start", gap: "20px" } }), msg = h("div.w-note");

  function build() {
    const sel = (label, key, options) => field(label, select(options, cfg[key], (v) => { cfg[key] = Number.isNaN(+v) ? v : +v; if (cfg.paBits > cfg.vaBits) cfg.paBits = cfg.vaBits; build(); }));
    clear(controls).append(
      sel("Virtual address bits", "vaBits", [12, 16, 20, 32]),
      sel("Physical address bits", "paBits", [10, 12, 14, 16, 20].filter((b) => b <= cfg.vaBits && 2 ** b >= cfg.pageSize * 2)),
      sel("Page size", "pageSize", [[16, "16 B"], [64, "64 B"], [256, "256 B"], [1024, "1 KiB"], [4096, "4 KiB"]].filter(([s2]) => s2 * 2 <= 2 ** cfg.paBits)),
      sel("TLB entries", "tlbSize", [1, 2, 4, 8]),
      sel("TLB replacement", "tlbPolicy", ["FIFO", "LRU"]),
    );
    run();
  }
  const parseTrace = () => acc.value.split(/[,\n]+/).map((x) => x.trim()).filter(Boolean).map((x) => ({ write: /^[wWsS]\s/.test(x), addr: parseNum(x.replace(/^[a-zA-Z]\s+/, "")) })).filter((a) => !Number.isNaN(a.addr) && a.addr >= 0 && a.addr < 2 ** cfg.vaBits);
  function run() { sim = simulate(cfg, parseTrace()); step = Math.min(step, sim.rows.length); paint(); }

  function paint() {
    const O = log2(cfg.pageSize), V = cfg.vaBits - O, P = cfg.paBits - O;
    const hx = (v, bits) => "0x" + v.toString(16).toUpperCase().padStart(Math.max(1, Math.ceil(bits / 4)), "0");
    const cur = sim.rows[step - 1];
    const bar = h("div", { style: { display: "flex", flexWrap: "wrap", gap: "14px 28px", font: "500 12px/16px var(--font-mono)" } });
    const part = (title, pieces) => h("div.w-col", h("span.w-label", title), h("div", { style: { display: "flex", gap: "3px" } }, pieces.map(([cls, bits, label, n]) => h(`div.${cls}`, { style: { borderRadius: "6px", padding: "4px 8px", textAlign: "center", minWidth: "74px" } }, h("div", bits || " "), h("div", { style: { font: "500 10px/13px var(--font-ui)" } }, `${label}: ${n} bits`)))));
    const vb = cur ? cur.addr.toString(2).padStart(cfg.vaBits, "0") : "", pb = cur ? cur.pa.toString(2).padStart(cfg.paBits, "0") : "";
    bar.append(part("Virtual address", [["f-a", vb.slice(0, V), "VPN", V], ["f-c", vb.slice(V), "offset", O]]), part("Physical address", [["f-b", pb.slice(0, P), "PPN", P], ["f-c", pb.slice(P), "offset", O]]));
    clear(split).append(bar);
    clear(sizes).append(
      stat("Virtual pages", `2^${V} = ${2 ** V}`),
      stat("Physical pages (frames)", `2^${P} = ${2 ** P}`),
      stat("Page table entries", `2^${V} (one per VPN)`),
      stat("TLB reach", `${cfg.tlbSize} × ${cfg.pageSize} B = ${cfg.tlbSize * cfg.pageSize} B`),
    );
    const done = sim.rows.slice(0, step);
    clear(stats).append(
      stat("TLB hits / accesses", `${done.filter((r) => r.tlbHit).length} / ${done.length}`),
      stat("Page faults", String(done.filter((r) => r.fault).length), done.some((r) => r.fault) ? "bad" : ""),
    );
    const t = h("table.w-table", h("tr", ["#", "virtual addr", "VPN", "offset", "TLB", "page table", "PPN", "physical addr"].map((x) => h("th", x))));
    sim.rows.forEach((r, k) => {
      const shown = k < step;
      t.append(h(`tr${k === step - 1 ? ".cur" : ""}`, { style: { opacity: shown ? 1 : 0.4 } },
        h("td", String(k + 1)), h("td", `${r.write ? "W" : "R"} ${hx(r.addr, cfg.vaBits)}`), h("td", hx(r.vpn, V)), h("td", hx(r.offset, O)),
        h("td", shown ? h(`span.w-pill.${r.tlbHit ? "hit" : "miss"}`, r.tlbHit ? "HIT" : "MISS") : ""),
        h("td", !shown ? "" : r.tlbHit ? h("span", { style: { color: "var(--gray)" } }, "not needed") : r.fault ? h("span.w-pill.bad", `PAGE FAULT${r.evicted !== null ? ` · evict VPN ${hx(r.evicted, V)}` : ""}`) : h("span.w-pill.infoc", "walk: valid")),
        h("td", shown ? hx(r.ppn, P) : ""), h("td", shown ? hx(r.pa, cfg.paBits) : "")));
    });
    clear(trace).append(t);
    revealRow(trace, trace.querySelector("tr.cur"));

    const tlbT = h("table.w-table", { style: { width: "auto" } }, h("tr", h("th", "TLB"), h("th", "VPN"), h("th", "PPN")));
    for (let k = 0; k < cfg.tlbSize; k++) { const e = cur?.tlb[k]; tlbT.append(h(`tr${e && cur && e.vpn === cur.vpn ? ".cur" : ""}`, h("td", String(k)), h("td", e ? hx(e.vpn, V) : "–"), h("td", e ? hx(e.ppn, P) : "–"))); }
    const ptT = h("table.w-table", { style: { width: "auto" } }, h("tr", h("th", "Page table: VPN"), h("th", "valid"), h("th", "dirty"), h("th", "PPN")));
    (cur ? cur.pt : []).forEach((p) => ptT.append(h(`tr${p.vpn === cur.vpn ? ".cur" : ""}`, h("td", hx(p.vpn, V)), h("td", p.valid ? "1" : "0"), h("td", p.dirty ? "1" : "0"), h("td", p.valid ? hx(p.ppn, P) : "(on disk)"))));
    ptT.append(h("tr", h("td", { colSpan: 4, style: { color: "var(--gray)", fontFamily: "var(--font-ui)" } }, `all other ${2 ** V - (cur ? cur.pt.length : 0)} entries: valid = 0`)));
    clear(tables).append(tlbT, ptT);

    msg.innerHTML = !cur ? "Press Step. Physical memory starts empty (demand paging), so the first touch of every page is a page fault." :
      `<b>${hx(cur.addr, cfg.vaBits)}</b> → VPN ${hx(cur.vpn, V)}, offset ${hx(cur.offset, O)}. ` +
      (cur.tlbHit ? "The TLB already holds this translation: <b>TLB hit</b>, no memory access needed to translate." :
        cur.fault ? `TLB miss → page table walk → entry invalid → <b>page fault</b>. The OS ${cur.evicted !== null ? `evicts VPN ${hx(cur.evicted, V)}${cur.wroteBack ? " (dirty, so it is written to disk first)" : ""}, ` : ""}loads the page from disk into frame ${hx(cur.ppn, P)}, marks the entry valid, and the instruction is retried.`
          : "TLB miss → page table walk → entry is <b>valid</b>, so the page is in memory. No page fault; just copy the translation into the TLB.") +
      ` Physical address = PPN ${hx(cur.ppn, P)} followed by the same offset = <b>${hx(cur.pa, cfg.paBits)}</b>.`;
  }

  acc.addEventListener("input", () => { step = 1e9; run(); });
  const setPreset = (name) => { const p = PRESETS[name]; [cfg.vaBits, cfg.paBits, cfg.pageSize, cfg.tlbSize, cfg.tlbPolicy] = p.cfg; acc.value = p.acc; step = 0; build(); };
  body.append(
    h("div.w-row", select(Object.keys(PRESETS), opts.preset || "", setPreset)),
    controls, sizes,
    field("Virtual addresses to access (prefix W for a store)", acc),
    h("div.w-row",
      h("button.w-btn.primary", { type: "button", onclick: () => { step = Math.min(sim.rows.length, step + 1); paint(); } }, "Step"),
      h("button.w-btn", { type: "button", onclick: () => { step = Math.max(0, step - 1); paint(); } }, "Back"),
      h("button.w-btn", { type: "button", onclick: () => { step = sim.rows.length; paint(); } }, "Run all"),
      h("button.w-btn", { type: "button", onclick: () => { step = 0; paint(); } }, "Reset"),
    ),
    split, msg, stats, trace, tables,
  );
  setPreset(opts.preset && PRESETS[opts.preset] ? opts.preset : Object.keys(PRESETS)[0]);
}
