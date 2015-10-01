'use strict';

/**
 * @ngdoc overview
 * @name mydearnest
 *
 * @description
 *
 * MWS BaseModule
 */
angular.module('mydearnest', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ui.router',
	'ui.bootstrap'
])
	.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

		$urlRouterProvider
			.otherwise('/');

		$locationProvider.html5Mode(true);
	});
