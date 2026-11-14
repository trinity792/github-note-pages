---
title: L9 Secret Sharing & Error-Correcting Codes
Content Type: Lecture
Content Area:
Course: CS70
description: "The lecture reviewed Shamir secret sharing and showed how polynomial shares can assign different recovery power to contributors and moderators. It then developed Reed-Solomon codes for erasure and general errors, proved the required redundancy bounds used in the lecture, and derived the Berlekamp-Welch decoder from an error-locator polynomial and a system of linear equations."
pinned: false
Date Published: September 24, 2026
Last Updated: September 24, 2026
Status: Finalized
---

# L9 Secret Sharing & Error-Correcting Codes

## Executive Summary

The lecture began by reviewing polynomial secret sharing. A secret can be encoded in a polynomial, commonly as its constant coefficient, and distributed through evaluations of that polynomial. Because a degree-$d$ polynomial is uniquely determined by $d+1$ points, the number of shares assigned to each participant controls which coalitions can recover the secret. A worked example used one degree-$23$ polynomial to give 30 contributors one point each and six moderators six points each.

The second part introduced error-correcting codes. Simple repetition codes tolerate erasures but create prohibitively large encodings. Reed-Solomon codes instead represent an $n$-symbol message as evaluations of a degree-$(n-1)$ polynomial. Adding $k$ evaluations protects against $k$ erasures, while adding $2k$ evaluations permits recovery from $k$ general errors.

For general errors, the lecture first gave a brute-force decoder and then derived the Berlekamp-Welch decoder. Its central object is an error-locator polynomial $E(x)$ whose roots are the corrupted indices. Defining $Q(x)=P(x)E(x)$ converts the decoding problem into a system of $n+2k$ linear equations in $n+2k$ unknown coefficients. Once $Q$ and $E$ are found, the original code-word polynomial is recovered as $P=Q/E$.

---

## Polynomial Secret Sharing

Secret sharing divides access to a secret among several people. The motivating example was a joint vacation account belonging to five friends: the goal was to let any three friends recover the account secret, while preventing a smaller group from doing so.

To build such a scheme, choose a degree-$2$ polynomial and encode the secret $S$ as its constant coefficient:

$$
f(x)=a_2x^2+a_1x+S.
$$

Each friend receives a distinct point on this polynomial. Any three friends collectively hold three points, and three points uniquely determine a degree-$2$ polynomial. They can therefore reconstruct $f$ and recover $S$.

The secret does not fundamentally have to be the $y$-intercept. It could instead be another designated value of the polynomial. The constant coefficient is simply a convenient choice.

### Why Arithmetic Is Performed Modulo a Prime

The computations are performed modulo a prime $p$.

A finite modular system is useful on a computer because arithmetic wraps around and values remain bounded. Working modulo a prime is also essential because it gives the field structure needed for polynomial algebra, including multiplicative inverses and cancellation.

The lecture contrasted this with arithmetic modulo $6$. Consider

$$
(x-1)(x-2)=0 \pmod 6.
$$

The obvious roots are $x=1$ and $x=2$, but $x=4$ is also a root:

$$
(4-1)(4-2)=3\cdot 2=6\equiv 0 \pmod 6.
$$

Thus a degree-$2$ polynomial can have more than two roots in this setting. The usual root bound fails because, modulo $6$,

$$
2\cdot 3\equiv 0 \pmod 6
$$

even though neither factor is zero. In a field, by contrast,

$$
ab=0 \implies a=0\ \text{or}\ b=0.
$$

This property supports the usual factorization and root arguments for polynomials.

The prime must also be large enough for the scheme:

- The lecture required $p$ to be at least as large as the secret so that reducing modulo $p$ does not discard information about it.
- It also required enough distinct field elements to assign the necessary evaluation points to participants.

### Giving Different Groups Different Recovery Power

The more elaborate example involved:

- 30 contributors,
- six moderators,
- a recovery threshold of 24 contributor shares, and
- a recovery threshold of four moderators.

Start with a degree-$23$ polynomial

$$
f(x)=a_{23}x^{23}+\cdots+a_1x+a_0,
$$

where

$$
a_0=S.
$$

A degree-$23$ polynomial requires $24$ distinct points for reconstruction.

Give every contributor one distinct point. Then any 24 contributors collectively possess 24 points and can reconstruct $f$.

Give every moderator six distinct points. Then four moderators collectively possess

$$
4\cdot 6=24
$$

points and can also reconstruct $f$.

This weighting permits mixed coalitions as well. For example, three moderators and six contributors possess

$$
3\cdot 6+6=24
$$

distinct points, which is enough to reconstruct the degree-$23$ polynomial.

### Assigning the Evaluation Points

The 30 contributors can receive

$$
(1,f(1)),(2,f(2)),\ldots,(30,f(30)).
$$

The first moderator can receive the six fresh points

$$
(31,f(31)),(32,f(32)),\ldots,(36,f(36)).
$$

The remaining moderators receive additional fresh groups of six points, continuing through the sixth moderator. Every assigned point should be distinct. The lecture stated that the prime must be at least $66$, corresponding to the 30 contributor points and 36 moderator points.

Distinctness matters when groups combine their shares. If moderators and contributors held overlapping evaluations, then a coalition’s nominal number of shares might exceed its number of distinct points. Such a coalition could fail to reach the 24 distinct points required for interpolation.

### Limits of the Single-Polynomial Access Structure

Because all shares belong to the same polynomial, coalitions other than the two headline thresholds may also reconstruct the secret. For example, two moderators and 12 contributors collectively hold

$$
2\cdot 6+12=24
$$

points.

If such mixed coalitions must be prevented, the lecture suggested using different polynomials for different groups. A moderator polynomial and a contributor polynomial could share the same secret at their $y$-intercepts while otherwise being separate.

### Why Not Split the Digits of the Secret?

Simply dividing a secret into substrings reduces the amount that an attacker must guess.

For example, suppose the secret is a six-digit value such as

$$
147592.
$$

Splitting it into two three-digit pieces changes a search over approximately $10^6$ possibilities into searches over approximately $10^3$ possibilities for each piece. Each partial share exposes information about the original secret. Polynomial sharing is designed so that merely receiving some of the shares does not amount to receiving corresponding digits of the secret.

---

## Two Fundamental Polynomial Properties

The remainder of the lecture relied repeatedly on two facts about polynomials over a field.

### Property 1: Interpolation and Uniqueness

A degree-$d$ polynomial is uniquely determined by $d+1$ points.

Examples include:

- Two points determine a line.
- Three points determine a degree-$2$ polynomial.
- A degree-$100$ polynomial requires 101 points.

The previous lecture established existence using Lagrange interpolation and uniqueness by showing that two degree-$d$ polynomials cannot agree on $d+1$ distinct points unless they are the same polynomial.

Equivalently, if degree-$d$ polynomials $P$ and $Q$ satisfy

$$
P(x_i)=Q(x_i)
$$

at $d+1$ distinct values $x_i$, then

$$
P=Q.
$$

This says that polynomials have limited degrees of freedom: two of them cannot agree at too many inputs without agreeing everywhere.

### Property 2: The Root Bound

A nonzero degree-$d$ polynomial has at most $d$ roots.

The factorization

$$
x^2-11x+30=(x-5)(x-6)
$$

makes the roots $5$ and $6$ immediately visible. The reasoning uses the field property

$$
ab=0\implies a=0\ \text{or}\ b=0.
$$

Without a field, as in arithmetic modulo $6$, this reasoning can fail.

These interpolation, uniqueness, and root properties provide the mathematical structure behind both secret sharing and Reed-Solomon coding.

---

## Error-Correcting Codes and Erasure Errors

Suppose the message consists of the three symbols

$$
3,\ 0,\ 5.
$$

An erasure error means that one transmitted symbol disappears. The receiver knows which indexed position is absent. The indices therefore distinguish an omitted symbol from a shorter message.

The goal is not merely to detect that something is missing. The encoding should let the receiver recover the entire message without requesting a retransmission.

### Repetition Codes

The simplest solution is a repetition code. Repeat the entire message enough times that at least one copy of every symbol remains.

To tolerate $k$ erasures, repeat the data $k+1$ times. Repeating only $k$ times is insufficient because all $k$ erasures could target the same indexed symbol across the repetitions.

If the original message contains $n$ symbols, this produces a code word of length

$$
n(k+1).
$$

### The Cost of Repetition

The lecture considered:

- one byte per symbol,
- a 3-megabyte message, treated as about $3$ million bytes, and
- enough protection for errors affecting one third of the data.

Thus,

$$
n=3\cdot 10^6,
\qquad
k=\frac{n}{3}.
$$

A repetition code has size

$$
n(k+1).
$$

Substituting the example values gives approximately

$$
3\cdot 10^{12}\text{ bytes},
$$

or about 3 terabytes. The encoding turns a small photograph into an amount of data comparable to a large hard drive.

---

## Reed-Solomon Codes for Erasures

Reed-Solomon coding uses polynomial structure instead of repeating all of the data.

Interpret the message $3,0,5$ as three indexed points:

$$
(0,3),\qquad (1,0),\qquad (2,5).
$$

These three points uniquely determine a degree-$2$ polynomial $P(x)$. The original symbols are therefore

$$
P(0)=3,\qquad P(1)=0,\qquad P(2)=5.
$$

To add redundancy, evaluate the same polynomial at additional inputs:

$$
P(3),P(4),\ldots
$$

If one evaluation is erased, any three remaining evaluations still determine the degree-$2$ polynomial. Once $P$ is reconstructed, the receiver evaluates $P(0)$, $P(1)$, and $P(2)$ to recover the original message.

### Recovering a Polynomial with Linear Equations

Lagrange interpolation is one way to reconstruct $P$, but the lecture presented another method. Write

$$
P(x)=a_2x^2+a_1x+a_0.
$$

The three message points impose the equations

$$
P(0)=3,
$$

$$
P(1)=0,
$$

$$
P(2)=5.
$$

Expanding them yields a system of three linear equations in the three unknown coefficients $a_2,a_1,a_0$. Although $P$ is quadratic in $x$, the unknown coefficients occur only linearly because the inputs $0,1,2$ are fixed constants.

Solving the system modulo $7$ gives

$$
a_2=4,\qquad a_1=0,\qquad a_0=3.
$$

Therefore,

$$
P(x)=4x^2+3\pmod 7.
$$

For example,

$$
P(3)=4\cdot 3^2+3=39\equiv 4\pmod 7.
$$

These additional evaluations extend the code word without changing the polynomial that represents the message.

### Correcting Multiple Erasures

If the original message has $n$ symbols, interpolate it with a degree-$(n-1)$ polynomial. Transmit

$$
n+k
$$

distinct evaluations of that polynomial.

If any $k$ evaluations are erased, then $n$ evaluations remain. Those $n$ points uniquely determine the degree-$(n-1)$ polynomial, so the original message can be recovered.

Thus an $n$-symbol message protected against $k$ erasures needs a code word of length

$$
n+k,
$$

rather than the repetition-code length

$$
n(k+1).
$$

### Comparing the Sizes

Using the same 3-megabyte message and taking

$$
k=\frac{n}{3},
$$

the Reed-Solomon code word has size

$$
n+k
=
3\cdot 10^6+\frac{3\cdot 10^6}{3}
=
4\cdot 10^6\text{ bytes}.
$$

The encoded result is about 4 megabytes, rather than approximately 3 terabytes.

The field must contain enough distinct inputs for all required evaluations. With modulus $7$, only seven distinct field elements are available. Extending beyond those inputs would repeat evaluation locations and create unwanted redundancy, so a larger prime would be required. Changing the modulus also changes the resulting evaluation values.

### Polynomials as Structured Data

The lecture described a polynomial as a data structure with built-in redundancy. A list of evaluations resembles an array, but those entries are constrained to lie on one low-degree polynomial. Because the polynomial has only a limited number of degrees of freedom, any sufficiently large subset of its evaluations determines all the others.

---

## Reed-Solomon Codes for General Errors

An erasure identifies a missing position. A general error is harder: a transmitted value is replaced by an incorrect value, and the receiver does not know which positions were corrupted.

For a degree-$2$ code word, three correct points would be enough to reconstruct the polynomial if the receiver knew which three they were. With general errors, corrupted points remain present as impostors among the correct points.

Applications mentioned in the lecture included:

- deep-space communication,
- compact discs and DVDs whose data may be scratched or smudged, and
- QR codes that remain readable despite portions being covered or altered.

### Building Intuition with a Line

Let $n=2$, so the message polynomial is a line, and let $k=1$, so there may be one error.

Two points determine a line, but among three received points there can be ambiguity: each pair might suggest a different candidate line. With four received points, however, one error leaves three correct points on the original line.

If a candidate line passes through three points and there is at most one error, then at least two of those three points are correct. Two correct points uniquely determine the original line, so the candidate must be that line. This motivates a code word length of

$$
n+2k=2+2=4.
$$

### Building Intuition with a Parabola

Now let $n=3$, so the message polynomial is a parabola, and let $k=2$.

Seven received points are enough:

$$
n+2k=3+4=7.
$$

After at most two corruptions, five correct points remain. Suppose a candidate parabola passes through five received points. Even if two of those five are corrupted, at least three are correct. Three correct points uniquely determine the original parabola. The candidate must therefore be the original parabola.

This explains the appearance of

$$
n+2k.
$$

One group of $k$ extra evaluations accounts for the possibly corrupted received positions, and the argument uses another group of $k$ to guarantee enough agreement to establish uniqueness.

---

## Why \(n+2k\) Symbols Correct \(k\) General Errors

Start with an $n$-symbol message represented by a degree-$(n-1)$ polynomial $P$. Transmit

$$
n+2k=n+k+k
$$

evaluations, and suppose at most $k$ received values are corrupted.

### Existence of a Polynomial Through \(n+k\) Received Points

Since at most $k$ of the $n+2k$ positions are corrupted, at least

$$
(n+2k)-k=n+k
$$

received points are uncorrupted.

All uncorrupted points lie on $P$. Therefore, the degree-$(n-1)$ polynomial $P$ passes through at least $n+k$ of the received points.

### Uniqueness of That Polynomial

Suppose another polynomial $Q$ has degree at most $n-1$ and passes through $n+k$ received points.

At most $k$ of those points can be corrupted. Consequently, at least

$$
(n+k)-k=n
$$

of them are uncorrupted points from $P$.

Thus $P$ and $Q$ agree at $n$ distinct inputs. Both have degree at most $n-1$, and $n$ points uniquely determine a degree-$(n-1)$ polynomial. Therefore,

$$
Q=P.
$$

It follows that any degree-at-most-$(n-1)$ polynomial passing through $n+k$ received points must be the original code-word polynomial.

---

## A Brute-Force Decoder

The uniqueness argument immediately gives a decoding algorithm:

1. Guess which $k$ received positions contain errors.
2. Interpolate the remaining $n+k$ received points to obtain a candidate polynomial $Q$.
3. If $Q$ has degree at most $n-1$, then the uniqueness argument implies that $Q=P$.
4. Otherwise, return to the first step and guess another set of error positions.

This decoder is correct, but it is computationally impractical. Among $n+2k$ positions, the number of possible choices for the $k$ error positions is

$$
\binom{n+2k}{k}.
$$

The lecture approximated this by

$$
(n+2k)^k.
$$

If $k$ is a constant fraction of $n$, such as $k=n/3$, the resulting search is on the order of

$$
n^n.
$$

The decoder therefore needs a way to locate errors without testing every possible error set.

---

## The Berlekamp-Welch Decoder

The Berlekamp-Welch decoder efficiently recovers the original polynomial from a Reed-Solomon code word with up to $k$ general errors. The lecture stated that it also identifies the error locations and reveals when the received word is too corrupted to recover.

Let:

- $P(x)$ be the original degree-$(n-1)$ message polynomial,
- $R_x$ be the received value at index $x$, and
- $E(x)$ be a degree-$k$ polynomial to be constructed.

### Translating Correctness into Algebra

The received value at index $x$ is uncorrupted exactly when

$$
P(x)=R_x.
$$

Equivalently,

$$
P(x)-R_x=0.
$$

The lecture then considered the statement:

> The received value at $x$ was uncorrupted, or an error occurred at index $x$.

The field property

$$
AB=0\iff A=0\ \text{or}\ B=0
$$

allows this logical “or” to be represented by a product:

$$
\bigl(P(x)-R_x\bigr)E(x)=0.
$$

If $P(x)\ne R_x$, then the first factor is nonzero, so the second factor must be zero:

$$
E(x)=0.
$$

Therefore, every corrupted index is a root of $E$.

### The Error-Locator Polynomial

If the error locations are

$$
e_1,e_2,\ldots,e_k,
$$

then the degree-$k$ error-locator polynomial has the form

$$
E(x)=(x-e_1)(x-e_2)\cdots(x-e_k).
$$

Its roots identify exactly where the errors occurred. Written by coefficients, it has the monic form

$$
E(x)=x^k+e_{k-1}x^{k-1}+\cdots+e_1x+e_0.
$$

The leading coefficient is known to be $1$, so only the remaining $k$ coefficients are unknown.

### Introducing \(Q(x)\)

Expanding the central equation gives

$$
P(x)E(x)=R_xE(x).
$$

Define

$$
Q(x)=P(x)E(x).
$$

Since

$$
\deg P=n-1
$$

and

$$
\deg E=k,
$$

the degree of $Q$ is at most

$$
n+k-1.
$$

Therefore, $Q$ can be written as

$$
Q(x)=q_{n+k-1}x^{n+k-1}+\cdots+q_1x+q_0.
$$

This introduces $n+k$ unknown coefficients.

Together, the unknowns are:

- $n+k$ coefficients of $Q$, and
- $k$ non-leading coefficients of the monic polynomial $E$.

The total number of unknowns is therefore

$$
(n+k)+k=n+2k.
$$

### Constructing the Linear System

For every received index $x$, impose

$$
Q(x)=R_xE(x).
$$

The receiver knows each index $x$ and each received value $R_x$. Substituting them into the coefficient forms of $Q$ and $E$ produces one linear equation in the unknown coefficients.

Because the code word contains $n+2k$ received positions, this gives

$$
n+2k
$$

linear equations in

$$
n+2k
$$

unknowns.

The decoder solves this system to determine $Q$ and $E$. It then recovers the original polynomial using

$$
P(x)=\frac{Q(x)}{E(x)}.
$$

Finally, the original message is obtained from the designated evaluations of $P$.

The roots of $E$ reveal the corrupted indices. If the received word is too corrupted, the lecture stated that the resulting system is underdetermined, so the decoder can recognize that recovery is not possible.