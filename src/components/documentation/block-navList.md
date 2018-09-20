Examples:

```vue
<block-nav-list
    :list-items="[
      {'itemTitle': 'Home', 'linkPath': '#'}, 
      {'itemTitle': 'WSP', 'linkPath': '#'}, 
      {'itemTitle': 'More', 'linkPath': '#', 'inlineItems': [{'itemTitle':'Be a Trooper', 'linkPath':'#'}, {'itemTitle':'Media', 'linkPath':'#'}]}, 
      {'itemTitle': 'Links', 'linkPath': '#', 'inlineItems': [{'itemTitle':'breathtest', 'linkPath':'#'}, {'itemTitle':'wsp.wa.gov', 'linkPath':'#'}, {'itemTitle':'Google', 'linkPath':'#'}]}, 
      {'itemTitle': 'Contact', 'linkPath': '#'}]">
</block-nav-list>
```

```html
<block-nav-list
    :list-items="navListItems">
</block-nav-list>
```

And the JSON:

```json
{
  "navListItems": 
    [
      {
        "itemTitle": "Home", 
        "linkPath": "#"
      }, 
      {
        "itemTitle": "WSP", 
        "linkPath": "#"
      }, 
      {
        "itemTitle": "More",
        "linkPath": "#",
        "inlineItems": 
          [
            {
              "itemTitle": "Be a Trooper",
               "linkPath": "#"
            }, 
            {
              "itemTitle": "Media",
              "linkPath": "#"
            }
          ]
      }, 
      {
        "itemTitle": "Links",
        "linkPath": "#", 
        "inlineItems": 
          [
            {
              "itemTitle": "breathtest", 
              "linkPath": "#"
            }, 
            {
              "itemTitle": "wsp.wa.gov",
              "linkPath": "#"
            }, 
            {
              "itemTitle": "Google",
               "linkPath": "#"
            }
          ]
      }, 
      {
        "itemTitle": "Contact",
         "linkPath": "#"
      }
    ]
}
```

*Note that unlike other components, the data for block-navList is not flexible. The JSON must keep the same structure AND
the keys must be the same as the above example in order for the data to render correctly.