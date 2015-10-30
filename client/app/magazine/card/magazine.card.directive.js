'use strict';

angular.module('mydearnest')
	.directive('magazineCard', function() {

		return {
			scope: {
				object: "=",
				imageSize: "@"
			},
			templateUrl: 'app/magazine/card/card.html'
		};

	});
