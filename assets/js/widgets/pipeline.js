// Pipeline waterfall diagram: executes a small RISC-V program and schedules it through IF ID EX MEM WB
// under configurable assumptions (forwarding, write-then-read RegFile, branch-resolution stage).
import { h, frame, stat, seg, select, clear } from "./_kit.js";
import { assemble, machine, uses, disasm, REG_NAMES } from "./rv.js";

/**
 * Build the schedule.
 * opts: { fwd: bool, wtr: bool, resolve: "MEM" | "EX", limit }
 * Returns { rows: [{ text, cells: {cycle: label}, notes: [], flushed }], cycles, stalls, flushed, executed }
 */
export function schedule(source, opts) {
  const { insts, errors } = assemble(source);
  if (errors.length) return { errors };
  const byPc = new Map(insts.map((i) => [i.pc, i]));
  const m = machine(insts);
  const limit = opts.limit || 24;
  const rows = [];
  const lastWriter = new Map();          // register → row that most recently wrote it
  let prev = null;                        // previous committed row
  let stalls = 0, flushedCount = 0;

  while (!m.halted && rows.filter((r) => !r.flushed).length < limit) {
    const pc = m.pc;
    const inst = m.step();
    if (!inst) break;
    const u = uses(inst);
    const taken = m.pc !== pc + 4;
    const row = { inst, text: disasm(inst), notes: [], flushed: false, cells: {} };

    // Fetch and decode timing.
    if (!prev) { row.f = 1; row.idEnter = 2; }
    else if (prev.redirect) { row.f = prev.resolveCycle + 1; row.idEnter = row.f + 1; }
    else { row.f = prev.idEnter; row.idEnter = Math.max(row.f + 1, prev.ex); }

    // Earliest EX honoring data hazards.
    let ex = row.idEnter + 1;
    const natural = ex;
    const srcs = [...new Set(u.reads)].map((r) => ({ r, p: lastWriter.get(r) })).filter((x) => x.p);
    let changed = true;
    while (changed) {
      changed = false;
      for (const { p } of srcs) {
        let need;
        if (opts.fwd) {
          need = (p.isLoad ? p.mem : p.ex) + 1;                       // value exists after EX (or after MEM for a load)
          if (!opts.wtr && Math.max(ex, need) === p.wb + 1) need = p.wb + 2;   // decoded in the producer's WB cycle: stale read, nothing left to forward
        } else {
          need = p.wb + (opts.wtr ? 1 : 2);                           // must read the RegFile after the write
        }
        if (need > ex) { ex = need; changed = true; }
      }
    }
    row.ex = ex; row.mem = ex + 1; row.wb = ex + 2; row.isLoad = u.isLoad;
    const waited = ex - natural;
    for (const { r, p } of srcs) {
      const name = REG_NAMES[r];
      if (opts.fwd && ex === p.mem && !p.isLoad) row.notes.push(`${name}: forwarded MEM→EX from “${p.text}”`);
      else if (opts.fwd && ex === p.wb) row.notes.push(`${name}: forwarded WB→EX from “${p.text}”${p.isLoad && waited ? " after a load-use stall" : ""}`);
      else if (ex - 1 === p.wb) row.notes.push(`${name}: read in ID during “${p.text}”'s WB (write-then-read)`);
    }
    if (waited) { row.notes.push(`stalled ${waited} cycle${waited > 1 ? "s" : ""} waiting for a source register`); stalls += waited; }

    row.cells[row.f] = "IF";
    for (let c = row.f + 1; c < ex - 1; c++) row.cells[c] = "–";
    row.cells[ex - 1] = "ID"; row.cells[ex] = "EX"; row.cells[ex + 1] = "MEM"; row.cells[ex + 2] = "WB";
    rows.push(row);
    if (u.writes) lastWriter.set(u.writes, row);

    // Control hazard: predict not-taken; a taken branch or any jump redirects after it resolves.
    if ((u.isBranch || u.isJump) && taken) {
      row.redirect = true;
      row.resolveCycle = opts.resolve === "EX" ? row.ex : row.mem;
      row.notes.push(`${u.isJump ? "jump" : "branch taken"}: resolved in ${opts.resolve} (cycle ${row.resolveCycle}); wrong-path instructions are flushed`);
      let before = row, wpc = pc + 4;
      for (;;) {
        const wi = byPc.get(wpc);
        const f = before === row ? row.idEnter : before.idEnter;
        if (f > row.resolveCycle) break;
        const w = { text: wi ? disasm(wi) : "(next instruction)", flushed: true, notes: ["fetched on the wrong path, then flushed"], cells: {}, f };
        w.idEnter = Math.max(f + 1, before.ex);
        w.ex = w.idEnter + 1;
        const stageAt = (c) => (c < w.idEnter ? (c === f ? "IF" : "–") : c < w.ex ? (c === w.ex - 1 ? "ID" : "–") : c === w.ex ? "EX" : "MEM");
        for (let c = f; c <= row.resolveCycle; c++) w.cells[c] = stageAt(c);
        w.cells[row.resolveCycle + 1] = "✕";
        rows.push(w); flushedCount++;
        before = w; wpc += 4;
      }
    } else if (u.isBranch) {
      row.notes.push("branch not taken: prediction was right, no penalty");
    }
    prev = row;
  }
  const committed = rows.filter((r) => !r.flushed);
  const cycles = committed.length ? Math.max(...committed.map((r) => r.wb)) : 0;
  return { rows, cycles, stalls, flushed: flushedCount, executed: committed.length, truncated: !m.halted };
}

const PROGRAMS = {
  "Data hazard (add → sub → or)": "add s0, t0, t1\nsub t2, s0, t0\nor  t6, s0, t3",
  "Load-use hazard": "add s0, t1, t2\nlw  s1, 8(s0)\nor  t3, s1, t5\nand t4, s1, t2\nsll t0, t1, t2",
  "Taken branch": "beq x0, x0, Label\nsub t2, s0, t0\nor  t6, a0, t0\nxor t5, t1, s0\nLabel: sw s0, 8(t3)\nadd t0, t1, t2",
  "Loads, naive order": "lw  t0, 0(a0)\nlw  t1, 4(a0)\nadd t2, t0, t1\nsw  t2, 12(a0)\nlw  t3, 8(a0)\nadd t4, t0, t3\nsw  t4, 16(a0)",
  "Loads, scheduled by compiler": "lw  t0, 0(a0)\nlw  t1, 4(a0)\nlw  t3, 8(a0)\nadd t2, t0, t1\nsw  t2, 12(a0)\nadd t4, t0, t3\nsw  t4, 16(a0)",
  "Loop, two iterations": "addi t0, x0, 2\nloop: addi t0, t0, -1\nadd  t1, t1, t0\nbne  t0, x0, loop\nsub  t2, t1, t0",
};
const STAGE_COLOR = { IF: "ocean", ID: "sea-green", EX: "honey", MEM: "periwinkle", WB: "carrot" };

export default function mount(el, opts) {
  const body = frame(el, "Pipeline diagram builder");
  const o = { fwd: opts.fwd !== "off", wtr: opts.wtr !== "off", resolve: opts.resolve || "MEM" };
  const src = h("textarea.w-text", { rows: 7, spellcheck: false, "aria-label": "Assembly program" });
  const first = opts.program && PROGRAMS[opts.program] ? opts.program : Object.keys(PROGRAMS)[0];
  src.value = PROGRAMS[first];
  const grid = h("div.w-scroll"), stats = h("div.w-grid"), notes = h("div.w-note");

  function paint() {
    const r = schedule(src.value, o);
    if (r.errors) { clear(grid); clear(stats); notes.innerHTML = r.errors.map((e) => `<span style="color:var(--sup-not-red-text)">Line ${e.line + 1}: ${e.message}</span>`).join("<br>"); return; }
    const maxC = Math.max(...r.rows.map((x) => Math.max(...Object.keys(x.cells).map(Number))));
    const t = h("table.w-table", { style: { width: "auto" } });
    t.append(h("tr", h("th", "instruction"), [...Array(maxC)].map((_, c) => h("th", { style: { textAlign: "center", minWidth: "38px" } }, String(c + 1)))));
    for (const row of r.rows) {
      const tr = h("tr", h("td", { style: { opacity: row.flushed ? 0.55 : 1, textDecoration: row.flushed ? "line-through" : "none" } }, row.text));
      for (let c = 1; c <= maxC; c++) {
        const v = row.cells[c] || "";
        const col = STAGE_COLOR[v];
        tr.append(h("td", { style: { textAlign: "center", padding: "3px 4px" } }, v ? h("span", { style: {
          display: "inline-block", minWidth: "34px", padding: "1px 4px", borderRadius: "5px", fontWeight: 500,
          background: col ? `color-mix(in srgb, var(--sup-${col}-bg) ${row.flushed ? 30 : 75}%, transparent)` : v === "✕" ? "color-mix(in srgb, var(--sup-not-red-bg) 60%, transparent)" : "var(--row-selected)",
          color: col ? "var(--text)" : "var(--text-caption)", opacity: row.flushed && col ? 0.7 : 1,
        } }, v) : ""));
      }
      t.append(tr);
    }
    clear(grid).append(t);
    const ideal = r.executed + 4;
    clear(stats).append(
      stat("Total cycles", `${r.cycles}`),
      stat("Ideal (no hazards)", `${r.executed} + 4 = ${ideal}`),
      stat("Stall cycles", String(r.stalls), r.stalls ? "bad" : "good"),
      stat("Flushed instructions", String(r.flushed), r.flushed ? "bad" : "good"),
    );
    const lines = r.rows.filter((x) => x.notes.length && !x.flushed).map((x) => `<code>${x.text}</code> — ${x.notes.join("; ")}`);
    notes.innerHTML = (lines.length ? lines.join("<br>") : "No hazards in this sequence under these assumptions.") + (r.truncated ? "<br><i>Stopped after 24 executed instructions.</i>" : "");
  }
  src.addEventListener("input", paint);
  body.append(
    h("div.w-row", select(Object.keys(PROGRAMS), first, (v) => { src.value = PROGRAMS[v]; paint(); })),
    src,
    h("div.w-row",
      h("span.w-label", "Forwarding"), seg([["on", "MEM→EX + WB→EX"], ["off", "None"]], o.fwd ? "on" : "off", (v) => { o.fwd = v === "on"; paint(); }),
      h("span.w-label", "RegFile"), seg([["on", "Write-then-read"], ["off", "Write at edge only"]], o.wtr ? "on" : "off", (v) => { o.wtr = v === "on"; paint(); }),
      h("span.w-label", "Branch resolves in"), seg([["MEM", "MEM"], ["EX", "EX"]], o.resolve, (v) => { o.resolve = v; paint(); }),
    ),
    grid, stats, notes,
    h("div.w-note", "“–” is a bubble: the instruction is held in IF or ID while an earlier one finishes. Branches are predicted not-taken; the program is actually executed, so loops and taken branches show real behavior."),
  );
  paint();
}
