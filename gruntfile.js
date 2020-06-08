'use strict';

module.exports = function (grunt) {

    var srcDir = __dirname + '/';
    var destinationDir = '../../iobroker/'
    var pkg = grunt.file.readJSON('package.json');
    const webpackConfig = require('./webpack.config.js');

    // check arguments
    // Project configuration.
    grunt.initConfig({
        pkg: pkg,
        copy: {
            deployTestInstance: {
                files: [
                    // copy files to build directory
                    {
                        expand: true,
                        cwd: '',
                        src: ['**', '!src/**', '!node_modules/**'],
                        dest: destinationDir + 'node_modules/iobroker.yahka/'
                    }
                ]
            }
        },
        webpack: {
            webpackConfig
        },

        exec: {
            refreshIOBroker: {
                cwd: destinationDir,
                command: './iobroker upload yahka'
            },
            NPMPublish: {
                cwd: '',
                command: 'npm publish'
            },
            NPMBeta: {
                cwd: '',
                command: 'npm publish --tag beta'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('buildOnly', [
        'webpack',
    ]);

    grunt.registerTask('DeployToTest', [
        'copy:deployTestInstance',
        'exec:refreshIOBroker'
    ]);

    grunt.registerTask('BuildAndDeployToTest', [
        'webpack',
        'copy:deployTestInstance',
        'exec:refreshIOBroker'
    ]);

    grunt.registerTask('NPMPublish', [
        'webpack',
        'exec:NPMPublish'
    ])

    grunt.registerTask('NPMBeta', [
        'webpack',
        'exec:NPMBeta'
    ])
};