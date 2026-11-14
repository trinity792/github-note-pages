---
title: L10 Graphs I
Content Type: Lecture
Content Area:
Course: CS70
description: "The lecture introduced graphs as abstractions of objects and their connections, then defined neighborhoods, degree, paths, cycles, walks, tours, connectivity, and Eulerian tours. Using the Seven Bridges of Konigsberg, it motivated Euler's theorem and sketched both the parity argument and a recursive algorithm for constructing an Eulerian tour."
pinned: false
Date Published: September 29, 2026
Last Updated: September 29, 2026
Status: Finalized
---

# L10 Graphs I

## Executive Summary

The lecture began with course logistics concerning updated grading specifications, engagement points, and synthesis questions. It then introduced graphs through the Seven Bridges of Konigsberg problem, using progressively simpler drawings to retain only the relevant places and bridge connections.

After defining graphs, neighborhoods, degree, several kinds of graph traversal, connectivity, and Eulerian tours, the lecture formulated Euler's theorem: an undirected graph has an Eulerian tour exactly when it is connected up to isolated vertices and every vertex has even degree. One direction was motivated by pairing the edges used to enter and leave each vertex. For the converse, the lecture sketched a constructive recursive algorithm that finds an initial tour, deletes its edges, recursively tours the remaining connected components, and splices those tours together. The proposed correctness proof uses strong induction on the number of edges.

---

## Course Logistics

The grading specifications were being updated. The specification for an A was staying the same, while the specifications for B and C grades were being loosened to make the midterm more achievable. Further guidance about the midterm and synthesis questions was promised for the coming weeks.

Synthesis questions were described as comparable to a middle-of-the-road homework problem rather than a stretch problem. Their main difficulty is that they are not labeled by topic. Unlike a modular arithmetic quiz that announces its subject, a synthesis question may combine one or more topics and requires the student to decide which tools apply.

Homework and discussion sections contribute engagement points. These points were described as a small incentive rather than the main assessment of whether students can use the material. Homework is graded for completion rather than correctness, but students were encouraged to continue doing it even after obtaining enough engagement points because homework and discussion provide practice for quizzes and exams.

---

## The Seven Bridges Problem

The motivating problem concerns a town with several land regions joined by seven bridges:

> Is it possible to begin at some location, cross every bridge exactly once, and return to the starting location?

The detailed geography, street names, architecture, and artistic appearance of the town do not affect the question. The instructor therefore replaced the map with increasingly simple drawings. Each land region became a dot, and each bridge became a line connecting two dots.

This illustrates the role of abstraction. A deliberately simplified drawing can expose the mathematical structure by removing irrelevant detail. In this problem, only the locations and their bridge connections matter.

The lecture also cautioned that abstraction can remove important information. The paper *Fairness and Abstraction in Sociotechnical Systems* was recommended as a discussion of common dangers associated with abstracting too much.

### Why a Vertex with Three Incident Edges Causes Trouble

Suppose a location $D$ has three bridges.

If a traversal starts at $D$, it must:

1. Leave $D$ on one bridge.
2. Return to $D$ on a second bridge.
3. Leave $D$ on the third bridge.

All three bridges have now been used, so the traversal cannot return to $D$ to finish where it started.

Starting elsewhere does not solve the problem. At some point the traversal must enter $D$ because every bridge must be crossed. It can later leave and re-enter, but after using all three incident bridges it becomes stuck at $D$. Since the traversal began elsewhere, being stuck at $D$ prevents it from returning to its starting point.

The same reasoning applies not only to degree three but to any odd number of incident edges. Visits to an intermediate location require an entering edge paired with a leaving edge. An odd number of edges cannot be divided entirely into such pairs.

### Initial Conjecture

The first informal conjecture was stated in terms of bridges and places:

> If a place has an odd number of bridges, then the desired traversal is impossible.

After graph terminology was introduced, this became:

$$
\text{If there exists a vertex }v\text{ such that }\deg(v)\text{ is odd, then there is no Eulerian tour.}
$$

---

## Graphs as Mathematical Objects

A graph $G$ consists of a set of vertices and a set of edges:

$$
G=(V,E).
$$

The vertices represent the objects under consideration, and the edges represent connections between those objects.

Examples mentioned in the lecture include:

- Places connected by bridges or roads.
- Servers connected by wires.
- People connected by friendships.
- Web pages connected by links.
- Neurons connected by axons.

The graph retains the existence of these connections while discarding details that do not matter for the current problem.

### A Concrete Graph

The lecture considered

$$
V=\{1,2,3,4\}
$$

and

$$
E=\bigl\{\{1,2\},\{2,3\},\{1,4\}\bigr\}.
$$

A drawing of this graph must contain vertices $1,2,3,4$ and the three listed connections:

- Vertex $1$ is connected to vertex $2$.
- Vertex $2$ is connected to vertex $3$.
- Vertex $1$ is connected to vertex $4$.

The locations of the dots on the page do not matter. Two drawings that arrange the vertices differently represent the same graph if they preserve exactly the same connections.

### Undirected Graphs and Multigraphs

The lecture focuses on undirected graphs. An undirected edge between $1$ and $2$ means simply that the vertices are connected; it does not point from one to the other.

A directed graph would instead use arrows to distinguish directions, but directed graphs are not considered in this course discussion.

The Seven Bridges example contains multiple edges between the same pair of vertices. The instructor called these multi-edges and called a graph that permits them a multigraph. Most graphs considered in the course will not have multiple edges between a pair of vertices.

This distinction creates a subtlety for the later neighborhood definition. If two vertices share several edges, defining degree merely as the number of neighboring vertices does not count the repeated edges. The instructor noted that the definition must be handled more carefully for multigraphs, depending on whether repeated connections are intended to be counted.

---

## Neighborhoods and Degree

For a vertex $u$, its neighborhood is the set of vertices that share an edge with $u$. In words, the neighborhood consists of all vertices adjacent to $u$.

The degree of $u$ was defined as the size of its neighborhood:

$$
\deg(u)=|N(u)|.
$$

In the lecture's example, one selected vertex had four neighbors, so its degree was four.

Using this terminology, the statement “there is a place with an odd number of bridges” was translated into:

$$
\exists v\in V\text{ such that }\deg(v)\text{ is odd}.
$$

This translation is part of a recurring mathematical process: begin with a natural-language observation, identify a formal object that captures it, and express the observation in notation that can be used in a proof.

For multigraphs, the lecture explicitly warned that this neighborhood-based definition needs care because several edges may connect the same pair of vertices.

---

## Paths, Cycles, Walks, and Tours

The lecture introduced several terms for traversing a graph.

### Paths

A path is a sequence of edges connecting one vertex to another without repeating vertices. If the visited vertices are

$$
v_1,v_2,\ldots,v_k,
$$

then the traversed edges are

$$
\{v_1,v_2\},\{v_2,v_3\},\ldots,\{v_{k-1},v_k\}.
$$

The notation

$$
v_1\leadsto v_k
$$

was presented as a shorthand indicating that there is a path from $v_1$ to $v_k$, although the instructor expressed some uncertainty about how formal or universal this notation is.

In the concrete graph with edges $\{1,2\}$, $\{2,3\}$, and $\{1,4\}$, the path from $4$ to $3$ is:

$$
4\to 1\to 2\to 3.
$$

Written as a sequence of edges, it is:

$$
\{4,1\},\{1,2\},\{2,3\}.
$$

### Cycles

A cycle returns to its starting vertex while otherwise keeping the vertices distinct. Thus, if a cycle begins at $v_1$, it also ends at $v_1$, but it does not revisit other vertices along the way.

### Walks and Tours

Walks and tours relax the restriction that vertices be distinct:

- A walk may revisit vertices.
- A tour is the closed counterpart, so it returns to its starting vertex and may revisit vertices.

The Seven Bridges traversal is a tour rather than a cycle because revisiting land regions is allowed. Only the use of bridges is restricted.

### Eulerian Tours

An Eulerian tour is a tour that:

1. Uses every edge.
2. Does not repeat any edge.
3. Returns to its starting vertex.

Vertices may be revisited. The defining restriction concerns edges, not vertices.

With this terminology, the original bridge problem asks whether the associated graph has an Eulerian tour.

---

## Connected Graphs and Components

A graph is connected if there is a path between every pair of vertices. Formally, for any two vertices in the graph, one can travel from one to the other along a sequence of edges.

A disconnected graph consists of separate pieces. Each connected piece was called a connected component: within a component, every vertex can be reached from every other vertex in that component, even though the component may have no path to vertices in another component.

Connectivity matters for Eulerian tours because a single tour cannot traverse edges in two disconnected edge-containing components.

### Isolated Vertices

An isolated vertex has no incident edges. The lecture emphasized that adding an isolated vertex does not destroy an existing Eulerian tour because an Eulerian tour is required to use every edge, not every vertex.

Therefore, connectivity must be stated “up to isolated vertices.” A graph may contain isolated vertices and still have an Eulerian tour among all of its edges.

---

## Euler's Theorem

The lecture first stated the tempting claim:

> An undirected graph has an Eulerian tour if and only if every vertex has even degree.

A disconnected example showed that this statement is false as written. Two disconnected cycles can each have only even-degree vertices, but no single tour can traverse the edges of both components.

The corrected theorem given in the lecture was:

> An undirected graph has an Eulerian tour if and only if every vertex has even degree and the graph is connected up to isolated vertices.

The phrase “the graph has even degree” means that every vertex has even degree:

$$
\forall v\in V,\qquad \deg(v)\text{ is even}.
$$

The theorem is an “if and only if” statement, so its proof has two directions:

1. If an Eulerian tour exists, then the graph is connected up to isolated vertices and every vertex has even degree.
2. If the graph is connected up to isolated vertices and every vertex has even degree, then an Eulerian tour exists.

The first direction follows from parity reasoning about entering and leaving vertices. The second direction requires constructing a tour.

---

## From an Eulerian Tour to Even Degree

The lecture presented two approaches to this direction.

### Option 1: Prove the Contrapositive

Instead of proving directly that an Eulerian tour implies even degree, prove the equivalent contrapositive:

$$
\text{If some vertex has odd degree, then there is no Eulerian tour.}
$$

Assume that there is a vertex $v$ with odd degree:

$$
\exists v\in V\text{ such that }\deg(v)\text{ is odd}.
$$

There are two cases.

#### Case 1: The Tour Starts at $v$

The traversal leaves $v$ on one edge. Every later return to $v$ must be paired with another departure. Since the total number of incident edges is odd, the incident edges cannot all be paired while also allowing the traversal to finish at $v$.

Thus, a traversal that starts at $v$ cannot use every incident edge exactly once and also end at $v$.

#### Case 2: The Tour Starts Elsewhere

Because all edges must be used, the traversal must eventually enter $v$. Each arrival at $v$ needs a distinct departure edge if the traversal is to continue. With an odd number of incident edges, the traversal eventually reaches $v$ without an unused edge available for departure.

It therefore gets stuck at $v$. Since it began elsewhere, it cannot finish at its starting vertex.

In either case, no Eulerian tour exists.

### Option 2: Direct Edge Pairing

Assume an Eulerian tour exists. Consider a vertex $v$ that is not initially treated as the starting vertex.

Whenever the tour enters $v$ along an edge $e_1$, it must leave along a distinct edge $e_2$. If it later returns along another edge $e_1'$, it must again leave along another edge $e_2'$. Thus, the tour pairs the edges incident to $v$:

$$
(e_1,e_2),\quad (e_1',e_2'),\quad\ldots
$$

Since the incident edges can be paired, their number is even. Therefore,

$$
\deg(v)\text{ is even}.
$$

The starting vertex $v_0$ needs a small additional argument. The first action is a departure without a preceding arrival, but the tour eventually returns to $v_0$. That final arrival pairs with the initial departure. All intermediate arrivals and departures at $v_0$ pair in the ordinary way, so its degree is even as well.

### Why Connectivity Follows

An Eulerian tour uses every edge. Every non-isolated vertex belongs to some edge, and using that edge causes the tour to pass through the vertex. Consequently, all vertices incident to edges lie on the same tour and are connected through it.

This establishes connectivity after isolated vertices are set aside.

---

## From Even Degree to an Eulerian Tour

The converse is less immediate:

$$
\text{If }G\text{ is connected up to isolated vertices and every vertex has even degree, then }G
\text{ has an Eulerian tour.}
$$

The lecture approached this direction constructively. Rather than merely asserting that a tour exists, it described an algorithm intended to produce one.

---

## The `FindTour` Procedure

Start at a chosen vertex $s$. Let the current vertex initially be

$$
u=s.
$$

Then repeat the following while an unused edge incident to $u$ exists:

1. Choose an arbitrary unused edge $\{u,v\}$.
2. Add that edge to the current tour.
3. Delete or mark that edge as used.
4. Update the current vertex by setting $u=v$.

After no unused edge remains at the current vertex, return the resulting traversal.

In pseudocode form, the lecture's procedure was:

```text
FindTour(G, s):
    u = s
    while there exists an unused edge incident to u:
        choose an arbitrary edge {u, v}
        add {u, v} to the tour
        delete {u, v}
        u = v
    return the tour
```

The procedure is intentionally simple: it has no strategy for choosing the best next edge.

### Why It Can Get Stuck Only at the Starting Vertex

Assume every vertex has even degree.

For any vertex other than $s$, each time the traversal enters along one unused edge, there must be another unused incident edge available for leaving. The incident edges can be viewed as arrival-departure pairs.

Therefore, the procedure cannot first get stuck at a non-starting vertex. The exceptional vertex is $s$, because the procedure leaves $s$ initially without first entering it. Eventually the unmatched initial departure is balanced by a final return to $s$.

Thus `FindTour` returns to its starting point and produces a tour. However, it may fail to use every edge, so it need not produce an Eulerian tour.

### Example of a Partial Tour

In the lecture's numbered graph, one possible arbitrary traversal was

$$
1\to 2\to 4\to 3\to 2\to 7\to 1.
$$

After returning to $1$, this traversal could not continue along an unused incident edge. It had produced a tour, but other edges remained elsewhere in the graph.

A smaller example illustrated the same issue:

$$
1\to 2\to 7\to 1.
$$

This is a valid closed tour without repeated edges, but it may leave large connected portions of the graph unexplored.

---

## Remaining Connected Components

After `FindTour` returns a tour $T$, delete every edge used by $T$ from the graph.

Two outcomes are possible:

- If no edges remain, then $T$ already uses every edge and is an Eulerian tour.
- If edges remain, they form one or more connected components, denoted in the lecture by
  $G_1,G_2,\ldots$.

Each remaining component meets the original tour at some vertex. For a component $G_i$, let $s_i$ be the first vertex of $T$ that also belongs to $G_i$.

The proposed algorithm recursively finds an Eulerian tour of $G_i$ beginning at $s_i$. Because that recursive tour starts and ends at $s_i$, it can be inserted into the original tour without breaking the original traversal.

---

## Splicing Tours Together

Suppose the initial tour is

$$
1\to 2\to 7\to 1.
$$

If a remaining component $G_1$ intersects this tour at vertex $2$, recursively find an Eulerian tour of $G_1$ that begins and ends at $2$. Insert that entire recursive tour immediately after the original tour first reaches $2$.

Similarly, if another component $G_2$ intersects the original tour at $7$, insert the recursively found tour of $G_2$ at $7$.

Schematically, the combined traversal has the form

$$
1
\to 2
\to \operatorname{Euler}(G_1,2)
\to 2
\to 7
\to \operatorname{Euler}(G_2,7)
\to 7
\to 1.
$$

The notation here expresses the lecture's idea that each recursive call leaves its attachment vertex, traverses its entire component, and returns to the same attachment vertex. The outer tour can then continue exactly where it left off.

In the more abstract “cloud” drawing used during lecture, an initial tour passed through a large graph but missed components $G_1$, $G_2$, and $G_3$. The completed traversal followed the initial tour until reaching the attachment point of $G_1$, detoured through all of $G_1$, returned to the same point, and continued. It repeated this process for $G_2$ and $G_3$ before finally returning to the original starting vertex.

---

## Recursive Eulerian-Tour Algorithm

The lecture's algorithm can be summarized as follows:

```text
Euler(G, s):
    T = FindTour(G, s)
    delete from G every edge used by T

    if no edges remain:
        return T

    let G1, G2, ... be the remaining connected components
    for each Gi:
        let si be the first vertex of T that intersects Gi
        recursively compute Euler(Gi, si)

    splice each recursive tour into T at si
    return the combined tour
```

The construction depends on three ideas developed in the lecture:

1. `FindTour` closes at its starting vertex because every non-starting visit has an arrival edge paired with a departure edge.
2. Deleting the edges of the initial tour leaves smaller connected components.
3. A closed recursive tour of a component can be inserted at its intersection with the current tour.

The instructor described recursion as the algorithmic counterpart of induction. This motivates proving the recursive algorithm correct with an inductive argument.

---

## Inductive Correctness Sketch

The proposed induction parameter is the number of edges. The lecture used the common convention

$$
|V|=n,\qquad |E|=m,
$$

and chose to induct over $m$ rather than over the number of vertices.

The reason given was that after the initial tour's edges are deleted, every remaining component has fewer edges than the original graph. This allows the inductive hypothesis to be applied directly to the recursive calls.

### Base Case

The stated base case is

$$
m=0.
$$

A graph with no edges has a trivial Eulerian tour: doing nothing uses all of its edges, since there are no edges to use.

The lecture also referred to the situation in which `FindTour` has already used every edge. In that situation there is no remaining recursive work, and the tour found by `FindTour` is returned.

### Inductive Hypothesis

The lecture recommended strong induction. The hypothesis was stated in the form:

> Assume `Euler` outputs an Eulerian tour for any even-degree graph with at most $K$ edges.

Symbolically, the size condition is

$$
|E|\le K.
$$

### Inductive Step

Consider a graph with

$$
|E|=K+1.
$$

Run `FindTour`, delete the edges it uses, and consider the remaining connected components. Each remaining component contains fewer edges than the original graph. The intended argument is then to invoke the strong inductive hypothesis on each smaller component, obtain an Eulerian tour for each one, and splice those tours into the original tour.

The lecture ended while describing this step. It established the main intended intuition - recursive calls apply to smaller edge sets and their resulting tours are inserted into the first tour - but did not complete the formal inductive proof.

---

## Unclear or Incomplete Steps

The correctness proof for the recursive algorithm remained incomplete at the end of the lecture. In particular, these notes did not finish formal arguments that every residual component satisfies all assumptions needed by the inductive hypothesis, or that the final spliced traversal uses every original edge exactly once. These conclusions were presented as the intended direction of the homework proof rather than completed in class.

The spoken inductive hypothesis referred to “any even-degree graph” with at most $K$ edges, while the theorem also requires connectivity up to isolated vertices. Whether the connectivity qualification was intended to remain implicit in the inductive hypothesis was `[unclear]`.

The notation $v_1\leadsto v_k$ was offered for a path from $v_1$ to $v_k$, but the instructor explicitly expressed uncertainty about whether it was formal standard notation.