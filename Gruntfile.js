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
		watch: {
			scripts: {
				files: ['wwwroot/components/**/*.js'],
				tasks: ['jshint'],
				options: {
				spawn: false,
				},
			}
		},
		browserSync: {
			proxy: 'localhost:3000',
			bsFiles: {
				src: [
					'wwwroot/components/index.html',
					'wwwroot/components/*/*.js',
					'wwwroot/components/*/*.html'
				]
			},
			options: {
				server: {
					baseDir: "wwwroot"
				}
			}
		}		
	});


	
	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');

	// Default task(s).
	grunt.registerTask('default', ['jshint']);

};

