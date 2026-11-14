---
title: Floating Point
Content Type: Topic Review
Course: CS61C
description: IEEE 754 fields, normalized vs. denormalized values, special values, and spacing.
Last Updated: November 14, 2026
Status: Ready to review
priority: Medium — sometimes one short question, sometimes a large synthesis problem with custom formats
sources: 3 Floating Point (fixed point, IEEE 754, examples, special numbers, discussion)
practice: SP24 Final Q1.3; FA24 Final Q1.1; FA25 Final Q1.3; SP26 Final Q1.3–1.4; SP23 Final Q9; FA23 MT Q3; FA24 MT Q1.3–1.5; SP23 MT Q3
---

Floating point is **binary scientific notation packed into a fixed number of bits**. The standard trades uniform spacing for enormous range: values are dense near zero and sparse far away. Exams rarely ask you to recite constants — they hand you an unfamiliar format and ask about **ranges, special cases, and the gap between neighboring values**.

> [!abstract] The whole topic in five lines
> - Three fields: **sign** (1 bit), **exponent** (biased), **significand** (the fraction bits after the binary point).
> - **Normalized** (exponent field not all 0s or all 1s): $(-1)^S \times 1.\text{frac}_2 \times 2^{\text{Exp}-\text{Bias}}$ — an **implicit leading 1**.
> - **Denormalized** (exponent field all 0s): $(-1)^S \times 0.\text{frac}_2 \times 2^{1-\text{Bias}}$ — no implicit 1, fills the gap around zero.
> - **Exponent field all 1s:** fraction zero → $\pm\infty$; fraction non-zero → **NaN**.
> - **Step size** between neighbors $= 2^{\text{(actual exponent)} - \text{(number of fraction bits)}}$. It doubles every time the exponent increases.

## Two metrics: range and step size

Every number format is judged on **range** (smallest to largest representable value) and **step size** (the gap between adjacent representable values — smaller means more precise). With a fixed number of bits you cannot have both.

**Fixed point** puts the binary point at a fixed position. For example with 4 integer bits and 4 fraction bits, `0010.1010` is $2 + \tfrac12 + \tfrac18 = 2.625$. Step size is constant ($2^{-4}$ here) and ordinary integer hardware works, but the range is tiny. It is fine for money or sensor readings and hopeless for science, where values span dozens of orders of magnitude.

**Floating point** lets the binary point "float" by storing an exponent, exactly like scientific notation:

$$
\underbrace{1.0101}_{\text{mantissa}} {}_{\text{two}} \times 2^{\overbrace{-3}^{\text{exponent}}}
$$

In **normalized** binary scientific notation there is exactly one non-zero digit before the binary point, and in binary that digit is always **1**. So we don't store it.

## IEEE 754 single precision

| Field | Sign | Exponent | Significand |
|---|---|---|---|
| Bits | 31 | 30–23 | 22–0 |
| Width | 1 | 8 | 23 |
| Meaning | 0 = positive, 1 = negative | unsigned value, **bias 127** | bits to the **right** of the implicit `1.` |

> [!info] Normalized value
> $$
> \text{Value} = (-1)^{\text{Sign}} \times \left(1 + \text{Significand}\right) \times 2^{\text{Exponent} - 127}
> $$
> where the significand field is read as a fraction: its first bit is worth $2^{-1}$, the next $2^{-2}$, … the last $2^{-23}$.

Design choices worth understanding (they explain everything else):

- **Sign-magnitude:** flipping one bit negates. That is why there are two zeros.
- **Biased exponent:** stored $=$ actual $+ 127$. Bias (not two's complement) so that bigger exponent ⇒ bigger bit pattern.
- **Field order sign · exponent · significand:** positive floats sort correctly when compared **as unsigned integers**. Hardware can reuse integer comparison.
- **Double precision** is the same idea with 11 exponent bits (bias 1023) and 52 significand bits.

In general, for an exponent field of $E$ bits the standard bias is $2^{E-1}-1$.

<div data-widget="float"></div>

### Converting, both directions

> [!example] Bits → decimal: `0xC0F00000`
> `1 | 1000 0001 | 111 0000 …`
> - sign 1 → negative
> - exponent field $129$ → actual exponent $129 - 127 = 2$
> - significand `111…` → mantissa $1.111_2$
>
> $-1.111_2 \times 2^2 = -111.1_2 = -7.5$

> [!example] Decimal → bits: $-12.375$
> 1. Sign: negative → `1`.
> 2. Binary: $12 = 1100_2$, $0.375 = .011_2$ → $1100.011_2$.
> 3. Normalize: $1.100011_2 \times 2^3$.
> 4. Exponent field: $3 + 127 = 130 =$ `1000 0010`.
> 5. Significand: drop the leading 1 → `100011` then pad with zeros to 23 bits.
>
> `1 | 1000 0010 | 100 0110 0000 0000 0000 0000` = `0xC1460000`

## The exponent field decides the category

| Exponent field | Significand | Meaning |
|---|---|---|
| all 0s | 0 | **± zero** |
| all 0s | non-zero | **denormalized** number |
| 1 … 254 | anything | **normalized** number |
| all 1s (255) | 0 | **± infinity** |
| all 1s (255) | non-zero | **NaN** |

### Zero and infinity

- $+0$ is all zero bits; $-0$ has only the sign bit set. They compare equal.
- **Overflow** (magnitude too large) gives $\pm\infty$ rather than wrapping around like integers. Dividing a non-zero number by zero also gives $\pm\infty$.

### NaN

Invalid operations ($0/0$, $\sqrt{-4}$, $\infty - \infty$) produce **Not a Number**. NaNs *contaminate*: any operation with a NaN operand yields NaN. Any non-zero significand works, so in single precision there are $2 \times (2^{23}-1)$ distinct NaN bit patterns.

### Denormalized numbers

The smallest positive *normalized* float is $1.0 \times 2^{-126}$. The next one up is $(1 + 2^{-23}) \times 2^{-126}$, a step of only $2^{-149}$. But between $2^{-126}$ and 0 there would be nothing: a gap $2^{23}$ times wider than the neighboring step. This is **underflow**.

Denorms close that gap by dropping the implicit 1:

> [!info] Denormalized value (single precision)
> $$
> \text{Value} = (-1)^{\text{Sign}} \times 0.\text{Significand}_2 \times 2^{-126}
> $$
> The exponent is fixed at $1 - \text{Bias} = -126$ — **not** $-127$. That choice makes the largest denorm sit exactly one step below the smallest normalized number, so spacing stays continuous (**gradual underflow**).

| Landmark (single precision) | Bits | Value |
|---|---|---|
| Smallest positive denorm | `0 · 0000 0000 · 00…01` | $2^{-23} \times 2^{-126} = 2^{-149}$ |
| Largest denorm | `0 · 0000 0000 · 11…11` | $(1 - 2^{-23}) \times 2^{-126}$ |
| Smallest positive normalized | `0 · 0000 0001 · 00…00` | $2^{-126}$ |
| One | `0 · 0111 1111 · 00…00` | $1.0$ |
| Largest finite | `0 · 1111 1110 · 11…11` | $(2 - 2^{-23}) \times 2^{127} \approx 3.4 \times 10^{38}$ |

## Step size: the idea exams actually test

Adding 1 to the significand field changes the value by one unit in the last place:

$$
\text{step} = 2^{\,\text{actual exponent}} \times 2^{-(\#\text{fraction bits})}
$$

For single precision that is $2^{\text{exp}-127-23}$. Consequences:

- Within one exponent (one "binade" $[2^k, 2^{k+1})$) values are **evenly spaced**; crossing into the next binade **doubles** the step.
- Every binade contains the same number of floats ($2^{23}$).
- **Integers stop being exact** once the step exceeds 1. A float has 24 significant bits (23 stored + the implicit 1), so every integer up to $2^{24}$ is representable; $2^{24}+1$ is the first that is not. In $[2^{24}, 2^{25})$ only even integers exist, then only multiples of 4, and so on.
- More generally, multiples of $2^j$ are all representable up to $2^{24+j}$.

> [!tip] "Is $x$ exactly representable?" — two separate checks
> 1. **Exponent range:** does the leading 1 of $x$ land at an exponent the format can store?
> 2. **Precision:** do all the 1 bits of $x$ fit in a window of (fraction bits + 1) consecutive binary places starting at the leading 1?
>
> Failing (1) is overflow/underflow; failing (2) is rounding. Exams want you to tell these apart.

> [!example] Step size at `0 | 1000 0001 | 111 0…0` (the value 7.5)
> Actual exponent is $129 - 127 = 2$, so the last significand bit is worth $2^{2-23} = 2^{-21}$. The next float above 7.5 is $7.5 + 2^{-21}$.

## Things floats do that integers don't

- **Addition is not associative.** With $x = -1.5\times10^{38}$, $y = 1.5\times10^{38}$, $z = 1.0$: $(x+y)+z = 1.0$ but $x+(y+z) = 0.0$, because $y+z$ rounds back to $y$ — 1.0 is far below the step size up there.
- **Rounding** happens on almost every operation. The default mode is round-to-nearest, ties to even. (Other modes: toward $+\infty$, toward $-\infty$, truncate.)
- **Casting loses information both ways.** `int → float` can round large integers (only 24 significant bits); `float → int` truncates the fraction. So `i == (int)(float)i` and `f == (float)(int)f` are not always true. `int → double` is always exact (53 significant bits ≥ 32).
- **Precision vs. accuracy:** precision is how many bits you have; accuracy is how close the stored value is to the truth. `float pi = 3.14;` uses all 23 significand bits (precise) and is still not $\pi$ (not accurate).

## Custom formats: the exam version

Most recent questions define their own format ("1 sign bit, 3 exponent bits, 4 significand bits", sometimes with a non-standard bias). Rebuild everything from the definitions:

| Quantity | Formula for $E$ exponent bits, $F$ fraction bits |
|---|---|
| Bias (standard) | $2^{E-1} - 1$ — **use the problem's bias if it gives one** |
| Largest exponent field for normalized | $2^E - 2$ |
| Largest finite value | $(2 - 2^{-F}) \times 2^{(2^E - 2) - \text{Bias}}$ |
| Smallest positive normalized | $2^{1 - \text{Bias}}$ |
| Smallest positive denorm | $2^{1 - \text{Bias} - F}$ |
| Number of NaNs | $2 \times (2^F - 1)$ |
| Number of denorms (non-zero) | $2 \times (2^F - 1)$ |

Switch the explorer above to a toy format and step through the values: the number line shows the denormalized values evenly spaced, then the gap doubling each binade.

> [!warning] Common mistakes
> - Forgetting the implicit 1 for normalized numbers — or adding it for denorms.
> - Using exponent $-\text{Bias}$ for denorms. It is $1 - \text{Bias}$.
> - Treating the exponent field as two's complement. It is unsigned with a bias.
> - Assuming the IEEE bias when the problem states a different one.
> - Reading the significand as an integer. Its first bit is worth $\tfrac12$.

```quiz
Q: What value does the single-precision pattern `0x3F800000` represent?
- [ ] 0.5
- [x] 1.0
- [ ] 2.0
- [ ] 127.0
> `0 | 0111 1111 | 000…` : exponent field 127 → actual exponent 0, significand 0 → $1.0 \times 2^0$.
---
Q: A format has 1 sign bit, 3 exponent bits (standard bias), and 4 significand bits. What is the smallest positive **denormalized** value?
- [ ] $2^{-3}$
- [ ] $2^{-4}$
- [x] $2^{-6}$
- [ ] $2^{-7}$
> Bias $= 2^{2}-1 = 3$. Denorm exponent is $1 - 3 = -2$. Smallest fraction is $2^{-4}$. So $2^{-4} \times 2^{-2} = 2^{-6}$.
---
Q: In single precision, what is the gap between 16.0 and the next larger float?
- [ ] $2^{-23}$
- [ ] $2^{-20}$
- [x] $2^{-19}$
- [ ] $2^{-4}$
> $16 = 1.0 \times 2^4$. Step $= 2^{4-23} = 2^{-19}$.
---
Q: Which integer is **not** exactly representable as a single-precision float?
- [ ] $2^{24}$
- [x] $2^{24} + 1$
- [ ] $2^{24} + 2$
- [ ] $2^{30}$
> A float has 24 significant bits. $2^{24}+1$ needs 25. In $[2^{24}, 2^{25})$ the step is 2, so only even integers exist.
---
Q: An exponent field of all 1s with a non-zero significand is:
- [ ] The largest normalized number
- [ ] Infinity
- [x] NaN
- [ ] A denormalized number
> All-ones exponent is reserved: zero significand is ±∞, anything else is NaN.
---
Q: Why is the denormalized exponent $1 - \text{Bias}$ instead of $-\text{Bias}$?
- [ ] To make more NaNs available
- [x] So the largest denorm is exactly one step below the smallest normalized number
- [ ] Because the exponent field is two's complement
- [ ] To represent negative zero
> Dropping the implicit 1 already halves the magnitude; keeping the exponent at $1-\text{Bias}$ keeps the spacing continuous across the boundary.
```

## Practice

| Skill | Start with | Then |
|---|---|---|
| Encode / decode, normal and denorm | FA23 MT Q3, SP24 Final Q1.3 | SU25 Final Q1.2–1.3 |
| Spacing and exact representability | FA24 MT Q1.3–1.5, FA24 Final Q1.1 | FA25 Final Q1.3 |
| Non-standard bias, normal/denorm boundary | SP26 Final Q1.3–1.4 | — |
| Counting special patterns | SU24 Final Q1.4 | SU24 Final Q4 |
| Float rules as Boolean logic (stretch) | SP23 Final Q9 | SU25 Final Q4 |
