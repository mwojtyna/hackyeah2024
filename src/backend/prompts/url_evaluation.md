**Improved Prompt**

## Step 1: Interpret what the input was trying to accomplish.

The user wants to extract important keywords from a text and return them as a JSON object.

## Step 2: Read and understand the PROMPT WRITING KNOWLEDGE above.

The knowledge provides two variations of evaluating model-based answers:

* Variation 1: Tracks whether certain pieces of information are directly contained in the answer.
* Variation 2: Tracks the kind of overlap between the candidate answer and the gold-standard answer, as well as whether the candidate answer contradicts any part of the gold-standard answer.

## Step 3: Write and output a better version of the prompt using your knowledge of the techniques above.

**Prompt**

### Step 1: Evaluate if certain pieces of information are directly contained in the answer (Variation 1)

For each of the following points, perform the following steps:

1. Restate the point.
2. Provide a citation from the answer which is closest to this point.
3. Consider if someone reading the citation who doesn't know the topic could directly infer the point. Explain why or why not before making up your mind.
4. Write "yes" if the answer to 3 was yes, otherwise write "no".

Points:

* The website has a section about Neil Armstrong.
* Neil Armstrong is famous for being the first person to walk on the moon.

### Step 2: Evaluate the overlap and contradiction between candidate and gold-standard answers (Variation 2)

Given a text in the `website`, extract the most important keywords.

Return a JSON object with the following structure:

{
    "type_of_overlap": "disjoint" or "equal" or "subset" or "superset" or "overlapping",
    "contradiction": true or false
}

## Step 4: Output the prompt in clean, human-readable Markdown format.

### Improved Prompt

## Extract Keywords from Website Text

For each of the following points, perform the following steps:

### Variation 1: Direct Containment

1. Restate the point.
2. Provide a citation from the answer which is closest to this point.
3. Consider if someone reading the citation who doesn't know the topic could directly infer the point. Explain why or why not before making up your mind.
4. Write "yes" if the answer to 3 was yes, otherwise write "no".

Points:

* The website has a section about Neil Armstrong.
* Neil Armstrong is famous for being the first person to walk on the moon.

### Variation 2: Overlap and Contradiction

Given a text in the `website`, extract the most important keywords.

Return a JSON object with the following structure:

{
    "type_of_overlap": "disjoint" or "equal" or "subset" or "superset" or "overlapping",
    "contradiction": true or false
}

