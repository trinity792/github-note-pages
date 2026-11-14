// Finite state machine stepper: feed input bits, watch the state, the output, and the truth-table row in use.
import { h, s, frame, select, clear } from "./_kit.js";

// t[state][input] = [nextState, output]
const MACHINES = {
  "Three 1s in a row": {
    states: ["S0", "S1", "S2"],
    meaning: ["no 1s yet", "seen one 1", "seen two 1s"],
    t: [[[0, 0], [1, 0]], [[0, 0], [2, 0]], [[0, 0], [0, 1]]],
    about: "The lecture example. Output 1 on the cycle the third consecutive 1 arrives, then start over. Three states are enough because the machine only needs to remember how many 1s in a row it has just seen (0, 1 or 2).",
  },
  "Detect 101 (overlapping)": {
    states: ["S0", "S1", "S2"],
    meaning: ["nothing useful", "last bit was 1", "last bits were 10"],
    t: [[[0, 0], [1, 0]], [[2, 0], [1, 0]], [[0, 0], [1, 1]]],
    about: "Output 1 whenever the last three inputs were 101. After a match the machine goes to S1, not S0, because the final 1 can start the next 101.",
  },
  "Number of 1s mod 3": {
    states: ["r0", "r1", "r2"],
    meaning: ["count ≡ 0", "count ≡ 1", "count ≡ 2"],
    t: [[[0, 1], [1, 0]], [[1, 0], [2, 0]], [[2, 0], [0, 1]]],
    about: "State = (number of 1s seen) mod 3. Update rule: r′ = (r + input) mod 3. Output 1 when the count is a multiple of 3.",
  },
  "Binary value mod 3": {
    states: ["r0", "r1", "r2"],
    meaning: ["value ≡ 0", "value ≡ 1", "value ≡ 2"],
    t: [[[0, 1], [1, 0]], [[2, 0], [0, 1]], [[1, 0], [2, 0]]],
    about: "Bits arrive most-significant first. Appending bit b turns value v into 2v + b, so the update rule is r′ = (2r + input) mod 3 — different from counting 1s, even though the state names look the same.",
  },
};

export default function mount(el, opts) {
  const body = frame(el, "FSM stepper");
  let name = opts.machine || Object.keys(MACHINES)[0];
  let cur = 0, hist = [], last = null;
  const diagram = h("div"), table = h("div.w-scroll"), tape = h("div.w-scroll"), about = h("div.w-note");

  const pos = [[90, 190], [250, 90], [410, 190]];
  function draw() {
    const m = MACHINES[name];
    const svg = s("svg", { class: "w-svg", viewBox: "0 0 500 282", style: "max-width:520px" });
    svg.append(s("defs", {}, s("marker", { id: "fsm-arrow", viewBox: "0 0 10 10", refX: 9, refY: 5, markerWidth: 7, markerHeight: 7, orient: "auto-start-reverse" }, s("path", { d: "M0,0 L10,5 L0,10 z", fill: "context-stroke" }))));
    const R = 26;
    // group transitions by (from,to) so shared arcs get one combined label
    const arcs = new Map();
    m.t.forEach((row, from) => row.forEach(([to, out], inp) => {
      const k = from + ">" + to;
      if (!arcs.has(k)) arcs.set(k, { from, to, labels: [], hot: false });
      const a = arcs.get(k);
      a.labels.push(`${inp}/${out}`);
      if (last && last.from === from && last.inp === inp) a.hot = true;
    }));
    for (const a of arcs.values()) {
      const [x1, y1] = pos[a.from], [x2, y2] = pos[a.to];
      const stroke = a.hot ? "var(--primary-fg)" : "var(--text-caption)";
      let d, lx, ly;
      if (a.from === a.to) {
        const up = a.from === 1 ? -1 : 1;                         // loop above the top state, below the bottom ones
        d = `M${x1 - 14} ${y1 + up * 22} C ${x1 - 40} ${y1 + up * 70}, ${x1 + 40} ${y1 + up * 70}, ${x1 + 14} ${y1 + up * 22}`;
        lx = x1; ly = y1 + up * 62 + (up > 0 ? 8 : -2);
      } else {
        const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy), nx = -dy / len, ny = dx / len;
        const bend = 26;
        const mx = (x1 + x2) / 2 + nx * bend, my = (y1 + y2) / 2 + ny * bend;
        const sx = x1 + (dx / len) * R + nx * 8, sy = y1 + (dy / len) * R + ny * 8;
        const ex = x2 - (dx / len) * R + nx * 8, ey = y2 - (dy / len) * R + ny * 8;
        d = `M${sx} ${sy} Q ${mx} ${my} ${ex} ${ey}`;
        lx = (x1 + x2) / 2 + nx * (bend + 4); ly = (y1 + y2) / 2 + ny * (bend + 4) + 4;
      }
      svg.append(
        s("path", { d, fill: "none", stroke, "stroke-width": a.hot ? 2.2 : 1.3, "marker-end": "url(#fsm-arrow)" }),
        s("text", { x: lx, y: ly, "text-anchor": "middle", "font-size": 11, class: "mono", fill: a.hot ? "var(--primary-text)" : null, "font-weight": a.hot ? 600 : 400 }, a.labels.join(", ")),
      );
    }
    svg.append(s("path", { d: `M${pos[0][0] - 62} ${pos[0][1]} L${pos[0][0] - R - 2} ${pos[0][1]}`, stroke: "var(--text-caption)", "marker-end": "url(#fsm-arrow)" }), s("text", { x: pos[0][0] - 64, y: pos[0][1] - 6, "font-size": 9, class: "muted" }, "start"));
    m.states.forEach((st, i) => {
      const on = i === cur;
      svg.append(
        s("circle", { cx: pos[i][0], cy: pos[i][1], r: R, fill: on ? "var(--primary)" : "var(--bg)", stroke: on ? "var(--primary-fg)" : "var(--text-caption)", "stroke-width": on ? 2.5 : 1.3 }),
        s("text", { x: pos[i][0], y: pos[i][1] + 4, "text-anchor": "middle", "font-size": 13, "font-weight": 600, fill: on ? "var(--contrast-text)" : null }, st),
      );
    });
    svg.append(s("text", { x: 250, y: 277, "text-anchor": "middle", "font-size": 10, class: "muted" }, "arc labels are input / output"));
    clear(diagram).append(svg);

    const bits = Math.ceil(Math.log2(m.states.length));
    const t = h("table.w-table", { style: { width: "auto" } }, h("tr", h("th", "PS"), h("th", "meaning"), h("th", "input"), h("th", "NS"), h("th", "output")));
    m.t.forEach((row, from) => row.forEach(([to, out], inp) => {
      t.append(h(`tr${last && last.from === from && last.inp === inp ? ".cur" : ""}`,
        h("td", `${m.states[from]} (${from.toString(2).padStart(bits, "0")})`), h("td", { style: { fontFamily: "var(--font-ui)" } }, m.meaning[from]),
        h("td", String(inp)), h("td", `${m.states[to]} (${to.toString(2).padStart(bits, "0")})`), h("td", String(out))));
    }));
    clear(table).append(t);

    const tp = h("table.w-table", { style: { width: "auto" } });
    const shown = hist.slice(-24);
    tp.append(h("tr", h("th", "input"), shown.map((x) => h("td", String(x.inp)))), h("tr", h("th", "output"), shown.map((x) => h("td", { style: { fontWeight: 600, color: x.out ? "var(--primary-text)" : "" } }, String(x.out)))), h("tr", h("th", "state after"), shown.map((x) => h("td", m.states[x.to]))));
    clear(tape).append(hist.length ? tp : h("div.w-note", "Press 0 or 1 to feed the machine one input per clock cycle."));
    about.innerHTML = `${m.about} <b>${m.states.length} states → ${bits} register bit${bits > 1 ? "s" : ""}.</b>`;
  }
  const feed = (inp) => { const m = MACHINES[name]; const [to, out] = m.t[cur][inp]; last = { from: cur, inp }; hist.push({ inp, out, to }); cur = to; draw(); };
  const reset = () => { cur = 0; hist = []; last = null; draw(); };

  body.append(
    h("div.w-row",
      select(Object.keys(MACHINES), name, (v) => { name = v; reset(); }),
      h("span.w-label", "Next input"),
      h("button.w-btn.primary", { type: "button", onclick: () => feed(0) }, "0"),
      h("button.w-btn.primary", { type: "button", onclick: () => feed(1) }, "1"),
      h("button.w-btn", { type: "button", onclick: () => [1, 0, 1, 1, 1, 0, 1].forEach(feed) }, "Feed 1011101"),
      h("button.w-btn", { type: "button", onclick: reset }, "Reset"),
    ),
    diagram, tape, about, h("div.w-label", "State transition table"), table,
  );
  draw();
}
