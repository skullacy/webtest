'use strict';

module.exports = function(grunt) {
	// Config
	grunt.config.merge({
		aws: grunt.file.readJSON('./server/config/aws/aws.env.json'),
		aws_s3: {
			options: {
				accessKeyId: '<%= aws.accessKeyId %>',
				secretAccessKey: '<%= aws.secretAccessKey %>',
				region: '<%= aws.region %>',
				uploadConcurrency: 5,
				downloadConcurrency: 5
			},
			staging: {
				options: {
					bucket: '<%= aws.s3.configBucket %>',
					access: 'private'
				},
				files: [
					{
						action: 'download',
						dest: 'code/',
						cwd: './server/config/aws/code/',
						exclude: ['**/*api*', '**/*image*'],
						differential: true
					}
				]
			},
			production: {
				options: {
					bucket: '<%= aws.s3.configBucket %>',
					access: 'private'
				},
				files: [
					{
						action: 'upload',
						cwd: './server/config/aws/code/',
						dest: 'code/',
						src: ['**'],
						expand: true
					}
				]
			}
		},
		awsebtdeploy: {
			dist: {
				options: {
					applicationName: 'mydearnest-api',
					environmentCNAME: 'mydearnestadmin-env.elasticbeanstalk.com',
					region: '<%= aws.region %>',
					versionLabel: '<%= pkg.version %>',
					accessKeyId: '<%= aws.accessKeyId %>',
					secretAccessKey: '<%= aws.secretAccessKey %>',
					sourceBundle: './<%= pkg.name %>_<%= pkg.version %>.zip',
					s3: {
						bucket: 'elasticbeanstalk-ap-northeast-1-483118871478'
					}

				}
			}
		}
	});
}
