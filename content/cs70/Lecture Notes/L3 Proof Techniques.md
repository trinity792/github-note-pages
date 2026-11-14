---
title: L3 Proof Techniques
Content Type: Lecture
Content Area:
Course: CS70
description: "The lecture introduced biconditional proofs and reviewed direct and contrapositive proof techniques through parity and divisibility examples. It then developed proof by contradiction using a linear combination and began the classical argument that square root of 2 is irrational, which remained incomplete in the recorded portion."
pinned: false
Date Published: September 3, 2026
Last Updated: September 3, 2026
Status: Finalized
---

# L3 Proof Techniques

## Executive Summary

The lecture explained that a biconditional $P$ if and only if $Q$ consists of two implications, so proving it requires proofs in both directions. The statement that an integer $n$ is odd if and only if $n^2$ is odd illustrated a direct proof in one direction and a contrapositive proof in the other.

A second direct-proof example established that if $a$ divides both $b$ and $c$, then $a$ divides $b-c$. This walkthrough emphasized several common proof-writing pitfalls: assuming the desired conclusion, using the same witness for two separate existential statements, and failing to specify that witnesses are integers.

The lecture then introduced proof by contradiction. One example showed that no integers $m,n$ satisfy $15m+35n=1$. A longer contradiction argument began proving that $\sqrt{2}$ is irrational, but the proof did not reach its final contradiction in the recorded portion.

The lecture also covered quiz logistics and emphasized that the first quiz tests direct proofs specifically.

---

## Biconditionals

The biconditional symbol expresses “if and only if.” Formally,

$$
P \iff Q
$$

means the same thing as the conjunction of the two implications

$$
(P \implies Q)\land(Q\implies P).
$$

The instructor also described the biconditional as “implications going back and forth.” In English, “$P$ iff $Q$,” where “iff” has two f's, is shorthand for “$P$ if and only if $Q$.”

Because a biconditional contains two implications, proving $P\iff Q$ requires two separate directions:

1. Prove $P\implies Q$.
2. Prove $Q\implies P$.

Completing only one direction does not establish the full biconditional.

### Example: An Integer Is Odd If and Only If Its Square Is Odd

The claim was

$$
n\text{ is odd}\iff n^2\text{ is odd}.
$$

The two required directions are

$$
n\text{ is odd}\implies n^2\text{ is odd}
$$

and

$$
n^2\text{ is odd}\implies n\text{ is odd}.
$$

The class identified the first direction as easier to prove directly.

### First Direction: Oddness of $n$ Implies Oddness of $n^2$

A direct proof begins by assuming the antecedent and identifying the desired consequence:

- Assume $n$ is odd.
- Show that $n^2$ is odd.

By the definition of oddness, there exists an integer $k$ such that

$$
n=2k+1.
$$

The instructor noted that a form such as $2k-1$ could also represent an odd integer, provided the definition is stated appropriately.

To learn something about $n^2$, substitute the known form of $n$:

$$
\begin{aligned}
n^2
&=(2k+1)^2\\
&=4k^2+4k+1\\
&=2(2k^2+2k)+1.
\end{aligned}
$$

Since $k$ is an integer, the expression $2k^2+2k$ is an integer. Thus $n^2$ has the form “two times an integer plus one,” so $n^2$ is odd.

The inner integer could be given a new name, such as

$$
k'=2k^2+2k,
$$

making the conclusion

$$
n^2=2k'+1.
$$

This completes the first implication.

### Why the Reverse Direction Is Harder Directly

For the reverse implication, a direct proof would begin:

- Assume $n^2$ is odd.
- Show that $n$ is odd.

The assumption gives an integer $k$ such that

$$
n^2=2k+1.
$$

One attempted algebraic move was to take square roots:

$$
n=\pm\sqrt{2k+1}.
$$

The instructor observed that this expression does not clearly reveal that $n$ has the form $2j+1$. This illustrates that following valid algebraic steps does not guarantee that a direct proof will expose the needed structure.

The instructor encouraged writing down assumptions and definitions even when the path is not yet clear. This “lays out the tools on the table” and gives a proof attempt a concrete starting point.

### Reverse Direction by Contrapositive

The implication to prove is

$$
n^2\text{ is odd}\implies n\text{ is odd}.
$$

Instead of proving it directly, the lecture used its contrapositive:

$$
n\text{ is not odd}\implies n^2\text{ is not odd}.
$$

For integers, this was restated as

$$
n\text{ is even}\implies n^2\text{ is even}.
$$

Assume that $n$ is even. By definition, there exists an integer $k$ such that

$$
n=2k.
$$

Then

$$
\begin{aligned}
n^2
&=(2k)^2\\
&=4k^2\\
&=2(2k^2).
\end{aligned}
$$

Because $2k^2$ is an integer, $n^2$ is two times an integer and is therefore even. This proves the contrapositive, and hence proves

$$
n^2\text{ is odd}\implies n\text{ is odd}.
$$

Since both directions have now been proved, the full biconditional follows:

$$
n\text{ is odd}\iff n^2\text{ is odd}.
$$

---

## Direct Proof

To prove an implication

$$
P\implies Q
$$

directly, the instructor described the following pattern:

1. Assume $P$, the antecedent.
2. Record that the goal is to show $Q$, the consequence.
3. Apply valid implication steps beginning from the assumption.
4. Reach $Q$.

The first line, “Assume $P$,” is often available before any problem-specific insight is needed. Definitions then translate the natural-language assumption into mathematical structure that can be manipulated.

The instructor stressed that a blank page need not remain blank: write the assumption, state the target, expand the relevant definitions, and follow the resulting expressions as far as possible.

---

## Contrapositive Proof

An implication is logically equivalent to its contrapositive:

$$
P\implies Q
\quad\text{is logically equivalent to}\quad
\neg Q\implies\neg P.
$$

Therefore, to prove $P\implies Q$ by contrapositive:

1. State that the proof is by contrapositive.
2. Assume $\neg Q$.
3. Use valid implications to derive $\neg P$.

This technique can replace a difficult direct proof with a simpler equivalent problem. In the parity example, reasoning from “$n^2$ is odd” to “$n$ is odd” did not readily expose the form of $n$, while reasoning from “$n$ is even” to “$n^2$ is even” followed immediately from the definition of evenness.

The instructor emphasized that there may be several valid proof techniques for a statement. Choosing among direct proof, contrapositive, contradiction, and proof by cases can depend on which method produces the clearest argument.

---

## Divisibility and a Direct-Proof Walkthrough

The lecture defined the notation

$$
a\mid b
$$

to mean that $a$ divides $b$. Formally, this means there exists an integer $k$ such that

$$
b=ak.
$$

In words, $b$ is a multiple of $a$.

For example,

$$
2\mid b
$$

is another way of saying that $b$ is even, because it means that $b=2k$ for some integer $k$.

### Claim: Common Divisibility Is Preserved Under Subtraction

The claim was that for integers $a,b,c$,

$$
(a\mid b)\land(a\mid c)\implies a\mid(b-c).
$$

A direct proof begins by assuming the antecedent:

$$
a\mid b
\quad\text{and}\quad
a\mid c.
$$

The desired conclusion is

$$
a\mid(b-c).
$$

By definition, reaching this conclusion requires showing that $b-c$ equals $a$ times some integer.

### Pitfall: Assuming the Desired Conclusion

The instructor demonstrated an invalid circular argument:

1. Write that the goal is $a\mid(b-c)$.
2. Rewrite this as the existence of an integer $k$ such that
   $$
   b-c=ka.
   $$
3. Conclude that $a\mid(b-c)$.

This proves nothing because the needed equation was taken from the desired conclusion rather than derived from the assumptions. The instructor described the “want to show” line as being behind glass: it records the destination, but it is not an available premise.

A direct proof may assume the antecedent, but it may not assume the consequent.

### Pitfall: Reusing an Existential Witness

From $a\mid b$, there exists an integer $k$ such that

$$
b=ak.
$$

From $a\mid c$, one might incorrectly use the same $k$ and write

$$
c=ak.
$$

Doing so would force $b=c$, which was never assumed. The two divisibility statements may involve different multiples of $a$, so they require separate witnesses.

Use integers $k$ and $j$ such that

$$
b=ak
\quad\text{and}\quad
c=aj.
$$

The instructor connected this issue to variable scope: a witness belongs to the particular statement or proof portion in which it was introduced.

### Correct Derivation

Starting with the two separate witnesses,

$$
b=ak
\quad\text{and}\quad
c=aj,
$$

compute the target expression:

$$
\begin{aligned}
b-c
&=ak-aj\\
&=a(k-j).
\end{aligned}
$$

Since $k$ and $j$ are integers, $k-j$ is an integer. Therefore $b-c$ is an integer multiple of $a$, so

$$
a\mid(b-c).
$$

This completes the direct proof.

### Why Integer Witnesses Must Be Declared

When using definitions of parity or divisibility, the witness must be specified as an integer. The instructor noted that without this requirement, one could incorrectly classify values using arbitrary noninteger multipliers. The conclusion that an expression such as $2k^2$ is an integer depends on beginning with $k\in\mathbb Z$.

Within the course, closure facts such as products and differences of integers being integers may be taken as given. The instructor noted that proving such closure facts belongs beyond the present scope.

---

## Proof by Contradiction

Proof by contradiction was introduced as a method for proving a proposition $P$ when directly handling $P$ gives little structure.

The pattern is:

1. Assume the negation, $\neg P$.
2. Derive a contradiction, represented as a proposition $R$ together with its negation $\neg R$.
3. Conclude that the assumption $\neg P$ cannot hold, so $P$ is true.

Symbolically, the desired endpoint is

$$
R\land\neg R.
$$

The contradiction symbol was described visually as two opposing lines. The technique was also called *reductio ad absurdum*, or reduction to the absurd: assuming the opposite of the desired claim leads to an impossible result.

The instructor recommended explicitly announcing “proof by contradiction” so that the reader knows why the proof begins by assuming the opposite of its claim.

### Why Contradiction Can Help

A negative existence claim, such as “there do not exist integers with a certain property,” gives no particular objects to manipulate. Assuming its negation produces actual witnesses and equations. Those objects provide structure that can be followed until an impossibility emerges.

---

## Contradiction Example: A Linear Combination Cannot Equal One

The claim was that there do not exist integers $m,n$ such that

$$
15m+35n=1.
$$

The lecture contrasted this with the coefficients $3$ and $7$, for which integers can produce $1$; for example,

$$
3(-2)+7(1)=-6+7=1.
$$

Thus the impossibility for $15$ and $35$ requires proof rather than being automatic for every pair of coefficients.

### Negating the Claim

The original statement says no such integers exist. In a proof by contradiction, assume the opposite: there do exist integers $m,n$ such that

$$
15m+35n=1.
$$

Factor out $5$:

$$
5(3m+7n)=1.
$$

Since $m$ and $n$ are integers, $3m+7n$ is an integer. By the definition of divisibility, the equation therefore says

$$
5\mid 1.
$$

But $5$ does not divide $1$. Thus the assumption yields the contradictory pair

$$
5\mid 1
\quad\text{and}\quad
5\nmid 1.
$$

Therefore, there do not exist integers $m,n$ satisfying

$$
15m+35n=1.
$$

---

## Using Contradiction for an Implication

The lecture explained how contradiction can also prove an implication.

An implication may be written as

$$
P\implies Q
$$

or equivalently as

$$
\neg P\lor Q.
$$

To prove the implication by contradiction, assume its negation:

$$
\neg(\neg P\lor Q).
$$

Applying De Morgan's law gives

$$
\neg\neg P\land\neg Q,
$$

and removing the double negation gives

$$
P\land\neg Q.
$$

Thus, to prove $P\implies Q$ by contradiction, assume that $P$ happens while $Q$ fails, and derive a contradiction. If the situation $P\land\neg Q$ is impossible, then whenever $P$ occurs, $Q$ must follow.

The instructor noted that De Morgan's law and the equivalence between $P\implies Q$ and $\neg P\lor Q$ would also be examined through truth tables in the homework.

---

## Rational and Irrational Numbers

The lecture introduced rational numbers in preparation for proving that $\sqrt{2}$ is irrational.

The stated definition was that $x$ is rational if there exist integers $p$ and $q$ such that

$$
x=\frac pq,
$$

where $q\ne 0$ and the fraction $\frac pq$ is irreducible. “Irreducible” means that $p$ and $q$ share no common factors, so the fraction cannot be simplified further.

Examples included:

- $\frac43$ is irreducible because its numerator and denominator share no common factor.
- $\frac46$ is not irreducible because it reduces to $\frac23$.
- The integer $6$ is rational because it can be written as $\frac61$. It can also be written as $\frac{12}{2}$, although that representation can be reduced.

An irrational number was described as a number for which no such integers $p$ and $q$ can be found.

---

## Beginning the Proof That $\sqrt{2}$ Is Irrational

The claim was

$$
\sqrt{2}\text{ is irrational}.
$$

The instructor chose proof by contradiction because the negation gives a usable algebraic representation. Rather than trying to manipulate the statement “$\sqrt{2}$ is irrational” directly, assume that $\sqrt{2}$ is rational.

Then there exist integers $p$ and $q$, sharing no common factors and with $q\ne 0$, such that

$$
\sqrt{2}=\frac pq.
$$

Square both sides:

$$
2=\frac{p^2}{q^2}.
$$

Multiplying through by $q^2$ gives

$$
2q^2=p^2.
$$

These notes momentarily states $2q^2=q^2$, but the instructor immediately continues with $p^2=2q^2$; the intended algebraic step is therefore supported by the surrounding walkthrough.

Rewrite the equation as

$$
p^2=2(q^2).
$$

Since $q$ is an integer, $q^2$ is an integer. Therefore $p^2$ is even.

The lecture then invoked the earlier parity result to conclude that $p$ is even. The warm-up had established that an integer is odd if and only if its square is odd, and the instructor used the corresponding conclusion that if $p^2$ is even, then $p$ is even.

At this point, the proof had obtained:

- $\sqrt{2}=\frac pq$ with $p$ and $q$ sharing no common factors.
- $p^2=2q^2$.
- $p^2$ is even.
- $p$ is even.

The recorded lecture did not complete the remaining derivation or state the final contradiction.

---

## Proof-Writing Guidance

The lecture repeatedly emphasized several habits for constructing and communicating proofs.

### Expand Definitions Early

After writing a natural-language assumption, translate it into its formal definition. Examples included:

$$
n\text{ is odd}
\quad\Longrightarrow\quad
n=2k+1\text{ for some }k\in\mathbb Z,
$$

$$
n\text{ is even}
\quad\Longrightarrow\quad
n=2k\text{ for some }k\in\mathbb Z,
$$

and

$$
a\mid b
\quad\Longrightarrow\quad
b=ak\text{ for some }k\in\mathbb Z.
$$

Definitions give assumptions a concrete form that can be substituted, expanded, factored, or otherwise manipulated.

### Separate Assumptions from Goals

Writing “want to show” can help keep track of the destination. However, the target is not an available fact. A proof must derive it from the assumptions rather than merely restating its definition and claiming completion.

### Track Witnesses and Their Scope

Different existential claims may require different witnesses. If $a\mid b$ and $a\mid c$, the corresponding multiples of $a$ need not use the same integer. Reusing one symbol without justification may silently impose an extra equality.

A variable name can be reused after a separate proof or proof direction has ended, because the earlier witness is no longer in scope. Within one active argument, distinct witnesses should be distinguished when they may represent different integers.

### State the Proof Technique

Naming a contrapositive or contradiction proof helps the reader interpret why the argument begins with a negated statement. Proofs are both mathematical arguments and communication intended to convince the writer and the reader.

### Getting Stuck Is Part of the Process

The instructor described mathematical work as an ongoing conversation with a problem. A student can write assumptions, expand definitions, try valid algebraic steps, and learn where an approach stops being productive. Stepping away and returning later can be useful, especially after all available definitions and tools have been laid out.

---

## Quiz Logistics and Expectations

The first quiz was scheduled for the Friday discussion section, in the same room and at the same time as the student's Wednesday discussion section. Wednesdays were described as worksheet days and Fridays as quiz days.

Quiz zero focuses on one topic: direct proofs. Although the lecture introduced contrapositive and contradiction, students were instructed to use direct proofs on this quiz because that is the technique being tested:

$$
P\implies Q:
\quad
\text{assume }P\text{ and show }Q.
$$

The quiz format was described as follows:

- Students have 30 minutes for one topic.
- The quiz contains three questions.
- Correctly completing two of the three questions is sufficient to pass.
- Students were advised to complete two questions, double-check them, and attempt the third if time remains so it can serve as a fallback.
- The sample quiz for quiz zero was described as a useful calibration point.
- Future quizzes would not necessarily have separate sample quizzes.
- Regular homework questions were presented as the main guide to quiz difficulty. Homework begins with easier questions and ends with questions harder than those expected on a quiz.
- Stretch problems build intuition and skill but were not presented as the expected quiz difficulty.
- Old midterms may provide extra practice, although their questions are not divided as neatly by individual topic.

For later quizzes on proof techniques, students may use any valid proof method. Part of those later assessments may be choosing a technique that works. For quiz zero, however, the instructor specifically required direct proof.

Students were told to arrive on time, bring a phone if possible, and download the Gradescope app ahead of time. The quiz would be scanned and submitted in class, with approximately the last five minutes reserved for scanning. The teaching staff would try to provide manual scanning help if a student's phone did not work.

The instructor closed the quiz discussion by emphasizing that proof techniques are foundational and will recur throughout the course. Students were also reminded that hunger, fatigue, and stress affect mathematical thinking, so eating and resting are part of preparing effectively.

---

## Unclear or Incomplete Steps

The general contrapositive template contains a spoken slip: after correctly stating that $P\implies Q$ is equivalent to $\neg Q\implies\neg P$, the instructor says that one assumes $\neg Q$ and hopes to obtain “not $Q$.” The surrounding explanation and the parity walkthrough make clear that the intended endpoint is $\neg P$.

During the $\sqrt{2}$ walkthrough, the instructor says that multiplying by $q^2$ gives $2q^2=q^2$, then immediately reasons from $p^2=2q^2$. The first equation is inconsistent with the preceding expression and appears to be a spoken slip; the supported working equation is

$$
2q^2=p^2.
$$

The proof that $\sqrt{2}$ is irrational is incomplete in these notes. The available notes reachs the conclusion that $p$ is even but does not derive the remaining contradiction with the assumption that $\frac pq$ is irreducible.
#academic/year-3/cs70/lecture-notes