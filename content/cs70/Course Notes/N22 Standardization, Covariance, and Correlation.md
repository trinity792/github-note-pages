---
title: CS 70 Note 22 — Standardization, Covariance, and Correlation
Content Type: Course Notes
Content Area: Probability
description: "Standardizes random variables, defines covariance and correlation, and proves the correlation bounds and their equality cases."
Course: CS 70
pinned: false
Date Published: November 14, 2026
Last Updated: November 14, 2026
Status: Finalized
---

# CS 70 Note 22 — Standardization, Covariance, and Correlation

**Previous note:** [[cs70/Course Notes/N21 Random Variables III - Variance|Note 21 — Random Variables III, Variance]].

Standardization puts a random variable on a common scale. Covariance measures how two variables vary together, while correlation normalizes covariance and lies between $-1$ and $1$.

---

## 1. Standardized Random Variables

For a random variable $X$ with mean $\mu$ and standard deviation $\sigma>0$, its standardized version is

$$
\widetilde X=\frac{X-\mu}{\sigma}.
$$

It has mean $0$ and variance $1$:

$$
\mathbb E[\widetilde X]=\frac{\mathbb E[X]-\mu}{\sigma}=0,
\qquad
\operatorname{Var}(\widetilde X)=\frac{\operatorname{Var}(X)}{\sigma^2}=1.
$$

Each value $a$ becomes $(a-\mu)/\sigma$ with the same probability. If the distribution of $X$ is $\{(a,\mathbb P[X=a]):a\in\mathcal A\}$, the standardized distribution is

$$
\left\{\left(\frac{a-\mu}{\sigma},\mathbb P[X=a]\right):a\in\mathcal A\right\}.
$$

Thinking of observed data as samples from a distribution, standardizing the data is conceptually equivalent to standardizing the underlying random variable. Standardization allows comparisons across different scales, such as exam scores from schools with different grading systems, and can help keep features on comparable scales in machine learning.

---

## 2. Covariance

### Definition 22.1 — Covariance

For $\mu_X=\mathbb E[X]$ and $\mu_Y=\mathbb E[Y]$, the **covariance** is

$$
\operatorname{cov}(X,Y)=\mathbb E[(X-\mu_X)(Y-\mu_Y)]
=\mathbb E[XY]-\mathbb E[X]\mathbb E[Y].
$$

**Exercise.** Check that the two expressions are equal by expanding the product and applying linearity. Positive covariance indicates that deviations from the means tend to have the same sign; negative covariance indicates they tend to have opposite signs. Its magnitude depends on the variables' scales.

Useful properties, assuming finite second moments:

- $\operatorname{Var}(X+Y)=\operatorname{Var}(X)+\operatorname{Var}(Y)+2\operatorname{cov}(X,Y)$.
- Independence implies $\operatorname{cov}(X,Y)=0$, but zero covariance does not imply independence.
- $\operatorname{cov}(X,X)=\operatorname{Var}(X)$.
- $\operatorname{cov}(aX+b,cY+d)=ac\operatorname{cov}(X,Y)$. In particular, if $Y=X$, this is $ac\operatorname{Var}(X)$.
- Covariance is bilinear:

$$
\operatorname{cov}\left(\sum_{i=1}^n a_iX_i,\sum_{j=1}^m b_jY_j\right)
=\sum_{i=1}^n\sum_{j=1}^m a_i b_j\operatorname{cov}(X_i,Y_j).
$$

For an example of zero covariance without independence, let $X$ be equally likely to be $-1,0,1$ and let $Y=X^2$. Then $\mathbb E[X]=\mathbb E[XY]=\mathbb E[X^3]=0$, but knowing $X$ determines $Y$.

---

## 3. Correlation

### Definition 22.2 — Correlation

When $\sigma(X)>0$ and $\sigma(Y)>0$, the **correlation** is

$$
\operatorname{Corr}(X,Y)=\frac{\operatorname{cov}(X,Y)}{\sigma(X)\sigma(Y)}
=\mathbb E[\widetilde X\widetilde Y].
$$

The sign of covariance indicates the direction of association, but its magnitude is difficult to interpret because it depends on scale. Correlation is a scale-free measure of linear association, with a fixed range from $-1$ to $1$. Correlation is undefined if either standard deviation is zero, and zero correlation does not rule out nonlinear dependence.

### Theorem 22.1 — Correlation Bounds

For random variables with positive finite standard deviations,

$$
-1\le\operatorname{Corr}(X,Y)\le1.
$$

**Proof.** Standardization gives $\mathbb E[\widetilde X^2]=\mathbb E[\widetilde Y^2]=1$. Since squares are nonnegative,

$$
\begin{aligned}
0&\le\mathbb E[(\widetilde X-\widetilde Y)^2]=2-2\mathbb E[\widetilde X\widetilde Y],\\
0&\le\mathbb E[(\widetilde X+\widetilde Y)^2]=2+2\mathbb E[\widetilde X\widetilde Y].
\end{aligned}
$$

Together these inequalities bound $\mathbb E[\widetilde X\widetilde Y]$, which is the correlation, between $-1$ and $1$.

### Equality Cases

Correlation is $+1$ exactly when $\widetilde X=\widetilde Y$ with probability $1$, and $-1$ exactly when $\widetilde X=-\widetilde Y$ with probability $1$. Equivalently, $Y=aX+b$ with probability $1$, where $a>0$ for correlation $+1$ and $a<0$ for correlation $-1$. In the two cases respectively,

$$
a=\pm\frac{\sigma(Y)}{\sigma(X)},\qquad b=\mu_Y-a\mu_X.
$$

Thus perfect positive or negative correlation means an exact affine relationship, apart from outcomes of probability zero.
