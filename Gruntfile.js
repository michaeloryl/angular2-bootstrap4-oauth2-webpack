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
        copy: {
            bootstrapCss: {
                src: 'bootstrap/dist/css/bootstrap.css',
                dest: 'src/css/bootstrap.css'
            },
            bootstrapJs: {
                src: 'bootstrap/dist/js/bootstrap.js',
                dest: 'src/js/bootstrap.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-grunt');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-xmlpoke');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

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

};