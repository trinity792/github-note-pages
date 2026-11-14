---
title: Direct Proofs
Content Type: Complementary Note
Content Area: Discrete Mathematics
description: "A worked walkthrough of the direct-proof template - unpack the hypothesis, match the conclusion - using the example 6 divides n implies 9 divides n squared, plus a general checklist referencing Theorem 1.1."
Course: CS70
pinned: false
Date Published: August 31, 2026
Last Updated: August 31, 2026
Status: Finalized
---
# Direct Proofs

A useful way to think about a direct proof is:

> **Start by unpacking the hypothesis. End by matching the exact definition of the conclusion.**

That is exactly the pattern in your notes. For a statement of the form $P \implies Q$, the direct-proof template is: assume $P$, then use valid deductions until you reach $Q$.

## 1. To find the **start**, ask: "What does the hypothesis really mean?"

For your problem, $6 \mid n \implies 9 \mid n^2$, the hypothesis is $6 \mid n$.

The notes define divisibility by saying $a \mid b$ means there exists some integer $q$ such that $b = aq$.

So when you see $6 \mid n$, your first instinct should be $n = 6k$ for some $k \in \mathbb{Z}$.

That gives you something algebraic that you can actually manipulate.

---
## 2. To find the **end**, ask: "What would be enough to prove the conclusion?"

Your conclusion is $9 \mid n^2$.

Again, use the definition of divisibility.

To prove $9 \mid n^2$, you want to reach something of the form $n^2 = 9m$ for some $m \in \mathbb{Z}$.

So before doing any algebra, you already know what your target should look like:

$$\boxed{n^2 = 9(\text{integer})}$$

That is your finish line.

---
## 3. Then build a bridge between them

Now you know both endpoints:

Start: $n = 6k$

and

End: $n^2 = 9m$.

So ask:

> What natural operation connects $n$ to $n^2$?

Square both sides: $n = 6k$ gives $n^2 = (6k)^2 = 36k^2$.

Now compare this with your target: $n^2 = 9m$.

Factor out 9: $n^2 = 9(4k^2)$.

Since $k \in \mathbb{Z}$, the notes' closure fact tells you $4k^2 \in \mathbb{Z}$.

So you have exactly the required form.

---
## A general checklist

For direct proofs, I would use this every time:

1. **Write the statement symbolically.** $P \implies Q$
2. **Assume the hypothesis $P$.**
3. **Expand definitions in the hypothesis.** For divisibility: $a \mid b \Rightarrow b = ak$.
4. **Expand the definition of what the conclusion requires.** If you want $c \mid d$, then aim for $d = cq, \qquad q \in \mathbb{Z}$.
5. **Do algebra that moves the hypothesis toward that target form.**
6. **Check the new quantity is actually an integer.**
7. **State the conclusion using the definition.**

Theorem 1.1 in your notes follows exactly this pattern: $a \mid b$ and $a \mid c$ are first converted into equations $b = q_1 a$ and $c = q_2 a$, and the proof ends by rewriting $b + c$ as $a$ times an integer.

A compact mental model is:

$$\boxed{\text{Unpack the left side} \rightarrow \text{algebra} \rightarrow \text{match the right side}}$$

That will work for a large fraction of the early CS70 direct proofs.
