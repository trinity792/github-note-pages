---
title: L3 Making Data
Content Type: Lecture
Content Area:
Course: Data C104
description: "The lecture argued that data is actively made through human labor, choices, standards, classifications, and institutional purposes rather than simply found. Using Bay Area air-quality and refinery-flare data, it examined representation, abstraction, decontextualization, and power, showing how the making of data shapes what can be known and what actions can be taken."
pinned: false
Date Published: August 31, 2026
Last Updated: August 31, 2026
Status: Finalized
---

# L3 Making Data

## Executive Summary

The lecture introduced the making of data as an essential but often neglected part of data science. Data does not exist as untouched raw material: people and institutions define phenomena, select what matters, build and maintain instruments, classify observations, standardize measurements, and organize the resulting records for particular purposes.

The Bay Area Air Quality Management District served as the main case study. Its Air Quality Index illustrates how measurements are abstracted and standardized into a regional communication tool tied to individual and institutional action. Its refinery-flare and local pollution data illustrate how different questions, scales, communities, and political concerns produce different kinds of data.

These cases supported four connected arguments:

- Data takes work to make and then does work in the world.
- Data represents phenomena selectively and from a perspective.
- Data can travel beyond its original context while retaining choices made at its origin.
- Because authoritative representations enable some actions and interests more than others, making data is connected to classification and power.

---

## Data Is Made, Not Given

Data science training often treats data as raw material that is already available for analysis and modeling. The lecture challenged this treatment by directing attention to how data comes to exist.

Understanding how data was made includes asking:

- Who made the data?
- What motivated its collection or generation?
- What questions and intentions shaped its design?
- Why was it made in one way rather than another?
- What work and resources were required to produce it?
- What parts of the world does it reveal, and what does it leave unavailable?
- What purposes can it serve once it has been made?

The lecture emphasized the word “made” instead of “collected” or “gathered” because “made” highlights active work. Even data called raw data has been produced through choices about what to observe, where to observe it, which instruments to use, and how to record the results.

### Why the Making Process Matters

Knowing how data was made helps determine what conclusions can be drawn from it. The conditions of its manufacture pre-shape later analysis by enabling researchers to see and do some things but not others.

The lecture presented this as both a question of knowledge and a social and ethical question. If analysts treat data as simply given, they may overlook the perspectives, decisions, and purposes embedded in it. The proposed alternative is to “denaturalize” data by developing a habit of questioning what has come to seem obvious or inevitable.

### Examples of Questions About Data Origins

In the opening discussion, the instructor synthesized several kinds of data whose origins may require investigation:

- Political polls raise questions about survey design, sampling, and differences in response rates associated with people’s social positions.
- Anonymized health and surgery data raise questions about what is lost when identifying information is removed and individual records are aggregated.
- Economic data about present conditions and future expectations raise questions similar to those posed by polling.
- Supply-chain order data created for routine operations may not have been made to answer later questions about environmental sustainability.
- Data assembled from insurance, state, municipal, or transaction records raises questions about how individual events were combined and what constraints shaped public release.

These examples established that data made for one purpose may later be used for another, even though its original design continues to constrain what it can support.

---

## The Bay Area Air District as a Case of Data Making

The Bay Area Air Quality Management District, referred to in the lecture as the Air District, provided a public and seemingly ordinary example through which to examine the hidden work beneath a data resource.

Its public-facing website presents air data through accessible dashboards, charts, and tables. The polished presentation can obscure the labor required to create and maintain the underlying data. The case was divided into two parts:

- The Air Quality Index showed how measurements become a standardized regional abstraction.
- Local pollution and refinery-flare data showed how different phenomena, scales, and community concerns lead to different data.

The comparison also demonstrated that air data serves both knowledge and political purposes. It describes environmental conditions while providing grounds for communication, regulation, institutional responses, and penalties.

---

## Air Quality Index as Abstraction and Standard

The Air Quality Index, or AQI, offers a high-level view of air quality across Bay Area zones and monitoring locations. The dashboard discussed in the lecture displayed relative values for ozone, fine particulate matter, and other pollutants. Users could examine data by location and at timescales ranging from hourly to monthly.

Such a representation supports questions about spatial and temporal patterns. A user might ask whether certain locations repeatedly show higher values, whether weekday and weekend patterns differ, or whether traffic and other activities correspond with changes in particulate matter.

### From Bodily Experience to a Regional Measure

Air pollution can be experienced through visible haze, irritated eyes, difficulty breathing, and other bodily effects. The term “air quality” stands above these varied experiences by translating them into a generalized and quantified concept.

According to the lecture’s account of the AQI-making process:

1. A network of sensors measures concentrations of particular substances.
2. The sensors continually produce measurements, such as hourly concentrations in parts per million.
3. Each concentration is divided by a concentration deemed to be an acceptable standard.
4. The result is multiplied by 100 and rounded to an integer.
5. The pollutant with the highest resulting value is selected.
6. Values are grouped into bands such as good, moderate, and higher-risk categories.

This process moves away from both direct bodily experience and the instruments’ concentration measurements. It produces a simpler scale whose familiar colors and numbers may appear natural only because people encounter them repeatedly.

### Claim, Evidence, and Interpretation

**Claim:** AQI is a useful abstraction that simplifies diverse measurements and experiences into a standardized language.

**Evidence:** The displayed number does not directly report each pollutant concentration. It combines sensor measurements, standards, calculations, rounding, pollutant selection, and categorical bands.

**Interpretation:** This simplification makes regional conditions easier to communicate, but it also distances users from individual bodily experiences and the underlying measurements and choices.

---

## Standards, Communication, and Obligatory Passage Points

The AQI scale is connected to actions that individuals and institutions are encouraged or required to take. Individuals may be advised to reduce exposure, while institutions may activate response plans when a threshold is crossed.

The lecture used the Berkeley Unified School District’s public-school AQI response plan as an example. During wildfire smoke, schools might remain open while moving lunch, recess, or physical education indoors. AQI therefore functions as “guided communication in the service of directed action.”

The lecture described AQI as an obligatory passage point. People seeking to coordinate action around air quality - such as protecting students from fine particulate matter or issuing advice about pollution - must pass through a shared, standardized measure.

### Historical and Institutional Context

The standards behind AQI do not originate solely with the Air District. The lecture connected them to six federally defined “criteria pollutants” associated with the creation of the Environmental Protection Agency and the 1970 amendments to the Clean Air Act.

This framework grew out of concerns about pollution associated with post-World War II urbanization, increased vehicle use, industrial concentration, and trash burning. Regional organizations such as the Air District then carried out pollution regulation through locally produced measurements and data.

### Interpretation

The lecture presented standards as part of the often invisible infrastructure of data making. Standards make coordinated knowledge and action possible, but they also embody an account of what pollution matters. In the AQI case, that account emphasizes regional air pollution associated with vehicles, industry, and other sources recognized in the historical regulatory framework.

---

## Data-Centric Technologies and Social Order

The lecture treated AQI as a data-centric technology that structures social order. It connected the index to previously introduced characteristics of technologies, particularly the idea that technologies embody social values, positions, and narratives.

AQI contains a story about:

- Which forms of air pollution matter for human health.
- Which pollutants should be measured.
- Which causes, such as vehicles and regional industry, should receive attention.
- Which geographic scale, particularly the regional Bay Area scale, should organize the problem.
- Which thresholds should trigger communication or action.

The measurement system does not merely describe air. Its categories and standards organize how pollution is understood and how institutions respond.

---

## Local Pollution and Refinery-Fence-Line Communities

The second part of the Air District case shifted from regional air quality to explicitly labeled air-pollution data. The lecture discussed time-series measurements from local sensors at places including Point Richmond, Richmond’s 7th Street, and Rodeo. It focused on hydrogen sulfide, which the lecture distinguished from the pollutants used in AQI.

This data allowed attention to particular substances, monitoring sites, and changes over time. The lecture noted that the displayed records could be viewed as charts or tables, while more extensive records might require a public records request.

### Refinery Flares

The Bay Area, especially parts of the East Bay and North Bay, contains petroleum refineries near communities with distinct demographic and environmental-justice histories. The lecture focused on the Chevron Richmond refinery and data from October 2021.

Flares burn refinery gases that would otherwise be vented into the surroundings. They may be used deliberately or triggered by pressure conditions described as dangerous. The Air District maintains data related to flares, including measurements, incident reports, and causal analyses.

The lecture paired tables of flare emissions with photographs of flare events. It described an October 2021 event in which 17 tons of sulfur dioxide were released over two days.

### Claim, Evidence, and Interpretation

**Claim:** Regional AQI data may not represent highly local experiences of pollution near refineries.

**Evidence:** Fence-line communities raised concerns about health effects and exposure to refinery-related substances, while flare events could occur at a local and hourly scale not captured by a broad regional account.

**Interpretation:** Different phenomena and community concerns require different data. Flare data is made because the regional criteria-pollutant framework does not fully speak to local experiences near refinery boundaries.

### Scale as a Data-Making Choice

The lecture contrasted the scales relevant to different data:

- Overall air quality can be discussed across the Bay Area and may vary over days, weeks, or months.
- Flare events matter locally and hourly.
- Exposure may differ block by block and between individuals.
- Local experiences are connected to histories of community concern and distrust.

The choice of scale therefore affects what becomes visible. Treating everyone as members of one region with minor variations can conceal sharply unequal exposures.

---

## Phenomena, Representation, and the Work Behind Data

To understand how data is made, the lecture proposed beginning with the phenomenon defined as requiring study. In the Air District case, the broad phenomenon was pollution and its human impact, represented through measurements of pollutant concentrations rather than through complete public-health outcomes.

Air quality data is an abstract representation intended to capture something about nuisances, hazards, bodily experiences, and environmental conditions. Moving from the phenomenon to an accessible dataset requires extensive work.

### The Labor of Data Making

The lecture identified work involved in producing sensor-based data:

- Instruments must be manufactured or purchased.
- Sensors must be selected and placed in particular locations.
- Monitoring sites may require fences and protection from vandalism.
- Instruments must be powered and maintained.
- The continuing flow of data must be monitored.
- Measurements must be attached to standardized categories.
- Records must be stored, organized, analyzed, and made accessible.

A finished dataset or dashboard can hide this effort. The data is not untouched by human hands even when measurements are generated automatically.

### People as Sensors

Data is also made through community observation. Residents may photograph pollution events and file complaints through public forms. Their observations create records that can prompt regulators to collect or analyze additional information.

This process also requires institutional labor. Staff must receive, interpret, count, and respond to complaints. Community members and agency staff therefore participate in a feedback loop through which observations become data and may influence subsequent monitoring.

---

## Data Takes Work and Does Work

The lecture condensed a central argument into the phrase: “Data takes work. It does work.”

Data takes work because people and institutions must define phenomena, build infrastructure, make selections, produce measurements, classify records, and maintain access. It does work because it can:

- Answer questions about the world.
- Support claims.
- Communicate conditions.
- Direct individual or institutional behavior.
- Trigger regulatory action.
- Establish grounds for penalties or fines.
- Make some community concerns institutionally recognizable.

In the Air District case, the agency used data not only to describe air pollution but also to assess refinery compliance and levy fines. Data production was therefore tied to intended consequences in the world.

---

## Representation as Knowledge and Politics

Representation was introduced as a two-sided concept involving both knowledge and politics.

For something to function as data rather than as a jumble of observations, it must represent a phenomenon presumed to exist in the world. A dataset has meaning through this relationship: it stands for some aspect of a phenomenon beyond itself.

Representation begins by recognizing, naming, and recording something that may previously have gone unseen or unacknowledged. It then selects parts of that phenomenon for inclusion.

### Selection Is Inescapable

The lecture argued that all data is partial, limited, and selective. A dataset cannot capture the entire world. Data making therefore requires choices about which features to record and which to leave out.

Selection was distinguished from the idea that data could simply avoid perspective. Every act of seeing, speaking, and measuring occurs from somewhere. There is no perspective-free “God’s-eye view” that captures everything.

The lecture cautioned against treating selection itself as a flaw that could be repaired by making no selection. Selection is intrinsic to data. The analytical task is to identify the perspective from which selections were made and examine their consequences.

### The Map and Territory Analogy

A transit map illustrates the necessity of selection. Its purpose is to help people navigate, so it includes features useful for that task and leaves out others. A one-to-one representation of the entire world would be unusable.

Other maps can select geological formations, waterways, or freeways. What a map includes depends on its purpose and the interests involved in making it. In the same way, a dataset is a representation of the world rather than the world itself.

The corresponding question for data analysis is: What was left out?

---

## Representation, Authority, and Legitimacy

Selection matters because data can speak with authority. When a representation is treated as accurate or legitimate, it appears to allow the world itself to speak through the data. That authority can provide grounds for decisions where people disagree.

Air District data was made partly to perform this political work. It could direct action and support penalties. At the same time, fence-line communities could challenge the legitimacy of an incomplete representation by arguing that regional measurements did not capture their experiences.

### Claim, Evidence, and Interpretation

**Claim:** The legitimacy of an institution’s data depends partly on whether its representation includes the phenomena and experiences relevant to the people affected.

**Evidence:** Communities near refineries advocated for data that captured local pollutants and flare events not adequately represented through regional AQI measurements.

**Interpretation:** Calls for different data were also claims for political recognition. Communities sought a representation through which their experiences and concerns could become institutionally authoritative.

---

## Data, Decontextualization, and Travel

Data often moves away from the place and purpose of its creation. It travels across space and time and may enter new analytical settings, including machine-learning and AI systems.

As data travels, it can become decontextualized. The labor, local knowledge, motivations, institutional history, and design decisions involved in making it may disappear from view. A user elsewhere may encounter only a table, dashboard, or file.

The lecture emphasized that leaving the original context behind does not remove the choices embedded in the data. Those choices travel with it and continue to shape what later users can see, ask, and do.

The Air District case illustrated this through differing levels of local knowledge. People familiar with Richmond, Rodeo, or other refinery communities may interpret the data through experiences unavailable to users approaching it only as a distant table or chart. Recovering the human context can therefore matter for interpreting what the data represents.

---

## Data and Power

The lecture connected data making to a working definition of power: the asymmetric capacity of a person or technology to structure or alter the behavior of others.

Data enables certain actions and does not enable others. The questions used to define a phenomenon, the work funded to measure it, and the resulting categories affect whose aims can be realized.

Questions for analyzing power in data making include:

- Who defines the phenomenon?
- Who determines which questions are asked?
- Who makes and maintains the data?
- Who can participate in defining its categories?
- What purposes is the data used for?
- Whose aims are enabled by the resulting representation?
- Who is not represented or lacks a voice?

The lecture emphasized that asking who lacks power is an effective way to identify how power operates. In the Air District case, fence-line communities argued that criteria-pollutant data collected at a regional scale did not speak to their local experience. Their demand for other measurements was also a demand to change which concerns the data could make actionable.

### What Counts Is What Gets Counted

The lecture linked knowledge and power through the proposition that what is measured and recorded can acquire the status of what is real and significant. Data reveals what mattered to the people and institutions that made it because they chose to count some phenomena and not others.

This does not mean that every omission can be avoided. It means that the selection and its stakes should be examined rather than treated as natural.

---

## Classification as Infrastructure for Data

Classification was introduced as the system of categories or “boxes” into which observations are placed. Before something can be counted, a decision must be made about whether it counts as an instance of the phenomenon being studied.

The Air District cases supplied an initial contrast:

- One classification system centers federally defined criteria pollutants used in AQI.
- Another includes pollutants and incidents that matter to communities near refinery fences.

Categories are places where human assumptions, decisions, and labor enter data collection. Through repetition and their incorporation into social infrastructure, classifications can come to seem natural even though they were made.

The lecture introduced classification as a topic to be developed in subsequent sessions through the assigned excerpt from *Sorting Things Out*. The central question established here was how classification works with social order and why analysts must inspect the assumptions and decisions embedded in the categories of any dataset they use.