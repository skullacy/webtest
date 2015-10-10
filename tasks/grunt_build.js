'use strict';

module.exports = function(grunt) {
	// Environment Config
	var allConfig;
	try {
		allConfig = require('../server/config/environment/all.js');
	} catch(e) {
		allConfig = {};
	}

	// Grunt Config
	grunt.config.merge({
		express: {
			options: {
				port: process.env.PORT || 3002
			},
			dev: {
				options: {
					script: 'server/app.js',
					debug: true
				}
			},
			prod: {
				options: {
					script: 'dist/server/app.js'
				}
			}
		},
		compress: {
			dist: {
				options: {
					archive: '<%= pkg.name %>_<%= pkg.version %>.zip',
					mode: 'zip'
				},
				files: [
					{
						expand: true,
						cwd: '<%= yeoman.dist %>/',
						src: ['**', '.ebextensions/**'],
						dest: './'
					}
				]
			}
		},
		open: {
			server: {
				url: 'http://localhost:<%= express.options.port %>'
			}
		},
		watch: {
			injectJS: {
				files: [
					'<%= yeoman.client %>/{app,components}/**/*.js',
					'!<%= yeoman.client %>/{app,components}/**/*.spec.js',
					'!<%= yeoman.client %>/{app,components}/**/*.mock.js',
					'!<%= yeoman.client %>/app/app.js'],
				tasks: ['injector:scripts']
			},
			injectCss: {
				files: [
					'<%= yeoman.client %>/{app,components}/**/*.css'
				],
				tasks: ['injector:css']
			},
			mochaTest: {
				files: ['server/**/*.spec.js'],
				tasks: ['env:test', 'mochaTest']
			},
			jsTest: {
				files: [
					'<%= yeoman.client %>/{app,components}/**/*.spec.js',
					'<%= yeoman.client %>/{app,components}/**/*.mock.js'
				],
				tasks: ['newer:jshint:all', 'karma']
			},
			injectSass: {
				files: [
					'<%= yeoman.client %>/{app,components}/**/*.{scss,sass}'],
				tasks: ['injector:sass']
			},
			sass: {
				files: [
					'<%= yeoman.client %>/{app,components}/**/*.{scss,sass}'],
				tasks: ['sass', 'autoprefixer']
			},
			babel: {
				files: [
					'<%= yeoman.client %>/{app,components}/**/*.js',
					'!<%= yeoman.client %>/{app,components}/**/*.spec.js'
				],
				tasks: ['babel']
			},
			gruntfile: {
				files: ['Gruntfile.js']
			},
			livereload: {
				files: [
					'{.tmp,<%= yeoman.client %>}/{app,components}/**/*.css',
					'{.tmp,<%= yeoman.client %>}/{app,components}/**/*.html',

					'.tmp/{app,components}/**/*.js',

					'!.tmp/components/config/config.constant.js',
					'!{.tmp,<%= yeoman.client %>}{app,components}/**/*.spec.js',
					'!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.mock.js',
					'<%= yeoman.client %>/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
				],
				options: {
					livereload: true
				},
				tasks: ['replace:dev']
			},
			express: {
				files: [
					'server/**/*.{js,json}'
				],
				tasks: ['express:dev', 'wait'],
				options: {
					livereload: true,
					nospawn: true //Without this option specified express won't be reloaded
				}
			}
		},
		// Make sure code styles are up to par and there are no obvious mistakes
		jshint: {
			options: {
				jshintrc: '<%= yeoman.client %>/.jshintrc',
				reporter: require('jshint-stylish')
			},
			server: {
				options: {
					jshintrc: 'server/.jshintrc'
				},
				src: [
					'server/**/*.js',
					'!server/**/*.spec.js'
				]
			},
			serverTest: {
				options: {
					jshintrc: 'server/.jshintrc-spec'
				},
				src: ['server/**/*.spec.js']
			},
			all: [
				'<%= yeoman.client %>/{app,components}/**/*.js',
				'!<%= yeoman.client %>/{app,components}/**/*.spec.js',
				'!<%= yeoman.client %>/{app,components}/**/*.mock.js'
			],
			test: {
				src: [
					'<%= yeoman.client %>/{app,components}/**/*.spec.js',
					'<%= yeoman.client %>/{app,components}/**/*.mock.js'
				]
			}
		},

		// Empties folders to start fresh
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= yeoman.dist %>/*',
						'!<%= yeoman.dist %>/.git*',
						'!<%= yeoman.dist %>/.openshift',
						'!<%= yeoman.dist %>/Procfile'
					]
				}]
			},
			server: '.tmp',
			doc: {
				files: [{
					dot: true,
					src: [
						'downloaded',
						'docs'
					]
				}]
			}
		},

		// Add vendor prefixed styles
		autoprefixer: {
			options: {
				browsers: ['last 1 version']
			},
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/',
					src: '{,*/}*.css',
					dest: '.tmp/'
				}]
			}
		},

		// Debugging with node inspector
		'node-inspector': {
			custom: {
				options: {
					'web-host': 'localhost'
				}
			}
		},

		// Use nodemon to run server in debug mode with an initial breakpoint
		nodemon: {
			debug: {
				script: 'server/app.js',
				options: {
					nodeArgs: ['--debug-brk'],
					env: {
						PORT: process.env.PORT || 9000
					},
					callback: function (nodemon) {
						nodemon.on('log', function (event) {
							console.log(event.colour);
						});

						// opens browser on initial server start
						nodemon.on('config:update', function () {
							setTimeout(function () {
								require('open')('http://localhost:8080/debug?port=5858');
							}, 500);
						});
					}
				}
			}
		},

		// Automatically inject Bower components into the app
		wiredep: {
			target: {
				src: '<%= yeoman.client %>/index.html',
				ignorePath: '<%= yeoman.client %>/',
				exclude: [/bootstrap-sass-official/, /bootstrap.js/, '/json3/', '/es5-shim/', /bootstrap.css/, /font-awesome.css/ ]
			}
		},

		// Renames files for browser caching purposes
		rev: {
			dist: {
				files: {
					src: [
						'<%= yeoman.dist %>/public/{,*/}*.js',
						'<%= yeoman.dist %>/public/{,*/}*.css',
						'<%= yeoman.dist %>/public/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
						'<%= yeoman.dist %>/public/assets/fonts/*'
					]
				}
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			html: ['<%= yeoman.client %>/index.html'],
			options: {
				dest: '<%= yeoman.dist %>/public'
			}
		},

		// Performs rewrites based on rev and the useminPrepare configuration
		usemin: {
			html: ['<%= yeoman.dist %>/public/{,*/}*.html'],
			css: ['<%= yeoman.dist %>/public/{,*/}*.css'],
			js: ['<%= yeoman.dist %>/public/{,*/}*.js'],
			options: {
				assetsDirs: [
					'<%= yeoman.dist %>/public',
					'<%= yeoman.dist %>/public/assets/images'
				],
				// This is so we update image references in our ng-templates
				patterns: {
					js: [
						[/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
					]
				}
			}
		},

		// The following *-min tasks produce minified files in the dist folder
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.client %>/assets/images',
					src: '{,*/}*.{png,jpg,jpeg,gif}',
					dest: '<%= yeoman.dist %>/public/assets/images'
				}]
			}
		},

		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.client %>/assets/images',
					src: '{,*/}*.svg',
					dest: '<%= yeoman.dist %>/public/assets/images'
				}]
			}
		},

		// Allow the use of non-minsafe AngularJS files. Automatically makes it
		// minsafe compatible so Uglify does not destroy the ng references
		ngAnnotate: {
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/concat',
					src: '**/*.js',
					dest: '.tmp/concat'
				}]
			}
		},

		// Package all the html partials into a single javascript payload
		ngtemplates: {
			options: {
				// This should be the name of your apps angular module
				module: 'mydearnest',
				htmlmin: {
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					removeAttributeQuotes: true,
					removeEmptyAttributes: true,
					removeRedundantAttributes: true,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true
				},
				usemin: 'app/app.js'
			},
			main: {
				cwd: '<%= yeoman.client %>',
				src: ['{app,components}/**/*.html'],
				dest: '.tmp/templates.js'
			},
			tmp: {
				cwd: '.tmp',
				src: ['{app,components}/**/*.html'],
				dest: '.tmp/tmp-templates.js'
			}
		},

		// Replace Google CDN references
		cdnify: {
			dist: {
				html: ['<%= yeoman.dist %>/public/*.html']
			}
		},

		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.client %>',
					dest: '<%= yeoman.dist %>/public',
					src: [
						'*.{ico,png,txt}',
						'.htaccess',
						'bower_components/**/*',
						'assets/images/{,*/}*.{webp}',
						'assets/fonts/**/*',
						'index.html'
					]
				}, {
					expand: true,
					cwd: '.tmp/images',
					dest: '<%= yeoman.dist %>/public/assets/images',
					src: ['generated/*']
				}, {
					expand: true,
					dest: '<%= yeoman.dist %>',
					src: [
						'package.json',
						'server/**/*'
					]
				}]
			},
			styles: {
				expand: true,
				cwd: '<%= yeoman.client %>',
				dest: '.tmp/',
				src: ['{app,components}/**/*.css']
			}
		},

		buildcontrol: {
			options: {
				dir: 'dist',
				commit: true,
				push: true,
				connectCommits: false,
				message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
			},
			heroku: {
				options: {
					remote: 'heroku',
					branch: 'master'
				}
			},
			openshift: {
				options: {
					remote: 'openshift',
					branch: 'master'
				}
			}
		},

		// Run some tasks in parallel to speed up the build process
		concurrent: {
			server: [
				'babel',
				'sass',
			],
			test: [
				'babel',
				'sass',
			],
			debug: {
				tasks: [
					'nodemon',
					'node-inspector'
				],
				options: {
					logConcurrentOutput: true
				}
			},
			dist: [
				'babel',
				'sass',
				'imagemin',
				'svgmin'
			]
		},

		// Test settings
		karma: {
			unit: {
				configFile: 'karma.conf.js',
				singleRun: true
			}
		},

		mochaTest: {
			options: {
				reporter: 'spec'
			},
			src: ['server/**/*.spec.js']
		},

		protractor: {
			options: {
				configFile: 'protractor.conf.js'
			},
			chrome: {
				options: {
					args: {
						browser: 'chrome'
					}
				}
			}
		},

		// Compiles ES6 to JavaScript using Babel
		babel: {
			options: {
				sourceMap: true
			},
			server: {
				files: [{
					expand: true,
					cwd: 'client',
					src: [
						'{app,components}/**/*.js',
						'!{app,components}/**/*.spec.js'
					],
					dest: '.tmp'
				}]
			}
		},

		// Compiles Sass to CSS
		sass: {
			server: {
				options: {
					loadPath: [
						'<%= yeoman.client %>/bower_components',
						'<%= yeoman.client %>/app',
						'<%= yeoman.client %>/components'
					],
					compass: false
				},
				files: {
					'.tmp/app/app.css' : '<%= yeoman.client %>/app/app.scss'
				}
			}
		},

		injector: {
			options: {

			},
			// Inject application script files into index.html (doesn't include bower)
			scripts: {
				options: {
					transform: function(filePath) {
						filePath = filePath.replace('/client/', '');
						filePath = filePath.replace('/.tmp/', '');
						return '<script src="' + filePath + '"></script>';
					},
					starttag: '<!-- injector:js -->',
					endtag: '<!-- endinjector -->'
				},
				files: {
					'<%= yeoman.client %>/index.html': [
						[

							'.tmp/{app,components}/**/*.js',

							'!{.tmp,<%= yeoman.client %>}/app/app.js',
							'!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.spec.js',
							'!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.mock.js'
						]
					]
				}
			},

			// Inject component scss into app.scss
			sass: {
				options: {
					transform: function(filePath) {
						filePath = filePath.replace('/client/app/', '');
						filePath = filePath.replace('/client/components/', '');
						return '@import \'' + filePath + '\';';
					},
					starttag: '// injector',
					endtag: '// endinjector'
				},
				files: {
					'<%= yeoman.client %>/app/app.scss': [
						'<%= yeoman.client %>/{app,components}/**/*.{scss,sass}',
						'!<%= yeoman.client %>/app/app.{scss,sass}'
					]
				}
			},

			// Inject component css into index.html
			css: {
				options: {
					transform: function(filePath) {
						filePath = filePath.replace('/client/', '');
						filePath = filePath.replace('/.tmp/', '');
						return '<link rel="stylesheet" href="' + filePath + '">';
					},
					starttag: '<!-- injector:css -->',
					endtag: '<!-- endinjector -->'
				},
				files: {
					'<%= yeoman.client %>/index.html': [
						'<%= yeoman.client %>/{app,components}/**/*.css'
					]
				}
			}
		},
		replace: {
			dist: {
				options: {
					patterns: [
						{
							match: 'MDN_API_SERVER',
							replacement: allConfig.production.server.api
						},
						{
							match: 'MDN_IMAGE_SERVER',
							replacement: allConfig.production.server.image
						}
					]
				},
				files: [
					{
						expand: true,
						flatten: true,
						src: ['client/components/config/config.constant.js'],
						dest: '.tmp/components/config/'}
				]
			},
			dev: {
				options: {
					patterns: [
						{
							match: 'MDN_API_SERVER',
							replacement: allConfig.development.server.api
						},
						{
							match: 'MDN_IMAGE_SERVER',
							replacement: allConfig.development.server.image
						}
					]
				},
				files: [
					{
						expand: true,
						flatten: true,
						src: ['client/components/config/config.constant.js'],
						dest: '.tmp/components/config/'}
				]
			},
			test: {
				options: {
					patterns: [
						{
							match: 'MDN_API_SERVER',
							replacement: allConfig.test.server.api
						},
						{
							match: 'MDN_IMAGE_SERVER',
							replacement: allConfig.test.server.image
						}
					]
				},
				files: [
					{
						expand: true,
						flatten: true,
						src: ['client/components/config/config.constant.js'],
						dest: '.tmp/components/config/'}
				]
			}
		}
	});


	// Tasks

	// Used for delaying livereload until after server has restarted
	grunt.registerTask('wait', function () {
		grunt.log.ok('Waiting for server reload...');

		var done = this.async();

		setTimeout(function () {
			grunt.log.writeln('Done waiting!');
			done();
		}, 1500);
	});

	grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
		this.async();
	});

	grunt.registerTask('serve', function (target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'env:all', 'env:prod', 'express:prod', 'wait', 'open', 'express-keepalive']);
		}

		if (target && target.indexOf('aws') === 0) {
			//if (target === 'awsTest') {
			//	grunt.config.set('compress.dist.options.archive', '<%= pkg.name %>_<%= pkg.version %>t.zip');
			//	grunt.config.set('awsebtdeploy.dist.options.environmentCNAME', 'mydearnestadmin-test.elasticbeanstalk.com');
			//	grunt.config.set('awsebtdeploy.dist.options.versionLabel', '<%= pkg.version %>t');
			//	grunt.config.set('awsebtdeploy.dist.options.sourceBundle', './<%= pkg.name %>_<%= pkg.version %>t.zip');
			//}
			return grunt.task.run(['build', 'env:all', 'env:prod', 'express:prod', 'compress:dist', 'awsebtdeploy:dist']);
		}

		if (target === 'debug') {
			return grunt.task.run([
				'clean:server',
				'env:all',
				'injector:sass',
				'concurrent:server',
				'injector',
				'wiredep',
				'autoprefixer',
				'concurrent:debug'
			]);
		}

		grunt.task.run([
			'clean:server',
			'env:all',
			'injector:sass',
			'concurrent:server',
			'injector',
			'replace:dev',
			'wiredep',
			'autoprefixer',
			'express:dev',
			'wait',
			'open',
			'watch'
		]);
	});



	grunt.registerTask('server', function () {
		grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
		grunt.task.run(['serve']);
	});

	grunt.registerTask('build', [
		'clean:dist',
		'injector:sass',
		'concurrent:dist',
		'injector',
		'wiredep',
		'replace:dist',
		'useminPrepare',
		'autoprefixer',
		'ngtemplates',
		'concat',
		'ngAnnotate',
		'copy:dist',
		'cdnify',
		'cssmin',
		'uglify',
		'rev',
		'usemin'
	]);

	grunt.registerTask('default', [
		'newer:jshint',
		'test',
		'build'
	]);
}
