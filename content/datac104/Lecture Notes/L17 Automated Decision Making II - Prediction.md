---
title: L17 Automated Decision Making II - Prediction
Content Type: Lecture
Content Area:
Course: Data C104
description: "The lecture examined predictive automated decision making as a political and institutional practice whose fairness cannot be reduced to statistical accuracy or the absence of bias. Through cases involving exam grades, criminal justice, child welfare, insurance, and credit, it connected prediction to due process, representation, agency, surveillance, bureaucracy, risk, and the production of social order."
pinned: false
Date Published: October 7, 2026
Last Updated: October 7, 2026
Status: Finalized
---

# L17 Automated Decision Making II - Prediction

## Executive Summary

The lecture extended the course's discussion of algorithmic fairness beyond questions of accuracy and group bias. It argued that even a highly accurate predictive system may raise concerns about due process, agency, representation, surveillance, institutional power, and the legitimacy of using past data to determine a person's future opportunities.

The UK government's replacement of canceled standardized examinations with predicted grades introduced this distinction between accuracy and fairness. Criminal justice risk assessments, predictive policing, and the Allegheny County child welfare system then illustrated how risk scores can become opaque representations of people, circulate across contexts, influence human decision makers, and generate feedback loops.

The lecture situated these systems within the longer logic of bureaucracy. Automated prediction promises efficient, impersonal, and apparently objective classification, but it also extends institutions' capacity to observe, rank, discipline, and sort people. Insurance and credit showed how private institutions use prediction both to price individualized risk and to encourage behavior, raising a tension between personalization and intensified surveillance.

---

## Accuracy Is Not the Whole of Fairness

The lecture began by revisiting a dominant approach to algorithmic fairness: asking whether an automated system is biased and whether its predictions are accurate across different groups. This remains a legitimate and consequential line of inquiry, but the lecture argued that it does not answer the prior question of what institutions are doing with predictive systems or whether those uses are just.

Predictive automated decision making uses statistical information about the past to describe a likely future and then treats that prediction as a basis for action in the present. The lecture therefore asked students to examine more than a predictor's error rate. Relevant questions include whether the process is understandable and contestable, whether people retain meaningful agency, how prediction changes institutional behavior, and what kind of social order the system helps create.

### Claim, Evidence, and Interpretation

The central claim was that accuracy and fairness should not be treated as casually equivalent. A system could satisfy reasonable measures of accuracy and avoid unequal error rates while remaining unfair because of how it acts upon people.

The lecture's evidence came from several institutional cases. The UK grading algorithm may have downgraded teacher predictions less often than examinations historically did, yet students experienced algorithmic downgrading as catastrophic. Criminal justice tools can provide statistically framed recommendations while denying defendants access to the process that produced them. Child welfare scores can associate requests for public assistance with institutional suspicion and surveillance.

The lecture interpreted these examples as reasons to widen the analysis. Whether a system "works" in predictive terms is distinct from whether people should be governed through that kind of prediction.

---

## The UK Examination-Grading Case

When the COVID-19 pandemic led the British government to cancel GCSE and A-level examinations in spring 2020, universities still required a substitute for exam results. One option was to use teachers' predicted grades. The lecture explained that officials had historical evidence that these predictions tended to be inflated relative to actual examination results.

The government office responsible for regulating examinations therefore developed an algorithmic substitute. The model used selected historical information, including earlier standardized examination grades, teachers' predictions, student rankings within schools, and schools' past performance relative to national patterns. In simplified form, teachers ranked students, and those rankings were mapped onto how similarly ranked students at the same school had previously performed.

The results provoked large protests by students and parents. The lecture reported evidence that the model was inaccurate on data outside its training setting and that its effects varied across institutions. Smaller private-school subject cohorts tended to benefit, while some high-performing state schools serving students above the national average performed worse under the model.

Thirty-nine percent of students receiving A-level results had their teachers' predicted grade reduced by at least one full grade. The lecture emphasized the experience of being told that a teacher expected one result while an algorithm assigned a lower one without the student taking the examination.

The government eventually abandoned the algorithm and accepted teachers' predicted grades. This produced the anticipated grade inflation and created difficulties for selective universities that could not admit every student who now formally qualified.

### Claim, Evidence, and Interpretation

The lecture separated the public experience of algorithmic downgrading from a narrow comparison of predictive accuracy. It stated that actual examinations had historically lowered teacher predictions at an even greater rate than the algorithm did. The algorithm was also more generous than the normal examination regime in aggregate.

This comparison complicated the claim that the system was unfair simply because it downgraded students. The lecture used a hypothetical perfectly accurate and group-neutral version of the model to ask whether predictive accuracy would make the arrangement fair.

The instructor's synthesis of responses identified several remaining concerns:

- A prediction based on past patterns cannot capture every individual who would have performed differently in the future.
- Students lost the opportunity to demonstrate improvement, including improvement motivated by poor performance on an earlier examination.
- Earlier tests had been taken under different expectations. Students did not know that those results might later determine their final grades or university prospects.
- Both standardized examinations and predictive algorithms abstract education into a number, so objections to the predictive system may also implicate the underlying standardized regime.
- The system used the past not merely to forecast a future but to impose a consequential future before students could act.

The case therefore illustrated how fairness can concern agency, expectations, and the opportunity to prove oneself, not only predictive accuracy.

---

## Procedural Due Process and Contestability

A second dimension of fairness concerned institutional process. The lecture described a legal norm under which fairness includes being subjected to a process that is legible, transparent, reasonable, and capable of treating a person as a rational agent. This was presented as procedural due process.

Many predictive systems used in criminal justice are proprietary products owned by private companies. Defendants, judges, and parole officers may know some categories of data used by a tool without knowing the precise model, weights, or synthesis that generated a score. A defendant therefore cannot examine the process fully, challenge its validity, or confront it in the way that an expert witness can be questioned in court.

The lecture also noted that risk-assessment tools used across levels of government are not necessarily subject to a single standardized public evaluation process, even though independent studies of such systems are becoming more common.

### The COMPAS Example

The lecture returned to COMPAS, introduced previously as a tool used in courtrooms to estimate a person's risk of future criminal activity. The company associated with the tool could argue that it only supplies information and that a human judge or official retains final authority.

The lecture treated this description as incomplete because a recommendation changes the environment in which the human decision is made. The fairness of the system therefore cannot be evaluated only by inspecting its output. Analysis must also consider whether decision makers defer to the score, selectively override it, or incorporate its categories into their own judgment.

---

## Predictive Policing and Constitutional Thresholds

Predictive policing may estimate either an individual's likelihood of committing a crime or the likelihood that crime will occur in a particular place and period. A person-level prediction might incorporate past activity, relationships, or attributes statistically associated with crime. A place-based system might designate a neighborhood or zone as high risk and direct additional police resources there.

The lecture presented legal questions raised by these practices. A high risk score might be treated as grounds for searching a person, lowering the practical threshold that an officer must meet. Membership in a social network that includes alleged gang members might similarly alter how authorities treat an individual. Entering a location marked as high risk might affect one's practical protection against unreasonable search and seizure.

### Claim, Evidence, and Interpretation

The lecture's claim was not that a predictive designation automatically resolves these constitutional questions. Rather, the designation can provide an ostensibly objective and neutral justification for practices that resemble previously prohibited stop-and-search policies.

The interpretation was that algorithmic objectivity may become a route around legal limits designed to constrain individual police discretion and prejudice. The prediction does not remain a passive description of risk. It can alter the conditions under which surveillance and intervention appear reasonable.

---

## Risk Scores as Representations of People

A risk score represents a person and circulates in institutional settings as a statement about who that person is likely to become. The lecture described this as a representation that can speak for someone even though the represented person may not understand, control, or challenge it.

This creates a representational harm distinct from a single incorrect decision. In the child welfare example, a parent who seeks material help may be labeled risky by an agency publicly associated with investigating families and removing children from homes. The label can generate stigma even where the parent has not neglected or abused a child.

Risk can also change meaning as information moves between institutions. Within a welfare setting, "risky" might mean vulnerable and in need of assistance. In a policing context, the same label may mean threatening and in need of surveillance. A simplified score can appear stable and portable even though its institutional meaning changes.

### Claim, Evidence, and Interpretation

The lecture claimed that automated scores do more than summarize data. They construct representations that shape opportunities, treatment, and future institutional encounters.

The child welfare case supplied the main evidence. Families could become objects of suspicion because information initially generated through requests for help entered a system that also performed investigative and punitive functions.

The lecture interpreted the portability of risk labels as especially consequential because the label may appear to carry the same meaning across contexts when it actually supports different interventions.

---

## Performativity, Feedback Loops, and Foreclosed Agency

Predictions can help produce the futures they claim merely to anticipate. The lecture described this performative effect at both individual and institutional levels.

At the individual level, a person repeatedly described as risky may internalize that designation. The lecture compared this process to a child receiving an ADHD diagnosis and then coming to understand personal behavior through that label. Authorities may also respond to the person through the designation, changing how teachers, police, judges, or welfare officials allocate attention and opportunity.

At the institutional level, higher risk scores can lead to more surveillance. Greater surveillance produces more observations and recorded incidents, which can then appear as additional evidence of risk. The lecture described this as a feedback loop: prior contact with an institution helps generate a high score, the score attracts further institutional contact, and that contact supplies new data that can raise the score again.

### Claim, Evidence, and Interpretation

The lecture's central claim was that past data does not simply predict the future. Once converted into data and used to make decisions, the past becomes a resource for producing a particular future.

Predictive policing illustrated the feedback mechanism. A person or neighborhood deemed risky receives more attention, making institutional detection and data collection more likely there than elsewhere. The child welfare case offered a parallel: contacting the welfare system can create records that later support heightened suspicion.

The lecture interpreted these processes as constraints on agency. A student denied the opportunity to take an examination, or a defendant detained because of predicted future conduct, is denied a chance to act otherwise. In this sense, the past can become a chain on the future.

---

## Human Decision Makers Inside Automated Systems

The presence of a human decision maker does not isolate an institution from the effects of automation. The lecture challenged the assumption that a "human in the loop" automatically corrects discrimination or restores independent judgment.

Human users may trust automated recommendations, disregard them selectively, or alter their own expertise in response to the system. The lecture cited evidence that human users may override recommendations when they conflict with prior beliefs and accept them when they conform to those beliefs. It also described evidence that users were more likely to raise estimates of risk for Black defendants and lower the tool's proposed risk for white defendants.

The Virginia Eubanks reading supplied another mechanism. Intake screeners using the Allegheny County child welfare tool began trying to anticipate the algorithm's score. They increasingly interpreted cases through the system's categories and treated statistical risk as a more important decision factor.

### Claim, Evidence, and Interpretation

The claim was that automated recommendations reshape human discretion rather than merely supplying neutral information to an unchanged expert.

Evidence included unequal patterns of accepting or overriding risk recommendations and screeners' efforts to reproduce the tool's reasoning in their own assessments.

The lecture interpreted this as a form of institutional training. Risk assessment becomes embedded as a central category of good governance and justice because both software and human experts increasingly organize decisions around it.

---

## The Allegheny County Child Welfare System

The lecture used Eubanks's account of the Allegheny Family Screening Tool to show why the institutional structure surrounding an algorithm matters. The tool assists an agency in deciding whether to screen in reports concerning children who may face neglect or abuse. Because direct measures of future neglect or abuse were unavailable, the system relied on proxies.

The welfare office performed two potentially conflicting functions. It helped families obtain material support, but it also investigated them and could remove children from their homes. Both functions involved intrusive data collection, partly because a means-tested welfare system required applicants to document need.

This arrangement placed families in a double bind. Seeking assistance could create the data through which the same institution classified them as risky. Poverty-related records could become proxies for neglect, and vulnerability could be translated into suspicion. Families aware of this possibility might avoid requesting benefits to which they were entitled.

The lecture also stressed the durability of institutional records. Once a family entered the system, its data could remain consequential over time. A parent's risk designation could become information about the child and later influence how the child was treated as an adult or parent.

### Claim, Evidence, and Interpretation

The lecture attributed to Eubanks the argument that automated systems in public agencies can weaken the social safety net, criminalize poverty, intensify discrimination, and convert collective political choices into systems-engineering problems.

The evidence presented in the lecture centered on the welfare office's divided responsibilities, its extensive data collection, and the way requests for assistance could increase surveillance and perceived risk.

The interpretation was that better data or more accurate predictions cannot by themselves resolve contradictions built into the institution. The system's politics constrain what the algorithm can do, even when designers are well intentioned.

---

## Automated Decision Making as Bureaucratic Rationality

The lecture situated automated decision making within the logic of bureaucracy rather than treating it as an entirely new deformation of social life. Bureaucracies aim to make decisions efficiently, impersonally, consistently, and at scale. Automated systems extend these aspirations through mathematical calculation and the appearance of mechanical objectivity.

This bureaucratic conception of rationality was connected to expected utility and statistical prediction. A rational decision is framed as selecting an action based on the probability and value of future outcomes. The lecture associated this combination of computational optimization and statistical forecasting with developments in the middle of the twentieth century, especially around World War II, and with systems that improve predictions by using their prior errors.

Bureaucratic systems may be liberal and democratic in the formal sense that they apply a common rule rather than allocating status by birth. The lecture stressed, however, that formal uniformity is not the same as material equality. Bureaucracies also create hierarchies by sorting people according to merit, social value, need, or risk.

### Claim, Evidence, and Interpretation

The lecture claimed that predictive systems make bureaucratic sorting appear more rational by assigning people to categories according to their probable futures. Those probable futures are extrapolated from recorded pasts.

Education illustrated this continuity. Schools and universities already observe, rank, test, and direct people into different tracks. The UK grading algorithm fit the structure of a standardized system organized around classifying students for future opportunities.

The interpretation was that automation intensifies an existing panoptic logic. Institutions observe people, classify them, and induce them to behave in ways that remain legible to institutional standards. Prediction extends this process into additional domains and makes future conduct a present basis for classification.

---

## Prediction as a Technology of Governance

The lecture asked why automated systems have become attractive across so many domains and what forms of collective life they replace or displace. Predictive systems were framed as technologies for making social order, not merely instruments for improving isolated decisions.

Public agencies use prediction in courts, policing, education, college admissions, advising, and welfare. Private platforms also make continuous small predictions through recommendation systems and autocomplete. Across these settings, prediction regulates what people see, how they are classified, and which options become available.

The lecture therefore posed broader political questions:

- Who adopts predictive systems, and for what purposes?
- Which social problems are redefined as prediction or optimization problems?
- What political arrangements do these tools inherit, encourage, or obscure?
- Does automation resolve political conflicts, or does it conduct politics by other means?
- How does the widespread use of risk assessment change the meaning of responsible governance?

These questions were presented as additions to, not replacements for, technical analysis of bias and accuracy.

---

## Insurance, Credit, and Individualized Risk

Private insurance and credit institutions were presented as major historical drivers of data collection, statistical analysis, classification, and prediction. They use data to sort people for profit while also governing conduct through systems of rewards and penalties.

Car insurance pools risk: many people pay premiums, while the insurer covers costly accidents that affect only some customers. It also differentiates premiums according to predicted risk. A driver with accidents or demographic characteristics associated with accidents may pay more.

The lecture identified an intuitive fairness argument for this arrangement: people who create greater risks should pay more rather than requiring safer people to absorb those costs. At the same time, the pricing system can discipline behavior. Drivers may act more cautiously because accidents will increase future premiums.

Credit scoring similarly provides an impersonal mechanism for deciding whom lenders can trust to repay a loan. Instead of relying on a manager's subjective visual judgment, past behavior is converted into a score. A low score can prevent a person from obtaining credit.

### Granular Monitoring

Connected sensors allow insurers to move beyond broad demographic categories and accident histories. Vehicles can record hard braking, rapid acceleration, fast turns, speeding, and related behavior. Customers may agree to share these records in exchange for individualized pricing.

This development sharpens a tension identified throughout the lecture. More detailed personal data may make a decision seem fairer because it reflects an individual's conduct rather than resemblance to a group. Yet the same personalization expands surveillance and increases the institution's capacity to shape behavior.

The lecture did not resolve whether this tradeoff should be described primarily as unfairness or as another ethical problem not fully captured by the language of fairness. It left students with the question of what changes when individualized accuracy requires more extensive observation.

---

## Human Contexts and Ethics Toolkit

### Power

Predictive systems give institutions the capacity to structure other people's behavior and opportunities. In the examination case, the state could convert teachers' rankings and historical school performance into grades that determined university eligibility without allowing students to sit the test. In criminal justice, judges, police, and private toolmakers could affect detention, surveillance, or search while defendants lacked equivalent access to the model.

The child welfare case demonstrated an especially pronounced asymmetry. Families seeking resources had to disclose information to an office that could also investigate them and remove children from their homes. Data supplied under conditions of need could increase the office's capacity to classify the family as risky.

Insurance extended this power into everyday conduct. Pricing risk does not merely measure driving; it creates incentives governing how customers brake, accelerate, turn, and speed. The lecture therefore treated scientific and technical prediction as intertwined with the institutional power to allocate benefits, burdens, scrutiny, and life opportunities.

### Sociotechnical Systems

The lecture consistently treated automated decision making as sociotechnical. Outcomes emerged from interactions among models, historical data, legal standards, institutional missions, proprietary ownership, human users, and the people being classified.

COMPAS did not operate independently of judges and parole officers. Human users could defer to its recommendation, override it in patterned ways, or change their understanding of risk after repeated use. Likewise, the Allegheny tool could not be separated from a welfare office that both distributed assistance and exercised investigative authority.

Feedback loops further illustrated this interdependence. A prediction directs human attention, that attention generates more recorded data, and the new data supports later predictions. Because the technical and institutional components change one another, correcting a model's accuracy alone cannot address all of the harms described in the lecture.

### Identity/Positionality

The lecture connected automated classification to race, class, disability labels, school type, age, and income-related vulnerability. Human users of criminal justice tools were described as responding differently to recommendations concerning Black and white defendants. In the UK grading case, institutional position mattered because smaller private-school cohorts and some high-performing state schools were affected differently.

Class and poverty were central to the child welfare example. Families entered the data system because they needed assistance, but the records documenting that need could become proxies for parental neglect. Their position as recipients of means-tested benefits shaped both how the institution saw them and how they might understand the risks of seeking help.

The discussion of ADHD illustrated how an institutional label may influence both identity and positionality. A child may incorporate a diagnosis into their sense of self, while a teacher may alter expectations and treatment because of the same label. The lecture used this analogy to explain how being repeatedly classified as risky can shape self-understanding and social treatment.

### Narratives

The lecture examined several narratives that make automated prediction appear necessary or legitimate. One presents fairness as accurate and unbiased classification. Another presents mathematical prediction as efficient, objective, impersonal, and therefore rational. A third describes individualized risk pricing as fair because each person should pay for the risks they create.

The cases complicated these narratives. The examination example showed that even an imagined perfectly accurate model could deny students the chance to act otherwise. The child welfare case challenged the account of risk scores as neutral assistance by showing how vulnerability could be narrated as suspicion. Predictive policing showed how an apparently objective description of a dangerous place or person could make intensified surveillance seem naturally warranted.

The lecture also challenged the idea that predictions merely reveal inevitable futures. When institutions act on a prediction, they help create the future the prediction describes. This reframes the future from something passively discovered in historical data into something institutions actively organize through classification, surveillance, and intervention.