---
title: L5 Modular Arithmetic
Content Type: Lecture
Content Area:
Course: CS70
description: "The lecture develops modular arithmetic as arithmetic on a circle, formalizes congruence through remainders and divisibility, and explains congruence classes and substitution in modular calculations. It applies these ideas to divisibility tests, efficient modular exponentiation by repeated squaring, and additive and multiplicative inverses."
pinned: false
Date Published: September 10, 2026
Last Updated: September 10, 2026
Status: Finalized
---

# L5 Modular Arithmetic

## Executive Summary

The lecture begins with weekday calculations to motivate reducing numbers by multiples of a fixed modulus. This turns the ordinary number line into a circular system in which numbers with the same remainder occupy the same position.

It then introduces three equivalent descriptions of modular congruence, congruence classes, and rules for replacing congruent values inside addition and multiplication. These rules explain familiar divisibility tests for $9$ and $11$ and simplify computations involving large products and powers.

The lecture concludes with repeated squaring as an efficient method for modular exponentiation, followed by additive and multiplicative inverses. Multiplicative inverses provide the modular analogue of division, but the examples show that they do not always exist.

---

## Weekdays as Arithmetic Modulo Seven

Suppose today is Thursday and a friend wants to meet in $37$ days. Every block of seven days returns to Thursday, so decompose $37$ into complete weeks and a remainder:

$$
37=7\cdot 5+2.
$$

The five complete weeks do not change the weekday. The remaining two days move from Thursday to Friday and then Saturday. Thus, $37$ days after Thursday is Saturday.

The same reasoning applies to $50$ days:

$$
50=7\cdot 7+1.
$$

After seven complete weeks, one additional day moves Thursday to Friday.

If the original meeting in $37$ days is postponed by another five days, then

$$
37+5=42=7\cdot 6.
$$

Because $42$ is a multiple of $7$, it behaves like zero when only the weekday matters. The meeting therefore returns to Thursday. The informal statement that “$37+5$ equals zero” is not ordinary equality; it refers to equality after wrapping around in arithmetic modulo $7$.

---

## Arithmetic on a Circle

On an ordinary number line, the integers continue indefinitely. Modulo $7$, however, the sequence

$$
0,1,2,3,4,5,6
$$

repeats. After $6$, the next integer, $7$, occupies the same modular position as $0$. Then $8$ occupies the same position as $1$, and so forth.

A circle is therefore a more useful picture than a line. Place $0,1,\ldots,6$ around the circle. Moving forward performs addition, and passing $6$ wraps back to $0$. This is why modular arithmetic is also described as clock arithmetic.

### Addition modulo seven

Ordinarily,

$$
2+6=8.
$$

On the modulo-$7$ circle, moving six positions forward from $2$ lands at $1$. The modular statement is

$$
2+6\equiv 1\pmod 7.
$$

Many integers occupy that same position:

$$
1\equiv 8\equiv 15\equiv -6\equiv 22\pmod 7.
$$

Each differs from the others by a multiple of $7$.

### Multiplication modulo seven

For multiplication,

$$
4\cdot 5=20.
$$

Since

$$
20=7\cdot 2+6,
$$

the modular result is

$$
4\cdot 5\equiv 6\pmod 7.
$$

The product wraps around the modulo-$7$ circle twice and stops at $6$.

### Locating integers on the circle

The lecture also asks where $79$ lands modulo $7$. Its location is determined by removing complete multiples of $7$. Similarly, the earlier computation shows that $20$ lands at $6$. The recurring positions illustrate that the integers are being grouped according to their remainders.

---

## Clocks and Other Moduli

A standard clock provides arithmetic modulo $12$. Military time $14{:}00$ corresponds to $2{:}00$ p.m. because moving past $12$ wraps around:

$$
14\equiv 2\pmod{12}.
$$

The same idea works with moduli other than $7$ or $12$.

### Example modulo fifteen

Consider

$$
8+9=17.
$$

Because $15$ goes into $17$ once with remainder $2$,

$$
8+9\equiv 2\pmod{15}.
$$

The lecture sometimes places the modulus as a subscript on the congruence symbol as shorthand instead of writing “$\pmod{15}$” after each expression.

### A stated multiplication example

These notes introduces the expression $16\cdot 5$ modulo $11$, but then says that the initial product is $30$ and reduces $30$ modulo $11$:

$$
30=11\cdot 2+8,
$$

leading to a stated result of $8$. The mismatch between $16\cdot 5$ and $30$ is retained as an unclear step below.

---

## Solving Simple Modular Equations

Modular equations can initially be manipulated like familiar algebraic equations, while remembering that the result is interpreted modulo the chosen modulus.

### Solving \(x+3\equiv 5\pmod 7\)

Subtract $3$ from both sides:

$$
x+3\equiv 5\pmod 7
$$

becomes

$$
x\equiv 2\pmod 7.
$$

Substitution checks the result:

$$
2+3=5.
$$

No wraparound is needed in this case.

### Solving \(x+4\equiv 0\pmod 7\)

Subtracting $4$ gives

$$
x\equiv -4\pmod 7.
$$

One can interpret $-4$ by moving four positions backward from $0$ around the circle. This lands at $3$, so

$$
-4\equiv 3\pmod 7.
$$

Substitution verifies the representative $3$:

$$
3+4=7\equiv 0\pmod 7.
$$

A central geometric insight is that moving backward can be replaced by moving sufficiently far forward because the arithmetic takes place on a circle.

---

## Negative Representatives and Weekdays in the Past

Modulo $7$, the residue represented by $5$ also has negative representatives:

$$
5\equiv -2\equiv -9\equiv -16\equiv -23\pmod 7.
$$

The multiples of $7$ themselves represent zero:

$$
-7\equiv -14\equiv -21\equiv 0\pmod 7.
$$

Stepping backward two positions from any of these multiples produces a representative congruent to $-2$, and therefore to $5$.

### A concert twenty-three days ago

Suppose today is Thursday and a concert occurred $23$ days ago. This displacement is $-23$ days. It can be decomposed in two useful ways:

$$
-23=-21-2=7(-3)-2
$$

or

$$
-23=-28+5=7(-4)+5.
$$

The first decomposition returns to a Thursday after $-21$ days and then moves backward two days, from Thursday to Wednesday to Tuesday.

The second decomposition goes back $28$ days to another Thursday and then moves forward five days:

$$
\text{Thursday}\to\text{Friday}\to\text{Saturday}\to\text{Sunday}\to\text{Monday}\to\text{Tuesday}.
$$

Both decompositions give Tuesday because

$$
-2\equiv 5\pmod 7.
$$

These two values belong to the same congruence class.

---

## Formal Definitions of Congruence

The lecture gives three equivalent ways to describe

$$
n\equiv \ell\pmod m.
$$

Each definition gives a different handle on the same relation and may be more convenient in a particular proof.

### Definition through a multiple and a remainder

The first definition says that there exists an integer $k$ such that

$$
n=mk+\ell.
$$

In words, $n$ consists of some integer number of multiples of $m$, with $\ell$ left over.

### Definition through a shared remainder

The second definition says that there exist integers $k$, $j$, and $r$ such that

$$
n=mk+r
$$

and

$$
\ell=mj+r.
$$

Thus, $n$ and $\ell$ can both be expressed as multiples of $m$ plus the same remainder $r$.

### Definition through divisibility

The third definition is

$$
m\mid(n-\ell).
$$

This says that $n-\ell$ is a multiple of $m$. Equivalently,

$$
n-\ell\equiv 0\pmod m.
$$

Subtracting $\ell$ from the congruence $n\equiv \ell\pmod m$ explains the connection: their difference has remainder zero when divided by $m$.

### Proving several definitions equivalent

An “if and only if” assertion contains two implications. Rather than proving every pair of definitions equivalent in both directions separately, the lecture recommends proving a cycle:

$$
(1)\Longrightarrow(2),\qquad
(2)\Longrightarrow(3),\qquad
(3)\Longrightarrow(1).
$$

This cycle connects all three statements. For example, $(3)\Rightarrow(2)$ follows indirectly by going from $(3)$ to $(1)$ and then from $(1)$ to $(2)$. The equivalence proofs themselves are left for homework.

---

## From Evenness to General Congruence

The congruence definition extends earlier divisibility ideas.

Saying that an integer $n$ is even means

$$
2\mid n.
$$

By the definition of divisibility, this means that there exists an integer $k$ such that

$$
n=2k.
$$

General divisibility replaces $2$ by an arbitrary divisor $m$:

$$
m\mid n
\quad\Longleftrightarrow\quad
\text{there exists }k\in\mathbb Z\text{ such that }n=mk.
$$

Congruence extends the form further by allowing a remainder:

$$
n\equiv \ell\pmod m
\quad\Longleftrightarrow\quad
\text{there exists }k\in\mathbb Z\text{ such that }n=mk+\ell.
$$

This generalization does more than describe remainders. It creates a finite arithmetic system in which addition, multiplication, and later exponentiation and inverses can be studied.

---

## Congruence Classes and Substitution

Modulo $7$, the integers split into seven congruence classes. Each class contains infinitely many integers that occupy the same position on the modular circle. These are also called equivalence classes or residue classes in the lecture.

For example, one class contains

$$
\ldots,-6,1,8,15,22,\ldots
$$

because all of these integers are congruent to $1$ modulo $7$.

The key computational principle is that congruent numbers can be substituted for one another during modular arithmetic.

### Compatibility with addition and multiplication

The lecture states the following conjecture, subsequently used as a theorem. If

$$
a\equiv b\pmod m
$$

and

$$
c\equiv d\pmod m,
$$

then

$$
a+c\equiv b+d\pmod m
$$

and

$$
ac\equiv bd\pmod m.
$$

The proof is left for homework. The practical consequence is that a large number may be replaced by a smaller congruent representative before performing addition or multiplication.

### Why both multiplication hypotheses matter

The lecture tests whether the second congruence assumption is actually needed. Modulo $7$, take

$$
1\equiv 8\pmod 7,
$$

but choose $0$ and $2$, which are not congruent modulo $7$. Then the compared products are

$$
1\cdot 0=0
$$

and

$$
8\cdot 2=16\equiv 2\pmod 7.
$$

Since $0\not\equiv 2\pmod 7$, the desired product congruence fails. This counterexample shows why both pairs must be congruent in the stated multiplication rule.

---

## Modular Computation with Large Values

The substitution rule makes calculations involving large values easier.

### \(7\cdot 3\) modulo \(9\)

First calculate

$$
7\cdot 3=21.
$$

Then divide by $9$:

$$
21=9\cdot 2+3.
$$

Therefore,

$$
7\cdot 3\equiv 3\pmod 9.
$$

### Solving \(x+18\equiv 1\pmod{21}\)

Subtract $18$:

$$
x\equiv 1-18\equiv -17\pmod{21}.
$$

To replace the negative representative, observe that

$$
-17=21(-1)+4.
$$

Hence,

$$
x\equiv 4\pmod{21}.
$$

### \(57\cdot 26\) modulo \(8\)

Instead of multiplying first, reduce each factor:

$$
57\equiv 1\pmod 8
$$

and

$$
26\equiv 2\pmod 8.
$$

The multiplication rule then gives

$$
57\cdot 26\equiv 1\cdot 2\equiv 2\pmod 8.
$$

This replaces a two-digit multiplication with the simpler product $1\cdot 2$.

---

## Divisibility Tests Through Modular Arithmetic

Modular substitution explains familiar digit-based divisibility rules. The key is to expand a base-$10$ numeral in powers of $10$ and then replace $10$ by a convenient congruent value.

### Divisibility by nine

Consider the number $82{,}710$. Its base-$10$ expansion is

$$
82{,}710
=
8\cdot 10^4
+2\cdot 10^3
+7\cdot 10^2
+1\cdot 10^1
+0\cdot 10^0.
$$

The question “Does $9$ divide $82{,}710$?” can be restated as

$$
82{,}710\equiv 0\pmod 9.
$$

Since

$$
10\equiv 1\pmod 9,
$$

every power of $10$ can be replaced by the corresponding power of $1$. The number therefore satisfies

$$
82{,}710
\equiv
8\cdot 1^4
+2\cdot 1^3
+7\cdot 1^2
+1\cdot 1
+0\cdot 1
\pmod 9.
$$

Thus,

$$
82{,}710\equiv 8+2+7+1+0=18\equiv 0\pmod 9.
$$

This explains why divisibility by $9$ can be checked by summing the digits: modulo $9$, every place-value power of $10$ becomes $1$.

### Divisibility by eleven

Consider $5{,}291$:

$$
5{,}291
=
5\cdot 10^3
+2\cdot 10^2
+9\cdot 10
+1\cdot 10^0.
$$

Modulo $11$,

$$
10\equiv -1\pmod{11}.
$$

Therefore,

$$
5{,}291
\equiv
5(-1)^3
+2(-1)^2
+9(-1)
+1
\pmod{11}.
$$

Odd powers of $-1$ contribute $-1$, while even powers contribute $1$. The expression becomes the alternating sum

$$
-5+2-9+1.
$$

Consequently, the original number is divisible by $11$ exactly when this alternating sum is divisible by $11$. The explanation is not limited to four-digit numbers: the same substitution of $10$ by $-1$ continues through all place values.

The lecture also notes that analogous reasoning can be carried out in bases other than base $10$, though the resulting claims would change with the base.

---

## Large Powers and Strategic Substitution

The lecture asks for

$$
5^{58}\pmod 7.
$$

Direct exponentiation produces an unnecessarily large integer, so the modular rules are used to simplify the base and exploit smaller powers.

### Replacing \(5\) by \(-2\)

Since

$$
5\equiv -2\pmod 7,
$$

one may write

$$
5^{58}\equiv (-2)^{58}\pmod 7.
$$

Because $58$ is even,

$$
(-2)^{58}=(-1)^{58}2^{58}=2^{58}.
$$

Now decompose the exponent:

$$
58=3\cdot 19+1.
$$

Therefore,

$$
2^{58}=(2^3)^{19}\cdot 2.
$$

Since

$$
2^3=8\equiv 1\pmod 7,
$$

it follows that

$$
2^{58}\equiv 1^{19}\cdot 2\equiv 2\pmod 7.
$$

Thus, the stated result is

$$
5^{58}\equiv 2\pmod 7.
$$

This approach depends on recognizing a convenient substitution and a useful power. The lecture next develops a systematic algorithm that does not require the same creative insight.

---

## Repeated Squaring

Repeated squaring evaluates modular powers by repeatedly halving the exponent and squaring the base. When the exponent is odd, one extra factor is set aside.

### Computing \(5^{58}\pmod 7\)

Begin with

$$
58=2\cdot 29.
$$

Then

$$
5^{58}=(5^2)^{29}.
$$

Reduce the squared base modulo $7$:

$$
5^2=25\equiv 4\pmod 7.
$$

Hence,

$$
5^{58}\equiv 4^{29}\pmod 7.
$$

Because

$$
29=2\cdot 14+1,
$$

separate the extra factor:

$$
4^{29}=(4^2)^{14}\cdot 4.
$$

Now reduce

$$
4^2=16\equiv 2\pmod 7,
$$

so

$$
4^{29}\equiv 2^{14}\cdot 4\pmod 7.
$$

Next,

$$
14=2\cdot 7,
$$

which gives

$$
2^{14}\cdot 4=(2^2)^7\cdot 4=4^7\cdot 4.
$$

Since

$$
7=2\cdot 3+1,
$$

write

$$
4^7=(4^2)^3\cdot 4.
$$

Thus,

$$
4^7\cdot 4=(4^2)^3\cdot 4\cdot 4.
$$

Again,

$$
4^2=16\equiv 2\pmod 7,
$$

so the expression becomes

$$
2^3\cdot 4\cdot 4.
$$

Finally,

$$
2^3=8\equiv 1\pmod 7
$$

and

$$
4\cdot 4=16\equiv 2\pmod 7.
$$

Therefore,

$$
5^{58}\equiv 2\pmod 7.
$$

### Why the algorithm is efficient

A direct approach could require handling the multiplications one at a time. Repeated squaring instead reduces the exponent by approximately half at each stage. The lecture describes the number of multiplication stages as logarithmic in the exponent, specifically involving $\log_2(58)$ in this example.

The procedure is suitable for a computer because each stage follows the same rule:

- Divide the exponent by $2$.
- If there is a remainder of $1$, set aside one extra factor.
- Square and reduce the base modulo the modulus.
- Repeat with the smaller exponent.

The lecture briefly notes that questions about when powers cycle back to $1$ depend on the numbers and, in the cryptographic setting mentioned, on knowing a factorization of the modulus. Further treatment is deferred until RSA cryptography.

---

## Additive Inverses

The lecture formalizes negative values using additive inverses.

An integer $x$ is an additive inverse of $a$ modulo $m$ when

$$
x+a\equiv 0\pmod m.
$$

This inverse is denoted $-a$. The notation does not merely mean “move left on a number line”; it identifies the value that combines with $a$ to produce the additive identity, $0$.

Zero is neutral under addition because adding it does not change a value:

$$
0+2=2,\qquad 0+5=5.
$$

### Additive inverse of \(4\) modulo \(7\)

The lecture asks what must be added to $4$ to produce $0$ modulo $7$. Since

$$
3+4=7\equiv 0\pmod 7,
$$

the additive inverse of $4$ modulo $7$ is represented by $3$:

$$
-4\equiv 3\pmod 7.
$$

### Interpreting \(-17\) modulo \(21\)

Instead of immediately searching for a decomposition using a negative multiple of $21$, ask what must be added to $17$ to reach a multiple of $21$. Since

$$
17+4=21\equiv 0\pmod{21},
$$

the additive inverse of $17$ is represented by $4$:

$$
-17\equiv 4\pmod{21}.
$$

---

## Multiplicative Inverses and Modular Division

The multiplicative identity is $1$, because multiplying by $1$ does not change a value. Accordingly, an integer $x$ is a multiplicative inverse of $a$ modulo $m$ if

$$
xa\equiv 1\pmod m.
$$

The inverse is denoted

$$
a^{-1}.
$$

In modular arithmetic, “dividing by $a$” means multiplying by a multiplicative inverse of $a$, when such an inverse exists.

### Solving \(3x\equiv 2\pmod 7\)

Ordinary algebra might suggest writing $x\equiv \frac23$, but the decimal interpretation of $\frac23$ does not fit the discrete modular system. Instead, find the multiplicative inverse of $3$ modulo $7$.

Because

$$
3\cdot 5=15\equiv 1\pmod 7,
$$

the inverse of $3$ is represented by $5$. Multiply both sides of the congruence by $5$:

$$
5(3x)\equiv 5\cdot 2\pmod 7.
$$

The left side simplifies because $5\cdot 3\equiv 1$:

$$
x\equiv 10\pmod 7.
$$

Finally,

$$
10\equiv 3\pmod 7,
$$

so

$$
x\equiv 3\pmod 7.
$$

### Solving \(23x\equiv 5\pmod{10}\)

First reduce the coefficient:

$$
23\equiv 3\pmod{10}.
$$

Thus,

$$
23x\equiv 5\pmod{10}
$$

becomes

$$
3x\equiv 5\pmod{10}.
$$

The inverse of $3$ modulo $10$ is $7$ because

$$
3\cdot 7=21\equiv 1\pmod{10}.
$$

Multiplying both sides by $7$ gives

$$
7\cdot 3x\equiv 7\cdot 5\pmod{10}.
$$

Therefore,

$$
x\equiv 35\pmod{10}.
$$

Reducing the result,

$$
x\equiv 5\pmod{10}.
$$

---

## When Multiplicative Inverses Exist

Not every value has a multiplicative inverse for every modulus. The lecture examines possible inverses modulo $10$.

Some inverses are:

$$
1^{-1}\equiv 1\pmod{10},
$$

because $1\cdot 1=1$;

$$
3^{-1}\equiv 7\pmod{10},
$$

because $3\cdot 7=21\equiv 1\pmod{10}$;

$$
7^{-1}\equiv 3\pmod{10},
$$

because the inverse relationship is mutual; and

$$
9^{-1}\equiv 9\pmod{10},
$$

because $9\cdot 9=81\equiv 1\pmod{10}$.

By contrast, the lecture states that finding inverses for $2$, $4$, $5$, $6$, and $8$ modulo $10$ will fail. Zero, represented here by $10$ modulo $10$, also has no inverse because it cannot be multiplied by anything to produce $1$ modulo $10$.

The observed distinction is that $1$, $3$, $7$, and $9$ share no nontrivial factor with $10$. The lecture states the theorem to be proved in the next class:

$$
a^{-1}\text{ exists modulo }m
\quad\Longleftrightarrow\quad
\gcd(a,m)=1.
$$

In the lecture’s wording, an inverse exists exactly when $a$ and $m$ share no common factors other than $1$. The notation $\gcd(a,m)=1$ expresses that their greatest common divisor is $1$.

---

## Unclear or Incomplete Steps

- these notes introduces “$16$ times $5$ modulo $11$” but immediately says the product is $30$ and computes $30\equiv 8\pmod{11}$. Since $16\cdot 5\ne 30$, the intended original multiplication is `[unclear]`.
- Near the introduction of modular division, the initial equation is written as “$X$ is congruent to seven. Mod two,” but the subsequent derivation consistently solves $3x\equiv 2\pmod 7$. The opening statement of that example is `[unclear]`.
- The final noninvertibility example is written as “$12X$ congruent to $10$ mod $3$,” but the instructor then asks for the inverse of $12$ modulo $10$ and proceeds to list inverses modulo $10$. The intended congruence is `[unclear]`, so no solution to that stated equation is reconstructed.
#academic/year-3/cs70/lecture-notes