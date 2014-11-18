'use strict';


module.exports = function(grunt) {

	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);

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
				files: ['<%= config.src %>/{layouts,pages}/{,*/}*.{md,hbs,yml}'],
				tasks: ['assemble']
			},
			js: {
				files: ['<%= config.src %>/assets/javascripts/javascripts/**/*.js'],
				tasks: ['concat']
				// options: {
				// 	livereload: true
				// }
			},
			gruntfile: {
				files: ['Gruntfile.js']
			},
			sass: {
				files: ['<%= config.src %>/assets/stylesheets/*.scss'],
				tasks: ['sass']
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
	
		assemble: {
			options: {
				layout: "<%= config.src %>/layouts/default.hbs",
				flatten: true
			},
			pages: {
				files: {
					'<%= config.dist %>/': ['<%= config.src %>/pages/*.hbs']
				}
			}
		},

		sass: {
			options: {
				sourceMap: true
			},
			dist: {
				files: {
					'<%= config.dist %>/assets/stylesheets/all.css': ['<%= config.src %>/assets/stylesheets/*.scss']
				}
			}
		},

		autoprefixer: {
			options: {
				browsers: ['> 1%', 'last 3 versions', 'Firefox ESR', 'Opera 12.1']
			},
			dist: {
				files: {
					'<%= config.dist %>/assets/stylesheets/all.css': ['<%= config.dist %>/assets/stylesheets/*.css']
				}
			}
		},

		cssmin: {
			dist: {
				files: {
					'<%= config.dist %>/assets/stylesheets/all.css': ['<%= config.dist %>/assets/stylesheets/all.css']
				}
			}
		},

		concat: {
			app: {
				src: ['<%= config.src %>/assets/javascripts/javascripts/**/*.js'],
				dest: '<%= config.dist %>/assets/javascripts/all.js'
			},
		},

		uglify: {
			options: {
				sourceMapRoot: '<%= config.dist %>/assets/javascripts/all.js',
				sourceMap: '<%= config.dist %>/assets/javascripts/all.min.js.map'
			},
			target : {
				src : ['<%= config.dist %>/assets/javascripts/all.js'],
				dest : '<%= config.dist %>/assets/javascripts/all.js'
			}
		}
		
	});
	
	grunt.loadNpmTasks('assemble');

	grunt.registerTask('server', [
		'build',
		'connect:livereload',
		'watch'
	]);

	grunt.registerTask('build', [
		'clean:dist', 
		'assemble',
		'sass',
		'autoprefixer',
		'cssmin',
		'concat',
		'uglify'
	]);

	grunt.registerTask('default', [
		'build', 
	]);
	
};