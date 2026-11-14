---
title: CS 70 Note 11 — Stable Matching and the Propose-and-Reject Algorithm
Content Type: Course Notes
Content Area: Discrete Mathematics
description: "Develops the Propose-and-Reject algorithm for stable matching, proves termination and stability using the Improvement Lemma, and introduces the well-ordering principle. Proves that the resulting matching is employer optimal and candidate pessimal."
Course: CS 70
pinned: false
Date Published: October 16, 2026
Last Updated: October 16, 2026
Status: Finalized
---

# CS 70 Note 11 — Stable Matching and the Propose-and-Reject Algorithm

The **Stable Matching Problem** provides an application of proof techniques to the analysis of an algorithm. This note introduces **Propose-and-Reject**, proves that it terminates with a stable matching, and investigates whose preferences it favors. A detour through the **well-ordering principle** connects first-counterexample arguments with induction.

## 1. The Stable Matching Problem

Suppose an employment system must match $n$ jobs with $n$ candidates. Each job has an ordered preference list of all $n$ candidates, and each candidate has an ordered list of all $n$ jobs. One possible setting is a hypothetical EECS internship system.

For $n=3$, consider jobs at Approximation Inc., Basis Co., and Control Corp., and candidates Anita, Bridget, and Christine. Preferences run from most favorable to least favorable:

| Job | First choice | Second choice | Third choice |
|---|---|---|---|
| Approximation Inc. | Anita | Bridget | Christine |
| Basis Co. | Bridget | Anita | Christine |
| Control Corp. | Anita | Bridget | Christine |

| Candidate | First choice | Second choice | Third choice |
|---|---|---|---|
| Anita | Basis Co. | Approximation Inc. | Control Corp. |
| Bridget | Approximation Inc. | Basis Co. | Control Corp. |
| Christine | Approximation Inc. | Basis Co. | Control Corp. |

For clarity, the source uses female pronouns for candidates and neutral pronouns for jobs.

Two possible matchings are

$$
\begin{aligned}
\{& (\text{Approximation Inc.},\text{Anita}),\\
& (\text{Basis Co.},\text{Bridget}),\\
& (\text{Control Corp.},\text{Christine})\}
\end{aligned}
$$

and

$$
\begin{aligned}
\{& (\text{Approximation Inc.},\text{Bridget}),\\
& (\text{Basis Co.},\text{Christine}),\\
& (\text{Control Corp.},\text{Anita})\}.
\end{aligned}
$$

The goal is more than an arbitrary pairing: the system should make everyone happy in the sense that nobody can realistically benefit by switching jobs. Can this be achieved efficiently?

The **Propose-and-Reject algorithm**, also called the **Gale-Shapley algorithm**, is a simple, fast, and widely used solution.

---

## 2. The Propose-and-Reject Algorithm

Think of the algorithm as proceeding in discrete **days**.

> [!important] Propose-and-Reject
> **Every morning:** Each job proposes to the most preferred candidate on its list who has not yet rejected it.
> **Every afternoon:** Each candidate collects her offers, says “maybe” to the one she likes best, and rejects all others. The preferred offer is now **in hand**, or **on a string**.
> **Every evening:** Each rejected job crosses the rejecting candidate off its list.
> Repeat until no offers are rejected. On that day, every candidate accepts the offer in hand, and the algorithm terminates.

An offer in hand is proposed again the next morning unless it has been rejected. Thus candidates may replace an offer in hand with a better one, while a job cannot withdraw an unrejected offer.

For the example in Section 1, the following table records each day's proposals. Bold offers are in hand at the end of the day.

| Day | Candidate | Offers |
|---|---|---|
| 1 | Anita | **Approximation Inc.**, Control Corp. |
| 1 | Bridget | **Basis Co.** |
| 1 | Christine | None |
| 2 | Anita | **Approximation Inc.** |
| 2 | Bridget | **Basis Co.**, Control Corp. |
| 2 | Christine | None |
| 3 | Anita | **Approximation Inc.** |
| 3 | Bridget | **Basis Co.** |
| 3 | Christine | **Control Corp.** |

The output is

$$
\begin{aligned}
\{& (\text{Approximation Inc.},\text{Anita}),\\
& (\text{Basis Co.},\text{Bridget}),\\
& (\text{Control Corp.},\text{Christine})\}.
\end{aligned}
$$

Before analyzing the algorithm, consider why stable matching matters in practice.

---

## 3. The Residency Match

A well-known application pairs medical school graduates with residency slots at teaching hospitals. Graduates and hospitals submit ordered preferences, and a computer produces a stable matching.

Residency programs began about a century before the source's account. Interns supplied inexpensive labor, and residency slots soon outnumbered graduates. Competition drove hospitals to make offers earlier and earlier. By the mid-1940s, offers were arriving at the beginning of students' junior year, and some hospitals contemplated offers to sophomores.

The American Medical Association prohibited medical schools from releasing transcripts and reference letters until senior year. This produced another problem: hospitals issued **short-fuse offers** so that they could still find replacements if rejected. Competition shortened the decision window to only a few hours.

In the early 1950s, the centralized **National Residency Matching Program (N.R.M.P.)** began collecting rankings from hospitals and residents. Its initial pairings were not stable. In 1952, it switched to Propose-and-Reject and obtained stable matchings.

In 2012, Lloyd Shapley and Alvin Roth received the Nobel Prize in Economic Sciences for extensions of this algorithm. The source's lesson is that careful modeling with appropriate abstractions pays off.

---

## 4. Properties of the Propose-and-Reject Algorithm

We want to show that the algorithm **halts** and that it produces a **stable matching**.

### Lemma 11.1 — Termination

The Propose-and-Reject algorithm always halts.

#### Proof

On each day that the algorithm does not halt, at least one job eliminates a candidate from its list. Otherwise, there would be no rejection, and the algorithm would halt.

Each of the $n$ lists has $n$ entries. Consequently, the algorithm must terminate in at most $n^2$ iterations, or days.

### 4.1. Stability

There are many possible criteria for a good matching: maximize first choices, minimize last choices, or minimize the sum of ranks to maximize average happiness. Here the criterion is more basic and rooted in autonomy.

A **rogue couple** is a job and a candidate who both prefer each other to their current partners. A matching is **unstable** if it contains a rogue couple and **stable** if it contains none.

A rogue candidate could renege on her official offer while the rogue employer fires its official hire. One job becomes empty, and an innocent candidate loses her job. Stability removes these incentives.

> [!tip] Concept Check
> For the preferences in Section 1, consider $\{(\text{Approximation Inc.},\text{Christine}),(\text{Basis Co.},\text{Bridget}),(\text{Control Corp.},\text{Anita})\}$. Why is this matching unstable?
> **Hint:** Approximation Inc. and Bridget form a rogue couple. Why?

A stable matching for the same preferences is

$$
\begin{aligned}
\{& (\text{Basis Co.},\text{Anita}),\\
& (\text{Approximation Inc.},\text{Bridget}),\\
& (\text{Control Corp.},\text{Christine})\}.
\end{aligned}
$$

Why is Approximation Inc. with Anita not a rogue couple? The employer prefers Anita to Bridget, but Anita prefers her current employer, Basis Co., to Approximation Inc.

Control Corp. and Christine each receive their least favorite choice. This does not violate stability: none of their preferred alternatives prefers them to its current partner.

#### An Incorrect Existence Argument

Do stable matchings always exist? A tempting argument starts from any matching and repeatedly pairs a rogue couple, claiming that the result must eventually become stable.

> [!warning] Fixing One Rogue Couple Can Create Others
> Pairing a rogue couple removes that couple from the rogue list, but can create new rogue couples. The procedure has no demonstrated reason to terminate.

The **Roommates Problem** illustrates the flaw. Here $2n$ people must be paired, and any person may be paired with any of the other $2n-1$ people. There are no two distinct types of partners.

If repeatedly pairing rogue couples always worked without using the two-type asymmetry, it would work for roommates too. But the following instance has no stable matching:

| Person | First choice | Second choice | Third choice |
|---|---|---|---|
| $A$ | $B$ | $C$ | $D$ |
| $B$ | $C$ | $A$ | $D$ |
| $C$ | $A$ | $B$ | $D$ |
| $D$ | Unspecified | Unspecified | Unspecified |

$D$'s preferences do not affect the argument. The matching $\{(A,B),(C,D)\}$ has rogue couple $B,C$. The matching $\{(B,C),(A,D)\}$ has rogue couple $A,C$.

> [!tip] Concept Check
> Verify that this roommates instance has no stable matching.

Any proof that stable matchings always exist in the original problem must use the two distinct types in an essential way. Historically, the problem was called **Stable Marriage**, with men and women as the two types. Mathematically, the two sets could instead be packets and network ports, computational jobs and servers, threads and cores, or students and class slots.

### 4.2. Analysis

We prove existence by showing that Propose-and-Reject always outputs a stable matching.

#### Observation 11.1 — Opposing Directions of Improvement

Each job starts with its first choice as a possibility. As the algorithm proceeds, its best available option can only get worse. Each candidate's offers can only get better.

Intuitively, jobs and candidates eventually meet in the middle. The following lemma makes the candidate side precise.

#### Lemma 11.2 — Improvement Lemma

If job $J$ makes an offer to candidate $C$ on the $k$th day, then on every subsequent day $C$ has an offer in hand that she likes at least as much as $J$.

#### Proof of Lemma 11.2 by Induction

Induct on day $i$, for $i\ge k$.

**Base case, $i=k$:** Candidate $C$ receives at least the offer from $J$. She retains the best offer, so she holds either $J$ or an offer she likes more.

**Inductive hypothesis:** Assume the claim for an arbitrary $i\ge k$.

**Inductive step:** On day $i$, $C$ holds an offer from a job $J'$ that she likes at least as much as $J$. The job $J'$ may be $J$. Since its offer has not been rejected, $J'$ proposes to $C$ again on day $i+1$.

At the end of day $i+1$, $C$ holds either $J'$ or an offer she likes more than $J'$. Either way, she likes it at least as much as $J$. This completes the induction.

#### Alternate Proof of Lemma 11.2

The claim holds on day $k$. Suppose, for contradiction, that day $i>k$ is the first counterexample: $C$ has either no offer or an offer from a job $J^*$ inferior to $J$.

Because this is the first counterexample, on day $i-1$ she held an offer from some $J'$ that she liked at least as much as $J$. Offers cannot be withdrawn, so $J'$ still offers to $C$ on day $i$.

Thus $C$ has at least the choice $J'$ on day $i$. Her best choice must be at least as good as $J'$, and hence better than $J^*$ or no offer. This contradicts the assumed counterexample.

#### Detour: The Well-Ordering Principle

The alternate proof is also induction. After establishing the base case, instead of proving

$$
(\forall i)\bigl(P(i)\implies P(i+1)\bigr),
$$

it rules out the negation

$$
(\exists i)\neg\bigl(P(i)\implies P(i+1)\bigr).
$$

By the law of the excluded middle, the original implication holds for every $i$.

> [!tip] Concept Check
> Ensure you understand why the two proofs of Lemma 11.2 are equivalent.

**Definition 11.1 (Well-ordering principle).** If $S\subseteq\mathbb{N}$ and $S\ne\varnothing$, then $S$ has a smallest element.

> [!tip] Concept Check
> What is the smallest element of each set: $S_1=\{5,2,11,7,8\}$, $S_2=\{n\in\mathbb{N}:n\text{ is odd}\}$, and $S_3=\{n\in\mathbb{N}:n\text{ is prime}\}$?

The alternate proof uses well-ordering when choosing the **first counterexample**. Without this principle, such a first counterexample need not exist. Induction also relies on the natural numbers' well-defined order. This property may seem familiar, but many familiar sets of numbers do not have it.

> [!tip] Concept Check
> Do the integers satisfy the well-ordering principle? What about the reals? What about the non-negative reals?

#### Lemma 11.3 — Termination with a Matching

The Propose-and-Reject algorithm always terminates with a matching.

Before reading the proof, try to convince yourself that every candidate must have an offer when the algorithm terminates.

#### Proof of Lemma 11.3

Suppose, for contradiction, that a job $J$ is unpaired when the algorithm terminates. It must have offered to every candidate on its list and been rejected by all $n$ of them.

When a candidate rejected $J$, she held a better offer. By the Improvement Lemma, she still holds an offer when the algorithm terminates. Therefore, all $n$ candidates have $n$ jobs in hand, excluding $J$.

This requires at least $n+1$ jobs, contradicting the assumption that there are only $n$.

#### Theorem 11.1 — Stability

The matching produced by the algorithm is always stable.

#### Proof of Theorem 11.1

We directly show that no job can be part of a rogue couple. Consider a pair $(J,C)$ in the final matching and a candidate $C^*$ whom $J$ prefers to $C$.

Because $C^*$ appears earlier than $C$ on $J$'s list, $J$ offered to $C^*$ before offering to $C$. By the Improvement Lemma, $C^*$ likes her final job at least as much as $J$, and therefore prefers it to $J$.

Thus $(J,C^*)$ cannot be a rogue couple. No job belongs to a rogue couple, so the matching is stable.

---

## 5. Optimality

Stability is a basic guarantee. Can the system also achieve some notion of **optimality**?

Consider four jobs, labeled $1,2,3,4$, and four candidates, labeled $A,B,C,D$:

| Job | First choice | Second choice | Third choice | Fourth choice |
|---|---|---|---|---|
| $1$ | $A$ | $B$ | $C$ | $D$ |
| $2$ | $A$ | $D$ | $C$ | $B$ |
| $3$ | $A$ | $C$ | $B$ | $D$ |
| $4$ | $A$ | $B$ | $C$ | $D$ |

| Candidate | First choice | Second choice | Third choice | Fourth choice |
|---|---|---|---|---|
| $A$ | $1$ | $3$ | $2$ | $4$ |
| $B$ | $4$ | $3$ | $2$ | $1$ |
| $C$ | $2$ | $3$ | $1$ | $4$ |
| $D$ | $3$ | $4$ | $2$ | $1$ |

There are exactly two stable matchings:

$$
\mathcal{M}=\{(1,A),(2,D),(3,C),(4,B)\},
$$

and

$$
\mathcal{M}'=\{(1,A),(2,C),(3,D),(4,B)\}.
$$

What is each participant's best possible partner? Job $2$ ranks $A$ first, but $A$ is not a realistic possibility: job $2$ is low on $A$'s list, and other jobs also prefer $A$. No stable matching pairs $2$ with $A$. Among the two stable matchings, job $2$'s best outcome is $D$.

### Definition 11.2 — Optimal Candidate for a Job

The **optimal candidate** for a job $J$ is the highest-ranked candidate on $J$'s preference list with whom $J$ is paired in **some stable matching**.

This is the best a job can do subject to stability.

> [!tip] Concept Check
> Who are the optimal candidates for jobs $1,2,3,4$ above?
> **Hint:** Job $2$'s optimal candidate is $D$.

A **job/employer optimal matching** pairs every job with its optimal candidate. It is not automatic from the definition that all jobs can achieve their individual optima simultaneously.

In the example, $\mathcal{M}$ is employer optimal: $A,D,C,B$ are the optimal candidates for jobs $1,2,3,4$, respectively.

### Definition 11.3 — Optimal Job for a Candidate

The **optimal job** for a candidate $C$ is the highest-ranked job on $C$'s preference list with which $C$ is paired in **some stable matching**.

A **candidate optimal matching** pairs every candidate with her optimal job.

> [!tip] Concept Check
> Check that $\mathcal{M}'$ is candidate optimal in the example above.

The **pessimal candidate** for a job is the lowest-ranked candidate with whom it is paired in some stable matching. This leads to employer pessimal and candidate pessimal matchings. Can you define both?

### Theorem 11.2 — Employer Optimality

The matching output by Propose-and-Reject is job/employer optimal.

#### Proof

Suppose, for contradiction, that the output is not employer optimal. Then some job is rejected by its optimal candidate. Let day $k$ be the first day when this happens.

Suppose job $J$ is rejected by its optimal candidate $C^*$ in favor of job $J^*$. By the definition of optimal candidate, there is a stable matching

$$
\mathcal{M}=\{\ldots,(J,C^*),\ldots,(J^*,C'),\ldots\}.
$$

We show that $(J^*,C^*)$ is a rogue couple in $\mathcal{M}$.

First, $C^*$ prefers $J^*$ to $J$, because she rejected $J$'s offer for $J^*$'s offer during the algorithm.

Second, before day $k$, $J^*$ had not been rejected by its optimal candidate, since $k$ is the first day when any such rejection occurs. As $J^*$ offers to $C^*$ on day $k$, it likes $C^*$ at least as much as its optimal candidate, and hence at least as much as $C'$, its partner in the stable matching $\mathcal{M}$.

Therefore, $(J^*,C^*)$ is a rogue couple, contradicting the stability of $\mathcal{M}$. The output must be employer optimal.

This is again induction structured as an application of well-ordering.

> [!tip] Concept Check
> Where does the proof of Theorem 11.2 use the well-ordering principle?

#### Exercise — An Inductive Formulation

Rewrite the proof of Theorem 11.2 as a regular induction proof.

**Hint:** The proof is showing, by induction on $k$, that no job gets rejected by its optimal candidate on the $k$th day.

### Theorem 11.3 — Candidate Pessimality

If a matching is employer/job optimal, then it is also candidate pessimal.

#### Proof

Let

$$
\mathcal{M}=\{\ldots,(J,C),\ldots\}
$$

be employer optimal. By Theorem 11.2, this is the kind of matching produced by the algorithm.

Suppose, for contradiction, that $J$ is not the pessimal job for $C$. Then there is a stable matching

$$
\mathcal{M}'=\{\ldots,(J^*,C),\ldots,(J,C'),\ldots\}
$$

in which $C$ ranks $J^*$ below $J$.

By assumption, $C$ prefers $J$ to $J^*$. Also, $J$ prefers $C$ to $C'$, because $C$ is its partner in the employer optimal matching $\mathcal{M}$.

Thus $(J,C)$ is a rogue couple in $\mathcal{M}'$, contradicting stability. The employer optimal matching is candidate pessimal.

> [!important] The Algorithm's Asymmetry
> Propose-and-Reject produces an employer optimal and candidate pessimal matching when jobs propose. Optimality and pessimality here are measured among **stable matchings**.

#### Exercise — Favoring Candidates

What simple modification to Propose-and-Reject would make it always output a candidate optimal matching?

### Returning to the Residency Match

Initially, hospitals proposed, producing hospital optimal matchings. In the 1990s, the roles were reversed so that medical students proposed. More recent enhancements account for married students seeking positions at the same or nearby hospitals.

The algorithm runs inside a computer. None of its intermediate offers are made to humans; only the final stable offer is communicated.

---

## 6. Further Reading (Optional)

Although used ten years earlier, Propose-and-Reject was first properly analyzed by Gale and Shapley in 1962. The source recommends:

- D. Gale and L. S. Shapley, “College Admissions and the Stability of Marriage,” *American Mathematical Monthly* 69 (1962), pp. 9-14.
- D. Gusfield and R. W. Irving, *The Stable Marriage Problem: Structure and Algorithms*, MIT Press, 1989.

Stable matching and its variants remain active research topics in EECS and economics. The second reference covers many developments following Gale and Shapley's algorithm.
