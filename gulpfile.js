/*
 * gulp demo of project
 * @author dongsh
 * @time 2016-01-30
 */
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
var gulpif = require('gulp-if'); // 条件判断

// 源文件路径
var paths = {
    sass: ['./src/sass/ionic.scss'],
    css: ['./css/*.css'],
    scripts: ['./src/js/*.js']
};

// sass预编译任务
gulp.task('sass', function () {
    gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('ionic.css'))
    .pipe(gulp.dest('./css'));
});

// css文件压缩任务
gulp.task('cssmin', function () {
    gulp.src(paths.css)
    .pipe(concat('ionic.min.css'))
    .pipe(minifyCss({
        keepSpecialComments: 0
    }))
    .pipe(gulp.dest('./cssmin'));
});

// js文件压缩任务
gulp.task('uglify', function () {
    gulp.src(paths.scripts)
    .pipe(concat('uglify.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./uglify'));
});

// 文件名重命名任务
gulp.task('rename', function () {
    gulp.src('./uglify/all.min.js')
    .pipe(rename('rename.js'))
    .pipe(gulp.dest('./rename'));
});

// iconfont生成任务
gulp.task('iconfont', function () {
    gulp.src(['./src/font/svg/*.svg'])
    .pipe(iconfontCss({
        fontName: 'firstPoint',
        path: './src/font/iconTemplate.css',
        targetPath: './css/firstPoint.css',
        fontPath: '../'
    }))
    .pipe(iconfont({
        fontName: 'firstPoint',
        formats: ['ttf', 'eot', 'woff'],
        normalize: true
     }))
    .pipe(gulp.dest('./fonts/'));
});

// css sprite任务
gulp.task("sprite", function () {
    gulp.src("./src/sprite/css/style.css")
    .pipe(spriter({
        sprite: "sprite.png",
        slice: "./src/sprite/slice",
        outpath: "./cssSprite/sprite"
    }))
    .pipe(gulp.dest('./cssSprite'))
});

// 图片压缩任务
gulp.task("imagemin", function () {
    gulp.src("./src/sprite/slice/*")
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest('./imagemin'))
});

