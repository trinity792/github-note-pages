---
title: CS 70 Probability Formula Quick Reference
Content Type: Reference
Content Area: Probability
description: "Quick reference for the conditional probability, Bayes, independence, product rule, and inclusion-exclusion formulas from Notes 17 and 18, with when-to-use guidance and links to the exact sections that prove each one."
Course: CS 70
pinned: false
Date Published: November 05, 2026
Last Updated: November 05, 2026
Status: Finalized
---
# CS 70 — Probability Formula Quick Reference
Based on [[cs70/Course Notes/N17 Conditional Probability and Bayes' Rule|Note 17: Conditional Probability and Bayes' Rule]] and [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events|Note 18: Inclusion-Exclusion and Combinations of Events]]. Each table has a *See* column that links to the specific definition, theorem, or section where the formula is developed.
Notation: $A^c$ is the complement of $A$; $\cap$ means AND; $\cup$ means OR; $P(A\mid B)$ means the probability of $A$ given $B$.

---

## 1. Conditional Probability & Bayes
The formulas that move between $P(A\mid B)$, $P(B\mid A)$, and the unconditional probabilities.

| Formula / Rule                | Formula                                                                                 | When to use                                        | See                                                                                                                                                                  |
| ----------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Conditional probability       | $\displaystyle P(A\mid B)=\frac{P(A\cap B)}{P(B)}$                                      | Find $P(A\mid B)$ from the intersection            | [[cs70/Course Notes/N17 Conditional Probability and Bayes' Rule#Definition 17.1 — Conditional Probability\|Def 17.1]]                     |
| Reverse conditional           | $\displaystyle P(B\mid A)=\frac{P(A\cap B)}{P(A)}$                                      | Condition on $A$ instead                           | [[cs70/Course Notes/N17 Conditional Probability and Bayes' Rule#Definition 17.1 — Conditional Probability\|Def 17.1]]                     |
| Conditional complement        | $P(A^c\mid B)=1-P(A\mid B)$                                                             | Find the probability of NOT $A$, given $B$         | [[cs70/Course Notes/N17 Conditional Probability and Bayes' Rule#1. Conditional Probability\|N17 §1]]                                      |
| Bayes' rule                   | $\displaystyle P(A\mid B)=\frac{P(B\mid A)P(A)}{P(B)}$                                  | Reverse the direction of conditioning              | [[cs70/Course Notes/N17 Conditional Probability and Bayes' Rule#4. Bayes' Rule and Total Probability Rule\|N17 §4]]                       |
| Total probability (2 cases)   | $P(B)=P(B\mid A)P(A)+P(B\mid A^c)P(A^c)$                                                | Find $P(B)$ by splitting into $A$ and $A^c$        | [[cs70/Course Notes/N17 Conditional Probability and Bayes' Rule#4. Bayes' Rule and Total Probability Rule\|N17 §4]]                       |
| Bayes + total probability     | $\displaystyle P(A\mid B)=\frac{P(B\mid A)P(A)}{P(B\mid A)P(A)+P(B\mid A^c)P(A^c)}$     | Bayes when $P(B)$ is unknown                       | [[cs70/Course Notes/N17 Conditional Probability and Bayes' Rule#3. Bayesian Inference\|N17 §3]]                                           |
| Total probability ($n$ cases) | $\displaystyle P(B)=\sum_{i=1}^n P(B\mid A_i)P(A_i)$                                    | Split into a partition $A_1,\ldots,A_n$            | [[cs70/Course Notes/N17 Conditional Probability and Bayes' Rule#Generalized Total Probability Rule and Bayes' Rule\|N17 §4, generalized]] |
| Generalized Bayes             | $\displaystyle P(A_i\mid B)=\frac{P(B\mid A_i)P(A_i)}{\sum_{j=1}^n P(B\mid A_j)P(A_j)}$ | Find which case $A_i$ occurred after observing $B$ | [[cs70/Course Notes/N17 Conditional Probability and Bayes' Rule#Generalized Total Probability Rule and Bayes' Rule\|N17 §4, generalized]] |

Conditions: conditioning requires a positive-probability event. The $n$-case formulas require the $A_i$ to form a partition of the sample space ([[cs70/Course Notes/N17 Conditional Probability and Bayes' Rule#Definition 17.2 — Partition of an Event|Definition 17.2]]); conditional terms involving $A_i$ require $P(A_i)>0$. Source: Note 17, Sections 1, 3, and 4.

---

## 2. Independence & the Product Rule
These rules separate what holds in general (the product rule) from what holds only under independence.

| Formula / Rule                           | Formula                                                                                      | When to use                                                 | See                                                                                                                                                                                         |
| ---------------------------------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Independence condition                   | $P(A\cap B)=P(A)P(B)$                                                                        | Define or test independence                                 | [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events#Definition 18.1 — Independence\|Def 18.1]]                                                |
| Independence via conditional probability | $P(A\mid B)=P(A)$                                                                            | Test whether learning $B$ changes $P(A)$                    | [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events#Definition 18.1 — Independence\|Def 18.1]]                                                |
| Reverse independence                     | $P(B\mid A)=P(B)$                                                                            | Equivalent independence test                                | [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events#Definition 18.1 — Independence\|Def 18.1]]                                                |
| Product rule (2 events)                  | $P(A\cap B)=P(A)P(B\mid A)$                                                                  | Find AND probabilities without assuming independence        | [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events#Theorem 18.2 — Product Rule\|Thm 18.2]]                                                   |
| Reversed product rule                    | $P(A\cap B)=P(B)P(A\mid B)$                                                                  | Same rule, opposite ordering                                | [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events#Theorem 18.2 — Product Rule\|Thm 18.2]]                                                   |
| Product rule (3 events)                  | $P(A\cap B\cap C)=P(A)P(B\mid A)P(C\mid A\cap B)$                                            | Sequential events                                           | [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events#Theorem 18.2 — Product Rule\|Thm 18.2]]                                                   |
| Mutually independent events              | $\displaystyle P\left(\bigcap_{i\in I}A_i\right)=\prod_{i\in I}P(A_i)$                       | Independence for every subset $I$ with $\lvert I\rvert\ge2$ | [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events#Definition 18.2 — Mutual Independence\|Def 18.2]]                                         |
| Pairwise independence                    | $P(A_i\cap A_j)=P(A_i)P(A_j)$, $i\ne j$                                                      | Check every pair                                            | [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events#Example: Pairwise Independent but Not Mutually Independent Events\|N18 pairwise example]] |
| Mutual independence (complements)        | $\displaystyle P\left(\bigcap_{i=1}^n B_i\right)=\prod_{i=1}^nP(B_i)$, $B_i\in\{A_i,A_i^c\}$ | Equivalent definition using events and complements          | [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events#Definition 18.3 — Mutual Independence (Equivalent Form)\|Def 18.3]]                       |

The general $n$-event product rule ([[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events#Theorem 18.2 — Product Rule|Theorem 18.2]]) is:

$$
\boxed{ P\left(\bigcap_{i=1}^{n}A_i\right) = P(A_1)\prod_{k=2}^{n} P\left(A_k\mid\bigcap_{i=1}^{k-1}A_i\right) }
$$

The displayed conditional form assumes the conditioning events have positive probability.
For three events, mutual independence requires all four equalities:

$$
\begin{aligned}
P(A\cap B)&=P(A)P(B)\\
P(A\cap C)&=P(A)P(C)\\
P(B\cap C)&=P(B)P(C)\\
P(A\cap B\cap C)&=P(A)P(B)P(C)
\end{aligned}
$$

> [!important] Pairwise independence does not imply mutual independence
> Three events can satisfy all three pairwise equalities and still fail the triple-intersection equality. See the [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events#Example: Pairwise Independent but Not Mutually Independent Events|worked counterexample in Note 18]].

Source: Note 18, Sections 2.1-2.2 (the *Independent Events* and *Intersections of Events* subsections of [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events#2. Combinations of Events|Section 2]]).

---

## 3. Inclusion-Exclusion & the Union Bound
Exact and approximate rules for "at least one" and "any of" questions.

| Formula / Rule | Formula | When to use | See |
| --- | --- | --- | --- |
| Union (2 events) | $P(A\cup B)=P(A)+P(B)-P(A\cap B)$ | Find probability of $A$ OR $B$ | [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events#Theorem 18.3 — Inclusion-Exclusion for Probabilities\|Thm 18.3]] |
| Union (3 events) | $P(A\cup B\cup C)=P(A)+P(B)+P(C)-P(A\cap B)-P(A\cap C)-P(B\cap C)+P(A\cap B\cap C)$ | Exact probability of any of 3 events | [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events#Theorem 18.3 — Inclusion-Exclusion for Probabilities\|Thm 18.3]] |
| Mutually exclusive events | $\displaystyle P\left(\bigcup_{i=1}^n A_i\right)=\sum_{i=1}^nP(A_i)$ | Events cannot occur together | [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events#Unions of Events\|N18 Unions of Events]] |
| Union bound (2 events) | $P(A\cup B)\le P(A)+P(B)$ | Upper-bound a union | [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events#Unions of Events\|N18 Unions of Events]] |
| Union bound ($n$ events) | $\displaystyle P\left(\bigcup_{i=1}^nA_i\right)\le\sum_{i=1}^nP(A_i)$ | Upper-bound the probability that any event occurs | [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events#Unions of Events\|N18 Unions of Events]] |
| Complement rule | $P(A^c)=1-P(A)$ | Calculate NOT $A$ | [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events#Example: The Las Vegas Game, Corrected\|Las Vegas example]] |
| Complement of a union | $\displaystyle P\left(\bigcup_iA_i\right)=1-P\left(\bigcap_iA_i^c\right)$ | Find probability of at least one event | [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events#Example: The Las Vegas Game, Corrected\|Las Vegas example]] |
| At least one (independent events) | $\displaystyle P\left(\bigcup_iA_i\right)=1-\prod_i(1-P(A_i))$ | Find probability of at least one when events are mutually independent | [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events#Example: The Las Vegas Game, Corrected\|Las Vegas example]] |

The general inclusion-exclusion formula ([[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events#Theorem 18.3 — Inclusion-Exclusion for Probabilities|Theorem 18.3]]) is:

$$
\boxed{ P\left(\bigcup_{i=1}^n A_i\right) = \sum_{k=1}^n(-1)^{k-1} \sum_{\substack{I\subseteq\{1,\ldots,n\}\\ \lvert I\rvert=k}} P\left(\bigcap_{i\in I}A_i\right) }
$$

This means add singles, subtract pairs, add triples, subtract quadruples, and continue alternating. The counting version it comes from is [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events#Theorem 18.1 — Inclusion-Exclusion|Theorem 18.1]].
A useful additional result from Note 18 is the truncated inclusion-exclusion bounds (Bonferroni bounds), covered in the [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events#Unions of Events|Unions of Events]] subsection, where stopping after an odd number of terms overestimates and after an even number underestimates:

$$
\begin{aligned}
P\left(\bigcup_i A_i\right) &\le \sum_i P(A_i)\\[4pt]
P\left(\bigcup_i A_i\right) &\ge \sum_i P(A_i)-\sum_{i<j}P(A_i\cap A_j)
\end{aligned}
$$

These provide upper and lower bounds without calculating every intersection.

---

## 4. Choosing the right formula
Match the wording of a problem to the first formula worth trying.

| Problem wording | First formula to consider | See |
| --- | --- | --- |
| "Given that $B$ occurred" | Conditional probability | [[cs70/Course Notes/N17 Conditional Probability and Bayes' Rule#Definition 17.1 — Conditional Probability\|Def 17.1]] |
| "Reverse $P(B\mid A)$" | Bayes' rule | [[cs70/Course Notes/N17 Conditional Probability and Bayes' Rule#4. Bayes' Rule and Total Probability Rule\|N17 §4]] |
| "Divide into different cases" | Total probability | [[cs70/Course Notes/N17 Conditional Probability and Bayes' Rule#4. Bayes' Rule and Total Probability Rule\|N17 §4]] |
| "Are the events independent?" | Independence condition | [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events#Definition 18.1 — Independence\|Def 18.1]] |
| "Probability that ALL occur" | Product rule | [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events#Theorem 18.2 — Product Rule\|Thm 18.2]] |
| "Probability that ANY occur" | Inclusion-exclusion | [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events#Theorem 18.3 — Inclusion-Exclusion for Probabilities\|Thm 18.3]] |
| "Probability that AT LEAST ONE occurs" | Union or complement | [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events#Example: The Las Vegas Game, Corrected\|Las Vegas example]] |
| "Need an upper bound for at least one" | Union bound | [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events#Unions of Events\|N18 Unions of Events]] |
| "Events cannot happen simultaneously" | Mutually exclusive addition rule | [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events#Unions of Events\|N18 Unions of Events]] |
| "Repeated independent trials" | Multiply individual event probabilities | [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events#Example: Coin Tosses\|Coin tosses example]] |

---

## 5. Critical distinctions
The pairs of ideas that are easiest to confuse on an exam.

| Concept | What it means | See |
| --- | --- | --- |
| Independent | One event does not change the probability of another | [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events#Definition 18.1 — Independence\|Def 18.1]] |
| Mutually exclusive | The events cannot occur together | [[cs70/Course Notes/N17 Conditional Probability and Bayes' Rule#Definition 17.2 — Partition of an Event\|Def 17.2]] |
| Pairwise independent | Every pair is independent | [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events#Example: Pairwise Independent but Not Mutually Independent Events\|N18 pairwise example]] |
| Mutually independent | Every subset of two or more events satisfies the independence multiplication rule | [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events#Definition 18.2 — Mutual Independence\|Def 18.2]] |
| Product rule | Works without independence | [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events#Theorem 18.2 — Product Rule\|Thm 18.2]] |
| Union bound | Works without independence and may overestimate | [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events#Unions of Events\|N18 Unions of Events]] |
| Inclusion-exclusion | Gives the exact union probability | [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events#Theorem 18.3 — Inclusion-Exclusion for Probabilities\|Thm 18.3]] |

One particularly important distinction for exams:

$$
\underbrace{P(A\cap B)=P(A)P(B\mid A)}_{\text{General product rule}}
$$

versus

$$
\underbrace{P(A\cap B)=P(A)P(B)}_{\text{Requires independence}}
$$

The second formula is a special case of the first.

---

## Reference
CS 70 Fall 2026, Notes 17-18: [[cs70/Course Notes/N17 Conditional Probability and Bayes' Rule|Note 17]] and [[cs70/Course Notes/N18 Inclusion-Exclusion and Combinations of Events|Note 18]]. Complement-based and at-least-one formulas are consequences of the probability rules developed in those notes.