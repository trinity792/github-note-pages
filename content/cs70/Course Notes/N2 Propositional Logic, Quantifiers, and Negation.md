---
title: N2 Propositional Logic, Quantifiers, and Negation
Content Type: Course Notes
Content Area: Discrete Mathematics
description: Propositions, logical connectives, implications, logical equivalence, quantifiers, predicates, and rules for negating propositions and quantified statements.
Course: CS 70
pinned: false
Date Published: September 7, 2026
Last Updated: September 7, 2026
Status: Finalized
---

# N2 Propositional Logic, Quantifiers, and Negation
Mathematical proofs rely on a precise logical language. This note introduces **propositions**, **logical connectives**, **implications**, **quantifiers**, and techniques for manipulating and negating mathematical statements.

## 1. Propositional Logic
A **proposition** is a statement that is either true or false.

Examples of propositions include:
- $\sqrt{3}$ is irrational.
- $1+1=5$.
- Julius Caesar had two eggs for breakfast on his tenth birthday.

The truth of a statement does not need to be known for it to qualify as a proposition. It only needs to have a definite truth value.

The following are not propositions:
- $2+2$.
- $x^2+3x=5$.

The second statement does not have a definite truth value until $x$ is specified.

Statements involving ambiguous or fuzzy terms are also not treated as propositions in these notes. For example:
- "Arnold Schwarzenegger often eats broccoli."
- "Henry VIII was unpopular."

The terms "often" and "unpopular" do not have precise mathematical meanings.

### Logical Connectives
Let $P$ and $Q$ represent propositions.

#### Conjunction
The **conjunction**

$$
P\land Q
$$

means "$P$ and $Q$."

It is true only when both $P$ and $Q$ are true.

| $P$ | $Q$ | $P\land Q$ |
|---|---|---|
| T | T | T |
| T | F | F |
| F | T | F |
| F | F | F |

#### Disjunction
The **disjunction**

$$
P\lor Q
$$

means "$P$ or $Q$."

It is true whenever at least one of $P$ or $Q$ is true.

> [!tip] Concept Check
> Write the truth table for disjunction, $P\lor Q$.

#### Negation
The **negation**

$$
\neg P
$$

means "not $P$."

It is true exactly when $P$ is false.

| $P$ | $\neg P$ |
|---|---|
| T | F |
| F | T |

Statements containing variables representing propositions are called **propositional forms**.

### Law of the Excluded Middle
For any proposition $P$, either $P$ is true or $\neg P$ is true, but not both.

Thus,

$$
P\lor\neg P
$$

is always true.

A propositional form that is true regardless of the truth values of its variables is called a **tautology**.

By contrast,

$$
P\land\neg P
$$

is always false and is therefore called a **contradiction**.

> [!tip] Concept Check
> Let $P$ represent "3 is odd," $Q$ represent "4 is odd," and $R$ represent "$4+5=49$."
> Determine the truth values of $P\land R$, $P\lor R$, and $\neg Q$.

### Truth Tables
A **truth table** lists every possible combination of truth values for the input propositions and determines the resulting truth value of a propositional form.

Truth tables play the same role for propositional forms that ordinary function tables play for functions.

### Implication
An **implication**

$$
P\implies Q
$$

means:

> If $P$, then $Q$.

Here:
- $P$ is the **hypothesis**.
- $Q$ is the **conclusion**.

$P$ is also sometimes called the **antecedent**, and $Q$ the **consequent**.

Examples include:
- If you stand in the rain, then you will get wet.
- If you passed the class, you received a certificate.

An implication is false only when its hypothesis is true and its conclusion is false.

| $P$ | $Q$ | $P\implies Q$ |
|---|---|---|
| T | T | T |
| T | F | F |
| F | T | T |
| F | F | T |

### Vacuous Truth
Notice that

$$
P\implies Q
$$

is always true whenever $P$ is false.

For example:

> If pigs can fly, then horses can read.

The hypothesis is false, so the implication is mathematically true regardless of whether the conclusion is true.

An implication that is true because its hypothesis is false is said to be **vacuously true**.

### Implication as a Disjunction
The implication

$$
P\implies Q
$$

is logically equivalent to

$$
\neg P\lor Q.
$$

Their truth tables are identical:

| $P$ | $Q$ | $P\implies Q$ | $\neg P\lor Q$ |
|---|---|---|---|
| T | T | T | T |
| T | F | F | F |
| F | T | T | T |
| F | F | T | T |

Therefore,

$$
(P\implies Q)\equiv(\neg P\lor Q).
$$

The symbol $\equiv$ means that two propositional forms are **logically equivalent**.

### Ways to Express an Implication
The implication

$$
P\implies Q
$$

can be expressed in several equivalent ways:

1. If $P$, then $Q$.
2. $Q$ if $P$.
3. $P$ only if $Q$.
4. $P$ is sufficient for $Q$.
5. $Q$ is necessary for $P$.
6. $Q$ unless not $P$.

### Biconditional
If both

$$
P\implies Q
$$

and

$$
Q\implies P
$$

are true, then we say:

> $P$ if and only if $Q$.

This is abbreviated **iff** and written

$$
P\iff Q.
$$

The biconditional is true exactly when $P$ and $Q$ have the same truth value.

For example, let:
- $P$ be "3 is odd."
- $Q$ be "4 is odd."
- $R$ be "6 is even."

Then

$$
P\implies R
$$

is true,

$$
Q\implies P
$$

is vacuously true, and

$$
R\implies P
$$

is true.

Since both $P\implies R$ and $R\implies P$ hold,

$$
P\iff R
$$

is true.

### Contrapositive and Converse
Given an implication

$$
P\implies Q,
$$

its **contrapositive** is

$$
\neg Q\implies\neg P,
$$

while its **converse** is

$$
Q\implies P.
$$

For example, consider:

> If you passed the class, you received a certificate.

Its contrapositive is:

> If you did not receive a certificate, then you did not pass the class.

Its converse is:

> If you received a certificate, then you passed the class.

The relevant truth table is:

| $P$ | $Q$ | $\neg P$ | $\neg Q$ | $P\implies Q$ | $Q\implies P$ | $\neg Q\implies\neg P$ | $P\iff Q$ |
|---|---|---|---|---|---|---|---|
| T | T | F | F | T | T | T | T |
| T | F | F | T | F | T | F | F |
| F | T | T | F | T | F | T | F |
| F | F | T | T | T | T | T | T |

The implication and its contrapositive always have the same truth value. Therefore,

$$
(P\implies Q)\equiv(\neg Q\implies\neg P).
$$

The converse is **not** generally logically equivalent to the original implication.

> [!important] Contrapositive vs. Converse
> For $P\implies Q$, the contrapositive $\neg Q\implies\neg P$ is logically equivalent to the original statement. The converse $Q\implies P$ is not necessarily equivalent.

---

## 2. Quantifiers
Mathematical statements often make claims about many values at once.

Examples include:
1. For all natural numbers $n$, $n^2+n+41$ is prime.
2. If $n$ is an odd integer, then $n^3$ is odd.
3. There exists an integer $k$ that is both even and odd.

These statements can be propositions even though they contain variables because the variables are **quantified** over a specified universe.

### Universal and Existential Quantifiers
There are two primary quantifiers.

The **universal quantifier**

$$
\forall
$$

means "for all."

The **existential quantifier**

$$
\exists
$$

means "there exists."

### Existential Quantification
Consider:

> Some mammals lay eggs.

Mathematically, "some" means "at least one."

Let $U$ be the universe of mammals. Then the statement can be written as

$$
(\exists x\in U)(x\text{ lays eggs}).
$$

When the universe is already clear, it may be written more simply as

$$
\exists x\,(x\text{ lays eggs}).
$$

### Universal Quantification
Consider:

> For all natural numbers $n$, $n^2+n+41$ is prime.

Taking the universe to be the natural numbers $\mathbb{N}$ gives

$$
(\forall n\in\mathbb{N})(n^2+n+41\text{ is prime}).
$$

### Predicates
A statement involving a variable is called a **predicate** or **propositional formula** when replacing the variable with a value produces a proposition.

For example,

$$
n^2+n+41\text{ is prime}
$$

is a predicate involving $n$.

For

$$
n=1,
$$

the predicate becomes

$$
43\text{ is prime},
$$

which is true.

For

$$
n=41,
$$

it becomes

$$
41^2+41+41\text{ is prime}.
$$

But

$$
41^2+41+41=41\cdot43,
$$

so the proposition is false.

### Quantifiers Over Finite Universes
If the universe is finite, quantified statements can be rewritten using conjunctions and disjunctions.

Suppose

$$
U=\{1,2,3,4\}.
$$

Then

$$
(\exists x\in U)P(x)
$$

is logically equivalent to

$$
P(1)\lor P(2)\lor P(3)\lor P(4).
$$

Similarly,

$$
(\forall x\in U)P(x)
$$

is logically equivalent to

$$
P(1)\land P(2)\land P(3)\land P(4).
$$

For an infinite universe, such as $\mathbb{N}$, we cannot explicitly list every term this way.

> [!tip] Concept Check
> Use quantifiers to express the following statements:
> 1. "For all integers $x$, $2x+1$ is odd."
> 2. "There exists an integer between $2$ and $4$."

### Multiple Quantifiers
A proposition may contain more than one quantifier.

> [!important] Quantifier Order
> Quantifiers generally **do not commute**. Changing their order can completely change the meaning of a statement.

Consider the two statements:
1. Every time I ride the subway in New York, someone gets stabbed.
2. There is someone such that every time I ride the subway in New York, that same person gets stabbed.

Let

$$
T=\{\text{times when I ride the subway}\}
$$

and

$$
P=\{\text{people}\}.
$$

The first statement can be expressed as

$$
(\forall t\in T)(\exists p\in P)
(p\text{ gets stabbed at time }t).
$$

This allows the person $p$ to be different for each time $t$.

The second statement is

$$
(\exists p\in P)(\forall t\in T)
(p\text{ gets stabbed at time }t).
$$

Here, one particular person $p$ must satisfy the predicate for every time $t$.

The order of the quantifiers therefore changes the proposition substantially.

### Mathematical Example of Quantifier Order
Consider

$$
(\forall x\in\mathbb{Z})(\exists y\in\mathbb{Z})(x<y).
$$

This says:

> For every integer $x$, there exists some integer $y$ larger than $x$.

This statement is true.

Now consider

$$
(\exists y\in\mathbb{Z})(\forall x\in\mathbb{Z})(x<y).
$$

This says:

> There exists an integer $y$ larger than every integer $x$.

In other words, it claims that there is a largest integer. This statement is false.

---

## 3. Much Ado About Negation
If a proposition $P$ is false, then its negation

$$
\neg P
$$

is true.

Understanding how negation interacts with logical connectives and quantifiers is particularly useful when constructing proofs.

### De Morgan's Laws
The negation of a conjunction satisfies

$$
\neg(P\land Q)
\equiv
(\neg P\lor\neg Q).
$$

The negation of a disjunction satisfies

$$
\neg(P\lor Q)
\equiv
(\neg P\land\neg Q).
$$

These equivalences are known as **De Morgan's Laws**.

Informally, if it is not true that both $P$ and $Q$ hold, then at least one of them must be false.

> [!tip] Concept Check
> Verify both of De Morgan's Laws using truth tables.

### Negating Quantifiers
Negation interacts with quantifiers in a similar way.

For any predicate $P(x)$,

$$
\neg(\forall x\,P(x))
\equiv
\exists x\,\neg P(x),
$$

and

$$
\neg(\exists x\,P(x))
\equiv
\forall x\,\neg P(x).
$$

> [!important] Quantifier Negation
> When a negation passes through a quantifier, the quantifier flips:
> $\forall$ becomes $\exists$, and $\exists$ becomes $\forall$.

### Finite-Universe Example
Let

$$
U=\{1,2,3,4\}
$$

and define

$$
P(x)\equiv x^2>10.
$$

Then

$$
\exists x\,P(x)
$$

is true because, for example,

$$
4^2>10.
$$

However,

$$
\forall x\,P(x)
$$

is false because

$$
1^2\not>10.
$$

Therefore,

$$
\neg(\forall x\,P(x))
$$

is true.

Likewise,

$$
\exists x\,\neg P(x)
$$

is true because $P(1)$ is false.

Thus,

$$
\neg(\forall x\,P(x))
\equiv
\exists x\,\neg P(x).
$$

Similarly,

$$
\forall x\,\neg P(x)
$$

and

$$
\neg(\exists x\,P(x))
$$

are both false because $P(4)$ is true.

### English Interpretation
Suppose the universe is $\mathbb{Z}$ and

$$
P(x)\equiv ``x\text{ is odd}."
$$

The statement

$$
\forall x\,P(x)
$$

means:

> Every integer is odd.

This is false.

Its negation is

$$
\neg(\forall x\,P(x)).
$$

In natural language:

> It is not true that every integer is odd.

Equivalently:

> There exists an integer that is not odd.

Therefore,

$$
\neg(\forall x\,P(x))
\equiv
\exists x\,\neg P(x).
$$

### Negating Multiple Quantifiers
Consider

$$
\neg(\forall x\exists y\,P(x,y)).
$$

Push the negation through one quantifier at a time:

$$
\begin{aligned}
\neg(\forall x\exists y\,P(x,y))
&\equiv
\exists x\,\neg(\exists y\,P(x,y)) \\
&\equiv
\exists x\forall y\,\neg P(x,y).
\end{aligned}
$$

The negation propagates inward, flipping each quantifier as it passes through.

> [!important] Negation Strategy
> To negate a statement with several nested quantifiers, move the negation inward one quantifier at a time. Each time the negation crosses a quantifier, flip $\forall\leftrightarrow\exists$. Once the negation reaches the predicate, negate the predicate itself.

### Core Logical Equivalences
The main equivalences from this note are:

$$
(P\implies Q)
\equiv
(\neg P\lor Q),
$$

$$
(P\implies Q)
\equiv
(\neg Q\implies\neg P),
$$

$$
\neg(P\land Q)
\equiv
(\neg P\lor\neg Q),
$$

$$
\neg(P\lor Q)
\equiv
(\neg P\land\neg Q),
$$

$$
\neg(\forall x\,P(x))
\equiv
\exists x\,\neg P(x),
$$

and

$$
\neg(\exists x\,P(x))
\equiv
\forall x\,\neg P(x).
$$
#academic/year-3/cs70/course-notes