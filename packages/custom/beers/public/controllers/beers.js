'use strict';

angular.module('mean.beers', ["xeditable"]).run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
}).controller('BeersController', ['$rootScope', '$scope', '$http', '$filter', '$stateParams', '$location', 'Global', 'Beers', 'MeanUser', 'Circles',
  function($rootScope, $scope, $http, $filter, $stateParams, $location, Global, Beers, MeanUser, Circles) {

    $rootScope.$on('logout', function(){
      $scope.findBeer();
    });
    $scope.global = Global;
    $scope.beerTypes = [
      {value: 'ipa', text: 'I.P.A.'},
      {value: 'ale', text: 'Ale'},
      {value: 'lager', text: 'Lager'},
      {value: 'stout', text: 'Stout'},
      {value: 'porter', text: 'Porter'},
      {value: 'abbey', text: 'Abbey'}
    ];
    $scope.beers = [];

    $scope.hasAuthorization = function(beer) {
      if (!beer || !beer.user) return false;
      return MeanUser.isAdmin || beer.user._id === MeanUser.user._id;
    };

    $scope.showType = function(beer) {
      var selected = [];
      if(beer.beerType) {
        selected = $filter('filter')($scope.beerTypes, {value: beer.beerType});
      }
      return selected.length ? selected[0].text : 'Not set';
    };

    $scope.addBeer = function() {
      $scope.beer = {
        '_id': null,
        name: '',
        bar: '',
        beerType: '',
        alcohol: 0
      };
      $scope.beers.push($scope.beer);

    };
    $scope.drinkBeer = function(index) {
      var data = $scope.beers[index];
      console.log(data);
      if(!data._id)return;
      data.drinks.push(Date.now());
      $scope.saveBeer(data, index);
    };

    $scope.saveBeer = function(data, index) {
      var id = $scope.beers[index]._id;
      console.log('D: %o, I: %o', data._id, id);
      if(!id)
      {
        return $http.post('/api/beers', data).success(function(data){
          $scope.findBeer();
        });
      }
      data._id = id;
      return $http.put('/api/beers/' + id, data);
    };

    $scope.removeBeer = function(index) {
      var response;
      if($scope.beers[index]._id)response = $http.delete('/api/beers/' + $scope.beers[index]._id);
      $scope.beers.splice(index, 1);
      return response;
    };

    $scope.updateBeer = function(isValid) {
      if (isValid) {
        var beer = $scope.beer;
        if (!beer.updated) {
          beer.updated = [];
        }
        beer.updated.push(new Date().getTime());

        beer.$update(function() {
          $location.path('beers/' + beer._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.findBeer = function() {
      Beers.query(function(beers) {
        $scope.beers = beers;
      });
    };

    $scope.findOneBeer = function() {
      Beers.get({
        beerId: $stateParams.beerId
      }, function(beer) {
        $scope.beer = beer;
      });
    };
  }
]);