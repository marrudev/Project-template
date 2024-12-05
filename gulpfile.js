const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const {src, dest, watch, series} = require('gulp');
const prefix = require('gulp-autoprefixer');
const purgecss = require('gulp-purgecss');
const terser = require('gulp-terser');
const fileinclude = require('gulp-file-include');

// Prettier for DIST
async function prettierDist() {
  console.log('Running Prettier on dist HTML...');
  const prettier = (await import('gulp-prettier')).default; // Dynamically import gulp-prettier
  return src('./dist/**/*.html')
    .pipe(prettier())
    .pipe(dest('./dist/'))
    .on('end', () => console.log('Prettier finished formatting HTML.'));
}

// File include
function includeHTML() {
  console.log('Running HTML include...');
  return src(['./src/**/*.html', '!./src/components/*.html', '!./src/templates/*.html'])
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: '@file'
      })
    )
    .pipe(dest('./dist/'));
}

// Compile and prefix SCSS
function compilescss() {
  console.log('Compiling SCSS...');
  return src('src/scss/styles.scss').pipe(sass()).pipe(prefix('last 2 versions')).pipe(dest('src/css'));
}

// Purge unused CSS
function purgecssTask() {
  console.log('Purging unused CSS...');
  return src('./src/css/*.css')
    .pipe(
      purgecss({
        content: ['./src/**/*.html']
      })
    )
    .pipe(dest('./dist/css'));
}

// Minify JS
function jsmin() {
  console.log('Minifying JS...');
  return src('src/js/*.js').pipe(terser()).pipe(dest('dist/js'));
}

// Watch files
function watchTask() {
  console.log('Starting watch task...');
  watch('./src/**/*.html', series(includeHTML, prettierDist)); // Ensure Prettier runs after HTML is included
  watch('src/scss/**/*.scss', series(compilescss, purgecssTask)); // Run SCSS compilation and purge in series
  watch('src/css/*.css', purgecssTask); // Watch CSS for purging
  watch('src/js/*.js', jsmin); // Watch JS for minification
}

// Export tasks
exports.prettierDist = prettierDist;
exports.default = series(includeHTML, compilescss, purgecssTask, jsmin, prettierDist, watchTask);
