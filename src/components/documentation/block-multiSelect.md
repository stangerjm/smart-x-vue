Examples:

```vue
<block-multi-select
    :options-data="[
        {id: 1, name: 'USA', locations: [{place: 'Washington'}, {place: 'Oregon'}, {place: 'California'}]},
        {id: 2, name: 'Japan', locations: [{place: 'Kyoto'}, {place: 'Osaka'}, {place: 'Uwajima'}]}]"
    parent-title="Country"
    child-title="Location"
    parent-display-key="name"
    child-display-key="place">
</block-multi-select>
```

HTML: <br>
*Note the colon before options-data property, which indicates that "optionsData" is a JSON array (see JSON example below), not a string literal
```html
<block-multi-select
    :options-data="optionsData"
    parent-title="Country"
    child-title="Location"
    parent-display-key="name"
    child-display-key="place">
</block-multi-select>
```

And the JSON: 

```json
{
  "optionsData": 
    [
      {
        "id": 1,
        "name": "USA", 
        "locations": 
          [
            {"place": "Washington"},
            {"place": "Oregon"},
            {"place": "California"}
          ]
      },
      {
        "id": 2,
        "name": "Japan", 
        "locations": 
          [
            {"place": "Kyoto"},
            {"place": "Osaka"},
            {"place": "Uwajima"}
          ]
      }
    ]
}
```

**&ast;Note that the JSON data MUST keep this structure in order to render properly, but the information and KEYS are flexible
and can be changed to any valid JSON value.**
<br>
I.E. The following is still a valid example, though the above markup would change:

```json
{
  "optionsData": 
    [
      {
        "code": 12,
        "region": "United States", 
        "areas": 
          [
            {"location": "New York"},
            {"location": "Texas"},
            {"location": "Idaho"}
          ]
      },
      {
        "code": 10,
        "region": "Japan", 
        "areas": 
          [
            {"location": "Tokyo"}, 
            {"location": "Shikoku"}, 
            {"location": "Kobe"}
          ]
      }
    ]
}
```