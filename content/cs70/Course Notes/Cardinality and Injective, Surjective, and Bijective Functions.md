---
title: Cardinality and Injective, Surjective, and Bijective Functions
Content Type: Complementary Note
Content Area: Discrete Mathematics
description: Explains how injective, surjective, and bijective functions relate to comparisons of cardinality between sets.
Course: CS 70
pinned: false
Date Published: October 22, 2026
Last Updated: October 22, 2026
Status: Finalized
---

# Cardinality and Injective, Surjective, and Bijective Functions
Let $f:A\to B$, where $A$ is the **domain** and $B$ is the **codomain**. Injectivity, surjectivity, and bijectivity describe how elements of $A$ map to elements of $B$, and these properties allow us to compare the cardinalities of the two sets.

## Injective Functions
A function is **injective**, or one-to-one, if distinct inputs have distinct outputs.

Equivalently,

$$
f(a)=f(b)\implies a=b.
$$

If there is an injection $f:A\to B$, then

$$
\lvert A\rvert\le\lvert B\rvert.
$$

The idea is that $B$ has enough elements to assign every element of $A$ a distinct output.

> [!important] Injective and Cardinality
> If $f:A\to B$ is injective, then $A$ is no larger than $B$:
>
> $$
> \lvert A\rvert\le\lvert B\rvert.
> $$

---

## Surjective Functions
A function is **surjective**, or onto, if every element of the codomain is hit by at least one input.

Formally,

$$
(\forall y\in B)(\exists x\in A)\bigl(f(x)=y\bigr).
$$

If there is a surjection $f:A\to B$, then, intuitively,

$$
\lvert A\rvert\ge\lvert B\rvert.
$$

Multiple elements of $A$ are allowed to map to the same element of $B$. The important requirement is that no element of $B$ is left without a pre-image.

> [!important] Surjective and Cardinality
> If $f:A\to B$ is surjective, then $A$ has enough elements to cover all of $B$.

---

## Bijective Functions
A function is **bijective** if it is both injective and surjective.

This means every element of $A$ is paired with exactly one element of $B$, and every element of $B$ is paired with exactly one element of $A$.

If there is a bijection $f:A\to B$, then

$$
\lvert A\rvert=\lvert B\rvert.
$$

In CS 70, two sets are said to have the same cardinality when there exists a bijection between them.

> [!important] Bijections Determine Equal Cardinality
> $A$ and $B$ have the same cardinality exactly when their elements can be placed into a one-to-one correspondence.

---

## Summary
| Function property | Cardinality relationship | Interpretation |
|---|---|---|
| Injective | $\lvert A\rvert\le\lvert B\rvert$ | Every input gets a distinct output. |
| Surjective | $\lvert A\rvert\ge\lvert B\rvert$ | Every element of the codomain is hit. |
| Bijective | $\lvert A\rvert=\lvert B\rvert$ | The sets can be perfectly paired. |

---

## Infinite Sets
The same ideas apply to infinite sets, although the results can initially seem unintuitive.

Consider $f:\mathbb{N}\to 2\mathbb{N}$ defined by

$$
f(n)=2n,
$$

where

$$
2\mathbb{N}=\{0,2,4,6,\ldots\}.
$$

This function is injective because different natural numbers produce different even numbers. It is also surjective because every even natural number can be written as $2n$ for some $n\in\mathbb{N}$.

Therefore, $f$ is a bijection, so

$$
\lvert\mathbb{N}\rvert=\lvert 2\mathbb{N}\rvert.
$$

Thus, the natural numbers and the even natural numbers have the same cardinality, even though the even natural numbers form a proper subset of $\mathbb{N}$.

---

## Relationship to Countability
Countability is a statement about cardinality, so it is decided with the same three kinds of function. Note 12 defines a set $S$ to be **countable** if there is a bijection between $S$ and $\mathbb{N}$ or some subset of $\mathbb{N}$. Finite sets are countable, and an infinite set is countable exactly when it has the same cardinality as $\mathbb{N}$. See [[cs70/Course Notes/N12 Countability and Infinity|Note 12]] for the full development.

### Countability from a Bijection
A bijection $f:S\to\mathbb{N}$ shows directly that $S$ is countable, and it means $\lvert S\rvert=\lvert\mathbb{N}\rvert$. The examples in [[#Infinite Sets]] are of this type. The map $f(n)=2n$ shows that $2\mathbb{N}$ is countable, and Note 12 gives a similar interleaving bijection between $\mathbb{N}$ and $\mathbb{Z}$.

Finite binary strings $\{0,1\}^*$ are countable by a bijection too. List them by increasing length and, within each length, in lexicographic order:

$$
\varepsilon,0,1,00,01,10,11,000,\ldots
$$

Each string's position in the list is its image in $\mathbb{N}$.

### Countability from an Injection
Writing down a bijection is often hard, so the usual shortcut is an injection. If $f:A\to\mathbb{N}$ is injective, then $f$ is a bijection from $A$ onto its image $f(A)\subseteq\mathbb{N}$. That is exactly the definition of countable, so

$$
f:A\to\mathbb{N}\text{ injective}\implies A\text{ is countable}.
$$

More generally, an injection into any countable set $B$ also makes $A$ countable, because $A$ can be sent into $B$ and then into $\mathbb{N}$. Note 12 uses this for the polynomials $\mathbb{N}(x)$ with natural number coefficients. It injects them into the finite ternary strings $\{0,1,2\}^*$, which are countable by the same length-then-lexicographic listing.

> [!important] The Direction of the Injection Matters
> An injection **into** $\mathbb{N}$, or into any countable set, shows that the domain is countable. An injection **from** $\mathbb{N}$ shows only that the codomain is at least as large as $\mathbb{N}$. The inclusion of $\mathbb{N}$ into $\mathbb{R}$ is injective, and $\mathbb{R}$ is not countable.

### Countable Infinite Sets Have Equal Cardinality
Injections in both directions give a bijection, by the **Cantor-Bernstein theorem**. This is how Note 12 handles $\mathbb{Q}$:

- The inclusion $\mathbb{N}\subseteq\mathbb{Q}$ is an injection, so $\lvert\mathbb{N}\rvert\le\lvert\mathbb{Q}\rvert$.
- The spiral enumeration of the integer grid $\mathbb{Z}\times\mathbb{Z}$, restricted to the points that represent rationals in lowest terms, is an injection $\mathbb{Q}\to\mathbb{N}$, so $\lvert\mathbb{Q}\rvert\le\lvert\mathbb{N}\rvert$.

Together these give $\lvert\mathbb{Q}\rvert=\lvert\mathbb{N}\rvert$, so $\mathbb{Q}$ is countable even though it is dense. Every countably infinite set therefore has cardinality $\lvert\mathbb{N}\rvert$, written $\aleph_0$.

### Uncountability from an Injection or Surjection
Reading the same facts in reverse shows that a set is uncountable. The first two rules are the contrapositives of the rule above, and the third is a consequence of the first.

| Known fact | Conclusion | Reason |
|---|---|---|
| $U$ is uncountable and $f:U\to B$ is injective. | $B$ is uncountable. | If $B$ were countable, $U$ would be countable by the injection rule. |
| $U$ is uncountable and $f:A\to U$ is surjective. | $A$ is uncountable. | $\lvert A\rvert\ge\lvert U\rvert$, so $A$ cannot be countable. |
| $U$ is uncountable and there are injections both ways between $U$ and $B$. | $B$ is uncountable. | Cantor-Bernstein gives a bijection, so $\lvert B\rvert=\lvert U\rvert$. |

Two examples from the course show these rules at work:

- **Positive reals.** HW 07 proves that $\mathbb{R}^+=(0,\infty)$ is uncountable, given that $(0,1)$ is. The inclusion $f(x)=x$ is an injection $(0,1)\to\mathbb{R}^+$, which already makes $\mathbb{R}^+$ uncountable by the first rule. The map $g(x)=\frac{1}{x+1}$ is an injection $\mathbb{R}^+\to(0,1)$, so Cantor-Bernstein also gives equal cardinality.
- **The Cantor set.** Note 12 maps $C$ onto $[0,1]$ by halving the ternary digits of each point and reading them in binary. This is a surjection from $C$ onto an uncountable set, so $C$ is uncountable by the second rule. It is not injective, so it is not a bijection. The inclusion $C\subseteq[0,1]$ gives the reverse inequality, and $C$ has the same cardinality as $[0,1]$.

### Why No Bijection from $\mathbb{N}$ Exists
Showing that $S$ is **not** countable requires ruling out every bijection with $\mathbb{N}$, so a single function cannot settle it. Note 12 uses **Cantor's diagonalization**. It assumes a bijection $f:\mathbb{N}\to S$ and builds an element that $f$ misses, which contradicts surjectivity. This works for $\mathbb{R}[0,1]$ and for $\mathcal{P}(\mathbb{N})$, and it gives

$$
\lvert\mathbb{N}\rvert<\lvert\mathcal{P}(\mathbb{N})\rvert.
$$

The constructed element must belong to $S$. For the reals the modified diagonal is always another real, but for the rationals it need not be rational, so the argument does not make $\mathbb{Q}$ uncountable.

### Summary
| Function from $A$ | What it shows about countability |
|---|---|
| Bijection $A\to\mathbb{N}$ | $A$ is countably infinite. |
| Injection $A\to\mathbb{N}$, or into any countable set | $A$ is countable. |
| Injection $\mathbb{N}\to A$ | $A$ is infinite, but may be countable or uncountable. |
| Injections both ways between $A$ and $\mathbb{N}$ | $A$ is countably infinite (Cantor-Bernstein). |
| Injection from an uncountable set into $A$ | $A$ is uncountable. |
| Surjection from $A$ onto an uncountable set | $A$ is uncountable. |
