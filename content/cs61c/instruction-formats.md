---
title: Instruction Formats
Content Type: Topic Review
Course: CS61C
description: R, I, S, B, U, and J encodings, immediates, and PC-relative addressing.
Last Updated: November 14, 2026
Status: Ready to review
priority: Medium — short encode/decode questions, plus field extraction inside C, datapath and pipeline problems
sources: 5.1 Instruction Formats I (R, I, S); 5.2 Instruction Formats II (B, J, U); RV32I Green Card
practice: FA25 Final Q1.6; SP26 Final Q1.5; FA25 Final Q10; FA24 MT Q1.6–1.7; FA23 MT Q1.5; SP23 MT Q1.6; FA25 MT Q3
---

**Stored-program concept:** instructions are just 32-bit numbers kept in the same memory as data. The assembler turns each line of assembly into one 32-bit word; the processor decodes it by slicing fixed bit fields. RISC-V uses six formats, designed so that the hardware slicing is as dumb as possible.

> [!abstract] The whole topic in five lines
> - Every RV32 instruction is **32 bits**. The low 7 bits are always the **opcode**.
> - `rd`, `rs1`, `rs2` are 5-bit register numbers, **always in the same bit positions** when present. `funct3`/`funct7` refine the opcode.
> - **R** = three registers. **I** = 12-bit immediate (also loads, `jalr`). **S** = store. **B** = branch. **U** = 20-bit upper immediate. **J** = `jal`.
> - Immediates are **sign-extended**, and their sign bit is **always instruction bit 31**.
> - Branches and `jal` are **PC-relative**: the immediate is a byte offset from the current instruction, with an implicit 0 as its lowest bit.

## The six formats

| Format | 31–25 | 24–20 | 19–15 | 14–12 | 11–7 | 6–0 |
|---|---|---|---|---|---|---|
| **R** | funct7 | rs2 | rs1 | funct3 | rd | opcode |
| **I** | imm[11:5] … | … imm[4:0] | rs1 | funct3 | rd | opcode |
| **S** | imm[11:5] | rs2 | rs1 | funct3 | imm[4:0] | opcode |
| **B** | imm[12 \| 10:5] | rs2 | rs1 | funct3 | imm[4:1 \| 11] | opcode |
| **U** | imm[31:25] … | … | … | … imm[14:12] | rd | opcode |
| **J** | imm[20 \| 10:5] … | … imm[4:1 \| 11] | imm[19:15] … | … imm[14:12] | rd | opcode |

Type an instruction (or paste a hex word) and see where every bit goes:

<div data-widget="rv-encode" data-inst="beq a0, a1, 16"></div>

### Why it looks like this

- **Regularity keeps hardware simple.** Because `rs1`, `rs2`, `rd` never move, the processor can start reading registers before it has even finished decoding which instruction it is.
- **S and B exist as separate formats** only because stores and branches have *no* `rd`. Rather than move `rs1`/`rs2`, the immediate is split around them.
- **The sign bit of every immediate is bit 31**, so sign extension can start immediately.
- **B and J scramble the immediate** so that as many immediate bits as possible sit in the same instruction bits as in S and I. Less multiplexing in the immediate generator.

## R-type: register–register

`add`, `sub`, `and`, `or`, `xor`, `sll`, `srl`, `sra`, `slt`, `sltu` all share opcode `0110011`. `funct3` picks the operation and `funct7` disambiguates pairs:

| Instruction | funct7 | funct3 |
|---|---|---|
| `add` / `sub` | `0000000` / **`0100000`** | `000` |
| `srl` / `sra` | `0000000` / **`0100000`** | `101` |
| `sll`, `slt`, `sltu`, `xor`, `or`, `and` | `0000000` | `001`, `010`, `011`, `100`, `110`, `111` |

> [!example] Encode `add x18, x19, x10`
> funct7 `0000000` · rs2 = 10 `01010` · rs1 = 19 `10011` · funct3 `000` · rd = 18 `10010` · opcode `0110011`
> → `0000 0000 1010 1001 1000 1001 0011 0011` = `0x00A98933`

## I-type: immediates, loads, jalr

One 12-bit two's complement immediate ($-2048 \ldots 2047$) replaces `funct7` + `rs2`.

| Group | Opcode | Examples |
|---|---|---|
| Arithmetic with immediate | `0010011` | `addi`, `slti`, `sltiu`, `xori`, `ori`, `andi` |
| Shift by immediate ("I\*") | `0010011` | `slli`, `srli`, `srai` — only the low 5 bits are the shift amount; the top 7 act as a funct7 (`srai` has `0100000`) |
| Loads | `0000011` | `lb`, `lh`, `lw`, `lbu`, `lhu` — funct3 encodes width and signedness |
| Jump and link register | `1100111` | `jalr` |

Loads are I-type because they need the same things as `addi`: one source register (the base), one destination, and an immediate (the offset).

## S-type: stores

A store reads **two** registers (base `rs1`, data `rs2`) and writes none, so the 12-bit offset takes over the `rd` slot for its low 5 bits:

`sw x14, 8(x2)` → imm = 8 = `0000000 01000` → `0000000 | 01110 | 00010 | 010 | 01000 | 0100011` = `0x00E12423`

## B-type: branches and PC-relative addressing

Branches rarely go far, so instead of a full address they store a signed **offset from the branch's own PC**:

$$
\text{target} = \text{PC} + \text{imm}
$$

- The offset is in **bytes** but always even (instructions are at least 2 bytes when compressed extensions are counted), so **bit 0 is not stored**. Twelve stored bits give a 13-bit offset: imm[12:1].
- **Range:** $-4096 \ldots +4094$ bytes, i.e. about $\pm 2^{10}$ 32-bit instructions.
- Offsets are relative to the **branch instruction itself**, not the next instruction.
- Because targets are relative, the code is **position-independent**: move the whole program and no branch changes. This is why the assembler alone can finish them.

> [!example] Computing a branch offset
> ```riscv
> loop: beq  x19, x10, end     # at address 0x10
>       add  x18, x18, x10
>       addi x19, x19, -1
>       j    loop
> end:  ...                    # at address 0x20
> ```
> `end` is 4 instructions past the `beq`: offset $= 4 \times 4 = 16 = $ `0b0_0000_0001_0000` (13 bits).
> Drop bit 0, then place: imm[12] = 0, imm[10:5] = `000000`, imm[4:1] = `1000`, imm[11] = 0.
> The `j loop` is 3 instructions after `loop`: offset $-12$.

Branching farther than the range? Invert the branch and hop over an unconditional jump: `bne …, skip` / `j far` / `skip:`.

## J-type: jal

`jal rd, label` has no source registers, so 20 bits hold imm[20:1] (bit 0 implicit again):

- **Range:** $\pm 2^{20}$ bytes $= \pm 1$ MiB, i.e. $\pm 2^{18}$ instructions.
- Also PC-relative. `rd = PC + 4`, `PC = PC + imm`.
- `jalr` is **I-type**, not J: target $= \text{rs1} + \text{imm}$ with a normal 12-bit immediate (no implicit zero, not PC-relative). It reaches anywhere, because the register supplies a full 32-bit address.

## U-type: building 32-bit constants

A 12-bit immediate cannot express most constants or addresses. U-type supplies the other 20 bits.

| Instruction | Effect |
|---|---|
| `lui rd, immu` | `rd = immu << 12` (upper 20 bits set, low 12 bits zero) |
| `auipc rd, immu` | `rd = PC + (immu << 12)` — a PC-relative address builder |

`li rd, big` becomes `lui` + `addi`. `la` and far calls use `auipc` + `addi`/`jalr`.

> [!danger] The `lui` + `addi` trap
> `addi` **sign-extends** its 12-bit immediate. If bit 11 of the constant is 1, `addi` effectively subtracts `0x1000`, so the upper part must be **one larger** to compensate.
>
> `li x10, 0x87654321` → `lui x10, 0x87654` ; `addi x10, x10, 0x321` ✔ (bit 11 of `0x321` is 0)
>
> `li x10, 0xB0BACAFE` → `lui x10, 0xB0BAD` ; `addi x10, x10, 0xAFE` — note **`0xB0BAD`**, because `0xAFE` sign-extends to `0xFFFFFAFE` ($-1282$).

## Converting by hand

**Assembly → machine code**

1. Identify the format (R, I, I\*, S, B, U, J) and look up opcode / funct3 / funct7 on the green card.
2. Write each register number in 5 bits and the immediate in two's complement at its full width.
3. For B and J, write the offset **including bit 0**, cross out bit 0, then place the remaining pieces.
4. Concatenate the fields in order and regroup into hex nibbles.

**Machine code → assembly**

1. Write out all 32 bits. The **low 7 bits** give the opcode and therefore the format.
2. Slice at 7, 12, 15, 20, 25 from the right.
3. Use funct3 (and funct7) to name the instruction; decode registers; reassemble and sign-extend the immediate.

> [!tip] When instruction fields appear inside another problem
> C code extracting fields is just shifts and masks: `opcode = inst & 0x7F`, `rd = (inst >> 7) & 0x1F`, `funct3 = (inst >> 12) & 0x7`, `rs1 = (inst >> 15) & 0x1F`, `rs2 = (inst >> 20) & 0x1F`.
> **But bits 24–20 are only `rs2` if the format has one.** For an I-type they are part of the immediate. Hazard-detection and dependency questions turn on this: check the opcode before treating a field as a register.

| Opcode (binary) | Hex | Instructions |
|---|---|---|
| `0110011` | `0x33` | R-type arithmetic |
| `0010011` | `0x13` | I-type arithmetic and shifts |
| `0000011` | `0x03` | loads |
| `0100011` | `0x23` | stores |
| `1100011` | `0x63` | branches |
| `1100111` | `0x67` | `jalr` |
| `1101111` | `0x6F` | `jal` |
| `0110111` | `0x37` | `lui` |
| `0010111` | `0x17` | `auipc` |

```quiz
Q: Which fields are in the **same bit positions** in every format that has them?
- [x] opcode, rd, funct3, rs1, rs2
- [ ] only the opcode
- [ ] the immediate
- [ ] opcode and immediate
> Keeping register fields fixed lets the hardware read registers in parallel with decoding. Only the immediate moves around.
---
Q: A branch at address `0x100` targets address `0xF0`. What 13-bit offset is encoded?
- [ ] $-4$
- [x] $-16$
- [ ] $-8$
- [ ] $+16$
> Offset $=$ target $-$ PC $= \texttt{0xF0} - \texttt{0x100} = -16$ bytes (4 instructions back). Bit 0 is dropped when storing.
---
Q: How far can a single `jal` reach?
- [ ] $\pm 4$ KiB
- [ ] $\pm 2$ KiB
- [x] $\pm 1$ MiB
- [ ] anywhere in the 4 GiB address space
> 20 stored bits + implicit 0 = 21-bit signed byte offset: $\pm 2^{20}$ bytes.
---
Q: Which pair correctly loads `0x12345FFF` into `t0`?
- [ ] `lui t0, 0x12345` ; `addi t0, t0, 0xFFF`
- [x] `lui t0, 0x12346` ; `addi t0, t0, -1`
- [ ] `lui t0, 0x12345` ; `addi t0, t0, 4095`
- [ ] `addi t0, x0, 0x12345FFF`
> The low 12 bits `0xFFF` sign-extend to $-1$, so the upper part must be `0x12346`: `0x12346000 − 1 = 0x12345FFF`.
---
Q: Why is `jalr` I-type rather than J-type?
- [ ] It has a longer range
- [x] It needs a source register `rs1` plus a 12-bit immediate, exactly like `addi`
- [ ] It does not write `rd`
- [ ] Its immediate is PC-relative
> `jalr` computes `rs1 + imm`. That is the I-type shape. `jal` has no source register, so it can afford a 20-bit immediate.
---
Q: The word `0x00008067` decodes to:
- [ ] `addi x0, x1, 0`
- [x] `jalr x0, x1, 0` (i.e. `ret`)
- [ ] `jal x1, 0`
- [ ] `lw x0, 0(x1)`
> Low 7 bits `1100111` = `jalr`. rd = 0, rs1 = 1, imm = 0.
```

## Practice

| Skill | Start with | Then |
|---|---|---|
| Encode / decode one instruction | FA24 MT Q1.6–1.7, FA23 MT Q1.5 | FA25 Final Q1.6, SP26 Final Q1.5 |
| Branch and jump ranges, offsets | FA25 MT Q3 | SU23 Final Q3.9–3.10 |
| Fields used inside C or pipeline logic | — | FA25 Final Q3, SP24 Final Q3.7–3.12 |
| Self-modifying code, bit-level changes | — | FA25 Final Q10, FA23 Final Q9 |
