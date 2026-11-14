---
title: Christopher Jencks and Marsha Brown – The Effect of High Schools on Their Students
Content Type: Reading
description: Reading notes about Christopher Jencks and Marsha Brown – The Effect of High Schools on Their Students
pinned: false
Date Published: November 2nd, 2026 - 3:42 PM
Last Updated: November 2nd, 2026 - 3:42 PM
Status: Finalized
---
> [!info] 
> title: The Effects of High Schools on Their Students 
> description: A comprehensive sociological note analyzing Christopher S. Jencks and Marsha D. Brown's empirical study on the extent to which high schools influence cognitive test scores, educational attainment, and adult occupational status using longitudinal Project TALENT data. 
> tags: [high_school_effects],[educational_attainment],[project_talent],[school_quality],[accountability]

# The Effects of High Schools on Their Students (pp. 153–180)

## Executive Summary

Christopher S. Jencks and Marsha D. Brown re-examine a foundational premise of American educational policy and public belief: the assumption that attending a "good" high school significantly boosts a student's cognitive skills, educational attainment, and occupational prospects. Utilizing longitudinal data from Project TALENT—a nationally representative sample of 98 comprehensive public high schools following students from ninth grade (1960) through twelfth grade (1963), with follow-up surveys one year (1964) and five years (1968) after high school graduation—Jencks and Brown deploy rigorous regression techniques to isolate the specific, long-term effects of high school quality from the initial background characteristics of entering students.

The authors demonstrate that high school quality accounts for a remarkably small fraction of the total variance in student cognitive test performance and life chances. Because students entering high school already exhibit vast individual differences in initial academic skills, cognitive growth between ninth and twelfth grade is modest across all schools (averaging only two-thirds of a standard deviation). Consequently, twelfth-grade cognitive performance is overwhelmingly determined by what students knew before entering high school rather than by the quality of the high school they attended. Furthermore, Jencks and Brown reveal that "high-school quality" is a multi-dimensional, inconsistent phenomenon rather than a single unified institutional trait; a high school that successfully accelerates student performance on one cognitive test is no more likely than average to boost performance on other tests.

Most importantly, the study uncovers a profound disconnect between academic test-score gains and real-world postsecondary attainment. The correlation between a high school's effectiveness in raising standardized test scores and its effectiveness in boosting long-term educational attainment, occupational status, or career plans is virtually zero (\(r = +0.006\)). Adult educational and occupational destinations can be predicted just as accurately from ninth-grade test scores as from twelfth-grade scores, proving that cognitive gains achieved during high school exert no independent effect on subsequent life chances. Based on these findings, the authors conclude that traditional school resources (such as increased per-pupil spending, smaller class sizes, and advanced teacher credentials) do not reliably improve student outcomes, and that test-based accountability policies are fundamentally flawed mechanisms for evaluating school effectiveness.

## Methodological Framework and Project TALENT Data

### Data Sample and Longitudinal Design

- **Project TALENT Dataset**: The empirical analysis draws on a national subsample of 98 comprehensive, predominantly white public high schools surveyed by Project TALENT. All students in these schools completed a comprehensive battery of cognitive and background tests in the fall of ninth grade (1960) and were retested in the spring of twelfth grade (1963) using identical instruments.
- **Longitudinal Follow-Ups**: Project TALENT conducted subsequent follow-up surveys one year after expected high school graduation (1964, \(N = 4,315\)) and five years after graduation (1968, when respondents were 22 or 23 years old, \(N = 790\) employed males and 832 employed females). This multi-wave structure allowed the authors to track seventeen major variables across ten distinct outcome measures, spanning cognitive development, postsecondary educational attainment, adult occupational status (coded via Duncan's Socioeconomic Index), and career aspirations.

### Statistical Strategy and the Definition of School Quality

- **Operationalizing High-School Quality**: Jencks and Brown define high-school quality as any set of organizational or environmental characteristics that affects an average student's rate of growth between ninth and twelfth grades, without assuming in advance whether quality stems from measurable physical resources, social composition, or unmeasured institutional practices.
- **Isolating Within-School Regression Coefficients**: To eliminate confounding correlation between entering student traits and school environments, the authors calculated "within-school" regression equations. By subtracting school means from each individual student's score, they regressed twelfth-grade achievement deviations on ninth-grade achievement deviations across all schools simultaneously, yielding unbiased estimates of individual background traits under identical school conditions.
- **Estimating True Residual Variance**: Using within-school coefficients, the authors predicted each school's expected twelfth-grade mean based on its entering student body. Subtracting predicted means from actual school means yielded each school's "mean residual." By subtracting expected random measurement and sampling errors from the total variance of these mean residuals, Jencks and Brown estimated the "true variance" attributable to systematic differences in high school quality.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                       PROJECT TALENT DATASET                            │
│    (98 Public High Schools; 9th & 12th Grade Retests + 1 & 5 Year Follow-ups) │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                  WITHIN-SCHOOL REGRESSION ANALYSIS                      │
│   (Subtracts school means to isolate pure within-school student traits) │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    CALCULATING "MEAN RESIDUALS"                         │
│  (Actual School Mean − Predicted School Mean = Net High School Effect)  │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        EMPIRICAL OUTCOMES                               │
│  • Cognitive Test Gains: Explain 2–3% of total individual variance.    │
│  • Correlation (Test Score Residuals vs. Adult Occupational Status): ~0.00│
└─────────────────────────────────────────────────────────────────────────┘
```

## Cognitive Outcomes and High School Effects

### Cognitive Growth Between Ninth and Twelfth Grades

- **Dominance of Initial Entering Ability**: Student learning gains across six basic cognitive tests (Vocabulary, Social Studies Information, Reading Comprehension, Abstract Reasoning, Arithmetic Reasoning, Arithmetic Computation) average between 0.55 and 0.78 standard deviations over three years of high school. Because entering ninth graders exhibit massive variance in baseline knowledge, a student's twelfth-grade score depends far more on what they knew when entering high school than on the quality of the school attended.
- **Modest Percentile Rank Shifts**: A student entering high school at the 50th percentile who attends one of the top 18th percentile "best" high schools gains only about 0.67 points more than an average school, finishing at the 58th percentile in twelfth grade. Conversely, attending one of the bottom 18th percentile "worst" high schools drops the student to the 41st percentile. While non-trivial for the individual, high school quality accounts for only about 2.5 percent of the total individual variance in twelfth-grade test scores.

### The Multi-Dimensionality of School Quality

- **Absence of a Single "Good School" Factor**: The authors examine the correlations between school mean residuals across different cognitive tests to determine if "school quality" is a unified, one-dimensional attribute. The inter-correlations among school mean test residuals average a low \(+0.17\).
- **Inconsistent Institutional Performance**: A high school that excels at accelerating student growth in reading comprehension or social studies is only marginally more effective than average at boosting growth in arithmetic reasoning or vocabulary. A single, one-dimensional index of high school quality explains less than 1 percent of the variance in general academic achievement across schools.

### Tracking and Within-School Curriculum Assignment

- **Negligible Direct Effect of Tracking on Cognitive Growth**: Controlling for ninth-grade test scores, academic grades, and student plans, curriculum assignment (college preparatory versus vocational/general tracks) exhibits a very small direct effect on cognitive test growth, with standardized regression coefficients averaging only \(\beta = 0.027\).
- **Implications for Environmental Confounding**: Because curriculum tracking within high schools produces minimal direct differentiation in standardized cognitive test gains, the authors conclude that unmeasured environmental variations within tracked high schools do not severely bias estimates of student baseline cognitive traits.

## Postsecondary Attainment and Occupational Status

### Educational Attainment One and Five Years Post-Graduation

- **Magnitude of High School Impact on Education**: High school quality accounts for approximately 2.2 percent of the total variance in student educational status one year after high school (\(\text{Education } 14\)) and five years after high school (\(\text{Education } 18\)). Attending a high school in the top 20th percentile of effectiveness yields an average of 0.6 additional years of postsecondary schooling compared to attending a high school in the bottom 20th percentile.
- **Primary Determinants of College Continuation**: An individual student's educational plans in ninth grade, baseline total information test scores, and parental socioeconomic status (SES) are the dominant predictors of postsecondary enrollment. High school social composition (measured by mean student educational plans) exerts a modest positive effect on individual college attendance, but explains less than 1 percent of individual attainment variance.

### Occupational Status and Career Plans at Age 23

- **Explaining Adult Occupational Standing**: Five years after high school graduation, attending a high-quality high school raises female occupational status and career plans by approximately 2.2 percent of unexplained variance, independent of educational attainment. For males, controlling high school quality reduces the direct effect of parental SES on occupational status by 19 to 26 percent, indicating that high- and low-SES males end up more similar in occupational status when they attend the same high school.
- **Gender Disconnect in School Effects**: The correlation between a school's mean occupational residual for male graduates and its mean occupational residual for female graduates is \(+0.048\) (statistically zero). High schools that successfully assist young men in securing higher-status occupations are no more effective than average in assisting young women, reflecting distinct labor market opportunities or gender-differentiated school mechanisms.

```
┌─────────────────────────────────────────────────────────────────────────┐
│               INDEPENDENCE OF HIGH SCHOOL OUTCOMES                      │
├───────────────────────────────────┬─────────────────────────────────────┤
│ Outcome Metric Pair               │ Mean Residual Correlation           │
├───────────────────────────────────┼─────────────────────────────────────┤
│ Test Scores vs. Test Scores       │ r = +0.17  (Multi-dimensional)     │
├───────────────────────────────────┼─────────────────────────────────────┤
│ Test Scores vs. Educational Status│ r = +0.006 (Zero relationship)     │
├───────────────────────────────────┼─────────────────────────────────────┤
│ Male vs. Female Occupational Status│ r = +0.048 (Gender-independent)    │
└───────────────────────────────────┴─────────────────────────────────────┘
```

### The Disconnect Between Test Score Gains and Life Chances

- **Zero Correlation Between Test Gains and Adult Outcomes**: The correlations between a high school's mean test-score residuals and its mean residuals for educational attainment, adult occupational status, or career plans average \(+0.006\). Schools that rapidly boost student performance on standardized cognitive tests are completely uncorrelated with schools that help students finish high school, attend college, or enter prestigious careers.
- **Irrelevance of High School Test Gains for Life Opportunities**: At the individual level, adult educational attainment and occupational status can be predicted just as accurately from ninth-grade test scores as from twelfth-grade test scores on the exact same battery. Cognitive test-score gains achieved between ninth and twelfth grades yield no independent returns in the labor market or postsecondary education.

## Comparative Matrix of High School Outcome Indicators

|Outcome Dimension|Percentage of Individual Variance Explained by High School Quality|Correlation (\(r\)) with School Test-Score Residuals|Primary Individual Determinants|Policy Relevance & Validity|
|:--|:--|:--|:--|:--|
|**Twelfth-Grade Cognitive Test Scores**|2.0% – 3.0%|\(+0.17\) _(Inter-test average)_|Ninth-grade baseline test scores; general learning capacity.|Low validity for evaluating overall school quality; captures input ability rather than institutional effectiveness.|
|**Educational Attainment (1 & 5 Years Post-HS)**|2.2%|\(+0.006\)|Ninth-grade educational plans; parental SES; baseline test scores.|Moderate policy relevance; influenced slightly by peer climate (mean student plans) rather than school budget.|
|**Occupational Status at Age 23 (Duncan SEI)**|1.0% – 2.2%|\(+0.006\)|Completed years of education; ninth-grade composite test scores; parental SES.|High real-world relevance; disconnected from test gains; shaped by local labor markets and gender dynamics.|
|**Career Plans at Age 23**|2.0% – 4.0%|\(+0.006\)|Ninth-grade educational plans; composite achievement scores.|Measures long-term ambition; varies independently between male and female student bodies within the same school.|

## Policy Implications for Educational Reform and Accountability

### Limits of Traditional School Inputs and Resources

- **Inadequacy of Traditional Funding Formulas**: Measured high school characteristics—including per-pupil expenditure, teacher experience, teacher graduate training (master's degrees), and class size—show no consistent or statistically significant impact on student cognitive growth or postsecondary educational attainment between ninth and twelfth grades.
- **Perverse Class-Size Findings**: In several regression models, smaller class sizes exhibit a perverse negative association with male occupational status, highlighting the unreliability of assuming that traditional physical resource infusions automatically enhance student life outcomes.

### Critique of Test-Based Accountability

- **Misguided Evaluation Systems**: State legislatures and district school boards that attempt to hold high schools accountable by measuring gains on standardized basic skill tests are using fundamentally flawed metrics. Because test score gains do not predict subsequent educational or occupational attainment, evaluating high schools on cognitive growth fails to capture their actual impact on students' life chances.
- **Lack of Institutional Consensus**: Because high school quality is multi-dimensional and outcome-specific, no two evaluations of a single high school will yield identical results unless evaluators agree on a single, narrow outcome metric. A high school judged "effective" at raising math scores may be "ineffective" at raising reading scores or encouraging college attendance.

### Shifting Focus from Between-School to Within-School Inequality

- **Predominance of Within-School Variance**: Over 95 percent of the total national variance in adult cognitive skills, educational attainment, and occupational status occurs among students who attend the _same_ high school, rather than between different high schools.
- **Refocusing Equity Initiatives**: Equalizing high school quality across districts or funding levels would do virtually nothing to reduce overall social and economic inequality between affluent and disadvantaged youth. Educational policy makers seeking to reduce inequality must shift attention from inter-school disparities to intra-school processes, family background investments, and broader social welfare interventions.

## Key Theoretical Definitions

- **High-School Quality**: The net organizational, instructional, or environmental effect of a specific secondary school that alters an average student's rate of cognitive or social growth between entry (ninth grade) and exit (twelfth grade), independent of baseline student characteristics.
- **Within-School Regression**: A statistical procedure that subtracts school-level means from individual student scores to calculate regression coefficients strictly within individual schools, eliminating confounding correlations between entering student traits and school-level environments.
- **Mean Residual**: The difference between a school's actual average outcome score and its predicted average outcome score based on the entering baseline characteristics of its student body; serves as the primary empirical metric for net school effectiveness.
- **Multi-Dimensionality of School Quality**: The empirical reality that high school effectiveness varies independently across different outcome domains (e.g., specific test subjects, college attendance, career status), proving that "school quality" cannot be captured by a single, one-dimensional scale.
- **Duncan Socioeconomic Index (SEI)**: A standardized quantitative scale ranking adult occupational prestige and status based on the average education and income levels associated with specific civilian occupations.

## Summary

Christopher S. Jencks and Marsha D. Brown's "The Effects of High Schools on Their Students" provides a rigorous empirical challenge to the belief that secondary school quality serves as the primary engine of cognitive growth and social mobility in American society. Analyzing longitudinal Project TALENT data across 98 comprehensive public high schools, the authors demonstrate that high school quality accounts for only 2 to 3 percent of the total variance in student test performance, postsecondary educational attainment, and adult occupational status. Because entering ninth-grade students already possess vast differences in academic preparation, a student's performance at the end of high school is overwhelmingly determined by what they knew before entering ninth grade.

Furthermore, Jencks and Brown prove that high school quality is fundamentally multi-dimensional and outcome-specific. High schools that succeed in raising student scores in one cognitive area (such as reading) are no more effective than average in other areas (such as mathematics). Crucially, the authors discover that a school's capacity to boost standardized test scores bears a zero correlation (\(r = +0.006\)) with its capacity to enhance its graduates' postsecondary education, adult occupational status, or career plans. Standardized test score gains achieved during high school yield no independent returns in the adult labor market or higher education system.

Ultimately, the policy implications of Jencks and Brown's research are profound. Traditional policy remedies that focus on infusing physical resources—such as increasing per-pupil expenditures, reducing class sizes, or requiring advanced teacher degrees—do not reliably improve student outcomes. Moreover, test-based accountability systems fail because test score gains do not reflect long-term life chances. Because over 95 percent of social and educational inequality exists _within_ individual high schools rather than _between_ them, the authors argue that policy makers seeking to promote equal opportunity must abandon simplistic between-school comparisons and focus instead on supporting families, addressing intra-school tracking dynamics, and investing directly in disadvantaged communities.