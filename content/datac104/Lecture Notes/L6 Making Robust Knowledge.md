---
title: L6 Making Robust Knowledge
Content Type: Lecture
Content Area:
Course: Data C104
description: "The lecture examined how scientific knowledge can be both made by human beings and robust under scrutiny. It compared scientific method, logical positivism, falsification, underdetermination, and Thomas Kuhn's account of paradigms to argue that robustness arises through the practices and social organization of scientific communities."
pinned: false
Date Published: September 9, 2026
Last Updated: September 9, 2026
Status: Finalized
---

# L6 Making Robust Knowledge

## Executive Summary

The lecture asked how scientific knowledge can remain robust even though data, theories, and scientific practices are made by people with particular experiences, interests, and perspectives. It compared a canonical scientific method with the more iterative data science life cycle, then introduced theory as a necessary part of turning data into knowledge.

The Copernican Revolution served as the main historical case. Ptolemaic and Copernican astronomy could account for nearly the same observations, showing that data did not uniquely determine which theory astronomers should accept. This case introduced the Duhem-Quine thesis and the underdetermination of theory by data.

The lecture then compared logical positivism, which treats theories as logically organized outcomes of empirical data, with Karl Popper's falsificationism, which treats science as the attempt to refute theories. Both models were presented as limited descriptions of ordinary scientific work because scientists usually respond to anomalies by checking data, instruments, samples, assumptions, and parts of a theory before abandoning an entire framework.

Thomas Kuhn's account shifted attention from individual scientists confronting evidence to scientific communities engaged in normal science. Scientists ordinarily solve puzzles within shared paradigms. Scientific revolutions occur when persistent anomalies contribute to a community's movement from one paradigm to another. On this account, science's robustness depends substantially on collective practices through which scientists standardize work, check one another, and respond to criticism.

---

## Making Knowledge That Stands Up to Challenge

The lecture defined robust knowledge as knowledge that withstands scrutiny, testing, and attempts to challenge it. Science was presented as society's strongest example of knowledge that remains grounded in made data while continuing to hold together under examination.

This creates the lecture's central problem. Data are not simply given or natural. They are produced through selective human choices, and scientists bring experiences, interests, needs, concerns, and perspectives to their work. Science is likewise a human enterprise, made through human activity and subject to change over time. The question is therefore how knowledge can be both human-made and robust.

Skepticism about vaccine science illustrated the stakes of the question. The instructor noted that skeptics may question how the knowledge was made and ask whether pharmaceutical companies' interests could taint it. The lecture used this concern to ask why the presence of human interests is not necessarily fatal to scientific knowledge.

### Claim, Evidence, and Interpretation

- **Claim:** Making and robustness are not necessarily opposed. The instructor suggested that they may be intertwined and that knowledge may, in some respects, be more robust because it is made through human practices.
- **Evidence to be examined:** The lecture turned to philosophical models, historical change, and the work of scientific communities to investigate what allows scientific knowledge to withstand challenge.
- **Interpretation:** The relevant question is not whether science can eliminate human activity. It is how human practices can produce knowledge that remains answerable to data and criticism.

---

## Scientific Method, the Data Science Life Cycle, and Theory

The canonical scientific method was presented as a factory-like sequence for converting data into knowledge:

- A researcher poses a question.
- The researcher conducts background research.
- The researcher frames a hypothesis.
- The hypothesis is tested through an experiment.
- Data are gathered and analyzed.
- Conclusions are drawn and subjected to further testing.

This model depicts a relatively straightforward encounter between ideas and a world represented through data.

The data science life cycle complicates that sequence. In the version shown in the lecture, practitioners ask a question, obtain data, understand and visualize the data, explore it, and loop back to additional questions. Some of this work may be characterized as hypothesis testing, but the process also includes exploratory activities that do not fit neatly into the canonical sequence. The goal remains understanding the world, although the route is iterative rather than linear.

Neither model initially made theory sufficiently explicit. The lecture described theory as the conceptual structure through which data become meaningful. A poll asking whether science changes mostly through new data or through new theories introduced two positions:

- New and unexpected data may drive change by requiring scientists to develop theories that can make sense of them.
- Data may function as raw material, while major change occurs through new concepts and theories that reorganize how those data are understood.

The instructor emphasized that both data and theory matter. The question concerns which one drives major transformations and how they interact.

### Claim, Evidence, and Interpretation

- **Claim:** The canonical scientific method does not fully capture contemporary scientific and data science practice.
- **Evidence:** The data science life cycle includes exploration, visualization, repeated questioning, and feedback loops rather than one fixed progression from hypothesis to conclusion.
- **Interpretation:** Knowledge-making cannot be described solely as collecting data and then mechanically extracting conclusions. Conceptual structures help determine how data are sought, organized, and understood.

### Example or Case

The instructor invoked the Darwinian Revolution to synthesize the relation between data and theory. Darwin worked with large conceptual frameworks, but he also mobilized an enormous body of observations when developing and persuading others of his account. The example showed why major scientific change cannot be reduced entirely to either empirical accumulation or theoretical creativity.

---

## The Copernican Revolution and Competing Accounts of the Same Observations

The lecture's central historical case compared Ptolemaic and Copernican astronomy.

The Ptolemaic system placed Earth at the center, with the Sun, Moon, and planets moving around it. It used cycles and epicycles, described as secondary rotations superimposed on other rotations, to predict observed planetary paths. The instructor compared the resulting movement to a spirograph pattern. The system was presented as complex but highly predictive and adjustable.

The Copernican system placed the Sun at the center, with Earth moving around the Sun and the Moon moving around Earth. Its diagram appeared simpler, but it represented a revolutionary reorganization of the universe.

At the time addressed in the lecture, the two systems predicted nearly the same basic observations of planetary movement. Copernicus had not simply collected a decisive body of new data that forced astronomers to reject the Ptolemaic system. Instead, he reorganized largely shared observations through a different conceptual framework.

### Claim, Evidence, and Interpretation

- **Claim:** Evidence does not always determine a unique theory.
- **Evidence:** Ptolemaic and Copernican astronomy could predict nearly the same observed planetary paths even though one placed Earth at the center and the other placed the Sun at the center.
- **Interpretation:** The hypothesis about which body occupied the center could not be tested in isolation. It was assessed together with additional assumptions, such as Ptolemaic epicycles or Copernicus's preference for a simpler organization of the world.

The Ptolemaic system could accommodate deviations by adjusting epicycles. The Copernican system, meanwhile, drew strength from an overarching commitment to a simpler arrangement. Choosing between the systems therefore involved more than matching an isolated hypothesis directly against data.

### Example or Case

The Copernican case supported the lecture's broader claim that major scientific change may involve a new way of organizing existing observations rather than a decisive new observation. It also prepared the later argument that theories are tested as parts of networks of assumptions and that the same evidence can support competing explanations.

---

## Logical Positivism and the Problem of Induction

Logical positivism, also called logical empiricism in the lecture, was introduced as an early-to-mid-twentieth-century account of science. Its basic idea is that scientific theories arise directly from empirical data organized through logic.

This account depends on several separations:

- Observations can be detached from theory.
- Data can be separated from concepts.
- Facts can be separated from values.
- Scientists encounter the empirical world first, while theory comes afterward.

A theory is evaluated by deriving a statement or prediction and checking whether it matches an independently existing reality. This process relies on induction, meaning generalization from a sample of experience.

The problem of induction is that no collection of past observations can absolutely verify a universal claim. An unobserved case may contradict the generalization.

### Claim, Evidence, and Interpretation

- **Claim:** A theory cannot be absolutely verified merely by generalizing from previous observations.
- **Evidence:** Past observations sample only part of reality, leaving open the possibility of a future case that refutes the generalization.
- **Interpretation:** Logical positivism's picture of theories arising from raw data and logic cannot guarantee the reliability it seeks because induction cannot rule out unexpected counterexamples.

### Example or Case: The Black Swan

The instructor used the claim "all swans are white" to illustrate induction. A European observer in the seventeenth or eighteenth century could repeatedly encounter white swans and continue to verify the claim. Observation of black swans in Australia would then create a crisis.

Two responses would be available:

- Revise the theory by recognizing that swans may be white or black.
- Deny that the observed black animal belongs to the category described by the theory.

The example showed that scientists may respond to conflicting evidence either by changing a theory or by reconsidering whether the phenomenon falls within the theory's scope. It also showed why repeated confirmation cannot conclusively establish a universal statement.

---

## Popper's Falsificationism

Karl Popper's falsificationism responded to the limits of verification by arguing that science advances through attempts to falsify theories. In this usage, falsification means refuting a theory, not fabricating evidence.

Popper accepted that a theory could not be proven absolutely true through accumulated confirmations. He argued, however, that a counterexample could demonstrate that a prediction was false. A theory should therefore make risky predictions that could fail. Scientists should actively seek counterevidence, and theories become more robust when they survive serious attempts at falsification.

This position changes the goal from establishing absolute truth to retaining theories that resist refutation. The lecture described Popper's account as a gradual movement toward truth through the identification and correction of error.

### Claim, Evidence, and Interpretation

- **Claim:** Good scientific theories expose themselves to possible refutation.
- **Evidence:** A black swan would conflict with the universal claim that all swans are white, while further observations of white swans could never absolutely verify it.
- **Interpretation:** Robustness comes from surviving attempts at falsification rather than from accumulating enough confirmations to become certainly true.

The lecture noted that falsificationism also offers a criterion for distinguishing scientific claims from non-scientific ones: scientific claims must permit the possibility of falsification.

The instructor situated logical positivism and falsificationism in different intellectual and political settings. Logical positivism appealed to those who sought reliable truth independent of unstable human judgment, while falsificationism retained empirical accountability by emphasizing contestability and error correction. The lecture also noted that people today may hold elements of both models at once.

---

## Scientific Practice, Anomalies, and Networks of Assumptions

The lecture argued that working scientists generally do not behave exactly as either logical positivism or falsificationism prescribes. When evidence conflicts with a theory, scientists do not ordinarily abandon the theory immediately. They may instead ask whether:

- The data are reliable.
- The sample is adequate.
- The measuring instrument worked correctly.
- An auxiliary assumption needs revision.
- A limited part of the theory can be adjusted.

The lecture called mismatches between theory and data anomalies. Scientific practice often involves continual tinkering with a framework to address anomalies, and abandoning the framework is usually a last resort.

Max Planck's statement that a new scientific truth succeeds because its opponents eventually die and a new generation becomes familiar with it illustrated the persistence of scientific commitments. The instructor used the statement to characterize scientific change as partly generational: researchers who have built careers within a framework may continue defending or modifying it until alternatives become established among a later generation.

### The Duhem-Quine Thesis

The lecture used the name Duhem-Quine thesis for the idea that hypotheses cannot be tested in isolation. Tests always involve a network of theories and assumptions.

The Ptolemaic case illustrated this claim. A test did not assess only whether Earth or the Sun occupied the center. It also involved epicycles and other assumptions used to connect the central claim to observable planetary positions. When a prediction failed, scientists could modify an auxiliary part of the network rather than rejecting the central theory.

### Underdetermination of Theory by Data

Underdetermination means that data alone may not establish which among multiple theories is correct. Different conceptual frameworks can organize the same evidence in different ways. Data constrain possible explanations, but they are not sufficient to produce a unique theory.

### Claim, Evidence, and Interpretation

- **Claim:** Scientific tests assess connected networks of theories and assumptions rather than isolated hypotheses.
- **Evidence:** Ptolemaic astronomy could modify epicycles when predictions deviated from observation.
- **Interpretation:** A failed prediction does not identify by itself which element of the network should be rejected.

- **Claim:** Theory is underdetermined by data.
- **Evidence:** Ptolemaic and Copernican astronomy explained approximately the same planetary observations through competing organizations of the universe.
- **Interpretation:** Scientists must choose among explanations using concepts, priorities, and assumptions in addition to empirical fit. Competing theories may also emphasize different parts of a shared body of evidence.

---

## Thomas Kuhn, Paradigms, and Normal Science

Thomas Kuhn shifted the analysis from abstract rules of verification or falsification to the historical practice of scientific communities. The lecture connected this shift to the post-World War II transformation of science.

After 1945, radar and the atomic bomb made science's social and political effects more visible. Governments invested in facilities, research, and scientific training because science had become strategically important. Research increasingly involved hundreds or thousands of collaborating scientists rather than a single scientist confronting personal data in isolation.

The lecture also described the postwar claim that STEM fields were for especially intelligent people as part of an educational system built to produce an "army of scientists" serving state and security priorities. Kuhn's work emerged within this setting of large-scale, collaborative, politically consequential science.

### Paradigms

A paradigm is a shared framework within which a scientific community works. The lecture described it as a set of models, examples, theories, concepts, and prescribed methods for solving empirical puzzles. A paradigm is not merely an abstract idea. It is learned through practice, including repeated work on sample problems.

Ptolemaic astronomers could respond to deviations by modifying epicycles. Scientists working in a different astronomical paradigm would use different accepted methods to address mismatches. Each community had standardized expectations about what counted as a problem and how it should be solved.

### Normal Science

Kuhn called ordinary work within a paradigm normal science. According to the lecture, most scientific activity is puzzle-solving rather than revolutionary innovation. Scientists usually receive an established framework and contribute by solving particular problems within it rather than questioning its foundations.

Scientific education reproduces this form of practice. Textbooks and problem sets train students to solve exemplary problems according to accepted procedures. If a student gets the wrong answer, the expected response is to correct the work and learn the framework, not to invent an entirely new theory.

### Scientific Revolutions

Anomalies arise when predictions and observations do not align. Within normal science, researchers initially try to resolve these discrepancies using the existing paradigm. Revolutionary change becomes possible when anomalies persist, accumulate, and resist efforts to explain them away even after practices and instruments have been standardized.

A scientific revolution occurs when a community shifts its allegiance from one paradigm to another. Kuhn called this a paradigm shift. The lecture presented the Ptolemaic-to-Copernican transition, the Darwinian Revolution, and the quantum revolution as examples of large changes that cannot be described simply as the accumulation of data or the immediate falsification of a theory.

Kuhn's description that practitioners in different paradigms live in different worlds emphasized the depth of such a transition. A paradigm structures the problems scientists recognize, the tools they use, and the ways they interpret evidence. A scientist is committed to one framework, and moving to another reorganizes the scientific world in which that person works.

### Claim, Evidence, and Interpretation

- **Claim:** The scientific community, rather than an isolated scientist, is the principal actor in the production of robust scientific knowledge.
- **Evidence:** Scientists share paradigms, train through common examples, standardize instruments and practices, solve connected puzzles, inspect one another's work, and collectively respond to anomalies.
- **Interpretation:** Robustness arises substantially from organized criticism and coordinated practice. Scientists learn from one another as well as from nature, and their shared procedures allow knowledge to be tested and maintained collectively.

The term community did not imply perfect harmony. The instructor noted that scientific communities have boundaries, with some people recognized as inside and others outside. The central point was that scientific knowledge is distributed across a bounded collective of experts rather than residing only in individual minds.

---

## Human Contexts and Ethics Toolkit

### Power

The lecture explicitly connected scientific and political power in its discussion of the period after World War II. Radar and the atomic bomb made science's capacity to change the world more visible, while governments treated research as strategically important by funding facilities, projects, and scientific education. The production of an "army of scientists" linked educational priorities to state and security needs. Scientific power was therefore presented as organized through institutions and public funding, not merely as the intellectual ability of individual researchers.

The vaccine-skepticism example raised another form of power. Questions about pharmaceutical companies' interests concern whether organizations with economic stakes can influence how scientific knowledge is produced. The lecture did not resolve that particular concern, but used it to establish why the human and institutional conditions of knowledge-making matter to judgments of robustness.

Kuhn's scientific communities also exercise boundary-setting power. Because experts collectively establish paradigms, exemplary problems, and accepted practices, they help determine who participates in authoritative scientific work and which approaches count as legitimate puzzle-solving. These notes acknowledged these inside-and-outside boundaries without providing a detailed account of how particular people are excluded.

### Sociotechnical Systems

The lecture treated science as a sociotechnical system in which data, theories, instruments, educational practices, institutions, and communities are intertwined.

An anomaly cannot be interpreted by isolating a single "technical" prediction. Scientists may question the data, sample, measuring instrument, auxiliary assumptions, or theoretical framework. The Duhem-Quine thesis similarly describes a test as an assessment of a network rather than an isolated hypothesis.

Kuhn's account extended this interdependence to scientific organization. Paradigms are maintained through textbooks, problem sets, calibrated instruments, shared examples, collaboration, and criticism. In the postwar period, government funding and large research facilities became part of the conditions under which science was conducted. Robust knowledge therefore emerged from relations among people, tools, institutions, and conceptual frameworks rather than from data or technology alone.

### Identity/Positionality

The lecture stated that people bring their experiences and perspectives to knowledge-making, but it provided limited detail about how specific identities such as race, class, disability, immigration status, or income shaped the cases discussed.

Gender appeared briefly when the instructor contrasted the image of an individual scientist confronting "his data" with the collective organization of postwar science. This wording marked the historically gendered figure used in conventional stories about scientific work, but these notes did not develop a broader analysis of gendered participation or treatment within science.

Professional and generational position received more sustained attention. Scientists whose careers were formed within a theoretical framework may remain attached to it, while a new generation may become familiar with and adopt a different framework. Kuhn's account also distinguished insiders from outsiders to scientific communities. These forms of position shape how people encounter paradigms and scientific change, although the lecture did not connect them in detail to the toolkit's other named dimensions of identity.

### Narratives

The lecture compared several narratives about how science works.

The canonical scientific-method narrative presents science as an orderly sequence from question and hypothesis to experiment, data, analysis, and conclusion. The data science life cycle complicates that story by emphasizing exploration and repeated loops. Logical positivism offers a narrative in which detached observations come first and theory follows through logic and induction. Falsificationism instead portrays scientists as actively trying to disprove their own theories and retaining only those that survive criticism.

Kuhn supplies a different narrative centered on communities. Most science is normal puzzle-solving within inherited paradigms, while major change occurs through occasional revolutions in which a community moves to another framework. This narrative replaces the lone heroic scientist with collective practice as the main source of scientific robustness.

The postwar account of STEM as the domain of especially intelligent people was also presented as a historically produced narrative tied to the need to train scientists for state and security purposes. The lecture used this example to show that apparently natural beliefs about scientific intelligence and authority can arise from political and educational circumstances.

Across these narratives, the lecture's central intervention was to question the story that human involvement inherently weakens science. Its proposed alternative was that human organization - shared training, criticism, standardization, and collective response to anomalies - helps make scientific knowledge robust.