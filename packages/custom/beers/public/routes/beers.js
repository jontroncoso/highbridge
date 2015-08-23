'use strict';

angular.module('mean.beers').config(['$viewPathProvider',
  function($viewPathProvider) {
    $viewPathProvider.override('system/views/index.html', 'beers/views/index.html');
  }
]);
