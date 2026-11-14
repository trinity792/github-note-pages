---
title: L4 Induction
Content Type: Lecture
Content Area:
Course: CS70
description: "The lecture reviewed proof by cases and introduced mathematical induction through sums of odd numbers, the domino analogy, and the connection to recursion. It emphasized the necessity of a base case, developed the inductive hypothesis and inductive step, and began motivating strong induction through prime factorizations."
pinned: false
Date Published: September 8, 2026
Last Updated: September 8, 2026
Status: Finalized
---

# L4 Induction

## Executive Summary

The lecture first reviewed proof by cases as a flexible way to divide a universe into exhaustive subcollections, such as even and odd integers. It then used the sum of the first positive odd numbers to motivate proof by induction, beginning with small examples and a picture of nested L-shaped layers forming squares.

A proof by induction has two essential parts. The base case establishes that at least one proposition is true, while the inductive step proves that whenever $P(k)$ is true, $P(k+1)$ is also true. The lecture explained these parts through falling dominoes and showed, using a deliberately false parity claim, why an inductive step without a valid base case proves neither the desired universal statement nor that any domino actually falls.

The lecture concluded by connecting induction to recursion, beginning a divisibility exercise, and introducing strong induction. Strong induction assumes all earlier cases through $k$, rather than only $P(k)$, and was motivated through an incomplete proof that every integer at least $2$ is prime or a product of primes.

---

## Course Logistics and Approach to Learning Proofs

The midterm was announced for Thursday, October 15, at approximately 7 p.m., rather than the Friday-night time used previously. The instructor said that much of the midterm could be passed by doing the quizzes through that point, while the final would include synthesis questions.

The proof techniques introduced so far were described as fundamental tools that would be used throughout the rest of the course:

- Direct proof.
- Proof by contrapositive.
- Proof by contradiction.
- Proof by cases.

The instructor emphasized that familiarity with these techniques would develop through lectures, discussion sessions, and group work. The course pace would increase to its normal speed after the first two lectures had been stretched into three.

The proofs that $\sqrt{2}$ is irrational and that there are infinitely many primes were said to be available in the notes. The latter was also identified as a stretch problem on the homework.

### Making the non-obvious obvious

The instructor characterized much of mathematics as the process of making a non-obvious fact obvious by repeatedly rewriting it without changing its truth.

For example, the equations

$$
x^2-5x+6=0
$$

and

$$
(x-2)(x-3)=0
$$

describe the same condition. Expanding the second expression gives

$$
(x-2)(x-3)
= x^2-2x-3x+6
= x^2-5x+6.
$$

The factored form makes the roots easier to see. The mathematical work consists of transforming the original expression into an equivalent form that is easier to understand.

The instructor connected this view to learning: knowing an answer prematurely is less valuable than developing experience with a problem, getting stuck, stepping away, returning, and forming specific questions. A question creates an “answer-sized shelf” on which the eventual explanation can remain.

---

## Proof by Cases

Proof by cases was presented as more informal than direct proof, contrapositive, or contradiction. Direct proof and contrapositive have a standard implication structure involving $P\implies Q$. By contrast, proof by cases asks how the problem’s universe can be divided into classes that give the objects more useful structure.

The central requirement is that the cases cover the entire universe under consideration.

### Dividing the integers into even and odd cases

For an integer-valued expression involving $n$, the instructor suggested splitting the proof into these two cases:

1. $n$ is odd, so there exists an integer $k$ such that
   $$
   n=2k+1.
   $$

2. $n$ is even, so there exists an integer $k$ such that
   $$
   n=2k.
   $$

This is useful because an arbitrary integer $n$ may provide too little algebraic structure, whereas the forms $2k+1$ and $2k$ expose parity directly.

The example began with the expression

$$
3n^2-n+5.
$$

For odd $n$, the intended substitution was

$$
n=2k+1.
$$

For even $n$, the intended substitution was

$$
n=2k.
$$

The instructor explained that the resulting expression should be algebraically rearranged into the form

$$
2j+1
$$

for some integer $j$ when proving oddness. However, several displayed substitutions were transcribed with a constant term of $3$ rather than $5$. The instructor later corrected this explicitly, saying that the constant had always been $5$. The omitted algebra was not completed during the lecture.

### Why the cases prove a universal statement

Even and odd integers partition the integers:

- Every integer is either even or odd.
- No integer lies outside both cases.

Therefore, proving the desired result in the even case and in the odd case proves it for every integer.

Other case divisions are possible, but they must still cover the universe. For example, “positive” and “negative” do not cover $0$. One could instead use “nonnegative” and “negative.” In the even-odd partition, $0$ is already covered because

$$
0=2\cdot 0,
$$

so $0$ is even.

### Why a constant term alone does not settle parity

The instructor cautioned against deciding that an expression is odd merely because it ends with $+5$. To prove oddness using the definition, the full expression must be written as

$$
2j+1
$$

for some integer $j$.

A form such as

$$
4j+1
$$

always produces an odd number, but it does not produce every odd number. For instance, it can produce $5$, but no integer $j$ makes $4j+1=3$. More generally, an unexamined part of the expression could combine with $5$ to produce an even value, such as $7+5=12$. The proof must therefore use the exact definition and account for the entire expression.

---

## Discovering a Pattern in Sums of Odd Numbers

The lecture’s central example asked for

$$
1+3+5+7+\cdots+99.
$$

Rather than beginning with a general formula, the instructor encouraged a mathematical reflex: inspect small cases and use them to conjecture a pattern.

### Small cases

The first few partial sums are

$$
1+3=4=2^2,
$$

$$
1+3+5=9=3^2,
$$

and

$$
1+3+5+7=16=4^2.
$$

Continuing the apparent pattern suggests

$$
1+3+5+7+9=25=5^2.
$$

Including the smallest case also gives

$$
1=1^2.
$$

These examples suggest the natural-language conjecture:

> The sum of the first $n$ positive odd numbers is $n^2$.

Because $99$ is the fiftieth positive odd number, the original sum is conjectured to be

$$
50^2.
$$

### Formalizing the conjecture

The $i$th positive odd number is

$$
2i-1.
$$

The instructor checked the sign using a small example. When $i=2$,

$$
2(2)-1=3,
$$

so the correct expression is $2i-1$, not $2i+1$.

The conjecture can therefore be written as

$$
\sum_{i=1}^{n}(2i-1)=n^2
$$

for every positive natural number $n$.

The summation notation was compared to a loop in computer science. It begins at $i=1$, increments $i$, evaluates $2i-1$, and adds each resulting value. Thus it generates

$$
1+3+5+\cdots+(2n-1).
$$

### Why the earlier proof techniques were not selected

Direct proof and proof by contrapositive were not chosen because the conjecture was not initially presented as an implication $P\implies Q$. Contradiction was considered possible in principle, but negating the equality did not appear to give a useful definition or algebraic object to manipulate. Proof by cases also did not provide a natural division of the problem.

This motivated a new technique: proof by induction.

---

## The Picture Behind the Induction Proof

The instructor first developed a geometric intuition.

Nine dots can be arranged in a $3$-by-$3$ square, making it visually immediate that there are

$$
3^2=9
$$

dots. The same square can be decomposed into successive L-shaped layers containing

$$
1,\quad 3,\quad 5
$$

dots. Thus the picture simultaneously represents

$$
1+3+5
$$

and

$$
3^2.
$$

A $4$-by-$4$ square similarly consists of L-shaped layers containing

$$
1,\quad 3,\quad 5,\quad 7
$$

dots. Adding the next L-shaped layer enlarges a $k$-by-$k$ square into a $(k+1)$-by-$(k+1)$ square.

The instructor called this a “proof by picture,” while noting that the picture was not the formal proof technique being introduced. Its purpose was to expose the structure that the formal proof would express.

---

## Proof by Induction for the Sum of Odd Numbers

The induction argument formalizes the idea that if the pattern holds for one square, adding the next odd-numbered layer produces the next square.

Let

$$
P(n):\quad 1+3+5+\cdots+(2n-1)=n^2.
$$

The goal is to prove $P(n)$ for every positive natural number $n$.

### Base case

Because the statement begins with the positive natural numbers, the base case is $n=1$:

$$
1=1^2.
$$

This verifies $P(1)$.

### Inductive hypothesis

Choose a positive natural number $k$ and assume that $P(k)$ is true:

$$
1+3+5+\cdots+(2k-1)=k^2.
$$

This assumption is the inductive hypothesis. It represents an existing $k$-by-$k$ square.

### Inductive step

To establish $P(k+1)$, include the next odd number. The next term after $2k-1$ is

$$
2k+1.
$$

Therefore,

$$
1+3+5+\cdots+(2k-1)+(2k+1).
$$

By the inductive hypothesis, the portion through $2k-1$ equals $k^2$. Substituting gives

$$
k^2+2k+1.
$$

Factor the expression:

$$
k^2+2k+1=(k+1)(k+1)=(k+1)^2.
$$

Hence,

$$
1+3+5+\cdots+(2k-1)+(2k+1)=(k+1)^2.
$$

This is exactly $P(k+1)$. Together with the base case, the inductive step proves the conjecture for every positive natural number.

---

## The General Structure of Induction

The target of a typical induction proof is a statement of the form

$$
\forall n\in\mathbb N,\;P(n),
$$

where $P(n)$ is a predicate - a statement whose truth depends on the value substituted for $n$.

For example, in the odd-number sum,

$$
P(n):\quad \sum_{i=1}^{n}(2i-1)=n^2.
$$

Substituting a particular natural number produces a proposition that can be true or false.

An induction proof has three named components.

### Base case

Prove the first required instance, such as

$$
P(0)
$$

or

$$
P(1),
$$

depending on where the theorem’s domain begins.

### Inductive hypothesis

Choose some $k$ in the relevant domain and assume

$$
P(k).
$$

The inductive hypothesis is an assumption used inside the inductive step. It is not independently proved at that moment.

### Inductive step

Use the assumption $P(k)$ to prove

$$
P(k+1).
$$

Equivalently, prove the implication

$$
P(k)\implies P(k+1).
$$

This implication is itself established by direct proof: assume the antecedent $P(k)$ and derive the consequent $P(k+1)$.

### The domino interpretation

Each proposition

$$
P(0),P(1),P(2),\ldots
$$

is represented by a domino.

The inductive step sets up the dominoes by proving that whenever one falls, the next falls:

$$
P(k)\implies P(k+1).
$$

The base case knocks over the first domino. Once $P(0)$ is established, the inductive implication yields $P(1)$; then $P(1)$ yields $P(2)$; and the process continues through all natural numbers.

For example, $P(k+2)$ follows after $P(k+1)$ because the same implication can be applied again, treating $k+1$ as the current index.

---

## Why the Base Case Is Essential

The lecture demonstrated the danger of omitting the base case with the false conjecture

$$
\forall n\in\mathbb N,\quad 8n+3\text{ is even}.
$$

The proposed induction argument appeared to establish the inductive step despite the fact that the universal claim is false.

### The misleading inductive step

Assume, for some $k\in\mathbb N$, that

$$
8k+3
$$

is even. By the definition of evenness, there exists an integer $j$ such that

$$
8k+3=2j.
$$

Now consider the next case:

$$
8(k+1)+3.
$$

Expanding gives

$$
8(k+1)+3=8k+8+3.
$$

Rearrange:

$$
8k+8+3=(8k+3)+8.
$$

Apply the inductive hypothesis:

$$
(8k+3)+8=2j+8.
$$

Factor out $2$:

$$
2j+8=2(j+4).
$$

Since $j+4$ is an integer, $8(k+1)+3$ is even. Thus the implication

$$
8k+3\text{ is even}
\implies
8(k+1)+3\text{ is even}
$$

has been proved.

### The contradiction with a concrete value

For $n=1$,

$$
8(1)+3=11,
$$

which is not even. In fact, the instructor stated that $8n+3$ is never even for a natural number $n$.

The flaw is not in the algebra of the implication. The flaw is the absence of a true base case. The argument says only that if one domino ever falls, then the next one falls. It does not establish that any domino falls.

The implication is vacuously true because its antecedent, “$8k+3$ is even,” is never fulfilled. What was proved is only the conditional relationship between consecutive cases, not the universal parity claim.

### Starting from a false assumption

The instructor used this example to emphasize that a false assumption can lead to arbitrary conclusions. A story about Bertrand Russell illustrated the point informally: beginning with $0=1$, one can add $1$ to both sides to obtain $1=2$. If Russell and God are two beings but $2=1$, the story concludes that they are one and the same. The point was that a proof must not begin from an unsupported false assumption.

---

## Choosing the Base Case

The base case depends on the domain of the theorem.

If the statement is

$$
\forall n\in\mathbb N,\;P(n)
$$

and the course’s natural numbers begin at $0$, the base case is typically $P(0)$.

If the statement is about positive natural numbers, the base case may be $P(1)$.

If the theorem instead says

$$
\forall n\ge 3,\;P(n),
$$

the first domino is $P(3)$, so the base case should begin at $n=3$.

The important point is not that induction must always begin at $0$ or always begin at $1$. The proof must establish the first value included in the stated domain.

---

## Formal Induction Principle

The lecture presented the induction principle in the form

$$
\forall n\in\mathbb N,\;P(n)
$$

as equivalent to establishing both

$$
P(0)
$$

and

$$
\forall k\in\mathbb N,\quad P(k)\implies P(k+1).
$$

The first part is the base case. The second part combines the inductive hypothesis and the inductive step:

- Assume $P(k)$.
- Prove $P(k+1)$.

The two-part terminology separates the stages of the direct proof, but formally the induction step proves the implication $P(k)\implies P(k+1)$.

---

## Connection Between Induction and Recursion

The structure of induction was compared to recursion in computer science.

A recursive algorithm repeatedly reduces a problem until it reaches a base case, then resolves the calls back up through the recursion. An induction proof begins with a base case and proves that validity propagates from one natural number to the next.

The instructor said that the correctness of a recursive algorithm is typically proved by induction because both structures depend on:

- A base case.
- A relationship between one instance and the next.

---

## Divisibility Example

The lecture began an induction proof of the conjecture

$$
\forall n\in\mathbb N,\quad 3\mid n^3+2n.
$$

Here, $3\mid n^3+2n$ means that $3$ divides $n^3+2n$.

### Base case

Set $n=0$:

$$
0^3+2(0)=0.
$$

Since $3$ divides $0$, the base case holds.

### Inductive hypothesis

Choose $k\in\mathbb N$ and assume

$$
3\mid k^3+2k.
$$

By the definition of divisibility, this means that there exists an integer $j$ such that

$$
k^3+2k=3j.
$$

These notes momentarily states $3k$ at the end of this definition, but the introduced witness was $j$; the spoken derivation is therefore inconsistent at this point.

### Intended inductive target

The next task would be to prove

$$
3\mid (k+1)^3+2(k+1).
$$

The instructor supplied the identity

$$
(a+b)^3=a^3+3a^2b+3b^2a+b^3
$$

as a hint for expanding the cubic term. The remainder of the inductive step was deliberately left unfinished.

---

## Motivation for Strong Induction

The final topic was the Fundamental Theorem of Arithmetic, stated in the lecture as:

> For every natural number $n\ge 2$, $n$ is prime or a product of primes.

The instructor used this theorem to show why assuming only $P(k)$ may not provide enough information.

### Base case

For $n=2$, the statement holds because $2$ is prime.

### Considering the next value

The proof then considers $k+1$ and divides the reasoning into cases.

#### Case 1: $k+1$ is prime

If $k+1$ is prime, the desired conclusion already holds.

#### Case 2: $k+1$ is not prime

If $k+1$ is not prime, the instructor said there exists a natural-number divisor $d$ such that

$$
d\mid k+1,
$$

with $d\ne 1$ and $d\ne k+1$.

By the definition of divisibility, there exists a natural number $j$ such that

$$
k+1=dj.
$$

The intended next observation was that $d$ and $j$ are smaller than $k+1$. To conclude that each is prime or a product of primes, the proof needs information about earlier numbers such as $d$ and $j$, not merely information about the single number $k$.

### Strong inductive hypothesis

Strong induction strengthens the hypothesis. Instead of assuming only

$$
P(k),
$$

it assumes that every earlier proposition through $k$ is true:

$$
P(j)\text{ is true for every }j\le k.
$$

In the domino analogy, ordinary induction assumes that the immediately preceding domino has fallen. Strong induction assumes that every domino up to the current point has fallen.

This stronger hypothesis would allow the factorization argument to use the statements associated with $d$ and $j$. These notes ended before the proof was completed.

The instructor also stated that ordinary induction and strong induction are equivalent in power: each can be proved from the other.

---

## Unclear or Incomplete Steps

- The proof-by-cases example begins with $3n^2-n+5$, but several substitutions use $+3$. The instructor later corrected the expression and said the constant had always been $5$. The target proposition is not fully audible, although the subsequent discussion indicates that the goal involved proving oddness by reaching the form $2j+1$. The required algebra was omitted in class.
- During the predicate discussion, some substituted examples were garbled. These notes include conflicting statements such as “$P(1)$ is equal to $1+3$ equals $5$” followed by a correction involving $P(0)$ and then $1+3=4$. These fragments cannot be reconstructed into one reliable sequence beyond the general explanation that substituting a value into a predicate produces a proposition.
- In the divisibility example, the instructor introduces an integer $j$ but these notes record $k^3+2k=3k$. This appears internally inconsistent, so the exact spoken equation is preserved as uncertain rather than silently repaired.
- The induction proof that $3\mid n^3+2n$ was not completed. Only the base case, inductive hypothesis, target, and cubic-expansion hint were given.
- The strong-induction proof that every $n\ge 2$ is prime or a product of primes ended before the factors $d$ and $j$ were formally handled and before the final conclusion was derived.
#academic/year-3/cs70/lecture-notes