'use strict';

/**
 * @ngdoc controller
 * @name MagazineCtrl
 * @description
 * 매거진 컨트롤러
 *
 */
angular.module('mydearnest')
	.controller('MagazineCtrl', ['$scope', 'MdnConfig', 'MagazineSvc', function ($scope, MdnConfig, MagazineSvc) {
		$scope.api = MdnConfig.API_URL;
		$scope.image = MdnConfig.IMAGE_URL;

		MagazineSvc.getList().then(function(magazine) {
			console.log(magazine);
		});
		//console.log(Restangular.one('magazines').get());

	}]);
