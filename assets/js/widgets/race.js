// Data race explorer: choose the interleaving of two threads running  x += 1  (load, add, store) by hand.
import { h, frame, seg, clear } from "./_kit.js";

const STEPS = [["lw   t0, 0(sp)", "load x into this thread's t0"], ["addi t0, t0, 1", "add 1 in the register (private)"], ["sw   t0, 0(sp)", "store t0 back to x"]];

export default function mount(el) {
  const body = frame(el, "Data race: choose the interleaving");
  let n = 2, lock = false, x, pc, t0, log, holder;
  const cols = h("div.w-row", { style: { alignItems: "stretch" } });
  const shared = h("div.w-row"), logEl = h("div.w-scroll", { style: { maxHeight: "170px", overflowY: "auto" } }), verdict = h("div.w-note");

  const reset = () => { x = 0; pc = Array(n).fill(0); t0 = Array(n).fill(null); log = []; holder = -1; paint(); };
  function stepThread(i) {
    if (pc[i] >= 3) return;
    if (lock && pc[i] === 0) { if (holder !== -1) return; holder = i; }
    if (pc[i] === 0) t0[i] = x;
    else if (pc[i] === 1) t0[i] += 1;
    else { x = t0[i]; if (lock) holder = -1; }
    log.push({ i, text: STEPS[pc[i]][0], x, reg: t0[i] });
    pc[i]++;
    paint();
  }
  const runOrder = (order) => { reset(); order.forEach(stepThread); };

  function paint() {
    clear(cols);
    for (let i = 0; i < n; i++) {
      const blocked = lock && pc[i] === 0 && holder !== -1;
      const done = pc[i] >= 3;
      cols.append(h("div.w-col", { style: { flex: "1 1 180px", padding: "10px 12px", borderRadius: "8px", background: "var(--row-hover)" } },
        h("div.w-label", `Thread ${i + 1}${lock && holder === i ? " · holds the lock" : ""}`),
        STEPS.map(([code], k) => h("div", { style: { font: "400 12px/20px var(--font-mono)", padding: "0 6px", borderRadius: "4px", background: k === pc[i] ? "color-mix(in srgb, var(--primary-bg) calc(var(--primary-bg-alpha) * 100%), transparent)" : "", opacity: k < pc[i] ? 0.45 : 1 } }, `${k < pc[i] ? "✓" : k === pc[i] ? "→" : " "} ${code}`)),
        h("div.w-note", `its t0 = ${t0[i] === null ? "—" : t0[i]}`),
        h("button.w-btn.primary", { type: "button", disabled: done || blocked, onclick: () => stepThread(i) }, done ? "finished" : blocked ? "waiting for lock" : `Run: ${STEPS[pc[i]][1]}`),
      ));
    }
    clear(shared).append(h("span.w-label", "Shared memory"), h("span.w-pill.infoc", { style: { fontSize: "13px", height: "24px", fontFamily: "var(--font-mono)" } }, `x = ${x}`));
    const t = h("table.w-table", { style: { width: "auto" } }, h("tr", h("th", "#"), h("th", "thread"), h("th", "instruction"), h("th", "that thread's t0"), h("th", "x in memory")));
    log.forEach((l, k) => t.append(h("tr", h("td", String(k + 1)), h("td", `T${l.i + 1}`), h("td", l.text), h("td", String(l.reg)), h("td", String(l.x)))));
    clear(logEl).append(log.length ? t : h("div.w-note", "Click a thread's button to run its next instruction. You are the scheduler."));
    logEl.scrollTop = logEl.scrollHeight;
    const finished = pc.every((p) => p >= 3);
    verdict.innerHTML = finished
      ? (x === n ? `<span class="w-pill good">x = ${x}</span> &nbsp;Every increment survived. ${lock ? "With the critical section, this is the only possible outcome." : "This interleaving happened to be safe — but it is not guaranteed."}`
        : `<span class="w-pill bad">x = ${x}, expected ${n}</span> &nbsp;<b>Lost update.</b> A thread loaded x, another thread stored a new value, and then the first thread stored its stale result on top.`)
      : `Possible final values without synchronization: anywhere from <b>1</b> to <b>${n}</b>. ${lock ? "With the lock, a thread cannot begin its load until the current holder has stored." : ""}`;
  }

  body.append(
    h("div.w-row",
      seg([[2, "2 threads"], [3, "3 threads"]], n, (v) => { n = +v; reset(); }),
      seg([["off", "No synchronization"], ["on", "#pragma omp critical"]], "off", (v) => { lock = v === "on"; reset(); }),
      h("button.w-btn", { type: "button", onclick: () => runOrder([...Array(n).keys()].flatMap((i) => [i, i, i])) }, "One after another"),
      h("button.w-btn", { type: "button", onclick: () => runOrder([0, 1, 2].flatMap(() => [...Array(n).keys()])) }, "Perfectly interleaved"),
      h("button.w-btn", { type: "button", onclick: reset }, "Reset"),
    ),
    h("div.w-note", { html: "Each thread runs the three instructions that <code>x += 1;</code> compiles to. Registers are private to a thread; <code>x</code> lives in shared memory." }),
    cols, shared, verdict, logEl,
  );
  reset();
}
