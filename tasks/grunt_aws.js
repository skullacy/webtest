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
			document: {
				options: {
					region: 'ap-northeast-1',
					bucket: 'mydearnest-cdn',
					access: 'public-read'
				},
				files: [
					{
						action: 'upload',
						cwd: './docs/',
						dest: 'MwsDocs/',
						src: ['**'],
						expand: true
					}
				]
			}
		},
		awsebtdeploy: {
			dist: {
				options: {
					applicationName: 'test-mydearnest-web',
					environmentCNAME: 'testmydearnestweb.elasticbeanstalk.com',
					region: '<%= aws.region %>',
					versionLabel: '<%= pkg.version %>',
					accessKeyId: '<%= aws.accessKeyId %>',
					secretAccessKey: '<%= aws.secretAccessKey %>',
					sourceBundle: './<%= pkg.name %>_<%= pkg.version %>.zip',
					s3: {
						bucket: 'elasticbeanstalk-us-west-2-483118871478'
					}

				}
			}
		}
	});
}
