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
		},
		docular: {
			baseUrl: '',
			useHtml5Mode: false, //Use angular's html5 mode? true/false.
			docular_webapp_target: 'docs', //The place where the docs will be generated
			showAngularDocs: true,
			showDocularDocs: true,
			examples: {}, //instructions for how to run the sandboxed examples
			groupTitle: 'MWS Documentation v<%= pkg.version %>',
			groups: [
				{
					groupTitle: 'Client',
					groupId: 'client',
					groupIcon: 'icon-folder',
					sections: [
						{
							id: 'controllers',
							title: 'Controllers',
							docs: ['client/app/**/*.js', '!client/app/**/*.spec.js']
						},
						{
							id: 'components',
							title: 'Components',
							docs: ['client/components/**/*.js', '!client/components/**/*.spec.js']
						},
						{
							id: 'dependencies',
							title: 'Dependencies',
							docs: ['client/bower_components/**/*.js']
						}

					]
				}
			] //groups of documentation to parse
		},
		docularserver: {
			targetDir: 'docs'
		}
	});

	// Tasks
	grunt.registerTask('document', function (target) {
		if (target === 'deploy') {
			return grunt.task.run([
				'clean:doc',
				'docular',
				'aws_s3:document'
			]);
		} else {
			return grunt.task.run([
				'clean:doc',
				'docular'
			]);
		}
	});
}
