var gulp 		= require('gulp');
var useref 		= require('gulp-useref');
var uglify 		= require('gulp-uglify');
var inject 		= require('gulp-inject');
var concat 		= require('gulp-concat'); 
var rename 		= require("gulp-rename");
var sass 		= require('gulp-sass');
var order 		= require('gulp-order');
let cleanCSS 	= require('gulp-clean-css');
//var webshot		= require('gulp-webshot');
var webshot =       require('webshot');


var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');


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
		'bower_components/Sortable/Sortable.js',
		'bower_components/jquery-unveil/jquery.unveil.js',
		'bower_components/jquery-prettyPhoto/js/jquery.prettyPhoto.js',
		'bower_components/wow/dist/wow.js',
		//'bower_components/select2/dist/js/select2.js',
		'bower_components/list.js/dist/list.js', 
		'bower_components/materialize/dist/js/materialize.js',
		'bower_components/clipboard/dist/clipboard.js',
		'bower_components/jquery-form-validator/form-validator/jquery.form-validator.js'
		];

var vendors_lite = [
		'bower_components/jquery/dist/jquery.js',
		//'bower_components/typed.js/lib/typed.js',
		//'bower_components/spectrum/spectrum.js',
		//'bower_components/owl.carousel/dist/owl.carousel.js',
		//'bower_components/sweetalert/dist/sweetalert-dev.js',
		//'bower_components/Sortable/Sortable.js',
		//'bower_components/jquery-unveil/jquery.unveil.js',
		//'bower_components/jquery-prettyPhoto/js/jquery.prettyPhoto.js',
		//'bower_components/wow/dist/wow.js',
		//'bower_components/select2/dist/js/select2.js',
		//'bower_components/list.js/dist/list.js', 
		//'bower_components/materialize/dist/js/materialize.js',
		//'bower_components/clipboard/dist/clipboard.js',
		//'bower_components/jquery-form-validator/form-validator/jquery.form-validator.js'
		];

var scripts = [
		'assets/scripts/aione-core.js',
		'assets/scripts/aione-forms.js',
		'assets/scripts/aione-layout.js',
		'assets/scripts/aione-components.js'
		];
var scripts_full = [
		'bower_components/jquery/dist/jquery.js',
		'assets/scripts/aione-core.js'
		];

var minscripts = [
		'../aioneframework.com/assets/js/ga.js'
		];

gulp.task('make-vendor-js', function() {  
    return gulp.src(vendors)
		.pipe(order(vendors,{ base: './' }))
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./assets/js/'))
        .pipe(rename('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./assets/js/'));
});

gulp.task('make-vendorlite-js', function() {  
    return gulp.src(vendors_lite)
		.pipe(order(vendors_lite,{ base: './' }))
        .pipe(concat('vendorlite.js'))
        .pipe(gulp.dest('./assets/js/'))
        .pipe(rename('vendorlite.min.js'))
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

gulp.task('make-full-js', function() {  
    return gulp.src(scripts_full)
		.pipe(order(scripts_full,{ base: './' }))
        .pipe(concat('aionefull.js'))
        .pipe(gulp.dest('./assets/js/'))
        .pipe(rename('aionefull.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./assets/js/'));
});

gulp.task('minjs', function() {  
    return gulp.src(minscripts)
		.pipe(order(minscripts,{ base: './' }))
        .pipe(gulp.dest('../aioneframework.com/assets/js/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('../aioneframework.com/assets/js/'));
});

gulp.task('css', function(){
		return gulp.src('./assets/scss/*.scss')
			.pipe(sass({"sourceComments": true}).on('error', sass.logError)) // Using gulp-sass
			//.pipe(postcss([ autoprefixer() ]))
			.pipe(cleanCSS({format: 'beautify'}))
    		.pipe(gulp.dest('./assets/css/'))
			.pipe(cleanCSS({compatibility: 'ie8'}))
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest('./assets/css/'));
});

gulp.task('wpcss', function(){
		return gulp.src(['./assets/css/*.css'])
		.pipe(gulp.dest('../../aione/wp-content/themes/aione/assets/css/'));
});
gulp.task('wpjs', function(){
		return gulp.src(['./assets/js/*.js'])
		.pipe(gulp.dest('../../aione/wp-content/themes/aione/assets/js/'));
});
gulp.task('cdn', function(){
		return gulp.src(['./assets/**/*'])
		.pipe(gulp.dest('../cdn/assets/'));
});




gulp.task('makecss', ['css']);
gulp.task('makejs', ['make-scripts', 'make-vendor-js', 'make-vendorlite-js', 'make-full-js']);
gulp.task('makecdn', ['cdn']);
gulp.task('make', ['makecss', 'makejs', 'minjs', 'makecdn']);

gulp.task('makewp', ['wpcss', 'wpjs']);


//BUILD

//gulp.task('build', ['makecss','makejs']);

// Default Task
//gulp.task('default', ['build']);
//
//
gulp.task('screenshots', function() {
	//console.log(process.argv);
	var arguments = process.argv;

	var source = arguments[3].replace('--source=','');
	var dest = arguments[4].replace('--dest=','');
	//var options = arguments[5].replace('--options=','');

	var options = {
	  renderDelay:3000,
	  screenSize: {
	    width: 1200,
	    height: 900
	  },
	  shotSize: {
	    width: 1200,
	    height: 900
	  },
	  userAgent: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36'
	};


    webshot(source,dest,options,function(err){
        console.log('Done');
    });
})

gulp.task('capture', ['screenshots']);

