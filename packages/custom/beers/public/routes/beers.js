'use strict';

angular.module('mean.beers').config(['$stateProvider', '$viewPathProvider',
  function($stateProvider, $viewPathProvider) {
    $viewPathProvider.override('system/views/index.html', 'beers/views/index.html');
  }
]);
