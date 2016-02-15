//プラグイン読み込み
var gulp = require('gulp'),
    del = require('del'),
    plumber = require('gulp-plumber'),
	sass = require('gulp-ruby-sass'),
	pleeease = require('gulp-pleeease'),
	cssmin = require('gulp-cssmin'),
	rename = require('gulp-rename'),
    concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
    gulpif = require('gulp-if'),
    ejs = require('gulp-ejs'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    runSequence = require('run-sequence'),
    mainBowerFiles= require('main-bower-files');

//bowerファイル格納
var files = mainBowerFiles();

//パスの設定
var path = {
    root: 'dist/',
    sass: 'asset/sass/',
    css: 'asset/css/',
    cssmin: 'dist/asset/css/',
    csslib: 'asset/lib/css/',
    csslibmin: 'dist/asset/lib/css/',
    js: 'asset/js/',
    jsmin: 'dist/asset/js/',
    jslib: 'asset/lib/js/',
    jslibmin: 'dist/asset/lib/js/',
    ejs: 'asset/ejs/',
    img: 'asset/img/',
    imgmin: 'dist/asset/img/',
    tmp: 'asset/tmp/'
}

//------------------------------------------------------
//削除処理
//------------------------------------------------------
//一時ファイルの削除
gulp.task("clean", function () {
    del([path.tmp]);
});

//------------------------------------------------------
//CSSの処理
//------------------------------------------------------
//Sass
gulp.task('sass',function(){
    return sass(path.sass + '**/*.scss',{
        style : 'expanded',
        'sourcemap=none': true,
        compass: true
    })
    .pipe(plumber())
    .pipe(pleeease({
        autoprefixer: {
            'browsers': ['last 4 versions', 'ie 8', 'Safari 4', 'Android 2.3', 'iOS 4']
        },
        minifier: false
    }))
    .pipe(gulp.dest(path.css));
});

//CSS圧縮
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
    return runSequence('sass','cssmin',callback);
});

//------------------------------------------------------
//JavaScriptの処理
//------------------------------------------------------
//JavaScript連結
gulp.task('concat', function() {
    return gulp.src([path.js + '**/*.js'])
    .pipe(plumber())
    .pipe(concat('common.js'))
    .pipe(gulp.dest(path.tmp));
});

//JavaScript圧縮
gulp.task('uglify', function() {
    return gulp.src([path.tmp + '**/common.js'])
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
    return runSequence('concat','uglify','clean',callback);
});

//------------------------------------------------------
//HTMLの処理
//------------------------------------------------------
//ejs
gulp.task('ejs', function() {
    console.log('--------- ejsをHTMLに変換します ----------');
    return gulp.src([path.ejs + '**/*.ejs','!' + path.ejs + '**/_*.ejs'])
    .pipe(plumber())
    .pipe(ejs({}, {ext: '.html'}))
    .pipe(gulp.dest(path.root));
});

//------------------------------------------------------
//画像の処理
//------------------------------------------------------
//画像圧縮
gulp.task('imagemin', function() {
    return gulp.src([path.img + '**/*.+(jpg|jpeg|png|gif|svg)'])
    .pipe(plumber())
    .pipe(imagemin({
        progressive: true,
        use: [pngquant({quality: '65-80', speed: 1})]
    }))
    .pipe(gulp.dest(path.imgmin));
});

//画像の処理をまとめる
gulp.task('img', function(callback) {
    console.log('--------- 画像を処理します ----------');
    return runSequence('imagemin',callback);
});

//------------------------------------------------------
//ライブラリの処理
//------------------------------------------------------
//ライブラリを連結して一時フォルダに保存
gulp.task('bowerConcat', function() {
    return gulp.src(files)
    .pipe(plumber())
    .pipe(gulpif(function(file) {
        return file.path.substr(-4) === '.css';
    }
    ,concat('bower_components.css')
    ,concat('bower_components.js')
    ))
    .pipe(gulp.dest(path.tmp))
});

//JSライブラリの圧縮
gulp.task('bowerUglify', function() {
    return gulp.src([path.tmp + '**/bower_components.js'])
    .pipe(plumber())
    .pipe(uglify({
        preserveComments: 'some'
    }))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest(path.jslib))
    .pipe(gulp.dest(path.jslibmin));
});

//CSSライブラリの圧縮
gulp.task('bowerCssmin', function () {
    return gulp.src(path.tmp + '**/bower_components.css')
    .pipe(plumber())
    .pipe(cssmin())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest(path.csslib))
    .pipe(gulp.dest(path.csslibmin));
});

//ライブラリの処理をまとめる
gulp.task('bower', function(callback) {
    console.log('--------- ライブラリを処理します ----------');
    return runSequence('bowerConcat',['bowerUglify','bowerCssmin'],'clean',callback);
});

//------------------------------------------------------
//タスクの監視
//------------------------------------------------------
//監視
gulp.task('watch', function() {
    gulp.watch((path.sass + '**/*.scss'), ['css']);
    gulp.watch((path.js + '**/*.js'), ['js']);
    gulp.watch((path.ejs + '**/*.ejs'), ['ejs']);
    gulp.watch((path.img + '**/*.+(jpg|jpeg|png|gif|svg)'), ['img']);
    gulp.watch((files), ['bower']);
});
gulp.task('default', ['watch']);