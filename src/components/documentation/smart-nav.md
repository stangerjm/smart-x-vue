Examples:

```vue
<smart-nav
    nav-title="Admin Console"
    usr="JMST225"
    :nav-items="[
                  {'itemTitle': 'Home', 'linkPath': '#'}, 
                  {'itemTitle': 'WSP', 'linkPath': '#'}, 
                  {'itemTitle': 'More', 'linkPath': '#', 'inlineItems': [{'itemTitle':'Be a Trooper', 'linkPath':'#'}, {'itemTitle':'Media', 'linkPath':'#'}]}, 
                  {'itemTitle': 'Links', 'linkPath': '#', 'inlineItems': [{'itemTitle':'breathtest', 'linkPath':'#'}, {'itemTitle':'wsp.wa.gov', 'linkPath':'#'}, {'itemTitle':'Google', 'linkPath':'#'}]}, 
                  {'itemTitle': 'Contact', 'linkPath': '#'}
                 ]">
</smart-nav>
```

```html
<smart-nav
    nav-title="Admin Console"
    usr="JMST225"
    :nav-items="navItems">
</smart-nav>
```

And the JSON:

```json
{
  "navItems": 
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