const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const watch = require('gulp-watch');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');

// img-compress

gulp.task('img-compress', function () {
  return gulp.src('./source/img/**')
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('./build/img/'))
})

// sass-compile

gulp.task('sass-compile', function () {
  return gulp.src('./source/scss/**/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/css'))
})
// js-concat
const jsFiles = [
  './source/libs/jquery/jquery-1.11.0.min.js',
  './source/libs/jquery/jquery-migrate-1.2.1.min.js',
  './source/libs/Magnific-Popup-master/dist/jquery.magnific-popup.js',
  './source/libs/slick/slick.min.js',
  './source/js/main.js'
]

gulp.task('js-concat', function () {
  return gulp.src(jsFiles)
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./build/js'))
})
// clean
gulp.task('clean', function () {
  return del(['build/*']);
})

// watch

gulp.task('watch', function () {
  gulp.watch('./source/scss/**/*.scss', gulp.series('sass-compile'));
  gulp.watch('./source/js/**/*.js', gulp.series('js-concat'));
  gulp.watch('./source/img/**', gulp.series('img-compress'));
});

// build-and-watch------------------------------------------------------------------
gulp.task('build', gulp.series('clean', gulp.parallel('sass-compile', 'js-concat', 'img-compress')));
gulp.task('dev', gulp.series('build', 'watch'));