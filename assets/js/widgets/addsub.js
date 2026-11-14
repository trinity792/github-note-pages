// Fixed-width adder: shows carries and tells unsigned overflow apart from signed overflow.
import { h, frame, stat, seg, clear, parseNum } from "./_kit.js";

export default function mount(el, opts) {
  const body = frame(el, "Overflow: carry-out vs. signed overflow");
  let n = +(opts.bits || 8);
  let op = "+";
  const a = h("input.w-input", { value: opts.a || "0x7A", style: { width: "92px" }, "aria-label": "Operand A" });
  const b = h("input.w-input", { value: opts.b || "0x0D", style: { width: "92px" }, "aria-label": "Operand B" });
  const grid = h("div.w-scroll");
  const stats = h("div.w-grid");
  const verdict = h("div.w-note");
  const signed = (v) => (v >> (n - 1) ? v - 2 ** n : v);
  const fmt = (v) => String(v).replace("-", "−");

  function paint() {
    const mask = 2 ** n - 1;
    const av = parseNum(a.value), bv = parseNum(b.value);
    if (Number.isNaN(av) || Number.isNaN(bv)) { verdict.textContent = "Enter decimal, 0x… or 0b… values."; return; }
    const A = ((av % 2 ** n) + 2 ** n) % 2 ** n;
    const B = ((bv % 2 ** n) + 2 ** n) % 2 ** n;
    const Badd = op === "+" ? B : (~B & mask);           // subtraction = add the inverse with carry-in 1
    const carries = [op === "+" ? 0 : 1];
    let R = 0;
    for (let i = 0; i < n; i++) {
      const s = ((A >> i) & 1) + ((Badd >> i) & 1) + carries[i];
      R |= (s & 1) << i;
      carries.push(s >> 1);
    }
    R >>>= 0;
    const exactU = op === "+" ? A + B : A - B;
    const exactS = op === "+" ? signed(A) + signed(B) : signed(A) - signed(B);
    const uOver = exactU > mask || exactU < 0;
    const sOver = exactS > 2 ** (n - 1) - 1 || exactS < -(2 ** (n - 1));

    const rowBits = (label, v, cls = "") => h("tr", h("th", label), [...Array(n)].map((_, k) => h(`td${cls}`, String((v >> (n - 1 - k)) & 1))), h("td"));
    const table = h("table.w-table", { style: { width: "auto" } },
      h("tr", h("th", "carry"), [...Array(n)].map((_, k) => h("td", { style: { color: "var(--sup-carrot-text)" } }, carries[n - k] ? "1" : "")), h("td", { style: { color: "var(--text-caption)" } }, `cout = ${carries[n]}`)),
      rowBits("A", A),
      rowBits(op === "+" ? "+ B" : "+ ~B (+1)", Badd),
      h("tr", h("th", "result"), [...Array(n)].map((_, k) => h("td", { style: { fontWeight: "600", borderTop: "1.5px solid var(--text-caption)" } }, String((R >> (n - 1 - k)) & 1))), h("td", "0x" + R.toString(16).toUpperCase().padStart(n / 4, "0"))),
    );
    clear(grid).append(table);
    clear(stats).append(
      stat("Unsigned view", `${A} ${op} ${B} = ${fmt(exactU)}`),
      stat("Kept bits, unsigned", `${R}`, uOver ? "bad" : "good"),
      stat("Signed view", `${fmt(signed(A))} ${op} ${fmt(signed(B))} = ${fmt(exactS)}`),
      stat("Kept bits, signed", fmt(signed(R)), sOver ? "bad" : "good"),
    );
    verdict.innerHTML =
      `<b>Unsigned:</b> ${uOver ? "overflow — the true answer needs more than " + n + " bits (or went below 0)." : "fits."} ` +
      `<b>Two's complement:</b> ${sOver ? "overflow — the operands' signs predict one sign, the kept result has the other." : "fits."}` +
      (uOver !== sOver ? " <b>Notice they disagree</b>: carry-out and signed overflow are different questions." : "");
  }

  [a, b].forEach((i) => i.addEventListener("input", paint));
  const preset = (label, x, y, o = "+") => h("button.w-btn", { type: "button", onclick: () => { a.value = x; b.value = y; op = o; opSeg.querySelectorAll("button").forEach((q) => q.setAttribute("aria-pressed", q.dataset.v === o)); paint(); } }, label);
  const opSeg = seg([["+", "A + B"], ["-", "A − B"]], op, (v) => { op = v; paint(); });
  body.append(
    h("div.w-row", seg([[4, "4-bit"], [8, "8-bit"]], n, (v) => { n = +v; paint(); }), a, opSeg, b),
    h("div.w-row", h("span.w-label", "Try"), preset("0x7A + 0x0D", "0x7A", "0x0D"), preset("0xF0 + 0x20", "0xF0", "0x20"), preset("0x80 + 0x80", "0x80", "0x80"), preset("5 − 7", "5", "7", "-")),
    grid, stats, verdict,
  );
  paint();
}
