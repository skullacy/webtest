'use strict';

module.exports = function(grunt) {
	// Config
	grunt.config.merge({
		ngdocs: {
			options: {
				dest: 'docs',
				title: 'MWS Documentation v<%= pkg.version %>',
				sourceLink: true
			},
			client: {
				src: ['client/**/*.js', '!client/**/*.spec.js', '!client/bower_components/**/*.js'],
				title: 'Client',
				api: true
			},
			server: {
				src: ['server/**/*.js'],
				title: 'Server',
				api: true
			}
		}
	});

	// Tasks

	grunt.registerTask('document', [
		'clean:doc',
		'ngdocs'
	]);
}
