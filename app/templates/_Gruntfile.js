'use strict';


var devDep = ['node_modules/*'];
for (var key in require('./package.json').devDependencies) {
	devDep.push('!node_modules/'+key);
}

module.exports = function (grunt) {

	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	grunt.initConfig({
		dirs: {
			app: './app',
			build: './build'
		},

		express: {
			options: {
				debug: true
			},
			app: {
				options: {
					script: '<%= dirs.app %>/server.js',
					node_env: 'development'
				}
			},
			build: {
				options: {
					script: '<%= dirs.build %>/server.js',
					node_env: 'production'
				}
			}
		},

		jshint: {
			options: { 
				jshintrc: '.jshintrc', 
				reporter: require('jshint-stylish') 
			},
			all: [
				'Gruntfile.js', 
				'<%= dirs.app %>/**/*.js'
			]
		},

		clean: {
			app: ['.tmp'],
			build: ['.tmp','<%= dirs.build %>/*','!<%= dirs.build %>/.git/*','!<%= dirs.build %>/.gitignore']
		},

		wiredep: {
			html: {
				src: ['<%= dirs.app %>/frontend/index.html'],
				ignorePath: /\.\.\/\.\.\//
			},
			sass: {
				src: ['<%= dirs.app %>/frontend/css/**.{scss,sass}'],
				ignorePath: /(\.\.\/\.\.\/){1,2}bower_components\//
			}
		},

		useminPrepare: {
			html: '<%= dirs.app %>/frontend/index.html',
			options: {
				flow: {
					html: {
						steps: {
							js: ['concat','uglifyjs'],
							css: ['cssmin']
						},
						post: {}
					}
				},
				dest: '<%= dirs.build %>/frontend'
			}
		},

		concurrent: {
			app: ['compass:app'],
			build: ['compass:build','imagemin','svgmin']
		},

		autoprefixer: {
			options: { 
				browsers: ['last 1 version'] 
			},
			css: { 
				files: [ { expand: true, cwd: '.tmp/css', src: '**/*.css', dest: '.tmp/css' } ] 
			}
		},

		ngAnnotate: {
			angular: {
				files: [{ expand: true, cwd: '.tmp/concat/js', src: ['scripts.js'], dest: '.tmp/concat/js' }]
			}
		},

		copy: {
			build: {
				files: [
					{
						expand: true,
						dot: true, 
						cwd: '<%= dirs.app %>/frontend',
						src: ['*.{ico,png,txt}','*.html','views/*.html','fonts/*'],
						dest: '<%= dirs.build %>/frontend'
					},
					{
						expand: true, 
						cwd: '.tmp/img', 
						dest: '<%= dirs.build %>frontend/img', 
						src: ['generated/*']
					},
					{
						expand: true,
						cwd: '.',
						src: devDep,
						dest: '<%= dirs.build %>'
					},
					{
						expand: true,
						cwd: '<%= dirs.app %>',
						src: 'config.json',
						dest: '<%= dirs.build %>'
					}
				]
			}
		},

		compass: { 
			app: {
				options: { 
					debugInfo: true 
				}
			}, 
			build: {
				options: { 
					generatedImagesDir: '<%= dirs.build %>/frontend/img/generated' 
				}
			}, 
			options : { 
				sassDir: '<%= dirs.app %>/frontend/css',
				cssDir: './.tmp/css',
				generatedImagesDir: './.tmp/img/generated',
				imagesDir: '<%= dirs.app %>/frontend/img',
				javascriptsDir: '<%= dirs.app %>/frontend/js',
				fontsDir: '<%= dirs.app %>/frontend/fonts',
				importPath: './bower_components',
				httpImagesPath: '/img',
				httpGeneratedImagesPath: '/img/generated',
				httpFontsPath: '/fonts',
				relativeAssets: false,
				assetCacheBuster: false,
				raw: 'Sass::Script::Number.precision = 10\n'
			}
		},

		watch: { 
			backend: { 
				files: [
					'<%= dirs.app %>/backend/{,*/}*.js',
					'<%= dirs.app %>/server.js',
					'<%= dirs.app %>/config.js'
				], tasks: [
					'newer:jshint:all', 'express:app'
				], 
				options: { 
					spawn: false 
				} 
			},
			packages: { 
				files: [
					'./bower.json', 
					'./package.json'
				], tasks: [
					'wiredep', 
					'express:app'
				] 
			},
			scripts : { 
				files: [
					'<%= dirs.app %>/frontend/js/**/*.js'
				], tasks: [
					'newer:jshint:all'
				] 
			},
			styles: { 
				files: [
					'<%= dirs.app %>/frontend/css/{,*/}*.{scss,sass}'
				], tasks: [
					'compass:app', 'autoprefixer'
				] 
			},
			gruntfile: { 
				files: [
					'Gruntfile.js'
				] 
			},
			html: { 
				files: [
					'<%= dirs.app %>/frontend/{,*/}*.html'
				]
			},
			options: { 
				livereload: true 
			}
		},

		uglify: {
			options: {
				mangle: false
			},
			backend: {
				files: [
					{
						expand: true,
						cwd: '<%= dirs.app %>/backend', 
						src: ['**/*.js'], 
						dest: '<%= dirs.build %>/backend' 
					},
					{
						expand: true, 
						cwd: '<%= dirs.app %>', 
						src: ['server.js'], 
						dest: '<%= dirs.build %>' 
					}
				]
			}
		},

		filerev: {
			build: {
				src: [
					'<%= dirs.build %>/frontend/js/{,*/}*.js',
					'<%= dirs.build %>/frontend/css/{,*/}*.css',
					'<%= dirs.build %>/frontend/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
				]
			}
		},

		usemin: {
			html: ['<%= dirs.build %>/frontend/{,*/}*.html'],
			css: ['<%= dirs.build %>/frontend/css/{,*/}*.css'],
			options: {
				assetsDirs: ['<%= dirs.build %>/frontend','<%= dirs.build %>/frontend/img']
			}
		},

		htmlmin: {
			build: {
				options: {
					collapseWhitespace: true,
					conservativeCollapse: true,
					collapseBooleanAttributes: true,
					removeCommentsFromCDATA: true, 
					removeOptionalTags: true
				},
				files: [
					{ 
						expand: true, 
						cwd: '<%= dirs.build %>/frontend', 
						src: ['*.html', 'views/{,*/}*.html'], 
						dest: '<%= dirs.build %>/frontend' 
					}
				]
			}
		},

		imagemin: {
			build: {
				files: [
					{
						expand: true, 
						cwd: '<%= dirs.app %>/frontend/img', 
						src: '{,*/}*.{png,jpg,jpeg,gif}',
						dest: '<%= dirs.build %>/frontend/img'
					}
				]
			}
		},

		svgmin: {
			options: {
				plugins: [
					{
						removeViewBox: false
					},
					{
						removeUselessStrokeAndFill: false
					},
					{
						removeEmptyAttrs: false
					}
				]
			},
			build: {
				files: [
					{
						expand: true, 
						cwd: '<%= dirs.app %>/frontend/img', 
						src: '{,*/}*.svg', 
						dest: '<%= dirs.build %>/frontend/img'
					}
				]
			}
		},

		editJson: {
			pkg : {
				action: 'remove',
				target: 'devDependencies',
				files: [{
					expand: true, 
					cwd: '.', 
					src: 'package.json',
					dest: '<%= dirs.build %>/package.json'
				}]
			}
		}
	});

	grunt.registerTask('default', ['newer:jshint:all','build']);
	grunt.registerTask('build', [
		'clean:build',
		'wiredep',
		'useminPrepare',
		'concurrent:build',
		'autoprefixer',
		'concat',
		'ngAnnotate',
		'copy:build',
		'cssmin',
		'uglify',
		'filerev',
		'usemin',
		'htmlmin',
		'editJson'		
	]);
	grunt.registerTask('serve', function (target) {
		if (target === 'production') {
			return grunt.task.run([
				'build',
				'express:build',
				'watch'
			]);
		}

		grunt.task.run([
			'clean:app',
			'wiredep',
			'concurrent:app',
			'autoprefixer',
			'express:app',
			'watch'
		]);
	});

	grunt.registerTask('editJson', 'Edit Json Files', function () {
		var jsonFile = require('./package.json');
		var newJsonFile = './build/package.json';
		delete jsonFile.devDependencies;
		grunt.file.write(newJsonFile, JSON.stringify(jsonFile, null, 4));
  		grunt.log.writeln('File "' + newJsonFile + '" created.');
	});
};
