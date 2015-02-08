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

test('does not show a picker when not in flatMode and not expanded', function () {
  var $component = this.append();

  equal($component.find('.picker').length, 0);
});

test('does show a picker when not in flatMode and expanded', function () {
  var $component = this.append();

  click('.picker-toggle-btn');

  andThen(function () {
    equal($component.find('.picker').length, 1);
  });
});

test('does show a picker when in flatMode', function () {
  var component = this.subject();
  var $component = this.append();

  Ember.run(function(){
    component.set('flatMode', true);
  });

  equal($component.find('.picker').length, 1);
});

test('closes the picker when the toggle button is clicked', function () {
  var component = this.subject();
  var $component = this.append();

  Ember.run(function(){
    component.set('dropdownExpanded', true);
  });

  equal($component.find('.picker').length, 1);

  click('.picker-toggle-btn');

  andThen(function () {
    equal($component.find('.picker').length, 0);
  });
});

test('closes the picker when clicking outside', function () {
  var component = this.subject();
  var $component = this.append();

  Ember.run(function(){
    component.set('dropdownExpanded', true);
  });

  equal($component.find('.picker').length, 1);

  Ember.$($component).parent().append('<div id="clickout-test-element"></div>');

  click('#clickout-test-element');

  andThen(function () {
    equal($component.find('.picker').length, 0);
  });
});

test('decrease year button decreases the year by 1', function () {
  var component = this.subject();
  var $component = this.append();

  Ember.run(function(){
    component.set('year', 2000);
  });

  click('.decrease-btn');

  andThen(function () {
    equal(component.get('year'), 1999);
  });
});

test('increase year button increases the year by 1', function () {
  var component = this.subject();
  var $component = this.append();

  Ember.run(function(){
    component.set('year', 2000);
  });

  click('.increase-btn');

  andThen(function () {
    equal(component.get('year'), 2001);
  });
});

test('the current year is shown as the active year', function () {
  var component = this.subject();
  var $component = this.append();

  Ember.run(function(){
    component.setProperties({ 'year': 2000, 'flatMode': true, 'yearsPerPage': 11 });
  });

  andThen(function () {
    equal(find('li.active').text().trim(), '2000');
  });
});

test('the previous page shows the 11 preceding years when yearsPerPage is 11', function () {
  var component = this.subject();
  var $component = this.append();

  Ember.run(function(){
    component.setProperties({ 'year': 2000, 'flatMode': true, 'yearsPerPage': 11 });
  });

  andThen(function () {
    equal(find('li').first().text().trim(), '1995');
  });

  click('.previous-page-btn');

  andThen(function () {
    equal(find('li').last().text().trim(), '1994');
    equal(find('li').first().text().trim(), '1984');
  });
});

test('the next page shows the 11 subsequent years when yearsPerPage is 11', function () {
  var component = this.subject();
  var $component = this.append();

  Ember.run(function(){
    component.setProperties({ 'year': 2000, 'flatMode': true, 'yearsPerPage': 11 });
  });

  andThen(function () {
    equal(find('li').last().text().trim(), '2005');
  });

  click('.next-page-btn');

  andThen(function () {
    equal(find('li').first().text().trim(), '2006');
    equal(find('li').last().text().trim(), '2016');
  });
});

test('a year is can not be selected when it is smaller than the minYear specified', function () {
  var component = this.subject();
  var $component = this.append();

  Ember.run(function(){
    component.setProperties({ 'year': 2000, 'flatMode': true, 'minYear': 1998 });
  });

  click('li:contains("1997")');

  andThen(function () {
    equal(component.get('year'), 2000);
  });
});

test('the decrease year button is disabled when the current year <= the minYear specified', function () {
  var component = this.subject();
  var $component = this.append();

  Ember.run(function(){
    component.setProperties({ 'year': 1998, 'minYear': 1998 });
  });

  click('.decrease-btn');

  andThen(function () {
    equal(component.get('year'), 1998);
  });
});

test('the previous page button is disabled when the last year on the previous page < the minYear specified', function () {
  var component = this.subject();
  var $component = this.append();

  Ember.run(function(){
    component.setProperties({ 'year': 2000, 'flatMode': true, 'minYear': 1995, 'yearsPerPage': 11 });
  });

  click('.previous-page-btn');

  andThen(function () {
    equal(find('li').first().text().trim(), '1995');
    equal(find('li').last().text().trim(), '2005');
  });
});

test('a year is can not be selected when it is greater than the maxYear specified', function () {
  var component = this.subject();
  var $component = this.append();

  Ember.run(function(){
    component.setProperties({ 'year': 2000, 'flatMode': true, 'maxYear': 2002 });
  });

  click('li:contains("2003")');

  andThen(function () {
    equal(component.get('year'), 2000);
  });
});

test('the increase year button is disabled when the current year >= the maxYear specified', function () {
  var component = this.subject();
  var $component = this.append();

  Ember.run(function(){
    component.setProperties({ 'year': 1998, 'maxYear': 1998 });
  });

  click('.increase-btn');

  andThen(function () {
    equal(component.get('year'), 1998);
  });
});

test('the next page button is disabled when the first year on the previous page > the maxYear specified', function () {
  var component = this.subject();
  var $component = this.append();

  Ember.run(function(){
    component.setProperties({ 'year': 2000, 'flatMode': true, 'maxYear': 2005, 'yearsPerPage': 11 });
  });

  click('.next-page-btn');

  andThen(function () {
    equal(find('li').first().text().trim(), '1995');
    equal(find('li').last().text().trim(), '2005');
  });
});
