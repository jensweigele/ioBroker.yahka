'use strict';

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
                    { expand: true, src: ['*.png', 'io-package.json', 'package.json', 'lib/**', 'admin/**', '!**/*.ts', 'README.md'], dest: 'build/' }
                ]
            },
            deployTestInstance: {
                files: [
                    // copy files to build directory
                    { expand: true, cwd: 'build', src: ['**'], dest: '../ioBroker/node_modules/iobroker.yahka/' }
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
        },

        exec: {
            refreshIOBroker: {
                cwd: '../iobroker',
                command: 'iobroker.bat upload yahka'
            },
            NPMPublish: {
                cwd: 'build',
                command: 'npm publish'
            }

        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('buildOnly', [
        'clean:build',
        'ts:build',
        'clean:ts_nodeModules',
        'copy:build'
    ]);

    grunt.registerTask('DeployToTest', [
        'copy:deployTestInstance',
        'exec:refreshIOBroker'
    ]);

    grunt.registerTask('BuildAndDeployToTest', [
        'clean:build',
        'ts:build',
        'clean:ts_nodeModules',
        'copy:build',
        'copy:deployTestInstance',
        'exec:refreshIOBroker'
    ]);

    grunt.registerTask('NPMPublish', [
        'clean:build',
        'ts:build',
        'clean:ts_nodeModules',
        'copy:build',
        'exec:NPMPublish'        
    ])
};