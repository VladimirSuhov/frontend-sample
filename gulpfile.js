const gulp = require('gulp');
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const compass = require('gulp-compass');
const cleanCSS = require('gulp-clean-css');
const rollup = require('gulp-better-rollup');
const babelRollUp = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const size = require('gulp-filesize');
const plumber = require('gulp-plumber');
const vueCompiler = require('gulp-vue-compiler');

/**********************************************
 - SCRIPTS -
 **********************************************/

gulp.task('scripts-vue-compile', () => {
return gulp.src('src/js/vue-components/**/*.vue')
  .pipe(vueCompiler({
    newExtension: 'js', // *.vue => *.js
    babel: {
      babelrc: false,
    }
  }))
  .pipe(plumber())
  .pipe(size())
  .pipe(gulp.dest('./dist/js/vue-components'));
});

gulp.task('scripts-vue', () => {
  return gulp.src([
    './src/js/index.js',
  ])
    .pipe(plumber())
    .pipe(rollup({ plugins: [ babelRollUp(), resolve(), commonjs() ] }, 'umd'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(size())
    .on('end', () => {
      console.log('Vue components success!');
    });
});

/**********************************************
 - SASS -
 **********************************************/
gulp.task('sass', () => {
  return gulp.src([ './src/sass/*.scss' ])
    .pipe(plumber())
    .pipe(compass({
      css: './src/css',
      sass: './src/sass',
    }))
    .pipe(autoprefixer({
      browsers: [ 'last 2 versions' ]
    }))
    .pipe(cleanCSS({ debug: true, level: { 1: { specialComments: false } } }))
    .pipe(gulp.dest('./dist/css'))
    .on('end', () => console.log("sass success !"));
});

/**********************************************
 - CLEAN -
 **********************************************/
gulp.task('clean', () => {
  return del.sync('./dist');
});

/**********************************************
 - WATCH -
 **********************************************/
gulp.task('watch', () => {
  gulp.watch('./src/js/**/**/*.+(js|vue)').on('change', gulp.series('scripts-vue'));
  gulp.watch('./src/js/**/**/*.+(js|vue)').on('change', gulp.series('scripts-vue-compile'));
  gulp.watch('./src/sass/**/*.+(scss|sass)').on('change', gulp.series('sass'));
});

/**********************************************
 - Join press styles and scripts -
 **********************************************/
gulp.task('build', gulp.series('scripts-vue-compile', 'scripts-vue', 'sass'));

/**********************************************
 - MAIN COMMAND -
 **********************************************/
gulp.task('start', gulp.series(
  gulp.parallel('build', 'watch')
));
