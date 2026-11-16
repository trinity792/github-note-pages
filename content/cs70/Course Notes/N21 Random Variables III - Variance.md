---
title: N21 Random Variables III - Variance
Content Type: Course Notes
Content Area: Probability
description: "Applies geometric random variables to coupon collecting, develops expectation of a function and variance, and computes variance for common distributions and sums of independent variables."
Course: CS 70
pinned: false
Date Published: November 14, 2026
Last Updated: November 14, 2026
Status: Finalized
---

# N21 Random Variables III - Variance

**Previous note:** [[cs70/Course Notes/N20 Random Variables II - Linearity of Expectation|Note 20 — Random Variables II, Linearity of Expectation]].

This note uses geometric random variables to solve the coupon collector problem, then develops expectation of a function, variance, and standard deviation. It computes variance for several distributions and shows when variances of sums can be added.

---

## 1. Coupon Collecting

Suppose each cereal box independently contains one card chosen uniformly from $n$ types. How many boxes $S_n$ are needed to collect all types? Let $X_i$ be the number of boxes bought after obtaining the $(i-1)$st distinct card, up to and including the box containing the $i$th distinct card. Then

$$
S_n=\sum_{i=1}^n X_i.
$$

The distribution of $S_n$ is difficult to compute directly (try $n=3$), but its expectation can be found using geometric random variables and linearity of expectation. The first box always contains a new card, so $\mathbb P[X_1=1]=1$ and $\mathbb E[X_1]=1$.

For $X_2$, a box contains the old card with probability $1/n$ and a new card with probability $(n-1)/n$. Think of success as Heads on a biased coin: $X_2$ counts trials up to the first success. Thus $X_2$ is geometric with parameter $(n-1)/n$ and $\mathbb E[X_2]=n/(n-1)$. Similarly, when two types have been collected, a new card appears with probability $(n-2)/n$, so $X_3$ is geometric with expectation $n/(n-2)$.

At stage $i$, there are $n-i+1$ unseen types, so each box succeeds with probability $(n-i+1)/n$. Thus $X_i\sim\operatorname{Geometric}((n-i+1)/n)$, counting the successful box, and

$$
\mathbb E[X_i]=\frac{n}{n-i+1}.
$$

Linearity of expectation gives the exact result

$$
\mathbb E[S_n]=\frac nn+\frac n{n-1}+\cdots+\frac n2+\frac n1=n\sum_{i=1}^n\frac1i=nH_n.
$$

The harmonic sum satisfies $H_n\approx\ln n+\gamma$, where Euler's constant $\gamma\approx0.5772$. Thus $\mathbb E[S_n]\approx n(\ln n+\gamma)$; for $n=100$, this is about $518$ boxes.

---

## 2. Expectation of a Function

In the previous note, $\mathbb E[cX]=c\mathbb E[X]$ for a constant $c$. How can we compute the expectation of a more general function, such as $X^2$?

Let $X$ be defined on a sample space $\Omega$ and let $f$ be a function on its range. Then $Y=f(X)$ is a random variable on the same sample space: $Y(\omega)=f(X(\omega))$. The event $Y=y$ is the event $X\in f^{-1}(y)$, where $f^{-1}(y)=\{x:f(x)=y\}$. If $f$ is one-to-one, this reduces to the corresponding single value of $X$. Several values of $X$ may otherwise produce the same $y$, so

$$
\mathbb P[Y=y]=\sum_{x:f(x)=y}\mathbb P[X=x].
$$

From the definition of expectation and the distribution above,

$$
\mathbb E[Y]=\sum_y y\,\mathbb P[Y=y]
=\sum_y\sum_{x:f(x)=y} y\,\mathbb P[X=x]
=\sum_x f(x)\mathbb P[X=x].
$$

Each value of $x$ appears exactly once in the inner sums. Thus the **law of the unconscious statistician** (LOTUS) says:

$$
\mathbb E[f(X)]=\sum_x f(x)\mathbb P[X=x].
$$

In particular, $\mathbb E[X^2]=\sum_x x^2\mathbb P[X=x]$. In general, $\mathbb E[f(X)]\ne f(\mathbb E[X])$; in particular, $\mathbb E[X^2]$ need not equal $(\mathbb E[X])^2$.

---

## 3. Random Walk and Variance

For a biased coin tossed $n$ times, the expected number of heads is $np$. Across repeated experiments the average is $np$, but a single experiment can produce any number from $0$ to $n$. How far from the mean should we expect to be?

A particle starts at $0$ and takes $n$ independent steps $X_i\in\{-1,1\}$, each direction equally likely. The sample space consists of all length-$n$ sequences over $\{\pm1\}$, each with probability $2^{-n}$. Its position is $S_n=\sum_i X_i$. Each step has mean $0$, so $\mathbb E[S_n]=0$, but this does not describe its distance from the origin.

### Proposition 21.1 — Squared Distance

For the random walk above, $\mathbb E[S_n^2]=n$.

**Proof.** Expanding the square and applying linearity,

$$
\mathbb E[S_n^2]=\sum_{i=1}^n\mathbb E[X_i^2]+2\sum_{i<j}\mathbb E[X_iX_j].
$$

Each $X_i^2=1$. For distinct $i,j$, the product is $1$ when both steps are $+1$ or both are $-1$. These cases are mutually exclusive, and the individual steps are independent, so

$$
\begin{aligned}
\mathbb P[X_iX_j=1]&=\mathbb P[X_i=X_j=1]+\mathbb P[X_i=X_j=-1]\\
&=\mathbb P[X_i=1]\mathbb P[X_j=1]+\mathbb P[X_i=-1]\mathbb P[X_j=-1]\\
&=\frac14+\frac14=\frac12.
\end{aligned}
$$

The only other possible product is $-1$, also with probability $1/2$, so $\mathbb E[X_iX_j]=0$. Later we obtain a shorter calculation using independence and expectations of products. Hence $\mathbb E[S_n^2]=n$. We can regard $\mathbb E[S_n^2]$ as an intuitive measure of spread. The root mean squared distance is $\sqrt n$; this does **not** imply $\mathbb E[|S_n|]=\sqrt n$.

### Definition 21.1 — Variance and Standard Deviation

For $\mu=\mathbb E[X]$, define

$$
\operatorname{Var}(X)=\mathbb E[(X-\mu)^2],\qquad \sigma(X)=\sqrt{\operatorname{Var}(X)}.
$$

Variance measures expected squared deviation from the mean; standard deviation restores the original units. In the random walk, $\operatorname{Var}(S_n)=n$ and $\sigma(S_n)=\sqrt n$.

### Theorem 21.1 — Alternative Formula

$$
\operatorname{Var}(X)=\mathbb E[X^2]-(\mathbb E[X])^2.
$$

**Proof.** Expand the definition and use linearity, treating $\mu$ as a constant:

$$
\mathbb E[(X-\mu)^2]=\mathbb E[X^2]-2\mu\mathbb E[X]+\mu^2=\mathbb E[X^2]-\mu^2.
$$

For constants $a,b$, shifting does not change variance and scaling squares the factor: $\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)$.

---

## 4. Computing Variance

### 1. Fair Die and 2. Discrete Uniform Distribution

For a fair die $X$, $\mathbb E[X]=7/2$ and $\mathbb E[X^2]=(1^2+\cdots+6^2)/6=91/6$. Therefore $\operatorname{Var}(X)=91/6-49/4=35/12$.

More generally, for $X\sim\operatorname{Uniform}\{1,\ldots,n\}$,

$$
\mathbb E[X]=\frac{n+1}{2},\qquad \operatorname{Var}(X)=\frac{n^2-1}{12},\qquad \sigma(X)=\sqrt{\frac{n^2-1}{12}}.
$$

These follow from $\sum_{i=1}^n i=n(n+1)/2$ and $\sum_{i=1}^n i^2=n(n+1)(2n+1)/6$.

### 3. Fixed Points of a Random Permutation

As in the homework-shuffling example, a fixed point represents a student receiving their own homework. Let $X_n=\sum_{i=1}^n I_i$, where $I_i$ indicates that item $i$ is fixed in a uniformly random permutation. For $n\ge2$, $\mathbb E[I_i^2]=1/n$, while for $i\ne j$,

$$
\mathbb E[I_iI_j]=\mathbb P[i\text{ and }j\text{ are fixed}]=\frac{(n-2)!}{n!}=\frac1{n(n-1)}.
$$

Therefore

$$
\mathbb E[X_n^2]=n\frac1n+2\binom n2\frac1{n(n-1)}=2.
$$

Since $\mathbb E[X_n]=1$, $\operatorname{Var}(X_n)=1$ for $n\ge2$. The mean and variance are both $1$, independent of $n$ for $n\ge2$: intuitively, even for a large number of items, the number of fixed points is unlikely to be much larger than a small number. For $n=1$ the sole permutation has one fixed point, so the variance is $0$.

### 4. Geometric Distribution

**Theorem 21.2.** For $X\sim\operatorname{Geometric}(p)$, counting trials through the first success, $\mathbb E[X]=1/p$ and

$$
\operatorname{Var}(X)=\frac{1-p}{p^2}.
$$

**Proof.** We need $\mathbb E[X^2]$, since $\operatorname{Var}(X)=\mathbb E[X^2]-1/p^2$. To derive this for $0<p<1$, differentiate $\sum_{i=0}^\infty(1-p)^i=1/p$ to obtain $\sum_{i=1}^\infty i(1-p)^{i-1}=1/p^2$. The $i=0$ derivative is zero and both sides have been multiplied by $-1$. This first derivative also gives another proof that $\mathbb E[X]=1/p$. Multiply by $1-p$ and differentiate again to get

$$
\sum_{i=1}^\infty i^2(1-p)^{i-1}=\frac{2-p}{p^3}.
$$

Multiplying by $p$ gives $\mathbb E[X^2]=(2-p)/p^2$, and subtracting $1/p^2$ gives the variance. The formula also holds at $p=1$.

### 5. Poisson Distribution

**Theorem 21.3.** For $X\sim\operatorname{Poisson}(\lambda)$, $\operatorname{Var}(X)=\lambda$.

**Proof.** We already know $\mathbb E[X]=\lambda$. Calculate the second moment, using $i=(i-1)+1$ and the exponential series $e^\lambda=\sum_{j=0}^\infty\lambda^j/j!$:

$$
\begin{aligned}
\mathbb E[X^2]&=\sum_{i=0}^{\infty}i^2\mathbb P[X=i]
=\sum_{i=1}^{\infty}i^2\frac{\lambda^i e^{-\lambda}}{i!}\\
&=\lambda e^{-\lambda}\sum_{i=1}^{\infty}i\frac{\lambda^{i-1}}{(i-1)!}\\
&=\lambda e^{-\lambda}\left[\sum_{i=2}^{\infty}\frac{\lambda^{i-1}}{(i-2)!}+\sum_{i=1}^{\infty}\frac{\lambda^{i-1}}{(i-1)!}\right]\\
&=\lambda e^{-\lambda}(\lambda e^\lambda+e^\lambda)=\lambda^2+\lambda.
\end{aligned}
$$

Therefore $\operatorname{Var}(X)=\lambda^2+\lambda-\lambda^2=\lambda$.

---

## 5. Sums of Independent Random Variables

### Theorem 21.4 — Expectation of a Product

If $X$ and $Y$ are independent and the expectations exist, then

$$
\mathbb E[XY]=\sum_x\sum_y xy\,\mathbb P[X=x,Y=y]
=\left(\sum_x x\mathbb P[X=x]\right)\left(\sum_y y\mathbb P[Y=y]\right)
=\mathbb E[X]\mathbb E[Y].
$$

Independence justifies factoring the joint probability.

### Theorem 21.5 — Variance of a Sum

For any $X,Y$ with finite second moments,

$$
\operatorname{Var}(X+Y)=\operatorname{Var}(X)+\operatorname{Var}(Y)+2(\mathbb E[XY]-\mathbb E[X]\mathbb E[Y]).
$$

Indeed, expanding the definition and using linearity gives

$$
\begin{aligned}
\operatorname{Var}(X+Y)
&=\mathbb E[X^2]+\mathbb E[Y^2]+2\mathbb E[XY]-(\mathbb E[X]+\mathbb E[Y])^2\\
&=(\mathbb E[X^2]-(\mathbb E[X])^2)+(\mathbb E[Y^2]-(\mathbb E[Y])^2)\\
&\quad+2(\mathbb E[XY]-\mathbb E[X]\mathbb E[Y]).
\end{aligned}
$$

If $X$ and $Y$ are independent, the final term vanishes. Consequently, for independent $X_1,\ldots,X_n$,

$$
\operatorname{Var}\left(\sum_{i=1}^n X_i\right)=\sum_{i=1}^n\operatorname{Var}(X_i).
$$

If they also share a distribution, the sum has variance $n\operatorname{Var}(X_1)$ and standard deviation $\sqrt n\,\sigma(X_1)$. This contrasts with linearity of expectation, which does not require independence. For example, if $X$ is Bernoulli with parameter $p$, then $\mathbb E[X^2]=p$ whereas $(\mathbb E[X])^2=p^2$; $X$ is not independent of itself in the nondegenerate case.

### Example: Binomial Distribution

For $X\sim\operatorname{Binomial}(n,p)$, write $X=\sum_i I_i$ for independent Bernoulli indicators. Each has mean $p$ and variance $p(1-p)$, so

$$
\mathbb E[X]=np,\qquad \operatorname{Var}(X)=np(1-p),\qquad \sigma(X)=\sqrt{np(1-p)}.
$$

For a fair coin these become $n/2$, $n/4$, and $\sqrt n/2$. The standard deviation grows like $\sqrt n$, whereas the mean grows like $n$; by contrast the standard deviation of a uniform variable on $\{1,\ldots,n\}$ grows proportionally to $n$.

---

## 6. Exercises

1. Show from the definition that $\operatorname{Var}(cX)=c^2\operatorname{Var}(X)$.
2. Derive the mean and variance above for $X\sim\operatorname{Uniform}\{1,\ldots,n\}$.

**Next note:** [[cs70/Course Notes/N22 Standardization, Covariance, and Correlation|Note 22 — Standardization, Covariance, and Correlation]].
