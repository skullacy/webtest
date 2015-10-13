'use strict';
/**
 * @ngdocs service
 * @name lodash
 * @description
 * lodash 플러그인을 angular.js내부에서 사용하기위한 서비스
 *
 * * Reference: {@link https://lodash.com/ lodash}
 */
angular.module('mydearnest')
    .factory('_', function () {
        return window._;
    });
