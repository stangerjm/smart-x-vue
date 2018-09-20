_This component is not displayed if it is on its own. For an example, see <a href="#blocknavlist">block-navList</a>
 and hover over one of the items with a drop arrow._

Examples:

HTML Markup: 
    *note that "dropItems" is a JSON array
```html
<bit-drop-list 
    :drop-items="dropItems">
</bit-drop-list>
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