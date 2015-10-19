module.exports = function(grunt) {
	'use strict';

	require('time-grunt')(grunt);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: ['Gruntfile.js', 'wwwroot/components/**/*.js'],
			options: {
				globals: {
				jQuery: true
				}
			}
		},
		concat: {
			controllers: {
				// the files to concatenate
				src: ['wwwroot/components/**/controller.js'],
				// the location of the resulting JS file
				dest: 'wwwroot/dist/controllers.js'
			},
			directives: {
				// the files to concatenate
				src: ['wwwroot/components/**/directive.js'],
				// the location of the resulting JS file
				dest: 'wwwroot/dist/directives.js'
			},
			services: {
				// the files to concatenate
				src: ['wwwroot/components/utils/*.js'],
				// the location of the resulting JS file
				dest: 'wwwroot/dist/services.js'
			},
			factories: {
				// the files to concatenate
				src: ['wwwroot/components/**/factory.js'],
				// the location of the resulting JS file
				dest: 'wwwroot/dist/factories.js'
			}
		},
		connect: {
			server: {
				options: {
					port: 8000,
					base: 'wwwroot',
					keepalive: true
				}
			}
		},
    	watch: {
			scripts: {
				files: ['wwwroot/components/**/*.js'],
				tasks: ['jshint', 'concat'],
				options: {
					spawn: false,
				},
			}
		}		
	});


	
	// Plugins
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	
	// Task(s).
	grunt.registerTask('default', ['jshint', 'concat']);

};

