# INPUT SECTION

```json
{
    "prompt": "some request from the user",
    "urls": [
        "less/important/url",
        "url/that/is/possibly/more/relevant",
        ...
    ]
}
```

# OTPUT SECTION

json in EXACTLY this format
DO NOT return any other format

```json
{
    "urls": [
        "url/that/is/possibly/more/relevant",
        "less/important/url",
        ...
    ]
}
```

# TASK

take urls from the `urls` array, and sort them by how useful the information found on the website that they lead to, could be in the context of `prompt`
return sorted array as json
