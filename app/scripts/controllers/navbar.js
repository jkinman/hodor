'use strict';

angular.module('hodorApp')
	.controller('NavbarCtrl', function($scope, $location, Auth) {
		$scope.menu = [
			// {
			// 'title': 'Home',
			// 'link': '/'
			// }, {
			//  'title': 'Account',
			//  'link': '/settings'
			// }, 
			{
				'title': 'Shirts',
				'link': '/clothes'
			}
		];
		var lastHodor = '';
		$scope.logout = function() {
			Auth.logout()
				.then(function() {
					$location.path('/login');
				});
		};

		$scope.hodorize = function(e) {
			lastHodor = e.currentTarget.innerHTML;
			e.currentTarget.innerHTML = 'HODOR';
		};

		$scope.unhodorize = function(e) {
			e.currentTarget.innerHTML = lastHodor;
		};

		$scope.isActive = function(route) {
			return route === $location.path();
		};
	});