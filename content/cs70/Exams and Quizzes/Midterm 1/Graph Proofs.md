---
title: Graph Proofs
Content Type: Complementary Note
Content Area:
description:
pinned: false
Date Published: October 7th, 2026 - 11:57 AM
Last Updated: October 7th, 2026 - 11:57 AM
Status: Updating
---
# Graph Proofs
## Discussion Level
### Prove that a tree with n vertices has exactly n-1 edges
Let \(T\) be a tree with \(n\) vertices. Start with those same \(n\) vertices and no edges, so there are \(n\) connected components. Add the edges of \(T\) one at a time.

Every added edge must join two different components. Otherwise, its endpoints would already be connected by a path, and adding the edge would form a cycle. That is impossible because all the edges being added belong to the acyclic graph \(T\).

Thus, each added edge reduces the number of connected components by exactly one. If \(T\) has \(m\) edges, after adding them all there are \(n-m\) components.

Since \(T\) is connected, there is exactly one component. Therefore \(n-m=1\), so \(m=n-1\). ∎
### Let $G = (V,E)$ be a graph with $|E| \ge |V|$. Prove that G contains a cycle

**Proof by contradiction.** Let $G=(V,E)$ be a nonempty graph satisfying $\lvert E\rvert\geq\lvert V\rvert$. Suppose that $G$ contains no cycles.

Let $k$ be the number of connected components of $G$. By part (c), an acyclic graph satisfies

$$
\lvert E\rvert=\lvert V\rvert-k.
$$

Since $G$ is nonempty, $k\geq1$. Therefore,

$$
\lvert E\rvert\leq\lvert V\rvert-1<\lvert V\rvert,
$$

contradicting $\lvert E\rvert\geq\lvert V\rvert$. Hence, $G$ contains a cycle. $\square$

### Prove that if G is a connected planar graph with $v \ge 3$ vertices and e edges, then $e \le 3v-6$

**Proof by counting face boundaries.** Let $G$ be a connected simple planar graph with $v\geq3$ vertices and $e$ edges. Fix a planar drawing, and let $f$ be its number of faces, including the outer face.

Each face has at least three edge occurrences along its boundary. A boundary of length one would require a self-loop. A boundary of length two would require parallel edges or a single edge traversed twice; the latter can constitute the entire face boundary only when the connected graph consists of that edge and its two endpoints. These possibilities are excluded by simplicity and $v\geq3$.

Every edge contributes exactly two occurrences to the face boundaries, one for each side. If both sides belong to the same face, the edge is counted twice for that face. Consequently,

$$
3f\leq2e.
$$

By Euler's formula,

$$
v-e+f=2,
$$

so $f=2-v+e$. Substituting gives

$$
\begin{aligned}
3(2-v+e)&\leq2e \\
6-3v+3e&\leq2e \\
e&\leq3v-6.
\end{aligned}
$$

Thus, $e\leq3v-6$. $\square$