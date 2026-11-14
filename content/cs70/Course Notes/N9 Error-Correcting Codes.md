---
title: N9 Error-Correcting Codes
Content Type: Course Notes
Content Area: Discrete Mathematics
description: "Reed-Solomon-style error-correcting codes built from polynomials over finite fields: recovering a message from erasure errors via Lagrange interpolation, a linear-algebra method for polynomial interpolation, and the Berlekamp-Welch algorithm for locating and correcting general (corruption) errors."
Course: CS 70
pinned: false
Date Published: September 26, 2026
Last Updated: October 1, 2026
Status: Finalized
---

# CS 70 Note 9 — Error-Correcting Codes

This note discusses transmitting messages across an unreliable communication channel, which may lose ("erase") packets or corrupt them. We will learn how to **encode** a message by introducing redundancy into it, protecting against both types of errors. Such a scheme is an **error-correcting code**. We focus on algebraic codes, and in particular so-called **Reed-Solomon codes**, which are built from the properties of polynomials over finite fields developed in the previous note.

## 1. Erasure Errors

Consider first the setting exemplified by the Internet, where information (say, a file) is broken into packets, and unreliability means that some packets are lost during transmission.

![[Pasted image 20260927172243.png]]

We refer to such errors as **erasure errors**. Suppose the message consists of $n$ packets and at most $k$ packets are lost during transmission. We will show how to encode the initial message of $n$ packets into a redundant encoding of $n+k$ packets such that the recipient can reconstruct the message from *any* $n$ received packets. In this setting the packets are labeled with headers, so the recipient knows exactly which packets were dropped.

We can assume without loss of generality that the content of each packet is a number modulo $q$, where $q$ is a prime. For example, the content of a packet might be a 32-bit string, regarded as a number between $0$ and $2^{32}-1$; then we could choose $q$ to be any prime larger than $2^{32}$. The properties of polynomials over $\mathrm{GF}(q)$ (i.e., with coefficients and values reduced modulo $q$) are perfectly suited to solving this problem and are the backbone of this error-correcting scheme.[^1]

To see this, denote the message to be sent by $m_1,\dots,m_n$, where each $m_i$ is a number in $\mathrm{GF}(q)$, and make the following observations.

1. There is a unique polynomial $P(x)$ of degree $n-1$ such that $P(i)=m_i$ for $1\le i\le n$ (i.e., $P(x)$ contains all of the information about the message, and evaluating $P(i)$ gives the intended contents of the $i$-th packet).
2. The message to be sent is now $m_1=P(1),\dots,m_n=P(n)$. We can generate additional packets by evaluating $P(x)$ at points $n+j$. (The transmitted codeword should be redundant, i.e., it should contain more packets than the original message, to account for lost packets. This is the distinction between a codeword and a message: a codeword is what is transmitted and has redundancy by construction, while the message is what the user gives us and does not necessarily contain any redundancy.) Thus the transmitted codeword is $c_1=P(1),c_2=P(2),\dots,c_{n+k}=P(n+k)$. Since we are working modulo $q$, we must have $n+k\le q$, but this does not impose a serious constraint since $q$ is assumed to be very large.
3. We can uniquely reconstruct $P(x)$ from its values at any $n$ distinct points, since it has degree $n-1$. So $P(x)$ can be reconstructed from *any* $n$ of the transmitted packets, not just the original $n$. Once $P$ is reconstructed, we can evaluate $P(x)$ at $x=1,\dots,n$ to recover the original message $m_1,\dots,m_n$.

**Example**: suppose Alice wants to send Bob a message of $n=4$ packets and wants to guard against $k=2$ lost packets. Assuming the packets can be coded as integers between $0$ and $6$, Alice can work over $\mathrm{GF}(7)$ (since $7\ge n+k=6$; in real applications we would work over a much larger field). Suppose the message is $m_1=3$, $m_2=1$, $m_3=5$, and $m_4=0$. The unique polynomial of degree $n-1=3$ described by these four points is $P(x)=x^3+4x^2+5$.

> [!tip] Exercise
> We derived this polynomial using Lagrange interpolation mod 7. Check this derivation, and verify also that indeed $P(i)=m_i$ for $1\le i\le4$.

Since $k=2$, Alice must evaluate $P(x)$ at two extra points: $P(5)=6$ and $P(6)=1$. Alice can transmit the codeword of $n+k=6$ packets, where $c_j=P(j)$ for $1\le j\le6$. So Alice sends $c_1=P(1)=3$, $c_2=P(2)=1$, $c_3=P(3)=5$, $c_4=P(4)=0$, $c_5=P(5)=6$, and $c_6=P(6)=1$.

Now suppose packets $2$ and $6$ are dropped.

![[Pasted image 20260927172320.png]]

From the values Bob received ($3$, $5$, $0$, and $6$, at positions $1$, $3$, $4$, $5$), he uses Lagrange interpolation and computes the following basis polynomials (everything interpreted mod $7$):

$$
\begin{aligned}
\Delta_1(x) &= \frac{(x-3)(x-4)(x-5)}{-24} \equiv 2(x-3)(x-4)(x-5) \pmod7 \\
\Delta_3(x) &= \frac{(x-1)(x-4)(x-5)}{4} \equiv 2(x-1)(x-4)(x-5) \pmod7 \\
\Delta_4(x) &= \frac{(x-1)(x-3)(x-5)}{-3} \equiv 2(x-1)(x-3)(x-5) \pmod7 \\
\Delta_5(x) &= \frac{(x-1)(x-3)(x-4)}{8} \equiv (x-1)(x-3)(x-4) \pmod7.
\end{aligned}
$$

(The inverses of $-24$, $4$, $-3$, and $8$ mod $7$ are $2$, $2$, $2$, and $1$ respectively.) He then reconstructs the polynomial

$$
P(x) = 3\cdot\Delta_1(x)+5\cdot\Delta_3(x)+0\cdot\Delta_4(x)+6\cdot\Delta_5(x) = x^3+4x^2+5 \pmod7.
$$

Bob then evaluates $m_2=P(2)=1$, the packet lost from the original codeword. More generally, no matter which two packets were dropped, following exactly the same method Bob can always reconstruct $P(x)$ and thus the original message.

> [!tip] Exercise
> Check Bob's calculation above, and verify that he really does reconstruct the correct polynomial, as claimed. Remember that all arithmetic must be done mod 7.

Consider what would happen if Alice sent one fewer packet. If Alice only sent $c_j$ for $1\le j\le n+k-1$, then with $k$ erasures, Bob would only receive $c_j$ for $n-1$ distinct values $j$. Bob would not be able to reconstruct $P(x)$, since there are $q$ polynomials of degree at most $n-1$ that agree with the $n-1$ packets Bob received. This error-correcting scheme is therefore optimal: it can recover the $n$ characters of the transmitted message from any $n$ received characters, but recovery from any smaller number is impossible.

---

## 2. Polynomial Interpolation Revisited

Let us take a brief digression to discuss another method of polynomial interpolation, different from the Lagrange interpolation discussed in the previous note, which will be useful in handling general errors. We need to make the underlying linear algebra more explicit so we can lean on it going forward.

Again, the goal is to take as input $d+1$ pairs $(x_1,y_1),\dots,(x_{d+1},y_{d+1})$, and output the polynomial $p(x)=a_dx^d+\cdots+a_1x+a_0$ such that $p(x_i)=y_i$ for $i=1$ to $d+1$.

The first step is to write a system of $d+1$ linear equations in $d+1$ variables: the variables are the coefficients of the polynomial, $a_0,\dots,a_d$. Each equation is obtained by fixing $x$ to be one of the $d+1$ values $x_1,\dots,x_{d+1}$. Note that in $p(x)$, $x$ is a variable and $a_0,\dots,a_d$ are fixed constants; in the equations below these roles are swapped — $x_i$ is a fixed constant and $a_0,\dots,a_d$ are variables. The $i$-th equation is the result of fixing $x$ to be $x_i$ and setting the value of the polynomial to $y_i$:

$$
a_dx_i^d + a_{d-1}x_i^{d-1} + \cdots + a_0 = y_i.
$$

Solving these equations gives the coefficients of $p(x)$. For example, suppose we are given the three pairs $(-1,2)$, $(0,1)$, and $(2,5)$; our goal is to construct the degree-2 polynomial $p(x)$ through these points. The first equation says $a_2(-1)^2+a_1(-1)+a_0=2$, i.e., $a_2-a_1+a_0=2$. The second says $a_2(0)^2+a_1(0)+a_0=1$, i.e., $a_0=1$. The third says $a_2(2)^2+a_1(2)+a_0=5$. So we get the system

$$
\begin{aligned}
a_2 - a_1 + a_0 &= 2 \\
a_0 &= 1 \\
4a_2 + 2a_1 + a_0 &= 5.
\end{aligned}
$$

Substituting for $a_0$ and multiplying the first equation by $2$:

$$
\begin{aligned}
2a_2 - 2a_1 &= 2 \\
4a_2 + 2a_1 &= 4.
\end{aligned}
$$

Adding the two equations, $6a_2=6$, so $a_2=1$, and plugging back in, $a_1=0$. Thus $p(x)=x^2+1$.

To justify this method more carefully, we must show that such systems of equations always have a solution and that it is unique. Fortunately, the work done in the previous note via Lagrange interpolation has already established this. This is one of the advantages of being able to look at the same problem from different angles.

---

## 3. General Errors

Return now to the main topic of error correction, and consider a more challenging scenario. Suppose Alice wishes to communicate with Bob over a noisy channel (say, via a modem). Her message is $m_1,\dots,m_n$, where the $m_i$'s are characters (either bytes or characters in the English alphabet). The problem is that some characters are *corrupted* during transmission due to channel noise. Bob receives exactly as many characters as Alice transmits, but $k$ of them are corrupted, and Bob has no idea which $k$ these are — think of these as corrupted by a malicious adversary limited only to corrupting no more than $k$ characters. Recovering from such general errors is more challenging than recovering from erasure errors, though again polynomials hold the key: Alice can still guard against $k$ general errors, at the expense of transmitting only $2k$ additional characters (twice as many as in the erasure case above).

We again think of each character as a number modulo $q$ for some prime $q$ (for the English alphabet, $q$ is some prime larger than $26$). As before, we describe the message by a polynomial $P(x)$ of degree $n-1$ over $\mathrm{GF}(q)$, such that $P(1)=m_1,\dots,P(n)=m_n$. To cope with errors, Alice transmits additional characters obtained by evaluating $P(x)$ at additional points. In order to guard against $k$ general errors, Alice must transmit $2k$ additional characters: the encoded codeword is $c_1,\dots,c_{n+2k}$ where $c_j=P(j)$ for $1\le j\le n+2k$, and we can assume that at least $n+k$ of the characters Bob receives are uncorrupted. As before, $q$ must be large enough that $q>n+2k$.

For example, if Alice wishes to send $n=4$ characters to Bob via a modem in which $k=1$ character is corrupted, she must redundantly send an encoded message of $6$ characters. Suppose she transmits the same message ($3150$) as in the erasure example above, and that $c_1$ is corrupted from $3$ to $2$.

![[Pasted image 20260927172342.png]]

From Bob's viewpoint, the problem of reconstructing Alice's message is the same as reconstructing $P(x)$ from the $n+2k$ received characters $r_1,r_2,\dots,r_{n+2k}$. That is, Bob is given $n+2k$ values modulo $q$, with the promise that there is a polynomial $P(x)$ of degree $n-1$ over $\mathrm{GF}(q)$ such that $P(i)=r_i$ for $n+k$ values of $i$ between $1$ and $n+2k$ (in the example above, $n+k=5$, and $r_2=P(2)=1$, $r_3=P(3)=5$, $r_4=P(4)=0$, $r_5=P(5)=6$, $r_6=P(6)=1$). Bob does not know which of the $n+k$ values are correct.

Does Bob even have sufficient information to reconstruct $P(x)$? First, there is at most one polynomial $P(x)$ of degree at most $n-1$ such that $P(i)=r_i$ for at least $n+k$ of the values $i$ between $1$ and $n+2k$. To see this, suppose $P(i)=r_i$ for $n+k$ points and $P'(i)=r_i$ on $n+k$ (possibly different) points. As there are only $n+2k$ points in total, these sets must overlap on $n$ points, so $P(i)=r_i=P'(i)$ for $n$ points, which forces them to be the same degree $n-1$ polynomial. Furthermore, the original polynomial has $P(i)=r_i$ for $n+k$ points, since there are at most $k$ errors. Thus $P(x)$ is the one and only polynomial consistent with Bob's information.

To summarize, Bob's task is to find a polynomial $P(x)$ of degree $n-1$ such that $P(i)=r_i$ for at least $n+k$ values of $i$. If he can do this, he can be sure that the polynomial he found is the original $P(x)$.

But how can Bob efficiently find such a polynomial? The issue is the locations of the $k$ errors. Let $e_1,\dots,e_k$ be the $k$ locations at which errors occurred (so $P(i)=r_i$ for all $i\notin\{e_1,\dots,e_k\}$). Bob doesn't know where these errors are, so he doesn't know $e_1,\dots,e_k$.

Bob could try to guess where the $k$ errors lie, but this would take exponential time. Instead, Bob employs a clever trick based on the **error-locator polynomial**

$$
E(x) = (x-e_1)(x-e_2)\cdots(x-e_k).
$$

$E(x)$ is a polynomial of degree $k$ (since $x$ appears $k$ times). Bob does not know this polynomial explicitly, since he doesn't know the positions $e_i$ of the errors — but he will use the polynomial symbolically, and will eventually compute the values $e_i$ that appear in it.

A simple but crucial observation about this polynomial:

$$
P(i)E(i) = r_iE(i) \qquad \text{for } 1\le i\le n+2k. \tag{1}
$$

This holds at points $i$ where no error occurred, since there $P(i)=r_i$; and it is trivially true at points $i$ where an error occurred, since then $E(i)=0$.

This observation is the basis of a clever algorithm invented by **Berlekamp and Welch**. The equalities in (1) can be made to correspond to $n+2k$ linear equations in $n+2k$ unknowns, from which the locations of the errors and coefficients of $P(x)$ can be deduced, in a fashion analogous to the interpolation scheme of the previous section.

Define $Q(x) := P(x)E(x)$, which has degree $n+k-1$ and is therefore described by $n+k$ coefficients $a_0,a_1,\dots,a_{n+k-1}$. The error-locator polynomial $E(x)=(x-e_1)\cdots(x-e_k)$ has degree $k$ and is described by $k+1$ coefficients $b_0,b_1,\dots,b_k$, but the leading coefficient $b_k$ (the coefficient of $x^k$) is always $1$. So we can write

$$
\begin{aligned}
Q(x) &= a_{n+k-1}x^{n+k-1} + a_{n+k-2}x^{n+k-2} + \cdots + a_1x + a_0; \\
E(x) &= x^k + b_{k-1}x^{k-1} + \cdots + b_1x + b_0.
\end{aligned}
$$

(We don't yet know any of the coefficients $a_i$ or $b_i$.) Substituting $Q(x)=P(x)E(x)$ into (1), we get the $n+2k$ equations $Q(i)=r_iE(i)$ for $1\le i\le n+2k$. Writing out the $i$-th equation using the coefficients of $Q(x)$ and $E(x)$:

$$
a_{n+k-1}i^{n+k-1} + a_{n+k-2}i^{n+k-2} + \cdots + a_1i + a_0 = r_i\left(i^k+b_{k-1}i^{k-1}+\cdots+b_1i+b_0\right) \pmod q.
$$

This is a set of $n+2k$ linear equations, one for each value of $i$, in the $n+2k$ unknowns $a_0,a_1,\dots,a_{n+k-1},b_0,b_1,\dots,b_{k-1}$. We can solve this system to get $E(x)$ and $Q(x)$, and then compute the ratio $Q(x)/E(x)$ to obtain $P(x)$. This is best illustrated by an example.

**Example**: suppose we are working over $\mathrm{GF}(7)$ and Alice wants to send Bob the $n=3$ characters "3," "0," and "6" over a modem. Using only the first seven letters of the alphabet, where $a=0,\dots,g=6$, the message Alice wishes for Bob to receive is "dag." Alice interpolates (e.g., using Lagrange) to find the polynomial

$$
P(x) = x^2+x+1,
$$

the unique degree-2 polynomial mod $7$ such that $P(1)=3$, $P(2)=0$, and $P(3)=6$.

Suppose Alice knows that up to $k=1$ character could be corrupted; she needs to transmit the $n+2k=5$ characters $P(1)=3$, $P(2)=0$, $P(3)=6$, $P(4)=0$, and $P(5)=3$ to Bob. Suppose $P(1)$ is actually corrupted, and Bob receives $2$ instead of $3$ (Alice sends "dagad" but Bob receives "cagad").

![[Pasted image 20260927172414.png]]

Let $E(x)=(x-e_1)=x+b_0$ be the error-locator polynomial (Bob doesn't yet know $e_1=-b_0$, since he doesn't know where the error occurred), and let $Q(x)=a_3x^3+a_2x^2+a_1x+a_0$ (again with unknown coefficients). Bob substitutes $i=1,2,\dots,5$ into $Q(i)=r_iE(i)$ from (1) and simplifies to get five linear equations in five unknowns (working mod $7$, with $r_i$ the value Bob received for the $i$-th character):

$$
\begin{aligned}
a_3+a_2+a_1+a_0+5b_0 &= 2 \\
a_3+4a_2+2a_1+a_0 &= 0 \\
6a_3+2a_2+3a_1+a_0+b_0 &= 4 \\
a_3+2a_2+4a_1+a_0 &= 0 \\
6a_3+4a_2+5a_1+a_0+4b_0 &= 1.
\end{aligned}
$$

Bob solves this linear system and finds $a_3=1$, $a_2=0$, $a_1=0$, $a_0=6$, and $b_0=6$ (all mod $7$). This gives $Q(x)=x^3+6$ and $E(x)=x+6=x-1$. (As a check, $E(x)=x-1$ means the error is at position $e_1=1$, correct since the first character was corrupted from "d" to "c".) He can then find $P(x)$ by computing the quotient

$$
P(x) = \frac{Q(x)}{E(x)} = \frac{x^3+6}{x-1} = x^2+x+1 \pmod7.
$$

Bob notices the first character was corrupted (since $e_1=1$), so now that he has $P(x)$, he computes $P(1)=3=$ "d" and obtains the original, uncorrupted message "dag."

> [!tip] Exercise
> Verify the derivation of the above system of equations from the equalities $Q(i)=r_iE(i)$ for $i=1,2,3,4,5$. Also, solve the equations (this is a little tedious, but not hard) and check that your solution agrees with the one above. Remember that all the arithmetic should be done mod 7.
> Worked solution: [[Solving a System of Linear Equations]].

> [!tip] Exercise
> Redo the example above for the case where the second character is corrupted from a "0" to a "5," and all other characters are uncorrupted.

### Finer Points

Two points need further discussion. How do we know that the $n+2k$ equations are *consistent*? What if they have no solution? This is simple: the equations must be consistent, since $Q(x)=P(x)E(x)$ together with the actual error-locator polynomial $E(x)$ gives a solution.

A more interesting question: how do we know the $n+2k$ equations are *independent*, i.e., that there aren't other spurious solutions in addition to the real one we are looking for? Put more mathematically, suppose the solution we construct is $Q'(x),E'(x)$; how do we know that $E'(x)$ divides $Q'(x)$ and that $Q'(x)/E'(x)=Q(x)/E(x)=P(x)$?

To see that this is true, note first that, based on our method for calculating $Q'(x),E'(x)$, we know $Q'(i)=r_iE'(i)$ for $1\le i\le n+2k$; and by definition, $Q(i)=r_iE(i)$ for the same values of $i$. Multiplying the first equation by $E(i)$ and the second by $E'(i)$, we get

$$
Q'(i)E(i) = Q(i)E'(i) \qquad \text{for } 1\le i\le n+2k, \tag{2}
$$

since both sides equal $r_iE(i)E'(i)$. Equation (2) tells us that the two polynomials $Q(x)E'(x)$ and $Q'(x)E(x)$ are equal at $n+2k$ points. But these two polynomials both have degree $n+2k-1$, so they are completely determined by their values at $n+2k$ points. Since they agree at $n+2k$ points, they must be the same polynomial, i.e., $Q(x)E'(x)=Q'(x)E(x)$ for all $x$.[^2] Now we may divide through by $E(x)E'(x)$ (which by construction is not the zero polynomial) to obtain

$$
\frac{Q'(x)}{E'(x)} = \frac{Q(x)}{E(x)} = P(x),
$$

which is what we wanted. Hence we can be sure that any solution we find is correct.

> [!tip] Exercise (Trickier)
> Is the solution $Q'(x),E'(x)$ always unique? The above analysis tells us that the ratio must always satisfy $Q'(x)/E'(x)=Q(x)/E(x)=P(x)$, but does not guarantee that $Q'(x)=Q(x)$ and $E'(x)=E(x)$.
> **Hint**: what happens in our example above when in fact none of the characters is corrupted (although Alice still assumes that $k=1$ character may be corrupted)? Try writing out and solving the equations in this case. You should get a whole family of solutions, one for each possible value $b_0\in\mathrm{GF}(7)$ (since in this scenario there is no error, $b_0$ is undetermined). The other values can then be written in terms of $b_0$: $a_3=1$; $a_2=1+b_0$; $a_1=1+b_0$; $a_0=b_0$. But no matter the value of $b_0$, the quotient
>
> $$
> \frac{Q(x)}{E(x)} = \frac{x^3+(1+b_0)x^2+(1+b_0)x+b_0}{x+b_0} = x^2+x+1,
> $$
>
> so we again recover $P(x)$, as we know we must by the argument above.

[^1]: In real-world implementations, we do not quite do this. Instead, we work directly in finite fields that have size $2^{32}$, because that is a prime power and working with fields that are a power of two in size is convenient for computer operations. The construction of such fields is beyond the scope of CS 70. However, the construction of the codes is the same as given here.
[^2]: This is a much stronger statement than (2). Equation (2) says that the *values* of the polynomials agree at certain points $i$; this statement says that the two polynomials are equal everywhere, i.e., they are the same polynomial.
