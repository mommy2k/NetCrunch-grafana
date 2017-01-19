module.exports = function(grunt) {
  "use strict";

  // Concat and Minify the src directory into dist
  grunt.registerTask('build', [
    'jshint:source',
    'jshint:tests',
    'jscs',
    'exec:tslint',
    'clean:release',
    'copy:node_modules',
    'copy:public_to_gen',
    'exec:tscompile',
    'karma:test',
    'phantomjs',
    'css',
    'htmlmin:build',
    'ngtemplates',
    'cssmin:build',
    'ngAnnotate:build',
    'systemjs:build',
    'concat:js',
    'filerev',
    'remapFilerev',
    'usemin',
    'uglify:genDir'
  ]);

  // task to add [[.AppSubUrl]] to reved path
  grunt.registerTask('remapFilerev', function() {
    var root = grunt.config().genDir;
    var summary = grunt.filerev.summary;
    var fixed = {};

    for(var key in summary){
      if(summary.hasOwnProperty(key)){
        var orig = key.replace(root, root+'/[[.AppSubUrl]]/public');
        var revved = summary[key].replace(root, root+'/[[.AppSubUrl]]/public');
        fixed[orig] = revved;
      }
    }

    grunt.filerev.summary = fixed;
  });

  grunt.registerTask('build-post-process', function() {
    grunt.config('copy.public_gen_to_temp', {
      expand: true,
      cwd: '<%= genDir %>',
      src: '**/*',
      dest: '<%= tempDir %>/public/'
    });
    grunt.config('copy.backend_bin', {
      cwd: 'bin',
      expand: true,
      src: ['*'],
      options: { mode: true},
      dest: '<%= tempDir %>/bin/'
    });
    grunt.config('copy.backend_files', {
      expand: true,
      src: ['conf/defaults.ini', 'conf/sample.ini', 'vendor/phantomjs/*', 'scripts/*'],
      options: { mode: true},
      dest: '<%= tempDir %>'
    });
    grunt.config('copy.netcrunch_plugin', {
      expand: true,
      src: ['data/plugins/grafana-netcrunch/**/*'],
      options: { mode: true},
      dest: '<%= tempDir %>'
    });
    grunt.config('copy.windows_installer', {
      cwd: '<%= tempDir %>',
      expand: true,
      src: ['**/*'],
      options: { mode: true},
      dest: '<%= windowsDestDir %>'
    });

    grunt.task.run('copy:public_gen_to_temp');
    grunt.task.run('copy:backend_bin');
    grunt.task.run('copy:backend_files');
    grunt.task.run('copy:netcrunch_plugin');
    grunt.task.run('copy:windows_installer');
  });

};
