// A small RV32I toolkit shared by the widgets: assemble, encode, decode, and execute.
// Covers the base integer instructions used in CS 61C plus the common pseudo-instructions.

export const REG_NAMES = ["zero", "ra", "sp", "gp", "tp", "t0", "t1", "t2", "s0", "s1", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7",
  "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10", "s11", "t3", "t4", "t5", "t6"];
const REG = Object.fromEntries(REG_NAMES.map((n, i) => [n, i]));
for (let i = 0; i < 32; i++) REG["x" + i] = i;
REG.fp = 8;

// name: [format, opcode, funct3, funct7]
export const INST = {
  add: ["R", 0x33, 0, 0x00], sub: ["R", 0x33, 0, 0x20], sll: ["R", 0x33, 1, 0x00], slt: ["R", 0x33, 2, 0x00], sltu: ["R", 0x33, 3, 0x00],
  xor: ["R", 0x33, 4, 0x00], srl: ["R", 0x33, 5, 0x00], sra: ["R", 0x33, 5, 0x20], or: ["R", 0x33, 6, 0x00], and: ["R", 0x33, 7, 0x00],
  mul: ["R", 0x33, 0, 0x01],
  addi: ["I", 0x13, 0], slti: ["I", 0x13, 2], sltiu: ["I", 0x13, 3], xori: ["I", 0x13, 4], ori: ["I", 0x13, 6], andi: ["I", 0x13, 7],
  slli: ["I*", 0x13, 1, 0x00], srli: ["I*", 0x13, 5, 0x00], srai: ["I*", 0x13, 5, 0x20],
  lb: ["IL", 0x03, 0], lh: ["IL", 0x03, 1], lw: ["IL", 0x03, 2], lbu: ["IL", 0x03, 4], lhu: ["IL", 0x03, 5],
  jalr: ["IJ", 0x67, 0],
  sb: ["S", 0x23, 0], sh: ["S", 0x23, 1], sw: ["S", 0x23, 2],
  beq: ["B", 0x63, 0], bne: ["B", 0x63, 1], blt: ["B", 0x63, 4], bge: ["B", 0x63, 5], bltu: ["B", 0x63, 6], bgeu: ["B", 0x63, 7],
  lui: ["U", 0x37], auipc: ["U", 0x17],
  jal: ["J", 0x6f],
};
export const formatOf = (name) => (INST[name] ? ({ "I*": "I", IL: "I", IJ: "I" }[INST[name][0]] || INST[name][0]) : null);

const num = (t) => {
  const s = String(t).trim();
  if (/^-?0x[0-9a-f]+$/i.test(s)) return (s[0] === "-" ? -1 : 1) * parseInt(s.replace("-", ""), 16);
  if (/^-?0b[01]+$/i.test(s)) return (s[0] === "-" ? -1 : 1) * parseInt(s.replace("-", "").slice(2), 2);
  if (/^-?\d+$/.test(s)) return parseInt(s, 10);
  return NaN;
};
const reg = (t) => { const r = REG[String(t).trim().toLowerCase()]; if (r === undefined) throw new Error(`unknown register "${t}"`); return r; };
const fits = (v, bits) => v >= -(2 ** (bits - 1)) && v < 2 ** (bits - 1);

/** Assemble source text. Returns { insts, labels, errors }. Each inst: { pc, name, rd, rs1, rs2, imm, target?, text, line }. */
export function assemble(source, base = 0) {
  const labels = {}, errors = [], raw = [];
  let pc = base;
  source.split("\n").forEach((lineText, line) => {
    let s = lineText.replace(/(#|\/\/).*$/, "").trim();
    let m;
    while ((m = /^([A-Za-z_.][\w.]*):\s*/.exec(s))) { labels[m[1]] = pc; s = s.slice(m[0].length); }
    if (!s || s.startsWith(".")) return;
    const sp = s.search(/\s/);
    const name = (sp < 0 ? s : s.slice(0, sp)).toLowerCase();
    const args = sp < 0 ? [] : s.slice(sp).split(",").map((a) => a.trim()).filter(Boolean);
    try {
      for (const e of expand(name, args)) { raw.push({ ...e, pc, line, text: s }); pc += 4; }
    } catch (err) { errors.push({ line, message: err.message }); }
  });

  const insts = [];
  for (const r of raw) {
    try {
      const i = build(r, labels);
      insts.push(i);
    } catch (err) { errors.push({ line: r.line, message: err.message }); }
  }
  return { insts, labels, errors };
}

// Pseudo-instruction expansion → list of { name, args }.
function expand(name, a) {
  const need = (n) => { if (a.length !== n) throw new Error(`${name} expects ${n} operand${n === 1 ? "" : "s"}`); };
  switch (name) {
    case "nop": return [{ name: "addi", args: ["x0", "x0", "0"] }];
    case "mv": need(2); return [{ name: "addi", args: [a[0], a[1], "0"] }];
    case "not": need(2); return [{ name: "xori", args: [a[0], a[1], "-1"] }];
    case "neg": need(2); return [{ name: "sub", args: [a[0], "x0", a[1]] }];
    case "j": need(1); return [{ name: "jal", args: ["x0", a[0]] }];
    case "jr": need(1); return [{ name: "jalr", args: ["x0", a[0], "0"] }];
    case "ret": return [{ name: "jalr", args: ["x0", "ra", "0"] }];
    case "call": need(1); return [{ name: "jal", args: ["ra", a[0]] }];
    case "beqz": need(2); return [{ name: "beq", args: [a[0], "x0", a[1]] }];
    case "bnez": need(2); return [{ name: "bne", args: [a[0], "x0", a[1]] }];
    case "bgt": need(3); return [{ name: "blt", args: [a[1], a[0], a[2]] }];
    case "ble": need(3); return [{ name: "bge", args: [a[1], a[0], a[2]] }];
    case "bgtu": need(3); return [{ name: "bltu", args: [a[1], a[0], a[2]] }];
    case "bleu": need(3); return [{ name: "bgeu", args: [a[1], a[0], a[2]] }];
    case "li": {
      need(2);
      const v = num(a[1]);
      if (Number.isNaN(v)) throw new Error(`li needs a number, got "${a[1]}"`);
      if (fits(v, 12)) return [{ name: "addi", args: [a[0], "x0", String(v)] }];
      const lo = ((v & 0xfff) ^ 0x800) - 0x800;            // sign-extended low 12 bits
      const hi = ((v - lo) >>> 12) & 0xfffff;               // upper 20 bits, compensating for lo's sign
      return [{ name: "lui", args: [a[0], String(hi)] }, ...(lo ? [{ name: "addi", args: [a[0], a[0], String(lo)] }] : [])];
    }
    case "jal": if (a.length === 1) return [{ name: "jal", args: ["ra", a[0]] }]; break;
    case "jalr": if (a.length === 1) return [{ name: "jalr", args: ["ra", a[0], "0"] }]; break;
    default:
  }
  if (!INST[name]) throw new Error(`unknown instruction "${name}"`);
  return [{ name, args: a }];
}

function build({ name, args, pc, line, text }, labels) {
  const [fmt] = INST[name];
  const i = { name, pc, line, text, rd: 0, rs1: 0, rs2: 0, imm: 0 };
  const need = (n) => { if (args.length !== n) throw new Error(`${name} expects ${n} operands`); };
  const immOf = (t, bits, what = "immediate") => {
    const v = num(t);
    if (Number.isNaN(v)) throw new Error(`bad ${what} "${t}"`);
    if (!fits(v, bits) && !(bits === 20 && v >= 0 && v < 2 ** 20)) throw new Error(`${what} ${v} does not fit in ${bits} bits`);
    return v;
  };
  const target = (t, bits) => {
    let off;
    if (t in labels) { i.target = t; off = labels[t] - pc; }
    else { off = num(t); if (Number.isNaN(off)) throw new Error(`unknown label "${t}"`); }
    if (off % 2) throw new Error("branch/jump offsets must be even");
    if (!fits(off, bits)) throw new Error(`offset ${off} does not fit in ${bits} bits`);
    return off;
  };
  const mem = (t) => {                                        // "imm(reg)"
    const m = /^(.*)\(\s*([\w]+)\s*\)$/.exec(t);
    if (!m) throw new Error(`expected offset(register), got "${t}"`);
    return [immOf(m[1].trim() || "0", 12, "offset"), reg(m[2])];
  };
  switch (fmt) {
    case "R": need(3); i.rd = reg(args[0]); i.rs1 = reg(args[1]); i.rs2 = reg(args[2]); break;
    case "I": need(3); i.rd = reg(args[0]); i.rs1 = reg(args[1]); i.imm = immOf(args[2], 12); break;
    case "I*": {
      need(3); i.rd = reg(args[0]); i.rs1 = reg(args[1]);
      const sh = num(args[2]);
      if (!(sh >= 0 && sh < 32)) throw new Error("shift amount must be 0–31");
      i.imm = sh; break;
    }
    case "IL": need(2); i.rd = reg(args[0]); [i.imm, i.rs1] = mem(args[1]); break;
    case "IJ":
      if (args.length === 2) { i.rd = reg(args[0]); [i.imm, i.rs1] = mem(args[1]); }
      else { need(3); i.rd = reg(args[0]); i.rs1 = reg(args[1]); i.imm = immOf(args[2], 12); }
      break;
    case "S": need(2); i.rs2 = reg(args[0]); [i.imm, i.rs1] = mem(args[1]); break;
    case "B": need(3); i.rs1 = reg(args[0]); i.rs2 = reg(args[1]); i.imm = target(args[2], 13); break;
    case "U": need(2); i.rd = reg(args[0]); i.imm = immOf(args[1], 20, "upper immediate") & 0xfffff; break;
    case "J": need(2); i.rd = reg(args[0]); i.imm = target(args[1], 21); break;
    default:
  }
  return i;
}

/** Which registers does this instruction really read / write? (x0 never counts as a destination.) */
export function uses(i) {
  const fmt = INST[i.name][0];
  const reads = [];
  if (!["U", "J"].includes(fmt)) reads.push(i.rs1);
  if (["R", "S", "B"].includes(fmt)) reads.push(i.rs2);
  const writes = ["S", "B"].includes(fmt) || i.rd === 0 ? null : i.rd;
  return {
    reads: reads.filter((r) => r !== 0), readsRs1: !["U", "J"].includes(fmt), readsRs2: ["R", "S", "B"].includes(fmt), writes,
    isLoad: fmt === "IL", isStore: fmt === "S", isBranch: fmt === "B", isJump: fmt === "J" || fmt === "IJ",
  };
}

const bitsOf = (v, hi, lo) => (v >>> lo) & ((1 << (hi - lo + 1)) - 1);

/** 32-bit machine code for an assembled instruction (as an unsigned number). */
export function encode(i) {
  const [fmt, op, f3 = 0, f7 = 0] = INST[i.name];
  const imm = i.imm | 0;
  let w = op;
  switch (fmt) {
    case "R": w |= (i.rd << 7) | (f3 << 12) | (i.rs1 << 15) | (i.rs2 << 20) | (f7 << 25); break;
    case "I": case "IL": case "IJ": w |= (i.rd << 7) | (f3 << 12) | (i.rs1 << 15) | ((imm & 0xfff) << 20); break;
    case "I*": w |= (i.rd << 7) | (f3 << 12) | (i.rs1 << 15) | ((imm & 0x1f) << 20) | (f7 << 25); break;
    case "S": w |= (bitsOf(imm, 4, 0) << 7) | (f3 << 12) | (i.rs1 << 15) | (i.rs2 << 20) | (bitsOf(imm, 11, 5) << 25); break;
    case "B": w |= (bitsOf(imm, 11, 11) << 7) | (bitsOf(imm, 4, 1) << 8) | (f3 << 12) | (i.rs1 << 15) | (i.rs2 << 20) | (bitsOf(imm, 10, 5) << 25) | (bitsOf(imm, 12, 12) << 31); break;
    case "U": w |= (i.rd << 7) | ((imm & 0xfffff) << 12); break;
    case "J": w |= (i.rd << 7) | (bitsOf(imm, 19, 12) << 12) | (bitsOf(imm, 11, 11) << 20) | (bitsOf(imm, 10, 1) << 21) | (bitsOf(imm, 20, 20) << 31); break;
    default:
  }
  return w >>> 0;
}

/** Field breakdown for display: [{ label, hi, lo, cls, note }] from bit 31 down to 0. */
export function layout(name) {
  const fmt = INST[name][0];
  const f = (label, hi, lo, cls, note = "") => ({ label, hi, lo, cls, note });
  const tail = [f("opcode", 6, 0, "f-f")];
  switch (fmt) {
    case "R": return [f("funct7", 31, 25, "f-d"), f("rs2", 24, 20, "f-b"), f("rs1", 19, 15, "f-a"), f("funct3", 14, 12, "f-d"), f("rd", 11, 7, "f-c"), ...tail];
    case "I": case "IL": case "IJ": return [f("imm[11:0]", 31, 20, "f-e"), f("rs1", 19, 15, "f-a"), f("funct3", 14, 12, "f-d"), f("rd", 11, 7, "f-c"), ...tail];
    case "I*": return [f("funct7", 31, 25, "f-d"), f("shamt", 24, 20, "f-e"), f("rs1", 19, 15, "f-a"), f("funct3", 14, 12, "f-d"), f("rd", 11, 7, "f-c"), ...tail];
    case "S": return [f("imm[11:5]", 31, 25, "f-e"), f("rs2", 24, 20, "f-b"), f("rs1", 19, 15, "f-a"), f("funct3", 14, 12, "f-d"), f("imm[4:0]", 11, 7, "f-e"), ...tail];
    case "B": return [f("imm[12]", 31, 31, "f-e"), f("imm[10:5]", 30, 25, "f-e"), f("rs2", 24, 20, "f-b"), f("rs1", 19, 15, "f-a"), f("funct3", 14, 12, "f-d"), f("imm[4:1]", 11, 8, "f-e"), f("imm[11]", 7, 7, "f-e"), ...tail];
    case "U": return [f("imm[31:12]", 31, 12, "f-e"), f("rd", 11, 7, "f-c"), ...tail];
    case "J": return [f("imm[20]", 31, 31, "f-e"), f("imm[10:1]", 30, 21, "f-e"), f("imm[11]", 20, 20, "f-e"), f("imm[19:12]", 19, 12, "f-e"), f("rd", 11, 7, "f-c"), ...tail];
    default: return tail;
  }
}

const sext = (v, bits) => (v << (32 - bits)) >> (32 - bits);

/** Decode a 32-bit word. Returns an instruction object or null. */
export function decode(word, pc = 0) {
  const w = word >>> 0;
  const op = w & 0x7f, rd = bitsOf(w, 11, 7), f3 = bitsOf(w, 14, 12), rs1 = bitsOf(w, 19, 15), rs2 = bitsOf(w, 24, 20), f7 = bitsOf(w, 31, 25);
  for (const [name, [fmt, o, g3, g7]] of Object.entries(INST)) {
    if (o !== op) continue;
    const i = { name, pc, rd: 0, rs1: 0, rs2: 0, imm: 0 };
    switch (fmt) {
      case "R": if (g3 !== f3 || g7 !== f7) continue; return { ...i, rd, rs1, rs2 };
      case "I": case "IL": case "IJ": if (g3 !== f3) continue; return { ...i, rd, rs1, imm: sext(w >>> 20, 12) };
      case "I*": if (g3 !== f3 || g7 !== f7) continue; return { ...i, rd, rs1, imm: rs2 };
      case "S": if (g3 !== f3) continue; return { ...i, rs1, rs2, imm: sext((f7 << 5) | rd, 12) };
      case "B": if (g3 !== f3) continue; return { ...i, rs1, rs2, imm: sext((bitsOf(w, 31, 31) << 12) | (bitsOf(w, 7, 7) << 11) | (bitsOf(w, 30, 25) << 5) | (bitsOf(w, 11, 8) << 1), 13) };
      case "U": return { ...i, rd, imm: w >>> 12 };
      case "J": return { ...i, rd, imm: sext((bitsOf(w, 31, 31) << 20) | (bitsOf(w, 19, 12) << 12) | (bitsOf(w, 20, 20) << 11) | (bitsOf(w, 30, 21) << 1), 21) };
      default:
    }
  }
  return null;
}

/** Canonical assembly text for an instruction object. */
export function disasm(i) {
  const r = (n) => REG_NAMES[n];
  const fmt = INST[i.name][0];
  switch (fmt) {
    case "R": return `${i.name} ${r(i.rd)}, ${r(i.rs1)}, ${r(i.rs2)}`;
    case "I": case "I*": return `${i.name} ${r(i.rd)}, ${r(i.rs1)}, ${i.imm}`;
    case "IL": return `${i.name} ${r(i.rd)}, ${i.imm}(${r(i.rs1)})`;
    case "IJ": return `${i.name} ${r(i.rd)}, ${r(i.rs1)}, ${i.imm}`;
    case "S": return `${i.name} ${r(i.rs2)}, ${i.imm}(${r(i.rs1)})`;
    case "B": return `${i.name} ${r(i.rs1)}, ${r(i.rs2)}, ${i.target || i.imm}`;
    case "U": return `${i.name} ${r(i.rd)}, 0x${(i.imm >>> 0).toString(16)}`;
    case "J": return `${i.name} ${r(i.rd)}, ${i.target || i.imm}`;
    default: return i.name;
  }
}

/** A tiny machine: 32 registers, sparse little-endian byte memory. */
export function machine(insts, base = 0) {
  const st = { pc: base, x: new Int32Array(32), mem: new Map(), halted: false, steps: 0, lastWrite: null, lastMem: null };
  st.x[2] = 0x7ffffff0;
  const byPc = new Map(insts.map((i) => [i.pc, i]));
  const rd8 = (a) => st.mem.get(a >>> 0) || 0;
  const load = (a, n, signed) => {
    let v = 0;
    for (let k = n - 1; k >= 0; k--) v = (v << 8) | rd8(a + k);
    return signed ? sext(v, n * 8) : v >>> 0;
  };
  const store = (a, n, v) => { for (let k = 0; k < n; k++) st.mem.set((a + k) >>> 0, (v >>> (8 * k)) & 0xff); };
  st.load = load; st.store = store; st.current = () => byPc.get(st.pc);
  st.step = () => {
    const i = byPc.get(st.pc);
    if (!i) { st.halted = true; return null; }
    const x = st.x, a = x[i.rs1], b = x[i.rs2], imm = i.imm;
    let next = st.pc + 4, val = null;
    st.lastMem = null;
    switch (i.name) {
      case "add": val = a + b; break; case "sub": val = a - b; break; case "mul": val = Math.imul(a, b); break;
      case "and": val = a & b; break; case "or": val = a | b; break; case "xor": val = a ^ b; break;
      case "sll": val = a << (b & 31); break; case "srl": val = a >>> (b & 31); break; case "sra": val = a >> (b & 31); break;
      case "slt": val = a < b ? 1 : 0; break; case "sltu": val = (a >>> 0) < (b >>> 0) ? 1 : 0; break;
      case "addi": val = a + imm; break; case "andi": val = a & imm; break; case "ori": val = a | imm; break; case "xori": val = a ^ imm; break;
      case "slti": val = a < imm ? 1 : 0; break; case "sltiu": val = (a >>> 0) < (imm >>> 0) ? 1 : 0; break;
      case "slli": val = a << imm; break; case "srli": val = a >>> imm; break; case "srai": val = a >> imm; break;
      case "lb": val = load(a + imm, 1, true); st.lastMem = { addr: (a + imm) >>> 0, n: 1, write: false }; break;
      case "lbu": val = load(a + imm, 1, false); st.lastMem = { addr: (a + imm) >>> 0, n: 1, write: false }; break;
      case "lh": val = load(a + imm, 2, true); st.lastMem = { addr: (a + imm) >>> 0, n: 2, write: false }; break;
      case "lhu": val = load(a + imm, 2, false); st.lastMem = { addr: (a + imm) >>> 0, n: 2, write: false }; break;
      case "lw": val = load(a + imm, 4, true); st.lastMem = { addr: (a + imm) >>> 0, n: 4, write: false }; break;
      case "sb": store(a + imm, 1, b); st.lastMem = { addr: (a + imm) >>> 0, n: 1, write: true }; break;
      case "sh": store(a + imm, 2, b); st.lastMem = { addr: (a + imm) >>> 0, n: 2, write: true }; break;
      case "sw": store(a + imm, 4, b); st.lastMem = { addr: (a + imm) >>> 0, n: 4, write: true }; break;
      case "beq": if (a === b) next = st.pc + imm; break; case "bne": if (a !== b) next = st.pc + imm; break;
      case "blt": if (a < b) next = st.pc + imm; break; case "bge": if (a >= b) next = st.pc + imm; break;
      case "bltu": if ((a >>> 0) < (b >>> 0)) next = st.pc + imm; break; case "bgeu": if ((a >>> 0) >= (b >>> 0)) next = st.pc + imm; break;
      case "lui": val = imm << 12; break; case "auipc": val = st.pc + (imm << 12); break;
      case "jal": val = st.pc + 4; next = st.pc + imm; break;
      case "jalr": val = st.pc + 4; next = (a + imm) & ~1; break;
      default:
    }
    st.lastWrite = null;
    if (val !== null && i.rd !== 0) { x[i.rd] = val | 0; st.lastWrite = i.rd; }
    st.pc = next >>> 0;
    st.steps++;
    if (!byPc.has(st.pc)) st.halted = true;
    return i;
  };
  return st;
}
