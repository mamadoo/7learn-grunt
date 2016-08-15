module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			options: {
				separator: '\n\n/*--------Next File-------*/\n\n',
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */\n\n',
				footer: '\n\n/*------<%= pkg.author %>---------*/'
			},
			css: {
				src: ['development/css/css1.css', 'development/css/css2.css'],
				dest: 'final/css/final.css'
			},

			js: {
				src: ['development/js/js1.js', 'development/js/js2.js'],
				dest: 'final/js/final.js'
			}
		},

		uglify: {
			options: {
				mangle: false
			},
			js1: {
				files: {
					'final/js/js1.min.js': ['development/js/js1.js']
				}
			},
			js2: {
				files: {
					'final/js/js2.min.js': ['development/js/js2.js']
				}
			},
			all: {
				options: {
					sourceMap: true,
        			sourceMapName: 'final/js/all.min.js.map'
				},
				files: {
					'final/js/all.min.js': ['development/js/*.js']
				}
			}
		},

		cssmin: {
			options: {
				advanced: false,
				sourceMap: true,
        		sourceMapName: 'final/css/import.min.css.map'
			},
			all: {
				files: {
					'final/css/import.min.js': ['development/css/import.css']
				}
			}
		},

		coffee: {
			options: {
				bare: true,
				sourceMap: true,
				sourceMapDir: 'final/js/coffee.js.map'
			},
			compile: {
			    files: {
			      'final/js/coffee.js': ['development/coffee/coffee.coffee']
			    }
			}
		},

		less: {
			options: {
				compress: true,
				sourceMap: true,
				sourceMapFilename: 'final/css/less.css.map'
			},
			compile: {
				files: {
					'final/css/less.css': 'development/less/style.less'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-less');

	grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'coffee', 'less']);
};
