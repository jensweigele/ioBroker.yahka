'use strict';

module.exports = function(grunt) {

    var srcDir = __dirname + '/';
    var destinationDir = '../../iobroker/'
    var pkg = grunt.file.readJSON('package.json');

    // check arguments
    // Project configuration.
    grunt.initConfig({
        pkg: pkg,
        copy: {
            build: {
                files: [
                ]
            },
            deployTestInstance: {
                files: [
                    // copy files to build directory
                    { expand: true, cwd: '', src: ['**', '!src/**', '!node_modules/**'], dest: destinationDir + 'node_modules/iobroker.yahka/' }
                ]

            }
        },

        clean: {
                build: ['yahka.*.js', 'main.js', 'admin/yahka.*.js']
        },

        ts: {
            build: {
                tsconfig: true
            }
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
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('buildOnly', [
        'clean:build',
        'ts:build',
        'replace',
        'copy:build'
    ]);
    grunt.registerTask('replace', function () {
        var file = require('fs').readFileSync('./admin/yahka.admin.js');
        file = file.toString().replace('Object.defineProperty(exports, "__esModule", { value: true });', '').replace('var $ = require("jquery");', '');
        require('fs').writeFileSync('./admin/yahka.admin.js', file);   
    });
    
    grunt.registerTask('DeployToTest', [
        'copy:deployTestInstance',
        'exec:refreshIOBroker'
    ]);

    grunt.registerTask('BuildAndDeployToTest', [
        'clean:build',
        'ts:build',
        'replace',
        'copy:build',
        'copy:deployTestInstance',
        'exec:refreshIOBroker'
    ]);

    grunt.registerTask('NPMPublish', [
        'clean:build',
        'ts:build',
        'replace',
        'copy:build',
        'exec:NPMPublish'        
    ])

    grunt.registerTask('NPMBeta', [
        'clean:build',
        'ts:build',
        'replace',
        'copy:build',
        'exec:NPMBeta'        
    ])
};