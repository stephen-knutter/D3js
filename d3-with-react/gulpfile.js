let gulp = require('gulp');
let react = require('gulp-react');
let jshint = require('gulp-jshint');

let jsFiles = [
	'src/**/*.js',
	'build.js',
	'gulpfile.js',
	'webpack.config.js'
];

gulp.task('jshint', function(cb) {
	var stream = gulp.src(jsFiles)
		.pipe( react() )
		.pipe( jshint() )
		.pipe( jshint.reporter('jshint-stylish') );
	
	if (process.env.CI) {
		stream = stream.pipe( jshint.reporter('fail') );
	}
	
	stream.on('end', cb);
});

gulp.task('jshint-watch', ['jshint'], function(cb){
	gulp.watch(jsFiles, ['jshint']);
	
	cb();
	console.log('Watching files for changes...');
});

gulp.task('default', ['jshint']);