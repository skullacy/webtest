'use strict';

/**
 * @ngdoc controller
 * @name MagazineCtrl
 * @description
 * 매거진 컨트롤러
 *
 */
angular.module('mydearnest')
	.controller('MagazineCtrl', ['$scope', 'MagazineSvc',
		function ($scope, MagazineSvc) {
			MagazineSvc.getList().then(function(magazine) {
				$scope.itemList = magazine;
			});
		}]);
