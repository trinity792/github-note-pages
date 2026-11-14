---
title: N8 Polynomials, Finite Fields, and Secret Sharing
Content Type: Course Notes
Content Area: Discrete Mathematics
description: "Properties of polynomials (bounds on roots, uniqueness of interpolating polynomials), Lagrange interpolation, polynomial division, finite fields, counting polynomials by coefficient and value representation, and a secret-sharing scheme built from polynomial interpolation over a finite field."
Course: CS 70
pinned: false
Date Published: September 26, 2026
Last Updated: September 26, 2026
Status: Finalized
---

# CS 70 Note 8 — Polynomials, Finite Fields, and Secret Sharing

Polynomials are a rich class of functions, both easy to describe and widely applicable, from Fourier analysis, cryptography, and communication to control and computational geometry. This note extends what you already know about polynomials over the real and complex numbers to modular arithmetic, and then uses the resulting properties to develop a secret-sharing scheme.

## 1. Polynomials

Recall from high school math that a **polynomial** in a single variable is an expression of the form

$$
p(x) = a_dx^d + a_{d-1}x^{d-1} + \cdots + a_1x + a_0.
$$

Here the variable $x$ and the coefficients $a_i$ are usually real numbers. For example, $p(x) = 5x^3+2x+1$ is a polynomial of degree $d=3$. Its coefficients are $a_3=5$, $a_2=0$, $a_1=2$, and $a_0=1$. Polynomials have some remarkably simple, elegant, and powerful properties, which this note explores.

A polynomial represents a function that can be evaluated in the natural manner using addition and multiplication. For example, $p(x)=5x^3+2x+1$ can be evaluated at $x=3$ to obtain $p(3) = 5(3)^3+2(3)+1 = 142$.

We say that $a$ is a **root** of the polynomial $p(x)$ if $p(a)=0$. For example, the degree-2 polynomial $p(x)=x^2-4$ has two roots, namely $2$ and $-2$, since $p(2)=p(-2)=0$. If we plot the polynomial $p(x)$ in the $x$-$y$ plane, the roots are just the places where the curve crosses the $x$ axis.

*The original note includes a plot of $p(x)=x^2-4$ here, showing the parabola crossing the $x$-axis at $x=2$ and $x=-2$.*

We now state two fundamental properties of polynomials that will be proved in due course.

### Property 1 — Bound on the Number of Roots

A non-zero polynomial of degree $d$ has at most $d$ roots.

### Property 2 — Uniqueness of the Interpolating Polynomial

Given $d+1$ pairs $(x_1,y_1),\dots,(x_{d+1},y_{d+1})$, with all the $x_i$ distinct, there is a unique polynomial $p(x)$ of degree (at most) $d$ such that $p(x_i)=y_i$ for $1\le i\le d+1$.

Consider what these two properties say when $d=1$. A plot over the reals of a linear (degree 1) polynomial $y=a_1x+a_0$ is a line. Property 1 says that if a line is not the $x$-axis (i.e., if the polynomial is not $y=0$), then it can intersect the $x$-axis in at most one point. Property 2 says that two points uniquely determine a line.

*The original note includes two plots here: one showing a line crossing the $x$-axis at a single point (illustrating Property 1), and one showing a line drawn through two given points (illustrating Property 2).*

---

## 2. Polynomial Interpolation

Property 2 says that two points uniquely determine a degree-1 polynomial (a line), three points uniquely determine a degree-2 polynomial (a quadratic), four points uniquely determine a degree-3 polynomial (a cubic), and so on. Given $d+1$ pairs $(x_1,y_1),\dots,(x_{d+1},y_{d+1})$, how do we determine the polynomial $p(x)=a_dx^d+\cdots+a_1x+a_0$ such that $p(x_i)=y_i$ for $1\le i\le d+1$? The following gives an algorithm for reconstructing the coefficients $a_0,\dots,a_d$, and therefore the polynomial $p(x)$.

The method is called **Lagrange interpolation**, and it should remind you of the Chinese Remainder Theorem. Start by solving an easier problem. Suppose that $y_1=1$ and $y_j=0$ for $2\le j\le d+1$. Can we reconstruct $p(x)$? Yes: consider

$$
q(x) = (x-x_2)(x-x_3)\cdots(x-x_{d+1}).
$$

This is a polynomial of degree $d$ (the $x_i$'s are constants, and $x$ appears $d$ times). Also, $q(x_j)=0$ for $2\le j\le d+1$. But what is $q(x_1)$? We have $q(x_1)=(x_1-x_2)(x_1-x_3)\cdots(x_1-x_{d+1})$, which is some constant not equal to $0$ (since $x_1$ is not equal to any of the other $x_i$). Thus if we let $p(x)=q(x)/q(x_1)$ (dividing is fine since $q(x_1)\ne0$), we have the polynomial we are looking for.

**Example**: suppose we are given the pairs $(1,1)$, $(2,0)$, and $(3,0)$. Then we can construct the degree $d=2$ polynomial $p(x)$ by letting $q(x)=(x-2)(x-3)=x^2-5x+6$ and $q(x_1)=q(1)=2$. Thus

$$
p(x) = \frac{q(x)}{q(x_1)} = \frac{x^2-5x+6}{2}.
$$

The problem is no harder if we single out an arbitrary index $i$ instead of $1$: i.e., $y_i=1$ and $y_j=0$ for $j\ne i$. Denote by $\Delta_i(x)$ the degree-$d$ polynomial that goes through these $d+1$ points. Then

$$
\Delta_i(x) = \frac{\prod_{j\ne i}(x-x_j)}{\prod_{j\ne i}(x_i-x_j)}.
$$

Returning to the original problem: given $d+1$ pairs $(x_1,y_1),\dots,(x_{d+1},y_{d+1})$, first construct the $d+1$ polynomials $\Delta_1(x),\dots,\Delta_{d+1}(x)$ as above. Then

$$
p(x) = \sum_{i=1}^{d+1}y_i\Delta_i(x).
$$

This works because $p(x)$ is a polynomial of degree $d$, as required, since it is a sum of polynomials of degree $d$. And when evaluated at $x_i$, $d$ of the $d+1$ terms in the sum evaluate to $0$ and the $i$-th term evaluates to $y_i$ times $1$, as required.

We can think of the polynomials $\Delta_i(x)$ as a "natural basis" for all polynomials whose values are specified at the points $\{x_j\}$. These basis polynomials depend only on the $x_j$, not on the values $y_j$ at the points; we sum the basis polynomials $\Delta_i$, with coefficients equal to the values $y_i$, to construct $p(x)$. This mirrors the construction used in the proof of the Chinese Remainder Theorem: the "basis" polynomials $\Delta_i(x)$ play a role analogous to the "basis" numbers $u_i$ in the CRT.

**Example**: suppose we want to find the degree-2 polynomial $p(x)$ that passes through the three points $(x_1,y_1)=(1,1)$, $(x_2,y_2)=(2,2)$, and $(x_3,y_3)=(3,4)$. The three polynomials $\Delta_i$ are

$$
\begin{aligned}
\Delta_1(x) &= \frac{(x-2)(x-3)}{(1-2)(1-3)} = \frac{(x-2)(x-3)}{2} = \tfrac12x^2-\tfrac52x+3; \\
\Delta_2(x) &= \frac{(x-1)(x-3)}{(2-1)(2-3)} = \frac{(x-1)(x-3)}{-1} = -x^2+4x-3; \\
\Delta_3(x) &= \frac{(x-1)(x-2)}{(3-1)(3-2)} = \frac{(x-1)(x-2)}{2} = \tfrac12x^2-\tfrac32x+1.
\end{aligned}
$$

The polynomial $p(x)$ is therefore given by

$$
p(x) = 1\cdot\Delta_1(x)+2\cdot\Delta_2(x)+4\cdot\Delta_3(x) = \tfrac12x^2-\tfrac12x+1.
$$

You should verify that this polynomial does indeed pass through the three points.

### Proof of Property 2

We are now in a position to prove Property 2:

*Given $d+1$ pairs $(x_1,y_1),\dots,(x_{d+1},y_{d+1})$, with all the $x_i$ distinct, there is a unique polynomial $p(x)$ of degree (at most) $d$ such that $p(x_i)=y_i$ for $1\le i\le d+1$.*

The construction above shows how to find a polynomial $p(x)$ such that $p(x_i)=y_i$ for the $d+1$ pairs, proving the existence part of Property 2. For uniqueness, suppose for contradiction that there is another polynomial $q(x)$ such that $q(x_i)=y_i$ for all $d+1$ pairs. Consider $r(x)=p(x)-q(x)$. Since $p(x)$ and $q(x)$ are assumed different, $r(x)$ must be a non-zero polynomial of degree at most $d$. Therefore Property 1 (proved below) implies it can have at most $d$ roots. But $r(x_i)=p(x_i)-q(x_i)=0$ at $d+1$ distinct points $x_i$, so $r(x)$ has at least $d+1$ roots — a contradiction. Therefore $p(x)$ is the unique polynomial that goes through the $d+1$ points.

### Polynomial Division

If we have a polynomial $p(x)$ of degree $d$, we can divide by a polynomial $q(x)$ of degree $\le d$ using long division. The result is

$$
p(x) = q'(x)q(x)+r(x),
$$

where $q'(x)$ is the quotient and $r(x)$ is the remainder. The degree of $r(x)$ must be smaller than the degree of $q(x)$.

**Example**: we wish to divide $p(x)=x^3+x^2-1$ by $q(x)=x-1$.

- First subtract a factor $x^2(x-1)$ to write $p(x)=x^2(x-1)+(2x^2-1)$.
- Then subtract a factor $2x(x-1)$ to write the remainder as $2x^2-1=2x(x-1)+(2x-1)$.
- Then subtract a factor $2(x-1)$ to write the remainder as $2x-1=2(x-1)+1$.
- Putting the three lines together, $p(x)=(x^2+2x+2)(x-1)+1$.

Therefore the quotient is $q'(x)=x^2+2x+2$, and the remainder is $r(x)=1$.

### Proof of Property 1

Now let us prove Property 1:

*A non-zero polynomial of degree $d$ has at most $d$ roots.*

The idea of the proof is to establish the following two claims.

**Claim 1**: If $a$ is a root of a polynomial $p(x)$ with degree $d\ge1$, then $p(x)=(x-a)q(x)$ for a polynomial $q(x)$ with degree $d-1$.

**Claim 2**: A polynomial $p(x)$ of degree $d$ with distinct roots $a_1,\dots,a_d$ can be written as $p(x)=c(x-a_1)\cdots(x-a_d)$, where $c$ is a real number.

Claim 2 immediately implies Property 1: we just need to show that $a\ne a_i$ for $i=1,\dots,d$ cannot be a root of $p(x)$. This follows from Claim 2, since $p(a)=c(a-a_1)\cdots(a-a_d)\ne0$.

#### Proof of Claim 1

Dividing $p(x)$ by $(x-a)$ gives $p(x)=(x-a)q(x)+r(x)$, where $q(x)$ is the quotient (of degree $d-1$) and $r(x)$ is the remainder. The degree of $r(x)$ is necessarily smaller than the degree of the divisor $(x-a)$. Therefore $r(x)$ must have degree $0$ and is some constant $c$. Substituting $x=a$ gives $p(a)=c$. But since $a$ is a root, $p(a)=0$. Thus $c=0$ and therefore $p(x)=(x-a)q(x)$.

#### Proof of Claim 2

Proof by induction on $d$.

- **Base case**: $d=0$. If $p(x)$ is a polynomial of degree $0$, it is simply a constant $c$, which trivially has the desired form.
- **Inductive hypothesis**: for some $d\ge0$, any polynomial of degree $d$ with distinct roots $a_1,\dots,a_d$ can be written as $p(x)=c(x-a_1)\cdots(x-a_d)$.
- **Inductive step**: let $p(x)$ be a polynomial of degree $d+1$ with distinct roots $a_1,\dots,a_{d+1}$. By Claim 1, $p(x)=(x-a_{d+1})q(x)$ for some polynomial $q(x)$ of degree $d$. Since $0=p(a_i)=(a_i-a_{d+1})q(a_i)$ for all $i\ne d+1$, and $a_i-a_{d+1}\ne0$, we must have $q(a_i)=0$. Thus $q(x)$ is a polynomial of degree $d$ with distinct roots $a_1,\dots,a_d$. Applying the inductive hypothesis to $q(x)$ gives $q(x)=c(x-a_1)\cdots(x-a_d)$. Substituting into $p(x)=(x-a_{d+1})q(x)$, we obtain $p(x)=c(x-a_1)\cdots(x-a_{d+1})$, as desired.

---

## 3. Finite Fields

Both Property 1 and Property 2 also hold when the coefficients and the variable $x$ are chosen from the complex numbers, or the rational numbers, rather than the real numbers. However, the proofs do not go through if the values are restricted to being natural numbers or integers.[^1] The only properties of numbers used in polynomial interpolation and in the proofs of Properties 1 and 2 are that we can add, subtract, multiply, and divide any pair of numbers as long as we are not dividing by $0$. Therefore everything holds just as well for the complex numbers and the rational numbers. On the other hand, we cannot subtract two natural numbers and guarantee the result is a natural number, and dividing two integers does not generally result in an integer, so everything falls apart for natural numbers and integers.

However, if we work with numbers modulo a prime $m$, then we can add, subtract, multiply, and divide (by any non-zero number modulo $m$). Recall that $x$ has an inverse mod $m$ if $\gcd(m,x)=1$, so if $m$ is prime, all the numbers $\{1,\dots,m-1\}$ have an inverse mod $m$.[^2] So both Property 1 and Property 2 hold if the coefficients and the variable $x$ are restricted to take on values modulo $m$. This remarkable fact — that these properties hold even when we restrict ourselves to a finite set of values — is the key to several applications.

**Example**: consider degree-$1$ polynomials modulo $5$. Let $p(x)=2x+3\pmod5$. The roots are all values $x$ such that $2x+3\equiv0\pmod5$. Solving, $2x\equiv-3\equiv2\pmod5$, so $x\equiv1\pmod5$. This is consistent with Property 1, since we got only one root of a degree-1 polynomial.

Now consider $p(x)=2x+3\pmod5$ and $q(x)=3x-2\pmod5$. Plotting the values of each polynomial as a function of $x$, there are only $5$ possible choices for $x$ and $5$ possible choices for $y$. These two "lines" intersect in exactly one point, $(0,3)$, even though the picture looks nothing like lines in the Euclidean plane.

*The original note includes a plot of the five points of $p(x)$ and the five points of $q(x)$ over $\mathrm{GF}(5)$, showing them intersecting only at $(0,3)$.*

When we work with numbers modulo a prime $m$, we say we are working over a **finite field**, denoted $\mathbb{F}_m$ or $\mathrm{GF}(m)$ (for "Galois Field"). For a set to be a field, it must satisfy certain axioms that are the building blocks allowing these properties, and others, to hold.

---

## 4. Counting

How many polynomials of degree (at most) $2$ are there modulo $m$? There are $3$ coefficients, each of which can take on one of $m$ values, for a total of $m^3$ polynomials. Writing $p(x)=a_dx^d+a_{d-1}x^{d-1}+\cdots+a_0$ by specifying its $d+1$ coefficients $a_i$ is known as the **coefficient representation** of $p(x)$.

Is there another way to specify $p(x)$? Yes: a polynomial of degree (at most) $2$ is uniquely specified by its values at any three points, say $x=0,1,2$. The polynomial can take any one of $m$ values at each of these three points, for a total of $m^3$ possibilities. In general, we can specify a degree-$d$ polynomial $p(x)$ by specifying its values at $d+1$ points (say $x=0,1,\dots,d$), for a total of $m^{d+1}$ possibilities. These $d+1$ values, $(y_0,y_1,\dots,y_d)$, are called the **value representation** of $p(x)$. The coefficient representation can be converted to the value representation by evaluating the polynomial at $0,1,\dots,d$, and Lagrange interpolation can be used to convert the value representation back to the coefficient representation.

So, given any three pairs $(x_1,y_1),(x_2,y_2),(x_3,y_3)$ with the $x_i$ distinct, there is a unique polynomial of degree $2$ such that $p(x_i)=y_i$. But suppose we were only given two pairs $(x_1,y_1),(x_2,y_2)$: how many distinct degree-2 polynomials go through these two points? There are exactly $m$ choices for $y_3$, and for each choice there is a unique polynomial of degree two going through the three points $(x_1,y_1),(x_2,y_2),(x_3,y_3)$. So there are exactly $m$ polynomials of degree at most $2$ through two points.

*The original note includes a diagram here illustrating the $m$ choices for $y_3$ at $x_3$, each yielding a distinct degree-2 polynomial through the two fixed points.*

What if we were given only one point $(x_1,y_1)$? There are $m^2$ choices for $y_2$ and $y_3$, yielding $m^2$ polynomials of degree at most $2$ through that one point. A pattern emerges:

| # of points | # of polynomials |
|---|---|
| $d+1$ | $1$ |
| $d$ | $m$ |
| $d-1$ | $m^2$ |
| $\vdots$ | $\vdots$ |
| $d-k$ | $m^{k+1}$ |
| $\vdots$ | $\vdots$ |
| $0$ | $m^{d+1}$ |

We can count the number of polynomials in this setting because we are working over a finite field. If we were working over an infinite field such as the reals, there would be infinitely many polynomials of degree $d$ through $d$ points. (Think of a line, degree $1$: given just one point, there are infinitely many possibilities for the second point, each of which uniquely defines a line.)

---

## 5. Secret Sharing

In the late 1950s and into the 1960s, during the Cold War, President Dwight D. Eisenhower approved instructions and authorized top commanding officers for the use of nuclear weapons under very serious emergency conditions, to allow a rapid response in case of a Soviet attack in which there was not enough time to confer with the President. This is a perfect situation for a **secret-sharing scheme**, ensuring that a certain number of officials must come together to successfully launch a nuclear strike, so that no single person has control over such a weapon.

Suppose a nuclear strike can be initiated only if at least $k>1$ major officials agree to it. We want a scheme such that:

1. Any group of $k$ of these officials can pool their information to figure out the launch code and initiate the strike.
2. No group of $k-1$ or fewer officials has any information about the launch code, even pooling their knowledge — for example, they should not learn whether the secret is odd or even, a prime number, divisible by some number $a$, or the secret's least significant bit.

Suppose there are $n$ officials indexed $1$ to $n$, and the launch code is some natural number $s$. Let $q$ be a prime larger than $n$ and $s$; we work over $\mathrm{GF}(q)$. Pick a random polynomial $P(x)$ of degree $k-1$ such that $P(0)=s$, and give $P(1)$ to the first official, $P(2)$ to the second, ..., $P(n)$ to the $n$-th. Then:

1. Any $k$ officials, having the values of the polynomial at $k$ points, can use Lagrange interpolation to find $P$, and then compute $P(0)=s$ to learn the secret. Equivalently, any $k$ officials have between them a value representation of the polynomial, which they can convert to the coefficient representation, allowing them to evaluate $P(0)=s$.
2. Any group of $k-1$ (or fewer) officials has no information about $s$. They know only $k-1$ points through which $P(x)$, an unknown polynomial of degree $k-1$, passes, and wish to reconstruct $P(0)=s$. But for each possible value $P(0)=b$, there is a unique polynomial of degree $k-1$ that passes through the $k-1$ points the officials have as well as through $(0,b)$. Hence the secret could be any of the $q$ possible values $\{0,1,\dots,q-1\}$, so the officials have — in a very precise sense — no information about $s$.[^3]

**Example**: suppose you set up a secret-sharing scheme with secret $s=1$, distributing $n=5$ shares to five people such that any $k=3$ or more people can figure out the secret, but two or fewer cannot. Working over $\mathrm{GF}(7)$ (note $7>s$ and $7>n$), you randomly choose the degree $k-1=2$ polynomial $P(x)=3x^2+5x+1$ (so $P(0)=1=s$). The shares handed out are $P(1)=2$, $P(2)=2$, $P(3)=1$, $P(4)=6$, and $P(5)=3$, to officials $1$ through $5$ respectively.

Suppose officials $3$, $4$, and $5$ get together. Using Lagrange interpolation, they compute the basis functions

$$
\begin{aligned}
\Delta_3(x) &= \frac{(x-4)(x-5)}{(3-4)(3-5)} = \frac{(x-4)(x-5)}{2} = 4(x-4)(x-5); \\
\Delta_4(x) &= \frac{(x-3)(x-5)}{(4-3)(4-5)} = \frac{(x-3)(x-5)}{-1} = 6(x-3)(x-5); \\
\Delta_5(x) &= \frac{(x-3)(x-4)}{(5-3)(5-4)} = \frac{(x-3)(x-4)}{2} = 4(x-3)(x-4).
\end{aligned}
$$

(All divisions above are interpreted as multiplication by the corresponding inverse mod $7$; e.g., division by $2$ in the first line is multiplication by $2^{-1}=4\pmod7$.) They then compute, over $\mathrm{GF}(7)$,

$$
P(x) = (1)\Delta_3(x)+(6)\Delta_4(x)+(3)\Delta_5(x) = 3x^2+5x+1.
$$

Finally, they compute $P(0)$ and discover the secret is $1$.

Now suppose two officials, say persons $1$ and $5$, try to get together. They both know that the polynomial looks like $P(x)=a_2x^2+a_1x+s$, and they know

$$
\begin{aligned}
P(1) &= a_2+a_1+s = 2 \\
P(5) &= 4a_2+5a_1+s = 3.
\end{aligned}
$$

But that is all they have — two equations with three unknowns — so they cannot find the secret, no matter which two officials get together. Since we are working over $\mathrm{GF}(7)$, the two people could have guessed the secret ($0\le s\le6$) and constructed a unique degree-2 polynomial (by Property 2), so two people combined have the same chance of guessing the secret as one person does. Two officials have no more information about the secret than one official.

[^1]: It is true that Property 1 still holds for polynomials with integer or natural-number coefficients with the domain restricted to integers or natural numbers, because we have proved something stronger by going to the rationals or reals: if a polynomial has no more than $d$ real roots, it certainly has no more than $d$ integer roots, since every integer is a real number. Property 2, however, does not hold at all if we restrict all the numbers involved to be integers — for example, the line through $(0,0)$ and $(2,1)$ does not have integer coefficients.
[^2]: It is also useful to consider what happens if $m$ is not prime. What happens to Property 1? Consider $m=8$ and the equation $x^3=0$. How many roots? $0$ is a root, but so are $2$, $4$, and $6$ — four distinct roots to a degree-3 polynomial. So Property 1 does not hold, and neither does Property 2.
[^3]: This is one major reason we choose to work over finite fields rather than, say, the real numbers, where the basic secret-sharing scheme would still work: because there are only finitely many values in our field, we can quantify precisely how many remaining possibilities there are for the value of the secret, and show that this is the same as if the officials had no information at all. Another major reason is to keep the computations exact using integer arithmetic in a bounded range, rather than floating-point operations over the reals that can suffer from numerical instability.
