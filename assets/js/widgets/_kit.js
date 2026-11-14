// Shared helpers for interactive widgets.
import { icon } from "../icons.js";
export { icon };

// Keep the active row visible inside a widget without scrolling the note itself.
export function revealRow(container, row) {
  if (!row || !container.clientHeight) return;
  const top = container.getBoundingClientRect().top + container.clientTop;
  const bottom = top + container.clientHeight;
  const rect = row.getBoundingClientRect();
  if (rect.top < top) container.scrollTop += rect.top - top;
  else if (rect.bottom > bottom) container.scrollTop += rect.bottom - bottom;
}

/** Hyperscript: h("div.cls", { onclick, ... }, child, "text", [children]) */
export function h(spec, attrs, ...kids) {
  const [tag, ...cls] = spec.split(".");
  const el = document.createElement(tag || "div");
  if (cls.length) el.className = cls.join(" ");
  if (attrs && (typeof attrs !== "object" || attrs instanceof Node || Array.isArray(attrs))) { kids.unshift(attrs); attrs = null; }
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;
    if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
    else if (k === "html") el.innerHTML = v;
    else if (k === "style" && typeof v === "object") Object.assign(el.style, v);
    else if (k in el && k !== "list" && typeof v !== "string") el[k] = v;
    else el.setAttribute(k, v === true ? "" : v);
  }
  const add = (c) => {
    if (c == null || c === false) return;
    if (Array.isArray(c)) c.forEach(add);
    else el.append(c instanceof Node ? c : document.createTextNode(String(c)));
  };
  kids.forEach(add);
  return el;
}

const SVG_NS = "http://www.w3.org/2000/svg";
/** SVG element builder: s("rect", { x, y, ... }, children) */
export function s(tag, attrs, ...kids) {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;
    if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v);
  }
  const add = (c) => {
    if (c == null || c === false) return;
    if (Array.isArray(c)) c.forEach(add);
    else el.append(c instanceof Node ? c : document.createTextNode(String(c)));
  };
  kids.forEach(add);
  return el;
}

/** Standard widget frame. Returns the body element to fill. */
export function frame(el, title, tag = "Interactive") {
  el.classList.add("widget");
  el.replaceChildren(
    h("div.w-head", { html: `${icon("play", 12)}<span class="w-title"></span><span class="w-tag"></span>` }),
    h("div.w-body"),
  );
  el.querySelector(".w-title").textContent = title;
  el.querySelector(".w-tag").textContent = tag;
  return el.querySelector(".w-body");
}

export const clear = (el) => { el.replaceChildren(); return el; };
export const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
export const hex = (n, digits = 8) => "0x" + (BigInt.asUintN(64, BigInt(n))).toString(16).toUpperCase().padStart(digits, "0").slice(-Math.max(digits, 1));
export const bin = (n, bits) => (BigInt.asUintN(64, BigInt(n))).toString(2).padStart(bits, "0").slice(-bits);
export const group4 = (str) => str.replace(/(.{4})(?=.)/g, "$1 ");
export const log2 = (n) => Math.round(Math.log2(n));
export const isPow2 = (n) => n > 0 && (n & (n - 1)) === 0;

/** Parse an integer literal: decimal, 0x…, 0b… (returns NaN on failure). */
export function parseNum(str) {
  const t = String(str).trim().replace(/_/g, "");
  if (/^-?0x[0-9a-f]+$/i.test(t)) return (t[0] === "-" ? -1 : 1) * parseInt(t.replace("-", ""), 16);
  if (/^-?0b[01]+$/i.test(t)) return (t[0] === "-" ? -1 : 1) * parseInt(t.replace("-", "").slice(2), 2);
  if (/^-?\d+$/.test(t)) return parseInt(t, 10);
  return NaN;
}

/** Labelled control: field("Block size", inputEl) */
export const field = (label, control, note) => h("label.w-col", h("span.w-label", label), control, note ? h("span.w-note", note) : null);

export function select(options, value, onchange) {
  const el = h("select.w-select", { onchange: () => onchange(el.value) });
  for (const o of options) {
    const [v, t] = Array.isArray(o) ? o : [o, o];
    el.append(h("option", { value: v, selected: String(v) === String(value) }, t));
  }
  return el;
}

export function stat(label, value, cls = "") {
  return h(`div.w-stat${cls ? "." + cls : ""}`, h("span.w-label", label), h("span.v", value));
}

export function seg(options, value, onchange) {
  const el = h("div.seg.soft");
  const paint = (v) => [...el.children].forEach((b) => b.setAttribute("aria-pressed", b.dataset.v === String(v)));
  for (const o of options) {
    const [v, t] = Array.isArray(o) ? o : [o, o];
    el.append(h("button", { "data-v": v, type: "button", onclick: () => { paint(v); onchange(v); } }, t));
  }
  paint(value);
  return el;
}
