---
title: Modular Arithmetic Formulas and Theorems
Content Type: Complementary Note
Content Area:
Course:
description:
pinned: false
Date Published: October 10th, 2026 - 6:11 PM
Last Updated: October 10th, 2026 - 6:11 PM
Status: Updating
---
# Quiz 2 — Modular Arithmetic Formulas and Theorems

Across all Quiz 2 variants, these are the important formulas, theorems, and techniques to know. Assume every modulus is greater than 1.

## 1. Definition of Congruence

$$
a\equiv b\pmod m
\iff m\mid(a-b)
\iff a=b+km\text{ for some }k\in\mathbb Z.
$$

Two integers are congruent when they have the same remainder. This is your starting point for proofs: replace a congruence with an ordinary integer equation.

In particular, $a\equiv0\pmod m$ means $m\mid a$.

---

## 2. Arithmetic Preserves Congruence - Theorem 5.1

If $a\equiv b\pmod m$ and $c\equiv d\pmod m$, then

$$
\begin{aligned}
a+c&\equiv b+d\pmod m,\\
a-c&\equiv b-d\pmod m,\\
ac&\equiv bd\pmod m.
\end{aligned}
$$

Consequently, $a^n\equiv b^n\pmod m$ for positive integers $n$.

**Reduce numbers before calculating and after intermediate steps** to keep the arithmetic small.

---

## 3. Useful Representatives: Zero, One, and Negative One

$$
\begin{aligned}
(m-1)^n&\equiv(-1)^n\pmod m,\\
(m+1)^n&\equiv1\pmod m.
\end{aligned}
$$

A base congruent to negative one gives $1$ for even powers and $-1$ for odd powers.

Negative representatives also simplify products:

$$
98\cdot99\cdot100
\equiv(-3)(-2)(-1)
\equiv-6
\equiv95\pmod{101}.
$$

You may use negative numbers while working, but give the final remainder in $\{0,\ldots,m-1\}$.

---

## 4. Power Cycles and Exponent Reduction

If $a^t\equiv1\pmod m$, write $n=qt+r$, where $0\le r<t$. Then

$$
a^n=(a^t)^q a^r\equiv a^r\pmod m.
$$

This turns a huge exponent into a small one. For example, $3^3\equiv1\pmod{26}$, so the exponent can be reduced modulo $3$.

**Reduce the exponent by a verified cycle length, not automatically by the modulus.**

Some cycles never reach $1$: positive powers of $2$ modulo $6$ alternate between $2$ and $4$.

---

## 5. Last Digits Are Remainders

$$
\text{Last }k\text{ decimal digits of }N
=N\bmod 10^k.
$$

Use modulus $100$ for two digits and $1000$ for three digits.

Preserve leading zeros: a remainder of $1$ becomes **01** or **001**, respectively.

---

## 6. Prime Factorization Tests Divisibility

By the Fundamental Theorem of Arithmetic, positive integers greater than $1$ have unique prime factorizations, up to reordering.

Therefore,

$$
m\mid a^n
\iff
a^n\text{ contains every prime factor of }m
\text{ with at least the required multiplicity}.
$$

For example, $6^5=2^5 3^5$ contains the four factors of $2$ needed for divisibility by $16=2^4$.

But no positive power of $6$ contains a factor of $5$, so it cannot be divisible by $15$.

---

## 7. Modular Inverses and Solving Linear Congruences

$$
aa^{-1}\equiv1\pmod m.
$$

The inverse exists exactly when

$$
\gcd(a,m)=1.
$$

When it exists, the inverse is unique modulo $m$.

To solve $ax+c\equiv b\pmod m$, subtract $c$, then multiply by the inverse:

$$
x\equiv a^{-1}(b-c)\pmod m.
$$

More generally, let $d=\gcd(a,m)$. The equation $ax\equiv b\pmod m$ has:

- **No solutions** if $d\nmid b$.
- **Exactly $d$ distinct solutions modulo $m$** if $d\mid b$.

Thus, it has a unique solution exactly when $d=1$. This explains when the quiz asks you to write N/A.

---

## 8. Cancellation Can Change the Modulus

For $d=\gcd(c,m)$,

$$
ca\equiv cb\pmod m
\iff
a\equiv b\pmod{m/d}.
$$

You can cancel $c$ while keeping the same modulus only when $\gcd(c,m)=1$.

For example,

$$
2x\equiv10\pmod{36}
\iff
x\equiv5\pmod{18}.
$$

For a proof, write $2x=10+36k$ and divide the entire equation by $2$.

> [!warning] Check the modulus when cancelling
> Cancelling a factor that shares a divisor with the modulus generally changes the modulus. From $2x\equiv10\pmod{36}$, you get $x\equiv5\pmod{18}$, not necessarily $x\equiv5\pmod{36}$.

---

## 9. Changing Moduli and Checking Compatibility

$$
x\equiv a\pmod m,\quad d\mid m
\implies
x\equiv a\pmod d.
$$

A congruence remains true modulo any divisor of its modulus. This lets you detect contradictions between two conditions.

More generally, the system

$$
\begin{aligned}
x&\equiv a\pmod m,\\
x&\equiv b\pmod n
\end{aligned}
$$

has a solution exactly when

$$
a\equiv b\pmod{\gcd(m,n)}.
$$

For example, $x\equiv2\pmod{10}$ forces remainder $2$ modulo $5$, while $x\equiv5\pmod{15}$ forces remainder $0$ modulo $5$. These requirements are incompatible.

---

## 10. Counting Inverses and Finding Self-Inverses

To count invertible residues, count the numbers relatively prime to $m$. This count is Euler's totient:

$$
\varphi(m)
=
m\prod_{\substack{p\mid m\\p\text{ prime}}}
\left(1-\frac1p\right).
$$

For these small quiz moduli, listing the coprime residues is sufficient.

A residue is **its own inverse** exactly when

$$
x^2\equiv1\pmod m.
$$

Check the invertible residues by squaring them. With a composite modulus, there can be more self-inverses than just $1$ and $-1$.

---

## Supporting Course Tools

These two tools are also useful for computing inverses and simplifying powers.

### Bézout's Identity

There exist integers $u$ and $v$ such that

$$
ua+vm=\gcd(a,m).
$$

When the gcd is $1$, reducing this equation modulo $m$ gives $ua\equiv1\pmod m$. Thus, $u$ is an inverse of $a$ modulo $m$.

The extended Euclidean algorithm computes these coefficients.

### Fermat's Little Theorem

If $p$ is prime and $p\nmid a$, then

$$
a^{p-1}\equiv1\pmod p.
$$

This supplies a power cycle, allowing you to reduce exponents modulo $p-1$ when the theorem's conditions hold.