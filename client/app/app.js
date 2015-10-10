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

		/**
		 * Angular.js 기본설정
		 */
		$urlRouterProvider.otherwise('/');
		$locationProvider.html5Mode(true);


		/**
		 * Restangular 설정시작
		 *
		 * 기본 URL 설정
		 * MdnConfig에서 API Address를 가져온다.
		 */
		RestangularProvider.setBaseUrl('http://' + MdnConfig.API_URL + '/1.7');


		/**
		 * ResponseInterceptor 설정.
		 *
		 * API에서 넘어오는 Response의 경우 아래와 같음.
		 *
		 * {
		 * 		version: 1.7,
		 * 		data: [ object, object ]
		 * }
		 *
		 * Restangular의 array 리턴형 함수에서 에러나기때문에 body.data로 리턴.
		 */
		RestangularProvider.setResponseInterceptor(function(body) {
			return body.data;
		});


	});
