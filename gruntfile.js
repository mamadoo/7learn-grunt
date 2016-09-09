module.exports = function (grunt) {

	require('time-grunt')(grunt);

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
					'final/css/import.min.css': ['development/css/import.css']
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
		},

		sass: {
			dist: {
				options: {
	        sourcemap: 'none',
	        style: 'compressed'
	      },
	      files: {
	        'final/css/sass.css': 'development/sass/compile.sass',
	        'final/css/scss.css': 'development/sass/compile.scss'
	      }
	    }
		},

		pug: {
			compile: {
				options: {
					data: {
						debug: false
					}
				},
				files: {
					'final/html/template.html': ['development/pug/template.pug']
				}
			},
			debug: {
		    options: {
		      data: {
		        debug: true
		      }
		    },
		    files: {
		      'final/html/debug.html': 'development/pug/template.pug'
		    }
		  },
		  release: {
		    options: {
		      data: {
		        debug: false
		      }
		    },
		    files: {
		      'final/html/release.html': 'development/pug/template.pug'
		    }
		  }
		},

		csslint: {
			options: {
				csslintrc: '.csslintrc'
			},
		  lint: {
		    src: ['final/css/final.css']
		  }
		},

		jshint: {
			options: {
				reporter: require('jshint-stylish'),
				force: true,
				jshintrc: true
			},
			hint: {
		    src: ['final/js/final.js']
		  }
		},

		autoprefixer: {
			prefix: {
				options: {
					browsers: 'Firefox >= 20, last 2 Chrome versions, ie 8'
				},
				files: {
					'final/css/prefix.css': 'development/css/prefix.css'
				}
			}
		},

		concurrent: {
        target: ['sass', 'coffee']
    },

		wiredep: {
			task: {
				src: ['final/index.html']
			}
		},

		responsive_images: {
			resize: {
				options: {
					sizes: [{
					  name: "small",
					  width: 240
					},{
					  name: "medium",
					  width: 480,
						quality: 60
					},{
					  name: "large",
					  width: 720,
						suffix: '_x2'
					}]
		    },
		    files: {
					'final/img/img1.jpg': 'development/img/img1.jpg',
		      'final/img/img2.png': 'development/img/img2.png'
		    }
			}
	  },

		clean: {
		  javascript: {
				options: {
					'no-write': true
				},
				src: ['development/toDelete/js']
			},
			stylesheet: {
				options: {
					'force': true
				},
				src: ['development/toDelete/css']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-pug');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-wiredep');
	grunt.loadNpmTasks('grunt-responsive-images');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'coffee', 'less', 'sass', 'pug', 'csslint', 'autoprefixer']);
	grunt.registerTask('lint', ['newer:csslint', 'newer:jshint']);
	grunt.registerTask('minify', ['newer:uglify', 'newer:cssmin']);
	grunt.registerTask('non-concurrent', ['sass', 'coffee']);
};
