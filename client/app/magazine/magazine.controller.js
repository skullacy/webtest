'use strict';

/**
 * @ngdoc controller
 * @name mydearnest.controller:MagazineCtrl
 * @description
 * 매거진 컨트롤러
 *
 */
angular.module('mydearnest')
	.controller('MagazineCtrl', ['$scope', 'CONFIG', function ($scope, CONFIG) {
		$scope.message = 'Hello';
		$scope.api = CONFIG.API_URL;
		$scope.image = CONFIG.IMAGE_URL;
	}]);
