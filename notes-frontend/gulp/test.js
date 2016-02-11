'use strict';

var gulp = require('gulp');
var config = require('./config');
var proxyMiddleware = require('http-proxy-middleware');
var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');
var typescript = require('gulp-typescript');

gulp.task('test', function() {
  config.buildPath = config.testPath;
  gulp.run('default');

  var tsProject = typescript.createProject({
    target : 'es5',
    //module: 'system',
    sortOutput : true,
    outFile: "test.js"
  });

  return gulp.src(config.testSrcPath)
    .pipe(typescript(tsProject))
    .pipe(gulp.dest(config.buildPath));
});

gulp.task('testwatch', function() {
  config.buildPath = config.testPath;
  var server = {
    baseDir: config.buildPath
  };

  browserSync.instance = browserSync.init({
    startPath: '/test.html',
    server: server,
    port: 3003,
    ui: false
  });
  gulp.watch(config.srcPath + "/**", ['reloadTest']);
  gulp.watch(config.testSrcPath, ['reloadTest']);
})

gulp.task('reloadTest', ['test'], function() {
    browserSync.reload();
});

gulp.task('compileTypescript', function() {
  var tsProject = typescript.createProject({
    target : 'es5',
    //module: 'system',
    sortOutput : true,
    outFile: "app.js"
  });
  return gulp.src(config.srcPath + "/**/*.ts")
  .pipe(typescript(tsProject))
  .pipe(gulp.dest(config.buildPath));
});
