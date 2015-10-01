'use strict';

angular.module('mydearnest')
  .config(function ($stateProvider) {
    $stateProvider
      .state('signin', {
        url: '/signin',
        templateUrl: 'app/signin/signin.html',
        controller: 'SigninCtrl'
      });
  });
