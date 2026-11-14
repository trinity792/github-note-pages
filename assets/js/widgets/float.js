// IEEE-754-style float explorer for binary32 and small custom formats (custom exponent/fraction widths and bias).
import { h, s, frame, stat, select, clear, field } from "./_kit.js";

const FORMATS = {
  "binary32 — float (1 / 8 / 23)": [8, 23],
  "binary16 — half (1 / 5 / 10)": [5, 10],
  "toy 8-bit (1 / 3 / 4)": [3, 4],
  "toy 6-bit (1 / 3 / 2)": [3, 2],
};
const sup = (n) => `<sup>${String(n).replace("-", "−")}</sup>`;
const pow2 = (e) => `2${sup(e)}`;

export default function mount(el, opts) {
  const body = frame(el, "Floating point explorer");
  let [E, F] = FORMATS[opts.format] || [8, 23];
  let bias = 2 ** (E - 1) - 1;
  let bits = opts.format ? 0 : 0xC0F00000;          // −7.5 in binary32
  const total = () => 1 + E + F;

  const bitsEl = h("div.bits");
  const stats = h("div.w-grid");
  const formula = h("div.w-note", { style: { fontSize: "14px", lineHeight: "24px" } });
  const line = h("div");
  const dec = h("input.w-input", { style: { width: "130px" }, placeholder: "e.g. -7.5", "aria-label": "Decimal value" });
  const biasIn = h("input.w-input", { type: "number", style: { width: "80px" }, "aria-label": "Bias" });

  const fields = (b) => ({ sign: Math.floor(b / 2 ** (E + F)) % 2, exp: Math.floor(b / 2 ** F) % 2 ** E, frac: b % 2 ** F });
  function decode(b) {
    const { sign, exp, frac } = fields(b);
    const sg = sign ? -1 : 1;
    if (exp === 2 ** E - 1) return frac ? NaN : sg * Infinity;
    if (exp === 0) return sg * (frac / 2 ** F) * 2 ** (1 - bias);
    return sg * (1 + frac / 2 ** F) * 2 ** (exp - bias);
  }
  function encode(x) {
    const sign = x < 0 || Object.is(x, -0) ? 1 : 0;
    const top = sign * 2 ** (E + F);
    const a = Math.abs(x);
    const maxExp = 2 ** E - 2;
    if (Number.isNaN(x)) return top + (2 ** E - 1) * 2 ** F + 2 ** (F - 1);
    if (a === 0) return top;
    let e = Math.floor(Math.log2(a));
    if (2 ** e > a) e--; else if (2 ** (e + 1) <= a) e++;
    let exp = e + bias;
    if (exp < 1) {                                   // denormalized range
      const frac = Math.round(a / 2 ** (1 - bias) * 2 ** F);
      return top + frac;                             // frac === 2^F rolls over into exp = 1, which is correct
    }
    let frac = Math.round((a / 2 ** e - 1) * 2 ** F);
    if (frac === 2 ** F) { frac = 0; exp++; }
    if (exp > maxExp) return top + (2 ** E - 1) * 2 ** F;      // overflow → infinity
    return top + exp * 2 ** F + frac;
  }
  const show = (v) => (Number.isNaN(v) ? "NaN" : !Number.isFinite(v) ? (v > 0 ? "+∞" : "−∞") : Object.is(v, -0) ? "−0" : (Math.abs(v) >= 1e7 || (Math.abs(v) < 1e-5 && v !== 0) ? v.toExponential(6) : String(+v.toPrecision(10)))).replace("-", "−");

  function paint() {
    const { sign, exp, frac } = fields(bits);
    const maxE = 2 ** E - 1;
    clear(bitsEl);
    const mk = (cls, from, to) => {
      const g = h(`div.grp.${cls}`);
      for (let i = from; i >= to; i--) {
        const on = Math.floor(bits / 2 ** i) % 2;
        g.append(h(`button.bit${on ? ".on" : ""}`, { type: "button", "aria-label": `bit ${i}`, onclick: () => { bits = on ? bits - 2 ** i : bits + 2 ** i; paint(); } }, String(on)));
      }
      return g;
    };
    bitsEl.append(mk("f-sign", E + F, E + F), mk("f-exp", E + F - 1, F), mk("f-frac", F - 1, 0));

    const fracBin = frac.toString(2).padStart(F, "0").replace(/0+$/, "") || "0";
    let kind, text, step;
    if (exp === maxE) {
      kind = frac ? "NaN" : "Infinity";
      text = frac ? "Exponent all ones, significand non-zero → <b>NaN</b>. Any operation on a NaN gives NaN." : `Exponent all ones, significand zero → <b>${sign ? "−" : "+"}∞</b>.`;
      step = "—";
    } else if (exp === 0) {
      kind = frac ? "Denormalized" : "Zero";
      text = `Exponent field is 0 → <b>no implicit 1</b>, exponent fixed at 1 − bias = ${1 - bias}:<br>(−1)${sup(sign)} × 0.${fracBin}<sub>two</sub> × ${pow2(1 - bias)}`;
      step = pow2(1 - bias - F);
    } else {
      kind = "Normalized";
      text = `(−1)${sup(sign)} × 1.${fracBin}<sub>two</sub> × 2${sup(`${exp} − ${bias}`)} = ${sign ? "−" : ""}1.${fracBin}<sub>two</sub> × ${pow2(exp - bias)}`;
      step = pow2(exp - bias - F);
    }
    formula.innerHTML = text;
    const v = decode(bits);
    clear(stats).append(
      stat("Value", show(v)),
      stat("Category", kind, kind === "NaN" ? "bad" : ""),
      stat("Hex", "0x" + bits.toString(16).toUpperCase().padStart(Math.ceil(total() / 4), "0")),
      stat("Sign / exp field / fraction", `${sign} / ${exp} / ${frac}`),
      h("div.w-stat", h("span.w-label", "Step to next float"), h("span.v", { html: step })),
      stat("Bias", String(bias)),
    );
    drawLine(v);
  }

  // Number line of every positive value in the first few binades (only readable for small fraction widths).
  function drawLine(cur) {
    clear(line);
    if (F > 5) { line.append(h("div.w-note", "Pick a toy format to see every representable value drawn on a number line.")); return; }
    const W = 640, H = 78, x0 = 14, x1 = W - 14;
    const binades = Math.min(4, 2 ** E - 2);
    const top = 2 ** (1 - bias + binades - 1 + 1) ;                // upper end of the last binade drawn
    const X = (v) => x0 + (v / top) * (x1 - x0);
    const svg = s("svg", { class: "w-svg", viewBox: `0 0 ${W} ${H}` });
    svg.append(s("line", { x1: x0, y1: 40, x2: x1, y2: 40, stroke: "var(--gray)" }));
    for (let e = 0; e <= binades; e++) {                           // e = 0 is the denormalized range
      const n = 2 ** F;
      for (let k = 0; k < n; k++) {
        const v = e === 0 ? (k / n) * 2 ** (1 - bias) : (1 + k / n) * 2 ** (e - bias);
        if (v > top) continue;
        const isCur = Math.abs(cur) === v;
        svg.append(s("line", { x1: X(v), x2: X(v), y1: isCur ? 22 : e === 0 ? 30 : 32, y2: 40, stroke: isCur ? "var(--primary-fg)" : e === 0 ? "var(--sup-carrot-fg)" : "var(--sup-ocean-fg)", "stroke-width": isCur ? 2.5 : 1.2 }));
      }
      const start = e === 0 ? 0 : 2 ** (e - bias);
      svg.append(s("text", { x: X(start), y: 56, "font-size": 9, "text-anchor": e === 0 ? "start" : "middle", class: "muted mono" }, e === 0 ? "0" : `2^${e - bias}`));
    }
    svg.append(
      s("text", { x: x0, y: 12, "font-size": 10, fill: "var(--sup-carrot-text)" }, "■ denormalized: evenly spaced, fills the gap down to 0"),
      s("text", { x: x0, y: 72, "font-size": 10, fill: "var(--sup-ocean-text)" }, "■ normalized: step doubles every time the exponent goes up by one"),
    );
    line.append(svg);
  }

  const setFmt = (name) => { [E, F] = FORMATS[name]; bias = 2 ** (E - 1) - 1; biasIn.value = bias; bits = encode(1); paint(); };
  dec.addEventListener("change", () => { const x = parseFloat(dec.value); if (!Number.isNaN(x)) { bits = encode(x); paint(); } });
  biasIn.addEventListener("input", () => { if (biasIn.value !== "") { bias = +biasIn.value; paint(); } });
  const btn = (label, fn) => h("button.w-btn", { type: "button", onclick: () => { fn(); paint(); } }, label);
  const maxBits = () => 2 ** total() - 1;
  biasIn.value = bias;

  body.append(
    h("div.w-row",
      field("Format", select(Object.keys(FORMATS), Object.keys(FORMATS).find((k) => FORMATS[k][0] === E && FORMATS[k][1] === F), setFmt)),
      field("Bias", biasIn),
      field("Encode a decimal", dec),
    ),
    bitsEl,
    h("div.legend", h("span", h("i.f-sign"), "sign"), h("span", h("i.f-exp"), "exponent (biased)"), h("span", h("i.f-frac"), "significand (fraction bits)")),
    h("div.w-row",
      btn("Next float up", () => { bits = Math.min(maxBits(), bits + 1); }),
      btn("Next float down", () => { bits = Math.max(0, bits - 1); }),
      btn("Largest normalized", () => { bits = (2 ** E - 2) * 2 ** F + 2 ** F - 1; }),
      btn("Smallest normalized", () => { bits = 2 ** F; }),
      btn("Smallest denorm", () => { bits = 1; }),
      btn("+∞", () => { bits = (2 ** E - 1) * 2 ** F; }),
      btn("NaN", () => { bits = (2 ** E - 1) * 2 ** F + 1; }),
    ),
    formula, stats, line,
  );
  paint();
}
