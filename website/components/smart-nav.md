# smart-nav

A component that renders a responsive navigation.

## Props

<!-- @vuese:smart-nav:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|navTitle|Title to display at the top of the navigation.|`String`|`true`|-|
|navItems|List of items to render in the navigation.|`Array`|`true`|-|
|usr|The current user's username.|`String`|`false`|-|
|onSignOut|The path attached to the sign out button|`Function`|`false`|() => {}|
|excludeLogout|Optionally excludes the logout button|`Boolean`|`false`|false|

<!-- @vuese:smart-nav:props:end -->


