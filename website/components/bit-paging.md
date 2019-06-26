# bit-paging

A paging component that manages the index of a paged list of data

## Props

<!-- @vuese:bit-paging:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|pagedDataLength|Length of the paged data|`Number`|`true`|-|
|value|Allows v-model to be passed in and updated.<br>Note: indices outside of the bounds of the pagedDataLength passed in or below 0 will beconverted to a valid index and emitted back|`Number`|`false`|-|

<!-- @vuese:bit-paging:props:end -->


## Events

<!-- @vuese:bit-paging:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|input|-|-|

<!-- @vuese:bit-paging:events:end -->


