// Instruction encoder / decoder: assembly ⇄ 32-bit machine code with a colored field breakdown.
import { h, frame, stat, clear, hex, parseNum } from "./_kit.js";
import { assemble, encode, decode, disasm, layout, formatOf, REG_NAMES } from "./rv.js";

const EXAMPLES = ["add t0, t1, t2", "addi a0, a0, -1", "lw t0, 8(sp)", "sw a0, 12(s0)", "beq a0, a1, 16", "bne t0, x0, -8", "jal ra, 2048", "lui a0, 0x12345", "srai t0, t1, 3", "jalr x0, ra, 0"];
const NAMES = { R: "R-type: register–register", I: "I-type: immediate, load, jalr", S: "S-type: store", B: "B-type: branch", U: "U-type: upper immediate", J: "J-type: jump" };

export default function mount(el, opts) {
  const body = frame(el, "Instruction encoder / decoder");
  const asm = h("input.w-input", { value: opts.inst || "beq a0, a1, 16", style: { flex: "1", minWidth: "200px" }, spellcheck: false, "aria-label": "Assembly instruction" });
  const word = h("input.w-input", { style: { width: "120px" }, spellcheck: false, "aria-label": "Machine code (hex)" });
  const fieldsEl = h("div.w-scroll");
  const stats = h("div.w-grid");
  const note = h("div.w-note");

  function show(inst, w) {
    const fields = layout(inst.name);
    const bits = w.toString(2).padStart(32, "0");
    const row = h("div", { style: { display: "flex", gap: "3px", minWidth: "660px", paddingTop: "14px" } });
    for (const f of fields) {
      const width = f.hi - f.lo + 1;
      const val = (w >>> f.lo) & (2 ** width - 1);
      const meaning = /^rs|^rd/.test(f.label) ? REG_NAMES[val] : f.label === "opcode" ? "0x" + val.toString(16).padStart(2, "0") : f.label.startsWith("funct") ? "0x" + val.toString(16) : "";
      row.append(h(`div.${f.cls}`, { style: { flex: `${width} 0 0`, minWidth: Math.max(width * 13, 46) + "px", borderRadius: "6px", padding: "4px 2px 6px", textAlign: "center", position: "relative", whiteSpace: "nowrap" } },
        h("small", { style: { position: "absolute", left: "3px", top: "-13px", font: "400 9px/10px var(--font-mono)", color: "var(--gray)" } }, String(f.hi)),
        h("small", { style: { position: "absolute", right: "3px", top: "-13px", font: "400 9px/10px var(--font-mono)", color: "var(--gray)" } }, width > 1 ? String(f.lo) : ""),
        h("div", { style: { font: "500 13px/18px var(--font-mono)", letterSpacing: "0.5px" } }, bits.slice(31 - f.hi, 32 - f.lo)),
        h("div", { style: { font: "500 10px/13px var(--font-ui)" } }, f.label),
        h("div", { style: { font: "400 10px/13px var(--font-mono)", color: "var(--text-caption)", minHeight: "13px" } }, meaning),
      ));
    }
    clear(fieldsEl).append(row);
    const fmt = formatOf(inst.name);
    clear(stats).append(
      stat("Format", NAMES[fmt] || fmt),
      stat("Machine code", hex(w, 8)),
      stat("Canonical form", disasm(inst)),
      stat("Immediate (decimal)", ["R"].includes(fmt) ? "none" : String(inst.imm)),
    );
    const extra = {
      B: `The immediate is a <b>byte offset from this instruction's PC</b>. Bit 0 is always 0 so it is not stored; the 12 stored bits are imm[12:1], scattered as imm[12 | 10:5] and imm[4:1 | 11] so rs1, rs2 and funct3 stay in the same place as S-type. Target = PC + (${inst.imm}).`,
      J: `20 stored bits hold imm[20:1] in the order imm[20 | 10:1 | 11 | 19:12]. Target = PC + (${inst.imm}); range ±1 MiB (±2<sup>18</sup> instructions).`,
      S: "The 12-bit immediate is split around rs2/rs1 so that the register fields never move: imm[11:5] on top, imm[4:0] where rd would be.",
      U: `The 20-bit immediate becomes the <b>upper</b> 20 bits of the result: ${hex(inst.imm * 4096, 8)}. The low 12 bits are zero.`,
      I: "One 12-bit two's complement immediate (−2048 … 2047) in the top bits, sign-extended to 32 bits. Shifts by immediate use only the low 5 bits (shamt) and keep a funct7.",
      R: "No immediate. opcode + funct3 + funct7 together choose the operation; sub and sra differ from add and srl only in funct7 = 0x20.",
    }[fmt];
    note.innerHTML = extra;
  }

  function fromAsm() {
    const { insts, errors } = assemble(asm.value);
    if (errors.length || !insts.length) { note.innerHTML = `<span style="color:var(--sup-not-red-text)">${errors[0]?.message || "Type one instruction."}</span>`; return; }
    const w = encode(insts[0]);
    word.value = hex(w, 8);
    show(insts[0], w);
    if (insts.length > 1) note.innerHTML += ` <b>Pseudo-instruction:</b> expands to ${insts.length} real instructions (${insts.map(disasm).join("; ")}); showing the first.`;
  }
  function fromWord() {
    const w = parseNum(word.value.trim().startsWith("0x") ? word.value : "0x" + word.value);
    const inst = Number.isNaN(w) ? null : decode(w);
    if (!inst) { note.innerHTML = `<span style="color:var(--sup-not-red-text)">Not a recognised RV32I instruction.</span>`; return; }
    asm.value = disasm(inst);
    show(inst, w >>> 0);
  }
  asm.addEventListener("input", fromAsm);
  word.addEventListener("change", fromWord);
  word.addEventListener("keydown", (e) => { if (e.key === "Enter") fromWord(); });

  body.append(
    h("div.w-row", h("span.w-label", "Assembly"), asm, h("span.w-label", "Hex"), word),
    h("div.w-row", h("span.w-label", "Try"), EXAMPLES.map((e) => h("button.w-btn", { type: "button", onclick: () => { asm.value = e; fromAsm(); } }, e.split(" ")[0]))),
    fieldsEl,
    h("div.legend", h("span", h("i.f-f"), "opcode"), h("span", h("i.f-d"), "funct3 / funct7"), h("span", h("i.f-a"), "rs1"), h("span", h("i.f-b"), "rs2"), h("span", h("i.f-c"), "rd"), h("span", h("i.f-e"), "immediate")),
    stats, note,
  );
  fromAsm();
}
