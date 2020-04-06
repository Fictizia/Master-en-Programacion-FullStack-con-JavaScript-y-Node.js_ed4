const gulp = require('gulp'),
      jshint = require('gulp-jshint'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify-es').default,
      sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      autoprefixer = require('gulp-autoprefixer'),
      imagemin = require('gulp-imagemin'),
      browserSync = require('browser-sync').create();

//rutas:
const files ={
    scssPath: "./app/*.scss",
    jsPath:"./app/*.js",
    imagePath:"./app/icons/*",
}

//procesamientos de hojas de estilo
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

//evaluación de errores en javascript
function lint() {
    return gulp.src(files.jsPath)
    .pipe(jshint({
        esnext: true
    }))
    .pipe(jshint.reporter('default'));
}

//procesamiento de codigo js
function js(){
    return gulp.src(files.jsPath)
      .pipe(sourcemaps.init())
      .pipe(concat('bundle.js'))
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist'))
      .pipe(browserSync.stream());
}

//procesamiento de imágenes
function image(){
    return gulp.src(files.imagePath)
    .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 5})
    ]))
    .pipe(gulp.dest('dist/icons'))
}

//conexion al servidor y watch de cualquier cambio
function watch(){
    browserSync.init({
        server: {
            baseDir: "./"
        },      
    });
    gulp.watch(files.scssPath, style);
    gulp.watch(files.jsPath, js);
    gulp.watch(files.imagePath, image);
    gulp.watch('./*.html').on('change', browserSync.reload); //con marcar los cambios del html me cambia tambien el html si hay nuevos cambios en el css y js
}


exports.lint = lint;
exports.style = style; 
exports.js = js;
exports.image = image;
exports.watch = watch;
