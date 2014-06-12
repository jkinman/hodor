'use strict';

angular.module('hodorApp')
  .controller('ClothesCtrl', function ($scope, $http) {
    $http.get('/api/gear').success(function( obj ) {
      $scope.gear = obj;
    });
  });
