'use strict';
/**
 * @ngdocs service
 * @name MdnUtil
 * @description
 * {@link mydearnest mydearnest}에서 공통적으로 쓰이는 유틸리티성 메소드들을 모아놓은 서비스객체.
 */
angular.module('mydearnest')
	.service("MdnUtil", function() {

		console.log('MdnUtilFactory');


		/**
		 * 전역으로 pre-define이 필요한 메소드들.
		 * ex) polyfill.
		 */

		Number.isInteger = Number.isInteger || function(value) {
				console.log('is polyfill');
				return typeof value === "number" &&
					isFinite(value) &&
					Math.floor(value) === value;
			};

		return {

		};
	});
