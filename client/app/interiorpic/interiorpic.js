'use strict';

angular.module('mydearnest')
  .config(function ($stateProvider) {
    $stateProvider
      .state('interiorpic', {
        url: '/interiorpic',
        templateUrl: 'app/interiorpic/interiorpic.html',
        controller: 'InteriorpicCtrl'
      });
  });
