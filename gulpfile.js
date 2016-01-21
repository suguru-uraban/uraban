var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var plumber = require('gulp-plumber');
var pleeease = require('gulp-pleeease');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

//パスの設定
var path = {
    sass:'sass/',
    css:'asset/css/',
    cssmin:'dist/css/'
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

//監視
gulp.task('watch', function() {
    gulp.watch((path.sass + '**/*.scss'), ['sass']);
    gulp.watch((path.css + '**/*.css'), ['cssmin']);
    //gulp.watch((src + '_ejs/**/*.ejs'), ['ejs']);
    //gulp.watch((src + '_js/**/*.js'), ['concat']);
    //gulp.watch((src + 'img/**/*'), ['img']);
});
gulp.task('default', ['watch']);