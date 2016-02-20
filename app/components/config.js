(function() {
'use strict';
  var _tpls = 'components/';
  angular
    .module('proplan')
    .config(ConfigFunction);

  ConfigFunction.$inject = ['$stateProvider', '$urlRouterProvider'];
  function ConfigFunction($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.
      state('dashboard', {
        url: '/',
        controller: 'DashboardController',
        templateUrl: _tpls + 'dashboard/dashboard.html',
        controllerAs: 'vm'
      });
  }
})();