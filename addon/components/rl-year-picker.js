import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['rl-year-picker', 'rl-picker'],

  classNameBindings: ['isExpanded:expanded'],

  year: null,

  yearPlaceholderText: 'Year',

  flatMode: false,

  yearsPerPage: 12,

  decreaseButtonText: '<',

  increaseButtonText: '>',

  previousPageButtonText: '<',

  nextPageButtonText: '>',

  currentPage: 0,

  isExpanded: false,

  pickerVisible: function () {
    return this.get('flatMode') || this.get('isExpanded');
  }.property('flatMode', 'isExpanded'),

  yearsOnPage: function () {
    var yearsPerPage = this.get('yearsPerPage');
    var currentYear = this.get('year') || new Date().getFullYear();
    var startingYear = currentYear - Math.floor(yearsPerPage / 2) + this.get('currentPage') * yearsPerPage;
    var yearsOnPage = [];

    for (var i = 0; i < yearsPerPage; i++) {
      var year = startingYear + i;

      yearsOnPage.push({
        year: year,

        isActive: year === currentYear
      });
    }

    return yearsOnPage;
  }.property('year', 'currentPage', 'yearsPerPage'),

  actions: {
    decreaseYear: function () {
      if (!this.get('year')) {
        this.set('year', new Date().getFullYear() - 1);
      } else {
        this.set('year', this.get('year') - 1);
      }

      this.sendAction('pickedYear', this.get('year'));
    },

    increaseYear: function () {
      if (!this.get('year')) {
        this.set('year', new Date().getFullYear() + 1);
      } else {
        this.set('year', this.get('year') + 1);
      }

      this.sendAction('pickedYear', this.get('year'));
    },

    toggleIsExpanded: function () {
      this.set('isExpanded', !this.get('isExpanded'));
    },

    previousPage: function () {
      this.set('currentPage', this.get('currentPage') - 1);
    },

    nextPage: function () {
      this.set('currentPage', this.get('currentPage') + 1);
    },

    pickedYear: function (year) {
      this.set('year', year);
      this.set('isExpanded', false);
      this.sendAction('pickedYear', year);
    }
  },

  resetCurrentPage: function () {
    this.set('currentPage', 0);
  }.observes('year').on('didInsertElement'),

  clickoutHandler: function (event) {
    if(event.data.component.get('isExpanded') && !Ember.$(event.target).closest('.rl-year-picker .picker').length &&
      !Ember.$(event.target).closest('.rl-year-picker .picker-toggle-btn').length
    ) {
      event.data.component.set('isExpanded', false);
    }
  },

  manageClickoutEvent: function () {
    if (this.get('isExpanded')) {
      Ember.$(document).bind('click', {component: this}, this.clickoutHandler);
    } else {
      Ember.$(document).unbind('click', this.clickoutHandler);
    }
  }.observes('isExpanded').on('didInsertElement'),

  unbindClickoutEvent: function () {
    Ember.$(document).unbind('click', this.clickoutHandler);
  }.on('willDestroyElement')
});
