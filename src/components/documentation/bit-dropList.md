_This component cannot be displayed if it is on its own. It is hidden by default and only will be triggered by hovering over a parent item.
For an example, see <a href="#blocknavlist">block-navList</a> and hover over one of the items with a drop arrow._

Examples:

HTML Markup: 
    *note that "dropItems" is a JSON array

```md
<bit-drop-list :drop-items="dropItems"></bit-drop-list>
```

And the JSON:

```json
{
  "dropItems": [
    {
      "itemTitle": "Home", 
      "linkPath": "/"
    },
    {
          "itemTitle": "Region", 
          "linkPath": "/Region"
    },
    {
          "itemTitle": "About", 
          "linkPath": "/About"
    }
  ]
}
```