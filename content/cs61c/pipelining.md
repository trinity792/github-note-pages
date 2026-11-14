---
title: Pipelining & Hazards
Content Type: Topic Review
Course: CS61C
description: The 5-stage pipeline, performance, and structural, data, and control hazards.
Last Updated: November 14, 2026
Status: Ready to review
priority: Very high — a multi-part pipeline question is on every final, and the assumptions change each time
sources: 7.3 Pipelining circuits; 9.1 Throughput, Latency, the 5-Stage Pipeline, Iron Law, Superscalar; 9.2 Hazards (structural, data, control)
practice: SP26 Final Q5; FA25 Final Q3–Q4; SP25 Final Q5; FA24 Final Q5; SP24 Final Q3; FA23 Final Q3; SP23 Final Q2; SU24 Final Q6
---

The single-cycle processor makes every instruction as slow as a load. **Pipelining** cuts the datapath into stages separated by registers so that up to five instructions are in flight at once, each in a different stage. No single instruction gets faster — but far more instructions finish per second.

> [!abstract] The whole topic in seven lines
> - Five stages — **IF, ID, EX, MEM, WB** — separated by **pipeline registers** (IF/ID, ID/EX, EX/MEM, MEM/WB) that carry data *and control* forward.
> - Clock period = **slowest stage** (+ register overhead). **Throughput** improves; **latency** of one instruction gets slightly worse.
> - **Iron law:** time/program = instructions/program × cycles/instruction (CPI) × time/cycle.
> - **Structural hazard:** two instructions need the same hardware in the same cycle. Solved by design (separate IMEM/DMEM, two-read-one-write RegFile).
> - **Data hazard:** an instruction reads a register before an earlier one has written it. Solved by **write-then-read RegFile**, **forwarding**, and, when unavoidable, **stalling**.
> - **Load-use:** a load followed immediately by a user of its result costs **one stall** even with forwarding.
> - **Control hazard:** instructions after a branch are fetched before the outcome is known. Predict not-taken; **flush** the wrong-path instructions when a branch is taken.

## Latency vs. throughput

The laundry analogy: wash, dry, fold, stash — 30 minutes each. Four loads done one at a time take 8 hours. Start the next load as soon as the washer is free and four loads take 3.5 hours.

| Measure | Meaning | Sequential | Pipelined |
|---|---|---|---|
| **Latency** | time for **one** task start to finish | 2 hours | 2 hours (no better) |
| **Throughput** | tasks completed per unit time | 1 load / 2 h | 1 load / 30 min in steady state |

- Pipelining helps **throughput**, not latency.
- Speedup is limited by the **slowest stage**: every stage must take one clock period.
- With $n$ balanced stages the ideal speedup approaches $n$; unbalanced stages and register overhead (clk-to-q + setup in every stage) reduce it.

> [!example] Clock rates from the lecture's stage delays
> IF 200 ps, ID 100 ps, EX 200 ps, MEM 200 ps, WB 100 ps.
> **Single-cycle:** period = sum = 800 ps → 1.25 GHz.
> **Pipelined:** period = max stage = 200 ps → **5 GHz**. A single instruction now takes $5 \times 200 = 1000$ ps (worse latency), but one instruction completes every 200 ps: a 4× throughput gain rather than 5×, because the stages are unbalanced.

## The iron law of processor performance

$$
\frac{\text{time}}{\text{program}} = \frac{\text{instructions}}{\text{program}} \times \frac{\text{cycles}}{\text{instruction}} \times \frac{\text{time}}{\text{cycle}}
$$

| Factor | Determined by |
|---|---|
| **Instructions / program** | the task, the algorithm, the language, the compiler, the ISA |
| **CPI** (cycles per instruction) | the ISA and the **processor implementation**. Single-cycle: 1. Five-stage pipeline: ≈ 1, slightly more because of stalls and flushes. Superscalar: < 1 |
| **Time / cycle** (clock period) | the critical path, the circuit technology, the power budget |

Only **time** is a complete measure: a change that improves one factor often hurts another (deeper pipelines shorten the cycle but raise CPI through more hazards). Throughput in instructions per second is $f / \text{CPI}$.

> [!example] Using the iron law
> Processor A: 1 GHz, CPI 1.0. Processor B: 2.5 GHz, CPI 1.5 on the same program.
> Time per instruction: A = $1.0 \times 1$ ns = 1 ns; B = $1.5 \times 0.4$ ns = 0.6 ns. **B is 1.67× faster** even with the worse CPI.

**Going further:** a **superscalar** processor starts several instructions per cycle on parallel execution units (and reorders them out-of-order to dodge hazards), giving CPI < 1. Energy matters too: energy/program = instructions/program × energy/instruction; power is only a *rate*.

## The five-stage pipelined datapath

Same hardware as the single-cycle design, plus registers between stages.

| Stage | Work | Written into the next pipeline register |
|---|---|---|
| **IF** | read IMEM at PC; compute PC + 4 | IF/ID: PC, instruction |
| **ID** | decode; read RegFile; generate immediate | ID/EX: PC, `R[rs1]`, `R[rs2]`, imm, instruction/control |
| **EX** | ALU; branch comparison | EX/MEM: ALU result, `R[rs2]` (store data), PC, instruction/control |
| **MEM** | read/write DMEM; **decide `PCSel`** | MEM/WB: ALU result, memory data, PC + 4, instruction/control |
| **WB** | choose the write-back value; write `rd` | — (RegFile) |

Key consequences:

- **Everything an instruction will need later must travel with it.** The PC, `rd`, and the control signals ride along through the pipeline registers; an instruction in WB writes *its own* `rd`, not the `rd` of whatever is currently in ID.
- **Control is pipelined too:** signals are generated in ID and consumed in the stage that needs them (`ALUSel` in EX, `MemRW` in MEM, `RegWEn`/`WBSel` in WB).
- Two paths run **backward** (right to left): write-back to the RegFile → the source of **data hazards**; and the next-PC selection → the source of **control hazards**.

RISC-V was designed for this: fixed 32-bit instructions (easy fetch), register fields in fixed positions (read registers while decoding), and memory operands only in loads/stores (address in EX, access in MEM).

## Hazards

A **hazard** is a situation where the next instruction cannot execute correctly in the next clock cycle.

### Structural hazards

Two instructions need the same resource in the same cycle. The RV32I pipeline avoids them by construction:

- **RegFile:** two read ports and a separate write port, so the instruction in ID can read while the one in WB writes.
- **Memory:** separate IMEM and DMEM, so the instruction in IF can fetch while the one in MEM loads or stores.

They reappear only if the hardware changes — a single shared memory, a RegFile with one combined port, a new instruction that needs two writes, and so on.

### Data hazards

```riscv
add s0, t0, t1     # writes s0 in WB (cycle 5)
sub t2, s0, t0     # reads s0 in ID (cycle 3)  ← stale!
```

Three tools, cheapest first:

**1. Write-then-read RegFile ("double pumping").** The RegFile writes in the first half of the cycle and reads in the second half. An instruction in ID then sees the value being written by the instruction in WB **in the same cycle**. This is an assumption about the hardware — exams sometimes take it away.

**2. Forwarding (bypassing).** The result of `add` exists at the end of its EX stage; it just hasn't reached the RegFile. Add wires and wider muxes at the ALU inputs so the value can be taken straight from a pipeline register:

| Path | From | Use when the consumer is… |
|---|---|---|
| **MEM → EX** | EX/MEM register (ALU result of the previous instruction) | 1 instruction behind |
| **WB → EX** | MEM/WB register (ALU result or loaded data) | 2 instructions behind |

The consumer still reads a stale value in ID; forwarding simply overrides it at the ALU input.

**3. Stalling.** Hold the dependent instruction (and everything behind it) and send **bubbles** — nops — down the pipeline until the value is available.

| Assumptions | Stalls for `add` immediately followed by a user of its result |
|---|---|
| No forwarding, RegFile writes only at the clock edge | **3** |
| No forwarding, write-then-read RegFile | **2** |
| Forwarding (MEM→EX, WB→EX) | **0** |

#### Load-use hazard

```riscv
lw  s1, 8(s0)      # data comes out of DMEM at the END of MEM
or  t3, s1, t5     # needs s1 at the START of EX — the same cycle
```

The value does not exist yet, so nothing can be forwarded. The pipeline must **stall one cycle**, then use WB → EX forwarding. The instruction slot right after a load is called the **load delay slot**. Compilers avoid the penalty with **code scheduling**: reorder so that an unrelated instruction sits between the load and its first use.

> [!info] Detecting a data hazard
> For the instruction in ID with sources `rs1`, `rs2` and an instruction ahead of it with destination `rd`:
> **hazard** ⇔ the earlier instruction **writes a register** (`RegWEn` = 1), **`rd ≠ x0`**, and `rd` equals a source register the later instruction **actually uses**.
> The last clause matters: bits 24–20 are only `rs2` for R, S and B formats. An I-type's immediate that happens to equal a register number is not a dependency.

Build diagrams for any sequence and flip the assumptions:

<div data-widget="pipeline" data-program="Load-use hazard"></div>

### Control hazards

A branch's outcome is not known when the next instruction must be fetched. In the lecture's pipeline the branch comparison happens in EX and **`PCSel` is applied in MEM**, so by the time a branch is known to be taken, **three** younger instructions are already in IF, ID and EX.

| Approach | Cost |
|---|---|
| Stall on every branch until resolved | 3 cycles for **every** branch, taken or not |
| **Assume not taken** (what the 5-stage pipeline does) | 0 cycles if not taken; **3 flushed instructions** if taken |
| Dynamic **branch prediction** | guess per branch from its history; pay only on a misprediction |

**Flushing** turns the wrong-path instructions into nops before they can change any state (no register or memory write). Unconditional jumps (`jal`, `jalr`) always redirect, so they always pay the penalty in this design.

Moving the branch decision earlier (for example resolving in EX) cuts the penalty to 2; that is the kind of variation exams introduce.

<div data-widget="pipeline" data-program="Taken branch"></div>

> [!tip] Branch prediction as an FSM
> A **saturating counter** is a small FSM per branch: e.g. two bits with states *strongly not-taken, weakly not-taken, weakly taken, strongly taken*. The prediction comes from the **current state**; the actual outcome moves the state one step. Trace it in a table: (state → prediction) vs. (outcome → next state).

## Solving a pipeline question

> [!danger] The assumptions change every exam — write them down first
> 1. **Which stages exist**, and what happens in each? (Two-stage, five-stage, six-stage with a separate branch-compare stage…)
> 2. **RegFile:** write-then-read in the same cycle, or not?
> 3. **Forwarding:** exactly which paths exist? "Forwarding" does not mean *every* path.
> 4. **Branches:** which stage resolves them? Predict taken or not-taken? How many instructions are flushed?
> 5. For each instruction: in which stage is each operand **needed**, and at the end of which stage is its result **available**?

Then build the diagram row by row:

1. Each instruction enters IF one cycle after the previous one, unless that one is stalled.
2. For every source register, find the most recent earlier writer. Can the value reach the consumer in time, by RegFile read or an existing forwarding path? If not, delay the consumer until it can.
3. A stalled instruction delays **every instruction after it** by the same amount.
4. After a taken branch or jump, mark the wrong-path instructions as flushed and fetch the target once the branch has resolved.
5. Total time = cycle in which the **last** instruction finishes WB. With $n$ instructions and no hazards that is $n + 4$.

> [!warning] Frequent mistakes
> - **A dependency is not always a hazard, and a hazard is not always a stall.** Forwarding resolves most hazards with zero stalls.
> - Forgetting that `x0` can never cause a hazard.
> - Treating a store's `rs2` or a branch's operands as "not sources". They are read like any other.
> - Counting the flushed instructions as completed work when computing CPI, or forgetting them when counting cycles.
> - Without write-then-read, an instruction decoded in the same cycle as its producer's WB reads a **stale** value — and by its EX stage the value has left the pipeline registers, so standard forwarding cannot help either.
> - Assuming the same number of stalls after the pipeline is changed (a new stage moves both "available" and "needed").

## Pipelining a circuit (recap from SDS)

Inserting a register in the middle of a long combinational path lets the clock run faster. New period = (longest stage delay) + clk-to-q + setup. Best cut = the one that balances the stage delays. More stages → higher frequency, more registers, more latency in cycles, and — in a processor — more hazards.

```quiz
Q: A single-cycle CPU has stage delays IF 250, ID 150, EX 200, MEM 300, WB 100 ps. Ignoring register overhead, what is the pipelined clock period?
- [ ] 1000 ps
- [ ] 200 ps
- [x] 300 ps
- [ ] 100 ps
> The clock must fit the **slowest** stage, MEM at 300 ps. Speedup is $1000/300 \approx 3.3\times$, not 5×, because stages are unbalanced.
---
Q: With MEM→EX and WB→EX forwarding and a write-then-read RegFile, how many stall cycles does this need?  `lw t0, 0(a0)` · `add t1, t0, t0` · `sub t2, t1, t0`
- [ ] 0
- [x] 1
- [ ] 2
- [ ] 3
> One load-use stall between `lw` and `add`. After that, `sub` gets `t1` by MEM→EX forwarding and `t0` from the RegFile, with no further stalls.
---
Q: No forwarding, but the RegFile is write-then-read. `add s0, t0, t1` is immediately followed by `sub t2, s0, t0`. How many stalls?
- [ ] 0
- [ ] 1
- [x] 2
- [ ] 3
> `sub` must be in ID during (or after) `add`'s WB. `add` is in WB in cycle 5; `sub` would naturally be in ID in cycle 3: two cycles of delay.
---
Q: In the lecture's pipeline (branch decision applied in MEM, predict not-taken), how many instructions are flushed when a branch is taken?
- [ ] 1
- [ ] 2
- [x] 3
- [ ] 0
> When the branch reaches MEM, the three instructions behind it are in EX, ID and IF. All three are wrong-path.
---
Q: A program runs 1 billion instructions on a 5-stage pipeline at 4 GHz. 20% of instructions are loads and half of those are followed by a load-use dependency (1 stall each). Ignoring other hazards, what is the execution time?
- [ ] 0.25 s
- [x] 0.275 s
- [ ] 0.30 s
- [ ] 1.1 s
> CPI $= 1 + 0.2 \times 0.5 \times 1 = 1.1$. Time $= 10^9 \times 1.1 \times 0.25\,\text{ns} = 0.275$ s.
---
Q: Which pair has a data dependency that could be a hazard?
- [ ] `addi t0, t1, 5` then `add t2, t3, t4`
- [ ] `add x0, t1, t2` then `sub t3, x0, t4`
- [x] `sw t0, 0(t1)` preceded by `add t0, t2, t3`
- [ ] `beq t0, t1, L` then `add t0, t2, t3`
> The store reads `t0` (its `rs2`) which the `add` just wrote. Writes to `x0` never create a dependency, and a later instruction writing `t0` cannot affect an earlier branch.
```

## Practice

| Skill | Start with | Then |
|---|---|---|
| Hazard classification, scheduling without forwarding | SU24 Final Q6.1 | FA24 Final Q5 |
| Cycle counts with/without forwarding, flushes | FA23 Final Q3 | FA25 Final Q4 |
| Forwarding conditions from instruction fields | FA25 Final Q3 | SP24 Final Q3 |
| Non-standard pipelines (2-stage, 6-stage) | SP23 Final Q2 | SP25 Final Q5, SP26 Final Q5 |
| Branch prediction FSM | — | SP25 Final Q8 |
