var gulp = require('gulp');
var wrench = require('wrench');
var typescript = require('gulp-typescript');
var config = require('./gulp/config')

/**
*  This will load all js or coffee files in the gulp directory
*  in order to load all gulp tasks
*/
wrench.readdirSyncRecursive('./gulp').filter(function (file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function (file) {
  require('./gulp/' + file);
});

/**
* Default task, builds typescript and copies stuff to src/main/resources/static
*/
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

gulp.task('copyStatic', function() {
  return gulp.src([
    "!" + config.srcPath + "/bower_components",
    "!" + config.srcPath + "/**/*.scss",
    "!" + config.srcPath + "/**/*.ts",
    "!" + config.srcPath + "/**/*.html",
    config.srcPath + "/**/*"
  ]).pipe(gulp.dest(config.buildPath));
})

gulp.task('default', ['compileTypescript', 'copyStatic', 'inject', 'styles', 'tsd:install'])
