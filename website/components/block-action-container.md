# block-action-container

A component that renders an action container to be part of a table or other similar structure. Contains action links that handle details, edit, and delete actions.

## Props

<!-- @vuese:block-action-container:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|itemId|Id of the corresponding item.|—|`true`|-|
|defaultContext|-|`String`|`false`|'#'|

<!-- @vuese:block-action-container:props:end -->


## Slots

<!-- @vuese:block-action-container:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|actionContainer|Scoped slot that exposes "itemId" and "getActionPath"|FALLBACK CONTENT|

<!-- @vuese:block-action-container:slots:end -->


