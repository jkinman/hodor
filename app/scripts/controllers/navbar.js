'use strict';

angular.module('hodorApp')
	.controller('NavbarCtrl', function($scope, $location, Auth) {
		$scope.menu = [{
			'title': 'Home',
			'link': '/'
		}, {
			'title': 'Account',
			'link': '/settings'
		}, {
			'title': 'Shirts',
			'link': '/clothes'
		}];

		$scope.logout = function() {
			Auth.logout()
				.then(function() {
					$location.path('/login');
				});
		};

		$scope.isActive = function(route) {
			return route === $location.path();
		};
	});