'use strict';

//Beers service used for beers REST endpoint
angular.module('mean.beers').factory('Beers', ['$resource',
  function($resource) {
    return $resource('api/beers/:beerId', {
      beerId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
