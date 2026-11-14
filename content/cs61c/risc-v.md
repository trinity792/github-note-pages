---
title: RISC-V Assembly
Content Type: Topic Review
Course: CS61C
description: Registers, arithmetic, loads and stores, branches, and the calling convention.
Last Updated: November 14, 2026
Status: Ready to review
priority: High — a function-completion problem appears on nearly every exam, and assembly is the language of datapath and pipeline questions
sources: 4.1 RISC-V Intro; 4.2 Data Transfer; 4.3 Decision Making; 4.4 Procedures; RV32I Green Card
practice: SP26 Final Q3; SP25 Final Q2; FA24 Final Q2–Q3; SP24 Final Q2; FA23 Final Q8; FA25 MT Q4; FA24 MT Q4; FA23 MT Q4; SP23 MT Q4
---

Assembly is what the processor actually executes: a flat list of tiny instructions that each do **one** thing to **registers** or **memory**. RISC-V is a *reduced* instruction set — few instructions, all regular — which is why you can hold the entire language in your head and why the hardware in later units stays simple.

> [!abstract] The whole topic in six lines
> - **32 registers**, each 32 bits (RV32). `x0` is hard-wired to **zero**. Registers have no type; the *instruction* decides how bits are interpreted.
> - Arithmetic is register-to-register: `add rd, rs1, rs2`. An `i` suffix means the last operand is a **12-bit sign-extended immediate**.
> - Memory is reached only through **loads and stores**: `lw rd, offset(base)` / `sw rs2, offset(base)`.
> - Control flow is **branches** (`beq`, `bne`, `blt`, `bge`, `bltu`, `bgeu`) and **jumps** (`jal`, `jalr`) to labels.
> - A call is `jal ra, f`; a return is `jalr x0, ra, 0` (`ret`).
> - **Calling convention:** `a0–a7` arguments/return, `t*` may be destroyed by a call, `s*` and `sp` must be preserved by the callee, `ra` must be saved before you make a call.

## The machine model

| Piece | What it is |
|---|---|
| **Registers** | 32 fast storage cells inside the CPU, `x0`–`x31`. Operands of almost every instruction |
| **Memory** | a giant byte array, far slower than registers. Accessed only by loads/stores |
| **PC** | program counter: address of the current instruction. Each instruction is 4 bytes, so normally `PC = PC + 4` |

C variables have types; registers do not. `add` and `sub` work for signed and unsigned alike (two's complement!), and only a few instructions come in signed/unsigned pairs: `slt`/`sltu`, `blt`/`bltu`, `bge`/`bgeu`, `lb`/`lbu`, `sra`/`srl`.

### Registers and their conventional roles

| Register | Name | Role | Preserved across a call? (Saver) |
|---|---|---|---|
| `x0` | `zero` | constant 0; writes are ignored | — |
| `x1` | `ra` | return address | No (**caller**) |
| `x2` | `sp` | stack pointer | Yes (**callee**) |
| `x5–7`, `x28–31` | `t0–t6` | temporaries | No (**caller**) |
| `x8–9`, `x18–27` | `s0–s11` | saved registers | Yes (**callee**) |
| `x10–11` | `a0–a1` | arguments **and return values** | No (**caller**) |
| `x12–17` | `a2–a7` | arguments | No (**caller**) |

(`gp` and `tp`, `x3`–`x4`, are off-limits in this course.)

## Arithmetic and logic

```riscv
add  t0, t1, t2      # t0 = t1 + t2
sub  t0, t1, t2      # t0 = t1 - t2
addi t0, t1, -5      # t0 = t1 + (-5)     there is no subi: add a negative immediate
and  t0, t1, t2      # bitwise; also or, xor and their immediate forms andi, ori, xori
slli t0, t1, 2       # t0 = t1 << 2       (multiply by 4)
srli t0, t1, 2       # logical right shift: fill with 0
srai t0, t1, 2       # arithmetic right shift: fill with the sign bit
slt  t0, t1, t2      # t0 = (t1 < t2) ? 1 : 0   signed; sltu for unsigned; slti with an immediate
mul  t0, t1, t2      # multiply (extension, used freely in this course)
```

- **Immediates are 12 bits, sign-extended**: range $-2048 \ldots 2047$. Even `andi`/`ori`/`xori` sign-extend. Shift amounts are 0–31.
- **`x0` is your constant and your trash can:** `addi t0, x0, 7` loads 7; `add t0, t1, x0` copies; writing to `x0` discards.
- A C statement with several operators becomes several instructions with temporaries: `a = b + c - d` → `add t0, s1, s2` then `sub s0, t0, s3`.

### Pseudo-instructions

Convenient spellings the assembler rewrites into real instructions.

| Pseudo | Becomes | Meaning |
|---|---|---|
| `mv rd, rs` | `addi rd, rs, 0` | copy |
| `li rd, imm` | `addi rd, x0, imm` (or `lui` + `addi` if wide) | load constant |
| `la rd, label` | `lui`/`auipc` + `addi` | load an address |
| `not rd, rs` | `xori rd, rs, -1` | bitwise NOT |
| `neg rd, rs` | `sub rd, x0, rs` | negate |
| `nop` | `addi x0, x0, 0` | do nothing |
| `j label` | `jal x0, label` | jump, no link |
| `jr rs` / `ret` | `jalr x0, rs, 0` / `jalr x0, ra, 0` | jump to register / return |
| `beqz rs, L` / `bnez rs, L` | `beq rs, x0, L` / `bne rs, x0, L` | compare with zero |
| `bgt a, b, L` / `ble a, b, L` | `blt b, a, L` / `bge b, a, L` | swap the operands |

## Data transfer: loads and stores

```riscv
lw  t0, 8(s0)        # t0 = Memory[s0 + 8]      read a 4-byte word
sw  t0, 12(s0)       # Memory[s0 + 12] = t0     note: the source register comes FIRST
lb  t1, 0(a0)        # read 1 byte, SIGN-extend to 32 bits
lbu t1, 0(a0)        # read 1 byte, ZERO-extend
sb  t1, 3(a0)        # write the low byte of t1
```

- Address = **base register + constant offset**. The offset is in **bytes**.
- Word arrays step by 4: `arr[i]` lives at `arr + 4*i`. Compute `slli t0, i, 2` then add to the base — or just bump the pointer by 4 each iteration.
- RISC-V is **little-endian**: `lb` of a word's address gives its least significant byte.
- `lb` vs `lbu` is the sign-extension question from Number Representation. Use `lbu` for characters and unsigned data. There is no `sbu`: storing just truncates.

> [!example] `A[10] = h + A[3];` with `h` in `s1` and the address of `A` in `s2`
> ```riscv
> lw  t0, 12(s2)       # t0 = A[3]      offset 3 * 4
> add t0, s1, t0       # t0 = h + A[3]
> sw  t0, 40(s2)       # A[10] = t0     offset 10 * 4
> ```

> [!warning] A register holding an address vs. holding a value
> `mv t0, a0` copies the **pointer**. `lw t0, 0(a0)` follows it. Struct fields are just fixed offsets from the struct's address: for `struct { int32_t a; char b; struct foo *c; }` with `a0` pointing at it, `a` is `0(a0)`, `b` is `4(a0)` (use `lb`/`lbu`), `c` is `8(a0)`. Derive the layout once, then use it consistently for both field access and stepping through an array of structs (stride = `sizeof` the struct).

## Decision making: branches

A branch compares two **registers** and, if the condition holds, jumps to a label; otherwise execution falls through to the next instruction.

| Instruction | Branch if | |
|---|---|---|
| `beq rs1, rs2, L` | `rs1 == rs2` | |
| `bne rs1, rs2, L` | `rs1 != rs2` | |
| `blt rs1, rs2, L` | `rs1 < rs2` | signed |
| `bge rs1, rs2, L` | `rs1 >= rs2` | signed |
| `bltu`, `bgeu` | same, unsigned | `bltu` also doubles as a bounds check |

> [!tip] Translate `if` by branching on the **opposite** condition
> Assembly says when to *skip*, C says when to *do*. So `if (a == b) { body }` becomes `bne a, b, skip` followed by the body.

```riscv
# if (i == j) f = g + h; else f = g - h;        # while (save[i] == k) i += 1;
      bne  s3, s4, else                         loop: slli t0, s3, 2
      add  s0, s1, s2                                 add  t0, t0, s6      # &save[i]
      j    done                                       lw   t1, 0(t0)
else: sub  s0, s1, s2                                 bne  t1, s5, exit    # opposite condition leaves
done:                                                 addi s3, s3, 1
                                                      j    loop
                                                exit:
```

A `for` loop is: initialize, then **test at the top** (branch out on the opposite condition), body, update, `j` back.

<div data-widget="rv-sim" data-program="Loop: sum an array"></div>

## Procedures

Two instructions do all the control transfer:

| Instruction | Effect | Typical use |
|---|---|---|
| `jal rd, label` | `rd = PC + 4`; `PC = label` | call: `jal ra, func`. Plain jump: `j label` = `jal x0, label` |
| `jalr rd, rs1, imm` | `rd = PC + 4`; `PC = rs1 + imm` | return: `jalr x0, ra, 0` (`ret`). Call through a function pointer |

"Link" means *save where to come back to*. `ra` holds the address of the instruction after the call.

### The six steps of a call

| # | Who | Step |
|---|---|---|
| 1 | caller | Save any caller-saved registers it still needs; put arguments in `a0`–`a7` |
| 2 | caller | Transfer control: `jal ra, func` |
| 3 | callee | **Prologue:** move `sp` down to make a frame; save `ra` (if it will call anything) and any `s` registers it will use |
| 4 | callee | Do the work |
| 5 | callee | Put the result in `a0`; **epilogue:** restore saved registers, move `sp` back up |
| 6 | callee | Return: `ret` |

### The calling convention is a contract

> [!info] Two kinds of registers
> **Callee-saved (`s0`–`s11`, `sp`):** the caller may assume these are **unchanged** after a call. A function that wants to use one must save the old value in its prologue and restore it in its epilogue.
>
> **Caller-saved (`t0`–`t6`, `a0`–`a7`, `ra`):** the callee may trash these freely. If the caller needs a value in one of them **after** a call, the caller must save it first (on the stack, or by moving it into an `s` register it has already saved).
>
> No register is "off limits" — the convention only says **who is responsible** for preserving what.

The stack grows **down**. Allocate by subtracting from `sp`, free by adding back, and always leave `sp` exactly where you found it.

```riscv title="the standard function skeleton"
func:
    addi sp, sp, -12        # prologue: room for 3 words
    sw   ra, 8(sp)          #   ra — because this function makes a call
    sw   s0, 4(sp)          #   every s register this function modifies
    sw   s1, 0(sp)

    mv   s0, a0             # keep the argument alive across the call
    jal  ra, helper         # after this, assume all t and a registers are garbage
    add  a0, a0, s0         # s0 is guaranteed intact; return value goes in a0

    lw   s1, 0(sp)          # epilogue: restore exactly what was saved
    lw   s0, 4(sp)
    lw   ra, 8(sp)
    addi sp, sp, 12
    ret
```

Step through a full nested call and watch `sp`, `ra`, and the saved registers:

<div data-widget="rv-sim" data-program="Call: sum_square with the stack"></div>

> [!danger] Calling-convention violations to spot (and avoid)
> - Using an `s` register without saving and restoring it.
> - Calling a function without having saved `ra` → the outer return address is lost; `ret` loops forever.
> - Reading a `t` or `a` register after a `jal` and expecting the old value.
> - Restoring `a0` in the epilogue (you just overwrote your own return value).
> - Unbalanced `sp`: the amounts subtracted and added differ, or an early-return path skips the epilogue.
> - Storing below `sp` (at negative offsets) without moving `sp` first.

### Recursion checklist

For `f(n)` that calls `f(n-1)`: anything needed **after** the recursive call — typically `n` and `ra` — must be on the stack or in a saved `s` register before the `jal`. Base case first, and make sure the base case's path also restores the stack if it has already allocated a frame.

## How this shows up on exams

- **Complete the function** under register or line limits: loops over arrays/strings, recursion, callbacks through `jalr`. The difficulty is tracking which values are *live across a call*.
- **Structs and arrays in assembly:** you derive offsets and strides from a C declaration.
- **Trace:** follow byte loads, shifts, and stack changes; say what a register holds at the end.
- **Find the calling-convention bugs** in a given function, or repair them with the minimum number of saves.
- **Unusual constraints:** implement one instruction using others, or use a newly defined instruction (ties into the datapath unit).

> [!tip] Before writing a single line
> 1. Assign every C variable a register. Values that must survive a call go in `s` registers (and you now owe a save/restore for each).
> 2. Decide whether the function makes any call. If yes, `ra` goes on the stack.
> 3. Count the saved words → that is your frame size.
> 4. Write the prologue and epilogue *first*, as a matching pair.

```quiz
Q: Which instruction returns from a function?
- [ ] `jal x0, ra`
- [x] `jalr x0, ra, 0`
- [ ] `jal ra, 0`
- [ ] `beq ra, x0, 0`
> `jalr` jumps to the address held in a register. `rd = x0` throws away the link. This is what the pseudo-instruction `ret` expands to.
---
Q: `t0` holds `0x000000F0`. After `sb t0, 0(sp)` and then `lb t1, 0(sp)`, what is in `t1`?
- [ ] `0x000000F0`
- [x] `0xFFFFFFF0`
- [ ] `0x0000000F`
- [ ] `0xF0000000`
> `lb` sign-extends. The byte `0xF0` has its top bit set, so the upper 24 bits become 1s. `lbu` would give `0x000000F0`.
---
Q: A function uses `s0`, `s1`, and `t0`, and calls another function. What is the minimum it must save in its prologue?
- [ ] `s0`, `s1`, `t0`
- [ ] `ra` only
- [x] `ra`, `s0`, `s1`
- [ ] `ra`, `s0`, `s1`, `t0`, `a0`
> `s` registers are callee-saved, so it must preserve them. It makes a call, so `ra` will be overwritten. `t0` is caller-saved: only saved (around the call) if its value is needed afterwards.
---
Q: `int32_t arr[]` starts at the address in `a0`, and `i` is in `t0`. Which sequence loads `arr[i]` into `t1`?
- [ ] `add t1, a0, t0` then `lw t1, 0(t1)`
- [x] `slli t1, t0, 2` then `add t1, a0, t1` then `lw t1, 0(t1)`
- [ ] `lw t1, t0(a0)`
- [ ] `slli t1, t0, 4` then `add t1, a0, t1` then `lw t1, 0(t1)`
> Elements are 4 bytes, so the byte offset is `i << 2`. The offset in a load must be a constant, not a register.
---
Q: Which C condition does `bge t0, t1, skip` guard, if the body follows immediately?
- [ ] `if (t0 >= t1)`
- [x] `if (t0 < t1)`
- [ ] `if (t0 > t1)`
- [ ] `if (t0 <= t1)`
> The branch **skips** the body when `t0 >= t1`, so the body runs when `t0 < t1`.
---
Q: What is the largest constant a single `addi` can add?
- [ ] 4095
- [ ] 1023
- [x] 2047
- [ ] 65535
> I-type immediates are 12-bit two's complement: $-2048 \ldots 2047$.
```

## Practice

| Skill | Start with | Then |
|---|---|---|
| Ordinary function completion (loops, helper calls) | FA23 MT Q4, FA24 MT Q4 | SP24 Final Q2 |
| Recursion and live values across calls | FA25 MT Q4, SU24 Final Q2 | SP25 Final Q2 |
| Callbacks / function pointers with register limits | — | SP26 Final Q3 |
| Structs and strides in assembly | — | FA24 Final Q2 |
| Tracing loads, shifts, and the stack | — | FA24 Final Q3 |
| Implementing instructions with other instructions | SP23 MT Q4 | FA23 Final Q8, FA25 Final Q10 |
