'use strict';

angular.module('mydearnest')
	.factory("Magazine", function($resource) {
		return $resource("/1.7/magazines");
	});
