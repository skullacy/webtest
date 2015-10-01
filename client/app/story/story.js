'use strict';

angular.module('mydearnest')
  .config(function ($stateProvider) {
    $stateProvider
      .state('story', {
        url: '/story',
        templateUrl: 'app/story/signup.html',
        controller: 'StoryCtrl'
      });
  });
