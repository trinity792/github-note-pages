// Tiny tokenizer-based syntax highlighter for the languages these notes use (C and RISC-V assembly).
// Returns one HTML string per source line so the code block can render a gutter.

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const words = (s) => new RegExp(`\\b(?:${s.trim().split(/\s+/).join("|")})\\b`, "y");

const C_RULES = [
  ["c", /\/\/[^\n]*|\/\*[\s\S]*?\*\//y],
  ["s", /"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])+'/y],
  ["k", /#[ \t]*[a-z]+/y],
  ["n", /\b(?:0[xX][0-9a-fA-F]+|0[bB][01]+|\d+\.?\d*(?:[eE][-+]?\d+)?)[uUlLfF]*\b/y],
  ["k", words("if else for while do return break continue switch case default sizeof typedef static const extern volatile goto NULL true false")],
  ["t", words("int char short long float double void unsigned signed size_t ssize_t bool struct union enum FILE u?int(?:8|16|32|64)_t uintptr_t intptr_t __m128i? __m256i? __m128d __m256d omp_lock_t")],
  ["f", /[A-Za-z_]\w*(?=\s*\()/y],
  ["", /[A-Za-z_]\w*/y],
  ["o", /->|[-+*/%=<>!&|^~?:]+/y],
  ["p", /[()[\]{};,.]/y],
];

const RV_RULES = [
  ["c", /#[^\n]*|\/\/[^\n]*/y],
  ["s", /"(?:\\.|[^"\\\n])*"/y],
  ["k", /\.[a-z]+\b/y],
  ["f", /[A-Za-z_][\w.]*:/y],
  ["t", /\b(?:x(?:[12]?[0-9]|3[01])|zero|ra|sp|gp|tp|fp|pc|PC|t[0-6]|s(?:1[01]|[0-9])|a[0-7])\b/y],
  ["n", /-?\b(?:0[xX][0-9a-fA-F]+|0[bB][01]+|\d+)\b/y],
  ["k", words("add addi sub and andi or ori xor xori sll slli srl srli sra srai slt slti sltu sltiu lb lbu lh lhu lw sb sh sw beq bne blt bge bltu bgeu jal jalr lui auipc ecall ebreak mul mulh mulhu div divu rem remu li la mv neg not nop j jr ret call beqz bnez bgt ble bgtu bleu seqz snez csrrw csrrs csrrwi")],
  ["", /[A-Za-z_][\w.]*/y],
  ["p", /[(),]/y],
];

const LANGS = { c: C_RULES, h: C_RULES, cpp: C_RULES, riscv: RV_RULES, asm: RV_RULES, s: RV_RULES };

export function highlight(code, lang) {
  const rules = LANGS[(lang || "").toLowerCase()];
  if (!rules) return code.split("\n").map(esc);
  const lines = [""];
  const emit = (type, text) => {
    const parts = text.split("\n");
    parts.forEach((part, i) => {
      if (i > 0) lines.push("");
      if (part) lines[lines.length - 1] += type ? `<span class="tk-${type}">${esc(part)}</span>` : esc(part);
    });
  };
  let pos = 0;
  let plain = "";
  while (pos < code.length) {
    let hit = null;
    for (const [type, re] of rules) {
      re.lastIndex = pos;
      const m = re.exec(code);
      if (m && m[0].length) { hit = [type, m[0]]; break; }
    }
    if (hit) {
      if (plain) { emit("", plain); plain = ""; }
      emit(hit[0], hit[1]);
      pos += hit[1].length;
    } else {
      plain += code[pos++];
    }
  }
  if (plain) emit("", plain);
  return lines;
}
