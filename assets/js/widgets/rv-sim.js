// Step-through RISC-V simulator: registers, stack memory, and the current instruction.
import { revealRow, h, frame, select, clear, hex } from "./_kit.js";
import { assemble, machine, REG_NAMES, disasm } from "./rv.js";

const PROGRAMS = {
  "Loop: sum an array": `# int sum = 0; for (i = 0; i < 4; i++) sum += arr[i];
        addi sp, sp, -16      # make a 4-int array on the stack
        li   t0, 3
        sw   t0, 0(sp)
        li   t0, 1
        sw   t0, 4(sp)
        li   t0, 4
        sw   t0, 8(sp)
        li   t0, 1
        sw   t0, 12(sp)
        mv   a0, sp           # a0 = arr
        li   a1, 4            # a1 = n
        li   t0, 0            # t0 = sum
        li   t1, 0            # t1 = i
loop:   bge  t1, a1, done     # if (i >= n) exit loop
        slli t2, t1, 2        # t2 = i * 4   (byte offset)
        add  t2, a0, t2       # t2 = &arr[i]
        lw   t3, 0(t2)        # t3 = arr[i]
        add  t0, t0, t3
        addi t1, t1, 1
        j    loop
done:   mv   a0, t0           # a0 = 9
        addi sp, sp, 16`,
  "Call: sum_square with the stack": `# main calls sum_square(3, 4) = 3*3 + 4*4
main:   li   a0, 3
        li   a1, 4
        jal  ra, sum_square   # a0 = 25
        j    end

sum_square:
        addi sp, sp, -12      # prologue: 3 words
        sw   ra, 8(sp)        # we call mult, so ra will be clobbered
        sw   s0, 4(sp)        # we use s0 and s1, so we must preserve them
        sw   s1, 0(sp)
        mv   s0, a1           # keep y alive across the call
        mv   a1, a0
        jal  ra, mult         # a0 = x * x
        mv   s1, a0           # keep x*x alive across the next call
        mv   a0, s0
        mv   a1, s0
        jal  ra, mult         # a0 = y * y
        add  a0, a0, s1
        lw   s1, 0(sp)        # epilogue: restore in any order, then pop
        lw   s0, 4(sp)
        lw   ra, 8(sp)
        addi sp, sp, 12
        ret

mult:   mul  a0, a0, a1       # leaf: no stack needed
        ret
end:    nop`,
  "lb vs lbu": `# Same byte, two loads: sign- vs zero-extension
        li   t0, 0x1F8        # low byte is 0xF8
        addi sp, sp, -4
        sw   t0, 0(sp)
        lb   a0, 0(sp)        # a0 = 0xFFFFFFF8 = -8
        lbu  a1, 0(sp)        # a1 = 0x000000F8 = 248
        srai a2, a0, 1        # arithmetic shift keeps the sign: -4
        srli a3, a0, 1        # logical shift does not: 0x7FFFFFFC
        addi sp, sp, 4`,
};

export default function mount(el, opts) {
  const body = frame(el, "RISC-V stepper");
  const names = Object.keys(PROGRAMS);
  const src = h("textarea.w-text", { rows: 14, spellcheck: false, "aria-label": "Assembly program" });
  src.value = PROGRAMS[opts.program] || PROGRAMS[names[0]];
  const listing = h("div.w-scroll", { style: { maxHeight: "330px", overflowY: "auto", border: "1px solid var(--border)", borderRadius: "8px" } });
  const regs = h("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(124px, 1fr))", gap: "2px 10px", font: "400 12px/20px var(--font-mono)" } });
  const stack = h("div.w-scroll");
  const status = h("div.w-note");
  let prog = null, m = null, editing = false, changed = new Set();
  let radix = "hex";

  function load() {
    prog = assemble(src.value);
    m = machine(prog.insts);
    changed = new Set();
    paint();
  }

  function paint() {
    clear(listing);
    const t = h("table.w-table");
    if (prog.errors.length) {
      status.innerHTML = prog.errors.map((e) => `<span style="color:var(--sup-not-red-text)">Line ${e.line + 1}: ${e.message}</span>`).join("<br>");
    } else {
      const cur = m.current();
      status.innerHTML = m.halted ? `<b>Done</b> after ${m.steps} instructions. Press Reset to run again.` : `Next: <code>${disasm(cur)}</code> at PC = ${hex(m.pc, 4)} · ${m.steps} executed`;
    }
    const labelAt = Object.fromEntries(Object.entries(prog.labels).map(([k, v]) => [v, k]));
    for (const i of prog.insts) {
      const row = h(`tr${!m.halted && i.pc === m.pc ? ".cur" : ""}`,
        h("td", { style: { color: "var(--text-caption)" } }, hex(i.pc, 4)),
        h("td", { style: { color: "var(--syn-function)" } }, labelAt[i.pc] ? labelAt[i.pc] + ":" : ""),
        h("td", disasm(i)));
      t.append(row);
    }
    listing.append(t);
    revealRow(listing, listing.querySelector("tr.cur"));

    clear(regs);
    const fmt = (v) => (radix === "hex" ? hex(v, 8) : String(v));
    regs.append(h("div", { style: { color: "var(--primary-text)" } }, `pc   ${hex(m.pc, 8)}`));
    for (let r = 0; r < 32; r++) {
      const hot = changed.has(r);
      regs.append(h("div", { style: { background: hot ? "color-mix(in srgb, var(--sup-honey-bg) 60%, transparent)" : "", borderRadius: "4px", padding: "0 4px", color: m.x[r] === 0 && !hot ? "var(--gray)" : "" } },
        h("span", { style: { color: "var(--syn-property)" } }, REG_NAMES[r].padEnd(5, " ").replace(/ /g, " ")), fmt(m.x[r])));
    }

    clear(stack);
    const sp = m.x[2] >>> 0, top = 0x7ffffff0;
    const tbl = h("table.w-table", { style: { width: "auto" } }, h("tr", h("th", "address"), h("th", "word"), h("th", "")));
    const lo = Math.min(sp, top - 4), rows = Math.min(12, Math.max(1, (top - lo) / 4));
    for (let k = 0; k < rows; k++) {
      const a = lo + k * 4;
      const hit = m.lastMem && a >= (m.lastMem.addr & ~3) && a < m.lastMem.addr + m.lastMem.n;
      tbl.append(h(`tr${hit ? ".cur" : ""}`, h("td", hex(a, 8)), h("td", fmt(m.load(a, 4, true))), h("td", { style: { color: "var(--primary-text)" } }, a === sp ? "← sp" : "")));
    }
    stack.append(sp >= top ? h("div.w-note", "Stack is empty (sp is at its starting value). It grows toward lower addresses.") : tbl);
  }

  const step = () => { if (m.halted || prog.errors.length) return; const before = Int32Array.from(m.x); m.step(); changed = new Set([...Array(32).keys()].filter((r) => m.x[r] !== before[r])); paint(); };
  const run = () => { let guard = 0; const before = Int32Array.from(m.x); while (!m.halted && guard++ < 5000) m.step(); changed = new Set([...Array(32).keys()].filter((r) => m.x[r] !== before[r])); paint(); };
  const editBtn = h("button.w-btn", { type: "button", onclick: () => { editing = !editing; src.style.display = editing ? "" : "none"; listing.style.display = editing ? "none" : ""; editBtn.textContent = editing ? "Assemble" : "Edit code"; if (!editing) load(); } }, "Edit code");
  src.style.display = "none";

  body.append(
    h("div.w-row",
      select(names, opts.program || names[0], (v) => { src.value = PROGRAMS[v]; load(); }),
      h("button.w-btn.primary", { type: "button", onclick: step }, "Step"),
      h("button.w-btn", { type: "button", onclick: run }, "Run to end"),
      h("button.w-btn", { type: "button", onclick: load }, "Reset"),
      editBtn,
      select([["hex", "hex"], ["dec", "decimal"]], radix, (v) => { radix = v; paint(); }),
    ),
    status, src, listing,
    h("div.w-label", "Registers (changed by the last step are highlighted)"), regs,
    h("div.w-label", "Stack memory"), stack,
  );
  load();
}
