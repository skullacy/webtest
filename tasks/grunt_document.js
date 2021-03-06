'use strict';

module.exports = function(grunt) {
	// Config
	grunt.config.merge({
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
					groupTitle: 'Client Docs',
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
							docs: [
								'client/components/**/*.js',
								'!client/components/**/*.spec.js',
								'!client/components/model/**/*.js',
								'!client/components/plugin/**/*.js'
							]
						},
						{
							id: 'model',
							title: 'Models',
							docs: ['client/components/model/**/*.js', '!client/components/model/**/*.spec.js']
						},
						{
							id: 'plugin',
							title: 'Plugins',
							docs: ['client/components/plugins/**/*.js', '!client/components/plugins/**/*.spec.js']
						},
						{
							id: 'dependencies',
							title: 'Dependencies',
							docs: ['client/bower_components/**/*.js']
						}

					]
				},
				{
					groupTitle: 'Server Docs',
					groupId: 'server',
					groupIcon: 'icon-folder',
					sections: [
						{
							id: 'configuration',
							title: 'Configuration',
							docs: ['server/config/**/*.js']
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
