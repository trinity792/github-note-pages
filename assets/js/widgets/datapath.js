// Single-cycle RV32I datapath: pick an instruction, see which wires and blocks it uses and every control signal.
import { h, s, frame, clear } from "./_kit.js";

// Wire polylines (x,y pairs). Names are referenced by each instruction's "on" list.
const WIRES = {
  pcnext: [36, 205, 52, 205],
  pc: [82, 205, 110, 205],
  pc_add: [96, 205, 96, 76, 110, 76],
  pc4_pcsel: [146, 76, 160, 76, 160, 30, 8, 30, 8, 192, 20, 192],
  pc4_wb: [160, 30, 748, 30, 748, 235, 760, 235],
  pc_asel: [96, 205, 96, 276, 425, 276, 425, 184, 440, 184],
  inst: [170, 205, 200, 205, 200, 170, 230, 170],
  inst_rs2: [200, 205, 200, 220, 230, 220],
  inst_imm: [200, 205, 200, 320, 230, 320],
  r1: [310, 170, 330, 170, 330, 162, 440, 162],
  r1_br: [340, 162, 340, 104, 350, 104],
  r2: [310, 220, 330, 220, 330, 227, 440, 227],
  r2_br: [365, 227, 365, 140, 365, 122, 350, 122],
  r2_dmem: [380, 227, 380, 290, 595, 290, 595, 250, 610, 250],
  imm: [310, 320, 432, 320, 432, 249, 440, 249],
  a: [456, 172, 490, 172],
  b: [456, 238, 490, 238],
  alu_dmem: [550, 205, 610, 205],
  alu_wb: [575, 205, 575, 312, 738, 312, 738, 205, 760, 205],
  alu_pc: [575, 205, 575, 46, 14, 46, 14, 218, 20, 218],
  mem: [690, 205, 720, 205, 720, 175, 760, 175],
  wb: [776, 205, 800, 205, 800, 384, 214, 384, 214, 250, 230, 250],
};
const LABELS = [
  ["pc", 86, 200], ["pc+4", 170, 26], ["inst", 174, 200], ["R[rs1]", 314, 158], ["R[rs2]", 314, 215], ["imm", 318, 316],
  ["alu", 554, 200], ["mem", 694, 200], ["wb", 780, 200],
];
// Blocks: [id, x, y, w, h, label, kind]
const BLOCKS = [
  ["pcreg", 52, 185, 30, 40, "PC", "reg"], ["add4", 110, 60, 36, 32, "+4", "box"], ["imem", 110, 170, 60, 70, "IMEM", "box"],
  ["regfile", 230, 140, 80, 120, "RegFile", "box"], ["immgen", 230, 300, 80, 40, "ImmGen", "box"], ["brcomp", 350, 92, 62, 40, "Branch\nComp", "box"],
  ["alu", 490, 160, 60, 90, "ALU", "box"], ["dmem", 610, 165, 80, 110, "DMEM", "box"],
];
// Muxes: [id, x, yTop, yBot, label, inputLabels]
const MUXES = [
  ["pcsel", 20, 180, 230, "PCSel", ["+4", "alu"]], ["asel", 440, 150, 196, "ASel", ["reg", "pc"]], ["bsel", 440, 215, 261, "BSel", ["reg", "imm"]],
  ["wbsel", 760, 160, 250, "WBSel", ["mem", "alu", "pc+4"]],
];

const BASE = ["pcnext", "pc", "pc_add", "inst", "pcsel", "pcreg", "add4", "imem"];
const NEXT4 = ["pc4_pcsel"];
const I = {
  add: { rtl: "R[rd] = R[rs1] + R[rs2];  PC = PC + 4", fmt: "R", phases: "IF ID EX WB",
    on: [...NEXT4, "inst_rs2", "regfile", "r1", "r2", "asel", "bsel", "a", "b", "alu", "alu_wb", "wbsel", "wb"],
    ctl: ["+4", "*", "*", "Reg", "Reg", "Add", "Read", "1", "ALU"], why: "Both ALU inputs come from registers. Nothing touches memory, so MEM is idle. sub is identical except ALUSel = Sub." },
  addi: { rtl: "R[rd] = R[rs1] + imm;  PC = PC + 4", fmt: "I", phases: "IF ID EX WB",
    on: [...NEXT4, "inst_imm", "regfile", "immgen", "r1", "imm", "asel", "bsel", "a", "b", "alu", "alu_wb", "wbsel", "wb"],
    ctl: ["+4", "I", "*", "Reg", "Imm", "Add", "Read", "1", "ALU"], why: "Same path as add, except BSel picks the sign-extended immediate instead of R[rs2]." },
  lw: { rtl: "R[rd] = Mem[R[rs1] + imm];  PC = PC + 4", fmt: "I", phases: "IF ID EX MEM WB",
    on: [...NEXT4, "inst_imm", "regfile", "immgen", "r1", "imm", "asel", "bsel", "a", "b", "alu", "alu_dmem", "dmem", "mem", "wbsel", "wb"],
    ctl: ["+4", "I", "*", "Reg", "Imm", "Add", "Read", "1", "Mem"], why: "The ALU computes the address. This is the only instruction class active in all five phases, so it is the critical path that sets the clock period." },
  sw: { rtl: "Mem[R[rs1] + imm] = R[rs2];  PC = PC + 4", fmt: "S", phases: "IF ID EX MEM",
    on: [...NEXT4, "inst_rs2", "inst_imm", "regfile", "immgen", "r1", "r2", "r2_dmem", "imm", "asel", "bsel", "a", "b", "alu", "alu_dmem", "dmem"],
    ctl: ["+4", "S", "*", "Reg", "Imm", "Add", "Write", "0", "*"], why: "R[rs2] bypasses the ALU and goes straight to DMEM's data input. Nothing is written back, so RegWEn must be 0 and WBSel is a true don't-care." },
  "beq (taken)": { rtl: "if (R[rs1] == R[rs2]) PC = PC + imm", fmt: "B", phases: "IF ID EX",
    on: ["inst_rs2", "inst_imm", "regfile", "immgen", "r1_br", "r2_br", "r1", "r2", "brcomp", "pc_asel", "imm", "asel", "bsel", "a", "b", "alu", "alu_pc"],
    ctl: ["ALU", "B", "*", "PC", "Imm", "Add", "Read", "0", "*"], why: "Two jobs at once: the branch comparator compares the registers while the ALU computes PC + imm. BrEq = 1 makes the controller set PCSel = ALU." },
  "beq (not taken)": { rtl: "R[rs1] != R[rs2], so PC = PC + 4", fmt: "B", phases: "IF ID EX",
    on: [...NEXT4, "inst_rs2", "inst_imm", "regfile", "immgen", "r1_br", "r2_br", "r1", "r2", "brcomp", "pc_asel", "imm", "asel", "bsel", "a", "b", "alu"],
    ctl: ["+4", "B", "*", "PC", "Imm", "Add", "Read", "0", "*"], why: "The ALU still computes the target (hardware can't know not to), but BrEq = 0 so PCSel keeps PC + 4. PCSel is the one signal that depends on datapath results." },
  jal: { rtl: "R[rd] = PC + 4;  PC = PC + imm", fmt: "J", phases: "IF ID EX WB",
    on: ["inst_imm", "immgen", "pc_asel", "imm", "asel", "bsel", "a", "b", "alu", "alu_pc", "pc4_wb", "regfile", "wbsel", "wb"],
    ctl: ["ALU", "J", "*", "PC", "Imm", "Add", "Read", "1", "PC+4"], why: "The ALU makes the target from PC + imm. The link value PC + 4 reaches the RegFile through WBSel's third input." },
  jalr: { rtl: "R[rd] = PC + 4;  PC = R[rs1] + imm", fmt: "I", phases: "IF ID EX WB",
    on: ["inst_imm", "regfile", "immgen", "r1", "imm", "asel", "bsel", "a", "b", "alu", "alu_pc", "pc4_wb", "wbsel", "wb"],
    ctl: ["ALU", "I", "*", "Reg", "Imm", "Add", "Read", "1", "PC+4"], why: "Like jal, but the base is a register (ASel = Reg) and the immediate is I-type." },
  lui: { rtl: "R[rd] = imm << 12;  PC = PC + 4", fmt: "U", phases: "IF ID EX WB",
    on: [...NEXT4, "inst_imm", "immgen", "imm", "bsel", "b", "alu", "alu_wb", "regfile", "wbsel", "wb"],
    ctl: ["+4", "U", "*", "*", "Imm", "B (pass)", "Read", "1", "ALU"], why: "ImmGen already produces the shifted 32-bit value; the ALU just passes input B through. ASel is a don't-care." },
  auipc: { rtl: "R[rd] = PC + (imm << 12);  PC = PC + 4", fmt: "U", phases: "IF ID EX WB",
    on: [...NEXT4, "inst_imm", "immgen", "pc_asel", "imm", "asel", "bsel", "a", "b", "alu", "alu_wb", "regfile", "wbsel", "wb"],
    ctl: ["+4", "U", "*", "PC", "Imm", "Add", "Read", "1", "ALU"], why: "lui plus the PC: ASel = PC." },
};
const SIGNALS = ["PCSel", "ImmSel", "BrUn", "ASel", "BSel", "ALUSel", "MemRW", "RegWEn", "WBSel"];
const MUX_CHOICE = { pcsel: { "+4": 0, ALU: 1 }, asel: { Reg: 0, PC: 1 }, bsel: { Reg: 0, Imm: 1 }, wbsel: { Mem: 0, ALU: 1, "PC+4": 2 } };
const MUX_SIGNAL = { pcsel: 0, asel: 3, bsel: 4, wbsel: 8 };

export default function mount(el, opts) {
  const body = frame(el, "Single-cycle datapath");
  let cur = opts.inst && I[opts.inst] ? opts.inst : "add";
  const pick = h("div.w-row");
  const draw = h("div.w-scroll");
  const table = h("div.w-scroll");
  const info = h("div.w-note", { style: { fontSize: "13px", lineHeight: "20px" } });

  function paint() {
    const ins = I[cur];
    const on = new Set([...BASE, ...ins.on]);
    clear(pick).append(h("span.w-label", "Instruction"), ...Object.keys(I).map((k) => h(`button.w-btn${k === cur ? ".primary" : ""}`, { type: "button", onclick: () => { cur = k; paint(); } }, k)));

    const svg = s("svg", { class: "w-svg", viewBox: "0 0 815 400", style: "min-width:700px" });
    const ON = "var(--primary-fg)", OFF = "var(--gray)";
    for (const [id, pts] of Object.entries(WIRES)) {
      const act = on.has(id);
      const p = [];
      for (let k = 0; k < pts.length; k += 2) p.push(`${pts[k]},${pts[k + 1]}`);
      svg.append(s("polyline", { points: p.join(" "), fill: "none", stroke: act ? ON : OFF, "stroke-width": act ? 2.4 : 1.1, "stroke-opacity": act ? 1 : 0.4, "stroke-linejoin": "round" }));
    }
    for (const [id, x, y, w, hh, label, kind] of BLOCKS) {
      const act = on.has(id);
      svg.append(s("rect", { x, y, width: w, height: hh, rx: kind === "reg" ? 3 : 7, fill: act ? "var(--bg-container)" : "var(--bg)", stroke: act ? ON : OFF, "stroke-width": act ? 1.8 : 1, opacity: act ? 1 : 0.55 }));
      label.split("\n").forEach((ln, k, arr) => svg.append(s("text", { x: x + w / 2, y: y + hh / 2 + 4 + (k - (arr.length - 1) / 2) * 12, "text-anchor": "middle", "font-size": 11, "font-weight": 500, opacity: act ? 1 : 0.5 }, ln)));
      if (kind === "reg") svg.append(s("path", { d: `M${x + 9} ${y + hh} l6 -7 l6 7`, fill: "none", stroke: act ? ON : OFF }));
    }
    for (const [id, x, y0, y1, label, ins2] of MUXES) {
      const act = on.has(id);
      const val = ins.ctl[MUX_SIGNAL[id]];
      const chosen = MUX_CHOICE[id][val];
      svg.append(s("polygon", { points: `${x},${y0} ${x + 16},${y0 + 10} ${x + 16},${y1 - 10} ${x},${y1}`, fill: act ? "var(--bg-container)" : "var(--bg)", stroke: act ? ON : OFF, "stroke-width": act ? 1.8 : 1, opacity: act ? 1 : 0.55 }));
      svg.append(s("text", { x: x + 8, y: y1 + 13, "text-anchor": "middle", "font-size": 9.5, fill: "var(--sup-carrot-text)", opacity: act ? 1 : 0.6 }, label));
      ins2.forEach((t, k) => {
        const yy = y0 + ((k + 0.5) * (y1 - y0)) / ins2.length;
        svg.append(s("text", { x: x - 3, y: yy - 4, "text-anchor": "end", "font-size": 8, class: "muted mono", "font-weight": k === chosen ? 700 : 400, fill: k === chosen ? ON : null }, String(k)));
      });
    }
    for (const [t, x, y] of LABELS) svg.append(s("text", { x, y, "font-size": 9, class: "muted mono" }, t));
    // control outputs that come back from the datapath
    svg.append(s("text", { x: 381, y: 86, "text-anchor": "middle", "font-size": 9, fill: "var(--sup-carrot-text)", opacity: on.has("brcomp") ? 1 : 0.5 }, "BrEq, BrLT → control"));
    svg.append(s("text", { x: 270, y: 134, "text-anchor": "middle", "font-size": 9, fill: "var(--sup-carrot-text)" }, `RegWEn = ${ins.ctl[7]}`));
    svg.append(s("text", { x: 650, y: 159, "text-anchor": "middle", "font-size": 9, fill: "var(--sup-carrot-text)" }, `MemRW = ${ins.ctl[6]}`));
    svg.append(s("text", { x: 520, y: 154, "text-anchor": "middle", "font-size": 9, fill: "var(--sup-carrot-text)" }, `ALUSel = ${ins.ctl[5]}`));
    svg.append(s("text", { x: 270, y: 354, "text-anchor": "middle", "font-size": 9, fill: "var(--sup-carrot-text)" }, `ImmSel = ${ins.ctl[1]}`));
    // phase ruler
    const phases = [["IF", 0, 215], ["ID", 215, 425], ["EX", 425, 590], ["MEM", 590, 730], ["WB", 730, 815]];
    for (const [nm, x0, x1] of phases) {
      const used = ins.phases.split(" ").includes(nm);
      svg.append(s("rect", { x: x0 + 3, y: 2, width: x1 - x0 - 6, height: 14, rx: 7, fill: used ? "var(--primary)" : "var(--row-selected)" }), s("text", { x: (x0 + x1) / 2, y: 12.5, "text-anchor": "middle", "font-size": 9, "font-weight": 600, fill: used ? "var(--contrast-text)" : "var(--gray)" }, nm));
    }
    clear(draw).append(svg);

    const t = h("table.w-table", h("tr", SIGNALS.map((x) => h("th", x))), h("tr", ins.ctl.map((x) => h("td", { style: { fontWeight: 600, color: x === "*" ? "var(--gray)" : "var(--primary-text)" } }, x))));
    clear(table).append(t);
    info.innerHTML = `<b>${cur.split(" ")[0]}</b> · ${ins.fmt}-type · <code>${ins.rtl}</code><br>${ins.why} <span style="opacity:.75">(* = don't care)</span>`;
  }

  body.append(pick, draw, table, info);
  paint();
}
