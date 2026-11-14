---
title: L18 Combinations of Events
Content Type: Lecture
Content Area:
Course: CS70
description: "The lecture developed the principle of inclusion-exclusion from set counting and proved it by tracking how often each element is counted. It then introduced independence, mutual independence, and the product rule before applying inclusion-exclusion, complements, and truncation bounds to probabilities of unions."
pinned: false
Date Published: October 29, 2026
Last Updated: October 29, 2026
Status: Finalized
---

# L18 Combinations of Events

## Executive Summary

The lecture began with a set-counting problem: how can the size of a union be computed without counting elements multiple times? For two sets, one subtracts their intersection. For three or more sets, this correction alternates between subtracting and adding intersections of increasing size, producing the principle of inclusion-exclusion.

To justify the general formula, the lecture tracked an arbitrary element \(x\) that belongs to exactly \(m\) sets. Its total contribution is an alternating sum of binomial coefficients. A substitution into the binomial theorem shows that this contribution is exactly one.

The lecture then returned to probability. It defined independence and mutual independence, distinguished pairwise independence from mutual independence, and developed the product rule for intersections of dependent events. Finally, it transferred inclusion-exclusion from set sizes to probabilities of unions, discussed the special cases of mutually exclusive and independent events, and introduced truncated inclusion-exclusion as a way to bound complicated union probabilities.

---

## Counting the Union of Two Sets

For two finite sets \(A_1\) and \(A_2\), adding their individual sizes counts every element in their overlap twice. Subtracting the size of the overlap corrects that double count:

$$
|A_1\cup A_2|
=
|A_1|+|A_2|-|A_1\cap A_2|.
$$

The subtraction is the step that avoids double counting.

### Example with two overlapping sets

The lecture used

$$
A_1=\{A,B,C,D\},
\qquad
A_2=\{C,D,E,F\}.
$$

Their union is

$$
A_1\cup A_2=\{A,B,C,D,E,F\},
$$

so

$$
|A_1\cup A_2|=6.
$$

Individually,

$$
|A_1|=4,
\qquad
|A_2|=4.
$$

Their intersection is

$$
A_1\cap A_2=\{C,D\},
$$

so

$$
|A_1\cap A_2|=2.
$$

Therefore,

$$
|A_1\cup A_2|
=
4+4-2
=
6.
$$

The elements \(C\) and \(D\) are counted once through \(A_1\) and again through \(A_2\). Subtracting the intersection removes one copy of each.

---

## Extending the Count to Three Sets

For three sets, adding the individual sizes and subtracting all pairwise intersections is not sufficient. An element in all three sets is initially counted three times, but it also lies in all three pairwise intersections. Subtracting those three intersections removes it three times, leaving it counted zero times.

The triple intersection must therefore be added back:

$$
\begin{aligned}
|A_1\cup A_2\cup A_3|
={}&|A_1|+|A_2|+|A_3|\\
&-|A_1\cap A_2|
-|A_1\cap A_3|
-|A_2\cap A_3|\\
&+|A_1\cap A_2\cap A_3|.
\end{aligned}
$$

For an element \(x\) belonging to all three sets, its contribution is

$$
3-3+1=1.
$$

The first \(3\) comes from the three individual sets, the second \(3\) comes from the three pairwise intersections, and the final \(1\) comes from the three-way intersection.

The number of pairwise intersections is

$$
\binom{3}{2}=3.
$$

This binomial-coefficient pattern becomes important when the formula is generalized.

---

## The Four-Set Pattern and “Intersect Sums”

For four sets, the same alternating correction continues:

1. Add all four individual set sizes.
2. Subtract every pairwise intersection.
3. Add every three-way intersection.
4. Subtract the four-way intersection.

Thus,

$$
\begin{aligned}
|A_1\cup A_2\cup A_3\cup A_4|
={}&
|A_1|+|A_2|+|A_3|+|A_4|\\
&-\bigl(
|A_1\cap A_2|
+|A_1\cap A_3|
+|A_1\cap A_4|\\
&\qquad
+|A_2\cap A_3|
+|A_2\cap A_4|
+|A_3\cap A_4|
\bigr)\\
&+\bigl(
|A_1\cap A_2\cap A_3|
+|A_1\cap A_2\cap A_4|\\
&\qquad
+|A_1\cap A_3\cap A_4|
+|A_2\cap A_3\cap A_4|
\bigr)\\
&-|A_1\cap A_2\cap A_3\cap A_4|.
\end{aligned}
$$

There are

$$
\binom{4}{2}=6
$$

pairwise intersections and

$$
\binom{4}{3}=4
$$

three-way intersections.

### Intersect-sum notation

The instructor introduced the informal name “intersect sum \(k\)” for the sum of the sizes of all \(k\)-way intersections.

For example, with four sets:

$$
S_1
=
|A_1|+|A_2|+|A_3|+|A_4|,
$$

$$
\begin{aligned}
S_2={}&
|A_1\cap A_2|
+|A_1\cap A_3|
+|A_1\cap A_4|\\
&+|A_2\cap A_3|
+|A_2\cap A_4|
+|A_3\cap A_4|,
\end{aligned}
$$

and

$$
\begin{aligned}
S_3={}&
|A_1\cap A_2\cap A_3|
+|A_1\cap A_2\cap A_4|\\
&+|A_1\cap A_3\cap A_4|
+|A_2\cap A_3\cap A_4|.
\end{aligned}
$$

Finally,

$$
S_4=|A_1\cap A_2\cap A_3\cap A_4|.
$$

Using this shorthand, the four-set formula is

$$
|A_1\cup A_2\cup A_3\cup A_4|
=
S_1-S_2+S_3-S_4.
$$

For \(n\) sets, an intersect sum \(S_k\) contains

$$
\binom{n}{k}
$$

terms, because each term is determined by choosing which \(k\) of the \(n\) sets participate in the intersection.

---

## The Principle of Inclusion-Exclusion

For \(n\) sets, the principle of inclusion-exclusion states that the size of their union is the alternating sum of all intersect sums:

$$
\left|\bigcup_{i=1}^{n}A_i\right|
=
\sum_{k=1}^{n}(-1)^{k-1}S_k.
$$

Expanded in words, the rule is:

- Add all one-set sizes.
- Subtract all pairwise-intersection sizes.
- Add all three-way-intersection sizes.
- Subtract all four-way-intersection sizes.
- Continue alternating through the \(n\)-way intersection.

The lecture first presented this pattern as a plausible conjecture and then proved it by checking the contribution of each element.

---

## Proving Inclusion-Exclusion by Tracking One Element

The proof asks how many times a particular element \(x\) is counted by the alternating sum. If every element in the union is counted exactly once, then the entire expression equals the size of the union.

### A specific example with 54 sets

Suppose there are \(54\) sets and \(x\) belongs to exactly four of them:

$$
A_1,\ A_3,\ A_6,\ A_8.
$$

In the one-way intersect sum, \(x\) appears once for each set containing it, so it is counted

$$
\binom{4}{1}=4
$$

times.

In the pairwise intersect sum, \(x\) appears once for every pair chosen from those four sets, so it is counted

$$
\binom{4}{2}=6
$$

times. Because pairwise intersections are subtracted, the running contribution is

$$
4-6=-2.
$$

In the three-way intersect sum, \(x\) appears

$$
\binom{4}{3}=4
$$

times, giving

$$
4-6+4=2.
$$

In the four-way intersect sum, \(x\) appears only in the intersection

$$
A_1\cap A_3\cap A_6\cap A_8,
$$

so it appears

$$
\binom{4}{4}=1
$$

time. That term is subtracted, producing

$$
4-6+4-1=1.
$$

The element belongs to no five-way intersection, because it belongs to only four sets. Equivalently, there is no way to choose five containing sets from four.

Thus, this particular \(x\) is counted exactly once.

### Generalizing to an element in \(m\) sets

If \(x\) belongs to exactly \(m\) of the sets, then it appears:

- \(\binom{m}{1}\) times among the one-way terms,
- \(\binom{m}{2}\) times among the pairwise terms,
- \(\binom{m}{3}\) times among the three-way terms,
- and so on through \(\binom{m}{m}\).

Its total contribution is therefore

$$
\binom{m}{1}
-\binom{m}{2}
+\binom{m}{3}
-\cdots
+(-1)^{m-1}\binom{m}{m}.
$$

For example, if \(m=5\), this becomes

$$
\binom{5}{1}
-\binom{5}{2}
+\binom{5}{3}
-\binom{5}{4}
+\binom{5}{5},
$$

or

$$
5-10+10-5+1=1.
$$

To finish the proof, it remains to show that the alternating sum equals \(1\) for every \(m\).

---

## The Binomial-Theorem Identity Behind the Proof

The lecture used the binomial theorem with \(a=1\) and \(b=-1\). In summation form, the binomial theorem gives

$$
(a+b)^m
=
\sum_{k=0}^{m}\binom{m}{k}a^{m-k}b^k.
$$

Substituting \(a=1\) and \(b=-1\) yields

$$
(1-1)^m
=
\sum_{k=0}^{m}\binom{m}{k}1^{m-k}(-1)^k.
$$

The left side is \(0\), while \(1^{m-k}=1\), so

$$
0
=
\sum_{k=0}^{m}\binom{m}{k}(-1)^k.
$$

Separating the \(k=0\) term gives

$$
0
=
\binom{m}{0}
+
\sum_{k=1}^{m}\binom{m}{k}(-1)^k.
$$

Since

$$
\binom{m}{0}=1,
$$

we have

$$
-1
=
\sum_{k=1}^{m}\binom{m}{k}(-1)^k.
$$

Multiplying by \(-1\) produces

$$
1
=
\sum_{k=1}^{m}(-1)^{k-1}\binom{m}{k}.
$$

This is precisely the total contribution of an element belonging to \(m\) sets. Therefore, every element in the union is counted exactly once, which proves the principle of inclusion-exclusion.

The lecture noted that the course notes express the same argument much more compactly in sigma notation and use a denser notation for the intersect sums.

---

## Independent Events

Two events \(A\) and \(B\) are independent when the probability of their intersection factors into the product of their individual probabilities:

$$
\Pr(A\cap B)=\Pr(A)\Pr(B).
$$

Intuitively, whether one event occurs gives no new information about whether the other occurs.

Using the definition of conditional probability,

$$
\Pr(A\mid B)
=
\frac{\Pr(A\cap B)}{\Pr(B)}.
$$

If \(A\) and \(B\) are independent, then

$$
\Pr(A\mid B)
=
\frac{\Pr(A)\Pr(B)}{\Pr(B)}
=
\Pr(A),
$$

assuming the conditional probability is defined. Thus, conditioning on \(B\) does not change the probability of \(A\).

The main computational consequence is that intersections are easy to evaluate when the events are independent: multiply their probabilities.

---

## Pairwise and Mutual Independence

For several events, checking only pairs does not capture every possible dependency.

The lecture described mutual independence as requiring the corresponding product rule for every selected subcollection of the events. For three events \(A_1,A_2,A_3\), this includes the pairwise conditions

$$
\Pr(A_1\cap A_2)
=
\Pr(A_1)\Pr(A_2),
$$

$$
\Pr(A_1\cap A_3)
=
\Pr(A_1)\Pr(A_3),
$$

and

$$
\Pr(A_2\cap A_3)
=
\Pr(A_2)\Pr(A_3),
$$

together with the three-way condition

$$
\Pr(A_1\cap A_2\cap A_3)
=
\Pr(A_1)\Pr(A_2)\Pr(A_3).
$$

More generally, mutual independence requires this factorization for every subset of the indexed events.

For four events, the lecture counted:

- Six pairwise constraints.
- Four three-way constraints.
- One four-way constraint.

For \(n\) events, it stated that there are

$$
2^n-n-1
$$

such constraints, corresponding to all selected subcollections of size at least two.

### Pairwise independence does not imply mutual independence

The lecture considered two fair coin flips and defined:

- \(A_1\): the first flip is heads.
- \(A_2\): the second flip is heads.
- \(A_3\): both flips are the same.

Each pair is independent:

- Knowing the first flip is heads does not by itself determine the second flip.
- Knowing the first flip is heads does not change the chance that the two flips match.
- By symmetry, the same holds for the second flip and the matching event.

However, the three events are not mutually independent. If both \(A_1\) and \(A_2\) occur, then both flips are heads, so they must be the same. Therefore,

$$
\Pr(A_3\mid A_1\cap A_2)=1.
$$

The pairwise relationships conceal a dependency involving all three events.

---

## Intersections of Dependent Events

When events are not independent, their intersection probability cannot generally be found by multiplying their unconditional probabilities.

### Two-coin example

The lecture defined:

- \(A_1\): both flips are heads.
- \(A_2\): the first flip is heads.

Then

$$
\Pr(A_1)=\frac14,
\qquad
\Pr(A_2)=\frac12.
$$

Because \(A_1\) automatically implies \(A_2\),

$$
\Pr(A_1\cap A_2)=\frac14.
$$

This is not equal to

$$
\Pr(A_1)\Pr(A_2)
=
\frac14\cdot\frac12
=
\frac18.
$$

The conditional-probability rule does work:

$$
\Pr(A_1\cap A_2)
=
\Pr(A_1)\Pr(A_2\mid A_1).
$$

Here,

$$
\Pr(A_2\mid A_1)=1,
$$

so

$$
\Pr(A_1\cap A_2)
=
\frac14\cdot 1
=
\frac14.
$$

This formula accounts for the dependency between the events.

---

## The Product Rule

The product rule extends the two-event conditional-probability identity to a sequence of events:

$$
\Pr\left(\bigcap_{i=1}^{n}A_i\right)
=
\Pr(A_1)
\Pr(A_2\mid A_1)
\Pr(A_3\mid A_1\cap A_2)
\cdots
\Pr\left(A_n\mid\bigcap_{i=1}^{n-1}A_i\right).
$$

Each new factor gives the probability of the next event conditioned on all preceding events.

### Three-event form

For three events,

$$
\Pr(A_1\cap A_2\cap A_3)
=
\Pr(A_1)
\Pr(A_2\mid A_1)
\Pr(A_3\mid A_1\cap A_2).
$$

The first two factors give the probability of \(A_1\cap A_2\). The final factor then extends that intersection to include \(A_3\).

### Heart-flush walkthrough

Let \(A_i\) be the event that the \(i\)-th card drawn is a heart. A five-card heart flush is the event

$$
A_1\cap A_2\cap A_3\cap A_4\cap A_5.
$$

The first card is a heart with probability

$$
\frac{13}{52}.
$$

Conditioned on that first card being a heart, there are \(12\) hearts among \(51\) remaining cards, so the second factor is

$$
\frac{12}{51}.
$$

Continuing in the same way gives

$$
\Pr(A_1\cap A_2\cap A_3\cap A_4\cap A_5)
=
\frac{13}{52}
\cdot
\frac{12}{51}
\cdot
\frac{11}{50}
\cdot
\frac{10}{49}
\cdot
\frac{9}{48}.
$$

The lecture reported this probability as approximately

$$
0.005.
$$

This calculation reaches the result directly by following the successive draws, instead of counting the number of flush hands and dividing by the number of hands.

### Independent coin-flip walkthrough

Suppose a fair coin is flipped three times and \(A_i\) is the event that flip \(i\) is heads. The product rule gives

$$
\Pr(A_1\cap A_2\cap A_3)
=
\Pr(A_1)
\Pr(A_2\mid A_1)
\Pr(A_3\mid A_1\cap A_2).
$$

The flips are independent, so conditioning on previous flips does not change the next probability:

$$
\Pr(A_1)=\frac12,
$$

$$
\Pr(A_2\mid A_1)=\Pr(A_2)=\frac12,
$$

and

$$
\Pr(A_3\mid A_1\cap A_2)=\Pr(A_3)=\frac12.
$$

Therefore,

$$
\Pr(A_1\cap A_2\cap A_3)
=
\frac12\cdot\frac12\cdot\frac12
=
\frac18.
$$

For independent events, the product rule reduces to ordinary multiplication of the individual probabilities.

---

## Inductive Proof of the Product Rule

The lecture proved the product rule by induction on the number of events.

### Base case

For \(n=1\), the statement is simply

$$
\Pr(A_1)=\Pr(A_1),
$$

so the rule holds.

### Inductive hypothesis

Assume the rule holds for the first \(n-1\) events:

$$
\Pr\left(\bigcap_{i=1}^{n-1}A_i\right)
=
\Pr(A_1)
\Pr(A_2\mid A_1)
\cdots
\Pr\left(A_{n-1}\mid\bigcap_{i=1}^{n-2}A_i\right).
$$

### Inductive step

Regroup the \(n\)-event intersection as

$$
\bigcap_{i=1}^{n}A_i
=
\left(\bigcap_{i=1}^{n-1}A_i\right)\cap A_n.
$$

Applying the two-event conditional-probability identity gives

$$
\Pr\left(\bigcap_{i=1}^{n}A_i\right)
=
\Pr\left(\bigcap_{i=1}^{n-1}A_i\right)
\Pr\left(A_n\mid\bigcap_{i=1}^{n-1}A_i\right).
$$

The inductive hypothesis replaces the first factor with the product for \(A_1,\ldots,A_{n-1}\). This yields

$$
\begin{aligned}
\Pr\left(\bigcap_{i=1}^{n}A_i\right)
={}&
\Pr(A_1)
\Pr(A_2\mid A_1)
\cdots\\
&\Pr\left(A_{n-1}\mid\bigcap_{i=1}^{n-2}A_i\right)
\Pr\left(A_n\mid\bigcap_{i=1}^{n-1}A_i\right),
\end{aligned}
$$

which is the desired \(n\)-event product rule.

---

## Probabilities of Unions

Probabilities of unions have the same overcounting issue as sizes of unions. In general,

$$
\Pr(A_1\cup A_2)
\ne
\Pr(A_1)+\Pr(A_2),
$$

because an outcome in both events would be counted twice on the right.

The probability version of inclusion-exclusion is

$$
\Pr\left(\bigcup_{i=1}^{n}A_i\right)
=
\sum_{k=1}^{n}
(-1)^{k-1}
\sum_{\substack{I\subseteq\{1,\ldots,n\}\\|I|=k}}
\Pr\left(\bigcap_{i\in I}A_i\right).
$$

This is the same alternating pattern as the set-size formula:

- Add the probabilities of individual events.
- Subtract the probabilities of pairwise intersections.
- Add the probabilities of three-way intersections.
- Continue alternating through the full intersection.

---

## Three Four-Sided Dice Example

Suppose three fair four-sided dice are rolled. Let \(A_i\) be the event that the \(i\)-th die shows \(4\). Winning means that at least one die shows \(4\), so the winning event is

$$
A_1\cup A_2\cup A_3.
$$

Simply summing the individual probabilities gives

$$
\frac14+\frac14+\frac14=\frac34,
$$

but this overcounts rolls containing more than one \(4\).

The lecture noted that this approach cannot be generally correct: if one continued adding \(\frac14\) for enough dice, the claimed probability could reach or exceed \(1\), even though a win is not guaranteed.

### Inclusion-exclusion calculation

For each individual event,

$$
\Pr(A_i)=\frac14.
$$

Because the dice rolls are independent, each pairwise intersection has probability

$$
\Pr(A_i\cap A_j)
=
\frac14\cdot\frac14
=
\frac1{16}.
$$

The three-way intersection has probability

$$
\Pr(A_1\cap A_2\cap A_3)
=
\frac14\cdot\frac14\cdot\frac14
=
\frac1{64}.
$$

Therefore,

$$
\begin{aligned}
\Pr(A_1\cup A_2\cup A_3)
={}&
\Pr(A_1)+\Pr(A_2)+\Pr(A_3)\\
&-\Pr(A_1\cap A_2)
-\Pr(A_1\cap A_3)
-\Pr(A_2\cap A_3)\\
&+\Pr(A_1\cap A_2\cap A_3).
\end{aligned}
$$

Substituting the values gives

$$
\Pr(A_1\cup A_2\cup A_3)
=
3\left(\frac14\right)
-
3\left(\frac1{16}\right)
+
\frac1{64}.
$$

Using denominator \(64\),

$$
\Pr(A_1\cup A_2\cup A_3)
=
\frac{48}{64}
-
\frac{12}{64}
+
\frac1{64}
=
\frac{37}{64}.
$$

The first term counts all outcomes with a \(4\) in any designated position. Subtracting the pairwise intersections corrects the double counts. The outcome with three \(4\)s was initially counted three times and then removed three times, so the final three-way term adds it back once.

---

## Mutually Exclusive Events

Events are mutually exclusive when they have no outcomes in common. For two such events,

$$
A\cap B=\varnothing.
$$

Because there is no overlap to double count,

$$
\Pr(A\cup B)=\Pr(A)+\Pr(B).
$$

The same idea applies to a collection of mutually exclusive events: their union probability is the sum of their individual probabilities.

### Flush example

A heart flush and a diamond flush have no outcomes in common. A hand cannot simultaneously contain only hearts and only diamonds. Therefore, probabilities for the different suit flushes can be added directly.

The lecture contrasted the two main shortcuts:

- Intersections are easy when events are independent, because their probabilities multiply.
- Unions are easy when events are mutually exclusive, because their probabilities add.

---

## Computing a Union Through Its Complement

When events overlap but are independent, a union can sometimes be evaluated more easily through its complement.

For the three-dice game, winning means that at least one die shows \(4\). Its complement is the event that no die shows \(4\). Thus,

$$
\Pr(A_1\cup A_2\cup A_3)
=
1-\Pr(A_1^c\cap A_2^c\cap A_3^c).
$$

Each die fails to show \(4\) with probability

$$
\frac34.
$$

Because the die rolls are independent,

$$
\Pr(A_1^c\cap A_2^c\cap A_3^c)
=
\left(\frac34\right)^3
=
\frac{27}{64}.
$$

Therefore,

$$
\Pr(A_1\cup A_2\cup A_3)
=
1-\frac{27}{64}
=
\frac{37}{64}.
$$

This produces the same result as the full inclusion-exclusion calculation with less work.

The technique is to reinterpret “at least one success” as one minus “all failures.” Independence then turns the intersection of failures into a product.

---

## The Cost of Full Inclusion-Exclusion

For \(n\) events, full inclusion-exclusion contains

$$
\binom{n}{1}
+
\binom{n}{2}
+
\cdots
+
\binom{n}{n}
$$

terms.

The lecture stated that this sum equals

$$
2^n-1.
$$

It also noted that this identity can be proved through the binomial theorem using \(a=1\) and \(b=1\), paralleling the earlier substitution \(a=1\), \(b=-1\).

For \(100\) events, a full calculation would involve on the order of \(2^{100}\) terms, making exact inclusion-exclusion impractical in many complicated problems.

---

## Truncating Inclusion-Exclusion

Instead of computing every term, one can stop the alternating sum early. Let \(n_s\) denote the largest intersection size included.

The lecture stated:

- If \(n_s\) is odd, the truncated expression is an overestimate of the true union probability.
- If \(n_s\) is even, the truncated expression is an underestimate.

For the three-dice example, stopping after the individual probabilities gives

$$
\Pr(A_1)+\Pr(A_2)+\Pr(A_3)
=
\frac34.
$$

Because this truncation stops after an odd-sized term, it overestimates the true probability:

$$
\frac{37}{64}\le \frac34.
$$

Stopping after the pairwise-intersection terms produces an underestimate.

### The one-term union bound

The most common simple truncation keeps only the individual probabilities:

$$
\Pr\left(\bigcup_{i=1}^{n}A_i\right)
\le
\sum_{i=1}^{n}\Pr(A_i).
$$

Although this may be a loose estimate, it can be sufficient when the sum on the right is already small. The lecture motivated this with the idea of bounding the probability that any one of many undesirable events occurs, such as a collision among identifiers assigned to a group of children. Instead of exactly correcting every possible overlap, one can sum the probabilities of the pairwise collision events to obtain an upper bound.