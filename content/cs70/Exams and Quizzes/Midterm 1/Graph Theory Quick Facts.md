---
title: Graph Theory Quick Facts
Content Type: Complementary Note
Content Area:
description:
pinned: false
Date Published: October 7th, 2026 - 12:29 PM
Last Updated: October 7th, 2026 - 12:29 PM
Status: Updating
---
# Graph Theory Quick Facts

## Notation and General Facts

Unless stated otherwise, graphs are simple and undirected: no self-loops or repeated edges.

| Symbol | Meaning |
|---|---|
| $n=\lvert V\rvert$ | Total number of vertices |
| $m=\lvert E\rvert$ | Total number of edges |
| $k$ | Number of connected components |
| $\deg(v)$ | Number of edges incident to vertex $v$ |
| $n_i$ | Number of vertices in component $i$ |

Every vertex belongs to exactly one connected component, so $n_1+\cdots+n_k=n$. An isolated vertex counts as one component.

| Fact | Formula |
|---|---|
| Possible degree of a vertex | $0\leq\deg(v)\leq n-1$ |
| Maximum number of edges | $m\leq\binom{n}{2}=\frac{n(n-1)}{2}$ |
| Degree-sum formula | $\sum_{v\in V}\deg(v)=2m$ |
| Average degree, for $n\geq1$ | $\frac{2m}{n}$ |
| Number of vertices with odd degree | Always even |
| A graph where every vertex has degree $r$ | $m=\frac{nr}{2}$ |

---

## Connected Graphs

A graph is connected if every pair of vertices has a path between them.

| Property | Quick fact |
|---|---|
| Components | $k=1$ |
| Edge bounds | $n-1\leq m\leq\frac{n(n-1)}{2}$ |
| Degrees when $n\geq2$ | Every vertex has degree at least $1$ |
| Minimum possible edge count | $n-1$, attained exactly by trees |
| Single-vertex case | Connected, with $0$ edges |

Having at least $n-1$ edges does not by itself guarantee connectivity.

---

## Trees and Forests

A tree is connected and acyclic. A forest is any acyclic graph; each of its connected components is a tree.

| Property | Tree | Forest with $k$ components |
|---|---|---|
| Vertices | $n$ | $n=n_1+\cdots+n_k$ |
| Edges | $m=n-1$ | $m=n-k$ |
| Degree sum | $2(n-1)$ | $2(n-k)$ |
| Paths | Exactly one path between any two vertices | Exactly one path between vertices in the same component |
| Removing an edge | Disconnects the tree | Increases the component count by $1$ |
| Adding an edge | Creates a cycle | Creates a cycle within a component, or joins two components |

A tree with $n\geq2$ has at least two leaves, meaning vertices of degree $1$. A single vertex with no edges is also a tree.

### Rooted Trees

A rooted tree is a tree with one vertex designated as the root.

- It still has $n$ vertices and $n-1$ edges.
- Every vertex except the root has exactly one parent.
- The root is at level $0$.
- A vertex's level is its distance from the root.
- In the course notes' convention, the root is never a leaf.

---

## Complete Graphs

The complete graph $K_n$ has an edge between every pair of distinct vertices.

| Property | Formula or fact |
|---|---|
| Vertices | $n$ |
| Edges | $\frac{n(n-1)}{2}$ |
| Degree of every vertex | $n-1$ |
| Degree sum | $n(n-1)$ |
| Connectivity | Connected for $n\geq1$ |
| Cycles | Contains a cycle when $n\geq3$ |

---

## Bipartite Graphs

A bipartite graph has two disjoint vertex groups, with every edge joining different groups. Let their sizes be $a$ and $b$.

| Property | General bipartite graph | Complete bipartite graph $K_{a,b}$ |
|---|---|---|
| Vertices | $n=a+b$ | $n=a+b$ |
| Edges | $m\leq ab$ | $m=ab$ |
| Degree in the group of size $a$ | At most $b$ | Exactly $b$ |
| Degree in the group of size $b$ | At most $a$ | Exactly $a$ |
| Cycles | Every cycle has even length | Every cycle has even length |

Every tree and forest is bipartite.

---

## Hypercube Graphs

Use $d$ for dimension to distinguish it from the vertex count $n$. Vertices of $Q_d$ are length-$d$ bit strings; neighbors differ in exactly one bit.

| Property | Formula or fact |
|---|---|
| Vertices | $n=2^d$ |
| Edges, for $d\geq1$ | $m=d2^{d-1}$ |
| Degree of every vertex | $d$ |
| Degree sum | $d2^d$ |
| Connectivity | Connected |
| Bipartition | Even versus odd number of $1$ bits |
| Distance between two vertices | Number of bit positions in which they differ |
| Diameter | $d$ |

---

## Planar Graphs

A planar graph can be drawn without edge crossings. Let $f$ count all faces, including the outer face.

| Condition                                   | Formula     |
| ------------------------------------------- | ----------- |
| Connected planar graph                      | $n-m+f=2$   |
| Simple planar graph with $n\geq3$           | $m\leq3n-6$ |
| Simple bipartite planar graph with $n\geq3$ | $m\leq2n-4$ |
| Tree drawn in the plane                     | $f=1$       |

These edge bounds are necessary for planarity; satisfying them does not prove that a graph is planar. Both $K_5$ and $K_{3,3}$ are non-planar.

---

## Directed Graphs

Directed edges have a source and a destination.

| Property | Formula or fact |
|---|---|
| In-degree $\deg^-(v)$ | Number of edges entering $v$ |
| Out-degree $\deg^+(v)$ | Number of edges leaving $v$ |
| Sum of in-degrees | $\sum_{v\in V}\deg^-(v)=m$ |
| Sum of out-degrees | $\sum_{v\in V}\deg^+(v)=m$ |
| Complete directed graph without self-loops | $m=n(n-1)$ |
| Degrees in a complete directed graph | $\deg^-(v)=\deg^+(v)=n-1$ |

---

## Eulerian Graphs

An Eulerian tour is a closed walk that uses every edge exactly once.

For a connected undirected graph with at least one edge, an Eulerian tour exists exactly when every vertex has even degree.

Having all degrees even does not determine a fixed number of edges; the degree-sum formula still gives $m=\frac12\sum_{v\in V}\deg(v)$.