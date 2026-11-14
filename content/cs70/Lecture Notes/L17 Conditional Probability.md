---
title: L17 Conditional Probability
Content Type: Lecture
Content Area:
Course: CS70
description: "The lecture develops conditional probability for outcomes and events, derives the intersection formula, and applies it to dice, cards, shopping centers, and the Monty Hall problem. It then introduces prior and posterior probabilities, the total probability rule, and Bayes' rule through flu-testing and restaurant-selection walkthroughs."
pinned: false
Date Published: October 27, 2026
Last Updated: October 27, 2026
Status: Finalized
---

# L17 Conditional Probability

## Executive Summary

This lecture develops conditional probability as a rescaling of probabilities after learning that an event occurred. It begins with conditional probabilities of individual outcomes, extends the idea to events, and derives

$$
\Pr(A\mid B)=\frac{\Pr(A\cap B)}{\Pr(B)}.
$$

Several examples illustrate the formula: a gem dispenser, fair and loaded three-sided dice, drawing aces from a deck, selecting restaurants from shopping centers, and the Monty Hall problem. The lecture then introduces prior and posterior probabilities, derives the total probability rule, and uses Bayes' rule to reverse a conditional probability in a flu-testing example. Finally, it generalizes total probability and Bayes' rule from two complementary cases to an arbitrary partition.

---

## Conditional Probability of an Outcome

Conditional probability describes how an outcome's probability changes when additional information restricts attention to an event. The notation

$$
\Pr(\omega\mid B)
$$

means the probability of outcome $\omega$ given that event $B$ occurred.

When $\omega\in B$, the lecture gives the formula

$$
\Pr(\omega\mid B)=\frac{\Pr(\omega)}{\Pr(B)}.
$$

The denominator rescales the probabilities inside $B$ so that their conditional probabilities sum to $1$. Instead of drawing from the entire sample space, one can think of drawing only from the smaller universe represented by $B$.

### Gem-dispenser example

A dispenser has the following probabilities:

- A diamond appears with probability $1/100$.
- A sapphire appears with probability $2/100$.
- An emerald appears with probability $3/100$.
- A concrete fragment appears with probability $94/100$.

Let $B$ be the event that the result is valuable, where “valuable” means diamond, sapphire, or emerald. Then

$$
\Pr(B)=\frac{1}{100}+\frac{2}{100}+\frac{3}{100}
=\frac{6}{100}.
$$

The unconditional probability of a sapphire is $2/100$. Given that the result is valuable, its probability is

$$
\Pr(\text{sapphire}\mid B)
=
\frac{\Pr(\text{sapphire})}{\Pr(B)}
=
\frac{2/100}{6/100}
=
\frac13.
$$

The concrete fragment is excluded once $B$ is known. The probabilities of diamond, sapphire, and emerald are therefore renormalized within the valuable-result universe.

---

## Fair Three-Sided Dice

Consider four fair, three-sided dice whose possible values are $1$, $2$, and $3$. Outcomes retain their order, so $(1,1,3,1)$ and $(1,1,1,3)$ are distinct. Keeping order makes the sample space uniform.

Let $B$ be the event that no die shows $2$.

### Probability of a particular ordered outcome

There are three choices for each of four positions, so the sample space contains

$$
3^4=81
$$

ordered outcomes. Every ordered outcome therefore has probability $1/81$. In particular,

$$
\Pr((1,1,3,1))=\frac1{81}.
$$

### Probability of rolling no twos

Under event $B$, every position can contain either $1$ or $3$. There are two choices in each of four positions, so

$$
|B|=2^4=16.
$$

Since each original outcome has probability $1/81$,

$$
\Pr(B)=\frac{16}{81}.
$$

The conditional probability of the specific outcome is therefore

$$
\Pr((1,1,3,1)\mid B)
=
\frac{1/81}{16/81}
=
\frac1{16}.
$$

Equivalently, once it is known that no twos occurred, there are $16$ equally likely ordered outcomes, and $(1,1,3,1)$ is one of them.

---

## Loaded Three-Sided Dice

The lecture next changes the dice distribution:

$$
\Pr(1)=\frac12,
\qquad
\Pr(2)=\frac14,
\qquad
\Pr(3)=\frac14.
$$

The dice are no longer uniform.

### Probability of $(1,1,3,1)$

The probability of a specific ordered sequence is the product of its four roll probabilities:

$$
\Pr((1,1,3,1))
=
\frac12\cdot\frac12\cdot\frac14\cdot\frac12
=
\frac1{32}.
$$

This is the unconditional probability. It is not yet the probability conditioned on rolling no twos.

### Conditioning on no twos

Again let $B$ be the event that no $2$ occurs. A single roll avoids $2$ with probability

$$
\Pr(\text{not }2)=\frac12+\frac14=\frac34.
$$

For four rolls,

$$
\Pr(B)=\left(\frac34\right)^4.
$$

The lecture initially described finding $\Pr(B)$ by listing all $16$ outcomes containing only $1$s and $3$s and summing their unequal probabilities. It then accepted the more compact expression $(3/4)^4$, since every roll independently avoids $2$ with probability $3/4$.

Thus,

$$
\Pr((1,1,3,1)\mid B)
=
\frac{\Pr((1,1,3,1))}{\Pr(B)}
=
\frac{1/32}{(3/4)^4}.
$$

The main point was the rescaling: each outcome inside $B$ has its original probability divided by $\Pr(B)$. Because the original dice are loaded, the $16$ allowed outcomes are not equally likely, but their conditional probabilities still sum to $1$.

---

## Conditional Probability of an Event

Let the dice again be fair. Define:

- $A$ as the event that at least three of the four dice show $1$.
- $B$ as the event that no die shows $2$.

An event consists of multiple outcomes, so its conditional probability is obtained by summing the conditional probabilities of its outcomes.

### Enumerating event $A$

The outcomes with at least three $1$s are

$$
\begin{aligned}
&(1,1,1,1),\\
&(1,1,1,2),\ (1,1,2,1),\ (1,2,1,1),\ (2,1,1,1),\\
&(1,1,1,3),\ (1,1,3,1),\ (1,3,1,1),\ (3,1,1,1).
\end{aligned}
$$

There are nine such outcomes. Since all $81$ ordered outcomes are equally likely,

$$
\Pr(A)=\frac9{81}=\frac19.
$$

### Computing $\Pr(A\mid B)$ by individual outcomes

By definition,

$$
\Pr(A\mid B)
=
\sum_{\omega\in A}\Pr(\omega\mid B).
$$

The four outcomes in $A$ that contain a $2$ have conditional probability $0$ given $B$. For example,

$$
\Pr((2,1,1,1)\mid B)=0.
$$

The remaining five outcomes contain only $1$s and $3$s. Since event $B$ has $16$ equally likely outcomes under fair dice, each of these five outcomes has conditional probability $1/16$. Therefore,

$$
\Pr(A\mid B)
=
5\cdot\frac1{16}
=
\frac5{16}.
$$

Geometrically, the relevant outcomes are those in $A\cap B$: the outcomes that both contain at least three $1$s and contain no $2$s.

### Equivalent summation domains

The lecture compared several ways of summing conditional probabilities.

First,

$$
\sum_{\omega\in B}\Pr(\omega\mid B)=1,
$$

because the conditional distribution is entirely supported on $B$.

Also,

$$
\sum_{\omega\in A\cup B}\Pr(\omega\mid B)=1.
$$

This sum includes all outcomes in $B$, whose conditional probabilities sum to $1$, plus outcomes in $A\setminus B$, each of which has conditional probability $0$ given $B$.

For the event $A$ itself,

$$
\Pr(A\mid B)
=
\sum_{\omega\in A}\Pr(\omega\mid B)
=
\sum_{\omega\in A\cap B}\Pr(\omega\mid B).
$$

The first expression includes outcomes in $A\setminus B$, but they contribute only zeros. The second expression omits those unnecessary zero terms.

---

## Deriving the Event Formula

Start from the intersection-based summation:

$$
\Pr(A\mid B)
=
\sum_{\omega\in A\cap B}\Pr(\omega\mid B).
$$

For every $\omega\in B$,

$$
\Pr(\omega\mid B)
=
\frac{\Pr(\omega)}{\Pr(B)}.
$$

Substituting this into the sum gives

$$
\Pr(A\mid B)
=
\sum_{\omega\in A\cap B}
\frac{\Pr(\omega)}{\Pr(B)}.
$$

Because $\Pr(B)$ does not depend on $\omega$, it can be factored out:

$$
\Pr(A\mid B)
=
\frac{\sum_{\omega\in A\cap B}\Pr(\omega)}{\Pr(B)}.
$$

The numerator is the probability of the event $A\cap B$:

$$
\sum_{\omega\in A\cap B}\Pr(\omega)
=
\Pr(A\cap B).
$$

Therefore,

$$
\boxed{
\Pr(A\mid B)=\frac{\Pr(A\cap B)}{\Pr(B)}
}
$$

The formula should not be viewed only as a symbolic rule that turns an intersection and denominator into a conditioning bar. Its meaning is that one adds the original probabilities of outcomes in $A\cap B$ and then rescales by the total probability of the conditioning event $B$.

---

## Drawing Aces Without Replacement

A shuffled deck contains $52$ cards, including four aces. Two cards are drawn without replacement. Define:

- $B$ as the event that the first card is an ace.
- $A$ as the event that the second card is an ace.

The goal is to verify

$$
\Pr(A\mid B)=\frac{\Pr(A\cap B)}{\Pr(B)}.
$$

### Computing the terms

The probability that the first card is an ace is

$$
\Pr(B)=\frac4{52}.
$$

For both cards to be aces, there are four choices for the first ace and three remaining choices for the second ace. There are $52$ choices for the first card and $51$ remaining choices for the second card. Thus,

$$
\Pr(A\cap B)
=
\frac{4\cdot3}{52\cdot51}.
$$

Substitution gives

$$
\Pr(A\mid B)
=
\frac{\frac{4\cdot3}{52\cdot51}}{\frac4{52}}
=
\frac3{51}.
$$

This agrees with direct reasoning: if the first card is known to be an ace, then three aces remain among the remaining $51$ cards.

---

## The Shopping-Center Problem

Two shopping centers are selected with equal probability. After selecting a center, one of its restaurants is selected uniformly.

- Center 1 contains five restaurants: three Indian restaurants and two Moroccan restaurants.
- Center 2 contains two restaurants: one Moroccan restaurant and one other restaurant.

The question is:

> Given that the selected restaurant was Moroccan, what is the probability that Center 1 was selected?

The answer is not $2/3$, even though two of the three Moroccan restaurants are in Center 1. The experiment chooses a center first and a restaurant second, so the individual restaurants do not all have equal unconditional probabilities.

### Outcome probabilities

Center 1 is selected with probability $1/2$. Each of its five restaurants is then selected with probability $1/5$, so each Center 1 restaurant has unconditional probability

$$
\frac12\cdot\frac15=\frac1{10}.
$$

Center 2 is selected with probability $1/2$. Each of its two restaurants is then selected with probability $1/2$, so each Center 2 restaurant has unconditional probability

$$
\frac12\cdot\frac12=\frac14.
$$

### Direct conditional-probability calculation

Let $C_1$ be the event that Center 1 is selected, and let $M$ be the event that the restaurant is Moroccan.

There are two Moroccan restaurants in Center 1, each with probability $1/10$. Therefore,

$$
\Pr(C_1\cap M)
=
\frac1{10}+\frac1{10}
=
\frac15.
$$

The event $M$ can occur through either of those Center 1 restaurants or through the single Moroccan restaurant in Center 2:

$$
\Pr(M)
=
\frac1{10}+\frac1{10}+\frac14
=
\frac9{20}.
$$

Consequently,

$$
\Pr(C_1\mid M)
=
\frac{\Pr(C_1\cap M)}{\Pr(M)}
=
\frac{1/5}{9/20}
=
\frac49.
$$

Thus the desired probability is approximately $44.4\%$.

---

## The Monty Hall Problem

There are three doors. One hides a car and two hide goats. The contestant chooses a door. The host, who knows the locations, opens one of the other doors and always reveals a goat. The contestant may then stay with the original choice or switch to the remaining unopened door.

The lecture used repeated simulated games to compare the two strategies and then explained why switching wins with probability $2/3$.

### Why switching is better

At the moment of the original choice:

$$
\Pr(\text{original choice is correct})=\frac13,
$$

and

$$
\Pr(\text{original choice is wrong})=\frac23.
$$

The host then opens another door and reveals a goat. The lecture's explanation keeps the original door's probability at $1/3$. Among the other two doors, the opened goat door has probability $0$ of containing the car. The remaining unopened door therefore carries the original $2/3$ probability that the contestant's first choice was wrong.

Hence:

$$
\Pr(\text{win by staying})=\frac13,
$$

while

$$
\Pr(\text{win by switching})=\frac23.
$$

The example emphasizes that probability can conflict with immediate intuition. A careful framework makes explicit how the host's constrained action concentrates the probability associated with an initially incorrect choice onto the one remaining unopened door.

---

## Priors, Posteriors, and Inverse Reasoning

The lecture introduces Bayesian inference as updating knowledge after observing evidence.

- A prior probability is a baseline event probability before the new observation.
- A posterior probability is a probability conditioned on the observed information.

Let:

- $A$ be the event that a person has the flu.
- $B$ be the event that the person tests positive.

The desired quantity is

$$
\Pr(A\mid B),
$$

the probability of having the flu given a positive test.

This is not the same as

$$
\Pr(B\mid A),
$$

the probability of testing positive given that the person has the flu. Reversing the order of the events changes the meaning.

The example supplies three values:

$$
\Pr(B\mid A)=0.9,
$$

so a person with the flu tests positive $90\%$ of the time;

$$
\Pr(B\mid \overline A)=0.2,
$$

so a person without the flu tests positive $20\%$ of the time; and

$$
\Pr(A)=0.01,
$$

so the baseline probability of having the flu is $1\%$.

Here $\overline A$ denotes the complement of $A$, the event that the person does not have the flu.

---

## Flu-Test Walkthrough

By conditional probability,

$$
\Pr(A\mid B)=\frac{\Pr(A\cap B)}{\Pr(B)}.
$$

The numerator and denominator are computed separately from the three supplied probabilities.

### Computing the numerator

Apply the conditional-probability formula in the other direction:

$$
\Pr(B\mid A)
=
\frac{\Pr(A\cap B)}{\Pr(A)}.
$$

Multiplying both sides by $\Pr(A)$ gives

$$
\Pr(A\cap B)
=
\Pr(B\mid A)\Pr(A).
$$

Substituting the supplied values,

$$
\Pr(A\cap B)
=
0.9\cdot0.01
=
0.009.
$$

This is the probability that a randomly selected person both has the flu and tests positive.

### Computing the denominator by splitting into cases

There are two disjoint ways to test positive:

1. The person has the flu and tests positive.
2. The person does not have the flu and tests positive.

Therefore,

$$
\Pr(B)
=
\Pr(A\cap B)+\Pr(\overline A\cap B).
$$

The first term has already been computed as $0.009$.

For the second term,

$$
\Pr(\overline A\cap B)
=
\Pr(B\mid\overline A)\Pr(\overline A).
$$

The probability of not having the flu is

$$
\Pr(\overline A)=1-\Pr(A)=1-0.01=0.99.
$$

Thus,

$$
\Pr(\overline A\cap B)
=
0.2\cdot0.99
=
0.198.
$$

During the walkthrough, $0.198$ was briefly called the denominator. The instructor then corrected this by adding the previously computed $0.009$ term. The complete denominator is

$$
\Pr(B)
=
0.009+0.198
=
0.207.
$$

### Computing the posterior probability

Substituting the numerator and denominator,

$$
\Pr(A\mid B)
=
\frac{0.009}{0.207}
\approx 0.044.
$$

Thus the lecture reports an approximately $4.4\%$ chance of having the flu given a positive result.

The result is much smaller than $90\%$ because $90\%$ is $\Pr(B\mid A)$, not $\Pr(A\mid B)$. The low $1\%$ prior probability of flu and the $20\%$ positive-test probability among people without the flu both affect the posterior.

---

## The Total Probability Rule

The denominator in the flu example illustrates the total probability rule. If $A$ and $\overline A$ divide the sample space into two mutually exclusive cases, then every occurrence of $B$ occurs with either $A$ or $\overline A$. Therefore,

$$
\Pr(B)
=
\Pr(A\cap B)+\Pr(\overline A\cap B).
$$

Rewriting each intersection with conditional probability gives

$$
\boxed{
\Pr(B)
=
\Pr(B\mid A)\Pr(A)
+
\Pr(B\mid\overline A)\Pr(\overline A)
}
$$

Since

$$
\Pr(\overline A)=1-\Pr(A),
$$

this may also be written as

$$
\Pr(B)
=
\Pr(B\mid A)\Pr(A)
+
\Pr(B\mid\overline A)\bigl(1-\Pr(A)\bigr).
$$

The flu example interprets these two terms as the two ways to test positive: testing positive while sick and testing positive while not sick.

---

## Bayes' Rule

Starting from

$$
\Pr(A\mid B)=\frac{\Pr(A\cap B)}{\Pr(B)},
$$

rewrite the numerator as

$$
\Pr(A\cap B)=\Pr(B\mid A)\Pr(A).
$$

This gives Bayes' rule:

$$
\boxed{
\Pr(A\mid B)
=
\frac{\Pr(B\mid A)\Pr(A)}{\Pr(B)}
}
$$

Using the two-case total probability formula for the denominator produces

$$
\boxed{
\Pr(A\mid B)
=
\frac{\Pr(B\mid A)\Pr(A)}
{\Pr(B\mid A)\Pr(A)+
\Pr(B\mid\overline A)\Pr(\overline A)}
}
$$

or, substituting $\Pr(\overline A)=1-\Pr(A)$,

$$
\Pr(A\mid B)
=
\frac{\Pr(B\mid A)\Pr(A)}
{\Pr(B\mid A)\Pr(A)+
\Pr(B\mid\overline A)(1-\Pr(A))}.
$$

Bayes' rule supports inverse reasoning. In the flu example, the readily supplied probability describes the test result given the disease, while the desired probability describes the disease given the test result.

The numerator is the probability that both $A$ and $B$ occur. The denominator is the probability of all ways in which $B$ can occur. Thus the ratio measures how much of the total probability of observing $B$ comes from the case in which $A$ is also true.

---

## Shopping Centers Revisited with Bayes' Rule

The shopping-center problem can also be solved using Bayes' rule.

Let:

- $C_1$ be the event of choosing Center 1.
- $C_2$ be the event of choosing Center 2.
- $M$ be the event of choosing a Moroccan restaurant.

The supplied structure gives

$$
\Pr(C_1)=\Pr(C_2)=\frac12,
$$

$$
\Pr(M\mid C_1)=\frac25=\frac4{10},
$$

and

$$
\Pr(M\mid C_2)=\frac12.
$$

### Computing the total probability of a Moroccan restaurant

There are two ways to select a Moroccan restaurant: select Center 1 and then a Moroccan restaurant, or select Center 2 and then a Moroccan restaurant. Therefore,

$$
\Pr(M)
=
\Pr(M\mid C_1)\Pr(C_1)
+
\Pr(M\mid C_2)\Pr(C_2).
$$

Substituting,

$$
\Pr(M)
=
\frac4{10}\cdot\frac12
+
\frac12\cdot\frac12
=
0.2+0.25
=
0.45.
$$

### Applying Bayes' rule

Bayes' rule gives

$$
\Pr(C_1\mid M)
=
\frac{\Pr(M\mid C_1)\Pr(C_1)}{\Pr(M)}.
$$

Hence,

$$
\Pr(C_1\mid M)
=
\frac{\frac4{10}\cdot\frac12}{0.45}
=
\frac{0.2}{0.45}
=
\frac49.
$$

This reproduces the earlier answer of approximately $44.4\%$.

---

## Partitions and the General Total Probability Rule

The lecture closes by extending the two-case formulas to many cases.

An event space is partitioned into events $A_1,A_2,\ldots$ when:

- Their union covers the relevant space.
- They are mutually exclusive, so no outcome belongs to two different partition events.

The earlier split into $A$ and $\overline A$ is a two-part partition. Shopping centers can similarly form partition events when exactly one center is selected.

If the $A_i$ form a partition, then $B$ can be divided according to which $A_i$ occurs:

$$
\Pr(B)
=
\sum_i \Pr(B\cap A_i).
$$

Using conditional probability to rewrite each intersection gives the general total probability rule:

$$
\boxed{
\Pr(B)
=
\sum_i \Pr(B\mid A_i)\Pr(A_i)
}
$$

Each term represents one mutually exclusive way in which $B$ can occur.

---

## Bayes' Rule for a Partition

For a particular partition event $A_i$,

$$
\Pr(A_i\mid B)
=
\frac{\Pr(A_i\cap B)}{\Pr(B)}.
$$

The numerator can be written as

$$
\Pr(A_i\cap B)
=
\Pr(B\mid A_i)\Pr(A_i),
$$

while the denominator follows from total probability:

$$
\Pr(B)
=
\sum_j \Pr(B\mid A_j)\Pr(A_j).
$$

Therefore,

$$
\boxed{
\Pr(A_i\mid B)
=
\frac{\Pr(B\mid A_i)\Pr(A_i)}
{\sum_j \Pr(B\mid A_j)\Pr(A_j)}
}
$$

This is the same Bayes-rule structure as before, generalized from the two cases $A$ and $\overline A$ to any collection of mutually exclusive cases that covers the space.