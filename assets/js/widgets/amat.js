// AMAT calculator for one- and two-level cache hierarchies.
import { h, frame, stat, seg, clear } from "./_kit.js";

export default function mount(el) {
  const body = frame(el, "AMAT calculator");
  const v = { h1: 1, m1: 5, h2: 5, m2: 15, pen: 200 };
  let levels = 2;
  const defs = [["h1", "L1 hit time (cycles)", 1, 10, 1], ["m1", "L1 miss rate (%)", 0, 50, 0.5], ["h2", "L2 hit time (cycles)", 1, 50, 1], ["m2", "L2 local miss rate (%)", 0, 100, 1], ["pen", "Main-memory penalty (cycles)", 10, 1000, 10]];
  const controls = h("div.w-grid"), stats = h("div.w-grid"), formula = h("div.w-note", { style: { fontSize: "13px", lineHeight: "22px" } });
  const labels = {}, wraps = {};
  for (const [k, label, lo, hi, st] of defs) {
    const r = h("input.w-range", { type: "range", min: lo, max: hi, step: st, value: v[k], "aria-label": label });
    labels[k] = h("span.w-label");
    r.addEventListener("input", () => { v[k] = +r.value; paint(); });
    wraps[k] = h("label.w-col", labels[k], r);
    controls.append(wraps[k]);
  }
  const f = (x) => String(+x.toFixed(3));
  function paint() {
    for (const [k, label] of defs) labels[k].textContent = `${label}: ${v[k]}`;
    wraps.h2.style.display = wraps.m2.style.display = levels === 2 ? "" : "none";
    const one = v.h1 + (v.m1 / 100) * v.pen;
    const l2 = v.h2 + (v.m2 / 100) * v.pen;
    const two = v.h1 + (v.m1 / 100) * l2;
    const amat = levels === 2 ? two : one;
    formula.innerHTML = levels === 2
      ? `AMAT = L1 hit + L1 miss rate × (<b>L2 hit + L2 miss rate × penalty</b>)<br>= ${v.h1} + ${f(v.m1 / 100)} × (${v.h2} + ${f(v.m2 / 100)} × ${v.pen}) = ${v.h1} + ${f(v.m1 / 100)} × ${f(l2)} = <b>${f(two)} cycles</b>`
      : `AMAT = hit time + miss rate × miss penalty<br>= ${v.h1} + ${f(v.m1 / 100)} × ${v.pen} = <b>${f(one)} cycles</b>`;
    clear(stats).append(
      stat("AMAT", `${f(amat)} cycles`),
      stat("L1 only would be", `${f(one)} cycles`),
      stat("Global miss rate (reaches memory)", levels === 2 ? `${f((v.m1 * v.m2) / 100)}%` : `${v.m1}%`),
      stat("Speedup from adding L2", levels === 2 ? `${f(one / two)}×` : "—", levels === 2 && two < one ? "good" : ""),
    );
  }
  body.append(seg([[1, "L1 only"], [2, "L1 + L2"]], levels, (x) => { levels = +x; paint(); }), controls, formula, stats,
    h("div.w-note", "Course conventions: a miss pays the hit time plus the penalty, and the L2 miss rate is local — the fraction of L1 misses that also miss in L2."));
  paint();
}
