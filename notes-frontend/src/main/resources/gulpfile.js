var gulp = require('gulp');
var typescript = require('gulp-typescript');

gulp.task('default', function() {
	var tsProject = typescript.createProject({
		target : 'es5',
		//module: 'system',
		sortOutput : true,
		outFile: "app.js"
	});
	return gulp.src("frontend/**/*.ts")
				.pipe(typescript(tsProject))
				.pipe(gulp.dest("static"));
});