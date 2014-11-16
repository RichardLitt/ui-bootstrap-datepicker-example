'use strict()';

/**
 * View1 Controller
 * @namespace Controllers
 */
(function() {
  angular
    .module('exampleApp')
    .controller('View1', View1);

  View1.$inject = [
    'DateService',
    '$scope'
  ];

  /**
   * The main View1 controller
   * @memberOf Controllers
   * @namespace View1
   */
  function View1 (DateService, $scope) {
    var vm = this;
    console.log('In Controller View1');

    // Init
    vm.dates = {
      'arrive': null,
      'depart': null
    };

    // Deep watch the DatePicker. If dates are valid, use it.
    $scope.$watch(function() { return vm.dates; }, function(newVal, oldVal){
      if (newVal !== oldVal) {
        console.log('Broadcasting date changed!');
        $scope.$broadcast('dateChanged', {'dates': vm.dates});
      }
      if (DateService.validateDates(vm.dates)) {
          console.log('use $http to call the api');
      } else {
        if (vm.dates.arrive && vm.dates.depart) {
          console.log('These dates are invalid!', vm.dates);
        }
      }
    }, true);

  }
})();
