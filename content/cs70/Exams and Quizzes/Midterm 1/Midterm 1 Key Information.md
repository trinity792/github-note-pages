---
title: Midterm 1 Key Information
Content Type: Reference
description: Reference notes for CS70 Midterm 1
pinned: true
Date Published: October 7th, 2026 - 11:11 AM
Last Updated: October 7th, 2026 - 11:11 AM
Status: Finalized
---
# Midterm 1 Information
[[Modular Arithmetic Formulas and Theorems]]
[[Chinese Remainder Theorem Approaches]]
[[Extended Euclid]]

## Graphs
[[Graph Theory Quick Facts]]
### Properties
#### Reference Table

| Graph type                         | Core properties                                                                                                                                                                                                                                                                                 | Brief justification / intuition                                                                                                                                                                            |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Undirected graph                   | Edges $\{u,v\}$ represent symmetric relationships. A vertex’s degree counts its incident edges.                                                                                                                                                                                                 | Like a two-way street: a connection works in either direction.                                                                                                                                             |
| Directed graph                     | Edges $(u,v)$ have directions; the reverse edge need not exist. Vertices have separate in-degrees and out-degrees.                                                                                                                                                                              | Like one-way streets: incoming and outgoing connections play different roles.                                                                                                                              |
| Multigraph                         | Multiple edges may connect the same pair of vertices.                                                                                                                                                                                                                                           | Several distinct bridges can connect the same two land masses.                                                                                                                                             |
| Connected graph                    | Every pair of distinct vertices has a path between them.                                                                                                                                                                                                                                        | Every vertex is reachable from every other vertex.                                                                                                                                                         |
| Disconnected graph                 | Vertices form multiple connected components, with no paths between different components.                                                                                                                                                                                                        | The network splits into separate reachable pieces.                                                                                                                                                         |
| Even-degree graph / Eulerian graph | Every vertex has even degree. An undirected graph has an Eulerian tour iff all degrees are even and all non-isolated vertices belong to one connected component.                                                                                                                                | Each arrival pairs with a departure. Connectivity allows one closed walk to traverse every edge exactly once.                                                                                              |
| Complete graph $K_n$               | Every pair of distinct vertices is adjacent. Each vertex has degree $n-1$, and there are $\frac{n(n-1)}{2}$ edges.                                                                                                                                                                              | Every possible connection is present. Summing degrees counts each edge twice.                                                                                                                              |
| Complete directed graph            | Both $(u,v)$ and $(v,u)$ exist for every pair of distinct vertices. Each vertex has in-degree and out-degree $n-1$, giving $n(n-1)$ directed edges.                                                                                                                                             | Every vertex connects directly to every other vertex in both directions.                                                                                                                                   |
| Tree                               | Connected and cycle-free, with exactly $n-1$ edges. There is exactly one simple path between any two vertices. Removing any edge disconnects it; adding an edge between previously nonadjacent vertices creates a cycle.                                                                        | A tree has just enough edges to connect everything. Two distinct paths between the same vertices would create a cycle.                                                                                     |
| Rooted tree                        | A tree with a designated root. Level $k$ contains vertices at distance $k$ from the root; depth is the greatest root-to-leaf distance. In Note 10, the root is never a leaf.                                                                                                                    | Selecting a root organizes the tree into a hierarchy, such as successive generations of cell division.                                                                                                     |
| Bipartite graph                    | Vertices split into two disjoint groups, with edges only between groups. Equivalently, there are no odd-length cycles.                                                                                                                                                                          | Every step switches groups, so returning to the starting group requires an even number of steps.                                                                                                           |
| Complete bipartite graph $K_{3,3}$ | Two groups of three vertices, with all nine edges between groups and none within either group. It is non-planar.                                                                                                                                                                                | Models three houses each connected to three wells. Its nine edges exceed the bipartite planar bound $2(6)-4=8$.                                                                                            |
| Planar graph                       | Has a drawing without edge crossings. A connected planar drawing satisfies $v-e+f=2$, including the outer face. For simple planar graphs with $v\ge3$, $e\le3v-6$; if also bipartite, $e\le2v-4$.                                                                                               | Deleting a cycle edge merges two faces, preserving Euler’s formula. Counting edge sides around faces yields the edge bounds.                                                                               |
| Non-planar graph                   | Cannot be drawn without crossings. Examples include $K_5$, $K_{3,3}$, and the four-dimensional cube.                                                                                                                                                                                            | Crossings must be unavoidable in every drawing. Violating a planar edge bound proves non-planarity, although satisfying a bound does not prove planarity.                                                  |
| $d$-dimensional hypercube          | Vertices are $d$-bit strings, adjacent iff they differ in exactly one bit. It has $2^d$ vertices, degree $d$, $d2^{d-1}$ edges, and diameter $d$. It is bipartite. Any vertex set $S$ containing at most half the vertices has at least $\lvert S\rvert$ edges connecting it to its complement. | Each edge flips one bit, so shortest-path distance equals the number of differing bits. Each flip changes the parity of the number of 1s, giving the bipartition. The boundary bound expresses robustness. |
| De Bruijn graph                    | Vertices are $(n-1)$-bit strings. Directed edges shift left and append 0 or 1. Each vertex has in-degree and out-degree 2; self-loops are allowed. It has an Eulerian tour.                                                                                                                     | Each edge represents an $n$-bit string. Traversing every edge exactly once generates a cyclic sequence containing every $n$-bit string exactly once.                                                       |
#### Paths & Edges
An **edge** is one direct connection between two vertices. A **path** is a sequence of edges that connect end-to-end, without repeating vertices.
#### K Connected Components
“\(k\) connected components” means the graph has exactly \(k\) separate connected pieces. It counts pieces—not vertices or edges.

Within each component, every vertex can reach every other vertex by a path. No path connects vertices in different components.

For example, a graph with \(n=7\) vertices could have:

- One component consisting of 3 vertices joined in a chain.
- One component consisting of 3 vertices joined in another chain.
- One component consisting of a single isolated vertex.

That graph has \(k=3\) connected components. Their sizes are \(3,3,1\), totaling 7 vertices. Components need not have equal sizes, and an isolated vertex counts as a component.
## Hypercubes and Planar Graphs

### Hypercubes: Think of Binary Switches

An n-dimensional hypercube has vertices labeled by all possible n-bit strings. Two vertices are connected by an edge if and only if their strings differ in exactly one position.
- A vertex represents a setting of n binary switches.
- An edge represents flipping exactly one switch.
- The number of bits equals the dimension.

| Dimension | Vertices | Shape | Neighbors per vertex |
|---|---:|---|---:|
| 1 | 2 | Edge | 1 |
| 2 | 4 | Square | 2 |
| 3 | 8 | Cube | 3 |
| 4 | 16 | Four-dimensional hypercube | 4 |

There are 2ⁿ vertices because each of the n bits has two possible values. Every vertex has degree n because any one of its n bits can be flipped.
### Distance in a Hypercube
The distance between two vertices is their **Hamming distance**: the number of positions where their bit strings differ.
Example: `0010` and `1111` differ in three positions, so their distance is 3.
A shortest path is:
`0010 → 1010 → 1110 → 1111`
**Why this is a proof:**
1. **Lower bound:** Every differing bit must be flipped at least once. Each edge flips only one bit, so every path needs at least three edges.
2. **Achievability:** Flipping each differing bit once gives a path with exactly three edges.
General strategy: To prove a minimum, show that fewer steps are impossible and that the claimed number is achievable.
### Cycles in a Hypercube
To return to the starting vertex, each bit must be flipped an even number of times, including possibly zero times.
Each edge flips exactly one bit, so the cycle length equals the sum of all the individual bit-flip counts. A sum of even numbers is even.
Therefore:
- Every cycle in a hypercube has even length.
- Hypercubes contain no odd cycles.
- In particular, hypercubes contain no triangles.
### Planar Graphs: Think of Untangling Wires
A graph is **planar** if it can be drawn in the plane with no edge crossings, except where edges meet at a shared endpoint.
You may move vertices and bend edges, but you must preserve which vertices are connected.
**A drawing with crossings does not prove that the graph is nonplanar.** Planarity asks whether *some* drawing avoids crossings.
The ordinary three-dimensional cube is planar: draw one square inside another and connect corresponding corners. This preserves all eight vertices and twelve edges without crossings.
The four-dimensional hypercube is nonplanar.
### Faces and Euler’s Formula
Faces are the regions formed by a planar drawing. Always count the outside region as a face.
For every connected planar graph:
$$
v − e + f = 2
$$
Here, v is the number of vertices, e the number of edges, and f the number of faces.
**Intuition:**
- A tree has e = v − 1 and only one face.
- Adding an edge between existing vertices without crossings splits a face into two.
- Both e and f increase by one, so v − e + f stays unchanged.
For the cube:
$$
8 − 12 + 6 = 2
$$
### Key Distinction
Hypercube dimension describes the number of independent bits. Planarity describes whether the connections can be drawn without crossings on a flat page.
A graph can represent a three-dimensional cube and still be planar.
## Proofs
### [[Graph Proofs]]
# Secret Sharing Schemes
Here is how each quiz version maps to the three rules.

|Version|Access rule|Construction|Why|
|---|---|---|---|
|9am|All 5 stations, each needing 3 of 5|AND of groups|Every station must contribute. Top-level degree is $5 - 1 = 4$, and each station polynomial has degree $3 - 1 = 2$.|
|10am|President plus 1 officer, or 3 officers|OR, one polynomial|Threshold $t = 3$, so degree 2. The president gets 2 points and each officer 1.|
|11am|Verity plus 1 friend, or all 4 friends|OR, one polynomial|Threshold $t = 4$, so degree 3. Verity gets 3 points and each friend 1.|
|12pm|Driver plus 3 passengers|AND of groups|Two required parties: the driver (a single person) and the passenger group. Top-level degree is 1, and the passenger polynomial has degree 2.|
|1pm|Any 3 of 5 curators|None of the three (plain threshold)|This is the base case with no groups or roles. Degree $k - 1 = 2$, 1 point each.|
|2pm|4 of 5 airports and 40 other pilots|AND of groups|Two required groups. Top-level degree is 1, the airports' polynomial has degree 3, and the pilots' has degree 40 (41 points with Professor Hug).|
|3pm|Professor, 3 of 4 grads, and 5 of 7 undergrads|AND of groups|Three required parties, so top-level degree is 2. The grads' polynomial has degree 2 and the undergrads' has degree 4.|
|4pm|3 of 4 archivists, or supervisor plus 2 of 3 technicians|OR, independent routes|Weights are impossible (shown earlier). Route A has degree 2. Route B has degree 1, with the technicians' share protected by a degree-1 polynomial.|
|5pm|2 co-presidents, or 1 co-president plus 7 of 10 officers|Hybrid (see below)|The top level is a threshold, and the officers use a sub-polynomial.|

**5pm doesn't fit the three rules cleanly.** The top-level polynomial has degree 1, so any 2 shares suffice. Each co-president holds one share, and the officers jointly produce the third. That third share comes from a degree-6 officer polynomial, which needs 7 officers to reconstruct. This borrows rule 1's idea of a lower-level polynomial supplying a group's share. But the top level is a 2-of-3 threshold rather than an AND. The OR is built into that threshold, so it needs no second route and no extra points for anyone.

To tell which rule a new question needs:

1. If the story says "and" or "all", use AND of groups. Each group gets its own polynomial, and a lone individual (the driver, the professor) gets a direct top-level share.
2. If it says "or" and the alternatives can be handled by giving some people extra points, use the one-polynomial weighted rule. Test this by solving for a threshold $t$ and weights.
3. If it says "or" and the weight inequalities contradict each other, use independent routes (4pm).
4. If the story is a plain "any $k$ of $n$", just use a degree $k - 1$ polynomial (1pm).