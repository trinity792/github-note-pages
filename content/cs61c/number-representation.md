---
title: Number Representation
Content Type: Topic Review
Course: CS61C
description: Bits, bases, and the five integer encodings — plus overflow, extension, shifts, and byte order.
Last Updated: November 14, 2026
Status: Ready to review
priority: Low–medium on its own, but it is hidden inside C, RISC-V, floating point and cache questions
sources: 1 Number Representation; 2.4 C Odds and Ends (bitwise ops); 2.6 IEC Prefixes
practice: SP24 Final Q1.1–1.2; SP25 Final Q1.1–1.2; FA25 Final Q1.1–1.2; SP26 Final Q1.1–1.2; FA24 Final Q3; FA24 MT Q1.1–1.2; SP23 MT Q1.8–1.11
---

A bit pattern has no meaning on its own. **Width + encoding + context** decide whether `0xD2` is 210, −46, a character, or part of an instruction. Every question in this topic is really asking: *how many bits, and how are we reading them?*

> [!abstract] The whole topic in five lines
> - $N$ bits give $2^N$ patterns. To tell $k$ things apart you need $\lceil \log_2 k \rceil$ bits.
> - Hex is shorthand for binary: one hex digit = 4 bits, two hex digits = 1 byte.
> - **Unsigned** and **two's complement** are the encodings that matter (they are what C and RISC-V use). Sign-magnitude, ones' complement and bias exist to explain *why*.
> - Two's complement: the MSB has weight $-2^{N-1}$. Negate by **flipping every bit and adding 1**.
> - Hardware adds unsigned and two's complement numbers with the **same adder**. Only the overflow test differs.

## Bits can represent anything

Analog quantities are continuous; computers store **digital** data, a finite list of symbols. Anything you can itemize you can digitize: characters (ASCII), colors, instructions, logical values, numbers.

| Term | Size | Note |
|---|---|---|
| bit | 1 binary digit | 0 or 1 |
| nibble | 4 bits | exactly one hex digit |
| byte | 8 bits | two hex digits; the unit of memory addressing |
| word | 32 bits in RV32 | the "natural" size of a register |

> [!info] Counting rule
> With $N$ bits you can represent **at most $2^N$ things**. Going the other way, $k$ distinct things need $\lceil \log_2 k \rceil$ bits.
> An index into 300 items needs 9 bits ($2^8 = 256 < 300 \le 512 = 2^9$).

### Powers of two and IEC prefixes

You will do this arithmetic constantly in caches and virtual memory, so make it automatic.

| Prefix | Value | | Prefix | Value |
|---|---|---|---|---|
| Ki (kibi) | $2^{10}$ | | Ti (tebi) | $2^{40}$ |
| Mi (mebi) | $2^{20}$ | | Pi (pebi) | $2^{50}$ |
| Gi (gibi) | $2^{30}$ | | Ei (exbi) | $2^{60}$ |

> [!tip] Reading $2^{XY}$ at a glance
> Split the exponent into tens and ones. The **tens digit picks the prefix** (1 → Ki, 2 → Mi, 3 → Gi, 4 → Ti) and the **ones digit is a small power of two** ($2^0$…$2^9$ = 1, 2, 4, 8, 16, 32, 64, 128, 256, 512).
> $2^{34} = 2^4 \cdot 2^{30} = 16$ Gi. $\;$ 512 KiB $= 2^9 \cdot 2^{10} = 2^{19}$ bytes. Uppercase **B** is bytes, lowercase **b** is bits.

## Bases: binary, decimal, hex

A numeral is just a way of *writing* a number. In base $b$ with digits $d_i$:

$$
\text{value} = \sum_{i} d_i \cdot b^{\,i}
$$

| Hex | Bin | Hex | Bin | Hex | Bin | Hex | Bin |
|---|---|---|---|---|---|---|---|
| 0 | 0000 | 4 | 0100 | 8 | 1000 | C | 1100 |
| 1 | 0001 | 5 | 0101 | 9 | 1001 | D | 1101 |
| 2 | 0010 | 6 | 0110 | A | 1010 | E | 1110 |
| 3 | 0011 | 7 | 0111 | B | 1011 | F | 1111 |

**Conversion recipes**

1. **Binary → decimal:** add the powers of two where the bit is 1.
2. **Decimal → binary/hex:** repeatedly subtract the largest power that fits (or repeatedly divide by the base and read remainders bottom-up).
3. **Binary ↔ hex:** group bits in fours **from the right**; expand each hex digit to exactly four bits. Keep leading zeros when a width is given.

> [!example] Worked conversions
> $1011\,0110_2 = 128 + 32 + 16 + 4 + 2 = 182 =$ `0xB6`.
> $2101_3 = 2\cdot27 + 1\cdot9 + 0\cdot3 + 1 = 64 =$ `0x40` — any base works the same way.

## Integer encodings

Lecture walks through five ways to map $N$-bit patterns to integers. Architects judge each one by how simple it makes the **hardware**: can one adder handle everything, is there one zero, does counting up work like an odometer?

| Encoding | How to decode an $N$-bit pattern | Range | Zeros | Verdict |
|---|---|---|---|---|
| **Unsigned** | plain binary value $u$ | $0 \ldots 2^N-1$ | 1 | used everywhere (addresses, sizes) |
| **Sign-magnitude** | MSB is the sign, the rest is the magnitude | $-(2^{N-1}-1) \ldots 2^{N-1}-1$ | 2 | incrementing goes the wrong way for negatives; needs special adder. Survives only as the *sign bit of floats* |
| **Ones' complement** | negative = flip every bit of the positive | $-(2^{N-1}-1) \ldots 2^{N-1}-1$ | 2 | still two zeros; addition needs an end-around carry |
| **Two's complement** | MSB has weight $-2^{N-1}$ | $-2^{N-1} \ldots 2^{N-1}-1$ | 1 | **the standard.** Same adder as unsigned |
| **Bias** | value $= u - \text{bias}$ | $-\text{bias} \ldots 2^N-1-\text{bias}$ | 1 | keeps ordering; used for the *exponent of floats* |

<div data-widget="bits" data-bits="8" data-value="0xD2"></div>

### Two's complement, properly

> [!info] Definition — $N$-bit two's complement
> $$
> x = -d_{N-1}\cdot 2^{N-1} + \sum_{i=0}^{N-2} d_i \cdot 2^{i}
> $$
> Every bit keeps its usual weight **except the MSB, which is negative**. Equivalently: read the pattern as unsigned $u$; if the MSB is 1 the value is $u - 2^N$.

Facts that fall out of the definition:

- **Range is lopsided:** one more negative number than positive. In 8 bits, $-128 \ldots 127$.
- **Landmarks:** `000…0` is 0, `111…1` is **−1**, `100…0` is the most negative, `011…1` is the most positive.
- **Negation:** flip all bits, add 1 (works in both directions). Because $x + \overline{x} = 111\ldots1 = -1$, so $-x = \overline{x} + 1$.
- **The MSB still tells you the sign**, even though it is not a separate sign bit.
- **The most negative number has no positive partner.** Negating `0x80` in 8 bits gives `0x80` again.

> [!example] Encode −46 in 8 bits
> $46 =$ `0010 1110` → flip → `1101 0001` → add 1 → `1101 0010` = `0xD2`.
> Check: $-128 + 64 + 16 + 2 = -46$. Or $210 - 256 = -46$.

### Bias encoding

Bias shifts the unsigned number line down so that it covers negatives: **stored bits $=$ value $+$ bias**, **value $=$ stored bits $-$ bias**. The all-zero pattern is the most negative value, the all-one pattern the most positive, so unsigned comparison of the bits still orders the values correctly. IEEE 754 uses bias $2^{N-1}-1$ for exponents (127 for an 8-bit field).

> [!warning] Always write the bias equation first
> Exams like non-standard biases. Write `value = bits − bias` (or whatever the problem defines) before plugging in. A sign error here poisons the rest of the question.

## Overflow

**Overflow** means the true result of an operation does not fit in the available bits. The hardware keeps the low $N$ bits regardless, so arithmetic is really arithmetic mod $2^N$ (the odometer rolling over).

| Reading the bits as… | Addition overflows when… | Quick test |
|---|---|---|
| Unsigned | the true sum exceeds $2^N - 1$ | there is a **carry out of the MSB** |
| Two's complement | the true sum is outside $[-2^{N-1},\, 2^{N-1}-1]$ | both operands have the **same sign** and the result has the **other sign** |

Adding a positive and a negative two's complement number can **never** overflow.

<div data-widget="addsub" data-bits="8"></div>

> [!danger] Carry-out is not signed overflow
> `0xF0 + 0x20` produces a carry out, but as signed numbers it is $-16 + 32 = 16$, which fits.
> `0x7A + 0x0D` has no carry out, but as signed numbers $122 + 13 = 135 > 127$: overflow.
> Decide which interpretation the question wants **before** deciding whether overflow happened.

## Changing width: extension and truncation

| Operation | Rule | Preserves |
|---|---|---|
| **Zero-extend** | pad the left with 0s | the unsigned value |
| **Sign-extend** | pad the left with copies of the old MSB | the two's complement value |
| **Truncate** | keep only the low bits | the value only if it still fits |

`0xD2` (8 bits) zero-extends to `0x00D2` (210) but sign-extends to `0xFFD2` (−46). This is exactly the difference between RISC-V `lbu` and `lb`, and it is why immediates in RISC-V are sign-extended. It can change **program behavior**, not just a printed number (FA24 Final Q3 is built on this).

## Shifts and bitwise operators

These treat a number as a row of bits. In C: `&` AND, `|` OR, `^` XOR, `~` NOT, `<<` left shift, `>>` right shift.

| Shift | Fills with | Arithmetic meaning |
|---|---|---|
| Left `<<` by $k$ | zeros on the right | multiply by $2^k$ (mod $2^N$) |
| **Logical** right `>>` by $k$ | zeros on the left | unsigned divide by $2^k$ |
| **Arithmetic** right `>>` by $k$ | copies of the sign bit | signed divide by $2^k$, **rounding toward $-\infty$** |

> [!warning] Arithmetic shift is not C division
> `-7 >> 1` is −4 (rounds down), but `-7 / 2` is −3 (truncates toward zero). And repeatedly arithmetic-shifting a negative number never reaches 0 — it sticks at `111…1` (−1). A loop of the form `while (x) x >>= 1;` on a signed negative value never terminates.

**Mask recipes** (assume `uint32_t x`):

```c title="bit tricks"
(x >> k) & 1            // read bit k
x | (1u << k)           // set bit k
x & ~(1u << k)          // clear bit k
x ^ (1u << k)           // toggle bit k
(x >> lo) & ((1u << w) - 1)   // extract a w-bit field starting at bit lo
x & (x - 1)             // clear the lowest set bit (x is a power of 2 iff this is 0 and x != 0)
```

`&&`, `||`, `!` are *logical* operators that produce 0 or 1; `&`, `|`, `~` work bit by bit. `6 & 3` is 2 but `6 && 3` is 1. Always parenthesize: `(x & mask) == 0`, because `==` binds tighter than `&`.

## Byte order in one paragraph

A multi-byte value occupies several consecutive addresses. **Little-endian** (RISC-V, x86) puts the **least significant byte at the lowest address**; big-endian does the opposite. Endianness reorders *bytes inside one value* — never bits inside a byte, never elements of an array. The full treatment, with an interactive byte viewer, is in the [C note](#/n/cs61c/c/endianness-and-alignment).

## How this shows up on exams

- **Short opening questions:** convert a value, give a range, decide if an 8-bit signed result overflows, compare the same bits under different encodings.
- **Representation → program behavior:** a signed versus unsigned load, an arithmetic shift in a loop, `strlen` over the bytes of an integer array, a pointer cast that changes the stride.
- **Inside bigger problems:** extracting instruction fields, computing tag/index/offset, splitting a virtual address. All are masks and shifts.

> [!tip] A procedure that prevents most lost points
> 1. Write down the **width** and the **encoding** of every value before computing.
> 2. Separate three things: the *exact mathematical answer*, the *bits that are kept*, and the *interpretation of those bits*.
> 3. For memory questions, write each value at full width in hex, split it into bytes, and lay the bytes out in increasing address order.

```quiz
Q: In 8-bit two's complement, what is `0x9C`?
- [ ] 156
- [x] −100
- [ ] −28
- [ ] −99
> As unsigned it is 156. The MSB is 1, so subtract $2^8$: $156 - 256 = -100$.
---
Q: Which statement about $N$-bit two's complement is **false**?
- [ ] There is exactly one representation of zero.
- [ ] `111…1` represents −1.
- [x] The most negative number can be negated without overflow.
- [ ] The same adder works for unsigned and two's complement addition.
> $-2^{N-1}$ has no positive counterpart; flipping and adding 1 returns the same bit pattern.
---
Q: 8-bit addition `0xC8 + 0x64` gives `0x2C` with a carry out. Which is true?
- [x] Unsigned overflow, no signed overflow
- [ ] Signed overflow, no unsigned overflow
- [ ] Both overflow
- [ ] Neither overflows
> Unsigned: $200 + 100 = 300 > 255$. Signed: $-56 + 100 = 44$, which fits (operands have different signs, so signed overflow is impossible).
---
Q: How many bits are needed to give every byte of a 16 GiB memory its own address?
- [ ] 30
- [ ] 32
- [x] 34
- [ ] 36
> $16\ \text{GiB} = 2^4 \cdot 2^{30} = 2^{34}$ bytes, so 34 address bits.
---
Q: An 8-bit register holds `1110 1000`. After an **arithmetic** right shift by 2 it holds:
- [ ] `0011 1010`
- [x] `1111 1010`
- [ ] `1010 0000`
- [ ] `1110 1010`
> Arithmetic shift copies the sign bit into the vacated positions: −24 becomes −6.
```

## Practice

| Skill | Start with | Then |
|---|---|---|
| Conversion and signed interpretation | SP24 Final Q1.1–1.2, SP25 Final Q1.1–1.2 | FA25 Final Q1.1, SP26 Final Q1.1 |
| Ranges and overflow | SP23 MT Q1, FA24 MT Q1.1–1.2 | SU24 MT Q1.1–1.5 |
| Bytes, casts and `strlen` over integers | SP23 MT Q1.8–1.11 | FA25 Final Q1.2, SP26 Final Q1.2 |
| Sign extension and shifts changing behavior | FA24 Final Q3 | SP25 MT Q2.3 |
