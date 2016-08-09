/**
 * @ngdoc gruntfile
 * @author <a href="fabricio.alessio@payu.com.br">Fabricio Alessio</a>
 * @author <a href="felipe.santos@payu.com.br">Felipe Borges</a>
 * @author <a href="flavio.machado@payu.com.br">Flavio Andrade</a>
 * @description
 * Configuration file that automatically generates common development tasks
 */

module.exports = function(grunt) {

	grunt.initConfig({
		copy: {
			app: {
				cwd: 'app',
				src: '**',
				dest: 'dist',
				expand: true
			}
		},
		clean: {
			dist: {
				src: 'dist'
			}
		},
		useminPrepare: {
			html: 'dist/**/*.html'
		},
		usemin: {
			html: 'dist/**/*.html'
		},
		rev: {
			options: {
				encoding: 'utf8',
				algorithm: 'md5',
				length: 8
			},
			minifieds: {
				src: ['dist/scripts/**/*.min.js', 'dist/styles/**/*.min.css']
			}
		},
		watch: {
			all: {
				files: ['app/scripts/**/*.js', 'app/styles/**/*.css', 'app/**/*.html'],
				tasks: 'default'
			},
			js: {
				files: 'app/scripts/**/*.js',
				tasks: 'jshint'
			}
		},
		jshint: {
			js: {
				src: ['app/scripts/**/*.js']
			}
		},
		browserSync: {
			app: {
				bsFiles: {
					src: ['app/**/*']
				},
				options: {
					watchTask: true,
					server: {
						baseDir: 'app',
				        routes: {
				            "/bower_components": "bower_components"
				        }
					}
				}
			}
		}

	});

	grunt.registerTask('dist', ['clean', 'copy']);
	grunt.registerTask('minify', ['useminPrepare', 'concat', 'uglify', 
		                          'cssmin', 'rev:minifieds', 'usemin']);
	grunt.registerTask('server', ['browserSync', 'watch:js']);

	grunt.registerTask('default', ['dist', 'minify']);

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-rev');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-browser-sync');
}