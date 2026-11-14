---
title: L2 Propositional Logic and Proof Techniques
Content Type: Lecture
Content Area:
Course: CS70
description: "The lecture introduced propositions, predicates, quantifiers, logical connectives, truth tables, contrapositives, and De Morgan's laws. It used the card-selection problem and the parity of an integer product to show how formal logic clarifies natural-language statements and supports proof by example, counterexample, and contrapositive."
pinned: false
Date Published: September 1, 2026
Last Updated: September 1, 2026
Status: Finalized
---

# L2 Propositional Logic and Proof Techniques

## Executive Summary

The lecture began with a card-selection problem illustrating the logic of conditional statements. It then revisited the claim that if a product of two integers is even, at least one factor is even, motivating the need for proof techniques beyond a straightforward direct proof.

The main development introduced propositions, predicates, universes, universal and existential quantifiers, and the importance of quantifier order. The lecture then defined the logical connectives “and,” “or,” “not,” and “implies” through truth tables. It emphasized inclusive disjunction and vacuous truth, translated several natural-language conditional forms into notation, proved the equivalence between a conditional and its contrapositive, and used that equivalence to construct a proof by contrapositive. The lecture concluded with quantified negation and De Morgan's laws.

---

## Conditional Logic Through the Card Problem

Each card has exactly one letter on one side and one number on the other. The visible faces are:

- A card showing $3$.
- A card showing $8$.
- A card showing $T$.
- A card showing $H$.

The rule to test is:

> If a card has an even number on one side, then it has an $H$ on the other side.

The goal is to turn over exactly the cards that could reveal a violation of this rule.

### Why the $3$ card does not need to be turned over

The rule begins with the condition that a card has an even number. Since $3$ is odd, the card does not satisfy that condition.

It does not matter whether the reverse side is $H$ or some other letter. Neither possibility violates the stated rule, because the rule places no requirement on cards whose number side is odd.

### Why the $8$ card must be turned over

The card visibly has an even number, so the rule requires an $H$ on its other side.

Turning over the card checks whether the required consequence is present:

- If the reverse side is $H$, the rule is satisfied.
- If the reverse side is not $H$, the rule is violated.

Thus, the $8$ card must be checked.

### Why the $H$ card does not need to be turned over

Seeing $H$ does not imply that the other side must be even. The rule says:

$$
\text{even number} \implies H,
$$

not:

$$
H \implies \text{even number}.
$$

If the other side is even, the rule is satisfied. If the other side is odd, the rule is still not violated, because the rule does not prohibit an $H$ from appearing opposite an odd number.

### Why the $T$ card must be turned over

The letter $T$ is not $H$. If the other side is even, then the card violates the rule: it would have an even number without an $H$ on the opposite side.

If the other side is odd, there is no violation. Therefore, this card must be turned over to determine which case applies.

The required cards are consequently the $8$ card and the $T$ card. Later in the lecture, this result was explained formally using a conditional and its contrapositive:

$$
\text{even} \implies H
$$

is logically equivalent to

$$
\text{not }H \implies \text{odd}.
$$

The $8$ card checks the original direction, while the $T$ card checks the contrapositive.

---

## Motivating Example: An Even Product

The lecture revisited the claim:

> For integers $m$ and $n$, if $mn$ is even, then at least one of $m$ and $n$ is even.

In formal language, the intended structure is:

$$
\forall m,n\in\mathbb Z,\qquad
mn\text{ is even}
\implies
\bigl(m\text{ is even}\lor n\text{ is even}\bigr).
$$

The parentheses matter. The entire disjunction is the conclusion of the implication.

### The difficulty with a direct proof

A direct proof would begin by assuming that $mn$ is even. By the definition used in the lecture, there is an integer $k$ such that

$$
mn=2k.
$$

The attempted next step was to divide by one of the factors, hoping to show directly that the other factor is even. For example,

$$
m=\frac{2k}{n}.
$$

This does not immediately put $m$ in the required form $2(\text{integer})$, because the argument has not established that $k/n$ is an integer. The direct approach therefore did not make the desired conclusion fall out straightforwardly.

### Reasoning by assuming both factors are odd

The earlier argument instead considered what happens if neither factor is even. In that case, both are odd. Multiplying their odd-number forms produces another number of the form

$$
2(\text{integer})+1,
$$

so $mn$ is odd.

This contradicts the original assumption that $mn$ is even. Therefore, $m$ and $n$ cannot both be odd, and at least one of them must be even.

The lecture used this example to motivate a more systematic tool: proof by contrapositive.

---

## Propositions and Predicates

Propositional logic begins with propositions.

### Proposition

A proposition is a statement that is definitively true or false in the axiomatic sense used in the course. The truth value does not need to be known immediately; the statement only needs to have a definite truth value.

Examples from the lecture included:

- $1+1=2$ is a proposition.
- $5>0$ is a proposition.
- $5-7>0$ is a proposition, although it is false.
- “The ninety-seventh digit of $\pi$ after the decimal point is $7$” is a proposition even if its truth value is not currently known.

By contrast,

$$
7+3
$$

is not a proposition. It is an expression rather than a true-or-false statement. Adding an assertion such as

$$
7+3=10
$$

would make it a proposition.

“This class is fun” was also not treated as a proposition, because “fun” expresses a subjective or normative judgment rather than the kind of fixed truth value being formalized.

Propositions may be named with lowercase letters such as $p$, $q$, and $r$. For example, $p$ could stand for the proposition $1+1=2$.

### Predicate

A predicate is a statement whose truth depends on one or more unassigned variables. The lecture used $P(x)$ or $Q(x,y)$ for predicates.

For example,

$$
2x\ge x
$$

is not yet a proposition if $x$ has not been specified or quantified. It is true for some values of $x$ and false for others. Its truth is predicated on the value of $x$.

A predicate becomes a proposition once all its variables have been assigned or quantified.

---

## Universes and Quantifiers

A universe specifies the collection of objects over which a variable ranges. The lecture used familiar number systems such as:

- $\mathbb N$ for the natural numbers, with the course convention that $0\in\mathbb N$.
- $\mathbb Z$ for the integers.
- $\mathbb R$ for the real numbers.

The statement $x\in\mathbb Z$ means that $x$ is an integer.

Quantifiers say how a predicate applies within its universe.

### Universal quantifier

The universal quantifier $\forall$ means “for all” or “for every.” For example,

$$
\forall x\in\mathbb N,\qquad 2x\ge x
$$

states that every natural number satisfies $2x\ge x$.

This is true because restricting the universe to the natural numbers removes the negative values that would violate the inequality.

By contrast,

$$
\forall x\in\mathbb Z,\qquad 2x\ge x
$$

is false. The statement makes a strong claim about every integer, and negative integers do not satisfy it. A universal statement is false if even one member of the universe violates its predicate.

### Existential quantifier

The existential quantifier $\exists$ means “there exists” or “there is some.” For example,

$$
\exists x\in\mathbb Z,\qquad 2x\ge x
$$

is true.

Only one integer needs to satisfy the predicate. The lecture gave values such as $x=5$ and $x=1$ as witnesses. Exhibiting one such value is a proof by example for an existential statement.

The existential quantifier does not widen the universe. The universe and the quantifier have separate roles:

- The universe specifies which objects are under consideration.
- The quantifier specifies whether the claim concerns every object or merely at least one object in that universe.

### Quantifying every variable

A formula may quantify one variable while leaving another free. Such a formula remains a predicate rather than a proposition.

The lecture gave an expression quantified over $y$ while leaving $x$ unquantified. Even though $y$ was bound by a quantifier, the truth of the full expression still depended on $x$. After both $x$ and $y$ were quantified, the expression became a proposition.

---

## Quantifier Order

Quantifier order can fundamentally change the meaning and truth value of a statement.

### Every real number has a greater or equal real number

The lecture considered:

$$
\forall x\in\mathbb R,\ \exists y\in\mathbb R
\text{ such that }x\le y.
$$

In natural language, this says:

> Given any real number, there is a real number at least as large.

The instructor summarized its intuition as “there is always a bigger number.” The choice of $y$ may depend on the chosen $x$. The statement is true.

### There is one greatest real number

Switching the quantifiers produces:

$$
\exists y\in\mathbb R,\ \forall x\in\mathbb R
\text{ such that }x\le y.
$$

This says:

> There is one real number that is at least as large as every real number.

In the lecture's wording, it claims that “there is a biggest number.” This statement is false.

The contrast illustrates why the order of $\forall$ and $\exists$ matters. In the first statement, a potentially different $y$ may be selected for each $x$. In the second, one fixed $y$ must work for every $x$.

### Additive-identity example

The lecture also considered:

$$
\exists c\in\mathbb R,\ \forall x\in\mathbb R,
\qquad x+c=x.
$$

In natural language:

> There is a specific real number that can be added to any real number without changing it.

Choosing $c=0$ proves the statement. The lecture identified this as the property later called the additive identity.

---

## Proof by Example and Counterexample

The quantifiers suggest two elementary proof patterns.

### Proof by example

To prove an existential statement,

$$
\exists x\in U,\ P(x),
$$

it is enough to provide one particular value in the universe $U$ for which $P(x)$ is true.

For

$$
\exists x\in\mathbb Z,\qquad 2x\ge x,
$$

the lecture used $x=5$ as a witness. Since $5$ is an integer and satisfies the inequality, the existential claim is true.

Another quantified equation in the lecture was shown true by selecting particular values, including $x=1$ and $y=\tfrac12$. Parts of that equation were not recoverable clearly from these notes and are recorded in the final section.

### Counterexample

A universal statement,

$$
\forall x\in U,\ P(x),
$$

can be disproved by finding one $x\in U$ for which $P(x)$ is false.

For example,

$$
\forall x\in\mathbb Z,\qquad 2x\ge x
$$

is false because a negative integer gives a counterexample.

The lecture likewise discussed disproving a universally quantified equation by selecting a value of $y$ for which no integer solution exists. The exact equation and algebra were unclear in these notes, but the stated proof strategy was to refute the universal claim with one counterexample.

---

## Negating Quantified Statements

The lecture introduced rules for moving a negation through a quantifier.

### Negating a universal statement

The statement

$$
\neg\bigl(\forall x,\ P(x)\bigr)
$$

means that it is not true that every $x$ satisfies $P(x)$. This is equivalent to saying that at least one $x$ fails to satisfy it:

$$
\neg\bigl(\forall x,\ P(x)\bigr)
\equiv
\exists x,\ \neg P(x).
$$

In natural language:

> Not every $x$ satisfies $P$ if and only if some $x$ does not satisfy $P$.

The lecture's example was:

$$
\neg\bigl(\forall x\in\mathbb Z,\ x\le 10\bigr).
$$

This says that not every integer is at most $10$. Equivalently,

$$
\exists x\in\mathbb Z,\qquad x>10.
$$

### Negating an existential statement

Similarly,

$$
\neg\bigl(\exists x,\ P(x)\bigr)
\equiv
\forall x,\ \neg P(x).
$$

In natural language:

> If no $x$ satisfies $P$, then every $x$ fails to satisfy $P$.

The lecture illustrated this over the real numbers with:

$$
\neg\bigl(\exists x\in\mathbb R,\ x^2=-1\bigr)
\equiv
\forall x\in\mathbb R,\ x^2\ne -1.
$$

The universe matters on both sides of this equivalence.

### Pushing a negation through nested quantifiers

The lecture began with the difficult-to-parse statement

$$
\neg\left(
\forall c\in\mathbb R,\
\exists x\in\mathbb R,\
x+c\ne x
\right).
$$

Rather than relying only on natural-language parsing, the negation can be moved inward one quantifier at a time.

First, negating $\forall c$ changes it to $\exists c$:

$$
\exists c\in\mathbb R,\
\neg\left(
\exists x\in\mathbb R,\
x+c\ne x
\right).
$$

Next, negating $\exists x$ changes it to $\forall x$:

$$
\exists c\in\mathbb R,\
\forall x\in\mathbb R,\
\neg(x+c\ne x).
$$

Finally, negating “not equal” produces equality:

$$
\exists c\in\mathbb R,\
\forall x\in\mathbb R,\
x+c=x.
$$

This is exactly the additive-identity statement above, and $c=0$ makes it true.

The example shows the algebraic character of propositional logic: moving a negation through a quantifier flips the quantifier, and the negation continues inward.

---

## Logical Connectives

The lecture introduced four main logical connectives:

$$
p\land q
\qquad
p\lor q
\qquad
\neg p
\qquad
p\implies q.
$$

They mean, respectively:

- $p$ and $q$.
- $p$ or $q$.
- Not $p$.
- If $p$, then $q$.

These symbols are not merely abbreviations. Each connective acts as an operator on truth values.

### Conjunction

The conjunction $p\land q$ is true only when both $p$ and $q$ are true.

| $p$ | $q$ | $p\land q$ |
|---|---|---|
| F | F | F |
| F | T | F |
| T | F | F |
| T | T | T |

### Inclusive disjunction

The disjunction $p\lor q$ is false only when both propositions are false.

| $p$ | $q$ | $p\lor q$ |
|---|---|---|
| F | F | F |
| F | T | T |
| T | F | T |
| T | T | T |

The final row is important: the course's default “or” is inclusive. Thus, $p\lor q$ is true when both $p$ and $q$ are true.

The instructor contrasted this with the ambiguity of ordinary conversation, such as asking whether someone wants burgers or pizza. In formal Boolean logic, the truth table removes that ambiguity.

### Negation

Negation reverses a proposition's truth value.

| $p$ | $\neg p$ |
|---|---|
| F | T |
| T | F |

### Implication

For the conditional

$$
p\implies q,
$$

$p$ is the antecedent and $q$ is the consequent. The conditional says that whenever $p$ occurs, $q$ must follow.

| $p$ | $q$ | $p\implies q$ |
|---|---|---|
| F | F | T |
| F | T | T |
| T | F | F |
| T | T | T |

The only false case is:

$$
p=\mathrm T,\qquad q=\mathrm F.
$$

This is the one case in which the antecedent happens but the promised consequence fails.

---

## Vacuous Truth

When the antecedent $p$ is false, the implication $p\implies q$ is true regardless of the value of $q$. These cases are called vacuously true.

The conditional imposes a requirement on what must happen if $p$ happens. If $p$ never happens, the contract is never violated.

The lecture's natural-language example was the claim:

> I have never lost a race to Usain Bolt.

This can be true simply because the speaker has never raced Usain Bolt. The relevant antecedent never occurred, so there was no race in which the claimed condition could be violated.

This same idea explains two cards in the opening problem:

- The $3$ card does not satisfy the antecedent “the number is even,” so the conditional cannot be violated by that card.
- The $H$ card already displays the required consequent, so it does not reveal a violation regardless of whether its hidden number is even or odd.

---

## Translating Natural-Language Conditionals

Small changes in English can reverse the direction of an implication. The lecture translated several common forms.

### “If $A$, then $B$”

This is the direct conditional:

$$
A\implies B.
$$

### “$A$ if $B$”

This means that $A$ happens if $B$ happens:

$$
B\implies A.
$$

The word order differs from the direction of the implication.

### “$A$ only if $B$”

This means that $A$ cannot happen without $B$:

$$
A\implies B.
$$

The lecture used Alicia and Ben attending a party. If Alicia says, “I will go only if Ben goes,” then Alicia's attendance guarantees Ben's attendance:

$$
A\implies B.
$$

Equivalently, if Ben does not attend, Alicia does not attend:

$$
\neg B\implies\neg A.
$$

However, Ben's attendance does not guarantee Alicia's attendance. Thus, $B\implies A$ is not part of the original statement.

### “$A$ is sufficient for $B$”

If $A$ is sufficient for $B$, the occurrence of $A$ is enough to guarantee $B$:

$$
A\implies B.
$$

### “$A$ is necessary for $B$”

If $A$ is necessary for $B$, then $B$ cannot happen without $A$:

$$
B\implies A.
$$

The lecture also expressed this as:

$$
\neg A\implies\neg B.
$$

If the necessary condition $A$ fails, then $B$ must fail as well.

### “$A$ unless $B$”

The lecture discussed “$A$ unless $B$” using the Alicia and Ben example and considered equivalent-looking formalizations. The exact final notation was not fully recoverable from these notes and is marked unclear below.

---

## The Contrapositive

The contrapositive of

$$
p\implies q
$$

is

$$
\neg q\implies\neg p.
$$

The lecture proved that these statements are logically equivalent:

$$
p\implies q
\equiv
\neg q\implies\neg p.
$$

The intuition is that if $q$ must follow whenever $p$ happens, then failure of $q$ means that $p$ could not have happened.

### Truth-table proof

Begin with every possible assignment of truth values to $p$ and $q$.

| $p$ | $q$ | $\neg q$ | $\neg p$ | $p\implies q$ | $\neg q\implies\neg p$ |
|---|---|---|---|---|---|
| F | F | T | T | T | T |
| F | T | F | T | T | T |
| T | F | T | F | F | F |
| T | T | F | F | T | T |

The last two columns match in every row. Therefore, the two expressions have the same truth value under every possible assignment and are logically equivalent.

### Applying the contrapositive to the cards

The original card rule is:

$$
\text{even number}\implies H.
$$

Its contrapositive is:

$$
\text{not }H\implies\text{not even}.
$$

For integers, “not even” was treated as odd. Thus:

$$
\text{not }H\implies\text{odd}.
$$

This formalizes why both the $8$ and $T$ cards must be checked:

- The $8$ tests whether an even number has $H$ on the other side.
- The $T$ tests whether a non-$H$ letter has an odd number on the other side.

---

## Proof by Contrapositive for an Even Product

The target statement is:

$$
mn\text{ is even}
\implies
\bigl(m\text{ is even}\lor n\text{ is even}\bigr).
$$

To prove an implication $p\implies q$ by contrapositive, prove instead:

$$
\neg q\implies\neg p.
$$

### Negating the conclusion

The conclusion is:

$$
m\text{ is even}\lor n\text{ is even}.
$$

Its negation says that neither factor is even:

$$
\neg(m\text{ is even})
\land
\neg(n\text{ is even}).
$$

For integers, this means:

$$
m\text{ is odd}\land n\text{ is odd}.
$$

### Negating the antecedent

The antecedent is that $mn$ is even. Its negation is that $mn$ is odd.

Thus, the contrapositive is:

$$
\bigl(m\text{ is odd}\land n\text{ is odd}\bigr)
\implies
mn\text{ is odd}.
$$

### Completing the argument

Assume that both $m$ and $n$ are odd. The lecture's earlier multiplication argument showed that the product of their odd-number forms has the form

$$
2(\text{integer})+1.
$$

Therefore, $mn$ is odd.

This proves the contrapositive. Since a conditional and its contrapositive are logically equivalent, the original statement follows:

$$
mn\text{ is even}
\implies
\bigl(m\text{ is even}\lor n\text{ is even}\bigr).
$$

The advantage is structural: the contrapositive begins with two concrete oddness assumptions, which are easier to use than the single assumption that the product is even.

---

## De Morgan's Laws

The lecture concluded by recording rules for pushing negation through “and” and “or.”

Negating a conjunction produces a disjunction of negations:

$$
\neg(p\land q)
\equiv
\neg p\lor\neg q.
$$

Negating a disjunction produces a conjunction of negations:

$$
\neg(p\lor q)
\equiv
\neg p\land\neg q.
$$

These were called De Morgan's laws. Like the rules for negating quantifiers, they allow a negation to be moved inward while changing the connective it passes through.

The even-product proof uses the second law when it changes

$$
\neg\bigl(
m\text{ is even}\lor n\text{ is even}
\bigr)
$$

into

$$
m\text{ is not even}
\land
n\text{ is not even}.
$$

For integers, this becomes the statement that both $m$ and $n$ are odd.

---

## Unclear or Incomplete Steps

Several quantified-equation examples were not recoverable exactly from these notes. The available notes alternately rendered the central expression as forms resembling “$x$ over $5$ minus $7$ over $2y$” and “$x$ to the fifth minus $7$ halves equals $y$.” The instructor's supported conceptual points were that leaving $x$ unquantified produces a predicate, quantifying every variable produces a proposition, and changing the universe or quantifier order changes whether a solution must exist. The exact formulas and algebraic solutions are `[unclear]`.

In one existential example, the instructor selected $y=\tfrac12$ and $x=1$ as a proof by example. Because the underlying equation is `[unclear]`, the substitution cannot be reconstructed reliably.

The discussion of “$A$ unless $B$” considered implication and disjunction forms, but these notes does not preserve a clear final formal equivalence. That translation is `[unclear]`.

The odd-times-odd derivation states that the product becomes $2$ times an integer plus $1$, but these notes does not preserve the named intermediate integer expressions or the full expansion. Only the stated conclusion

$$
m,n\text{ odd}\implies mn=2(\text{integer})+1
$$

is recoverable.
#academic/year-3/cs70/lecture-notes