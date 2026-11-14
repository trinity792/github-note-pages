---
title: Tentative Reference for Random Variables & Discrete Distributions, Expectation & Linearity, Joint Distributions & Independence of RVs
Content Type: Complementary Note
Content Area:
Course:
description:
pinned: false
Date Published: November 8th, 2026 - 3:08 PM
Last Updated: November 8th, 2026 - 3:08 PM
Status: Updating
---
This reference covers everything from this session, in the order the ideas build on each other.

---

## 1. Core objects

| Symbol               | Name                          | What it is                                          | Coin example (4 tosses)                                |
| -------------------- | ----------------------------- | --------------------------------------------------- | ------------------------------------------------------ |
| $\Omega$             | Sample space                  | The set of all outcomes                             | All 16 sequences of H/T                                |
| $\omega$             | Outcome                       | One element of $\Omega$                             | $\text{HTHH}$                                          |
| $\mathbb{P}[\omega]$ | Outcome probability           | Shorthand for $\mathbb{P}[{\omega}]$                | $\tfrac{1}{16}$ (fair coin)                            |
| $A$                  | Event                         | A set of outcomes, $A \subseteq \Omega$             | "at least 3 heads"                                     |
| $X$                  | Random variable               | A function $X : \Omega \to \mathbb{R}$              | Number of heads                                        |
| $X(\omega)$          | Value of $X$ at $\omega$      | A real number                                       | $X(\text{HTHH}) = 3$                                   |
| $X = a$              | Event                         | ${\omega \in \Omega : X(\omega) = a}$               | ${\text{HHHT}, \text{HHTH}, \text{HTHH}, \text{THHH}}$ |
| $\mathbb{P}[X = a]$  | Probability                   | A number in $[0, 1]$                                | $\tfrac{4}{16}$                                        |
| $\mathcal{A}$        | Set of possible values of $X$ | Every value $X$ outputs on some outcome (its range) | ${0, 1, 2, 3, 4}$                                      |
| $\mathbb{E}[X]$      | Expectation                   | A real number                                       | $2$                                                    |
|                      |                               |                                                     |                                                        |

### Type-checking

$X$ takes outcomes to numbers. $\mathbb{P}$ takes events (sets of outcomes) to numbers in $[0,1]$. Check what each expression takes in and puts out:

|Expression|Type|
|---|---|
|$X$|Random variable (a function)|
|$X(\omega)$, $\mathbb{E}[X]$|Real number|
|$X = a$, ${\omega}$, $A$|Event|
|$\mathbb{P}[X = a]$, $\mathbb{P}[A]$|Number in $[0, 1]$|
|$\mathbb{P}[X(\omega)]$, $\mathbb{P}[3]$|**Nonsense**: $\mathbb{P}$ applied to a number|

---

## 2. Distributions

The **distribution** of $X$ is the collection of pairs

$$  
{(a, \mathbb{P}[X = a]) : a \in \mathcal{A}}.  
$$

The set of values says _what_ can happen. The distribution says _how likely_ each value is. Every distribution satisfies:

1. $\mathbb{P}[X = a] \ge 0$ for every $a$.
2. $\sum_{a \in \mathcal{A}} \mathbb{P}[X = a] = 1$. The events ${X = a}$ partition $\Omega$, since each outcome gives exactly one value.

### Computing $\mathbb{P}[X = a]$

|Situation|Formula|
|---|---|
|General|$\mathbb{P}[X = a] = \sum_{\omega ,:, X(\omega) = a} \mathbb{P}[\omega]$|
|All outcomes equally likely|$\mathbb{P}[X = a] = \dfrac{\lvert{\omega : X(\omega) = a}\rvert}{\lvert\Omega\rvert}$ (count, then divide)|
|Independent trials|$\mathbb{P}[\omega]$ is the product of the per-trial probabilities, e.g. $\mathbb{P}[\text{HTHH}] = p^3(1-p)$|

Constraints like "proportional to $k$": write $\mathbb{P}[X = k] = ck$ and solve for $c$ using the sum-to-1 condition. Example: a die with $\mathbb{P}[X=k] \propto k$ gives $21c = 1$, so $\mathbb{P}[X = k] = \tfrac{k}{21}$.

### Binomial coefficient

$$  
\binom{n}{k} = \frac{n!}{k!,(n-k)!} = \frac{n(n-1)\cdots(n-k+1)}{k!}  
$$

This is the number of ways to choose $k$ items from $n$ when order doesn't matter, such as which $k$ of the $n$ tosses are heads. Note that $\binom{n}{k} = \binom{n}{n-k}$ and $0! = 1$.

---

## 3. Named distributions

Write these as $X \sim \text{Name}(\text{parameters})$, **with actual values** for the parameters. Parameters are fixed constants that pick one specific distribution from a family. Don't confuse them with the values $k$ that $X$ takes.

|Distribution|Parameters|Models|Values|$\mathbb{P}[X = k]$|$\mathbb{E}[X]$|
|---|---|---|---|---|---|
|$\text{Bernoulli}(p)$|$p \in [0,1]$|One trial; 1 = success|${0, 1}$|$\mathbb{P}[X=1] = p$, $\mathbb{P}[X=0] = 1-p$|$p$|
|$\text{Binomial}(n, p)$|$n \in \mathbb{Z}^+$, $p \in [0,1]$|Successes in $n$ independent trials|${0, \dots, n}$|$\binom{n}{k}p^k(1-p)^{n-k}$|$np$|
|$\text{Geometric}(p)$|$p \in (0, 1]$|Trials up to and including the first success|${1, 2, \dots}$|$(1-p)^{k-1}p$|$\tfrac{1}{p}$|
|$\text{Poisson}(\lambda)$|$\lambda > 0$|Count of rare events at average rate $\lambda$|${0, 1, \dots}$|$\dfrac{e^{-\lambda}\lambda^k}{k!}$|$\lambda$|
|$\text{Uniform}{1, \dots, n}$|$n \in \mathbb{Z}^+$|One value picked uniformly at random|${1, \dots, n}$|$\tfrac{1}{n}$|$\tfrac{n+1}{2}$|

**Examples:** 4 fair tosses gives $\text{Binomial}(4, \tfrac12)$. A fair die gives $\text{Uniform}{1, \dots, 6}$. The number of sixes in 3 rolls gives $\text{Binomial}(3, \tfrac16)$. A general biased die isn't a named distribution in CS70: describe it by listing $p_1, \dots, p_6$.

---

## 4. Expectation

### Definition

$$  
\mathbb{E}[X] = \sum_{a \in \mathcal{A}} a \cdot \mathbb{P}[X = a] = \sum_{\omega \in \Omega} X(\omega) \cdot \mathbb{P}[\omega].  
$$

This is a weighted average of the values, with probabilities as the weights. The two forms always agree: the first is the second with outcomes grouped by their value of $X$.

### Interpretation

$\mathbb{E}[X]$ is the long-run average of $X$ over many repetitions. It **doesn't have to be a possible value** (a fair die has $\mathbb{E}[X] = 3.5$), and it doesn't tell you what typically happens. $X = 0$ w.p. $0.99$ and $X = 100$ w.p. $0.01$ has $\mathbb{E}[X] = 1$.

### Linearity of expectation

$$  
\mathbb{E}[X_1 + X_2 + \cdots + X_n] = \mathbb{E}[X_1] + \mathbb{E}[X_2] + \cdots + \mathbb{E}[X_n].  
$$

This holds **even when the $X_i$ are not independent.**

---

## 5. Indicator random variables

### Definition

$$  
I_A(\omega) = \begin{cases} 1 & \omega \in A \ 0 & \omega \notin A \end{cases}  
\qquad\qquad  
I_A \sim \text{Bernoulli}(\mathbb{P}[A]), \qquad \mathbb{E}[I_A] = \mathbb{P}[A].  
$$

An indicator's set of possible values is always ${0, 1}$. The event $A$ (like ${2, 4, 6}$) is the set of _inputs_ where it outputs 1. That's a different object from its set of values.

### Expressing a count as a sum

$Y = Y_1 + \cdots + Y_n$ is an equality of functions: it must hold for **every** outcome $\omega$. If $Y$ counts how many of the events $A_1, \dots, A_n$ happen, then

$$  
Y = \sum_{i=1}^{n} I_{A_i} \quad\Longrightarrow\quad \mathbb{E}[Y] = \sum_{i=1}^{n} \mathbb{P}[A_i],  
$$

which simplifies to $n \cdot \mathbb{P}[A_i]$ **only if** every $\mathbb{P}[A_i]$ is equal. Here $\mathbb{P}[A_i]$ is the probability of an event (roll $i$ is a six: $\tfrac16$), not of a single outcome ($\tfrac{1}{216}$). And $n$ is the number of indicators, not $\lvert\Omega\rvert$.

### Recipe for "Express $Y$ as a sum…"

1. **Define** each indicator in words: "For $i = 1, \dots, n$, let $I_i = 1$ if [event], and 0 otherwise." Someone reading only this should be able to compute $I_i(\omega)$ for any outcome.
2. **State the range of $i$**, including what $n$ is.
3. **Write the sum** $Y = I_1 + \cdots + I_n$, ideally with a one-line reason ("each six contributes exactly 1").
4. For the expectation: find $\mathbb{P}[A_i]$ and add.

### Worked results

|Setup|Indicator $I_i = 1$ when…|$\mathbb{E}[\cdot]$|
|---|---|---|
|Heads in $n$ tosses|toss $i$ is heads|$np$|
|Sixes in 3 rolls|roll $i$ is a 6|$3 \cdot \tfrac16 = \tfrac12$|
|Even rolls in 3 rolls|roll $i \in {2, 4, 6}$|$3 \cdot \tfrac12 = \tfrac32$|
|Fixed points of a random shuffle of $n$ cards|card $i$ stays in place|$n \cdot \tfrac1n = 1$ for every $n$|
|Sixes on one fair die and one six-biased die ($\tfrac12$)|die $i$ shows 6|$\tfrac16 + \tfrac12 = \tfrac23$|

---

## 6. Common pitfalls

- An **outcome** $\omega$ is not an **event**. $\mathbb{P}[\omega]$ really means $\mathbb{P}[{\omega}]$.
- $\mathbb{P}[{\text{HTHH}}] = p^3(1-p)$, but $\mathbb{P}[X = 3] = 4p^3(1-p)$. The event $X = 3$ contains four outcomes.
- $\mathbb{E}[X] = 1$ is not the same as $\mathbb{P}[A] = 1$. They only coincide for indicators.
- "Possible values" means _all_ possible values, however unlikely. Likelihood lives in the distribution.
- A named distribution needs its parameters filled in with numbers: $\text{Binomial}(10, \tfrac16)$, not $\text{Binomial}(n, p)$.
- On quizzes, exact unsimplified forms like $\dfrac{6^2}{7^4}$ are usually fine and show your reasoning.

---

I can also save this as a note in your CS70 folder, formatted to your vault's markdown conventions.