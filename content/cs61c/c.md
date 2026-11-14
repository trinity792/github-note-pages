---
title: C
Content Type: Topic Review
Course: CS61C
description: Pointers, arrays, strings, structs, the memory layout, malloc/free, and generics.
Last Updated: November 14, 2026
Status: Ready to review
priority: High — C questions are about memory: sizes, pointer levels, ownership, and where data lives
sources: 2.1 C Basics; 2.2 Pointers, Arrays, Strings; 2.3 Memory Management; 2.4 Odds and Ends; 2.5 Generics, Function Pointers
practice: SP26 Final Q2; SP25 Final Q3; FA25 Final Q3; SP23 Final Q7; SP24 Final Q1.11–1.14; FA25 MT Q1; FA24 MT Q2–Q3; FA23 MT Q2; SP23 MT Q2
---

C gives you direct access to memory and almost no protection. Nearly every exam question in this unit reduces to four questions: **how many bytes is it, where does it live, who points to it, and who frees it?**

> [!abstract] The whole topic in six lines
> - C is **compiled**, statically typed, and **pass-by-value**. To let a function change something, pass its **address**.
> - A **pointer** is a variable holding an address. `&x` = address of `x`; `*p` = the thing `p` points to.
> - **Pointer arithmetic scales by `sizeof` the pointed-to type.** `a[i]` *is* `*(a + i)`.
> - Arrays are not pointers, but they **decay** to a pointer to their first element when passed to a function — and lose their size.
> - Memory has four regions: **stack** (locals), **heap** (`malloc`), **data** (globals, string literals), **text** (code).
> - Every `malloc`/`calloc`/`realloc` needs exactly one matching `free`. Never use memory after its lifetime ends.

## C basics worth re-reading

- **Compiled, not interpreted.** Source → compiler → assembler → linker → executable (details in the [CALL note](#/n/cs61c/call)). Fast at run time; errors split into *compile-time* and *run-time*.
- **Typed variables.** A type tells the compiler how many bytes to reserve and how to interpret them.
- **Truth:** `0` and `NULL` are false; **everything else is true**.
- **Uninitialized variables hold garbage** — whatever bits were already there. This produces "Heisenbugs" that change from run to run.
- **No objects.** Group data with `struct`; name types with `typedef`; constants with `#define` or `enum`.

### Sizes

`sizeof` is a compile-time operator that returns a size **in bytes** (as a `size_t`). The C standard only guarantees *minimum* sizes, so portable code uses the fixed-width types.

| Type | Bytes | Notes |
|---|---|---|
| `char` | 1 | by definition; `sizeof(char) == 1` always |
| `short` | ≥ 2 | usually 2 |
| `int` | ≥ 2 | 4 on every machine you will see in this course |
| `long` | ≥ 4 | 4 or 8 depending on the system |
| `int8_t` … `int64_t`, `uint8_t` … `uint64_t` | 1, 2, 4, 8 | **exact** width, from `<stdint.h>`. Prefer these |
| any pointer, `size_t` | 4 on a 32-bit system, 8 on a 64-bit system | the size of an address, regardless of what it points to |

```c title="struct, typedef and the arrow operator"
typedef struct Node {
    char *data;
    struct Node *next;     // must say "struct Node" here: the typedef name does not exist yet
} node_t;

node_t n;
node_t *p = &n;
n.data = "hi";             // dot: you have the struct itself
p->next = NULL;            // arrow: you have a pointer to it.  p->next  ==  (*p).next
```

## Pointers

Memory is one huge byte-addressable array. An **address** is an index into it; a **pointer** is a variable whose value is an address.

```c title="pointer syntax"
int x = 3;
int *p;        // p is a pointer to int. Right now it holds garbage!
p = &x;        // & "address of": p now holds x's address
int y = *p;    // * "dereference": follow the pointer, read 3
*p = 5;        // dereference on the left: write through the pointer. x is now 5
```

Three different things, always: the **pointer's own address** (`&p`), the **pointer's value** (`p`, an address), and the **value it points at** (`*p`).

> [!info] C is pass-by-value
> A function receives **copies** of its arguments. Changing a parameter never changes the caller's variable. To modify a caller's `int`, take an `int *`. To modify a caller's *pointer* (for example, to update the head of a list), take a pointer-to-pointer — a **handle**, `int **`.

```c title="handles"
void bad(int *q)   { q = malloc(4); }        // changes only the local copy q: caller sees nothing, and we leaked
void good(int **h) { *h = malloc(4); }       // writes through the handle into the caller's pointer

int *p = NULL;
bad(p);       // p is still NULL
good(&p);     // p now points to heap memory
```

### Pointer arithmetic

Adding an integer to a pointer moves it by **that many elements**, not that many bytes:

$$
\texttt{p + n} \;\Rightarrow\; \text{address}(p) + n \times \texttt{sizeof(*p)}
$$

So for `int32_t *p`, `p + 1` is 4 bytes later; for `char *p`, it is 1 byte later. Subtracting two pointers gives the number of *elements* between them. Casting a pointer changes the stride **and** how the bytes are interpreted — it does not move or convert the data.

> [!danger] Pointer bugs C will not catch
> - **Dereferencing garbage or `NULL`:** an uninitialized pointer points somewhere random. Dereferencing `NULL` crashes (segfault) — that is the *good* outcome.
> - **Dangling pointer:** returning the address of a local variable. The stack frame is gone when the function returns.
> - **Out-of-bounds access:** C does not check array bounds; you silently read or corrupt a neighbor.

## Arrays

```c
int a[4];              // 4 ints, contiguous, uninitialized. sizeof(a) == 16
int b[] = {1, 2, 3};   // size inferred: 3
```

- `a[i]` is defined as `*(a + i)`. Indexing *is* pointer arithmetic plus a dereference.
- An array name acts as the address of its first element, but **an array is not a pointer variable**: `a = p` and `a++` are illegal, and `&a` is the address of the whole block (same number as `a`, different type).
- `sizeof(a)` is the size of the **whole array** in bytes — but only where `a` is actually declared as an array.

> [!warning] Arrays decay in function calls
> `void f(int arr[])` is exactly `void f(int *arr)`. Inside `f`, `sizeof(arr)` is the size of a **pointer** (4 or 8), not the array. This is why C functions take a separate length argument. An array does not know its own length.

| Expression (where `int a[4]` is declared, 64-bit) | Value |
|---|---|
| `sizeof(a)` | 16 |
| `sizeof(a) / sizeof(a[0])` | 4 — the element count |
| `sizeof(&a[0])`, or `sizeof(arr)` after decay | 8 |
| `*(a + 2)` | same as `a[2]` |

## Strings

A C string is a `char` array ending in the **null terminator** `'\0'` (the byte `0x00`). There is no length field; functions walk until they find the zero byte.

- `strlen(s)` counts characters **before** the `'\0'`. Storage needs **`strlen(s) + 1`** bytes.
- `char s[] = "hi";` makes a writable 3-byte array on the stack. `char *s = "hi";` points at a **string literal** in read-only static data — writing to it is undefined behavior.
- `sizeof` and `strlen` answer different questions: for `char buf[10] = "hi";`, `sizeof(buf)` is 10, `strlen(buf)` is 2.

| `<string.h>` | What it does | Trap |
|---|---|---|
| `strlen(s)` | length, excluding `'\0'` | walks forever if there is no terminator |
| `strcpy(dst, src)` | copies including `'\0'` | `dst` must have room; no bounds check |
| `strncpy(dst, src, n)` | copies at most `n` bytes | may **not** terminate `dst` |
| `strcmp(a, b)` | 0 if equal, else <0 or >0 | `==` on strings compares *addresses* |
| `memcpy(dst, src, n)` | copies `n` **bytes** | regions must not overlap (use `memmove`) |

## Where things live: the memory layout

<div data-widget="memory-map"></div>

| Region | Holds | Managed by | Lifetime |
|---|---|---|---|
| **Stack** | local variables, parameters, return addresses | automatically; one **frame** per call, LIFO; grows **down** | until the function returns |
| **Heap** | `malloc`/`calloc`/`realloc` blocks | **you**; grows **up** | until you `free` it |
| **Data** (static) | globals, `static` variables, string literals | fixed at load time | whole program |
| **Text** (code) | machine instructions | fixed at load time, read-only | whole program |

The stack is fast and automatic but temporary. Returning a pointer to a local is the classic error: the frame is popped, and the next call overwrites it. If data must **outlive the function that creates it**, it belongs on the heap.

## The heap

```c title="the four functions"
void *malloc(size_t n);                 // n uninitialized bytes, or NULL on failure
void *calloc(size_t count, size_t sz);  // count*sz bytes, all zero
void *realloc(void *p, size_t n);       // resize; MAY MOVE the block. Returns the new address
void  free(void *p);                    // release a block that came from the three above
```

Idioms to write without thinking:

```c
int *arr = malloc(n * sizeof(int));          // n ints. Use sizeof, never a hard-coded 4
char *copy = malloc(strlen(s) + 1);          // +1 for '\0'
strcpy(copy, s);
node_t *node = malloc(sizeof(node_t));       // sizeof the STRUCT, not sizeof(node_t *)

arr = realloc(arr, 2 * n * sizeof(int));     // must use the returned pointer; the old one may be invalid
free(arr);
```

### When heap memory goes bad

| Bug | What happened | Symptom |
|---|---|---|
| **Memory leak** | lost the last pointer to a block without freeing it | memory use grows; no crash |
| **Use after free** | read/wrote through a pointer after `free` | garbage, or corrupts a later allocation |
| **Double free** | `free` twice on the same block | corrupts the allocator; may crash much later |
| **Freeing non-heap memory** | `free(&local)`, `free(p + 1)`, `free("literal")` | undefined; must free exactly the pointer `malloc` returned |
| **Ignoring `realloc`'s return** | kept using the old pointer after the block moved | use after free |
| **Buffer overflow** | wrote past the end (forgot the `+1`, wrong `sizeof`) | corrupts neighbors |

> [!tip] Ownership: draw it
> For any allocation question, sketch boxes for each block and arrows for each pointer, then ask of every block: *which pointer owns it, and who frees it?* The three layouts exams mix up:
> - an array **embedded** in a struct (`char name[6];`) — part of the struct, never freed separately;
> - a struct field that **points to its own allocation** (`char *name;`) — free the inner block **before** the struct;
> - several pointers **sharing** one backing block — free it once, through its owner.
>
> Free in the reverse order of allocation: contents first, container last.

> [!note]- How an allocator works (bonus, from K&R 8.7)
> The heap is managed as a **free list**: each free block has a header with its size and a pointer to the next free block (a circular linked list). `malloc` searches the list for a block that is big enough — **first fit** (take the first that works; fast), **next fit** (resume where the last search stopped), or **best fit** (smallest block that works; tightest but leaves tiny slivers). `free` puts the block back and **coalesces** it with adjacent free blocks. **Fragmentation** is when plenty of bytes are free but no single run is large enough. `malloc` is a real function call with a search inside — far slower than a stack allocation.

## Endianness and alignment

A **word** is the machine's natural unit (4 bytes on RV32). A multi-byte value spans consecutive byte addresses, and **endianness** decides the order:

- **Little-endian** (RISC-V, x86): the **least** significant byte is at the **lowest** address.
- **Big-endian** (network order): the **most** significant byte is at the lowest address.

<div data-widget="memview" data-values="0x00434241, 0x00004645"></div>

> [!example] Why `strlen` of an integer array is an exam favorite
> With `uint32_t a[] = {0x00434241, 0x00004645}` on a little-endian machine, memory in address order is `41 42 43 00 45 46 00 00`. So `strlen((char *)a)` is **3** (it stops at the zero byte *inside* the first integer), and `strlen((char *)(a + 1))` is **2**. Note `a + 1` moves 4 bytes, but `(char *)a + 1` moves 1.

### Struct alignment and padding

Hardware reads a value fastest when its address is a multiple of its size, so compilers insert **padding**. The model used on exams:

1. each field starts at an offset that is a multiple of **its own (element) size**;
2. the struct's total size is rounded up to a multiple of its **largest** field's alignment.

<div data-widget="struct-layout"></div>

Arrays inside structs align to their **element** type: `char name[6]` needs no alignment at all, which is why `node_t` above has only 2 bytes of padding. (Real layouts are compiler-specific; check with `sizeof` or a debugger.)

## Linked lists: the canonical pointer exercise

```c title="add_to_front — every line is a memory decision" hl=3,4,5
void add_to_front(node_t **head, char *data) {
    node_t *node = malloc(sizeof(node_t));        // the node itself, on the heap
    node->data = malloc(strlen(data) + 1);        // its own copy of the string (+1!)
    strcpy(node->data, data);
    node->next = *head;                           // new node points at the old first node
    *head = node;                                 // handle: update the caller's head pointer
}
```

- Why a handle (`node_t **head`)? Because the function must change **the caller's** `head`.
- Why copy the string? The caller's buffer might be a stack array that disappears.
- Freeing a list: save `next` **before** freeing the node, and free `node->data` before `node`.

## Generics and function pointers

A `void *` is a pointer with **no type**: it can hold any address, but it cannot be dereferenced and has no stride. Generic code treats memory as raw bytes and takes the element size as a parameter.

```c title="generic swap"
void swap(void *a, void *b, size_t nbytes) {
    char temp[nbytes];
    memcpy(temp, a, nbytes);
    memcpy(a, b, nbytes);
    memcpy(b, temp, nbytes);
}

// element i of a generic array:  cast to char* so arithmetic is in bytes
void *elem = (char *)base + i * elem_size;
```

- `memcpy(dst, src, n)` copies `n` bytes; `memmove` does the same but is safe when regions overlap.
- Getting `nbytes` wrong "Frankensteins" two halves of different values together — generics trade type safety for reuse.

**Function pointers** let you pass behavior as an argument (map, filter, comparators):

```c title="function pointers"
int add_one(int x) { return x + 1; }

int (*fn)(int) = add_one;      // read inside-out: fn is a pointer to a function (int) -> int
int y = fn(3);                 // call through it: 4

void map(int *arr, size_t n, int (*f)(int)) {
    for (size_t i = 0; i < n; i++) arr[i] = f(arr[i]);
}

// qsort comparators receive POINTERS TO ELEMENTS
int cmp_int(const void *a, const void *b) { return *(int *)a - *(int *)b; }
qsort(arr, n, sizeof(int), cmp_int);
```

> [!warning] `qsort` on an array of strings
> The elements are `char *`, so the comparator receives `char **` disguised as `const void *`. You need `strcmp(*(char **)a, *(char **)b)`, not `strcmp(a, b)`.

## How this shows up on exams

- **Fill-in-the-blank C under constraints:** allocate and resize an array of strings, split a string, build a tree or list, free a nested structure. Sizes and pointer levels are the whole question.
- **Where is it?** Classify a pointer variable versus the storage it points to (stack/heap/data/text).
- **Valid or invalid memory access; leak or no leak** — a program can free everything and still read invalid memory.
- **C mixed with machine code:** extract instruction fields with shifts and masks, or reason about struct layout from assembly offsets.

> [!tip] Code-blank routine
> 1. Write the **type** of every variable and blank (`char **`? `char *`? `char`?).
> 2. For each `malloc`, name the element type and count: `count * sizeof(element)`; strings get `+ 1`.
> 3. Decide who the caller is and whether it needs a **handle**.
> 4. Trace one tiny example (length 0 and length 1) through your answer.

```quiz
Q: On a 64-bit system, `int32_t arr[10];` is passed to `void f(int32_t *p)`. Inside `f`, what is `sizeof(p)`?
- [ ] 40
- [ ] 10
- [x] 8
- [ ] 4
> The array decayed to a pointer. `sizeof` a pointer on a 64-bit system is 8, no matter what it points to.
---
Q: `int32_t *p` holds address `0x1000`. What address is `p + 3`?
- [ ] `0x1003`
- [x] `0x100C`
- [ ] `0x1018`
- [ ] `0x1004`
> Pointer arithmetic scales by `sizeof(int32_t) = 4`: $\texttt{0x1000} + 3 \times 4 = \texttt{0x100C}$.
---
Q: `char *s = malloc(strlen("cs61c"));  strcpy(s, "cs61c");` What is wrong?
- [ ] Nothing
- [ ] `malloc` needs a cast
- [x] The buffer is one byte too small for the null terminator
- [ ] String literals cannot be copied
> `strlen` is 5 but `strcpy` writes 6 bytes including `'\0'`: a heap buffer overflow. Allocate `strlen(...) + 1`.
---
Q: Which line creates a **dangling pointer**?
- [ ] `int *p = malloc(sizeof(int));`
- [x] `int *f(void) { int x = 5; return &x; }`
- [ ] `char *s = "hello";`
- [ ] `int *p = NULL;`
> `x` lives in `f`'s stack frame, which is reclaimed when `f` returns. The returned address points at dead storage.
---
Q: On a 64-bit system, what is `sizeof` of `struct { char c; int64_t x; char d; }`?
- [ ] 10
- [ ] 16
- [x] 24
- [ ] 32
> `c` at 0, 7 bytes padding, `x` at 8–15, `d` at 16, then 7 bytes of tail padding to reach a multiple of 8. Reordering to `x, c, d` gives 16.
---
Q: After `p = realloc(p, 100);` succeeds, which is guaranteed?
- [ ] `p` has the same address as before
- [x] The first bytes of the old block were copied, and the old address must not be used
- [ ] The new bytes are zeroed
- [ ] The old block still exists until `free`
> `realloc` may move the block. It copies the old contents, frees the old block, and leaves any new bytes uninitialized.
```

## Practice

| Skill | Start with | Then |
|---|---|---|
| Struct size, embedded vs. pointed-to storage, recursive free | FA25 MT Q1 | SP25 Final Q3 |
| Arrays of strings, `realloc`, terminators | FA24 MT Q2 | SP26 Final Q2 |
| Shared backing storage, output parameters (`int ***`) | FA23 MT Q2, SP23 MT Q2 | SP23 Final Q7 |
| Stack / heap / data / text classification | SP24 Final Q1.11–1.14 | SP24 MT Q5.8–5.14 |
| Bit fields and masks in C | FA24 MT Q3 | FA25 Final Q3 |
| Allocator internals (stretch) | — | SU25 Final Q2 |
