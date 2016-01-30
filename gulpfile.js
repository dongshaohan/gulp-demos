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
    sass: ['./src/sass/ionic.scss'],
    css: ['./css/*.css'],
    scripts: ['./src/js/*.js']
};

gulp.task('sass', function () {
    gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('ionic.css'))
    .pipe(gulp.dest('./css'));
});

gulp.task('cssmin', function () {
    gulp.src(paths.css)
    .pipe(concat('ionic.min.css'))
    .pipe(minifyCss({
        keepSpecialComments: 0
    }))
    .pipe(gulp.dest('./cssmin'));
});

gulp.task('uglify', function () {
    gulp.src(paths.scripts)
    .pipe(concat('uglify.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./uglify'));
});

gulp.task('rename', function () {
    gulp.src('./uglify/all.min.js')
    .pipe(rename('rename.js'))
    .pipe(gulp.dest('./rename'));
});

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

gulp.task("sprite", function () {
    gulp.src("./src/sprite/css/style.css")
    .pipe(spriter({
        sprite: "sprite.png",
        slice: "./src/sprite/slice",
        outpath: "./cssSprite/sprite"
    }))
    .pipe(gulp.dest('./cssSprite'))
});

gulp.task("imagemin", function () {
    gulp.src("./src/sprite/slice/*")
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest('./imagemin'))
});

gulp.task('watch', function () {
    livereload.listen();

    gulp.watch(paths.cssAll, ['css']);
    gulp.watch(paths.listen, ['scripts']);
});

