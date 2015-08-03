#Ember-rl-year-picker changelog

## 0.2.0

Upgrades templates syntax to the new HTML-bars syntax, which means as of this version Ember 1.13 or higher is required.

##0.1.0

Added `minYear` and `maxYear` options for constraining the years that can be selected by the user.
Some css changes may be required if you want to use this functionality. Years that are not within the
valid range get an `out-of-range` class added. You may want to rerun the css generator:

```bash
ember generate rl-picker-css
```
