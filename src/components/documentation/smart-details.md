Examples:

```vue
<smart-details
    :detail-data="{
                    'name': 'James',
                    'age': 24,
                    'married': true,
                    'job': 'Web Developer',
                    'address': '509 12th Ave SE Olympia WA 98501',
                    'graduatedCollege': true,
                    'birthDate': '09/11/1993',
                    'birthPlace': 'California',
                    'test': true
                  }"
    title="Person"
    :details-per-column="5">
</smart-details>
```

Here is an example of how to use this component.

```html
<smart-details
    :detail-data="personObject"
    title="James">
</smart-details>
```

And the JSON: <br>
*Note that the pet object and the relatedPeople array WILL NOT be rendered as they are out of the scope of this component.

```json
{
  "personObject": {
    "name": "James",
    "age": 24,
    "married": true,
    "job": "Web Developer",
    "address": "509 12th Ave SE Olympia WA 98501",
    "graduatedCollege": true,
    "birthDate": "09/11/1993",
    "birthPlace": "California",
    "test": true,
    "pet": {
      "type": "cat",
      "name": "Ramona"
    },
    "relatedPeople": 
      [
        {"id": 1, "name": "Jenna", "relationship": "spouse"},
        {"id": 2, "name": "Joel", "relationship": "brother"},
        {"id": 3, "name": "Joseph", "relationship": "brother"}
      ]
  }
}
```