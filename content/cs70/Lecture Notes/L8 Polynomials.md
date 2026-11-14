---
title: L8 Polynomials
Content Type: Lecture
Content Area:
Course: CS70
description: "The lecture introduced polynomials, their coefficients and degrees, and two structural properties concerning roots and interpolation. It developed Lagrange interpolation, explained polynomials over finite fields, and applied interpolation to threshold secret sharing."
pinned: false
Date Published: September 22, 2026
Last Updated: September 22, 2026
Status: Finalized
---

# L8 Polynomials

## Executive Summary

The lecture began with advice for learning in a fast-moving course: begin with the homework, treat getting stuck as productive, consult the notes, and arrive at discussion or office hours with a concrete question. It then used a secret-sharing problem to motivate modular arithmetic and polynomials.

The main mathematical topics were:

- the definition and anatomy of a polynomial;
- the facts that a nonzero degree-$d$ polynomial has at most $d$ roots and that $d+1$ points uniquely determine a degree-$d$ polynomial;
- the construction of a polynomial from points by Lagrange interpolation;
- the behavior of polynomials modulo a prime and the reason for working over a field; and
- a polynomial-based scheme in which any three of five friends can reconstruct a secret, while two cannot determine it.

---

## Course Survival Guide

Because the course moves quickly and covers many topics, the instructor identified homework as the main place where learning occurs. Hearing and understanding an explanation is different from being able to put pencil to paper and work through a problem.

Getting stuck is productive in mathematics. When stuck, a student should sit with the problem, perhaps move temporarily to another problem, and then return. The next resource should be the notes, which contain material that the limited lecture time may not cover completely.

Before seeking an answer in discussion or office hours, a student should develop the question as far as possible:

- Write down the relevant definitions.
- Record the attempted manipulations.
- Identify precisely where the argument stops.
- Formulate a concrete question about the next needed step.

This effort builds context for the eventual answer. The instructor described it as clearing shelf space in one’s head so that an explanation has somewhere to sit.

Individual work and collaboration both matter. There are times for putting one’s head down and working through the algebra, as well as times for working with others between those individual attempts.

The course topics may also shift substantially. The reordered sequence moves from divisibility to modular arithmetic, then to polynomials and their applications, followed by graphs and other topics. Although the subjects change, they continue to use the proof techniques developed earlier. A new topic can therefore serve as a reset point if one topic is not yet clicking.

---

## Splitting a Secret with Modular Arithmetic

Suppose two friends share an emergency account protected by the six-digit PIN

$$
S=873291.
$$

A simple scheme is to split the PIN down the middle:

$$
S_1=873,
\qquad
S_2=291.
$$

This allows the two friends to reconstruct the PIN together, but each piece is less secure than the original PIN. A six-digit PIN has

$$
10^6=1{,}000{,}000
$$

possibilities, whereas a three-digit piece has only

$$
10^3=1{,}000
$$

possibilities. Someone holding one half could try all possibilities for the other half much more easily than they could search the original space.

### A modular additive scheme

Let

$$
N=1{,}000{,}000,
$$

so that a six-digit PIN belongs to

$$
\mathbb Z_N=\{0,1,\ldots,999999\}.
$$

Choose $S_1$ uniformly at random from $\mathbb Z_N$, and define

$$
S_2=S-S_1 \pmod N.
$$

The two shares recover the secret because

$$
S_1+S_2
\equiv S_1+(S-S_1)
\equiv S
\pmod N.
$$

Each share is itself a six-digit modular value. Since $S_1$ was random, knowing only one share does not reveal which value the other share, and therefore the secret, must have.

The modulus is important. Without reduction modulo $N$, a negative value of $S_2$ could reveal that $S$ was smaller than $S_1$. Modulo $N$, subtraction wraps around the clock and produces another element of $\mathbb Z_N`, preventing that particular leakage.

To generate the shares, some party or algorithm must initially know the secret. It can choose $S_1$, compute $S_2$, discard the original secret, and distribute the two shares separately.

### The motivating threshold problem

The harder problem is to divide a secret among five friends so that any three can reconstruct it. Requiring all five shares to sum to the secret would not accomplish this. The desired property is that every group of three shares is sufficient, while fewer shares do not determine the secret.

This problem motivates the use of polynomials.

---

## Definition and Anatomy of a Polynomial

A polynomial is a function with the form

$$
f(x)
=
a_d x^d+a_{d-1}x^{d-1}+\cdots+a_2x^2+a_1x+a_0.
$$

Equivalently, using summation notation,

$$
f(x)=\sum_{i=0}^{d}a_i x^i.
$$

The largest exponent with a nonzero coefficient is the degree. The values $a_0,a_1,\ldots,a_d$ are the coefficients, and $a_0$ is the constant term. The constant term may be viewed as $a_0x^0$, since $x^0=1$.

A missing power has coefficient zero. For example, in

$$
4x^3+7x+2,
$$

the degree is $3$, and the coefficients include

$$
a_3=4,\qquad a_2=0,\qquad a_1=7,\qquad a_0=2.
$$

Conversely, if

$$
a_3=7,\qquad a_2=-2,\qquad a_1=0,\qquad a_0=9,
$$

then the polynomial is

$$
7x^3-2x^2+0x+9
=
7x^3-2x^2+9.
$$

An expression need not initially appear in expanded polynomial form. For example,

$$
(x-1)^2
$$

is a polynomial because it can be expanded as

$$
(x-1)^2=x^2-2x+1.
$$

Thus, the relevant requirement is that the function can be written in polynomial form.

---

## Two Structural Properties of Polynomials

The lecture emphasized two properties that support the later applications:

1. Any nonzero degree-$d$ polynomial has at most $d$ roots.
2. Any $d+1$ points with distinct input coordinates uniquely determine a degree-at-most-$d$ polynomial.

These properties express the amount of structure that polynomials possess. A polynomial may define a function across an entire domain, yet only a small number of points are needed to determine it.

Familiar low-degree cases suggest the second property:

- A degree-$1$ polynomial is a line, and two points determine it.
- A degree-$2$ polynomial is a quadratic or parabola, and three points determine it.
- A degree-$3$ polynomial is cubic, and four points determine it.
- Following the same pattern, $101$ points determine a polynomial of degree at most $100$.

### Roots and zeros

A root, also called a zero, is an input at which the polynomial evaluates to zero. Geometrically over the real numbers, roots are the points where the graph meets the $x$-axis.

Consider

$$
f(x)=x^2-3x+2.
$$

Factoring gives

$$
f(x)=(x-1)(x-2).
$$

Therefore,

$$
f(1)=0
\qquad\text{and}\qquad
f(2)=0,
$$

so the roots are $1$ and $2$.

The lecture’s factoring intuition was that roots correspond to factors of the form

$$
x-r_i.
$$

A degree-$d$ polynomial can therefore have at most $d$ roots. The formal proof, described as appearing in the course notes, uses induction together with polynomial long division.

“At most” is important. A degree-$2$ polynomial need not have two distinct real roots. For example,

$$
x^2-2x+1=(x-1)^2
$$

has the repeated root $1$, so it has only one distinct root. Also,

$$
x^2+1
$$

has no real roots, although its roots exist outside the real numbers. Thus, the number of roots depends in part on the domain or field under consideration.

---

## Lagrange Interpolation

Lagrange interpolation is a constructive proof that $d+1$ points determine a polynomial of degree at most $d$. It does not merely assert that the polynomial exists - it supplies a formula for building it.

### Constructing a quadratic through three points

Consider the three points

$$
(1,1),\qquad (3,4),\qquad (6,2).
$$

Because there are three points, the goal is to construct a degree-at-most-$2$ polynomial $f$ satisfying

$$
f(1)=1,\qquad f(3)=4,\qquad f(6)=2.
$$

The construction creates one term for each desired output. Each term should survive at its own input and vanish at the other two inputs.

For the first point, factors of $(x-3)$ and $(x-6)$ make the term vanish when $x=3$ or $x=6$. Dividing by the corresponding values at $x=1$ normalizes the term so that it equals $1$ at $x=1$:

$$
1\cdot
\frac{(x-3)(x-6)}
     {(1-3)(1-6)}.
$$

For the second point, factors of $(x-1)$ and $(x-6)$ make the term vanish at $x=1$ and $x=6$. The denominator makes the multiplier equal $1$ at $x=3$:

$$
4\cdot
\frac{(x-1)(x-6)}
     {(3-1)(3-6)}.
$$

For the third point, factors of $(x-1)$ and $(x-3)$ make the term vanish at $x=1$ and $x=3$. Again, the denominator normalizes the term at its intended input:

$$
2\cdot
\frac{(x-1)(x-3)}
     {(6-1)(6-3)}.
$$

Adding the three terms produces

$$
f(x)
=
1\cdot
\frac{(x-3)(x-6)}
     {(1-3)(1-6)}
+
4\cdot
\frac{(x-1)(x-6)}
     {(3-1)(3-6)}
+
2\cdot
\frac{(x-1)(x-3)}
     {(6-1)(6-3)}.
$$

To check $f(1)$, observe that the second and third terms contain $(x-1)$ and therefore become zero. In the first term, substituting $x=1$ makes the numerator identical to the denominator:

$$
f(1)
=
1\cdot
\frac{(1-3)(1-6)}
     {(1-3)(1-6)}
=1.
$$

To check $f(3)$, the first and third terms contain $(x-3)$ and vanish. The second term becomes

$$
f(3)
=
4\cdot
\frac{(3-1)(3-6)}
     {(3-1)(3-6)}
=4.
$$

To check $f(6)$, the first and second terms contain $(x-6)$ and vanish. The third term becomes

$$
f(6)
=
2\cdot
\frac{(6-1)(6-3)}
     {(6-1)(6-3)}
=2.
$$

Each summand contains a product of two linear factors, so each has degree at most $2$. Adding degree-at-most-$2$ polynomials cannot increase the degree. Therefore, the resulting polynomial has degree at most $2$.

### The general construction

Suppose the given points are

$$
(x_1,y_1),(x_2,y_2),\ldots,(x_{d+1},y_{d+1}).
$$

For each index $i$, define a polynomial

$$
\Delta_i(x)
=
\prod_{\substack{j=1\\j\ne i}}^{d+1}
\frac{x-x_j}{x_i-x_j}.
$$

The denominator does not depend on $x. These polynomials behave like algebraic on-off switches:

$$
\Delta_i(x_i)=1,
$$

because substituting $x_i$ makes every numerator factor equal its matching denominator factor. For any $j\ne i$,

$$
\Delta_i(x_j)=0,
$$

because the product contains the factor

$$
x_j-x_j=0.
$$

The interpolating polynomial is

$$
f(x)=\sum_{i=1}^{d+1}y_i\Delta_i(x).
$$

At $x=x_i$, every term except the $i$th term vanishes, while the $i$th term becomes $y_i$. Hence,

$$
f(x_i)=y_i.
$$

Each $\Delta_i$ is a product of $d$ linear factors, so it has degree at most $d$. Their weighted sum also has degree at most $d$.

The lecture compared this construction to the Chinese remainder theorem. In each setting, algebraic “radio buttons” are constructed so that one selected contribution equals $1$ while the others equal $0$. The lecture also called this behavior an indicator-function pattern: the expression is $1$ for the selected case and $0$ for the others.

A linear-algebra interpretation was also acknowledged. The $\Delta_i$ polynomials can be viewed as basis polynomials that allow the desired polynomial to be assembled from the target values.

---

## Why the Interpolating Polynomial Is Unique

Lagrange interpolation constructs a polynomial through the points, but uniqueness requires a separate argument.

Suppose $F$ and $G$ are degree-at-most-$d$ polynomials passing through the same $d+1$ points. The goal is to show

$$
F=G.
$$

Define a new polynomial

$$
P(x)=F(x)-G(x).
$$

Because subtracting two degree-at-most-$d$ polynomials cannot increase the degree, $P$ has degree at most $d$.

Proceed by contradiction. Assume $P$ is not the zero polynomial. By the root property, a nonzero polynomial of degree at most $d$ has at most $d$ roots.

However, $F$ and $G$ agree on the same $d+1$ input values. At each such input $x_i$,

$$
P(x_i)=F(x_i)-G(x_i)=0.
$$

Thus, $P$ has at least $d+1$ roots. This contradicts the conclusion that it has at most $d$ roots.

The assumption that $P$ is nonzero must therefore be false. Hence $P$ is the zero polynomial:

$$
P(x)=0
$$

for every $x`. Since

$$
F(x)-G(x)=0,
$$

it follows that

$$
F(x)=G(x)
$$

everywhere.

This proof does not use the Lagrange formula. It gives the more general conclusion that two degree-at-most-$d$ polynomials that agree at $d+1$ points must agree everywhere. The instructor summarized the idea by saying that polynomials cannot agree on too many points without agreeing on everything.

---

## Polynomials Modulo a Prime

The lecture next considered when apparently different polynomials define the same function modulo a number.

For example, modulo $11$, Fermat’s little theorem gives

$$
x^{10}\equiv 1\pmod{11}
$$

when $x\not\equiv0\pmod{11}$. Multiplying by $x$ yields

$$
x^{11}\equiv x\pmod{11}.
$$

This latter identity also holds when $x\equiv0\pmod{11}$, since both sides are then zero.

Now consider $x^{81}$. Since

$$
81=8\cdot10+1,
$$

we can write

$$
x^{81}=(x^{10})^8x.
$$

Modulo $11$, this becomes

$$
x^{81}\equiv 1^8x\equiv x\pmod{11}
$$

for nonzero $x$, and the same conclusion holds at $x=0$. Thus, $x^{81}$ and $x$ define the same function modulo $11$.

The lecture noted that high-degree polynomials can be rewritten as equivalent lower-degree polynomials in this modular setting, with the homework developing that idea further. Coefficients are also reduced modulo the prime. For instance,

$$
12\equiv1\pmod{11},
$$

so

$$
12x^{81}\equiv x\pmod{11}.
$$

### The field $\operatorname{GF}(p)$

For a prime $p$, the lecture used the notation

$$
\operatorname{GF}(p)=\{0,1,2,\ldots,p-1\},
$$

with arithmetic performed modulo $p$. This was called the Galois field for the prime $p$.

The practical motivation is that computers handle finite, discrete arithmetic cleanly. Working over the real numbers may involve approximation and questions of precision, whereas modular arithmetic produces a finite setting.

A field is a setting where addition and multiplication behave well enough for the expected algebraic manipulations. The lecture did not develop the complete abstract definition of a field, but emphasized that modular arithmetic with a prime modulus preserves the polynomial properties being used.

### What fails for a composite modulus

Modulo a composite number, nonzero values can multiply to zero. The lecture illustrated this modulo $6` with

$$
(x-1)(x-2)\equiv0\pmod6.
$$

The obvious roots are $x=1$ and $x=2$. But $x=4$ is also a root because

$$
(4-1)(4-2)=3\cdot2=6\equiv0\pmod6.
$$

This degree-$2$ polynomial therefore has three roots modulo $6$, contradicting the root bound that a nonzero degree-$2$ polynomial should have at most two roots.

The underlying issue is the presence of zero divisors: nonzero values whose product is zero modulo the modulus. Relatedly, values such as $2$ do not have a multiplicative inverse modulo $6$, because their greatest common divisor with $6$ is not $1$. These features disrupt ordinary algebraic cancellation and the structural polynomial properties needed in the lecture.

This is why the later construction works over a prime modulus and its corresponding field.

---

## Threshold Secret Sharing with Polynomials

Return to the problem of five friends who want a shared account such that any three can recover the PIN.

The crucial fact is that three points uniquely determine a degree-at-most-$2$ polynomial. This suggests encoding the secret as part of a random quadratic polynomial.

### Constructing the shares

Work modulo a prime $p$. Let the secret be $S$, and choose a random degree-at-most-$2$ polynomial satisfying

$$
f(0)=S.
$$

Such a polynomial can be written as

$$
f(x)=a_2x^2+a_1x+S,
$$

because substituting $x=0$ leaves only the constant term:

$$
f(0)=S.
$$

Choosing $a_2$ and $a_1$ randomly produces a random quadratic with the required constant term.

Give the five friends the shares

$$
S_1=(1,f(1)),
$$

$$
S_2=(2,f(2)),
$$

and continuing in the same way through

$$
S_5=(5,f(5)).
$$

Each share is a point on the polynomial.

### Reconstruction by any three friends

Any three friends possess three points on $f$. They can apply Lagrange interpolation to reconstruct the unique degree-at-most-$2$ polynomial through those points.

Once they have recovered $f$, they evaluate

$$
f(0)=S
$$

to obtain the secret.

The secret does not fundamentally have to be stored at $x=0$; that point is convenient because it is the $y$-intercept. Another fixed evaluation point could be used as long as the distributed shares were taken at other inputs.

### Why two friends are insufficient

Two points do not determine a unique quadratic. Given only two shares, many degree-$2$ polynomials can pass through those points, depending on where a possible third point is placed. Those different polynomials can have different values at $x=0`.

Consequently, with only two shares, the value

$$
f(0)=S
$$

could still vary. The two friends therefore cannot determine the secret from their shares alone.

### Changing the threshold

If four friends rather than three should be required to reconstruct the secret, use a degree-at-most-$3$ polynomial. Four points uniquely determine such a polynomial, while fewer points do not.

The general design principle stated in the lecture is that the reconstruction threshold determines the polynomial degree: requiring a certain number of points means choosing a polynomial whose degree is one less than that number.
