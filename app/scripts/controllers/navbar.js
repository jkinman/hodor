'use strict';

angular.module('hodorApp')
	.controller('NavbarCtrl', function($scope, $location, Auth) {
		$scope.menu = [{
			'title': 'Home',
			'link': '/'
    // }, {
    //  'title': 'Account',
    //  'link': '/settings'
  }, {
			'title': 'Shirts',
			'link': '/clothes'
		}];
		var lastHodor = '';
		$scope.logout = function() {
			Auth.logout()
				.then(function() {
					$location.path('/login');
				});
		};

		$scope.hodorize = function() {
			// debugger;
			lastHodor = this.item.title;
			this.item.title = 'HODOR';
			//$(e).innerHTML = 'HODOR';

		};

		$scope.unhodorize = function() {
			// debugger;
			// lastHodor = this.item.title;
			this.item.title = lastHodor;
			//$(e).innerHTML = 'HODOR';

		};

		$scope.isActive = function(route) {
			return route === $location.path();
		};
	});