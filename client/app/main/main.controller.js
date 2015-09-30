'use strict';

angular.module('mydearnestWebApp')
    .controller('MainCtrl', function ($scope, $http) {
        $scope.awesomeThings = [];

        $http.get('/api/things').success(function(awesomeThings) {
            $scope.awesomeThings = awesomeThings;
        });

        //$scope.testModel = new TestModel();



    });
