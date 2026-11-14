---
title: Caches
Content Type: Topic Review
Course: CS61C
description: Locality, tag/index/offset, associativity, replacement, miss types, and AMAT.
Last Updated: November 14, 2026
Status: Ready to review
priority: Very high — every fall/spring final has caches, usually a substantial trace of a loop plus AMAT
sources: 10.0 IEC Prefixes; 10.1 Cache Performance (memory hierarchy, AMAT); 10.2 Cache Design (fully associative, direct-mapped, set-associative); 10.3 Cache Misses and Optimization (miss types, optimizations, blocking)
practice: SP26 Final Q6; FA25 Final Q5; FA24 Final Q7; SP24 Final Q5; FA23 Final Q4; SP23 Final Q4; SP25 Final Q1.4–1.5; SP25 MT Q5; SU24 Final Q10
---

Processors got fast much quicker than memory did (the "memory wall"). A **cache** is a small, fast memory holding **copies** of recently used data from the big, slow memory below it. It works because real programs are predictable.

> [!abstract] The whole topic in seven lines
> - **Temporal locality** (reuse soon) → keep recently used data. **Spatial locality** (neighbors soon) → move data in **blocks**.
> - An address splits into **Tag | Index | Offset**. $O = \log_2(\text{block size})$, $I = \log_2(\#\text{sets})$, $T = \text{address bits} - I - O$.
> - **#sets = #blocks ÷ associativity.** Direct-mapped: 1 way. Fully associative: 1 set (no index bits).
> - A **hit** needs a valid entry in the indexed set whose tag matches. Otherwise a **miss**: fetch the whole block, maybe **evict** one.
> - Replacement policy (**LRU**, FIFO, random) picks the victim; write policy (**write-back + dirty bit**, or write-through) keeps memory in sync.
> - Misses: **compulsory** (first touch), **capacity** (cache too small), **conflict** (too little associativity).
> - **AMAT = hit time + miss rate × miss penalty**, applied recursively for L2.

## The memory hierarchy

| Level | Typical size | Typical speed | Managed by |
|---|---|---|---|
| Registers | 32 words | < 1 cycle | compiler / programmer |
| L1 cache (the datapath's IMEM and DMEM) | tens–hundreds of KiB | ~1 cycle; miss rate 1–5% | hardware |
| L2 cache | hundreds of KiB – MiB | a few cycles; local miss rate 10–20% | hardware |
| Main memory (DRAM) | GiB | ~100s of cycles | operating system |
| Disk / SSD | hundreds of GiB + | millions of cycles | operating system |

Higher levels are smaller, faster, more expensive per byte, and closer to the processor. Each level holds a **subset (a copy)** of the level below. The goal is the *illusion* of a memory as large as the bottom level and as fast as the top.

> [!info] Principle of locality
> **Temporal:** if you use something now, you will probably use it again soon (loop counters, instructions in a loop). → Keep recently accessed blocks.
> **Spatial:** if you use something, you will probably use its neighbors soon (array elements, sequential instructions). → Bring in a whole **block** (cache line) of contiguous bytes at once.

## Vocabulary

| Term | Meaning |
|---|---|
| **Block / line** | the unit copied between memory and cache (e.g. 16 or 64 bytes) |
| **Tag** | the part of the address stored with a block to identify *which* block it is |
| **Valid bit** | 1 if the entry holds real data. All 0 when the cache is "cold" |
| **Dirty bit** | 1 if the block was modified in the cache and memory is stale |
| **Hit / miss** | the requested block is / is not in the cache |
| **Hit rate, miss rate** | fraction of accesses that hit / miss (they sum to 1) |
| **Hit time** | time to access the cache, including deciding hit-or-miss |
| **Miss penalty** | extra time to bring the block in from the level below |
| **Set** | the group of entries an address is allowed to live in |
| **Associativity ($N$-way)** | how many entries are in each set |

## Splitting the address: T / I / O

$$
\underbrace{\;\text{Tag}\;}_{T} \;\Big|\; \underbrace{\;\text{Index}\;}_{I} \;\Big|\; \underbrace{\;\text{Offset}\;}_{O}
$$

| Field | Bits | Answers |
|---|---|---|
| **Offset** | $O = \log_2(\text{block size in bytes})$ | which byte *within* the block |
| **Index** | $I = \log_2(\text{number of sets})$ | which set to look in |
| **Tag** | $T = A - I - O$ ($A$ = address width) | is the block in that set really mine? |

$$
\#\text{sets} = \frac{\text{cache size}}{\text{block size} \times \text{associativity}} = \frac{\#\text{blocks}}{N}
$$

> [!example] Worked T/I/O
> 32-bit addresses, 32 KiB cache, 64 B blocks, 4-way set-associative.
> $O = \log_2 64 = 6$. Blocks $= 2^{15}/2^{6} = 2^{9} = 512$. Sets $= 512/4 = 128$, so $I = 7$. $T = 32 - 7 - 6 = 19$.
> Per-entry overhead (write-back): 19 tag + 1 valid + 1 dirty = 21 bits on top of 512 data bits.

To split a hex address by hand: write it in binary, peel off $O$ bits from the right, then $I$ bits, and what remains is the tag.

## Three placements

| | Direct-mapped | $N$-way set-associative | Fully associative |
|---|---|---|---|
| A block can go in… | exactly **one** entry | any of the **$N$** entries of one set | **any** entry |
| Sets | #blocks | #blocks ÷ $N$ | 1 |
| Index bits | $\log_2(\#\text{blocks})$ | $\log_2(\#\text{sets})$ | **0** |
| Tag comparisons per access | 1 | $N$ (in parallel) | #blocks |
| Replacement policy needed? | no — only one candidate | yes, within the set | yes |
| Strength | simplest, fastest hit | the practical middle (L1 is often 4- or 8-way) | fewest misses |
| Weakness | **conflict misses** | more hardware than DM | expensive: comparator per entry, slower hit |

Direct-mapped and fully associative are just the two extremes of set-associative ($N = 1$ and $N = \#\text{blocks}$).

Experiment: change the associativity or policy and re-run the same trace.

<div data-widget="cache-sim" data-preset="Conflict ping-pong (direct-mapped)"></div>

### What happens on one access

1. Split the address into tag, index, offset.
2. Go to set `index`. Compare the tag against every **valid** entry in the set.
3. **Hit:** read (or write) the byte(s) at `offset`. Update LRU bookkeeping. For a write in a write-back cache, set the dirty bit.
4. **Miss:** choose an entry in the set — an invalid one if available, otherwise the replacement policy's victim. If the victim is dirty, write it back to memory. Load the **entire block** containing the address (block start = address with the offset bits zeroed), store the tag, set valid. Then do the read/write.

## Replacement policies

Only relevant when a set has more than one way and all are valid.

| Policy | Evicts | Notes |
|---|---|---|
| **LRU** — least recently used | the entry untouched for the longest | matches temporal locality; needs bookkeeping on **every access**, including hits |
| **FIFO** | the entry that was **loaded** earliest | cheaper; hits do **not** change the order |
| **Random** | any | surprisingly fine when temporal locality is low |
| MRU (exam variant) | the entry touched most recently | works against locality — exams use it precisely so you cannot go on autopilot |

> [!warning] LRU vs. FIFO
> The only difference is what a **hit** does: under LRU a hit makes the block "young" again; under FIFO it changes nothing. Keep an explicit ordering per set and update it after every access.

## Write policies

| | Write-through | Write-back |
|---|---|---|
| On a write hit | update cache **and** memory | update cache only; set **dirty** bit |
| Memory in sync? | always | no — the cache may hold the only current copy |
| On eviction | nothing extra | if dirty, write the block back to memory first |
| Cost | every write is slow | multiple writes to a block cost one memory write; read misses may trigger a write-back |

> [!danger] The cache can be newer than memory
> With write-back, a question that shows you both the cache contents and a memory dump is asking: *where is the current value?* If the block is in the cache **and valid**, the cache's copy is the truth — memory may be stale. Check the cache first.

## Classifying misses

| Type | Cause | Reduced by |
|---|---|---|
| **Compulsory** | first-ever access to the block (cold start) | larger blocks (one miss brings in more neighbors) |
| **Capacity** | the cache cannot hold all the blocks the program is using; the block was evicted and is needed again | a larger cache |
| **Conflict** | the block was evicted because too many active blocks map to the same set, although the cache was not full | higher associativity |

**The classification procedure:** run the trace on an *infinite* fully associative cache — those misses are compulsory. Run it on a fully associative LRU cache of the *real size* — the additional misses are capacity. Whatever additional misses the real cache has are conflict.

- A fully associative cache has **no conflict misses**.
- In this course you only have to label a specific miss as **compulsory** or **non-compulsory**, but you need the definitions of all three.

## Cache performance: AMAT

$$
\text{AMAT} = \text{Hit Time} + \text{Miss Rate} \times \text{Miss Penalty}
$$

Every access pays the hit time; misses additionally pay the penalty. With a second level, the L1 miss penalty is *itself* an AMAT:

$$
\text{AMAT} = \text{HT}_{L1} + \text{MR}_{L1} \times \big(\text{HT}_{L2} + \text{MR}_{L2} \times \text{MP}_{L2}\big)
$$

where $\text{MR}_{L2}$ is the **local** miss rate: of the accesses that reach L2, the fraction that miss. The **global** L2 miss rate is $\text{MR}_{L1} \times \text{MR}_{L2}$.

<div data-widget="amat"></div>

> [!example] Lecture numbers
> L1 only: $1 + 0.05 \times 200 = 11$ cycles.
> Add L2 (hit 5, local miss rate 15%): $1 + 0.05 \times (5 + 0.15 \times 200) = 1 + 0.05 \times 35 = 2.75$ cycles — **4× faster**.
> L2's local miss rate is higher than L1's because L2 only sees the "hard" accesses that already missed in L1.

### Design tradeoffs

| Change | Hit time | Miss penalty | Miss rate | Why |
|---|---|---|---|---|
| Larger block size | | worse | better, then worse | more spatial locality per miss; but fewer blocks → more conflicts, and more bytes to fetch |
| Larger cache | worse | | better | fewer capacity misses; bigger structures are slower |
| Higher associativity | worse | | better | fewer conflict misses; more comparators and a mux |
| Multilevel caches | | better | | a miss in L1 usually finds the data in L2 |

Every knob trades one AMAT term for another; there is no free change.

## Analyzing loops

Most exam cache questions are a loop over arrays. Work in **blocks**, not bytes.

1. Compute T/I/O and the number of sets.
2. Note the **element size** and **stride** → how many elements per block, and how many bytes each iteration advances.
3. List **every access in order** for one iteration. `a[i] = a[i] + b[i]` is read `a[i]`, read `b[i]`, write `a[i]` — three accesses.
4. Map each array's start address to a set. Arrays whose addresses differ by a multiple of (#sets × block size) land in the **same sets** → possible ping-pong in a direct-mapped cache.
5. Find the **pattern** (e.g. miss, hit, hit, hit per block), then count: first pass (cold) separately from later passes (warm).

> [!example] Stride pattern
> `int32_t a[1024]` (4-byte elements), 16-byte blocks, cache large enough, cold start.
> **Stride 1:** each block holds 4 elements → miss, hit, hit, hit → hit rate **75%**.
> **Stride 4** (every 4th element): every access touches a new block → hit rate **0%**.
> **Second pass over the same array:** 100% hits *if* the whole array (4096 B) fits in the cache; otherwise the first blocks were evicted and the pattern repeats.

> [!example] Two arrays that collide
> Direct-mapped, 4 KiB cache, 16 B blocks; `int32_t` arrays `a` at `0x10000` and `b` at `0x20000`; the loop does `sum += a[i] * b[i]`.
> The addresses differ by a multiple of 4 KiB, so `a[i]` and `b[i]` always map to the **same set** with different tags. Each access evicts the other's block: **0% hit rate**. Making the cache 2-way gives miss, miss, then 6 hits per block pair: **75%**.

### Cache blocking (a software fix)

When data is too big for the cache, **reorder the computation** so that each chunk of data is fully used while it is in the cache. In matrix multiply, the naive loop walks one matrix by columns (a new block almost every access) and revisits data long after it was evicted. Processing the matrices in small **tiles** that fit in the cache, or changing the loop order, turns those misses into hits. Same result, same instruction count, far fewer misses.

## How this shows up on exams

- **Sizing:** T/I/O for a given cache; total bits including metadata; how a parameter change moves the fields.
- **Trace:** hit/miss for a list of addresses, with a specific replacement policy; final cache contents.
- **Loops:** hit rate for the first iteration and in steady state; effect of changing associativity, block size, stride, or loop order.
- **Reads and writes:** dirty bits, write-backs, and "what value is read?" from a cache + memory snapshot (often with little-endian data).
- **AMAT:** one or two levels; solve for an unknown miss rate or penalty; compare two designs.
- **Explain:** why did associativity help (or not)? Which miss type is this?

> [!tip] Trace hygiene
> Draw one row per set with its ways. For every access write **(tag, index)**, mark H or M, and update both the contents and the recency order *before* moving on. Recounting from scratch is how points are lost.

```quiz
Q: 16-bit addresses, 1 KiB direct-mapped cache, 16-byte blocks. What are T / I / O?
- [ ] 4 / 8 / 4
- [x] 6 / 6 / 4
- [ ] 8 / 4 / 4
- [ ] 6 / 4 / 6
> $O = \log_2 16 = 4$. Blocks $= 1024/16 = 64$ = sets (direct-mapped), so $I = 6$. $T = 16 - 6 - 4 = 6$.
---
Q: The same cache is made 4-way set-associative (same total size and block size). What changes?
- [ ] Offset grows by 2 bits
- [x] Index shrinks by 2 bits and the tag grows by 2 bits
- [ ] Tag shrinks by 2 bits
- [ ] Nothing changes
> Sets $= 64/4 = 16$ → $I = 4$. The offset depends only on block size. $T = 16 - 4 - 4 = 8$.
---
Q: A fully associative cache with 2 blocks uses **LRU**. Block accesses: A, B, A, C, B. How many hits?
- [ ] 0
- [x] 1
- [ ] 2
- [ ] 3
> A miss, B miss, A **hit** (now B is least recent), C miss → evicts B, B miss. One hit. Under FIFO the answer differs: C would evict A.
---
Q: Which kind of miss can a fully associative cache **never** have?
- [ ] Compulsory
- [ ] Capacity
- [x] Conflict
- [ ] It can have all three
> Conflict misses come from blocks competing for the same set while other entries are free. With one set, any block can go anywhere.
---
Q: L1: hit time 2 cycles, miss rate 10%. L2: hit time 10 cycles, local miss rate 20%. Memory: 100 cycles. AMAT?
- [ ] 4 cycles
- [x] 5 cycles
- [ ] 12 cycles
- [ ] 14 cycles
> $2 + 0.1 \times (10 + 0.2 \times 100) = 2 + 0.1 \times 30 = 5$.
---
Q: `int32_t a[]` is read sequentially (stride 1) with a cold cache and 32-byte blocks. What is the hit rate?
- [ ] 50%
- [ ] 75%
- [x] 87.5%
- [ ] 96.9%
> 32-byte blocks hold 8 four-byte ints: 1 miss followed by 7 hits → $7/8$.
---
Q: In a write-back cache, a block is loaded, written twice, read once, then evicted. How many writes to main memory occur?
- [ ] 0
- [x] 1
- [ ] 2
- [ ] 3
> The writes only set the dirty bit. One write-back happens at eviction. Write-through would have cost two.
```

## Practice

| Skill | Start with | Then |
|---|---|---|
| T/I/O, organization, short AMAT | SP25 Final Q1.4–1.5 | SP25 MT Q5 |
| Loop traces with LRU; associativity comparison | SP23 Final Q4 | SP24 Final Q5, SP26 Final Q6 |
| Non-LRU policies (MRU, FIFO) | FA23 Final Q4, SU24 Final Q10 | FA24 Final Q7 |
| Dirty data, cache vs. memory contents, endianness | — | FA25 Final Q5 |
| Multilevel AMAT and design tradeoffs | — | SP26 Final Q6, FA24 Final Q7 |
