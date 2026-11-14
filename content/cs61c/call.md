---
title: CALL
Content Type: Topic Review
Course: CS61C
description: Compiler, assembler, linker, loader — who does what, and when symbols get resolved.
Last Updated: November 14, 2026
Status: Ready to review
priority: Medium — a few short "which stage?" questions on most exams
sources: 6 CALL (overview, assembler and object file, linker, example, interpretation vs. translation)
practice: SP24 Final Q1.5–1.7; SP25 Final Q1.3; FA25 Final Q1.4–1.5; SP26 Final Q4.6; FA24 MT Q1.8–1.9; FA23 MT Q1.6–1.8; SP23 MT Q1.2–1.4
---

**CALL** = **C**ompiler → **A**ssembler → **L**inker → **L**oader: the four steps between a `.c` file and a running process. (Not to be confused with the *calling convention*.) Exam questions here are almost always "**which stage does X?**" or "**which stage can resolve this address, and why not an earlier one?**"

> [!abstract] The whole topic in five lines
> - **Compiler:** one `.c` → one `.s`. High-level language to assembly (may include pseudo-instructions).
> - **Assembler:** one `.s` → one `.o`. Removes pseudo-instructions, produces machine code, **resolves PC-relative labels within the file** (two passes), and leaves a **symbol table** and **relocation table** for what it cannot resolve.
> - **Linker:** many `.o` (+ libraries) → one executable. Lays out text and data, **resolves absolute addresses and external references**.
> - **Loader:** executable on disk → process in memory. Part of the OS.
> - The key idea: **an address can only be filled in by the first stage that knows it.**

## The pipeline

<div data-widget="call-flow"></div>

| Stage | Input → Output | Main jobs | Typical errors caught |
|---|---|---|---|
| **Compiler** (`gcc -S`) | `foo.c` → `foo.s` | preprocess (`#include`, `#define`), parse, optimize, generate assembly | syntax and type errors |
| **Assembler** (`gcc -c`) | `foo.s` → `foo.o` | expand pseudo-instructions; encode instructions; build symbol + relocation tables | unknown instruction, bad operand |
| **Linker** (`gcc -o`) | `*.o`, `lib*.a` → `a.out` | merge segments; assign final addresses; patch relocations | **undefined reference**, duplicate symbol |
| **Loader** (OS) | `a.out` → running process | create address space; copy text/data; set up stack and registers; jump to start | — |

Why split it up? **Separate compilation.** Change one file and only that file is recompiled and reassembled; the linker re-stitches. Libraries ship pre-compiled.

## Compiler

Takes a single high-level source file and emits assembly for it. The output is still text and still uses **labels** for every function and variable, and it may use pseudo-instructions (`mv`, `li`, `la`, `call`, `ret`).

> [!note]- Compilation vs. interpretation (bonus)
> An **interpreter** executes a program in its source language directly (Python). A **translator/compiler** converts it to a lower-level language first (C → machine code). Interpreting is simpler, more portable and gives better error messages; translating is much faster at run time. Java sits in between (compile to bytecode, then interpret/JIT). Simulators like Venus *interpret* RISC-V.

## Assembler

1. **Replace pseudo-instructions** with real ones (`mv` → `addi`, `li` → `addi` or `lui`+`addi`, `j` → `jal x0`, …). This must happen first because it changes how many instructions there are — and therefore every address.
2. **Pass 1:** walk the code and record the position of every label in the **symbol table**.
3. **Pass 2:** generate machine code, using the symbol table to compute PC-relative offsets.

> [!info] Why two passes?
> **Forward references.** A branch to a label that appears *later* in the file cannot be encoded until the assembler knows where that label is. Pass 1 finds every label; pass 2 can then encode every branch.

### What the assembler can and cannot finish

| Reference | Example | Resolved by | Why |
|---|---|---|---|
| PC-relative, same file | `beq … loop`, `jal ra, helper` (defined in this file) | **Assembler** | the *distance* between two instructions in one file never changes, wherever the file ends up |
| External function | `jal ra, printf` | **Linker** | the function lives in another object file |
| Static data (absolute address) | `la t0, array` → `lui` + `addi` | **Linker** | the data segment's final position depends on all the other object files |

### The object file

| Section | Contents |
|---|---|
| **Header** | sizes and positions of the other sections |
| **Text segment** | machine code |
| **Data segment** | binary representation of static data |
| **Symbol table** | labels and static data **defined in this file** that others (or the debugger) can reference |
| **Relocation table** | the to-do list: instructions whose addresses must be **patched later** by the linker |
| **Debugging info** | mapping back to source lines |

> [!tip] Symbol table vs. relocation table
> **Symbol table** = "here is what I *have*" (my labels and their positions).
> **Relocation table** = "here is what I *need*" (the lines of my code that mention an address I could not compute).

## Linker

1. Take the **text** segment from every `.o` and put them together.
2. Take the **data** segments, put them together, and place them after the text.
3. **Resolve references:** walk every relocation table entry; look the symbol up in the combined symbol tables (then in libraries); now that all final addresses are known, **edit the instruction's immediate bits**.

Which instructions get edited?

- **J-type to external labels** — `jal` to a function in another file.
- **Absolute-address builders** — `lui`/`addi` (or `auipc`/`addi`, `auipc`/`jalr`) pairs produced by `la` or far calls.
- **Loads/stores of static data.**
- **Not** B-type branches and not jumps within a file: they are PC-relative and were finished by the assembler.

### Static vs. dynamic linking

| | Statically linked | Dynamically linked (DLL / `.so`) |
|---|---|---|
| Library code | copied into the executable at link time | linked in at **load/run time** |
| Executable size | large, self-contained | small |
| Memory | every program has its own copy | programs can **share** one copy |
| Updating a library | must re-link every program | replace one file, everything benefits |
| Cost | — | extra work at run time; more complexity; "works on my machine" problems |

## Loader

The loader is part of the operating system. When you run a program it:

1. reads the executable's header to find the sizes of the text and data segments;
2. creates a new **address space** big enough for text, data, heap and stack;
3. copies instructions and data from disk into memory;
4. copies the program's arguments onto the **stack**;
5. initializes registers (most importantly `sp`);
6. jumps to a start-up routine that moves the arguments into `a0`/`a1`, calls `main`, and makes the `exit` system call when `main` returns.

## How this shows up on exams

- "Which CALL stage …?" — expands pseudo-instructions, resolves `printf`, produces the relocation table, catches an undefined symbol, copies arguments to the stack.
- "After which stage is the address of *this* label / instruction known?"
- "How many passes, and why?" "What is in the symbol table of this file?"
- Pseudo-instruction expansion inside a bigger problem (how many real instructions is this?).

> [!warning] Things people mix up
> - The **assembler** resolves branches, not the linker — *unless* the target is in another file.
> - `jal` to a label in the **same** file: assembler. `jal` to another file: linker.
> - The compiler outputs **assembly** (text), not machine code. Machine code first appears in the `.o`.
> - "Undefined reference" is a **linker** error; a missing semicolon is a **compiler** error.
> - Expanding pseudo-instructions changes addresses — it must be done **before** computing any offset.

```quiz
Q: Which stage replaces `li t0, 0x12345678` with `lui` + `addi`?
- [ ] Compiler
- [x] Assembler
- [ ] Linker
- [ ] Loader
> Pseudo-instruction expansion is the assembler's first job.
---
Q: File `a.s` contains `beq t0, t1, done` where `done` is a label later in `a.s`. When is the branch's immediate determined?
- [ ] By the compiler
- [x] By the assembler, in its second pass
- [ ] By the linker
- [ ] By the loader
> It is PC-relative and both instructions are in the same file, so their distance is fixed. The forward reference is why a second pass is needed.
---
Q: Why can't the assembler fill in the address used by `la a0, global_array`?
- [ ] Because `la` is a pseudo-instruction
- [ ] Because arrays are stored on the heap
- [x] Because the final location of the data segment depends on the other object files
- [ ] Because the address is PC-relative
> It is an **absolute** address. Only the linker, which lays out all segments, knows it.
---
Q: A program is split into `main.c` and `util.c`. You edit only `util.c`. What must be redone?
- [ ] Compile, assemble and link everything
- [x] Compile and assemble `util.c`, then link
- [ ] Only link
- [ ] Only load
> Separate compilation: `main.o` is still valid. Only the changed file is re-translated; the linker always re-runs.
---
Q: Which is **not** in an object file?
- [ ] Symbol table
- [ ] Relocation table
- [ ] Text segment
- [x] The stack
> The stack exists only in a running process; the loader creates it.
---
Q: Two programs use the same dynamically linked library. Compared to static linking:
- [ ] Each executable is larger
- [x] Disk and memory use are lower, but there is some run-time overhead
- [ ] The library cannot be updated without recompiling
- [ ] Linking happens entirely in the compiler
> One shared copy of the library; linking is deferred to load/run time.
```

## Practice

| Skill | Start with | Then |
|---|---|---|
| Stage responsibilities | SP23 MT Q1.2–1.4, FA23 MT Q1.6–1.8 | SP24 Final Q1.5–1.7, FA25 Final Q1.4–1.5 |
| What the assembler vs. linker resolves | FA24 MT Q1.8–1.9 | SP25 Final Q1.3 |
| Pseudo-instruction expansion in context | — | SP26 Final Q4.6 |
