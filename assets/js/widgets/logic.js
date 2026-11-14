// Boolean expression → truth table, canonical sum-of-products, and an equivalence check between two expressions.
import { h, frame, clear } from "./_kit.js";

export function parse(src) {
  const s = src.replace(/\s+/g, "");
  let i = 0;
  const vars = new Set();
  const peek = () => s[i];
  const startsUnary = (c) => c !== undefined && /[A-Za-z01(!~¬]/.test(c);
  function or() { let n = xor(); while (peek() === "+" || peek() === "|") { i++; const r = xor(), l = n; n = (e) => l(e) | r(e); } return n; }
  function xor() { let n = and(); while (peek() === "^" || peek() === "⊕") { i++; const r = and(), l = n; n = (e) => l(e) ^ r(e); } return n; }
  function and() {
    let n = unary();
    for (;;) {
      if (peek() === "*" || peek() === "&" || peek() === "·") i++;
      else if (!startsUnary(peek())) break;
      const r = unary(), l = n; n = (e) => l(e) & r(e);
    }
    return n;
  }
  function unary() {
    if (peek() === "!" || peek() === "~" || peek() === "¬") { i++; const u = unary(); return (e) => 1 - u(e); }
    let p = primary();
    while (peek() === "'") { i++; const q = p; p = (e) => 1 - q(e); }
    return p;
  }
  function primary() {
    const c = peek();
    if (c === "(") { i++; const n = or(); if (peek() !== ")") throw new Error("missing )"); i++; return n; }
    if (c === "0" || c === "1") { i++; return () => +c; }
    if (c !== undefined && /[A-Za-z]/.test(c)) { i++; const v = c.toUpperCase(); vars.add(v); return (e) => e[v]; }
    throw new Error(c === undefined ? "expression ended early" : `unexpected "${c}"`);
  }
  const fn = or();
  if (i < s.length) throw new Error(`unexpected "${s[i]}"`);
  return { fn, vars: [...vars].sort() };
}

const PRESETS = [
  ["DeMorgan", "!(A*B)", "!A + !B"],
  ["Absorption", "A + A*B", "A"],
  ["Uniting", "A*B + A*!B", "A"],
  ["XOR", "A^B", "A*!B + !A*B"],
  ["Majority", "A*B + B*C + A*C", "A*B + C*(A^B)"],
  ["Not equal!", "A + B*C", "(A+B)*C"],
];

export default function mount(el, opts) {
  const body = frame(el, "Truth tables and equivalence");
  const e1 = h("input.w-input", { value: opts.a || "!(A*B)", style: { flex: "1", minWidth: "160px" }, spellcheck: false, "aria-label": "Expression 1" });
  const e2 = h("input.w-input", { value: opts.b || "!A + !B", style: { flex: "1", minWidth: "160px" }, spellcheck: false, "aria-label": "Expression 2 (optional)" });
  const out = h("div.w-scroll"), verdict = h("div.w-note"), sop = h("div.w-note");

  function paint() {
    clear(out); sop.textContent = "";
    let p1, p2 = null;
    try { p1 = parse(e1.value); if (e2.value.trim()) p2 = parse(e2.value); }
    catch (err) { verdict.innerHTML = `<span style="color:var(--sup-not-red-text)">${err.message}</span>`; return; }
    const vars = [...new Set([...p1.vars, ...(p2 ? p2.vars : [])])].sort();
    if (vars.length > 5) { verdict.textContent = "Use at most 5 variables."; return; }
    const t = h("table.w-table", { style: { width: "auto" } }, h("tr", vars.map((v) => h("th", v)), h("th", "F₁"), p2 ? h("th", "F₂") : null, p2 ? h("th", "") : null));
    let diff = 0; const minterms = [];
    for (let r = 0; r < 2 ** vars.length; r++) {
      const env = Object.fromEntries(vars.map((v, k) => [v, (r >> (vars.length - 1 - k)) & 1]));
      const a = p1.fn(env), b = p2 ? p2.fn(env) : null;
      if (a) minterms.push(vars.map((v) => (env[v] ? v : "!" + v)).join("·") || "1");
      const bad = p2 && a !== b; if (bad) diff++;
      t.append(h("tr", vars.map((v) => h("td", String(env[v]))), h("td", { style: { fontWeight: 600, color: a ? "var(--primary-text)" : "" } }, String(a)),
        p2 ? h("td", { style: { fontWeight: 600, color: b ? "var(--primary-text)" : "" } }, String(b)) : null,
        p2 ? h("td", bad ? h("span.w-pill.bad", "differs") : "") : null));
    }
    out.append(t);
    verdict.innerHTML = !p2 ? "Add a second expression to check a simplification." : diff ? `<span class="w-pill bad">Not equivalent</span> &nbsp;They disagree on ${diff} of ${2 ** vars.length} rows.` : `<span class="w-pill good">Equivalent</span> &nbsp;Identical output on all ${2 ** vars.length} input rows.`;
    sop.innerHTML = `<b>Canonical sum-of-products for F₁:</b> ${minterms.length ? minterms.join(" + ") : "0"} <span style="opacity:.7">(one AND term per row where F₁ = 1)</span>`;
  }
  [e1, e2].forEach((i) => i.addEventListener("input", paint));
  body.append(
    h("div.w-row", h("span.w-label", "F₁"), e1, h("span.w-label", "F₂"), e2),
    h("div.w-row", h("span.w-label", "Laws"), PRESETS.map(([n, a, b]) => h("button.w-btn", { type: "button", onclick: () => { e1.value = a; e2.value = b; paint(); } }, n))),
    h("div.w-note", "Syntax: ", h("code", "!A"), " or ", h("code", "A'"), " NOT · ", h("code", "A*B"), " or ", h("code", "AB"), " AND · ", h("code", "A+B"), " OR · ", h("code", "A^B"), " XOR · parentheses"),
    verdict, out, sop,
  );
  paint();
}
