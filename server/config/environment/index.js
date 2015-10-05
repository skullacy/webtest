'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
	if(!process.env[name]) {
		throw new Error('You must set the ' + name + ' environment variable');
	}
	return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
	env: process.env.NODE_ENV,

	// Root path of server
	root: path.normalize(__dirname + '/../../..'),

	// Server port
	port: process.env.PORT || 9000,

	// Server IP
	ip: process.env.IP || '0.0.0.0',

	// Secret for session, you will want to change this and make it an environment variable
	secrets: {
		session: 'mydearnest-web-secret'
	},

	// Should we populate the DB with sample data?
	seedDB: false,

	// List of user roles
	userRoles: ['guest', 'user', 'admin'],

	// MongoDB connection options
	mongo: {
		options: {
			db: {
				safe: true
			}
		}
	},

	// Amazon web service configure
	aws: {
		region: process.env.AWS_REGION,
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_KEY,
		s3: {
			configBucket: process.env.AWS_S3_CONFIG_BUCKET
		}
	}

};

// Export the config object based on the NODE_ENV
// ==============================================
if (process.env.NODE_ENV != 'production') {
	module.exports = _.merge(
		all,
		require('./' + process.env.NODE_ENV + '.js') || {},
		require('../local.env') || {});
} else {
	module.exports = _.merge(
		all,
		require('./' + process.env.NODE_ENV + '.js') || {});
};
