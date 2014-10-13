# Ember-rl-year-picker

Ember year picker component.

## Demo

Demo avialable [here](http://rsschermer.github.io/ember-rl-year-picker/).

## Installation

```bash
npm install ember-rl-year-picker --save-dev
```

This addon does not automatically import its stylesheet into your application. There is a default stylesheet in
[app/styles/rl-year-picker.css](app/styles/rl-year-picker.css) you can import into your applications scss or less file.
You can also opt for creating your own stylesheet (and use
[app/styles/rl-year-picker.css](app/styles/rl-year-picker.css) as inspiration).

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
