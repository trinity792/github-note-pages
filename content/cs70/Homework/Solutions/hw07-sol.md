---
title: CS 70 HW 07 Solutions — Countability and Computability
Content Type: Review
Content Area: Discrete Mathematics
description: "Official HW 07 solutions, each placed directly under its question: injections and surjections, Cantor-Bernstein, the Halting Problem by reduction and by diagonalization, classifying sets as finite, countable, or uncountable, and two unprogrammable programs."
Course: CS 70
pinned: false
Date Published: November 12, 2026
Last Updated: November 12, 2026
Status: Finalized
---

# CS 70 HW 07 Solutions — Countability and Computability
Each part's official solution follows directly after its question.

---

## 1. Countability Basics
**Related course note:** [[cs70/Course Notes/N12 Countability and Infinity|Note 12 — Countability and Infinity]].
### (a) Injection
Prove that $f:\mathbb{N}\to\mathbb{N}$, defined by $f(n)=n^2$, is an injection (one-to-one). Recall that $f$ is injective if and only if for all $m,n\in\mathbb{N}$, $m\ne n$ implies $f(m)\ne f(n)$.
#### Solution
We show that $m\ne n\implies f(m)\ne f(n)$ for all $m,n\in\mathbb{N}$. Since the domain is $\mathbb{N}$, both $m$ and $n$ are nonnegative.
**Alternative 1:** Suppose $m\ne n$. Without loss of generality, let $m>n$. Since $m>n\ge0$, we have

$$
f(m)=m^2>n^2=f(n).
$$

Hence $f(m)\ne f(n)$.
**Alternative 2:** Use contraposition to show that $f(m)=f(n)\implies m=n$:

$$
f(m)=f(n)\implies m^2=n^2
\implies m^2-n^2=0
\implies(m-n)(m+n)=0
\implies m=\pm n.
$$

Since $m,n\in\mathbb{N}$ are nonnegative, $m=-n$ only when $m=n=0$. In either case, $m=n$, so $f$ is an injection.
### (b) Surjection
Prove that $f:\mathbb{R}\to\mathbb{R}$, defined by $f(x)=x^3+1$, is a surjection (onto). Recall that $f$ is surjective if and only if for every $y\in\mathbb{R}$, there exists an $x\in\mathbb{R}$ such that $f(x)=y$.
#### Solution
For any $y\in\mathbb{R}$, we need some $x\in\mathbb{R}$ such that $f(x)=y$. Take $x=\sqrt[3]{y-1}$, which is real. Then

$$
f(x)=\left(\sqrt[3]{y-1}\right)^3+1=(y-1)+1=y.
$$

### (c) Positive Reals
In class, we showed that $(0,1)$ is uncountable. In this subpart, we will prove that $\mathbb{R}^+=(0,\infty)$ is uncountable.
#### (i)
Define an injection $f:(0,1)\to\mathbb{R}^+$.
**Solution:**
An injection $f:(0,1)\to(0,\infty)$ is

$$
f(x)=x.
$$

It is immediate that $f$ is injective.
#### (ii)
Define an injection $g:\mathbb{R}^+\to(0,1)$.
**Solution:**
In the other direction, define $g:(0,\infty)\to(0,1)$ by

$$
g(x)=\frac{1}{x+1}.
$$

If $g(x)=g(y)$, then

$$
\frac{1}{x+1}=\frac{1}{y+1}\implies x=y.
$$

Hence $g$ is injective.
#### (iii)
Explain why the Cantor-Bernstein theorem implies that $\mathbb{R}^+$ is uncountable.
**Solution:**
We have injections in both directions between $(0,1)$ and $(0,\infty)$. The Cantor-Bernstein theorem therefore gives a bijection between these sets. They have the same cardinality, so because $(0,1)$ is uncountable, $\mathbb{R}^+=(0,\infty)$ is also uncountable.

---

## 2. Computability Basics
**Related course note:** [[cs70/Course Notes/N13 Self-Reference and Computability|Note 13 — Self-Reference and Computability]].
Consider the problem of determining if a function $F$ returns `TRUE`. That is, given a function $F$ that takes inputs from some (possibly infinite) set $\mathcal{X}$, we want to know if there is any input $x\in\mathcal{X}$ such that $F(x)$ returns `TRUE`. We will prove that this problem is uncomputable.
### (a) Inputs and Outputs of ReturnsTrue
We will use proof by contradiction. Suppose there exists a program `ReturnsTrue` that determines whether a function returns `TRUE` on some input $x\in\mathcal{X}$. What are the inputs and outputs of `ReturnsTrue`?
#### Solution
`ReturnsTrue` takes as input a function $F$ whose inputs come from $\mathcal{X}$. It returns `TRUE` if there is some $x\in\mathcal{X}$ such that $F(x)$ returns `TRUE`, and `FALSE` if no such $x$ exists.
### (b) The Hypothetical Halting Solver
We will reach a contradiction by solving the Halting Problem. What hypothetical program would solve the Halting Problem? What are its inputs and outputs?
#### Solution
The program `TestHalt` would solve the Halting Problem. It takes as input a program $P$ and an input $x$, and returns `TRUE` if $P(x)$ halts and `FALSE` if $P(x)$ runs forever.
### (c) Behavior of F
Fix a program $P$ and an input $x$, and consider the following program:
```python
def F(y):
    P(x)
    return TRUE
```
Will $F(y)$ return `TRUE` if $P(x)$ halts? Will it return `TRUE` if $P(x)$ loops forever?
#### Solution
If $P(x)$ halts, then $F(y)$ finishes running $P(x)$ and returns `TRUE` for every input $y$. If $P(x)$ loops forever, then $F(y)$ never gets past its first line, so it never returns `TRUE` on any input $y$.
### (d) Reduction to ReturnsTrue
Use `ReturnsTrue` to solve the Halting Problem, and conclude that `ReturnsTrue` cannot exist.
#### Solution
We can use `ReturnsTrue` to write `TestHalt`:
```python
def TestHalt(P, x):
    def F(y):
        P(x)
        return TRUE
    return ReturnsTrue(F)
```
By part (c), if $P(x)$ halts, then $F(y)$ returns `TRUE` on every input $y$, so `ReturnsTrue(F)` returns `TRUE`. If $P(x)$ does not halt, then $F$ never returns anything on any input, so `ReturnsTrue(F)` returns `FALSE`.
Thus `TestHalt(P, x)` returns `TRUE` exactly when $P(x)$ halts, solving the Halting Problem. Since the Halting Problem is uncomputable, this is a contradiction. Therefore, `ReturnsTrue` cannot exist.

---

## 3. Countability and the Halting Problem
**Related course notes:** [[cs70/Course Notes/N12 Countability and Infinity|Note 12 — Countability and Infinity]] and [[cs70/Course Notes/N13 Self-Reference and Computability|Note 13 — Self-Reference and Computability]].
Using methods from countability, we will prove the Halting Problem is uncomputable.
### (a) Countability of Programs
What is a reasonable representation for a computer program? Using this definition, show that the set of all programs is countable. (*Hint: Machine Code*)
#### Solution
We can represent a computer program by its machine code, which is a finite-length binary string. This gives an injection from the set of all programs into $\{0,1\}^*$, the set of finite-length binary strings. Since $\{0,1\}^*$ is countable by Note 12, the set of all programs is countable.
### (b) Countability of Inputs
The Halting Problem only considers programs which take a finite length input. Show that the set of all finite-length inputs is countable.
#### Solution
Every finite-length input can also be represented by a finite-length binary string, so the set of all finite-length inputs injects into $\{0,1\}^*$. Therefore, the set of all finite-length inputs is countable.
### (c) Flipping the Diagonal
Assume that you have a program that tells you whether or not a given program halts on a specific input. Since the set of all programs and the set of all inputs are countable, we can enumerate them and construct the following table.
| Program / Input | $x_1$ | $x_2$ | $x_3$ | $x_4$ | $\cdots$ |
|---|---|---|---|---|---|
| $p_1$ | H | L | H | L | $\cdots$ |
| $p_2$ | L | L | L | H | $\cdots$ |
| $p_3$ | H | L | H | L | $\cdots$ |
| $p_4$ | L | H | L | L | $\cdots$ |
| $\vdots$ | $\vdots$ | $\vdots$ | $\vdots$ | $\vdots$ | $\ddots$ |

An H (resp. L) in the $i$th row and $j$th column means that program $p_i$ halts (resp. loops) on input $x_j$. Now write a program that is not within the set of programs in the table above.
#### Solution
Call the assumed program `TestHalt`: `TestHalt(P, x)` returns `TRUE` if $P(x)$ halts and `FALSE` if $P(x)$ loops. Use it to flip the diagonal of the table with the following pseudocode:
```text
def Q(x):
    j = index of x in the list x_1, x_2, ...
    if TestHalt(p_j, x_j):
        loop forever
    else:
        halt
```
$Q$ can find $j$ and $p_j$ by listing the inputs and programs in the same order used for the table. For every $j$, $Q$ does the opposite of $p_j$ on input $x_j$: if $p_j(x_j)$ halts, then $Q(x_j)$ loops, and if $p_j(x_j)$ loops, then $Q(x_j)$ halts. Thus $Q$ differs from every program in the table.
### (d) The Contradiction
Find a contradiction between parts (a) and (c) to show that the Halting Problem can't be solved.
#### Solution
By part (a), the table lists every program, so $Q=p_n$ for some $n$. Consider the diagonal entry in row $n$ and column $n$.
If it is H, then $p_n(x_n)$ halts, so by construction $Q(x_n)$ loops. But $Q=p_n$, so this says that $p_n(x_n)$ loops.
If it is L, then $p_n(x_n)$ loops, so $Q(x_n)$ halts. Since $Q=p_n$, this says that $p_n(x_n)$ halts.
Either case gives a contradiction. Therefore, `TestHalt` cannot exist, and the Halting Problem cannot be solved.

---

## 4. Count It!
**Related course note:** [[cs70/Course Notes/N12 Countability and Infinity|Note 12 — Countability and Infinity]].
For each of the following sets, determine and briefly explain whether it is finite, countably infinite (like the natural numbers), or uncountably infinite (like the reals):
### (a) Integers That Divide 8
The integers which divide $8$.
#### Solution
**Finite.** They are

$$
\{-8,-4,-2,-1,1,2,4,8\}.
$$

### (b) Integers Divisible by 8
The integers which $8$ divides.
#### Solution
**Countably infinite.** There exists a bijection $f:\mathbb{N}\to\mathbb{Z}$. Then $g(n)=8f(n)$ is a bijection from $\mathbb{N}$ to the integers which $8$ divides.
### (c) Functions from the Naturals to the Naturals
The functions from $\mathbb{N}$ to $\mathbb{N}$.
#### Solution
**Uncountably infinite.** Use Cantor's diagonalization proof.
Let $\mathcal{F}$ be the set of all functions from $\mathbb{N}$ to $\mathbb{N}$. A function $f\in\mathcal{F}$ can be represented as an infinite sequence $(f(0),f(1),\ldots)$. Suppose, for contradiction, that there is a bijection from $\mathbb{N}$ to $\mathcal{F}$:

$$
\begin{aligned}
0&\longleftrightarrow(f_0(0),f_0(1),f_0(2),f_0(3),\ldots),\\
1&\longleftrightarrow(f_1(0),f_1(1),f_1(2),f_1(3),\ldots),\\
2&\longleftrightarrow(f_2(0),f_2(1),f_2(2),f_2(3),\ldots),\\
3&\longleftrightarrow(f_3(0),f_3(1),f_3(2),f_3(3),\ldots),\\
&\phantom{\longleftrightarrow}\vdots
\end{aligned}
$$

Define $g:\mathbb{N}\to\mathbb{N}$ by

$$
g(i)=f_i(i)+1.
$$

If $g$ were the $n$th function $f_n$ in the list, they would differ at argument $n$, since $g(n)=f_n(n)+1\ne f_n(n)$. This is a contradiction, so the set is uncountable.
### (d) Finite Strings over the English Alphabet
The set of strings over the English alphabet. (Note that the strings may be arbitrarily long, but each string has finite length. Also the strings need not be real English words.)
#### Solution
**Countably infinite.** The English alphabet is finite: it has $52$ characters if only uppercase and lowercase letters are counted, or more if special symbols are included, but still finitely many.
Enumerate all strings of length $1$ in lexicographic order, then all strings of length $2$, then all strings of length $3$, and so on. There are only finitely many strings of each length, so every finite-length string appears, and each appears exactly once. Mapping $n$ to the $n$th string gives a bijection.
### (e) Finite Strings over a Countably Infinite Alphabet
The set of finite-length strings drawn from a countably infinite alphabet, $\mathcal{A}$.
#### Solution
**Countably infinite.** Let $\mathcal{A}=\{a_1,a_2,\ldots\}$. The official solutions give two arguments.
**Alternative 1: Enumeration.** Listing all length-$1$ strings first would never finish because the alphabet is infinite. Restricting the alphabet to just one character would not suffice either, since $a,aa,aaa,\ldots$ never ends. Instead, restrict both the length and the allowed characters:
1. List all strings containing only $a_1$ that have length at most $1$.
2. List all strings containing only characters in $\{a_1,a_2\}$ that have length at most $2$ and have not been listed before.
3. List all strings containing only characters in $\{a_1,a_2,a_3\}$ that have length at most $3$ and have not been listed before.
4. Continue in the same way.

Each stage uses a finite alphabet and a finite length bound, so it terminates. For any string $s$ of length $\ell$, let $k$ be the largest index of a character appearing in $s$. The string appears at stage $\max(k,\ell)$. Skipping previously listed strings ensures that every string appears exactly once.
**Alternative 2: Encoding into ternary strings.** Use the same idea as Note 12's encoding of polynomials with natural coefficients. For example,

$$
S=a_5a_2a_7a_4a_6
$$

has character indices with binary representations

$$
(101,10,111,100,110).
$$

Insert the digit $2$ between successive binary strings to obtain

$$
101210211121002110.
$$

The original string can be recovered uniquely by splitting at the separators and decoding the indices, so this is an injection into $\{0,1,2\}^*$. That set is countable by Note 12, so the set of finite-length strings over $\mathcal{A}$ is countable.
### (f) Infinite Strings over the English Alphabet
The set of infinite-length strings over the English alphabet.
#### Solution
**Uncountably infinite.** For an infinite string $s$, let $s[i]$ be its $i$th character, starting at position $0$. Suppose, for contradiction, that all such strings can be enumerated as $s_0,s_1,\ldots$.
Define $s'[i]$ to be the next character in the alphabet after $s_i[i]$, wrapping around at the end of the alphabet (for lowercase letters, $z$ wraps back to $a$). Then $s'$ differs from $s_i$ at position $i$ for every $i$, so it is absent from the purported enumeration. This contradiction proves uncountability.
**Alternative: A surjection onto $[0,1]$.** Consider the subset of infinite strings containing only $a$ and $b$. Replace each $a$ with $0$ and each $b$ with $1$, and prepend `0.` to obtain a binary expansion of a real number in $[0,1]$.
Every number in $[0,1]$ has a binary expansion, so the map is onto. It is not a bijection, because some numbers have two expansions, such as $0.0111\ldots_2=0.1000\ldots_2$. But a surjection suffices: if this subset were countable, listing the images of its elements would make $[0,1]$ countable. Thus the subset, and therefore the full set of infinite strings, is uncountable.

---

## 5. Unprogrammable Programs
**Related course note:** [[cs70/Course Notes/N13 Self-Reference and Computability|Note 13 — Self-Reference and Computability]].
Prove whether the programs described below can exist or not.
The code is pseudocode; `halt` means immediate termination.
### (a) Testing a Program's Output
A program $P(F,x,y)$ that returns true if the program $F$ outputs $y$ when given $x$ as input (i.e. $F(x)=y$) and false otherwise.
#### Solution
$P$ cannot exist, because it would let us solve the Halting Problem:
```python
def Halt(F, x):
    def Q(x):
        F(x)
        return 0
    return P(Q, x, 0)
```
`Halt` defines a subroutine $Q$ that first simulates $F$ and then returns $0$. Thus $Q(x)$ returns $0$ if $F(x)$ halts, and returns nothing otherwise. The output of $P(Q,x,0)$ therefore tells us whether $F(x)$ halts. This would solve the Halting Problem, so $P$ cannot exist.
### (b) Comparing Two Programs' Halting Behavior
A program $P$ that takes two programs $F$ and $G$ as arguments, and returns true if for all inputs $x$, $F$ halts on $x$ iff $G$ halts on $x$ (and returns false if this equivalence is not always true).
> [!tip] Hint
> Use $P$ to solve the halting problem, and consider defining two subroutines to pass in to $P$, where one of the subroutines always halts.

#### Solution
Again, use the hypothetical $P$ to solve the Halting Problem:
```text
def Halt(F, x):
    def Q(y):
        halt
    def R(y):
        if y == x:
            F(x)
        else:
            halt
    return P(Q, R)
```
$Q$ always halts. On every input other than $x$, $R$ halts immediately; on input $x$, it runs $F(x)$.
The only possible difference between the sets of inputs on which $Q$ and $R$ halt is therefore at $x$. If $P(Q,R)$ returns true, they halt on the same inputs, so $F(x)$ must halt. If it returns false, they differ on some input, which must be $x$, so $F(x)$ must loop.
Thus this algorithm would solve the Halting Problem, a contradiction. Therefore, $P$ cannot exist.
