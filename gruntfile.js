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
            build: ['build/**/*.*'],
            ts_nodeModules: ['build/node_modules']
        },

        ts: {
            build: {
                tsconfig: true
            }
        },

        exec: {
            refreshIOBroker: {
                cwd: '../iobroker/',
                command: 'iobroker.bat upload yahka'
            },
            NPMPublish: {
                cwd: 'build',
                command: 'npm publish'
            },
            NPMBeta: {
                cwd: 'build',
                command: 'npm publish --tag beta'
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
        'replace',
        'copy:build'
    ]);
    grunt.registerTask('replace', function () {
        var file = require('fs').readFileSync('./build/admin/yahka.admin.js');
        file = file.toString().replace('Object.defineProperty(exports, "__esModule", { value: true });', '').replace('var $ = require("jquery");', '');
        require('fs').writeFileSync('./build/admin/yahka.admin.js', file);   
    });
    
    grunt.registerTask('DeployToTest', [
        'copy:deployTestInstance',
        'exec:refreshIOBroker'
    ]);

    grunt.registerTask('BuildAndDeployToTest', [
        'clean:build',
        'ts:build',
        'clean:ts_nodeModules',
        'replace',
        'copy:build',
        'copy:deployTestInstance',
        'exec:refreshIOBroker'
    ]);

    grunt.registerTask('NPMPublish', [
        'clean:build',
        'ts:build',
        'clean:ts_nodeModules',
        'replace',
        'copy:build',
        'exec:NPMPublish'        
    ])

    grunt.registerTask('NPMBeta', [
        'clean:build',
        'ts:build',
        'clean:ts_nodeModules',
        'replace',
        'copy:build',
        'exec:NPMBeta'        
    ])
};