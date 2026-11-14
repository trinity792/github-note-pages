---
title: L9 Eugenics and Statistics
Content Type: Lecture
Content Area:
Course: Data C104
description: "The lecture traced how Francis Galton’s study of heredity and social hierarchy contributed to linear regression, correlation, and eugenics, then connected this history to the work of Karl Pearson and Ronald Fisher. It examined eugenics as a form of biopower, followed its institutional expression in Britain, the United States, California, and Stanford, and argued that understanding this history can make contemporary data science more reflective about its assumptions, examples, and institutional roles."
pinned: false
Date Published: September 16, 2026
Last Updated: September 16, 2026
Status: Finalized
---

# L9 Eugenics and Statistics

## Executive Summary

The lecture began with Galton’s parent-child height data, familiar from statistics education, and used it to reconstruct the historical relationship among linear regression, heredity, and eugenics. Galton’s statistical work was presented as part of a broader attempt to treat intelligence, talent, class, race, disability, and criminality as inherited characteristics distributed across populations. The lecture then explained how Karl Pearson and Ronald Fisher developed major techniques in mathematical statistics while participating in eugenic institutions and projects.

Eugenics was analyzed as a form of biopower: populations were treated as biological resources to be measured, sorted, optimized, and differentially valued. The lecture followed this project from Britain to American immigration restrictions, compulsory sterilization, California institutions, and Stanford’s early history. It concluded that statistical techniques are not inherently eugenic and should not be discarded, but that their history reveals recurring assumptions and institutional temptations that data scientists should learn to recognize.

---

## Course Announcements

The instructor announced an upcoming session about internships. Because the session is usually popular, students were asked to use a sign-up sheet. Space may be limited by the available room, although the instructor would try to provide a digital broadcast if necessary.

Students were also asked to complete an anonymous survey announced by Professor Carson. The survey is intended to identify the kinds of skills the course is helping students cultivate. It contains approximately five short questions and should be completed within the following week.

---

## Galton’s Height Data and the Origins of Regression

The lecture opened with a dataset collected by Francis Galton concerning parents’ and children’s heights. The parents’ measurements were combined into a “midparent height,” which could then be used to predict children’s heights. The dataset appears in Data 8 and many other statistics and data science courses, first for simpler exercises and later for linear regression.

The instructor argued that this pedagogical use retraces part of the historical development of regression. Galton developed techniques associated with linear regression and statistical correlation while investigating this data in the late nineteenth century. Students recreating the relationship in a computational notebook are therefore also recreating, in a new form, a diagram and analysis produced in that historical setting.

Galton was introduced as a wealthy Englishman born in Birmingham in 1822 and as Charles Darwin’s first cousin. He was described as an obsessive counter who regarded quantified measurement as necessary for scientific status. The lecture attributed to science writer Stephen Jay Gould the characterization that “quantification was Galton’s god.”

### Claim, Evidence, and Interpretation

- **Claim:** Familiar statistical techniques emerged through historically situated research questions rather than through pure abstraction.
- **Evidence:** Galton’s investigation of parent and child heights contributed to his work on correlation and linear regression.
- **Interpretation:** Using the dataset in contemporary statistics education can obscure its original connection to Galton’s attempt to mathematize heredity and intervene in human populations.

---

## Heredity, Social Darwinism, and the Statistical Population

Galton became interested in hereditary traits during the nineteenth century. He initially studied “genius” by counting notable men listed in biographical dictionaries and observing that many were related to other people on the lists. After reading Darwin’s work, he concluded that human beings might deliberately guide their own evolution through artificial rather than natural selection.

This project required measuring variation across populations and determining how traits propagated. Galton attempted to mathematize heredity and contributed to the intellectual field the lecture associated with social Darwinism. In this framework, social classes were treated as expressions of biological differences rather than as products of social processes.

Galton also tried to formalize intelligence as a distinct, general, measurable trait that could place every person on a single scale. The lecture connected this effort to the later development of IQ testing.

### The Normal Distribution and Hierarchy

Galton drew on Adolphe Quetelet’s use of the Gaussian distribution, or bell curve, to describe populations. The lecture contrasted their interpretations:

- Quetelet treated the norm or average as an ideal and sought to understand how it was produced.
- Galton emphasized exceptional people at one end of the distribution and people classified as undesirable at the other.

The same mathematical form could therefore support a different social narrative. Galton rhetorically replotted the curve so that exceptional people appeared higher and those he regarded as “deviant” appeared lower. The lecture connected this classification to disability as an overarching category used to group bodies and people treated as abnormal or socially unworthy.

In *Hereditary Genius*, published in 1869, Galton proposed that talent in a homogeneous population followed a normal distribution. He mapped this imagined distribution onto social classes, placing independent professionals and large employers toward the high end, the “respectable” working class near the center, and people considered destitute or disposable toward the low end.

### Claim, Evidence, and Interpretation

- **Claim:** Galton treated social reputation and class position as reflections of inherited natural ability.
- **Evidence:** His diagrams mapped social classes onto a distribution of talent and assumed that professional achievement indexed genetic worth.
- **Interpretation:** The lecture described this as a defense of a conservative meritocracy or an “aristocracy of the best,” in which unequal social outcomes were presented as natural and heritable.

---

## Race, Disability, Crime, and Narratives of Degeneration

The lecture situated Galton’s work within Victorian anxieties about cultural and moral degeneration. Industrialization and urbanization were accompanied by poverty, destitution, crime, prostitution, and new biomedical classifications. Galton and other social Darwinists interpreted these developments as biological rather than cultural or socioeconomic problems.

Within this account, crimes were committed by “natural-born criminals” who were inherently deviant and unfit for modern life. Because such people were thought incapable of reform, the proposed response was to identify, classify, manage, and prevent them from reproducing. Social welfare was displaced by a project of reducing the number of people categorized as burdens.

Galton also proposed that races or social types each had their own bell curve, with the mean representing an ideal racial type and individuals appearing as deviations. Statistical analysis was supposed to sort people into the correct subpopulation and reveal a normal distribution within it.

The instructor stressed that Galton initially lacked the data needed to support these claims. His racial and hereditary theories were largely speculative and expressed assumptions more than empirical findings. The state statistics available in the nineteenth century did not contain the intergenerational measurements his project required.

### Claim, Evidence, and Interpretation

- **Claim:** Galton’s population categories embedded prior judgments about social worth.
- **Evidence:** He linked class position, race, disability, criminality, and intelligence to inherited differences and used distributions to represent their relative value.
- **Interpretation:** Statistical classification did not merely describe an existing society. It helped make social hierarchy appear biological, measurable, and natural.

---

## Anthropometry and Regression Toward the Mean

Galton first studied heredity through peas, comparing parent peas with their offspring. Seeking more persuasive evidence about human heredity, he later established an anthropometric laboratory at the International Health Exhibition in South Kensington in 1884.

The laboratory collected biometric data from approximately 9,000 people. Measurements included eyesight, visual judgment, hearing, breathing power, strength, swiftness, arm span, and weight. The lecture encouraged attention to what these categories reveal about the interests and assumptions of the person collecting the data. The measurements did not only record bodily size; they also sought to quantify acuity, judgment, strength, and speed.

Galton found that children of exceptional parents were, on average, closer to the population mean. This pattern troubled him because it appeared to show a natural aristocracy reverting toward ordinary ability. The lecture explained that “regression” originally referred to “regression toward mediocrity” before becoming known as regression toward the mean.

### Claim, Evidence, and Interpretation

- **Claim:** The problem that motivated Galton’s regression analysis was inseparable from his concern about hereditary hierarchy.
- **Evidence:** His observations suggested that the offspring of exceptional parents moved closer to the population average.
- **Interpretation:** Galton sought statistical insight into how reproduction might be managed to prevent what he saw as a decline toward mediocrity.

---

## Eugenics as a Scientific, Political, and Institutional Project

Galton coined the term “eugenics” in 1883. The lecture defined it as “well born” and as the science and practice of selectively breeding human beings. It compared its emergence with the Victorian development of modern dog breeding, where distinct breeds were deliberately selected for specialized traits.

Eugenics was not presented as only an intellectual doctrine. Galton created organizations to carry the project forward, including a eugenics record office that later became the Galton Laboratory for National Eugenics at University College London. He also became honorary president of the Eugenics Education Society.

The intended purpose of measuring human populations was to allow institutions to take over the work of natural selection. Statistical inference would guide authorities in promoting selected populations and discouraging others from reproducing. Reproduction, sexuality, marriage, gender, immigration, and women’s fertility consequently became institutional concerns.

Galton mainly promoted “positive” eugenics through selective marriage and increased reproduction among groups he valued. His successors also pursued “negative” eugenics through immigration restrictions, compulsory sterilization, and, at its most extreme, genocide.

### Claim, Evidence, and Interpretation

- **Claim:** Eugenics transformed statistical knowledge into a program for institutional intervention.
- **Evidence:** Eugenic organizations, laboratories, educational societies, marriage campaigns, immigration proposals, and sterilization campaigns connected measurement to governance.
- **Interpretation:** The project sought to optimize the population for national greatness by increasing lives deemed valuable and reducing lives classified as burdens.

---

## Eugenics as Biopower

The lecture presented eugenics as an intensive form of biopower. Biopower treats aggregate human life and biological populations as resources that can be managed, made more legible, and optimized. The instructor compared this to James Scott’s account of managing forests by making them straighter and easier to count.

Biopower takes populations, rather than only individual citizens, as its object. People appear as aggregates of bodies reproduced across time. Institutions define desirable qualities, measure the population against those standards, and assign different values to different forms of life.

The instructor emphasized that biopower is not always or necessarily harmful. Modern welfare states and the idea that governments should help keep citizens healthy are also tied to population management. The danger identified in the lecture lies in the tendency to optimize populations according to qualities selected by states, employers, capital, or other powerful institutions, producing differential valuation and sorting.

### Claim, Evidence, and Interpretation

- **Claim:** Eugenics is one possible expression of a broader power concerned with managing biological populations.
- **Evidence:** Eugenic programs used demographic and biometric information to direct reproduction, health, migration, marriage, and institutional treatment.
- **Interpretation:** Statistical methods can extend biopower by making populations visible and sortable, although the lecture did not claim that every population statistic or public-health intervention is eugenic.

---

## Mathematical Statistics and Eugenic Institutions

The lecture argued that eugenics and modern mathematical statistics “co-produced” one another. Early advocates sought to transform statistics from a practical discipline working with state numbers into a rigorous and apparently objective science capable of advising political authorities.

Eugenicists wanted their recommendations to appear above ordinary political conflict. Mathematical rigor helped portray their conclusions as impartial facts rather than socially situated judgments. Yet their research questions were shaped by specific narratives about heredity, national degeneration, social worth, and desirable futures.

### Karl Pearson

Karl Pearson was described as Galton’s selected protégé and as a founder of mathematical statistics. The lecture associated his work with hypothesis testing, the chi-square test, p-values, standard deviation, correlation, and regression coefficients. Pearson supplied mathematical rigor that Galton lacked.

After Galton’s death, Pearson held the first chair at the Galton Laboratory for National Eugenics. He also helped establish journals such as *Biometrika* and the *Annals of Eugenics*. The lecture stated that an article by Pearson in the first issue addressed “alien immigration” through an examination of Russian and Polish Jewish children.

Pearson used tests of normality to distinguish populations. In one example, he measured excavated skulls in Germany, detected asymmetry, and interpreted it as evidence that two populations had been mixed and that only one was ancestral to modern Germans.

### Ronald Fisher

Ronald Fisher later held the Galton chair of eugenics. The lecture associated him with the null hypothesis, F-tests, sufficiency, population genetics, and evolutionary biology. As an undergraduate, he helped form and chaired a university branch of the British Eugenics Society.

Fisher treated class distinctions in a free meritocratic society as expressions of underlying biological differences. He worried publicly about higher fertility among lower classes and campaigned to legalize sterilization in Britain. The lecture also stated that he rejected a 1952 UNESCO statement denying the biological reality of race.

### Statistical Significance, Correlation, and Causation

The lecture connected significance testing to attempts to demonstrate that groups living in the same territory were statistically distinct populations. Tests made it possible to ask whether an empirical distribution differed significantly from a theoretical normal distribution.

Pearson’s emphasis on separating correlation from causation was also placed in this context. According to the lecture, correlations could support intervention even without a causal account. This made it possible to argue for differences among classes or races while setting aside social processes that might have generated observed patterns.

### Claim, Evidence, and Interpretation

- **Claim:** Some foundational statistical techniques were developed while addressing problems posed within eugenic research.
- **Evidence:** Galton, Pearson, and Fisher simultaneously developed statistical tools and participated in eugenic institutions, journals, research, and advocacy.
- **Interpretation:** Mathematical rigor helped insulate political projects from accusations of partiality by presenting their conclusions as objective.
- **Qualification:** The instructor explicitly rejected a direct or inevitable line from regression, correlation, or population statistics to sterilization or genocide.

---

## Eugenics in Britain, the United States, and California

The lecture described eugenics as a global movement with supporters across much of the political spectrum, including liberals, progressives, conservatives, and some socialists. Eugenic societies conducted research, educated the public, lobbied governments, and tried to create communities organized around their worldview.

Although eugenics is now strongly associated with Nazi racial science and the Holocaust, the instructor emphasized that it began earlier and was geographically broader. German eugenics was influenced by British and American precedents, and programs of “racial hygiene” appeared in several national contexts.

### Immigration Restrictions

The American Eugenics Society was founded in 1922 to conduct research and publicize and lobby for eugenic policies. National organizations influenced federal policy even though many practices were administered at state and local levels.

The lecture identified the Immigration Act of 1924 as a prominent example. It established national-origin quotas and was linked to anxieties that immigration would undermine economic prosperity and national power.

### Compulsory Sterilization

Compulsory sterilization in the United States initially focused on poor white men classified as deviant. Over time, it increasingly targeted women, especially nonwhite and unmarried mothers. Some sterilization laws also targeted people classified as habitual criminals because criminality was understood as hereditary.

The lecture gave the following figures:

- Approximately 64,000 compulsory sterilizations occurred in the United States during the twentieth century, beginning in 1907.
- Approximately 20,000 occurred in California between 1909 and 1963.
- Compulsory sterilization in California was banned in 2014.
- Between 2006 and 2010, 148 incarcerated women received tubal ligations from physicians contracting with the California Department of Corrections and Rehabilitation under conditions the lecture described as coercive or pressuring.

In synthesizing a student contribution, the instructor connected California’s three-strikes laws and restrictions on conjugal visits for habitual offenders to a continuing logic that treats some people as incapable of reform and restricts their reproduction.

---

## Stanford, IQ Testing, and the Selection of “Exceptional” People

The lecture described California as a center of eugenic activity and Stanford University as a self-consciously eugenic project. It attributed this characterization to Malcolm Harris’s book *Palo Alto*.

David Starr Jordan, Stanford’s founding president, promoted eugenics and wanted the university to embody its principles. His concept of “bionomics,” described as the science of the laws of life and fitness in particular environments, was connected to fears of national degeneration. Jordan imagined the United States, and California in particular, as capable of leading a global rescue from degeneracy.

The lecture claimed that eugenic selection shaped Stanford admissions. The university asked applicants about height into the 1980s. Its early admission of women was described not simply as progressive but also as an effort to provide “genius” men with “genius” wives.

### Lewis Terman and the Stanford-Binet Test

Psychologist Lewis Terman was presented as another prominent Stanford eugenicist. He adapted Alfred Binet’s intelligence test into the Stanford-Binet IQ test. Whereas Binet’s test had been designed to identify students falling behind, Terman sought to measure innate intelligence.

The Stanford-Binet test supported an educational vision in which institutions identified geniuses and directed opportunities and resources toward them while separating them from people classified as underachieving or degenerate. Public education, in this account, was not principally meant to cultivate a broadly educated citizenry or workforce, but to select exceptional individuals who would lead the country.

IQ tests were also used to sort military recruits during World War I. The lecture explained that eugenicists feared that highly intelligent people would die in combat before reproducing. Testing could help assign them to the relative safety of officer positions while placing others in more expendable roles. IQ scores were later invoked by advocates of immigration restrictions and compulsory sterilization for people scoring below 70.

### Claim, Evidence, and Interpretation

- **Claim:** Eugenic assumptions shaped institutional decisions about admission, education, military roles, immigration, and reproduction.
- **Evidence:** The lecture cited Stanford admissions practices, the Stanford-Binet test, Army testing, immigration campaigns, and IQ thresholds for sterilization.
- **Interpretation:** Measurement operated as a tool for distributing opportunity, safety, resources, and reproductive freedom according to an asserted hierarchy of innate worth.

---

## Postwar Rebranding and Contemporary Continuities

After World War II, public association with Nazism made the label “eugenics” unacceptable. By 1950, few people with eugenic inclinations wished to identify publicly as eugenicists. The lecture nevertheless argued that some underlying ideas survived through institutional rebranding and other forms of biopower.

Organizations associated with eugenics became genetic research organizations. Pearson’s *Annals of Eugenics* became the *Annals of Human Genetics*. Eugenic thinking also moved away from explicit state direction toward private decision-making through genetic counseling and, more recently, embryonic gene editing.

The instructor identified disputes over screening embryos for Down syndrome and efforts to cure blindness as examples of disagreements about whether eliminating a condition also threatens a community or way of being. These examples were presented as contested contemporary questions rather than as settled conclusions.

The lecture also connected contemporary Silicon Valley pronatalism, interest in high-IQ children, and claims that unusually intelligent children will be needed to confront future artificial intelligence to older eugenic narratives. It associated these ideas with rationalist communities in Berkeley that rely heavily on quantitative, statistical, and Bayesian reasoning.

### Claim, Evidence, and Interpretation

- **Claim:** The decline of the eugenics label did not necessarily eliminate its classifications, institutions, or population-optimization logic.
- **Evidence:** Eugenic organizations were renamed, genetic counseling shifted decisions toward private settings, and contemporary debates continue to concern which traits should be selected or eliminated.
- **Interpretation:** Eugenic reasoning may persist subtly through decentralized cultural and technological practices even when no institution explicitly adopts the name.

---

## Why This History Matters for Data Science

The instructor explicitly stated that there is no straight line from population statistics to eugenics, linear regression to sterilization, or Galton’s work to Nazi racial hygiene and the Holocaust. Linear regression and other forms of statistical inference remain valuable tools and are not inherently eugenic. The lecture did not argue that they should be abandoned.

Instead, the historical argument concerned the milieu in which statistical reasoning developed. That history reveals recurring possibilities and temptations in how statistics is taught and applied. Students were encouraged to examine the examples, datasets, categories, and requested inferences embedded in their work.

Statistics was presented not only as a collection of techniques but also as a history of people, institutions, and ways of understanding the world. Historical knowledge cannot guarantee that harmful patterns will not recur, but it can support reflection about the institutions in which data-science work participates.

The same responsibility applies beyond statistics and data science. The lecture compared this disciplinary reckoning with history’s relationship to nineteenth-century nationalism and philosophy’s relationship to racist or Nazi-associated canonical figures. The goal is to recognize and engage with disciplinary histories and consider what those histories mean for present educational and professional spaces.

### Claim, Evidence, and Interpretation

- **Claim:** Responsible data-science education should include reflection on the histories and institutional purposes of its methods.
- **Evidence:** Statistical techniques developed alongside projects that classified and differentially valued human populations, while the same techniques later acquired much wider uses.
- **Interpretation:** Remembering this history can help practitioners ask what categories encode, which narratives guide an analysis, who gains institutional power from its results, and what role their work plays in broader systems.

---

## Human Contexts and Ethics Toolkit

### Power

The lecture repeatedly connected scientific and technological power to political and institutional power. Galton’s measurements were intended to help authorities intervene in reproduction, while Pearson and Fisher sought a mathematical statistics capable of advising policymakers from a position presented as objective and above politics.

Power operated through the authority to define desirable traits, establish population categories, decide what counted as normal, and distribute rights and resources accordingly. Immigration quotas, sterilization programs, admissions systems, IQ testing, Army placement, and restrictions on incarcerated people illustrate how measurements could alter movement, education, safety, reproduction, and social standing.

Biopower supplied the lecture’s central account of this relationship. States and other institutions treated aggregate human life as a resource to be optimized. This power did not only prohibit behavior; it structured which populations institutions encouraged, protected, discouraged, or prevented from reproducing.

### Sociotechnical Systems

The lecture treated statistics and eugenics as interconnected arrangements of people, measurements, institutions, technologies, policies, and social narratives. The anthropometric laboratory combined instruments and measurements with Galton’s judgments about heredity and worth. Statistical tests were developed and interpreted inside journals, laboratories, universities, eugenic societies, government programs, and educational systems.

The lecture’s claim that mathematical statistics and eugenics “co-produced” one another is sociotechnical: the technical methods cannot be fully isolated from the questions, categories, institutions, and intended interventions that helped shape them. At the same time, the instructor resisted technological determinism by stating that regression and statistical inference are not inherently eugenic and can have much wider applications.

The Stanford-Binet case further illustrates this interdependence. A test, an educational philosophy, university practices, military staffing, immigration campaigns, and sterilization policies together produced consequences that cannot be attributed to the numerical score alone.

### Identity/Positionality

The lecture showed how race, class, disability, gender, immigration status, and incarceration shaped how institutions classified and treated people. Galton mapped professional and class status onto supposed genetic worth, treated races as distinct statistical populations, and positioned disability and criminality as evidence of deviation from a norm.

Gender and sexuality were central because eugenic policy targeted reproduction. Selective marriage, concern about contraception, control of women’s fertility, and the later concentration of sterilization on nonwhite and unmarried mothers show that population management affected people differently according to social position.

The lecture also emphasized the positionality of scientists. Galton, Pearson, and Fisher were not depicted as detached observers. Their research questions reflected their locations within professional and elite institutions, their concerns about national decline, and their views of merit, class, race, and social order. Their insistence on objectivity attempted to disavow this situatedness.

### Narratives

The lecture identified narratives as central to the development and use of statistics. Victorian narratives of degeneration interpreted urbanization, industrialization, poverty, crime, prostitution, and immigration as evidence of biological decline. A meritocratic narrative treated professional success as proof of inherited ability, while a national-progress narrative made population optimization appear necessary for collective greatness.

Statistical visualizations and tests helped these stories appear natural. Replotting the normal curve placed exceptional people above those classified as deviant. Mapping class or race onto distributions represented social hierarchies as biological facts. Significance tests and correlations could then support claims that groups were naturally distinct without explaining the social causes of observed differences.

The lecture’s final argument asked students to question the narratives carried by present-day datasets, examples, and inferences. Contemporary stories about high-IQ babies, pronatalism, genetic selection, and future artificial intelligence were offered as cases in which older ideas about inherited worth and desirable futures may be repackaged in new technological language.

---

## Open or Unclear Points

The name of the nineteenth-century thinker repeatedly written as “Amos Ketale,” “Cantele,” or “Quetelet” is inconsistent in these notes; the lecture clearly identifies him as the figure whose work on the Gaussian distribution and the “average man” influenced Galton.

The exact name of the 1884 South Kensington exhibition at which Galton established his anthropometric laboratory is transcribed inconsistently as the “International Pulp Exhibition” and “International Health Exhibition” [unclear].

These notes state that an unspecified author from the assigned reading connected statistical significance to the effort to distinguish racial populations, but the author’s name is not intelligible [unclear].

A student offered an international example concerning the treatment of children with Down syndrome, but the location and precise policy were not consistently intelligible. The instructor’s synthesis focused more generally on embryo screening, termination, and disability-community concerns, so the uncertain country-specific claim is omitted.

A student also referred to several contemporary genocides. Because the individual examples were not fully intelligible, only the instructor’s broader acknowledgment that overt state-supported ethnic cleansing and violence may be understood as continuations of eugenic practices is preserved.