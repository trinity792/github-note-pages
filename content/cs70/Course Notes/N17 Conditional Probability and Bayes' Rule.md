---
title: CS 70 Note 17 — Conditional Probability and Bayes' Rule
Content Type: Course Notes
Content Area: Probability
description: "Defines conditional probability and applies it to card dealing, the Monty Hall problem, and Bayesian inference. Derives Bayes' Rule and the Total Probability Rule, with worked examples and the generalization to partitions of the sample space."
Course: CS 70
pinned: false
Date Published: November 01, 2026
Last Updated: November 01, 2026
Status: Finalized
---

# CS 70 Note 17 — Conditional Probability and Bayes' Rule
**Previous note:** [[cs70/Course Notes/N16 Introduction to Discrete Probability|Note 16 — Introduction to Discrete Probability]]. **Next note:** [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events|Note 18 — Inclusion-Exclusion and Combinations of Events]].

This note introduces **conditional probability**, the probability of an event once some other event is known to have occurred. It is applied to card dealing, the Monty Hall problem, and **Bayesian inference**, and it leads to **Bayes' Rule** and the **Total Probability Rule**, first for two cases and then for a general partition of the sample space.

One of the key properties of coin flips is independence: if you flip a fair coin ten times and get ten $T$'s, this does not make it more likely that the next coin flip will be $H$. It still has exactly a 50% chance of being $H$.

By contrast, suppose that while dealing cards, the first ten cards are all red (hearts or diamonds). What is the chance that the next card is red? We started with exactly 26 red cards and 26 black cards. But after dealing the first ten cards, we know that the deck has 16 red cards and 26 black cards. So the chance that the next card is red is $\frac{16}{42}$. Unlike the case of coin flips, the chance of drawing a red card is no longer independent of the previous card that was dealt. This is the phenomenon explored in this note.

---

## 1. Conditional Probability

### Example: Balls and Bins

Consider a smaller sample space. Suppose we toss $m=4$ labeled balls into $n=3$ labeled bins; this is a uniform sample space with $3^4=81$ sample points. From the previous note, the probability that the first bin is empty is

$$
\left(1-\frac{1}{3}\right)^4=\left(\frac{2}{3}\right)^4=\frac{16}{81}.
$$

What is the probability of this event given that the second bin is empty? Let $A$ denote the event that the first bin is empty, and $B$ the event that the second bin is empty. We wish to compute $\mathbb{P}[A\mid B]$, read "the conditional probability of $A$ given $B$."

Since event $B$ is guaranteed to happen, we need to look not at the whole sample space $\Omega$, but at the smaller sample space consisting only of the sample points in $B$.

What should be the probability of each sample point $\omega\in B$ given that the event $B$ occurs? If they all simply inherited their probabilities from $\Omega$, the sum of these probabilities would be

$$
\sum_{\omega\in B}\mathbb{P}[\omega]=\mathbb{P}[B],
$$

which in general is less than 1. To get the correct normalization, we scale the probability of each sample point by $\frac{1}{\mathbb{P}[B]}$. That is, for each sample point $\omega\in B$, the new probability becomes

$$
\mathbb{P}[\omega\mid B]=\frac{\mathbb{P}[\omega]}{\mathbb{P}[B]}.
$$

To compute $\mathbb{P}[A\mid B]$, we sum these scaled probabilities over all sample points that lie in both $A$ and $B$:

$$
\mathbb{P}[A\mid B]=\sum_{\omega\in A\cap B}\mathbb{P}[\omega\mid B]=\sum_{\omega\in A\cap B}\frac{\mathbb{P}[\omega]}{\mathbb{P}[B]}=\frac{\mathbb{P}[A\cap B]}{\mathbb{P}[B]}.
$$

### Definition 17.1 — Conditional Probability

For events $A,B\subseteq\Omega$ in the same probability space such that $\mathbb{P}[B]>0$, the **conditional probability** of $A$ given $B$ is

$$
\mathbb{P}[A\mid B]=\frac{\mathbb{P}[A\cap B]}{\mathbb{P}[B]}.
$$

### Example: Balls and Bins, Continued

To compute $\mathbb{P}[A\mid B]$ we need $\mathbb{P}[A\cap B]$. The event $A\cap B$ is the event that both of the first two bins are empty, i.e., all four balls fall in the third bin. So $\mathbb{P}[A\cap B]=\frac{1}{81}$ (why?). Therefore,

$$
\mathbb{P}[A\mid B]=\frac{\mathbb{P}[A\cap B]}{\mathbb{P}[B]}=\frac{1/81}{16/81}=\frac{1}{16}.
$$

Not surprisingly, $\mathbb{P}[A\mid B]=\frac{1}{16}=0.0625$ is quite a bit less than $\mathbb{P}[A]=\frac{16}{81}\approx0.1975$; knowing that bin 2 is empty makes it significantly less likely that bin 1 will be empty.

### Example: Card Dealing

Apply these ideas to compute the probability that, when dealing 2 cards and the first card is known to be an ace, the second card is also an ace. Let $B$ be the event that the first card is an ace, and let $A$ be the event that the second card is an ace.

To compute $\mathbb{P}[A\mid B]$, we need $\mathbb{P}[A\cap B]$. This is the probability that both cards are aces. There are $52\cdot51$ sample points in the sample space, since each sample point is a sequence of two cards. A sample point is in $A\cap B$ if both cards are aces. This can happen in $4\cdot3=12$ ways.

Since each sample point is equally likely, $\mathbb{P}[A\cap B]=\frac{12}{52\cdot51}$, while $\mathbb{P}[B]$, the probability of drawing an ace in the first trial, is $\frac{4}{52}$. Therefore,

$$
\mathbb{P}[A\mid B]=\frac{\mathbb{P}[A\cap B]}{\mathbb{P}[B]}=\frac{3}{51},
$$

which is less than $\mathbb{P}[A]=\frac{4}{52}=\frac{1}{13}$ (see Exercise 1). Hence, if the first card is an ace, it is less likely that the second card is also an ace.

---

## 2. The Monty Hall Problem

This example is loosely based on an (in)famous 1970s TV game show hosted by Monty Hall. A contestant is shown three doors; behind one of the doors is a valuable prize (a car), and behind the other two are goats. The contestant picks a door (but does not open it). Then Hall's assistant (Carol) opens one of the other two doors, revealing a goat (since Carol knows where the prize is, she can always do this). The contestant is then given the option of sticking with their current door, or switching to the other unopened one. The contestant wins the prize if and only if their chosen door is the correct one. The question is: does the contestant have a better chance of winning if they switch doors?

Intuitively, it seems obvious that since there are only two remaining doors after Carol opens one, they must have equal probability. So you may be tempted to conclude that it should not matter whether the contestant stays or switches. We will see that actually, the contestant has a better chance of picking the car if they use the switching strategy. We first give an intuitive pictorial argument, and then take a more rigorous probability approach.

### Intuitive Argument

Initially when the contestant chooses the door, they have a $\frac{1}{3}$ chance of picking the car. This must mean that the other doors combined have a $\frac{2}{3}$ chance of winning. But after Carol opens a door with a goat behind it, how do the probabilities change? The door the contestant originally chose still has a $\frac{1}{3}$ chance of winning, and the door that Carol opened has no chance of winning. What about the last door? It must have a $\frac{2}{3}$ chance of containing the car, and so the contestant has a higher chance of winning if they switch doors.

The source summarizes this argument in a picture. Before Carol acts, doors 1, 2, and 3 each have probability $\frac{1}{3}$, and doors 2 and 3 together have probability $\frac{2}{3}$. After Carol opens door 3 to reveal a goat, door 1 still has probability $\frac{1}{3}$, door 3 has probability $0$, and door 2 has probability $\frac{2}{3}$.

### The Sample Space

We can describe the outcome of the game (up to the point where the contestant makes their final decision) using a triple of the form $(i,j,k)$, where $i,j,k\in\{1,2,3\}$. The values $i$, $j$, $k$ respectively specify the location of the prize, the initial door chosen by the contestant, and the door opened by Carol. Some triples are not possible: for example, $(1,2,1)$ is not, because Carol never opens the prize door. Thinking of the sample space as a tree structure, in which first $i$ is chosen, then $j$, and finally $k$ (depending on $i$ and $j$), there are exactly 12 sample points.

Assigning probabilities to the sample points requires pinning down some assumptions:

- The prize is equally likely to be behind any of the three doors.
- Initially, the contestant is equally likely to pick any of the three doors.
- If the contestant happens to pick the prize door (so there are two possible doors for Carol to open), Carol is equally likely to pick either one. (Actually the calculation has the same result no matter how Carol picks the door.)

From this, we can assign a probability to every sample point. For example, the point $(2,1,3)$ corresponds to the prize being placed behind door 2 (with probability $\frac{1}{3}$), the contestant picking door 1 (with probability $\frac{1}{3}$), and Carol opening door 3 (with probability 1, because she has no choice). So

$$
\mathbb{P}[(2,1,3)]=\frac{1}{3}\times\frac{1}{3}\times1=\frac{1}{9}.
$$

(Note: again we are multiplying probabilities here, without proper justification.) There are six outcomes of this type, characterized by having $i\neq j$ (and hence $k$ must be different from both). On the other hand,

$$
\mathbb{P}[(1,1,2)]=\frac{1}{3}\times\frac{1}{3}\times\frac{1}{2}=\frac{1}{18},
$$

and there are six outcomes of this type, having $i=j$. These are the only possible outcomes, so the probability space is completely defined. As a check on the arithmetic, the sum of the probabilities of all outcomes is $\left(6\times\frac{1}{9}\right)+\left(6\times\frac{1}{18}\right)=1$.

### Switching versus Sticking

Recall that we want to investigate the relative merits of the "sticking" strategy and the "switching" strategy. Suppose the contestant decides to switch doors. The event $W$ of interest is that the contestant wins. Which sample points $(i,j,k)$ are in $W$? Since the contestant is switching doors, their initial choice $j$ cannot be equal to the prize door, which is $i$. All outcomes of this type correspond to a win for the contestant, because Carol must open the second non-prize door, leaving the contestant to switch to the prize door. So $W$ consists of all outcomes of the first type in the earlier analysis; there are six of these, each with probability $\frac{1}{9}$. So

$$
\mathbb{P}[W]=\frac{6}{9}=\frac{2}{3}.
$$

That is, using the switching strategy, the contestant wins with probability $\frac{2}{3}$. It should be intuitively clear (and easy to check formally - try it!) that under the sticking strategy their probability of winning is $\frac{1}{3}$. (In this case, the contestant is really just picking a single random door.) So by switching, the contestant improves their odds by a huge amount.

---

## 3. Bayesian Inference

Now that we have introduced the notion of conditional probability, we can see how it is used in real-world settings. Conditional probability is at the heart of a subject called **Bayesian inference**, used extensively in fields such as machine learning, communications, and signal processing. Bayesian inference is a way to update knowledge after making an observation. For example, we may have an estimate of the probability of a given event $A$. After event $B$ occurs, we can update this estimate to $\mathbb{P}[A\mid B]$. In this interpretation, $\mathbb{P}[A]$ can be thought of as a **prior probability**: our assessment of the likelihood of an event of interest, $A$, before making an observation. It reflects our prior knowledge. $\mathbb{P}[A\mid B]$ can be interpreted as the **posterior probability** of $A$ after the observation. It reflects our updated knowledge.

### Example: A Medical Test

A pharmaceutical company is marketing a new test for a certain medical disorder. According to clinical trials, the test has the following properties:

1. When applied to an affected person, the test comes up positive in 90% of cases, and negative in 10% (these are called "false negatives").
2. When applied to a healthy person, the test comes up negative in 80% of cases, and positive in 20% (these are called "false positives").

Suppose that the incidence of the disorder in the US population is 5%; this is our prior knowledge. When a random person is tested and the test comes up positive, how can we update the probability that the person has the disorder? (Note that this is presumably *not* the same as the simple probability that a random person in the population has the disorder, which is just $\frac{1}{20}$.) The implicit probability space here is the entire US population with equal probabilities.

The source illustrates this space with three diagrams. The population is split into the affected ($A$) and the healthy ($H$). Separately, it is split into those who test positive ($P$) and those who test negative ($N$). Overlaying the two splits gives four regions, $A\cap P$ and $H\cap P$ within the positive group, and $A\cap N$ and $H\cap N$ within the negative group.

The sample space consists of all people in the US; denote their number by $N$ (so $N\approx350$ million). Let $A$ be the event that a person chosen at random is affected, and $B$ the event that a person chosen at random tests positive. Now we can rewrite the information above as:

- $\mathbb{P}[A]=0.05$ (5% of the US population is affected).
- $\mathbb{P}[B\mid A]=0.9$ (90% of the affected people test positive).
- $\mathbb{P}[B\mid\overline{A}]=0.2$ (20% of healthy people test positive).

We want to calculate $\mathbb{P}[A\mid B]$. We can proceed as follows:

$$
\mathbb{P}[A\mid B]=\frac{\mathbb{P}[A\cap B]}{\mathbb{P}[B]}=\frac{\mathbb{P}[B\mid A]\,\mathbb{P}[A]}{\mathbb{P}[B]}.\tag{1}
$$

We obtained the second equality by applying the definition of conditional probability:

$$
\mathbb{P}[B\mid A]=\frac{\mathbb{P}[A\cap B]}{\mathbb{P}[A]}.
$$

To evaluate (1), we need to compute $\mathbb{P}[B]$. This is the probability that a random person tests positive. To compute it, we can sum two values: the probability $\mathbb{P}[\overline{A}\cap B]$ that a healthy person tests positive and the probability $\mathbb{P}[A\cap B]$ that an affected person tests positive. We can sum because the events $\overline{A}\cap B$ and $A\cap B$ do not intersect (in the source's Venn diagram, $B$ overlaps $A$, and $A\cap B$ and $\overline{A}\cap B$ are the parts of $B$ inside and outside $A$).

By again applying the definition of conditional probability, we have

$$
\mathbb{P}[B]=\mathbb{P}[A\cap B]+\mathbb{P}[\overline{A}\cap B]=\mathbb{P}[B\mid A]\,\mathbb{P}[A]+\mathbb{P}[B\mid\overline{A}]\,\mathbb{P}[\overline{A}]=\mathbb{P}[B\mid A]\,\mathbb{P}[A]+\mathbb{P}[B\mid\overline{A}]\,(1-\mathbb{P}[A]).\tag{2}
$$

Combining (1) and (2), we have expressed $\mathbb{P}[A\mid B]$ in terms of $\mathbb{P}[A]$, $\mathbb{P}[B\mid A]$, and $\mathbb{P}[B\mid\overline{A}]$:

$$
\mathbb{P}[A\mid B]=\frac{\mathbb{P}[B\mid A]\,\mathbb{P}[A]}{\mathbb{P}[B\mid A]\,\mathbb{P}[A]+\mathbb{P}[B\mid\overline{A}]\,(1-\mathbb{P}[A])}.\tag{3}
$$

By plugging in the values written above, we obtain

$$
\mathbb{P}[A\mid B]=\frac{9}{47}\approx0.19.
$$

Equation (3) is useful for many inference problems. We are given $\mathbb{P}[A]$, which is the (unconditional) probability that the event of interest, $A$, happens. We are given $\mathbb{P}[B\mid A]$ and $\mathbb{P}[B\mid\overline{A}]$, which quantify how noisy the observation is. (If $\mathbb{P}[B\mid A]=1$ and $\mathbb{P}[B\mid\overline{A}]=0$, for example, the observation is completely noiseless.) Now we want to calculate $\mathbb{P}[A\mid B]$, the probability that the event of interest happens given that we made the observation. Equation (3) allows us to do just that.

Equations (1), (2), and (3) are derived from the basic axioms of probability and the definition of conditional probability, and are therefore true with or without the Bayesian inference interpretation. However, this interpretation is very useful when we apply probability theory to study inference problems.

---

## 4. Bayes' Rule and Total Probability Rule

Equations (1) and (2) are very useful in their own right. The former is called **Bayes' Rule** and the latter is called the **Total Probability Rule**.

> [!important] Bayes' Rule and the Total Probability Rule
> Bayes' Rule is useful when one wants to calculate $\mathbb{P}[A\mid B]$ but is given $\mathbb{P}[B\mid A]$ instead; it allows us to "flip things around."
> The Total Probability Rule is an application of the strategy of "dividing into cases." Either $A$ happens or $A$ does not happen. If $A$ happens, the probability that $B$ happens is $\mathbb{P}[B\mid A]$. If $A$ does not happen, it is $\mathbb{P}[B\mid\overline{A}]$. If we know or can easily calculate these two probabilities and also $\mathbb{P}[A]$, the Total Probability Rule yields the probability of event $B$.

### Example: Tennis Match

You are about to play a tennis match against a randomly chosen opponent and you wish to calculate your probability of winning. You know your opponent will be one of two people, $X$ or $Y$. If person $X$ is chosen, you will win with probability $0.7$. If person $Y$ is chosen, you will win with probability $0.3$. Your opponent is chosen by flipping a biased coin such that the probability of choosing $X$ is $0.6$.

Let $A$ be the event that you win. Let $B_X$ be the event that person $X$ is chosen, and let $B_Y$ be the event that person $Y$ is chosen. We wish to calculate $\mathbb{P}[A]$. Here is what we know so far:

- $\mathbb{P}[A\mid B_X]=0.7$ (if person $X$ is chosen, you win with probability $0.7$).
- $\mathbb{P}[A\mid B_Y]=0.3$ (if person $Y$ is chosen, you win with probability $0.3$).
- $\mathbb{P}[B_X]=0.6$ (person $X$ is chosen with probability $0.6$).
- $\mathbb{P}[B_Y]=0.4$ (person $Y$ is chosen with probability $0.4$).

By the Total Probability Rule,

$$
\mathbb{P}[A]=\mathbb{P}[A\mid B_X]\,\mathbb{P}[B_X]+\mathbb{P}[A\mid B_Y]\,\mathbb{P}[B_Y],
$$

and plugging in the known values gives

$$
\mathbb{P}[A]=(0.7\times0.6)+(0.3\times0.4)=0.54.
$$

### Example: Balls and Bins

Imagine two bins, each containing some number of black and white balls: Bin 1 contains three black balls and two white balls, and Bin 2 contains one black ball and one white ball (as read from the source's sample-space diagram). Suppose one of the two bins is chosen with equal probability and a ball is drawn from the chosen bin uniformly at random. What is the probability that we picked Bin 1 given that a white ball was drawn, i.e., $\mathbb{P}[\text{Bin 1}\mid\text{white}]$?

Is the answer $\frac{2}{3}$, since we know that there are a total of three white balls, two of which are in Bin 1?

> [!warning] Incorrect Reasoning
> The answer $\frac{2}{3}$ is incorrect. Counting white balls ignores that each bin is chosen with equal probability, so each sample point must be scaled appropriately.

Instead, we should appropriately scale each sample point. The sample space $\Omega$ consists of the outcomes in event $B_1$ (corresponding to Bin 1) and event $B_2$ (corresponding to Bin 2), i.e., $\Omega=B_1\cup B_2$. In the source diagram, each of the five sample points in $B_1$ has probability $\frac{1}{10}$ (three black balls and two white balls), and each of the two sample points in $B_2$ has probability $\frac{1}{4}$ (one black ball and one white ball). We can use the definition of conditional probability to see that

$$
\mathbb{P}[\text{Bin 1}\mid\text{white}]=\frac{\frac{1}{10}+\frac{1}{10}}{\frac{1}{10}+\frac{1}{10}+\frac{1}{4}}=\frac{\frac{2}{10}}{\frac{9}{20}}=\frac{4}{9}.
$$

Let us try to achieve this probability using Bayes' Rule. To apply Bayes' Rule, we need to compute $\mathbb{P}[\text{white}\mid\text{Bin 1}]$, $\mathbb{P}[\text{Bin 1}]$, and $\mathbb{P}[\text{white}]$. Here, $\mathbb{P}[\text{white}\mid\text{Bin 1}]$ is the chance that we pick a white ball given that we picked Bin 1, which is $\frac{2}{5}$. $\mathbb{P}[\text{Bin 1}]=\frac{1}{2}$, as given in the description of the problem. Finally, $\mathbb{P}[\text{white}]$ can be computed using the Total Probability Rule:

$$
\mathbb{P}[\text{white}]=\mathbb{P}[\text{white}\mid\text{Bin 1}]\times\mathbb{P}[\text{Bin 1}]+\mathbb{P}[\text{white}\mid\text{Bin 2}]\times\mathbb{P}[\text{Bin 2}]=\frac{2}{5}\times\frac{1}{2}+\frac{1}{2}\times\frac{1}{2}=\frac{9}{20}.
$$

Observe that we can apply the Total Probability Rule here because $\mathbb{P}[\text{Bin 1}]$ is the complement of $\mathbb{P}[\text{Bin 2}]$. Finally, upon plugging the above values into Bayes' Rule, we obtain the probability that we picked Bin 1 given that we picked a white ball:

$$
\mathbb{P}[\text{Bin 1}\mid\text{white}]=\frac{\frac{2}{5}\times\frac{1}{2}}{\frac{9}{20}}=\frac{\frac{2}{10}}{\frac{9}{20}}=\frac{4}{9}.
$$

All we have done is combine Bayes' Rule and the Total Probability Rule; this is also how we obtained (3). Equivalently, we could have plugged the appropriate values into (3).

### Definition 17.2 — Partition of an Event

We now consider Bayes' Rule and the Total Probability Rule in a more general context. First, we define a partition of an event as follows. We say that an event $A$ is **partitioned** into $n$ events $A_1,\ldots,A_n$ if

1. $A=A_1\cup A_2\cup\cdots\cup A_n$, and
2. $A_i\cap A_j=\varnothing$ for all $i\neq j$ (i.e., $A_1,\ldots,A_n$ are mutually exclusive).

In other words, each outcome in $A$ belongs to exactly one of the events $A_1,\ldots,A_n$.

### Generalized Total Probability Rule and Bayes' Rule

Let $A_1,\ldots,A_n$ be a partition of the sample space $\Omega$. Then the Total Probability Rule for any event $B$ is

$$
\mathbb{P}[B]=\sum_{i=1}^{n}\mathbb{P}[B\cap A_i]=\sum_{i=1}^{n}\mathbb{P}[B\mid A_i]\,\mathbb{P}[A_i],\tag{4}
$$

while Bayes' Rule, assuming $\mathbb{P}[B]\neq0$, is given by

$$
\mathbb{P}[A_i\mid B]=\frac{\mathbb{P}[B\mid A_i]\,\mathbb{P}[A_i]}{\mathbb{P}[B]}=\frac{\mathbb{P}[B\mid A_i]\,\mathbb{P}[A_i]}{\sum_{j=1}^{n}\mathbb{P}[B\mid A_j]\,\mathbb{P}[A_j]},\tag{5}
$$

where the second equality follows from the Total Probability Rule.

---

## 5. Exercises

1. Suppose five cards are dealt from a standard deck of playing cards. Let $A_i$ be the event that the $i$th card is an ace. Show that $\mathbb{P}[A_i]=\frac{1}{13}$ for all $i=1,\ldots,5$.
2. Prove Equations (4) and (5).
