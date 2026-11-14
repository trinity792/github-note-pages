---
title: L15 Counting
Content Type: Lecture
Content Area:
Course: CS70
description: "The lecture concluded the discrete mathematics portion of the course with guidance about synthesis questions, then introduced four counting problems organized by whether order matters and replacement is allowed. It derived permutations, combinations, counting with replacement, a binary-string bijection for unordered sampling with replacement, and a counting proof of the binomial theorem."
pinned: false
Date Published: October 20, 2026
Last Updated: October 20, 2026
Status: Finalized
---

# L15 Counting

## Executive Summary

The lecture first reviewed the role of synthesis questions in the course. These questions test whether students can read a formal definition, identify an appropriate proof structure, and construct a rigorous argument. Four synthesis questions will appear on the final.

The probability portion of the course began with four counting settings:

- Ordered sampling without replacement.
- Ordered sampling with replacement.
- Unordered sampling without replacement.
- Unordered sampling with replacement.

The first rule of counting multiplies the number of choices available at consecutive stages. When order does not matter, the second rule of counting divides an ordered count by the number of ordered outcomes corresponding to each unordered outcome. This produces the quantity $\binom{n}{k}$.

Unordered sampling with replacement does not admit the same direct division because different multisets can have different numbers of permutations. A bijection instead represents each multiset by a binary string, reducing the problem to unordered sampling without replacement. The lecture concluded by using combinations to explain the coefficients in the binomial theorem.

---

## Course Wrap-Up: Synthesis Questions and Remaining Topics

Performance on the midterm topics showed a marked improvement over the weekly quizzes. The lecture then addressed how synthesis questions work and what students should expect on the final.

There will be four synthesis questions on the final. Three successful synthesis questions are required for an A, so the four final-exam questions provide four remaining opportunities.

### What synthesis questions test

Most topic questions operate at the "apply" level of Bloom's taxonomy: students apply a learned method. Synthesis questions instead operate at the "analysis" level. Their central task is to read a formal definition and construct a formal argument about it.

For example, the algebraic circuits problem could have been presented as a graph-induction problem if it had included a sentence directing students to induct on the depth of the circuit. The synthesis component was recognizing and supplying that sentence independently. A student needed to decide that the circuit depth, number of vertices, or another formally defined structural quantity should serve as the induction parameter.

These questions are not intended to test clever tricks or hidden insights. Cleverness develops through time and experience, which the course does not assume students already have. Instead, the questions test whether a student can:

- Internalize a formal definition.
- Determine what kind of argument the question requires.
- Work through that definition rigorously.
- Justify a recursive construction or algorithm, often by induction.

Producing a recursive algorithm is useful reasoning, but the course also asks why that algorithm is correct. Induction supplies that justification for recursive algorithms and for many other recursively structured claims.

### Minor slips and critical gaps

A synthesis answer does not need to be completely error-free. The rubric distinguishes between minor slips and critical gaps.

Many students who passed a synthesis question completed roughly 70 percent of it correctly. Minor slips were allowed, but the argument still had to contain the critical steps. The synthesis rubrics make this distinction more explicit than topic-question rubrics because each synthesis problem is more individual and is not being reused merely as a pattern-matching exercise.

### Remaining discrete mathematics topics

The remaining discrete mathematics topics with quiz opportunities are stable matching, accountability, and computability. These are among the harder topics, but completing three additional topics is enough to raise any grade of C or above by one letter grade, such as:

- C to B.
- B to A.
- A to A+.

Students were encouraged to use office hours and discussion sections, especially for accountability and computability, so that fewer topics remain unresolved at the final.

---

## Counting as Preparation for Probability

The second half of the course begins with counting and then moves into probability. Compared with the proof-heavy part of the course, this material has more of a calculation-oriented structure: students learn a counting procedure, apply it to an input, and obtain an output. Proofs still appear, but calculation becomes more prominent.

The counting tools developed here will serve as foundations for probability. Probability, in turn, will support later applications such as machine learning and statistical inference.

The lecture organized its counting problems around two questions:

1. Does the order of the samples matter?
2. Is each sampled item replaced so that it can be drawn again?

An individual draw is called a **sample**, while the entire sequence of draws is called an **outcome**.

---

## The First Rule of Counting

Suppose an outcome is constructed through $k$ consecutive choices. If there are $n_1$ possibilities for the first choice, $n_2$ for the second, and so on through $n_k$ for the final choice, then the total number of distinct outcomes is

$$
n_1n_2\cdots n_k.
$$

The rule can be visualized as a tree. Each first choice creates a branch, each second choice branches again, and every complete path represents one outcome.

For example, a video-game character might be constructed by choosing:

- Orc or human.
- Good or evil.
- Mage, thief, or fighter.

The complete outcomes are the root-to-leaf paths through this decision tree.

---

## Ordered Sampling Without Replacement

The first main counting problem uses $n$ available objects, draws $k$ of them, cares about their order, and does not replace an object after drawing it. The lecture described this as **yes order, no replacement**.

"Ordered" means that drawing $1$ and then $5$ differs from drawing $5$ and then $1$. "Without replacement" means that once an object is removed, it cannot appear again in the same outcome.

### Drawing five balls from fifteen

Place balls numbered $1$ through $15$ in a bag and draw five without replacement. One possible outcome is

$$
(5,1,3,7,15).
$$

There are $15$ choices for the first draw. After one ball has been removed, there are $14$ choices for the second draw. Continuing in this way gives

$$
15\cdot 14\cdot 13\cdot 12\cdot 11
=360{,}360.
$$

The same product can be written as

$$
\frac{15!}{10!}.
$$

The denominator cancels the factors from $10$ downward, leaving precisely the five factors from $15$ through $11$.

### General formula

For $n$ available objects and $k$ ordered draws without replacement, the number of outcomes is

$$
n(n-1)(n-2)\cdots(n-k+1).
$$

In factorial notation,

$$
\frac{n!}{(n-k)!}.
$$

The final factor is $n-k+1$ because the $k$th choice occurs after $k-1$ objects have already been removed.

### Permutations as a special case

A permutation uses every available object. For the letters $A,B,C,D,E$, there are:

- $5$ choices for the first position.
- $4$ choices for the second.
- $3$ choices for the third.
- $2$ choices for the fourth.
- $1$ choice for the fifth.

Therefore, the number of permutations is

$$
5\cdot4\cdot3\cdot2\cdot1=5!=120.
$$

This is the ordered-without-replacement formula with $n=k=5$:

$$
\frac{5!}{(5-5)!}
=
\frac{5!}{0!}
=
120,
$$

where $0!$ is defined to be $1$.

---

## Ordered Sampling With Replacement

The second setting is **yes order, yes replacement**. Order matters, but every drawn object is returned before the next draw. Therefore, the same object may appear multiple times.

### Drawing five times from fifteen balls

If there are $15$ balls and each selected ball is replaced, every draw again has $15$ possibilities. For five draws, the first rule of counting gives

$$
15\cdot15\cdot15\cdot15\cdot15
=
15^5
=
759{,}375.
$$

This number is larger than the corresponding count without replacement because repeated samples, such as drawing the same ball several times, are now allowed.

In general, ordered sampling with replacement from $n$ possibilities over $k$ draws has

$$
n^k
$$

outcomes.

---

## Unordered Sampling Without Replacement

The third problem ignores order and does not allow replacement. It therefore counts subsets rather than sequences.

The basic strategy is:

1. Temporarily pretend that order matters.
2. Count the resulting ordered outcomes.
3. Group together all permutations representing the same unordered outcome.
4. Divide by the number of ordered representatives in each group.

### Choosing three letters from four

Put $A,B,C,D$ in a bag and draw three without replacement. If order mattered, the number of outcomes would be

$$
4\cdot3\cdot2=24.
$$

For example, the following ordered outcomes all represent the same unordered selection:

$$
ABC,\ ACB,\ BAC,\ BCA,\ CAB,\ CBA.
$$

Each unordered selection has $3!=6$ ordered representatives. The $24$ ordered outcomes therefore form four groups of six, so the number of unordered outcomes is

$$
\frac{24}{6}=4.
$$

Equivalently, the four possibilities correspond to selecting all but one of the four available letters.

### The second rule of counting

Let $A$ be a set of ordered objects and $B$ the corresponding set of unordered objects. Suppose a function

$$
f:A\to B
$$

maps every ordered object to its unordered version, and suppose exactly $m$ objects in $A$ map to every object in $B$. The function is then $m$-to-one, and

$$
|B|=\frac{|A|}{m}.
$$

In the four-letter example, the function effectively assigns all six permutations of a selection to one common group. Thus it is a $6$-to-$1$ function.

### Choosing five letters from twenty-six

Now suppose there are $26$ letters and five are drawn without replacement, with order ignored.

First, temporarily count ordered outcomes:

$$
|A|
=
26\cdot25\cdot24\cdot23\cdot22
=
\frac{26!}{21!}
=
7{,}893{,}600.
$$

Every unordered selection of five distinct letters has

$$
5!=120
$$

permutations. Dividing by the number of ordered representatives gives

$$
|B|
=
\frac{7{,}893{,}600}{120}
=
65{,}780.
$$

### The combination formula

For $n$ available objects and an unordered selection of $k$ distinct objects, the number of outcomes is

$$
\binom{n}{k}
=
\frac{n!}{(n-k)!k!}.
$$

The numerator before division,

$$
\frac{n!}{(n-k)!},
$$

counts ordered selections without replacement. Dividing by $k!$ removes the redundant permutations of each selected group.

The expression $\binom{n}{k}$ is read as "$n$ choose $k$."

---

## Unordered Sampling With Replacement

The fourth problem ignores order but allows replacement. The lecture described this as counting **multisets**: duplicates are permitted, but their order does not matter.

Suppose the available symbols are $X,Y,Z$, and five samples are drawn with replacement. Possible outcomes include

$$
XXXXX,
$$

$$
XXXXY,
$$

and

$$
XXYYZ.
$$

Because order is ignored, the multiset $XXYYZ$ could equivalently be described as two $X$s, two $Y$s, and one $Z$.

### Why direct division fails

One might try the previous method:

1. Temporarily care about order.
2. Count all ordered outcomes as $3^5=243$.
3. Divide by the number of permutations of each multiset.

The difficulty is that the multisets do not all have the same number of ordered representatives.

For example, $XXXXX$ has only one permutation. In contrast, $XXXXY$ has five permutations because the single $Y$ may occupy any one of the five positions. Therefore, there is no immediate fixed $m$ making the map from ordered sequences to unordered multisets uniformly $m$-to-one.

A case-by-case count is possible, but the lecture instead transformed the problem into another counting problem through a bijection.

---

## The Bijection Principle

The lecture called the following idea the ultimate, or third, rule of counting:

If there is a bijection between two sets, then the sets have the same size.

A bijection gives a one-to-one correspondence. Every object in the first set matches exactly one object in the second set, and every object in the second set is matched.

The strategy is valuable when the original objects are difficult to count but can be represented as objects in a more familiar counting problem.

### Slider interpretation

For multisets of five elements drawn from $X,Y,Z$, imagine three sliders:

- The first records the number of $X$s.
- The second records the number of $Y$s.
- The third records the number of $Z$s.

Every valid setting consists of nonnegative counts summing to $5$. For example,

$$
(4,1,0)
$$

represents four $X$s, one $Y$, and no $Z$s, while

$$
(2,2,1)
$$

represents $XXYYZ$.

A case analysis by the number of $X$s gives:

- If there are $0$ $X$s, there are $6$ possibilities for the numbers of $Y$s and $Z$s.
- If there is $1$ $X$, there are $5$ possibilities.
- The successive cases contribute $4,3,2,$ and $1$ possibilities.

Thus the total is

$$
6+5+4+3+2+1=21.
$$

This already counts the multisets, but the binary-string representation gives a more general reduction.

---

## Binary Strings for Multisets

Represent every selected object by a $0$ and use $1$s as separators between categories.

For the categories $X,Y,Z$:

- Zeros before the first separator represent $X$s.
- Zeros between the two separators represent $Y$s.
- Zeros after the second separator represent $Z$s.

### Encoding examples

The multiset $XXYZZ$ contains two $X$s, one $Y$, and two $Z$s. Its binary representation is

$$
0010100.
$$

The two initial zeros represent the two $X$s. The first $1$ changes from the $X$ category to the $Y$ category. The next zero represents the single $Y$. The second $1$ changes to the $Z$ category, and the final two zeros represent the two $Z$s.

The multiset $XXXXZ$ has four $X$s, no $Y$s, and one $Z$, so it becomes

$$
0000110.
$$

The adjacent ones mean that the representation moves from the $X$ category to the $Y$ category and immediately to the $Z$ category without placing any zero in the $Y$ section.

The mapping works in both directions. Given a binary string of this form, the zeros in the three regions uniquely determine the numbers of $X$s, $Y$s, and $Z$s. Therefore, the mapping is a bijection between the multisets and the corresponding binary strings.

### Counting the binary strings

Five samples contribute five zeros. Three categories require two separators, so every valid binary string has length

$$
5+2=7
$$

and contains exactly two ones.

Counting these strings is equivalent to choosing which two of the seven positions contain the ones. The two selected positions cannot be the same, so there is no replacement. The order in which the positions are chosen does not matter. This is therefore unordered sampling without replacement:

$$
\binom{7}{2}=21.
$$

This agrees with the earlier case analysis.

One could instead choose the positions of the five zeros:

$$
\binom{7}{5}=21.
$$

Choosing the two positions occupied by ones automatically determines the five positions occupied by zeros, and vice versa. This illustrates the identity

$$
\binom{n}{k}=\binom{n}{n-k}.
$$

---

## General Reduction for Unordered Sampling With Replacement

Suppose there are $n$ categories and a total of $k$ sampled objects.

The binary representation contains:

- $k$ zeros, one for each sampled object.
- $n-1$ ones, one separator between each pair of adjacent categories.

Therefore, the total string length is

$$
k+n-1.
$$

Counting the possible strings can be done by choosing the $n-1$ separator positions:

$$
\binom{k+n-1}{n-1}.
$$

Equivalently, one can choose the $k$ zero positions:

$$
\binom{k+n-1}{k}.
$$

These are equal because the chosen zero positions and the remaining separator positions determine one another.

### Example with four categories and seven samples

With $n=4$ categories and $k=7$ samples, there are:

- $7$ zeros.
- $4-1=3$ separators.
- $7+3=10$ total binary digits.

The unordered-with-replacement problem is therefore transformed into choosing three separator positions from ten:

$$
\binom{10}{3}.
$$

Equivalently, one may choose the seven positions occupied by zeros:

$$
\binom{10}{7}.
$$

Thus unordered sampling with replacement is reduced to unordered sampling without replacement using different parameters.

---

## Summary of the Four Counting Problems

The lecture interpreted the four problems as follows:

- Ordered sampling without replacement counts sequences whose entries cannot repeat.
- Ordered sampling with replacement counts sequences whose entries may repeat.
- Unordered sampling without replacement counts sets.
- Unordered sampling with replacement counts multisets.

The corresponding counts are:

$$
\text{ordered, no replacement}
=
\frac{n!}{(n-k)!},
$$

$$
\text{ordered, with replacement}
=
n^k,
$$

$$
\text{unordered, no replacement}
=
\binom{n}{k}
=
\frac{n!}{(n-k)!k!},
$$

and

$$
\text{unordered, with replacement}
=
\binom{k+n-1}{n-1}
=
\binom{k+n-1}{k}.
$$

The fourth formula comes from converting each multiset into a binary string and then applying the third problem's combination count.

The binary-string method is also commonly presented with "stars and bars" or with a "dogs and biscuits" interpretation. The lecture used zeros and ones.

---

## Counting and the Binomial Theorem

The lecture concluded with an application of combinations to powers of a binomial.

For example,

$$
(A+B)^3
=
A^3+3A^2B+3AB^2+B^3,
$$

and

$$
(A+B)^4
=
A^4+4A^3B+6A^2B^2+4AB^3+B^4.
$$

The coefficients are combination counts.

### Why expansion produces choices

In a product of $n$ factors,

$$
(A+B)^n
=
(A+B)(A+B)\cdots(A+B),
$$

each factor contributes either an $A$ or a $B$ to a term in the uncollected expansion. Because every factor independently offers two choices, there are

$$
2^n
$$

uncollected monomials before like terms are combined.

For instance, multiplying by one additional factor creates two versions of every previous term:

- One version multiplied by $A$.
- One version multiplied by $B$.

This doubles the number of uncollected terms at each additional power.

### Counting a coefficient

Consider $(A+B)^6$ and ask how many uncollected terms become

$$
A^2B^4.
$$

A term has this form when four of the six factors contribute $B$ and the remaining two contribute $A$. Therefore, the coefficient is the number of ways to choose which four factors contribute $B$:

$$
\binom{6}{4}=15.
$$

Equivalently, one may choose the two factors that contribute $A$:

$$
\binom{6}{2}=15.
$$

The equality of these two counts is another instance of

$$
\binom{n}{k}=\binom{n}{n-k}.
$$

### General form

For a term with $k$ copies of $B$ and $n-k$ copies of $A$, choose which $k$ of the $n$ factors contribute $B$. This gives the coefficient

$$
\binom{n}{k}.
$$

Thus the expansion is

$$
(A+B)^n
=
\sum_{k=0}^{n}
\binom{n}{k}A^{n-k}B^k.
$$

The counting interpretation explains the binomial coefficients: $\binom{n}{k}$ counts the choices of the $k$ factors that contribute $B$, while all remaining factors contribute $A$.