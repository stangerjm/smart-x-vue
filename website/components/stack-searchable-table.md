# stack-searchable-table

## Props

<!-- @vuese:stack-searchable-table:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|resultsPerPage|Number of results that should be displayed for each page|`Number`|`false`|10|
|onSearch|Function to be called when a search happensNote: This function will recieve an object with two properties:1.) searchModel: the model that was used in the search2.) resultData: the results of the search|`Function`|`false`|() => {}|
|tableData|The data that will render as a table.|`Array`|`true`|-|
|defaultContext|The default context passed into the action container component|`String`|`true`|-|
|unsearchableHeadings|An array of key names that will render eachheading associated with the key as literal text and not a searchable link.|`Array`|`false`||
|includeActionContainer|Flag to optionally render the action container|`Boolean`|`false`|false|
|ignoreFields|List of fields to ignore|`Array`|`false`||
|propsToLink|Properties that should be rendered as links to another record rather than a value.|`Object`|`false`|-|
|tableEmptyMessage|Optional message to configure what the table renders when table data is empty.|`String`|`false`|'No data found.'|
|idKey|Optional way to indicate an alternative id key for a record|`String`|`false`|null|
|actionColumnName|Optional name of the action column|`String`|`false`|'Actions'|
|searchModel|Model that should be used to render the search fields.|`Object`|`true`|-|
|onReset|-|`Function`|`false`|default() {}|
|defaultFilter|-|`String`|`false`|-|

<!-- @vuese:stack-searchable-table:props:end -->


## Slots

<!-- @vuese:stack-searchable-table:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|search-action|Preserve action slot|-|

<!-- @vuese:stack-searchable-table:slots:end -->


