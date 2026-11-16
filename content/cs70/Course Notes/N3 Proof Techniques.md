---
title: N3 Proof Techniques
Content Type: Course Notes
Content Area: Discrete Mathematics
description: Proof by contraposition, proof by contradiction, proof by cases, common proof-writing errors, and general advice for constructing rigorous proofs.
Course: CS 70
pinned: false
Date Published: September 7, 2026
Last Updated: September 7, 2026
Status: Finalized
---

# N3 Proof Techniques
This note introduces three major proof techniques: **contraposition**, **contradiction**, and **proof by cases**. It also discusses common mistakes in proofs and general principles for writing rigorous mathematical arguments.

## 1. Proof by Contraposition
Recall that any implication

$$
P \implies Q
$$

is logically equivalent to its contrapositive

$$
\neg Q \implies \neg P.
$$

Sometimes the contrapositive is substantially easier to prove than the original implication. A proof by contraposition therefore proves $\neg Q \implies \neg P$ instead of proving $P \implies Q$ directly.

> [!important] Proof by Contraposition
> **Goal:** Prove $P \implies Q$.
> **Approach:** Assume $\neg Q$ and derive $\neg P$.
> **Conclusion:** $\neg Q \implies \neg P$, which is logically equivalent to $P \implies Q$.

### Theorem 3.1 — Divisors of Odd Integers
Let $n$ be a positive integer and let $d$ divide $n$. If $n$ is odd, then $d$ is odd.

A direct proof is awkward because assuming that $n$ is odd does not immediately reveal much about $d$. The contrapositive is easier.

> [!tip] Concept Check
> What is the contrapositive of Theorem 3.1?
> **Answer:** If $d$ is even, then $n$ is even.

#### Proof
We proceed by contraposition.
Assume that $d$ is even. By definition of evenness,

$$
d = 2k
$$

for some $k \in \mathbb{Z}$.
Because $d \mid n$, there exists some $l \in \mathbb{Z}$ such that

$$
n = dl.
$$

Combining these statements gives

$$
n = dl = (2k)l = 2(kl).
$$

Since $kl \in \mathbb{Z}$, $n$ is even.
Therefore, if $d$ is even, then $n$ is even. This proves the contrapositive, so the original statement follows.

> [!note] Proof-Writing Practice
> State the proof technique at the beginning of a proof. Doing so makes the logical structure of the argument easier for the reader to follow.

### Theorem 3.2 — Pigeonhole Principle
Let $n$ and $k$ be positive integers. Place $n$ objects into $k$ boxes. If

$$
n > k,
$$

then at least one box must contain multiple objects.

The name comes from imagining the $n$ objects as pigeons and the $k$ boxes as pigeonholes.

#### Proof
We proceed by contraposition.
Suppose every box contains at most one object.
Then the total number of objects cannot exceed the total number of boxes:

$$
n \leq k.
$$

Therefore,

$$
n > k \implies \text{at least one box contains multiple objects}.
$$

The usefulness of the Pigeonhole Principle is that its conclusion does not depend on how the objects are distributed among the boxes.

### Pigeonhole Principle Example
Suppose no person has more than $500{,}000$ hairs on their head.
There are therefore at most $500{,}001$ possible numbers of hairs if zero hairs is included.
Since the population of San Francisco exceeds $800{,}000$, there are more people than possible hair counts.
By the Pigeonhole Principle, at least two people in San Francisco must have exactly the same number of hairs on their heads.
The argument establishes that such a pair exists but does not determine what their common hair count is.

---

## 2. Proof by Contradiction
In a proof by contradiction, assume that the statement to be proved is false. Then show that this assumption logically leads to an impossible statement - a contradiction.
Because the assumption produces a contradiction, the assumption must have been false, so the original statement must be true.

> [!important] Proof by Contradiction
> **Goal:** Prove $P$.
> **Approach:** Assume $\neg P$. Derive some statement $R$ and also derive $\neg R$.
> **Conclusion:** The assumption $\neg P$ leads to $R \land \neg R$, which is impossible. Therefore, $P$ is true.

Formally, a contradiction proof establishes

$$
\neg P \implies (\neg R \land R).
$$

Because $\neg R \land R$ is always false,

$$
\neg P \implies \mathrm{False}.
$$

Taking the contrapositive gives

$$
\mathrm{True} \implies P,
$$

so $P$ must be true.

> [!tip] Concept Check
> Proof by contradiction relies on the principle that if a proposition is not false, then it must be true.

### Theorem 3.3 — Infinitely Many Primes
There are infinitely many prime numbers.
This theorem dates back more than two thousand years to Euclid.

A direct proof would require somehow constructing infinitely many prime numbers. Contradiction gives a simpler route: assume there are only finitely many primes and show that this assumption is impossible.

### Lemma 3.1
Every natural number greater than one is either prime or has a prime divisor.

The proof of this lemma is deferred until induction is introduced.

### Proof of Theorem 3.3
We proceed by contradiction.
Suppose there are only finitely many prime numbers. Assume there are exactly $k$ of them:

$$
p_1,p_2,p_3,\ldots,p_k.
$$

Define

$$
q := p_1p_2p_3\cdots p_k + 1.
$$

Because $q$ is larger than every prime in the assumed complete list, $q$ cannot itself be one of $p_1,\ldots,p_k$.
By Lemma 3.1, $q$ must therefore have some prime divisor $p$.
Let this fact be the statement $R$:

$$
p \mid q.
$$

Since $p_1,\ldots,p_k$ were assumed to contain **all** prime numbers, $p$ must equal one of them.
Therefore,

$$
p \mid p_1p_2\cdots p_k.
$$

Define

$$
r := p_1p_2\cdots p_k.
$$

We have

$$
p \mid q
$$

and

$$
p \mid r.
$$

Therefore,

$$
p \mid (q-r).
$$

But

$$
q-r
=
(p_1p_2\cdots p_k+1)
-
p_1p_2\cdots p_k
=
1.
$$

Thus,

$$
p \mid 1,
$$

which implies

$$
p=1.
$$

But $1$ is not prime.
We have therefore concluded both that $p$ is prime and that $p$ is not prime, giving

$$
R \land \neg R.
$$

This is a contradiction.
Therefore, there must be infinitely many prime numbers.

### Rational and Irrational Numbers
A **rational number** is a number that can be expressed as the ratio of two integers:

$$
\frac{a}{b},
\qquad
a,b\in\mathbb{Z},
\qquad
b\neq0.
$$

For example,

$$
\frac23,\qquad \frac35,\qquad \frac9{16}
$$

are rational.
A number that cannot be written as a ratio of two integers is **irrational**.

### Theorem 3.4 — Irrationality of $\sqrt{2}$
The number

$$
\sqrt{2}
$$

is irrational.

Contradiction is particularly useful when proving that something **does not exist**.
For Theorem 3.3, the goal was effectively to show that a largest prime does not exist.
For Theorem 3.4, the goal is to show that integers $a$ and $b$ representing $\sqrt2$ as a reduced fraction do not exist.

### Lemma 3.2
If

$$
a^2
$$

is even, then $a$ is even.

### Proof of Theorem 3.4
We proceed by contradiction.
Assume that $\sqrt2$ is rational.
By the definition of a rational number, there exist integers $a$ and $b$, with $b\neq0$, such that

$$
\sqrt2=\frac ab,
$$

where $a$ and $b$ have no common factor other than $1$.
Let $R$ be the assertion that $a$ and $b$ have no common factors.

Square both sides:

$$
2=\frac{a^2}{b^2}.
$$

Multiplying by $b^2$ gives

$$
a^2=2b^2.
$$

Because $b\in\mathbb{Z}$, $b^2\in\mathbb{Z}$.
Therefore, $a^2$ is even.
By Lemma 3.2, $a$ must also be even.
Thus, for some $c\in\mathbb{Z}$,

$$
a=2c.
$$

Substituting into $a^2=2b^2$ gives

$$
(2c)^2=2b^2,
$$

so

$$
4c^2=2b^2.
$$

Dividing by $2$ gives

$$
b^2=2c^2.
$$

Therefore, $b^2$ is even.
Applying Lemma 3.2 again shows that $b$ is even.
Thus, both $a$ and $b$ are even, so they share the common factor $2$.
This contradicts the assumption that $a$ and $b$ have no common factor other than $1$:

$$
R \land \neg R.
$$

Therefore, our original assumption was false, and

$$
\sqrt2
$$

is irrational.

---

## 3. Proof by Cases
Sometimes we want to prove a statement but do not know which of several possible situations is true.
If we know that at least one of those cases must occur, we can prove the result separately in every possible case.
If the desired conclusion follows in all cases, then it holds generally.

### Theorem 3.5
There exist irrational numbers $x$ and $y$ such that

$$
x^y
$$

is rational.

#### Proof
We proceed by cases.
Because the theorem uses an existential quantifier, it is enough to demonstrate a single pair of irrational numbers $x$ and $y$ for which $x^y$ is rational.
Consider

$$
\sqrt2^{\sqrt2}.
$$

Exactly one of the following must be true:
1. $\sqrt2^{\sqrt2}$ is rational.
2. $\sqrt2^{\sqrt2}$ is irrational.

**Case (a):** Suppose

$$
\sqrt2^{\sqrt2}
$$

is rational.
Set

$$
x=\sqrt2
\qquad\text{and}\qquad
y=\sqrt2.
$$

Both $x$ and $y$ are irrational, while

$$
x^y=\sqrt2^{\sqrt2}
$$

is rational.
Therefore, the theorem holds.

**Case (b):** Suppose instead that

$$
\sqrt2^{\sqrt2}
$$

is irrational.
Set

$$
x=\sqrt2^{\sqrt2}
\qquad\text{and}\qquad
y=\sqrt2.
$$

Both $x$ and $y$ are irrational.
Then

$$
\begin{aligned}
x^y
&=
\left(\sqrt2^{\sqrt2}\right)^{\sqrt2} \\
&=
\sqrt2^{\sqrt2\sqrt2} \\
&=
\sqrt2^2 \\
&=
2.
\end{aligned}
$$

The second equality follows from

$$
(x^y)^z=x^{yz}.
$$

Thus $x^y$ is rational in this case as well.
Since either Case (a) or Case (b) must hold, there exist irrational numbers $x$ and $y$ such that $x^y$ is rational.

### Non-Constructive Proofs
The proof above establishes that suitable $x$ and $y$ **exist**, but it does not identify which pair actually works.
If $\sqrt2^{\sqrt2}$ is rational, the pair is

$$
x=\sqrt2,
\qquad
y=\sqrt2.
$$

If $\sqrt2^{\sqrt2}$ is irrational, the pair is

$$
x=\sqrt2^{\sqrt2},
\qquad
y=\sqrt2.
$$

The proof does not determine which case is true.
A proof that establishes the existence of an object without explicitly constructing the object is called a **non-constructive proof**.

---

## 4. Common Errors When Writing Proofs
Writing rigorous proofs requires organizing reasoning into a coherent logical sequence.
The following examples illustrate several common mistakes.

### Claim 3.1 — Assuming What You Want to Prove
Consider the false claim

$$
-2=2.
$$

#### Incorrect Proof
Assume

$$
-2=2.
$$

Squaring both sides gives

$$
(-2)^2=2^2,
$$

so

$$
4=4,
$$

which is true.
Therefore, $-2=2$.

#### Error
The proof began by assuming the exact statement it was supposed to prove.
If

$$
P\equiv ``-2=2",
$$

the argument merely established

$$
P\implies\mathrm{True}.
$$

That does **not** prove $P$.

> [!warning] Lesson 1
> Never assume the claim that you are trying to prove.

### Claim 3.2 — Dividing by Zero
Consider the false claim

$$
1=2.
$$

#### Incorrect Proof
Assume $x=y$ for integers $x,y\in\mathbb{Z}$.
Then

$$
\begin{aligned}
x^2-xy &= x^2-y^2 \\
x(x-y) &= (x+y)(x-y) \\
x &= x+y \\
x &= 2x.
\end{aligned}
$$

Setting

$$
x=y=1
$$

would then appear to imply

$$
1=2.
$$

#### Error
The transition

$$
x(x-y)=(x+y)(x-y)
$$

to

$$
x=x+y
$$

divides both sides by $x-y$.
But since $x=y$,

$$
x-y=0.
$$

Division by zero is undefined, so this step is invalid.

> [!warning] Lesson 2
> Always consider whether a variable or expression may equal zero before dividing by it.

### Claim 3.3 — Squaring Inequalities
Consider the false claim

$$
4\leq1.
$$

#### Incorrect Proof
We know

$$
-2\leq1.
$$

Squaring both sides appears to give

$$
4\leq1.
$$

#### Error
Squaring does not always preserve the ordering of two numbers.
For example,

$$
-2\leq1,
$$

but

$$
|-2|>|1|.
$$

Therefore,

$$
(-2)^2>1^2.
$$

> [!warning] Lesson 3
> Be careful when combining negative numbers with inequalities. Squaring does not necessarily preserve an inequality.

Also remember that multiplying or dividing an inequality by a negative number reverses its direction.
For example,

$$
-2<5
$$

implies, after multiplying by $-1$,

$$
2>-5.
$$

---

## 5. Style and Substance in Proofs
Every step in a proof should have a logical justification.
Before writing the next step, you should be able to explain why it follows from previous statements.
In principle, each step should ultimately be justified using a definition, theorem, or general axiom.
In practice, the level of detail required depends on whether the justification is sufficiently obvious to the intended reader.

For example, a proof might state:

> Since $a$ is an integer, $2a^2+2a$ is an integer.

This could be broken into smaller steps using closure properties of the integers, but that level of detail is often unnecessary.
A justification may safely be left unstated only when you are confident that it is both correct and immediately clear to the reader.

### Lemmas
In the proof that $\sqrt2$ is irrational, the result

$$
n^2\text{ even}\implies n\text{ even}
$$

was used twice.
A subsidiary result that is useful in proving a more complex result is called a **lemma**.
Breaking a long proof into lemmas is analogous to breaking a large program into smaller subroutines.
Whenever possible, a lemma should be stated generally enough that it can be reused elsewhere.

### Lemmas vs. Theorems
The distinction between a lemma and a theorem is not absolute.
In mathematical writing, **theorems** are often the main results intended to be exported or emphasized, while **lemmas** are supporting propositions used within their proofs.
Some lemmas nevertheless become more famous or important than the theorems they were originally introduced to support.

> [!important] Main Takeaway
> The central purpose of this note is not the particular mathematical statements that were proved. The important ideas are the proof strategies themselves and the logical structures underlying them.

The major proof strategies introduced are:
- **Contraposition:** To prove $P\implies Q$, prove $\neg Q\implies\neg P$.
- **Contradiction:** Assume the desired conclusion is false and derive an impossibility.
- **Cases:** Divide the possible situations into exhaustive cases and prove the desired result in every case.

---

## 6. Exercises
1. Generalize the proof of the sum-of-digits theorem from Note 1 so that it works for any positive integer $n$. **Hint:** Suppose $n$ has $k$ digits, and write $a_i$ for the digits of $n$, so that

$$
n=\sum_{i=0}^{k-1} a_i10^i.
$$

2. Prove Lemma 3.2: if $a^2$ is even, then $a$ is even. First try a direct proof, then try a proof by contraposition. Determine which approach is better suited to the statement.
#academic/year-3/cs70/course-notes