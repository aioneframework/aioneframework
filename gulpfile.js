var gulp 		= require('gulp');
var useref 		= require('gulp-useref');
var uglify 		= require('gulp-uglify');
var inject 		= require('gulp-inject');
var concat 		= require('gulp-concat'); 
var rename 		= require("gulp-rename");
var sass 		= require('gulp-sass');
var order 		= require('gulp-order');
let cleanCSS 	= require('gulp-clean-css');

/*gulp.task('inject', function(){
	var target = gulp.src('index.html');
	var sources = gulp.src(['../assets/js/*.js'], {read: false});
	 
	return target.pipe(inject(sources)).pipe(gulp.dest('./dist'));
});*/

//var mainjs = './../assets/js/main.js';
//var mainjsmin = './../assets/js/main.min.js';

var vendors = [
		'bower_components/jquery/dist/jquery.js',
		'bower_components/typed.js/lib/typed.js',
		'bower_components/spectrum/spectrum.js',
		'bower_components/owl.carousel/dist/owl.carousel.js',
		'bower_components/sweetalert/dist/sweetalert-dev.js',
		//'bower_components/select2/dist/js/select2.js',
		'bower_components/list.js/dist/list.js',
		'bower_components/jquery-form-validator/form-validator/jquery.form-validator.js'
		];

var scripts = [
		'assets/scripts/aione-core.js'
		];


gulp.task('test-vendor-js', function() {  
    return gulp.src(vendors)
		.pipe(order(vendors,{ base: './' }))
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./test/js/'))
        .pipe(rename('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./assets/test/js/'));
});
gulp.task('test-scripts', function() {  
    return gulp.src(scripts)
		.pipe(order(scripts,{ base: './' }))
        .pipe(concat('aione.js'))
        .pipe(gulp.dest('./test/js/'))
        .pipe(rename('aione.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./assets/test/js/'));
});

gulp.task('make-vendor-js', function() {  
    return gulp.src(vendors)
		.pipe(order(vendors,{ base: './' }))
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./assets/js/'))
        .pipe(rename('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./assets/js/'));
});
gulp.task('make-scripts', function() {  
    return gulp.src(scripts)
		.pipe(order(scripts,{ base: './' }))
        .pipe(concat('aione.js'))
        .pipe(gulp.dest('./assets/js/'))
        .pipe(rename('aione.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./assets/js/'));
});

gulp.task('makecss', function(){
		return gulp.src('./assets/scss/*.scss')
			.pipe(sass()) // Using gulp-sass
			.pipe(cleanCSS({format: 'beautify'}))
    		.pipe(gulp.dest('./assets/css/'))
			.pipe(cleanCSS({compatibility: 'ie8'}))
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest('./assets/css/'));
});

gulp.task('testcss', function(){
		return gulp.src('./assets/scss/*.scss')
			.pipe(sass()) // Using gulp-sass
			.pipe(cleanCSS({format: 'beautify'}))
    		.pipe(gulp.dest('./assets/test/css/'));
});

gulp.task('automakecss', function () {
  gulp.watch('./../public/../scss/**/*.scss', ['makecss']);
});

gulp.task('testjs', ['test-scripts', 'test-vendor-js']);

gulp.task('makejs', ['make-scripts', 'make-vendor-js']);

gulp.task('make', ['makecss', 'makejs']);


//BUILD

//gulp.task('build', ['makecss','makejs']);

// Default Task
//gulp.task('default', ['build']);