---
title: "COMPAS"
Content Type: Review
Content Area: Human Contexts and Ethics of Data
Course: Data C104
description: "Competing fairness criteria in recidivism prediction and the institutional consequences of error."
pinned: false
Date Published: October 25, 2026
Last Updated: October 25, 2026
Status: Finalized
---

# COMPAS
Lecture: L16. Sources: [[datac104/Lecture Notes/L16 Fairness Automated Decision-Making I|L16: competing definitions of fairness]]; [[datac104/Lecture Notes/L17 Automated Decision Making II - Prediction|L17: due process and predictive systems]].

## Case and Significance
The course uses COMPAS, a recidivism-risk assessment system, to examine disagreement between ProPublica and the system's developer over racial fairness. ProPublica emphasized unequal error rates: Black defendants were more likely to be labeled high risk without later recorded reoffending, while white defendants were more likely to receive low-risk labels followed by reoffending. The developer emphasized calibration, meaning that a given score had approximately the same predictive meaning across racial groups.

The case shows that **fairness is a political and institutional question as well as a mathematical one**. Under the conditions discussed in the lecture, differing outcome rates make equal error rates and equal predictive meaning incompatible. Choosing a criterion requires judgments about whose errors and harms matter. Arrest records also reflect policing and institutional classification, so the data cannot simply be treated as direct measurements of crime. Scores become consequential through decisions about detention, release, and surveillance.

---

## Key Details

- A false positive can impose a serious burden on a person labeled risky, including loss of liberty in a system using that assessment. The same numerical error can have different consequences in different social positions.
- The lecture notes that excluding race as an explicit input does not settle fairness: other variables and the institutions generating records can reproduce racial inequality.

