---
title: L16 Intro to Discrete Probability
Content Type: Lecture
Content Area:
Course: CS70
description: "The lecture formalized random experiments, sample spaces, probability functions, and events while distinguishing uniform from nonuniform probability spaces. It applied counting methods to dice, coin flips, poker hands, balls and bins, and the birthday paradox, with particular emphasis on choosing an ordered model to obtain a uniform probability space."
pinned: false
Date Published: October 22, 2026
Last Updated: October 22, 2026
Status: Finalized
---

# L16 Intro to Discrete Probability

## Executive Summary

This lecture built discrete probability on the counting methods from the previous lecture. It first reviewed the four combinations of whether order matters and whether replacement is allowed. It then defined random experiments, sample points, sample spaces, probability functions, probability spaces, uniformity, and events.

The examples showed how to calculate probabilities in both uniform and nonuniform spaces:

- Two fair or loaded four-sided dice illustrated probability functions, tree diagrams, and event probabilities.
- Fair and biased coin flips connected events such as “exactly six heads” to binomial counting.
- Poker hands showed why either ordered or unordered modeling works when drawing without replacement.
- Balls and bins demonstrated the advantage of artificially labeling outcomes to obtain a uniform probability space.
- The birthday paradox used a complementary event to calculate the probability that at least two people share a birthday.

A recurring modeling principle was to count order even when the real-world question does not care about order, provided that doing so makes all sample points equally likely.

---

## Review of Counting Problems

The lecture began by recalling four counting models. Each model draws $K$ items from a set of size $N$, with the answer determined by whether order matters and whether replacement is allowed.

### (yOnR) Order matters and replacement is not allowed

There are $N$ choices for the first draw, $N-1$ for the second, and so on. The final draw has $N-K+1$ choices. Therefore, the number of outcomes is

$$
N(N-1)\cdots(N-K+1)
=
\frac{N!}{(N-K)!}.
$$

This model applies when an object cannot be drawn twice and two sequences containing the same objects in different orders count as different outcomes.

### (yOyR) Order matters and replacement is allowed

Every one of the $K$ draws has $N$ possibilities, so the number of outcomes is

$$
N^K.
$$

### (nOnR) Order does not matter and replacement is not allowed

One chooses which $K$ objects appear, without distinguishing their order. The number of possibilities is

$$
\binom{N}{K}.
$$

The lecture connected this formula to the ordered, no-replacement count:

$$
\binom{N}{K}
=
\frac{N(N-1)\cdots(N-K+1)}{K!}.
$$

The division by $K!$ groups together the $K!$ orderings of each chosen set. The instructor described this as first pretending that order matters and then “binning” or grouping equivalent orderings.

### (nOyR) Order does not matter and replacement is allowed

The reviewed formula was

$$
\binom{N+K-1}{K}.
$$

The lecture connected this to choosing separator positions in a binary-string representation. This fourth model was retained for completeness, although the instructor said it would be used less often in the present lecture.

---

## Why Probability Needs a Formal Model

Probability statements occur in ordinary reports, but their meanings require care. The lecture cited a report estimating a $9\%$ chance of a magnitude-nine earthquake in the Aleutian Islands within the next 50 years, with the potential to create a mega-tsunami threatening Hawaii. The question “What exactly does $9\%$ mean?” motivated the need for a precise probability model.

Probability intuition can also be misleading.

### Two specific sequences of 20 coin flips

The lecture compared two particular sequences of 20 fair coin flips:

- One sequence consisted entirely of heads.
- The other looked irregular, with a mixture of heads and tails.

Each specific sequence has probability

$$
\frac{1}{2^{20}}.
$$

Thus, the two displayed sequences are equally likely. The all-heads sequence feels less likely because it is recognizable and special to a human observer, not because that particular sequence has a smaller probability than another particular sequence.

### Shopping-center preview

The lecture previewed a later conditional-probability problem. One shopping center contains three Indian restaurants and two Moroccan restaurants. A second contains one Indian restaurant and one Moroccan restaurant. A center is chosen with probability $1/2$, and then a restaurant in that center is chosen uniformly.

If one wakes up in a Moroccan restaurant and asks which center was originally selected, the answer is not established merely by observing that two of the three Moroccan restaurants belong to the first center. The lecture deferred the calculation until a later class and used the example to emphasize that intuition alone is unreliable.

---

## Random Experiments and Sample Spaces

A random experiment is a procedure whose possible outcomes are being modeled. The lecture framed such an experiment as drawing a sample of $K$ items from a set $S$ with cardinality $N$.

Examples included drawing five balls from a bag containing 15 balls and rolling a four-sided die twice.

### Sample points

A sample point is one complete outcome of a single experiment. When a four-sided die is rolled twice, $(2,2)$ is one sample point.

The ordered pair records the result of the first roll and the result of the second roll.

### Sample space

The sample space, denoted by $\Omega$, is the set of all possible sample points.

For two rolls of a four-sided die, order matters and replacement is possible because the same number may occur on both rolls. Thus,

$$
|\Omega|=4^2=16.
$$

The sample space contains

$$
(1,1),(1,2),\ldots,(1,4),
(2,1),\ldots,(4,4).
$$

---

## Probability Spaces and Probability Functions

A probability space in this lecture consists of a sample space $\Omega$ together with a probability function $P$.

For every sample point $\omega\in\Omega$, the probability function assigns a real number satisfying

$$
0\le P(\omega)\le 1.
$$

The probabilities of all sample points must sum to one:

$$
\sum_{\omega\in\Omega}P(\omega)=1.
$$

A sample point with probability zero is impossible within the model.

### Uniform probability spaces

A probability space is uniform when all sample points are equally likely.

For two fair four-sided dice, there are 16 ordered outcomes, so every sample point has probability

$$
P(\omega)=\frac{1}{16}.
$$

The 16 probabilities sum to one:

$$
16\cdot\frac{1}{16}=1.
$$

### Tree representation

The experiment can be shown as a two-level tree. At the first level, the first roll has four possible values, each with probability $1/4$. From each of those branches, the second roll again has four possible values, each with probability $1/4$.

A complete path therefore has probability

$$
\frac14\cdot\frac14=\frac1{16}.
$$

The first level represents the first roll, and the second level represents the second roll.

---

## A Nonuniform Probability Space

Not every probability space is uniform. The lecture considered a loaded four-sided die for which

$$
P(1)=\frac58
$$

and

$$
P(2)=P(3)=P(4)=\frac18.
$$

The die is rolled twice.

### Probabilities of individual outcomes

The outcome $(1,1)$ has probability

$$
P((1,1))
=
\frac58\cdot\frac58
=
\frac{25}{64}.
$$

An outcome containing exactly one $1$, such as $(1,2)$ or $(3,1)$, has probability

$$
\frac58\cdot\frac18
=
\frac5{64}.
$$

An outcome containing no $1$s, such as $(2,4)$, has probability

$$
\frac18\cdot\frac18
=
\frac1{64}.
$$

The tree diagram expresses the same reasoning. There is a $5/8$ branch for rolling a $1$ and a $1/8$ branch for each other result. The probability of a complete path is the product of its two branch probabilities. The instructor described the two rolls as independent and noted that independence would be defined precisely in a later lecture.

---

## Why Ordered Modeling Can Be Easier

Two fair dice can be modeled without recording their order. In that model, $(1,2)$ and $(2,1)$ are represented by the same unordered outcome.

For two rolls from four possible values, the unordered-with-replacement sample space has ten outcomes:

$$
\{1,1\},\{1,2\},\{2,2\},\ldots,\{4,4\}.
$$

However, this model is nonuniform even when the dice are fair. For example,

$$
P(\{1,1\})=\frac1{16}
$$

because only the ordered outcome $(1,1)$ produces it, whereas

$$
P(\{1,2\})=\frac2{16}
$$

because either $(1,2)$ or $(2,1)$ produces it.

Both models are valid, but the ordered model gives a uniform probability space. The lecture therefore favored ordered modeling for dice and similar experiments, even when the real-world question does not care about order.

---

## Events

An event is any subset of the sample space:

$$
A\subseteq\Omega.
$$

An event collects all sample points satisfying a specified condition.

### Examples of events

For two four-sided dice, the event that the first roll is $1$ is

$$
A_{\text{first }1}
=
\{(1,1),(1,2),(1,3),(1,4)\}.
$$

Another event considered was that the sum of the two dice is not prime. The listed outcomes included those with sums $4$ and $6$, such as

$$
(3,1),\ (2,2),\ (1,3),\ (4,2),\ (3,3),\ (2,4),
$$

as well as $(1,1)$, whose sum is $2$ [unclear].

### Probability of an event

The probability of an event is the sum of the probabilities of its sample points:

$$
P(A)=\sum_{\omega\in A}P(\omega).
$$

For fair four-sided dice,

$$
P(A_{\text{first }1})
=
4\cdot\frac1{16}
=
\frac14.
$$

For the loaded dice,

$$
P(A_{\text{first }1})
=
\frac{25}{64}
+3\left(\frac5{64}\right)
=
\frac{40}{64}
=
\frac58
=
62.5\%.
$$

### Event that the second roll exceeds the first

The event consists of the six outcomes

$$
(1,2),(1,3),(1,4),(2,3),(2,4),(3,4).
$$

For the loaded dice, three of these outcomes contain exactly one $1$, so each has probability $5/64$. The other three contain no $1$, so each has probability $1/64$. Therefore,

$$
P(\text{second}>\text{first})
=
3\left(\frac5{64}\right)
+
3\left(\frac1{64}\right)
=
\frac{18}{64}
=
\frac9{32}.
$$

---

## Uniform Event Probabilities as Ratios of Set Sizes

When a probability space is uniform, the probability of an event can be computed by comparing the number of favorable sample points with the total number of sample points:

$$
P(A)=\frac{|A|}{|\Omega|}.
$$

This works because every sample point has the same probability.

When the space is nonuniform, cardinalities alone are insufficient. One must instead use

$$
P(A)=\sum_{\omega\in A}P(\omega).
$$

The coin-flip examples illustrated both cases.

---

## Fair Coin Flips

Suppose a fair coin is flipped 16 times and the order of the flips is recorded.

Each flip has two possible outcomes, so

$$
|\Omega|=2^{16}=65{,}536.
$$

Every particular sequence has probability

$$
\frac1{2^{16}}.
$$

### Exactly six heads

To form a sequence with exactly six heads, choose the six positions occupied by heads among the 16 positions. Therefore,

$$
|A_{\text{six heads}}|
=
\binom{16}{6}
=
8{,}008.
$$

The probability is

$$
P(A_{\text{six heads}})
=
\frac{\binom{16}{6}}{2^{16}}
\approx 12.2\%.
$$

Equivalently, one could choose the ten positions occupied by tails. The lecture emphasized that this is a no-order, no-replacement selection of positions: a position cannot be chosen twice, and the order in which the six head positions are selected does not matter.

---

## Biased Coin Flips

The lecture next considered a coin with

$$
P(H)=\frac13
\qquad\text{and}\qquad
P(T)=\frac23.
$$

This can model engineering events such as whether a component fails during a period, where one outcome has probability $1/3$ and the other has probability $2/3$.

### Four flips

For four consecutive heads,

$$
P(HHHH)
=
\left(\frac13\right)^4.
$$

For the specific ordered sequence $HTHT$,

$$
P(HTHT)
=
\frac13\cdot\frac23\cdot\frac13\cdot\frac23.
$$

### Exactly two heads in four flips

There are

$$
\binom42=6
$$

sequences containing exactly two heads and two tails.

Every such sequence has probability

$$
\left(\frac13\right)^2
\left(\frac23\right)^2
=
\frac4{81}.
$$

Since the six relevant sample points have equal probability within the event,

$$
P(\text{exactly two heads})
=
6\cdot\frac4{81}
=
\frac{24}{81}.
$$

### Exactly six heads in 16 flips

Any particular sequence containing six heads and ten tails has probability

$$
z_6
=
\left(\frac13\right)^6
\left(\frac23\right)^{10}.
$$

There are

$$
\binom{16}{6}=8{,}008
$$

such sequences. Hence,

$$
P(\text{exactly six heads})
=
\binom{16}{6}z_6
=
\binom{16}{6}
\left(\frac13\right)^6
\left(\frac23\right)^{10}.
$$

The lecture reported that this probability is approximately $19\%$.

The count of sample points is the same as in the fair-coin example, but the weights are different. Thus, the probability is not simply $8{,}008/2^{16}$.

### Fewer than four heads

“Fewer than four heads” means zero, one, two, or three heads. These cases are mutually exclusive, so their probabilities can be added.

For $i$ heads, any specific sequence has probability

$$
z_i
=
\left(\frac13\right)^i
\left(\frac23\right)^{16-i},
$$

and the number of such sequences is

$$
\binom{16}{i}.
$$

The lecture listed the relevant counts:

$$
\binom{16}{0}=1,\qquad
\binom{16}{1}=16,\qquad
\binom{16}{2}=120,\qquad
\binom{16}{3}=560.
$$

Therefore,

$$
P(\text{fewer than four heads})
=
\sum_{i=0}^{3}
\binom{16}{i}
\left(\frac13\right)^i
\left(\frac23\right)^{16-i}.
$$

Written term by term, this is

$$
1\cdot z_0
+
16\cdot z_1
+
120\cdot z_2
+
560\cdot z_3.
$$

The event is the union of the events for exactly zero, one, two, and three heads. Because those events contain no common sample points, their probabilities sum directly.

The instructor clarified a subtle point about zero heads. The single sequence of all tails is the most likely individual sequence because tails is the more likely result. That does not imply that the entire event “zero heads” must have greater probability than events containing many different sequences.

---

## Poker Hands

A standard deck contains 52 cards. Each card has one of four suits - spades, hearts, diamonds, or clubs - and one of 13 ranks, from ace through king.

A poker hand contains five cards. Replacement is not allowed because the same physical card cannot appear twice. The model may either record or ignore the order of the five cards.

### Unordered model

Ignoring order gives

$$
|\Omega|
=
\binom{52}{5}
=
2{,}598{,}960.
$$

The probability space is uniform: every five-card hand is equally likely.

Consequently, two specific displayed hands are equally likely, even if one has a visually recognizable pattern and would receive a better score in poker.

### Counting flushes without order

The lecture first counted heart flushes. There are 13 hearts, and a heart flush chooses five of them:

$$
\binom{13}{5}=1{,}287.
$$

There are four suits, so the number of flushes counted in the lecture is

$$
4\binom{13}{5}
=
5{,}148.
$$

Thus,

$$
P(\text{flush})
=
\frac{4\binom{13}{5}}{\binom{52}{5}}
\approx 0.2\%.
$$

### Ordered model

If order is recorded, then the total number of hands is

$$
52\cdot51\cdot50\cdot49\cdot48
=
311{,}875{,}200.
$$

For a heart flush, the five successive choices give

$$
13\cdot12\cdot11\cdot10\cdot9
=
154{,}440.
$$

Across four suits, the lecture gave

$$
4\cdot154{,}440=617{,}760.
$$

Dividing by the ordered sample-space size again produces approximately $0.2\%$.

### Why both models remain uniform

When drawing without replacement, converting an unordered hand to an ordered hand gives every hand the same number of orderings, namely $5!$. That factor appears in both the favorable count and the total count, so it cancels in their ratio.

This differs from unordered dice outcomes. With replacement, an outcome such as two identical rolls has fewer ordered representations than an outcome containing two different rolls. That stacking of ordered outcomes creates unequal weights in the unordered model. Without replacement, repeated cards cannot occur, so every unordered hand has the same number of orderings.

---

## Balls and Bins

The lecture considered dropping 20 balls independently into ten bins, with every ball equally likely to land in any bin.

Although a final picture of the bins does not visibly record the order in which the balls landed, the lecture labeled the balls and treated their placements as an ordered sequence. This choice creates a uniform probability space.

### Sample-space size

Every one of the 20 labeled balls has ten possible bins, so

$$
|\Omega|=10^{20}.
$$

A sample point is a sequence such as

$$
(5,6,2,6,8,\ldots),
$$

where the first entry is the bin containing the first ball, the second entry is the bin containing the second ball, and so on.

### Probability that the first bin is empty

If bin one must remain empty, every ball has only nine available bins. Therefore, the number of favorable placements is

$$
9^{20}.
$$

Because the ordered probability space is uniform,

$$
P(\text{bin one is empty})
=
\frac{9^{20}}{10^{20}}
=
\left(\frac9{10}\right)^{20}.
$$

The lecture reported that this is about $12\%$.

The complementary probability is

$$
P(\text{bin one is not empty})
=
1-
P(\text{bin one is empty}),
$$

which the lecture reported as about $88\%$.

### Generalization to $K$ balls and $N$ bins

For $K$ labeled balls placed into $N$ bins, the total number of placements is

$$
N^K.
$$

If the first bin remains empty, the number of placements is

$$
(N-1)^K.
$$

Hence,

$$
P(\text{first bin is empty})
=
\frac{(N-1)^K}{N^K}
=
\left(\frac{N-1}{N}\right)^K
=
\left(1-\frac1N\right)^K.
$$

The same model can represent jobs assigned randomly to servers or items assigned to hash-table buckets.

---

## The Birthday Paradox

The final major example asked for the probability that at least two among 50 people share a birthday. Leap-day birthdays were ignored.

### Choosing the sample space

There are 365 possible birthdays, and the experiment samples 50 people. Replacement is allowed because multiple people may share the same birthday.

The lecture records the people in order to obtain a uniform probability space. Thus,

$$
|\Omega|=365^{50}.
$$

This model is equivalent to placing 50 labeled balls into 365 bins or rolling a 365-sided die 50 times.

### Using the complementary event

Let $A$ be the event that at least two people share a birthday. Directly counting $A$ is difficult because it includes many possible collision patterns.

Instead, consider its complement, $\overline{A}$, in which all 50 birthdays are different.

For the first person, there are 365 choices. The second must avoid the first birthday and has 364 choices. The third has 363 choices. Continuing in this way, the fiftieth person has 316 choices. Therefore,

$$
|\overline{A}|
=
365\cdot364\cdot363\cdots316.
$$

The probability of no shared birthday is

$$
P(\overline{A})
=
\frac{365\cdot364\cdot363\cdots316}{365^{50}}.
$$

Consequently,

$$
P(A)
=
1-
\frac{365\cdot364\cdot363\cdots316}{365^{50}}.
$$

The lecture reported

$$
P(A)\approx0.97.
$$

Thus, among 50 people, there is approximately a $97\%$ chance that some pair shares a birthday.

### Generalization to $K$ people

For $K$ people, the numerator for the no-collision event continues from 365 downward for $K$ factors, while the denominator is $365^K$. The birthday-collision probability is one minus that ratio.

The lecture reported several reference points:

- With one person, the collision probability is zero.
- With two people, it is approximately $0.27\%$.
- With 23 people, it is approximately $50\%$.
- With 50 people, it is approximately $97\%$.
- By 60 people, a shared birthday is described as almost certain.

The result feels counterintuitive because one may initially think only about the probability that one particular person shares a birthday with another. The event actually permits a match between any pair among all the people.

---

## Common Structures Across the Examples

Coin flips, dice rolls, balls and bins, and birthdays were all modeled as ordered sampling with replacement:

- Rolling a four-sided die twice uses $N=4$ and $K=2$.
- Flipping a coin 16 times uses $N=2$ and $K=16$.
- Placing 20 balls into ten bins uses $N=10$ and $K=20$.
- Assigning birthdays to 23 people uses $N=365$ and $K=23$.

Each has sample-space size

$$
N^K.
$$

Drawing cards, selecting the positions of heads, and selecting birthdays with no repeats use sampling without replacement:

- An ordered five-card hand uses $52\cdot51\cdot50\cdot49\cdot48$ outcomes.
- An unordered five-card hand uses $\binom{52}{5}$ outcomes.
- Choosing six head positions among 16 flips uses $\binom{16}{6}$ outcomes.
- Choosing ordered, nonrepeating birthdays uses a descending product beginning at 365.

The central workflow throughout the lecture was:

1. Define the sample space.
2. Choose a representation that makes the probability space uniform when practical.
3. Define the event as a subset of the sample space.
4. In a uniform space, compute the event probability using
   $$
   P(A)=\frac{|A|}{|\Omega|}.
   $$
5. In a nonuniform space, add the probabilities of the individual sample points:
   $$
   P(A)=\sum_{\omega\in A}P(\omega).
   $$
6. When an event is difficult to count directly, consider its complement:
   $$
   P(A)=1-P(\overline{A}).
   $$

The lecture closed by emphasizing that probability is difficult and intuition can be unreliable. Formal sample spaces and careful counting provide a systematic way to avoid those errors.

---

## Unclear or Incomplete Steps

In the event described as “the sum of the dice is not prime,” these notes include $(1,1)$ while also stating that its sum, $2$, is “not it.” Since $2$ is prime, the spoken correction appears to reject that outcome, but the exact final set of outcomes was not fully recoverable from these notes.