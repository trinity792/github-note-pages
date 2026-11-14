---
title: L14 Computability
Content Type: Lecture
Content Area: Computability
Course: CS70
description: "The foundations of computability through self-reference, Hilbert's program, and Gödel's incompleteness theorem. Includes the diagonalization proof that the halting problem is undecidable and a reduction showing that deciding halting on the fixed input zero is equally hard."
pinned: false
Date Published: October 13, 2026
Last Updated: October 17, 2026
Status: Finalized
---

# L14 Computability

## Executive Summary

The final discrete mathematics lecture connected the search for rigorous foundations of mathematics to the foundations and limits of computation. The recurring ideas were **self-reference**, **encoding mathematical objects or programs as data**, and **diagonalization**, building on [[cs70/Lecture Notes/L13 Countability|L13 Countability]].

Hilbert hoped for a consistent and complete foundation for mathematics, together with an algorithm that could settle mathematical questions. Gödel's incompleteness theorem limits the first ambition for effectively axiomatized systems powerful enough to express arithmetic. Church and Turing's work limits the second: some precisely stated computational problems have no algorithm that always answers correctly and terminates.

The central proof assumed a halting decider $H(A,x)$ and used it to construct a program $D$ that does the opposite of what $H$ predicts for a program running on its own description. Running $D$ on itself creates a contradiction, proving that no such universal halting decider exists.

The lecture then introduced **reductions**. By transforming an arbitrary program-input pair $(A,x)$ into a program $A'$ whose behavior on zero reproduces $A(x)$, a hypothetical Easy Halt solver would solve the general halting problem. Therefore, even deciding halting on one fixed input is undecidable.

---

## Course Announcements and Midterm Advice

This was the last lecture of the discrete mathematics portion of the course. A different instructor would take over the following Tuesday, with a more slide-based teaching style.

The midterm was scheduled for Thursday at 7:00 PM. Wednesday discussion would be midterm review, and students were encouraged to attend office hours. Graphs and graph induction assessment results were expected by the end of the lecture day so students could see which topics they had passed.

The mock midterm was available, but its synthesis questions were selected from earlier exams rather than written specifically for this semester. It was useful for understanding the format and planning topic coverage, rather than predicting the exact questions. Topic questions would come from the same assessment framework as the quizzes, and previously unpassed topics would appear again on the midterm.

### Start with definitions

The instructor emphasized getting pencil to paper before trying to identify which named technique a question requires. For example, suppose the hypothesis is

$$
2x\equiv 10\pmod{48}.
$$

By the definition of congruence, there is an integer $k$ such that

$$
2x=48k+10.
$$

Dividing by two gives

$$
x=24k+5,
$$

so

$$
x\equiv 5\pmod{24}.
$$

The point is to work with the definition, rather than immediately wondering whether the problem requires the Chinese remainder theorem or multiplicative inverses. The modulus changes when dividing this equation; the instructor corrected an initial arithmetic slip to $24$.

### Prioritize proof techniques and clear thinking

The first three lectures supply techniques used throughout the course: direct proof, contrapositive, contradiction, proof by cases, and induction. Students who felt uncertain about any of these were advised to strengthen them before the exam.

For a long problem, read the whole question once, then revisit it in passes. Later sentences may clarify earlier ones. Use scratch paper to write down definitions, known facts, and what remains to be shown. The instructor also stressed sleep, food before the evening exam, and enough rest to think clearly.

---

## From Mathematical Foundations to Computation

The lecture returned to the course's original goals: rigorous reasoning about truth, translation between natural and formal language, mathematical tools and perspectives, a survey of discrete topics, and understanding what happens under the hood of a computer.

Earlier lectures had largely worked in the middle of a spectrum of rigor: proving results that were not self-evident without rebuilding mathematics from its axioms. This lecture asked why foundational thinkers wanted to justify even statements such as $1+1=2$, and how that project led to formal models of computation.

Russell's foundational concern was not whether ordinary arithmetic worked, but what justified it. Could mathematics be grounded in explicit axioms and rules of deduction, rather than relying on informal intuition at the bottom?

Cantor's work supplied two ideas used again here. Enumeration makes it possible to organize objects into a list, while diagonalization constructs something that disagrees with each listed object at a corresponding position. For computation, finite descriptions can be enumerated systematically, which supports brute-force searches over possible descriptions.

---

## Self-Reference and the Liar Paradox

The warm-up considered the sentence:

> This sentence is false.

If it is true, what it asserts makes it false. If it is false, its assertion of falsity fails, making it true. Neither assignment gives a consistent truth value in this informal setup.

The important feature is **self-reference**: the sentence makes a claim about itself. The lecture used this as intuition for later constructions, rather than as a formal proof of incompleteness or undecidability.

In Cantor's diagonal argument, the constructed number differs from the $n$th listed number at digit $n$. In the halting proof, the constructed program differs from the $n$th program's behavior on its own description. The contradiction arises when the constructed object must itself be included in the supposedly complete collection.

---

## Hilbert's Program

The lecture described two related foundational ambitions: a dependable formal mathematical system and a general procedure for settling mathematical questions.

A formal theory $M$ consists of axioms and rules of deduction. A proof is a sequence of permitted steps from those axioms. The relevant properties are distinct:

| Property | Meaning |
|---|---|
| Consistency | There is no proposition $P$ for which both $P$ and $\neg P$ are provable in $M$. |
| Completeness | For every proposition $P$ in the theory's language, either $P$ or $\neg P$ is provable in $M$. |
| Decidability | There is an algorithm that always terminates and correctly answers the specified yes-or-no question for every allowed input. |

Hilbert wanted a consistent and complete foundation and an algorithmic way to settle mathematical questions. The lecture associated the algorithmic goal with the **Entscheidungsproblem**, or decision problem, and framed it informally as a procedure that could take a proposition and answer true or false.

The distinction between truth and provability matters: truth concerns an interpretation of a statement, while provability concerns what follows from a particular formal system. The lecture's story introduced this distinction through Gödel, then gave a concrete impossibility proof about computation.

---

## Gödel's Incompleteness: The Lecture's Sketch

Gödel's idea was presented through a statement $G$ whose intended meaning is

$$
G:\quad \text{“$G$ is not provable in $M$.”}
$$

Unlike the liar sentence, $G$ talks about **provability in a specified system**, rather than directly asserting its own falsity.

### Encoding statements about proofs as arithmetic

The difficult formal work is making this a legitimate statement inside mathematics. Through **Gödel numbering**, expressions and proofs can be encoded as natural numbers. An assertion about whether a proof exists can then be expressed arithmetically.

This lets a sufficiently expressive mathematical theory make statements about its own proofs. The lecture did not construct the encoding or prove the incompleteness theorem formally.

### Why this threatens completeness

Informally, if the system could prove $G$ while correctly representing what $G$ says about provability, it would collide with $G$'s assertion that it has no proof. If $G$ is true but unprovable, there is a gap between mathematical truth and what the system can establish.

The lecture used this tension to explain why consistency and completeness cannot both be obtained in the kind of foundational system under discussion.

> [!important] Scope of the incompleteness claim
> The theorem concerns consistent, effectively axiomatized formal systems sufficiently expressive to represent arithmetic over the natural numbers. It does not say that every mathematical theory is incomplete. The lecture's truth-versus-provability discussion is an intuition for the theorem; a rigorous proof needs precise assumptions and a formal encoding of provability.

Incompleteness is relative to a theory. Adding axioms can change what is provable, but a new system satisfying the same conditions still faces incompleteness. The result does not mean that a particular unprovable statement stays unprovable in every stronger system.

---

## Programs as Data

To ask mathematical questions about algorithms, the notion of an algorithm must itself be formalized. The lecture introduced **Turing machines** as a rigorous mathematical model of a program, without defining their mechanics. Turing's motivating picture was a person carrying out a precise procedure with pencil and paper.

The crucial operational idea is that a program has a finite description. That description can be encoded as a binary string, stored in a file, and passed as input to another program. Source-code tools already do this whenever they analyze code.

Write $\langle A\rangle$ for an encoding of program $A$. Then

$$
A(\langle A\rangle)
$$

means running $A$ with its own encoded description as input. This is a valid program-input pairing. For readability, the lecture abbreviated it to $A(A)$; the pseudocode below uses that convention too.

Finite binary strings can be listed by length, then in binary order within each length. Every finitely described program appears somewhere in such an enumeration. Some strings may not encode valid programs, which can be handled by a fixed convention; this does not prevent every valid program from appearing.

---

## The Halting Problem

The **halting problem**, called HALT in the lecture, asks whether a program eventually stops on a specified input.

| Component | Specification |
|---|---|
| Input | A program $A$ and an input string $x$. |
| Output `True` | $A(x)$ eventually halts. |
| Output `False` | $A(x)$ runs forever. |
| Requirement for a decider | It must terminate and return the correct answer for every allowed pair $(A,x)$. |

“Loops” means **does not halt**. A nonhalting computation need not remain in the same state or repeat a small cycle. It could keep incrementing a counter forever.

### Why running the program is insufficient

If a simulation of $A(x)$ halts, we learn that the answer is yes. If it has not halted after ten years, however, it might halt a minute later. No arbitrary waiting cutoff distinguishes running forever from running for an extremely long finite time.

This observation explains why the obvious simulation strategy fails. The theorem is stronger: no alternative program-analysis algorithm can correctly decide halting for every arbitrary program and input either.

---

## Proof That HALT Is Undecidable

The proof proceeds by contradiction. Assume that there is an algorithm $H$ deciding HALT, so that $H(A,x)$ always terminates and correctly reports whether $A(x)$ halts.

### Construct a program that reverses the prediction

Using the assumed $H$, define the following program. This is conceptual Python-style pseudocode, with programs implicitly encoded when passed as data.

```python
def D(A):
    if H(A, A):
        while True:
            continue
    else:
        return "Hi"
```

The call is $H(A,A)$, with two arguments: a program description and its input. It is not $H(A(A))$, which would require evaluating $A(A)$ before asking the halting question.

By construction, $D$ reverses the self-input behavior predicted by $H$:

| Prediction from $H(A,A)$ | Behavior of $D(A)$ |
|---|---|
| $A(A)$ halts. | $D(A)$ loops forever. |
| $A(A)$ loops forever. | $D(A)$ halts. |

The returned string is irrelevant; only termination matters. Since $H$ is assumed to be an algorithm, this definition would make $D$ an algorithm too.

### Run the constructed program on itself

Now consider $D(D)$. There are two possible answers from $H(D,D)$:

1. If $H(D,D)$ returns `True`, it predicts that $D(D)$ halts. But the definition of $D$ then enters the infinite loop, contradicting that prediction.
2. If $H(D,D)$ returns `False`, it predicts that $D(D)$ runs forever. But the definition of $D$ then returns, again contradicting the prediction.

Both answers are impossible for a correct halting decider. Therefore, the assumed algorithm $H$ cannot exist:

$$
\boxed{\text{HALT is undecidable.}}
$$

> [!warning] The contradiction invalidates the assumed decider
> This does not exhibit an executable program that both halts and fails to halt. The program $D$ relies on a hypothetical total, correct $H$. Showing that such an $H$ would produce a contradiction proves that $H$ cannot exist.

---

## The Diagonalization View

The lecture also visualized the proof as an infinite table. Enumerate program descriptions as $B_0,B_1,B_2,\ldots$, and use the same binary strings as possible inputs.

The entry in row $i$, column $j$ records whether $B_i(B_j)$ halts or loops. The diagonal consists of

$$
B_0(B_0),\ B_1(B_1),\ B_2(B_2),\ldots.
$$

Using the hypothetical decider, $D(B_i)$ does the opposite of the diagonal entry $B_i(B_i)$ for every $i$. But $D$ would itself be a program, so its description must appear as some $B_k$.

At position $k$, this requires $D(D)$ to have the opposite halting behavior from itself. That is the same contradiction as the two-case proof.

This is the connection to Cantor: a diagonal construction disagrees with each listed row at a designated position. Listing all program descriptions is possible; computing every entry of this halting table is not.

---

## Reductions: Using One Solver to Build Another

After proving HALT undecidable, the lecture asked how to establish undecidability for other problems. A **reduction** transforms a solver for one problem into a solver for another.

The notation

$$
P\le Q
$$

means that a solver for $Q$ could be used as a subroutine to solve $P$. The direction is summarized by

$$
Q\text{ decidable}\implies P\text{ decidable}.
$$

Taking the contrapositive gives

$$
P\text{ undecidable}\implies Q\text{ undecidable}.
$$

Thus, to prove that a target problem $Q$ is undecidable, reduce a known undecidable problem $P$ **to $Q$**. The target is at least as hard in this sense; the reduction alone does not show it is strictly harder.

---

## Easy Halt Is Also Undecidable

**Easy Halt** appears simpler because its input is only a program $A$. The question is always whether that program halts on the fixed input zero:

$$
\operatorname{EasyHalt}(A)=
\begin{cases}
\text{True}, & A(0)\text{ halts},\\
\text{False}, & A(0)\text{ runs forever}.
\end{cases}
$$

We will show

$$
\text{HALT}\le\text{Easy Halt}.
$$

### Adapt the input to the solver's interface

Assume there is an algorithm $EH$ deciding Easy Halt. To solve HALT, we receive an arbitrary pair $(A,x)$, but $EH(A)$ would only answer a question about $A(0)$.

The solution is to construct a new program $A'$ that packages both $A$ and $x$. On input zero, $A'$ runs $A(x)$.

```python
def H(A, x):
    def A_prime(y):
        if y == 0:
            return A(x)
        else:
            return "Hi"

    return EH(A_prime)
```

Here, $A$ and $x$ are fixed inside the description of `A_prime`. The construction creates that program description without first running $A(x)$. It then passes the description to $EH$.

### Prove that the answer is preserved

On input zero, `A_prime` takes the branch that runs $A(x)$. Therefore,

$$
A'(0)\text{ halts}\iff A(x)\text{ halts}.
$$

Both possibilities match:

| Original computation | Constructed computation | Answer from $EH(A')$ |
|---|---|---|
| $A(x)$ halts. | $A'(0)$ halts. | `True`, correctly answering HALT for $(A,x)$. |
| $A(x)$ runs forever. | $A'(0)$ runs forever. | `False`, correctly answering HALT for $(A,x)$. |

Because $EH$ is assumed to terminate, the outer algorithm $H$ would terminate and solve HALT for every input pair. This contradicts HALT's undecidability, so

$$
\boxed{\text{Easy Halt is undecidable.}}
$$

### Variants and relative difficulty

The instructor noted that the branch for nonzero inputs is irrelevant. A simpler wrapper can ignore its input and always run $A(x)$:

```python
def A_prime(y):
    return A(x)
```

It still has the required behavior on zero. What matters is the equivalence between the original halting question and the constructed one.

The reverse reduction is immediate: a HALT solver could answer Easy Halt by checking $(A,0)$. Hence the two problems reduce to each other and are equally hard in the sense discussed in the lecture. Restricting the tested input to zero does not remove the difficulty because the arbitrary original input can be encoded into the new program.

---

## Main Takeaways

The historical story connected mathematical foundations to the ability to express and execute formal procedures. The lecture closed by stressing that this power also has consequences for people, including decisions about lending, hiring, surveillance, and weapons, and urged students to take ethics seriously.

The main technical ideas to retain are:

- **Programs can be data.** A finite description can be passed to another program, including the program it describes.
- **Decidability requires a total, correct solver.** It must answer every allowed instance and always terminate.
- **HALT is undecidable by diagonalization.** A hypothetical decider lets us construct $D$ to reverse its prediction, and $D(D)$ produces the contradiction.
- **Reduction direction matters.** $P\le Q$ means a solver for $Q$ yields a solver for $P$; known undecidability flows from $P$ to $Q$.
- **Prove the wrapper's equivalence.** In the Easy Halt reduction, the essential statement is $A'(0)$ halts if and only if $A(x)$ halts.
