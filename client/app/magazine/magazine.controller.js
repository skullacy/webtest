'use strict';

/**
 * @ngdoc controller
 * @name MagazineCtrl
 * @description
 * 매거진 컨트롤러
 *
 */
angular.module('mydearnest')
	.controller('MagazineCtrl', ['$scope', 'MagazineSvc', 'angularGridInstance',
		function ($scope, MagazineSvc, angularGridInstance) {


			MagazineSvc.getList().then(function(magazine) {
				$scope.magazineList = magazine;
				console.log('getMagazines');
				console.log(angularGridInstance.gallery);
			});
		}]);
