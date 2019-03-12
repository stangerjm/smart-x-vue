Examples:

Allow only Details and Delete.
```vue
<smart-table
        default-context="Region"
        :allow-edit="false"
        :table-data="
            [
              { 'id': 1, 'name': 'James',  'age': 24,  'isStudent': false,  'detailsContext': 'Manufacturer',  'deleteContext': 'County'},
              { 'id': 2, 'name': 'Jenna', 'age': 23, 'isStudent': true, 'editContext': 'Other', 'deleteContext': 'Profile'},
              { 'id': 3, 'name': 'Joel',  'age': 20,  'isStudent': true}
            ]">
</smart-table>
```

Allow only Details and Edit.
```vue
<smart-table
        default-context="Region"
        :allow-delete="false"
        :table-data="
            [
              { 'id': 1, 'name': 'James',  'age': 24,  'isStudent': false,  'detailsContext': 'Manufacturer',  'deleteContext': 'County'},
              { 'id': 2, 'name': 'Jenna', 'age': 23, 'isStudent': true, 'editContext': 'Other', 'deleteContext': 'Profile'},
              { 'id': 3, 'name': 'Joel',  'age': 20,  'isStudent': true}
            ]">
</smart-table>
```

Allow only Edit and Delete.
```vue
<smart-table
        default-context="Region"
        :allow-details="false"
        :table-data="
            [
              { 'id': 1, 'name': 'James',  'age': 24,  'isStudent': false,  'detailsContext': 'Manufacturer',  'deleteContext': 'County'},
              { 'id': 2, 'name': 'Jenna', 'age': 23, 'isStudent': true, 'editContext': 'Other', 'deleteContext': 'Profile'},
              { 'id': 3, 'name': 'Joel',  'age': 20,  'isStudent': true}
            ]">
</smart-table>
```

Allow all actions.
```vue
<smart-table
        default-context="Region"
        :table-data="
            [
              { 'id': 1, 'name': 'James',  'age': 24,  'isStudent': false,  'detailsContext': 'Manufacturer',  'deleteContext': 'County'},
              { 'id': 2, 'name': 'Jenna', 'age': 23, 'isStudent': true, 'editContext': 'Other', 'deleteContext': 'Profile'},
              { 'id': 3, 'name': 'Joel',  'age': 20,  'isStudent': true}
            ]">
</smart-table>
```

```html
<smart-table
    :table-data="data"
    default-context="Region">
</smart-table>
```

And the JSON:

```json
{
  "data": 
    [
      {
        "id": 1,
        "name": "James", 
        "age": 24, 
        "isStudent": false, 
        "detailsContext": "Manufacturer", 
        "deleteContext": "County"
      },
      {
        "id": 2,
        "name": "Jenna",
        "age": 23,
        "isStudent": true,
        "editContext": "Other",
        "deleteContext": "Profile"
      },
      {
        "id": 3,
        "name": "Joel", 
        "age": 20, 
        "isStudent": true
      }
    ]
}
```

**Data notes:** <br>
The data MUST be in this structure, or an array of objects. The property names, however, can change. <br><br>
The only properties above to note are the "detailsContext", the "editContext", and the "deleteContext". These properties
are important if a record needs to have actions that point to another context than the default context for the table.