(function() {
'use strict';

  angular
    .module('proplan')
    .run(RunFunction);

  RunFunction.$inject = ['$cookies', '$state'];
  function RunFunction($cookies, $state) {
    $state.go('dashboard');
  }
})();