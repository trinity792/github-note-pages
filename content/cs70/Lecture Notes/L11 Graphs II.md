---
title: L10 Graphs II
Content Type: Lecture
Content Area:
Course: CS70
description: "The lecture develops the handshake lemma and uses it to count edges in complete graphs and hypercubes. It then studies equivalent descriptions of trees, proves that every nontrivial tree has a leaf, uses graph induction to count tree edges, and introduces bipartite and planar graphs."
pinned: false
Date Published: October 1, 2026
Last Updated: October 1, 2026
Status: Finalized
---

# L10 Graphs II

## Executive Summary

This lecture treats graph theory as a way to abstract systems into vertices and edges, then develops several common graph families and properties. It begins with the handshake problem and the handshake lemma, introduces complete graphs and trees as maximally and minimally connected structures, proves a leaf lemma and the tree edge formula, constructs hypercubes from bit strings, defines bipartite and complete bipartite graphs, and concludes with planar graphs, faces, Euler's formula, and an edge bound used to show that $K_5$ is not planar.

---

## The Handshake Problem and Degree Counting

Suppose six people all meet and each pair shakes hands. Represent each person by a vertex and each handshake by an edge. The question then becomes: how many edges are in the graph in which every pair of six vertices is connected?

### Counting each handshake once

Begin with one person. That person shakes hands with the other five people, contributing $5$ handshakes. For the second person, the handshake with the first person has already been counted, so only $4$ new handshakes remain. Continuing this way gives

$$
5+4+3+2+1=15.
$$

This method avoids double-counting by keeping track of the handshakes already included.

### Counting locally and correcting for double-counting

Alternatively, each of the six people shakes five hands, so the local counts sum to

$$
6\cdot 5.
$$

This counts each handshake twice - once from each endpoint of its edge. Dividing by two gives

$$
\frac{6\cdot 5}{2}=15.
$$

This illustrates a recurring graph-theoretic idea: local information at individual vertices can reveal a global property of the graph.

### The sum from $1$ through $n$

The lecture connected the first counting method to the identity

$$
1+2+\cdots+n=\frac{n(n+1)}{2}.
$$

A historical story about Gauss motivates a quick way to see the pattern. For the numbers from $1$ through $100$, pair the first and last numbers:

$$
1+100=101.
$$

The next pair also sums to $101$:

$$
2+99=101,
$$

as does $3+98$, and so on. There are $50$ such pairs, so

$$
1+2+\cdots+100=101\cdot 50=5050.
$$

More generally, pairing $1$ with $n$, $2$ with $n-1$, and so forth produces the factor $n+1$ repeatedly and leads to the formula above.

---

## The Handshake Lemma

The degree of a vertex $v$, written $\deg(v)$, is the number of edges incident to it. Informally, it is the number of neighbors that the vertex has.

In the lecture's example graph, the vertex degrees were added:

$$
2+3+1+3+3+4+1+1=18.
$$

This does not directly equal the number of edges because every edge contributes once to the degree of each endpoint. Thus every edge appears twice in the degree sum. The graph therefore has

$$
\frac{18}{2}=9
$$

edges.

For a graph $G=(V,E)$, the handshake lemma, also called the degree-sum lemma, states

$$
\sum_{v\in V}\deg(v)=2|E|.
$$

Equivalently,

$$
|E|=\frac{1}{2}\sum_{v\in V}\deg(v).
$$

The lemma formalizes the double-counting argument: summing all vertex degrees counts every edge exactly twice.

---

## Complete Graphs

A complete graph contains every possible edge between distinct vertices. The complete graph on $n$ vertices is denoted $K_n$.

For example, $K_6$ represents the six-person handshake problem: every person shakes hands with every other person.

Each vertex in $K_n$ has degree $n-1$. Applying the handshake lemma gives

$$
|E|
=\frac{n(n-1)}{2}.
$$

Thus a complete graph has a quadratic number of edges in the number of vertices.

### Connectivity versus cost

The lecture interpreted vertices as areas in a city and edges as direct subway connections. A complete graph is convenient because any area has a direct connection to every other area, so the distance between any two distinct vertices is one edge.

The disadvantage is cost. A complete graph uses approximately quadratically many edges. With roughly $1000$ vertices, the number of edges is on the order of one million. Similar reasoning applies when vertices represent servers and edges represent physical connections: complete connectivity is powerful but expensive.

---

## Trees

A tree was presented as a minimally connected graph, in contrast with a complete graph's maximal connectivity.

For six vertices, it is possible to connect all vertices using five edges. Such a graph may force some routes to pass through many intermediate vertices, but removing another edge would destroy connectivity.

The lecture referred to four equivalent definitions of a tree from the course notes. The definition used in the proofs was:

> A tree is a connected, acyclic graph.

Here:

- Connected means that one can get from any vertex to any other vertex.
- Acyclic means that the graph contains no cycle, so there is no route that starts at a vertex, follows edges, and returns to that vertex as a cycle.

Tree drawings need not look like the rooted trees commonly used in computer science. One can imagine lifting an unrooted tree by a chosen vertex and letting the rest hang like a chandelier. Choosing a different vertex this way changes the rooted presentation without changing the underlying graph.

A hierarchical file system was given as a typical tree-like example, although symbolic links can disrupt the strict tree structure.

### Proving several definitions equivalent

If four statements describe equivalent definitions, one could prove an if-and-only-if relationship between every pair, but that requires many separate proofs.

A more economical method is to prove a cycle of implications:

$$
1\implies 2\implies 3\implies 4\implies 1.
$$

Following this implication cycle allows any one of the statements to reach any other, establishing their equivalence.

---

## Leaves in Trees

A vertex $v$ is a leaf if

$$
\deg(v)=1.
$$

The lecture first proposed the claim that every tree has a leaf, then corrected it after considering a one-vertex tree. A single isolated vertex is itself a tree under the connected-and-acyclic definition, but its only vertex has degree zero.

The corrected statement is:

> Every nontrivial tree has a leaf.

Here, the excluded trivial case is the tree consisting of one vertex.

### Constructive leaf-finding procedure

The lecture gave a constructive method for finding a leaf:

1. Start at any vertex.
2. Walk through the graph without reusing an edge.
3. Continue until stuck.
4. Output the vertex where the walk becomes stuck.

The procedure terminates because the graph has finitely many edges and no edge is reused.

Suppose the walk becomes stuck at a vertex $v$. If $\deg(v)>1$, then all incident edges being unavailable would mean that the walk had previously visited and departed from $v$ before returning to it. Revisit­ing $v$ would create a cycle. That contradicts the assumption that the tree is acyclic.

Therefore the endpoint cannot have degree greater than one. In the nontrivial case, it has degree one:

$$
\deg(v)=1.
$$

Hence the endpoint is a leaf. The argument not only establishes existence but also provides an algorithm for finding such a vertex.

---

## Graph Induction: A Tree Has $|V|-1$ Edges

The lecture proved one implication among the equivalent tree definitions:

> If a graph is connected and acyclic, then it is connected and has
> $$
> |E|=|V|-1.
> $$

The proof uses induction on the number of vertices,

$$
n=|V|.
$$

### Base case

Let $n=1$. The graph consists of a single vertex and no edges. Therefore

$$
|E|=0=1-1=|V|-1.
$$

So the statement holds for the one-vertex tree.

### Inductive hypothesis

Assume the statement holds for every connected, acyclic graph having $k$ vertices. Thus, for such a graph,

$$
|E|=k-1.
$$

### Inductive step

Consider an arbitrary connected, acyclic graph

$$
G=(V,E)
$$

with

$$
|V|=k+1.
$$

Because this is a nontrivial tree, the leaf lemma guarantees that it contains a leaf. Remove that leaf together with its single incident edge, producing a graph

$$
G'=(V',E').
$$

The new graph has

$$
|V'|=k.
$$

Removing a leaf does not disconnect the remaining vertices because the removed vertex had only one incident edge. Removing an edge also cannot introduce a cycle. Therefore $G'$ remains connected and acyclic.

The inductive hypothesis applies to $G'$, giving

$$
|E'|=k-1.
$$

Now add the removed leaf and its one incident edge back. This recovers the original graph $G$, so

$$
|E|=|E'|+1=(k-1)+1=k.
$$

Since $|V|=k+1$,

$$
|E|=k=(k+1)-1=|V|-1.
$$

This completes the inductive step.

### Why the proof starts with the larger graph

The proof begins with an arbitrary graph of size $k+1$, removes a carefully selected vertex, applies the inductive hypothesis to the resulting subgraph, and then returns to the original graph.

The instructor warned against reversing this reasoning by beginning with an arbitrary size-$k$ graph and growing it. That approach can lead to the “buildup error,” because constructing some graph of size $k+1$ does not necessarily establish the statement for every graph of that size.

The leaf is chosen specifically because removing an arbitrary internal vertex might disconnect the graph. Removing a leaf preserves exactly the properties needed to invoke the inductive hypothesis.

---

## Hypercubes

A hypercube generalizes the process of extending a point into a line, a line into a square, and a square into a cube.

The visual pattern begins as follows:

- A $0$-cube is a single point.
- Stretching the point creates a line.
- Stretching the line creates a square.
- Stretching the square creates a cube.
- Repeating this construction conceptually creates higher-dimensional hypercubes, even though dimensions beyond three are difficult to visualize.

### Formal definition with bit strings

The vertices of an $n$-dimensional hypercube are all $n$-bit strings. Two vertices are neighbors exactly when their strings differ in one bit.

For the $2$-cube, the vertices are

$$
00,\quad 01,\quad 10,\quad 11.
$$

The neighbors of $00$ include $10$ and $01$, since each differs from $00$ in exactly one position.

For the $3$-cube, the vertex $000$ has the three neighbors

$$
001,\quad 010,\quad 100.
$$

Each neighbor is obtained by flipping exactly one bit.

### Number of vertices

There are two choices for each of the $n$ bit positions, so the $n$-cube has

$$
2^n
$$

vertices.

### Degree of each vertex

Every $n$-bit string has $n$ bit positions that can be flipped. Thus every vertex has exactly $n$ neighbors:

$$
\deg(v)=n.
$$

For example, a vertex in the $6$-cube has six neighbors. Each neighbor is formed by flipping one of its six bits.

### Number of edges

There are $2^n$ vertices, each of degree $n$. The handshake lemma gives

$$
|E|
=\frac{2^n\cdot n}{2}.
$$

The division by two corrects for counting every edge from both endpoints.

### Maximum distance

Moving along one edge flips one bit. Two vertices are furthest apart when every bit must be flipped, such as the all-zero string and the all-one string. Therefore the furthest distance between two vertices in the $n$-cube is

$$
n.
$$

### Comparing complete graphs, trees, and hypercubes

The lecture compared three ways to connect eight vertices.

For the complete graph, each of the eight vertices has degree seven, so

$$
|E|=\frac{8\cdot 7}{2}=28.
$$

Every pair of distinct vertices is directly connected, so the furthest distance is one.

For a tree on eight vertices,

$$
|E|=8-1=7.
$$

In the most stretched-out example discussed, two endpoints can be seven edges apart.

For a hypercube, eight vertices require three-bit strings because

$$
2^3=8.
$$

Each vertex has three neighbors, so

$$
|E|=\frac{8\cdot 3}{2}=12.
$$

The furthest distance is three, corresponding to changing all three bits.

Thus the examples compare as follows:

| Graph on eight vertices | Number of edges | Furthest distance discussed |
|---|---:|---:|
| Complete graph | $28$ | $1$ |
| Tree | $7$ | $7$ |
| $3$-dimensional hypercube | $12$ | $3$ |

The hypercube lies between the complete graph and a tree in this connectivity comparison: it uses more edges than a tree but far fewer than a complete graph, while also offering shorter routes than the most stretched-out tree.

The instructor described the hypercube as useful because it is well connected while remaining sparse relative to a complete graph. Whether it is “most efficient” depends on the problem and on which quantity is being optimized.

---

## Bipartite Graphs

A bipartite graph separates its vertices into two disjoint sets, conventionally called $L$ and $R$ for “left” and “right.”

Formally, the vertex set satisfies

$$
V=L\cup R,
$$

where $L$ and $R$ are disjoint. Together, they contain every vertex in the graph.

The edge condition is

$$
E\subseteq L\times R.
$$

In natural language, every edge must go from a vertex in $L$ to a vertex in $R$. There can be no edge with both endpoints in $L$ and no edge with both endpoints in $R$.

### Recognizing bipartite structure

A graph's first drawing may hide its bipartite structure. Planar placement and left-right placement are not intrinsic parts of the graph; what matters is which vertices are connected.

In one four-vertex example, the original drawing did not visually resemble two separated sides. After the vertices were rearranged, they could be partitioned into two sets so that every edge ran between the sets. The graph was therefore bipartite despite its original appearance.

A graph with vertices but no edges is also bipartite. No matter how the vertices are split into $L$ and $R$, there are no edges within either side that could violate the definition.

By contrast, the complete graph example considered in class could not be partitioned in the required way, because its all-to-all connectivity forces an edge within one of the two sides.

The figure below contrasts a bipartite graph with a non-bipartite one. On the left, a 4-cycle can be split into $L=\{a,c\}$ and $R=\{b,d\}$, so every edge crosses between the sides. On the right, the triangle $K_3$ cannot be split this way: any two-set partition puts two of its three vertices on the same side, and those two are adjacent.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 340" width="720" height="340" font-family="Helvetica, Arial, sans-serif">
  <rect width="720" height="340" fill="#ffffff"/>

  <!-- Bipartite graph -->
  <text x="170" y="30" text-anchor="middle" font-size="18" font-weight="bold" fill="#222">Bipartite (4-cycle)</text>
  <rect x="50" y="55" width="80" height="210" rx="14" fill="#e8f0fe" stroke="#4a78d4" stroke-dasharray="5 4"/>
  <rect x="210" y="55" width="80" height="210" rx="14" fill="#fdeee3" stroke="#d9772b" stroke-dasharray="5 4"/>
  <text x="90" y="285" text-anchor="middle" font-size="15" fill="#4a78d4">L</text>
  <text x="250" y="285" text-anchor="middle" font-size="15" fill="#d9772b">R</text>
  <g stroke="#333" stroke-width="2.5">
    <line x1="90" y1="105" x2="250" y2="105"/>
    <line x1="90" y1="105" x2="250" y2="215"/>
    <line x1="90" y1="215" x2="250" y2="105"/>
    <line x1="90" y1="215" x2="250" y2="215"/>
  </g>
  <g stroke="#222" stroke-width="2">
    <circle cx="90" cy="105" r="18" fill="#bcd0f7"/>
    <circle cx="90" cy="215" r="18" fill="#bcd0f7"/>
    <circle cx="250" cy="105" r="18" fill="#f7cfae"/>
    <circle cx="250" cy="215" r="18" fill="#f7cfae"/>
  </g>
  <g text-anchor="middle" font-size="15" fill="#111" font-weight="bold">
    <text x="90" y="110">a</text>
    <text x="90" y="220">c</text>
    <text x="250" y="110">b</text>
    <text x="250" y="220">d</text>
  </g>
  <text x="170" y="320" text-anchor="middle" font-size="14" fill="#444">Every edge goes between L and R</text>

  <!-- Divider -->
  <line x1="360" y1="40" x2="360" y2="310" stroke="#bbb" stroke-dasharray="4 4"/>

  <!-- Non-bipartite graph -->
  <text x="545" y="30" text-anchor="middle" font-size="18" font-weight="bold" fill="#222">Not bipartite (triangle K₃)</text>
  <g stroke="#333" stroke-width="2.5">
    <line x1="545" y1="80" x2="460" y2="225"/>
    <line x1="545" y1="80" x2="630" y2="225"/>
    <line x1="460" y1="225" x2="630" y2="225" stroke="#c0392b" stroke-width="4"/>
  </g>
  <g stroke="#222" stroke-width="2" fill="#e5e5e5">
    <circle cx="545" cy="80" r="18"/>
    <circle cx="460" cy="225" r="18"/>
    <circle cx="630" cy="225" r="18"/>
  </g>
  <g text-anchor="middle" font-size="15" fill="#111" font-weight="bold">
    <text x="545" y="85">x</text>
    <text x="460" y="230">y</text>
    <text x="630" y="230">z</text>
  </g>
  <text x="545" y="265" text-anchor="middle" font-size="13" fill="#c0392b">If x ∈ L, then y, z ∈ R, but y–z is an edge within R</text>
  <text x="545" y="320" text-anchor="middle" font-size="14" fill="#444">No valid L/R split exists</text>
</svg>
```

From Claude Sonnet: Every tree is bipartite. Pick any root and put vertices at even depth in $L$ and vertices at odd depth in $R$. Each edge joins a parent to a child, whose depths differ by one, so every edge crosses between the sides. The figure below shows this with root $r$: $L=\{r,d,e,f\}$ and $R=\{a,b,c\}$.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 360" width="560" height="360" font-family="Helvetica, Arial, sans-serif">
  <rect width="560" height="360" fill="#ffffff"/>
  <text x="280" y="30" text-anchor="middle" font-size="18" font-weight="bold" fill="#222">Bipartite (tree)</text>

  <!-- Edges -->
  <g stroke="#333" stroke-width="2.5">
    <line x1="280" y1="80" x2="120" y2="170"/>
    <line x1="280" y1="80" x2="280" y2="170"/>
    <line x1="280" y1="80" x2="440" y2="170"/>
    <line x1="120" y1="170" x2="60" y2="265"/>
    <line x1="120" y1="170" x2="180" y2="265"/>
    <line x1="440" y1="170" x2="440" y2="265"/>
  </g>

  <!-- L vertices (even depth) -->
  <g stroke="#222" stroke-width="2" fill="#bcd0f7">
    <circle cx="280" cy="80" r="18"/>
    <circle cx="60" cy="265" r="18"/>
    <circle cx="180" cy="265" r="18"/>
    <circle cx="440" cy="265" r="18"/>
  </g>
  <!-- R vertices (odd depth) -->
  <g stroke="#222" stroke-width="2" fill="#f7cfae">
    <circle cx="120" cy="170" r="18"/>
    <circle cx="280" cy="170" r="18"/>
    <circle cx="440" cy="170" r="18"/>
  </g>
  <g text-anchor="middle" font-size="15" fill="#111" font-weight="bold">
    <text x="280" y="85">r</text>
    <text x="120" y="175">a</text>
    <text x="280" y="175">b</text>
    <text x="440" y="175">c</text>
    <text x="60" y="270">d</text>
    <text x="180" y="270">e</text>
    <text x="440" y="270">f</text>
  </g>

  <!-- Depth labels -->
  <g font-size="13" fill="#666" text-anchor="end">
    <text x="545" y="85">depth 0</text>
    <text x="545" y="175">depth 1</text>
    <text x="545" y="270">depth 2</text>
  </g>

  <!-- Legend -->
  <circle cx="190" cy="328" r="8" fill="#bcd0f7" stroke="#222" stroke-width="1.5"/>
  <text x="206" y="333" font-size="14" fill="#444">L (even depth)</text>
  <circle cx="330" cy="328" r="8" fill="#f7cfae" stroke="#222" stroke-width="1.5"/>
  <text x="346" y="333" font-size="14" fill="#444">R (odd depth)</text>
</svg>
```

### Complete bipartite graphs

A complete bipartite graph contains every possible edge between its left and right vertex sets, while still containing no edge within either set.

The notation

$$
K_{3,3}
$$

denotes the complete bipartite graph with three vertices on the left and three on the right. Every left vertex is connected to every right vertex.

Similarly, $K_{3,4}$ has three vertices on one side and four on the other, with all possible cross-set edges.

The lecture also noted that neural-network layers can resemble a multipartite structure, with successive layers supplying multiple vertex groups.

---

## Planar Graphs

A graph is planar if it can be drawn in a plane without any edges crossing. In the lecture, the plane was described concretely as pencil and paper or the board.

Planarity is a property of the graph, not of one particular drawing. A drawing with crossings does not prove that the graph is nonplanar. The vertices and edges may be rearranged into a crossing-free drawing.

For example, a cube may initially be drawn with crossing edges, but it can also be redrawn as an outer square connected to an inner square. In that form, no edges cross, so the cube graph is planar.

### Faces

Once a connected planar graph is drawn without crossings, its edges divide the plane into faces. A face is a region enclosed by edges, together with one additional outside face.

For the planar cube drawing, the lecture counted six faces. This agrees with the familiar interpretation of a physical cube as having six sides, although one of the regions in the planar drawing is the outside face.

In another example, three bounded regions plus the outside region produced four faces.

### Euler's formula

For a connected planar graph,

$$
|V|+|F|=|E|+2,
$$

where $F$ is the set of faces in a planar drawing.

The formula applies only after a crossing-free planar drawing supplies well-defined faces. One cannot take a drawing whose edges cross and treat the regions created by those crossings as the faces required by Euler's formula.

The contrapositive viewpoint is useful: if a connected graph cannot satisfy the required planar relationship, then it is not planar.

### Edge bound for planar graphs

The lecture stated, without completing its derivation, that Euler's formula leads to the bound

$$
|E|\leq 3|V|-6.
$$

The intuitive interpretation is that a planar graph cannot have too many edges relative to its number of vertices.

### Applying the bound to $K_5$

For $K_5$, every one of the five vertices has degree four. The handshake lemma gives

$$
|E|=\frac{5\cdot 4}{2}=10.
$$

The planar edge bound would require

$$
|E|\leq 3|V|-6.
$$

Substituting $|V|=5$ gives

$$
3(5)-6=15-6=9.
$$

But

$$
10\not\leq 9.
$$

Therefore $K_5$ violates the stated planar edge bound and is not planar.

---

## Unclear or Incomplete Steps

The lecture stated that Euler's formula implies

$$
|E|\leq 3|V|-6,
$$

but did not give the derivation because time ran out. The instructor directed students to the course notes for that proof, so the intermediate reasoning cannot be reconstructed from these notes alone.