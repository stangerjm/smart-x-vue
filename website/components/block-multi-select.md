# block-multi-select

A component that renders two select elements that have a parent-child relationship.

## Props

<!-- @vuese:block-multi-select:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|optionsData|An array of objects that contains both the parent and child data. See object structure below.|`Array`|`false`||
|parentName|The title to display before the parent select element.|`String`|`true`|-|
|childName|The title to display before the child select element.|`String`|`true`|-|
|parentDisplayKey|The object key to use for displaying the parent information.|`String`|`true`|-|
|childDisplayKey|The object key to use for displaying the child information.|`String`|`true`|-|
|stackElements|Flag indicating if the elements should be rendered horizontally or vertically|`Boolean`|`false`|false|

<!-- @vuese:block-multi-select:props:end -->


