---
title: L7 RSA
Content Type: Lecture
Content Area:
Course: CS70
description: "The lecture reviewed the Chinese remainder theorem, Fermat's little theorem, and exponent reduction in modular arithmetic before applying them to RSA. It developed public-key encryption, derived the RSA decryption exponent and correctness argument, discussed computational hardness, and concluded with surprising digit patterns under elementary arithmetic."
pinned: false
Date Published: September 17, 2026
Last Updated: September 17, 2026
Status: Finalized
---

# L7 RSA

## Executive Summary

The lecture began by reconstructing the Chinese remainder theorem through a three-congruence example. Its algebraic terms act like "radio buttons": reducing modulo one chosen modulus eliminates every term except the one designed for that modulus.

The warm-up then used Fermat's little theorem to simplify large powers. This led to the distinction between the modulus on the "ground floor" and the modulus in "exponent land": modulo a prime $p$, exponents cycle modulo $p-1$. Using this idea, the lecture solved an equation such as $x^7\equiv 3\pmod{11}$ by finding the multiplicative inverse of $7$ modulo $10$.

The second half introduced symmetric-key and public-key cryptography. RSA publishes a product $N=pq$ and an encryption exponent $e$, while retaining the factors $p,q$ and a corresponding decryption exponent $d$. The lecture derived $d$, explained why decryption recovers the message, and connected RSA's implementation to the extended Euclidean algorithm, repeated squaring, Fermat's little theorem, and the Chinese remainder theorem.

The lecture concluded by contrasting easy multiplication with apparently hard factorization and by displaying cyclic digit patterns in the number $142857$.

---

## Chinese Remainder Theorem as Algebraic Selection

Consider the system

$$
x\equiv 4\pmod 7,\qquad
x\equiv 3\pmod 5,\qquad
x\equiv 1\pmod 3.
$$

The goal is to construct one expression that becomes $4$ modulo $7$, $3$ modulo $5$, and $1$ modulo $3$.

The motivating analogy was a set of radio buttons: selecting one button causes all the others to pop out. Algebraically, each summand should survive reduction modulo its intended modulus while disappearing modulo the other two.

For example, when reducing modulo $5$, multiplying the other summands by $5$ makes them vanish because

$$
5\equiv 0\pmod 5.
$$

Simply multiplying the desired $4$ term by the other moduli is not enough, however. A factor such as $5$ changes the term modulo $7$. The correction is to multiply by the corresponding modular inverse.

The notation $a_n^{-1}$ was introduced as shorthand for the inverse of $a$ modulo $n$.

### Constructing the three selector terms

Let

$$
N=7\cdot 5\cdot 3=105.
$$

The constructed solution is

$$
x=
4\left(\frac{N}{7}\right)\left(\frac{N}{7}\right)^{-1}_{7}
+
3\left(\frac{N}{5}\right)\left(\frac{N}{5}\right)^{-1}_{5}
+
1\left(\frac{N}{3}\right)\left(\frac{N}{3}\right)^{-1}_{3}.
$$

Written with the actual factors, this is

$$
x=
4(15)(15^{-1}\bmod 7)
+
3(21)(21^{-1}\bmod 5)
+
1(35)(35^{-1}\bmod 3).
$$

Each term contains all the moduli except the modulus for which that term is meant to survive.

Modulo $7$:

- The second term vanishes because it contains a factor of $7$.
- The third term also vanishes because it contains a factor of $7$.
- The first term contains $15$ rather than $7$. Its inverse factor makes
  $15(15^{-1})\equiv 1\pmod 7$, leaving $4$.

Modulo $5$, the first and third terms vanish, while the second becomes

$$
3\cdot 21\cdot 21^{-1}\equiv 3\pmod 5.
$$

Modulo $3$, the first and second terms vanish, while the third becomes

$$
1\cdot 35\cdot 35^{-1}\equiv 1\pmod 3.
$$

This is the general structure behind the theorem's summation formula: multiply each desired residue by the product of all moduli except its own, then multiply by the inverse that normalizes this product to $1$ under the selected modulus.

### Computing the numerical solution

The required inverses are particularly simple:

$$
15\equiv 1\pmod 7,
$$

so

$$
15^{-1}\equiv 1\pmod 7.
$$

Similarly,

$$
21\equiv 1\pmod 5,
$$

so

$$
21^{-1}\equiv 1\pmod 5.
$$

Finally,

$$
35\equiv 2\pmod 3.
$$

The inverse of $2$ modulo $3$ is $2$, since

$$
2\cdot 2=4\equiv 1\pmod 3.
$$

Thus,

$$
x=4(15)(1)+3(21)(1)+1(35)(2)=193.
$$

The Chinese remainder theorem guarantees a unique solution modulo

$$
N=105.
$$

Reducing $193$ modulo $105$ gives

$$
193\equiv 88\pmod{105}.
$$

Therefore the complete family of integer solutions is

$$
x=88+105k
$$

for an integer $k$. The number $88$ is the smallest positive solution, and direct reduction confirms

$$
88\equiv 4\pmod 7,\qquad
88\equiv 3\pmod 5,\qquad
88\equiv 1\pmod 3.
$$

Adding $105$ preserves all three congruences because $105$ is divisible by $7$, $5$, and $3$.

---

## Fermat's Little Theorem and Large Powers

The lecture used Fermat's little theorem in the form

$$
x^{p-1}\equiv 1\pmod p,
$$

where $p$ is prime and $x$ is not congruent to $0$ modulo $p$. The coprimality requirement was emphasized during the examples.

This theorem identifies a cycle in the exponent: modulo $p$, a block of $p-1$ powers can collapse to $1$.

### Computing $4^{48}\pmod 7$

Because

$$
48=6\cdot 8
$$

and

$$
6=7-1,
$$

we can write

$$
4^{48}=(4^6)^8.
$$

Fermat's little theorem gives

$$
4^6\equiv 1\pmod 7.
$$

Therefore,

$$
4^{48}\equiv 1^8\equiv 1\pmod 7.
$$

The exponent can equivalently be grouped as $(4^8)^6$ because any nonzero base raised to the sixth power is $1$ modulo $7$.

### Computing $6^{80}\pmod{11}$

Since

$$
80=8\cdot 10
$$

and

$$
10=11-1,
$$

we have

$$
6^{80}=(6^8)^{10}.
$$

The number $6^8$ is not divisible by $11$, so Fermat's little theorem applies:

$$
(6^8)^{10}\equiv 1\pmod{11}.
$$

Thus,

$$
6^{80}\equiv 1\pmod{11}.
$$

### A corrected composite-modulus example

The intended warm-up asked for

$$
2^{60}\pmod{77},
$$

where

$$
77=7\cdot 11
$$

and

$$
60=(7-1)(11-1)=6\cdot 10.
$$

The base was initially spoken and written as $22$, but this was corrected to $2$. That correction is essential: $22\equiv 0\pmod{11}$, so Fermat's little theorem would not show $22^{60}\equiv 1\pmod{11}$.

Let

$$
x=2^{60}.
$$

Modulo $7$,

$$
2^{60}=(2^6)^{10}\equiv 1^{10}\equiv 1\pmod 7.
$$

Modulo $11$,

$$
2^{60}=(2^{10})^6\equiv 1^6\equiv 1\pmod{11}.
$$

Therefore,

$$
x\equiv 1\pmod 7,\qquad x\equiv 1\pmod{11}.
$$

The Chinese remainder theorem gives a unique answer modulo $77$. Because $x=1$ visibly satisfies both congruences, no elaborate selector construction is needed:

$$
2^{60}\equiv 1\pmod{77}.
$$

The example illustrates that a composite modulus can sometimes be handled by splitting it into prime moduli, using Fermat's little theorem separately, and recombining the results through the Chinese remainder theorem.

---

## Exponent Arithmetic

When computations occur modulo a prime $p$, Fermat's little theorem creates a second modular system in the exponent.

The lecture described these as two levels:

- On the ground floor, values are reduced modulo $p$.
- In exponent land, exponents are reduced modulo $p-1$.

Formally, the lecture summarized the relationship as

$$
x^a\equiv x^{\,a\bmod (p-1)}\pmod p,
$$

under the nonzero-base assumption needed for Fermat's little theorem.

### Simplifying exponents modulo $11$

When the ground-floor modulus is $11$, exponent cycles have length

$$
11-1=10.
$$

For example,

$$
x^{24}=x^{2\cdot 10+4}=(x^{10})^2x^4.
$$

Since $x^{10}\equiv 1\pmod{11}$,

$$
x^{24}\equiv x^4\pmod{11}.
$$

Similarly,

$$
32=3\cdot 10+2,
$$

so

$$
x^{32}\equiv x^2\pmod{11}.
$$

Finally,

$$
96=9\cdot 10+6,
$$

so

$$
x^{96}\equiv x^6\pmod{11}.
$$

The visible modulus remains $11$, but the exponent is reduced modulo $10$.

### Solving $x^7\equiv 3\pmod{11}$

Ordinary arithmetic suggests raising both sides to the power $1/7$, but that is not the useful notion of inverse in this modular setting. Instead, the task is to find an exponent $d$ for which

$$
7d\equiv 1\pmod{10}.
$$

The modulus is $10$ because the original ground-floor modulus is $11$.

The multiplicative inverse of $7$ modulo $10$ is $3$:

$$
7\cdot 3=21\equiv 1\pmod{10}.
$$

Raise both sides of

$$
x^7\equiv 3\pmod{11}
$$

to the third power:

$$
x^{21}\equiv 3^3\equiv 27\pmod{11}.
$$

Since

$$
21\equiv 1\pmod{10},
$$

the exponent reduces to $1$:

$$
x^{21}\equiv x\pmod{11}.
$$

Also,

$$
27\equiv 5\pmod{11}.
$$

Therefore,

$$
x\equiv 5\pmod{11}.
$$

The exponent $3$ serves the same operational role that a reciprocal would serve in another number system: it is the multiplicative inverse of $7$, but specifically in arithmetic modulo $10$.

---

## Cryptographic Motivation

The lecture marked a transition from axiomatic mathematical truth to real-world application. In cryptography, it is not enough to establish algebraic correctness. One must also argue that a construction is useful and computationally secure.

A paper titled *The Moral Character of Cryptographic Work* by Phil Rogaway was mentioned as a discussion of cryptography's broader moral dimension.

### Symmetric-key cryptography

Suppose Alice wants to send a message $x$ to Bob while Eve can observe the communication.

In symmetric-key cryptography, Alice and Bob share a secret key $s$. Alice sends an encryption

$$
y=E(x,s),
$$

and Bob applies a decryption algorithm to recover the message:

$$
D(y,s)=x.
$$

The desired properties are:

- Encryption and decryption should be easy when the secret is known.
- Recovering $x$ from $y$ should be hard without the secret.

The physical analogy is a lockbox for which Alice and Bob possess the same key.

Two difficulties were highlighted. First, Alice and Bob must somehow share the secret key securely. If they cannot already communicate securely, distributing that key is itself a problem. Second, one must justify the claim that the encryption is actually hard to break.

Schneier's Law was paraphrased as the observation that a mathematician can create a cryptosystem so convoluted that even its creator cannot break it. That is not sufficient evidence of security: historically, apparently clever cryptosystems have repeatedly been broken.

### Public-key cryptography

Public-key cryptography removes the requirement that Alice and Bob begin with the same secret.

Bob creates a pair consisting of:

- A public key, distributed to Alice and the rest of the world.
- A secret key, retained only by Bob.

Alice encrypts a message using Bob's public key. Anyone may perform this encryption, but only Bob should be able to decrypt the resulting ciphertext with his secret key.

The physical analogy is a padlock. Bob publishes enough information for anyone to reproduce and close the padlock, but only Bob possesses the key that opens it. Anyone can place a message in a box, lock it, and send it to Bob.

---

## Factoring as a Source of Computational Hardness

The lecture contrasted two computational tasks:

- Multiplying two known numbers is handled by a familiar grade-school algorithm.
- Factoring their product appears much harder.

The concrete example was

$$
37\cdot 29=1073.
$$

Multiplying $37$ and $29$ is routine, but beginning with $1073$ and recovering those factors requires a less direct search.

For a $600$-bit number, there are

$$
2^{600}
$$

possible $600$-bit strings. Even a brute-force search only up to the square root represents an enormous amount of work.

The lecture carefully characterized factoring as hard "as far as we know." It also noted that Shor's algorithm is a fast quantum factoring algorithm. A sufficiently capable quantum computer would therefore break the RSA system developed in the lecture, although such a computer was said not to be presently available for the relevant input sizes. This motivates work on post-quantum cryptography.

---

## RSA Key Generation and Encryption

RSA begins with two primes $p$ and $q$. Bob computes

$$
N=pq.
$$

The factors $p$ and $q$ are kept secret, while $N$ is published. The lecture's security motivation is that multiplying $p$ and $q$ is easy, whereas recovering them by factoring $N$ is believed to be hard without a sufficiently capable quantum computer.

Bob also publishes an encryption exponent $e$. Thus the public key contains $N$ and $e$.

The exponent must satisfy

$$
\gcd\bigl(e,(p-1)(q-1)\bigr)=1.
$$

This coprimality condition ensures that $e$ has a multiplicative inverse modulo $(p-1)(q-1)$.

### Encryption

If Alice's message is $x$, she computes

$$
y=x^e\bmod N.
$$

Both $e$ and $N$ are public, so anyone can form a ciphertext intended for Bob.

### Decryption exponent

Bob computes

$$
d=e^{-1}\bmod (p-1)(q-1).
$$

Equivalently,

$$
ed\equiv 1\pmod{(p-1)(q-1)}.
$$

The intended effect is that raising the ciphertext to $d$ multiplies the original exponent by $d$:

$$
y^d=(x^e)^d=x^{ed}.
$$

Because $ed$ is congruent to $1$ in exponent land, this should reduce to $x$ modulo $N$.

Bob decrypts by computing

$$
x=y^d\bmod N.
$$

---

## Why RSA Decryption Works

The correctness argument combines exponent arithmetic, Fermat's little theorem, and the Chinese remainder theorem.

Because

$$
ed\equiv 1\pmod{(p-1)(q-1)},
$$

there is an integer $k$ such that

$$
ed=k(p-1)(q-1)+1.
$$

Starting from the ciphertext $y=x^e$, decryption gives

$$
y^d=(x^e)^d=x^{ed}
=x^{k(p-1)(q-1)+1}.
$$

The large exponent is designed to disappear separately modulo $p$ and modulo $q$.

### Reduction modulo $p$

Rearrange the expression as

$$
x^{ed}
=
\left(x^{p-1}\right)^{k(q-1)}x.
$$

By Fermat's little theorem, under the lecture's stated assumption that $x$ is coprime with $p$ and $q$,

$$
x^{p-1}\equiv 1\pmod p.
$$

Therefore,

$$
y^d\equiv 1^{k(q-1)}x\equiv x\pmod p.
$$

### Reduction modulo $q$

Similarly,

$$
x^{ed}
=
\left(x^{q-1}\right)^{k(p-1)}x.
$$

Fermat's little theorem gives

$$
x^{q-1}\equiv 1\pmod q,
$$

so

$$
y^d\equiv x\pmod q.
$$

Thus the decrypted value satisfies both

$$
y^d\equiv x\pmod p
$$

and

$$
y^d\equiv x\pmod q.
$$

By the Chinese remainder theorem, these two congruences combine into

$$
y^d\equiv x\pmod{pq}.
$$

Since $N=pq$,

$$
y^d\equiv x\pmod N.
$$

This establishes the stated correctness of RSA decryption.

The board derivation initially named the combined modulus incorrectly as $(p-1)(q-1)$ at one point. It was corrected during the lecture: the Chinese remainder theorem combines congruences modulo $p$ and $q$ into a congruence modulo

$$
pq=N.
$$

---

## RSA's Computational Building Blocks

The lecture connected RSA to earlier algorithms and theorems:

- The extended Euclidean algorithm finds multiplicative inverses, including the decryption exponent $d$.
- Repeated squaring computes large modular powers efficiently.
- Fermat's little theorem explains the exponent cycles modulo each prime.
- The Chinese remainder theorem combines the separate conclusions modulo $p$ and modulo $q$.

The easy prime-modulus inversion problem has the form: given

$$
x^e\pmod p,
$$

recover $x$. When $p$ is known and prime, one can compute

$$
d=e^{-1}\pmod{p-1}
$$

and raise both sides to $d$.

The RSA problem instead supplies $N=pq$ without revealing $p$ and $q$. The lecture stated that the known way to obtain the needed structure is to factor $N$, and that this game is believed to be hard classically. RSA's security discussion therefore rests on a computational hardness claim rather than only on an algebraic identity.

---

## Arithmetic Patterns in $142857$

The lecture concluded by illustrating that even elementary addition and multiplication can contain surprising structure.

Begin with

$$
142857.
$$

Multiplication by several small integers rotates its digits:

$$
142857\cdot 2=285714,
$$

$$
142857\cdot 3=428571,
$$

$$
142857\cdot 4=571428,
$$

and

$$
142857\cdot 5=714285.
$$

Multiplication by $7$ gives a different striking pattern:

$$
142857\cdot 7=999999.
$$

The digits also exhibit patterns under addition. Splitting the number into two three-digit pieces gives

$$
142+857=999.
$$

Splitting it into three two-digit pieces gives

$$
14+28+57=99.
$$

These examples supported the closing motivation for modular arithmetic, abstract algebra, and group theory: familiar numbers and operations can continue to display unexpected structure even after their routine computational rules are well known.
#academic/year-3/cs70/lecture-notes