Examples:

```vue
<smart-form 
    form-action="/Profile"
    :form-data="{
        name: 'James',
        age: 24,
        isAwesome: true }"
    :disabled-inputs="['name']"
    form-title="Edit Profile"
    form-method="get">
</smart-form>
```

```vue
<smart-form 
    form-action="/Profile"
    :form-data="{
        name: '',
        age: 0,
        isAwesome: false }"
    :required-inputs="['name']"
    form-title="Create Profile"
    form-method="post"
    :empty-model="true">
</smart-form>
```

_Edit:_

```html
<smart-form
    form-action="/Region"
    :form-data="profileData"
    :disabled-inputs="['name']"
    form-title="Edit Profile"
    form-method="get">
</smart-form>
```

And the JSON:

```json
{
  "profileData": {
    "name": "James",
    "age": 24,
    "isAwesome": true
  }
}
```

OR

_Create_

```html
<smart-form
    form-action="/Region"
    :form-data="profileData"
    :required-inputs="['name']"
    form-title="Create Profile"
    form-method="post">
</smart-form>
```

And the code: <br>
*Note below is JavaScript but can be implemented with any language if converted to JSON and passed into component.

```html
<script>
    //set profileData to new instance of desired object.
    var profileData = new Profile();
</script>
```