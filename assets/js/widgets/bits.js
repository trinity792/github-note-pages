// Bit-pattern explorer: one N-bit pattern read under every integer encoding from lecture.
import { h, frame, stat, seg, clear, parseNum, group4 } from "./_kit.js";

export default function mount(el, opts) {
  const body = frame(el, "Same bits, five meanings");
  let n = +(opts.bits || 8);
  let u = BigInt(parseNum(opts.value || "0xD2") || 0);

  const bitsEl = h("div.bits");
  const stats = h("div.w-grid");
  const input = h("input.w-input", { style: { width: "150px" }, placeholder: "-46, 0xD2, 0b1101…", "aria-label": "Value" });
  const mask = () => (1n << BigInt(n)) - 1n;

  const setFromText = () => {
    const v = parseNum(input.value);
    if (Number.isNaN(v)) return;
    u = BigInt.asUintN(n, BigInt(v));
    paint();
  };
  input.addEventListener("change", setFromText);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") setFromText(); });

  function paint() {
    u &= mask();
    const N = BigInt(n);
    const msb = (u >> (N - 1n)) & 1n;
    const twos = msb ? u - (1n << N) : u;
    const lowMag = u & (mask() >> 1n);
    const signMag = msb ? (lowMag === 0n ? "−0" : "−" + lowMag) : String(lowMag);
    const ones = msb ? (u === mask() ? "−0" : String(u - mask())) : String(u);
    const bias = (1n << (N - 1n)) - 1n;

    clear(bitsEl);
    for (let hi = n - 1; hi >= 0; hi -= 4) {
      const grp = h("div.grp");
      for (let i = hi; i > hi - 4; i--) {
        const on = (u >> BigInt(i)) & 1n;
        grp.append(h(`button.bit${on ? ".on" : ""}`, {
          type: "button", title: `bit ${i} (weight 2^${i})`, "aria-label": `bit ${i}, currently ${on}`,
          onclick: () => { u ^= 1n << BigInt(i); paint(); },
        }, String(on), n <= 16 ? h("small", String(i)) : null));
      }
      bitsEl.append(grp);
    }
    clear(stats).append(
      stat("Hex", "0x" + u.toString(16).toUpperCase().padStart(n / 4, "0")),
      stat("Unsigned", String(u)),
      stat("Two's complement", String(twos).replace("-", "−")),
      stat("Sign-magnitude", signMag),
      stat("Ones' complement", ones.replace("-", "−")),
      stat(`Bias (−${bias})`, String(u - bias).replace("-", "−")),
    );
    note.innerHTML = msb
      ? `MSB is <b>1</b>: unsigned reads it as +2<sup>${n - 1}</sup>, two's complement as <b>−2<sup>${n - 1}</sup></b>. That one weight is the whole difference: ${u} − 2<sup>${n}</sup> = ${twos}.`
      : `MSB is <b>0</b>, so unsigned, sign-magnitude, ones' complement, and two's complement all agree. They only differ on patterns with a leading 1.`;
  }

  const note = h("div.w-note");
  const btn = (label, fn) => h("button.w-btn", { type: "button", onclick: () => { fn(); paint(); } }, label);
  body.append(
    h("div.w-row",
      seg([[4, "4-bit"], [8, "8-bit"], [16, "16-bit"], [32, "32-bit"]], n, (v) => { n = +v; paint(); }),
      input,
    ),
    h("div", { style: { paddingTop: "10px" } }, bitsEl),
    h("div.w-row",
      btn("+1", () => { u += 1n; }),
      btn("−1", () => { u -= 1n; u = BigInt.asUintN(n, u); }),
      btn("Negate (flip bits, add 1)", () => { u = (~u + 1n) & mask(); }),
      btn("Invert", () => { u = ~u & mask(); }),
      btn("Clear", () => { u = 0n; }),
    ),
    stats,
    note,
    h("div.w-note", "Click any bit to toggle it. Try the edge cases: all ones, a lone MSB (", h("code", "0x80"), "), and stepping +1 past the largest positive value."),
  );
  paint();
}
