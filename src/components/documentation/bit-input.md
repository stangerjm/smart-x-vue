Examples: 

```vue
<bit-input 
    input-type="text" 
    label-text="Type: text" 
    :stack-elements="true" 
    input-name="textTypeStacked">
</bit-input>
```

```vue
<bit-input 
    input-type="text" 
    label-text="Type: text (not stacked)" 
    :stack-elements="false" 
    input-name="textType">
</bit-input>
```

```vue
<bit-input 
    input-type="number" 
    label-text="Type: number" 
    :stack-elements="true" 
    input-name="numType">
</bit-input>
```

```vue
<bit-input 
    input-type="checkbox" 
    label-text="Type: checkbox" 
    :stack-elements="true" 
    input-name="checkType">
</bit-input>
```

&ast;_Due to the nature of vue-styleguidist, the date-picker is not loaded correctly. Please refer to patternlab for a working example._
```vue
<bit-input 
    input-type="date" 
    label-text="Type: date" 
    :stack-elements="true" 
    input-name="dateType">
</bit-input>
```