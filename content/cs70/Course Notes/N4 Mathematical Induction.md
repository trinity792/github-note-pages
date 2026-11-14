---
title: N4 Mathematical Induction
Content Type: Course Notes
Content Area: Discrete Mathematics
description: Proof by mathematical induction, including base cases and inductive steps, strengthening the induction hypothesis, simple versus strong induction, and the connection between induction and recursively defined algorithms.
Course: CS 70
pinned: false
Date Published: September 14, 2026
Last Updated: September 14, 2026
Status: Finalized
---

# CS 70 Note 4 — Mathematical Induction
Many mathematical statements assert that a property holds for every natural number. Since there are infinitely many natural numbers, checking each one individually is impossible. This note introduces **mathematical induction**, a proof technique that establishes such statements by finite means. It covers the base case and inductive step, strengthening the induction hypothesis when the obvious statement is too weak to prove, the relationship between simple and strong induction, and the close connection between induction and recursively defined algorithms.

## 1. Mathematical Induction
Suppose we wish to prove the statement: for all natural numbers $n$,

$$
0+1+2+3+\cdots+n=\frac{n(n+1)}{2}.
$$

More formally, using the universal quantifier,

$$
\forall n\in\mathbb{N},\quad\sum_{i=0}^{n}i=\frac{n(n+1)}{2}.
$$

How would you prove this? You could begin by checking that it holds for $n=0,1,2,\ldots$, but there are infinitely many values of $n$ to check. Moreover, checking only the first few values does not suffice to conclude that a statement holds for all $n$, as the following example demonstrates.

> [!tip] Concept Check
> Consider the statement $\forall n\in\mathbb{N},\ n^2-n+41$ is a prime number. Check that it holds for the first few natural numbers - you could check all the way up to $n=40$ without finding a counterexample. Now check the case $n=41$.

Induction circumvents this problem with an observation: suppose the statement holds for some value $n=k$, i.e.,

$$
\sum_{i=0}^{k}i=\frac{k(k+1)}{2}.
$$

This is called the **induction hypothesis**. Then

$$
\left(\sum_{i=0}^{k}i\right)+(k+1)=\frac{k(k+1)}{2}+(k+1)=\frac{(k+1)(k+2)}{2},
$$

so the claim also holds for $n=k+1$. This argument is called the **inductive step**. It is powerful: if the statement holds for $k$, the inductive step lets us conclude it also holds for $k+1$; but now that it holds for $k+1$, the inductive step implies it holds for $k+2$; and so on, indefinitely, for all $n\geq k$.

This is almost a proof of the original claim. The missing piece is that applying the inductive step first requires establishing the statement for some initial value of $k$. Since the goal is to prove the statement for all natural numbers, the obvious choice is $k=0$. This choice is called the **base case**. If the base case holds, the axiom of mathematical induction says that the inductive step lets us conclude that the statement holds for all $n\in\mathbb{N}$.

### Theorem 4.1
$\displaystyle\forall n\in\mathbb{N},\quad\sum_{i=0}^{n}i=\frac{n(n+1)}{2}.$

#### Proof
We proceed by induction on $n$.

**Base case** ($n=0$): $\displaystyle\sum_{i=0}^{0}i=0=\frac{0(0+1)}{2}$, so the base case holds.

**Induction hypothesis:** For arbitrary $n=k\geq0$, assume that $\displaystyle\sum_{i=0}^{k}i=\frac{k(k+1)}{2}$.

**Inductive step:** We show the statement for $n=k+1$, i.e., that $\displaystyle\sum_{i=0}^{k+1}i=\frac{(k+1)(k+2)}{2}$:

$$
\begin{aligned}
\sum_{i=0}^{k+1}i
&=\left(\sum_{i=0}^{k}i\right)+(k+1) \\
&=\frac{k(k+1)}{2}+(k+1) \\
&=\frac{k(k+1)+2(k+1)}{2} \\
&=\frac{(k+1)(k+2)}{2},
\end{aligned}
$$

where the second equality follows from the induction hypothesis. By the principle of mathematical induction, the claim follows.

> [!tip] Concept Check
> How exactly did the induction hypothesis help show the third equality above? (Hint: it was used to replace $\sum_{i=0}^{k}i$ with something useful.)

Letting $P(n)$ denote the statement $\sum_{i=0}^{n}i=\frac{n(n+1)}{2}$, the goal was to prove $\forall n\in\mathbb{N},\,P(n)$. The principle of induction reduces this to three steps:

1. **Base case:** Prove that $P(0)$ is true.
2. **Induction hypothesis:** For arbitrary $k\geq0$, assume that $P(k)$ is true.
3. **Inductive step:** Using the induction hypothesis, show that $P(k+1)$ is true.

These three steps fit together like a line of dominoes numbered $0,1,2,\ldots,n$, arranged so that if the $k$th domino falls, it knocks over the $(k+1)$st. Knocking over the $k$th domino corresponds to proving $P(k)$, and the inductive step corresponds to arranging the dominoes so that each fallen domino knocks over the next one. The base case knocks over the $0$th domino, setting off a chain reaction that knocks down every domino in the line.

Here $k=0$ was chosen as the base case, but in general the choice of base case depends on the claim being proved.

### Theorem 4.2
For all $n\in\mathbb{N}$, $n^3-n$ is divisible by $3$.

#### Proof
We proceed by induction on $n$. Let $P(n)$ denote the statement that $n^3-n$ is divisible by $3$.

**Base case** ($n=0$): $P(0)$ asserts that $3\mid(0^3-0)$, i.e., $3\mid0$, which is true since any nonzero integer divides $0$.

**Induction hypothesis:** Assume for $n=k\geq0$ that $P(k)$ is true, i.e., $k^3-k=3q$ for some integer $q$.

**Inductive step:** We show $P(k+1)$ is true, i.e., that $3\mid((k+1)^3-(k+1))$. Expanding,

$$
\begin{aligned}
(k+1)^3-(k+1)
&=k^3+3k^2+3k+1-(k+1) \\
&=(k^3-k)+3k^2+3k \\
&=3q+3(k^2+k) \quad\text{(by the induction hypothesis)} \\
&=3(q+k^2+k).
\end{aligned}
$$

We conclude that $3\mid((k+1)^3-(k+1))$. Thus, by the principle of induction, $\forall n\in\mathbb{N},\,3\mid(n^3-n)$.

> [!tip] Concept Check
> How exactly did the induction hypothesis help show the third equality in the derivation above?

### Theorem 4.3 — Two-Color Theorem
Consider a more advanced proof by induction, which establishes a simplified version of the famous four-color theorem. The four-color theorem states that any map can be colored with four colors so that any two adjacent countries have different colors. It is very difficult to prove - several bogus proofs were claimed after the problem was first posed in 1852, and it was not until 1976 that a computer-assisted proof was given by Appel and Haken.

Here we consider a simpler version, where the "map" is a rectangle divided into regions by straight lines, each of which divides the rectangle into two regions. Can such a map always be colored using no more than two colors (say, red and blue) so that no two bordering regions share a color? For example, a rectangle divided by two crossing lines into four regions can be colored so that the two regions on either side of each line differ in color, alternating red and blue around the crossing point.

Let $P(n)$ denote the statement "any map of the above form with $n$ lines is two-colorable." Then $\forall n\in\mathbb{N},\,P(n)$.

#### Proof
We proceed by induction on $n$.

**Base case** ($n=0$): $P(0)$ clearly holds, since with $n=0$ lines the entire map can be colored using a single color.

**Induction hypothesis:** For some arbitrary $n=k\geq0$, assume $P(k)$.

**Inductive step:** We prove $P(k+1)$. We are given a map with $k+1$ lines and wish to show it can be two-colored. Consider what happens if we remove one line. With only $k$ lines remaining, the induction hypothesis says the map can be two-colored. Now observe that if we swap red and blue throughout a valid coloring, it remains a valid coloring. Using this fact, place the removed line back, leave the colors on one side of it unchanged, and swap red and blue on the other side. We claim this is a valid two-coloring of the map with $k+1$ lines.

Consider any two regions separated by a shared border. Either the shared border is the line that was removed and replaced, or it is one of the original $k$ lines. In the first case, the colors were flipped on exactly one side of this line by construction, so the two regions have distinct colors. In the second case, the induction hypothesis guarantees that regions separated by one of the first $k$ lines have different colors, and this property is preserved because the swap was applied uniformly on one side of the new line. In both cases, the regions on either side of a shared border have distinct colors, as required.

---

## 2. Strengthening the Induction Hypothesis
Choosing the correct statement to prove can be critical when using induction. Suppose we wish to prove: for all $n\geq1$, the sum of the first $n$ odd numbers is a perfect square.

A first attempt proceeds by induction on $n$. The base case ($n=1$) holds because the first odd number, $1$, is a perfect square. The induction hypothesis assumes that the sum of the first $k$ odd numbers is a perfect square, say $m^2$. In the inductive step, the $(k+1)$st odd number is $2k+1$, so by the induction hypothesis the sum of the first $k+1$ odd numbers is $m^2+2k+1$. But now the proof is stuck: there is no reason $m^2+2k+1$ should be a perfect square. The induction hypothesis is too weak - it does not give enough structure to say anything meaningful about the $k+1$ case.

Checking the first few cases uncovers hidden structure:

- $n=1$: $1=1^2$ is a perfect square.
- $n=2$: $1+3=4=2^2$ is a perfect square.
- $n=3$: $1+3+5=9=3^2$ is a perfect square.
- $n=4$: $1+3+5+7=16=4^2$ is a perfect square.

The sum of the first $n$ odd numbers is not just a perfect square - it is equal precisely to $n^2$. Motivated by this, we try the counterintuitive step of proving the following *stronger* claim.

### Theorem 4.4
For all $n\geq1$, the sum of the first $n$ odd numbers is $n^2$.

#### Proof
We proceed by induction on $n$.

**Base case** ($n=1$): The first odd number is $1$, which equals $1^2$.

**Induction hypothesis:** Assume that the sum of the first $k$ odd numbers is $k^2$.

**Inductive step:** The $(k+1)$st odd number is $2k+1$. Applying the induction hypothesis, the sum of the first $k+1$ odd numbers is $k^2+(2k+1)=(k+1)^2$. Thus, by the principle of induction, the theorem holds.

So the original statement could not be proved, but a stronger one could. The original claim did not capture the true structure of the underlying fact and was too vague, so its induction hypothesis was not strong enough. The stronger claim has more structure - not just that the sum of the first $k$ odd numbers is a perfect square, but that it equals $k^2$ exactly - and that additional structure is exactly what the inductive step needed. A claim being true is not enough; the precise formulation of the induction hypothesis can determine whether the proof succeeds.

Consider a second example: for all $n\geq1$, $\sum_{i=1}^{n}\frac{1}{i^2}\leq2$.

> [!tip] Concept Check
> The "obvious" induction hypothesis assumes that for $n=k$, $\sum_{i=1}^{k}\frac{1}{i^2}\leq2$. Why does this not suffice to show that $\sum_{i=1}^{k}\frac{1}{i^2}+\frac{1}{(k+1)^2}\leq2$? (Hint: is it possible that $\sum_{i=1}^{k}\frac{1}{i^2}$ actually equals $2$?)

Again, strengthening the induction hypothesis resolves the difficulty.

### Theorem 4.5
For all $n\geq1$,

$$
\sum_{i=1}^{n}\frac{1}{i^2}\leq2-\frac{1}{n}.
$$

#### Proof
We proceed by induction on $n$.

**Base case** ($n=1$): $\displaystyle\sum_{i=1}^{1}\frac{1}{i^2}=1\leq2-\frac{1}{1}$, as required.

**Induction hypothesis:** Assume the claim holds for $n=k$.

**Inductive step:** By the induction hypothesis,

$$
\sum_{i=1}^{k+1}\frac{1}{i^2}=\sum_{i=1}^{k}\frac{1}{i^2}+\frac{1}{(k+1)^2}\leq2-\frac{1}{k}+\frac{1}{(k+1)^2}.
$$

Thus, to prove the claim, it suffices to show that

$$
2-\frac{1}{k}+\frac{1}{(k+1)^2}\leq2-\frac{1}{k+1},
$$

which holds for all $k\geq0$.

> [!tip] Exercise
> Use simple algebra to show that $2-\frac{1}{k}+\frac{1}{(k+1)^2}\leq2-\frac{1}{k+1}$ holds for all $k\geq0$.

By the principle of mathematical induction, the claim holds.

---

## 3. Simple Induction vs. Strong Induction
The induction used so far is known as **simple** or **weak** induction. There is another notion, called **strong induction**, that uses a different induction hypothesis: instead of assuming only $P(k)$ is true, we assume the stronger statement that $P(0),P(1),\ldots,P(k)$ are *all* true.

Is there a difference in power between strong and weak induction - can strong induction prove statements weak induction cannot? No. Returning to the domino analogy, weak induction says that if the $k$th domino falls, so does the $(k+1)$st, whereas strong induction says that if dominoes $1$ through $k$ fall, then so does the $(k+1)$st. These scenarios are equivalent: if the first domino falls, applying weak induction repeatedly shows that it topples dominoes $2$ through $k$, setting up the $k+1$ case exactly as strong induction would. Strong induction does have a practical advantage, though - it can make proofs easier, since it lets us assume a stronger hypothesis. The two are like a screwdriver and a power screwdriver: they accomplish the same task, but the latter is often easier to use.

### Theorem 4.6
For every natural number $n\geq12$, $n=4x+5y$ for some $x,y\in\mathbb{N}$.

This is also known as the postage stamp problem, since it states that any amount of postage of 12 cents or more can be paid using only 4-cent and 5-cent stamps. This is our first induction proof requiring multiple base cases.

#### Proof
We proceed by induction on $n$.

- **Base case** ($n=12$): $12=4\cdot3+5\cdot0$.
- **Base case** ($n=13$): $13=4\cdot2+5\cdot1$.
- **Base case** ($n=14$): $14=4\cdot1+5\cdot2$.
- **Base case** ($n=15$): $15=4\cdot0+5\cdot3$.

**Induction hypothesis:** Fix any $k\geq15$ and assume that the claim holds for all $12\leq n\leq k$.

**Inductive step:** We prove the claim for $n=k+1$. Since $k+1\geq16$, we have $(k+1)-4\geq12$, so the induction hypothesis implies that $(k+1)-4=4x'+5y'$ for some $x',y'\in\mathbb{N}$. Setting $x=x'+1$ and $y=y'$ completes the proof.

> [!tip] Concept Check
> Why would the proof above fail if we used weak induction instead of strong induction?

### Theorem 4.7
Every natural number $n>1$ can be written as a product of one or more primes. (Recall that a number $n\geq2$ is prime if its only divisors are $1$ and $n$.)

#### Proof
We proceed by induction on $n$. Let $P(n)$ be the proposition that $n$ can be written as a product of primes. We prove that $P(n)$ is true for all $n\geq2$.

**Base case** ($n=2$): $P(2)$ clearly holds, since $2$ is prime.

**Induction hypothesis:** Assume $P(n)$ is true for all $2\leq n\leq k$.

**Inductive step:** We prove that $n=k+1$ can be written as a product of primes. Either $k+1$ is prime, or it is not. In the first case, $k+1$ is trivially the product of one prime, itself. In the second case, by definition $k+1=xy$ for some $x,y\in\mathbb{Z}^+$ satisfying $1<x,y<k+1$. By the induction hypothesis, $x$ and $y$ can each be written as a product of primes, since both are $\leq k$. It follows that $k+1$ can also be written as a product of primes.

> [!tip] Concept Check
> Why does this proof fail if we instead use simple induction? (Hint: suppose $k+1=42$. Since $42=6\times7$, the inductive step wants to use the facts that $P(6)$ and $P(7)$ are true. Which value of $P$ does weak induction actually let us assume is true in this case?)

For a more formal view of why weak and strong induction are equivalent, let $Q(n)=P(0)\land P(1)\land\cdots\land P(n)$. Then strong induction on $P$ is equivalent to weak induction on $Q$.

---

## 4. Recursion, Programming, and Induction
Induction and recursion are intimately connected, as the following two examples illustrate.

### Example 1: Fibonacci's Rabbits
In the 13th century, the Italian mathematician Fibonacci (Leonardo of Pisa) considered the following puzzle in 1202: starting with a pair of rabbits, how many rabbits are there after a year, if each month each pair begets a new pair, which becomes productive starting from its second month? This model of population growth can be captured by recursively defining a function, giving rise to the **Fibonacci numbers**.

Let $F(n)$ denote the number of pairs of rabbits in month $n$. By the rules above, $F(0)=0$. In month 1, a single pair is introduced, so $F(1)=1$. Since it takes a month for new rabbits to become productive, $F(2)=1$ as well. In month 3 the pattern begins: $F(3)=2$, since the original pair breeds to produce a new pair. In general, in month $n-1$ there are $F(n-1)$ pairs, of which only those already alive the previous month - $F(n-2)$ of them - were productive. So the $n$th month gains $F(n-2)$ new pairs in addition to the existing $F(n-1)$ pairs, giving $F(n)=F(n-1)+F(n-2)$.

- $F(0)=0$.
- $F(1)=1$.
- For $n\geq2$, $F(n)=F(n-1)+F(n-2)$.

This simplified model of population growth illustrates a fundamental principle: left unchecked, populations grow exponentially over time. Fibonacci numbers describe other, unrelated phenomena too, such as spiral growth patterns in certain plants. Understanding the significance of unchecked exponential growth was a key step that led Darwin to formulate his theory of evolution:

> "There is no exception to the rule that every organic being increases at so high a rate, that if not destroyed, the earth would soon be covered by the progeny of a single pair."

> [!tip] Exercise
> Use induction to show that the Fibonacci numbers satisfy $F(n)\geq2^{(n-1)/2}$ for all $n\geq3$. Note that you will need two base cases, $n=3$ and $n=4$. Why?

A trivial recursive program evaluates $F(n)$:

```text
function F(n)
  if n = 0 then return 0
  if n = 1 then return 1
  else return F(n-1) + F(n-2)
```

> [!tip] Exercise
> How long does it take this program to compute $F(n)$, i.e., how many calls to $F$ are needed? Show by induction that the number of calls is at least $F(n)$ itself.

This is a very inefficient way to compute the $n$th Fibonacci number. A much faster iterative algorithm accomplishes the same task - a familiar example of turning a tail recursion into an iterative algorithm:

```text
function F2(n)
  if n = 0 then return 0
  if n = 1 then return 1
  a = 1
  b = 0
  for k = 2 to n do
    temp = a
    a = a + b
    b = temp
  return a
```

> [!tip] Exercise
> How long does this iterative algorithm take to compute $F_2(n)$, i.e., how many loop iterations are needed? Can you show by induction that $F_2(n)=F(n)$?

### Example 2: Binary Search
Consider a recursive algorithm familiar even outside computer science - binary search - applied to finding a word in a dictionary. To find word $W$, open the dictionary to its middle page. If the first word on that page comes after $W$, recurse on the first half of the dictionary (before the middle page); otherwise, recurse on the second half (from the middle page onward). (When the dictionary has an even number $2m$ of pages, the middle page is defined as the $(m+1)$st page.) Once the dictionary has been narrowed to a single page, resort to a brute-force search on that page.

```text
// precondition:  W is a word and D is a subset of the
//   dictionary with at least 1 page.
// postcondition: either the definition of W is returned,
//   or "W not found" is returned.
findWord(W, D) {
  // Base case
  if (D has precisely one page)
    Look for W in D by brute force.
    If found, return its definition; else, return "W not found".

  // Recursive case
  Let W' be the first word on the middle page of D.
  if (W comes before W')
    return findWord(first half of D)
  else
    return findWord(second half of D)
}
```

We prove that `findWord()` is correct, i.e., that it returns the definition of $W$ whenever $W$ is in the dictionary $D$. As a bonus, this proof requires strong induction rather than simple induction.

#### Proof of Correctness of `findWord()`
We proceed by strong induction on the number of pages, $n$, in $D$.

**Base case** ($n=1$): If $D$ has one page, the base case above searches for $W$ by brute force. If $W$ is present it is found and returned; otherwise "W not found" is returned, as desired.

**Induction hypothesis:** Assume that `findWord()` is correct for all $1\leq n\leq k$.

**Inductive step:** We prove `findWord()` is correct for $n=k+1$. The recursive case above determines $W'$ and thus whether $W$ must lie in the first or second half of $D$, and recurses on that half accordingly. By the induction hypothesis, the recursive call correctly finds $W$ in that half, or correctly returns "W not found", since each half contains at most $k$ pages. Since we return the recursive call's answer, `findWord()` correctly finds $W$ in $D$ of size $n=k+1$. By induction, `findWord()` is therefore correct.

> [!tip] Concept Check
> Why did the proof above require strong induction?

---

## 5. Practice Problems
1. Prove for any natural number $n$ that $1^2+2^2+3^2+\cdots+n^2=\frac{1}{6}n(n+1)(2n+1)$.
2. In real analysis, Bernoulli's inequality approximates the exponentiation of $1+x$. Prove this inequality, which states that $(1+x)^n\geq1+nx$ if $n$ is a natural number and $1+x>0$.
3. A common recursively defined function is the factorial, defined for a nonnegative number $n$ as $n!=n(n-1)(n-2)\cdots1$, with base case $0!=1$. To reinforce the connection between recursion and induction, consider the following theorem.

   **Theorem 4.8.** For all $n\in\mathbb{N}$, $n>1\implies n!<n^n$.

   Prove this theorem using induction. (Hint: in the inductive step, write $(n+1)!=(n+1)\cdot n!$, and use the induction hypothesis.)
4. A celebrity at a party is someone whom everyone knows, yet who knows no one. Suppose you are at a party with $n$ people. For any pair of people $A$ and $B$ at the party, you can ask $A$ if they know $B$ and receive an honest answer. Give a recursive algorithm to determine whether there is a celebrity at the party, and if so who, by asking at most $3n-4$ questions. (Note: for the purpose of this question you are just visiting the party to ask questions. What you are trying to determine is whether the $n$ people actually attending the party include a celebrity.) Prove by induction that your algorithm always correctly identifies a celebrity if there is one, and that the number of questions is at most $3n-4$.
5. Use the proof of Theorem 4.6 to design an algorithm that, given any amount of postage of at least 12 cents, outputs the numbers of 4-cent and 5-cent stamps that make up this postage. What is the largest number of 5-cent stamps your algorithm will ever use?

#academic/year-3/cs70/course-notes