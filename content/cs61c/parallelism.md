---
title: Parallelism
Content Type: Topic Review
Course: CS61C
description: Amdahl's Law, SIMD intrinsics, OpenMP threads, data races, and cache coherence.
Last Updated: November 14, 2026
Status: Ready to review
priority: Very high for SIMD (on every recent final) and data races; Amdahl's Law is a reliable short question
sources: 11.1 Amdahl's Law, optimization; 11.2 Flynn's Taxonomy, SIMD; 11.3 MIMD, Thread-Level Parallelism, OpenMP; 11.4 Synchronization (data races, cache coherence, locks, atomics)
practice: SP26 Final Q8; FA25 Final Q7–Q8; SP25 Final Q6; FA24 Final Q8; SP24 Final Q7–Q8; FA23 Final Q5; SP23 Final Q3; SU24 Final Q8; FA25 Final Q1.9; SP26 Final Q1.6
---

Clock rates stopped climbing in the mid-2000s: deeper pipelines and higher frequencies ran into a **power wall**. Since then, performance has come from doing several things **at the same time** — across the lanes of a vector register (**data-level parallelism**) and across cores (**thread-level parallelism**). Both demand that software be written for them, and both have sharp edges.

> [!abstract] The whole topic in seven lines
> - **Amdahl's Law:** speedup $= \dfrac{1}{(1-p) + p/s}$. The serial part $(1-p)$ caps the speedup at $1/(1-p)$, no matter how many processors.
> - **Flynn's taxonomy:** SISD (ordinary CPU), **SIMD** (vector instructions, GPUs), MISD (unused), **MIMD** (multicore).
> - **SIMD:** one instruction operates on several values packed in a wide register. **Lanes = register width ÷ element width.**
> - Every SIMD loop has the same skeleton: **vector loop → reduce → scalar tail**.
> - **Threads** share memory (heap, globals) but have their own registers, PC and stack. OpenMP: `#pragma omp parallel` forks; `for` divides the iterations.
> - **Data race:** two threads touch the same location, at least one writes, with no ordering enforced. Fix with a **critical section**, a **reduction**, or private data.
> - Locks need **atomic** hardware support (`amoswap`, `lr`/`sc`). Careless locking → **deadlock**; careless data layout → **false sharing**.

## Amdahl's Law

> [!info] Amdahl's Law
> If a fraction $p$ of the original run time is sped up by a factor $s$ and the rest is untouched:
> $$
> \text{Speedup} = \frac{\text{time before}}{\text{time after}} = \frac{1}{(1 - p) + \dfrac{p}{s}}
> $$
> As $s \to \infty$, speedup $\to \dfrac{1}{1-p}$: the reciprocal of the **serial fraction**.

<div data-widget="amdahl"></div>

> [!example] Three standard uses
> **Forward:** one third of a program is made 2× faster → $1 / (\tfrac23 + \tfrac{1/3}{2}) = 1.2\times$.
> **Limit:** 95% parallel → at most $1/0.05 = 20\times$, even with a million cores.
> **Backward:** want 10× from 128 processors. Solve $\dfrac{1}{s_{\text{ser}} + (1 - s_{\text{ser}})/128} = 10$ → serial fraction $\approx 9\%$.

Details that matter:

- $p$ is a fraction of the **original time**, not of the code or the instruction count.
- If the problem gives **overhead** (thread creation, a final merge), add it to the denominator as extra time.
- "Make the common case fast": a huge speedup on a small fraction does almost nothing.

### Before parallelism: make the serial code fast

The compiler already does a lot (`-O2`, `-O3`): keeping variables in registers, **loop unrolling** (fewer branches), **function inlining** (no call overhead), strength reduction (shifts instead of multiplies). Cache-friendly access order and cache blocking often matter more than anything else. And measure first — premature optimization wastes effort on code that is not the bottleneck.

## Kinds of parallelism

Software is **sequential** or **concurrent**; hardware is **serial** or **parallel**. They are independent: an OS runs concurrent software on one core by time-sharing, and a plain loop is sequential software even on a 12-core laptop. "Parallelizing a program" means rewriting it so that parallel hardware actually speeds it up.

| Flynn's taxonomy | Single data stream | Multiple data streams |
|---|---|---|
| **Single instruction stream** | **SISD** — our single-cycle / pipelined RISC-V CPU | **SIMD** — one instruction applied to many data elements: Intel SSE/AVX, GPUs |
| **Multiple instruction streams** | MISD — essentially unused | **MIMD** — several processors running different instructions on different data: multicore, clusters |

## Data-level parallelism: SIMD

Intel processors have extra-wide registers and instructions that treat each as a pack of smaller values:

| Extension | Register width | Holds, for example |
|---|---|---|
| SSE | 128 bits (`__m128`, `__m128d`, `__m128i`) | 4 floats · 2 doubles · 4 `int32_t` · 16 bytes |
| AVX / AVX2 | 256 bits (`__m256`, `__m256d`, `__m256i`) | 8 floats · 4 doubles · 8 `int32_t` · 32 bytes |
| AVX-512 | 512 bits | 16 `int32_t` · 8 doubles |

$$
\text{lanes} = \frac{\text{register width}}{\text{element width}}
$$

Never assume "4". A 256-bit register holds **4** doubles but **32** bytes.

### Intrinsics

**Intrinsics** are C functions that each compile to one SIMD assembly instruction. The names follow a pattern:

`_mm<width>_<operation>_<element type>` — width omitted for 128-bit, `256` for AVX; `epi32` = packed 32-bit integers, `ps` = packed single floats, `pd` = packed doubles, `si128`/`si256` = the whole register as raw integer bits.

| Pseudocode (as used on exams) | Example intrinsic | Meaning |
|---|---|---|
| `vec_load(p)` | `_mm_loadu_si128((__m128i *) p)` | load 4 ints starting at `p` (`u` = no alignment required) |
| `vec_store(p, v)` | `_mm_storeu_si128((__m128i *) p, v)` | write the 4 lanes to memory at `p` |
| `vec_setnum(0)` | `_mm_setzero_si128()` | all lanes 0 |
| `vec_setnum(x)` | `_mm_set1_epi32(x)` | every lane = `x` |
| `vec_add(a, b)` | `_mm_add_epi32(a, b)` | lane-by-lane add |
| `vec_and(a, b)` | `_mm_and_si128(a, b)` | bitwise AND of the whole register |
| `vec_cmpgt(a, b)` | `_mm_cmpgt_epi32(a, b)` | per lane: **all 1s** (−1) if `a > b`, else 0 |

`_mm_load_*` (no `u`) requires the address to be aligned to the register size and faults otherwise; `loadu` always works but can be slower.

### The universal SIMD loop

<div data-widget="simd"></div>

```c title="sum an int array with SSE" hl=4,5,6,9,10,12
int sum_simd(int *arr, int n) {
    __m128i sum_vec = _mm_setzero_si128();
    int i;
    for (i = 0; i < n / 4 * 4; i += 4) {                    // 1. vector loop over FULL vectors only
        __m128i tmp = _mm_loadu_si128((__m128i *)(arr + i));
        sum_vec = _mm_add_epi32(sum_vec, tmp);
    }
    int t[4];
    _mm_storeu_si128((__m128i *) t, sum_vec);               // 2. reduce: lanes -> one scalar
    int sum = t[0] + t[1] + t[2] + t[3];

    for (; i < n; i++) sum += arr[i];                       // 3. tail: the n % 4 leftovers
    return sum;
}
```

- **Lane independence.** Each lane accumulates every 4th element. Lanes cannot see each other inside the loop, which is why the final reduction is ordinary scalar code.
- **You cannot index into a vector register.** To read a lane, store the register to an array first.
- **The tail.** If `n` is not a multiple of the lane count, the last elements need a scalar loop. Loading a full vector there would read out of bounds.

### Masks: `if` without branches

A vector comparison produces, in each lane, **all ones** (`0xFFFFFFFF`, i.e. −1) for true and **all zeros** for false. AND-ing with that mask keeps or erases a lane.

```c title="sum only the elements greater than a threshold"
__m128i thresh = _mm_set1_epi32(T);
...
    __m128i v    = _mm_loadu_si128((__m128i *)(arr + i));
    __m128i mask = _mm_cmpgt_epi32(v, thresh);      // lane = 0xFFFFFFFF where v > T
    __m128i keep = _mm_and_si128(v, mask);          // other lanes become 0
    sum_vec      = _mm_add_epi32(sum_vec, keep);
```

> [!warning] SIMD mistakes that cost points
> - Assuming 4 lanes instead of computing width ÷ element size.
> - Treating a true mask lane as `1`. It is **−1**: adding masks counts *negatively*; to count matches, subtract the mask or AND it with a vector of 1s first.
> - Off-by-one on comparisons: `cmpgt` is strict. For `>=`, compare against `T − 1` (integers) or swap operands.
> - Forgetting the tail, or starting it at the wrong index.
> - Reading a lane by casting the register instead of storing it to memory.
> - Using aligned `load`/`store` on unaligned addresses.

## Thread-level parallelism

| Term | Meaning |
|---|---|
| **Process** | a running program with its own address space |
| **Thread** | one stream of instructions inside a process. Own **registers, PC, stack**; **shares** heap and globals with sibling threads |
| **Software thread** | a thread the program created |
| **Hardware thread** | a place that can execute one: a core, or one of several per core with **hardware multithreading** (hyperthreading) |
| **Context switch** | the OS saves one thread's registers/PC and loads another's — on a timer, or when a thread blocks (I/O, page fault) |

More software threads than hardware threads is fine: the OS **time-multiplexes** them. So a multithreaded program runs (concurrently, not in parallel) even on one core. A **multicore** machine is a **shared-memory multiprocessor**: several cores, each with its own caches, all seeing one physical memory.

### OpenMP

OpenMP uses the **fork–join** model: the main thread runs alone, **forks** a team of threads at a parallel region, and they **join** back at its end. Compile with `-fopenmp`; a compiler that does not know the pragmas simply ignores them.

```c title="parallel region"
#pragma omp parallel
{
    int tid = omp_get_thread_num();          // private: declared inside the region
    printf("hello from %d of %d\n", tid, omp_get_num_threads());
}                                            // implicit join
```

| Variable | Shared or private? |
|---|---|
| declared **outside** the parallel region | **shared** (one copy; every thread reads/writes it) |
| heap memory, globals, `static` | **shared** |
| declared **inside** the region | **private** (one per thread, on that thread's stack) |
| the loop index of an `omp for` | private |
| listed in `private(x)` | private (uninitialized copy per thread) |

#### `parallel` is not `parallel for`

This is the distinction exams probe most. All five loops below "use OpenMP"; they do not do the same work.

```c title="five ways to (mis)parallelize a loop"
// 1. Every thread runs the WHOLE loop: n * num_threads iterations. Duplicated work.
#pragma omp parallel
{ for (int i = 0; i < n; i++) arr[i] = f(i); }

// 2. Manual split, interleaved: thread t does t, t+T, t+2T, ...   Correct; poor locality.
#pragma omp parallel
{ int t = omp_get_thread_num(), T = omp_get_num_threads();
  for (int i = t; i < n; i += T) arr[i] = f(i); }

// 3. Manual split, chunked: thread t does [t*n/T, (t+1)*n/T).     Correct; what OpenMP does for you.
#pragma omp parallel
{ int t = omp_get_thread_num(), T = omp_get_num_threads();
  for (int i = t * n / T; i < (t + 1) * n / T; i++) arr[i] = f(i); }

// 4. Work-sharing directive inside a region: same as 3.
#pragma omp parallel
{
  #pragma omp for
  for (int i = 0; i < n; i++) arr[i] = f(i);
}

// 5. Combined form: same as 3 and 4.
#pragma omp parallel for
for (int i = 0; i < n; i++) arr[i] = f(i);
```

Version 1 still gives the *right answer* here (each element is just assigned several times) — but it is slower than serial. With `sum += …` in the body it would give the wrong answer. Always separate **"is it correct?"** from **"is it faster?"**.

## Data races

> [!info] Definition
> Two memory accesses form a **data race** when they come from **different threads**, touch the **same location**, **at least one is a write**, and nothing forces an order between them. The result then depends on how the threads happen to be interleaved.

`x += 1` is not one step. It is load, add, store — and another thread can run between any two of them:

<div data-widget="race"></div>

With $n$ threads each doing one `x += 1` on a shared `x` starting at 0, the final value can be anything from **1** to **$n$**. (A *data race* is not a *data hazard*: hazards are a pipeline issue inside one core; races are about ordering between threads, and happen even on a single-cycle CPU.)

### Fixing a race

```c title="three correct ways to sum in parallel"
// A. Critical section: correct, but threads queue up for every single addition (slow).
#pragma omp parallel for
for (int i = 0; i < n; i++) {
    #pragma omp critical
    sum += arr[i];
}

// B. Private partial sums, combined once per thread: correct and fast.
#pragma omp parallel
{
    int local = 0;                           // private
    #pragma omp for
    for (int i = 0; i < n; i++) local += arr[i];
    #pragma omp critical
    sum += local;                            // one short critical section per thread
}

// C. Let OpenMP do B for you.
#pragma omp parallel for reduction(+:sum)
for (int i = 0; i < n; i++) sum += arr[i];
```

A **critical section** is code that only one thread may execute at a time. Keep it **as small as correctness allows**: everything inside runs serially (Amdahl again). But it must cover the **whole read-modify-write**. Protecting only the write, or protecting a check and its update with two *separate* critical sections ("if balance ≥ amount" … "balance −= amount"), still races.

> [!tip] Race-hunting checklist
> 1. List every variable **written** inside the parallel region.
> 2. For each: shared or private? (Where was it declared?)
> 3. Shared and written by more than one thread → race, unless each thread writes a **different element** (e.g. `arr[i]` with distinct `i`) or the access is in a critical section / reduction.
> 4. For min/max-outcome questions, find the interleaving where everyone loads before anyone stores (minimum) and the fully sequential one (maximum).

## Locks and atomic instructions

A **lock** gives one thread exclusive access: **acquire** (wait until free, then take it) … critical section … **release**.

The naive assembly lock fails for the same reason `x += 1` does — a gap between *testing* the lock (`lw`) and *setting* it (`sw`) where another thread can sneak in, so both believe they hold it. Hardware must make test-and-set **atomic**: appear to happen all at once.

| RISC-V support | How it works |
|---|---|
| **Atomic memory operation** `amoswap.w rd, rs2, (rs1)` | in one indivisible step: `rd = Mem[rs1]`, `Mem[rs1] = rs2` |
| **Load-reserved / store-conditional** `lr.w rd, (rs1)` then `sc.w rd, rs2, (rs1)` | `lr` reads and places a reservation; `sc` writes **only if** nothing else wrote that location since, and reports success (0) or failure (non-zero) in `rd`. Retry on failure |

```riscv title="spin lock with atomic swap (lock word at s0: 0 = free, 1 = held)"
acquire: li      t0, 1
try:     amoswap.w.aq t0, t0, (s0)     # t0 = old lock value; lock = 1, atomically
         bnez    t0, try               # old value was 1 -> someone else has it, spin
         # ... critical section ...
release: amoswap.w.rl x0, x0, (s0)     # lock = 0
```

### Deadlock

**Deadlock:** no thread can proceed because each is waiting for something another holds. The classic recipe is two locks taken in **opposite orders**:

| Thread 1 | Thread 2 |
|---|---|
| acquire A | acquire B |
| acquire B — *waits* | acquire A — *waits* |

Prevention: every thread acquires locks in the **same global order** (or use one lock, or avoid nesting). The dining-philosophers problem is the same situation with five forks.

## Caches and multiple cores

Each core has its own cache, so the same block can sit in several caches. If core 1 writes, core 2's copy is **stale**. **Cache coherence** protocols keep copies consistent: before a core writes, the other caches' copies of that block are **invalidated**; their next access is a new kind of miss, a **coherence miss**. (Typical implementation: caches *snoop* a shared bus; per-block states such as Modified / Shared / Invalid — details out of scope.)

> [!danger] False sharing
> Coherence works on whole **blocks**. If two threads write **different variables that live in the same cache block** — say `sum[0]` and `sum[1]` of a small per-thread array — every write invalidates the other core's copy, and the block ping-pongs between caches. The program is correct but can be slower than serial.
> Fix: give each thread a **local variable** (on its own stack) and write the shared array once at the end, or pad the entries so they fall in different blocks. Read-only sharing causes no invalidations and is harmless.

## Beyond shared memory

Not all parallel programs share memory. In **message passing** (clusters, the *manager–worker* pattern) processes own their data and exchange it with explicit **send** / **receive** calls. Typical reasoning: who has which value, who sends it to whom, and what happens while a blocking receive waits. A manager hands out independent tasks; workers return results; the manager must also tell workers when to stop. For dependent tasks, draw the **dependency graph** and schedule tasks only when their inputs are done.

## How this shows up on exams

- **SIMD code blanks:** fill in the vector loop, mask logic, reduction and tail using a provided table of vector functions, often one operation per line.
- **OpenMP comparisons:** for several versions of a loop — correct? how much work? faster than serial?
- **Race outcomes:** all possible values of a shared variable, or min/max; what must go in the critical section.
- **Deadlock / lock ordering;** check-then-update bugs.
- **Amdahl:** forward, limit, and solve-for-fraction versions; sometimes with overhead.
- **Performance explanations:** false sharing, critical-section frequency, why more threads stopped helping.

```quiz
Q: 80% of a program can be parallelized. What is the speedup on 4 cores, and the maximum possible speedup?
- [ ] 3.2× and 4×
- [x] 2.5× and 5×
- [ ] 4× and 5×
- [ ] 2.5× and unbounded
> $1 / (0.2 + 0.8/4) = 1 / 0.4 = 2.5$. Limit: $1 / 0.2 = 5$.
---
Q: How many `int8_t` elements fit in one AVX `__m256i` register?
- [ ] 4
- [ ] 8
- [ ] 16
- [x] 32
> Lanes = 256 ÷ 8 = 32.
---
Q: `mask = vec_cmpgt(v, zero)` on 4 lanes of 32-bit ints, where exactly 3 lanes of `v` are positive. Summing the four lanes of `mask` gives:
- [ ] 3
- [x] −3
- [ ] 1
- [ ] `0xFFFFFFFF`
> True lanes are all ones, which is −1 as a signed integer. Three of them sum to −3.
---
Q: With 4 threads, what does this compute?  `int sum = 0;`  `#pragma omp parallel`  `{ for (int i = 0; i < 100; i++) sum += 1; }`
- [ ] Always 100
- [ ] Always 400
- [x] Some value up to 400; the result is not deterministic
- [ ] It does not compile
> No `for` directive, so each of the 4 threads runs all 100 iterations (400 increments in total), and `sum` is shared with no synchronization: lost updates make the result anything up to 400.
---
Q: Two threads each execute `x = x + 1` once; a third executes `x = x * 2` once. `x` starts at 1 and is shared, with no synchronization. Which final value is **impossible**?
- [ ] 2
- [ ] 4
- [ ] 6
- [x] 8
> 6 = (1+1+1)·2, 4 = (1·2)+1+1 or (1+1)·2 with a lost update, 2 = many lost updates. Reaching 8 would need two doublings.
---
Q: Four threads each repeatedly write their own element of `int counts[4]`. The program is correct but slower than the serial version. The most likely cause:
- [ ] A data race on `counts`
- [ ] Deadlock
- [x] False sharing: the four elements are in one cache block
- [ ] Amdahl's Law limits it to 1×
> No two threads touch the same element, so there is no race. But all four ints share a 64-byte block, so every write invalidates the other cores' copies.
---
Q: Thread 1 runs `lock(A); lock(B);` and Thread 2 runs `lock(B); lock(A);`. What can happen?
- [ ] A data race on A
- [x] Deadlock: each holds one lock and waits forever for the other
- [ ] Nothing; locks prevent all problems
- [ ] False sharing
> Opposite acquisition orders create a cycle. Acquire locks in one global order.
```

## Practice

| Skill | Start with | Then |
|---|---|---|
| Amdahl's Law (forward, limit, with overhead) | SP25 Final Q1.9, FA25 Final Q1.9 | FA23 Final Q1.4, SP24 Final Q1.9, SP26 Final Q1.6 |
| SIMD with masks, reduction and tail | SP24 Final Q8, FA23 Final Q5 | FA25 Final Q8, SP25 Final Q6, FA24 Final Q8 |
| SIMD + OpenMP combined | SU24 Final Q8 | SP23 Final Q3, SP26 Final Q8 |
| Correctness vs. speed of OpenMP variants | SP24 Final Q7 | SP26 Final Q8.11–8.15 |
| Race outcomes, critical sections, deadlock | FA24 Final Q1.2, FA23 Final Q5.9–5.10 | FA25 Final Q7 |
| Message passing, task scheduling | SU24 Final Q7 | FA23 Final Q6, SP24 Final Q9, SP23 Final Q8 |
