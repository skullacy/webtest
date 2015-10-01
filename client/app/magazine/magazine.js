'use strict';

angular.module('mydearnest')
  .config(function ($stateProvider) {
    $stateProvider
      .state('magazine', {
        url: '/',
        templateUrl: 'app/magazine/magazine.html',
        controller: 'MagazineCtrl'
      });
  });
