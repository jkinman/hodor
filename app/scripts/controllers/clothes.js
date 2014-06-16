'use strict';

angular.module('hodorApp')
	.controller('ClothesCtrl', function($scope, $http, $routeParams) {
		$scope.$routeParams = $routeParams;
		$http.get('/api/gear').success(function(obj) {
			$scope.gear = obj;
		});

		$scope.addToCart = function(form) {
			console.log(form);
			console.log($scope.product);
			// ecom.purchase($scope.product);
		};
	});