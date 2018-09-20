Examples:

```vue
<smart-accordion title="Expand">
    <h2>You can put anything in here!</h2>
</smart-accordion>
```

```vue
<smart-accordion title="Expand and Resize me!">
    <h2>I will be flexible.</h2>
    <h2>I will be mobile responsive.</h2>
    <h2>I will resize to fit the width of the screen.</h2>
    <h2>I will allow any content to be rendered as a child.</h2>
</smart-accordion>
```

*Note: this component disallows children that have no height. HTML elements such as `<br>` tags will cause the component
to resize incorrectly and CSS should be used instead.