Examples:

*Note: This component is the basis for the <a href="#blocktablebody">block-table-body</a> and <a href="#smarttable">smart-table</a> components. On its own, it is primarily
concerned with rendering dates correctly, boolean values as checkboxes, etc.

```vue
<table>
  <tr>
    <th>First Name</th>
    <th>Age</th>
    <th>Birthday</th>
    <th>Is Employee</th>
  </tr>
  <tr>
    <bit-table-cell :cell-value="{ type: 'String', value: 'James' }"
                    cell-title="First Name"
                    is-table-key>
    </bit-table-cell>
    <bit-table-cell :cell-value="{ type: 'Number', value: 25 }"
                    cell-title="Age"
                    is-table-key>
    </bit-table-cell>
    <bit-table-cell :cell-value="{ type: 'Date', value: new Date('09/11/1993') }"
                    cell-title="Birthday"
                    is-table-key>
    </bit-table-cell>
    <bit-table-cell :cell-value="{ type: 'Boolean', value: true }"
                    cell-title="IsEmployee"
                    is-table-key>
    </bit-table-cell>
  </tr>
</table>
```