---
title: L12 Stable Matching
Content Type: Lecture
Content Area:
Course: CS70
description: "The lecture concluded the graph unit with the handshake lemma, complete graphs, trees, hypercubes, bipartite graphs, and planar graphs. It developed a constructive leaf argument, a graph-induction proof for the edge count of a tree, and counting walkthroughs for hypercubes and planar graphs."
pinned: false
Date Published: October 6, 2026
Last Updated: October 6, 2026
Status: Finalized
---

# L12 Stable Matching

## Executive Summary

This lecture presented a collection of graph types and graph properties. It began by deriving the handshake lemma from a six-person handshake problem, then used complete graphs and trees as examples of maximally and minimally connected structures. For trees, it gave a constructive argument that every nontrivial tree has a leaf and used graph induction to prove that a connected acyclic graph has exactly one fewer edge than vertices.

The lecture then defined an $n$-dimensional hypercube using bit strings, counted its vertices, neighbors, and edges, and compared its connectivity with complete graphs and trees. It concluded with bipartite graphs, complete bipartite graphs, planar graphs, Euler's formula, and an application showing why $K_5$ cannot be planar.

---

## Graphs as Abstractions

A graph reduces a problem to vertices and the edges connecting them. In the opening example, each vertex represented a person, and an edge between two vertices represented a handshake between those people.

This abstraction makes it possible to move between a concrete story and graph-theoretic language:

- A person becomes a vertex.
- A handshake becomes an edge.
- The number of people with whom one person shakes hands becomes the degree of that vertex.
- Counting all handshakes becomes counting the graph's edges.

The lecture emphasized using the course notes as a reference manual while solving problems. Rather than only reading the notes front to back, students can consult the relevant definitions and results as a problem requires them.

---

## Counting Handshakes

Suppose six people all shake hands with one another. The number of handshakes is $15$.

### Counting without repetition

One person shakes hands with five others. After those five handshakes have been counted, the next person has four new handshakes, the next has three, and so on. Thus,

$$
5+4+3+2+1=15.
$$

This method avoids double-counting each handshake.

### Counting by degrees and correcting double-counting

Alternatively, each of the six people shakes five hands. This gives

$$
6\cdot 5
$$

incidences of people with handshakes. Each handshake is counted once at each endpoint, so every handshake appears twice. Dividing by two gives

$$
\frac{6\cdot 5}{2}=15.
$$

### Connection to the sum of the first integers

The lecture recalled the formula

$$
1+2+\cdots+n=\frac{n(n+1)}{2}.
$$

A historical story about Gauss illustrated the pairing argument for the particular sum from $1$ through $100$. Pairing the first and last terms gives

$$
1+100=101.
$$

The next pair also gives

$$
2+99=101,
$$

and similarly for the remaining pairs. There are $50$ such pairs, so

$$
1+2+\cdots+100=101\cdot 50=5050.
$$

More generally, $1+n$, $2+(n-1)$, and the corresponding inward-moving pairs each sum to $n+1$.

---

## Degree and the Handshake Lemma

The degree of a vertex $v$, written $\deg(v)$, is the number of edges incident to it. In the handshake interpretation, it is the number of people whose hands that vertex's person shakes.

For a graph $G=(V,E)$, summing the degrees over all vertices counts each edge twice, once at each endpoint. Therefore,

$$
\sum_{v\in V}\deg(v)=2|E|.
$$

Equivalently,

$$
|E|=\frac{1}{2}\sum_{v\in V}\deg(v).
$$

This result was called both the **handshake lemma** and the **degree-sum lemma**.

### Example

In the graph drawn during lecture, the listed vertex degrees summed to $18$. Because each edge was counted at both endpoints,

$$
|E|=\frac{18}{2}=9.
$$

This illustrates how local information at individual vertices can reveal a global property of the graph.

---

## Complete Graphs

A **complete graph** contains every possible edge between distinct vertices. The complete graph on six vertices is denoted $K_6$, and more generally the complete graph on $n$ vertices is denoted $K_n$.

Every vertex in $K_n$ has degree $n-1$. Applying the handshake lemma gives

$$
|E|=\frac{n(n-1)}{2}.
$$

This is the same calculation as the all-to-all handshake problem.

A complete graph is highly connected: every vertex has a direct edge to every other vertex. In a transportation interpretation, every area of a city would have a direct line to every other area. The disadvantage is cost. The edge count grows quadratically, so connecting approximately $1000$ vertices in this way requires approximately one million edges.

---

## Trees

The lecture contrasted complete graphs with graphs that use the fewest edges needed to remain connected. Such a graph is a **tree**.

For six vertices, five edges can suffice to connect all of them. The resulting graph may require a long route between some pairs of vertices, but removing another edge would lose connectivity. In this sense, a complete graph is maximally connected while a tree is minimally connected.

The lecture stated that there are four equivalent definitions of a tree, although only two were developed explicitly:

1. A tree is connected and acyclic.
2. A tree is connected and satisfies
   $$
   |E|=|V|-1.
   $$

To prove several statements equivalent, one can arrange implications in a cycle. For four statements, it is enough to prove

$$
1\Rightarrow 2\Rightarrow 3\Rightarrow 4\Rightarrow 1.
$$

Once this implication cycle exists, every statement can be reached from every other statement.

The visual arrangement of a tree is not essential. A graph may be redrawn by choosing a different vertex as its apparent root, like picking up a chandelier from a different point. This was connected informally to rebalancing a tree by changing which node is treated as the root.

---

## Leaves in Trees

A vertex $v$ is a **leaf** when

$$
\deg(v)=1.
$$

The initial conjecture was that every tree has a leaf. A correction was then made for the one-vertex tree: a single isolated vertex is still a tree, but its only vertex has degree $0$. The precise claim is therefore that every **nontrivial** tree has a leaf.

### Constructive leaf-finding procedure

Assume the tree is connected and acyclic. The lecture proposed the following procedure:

1. Start at any vertex.
2. Walk through the graph without reusing an edge.
3. Continue until stuck.
4. Output the vertex where the walk stops.

The procedure constructs a leaf rather than merely asserting that one exists.

### Why the walk terminates

The graph has finitely many edges, and the procedure never reuses an edge. Thus, the walk cannot continue forever and must eventually become stuck at some vertex $v$.

### Why the stopping vertex is a leaf

Suppose the walk becomes stuck at $v$. If $\deg(v)>1$, then the incident edges at $v$ would all have to have been used, since otherwise the walk could continue.

The walk arrived at $v$ along one edge. For all incident edges to have already been used, the walk would have had to visit $v$ before and later return to it. Revisiting $v$ would create a cycle. That contradicts the assumption that the graph is acyclic.

Therefore, in the nontrivial case,

$$
\deg(v)=1,
$$

so $v$ is a leaf.

The argument uses a small contradiction inside the larger constructive proof: assuming the stopping vertex has degree greater than one forces a cycle.

---

## Graph Induction for the Edge Count of a Tree

The lecture proved the implication

$$
\text{connected and acyclic}
\quad\Longrightarrow\quad
|E|=|V|-1.
$$

The induction was performed on the number of vertices,

$$
n=|V|.
$$

### Base case

When $n=1$, the graph consists of a single vertex and no edges. Therefore,

$$
|V|-1=1-1=0=|E|.
$$

So the statement holds for the one-vertex tree.

### Inductive hypothesis

Assume the implication is true for connected acyclic graphs with

$$
|V|=k.
$$

Thus, any connected acyclic graph with $k$ vertices has

$$
|E|=k-1.
$$

### Inductive step

Consider an arbitrary connected acyclic graph

$$
G=(V,E)
$$

with

$$
|V|=k+1.
$$

The goal is to prove that $G$ has $k$ edges.

By the leaf lemma, the nontrivial tree $G$ has a leaf. Remove that leaf together with its single incident edge, producing a graph

$$
G'=(V',E').
$$

This choice matters. Removing an arbitrary internal vertex could disconnect the graph, but removing a leaf does not disconnect the remaining vertices. Removing an edge also cannot introduce a new cycle. Consequently, $G'$ remains connected and acyclic.

Because exactly one vertex was removed,

$$
|V'|=k.
$$

The inductive hypothesis can now be applied to $G'$, giving

$$
|E'|=k-1.
$$

Add the leaf and its one incident edge back. The original graph therefore has

$$
|E|=|E'|+1=(k-1)+1=k.
$$

Since the original graph has $k+1$ vertices,

$$
|E|=k=(k+1)-1=|V|-1.
$$

This completes the inductive step.

The lecture emphasized that the proof begins with an arbitrary graph of size $k+1$, examines a suitable subgraph of size $k$, applies the inductive hypothesis to that subgraph, and then returns to the original graph. It does not begin with an arbitrary smaller tree and assume that adding a vertex in an unspecified way produces every larger tree. The latter concern was identified as the **buildup error**.

---

## Hypercubes

A hypercube was introduced by repeatedly copying and connecting lower-dimensional objects:

- A zero-dimensional cube is a single point.
- Stretching or copying the point produces a line.
- Copying the line and connecting corresponding points produces a square.
- Copying the square and connecting corresponding points produces a cube.
- Repeating the construction gives higher-dimensional hypercubes, even though dimensions above three are difficult to visualize geometrically.

### Formal bit-string definition

In an $n$-dimensional hypercube:

- Every vertex is labeled by an $n$-bit string.
- Two vertices are neighbors exactly when their bit strings differ in one bit.

For example, the two-bit vertex $00$ has neighbors $10$ and $01$, since each differs from $00$ in exactly one position. The remaining vertex $11$ is one bit flip away from both $10$ and $01$.

For three bits, the vertex $000$ has the three neighbors

$$
001,\qquad 010,\qquad 100.
$$

Each neighbor is obtained by flipping one of the three positions.

### Number of vertices

There are two choices for every bit and $n$ bit positions, so the number of vertices is

$$
2^n.
$$

### Degree of every vertex

Every vertex has $n$ bits that can individually be flipped. Therefore, every vertex has exactly $n$ neighbors:

$$
\deg(v)=n.
$$

### Number of edges

There are $2^n$ vertices, each of degree $n$. By the handshake lemma,

$$
|E|
=
\frac{2^n\cdot n}{2}.
$$

The division by two corrects for counting each edge at both endpoints.

### Maximum distance between two vertices

Moving along one edge flips one bit. In the worst case, two strings differ in every one of their $n$ bit positions, so reaching one from the other requires $n$ bit flips.

For example, the all-zero string and the all-one string are at this maximum distance. Thus, the furthest two vertices can be from one another is

$$
n.
$$

---

## Comparing Complete Graphs, Trees, and Hypercubes

The lecture compared three ways of connecting eight vertices.

### Complete graph on eight vertices

In $K_8$, every vertex has degree $7$. The handshake lemma gives

$$
|E|
=
\frac{8\cdot 7}{2}
=
28.
$$

Every pair of vertices is adjacent, so the furthest distance between two vertices is $1$.

### Tree on eight vertices

A tree has one fewer edge than vertices, so a tree on eight vertices has

$$
|E|=8-1=7.
$$

In the most stretched-out arrangement discussed in lecture, traveling between the two endpoints can require traversing all seven edges. Thus, the furthest possible distance in such a tree is $7$.

### Hypercube on eight vertices

Because

$$
2^3=8,
$$

eight vertices form a three-dimensional hypercube. Every vertex has degree $3$, so

$$
|E|
=
\frac{8\cdot 3}{2}
=
12.
$$

The maximum distance is $3$, corresponding to changing all three bits.

The resulting comparison was:

| Graph | Number of edges | Furthest distance discussed |
|---|---:|---:|
| Complete graph | $28$ | $1$ |
| Hypercube | $12$ | $3$ |
| Tree | $7$ | $7$ |

The hypercube therefore sits between the complete graph and a tree in this comparison. It uses more edges than a tree but far fewer than a complete graph, while keeping vertices closer together than the worst-case tree arrangement.

The lecture identified the hypercube as an example associated with the term **expander graph**, while noting that whether it is the “most efficient” structure depends on the problem and on the metric used for efficiency.

---

## Bipartite Graphs

A graph is **bipartite** when its vertices can be separated into two disjoint sets, called $L$ and $R$, such that every edge goes from one set to the other.

Formally, the vertex set satisfies

$$
V=L\cup R,
$$

where $L$ and $R$ are disjoint. This means that $L$ and $R$ partition all the vertices: every vertex belongs to one side, no vertex belongs to both sides, and no vertex lies outside the two sets.

The edge condition was written as

$$
E\subseteq L\times R.
$$

In natural language, every edge has one endpoint in $L$ and the other in $R$. Edges from $L$ to $L$ or from $R$ to $R$ are not allowed.

### Visual arrangement does not determine bipartiteness

A graph may not initially look bipartite. The relevant question is whether its vertices can be rearranged into two valid sets.

In the four-vertex example labeled $A,B,C,D$, placing $A$ on one side forced its neighbors onto the other side. After the vertices were rearranged according to those constraints, all edges went between the two sides. The graph was therefore bipartite even though its original drawing did not make that structure obvious.

A graph with vertices but no edges is also bipartite. Since it has no edges, it vacuously has no forbidden edge within either side.

### Complete bipartite graphs

A **complete bipartite graph** contains every possible edge between its two parts, while still containing no edge within either part.

The graph

$$
K_{3,3}
$$

has three vertices on the left, three on the right, and every possible edge between the two groups. Similarly, $K_{3,4}$ has three vertices in one part and four in the other, with every cross-part edge included.

The lecture also observed that layered neural networks can have a multipartite structure, with the layers acting as multiple vertex groups.

---

## Planar Graphs

A graph is **planar** if it can be drawn in a plane without any edges crossing. The property belongs to the graph, not to one particular drawing.

A graph drawn with crossing edges may still be planar if it can be redrawn without crossings. The lecture demonstrated this by redrawing one crossing graph in a crossing-free form. A cube is also planar: although a familiar perspective drawing may show apparent crossings or overlapping geometry, it can be arranged in the plane without edge crossings.

The difficulty is that a particular drawing with crossings does not by itself prove that the graph is nonplanar. One must determine whether some crossing-free drawing exists.

---

## Faces and Euler's Formula

In a planar drawing, a **face** is a region enclosed by edges. The unbounded region outside the graph also counts as a face.

For the planar cube drawing, the lecture counted the bounded regions and the outside region to obtain six faces, matching the six sides associated with a physical cube.

For a connected planar graph, Euler's formula is

$$
|V|+|F|=|E|+2,
$$

where $|F|$ is the number of faces in a planar drawing.

The formula can help disprove planarity through its contrapositive: if a connected graph cannot satisfy the required planar relationship, then it is not planar.

However, one cannot simply count regions in a drawing whose edges cross and treat those regions as planar faces. Faces are defined using a planar drawing, so this direct approach cannot initially be applied to a graph such as the displayed drawing of $K_5$.

---

## The Planar Edge Bound and $K_5$

The lecture stated an extension of Euler's formula for planar graphs:

$$
|E|\leq 3|V|-6.
$$

Its intuitive meaning is that a planar graph cannot have too many edges relative to its number of vertices.

### Applying the bound to $K_5$

The complete graph $K_5$ has five vertices. Every vertex has degree $4$, so the handshake lemma gives

$$
|E|
=
\frac{5\cdot 4}{2}
=
10.
$$

If $K_5$ were planar, the edge bound would require

$$
|E|\leq 3|V|-6.
$$

Substituting $|V|=5$ gives

$$
3|V|-6
=
3\cdot 5-6
=
15-6
=
9.
$$

But

$$
10\not\leq 9.
$$

Therefore, $K_5$ violates the stated planar edge bound and cannot be planar.

The derivation of the bound

$$
|E|\leq 3|V|-6
$$

was not completed during the lecture; students were directed to the course notes for its proof.

---

## Unclear or Incomplete Steps

The lecture stated that four definitions of a tree are equivalent, but only the following two were given explicitly in the available notes:

1. The graph is connected and acyclic.
2. The graph is connected and has $|E|=|V|-1$.

The remaining two definitions cannot be recovered from these notes.

The lecture did not prove Euler's formula or derive the planar edge bound $|E|\leq 3|V|-6$. Both results were stated, and the latter was applied to $K_5$, but their supporting derivations were left to the written notes.