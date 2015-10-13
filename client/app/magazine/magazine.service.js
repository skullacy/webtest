'use strict';

/**
 * @ngdoc service
 * @name MagazineSvc
 * @description
 * 매거진 서비스
 *
 */
angular.module('mydearnest')
	.factory('MagazineSvc', ['oMagazine', 'Restangular', function (Magazine, Restangular) {
		var base = Restangular.all('magazines');

		return base;
	}]);
