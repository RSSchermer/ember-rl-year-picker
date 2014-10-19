# Ember-rl-year-picker

Ember year picker component.

## Demo

Demo avialable [here](http://rsschermer.github.io/ember-rl-year-picker/).

## Installation

```bash
npm install ember-rl-year-picker --save-dev
```

This addon does not automatically import a stylesheet into your application. Run the following command to generate a
stylesheet you can use as a base:

```bash
ember generate rl-picker-css
```

This will create a stylesheet at `app/styles/rl-picker/_rl-picker.css`. You can include this stylesheet into your
applications sass or less files.

## Usage

```handlebars
{{rl-year-picker year=yearOfBirth}}
```

Bind the year property to a property on your controller. Ember's two-way bindings will keep the value updated.

The following properties can be set to customize the year picker:

* `yearPlaceholderText` (default: 'Year'): the text displayed on the picker toggle button when the year value is null.
* `flatMode` (default: false): when set to true, only the picker is shown (see demo).
* `yearsPerPage` (default: 12): the number of years shown on a page.
* `decreaseButtonText` (default: '<'): the text on the decrease year button. Set for example to
  `"<i class='fa fa-chevron-left'></i>"` to work with Font Awesome.
* `increaseButtonText` (default: '>'): the text on the decrease year button. Set for example to
  `"<i class='fa fa-chevron-right'></i>"` to work with Font Awesome.
* `previousPageButtonText` (default: '<'): the text on the previous page button. Set for example to
  `"<i class='fa fa-chevron-left'></i>"` to work with Font Awesome.
* `nextPageButtonText` (default: '>'): : the text on the next page button. Set for example to
  `"<i class='fa fa-chevron-right'></i>"` to work with Font Awesome.

If you want to set different defaults for all year pickers in your application, extend the component and override the
defaults with your own:

```javascript
// app/components/rl-year-picker.js
import RlYearPickerComponent from 'ember-rl-year-picker/components/rl-year-picker';

export default RlYearPickerComponent.extend({
  decreaseButtonText: "<i class='fa fa-chevron-left'></i>",

  increaseButtonText: "<i class='fa fa-chevron-right'></i>",

  previousPageButtonText: "<i class='fa fa-chevron-left'></i>",

  nextPageButtonText: "<i class='fa fa-chevron-right'></i>"
});
```
