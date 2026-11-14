// CALL walkthrough: follow one small program through Compiler → Assembler → Linker → Loader, then drill "who does it?".
import { h, frame, clear } from "./_kit.js";

const STAGES = [
  {
    id: "Compiler", in: "main.c", out: "main.s", color: "ocean",
    does: "Translates one C file into one assembly file. Output may contain pseudo-instructions and uses labels for everything; no addresses exist yet.",
    art: `# main.s  (assembly, text)
        .data
count:  .word 3
fmt:    .string "%d\\n"
        .text
        .globl main
main:   addi sp, sp, -4
        sw   ra, 0(sp)
        la   t0, count        # pseudo: needs count's address
        lw   a1, 0(t0)
loop:   beqz a1, done         # pseudo, PC-relative
        addi a1, a1, -1
        j    loop             # pseudo, PC-relative
done:   la   a0, fmt
        call printf           # label in ANOTHER file
        lw   ra, 0(sp)
        addi sp, sp, 4
        ret`,
  },
  {
    id: "Assembler", in: "main.s", out: "main.o", color: "sea-green",
    does: "Expands pseudo-instructions, then makes two passes: (1) record every label's position in the symbol table, (2) emit machine code. PC-relative branches and jumps inside this file are fully resolved. Anything needing an absolute address is left as a TODO in the relocation table.",
    art: `# main.o  (object file, binary)
Header        sizes and positions of the pieces below
Text segment  machine code (addresses relative to this file)
   0x00 addi sp, sp, -4
   0x04 sw   ra, 0(sp)
   0x08 lui  t0, ???          <- la count   (TODO)
   0x0c addi t0, t0, ???      <- la count   (TODO)
   0x10 lw   a1, 0(t0)
   0x14 beq  a1, x0, +12      resolved: done is 3 instructions ahead
   0x18 addi a1, a1, -1
   0x1c jal  x0, -8           resolved: loop is 2 instructions back
   0x20 lui  a0, ???          <- la fmt     (TODO)
   0x24 addi a0, a0, ???      <- la fmt     (TODO)
   0x28 jal  ra, ???          <- printf     (TODO)
   ...
Data segment  count = 3, fmt = "%d\\n"
Symbol table  main (text, 0x00, global)   loop (0x14)   done (0x20)
              count (data, 0)   fmt (data, 4)
Relocation    0x08/0x0c count    0x20/0x24 fmt    0x28 printf`,
  },
  {
    id: "Linker", in: "main.o + libc.a", out: "a.out", color: "honey",
    does: "Stitches the text segments of all object files together, then the data segments, and decides every final address. Then it walks each relocation table and patches in absolute addresses: external functions (printf) and static data (count, fmt). PC-relative branches are untouched.",
    art: `# a.out  (executable, binary)
Text  0x00010000  main:   addi sp, sp, -4
      0x00010008          lui  t0, 0x10010      <- patched
      0x0001000c          addi t0, t0, 0        <- patched
      0x00010014          beq  a1, x0, +12      (unchanged)
      0x00010028          jal  ra, printf       <- patched offset
      ...
      0x00010040  printf: ...                   (copied in from libc)
Data  0x10010000  count
      0x10010004  fmt

Error you can only get here:  "undefined reference to 'printf'"`,
  },
  {
    id: "Loader", in: "a.out", out: "running process", color: "periwinkle",
    does: "Part of the operating system. Reads the executable's header to learn the segment sizes, creates an address space, copies text and data in from disk, sets up the stack with the program arguments, initializes registers (sp), and jumps to the start-up routine, which calls main.",
    art: `# memory, at run time
0x7fff_fff0  stack   <- sp          argc, argv copied here
             ...
             heap    (empty until malloc)
0x1001_0000  data    count, fmt     copied from a.out
0x0001_0000  text    main, printf   copied from a.out   <- pc

start-up routine:  set up args -> jal main -> exit system call`,
  },
];

const DRILL = [
  ["Turns a C for-loop into labels and branches", "Compiler"],
  ["Replaces mv a0, a1 with addi a0, a1, 0", "Assembler"],
  ["Computes the offset for a beq to a label in the same file", "Assembler"],
  ["Produces the symbol table and the relocation table", "Assembler"],
  ["Fills in the address of printf from the C library", "Linker"],
  ["Decides the final address of a global variable", "Linker"],
  ["Reports “undefined reference to foo”", "Linker"],
  ["Reports a missing semicolon", "Compiler"],
  ["Copies text and data from disk into memory", "Loader"],
  ["Sets the stack pointer and jumps to the start-up code", "Loader"],
  ["Combines several .o files into one executable", "Linker"],
  ["Needs two passes because of forward references to labels", "Assembler"],
];

export default function mount(el) {
  const body = frame(el, "From source to running program");
  let cur = 0, q = 0, score = 0, answered = false;
  const flow = h("div.w-row", { style: { gap: "4px" } });
  const info = h("div.w-note", { style: { fontSize: "13px", lineHeight: "20px" } });
  const art = h("pre", { style: { margin: 0, padding: "12px 14px", borderRadius: "8px", background: "var(--code-bg)", border: "1px solid var(--code-border)", font: "400 12px/19px var(--font-mono)", overflowX: "auto", color: "var(--code-text)" } });
  const drillQ = h("div", { style: { fontWeight: "500", fontSize: "14px", lineHeight: "20px" } });
  const drillB = h("div.w-row");
  const drillF = h("div.w-note");

  function paint() {
    clear(flow);
    flow.append(h("span.w-pill", "foo.c"));
    STAGES.forEach((st, i) => {
      flow.append(
        h("span", { style: { color: "var(--gray)" } }, "→"),
        h(`button.w-btn${i === cur ? ".primary" : ""}`, { type: "button", onclick: () => { cur = i; paint(); } }, st.id),
        h("span", { style: { color: "var(--gray)" } }, "→"),
        h("span.w-pill", st.out),
      );
    });
    const st = STAGES[cur];
    info.innerHTML = `<b style="color:var(--sup-${st.color}-text)">${st.id}</b> &nbsp;<code>${st.in}</code> → <code>${st.out}</code><br>${st.does}`;
    art.textContent = st.art;

    const [text, ans] = DRILL[q];
    drillQ.textContent = `Who does this?  ${text}`;
    clear(drillB);
    for (const st2 of STAGES) {
      drillB.append(h("button.w-btn", { type: "button", disabled: answered, onclick: () => {
        answered = true;
        const ok = st2.id === ans;
        if (ok) score++;
        drillF.innerHTML = `${ok ? "<b>Correct.</b>" : `<b>It's the ${ans.toLowerCase()}.</b>`} ${q + 1} of ${DRILL.length} · ${score} right`;
        paint();
      } }, st2.id));
    }
    if (answered) drillB.append(h("button.w-btn.primary", { type: "button", onclick: () => { q = (q + 1) % DRILL.length; if (q === 0) score = 0; answered = false; drillF.textContent = ""; paint(); } }, q === DRILL.length - 1 ? "Restart" : "Next"));
  }

  body.append(
    flow, info, art,
    h("div", { style: { height: "1px", background: "var(--border)" } }),
    h("div.w-label", "Drill"), drillQ, drillB, drillF,
  );
  paint();
}
