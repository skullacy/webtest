'use strict';
/**
 * @description
 * Config Loader
 * node.js 환경별로 all.js의 모듈을 부분리턴한다.
 */

module.exports = require('./all.js')[process.env.NODE_ENV];
