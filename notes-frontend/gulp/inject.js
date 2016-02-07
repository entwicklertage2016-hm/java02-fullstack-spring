var gulp = require('gulp');
var inject = require('gulp-inject');
var config = require('./config')
var bowerFiles = require('main-bower-files');

gulp.task('inject', function() {

    var injectOptions = {
        ignorePath: [config.srcPath],
        name: 'bower'
    }

    return gulp.src(config.srcPath + "/**/*.html")
                .pipe(inject(gulp.src(bowerFiles(), {read: false}), injectOptions))
                .pipe(gulp.dest(config.buildPath));
});
