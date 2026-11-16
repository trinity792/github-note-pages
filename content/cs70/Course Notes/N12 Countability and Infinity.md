---
title: N12 Countability and Infinity
Content Type: Course Notes
Content Area: Discrete Mathematics
description: "Uses bijections and injections to compare infinite sets and establish the countability of integers, rationals, finite strings, and polynomials. Develops Cantor's diagonalization, the uncountability of the Cantor set, and the larger cardinality of power sets."
Course: CS 70
pinned: false
Date Published: October 16, 2026
Last Updated: October 16, 2026
Status: Finalized
---

# N12 Countability and Infinity
[[Cardinality and Injective, Surjective, and Bijective Functions]]

Infinity has different sizes. This note uses **bijections** to compare sets, constructs examples of **countable** infinite sets, and develops **Cantor's diagonalization** to show that the reals and the power set of the natural numbers are uncountable. The next note connects these ideas to the nature of computation and proof.

## 1. Bijections

Two finite sets have the same size exactly when their elements can be paired so that every element on either side has a unique partner.

A **function**, or **mapping**, $f:A\to B$ assigns exactly one output $f(x)\in B$ to every input $x\in A$. The source calls $A$ the **domain** and $B$ the **range**.

A **bijection** pairs every $a\in A$ with a unique image $b=f(a)\in B$, and every $b\in B$ with a unique **pre-image** $a\in A$ satisfying $f(a)=b$.

A function is **one-to-one**, or an **injection**, if distinct inputs have distinct outputs:

$$
(\forall x\in A)(\forall y\in A)\bigl(x\ne y\implies f(x)\ne f(y)\bigr).
$$

A function is **onto**, or **surjective**, if it hits every element of the range:

$$
(\forall y\in B)(\exists x\in A)\bigl(f(x)=y\bigr).
$$

The source's three mapping diagrams have the following arrows:

| Property illustrated | Domain $A$ | Range $B$ | Mapping |
|---|---|---|---|
| One-to-one | $\{1,2,3\}$ | $\{a,b,c,d\}$ | $1\mapsto c$, $2\mapsto a$, $3\mapsto d$ |
| Onto | $\{1,2,3,4\}$ | $\{a,b,c\}$ | $1\mapsto c$, $2\mapsto a$, $3\mapsto b$, $4\mapsto c$ |
| Both, hence a bijection | $\{1,2,3,4\}$ | $\{a,b,c,d\}$ | $1\mapsto c$, $2\mapsto a$, $3\mapsto b$, $4\mapsto d$ |

A function is a bijection **if and only if it is both one-to-one and onto**.

### Exercise — Inverse Bijections

Let $f:A\to B$ be a bijection. Show that it has an inverse $f^{-1}:B\to A$ satisfying $f^{-1}(f(a))=a$ for every $a\in A$, and that $f^{-1}$ is also a bijection.

---

## 2. Cardinality

To show that two sets have the same **cardinality**, or size, demonstrate a bijection between them. The pairing idea that works for finite sets also applies to infinite sets.

### Natural Numbers and Positive Integers

Are there more natural numbers $\mathbb{N}$ than positive integers $\mathbb{Z}^+$? Although $\mathbb{N}$ includes the extra element $0$, the mapping

$$
f:\mathbb{N}\to\mathbb{Z}^+,\qquad f(n)=n+1
$$

is a bijection:

| $n$ | $0$ | $1$ | $2$ | $3$ | $4$ | $5$ | $\cdots$ |
|---|---|---|---|---|---|---|---|
| $f(n)$ | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ | $\cdots$ |

It is onto because every positive integer is hit. It is one-to-one because $n+1=m+1$ implies $n=m$. Thus the two sets have the same cardinality. Very informally, this resembles “$\infty+1=\infty$.”

### Natural Numbers and Even Natural Numbers

Let $2\mathbb{N}=\{0,2,4,6,\ldots\}$. It may seem that $\mathbb{N}$ is twice as large, but

$$
f:\mathbb{N}\to2\mathbb{N},\qquad f(n)=2n
$$

is a bijection:

| $n$ | $0$ | $1$ | $2$ | $3$ | $4$ | $5$ | $\cdots$ |
|---|---|---|---|---|---|---|---|
| $f(n)$ | $0$ | $2$ | $4$ | $6$ | $8$ | $10$ | $\cdots$ |

If $2n=2m$, then $n=m$, establishing injectivity. Each even natural number $y$ has pre-image $y/2$, establishing surjectivity. Therefore, $\mathbb{N}$ and $2\mathbb{N}$ have the same cardinality.

### Natural Numbers and All Integers

The negative integers do not make $\mathbb{Z}$ larger in cardinality than $\mathbb{N}$. Define

$$
f(x)=
\begin{cases}
\dfrac{x}{2},&\text{if }x\text{ is even},\\
-\dfrac{x+1}{2},&\text{if }x\text{ is odd}.
\end{cases}
$$

The mapping interleaves non-negative and negative integers:

| $x$ | $0$ | $1$ | $2$ | $3$ | $4$ | $\cdots$ | $124$ | $\cdots$ |
|---|---|---|---|---|---|---|---|---|
| $f(x)$ | $0$ | $-1$ | $1$ | $-2$ | $2$ | $\cdots$ | $62$ | $\cdots$ |

#### Proof That the Mapping Is One-to-One

Suppose $f(x)=f(y)$. The outputs have the same sign, so both come from the even branch or both from the odd branch.

In the first case,

$$
f(x)=f(y)\implies\frac{x}{2}=\frac{y}{2}\implies x=y.
$$

In the second case,

$$
f(x)=f(y)\implies-\frac{x+1}{2}=-\frac{y+1}{2}\implies x=y.
$$

Thus $f$ is injective.

#### Proof That the Mapping Is Onto

If $y\in\mathbb{Z}$ is non-negative, then $f(2y)=y$. If $y$ is negative, then

$$
f\bigl(-(2y+1)\bigr)=y.
$$

Every integer has a pre-image, so $f$ is onto. Hence it is a bijection, and $\mathbb{N}$ and $\mathbb{Z}$ have the same size.

### Definition 12.1 — Countable Sets

A set $S$ is **countable** if there is a bijection between $S$ and $\mathbb{N}$ or some subset of $\mathbb{N}$.

Every finite set of size $m$ is countable because its elements can be paired with $\{0,1,\ldots,m-1\}$. The infinite sets $\mathbb{Z}^+$ and $2\mathbb{N}$ are countable, as subsets of $\mathbb{N}$; $\mathbb{Z}$ is countable by the bijection above.

### Comparing Sizes with Injections

The rationals are

$$
\mathbb{Q}=\left\{\frac{x}{y}\mid x,y\in\mathbb{Z},\ y\ne0\right\}.
$$

There are infinitely many rationals between any two natural numbers. Nevertheless, $\mathbb{Q}$ has the same cardinality as $\mathbb{N}$.

If an injection $f:A\to B$ exists, then $|A|\le|B|$. To show equal cardinality, it suffices to establish injections in both directions:

$$
f:A\to B,\qquad g:B\to A.
$$

The **Cantor-Bernstein theorem** states that these imply a bijection $h:A\to B$. Its proof is difficult and omitted in the source.

### Rational Numbers: A Spiral Enumeration

Because $\mathbb{N}\subseteq\mathbb{Q}$, we have $|\mathbb{N}|\le|\mathbb{Q}|$. For the reverse inequality, construct an injection from $\mathbb{Q}$ to $\mathbb{N}$.

Represent each rational $a/b$ in lowest terms, with $\gcd(a,b)=1$, by a point $(a,b)$ in the integer grid $\mathbb{Z}\times\mathbb{Z}$. Not every grid point represents a rational under this representation: points on the $x$-axis have denominator zero, except that the source specially assigns $(0,0)$ to rational $0$. Points such as $(2,8)$ and $(-1,-4)$ are not used, since $1/4$ is represented by $(1,4)$.

The source's diagram starts a spiral at the origin, moves right, up, left, and down, and continues outward around the integer grid. Assign each point its position along this spiral:

$$
(0,0)\mapsto0,\quad(1,0)\mapsto1,\quad(1,1)\mapsto2,\quad(0,1)\mapsto3,\quad\ldots
$$

Every integer pair occupies a unique position. Thus this is an injection $\mathbb{Z}\times\mathbb{Z}\to\mathbb{N}$, and restricting it to rational representatives yields an injection $\mathbb{Q}\to\mathbb{N}$. Why does this restriction suffice?

We obtain $|\mathbb{Q}|\le|\mathbb{N}|$. Together with the opposite inequality, Cantor-Bernstein gives equal cardinality.

#### Exercise — Ordered Pairs

Show that $\mathbb{N}\times\mathbb{N}$, the set of ordered pairs of natural numbers, is countable.

### Finite Binary Strings

The set $\{0,1\}^*$ consists of all binary strings of **finite**, but unbounded, length.

Enumerate strings by increasing length and, within each length, lexicographic order, equivalently numerical order when treated as binary numbers:

$$
\varepsilon,0,1,00,01,10,11,000,001,010,011,100,101,110,111,0000,\ldots
$$

Here $\varepsilon$ is the empty string, the only length-zero string. Each string appears once and only once. Pairing a string with its position in the list establishes a bijection with $\mathbb{N}$.

### Polynomials with Natural Number Coefficients

Let $\mathbb{N}(x)$ denote all polynomials with natural number coefficients. By the same length-then-lexicographic enumeration, the set of finite ternary strings $\{0,1,2\}^*$ is countable.

It therefore suffices to give an injection

$$
f:\mathbb{N}(x)\to\{0,1,2\}^*.
$$

This composes with an injection into $\mathbb{N}$. There is also an obvious injection in the other direction: send $n\in\mathbb{N}$ to the constant polynomial $n$.

For example, consider

$$
p(x)=5x^5+2x^4+7x^3+4x+6.
$$

Its coefficient list is $(5,2,7,0,4,6)$, with binary representations $(101,10,111,0,100,110)$. Insert the symbol $2$ as a separator. The source displays

$$
5x^5+2x^4+7x^3+4x+6\longmapsto1012102111221002110.
$$

> [!note] Source Encoding Convention
> The source says to insert a $2$ between binary coefficients while “ignoring coefficients that are 0.” In its displayed string, the zero coefficient is represented by an **empty field between consecutive separators**: $101\mid10\mid111\mid\,\mid100\mid110$, where each separator stands for a $2$. This preserves the displayed example and flags the wording rather than silently changing its treatment of zero.

The source argues that the polynomial can be recovered uniquely by reading the coefficient fields between successive $2$s, so the mapping is injective. It is not onto: for example, ternary strings with binary coefficient fields containing leading zeros are not images of polynomials.

Hence $\mathbb{N}(x)$ injects into $\mathbb{N}$ and is countable.

---

## 3. Cantor's Diagonalization

We have shown that $\mathbb{N}$, $\mathbb{Z}$, and $\mathbb{Q}$ have the same cardinality. Are the reals countable too?

Both rationals and reals are **dense**. Between rationals $a<b$, the midpoint $(a+b)/2$ is another rational; between any two distinct reals there is also a rational. Despite this, there are more reals than rationals.

### Exercise — Density of the Rationals

Show how to find a rational number between any two distinct real numbers.

### Decimal Representations

For the diagonal argument, the source uses infinite decimal representations without trailing zeros. For example, write $1$ as $0.999\ldots$ and $0.5$ as $0.4999\ldots$. Rationals have recurring expansions, while irrationals have non-recurring ones.

To see why $0.999\ldots=1$, let $x=0.999\ldots$. Then $10x=9.999\ldots$, so $9x=9$ and $x=1$.

### Theorem 12.1 — The Reals Are Uncountable

The real interval $\mathbb{R}[0,1]$, and hence $\mathbb{R}$, is uncountable.

#### Proof

Suppose, for contradiction, that a bijection $f:\mathbb{N}\to\mathbb{R}[0,1]$ exists. Enumerate its outputs as an infinite list. The following reproduces the source's example, with the diagonal digits bolded:

| Output | Digit 1 | Digit 2 | Digit 3 | Digit 4 | Digit 5 | Digit 6 | Digit 7 | Digit 8 | Further digits |
|---|---|---|---|---|---|---|---|---|---|
| $f(0)=0.\ldots$ | **5** | 2 | 1 | 4 | 9 | 3 | 5 | 6 | $\cdots$ |
| $f(1)=0.\ldots$ | 1 | **4** | 1 | 6 | 2 | 9 | 8 | 5 | $\cdots$ |
| $f(2)=0.\ldots$ | 9 | 4 | **7** | 8 | 2 | 7 | 1 | 2 | $\cdots$ |
| $f(3)=0.\ldots$ | 5 | 3 | 0 | **9** | 8 | 1 | 7 | 5 | $\cdots$ |
| $\vdots$ | $\vdots$ | $\vdots$ | $\vdots$ | $\vdots$ | $\vdots$ | $\vdots$ | $\vdots$ | $\vdots$ | $\ddots$ |

The diagonal defines $r=0.5479\ldots$. Construct $s$ by changing each digit $d$ of $r$ to $d+2\pmod{10}$. In the example, $s=0.7691\ldots$.

Suppose $s=f(n)$ for some $n$. By construction, $s$ differs from $f(n)$ in digit $n+1$. Thus $s$ is not $f(n)$, a contradiction.

So $s$ is a real number missing from the range of $f$, contradicting surjectivity. Therefore, $\mathbb{R}[0,1]$ is uncountable.

#### Why Change Digits by Two?

The same real can have two decimal expansions, such as $0.999\ldots=1.000\ldots$. The source changes digits by $2\pmod{10}$ rather than $1$ to avoid this ambiguity: the corresponding digits differ by more than one. Its alternative is to replace every diagonal digit by a different digit selected from $\{1,2,\ldots,8\}$.

### Why the Argument Does Not Prove That the Rationals Are Uncountable

Suppose a bijection $f:\mathbb{N}\to\mathbb{Q}[0,1]$ lists rationals with the following starting digits:

| Output | Digit 1 | Digit 2 | Digit 3 | Digit 4 | Digit 5 | Further digits |
|---|---|---|---|---|---|---|
| $f(0)=0.\ldots$ | **1** | 4 | 0 | 0 | 0 | $\cdots$ |
| $f(1)=0.\ldots$ | 5 | **9** | 2 | 4 | 5 | $\cdots$ |
| $f(2)=0.\ldots$ | 2 | 1 | **4** | 2 | 1 | $\cdots$ |
| $\vdots$ | $\vdots$ | $\vdots$ | $\vdots$ | $\vdots$ | $\vdots$ | $\ddots$ |

Changing each diagonal digit by $2\pmod{10}$ gives $q=0.316\ldots$. It differs from every listed rational, but we have no guarantee that $q$ is rational: its expansion need not be periodic. Therefore, it need not belong to the set the list is supposed to enumerate.

> [!important] The Constructed Object Must Belong to the Target Set
> For the reals, the modified diagonal always defines another real. For the rationals, it need not define another rational, so the same argument does not yield a contradiction.

---

## 4. The Cantor Set

Start with $[0,1]$ and repeatedly remove the **open middle third** of every remaining interval. The first removal deletes $(1/3,2/3)$, leaving $[0,1/3]\cup[2/3,1]$. Then remove the middle third of each of these two intervals, and continue indefinitely.

The source's first three iterations can be represented as follows:

| Iteration | Remaining intervals | Length of each interval |
|---|---|---|
| $0$ | The original interval $[0,1]$ | $1$ |
| $1$ | Two outer thirds | $1/3$ |
| $2$ | Four outer thirds of the preceding intervals | $1/9$ |
| $3$ | Eight outer thirds of the preceding intervals | $1/27$ |

The **Cantor set** contains every point never removed:

$$
C=\{x:x\text{ is not removed}\}.
$$

### Zero Measure Does Not Mean Empty

The remaining total length follows

$$
1\longrightarrow\frac23\longrightarrow\frac23\cdot\frac23
\longrightarrow\frac23\cdot\frac23\cdot\frac23
\longrightarrow\cdots\longrightarrow\lim_{n\to\infty}\left(\frac23\right)^n=0.
$$

This does **not** mean $C$ is empty. It means that its **measure** is zero. The source describes the remaining set as consisting of “isolated points” and containing no non-trivial intervals. In fact, it is uncountable.

It is already clear that $C$ contains countably many interval endpoints, such as $1/3$, $2/3$, $1/9$, and $1/27$. It also contains other points, such as $1/4$ and $3/10$. Why?

### A Ternary Description

In base three, the digits, or **trits**, are $0,1,2$. Every real in $[0,1]$ has a ternary representation. For example,

$$
\frac13=0.1_3=0.0222\ldots_3,\qquad
\frac23=0.2_3=0.1222\ldots_3.
$$

The first removal deletes numbers with first ternary digit $1$, leaving representations beginning $0.0\ldots$ or $0.2\ldots$. Endpoints need care: keep $1/3$ using $0.0222\ldots_3$ and $2/3$ using $0.2_3$.

The second removal deletes numbers beginning $0.01\ldots$ or $0.21\ldots$, eliminating $1$ in the second position. The third eliminates $1$ in the third position, and so on. Consequently,

$$
C=\{x\in[0,1]:x\text{ has a ternary representation containing only }0\text{s and }2\text{s}\}.
$$

### An Onto Map to the Unit Interval

For $x\in C$, divide every digit in its $0$/$2$ ternary representation by two and read the result as a binary fractional expansion. This defines $f:C\to[0,1]$.

For example,

$$
x=0.0220_3\longmapsto f(x)=0.0110_2.
$$

Every binary expansion has a pre-image, obtained by doubling its digits. Thus $f$ is onto. Since $[0,1]$ is uncountable, $C$ is uncountable.

The map is not injective. For example, $0.20222\ldots_3$ and $0.22_3$ map to $0.10111\ldots_2$ and $0.11_2$, which denote the same real. Therefore, $f$ is not a bijection.

The onto map shows that $C$ has cardinality at least that of $[0,1]$, while $C\subseteq[0,1]$ shows the reverse inequality. Hence $C$ has the same cardinality as $[0,1]$, and as $\mathbb{R}$.

---

## 5. Power Sets and Higher Orders of Infinity

The **power set** of $S$, denoted $\mathcal{P}(S)$, is the set of all subsets of $S$:

$$
\mathcal{P}(S)=\{T:T\subseteq S\}.
$$

For $S=\{1,2,3\}$,

$$
\mathcal{P}(S)=\{\varnothing,\{1\},\{2\},\{3\},\{1,2\},\{1,3\},\{2,3\},\{1,2,3\}\}.
$$

If $|S|=k$ is finite, then $|\mathcal{P}(S)|=2^k$. Associate each subset with a $k$-bit string whose $i$th bit is $1$ exactly when the $i$th element is included. For example, $\{1,3\}\subseteq\{1,2,3\}$ corresponds to $101$.

There are two choices for each of $k$ bit positions, giving $2^k$ subsets. For infinite countable sets, a related diagonal argument shows that the power set is not countable.

### Theorem 12.2 — The Power Set of the Natural Numbers Is Larger

$$
|\mathcal{P}(\mathbb{N})|>|\mathbb{N}|.
$$

#### Proof

Suppose, for contradiction, that there is a bijection

$$
f:\mathbb{N}\to\mathcal{P}(\mathbb{N}).
$$

Represent a subset of $\mathbb{N}$ by an **infinite** binary string, with one bit for each natural number. This differs from $\{0,1\}^*$, which contains only finite strings.

The source's example has the following rows, with diagonal bits bolded:

| $n$ | Bit 0 | Bit 1 | Bit 2 | Bit 3 | Bit 4 | Bit 5 | Further bits |
|---|---|---|---|---|---|---|---|
| $0$ | **1** | 0 | 0 | 0 | 0 | 0 | $\cdots$ |
| $1$ | 0 | **0** | 0 | 0 | 0 | 0 | $\cdots$ |
| $2$ | 1 | 0 | **1** | 0 | 0 | 0 | $\cdots$ |
| $\vdots$ | $\vdots$ | $\vdots$ | $\vdots$ | $\vdots$ | $\vdots$ | $\vdots$ | $\ddots$ |

These rows give $0\mapsto\{0\}$, $1\mapsto\varnothing$, and $2\mapsto\{0,2\}$. More generally, a $1$ in column $k$ of row $n$ means $k\in f(n)$.

Flip every diagonal bit, $1\mapsto0$ and $0\mapsto1$, obtaining a binary string $b$.

First, $b$ represents a subset of $\mathbb{N}$ because it is an infinite binary string with one membership bit for each natural number.

Next, suppose $b$ is the $n$th row. Its $n$th bit differs from that row's $n$th bit by construction, a contradiction.

Thus $b$ is absent from a list assumed to contain every subset of $\mathbb{N}$. Therefore, $\mathcal{P}(\mathbb{N})$ is uncountable, and its cardinality is strictly larger than that of $\mathbb{N}$.

### Cardinality of the Continuum

The cardinality of $\mathbb{N}$ is denoted $\aleph_0$, pronounced “aleph null.” The cardinality of $\mathcal{P}(\mathbb{N})$ is denoted $2^{\aleph_0}$.

In fact, $\mathcal{P}(\mathbb{N})$, $\mathbb{R}$, and $[0,1]$ have the same cardinality, denoted $\mathfrak{c}$, the **cardinality of the continuum**:

$$
2^{\aleph_0}=\mathfrak{c}>\aleph_0.
$$

Set theory defines further infinite cardinalities $\aleph_1,\aleph_2,\ldots$, with their own arithmetic. The **continuum hypothesis** asserts

$$
\mathfrak{c}=\aleph_1,
$$

equivalently, that no set has cardinality strictly between that of the natural numbers and that of the reals.
