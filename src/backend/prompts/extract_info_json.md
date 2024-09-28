### Text Extraction Task

Your task is to take a user's request and retrieve the most relevant information from a given text. Extract the essential keywords from the text and return them as a JSON array.

**Expected Output**
```json
{
  "results": ["keywords"]
}
```
where `keywords` is an array of extracted text fragments.

**Note**: You can assume that the user's request will be provided as input to this task. The text will also be available for extraction. Your goal is to extract the most
important keywords from the relevant section of the text and return them in a JSON array.

### Example Input
```markdown
user is gonna provide you with a request
from the text in the `text`, extract the most important keywords
return the keywords in json array, like

{
    "results": []
}
```
### Context
The task requires you to analyze user input, understand their intent, and retrieve relevant information from a text. The output should be a JSON array of extracted keywords, which
can be used for further processing or analysis.
