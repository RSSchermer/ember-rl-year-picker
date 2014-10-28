import Ember from 'ember';
import DropdownComponentMixin from 'ember-rl-dropdown/mixins/rl-dropdown-component';

export default Ember.Component.extend(DropdownComponentMixin, {
  classNames: ['rl-year-picker', 'rl-picker'],

  classNameBindings: ['dropdownExpanded:expanded'],

  year: null,

  yearPlaceholderText: 'Year',

  flatMode: false,

  yearsPerPage: 12,

  decreaseButtonText: '<',

  increaseButtonText: '>',

  previousPageButtonText: '<',

  nextPageButtonText: '>',

  currentPage: 0,

  clickOutEventNamespace: 'rl-year-picker',

  pickerVisible: function () {
    return this.get('flatMode') || this.get('dropdownExpanded');
  }.property('flatMode', 'dropdownExpanded'),

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
        this.decrementProperty('year');
      }

      this.sendAction('pickedYear', this.get('year'));
    },

    increaseYear: function () {
      if (!this.get('year')) {
        this.set('year', new Date().getFullYear() + 1);
      } else {
        this.incrementProperty('year');
      }

      this.sendAction('pickedYear', this.get('year'));
    },

    previousPage: function () {
      this.decrementProperty('currentPage');
    },

    nextPage: function () {
      this.incrementProperty('currentPage');
    },

    pickedYear: function (year) {
      this.setProperties({ 'year': year, 'dropdownExpanded': false });
      this.sendAction('pickedYear', year);
    }
  },

  resetCurrentPage: function () {
    this.set('currentPage', 0);
  }.observes('year').on('didInsertElement')
});
