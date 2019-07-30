# stack-searchable-table

## Props

<!-- @vuese:stack-searchable-table:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|resultsPerPage|Number of results that should be displayed for each page|`Number`|`false`|10|
|onSearch|Function to be called when a search happensNote: This function will recieve an object with two properties:1.) searchModel: the model that was used in the search2.) resultData: the results of the search|`Function`|`false`|() => {}|

<!-- @vuese:stack-searchable-table:props:end -->


## Slots

<!-- @vuese:stack-searchable-table:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|search-action|Preserve action slot|-|

<!-- @vuese:stack-searchable-table:slots:end -->


## MixIns

<!-- @vuese:stack-searchable-table:mixIns:start -->
|MixIn|
|---|
|propsMixin|

<!-- @vuese:stack-searchable-table:mixIns:end -->


