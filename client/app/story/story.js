'use strict';

angular.module('mydearnest')
	.config(function ($stateProvider) {
		$stateProvider
			.state('story', {
				url: '/story',
				templateUrl: 'app/story/story.html',
				controller: 'StoryCtrl'
			})
			.state('story.detail', {
				parent: 'story',
				url: '/:id',
				onEnter: ['$modal', '$stateParams', '$state', function($modal, $stateParams, $state) {
					$modal
						.open({
							controller: 'StoryDetailCtrl',
							templateUrl: 'app/story/detail/storydetail.html'
						})
						.result.finally(function (){
							$state.go('^');
						});
				}]
			});
	});
