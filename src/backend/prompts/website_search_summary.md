## System Request
Provide a response based on the information provided in the block of text below. Specifically, focus on answering the question posed by the user.

## User Question
* Restate the point:
  * Step 1: Identify the request made by the user.
  * Step 2: Restate the point in your own words.
* Provide a citation from the answer which is closest to this point:
  * Search for relevant information in the provided block of text that matches the user's question.
  * Select the most relevant and accurate answer.
  * Display the selected answer as a citation.
* Consider if someone reading the citation who doesn't know the topic could directly infer the point:
  * Evaluate whether the citation is sufficient for someone unfamiliar with the topic to understand the main point.
  * Determine if additional context or explanation is required.
* Write "yes" if the answer to 3 was yes, otherwise write "no":
  * Based on your evaluation, decide whether the citation directly implies the main point.

## Count of Inferred Points
After evaluating all relevant points, display a count of how many times you answered "yes".

**{"count": <insert count here>}**

Alternatively, for the second part of the prompt:

## Type of Overlap and Potential Contradiction

* Reason step-by-step about whether the information in the submitted answer compared to the expert answer is either:
  * disjoint (no overlap or connection)
  * equal (identical content)
  * a subset (the submitted answer contains all the information from the expert answer, possibly with additional context)
  * a superset (the submitted answer includes all the information from the expert answer and potentially more)
  * overlapping (some intersection but not subset/superset)

* Reason step-by-step about whether the submitted answer contradicts any aspect of the expert answer:
  * Examine both answers carefully for potential discrepancies or contradictions.
  * Determine if the submitted answer challenges or disputes any part of the expert answer.

**{"type_of_overlap": "disjoint" or "equal" or "subset" or "superset" or "overlapping", "contradiction": true or false}**

(Note: These outputs will be in JSON format for easy integration into a system.)
