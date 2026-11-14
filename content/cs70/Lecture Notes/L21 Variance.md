---
title: L21 Variance
Content Type: Lecture
Content Area:
Course: CS70
description: "The lecture solved the coupon collector problem by decomposing its waiting time into geometric random variables and applying linearity of expectation. It developed the law of the unconscious statistician, motivated variance through random walks, and introduced variance identities and standard deviation."
pinned: false
Date Published: November 10, 2026
Last Updated: November 10, 2026
Status: Finalized
---

# L21 Variance

## Executive Summary
The coupon collector problem asks how many cereal boxes must be purchased, on average, to collect all $n$ equally common coupons. Breaking the total waiting time into the additional waits for successive new coupons makes each stage tractable: the first takes one purchase, and the later stages are geometric. Linearity of expectation gives $\mathbb{E}[X]=n\sum_{i=1}^{n}1/i$.
The law of the unconscious statistician computes the expectation of a function of a random variable by applying the function to each possible value and weighting by its original probability. Applying a function before taking an expectation generally differs from applying it afterward.
Random walks with different step sizes can have the same expected position but different spreads. Expected signed deviation cannot measure that spread because it is zero. Squared deviation leads to variance, whose calculation uses square terms and cross terms. The lecture concludes with an alternate variance formula, rules for scaling and shifting, and standard deviation as a measure in the original units.

---

## Algebra Warm-Up: Squaring a Sum
Squaring a sum produces the square of every term and twice every product of distinct terms. The opening example was

$$
(500+a+b+c)^2
=500^2+a^2+b^2+c^2+1000a+1000b+1000c+2ab+2ac+2bc.
$$

There are $\binom{4}{2}$ distinct pairs among the four terms. Each pair contributes a cross term with coefficient two. This expansion is used later when a random variable is expressed as a sum and its square must be averaged.

---

## Coupon Collector: Modeling the Total Waiting Time
Each cereal box contains one of $n$ equally common coupons. Repeated coupons are possible, and the goal is to collect every type. The lecture first simulated buying a fixed number of boxes and checking whether the collection was complete. With $50$ coupon types and $220$ purchases, some runs succeeded and others left coupons missing.
The mathematical question uses a different stopping rule: keep buying boxes until the final missing coupon appears. Define $X$ to be the total number of boxes purchased under that rule. Simulations with $50$ types averaged around $224$ purchases; the objective is to compute the expectation without relying on simulation.

### A random variable is a function
A random variable maps outcomes in a sample space to real numbers:

$$
X:\Omega\longrightarrow\mathbb{R}.
$$

Here an outcome is a sequence of coupon purchases that stops exactly when the collection first becomes complete. The sample space has infinitely many possible sequences because duplicates can delay completion arbitrarily long. The value $X(\omega)$ is the length of the sequence $\omega$.
At least $n$ purchases are required, and there is no finite upper bound on the number of purchases. Thus the possible values of $X$ are

$$
n,n+1,n+2,\ldots.
$$

The instructor's chosen sample space excludes sequences that continue buying boxes after the collection is complete. The point of this discussion is to reinforce the function interpretation; the expectation calculation proceeds by studying waiting times instead of listing all outcomes.

### Decompose the total into additional waits
The total $X$ does not have one of the familiar distributions already studied. The useful move is to write

$$
X=X_1+X_2+\cdots+X_n,
$$

where $X_i$ counts the additional boxes needed to obtain the $i$th distinct coupon after the previous $i-1$ distinct coupons have already been collected.
The first box always gives a new coupon, so $X_1=1$ with probability one. The instructor illustrated later stages with waits of two boxes for the second new coupon, four for the third, one for the fourth, and nine for the fifth. These are separate stage lengths. In particular, $X_3$ excludes the purchases used to obtain the first and second distinct coupons.

### Identify the geometric stages
After the first distinct coupon has been collected, a purchase is successful if it produces any of the other $n-1$ types. A duplicate leaves the collector in the same situation, with the same chance of success on the next purchase. Therefore

$$
X_2\sim\operatorname{Geometric}\!\left(\frac{n-1}{n}\right),
\qquad
\mathbb{E}[X_2]=\frac{n}{n-1}.
$$

For $n=50$, the success probability is $49/50$, not $1/50$: the goal is any new type, not a particular previously collected type.
Once two distinct coupons have been collected, $n-2$ types remain new, giving

$$
X_3\sim\operatorname{Geometric}\!\left(\frac{n-2}{n}\right),
\qquad
\mathbb{E}[X_3]=\frac{n}{n-2}.
$$

For $50$ types, this success probability is $48/50$. Continuing the same reasoning, the stage for the $i$th distinct coupon has success probability $(n-i+1)/n$ and expectation

$$
\mathbb{E}[X_i]=\frac{n}{n-i+1}.
$$

The last coupon is the hardest: only one of the $n$ types is new, so the expected final-stage wait is $n$ purchases.

### Apply linearity of expectation
Linearity of expectation applies to a sum whether or not its terms are independent. It gives

$$
\begin{aligned}
\mathbb{E}[X]
&=\mathbb{E}[X_1]+\mathbb{E}[X_2]+\cdots+\mathbb{E}[X_n]\\
&=1+\frac{n}{n-1}+\frac{n}{n-2}+\cdots+\frac{n}{2}+\frac{n}{1}\\
&=n\left(\frac1n+\frac1{n-1}+\cdots+\frac12+1\right)\\
&=n\sum_{i=1}^{n}\frac1i.
\end{aligned}
$$

This is a finite harmonic sum. For $n=50$, the lecture reported an expectation of approximately $224.96$ boxes, consistent with the simulations.
The reusable problem-solving strategy is to replace a complicated total with understandable component random variables, identify each component's distribution, compute its expectation, and then add the expectations.

### Optional approximation beyond the course requirement
The instructor gave the approximation

$$
\sum_{i=1}^{n}\frac1i\approx\ln n+0.5772,
$$

where the constant is Euler's constant to the precision stated in lecture. Consequently,

$$
\mathbb{E}[X]\approx n(\ln n+0.5772).
$$

For $n=50$, the lecture gave $224.46$, close to the finite-sum answer $224.96$. The approximation improves as $n$ grows. The instructor explicitly presented this as an extra observation, not a required CS70 technique.

---

## The Law of the Unconscious Statistician
If $Q=f(X)$, its expectation can be computed directly from the values and probabilities of $X$:

$$
\mathbb{E}[f(X)]
=\sum_{x\in\operatorname{range}(X)}f(x)\Pr(X=x).
$$

The procedure applies the function to each possible value of $X$, then multiplies by the probability of that original value. The instructor emphasized that this often feels obvious in examples even when its notation looks elaborate.

### Example: The cosine of the number of heads
Flip a fair coin twice, and let $X$ count the heads. Its distribution is

| $x$ | $\Pr(X=x)$ | $Q=f(x)=\cos x$ |
|---|---|---|
| $0$ | $1/4$ | $\cos 0$ |
| $1$ | $1/2$ | $\cos 1$ |
| $2$ | $1/4$ | $\cos 2$ |

Thus

$$
\mathbb{E}[\cos X]
=\frac14\cos 0+\frac12\cos 1+\frac14\cos 2.
$$

The function is deliberately unusual to show that the method is general. For a binomial variable with $50$ flips and success probability $0.3$, the same procedure sums over $0,1,\ldots,50$, multiplying the cosine of each value by its binomial probability. Replacing cosine with squaring changes only the applied function: each summand uses $x^2$ in place of $\cos x$.

### Why applying the function first matters
In general,

$$
\mathbb{E}[f(X)]\ne f(\mathbb{E}[X]).
$$

In the two-fair-flip example, $\mathbb{E}[X]=1$, so applying cosine after taking the expectation gives $\cos 1$. This is different from the weighted average of three cosine values computed above. The corresponding distinction between $\mathbb{E}[X^2]$ and $(\mathbb{E}[X])^2$ is especially important for variance.

### Proof by grouping outcomes with the same value
Start with expectation written over individual outcomes:

$$
\mathbb{E}[Q]
=\sum_{\omega\in\Omega}Q(\omega)\Pr(\omega)
=\sum_{\omega\in\Omega}f(X(\omega))\Pr(\omega).
$$

Group the outcomes according to the value $a$ that $X$ assigns them:

$$
\begin{aligned}
\mathbb{E}[Q]
&=\sum_{a\in\operatorname{range}(X)}
\sum_{\omega:X(\omega)=a}f(a)\Pr(\omega)\\
&=\sum_{a\in\operatorname{range}(X)}
f(a)\sum_{\omega:X(\omega)=a}\Pr(\omega)\\
&=\sum_{a\in\operatorname{range}(X)}f(a)\Pr(X=a).
\end{aligned}
$$

The inner sum collects subcases of the same event. For the fair-coin example, $HT$ and $TH$ both give $X=1$, so their probabilities combine into $\Pr(X=1)=1/2$. The nested sums express this grouping formally; they do not introduce a different expectation rule.

---

## Random Walks: Why Expectation Does Not Describe Spread
A particle starts at position $500$ and moves either up or down at each step. First, the lecture used moves of $+1$ and $-1$, each with probability $1/2$. Let $M_i$ denote move $i$, and let $Y_n$ be the particle's position after $n$ moves:

$$
Y_n=500+M_1+\cdots+M_n.
$$

For example, at time $100$, the particle could be as high as $600$ or as low as $400$. Reaching either extreme requires every move to have the same direction and is very unlikely.
The sequence of positions is an example of a random process: a sequence of random variables representing successive times. Unlike a single random variable describing one quantity, this family describes how a system evolves.

### Compute the expected position
A move has expectation

$$
\mathbb{E}[M_i]=\frac12(1)+\frac12(-1)=0.
$$

By linearity,

$$
\mathbb{E}[Y_n]=500+\sum_{i=1}^{n}\mathbb{E}[M_i]=500.
$$

The expected position stays at the starting point regardless of how long the walk runs. This does not mean an individual path stays there.
Now change the moves to $+3$ and $-3$, still with equal probabilities. Each move still has expectation zero, so the expected position is again $500$. Nevertheless, the larger-step simulation spreads out more. Expectation alone misses this distinction, motivating a separate measure of dispersion.

---

## From Deviations to Variance
The lecture developed a measure of spread by considering several ways to summarize distance from the mean. For the walk, the mean is $500$.

### Signed deviations cancel
The deviation $Y_n-\mathbb{E}[Y_n]$ is itself a random variable. Its expectation is

$$
\begin{aligned}
\mathbb{E}[Y_n-\mathbb{E}[Y_n]]
&=\mathbb{E}[Y_n]-\mathbb{E}[\mathbb{E}[Y_n]]\\
&=500-500=0.
\end{aligned}
$$

The inner expectation is a number, so taking its expectation leaves it unchanged. Positive and negative deviations cancel, making this statistic unhelpful for distinguishing the walks' spreads.

### Absolute deviations avoid cancellation but complicate algebra
A second candidate is

$$
\mathbb{E}\!\left[\left|Y_n-\mathbb{E}[Y_n]\right|\right].
$$

This is well defined and avoids cancellation. However, the surrounding absolute value prevents directly splitting the expression by linearity of expectation. The instructor noted that one could separate cases below and above $500$, but did not pursue that calculation.

### Squared deviations lead to a workable calculation
Instead, square the deviation. For the walk with moves $+3$ and $-3$,

$$
\begin{aligned}
\mathbb{E}[(Y_n-500)^2]
&=\mathbb{E}[Y_n^2-1000Y_n+250000]\\
&=\mathbb{E}[Y_n^2]-1000\mathbb{E}[Y_n]+250000\\
&=\mathbb{E}[Y_n^2]-500000+250000\\
&=\mathbb{E}[Y_n^2]-250000.
\end{aligned}
$$

During this derivation, the instructor corrected an omitted expectation operator. The middle term requires $\mathbb{E}[Y_n]$, not an unaveraged $Y_n$.

### Expand the squared position
Using the opening square-of-a-sum rule,

$$
Y_n^2
=250000+\sum_{i=1}^{n}M_i^2
+1000\sum_{i=1}^{n}M_i
+2\sum_{1\le i<j\le n}M_iM_j.
$$

There are three kinds of random terms to average. Each squared move is always nine, so $\mathbb{E}[M_i^2]=9$. Each move has expectation zero. For the cross terms, the lecture enumerated the four equally likely pairs of moves:

| $M_i$ | $M_j$ | $M_iM_j$ | Probability |
|---|---|---|---|
| $3$ | $3$ | $9$ | $1/4$ |
| $3$ | $-3$ | $-9$ | $1/4$ |
| $-3$ | $3$ | $-9$ | $1/4$ |
| $-3$ | $-3$ | $9$ | $1/4$ |

Therefore

$$
\mathbb{E}[M_iM_j]
=\frac14(9)+\frac14(-9)+\frac14(-9)+\frac14(9)=0.
$$

The $n$ squared-move terms each contribute nine, while the linear and cross terms contribute zero:

$$
\mathbb{E}[Y_n^2]=250000+9n.
$$

Substituting this into the squared-deviation calculation gives

$$
\mathbb{E}[(Y_n-500)^2]
=250000+9n-250000=9n.
$$

This is the expected squared distance from the starting point after $n$ steps. It measures spread even though the expected position remains fixed.

---

## Variance Identities and Standard Deviation
The general name for expected squared deviation from the mean is variance. Writing $\mu=\mathbb{E}[X]$ avoids nested expectation notation:

$$
\operatorname{Var}(X)
=\mathbb{E}[(X-\mathbb{E}[X])^2]
=\mathbb{E}[(X-\mu)^2].
$$

### Alternate formula
The lecture presented the equivalent formula

$$
\operatorname{Var}(X)=\mathbb{E}[X^2]-(\mathbb{E}[X])^2.
$$

It comes from expanding the square and using linearity, as in the random-walk calculation. The distinction between the expected square and the square of the expectation must be preserved.
As intuition for the order of subtraction, the instructor noted that squaring first makes negative values contribute positively, whereas averaging first can involve cancellation. Variance is nonnegative and equals zero exactly when the variable is constant with probability one.

### Scaling a random variable
For a constant $c$,

$$
\operatorname{Var}(cX)=c^2\operatorname{Var}(X).
$$

Multiplying a die result by three illustrates the operation: scaling the variable multiplies its variance by the square of the scale factor. The lecture suggested deriving this using the alternate variance formula; it did not verbally work through every algebraic line.

### Shifting a random variable
Adding a constant does not change variance:

$$
\operatorname{Var}(X+c)=\operatorname{Var}(X).
$$

Shifting a distribution up or down changes its location but not its dispersion. The instructor described the constant terms canceling in the algebra.

### Units and standard deviation
Variance has the squared units of the original variable. If $X$ is an exam score measured in points, its variance is measured in points squared. The standard deviation restores the original units:

$$
\sigma=\sqrt{\operatorname{Var}(X)}.
$$

This makes standard deviation easier to interpret on the same scale as the original measurements.

---

## Mathematical Clarifications

For the random walk with step sizes $+3$ and $-3$, the second moment is $250000+9n$, and the variance is $9n$. Variance can equal zero; it need not be strictly positive.
