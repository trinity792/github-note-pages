---
title: N16 Introduction to Discrete Probability
Content Type: Course Notes
Content Area: Probability
description: "Introduces random experiments, sample spaces, probability spaces, and events, and shows how probabilities of events reduce to counting in uniform spaces. Worked examples cover coin tosses, dice, card shuffling, poker hands, balls and bins, and the birthday paradox."
Course: CS 70
pinned: false
Date Published: October 25, 2026
Last Updated: October 25, 2026
Status: Finalized
---

# N16 Introduction to Discrete Probability
**Related lecture:** [[cs70/Lecture Notes/L16 Intro to Discrete Probability|L16 Intro to Discrete Probability]]. **Previous note:** [[cs70/Course Notes/N15 Counting|Note 15 — Counting]].

Probability theory has its origins in gambling: analyzing card games, dice, and roulette wheels. Today it is an essential tool in engineering and the sciences, and no less so in EECS, where its use is widespread in algorithms, systems, control, signal processing, learning theory, and AI. Typical statements about probability include:

1. The chance of getting a flush in a 5-card poker hand is about 2 in 1000.
2. The chance that this randomized primality testing algorithm outputs "prime" when the input is not prime is at most one in a trillion.
3. In this load-balancing scheme, the probability that any processor has to deal with more than 12 requests is negligible.
4. The average time between system failures is about 3 days.
5. There is a 30% chance of a magnitude 8.0 earthquake in Northern California before 2040.

Implicit in all such statements is an underlying **probability space**. It may be the result of a random experiment that we constructed ourselves (as in statements 1, 2, and 3) or a model we build of the real world (as in 4 and 5). None of these statements makes sense unless we specify the probability space we are talking about, which is why statements like 5, typically made without this context, are almost content-free.

This note makes these ideas precise. The first important notion is that of a random experiment. We introduce the space of all possible outcomes, called a **sample space**, and assign each element of it a probability that tells us how likely the outcome is when we perform the experiment.

---

## 1. Random Experiments

A random experiment typically consists of drawing a sample of $k$ elements from a set $S$ of cardinality $n$. The possible outcomes are exactly the objects counted in [[cs70/Course Notes/N15 Counting|Note 15]], where there were four scenarios depending on whether we sample with or without replacement and whether the order of the $k$ elements does or does not matter. The same four scenarios arise for random experiments.

The outcome of a random experiment is called a **sample point**, and the **sample space**, often denoted $\Omega$, is the set of all possible outcomes.

An example is tossing a coin $4$ times. Here $S=\{H,T\}$ and we draw $4$ elements with replacement. $HTHT$ is a sample point, and the sample space $\Omega$ has $16$ elements:

```text
HHHH  HHHT  HHTH  HHTT
HTHH  HTHT  HTTH  HTTT
THHH  THHT  THTH  THTT
TTHH  TTHT  TTTH  TTTT
```

To determine the chance of a particular outcome such as $HHTH$, we need to define a probability for each sample point.

---

## 2. Probability Spaces

A **probability space** is a sample space $\Omega$ together with a probability $\mathbb{P}[\omega]$ (often also written $\Pr[\omega]$) for each sample point $\omega$, such that:

- **Non-negativity:** $0\le\mathbb{P}[\omega]\le1$ for all $\omega\in\Omega$.
- **Sum to 1:** $\displaystyle\sum_{\omega\in\Omega}\mathbb{P}[\omega]=1$, i.e., the probabilities over all outcomes sum to $1$.

Technically, $\mathbb{P}$ is a real-valued function on a certain collection of subsets of $\Omega$, called a probability measure.

The easiest way to assign probabilities to sample points is to do it **uniformly**: if $\lvert\Omega\rvert=N$, then $\mathbb{P}[\omega]=\frac{1}{N}$ for all $\omega\in\Omega$. For example, if we toss a fair coin $4$ times, each of the $16$ sample points is assigned probability $\frac{1}{16}$. Non-uniform probability spaces appear in the examples below.

After performing an experiment, we are often interested in whether a certain **event** occurred. For example, we might want the event that there were exactly $2$ $H$'s in four tosses. We identify this event with the set of outcomes that have exactly two $H$'s:

$$
\{HHTT,\ HTHT,\ HTTH,\ THHT,\ THTH,\ TTHH\}\subset\Omega.
$$

Formally, an event $A$ is just a subset of the sample space, $A\subseteq\Omega$. We define the probability of an event by adding up the probabilities of its sample points:

$$
\mathbb{P}[A]=\sum_{\omega\in A}\mathbb{P}[\omega].
$$

Note that $0\le\mathbb{P}[A]\le1$ for all $A\subseteq\Omega$, and $\mathbb{P}[\Omega]=1$. For the event of exactly two $H$'s in four fair tosses, $\lvert A\rvert=\binom{4}{2}=6$ and there are $2^4=16$ outcomes. Each sample point in $A$ has probability $\frac{1}{16}$, so

$$
\mathbb{P}[A]=6\cdot\frac{1}{16}=\frac{3}{8}.
$$

---

## 3. Examples

Here are random experiments with their sample spaces, possible probability spaces, and events.

### Coin Tosses

Suppose a coin has $\mathbb{P}[H]=p$ and $\mathbb{P}[T]=1-p$, and the experiment flips it $4$ times. The sample space $\Omega$ is the same sixteen sequences of $H$'s and $T$'s, but the probability space depends on $p$. If $p=\frac12$ the probabilities are uniform and each sample point has probability $\frac{1}{16}$. If $p=\frac23$, the probabilities differ:

$$
\mathbb{P}[HHHH]=\frac23\times\frac23\times\frac23\times\frac23=\frac{16}{81},\qquad
\mathbb{P}[TTHH]=\frac13\times\frac13\times\frac23\times\frac23=\frac{4}{81}.
$$

> [!warning] Multiplying probabilities
> The source simply multiplies probabilities here and explains later why this is correct for this example. It is NOT always OK to multiply probabilities like this.

Let $A$ be the event that all four tosses are the same. Then $A=\{HHHH,TTTT\}$, with $HHHH$ having probability $\left(\frac23\right)^4$ and $TTTT$ having probability $\left(\frac13\right)^4$, so

$$
\mathbb{P}[A]=\left(\frac23\right)^4+\left(\frac13\right)^4=\frac{17}{81}.
$$

Let $B$ be the event of exactly two heads. Any particular outcome with two heads, such as $HTHT$, has probability $\left(\frac23\right)^2\left(\frac13\right)^2$. There are $\binom{4}{2}=6$ ways to choose the positions of the heads, and these choices completely specify the sequence, so

$$
\mathbb{P}[B]=6\left(\frac23\right)^2\left(\frac13\right)^2=\frac{24}{81}=\frac{8}{27}.
$$

More generally, flipping the coin $n$ times gives a sample space of cardinality $2^n$ whose sample points are the length-$n$ sequences of $H$'s and $T$'s. If $\mathbb{P}[H]=p$, any sequence with exactly $r$ $H$'s has probability $p^r(1-p)^{n-r}$. The event $C$ of exactly $r$ $H$'s in $n$ flips consists of $\binom{n}{r}$ sample points, each with that probability, so

$$
\mathbb{P}[C]=\binom{n}{r}p^r(1-p)^{n-r}.
$$

Biased coin sequences show up in many contexts. For example, they might model $n$ independent trials of a faulty system that fails each time with probability $p$.

### Rolling Dice

Roll two fair dice. Then $\Omega=\{(i,j):1\le i,j\le6\}$ and the probability space is uniform, so every sample point has probability $\frac{1}{\lvert\Omega\rvert}=\frac{1}{36}$. The probability of any event $A$ is therefore

$$
\mathbb{P}[A]=\frac{\text{number of sample points in }A}{\text{number of sample points in }\Omega}=\frac{\lvert A\rvert}{\lvert\Omega\rvert}.
$$

So for uniform spaces, computing probabilities reduces to counting sample points.

Consider the event $A$ that the sum of the dice is at least $10$, and the event $B$ that there is at least one $6$. Enumerating the sample points shows $\lvert A\rvert=6$ and $\lvert B\rvert=11$, so $\mathbb{P}[A]=\frac{6}{36}=\frac16$ and $\mathbb{P}[B]=\frac{11}{36}$.

### Card Shuffling

Shuffle a deck of standard playing cards. Here $\Omega$ is the set of all $52!$ permutations of the deck, and we assume the probability space is uniform. This is an idealized mathematical model of shuffling, since real shuffling always has a bit of bias, but it is close enough to be useful.

The experiment generalizes to randomly shuffling $n$ items (for card shuffling, $n=52$). For example, collect the homeworks of $n$ students in a class and redistribute them randomly, one per student. The result is a random permutation of the homeworks, with each outcome having probability $\frac{1}{n!}$.

### Poker Hands

Shuffle a deck and deal a poker hand. Here $S$ is the set of $52$ cards and $\Omega$ is the set of all possible poker hands, which corresponds to choosing $k=5$ objects without replacement from a set of size $n=52$ where order does not matter. As in Note 15,

$$
\lvert\Omega\rvert=\binom{52}{5}=\frac{52\times51\times50\times49\times48}{5\times4\times3\times2\times1}=2{,}598{,}960.
$$

If the deck is well shuffled, each outcome is equally likely, so this is a uniform probability space.

Let $A$ be the event that the hand is a **flush**, a hand in which all cards have the same suit, say Hearts. Since the space is uniform, $\mathbb{P}[A]$ reduces to counting the flushes. There are $13$ cards in each suit, so each suit contributes $\binom{13}{5}$ flushes and the total is $4\times\binom{13}{5}$. Then

$$
\mathbb{P}[\text{hand is a flush}]=\frac{4\times\binom{13}{5}}{\binom{52}{5}}
=4\times\frac{13!}{5!\,8!}\times\frac{5!\,47!}{52!}
=4\times\frac{13\cdot12\cdot11\cdot10\cdot9}{52\cdot51\cdot50\cdot49\cdot48}\approx0.002.
$$

### Balls and Bins

Throw $20$ labeled balls into $10$ labeled bins, with each ball equally likely to land in any bin regardless of what happens to the other balls. In terms of sampling a sequence of $k$ elements from a set $S$ of cardinality $n$, $S$ is the $10$ bins and we sample with replacement $k=20$ times. Order matters, since the balls are labeled.

The sample space is

$$
\Omega=\{(b_1,b_2,\ldots,b_{20}):1\le b_i\le10\text{ for each }i=1,\ldots,20\},
$$

where $b_i$ is the bin in which ball $i$ lands. Its cardinality is $10^{20}$, since each of the $20$ components has $10$ choices. More generally, $m$ balls thrown into $n$ bins give a sample space of size $n^m$. The probability space is uniform.

Let $A$ be the event that bin $1$ is empty. We count the outcomes in which all $20$ balls fall into the remaining nine bins, which is $9^{20}$, so

$$
\mathbb{P}[A]=\frac{9^{20}}{10^{20}}=\left(\frac{9}{10}\right)^{20}\approx0.12.
$$

Let $B$ be the event that bin $1$ contains at least one ball. This is the complement $\overline{A}$ of $A$, i.e., all the sample points not in $A$, so $\mathbb{P}[B]=1-\mathbb{P}[A]\approx0.88$. More generally, with $m$ balls and $n$ bins,

$$
\mathbb{P}[\text{bin 1 is empty}]=\left(\frac{n-1}{n}\right)^m=\left(1-\frac1n\right)^m.
$$

Balls and bins shows up very often in computer science, for example as a model of a load-balancing scheme in which each job is sent to a random processor. It also generalizes problems we have already considered: flipping a fair coin $4$ times is the special case $m=4$, $n=2$, and rolling two dice is the special case $m=2$, $n=6$.

### Birthday Paradox

The birthday paradox examines the chance that two people in a group have the same birthday. It is a "paradox" not because of a logical contradiction but because it goes against intuition. Take the number of days in a year to be $365$. Then $S=\{1,\ldots,365\}$, and the experiment draws a sample of $n$ elements from $S$ with replacement, the elements being the birth dates of $n$ people. Each sample point is a sequence of $n$ birthdays with $365$ possible values each, so $\lvert\Omega\rvert=365^n$.

Let $A$ be the event that at least one pair of people share a birthday. It is simpler to compute the probability of the complement $\overline{A}$, the event that no two people share a birthday, and use $\mathbb{P}[A]=1-\mathbb{P}[\overline{A}]$.

The space is uniform, so we only need $\lvert\overline{A}\rvert$. There are $365$ choices for the first person, $364$ for the second, and so on, down to $365-n+1$ for the $n$-th person. This is an application of the First Rule of Counting from Note 15: sampling without replacement, since we need to avoid collisions, with order mattering. Therefore

$$
\mathbb{P}[\overline{A}]=\frac{\lvert\overline{A}\rvert}{\lvert\Omega\rvert}=\frac{365\times364\times\cdots\times(365-n+1)}{365^n},
$$

$$
\mathbb{P}[A]=1-\frac{365\times364\times\cdots\times(365-n+1)}{365^n}.
$$

This gives $\mathbb{P}[A]$ as a function of the number $n$ of people, and it increases with $n$. With $n=23$ people you should be willing to bet that at least one pair shares a birthday, since $\mathbb{P}[A]$ is larger than $50\%$. For $n=60$ people, $\mathbb{P}[A]$ is over $99\%$.

---

## 4. Summary

The birthday paradox illustrates the importance of doing probability calculations systematically rather than intuitively. The key steps in all of the calculations are:

- What is the sample space, i.e., the experiment and its set of possible outcomes?
- What is the probability of each outcome (sample point)?
- What is the event we are interested in, i.e., which subset of the sample space?
- Finally, compute the probability of the event by adding up the probabilities of the sample points it contains.

Whenever you meet a probability problem, go back to these basics to avoid potential pitfalls. There will be more counterintuitive problems later in the course.
