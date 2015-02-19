'use strict';


module.exports = function(grunt) {

	var pageDir = ['src/pages/']
		, localeDir = ['src/locales/']
		, locales = ['en']
		, pageList = grunt.file.expand(pageDir + '**/*.hbs')
		, distDir = 'dist/'
		, assembleTask = {
			options: {
				helpers: 'src/helpers/helper.js',
				layoutdir: 'src/layouts',
				layout: "default.hbs",
				partials: 'src/partials/**/*.hbs',
				flatten: true
			}
		};

	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);

	function getFileName (path) {
		var file = path.match(/\/([^/]*)$/)[1];
		var name = file.replace(/\.[^/.]+$/, "");

		return name;
	}

	//assemble task
	pageList.forEach(function (template) {
		var templateName = getFileName(template);
		locales.forEach(function (locale) {
			grunt.log.writeln('locales/' + locale + '/data.yaml');

			assembleTask[templateName + "_" + locale] = {
				options: {
					// YAML filename has to be data otherwise assemble don't like it.
					data: 'src/locales/' + locale + '/data.yaml'
				},
				files: [{
					expand: true,
					cwd: 'src/pages/',
					src: templateName + '.hbs',
					//if there's locales
					// dest: 'dist/' + locale + '/'
					// if no locales
					dest: 'dist/'
				}]
			}
		});
	});

	// Project configuration.
	grunt.initConfig({

		config: {
			src: 'src',
			dist: 'dist',
			tmp: '.tmp'
		},

		clean: {
			//dist: ['<%= config.dist %>/*']
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= config.dist %>/*',
						'!<%= config.dist %>/.git*'
					]
				}]
			},
			server: '.tmp'
		},

		watch: {
			assemble: {
				files: [
					'<%= config.src %>/layouts/*.{md,hbs,yml}',
					'<%= config.src %>/pages/*.{md,hbs,yml}',
					'<%= config.src %>/locales/**/*.{md,hbs,yml}',
					'<%= config.src %>/partials/**/*.{md,hbs,yml}'
				],
				tasks: ['assemble', 'usemin']
			},
			js: {
				files: [
					'<%= config.src %>/assets/javascripts/**/*.js',
					'<%= config.src %>/layouts/*.{md,hbs,yml}'
				],
				tasks: ['useminPrepare', 'concat', 'copy:test']
				// options: {
				// 	livereload: true
				// }
			},
			gruntfile: {
				files: ['Gruntfile.js'],
				tasks: ['test']
			},
			sass: {
				files: ['<%= config.src %>/assets/stylesheets/**/*.scss'],
				tasks: ['sass']
			},
			css: {
				files: ['<%= config.dist %>/assets/stylesheets/all.css'],
				tasks: []
			},
			images: {
				files: ['<%= config.src %>/assets/images/*'],
				task: ['imagemin']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%= config.dist %>/{,*/}*.html',
					'<%= config.dist %>/assets/stylesheets/all.css',
					'<%= config.dist %>/assets/javascripts/all.js',
				]
			}
		},

		connect: {
			options: {
				port: 9000,
				open: true,
				livereload: 35729,
				// change this to '0.0.0.0' to access the server from outside
				hostname: 'localhost'
			},
			livereload: {
				options: {
				  open: true,
				  base: [
					'<%= config.dist %>'
				  ]
				}
			}
		},

		assemble: assembleTask,

		// concat: {
		// 	app: {
		// 		src: [
		// 		'<%= config.src %>/assets/javascripts/vendor/*.js',
		// 		'<%= config.src %>/assets/javascripts/app/**/*.js',
		// 		'!<%= config.src %>/assets/javascripts/app/main.js',
		// 		'<%= config.src %>/assets/javascripts/app/main.js'
		// 		],
		// 		dest: '<%= config.dist %>/assets/javascripts/all.js'
		// 	},
		// },

		sass: {
			options: {
				sourceMap: true,
				imagePath: './../images/',
				outputStyle: 'compressed'

			},
			index: {
				src: [
					'<%= config.src %>/assets/stylesheets/all.scss',
						'<%= config.src %>/assets/stylesheets/common/*.scss',
						'<%= config.src %>/assets/stylesheets/index/*.scss'
				],
				dest: '<%= config.dist %>/assets/stylesheets/all.css'
			}
		},

		autoprefixer: {
			options: {
				browsers: ['> 1%', 'last 3 versions', 'Firefox ESR', 'Opera 12.1']
			},
			index: {
				files: {
					'<%= config.dist %>/assets/stylesheets/all.css': ['<%= config.dist %>/assets/stylesheets/all.css']
				}
			}
		},

		cssmin: {
			index: {
				files: {
					'<%= config.dist %>/assets/stylesheets/all.css': ['<%= config.dist %>/assets/stylesheets/all.css']
				}
			}
		},

		useminPrepare: {
			index: {
				dest: '<%= config.dist %>/index.html',
				src: '<%= config.src %>/layouts/default.hbs'
			}
		},

		usemin: {
			index: {
				dest: '<%= config.dist %>/index.html',
				src: '<%= config.dist %>/index.html'
			}
		},

		// concat: {
		// 	registration: {
		// 		src: [
		// 		'<%= config.src %>/assets/javascripts/vendor/jquery.js'
		// 		// '<%= config.src %>/assets/javascripts/app/**/*.js',
		// 		// '!<%= config.src %>/assets/javascripts/app/main.js',
		// 		// '<%= config.src %>/assets/javascripts/app/main.js'
		// 		],
		// 		dest: '<%= config.dist %>/assets/javascripts/registration.js'
		// 	},
		// },

		uglify: {
			options: {
				sourceMapRoot: '<%= config.dist %>/assets/javascripts/all.js',
				sourceMap: '<%= config.dist %>/assets/javascripts/all.min.js.map'
			}
			// target : {
			// 	src : ['<%= config.dist %>/assets/javascripts/all.js'],
			// 	dest : '<%= config.dist %>/assets/javascripts/all.js'
			// }
		},

		copy: {
			main: {
				files: [
					{
						expand: true,
						flatten: true,
						filter: 'isFile',
						src: ['<%= config.src %>/assets/video/*'],
						dest: '<%= config.dist %>/assets/video/'
					},{
						expand: true,
						flatten: true,
						filter: 'isFile',
						src: ['<%= config.src %>/assets/fonts/*'],
						dest: '<%= config.dist %>/assets/fonts/'
					}, {
						expand: true,
						flatten: true,
						filter: 'isFile',
						src: ['<%= config.src %>/assets/images/favicon.ico'],
						dest: '<%= config.dist %>'
					}
					// , {
					// 	src: ['<%= config.src %>/index.html'],
					// 	dest: '<%= config.dist %>/index.html'
					// }
				]
			},
			test: {
				files: [
					{
						expand: true,
						flatten: true,
						filter: 'isFile',
						src: [
							'<%= config.tmp %>/concat/assets/javascripts/all.js'
						],
						dest: '<%= config.dist %>/assets/javascripts/'
					}
				]
			}
		},

		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.src %>/assets/images',
					src: ['**/*.{png,jpg,gif}'],
					dest: '<%= config.dist %>/assets/images'
				}]
			}
		},

		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.src %>/assets/images',
					src: '{,*/}*.svg',
					dest: '<%= config.dist %>/assets/images'
				}]
			}
		}

	});

	grunt.loadNpmTasks('assemble');

	grunt.registerTask('server', [
		'test',
		'connect:livereload',
		'watch'
	]);

	grunt.registerTask('test', [
		'clean:dist',
		'assemble',
		'sass',
		'autoprefixer',
		'useminPrepare',
		'concat',
		'usemin',
		'copy',
		'imagemin',
		'svgmin'
	]);

	grunt.registerTask('build', [
		'clean:dist',
		'assemble',
		'sass',
		'autoprefixer',
		'cssmin',
		'useminPrepare',
		'concat',
		'uglify',
		'usemin',
		'copy:main',
		'imagemin',
		'svgmin'
	]);

	grunt.registerTask('heroku', [
		'build',
	]);

	grunt.registerTask('default', [
		'build',
	]);

};