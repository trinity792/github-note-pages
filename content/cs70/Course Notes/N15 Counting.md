---
title: N15 Counting
Content Type: Course Notes
Content Area: Counting
description: "Develops the rules of counting for sequences and sets, with and without replacement and with or without regard to order. Covers the zeroth, first, and second rules of counting, stars-and-bars for multisets, the Binomial Theorem, and bonus material on combinatorial identities and derangements."
Course: CS 70
pinned: false
Date Published: October 25, 2026
Last Updated: October 25, 2026
Status: Finalized
---

# N15 Counting
**Related lecture:** [[cs70/Lecture Notes/L15 Counting|L15 Counting]]. **Next note:** [[cs70/Course Notes/N16 Introduction to Discrete Probability|Note 16 — Introduction to Discrete Probability]].

The next major topic of the course is probability theory. Suppose you toss a fair coin a thousand times. How likely is it that you get exactly 500 heads? And what about 1000 heads? The chances of 500 heads are roughly 2.5%, whereas the chances of 1000 heads are so infinitesimally small that we may as well say that it is impossible. But before you can learn to compute or estimate odds or probabilities you must learn to count. That is the subject of this note.

---

## 1. Counting Sequences (yOnR)

Start with a simple scenario. Pick $k\le n$ elements from an $n$-element set $S=\{1,2,\ldots,n\}$ one at a time, removing each sampled element from $S$. This is called **sampling without replacement**. We want to count the number of ways to do this, taking into account the order in which the elements are picked. For example, when $k=2$, picking $1$ and then $2$ is a different outcome from picking $2$ followed by $1$. Equivalently, we want the number of ordered sequences of $k$ distinct elements of $S$.

If we were dealing cards, the set would be $S=\{1,\ldots,52\}$, where each number represents a card in a deck of 52 cards. Once a card is dealt it is no longer in the deck, so a hand of $k$ cards consists of $k$ distinct elements of $S$.

For the first card there are $52$ choices. The choices for the second card depend on the first, but regardless of which card came first there are exactly $51$ choices for the second, so there are $52\times51$ ways to choose the first two cards. Likewise there are exactly $50$ choices for the third card regardless of the first two, giving $52\times51\times50$ sequences of three cards. In general, the number of sequences of $k$ cards is

$$
52\times51\times\cdots\times\bigl[52-(k-1)\bigr].
$$

### The First Rule of Counting

> [!important] First Rule of Counting
> If an object can be made by a succession of $k$ choices, where there are $n_1$ ways of making the first choice, and for every way of making the first choice there are $n_2$ ways of making the second choice, and for every way of making the first and second choice there are $n_3$ ways of making the third choice, and so on up to the $n_k$-th choice, then the total number of distinct objects that can be made in this way is the product $n_1\times n_2\times n_3\times\cdots\times n_k$.

The rule can be pictured as a tree. The root has branching factor $n_1$, every vertex at the second level has branching factor $n_2$, and so on, with every vertex at the $k$-th level having branching factor $n_k$. Each path from the root to a leaf at level $k+1$ is one way of making the object through a succession of $k$ choices, so the number of distinct objects equals the number of leaves, which is $n_1\times n_2\times\cdots\times n_k$. For example, if $n_1=2$, $n_2=2$, and $n_3=3$, there are $12$ leaves, i.e., $12$ outcomes.

This problem is sometimes called **yOnR**, meaning "yes, we care about Order, but no, we don't allow Replacement."

---

## 2. Counting Sets (nOnR)

Consider a slightly different question. We again pick $k$ distinct elements of $S=\{1,2,\ldots,n\}$ without repetition, but now we do not care about the order. Picking elements $1,\ldots,k$ is the same outcome as picking $2,\ldots,k$ and then $1$ as the last element.

When dealing a hand of cards, say a poker hand, it is often more natural to count the number of distinct hands (the set of 5 cards dealt) than the order in which they were dealt. By Section 1, if we consider order there are

$$
52\cdot51\cdot50\cdot49\cdot48=\frac{52!}{47!}
$$

outcomes. But each hand is just a subset of $S$ of cardinality $5$, so how many $5$-element subsets of $S$ are there?

Create a bin for each $5$-element subset. Take every sequence of $5$ cards and place it in the bin for the set of cards it contains. For example, the sequence $(2,1,3,5,4)$ is placed in the bin labeled $\{1,2,3,4,5\}$. Each bin receives exactly $5!$ sequences, because there are $5!$ ways to order $5$ cards. The number of bins, which is the number of $5$-element subsets, is therefore

$$
\frac{52!}{47!\,5!}.
$$

This quantity occurs so often that it has special notation:

$$
\binom{n}{k}=\frac{n!}{(n-k)!\,k!},
$$

pronounced "$n$ choose $k$" and known as the **binomial coefficient**. It is the number of ways of choosing $k$ objects out of $n$ distinct objects when the order of the choices does not matter.

### The Second Rule of Counting

> [!important] Second Rule of Counting
> Assume an object is made by a succession of choices, and the order in which the choices are made does not matter. Let $A$ be the set of ordered objects and let $B$ be the set of unordered objects. If there exists an $m$-to-$1$ function $f$ from $A$ to $B$, we can count the number of ordered objects (pretending that the order matters) and divide by $m$, the number of ordered objects per unordered object, to obtain $\lvert B\rvert=\lvert A\rvert/m$.

The rule assumes that the number of ordered objects is the same for every unordered object, and it cannot be applied otherwise. The function $f$ simply places the ordered outcomes into bins corresponding to the unordered outcomes. In the poker example, $f$ maps $5!$ elements of the domain (the ordered $5$-card outcomes) to each element of the range (the $5$-element subsets of $S$), so the range has $\frac{52!}{47!\,5!}$ elements.

This problem is sometimes called **nOnR**, meaning "no, we don't care about Order, and we also don't allow Replacement."

---

## 3. Sampling with Replacement (yOyR, nOyR)

Sometimes, after we choose an element from $S=\{1,2,\ldots,n\}$, we throw it back into $S$ so that it can be chosen again. Suppose we still pick $k$ elements one at a time and order matters. By the First Rule of Counting, there are $n$ choices in each trial, so $n_1=n_2=\cdots=n_k=n$ and the total number of sequences is $n^k$.

This is called **sampling with replacement**, since multiple trials can have the same outcome. It is sometimes called **yOyR**, meaning "yes, we care about Order, and yes, we allow Replacement." Card dealing, by contrast, is sampling without replacement, since one card cannot be dealt twice.

### Coin Tosses

How many outcomes are there if we toss a coin $k$ times? An outcome is a length-$k$ sequence of heads and tails. Represent each outcome by a binary string of length $k$, where $0$ is a tail ($T$) and $1$ is a head ($H$). For example, $001$ represents two tails followed by a head.

For $k=3$, the source draws a binary tree whose leaves are in one-to-one correspondence with the outcomes $000,001,010,011,100,101,110,111$. Here $S=\{0,1\}$, the sampling is with replacement, and order matters (the strings $001$ and $010$ are different outcomes). By the First Rule of Counting there are $n^k=2^k$ distinct outcomes, since $n=2$.

### Rolling Dice

Roll two dice, so $k=2$ and $S=\{1,2,3,4,5,6\}$. Order matters, since a $1$ on the first die and a $2$ on the second differs from a $2$ on the first and a $1$ on the second, and we are sampling with replacement, since both dice can show the same result. This is the same setting as coin flipping, so the number of distinct outcomes is $n^2=6^2=36$.

### Sampling with Replacement, but Order Does Not Matter (nOyR)

Say you have unlimited quantities of apples, bananas, and oranges and want to select $5$ pieces of fruit for a fruit salad. Here $S=\{1,2,3\}$, where $1$ represents apples, $2$ bananas, and $3$ oranges, and $k=5$. Order does not matter, since an apple followed by a banana makes the same salad as a banana followed by an apple.

This scenario is trickier. It is tempting to apply the Second Rule of Counting, since order does not matter. Pretending that order matters gives $3^5$ ordered objects. But the number of ordered options per unordered option differs depending on which unordered object we consider. An outcome with $5$ bananas has only one ordered version, whereas $4$ bananas and $1$ apple has $5$ ordered versions ($12222$, $21222$, $22122$, $22212$, $22221$). The Second Rule requires the same $m$ for every unordered object, so it does not apply.

Instead, generalize back to a set $S=\{1,2,\ldots,n\}$ and ask how many **multisets** (sets with repetition) of size $k$ there are. We can model this with binary strings. Assume one bin for each element of $S$, so $n$ bins in total. If we selected $2$ apples and $1$ banana, bin $1$ holds $2$ elements and bin $2$ holds $1$. We do not care about the order of the bins themselves, only how many of the $k$ elements each bin contains.

Represent each of the $k$ elements by a $0$ in a binary string, and each separation between bins by a $1$. For example, with $n=5$ bins and $k=4$ elements, the string $00110110$ places two elements in bin $1$, none in bin $2$, one in bin $3$, none in bin $4$, and one in bin $5$. Counting multisets is now equivalent to counting the placements of the $k$ zeros. The string has length $k+n-1$, because there are $k$ zeros and $n-1$ separators, and we choose which $k$ positions hold zeros. No position can be chosen twice, and choosing position $1$ then position $2$ is the same as choosing position $2$ then position $1$, so this is $k$ elements picked from $k+n-1$ without replacement and without order:

$$
\binom{n+k-1}{k}.
$$

This is the number of multisets of size $k$ from $S$. For the fruit salad, the number of ways to pick $5$ pieces of fruit is

$$
\binom{3+5-1}{5}=\binom{7}{5}.
$$

This problem is sometimes called **nOyR**, meaning "no, we don't care about Order, but yes, we allow Replacement." Notice that nOnR and nOyR use the same choose function, albeit with $\binom{n}{k}$ versus $\binom{n+k-1}{k}$.

### The Zeroth Rule of Counting

> [!important] Zeroth Rule of Counting
> If a set $A$ can be placed into a one-to-one correspondence with a set $B$, i.e., there is a bijection between the two (an invertible pair of maps taking elements of $A$ to elements of $B$ and vice versa), then $\lvert A\rvert=\lvert B\rvert$.

This is the very heart of what it means to count, and it is key to many combinatorial arguments. The fruit-salad solution is an example: a seemingly different problem became a question about binary strings by viewing it from a different perspective.

---

## 4. Combinatorial Proofs

Combinatorial proofs rely on intuitive counting arguments rather than tedious algebraic manipulation. They often feel like proofs by stories, the same story told from multiple points of view. As a warm-up, we prove the Binomial Theorem by counting.

### Theorem 15.1 — The Binomial Theorem

For all $n\in\mathbb{N}$,

$$
(a+b)^n=\sum_{k=0}^{n}\binom{n}{k}a^kb^{n-k}.
$$

#### Proof

The left-hand side is the $n$-fold product $(a+b)(a+b)\cdots(a+b)$. Label the $n$ factors $f_1,f_2,\ldots,f_n$. Expanding the product yields a sum over $2^n$ monomials, and to each monomial every factor $f_i$ contributes either an $a$ or a $b$. For example, in $(a+b)(a+b)=a^2+ab+ba+b^2$, the term $a^2$ multiplies the $a$ from $f_1$ and the $a$ from $f_2$, the term $ab$ multiplies the $a$ from $f_1$ and the $b$ from $f_2$, and so on.

In general, the monomial $a^kb^{n-k}$ is obtained when $k$ copies of $a$ and $n-k$ copies of $b$ are multiplied. There are exactly $\binom{n}{k}$ ways to choose which $k$ of the $n$ factors contribute an $a$ and which $n-k$ contribute a $b$. Summing over $k=0,\ldots,n$ gives the theorem.

#### Corollary 15.1

For all $n\in\mathbb{N}$,

$$
\sum_{k=0}^{n}(-1)^k\binom{n}{k}=0.
$$

*Proof.* Set $a=-1$ and $b=1$ in Theorem 15.1.

> [!warning] Edge case at n = 0
> As stated in the source, the corollary is for all $n\in\mathbb{N}$, and this course's $\mathbb{N}$ includes $0$. At $n=0$ the sum is the single term $(-1)^0\binom{0}{0}=1$, not $0$, because the substitution gives $(-1+1)^0=0^0=1$. The identity holds for $n\ge1$.

The key idea in the more sophisticated combinatorial proofs below is to show that the two sides of an equation count the same kind of objects in two different ways. In more advanced settings the goal is to establish a bijection between the objects counted on the left-hand side and those counted on the right-hand side.

### Combinatorial Identities (Bonus Content)

> [!info] Bonus content
> This part of the notes is bonus content and will not be tested.

Combinatorial arguments can prove facts such as the **hockey-stick identity**:

$$
\binom{n}{k+1}=\binom{n-1}{k}+\binom{n-2}{k}+\cdots+\binom{k}{k}.\tag{1}
$$

You can verify this algebraically, but you can also interpret each side as a combinatorial process. The left-hand side is the number of ways of choosing a subset $X$ with $k+1$ elements from $S=\{1,\ldots,n\}$.

Now construct such a subset a different way, by first picking its lowest-numbered element. If that element is $1$, we must choose the remaining $k$ elements from the $n-1$ elements of $S$ greater than $1$, which can be done in $\binom{n-1}{k}$ ways. If the lowest-numbered element is $2$, we choose the remaining $k$ elements from the $n-2$ elements greater than $2$, in $\binom{n-2}{k}$ ways. These subsets are all distinct from those whose lowest element was $1$, so the counts add. Splitting into cases according to the lowest-numbered element selected gives:

| First element selected | Remaining ways |
|---|---|
| element $1$ | $\binom{n-1}{k}$ |
| element $2$ | $\binom{n-2}{k}$ |
| element $3$ | $\binom{n-3}{k}$ |
| $\vdots$ | $\vdots$ |
| element $n-k$ | $\binom{k}{k}$ |

These factors are the terms on the right-hand side of (1). The lowest-numbered element cannot be higher than $n-k$, since we must select $k+1$ distinct elements.

Another identity is

$$
\binom{n}{0}+\binom{n}{1}+\cdots+\binom{n}{n}=2^n.\tag{2}
$$

This follows immediately from setting $a=b=1$ in the Binomial Theorem, but there is a more direct combinatorial proof. Let $S$ have $n$ distinct elements. On the left-hand side, $\binom{n}{i}$ counts the subsets of $S$ of size exactly $i$, so the sum counts all subsets of any size. The right-hand side counts the same thing: identify a subset with an $n$-bit vector that has a $1$ in position $j$ if the $j$-th element is in the subset and a $0$ otherwise. The number of subsets equals the number of $n$-bit vectors, which is $2^n$, since each bit has $2$ options.

For $S=\{1,2,3\}$ the $2^3=8$ subsets and their bit vectors are:

| Subset | $\varnothing$ | $\{1\}$ | $\{2\}$ | $\{3\}$ | $\{1,2\}$ | $\{1,3\}$ | $\{2,3\}$ | $\{1,2,3\}$ |
|---|---|---|---|---|---|---|---|---|
| Bit vector | $(0,0,0)$ | $(1,0,0)$ | $(0,1,0)$ | $(0,0,1)$ | $(1,1,0)$ | $(1,0,1)$ | $(0,1,1)$ | $(1,1,1)$ |

On the left-hand side of (2), $\binom{3}{0}=1$ counts the empty set, $\binom{3}{1}=3$ and $\binom{3}{2}=3$ count the subsets of size $1$ and $2$, and $\binom{3}{3}=1$ counts $S$ itself. Summing gives $1+3+3+1=8$, as expected.

### Permutations and Derangements (Bonus Content)

> [!info] Bonus content
> This content is bonus and will not be tested. The course will return to the experiment described here.

Suppose we collect the homeworks of $n$ students, randomly shuffle them, and return them to the students. If we repeated this experiment many times, on average how many students would receive their own homework? The source defers the answer to a few lines of later probability theory, and for now translates the question into a mathematical statement and a related counting problem.

Label the homeworks $1,2,\ldots,n$ and let $\pi_i$ denote the homework returned to the $i$-th student. The vector $\pi=(\pi_1,\ldots,\pi_n)$ is a **permutation** of $\{1,\ldots,n\}$: the $\pi_i$ are all distinct, so each element appears exactly once, and there are $n!$ permutations in total. The $i$-th student receives their own homework if and only if $\pi_i=i$. Such indices are the **fixed points** of $\pi$. Table 1 lists all $3!=6$ permutations of $\{1,2,3\}$ with their numbers of fixed points.

| $(\pi_1,\pi_2,\pi_3)$ | Number of fixed points |
|---|---|
| $(1,2,3)$ | $3$ |
| $(1,3,2)$ | $1$ |
| $(2,1,3)$ | $1$ |
| $(2,3,1)$ | $0$ |
| $(3,1,2)$ | $0$ |
| $(3,2,1)$ | $1$ |

#### Definition 15.1 — Derangement

A permutation with no fixed points is called a **derangement**.

Let $D_n$ denote the number of derangements of $\{1,2,\ldots,n\}$. From Table 1, $D_3=2$: the derangements are $(2,3,1)$ and $(3,1,2)$. The goal is a formula for $D_n$ for all $n\in\mathbb{Z}^+$. The source gives two ways to solve this; the first is a combinatorial proof.

For $n=4$, the nine derangements of $\{1,2,3,4\}$ are:

| $\pi_1$ | $\pi_2$ | $\pi_3$ | $\pi_4$ |
|---|---|---|---|
| $\mathbf{2}$ | $\mathbf{1}$ | $4$ | $3$ |
| $\mathbf{2}$ | $\mathbf{4}$ | $\mathbf{1}$ | $3$ |
| $\mathbf{4}$ | $\mathbf{1}$ | $\mathbf{2}$ | $3$ |
| $4$ | $3$ | $2$ | $1$ |
| $3$ | $4$ | $2$ | $1$ |
| $2$ | $3$ | $4$ | $1$ |
| $3$ | $4$ | $1$ | $2$ |
| $4$ | $3$ | $1$ | $2$ |
| $3$ | $1$ | $4$ | $2$ |

In the source, the bold entries of the first row correspond to a derangement of $\{1,2\}$, and the bold entries of the second and third rows are in one-to-one correspondence with the derangements $(2,3,1)$ and $(3,1,2)$ of $\{1,2,3\}$. The bold $4$ in the $n=4$ list satisfies the same constraint as the $3$ in the $n=3$ list: $\pi_3\ne4$ in the former and $\pi_3\ne3$ in the latter. So $D_4$ is related to $D_2$ and $D_3$, and the following theorem formalizes the relationship.

#### Theorem 15.2 — The Derangement Recursion

For an arbitrary positive integer $n\ge3$, the number $D_n$ of derangements of $\{1,\ldots,n\}$ satisfies

$$
D_n=(n-1)(D_{n-1}+D_{n-2}).\tag{3}
$$

##### Proof

This is a combinatorial proof by establishing relevant bijections. In a derangement $(\pi_1,\ldots,\pi_n)$, suppose $\pi_n=j\in\{1,\ldots,n-1\}$, i.e., $j$ is what $n$ maps to. There are $n-1$ choices for $j$, which gives the multiplicative factor $(n-1)$ in (3). The case $j=n$ is excluded, since a derangement cannot have $\pi_n=n$. For a given $j$ there are two cases:

- **Case 1:** If $\pi_j=n$, then $j$ and $n$ get swapped, and the derangements of the remaining elements are in one-to-one correspondence with the derangements of $\{1,\ldots,n-2\}$. This gives rise to $D_{n-2}$.
- **Case 2:** If $\pi_j\ne n$, then $n$ satisfies the same constraint as $j$, so the derangements of $\{1,\ldots,j-1,j+1,\ldots,n\}$ are in one-to-one correspondence with the derangements of $\{1,\ldots,n-1\}$. This gives rise to $D_{n-1}$.

This completes the derivation of (3).

Together with the boundary conditions $D_1=0$ and $D_2=1$, the recursion (3) and memoization determine $D_n$ in linear time in $n$. The recursion can also be solved analytically to give the explicit formula

$$
D_n=n!\sum_{k=0}^{n}\frac{(-1)^k}{k!}.\tag{4}
$$

Coming up with the recursion (3) and solving it require some creativity.


---

$$
\boxed{\text{probability}=\frac{\text{number of boards where first is 3 and second is 5}}{\text{number of possible boards}}}
$$