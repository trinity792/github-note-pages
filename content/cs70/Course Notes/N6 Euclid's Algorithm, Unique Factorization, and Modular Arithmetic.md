---
title: N6 Euclid's Algorithm, Unique Factorization, and Modular Arithmetic
Content Type: Course Notes
Content Area: Discrete Mathematics
description: Euclid's algorithm and its extension for computing gcds and multiplicative inverses, the Fundamental Theorem of Arithmetic, the Chinese Remainder Theorem, and Fermat's Little Theorem.
Course: CS 70
pinned: false
Date Published: September 18, 2026
Last Updated: September 18, 2026
Status: Finalized
---

# N6 Euclid's Algorithm, Unique Factorization, and Modular Arithmetic

This note develops the number-theoretic tools needed for modular arithmetic. It shows how **Euclid's algorithm** and its extension compute greatest common divisors and multiplicative inverses, uses these tools to prove the **Fundamental Theorem of Arithmetic**, states and proves the **Chinese Remainder Theorem**, and concludes with **Fermat's Little Theorem**.

## 1. Computing Inverses: Euclid's Algorithm

Computing the multiplicative inverse of $x$ modulo $m$ is closely related to finding $\gcd(x,m)$. For any pair of numbers $x,y$, suppose we could not only compute $\gcd(x,y)$ but also find integers $a,b$ such that

$$
d = \gcd(x,y) = ax+by.
$$

This is not a modular equation, and the integers $a,b$ could be zero or negative. For example, we can write $1 = \gcd(35,12) = -1\cdot35 + 3\cdot12$, so here $a=-1$ and $b=3$ are possible values.

If we could always find such $a,b$, we would be able to compute inverses as follows. First find integers $a$ and $b$ such that

$$
1 = \gcd(m,x) = am+bx.
$$

This means $bx \equiv 1 \pmod{m}$, so $b$ is a multiplicative inverse of $x$ modulo $m$. Reducing $b$ modulo $m$ gives the unique inverse we are looking for. In the example above, $3$ is the multiplicative inverse of $12$ mod $35$. So computing the multiplicative inverse of $x$ modulo $m$ reduces to finding integers $a,b$ with $d = ax+by$. Remarkably, Euclid's algorithm for computing gcds also lets us find such $a$ and $b$: computing the multiplicative inverse of $x$ modulo $m$ is as simple as running Euclid's gcd algorithm on input $x$ and $m$.

### Euclid's Algorithm

To compute $\gcd(x,y)$: as a base case, if $x$ or $y$ is $0$, the gcd is simply the other number, since $0$ is divisible by everything (although it divides nothing). The algorithm for other cases is ancient, and although associated with the name of Euclid, is almost certainly a folklore algorithm invented by craftsmen because of its intensely practical nature.

The algorithm uses the following theorem to eventually reduce to the base case where one of the numbers is $0$.

### Theorem 6.1

Let $x \geq y > 0$. Then $\gcd(x,y) = \gcd(y, x \bmod y)$.

#### Proof

The theorem follows immediately from the fact that a number $d$ is a common divisor of $x$ and $y$ if and only if $d$ is a common divisor of $y$ and $x \bmod y$. To see this, write $x = qy+r$ where $q$ is an integer and $r = x \bmod y$. If $d$ divides $x$ and $y$, then it also divides $x$ and $qy$, and thus it also divides their difference $r = x-qy$ (as proved in Note 1). Conversely, if $d$ divides $y$ and $r$, then it also divides $qy$ and $r$, and thus also their sum $x = qy+r$.

Given this theorem, here is how to compute $\gcd(16,10)$:

$$
\begin{aligned}
\gcd(16,10) &= \gcd(10,6) \\
&= \gcd(6,4) \\
&= \gcd(4,2) \\
&= \gcd(2,0) = 2.
\end{aligned}
$$

In each line, the pair of arguments $(x,y)$ is replaced with $(y, x \bmod y)$ until the second argument becomes $0$. At that point the gcd is just the first argument. By Theorem 6.1, each of these substitutions preserves the gcd.

The algorithm can be written recursively as follows. It assumes the inputs are natural numbers $x,y$ satisfying $x \geq y \geq 0$ and $x > 0$.

```text
algorithm gcd(x, y)
  if y = 0 then return(x)
  else return(gcd(y, x mod y))
```

### Theorem 6.2

The algorithm above correctly computes the gcd of $x$ and $y$.

#### Proof

Correctness is proved by strong induction on $y$, the smaller of the two input numbers. For each $y \geq 0$, let $P(y)$ denote the proposition that the algorithm correctly computes $\gcd(x,y)$ for all values of $x$ such that $x \geq y$ (and $x>0$). Certainly $P(0)$ holds, since $\gcd(x,0)=x$ and the algorithm correctly computes this in the if-clause.

For the inductive step, assume $P(z)$ holds for all $z<y$ (the inductive hypothesis); the task is to prove $P(y)$. The key observation is that $\gcd(x,y) = \gcd(y, x \bmod y)$, that is, replacing $x$ by $x \bmod y$ does not change the gcd. This was proved in Theorem 6.1. Hence the else-clause of the algorithm returns the correct value provided the recursive call $\gcd(y, x \bmod y)$ correctly computes $\gcd(y, x \bmod y)$. But since $x \bmod y < y$, this is true by the inductive hypothesis. This completes the verification of $P(y)$, and hence the induction proof.

What is the running time of this algorithm? In terms of arithmetic operations on integers, it takes time $O(n)$, where $n$ is the total number of bits in the input $(x,y)$. The argument is similar to the one used earlier for exponentiation, but slightly trickier: it is obvious that the arguments of the recursive calls become smaller and smaller, since $y \leq x$ and $x \bmod y < y$. The question is how fast.

The key point is that, in the computation of $\gcd(x,y)$, after two recursive calls the first (larger) argument is smaller than $x$ by at least a factor of two, assuming $x>0$. There are two cases:

1. $y \leq \frac{x}{2}$. Then the first argument in the next recursive call, $y$, is already smaller than $x$ by a factor of $2$, and it will be even smaller in the recursive call after that.
2. $x \geq y > \frac{x}{2}$. Then in two recursive calls the first argument will be $x \bmod y$, which is smaller than $\frac{x}{2}$.

So in both cases the first argument decreases by a factor of at least two every two recursive calls. Thus after at most $2n$ recursive calls, where $n$ is the number of bits in $x$, the recursion must stop, noting that the first argument is always a natural number.

This argument only shows that the *number of recursive calls* is $O(n)$. The same claim holds for the running time if each call requires only constant time. Since each call involves one integer comparison and one mod operation, it is reasonable to claim its running time is constant. In a more realistic model of computation, however, the time for these operations should depend on the size of the numbers involved; this is discussed in CS 170.

### Extended Euclid's Algorithm

To compute the multiplicative inverse, we need an algorithm that also returns integers $a$ and $b$ such that

$$
\gcd(x,y) = ax+by.
$$

Then, in particular, when $\gcd(x,y)=1$ we can deduce that $b$ is an inverse of $y$ mod $x$.

Since this problem is a generalization of the basic gcd, we can solve it with a fairly straightforward extension of Euclid's algorithm. The following recursive algorithm `extended-gcd` follows the same recursive structure as Euclid's original algorithm, but keeps track of the required coefficients $a,b$ as the recursion unwinds. It takes as input a pair of natural numbers $x \geq y$ as in Euclid's algorithm, and returns a triple of integers $(d,a,b)$ such that $d=\gcd(x,y)$ and $d=ax+by$:

```text
algorithm extended-gcd(x, y)
  if y = 0 then return(x, 1, 0)
  else
    (d, a, b) := extended-gcd(y, x mod y)
    return((d, b, a - (x div y) * b))
```

Here `x div y` denotes the usual truncated integer division, written mathematically as $\lfloor x/y \rfloor$.

Here is the sequence of recursive calls, along with the sequence of triples they return, for the input $(x,y)=(16,10)$ used in the earlier gcd example:

$$
\text{egcd}(16,10) \to \text{egcd}(10,6) \to \text{egcd}(6,4) \to \text{egcd}(4,2) \to \text{egcd}(2,0)
$$

$$
(2,2,-3) \leftarrow (2,-1,2) \leftarrow (2,1,-1) \leftarrow (2,0,1) \leftarrow (2,1,0)
$$

> [!tip] Exercise
> Check the above execution sequence.

The final triple returned is $(d,a,b) = (2,2,-3)$, meaning $\gcd(16,10)=2$, expressible as $d=ax+by = 2\cdot16 - 3\cdot10$. In fact, each triple $(d,a,b)$ returned expresses $d=2$ as a linear combination of the corresponding inputs to that recursive call, so we can check that

$$
d = 1\cdot2+0\cdot0 = 0\cdot4+1\cdot2 = 1\cdot6-1\cdot4 = -1\cdot10+2\cdot6 = 2\cdot16-3\cdot10.
$$

Since $\gcd(16,10) \neq 1$, $10$ does not have an inverse mod $16$, so the coefficients $a,b$ returned here are not useful for computing inverses. The next exercise gives an example where they do let us read off the inverse.

> [!tip] Exercise
> Hand-turn the algorithm yourself on the input $(x,y)=(35,12)$ and verify that it returns the triple $(1,-1,3)$. Deduce that the inverse of $12$ mod $35$ is $3$.

Let us reverse-engineer the algorithm to understand why it works. In the base case ($y=0$), the algorithm returns the gcd value $d=x$ together with coefficients $a=1$ and $b=0$; clearly these satisfy $ax+by=d$, as required.

When $y>0$, the algorithm first recursively computes values $(d,a,b)$ such that $d=\gcd(y, x \bmod y)$ and

$$
d = ay + b(x \bmod y).
$$

It then returns the triple $(d,A,B)$, where $A=b$ and $B = a - \lfloor x/y \rfloor b$. Just as in the earlier analysis of the vanilla gcd algorithm, the value $d$ computed recursively is equal to $\gcd(x,y)$, so the first component of the returned triple is correct.

What about $A$ and $B$? They should be integers satisfying

$$
d = Ax+By.
$$

To figure out what $A$ and $B$ should be in terms of the previously returned $a$ and $b$, rearrange the equation above:

$$
\begin{aligned}
d &= ay+b(x \bmod y) \\
&= ay+b(x-\lfloor x/y\rfloor y) \\
&= bx+(a-\lfloor x/y\rfloor b)y.
\end{aligned}
$$

In the second line, we used the fact that $x \bmod y = x - \lfloor x/y \rfloor y$. Comparing coefficients of $x$ and $y$ with $d=Ax+By$, we see that we need $A=b$ and $B=a-\lfloor x/y\rfloor b$. This is exactly what the last line of the algorithm computes, which is why it works.

> [!tip] Exercise
> Turn the above argument into a formal proof by induction that the algorithm `extended-gcd` is correct.

Since `extended-gcd` has exactly the same recursive structure as the vanilla version, its running time is the same up to constant factors, reflecting the increased time per recursive call. So the running time on $n$-bit numbers is again $O(n)$ arithmetic operations, meaning we can find multiplicative inverses very efficiently.

### Division in Modular Arithmetic

Now that we know how to compute the inverse of $x$ modulo $m$ (assuming $x$ and $m$ are coprime), we can use it to do arithmetic. The simplest scenario is solving a modular equation such as

$$
8x \equiv 9 \pmod{15}.
$$

To solve the analogous equation $8x=9$ over the rational numbers, we would multiply both sides by $8^{-1}$ to get $x=9/8$. We do the same thing mod $15$. The inverse of $8 \pmod{15}$ is $2$, since $2\cdot8=16\equiv1\pmod{15}$. Multiplying both sides by $8^{-1}\equiv2$ gives

$$
x \equiv 18 \equiv 3 \pmod{15}.
$$

So the solution to the modular equation is $x=3$, and this solution is unique modulo $15$.

---

## 2. Fundamental Theorem of Arithmetic

Any positive integer greater than $1$ can be expressed uniquely as a product of primes, up to a reordering of the factors. This is the Fundamental Theorem of Arithmetic. For example, $12 = 2\cdot2\cdot3$. Extended Euclid's algorithm is the key to proving this.

We start by proving an important fact about divisibility.

### Claim — Divisibility via Coprimality

Let $x,y,z$ be positive integers such that $\gcd(x,y)=1$. If $x \mid yz$, then $x \mid z$.

#### Proof

By Extended Euclid's algorithm, since $\gcd(x,y)=1$, there exist integers $a$ and $b$ such that

$$
1 = \gcd(x,y) = ax+by.
$$

Multiplying both sides by $z$ gives

$$
z = axz+byz.
$$

We know $x \mid axz$, and $x \mid byz$ because $x \mid yz$. Thus $x$ divides their sum, that is, $x \mid axz+byz$. Since $axz+byz=z$, we conclude that $x \mid z$.

Recall that a prime number $p$ is a number whose only positive factors are $1$ and $p$.

### Fundamental Theorem of Arithmetic

Every positive integer $n>1$ can be expressed uniquely in the form $p_1p_2\cdots p_k$, where each $p_i$ is a (not necessarily unique) prime number, up to reordering of the prime factors. For example, $12=2\cdot2\cdot3$, and any other prime factorization of $12$ is some reordering of $2,2,3$.

#### Proof

We showed by induction in Note 4 that every positive integer $n$ can be expressed in the form $p_1p_2\cdots p_k$, where each $p_i$ is a (not necessarily different) prime number. So it suffices to show that such a form is unique up to reordering the factors.

Suppose we can express $n$ with two prime factorizations

$$
n = p_1p_2\cdots p_k = q_1q_2\cdots q_l,
$$

where the $p_i$ and $q_j$ are prime numbers. We need to show that $k=l$, and that the $p_i$'s are some reordering of the $q_j$'s.

Without loss of generality, assume $k \leq l$ (if $k \geq l$, simply swap the factorizations). The goal is to show that each $p_i$ is one of the $q_j$'s.

First, consider $p_1$. Since $p_1 \mid n$, we must have $p_1 \mid q_1q_2\cdots q_l$. If $p_1$ is one of $q_1,q_2,\dots,q_{l-1}$, then we are done. Otherwise, if $p_1 \neq q_j$ for $1 \leq j \leq l-1$, then $\gcd(p_1,q_j)=1$ for $1 \leq j \leq l-1$, as the only factor they share is $1$. Applying the previous claim, we conclude that $p_1 \mid q_l$. Since $1$ is not prime, $p_1$ is not $1$, so $p_1=q_l$.

Thus $p_1=q_j$ for some $j$. We can divide both sides by $p_1$, reducing the number of primes on both sides by $1$.

We now repeat the process for $p_2,p_3,\dots,p_k$. In the end, the left-hand side will be $1$, and the right-hand side will be a product of $l-k$ primes. Every prime number is at least $2$, so for the two sides to be equal we must have $l-k=0$, or $k=l$. Moreover, in this process we have matched each $p_i$ with a unique $q_j$. Thus the $p_i$'s are some reordering of the $q_j$'s, as desired.

What were the keys to this proof? To prove that a prime factorization existed (shown in Note 4), we used strong induction. To prove that such a factorization is unique, we used a corollary of the Euclidean algorithm. The key to the Euclidean algorithm is the existence and uniqueness of division with remainder: for integers $x$ and $m \neq 0$, there exist unique integers $q$ and $r$ such that $x=mq+r$ with $0 \leq r \leq m-1$. If we have other arithmetic systems that emulate this type of division algorithm, we can follow the same type of proof to get a form of unique prime factorization; this is an important generalization studied in number theory under the name of *Euclidean domains*.

---

## 3. Chinese Remainder Theorem

We now present an interesting aspect of modular arithmetic embodied in the Chinese Remainder Theorem, so named because its earliest known statement was by the Chinese mathematician Sunzi in the 3rd century AD.

### Claim — Two-Modulus Case

For $n_1,n_2$ with $\gcd(n_1,n_2)=1$, there is exactly one $x \pmod{n_1n_2}$ that satisfies the equations

$$
x \equiv a_1 \pmod{n_1}
\qquad\text{and}\qquad
x \equiv a_2 \pmod{n_2}.
$$

#### Proof

Since $\gcd(n_1,n_2)=1$, we know by Extended Euclid that there exist integers $c_1,c_2$ such that

$$
c_1n_1+c_2n_2 = 1.
$$

We claim that the integer $x = a_1c_2n_2+a_2c_1n_1$ satisfies the equations above. To check this, write

$$
\begin{aligned}
x &= a_1c_2n_2+a_2c_1n_1 \\
&= a_1(1-c_1n_1)+a_2c_1n_1 \\
&= a_1+(a_2-a_1)c_1n_1.
\end{aligned}
$$

Hence $x \equiv a_1 \pmod{n_1}$, as required. By exactly the same argument, switching the subscripts $1$ and $2$, we see also that $x \equiv a_2 \pmod{n_2}$. So $x$ satisfies both equations.

To complete the proof, we verify that $x$ is unique $\pmod{n_1n_2}$. Suppose integers $x$ and $y$ both satisfy the equations. Then in particular $x \equiv y \pmod{n_1}$ and $x \equiv y \pmod{n_2}$. This implies that $(x-y)$ is divisible by $n_1$ and by $n_2$. Since $\gcd(n_1,n_2)=1$, this means $(x-y)$ must be divisible by $n_1n_2$, and hence $x \equiv y \pmod{n_1n_2}$, as required.

The integers $c_1,c_2$ in this proof have a specific meaning as inverses. In $c_1n_1+c_2n_2=1$, $c_1$ is the inverse of $n_1 \pmod{n_2}$, and $c_2$ is the inverse of $n_2 \pmod{n_1}$ (both inverses exist because $\gcd(n_1,n_2)=1$). Thus the solution $x$ constructed above has the form

$$
x = a_1b_1+a_2b_2,
$$

where $b_1 = n_2\left(n_2^{-1} \bmod n_1\right)$ and $b_2 = n_1\left(n_1^{-1} \bmod n_2\right)$. This implies

$$
b_1 \equiv \begin{cases} 1 \pmod{n_1} \\ 0 \pmod{n_2} \end{cases}
\qquad
b_2 \equiv \begin{cases} 0 \pmod{n_1} \\ 1 \pmod{n_2} \end{cases}
$$

Hence we can view $b_1,b_2$ as "basis vectors": $b_1$ has coordinate $1$ in "direction" $n_1$ and coordinate $0$ in "direction" $n_2$, and vice versa for $b_2$. So to satisfy the equations, our solution $x$ should be a linear combination of $b_1,b_2$ with coefficients $a_1$ and $a_2$, respectively.

The above result extends to the full Chinese Remainder Theorem.

### Chinese Remainder Theorem

Let $n_1,n_2,\dots,n_k$ be positive integers that are coprime to each other, and let $N=\prod_{i=1}^{k}n_i$. Then for any sequence of integers $a_1,a_2,\dots,a_k$, there is a unique integer $x \pmod{N}$ that satisfies all the congruences

$$
\begin{aligned}
x &\equiv a_1 \pmod{n_1} \\
&\ \ \vdots \\
x &\equiv a_i \pmod{n_i} \\
&\ \ \vdots \\
x &\equiv a_k \pmod{n_k}.
\end{aligned}
$$

We will not prove the full theorem in detail, but we sketch two approaches.

**First approach.** Iterate the $k=2$ result proved above. First use that version to find an $x$ satisfying the first two congruences, for moduli $n_1$ and $n_2$. This $x$ has a certain unique value $\pmod{n_1n_2}$, call it $a_{12}$. Replace the first two congruences by the single congruence $x \equiv a_{12} \pmod{n_1n_2}$. Since $n_1n_2$ is also coprime with all the other $n_i$, we now have a smaller problem with $k-1$ rather than $k$ congruences, and we can continue to iterate until finished.

**Second approach.** Extend the "coordinate" view of the $k=2$ proof. We construct basis vectors $b_i$ for each $i$ using inverses as before, and derive the solution $x = \sum_i a_ib_i$ as a linear combination of these basis vectors. Following the earlier construction, the correct definition for each $b_i$ is

$$
b_i = \frac{N}{n_i}\left(\left(\frac{N}{n_i}\right)^{-1} \bmod n_i\right).
$$

The interested reader may check that this solution works as before.

---

## 4. Fermat's Little Theorem

To conclude this note, we prove a theorem useful in future lectures called Fermat's Little Theorem. This standard fact from number theory tells us that exponentiation is periodic when done modulo a prime, and that the period is one less than the prime in question.

### Theorem 6.3 (Fermat's Little Theorem)

For any prime $p$ and any $a \in \{1,2,\dots,p-1\}$, we have $a^{p-1} \equiv 1 \pmod{p}$.

#### Proof

Let $S$ denote the set of non-zero integers mod $p$, that is, $S=\{1,2,\dots,p-1\}$. Consider the sequence of numbers $a, 2a, 3a, \dots, (p-1)a \bmod p$. We already saw in the previous Lecture Note that, whenever $\gcd(p,a)=1$ (which certainly holds here since $p$ is prime) these numbers are all distinct. Therefore, since none of them is zero, and there are $p-1$ of them, they must include each element of $S$ exactly once. So the set of numbers

$$
S' = \{a \bmod p,\ 2a \bmod p,\ \dots,\ (p-1)a \bmod p\}
$$

is exactly the same as $S$, just in a different order.

Now take the product of all numbers in $S$, mod $p$. Clearly this product is

$$
1\times2\times\cdots\times(p-1) \equiv (p-1)! \pmod{p}.
$$

On the other hand, take the product of all numbers in $S'$. This is

$$
a\times2a\times\cdots\times(p-1)a \equiv a^{p-1}(p-1)! \pmod{p}.
$$

But since the sets of numbers in $S$ and $S'$ are exactly the same mod $p$, the two products above must in fact be equal mod $p$. Hence

$$
(p-1)! \equiv a^{p-1}(p-1)! \pmod{p}.
$$

Finally, since $p$ is prime, every non-zero integer has an inverse mod $p$, so $(p-1)!$ has an inverse mod $p$. Multiplying both sides by the inverse of $(p-1)!$ gives $a^{p-1} \equiv 1 \pmod{p}$, as required.

#academic/year-3/cs70/course-notes