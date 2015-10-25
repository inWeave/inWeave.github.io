module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Watch and automatically build css and fonts
		watch : {
			options: {
				dateFormat: function(time) {
					grunt.log.writeln('Finished in ' + time + 'ms at' + (new Date()).toString());
					grunt.log.writeln('Keep it coming!!');
				}
			},
			stylus : {
				files: [
					'common/styles/*.styl'
				],
				tasks: ['stylus']
			}
		},

		// Build stylus files
		stylus: {
			compile: {
				options: {
					compress: false
				},
				files: {
					'common/styles/style-web.css': 'common/styles/style-web.styl'
				}
			}
		}

	});

	// Load the plugins
  	grunt.loadNpmTasks('grunt-webfont');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['stylus']);

};
