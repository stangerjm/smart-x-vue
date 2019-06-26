# bit-select

A dynamic select element that will render options based off of an array passed in

## Props

<!-- @vuese:bit-select:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|selectData|Data that will be rendered as the select options.|`Array`|`true`|-|
|labelText|Display text for the related input label|`String`|`true`|-|
|stackElements|Flag to have input and label stack horizontally if set to true|`Boolean`|`false`|false|
|erroredField|Flag to indicate if the field has an error associated with it|`Boolean`|`false`|false|
|requiredField|Flag to indicate if the field should be required or not|`Boolean`|`false`|false|
|lineUp|Lines up the input label to a uniform position to be in line with other inputs<br>Note: if stackElements flag is set, this will have no effect.|`Boolean`|`false`|false|

<!-- @vuese:bit-select:props:end -->


