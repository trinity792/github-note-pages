// Register-to-register timing: setup constraint (critical path) and hold constraint (shortest path), with a waveform.
import { h, s, frame, stat, clear } from "./_kit.js";

export default function mount(el) {
  const body = frame(el, "Setup, hold, and the critical path");
  const v = { clkq: 1, setup: 1, hold: 1, clmax: 3, clmin: 1, period: 6 };
  const defs = [["clkq", "clk-to-q", 0, 5], ["setup", "setup", 0, 5], ["hold", "hold", 0, 5], ["clmax", "longest CL path", 0, 12], ["clmin", "shortest CL path", 0, 12], ["period", "clock period", 1, 24]];
  const controls = h("div.w-grid");
  const wave = h("div.w-scroll"), stats = h("div.w-grid"), note = h("div.w-note");
  const labels = {};
  for (const [k, label, lo, hi] of defs) {
    const r = h("input.w-range", { type: "range", min: lo, max: hi, step: 0.5, value: v[k], "aria-label": label });
    labels[k] = h("span.w-label");
    r.addEventListener("input", () => { v[k] = +r.value; if (k === "clmax" && v.clmin > v.clmax) v.clmin = v.clmax; paint(); });
    controls.append(h("label.w-col", labels[k], r));
  }

  function paint() {
    for (const [k, label] of defs) labels[k].textContent = `${label}: ${v[k]} ns`;
    const clmin = Math.min(v.clmin, v.clmax);
    const minT = v.clkq + v.clmax + v.setup;
    const setupOK = v.period >= minT, holdOK = v.clkq + clmin >= v.hold;
    const W = 680, left = 96, T = v.period, span = 2.25 * T, X = (t) => left + (t / span) * (W - left - 10);
    const svg = s("svg", { class: "w-svg", viewBox: `0 0 ${W} 210`, style: "min-width:560px" });
    const row = (y, label) => svg.append(s("text", { x: 4, y: y + 4, "font-size": 11 }, label));
    row(30, "clock"); row(80, "Q of reg A"); row(130, "D of reg B"); row(180, "windows");
    // clock
    let d = `M${X(0)} 40`;
    for (let e = 0; e < 3; e++) { const t0 = e * T; if (t0 > span) break; d += ` L${X(t0)} 40 L${X(t0)} 20 L${X(Math.min(t0 + T / 2, span))} 20 L${X(Math.min(t0 + T / 2, span))} 40 L${X(Math.min(t0 + T, span))} 40`; }
    svg.append(s("path", { d, fill: "none", stroke: "var(--text)", "stroke-width": 1.5 }));
    const band = (y, t0, t1, fill, op = 0.55) => { if (t1 > t0) svg.append(s("rect", { x: X(Math.max(0, t0)), y: y - 10, width: Math.max(0, X(Math.min(t1, span)) - X(Math.max(0, t0))), height: 20, fill, "fill-opacity": op, rx: 3 })); };
    for (let e = 0; e < 3; e++) {
      const t0 = e * T; if (t0 > span) break;
      svg.append(s("line", { x1: X(t0), x2: X(t0), y1: 14, y2: 196, stroke: "var(--gray)", "stroke-dasharray": "3 3" }));
      const tEnd = Math.min((e + 1) * T, span);
      band(80, t0, t0 + v.clkq, "var(--gray)", 0.5);                               // Q unknown during clk-to-q
      band(80, t0 + v.clkq, tEnd, "var(--sup-ocean-bg)");
      const dStart = t0 + v.clkq + clmin, dStable = t0 + v.clkq + v.clmax;
      band(130, t0, dStart, "var(--sup-sea-green-bg)");                            // still holding the old value
      band(130, dStart, dStable, "var(--gray)", 0.5);                              // changing
      band(130, dStable, Math.max(dStable, tEnd + (e < 2 ? v.clkq + clmin : 0)), "var(--sup-sea-green-bg)");
      if (e > 0) band(180, t0 - v.setup, t0, setupOK ? "var(--sup-sea-green-fg)" : "var(--sup-not-red-fg)", 0.8);
      band(180, t0, t0 + v.hold, holdOK ? "var(--sup-honey-fg)" : "var(--sup-not-red-fg)", 0.8);
    }
    svg.append(
      s("text", { x: left, y: 206, "font-size": 9.5, class: "muted" }, "grey = changing / not valid · green = setup window · amber = hold window · red = violated"),
    );
    clear(wave).append(svg);
    clear(stats).append(
      stat("Critical path = min period", `${v.clkq} + ${v.clmax} + ${v.setup} = ${minT} ns`),
      stat("Max frequency", minT ? `${(1000 / minT).toFixed(1).replace(/\.0$/, "")} MHz` : "∞"),
      stat("Setup check", setupOK ? `OK: ${v.period} ≥ ${minT}` : `VIOLATED: ${v.period} < ${minT}`, setupOK ? "good" : "bad"),
      stat("Hold check", `${v.clkq} + ${clmin} ${holdOK ? "≥" : "<"} ${v.hold}${holdOK ? "" : " — VIOLATED"}`, holdOK ? "good" : "bad"),
    );
    note.innerHTML = `${setupOK ? "" : "<b>Setup violation:</b> D is still changing inside the setup window. Fix it by slowing the clock or shortening the longest path. "}${holdOK ? "" : "<b>Hold violation:</b> the new value races through the shortest path and changes D before reg B has finished capturing the old one. A slower clock does <b>not</b> help — add delay to the short path. "}${setupOK && holdOK ? "Both constraints are met. Shrink the clock period until setup just barely holds: that is the maximum frequency." : ""}`;
  }
  body.append(controls, wave, stats, note);
  paint();
}
