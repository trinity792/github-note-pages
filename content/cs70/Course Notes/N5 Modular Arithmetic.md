---
title: N5 Modular Arithmetic
Content Type: Course Notes
Content Area: Discrete Mathematics
description: Modular arithmetic and residue classes, computing sums, differences, and products modulo m, fast modular exponentiation by repeated squaring, and the existence and uniqueness of multiplicative inverses.
Course: CS 70
pinned: false
Date Published: September 14, 2026
Last Updated: September 14, 2026
Status: Finalized
---
	
# CS 70 Note 5 — Modular Arithmetic
In settings such as error-correcting codes and cryptography, it is often useful to work over a smaller, fixed range of numbers rather than over all the integers. This note introduces **modular arithmetic**, which limits numbers to a range $\{0,1,\ldots,N-1\}$ and wraps around whenever a computation would leave that range, along with the residue-class view of modular arithmetic, fast modular exponentiation, and multiplicative inverses.

## 1. Modular Arithmetic
Modular arithmetic wraps numbers around a fixed modulus much like the hand of a clock, where $N=12$, or the days of the week, where $N=7$.

### Example: Calculating the Time
Calculating the time automatically uses modular arithmetic. If asked what time it will be 13 hours from 1 pm, the answer is 2 am rather than 14. Assuming the clock displays 12 as 0, this limits numbers to the range $\{0,1,2,\ldots,11\}$, and adding two numbers in this setting means dividing by 12 and taking the remainder as the answer. The time 24 hours from 2 pm is again 2 pm, and this holds for any multiple of 12 hours. The time 25 hours from 2 pm is therefore 3 pm - equivalently, we add 1 hour, the remainder when 25 is divided by 12.

More generally, we define $x\bmod m$ ("$x$ modulo $m$") to be the remainder $r$ when $x$ is divided by $m$: if $x\equiv r\pmod m$, then

$$
x=mq+r,\qquad0\leq r\leq m-1,\ q\in\mathbb{Z}.
$$

Thus $29\equiv5\pmod{12}$ and $13\equiv3\pmod5$.

### Computation
To calculate $x+y\pmod m$, first add $x+y$ and take the remainder on division by $m$. For example, with $x=14$, $y=25$, $m=12$: dividing $x+y=39$ by 12 gives remainder 3. The same answer results from first reducing $2\equiv x\pmod{12}$ and $1\equiv y\pmod{12}$ and adding the results modulo 12. The same holds for subtraction: $x-y\pmod{12}$ is $-11\pmod{12}$, which is $1$ - the same result obtained by simplifying first, $(x\bmod12)-(y\bmod12)\equiv2-1\equiv1\pmod{12}$.

This idea saves even more effort for multiplication. To compute $xy\pmod{12}$, we could compute $xy=14\times25=350$ and then reduce modulo 12, but reducing $x$ and $y$ first, $2\equiv x\pmod{12}$ and $1\equiv y\pmod{12}$, and multiplying the results modulo 12 gives the same answer much more easily.

More generally, while carrying out any sequence of additions, subtractions, or multiplications mod $m$, we get the same answer if we reduce any intermediate results mod $m$. This considerably simplifies calculations, and is proved formally as Theorem 5.1 below.

### Set Representation
An alternative view of modular arithmetic helps explain why this works. For any integer $m$, $x$ and $y$ are **congruent modulo $m$** if they differ by a multiple of $m$:

$$
x\equiv y\pmod m\iff m\mid(x-y).
$$

For example, 29 and 5 are congruent modulo 12 because 12 divides $29-5$. We can also write $22\equiv-2\pmod{12}$. Equivalently, $x$ and $y$ are congruent modulo $m$ if and only if they have the same remainder modulo $m$:

$$
x\equiv y\pmod m\iff x\bmod m=y\bmod m.
$$

The numbers congruent to $0\pmod{12}$ are all the multiples of 12, and the numbers congruent to $1$ or $2\pmod{12}$ form similar infinite sets:

- Congruent to $0\pmod{12}$: $\{\ldots,-24,-12,0,12,24,\ldots\}$.
- Congruent to $1\pmod{12}$: $\{\ldots,-23,-11,1,13,25,\ldots\}$.
- Congruent to $2\pmod{12}$: $\{\ldots,-22,-10,2,14,26,\ldots\}$.

In this way we get 12 such sets of integers, and every integer belongs to exactly one of them. In general, working modulo $m$ gives $m$ disjoint sets whose union is the set of all integers; these are called **residue classes mod $m$**. Each set can be represented by the unique element it contains in the range $\{0,\ldots,m-1\}$: the set represented by $i$ consists of all $z$ such that $z=mq+i$ for some integer $q$, and all such numbers have remainder $i$ when divided by $m$, so they are congruent modulo $m$.

This view explains addition, subtraction, and multiplication directly in terms of these sets. When adding $x\equiv2\pmod{12}$ and $y\equiv1\pmod{12}$, it does not matter which representatives of the two sets are chosen, since the result always lands in the set containing 3, and the same holds for subtraction and multiplication. The elements of each residue class are interchangeable when computing modulo $m$, which is why intermediate results can always be reduced modulo $m$.

### Theorem 5.1
If $a\equiv c\pmod m$ and $b\equiv d\pmod m$, then $a+b\equiv c+d\pmod m$ and $a\cdot b\equiv c\cdot d\pmod m$.

#### Proof
We know that $c=a+k\cdot m$ and $d=b+\ell\cdot m$ for integers $k,\ell$, so

$$
c+d=a+k\cdot m+b+\ell\cdot m=a+b+(k+\ell)\cdot m,
$$

which means that $a+b\equiv c+d\pmod m$. The proof for multiplication is similar.

> [!tip] Exercise
> Complete the proof of Theorem 5.1 for multiplication.

This theorem says that any arithmetic expression modulo $m$ can always be reduced to a number in $\{0,1,\ldots,m-1\}$ by reducing intermediate results. For example, using the theorem repeatedly,

$$
\begin{aligned}
(13+11)\cdot18
&\equiv(6+4)\cdot4\pmod7 \\
&=10\cdot4\pmod7 \\
&\equiv3\cdot4\pmod7 \\
&=12\pmod7 \\
&\equiv5\pmod7.
\end{aligned}
$$

In summary, basic arithmetic - multiplication, addition, subtraction - can always be carried out modulo $m$ by reducing intermediate results modulo $m$. Division has not yet been mentioned; much more on that below.

---

## 2. Exponentiation
Another standard operation in arithmetic algorithms, used heavily in primality testing and RSA, is raising one number to a power modulo another: how do we compute $x^y\pmod m$, where $x,y,m$ are natural numbers and $m>1$? A naive approach computes the sequence $x\bmod m,\ x^2\bmod m,\ x^3\bmod m,\ldots$ up to $y$ terms, which takes time exponential in the number of bits of $y$. Repeated squaring does much better:

```text
algorithm mod-exp(x, y, m)
  if y = 0 then return (1)
  else
    z = mod-exp(x, y div 2, m)
    if y mod 2 = 0 then return (z * z mod m)
    else return (x * z * z mod m)
```

This algorithm relies on writing any $y>0$ as $y=2a$ or $y=2a+1$, where $a=\lfloor y/2\rfloor$ (written `y div 2` above), together with the facts

$$
x^{2a}=(x^a)^2\qquad\text{and}\qquad x^{2a+1}=x\cdot(x^a)^2.
$$

> [!tip] Exercise
> Use the facts above to prove by induction on $y$ that `mod-exp` always returns the correct value.

The main question for a recursive algorithm's running time is how many recursive calls are made. Since the second argument $y$ is integer-divided by 2 on each call, the number of recursive calls equals exactly the number of bits, $n$, in $y$ (equivalently, up to a constant factor, the number of decimal digits in $y$). Charging constant time for each arithmetic operation, `mod-exp` runs in $O(n)$ time - efficient enough to handle exponents with thousands of bits.

In a more realistic bit-level cost model, the test on $y$ in the `if`-statement only inspects the least significant bit, and computing $\lfloor y/2\rfloor$ is just a bit shift, so both take constant time. The cost of each recursive call is therefore dominated by the `mod` operation on the final result. (Analyzing grade-school long division for binary numbers shows that the cost of this `mod` operation depends only on the number of bits in $m$ and $x$, not on $y$.) A fuller analysis of such algorithms belongs to CS170.

---

## 3. Inverses
Addition, multiplication, and exponentiation modulo $m$ have now been discussed. Subtraction is the inverse of addition: subtracting $b$ modulo $m$ is the same as adding $-b\equiv m-b\pmod m$.

Division is harder. Over the reals, dividing by $x$ is the same as multiplying by $y=1/x$, where $y$ is the number such that $x\cdot y=1$ - undefined when $x=0$. Similarly, dividing by $x\pmod m$ requires finding $y\pmod m$ such that $x\cdot y\equiv1\pmod m$; dividing by $x$ modulo $m$ is then the same as multiplying by $y$ modulo $m$. Such a $y$ is called the **multiplicative inverse** of $x$ modulo $m$.

As a first example, take $x=8$ and $m=15$. Then $2x=16\equiv1\pmod{15}$, so 2 is a multiplicative inverse of 8 mod 15. As a second example, take $x=12$ and $m=15$. The sequence $\{ax\bmod m:a=1,2,3,\ldots\}$ is periodic and takes the values $12,9,6,3,0,12,9,6,\ldots$, so 12 has no multiplicative inverse mod 15, since 1 never appears in the sequence.

> [!important] Modular Arithmetic Differs from Ordinary Arithmetic
> Two properties distinguish modular arithmetic from grade-school arithmetic. First, a nonzero number can fail to have an inverse - in ordinary arithmetic, only zero lacks an inverse. Second, the "times table" for a nonzero number can contain zero - for example, $12\times5\equiv0\pmod{15}$ - whereas in ordinary arithmetic zero never appears in the multiplication table of any nonzero number.

So when does $x$ have a multiplicative inverse modulo $m$? Precisely when the greatest common divisor of $m$ and $x$ is 1, and when the inverse exists it is unique. Recall that the **greatest common divisor** of two natural numbers $x$ and $y$, denoted $\gcd(x,y)$, is the largest natural number dividing both - for example, $\gcd(30,24)=6$. If $\gcd(x,y)=1$, then $x$ and $y$ share no common factor except 1, and are called **relatively prime** or **coprime**.

### Theorem 5.2
Let $m,x$ be positive integers such that $\gcd(m,x)=1$. Then $x$ has a multiplicative inverse modulo $m$, and it is unique modulo $m$.

#### Proof
1. Consider the sequence of $m$ numbers $0,x,2x,\ldots,(m-1)x$. We claim that these are all distinct modulo $m$. 
2. Since there are only $m$ distinct values modulo $m$, it must then be the case that $ax\equiv1\pmod m$ for exactly one $a\pmod m$ - this $a$ is the unique multiplicative inverse of $x$. (Equivalently, multiplication by $x$ is a bijection between the integers mod $m$ and itself.)
3. To verify the claim: 
	- suppose for contradiction that $ax\equiv bx\pmod m$ for two distinct values $a,b$ with $0\leq b<a\leq m-1$. 
	- Then $(a-b)x\equiv0\pmod m$, i.e., $(a-b)x=km$ for some integer $k$. 
	- Since $x$ and $m$ are relatively prime, $x$ shares no factors with $m$, so $a-b$ must be an integer multiple of $m$. This is impossible, since $a-b$ ranges between 1 and $m-1$.
It also turns out that $\gcd(m,x)=1$ is a *necessary* condition for the existence of an inverse: if $\gcd(m,x)>1$, then $x$ has no multiplicative inverse modulo $m$.

> [!tip] Exercise
> Verify this claim. (Hint: assume for contradiction that $x$ does have an inverse, say $a$. Write down a non-modular equation that $x$, $m$, and $a$ must satisfy, then derive a contradiction from the fact that $x$ and $m$ have a common factor $d>1$.)

Since multiplicative inverses are unique when $\gcd(m,x)=1$, we write the inverse of $x$ as $x^{-1}\pmod m$. Computing multiplicative inverses efficiently is crucial to many applications; an extended version of Euclid's algorithm, which computes the gcd of two numbers, can be used to compute the multiplicative inverse, as the next note shows.

#academic/year-3/cs70/course-notes