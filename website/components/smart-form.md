# smart-form

A component that renders a dynamic form based on a model.

## Props

<!-- @vuese:smart-form:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|onSubmit|Function to be executed on form submit.Takes an object that holds the submitted data as a parameter.|`Function`|`true`|-|
|formData|The model that the form should use as a template.Note: any properties containing arrays should only contain primitive values.|`Object` / `Array`|`false`|-|
|ignoreFields|Optional array of strings that represent properties that should be ignored.|`Array`|`false`||
|formTitle|A title that will display at the top of the form.|`String`|`false`|-|
|formMethod|Corresponds to the native HTML attribute 'method'|`String`|`false`|-|
|validationErrors|List of validation errors|`Array`|`false`||
|centerForm|Flag that will optionally center the form|`Boolean`|`false`|false|
|submitBtnSize|Size of the submit button. Accepts 'small', 'medium', or 'large'|`String`|`false`|'medium'|
|centerMessages|Allows error messages to be centered|`Boolean`|`false`|false|
|stackInputs|Allows inputs to be stacked|`Boolean`|`false`|true|
|lineUpInputs|Allows inputs to be lined up|`Boolean`|`false`|false|
|submitBtnText|Text for the submit button|`String`|`false`|'Submit'|

<!-- @vuese:smart-form:props:end -->


## Slots

<!-- @vuese:smart-form:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|form-buttons|@slot Placeholder for additional markup after
                 the submit button but before the loading spinner|-|
|form-end|@slot Placeholder for any additional markup after the form|-|

<!-- @vuese:smart-form:slots:end -->


