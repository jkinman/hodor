'use strict';

angular.module('hodorApp')
	.controller('ClothesCtrl', function($scope, $http, $routeParams, $rootScope, $cookieStore) {
		$scope.$routeParams = $routeParams;
		$http.get('/api/gear').success(function(obj) {
			$scope.gear = obj;
		});

		$scope.addToCart = function(form) {

			// validate data

			// add item to cart cookies and cart var
			$rootScope.currentUser = $cookieStore.get('user');

			console.log(form);
			console.log($scope.product);
			// ecom.purchase($scope.product);
		};
	});