'use strict';

/**
 * @ngdoc controller
 * @name MagazineCtrl
 * @description
 * 매거진 컨트롤러
 *
 */
angular.module('mydearnest')
	.controller('MagazineCtrl', ['$scope', 'MdnConfig', function ($scope, MdnConfig) {
		$scope.message = 'Hello';
		$scope.api = MdnConfig.API_URL;
		$scope.image = MdnConfig.IMAGE_URL;
	}]);
