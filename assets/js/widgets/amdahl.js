// Amdahl's Law: speedup as a function of the parallel fraction and the number of processors.
import { h, s, frame, stat, clear } from "./_kit.js";

export default function mount(el) {
  const body = frame(el, "Amdahl's Law");
  const v = { p: 90, k: 3 };                                  // parallel fraction in %, processors = 2^k
  const pIn = h("input.w-range", { type: "range", min: 0, max: 100, step: 1, value: v.p, "aria-label": "Parallel fraction" });
  const kIn = h("input.w-range", { type: "range", min: 0, max: 10, step: 1, value: v.k, "aria-label": "Processors" });
  const pL = h("span.w-label"), kL = h("span.w-label");
  const chart = h("div.w-scroll"), stats = h("div.w-grid"), note = h("div.w-note");
  const sp = (p, n) => 1 / (1 - p + p / n);

  function paint() {
    const p = v.p / 100, n = 2 ** v.k;
    pL.textContent = `Parallelizable fraction: ${v.p}%  (serial: ${100 - v.p}%)`;
    kL.textContent = `Processors / improvement factor: ${n}×`;
    const W = 640, H = 250, L = 44, R = 78, T = 14, B = 34;
    const yMax = Math.max(8, Math.min(128, Math.ceil(sp(p, 1024) / 4) * 4 + 4));
    const X = (k) => L + (k / 10) * (W - L - R), Y = (y) => H - B - (Math.min(y, yMax) / yMax) * (H - T - B);
    const svg = s("svg", { class: "w-svg", viewBox: `0 0 ${W} ${H}`, style: "min-width:520px", role: "img", "aria-label": "Speedup versus number of processors" });
    for (let g = 0; g <= 4; g++) {
      const y = (yMax / 4) * g;
      svg.append(s("line", { x1: L, x2: W - R, y1: Y(y), y2: Y(y), stroke: "var(--border)", "stroke-width": 0.6 }), s("text", { x: L - 6, y: Y(y) + 3, "text-anchor": "end", "font-size": 9, class: "muted" }, `${y}×`));
    }
    for (let k = 0; k <= 10; k += 2) svg.append(s("text", { x: X(k), y: H - B + 14, "text-anchor": "middle", "font-size": 9, class: "muted" }, String(2 ** k)));
    svg.append(s("text", { x: (L + W - R) / 2, y: H - 4, "text-anchor": "middle", "font-size": 10, class: "muted" }, "number of processors (log scale)"));
    const path = (pp) => [...Array(41)].map((_, i) => `${i ? "L" : "M"}${X(i / 4).toFixed(1)} ${Y(sp(pp, 2 ** (i / 4))).toFixed(1)}`).join(" ");
    for (const ref of [0.5, 0.9, 0.95, 0.99]) {
      if (Math.abs(ref - p) < 0.005) continue;
      svg.append(s("path", { d: path(ref), fill: "none", stroke: "var(--gray)", "stroke-width": 1, "stroke-dasharray": "3 3", opacity: 0.7 }), s("text", { x: W - R + 5, y: Y(sp(ref, 1024)) + 3, "font-size": 9, class: "muted" }, `${ref * 100}% parallel`));
    }
    if (p < 1) svg.append(s("line", { x1: L, x2: W - R, y1: Y(1 / (1 - p)), y2: Y(1 / (1 - p)), stroke: "var(--sup-carrot-fg)", "stroke-width": 1, "stroke-dasharray": "6 4", opacity: 1 / (1 - p) <= yMax ? 1 : 0 }));
    svg.append(s("path", { d: path(p), fill: "none", stroke: "var(--primary-fg)", "stroke-width": 2.5 }), s("circle", { cx: X(v.k), cy: Y(sp(p, n)), r: 5, fill: "var(--primary-fg)", stroke: "var(--bg-container)", "stroke-width": 2 }));
    clear(chart).append(svg);
    const speed = sp(p, n), limit = p < 1 ? 1 / (1 - p) : Infinity;
    clear(stats).append(
      stat("Speedup", `${speed.toFixed(2)}×`),
      stat("Limit as processors → ∞", Number.isFinite(limit) ? `${limit.toFixed(2)}×  (= 1 / serial)` : "unbounded"),
      stat("Efficiency (speedup ÷ processors)", `${((100 * speed) / n).toFixed(0)}%`, speed / n < 0.5 ? "bad" : ""),
      stat("New run time", `${(100 / speed).toFixed(1)}% of original`),
    );
    note.innerHTML = `Speedup = 1 / ((1 − ${p.toFixed(2)}) + ${p.toFixed(2)} / ${n}) = 1 / (${(1 - p).toFixed(3)} + ${(p / n).toFixed(4)}) = <b>${speed.toFixed(2)}×</b>. ` +
      (Number.isFinite(limit) ? `The dashed orange line is the ceiling 1 / ${(1 - p).toFixed(2)} = ${limit.toFixed(1)}×: the serial ${100 - v.p}% never gets faster.` : "With no serial part the speedup is linear — this never happens in practice.");
  }
  pIn.addEventListener("input", () => { v.p = +pIn.value; paint(); });
  kIn.addEventListener("input", () => { v.k = +kIn.value; paint(); });
  body.append(h("div.w-grid", h("label.w-col", pL, pIn), h("label.w-col", kL, kIn)), chart, stats, note);
  paint();
}
