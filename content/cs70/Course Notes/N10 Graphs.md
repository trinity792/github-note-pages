---
title: CS 70 Note 10 — Graph Theory, Eulerian Tours, Trees, Planarity, and Hypercubes
Content Type: Course Notes
Content Area: Discrete Mathematics
description: "Introduces graphs, paths, connectivity, Eulerian tours, complete graphs, and trees. Develops Euler's formula and non-planarity criteria, then studies hypercube connectivity and de Bruijn sequences."
Course: CS 70
pinned: false
Date Published: October 3, 2026
Last Updated: October 3, 2026
Status: Finalized
---

# CS 70 Note 10 — Graph Theory, Eulerian Tours, Trees, Planarity, and Hypercubes

Graphs capture relationships between objects through **vertices** and **edges**. This note introduces their basic definitions, characterizes **Eulerian tours**, studies **complete graphs** and **trees**, develops **planar graphs** and **Euler's formula**, and examines the connectivity of **hypercubes**. The practice problems connect Eulerian tours to **de Bruijn sequences** and complete the induction arguments for trees.

## 1. Graph Theory: An Introduction

One of the fundamental ideas in computer science is **abstraction**: capturing the essence of a complex situation with a simple model. Large and complex entities such as the internet, the brain, maps, and social networks have an underlying network, or **graph**, that captures important features. For the internet, the graph specifies how web pages link to one another; for the brain, it describes the interconnections between neurons. Graph theory provides a framework for studying these networks.

### The Seven Bridges of Königsberg

Graph theory originated in an evening pastime of the residents of Königsberg, Prussia, now Kaliningrad, Russia. The Pregel River separated the city into two banks, $A$ and $D$, and two islands, $B$ and $C$. Seven bridges connected the land masses. Residents tried to find a walking route that crossed each bridge exactly once and returned to its starting point.

![[Pasted image 20261003141955.png]]

In 1736, Leonhard Euler proved that this was impossible. The key abstraction replaces each land mass with a point and each bridge with a line segment, as in Figure 1. The task becomes: trace every line segment and return to the starting point without lifting the pen or traversing any segment more than once.

Under these rules, the pen must enter each point as many times as it exits. Therefore, the number of line segments incident to each point must be even. In Figure 1, however, every point has an odd number of incident segments, so such a tracing is impossible. Euler also gave a precise condition under which the tracing can be carried out, and is generally hailed as the inventor of graph theory.

### 1.1. Formal Definitions

An **undirected graph** is defined by a set of vertices $V$ and a set of edges $E$. Vertices correspond to points, and edges correspond to line segments joining them. In the Königsberg example,

$$
V=\{A,B,C,D\},
$$

and

$$
E=\bigl\{\{A,B\},\{A,B\},\{A,C\},\{B,C\},\{B,D\},\{B,D\},\{C,D\}\bigr\}.
$$

Here, $E$ is a **multiset**, meaning an element can appear multiple times, because there are multiple bridges between some pairs of land masses. Unless otherwise stated, these notes do not allow multiple edges between the same pair of vertices: $E$ is a set, and any pair has either zero or one edge.

A **directed graph** models one-way relationships. If an undirected edge represents a street, a directed edge represents a one-way street. Its edge set satisfies

$$
E\subseteq V\times V.
$$

Recall that the **Cartesian product** is

$$
U\times V=\{(u,v)\mid u\in U\text{ and }v\in V\}.
$$

For example, if $V=\{1,2,3,4\}$ and $E=\{(1,2),(1,3),(1,4)\}$, the corresponding graph is $G_1$ in Figure 2.

![[Pasted image 20261003142006.png]]

Each edge in $G_1$ has a direction indicated by an arrow. Thus, $(1,2)\in E$, but $(2,1)\notin E$. Directed graphs model one-way relationships, such as one-way streets between locations.

If every edge goes in both directions, so that $(u,v)\in E$ if and only if $(v,u)\in E$, we call the graph undirected. For an undirected graph, we use the unordered set $\{u,v\}$ to denote an edge and omit arrowheads in drawings. Such graphs model relationships like two-way streets; $G_2$ in Figure 2 is an example.

In either case, a graph is formally specified by the ordered pair

$$
G=(V,E).
$$

> [!tip] Concept Check
> What are the vertex and edge sets $V$ and $E$ for graph $G_2$?

Consider a social network in which vertices represent people. If an edge means that Alex **recognizes** Bridget, Alex knows who Bridget is, but Bridget need not know who Alex is. A directed graph models this relationship because it is not symmetric. If instead an edge means that Alex and Bridget **know each other**, we use an undirected graph.

### Incidence, Adjacency, and Degree

An edge $e=\{u,v\}$, or $e=(u,v)$, is **incident** on vertices $u$ and $v$. These vertices are **neighbors**, or **adjacent**.

In an undirected graph, the **degree** of a vertex $u$ is the number of edges incident on it:

$$
\operatorname{degree}(u)=\bigl|\{v\in V\mid\{u,v\}\in E\}\bigr|.
$$

A vertex of degree zero is an **isolated vertex**, since no edge connects it to the rest of the graph.

> [!tip] Concept Check
> What does the degree of a vertex represent in the undirected social network in which an edge $\{u,v\}$ means that $u$ and $v$ know each other? How should we interpret an isolated vertex?

A directed graph has two notions of degree. The **in-degree** of $u$ is the number of edges from other vertices to $u$, and its **out-degree** is the number of edges from $u$ to other vertices.

> [!tip] Concept Check
> What do the in-degree and out-degree of a vertex represent in the directed social network in which $(u,v)$ means that $u$ recognizes $v$?

An edge of the form $\{u,u\}$, or $(u,u)$, is a **self-loop**. In the social network, it conveys no interesting information: a person recognizes themself. These notes assume that graphs have no self-loops unless stated otherwise.

### Paths, Walks, and Cycles

Let $G=(V,E)$ be an undirected graph. A **path** is a sequence of edges

$$
\{v_1,v_2\},\{v_2,v_3\},\ldots,\{v_{n-2},v_{n-1}\},\{v_{n-1},v_n\}.
$$

We say there is a path between $v_1$ and $v_n$. For example, suppose $G_3$ models a residential neighborhood: each vertex represents a house, and two houses are neighbors if a direct road joins them.

![[Pasted image 20261003142018.png]]

> [!tip] Concept Check
> What is a shortest path from house 2 to house 4 in $G_3$? What is a longest path, assuming no house is visited twice?

In this class, a path is assumed to be **simple**, meaning that $v_1,\ldots,v_n$ are distinct. In the housing example, if you want to drive from house 2 to house 4 via house 1, there is no reason to visit house 1 more than once.

A **cycle**, or **circuit**, is a sequence

$$
\{v_1,v_2\},\{v_2,v_3\},\ldots,\{v_{n-1},v_n\},\{v_n,v_1\},
$$

where $v_1,\ldots,v_n$ are distinct. It consists of a path from $v_1$ to $v_n$, followed by the edge $\{v_n,v_1\}$ returning to the start.

> [!tip] Concept Check
> Give a cycle starting at house 1 in $G_3$.

If instead you want a leisurely stroll from house 2 to house 4, you might follow

$$
\{2,1\},\{1,2\},\{2,3\},\{3,4\}.
$$

A sequence of edges with possibly repeated vertices is a **walk**. A **tour** is a walk that starts and ends at the same vertex. For example,

$$
\{2,1\},\{1,3\},\{3,4\},\{4,1\},\{1,2\}
$$

is a tour.

| Term | No repeated vertices | No repeated edges | Start = end |
|---|---|---|---|
| Walk | | | |
| Path | Yes | Yes | |
| Tour | | | Yes |
| Cycle | Yes, except for the start and end | Yes | Yes |

**Remark:** The course will try to remind you of subtleties in these definitions. Focus on understanding the ideas rather than worrying excessively about the formal terminology.

### Connectivity

A graph is **connected** if there is a path between any two distinct vertices. The residential network $G_3$ is connected because one can drive from any house to any other using a sequence of direct roads. The following network is disconnected.

![[Pasted image 20261003142031.png]]

> [!tip] Concept Check
> What would a disconnected vertex represent in the residential network? Why would you not want to design a neighborhood this way?

Every graph, including a disconnected graph, consists of **connected components**: sets $V_1,\ldots,V_k$ of vertices whose vertices are connected within each set. The graph above has three connected components:

$$
V_1=\{1,2,3\},\qquad V_2=\{4\},\qquad V_3=\{5,6,7\}.
$$

---

## 2. Revisiting the Seven Bridges of Königsberg: Eulerian Tours

The bridge problem asks whether a graph has a walk that uses each edge exactly once. Such a walk is an **Eulerian walk**. A usual walk may revisit edges and vertices as often as desired, but an Eulerian walk must use every edge exactly once.

If an Eulerian walk is closed, meaning that it ends at its starting point, it is an **Eulerian tour**. Thus, the Seven Bridges of Königsberg asks whether its graph has an Eulerian tour.

An **even degree graph** is a graph in which every vertex has even degree.

### Theorem 10.1 — Euler's Theorem (1736)

An undirected graph $G=(V,E)$ has an Eulerian tour if and only if it is even degree and connected, except possibly for isolated vertices.

#### Proof

The proof is assigned in the homework.

> [!note] Proof from Sonnet 5.5 High
> The proof below was added by Claude (Sonnet 5.5, High) and is not part of the original notes.

Throughout, graphs have no self-loops and no multiple edges, as in these notes. An Eulerian tour is a closed walk that uses every edge of $G$ exactly once. "Connected, except possibly for isolated vertices" means that any two vertices of positive degree are joined by a path.

If $E=\emptyset$, the empty tour is an Eulerian tour, and $G$ is trivially even degree with only isolated vertices, so both sides of the equivalence hold. Assume from now on that $|E|=m\geq1$.

**A preliminary claim.** Call a tour that uses no edge more than once a **closed trail**. Write it as a cyclic sequence of vertices $v_1,v_2,\ldots,v_k$, with indices taken modulo $k$, so that its edges $e_i=\{v_i,v_{i+1}\}$ for $i=1,\ldots,k$ are distinct. Let $F=\{e_1,\ldots,e_k\}$.

> **Claim.** Every vertex $u$ is incident on an even number of edges of $F$. In fact, the number of such edges is $2\cdot\bigl|\{i\mid v_i=u\}\bigr|$.

*Proof of the claim.* Since there are no self-loops, $v_i\neq v_{i+1}$. Hence $u\in e_i$ if and only if exactly one of $v_i=u$ and $v_{i+1}=u$ holds, and if neither holds then $u\notin e_i$. Because the edges $e_i$ are distinct, the number of edges of $F$ incident on $u$ is the number of indices $i$ with $u\in e_i$, which equals

$$
\bigl|\{i\mid v_i=u\}\bigr|+\bigl|\{i\mid v_{i+1}=u\}\bigr|=2\,\bigl|\{i\mid v_i=u\}\bigr|.
$$

The last equality holds because $i\mapsto i+1$ is a bijection on the indices modulo $k$. $\square$

#### ($\Rightarrow$) An Eulerian tour forces even degree and connectivity

Suppose $G$ has an Eulerian tour. It is a closed trail whose edge set $F$ is all of $E$.

**Even degree.** By the claim, every vertex is incident on an even number of edges of $F=E$, so every vertex has even degree.

**Connectivity.** Let $x$ and $y$ be vertices of positive degree. Each lies on some edge of $E=F$, so each appears in the cyclic sequence: $x=v_a$ and $y=v_b$ for some indices $a,b$. Following the tour from $v_a$ to $v_b$ gives a walk from $x$ to $y$. Whenever this walk repeats a vertex, delete the closed segment between the two occurrences. Repeating this until no vertex is repeated leaves a path from $x$ to $y$. Therefore all vertices of positive degree are connected to each other.

#### ($\Leftarrow$) Even degree and connectivity give an Eulerian tour

We use strong induction on $m=|E|$. Let $P(m)$ be the statement: every graph with exactly $m$ edges that has even degree and whose vertices of positive degree are pairwise connected has an Eulerian tour. The case $m=0$ was handled above. Let $m\geq1$ and assume $P(m')$ for all $m'<m$. Let $G$ be a graph with $m$ edges satisfying the hypotheses.

**Step 1: Find a closed trail $C$.** Pick a vertex $s$ of positive degree. Start at $s$ and repeatedly traverse an edge incident on the current vertex that has not been used yet, stopping when no such edge exists. Since $E$ is finite, the process stops.

The walk stops at $s$. Suppose instead that it stops at some $w\neq s$. Each earlier time the walk passed through $w$, it used two edges at $w$, one to arrive and one to leave. The final arrival at $w$ used one more edge at $w$, and $w$ is not the start, so no edge at $w$ was used to leave at the end. The walk therefore used an odd number of edges at $w$. But $\deg(w)$ is even, so some edge at $w$ is unused, contradicting the stopping rule.

Thus the walk is a closed trail $C$ starting and ending at $s$. It contains at least one edge, since $\deg(s)\geq1$ lets the first step happen.

**Step 2: Remove $C$ and recurse.** Let $G'$ be $G$ with the edges of $C$ deleted, keeping all vertices. By the claim, $C$ is incident on an even number of edges at every vertex, so every vertex still has even degree in $G'$.

Let $H_1,\ldots,H_t$ be the connected components of $G'$ that contain at least one edge, where $t\geq0$. Each $H_j$ is connected, has even degree, and has fewer than $m$ edges, because $C$ removed at least one edge. Also, all vertices of $H_j$ have positive degree, so its positive-degree vertices are pairwise connected. By the induction hypothesis, each $H_j$ has an Eulerian tour $T_j$.

**Step 3: Each $H_j$ shares a vertex with $C$.** Fix $j$ and a vertex $x$ of $H_j$. Both $x$ and $s$ have positive degree in $G$, so by hypothesis there is a path in $G$

$$
x=p_0,\,p_1,\,\ldots,\,p_r=s.
$$

Let $q$ be the smallest index such that $p_q$ is a vertex of $C$. It exists because $p_r=s$ is on $C$. For $i<q$, the vertex $p_i$ is not on $C$. Every edge of $C$ has both endpoints on $C$, so the edge $\{p_i,p_{i+1}\}$ is not in $C$, and hence lies in $G'$. Therefore $p_0,\ldots,p_q$ are joined by edges of $G'$ and lie in the same component as $x$, namely $H_j$ (if $q=0$, then $p_0=x$ itself is on $C$). So $z_j:=p_q$ is a vertex of both $H_j$ and $C$.

**Step 4: Splice the tours together.** Since $H_j$ contains an edge and is connected, $z_j$ has positive degree in $H_j$, so the Eulerian tour $T_j$ passes through $z_j$. Rotate $T_j$ cyclically so that it starts and ends at $z_j$. This is allowed because a closed walk can be started at any vertex it passes through.

Let $W_0=C$. For $j=1,\ldots,t$, the closed walk $W_{j-1}$ passes through $z_j$, because it still contains every vertex occurrence of $C$. Form $W_j$ by replacing one occurrence of $z_j$ in $W_{j-1}$ with the rotated tour $T_j$: on reaching $z_j$, traverse all of $T_j$, return to $z_j$, and then continue as before. Then $W_j$ is again a closed walk with the same start and end as $W_{j-1}$, and it uses each edge of $W_{j-1}$ and each edge of $T_j$ exactly once.

The edge sets of $C,H_1,\ldots,H_t$ are pairwise disjoint, and together they contain every edge of $G$: each edge of $G$ is either in $C$ or in $G'$, and each edge of $G'$ lies in exactly one component, which has an edge and so is one of the $H_j$. Hence $W_t$ is a closed walk that uses every edge of $G$ exactly once, i.e., an Eulerian tour of $G$. This proves $P(m)$ and completes the induction.

Combining both directions, $G$ has an Eulerian tour if and only if it is even degree and connected, except possibly for isolated vertices. $\blacksquare$

> [!tip] Concept Check
> Why does Theorem 10.1 imply that the answer to the Seven Bridges of Königsberg is no?

---

## 3. Trees and Complete Graphs

Complete graphs and trees are two important special classes of graphs. They are maximal and minimal, respectively, among connected graphs, in a sense discussed further in Section 5.

### 3.1. Complete Graphs

An undirected **complete graph** contains the maximum possible number of edges: every pair of distinct vertices $u$ and $v$ is connected by an edge $\{u,v\}$. Here are the complete graphs on two, three, and four vertices.

![[Pasted image 20261003142042.png]]

The notation $K_n$ denotes the unique complete graph on $n$ vertices. Formally, $K_n=(V,E)$, where $|V|=n$ and

$$
E=\bigl\{\{v_i,v_j\}\mid v_i\neq v_j\text{ and }v_i,v_j\in V\bigr\}.
$$

> [!tip] Concept Check
> 1. Can you draw $K_5$, the complete graph on five vertices?
> 2. What is the degree of every vertex in $K_n$?

> [!tip] Exercise
> How many edges are there in $K_n$? **Answer:** $n(n-1)/2$. Verify that the $K_5$ you drew above has this many edges.

In a **complete directed graph**, for any pair of vertices $u$ and $v$, both $(u,v)$ and $(v,u)$ belong to $E$.

### 3.2. Trees

A **tree** is a connected graph that contains no cycles. For $G=(V,E)$ with $n=|V|$, the following are equivalent definitions of a tree:

1. $G$ is connected and contains no cycles.
2. $G$ is connected and has $n-1$ edges.
3. $G$ is connected, and removing any single edge disconnects $G$.
4. $G$ has no cycles, and adding any single edge creates a cycle.

Here are three examples of trees.

![[Pasted image 20261003142055.png]]

> [!tip] Concept Check
> 1. Convince yourself that the three graphs above satisfy all four equivalent definitions of a tree.
> 2. Give an example of a graph that is not a tree.

For a given number $n$ of vertices, there are many possible trees: $n^{n-2}$, to be precise. This contrasts with complete graphs, which are unique for a given $n$.

Trees are important because many graph problems that are computationally intractable on arbitrary graphs, such as the Maximum Cut problem, are easy on trees. They also model many natural relationships between objects.

#### Rooted Trees

A **rooted tree** has a designated node called the **root**, which is thought of as sitting at the top of the tree. Here is an example.

![[Pasted image 20261003142105.png]]

The bottom-most nodes are **leaves**, and the intermediate nodes are **internal nodes**. In a rooted tree, the root is never a leaf. This differs from an unrooted tree, in which leaves are vertices of degree one.

The **depth** $d$ is the length of the longest path from the root to a leaf. The tree can be grouped into **layers**, or **levels**: level $k$, for $k\in\{0,1,\ldots,d\}$, contains the vertices connected to the root by a path of exactly $k$ edges.

> [!tip] Concept Check
> 1. What is the depth of the tree above? **Answer:** 3.
> 2. Which vertices are on level 0? Which vertices are on level 3?

Rooted trees can model bacterial cell division: the root represents a single bacterium, and each subsequent layer represents a division into two new bacteria. They also support fast searching of ordered sets, as in **binary search trees**.

Induction works particularly well for proving properties of trees. The following theorem demonstrates this by proving that the first two definitions of a tree are equivalent.

### Theorem 10.2 — Equivalent Characterizations of a Tree

The statements "$G$ is connected and contains no cycles" and "$G$ is connected and has $n-1$ edges" are equivalent.

#### Proof: Forward Direction

We use strong induction on $n$ to show that a connected graph without cycles has $n-1$ edges. Assume $G=(V,E)$ is connected and contains no cycles.

**Base case, $n=1$:** The graph is a single vertex with no edges, so the claim holds.

**Inductive hypothesis:** Assume the claim holds for $1\leq n\leq k$.

**Inductive step:** Consider $n=k+1$. Remove an arbitrary vertex $v\in V$ and all its incident edges, obtaining $G'$. Removing a vertex cannot create a cycle, so $G'$ has no cycles. However, removing $v$ may disconnect $G'$, in which case the induction hypothesis cannot be applied to $G'$ as a whole.

There are therefore two cases: $G'$ is connected, or $G'$ is disconnected. The source proves the connected case, which captures the essential ideas, and leaves the disconnected case as a practice problem.

Assume $G'$ is connected. It is a connected graph without cycles on $k$ vertices, so the induction hypothesis gives $k-1$ edges. Add $v$ back to recover $G$. Since $G'$ is connected, if more than one edge were incident on $v$, those edges and a path in $G'$ would form a cycle in $G$. But $G$ has no cycles. Since $G$ is connected, $v$ must therefore be incident on exactly one edge. Consequently, $G$ has

$$
(k-1)+1=k
$$

edges, as required.

#### Proof: Converse Direction

We use contradiction. Assume $G$ is connected, has $n-1$ edges, and contains a cycle. Removing any edge of that cycle does not disconnect $G$, so we obtain a connected graph $G'$ with $n-2$ edges.

However, every connected graph must have at least $n-1$ edges. This fact is assigned as a practice problem below. Thus, $G'$ must be disconnected, contradicting its construction. This proves the converse.

---

## 4. Planar Graphs and Euler's Formula

A graph is **planar** if it can be drawn in the plane without crossings. The first four graphs in the following image are planar. The first and second are the same graph drawn differently: even though the second drawing has crossings, the graph is planar because a drawing without crossings exists.

The other three graphs are non-planar. They are the "three houses-three wells" graph, $K_{3,3}$; the complete graph $K_5$; and the four-dimensional cube. The notation $K_{3,3}$ indicates two sets of three vertices, with every edge between the two sets present.

![[Pasted image 20261003142117.png]]

### Bipartite Graphs

A **bipartite graph** $G=(V,E)$ has its vertices split into two groups, with edges only between groups. Formally, $V=L\cup R$ and $E\subseteq L\times R$.

The graph $K_{3,3}$ is bipartite. The four-dimensional cube is also bipartite; the source relates this to the fact that every cycle in the cube has even length and says the equivalence will be shown later.

### Faces and Polyhedra

When a planar graph is drawn in the plane, its **faces** are the regions into which the drawing subdivides the plane. One face is infinite, the **outer face**, while the others are finite.

In this section, let $v$ be the number of vertices, $e$ the number of edges, and $f$ the number of faces. The first graph in the image above has $f=4$, and the fourth graph, the cube, has $f=6$.

Euler's formula states that

$$
v+f=e+2.
$$

Check this for the graphs above. The ancient Greeks knew the formula held for polyhedra, such as the cube, tetrahedron, and octahedron, but could not prove it. Induction on polyhedra is awkward: what is a polyhedron with a vertex or edge removed, and how could the induction hypothesis apply?

In the eighteenth century, Euler recognized that the theorem was too weak for induction. The right generalization of polyhedra is planar graphs.

> [!tip] Exercise
> Can you see why planar graphs generalize polyhedra? Why are all convex polyhedra planar graphs?

### Theorem 10.3 — Euler's Formula

For every connected planar graph,

$$
v+f=e+2.
$$

#### Proof

Proceed by induction on $e$. The formula holds when $e=0$ and $v=f=1$. For a connected planar graph $G$, consider two cases.

1. **$G$ is a tree.** Drawing a tree does not subdivide the plane, so $f=1$. Since $e=v-1$, the formula holds.
2. **$G$ is not a tree.** Find a cycle and delete any edge of that cycle. This reduces both $e$ and $f$ by one. By induction, the formula holds in the smaller graph, so it also holds in the original graph.

> [!tip] Exercise
> What happens when the graph is not connected? How does the number of connected components enter the formula?

### Counting Face Sides and Bounding Edges

Consider a face in a planar drawing. Its **sides** are the edges bounding it clockwise. An edge can be counted twice if it has the same face on both sides, as happens in a tree. Such edges are called **bridges**.

Let $s_i$ denote the number of sides of face $i$. Every edge is counted twice, once for the face on its right and once for the face on its left; these faces may coincide when the edge is a bridge. Thus, in any planar graph,

$$
\sum_{i=1}^{f}s_i=2e.\tag{1}
$$

Since parallel edges are not allowed, and assuming at least two edges and hence at least three vertices in the connected setting, every face has at least three sides: $s_i\geq3$. Therefore,

$$
3f\leq2e.
$$

Solving for $f$ and substituting into Euler's formula gives

$$
e\leq3v-6.
$$

> [!important] Planar Graphs Are Sparse
> For a connected planar graph with at least three vertices and no parallel edges, $e\leq3v-6$. Planar graphs cannot have too many edges.

A connected graph with 1,000 vertices can have roughly a thousand to half a million edges. For a planar graph, the range is much smaller: from 999 to 2,994 edges.

This bound shows that $K_5$ is non-planar: it has five vertices and ten edges, exceeding the bound $3v-6$.

For $K_{3,3}$, however, $v=6$ and $e=9$, so it passes this test. To obtain a stronger bound, notice that a planar drawing of $K_{3,3}$ would contain no triangles: a triangle would require either two houses or two wells to be connected, which they are not.

Thus, equation (1) gives $4f\leq2e$ rather than $3f\leq2e$. Solving for $f$ and substituting into Euler's formula yields

$$
e\leq2v-4.
$$

This stronger bound shows that $K_{3,3}$ is non-planar.

### Theorem 10.4 — Kuratowski's Theorem, as Stated in the Source

A graph $G$ is non-planar if and only if it contains $K_5$ or $K_{3,3}$.

Here, **contains** has a specific meaning. For each vertex $v$ of $K_5$, or of $K_{3,3}$, identify a connected subgraph $B_v$ of $G$ such that:

1. No two of the subgraphs $B_v$ share any vertices.
2. For every edge $\{u,v\}$ in $K_5$, or in $K_{3,3}$, there is an edge connecting $B_u$ to $B_v$. Multiple edges between these subgraphs are allowed.

Each $B_v$ represents one vertex of $K_5$ or $K_{3,3}$. If each connected subgraph is **contracted** into a single vertex, the resulting graph contains a copy of $K_5$ or $K_{3,3}$, possibly with extra edges. The source attributes the theorem to the Polish mathematician Kuratowski, which it gives as the origin of the "K" in this discussion.

#### Example: The Four-Dimensional Cube

The 4-cube contains $K_{3,3}$ in the sense just defined. Label the vertices on one side of $K_{3,3}$ as $u_1,u_2,u_3$ and those on the other side as $v_1,v_2,v_3$.

The three red blobs in Figure 3 are $B_{u_1},B_{u_2},B_{u_3}$, and the three green blobs are $B_{v_1},B_{v_2},B_{v_3}$. Each blob is connected, and all six are disjoint. The bold edges show that every red blob is joined to every green blob. There are other ways to find $K_{3,3}$ in the 4-cube as well.

![[Pasted image 20261003142132.png]]

> [!tip] Exercise
> Can you find $K_5$ in the same graph? As with $K_{3,3}$, this is a bit tricky. To show that a graph is non-planar, it is enough to show that it contains either $K_{3,3}$ or $K_5$; the 4-cube happens to contain both.

One direction of the theorem is immediate: a graph containing either of these non-planar graphs is itself non-planar. The other direction, showing that a graph without them can be drawn in the plane, is difficult. The source suggests searching for "proof of Kuratowski's theorem" if interested in a proof.

---

## 5. Connectivity and Hypercubes

Graphs can represent the interconnections between routers on the internet or another network. Sending a packet from one node to another requires a path from source to destination, so a network that can send a packet between any pair of nodes must be connected.

A tree is minimally connected and uses the fewest edges to connect a set of vertices. However, if any one edge fails, the network becomes disconnected. We therefore want **redundancy**, or **robustness**, in the network's connectivity.

At the opposite extreme, a complete graph has a connection between every pair of nodes and is extremely well connected.

> [!tip] Exercise
> What is the minimum number of edges that must be removed from $K_n$ to make it disconnected? **Hint:** How many edges must be removed to produce an isolated vertex?

Complete graphs are unrealistic as network architectures because they require too many edges:

$$
\frac{n(n-1)}{2}\sim\frac{n^2}{2}.
$$

A direct connection between every pair of nodes is unnecessary if the maximum node-to-node distance, called the **diameter**, is not too large. **Hypercube graphs** combine robust connectivity and small diameter without using too many edges.

### The Connection Machine

The Connection Machine was a massively parallel computer designed by Thinking Machines in the 1980s. Its idea was to have a million processors working in parallel, connected by a communications network. Connecting every pair with a direct wire would require $10^{12}$ wires, as stated in the source.

Instead, its builders used a 20-dimensional hypercube. This maintained strong connectivity while limiting each processor to 20 neighbors.

### Defining the Hypercube

The vertex set of an **$n$-dimensional hypercube** $G=(V,E)$ is

$$
V=\{0,1\}^n,
$$

the set of all $n$-bit strings. Each vertex has a unique label, such as $00110\cdots0100$.

Two vertices $x$ and $y$ are connected by an edge $\{x,y\}$ if and only if they differ in exactly one bit position. For example, $0000$ and $1000$ are neighbors, but $0000$ and $0011$ are not.

More formally, $x=x_1x_2\cdots x_n$ and $y=y_1y_2\cdots y_n$ are neighbors if and only if there exists $i\in\{1,\ldots,n\}$ such that $x_j=y_j$ for every $j\neq i$, and $x_i\neq y_i$.

The following image shows the one-, two-, and three-dimensional hypercubes.

![[Pasted image 20261003142141.png]]

The four-dimensional cube appeared earlier in the discussion of planar graphs, including Figure 3.

#### Recursive Definition

Define the **0-subcube** as the $(n-1)$-dimensional hypercube with vertices labeled $0x$ for $x\in\{0,1\}^{n-1}$. Similarly, the **1-subcube** has vertices labeled $1x$ for $x\in\{0,1\}^{n-1}$.

The $n$-dimensional hypercube consists of these two subcubes, together with an edge joining each pair $0x$ and $1x$.

> [!tip] Concept Check
> Where are the 0- and 1-subcubes in the three-dimensional hypercube above? Can you use them and the recursive definition to draw the four-dimensional hypercube?

> [!tip] Exercise
> Prove that the $n$-dimensional hypercube has $2^n$ vertices and diameter $n$. **Hint:** Each bit has two possible settings, 0 or 1. Notice that the diameter is exponentially smaller than the number of vertices.

### Lemma 10.1 — Number of Hypercube Edges

The total number of edges in an $n$-dimensional hypercube is

$$
n2^{n-1}.
$$

#### Proof 1: Counting Degrees

Each vertex has degree $n$, because any of the $n$ bit positions in $x\in\{0,1\}^n$ can be flipped. There are $2^n$ vertices, and every edge is counted twice, once from each endpoint. Thus, the number of edges is

$$
\frac{n2^n}{2}=n2^{n-1}.
$$

#### Proof 2: Recursive Definition

Let $E(n)$ be the number of edges in the $n$-dimensional hypercube. Its recursive definition gives

$$
E(n)=2E(n-1)+2^{n-1},\qquad E(1)=1.
$$

A straightforward induction shows that $E(n)=n2^{n-1}$.

> [!tip] Exercise
> Use induction to show that, in Proof 2, $E(n)=n2^{n-1}$.

### Theorem 10.5 — Hypercube Connectivity

To disconnect a subset $S\subseteq V$ from the rest of the hypercube, many edges must be removed. The number required scales with $|S|$. Recall that

$$
V\setminus S=\{v\in V\mid v\notin S\}.
$$

Let $S\subseteq V$ satisfy $|S|\leq|V\setminus S|$, equivalently $|S|\leq2^{n-1}$. Define the set of edges connecting $S$ to its complement by

$$
E_S:=\bigl\{\{u,v\}\in E\mid u\in S\text{ and }v\in V\setminus S\bigr\}.
$$

Then

$$
|E_S|\geq|S|.
$$

#### Proof

Proceed by induction on $n$.

**Base case, $n=1$:** The hypercube has vertices $0$ and $1$ and one edge $\{0,1\}$. The assumption gives $|S|\leq2^{1-1}=1$. If $|S|=0$, the claim holds trivially. Otherwise, $S=\{0\}$ and $V\setminus S=\{1\}$, or vice versa. In either case, there is one crossing edge, so $|E_S|=1=|S|$.

**Inductive hypothesis:** Assume the claim holds for $1\leq n\leq k$.

**Inductive step:** Consider $n=k+1$, with $|S|\leq2^k$. Let $S_0$ and $S_1$ be the vertices of $S$ in the 0- and 1-subcubes, respectively. Without loss of generality, assume $|S_0|\geq|S_1|$; otherwise, interchange their roles.

**Case 1: $|S_0|\leq2^{k-1}$ and $|S_1|\leq2^{k-1}$.**

Apply the induction hypothesis separately to each subcube. Within the 0-subcube, at least $|S_0|$ edges join $S_0$ to its complement in that subcube. Similarly, within the 1-subcube, at least $|S_1|$ edges join $S_1$ to its complement. Hence, the total number of edges between $S$ and $V\setminus S$ is at least

$$
|S_0|+|S_1|=|S|.
$$

**Case 2: $|S_0|>2^{k-1}$.**

The set $S_0$ is too large to apply the induction hypothesis directly. However, since $|S|\leq2^k$,

$$
|S_1|=|S|-|S_0|\leq2^{k-1}.
$$

We can therefore apply the hypothesis to $S_1$, obtaining at least $|S_1|$ crossing edges within the 1-subcube.

For the 0-subcube, let $V_0$ be its vertex set and consider $V_0\setminus S_0$. Since $|V_0|=2^k$,

$$
\begin{aligned}
|V_0\setminus S_0|
&=|V_0|-|S_0|\\
&=2^k-|S_0|\\
&<2^k-2^{k-1}\\
&=2^{k-1}.
\end{aligned}
$$

The induction hypothesis applies to $V_0\setminus S_0$, yielding at least $2^k-|S_0|$ edges between this set and $S_0$. Combining the two subcube totals gives at least

$$
2^k-|S_0|+|S_1|
$$

crossing edges. This is not yet enough to establish the desired bound.

We must also count edges crossing between the subcubes. Every vertex $0x$ is joined to its corresponding vertex $1x$. Therefore, at least $|S_0|-|S_1|$ edges in $E_S$ cross between the two subcubes.

Altogether,

$$
\begin{aligned}
|E_S|
&\geq2^k-|S_0|+|S_1|+|S_0|-|S_1|\\
&=2^k\\
&\geq|S|,
\end{aligned}
$$

as required.

---

## 6. Practice Problems

These problems connect Eulerian tours with de Bruijn sequences and complete the arguments used in Theorem 10.2.

1. A **de Bruijn sequence** is a $2^n$-bit circular sequence in which every string of length $n$ occurs as a contiguous substring exactly once. The following is an example for $n=3$.

   ![[Pasted image 20261003142152.png]]

   There are eight substrings of length three, each corresponding to a binary number from 0 to 7, such as $000$, $001$, and $010$.

   Such sequences can be generated from the **de Bruijn graph**, a directed graph $G=(V,E)$ on the vertex set $V=\{0,1\}^{n-1}$ of all $(n-1)$-bit strings. Each vertex $a_1a_2\cdots a_{n-1}$ has two outgoing edges:

   $$
   (a_1a_2\cdots a_{n-1},\;a_2a_3\cdots a_{n-1}0)\in E
   $$

   and

   $$
   (a_1a_2\cdots a_{n-1},\;a_2a_3\cdots a_{n-1}1)\in E.
   $$

   Each vertex also has two incoming edges:

   $$
   (0a_1a_2\cdots a_{n-2},\;a_1a_2\cdots a_{n-1})\in E
   $$

   and

   $$
   (1a_1a_2\cdots a_{n-2},\;a_1a_2\cdots a_{n-1})\in E.
   $$

   For example, when $n=4$, vertex $110$ has outgoing edges to $100$ and $101$, and incoming edges from $011$ and $111$. These edges are directed, and self-loops are permitted.

   A de Bruijn sequence is generated by an Eulerian tour in this graph. Euler's theorem can be adapted to directed graphs by replacing its even-degree condition with: **for every vertex, the in-degree equals the out-degree**. The de Bruijn graph satisfies this condition and has an Eulerian tour.

   To generate the sequence, start at any vertex, follow the tour, and append the bit shifted in from the right as each edge is traversed. Here is the de Bruijn graph for $n=3$.

   ![[Pasted image 20261003142201.png]]

   Find the Eulerian tour that generates the circular sequence shown above.

2. Complete the induction component of the proof of Theorem 10.2.
   - **(a)** Suppose $G'$ has two distinct connected components, $G'_1$ and $G'_2$. Complete the inductive step to show that $G$ is connected and has $n-1$ edges. **Hint:** Apply the induction hypothesis to $G'_1$ and $G'_2$ separately. This requires strong induction.
   - **(b)** More generally, $G'$ may have $t\geq2$ distinct connected components $G'_1,\ldots,G'_t$. Generalize your argument to this setting to complete the proof of Theorem 10.2.

   **Life lesson:** When faced with a difficult problem, in computer science research or everyday life, first try the simplest case, such as when $G'$ is connected. Then gradually extend the solution to harder cases until the general claim is established, such as when $G'$ has $t$ connected components.

3. Prove by induction on the number of vertices $n$ that every connected graph has at least $n-1$ edges.
