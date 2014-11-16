'use strict()';

/**
 * Datepicker Controller
 * @namespace Controllers
 */
(function() {
  angular
    .module('exampleApp')
    .config(['datepickerConfig', 'datepickerPopupConfig', function (datepickerConfig, datepickerPopupConfig) {
      datepickerConfig.showWeeks = false;
      datepickerPopupConfig.showButtonBar = false;
    }])
    .controller('DatepickerCtrl', DatepickerCtrl);

    DatepickerCtrl.$inject = ['$scope', '$timeout', 'DateService'];

  function DatepickerCtrl($scope, $timeout, DateService) {
    var vm  = this; 
    vm.today = DateService.today();
    
    /**
     * Returns boolean if within our defined ranges
     * @param  {Date} date Any time stamp readable by Moment
     * @return {Bool}      
     */
    vm.customValidation = function(date) {
      date = moment(date);
      return (
        date.isValid() &&
        !date.isBefore(moment(), 'day') &&
        date.isBefore(moment().add(7, 'months')));
    };

    // Opens the dropdown
    // TODO: Make callable from $parent scope
    vm.open = function(opened) {

      // TODO Refactor
      if (opened === 'depart' && vm.openedArrive) {
        vm.openedArrive = false;
      }
      if (opened === 'arrive' && vm.openedDepart) {
        vm.openedDepart = false; 
      }
      
      vm[opened] = true;
    };
    
    // Never need to be reset, as they are static
    vm.arriveMinDate = moment().toDate();
    vm.departMaxDate = moment().add(6, 'months').toDate();

    // Set the depart min date and open depart date modal when arrive set
    $scope.$on('dateChanged', function(event, args) {
      console.log('On date changed!');
      var arrive = (args.dates.arrive) ? moment(args.dates.arrive) : null;
      var depart = (args.dates.depart) ? moment(args.dates.depart) : null;
      
      if (arrive) {
        // Reset the depart date if the arrive date is the same or later
        if (!arrive.isBefore(depart)) {
          args.dates.depart = null;
        }
        if (vm.customValidation(arrive)) {
          vm.departMinDate = moment(arrive).add(1, 'day').toDate();
          if (!depart) {
            vm.open('depart');
            // args.dates.depart = moment(arrive).add(1, 'day').format('MM/DD/YYYY');
          }
          // } else {
          // TODO Open Modal requesting valid dates on resolve
          // TODO Show invalidation while live
        }
      } else { 
        vm.departMinDate = moment(args.dates.arriveMinDate)
          .add(1, 'day').toDate();
      }
    });

    // TODO If either date not valid, throw error 

    // Set the Default placeholder
    vm.format = 'MM/dd/yyyy';
  }
})();