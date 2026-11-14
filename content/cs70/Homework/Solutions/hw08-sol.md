---
title: CS 70 HW 08 Solutions — Counting and Probability Basics
Content Type: Review
Content Area: Counting and Probability
description: "Official HW 08 solutions, each placed directly under its question: counting with and without order and replacement, sample spaces and events, PINs, anagrams, card hands, stars and bars, Minesweeper, parking lots, and the necklace-counting stretch problem."
Course: CS 70
pinned: false
Date Published: November 12, 2026
Last Updated: November 12, 2026
Status: Finalized
---

# CS 70 HW 08 Solutions — Counting and Probability Basics
Each part's official solution follows directly after its question.

---

## 1. Counting Basics
**Related course note:** [[cs70/Course Notes/N15 Counting|Note 15 — Counting]].
For each of the following parts, provide an expression that computes the total number of possibilities for the scenario.
### (a) Homework Problems
Andy is choosing problems for next week's homework from $c$ distinct candidates. The homework must have $q$ questions, where $c\ge q$, order matters, and no question is repeated. How many different homeworks could he make?
#### Solution
Andy has $c$ possibilities for the first homework problem, $c-1$ for the second, and so on until he has $q$ total questions. This is counting without replacement where order matters, so there are

$$
c\cdot(c-1)\cdot(c-2)\cdots(c-(q-1))=\frac{c!}{(c-q)!}
$$

possibilities.
### (b) Dice Rolls
Randy rolls a $d$-sided die $m$ times and records the result of each roll in order. How many different sequences are possible?
#### Solution
Think of Randy as "choosing" from the $d$ faces of the die, where he "replaces" each face every time he rolls. This is counting with replacement where order matters, so there are

$$
d^m
$$

possibilities.
### (c) Smoothies
Mandy is making a smoothie with exactly $f$ pieces of fruit. There are $t$ different types of fruit she can choose from. She can use as many or as few pieces of each type as she wants (including none), as long as the total is $f$. Once she has chosen her fruits, she tosses them all into the blender. How many different smoothies can she make?
#### Solution
Mandy is choosing $f$ pieces of fruit from $t$ types, where order doesn't matter and each type of fruit is "replaced" every time she selects it. By stars and bars, there are

$$
\binom{f+t-1}{f}=\frac{(f+t-1)!}{f!\,(t-1)!}
$$

possibilities.
### (d) Shirt Colors
Sandy sees (from a distance) a line of $p$ total people. Exactly $r$ of them are wearing a red shirt, and the rest are wearing a blue shirt. How many different lines could she see, assuming she can't distinguish between people wearing the same colored shirt?
#### Solution
Sandy is effectively "choosing" the $r$ positions of the people wearing red shirts from $p$ total positions. This is counting without replacement where order doesn't matter (she can't distinguish between people with the same shirt color), so there are

$$
\binom{p}{r}=\frac{p!}{r!\,(p-r)!}
$$

possibilities.

---

## 2. Probability Basics
**Related course note:** [[cs70/Course Notes/N16 Introduction to Discrete Probability|Note 16 — Introduction to Discrete Probability]].
Harrison runs an experiment where he guesses the answers to $3$ True/False questions in a row. We can use a string of three letters from $\{T,F\}$ to represent an outcome of this experiment. For example, the outcome $TFT$ corresponds to Harrison answering "True" for the first and third questions, and "False" for the second. Let $E$ be the event that Harrison answers "True" for the first two questions.
### (a) Sample Space
Specify a sample space $\Omega$ for this experiment by explicitly listing out all possible outcomes. What is $\lvert\Omega\rvert$?
#### Solution
$\Omega=\{TTT,TTF,TFT,TFF,FTT,FTF,FFT,FFF\}$, so $\lvert\Omega\rvert=8$.
### (b) The Event E
Which outcomes belong to $E$?
#### Solution
$E=\{TTT,TTF\}$.
### (c) Probability of a Single Outcome
Assume $\Omega$ is a uniform sample space.
Let $\omega=TFF$. What is $\mathbb{P}[\omega]$? Is this the same for all $\omega\in\Omega$?
#### Solution
Since $\Omega$ is a uniform sample space, every outcome occurs with probability $\frac{1}{\lvert\Omega\rvert}$, which here is $\frac{1}{8}$. This is the same for every $\omega\in\Omega$.
### (d) Probability of E
What is $\mathbb{P}[E]$?
#### Solution
In a uniform sample space, $\mathbb{P}[E]=\frac{\lvert E\rvert}{\lvert\Omega\rvert}$. Therefore $\mathbb{P}[E]=\frac{2}{8}=\frac{1}{4}$.
### (e) The Remaining Probability
Now assume that Harrison answers $TTT$ with probability $3/10$. The rest of the outcomes each occur with the same probability $p$, where $p\ne3/10$.
What is $p$? Is $\Omega$ a uniform sample space?
#### Solution
The probabilities of all outcomes must sum to $1$, so

$$
\frac{3}{10}+\underbrace{p+p+\cdots+p}_{7\text{ times}}=\frac{3}{10}+7p=1.
$$

Solving gives $p=\frac{1}{10}$. Since $\mathbb{P}[\omega]$ is not the same for all $\omega\in\Omega$, the sample space is not uniform.
### (f) Probability of E, Revisited
With these changes, what is $\mathbb{P}[E]$ now?
#### Solution
Since $\Omega$ is not uniform, sum the probabilities of the outcomes in $E$. We know $\mathbb{P}[TTT]=\frac{3}{10}$ and $\mathbb{P}[TTF]=\frac{1}{10}$, so

$$
\mathbb{P}[E]=\frac{3}{10}+\frac{1}{10}=\frac{4}{10}=\frac{2}{5}.
$$

---

## 3. Counting Your Chances
**Related course notes:** [[cs70/Course Notes/N15 Counting|Note 15 — Counting]] and [[cs70/Course Notes/N16 Introduction to Discrete Probability|Note 16 — Introduction to Discrete Probability]].
Let's get some practice with counting and probability! Throughout this question, you may leave your answers unsimplified (i.e. you can leave binomial coefficients, factorials, exponents, etc. as is), but you should not use any summation or product notation (i.e. you may not use $\Sigma$ or $\Pi$).
### (a) PINs
A PIN is a sequence of $4$ digits, each from $\{0,1,\ldots,9\}$. How many PINs are there? How many PINs have $4$ distinct digits?
#### Solution
$10^4=10000$ PINs, and $10\cdot9\cdot8\cdot7=5040$ PINs with distinct digits. A PIN is a succession of four choices with $10$ options each; requiring distinct digits removes one option at each step.
### (b) The Youngest Students
A teacher chooses a group of $4$ students from a class of $10$ uniformly at random. What is the probability she chooses the $4$ youngest students?
#### Solution
$\frac{1}{210}$. We can approach this problem assuming order matters or assuming it does not.

If order does not matter, there are $\binom{10}{4}=\frac{10!}{4!\,6!}=210$ different groups the teacher can choose, and only one of them is the group of the four youngest students, so the probability is $\frac{1}{210}$.

If order matters, there are $10\cdot9\cdot8\cdot7=10!/6!$ ways to choose the students, $4!$ of which correspond to the $4$ youngest students. The probability is

$$
\frac{4!}{10!/6!}=\frac{1}{210}.
$$
### (c) Distributing Candies
How many ways are there to distribute $8$ identical candies among $3$ children? How many ways, if every child must get at least one candy?
#### Solution
$\binom{10}{2}=45$ and $\binom{7}{2}=21$. Each distribution corresponds to an arrangement of $8$ stars and $2$ bars. If every child must get a candy, hand each child one first, then distribute the remaining $5$ freely, which can be done in $\binom{7}{2}$ ways.
### (d) Coin Flips
What is the probability that exactly $4$ heads appear in a sequence of $15$ coin flips, assuming that each sequence is equally likely?
#### Solution
There are $2^{15}$ possible sequences, since each of the $15$ flips is either heads or tails. The number of sequences with exactly $4$ heads is the number of ways to choose $4$ positions out of $15$ where order doesn't matter, which is $\binom{15}{4}$. The probability is

$$
\frac{\binom{15}{4}}{2^{15}}.
$$
### (e) Anagrams
An anagram of HALLOWEEN is any re-ordering of the letters of HALLOWEEN, i.e., any string made up of the letters H, A, L, L, O, W, E, E, N in any order. The anagram does not have to be an English word. How many different anagrams of HALLOWEEN are there?
#### Solution
In this $9$-letter word, the letters L and E each appear $2$ times while the other letters appear once. So $9!$ overcounts the anagrams by a factor of $2!\times2!$ (one $2!$ for permuting the two L's among themselves and another for the two E's). There are

$$
\frac{9!}{(2!)^2}
$$

different anagrams.
### (f) Spades and Hearts
A standard $52$-card deck of cards has $4$ suits (hearts, diamonds, clubs, and spades) with $13$ cards in each suit. Bob shuffles a standard deck of $52$ cards and draws $5$ of them from the top. What is the probability that three of his cards are spades and the other two are hearts?
#### Solution
Assume order does not matter (it is equally valid to assume order matters). There are $\binom{52}{5}$ equally likely ways to choose $5$ cards. Choose $3$ of the $13$ spades in $\binom{13}{3}$ ways, and for each of those choose $2$ of the $13$ hearts in $\binom{13}{2}$ ways. That gives $\binom{13}{3}\binom{13}{2}$ hands meeting the criteria, so the probability is

$$
\frac{\binom{13}{3}\binom{13}{2}}{\binom{52}{5}}.
$$
### (g) Non-Negative Solutions
How many solutions does $y_0+y_1+\cdots+y_k=n$ have, if each $y_i$ ($0\le i\le k$) must be a non-negative integer?
#### Solution
$\binom{n+k}{k}$. Think of a sequence of $n$ ones and $k$ plus signs: $y_0$ is the number of ones before the first plus, $y_1$ is the number of ones between the first and second plus, and so on. Counting these sequences is exactly "balls and bins" (stars and bars).
### (h) Positive Solutions
How many solutions does $y_0+y_1+\cdots+y_k=n$ have, if each $y_i$ ($0\le i\le k$) must be a positive integer?
#### Solution
$\binom{(n-(k+1))+k}{k}=\binom{n-1}{k}$. Subtracting $1$ from each of the $k+1$ variables, and $k+1$ from the required total, reduces this to a problem of the same form as part (g). From a solution to that problem, adding $1$ back to each non-negative variable gives positive variables.

---

## 4. Minesweeper
**Related course notes:** [[cs70/Course Notes/N16 Introduction to Discrete Probability|Note 16 — Introduction to Discrete Probability]] and [[cs70/Course Notes/N15 Counting|Note 15 — Counting]].
Minesweeper is a game that takes place on a grid of squares. When you click a square, it reveals either an integer in $[1,8]$, a mine, or a blank space. If it reveals a mine, you instantly lose. If it reveals a number, that number refers to the number of mines adjacent to that square (including diagonally adjacent). If it reveals a blank space, there were $0$ mines adjacent to it.
You are playing on an $8\times8$ board with $10$ mines randomly distributed across the board. In your first move, you click a square near the center of the board (i.e. you click a square that is neither a corner square nor an edge square).
### (a) The First Click
What is the probability that the square reveals
#### (i)
a mine?
**Solution:**
There are $10$ mines and $64$ squares, so the probability that the square is a mine is $\frac{10}{64}$.
#### (ii)
a blank space?
**Solution:**
This is the probability that the clicked square and its $8$ neighbors are all free of mines, that is, that all $10$ mines are among the other $55$ squares. Divide by the total number of mine configurations, since this is a uniform sample space:

$$
\frac{\binom{55}{10}}{\binom{64}{10}}.
$$
#### (iii)
the number $k$?
**Solution:**
$$
\frac{\binom{8}{k}\binom{55}{10-k}}{\binom{64}{10}}.
$$

There are $\binom{8}{k}$ ways to choose locations for the $k$ adjacent mines. For each, there are $\binom{64-9}{10-k}$ ways to place the rest of the mines in the remaining squares. The denominator is the total number of mine arrangements, $\binom{64}{10}$.
### (b) Two Distant Squares
What is the probability that the first square reveals the number $3$ and the next square you click reveals the number $5$? Assume that the second square is far enough away such that it does not share any neighbors with the first square and that it is not a corner or edge square.
#### Solution
There are $\binom{8}{3}$ ways to place $3$ mines around the first square. For each, there are $\binom{8}{5}$ ways to place $5$ other mines around the second square, and for each of those, $\binom{64-9-9}{10-3-5}$ ways to place the rest of the mines throughout the rest of the grid. Dividing by the total number of mine configurations, $\binom{64}{10}$, the probability is

$$
\frac{\binom{8}{3}\binom{8}{5}\binom{46}{2}}{\binom{64}{10}}.
$$
### (c) Two Neighboring Squares
What is the probability that the first square reveals the number $1$ and the next square you click reveals the number $4$? This time, assume that the second square is directly to the right of the first square (they are neighbors) and that the second square is also not an edge square.
#### Solution
The two squares share four mutual neighbors. Exactly one of these must be a mine: if none were, the second square would have at most $3$ adjacent mines and could not reveal $4$, and if more than one were, the first square would not reveal $1$. So exactly one of the four mutual neighbors is a mine, and the three non-mutual neighbors on the right are all mines.

There are $4$ choices for the mine among the mutual neighbors, and for each, $\binom{64-12}{10-4}$ ways to place the remaining mines (they cannot go in the $2$ revealed squares or their $10$ neighbors). That gives $4\binom{52}{6}$ configurations. Dividing by $\binom{64}{10}$, the probability is

$$
\frac{4\binom{52}{6}}{\binom{64}{10}}.
$$

---

## 5. Parking Lots
**Related course notes:** [[cs70/Course Notes/N15 Counting|Note 15 — Counting]] and [[cs70/Course Notes/N16 Introduction to Discrete Probability|Note 16 — Introduction to Discrete Probability]].
Some of the CS 70 staff members founded a start-up company, and you just got hired. The company has twelve employees (including yourself), each of whom drive a car to work, and twelve parking spaces arranged in a row. You may assume that each day all orderings of the twelve cars are equally likely.
### (a) Next to Professor Rao
On any given day, what is the probability that you park next to Professor Rao, who is working there for the summer?
#### Solution
There are $11$ ways to choose two adjacent spaces, and $2$ ways to decide which is yours and which is Professor Rao's. The remaining cars can then park in any of $10!$ arrangements. The probability is

$$
\frac{11\cdot2\cdot10!}{12!}=\frac{2}{12}=\frac{1}{6}.
$$
### (b) Three Cars Between
What is the probability that there are exactly three cars between yours and Professor Rao's?
#### Solution
Again count the arrangements and divide by $12!$. Either your car is to the left of Professor Rao's or to the right. In the first case, numbering the spots $1$ to $12$ from left to right, your car can be in any of spots $1,2,\ldots,8$, and Professor Rao's car is always in the spot numbered $4$ higher, giving $8$ ways. By symmetry there are also $8$ ways with your car on the right, so $16$ ways in total. The remaining cars can park in any of $10!$ arrangements, so there are $16\times10!$ arrangements, and the probability is

$$
\frac{16\times10!}{12!}=\frac{16}{12\cdot11}=\frac{4}{33}.
$$
### (c) Five Sick Employees
Imagine that $5$ employees call in sick for the day. The other $7$ employees (which includes you) come to work and all parking arrangements are equally likely. What is the probability that you don't park on one of the ends of the row and no one is parked next to you?
#### Solution
There are $12-2=10$ ways to park in a space that is not at one of the ends. For each of those spaces, there are $\binom{12-3}{7-1}$ ways to place the other cars (they must avoid your space and both spaces next to it). There are $\binom{12}{7}$ configurations of occupied spaces in total, and $7$ ways to pick which occupied space is yours. The probability is

$$
\frac{10\binom{9}{6}}{7\binom{12}{7}}=\frac{5}{33}.
$$

---

## 6. Don't Copy My Drip
**Related course note:** [[cs70/Course Notes/N15 Counting|Note 15 — Counting]].
> [!info] Stretch problem
> This is a stretch problem. Your solution does not need to be complete, but make a good-faith effort, and write your solution up to the point where you get stuck.

An unnamed CS 70 TA has decided to make some cash by selling jewelry to other Berkeley students. They have a supply of strings and colored beads and will make necklaces. However, Berkeley students are particularly sensitive about being unique, so each necklace must be visually different.
### (a) Beads on a String
Assume beads of the same color are indistinguishable from each other. We place $5$ beads onto a string and have $2$ colors available to us. How many ways are there to color the beads?
#### Solution
Each of the $5$ beads has $2$ possible colors, so by the first rule of counting there are $2^5=32$ different sequences.
### (b) Necklaces of Five Beads
Now we tie the two ends of the string together, forming a necklace. Two necklaces are equivalent if the sequence of colors on one can be obtained by rotating the beads on the other. (For instance, the necklaces RBBRB, BBRBR, BRBRB, RBRBB, and BRBBR are all equivalent, because these are all rotated versions of each other.) Reflections are not considered equivalent unless one can also be obtained from the other by rotation.
How many non-equivalent necklaces are there now? Include necklaces in which all beads have the same color.
#### Solution
There are $2$ monochromatic sequences, RRRRR and BBBBB, and $2^5-2=30$ sequences that use both colors. Each sequence that uses both colors has $5$ distinct rotations.

To see why, suppose rotating by $k$ positions, where $1\le k\le4$, leaves a sequence unchanged. Since $5$ is prime, $\gcd(5,k)=1$, so the positions

$$
0,\;k,\;2k,\;3k,\;4k\pmod 5
$$

are all distinct. The beads at these positions must all have the same color, which would make the sequence monochromatic. So no nonzero rotation leaves a two-color sequence unchanged. If two different rotations produced the same sequence, undoing one of them would give such a nonzero rotation, so all $5$ rotations are distinct.

The $30$ two-color sequences therefore form $30/5=6$ necklaces. Adding the $2$ monochromatic necklaces gives

$$
\frac{2^5-2}{5}+2=8.
$$
### (c) Necklaces of Four Beads
Suppose instead that we use $4$ beads, with the same two colors available to us. How many non-equivalent necklaces are there now?
> [!tip] Hint
> The same strategy from part (b) does not work here.

#### Solution
There are $2$ monochromatic necklaces, RRRR and BBBB. Strings with exactly one blue bead all represent the necklace RRRB; strings with exactly one red bead all represent RBBB.

With two beads of each color, the red beads are either adjacent, giving RRBB, or opposite, giving RBRB. These are different necklaces, because rotating preserves whether the red beads are adjacent. In total there are

$$
2+2+2=6
$$

necklaces. We cannot simply divide the $14$ mixed-color strings by $4$: rotating RBRB gives RBRB, BRBR, RBRB, BRBR, so this necklace has only two distinct representations, while RRRB has four.
### (d) A General Formula
Now, we will aim to find a general formula for the number of unique necklaces given $n$ beads and $q$ colors. We consider a string representation of a necklace to be its colors in order (e.g. RBRB). In part (c), different necklaces had different numbers of string representations. For example, a solid red necklace only had one (RRRR), while an alternating color necklace had two (RBRB and BRBR).
A rotation by $k$ positions moves every bead $k$ positions forward, wrapping around at the end. Here, $k=0$ means no rotation. The table below lists all $16$ four-bead strings using red (R) and blue (B). A checkmark means that the rotation leaves the string unchanged. Rows are grouped by the necklace they represent.
| Necklace | String | $k=0$ | $k=1$ | $k=2$ | $k=3$ |
|---|---|---|---|---|---|
| 1 | RRRR | ✓ | ✓ | ✓ | ✓ |
| 2 | RRRB | ✓ | | | |
| 2 | RRBR | ✓ | | | |
| 2 | RBRR | ✓ | | | |
| 2 | BRRR | ✓ | | | |
| 3 | RRBB | ✓ | | | |
| 3 | RBBR | ✓ | | | |
| 3 | BBRR | ✓ | | | |
| 3 | BRRB | ✓ | | | |
| 4 | RBRB | ✓ | | ✓ | |
| 4 | BRBR | ✓ | | ✓ | |
| 5 | RBBB | ✓ | | | |
| 5 | BBBR | ✓ | | | |
| 5 | BBRB | ✓ | | | |
| 5 | BRBB | ✓ | | | |
| 6 | BBBB | ✓ | ✓ | ✓ | ✓ |

#### (i)
List the results of all four rotations of RBRB. How many distinct string representations are there, and how many rotations leave each representation unchanged? Use the table to identify a relationship between these two counts for each necklace.
**Solution:**
The four rotations of RBRB give

$$
\text{RBRB},\quad\text{BRBR},\quad\text{RBRB},\quad\text{BRBR}.
$$

There are two distinct strings, each appearing twice. Rotations by $0$ and $2$ leave RBRB unchanged, and the same rotations leave BRBR unchanged, so these two rows contribute $2\cdot2=4$ checkmarks.

Each monochromatic necklace has one representation with four unchanged rotations. Each remaining necklace has four representations with one unchanged rotation each. In every case, the number of distinct representations times the number of rotations leaving each unchanged is $4$. So every necklace contributes $4$ checkmarks, giving $24/4=6$ necklaces.
#### (ii)
Suppose a necklace of $n$ beads has $r$ distinct string representations. You may assume that rotating any starting representation by $0,1,\ldots,n-1$ positions produces each of these $r$ strings equally often. Show that each row has $n/r$ checkmarks, and hence that the necklace contributes $n$ checkmarks.
**Solution:**
List the results of all $n$ rotations of one starting string, including repeats. By the given assumption, each of the $r$ distinct strings appears $n/r$ times. In particular, the starting string appears $n/r$ times, so exactly $n/r$ rotations leave it unchanged.

Each of the $r$ rows therefore has $n/r$ checkmarks, and together they contribute

$$
r\cdot\frac{n}{r}=n
$$

checkmarks for this one necklace.
#### (iii)
With $q$ colors available, determine the number of checkmarks in column $k$ in terms of $n$, $q$, and $\gcd(n,k)$, with $\gcd(n,0)=n$.
> [!tip] Hint
> Try $n=4$, $k=2$, following a position through repeated rotations.

**Solution:**
For $n=4$ and $k=2$, the positions form two loops:

$$
0\to2\to0,\qquad1\to3\to1.
$$

For the string to remain unchanged, each bead must move to a position with the same color. Following these required matches around a complete loop forces every position in that loop to have the same color. So positions $0,2$ must match, as must positions $1,3$. Any of the $q$ colors can be chosen for each loop, including the same color for both, so there are $q^2$ unchanged strings.

In general, a position returns to its start after $t$ rotations exactly when $n\mid tk$. Dividing by $\gcd(n,k)$, this is equivalent to

$$
\frac{n}{\gcd(n,k)}\;\Big|\;t\,\frac{k}{\gcd(n,k)}.
$$

The two fractions are coprime, so the smallest positive $t$ is $n/\gcd(n,k)$. Each loop therefore contains $n/\gcd(n,k)$ positions, and since there are $n$ positions altogether, there are $\gcd(n,k)$ loops.

A string stays unchanged exactly when all positions in each loop have the same color. Choosing one of $q$ colors for each loop gives

$$
q^{\gcd(n,k)}
$$

checkmarks in column $k$. For $k=0$, each position is its own loop and all $q^n$ strings are unchanged, which the formula also gives.
#### (iv)
Use parts (ii) and (iii) to show that the number of non-equivalent necklaces is

$$
\frac{1}{n}\sum_{k=0}^{n-1}q^{\gcd(n,k)}.
$$

Explain what the sum counts and why we divide by $n$.
**Solution:**
Column $k$ counts the strings left unchanged by rotation through $k$ positions. Adding all column counts gives the total number of checkmarks:

$$
\sum_{k=0}^{n-1}q^{\gcd(n,k)}.
$$

By part (ii), every necklace contributes exactly $n$ of these checkmarks. Dividing by $n$ therefore counts each necklace once, giving

$$
\frac{1}{n}\sum_{k=0}^{n-1}q^{\gcd(n,k)}.
$$
