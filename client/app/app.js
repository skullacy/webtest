'use strict';

/**
 * @ngdoc module
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
	'ui.bootstrap',
	'restangular'
])
	.config(function ($stateProvider, $urlRouterProvider, $locationProvider, RestangularProvider, MdnConfig) {

		$urlRouterProvider.otherwise('/');
		$locationProvider.html5Mode(true);

		RestangularProvider.setBaseUrl(MdnConfig.API_URL + '/1.7');
	});
