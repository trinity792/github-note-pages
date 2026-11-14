---
title: Extended Euclid
Content Type: Complementary Note
Content Area:
Course:
description:
pinned: false
Date Published: October 12th, 2026 - 1:31 PM
Last Updated: October 13th, 2026 - 6:46 PM
Status: Updating
---
# Extended Euclid’s Algorithm
## Method 0 Shortcut — Tracking $b$ Forward
This finds $y^{-1}\bmod x$ without substituting backward.
1. Complete $\gcd(x,y)$ until $(1,0)$.
2. Write a table with the columns $r$, $q$, and $b$.
3. Fill in the $r$ values, which are the $x$ values from the gcd process.
4. The first two rows of $q$ are "-", and the first two rows of $b$ are $0$ and $1$.
5. The equation for $q$ is $q_i=\left\lfloor \frac{r_{i-2}}{r_{i-1}}\right\rfloor$.
6. The equation for $b$ is $b_i=b_{i-2}-q_i\,b_{i-1}$.
7. The $b$ in the row where $r=1$ is $y^{-1}\bmod x$. Add $x$ if it is negative.

### Example: Find the inverse of 23 modulo 180
$\gcd(180,23)=\gcd(23,19)=\gcd(19,4)=\gcd(4,3)=\gcd(3,1)=\gcd(1,0)$

| $r$ | $q$ | $b$ |
|---|---|---|
| $180$ | - | $0$ |
| $23$ | - | $1$ |
| $19$ | $7$ | $0-7(1)=-7$ |
| $4$ | $1$ | $1-1(-7)=8$ |
| $3$ | $4$ | $-7-4(8)=-39$ |
| $1$ | $1$ | $8-1(-39)=47$ |

So $23^{-1}\equiv47\pmod{180}$.
### Example: Find the inverse of 12 modulo 35
$\gcd(35,12)=\gcd(12,11)=\gcd(11,1)=\gcd(1,0)$

| $r$ | $q$ | $b$ |
|---|---|---|
| $35$ | - | $0$ |
| $12$ | - | $1$ |
| $11$ | $2$ | $0-2(1)=-2$ |
| $1$ | $1$ | $1-1(-2)=3$ |

So $12^{-1}\equiv3\pmod{35}$.

---
## Method 1

Extended Euclid finds integers $a,b$ such that

$$  
\gcd(x,y)=ax+by.  
$$

### 1. Find the gcd by repeatedly taking remainders

Start with $x\ge y>0$. Replace each pair $(x,y)$ with $(y,x\bmod y)$:

$$  
\gcd(x,y)=\gcd(y,x\bmod y).  
$$

Continue until the second number is zero. If the original inputs are coprime, you reach $(1,0)$. Otherwise, you reach $(d,0)$, where $d=\gcd(x,y)$.

**Record every division equation along the way:**

$$  
x=qy+r,  
\qquad  
q=\left\lfloor\frac{x}{y}\right\rfloor,  
\qquad  
r=x\bmod y.  
$$

### 2. Rearrange each division equation

Write each nonzero remainder as a difference:

$$  
r=x-qy.  
$$

These equations let you replace remainders when working backward.

### 3. Start with the equation whose remainder is 1

For coprime inputs, use the **last equation with a nonzero remainder**, rearranged to isolate 1.

The final division with remainder zero confirms that the gcd is 1.

If the gcd is $d>1$, start by isolating $d$ instead. Extended Euclid still works, but neither input has an inverse modulo the other.

### 4. Substitute backward

Number the division equations **from the bottom upward**, starting with the last nonzero remainder:

$$  
\begin{aligned}  
r_1&=x_1-q_1y_1,\\  
r_2&=x_2-q_2y_2,\\  
r_3&=x_3-q_3y_3,\\ 
\vdots  
\end{aligned}  
$$

For coprime inputs, $r_1=1$. Consecutive equations satisfy $x_1=y_2$ and $y_1=r_2$.

Start with the final nonzero remainder equation and substitute the preceding remainder:

$$  
\begin{aligned}  
1  
&=x_1-q_1y_1 \\  
&=y_2-q_1r_2 \\  
&=y_2-q_1(x_2-q_2y_2) \\  
&=-q_1x_2+(1+q_1q_2)y_2.  
\end{aligned}  
$$

For the next substitution, use $x_2=y_3$ and $y_2=r_3$:

$$  
\begin{aligned}  
1  
&=-q_1y_3+(1+q_1q_2)r_3 \\  
&=-q_1y_3+(1+q_1q_2)(x_3-q_3y_3) \\  
&=(1+q_1q_2)x_3  
+\bigl[-q_1-q_3(1+q_1q_2)\bigr]y_3.  
\end{aligned}  
$$

**Continue substituting backward and collecting coefficients** until only the original inputs $x,y$ remain:

$$  
1=ax+by.  
$$

The resulting coefficients $a,b$ are the coefficients returned by extended Euclid. If the gcd is $d>1$, the same process gives $d=ax+by$.
### 5. Read off the inverse, if needed

From

$$  
1=ax+by,  
$$

reduce modulo $x$:

$$  
by\equiv1\pmod{x}.  
$$

Therefore, **the coefficient of $y$ is the inverse of $y$ modulo $x$**. Reduce $b$ modulo $x$ to obtain the smallest nonnegative representative.

Similarly, $a\bmod y$ is the inverse of $x$ modulo $y$.

### 6. Check the result

Verify the integer identity $ax+by=1$, then check the desired inverse by multiplication.

---
# Examples
## Method 1 Example: Find the inverse of 12 modulo 35

### 1. Compute the gcd

$$  
\gcd(35,12)  
=\gcd(12,11)  
=\gcd(11,1)  
=\gcd(1,0)  
=1.  
$$

Record the divisions:

$$  
\begin{aligned}  
35&=2(12)+11,\\
12&=1(11)+1,\\
11&=11(1)+0.  
\end{aligned}  
$$

### 2. Rearrange the nonzero remainder equations

$$  
\begin{aligned}  
11&=35-2(12),\\
1&=12-11.  
\end{aligned}  
$$

### 3. Start from 1 and substitute backward

$$  
\begin{aligned}  
1  
&=12-11\\
&=12-\bigl(35-2(12)\bigr)\\
&=-35+3(12).  
\end{aligned}  
$$

Thus the coefficients of the original inputs $(35,12)$ are $(-1,3)$.

### 4. Read off the inverse and check

The coefficient of 12 is 3, so

$$  
\boxed{12^{-1}\equiv3\pmod{35}}.  
$$

Check:

$$  
12(3)=36\equiv1\pmod{35}.  
$$
## Method 1 Example: Find the inverse of 23 modulo 180

### 1. Compute the gcd

$$
\gcd(180,23)
=\gcd(23,19)
=\gcd(19,4)
=\gcd(4,3)
=\gcd(3,1)
=\gcd(1,0)
=1.
$$

Record the divisions:

$$
\begin{aligned}
180&=7(23)+19,\\
23&=1(19)+4,\\
19&=4(4)+3,\\
4&=1(3)+1,\\
3&=3(1)+0.
\end{aligned}
$$

### 2. Rearrange the nonzero remainder equations

Number them **from the bottom upward**:

$$
\begin{aligned}
r_1=1&=4-1(3),\\
r_2=3&=19-4(4),\\
r_3=4&=23-1(19),\\
r_4=19&=180-7(23).
\end{aligned}
$$

The last nonzero remainder equation has the form
$r_1=x_1-q_1y_1$, with $x_1=4$, $q_1=1$, and $y_1=3$.

### 3. Substitute backward

Start with $r_1=1$ and replace each remainder using the next equation:

$$
\begin{aligned}
1
&=4-3\\
&=4-\bigl(19-4(4)\bigr)\\
&=5(4)-19\\
&=5\bigl(23-19\bigr)-19\\
&=5(23)-6(19)\\
&=5(23)-6\bigl(180-7(23)\bigr)\\
&=47(23)-6(180).
\end{aligned}
$$

Only the original inputs remain:

$$
1=-6(180)+47(23).
$$

### 4. Read off the inverse

Reduce modulo 180:

$$
47(23)\equiv1\pmod{180}.
$$

The coefficient of 23 is 47, so

$$
\boxed{23^{-1}\equiv47\pmod{180}}.
$$

### 5. Check

$$
23(47)=1081=6(180)+1.
$$

Therefore, $23(47)\equiv1\pmod{180}$.

---

