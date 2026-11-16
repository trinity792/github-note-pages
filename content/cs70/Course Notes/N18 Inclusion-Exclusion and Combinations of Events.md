---
title: N18 Inclusion-Exclusion and Combinations of Events
Content Type: Course Notes
Content Area: Probability
description: "Proves the Principle of Inclusion-Exclusion and applies it to derangements, then develops independence, the Product Rule, and inclusion-exclusion for probabilities of unions, ending with the union bound. Examples include coin tosses, Monty Hall, poker hands, and a Las Vegas dice game."
Course: CS 70
pinned: false
Date Published: November 01, 2026
Last Updated: November 01, 2026
Status: Finalized
---

# N18 Inclusion-Exclusion and Combinations of Events
**Previous note:** [[cs70/Course Notes/N17 Conditional Probability and Bayes' Rule|Note 17 — Conditional Probability and Bayes' Rule]].

This note begins with the **Principle of Inclusion-Exclusion**, a counting formula that avoids over-counting, and uses it to rederive the number of derangements. It then turns to probabilities of combinations of events: **independence** and **mutual independence**, the **Product Rule** for intersections, and inclusion-exclusion for unions, together with the **union bound**.

---

## 1. The Principle of Inclusion-Exclusion

In this section we learn a useful formula that can be employed to count objects without over-counting. We start with a familiar example. Let $A_1$ and $A_2$ be two subsets of the same finite set $A$, and suppose we want to count the number of elements in $A_1\cup A_2$. If $A_1$ and $A_2$ are disjoint, then clearly $|A_1\cup A_2|=|A_1|+|A_2|$. If $A_1$ and $A_2$ have common elements, however, then those elements would be counted twice in the previous formula. To correct for this overcounting, we need to subtract $|A_1\cap A_2|$ from $|A_1|+|A_2|$, thus yielding

$$
|A_1\cup A_2|=|A_1|+|A_2|-|A_1\cap A_2|.
$$

The principle of inclusion-exclusion generalizes this concept to an arbitrary number of subsets.

### Theorem 18.1 — Inclusion-Exclusion

Let $A_1,\ldots,A_n$ be arbitrary subsets of the same finite set $A$. Then,

$$
|A_1\cup\cdots\cup A_n|=\sum_{k=1}^{n}(-1)^{k-1}\sum_{S\subseteq\{1,\ldots,n\}:\,|S|=k}\left|\bigcap_{i\in S}A_i\right|.\tag{1}
$$

**Remarks:**

1. The inner summation in (1) is over all size-$k$ subsets of $\{1,2,\ldots,n\}$. More explicitly, (1) can be written as

$$
|A_1\cup\cdots\cup A_n|=\sum_{i=1}^{n}|A_i|-\sum_{i<j}|A_i\cap A_j|+\sum_{i<j<k}|A_i\cap A_j\cap A_k|-\sum_{i<j<k<l}|A_i\cap A_j\cap A_k\cap A_l|+\cdots+(-1)^{n-1}|A_1\cap A_2\cap\cdots\cap A_n|,\tag{2}
$$

where $\sum_{i<j}$ denotes summing over all $i,j\in\{1,\ldots,n\}$ such that $i<j$, and so on.

2. The standard way to prove Theorem 18.1 is via induction on $n$. Here, we provide a combinatorial proof.

### Proof of Theorem 18.1

First, note that if $a\notin A_1\cup\cdots\cup A_n$, then $a\notin A_i$ for all $i\in\{1,\ldots,n\}$ and hence $a\notin\bigcap_{i\in S}A_i$ for any $S\subseteq\{1,\ldots,n\}$, so it is not counted by the right-hand side (RHS) of (1).

We now show that if $a\in A_1\cup\cdots\cup A_n$, then it is counted exactly once by the RHS. Define the index set $M\subseteq\{1,\ldots,n\}$ as

$$
M=\{i\in\{1,\ldots,n\}\mid a\in A_i\};
$$

that is, $a\in A_i$ if and only if $i\in M$. Note that $m:=|M|\geq1$, since $a\in A_1\cup\cdots\cup A_n$.

Clearly, if $S\not\subseteq M$, then $a\notin\bigcap_{i\in S}A_i$ (i.e., if $S$ contains an index $i$ not in $M$, then $a\notin A_i$, so $a\notin\bigcap_{i\in S}A_i$). Furthermore, $a\in\bigcap_{i\in S}A_i$ for any non-empty subset $S\subseteq M$. Therefore, the number of times that $a$ is counted on the RHS of (1) is

$$
\sum_{k=1}^{m}(-1)^{k-1}\sum_{S\subseteq M:\,|S|=k}1=\sum_{k=1}^{m}(-1)^{k-1}\binom{m}{k}=1,
$$

where the first equality follows from the fact that the number of distinct $k$-element subsets of $M$ is $\binom{m}{k}$, while the second equality follows from Corollary 15.1 in [[cs70/Course Notes/N15 Counting|Note 15]].

### Application: Derangements Revisited

We now illustrate the power of Theorem 18.1 by applying it to derive the formula shown in Equation (4) of [[cs70/Course Notes/N15 Counting|Note 15]] for the number $D_n$ of derangements of $\{1,\ldots,n\}$.

Let $A_i$ denote the set of all permutations of $\{1,\ldots,n\}$ with $i$ being a fixed point. Then, since there are $n!$ distinct permutations of $\{1,\ldots,n\}$ and $|A_1\cup A_2\cup\cdots\cup A_n|$ counts the number of permutations with at least one fixed point, we have

$$
D_n=n!-|A_1\cup A_2\cup\cdots\cup A_n|.\tag{3}
$$

What is the cardinality of $A_i$? We know that $i$ maps to $i$, while the remaining $n-1$ elements can be arranged in an arbitrary way. So, $|A_i|=(n-1)!$. Similarly, for $i\neq j$, $i$ maps to $i$ and $j$ maps to $j$, while the remaining $n-2$ elements can be arranged in an arbitrary way, so we conclude $|A_i\cap A_j|=(n-2)!$. In general, for any subset $S\subseteq\{1,\ldots,n\}$ of size $|S|=k$, $\left|\bigcap_{i\in S}A_i\right|=(n-k)!$, while there are $\binom{n}{k}$ such subsets. Thus, the inclusion-exclusion formula from (1) gives

$$
\begin{aligned}
|A_1\cup A_2\cup\cdots\cup A_n|
&=\sum_{k=1}^{n}(-1)^{k-1}\binom{n}{k}(n-k)! \\
&=\sum_{k=1}^{n}(-1)^{k-1}\frac{n!}{k!\,(n-k)!}(n-k)! \\
&=n!\sum_{k=1}^{n}\frac{(-1)^{k-1}}{k!}.
\end{aligned}
$$

Substituting this result into (3) gives

$$
D_n=n!-n!\sum_{k=1}^{n}\frac{(-1)^{k-1}}{k!}=n!\sum_{k=0}^{n}\frac{(-1)^k}{k!}.
$$

---

## 2. Combinations of Events

In most applications of probability in Computer Science, we are interested in things like $\mathbb{P}\left[\bigcup_{i=1}^{n}A_i\right]$ and $\mathbb{P}\left[\bigcap_{i=1}^{n}A_i\right]$, where the $A_i$ are simple events (i.e., we know or can easily compute $\mathbb{P}[A_i]$). The intersection $\bigcap_iA_i$ corresponds to the logical AND of the events $A_i$, while the union $\bigcup_iA_i$ corresponds to their logical OR. As an example, if $A_i$ denotes the event that a failure of type $i$ happens in a certain system, then $\bigcup_iA_i$ is the event that the system fails.

In general, computing the probabilities of such combinations can be very difficult. In this section, we discuss some situations where it can be done. Let's start with independent events, for which intersections are quite simple to compute.

### Independent Events

#### Definition 18.1 — Independence

Two events $A,B$ in the same probability space are said to be **independent** if

$$
\mathbb{P}[A\cap B]=\mathbb{P}[A]\times\mathbb{P}[B].
$$

The intuition behind this definition is the following. Suppose that $\mathbb{P}[B]>0$. Then we have

$$
\mathbb{P}[A\mid B]=\frac{\mathbb{P}[A\cap B]}{\mathbb{P}[B]}=\frac{\mathbb{P}[A]\times\mathbb{P}[B]}{\mathbb{P}[B]}=\mathbb{P}[A].
$$

Thus independence has the natural meaning that "the probability of $A$ is not affected by whether or not $B$ occurs." (By a symmetrical argument, we also have $\mathbb{P}[B\mid A]=\mathbb{P}[B]$ provided $\mathbb{P}[A]>0$.) For events $A,B$ such that $\mathbb{P}[B]>0$, the condition $\mathbb{P}[A\mid B]=\mathbb{P}[A]$ is actually equivalent to the definition of independence.

Several of our previously mentioned random experiments consist of independent events. For example, if we flip a coin twice, the event of obtaining heads in the first trial is independent of the event of obtaining heads in the second trial. The same applies for two rolls of a die; the outcomes of each trial are independent.

The above definition generalizes to any finite set of events.

#### Definition 18.2 — Mutual Independence

Events $A_1,\ldots,A_n$ are said to be **mutually independent** if for every subset $I\subseteq\{1,\ldots,n\}$ with size $|I|\geq2$,

$$
\mathbb{P}\left[\bigcap_{i\in I}A_i\right]=\prod_{i\in I}\mathbb{P}[A_i].\tag{4}
$$

#### Definition 18.3 — Mutual Independence (Equivalent Form)

An equivalent definition of mutual independence is as follows. Events $A_1,\ldots,A_n$ are said to be mutually independent if for all $B_i\in\{A_i,\overline{A_i}\}$, $i=1,\ldots,n$,

$$
\mathbb{P}[B_1\cap\cdots\cap B_n]=\prod_{i=1}^{n}\mathbb{P}[B_i].\tag{5}
$$

**Remarks:**

1. In Definition 18.2, (4) needs to hold for every subset $I$ of $\{1,\ldots,n\}$ with size $|I|\geq2$. The cases of $|I|=0$ and $|I|=1$ are omitted, as they impose no constraints.
2. Note that (4) imposes $2^n-n-1$ constraints on the probability distribution, while (5) defines $2^n$ constraints. It turns out that exactly $n+1$ constraints implied by (5) are actually redundant.

For mutually independent events $A_1,\ldots,A_n$, it is not hard to check from the definition of conditional probability that, for any $1\leq i\leq n$ and any subset $I\subseteq\{1,\ldots,n\}\setminus\{i\}$, we have

$$
\mathbb{P}\left[A_i\;\middle|\;\bigcap_{j\in I}A_j\right]=\mathbb{P}[A_i].
$$

> [!important] Pairwise versus Mutual Independence
> The independence of every pair of events (so-called **pairwise independence**) does not necessarily imply mutual independence. It is possible to construct three events $A,B,C$ such that each pair is independent but the triple $A,B,C$ is not mutually independent.

#### Example: Pairwise Independent but Not Mutually Independent Events

Suppose you toss a fair coin twice and let $A$ be the event that the first flip is $H$ and $B$ be the event that the second flip is $H$. Now let $C$ be the event that both flips are the same (i.e., both $H$'s or both $T$'s). Of course $A$ and $B$ are independent. What is more interesting is that so are $A$ and $C$: given that the first toss came up $H$, the chance of the second flip being the same as the first is still $\frac{1}{2}$. Another way of saying this is that

$$
\mathbb{P}[A\cap C]=\frac{1}{4}=\mathbb{P}[A]\,\mathbb{P}[C],
$$

since $A\cap C$ is the event that the first flip is $H$ and the second is also $H$. By the same reasoning $B$ and $C$ are also independent.

On the other hand, $A$, $B$, and $C$ are not mutually independent. For example, if we are given that $A$ and $B$ occurred, then the probability that $C$ occurs is 1. So, even though $A$, $B$, and $C$ are not mutually independent, every pair of them is independent. In other words, $A$, $B$, and $C$ are pairwise independent but not mutually independent.

### Intersections of Events

Computing the probability of an intersection of mutually independent events is easy; it follows from the definition. We simply multiply the probabilities of each event. How do we compute the probability of an intersection for events that are not mutually independent? From the definition of conditional probability, we immediately have the following **Product Rule** (sometimes also called the chain rule) for computing the probability of an intersection of events.

#### Theorem 18.2 — Product Rule

For any events $A,B$, we have

$$
\mathbb{P}[A\cap B]=\mathbb{P}[A]\,\mathbb{P}[B\mid A].
$$

More generally, for any events $A_1,\ldots,A_n$,

$$
\mathbb{P}\left[\bigcap_{i=1}^{n}A_i\right]=\mathbb{P}[A_1]\times\mathbb{P}[A_2\mid A_1]\times\mathbb{P}[A_3\mid A_1\cap A_2]\times\cdots\times\mathbb{P}\left[A_n\;\middle|\;\bigcap_{i=1}^{n-1}A_i\right].
$$

#### Proof of Theorem 18.2

The first assertion follows directly from the definition of $\mathbb{P}[B\mid A]$ (and is in fact a special case of the second assertion with $n=2$).

To prove the second assertion, we use induction on $n$ (the number of events). The base case is $n=1$, and corresponds to the statement that $\mathbb{P}[A]=\mathbb{P}[A]$, which is trivially true. For an arbitrary $n>1$, assume (the inductive hypothesis) that

$$
\mathbb{P}\left[\bigcap_{i=1}^{n-1}A_i\right]=\mathbb{P}[A_1]\times\mathbb{P}[A_2\mid A_1]\times\cdots\times\mathbb{P}\left[A_{n-1}\;\middle|\;\bigcap_{i=1}^{n-2}A_i\right].
$$

Now we can apply the definition of conditional probability to the two events $A_n$ and $\bigcap_{i=1}^{n-1}A_i$ to deduce that

$$
\begin{aligned}
\mathbb{P}\left[\bigcap_{i=1}^{n}A_i\right]
&=\mathbb{P}\left[A_n\cap\left(\bigcap_{i=1}^{n-1}A_i\right)\right] \\
&=\mathbb{P}\left[A_n\;\middle|\;\bigcap_{i=1}^{n-1}A_i\right]\times\mathbb{P}\left[\bigcap_{i=1}^{n-1}A_i\right] \\
&=\mathbb{P}\left[A_n\;\middle|\;\bigcap_{i=1}^{n-1}A_i\right]\times\mathbb{P}[A_1]\times\mathbb{P}[A_2\mid A_1]\times\cdots\times\mathbb{P}\left[A_{n-1}\;\middle|\;\bigcap_{i=1}^{n-2}A_i\right],
\end{aligned}
$$

where in the last line we have used the inductive hypothesis. This completes the proof by induction.

The Product Rule is particularly useful when we can view our sample space as a sequence of choices. The next few examples illustrate this point.

#### Example: Coin Tosses

Toss a fair coin three times. Let $A$ be the event that all three tosses are heads. Then $A=A_1\cap A_2\cap A_3$, where $A_i$ is the event that the $i$th toss comes up heads. We have

$$
\begin{aligned}
\mathbb{P}[A]
&=\mathbb{P}[A_1]\times\mathbb{P}[A_2\mid A_1]\times\mathbb{P}[A_3\mid A_1\cap A_2] \\
&=\mathbb{P}[A_1]\times\mathbb{P}[A_2]\times\mathbb{P}[A_3] \\
&=\frac{1}{2}\times\frac{1}{2}\times\frac{1}{2}=\frac{1}{8}.
\end{aligned}
$$

The second line here follows from the fact that the tosses are mutually independent. Of course, we already know that $\mathbb{P}[A]=\frac{1}{8}$ from our definition of the probability space in [[cs70/Course Notes/N16 Introduction to Discrete Probability|Note 16]]. Another way of looking at this calculation is that it justifies our definition of the probability space, and shows that it was consistent with assuming that the coin flips are mutually independent.

If the coin is biased with heads probability $p$, we get, again using independence,

$$
\mathbb{P}[A]=\mathbb{P}[A_1]\times\mathbb{P}[A_2]\times\mathbb{P}[A_3]=p^3.
$$

More generally, the probability of any sequence of $n$ tosses containing $k$ heads and $n-k$ tails is $p^k(1-p)^{n-k}$. This is in fact the reason we defined the probability space this way: we defined the sample point probabilities so that the coin tosses would behave independently.

#### Example: Monty Hall Revisited

Recall the Monty Hall problem from [[cs70/Course Notes/N17 Conditional Probability and Bayes' Rule|the previous note]]: there are three doors and the probability that the prize is behind any given door is $\frac{1}{3}$. There are goats behind the other two doors. The contestant picks a door randomly, and the host opens one of the other two doors, revealing a goat. How do we calculate intersections in this setting? For example, what is the probability that the contestant chooses door 1, the prize is behind door 2, and the host chooses door 3?

Let $C_i$ be the event that the contestant chooses door $i$, let $P_i$ be the event that the prize is behind door $i$, and let $H_i$ be the event that the host chooses door $i$. Then, by the Product Rule,

$$
\mathbb{P}[C_1\cap P_2\cap H_3]=\mathbb{P}[C_1]\times\mathbb{P}[P_2\mid C_1]\times\mathbb{P}[H_3\mid C_1\cap P_2].
$$

The probability of $C_1$ is $\frac{1}{3}$, since the contestant is choosing the door at random. The probability of $P_2$ given $C_1$ is still $\frac{1}{3}$ since they are independent. The probability of the host choosing door 3 given events $C_1$ and $P_2$ is 1; the host cannot choose door 1 since the contestant has already chosen it, and the host cannot choose door 2 since the host must reveal a goat (and not the prize). Therefore,

$$
\mathbb{P}[C_1\cap P_2\cap H_3]=\frac{1}{3}\times\frac{1}{3}\times1=\frac{1}{9}.
$$

Observe that we needed conditional probability in this setting; had we simply multiplied the probabilities of each event, we would have obtained $\frac{1}{27}$ since the probability of $H_3$ is also $\frac{1}{3}$ (can you figure out why?).

What if we changed the situation, and instead asked for the probability that the contestant chooses door 1, the prize is behind door 1, and the host chooses door 3? We can use the same technique as above, but our final answer will be different. This is left as an exercise (see Exercise 3).

Now, noting that $\mathbb{P}[H_3\mid C_1]=\frac{1}{2}$ (see Exercise 4) and

$$
\mathbb{P}[C_1\cap H_3]=\mathbb{P}[C_1]\,\mathbb{P}[H_3\mid C_1]=\frac{1}{3}\times\frac{1}{2}=\frac{1}{6},
$$

we obtain

$$
\mathbb{P}[P_2\mid C_1\cap H_3]=\frac{\mathbb{P}[C_1\cap P_2\cap H_3]}{\mathbb{P}[C_1\cap H_3]}=\frac{1/9}{1/6}=\frac{2}{3},
$$

which is a more formal derivation of the same conclusion described in the previous note.

#### Example: Poker Hands

Let's use the Product Rule to compute the probability of a flush in a different way. This is equal to $4\times\mathbb{P}[A]$, where $A$ is the probability of a Hearts flush. Intuitively, this should be clear since there are 4 suits; we'll see why this is formally true in the next section. We can write $A=\bigcap_{i=1}^{5}A_i$, where $A_i$ is the event that the $i$th card we pick is a Heart. So we have

$$
\mathbb{P}[A]=\mathbb{P}[A_1]\times\mathbb{P}[A_2\mid A_1]\times\cdots\times\mathbb{P}\left[A_5\;\middle|\;\bigcap_{i=1}^{4}A_i\right].
$$

Clearly $\mathbb{P}[A_1]=\frac{13}{52}=\frac{1}{4}$. What about $\mathbb{P}[A_2\mid A_1]$? Since we are conditioning on $A_1$ (the first card is a Heart), there are only 51 remaining possibilities for the second card, 12 of which are Hearts. So $\mathbb{P}[A_2\mid A_1]=\frac{12}{51}$. Similarly, $\mathbb{P}[A_3\mid A_1\cap A_2]=\frac{11}{50}$, and so on. So we get

$$
4\times\mathbb{P}[A]=4\times\frac{13}{52}\times\frac{12}{51}\times\frac{11}{50}\times\frac{10}{49}\times\frac{9}{48},
$$

which is exactly the same fraction we computed in [[cs70/Course Notes/N16 Introduction to Discrete Probability|Note 16]].

So now we have two methods of computing probabilities in many of our sample spaces. It is useful to keep these different methods around, both as a check on your answers and because in some cases one of the methods is easier to use than the other.

### Unions of Events

You are in Las Vegas, and you spy a new game with the following rules. You pick a number between 1 and 6. Then three dice are thrown. You win if and only if your number comes up on at least one of the dice.

The casino claims that your odds of winning are 50%, using the following argument. Let $A$ be the event that you win. We can write $A=A_1\cup A_2\cup A_3$, where $A_i$ is the event that your number comes up on die $i$. Clearly $\mathbb{P}[A_i]=\frac{1}{6}$ for each $i$. Therefore, they claim

$$
\mathbb{P}[A]=\mathbb{P}[A_1\cup A_2\cup A_3]=\mathbb{P}[A_1]+\mathbb{P}[A_2]+\mathbb{P}[A_3]=3\times\frac{1}{6}=\frac{1}{2}.
$$

Is this calculation correct? Suppose instead that the casino rolled six dice, and again you win if and only if your number comes up at least once. Then the analogous calculation would say that you win with probability $6\times\frac{1}{6}=1$, i.e., certainly. The situation becomes even more ridiculous when the number of dice gets bigger than 6.

> [!warning] Adding Probabilities of Overlapping Events
> The problem is that the events $A_i$ are not disjoint: there are some sample points that lie in more than one of the $A_i$. (We could get really lucky and our number could come up on two of the dice, or all three.) So, if we add up the $\mathbb{P}[A_i]$, we are counting some sample points more than once.

Fortunately, earlier in this note we learned about the Principle of Inclusion-Exclusion, which allows us to deal with this kind of situation. In the proof of Theorem 18.1, it was shown that every $\omega\notin A_1\cup\cdots\cup A_n$ is not counted by the Inclusion-Exclusion formula, while every $\omega\in A_1\cup\cdots\cup A_n$ is counted exactly once by the formula. Hence, rather than summing (with appropriate signs) the cardinalities of $\bigcap_{i\in S}A_i$ in the Inclusion-Exclusion formula, if we instead sum their probabilities $\mathbb{P}\left[\bigcap_{i\in S}A_i\right]$, we obtain the following useful formula for computing $\mathbb{P}[A_1\cup\cdots\cup A_n]$.

#### Theorem 18.3 — Inclusion-Exclusion for Probabilities

Let $A_1,\ldots,A_n$ be events in some probability space, where $n\geq2$. Then, we have

$$
\mathbb{P}[A_1\cup\cdots\cup A_n]=\sum_{k=1}^{n}(-1)^{k-1}\sum_{S\subseteq\{1,\ldots,n\}:\,|S|=k}\mathbb{P}\left[\bigcap_{i\in S}A_i\right].\tag{6}
$$

The right-hand side of (6) can be written as

$$
\mathbb{P}\left[\bigcup_{i=1}^{n}A_i\right]=\sum_{i=1}^{n}\mathbb{P}[A_i]-\sum_{i<j}\mathbb{P}[A_i\cap A_j]+\sum_{i<j<k}\mathbb{P}[A_i\cap A_j\cap A_k]-\cdots+(-1)^{n-1}\mathbb{P}[A_1\cap A_2\cap\cdots\cap A_n],
$$

where $\sum_{i<j}$ denotes summing over all $i,j\in\{1,\ldots,n\}$ such that $i<j$, and so on. That is, to compute $\mathbb{P}\left[\bigcup_iA_i\right]$, we start by summing the event probabilities $\mathbb{P}[A_i]$, then we subtract the probabilities of all pairwise intersections, then we add back in the probabilities of all three-way intersections, and so on. You might like to verify it for the special case $n=3$ by drawing a Venn diagram. You might also like to prove the formula for general $n$ by induction (in similar fashion to the proof of the Product Rule above).

#### Example: The Las Vegas Game, Corrected

Using (6), the probability we get lucky in the new game in Las Vegas is given by

$$
\mathbb{P}[A_1\cup A_2\cup A_3]=\mathbb{P}[A_1]+\mathbb{P}[A_2]+\mathbb{P}[A_3]-\mathbb{P}[A_1\cap A_2]-\mathbb{P}[A_1\cap A_3]-\mathbb{P}[A_2\cap A_3]+\mathbb{P}[A_1\cap A_2\cap A_3].
$$

Now the nice thing here is that the events $A_i$ are mutually independent (the outcome of any die does not depend on that of the others), so $\mathbb{P}[A_i\cap A_j]=\mathbb{P}[A_i]\,\mathbb{P}[A_j]=\left(\frac{1}{6}\right)^2=\frac{1}{36}$, and similarly $\mathbb{P}[A_1\cap A_2\cap A_3]=\left(\frac{1}{6}\right)^3=\frac{1}{216}$. So, we get

$$
\mathbb{P}[A_1\cup A_2\cup A_3]=\left(3\times\frac{1}{6}\right)-\left(3\times\frac{1}{36}\right)+\frac{1}{216}=\frac{91}{216}\approx0.42.
$$

So your odds are quite a bit worse than what the casino is claiming.

#### Inclusion-Exclusion When $n$ Is Large

When $n$ is large (i.e., we are interested in the union of many events), the Inclusion-Exclusion formula is essentially useless because it involves computing the probability of the intersection of every non-empty subset of the events, and there are $2^n-1$ of these. Sometimes we can just look at the first few terms of it and forget the rest: summing the first $k$ terms gives us an overestimate when $k$ is odd and an underestimate when $k$ is even, and both these estimates get better as $k$ increases.

However, in many situations we can get a long way by just looking at the first term:

1. **Mutually exclusive events.** If the events $A_1,\ldots,A_n$ are mutually exclusive (i.e., $A_i\cap A_j=\varnothing$ for all $i\neq j$), then

$$
\mathbb{P}\left[\bigcup_{i=1}^{n}A_i\right]=\sum_{i=1}^{n}\mathbb{P}[A_i].
$$

We have already used this fact several times in our examples, e.g., in claiming that the probability of a flush is four times the probability of a Hearts flush; clearly flushes in different suits are disjoint events.

2. **Union bound.** Let $A_1,\ldots,A_n$ be events in some probability space. Then, for all $n\in\mathbb{Z}^+$,

$$
\mathbb{P}\left[\bigcup_{i=1}^{n}A_i\right]\leq\sum_{i=1}^{n}\mathbb{P}[A_i].\tag{7}
$$

This merely says that adding up the $\mathbb{P}[A_i]$ can only overestimate the probability of the union. Crude as it may seem, we will later see how to use the union bound effectively in Computer Science examples.

---

## 3. Exercises

1. Prove Theorem 18.1 using induction.
2. Show that Definitions 18.2 and 18.3 of mutual independence are equivalent.
3. In the Monty Hall problem, find $\mathbb{P}[C_1\cap P_1\cap H_3]$.
4. In the Monty Hall problem, show that $\mathbb{P}[H_3\mid C_1]=\frac{1}{2}$.
5. Prove the union bound from (7).
