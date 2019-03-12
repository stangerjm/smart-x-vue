Examples: <br>
*Note: This component requires vue-router to be installed. As such, the links below will not work.

The example below will render links with these paths:

Details path: /Technician/Details/1

Edit Path: /County/Edit/1

Delete Path: /Region/Delete/1
```vue
<block-action-container
    default-ctx="Region"
    item-id="1"
    edit-ctx="County"
    details-ctx="Technician">
</block-action-container>
```