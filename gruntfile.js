"use strict";

module.exports = function(grunt) {

    var srcDir = __dirname + '/';
    var pkg = grunt.file.readJSON('package.json');

    // check arguments
    // Project configuration.
    grunt.initConfig({
        pkg: pkg,
        copy: {
            build: {
                files: [
                    // copy files to build directory
                    { expand: true, src: ['*.png', 'io-package.json', 'package.json', 'lib/**', 'admin/**', '!**/*.ts'], dest: 'build/' }
                ]
            }
        },

        clean: {
            build: ['build'],
            ts_nodeModules: ['build/node_modules']
        },

        ts: {
            build: {
                tsconfig: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-ts');

    grunt.registerTask('default', [
        'clean:build',
        'ts:build',
        'clean:ts_nodeModules',
        'copy:build'
    ]);
};