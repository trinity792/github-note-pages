---
title: "Chinese Remainder Theorem Approachs"
Content Type: Complementary Note
Content Area: 
Course: 
description:
pinned: false
Date Published: "October 11th, 2026 - 2:52 PM"
Last Updated: "October 11th, 2026 - 2:52 PM"
Status: Updating
---
# Chinese Remainder Theorem Approaches
For three congruences, using $k,t,s$ as in our examples:

$$
x\equiv a_1\pmod{n_1},\qquad
x\equiv a_2\pmod{n_2},\qquad
x\equiv a_3\pmod{n_3}.
$$

First check that $n_1,n_2,n_3$ are pairwise coprime. Let $N=n_1n_2n_3$.
## Approach 1: Combine Two Congruences at a Time

### 1. Substitute into the second congruence

Write $x=a_1+n_1k$. Substitute into the second congruence and subtract the constant:

$$  
n_1k\equiv a_2-a_1\pmod{n_2}.  
$$

### 2. Solve for $k$

Find the inverse of $n_1$ modulo $n_2$. Multiply both sides by it and reduce:

$$  
k\equiv n_1^{-1}(a_2-a_1)\equiv c\pmod{n_2}.  
$$

### 3. Combine the first two congruences

Write $k=c+n_2t$ and substitute back:

$$  
\begin{aligned}  
x&=a_1+n_1(c+n_2t)\  
&=a_1+n_1c+n_1n_2t.  
\end{aligned}  
$$

Define the **constant** $A=a_1+n_1c$. Then:

$$  
x=A+n_1n_2t.  
$$

Keep the factor $n_2$ in $k=c+n_2t$; it preserves the second congruence.

### 4. Substitute into the third congruence

$$  
\begin{aligned}  
A+n_1n_2t&\equiv a_3\pmod{n_3} \\  
n_1n_2t&\equiv a_3-A\pmod{n_3}.  
\end{aligned}  
$$

Reduce the coefficient and right-hand side modulo $n_3$. **Subtract the constant $A$, not the modulus $n_3$.**

### 5. Solve for $t$

Find the inverse of $n_1n_2$ modulo $n_3$. Multiply both sides by it and reduce:

$$  
t\equiv(n_1n_2)^{-1}(a_3-A)\equiv d\pmod{n_3}.  
$$

### 6. Substitute back and reduce

Write $t=d+n_3s$. Then:

$$  
\begin{aligned}  
x&=A+n_1n_2(d+n_3s)\  
&=A+n_1n_2d+Ns.  
\end{aligned}  
$$

Reduce $A+n_1n_2d$ modulo $N$ to obtain $r$, where $0\le r<N$. All integer solutions are:

$$  
x=r+Ns,\qquad s\in\mathbb Z.  
$$

The smallest nonnegative solution is $r$. If a positive solution is required and $r=0$, choose $N$.

Finally, check $r$ against all three original congruences.
## Approach 2: Construct the CRT basis

1. Calculate the products of the other two moduli:

   $$
   M_1=n_2n_3,\qquad M_2=n_1n_3,\qquad M_3=n_1n_2.
   $$

2. Find inverses $y_1,y_2,y_3$ such that

   $$
   M_1y_1\equiv1\pmod{n_1},\qquad
   M_2y_2\equiv1\pmod{n_2},\qquad
   M_3y_3\equiv1\pmod{n_3}.
   $$

3. Construct $b_1=M_1y_1$, $b_2=M_2y_2$, and $b_3=M_3y_3$. Each is $1$ modulo its own modulus and $0$ modulo the other two.
4. Calculate

   $$
   S=a_1b_1+a_2b_2+a_3b_3.
   $$

5. Reduce $S$ modulo $N$ to get the smallest nonnegative solution.

For either approach, if the reduced result is $r$, all solutions are $x=r+Ns$, where $s\in\mathbb Z$. If $r=0$ and you require a positive solution, choose $N$.

---

# Example
Solve the three congruences:

$$
x\equiv2\pmod3,\qquad
x\equiv1\pmod4,\qquad
x\equiv3\pmod5.
$$

The moduli $3,4,5$ are pairwise coprime. Let $N=3\cdot4\cdot5=60$.

## First approach: combine two at a time

1. Write $x=a_1+n_1k$. Substitute into the second congruence:

   $$
   x=2+3k,
   $$
   
   $$
   2+3k\equiv1\pmod4
   \quad\Longrightarrow\quad
   3k\equiv-1\equiv3\pmod4.
   $$

2. Multiply by the inverse of $n_1$ modulo $n_2$. Call the resulting remainder $c$:

   Since $3\cdot3\equiv1\pmod4$, the inverse is $3$.

   $$
   k\equiv3\cdot3=9\equiv1\pmod4.
   $$

   Thus $c=1$.

3. Write $k=c+n_2t$ and substitute back:

   $$
   k=1+4t,
   $$

   $$
   x=2+3(1+4t)=5+12t.
   $$

   Thus $A=5$ and $n_1n_2=12$.

4. Reduce & Substitute into the third congruence:

   $$
   5+12t\equiv3\pmod5
   \quad\Longrightarrow\quad
   2t\equiv3\pmod5.
   $$

   Here $5\equiv0\pmod5$ and $12\equiv2\pmod5$.

5. Multiply by the inverse of $n_1n_2$ modulo $n_3$. Call the resulting remainder $d$:

   Since $12\equiv2\pmod5$ and $2\cdot3\equiv1\pmod5$, the inverse is $3$.

   $$
   t\equiv3\cdot3=9\equiv4\pmod5.
   $$

   Thus $d=4$.

6. Write $t=d+n_3s$ and substitute back:

   $$
   t=4+5s,
   $$

   $$
   x=5+12(4+5s)=53+60s.
   $$

   Since $0\le53<60$, the smallest natural solution is $\boxed{x=53}$.

## Second approach: construct the CRT basis

1. Calculate the products of the other two moduli:

   $$
   M_1=4\cdot5=20,\qquad
   M_2=3\cdot5=15,\qquad
   M_3=3\cdot4=12.
   $$

2. Find inverses $y_1,y_2,y_3$ such that each $M_i y_i$ is congruent to $1$ modulo its corresponding modulus:

   $$
   \begin{aligned}
   20y_1&\equiv1\pmod3
   &&\Longrightarrow y_1=2,\\
   15y_2&\equiv1\pmod4
   &&\Longrightarrow y_2=3,\\
   12y_3&\equiv1\pmod5
   &&\Longrightarrow y_3=3.
   \end{aligned}
   $$

   These work because $20\cdot2=40\equiv1\pmod3$, $15\cdot3=45\equiv1\pmod4$, and $12\cdot3=36\equiv1\pmod5$.

3. Construct $b_1=M_1y_1$, $b_2=M_2y_2$, and $b_3=M_3y_3$:

   $$
   b_1=40,\qquad b_2=45,\qquad b_3=36.
   $$

   Each is $1$ modulo its own modulus and $0$ modulo the other two.

4. Multiply each basis number by its desired remainder and add:

   $$
   S=2(40)+1(45)+3(36)=80+45+108=233.
   $$

5. Reduce $S$ modulo $N$:

   $$
   233=3(60)+53
   \quad\Longrightarrow\quad
   x\equiv53\pmod{60}.
   $$

   The smallest natural solution is $\boxed{x=53}$.

For either approach, all integer solutions are $x=53+60s$, where $s\in\mathbb Z$. Taking $s=0$ gives $53$, while any negative integer $s$ gives a negative $x$.

Check all three congruences:

$$
53=3(17)+2=4(13)+1=5(10)+3.
$$