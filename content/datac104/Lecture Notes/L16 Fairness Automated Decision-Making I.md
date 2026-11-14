---
title: L16 Fairness Automated Decision-Making I
Content Type: Lecture
Content Area:
Course: Data C104
description: "The lecture introduced algorithmic fairness through automated decision-making in criminal justice, focusing on competing interpretations of error rates in the Compass risk-assessment case. It argued that fairness cannot be reduced to technical accuracy because data, classifications, institutional practices, social identities, and the consequences of errors are intertwined."
pinned: false
Date Published: October 5, 2026
Last Updated: October 5, 2026
Status: Finalized
---

# L16 Fairness Automated Decision-Making I

## Executive Summary

This lecture began a unit on automated systems that make or inform socially consequential decisions. It used fairness as an entry point, first examining the Compass recidivism-risk system and the disagreement between ProPublica and Northpoint over whether it was racially fair. The lecture emphasized that their competing fairness criteria were mathematically incompatible when groups had unequal underlying base rates, even though both criteria connected fairness to predictive accuracy.

The lecture then broadened the analysis from algorithms to sociotechnical systems. It examined how data is produced by institutions, how apparently straightforward categories such as crime are constructed through classification and enforcement, and why “garbage in, garbage out” does not fully capture these issues. Cases involving health-care risk scores and facial-analysis systems illustrated both the value and the limits of technical bias audits.

The final argument was that the consequences of an error depend on institutional context, identity, positionality, and historical power. Fairness research often translates fairness into anti-discrimination, anti-discrimination into accuracy, and a social problem into a technical problem. The lecture proposed a broader question: what conception of justice does an entire sociotechnical system instantiate, including when its algorithm operates accurately?

---

## Automated Decision-Making and the Fairness Question

The week’s topic was automated decision-making: the use of algorithmic and computational systems to make or inform recommendations and decisions with major consequences in social life. The lecture connected this topic to earlier discussions of numbers, objectivity, impartiality, fairness, and rule-following.

Fairness served as the initial analytical concept because it is a common way of evaluating automated systems. The lecture’s aim, however, was not to treat fairness as natural or self-evident. It asked how fairness becomes operationalized in data systems, what assumptions enter that operationalization, and what the resulting conception leaves out.

The planned progression was from the familiar narrative of algorithmic bias toward larger questions about automated decisions:

- Where do automated decision systems come from?
- On what data and institutions do they rely?
- Why is prediction central to them?
- How have ideas of fairness developed alongside such systems?
- What kinds of social arrangements do these systems help produce?

The lecture distinguished an algorithm’s abstract output from the outcome produced when that output enters an institution. A risk score, for example, becomes socially consequential through decisions about detention, release, probation, or other conditions.

---

## Risk Assessment in Criminal Justice

Algorithms can enter criminal justice at multiple stages, including pretrial decisions, probation, parole, and sentencing-related processes. The lecture focused on risk-assessment systems used to estimate whether a person released while awaiting trial might fail to appear or commit another offense.

Bail was presented as an institution ostensibly designed to encourage defendants to appear for trial by requiring money that can be recovered upon appearance. The lecture also described the system as potentially discriminatory and regressive because people without available funds may remain detained or turn to bail bondsmen under predatory repayment conditions.

Risk-assessment systems have sometimes been proposed as replacements for cash bail. They use data about matters such as prior behavior, socioeconomic circumstances, family background, neighborhood crime, employment status, questionnaires, and arrest records to identify correlations and assign a predicted risk level. The lecture emphasized that a recidivism score projects patterns found in aggregated historical data onto an individual’s future.

These tools are generally not presented as determining guilt. Instead, their scores can inform institutional decisions such as whether someone should be released or detained while awaiting trial and what probation conditions should apply.

### Claim, Evidence, and Interpretation

The lecture’s descriptive claim was that risk-assessment systems translate data about past people and institutional records into predictions about future conduct. Its interpretation was that such systems do more than calculate probabilities: once their scores enter court processes, they participate in decisions that distribute freedom, confinement, and surveillance.

---

## The Compass Case and Competing Definitions of Fairness

Compass was described as a system created by Northpoint to estimate recidivism risk. It classified defendants as low, medium, or high risk using questionnaire responses and existing arrest records.

A 2016 ProPublica investigation titled “Machine Bias” examined the system in Broward County, Florida. According to the lecture, ProPublica found that Black defendants were more likely than white defendants to be labeled high risk and then not reoffend. This represented a higher false-positive rate for Black defendants. White defendants, by contrast, were more likely than Black defendants to be labeled low risk and then reoffend, producing a higher false-negative rate.

### ProPublica’s Fairness Criterion

ProPublica’s position, as presented in the lecture, was that a fair algorithm should not make errors more frequently for one demographic group than another. This concern was especially significant when the burden fell on a group already subject to historical oppression and institutional discrimination. The lecture associated this position with an equal-opportunity constraint.

Under this criterion, unequal false-positive rates constituted evidence of racial unfairness because Black defendants were more likely to receive a high-risk classification that did not match their later recorded conduct.

### Northpoint’s Fairness Criterion

Northpoint defended Compass using a different criterion. It argued that a particular score had approximately the same meaning regardless of race. The lecture’s example was that about 60 percent of white defendants and 61 percent of Black defendants who received a score of seven went on to reoffend.

Northpoint also emphasized that race itself was not used as a feature and that defendants were scored through individually recorded characteristics and behavior. Under this interpretation, fairness meant that the same score corresponded to the same predicted outcome across racial groups.

### Mathematical Incompatibility

Subsequent analysis discussed in the lecture concluded that the two positions operationalized different and mathematically irreconcilable definitions of fairness. When underlying outcome rates differed between groups, the system could not simultaneously equalize group error rates and make each score carry the same predictive meaning across groups.

The lecture described the resulting dilemma:

- A race-blind system can seek scores with the same predictive meaning for members of every racial group.
- A system can instead alter how scores operate across groups to account for matters such as discriminatory policing, historical injustice, and the institutions that generated the data.
- Given unequal base rates and the stated definitions, it cannot fully satisfy both goals at once.

### Claim, Evidence, and Interpretation

The central claim was not simply that one side had identified fairness correctly. Both positions expressed familiar intuitions about equal treatment, but they applied those intuitions differently.

The evidence consisted of the contrasting error patterns, the similar reoffending proportions attached to the same score, and the analysis of unequal group base rates.

The lecture interpreted the disagreement as political as well as mathematical. A preferred fairness criterion depends on beliefs about whether a system should address historical discrimination, how institutions should distribute risk and harm, and whether fairness should be assessed at the individual or group level. Both positions nevertheless shared an important assumption: they treated fairness as a form of predictive accuracy.

---

## Technical Responses to Algorithmic Bias

The Compass controversy helped stimulate research into algorithmic fairness, accountability, transparency, and auditing. The lecture described efforts to develop:

- More accurate or less discriminatory algorithms.
- Models that reduce disparities.
- Alternative mathematical formalizations of fairness.
- Better data for detecting or mitigating bias.
- Auditing techniques for identifying unequal performance.

This work often frames unfairness as a technical problem arising from biased datasets or unsuitable algorithms. The lecture acknowledged that technical interventions can produce meaningful improvements while cautioning that they do not exhaust the problem.

### Health-Care Risk Scores and a Problematic Proxy

The lecture presented a study of racial bias in a health-care algorithm. For a given risk score, Black patients were found to be sicker in practice than white patients. The algorithm had used projected health-care cost as a proxy for health need.

This proxy was problematic because expenditures were connected to socioeconomic conditions. People with fewer resources could have less money spent on their care without having less medical need. The algorithm therefore risked interpreting lower spending as evidence of lower sickness or lower risk.

Removing health-care cost as the proxy for need was presented as a relatively direct technical change that demonstrably reduced the racial disparity in predictions about who required additional care.

### Interpretation

This case supported the practical importance of bias audits and technical scrutiny. It also illustrated why understanding what a variable represents matters: a measure can be accurately recorded while remaining inappropriate for the inference being made from it.

---

## Beyond “Garbage In, Garbage Out”

The phrase “garbage in, garbage out” expresses the idea that biased or poor-quality inputs will yield biased outputs and that mathematical refinement cannot fully rescue unsuitable data. The lecture considered this principle useful but incomplete.

The phrase can imply that good data is simply accurate, granular, and free of measurable statistical bias. The lecture argued that analysis must also ask:

- What does the data represent?
- How was it produced?
- Who produced it?
- What phenomenon is it being used to capture?
- Is it appropriate for the intended inference?
- What social and institutional processes are present or absent in the record?

Data selection and production were presented as forms of classification and representation. They do not merely transmit facts about the world; they identify some aspects of a phenomenon, exclude others, and establish categories through which the phenomenon becomes knowable.

### Crime as an Institutional Classification

The lecture used crime data to illustrate this argument. A crime might initially appear to be any action that violates a law. In practice, the data can depend on whether conduct was observed, whether an institution treated it as a violation, whether an arrest occurred, whether a conviction followed, or whether imprisonment resulted.

The instructor synthesized the relevant components as an action, a judgment that the action violated law, enforcement by an institution, and conversion of that event into a recorded data point.

Arrest data may be used as a proxy for crime, but an arrest is not identical to the underlying act. It is also a record of an interaction among individuals and institutions such as police, courts, and prisons. The lecture therefore characterized such data as an objective record in one limited sense: it can systematically record institutional action. It is not necessarily a transparent record of all prohibited conduct in the world.

### Claim, Evidence, and Interpretation

The claim was that data about crime is produced through social and institutional processes rather than discovered independently of them.

The supporting examples were the different possible measurements of crime, including observation, arrest, conviction, and imprisonment.

The interpretation was that “ground truth” is partly produced through choices about counting, classification, and representation. Understanding those choices can support a more sober assessment of what predictions based on the data can and cannot establish.

---

## Intersectionality and the Limits of Single-Axis Auditing

The lecture used the Gender Shades project to show that algorithmic auditing can reproduce oversimplified social categories. The project evaluated facial-analysis software that attempted to classify the gender of faces and examined its performance across skin tone and gender categories.

The largest accuracy disparity appeared for darker-skinned female faces. Looking only at skin tone or only at gender could conceal the severity of this pattern. The disparity became visible through categories formed at the intersection of the two.

The lecture described part of the problem as “garbage in, garbage out,” while also noting broader ethical concerns about systems that infer gender from faces and reinforce strict gender binaries. Those additional concerns were acknowledged but not developed in detail.

### Intersectionality

Intersectionality was introduced through a tradition of Black feminist thought. Black women involved in civil rights struggles found that their specific experiences of oppression were not captured by anti-racist movements, mainstream white feminism, organized labor, or the New Left when those movements worked along a single axis.

The lecture cautioned against interpreting intersectionality as an additive ranking in which someone with more identity labels is automatically more oppressed. Instead, it presented the social meaning of being a Black woman in the United States as irreducible to the separate categories of being Black and being a woman. The intersection produces a distinct social position and distinct experiences.

The lecture also connected this idea to legal disputes over employment discrimination. Comparing Black and white people as whole groups, or men and women as whole groups, could fail to reveal discrimination specific to Black women.

### Claim, Evidence, and Interpretation

The claim was that audits organized around one identity attribute at a time may miss important forms of discrimination.

Gender Shades supplied the technical example, while the lecture’s discussion of Black women’s experiences and employment discrimination supplied the broader social and legal context.

The interpretation was that identity and positionality are relational and concrete rather than stacks of independent attributes. Auditing systems for fairness therefore requires a more sophisticated account of social identity than merely comparing error rates across isolated categories.

---

## Error Metrics Depend on Social Context

The lecture argued that no error metric is inherently the correct measure of fairness. The importance of false positives, false negatives, precision, or recall depends on the decision being made and what each error does in the world.

In the Compass case, ProPublica emphasized false positives because a person incorrectly labeled high risk could be detained while awaiting trial, potentially spending months in jail despite not yet having been found guilty. Someone who places greater value on security than civil liberties or redressing historical injustice might prioritize errors differently.

A hiring algorithm reverses the practical concern. There, a false negative may identify a qualified applicant as unsuitable and exclude that person from consideration. A disparity in false negatives across protected groups can therefore be the central form of unfairness.

### Claim, Evidence, and Interpretation

The claim was that choosing a loss function or error metric is not merely a technical matter. It can represent a political choice between competing ideas of social order and competing judgments about acceptable harm.

The criminal justice and hiring examples showed that the same mathematical error category does not have the same meaning in every setting.

The lecture interpreted the choice of what to optimize as a question of authority: who is entitled to decide which errors matter, according to what criteria, and on behalf of whom?

---

## Positionality and the Unequal Consequences of Error

Identical errors can have different effects depending on the person’s social position and relationship to the system.

If a gender-classification system misgenders a cisgender person, the event may be experienced as an inconvenience or even as humorous. For a transgender or nonbinary person, it may be experienced as part of a recurring pattern of representational harm.

Similarly, an overassessment of a home’s value can raise the owner’s tax burden. For a low-income homeowner, that increase may contribute to losing the home. For a wealthy homeowner, the same numerical error may instead reduce discretionary spending without threatening housing security.

The lecture extended this reasoning to Compass. A higher false-positive rate for white defendants could also be unfair, but it would not be unfair in exactly the same way because its meaning would differ in relation to historical power, accumulated dispossession, violence, and oppression.

### Interpretation

Mathematical parity cannot by itself represent the lived significance of an error. Fairness analysis must consider how an outcome enters a person’s life history and whether it compounds existing disadvantage. The lecture used these examples to move from abstract measures toward the distribution of actual social consequences.

---

## From Anti-Discrimination to Accuracy

The lecture argued that much algorithmic fairness research adopts the framing of anti-discrimination law. Under this framing, the primary question becomes whether an algorithm produces systematically inaccurate outcomes for a protected class, such as a group defined by race, gender, disability, or age.

This legal framing can be translated into technical tests because protected categories and accuracy metrics appear precise and rule-bound. It also creates incentives for organizations to audit systems up to the point necessary to avoid legal liability.

The lecture summarized a sequence of translations:

1. Fairness becomes anti-discrimination.
2. Anti-discrimination becomes a question of accuracy.
3. A social problem becomes a technical problem.

This translation can make a problem tractable through mathematical methods, and the lecture did not present technical treatment as inherently wrong. Its concern was that the equivalence between fairness and accuracy can become naturalized, obscuring other questions about institutions, social relationships, and power.

The lecture also noted that automated decision systems discriminate in the basic sense that they sort, distinguish, and classify people. The ethical and legal question is not whether they discriminate in this broad classificatory sense, but when and how their differentiated treatment becomes unfair.

### Disparate Impact

The lecture discussed disparate-impact analysis as an example of the limits of anti-discrimination framing. A hiring process may produce unequal outcomes across racial groups while remaining permitted if the assessed qualifications are deemed necessary for the job. In that situation, a system can reproduce existing social inequalities without fitting a narrower conception of unlawful discrimination.

---

## Fairness, Justice, and the System as a Whole

The lecture proposed moving beyond the question “Is the algorithm fair?” toward the question “What conception of justice does this sociotechnical system instantiate?”

This shift matters because fairness concerns relationships among people, institutions, and technologies. An algorithm’s numerical output is not the same as the social outcome produced through its use. Evaluating the system therefore requires empirical attention to what happens after the score enters the world and shapes institutional action.

The lecture used Equivant, formerly Northpoint, and its language of “simplifying justice” and improving court efficiency and effectiveness as an example. This language presents justice as something that can be simplified, optimized, and administered efficiently. The system thus makes a claim about what justice should look like rather than merely providing a neutral tool.

Private companies and their data scientists can acquire substantial power when they select the fairness criterion embedded in a proprietary or opaque system used by public courts. Their technical design decisions can help define justice in practice, even when public oversight and government review are inconsistent.

The lecture concluded that accuracy is not the only concern. Fairness interventions may correct unequal error rates while leaving intact the hierarchical structures that produce disadvantaged subjects. Analysis must therefore ask what automated decision systems are expected to do, why institutions ask them to do it, where they come from, and what kinds of worlds they help create.

---

## Human Contexts and Ethics Toolkit

### Power

The lecture repeatedly connected automated systems to the asymmetric capacity to shape other people’s behavior and life chances. A risk score can influence whether a defendant is released or detained, while a hiring score can determine whether an applicant receives consideration. A home assessment can alter a homeowner’s tax burden and, for someone with low income, potentially threaten continued ownership.

Power also appeared in decisions about system design. Northpoint selected and operationalized a particular definition of fairness, while courts used the resulting system in public decision-making. The lecture treated this as a transfer of substantial authority to a private company and its data scientists because their optimization choices could help determine how justice was administered.

Institutional power also shaped the data itself. Police, courts, and prisons decide which conduct is observed, enforced, classified, and recorded. Crime data therefore reflects not only individual behavior but also the behavior and priorities of institutions with the capacity to arrest, convict, confine, and create records.

### Sociotechnical Systems

The lecture explicitly moved from isolated algorithms to sociotechnical systems. Compass could not be evaluated solely as a predictive model because its scores became meaningful through bail practices, court decisions, policing, historical arrest records, and the consequences of detention. The algorithm and the criminal justice institution acted together.

The discussion of crime data made the same point at the level of input. A recorded crime was presented not simply as a fact found in the world, but as the outcome of conduct, legal classification, enforcement, and institutional recordkeeping. The technical dataset and the social processes that produced it could not be separated.

The health-care example likewise joined a technical proxy to socioeconomic patterns in medical spending. Replacing cost as a proxy for need improved the model, but identifying the problem first required understanding what spending represented in the social world.

The lecture’s broader sociotechnical question was not only whether an algorithm produced accurate scores, but what happened when those scores entered existing institutions and altered the distribution of detention, employment, health care, taxes, or other resources.

### Identity/Positionality

Identity and positionality shaped both the detection and the experience of algorithmic harm. Gender Shades showed that auditing race or gender along separate axes could obscure the especially poor performance experienced by darker-skinned female faces. The lecture used intersectionality to explain why the social position of Black women could not be reduced to separate and independent racial and gender categories.

Positionality also affected what an error meant. Misgendering could be a minor inconvenience for a cisgender person but part of a recurring pattern of representational harm for a transgender or nonbinary person. The same home-value error could have radically different consequences for low-income and wealthy homeowners.

In the Compass case, racial identity was connected to historical and institutional conditions. The lecture argued that an error affecting an already oppressed group may compound accumulated disadvantage. Consequently, equal numerical treatment does not necessarily produce equal social consequences.

### Narratives

The lecture identified a standard narrative in which algorithms are color-blind, objective, neutral, and impartial because they do not explicitly use race. ProPublica’s findings gained force partly because they challenged that expectation by showing racially unequal error patterns in a system that appeared race-neutral.

A second narrative framed algorithmic bias as “garbage in, garbage out.” The lecture retained the insight that poor inputs constrain outputs but questioned the idea that better measurement alone resolves the problem. Asking how data was made and what it represents unsettles the story that unbiased data simply mirrors the world.

The Compass dispute also produced competing narratives of fairness. ProPublica’s account emphasized unequal group burdens and historical discrimination. Northpoint’s account emphasized consistent predictive meaning for individuals regardless of race. Each narrative explained what fairness required and which errors mattered.

Finally, Equivant’s language of “simplifying justice” advanced a narrative in which justice becomes more effective through technical simplification and institutional efficiency. The lecture treated that language as a claim about a desirable form of justice, not merely as a description of software capabilities.