---
title: Theorems and Notation Reference Guide
Content Type: Reference
description: Reference notes for CS70 Theorems and Notation
pinned: false
Date Published: August 31st, 2026 - 12:23 PM
Last Updated: August 31st, 2026 - 12:23 PM
Status: Finalized
---
# Theorems and Notation Reference Notes
---
## Notation
- $\mathbb{Z}$ = set of all integers
- $\mathbb{N}$ = set of natural numbers
- if $a, b$ are integers then $a \mid b$ means "$a$ divides $b$"
- $:=$ is to denote a definition. ex: $q:=6$
- $\land$ = "logical and"
- $\forall$ = "for all" or "for every"
---
## Set
## Cardinality
## Subsets and Proper Subsets
## Direct Proofs
Goal: To prove $P \implies Q$; Approach: Assume $P$... therefore $Q$

---
## Theorems
### 1.1
For any $a,b,c \in \mathbb{Z}$ if $a \mid b$ then $a \mid (b+c)$
> [!info] Concept Check
> Let $P(x, y)$ denote "$x \mid y$". Convince yourself that the statement above is equivalent to $(\forall a, b, c \in \mathbb{Z}) (P(a, b) \land P(a, c)) \implies P(a, b + c))$.

Technical Language:
- $(\forall a, b, c \in \mathbb{Z}) (P(a, b) \land P(a, c)) \implies P(a, b + c))$
In natural language: 
- For all integers a, b, and c, if P(a,b) is true and P(a,c) is true, then P(a,b+c) is also true.
#### Proof of Theorem 1.1. 
Assume that $a \mid b$ and $a \mid c$, i.e. there exist integers $q_1$ and $q_2$ such that $b = q_1 a$ and $c = q_2 a$. Then, $b + c = q_1 a + q_2 a = (q_1 + q_2)a$. Since the $\mathbb{Z}$ is closed under addition, we conclude that $(q_1 + q_2) \in \mathbb{Z}$, and so $a \mid (b + c)$, as desired.

### 1.2
Theorem 1.2. Let $0 < n < 1000$ be an integer. If the sum of the digits of $n$ is divisible by 9, then $n$ is divisible by 9

#### Proof of Theorem 1.2. 
Let $n$ in decimal be written as $n = abc$, i.e. $n = 100a + 10b + c$. Assume that the sum of the digits of $n$ is divisible by 9, i.e.

$$\exists k \in \mathbb{Z} \text{ such that } a + b + c = 9k \tag{1}$$

Adding $99a + 9b$ to both sides of (1), we have

$$100a + 10b + c = n = 9k + 99a + 9b = 9(k + 11a + b)$$

We conclude that $n$ is divisible by 9.

### 1.3 (Converse of Theorem 1.2). 
Let $0 < n < 1000$ be an integer. If $n$ is divisible by 9, then the sum of the digits of $n$ is divisible by 9.

#### Proof of Theorem 1.3
Assume that $n$ is divisible by 9. We use the same notation for the digits of $n$ as we used in Theorem 1.2's proof. We proceed as follows.

$$
\begin{aligned}
n \text{ is divisible by } 9 &\implies n = 9l \text{ for } l \in \mathbb{Z} \\
&\implies 100a + 10b + c = 9l \\
&\implies 99a + 9b + (a + b + c) = 9l \\
&\implies a + b + c = 9l - 99a - 9b \\
&\implies a + b + c = 9(l - 11a - b) \\
&\implies a + b + c = 9k \text{ for } k = l - 11a - b \in \mathbb{Z}
\end{aligned}
$$

We conclude that $a + b + c$ is divisible by 9.