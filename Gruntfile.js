/**
 * Created with IntelliJ IDEA.
 * User: mfo
 * Date: 12/24/15
 * Time: 9:18 AM
 */
module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'qunit']
        },
        grunt: {
            'bootstrap': {
                gruntfile: 'bootstrap/Gruntfile.js',
                tasks: ['dist']
            }
        },
        compress: {
            main: {
                options: {
                    archive: 'site.zip'
                },
                files: [
                    {expand: true, cwd: 'src/', src: ['index.html', 'config.json'], dest: ''},
                    {expand: true, cwd: 'src/', src: 'lib/**', dest: ''},
                    {expand: true, src: '__build__/**', dest: ''}
                ]
            }
        },
        shell: {
            options: {
                stderr: false
            },
            webpack: {
                command: 'webpack --config webpack.config.js',
            },
            webpackProd: {
                command: 'webpack --config webpack.prod.config.js'
            }
        },
        copy: {
            bootstrapCss: {
                src: 'bootstrap/dist/css/bootstrap.css',
                dest: 'src/css/bootstrap.css'
            },
            bootstrapJs: {
                src: 'bootstrap/dist/js/bootstrap.js',
                dest: 'src/lib/bootstrap/bootstrap.js'
            },
            configgoogle: {
                src: 'config/config.google.json',
                dest: 'src/config.json'
            },
            configlocal: {
                src: 'config/config.local.json',
                dest: 'src/config.json'
            },
            configdev: {
                src: 'config/config.dev.json',
                dest: 'src/config.json'
            },
            configtest: {
                src: 'config/config.test.json',
                dest: 'src/config.json'
            },
            configprod: {
                src: 'config/config.prod.json',
                dest: 'src/config.json'
            }
        }
    });

    grunt.loadNpmTasks('grunt-grunt');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-xmlpoke');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('bootstrap', 'build bootstrap and copy files into project', function (target) {
        grunt.task.run(['grunt:bootstrap', 'copy:bootstrapCss', 'copy:bootstrapJs']);
    });

    grunt.registerTask('version', 'update version and tag release', function (target) {
        target = target || 'patch';

        if (target === 'patch') {
            grunt.task.run([
                'bump-only'
            ])
        } else {
            grunt.task.run([
                'bump-only:' + target
            ])
        }
        grunt.task.run([
            'string-replace:about',
            'xmlpoke:versionname',
            'bump-commit'
        ])
    });

    grunt.registerTask('env', 'change environment to run the Angular app', function (target) {
        target = target || 'dev';

        grunt.task.run([
            'copy:config' + target
        ])
    });

    grunt.registerTask('build', 'change environment to run the Angular app', function (target) {
        target = target || 'dev';

        if (target === 'prod') {
            grunt.task.run([
                'env:prod',
                'shell:webpackProd',
                'compress'
            ])
        } else {
            grunt.task.run([
                'shell:webpack',
                'compress'
            ])
        }

    });

};