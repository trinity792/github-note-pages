---
title: N0 N1 Sets, Mathematical Notation, and Direct Proof
Content Type: Course Notes
Content Area: Discrete Mathematics
description: Review of sets and mathematical notation, followed by the foundations of mathematical proof and the direct proof technique.
Course: CS 70
pinned: false
Date Published: September 7, 2026
Last Updated: September 7, 2026
Status: Finalized
---

# N0 N1 Sets, Mathematical Notation, and Direct Proof
These notes review basic set notation and mathematical notation before introducing mathematical proofs and the technique of **direct proof**.

## 1. Sets
A **set** is a well-defined collection of objects. The objects in a set are called its **elements** or **members**.

Sets are usually denoted by capital letters and can be specified by listing their elements inside curly braces.

For example, let $A$ be the set containing the first five prime numbers:

$$
A=\{2,3,5,7,11\}.
$$

If $x$ is an element of $A$, we write

$$
x\in A.
$$

If $y$ is not an element of $A$, we write

$$
y\notin A.
$$

### Equality of Sets
Two sets $A$ and $B$ are equal if they contain exactly the same elements.

The order and repetition of elements do not matter. For example,

$$
\{\text{red},\text{white},\text{blue}\}
=
\{\text{blue},\text{white},\text{red}\}
=
\{\text{red},\text{white},\text{white},\text{blue}\}.
$$

### Set-Builder Notation
More complicated sets can be defined using **set-builder notation**.

For example, the rational numbers are

$$
\mathbb{Q}
=
\left\{
\frac{a}{b}
\mid
a,b\in\mathbb{Z},\ b\neq0
\right\}.
$$

In words:

> The set of all fractions whose numerator is an integer and whose denominator is a nonzero integer.

### Cardinality
The **cardinality** of a set is its size.

If

$$
A=\{1,2,3,4\},
$$

then

$$
|A|=4.
$$

A set may have cardinality $0$. The unique set with no elements is called the **empty set**:

$$
\varnothing.
$$

Sets may also have infinitely many elements, such as the integers, prime numbers, or odd numbers.

### Subsets and Proper Subsets
If every element of $A$ is also an element of $B$, then $A$ is a **subset** of $B$:

$$
A\subseteq B.
$$

Equivalently,

$$
B\supseteq A.
$$

A **proper subset** of $B$ is a subset that does not equal $B$:

$$
A\subset B.
$$

For example, if

$$
B=\{1,2,3,4,5\},
$$

then

$$
\{1,2,3\}\subset B
$$

and

$$
\{1,2,3\}\subseteq B.
$$

However,

$$
\{1,2,3,4,5\}\subseteq B
$$

but it is not a proper subset of $B$.

Important subset properties include:

$$
\varnothing\subset A
$$

for every nonempty set $A$,

$$
\varnothing\subseteq B
$$

for every set $B$, and

$$
A\subseteq A.
$$

---

## 2. Set Operations
Sets can be combined or compared using several standard operations.

### Intersection
The **intersection** of $A$ and $B$ contains all elements belonging to both sets:

$$
A\cap B.
$$

Two sets are **disjoint** if

$$
A\cap B=\varnothing.
$$

### Union
The **union** of $A$ and $B$ contains every element belonging to $A$, $B$, or both:

$$
A\cup B.
$$

For example, if $A$ is the set of positive even integers and $B$ is the set of positive odd integers, then

$$
A\cap B=\varnothing
$$

and

$$
A\cup B=\mathbb{Z}^+.
$$

Some basic properties are:

$$
A\cup B=B\cup A,
$$

$$
A\cup\varnothing=A,
$$

$$
A\cap B=B\cap A,
$$

and

$$
A\cap\varnothing=\varnothing.
$$

### Complements and Set Difference
The **relative complement** of $A$ in $B$, also called the **set difference**, is

$$
B\setminus A.
$$

It contains the elements belonging to $B$ but not $A$:

$$
B\setminus A
=
\{x\in B\mid x\notin A\}.
$$

For example, if

$$
B=\{1,2,3\}
$$

and

$$
A=\{3,4,5\},
$$

then

$$
B\setminus A=\{1,2\}.
$$

Similarly,

$$
\mathbb{R}\setminus\mathbb{Q}
$$

is the set of irrational numbers.

Important properties include:

$$
A\setminus A=\varnothing,
$$

$$
A\setminus\varnothing=A,
$$

and

$$
\varnothing\setminus A=\varnothing.
$$

---

## 3. Important Number Sets
Several sets occur frequently enough to have standard symbols.

| Symbol | Set |
|---|---|
| $\mathbb{N}$ | Natural numbers: $\{0,1,2,3,\ldots\}$ |
| $\mathbb{Z}$ | Integers: $\{\ldots,-2,-1,0,1,2,\ldots\}$ |
| $\mathbb{Q}$ | Rational numbers |
| $\mathbb{R}$ | Real numbers |
| $\mathbb{C}$ | Complex numbers |

In this course,

$$
0\in\mathbb{N}.
$$

> [!note] Natural Number Convention
> Some definitions of $\mathbb{N}$ begin with $1$ instead of $0$. In CS 70, $0$ is considered a natural number.

The positive integers are denoted by

$$
\mathbb{Z}^+=\{1,2,3,\ldots\}.
$$

---

## 4. Cartesian Products and Power Sets
### Cartesian Product
The **Cartesian product** of sets $A$ and $B$ is

$$
A\times B
=
\{(a,b)\mid a\in A,\ b\in B\}.
$$

It contains ordered pairs whose first component comes from $A$ and whose second component comes from $B$.

For example, if

$$
A=\{1,2,3\}
$$

and

$$
B=\{u,v\},
$$

then

$$
A\times B
=
\{
(1,u),(1,v),
(2,u),(2,v),
(3,u),(3,v)
\}.
$$

Similarly,

$$
\mathbb{N}\times\mathbb{N}
$$

is the set of all ordered pairs of natural numbers.

### Power Set
The **power set** of a set $S$, denoted

$$
\mathcal{P}(S),
$$

is the set containing every subset of $S$:

$$
\mathcal{P}(S)
=
\{T\mid T\subseteq S\}.
$$

For example, if

$$
S=\{1,2,3\},
$$

then

$$
\mathcal{P}(S)
=
\{
\varnothing,
\{1\},
\{2\},
\{3\},
\{1,2\},
\{1,3\},
\{2,3\},
\{1,2,3\}
\}.
$$

If

$$
|S|=k,
$$

then

$$
|\mathcal{P}(S)|=2^k.
$$

> [!tip] Concept Check
> Why does a set with $k$ elements have exactly $2^k$ subsets?

---

## 5. Sums and Products
Sigma and product notation provide compact ways to write long sums and products.

### Summation Notation
Instead of writing

$$
1+2+\cdots+n,
$$

we write

$$
\sum_{i=1}^{n}i.
$$

More generally,

$$
f(m)+f(m+1)+\cdots+f(n)
$$

can be written as

$$
\sum_{i=m}^{n}f(i).
$$

For example,

$$
\sum_{i=5}^{n}i^2
=
5^2+6^2+\cdots+n^2.
$$

### Product Notation
Similarly,

$$
f(m)f(m+1)\cdots f(n)
$$

can be written as

$$
\prod_{i=m}^{n}f(i).
$$

For example,

$$
\prod_{i=1}^{n}i
=
1\cdot2\cdots n.
$$

---

## 6. Universal and Existential Quantifiers
A quantifier specifies how a variable ranges over a set.

### Universal Quantifier
The symbol

$$
\forall
$$

means **for all**.

For example,

$$
(\forall n\in\mathbb{N})
(n^2+n+41\text{ is prime})
$$

means:

> For every natural number $n$, $n^2+n+41$ is prime.

This statement is false, even though it holds for many small values of $n$.

### Existential Quantifier
The symbol

$$
\exists
$$

means **there exists**.

For example,

$$
(\exists x\in\mathbb{Z})
(x<2\land x^2=4)
$$

means:

> There exists an integer $x$ less than $2$ whose square equals $4$.

This statement is true because

$$
x=-2
$$

satisfies both conditions.

### Quantifier Order
Consider

$$
(\forall x\in\mathbb{Z})(\exists y\in\mathbb{Z})(y>x).
$$

This means:

> Given any integer $x$, we can find an integer $y$ larger than $x$.

This statement is true.

Now consider

$$
(\exists y\in\mathbb{Z})(\forall x\in\mathbb{Z})(y>x).
$$

This means:

> There exists an integer $y$ larger than every integer $x$.

This claims that there is a largest integer, so it is false.

> [!important] Quantifier Order
> Changing the order of quantifiers can completely change the meaning and truth value of a mathematical statement.

---

## 7. Mathematical Proofs
In science, evidence is accumulated through experiments to support a statement. Mathematics aims for a stronger form of certainty: a **proof** guarantees that a mathematical statement is true.

Testing many examples does not prove a statement that concerns infinitely many cases.

For example, in computer science we might ask:
- Does a program $P$ halt on every input?
- Does a program $P$ correctly compute a function $f(x)$ for every input $x$?

Testing the program on many inputs gives evidence, but it cannot guarantee correct behavior on every possible input.

A rigorous proof can.

### Definition of a Proof
A **proof** is a finite sequence of logical deductions that establishes the truth of a desired statement.

> [!important] Why Proofs Matter
> A finite proof can establish the truth of a statement involving infinitely many cases.

Proofs begin with statements called **axioms** or **postulates**, which are accepted without proof.

From these axioms, we make a sequence of logical deductions. Each new statement must necessarily follow from the statements before it.

---

## 8. Basic Mathematical Facts
Several definitions and facts are used throughout the proof examples.

### Closure of the Integers
The integers are closed under addition and multiplication.

If

$$
a,b\in\mathbb{Z},
$$

then

$$
a+b\in\mathbb{Z}
$$

and

$$
ab\in\mathbb{Z}.
$$

The natural numbers are also closed under addition and multiplication.

### Divisibility
For integers $a$ and $b$, we say that **$a$ divides $b$**, written

$$
a\mid b,
$$

if and only if there exists an integer $q$ such that

$$
b=aq.
$$

For example,

$$
2\mid10
$$

because there exists

$$
q=5
$$

such that

$$
10=2\cdot5.
$$

### Prime Numbers
A natural number

$$
p\geq2
$$

is **prime** if it is divisible only by $1$ and itself.

### Definition Symbol
The notation

$$
:=
$$

means **is defined as**.

For example,

$$
q:=6
$$

defines $q$ to have the value $6$.

---

## 9. Direct Proof
A **direct proof** is used to prove implications of the form

$$
P\implies Q.
$$

At a high level, the proof begins by assuming $P$ and then uses logical deductions until $Q$ follows.

> [!important] Direct Proof
> **Goal:** Prove $P\implies Q$.
> **Approach:** Assume $P$.
> Use a sequence of justified deductions.
> **Conclusion:** Therefore, $Q$.

### Theorem 1.1
For any integers $a,b,c\in\mathbb{Z}$, if

$$
a\mid b
$$

and

$$
a\mid c,
$$

then

$$
a\mid(b+c).
$$

Using the predicate

$$
P(x,y)\equiv ``x\mid y",
$$

the theorem can be written as

$$
(\forall a,b,c\in\mathbb{Z})
\left(
(P(a,b)\land P(a,c))
\implies
P(a,b+c)
\right).
$$

### Proof of Theorem 1.1
Assume

$$
a\mid b
$$

and

$$
a\mid c.
$$

By the definition of divisibility, there exist integers $q_1$ and $q_2$ such that

$$
b=q_1a
$$

and

$$
c=q_2a.
$$

Therefore,

$$
\begin{aligned}
b+c
&=q_1a+q_2a \\
&=(q_1+q_2)a.
\end{aligned}
$$

Since the integers are closed under addition,

$$
q_1+q_2\in\mathbb{Z}.
$$

Thus, by the definition of divisibility,

$$
a\mid(b+c).
$$

### Why the Universal Quantifier Is Satisfied
The proof never assumed specific values for $a$, $b$, or $c$.

The argument therefore works for arbitrary

$$
a,b,c\in\mathbb{Z},
$$

which establishes the universally quantified statement.

> [!tip] Concept Check
> Give a direct proof of the following statement:
>
> For any $a,b,c\in\mathbb{Z}$, if $a\mid b$ and $a\mid c$, then
>
> $$
> a\mid(b-c).
> $$

---

## 10. Divisibility by 9
### Theorem 1.2
Let $n$ be an integer such that

$$
0<n<1000.
$$

If the sum of the digits of $n$ is divisible by $9$, then $n$ is divisible by $9$.

The statement can be represented as

$$
(\forall n\in\mathbb{Z}^+)
\left(
n<1000
\implies
\left(
\text{sum of the digits of }n\text{ is divisible by }9
\implies
9\mid n
\right)
\right).
$$

### Proof of Theorem 1.2
Write the decimal representation of $n$ as

$$
n=\overline{abc},
$$

so

$$
n=100a+10b+c.
$$

Assume that the sum of the digits is divisible by $9$.

By the definition of divisibility, there exists some

$$
k\in\mathbb{Z}
$$

such that

$$
a+b+c=9k.
$$

Add $99a+9b$ to both sides:

$$
100a+10b+c
=
9k+99a+9b.
$$

Since

$$
n=100a+10b+c,
$$

we have

$$
\begin{aligned}
n
&=9k+99a+9b \\
&=9(k+11a+b).
\end{aligned}
$$

Since

$$
k+11a+b\in\mathbb{Z},
$$

we conclude

$$
9\mid n.
$$

---

## 11. Converse of the Divisibility-by-9 Theorem
The **converse** of

$$
P\implies Q
$$

is

$$
Q\implies P.
$$

The converse of Theorem 1.2 is also true.

### Theorem 1.3
Let $n$ be an integer such that

$$
0<n<1000.
$$

If $n$ is divisible by $9$, then the sum of its digits is divisible by $9$.

### Proof
Assume

$$
9\mid n.
$$

Then there exists some

$$
l\in\mathbb{Z}
$$

such that

$$
n=9l.
$$

Using

$$
n=100a+10b+c,
$$

we obtain

$$
100a+10b+c=9l.
$$

Rewrite the left side:

$$
99a+9b+(a+b+c)=9l.
$$

Therefore,

$$
a+b+c=9l-99a-9b.
$$

Factor out $9$:

$$
a+b+c=9(l-11a-b).
$$

Define

$$
k:=l-11a-b.
$$

Since

$$
k\in\mathbb{Z},
$$

we have

$$
a+b+c=9k.
$$

Therefore, the sum of the digits of $n$ is divisible by $9$.

---

## 12. Proving an Equivalence
Theorem 1.2 establishes

$$
P\implies Q,
$$

where:
- $P$ is "the sum of the digits of $n$ is divisible by $9$."
- $Q$ is "$n$ is divisible by $9$."

Theorem 1.3 establishes the converse:

$$
Q\implies P.
$$

Since both directions hold,

$$
P\iff Q.
$$

Therefore,

$$
\boxed{
\text{The sum of the digits of }n\text{ is divisible by }9
\iff
n\text{ is divisible by }9
}
$$

for integers satisfying

$$
0<n<1000.
$$

> [!important] Proving an "If and Only If" Statement
> To prove
>
> $$
> P\iff Q,
> $$
>
> prove both directions separately:
>
> $$
> P\implies Q
> $$
>
> and
>
> $$
> Q\implies P.
> $$
#academic/year-3/cs70/course-notes