var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var plumber = require('gulp-plumber');

//パスの設定
var path = {
    sass:'sass/',
    css:'dist/css/',
    cssmin:'src/css/min/'
}

//sass
gulp.task('sass',function(){
    sass(path.sass + '**/*.scss',{
        style : 'expanded',
        'sourcemap=none': true,
        compass: true
    })
    .pipe(plumber())
    .pipe(gulp.dest(path.css));
});

//監視
gulp.task('watch', function() {
    gulp.watch((path.sass + '**/*.scss'), ['sass']);
    //gulp.watch((src + '_ejs/**/*.ejs'), ['ejs']);
    //gulp.watch((src + '_js/**/*.js'), ['concat']);
    //gulp.watch((src + 'img/**/*'), ['img']);
});
gulp.task('default', ['watch']);