---
title: CS 70 HW 09 Solutions — Conditional Probability and Combinations of Events
Content Type: Review
Content Area: Probability
description: "Official HW 09 solutions, each placed directly under its question: conditional probability, Bayes' Rule, total probability, inclusion-exclusion, independence of complements, balls and bins with the union bound, and the dining-hall and socks stretch problems."
Course: CS 70
pinned: false
Date Published: November 12, 2026
Last Updated: November 12, 2026
Status: Finalized
---

# CS 70 HW 09 Solutions — Conditional Probability and Combinations of Events
Each part's official solution follows directly after its question.

---

## 1. Conditional Probability and Combinations of Events Basics
**Related course notes:** [[cs70/Course Notes/N17 Conditional Probability and Bayes' Rule|Note 17 — Conditional Probability and Bayes' Rule]] and [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events|Note 18 — Inclusion-Exclusion and Combinations of Events]].
Professor Hug rolls a fair 3-sided die numbered (1, 2, 3), and then Professor Sabin rolls a fair 4-sided die numbered (1, 2, 3, 4). Let $A$ be the event that Professor Hug rolls an even number and $B$ be the event that the sum of the professors' rolls is greater than or equal to 5.
> [!note] Part references in (a)(viii)
> Part (a)(viii) refers to "your answer to part (c)", but part (a) has no part (c). The PDF most likely means (a)(iii), the computation of $\mathbb{P}[B]$. The text below is kept as written.

### (a) Conditional Probability, Bayes' Rule, and Total Probability
Let's first explore conditional probability, Bayes' Rule, and Total Probability.
#### (i)
How many total outcomes are there? Are they equally likely?
**Solution:**
Professor Hug has $3$ possible outcomes and Professor Sabin has $4$, so there are $3\cdot4=12$ total outcomes. Both dice are fair and the rolls are independent, so all $12$ outcomes are equally likely, each with probability $\frac{1}{12}$.
#### (ii)
Which outcomes are in event $A$? What is $\mathbb{P}[A]$?
**Solution:**
Event $A$ occurs when Professor Hug rolls an even number, so

$$
A=\{(2,1),(2,2),(2,3),(2,4)\}.
$$

There are $4$ outcomes in $A$, so $\mathbb{P}[A]=\frac{4}{12}=\frac{1}{3}$.
#### (iii)
Which outcomes are in event $B$? What is $\mathbb{P}[B]$?
**Solution:**
Event $B$ occurs when the sum of the two rolls is at least $5$, so

$$
B=\{(1,4),(2,3),(2,4),(3,2),(3,3),(3,4)\}.
$$

There are $6$ outcomes in $B$, so $\mathbb{P}[B]=\frac{6}{12}=\frac{1}{2}$.
#### (iv)
Which outcomes are in event $A\cap B$? What is $\mathbb{P}[A\cap B]$?
**Solution:**
$A\cap B$ consists of the outcomes in which Professor Hug rolls an even number and the sum is at least $5$:

$$
A\cap B=\{(2,3),(2,4)\}.
$$

There are $2$ outcomes in $A\cap B$, so $\mathbb{P}[A\cap B]=\frac{2}{12}=\frac{1}{6}$.
#### (v)
Use your answers above to calculate $\mathbb{P}[A\mid B]$.
**Solution:**
By the definition of conditional probability,

$$
\mathbb{P}[A\mid B]=\frac{\mathbb{P}[A\cap B]}{\mathbb{P}[B]}=\frac{1/6}{1/2}=\frac{1}{3}.
$$
#### (vi)
Use Bayes' Rule to calculate $\mathbb{P}[B\mid A]$.
**Solution:**
By Bayes' Rule,

$$
\mathbb{P}[B\mid A]=\frac{\mathbb{P}[A\mid B]\,\mathbb{P}[B]}{\mathbb{P}[A]}=\frac{\frac{1}{3}\cdot\frac{1}{2}}{\frac{1}{3}}=\frac{1}{2}.
$$
#### (vii)
Which outcomes are in event $\overline{A}\cap B$? What is $\mathbb{P}[\overline{A}\cap B]$?
**Solution:**
$\overline{A}\cap B$ consists of the outcomes in which Professor Hug rolls an odd number and the sum is at least $5$:

$$
\overline{A}\cap B=\{(1,4),(3,2),(3,3),(3,4)\}.
$$

There are $4$ outcomes in $\overline{A}\cap B$, so $\mathbb{P}[\overline{A}\cap B]=\frac{4}{12}=\frac{1}{3}$.
#### (viii)
Finally, use the Law of Total Probability to calculate $\mathbb{P}[B]$. Does this agree with your answer to part (c)?
**Solution:**
Since $A$ and $\overline{A}$ partition the sample space, the Law of Total Probability gives

$$
\mathbb{P}[B]=\mathbb{P}[B\mid A]\,\mathbb{P}[A]+\mathbb{P}[B\mid\overline{A}]\,\mathbb{P}[\overline{A}].
$$

We know $\mathbb{P}[B\mid A]=\frac{1}{2}$, $\mathbb{P}[A]=\frac{1}{3}$, and $\mathbb{P}[\overline{A}]=\frac{2}{3}$. Furthermore,

$$
\mathbb{P}[B\mid\overline{A}]=\frac{\mathbb{P}[\overline{A}\cap B]}{\mathbb{P}[\overline{A}]}=\frac{1/3}{2/3}=\frac{1}{2}.
$$

Substituting,

$$
\mathbb{P}[B]=\frac{1}{2}\cdot\frac{1}{3}+\frac{1}{2}\cdot\frac{2}{3}=\frac{1}{6}+\frac{1}{3}=\frac{1}{2}.
$$

This agrees with the earlier answer for $\mathbb{P}[B]$ (the official solution also calls it "part (c)").
### (b) Combinations of Events and Independence
Now, let's look at some combinations of events and independence.
#### (i)
Which outcomes are in $A\cup B$? Calculate $\mathbb{P}[A\cup B]$.
**Solution:**
$A\cup B$ consists of the outcomes in which Professor Hug rolls an even number, the sum is at least $5$, or both:

$$
A\cup B=\{(2,1),(2,2),(2,3),(2,4),(1,4),(3,2),(3,3),(3,4)\}.
$$

There are $8$ outcomes in $A\cup B$, so $\mathbb{P}[A\cup B]=\frac{8}{12}=\frac{2}{3}$.
#### (ii)
Use the Inclusion-Exclusion Principle to calculate $\mathbb{P}[A\cup B]$. Does your answer agree with the previous part?
**Solution:**
By the Inclusion-Exclusion Principle,

$$
\mathbb{P}[A\cup B]=\mathbb{P}[A]+\mathbb{P}[B]-\mathbb{P}[A\cap B]=\frac{1}{3}+\frac{1}{2}-\frac{1}{6}=\frac{2}{3}.
$$

This agrees with the previous part.
#### (iii)
Are $A$ and $B$ mutually exclusive? Are they independent? Justify your answers.
**Solution:**
$A$ and $B$ are not mutually exclusive, because

$$
A\cap B=\{(2,3),(2,4)\}\ne\varnothing.
$$

However, they are independent, because

$$
\mathbb{P}[A\cap B]=\frac{1}{6}=\frac{1}{3}\cdot\frac{1}{2}=\mathbb{P}[A]\,\mathbb{P}[B].
$$

---

## 2. Ghostly Conditions on Your Probability
**Related course note:** [[cs70/Course Notes/N17 Conditional Probability and Bayes' Rule|Note 17 — Conditional Probability and Bayes' Rule]]. Part (b) also draws on [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events|Note 18]].
It's Halloween! You are in a class of 30 students, and start to observe everyone's costumes. Throughout, a random student is chosen uniformly at random from the class.
### (a) Ghosts Sharing Candy
You observe 12 people with ghost costumes and 18 students sharing candy. Of the students sharing candy, 8 of them are ghosts. What is the probability of a random student being a ghost, given that they are sharing candy?
#### Solution
The probability that a random student is sharing candy is $\frac{18}{30}$, and the probability that a student is sharing candy and is a ghost is $\frac{8}{30}$. So the probability of being a ghost given that they are sharing candy is

$$
\frac{8/30}{18/30}=\frac{8}{18}=\frac{4}{9}.
$$
### (b) Candy, Ghost, or Both
For the class in part (a), what is the probability of a random student sharing candy, being a ghost, or both?
#### Solution
Let $G$ be the event that the student is a ghost and $C$ the event that the student is sharing candy. By inclusion-exclusion, $\mathbb{P}[G\cup C]=\mathbb{P}[G]+\mathbb{P}[C]-\mathbb{P}[G\cap C]$, so

$$
\mathbb{P}[G\cup C]=\frac{12}{30}+\frac{18}{30}-\frac{8}{30}=\frac{22}{30}.
$$
### (c) Mutually Exclusive Costumes
Each person can only wear 1 costume. You define the events: $G$ = "the student is wearing a ghost costume", $V$ = "the student is wearing a vampire costume", and $C$ = "the student is sharing candy". Are the events $G$ and $V$ mutually exclusive? Are $G$ and $C$ mutually exclusive?
#### Solution
No one can wear both a ghost costume and a vampire costume, so $G$ and $V$ are mutually exclusive. A person in a ghost costume can share candy, so $G$ and $C$ are not mutually exclusive.
### (d) Nice Vampires
You find that vampires just seem to be nicer than the other costumes. There are 10 students with vampire costumes. Any student with a vampire costume has a 90% chance of being one of the students sharing candy, while any student without a vampire costume has only a 45% chance of being a student who is sharing candy. If a student is selected uniformly at random, what is the probability that this student is sharing candy?
#### Solution
Let $C$ be the event that the student is sharing candy and $V$ the event that the student is a vampire. By the Total Probability Rule,

$$
\mathbb{P}[C]=\mathbb{P}[C\cap V]+\mathbb{P}[C\cap\overline{V}]=\mathbb{P}[C\mid V]\,\mathbb{P}[V]+\mathbb{P}[C\mid\overline{V}]\,\mathbb{P}[\overline{V}]=0.9\cdot\frac{10}{30}+0.45\cdot\frac{20}{30}=0.3+0.3=\frac{18}{30},
$$

which agrees with part (a).
### (e) Vampire Given Candy
For part (d), if you observe that a random student is sharing candy, what is the probability that they are wearing a vampire costume?
#### Solution
Using the values from part (d),

$$
\mathbb{P}[V\mid C]=\frac{\mathbb{P}[V\cap C]}{\mathbb{P}[C]}=\frac{0.3}{18/30}=\frac{1}{2}.
$$

---

## 3. Box of Marbles
**Related course note:** [[cs70/Course Notes/N17 Conditional Probability and Bayes' Rule|Note 17 — Conditional Probability and Bayes' Rule]].
You are given two boxes: one of them containing 900 red marbles and 100 blue marbles, the other one contains 500 red marbles and 500 blue marbles.
### (a) Picking a Blue Marble
If we pick one of the boxes randomly and pick a marble, what is the probability that it is blue?
#### Solution
Let $B$ be the event that the picked marble is blue, $R$ the event that it is red, $A_1$ the event that the marble is picked from box 1, and $A_2$ the event that it is picked from box 2. We want $\mathbb{P}[B]$. By total probability,

$$
\mathbb{P}[B]=\mathbb{P}[B\mid A_1]\,\mathbb{P}[A_1]+\mathbb{P}[B\mid A_2]\,\mathbb{P}[A_2]=0.1\times0.5+0.5\times0.5=0.3.
$$
### (b) Which Box?
If we see that the marble is blue, what is the probability that it is chosen from box 1?
#### Solution
We want $\mathbb{P}[A_1\mid B]$. By Bayes' Rule,

$$
\mathbb{P}[A_1\mid B]=\frac{\mathbb{P}[B\mid A_1]\,\mathbb{P}[A_1]}{\mathbb{P}[B\mid A_1]\,\mathbb{P}[A_1]+\mathbb{P}[B\mid A_2]\,\mathbb{P}[A_2]}=\frac{0.1\times0.5}{0.1\times0.5+0.5\times0.5}=\frac{1}{6}.
$$
### (c) A Marble Set Aside
Suppose we pick one marble from box 1 and without looking at its color we put it aside. Then we pick another marble from box 1. What is the probability that the second marble is blue?
#### Solution
Let $B_1$ be the event that the first marble is blue, $R_1$ the event that the first marble is red, and $B_2$ the event that the second marble is blue (without looking at the first marble's color). We want $\mathbb{P}[B_2]$. By total probability,

$$
\mathbb{P}[B_2]=\mathbb{P}[B_2\mid B_1]\,\mathbb{P}[B_1]+\mathbb{P}[B_2\mid R_1]\,\mathbb{P}[R_1]=\frac{99}{999}\times0.1+\frac{100}{999}\times0.9=0.1.
$$

More generally, the $n$th marble picked from box 1 is blue with probability $0.1$. This is clear by symmetry: all permutations of the $1000$ marbles are equally likely, so the probability that the $n$th marble is blue is the same as the probability that the first marble is blue.

---

## 4. Independent Complements
**Related course note:** [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events|Note 18 — Inclusion-Exclusion and Combinations of Events]].
Let $\Omega$ be a sample space, and let $A,B\subseteq\Omega$ be two independent events.
### (a) Both Complements
Prove or disprove: $\overline{A}$ and $\overline{B}$ must be independent.
#### Solution
**True.** $\overline{A}$ and $\overline{B}$ must be independent:

$$
\begin{aligned}
\mathbb{P}[\overline{A}\cap\overline{B}]&=\mathbb{P}[\overline{A\cup B}]&&\text{(De Morgan's law)}\\
&=1-\mathbb{P}[A\cup B]&&\text{(since }\mathbb{P}[\overline{E}]=1-\mathbb{P}[E]\text{ for all }E)\\
&=1-(\mathbb{P}[A]+\mathbb{P}[B]-\mathbb{P}[A\cap B])&&\text{(union of overlapping events)}\\
&=1-\mathbb{P}[A]-\mathbb{P}[B]+\mathbb{P}[A]\,\mathbb{P}[B]&&\text{(}A\text{ and }B\text{ are independent)}\\
&=(1-\mathbb{P}[A])(1-\mathbb{P}[B])\\
&=\mathbb{P}[\overline{A}]\,\mathbb{P}[\overline{B}]&&\text{(since }\mathbb{P}[\overline{E}]=1-\mathbb{P}[E]\text{ for all }E)
\end{aligned}
$$
### (b) One Complement
Prove or disprove: $A$ and $\overline{B}$ must be independent.
#### Solution
**True.** $A$ and $\overline{B}$ must be independent:

$$
\begin{aligned}
\mathbb{P}[A\cap\overline{B}]&=\mathbb{P}[A-(A\cap B)]\\
&=\mathbb{P}[A]-\mathbb{P}[A\cap B]\\
&=\mathbb{P}[A]-\mathbb{P}[A]\,\mathbb{P}[B]\\
&=\mathbb{P}[A](1-\mathbb{P}[B])\\
&=\mathbb{P}[A]\,\mathbb{P}[\overline{B}]
\end{aligned}
$$
### (c) An Event and Its Complement
Prove or disprove: $A$ and $\overline{A}$ must be independent.
#### Solution
**False in general.** If $0<\mathbb{P}[A]<1$, then $\mathbb{P}[A\cap\overline{A}]=\mathbb{P}[\varnothing]=0$ but $\mathbb{P}[A]\,\mathbb{P}[\overline{A}]>0$, so $\mathbb{P}[A\cap\overline{A}]\ne\mathbb{P}[A]\,\mathbb{P}[\overline{A}]$. Therefore $A$ and $\overline{A}$ are not independent in this case.
### (d) Equal Events
Prove or disprove: It is possible that $A=B$.
#### Solution
**True.** For example, if $A=B$ and $\mathbb{P}[A]=\mathbb{P}[B]=0$, then $\mathbb{P}[A\cap B]=0=0\times0=\mathbb{P}[A]\,\mathbb{P}[B]$, so $A$ and $B$ are independent. (Another example: if $A=B$ and $\mathbb{P}[A]=1$, then $A$ and $B$ are independent.)

---

## 5. Balls and Bins
**Related course notes:** [[cs70/Course Notes/N17 Conditional Probability and Bayes' Rule|Note 17 — Conditional Probability and Bayes' Rule]] and [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events|Note 18 — Inclusion-Exclusion and Combinations of Events]].
Suppose you throw $b$ balls into $n$ labeled bins one at a time, where $b\ge1$ and $n\ge2$.
### (a) The First Bin Is Empty
What is the probability that the first bin is empty?
#### Solution
> [!note] Sample space for this whole question
> The balls are thrown one at a time, so there is an ordering: this is sampling with replacement where order matters. It is not the case where order doesn't matter, which would make each stars-and-bars configuration equally likely.

This is a uniform sample space whose outcomes are all the ways to throw each ball individually into the bins. Here $\lvert\Omega\rvert=n^b$, since each of the $b$ balls has $n$ possible bins. Of these, $(n-1)^b$ leave the first bin empty, since each ball then has $n-1$ possible bins. The probability that the first bin is empty is

$$
\left(\frac{n-1}{n}\right)^b.
$$

Equivalently, each throw is independent of all the others. The probability that ball $i$ does not land in the first bin is $\frac{n-1}{n}$, so the probability that none of the balls land in the first bin is $\left(\frac{n-1}{n}\right)^b$.

### (b) The First k Bins Are Empty
What is the probability that the first $k$ bins are empty?
#### Solution
We have the same uniform sample space of size $n^b$. There are $(n-k)^b$ ways to throw the balls so that the first $k$ bins are empty, since each ball has $n-k$ possible bins.

Alternatively, by independence: the probability that ball $i$ does not land in the first $k$ bins is $\frac{n-k}{n}$, so the probability that no ball lands in the first $k$ bins is

$$
\left(\frac{n-k}{n}\right)^b.
$$
### (c) k Random Bins Are Empty
If $k$ bins were randomly selected, what is the probability that they are all empty?
#### Solution
In part (b), it did not matter which $k$ bins we picked, so the same reasoning gives

$$
\left(\frac{n-k}{n}\right)^b.
$$
### (d) An Upper Bound
Let $A$ be the event that at least $k$ bins are empty. Let $m$ be the number of subsets of $k$ bins out of the total $n$ bins. If we assume $A_i$ is the event that the $i$th subset of $k$ bins is empty. Then we can write $A$ as the union of $A_i$'s:

$$
A=\bigcup_{i=1}^{m}A_i.
$$

Compute $m$ in terms of $n$ and $k$, and use the union bound to give an upper bound on $\mathbb{P}[A]$.
#### Solution
There are $m=\binom{n}{k}$ subsets of $k$ bins. By the union bound,

$$
\mathbb{P}[A]=\mathbb{P}\left[\bigcup_{i=1}^{m}A_i\right]\le\sum_{i=1}^{m}\mathbb{P}[A_i].
$$

Part (b) gives the probability that the first $k$ bins are empty, and by part (c) the same holds for any set of $k$ bins, so

$$
\mathbb{P}[A_i]=\left(\frac{n-k}{n}\right)^b.
$$

Then

$$
\mathbb{P}[A]\le m\cdot\left(\frac{n-k}{n}\right)^b=\binom{n}{k}\left(\frac{n-k}{n}\right)^b.
$$
### (e) The Second Bin Given the First
What is the probability that the second bin is empty given that the first one is empty?
#### Solution
By the definition of conditional probability,

$$
\begin{aligned}
\mathbb{P}[\text{2nd bin empty}\mid\text{1st bin empty}]&=\frac{\mathbb{P}[\text{2nd bin empty}\cap\text{1st bin empty}]}{\mathbb{P}[\text{1st bin empty}]}\\
&=\frac{(n-2)^b/n^b}{(n-1)^b/n^b}\\
&=\left(\frac{n-2}{n-1}\right)^b.
\end{aligned}
$$

**Alternate solution:** Given that bin 1 is empty, each ball lands in one of the remaining $n-1$ bins. For bin 2 to be empty as well, each ball must also avoid bin 2, leaving $n-2$ bins. So for each ball, the probability is $\frac{n-2}{n-1}$, and for all $b$ balls it is $\left(\frac{n-2}{n-1}\right)^b$.
### (f) First Bin and First Two Bins
Are the events that "the first bin is empty" and "the first two bins are empty" independent?
#### Solution
They are dependent. Knowing the latter means the former happens with probability $1$.
### (g) First Bin and Second Bin
Are the events that "the first bin is empty" and "the second bin is empty" independent?
#### Solution
In part (e), the probability that the second bin is empty given that the first bin is empty is $\left(\frac{n-2}{n-1}\right)^b$. The probability that the second bin is empty with no other information is $\left(\frac{n-1}{n}\right)^b$. These are not equal, so the events are dependent.

---

## 6. Last Dining Hall Visit
**Related course note:** [[cs70/Course Notes/N17 Conditional Probability and Bayes' Rule|Note 17 — Conditional Probability and Bayes' Rule]].
> [!info] Stretch problem
> This is a stretch problem. Your solution does not need to be complete, but make a good-faith effort, and write your solution up to the point where you get stuck.

Sunny has just enough flex dollars left to make one visit to the dining hall in the next $n$ days before the semester ends. The menu changes every day, and she wants to make the most of her last visit.
She decides to use the following procedure to decide when to make the visit:
- For the next $k$ days, she will check the day's menu.
- Starting from day $k+1$, she will visit the dining hall on the first day that she prefers the day's menu over the best menu she had observed in the first $k$ days.

Assume she keeps a strict ranking of the menus offered at the dining hall for the $n$ days, and that the menus appear in a uniformly random order.
After the semester is over, what is the probability that she visited the dining hall on the day that her favorite menu was served? (You may leave your answer as a summation.)
### Solution
Define the sample space $\Omega$ as the set of all permutations of $1,\ldots,n$. Each outcome is a possible order in which the $n$ menus are served, where each number is Sunny's ranking of a menu. The probability function is uniform, with $\mathbb{P}(\omega)=\frac{1}{n!}$ for every $\omega\in\Omega$.

Let $B_i$ be the event that Sunny's favorite menu is served on day $i$, for $i=1,\ldots,n$, and let $A$ be the event that Sunny visits the dining hall on the day her favorite menu is served. By the law of total probability,

$$
\mathbb{P}(A)=\sum_{i=1}^{n}\mathbb{P}(A\mid B_i)\,\mathbb{P}(B_i)=\frac{1}{n}\sum_{i=1}^{n}\mathbb{P}(A\mid B_i),
$$

where $\mathbb{P}(B_i)=\frac{1}{n}$ for every $i$.

First, $\mathbb{P}(A\mid B_i)=0$ for $i=1,\ldots,k$, since Sunny does not visit during the first $k$ days. For $i=k+1,\ldots,n$,

$$
\mathbb{P}(A\mid B_i)=\frac{k}{i-1}.
$$

To see why, suppose Sunny's favorite menu is served on day $i$. She visits on day $i$ if and only if the best menu among the first $i-1$ days was served during the first $k$ days; otherwise she would already have visited before day $i$. Each of the first $i-1$ days is equally likely to have the best menu among those days, so the probability that it was served during the first $k$ days is $\frac{k}{i-1}$.

Therefore,

$$
\mathbb{P}(A)=\frac{1}{n}\sum_{i=k+1}^{n}\frac{k}{i-1}=\frac{k}{n}\sum_{i=k+1}^{n}\frac{1}{i-1}.
$$

---

## 7. Socks
**Related course note:** [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events|Note 18 — Inclusion-Exclusion and Combinations of Events]] (tagged "Note 17" and "Note 18" in the PDF).
> [!info] Stretch problem
> This is a stretch problem. Your solution does not need to be complete, but make a good-faith effort, and write your solution up to the point where you get stuck.

Suppose you have $n$ different pairs of socks ($n$ left socks and $n$ right socks, for $2n$ individual socks total) in your dresser. You take the socks out of the dresser one by one without looking and lay them out in a row on the floor. In this question, we'll go through the computation of the probability that no two matching socks are next to each other.
### (a) The Sample Space
We can consider the sample space as the set of length $2n$ permutations. What is the size of the sample space $\Omega$, and what is the probability of a particular permutation $\omega\in\Omega$?
#### Solution
We have a uniform sample space of size $(2n)!$, so each permutation has probability $\frac{1}{(2n)!}$.
### (b) One Pair Together
Let $A_i$ be the event that the $i$th pair of matching socks are next to each other. Calculate $\mathbb{P}[A_i]$.
#### Solution
Treat the $i$th matching pair as a single condensed unit. For example, with $n=3$, an original permutation could look like $132213$. Condensing both $2$'s into a unit labeled $B$ gives $13B13$. There are then $2n-1$ units to order, so $(2n-1)!$ orderings. When we condense the pair, either sock could come first, so there are $2$ ways to condense it. The probability is

$$
\mathbb{P}[A_i]=\frac{2(2n-1)!}{(2n)!}.
$$
### (c) Several Pairs Together
Calculate $\mathbb{P}[A_1\cap\ldots\cap A_k]$ for an arbitrary $k\ge2$. (Hint: try using a counting based approach.)
#### Solution
Use the same strategy as the previous part with all $k$ matching pairs. There are $2^k$ ways to condense them, and once condensed there are $(2n-k)!$ ways to order the remaining units. The probability is

$$
\mathbb{P}[A_1\cap\ldots\cap A_k]=\frac{2^k(2n-k)!}{(2n)!}.
$$
### (d) At Least One Pair Together
Putting these all together, calculate the probability that there is at least one pair of matching socks next to each other. Your answer can (and should) be expressed as a summation. (Hint: use Inclusion/Exclusion.)
#### Solution
By inclusion-exclusion,

$$
\begin{aligned}
\mathbb{P}[A]&=\mathbb{P}[A_1\cup A_2\cup\cdots\cup A_n]\\
&=\sum_{i=1}^{n}\mathbb{P}[A_i]-\sum_{1\le i<j\le n}\mathbb{P}[A_i\cap A_j]+\cdots\\
&=\sum_{i=1}^{n}2\cdot\frac{(2n-1)!}{(2n)!}-\sum_{1\le i<j\le n}2^2\cdot\frac{(2n-2)!}{(2n)!}+\cdots\\
&=\binom{n}{1}2^1\cdot\frac{(2n-1)!}{(2n)!}-\binom{n}{2}2^2\cdot\frac{(2n-2)!}{(2n)!}+\cdots\\
&=\sum_{k=1}^{n}(-1)^{k+1}\binom{n}{k}2^k\cdot\frac{(2n-k)!}{(2n)!}.
\end{aligned}
$$
### (e) No Pair Together
Using your answer from the previous part, what is the probability that no two matching socks are next to each other? (This should follow directly from your answer to the previous part, and also can be left as a summation.)
#### Solution
This is the complement of the previous part:

$$
1-\mathbb{P}[A]=\sum_{k=0}^{n}(-1)^k\binom{n}{k}\frac{2^k(2n-k)!}{(2n)!}.
$$
