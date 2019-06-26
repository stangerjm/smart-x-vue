# block-table-body

## Props

<!-- @vuese:block-table-body:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|typedData|Typed data to be rendered in the table.|`Array`|`true`|-|
|dataKeys|Keys to the 'typedData' object|`Array`|`true`|-|
|defaultContext|Default context of the action container|`String`|`true`|-|
|includeActionContainer|Flag to optionally include the action container|`Boolean`|`false`|true|
|propsToLink|Object containing the properties that should be rendered as a link to another record.|`Object`|`false`|-|
|idKey|-|`String`|`false`|null|

<!-- @vuese:block-table-body:props:end -->


## Events

<!-- @vuese:block-table-body:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|elementResize|Emit to parent that a record has been expanded so parent can resize appropriately.|-|

<!-- @vuese:block-table-body:events:end -->


