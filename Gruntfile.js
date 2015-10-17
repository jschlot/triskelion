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
		}		
	});


	
	// Plugins
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	// Task(s).
	grunt.registerTask('default', ['jshint']);

};

