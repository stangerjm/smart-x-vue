Examples: 

```vue
<bit-input 
    input-type="text" 
    label-text="Type: text"
    name="textTypeStacked">
</bit-input>
```

```vue
<bit-input 
    input-type="number" 
    label-text="Type: number" 
    name="numType">
</bit-input>
```

```vue
<bit-input 
    input-type="checkbox" 
    label-text="Type: checkbox" 
    name="checkType">
</bit-input>
```

```vue
<bit-input 
    input-type="date" 
    label-text="Type: date" 
    name="dateType">
</bit-input>
```

```vue
<bit-input 
    input-type="password" 
    label-text="Type: password" 
    name="password">
</bit-input>
```

```vue
<bit-input 
    input-type="phone" 
    label-text="Type: phone number" 
    name="phoneNumber">
</bit-input>
```

```vue
<bit-input 
    input-type="text" 
    label-text="Type: text"
    name="textTypeStacked"
    stack-elements>
</bit-input>
```

```vue
<bit-input 
    input-type="number" 
    label-text="Type: number" 
    name="numType"
    stack-elements>
</bit-input>
```

```vue
<bit-input 
    input-type="checkbox" 
    label-text="Type: checkbox" 
    name="checkType"
    stack-elements>
</bit-input>
```

```vue
<bit-input 
    input-type="date" 
    label-text="Type: date" 
    name="dateType"
    stack-elements>
</bit-input>
```

```vue
<bit-input 
    input-type="password" 
    label-text="Type: password" 
    name="password"
    stack-elements>
</bit-input>
```

```vue
<bit-input 
    input-type="phone" 
    label-text="Type: phone number" 
    name="phoneNumber"
    stack-elements>
</bit-input>
```

```vue
<bit-input 
    input-type="text" 
    label-text="Required Field" 
    name="phoneNumber"
    stack-elements
    required-field>
</bit-input>
```

```vue
<bit-input 
    input-type="text" 
    label-text="Readonly Field" 
    name="phoneNumber"
    value="Test"
    stack-elements
    readonly>
</bit-input>
```

```vue
<bit-input 
    input-type="text" 
    label-text="Field with validation error" 
    name="phoneNumber"
    stack-elements
    errored-field>
</bit-input>
```

Lining up non-stacked inputs:
  <br>*note: Container DIV and style attributes are simply for demonstration purposes
```vue
<div>
  <bit-input 
    input-type="text" 
    label-text="Name" 
    name="lineUp1"
    line-up
    style="margin-top: 5px;">
  </bit-input>
  
  <bit-input 
    input-type="text" 
    label-text="Age" 
    name="lineUp2"
    line-up
    style="margin-top: 5px;">
  </bit-input>
  
  <bit-input 
    input-type="text" 
    label-text="Results per page" 
    name="lineUp3"
    line-up
    style="margin-top: 5px;">
  </bit-input>
</div>
```
