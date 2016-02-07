var gulp = require("gulp");
var sass = require("gulp-sass");
var inject = require('gulp-inject');
var config = require("./config");
var wiredep = require("wiredep").stream;
var bowerFiles = require('main-bower-files');
var _ = require('lodash');

gulp.task('styles', function() {
    var sassOptions = {
        precision: 10
    }

    var wiredepConfig = {
        exclude: [/bootstrap.js$/, /bootstrap-sass-official\/.*\.js/, /bootstrap\.css/],
        directory: config.srcPath + "/lib"
    }

    var injectFiles = gulp.src([
        config.srcPath + "/**/*.scss",
        "!" + config.srcPath + "/lib/**",
        "!" + config.srcPath + "/style.scss",
    ], { read: false });

    var injectOptions = {
        transform: function(filePath) {
            filePath = filePath.replace(config.srcPath, '');
            return '@import "' + filePath + '";';
        },
        ignorePath: [config.srcPath],
        starttag: '// injector',
        endtag: '// endinjector'
    }

    gulp.src([
        config.srcPath + "/style.scss",
    ]).pipe(inject(injectFiles, injectOptions))
    .pipe(wiredep(_.extend({}, wiredepConfig)))
    .pipe(sass(sassOptions))
    .pipe(gulp.dest(config.buildPath));
})
