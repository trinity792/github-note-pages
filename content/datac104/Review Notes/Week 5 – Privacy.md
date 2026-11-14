---
title: "Week 5 – Privacy"
Content Type: Review
Content Area: 
Course: 
description: "Review notes for Week 5 – Privacy"
pinned: false
Date Published: "October 24th, 2026 - 4:46 PM"
Last Updated: "October 24th, 2026 - 4:46 PM"
Status: Finalized
---
> [!info] 
> title: Week 5 Synthesis – Privacy Foundations and Privacy in the World 
> description: Comprehensive analytical notes for Data C104 Week 5, synthesizing Lecture 11 (Privacy Foundations), Lecture 12 (Privacy in the World), Nathan Malkin's "Contextual Integrity Explained," and Lowry Pressly's "The Right to Oblivion," analyzing HCE tools, legal/technical frameworks, empirical case studies, and course review questions. 
> tags: [privacy],[contextual-integrity],[oblivion]

# Source 1: HCE Fall 2026 – Lecture 11: Privacy Foundations

## Executive Summary

Week 5 of Data C104 provides a foundational examination of privacy, demonstrating that privacy is not a singular, natural, or static human attribute, but a historically contingent sociotechnical construct co-produced by legal doctrines, technological architectures, and political-economic arrangements. Modern privacy institutions largely descend from two pivotal historical moments: late 19th-century elite anxieties surrounding the disruptive emergence of snapshot photography and mass-circulation yellow journalism, and the 1970s administrative crisis regarding the computerized aggregation of citizen records in centralized state databases. This 1970s paradigm crystallized into the Fair Information Practice Principles (FIPPs) and the legal definition of Personally Identifiable Information (PII), establishing an individualistic "notice-and-consent" regime that positions privacy as a procedural matter of personal data self-management.

However, as revealed across Lecture 12 and the paired readings, this inherited 1970s framework breaks down in a contemporary datafied society characterized by machine learning, multi-party relationality, and pervasive commercial surveillance. PII and procedural consent fail to capture systemic collective harms, where an individual's voluntary disclosure implicates family members, demographic groups, or sovereign nations. Landmark case studies—including the non-consensual secondary genetic analysis of Havasupai tribal blood samples, Crisis Text Line’s commercial transfer of anonymized mental health conversations to its for-profit customer support spinoff Loris.ai, and the Transportation Security Administration's (TSA) algorithmic body scanners—reveal that compliance with formal FIPPs metrics can easily coexist with profound violations of human dignity, group sovereignty, and bodily autonomy.

To overcome the conceptual dead-ends of the individual-control model, the curriculum introduces two major philosophical and sociological alternatives: Helen Nissenbaum’s theory of Contextual Integrity (explicated by Nathan Malkin) and Lowry Pressly’s philosophy of Oblivion. Contextual Integrity abandons static public/private and sensitive/non-sensitive binaries, modeling privacy as the appropriate flow of personal information governed by context-specific norms across five core parameters: data subject, sender, recipient, information type, and transmission principle. Simultaneously, Lowry Pressly mounts a radical critique of the "ideology of information"—the unexamined assumption that every aspect of human existence can and should be translated into digital data. Pressly contends that genuine privacy does not protect secrets or regulate existing data flows, but instead produces and protects "oblivion": an essential realm of unarticulated ambiguity, unrecorded potentiality, and willed social forgetting without which human life becomes shallow, instrumentalized, and uninhabitable.

Together, these sources demonstrate that solving contemporary privacy crises cannot be accomplished through better legal checklists, refined terms-of-service agreements, or mathematical obfuscation techniques alone. Instead, protecting human flourishing in a datafied world requires interrogating the very imperative to compute, confronting asymmetric institutional power, respecting relational obligations, and establishing collective boundaries against the unchecked expansion of datafication itself.

## Historical Evolution of Privacy: From Solitude to Information Management

### The 19th-Century Crisis: Warren, Brandeis, and the Technological Shock of Photography

- **Privacy as a Dynamically Evolving Legal Right**: Privacy is not an immutable, timeless concept, but one whose legal contours have expanded in response to industrialization and technological change. In their foundational 1890 _Harvard Law Review_ article, "The Right to Privacy," Samuel Warren and Louis Brandeis argued that the common law must continuously adapt to protect the individual’s spiritual nature, thoughts, and emotions. They observed that while the law originally recognized only physical trespass against life and tangible property, changing social conditions demanded the recognition of an immaterial "right to enjoy life,—the right to be let alone" (Warren & Brandeis 1890, p. 193).
- **Technological Drivers of 19th-Century Anxiety**: The late 19th-century privacy panic was triggered by the convergence of instant snapshot photography (such as the handheld Kodak camera invented in 1888) and the industrialization of the press through mechanized printing presses and sensationalist "yellow journalism." Warren and Brandeis warned that mechanical devices had enabled columnists to invade the domestic hearth, observing that _"instantaneous photographs and newspaper enterprise have invaded the sacred precincts of private and domestic life; and numerous mechanical devices threaten to make good the prediction that 'what is whispered in the closet shall be proclaimed from the house-tops'"_ (Warren & Brandeis 1890, p. 195).
- **Class Dimensions and the "Respectable Citizen"**: Lecture 11 emphasizes that the initial legal formulation of the "right to be let alone" was deeply structured by class positionality. Warren and Brandeis—elite Boston patricians—were motivated by socialite outrage over tabloid gossip columns documenting their private family dinner parties and weddings. The 19th-century legal right to privacy was constructed primarily to insulate the domestic retreats of affluent, respectable citizens from public exposure, while working-class and racialized populations remained subject to overt public surveillance.

### The 20th-Century Administrative State and the 1970s Computing Shift

- **The Rise of Bureaucratic Dossiers**: Throughout the early-to-mid 20th century, the expansion of the New Deal, Social Security, and wartime mobilization produced an unprecedented administrative state that tracked citizens through paper-based files, punch cards, and census registries. Public concern remained muted so long as bureaucratic files remained fragmented across distinct, physical municipal archives.
- **The 1960s–1970s Computerized Database Crisis**: The introduction of digital mainframe computers, magnetic tape storage, and automated databases in the late 1960s sparked intense civil-liberties anxieties. Proposals to establish a unified "National Data Center" fueled public fears that an omniscient federal government would construct permanent, centralized dossiers monitoring citizens' political beliefs, financial records, and medical histories.
- **The Privacy Act of 1974**: In response to public outcry, Congress passed the Privacy Act of 1974, which codified early data protections into federal law. However, reflecting the political controversies of the Watergate era, the statute focused almost exclusively on restraining federal government record-keeping, leaving private commercial enterprises largely unregulated.

## The 1970s Privacy Framework and Fair Information Practice Principles (FIPPs)

### The Five Core Pillars of FIPPs

- **Origin in the 1973 HEW Report**: The modern architecture of information privacy stems from the 1973 Department of Health, Education, and Welfare (HEW) advisory committee report, _Records, Computers, and the Rights of Citizens_, which articulated the Fair Information Practice Principles (FIPPs or FIPs) to govern automated personal data systems.
- **Notice and Awareness**: Mandates that there must be no secret personal-data record-keeping systems. Organizations must provide public notice detailing what information is collected, how it is maintained, and the specific operational purposes for which it will be used.
- **Choice and Consent**: Requires that individuals must be provided with an actionable mechanism to prevent personal information collected for one primary administrative purpose from being utilized or transferred for secondary purposes without their affirmative consent.
- **Access and Participation**: Stipulates that individuals must have a legal right to inspect records maintained about them and possess formal administrative procedures to correct or amend inaccurate, incomplete, or misleading data.
- **Integrity and Security**: Places an affirmative obligation on data-keeping institutions to ensure that personal records are accurate, timely, and reliable for their intended use, requiring reasonable technical and physical precautions to safeguard data against unauthorized access, loss, or misuse.
- **Enforcement and Redress**: Requires the establishment of viable regulatory mechanisms, independent oversight agencies, or judicial civil remedies to hold non-compliant data keepers accountable and compensate injured data subjects.

### Legal and Technical Codification: PII and Sectoral Self-Regulation

- **Personally Identifiable Information (PII)**: U.S. privacy jurisprudence anchors protections strictly to the technical construct of PII. As formalized by the National Institute of Standards and Technology (NIST SP 800-122), PII is defined as:

> [!quote] 
> - "any information about an individual maintained by an agency, including 1) any information that can be used to distinguish or trace an individual's identity, such as name, social security number, date and place of birth, mother's maiden name, or biometric records; and 2) any other information that is linked or linkable to an individual, such as medical, educational, financial, and employment information" (NIST SP 800-122, 2010).
- **The Sectoral Patchwork vs. Comprehensive Regulation**: Unlike the European Union’s General Data Protection Regulation (GDPR)—which establishes a comprehensive human-rights framework governing all "personal data"—the United States adopted a highly fragmented, "sectoral" approach. Separate statutes govern specific industries—such as credit reporting (FCRA 1970), educational records (FERPA 1974), and healthcare transactions (HIPAA 1996)—while general commercial data collection operates under corporate self-regulation policed only retroactively by the Federal Trade Commission (FTC) under Section 5 authority against "unfair or deceptive" business practices.

## Technical Paradigms, De-Identification, and Re-Identification Vulnerabilities

### The Myth of Anonymization and Latanya Sweeney’s Re-Identification

- **The Flawed Promise of De-Identification**: Standard data-management best practices assume that privacy is preserved if direct identifiers (such as names, addresses, or Social Security numbers) are scrubbed, masked, or deleted from a dataset before release.
- **Sweeney’s Landmark 2002 Discovery**: Computer scientist Latanya Sweeney disproved the efficacy of naive de-identification by demonstrating that 87 percent of the United States population can be uniquely identified using a combination of just three demographic attributes: five-digit ZIP code, gender, and exact date of birth. Sweeney famously proved this by linking an "anonymized" state employee health insurance dataset with a publicly available municipal voter registration list, successfully isolating the private medical records of Massachusetts Governor William Weld.
- **The Netflix Prize Dataset Scandal (2006–2007)**: In 2006, Netflix released an "anonymized" dataset containing 100 million movie ratings from 500,000 users to host an algorithmic recommendation contest. Researchers Arvind Narayanan and Vitaly Shmatikov demonstrated that by cross-referencing Netflix’s timestamped ratings with public reviews on the Internet Movie Database (IMDb), they could re-identify individual users, exposing sensitive political views and sexual orientations. Netflix subsequently cancelled its second million-dollar prize contest following FTC scrutiny and class-action privacy lawsuits.

### Differential Privacy and Its Mathematical Trade-Offs

- **Mathematizing Privacy Losses**: Pioneered by Cynthia Dwork and collaborators in the mid-2000s, differential privacy reconceptualizes privacy not as an absolute binary property, but as a mathematically boundable risk parameter.
- **Algorithmic Noise Injection**: Differential privacy operates by injecting calibrated, randomized mathematical noise into database queries or published datasets. A system is provably differentially private if the inclusion or exclusion of any single individual's data produces an imperceptible change in the statistical output, guaranteeing that an observer cannot reliably infer the presence or attributes of a specific person.
- **The 2020 U.S. Census Deployment**: The U.S. Census Bureau formally implemented differential privacy algorithms to release 2020 redistricting data. While celebrated as a mathematical triumph, it generated fierce socio-political controversy: civil rights groups and rural municipalities pointed out that injecting noise disproportionately corrupted demographic counts in small towns and marginalized minority communities, illustrating a fundamental tension between mathematical privacy guarantees and democratic representation.

## HCE Tools in Privacy Foundations: Sociotechnical Systems, Narratives, and Power

### Sociotechnical Systems

- **The Intertwined Nature of Law and Infrastructure**: Privacy cannot be understood as an isolated piece of technical encryption or a static legal statute. Instead, Lecture 11 frames privacy as a sociotechnical system wherein technical configurations (such as database schemas, networking protocols, and de-identification pipelines), institutional arrangements (such as federal agencies and corporate marketing divisions), and legal norms operate in constant tension. A change in technical capacity (e.g., automated cross-database querying) instantly destabilizes established legal boundaries.

### Narratives

- **The "Big Bad Government" Trope**: U.S. privacy discourse is culturally disciplined by a dominant narrative template that envisions privacy threats as originating exclusively from an overreaching, authoritarian state (the Orwellian surveillance state). This narrative template naturalized the idea that the Privacy Act of 1974 only needed to bind public agencies, blinding the legal system to the exponential growth of commercial surveillance capitalism, third-party data brokers, and private corporate data harvesting.

### Power

- **Asymmetrical Governance and Class Protection**: The foundations of privacy law reflect deep structural power asymmetries. From Warren and Brandeis constructing tort protections for elite Bostonians to federal legislators insulating private markets from statutory caps on data collection, privacy rules consistently reflect the political interests of institutional elites. Those who hold the power to define what qualifies as "personally identifiable" effectively decide which forms of surveillance are legally actionable and which are rendered invisible.

---

# Source 2: HCE Fall 2026 – Lecture 12: Privacy in the World

## Executive Summary: Limits of the Inherited Paradigm in Practice

Lecture 12 ("Privacy in the World") shifts from historical foundations to contemporary data practices, demonstrating that the inherited 1970s paradigm—anchored in individual control, procedural notice-and-consent, and PII—collapses when applied to a modern datafied world. In contemporary digital platforms, data is not merely collected and stored in static silos; it is continuously scraped, merged, circulated across context boundaries, and fed into complex machine-learning models. These practices rupture the basic assumptions of individual consent, rendering traditional legal mechanisms completely inadequate for safeguarding human dignity and social justice.

Through a series of critical case studies, Lecture 12 illustrates that formal adherence to FIPPs can easily mask systemic social harms. In the Havasupai case, medical researchers complied with broad consent forms while committing a severe violation of tribal sovereignty and sacred origin narratives. In the Crisis Text Line scandal, users in acute psychic distress technically "consented" via digital terms of service, yet their vulnerable text interactions were commercialized to build for-profit customer support AI. Similarly, TSA millimeter-wave body scanners satisfied federal privacy impact assessments by blurring facial features, yet algorithmically enforced rigid binary gender norms that systematically subjected transgender and nonbinary travelers to humiliating secondary physical searches.

Ultimately, Lecture 12 emphasizes that privacy is relational, collective, and deeply entangled with human vulnerability. Rather than relying on empty individual compliance rituals like clicking "I Agree," the lecture argues that ethical data practice requires contextual evaluation, institutional restraint, and structural commitments to data minimization. In many high-stakes human domains, respecting human context requires deciding not to generate data in the first place, deliberately placing friction and obstacles in the path of continuous datafication.

## The Breakdown of the 1970s Model in the Datafied World

### The Failure of Notice-and-Consent and Terms of Service (ToS)

- **The Exploitative Bargain of Terms of Service**: In contemporary digital commerce, privacy is managed through boilerplate Terms of Service (ToS) and privacy policies. Users are presented with an asymmetrical economic exchange: access to essential communication utilities, search engines, or professional platforms is granted only in exchange for surrendering behavioral data.
- **The Structural Fallacy of Individual Self-Management**: The lecture demonstrates that notice-and-consent imposes an impossible cognitive and temporal burden on individuals. Users are forced to parse complex legal disclosures across dozens of daily applications. Because companies deploy coercive "dark patterns" and all-or-nothing choices (either accept the full terms or be excluded from the service), users are steered into reflexive, unthinking acquiescence.
- **The Temporal Reach of Agreements**: Individual consent agreements permanently bind personal data across time, even after a user's relationship with a company has fundamentally deteriorated. The lecturer illustrated this through their own abandoned Twitter account: despite disagreeing with the platform's transformed corporate ownership, historical posts remained permanently public because rigid administrative protocols prevented their collective removal, illustrating how an agreement made years prior continues to govern personal expression indefinitely.

### Beyond Personally Identifiable Information (PII)

- **The Inadequacy of Direct Identifiers**: Contemporary harms rarely depend on whether a dataset contains a citizen’s literal name or Social Security number. Advanced machine learning thrives on unstructured behavioral metadata, interaction timing, semantic analysis, and aggregated relational traces that do not meet the statutory definition of PII.
- **The Seven Limits of the Inherited Paradigm**: Synthesizing the case studies, the lecture demonstrates that legal compliance focused strictly on PII leaves out vital human dimensions:
    1. _Context-specific expectations_ regarding how and why information was originally shared.
    2. _Relational obligations_ between individuals and institutional caregivers.
    3. _Collective and group interests_ that extend beyond the isolated data subject.
    4. _Sovereignty and political self-determination_ for historically marginalized groups.
    5. _Bodily dignity and vulnerability_ in moments of physical or psychological exposure.
    6. _Differential effects_ on individuals whose bodies or identities depart from institutional defaults.
    7. _Structural power imbalances_ that eliminate the possibility of meaningful refusal.

## Case Studies: When Compliance Clashes with Context, Dignity, and Sovereignty

### Case 1: Havasupai Blood Samples and Collective Tribal Sovereignty

- **The Diabetes Research Compact**: In 1990, members of the Havasupai Tribe—an Indigenous community residing at the base of the Grand Canyon—partnered with geneticists at Arizona State University (ASU). Facing catastrophic rates of type 2 diabetes, tribal members provided blood samples under the explicit communal understanding that researchers would investigate genetic markers to alleviate diabetes in their community.
- **Secondary Use and Epistemic Violence**: ASU researchers subsequently repurposed the stored blood samples for unapproved secondary genetic studies, investigating genetic links to schizophrenia, inbreeding, and population migration theories. The migration research suggested that the ancestors of the Havasupai crossed the Bering Strait from Asia, directly contradicting the tribe’s sacred religious origin stories which hold that the canyon is the birthplace of humanity.
- **Sovereignty Beyond Individual Consent**: Although the university pointed to broad boilerplate language in consent forms, the tribe expelled the researchers from their reservation, initiated litigation, and secured a historic 2010 settlement that required ASU to pay $700,000 and return the physical blood samples for ceremonial burial. The lecture emphasizes that genetic data is inherently collective; individual consent cannot authorize research that threatens the cultural patrimony, political sovereignty, and historical self-determination of an entire sovereign nation.

### Case 2: Crisis Text Line (Loris.ai) and the Monetization of Human Distress

- **Repurposing Acute Trauma for Commercial AI**: In 2022, investigative reporting exposed that Crisis Text Line—a prominent nonprofit providing 24/7 text-based mental health counseling to individuals experiencing acute suicidal ideation, self-harm, and emotional abuse—was sharing anonymized conversation transcripts with its for-profit software spinoff, Loris.ai. Loris utilized natural language processing trained on these transcripts to build and sell commercial customer-support software designed to make corporate service representatives "more empathetic."
- **The Relational Betrayal Behind Anonymization**: Crisis Text Line vigorously defended the practice, arguing that it had satisfied all FIPPs requirements: users consented via a 50-paragraph terms-of-service link upon initiating a text, and data shared with Loris was scrubbed of PII and rigorously encrypted.
- **The Contextual Shift**: The lecture identifies this as a catastrophic failure of contextual integrity. Individuals reaching out to a crisis helpline in moments of profound life-or-death vulnerability expect their words to remain sealed within a caring therapeutic relationship. Repurposing that intimacy to optimize corporate customer service represents an exploitative commodification of trauma, where the vulnerable data originators receive no compensation or benefit while third-party commercial entities capture financial rents. Following intense public backlash, Crisis Text Line was forced to end its data-sharing relationship with Loris.ai.

### Case 3: TSA Semi-Automated Body Scanners and Compulsory Bodily Normalization

- **Post-9/11 Compulsory Screening**: Following the September 11 attacks, the Transportation Security Administration deployed millimeter-wave full-body scanners across U.S. airports as obligatory passage points for commercial air travel. Travelers could not meaningfully opt out without submitting to an intrusive, hands-on physical pat-down.
- **The Façade of Privacy Impact Assessments**: The TSA conducted formal Privacy Impact Assessments, modifying scanners with "Automated Target Recognition" (ATR) software that blurred facial images, displayed an identical cartoon stick-figure outline, and disabled raw image storage to prevent screeners from viewing intimate passenger anatomy.
- **Algorithmic Normalization and Differential Harm**: Despite passing formal PII criteria, the scanners operationalized a deeply discriminatory architecture. The system required screeners to push one of two buttons—blue for "male" or pink for "female"—based on visual gender presentation. The algorithm then compared the passenger’s scan against a normative anatomical template of a "standard" male or female body. Any deviation—such as prosthetic limbs, binding garments, medical devices, or nonconforming genitalia—instantly triggered a bright anomaly box on the screen, subjecting transgender and gender-nonconforming passengers to mandatory physical grope-downs. The technology demonstrated that privacy is about bodily dignity and the institutional power to define what is "normal."

### Case 4: Institutional Surveillance: Berkeley Classroom Recordings and the Canvas Breach

- **Classroom Recording Infrastructure**: Modern university classrooms contain automated recording systems and microphones designed to capture lectures for student accessibility. However, campus committees actively debate secondary analytic uses, including applying machine learning to predict student participation or evaluating instructor behavior.
- **The Shift in Relational Expectations**: Under a FIPPs framework, university administration asks only whether students receive notice and whether recordings are stored securely. However, contextual integrity reveals that students participate in discussions because they trust the immediate classroom relationship with their peers and instructor; transforming that space into an automated tracking archive chills intellectual risk-taking and free inquiry. Furthermore, the lecturer noted that during campus labor strikes, attendance tracking systems can be repurposed as surveillance instruments to monitor striking academic workers.
- **The Canvas Platform Breach**: In a campus breach of the Canvas learning management system, private communications and course discussion posts were exposed. Because the compromised data consisted of unstructured messages (which revealed sensitive student life situations and immigration status) rather than statutory PII, the university faced no mandatory legal obligation to issue an immediate public breach notification to students, highlighting the severe blind spot of PII-centric laws.

## HCE Tools in Practice: Power, Co-Production, Identity/Positionality, and Vulnerability

### Power

- **Asymmetrical Rule-Setting**: Power manifests as the asymmetrical capacity of dominant institutions to structure the environment and choices of others. In digital platforms, corporations exercise monopoly power by imposing unilateral terms of service that users cannot negotiate. In airport security, state power manifests as compulsory bodily exposure where travelers cannot refuse scanning without penalty.

### Co-Production

- **Mutual Shaping of Technology and the Law**: Co-production reveals that technology and social order are not independent variables, but are produced together. The legal doctrine of "a reasonable expectation of privacy" co-produces technological adoption: as surveillance devices (smartphones, Ring doorbells, airport scanners) become ubiquitous, societal expectations of privacy naturally degrade, which courts then cite to legally authorize further technological intrusions.

### Identity / Positionality and Vulnerability

- **Unequal Distribution of Privacy Burdens**: Privacy harms do not fall uniformly across the population; they map directly onto existing vectors of social marginalization. The Havasupai case highlights how data extraction exploits the structural vulnerability of Indigenous communities. The TSA case reveals that while individuals with normative, cisgender bodies experience scanners as brief inconveniences, nonconforming individuals bear severe dignitary costs and physical scrutiny. Privacy protections must be designed around the lived positionality of the most vulnerable subjects.

## Data Minimization and Limits on Datafication: Pushing Back Against the Imperative to Compute

- **Challenging the Inevitability of Datafication**: Contemporary institutions operate under an unquestioned imperative: that generating, capturing, and retaining more data is inherently beneficial and inevitable. FIPPs and terms-of-service regimes simply accept this drive, asking individuals to manage the exhaust through privacy settings.
- **The Structural Principle of Data Minimization**: Meaningful privacy governance requires reviving genuine data minimization—designing systems to achieve specific public goals by collecting the absolute minimum amount of data possible, restricting data retention lifespans, and actively prohibiting the creation of secondary data markets.
- **The Radical Choice Not to Datafy**: The lecture concludes by insisting that true privacy requires identifying human domains that must not be datafied at all. Preserving human dignity, democratic freedom, and social intimacy requires establishing legal and cultural barriers that declare certain sacred relationships, bodily realities, and communal conversations permanently off-limits from computational extraction.

---

# Source 3: Nathan Malkin (with Helen Nissenbaum) – Contextual Integrity Explained

## Contextual Integrity as an Alternative Privacy Model

### Idea 1 & 2: Privacy as Appropriate Information Flow Governed by Norms

- **Rejecting Static Binaries**: In "Contextual Integrity, Explained: A More Usable Privacy Definition," Nathan Malkin articulates Helen Nissenbaum’s theory of Contextual Integrity (CI) as an operational model for evaluating privacy in computer science and policy. CI directly challenges common models that treat privacy as absolute secrecy, total data minimization, or a rigid division between "sensitive" and "non-sensitive" data. Malkin notes that humans freely share intimate health records with doctors, financial statements with accountants, and gossip with friends, yet would feel violated if those recipients crossed boundaries.
- **Defining Contextual Integrity**: Contextual Integrity defines privacy not as an individual’s right to hide information, but as the _appropriate flow_ of personal information. Nissenbaum formalizes this definition:
    
    > [!quote] "Privacy, defined as CI, is preserved when information flows generated by an action or practice conform to legitimate contextual informational norms; it is violated when they are breached" (Nissenbaum 2019, p. 224; cited in Malkin p. 11).
    
- **The Failure of Procedural Models**: Malkin demonstrates that purely procedural frameworks—such as FIPPs or clicking "I Agree" on terms-of-service documents—fail to preserve privacy. A practice is not privacy-preserving simply because an engineer followed an administrative checklist or encrypted a data packet; if an information flow violates entrenched social norms, people will rightfully perceive it as a profound privacy violation.

### Idea 3: The Five Parameters of Contextual Information Norms

According to CI, a social context is not an empty container, but is actively constituted by five essential parameters. If any one parameter is altered, the entire normative evaluation of the flow changes:

1. **Data Type**: The specific category or nature of the information being transmitted (e.g., medical symptoms, financial assets, GPS coordinates, retail browsing logs).
2. **Data Subject**: The person or entity whom the information is actually about.
3. **Sender**: The actor who is transmitting or releasing the information.
4. **Recipient**: The actor who is receiving the information.
5. **Transmission Principle**: The specific conditions, constraints, or normative rules that govern how the information travels from sender to recipient. Examples include:
    - Explicit subject consent.
    - Physician-patient confidentiality.
    - Legal judicial warrants.
    - Reciprocity ("I'll show you mine if you show me yours").
    - Notice and advance disclosure.
    - The Chatham House Rule (sharing ideas without personal attribution).

```
                      [ THE CONTEXTUAL INTEGRITY MODEL ]
      ┌────────────────────────────────────────────────────────────────┐
      │ Social Context (Health, Education, Commerce, Democratic Life)  │
      └────────────────────────────────────────────────────────────────┘
                                      │
            ┌─────────────────────────┴─────────────────────────┐
            ▼                                                   ▼
  [ Five Descriptive Parameters ]                      [ Actors as Roles ]
  1. Data Type (What is shared)                        • Sender (e.g., Doctor)
  2. Data Subject (Whom it is about)                   • Recipient (e.g., Insurer)
  3. Sender (Who shares it)                            • Subject (e.g., Patient)
  4. Recipient (Who receives it)                                │
  5. Transmission Principle (Constraints/Rules)                 ▼
            │                                         [ Purpose / Use ]
            │                                    (Internal to the Context)
            ▼                                                   │
  [ Evaluation of Novel Flows ] ────────────────────────────────┘
  • Layer 1: Interests of Affected Parties
  • Layer 2: Core Ethical/Political Values (Justice, Equity, Liberty)
  • Layer 3: Fundamental Purpose & Function of the Context
```

### Actors as Roles and the Inclusion of Purpose

- **Actors Defined by Roles**: Malkin highlights that CI models actors not as static individual identities, but as functional social _roles_. An individual actor may embody multiple roles (e.g., a physician who is also a personal friend); privacy expectations depend entirely upon which capacity the actor is operating within during the interaction.
- **Purpose as a Parameter**: While Nissenbaum's original formulation relied on the five parameters, Malkin notes that she is increasingly persuaded to incorporate "purpose" as an explicit variable. A smart speaker user shares vocal acoustic data with a technology company in its role as a service provider to answer queries; if the company reuses that voice data in the role of a behavioral advertising broker, it breaches contextual integrity.

### Idea 4: Evaluating Novel Flows via Three Analytical Layers

When a new technology or practice alters an existing information flow, CI provides a structured three-tier framework to evaluate whether the disruption is ethically legitimate:

1. **Interests of the Affected Parties**: Analyzes the immediate practical harms, financial benefits, conveniences, and burdens experienced by the data subjects, senders, and recipients.
2. **Ethical and Political Values**: Evaluates whether the novel flow upholds or degrades fundamental democratic values, such as justice, equity, civil liberty, free speech, and non-discrimination.
3. **Contextual Functions, Purposes, and Values**: Considers the overarching societal purpose of the specific context itself. For example, the medical context exists to heal the sick; if a new data-sharing system causes patients to withhold symptoms from doctors out of fear of insurance discrimination, the flow is illegitimate because it undermines the fundamental purpose of healthcare.

## Response to Course Review Guide Reading Questions for Nathan Malkin

### Question 1: What is "Contextual" About Contextual Integrity?

- **Context Defines Normative Boundaries**: What makes contextual integrity distinctively "contextual" is its foundational rejection of universal, one-size-fits-all privacy rules. CI posits that human life is organized into distinct social spheres or realms—such as healthcare, education, legal proceedings, the marketplace, religion, and family life—each structured by its own history, internal purposes, roles, and values.
- **Information Cannot Be Divorced from its Social Setting**: In CI, there is no abstract, decontextualized "private data." Information is not naturally private or public; rather, norms dictate whether a specific type of data can appropriately move between specific roles under specific conditions. As Nissenbaum emphasizes, _"respective roles, activities, purposes, information types do not exist in a context; rather, these factors constitute a context"_ (Nissenbaum 2019, p. 227; cited in Malkin p. 19). An information transfer is acceptable only if it preserves the integrity and goals of that specific social sphere.

### Question 2: What is the Difference Between Contextual Integrity and the FIPPs Framework?

- **Substantive Social Norms vs. Procedural Checklists**: The fundamental divergence between CI and FIPPs centers on the distinction between substantive contextual appropriateness and procedural administrative compliance. The FIPPs framework is fundamentally procedural: it assumes that virtually any data collection, storage, or transfer is permissible so long as the organization follows a formal checklist—providing notice, securing nominal consent, allowing data access, and maintaining data security.
- **Beyond the Consent Defense**: Contextual Integrity insists that following procedural checklists is completely insufficient to protect privacy. Merely ticking a box or securing a user's signature on a terms-of-service agreement does not make an inappropriate flow legitimate. Privacy is governed by shared social expectations and contextual purposes; when a company leverages boilerplate consent to repurpose intimate data for unrelated secondary markets, it breaches contextual integrity regardless of whether it strictly complied with FIPPs.

### Question 3: Why Might It Be Hard to Implement Contextual Integrity as a Legal Framework?

- **Fluidity vs. Statutory Bright Lines**: Implementing Contextual Integrity as a formal legal framework is profoundly difficult because statutory law and judicial systems favor clear, uniform, and predictable "bright-line" rules (such as rigid definitions of PII, standardized disclosure templates, or fixed compliance requirements).
- **The Problem of Shifting and Contested Norms**: Social norms are fluid, evolving, culturally heterogeneous, and frequently contested. Translating the five CI parameters into enforceable legal code requires regulatory bodies and courts to adjudicate messy sociological questions: What constitutes an established "norm"? Whose expectations count as "legitimate"? How should law define the boundaries of a "context"?
- **The Epistemic Problem of Data Inferences**: Malkin identifies the challenge of algorithmic inferences as a severe operational hurdle for CI. In big data ecosystems, mundane, non-sensitive data primitives (such as clickstreams, typing cadences, or routine store purchases) can be computationally synthesized to infer highly sensitive attributes (such as medical conditions or pregnancy). Because data primitives carry no intrinsic privacy semantics, it is exceptionally hard for static legal statutes to regulate the vast web of potential secondary inferences under contextual rules.

---

# Source 4: Lowry Pressly – The Right to Oblivion: Privacy and the Good Life

## The Critique of the "Ideology of Information"

### The Naturalization of Data and the Limits of Informational Privacy

- **Blinded by the Bounty of Data**: In the introduction to _The Right to Oblivion: Privacy and the Good Life_, political theorist Lowry Pressly opens with a radical provocation: _"We live in an age blinded by information"_ (Pressly p. 1). While modern society possesses real-time biometric metrics, constant communication feeds, and comprehensive archives, Pressly asserts that having more information does not mean we see or understand human life more deeply.
- **The Poverty of Informational Wealth**: Pressly draws an analogy between knowledge and financial capital to expose the moral limits of datafication:
    
    > [!quote] "Saying that we are blinded by information is a bit like saying that we could be impoverished by money. These phrases share more than an air of apparent contradiction, however: they also express a similar moral idea. Some people really are impoverished by money, not in the sense that by having more they somehow have less of it, but rather that their lives go less well as a whole because they have come to view too much of human life in terms of dollars and cents. The same holds true for knowledge and information" (Pressly p. 2).
    
- **Defining the Ideology of Information**: Pressly defines the "ideology of information" as the unspoken, pervasive cultural assumption _"that information has a natural existence in human affairs, and that there are no aspects of human life which cannot be translated somehow into data"_ (Pressly p. 6). Echoing Karl Marx’s observation that the ruling ideas of an age are the ideas of its ruling class, Pressly argues that naturalizing information serves the economic interests of surveillance states and technology conglomerates, marking out the boundary of corporate extraction at the very edge of human existence.

### The Alienation of the Consensual Privacy Transaction

- **Recasting Privacy as Commercial Property**: Under the sway of the ideology of information, privacy has been degraded from an inalienable humanistic condition into a fungible property asset. As legal scholar Bernard Harcourt observes, privacy is now treated like a consumer preference that can be bought, sold, or traded in a digital marketplace in exchange for app access, fitness metrics, or social convenience (Pressly p. 5).
- **Surrendering the Ground Before the Debate Begins**: Pressly argues that modern defenses of privacy—including legal FIPPs and Nissenbaum’s "informational privacy" (which he cites as focusing on controlling the "flow" of data)—surrender the entire political battle to surveillance capitalism before the argument even begins (Pressly p. 7). By accepting that information _already exists_ prior to privacy questions, these theories reduce privacy to managing, restricting access to, or directing data.
- **The Folly of "Privacy Settings"**: Pressly exposes the profound inadequacy of platform "privacy settings." When a user configures their social media account or smartwatch data to "private," they merely control whether other external users can view it; the platform owners already possess the captured data to train models and extract profit. Pressly insists:
    
> [!quote] 
> - "One of the main claims of this book is that privacy is valuable not because it empowers us to exercise control over our information, but because it protects against the creation of such information in the first place" (Pressly p. 4).
    

## Conceptualizing Oblivion and Distinguishing It from Privacy, Secrecy, and Hiding

### Response to Course Review Guide: What is "Oblivion" and How Does It Differ from Privacy?

- **Defining Oblivion**: Oblivion describes a fundamental state of unknowing and unarticulation that is essentially resistant to definition, discovery, and informational translation. Unlike information, which requires noncontradiction and fixity, oblivion describes a state of affairs about which there is no established "fact of the matter"—a realm of pure ambiguity, play, potentiality, and self-becoming. Pressly stresses:
    
    > [!quote] "Oblivion describes a form of the unknown that, unlike what is secret or hidden, is essentially resistant to articulation and discovery: its limits do not concern who knows what, but instead what can be known" (Pressly p. 3).
    
- **The Distinction Between Oblivion and Privacy**: Oblivion is the underlying, positive condition of unknowability, unrecorded ambiguity, and mnemonic absence. Privacy, by contrast, is the social practice, cultural norm, and legal mechanism through which human societies cultivate, protect, and integrate oblivion into everyday life. Privacy is the social architecture that holds open regions of oblivion against the totalizing incursions of the information age.

```
+------------------------------------+-----------------------------------------------------------------------------------+-----------------------------------------------------------------------------------+
| Conceptual Dimension               | Secrecy / Hiding (Informational Paradigm)                                         | Oblivion / Genuine Privacy (Pressly's Humanistic Paradigm)                        |
+------------------------------------+-----------------------------------------------------------------------------------+-----------------------------------------------------------------------------------+
| Nature of the Object               | Definite, articulated facts (it is either X or not X; e.g., an affair or crime).   | Indefinite, unarticulated ambiguity; no fixed "fact of the matter."               |
+------------------------------------+-----------------------------------------------------------------------------------+-----------------------------------------------------------------------------------+
| Epistemic Boundary                 | Relates to *who knows what* (information is concealed from specific seekers).     | Relates to *what can be known* (impenetrable to informationalization).            |
+------------------------------------+-----------------------------------------------------------------------------------+-----------------------------------------------------------------------------------+
| Psychological State                | Fixated on the world outside; highly isolating, paranoid, and alienating.         | Unencumbered interiority; allows the self to come apart, rest, and transform.      |
+------------------------------------+-----------------------------------------------------------------------------------+-----------------------------------------------------------------------------------+
| Social Function                    | Shields deceptive actions, covert operations, or personal skeletons.              | Fosters trust, deep human relationships, democratic natality, and dignity.        |
+------------------------------------+-----------------------------------------------------------------------------------+-----------------------------------------------------------------------------------+
```

### Oblivion vs. Secrecy: Definite Facts vs. Inexhaustible Ambiguity

- **Dismantling "Nothing to Hide"**: Pressly completely rejects the surveillance slogan that "privacy is only for those who have something to hide." He insists that answering "everybody has something to hide" is a cowardly capitulation to authoritarian propaganda. Instead, we must declare: _"Hiding is for those with something to hide! Secrecy is for keeping secrets. Privacy is for something else"_ (Pressly p. 14).
- **The Definiteness of the Secret**: A secret requires a definite, crisp fact to exist—there is a clear truth that is simply concealed from others. Oblivion, conversely, contains no fixed fact of the matter. Pressly notes that telling a lie when interrogated about one's private life may successfully protect a _secret_, but it entirely destroys one's _privacy_, because it forces an unarticulated realm of existence into a rigid, defensive linguistic claim.

### Oblivion vs. Hiding: Psychological Isolation vs. Interior Freedom

- **The Alienating Psychology of Hiding**: Hiding is an inherently paranoid and isolating experience: the person hiding is constantly fixated on the barrier separating them from their pursuer, remaining psychological tethered to the world outside. When digital life forces users to constantly manage privacy settings, privacy degenerates into the exhausting condition of hiding, driving modern social alienation.
- **The Liberating Interiority of Oblivion**: Genuine privacy rooted in oblivion is marked by the complete absence of this tethered anxiety. It provides what Wallace Stevens poetically termed _"Some true interior to which to return, / A home against one’s self, a darkness, / An ease in which to live a moment’s life"_ (cited in Pressly p. 9). Oblivion allows personal identity to dissolve temporarily, giving human beings the freedom to be unaccountable, ambiguous, and open to continuous reinvention without fear of permanent digital capture.

## Historical Lineages and the Social Reproduction of Oblivion

### The 19th-Century Panic Over Photography and the Fixity of Information

- **The Invasiveness of the Lens**: In analyzing how the camera was perceived as an invasion of privacy in ways the naked human eye was not, Pressly explains that the human eye participates in the fluid, passing temporality of lived experience. The camera, however, violently freezes a dynamic living human being into a static, permanent informational object that can be circulated, commodified, and examined out of context.
- **The Perpetuity of Privacy Laments**: Pressly notes that ever since the mid-19th century—when mass media, Bertillon biometrics, and photography emerged—journalists have published identical essays proclaiming "The End of Privacy." The contemporary tech threat is not unique in its hardware, but in its ideological success in convincing humanity that every experience must be recorded as data.

### Acts of Oblivion and the Human Good of Willed Unknowing

- **The Mnemonic Politics of Forgetting**: The etymology of oblivion derives from the Latin _oblivio_ (to forget). Pressly explores historical "Acts of Oblivion"—such as the 1660 English statute passed following thirty years of civil war, decreeing that all wartime atrocities _"shall be bury’d in eternal Oblivion"_ (Pressly p. 17).
- **Deliberate Interpersonal Obliviousness**: An Act of Oblivion did not mean people literally forgot the war; rather, it prescribed a mandatory social ethic of willed obliviousness—an agreement to leave certain grievances unarticulated to prevent endless cycles of violent retribution. Pressly argues that privacy functions in our everyday lives as an Act of Oblivion: when we look away from someone in distress or an embarrassing situation, we offer a social performance of respect that communicates not "I won't tell," but "it is as if it never happened" (Pressly p. 17).

### Werner Herzog's "Dark Corners" and Human Depth

- **The Danger of Total Illumination**: Pressly draws upon filmmaker Werner Herzog’s powerful critique of modern psychological scrutiny to articulate why total information destroys human habitation:
    
    > [!quote] "Explaining and scrutinizing the human soul, [peering] into all its niches and crooks and abysses and dark corners, is not doing good to humans. We have to have our dark corners and the unexplained. We will become uninhabitable in a way an apartment will become uninhabitable if you illuminate every single dark corner and under the table and wherever—you cannot live in a house like this anymore. And you cannot live with a person anymore—let’s say in a marriage or a deep friendship—if everything is illuminated, explained, and put out on the table" (Herzog, cited in Pressly p. 3).
    
- **The Inexhaustible Human Person**: Pressly concludes that human depth, mutual trust, and democratic freedom depend on the social preservation of oblivion. When a human being is completely documented, classified, and predicted by algorithms, they are reduced to a transparent, instrumentalized object. Oblivion preserves the unrecorded interior reserves that make human beings capable of surprising themselves, resisting tyranny, and maintaining an inexhaustible capacity for moral and political transformation.

## Concluding Summary

Week 5 of Data C104 demonstrates that privacy is neither a simple legal preference nor an individual commodity to be bartered away in digital terms-of-service agreements. The historical evolution from Warren and Brandeis's 19th-century defense of elite domestic solitude to the 1970s bureaucratic crisis of computerized databases reveals that privacy has always been a sociotechnical battleground over the institutional power to see, record, and discipline human beings. The resulting 1970s paradigm—enshrined in FIPPs, PII, and sectoral market self-regulation—has proven structurally incapable of confronting contemporary data practices. Because it reduces privacy to procedural checkboxes and individual consent, it blinds institutions to collective harms, structural power asymmetries, the monetization of human distress, and the algorithmic normalization of vulnerable bodies.

Helen Nissenbaum’s theory of Contextual Integrity and Lowry Pressly’s philosophy of Oblivion provide essential theoretical pathways out of this impasse. Contextual Integrity offers an actionable operational model, replacing rigid public/private binaries with an analysis of contextual information flows, role-based relationships, and societal purposes. Pressly cuts even deeper, deconstructing the foundational "ideology of information" that treats data generation as an inevitable natural law. He proves that human flourishing, deep social relationships, and political liberty do not depend on building better interfaces to control our data, but on defending regions of oblivion—realms of unrecorded ambiguity, play, and willed social forgetting that are fundamentally resistant to computational capture.

Ultimately, synthesizing these historical, legal, and philosophical perspectives demonstrates that protecting human dignity in a datafied world requires moving beyond compliance checklists and procedural consent. It demands structural interventions: holding institutions accountable for contextual violations, asserting collective and Indigenous sovereignty over shared data, enforcing rigorous data minimization, and cultivating the collective courage to declare that certain sacred human realms must never be converted into data at all.