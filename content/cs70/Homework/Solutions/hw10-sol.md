---
title: CS 70 HW 10 Solutions — Random Variables and Linearity of Expectation
Content Type: Review
Content Area: Probability
description: "Official HW 10 solutions, each placed directly under its question: distributions, expectation, indicators and linearity, joint distributions and independence, Bernoulli, Binomial, Geometric, and Poisson models, and the swaps-and-cycles and office-hour-queue stretch problems."
Course: CS 70
pinned: false
Date Published: November 12, 2026
Last Updated: November 12, 2026
Status: Finalized
---

# CS 70 HW 10 Solutions — Random Variables and Linearity of Expectation
Each part's official solution follows directly after its question.

---

## 1. Random Variables and Discrete Distributions Basics
**Related course note:** [[cs70/Course Notes/N19 Random Variables - Distribution and Expectation|Note 19 — Random Variables: Distribution and Expectation]].
Xandy finds a suspicious coin that has a $\frac{6}{7}$ chance of landing Heads on each flip. Xandy flips the coin $5$ times. Let $X$ denote the number of Heads in Xandy's $5$-flip sequence.
### (a) Random Variable Notation
Let's familiarize ourselves with the notation we use when working with random variables! Here, $\omega$ is an outcome in our sample space, and $k$ is a real number.
Match each expression on the left with the most specific description on the right.

| Expression                   | Description                                                      |
| ---------------------------- | ---------------------------------------------------------------- |
| i. $X$                       | A. A number between 0 and 1, inclusive.                          |
| ii. $X(\omega)$              | B. A real number.                                                |
| iii. $\mathbb{P}[X(\omega)]$ | C. An event (a set of outcomes).                                 |
| iv. $X=k$                    | D. A random variable (a function from outcomes to real numbers). |
| v. $\mathbb{P}[X=k]$         | E. A nonsensical expression.                                     |

#### Solution
| Expression | Answer | Description |
|---|---|---|
| i. $X$ | D | A random variable (a function from outcomes to real numbers). |
| ii. $X(\omega)$ | B | A real number. |
| iii. $\mathbb{P}[X(\omega)]$ | E | A nonsensical expression. |
| iv. $X=k$ | C | An event (a set of outcomes). |
| v. $\mathbb{P}[X=k]$ | A | A number between 0 and 1, inclusive. |

**Explanation:** $X$ is a random variable, a function mapping outcomes in the sample space to real numbers. So $X(\omega)$ is the real number that $X$ assigns to the outcome $\omega$. $\mathbb{P}[X(\omega)]$ does not make sense, since $X(\omega)$ is a real number and not an event. $X=k$ is the set of outcomes that $X$ maps to the real number $k$, so it is an event. $\mathbb{P}[X=k]$ is the probability that the event $X=k$ occurs; as a probability, it is a number between $0$ and $1$, inclusive.

### (b) One Outcome
$THTHT$ is one possible outcome. What is $X(THTHT)$, and what is $\mathbb{P}[THTHT]$?
#### Solution
$X(THTHT)=2$, since $THTHT$ has $2$ Heads.

Each Head has probability $\frac{6}{7}$ and each Tail has probability $1-\frac{6}{7}=\frac{1}{7}$, so

$$
\mathbb{P}[THTHT]=\frac{1}{7}\cdot\frac{6}{7}\cdot\frac{1}{7}\cdot\frac{6}{7}\cdot\frac{1}{7}=\left(\frac{6}{7}\right)^2\left(\frac{1}{7}\right)^3.
$$
### (c) The Event $X=2$
How many outcomes are in the event $X=2$? What is $\mathbb{P}[X=2]$?
#### Solution
$\binom{5}{2}=10$ outcomes. There are $\binom{5}{2}$ ways to choose which $2$ flips are Heads, and the other $3$ must be Tails.

Each outcome in the event $X=2$ has probability $\left(\frac{6}{7}\right)^2\left(\frac{1}{7}\right)^3$: the $2$ Heads occur with probability $\left(\frac{6}{7}\right)^2$, and the $5-2=3$ Tails occur with probability $\left(\frac{1}{7}\right)^3$. Thus

$$
\mathbb{P}[X=2]=\binom{5}{2}\left(\frac{6}{7}\right)^2\left(\frac{1}{7}\right)^3.
$$
### (d) The Distribution of $X$
Let's find $X$'s distribution. To specify a random variable's distribution, we provide $2$ things:
#### (i)
What is the set of possible values for $X$? (Ex: $2$ is a possible value by part (c).)
**Solution:**
A $5$-flip sequence can have $0,1,2,3,4$, or $5$ Heads, so the set of possible values of $X$ is $\{0,1,2,3,4,5\}$.
#### (ii)
For each possible value $k$, what is $\mathbb{P}[X=k]$? Write your answer in terms of $k$.
**Solution:**
For each possible value $k$, there are $\binom{5}{k}$ ways to choose which $k$ of the $5$ flips are Heads. Each such outcome has probability $\left(\frac{6}{7}\right)^k$ for the $k$ Heads and $\left(\frac{1}{7}\right)^{5-k}$ for the $5-k$ Tails. Thus

$$
\mathbb{P}[X=k]=\binom{5}{k}\left(\frac{6}{7}\right)^k\left(\frac{1}{7}\right)^{5-k}.
$$
### (e) Naming the Distribution
The distribution of $X$ we found in part (d) is a named distribution. What is the name of the distribution, and what are its parameters?
> [!note] Notation
> In CS 70, write named distributions in the form $X\sim\text{DistributionName}(\text{parameter(s)})$, specifying the value of each parameter.

#### Solution
$X\sim\text{Binomial}\left(5,\frac{6}{7}\right)$. There are $n=5$ independent coin flips, and each has the same probability $p=\frac{6}{7}$ of success (landing Heads).

---

## 2. Expectation and Linearity of Expectation Basics
**Related course notes:** [[cs70/Course Notes/N19 Random Variables - Distribution and Expectation|Note 19 — Random Variables: Distribution and Expectation]] and [[cs70/Course Notes/N20 Random Variables II - Linearity of Expectation|Note 20 — Random Variables II, Linearity of Expectation]].
Ethelyn rolls a fair $6$-sided die with sides labeled $\{1,2,3,1,1,1\}$. Let $X$ denote the number at the top of the die after Ethelyn rolls it. First, we find the distribution of $X$.
### (a) Possible Values
What is the set of possible values that $X$ can take on?
#### Solution
Ethelyn's die can land with a $1$, $2$, or $3$ on top, so $X$ can take on the values in $\{1,2,3\}$.
### (b) Probabilities
For each possible value $k$ that $X$ can take on, what is $\mathbb{P}[X=k]$?
#### Solution
| Probability | Reason |
|---|---|
| $\mathbb{P}[X=1]=\frac{4}{6}=\frac{2}{3}$ | The die has four sides labeled $1$. |
| $\mathbb{P}[X=2]=\frac{1}{6}$ | The die has one side labeled $2$. |
| $\mathbb{P}[X=3]=\frac{1}{6}$ | The die has one side labeled $3$. |

### (c) Expectation from the Definition
To use the definition of expectation, we need the set of possible values of $X$ and their probabilities. Using parts (a)-(b), compute $\mathbb{E}[X]$.
#### Solution
Using the definition of expectation,

$$
\begin{aligned}
\mathbb{E}[X]&=\sum_{k\in\{1,2,3\}}k\cdot\mathbb{P}[X=k]&&\text{(Definition of Expectation)}\\
&=1\cdot\frac{2}{3}+2\cdot\frac{1}{6}+3\cdot\frac{1}{6}\\
&=\frac{3}{2}.
\end{aligned}
$$

Note that $\mathbb{E}[X]=\frac{3}{2}$ is a number, not a random variable, and it is not itself a possible value of $X$. In general, a random variable's expectation does not need to be one of its possible values.
### (d) Values of the Indicator
Let $A$ be the event that Ethelyn rolls an odd number. Let $I_1$ be an indicator random variable for the event $A$.
What is the set of possible values that $I_1$ can take on? Relate these possible values to $A$.
#### Solution
$I_1$ is an indicator random variable for event $A$, so it takes the value $1$ when $A$ occurs and $0$ when $A$ does not occur. The set of possible values is $\{0,1\}$.
### (e) Distribution of the Indicator
For each possible value $k$ that $I_1$ can take on, what is $\mathbb{P}[I_1=k]$?
#### Solution
$I_1=1$ precisely when $A$ occurs. Since $5$ of the $6$ sides of the die have an odd number, $\mathbb{P}[A]=\frac{5}{6}$, so $\mathbb{P}[I_1=1]=\frac{5}{6}$. Likewise, $I_1=0$ precisely when $A$ does not occur, and $\mathbb{P}[I_1=0]=\mathbb{P}[\overline{A}]=\frac{1}{6}$.
### (f) Expectation of the Indicator
Compute $\mathbb{E}[I_1]$. Does your answer equal a quantity you found in part (e)?
#### Solution
Using the definition of expectation,

$$
\begin{aligned}
\mathbb{E}[I_1]&=\sum_{k\in\{0,1\}}k\cdot\mathbb{P}[I_1=k]&&\text{(Definition of Expectation)}\\
&=0\cdot\frac{1}{6}+1\cdot\frac{5}{6}\\
&=\frac{5}{6}\\
&=\mathbb{P}[A].
\end{aligned}
$$

In general, the expectation of an indicator equals the probability that its indicated event occurs.
### (g) A Sum of Random Variables
Suppose that Ethelyn rolls the die $8$ times. Let $Y$ denote the total number of dice rolls that land with an odd number on top.
Express $Y$ as a sum of other random variables. Be sure to define the other random variables you use! [Hint: $I_1$ should be one of the random variables in your sum.]
#### Solution
For $i=1,2,\ldots,8$, let $I_i$ be an indicator random variable for the event that the $i$th roll lands with an odd number on top. Then

$$
Y=\sum_{i=1}^{8}I_i.
$$

Each $I_i$ is $1$ exactly when roll $i$ is odd, so the sum counts the odd rolls.
### (h) Linearity of Expectation
Use Linearity of Expectation to compute $\mathbb{E}[Y]$.
#### Solution
Using Linearity of Expectation,

$$
\begin{aligned}
\mathbb{E}[Y]&=\mathbb{E}\left[\sum_{i=1}^{8}I_i\right]&&\text{(From part (g))}\\
&=\sum_{i=1}^{8}\mathbb{E}[I_i]&&\text{(Linearity of Expectation)}\\
&=\sum_{i=1}^{8}\frac{5}{6}&&\text{(By part (f))}\\
&=8\cdot\frac{5}{6}\\
&=\frac{20}{3}.
\end{aligned}
$$

---

## 3. Joint Distributions and Independence of RVs Basics
**Related course note:** [[cs70/Course Notes/N20 Random Variables II - Linearity of Expectation|Note 20 — Random Variables II, Linearity of Expectation]].
Jefferson finds a box containing $2$ bottles of blue confetti, $2$ bottles of gold confetti, and $1$ bottle with both blue and gold confetti. He grabs $2$ bottles from the box uniformly at random.
Let $B$ denote the number of bottles Jefferson grabbed that contain some blue confetti, and let $G$ denote the number of bottles he grabbed that contain some gold confetti.
### (a) Possible Values
What are the possible values of $B$? of $G$?
#### Solution
Jefferson grabs $2$ bottles, so the number of bottles containing some blue (gold) confetti is $0$, $1$, or $2$. The possible values of $B$ (and of $G$) are $\{0,1,2\}$.
### (b) A Joint Probability
What is $\mathbb{P}[B=0,G=2]$? Describe which bottle selections make this event occur. (Note: for intersections of events involving random variables, we use a comma instead of $\cap$.)
#### Solution
The only way to have $B=0$ and $G=2$ is for Jefferson to grab the $2$ bottles with only gold confetti. There are $\binom{5}{2}$ equally likely ways to choose $2$ bottles from $5$, and $\binom{2}{2}=1$ way to choose both gold-only bottles. Thus

$$
\mathbb{P}[B=0,G=2]=\frac{1}{\binom{5}{2}}=\frac{1}{10}.
$$
### (c) The Joint Distribution
Finish the joint distribution of $B$ and $G$. That is, for each possible value $b$ of $B$ and possible value $g$ of $G$, find $\mathbb{P}[B=b,G=g]$.
#### Solution
| | $G=0$ | $G=1$ | $G=2$ |
|---|---|---|---|
| $B=0$ | $0$ | $0$ | $\frac{1}{10}$ |
| $B=1$ | $0$ | $\frac{4}{10}$ | $\frac{2}{10}$ |
| $B=2$ | $\frac{1}{10}$ | $\frac{2}{10}$ | $0$ |

**Explanation:**
- $\mathbb{P}[B=1,G=1]=\frac{4}{10}$. Jefferson must choose $1$ of the $2$ blue-only bottles and $1$ of the $2$ gold-only bottles, and there are $2\cdot2=4$ ways to do so.
- $\mathbb{P}[B=1,G=2]=\frac{2}{10}$. He must choose the $1$ bottle with both colors, and there are $2$ ways to choose a gold-only bottle. Then both bottles count as having gold confetti, and the two-color bottle also counts as having blue confetti.
- $\mathbb{P}[B=2,G=0]=\frac{1}{10}$, by the same reasoning as part (b).
- $\mathbb{P}[B=2,G=1]=\frac{2}{10}$, for the same reason as $\mathbb{P}[B=1,G=2]$.
- All other combinations have probability $0$, since they are impossible when Jefferson grabs exactly $2$ bottles.

### (d) Marginal Probabilities
With the joint distribution in part (c), Minqing wants to find the marginal distributions of $B$ and $G$.
First, let's find $\mathbb{P}[B=0]$. Which probabilities in part (c) can help us find $\mathbb{P}[B=0]$? Express $\mathbb{P}[B=0]$ in terms of these probabilities and find $\mathbb{P}[B=0]$. Similarly, find $\mathbb{P}[G=2]$.
#### Solution
$\mathbb{P}[B=0,G=0]$, $\mathbb{P}[B=0,G=1]$, and $\mathbb{P}[B=0,G=2]$ are the joint probabilities that help find $\mathbb{P}[B=0]$. By the Law of Total Probability,

$$
\mathbb{P}[B=0]=\mathbb{P}[B=0,G=0]+\mathbb{P}[B=0,G=1]+\mathbb{P}[B=0,G=2]=0+0+\frac{1}{10}=\frac{1}{10}.
$$

In effect, to find $\mathbb{P}[B=0]$ from the joint distribution in part (c), we added up the row of the table where $B=0$. Analogously, to find $\mathbb{P}[G=2]$, we add up the column where $G=2$:

$$
\mathbb{P}[G=2]=\mathbb{P}[B=0,G=2]+\mathbb{P}[B=1,G=2]+\mathbb{P}[B=2,G=2]=\frac{1}{10}+\frac{2}{10}+0=\frac{3}{10}.
$$
### (e) Independent Events
Are $B=0$ and $G=2$ independent? Justify using the definition of independent events.
#### Solution
No, the events $B=0$ and $G=2$ are not independent:

$$
\mathbb{P}[B=0]\,\mathbb{P}[G=2]=\frac{1}{10}\cdot\frac{3}{10}=\frac{3}{100}\ne\frac{1}{10}=\mathbb{P}[B=0,G=2].
$$
### (f) Independent Random Variables
Are $B$ and $G$ independent? Justify using the definition of independent random variables.
#### Solution
For $B$ and $G$ to be independent random variables, we need

$$
\mathbb{P}[B=b,G=g]=\mathbb{P}[B=b]\,\mathbb{P}[G=g]
$$

for every pair of possible values $(b,g)$. That is, every pair of events $B=b$ and $G=g$ would need to be independent. Part (e) found that $B=0$ and $G=2$ are not independent events, so $B$ and $G$ are not independent random variables.

---

## 4. Distributions Warm-Up
**Related course note:** [[cs70/Course Notes/N19 Random Variables - Distribution and Expectation|Note 19 — Random Variables: Distribution and Expectation]].
Suppose you flip a fair coin three times.
### (a) The First Flip
Define a random variable $Y$ to be $1$ if the first flip is heads and $0$ otherwise. What is the distribution of $Y$? Name the distribution and its parameter(s).
#### Solution
$Y=1$ for the four outcomes $HHH$, $HHT$, $HTH$, $HTT$, so

$$
Y=\begin{cases}0&\text{w.p. }1/2\\1&\text{w.p. }1/2\end{cases}
$$

That is, $Y\sim\text{Bernoulli}(1/2)$.
### (b) A Transformed Count
Let $X$ be the number of heads, and define $Z=2X-3$. What does $Z$ represent in words? What is the distribution of $Z$?
#### Solution
There are $3-X$ tails, so $Z=2X-3=X-(3-X)$ is the number of heads minus the number of tails. Since $X\sim\text{Binomial}(3,1/2)$, $X$ is $0,1,2,3$ with probabilities $\frac{1}{8},\frac{3}{8},\frac{3}{8},\frac{1}{8}$. For each $k$, $Z=2k-3$ exactly when $X=k$, so $\mathbb{P}[Z=2k-3]=\mathbb{P}[X=k]$, and

$$
Z=\begin{cases}-3&\text{w.p. }1/8\\-1&\text{w.p. }3/8\\1&\text{w.p. }3/8\\3&\text{w.p. }1/8\end{cases}
$$
### (c) Flipping Until the First Heads
Now suppose you have a biased coin that lands heads with probability $p$, and you flip it until you see the first heads. Let $N$ be the total number of flips (including the heads).
#### (i)
What is the distribution of $N$? Name the distribution and its parameter(s).
**Solution:**
$N=k$ exactly when the first $k-1$ flips are tails and the $k$th flip is heads. By independence of the flips,

$$
\mathbb{P}[N=k]=(1-p)^{k-1}p,\qquad k=1,2,3,\ldots
$$

so $N\sim\text{Geometric}(p)$.
#### (ii)
For an integer $k\geq0$, what is $\mathbb{P}[N>k]$?
**Solution:**
$N>k$ exactly when the first $k$ flips are all tails, so $\mathbb{P}[N>k]=(1-p)^k$.
#### (iii)
Compute $\mathbb{P}[N>5\mid N>2]$ using the definition of conditional probability. How does it compare to $\mathbb{P}[N>3]$? Explain intuitively why this makes sense.
**Solution:**
Since the event $N>5$ is contained in the event $N>2$,

$$
\mathbb{P}[N>5\mid N>2]=\frac{\mathbb{P}[N>5,N>2]}{\mathbb{P}[N>2]}=\frac{\mathbb{P}[N>5]}{\mathbb{P}[N>2]}=\frac{(1-p)^5}{(1-p)^2}=(1-p)^3=\mathbb{P}[N>3].
$$

The two probabilities are equal. Intuitively, knowing that the first $2$ flips were tails tells us nothing about future flips, since they are independent. The process "starts over," and needing more than $3$ additional flips has the same probability as needing more than $3$ flips from the start. This is the memoryless property of the geometric distribution.

---

## 5. Fishy Computations
**Related course note:** [[cs70/Course Notes/N20 Random Variables II - Linearity of Expectation|Note 20 — Random Variables II, Linearity of Expectation]].
> [!note] Note tag in the PDF
> The PDF tags this question "Note 19", but the Poisson distribution is developed in Note 20 in the course notes folder, so the links above point there.

Assume for each part that the random variable can be modelled by a Poisson distribution.
### (a) Salmon
Suppose that on average, a fisherman catches $20$ salmon per week. What is the probability that he will catch exactly $7$ salmon this week?
#### Solution
Let $X$ be the number of salmon the fisherman catches per week. $X\sim\text{Poisson}(20)$, so

$$
\mathbb{P}[X=7]=\frac{20^7}{7!}e^{-20}\approx5.23\cdot10^{-4}.
$$
### (b) Boats
Suppose on average, there are $5.7$ boats that sail in Laguna Beach per day. What is the probability there will be *at least* $3$ boats sailing throughout the *next two days* in Laguna?
#### Solution
Let $S_1$ be the number of sailing boats on the next day and $S_2$ the number on the day after. Model the boats on day $i$ as $S_i\sim\text{Poisson}(\lambda=5.7)$. Let $Z=S_1+S_2$ be the number of boats over the next two days. The sum of two independent Poisson random variables is Poisson, so $Z\sim\text{Poisson}(\lambda=5.7+5.7=11.4)$. Then

$$
\begin{aligned}
\mathbb{P}[Z\ge3]&=1-\mathbb{P}[Z<3]\\
&=1-\mathbb{P}[Z=0\cup Z=1\cup Z=2]\\
&=1-(\mathbb{P}[Z=0]+\mathbb{P}[Z=1]+\mathbb{P}[Z=2])\\
&=1-\left(\frac{11.4^0}{0!}e^{-11.4}+\frac{11.4^1}{1!}e^{-11.4}+\frac{11.4^2}{2!}e^{-11.4}\right)\\
&\approx0.999.
\end{aligned}
$$

---

## 6. Box of Chocolates
**Related course notes:** [[cs70/Course Notes/N19 Random Variables - Distribution and Expectation|Note 19 — Random Variables: Distribution and Expectation]] and [[cs70/Course Notes/N20 Random Variables II - Linearity of Expectation|Note 20 — Random Variables II, Linearity of Expectation]].
Sam received a box of $4$ chocolates for Halloween! The chocolates are priced $\$1$, $\$2$, $\$3$, and $\$4$.
### (a) One Chocolate
Let $X$ be the price of a uniformly random chocolate from the box. Compute $\mathbb{E}[X]$.
#### Solution
Each chocolate is equally likely, so $X$ is uniform on $\{1,2,3,4\}$: $\mathbb{P}[X=k]=\frac{1}{4}$ for $k=1,2,3,4$. By the definition of expectation,

$$
\mathbb{E}[X]=\sum_{k=1}^{4}k\cdot\mathbb{P}[X=k]=\frac{1+2+3+4}{4}=\frac{5}{2},
$$

so the expected price is $\$2.50$.
### (b) Samples With Replacement
At a chocolate shop, a free-sample tray holds the same four chocolates. Sam takes two samples, each uniformly at random, and the staff replace the first sample with an identical chocolate before Sam takes the second sample. Let $X_1$ and $X_2$ be their prices.
#### (i)
Are $X_1$ and $X_2$ independent? Briefly justify.
**Solution:**
Yes. Since the tray is restocked, the second sample is uniform over all four chocolates no matter what the first sample was. Formally, each of the $16$ ordered pairs of prices $(a,b)$ is equally likely, so $\mathbb{P}[X_1=a,X_2=b]=\frac{1}{16}=\mathbb{P}[X_1=a]\,\mathbb{P}[X_2=b]$ for all $a,b$.
#### (ii)
Let $S=X_1+X_2$ be the total value of Sam's two samples. Find the distribution of $S$, and use it to compute $\mathbb{E}[S]$ directly from the definition.
**Solution:**
$S$ takes the values $2,3,\ldots,8$. Counting the ordered pairs $(a,b)$ with $a+b=s$,

$$
S=\begin{cases}2&\text{w.p. }1/16\\3&\text{w.p. }2/16\\4&\text{w.p. }3/16\\5&\text{w.p. }4/16\\6&\text{w.p. }3/16\\7&\text{w.p. }2/16\\8&\text{w.p. }1/16\end{cases}
$$

so

$$
\mathbb{E}[S]=\frac{2\cdot1+3\cdot2+4\cdot3+5\cdot4+6\cdot3+7\cdot2+8\cdot1}{16}=\frac{80}{16}=5.
$$
#### (iii)
Now compute $\mathbb{E}[S]$ using linearity of expectation instead. Do your answers agree?
**Solution:**
Each $X_i$ has the same distribution as $X$ from part (a), so by linearity of expectation,

$$
\mathbb{E}[S]=\mathbb{E}[X_1]+\mathbb{E}[X_2]=\frac{5}{2}+\frac{5}{2}=5.
$$

The answers agree, and linearity takes much less work.
### (c) Eating Two Chocolates
Back at home, Sam eats two chocolates from his box, one after the other, each chosen uniformly at random from the chocolates remaining. Let $X_1$ be the price of the first chocolate and $X_2$ the price of the second.
#### (i)
Are $X_1$ and $X_2$ independent? Briefly justify.
**Solution:**
No. For example, Sam can't eat the same chocolate twice, so $\mathbb{P}[X_1=1,X_2=1]=0$, but $\mathbb{P}[X_1=1]\,\mathbb{P}[X_2=1]=\frac{1}{4}\cdot\frac{1}{4}\ne0$.
#### (ii)
What is the marginal distribution of $X_2$?
**Solution:**
Each of the $4\cdot3=12$ ordered pairs of prices $(a,b)$ with $a\ne b$ is equally likely, and exactly $3$ of them have $b=k$ for each $k$. So $\mathbb{P}[X_2=k]=\frac{3}{12}=\frac{1}{4}$, and $X_2$ is uniform on $\{1,2,3,4\}$, the same as $X_1$. (Intuitively, if you don't look at the first chocolate, the second is equally likely to be any of the four.)
#### (iii)
Compute $\mathbb{E}[X_1+X_2]$ by listing the equally likely pairs of chocolates he could eat and averaging their total prices. Does linearity of expectation give the same answer?
**Solution:**
Identifying each chocolate by its price, the $\binom{4}{2}=6$ equally likely pairs are

$$
\{1,2\},\ \{1,3\},\ \{1,4\},\ \{2,3\},\ \{2,4\},\ \{3,4\},
$$

with total prices $3,4,5,5,6,7$. Their average is $\mathbb{E}[X_1+X_2]=\frac{30}{6}=5$.

Linearity of expectation gives the same answer, even though $X_1$ and $X_2$ are dependent:

$$
\mathbb{E}[X_1+X_2]=\mathbb{E}[X_1]+\mathbb{E}[X_2]=\frac{5}{2}+\frac{5}{2}=5.
$$

This matches part (b): choosing with or without replacement changes the joint distribution of $X_1$ and $X_2$, but not their marginal distributions, and linearity of expectation depends only on those.
### (d) Matching Slots
Sam's next box has four slots labeled $1$ to $4$, and the chocolate priced $\$i$ belongs in slot $i$. Before Sam opens it, Andy rearranges the chocolates among the slots uniformly at random. Slot $i$ is a *match* if it holds the chocolate priced $\$i$. Let $M$ be the total number of matches, and let $I_i$ be the indicator that slot $i$ is a match, so that $M=I_1+I_2+I_3+I_4$.
#### (i)
What is $\mathbb{E}[I_i]$?
**Solution:**
Slot $i$ is equally likely to contain any of the $4$ chocolates, so $\mathbb{E}[I_i]=\mathbb{P}[I_i=1]=\frac{1}{4}$.
#### (ii)
Compute $\mathbb{E}[M]$. What would $\mathbb{E}[M]$ be if the box instead had $n$ chocolates priced $\$1,\ldots,\$n$, with $n$ slots?
**Solution:**
By linearity of expectation (even though the $I_i$ are dependent: for example, if slots $1$, $2$, and $3$ are matches, slot $4$ must be too),

$$
\mathbb{E}[M]=\mathbb{E}[I_1]+\mathbb{E}[I_2]+\mathbb{E}[I_3]+\mathbb{E}[I_4]=4\cdot\frac{1}{4}=1.
$$

With $n$ chocolates, each $\mathbb{E}[I_i]=\frac{1}{n}$, so $\mathbb{E}[M]=n\cdot\frac{1}{n}=1$, no matter what $n$ is.

---

## 7. Testing Model Planes
**Related course notes:** [[cs70/Course Notes/N19 Random Variables - Distribution and Expectation|Note 19 — Random Variables: Distribution and Expectation]] and [[cs70/Course Notes/N20 Random Variables II - Linearity of Expectation|Note 20 — Random Variables II, Linearity of Expectation]].
Amin is testing model planes. He has $n$ model planes, each independently having probability $p$ ($0<p<1$) of flying successfully each time they're flown. Each day, he flies every plane, keeps those that fly successfully (don't crash), and discards all others. He repeats this process many days, where each "day" has Amin fly all remaining planes and discard any that crash. Let $X_i$ be the random variable representing how many model planes remain after $i$ days. (Note that $X_0=n$.) Justify your answers for each part.
### (a) After One Day
What is the distribution of $X_1$? That is, what are the possible values $k$ that $X_1$ can take on, and what is $\mathbb{P}[X_1=k]$?
#### Solution
Amin performs $n$ trials (flying a plane), each with an independent probability $p$ of "success" (not crashing), so $X_1\sim\text{Binomial}(n,p)$:

$$
\mathbb{P}[X_1=k]=\binom{n}{k}p^k(1-p)^{n-k},\qquad0\le k\le n.
$$
### (b) After Two Days
What is the distribution of $X_2$? That is, what are the possible values $k$ that $X_2$ can take on, and what is $\mathbb{P}[X_2=k]$? Name the distribution and its parameter(s).
#### Solution
Each plane independently has probability $p^2$ of surviving both days. Whether a plane survives both days is still independent of whether any other plane does, so $X_2\sim\text{Binomial}(n,p^2)$:

$$
\mathbb{P}[X_2=k]=\binom{n}{k}p^{2k}(1-p^2)^{n-k},\qquad0\le k\le n.
$$
### (c) After $t$ Days
Repeat part (b) for $X_t$ for arbitrary $t\geq1$.
#### Solution
Extending the previous part, each plane has probability $p^t$ of surviving $t$ days, so $X_t\sim\text{Binomial}(n,p^t)$:

$$
\mathbb{P}[X_t=k]=\binom{n}{k}(p^t)^k(1-p^t)^{n-k},\qquad0\le k\le n.
$$
### (d) At Least One Plane Remains
What is the probability that at least one model plane still remains (has not crashed yet) after $t$ days? Do not include any summations in your answer.
#### Solution
Consider the complement, that no planes remain after $t$ days. By the previous part,

$$
\mathbb{P}[X_t=0]=\binom{n}{0}(p^t)^0(1-p^t)^{n-0}=(1-p^t)^n.
$$

So the probability that at least one plane remains after $t$ days is $1-(1-p^t)^n$.
### (e) Independence Across Days
Are the random variables $X_i$ and $X_j$, where $i<j$, independent? Justify using the definition of independent random variables.
#### Solution
No. Let $k_1=0$ and $k_2=1$. Then $\mathbb{P}[X_i=k_1,X_j=k_2]=0$, because there cannot be $1$ plane at the end of day $j$ if there are none left at the end of day $i$. However, $\mathbb{P}[X_i=k_1]>0$ and $\mathbb{P}[X_j=k_2]>0$, so $\mathbb{P}[X_i=k_1]\,\mathbb{P}[X_j=k_2]>0$. Since $\mathbb{P}[X_i=k_1]\,\mathbb{P}[X_j=k_2]\ne\mathbb{P}[X_i=k_1,X_j=k_2]$, they are not independent.

---

## 8. Such High Expectations
**Related course notes:** [[cs70/Course Notes/N20 Random Variables II - Linearity of Expectation|Note 20 — Random Variables II, Linearity of Expectation]]. The geometric distribution itself is in [[cs70/Course Notes/N19 Random Variables - Distribution and Expectation|Note 19]].
> [!note] Note tag in the PDF
> The PDF tags this question only "Note 20". It also depends on the geometric distribution and tail sum formula from Note 19, which are linked above.

Suppose $X$ and $Y$ are independently drawn from a Geometric distribution with parameter $p$. For each of the below subparts, your answer must be simplified (i.e. NOT left in terms of a summation).
### (a) The Minimum
Compute $\mathbb{E}[\min(X,Y)]$.
#### Solution
By independence,

$$
\mathbb{P}[\min(X,Y)\ge t]=\mathbb{P}[X\ge t]\,\mathbb{P}[Y\ge t]=(1-p)^{2(t-1)}.
$$

By the Tail Sum Formula,

$$
\mathbb{E}[\min(X,Y)]=\sum_{t=1}^{\infty}\mathbb{P}[\min(X,Y)\ge t]=\sum_{t=1}^{\infty}(1-p)^{2(t-1)}=\frac{1}{1-(1-p)^2}.
$$

**Alternate solution:** The tail probability above shows that $\min(X,Y)$ is geometric: $\min(X,Y)\sim\text{Geometric}(1-(1-p)^2)$. So, from the expectation of a geometric distribution,

$$
\mathbb{E}[\min(X,Y)]=\frac{1}{1-(1-p)^2}.
$$
### (b) The Maximum
Compute $\mathbb{E}[\max(X,Y)]$.
#### Solution
First,

$$
\begin{aligned}
\mathbb{P}[\max(X,Y)\ge t]&=1-\mathbb{P}[\max(X,Y)<t]=1-\mathbb{P}[X<t]\,\mathbb{P}[Y<t]\\
&=1-(1-\mathbb{P}[X\ge t])(1-\mathbb{P}[Y\ge t])\\
&=1-\left(1-(1-p)^{t-1}\right)\left(1-(1-p)^{t-1}\right)\\
&=1-\left(1-2(1-p)^{t-1}+(1-p)^{2(t-1)}\right)\\
&=2(1-p)^{t-1}-(1-p)^{2(t-1)}.
\end{aligned}
$$

Using the result from part (a),

$$
\begin{aligned}
\mathbb{E}[\max(X,Y)]&=\sum_{t=1}^{\infty}\mathbb{P}[\max(X,Y)\ge t]\\
&=\sum_{t=1}^{\infty}\left(2(1-p)^{t-1}-(1-p)^{2(t-1)}\right)\\
&=\sum_{t=1}^{\infty}2(1-p)^{t-1}-\sum_{t=1}^{\infty}(1-p)^{2(t-1)}\\
&=\frac{2}{p}-\frac{1}{1-(1-p)^2}.
\end{aligned}
$$

**Alternate solution:** A one-liner with linearity:

$$
\mathbb{E}[\max(X,Y)]=\mathbb{E}[X+Y-\min(X,Y)]=\mathbb{E}[X]+\mathbb{E}[Y]-\mathbb{E}[\min(X,Y)]=\frac{2}{p}-\frac{1}{1-(1-p)^2}.
$$
### (c) The Sum
Compute $\mathbb{P}[X+Y\geq t]$ for an integer $t\geq1$.
#### Solution
If $X\ge t$, then $X+Y\ge t$ regardless of the value of $Y$, since $Y>0$. Hence

$$
\begin{aligned}
\mathbb{P}[X+Y\ge t]&=\sum_{x=1}^{\infty}\mathbb{P}[X=x]\,\mathbb{P}[Y\ge t-x]\\
&=\sum_{x=1}^{t-1}\mathbb{P}[X=x]\,\mathbb{P}[Y\ge t-x]+\sum_{x=t}^{\infty}\mathbb{P}[X=x]\,\mathbb{P}[Y\ge t-x]\\
&=\sum_{x=1}^{t-1}(1-p)^{x-1}p\,(1-p)^{t-x-1}+\sum_{x=t}^{\infty}\mathbb{P}[X=x]\\
&=\sum_{x=1}^{t-1}(1-p)^{t-2}p+\mathbb{P}[X\ge t]\\
&=(t-1)(1-p)^{t-2}p+(1-p)^{t-1}.
\end{aligned}
$$

---

## 9. Swaps and Cycles
**Related course note:** [[cs70/Course Notes/N20 Random Variables II - Linearity of Expectation|Note 20 — Random Variables II, Linearity of Expectation]].
> [!info] Stretch problem
> This is a stretch problem. Your solution does not need to be complete, but make a good-faith effort, and write your solution up to the point where you get stuck.

A *permutation* is an ordering of the numbers $1,\ldots,n$, with each number appearing exactly once. For example, $(2,1,4,3)$ and $(3,1,2,4)$ are permutations of $1,2,3,4$. Write $\pi(i)$ for the number in position $i$; for $(2,1,4,3)$, we have $\pi(1)=2$, $\pi(2)=1$, $\pi(3)=4$, and $\pi(4)=3$.
A *swap* is an unordered pair $\{i,j\}$ of distinct elements such that $\pi(i)=j$ and $\pi(j)=i$. For example, the permutation $(2,1,4,3)$ has two swaps: $\{1,2\}$ and $\{3,4\}$.
**For both parts below, let $n\geq2$ and choose a permutation $\pi$ uniformly at random from all $n!$ permutations.**
### (a) Expected Number of Swaps
What is the expected number of swaps? Justify your answer.
#### Solution
For each unordered pair $\{i,j\}$, let $I_{\{i,j\}}$ be $1$ if the pair is a swap and $0$ otherwise. Once $\pi(i)=j$ and $\pi(j)=i$ are fixed, the remaining $n-2$ elements may be permuted arbitrarily, so

$$
\mathbb{E}[I_{\{i,j\}}]=\mathbb{P}[\{i,j\}\text{ is a swap}]=\frac{(n-2)!}{n!}=\frac{1}{n(n-1)}.
$$

The number of swaps is the sum of these indicators over the $\binom{n}{2}$ unordered pairs. By linearity of expectation,

$$
\mathbb{E}[\text{number of swaps}]=\binom{n}{2}\frac{1}{n(n-1)}=\frac{1}{2}.
$$

Linearity of expectation holds even though these indicators are dependent.
### (b) Expected Number of Cycles of Length $k$
For $1\leq k\leq n$, a *cycle of length $k$* consists of $k$ distinct elements $i_1,\ldots,i_k$ with

$$
\pi(i_1)=i_2,\qquad\pi(i_2)=i_3,\qquad\ldots,\qquad\pi(i_k)=i_1.
$$

Rotating the starting point describes the same cycle; for example, $(1,2,3)$ and $(2,3,1)$ describe the same cycle. A cycle of length $1$ is a fixed point.
What is the expected number of cycles of length $k$? Justify your answer.
#### Solution
For each $k$-element subset $S\subseteq\{1,\ldots,n\}$, let $J_S$ be the indicator that the elements of $S$ form a single cycle of length $k$.

There are $(k-1)!$ cycles on $S$: fix one element as the starting point and order the other $k-1$ elements around it. For each such cycle, the remaining $n-k$ elements can be permuted in $(n-k)!$ ways. Therefore

$$
\mathbb{P}[J_S=1]=\frac{(k-1)!\,(n-k)!}{n!}.
$$

Every cycle of length $k$ is counted by exactly one subset $S$. Applying linearity of expectation again,

$$
\mathbb{E}[\text{number of cycles of length }k]=\binom{n}{k}\frac{(k-1)!\,(n-k)!}{n!}=\frac{1}{k}.
$$

---

## 10. The CS70 Office Hour Queue
**Related course notes:** [[cs70/Course Notes/N19 Random Variables - Distribution and Expectation|Note 19 — Random Variables: Distribution and Expectation]] and [[cs70/Course Notes/N20 Random Variables II - Linearity of Expectation|Note 20 — Random Variables II, Linearity of Expectation]].
> [!info] Stretch problem
> This is a stretch problem. Your solution does not need to be complete, but make a good-faith effort, and write your solution up to the point where you get stuck.

Consider a simplified model of the CS70 office hour queue. During a one-hour session, the queue routes each incoming question to Andy with probability $p$, and otherwise to Erica, where $0<p<1$. Routing decisions are independent across questions and independent of the total number of questions received.
Let $X$ and $Y$ be the numbers of questions routed to Andy and Erica, respectively.
### (a) Exactly $n$ Questions
Suppose exactly $n\geq1$ questions arrive. Find $\mathbb{P}[X=a]$ and $\mathbb{P}[Y=b]$, specifying the possible values of $a,b$, and identify each distribution by name and parameters. Are $X$ and $Y$ independent? Prove your answer.
#### Solution
Each of the $n$ questions is independently routed to Andy with probability $p$, so

$$
X\sim\text{Binomial}(n,p),\qquad Y\sim\text{Binomial}(n,1-p).
$$

Explicitly, for integers $0\le a,b\le n$,

$$
\mathbb{P}[X=a]=\binom{n}{a}p^a(1-p)^{n-a},\qquad\mathbb{P}[Y=b]=\binom{n}{b}(1-p)^bp^{n-b}.
$$

Both probabilities are $0$ outside their stated domains.

The variables are **not independent**. Since $X+Y=n\ge1$, the events $X=0$ and $Y=0$ cannot both occur. However,

$$
\mathbb{P}[X=0,Y=0]=0,\qquad\mathbb{P}[X=0]\,\mathbb{P}[Y=0]=(1-p)^np^n>0.
$$

This violates the definition of independence.
### (b) A Poisson Number of Questions
Now suppose the total number of questions is $N\sim\text{Poisson}(\lambda)$, where $\lambda>0$. Find $\mathbb{P}[X=a,Y=b]$ and use it to find $\mathbb{P}[X=a]$ and $\mathbb{P}[Y=b]$, specifying their possible values. Identify the distributions of $X$ and $Y$ by name and parameters, and determine whether they are independent. Justify your answers.
#### Solution
For nonnegative integers $a,b$, the event $X=a,Y=b$ requires exactly $a+b$ incoming questions, and given this total, exactly $a$ of them must be routed to Andy. Therefore

$$
\begin{aligned}
\mathbb{P}[X=a,Y=b]&=\mathbb{P}[N=a+b]\,\mathbb{P}[X=a,Y=b\mid N=a+b]\\
&=e^{-\lambda}\frac{\lambda^{a+b}}{(a+b)!}\binom{a+b}{a}p^a(1-p)^b\\
&=e^{-\lambda p}\frac{(\lambda p)^a}{a!}\cdot e^{-\lambda(1-p)}\frac{(\lambda(1-p))^b}{b!}.
\end{aligned}
$$

The joint probability is $0$ for any other values of $a,b$.

Each factor in the final expression sums to $1$ over its nonnegative integer argument. Summing over $b$ or over $a$ therefore gives the marginal probabilities

$$
\mathbb{P}[X=a]=e^{-\lambda p}\frac{(\lambda p)^a}{a!},\qquad\mathbb{P}[Y=b]=e^{-\lambda(1-p)}\frac{(\lambda(1-p))^b}{b!},
$$

for nonnegative integers $a,b$, and $0$ otherwise. Thus

$$
X\sim\text{Poisson}(\lambda p),\qquad Y\sim\text{Poisson}(\lambda(1-p)).
$$

The joint distribution factors as $\mathbb{P}[X=a]\,\mathbb{P}[Y=b]$ for all values, so $X$ and $Y$ **are independent**.
### (c) A Coin Changes the Routing
Keep $N\sim\text{Poisson}(\lambda)$, but change the routing rule. At the start of the session, flip one fair coin, independently of $N$. If it lands heads, route each question to Andy with probability $1/4$; if it lands tails, use probability $3/4$. In either case, each question not routed to Andy goes to Erica. Given the coin's result, routing decisions for different questions are independent.
Are $X$ and $Y$ independent under this new rule? Prove your answer.
*Hint: Compare $\mathbb{P}[X=0,Y=0]$ with $\mathbb{P}[X=0]\,\mathbb{P}[Y=0]$.*
#### Solution
They are **not independent**. Given either coin result, part (b) applies, but averaging over the shared coin can break independence.

Let $r=e^{-\lambda/4}$ and $s=e^{-3\lambda/4}$. By part (b) and the law of total probability,

$$
\mathbb{P}[X=0]=\frac{r+s}{2},\qquad\mathbb{P}[Y=0]=\frac{r+s}{2}.
$$

Both counts are zero exactly when $N=0$, so

$$
\mathbb{P}[X=0,Y=0]=e^{-\lambda}=rs.
$$

Since $\lambda>0$, we have $r\ne s$. Consequently,

$$
\mathbb{P}[X=0]\,\mathbb{P}[Y=0]-\mathbb{P}[X=0,Y=0]=\frac{(r+s)^2}{4}-rs=\frac{(r-s)^2}{4}>0.
$$

So the joint probability does not equal the product of the marginal probabilities. The same session-wide coin affects both counts, even though they are independent once that coin's result is known.
