---
title: L22 Variance and Covariance
Content Type: Lecture
Content Area:
Course: CS70
description: "The lecture computed variances for Bernoulli variables, a fair die, and randomized homework returns, then derived variance addition for independent random variables. It introduced covariance, dependence with zero covariance, standardization, covariance bilinearity, and correlation through card draws and student-score data."
pinned: false
Date Published: November 12, 2026
Last Updated: November 12, 2026
Status: Finalized
---

# L22 Variance and Covariance

## Executive Summary
Variance calculations require both $\mathbb{E}[X]$ and $\mathbb{E}[X^2]$. A Bernoulli variable has variance $p(1-p)$, and a fair six-sided die has variance approximately $2.92$. For randomized homework returns, indicators and a careful joint-probability calculation give an expected squared count of two and a variance of one, independent of the class size in the calculation presented.
For independent random variables, the expectation of a product factors into the product of expectations. This makes the cross term in the variance of a sum vanish, so independent variances add. Independent dice sums have means and variances growing linearly with the number of dice, while standard deviations grow with its square root.
Covariance names the extra term when dependence matters. Card draws illustrate its sign, and a joint-distribution example shows that zero covariance does not imply independence. Student-score data provides a concrete sample-space interpretation and illustrates why association alone does not establish causation.
Standardization shifts a random variable to mean zero and rescales it to variance one. Covariance identities and bilinearity simplify calculations involving linear combinations. Correlation divides covariance by the product of standard deviations, yielding a quantity between $-1$ and $1$ that is easier to interpret across scales.

---

## Computing Variance from Two Expectations
The working formula throughout the lecture is

$$
\operatorname{Var}(X)=\mathbb{E}[X^2]-(\mathbb{E}[X])^2.
$$

The two required quantities are different: $\mathbb{E}[X^2]$ averages squared outcomes, whereas $(\mathbb{E}[X])^2$ squares the average outcome. Computing the second moment $\mathbb{E}[X^2]$ can require more ingenuity than computing the mean.

### Bernoulli variance
Let $X$ be Bernoulli with success probability $p$. It equals zero with probability $1-p$ and one with probability $p$. Squaring does not change either possible value, so $X^2=X$ as random variables. Therefore

$$
\mathbb{E}[X^2]=\mathbb{E}[X]=0(1-p)+1p=p.
$$

Substitute into the variance formula:

$$
\operatorname{Var}(X)=p-p^2=p(1-p).
$$

For $p=1$, every flip is heads; for $p=0$, every flip is tails. Both cases have variance zero because the outcome never changes.

### Variance of a fair six-sided die
For a fair die, each value from one through six has probability $1/6$, and the mean is $3.5=7/2$. The law of the unconscious statistician gives

$$
\begin{aligned}
\mathbb{E}[X^2]
&=\frac16(1^2)+\frac16(2^2)+\frac16(3^2)
+\frac16(4^2)+\frac16(5^2)+\frac16(6^2)\\
&=\frac{91}{6}.
\end{aligned}
$$

Thus

$$
\operatorname{Var}(X)=\frac{91}{6}-(3.5)^2\approx2.92.
$$

The variance is the expected squared distance from $3.5$. The standard deviation is approximately $\sqrt{2.92}$ and has the same units as the die result.

---

## Randomized Homework Returns: A Full Indicator Walkthrough
Randomly hand back the class's homeworks and count how many students receive their own. The balloon version is equivalent: each student receives a randomly assigned balloon, and the count records whose balloon has their own name.
Let $I_i$ indicate whether student $i$ receives their own homework:

$$
I_i=
\begin{cases}
1,&\text{student }i\text{ gets their own homework},\\
0,&\text{otherwise}.
\end{cases}
\qquad
X=\sum_{i=1}^{n}I_i.
$$

Each student has probability $1/n$ of receiving their own homework. By linearity,

$$
\mathbb{E}[X]=\sum_{i=1}^{n}\mathbb{E}[I_i]
=n\cdot\frac1n=1.
$$

The new question is how dispersed the count is. To compute its variance, the lecture calculates $\mathbb{E}[X^2]$.

### Expand the squared sum
The square consists of individual squares and twice the products of distinct indicators:

$$
X^2=\sum_{i=1}^{n}I_i^2+2\sum_{1\le i<j\le n}I_iI_j.
$$

Taking expectations gives

$$
\mathbb{E}[X^2]
=\sum_{i=1}^{n}\mathbb{E}[I_i^2]
+2\sum_{i<j}\mathbb{E}[I_iI_j].
$$

This separates the problem into two kinds of terms.

### Individual indicator squares contribute one in total
An indicator takes only zero and one, so squaring leaves it unchanged. Thus

$$
\mathbb{E}[I_i^2]=\mathbb{E}[I_i]=\frac1n,
\qquad
\sum_{i=1}^{n}\mathbb{E}[I_i^2]=1.
$$

This is the same observation used for the Bernoulli example.

### The expectation of an indicator product is a joint probability
For $I_iI_j$, there are four combinations of indicator values. Three combinations, $(0,0)$, $(0,1)$, and $(1,0)$, produce zero. Only $(1,1)$ produces one. Consequently,

$$
\mathbb{E}[I_iI_j]=\Pr(I_i=1,\ I_j=1).
$$

This was the central reusable fact emphasized in the walkthrough: the expectation of the product of two indicators is the probability that both indicated events occur. It does not require the events to be independent.

### Compute the probability that both students get their own homework
The first student has probability $1/n$ of getting their own homework. Conditional on that success, that student and homework are removed from consideration. The second student now has one correct homework among $n-1$ remaining homeworks, giving

$$
\begin{aligned}
\Pr(I_i=1,\ I_j=1)
&=\Pr(I_i=1)\Pr(I_j=1\mid I_i=1)\\
&=\frac1n\cdot\frac1{n-1}.
\end{aligned}
$$

The proposed alternative $1/n^2$ is incorrect here: the first success changes the second student's chance. Therefore

$$
\mathbb{E}[I_iI_j]=\frac1{n(n-1)}.
$$

### Count the cross terms
There are $\binom{n}{2}$ pairs with $i<j$. For example, four people produce six distinct pairs, matching $4\cdot3/2$. Thus the full cross-term contribution is

$$
\begin{aligned}
2\sum_{i<j}\mathbb{E}[I_iI_j]
&=2\binom{n}{2}\frac1{n(n-1)}\\
&=2\cdot\frac{n(n-1)}2\cdot\frac1{n(n-1)}\\
&=1.
\end{aligned}
$$

The two parts combine to give

$$
\mathbb{E}[X^2]=1+1=2.
$$

Finally,

$$
\operatorname{Var}(X)=2-1^2=1.
$$

The lecture emphasized that this result does not grow with the class size. Even with many students, the count clusters near one rather than commonly reaching ten or twenty. Simulations showed averages near one and an experimental variance near one; one reported run gave $1.02$. The calculation supplies a measure of dispersion, rather than an exact tail probability.

---

## Sums of Dice and the Growth of Spread
The distribution of a sum need not remain in the same distribution family as its terms. The lecture recalled the Poisson sum example, but cautioned against assuming arbitrary sums of Bernoulli, binomial, or geometric variables retain the original type without checking parameters.
Dice show how sums change shape. One die has a flat distribution; two dice produce a distribution that rises and then falls; three and four dice have increasingly bell-like shapes. The lecture mentioned convolution as the operation relating the probability mass functions, but left it outside CS70's treatment.
For independent fair six-sided dice, the means for one, two, three, and four dice are $3.5$, $7$, $10.5$, and $14$. For $n$ dice, the stated formulas are

$$
\mathbb{E}[S_n]=3.5n,
\qquad
\operatorname{Var}(S_n)\approx2.92n,
\qquad
\operatorname{SD}(S_n)\approx1.7\sqrt n.
$$

The standard deviation grows more slowly than the mean: quadrupling the number of dice doubles the standard deviation. The lecture described the sums as concentrating around their means relative to the growth of the sums. The variance itself still grows linearly; the slower-growth comparison concerns standard deviation.

---

## Why Independent Variances Add
Linearity of expectation holds without independence, but variance is not additive in general. The lecture derived the extra term explicitly before using independence to eliminate it.

### Expand the two pieces of the variance
First,

$$
\begin{aligned}
\mathbb{E}[(X+Y)^2]
&=\mathbb{E}[X^2+2XY+Y^2]\\
&=\mathbb{E}[X^2]+2\mathbb{E}[XY]+\mathbb{E}[Y^2].
\end{aligned}
$$

Second, linearity gives

$$
\begin{aligned}
(\mathbb{E}[X+Y])^2
&=(\mathbb{E}[X]+\mathbb{E}[Y])^2\\
&=(\mathbb{E}[X])^2+2\mathbb{E}[X]\mathbb{E}[Y]+(\mathbb{E}[Y])^2.
\end{aligned}
$$

Subtract and collect the terms involving only $X$, only $Y$, and both variables:

$$
\begin{aligned}
\operatorname{Var}(X+Y)
&=\left(\mathbb{E}[X^2]-(\mathbb{E}[X])^2\right)
+\left(\mathbb{E}[Y^2]-(\mathbb{E}[Y])^2\right)\\
&\quad+2\left(\mathbb{E}[XY]-\mathbb{E}[X]\mathbb{E}[Y]\right).
\end{aligned}
$$

The first two groups are the individual variances. The remaining expression is the term that must vanish for additivity.

### Factor the expectation of a product under independence
Write the product expectation using the joint distribution:

$$
\mathbb{E}[XY]
=\sum_{a\in\operatorname{range}(X)}\sum_{b\in\operatorname{range}(Y)}
ab\Pr(X=a,Y=b).
$$

The instructor paired this notation with a four-sided die $X$ and a six-sided die $Y$. There are $24$ combinations. One term is $2\cdot5\Pr(X=2,Y=5)$, representing a product of ten from those particular die results.
Independence supplies the key step:

$$
\Pr(X=a,Y=b)=\Pr(X=a)\Pr(Y=b).
$$

Now group each value with its own probability and separate the sums:

$$
\begin{aligned}
\mathbb{E}[XY]
&=\sum_a\sum_b
\left(a\Pr(X=a)\right)\left(b\Pr(Y=b)\right)\\
&=\left(\sum_a a\Pr(X=a)\right)
\left(\sum_b b\Pr(Y=b)\right)\\
&=\mathbb{E}[X]\mathbb{E}[Y].
\end{aligned}
$$

The cross term therefore cancels, proving that independent variables satisfy

$$
\operatorname{Var}(X+Y)=\operatorname{Var}(X)+\operatorname{Var}(Y).
$$

For independent variables with the same distribution, summing $n$ terms gives $n$ times the individual mean and $n$ times the individual variance. The mean statement does not require independence; the variance statement here uses it. This accounts for the dice formulas above.

---

## Covariance: The Extra Term and Its Meaning
The quantity left in the variance-of-a-sum calculation has a name:

$$
\operatorname{Cov}(X,Y)
=\mathbb{E}[XY]-\mathbb{E}[X]\mathbb{E}[Y].
$$

Thus the general formula is

$$
\operatorname{Var}(X+Y)
=\operatorname{Var}(X)+\operatorname{Var}(Y)
+2\operatorname{Cov}(X,Y).
$$

Covariance describes how two quantities vary together. Independence implies zero covariance because the product expectation factors. The converse does not follow: zero covariance need not mean independence.

### Drawing a red card followed by a black card
Draw two cards from a deck without replacing the first. Let $R_1$ indicate that the first card is red, and let $B_2$ indicate that the second card is black.
Both indicators have expectation $1/2$. The second expectation is unconditional: it describes the second draw overall, rather than conditioning on the first card being red.
The indicator-product rule gives

$$
\mathbb{E}[R_1B_2]=\Pr(R_1=1,B_2=1).
$$

Use conditional probability:

$$
\begin{aligned}
\Pr(R_1=1,B_2=1)
&=\Pr(B_2=1\mid R_1=1)\Pr(R_1=1)\\
&=\frac{26}{51}\cdot\frac{26}{52}\\
&=\frac{13}{51}.
\end{aligned}
$$

After a red card is removed, all $26$ black cards remain among $51$ cards. Consequently,

$$
\operatorname{Cov}(R_1,B_2)=\frac{13}{51}-\frac14>0.
$$

The sign matches the intuition: a red first card makes a black second card more likely. The exact value is $1/204\approx0.0049$.

### Drawing red twice
Let $R_2$ indicate that the second card is red. Removing a red card on the first draw makes the second red less likely. The instructor therefore described $\operatorname{Cov}(R_1,R_2)$ as negative and reported approximately $-0.0049$. The exact value is $-1/204$.

---

## Student Data as Random Variables
The lecture used midterm and discussion scores to connect the formal definitions to data analysis. A random variable is still a function from outcomes to real values; here the outcomes are students.
Choose a student uniformly at random. Define $M$ to return that student's midterm score and $D$ to return that student's discussion score. The sample space is the set of students, not the numerical scores. The range consists of the score values those students have.
The midterm example had $342$ students, and the instructor said all listed midterm scores were unique. Each particular listed score therefore had probability $1/342$. The nominal exam range went from zero to $1100$, but nobody in the displayed data received the maximum.

### Compute covariance from paired observations
To obtain $\operatorname{Cov}(D,M)$, compute three quantities: the mean discussion score, the mean midterm score, and the mean of the products of paired scores. For each student, multiply that student's discussion score by that same student's midterm score, then average the products. Substitute into

$$
\operatorname{Cov}(D,M)=\mathbb{E}[DM]-\mathbb{E}[D]\mathbb{E}[M].
$$

The first reported result was $1445.319$, which is positive. Its magnitude is hard to interpret directly because the units combine discussion points with midterm points. Another stated value is $1455.3$; the precise numerical covariance is uncertain.

### Association does not establish causation
Positive covariance indicates association between discussion and midterm scores. It does not by itself establish that attending discussion causes a higher score. The instructor explicitly rejected that causal interpretation as unsupported by this calculation and said causal inference would require additional work outside the course's scope.

---

## Zero Covariance Can Coexist with Dependence
A displayed joint-distribution example had the property that at least one of $X$ and $Y$ was always zero. The instructor used a calculation, rather than intuition alone, to disprove independence.
The relevant marginals were $\Pr(X=1)=1/5$ and $\Pr(Y=1)=1/5$, but the joint event was impossible:

$$
\Pr(X=1,Y=1)=0
\ne\Pr(X=1)\Pr(Y=1)=\frac15\cdot\frac15.
$$

One failed factorization is enough to show that the variables are dependent. Intuitively, learning that one variable equals one forces the other to be zero.
For covariance, however, the product is always zero, so $\mathbb{E}[XY]=0$. The stated marginal calculation for $X$ was

$$
\mathbb{E}[X]
=(-1)\frac15+0\frac35+1\frac15=0.
$$

The lecture also used $\mathbb{E}[Y]=0$. Therefore

$$
\operatorname{Cov}(X,Y)=0-0\cdot0=0.
$$

This example establishes that dependence can remain even when covariance vanishes. These calculations rely on the stated marginals, zero means, and the fact that the product is always zero; a complete joint table is not included.

---

## Standardizing a Random Variable
Let $\mu$ denote the mean of $X$ and $\sigma$ its standard deviation. The standardized version is

$$
\widetilde X=\frac{X-\mu}{\sigma}.
$$

Subtracting the mean shifts the variable, and dividing by the standard deviation rescales it. The result has mean zero and variance one. The outcomes in the sample space and their probabilities remain unchanged; only the numerical value assigned to each outcome changes.

### Example: Four flips with success probability one quarter
For the binomial example with $n=4$ and $p=1/4$, express $X$ as a sum of independent flip indicators. Each has expectation $p$ and variance $p(1-p)$. Consequently,

$$
\mathbb{E}[X]=np=4\cdot\frac14=1,
$$

and

$$
\operatorname{Var}(X)=np(1-p)
=4\cdot\frac14\cdot\frac34=\frac34=0.75.
$$

The standardized variable is therefore

$$
\widetilde X=\frac{X-1}{\sqrt{0.75}}.
$$

The original outcomes map to the values $0,1,2,3,4$. Standardization replaces those values by their shifted and rescaled versions. It does not change the coin-flip sequences or their probabilities. In particular, zero maps to $-1/\sqrt{0.75}\approx-1.155$.

### Prove the standardized mean is zero
By linearity and the fact that $\mu$ is a constant,

$$
\begin{aligned}
\mathbb{E}[\widetilde X]
&=\frac1\sigma\left(\mathbb{E}[X]-\mathbb{E}[\mu]\right)\\
&=\frac{\mu-\mu}{\sigma}=0.
\end{aligned}
$$

### Prove the standardized variance is one
Use the scaling and shifting rules from the previous lecture:

$$
\begin{aligned}
\operatorname{Var}(\widetilde X)
&=\operatorname{Var}\!\left(\frac{X-\mu}{\sigma}\right)\\
&=\frac1{\sigma^2}\operatorname{Var}(X-\mu)\\
&=\frac1{\sigma^2}\operatorname{Var}(X)\\
&=\frac{\sigma^2}{\sigma^2}=1.
\end{aligned}
$$

Pulling a constant out of a variance squares it; shifting by the mean does not affect the variance.

### The standardized second moment is also one
Start from the variance identity and work backward:

$$
\operatorname{Var}(\widetilde X)
=\mathbb{E}[\widetilde X^2]-(\mathbb{E}[\widetilde X])^2.
$$

Since the mean is zero and the variance is one,

$$
1=\mathbb{E}[\widetilde X^2]-0,
\qquad
\mathbb{E}[\widetilde X^2]=1.
$$

The instructor highlighted this as useful in the notes' proof of the correlation bound, without presenting that full proof in lecture.

### Why standardization is useful
Putting variables on the same scale helps compare exam distributions across semesters. The instructor reported maximum standardized scores of $2.82$ for the fall 2024 CS70 midterm and $1.77$ for fall 2025, with no corresponding answer for fall 2026's grading setup.
The lecture also mentioned bringing features onto the same scale for ridge or Lasso regression so one dimension is not disproportionately penalized. Standardized variables can simplify proofs as well, including the correlation argument mentioned above. No regression derivation was given.

---

## Covariance Properties and Bilinearity
The lecture collected useful identities and stated that their proofs were available in extra slides. It did not verbally derive all of them.
Covariance can be written in centered form:

$$
\operatorname{Cov}(X,Y)
=\mathbb{E}[(X-\mathbb{E}[X])(Y-\mathbb{E}[Y])].
$$

Adding constants does not affect covariance, while scaling the variables scales the covariance by the product of the constants:

$$
\operatorname{Cov}(X+c,Y+d)=\operatorname{Cov}(X,Y),
$$

$$
\operatorname{Cov}(aX,bY)=ab\operatorname{Cov}(X,Y).
$$

A particularly useful identity is

$$
\operatorname{Cov}(X,X)=\operatorname{Var}(X).
$$

### Bilinearity expands all pairs of terms
The general rule discussed in lecture was

$$
\operatorname{Cov}\!\left(\sum_i a_iX_i,\sum_j b_jY_j\right)
=\sum_i\sum_j a_ib_j\operatorname{Cov}(X_i,Y_j).
$$

Pair each term from the first argument with each term from the second, multiply the coefficients, and add the resulting covariances.

### Walkthrough: Two linear combinations
The coefficient assignments in the lecture specify the expression

$$
\operatorname{Cov}(X+2Y,3X-Y).
$$

For the first argument, the terms are $a_1=1$, $X_1=X$, $a_2=2$, and $X_2=Y$. For the second, they are $b_1=3$, $Y_1=X$, $b_2=-1$, and $Y_2=Y$. Here $Y_1$ is the label for a term in the second argument; that term is the original variable $X$.
Expand all four pairings:

$$
\begin{aligned}
\operatorname{Cov}(X+2Y,3X-Y)
&=(1)(3)\operatorname{Cov}(X,X)
+(1)(-1)\operatorname{Cov}(X,Y)\\
&\quad+(2)(3)\operatorname{Cov}(Y,X)
+(2)(-1)\operatorname{Cov}(Y,Y)\\
&=3\operatorname{Var}(X)-\operatorname{Cov}(X,Y)
+6\operatorname{Cov}(Y,X)-2\operatorname{Var}(Y).
\end{aligned}
$$

The self-covariance terms become variances.

### A suggested use for differences
The instructor suggested starting a variance-of-a-difference calculation by writing

$$
\operatorname{Var}(X-Y)=\operatorname{Cov}(X-Y,X-Y).
$$

Bilinearity can then expand the expression into simpler covariances. This is a useful technique for calculating the variance of a difference.

---

## Correlation: Rescaling Covariance
Raw covariance depends on the units of both variables. For the student-data example, the units combine discussion points and midterm points, making a number around $1445$ difficult to interpret directly.
Correlation divides covariance by the product of the standard deviations:

$$
\operatorname{Corr}(X,Y)
=\frac{\operatorname{Cov}(X,Y)}{\operatorname{SD}(X)\operatorname{SD}(Y)}.
$$

The lecture stated the bound

$$
-1\le\operatorname{Corr}(X,Y)\le1,
$$

and referred to the course notes for its proof. Positive correlation indicates positive linear association; perfect correlation and perfect anticorrelation correspond to exact affine relationships with positive and negative slopes, respectively.
For the midterm and discussion scores, the instructor divided the covariance by the two standard deviations and reported a correlation of $0.26$. The interpretation given was positive association that was not especially strong. As with covariance, this observation alone does not establish causation.

---

## Mathematical Clarifications

The homework-permutation calculation assumes $n\ge2$. For $n=1$, the number of fixed points is always one and its variance is zero.

Standardization and correlation require positive, finite standard deviations. For dice sums, both the mean and variance grow proportionally to $n$, while the standard deviation grows proportionally to $\sqrt n$.

The student-score correlation of $0.26$ is an illustrative reported value. The individual standard deviations are not included, so that value cannot be independently recomputed from the summary alone.
