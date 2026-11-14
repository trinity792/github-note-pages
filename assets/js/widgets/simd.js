// SIMD walk-through: sum an int array four lanes at a time, then reduce, then handle the scalar tail.
import { h, frame, clear, field } from "./_kit.js";

export default function mount(el) {
  const body = frame(el, "SIMD: vector loop, reduction, and the tail");
  let n = 11, lanes = 4, step = 0;
  const data = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3];
  const arrEl = h("div.w-scroll"), regs = h("div.w-col"), code = h("div"), msg = h("div.w-note"), ctrl = h("div.w-row");
  const nIn = h("input.w-range", { type: "range", min: 1, max: 16, value: n, "aria-label": "Array length" });
  const nL = h("span.w-label");

  function plan() {
    const full = Math.floor(n / lanes);
    const phases = [{ kind: "init" }];
    for (let k = 0; k < full; k++) phases.push({ kind: "vec", i: k * lanes });
    phases.push({ kind: "reduce" });
    for (let i = full * lanes; i < n; i++) phases.push({ kind: "tail", i });
    phases.push({ kind: "done" });
    return phases;
  }
  function paint() {
    const phases = plan();
    step = Math.min(step, phases.length - 1);
    const cur = phases[step];
    nL.textContent = `Array length n = ${n}  →  ${Math.floor(n / lanes)} full vectors + ${n % lanes} leftover`;
    const sumv = Array(lanes).fill(0); let tmp = null, sum = null, active = [];
    for (let k = 0; k <= step; k++) {
      const p = phases[k];
      if (p.kind === "vec") { tmp = data.slice(p.i, p.i + lanes); tmp.forEach((x, j) => { sumv[j] += x; }); if (k === step) active = [...Array(lanes).keys()].map((j) => p.i + j); }
      if (p.kind === "reduce") sum = sumv.reduce((a, c) => a + c, 0);
      if (p.kind === "tail") { sum += data[p.i]; if (k === step) active = [p.i]; }
    }
    const doneUpTo = cur.kind === "vec" ? cur.i + lanes : cur.kind === "tail" ? cur.i + 1 : cur.kind === "init" ? 0 : cur.kind === "reduce" ? Math.floor(n / lanes) * lanes : n;
    const row = h("div", { style: { display: "flex", gap: "3px", paddingTop: "14px" } });
    for (let i = 0; i < n; i++) {
      const on = active.includes(i);
      row.append(h("div", { style: { position: "relative", width: "34px", height: "34px", flex: "none", borderRadius: "6px", display: "grid", placeItems: "center", font: "500 13px/1 var(--font-mono)",
        background: on ? "var(--primary)" : i < doneUpTo ? "var(--row-selected)" : "var(--bg)", color: on ? "var(--contrast-text)" : "var(--text)", border: "0.5px solid var(--border)",
        marginLeft: i && i % lanes === 0 ? "8px" : "0", opacity: i < doneUpTo || on ? 1 : 0.75 } }, String(data[i]),
      h("small", { style: { position: "absolute", top: "-12px", left: 0, right: 0, textAlign: "center", font: "400 8px/10px var(--font-ui)", color: "var(--gray)" } }, String(i))));
    }
    clear(arrEl).append(row);
    const vec = (label, vals, cls) => h("div.w-row", h("span.w-label", { style: { width: "86px" } }, label), h("div.bits", h(`div.grp.${cls}`, vals.map((x) => h("div.bit.on", { style: { width: "40px" } }, String(x))))));
    clear(regs).append(
      vec("tmp", tmp && cur.kind === "vec" ? tmp : Array(lanes).fill("·"), "f-a"),
      vec("sum_vec", sumv, "f-b"),
      h("div.w-row", h("span.w-label", { style: { width: "86px" } }, "sum (scalar)"), h("span.w-pill.infoc", { style: { fontFamily: "var(--font-mono)", fontSize: "13px", height: "24px" } }, sum === null ? "—" : String(sum))),
    );
    const lines = [
      ["init", "__m128i sum_vec = _mm_setzero_si128();"],
      ["vec", "for (i = 0; i < n / 4 * 4; i += 4) {"],
      ["vec", "    __m128i tmp = _mm_loadu_si128((__m128i *)(arr + i));"],
      ["vec", "    sum_vec = _mm_add_epi32(sum_vec, tmp);      // 4 adds at once"],
      ["vec", "}"],
      ["reduce", "int t[4]; _mm_storeu_si128((__m128i *)t, sum_vec);"],
      ["reduce", "int sum = t[0] + t[1] + t[2] + t[3];           // horizontal reduction"],
      ["tail", "for (; i < n; i++) sum += arr[i];              // tail case"],
    ];
    clear(code).append(h("pre", { style: { margin: 0, padding: "10px 0", borderRadius: "8px", background: "var(--code-bg)", border: "1px solid var(--code-border)", font: "400 12px/20px var(--font-mono)", overflowX: "auto", color: "var(--code-text)" } },
      lines.map(([k, t]) => h("div", { style: { padding: "0 12px", background: k === cur.kind ? "var(--line-hl)" : "", boxShadow: k === cur.kind ? "inset 2px 0 0 var(--line-hl-accent)" : "" } }, t))));
    msg.innerHTML = {
      init: "Start with a vector of four zeros: four independent running sums, one per lane.",
      vec: `Load <b>arr[${cur.i}..${cur.i + lanes - 1}]</b> into one 128-bit register and add all four lanes with a single instruction. Lane <i>j</i> accumulates elements ${"j, j+4, j+8, …"}.`,
      reduce: "The lanes are independent, so SIMD cannot add them to each other in the loop. Store the vector to memory and add the four partial sums with ordinary scalar code.",
      tail: `<b>Tail case:</b> ${n % lanes} element${n % lanes > 1 ? "s" : ""} did not fill a vector. Loading a full vector here would read past the end of the array, so finish with a scalar loop starting at i = ${Math.floor(n / lanes) * lanes}.`,
      done: `Done: sum = <b>${sum}</b>. Vector iterations: ${Math.floor(n / lanes)} instead of ${n} scalar ones.`,
    }[cur.kind];
    clear(ctrl).append(
      h("button.w-btn.primary", { type: "button", disabled: step >= phases.length - 1, onclick: () => { step++; paint(); } }, "Step"),
      h("button.w-btn", { type: "button", disabled: step === 0, onclick: () => { step--; paint(); } }, "Back"),
      h("button.w-btn", { type: "button", onclick: () => { step = 0; paint(); } }, "Reset"),
      h("span.w-note", `step ${step + 1} of ${phases.length}`),
    );
  }
  nIn.addEventListener("input", () => { n = +nIn.value; step = 0; paint(); });
  body.append(h("label.w-col", nL, nIn), arrEl, regs, ctrl, msg, code);
  paint();
}
