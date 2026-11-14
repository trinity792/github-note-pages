---
title: Single-Cycle Datapath
Content Type: Topic Review
Course: CS61C
description: The five phases, every control signal, and how to add a new instruction.
Last Updated: November 14, 2026
Status: Ready to review
priority: Very high — every fall/spring final tests datapath and control, usually by adding an unfamiliar instruction
sources: 8.1 Single-Cycle Datapath I (elements, R-type, I-type); 8.2 Datapath II (load/store, B-type, jumps, U-type); 8.3 Control, Instruction Timing, CSRs
practice: SP26 Final Q4; FA25 Final Q2; SP25 Final Q4; FA24 Final Q4; FA23 Final Q2; SP23 Final Q1; SP24 Final Q3; FA25 MT Q5; SP24 MT Q7; SU24 Final Q5
---

A processor is the two kinds of circuit from the last unit, arranged with purpose: **state elements** (PC, registers, memory) hold the machine's state, and **combinational logic** between them computes the next state. In a **single-cycle** design every instruction — fetch to write-back — finishes within **one clock cycle**.

- **Datapath** ("the brawn"): the hardware that moves and transforms data.
- **Control** ("the brain"): logic that reads the instruction bits and sets the datapath's mux selects and write enables.

> [!abstract] The whole topic in six lines
> - Five phases: **IF** fetch → **ID** decode + read registers → **EX** ALU + branch compare → **MEM** data memory → **WB** write register.
> - State changes **only at the rising clock edge**: PC always; RegFile if `RegWEn`; DMEM if `MemRW` = Write. Reads are combinational.
> - Nine control signals: `PCSel`, `ImmSel`, `BrUn`, `ASel`, `BSel`, `ALUSel`, `MemRW`, `RegWEn`, `WBSel`.
> - The ALU does double duty: arithmetic for R/I-types, **address** for loads/stores, **target** for branches and jumps.
> - `PCSel` is the only signal that depends on the datapath (branch comparator → `BrEq`, `BrLT`).
> - Clock period is set by the **slowest instruction: the load**, the only one active in all five phases.

## The five phases

| Phase | What happens | Hardware |
|---|---|---|
| **IF** — Instruction Fetch | Send PC to instruction memory, read the 32-bit instruction; compute PC + 4 | PC register, +4 adder, PCSel mux, IMEM |
| **ID** — Instruction Decode | Slice the instruction; read `R[rs1]`, `R[rs2]`; build the immediate; generate control signals | RegFile, ImmGen, control logic |
| **EX** — Execute | ALU operation; branch comparison | ASel mux, BSel mux, Branch Comparator, ALU |
| **MEM** — Memory | Read or write data memory at the address the ALU computed | DMEM |
| **WB** — Write Back | Choose what goes into `rd`: memory data, ALU result, or PC + 4 | WBSel mux, RegFile |

These are *phases* of one long combinational path, not separately clocked steps. (They become clocked **stages** in the pipeline.)

<div data-widget="datapath" data-inst="add"></div>

## State elements

| Element | Read | Write |
|---|---|---|
| **PC** (32-bit register) | always outputs the current instruction's address | every rising edge |
| **RegFile** (32 registers) | **combinational**: `rs1`, `rs2` select `rdata1`, `rdata2` after an access delay, regardless of `RegWEn` | rising edge, if `RegWEn` = 1: `R[rd] = wdata` |
| **DMEM** (data memory) | combinational: `addr` selects `rdata` | rising edge, if `MemRW` = Write: `Mem[addr] = wdata` |
| **IMEM** (instruction memory) | combinational; treated as read-only | — |

Two separate memories are drawn because a single-cycle design must fetch an instruction **and** access data in the same cycle.

> [!info] Why this timing model works
> During a cycle the state elements' outputs drive the combinational logic, which settles to final values. At the **next rising edge**, everything that is write-enabled captures its input at once: the PC gets the next PC, and (if enabled) the RegFile and DMEM get their data. So the *results* of instruction $i$ are written at the same edge that starts instruction $i+1$.

## Combinational blocks

| Block | Inputs → Output | Controlled by |
|---|---|---|
| **ImmGen** | instruction bits → 32-bit sign-extended immediate | `ImmSel` (I, S, B, U, J) |
| **Branch Comparator** | `R[rs1]`, `R[rs2]` → `BrEq`, `BrLT` | `BrUn` (1 = unsigned compare) |
| **ASel mux** | `R[rs1]` or **PC** → ALU input A | `ASel` |
| **BSel mux** | `R[rs2]` or **imm** → ALU input B | `BSel` |
| **ALU** | A, B → result | `ALUSel` (add, sub, and, or, xor, shifts, slt, pass-B, …) |
| **WBSel mux** | DMEM data, ALU result, or PC + 4 → `wdata` | `WBSel` |
| **PCSel mux** | PC + 4 or ALU result → next PC | `PCSel` |

The branch comparator exists because the ALU is **busy** during a branch: it is computing the target `PC + imm`, so the comparison needs its own hardware.

## Control signals

| Signal | Width | Meaning |
|---|---|---|
| `PCSel` | 1 | next PC: `PC + 4` or the ALU output (taken branch, any jump) |
| `ImmSel` | 3 | which format ImmGen should assume |
| `BrUn` | 1 | unsigned branch comparison |
| `ASel` | 1 | ALU input A: `R[rs1]` or PC |
| `BSel` | 1 | ALU input B: `R[rs2]` or immediate |
| `ALUSel` | 4 | ALU operation |
| `MemRW` | 1 | 1 = write DMEM, 0 = read |
| `RegWEn` | 1 | 1 = write `rd` |
| `WBSel` | 2 | write-back source: memory, ALU, or PC + 4 |

### The control table

| Instruction | PCSel | ImmSel | BrUn | ASel | BSel | ALUSel | MemRW | RegWEn | WBSel |
|---|---|---|---|---|---|---|---|---|---|
| `add` | +4 | \* | \* | Reg | Reg | Add | Read | 1 | ALU |
| `sub` | +4 | \* | \* | Reg | Reg | Sub | Read | 1 | ALU |
| `addi` | +4 | I | \* | Reg | Imm | Add | Read | 1 | ALU |
| `lw` | +4 | I | \* | Reg | Imm | Add | Read | 1 | Mem |
| `sw` | +4 | S | \* | Reg | Imm | Add | **Write** | **0** | \* |
| `beq` / `bne` | *depends* | B | \* | **PC** | Imm | Add | Read | **0** | \* |
| `blt` / `bltu` | *depends* | B | 0 / 1 | **PC** | Imm | Add | Read | **0** | \* |
| `jal` | ALU | J | \* | **PC** | Imm | Add | Read | 1 | **PC+4** |
| `jalr` | ALU | I | \* | Reg | Imm | Add | Read | 1 | **PC+4** |
| `lui` | +4 | U | \* | \* | Imm | pass B | Read | 1 | ALU |
| `auipc` | +4 | U | \* | **PC** | Imm | Add | Read | 1 | ALU |

For branches the controller looks at the comparator outputs:

| Instruction | Taken when | then `PCSel` = |
|---|---|---|
| `beq` | `BrEq` = 1 | ALU |
| `bne` | `BrEq` = 0 | ALU |
| `blt`, `bltu` | `BrLT` = 1 | ALU |
| `bge`, `bgeu` | `BrLT` = 0 | ALU |

> [!danger] Three kinds of answer in a control table
> 1. **A fixed value** the instruction needs (`BSel` = Imm for `addi`).
> 2. **A value that depends on run-time data** (`PCSel` for a branch).
> 3. **A true don't-care (\*)** — the signal affects nothing this instruction uses.
>
> Never write "don't care" for a **write enable**. `RegWEn` and `MemRW` must be exactly right even when the data being selected is irrelevant, or the instruction silently corrupts a register or memory. `WBSel` can be \* for `sw` *only because* `RegWEn` = 0.

### How control is built

Control is a function of the instruction bits (plus `BrEq`, `BrLT`). Two implementations:

- **ROM:** address = the instruction bits that matter, data word = the control signals. Easy to change. In RV32I only **9 bits** distinguish instructions: `inst[6:2]` (opcode; the low two bits are always `11`), `inst[14:12]` (funct3), and `inst[30]` (the one funct7 bit that separates `add`/`sub` and `srl`/`sra`). `PCSel` is computed separately by a small "take branch?" logic block, because it needs the comparator outputs.
- **Combinational logic:** write each signal as a Boolean expression of instruction bits. For example, `BrUn` = (opcode is branch) · `inst[13]`.

## Tracing instructions

For each one, say **what the ALU is doing** and **where the result goes**.

| Instruction | ALU computes | Result goes to | Phases used |
|---|---|---|---|
| R-type | `R[rs1]` op `R[rs2]` | `rd` | IF ID EX WB |
| I-type arithmetic | `R[rs1]` op imm | `rd` | IF ID EX WB |
| Load | address `R[rs1] + imm` | DMEM → `rd` | IF ID EX **MEM WB** |
| Store | address `R[rs1] + imm` | DMEM (data = `R[rs2]`) | IF ID EX MEM |
| Branch | target `PC + imm` | PC, if taken | IF ID EX |
| `jal` | target `PC + imm` | PC; and PC + 4 → `rd` | IF ID EX WB |
| `jalr` | target `R[rs1] + imm` | PC; and PC + 4 → `rd` | IF ID EX WB |
| `lui` | passes imm through | `rd` | IF ID EX WB |
| `auipc` | `PC + imm` | `rd` | IF ID EX WB |

Partial loads and stores (`lb`, `lbu`, `lh`, `sb`, …) reuse the same path: the ALU still computes the address, and extra logic around DMEM selects the right byte(s) and sign- or zero-extends them.

## Instruction timing

Because phases run back-to-back in one cycle, an instruction's delay is the sum along its **longest register-to-register path**, and the clock must fit the worst instruction.

$$
t_{\text{lw}} = t_{\text{clk-to-q}} + t_{\text{IMEM}} + \max(t_{\text{RegFile}},\, t_{\text{Imm}}) + t_{\text{mux}} + t_{\text{ALU}} + t_{\text{DMEM}} + t_{\text{mux}} + t_{\text{setup}}
$$

With the simplified per-phase delays used in lecture:

| Instruction | IF 200 ps | ID 100 ps | EX 200 ps | MEM 200 ps | WB 100 ps | Total |
|---|---|---|---|---|---|---|
| R-type, I-type arithmetic | ✔ | ✔ | ✔ | | ✔ | 600 ps |
| Branch | ✔ | ✔ | ✔ | | | 500 ps |
| Store | ✔ | ✔ | ✔ | ✔ | | 700 ps |
| `jal`, `jalr` | ✔ | ✔ | ✔ | | ✔ | 600 ps |
| **Load** | ✔ | ✔ | ✔ | ✔ | ✔ | **800 ps** |

Clock period ≥ 800 ps → at most **1.25 GHz**, and *every* instruction — even a 500 ps branch — takes the full 800 ps. That waste is the motivation for pipelining.

> [!tip] Timing details that cost points
> - Things that happen **in parallel** (RegFile read and ImmGen; ASel and BSel muxes) contribute a **max**, not a sum.
> - There is also the short PC loop: clk-to-q + adder + mux + setup. It is never the critical path, but it is a path.
> - A register *write* does not add a "write delay" in the same cycle; what matters is that `wdata` arrives a **setup time** before the edge.
> - For a branch, `PCSel` settles late: it needs RegFile read → comparator → control → PCSel mux.

## Adding a new instruction

This is the single most common exam task. Use the same procedure every time.

1. **Write the register-transfer effects completely.** Which registers are read? Which register is written, with what? What address is accessed in memory — read or write, with what data? What is the next PC?
2. **Walk the five phases** and ask whether an existing path already carries each value where it must go.
3. **List conflicts.** A unit can do **one** thing per cycle: one ALU operation, one DMEM address, one RegFile write port, two RegFile read ports. Needing "two adds" or "a read and a write to memory at different addresses" means new hardware.
4. **Add the minimum:** a new mux input, a wider mux, an extra adder, another read/write port, a new ImmGen format.
5. **Fill in the control row**, and decide what the new mux selects must be for **every existing instruction** too.

> [!example] Worked example: `jaddi rd, rs1, imm` — "jump to `PC + imm` and set `rd = rs1 + imm`"
> *Effects:* `R[rd] = R[rs1] + imm`; `PC = PC + imm`.
> *Conflict:* two additions in one cycle — `R[rs1] + imm` and `PC + imm` — but one ALU.
> *Fix:* let the ALU compute `R[rs1] + imm` (ASel = Reg, BSel = Imm, WBSel = ALU, RegWEn = 1) and add a **second adder** for `PC + imm` feeding a **new input on the PCSel mux**. PCSel becomes 2 bits.
> *Control:* `ImmSel` = I, `MemRW` = Read, and the new PCSel value selects the extra adder.

> [!example] Worked example: load with post-increment, `lwinc rd, rs1, imm` — "`rd = Mem[rs1]`, then `rs1 = rs1 + imm`"
> *Effects:* two **register writes** in one instruction, and the memory address is `R[rs1]` itself, not the ALU sum.
> *Fixes:* a second RegFile write port (index `rs1`, data = ALU output, its own enable); a mux in front of DMEM's address choosing `R[rs1]` instead of the ALU output. The ALU is free to compute `R[rs1] + imm`.

> [!warning] Common traps when modifying the datapath
> - "It's already in the diagram" does not mean it is **free this cycle**.
> - The instruction's field *names* don't limit you: an instruction can use the bits called `rd` as a third source register — but then the RegFile needs a **third read port**.
> - A new mux input changes the select width; say so.
> - Don't forget writes you must **suppress** (`RegWEn` = 0, `MemRW` = Read) for instructions that don't write.

## Control and status registers (briefly)

**CSRs** are a separate set of registers (not `x0`–`x31`) used for counters, timers, status flags and talking to other hardware. CSR instructions look like I-type with a 12-bit CSR address in place of the immediate (`csrrw`, `csrrs`, and immediate forms). System instructions such as `ecall` hand control to the operating system.

## How this shows up on exams

- **Support a new instruction** with minimal changes; then fill in its control signals; sometimes then *use* it in assembly.
- **Control table**: give signals for a standard instruction, or decide which are don't-cares.
- **Broken hardware:** "ASel is stuck at 0 — which instructions still work?" Go through the table: any instruction whose required value differs from the stuck value breaks.
- **Timing:** critical path of a given instruction, max clock rate, effect of a faster/slower component.
- **Which phases / units does this instruction use?**

```quiz
Q: For `sw`, which control signals are true don't-cares?
- [ ] `RegWEn` and `WBSel`
- [x] `BrUn` and `WBSel`
- [ ] `MemRW` and `BSel`
- [ ] `ASel` and `WBSel`
> Nothing is written back, so `WBSel` is irrelevant — but only because `RegWEn` is firmly 0. `BrUn` only matters for branches. `ASel`/`BSel` are needed to compute the address.
---
Q: Why does the datapath have a separate branch comparator instead of using the ALU to compare?
- [ ] The ALU cannot subtract
- [x] During a branch the ALU is busy computing `PC + imm`
- [ ] Branches don't reach the EX phase
- [ ] The comparator is faster than the ALU
> In a single cycle each unit does one thing. The ALU produces the target address, so the comparison needs its own hardware.
---
Q: `ASel` is stuck at "Reg" (never selects PC). Which instruction still executes correctly?
- [ ] `beq` (taken)
- [ ] `jal`
- [x] `jalr`
- [ ] `auipc`
> `jalr` computes `R[rs1] + imm`, so it wants ASel = Reg. Branches, `jal` and `auipc` all need the PC on input A.
---
Q: With phase delays IF 200, ID 100, EX 200, MEM 200, WB 100 ps, what is the fastest possible single-cycle clock?
- [ ] 5 GHz
- [ ] 2 GHz
- [x] 1.25 GHz
- [ ] 1 GHz
> The load uses all five phases: 800 ps. $1 / 800\,\text{ps} = 1.25$ GHz.
---
Q: When is the result of `add x5, x6, x7` actually stored into `x5`?
- [ ] As soon as the ALU finishes
- [ ] In the middle of the cycle, during WB
- [x] At the rising clock edge that ends the cycle
- [ ] Two cycles later
> RegFile writes are edge-triggered. The sum sits on `wdata` until the next rising edge — the same edge that loads the next PC.
---
Q: A new instruction must write **two different registers** in one cycle. What is the minimum new hardware?
- [ ] A second ALU
- [x] A second write port on the RegFile (index, data, enable)
- [ ] A second DMEM
- [ ] Nothing; set `RegWEn` twice
> One write port can write one register per edge. A second port, with its own data source and enable, is required.
```

## Practice

| Skill | Start with | Then |
|---|---|---|
| Standard control signals, broken components | SP24 MT Q7 | SU25 Final Q3.1–3.3 |
| New instruction via ALU change, then memory path | FA25 MT Q5 | SP23 Final Q1, FA25 Final Q2 |
| Jump-style and memory-data-path changes | SU24 Final Q5 | FA24 Final Q4 |
| Load + store in one instruction | FA23 Final Q2 | SP25 Final Q4 |
| Conditional move, equivalent control logic | — | SP26 Final Q4 |
| Control placed in pipeline stages | — | SP24 Final Q3 |
