Examples:

*Note: this example will not work unless vue-router is installed, and cannot be rendered with this documentation engine.
```md
<block-nav-list
    :list-items="[
      {'itemTitle': 'Home', 'linkPath': '#'}, 
      {'itemTitle': 'Quick Links', 'linkPath': '#', 'inlineItems':
        [
          {'itemTitle':'Apply', 'linkPath':'#'},
          {'itemTitle':'Check Status', 'linkPath':'#'}
        ]
      }, 
      {'itemTitle': 'Technician', 'linkPath': '#'}, 
      {'itemTitle': 'Service Center', 'linkPath': '#'}, 
      {'itemTitle': 'Profile', 'linkPath': '#'}]">
</block-nav-list>
```
