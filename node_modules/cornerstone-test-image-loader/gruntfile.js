module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            default: {
                src: [
                    '../cornerstone-test-image-loader-build/*',
                    '!../cornerstone-test-image-loader-build/.git'
                ]
            }
        },
        copy: {
            bowercss: {
                src: [
                    'bower_components/bootstrap/dist/css/bootstrap.min.css',
                    'bower_components/cornerstone/dist/css/cornerstone.min.css',
                ],
                dest: '../cornerstone-test-image-loader-build/bower/css',
                expand: true,
                flatten: true
            },
            bowerjs: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/jquery/dist/jquery.min.map',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/cornerstone/dist/cornerstone.min.js',
                    'bower_components/cornerstoneTools/dist/cornerstoneTools.min.js',
                    'bower_components/cornerstoneMath/dist/cornerstoneMath.min.js',
                ],
                dest: '../cornerstone-test-image-loader-build/bower/js',
                expand: true,
                flatten: true
            },
            bowerfonts: {
                src: [
                    'bower_components/bootstrap/dist/fonts/*',
                ],
                dest: '../cornerstone-test-image-loader-build/bower/fonts',
                expand: true,
                flatten: true
            },
            dist: {
                src: [
                    'dist/*'
                ],
                dest: '../cornerstone-test-image-loader-build/',
                expand: true,
                flatten: true
            },
            html: {
                src: [
                    'examples/*',
                ],
                dest: '../cornerstone-test-image-loader-build/',
                expand: true,
                flatten: true
            },
            assets: {
                src: [
                    'assets/*',
                ],
                dest: '../cornerstone-test-image-loader-build/assets',
                expand: true,
                flatten: true
            }
        },
        concat: {
            build: {
                src : ['src/header.js', 'src/base64Images/*.js', 'src/*.js'],
                dest: 'build/built.js'
            },
            dist: {
                options: {
                    stripBanners: true,
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> ' +
                    '| (c) 2015 Chris Hafey | https://github.com/chafey/cornerstone-test-image-loader */\n'
                },
                src : ['build/built.js'],
                dest: 'dist/cornerstoneTestImageLoader.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/cornerstoneTestImageLoader.min.js': ['dist/cornerstoneTestImageLoader.js']
                }
            },
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> ' +
                '| (c) 2015 Chris Hafey | https://github.com/chafey/cornerstone-test-image-loader */\n'
            }
        },
        watch: {
            scripts: {
                files: ['src/*', 'examples/*', 'src/base64Images/*'],
                tasks: ['buildAll']
            }
        }

    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('buildAll', ['concat', 'uglify', 'copy']);
    grunt.registerTask('default', ['clean', 'buildAll']);
};


// Release process:
//  1) Update version numbers in package.json and bower.json
//  2) do a build (needed to update dist versions with correct build number)
//  3) commit changes
//      git commit -am "Changes...."
//  4) tag the commit
//      git tag -a 0.1.0 -m "Version 0.1.0"
//  5) push to github
//      git push origin master --tags