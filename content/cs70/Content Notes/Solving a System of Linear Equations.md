---
title: Solving a System of Linear Equations
Content Type: Complementary Note
Content Area: Discrete Mathematics
description: "Step-by-step solutions to the five-equation, mod-7 linear system from the Berlekamp-Welch example in Note 9 - by targeted elimination and substitution, and by Gaussian elimination on the augmented matrix - plus a check of the answer and the division that recovers P(x)."
Course: CS70
pinned: false
Date Published: October 1, 2026
Last Updated: October 1, 2026
Status: Finalized
---

# Solving a System of Linear Equations

This note works through the linear system in the Berlekamp-Welch example of [[N9 Error-Correcting Codes|Note 9]] (Section 3, "General Errors"), which the note solves in one sentence: "Bob solves this linear system and finds..." Here are the steps behind that sentence, done two ways, followed by a check of the answer and the polynomial division that finishes the decoding.

---

## The System and Where It Comes From

Alice sends "dagad" ($3,0,6,0,3$) over $\mathrm{GF}(7)$, and Bob receives "cagad", so his received values are $r_1,\dots,r_5 = 2,0,6,0,3$. With $k=1$ error, the unknowns are the four coefficients of $Q(x)=a_3x^3+a_2x^2+a_1x+a_0$ and the one free coefficient of $E(x)=x+b_0$. Each received point gives one equation $Q(i)=r_iE(i)$:

| $i$ | $r_i$ | $Q(i)=r_i(i+b_0)$ | Reduced mod 7, with $b_0$ moved left |
|---|---|---|---|
| 1 | 2 | $a_3+a_2+a_1+a_0 = 2+2b_0$ | $a_3+a_2+a_1+a_0+5b_0 = 2$ |
| 2 | 0 | $8a_3+4a_2+2a_1+a_0 = 0$ | $a_3+4a_2+2a_1+a_0 = 0$ |
| 3 | 6 | $27a_3+9a_2+3a_1+a_0 = 18+6b_0$ | $6a_3+2a_2+3a_1+a_0+b_0 = 4$ |
| 4 | 0 | $64a_3+16a_2+4a_1+a_0 = 0$ | $a_3+2a_2+4a_1+a_0 = 0$ |
| 5 | 3 | $125a_3+25a_2+5a_1+a_0 = 15+3b_0$ | $6a_3+4a_2+5a_1+a_0+4b_0 = 1$ |

Moving $-2b_0$ to the left gives $+5b_0$ because $-2 \equiv 5 \pmod 7$; likewise $-6 \equiv 1$ and $-3 \equiv 4$. This produces the system from Note 9, with its equations labeled $E_1$ through $E_5$:

$$
\begin{aligned}
E_1:&\quad a_3+a_2+a_1+a_0+5b_0 = 2 \\
E_2:&\quad a_3+4a_2+2a_1+a_0 = 0 \\
E_3:&\quad 6a_3+2a_2+3a_1+a_0+b_0 = 4 \\
E_4:&\quad a_3+2a_2+4a_1+a_0 = 0 \\
E_5:&\quad 6a_3+4a_2+5a_1+a_0+4b_0 = 1.
\end{aligned}
$$

---

## Arithmetic Mod 7

Both methods use ordinary elimination, but every number lives in $\mathrm{GF}(7)$. Addition, subtraction, and multiplication work as usual, followed by reducing mod 7. Division does not exist as such: to "divide by $c$," multiply by $c^{-1}$, the number with $c \cdot c^{-1} \equiv 1 \pmod 7$.

| $c$ | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| $c^{-1} \bmod 7$ | 1 | 4 | 5 | 2 | 3 | 6 |
| $-c \bmod 7$ | 6 | 5 | 4 | 3 | 2 | 1 |

> [!important] Two habits that prevent most mistakes
> Reduce after every operation, so numbers never grow past 6. And when a step needs a negative coefficient, use its positive equivalent: subtracting $6R_1$ is the same as adding $R_1$, since $-6 \equiv 1$.

---

## Method 1 — Targeted Elimination and Substitution

This method looks at the system's shape and picks the cheapest moves. Every equation contains $a_0$ with coefficient $1$, and $E_2$ and $E_4$ contain no $b_0$ at all, so subtracting pairs of equations removes variables quickly.

### Step 1: Remove $a_0$ by subtracting pairs

Subtract each equation from a neighbor. Since $a_0$ appears with coefficient $1$ everywhere, it cancels every time, leaving four equations in four unknowns:

$$
\begin{aligned}
E_1-E_2:&\quad -3a_2 - a_1 + 5b_0 = 2 &&\Rightarrow\quad 4a_2+6a_1+5b_0 = 2 \\
E_3-E_2:&\quad 5a_3 - 2a_2 + a_1 + b_0 = 4 &&\Rightarrow\quad 5a_3+5a_2+a_1+b_0 = 4 \\
E_5-E_4:&\quad 5a_3+2a_2+a_1+4b_0 = 1 \\
E_2-E_4:&\quad 2a_2 - 2a_1 = 0.
\end{aligned}
$$

### Step 2: Solve the shortest equation

$E_2-E_4$ has only two variables. Multiply it by $2^{-1}=4$:

$$
a_2 - a_1 = 0 \quad\Rightarrow\quad a_2 = a_1.
$$

### Step 3: Substitute $a_2 = a_1$

Replacing $a_2$ with $a_1$ in the other three equations, and naming the results $D_1$, $D_2$, and $D_3$:

$$
\begin{aligned}
D_1:&\quad 4a_1+6a_1+5b_0 = 2 &&\Rightarrow\quad 3a_1+5b_0 = 2 \\
D_2:&\quad 5a_3+5a_1+a_1+b_0 = 4 &&\Rightarrow\quad 5a_3+6a_1+b_0 = 4 \\
D_3:&\quad 5a_3+2a_1+a_1+4b_0 = 1 &&\Rightarrow\quad 5a_3+3a_1+4b_0 = 1.
\end{aligned}
$$

### Step 4: Remove $a_3$

$D_2$ and $D_3$ both contain $5a_3$, so subtracting them removes it:

$$
D_3-D_2:\quad -3a_1 + 3b_0 = -3.
$$

Multiply by $3^{-1}=5$ (and $15 \equiv 1$):

$$
-a_1 + b_0 = -1 \quad\Rightarrow\quad b_0 = a_1 - 1 = a_1 + 6.
$$

### Step 5: Solve for $a_1$, then $b_0$ and $a_2$

Substitute $b_0 = a_1+6$ into $D_1$:

$$
\begin{aligned}
3a_1 + 5(a_1+6) &= 2 \\
8a_1 + 30 &= 2 \\
a_1 + 2 &= 2 \qquad (8 \equiv 1,\ 30 \equiv 2) \\
a_1 &= 0.
\end{aligned}
$$

So $a_1=0$, $b_0 = 0+6 = 6$, and $a_2 = a_1 = 0$.

### Step 6: Solve for $a_3$

Substitute into $D_2$:

$$
5a_3 + 6(0) + 6 = 4 \quad\Rightarrow\quad 5a_3 = -2 \equiv 5 \quad\Rightarrow\quad a_3 = 5 \cdot 5^{-1} = 1.
$$

### Step 7: Solve for $a_0$

Go back to any original equation that contains $a_0$. $E_2$ is the simplest:

$$
a_3+4a_2+2a_1+a_0 = 0 \quad\Rightarrow\quad 1 + a_0 = 0 \quad\Rightarrow\quad a_0 = -1 \equiv 6.
$$

> [!success] Result
> $a_3=1$, $a_2=0$, $a_1=0$, $a_0=6$, $b_0=6$, matching Note 9.

---

## Method 2 — Gaussian Elimination on the Augmented Matrix

Gaussian elimination is the same idea made mechanical, so it works on any system without spotting shortcuts. Write the coefficients as an augmented matrix, then use three row operations - swap two rows, multiply a row by a nonzero number, add a multiple of one row to another - to reach upper-triangular (row echelon) form. Then solve from the bottom up. Columns are in the order $a_3, a_2, a_1, a_0, b_0$, and $R_i$ is row $i$.

### Step 1: Write the augmented matrix

$$
\left[\begin{array}{ccccc|c}
1 & 1 & 1 & 1 & 5 & 2 \\
1 & 4 & 2 & 1 & 0 & 0 \\
6 & 2 & 3 & 1 & 1 & 4 \\
1 & 2 & 4 & 1 & 0 & 0 \\
6 & 4 & 5 & 1 & 4 & 1
\end{array}\right]
$$

### Step 2: Clear column 1 (the $a_3$ column)

The pivot is the $1$ in $R_1$. Clear everything below it, using $-6 \equiv 1$ for rows 3 and 5:

$$
R_2 \leftarrow R_2 - R_1, \qquad R_3 \leftarrow R_3 + R_1, \qquad R_4 \leftarrow R_4 - R_1, \qquad R_5 \leftarrow R_5 + R_1
$$

$$
\left[\begin{array}{ccccc|c}
1 & 1 & 1 & 1 & 5 & 2 \\
0 & 3 & 1 & 0 & 2 & 5 \\
0 & 3 & 4 & 2 & 6 & 6 \\
0 & 1 & 3 & 0 & 2 & 5 \\
0 & 5 & 6 & 2 & 2 & 3
\end{array}\right]
$$

For example, $R_3 + R_1 = [6+1,\ 2+1,\ 3+1,\ 1+1,\ 1+5 \mid 4+2] = [7,\ 3,\ 4,\ 2,\ 6 \mid 6] \equiv [0,\ 3,\ 4,\ 2,\ 6 \mid 6]$.

### Step 3: Clear column 2 (the $a_2$ column)

$R_4$ already has a $1$ in column 2, so swap it into the pivot position to avoid scaling. Then clear below:

$$
R_2 \leftrightarrow R_4, \qquad\text{then}\qquad R_3 \leftarrow R_3 - 3R_2, \qquad R_4 \leftarrow R_4 - 3R_2, \qquad R_5 \leftarrow R_5 - 5R_2
$$

$$
\left[\begin{array}{ccccc|c}
1 & 1 & 1 & 1 & 5 & 2 \\
0 & 1 & 3 & 0 & 2 & 5 \\
0 & 0 & 2 & 2 & 0 & 5 \\
0 & 0 & 6 & 0 & 3 & 4 \\
0 & 0 & 5 & 2 & 6 & 6
\end{array}\right]
$$

For example, $R_3 - 3R_2 = [0,\ 3-3,\ 4-9,\ 2-0,\ 6-6 \mid 6-15] = [0,\ 0,\ -5,\ 2,\ 0 \mid -9] \equiv [0,\ 0,\ 2,\ 2,\ 0 \mid 5]$.

### Step 4: Clear column 3 (the $a_1$ column)

The pivot is $2$. Scale it to $1$ by multiplying by $2^{-1}=4$, then clear below, using $-6 \equiv 1$ and $-5 \equiv 2$:

$$
R_3 \leftarrow 4R_3, \qquad\text{then}\qquad R_4 \leftarrow R_4 + R_3, \qquad R_5 \leftarrow R_5 + 2R_3
$$

$$
\left[\begin{array}{ccccc|c}
1 & 1 & 1 & 1 & 5 & 2 \\
0 & 1 & 3 & 0 & 2 & 5 \\
0 & 0 & 1 & 1 & 0 & 6 \\
0 & 0 & 0 & 1 & 3 & 3 \\
0 & 0 & 0 & 4 & 6 & 4
\end{array}\right]
$$

Scaling gives $4 \cdot [0,0,2,2,0 \mid 5] = [0,0,8,8,0 \mid 20] \equiv [0,0,1,1,0 \mid 6]$.

### Step 5: Clear column 4 (the $a_0$ column)

The pivot is already $1$. Clear the $4$ below it with $R_5 - 4R_4$, written as $R_5 + 3R_4$ since $-4 \equiv 3$:

$$
R_5 \leftarrow R_5 + 3R_4 = [0,\ 0,\ 0,\ 4+3,\ 6+9 \mid 4+9] \equiv [0,\ 0,\ 0,\ 0,\ 1 \mid 6]
$$

$$
\left[\begin{array}{ccccc|c}
1 & 1 & 1 & 1 & 5 & 2 \\
0 & 1 & 3 & 0 & 2 & 5 \\
0 & 0 & 1 & 1 & 0 & 6 \\
0 & 0 & 0 & 1 & 3 & 3 \\
0 & 0 & 0 & 0 & 1 & 6
\end{array}\right]
$$

The matrix is now upper triangular with every pivot equal to $1$.

### Step 6: Back substitution

Read the rows from the bottom up. Each row has exactly one new unknown:

$$
\begin{aligned}
R_5:&\quad b_0 = 6 \\
R_4:&\quad a_0 + 3b_0 = 3 &&\Rightarrow\quad a_0 = 3 - 18 = -15 \equiv 6 \\
R_3:&\quad a_1 + a_0 = 6 &&\Rightarrow\quad a_1 = 6 - 6 = 0 \\
R_2:&\quad a_2 + 3a_1 + 2b_0 = 5 &&\Rightarrow\quad a_2 = 5 - 0 - 12 = -7 \equiv 0 \\
R_1:&\quad a_3 + a_2 + a_1 + a_0 + 5b_0 = 2 &&\Rightarrow\quad a_3 = 2 - 0 - 0 - 6 - 30 = -34 \equiv 1.
\end{aligned}
$$

> [!success] Result
> The same solution: $a_3=1$, $a_2=0$, $a_1=0$, $a_0=6$, $b_0=6$.

---

## Checking the Answer

Substituting the solution into every original equation catches arithmetic slips, which are easy to make mod 7:

| Equation | Left side with $(a_3,a_2,a_1,a_0,b_0)=(1,0,0,6,6)$ | Mod 7 | Expected |
|---|---|---|---|
| $E_1$ | $1+0+0+6+30 = 37$ | 2 | 2 ✓ |
| $E_2$ | $1+0+0+6 = 7$ | 0 | 0 ✓ |
| $E_3$ | $6+0+0+6+6 = 18$ | 4 | 4 ✓ |
| $E_4$ | $1+0+0+6 = 7$ | 0 | 0 ✓ |
| $E_5$ | $6+0+0+6+24 = 36$ | 1 | 1 ✓ |

---

## From the Solution to $P(x)$

The solution gives $Q(x) = x^3+6$ and $E(x) = x+6 = x-1$, so the error is at position $e_1 = 1$. To divide $Q(x)$ by $x-1$, synthetic division is quickest: write the coefficients of $Q$ (including zeros for the missing $x^2$ and $x$ terms), bring the first one down, then repeatedly multiply by the root $1$ and add to the next coefficient.

$$
\begin{array}{c|cccc}
1 & 1 & 0 & 0 & 6 \\
  &   & 1 & 1 & 1 \\
\hline
  & 1 & 1 & 1 & 7
\end{array}
$$

The last entry is the remainder, $7 \equiv 0$, so $x-1$ divides $Q(x)$ exactly, as the Finer Points section of Note 9 guarantees. The quotient's coefficients are $1, 1, 1$:

$$
P(x) = \frac{x^3+6}{x-1} = x^2+x+1 \pmod 7.
$$

Bob then corrects the bad position: $P(1) = 3 =$ "d", recovering "dag."

---

## Which Method to Use

The two methods do the same algebra. They differ in how much judgment they ask for.

| Method | Strength | Weakness |
|---|---|---|
| Targeted elimination and substitution | Fewest operations when the system has visible structure, like the shared $a_0$ and the $b_0$-free equations here. | Requires spotting the structure; on a dense system it can wander. |
| Gaussian elimination | Fully mechanical, works on any system, and the steps are easy to check row by row. | More bookkeeping by hand, since every entry of every row is updated. |

> [!note] Why not Cramer's rule or a matrix inverse?
> Both are valid over $\mathrm{GF}(7)$, as long as every division becomes a multiplication by an inverse. By hand, though, they need several $5 \times 5$ determinants or a full inverse, which is far more work than one pass of elimination.
