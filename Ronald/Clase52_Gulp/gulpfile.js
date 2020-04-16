const gulp = require('gulp'),
      jshint = require('gulp-jshint'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify-es').default,
      sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      autoprefixer = require('gulp-autoprefixer'),
      imagemin = require('gulp-imagemin'),
      browserSync = require('browser-sync').create();

const files ={
    scssPath: "./app/*.scss",
    jsPath:"./app/*.js",
    imagePath:"./app/icons/*",
}

function style(){
    return gulp.src(files.scssPath)
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
          cascade:false
      }))
      .pipe(concat("bundle.css"))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist'))
      .pipe(browserSync.stream());
}

function lint() {
    return gulp.src(files.jsPath)
    .pipe(jshint({
        esnext: true
    }))
    .pipe(jshint.reporter('default'));
}

function js(){
    return gulp.src(files.jsPath)
      .pipe(sourcemaps.init())
      .pipe(concat('bundle.js'))
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist'))
      .pipe(browserSync.stream());
}

function image(){
    return gulp.src(files.imagePath)
    .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 5})
    ]))
    .pipe(gulp.dest('dist/icons'))
}

function watch(){
    browserSync.init({
        server: {
            baseDir: "./"
        },      
    });
    gulp.watch(files.scssPath, style);
    gulp.watch(files.jsPath, js);
    gulp.watch(files.imagePath, image);
    gulp.watch('./*.html').on('change', browserSync.reload); 
}

exports.lint = lint;
exports.style = style; 
exports.js = js;
exports.image = image;
exports.watch = watch;
