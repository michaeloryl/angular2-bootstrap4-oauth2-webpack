/*jshint indent:4 */
// Generated on 2014-05-07 using generator-angular 0.8.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Project settings
        yeoman: {
            // configurable paths
            app: 'app',
            dist: 'dist',
            phonegap: 'www'
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['bowerInstall']
            },
            scss: {
                files: ['<%= yeoman.app %>/scss/**/*.scss'],
                tasks: ['shell:scss']
            },
            styles: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: '0.0.0.0',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%= yeoman.app %>'
                    ]
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '.tmp',
                        'test',
                        '<%= yeoman.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    base: '<%= yeoman.dist %>'
                }
            }
        },



        // Empties folders to start fresh
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= yeoman.dist %>/*',
                            '!<%= yeoman.dist %>/.git*'
                        ]
                    }
                ]
            },
            phonegap: ['<%= yeoman.phonegap %>/*', '!<%= yeoman.phonegap %>/config.xml', '!<%= yeoman.phonegap %>/res'],
            server: '.tmp'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/styles/',
                        src: '{,*/}*.css',
                        dest: '.tmp/styles/'
                    }
                ]
            }
        },

        // Automatically inject Bower components into the app
        bowerInstall: {
            app: {
                src: ['<%= yeoman.app %>/index.html'],
                ignorePath: '<%= yeoman.app %>/',
                exclude: [/bootstrap\.css/, /material\.css/]

            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= yeoman.dist %>/styles/fonts/*'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/**/*.css'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>']
            }
        },

        // The following *-min tasks produce minified files in the dist folder
        cssmin: {
            options: {
                root: '<%= yeoman.app %>'
            }
        },

        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        src: '{,*/}*.{png,jpg,jpeg,gif}',
                        dest: '<%= yeoman.dist %>/images'
                    }
                ]
            }
        },

        svgmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        src: '{,*/}*.svg',
                        dest: '<%= yeoman.dist %>/images'
                    }
                ]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.dist %>',
                        src: ['*.html', 'views/{,*/}*.html'],
                        dest: '<%= yeoman.dist %>'
                    }
                ]
            }
        },

        // ng-annotate tries to make the code safe for minification automatically by
        // using the Angular long form for dependency injection. It doesn't work on
        // things like resolve or inject so those have to be done manually.
        'ngAnnotate': {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/concat/scripts',
                        src: '*.js',
                        dest: '.tmp/concat/scripts'
                    }
                ]
            }
        },

        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            '*.html',
                            'views/**/*.html',
                            'images/{,*/}*.{webp}',
                            'fonts/*',
                            'css/*',
                            'data/**/*'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '.tmp/images',
                        dest: '<%= yeoman.dist %>/images',
                        src: ['generated/*']
                    }
                ]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            },
            phonegap: {
                expand: true,
                cwd: '<%= yeoman.app %>',
                dest: '<%= yeoman.phonegap %>',
                src: '**'
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'copy:styles',
                'imagemin',
                'svgmin'
            ]
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },

        // SHELL
        shell: {
            phonegapPluginInstall: {
                command: '. cordova_install_plugins'
            },
            phonegapBuild: {
                command: 'cordova build'
            },
            phonegapBuildRelease: {
                command: 'cordova build --release'
            },
            phonegapPrepareRelease: {
                command: 'cordova prepare --release'
            },
            phonegapCompileRelease: {
                command: 'cordova compile --release'
            },
            phonegapRunAndroid: {
                command: 'cordova run android --device'
            },
            phonegapRunAndroidRelease: {
                command: 'cordova run android --device --release'
            },
            phonegapRunIos: {
                command: 'cordova run ios --device'
            },
            phonegapEmulateIos6: {
                command: 'cordova emulate ios --target="iPhone-6"'
            },
            phonegapEmulateIos5s: {
                command: 'cordova emulate ios --target="iPhone-5s"'
            },
            phonegapRunIosRelease: {
                command: 'cordova run ios --device --release'
            },
            phonegapEmulateAndroid: {
                command: 'cordova emulate android'
            },
            adbInstallRelease: {
                command: 'adb install -r platforms/android/ant-build/MyAppName-release.apk'
            },
            scss: {
                command: '/usr/local/bin/scss app/scss/foundation.scss app/css/foundation.css'
            }
        },

        // BUMP
        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: ['pkg'],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json', 'config.xml', 'app/views/aboutView.html'], // '-a' for all files
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: false,
                pushTo: 'origin',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
            }
        },

        // XMLPOKE
        xmlpoke: {
            versionname: {
                options: {
                    xpath: ['/widget/@version'],
                    value: '<%= pkg.version %>'
                },
                files: {'config.xml': 'config.xml'}
            }
        },

        // STRING-REPLACE
        'string-replace': {
            about: {
                options: {
                    replacements: [
                        {
                            pattern: /<span id="p9-version">v[0-9\.]*?<\/span>/ig,
                            replacement: '<span id="p9-version">v<%= pkg.version %></span>'
                        }
                    ]
                },
                files: {
                    'app/views/aboutView.html': 'app/views/aboutView.html'

                }
            },
            appName: {
                options: {
                    replacements: [
                        {
                            pattern: /<name>.*?<\/name>/ig,
                            replacement: '<name><%= pkg.p9AppName %></name>'
                        },
                        {
                            pattern: /<span id="p9-appName">.*?<\/span>/ig,
                            replacement: '<span id="p9-appName"><%= pkg.p9AppName %></span>'
                        }
                    ]
                },
                files: {
                    'config.xml': 'config.xml',
                    'app/views/headerView.html': 'app/views/headerView.html',
                    'app/views/slidingHeaderView.html': 'app/views/slidingHeaderView.html',
                    'app/views/aboutView.html': 'app/views/aboutView.html'

                }
            },
            androidVersionCode: { // update the version code stored in config.xml
                options: {
                    replacements: [
                        {
                            pattern: /android-versionCode=['"](\d*)['"]/ig,
                            replacement: function (match, p1, offset, string) {
                                var pkg = grunt.file.readJSON('package.json');
                                grunt.log.writeln("pkg.androidVersionCode: " + pkg.androidVersionCode);
                                grunt.log.writeln('Returning: ' + 'android-versionCode="' + pkg.androidVersionCode + '"');
                                return 'android-versionCode="' + pkg.androidVersionCode + '"';
                            }
                        }
                    ]
                },
                files: {
                    'config.xml': 'config.xml'
                }
            },
            versionCode: { // update the version code stored in package.json
                options: {
                    replacements: [
                        {
                            pattern: /['"]androidVersionCode['"]:.*?['"](\d*)['"]/ig,
                            replacement: function (match, p1, offset, string) {
                                return '"androidVersionCode": "' + (parseInt(p1) + 1) + '"';
                            }
                        }
                    ]
                },
                files: {
                    'package.json': 'package.json'
                }
            }


        }

    })
    ;

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'bowerInstall',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'connect:test',
        'karma'
    ]);

    // increment version in package.json, push it into Cordova's config.xml and About page, tag and commit the current codebase
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

    grunt.registerTask('build', 'build task', function (target) {
        target = target || 'dev';
        if (target === 'phonegap') {
            grunt.task.run([
                'clean:phonegap',
                'copy:phonegap',
                'shell:phonegapBuild'
            ]);
        } else if (target === 'phonegapRelease') {
            grunt.task.run([
                'clean:phonegap',
                'build:dist',
                'copy:phonegap',
                'shell:phonegapPrepareRelease',
                'string-replace:androidVersionCode',
                'shell:phonegapCompileRelease'
            ]);
        } else if (target === 'runAndroid') {
            grunt.task.run([
                'clean:phonegap',
                'copy:phonegap',
                'shell:phonegapRunAndroid'
            ]);
        } else if (target === 'runIos') {
            grunt.task.run([
                'clean:phonegap',
                'copy:phonegap',
                'shell:phonegapRunIos'
            ]);
        } else if (target === 'emulateIos5s') {
            grunt.task.run([
                'clean:phonegap',
                'copy:phonegap',
                'shell:phonegapEmulateIos5s'
            ]);
        } else if (target === 'emulateIos6') {
            grunt.task.run([
                'clean:phonegap',
                'copy:phonegap',
                'shell:phonegapEmulateIos6'
            ]);
        } else if (target === 'runAndroidRelease') {
            grunt.task.run([
                'clean:phonegap',
                'copy:phonegap',
                'shell:phonegapRunAndroidRelease'
            ]);
        } else if (target === 'emulateAndroid') {
            grunt.task.run([
                'clean:phonegap',
                'copy:phonegap',
                'shell:phonegapEmulateAndroid'
            ]);
        } else {
            grunt.task.run([
                'clean:dist',
                'bowerInstall',
                'useminPrepare',
                'concurrent:dist',
                'autoprefixer',
                'concat',
                'ngAnnotate',
                'copy:dist',
                'cdnify',
                'cssmin',
                'uglify',
                'rev',
                'usemin',
                'htmlmin',
                'string-replace:versionCode'
            ]);
        }
    });

    grunt.registerTask('default', [
        'test',
        'build'
    ]);

    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-xmlpoke');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-ng-annotate');}
;
