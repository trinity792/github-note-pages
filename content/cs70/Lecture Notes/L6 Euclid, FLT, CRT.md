---
title: L6 Euclid, FLT, CRT
Content Type: Lecture
Content Area:
Course: CS70
description: "The lecture developed greatest common divisors, relative primality, Bézout's identity, and the Euclidean and extended Euclidean algorithms, with geometric and algebraic walkthroughs. It then introduced modular inverses, a switch-based construction for simultaneous congruences, the Chinese remainder theorem, and Fermat's little theorem."
pinned: false
Date Published: September 15, 2026
Last Updated: September 15, 2026
Status: Finalized
---

# L6 Euclid, FLT, CRT

## Executive Summary

The lecture began with guidance about the course's pace, quizzes, proof writing, feedback, and midterm strategy. It then used a rectangle-tiling problem to motivate the greatest common divisor and relative primality.

The mathematical development centered on the relationship between coprimality and modular inverses. Bézout's identity supplied the main lemma: a greatest common divisor can be expressed as an integer linear combination. The lecture showed how this identity produces a modular inverse when the greatest common divisor is $1$ and separately proved that an inverse, if it exists, is unique.

The Euclidean algorithm was developed geometrically by repeatedly reducing a rectangle to a smaller remainder rectangle. Its extended form was then motivated by working backward through those remainders to recover the coefficients in Bézout's identity.

Finally, the lecture constructed an algebraic "switch" to solve two simultaneous congruences, connected the construction to the Chinese remainder theorem, and introduced Fermat's little theorem as a way to simplify large modular powers. The last Fermat's little theorem calculation was not completed in these notes.

---

## Course Guidance and Assessment Strategy

The instructor acknowledged the increasing pace of the course and described the quizzes as advance exposure to the kinds of questions that will appear on the midterm. Because the class is moving quickly, students should not expect to pass every quiz topic on the first attempt, especially when the topic involves proofs. Proof writing improves through experience and practice, so studying posted solutions can help students learn what will be expected later.

### Mathematical proof writing

The course does not require every proof to be reduced all the way to formal axiomatic logic. The instructor characterized ordinary mathematical practice as natural-language storytelling about formal mathematical objects.

The appropriate level of formality depends on whether the argument is understandable, convincing, and conventional. Experience helps determine when a remaining step may reasonably be called obvious. Students were encouraged to read solutions to learn the expected style.

The homework feedback process is especially useful for questions such as:

- Is this proof valid?
- Is this an appropriate way to begin the proof?
- Is the proof sufficiently formal and understandable?
- Even if the argument is valid, is it idiomatic and consistent with mathematical conventions?

This feedback is more useful for proof structure and presentation than for merely checking a short numerical answer.

### Quizzes and the midterm

A topic only needs to be passed once. The number of questions required to pass depends on the topic and is stated on the quiz, such as passing two out of three questions or all three.

The pass/no-pass determination already incorporates some judgment similar to partial credit. A small arithmetic or symbolic error may still receive a pass if the work demonstrates the intended proof structure, but an error that breaks the proof may result in no pass.

The midterm lasts two hours. Students will need to choose which problems to attempt:

- A problem from a topic already passed should not be the first priority.
- Topic problems may improve a student's grade tier.
- A synthesis question may deserve early attention, particularly if the necessary topic requirements have already been met.
- Extra problems can be attempted later if time remains.

---

## Greatest Common Divisors

The lecture motivated greatest common divisors through tiling. Consider a $12 \times 42$ rectangle and ask for the largest $k \times k$ square that tiles the rectangle completely without overhang.

A $1 \times 1$ square works because $1$ divides both side lengths. A $2 \times 2$ square also works because $2$ divides both $12$ and $42$.

A $12 \times 12$ square does not work. Three such squares cover length $36$ along the side of length $42$, leaving a remainder of $6$. A fourth square would overhang.

The largest square that works is $6 \times 6$ because

$$
6 \mid 12
\qquad\text{and}\qquad
6 \mid 42,
$$

and no larger integer divides both dimensions.

### Definition of greatest common divisor

For integers $x$ and $y$, the greatest common divisor is the largest integer $d$ such that

$$
d \mid x
\qquad\text{and}\qquad
d \mid y.
$$

It is denoted

$$
\gcd(x,y).
$$

For the tiling example,

$$
\gcd(12,42)=6.
$$

The factor-based explanation is that $12$ and $42$ share factors $2$ and $3$, whose product is $6$.

### Relatively prime integers

Two integers $x$ and $y$ are relatively prime, also called coprime, when

$$
\gcd(x,y)=1.
$$

The individual numbers do not both need to be prime. For example, $12$ is not prime, but $5$ and $12$ are relatively prime because

$$
\gcd(5,12)=1.
$$

The phrase "relatively prime" means that the numbers are prime relative to one another: they have no common factor larger than $1$.

---

## Modular Inverses

The lecture revisited modular inverses through the congruence

$$
-3x \equiv 2 \pmod 7.
$$

The first step is to replace $-3$ by an equivalent residue modulo $7$. Since

$$
-3 \equiv 4 \pmod 7,
$$

the congruence becomes

$$
4x \equiv 2 \pmod 7.
$$

The instructor connected this replacement to additive inverses: $3+4=7$, which is congruent to $0$ modulo $7$.

To isolate $x$, find a multiplicative inverse of $4$ modulo $7$. Since

$$
4\cdot 2=8\equiv 1\pmod 7,
$$

the number $2$ is an inverse of $4$ modulo $7$. Multiplying both sides by $2$ gives

$$
2\cdot 4x \equiv 2\cdot 2 \pmod 7.
$$

Because $2\cdot 4\equiv 1\pmod 7$,

$$
x\equiv 4\pmod 7.
$$

The additive identity is $0$, while the multiplicative identity is $1$. Thus, additive cancellation seeks a value that produces $0$, whereas multiplicative cancellation seeks an inverse that produces $1$.

### Failure of an inverse modulo $12$

The lecture next asked for the multiplicative inverse of $10$ modulo $12$. Listing the multiples of $10$ modulo $12$ produces the repeating residues

$$
10,8,6,4,2,0,10,8,6,4,2,0,\ldots
$$

The residue $1$ never appears, so $10$ has no multiplicative inverse modulo $12$.

This behavior was connected to the common factor shared by $10$ and $12$. They are not relatively prime, and the multiples cycle through residues that never reach $1$.

### Coprimality and inverses

The theorem under discussion was:

$$
\gcd(x,m)=1
\quad\Longleftrightarrow\quad
x \text{ has a unique multiplicative inverse modulo }m.
$$

The lecture proved the direction from coprimality to the existence and uniqueness of an inverse. It did not fully prove the converse during class.

---

## Bézout's Identity

Bézout's identity was introduced as the central lemma used to prove the modular-inverse theorem.

For every pair of integers $x$ and $y$, there exist integers $a$ and $b$ such that

$$
ax+by=\gcd(x,y).
$$

Thus, the greatest common divisor can always be written as an integer linear combination of the original numbers.

### Example with $12$ and $42$

Since

$$
\gcd(12,42)=6,
$$

Bézout's identity says that some integers $a$ and $b$ satisfy

$$
12a+42b=6.
$$

One choice is

$$
a=4,
\qquad
b=-1,
$$

because

$$
4\cdot 12+(-1)\cdot 42
=48-42
=6.
$$

### Using Bézout's identity to produce an inverse

Assume

$$
\gcd(x,m)=1.
$$

By Bézout's identity, there are integers $a$ and $b$ such that

$$
ax+bm=1.
$$

Now reduce both sides modulo $m$. The term $bm$ becomes $0$ because it is divisible by $m$:

$$
ax+bm\equiv ax+0\equiv 1\pmod m.
$$

Therefore,

$$
ax\equiv 1\pmod m.
$$

This says exactly that $a$ is a multiplicative inverse of $x$ modulo $m`.

The useful consequence is constructive: finding Bézout coefficients does not merely prove that an inverse exists. The coefficient multiplying $x$ actually gives an inverse of $x$ modulo $m$.

### Proving uniqueness of the inverse

To prove uniqueness, assume that $y$ and $z$ are both inverses of $x$ modulo $m$. Then

$$
yx\equiv 1\pmod m
$$

and

$$
zx\equiv 1\pmod m.
$$

Multiply the second congruence by $y$:

$$
yzx\equiv y\pmod m.
$$

Rearranging the left side and using the fact that $yx\equiv 1\pmod m$ gives

$$
z(yx)\equiv y\pmod m,
$$

so

$$
z\equiv y\pmod m.
$$

Thus any two inverses represent the same residue modulo $m$, proving uniqueness in modular arithmetic.

The lecture described this as the standard pattern for a uniqueness proof: assume two candidate objects satisfy the required property, then show they must be the same.

### The converse direction

The converse would show that if

$$
\gcd(x,m)\ne 1,
$$

then $x$ has no inverse modulo $m$. The instructor suggested proving this by contraposition and connected the idea to the repeating cycle for multiples of $10$ modulo $12$. A complete formal proof was not given during the lecture.

---

## The Euclidean Algorithm

The Euclidean algorithm computes the greatest common divisor of two integers. The lecture developed it from the geometry of tiling rectangles.

### Geometric walkthrough for $\gcd(26,10)$

Begin with a $26\times 10$ rectangle. Two $10\times 10$ squares fit inside it, leaving a $6\times 10$ rectangle. Algebraically,

$$
26=2\cdot 10+6,
$$

so

$$
26\bmod 10=6.
$$

A square that tiles the $6\times 10$ remainder and divides the side of length $10$ also tiles the two removed $10\times 10$ squares. Therefore,

$$
\gcd(26,10)=\gcd(10,6).
$$

Now fit one $6\times 6$ square into the $10\times 6$ rectangle. This leaves a $4\times 6$ rectangle:

$$
10=1\cdot 6+4,
$$

and hence

$$
\gcd(10,6)=\gcd(6,4).
$$

Continue:

$$
6=1\cdot 4+2,
$$

so

$$
\gcd(6,4)=\gcd(4,2).
$$

Finally,

$$
4=2\cdot 2+0,
$$

so

$$
\gcd(4,2)=\gcd(2,0).
$$

Everything divides $0$, while the largest divisor of $2$ is $2$. Therefore,

$$
\gcd(2,0)=2.
$$

Combining all of the equalities gives

$$
\gcd(26,10)
=\gcd(10,6)
=\gcd(6,4)
=\gcd(4,2)
=\gcd(2,0)
=2.
$$

The numbers repeatedly "leapfrog": the smaller number becomes the first argument, while the remainder becomes the second.

### Recursive formulation

The algorithm follows the recurrence

$$
\gcd(x,y)=\gcd(y,x\bmod y).
$$

Its base case is

$$
\gcd(x,0)=x.
$$

In pseudocode form:

1. If $y=0$, return $x$.
2. Otherwise, compute the Euclidean algorithm on $y$ and $x\bmod y$.
3. Return the resulting greatest common divisor.

### Expressing the remainder without mod notation

The lecture also gave an algebraic formula for the remainder:

$$
x\bmod y
=
x-\left\lfloor\frac{x}{y}\right\rfloor y.
$$

The floor records how many whole copies of $y$ can be removed from $x$ without going below zero.

For example,

$$
26\bmod 10
=
26-\left\lfloor\frac{26}{10}\right\rfloor 10
=
26-2\cdot 10
=
6.
$$

This formalizes the geometric operation of removing as many full squares as possible and retaining the leftover rectangle.

---

## The Extended Euclidean Algorithm

The ordinary Euclidean algorithm returns only

$$
d=\gcd(x,y).
$$

The extended Euclidean algorithm additionally returns coefficients $a$ and $b$ such that

$$
ax+by=d.
$$

This supplies the coefficients promised by Bézout's identity.

### Base case

When the second input is $0$,

$$
\gcd(x,0)=x.
$$

The corresponding linear combination is

$$
1\cdot x+0\cdot 0=x.
$$

Thus the base case returns the triple

$$
(x,1,0),
$$

representing the greatest common divisor and the two coefficients.

For the concrete bottom step in the $\gcd(26,10)$ computation,

$$
2=\gcd(2,0)
$$

and

$$
2=1\cdot 2+0\cdot 0.
$$

### Working backward through the remainders

The goal is to move from the easy base-case representation involving $2$ and $0$ back toward a representation involving the original inputs $26$ and $10$.

The key intuition is that the intermediate numbers did not appear from nowhere. Every remainder can be rewritten using the two numbers from the previous Euclidean step:

- $6$ can be written using $26$ and $10$.
- $4$ can be written using $10$ and $6$.
- $2$ can be written using $6$ and $4$.
- $0$ can be written using $4$ and $2$.

At the bottom,

$$
0=4\bmod 2.
$$

Using the algebraic remainder formula,

$$
0
=
4-\left\lfloor\frac{4}{2}\right\rfloor 2.
$$

Substitute this expression for $0$ into

$$
2=1\cdot 2+0\cdot 0.
$$

This gives

$$
2
=
1\cdot 2
+
0\left(
4-\left\lfloor\frac{4}{2}\right\rfloor 2
\right).
$$

Distributing and grouping the coefficients of $4$ and $2$ yields

$$
2
=
0\cdot 4
+
\left(
1-0\left\lfloor\frac{4}{2}\right\rfloor
\right)2.
$$

Although this particular substitution is numerically simple because the coefficient of $0$ is itself $0$, it illustrates the update pattern.

For the next step,

$$
2=6\bmod 4.
$$

Therefore,

$$
2
=
6-\left\lfloor\frac{6}{4}\right\rfloor 4.
$$

Since $\left\lfloor 6/4\right\rfloor=1$,

$$
2=6-4.
$$

This rewrites the greatest common divisor in terms of $6$ and $4$, the inputs to the previous recursive call.

The same substitution process can continue upward. Each remainder is replaced with an expression involving the preceding pair, and like terms are grouped. Eventually the result is written as a linear combination of $26$ and $10$.

### Recursive interpretation

The algorithm first makes recursive calls until it reaches the base case. It then returns upward through those calls, updating the coefficients at every level. In programming terms, the computation descends through the recursive calls and then propagates coefficient information upward while the call stack is unwound.

The instructor emphasized that this process is constructive. It does not merely establish that Bézout coefficients exist; it provides a fast procedure for finding them and, when the greatest common divisor is $1$, for finding modular inverses.

A correctness proof for this recursive algorithm would use induction. The lecture stated the general principle that recursive algorithms are typically proved correct by induction, but it did not carry out the full proof here.

---

## Simultaneous Congruences and an Algebraic Switch

The lecture next considered an unknown integer $x$ satisfying

$$
x\equiv 4\pmod 7
$$

and

$$
x\equiv 2\pmod 6.
$$

The additional puzzle condition was that $x$ was an integer no greater than $50$.

The goal was to build a single algebraic expression that behaves differently under the two moduli.

### Constructing the switch

A term containing a factor of $7$ becomes $0$ modulo $7$. Similarly, a term containing a factor of $6$ becomes $0$ modulo $6$.

To make a term equal to $1$ modulo the other modulus, multiply by an appropriate modular inverse. The resulting construction is

$$
x
=
4\cdot 6\cdot 6^{-1}\pmod 7
+
2\cdot 7\cdot 7^{-1}\pmod 6.
$$

Here, the inverse notation in each term refers to the indicated modulus.

Consider the expression modulo $7$:

- The second term contains a factor of $7$, so it becomes $0$.
- In the first term, $6\cdot 6^{-1}\equiv 1\pmod 7$.
- Therefore the expression becomes $4$ modulo $7$.

Now consider the expression modulo $6$:

- The first term contains a factor of $6$, so it becomes $0$.
- In the second term, $7\cdot 7^{-1}\equiv 1\pmod 6$.
- Therefore the expression becomes $2$ modulo $6$.

This is why the construction acts like a switch: the chosen modulus turns one term off and reduces the other to the desired residue.

### Computing the inverses

Modulo $7$,

$$
6\cdot 6=36\equiv 1\pmod 7,
$$

so

$$
6^{-1}\equiv 6\pmod 7.
$$

Modulo $6$,

$$
7\equiv 1\pmod 6,
$$

so

$$
7^{-1}\equiv 1\pmod 6.
$$

Substituting these values gives the concrete integer

$$
x=4\cdot 6\cdot 6+2\cdot 7\cdot 1.
$$

Therefore,

$$
x=144+14=158.
$$

This number satisfies both original congruences, but it does not satisfy the puzzle's bound $x\le 50$.

### Reducing to the requested range

Because $6$ and $7$ are coprime, the lecture used the combined modulus

$$
6\cdot 7=42.
$$

The constructed value satisfies

$$
158\equiv 32\pmod{42}.
$$

Thus the value in the requested range is

$$
x=32.
$$

All solutions have the form

$$
x=32+42k
$$

for some integer $k$.

The "wrapping" metaphor is that the simultaneous system repeats on a modular clock of size $42$. Adding a multiple of $42$ preserves both the residue modulo $6$ and the residue modulo $7$.

---

## The Chinese Remainder Theorem

The simultaneous-congruence construction was identified as an instance of the Chinese remainder theorem.

The lecture's central claim was that a system of congruences with different coprime moduli can be combined into a single congruence. In the example,

$$
x\equiv 4\pmod 7,
\qquad
x\equiv 2\pmod 6
$$

became

$$
x\equiv 32\pmod{42}.
$$

The product modulus arose because the two moduli, $6$ and $7$, are relatively prime:

$$
42=6\cdot 7.
$$

The algebraic switch demonstrated how modular inverses can isolate the desired residue for one modulus while making the other term vanish. The lecture noted that the same idea extends to systems with more moduli, although no larger system was worked through.

---

## Fermat's Little Theorem

Fermat's little theorem was introduce. d as a tool for simplifying modular exponentiation. It was distinguished from Fermat's "big theorem."

The theorem was stated in the form: if $p$ is prime and the relevant value $a$ is nonzero modulo $p$, then

$$
a^{p-1}\equiv 1\pmod p.
$$

The instructor explained this as a guaranteed exponent cycle of length $p-1$ when the modulus is prime.

### Beginning the calculation of $5^{58}\bmod 7$

The lecture applied the theorem with modulus $7$. Since

$$
7-1=6,
$$

Fermat's little theorem gives

$$
5^6\equiv 1\pmod 7.
$$

Next, decompose the exponent:

$$
58=6\cdot 9+4.
$$

Therefore,

$$
5^{58}
=
5^{6\cdot 9+4}
=
(5^6)^9\cdot 5^4.
$$

Because $5^6\equiv 1\pmod 7$, this reduces the original large power to the remaining factor involving $5^4$. These notes end before the modular calculation is completed.

---

## Unclear or Incomplete Steps

The spoken factorization of $42$ during the introductory greatest-common-divisor example is garbled and internally inconsistent in these notes. The supported conclusion is only that $12$ and $42$ share the factors $2$ and $3$, giving $\gcd(12,42)=6$.

The instructor displayed or described the extended Euclidean algorithm's recursive coefficient update, but the exact pseudocode formula is not recoverable from these notes. The lecture clearly supports the base case, the backward-substitution method, and the purpose of grouping coefficients, but the complete formal update rule is `[unclear]`.

The final evaluation of

$$
5^{58}\bmod 7
$$

is incomplete. These notes reach

$$
5^{58}=(5^6)^9 5^4
$$

and invokes $5^6\equiv 1\pmod 7$, but it ends before stating the final residue.
#academic/year-3/cs70/lecture-notes