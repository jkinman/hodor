'use strict';

angular.module('hodorApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngRoute'
])
	.config(function($routeProvider, $locationProvider, $httpProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'partials/main',
				controller: 'MainCtrl'
			})
			.when('/login', {
				templateUrl: 'partials/login',
				controller: 'LoginCtrl'
			})
			.when('/signup', {
				templateUrl: 'partials/signup',
				controller: 'SignupCtrl'
			})
			.when('/settings', {
				templateUrl: 'partials/settings',
				controller: 'SettingsCtrl',
				authenticate: true
			})
			.when('/clothes', {
				templateUrl: 'partials/clothes',
				controller: 'ClothesCtrl'
			})
			.when('/clothes/:id', {
				templateUrl: 'partials/product',
				controller: 'ClothesCtrl'
			})
			.when('/auth/facebook', {
				redirectTo: 'auth/facebook'
			})
			.otherwise({
				redirectTo: '/'
			});

		$locationProvider.html5Mode(true);

		var images = ['HH-BG1.png', 'HH-BG2.png', 'HH-BG3.png', 'HH-BG4.png'];

		$('body').css({
			'background-image': 'url(images/' + images[Math.floor(Math.random() * images.length)] + ')'
		});

		// Intercept 401s and redirect you to login
		$httpProvider.interceptors.push(['$q', '$location',
			function($q, $location) {
				return {
					'responseError': function(response) {
						if (response.status === 401) {
							$location.path('/login');
							return $q.reject(response);
						} else {
							return $q.reject(response);
						}
					}
				};
			}
		]);
	})
	.run(function($rootScope, $location, Auth) {

		// Redirect to login if route requires auth and you're not logged in
		$rootScope.$on('$routeChangeStart', function(event, next) {

			if (next.authenticate && !Auth.isLoggedIn()) {
				$location.path('/login');
			}
		});
	});