const gulp = require('gulp'),
      jshint = require('gulp-jshint'),
      concat = require('gulp-concat'),
      minify = require('gulp-minify'),
      cleanCSS = require('gulp-clean-css'),
      rename = require("gulp-rename");

function concatLinterMin() {
  return new Promise(function (res,rej){
    gulp.src('./js/*.js')
    .pipe(jshint({
      esversion: 8
    }))
    .pipe(jshint.reporter('default',{verbose: true}))
    .pipe(concat('all.js'))
    .pipe(minify())
    .pipe(gulp.dest('./dist'))
    res();
  })
}

function minifyCss() {
  return new Promise(function (res,rej){
    gulp.src('css/styles.css')
    .pipe(cleanCSS())
    .pipe(rename({suffix: '-min'}))
    .pipe(gulp.dest('dist'));
    res();
  })
}

function addWatchers() { 
  return new Promise(function (res,rej){
    gulp.watch('js/*.js', concatLinterMin); 
    gulp.watch('css/styles.css', minifyCss);
    res();
  })
}

gulp.task('concat-linter-min', concatLinterMin);
gulp.task('minify-css', minifyCss);

gulp.task('default', gulp.series(gulp.parallel('concat-linter-min', 'minify-css'), addWatchers));