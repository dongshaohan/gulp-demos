var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var spriter = require("gulp-spriter");
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var argv = require('yargs').argv; // 自定义任务添加编译参数
var gulpif = require('gulp-if');

var paths = {
    
};

gulp.task('cssmin', function () {
    gulp.src(paths.cssAll)
    .pipe(minifyCss({
        keepSpecialComments: 0
    }))
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest('www/css'))
    .pipe(livereload());
});

gulp.task('uglify', function () {
    gulp.src(paths.scriptAll)
    .pipe(concat('all.min.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('www'))
    .pipe(livereload());
});

gulp.task('watch', function () {
    livereload.listen();

    gulp.watch(paths.cssAll, ['css']);
    gulp.watch(paths.listen, ['scripts']);
});

gulp.task('iconfont', function () {
    gulp.src(['./www/svg/*.svg'])
    .pipe(iconfontCss({
        fontName: 'firstPoint',
        path: './www/css/iconTemplate.css',
        targetPath: '../css/firstPoint.css',
        fontPath: '../fonts/'
    }))
    .pipe(iconfont({
        fontName: 'firstPoint',
        formats: ['ttf'],
        normalize: true
     }))
    .pipe(gulp.dest('./www/fonts/'));
});

gulp.task("sprite", function () {
    gulp.src("./www/src/css/style.css")
    .pipe(spriter({
        sprite: "sprite.png",
        slice: "./www/src/slice",
        outpath: "./www/src/debug-css/sprite"
    }))
    .pipe(gulp.dest('./www/src/debug-css'))
});

gulp.task("imagemin", function () {
    gulp.src("./www/img/*")
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest('./www/imagemin'))
});
