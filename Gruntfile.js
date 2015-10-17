module.exports = function(grunt) {
	'use strict';

	require('time-grunt')(grunt);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: ['Gruntfile.js', 'components/**/*.js'],
			options: {
				globals: {
				jQuery: true
				}
			}
		},		
		watch: {
			scripts: {
				files: ['components/**/*.js'],
				tasks: ['jshint'],
				options: {
				spawn: false,
				},
			}
		}
	});


	
	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	// Default task(s).
	grunt.registerTask('default', ['jshint']);

};

