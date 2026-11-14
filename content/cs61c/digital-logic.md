---
title: Digital Logic & SDS
Content Type: Topic Review
Course: CS61C
description: Boolean algebra, gates, registers and timing, FSMs, and the adder/ALU blocks.
Last Updated: November 14, 2026
Status: Ready to review
priority: Medium–high — a timing or circuit question and an FSM question appear on most finals
sources: 7.1 Intro to SDS; 7.2 Combinational Logic; 7.3 State, Timing; 7.4 Combinational Logic Blocks
practice: FA24 Final Q6, Q10; FA25 Final Q2.5, Q9; SP25 Final Q8–Q9; FA23 Final Q10; SP24 Final Q4; SP26 Final Q1.7–1.8; FA25 MT Q2, Q6; FA24 MT Q5–Q6; SP23 MT Q5–Q6
---

Processors are **synchronous digital systems** (SDS): *digital* because every wire is a 0 or a 1, *synchronous* because a single **clock** decides when stored values are allowed to change. Everything is built from just two kinds of circuit:

- **Combinational logic (CL):** output depends only on the *current* inputs (after some delay). No memory. Gates, muxes, adders, the ALU.
- **State elements:** remember a value. Registers, memory.

> [!abstract] The whole topic in six lines
> - Truth table ↔ Boolean expression ↔ gate circuit are three views of the same function; you must convert between all of them.
> - Simplify with Boolean algebra; **DeMorgan** and **uniting** ($xy + x\bar{y} = x$) do most of the work.
> - A **register** copies D to Q at the **rising clock edge**. D must be stable for **setup** time before the edge and **hold** time after; Q changes **clk-to-q** after the edge.
> - **Min clock period = clk-to-q + longest CL delay + setup.** (critical path) $\;$ Max frequency $= 1/\text{period}$.
> - **Hold is safe when clk-to-q + shortest CL delay ≥ hold.**
> - An **FSM** = a state register + CL computing next state and output. $n$ states need $\lceil \log_2 n \rceil$ register bits.

## From transistors to gates

A transistor is a voltage-controlled switch. CMOS uses two kinds in complementary pairs: **n-type** conducts when its gate is high (1), **p-type** conducts when its gate is low (0). Wiring them between power and ground gives the basic gates; everything above this level only needs the gates' truth tables.

| Gate | Expression | Output is 1 when… |
|---|---|---|
| NOT | $\bar{a}$ | $a$ is 0 |
| AND | $ab$ | both are 1 |
| OR | $a + b$ | at least one is 1 |
| XOR | $a \oplus b$ | inputs differ (odd number of 1s) |
| NAND | $\overline{ab}$ | not both 1 |
| NOR | $\overline{a+b}$ | both are 0 |
| XNOR | $\overline{a \oplus b}$ | inputs are equal |

Two views of XOR worth remembering: it is a **"not equal" detector**, and it is a **conditional inverter** ($a \oplus 0 = a$, $a \oplus 1 = \bar{a}$).

## Boolean algebra

AND is written like multiplication, OR like addition, NOT as an overbar. AND binds tighter than OR.

| Law | OR form | AND form |
|---|---|---|
| Identity | $x + 0 = x$ | $x \cdot 1 = x$ |
| Null (annihilation) | $x + 1 = 1$ | $x \cdot 0 = 0$ |
| Idempotent | $x + x = x$ | $x \cdot x = x$ |
| Complement | $x + \bar{x} = 1$ | $x \cdot \bar{x} = 0$ |
| Commutative | $x + y = y + x$ | $xy = yx$ |
| Associative | $(x+y)+z = x+(y+z)$ | $(xy)z = x(yz)$ |
| Distributive | $x + yz = (x+y)(x+z)$ | $x(y+z) = xy + xz$ |
| Absorption (uniting) | $x + xy = x$, $\;x + \bar{x}y = x + y$ | $x(x+y) = x$, $\;xy + x\bar{y} = x$ |
| **DeMorgan** | $\overline{x + y} = \bar{x}\,\bar{y}$ | $\overline{xy} = \bar{x} + \bar{y}$ |

> [!tip] DeMorgan in words
> *Break the bar, change the sign.* A NAND is an OR of inverted inputs; a NOR is an AND of inverted inputs.

### Truth table → expression → circuit

1. **Canonical sum-of-products:** for every row where the output is 1, write an AND term containing each input (plain if it is 1 in that row, inverted if 0). OR all the terms together.
2. **Simplify** algebraically.
3. **Draw gates** following the structure of the expression.

> [!example] Simplifying a 3-input function
> Output is 1 for $abc \in \{011, 101, 110, 111\}$ (the "majority" function).
> $$
> \begin{aligned}
> y &= \bar{a}bc + a\bar{b}c + ab\bar{c} + abc \\
>   &= (\bar{a}bc + abc) + (a\bar{b}c + abc) + (ab\bar{c} + abc) && \text{idempotent: reuse } abc \\
>   &= bc + ac + ab && \text{uniting, three times}
> \end{aligned}
> $$

Check any simplification by comparing truth tables:

<div data-widget="logic"></div>

> [!warning] "Minimize" what, exactly?
> Exams ask for the fewest **gates**, the fewest **operators**, or the shortest **delay** — these are different objectives. Also look for inputs that do not matter at all: if two rows that differ only in $c$ always give the same output, $c$ drops out.

## State: registers

A **register** is $n$ flip-flops sharing one clock. On each **rising edge** it samples its input **D** and, a moment later, shows that value on its output **Q** — and holds it until the next rising edge, no matter what D does in between.

| Parameter | Meaning |
|---|---|
| **Setup time** | how long D must be stable **before** the rising edge |
| **Hold time** | how long D must stay stable **after** the rising edge |
| **Clk-to-q delay** | how long after the rising edge the new value appears on Q |

Why registers are needed: in an accumulator ($S = S + X_i$), feeding the adder's output straight back into its input makes it add uncontrollably. A register in the feedback path lets exactly one addition happen per clock cycle.

## Timing

All timing questions are about one picture: a register, some combinational logic, another register.

> [!info] The two constraints
> **Setup (the long path).** The new value must leave the first register, get through the *slowest* logic path, and arrive a setup time before the next edge:
> $$
> t_{\text{clk}} \;\ge\; t_{\text{clk-to-q}} + t_{\text{CL, max}} + t_{\text{setup}}
> $$
> The right-hand side is the **critical path delay**. Maximum frequency $= 1 / t_{\text{clk, min}}$.
>
> **Hold (the short path).** The new value must not race through the *fastest* path and disturb the second register while it is still capturing the old value:
> $$
> t_{\text{clk-to-q}} + t_{\text{CL, min}} \;\ge\; t_{\text{hold}}
> $$
> Hold has nothing to do with the clock period.

<div data-widget="timing"></div>

Rules for finding the paths:

- A path **starts** at a register output (or a circuit input with its own stated arrival time) and **ends** at a register input. A register in the middle splits it into two separate paths.
- Delays **in series add**; paths **in parallel do not** — take the max (for setup) or the min (for hold).
- At a mux, the **select** line is a path too, and is often the slowest one.
- Wires and splitters are free *unless the problem says otherwise*.
- Check units: 5 ns period → $1/(5\times10^{-9}\,\text{s}) = 200$ MHz.

> [!example] Quick check from lecture
> Registers have 1 ns clk-to-q, setup and hold. The longest path between registers passes through three AND gates of 1 ns each. Critical path $= 1 + 3 + 1 = 5$ ns → max frequency **200 MHz**. If the shortest register-to-register path has one AND gate: $1 + 1 = 2 \ge 1$, so hold is satisfied.

### Pipelining a circuit

To raise the clock frequency, **insert a register in the middle of the critical path**. Each stage now has less logic, so the period can shrink — at the cost of an extra cycle of **latency** and the register's own clk-to-q + setup overhead in every stage. The best cut **balances** the stages; the new period is set by the slower one. A register in a *feedback* loop does not automatically help: the loop still needs the same total work per result.

## Finite state machines

An FSM has a finite set of **states**, **inputs**, and **outputs**. Each clock cycle it looks at its current state and input, produces an output, and moves to a next state. In a diagram: circles are states, arcs are labeled **input / output**, and one state is marked as the start.

In hardware, every FSM has the same shape: a **state register** holding the current state, plus combinational logic computing **(next state, output)** from **(current state, input)**.

<div data-widget="fsm"></div>

**Designing one:**

1. Decide **what must be remembered**. Each state should stand for one fact about the input history ("seen two 1s in a row", "value so far ≡ 2 mod 5"). This invariant, not the picture, is the design.
2. Draw the transitions for **every** input from **every** state.
3. Assign a bit pattern to each state and write the truth table: (PS, input) → (NS, output).
4. Derive Boolean expressions for each next-state bit and the output; build with gates + a register.

> [!tip] FSM sanity checks
> - **States vs. bits:** $n$ states need $\lceil \log_2 n \rceil$ flip-flops. Remembering the last $k$ input bits exactly takes up to $2^k$ states.
> - **Don't over-count:** many "recent input" conditions compress to a short summary. You rarely need one state per bit string.
> - **Overlap:** after a sequence detector fires, can the tail of the match begin the next match?
> - **Output timing:** is the output determined by the transition being taken (as in the arcs above) or only by the state you are in? Trace a short input in a table to be sure.
> - **Update rule:** "count of 1s mod $n$" uses $r' = (r + b) \bmod n$; "binary number mod $n$" uses $r' = (2r + b) \bmod n$.

## Combinational logic blocks

### Multiplexer (mux)

A selector: $S$ select bits choose one of $2^S$ data inputs. Data inputs can be any width. A 2-to-1 mux is $y = \bar{s}a + sb$; bigger muxes can be built as trees of 2-to-1 muxes.

### Adder

A **full adder** adds three bits $a_i$, $b_i$, $c_i$:

$$
s_i = a_i \oplus b_i \oplus c_i \qquad c_{i+1} = a_ib_i + a_ic_i + b_ic_i
$$

Chain $n$ of them, carry-out to carry-in, for an $n$-bit **ripple-carry adder**. The carry chain is its critical path.

### Subtractor

$A - B = A + \bar{B} + 1$. So one extra control bit **SUB** turns the adder into an adder/subtractor:

- XOR every bit of $B$ with SUB (conditional inversion);
- feed SUB into the carry-in $c_0$ (the "+1").

### Overflow

For two's complement, overflow happens exactly when the carry **into** the sign bit differs from the carry **out of** it:

$$
\text{overflow} = c_n \oplus c_{n-1}
$$

(Unsigned overflow is just $c_n$.)

### ALU

The arithmetic logic unit computes several candidate results in parallel (add/sub, AND, OR, XOR, shifts, …) and a **mux** selects one according to a control signal. Its delay is that of the slowest function plus the mux.

## How this shows up on exams

- **Simplify** a truth table or expression under an operator or gate limit.
- **Timing:** find the critical path and max frequency; check or fix a hold violation; choose where to add a pipeline register and explain the improvement.
- **Waveform tracing:** given a clock and input waveform, find when internal wires change (track the sampling edge, then clk-to-q, then each gate delay).
- **FSMs:** complete a state diagram or table, find the minimum number of states, turn a table into a circuit.
- **Equivalent circuits:** replace an expensive block (a multiplier, a comparator) with something cheaper for the special case at hand.

```quiz
Q: Which expression equals $\overline{a + \bar{b}c}$?
- [ ] $\bar{a} + b\bar{c}$
- [x] $\bar{a}(b + \bar{c})$
- [ ] $\bar{a}\,\bar{b}\,c$
- [ ] $\bar{a} b \bar{c}$
> DeMorgan twice: $\overline{a + \bar{b}c} = \bar{a}\cdot\overline{\bar{b}c} = \bar{a}(b + \bar{c})$.
---
Q: Registers have clk-to-q = 2 ns, setup = 1 ns, hold = 3 ns. The longest logic path is 7 ns and the shortest is 0.5 ns. What is true?
- [ ] Max frequency is 100 MHz and there is no hold violation
- [x] Min period is 10 ns, and there is a hold violation
- [ ] Min period is 9 ns, and there is a hold violation
- [ ] Min period is 13 ns, and there is no hold violation
> Setup: $2 + 7 + 1 = 10$ ns (100 MHz). Hold: $2 + 0.5 = 2.5 < 3$, violated. Slowing the clock cannot fix it; add delay to the short path.
---
Q: An FSM must output 1 exactly when the last **four** input bits were `1011`. What is the minimum number of flip-flops?
- [ ] 1
- [x] 2
- [ ] 3
- [ ] 4
> States track progress through the pattern: matched nothing, `1`, `10`, `101` — four states, so $\lceil\log_2 4\rceil = 2$ bits.
---
Q: In an $n$-bit adder/subtractor, what are the SUB signal's two jobs?
- [ ] Select the mux output and clear the register
- [x] Invert every bit of B (through XOR gates) and act as the carry-in
- [ ] Invert A and invert the result
- [ ] Sign-extend B and set the overflow flag
> $A - B = A + \bar{B} + 1$. XOR with SUB conditionally inverts; SUB as $c_0$ supplies the $+1$.
---
Q: A circuit's critical path is 12 ns (including register overhead of 2 ns). You insert one pipeline register that splits the logic perfectly in half. What is the new minimum period?
- [ ] 6 ns
- [x] 7 ns
- [ ] 5 ns
- [ ] 12 ns
> 10 ns of logic splits into 5 + 5. Each stage still pays clk-to-q + setup = 2 ns: $5 + 2 = 7$ ns. Pipelining never gives a perfect 2× because of register overhead.
---
Q: Adding `0111 + 0001` on a 4-bit adder gives `1000`. Carry into the sign bit is 1 and carry out is 0. This means:
- [ ] Unsigned overflow only
- [x] Signed overflow only
- [ ] Both
- [ ] Neither
> $c_n \oplus c_{n-1} = 0 \oplus 1 = 1$: signed overflow ($7 + 1 \ne -8$). Unsigned $7 + 1 = 8$ fits, and $c_n = 0$ agrees.
```

## Practice

| Skill | Start with | Then |
|---|---|---|
| Boolean simplification with operator limits | SP23 MT Q1.7, FA25 MT Q6.1 | SP26 Final Q4.8 |
| Critical path, max frequency, hold | SP23 MT Q6, FA24 MT Q5 | FA24 Final Q6, SP25 Final Q9 |
| Waveform / time-domain tracing | FA23 MT Q5.3–5.7 | FA24 MT Q5.3–5.4 |
| Sequence detectors and modular counters | SP23 MT Q5, FA24 MT Q6.3–6.8 | FA24 Final Q10, SP24 Final Q4 |
| History, delays and state count | FA25 MT Q2 | FA23 Final Q10, FA25 Final Q9 |
| FSM as a predictor / adversarial inputs | — | SP25 Final Q8 |
