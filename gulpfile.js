//プラグイン読み込み
var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	plumber = require('gulp-plumber'),
	pleeease = require('gulp-pleeease'),
	cssmin = require('gulp-cssmin'),
	rename = require('gulp-rename'),
    concat = require("gulp-concat"),
	uglify = require("gulp-uglify"),
    runSequence = require('run-sequence');

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
    return sass(path.sass + '**/*.scss',{
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

//css圧縮
gulp.task('cssmin', function () {
    return gulp.src(path.css + '**/*.css')
    .pipe(plumber())
    .pipe(cssmin())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest(path.cssmin));
});

//CSSの処理をまとめる
gulp.task('css', function(callback) {
    console.log('--------- CSSを処理します ----------');
    return runSequence(
        'sass',
        'cssmin',
        callback
    );
});

//JavaScript連結
gulp.task('concat', function() {
    return gulp.src([path.js + '**/_*.js'])
    .pipe(plumber())
    .pipe(concat('common.js'))
    .pipe(gulp.dest(path.js));
});

//JavaScript圧縮
gulp.task('uglify', function() {
    return gulp.src([path.js + '**/common.js'])
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest(path.jsmin));
});

//JavaScriptの処理をまとめる
gulp.task('js', function(callback) {
    console.log('--------- JavaScriptを処理します ----------');
    return runSequence(
        'concat',
        'uglify',
        callback
    );
});

//監視
gulp.task('watch', function() {
    gulp.watch((path.sass + '**/*.scss'), ['css']);
    gulp.watch((path.js + '**/_*.js'), ['js']);
    //gulp.watch((src + '_ejs/**/*.ejs'), ['ejs']);
    //gulp.watch((src + 'img/**/*'), ['img']);
});
gulp.task('default', ['watch']);