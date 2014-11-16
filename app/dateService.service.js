'use strict()';

(function() {
  angular
    .module('exampleApp')
    .factory('DateService', DateService);

    function DateService() {
      var dateServiceMethods = {
        validateDate: function(datestring) {
          if (!datestring) {
            // console.log('Not a datestring');
            return false;
          }
          var date = moment(datestring);
          if (!date.isValid()) {
            // console.log('Not a valid date');
            return false;
          }
          if (date.isBefore(moment(), 'day') && 
            !moment(date).isSame(moment().format('YYYY-MM-DD'))) {
            // console.log('Before today');
            return false;
          }
          if (date.isAfter(moment().add(6, 'months'))) {
            // console.log('In over six months');
            return false;
          }
          return true;
        },
        /**
         * If the dates are both valid, and arrive is before depart
         * @param  {Object} dateObject An object with .arrive and .depart as dates
         * @return {Bool}            Boolean
         */
        validateDates: function(dateObject) {
          return (dateServiceMethods.validateDate(dateObject.arrive) && 
            dateServiceMethods.validateDate(dateObject.depart) && 
            moment(dateObject.arrive).isBefore(dateObject.depart, 'day')) ? true : false;
        },
        today: function() {
          return moment().format('MM/DD/YYYY');
        },
      };
      
      return dateServiceMethods;
    }
})();