'use strict';

angular.module('mean.beers', ["xeditable"]).controller('BeersController', ['$scope', '$http', '$filter', '$stateParams', '$location', 'Global', 'Beers', 'MeanUser', 'Circles',
  function($scope, $http, $filter, $stateParams, $location, Global, Beers, MeanUser, Circles) {
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


    //$scope.availableCircles = [];
    //
    //Circles.mine(function(acl) {
    //  $scope.availableCircles = acl.allowed;
    //  $scope.allDescendants = acl.descendants;
    //});
    //
    //$scope.showDescendants = function(permission) {
    //  var temp = $('.ui-select-container .btn-primary').text().split(' ');
    //  temp.shift(); //remove close icon
    //  var selected = temp.join(' ');
    //  $scope.descendants = $scope.allDescendants[selected];
    //};
    //
    //$scope.selectPermission = function() {
    //  $scope.descendants = [];
    //};

    $scope.addBeer = function() {
      $scope.beer = {
        '_id': null,
        name: '',
        bar: '',
        beerType: '',
        alcohol: 0,
      };
      $scope.beers.push($scope.beer);
    };

    $scope.saveBeer = function(data, index) {
      var id = $scope.beers[index]._id;
      data._id = id;
      if(!id)
      {
        return $http.post('/api/beers', data).success(function(data){
          $scope.findBeer();
        });
      }
      return $http.put('/api/beers/' + id, data);
    };

    $scope.removeBeer = function(index) {
      var response =  $http.delete('/api/beers/' + $scope.beers[index]._id);
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