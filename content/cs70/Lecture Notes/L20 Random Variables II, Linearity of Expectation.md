---
title: L20 Random Variables II, Linearity of Expectation
Content Type: Lecture
Content Area:
Course: CS70
description: "The lecture introduced Poisson random variables, derived their probability mass function as a large-trial limit of binomial random variables, and showed how independent Poisson variables combine. It then developed joint and marginal distributions, independence and conditioning for random variables, IID variables, and linearity of expectation with dice and randomized homework examples."
pinned: false
Date Published: November 5, 2026
Last Updated: November 5, 2026
Status: Finalized
---

# L20 Random Variables II, Linearity of Expectation

## Executive Summary

This lecture continued the study of random variables through three main topics:

- Poisson random variables model the number of events occurring per unit time when an average event rate is known and disjoint time intervals behave independently.
- Joint distributions describe multiple random variables on the same sample space. Marginalization recovers the distribution of one variable, while independence, conditional probability, mutual independence, and identical distribution extend familiar event concepts to random variables.
- Linearity of expectation allows the expectation of a sum to be computed from the expectations of its components, even when the random variables are not independent. Indicator variables make this especially useful in counting expected occurrences.

The lecture also derived the Poisson probability formula from a binomial model, proved that the sum of two independent Poisson random variables is Poisson, and derived linearity of expectation from the sample-space definition of expectation.

---

## Poisson Random Variables

Binomial and Bernoulli random variables describe repeated trials. A Poisson random variable instead models the number of events occurring during a unit of time.

As a motivating example, let $X$ be the number of alpha-particle emissions from a radiation source per unit time. The same model can describe the number of buses arriving at a bus stop during an hour or the number of phone calls received during a minute.

The lecture gave two central assumptions for the model:

- The average number of events per unit time is known. This average is denoted by $\lambda$.
- Counts in disjoint time intervals behave independently. For example, knowing the number of events from $0$ to $2$ minutes gives no information about the number from $2$ to $4$ minutes.

Under these assumptions, $X$ is modeled as a Poisson random variable with parameter $\lambda$:

$$
X \sim \operatorname{Poisson}(\lambda).
$$

Its probability mass function is

$$
\Pr(X=i)=\frac{\lambda^i}{i!}e^{-\lambda}.
$$

Here, $i$ is the particular event count being requested, while $\lambda$ is the average count per unit time.

The expected value is particularly simple:

$$
\mathbb{E}[X]=\lambda.
$$

This agrees with the interpretation of $\lambda$ as the average number of events in one time unit.

### Example: Three Emissions in One Minute

Suppose a radiation source is modeled by

$$
X\sim \operatorname{Poisson}(2),
$$

meaning that it produces an average of two emissions per minute. To find the probability of exactly three emissions in a minute, substitute $i=3$ and $\lambda=2$:

$$
\Pr(X=3)
=
\frac{2^3}{3!}e^{-2}.
$$

The lecture evaluated this as approximately

$$
\Pr(X=3)\approx 18.04\%.
$$

The value $3$ describes the event count of interest, while the value $2$ is the model's average rate.

### Adding Independent Poisson Random Variables

The lecture stated that if

$$
X_1\sim\operatorname{Poisson}(\lambda_1)
\qquad\text{and}\qquad
X_2\sim\operatorname{Poisson}(\lambda_2)
$$

are independent, then their sum is another Poisson random variable:

$$
X_1+X_2\sim\operatorname{Poisson}(\lambda_1+\lambda_2).
$$

The sum represents the total number of events contributed by the two sources during the same time interval.

For example, suppose one source averages two emissions per minute and another averages five:

$$
X_1\sim\operatorname{Poisson}(2),
\qquad
X_2\sim\operatorname{Poisson}(5).
$$

Then

$$
X_1+X_2\sim\operatorname{Poisson}(7).
$$

Therefore, the probability of four total emissions in a minute is

$$
\Pr(X_1+X_2=4)
=
\frac{7^4}{4!}e^{-7}.
$$

The lecture evaluated this probability as approximately $9.1\%$.

### Changing the Time Unit

Suppose the event rate is two emissions per minute, but the question asks for the probability of exactly $100$ emissions during an hour.

Because an hour contains $60$ minutes, the average count over one hour is

$$
60\cdot 2=120.
$$

Thus, if $Y$ counts emissions during an hour, then

$$
Y\sim\operatorname{Poisson}(120).
$$

The desired probability is

$$
\Pr(Y=100)
=
\frac{120^{100}}{100!}e^{-120}.
$$

The lecture reported this as approximately $2.68\%$.

A second interpretation reaches the same model. Let $X_j$ count emissions during minute $j$. The hour-long count is

$$
S=X_1+X_2+\cdots+X_{60}.
$$

Each minute contributes an independent $\operatorname{Poisson}(2)$ count, so adding the parameters gives

$$
S\sim\operatorname{Poisson}(60\cdot 2)
=
\operatorname{Poisson}(120).
$$

The lecture cautioned against trying to convert the requested count of $100$ emissions per hour into $100/60$ emissions per minute. A Poisson random variable counts events and therefore takes integer values, while $100/60$ is not an integer event count. Instead, the parameter should be scaled to the time interval used by the requested count.

---

## Deriving the Poisson Distribution from a Binomial Model

The lecture motivated the Poisson distribution as a large-$n$ limit of binomial random variables.

Suppose a rural phone network receives an average of four calls per minute. Divide a minute into smaller time intervals. For an initial model, the minute might be divided into $60$ one-second intervals. Each interval becomes a trial:

- A success means a call begins in that interval.
- A failure means no call begins in that interval.

If the average number of calls per minute is $\lambda$, dividing the minute into $n$ intervals gives the binomial model

$$
X_n\sim\operatorname{Binomial}\left(n,\frac{\lambda}{n}\right).
$$

This choice preserves the mean because the lecture used the binomial fact

$$
\mathbb{E}[X_n]=np.
$$

With $p=\lambda/n$,

$$
\mathbb{E}[X_n]
=
n\frac{\lambda}{n}
=
\lambda.
$$

### Why the Intervals Must Become Small

A coarse division can miss multiple events in the same interval. For example, if two calls begin at times $3.3$ and $3.8$ seconds, both occur in the same one-second interval. A Bernoulli trial for that interval records only whether at least one call occurred, so it cannot accurately count both calls.

The proposed remedy is to use more, shorter intervals. As $n$ grows, the intervals become smaller, making it less likely that multiple events occupy the same interval. The Poisson distribution arises by taking the limit as $n\to\infty$.

### Large-$n$ Limit of the Binomial Probability

For

$$
X_n\sim\operatorname{Binomial}\left(n,\frac{\lambda}{n}\right),
$$

the probability of exactly $i$ events is

$$
\Pr(X_n=i)
=
\binom{n}{i}
\left(\frac{\lambda}{n}\right)^i
\left(1-\frac{\lambda}{n}\right)^{n-i}.
$$

Each factor has a counting interpretation:

- $\binom{n}{i}$ chooses which $i$ of the $n$ intervals contain successes.
- $(\lambda/n)^i$ supplies the success probabilities for those $i$ intervals.
- $(1-\lambda/n)^{n-i}$ ensures that the remaining $n-i$ intervals are failures.

Expanding the binomial coefficient gives

$$
\Pr(X_n=i)
=
\frac{n!}{i!(n-i)!}
\frac{\lambda^i}{n^i}
\left(1-\frac{\lambda}{n}\right)^{n-i}.
$$

The lecture rearranged this expression to isolate terms whose limits are easy to recognize:

$$
\Pr(X_n=i)
=
\frac{\lambda^i}{i!}
\left(
\frac{n!}{(n-i)!n^i}
\right)
\left(1-\frac{\lambda}{n}\right)^n
\left(1-\frac{\lambda}{n}\right)^{-i}.
$$

The factorial ratio can be written as

$$
\frac{n!}{(n-i)!n^i}
=
\frac{n(n-1)\cdots(n-i+1)}{n^i}.
$$

There are $i$ factors in both the numerator and denominator. For fixed $i$, the lecture argued that this ratio approaches $1$ as $n\to\infty$:

$$
\lim_{n\to\infty}
\frac{n!}{(n-i)!n^i}
=
1.
$$

The remaining limits used in the derivation are

$$
\lim_{n\to\infty}
\left(1-\frac{\lambda}{n}\right)^n
=
e^{-\lambda}
$$

and, because $\lambda/n\to 0$ for fixed $i$,

$$
\lim_{n\to\infty}
\left(1-\frac{\lambda}{n}\right)^{-i}
=
1.
$$

Combining these pieces yields

$$
\begin{aligned}
\lim_{n\to\infty}\Pr(X_n=i)
&=
\frac{\lambda^i}{i!}
\cdot 1
\cdot e^{-\lambda}
\cdot 1\\
&=
\frac{\lambda^i}{i!}e^{-\lambda}.
\end{aligned}
$$

This is the Poisson probability mass function. The resulting interpretation is that the Poisson model is obtained by dividing time into increasingly short Bernoulli trials while keeping the average number of events equal to $\lambda$.

---

## Joint Distributions

Multiple random variables can be defined on the same sample space.

For three coin flips, the lecture defined:

- $X$ as the number of heads in the outcome.
- $Z$ as $1$ if the first flip is heads and $0$ otherwise.

For example:

- On the outcome $TTT$, $X=0$ and $Z=0$.
- On the outcome $THH$, $X=2$ and $Z=0$.
- On an outcome beginning with $H$ and containing two heads, $X=2$ and $Z=1$.

A joint distribution records every possible pair of values and the probability of that pair:

$$
\Pr(X=a,Z=b).
$$

The comma means that both events occur:

$$
\{X=a\}\cap\{Z=b\}.
$$

Since $X$ can take the values $0,1,2,3$ and $Z$ can take the values $0,1$, the joint table contains every combination of one possible $X$ value and one possible $Z$ value.

For instance:

- $X=0$ and $Z=0$ occurs for $TTT$.
- $X=0$ and $Z=1$ is impossible, because an outcome cannot contain zero heads while beginning with a head.
- $X=1$ and $Z=0$ occurs when exactly one of the final two flips is heads.
- $X=2$ and $Z=1$ occurs for $HHT$ and $HTH$.

The events corresponding to all pairs $(a,b)$ partition the sample space: every outcome belongs to exactly one pair. Consequently, summing all entries of a joint distribution table gives $1$:

$$
\sum_a\sum_b \Pr(X=a,Z=b)=1.
$$

Some numerical probabilities stated during this walkthrough were internally inconsistent; they are retained in the final section as unclear rather than silently corrected.

---

## Marginal Distributions

A marginal probability concerns one random variable without restricting the value of the other.

Suppose the joint distribution of $X$ and $Z$ is known. To find $\Pr(X=1)$, add every joint probability whose $X$ coordinate equals $1$:

$$
\Pr(X=1)
=
\Pr(X=1,Z=0)
+
\Pr(X=1,Z=1).
$$

This is an application of the total probability rule. The possible values $Z=0$ and $Z=1$ cover all cases, so adding them removes the restriction on $Z$.

More generally, if $X_1$ and $X_2$ have a joint distribution, then the marginal distribution of $X_1$ is obtained by summing over every possible value of $X_2$:

$$
\Pr(X_1=a)
=
\sum_b \Pr(X_1=a,X_2=b).
$$

Similarly, the marginal distribution of $X_2$ is

$$
\Pr(X_2=b)
=
\sum_a \Pr(X_1=a,X_2=b).
$$

In a joint-distribution table, this means adding all entries in the appropriate row or column, depending on how the two variables are arranged.

---

## Independent Random Variables

The lecture first distinguished independence from mutual exclusivity.

Two events are mutually exclusive when they do not overlap. Independence instead means

$$
\Pr(A\cap B)=\Pr(A)\Pr(B).
$$

For random variables, independence requires this equation to hold for every pair of possible values.

Random variables $X$ and $Y$ are independent if, for every possible $a$ and $b$,

$$
\Pr(X=a,Y=b)
=
\Pr(X=a)\Pr(Y=b).
$$

The left side is an entry of the joint distribution. The right side is the product of the corresponding marginal probabilities.

### Example: Outcomes of Two Dice

Roll two fair six-sided dice. Let

- $X$ be the result of the first roll.
- $Y$ be the result of the second roll.

For any possible values $a$ and $b$, the lecture gave

$$
\Pr(X=a,Y=b)=\frac{1}{36}.
$$

The marginal probabilities are

$$
\Pr(X=a)=\frac16
\qquad\text{and}\qquad
\Pr(Y=b)=\frac16.
$$

Their product is

$$
\Pr(X=a)\Pr(Y=b)
=
\frac16\cdot\frac16
=
\frac1{36}.
$$

Because the equality holds for every possible pair $(a,b)$, the two random variables are independent.

### Example: First Die and Sum of Two Dice

Again roll two fair six-sided dice, but now let

- $X$ be the result of the first die.
- $S$ be the sum of the two dice.

To prove that $X$ and $S$ are not independent, it is enough to find one pair of values for which the independence equation fails.

The lecture chose $X=1$ and $S=8$. These cannot occur together, because a first die of $1$ cannot produce a total of $8$ with a six-sided second die. Therefore,

$$
\Pr(X=1,S=8)=0.
$$

Individually, however,

$$
\Pr(X=1)=\frac16
$$

and

$$
\Pr(S=8)=\frac5{36}.
$$

Thus,

$$
\Pr(X=1)\Pr(S=8)
=
\frac16\cdot\frac5{36},
$$

which is not $0$. Hence,

$$
\Pr(X=1,S=8)
\ne
\Pr(X=1)\Pr(S=8),
$$

so $X$ and $S$ are not independent.

---

## Conditional Probability with Random Variables

Expressions involving random variables can define events, so the ordinary rules of conditional probability still apply.

For example, consider five coin flips. Let

- $X_1=1$ if the first flip is heads and $X_1=0$ otherwise.
- $S$ be the total number of heads among all five flips.

Then

$$
\Pr(S=5\mid X_1=1)
$$

means the probability that all five flips are heads, given that the first flip is already known to be heads.

If the probability of heads on each flip is $p$, then the remaining four flips must all be heads. The lecture therefore obtained

$$
\Pr(S=5\mid X_1=1)=p^4.
$$

The product rule applies in the same way as it does for any other events:

$$
\Pr(S=5,X_1=1)
=
\Pr(S=5\mid X_1=1)\Pr(X_1=1).
$$

Substituting the two probabilities gives

$$
\Pr(S=5,X_1=1)
=
p^4\cdot p
=
p^5.
$$

The main point is that statements such as $S=5$ and $X_1=1$ are events - subsets of the sample space - so previously established event rules apply to them.

---

## Mutual Independence and IID Random Variables

For three random variables $X$, $Y$, and $Z$, mutual independence requires the relevant pairwise and three-way independence equations to hold for every possible triple of values.

For possible values $a$, $b$, and $c$, this includes the pairwise conditions

$$
\Pr(X=a,Y=b)
=
\Pr(X=a)\Pr(Y=b),
$$

$$
\Pr(X=a,Z=c)
=
\Pr(X=a)\Pr(Z=c),
$$

and

$$
\Pr(Y=b,Z=c)
=
\Pr(Y=b)\Pr(Z=c),
$$

together with the three-way condition

$$
\Pr(X=a,Y=b,Z=c)
=
\Pr(X=a)\Pr(Y=b)\Pr(Z=c).
$$

The lecture then introduced the abbreviation IID, meaning independent and identically distributed:

- Independent means that the random variables are mutually independent.
- Identically distributed means that they have the same possible values with the same probabilities.

For example, rolling a die $13$ times and defining one random variable for each result gives IID random variables. Each variable has possible values $1$ through $6$, each with probability $1/6$, and the separate rolls are independent.

### Example: Three Balls and $n$ Bins

Suppose three balls are thrown into $n$ bins, with each ball equally likely to land in any bin. Let $X_i$ be the bin containing ball $i$.

The variables $X_1,X_2,X_3$ are IID:

- The bin selected by one ball does not affect the bin selected by another.
- Each variable has possible values corresponding to bins $1$ through $n$.
- Each bin has probability $1/n$ for each ball.

To find the probability that every ball lands in bin $2$, write

$$
\Pr(X_1=2,X_2=2,X_3=2).
$$

Independence allows this joint probability to be factored:

$$
\Pr(X_1=2,X_2=2,X_3=2)
=
\Pr(X_1=2)\Pr(X_2=2)\Pr(X_3=2).
$$

Identical distribution means that all three factors have the same value:

$$
\Pr(X_i=2)=\frac1n.
$$

Therefore,

$$
\Pr(X_1=2,X_2=2,X_3=2)
=
\left(\frac1n\right)^3.
$$

---

## Sum of Independent Poisson Random Variables

The lecture formally proved the earlier claim that adding independent Poisson random variables produces another Poisson random variable.

Suppose

$$
X\sim\operatorname{Poisson}(\lambda)
\qquad\text{and}\qquad
Y\sim\operatorname{Poisson}(\mu),
$$

and suppose $X$ and $Y$ are independent. Define

$$
S=X+Y.
$$

To find the distribution of $S$, fix a nonnegative integer $k$. Every way for $X+Y$ to equal $k$ can be written as

$$
X=j,
\qquad
Y=k-j,
$$

for $j=0,1,\ldots,k$. Therefore,

$$
\Pr(S=k)
=
\sum_{j=0}^{k}
\Pr(X=j,Y=k-j).
$$

Independence lets the joint probabilities factor:

$$
\Pr(S=k)
=
\sum_{j=0}^{k}
\Pr(X=j)\Pr(Y=k-j).
$$

Substitute the two Poisson probability formulas:

$$
\Pr(S=k)
=
\sum_{j=0}^{k}
\left(
\frac{\lambda^j}{j!}e^{-\lambda}
\right)
\left(
\frac{\mu^{k-j}}{(k-j)!}e^{-\mu}
\right).
$$

Factor out the terms that do not depend on $j$:

$$
\Pr(S=k)
=
e^{-(\lambda+\mu)}
\sum_{j=0}^{k}
\frac{\lambda^j\mu^{k-j}}{j!(k-j)!}.
$$

Insert $k!$ so that the binomial coefficients appear:

$$
\Pr(S=k)
=
\frac{e^{-(\lambda+\mu)}}{k!}
\sum_{j=0}^{k}
\frac{k!}{j!(k-j)!}
\lambda^j\mu^{k-j}.
$$

Since

$$
\frac{k!}{j!(k-j)!}
=
\binom{k}{j},
$$

this becomes

$$
\Pr(S=k)
=
\frac{e^{-(\lambda+\mu)}}{k!}
\sum_{j=0}^{k}
\binom{k}{j}\lambda^j\mu^{k-j}.
$$

The binomial theorem gives

$$
\sum_{j=0}^{k}
\binom{k}{j}\lambda^j\mu^{k-j}
=
(\lambda+\mu)^k.
$$

Consequently,

$$
\Pr(S=k)
=
\frac{(\lambda+\mu)^k}{k!}e^{-(\lambda+\mu)}.
$$

This is the probability mass function of a Poisson random variable with parameter $\lambda+\mu$. Hence,

$$
X+Y\sim\operatorname{Poisson}(\lambda+\mu).
$$

---

## Linearity of Expectation

The lecture introduced linearity of expectation as its most important result:

$$
\mathbb{E}[X+Y]
=
\mathbb{E}[X]+\mathbb{E}[Y].
$$

Crucially, this identity does not require $X$ and $Y$ to be independent.

More generally, constants can be pulled outside expectation:

$$
\mathbb{E}[cX]
=
c\mathbb{E}[X].
$$

Combining the two properties gives

$$
\mathbb{E}[aX+bY]
=
a\mathbb{E}[X]+b\mathbb{E}[Y].
$$

The lecture described the integer case of constant multiplication intuitively as repeated addition. For example, $cX$ can be viewed as adding $X$ to itself $c$ times when $c$ is an integer. It also stated that the result remains true for non-integer constants.

### Example: Sum of Two Dice

Let $X$ and $Y$ be the results of two six-sided dice. One possible method is to enumerate all $36$ outcomes and compute the distribution of the sum. Linearity avoids that enumeration.

The expected value of a single six-sided die was stated as

$$
\mathbb{E}[X]
=
\mathbb{E}[Y]
=
\frac72.
$$

Therefore,

$$
\begin{aligned}
\mathbb{E}[X+Y]
&=
\mathbb{E}[X]+\mathbb{E}[Y]\\
&=
\frac72+\frac72\\
&=
7.
\end{aligned}
$$

### Derivation from the Sample-Space Definition

The lecture used the sample-space form of expectation. If $\Omega$ is the sample space, then

$$
\mathbb{E}[X]
=
\sum_{\omega\in\Omega}X(\omega)\Pr(\omega).
$$

For the sum $X+Y$,

$$
\mathbb{E}[X+Y]
=
\sum_{\omega\in\Omega}
(X+Y)(\omega)\Pr(\omega).
$$

For each outcome $\omega$,

$$
(X+Y)(\omega)=X(\omega)+Y(\omega).
$$

Substituting this into the sum gives

$$
\mathbb{E}[X+Y]
=
\sum_{\omega\in\Omega}
\left(X(\omega)+Y(\omega)\right)\Pr(\omega).
$$

Distribute the probability:

$$
\mathbb{E}[X+Y]
=
\sum_{\omega\in\Omega}
\left(
X(\omega)\Pr(\omega)
+
Y(\omega)\Pr(\omega)
\right).
$$

Split the sum into two sums:

$$
\mathbb{E}[X+Y]
=
\sum_{\omega\in\Omega}
X(\omega)\Pr(\omega)
+
\sum_{\omega\in\Omega}
Y(\omega)\Pr(\omega).
$$

Each sum is an expectation, so

$$
\mathbb{E}[X+Y]
=
\mathbb{E}[X]+\mathbb{E}[Y].
$$

No independence assumption appears anywhere in this derivation.

---

## Indicator Variables and the Randomized Homework Example

An indicator random variable records whether an event occurs:

$$
I=
\begin{cases}
1, & \text{if the event occurs},\\
0, & \text{if the event does not occur}.
\end{cases}
$$

The lecture considered $n$ students whose homework assignments are returned uniformly at random. Each student receives one random assignment rather than necessarily receiving their own.

For each student $i$, define

$$
I_i=
\begin{cases}
1, & \text{if student }i\text{ receives their own homework},\\
0, & \text{otherwise}.
\end{cases}
$$

There are $n$ assignments, so the probability that a particular student receives their own assignment is

$$
\Pr(I_i=1)=\frac1n.
$$

The probability that the student does not receive their own assignment is

$$
\Pr(I_i=0)=\frac{n-1}{n}.
$$

Thus,

$$
\begin{aligned}
\mathbb{E}[I_i]
&=
1\cdot\frac1n
+
0\cdot\frac{n-1}{n}\\
&=
\frac1n.
\end{aligned}
$$

Let $X$ be the total number of students who receive their own assignments. Since each $I_i$ contributes $1$ exactly when student $i$ receives the correct homework,

$$
X=I_1+I_2+\cdots+I_n.
$$

By linearity of expectation,

$$
\begin{aligned}
\mathbb{E}[X]
&=
\mathbb{E}[I_1]+\mathbb{E}[I_2]+\cdots+\mathbb{E}[I_n]\\
&=
n\cdot\frac1n\\
&=
1.
\end{aligned}
$$

Therefore, the expected number of students who receive their own homework is $1$. This calculation relies on linearity of expectation and does not require the indicator variables to be independent.

---

## Unclear or Incomplete Steps

The numerical joint-distribution walkthrough for three coin flips contains inconsistent spoken denominators. The probability of the outcome $TTT$ was stated as $1/18$, while later marginal values and other entries used eighths, including $1/8$, $3/8$, and $1/4$. The intended joint-table values cannot be preserved consistently from the spoken numbers alone.

During the independence recap, the lecture stated that the probability that a specified flip is heads was $1/3$ and used a product of $1/9$. This conflicts with the lecture's surrounding three-coin-flip setup and with its later table values. The exact intended example is therefore `[unclear]`.

In the spoken algebra for the sum of two Poisson variables, several exponents were garbled while expressions were being written. The surrounding explanation clearly identified the factors as the Poisson probabilities for $X=j$ and $Y=k-j$, and the complete supported derivation above follows those explicitly stated events.