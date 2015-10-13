'use strict';

/**
 * @ngdoc controller
 * @name InteriorpicCtrl
 * @description
 * 인테리어 사진 컨트롤러
 *
 */
angular.module('mydearnest')
	.controller('InteriorpicCtrl', ['$scope', 'MagazineSvc',
		function ($scope, MagazineSvc) {
			MagazineSvc.getList().then(function(magazine) {
				$scope.itemList = magazine;
			});
		}]);
