//プラグイン読み込み
var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	plumber = require('gulp-plumber'),
	pleeease = require('gulp-pleeease'),
	cssmin = require('gulp-cssmin'),
	rename = require('gulp-rename'),
	uglify = require("gulp-uglify"),
	concat = require("gulp-concat");

//パスの設定
var path = {
    sass:'asset/sass/',
    css:'asset/css/',
    cssmin:'dist/css/',
    js:'asset/js/',
    jsmin:'dist/js/'
}

//sass
gulp.task('sass',function(){
    console.log('--------- sassを処理します ----------');
    sass(path.sass + '**/*.scss',{
        style : 'expanded',
        'sourcemap=none': true,
        compass: true
    })
    .pipe(plumber())
    .pipe(pleeease({
        autoprefixer: {
            'browsers': ['last 4 versions', 'ie 6', 'ie 7', 'ie 8', 'Safari 4', 'Android 2.3', 'iOS 4']
        },
        minifier: false
    }))
    .pipe(gulp.dest(path.css));
});

//cssmin
gulp.task('cssmin', function () {
    console.log('--------- cssをminifyします ----------');
    gulp.src(path.css + '**/*.css')
    .pipe(plumber())
    .pipe(cssmin())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest(path.cssmin));
});

//JavaScript
gulp.task('js', function() {
	console.log('--------- JavaScriptを処理します ----------');
    gulp.src([path.js + '**/_*.js'])
    .pipe(plumber())
    .pipe(concat('common.js'))
    .pipe(gulp.dest(path.js))
    .pipe(uglify())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest(path.jsmin));
});

//監視
gulp.task('watch', function() {
    gulp.watch((path.sass + '**/*.scss'), ['sass']);
    gulp.watch((path.css + '**/*.css'), ['cssmin']);
    gulp.watch((path.js + '**/*.js'), ['js']);
    //gulp.watch((src + '_ejs/**/*.ejs'), ['ejs']);
    //gulp.watch((src + 'img/**/*'), ['img']);
});
gulp.task('default', ['watch']);