'use strict';

angular.module('mydearnest')
	.constant('CONFIG', {
		API_URL: '@@MDN_API_SERVER',
		IMAGE_URL: '@@MDN_IMAGE_SERVER',
		IMAGE_SECRET: 'mydearnest-image-secret',
		USER: {
			ROLES: {
				EN: ['user', 'editor', 'admin'],
				KO: ['유저', '편집자', '관리자']
			},
			GENDERS: {
				EN: ['', 'male', 'female'],
				KO: ['', '남성', '여성']
			}
		}
		//API_URL : 'http://mydearnestapi-env.elasticbeanstalk.com',		// api
		//API_URL : 'http://mydearnestapi-test.elasticbeanstalk.com',		// test
		//API_URL: 'http://localhost:3000',									// localhost,
        //API_URL: 'http://api.ggumim.co.kr',
       	//API_URL: 'http://test-api-v17.ggumim.co.kr',
        //IMAGE_URL: 'http://image.ggumim.co.kr',                       // REAL IMAGE_SERVER
        //IMAGE_URL: 'http://imagetest.ggumim.co.kr',                     // TEST IMAEG_SERVER
		//IMAGE_URL: 'http://localhost:3001',

	});
