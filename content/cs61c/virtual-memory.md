---
title: Virtual Memory
Content Type: Topic Review
Course: CS61C
description: Pages, page tables, address translation, the TLB, and the full memory hierarchy.
Last Updated: November 14, 2026
Status: Ready to review
priority: High — a dedicated block on every fall/spring final: translation traces, sizing, or PTE manipulation in C/assembly
sources: 12.1 Intro to Virtual Memory (translation, memory manager); 12.2 Page tables, the TLB, Full Memory Hierarchy
practice: SP26 Final Q7; FA25 Final Q6; SP25 Final Q7; FA24 Final Q9; SP24 Final Q6; FA23 Final Q7; SP23 Final Q5; SU24 Final Q9
---

Caches make memory look **fast**. Virtual memory makes it look **large and private**: every process believes it has the whole address space to itself, while the operating system and hardware quietly map those addresses onto a limited, shared physical memory — with disk as overflow.

> [!abstract] The whole topic in seven lines
> - Programs use **virtual addresses**; memory is indexed by **physical addresses**. Both are divided into fixed-size **pages**.
> - Address = **page number | page offset**. Offset bits $= \log_2(\text{page size})$ and are **never translated**.
> - The **page table** (one per process, one entry per virtual page) maps VPN → PPN and holds status bits (valid, dirty, permissions).
> - Invalid entry → **page fault**: the OS loads the page from disk (≈ millions of cycles), updates the table, retries.
> - The **TLB** is a small cache of recent translations. **TLB hit:** no page-table access. **TLB miss:** walk the page table.
> - **TLB miss ≠ page fault.** A page fault means the page is not in memory at all.
> - Order of events (PIPT): **translate first** (TLB → page table → maybe disk), **then** access the data (cache → memory).

## Why virtual memory

1. **More memory than you physically have.** A 32-bit program can address 4 GiB even if the machine has 1 GiB; pages that don't fit live on disk and are brought in on demand.
2. **Protection and isolation.** Two processes can both use virtual address `0x400` and never see each other's data, because each has its own mapping. A bug in one process cannot corrupt another — or the OS.

Main memory acts as a **"cache" for disk**; the vocabulary is different but the ideas are the same.

| | Caches | Virtual memory |
|---|---|---|
| Sits between | cache ↔ main memory | main memory ↔ disk |
| Unit | block / line (~64 B) | **page** (~4–16 KiB) |
| Miss is called | cache miss | **page fault** |
| Placement | DM, $N$-way, or fully associative | "fully associative": a page can go in **any** frame (the OS decides) |
| Replacement | LRU, FIFO, random | LRU (approximated), FIFO, random |
| Write policy | write-through or write-back | **always write-back** (dirty bit) |
| Managed by | hardware | OS + hardware (the "memory manager") |
| Miss penalty | tens–hundreds of cycles | **millions** of cycles |

Because a page fault is so catastrophically slow, every design choice aims to **minimize page faults**, even at the cost of complex software.

## Addresses and pages

$$
\underbrace{\text{Virtual Page Number (VPN)}}_{\text{VA bits} - \text{offset bits}} \;\Big|\; \underbrace{\text{Page Offset}}_{\log_2(\text{page size})}
\quad\longrightarrow\quad
\underbrace{\text{Physical Page Number (PPN)}}_{\text{PA bits} - \text{offset bits}} \;\Big|\; \underbrace{\text{Page Offset}}_{\text{same bits}}
$$

| Quantity | Formula |
|---|---|
| Offset bits | $\log_2(\text{page size})$ |
| VPN bits | VA bits − offset bits |
| PPN bits | PA bits − offset bits |
| Number of virtual pages | $2^{\text{VPN bits}}$ |
| Number of physical pages (frames) | $2^{\text{PPN bits}}$ = physical memory ÷ page size |
| Page table entries (single-level, this course) | **one per virtual page** = $2^{\text{VPN bits}}$ |
| Page table size | number of entries × PTE size |

> [!example] Sizing
> 32-bit virtual addresses, 16 KiB pages, 4-byte page table entries.
> Offset $= \log_2(2^{14}) = 14$ bits. VPN $= 32 - 14 = 18$ bits → $2^{18}$ virtual pages.
> Page table $= 2^{18} \times 4$ B $= 2^{20}$ B $=$ **1 MiB** — that is 64 pages just for the table, per process, which is why it lives in main memory and why real systems use multi-level tables.

> [!warning] Three sizes people conflate
> **Page size** (e.g. 4 KiB) ≠ **PTE size** (e.g. 4 B) ≠ **page table size** (entries × PTE size). And the virtual address space has nothing to do with how much RAM is installed: VA and PA can have different widths.

## The page table

A **page table** is a lookup table — conceptually one big array indexed by VPN — holding a **page table entry (PTE)** for every virtual page of **one process**.

| PTE field | Meaning |
|---|---|
| **Valid** | 1 = the page is in physical memory and the PPN is meaningful. 0 = not in memory (on disk, or never allocated) → page fault |
| **PPN** | which physical page holds it |
| **Dirty** | the page has been written since it was loaded → must be written to disk before its frame is reused |
| **Permission bits** (read / write / execute) | e.g. write-protect: a store to a read-only page raises an exception. Enables safe sharing |
| (Reference/use bit) | set on access; lets the OS approximate LRU |

- **One page table per process**, stored in **protected** memory that user code cannot touch.
- The CPU's **page table base register** (SATP in RISC-V) holds the physical address of the *current* process's table. A process **context switch** changes this register.
- A page table is **not a cache**: it holds *translations*, not data, and it has an entry for *every* virtual page, not a subset.

> [!info] Where is a PTE?
> $$
> \text{address of PTE} = \text{page table base} + \text{VPN} \times \text{PTE size}
> $$
> Recent exams ask you to compute this in C or RISC-V, then mask out the valid bit and shift out the PPN. Identify the bit positions of each field *before* writing code.

## Address translation

1. Split the virtual address into **VPN** and **offset**.
2. Look up the PTE for that VPN.
3. **Valid?** Take its PPN. **Not valid?** Page fault (below), then retry.
4. Physical address $=$ **PPN concatenated with the unchanged offset**.
5. Access memory at the physical address.

> [!example] Translate `0xFFFFF004` with 4 KiB pages
> Offset = low 12 bits = `0x004`. VPN = upper 20 bits = `0xFFFFF`.
> The PTE for VPN `0xFFFFF` is valid with PPN `0x1`. Physical address = `0x1` ‖ `0x004` = **`0x1004`**.
> Hex shortcut: 4 KiB pages → the offset is exactly the last **3 hex digits**.

### Page faults and demand paging

When the PTE is invalid, the hardware raises a **page fault exception** and control transfers to the OS's handler, which:

1. picks a free physical page — or, if memory is full, chooses a victim page to **replace** (writing it to disk first if it is **dirty**) and marks the victim's PTE invalid;
2. reads the requested page from disk into that frame;
3. updates the PTE (PPN, valid = 1);
4. meanwhile **context-switches** to another process so the CPU isn't idle for the millions of cycles the disk takes;
5. later, **re-executes** the faulting instruction, which now succeeds.

**Demand paging:** a process starts with *no* pages in memory (all PTEs invalid); pages are loaded only when first touched. So the first access to each page is a page fault.

## The TLB

Every load, store and instruction fetch needs a translation. Reading the page table from memory each time (**a page table walk**) would double the cost of every access. The **translation lookaside buffer** is a small, fast cache of recent **VPN → PPN** mappings.

| Property | Typical |
|---|---|
| Contents | VPN (as the tag), PPN, status bits |
| Size | 32–128 entries |
| Organization | **fully associative** in this course (the whole VPN is the tag) |
| Replacement | FIFO or random (LRU on some exams — read the problem) |
| **TLB reach** | #entries × page size — how much memory is covered without a miss |
| Number | one per core, shared by whatever process is running |

Because the TLB belongs to the core but page tables belong to processes, a **context switch** must either **flush** (invalidate) the TLB or tag entries with a process ID.

### The three cases

| Case | What happens | Cost |
|---|---|---|
| **TLB hit** | PPN comes straight from the TLB | ~1 cycle |
| **TLB miss, page in memory** | walk the page table (a memory access), find a valid PTE, copy it into the TLB | ~hundreds of cycles |
| **TLB miss, page fault** | walk the page table, PTE invalid → OS loads from disk, updates PTE, then TLB | ~millions of cycles |

<div data-widget="vm" data-preset="TLB miss ≠ page fault"></div>

> [!danger] TLB miss ≠ page fault
> A TLB miss only means the *translation* is not cached; the page may well be in memory. A page fault means the *page itself* is not in memory. Every page fault is preceded by a TLB miss, but most TLB misses are not page faults. And when a page is evicted from memory, its TLB entry must be invalidated too.

## The full memory hierarchy

In this course caches are **physically indexed, physically tagged (PIPT)**: the cache is looked up with the **physical** address, so translation comes first.

1. **Translate:** TLB → (on miss) page table → (on fault) disk.
2. **Access data:** split the *physical* address into tag / index / offset → cache → (on miss) main memory.

Note the two different offsets: the **page offset** (e.g. 12 bits) splits VPN from offset; the **block offset** (e.g. 6 bits) is part of the cache's T/I/O split of the physical address.

| TLB | Page table | Cache | Possible? |
|---|---|---|---|
| hit | (not consulted; page is in memory) | hit | ✔ best case |
| hit | (page is in memory) | miss | ✔ translation cached, data not |
| miss | valid | hit | ✔ translation not cached, data is |
| miss | valid | miss | ✔ |
| miss | **page fault** | miss | ✔ worst case |
| miss | **page fault** | hit | ✘ the cache only holds copies of data that is in memory |
| hit | **page fault** | — | ✘ a TLB entry exists only for pages that are in memory |

### AMAT with paging

Treat a page fault as one more (enormous) miss penalty. If memory access costs ~100 cycles and a page fault ~$10^6$ cycles, then a page-fault rate of just 0.01% adds $0.0001 \times 10^6 = 100$ cycles to the *average* memory access. Page faults must be extraordinarily rare for the hierarchy to work — which is why memory is "fully associative" with careful replacement.

## Protection

- **Separate page tables** map each process's private pages to **disjoint** physical pages.
- **Shared** pages (libraries, shared data) are simply mapped by more than one page table, with permission bits limiting what each process may do.
- Page tables and the OS live in memory only **supervisor mode** can access. A user program cannot edit any page table, including its own.
- **Exceptions** (caused by the running instruction: page fault, illegal instruction, protection violation) and **interrupts** (external: timer, I/O) both transfer control to the OS. The timer interrupt is what lets the OS context-switch between processes.

> [!note]- Hierarchical (multi-level) page tables — beyond the single-level model
> A flat table needs an entry for every virtual page even if most are unused. A **multi-level** table splits the VPN into several fields: the first indexes a top-level table whose entries point to second-level tables, and so on; whole second-level tables that would be all-invalid are simply never allocated. Translation becomes a true "walk" with one memory access per level (which makes the TLB even more important). The base-plus-index arithmetic at each level is the same as above. This is out of scope for the lecture notes' model but appears on some summer exams.

## How this shows up on exams

- **Sizing:** offset / VPN / PPN bits; number of PTEs; page table size; TLB reach; how changing the page size moves everything.
- **Translation traces:** a list of virtual addresses with a given TLB and page table; mark TLB hit / miss / page fault, give physical addresses, update the TLB (replacement policy!) and allocate frames on faults.
- **State rules:** does each access start from a fresh state, or do earlier accesses change the TLB and memory? Write the rule down — problems differ.
- **Code:** compute a PTE's address; test the valid bit; extract the PPN; build the physical address — in C or RISC-V.
- **Concepts:** which combinations of TLB / page table / cache outcomes are possible; what a context switch must do; why a TLB miss need not fault.

> [!tip] Translation routine
> 1. Offset bits from the page size → how many **hex digits** (or bits) to peel off.
> 2. VPN → check TLB **by VPN**. Hit: done.
> 3. Miss → page table at index VPN. Valid: take the PPN, insert into the TLB (evict per policy).
> 4. Invalid → page fault: allocate the next free frame (or evict), mark valid, insert into the TLB.
> 5. PA = PPN ‖ offset. Keep the offset **unchanged**.

```quiz
Q: 32-bit virtual addresses, 4 KiB pages, 1 GiB of physical memory. How many bits are the VPN and the PPN?
- [ ] VPN 20, PPN 20
- [x] VPN 20, PPN 18
- [ ] VPN 12, PPN 18
- [ ] VPN 22, PPN 20
> Offset = 12 bits. VPN = 32 − 12 = 20. Physical addresses are 30 bits (1 GiB), so PPN = 30 − 12 = 18.
---
Q: With the same parameters and 4-byte PTEs, how large is one process's (single-level) page table?
- [ ] 4 KiB
- [ ] 1 MiB
- [x] 4 MiB
- [ ] 4 GiB
> $2^{20}$ entries × 4 B = $2^{22}$ B = 4 MiB.
---
Q: Which sequence of events is **impossible**?
- [ ] TLB miss, then a valid page table entry
- [ ] TLB hit, then a cache miss
- [x] TLB hit, then a page fault
- [ ] TLB miss, then a page fault
> The TLB only caches translations of pages that are in memory (entries are invalidated when a page is evicted). A hit therefore implies no page fault.
---
Q: A TLB has 64 entries and pages are 4 KiB. What is the TLB reach?
- [ ] 64 KiB
- [x] 256 KiB
- [ ] 4 MiB
- [ ] 16 KiB
> 64 × 4 KiB = 256 KiB of virtual memory can be translated without a TLB miss.
---
Q: 4 KiB pages. Virtual address `0x00403ABC` maps to PPN `0x1F`. What is the physical address?
- [ ] `0x1F403ABC`
- [x] `0x1FABC`
- [ ] `0x1F3ABC`
- [ ] `0x00403A1F`
> The offset is the low 12 bits, `0xABC`, and is not translated. PA = `0x1F` ‖ `0xABC` = `0x1FABC`.
---
Q: On a process context switch, what must change so that the new process's addresses translate correctly?
- [ ] The cache must be emptied
- [x] The page table base register is updated, and stale TLB entries are flushed (or distinguished by process ID)
- [ ] Every page of the old process is written to disk
- [ ] The page size
> Each process has its own page table. The TLB holds translations for the old process, so they must not be used by the new one.
---
Q: Doubling the page size (same virtual and physical address widths) does what?
- [ ] Adds one VPN bit and doubles the page table
- [x] Adds one offset bit, removes one VPN bit, and halves the number of page table entries
- [ ] Changes only the PPN
- [ ] Has no effect on the page table
> Offset grows by one bit; VPN and PPN each shrink by one. Half as many virtual pages means half as many PTEs — and each TLB entry now covers twice as much memory.
```

## Practice

| Skill | Start with | Then |
|---|---|---|
| Translation with a TLB, hits vs. faults | FA23 Final Q7 | SP24 Final Q6, SP23 Final Q5 |
| Sizing, packed PTEs, page table size | FA24 Final Q9 | FA25 Final Q6 |
| PTE lookups in RISC-V / C | SP25 Final Q7 | SP26 Final Q7 |
| TLB, page residency and cache interactions | — | SP26 Final Q7 |
| Multi-level page tables (stretch) | SU24 Final Q9 | SU23 Final Q5 |
