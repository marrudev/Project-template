const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const {src, dest, watch, series} = require('gulp');
const prefix = require('gulp-autoprefixer');
const purgecss = require('gulp-purgecss');
const terser = require('gulp-terser');
const fileinclude = require('gulp-file-include');

// File include
function includeHTML() {
  return gulp
    .src(['./src/**/*.html', '!./src/components/*.html'])
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: '@file'
      })
    )
    .pipe(gulp.dest('./dist/'));
}

// Compile, prefix
function compilescss() {
  return src('src/scss/styles.scss').pipe(sass()).pipe(prefix('last 2 versions')).pipe(dest('src/css'));
}

// Purge CSS
function purgecssTask() {
  return gulp
    .src('./src/css/*.css')
    .pipe(
      purgecss({
        content: ['./src/**/*.html']
      })
    )
    .pipe(gulp.dest('./dist/css'));
}

// Minify JS
function jsmin() {
  return src('src/js/*.js').pipe(terser()).pipe(dest('dist/js'));
}

// Watch
function watchTask() {
  watch('./src/**/*.html', includeHTML);
  watch('src/scss/**/*.scss', compilescss, purgecssTask);
  watch('src/css/*.css', purgecssTask);
  watch('src/js/*.js', jsmin);
}

// Mother of all tasks
exports.default = series(includeHTML, compilescss, purgecssTask, jsmin, watchTask);
