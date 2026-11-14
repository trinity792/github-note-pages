---
title: L19 Random Variables and Expectation
Content Type: Lecture
Content Area:
Course: CS70
description: "The lecture defined random variables as functions from sample outcomes to real numbers, then developed events, distributions, probability mass functions, and expectation through coin, dice, and homework-permutation examples. It also introduced Bernoulli, binomial, uniform, and geometric random variables, including the geometric distribution's tail probabilities and memoryless property."
pinned: false
Date Published: November 3, 2026
Last Updated: November 3, 2026
Status: Finalized
---

# L19 Random Variables and Expectation

## Executive Summary

This lecture built the formal theory of random variables on top of sample spaces and events. It began with intuitive quantities such as the number of heads in four coin flips, then formalized a random variable as a function that maps every outcome in a sample space to a real number.

The lecture explained how a random variable partitions its sample space into events of the form $\{X=a\}$ and how its distribution records each possible value together with its probability. Detailed examples included the sum of two dice, the longest run in four coin flips, and the number of students who receive their own homework after a random permutation.

Expectation was defined as a probability-weighted average:

$$
\mathbb{E}[X]
=
\sum_{a\in \operatorname{range}(X)}
a\,\Pr(X=a).
$$

For natural-number-valued random variables, the lecture also derived the tail-sum formula

$$
\mathbb{E}[X]
=
\sum_{i=1}^{\infty}\Pr(X\ge i).
$$

The final part introduced four standard families of random variables:

- A Bernoulli random variable models one binary trial.
- A binomial random variable counts successes across multiple trials.
- A uniform random variable assigns equal probability to each value in a finite range.
- A geometric random variable counts the number of trials needed to obtain the first success.

The geometric distribution was used to illustrate tail probabilities, memorylessness, the gambler's fallacy, and the stated expectation $\mathbb{E}[X]=1/p$.

---

## Intuition for Random Variables

Suppose a fair coin is flipped four times and $X$ is the number of heads. Before seeing the flips, $X$ is not known, but its possible values are

$$
X\in\{0,1,2,3,4\}.
$$

This allows ordinary arithmetic expressions involving $X$ to be interpreted before the experiment is performed:

- $X+3$ can take values from $3$ through $7$.
- $X-X=0$ regardless of the outcome.
- $X^2$ can take the values
  $$
  0,1,4,9,16.
  $$
  It cannot equal $7$.

The informal picture is that a random variable is an unknown numerical quantity with a specified set of possible values and associated probabilities. The formal definition replaces this idea of a "fuzzy number" with an ordinary function.

### Two related random variables

In the same four-flip experiment, let

- $X$ be the number of heads, and
- $Y$ be the number of tails.

Because every flip is either a head or a tail,

$$
X+Y=4
$$

for every outcome.

The difference $X-Y$ can be

$$
-4,-2,0,2,4.
$$

It cannot be $1$. The two variables are tied to the same underlying experiment, so their possible combinations are constrained.

### Randomly returning homework

Suppose the homework of $100$ students is shuffled and randomly returned. Let $X$ be the number of students who receive their own homework.

The value can be $0$, and the largest possible value is $100$. However, $X$ cannot be $99$: if $99$ students receive their own homework, the remaining homework must also go to its owner.

The instructor stated that receiving exactly one correct homework is much more likely than receiving exactly three, and that the average number of students receiving their own homework is one. The calculation of that average was deferred to later material.

---

## Formal Definition of a Random Variable

A random variable is a function from the outcomes in a sample space to real numbers. If the sample space is $\Omega$, then the lecture described a random variable as

$$
X:\Omega\to\mathbb{R}.
$$

For each outcome $\omega\in\Omega$, the value $X(\omega)$ is the real number assigned to that outcome.

Although the codomain is written as $\mathbb{R}$, a particular example may use only a small subset of the real numbers.

### Four coin flips

For four coin flips, the sample space contains $16$ sequences. The random variable $X$ counts the heads in each sequence.

The outcomes are grouped by their images under $X$:

- There is one outcome with no heads: $TTTT$.
- There are $\binom41=4$ outcomes with one head.
- There are $\binom42=6$ outcomes with two heads.
- There are four outcomes with three heads.
- There is one outcome with four heads: $HHHH$.

For example,

$$
X(TTHH)=2.
$$

The sample sequences form the domain, while the values actually attained are

$$
\{0,1,2,3,4\}.
$$

### Returning homework

For the homework experiment, the domain consists of permutations of the students' homework. The random variable maps each permutation to the number of students whose homework remains in its original position.

Thus, the underlying outcome is an entire permutation, while the random variable extracts one numerical feature of that permutation.

### Sum of two dice

Suppose two six-sided dice are rolled and $X$ is their sum. There are $6\cdot6=36$ ordered outcomes.

The function maps ordered pairs to sums:

$$
X(1,1)=2,
$$

$$
X(1,2)=X(2,1)=3,
$$

$$
X(3,3)=6,
$$

$$
X(4,6)=10,
$$

and

$$
X(6,6)=12.
$$

The domain consists of ordered pairs of die results, while the values attained range from $2$ through $12$.

The distinction matters: the base sample space has $36$ outcomes, but the random variable collapses many of those outcomes onto the same sum.

---

## A Random Variable with an Infinite Domain and Range

Consider repeatedly flipping a coin until the first head appears. Let $X$ be the number of flips required.

The possible outcomes are

$$
H,\ TH,\ TTH,\ TTTH,\ldots
$$

and the corresponding values are

$$
X(H)=1,
$$

$$
X(TH)=2,
$$

and, for example,

$$
X(TTTTTH)=6.
$$

The domain is the infinite collection of sequences consisting of zero or more tails followed by one head. Its cardinality is infinite.

The range is

$$
\{1,2,3,\ldots\},
$$

which also has infinite cardinality.

A sequence such as $HTHTTTH$ does not obey the stated form of the experiment. The instructor chose to treat such a sequence as outside the domain, while noting that one could alternatively define the function to count only until its first head.

---

## Events Induced by a Random Variable

A statement such as $X=a$ represents an event: the set of all outcomes that the random variable maps to $a$.

Formally,

$$
\{X=a\}
=
\{\omega\in\Omega:X(\omega)=a\}.
$$

The shorthand $\{X=a\}$ avoids repeatedly writing the full set-builder expression.

### Longest runs in four coin flips

Let $C$ map a sequence of four coin flips to the length of its longest run of identical results.

Examples include:

$$
C(HTTT)=3,
$$

because the longest run is the final three tails, and

$$
C(HHTH)=2,
$$

because the longest run consists of the first two heads.

The event $\{C=4\}$ contains exactly the two constant sequences:

$$
\{C=4\}=\{HHHH,TTTT\}.
$$

For a fair coin, every four-flip sequence has probability $1/16$, so

$$
\Pr(C=4)=\frac{2}{16}.
$$

This illustrates how a numerical statement about a random variable corresponds to an ordinary event in the original sample space.

---

## Random Variables Partition the Sample Space

A collection of events partitions a sample space when:

1. Their union is the entire sample space.
2. Distinct events do not overlap.

A random variable creates such a partition through its level sets

$$
\{X=a\}.
$$

Every outcome is covered because the random variable is defined on every outcome in its domain. No outcome can belong to two different level sets because a function assigns exactly one value to each input.

For the longest-run variable $C$, the events

$$
\{C=1\},\quad
\{C=2\},\quad
\{C=3\},\quad
\{C=4\}
$$

cover all four-flip sequences and are mutually exclusive.

Likewise, the sum of two dice partitions the $36$ ordered pairs into the events

$$
\{X=2\},\{X=3\},\ldots,\{X=12\}.
$$

Each ordered pair has exactly one sum, so it lies in exactly one of these events.

---

## Distributions and Probability Mass Functions

The distribution of a random variable records every value in its range together with the probability of that value.

For the longest-run variable $C$, the lecture gave

$$
\Pr(C=1)=\frac{2}{16},
$$

$$
\Pr(C=2)=\frac{8}{16},
$$

$$
\Pr(C=3)=\frac{4}{16},
$$

and

$$
\Pr(C=4)=\frac{2}{16}.
$$

The same distribution can be represented as a collection of value-probability pairs, a table, or a plot. These are different representations of the same information.

The function that maps a possible value to its probability is called the probability mass function. The lecture noted that this term is common in other probability courses, including EECS 126, although it is not usually emphasized in CS70.

### Distribution of the sum of two dice

For one fair six-sided die, every outcome has probability $1/6$, so its distribution is flat.

For the sum of two dice, the outcomes are not equally probable. The lecture displayed the distribution

$$
\begin{array}{c|ccccccccccc}
a&2&3&4&5&6&7&8&9&10&11&12\\
\hline
\Pr(X=a)&
\frac1{36}&
\frac2{36}&
\frac3{36}&
\frac4{36}&
\frac5{36}&
\frac6{36}&
\frac5{36}&
\frac4{36}&
\frac3{36}&
\frac2{36}&
\frac1{36}
\end{array}
$$

because different sums arise from different numbers of ordered pairs.

The instructor mentioned that when random variables are added, their probability mass functions combine through an operation called convolution, but did not develop convolution further.

### Number of heads in 100 flips

Let $X$ be the number of heads in $100$ fair coin flips. For a particular value $a$,

$$
\Pr(X=a)
=
\frac{\binom{100}{a}}{2^{100}}.
$$

The numerator counts the sequences with exactly $a$ heads by choosing which $a$ of the $100$ positions contain heads. The denominator counts all length-$100$ sequences of heads and tails.

The resulting distribution is largest near $50$. Values such as $60$ are possible but less likely, while a value such as $80$ is extremely unlikely.

---

## Homework Permutations with Three Students

Consider three students and a uniformly random permutation of their homework. The six possible permutations are

$$
123,\ 132,\ 213,\ 231,\ 312,\ 321.
$$

Let $X$ be the number of students who receive their own homework. Evaluating $X$ on each permutation gives:

$$
X(123)=3,
$$

because everyone receives the correct homework;

$$
X(132)=1,
$$

because only student $1$ does;

$$
X(213)=1,
$$

because only student $3$ does;

$$
X(231)=0,
$$

$$
X(312)=0,
$$

and

$$
X(321)=1,
$$

because only student $2$ does.

Therefore,

$$
\Pr(X=0)=\frac{2}{6},
$$

$$
\Pr(X=1)=\frac{3}{6},
$$

$$
\Pr(X=2)=\frac{0}{6},
$$

and

$$
\Pr(X=3)=\frac{1}{6}.
$$

The instructor noted two possible conventions. One may list $2$ as a possible numerical entry with probability zero, or one may define the range as only the values actually attained:

$$
\operatorname{range}(X)=\{0,1,3\}.
$$

The instructor preferred the latter interpretation but accepted either convention for this discussion.

The topic of counting permutations with no fixed points was identified as relating to derangements, but no general derangement formula was developed.

---

## Expectation

The expectation of a random variable is its probability-weighted average. It is intended to represent the value toward which an empirical average approaches when the experiment is repeated many times.

If $X$ takes values $a$, then

$$
\mathbb{E}[X]
=
\sum_{a\in\operatorname{range}(X)}
a\,\Pr(X=a).
$$

Each possible value is multiplied by the probability with which it occurs, and those products are added.

An expectation does not have to be a value the random variable can actually attain.

### Simulation intuition

The lecture considered repeatedly flipping four coins and recording the number of heads. Early empirical averages varied, with examples such as $1.7$ after a small number of trials and approximately $1.99$ after many more trials.

As the experiment is repeated, the observed histogram increasingly resembles the theoretical distribution, while the empirical average approaches the expectation. This motivates treating the expectation as the idealized long-run average associated with the random variable.

### Expected number of heads in four fair flips

For four fair coin flips, the number of heads has distribution

$$
\Pr(X=0)=\frac1{16},
\qquad
\Pr(X=1)=\frac4{16},
\qquad
\Pr(X=2)=\frac6{16},
$$

$$
\Pr(X=3)=\frac4{16},
\qquad
\Pr(X=4)=\frac1{16}.
$$

Substituting into the definition gives

$$
\begin{aligned}
\mathbb{E}[X]
&=
0\cdot\frac1{16}
+1\cdot\frac4{16}
+2\cdot\frac6{16}
+3\cdot\frac4{16}
+4\cdot\frac1{16}\\
&=2.
\end{aligned}
$$

Thus, the average number of heads in four fair flips is two.

---

## The Tail-Sum Formula for Expectation

For a random variable whose range is a subset of the natural numbers, the lecture gave a second formula:

$$
\mathbb{E}[X]
=
\sum_{i=1}^{\infty}\Pr(X\ge i).
$$

Unlike the original expectation formula, this version was stated only for natural-number-valued random variables.

### Four-flip example

For the number of heads in four fair flips,

$$
\Pr(X\ge1)=\frac{15}{16},
$$

because only the all-tails outcome fails;

$$
\Pr(X\ge2)=\frac{11}{16};
$$

$$
\Pr(X\ge3)=\frac{5}{16};
$$

and

$$
\Pr(X\ge4)=\frac{1}{16}.
$$

Therefore,

$$
\mathbb{E}[X]
=
\frac{15}{16}
+\frac{11}{16}
+\frac{5}{16}
+\frac{1}{16}
=2.
$$

This agrees with the original weighted-sum calculation.

### Derivation by rearranging terms

Write

$$
P_i=\Pr(X=i).
$$

The original definition expands as

$$
\mathbb{E}[X]
=
0P_0+1P_1+2P_2+3P_3+4P_4+\cdots.
$$

Repeated multiplication can be replaced by repeated addition:

$$
\mathbb{E}[X]
=
P_1+(P_2+P_2)+(P_3+P_3+P_3)+\cdots.
$$

The terms can then be regrouped by columns:

$$
\mathbb{E}[X]
=
(P_1+P_2+P_3+\cdots)
+(P_2+P_3+\cdots)
+(P_3+\cdots)
+\cdots.
$$

Each parenthesized expression is a tail probability:

$$
P_1+P_2+P_3+\cdots=\Pr(X\ge1),
$$

$$
P_2+P_3+\cdots=\Pr(X\ge2),
$$

and similarly for the remaining terms. Hence,

$$
\mathbb{E}[X]
=
\sum_{i=1}^{\infty}\Pr(X\ge i).
$$

---

## Bernoulli Random Variables

A Bernoulli random variable models one binary trial. Its only possible values are zero and one.

For a parameter $p$,

$$
\Pr(X=1)=p
$$

and

$$
\Pr(X=0)=1-p.
$$

This models a possibly biased coin if $X=1$ represents heads and $X=0$ represents tails. For example, if the coin comes up heads with probability $0.75$, the lecture described $X$ as a Bernoulli random variable with parameter $p=0.75$.

The notation was presented as

$$
X\sim\operatorname{Bernoulli}(p),
$$

meaning that $X$ is distributed as a Bernoulli random variable with parameter $p$.

A Bernoulli variable can also model a binary event such as whether a hard drive fails on a particular day.

### Expectation of a Bernoulli variable

Using the definition of expectation,

$$
\begin{aligned}
\mathbb{E}[X]
&=
0\cdot(1-p)+1\cdot p\\
&=p.
\end{aligned}
$$

Thus,

$$
\mathbb{E}[X]=p.
$$

For example, if $p=0.5$, then the expectation is $0.5$, even though the variable itself can only be $0$ or $1$. This demonstrates that an expectation need not belong to the range.

### Adding two Bernoulli variables

Let $X_1$ and $X_2$ be independent Bernoulli random variables with parameter $p$, and define

$$
Y=X_1+X_2.
$$

This sum is not Bernoulli because its range is

$$
\{0,1,2\},
$$

rather than just $\{0,1\}$.

Its distribution is

$$
\Pr(Y=0)=(1-p)^2,
$$

$$
\Pr(Y=1)=2p(1-p),
$$

and

$$
\Pr(Y=2)=p^2.
$$

Using the expectation formula,

$$
\mathbb{E}[Y]
=
0\cdot(1-p)^2
+1\cdot2p(1-p)
+2\cdot p^2
=
2p.
$$

The lecture noted that a more convenient way to compute this expectation would be introduced later.

---

## Binomial Random Variables

A binomial random variable models the number of heads, or successes, across a fixed number of independent trials with common success probability $p$.

The lecture described a binomial distribution using two parameters:

- $n$ is the number of trials.
- $p$ is the probability of a head on each trial.

A binomial random variable can be viewed as the sum of $n$ Bernoulli random variables.

### Five-flip derivation

Suppose $n=5$, and let $X$ count the number of heads.

For the particular sequence $HHTHT$, the probability is

$$
p^3(1-p)^2,
$$

because it contains three heads and two tails.

The sequence $TTHHH$ has the same probability because it also contains three heads and two tails.

To calculate $\Pr(X=3)$, count all sequences with exactly three heads. There are

$$
\binom53
$$

such sequences. Since each has probability $p^3(1-p)^2$,

$$
\Pr(X=3)
=
\binom53p^3(1-p)^2.
$$

More generally, for $i\in\{0,1,\ldots,5\}$,

$$
\Pr(X=i)
=
\binom5i p^i(1-p)^{5-i}.
$$

### General binomial probability mass function

Replacing five by an arbitrary number of trials $n$ gives

$$
\Pr(X=i)
=
\binom ni p^i(1-p)^{n-i},
\qquad
i=0,1,\ldots,n.
$$

The factors have distinct roles:

- $\binom ni$ counts the sequences containing exactly $i$ heads.
- $p^i$ is the contribution of those $i$ heads.
- $(1-p)^{n-i}$ is the contribution of the remaining $n-i$ tails.

The lecture emphasized that students should be able to reconstruct this counting argument, rather than only memorize the final formula.

As more Bernoulli variables are added, the displayed binomial distributions become increasingly bell-shaped. The lecture did not derive the expectation of a binomial random variable in this session.

---

## Uniform Random Variables

A finite uniform random variable assigns equal probability to each value in its range. A fair die was the primary example.

If

$$
X\sim\operatorname{Uniform}\{1,2,\ldots,n\},
$$

then every value has probability

$$
\Pr(X=i)=\frac1n.
$$

For a fair six-sided die,

$$
\Pr(X=i)=\frac16
$$

for each $i\in\{1,2,3,4,5,6\}$.

The expectation is computed from the usual formula:

$$
\mathbb{E}[X]
=
1\cdot\frac1n
+2\cdot\frac1n
+\cdots
+n\cdot\frac1n.
$$

For a six-sided die, the instructor stated that the average roll is $3.5$, even though $3.5$ is not an attainable die result.

---

## Geometric Random Variables

A geometric random variable models the number of independent trials needed to obtain the first success.

In the coin-flip version, a head occurs with probability $p$, and $X$ is the number of flips until the first head.

The domain is

$$
H,\ TH,\ TTH,\ TTTH,\ldots,
$$

and the range is

$$
\{1,2,3,\ldots\}.
$$

The lecture used the convention that the successful flip is included in the count. It noted that some sources instead count the number of failures before the first success, producing a range shifted by one.

### Probability mass function

The event $X=1$ occurs when the first flip is a head:

$$
\Pr(X=1)=p.
$$

The event $X=2$ occurs when the first flip is a tail and the second is a head:

$$
\Pr(X=2)=(1-p)p.
$$

The event $X=3$ occurs after two tails followed by a head:

$$
\Pr(X=3)=(1-p)^2p.
$$

Generalizing,

$$
\Pr(X=i)
=
(1-p)^{i-1}p,
\qquad i=1,2,3,\ldots.
$$

The exponent $i-1$ counts the tails before the first head, and the final factor $p$ is the probability of the head ending the sequence.

### Verifying that the probabilities sum to one

The total mass is

$$
\sum_{i=1}^{\infty}(1-p)^{i-1}p.
$$

Factor out $p$:

$$
p\sum_{i=1}^{\infty}(1-p)^{i-1}.
$$

Using the geometric-series formula with ratio $1-p$,

$$
\sum_{i=1}^{\infty}(1-p)^{i-1}
=
\frac{1}{1-(1-p)}
=
\frac1p.
$$

Therefore,

$$
p\cdot\frac1p=1.
$$

Thus, the stated probability mass function assigns total probability one.

---

## Geometric Tail Probabilities

For a geometric random variable, the event $X>6$ means that no head appears in the first six flips. Therefore, all of those flips must be tails.

Since each tail has probability $1-p$,

$$
\Pr(X>6)=(1-p)^6.
$$

More generally,

$$
\Pr(X>a)=(1-p)^a.
$$

This avoids summing the infinite series

$$
\sum_{i=a+1}^{\infty}\Pr(X=i).
$$

The direct event description is simpler: needing more than $a$ flips is exactly the event that the first $a$ flips are all failures.

For the numerical value $p=0.2$ used in the lecture,

$$
\Pr(X>6)=0.8^6.
$$

---

## Memorylessness and the Gambler's Fallacy

A geometric random variable is memoryless. If $m$ failures have already occurred, that history does not make success on a later flip more likely.

The property was written as

$$
\Pr(X>n+m\mid X>m)
=
\Pr(X>n).
$$

The left side asks for the probability of waiting at least $n$ additional flips, given that the first $m$ flips have already failed.

### Derivation

By the conditional-probability formula,

$$
\Pr(X>n+m\mid X>m)
=
\frac{\Pr(X>n+m)}{\Pr(X>m)}.
$$

Using the geometric tail formula,

$$
\Pr(X>n+m)=(1-p)^{n+m}
$$

and

$$
\Pr(X>m)=(1-p)^m.
$$

Therefore,

$$
\begin{aligned}
\Pr(X>n+m\mid X>m)
&=
\frac{(1-p)^{n+m}}{(1-p)^m}\\
&=(1-p)^n\\
&=\Pr(X>n).
\end{aligned}
$$

The factor corresponding to the first $m$ failures cancels, so the remaining waiting-time distribution is unchanged.

This was connected to the gambler's fallacy. A long sequence of losses, tails, or one roulette color does not by itself make the opposite result more likely on the next independent trial.

---

## Expected Waiting Time for a Geometric Variable

The lecture simulated repeated experiments in which heads occurred with probability

$$
p=0.2.
$$

Each run recorded the number of flips required to obtain the first head. Individual runs varied, including one run that took $13$ flips, but the observed average approached five.

The stated relationship was

$$
\mathbb{E}[X]=\frac1p.
$$

For $p=0.2$,

$$
\mathbb{E}[X]
=
\frac1{0.2}
=
5.
$$

The derivation was left as an exercise using the tail-sum formula together with

$$
\Pr(X>i)=(1-p)^i
$$

and the geometric-series formula. The lecture did not complete that derivation.

---

## Unclear or Incomplete Steps

In discussing a uniform random variable on $\{1,\ldots,n\}$, these notes state that the expectation "gets you up to $N$ plus $1/2$." The placement of parentheses was not recoverable from these notes. The six-sided-die example immediately afterward gives the expectation as $3.5$.

During the geometric simulation, the instructor described the empirical shape as "the exponential distribution." these notes did not clarify whether this was intended as a description of the plotted geometric distribution's shape or as a separate named distribution.

The expectation formula

$$
\mathbb{E}[X]=\frac1p
$$

for a geometric random variable was stated and supported by simulation, but its proof was explicitly left as a take-home exercise rather than completed in the lecture.