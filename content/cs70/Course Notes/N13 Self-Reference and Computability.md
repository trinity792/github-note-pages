---
title: CS 70 Note 13 — Self-Reference and Computability
Content Type: Course Notes
Content Area: Discrete Mathematics
description: "Connects self-reference, quines, and the recursion theorem to the limits of computation. Proves the uncomputability of the Halting Problem, reduces it to the Easy Halting Problem, and sketches Gödel's Incompleteness Theorem through self-reference and proof enumeration."
Course: CS 70
pinned: false
Date Published: October 16, 2026
Last Updated: October 16, 2026
Status: Finalized
---

# CS 70 Note 13 — Self-Reference and Computability

**Self-reference** connects proofs with computation. This note moves from the liar's paradox to self-replicating programs, then uses self-reference and diagonalization to prove the **Halting Problem** uncomputable. It concludes with two sketches explaining **Gödel's Incompleteness Theorem** and the relationship between formal proofs and programs.

## 1. The Liar's Paradox

A **proposition** is a statement that is either true or false. Some statements are too imprecise or ill-defined to be propositions. Others are problematic for subtler reasons.

Consider a Cretan saying:

> “All Cretans are liars.”

If this statement is true, its speaker is lying, so the statement is false. Despite its historical association with the **liar's paradox**, this version is not really a paradox: assuming it true gives a contradiction, but assuming it false causes no problem.

A genuine formulation is:

> “This statement is false.”

If it is true, what it asserts is true, so it is false. If it is false, then it must be true. The paradox arises from the statement's **self-referential** character. Around a century before the source's account, such paradoxes became central to foundational questions about mathematics and computation.

### Russell's Barber Paradox

Bertrand Russell gave another manifestation. In a village with one barber, every man remains clean-shaven: some shave themselves, and others visit the barber. The barber announces:

> “I shave all and only those men who do not shave themselves.”

Does the barber shave himself?

If he does not, his rule says that he does. If he does, his rule says that he does not. Assuming the proclamation is true produces a logically impossible situation.

---

## 2. Self-Replicating Programs

Can self-reference produce a program whose output is itself? Begin with instructions written in English.

### First Attempt

Consider this program:

```text
Print out the following sentence:
“Print out the following sentence:”
```

Its output is:

```text
Print out the following sentence:
```

The output is not the original two-line program.

### Second Attempt

Modify the program:

```text
Print out the following sentence twice:
“Print out the following sentence twice:”
```

The result is:

```text
Print out the following sentence twice:
Print out the following sentence twice:
```

This almost works, but the second line lacks quotation marks.

### A Self-Replicating Instruction

Now use:

```text
Print out the following sentence twice, the second time in quotes:
“Print out the following sentence twice, the second time in quotes:”
```

Its output is exactly the same:

```text
Print out the following sentence twice, the second time in quotes:
“Print out the following sentence twice, the second time in quotes:”
```

### Quines and the Recursion Theorem

A program that prints itself is a **quine**. The source states that quines can be written in any programming language.

The name honors philosopher and logician Willard Van Orman Quine and was popularized in Douglas Hofstadter's *Gödel, Escher, Bach: An Eternal Golden Braid*.

Consider the source's pseudocode:

```text
(Quine “s”)
    (s “s”)
```

The program `Quine` takes a string `s` and outputs `(s “s”)`, meaning that the string `s`, interpreted as a program, is run on itself. Executing

```text
(Quine “Quine”)
```

outputs

```text
(Quine “Quine”)
```

which is the instruction that was executed.

The **recursion theorem** gives a general construction: given a program $P(x,y)$, we can convert it into a program $Q(x)$ such that

$$
Q(x)=P(x,Q).
$$

Thus $Q$ behaves exactly as $P$ would when its second input is the description of $Q$. In this sense, $Q$ is a self-aware version of $P$, with access to its own description.

---

## 3. The Halting Problem

Are there tasks a computer cannot perform? A natural compiler check would ask whether a program enters an infinite loop. In 1936, Alan Turing showed that no program can perform this test in general.

Two ingredients drive the proof: self-reference and the fact that **programs cannot be separated from data**. A program is represented by a string of bits, just like an integer or character. What differs is the interpretation of the bits.

### The Desired Halting Tester

Given a program description $P$ and an input $x$, we want a program with behavior

$$
\operatorname{TestHalt}(P,x)=
\begin{cases}
\text{“yes”},&\text{if }P\text{ halts on input }x,\\
\text{“no”},&\text{if }P\text{ loops on input }x.
\end{cases}
$$

Since a program description is data, $\operatorname{TestHalt}(P,P)$ is a valid input. It would report whether $P$ halts when given its own description.

### Theorem 13.1 — The Halting Problem Is Uncomputable

There does not exist a computer program `TestHalt` with the specified behavior on **all** inputs $(P,x)$.

#### Proof

Suppose, for contradiction, that `TestHalt` exists. Use it as a subroutine to construct:

```text
Turing(P)
    if TestHalt(P, P) = "yes" then loop forever
    else halt
```

If $P(P)$ halts, `Turing(P)` loops forever. If $P(P)$ loops forever, `Turing(P)` halts.

Now consider `Turing(Turing)`. There are two cases.

1. **It halts.** Then `TestHalt(Turing, Turing)` must have returned “no.” But the tester's specification says that `Turing(Turing)` does not halt, a contradiction.
2. **It does not halt.** Then `TestHalt(Turing, Turing)` must have returned “yes.” By the tester's specification, `Turing(Turing)` should halt, again a contradiction.

Both possibilities contradict the assumption that `TestHalt` exists. Therefore, no program can correctly determine halting for every general program and input.

### The Same Proof as Diagonalization

This is the same proof technique used to establish that the reals are uncountable.

Computer programs are finite strings over an alphabet, so the set of programs is countable. Enumerate them as $P_0,P_1,P_2,\ldots$. The source illustrates their behavior with this table, bolding its diagonal entries:

| Program / Input | $P_0$ | $P_1$ | $P_2$ | $P_3$ | $P_4$ | $\cdots$ |
|---|---|---|---|---|---|---|
| $P_0$ | **H** | L | H | L | H | $\cdots$ |
| $P_1$ | L | **L** | H | L | L | $\cdots$ |
| $P_2$ | H | H | **H** | H | L | $\cdots$ |
| $P_3$ | H | H | H | **H** | H | $\cdots$ |
| $\vdots$ | $\vdots$ | $\vdots$ | $\vdots$ | $\vdots$ | $\vdots$ | $\ddots$ |

Entry $(i,j)$ is **H** if $P_i$ halts on input $P_j$ and **L** if it loops.

If `Turing` exists, it must be some program $P_n$ on the list. But if diagonal entry $(n,n)$ is H, `Turing` loops on $P_n$; if it is L, `Turing` halts on $P_n$.

Thus `Turing` differs from $P_n$ on input $P_n$, and cannot be $P_n$. Since this holds for any position in a list containing every program, `Turing` cannot exist. It was constructed by a simple modification of `TestHalt`, so `TestHalt` cannot exist either.

### Other Uncomputable Questions About Programs

The source also identifies general tests that cannot be performed for arbitrary programs: whether a program ever outputs anything, whether it executes a particular line, whether two programs produce the same output, and whether a program is a virus. These issues are explored further in CS 172, Computability and Complexity.

### The Easy Halting Problem

The preceding proof uses a program's own description as input. Could prohibiting this kind of self-reference make the problem solvable?

Instead of asking whether $P$ halts on arbitrary input, ask only whether it halts on input $0$. This **Easy Halting Problem** looks simpler, but is still uncomputable.

Suppose there were a program

$$
\operatorname{TestEasyHalt}(P)=
\begin{cases}
\text{“yes”},&\text{if }P\text{ halts on input }0,\\
\text{“no”},&\text{if }P\text{ loops on input }0.
\end{cases}
$$

We could use it to solve the original Halting Problem:

```text
Halt(P, x)
    construct a program P' that, on input 0, returns P(x)
    return TestEasyHalt(P')
```

The new program depends on the original $P$ and $x$. It can be constructed as:

```text
P'(y)
    return P(x)
```

Here $P'$ ignores $y$ and always runs $P(x)$. The descriptions of $P$ and $x$ are hard-wired into $P'$. Consequently,

$$
P'(0)\text{ halts}\iff P(x)\text{ halts}.
$$

If `TestEasyHalt` existed, `Halt` would correctly solve the Halting Problem. Since no such `Halt` exists, `TestEasyHalt` cannot exist.

### Reduction

This technique is a **reduction**. We reduce “Does $P$ halt on $x$?” to “Does $P'$ halt on $0$?” by showing how a solution to the second question would answer the first.

Thus the second problem is at least as difficult as the first despite its apparently simpler description.

---

## 4. Gödel's Incompleteness Theorem

In 1900, David Hilbert posed two questions about the foundations of mathematical logic:

1. Is arithmetic consistent?
2. Is arithmetic complete?

Mathematics is a **formal system**: a list of axioms, such as Peano's axioms for natural numbers or the axiom of choice, together with rules of inference. Axioms supply initial true statements; inference rules derive further statements, which can then be used in additional proofs.

### Consistency and Completeness

A system is **inconsistent** if it can prove both a proposition $P$ and its negation $\neg P$; otherwise, it is **consistent**. The source explains that an inconsistency collapses the system because anything can then be deduced.

A system is **complete** if every true statement in arithmetic can be proved.

Determining a statement's truth can be very difficult. For example, **Fermat's Last Theorem** says

$$
(\forall n\ge3)\neg(\exists x,y,z\in\mathbb{Z}^+)\bigl(x^n+y^n=z^n\bigr).
$$

Fermat stated this in 1637, with the famous marginal claim that he had a marvelous proof too long for the margin. Andrew Wiles finally proved it in 1994. The source gives the Riemann Hypothesis as another famous statement that remains open.

The source recounts that Hilbert formally posed these questions in 1928 as the **Entscheidungsproblem**, and that the expected answer was “yes.” It then presents Gödel's 1930 result in the following form: a formal system sufficiently rich to express arithmetic is either inconsistent or incomplete.

Gödel's proof connects proofs with arithmetic. A connection to computation became clearer after Turing formalized computation through Turing machines and computability in 1936.

### Sketch of Gödel's Proof

Let $F$ be a formal system with axioms and inference rules, expressive enough to state all of arithmetic. Suppose we can construct

$$
S(F)=\text{“This statement is not provable in }F\text{.”}
$$

The source considers two cases:

1. **$S(F)$ is provable.** Then the statement is true, but its content says that it is not provable. This makes $F$ inconsistent.
2. **$S(F)$ is not provable.** Then its content is true, yielding a true statement that cannot be proved. This makes $F$ incomplete.

The difficult remaining step is to construct $S(F)$ inside arithmetic. Gödel accomplishes this through a **Gödel numbering**, encoding symbols and propositions as natural numbers. The source sketches this idea without supplying the construction.

### Proof via the Halting Problem

Suppose, for contradiction, that arithmetic is both consistent and complete. We will use that assumption to solve the Halting Problem.

For fixed $P$ and $x$, let $S_{P,x}$ mean “$P$ halts on input $x$.” The key observation is that this can be expressed as arithmetic in the form

$$
\exists z\,\bigl(z\text{ encodes a valid halting execution sequence of }P\text{ on input }x\bigr).
$$

The encoding details require work, but the check can be expressed mechanically using standard arithmetic operators, connectives, and quantifiers. The integer $z$, represented in binary, records the sequence of states a computer follows while executing $P$ on $x$. The statement verifies this sequence step by step.

Under the assumption of consistency and completeness, either $S_{P,x}$ or $\neg S_{P,x}$ has a proof, and not both.

A proof is a finite binary string. There are countably many possible proofs, so enumerate them and search for one proving either statement:

```text
Search(P, x)
    for every proof q:
        if q is a proof of S_{P,x} then output "yes"
        if q is a proof of not S_{P,x} then output "no"
```

By assumption, one and only one of the two kinds of proof exists. The search therefore terminates in finite time and correctly decides whether $P$ halts on $x$.

But the Halting Problem is uncomputable. Such a program cannot exist, so arithmetic cannot be both consistent and complete.

The argument relies on being able to write a program that mechanically checks whether a proposed proof is a valid proof of a given proposition. This is another manifestation of the close connection between proofs and computation.
