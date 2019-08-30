# smart-table

A component that renders a responsive table from a data-set.

## Props

<!-- @vuese:smart-table:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|tableData|The data that will render as a table.|`Array`|`true`|-|
|defaultContext|The default context passed into the action container component|`String`|`true`|-|
|unsearchableHeadings|An array of key names that will render eachheading associated with the key as literal text and not a searchable link.|`Array`|`false`||
|includeActionContainer|Flag to optionally render the action container|`Boolean`|`false`|false|
|ignoreFields|List of fields to ignore|`Array`|`false`||
|propsToLink|Properties that should be rendered as links to another record rather than a value.|`Object`|`false`|-|
|tableEmptyMessage|Optional message to configure what the table renders when table data is empty.|`String`|`false`|'No data found.'|
|idKey|Optional way to indicate an alternative id key for a record|`String`|`false`|null|
|onSort|Method to be called on sort that replaces the default sort method|`Function`|`false`|-|
|actionColumnName|Optional name of the action column|`String`|`false`|'Actions'|

<!-- @vuese:smart-table:props:end -->


