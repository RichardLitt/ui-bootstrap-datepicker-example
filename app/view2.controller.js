'use strict()';

/**
 * View2 Controller
 * @namespace Controllers
 */
(function() {
  angular
    .module('exampleApp')
    .controller('View2', View2);

  View2.$inject = [
    '$scope',
    'DateService'
  ];

  /**
   * The main View2 controller
   * @memberOf Controllers
   * @namespace View2
   */
  function View2 ($scope, DateService) {
    var vm = this;
    
    // Init
    vm.dates = {
      'arrive': null,
      'depart': null
    };

    // Deep watch the DatePicker. If dates are valid, use it.
    $scope.$watch(function() { return vm.dates; }, function(newVal, oldVal){
      if (newVal != oldVal) {
        console.log('Broadcasting date changed!');
        $scope.$broadcast('dateChanged', {'dates': newVal});
      }
      if (DateService.validateDates(vm.dates)) {
        if (vm.campgrounds) {
          console.log('Call the API with $http');
        }
      } else {
        if (vm.dates.arrive && vm.dates.depart) {
          console.log('These dates are invalid!', vm.dates);
        }
      }
    }, true);
    /* END block */
  }
})();