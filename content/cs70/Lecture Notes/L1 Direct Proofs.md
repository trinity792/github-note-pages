---
title: L1 Direct Proofs
Content Type: Lecture
Content Area:
Course: CS70
description: "The lecture introduced CS70 through axiomatic truth, formal language, discrete mathematics, and a specifications-based grading system. It developed direct proofs about even and odd integers, previewed proof by contradiction and propositional logic, and used false algebraic arguments to show why convincing-looking work still requires careful justification."
pinned: false
Date Published: August 27, 2026
Last Updated: August 27, 2026
Status: Finalized
---

# L1 Direct Proofs

## Executive Summary

The lecture began by asking how mathematical statements can be known to be true. It distinguished axiomatic truth from empirical and normative or dialectical truth, placed CS70 between foundational mathematics and heuristic reasoning, and explained why discrete mathematics matters for computer science.

The course introduction covered lectures, notes, homework, discussions, weekly quizzes, exam retakes, synthesis questions, mastery points, and engagement points. The mathematical portion defined integers, even integers, odd integers, and set-membership notation. It then developed direct proofs that the sum of two even integers is even and that the sum of two odd integers is even.

A less direct claim - if a product of two integers is even, then at least one factor is even - motivated a preview of proof by contradiction and proof by cases. Finally, two misleading algebraic arguments illustrated how an invalid operation or a one-way implication can produce a false conclusion even when most individual steps appear plausible.

---

## What Kind of Truth Does CS70 Study?

The instructor opened with three kinds of claims:

- There are infinitely many prime numbers.
- Every even number greater than two can be written as the sum of two primes.
- A piece of code never enters an infinite loop and correctly computes a function $f$ on every input.

These examples distinguish testing a claim from proving it. If there are infinitely many primes, one cannot verify the claim simply by counting every prime. Likewise, checking many even numbers does not establish a statement about every even number.

The lecture described a prime informally as one of the basic numerical elements. For example, $4$ is not prime because $2$ divides $4$, while $6$ is not prime because both $2$ and $3$ divide $6$. The notation “$2$ divides $4$” was introduced informally, with a formal definition deferred.

The statement that every even number greater than two is a sum of two primes was described as the “gold box conjecture” in the available notes. Examples such as

$$
12=5+7
$$

and

$$
8=3+5
$$

support the statement but do not prove it. The instructor said that the claim was posed in 1742 and had been checked for all even numbers up to $4\cdot 10^{18}$, but remained unproved. No finite amount of checking rules out the possibility that the first counterexample lies beyond the checked range.

The same distinction applies to programs. Testing can expose bugs, but successful tests alone do not guarantee that a program has no remaining bugs, terminates on every input, or computes the correct function on every input.

### Three types of truth

The lecture separated three broad forms of truth:

- Dialectical or normative truths allow judgment, synthesis, or opposing perspectives. Questions about fairness, goodness, ethics, poetry, or spirituality fall into this category. The mathematical notion of truth used in the course does not settle such questions on its own.
- Empirical truths are based on evidence and observation. The instructor’s example was repeatedly dropping an apple and observing that it falls. A new observation could require revising the scientific account.
- Axiomatic truths begin with axioms and determine what follows from them. This is the form of truth studied in the course.

CS70 focuses on statements that are not self-evident but can still be proved from accepted definitions and assumptions.

### A spectrum of rigor

The instructor described a spectrum. At one end lies foundational work such as proving something as basic-looking as

$$
1+1=2.
$$

This belongs to the foundations of mathematics or mathematical logic. Nearby are claims such as:

> If $n$ is an integer, then $n^2$ is also an integer.

The lecture associated the study of such foundational closure properties with subjects such as abstract algebra or real analysis, rather than with the main scope of CS70.

At the more heuristic end lies the judgment that “this code looks good to me.” Unit tests and continuous-integration pipelines increase confidence in code, but the instructor distinguished them from proofs.

CS70 was placed in the middle: it studies claims that are neither foundationally obvious nor merely supported by heuristics.

---

## Formal Language, Discrete Mathematics, and Mathematical Lenses

A central goal of the course is translating natural language into formal language. A natural-language statement communicates an idea, while its formal version allows mathematical tools to operate on that idea.

The instructor contrasted discrete and continuous objects. A continuous number line extends through all real positions between negative and positive infinity. A discrete sequence instead consists of separated values such as

$$
0,1,2,3,\ldots
$$

that can be considered one at a time. This distinction was related to the difference between analog and digital systems. The lecture described discrete mathematics as the language used by digital computers.

### Mathematics as a source of structure and algorithms

Mathematics supplies structure, and that structure can be used to construct algorithms. The instructor listed cryptography, error-correcting codes, and graph algorithms as applications that would appear in the course.

Mathematics also supplies multiple lenses for viewing the same object. The example

$$
x^2+y^2=1
$$

was presented both as an algebraic equation and as a circle. Moving between equations and shapes lets algebraic and geometric perspectives reveal different aspects of the same underlying object. The instructor described this connection as analytic geometry.

CS70 was also characterized as a survey that develops a library of tools, concepts, and applications.

---

## Course Structure and Learning Process

Lecture requires no advance preparation. The instructor specifically said that the lectures assume students arrive “cold.” The course notes are intended mainly as reference material, similar to documentation used while programming. Students can consult definitions and surrounding explanations when working on problems.

Homework was described as the most important learning component because proof-based mathematics requires repeated pencil-and-paper work. The instructor emphasized that unfamiliar mathematics can feel unusually abstract because students have not yet accumulated context for it. Working through problems builds that context and develops familiarity with mathematical arguments.

Homework is checked for completion rather than graded for correctness. Students may designate a question for feedback focused on proof writing, including whether the argument is complete and clearly expressed.

Discussion sections are not directly graded, but they contribute to engagement opportunities that can affect the grade within a tier. Working with other people was encouraged because explaining an abstract argument helps a student learn how mathematical communication works.

### Weekly course rhythm

The course covers two topics per week, one associated with Tuesday and one with Thursday. A homework assignment is released on Thursday to develop the relevant skills. The following Wednesday’s discussion covers the previous week’s two topics, and the quiz on Friday assesses them.

The instructor described homework as beginning with questions easier than the quiz questions and ending with questions harder than the quiz questions. The goal is to practice beyond the level required on the quiz.

---

## Specifications Grading

The course uses specifications grading. Rather than accumulating a conventional percentage, students pass or do not pass clearly stated topic assessments.

There are:

- 14 discrete-mathematics topics.
- 14 probability topics.
- 28 topics in total.
- Weekly Friday quizzes covering the preceding week’s topics.

The exact condition for passing a quiz may vary by topic. An example format was three questions with a requirement to pass two of them.

Each topic has two opportunities:

1. The topic’s weekly quiz.
2. The corresponding exam retake.

The midterm retakes the discrete-mathematics quizzes and includes two synthesis questions. The final retakes the probability quizzes and includes three synthesis questions. A synthesis question can involve any topic and may combine multiple topics. It counts only as a synthesis question, not as a replacement for an unpassed topic.

### Grade tiers

The lecture gave the following requirements:

- A C-minus requires passing 17 of the 28 topics and 1 of the 5 synthesis questions, with at least 7 passed topics from each half of the course.
- The B-minus tier requires at least 9 passed topics from discrete mathematics and at least 9 from probability, in addition to the tier’s overall topic requirement. The example discussed 21 passed topics in total.
- The A-minus tier similarly increases the requirements, though its exact numerical thresholds were not recoverable from these notes.

The balance requirement prevents a student from passing a tier entirely through one half of the course. For example, if a tier requires 21 passed topics and at least 9 from each half, the remaining 3 may come from either half.

### Mastery and engagement points

A mastery point is earned by passing an additional topic or synthesis question beyond the minimum required for the student’s tier.

- Two mastery points move a minus grade to the corresponding solid letter grade.
- Four mastery points move a minus grade to the corresponding plus grade.

Synthesis questions can earn mastery points even when they combine topics the student has already passed.

Engagement points provide a separate safety net. Homework completion and discussion participation can move a minus grade to the corresponding solid letter grade, but cannot produce a plus grade. The lecture referred to earning 13 out of 26 engagement points. Students may combine the available engagement activities in different ways to reach that total.

The instructor said that the system was new and might change, but any change would only favor students. The stated purposes of specifications grading were:

- To make students’ achieved skills legible to the instructors.
- To let students know their current grade and possible progression during the semester.
- To measure preparation for later courses rather than ranking students against one another.

---

## Integers, Sets, and Evenness

The lecture introduced the integers using the boldface symbol $\mathbb{Z}$:

$$
\mathbb{Z}=\{\ldots,-2,-1,0,1,2,\ldots\}.
$$

The curly braces indicate a set. Membership notation is written

$$
x\in\mathbb{Z},
$$

which means that $x$ is an integer or, equivalently, that $x$ belongs to the set $\mathbb{Z}$.

The construction of the integers from foundational axioms was declared outside the scope of the course.

### Definition of an even integer

An integer $m$ is even when there exists an integer $k$ such that

$$
m=2k.
$$

In natural language, an even integer is a multiple of two. The definition is useful because it converts the informal property “is even” into an equation that can be manipulated.

The phrase “there exists” was initially written in natural language. The instructor previewed the symbol $\exists$, so the definition can also be represented as

$$
\exists k\in\mathbb{Z}\text{ such that }m=2k.
$$

The abbreviation “s.t.” was used for “such that.”

---

## Direct Proof: The Sum of Two Even Integers Is Even

The claim is:

> The sum of two even integers is even.

Checking examples such as

$$
2+4=6
$$

and

$$
6+8=14
$$

makes the claim plausible, but the goal is to prove it for arbitrary even integers.

### Setting up the proof

Let $m$ and $n$ be even integers. The desired conclusion is that

$$
m+n
$$

is even.

The proof begins by writing down both the assumptions and the target:

- Assume $m,n\in\mathbb{Z}$ are even.
- We want to show that $m+n$ is even.

Because $m$ and $n$ are even, the definition supplies integers $k,j\in\mathbb{Z}$ such that

$$
m=2k
\qquad\text{and}\qquad
n=2j.
$$

This is the translation from natural language into formal language that makes the algebra possible.

### Algebraic derivation

Substitute the formal descriptions of $m$ and $n$:

$$
\begin{aligned}
m+n
&=2k+2j\\
&=2(k+j).
\end{aligned}
$$

Since $k$ and $j$ are integers, the lecture treated $k+j$ as an integer. It noted that proving closure of the integers under addition belongs beyond the present topic.

To make the final use of the definition explicit, define

$$
k'=k+j.
$$

Then $k'\in\mathbb{Z}$ and

$$
m+n=2k'.
$$

Thus $m+n$ is two times an integer, so it is even by definition. This completes the proof.

The instructor emphasized a general opening pattern:

1. State the arbitrary objects and assumptions.
2. State what must be shown.
3. Expand the assumptions using definitions.
4. Manipulate the resulting formal expressions until the target definition is reached.

A proof may end with a square, a filled square, “QED,” or another convention that clearly signals completion.

---

## Odd Integers and Equivalent Definitions

The next claim required defining oddness. Several forms were proposed:

$$
n=2k-1,
$$

$$
n=2k+1,
$$

and even shifts such as

$$
n=2k+3,
$$

where $k$ is an integer.

In natural language, the instructor described an odd integer as a number one before or one after an even integer. The lecture stressed that these are not competing notions of oddness. They are equivalent descriptions obtained by shifting the integer parameter.

### Rewriting one odd form as another

Starting with an integer in the form

$$
2k-1,
$$

the instructor added zero in the form $-2+2$:

$$
2k-1=2k-2+2-1.
$$

Regrouping gives

$$
2k-1=2(k-1)+1.
$$

Because $k-1$ is an integer, an expression of the form $2k-1$ has also been written as two times an integer plus one. This demonstrates how the two definitions describe the same collection of odd integers.

The larger lesson was that different valid mathematical descriptions must remain compatible. If two approaches correctly describe the same object, their agreement comes from equivalent definitions rather than from interpretive flexibility.

---

## Direct Proof: The Sum of Two Odd Integers Is Even

The conjecture considered in class was:

> The sum of two odd integers is even.

### Setting up the proof

Let $m$ and $n$ be odd integers. We want to show that

$$
m+n
$$

is even.

By the definition of oddness, there exist integers $k,j\in\mathbb{Z}$ such that

$$
m=2k+1
\qquad\text{and}\qquad
n=2j+1.
$$

### Algebraic derivation

Substitute these expressions:

$$
\begin{aligned}
m+n
&=(2k+1)+(2j+1)\\
&=2k+2j+2\\
&=2(k+j+1).
\end{aligned}
$$

The expression $k+j+1$ is an integer. To make the final step fully explicit, define

$$
k'=k+j+1.
$$

Then $k'\in\mathbb{Z}$ and

$$
m+n=2k'.
$$

Therefore, $m+n$ is even by definition.

The instructor described this as following the pencil: begin with the available definitions, perform justified algebra, and continue until the result matches the formal definition of the desired property.

### Proof correctness and proof style

A proof can be mathematically correct while differing in presentation. Common openings include “assume,” “let,” “given,” and “say.” A proof can also end formally after reaching the target expression or add a sentence such as:

> Therefore, $m+n$ is even.

The lecture compared proof style to idiomatic programming. In addition to correctness, a proof can be more or less readable, conventional, and tasteful. Familiarity with those conventions develops through writing proofs and reading solutions and notes.

---

## A Product Claim That Resists a Direct Proof

The next statement was:

> For integers $m$ and $n$, if $mn$ is even, then $m$ is even or $n$ is even.

The claim feels plausible because the factor of two in the product must in some sense come from one of the two factors. However, simply expanding the assumption does not immediately produce the desired conclusion.

### The unsuccessful direct attempt

Assume

$$
m,n\in\mathbb{Z}
$$

and $mn$ is even. By definition, there exists $k\in\mathbb{Z}$ such that

$$
mn=2k.
$$

One might divide both sides by $n$:

$$
m=\frac{2k}{n}=2\left(\frac{k}{n}\right).
$$

This would establish that $m$ is even only if $\frac{k}{n}$ were guaranteed to be an integer. The assumptions provide no such guarantee. Dividing instead by $m$ creates the same problem for $n$.

Thus, the direct pattern used for sums of even and odd integers does not immediately solve the product claim.

### Preview of contradiction or cases

The instructor previewed an alternate approach by assuming that neither factor is even, so both are odd. Write

$$
m=2j+1
\qquad\text{and}\qquad
n=2\ell+1
$$

for integers $j,\ell\in\mathbb{Z}$.

Then

$$
\begin{aligned}
mn
&=(2j+1)(2\ell+1)\\
&=4j\ell+2j+2\ell+1\\
&=2(2j\ell+j+\ell)+1.
\end{aligned}
$$

This expression has the form two times an integer plus one, so it is odd. That conflicts with the original assumption that $mn$ is even.

The instructor characterized the argument as a preview of proof by contradiction and also mentioned proof by exhaustion or proof by cases. These methods were not yet formalized. The point was that some statements require a structured proof technique rather than straightforward substitution alone.

This difficulty motivated the coming study of propositional logic and Boolean algebra. The instructor described Boolean values as true or false, or $0$ and $1$, with operations resembling AND, OR, and XOR. Formal logic would make the structure of such arguments more algebraic and easier to verify.

---

## Why Convincing Algebra Is Not Necessarily a Proof

The lecture ended with two arguments that reach false conclusions. Their purpose was to show that an argument can look persuasive while containing a hidden flaw.

### False derivation of $2=1$ by division by zero

Begin by assuming

$$
a=b.
$$

Multiply by $a$:

$$
a^2=ab.
$$

Subtract $b^2$ from both sides:

$$
a^2-b^2=ab-b^2.
$$

Factor both sides:

$$
(a-b)(a+b)=b(a-b).
$$

The deceptive next step cancels $a-b$ to obtain

$$
a+b=b.
$$

Since $a=b$, substitution would give

$$
2b=b
$$

and then

$$
2=1.
$$

The invalid step is the cancellation of $a-b$. Because $a=b$,

$$
a-b=0.
$$

Cancelling $a-b$ therefore divides both sides by zero. The implication from

$$
(a-b)(a+b)=b(a-b)
$$

to

$$
a+b=b
$$

is not valid under the stated assumption.

### A chain that only works in one direction

The second example began with

$$
\frac{1}{x}+x=1.
$$

Multiplying by $x$ gives

$$
1+x^2=x.
$$

Subtracting $x^2$ gives

$$
x-x^2=1.
$$

Because the original left-hand side and $x-x^2$ were each set equal to $1$, the lecture wrote

$$
\frac{1}{x}+x=x-x^2.
$$

Subtracting $x$ from both sides yields

$$
\frac{1}{x}=-x^2.
$$

Multiplying by $x$ gives

$$
1=-x^3,
$$

so

$$
-1=x^3
$$

and hence

$$
x=-1.
$$

Substituting $x=-1$ into the original equation gives

$$
\frac{1}{-1}+(-1)=1,
$$

or

$$
-2=1.
$$

The instructor explained that the displayed transformations can carry the original assumption downward to the conclusion $x=-1$, but not every step works backward. Earlier algebraic rewrites were described as working in both directions, while at least one later implication was only one-way.

This distinction previews the importance of implication versus “if and only if.” A statement may imply another statement without the second implying the first. Deriving a candidate value therefore does not automatically establish that the candidate satisfies the original equation.

---

## Unclear or Incomplete Steps

The lecture ended before identifying exactly which step in the second false derivation fails in the backward direction. The instructor explicitly stated that not every implication can be reversed and asked the class to determine which step does not go backward, but the available notes did not contain the completed explanation. The precise defective reverse implication is therefore `[unclear]` from these notes.
#academic/year-3/cs70/lecture-notes