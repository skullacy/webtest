'use strict';

/**
 * @ngdocs service
 * @name CryptoJS
 * @description
 * CryptoJS 플러그인을 angular.js내부에서 사용하기위한 서비스
 *
 * * Reference: {@link https://code.google.com/p/crypto-js/ CryptoJS}
 */
angular.module('mydearnest')
    .factory('CryptoJS', function () {
        return window.CryptoJS;
    });
