/*
 * MongoSync
 * https://github.com/condenast/mongosync
 *
 * Copyright (c) 2013 Condé Nast. All rights reserved.
 */

module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'mongosync.js',
        'test/**/*js'
      ]
    },
    simplemocha: {
      options: {
        globals: ['should'],
        timeout: 3000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'tap'
      },
      all: {
        src: 'test/*back.js'
      }
    },
    mocha: {
      index: ['test/index.html'],
      options: {
        log: true,
        run: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-mocha');

  grunt.registerTask('default', ['jshint', 'simplemocha']);

  grunt.registerTask('test', ['simplemocha', 'mocha']);
};