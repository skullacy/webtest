'use strict';
/**
 * @ngdoc controller
 * @name mydearnest.controller:HeaderCtrl
 * @description
 * 헤더 컨트롤러
 *
 */
angular.module('mydearnest')
    .controller('HeaderCtrl', ['$scope', function ($scope) {
		$scope.mainMenu = [
			{
				src: '/',
				title: '매거진'
			},
			{
				src: '/interiorpic',
				title: '인테리어 사진'
			},
			{
				src: '/product',
				title: '소품 및 가구'
			},
			{
				src: '/story',
				title: '우리집자랑'
			}
		];
    }]);
