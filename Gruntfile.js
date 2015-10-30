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
					'styles/*.styl'
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
					'styles/style-web.css': 'styles/style-web.styl'
				}
			}
		},

		// Build webfont icons
		webfont: {
			icons: {
				src: 'icons/*.svg',
				dest: 'fonts',
				destCss: 'styles',
				options: {
					font: 'inweave-icons',
					destHtml: 'demos/',
					copy: false,
					templateOptions: {
						baseClass: 'inw__i',
						classPrefix: 'inw__i--'
					}
				}
			},
		}

	});

	// Load the plugins
  	grunt.loadNpmTasks('grunt-webfont');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['stylus','webfont']);

};
