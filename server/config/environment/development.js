'use strict';

// Development specific configuration
// ==================================
module.exports = {
	// Server IP
	ip: process.env.IP || undefined,

	// Server port
	port: process.env.PORT || 8081,

	// Should we populate the DB with sample data?
	seedDB: false,

	// MongoDB connection options
	mongo: {
		uri: process.env.NODE_MONGO_DB || 'mongodb://mongotest.ggumim.co.kr/mydearnest-admin'
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
