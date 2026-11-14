---
title: CS 70 Note 19 — Random Variables, Distribution and Expectation
Content Type: Course Notes
Content Area: Probability
description: "Defines random variables, their distributions, and expectation, with the tail sum formula. Covers the Bernoulli, binomial, uniform, and geometric distributions, including the memoryless property and the expectation of a geometric random variable."
Course: CS 70
pinned: false
Date Published: November 07, 2026
Last Updated: November 07, 2026
Status: Finalized
---

# CS 70 Note 19 — Random Variables: Distribution and Expectation
**Previous note:** [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events|Note 18 — Inclusion-Exclusion and Combinations of Events]]. **Next note:** [[cs70/Course Notes/N20 Random Variables II - Linearity of Expectation|Note 20 — Random Variables II, Linearity of Expectation]].

This note formalizes a **random variable** as a function on a sample space, defines its **distribution** and its **expectation**, and develops the **Bernoulli**, **binomial**, **uniform**, and **geometric** distributions. It closes with the **tail sum formula** and a proof that a geometric random variable with parameter $p$ has expectation $\frac{1}{p}$.

Recall our setup of a probabilistic experiment as a procedure of drawing a sample from a set of possible values, and assigning a probability for each possible outcome of the experiment. For example, if we toss a fair coin $n$ times, then there are $2^n$ possible outcomes, each of which is equally likely and has probability $\frac{1}{2^n}$.

Now suppose we want to make a measurement in our experiment. For example, we can ask what is the number of heads in $n$ coin tosses; call this number $X$. Of course, $X$ is not a fixed number, but it depends on the actual sequence of coin flips that we obtain. For example, if $n=4$ and we observe the outcome $\omega=HTHH$, then $X=3$, whereas if we observe the outcome $\omega=HTHT$, then $X=2$. In this example of $n$ coin tosses, we only know that $X$ is an integer between $0$ and $n$, but we do not know what its exact value is until we observe which outcome of $n$ coin flips is realized and count how many heads there are. Because every possible outcome is assigned a probability, the value $X$ also carries with it a probability for each possible value it can take. The table below lists all the possible values $X$ can take in the example of $n=4$ coin tosses, along with their respective probabilities.

| outcomes $\omega$                    | value of $X$ (# heads) | probability of occurring |
| ------------------------------------ | ---------------------- | ------------------------ |
| $TTTT$                               | 0                      | 1/16                     |
| $HTTT, THTT, TTHT, TTTH$             | 1                      | 4/16                     |
| $HHTT, HTHT, HTTH, THHT, THTH, TTHH$ | 2                      | 6/16                     |
| $HHHT, HHTH, HTHH, THHH$             | 3                      | 4/16                     |
| $HHHH$                               | 4                      | 1/16                     |

Such a value $X$ that depends on the outcome of the probabilistic experiment is called a **random variable** (abbreviated r.v.). As we see from the example above, a random variable $X$ typically does not have a definitive value, but instead only has a probability **distribution** over the set of possible values $X$ can take, which is why it is called random. So the question "What is the number of heads in $n$ coin tosses?" does not exactly make sense because the answer $X$ is a random variable. But the question "What is the *typical* number of heads in $n$ coin tosses?" makes sense: it is asking what is the average value of $X$ (the number of heads) if we repeat the experiment of tossing $n$ coins multiple times. This average value is called the **expectation** of $X$, and is one of the most useful summaries (also called *statistics*) of an experiment.

---

## 1. Random Variables

Before we formalize the above notions, let us consider another example to reinforce our conceptual understanding of a random variable.

### Example: Fixed Points of Permutations

**Question:** Suppose we collect the homeworks of $n$ students, randomly shuffle them, and return them to the students. How many students receive their own homework?

Here the probability space consists of all $n!$ permutations of the homeworks, each with equal probability $\frac{1}{n!}$. If we label the homeworks as $1,2,\ldots,n$, then each sample point is a permutation $\pi=(\pi_1,\ldots,\pi_n)$ where $\pi_i$ is the homework that is returned to the $i$th student. We call $i$ a **fixed point** of $\pi$ if $\pi_i=i$, i.e., if student $i$ receives their own homework.

As in the coin flipping case above, our question does not have a simple numerical answer (such as $4$), because the number depends on the particular permutation we choose (i.e., on the sample point). Let us call the number of fixed points $X_n$, which is a random variable taking values in the set $\{0,1,2,\ldots,n\}$. (Actually the value $X_n=n-1$ is not possible: why?)

### Formal Definition of a Random Variable

We now formalize the concepts discussed above.

#### Definition 19.1 — Random Variable

A **random variable** $X$ on a sample space $\Omega$ is a function $X:\Omega\to\mathbb{R}$ that assigns to each sample point $\omega\in\Omega$ a real number $X(\omega)$.

Until further notice, we will restrict our attention to random variables that are **discrete**, i.e., they take values in a range that is finite or countably infinite. This means that even though we define $X$ to map $\Omega$ to $\mathbb{R}$, the actual set of values $\{X(\omega):\omega\in\Omega\}$ that $X$ takes is a discrete subset of $\mathbb{R}$.

A random variable can be visualized in general as a picture in which each sample point in $\Omega$ is sent by $X$ to a point on the real line. Note that the term "random variable" is really something of a misnomer: it is a function so there is nothing random about it and it is definitely not a variable! What is random is which sample point of the experiment is realized and hence the value that the random variable maps the sample point to.

For the permutation example with $n=3$, the sample space is $\{123,132,213,231,312,321\}$ and $X_3$ maps each permutation to its number of fixed points.

> [!note] Exercise
> By completing the picture of how $X_3$ maps the six permutations to the real line, show that the only possible values for the r.v. $X_3$ are $0$, $1$, and $3$, and that their probabilities are $\frac{1}{3}$, $\frac{1}{2}$, and $\frac{1}{6}$, respectively.

---

## 2. Probability Distribution

When we introduced the basic probability space in an earlier note, we defined two things:

1. The sample space $\Omega$ consisting of all the possible outcomes (sample points) of the experiment.
2. The probability of each of the sample points.

Analogously, there are two important things about any random variable:

1. The set of values that it can take.
2. The probabilities with which it takes on the values.

Since a random variable is defined on a probability space, we can calculate these probabilities given the probabilities of the sample points. Let $a$ be any number in the range of a random variable $X$. Then the set

$$
\{\omega\in\Omega:X(\omega)=a\}
$$

is an *event* in the sample space (because it is a subset of $\Omega$). We usually abbreviate this event to simply "$X=a$". Since $X=a$ is an event, we can talk about its probability, $\mathbb{P}[X=a]$. The collection of these probabilities, for all possible values of $a$, is known as the *distribution* of the random variable $X$.

#### Definition 19.2 — Distribution

The **distribution** of a discrete random variable $X$ is the collection of values $\{(a,\mathbb{P}[X=a]):a\in\mathcal{A}\}$, where $\mathcal{A}$ is the set of all possible values taken by $X$.

Thus, the distribution of the random variable $X_3$ in our permutation example above is:

$$
\mathbb{P}[X=0]=\frac{1}{3};\qquad\mathbb{P}[X=1]=\frac{1}{2};\qquad\mathbb{P}[X=3]=\frac{1}{6}.
$$

If needed, we may also write $\mathbb{P}[X=a]=0$ for all other values of $a$.

The distribution of a random variable can be visualized as a bar diagram. The $x$-axis represents the values that the random variable can assume. The height of the bar at a value $a$ is the probability $\mathbb{P}[X=a]$. Each of these probabilities can be computed by looking at the probability of the corresponding event in the sample space. For the permutation example, the events $X=a$ partition the sample space as follows.

| Value $a$ | Event $X=a$ | $\mathbb{P}[X=a]$ |
|---|---|---|
| 0 | $\{231,312\}$ | $\frac{1}{3}$ |
| 1 | $\{132,213,321\}$ | $\frac{1}{2}$ |
| 3 | $\{123\}$ | $\frac{1}{6}$ |

Note that the collection of events $X=a$, for $a\in\mathcal{A}$, satisfy two important properties:

- Any two events $X=a_1$ and $X=a_2$ with $a_1\neq a_2$ are disjoint.
- The union of all these events is equal to the entire sample space $\Omega$.

The collection of events thus form a **partition** of the sample space. Both properties follow directly from the fact that $X$ is a function defined on $\Omega$, i.e., $X$ assigns a unique value to each and every possible sample point in $\Omega$. So, when we sum the probabilities of the events $X=a$, we are really summing up the probabilities of all the sample points, giving us a total of exactly $1$.

---

## 3. Expectation

The distribution of a r.v. contains *all* the information about the r.v. In most applications, however, the complete distribution of a r.v. is very hard to calculate. For example, consider the homework permutation example with $n=20$. In principle, we would have to enumerate $20!\approx2.4\times10^{18}$ sample points, compute the value of $X$ at each one, and count the number of points at which $X$ takes on each of its possible values (though in practice we could streamline this calculation a bit). Moreover, even when we can compute the complete distribution of a r.v., it is often not very informative.

For these reasons, we seek to *summarize* the distribution into a more compact, convenient form that is also easier to compute. The most widely used such form is the **expectation** (or **mean** or **average**) of the r.v.

#### Definition 19.3 — Expectation

The **expectation** of a discrete random variable $X$ is defined as

$$
\mathbb{E}[X]=\sum_{a\in\mathcal{A}}a\times\mathbb{P}[X=a],\tag{1}
$$

where the sum is over all possible values taken by the r.v.

> [!warning] Technical Note: expectation must converge absolutely
> Expectation is well defined provided that the sum on the right-hand side of (1) is absolutely convergent, i.e., $\sum_{a\in\mathcal{A}}|a|\times\mathbb{P}[X=a]<\infty$. There are discrete random variables for which expectations do not exist, such as the r.v. $X$ with distribution $\mathbb{P}[X=i]=\frac{6}{\pi^2i^2}$ for all positive integers $i$. (The factor $\frac{6}{\pi^2}$ here is to make the probabilities sum to $1$, since $\sum_{i=1}^{\infty}\frac{1}{i^2}=\frac{\pi^2}{6}$.)

For our simpler permutation example with only $3$ students, the expectation is

$$
\mathbb{E}[X]=\left(0\times\frac{1}{3}\right)+\left(1\times\frac{1}{2}\right)+\left(3\times\frac{1}{6}\right)=0+\frac{1}{2}+\frac{1}{2}=1.
$$

That is, the expected number of fixed points in a permutation of three items is exactly $1$.

The expectation can be seen in some sense as a "typical" value of the r.v. (though note that $\mathbb{E}[X]$ may not actually be a value that $X$ can take). The question of how typical the expectation is for a given r.v. is a very important one that we shall return to in a later lecture.

Here is a physical interpretation of the expectation of a random variable: imagine carving out a wooden cutout figure of the probability distribution (a bar diagram of the distribution). Then the expected value of the distribution is the **balance point** (directly below the center of gravity) of this object.

### Examples

#### 1. Single die

Throw a fair die once and let $X$ be the number that comes up. Then $X$ takes on values $1,2,\ldots,6$ each with probability $\frac{1}{6}$, so

$$
\mathbb{E}[X]=\frac{1}{6}(1+2+3+4+5+6)=\frac{21}{6}=\frac{7}{2}.
$$

Note that $X$ never actually takes on its expected value $\frac{7}{2}$.

#### 2. Two dice

Throw two fair dice and let $X$ be the sum of their scores. Then the distribution of $X$ is

| $a$ | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| $\mathbb{P}[X=a]$ | $\frac{1}{36}$ | $\frac{1}{18}$ | $\frac{1}{12}$ | $\frac{1}{9}$ | $\frac{5}{36}$ | $\frac{1}{6}$ | $\frac{5}{36}$ | $\frac{1}{9}$ | $\frac{1}{12}$ | $\frac{1}{18}$ | $\frac{1}{36}$ |

The expectation is therefore

$$
\mathbb{E}[X]=\left(2\times\frac{1}{36}\right)+\left(3\times\frac{1}{18}\right)+\left(4\times\frac{1}{12}\right)+\cdots+\left(12\times\frac{1}{36}\right)=7.
$$

#### 3. Roulette

A roulette wheel is spun (recall that a roulette wheel has $38$ slots: the numbers $1,2,\ldots,36$, half of which are red and half black, plus $0$ and $00$, which are green). You bet $\$1$ on Black. If a black number comes up, you receive your stake plus $\$1$; otherwise you lose your stake. Let $X$ be your net winnings in one game. Then $X$ can take on the values $+1$ and $-1$, and $\mathbb{P}[X=1]=\frac{18}{38}$, $\mathbb{P}[X=-1]=\frac{20}{38}$. Thus,

$$
\mathbb{E}[X]=\left(1\times\frac{18}{38}\right)+\left(-1\times\frac{20}{38}\right)=-\frac{1}{19};
$$

i.e., you expect to lose about a nickel per game. Notice how the zeros tip the balance in favor of the casino!

---

## 4. Bernoulli Distribution

A simple yet very useful probability distribution is the **Bernoulli** distribution of a random variable which takes value in $\{0,1\}$:

$$
\mathbb{P}[X=i]=\begin{cases}p, & \text{if }i=1,\\1-p, & \text{if }i=0,\end{cases}
$$

where $0\leq p\leq1$. We say that $X$ is distributed as a Bernoulli random variable with parameter $p$, and write

$$
X\sim\text{Bernoulli}(p)\qquad\text{or}\qquad X\sim\text{Ber}(p).
$$

---

## 5. Binomial Distribution

Let us return to our coin tossing example above, where we defined our random variable $X$ to be the number of heads. More formally, consider the random experiment consisting of $n$ independent tosses of a biased coin which shows $H$ with probability $p$. A sample point $\omega$ is a sequence of tosses, and $X(\omega)$ is defined to be the number of heads in $\omega$. For example, when $n=3$, $X(THH)=2$.

To compute the distribution of $X$, we first enumerate the possible values that $X$ can take. They are simply $0,1,\ldots,n$. Then we compute the probability of each event $X=i$ for $i=0,1,\ldots,n$. The probability of the event $X=i$ is the sum of the probabilities of all the sample points with exactly $i$ heads (for example, if $n=3$ and $i=2$, there would be three such sample points $\{HHT,HTH,THH\}$). Any such sample point has probability $p^i(1-p)^{n-i}$, since the coin flips are independent. There are exactly $\binom{n}{i}$ of these sample points. Hence,

$$
\mathbb{P}[X=i]=\binom{n}{i}p^i(1-p)^{n-i},\qquad\text{for }i=0,1,\ldots,n.\tag{2}
$$

This distribution, called the **binomial** distribution, is one of the most important distributions in probability. A random variable with this distribution is called a *binomial* random variable, and we write

$$
X\sim\text{Bin}(n,p),
$$

where $n$ denotes the number of trials and $p$ the probability of success (observing an $H$ in the example).

The shape of the distribution depends on the parameters. With $n=9$ and $p=\frac{1}{2}$ the bar diagram is symmetric and bell-shaped, peaking at $a=4$ and $a=5$. With $n$ large and $p$ small the bars are concentrated near $0$ and fall away quickly toward $a=n$.

Notice that due to the properties of $X$ mentioned above, it must be the case that $\sum_{i=0}^{n}\mathbb{P}[X=i]=1$, which implies that $\sum_{i=0}^{n}\binom{n}{i}p^i(1-p)^{n-i}=1$. This provides a probabilistic proof of the Binomial Theorem from an earlier note, for $a=p$ and $b=1-p$.

### Application: Packet Loss

Although we define the binomial distribution in terms of an experiment involving tossing coins, this distribution is useful for modeling many real-world problems. Consider for example the error correction problem studied earlier. Recall that we wanted to encode $n$ packets into $n+k$ packets such that the recipient can reconstruct the original $n$ packets from any $n$ packets received. But in practice, the number of packet losses is random, so how do we choose $k$, the amount of redundancy? If we model each packet getting lost with probability $p$ and the losses are independent, then if we transmit $n+k$ packets, the number of packets received is a random variable $X$ with binomial distribution: $X\sim\text{Bin}(n+k,1-p)$ (we are tossing a coin $n+k$ times, and each coin turns out to be a head, i.e., a packet received, with probability $1-p$). So the probability of successfully decoding the original data is:

$$
\mathbb{P}[X\geq n]=\sum_{i=n}^{n+k}\mathbb{P}[X=i]=\sum_{i=n}^{n+k}\binom{n+k}{i}(1-p)^ip^{n+k-i}.
$$

Given fixed $n$ and $p$, we can choose $k$ such that this probability is no less than, say, $0.99$.

---

## 6. Uniform Distribution

Suppose $X$ is a uniform random variable on the set $\{1,\ldots,n\}$, written $X\sim\text{Uniform}\{1,\ldots,n\}$, so $X$ takes on values $1,\ldots,n$ with equal probability $\frac{1}{n}$. The mean of $X$ is given by:

$$
\mathbb{E}[X]=\frac{n+1}{2}.\tag{3}
$$

---

## 7. Geometric Distribution

Consider repeatedly tossing a biased coin with Heads probability $p$. Let $X$ denote the number of tosses *until the first Head appears*. Then $X$ is a random variable that takes values in $\mathbb{Z}^{+}$, the set of positive integers. The event that $X=i$ is equal to the event of observing Tails for the first $i-1$ tosses and getting Heads in the $i$th toss, which occurs with probability $(1-p)^{i-1}p$. Such a random variable is called a **geometric** random variable. Note that $X$ is unbounded: i.e., for any positive integer $i$ (no matter how large), there is some positive probability that $X=i$.

The geometric distribution frequently occurs in applications because we are often interested in how long we have to wait before a certain event happens: how many runs before the system fails, how many shots before one is on target, how many poll samples before we find a Democrat, how many retransmissions of a packet before successfully reaching the destination, etc.

#### Definition 19.4 — Geometric Distribution

A random variable $X$ for which

$$
\mathbb{P}[X=i]=(1-p)^{i-1}p,\qquad\text{for }i=1,2,3,\ldots,
$$

is said to have the **geometric distribution with parameter $p$**. This is abbreviated as $X\sim\text{Geometric}(p)$ or $X\sim\text{Geom}(p)$.

As a quick check, we can verify that the total probability of $X$ is equal to $1$:

$$
\sum_{i=1}^{\infty}\mathbb{P}[X=i]=\sum_{i=1}^{\infty}(1-p)^{i-1}p=p\sum_{i=1}^{\infty}(1-p)^{i-1}=p\times\frac{1}{1-(1-p)}=1,
$$

where in the second-to-last step we have used the formula for the sum of a geometric series.

If we plot the distribution of $X$ (i.e., the values $\mathbb{P}[X=i]$ against $i$) we get a curve that decreases monotonically by a factor of $1-p$ at each step. For $p=0.1$ the curve starts at $0.1$ and decays slowly; for $p=0.3$ it starts at $0.3$ and decays much faster.

### Memoryless Property

The geometric distribution has a special property called **memorylessness**. (This property is shared by the *exponential distribution*, the continuous analog of the geometric distribution, which we'll cover in a future note. Indeed, these are the *only* two distributions that are memoryless.) To get some intuition for this property, suppose we revisit our earlier motivational example of repeatedly tossing a biased coin with heads probability $p$, and let $X$ denote the number of tosses until the first head appears. Thus $X\sim\text{Geometric}(p)$.

As we've seen, the probability that we need *more than* $n$ tosses before getting the first head is $\mathbb{P}[X>n]=(1-p)^n$, since the first $n$ tosses must all have been tails.

What if we've already tossed the coin $m$ times without getting a head? What is the probability that we need more than $n$ *additional* tosses before getting our first head? We can calculate this probability as:

$$
\begin{aligned}
\mathbb{P}[X>n+m\mid X>m]&=\frac{\mathbb{P}[X>n+m]}{\mathbb{P}[X>m]}\\
&=\frac{(1-p)^{n+m}}{(1-p)^m}\\
&=(1-p)^n\\
&=\mathbb{P}[X>n].
\end{aligned}
$$

This gives us the formal statement of the memoryless property of geometric distributions:

$$
\mathbb{P}[X>n+m\mid X>m]=\mathbb{P}[X>n].
$$

The geometric distribution is memoryless in the sense that the length of time we have already been waiting does not affect the additional time we have to wait until we get our first head. (This, of course, defies the "common wisdom" that if we've tossed a coin ten times and it's come up tails every time, then surely it's more likely to come up heads on the 11th toss!)

---

## 8. Expectation of a Geometric Random Variable

Let us now compute the expectation $\mathbb{E}[X]$. Applying the definition of expected value directly gives us:

$$
\mathbb{E}[X]=\sum_{i=1}^{\infty}i\times\mathbb{P}[X=i]=p\sum_{i=1}^{\infty}i(1-p)^{i-1}.
$$

However, the final summation is a little tricky to evaluate (though it can be done). Instead, we will use the following alternative formula for expectation that simplifies the calculation and is useful in its own right.

### Theorem 19.1 — Tail Sum Formula

Let $X$ be a random variable that takes values in $\{0,1,2,\ldots\}$. Then

$$
\mathbb{E}[X]=\sum_{i=1}^{\infty}\mathbb{P}[X\geq i].
$$

**Proof.** For notational convenience, let's write $p_i=\mathbb{P}[X=i]$, for $i=0,1,2,\ldots$. From the definition of expectation, we have

$$
\begin{aligned}
\mathbb{E}[X]&=(0\times p_0)+(1\times p_1)+(2\times p_2)+(3\times p_3)+(4\times p_4)+\cdots\\
&=p_1+(p_2+p_2)+(p_3+p_3+p_3)+(p_4+p_4+p_4+p_4)+\cdots\\
&=(p_1+p_2+p_3+p_4+\cdots)+(p_2+p_3+p_4+\cdots)+(p_3+p_4+\cdots)+(p_4+\cdots)+\cdots\\
&=\mathbb{P}[X\geq1]+\mathbb{P}[X\geq2]+\mathbb{P}[X\geq3]+\mathbb{P}[X\geq4]+\cdots.
\end{aligned}
$$

In the third line, we have regrouped the terms into convenient infinite sums, and each infinite sum is exactly the probability that $X\geq i$ for each $i$. You should check that you understand how the fourth line follows from the third.

Let us repeat the proof more formally, this time using more compact mathematical notation:

$$
\mathbb{E}[X]=\sum_{j=1}^{\infty}j\times\mathbb{P}[X=j]=\sum_{j=1}^{\infty}\sum_{i=1}^{j}\mathbb{P}[X=j]=\sum_{i=1}^{\infty}\sum_{j=i}^{\infty}\mathbb{P}[X=j]=\sum_{i=1}^{\infty}\mathbb{P}[X\geq i],
$$

where the third equality follows from interchanging the order of summations.

We can now use Theorem 19.1 to compute $\mathbb{E}[X]$ more easily.

### Theorem 19.2 — Expectation of a Geometric Random Variable

For $X\sim\text{Geometric}(p)$, we have $\mathbb{E}[X]=\frac{1}{p}$.

**Proof.** The key observation is that for a geometric random variable $X$,

$$
\mathbb{P}[X\geq i]=(1-p)^{i-1}\qquad\text{for }i=1,2,\ldots.\tag{4}
$$

We can obtain this simply by summing $\mathbb{P}[X=j]$ for $j\geq i$. Another way of seeing this is to note that the event "$X\geq i$" means at least $i$ tosses are required. This is equivalent to saying that the first $i-1$ tosses are all Tails, and the probability of this event is precisely $(1-p)^{i-1}$. Now, plugging (4) into Theorem 19.1, we get

$$
\mathbb{E}[X]=\sum_{i=1}^{\infty}\mathbb{P}[X\geq i]=\sum_{i=1}^{\infty}(1-p)^{i-1}=\frac{1}{1-(1-p)}=\frac{1}{p},
$$

where we have used the formula for geometric series.

> [!important] Expected waiting time for the first Head
> The expected number of tosses of a biased coin until the first Head appears is $\frac{1}{p}$. Thus for a fair coin, the expected number of tosses until the first Head is $2$ (but of course the actual number of tosses can be any positive integer).

---

## 9. Summary

| Distribution | Notation | $\mathbb{P}[X=i]$ | Support | $\mathbb{E}[X]$ |
|---|---|---|---|---|
| Bernoulli | $\text{Ber}(p)$ | $p$ if $i=1$, $1-p$ if $i=0$ | $\{0,1\}$ | $p$ |
| Binomial | $\text{Bin}(n,p)$ | $\binom{n}{i}p^i(1-p)^{n-i}$ | $\{0,1,\ldots,n\}$ | $np$ (shown in Note 20) |
| Uniform | $\text{Uniform}\{1,\ldots,n\}$ | $\frac{1}{n}$ | $\{1,\ldots,n\}$ | $\frac{n+1}{2}$ |
| Geometric | $\text{Geom}(p)$ | $(1-p)^{i-1}p$ | $\{1,2,3,\ldots\}$ | $\frac{1}{p}$ |

