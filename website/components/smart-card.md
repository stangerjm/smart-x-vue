# smart-card

A component that renders a card with content, a title and description, and optional actions

## Props

<!-- @vuese:smart-card:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|cardTitle|Title of the card|`String`|`false`|-|
|cardDescription|Description of the card|`String`|`false`|-|
|expanded|Flag indicating that the starting state of the card should be expanded|`Boolean`|`false`|false|
|watchResize|Flag indicating that the content container should watch for resize|`Boolean`|`false`|false|
|allowExpand|Flag to optionally omit the expand functionality|`Boolean`|`false`|true|

<!-- @vuese:smart-card:props:end -->


## Slots

<!-- @vuese:smart-card:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|card-content|@slot The content for the card|-|
|card-actions|@slot Allows content to be passed into the actions container|-|

<!-- @vuese:smart-card:slots:end -->


