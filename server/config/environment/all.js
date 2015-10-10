'use strict';
/**
 * @ngdocs interface
 * @name all.js
 * @description
 * Config Container.
 * node.js 환경별 설정에 따른 모든 Config을 갖고있음.
 */

var path = require('path');
var _ = require('lodash');

// Config 구조명세.
// 보안이 필요한 부분은 환경변수로만 세팅한다. 나머지는 로컬환경 설정에 따름
// =======================================================
var defaultConfig = {
	env: process.env.NODE_ENV,

	// Root path of server
	root: path.normalize(__dirname + '/../../..'),

	// Server port
	port: process.env.PORT || 3001,

	// Server IP
	ip: process.env.IP || '0.0.0.0',

	// Secret for session, you will want to change this and make it an environment variable
	secrets: {
		session: 'mydearnest-web-secret'
	},

	// List of user roles
	userRoles: ['guest', 'user', 'admin'],

	aws: {
		region: process.env.AWS_REGION,
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_KEY,
		s3: {
			configBucket: process.env.AWS_S3_CONFIG_BUCKET
		}
	},

	// Frontend에서 사용할 server 주소들.
	// 환경변수에 의해 바뀜.
	server: {
		api: 'localhost',
		image: 'localhost'
	}
};

// NODE_ENV에 따라 Config Object 리턴.
// ================================
var result = {};
result.production = _.merge({}, defaultConfig, require('./production.js') || {});
result.development = _.merge({}, defaultConfig, require('./development.js') || {}, require('../local.env'));
result.test = _.merge({}, defaultConfig, require('./test.js') || {}, require('../local.env'));

module.exports = result;
