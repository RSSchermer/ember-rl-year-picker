import Ember from 'ember';
import DropdownComponentMixin from 'ember-rl-dropdown/mixins/rl-dropdown-component';

export default Ember.Component.extend(DropdownComponentMixin, {
  classNames: ['rl-year-picker', 'rl-picker'],

  classNameBindings: ['dropdownExpanded:expanded'],

  year: null,

  minYear: null,

  yearPlaceholderText: 'Year',

  flatMode: false,

  yearsPerPage: 12,

  decreaseButtonText: '<',

  increaseButtonText: '>',

  previousPageButtonText: '<',

  nextPageButtonText: '>',

  currentPage: 0,

  clickOutEventNamespace: 'rl-year-picker',

  pickerVisible: Ember.computed('flatMode', 'dropdownExpanded', function () {
    return this.get('flatMode') || this.get('dropdownExpanded');
  }),

  decreaseYearButtonDisabled: Ember.computed('year', 'minYear', function () {
    var year = this.get('year') || new Date().getFullYear() - 1;

    return year <= this.get('minYear');
  }),

  increaseYearButtonDisabled: Ember.computed('year', 'maxYear', function () {
    var year = this.get('year') || new Date().getFullYear() - 1;

    return year >= this.get('maxYear');
  }),

  yearsOnPage: Ember.computed('year', 'currentPage', 'yearsPerPage', 'minYear', 'maxYear', function () {
    var yearsPerPage = this.get('yearsPerPage');
    var currentYear = this.get('year') || new Date().getFullYear();
    var startingYear = currentYear - Math.floor(yearsPerPage / 2) + this.get('currentPage') * yearsPerPage;
    var yearsOnPage = [];
    var minYear = this.get('minYear');
    var maxYear = this.get('maxYear');

    for (var i = 0; i < yearsPerPage; i++) {
      var year = startingYear + i;

      yearsOnPage.push({
        year: year,

        isActive: year === currentYear,

        outOfRange: (minYear !== null && year < minYear) || (maxYear !== null && year > maxYear)
      });
    }

    return yearsOnPage;
  }),

  previousPageButtonDisabled: Ember.computed('yearsOnPage', 'minYear', function () {
    return Ember.A(this.get('yearsOnPage')).get('firstObject.year') <= this.get('minYear');
  }),

  nextPageButtonDisabled: Ember.computed('yearsOnPage', 'maxYear', function () {
    return Ember.A(this.get('yearsOnPage')).get('lastObject.year') >= this.get('maxYear');
  }),

  actions: {
    decreaseYear: function () {
      if (!this.get('decreaseYearButtonDisabled')) {
        if (!this.get('year')) {
          this.set('year', new Date().getFullYear() - 1);
        } else {
          this.decrementProperty('year');
        }

        this.sendAction('pickedYear', this.get('year'));
      }
    },

    increaseYear: function () {
      if (!this.get('increaseYearButtonDisabled')) {
        if (!this.get('year')) {
          this.set('year', new Date().getFullYear() + 1);
        } else {
          this.incrementProperty('year');
        }

        this.sendAction('pickedYear', this.get('year'));
      }
    },

    previousPage: function () {
      if (!this.get('previousPageButtonDisabled')) {
        this.decrementProperty('currentPage');
      }
    },

    nextPage: function () {
      if (!this.get('nextPageButtonDisabled')) {
        this.incrementProperty('currentPage');
      }
    },

    pickedYear: function (year) {
      var minYear = this.get('minYear');
      var maxYear = this.get('maxYear');

      if (!((minYear !== null && year < minYear) || (maxYear !== null && year > maxYear))) {
        this.setProperties({ 'year': year, 'dropdownExpanded': false });
        this.sendAction('pickedYear', year);
      }
    }
  },

  resetCurrentPage: Ember.on('didInsertElement', Ember.observer('year', function () {
    this.set('currentPage', 0);
  }))
});
