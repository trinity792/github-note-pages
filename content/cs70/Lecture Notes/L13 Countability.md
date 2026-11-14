---
title: L13 Countability
Content Type: Lecture
Content Area:
Course: CS70
description: "The lecture introduced the proposer-rejector stable matching algorithm, defined rogue pairs and stable matchings, and proved that the algorithm halts, outputs a matching, and produces a stable matching. It also developed the improvement lemma and explained proposer-optimal and rejector-pessimal outcomes, contrasting the two-group setting with a roommate example that has no stable matching."
pinned: false
Date Published: October 8, 2026
Last Updated: October 8, 2026
Status: Finalized
---

# L13 Countability

## Executive Summary

The lecture began with course logistics and an explanation of how specification grading relates to Bloom's Taxonomy. Quizzes are intended to test application of individual topics, while midterm synthesis questions test whether students can analyze a new problem and determine which tools to use.

The mathematical portion studied stable matching. A roommate example first showed that a stable matching need not exist when everyone belongs to one group. The lecture then introduced a different setting with two disjoint groups - proposers and rejectors - and walked through the proposer-rejector algorithm.

The algorithm repeatedly lets proposers offer to their highest-ranked remaining choices, lets rejectors retain their favorite current offers, and permanently removes rejected choices from proposers' lists. The lecture proved that this process halts, always outputs a matching, and always outputs a stable matching. The key structural observation was the improvement lemma: once a rejector has received an offer, its held offer can only stay equally good or improve.

Finally, the lecture compared different stable matchings. The algorithm favors the proposing side: it produces a proposer-optimal and rejector-pessimal stable matching. Swapping the two groups therefore can change the result, even though either orientation still produces a stable matching.

---

## Course Structure and Assessment Philosophy

The instructor described the course as moving quickly through a fixed curriculum and acknowledged that students had been absorbing a large amount of material in a short time. Homework deadlines were being structured so that students could continue using the assignments to prepare until the relevant quiz.

### Bloom's Taxonomy and specification grading

The lecture used Bloom's Taxonomy to distinguish several kinds of learning:

- Remembering concerns recalling material.
- Understanding concerns explaining the material.
- Applying concerns using a learned technique.
- Analyzing concerns taking apart a new problem and deciding which tools are relevant.
- Evaluating and creating are higher levels that the ordinary quizzes generally do not target.

The quizzes are intended to operate mainly at the application level. The goal is to determine whether a student can apply each topic, rather than to let a student accumulate isolated points without demonstrating the complete competency. For example, merely writing base cases for several induction problems does not necessarily demonstrate that the student can carry out induction.

Midterm synthesis questions are intended to operate at the analysis level. A student is given a new problem and must recognize which tools, potentially several of them, should be applied. These questions are not intended to be difficult merely for the sake of separating the strongest students. Their role is to test whether the student has reached the analysis level.

Stretch problems may go beyond analysis and sometimes require creativity. The instructor cited a Chinese remainder theorem problem involving sequences and powers of primes as an example, although the exact statement of that problem was not recalled during the lecture.

### Midterm and homework schedule

The midterm was described as occurring in a week and a half and covering material through stable matching. Accountability and computability would not appear on that midterm. They would instead be assessed on a later quiz.

There would be no quiz on the Friday immediately after the midterm. A short homework covering only stable matching would be released to support midterm preparation. A separate accountability and computability homework would have an extended deadline and grace period so that it could support preparation for the later quiz.

A midterm information post was expected to include:

- Guidelines for taking the midterm.
- A mock midterm assembled from previously seen quizzes to demonstrate the format.
- A bank of problems resembling synthesis questions, drawn from earlier exams but not necessarily written originally as synthesis questions.

Students were advised to estimate approximately $20$ minutes for each synthesis question and approximately $15$ minutes for each individual-topic question. Actual time could vary by problem.

After the midterm, the course would begin probability. The final discrete mathematics quiz would occur during the first week of probability because quiz topics lag behind lectures. Stable matching, accountability, and computability would return on the final, providing another opportunity to demonstrate those topics.

---

## Motivation: An Unstable Roommate Problem

The opening mathematical example involved four people who had to be divided into two two-person dorm rooms. Each person ranked the other three possible roommates.

The displayed preferences were:

- Person $1$ ranked $2$, then $3$, then $4$.
- Person $2$ ranked $3$, then $1$, then $4$.
- The later reasoning established that person $3$ preferred $1$ to $2$ and ranked $4$ last.
- No one particularly wanted to live with person $4$.

The purpose of the example was to identify what can make a matching unstable.

### First attempted matching: $(1,2)$ and $(3,4)$

In the first matching, $1$ lived with $2$, while $3$ lived with $4$.

The fact that $3$ and $4$ disliked their pairing did not alone establish instability. A person can dislike a current match without having another person who would reciprocate a proposed change.

The actual instability came from $2$ and $3$:

- Person $3$ preferred $2$ to $4$.
- Person $2$ preferred $3$ to $1$.

Thus, both $2$ and $3$ would rather leave their assigned roommates and pair with each other. The pair $(2,3)$ could break the original arrangement.

### Second attempted matching: $(2,3)$ and $(1,4)$

After $2$ and $3$ paired, the remaining people were $1$ and $4$.

This arrangement was still unstable:

- Person $1$ preferred $3$ to $4$.
- Person $3$ preferred $1$ to $2$.

Therefore, $(1,3)$ could leave their current partners and pair together.

### Third attempted matching: $(1,3)$ and $(2,4)$

After $1$ and $3$ paired, the remaining people were $2$ and $4$.

This arrangement was also unstable:

- Person $2$ preferred $1$ to $4$.
- Person $1$ ranked $2$ as the top choice.

Thus, $(1,2)$ would pair together, returning to the original matching.

The attempted repairs therefore formed a cycle:

$$
\{(1,2),(3,4)\}
\longrightarrow
\{(2,3),(1,4)\}
\longrightarrow
\{(1,3),(2,4)\}
\longrightarrow
\{(1,2),(3,4)\}.
$$

Every possible pairing in this example was unstable. The example demonstrated that when all participants belong to one group and may match with one another, a stable matching need not exist.

---

## The Two-Group Stable Matching Setting

The main problem differed fundamentally from the roommate example. Instead of one group ranking itself, it had two disjoint groups:

- The numbered participants $1,2,3,4$.
- The lettered participants $A,B,C,D$.

Each number ranked all letters, and each letter ranked all numbers. No number was attempting to match with another number, and no letter was attempting to match with another letter.

The algorithm assigns asymmetric roles to the groups:

- One group consists of the proposers.
- The other group consists of the rejectors.

The input to the algorithm is the complete collection of rankings. Its intended output is a matching between the two groups.

The lecture emphasized that the algorithm itself is the mathematical object under study. Important questions include:

- Does the algorithm halt?
- When it halts, does it actually produce a matching?
- Is the resulting matching stable?
- What changes if the proposer and rejector groups swap roles?
- Does the algorithm favor one of the two groups?

---

## The Proposer-Rejector Algorithm

The proposer-rejector algorithm operates in repeated loops.

In each loop:

1. Every proposer offers to the highest-ranked rejector that has not previously rejected that proposer.
2. Each rejector considers all offers currently in hand and rejects every offer except its favorite.
3. Every rejected proposer permanently crosses that rejector off its preference list.

The process continues while offers are being rejected. When a loop produces no rejection, each rejector accepts the offer it is holding.

The phrase "takes no for an answer" described the permanence of rejection: once rejected by a particular rejector, a proposer never offers to that rejector again.

### Complete algorithm walkthrough

In the displayed example, the numbered participants were proposers and the letters were rejectors.

#### Loop 1

Each proposer offered to its top choice:

- Proposer $1$ offered to $A$.
- Proposers $2$, $3$, and $4$ offered to $B$.

Rejector $A$ had only one offer, so it retained $1$.

Rejector $B$ preferred $2$ among the received offers, so it retained $2$ and rejected $3$ and $4$.

The rejected proposers updated their lists:

- Proposer $3$ crossed $B$ off.
- Proposer $4$ crossed $B$ off.

#### Loop 2

The offers now in hand or newly made were:

- Proposers $1$ and $4$ offered to $A$.
- Proposer $2$ remained with $B$.
- Proposer $3$ offered to $C$.

Rejector $A$ preferred $4$ to $1$, so it retained $4$ and rejected $1$.

Proposer $1$ then crossed $A$ off its list.

#### Loop 3

The offers were:

- Proposer $4$ remained with $A$.
- Proposers $2$ and $1$ offered to $B$.
- Proposer $3$ remained with $C$.

Rejector $B$ preferred $2$ to $1$, so it retained $2$ and rejected $1$.

Proposer $1$ crossed $B$ off its list.

#### Loop 4

Proposer $1$ moved to its next remaining choice, $C$. Rejector $C$ now compared $1$ with $3$ and preferred $1$.

The held offers became:

- $A$ held $4$.
- $B$ held $2$.
- $C$ held $1$ and rejected $3$.

Proposer $3$ crossed $C$ off its list.

#### Loop 5

Proposer $3$ next offered to $A$. Rejector $A$ compared $3$ with its held offer from $4$ and rejected $3$.

Proposer $3$ crossed $A$ off its list.

#### Loop 6

Proposer $3$ next offered to $D$. The resulting held offers were:

- $A$ held $4$.
- $B$ held $2$.
- $C$ held $1$.
- $D$ held $3$.

No offer was rejected in this loop, so the algorithm stopped. Its output was

$$
\{(4,A),(2,B),(1,C),(3,D)\}.
$$

Equivalently, listing each rejector with its partner:

$$
A\leftrightarrow 4,\qquad
B\leftrightarrow 2,\qquad
C\leftrightarrow 1,\qquad
D\leftrightarrow 3.
$$

The fact that this is a one-to-one matching does not by itself show that it is desirable. For example, $D$ received its least-preferred proposer. The lecture therefore next supplied a mathematical meaning for a "good" matching.

---

## Normative Choices and Mathematical Claims

Stable matching has been used in real allocation settings. The lecture discussed its historical use in matching medical students to hospital residencies.

Hospitals wanted medical students as relatively inexpensive labor, producing an arms race in which hospitals extended offers increasingly early. Students could receive offers as juniors or even sophomores, sometimes with short expiration periods. A centralized stable matching process was introduced to address this problem.

The lecture cautioned that using an algorithm in the real world involves two translations:

$$
\text{real-world problem}
\longrightarrow
\text{mathematical model}
\longrightarrow
\text{real-world decision}.
$$

The mathematical work inside the model may produce axiomatic conclusions, but the translations are not themselves purely mathematical. Declaring an algorithm "good" or "fair" involves value judgments unless those terms have first been assigned precise mathematical definitions.

This gap was connected to a paper called *The Normative Gap* by Zoe Hitzig, discussed in relation to Boston school choice. The point was that translating a contested social problem into mathematics does not automatically remove the underlying controversy. The lecture described the algorithm's designers, in the paper's framing, as appearing less like engineers and more like "philosopher kings" making a thought experiment real.

For this lecture, "good" was replaced by the precise property of stability. That replacement permits mathematical proof, but choosing stability as the desired real-world property remains a normative modeling decision.

---

## Halting of the Algorithm

### Theorem

The stable matching algorithm always halts.

### Proof sketch

A new loop occurs only when at least one offer was rejected in the preceding loop. Therefore, whenever another loop is required, at least one proposer permanently crosses a rejector off its list.

If there are $N$ proposers and $N$ rejectors, the proposer rankings contain $N^2$ proposer-rejector entries in total. Each continued loop removes at least one such entry, and removed entries never return.

Thus, there can be at most $N^2$ loops in which rejections force the process to continue. Because the supply of list entries is finite and decreases with every continuing loop, the algorithm cannot run forever.

---

## Rogue Pairs and Stable Matchings

A person being unhappy with a partner does not by itself make a matching unstable. Instability requires two participants who both prefer each other to their current partners.

### Definition: rogue pair

Let $P$ be a proposer and $R$ a rejector. The pair $(P,R)$ is a **rogue pair** if:

- $P$ prefers $R$ to $P$'s current partner, and
- $R$ prefers $P$ to $R$'s current partner.

In compact form, if $M(P)$ and $M(R)$ denote their current partners, then $(P,R)$ is rogue when

$$
P \text{ prefers } R \text{ to } M(P)
$$

and

$$
R \text{ prefers } P \text{ to } M(R).
$$

The phrase "and vice versa" in the lecture emphasized that both preferences are required.

### Definition: unstable and stable matching

A matching is **unstable** if it contains a rogue pair.

A matching is **stable** if it contains no rogue pair.

A stable matching does not require everyone to receive a top choice. In the algorithm walkthrough, $D$ and $3$ were not necessarily happy with each other, but their dissatisfaction would create instability only if one of them could find a more preferred participant who reciprocated that preference.

### Two-person illustration

The lecture considered two proposers, $1$ and $2$, and two rejectors, $A$ and $B$, with the preferences:

- Both $1$ and $2$ preferred $A$ to $B$.
- Both $A$ and $B$ preferred $1$ to $2$.

Two possible matchings were compared.

The first was

$$
\{(1,B),(2,A)\}.
$$

Here, $1$ preferred $A$ to $B$, and $A$ preferred $1$ to $2$. Therefore, $(1,A)$ was a rogue pair, making the matching unstable.

The second was

$$
\{(1,A),(2,B)\}.
$$

In this matching, $1$ and $A$ received their top choices. Although $2$ and $B$ received their least-preferred choices, neither could form a mutually preferred alternative:

- If $2$ tried to move to $A$, $A$ would prefer to remain with $1$.
- If $B$ tried to move to $1$, $1$ would prefer to remain with $A$.

Thus the second matching was stable.

---

## The Improvement Lemma

The stable matching algorithm affects the two sides differently as it proceeds.

Proposers begin in the best imaginable position: each initially offers to its top choice. When rejected, a proposer moves downward through its ranking. Thus, from the proposers' perspective, options can only stay the same or become worse as the algorithm continues.

Rejectors move in the opposite direction. A rejector retains its favorite offer received so far and replaces it only when a better offer arrives. Thus, a rejector's held offer can only stay the same or improve.

### Improvement Lemma

Suppose proposer $P$ makes an offer to rejector $R$ during loop $\ell$. In every later loop, $R$ has an offer in hand that it likes at least as much as $P$.

The offer might remain $P$, or $R$ might later replace $P$ with a more preferred proposer. However, $R$ never moves from $P$ to a less-preferred offer.

The lecture stated that this lemma can be proved by induction on the loops:

- The base situation begins when $R$ receives $P$'s offer.
- In moving from loop $k$ to loop $k+1$, $R$ either keeps the current favorite or replaces it with something better.
- Therefore, the held offer never becomes worse.

The complete induction proof was left to the course notes.

---

## Why the Algorithm Always Outputs a Matching

### Theorem

The stable matching algorithm always outputs a matching.

The lecture had already proved that the algorithm halts. It then used contradiction to rule out the possibility that the algorithm halts with a proposer unmatched.

### Proof by contradiction

Assume the algorithm finishes and some proposer $P$ is left unmatched.

For $P$ to be unmatched at termination, $P$ must have made an offer to every one of the $N$ rejectors and been rejected by all of them. Otherwise, $P$ would still have an untried rejector to whom it could offer.

By the improvement lemma, a rejector that rejected $P$ did not become empty-handed. That rejector had another offer it preferred, and from that point onward it continued to hold an offer at least as good.

Therefore, at termination:

- Each of the $N$ rejectors has a proposer in hand.
- The proposer $P$ is additionally left unmatched.

This would require at least $N+1$ proposers: one for each of the $N$ rejectors, plus $P$. But the process began with only $N$ proposers. This is a contradiction.

Hence no proposer can remain unmatched when the algorithm terminates, so the result is a matching.

---

## Why the Output Is Stable

### Theorem

The stable matching algorithm always outputs a stable matching.

### Direct proof

Consider any pair $(P,R)$ in the final matching. Suppose there is another rejector $R^*$ whom $P$ prefers to $R$.

Formally, assume

$$
P \text{ is matched to } R
$$

and

$$
P \text{ prefers } R^* \text{ to } R.
$$

Because proposers move down their rankings in order, $P$ must have offered to $R^*$ before eventually offering to $R$. Since $P$ did not finish matched to $R^*$, rejector $R^*$ must have rejected $P$ at some point.

By the improvement lemma, after receiving $P$'s offer, $R^*$ could only retain an offer it liked at least as much as $P$. Consequently, in the final matching, $R^*$ prefers its final partner to $P$.

Thus, whenever $P$ prefers $R^*$ to its assigned partner, $R^*$ does not reciprocate. The pair $(P,R^*)$ is therefore not rogue.

Because the same reasoning applies to every possible alternative rejector $R^*$ and every final pair $(P,R)$, no rogue pair exists. Hence the matching is stable.

This result is stronger than merely asserting that a stable matching exists: the algorithm constructs one.

---

## Why Two Disjoint Groups Matter

The stable matching guarantee depends on the bipartite structure of the problem. There must be two distinct categories, such as:

- Medical students and residencies.
- Candidates and employers.
- Dessert makers and savory-dish makers in a cooking competition.

Each participant ranks members of the other category, not members of its own category.

The roommate example had only one category, and the cycle of rogue pairs showed that no stable matching existed there. By contrast, in the two-group setting, the proposer-rejector algorithm always halts with a stable matching.

Turning a one-group problem into a two-group problem would require making an additional modeling choice about how to divide the participants. That would create a fundamentally different problem rather than directly solve the original roommate problem.

---

## Comparing Multiple Stable Matchings

A given set of rankings can have more than one stable matching. The lecture displayed two such matchings and compared how individual participants ranked their outcomes.

Some participants had the same partner in both matchings, so they were indifferent between the two. For the participants whose partners changed, one matching was systematically better for the numbered group, while the other was systematically better for the lettered group.

This motivated a stronger question than whether a matching is stable: among all stable matchings, which one is best for each side?

### Definition: optimal rejector for a proposer

For a proposer $P$, an **optimal rejector** is the highest-ranked rejector on $P$'s list with whom $P$ can be paired in some stable matching.

This is not necessarily $P$'s overall top choice. It is the best partner that $P$ can obtain subject to the condition that the entire matching remains stable.

### Proposer-optimal stable matching

A stable matching is **proposer-optimal** when every proposer is paired with its own optimal rejector.

The lecture stated that the stable matching algorithm always produces the proposer-optimal stable matching. Every proposer therefore receives the best partner it could possibly receive in any stable matching.

### Rejector-pessimal stable matching

The same result is **rejector-pessimal**. Each rejector receives the worst partner it could receive among all stable matchings.

The lecture gave an intuitive picture of a spectrum:

$$
\text{rejector top choices}
\quad\longleftrightarrow\quad
\text{proposer top choices}.
$$

The algorithm begins on the proposer-favored side because every proposer initially chooses its top-ranked rejector. As rejections occur:

- The outcome becomes weakly worse for proposers.
- The outcome becomes weakly better for rejectors.

If the possible stable matchings form a region along this conceptual spectrum, the algorithm stops at the first stable matching reached while moving away from the proposers' ideal side. That boundary stable matching is best for all proposers and worst for all rejectors among the stable matchings.

This picture was presented as intuition rather than as the formal proof of optimality.

---

## Swapping Proposers and Rejectors

Swapping the groups does not change the basic guarantees:

- The algorithm still halts.
- It still outputs a matching.
- The matching is still stable.

However, swapping the groups can change which stable matching is selected. Since the algorithm favors proposers, making the original rejectors into proposers reverses which side receives its optimal stable outcome.

With the roles reversed, the algorithm moves from the original rejectors' top-choice side toward the original proposers' side. The resulting matching is:

- Optimal for the new proposers.
- Pessimal for the new rejectors.

The lecture initially misstated the historical direction of the medical residency system and then corrected it. The corrected account was that medical schools formerly did the proposing and medical students did the rejecting. The roles were later swapped so that medical students became the proposers, which favored the students within the set of stable matchings.

---

## Uniqueness of a Stable Matching

The lecture considered what it would mean if the proposer-optimal stable matching were identical to the rejector-optimal stable matching.

The proposer-optimal matching lies at the stable outcome most favorable to proposers. The rejector-optimal matching lies at the stable outcome most favorable to rejectors. If these two extreme stable matchings coincide, then there is no room for another distinct stable matching between them.

Therefore, if

$$
M_{\text{proposer-optimal}}
=
M_{\text{rejector-optimal}},
$$

then there is exactly one stable matching.

That single matching is simultaneously proposer-optimal and rejector-optimal.