'use strict';
var envify = require('envify/custom');

module.exports = function (grunt) {
	//var localConfig;
	//try {
	//	localConfig = require('./server/config/local.env');
	//} catch(e) {
	//	localConfig = {};
	//}

	var localConfig = {};

	//function getConfig() {
	//	console.log('in getConfig');
	//	var config;
	//	try {
	//		config = require('./server/config/environment');
	//	} catch (e) {
	//		console.log(e);
	//		config = {};
	//	}
	//	return config;
	//}

	// Load grunt tasks automatically, when needed
	require('jit-grunt')(grunt, {
		express: 'grunt-express-server',
		useminPrepare: 'grunt-usemin',
		ngtemplates: 'grunt-angular-templates',
		cdnify: 'grunt-google-cdn',
		protractor: 'grunt-protractor-runner',
		buildcontrol: 'grunt-build-control',
		ngdocs: 'grunt-ngdocs',
		replace: 'grunt-replace',
		awsebtdeploy: 'grunt-awsebtdeploy',
		aws_s3: 'grunt-aws-s3',
		browserify: 'grunt-browserify'
	});

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Define the configuration for all the tasks
	grunt.initConfig({

		// Project settings
		pkg: grunt.file.readJSON('package.json'),
		env: {
			test: {
				NODE_ENV: 'test'
			},
			prod: {
				NODE_ENV: 'production'
			},
			all: localConfig
		},
		yeoman: {
			// configurable paths
			client: require('./bower.json').appPath || 'client',
			dist: 'dist'
		},
		bump: {
			options: {
				files: ['package.json'],
				updateConfigs: [],
				commitMessage: 'Release v%VERSION%',
				commitFiles: ['package.json'],
				createTag: true,
				tagName: 'v%VERSION%',
				tagMessage: 'Version %VERSION%',
				push: true,
				pushTo: 'git_skull',
				gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
				globalReplace: false,
				regExp: false
			}
		},
		browserify: {
			dev: {
				files: {
					'./client/components/config/config.constant.js': ['./client/components/config/config.constant.js.browserify']
				},
				options: {
					alias: {
						'serverConfig': './server/config/environment'
					},
					//browserifyOptions: {
					//	debug: false
					//},
					transform: [envify({
						NODE_ENV: 'development'
					})],
					require: ['./server/config/environment/development.js:./development.js'],
					banner:'window.'
				}
			},
			//dist: {
			//	files: {
			//		'<%= yeoman.client %>/components/config/config.constant.js.browserify': ['<%= yeoman.client %>/components/config/config.constant.js.browserify']
			//	},
			//	options: {
			//		transform: [envify({
			//			NODE_ENV: 'production'
			//		})]
			//	}
			//},
			//test: {
			//	files: {
			//		'<%= yeoman.client %>/components/config/config.constant.js.browserify': ['<%= yeoman.client %>/components/config/config.constant.js.browserify']
			//	},
			//	options: {
			//		transform: [envify({
			//			NODE_ENV: 'test'
			//		})]
			//	}
			//}
		},
		replace: {
			dist: {
				options: {
					patterns: [
						{
							match: 'MDN_API_SERVER',
							replacement: '<%= env.all.server.api %>'
						},
						{
							match: 'MDN_IMAGE_SERVER',
							replacement: '<%= env.all.server.image %>'
						}
					]
				},
				files: [
					{
						expand: true,
						flatten: true,
						src: ['client/components/config/config.constant.js.browserify'],
						dest: '.tmp/components/config/'}
				]
			},
		},

	});


	grunt.loadTasks('./tasks');

};
