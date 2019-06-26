# bit-input

A flexible input and label that can be rendered as a text field, number, date-picker, checkbox, password field, or phone number field.

## Props

<!-- @vuese:bit-input:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|inputType|The type the input should render as.For example: 'checkbox' will render a checkbox,'date' will render a date-picker, 'password' will render a password input, etc.|`String`|`true`|-|
|labelText|Display text for the related input label|`String`|`true`|-|
|stackElements|Flag to have input and label stack horizontally if set to true|`Boolean`|`false`|false|
|inputId|Corresponds to the native HTML input attribute 'id'|`String`|`false`|-|
|requiredField|Flag to indicate if the field should be required or not|`Boolean`|`false`|false|
|value|Allows component to return the user-updated input value.Value will be cast to specified type before being emitted back to parent.|—|`false`|-|
|erroredField|Flag to indicate if the field has an error associated with it|`Boolean`|`false`|false|
|lineUp|Lines up the input label to a uniform position to be in line with other inputs<br>Note: if stackElements flag is set, this will have no effect.|`Boolean`|`false`|false|

<!-- @vuese:bit-input:props:end -->


## Events

<!-- @vuese:bit-input:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|input|-|-|

<!-- @vuese:bit-input:events:end -->


