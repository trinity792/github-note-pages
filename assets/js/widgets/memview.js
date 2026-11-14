// Memory viewer: lay integers out as bytes (little/big endian), then read them back through a cast pointer.
import { h, frame, stat, seg, select, clear, parseNum, field } from "./_kit.js";

const TYPES = { "char *": 1, "int16_t *": 2, "int32_t *": 4 };

export default function mount(el, opts) {
  const body = frame(el, "Bytes, endianness, and pointer casts");
  let endian = "little";
  let ptrType = "char *";
  let byteOff = 0, elemOff = 0;
  const base = 0x100;
  const src = h("input.w-input", { value: opts.values || "0x00434241, 0x00004645", style: { flex: "1", minWidth: "220px" }, "aria-label": "Array values" });
  const grid = h("div.w-scroll");
  const out = h("div.w-grid");
  const expr = h("div.w-note");
  const bOff = h("input.w-input", { type: "number", value: 0, min: 0, style: { width: "64px" } });
  const eOff = h("input.w-input", { type: "number", value: 0, min: 0, style: { width: "64px" } });

  function bytes() {
    const vals = src.value.split(",").map((x) => parseNum(x)).filter((v) => !Number.isNaN(v));
    const out = [];
    vals.forEach((v, i) => {
      const u = v >>> 0;
      const b = [u & 255, (u >>> 8) & 255, (u >>> 16) & 255, (u >>> 24) & 255];
      if (endian === "big") b.reverse();
      b.forEach((x, k) => out.push({ v: x, elem: i, k }));
    });
    return out;
  }

  function paint() {
    const mem = bytes();
    const size = TYPES[ptrType];
    byteOff = Math.max(0, +bOff.value || 0); elemOff = Math.max(0, +eOff.value || 0);
    const start = byteOff + elemOff * size;
    const read = mem.slice(start, start + size);
    const inBounds = start + size <= mem.length;

    const table = h("table.w-table", { style: { width: "auto" } });
    const rAddr = h("tr", h("th", "address")), rByte = h("tr", h("th", "byte")), rChr = h("tr", h("th", "as char")), rEl = h("tr", h("th", "element"));
    mem.forEach((m, i) => {
      const hit = i >= start && i < start + size;
      const st = { textAlign: "center", background: hit ? "color-mix(in srgb, var(--primary-bg) calc(var(--primary-bg-alpha) * 100%), transparent)" : "", borderLeft: m.k === 0 || (endian === "big" && m.k === 0) ? "1.5px solid var(--text-caption)" : "" };
      if (i % 4 === 0) st.borderLeft = "1.5px solid var(--text-caption)";
      rAddr.append(h("td", { style: { ...st, color: "var(--text-caption)" } }, "0x" + (base + i).toString(16)));
      rByte.append(h("td", { style: { ...st, fontWeight: hit ? "600" : "400" } }, m.v.toString(16).toUpperCase().padStart(2, "0")));
      rChr.append(h("td", { style: { ...st, color: "var(--text-caption)" } }, m.v === 0 ? "\\0" : m.v >= 32 && m.v < 127 ? `'${String.fromCharCode(m.v)}'` : "·"));
      rEl.append(h("td", { style: { ...st, color: "var(--text-caption)" } }, i % 4 === 0 ? `a[${m.elem}]` : ""));
    });
    table.append(rEl, rAddr, rByte, rChr);
    clear(grid).append(table);

    let val = "out of bounds", sval = "—";
    if (inBounds) {
      const ordered = endian === "little" ? [...read].reverse() : read;       // most significant first
      const u = ordered.reduce((acc, m) => acc * 256 + m.v, 0);
      const bits = size * 8;
      val = "0x" + u.toString(16).toUpperCase().padStart(size * 2, "0") + "  (" + u + ")";
      sval = String(u >= 2 ** (bits - 1) ? u - 2 ** bits : u).replace("-", "−");
    }
    let len = 0, terminated = false;
    for (let i = byteOff; i < mem.length; i++) { if (mem[i].v === 0) { terminated = true; break; } len++; }
    const cast = ptrType === "int32_t *" ? "a" : `(${ptrType})a`;
    const inner = byteOff ? `(${ptrType})((char *)a + ${byteOff})` : cast;
    expr.innerHTML = `Reading <code>*(${inner}${elemOff ? " + " + elemOff : ""})</code> starts at address <b>0x${(base + start).toString(16)}</b> and takes <b>${size}</b> byte${size > 1 ? "s" : ""}. ` +
      `Adding ${elemOff || "k"} to a <code>${ptrType}</code> moves ${elemOff ? elemOff * size : "k × " + size} byte${size > 1 || elemOff !== 1 ? "s" : ""}: pointer arithmetic scales by the pointed-to size.`;
    clear(out).append(
      stat("Value read (unsigned)", val, inBounds ? "" : "bad"),
      stat("Same bits, signed", sval),
      stat(`strlen((char *)a + ${byteOff})`, terminated ? String(len) : "no '\\0' in bounds", terminated ? "" : "bad"),
    );
  }

  [src, bOff, eOff].forEach((i) => i.addEventListener("input", paint));
  body.append(
    h("div.w-row", h("code", "uint32_t a[] = {"), src, h("code", "};")),
    h("div.w-row",
      seg([["little", "Little-endian"], ["big", "Big-endian"]], endian, (v) => { endian = v; paint(); }),
      h("span.w-note", "a starts at address 0x100"),
    ),
    grid,
    h("div.w-row",
      field("Read through", select(Object.keys(TYPES), ptrType, (v) => { ptrType = v; paint(); })),
      field("Byte offset first", bOff),
      field("Then + elements", eOff),
    ),
    expr, out,
    h("div.w-note", "Endianness reorders the bytes inside each 4-byte value. It never reorders array elements, and it never reorders bits inside a byte."),
  );
  paint();
}
