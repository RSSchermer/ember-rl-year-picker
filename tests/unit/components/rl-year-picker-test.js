import { test, moduleForComponent } from 'ember-qunit';
import startApp from '../../helpers/start-app';
import Ember from 'ember';

var App;

moduleForComponent('rl-year-picker', 'RlYearPickerComponent', {
  setup: function() {
    App = startApp();
  },

  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('does not show a picker when not in flatMode and not expanded', function (assert) {
  assert.equal(this.$().find('.picker').length, 0);
});

test('does show a picker when not in flatMode and expanded', function (assert) {
  var $component = this.$();

  $component.find('.picker-toggle-btn').click();

  Ember.run(function () {
    assert.equal($component.find('.picker').length, 1);
  });
});

test('does show a picker when in flatMode', function (assert) {
  var component = this.subject();
  var $component = this.$();

  Ember.run(function () {
    component.set('flatMode', true);
  });

  assert.equal($component.find('.picker').length, 1);
});

test('closes the picker when the toggle button is clicked', function (assert) {
  var component = this.subject();
  var $component = this.$();

  Ember.run(function () {
    component.set('dropdownExpanded', true);
  });

  assert.equal($component.find('.picker').length, 1);

  $component.find('.picker-toggle-btn').click();

  assert.equal($component.find('.picker').length, 0);
});

test('closes the picker when clicking outside', function (assert) {
  var component = this.subject();
  var $component = this.$();

  Ember.run(function () {
    component.set('dropdownExpanded', true);
  });

  assert.equal($component.find('.picker').length, 1);

  $component.parent().append('<div id="clickout-test-element"></div>');

  Ember.run.later(function () {
    $component.parent().find('#clickout-test-element').click();

    Ember.run.later(function () {
      assert.equal($component.find('.picker').length, 0);
    }, 2);
  }, 2);
});

test('decrease year button decreases the year by 1', function (assert) {
  var component = this.subject();

  Ember.run(function () {
    component.set('year', 2000);
  });

  this.$().find('.decrease-btn').click();

  assert.equal(component.get('year'), 1999);
});

test('increase year button increases the year by 1', function (assert) {
  var component = this.subject();

  Ember.run(function () {
    component.set('year', 2000);
  });

  this.$().find('.increase-btn').click();

  assert.equal(component.get('year'), 2001);
});

test('the current year is shown as the active year', function (assert) {
  var component = this.subject();

  Ember.run(function () {
    component.setProperties({ 'year': 2000, 'flatMode': true, 'yearsPerPage': 11 });
  });

  assert.equal(this.$().find('li.active').text().trim(), '2000');
});

test('the previous page shows the 11 preceding years when yearsPerPage is 11', function (assert) {
  var component = this.subject();

  Ember.run(function () {
    component.setProperties({ 'year': 2000, 'flatMode': true, 'yearsPerPage': 11 });
  });

  assert.equal(this.$().find('li').first().text().trim(), '1995');

  this.$().find('.previous-page-btn').click();

  assert.equal(this.$().find('li').last().text().trim(), '1994');
  assert.equal(this.$().find('li').first().text().trim(), '1984');
});

test('the next page shows the 11 subsequent years when yearsPerPage is 11', function (assert) {
  var component = this.subject();

  Ember.run(function () {
    component.setProperties({ 'year': 2000, 'flatMode': true, 'yearsPerPage': 11 });
  });

  assert.equal(this.$().find('li').last().text().trim(), '2005');

  this.$().find('.next-page-btn').click();

  assert.equal(this.$().find('li').first().text().trim(), '2006');
  assert.equal(this.$().find('li').last().text().trim(), '2016');
});

test('a year is can not be selected when it is smaller than the minYear specified', function (assert) {
  var component = this.subject();

  Ember.run(function () {
    component.setProperties({ 'year': 2000, 'flatMode': true, 'minYear': 1998 });
  });

  this.$().find('li:contains("1997")').click();

  assert.equal(component.get('year'), 2000);
});

test('the decrease year button is disabled when the current year <= the minYear specified', function (assert) {
  var component = this.subject();

  Ember.run(function () {
    component.setProperties({ 'year': 1998, 'minYear': 1998 });
  });

  this.$().find('.decrease-btn').click();

  assert.equal(component.get('year'), 1998);
});

test('the previous page button is disabled when the last year on the previous page < the minYear specified', function (assert) {
  var component = this.subject();

  Ember.run(function () {
    component.setProperties({ 'year': 2000, 'flatMode': true, 'minYear': 1995, 'yearsPerPage': 11 });
  });

  this.$().find('.previous-page-btn').click();

  assert.equal(this.$().find('li').first().text().trim(), '1995');
  assert.equal(this.$().find('li').last().text().trim(), '2005');
});

test('a year is can not be selected when it is greater than the maxYear specified', function (assert) {
  var component = this.subject();

  Ember.run(function () {
    component.setProperties({ 'year': 2000, 'flatMode': true, 'maxYear': 2002 });
  });

  this.$().find('li:contains("2003")').click();

  assert.equal(component.get('year'), 2000);
});

test('the increase year button is disabled when the current year >= the maxYear specified', function (assert) {
  var component = this.subject();

  Ember.run(function () {
    component.setProperties({ 'year': 1998, 'maxYear': 1998 });
  });

  this.$().find('.increase-btn').click();

  assert.equal(component.get('year'), 1998);
});

test('the next page button is disabled when the first year on the previous page > the maxYear specified', function (assert) {
  var component = this.subject();

  Ember.run(function () {
    component.setProperties({ 'year': 2000, 'flatMode': true, 'maxYear': 2005, 'yearsPerPage': 11 });
  });

  this.$().find('.next-page-btn').click();

  assert.equal(this.$().find('li').first().text().trim(), '1995');
  assert.equal(this.$().find('li').last().text().trim(), '2005');
});
