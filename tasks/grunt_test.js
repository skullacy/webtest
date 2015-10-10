'use strict';

module.exports = function(grunt) {

	// Config


	// Tasks
	grunt.registerTask('test', function(target) {
		if (target === 'server') {
			return grunt.task.run([
				'env:all',
				'env:test',
				'mochaTest'
			]);
		}

		else if (target === 'client') {
			return grunt.task.run([
				'clean:server',
				'env:all',
				'injector:sass',
				'concurrent:test',
				'injector',
				'autoprefixer',
				'karma'
			]);
		}

		else if (target === 'e2e') {
			return grunt.task.run([
				'clean:server',
				'env:all',
				'env:test',
				'injector:sass',
				'concurrent:test',
				'injector',
				'wiredep',
				'autoprefixer',
				'express:dev',
				'protractor'
			]);
		}

		else grunt.task.run([
				'test:server',
				'test:client',
				'test:e2e'
			]);
	});


}
