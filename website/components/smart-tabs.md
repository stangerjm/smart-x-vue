# smart-tabs

## Props

<!-- @vuese:smart-tabs:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|tabs|List of tabs names that should be rendered|`Array`|`true`|-|
|currentTab|Optionally allow the outside to set the current tab|`Number`|`false`|1|

<!-- @vuese:smart-tabs:props:end -->


## Slots

<!-- @vuese:smart-tabs:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|default|@slot Default slot which contains content shared between all tabs|-|
|tab|Render a slot corresponding to each tab above.
        Only render if the current tab is the active tab|-|

<!-- @vuese:smart-tabs:slots:end -->


