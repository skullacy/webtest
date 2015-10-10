'use strict';
/**
 * @ngdoc object
 * @name MdnConfig
 * @description
 * App Config을 정의한다.
 *
 * @example
 * <pre>
 * 	angular.module('mydearnest')
 *		.controller('ExamCtrl', ['$scope', 'MdnConfig', function ($scope, MdnConfig) {
 *			$scope.api = MdnConfig.API_URL;
 *			$scope.image = MdnConfig.IMAGE_URL;
 *	}]);
 * </pre>
 */
angular.module('mydearnest')
	.constant('MdnConfig', {
		/**
		 * @ngdoc property
		 * @name API_URL
		 * @propertyOf MdnConfig
		 * @description
		 * 집꾸미기 API Server URL.
		 */
		API_URL: '@@MDN_API_SERVER',

		/**
		 * @ngdoc property
		 * @name IMAGE_URL
		 * @propertyOf MdnConfig
		 * @description
		 * 집꾸미기 Image Server URL.
		 */
		IMAGE_URL: '@@MDN_IMAGE_SERVER',
	});
